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

const AVATAR_GRADIENTS: Record<string, string> = {
  singer: 'from-rose-400 to-pink-500',
  composer: 'from-violet-400 to-purple-500',
  music_director: 'from-blue-400 to-indigo-500',
  lyricist: 'from-emerald-400 to-teal-500',
  instrumentalist: 'from-amber-400 to-yellow-500',
};

function roleChips(roles: Person['role']) {
  return roles.map(r => (
    <span key={r} className="inline-flex items-center gap-0.5 rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-medium text-slate-600 border border-slate-200/60 shadow-sm">
      {ROLE_EMOJI[r] || ''} {r.replace('_', ' ')}
    </span>
  ));
}

function eraLabel(birthYear?: number): { text: string; color: string } {
  if (!birthYear) return { text: '', color: '' };
  if (birthYear < 1920) return { text: 'Pre-Independence', color: 'bg-amber-100/80 text-amber-800' };
  if (birthYear < 1940) return { text: 'Golden Era', color: 'bg-yellow-100/80 text-yellow-800' };
  if (birthYear < 1960) return { text: 'Classical Era', color: 'bg-blue-100/80 text-blue-800' };
  if (birthYear < 1980) return { text: 'Modern Era', color: 'bg-purple-100/80 text-purple-800' };
  return { text: 'Contemporary', color: 'bg-emerald-100/80 text-emerald-800' };
}

function lifeSpan(p: Person): string {
  const b = p.birthYear ? `b. ${p.birthYear}` : '';
  const d = p.deathYear ? `d. ${p.deathYear}` : '';
  if (b && d) return `${b} \u2013 ${d}`;
  if (b) return b;
  return '';
}

function primaryGradient(roles: Person['role']): string {
  for (const r of roles) {
    if (AVATAR_GRADIENTS[r]) return AVATAR_GRADIENTS[r];
  }
  return 'from-slate-400 to-slate-500';
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
      <header className="studio-header-v2 text-white">
        <div className="relative max-w-5xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3 anim-fade-up">
              <span className="text-4xl anim-float" role="img" aria-label="people">&#x1F3B6;</span>
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight gradient-text" style={{background: 'linear-gradient(135deg, #fef3c7, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Musical Legends</h1>
                <p className="text-slate-400 text-xs mt-0.5">A Bibliography of Indian Music Icons</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/discover" className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/20 hover:text-white transition">&#x1F4A1; Song Spark</Link>
              <Link href="/almanac" className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/20 hover:text-white transition">&#x1F4C5; Almanac</Link>
              <Link href="/" className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/20 hover:text-white transition">&#x1F3E0; Home</Link>
            </div>
          </div>

          {/* Animated Stats */}
          <div className="mt-6 flex flex-wrap gap-6 justify-center anim-fade-up" style={{animationDelay: '0.15s'}}>
            {[
              { n: stats.total, label: 'Artists', icon: '&#x1F3B5;' },
              { n: stats.singers, label: 'Singers', icon: '&#x1F3A4;' },
              { n: stats.composers, label: 'Composers', icon: '&#x1F3B9;' },
              { n: stats.lyricists, label: 'Lyricists', icon: '&#x270D;&#xFE0F;' },
              { n: stats.instrumentalists, label: 'Instrumentalists', icon: '&#x1F3BB;' },
            ].map(s => (
              <div key={s.label} className="text-center group">
                <div className="text-2xl font-black text-yellow-400 group-hover:scale-110 transition-transform" dangerouslySetInnerHTML={{ __html: `${s.n}` }} />
                <div className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Shimmer divider */}
        <div className="h-0.5 shimmer-bar" />
      </header>

      <main className="max-w-5xl mx-auto w-full px-4 py-6 flex-1">
        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5 anim-fade-up" style={{animationDelay: '0.2s'}}>
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">&#x1F50D;</span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, language, achievement..."
              className="w-full rounded-xl border border-slate-200 bg-white/70 backdrop-blur-sm pl-9 pr-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/40 focus:border-yellow-500/40 transition shadow-sm"
            />
          </div>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as 'name' | 'year')}
            className="rounded-xl border border-slate-200 bg-white/70 backdrop-blur-sm px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-yellow-500/40 shadow-sm"
          >
            <option value="name">Sort: A-Z</option>
            <option value="year">Sort: Era</option>
          </select>
        </div>

        {/* Role Filter Chips */}
        <div className="flex gap-2 flex-wrap mb-6 anim-fade-up" style={{animationDelay: '0.25s'}}>
          {(Object.keys(ROLE_LABELS) as RoleFilter[]).map(r => {
            const active = roleFilter === r;
            return (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  active
                    ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white shadow-md shadow-yellow-500/20 scale-105'
                    : 'glass-card text-slate-500 hover:text-slate-700 hover:shadow-md'
                }`}
              >
                {ROLE_LABELS[r]}
              </button>
            );
          })}
          <span className="ml-auto text-xs text-slate-400 self-center font-medium">{filtered.length} found</span>
        </div>

        {/* People Grid — 2 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger-children">
          {filtered.map(person => {
            const isExpanded = expandedId === person.id;
            const era = eraLabel(person.birthYear);
            const grad = primaryGradient(person.role);
            return (
              <div
                key={person.id}
                className={`anim-fade-up rounded-2xl glass-card shadow-sm overflow-hidden hover-lift transition-all ${
                  isExpanded ? 'md:col-span-2 glow-border' : ''
                }`}
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : person.id)}
                  className="w-full text-left px-5 py-4 flex items-center gap-4"
                >
                  {/* Gradient Avatar */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${grad} flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-slate-200/50`}>
                    {person.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-slate-800">{person.name}</h3>
                      <span className="text-[10px] text-slate-400">{lifeSpan(person)}</span>
                      {era.text && <span className={`text-[10px] rounded-full px-2 py-0.5 font-medium ${era.color}`}>{era.text}</span>}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">{person.knownFor}</p>
                  </div>
                  <span className={`text-slate-300 text-xs flex-shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>&#x25BC;</span>
                </button>

                {isExpanded && (
                  <div className="border-t border-slate-100/60 px-5 py-4 bg-gradient-to-b from-slate-50/50 to-white/30 space-y-3 anim-scale-in">
                    {/* Roles */}
                    <div className="flex flex-wrap gap-1.5">
                      {roleChips(person.role)}
                    </div>

                    {/* Languages */}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Languages</span>
                      <div className="flex gap-1 flex-wrap">
                        {person.languages.map(l => (
                          <span key={l} className="rounded-full bg-slate-100/80 px-2.5 py-0.5 text-[10px] font-medium text-slate-600">{l}</span>
                        ))}
                      </div>
                    </div>

                    {/* Birth / Death */}
                    <div className="flex gap-4 text-xs text-slate-600">
                      {person.birthDate && (
                        <span>&#x1F382; Born: {person.birthDate}{person.birthYear ? ` (${person.birthYear})` : ''}</span>
                      )}
                      {person.deathDate && (
                        <span>&#x1F56F;&#xFE0F; Passed: {person.deathDate}{person.deathYear ? ` (${person.deathYear})` : ''}</span>
                      )}
                      {!person.deathDate && person.birthYear && (
                        <span className="text-emerald-600 font-medium">&#x2728; Active</span>
                      )}
                    </div>

                    {/* Achievements */}
                    {person.achievements && person.achievements.length > 0 && (
                      <div>
                        <p className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider mb-1.5">Achievements</p>
                        <ul className="space-y-1.5">
                          {person.achievements.map((a, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                              <span className="text-yellow-500 mt-0.5">&#x2605;</span>
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
          <div className="text-center py-16 text-slate-400 text-sm anim-fade-in">
            <p className="text-4xl mb-3">&#x1F50D;</p>
            No artists found matching your search.
          </div>
        )}
      </main>

      <footer className="text-center py-5 text-xs text-slate-400">
        <p>MyOctaves Musical Legends &#x2022; {SEED_PEOPLE.length} artists documented</p>
        <p className="mt-1">Built by <a href="https://sivakanth.vercel.app" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-700 underline transition">Sivakanth Badigenchala</a></p>
      </footer>
    </div>
  );
}
