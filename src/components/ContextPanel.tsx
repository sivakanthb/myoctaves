'use client';

import { ContextCard } from '@/lib/types';

const ICON: Record<string, string> = {
  birthday: '🎂',
  death_anniversary: '🕯️',
  special_day: '📅',
  seasonal: '☀️',
  mood: '🎭',
  movie_release: '🎬',
  historic_event: '📜',
};

const BORDER_COLOR: Record<string, string> = {
  birthday: 'border-l-rose-400',
  death_anniversary: 'border-l-violet-400',
  special_day: 'border-l-sky-400',
  seasonal: 'border-l-emerald-400',
  mood: 'border-l-yellow-400',
  movie_release: 'border-l-orange-400',
  historic_event: 'border-l-slate-400',
};

const TAG_COLOR: Record<string, string> = {
  patriotic: 'bg-orange-100 text-orange-700',
  devotional: 'bg-purple-100 text-purple-700',
  romantic: 'bg-pink-100 text-pink-700',
  rain: 'bg-blue-100 text-blue-700',
  summer: 'bg-yellow-100 text-yellow-700',
  retro: 'bg-slate-100 text-slate-700',
  peace: 'bg-teal-100 text-teal-700',
  festive: 'bg-red-100 text-red-700',
  sad: 'bg-slate-100 text-slate-600',
  upbeat: 'bg-lime-100 text-lime-700',
  classical: 'bg-indigo-100 text-indigo-700',
  folk: 'bg-yellow-100 text-yellow-700',
  bhajan: 'bg-violet-100 text-violet-700',
  melody: 'bg-cyan-100 text-cyan-700',
  duet: 'bg-rose-100 text-rose-700',
};

const SECTION_LABEL: Record<string, string> = {
  birthday: '🎂 Birthdays This Week',
  death_anniversary: '🕯️ Remembering Legends',
  special_day: '📅 Special Days',
  historic_event: '📜 This Week in Music History',
  seasonal: '☀️ Seasonal Mood',
  mood: '🎭 Mood',
  movie_release: '🎬 Film Releases',
};

interface Props {
  cards: ContextCard[];
}

export default function ContextPanel({ cards }: Props) {
  if (cards.length === 0) {
    return (
      <div className="text-center py-16 text-slate-400">
        <p className="text-4xl mb-3">🎵</p>
        <p className="font-medium">No special events this week</p>
        <p className="text-sm mt-1">Navigate to another week to explore!</p>
      </div>
    );
  }

  // Group cards by type, preserving display order
  const typeOrder: string[] = ['birthday', 'death_anniversary', 'special_day', 'historic_event', 'seasonal', 'mood', 'movie_release'];
  const grouped = new Map<string, ContextCard[]>();
  for (const card of cards) {
    const list = grouped.get(card.type) || [];
    list.push(card);
    grouped.set(card.type, list);
  }

  return (
    <div className="space-y-6">
      {typeOrder.map(type => {
        const group = grouped.get(type);
        if (!group || group.length === 0) return null;
        return (
          <section key={type}>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              {SECTION_LABEL[type] || type}
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {group.map(card => (
        <div
          key={card.id}
          className={`rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200 border-l-4 ${BORDER_COLOR[card.type] || 'border-l-slate-300'} p-4 shadow-sm hover:shadow-md transition`}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0 mt-0.5">{ICON[card.type] || '🎵'}</span>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-slate-800 text-sm leading-tight">{card.title}</h3>
              {card.subtitle && (
                <p className="text-xs text-slate-500 mt-0.5">{card.subtitle}</p>
              )}
              <p className="text-xs text-slate-600 mt-1 line-clamp-2">{card.description}</p>

              <div className="flex flex-wrap gap-1 mt-2">
                {card.languages.slice(0, 3).map(lang => (
                  <span key={lang} className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                    {lang}
                  </span>
                ))}
                {card.tags.map(tag => (
                  <span key={tag} className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${TAG_COLOR[tag] || 'bg-slate-100 text-slate-600'}`}>
                    {tag}
                  </span>
                ))}
              </div>

              {card.importance >= 8 && (
                <span className="inline-block mt-2 rounded bg-yellow-100 px-2 py-0.5 text-[10px] font-bold text-yellow-800 uppercase tracking-wide">
                  Milestone
                </span>
              )}
            </div>
          </div>
        </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
