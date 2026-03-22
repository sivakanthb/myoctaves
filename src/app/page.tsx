'use client';

import { useState, useEffect, useCallback } from 'react';
import { WeekRange, ContextCard, ThemeSuggestion } from '@/lib/types';
import { thisWeek } from '@/lib/dateUtils';
import { generateContextCards, generateSuggestions } from '@/lib/contextEngine';
import WeekNav from '@/components/WeekNav';
import ContextPanel from '@/components/ContextPanel';
import SuggestPanel from '@/components/SuggestPanel';
import HistoryPanel from '@/components/HistoryPanel';
import SettingsPanel from '@/components/SettingsPanel';

type Tab = 'week' | 'suggest' | 'history' | 'settings';

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: 'week', label: 'This Week', icon: '' },
  { key: 'suggest', label: 'Suggestions', icon: '' },
  { key: 'history', label: 'History', icon: '' },
  { key: 'settings', label: 'Settings', icon: '' },
];

export default function Home() {
  const [week, setWeek] = useState<WeekRange>(thisWeek());
  const [tab, setTab] = useState<Tab>('week');
  const [cards, setCards] = useState<ContextCard[]>([]);
  const [suggestions, setSuggestions] = useState<ThemeSuggestion[]>([]);

  const refresh = useCallback(() => {
    const c = generateContextCards(week);
    setCards(c);
    setSuggestions(generateSuggestions(c));
  }, [week]);

  useEffect(() => { refresh(); }, [refresh]);

  function handleWeekChange(w: WeekRange) {
    setWeek(w);
  }

  function handleSuggestionStatus(id: string, status: ThemeSuggestion['status']) {
    setSuggestions(prev =>
      prev.map(s => s.id === id ? { ...s, status } : s)
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-600 to-orange-500 text-white">
        <div className="max-w-3xl mx-auto px-4 py-5">
          <div className="flex items-center gap-3">
            <span className="text-3xl"></span>
            <div>
              <h1 className="text-xl font-bold tracking-tight">MyOctaves</h1>
              <p className="text-amber-100 text-xs">Your Musical Week Planner</p>
            </div>
          </div>
        </div>
      </header>

      {/* Week Nav */}
      <div className="max-w-3xl mx-auto w-full px-4 -mt-4 relative z-10">
        <WeekNav week={week} onChange={handleWeekChange} />
      </div>

      {/* Tabs */}
      <div className="max-w-3xl mx-auto w-full px-4 mt-4">
        <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm border border-stone-200">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition ${
                tab === t.key
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-500 hover:bg-stone-50 hover:text-stone-700'
              }`}
            >
              <span className="mr-1">{t.icon}</span> {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-3xl mx-auto w-full px-4 py-5 flex-1">
        {tab === 'week' && <ContextPanel cards={cards} />}
        {tab === 'suggest' && (
          <SuggestPanel suggestions={suggestions} onStatusChange={handleSuggestionStatus} />
        )}
        {tab === 'history' && <HistoryPanel />}
        {tab === 'settings' && <SettingsPanel onSave={refresh} />}
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-stone-400 border-t border-stone-200">
        MyOctaves  discover what to play each week
      </footer>
    </div>
  );
}