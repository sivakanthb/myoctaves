'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { SEED_PEOPLE } from '@/lib/seedData';
import { Person } from '@/lib/types';

type RoleFilter = 'all' | 'singer' | 'composer' | 'music_director' | 'lyricist' | 'instrumentalist';

const ROLE_LABELS: Record<RoleFilter, string> = {
  all: 'All',
  singer: 'Singers',
  composer: 'Composers',
  music_director: 'Music Directors',
  lyricist: 'Lyricists',
  instrumentalist: 'Instrumentalists',
};

const ROLE_EMOJI: Record<string, string> = {
  singer: '\uD83C\uDFA4',
  composer: '\uD83C\uDFB9',
  music_director: '\uD83C\uDFBC',
  lyricist: '\u270D\uFE0F',
  instrumentalist: '\uD83C\uDFBB',
  film_director: '\uD83C\uDFAC',
  filmmaker: '\uD83C\uDFAC',
  actor: '\uD83C\uDFAD',
};

function roleChips(roles: Person['role']) {
  return roles.map(r => (
    <span key={r} className="inline-flex items-center gap-0.5 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700 border border-amber-200">
      {ROLE_EMOJI[r] || ''} {r.replace('_', ' ')}
    </span>
  ));
}

function eraLabel(birthYear?: number): string {
  if (!birthYear) return '';
  if (birthYear < 1920) return 'Pre-Independence';
  if (birthYear < 1940) return 'Golden Era';
  if (birthYear < 1960) return 'Classical Era';
  if (birthYear < 1980) return 'Modern Era';
  return 'Contemporary';
}

function lifeSpan(p: Person): string {
  const b = p.birthYear ? `b. ${p.birthYear}` : '';
  const d = p.deathYear ? `d. ${p.deathYear}` : '';
  if (b && d) return `${b} \u2013 ${d}`;
  if (b) return b;
  return '';
}

export default function PeoplePage() {
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'year'>('name');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = [...SEED_PEOPLE];
    if (roleFilter !== 'all') {
      list = list.filter(p => p.role.includes(roleFilter as Person['role'][number]));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.knownFor ?? '').toLowerCase().includes(q) ||
        p.languages.some(l => l.toLowerCase().includes(q)) ||
        (p.achievements ?? []).some(a => a.toLowerCase().includes(q))
      );
    }
    if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      list.sort((a, b) => (a.birthYear ?? 9999) - (b.birthYear ?? 9999));
    }
    return list;
  }, [roleFilter, search, sortBy]);

  // Stats
  const stats = useMemo(() => {
    const singers = SEED_PEOPLE.filter(p => p.role.includes('singer')).length;
    const composers = SEED_PEOPLE.filter(p => p.role.includes('composer') || p.role.includes('music_director')).length;
    const lyricists = SEED_PEOPLE.filter(p => p.role.includes('lyricist')).length;
    const instrumentalists = SEED_PEOPLE.filter(p => p.role.includes('instrumentalist')).length;
    return { total: SEED_PEOPLE.length, singers, composers, lyricists, instrumentalists };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-600 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl" role="img" aria-label="people">&#x1F3B6;</span>
              <div>
                <h1 className="text-xl font-bold tracking-tight">Musical Legends</h1>
                <p className="text-amber-100 text-xs">A Bibliography of Indian Music Icons</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/discover"
                className="rounded-lg bg-white/15 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/25 transition"
              >
                &#x1F4A1; Song Spark
              </Link>
              <Link
                href="/almanac"
                className="rounded-lg bg-white/15 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/25 transition"
              >
                &#x1F4C5; Almanac
              </Link>
              <Link
                href="/"
                className="rounded-lg bg-white/15 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/25 transition"
              >
                &#x1F3E0; Home
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="bg-gradient-to-b from-amber-50 to-stone-50 border-b border-amber-100">
        <div className="max-w-4xl mx-auto px-4 py-3 flex flex-wrap gap-4 justify-center text-center">
          {[
            { n: stats.total, label: 'Artists' },
            { n: stats.singers, label: 'Singers' },
            { n: stats.composers, label: 'Composers' },
            { n: stats.lyricists, label: 'Lyricists' },
            { n: stats.instrumentalists, label: 'Instrumentalists' },
          ].map(s => (
            <div key={s.label}>
              <div className="text-lg font-bold text-amber-700">{s.n}</div>
              <div className="text-[10px] text-stone-500 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <main className="max-w-4xl mx-auto w-full px-4 py-5 flex-1">
        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, language, achievement..."
            className="flex-1 rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as 'name' | 'year')}
            className="rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-700 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <option value="name">Sort: A-Z</option>
            <option value="year">Sort: Era</option>
          </select>
        </div>

        {/* Role Filter Chips */}
        <div className="flex gap-1.5 flex-wrap mb-5">
          {(Object.keys(ROLE_LABELS) as RoleFilter[]).map(r => {
            const active = roleFilter === r;
            return (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  active ? 'bg-amber-100 text-amber-800 ring-2 ring-amber-400' : 'bg-stone-50 text-stone-500 hover:bg-stone-100'
                }`}
              >
                {ROLE_LABELS[r]}
              </button>
            );
          })}
          <span className="ml-auto text-xs text-stone-400 self-center">{filtered.length} found</span>
        </div>

        {/* People Cards */}
        <div className="space-y-3">
          {filtered.map(person => {
            const isExpanded = expandedId === person.id;
            const era = eraLabel(person.birthYear);
            return (
              <div
                key={person.id}
                className="rounded-xl border border-stone-200 bg-white shadow-sm overflow-hidden hover:border-amber-300 transition"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : person.id)}
                  className="w-full text-left px-4 py-3 flex items-center gap-3"
                >
                  {/* Avatar Circle */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center text-white font-bold text-sm">
                    {person.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-semibold text-stone-800">{person.name}</h3>
                      <span className="text-[10px] text-stone-400">{lifeSpan(person)}</span>
                      {era && <span className="text-[10px] rounded-full bg-blue-50 text-blue-600 px-1.5 py-0.5">{era}</span>}
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5 truncate">{person.knownFor}</p>
                  </div>
                  <span className="text-stone-400 text-xs flex-shrink-0">{isExpanded ? '\u25B2' : '\u25BC'}</span>
                </button>

                {isExpanded && (
                  <div className="border-t border-stone-100 px-4 py-3 bg-stone-50/50 space-y-3">
                    {/* Roles */}
                    <div className="flex flex-wrap gap-1.5">
                      {roleChips(person.role)}
                    </div>

                    {/* Languages */}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase text-stone-400 font-semibold tracking-wider">Languages</span>
                      <div className="flex gap-1 flex-wrap">
                        {person.languages.map(l => (
                          <span key={l} className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-medium text-stone-600">{l}</span>
                        ))}
                      </div>
                    </div>

                    {/* Birth / Death */}
                    <div className="flex gap-4 text-xs text-stone-600">
                      {person.birthDate && (
                        <span>&#x1F382; Born: {person.birthDate}{person.birthYear ? ` (${person.birthYear})` : ''}</span>
                      )}
                      {person.deathDate && (
                        <span>&#x1F56F;&#xFE0F; Passed: {person.deathDate}{person.deathYear ? ` (${person.deathYear})` : ''}</span>
                      )}
                      {!person.deathDate && person.birthYear && (
                        <span className="text-green-600">&#x2728; Active</span>
                      )}
                    </div>

                    {/* Achievements */}
                    {person.achievements && person.achievements.length > 0 && (
                      <div>
                        <p className="text-[10px] uppercase text-stone-400 font-semibold tracking-wider mb-1">Achievements</p>
                        <ul className="space-y-1">
                          {person.achievements.map((a, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-xs text-stone-700">
                              <span className="text-amber-500 mt-0.5">&#x2605;</span>
                              {a}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-stone-400 text-sm">
            No artists found matching your search.
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-stone-400">
        MyOctaves Musical Legends &#x2022; {SEED_PEOPLE.length} artists documented
      </footer>
    </div>
  );
}
