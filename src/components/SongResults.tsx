'use client';

import { useState } from 'react';
import { DiscoveryResult } from '@/lib/discoveryEngine';

interface Props {
  results: DiscoveryResult[];
}

const MOOD_COLORS: Record<string, string> = {
  Happy: 'bg-yellow-100 text-yellow-700',
  Melancholic: 'bg-blue-100 text-blue-700',
  Romantic: 'bg-pink-100 text-pink-700',
  Peaceful: 'bg-teal-100 text-teal-700',
  Energetic: 'bg-orange-100 text-orange-700',
  Devotional: 'bg-purple-100 text-purple-700',
  Patriotic: 'bg-green-100 text-green-700',
  Nostalgic: 'bg-amber-100 text-amber-700',
};

export default function SongResults({ results }: Props) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  function handleCopy(id: string, caption: string) {
    navigator.clipboard.writeText(caption).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-10 text-stone-400">
        <p className="text-3xl mb-2">🔍</p>
        <p className="font-medium">No songs match these filters</p>
        <p className="text-xs mt-1">Try changing or clearing some filters</p>
      </div>
    );
  }

  // Show top pick + rest
  const [top, ...rest] = results;

  return (
    <div className="space-y-4">
      {/* TOP PICK */}
      <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 p-5 shadow-md">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600">🎯 Top pick</span>
          {top.boost && (
            <span className="rounded-full bg-amber-200 px-2 py-0.5 text-[10px] font-bold text-amber-800">{top.boost}</span>
          )}
        </div>
        <h2 className="text-lg font-bold text-stone-800">&quot;{top.song.title}&quot;</h2>
        <p className="text-sm text-stone-600">
          {top.song.artist}
          {top.song.film && <> • <span className="italic">{top.song.film}</span></>}
          {top.song.year && <> ({top.song.year})</>}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-3">
          <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-medium text-stone-600">{top.song.language}</span>
          <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-medium text-stone-600">{top.song.genre}</span>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${MOOD_COLORS[top.song.mood] || 'bg-stone-100 text-stone-600'}`}>{top.song.mood}</span>
          {top.song.reelFriendly && (
            <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-medium text-rose-700">🎬 Reel-friendly</span>
          )}
        </div>

        {/* Caption */}
        <div className="mt-4 rounded-xl bg-white border border-stone-200 p-3">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[10px] text-stone-400 uppercase tracking-wide font-semibold">Caption for your post</p>
            <button
              onClick={() => handleCopy(top.song.id, top.caption)}
              className="rounded-lg bg-amber-600 px-3 py-1 text-xs font-medium text-white hover:bg-amber-700 transition"
            >
              {copiedId === top.song.id ? '✓ Copied!' : '📋 Copy'}
            </button>
          </div>
          <pre className="text-xs text-stone-600 whitespace-pre-wrap font-sans leading-relaxed">{top.caption}</pre>
        </div>
      </div>

      {/* MORE MATCHES */}
      {rest.length > 0 && (
        <div className="space-y-2">
          {rest.map(r => (
            <div key={r.song.id} className="rounded-xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition overflow-hidden">
              <div
                className="p-4 cursor-pointer"
                onClick={() => setExpanded(expanded === r.song.id ? null : r.song.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-stone-800 text-sm">&quot;{r.song.title}&quot;</h4>
                      {r.boost && (
                        <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold text-amber-700">⭐</span>
                      )}
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {r.song.artist}
                      {r.song.film && <> • <span className="italic">{r.song.film}</span></>}
                      {r.song.year && <> ({r.song.year})</>}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-medium text-stone-500">{r.song.language}</span>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${MOOD_COLORS[r.song.mood] || 'bg-stone-100 text-stone-500'}`}>{r.song.mood}</span>
                      {r.song.reelFriendly && (
                        <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-medium text-rose-600">🎬 Reel</span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleCopy(r.song.id, r.caption); }}
                    className="rounded-lg bg-stone-100 px-2.5 py-1 text-[11px] font-medium text-stone-600 hover:bg-amber-100 hover:text-amber-700 transition flex-shrink-0"
                  >
                    {copiedId === r.song.id ? '✓' : '📋'}
                  </button>
                </div>
              </div>

              {/* Expanded caption */}
              {expanded === r.song.id && (
                <div className="border-t border-stone-100 bg-stone-50 p-3">
                  {r.boost && <p className="text-xs text-amber-700 font-medium mb-1">{r.boost}</p>}
                  <pre className="text-xs text-stone-500 whitespace-pre-wrap font-sans leading-relaxed">{r.caption}</pre>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
