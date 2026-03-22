'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { SEED_PEOPLE, SEED_SPECIAL_DAYS, SEED_MUSIC_HISTORY } from '@/lib/seedData';

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

type EntryType = 'birthday' | 'death' | 'special_day' | 'historic';

interface AlmanacEntry {
  id: string;
  type: EntryType;
  name: string;
  description: string;
  month: number;
  day: number;
  year?: number;
  scope?: string;
}

const TYPE_STYLES: Record<EntryType, { label: string; bg: string; text: string; emoji: string }> = {
  birthday:    { label: 'Birthday',           bg: 'bg-green-100',  text: 'text-green-800',  emoji: '\uD83C\uDF82' },
  death:       { label: 'Death Anniversary',  bg: 'bg-stone-200',  text: 'text-stone-700',  emoji: '\uD83D\uDD6F\uFE0F' },
  special_day: { label: 'Special Day',        bg: 'bg-amber-100',  text: 'text-amber-800',  emoji: '\uD83C\uDF1F' },
  historic:    { label: 'Historic Event',     bg: 'bg-blue-100',   text: 'text-blue-800',   emoji: '\uD83C\uDFB5' },
};

function parseMMDD(mmdd: string): { m: number; d: number } {
  const [m, d] = mmdd.split('-').map(Number);
  return { m, d };
}

function buildEntries(): AlmanacEntry[] {
  const entries: AlmanacEntry[] = [];

  // Birthdays & death anniversaries from SEED_PEOPLE
  for (const p of SEED_PEOPLE) {
    if (p.birthDate) {
      const { m, d } = parseMMDD(p.birthDate);
      entries.push({
        id: `${p.id}_birth`,
        type: 'birthday',
        name: p.name,
        description: p.knownFor ?? `${p.role.join(', ')}`,
        month: m, day: d,
        year: p.birthYear,
        scope: p.languages.join(', '),
      });
    }
    if (p.deathDate) {
      const { m, d } = parseMMDD(p.deathDate);
      entries.push({
        id: `${p.id}_death`,
        type: 'death',
        name: p.name,
        description: p.knownFor ?? `${p.role.join(', ')}`,
        month: m, day: d,
        year: p.deathYear,
      });
    }
  }

  // Special days
  for (const s of SEED_SPECIAL_DAYS) {
    entries.push({
      id: s.id,
      type: 'special_day',
      name: s.name,
      description: s.description,
      month: s.month, day: s.day,
      scope: s.scope,
    });
  }

  // Historic events
  for (const h of SEED_MUSIC_HISTORY) {
    const { m, d } = parseMMDD(h.date);
    entries.push({
      id: h.id,
      type: 'historic',
      name: h.title,
      description: h.description,
      month: m, day: d,
      year: h.year,
      scope: h.scope,
    });
  }

  // Sort by month, then day
  entries.sort((a, b) => a.month - b.month || a.day - b.day);
  return entries;
}

export default function AlmanacPage() {
  const allEntries = useMemo(buildEntries, []);
  const [typeFilter, setTypeFilter] = useState<EntryType | 'all'>('all');
  const [search, setSearch] = useState('');
  const [expandedMonth, setExpandedMonth] = useState<number | null>(() => new Date().getMonth() + 1);

  const filtered = useMemo(() => {
    let list = allEntries;
    if (typeFilter !== 'all') list = list.filter(e => e.type === typeFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(e =>
        e.name.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [allEntries, typeFilter, search]);

  // Group by month
  const byMonth = useMemo(() => {
    const map = new Map<number, AlmanacEntry[]>();
    for (let m = 1; m <= 12; m++) map.set(m, []);
    for (const e of filtered) {
      map.get(e.month)!.push(e);
    }
    return map;
  }, [filtered]);

  const totalCount = filtered.length;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-600 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl" role="img" aria-label="calendar">&#x1F4C5;</span>
              <div>
                <h1 className="text-xl font-bold tracking-tight">Musical Almanac</h1>
                <p className="text-amber-100 text-xs">Birthdays &#x2022; Milestones &#x2022; Special Days &#x2022; Historic Events</p>
              </div>
            </div>
            <Link
              href="/"
              className="rounded-lg bg-white/15 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/25 transition"
            >
              &#x1F3B6; Home
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto w-full px-4 py-5 flex-1">
        {/* Search + Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search names, events..."
            className="flex-1 rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <div className="flex gap-1.5 flex-wrap">
            {(['all', 'birthday', 'death', 'special_day', 'historic'] as const).map(t => {
              const active = typeFilter === t;
              const style = t === 'all'
                ? { label: `All (${totalCount})`, bg: 'bg-stone-100', text: 'text-stone-700' }
                : { ...TYPE_STYLES[t], label: `${TYPE_STYLES[t].emoji} ${TYPE_STYLES[t].label}` };
              return (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                    active ? `${style.bg} ${style.text} ring-2 ring-amber-400` : 'bg-stone-50 text-stone-500 hover:bg-stone-100'
                  }`}
                >
                  {style.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Month Accordions */}
        <div className="space-y-2">
          {Array.from({ length: 12 }, (_, i) => i + 1).map(month => {
            const entries = byMonth.get(month) ?? [];
            const isOpen = expandedMonth === month;
            if (entries.length === 0 && search.trim()) return null; // hide empty months when searching
            return (
              <div key={month} className="rounded-xl border border-stone-200 bg-white shadow-sm overflow-hidden">
                <button
                  onClick={() => setExpandedMonth(isOpen ? null : month)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-stone-50 transition"
                >
                  <span className="font-semibold text-sm text-stone-800">
                    {MONTH_NAMES[month - 1]}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-xs text-stone-400 bg-stone-100 rounded-full px-2 py-0.5">
                      {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
                    </span>
                    <span className="text-stone-400 text-xs">{isOpen ? '\u25B2' : '\u25BC'}</span>
                  </span>
                </button>
                {isOpen && (
                  <div className="border-t border-stone-100 divide-y divide-stone-50">
                    {entries.length === 0 ? (
                      <div className="px-4 py-3 text-xs text-stone-400 italic">No entries this month</div>
                    ) : entries.map(entry => {
                      const style = TYPE_STYLES[entry.type];
                      return (
                        <div key={entry.id} className="px-4 py-3 flex items-start gap-3 hover:bg-amber-50/30 transition">
                          <div className="flex-shrink-0 mt-0.5">
                            <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${style.bg} ${style.text}`}>
                              {style.emoji} {entry.day} {MONTH_NAMES[entry.month - 1].slice(0, 3)}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-stone-800 leading-snug">
                              {entry.name}
                              {entry.year && (
                                <span className="ml-1.5 text-xs text-stone-400 font-normal">({entry.year})</span>
                              )}
                            </p>
                            <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">{entry.description}</p>
                          </div>
                          <span className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${style.bg} ${style.text}`}>
                            {style.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-stone-400">
        MyOctaves Musical Almanac &#x2022; {allEntries.length} dates curated
      </footer>
    </div>
  );
}
