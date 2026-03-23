'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { SEED_PEOPLE, SEED_SPECIAL_DAYS, SEED_MUSIC_HISTORY } from '@/lib/seedData';

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

const MONTH_EMOJI = ['\u2744\uFE0F', '\u{1F338}', '\u{1F331}', '\u2600\uFE0F', '\u{1F525}', '\u{1F327}\uFE0F',
  '\u{1F327}\uFE0F', '\u{1F327}\uFE0F', '\u{1F342}', '\u{1F383}', '\u{1F341}', '\u2744\uFE0F'];

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

const TYPE_STYLES: Record<EntryType, { label: string; bg: string; text: string; emoji: string; gradient: string; border: string }> = {
  birthday:    { label: 'Birthday',           bg: 'bg-emerald-100', text: 'text-emerald-800', emoji: '\uD83C\uDF82', gradient: 'from-emerald-400 to-green-500', border: 'border-l-emerald-400' },
  death:       { label: 'Death Anniversary',  bg: 'bg-slate-200',   text: 'text-slate-700',   emoji: '\uD83D\uDD6F\uFE0F', gradient: 'from-slate-400 to-gray-500', border: 'border-l-slate-400' },
  special_day: { label: 'Special Day',        bg: 'bg-yellow-100',  text: 'text-yellow-800',  emoji: '\uD83C\uDF1F', gradient: 'from-yellow-400 to-amber-500', border: 'border-l-yellow-400' },
  historic:    { label: 'Historic Event',     bg: 'bg-blue-100',    text: 'text-blue-800',    emoji: '\uD83C\uDFB5', gradient: 'from-blue-400 to-indigo-500', border: 'border-l-blue-400' },
};

function parseMMDD(mmdd: string): { m: number; d: number } {
  const [m, d] = mmdd.split('-').map(Number);
  return { m, d };
}

function buildEntries(): AlmanacEntry[] {
  const entries: AlmanacEntry[] = [];

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

  const byMonth = useMemo(() => {
    const map = new Map<number, AlmanacEntry[]>();
    for (let m = 1; m <= 12; m++) map.set(m, []);
    for (const e of filtered) {
      map.get(e.month)!.push(e);
    }
    return map;
  }, [filtered]);

  const totalCount = filtered.length;
  const currentMonth = new Date().getMonth() + 1;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="studio-header-v2 text-white">
        <div className="relative max-w-5xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3 anim-fade-up">
              <span className="text-4xl anim-float" role="img" aria-label="calendar">&#x1F4C5;</span>
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight" style={{background: 'linear-gradient(135deg, #fef3c7, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Musical Almanac</h1>
                <p className="text-slate-400 text-xs mt-0.5">Birthdays &#x2022; Milestones &#x2022; Special Days &#x2022; Historic Events</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/discover" className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/20 hover:text-white transition">&#x1F4A1; Song Spark</Link>
              <Link href="/people" className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/20 hover:text-white transition">&#x1F3A4; Legends</Link>
              <Link href="/" className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/20 hover:text-white transition">&#x1F3E0; Home</Link>
            </div>
          </div>
        </div>
        <div className="h-0.5 shimmer-bar" />
      </header>

      <main className="max-w-5xl mx-auto w-full px-4 py-6 flex-1">
        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5 anim-fade-up" style={{animationDelay: '0.1s'}}>
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">&#x1F50D;</span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search names, events..."
              className="w-full rounded-xl border border-slate-200 bg-white/70 backdrop-blur-sm pl-9 pr-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/40 focus:border-yellow-500/40 transition shadow-sm"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {(['all', 'birthday', 'death', 'special_day', 'historic'] as const).map(t => {
              const active = typeFilter === t;
              const style = t === 'all'
                ? { label: `All (${totalCount})`, gradient: '' }
                : { ...TYPE_STYLES[t], label: `${TYPE_STYLES[t].emoji} ${TYPE_STYLES[t].label}` };
              return (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                    active
                      ? t === 'all'
                        ? 'bg-gradient-to-r from-slate-600 to-slate-700 text-white shadow-md'
                        : `bg-gradient-to-r ${TYPE_STYLES[t as EntryType].gradient} text-white shadow-md shadow-slate-200/50`
                      : 'glass-card text-slate-500 hover:text-slate-700 hover:shadow-md'
                  }`}
                >
                  {style.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Month Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger-children">
          {Array.from({ length: 12 }, (_, i) => i + 1).map(month => {
            const entries = byMonth.get(month) ?? [];
            const isOpen = expandedMonth === month;
            const isCurrent = month === currentMonth;
            if (entries.length === 0 && search.trim()) return null;
            return (
              <div
                key={month}
                className={`anim-fade-up rounded-2xl glass-card shadow-sm overflow-hidden hover-lift transition-all ${
                  isOpen ? 'md:col-span-2' : ''
                } ${isCurrent ? 'ring-2 ring-yellow-400/50' : ''}`}
              >
                <button
                  onClick={() => setExpandedMonth(isOpen ? null : month)}
                  className="w-full flex items-center justify-between px-5 py-4 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{MONTH_EMOJI[month - 1]}</span>
                    <div className="text-left">
                      <span className="font-bold text-sm text-slate-800">
                        {MONTH_NAMES[month - 1]}
                      </span>
                      {isCurrent && (
                        <span className="ml-2 text-[10px] rounded-full bg-gradient-to-r from-yellow-400 to-amber-400 text-white px-2 py-0.5 font-bold uppercase tracking-wider shadow-sm">Now</span>
                      )}
                    </div>
                  </div>
                  <span className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 bg-slate-100/80 rounded-full px-2.5 py-0.5 font-medium">
                      {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
                    </span>
                    <span className={`text-slate-300 text-xs transition-transform ${isOpen ? 'rotate-180' : ''}`}>&#x25BC;</span>
                  </span>
                </button>
                {isOpen && (
                  <div className="border-t border-slate-100/60 px-3 py-3 anim-scale-in">
                    {entries.length === 0 ? (
                      <div className="px-3 py-4 text-xs text-slate-400 italic text-center">No entries this month</div>
                    ) : (
                      <div className="space-y-2">
                        {entries.map(entry => {
                          const style = TYPE_STYLES[entry.type];
                          return (
                            <div key={entry.id} className={`rounded-xl bg-white/60 border-l-4 ${style.border} px-4 py-3 flex items-start gap-3 hover:bg-white/90 transition`}>
                              <div className="flex-shrink-0 mt-0.5">
                                <span className={`inline-block rounded-lg px-2 py-1 text-[10px] font-bold ${style.bg} ${style.text}`}>
                                  {style.emoji} {entry.day} {MONTH_NAMES[entry.month - 1].slice(0, 3)}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-slate-800 leading-snug">
                                  {entry.name}
                                  {entry.year && (
                                    <span className="ml-1.5 text-xs text-slate-400 font-normal">({entry.year})</span>
                                  )}
                                </p>
                                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{entry.description}</p>
                              </div>
                              <span className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${style.bg} ${style.text}`}>
                                {style.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <footer className="text-center py-5 text-xs text-slate-400">
        <p>MyOctaves Musical Almanac &#x2022; {allEntries.length} dates curated</p>
        <p className="mt-1">Built by Sivakanth</p>
      </footer>
    </div>
  );
}
