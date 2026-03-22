'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { WeekRange, ContextCard, DiscoveryFilters } from '@/lib/types';
import { thisWeek } from '@/lib/dateUtils';
import { generateContextCards } from '@/lib/contextEngine';
import { discoverSongs, countMatches, DiscoveryResult } from '@/lib/discoveryEngine';
import WeekNav from '@/components/WeekNav';
import ContextPanel from '@/components/ContextPanel';
import FilterBar from '@/components/FilterBar';
import SongResults from '@/components/SongResults';

const EMPTY_FILTERS: DiscoveryFilters = { genre: null, mood: null, weather: null, era: null, language: null, festival: null };

export default function DiscoverPage() {
  const [week, setWeek] = useState<WeekRange>(thisWeek());
  const [cards, setCards] = useState<ContextCard[]>([]);
  const [filters, setFilters] = useState<DiscoveryFilters>(EMPTY_FILTERS);
  const [results, setResults] = useState<DiscoveryResult[]>([]);
  const [matchCount, setMatchCount] = useState(0);
  const [showFilters, setShowFilters] = useState(true);
  const [showContext, setShowContext] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [SettingsPanel, setSettingsPanel] = useState<React.ComponentType<{ onSave: () => void }> | null>(null);

  const refreshContext = useCallback(() => {
    const c = generateContextCards(week);
    setCards(c);
  }, [week]);

  // Refresh songs whenever filters or context change
  const refreshSongs = useCallback(() => {
    const r = discoverSongs(filters, cards);
    setResults(r);
    setMatchCount(countMatches(filters));
  }, [filters, cards]);

  useEffect(() => { refreshContext(); }, [refreshContext]);
  useEffect(() => { refreshSongs(); }, [refreshSongs]);

  function handleFilterChange(f: DiscoveryFilters) {
    setFilters(f);
  }

  async function toggleSettings() {
    if (!SettingsPanel) {
      const mod = await import('@/components/SettingsPanel');
      setSettingsPanel(() => mod.default);
    }
    setShowSettings(s => !s);
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-600 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="text-3xl" role="img" aria-label="music">&#x1F3B6;</Link>
              <div>
                <h1 className="text-xl font-bold tracking-tight">Song Spark</h1>
                <p className="text-amber-100 text-xs">Filter. Discover. Play. Post.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/people"
                className="rounded-lg bg-white/15 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/25 transition"
              >
                &#x1F3A4; Legends
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
              <button
                onClick={toggleSettings}
                className="rounded-lg bg-white/15 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/25 transition"
              >
                &#x2699;&#xFE0F;
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-b from-amber-50 to-stone-50 border-b border-amber-100">
        <div className="max-w-4xl mx-auto px-4 py-4 text-center">
          <p className="text-sm text-stone-600 leading-relaxed">
            Pick a <span className="font-semibold text-amber-700">genre</span>,
            <span className="font-semibold text-amber-700"> mood</span>, or
            <span className="font-semibold text-amber-700"> vibe</span> &mdash; get a song to play with a ready-to-post caption.
            <br className="hidden sm:block" />
            Songs linked to <span className="font-semibold text-amber-700">this week&apos;s birthdays &amp; milestones</span> are boosted to the top.
          </p>
        </div>
      </div>

      {/* Week Nav */}
      <div className="max-w-4xl mx-auto w-full px-4 mt-4">
        <WeekNav week={week} onChange={setWeek} />
      </div>

      {/* Settings */}
      {showSettings && SettingsPanel && (
        <div className="max-w-4xl mx-auto w-full px-4 mt-4">
          <div className="rounded-xl bg-white border border-stone-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-stone-700">&#x2699;&#xFE0F; Preferences</h2>
              <button onClick={toggleSettings} className="text-stone-400 hover:text-stone-600 text-sm">&#x2715;</button>
            </div>
            <SettingsPanel onSave={refreshContext} />
          </div>
        </div>
      )}

      <main className="max-w-4xl mx-auto w-full px-4 py-5 flex-1 space-y-6">
        {/* FILTERS */}
        <section>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 mb-3 group"
          >
            <span className="text-lg">&#x1F39B;&#xFE0F;</span>
            <h2 className="text-sm font-semibold text-stone-700 group-hover:text-amber-700 transition">
              Filter &amp; Discover
            </h2>
            <span className="text-xs text-stone-400">{showFilters ? '\u25BE' : '\u25B8'}</span>
          </button>
          {showFilters && (
            <FilterBar filters={filters} onChange={handleFilterChange} matchCount={matchCount} />
          )}
        </section>

        {/* SONG RESULTS */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">&#x1F4A1;</span>
            <div>
              <h2 className="text-sm font-semibold text-stone-700">What to Play</h2>
              <p className="text-xs text-stone-400">Tap any card to see its caption &#x2022; &#x2B50; = relevant this week</p>
            </div>
          </div>
          <SongResults results={results} />
        </section>

        {/* CONTEXT (collapsible) */}
        <section>
          <button
            onClick={() => setShowContext(!showContext)}
            className="flex items-center gap-2 mb-3 group"
          >
            <span className="text-lg">&#x1F3B5;</span>
            <h2 className="text-sm font-semibold text-stone-700 group-hover:text-amber-700 transition">
              Why This Week Is Special
            </h2>
            <span className="text-xs text-stone-400">{showContext ? '\u25BE' : '\u25B8'}</span>
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700">{cards.length}</span>
          </button>
          {showContext && <ContextPanel cards={cards} />}
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-stone-400 border-t border-stone-200">
        <p>MyOctaves &mdash; Find your song, every week</p>
        <p className="mt-1 text-stone-300">For musicians, content creators &amp; music lovers</p>
      </footer>
    </div>
  );
}
