'use client';

import { ThemeSuggestion } from '@/lib/types';

const STATUS_STYLE: Record<string, string> = {
  suggested: 'bg-stone-100 text-stone-600',
  planned: 'bg-amber-100 text-amber-700',
  posted: 'bg-emerald-100 text-emerald-700',
  skipped: 'bg-stone-50 text-stone-400 line-through',
};

interface Props {
  suggestions: ThemeSuggestion[];
  onStatusChange: (id: string, status: ThemeSuggestion['status']) => void;
}

export default function SuggestPanel({ suggestions, onStatusChange }: Props) {
  if (suggestions.length === 0) {
    return (
      <div className="text-center py-16 text-stone-400">
        <p className="text-4xl mb-3">💡</p>
        <p className="font-medium">No suggestions this week</p>
        <p className="text-sm mt-1">Add more people or navigate to a different week</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {suggestions.map(sug => (
        <div
          key={sug.id}
          className="rounded-xl bg-white border border-stone-200 p-4 shadow-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-stone-800 text-sm">{sug.title}</h3>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${STATUS_STYLE[sug.status]}`}>
                  {sug.status}
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-1">{sug.reason}</p>

              <div className="flex flex-wrap gap-1 mt-2">
                {sug.language.slice(0, 3).map(l => (
                  <span key={l} className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-medium text-stone-500">{l}</span>
                ))}
                {sug.tags.map(t => (
                  <span key={t} className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-600">{t}</span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1 flex-shrink-0">
              {sug.status !== 'planned' && (
                <button
                  onClick={() => onStatusChange(sug.id, 'planned')}
                  className="rounded-lg bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-700 hover:bg-amber-100 transition"
                >
                  Plan
                </button>
              )}
              {sug.status !== 'posted' && (
                <button
                  onClick={() => onStatusChange(sug.id, 'posted')}
                  className="rounded-lg bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 hover:bg-emerald-100 transition"
                >
                  Posted
                </button>
              )}
              {sug.status !== 'skipped' && (
                <button
                  onClick={() => onStatusChange(sug.id, 'skipped')}
                  className="rounded-lg bg-stone-50 px-2.5 py-1 text-[11px] font-medium text-stone-500 hover:bg-stone-100 transition"
                >
                  Skip
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
