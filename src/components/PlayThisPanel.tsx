'use client';

import { useState } from 'react';
import { PlayThisCard } from '@/lib/contextEngine';

interface Props {
  cards: PlayThisCard[];
}

export default function PlayThisPanel({ cards }: Props) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (cards.length === 0) {
    return (
      <div className="text-center py-16 text-stone-400">
        <p className="text-4xl mb-3">🎵</p>
        <p className="font-medium">No inspiration this week</p>
        <p className="text-sm mt-1">Try navigating to a different week!</p>
      </div>
    );
  }

  function handleCopy(id: string, caption: string) {
    navigator.clipboard.writeText(caption).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  }

  // Top pick = highest importance
  const [top, ...rest] = cards;

  return (
    <div className="space-y-6">
      {/* TOP PICK — hero card */}
      <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 p-5 shadow-md">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Top pick this week</span>
          <span className="text-lg">{top.icon}</span>
        </div>
        <h2 className="text-lg font-bold text-stone-800 mt-1">{top.theme}</h2>
        <p className="text-sm text-stone-600 mt-1">{top.reason}</p>

        {/* Song suggestion */}
        <div className="mt-4 rounded-xl bg-white border border-amber-200 p-4">
          <p className="text-xs text-stone-400 uppercase tracking-wide font-semibold mb-1">Play this</p>
          <p className="text-base font-bold text-amber-700">&quot;{top.songTitle}&quot;</p>
          {top.songFilm && (
            <p className="text-sm text-stone-500">from <span className="italic">{top.songFilm}</span> {top.songYear ? `(${top.songYear})` : ''}</p>
          )}
          {top.songLanguage && (
            <span className="inline-block mt-1 rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-medium text-stone-600">{top.songLanguage}</span>
          )}
        </div>

        {/* Caption */}
        <div className="mt-4 rounded-xl bg-stone-50 border border-stone-200 p-3">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-stone-400 uppercase tracking-wide font-semibold">Ready-to-post caption</p>
            <button
              onClick={() => handleCopy(top.id, top.caption)}
              className="rounded-lg bg-amber-600 px-3 py-1 text-xs font-medium text-white hover:bg-amber-700 transition"
            >
              {copiedId === top.id ? '✓ Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="text-xs text-stone-600 whitespace-pre-wrap font-sans leading-relaxed">{top.caption}</pre>
        </div>

        {/* Hashtags */}
        <div className="flex flex-wrap gap-1 mt-3">
          {top.hashtags.map(h => (
            <span key={h} className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700">#{h}</span>
          ))}
        </div>
      </div>

      {/* MORE IDEAS */}
      {rest.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3">More ideas for this week</h3>
          <div className="space-y-3">
            {rest.map(card => (
              <div key={card.id} className="rounded-xl bg-white border border-stone-200 p-4 shadow-sm hover:shadow-md transition">
                <div className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0">{card.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-stone-800 text-sm">{card.theme}</h4>
                    <p className="text-xs text-stone-500 mt-0.5">{card.reason}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-sm font-medium text-amber-700">&quot;{card.songTitle}&quot;</span>
                      {card.songFilm && (
                        <span className="text-xs text-stone-400">— {card.songFilm}</span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {card.hashtags.slice(0, 4).map(h => (
                        <span key={h} className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-medium text-stone-500">#{h}</span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(card.id, card.caption)}
                    className="rounded-lg bg-stone-100 px-2.5 py-1 text-[11px] font-medium text-stone-600 hover:bg-amber-100 hover:text-amber-700 transition flex-shrink-0"
                  >
                    {copiedId === card.id ? '✓' : 'Copy'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
