'use client';

import { useState, useEffect, useCallback } from 'react';
import { WeekRange, ContextCard } from '@/lib/types';
import { thisWeek } from '@/lib/dateUtils';
import { generateContextCards, generatePlayThis, PlayThisCard } from '@/lib/contextEngine';
import WeekNav from '@/components/WeekNav';
import ContextPanel from '@/components/ContextPanel';
import PlayThisPanel from '@/components/PlayThisPanel';

export default function Home() {
  const [week, setWeek] = useState<WeekRange>(thisWeek());
  const [cards, setCards] = useState<ContextCard[]>([]);
  const [playCards, setPlayCards] = useState<PlayThisCard[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [SettingsPanel, setSettingsPanel] = useState<React.ComponentType<{ onSave: () => void }> | null>(null);

  const refresh = useCallback(() => {
    const c = generateContextCards(week);
    setCards(c);
    setPlayCards(generatePlayThis(c));
  }, [week]);

  useEffect(() => { refresh(); }, [refresh]);

  function handleWeekChange(w: WeekRange) {
    setWeek(w);
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
        <div className="max-w-3xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎶</span>
              <div>
                <h1 className="text-xl font-bold tracking-tight">MyOctaves</h1>
                <p className="text-amber-100 text-xs">Your Musical Inspiration, Every Week</p>
              </div>
            </div>
            <button
              onClick={toggleSettings}
              className="rounded-lg bg-white/15 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/25 transition"
            >
              ⚙️
            </button>
          </div>
        </div>
      </header>

      {/* Hero/Purpose */}
      <div className="bg-gradient-to-b from-amber-50 to-stone-50 border-b border-amber-100">
        <div className="max-w-3xl mx-auto px-4 py-4 text-center">
          <p className="text-sm text-stone-600 leading-relaxed">
            Every week has a musical story — <span className="font-semibold text-amber-700">birthdays of legends</span>,
            <span className="font-semibold text-amber-700"> historic milestones</span>, and
            <span className="font-semibold text-amber-700"> seasonal moods</span>.
            <br className="hidden sm:block" />
            Open. Get inspired. Play. Post. That&apos;s it.
          </p>
        </div>
      </div>

      {/* Week Nav */}
      <div className="max-w-3xl mx-auto w-full px-4 mt-4 relative z-10">
        <WeekNav week={week} onChange={handleWeekChange} />
      </div>

      {/* Settings (hidden by default) */}
      {showSettings && SettingsPanel && (
        <div className="max-w-3xl mx-auto w-full px-4 mt-4">
          <div className="rounded-xl bg-white border border-stone-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-stone-700">⚙️ Preferences</h2>
              <button onClick={toggleSettings} className="text-stone-400 hover:text-stone-600 text-sm">✕</button>
            </div>
            <SettingsPanel onSave={refresh} />
          </div>
        </div>
      )}

      <main className="max-w-3xl mx-auto w-full px-4 py-5 flex-1 space-y-8">
        {/* Section 1: Play This — THE hero */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">💡</span>
            <div>
              <h2 className="text-sm font-semibold text-stone-700">What to Play This Week</h2>
              <p className="text-xs text-stone-400">Ready-made inspiration with songs &amp; captions</p>
            </div>
          </div>
          <PlayThisPanel cards={playCards} />
        </section>

        {/* Section 2: Why — the context */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">🎵</span>
            <div>
              <h2 className="text-sm font-semibold text-stone-700">Why This Week Is Special</h2>
              <p className="text-xs text-stone-400">Birthdays, anniversaries, milestones &amp; seasonal vibes</p>
            </div>
          </div>
          <ContextPanel cards={cards} />
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-stone-400 border-t border-stone-200">
        <p>MyOctaves — Know what&apos;s musically special every week</p>
        <p className="mt-1 text-stone-300">For musicians, content creators &amp; music lovers</p>
      </footer>
    </div>
  );
}