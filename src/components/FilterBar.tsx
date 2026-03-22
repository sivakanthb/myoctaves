'use client';

import { useState } from 'react';
import {
  Genre, SongMood, Weather, Era, Language, Festival,
  ALL_GENRES, ALL_MOODS, ALL_WEATHERS, ALL_ERAS, ALL_LANGUAGES, ALL_FESTIVALS,
  DiscoveryFilters,
} from '@/lib/types';

interface Props {
  filters: DiscoveryFilters;
  onChange: (f: DiscoveryFilters) => void;
  matchCount: number;
}

function Chip<T extends string>({ label, value, active, onClick }: { label: string; value: T; active: boolean; onClick: (v: T) => void }) {
  return (
    <button
      onClick={() => onClick(value)}
      className={`rounded-full px-3 py-1 text-xs font-medium transition whitespace-nowrap ${
        active
          ? 'bg-yellow-700 text-white shadow-sm'
          : 'bg-white border border-slate-200 text-slate-500 hover:border-yellow-700/40 hover:text-yellow-800'
      }`}
    >
      {label}
    </button>
  );
}

function toggle<T>(current: T | null, value: T): T | null {
  return current === value ? null : value;
}

const MOOD_ICONS: Record<SongMood, string> = {
  Happy: '\u{1F60A}', Melancholic: '\u{1F622}', Romantic: '\u{1F495}', Peaceful: '\u{1F9D8}',
  Energetic: '\u26A1', Devotional: '\u{1F64F}', Patriotic: '\u{1F1EE}\u{1F1F3}', Nostalgic: '\u2728',
};

const WEATHER_ICONS: Record<Weather, string> = {
  Rainy: '\u{1F327}\uFE0F', Sunny: '\u2600\uFE0F', Winter: '\u2744\uFE0F', Any: '\u{1F30D}',
};

const ERA_LABELS: Record<Era, string> = {
  Golden: '\u{1F3BB} Golden (Pre-60s)',
  '60s': '\u{1F399}\uFE0F 60s',
  '70s': '\u{1F3B8} 70s',
  '80s': '\u{1F4FB} 80s',
  '90s': '\u{1F4BF} 90s',
  '2000s': '\u{1F4C0} 2000s',
  '2010s+': '\u{1F525} 2010s+',
};

type FilterKey = 'genre' | 'mood' | 'era' | 'weather' | 'language' | 'festival';

export default function FilterBar({ filters, onChange, matchCount }: Props) {
  const [open, setOpen] = useState<FilterKey | null>(null);

  function set(patch: Partial<DiscoveryFilters>) {
    onChange({ ...filters, ...patch });
  }

  const hasFilters = filters.genre || filters.mood || filters.weather || filters.era || filters.language || filters.festival;

  function selectedLabel(key: FilterKey): string | null {
    switch (key) {
      case 'genre': return filters.genre;
      case 'mood': return filters.mood ? `${MOOD_ICONS[filters.mood]} ${filters.mood}` : null;
      case 'era': return filters.era ? ERA_LABELS[filters.era] : null;
      case 'weather': return filters.weather ? `${WEATHER_ICONS[filters.weather]} ${filters.weather}` : null;
      case 'language': return filters.language;
      case 'festival': return filters.festival;
    }
  }

  function FilterBlock({ filterKey, label }: { filterKey: FilterKey; label: string }) {
    const selected = selectedLabel(filterKey);
    const isOpen = open === filterKey;

    return (
      <div className="relative">
        <button
          onClick={() => setOpen(isOpen ? null : filterKey)}
          className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition ${
            selected
              ? 'border-yellow-700/40 bg-yellow-50 text-yellow-800'
              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
          }`}
        >
          <span className="text-[10px] uppercase tracking-wide text-slate-400">{label}</span>
          <span className="font-semibold">{selected || 'All'}</span>
          <span className="text-slate-300 text-[10px]">{isOpen ? '\u25B2' : '\u25BC'}</span>
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-1 z-20 rounded-xl border border-slate-200 bg-white p-3 shadow-lg min-w-[200px]">
            <div className="flex flex-wrap gap-1.5">
              {filterKey === 'genre' && ALL_GENRES.map(g => (
                <Chip key={g} label={g} value={g} active={filters.genre === g} onClick={(v: Genre) => { set({ genre: toggle(filters.genre, v) }); setOpen(null); }} />
              ))}
              {filterKey === 'mood' && ALL_MOODS.map(m => (
                <Chip key={m} label={`${MOOD_ICONS[m]} ${m}`} value={m} active={filters.mood === m} onClick={(v: SongMood) => { set({ mood: toggle(filters.mood, v) }); setOpen(null); }} />
              ))}
              {filterKey === 'era' && ALL_ERAS.map(e => (
                <Chip key={e} label={ERA_LABELS[e]} value={e} active={filters.era === e} onClick={(v: Era) => { set({ era: toggle(filters.era, v) }); setOpen(null); }} />
              ))}
              {filterKey === 'weather' && ALL_WEATHERS.map(w => (
                <Chip key={w} label={`${WEATHER_ICONS[w]} ${w}`} value={w} active={filters.weather === w} onClick={(v: Weather) => { set({ weather: toggle(filters.weather, v) }); setOpen(null); }} />
              ))}
              {filterKey === 'language' && ALL_LANGUAGES.map(l => (
                <Chip key={l} label={l} value={l} active={filters.language === l} onClick={(v: Language) => { set({ language: toggle(filters.language, v) }); setOpen(null); }} />
              ))}
              {filterKey === 'festival' && ALL_FESTIVALS.map(f => (
                <Chip key={f} label={f} value={f} active={filters.festival === f} onClick={(v: Festival) => { set({ festival: toggle(filters.festival, v) }); setOpen(null); }} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Horizontal row of filter dropdowns */}
      <div className="flex flex-wrap items-center gap-2">
        <FilterBlock filterKey="genre" label="Genre" />
        <FilterBlock filterKey="mood" label="Mood" />
        <FilterBlock filterKey="era" label="Era" />
        <FilterBlock filterKey="weather" label="Weather" />
        <FilterBlock filterKey="language" label="Language" />
        <FilterBlock filterKey="festival" label="Festival" />

        {hasFilters && (
          <button
            onClick={() => { onChange({ genre: null, mood: null, weather: null, era: null, language: null, festival: null }); setOpen(null); }}
            className="rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-400 hover:text-yellow-800 hover:border-yellow-700/40 transition"
          >
            \u21BB Reset
          </button>
        )}
      </div>

      {/* Match count */}
      <p className="text-xs text-slate-500">
        <span className="font-bold text-yellow-800">{matchCount}</span> song{matchCount !== 1 ? 's' : ''} match{matchCount === 1 ? 'es' : ''}
      </p>
    </div>
  );
}
