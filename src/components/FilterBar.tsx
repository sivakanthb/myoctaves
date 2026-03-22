'use client';

import {
  Genre, SongMood, Weather, Duration, Language,
  ALL_GENRES, ALL_MOODS, ALL_WEATHERS, ALL_DURATIONS, ALL_LANGUAGES,
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
          ? 'bg-amber-600 text-white shadow-sm'
          : 'bg-white border border-stone-200 text-stone-500 hover:border-amber-300 hover:text-amber-700'
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
  Happy: '😊', Melancholic: '😢', Romantic: '💕', Peaceful: '🧘',
  Energetic: '⚡', Devotional: '🙏', Patriotic: '🇮🇳', Nostalgic: '✨',
};

const WEATHER_ICONS: Record<Weather, string> = {
  Rainy: '🌧️', Sunny: '☀️', Winter: '❄️', Any: '🌍',
};

const DURATION_LABELS: Record<Duration, string> = {
  Reel: '🎬 Reel (<1 min)', Short: '⏱️ Short (1-3 min)', Full: '🎵 Full song',
};

export default function FilterBar({ filters, onChange, matchCount }: Props) {
  function set(patch: Partial<DiscoveryFilters>) {
    onChange({ ...filters, ...patch });
  }

  const hasFilters = filters.genre || filters.mood || filters.weather || filters.duration || filters.language;

  return (
    <div className="space-y-3">
      {/* Genre */}
      <div>
        <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wide mb-1.5">Genre</p>
        <div className="flex flex-wrap gap-1.5">
          {ALL_GENRES.map(g => (
            <Chip key={g} label={g} value={g} active={filters.genre === g} onClick={(v: Genre) => set({ genre: toggle(filters.genre, v) })} />
          ))}
        </div>
      </div>

      {/* Mood */}
      <div>
        <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wide mb-1.5">Mood</p>
        <div className="flex flex-wrap gap-1.5">
          {ALL_MOODS.map(m => (
            <Chip key={m} label={`${MOOD_ICONS[m]} ${m}`} value={m} active={filters.mood === m} onClick={(v: SongMood) => set({ mood: toggle(filters.mood, v) })} />
          ))}
        </div>
      </div>

      {/* Weather */}
      <div>
        <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wide mb-1.5">Weather / Season</p>
        <div className="flex flex-wrap gap-1.5">
          {ALL_WEATHERS.map(w => (
            <Chip key={w} label={`${WEATHER_ICONS[w]} ${w}`} value={w} active={filters.weather === w} onClick={(v: Weather) => set({ weather: toggle(filters.weather, v) })} />
          ))}
        </div>
      </div>

      {/* Duration */}
      <div>
        <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wide mb-1.5">Duration</p>
        <div className="flex flex-wrap gap-1.5">
          {ALL_DURATIONS.map(d => (
            <Chip key={d} label={DURATION_LABELS[d]} value={d} active={filters.duration === d} onClick={(v: Duration) => set({ duration: toggle(filters.duration, v) })} />
          ))}
        </div>
      </div>

      {/* Language */}
      <div>
        <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wide mb-1.5">Language</p>
        <div className="flex flex-wrap gap-1.5">
          {ALL_LANGUAGES.map(l => (
            <Chip key={l} label={l} value={l} active={filters.language === l} onClick={(v: Language) => set({ language: toggle(filters.language, v) })} />
          ))}
        </div>
      </div>

      {/* Match count + clear */}
      <div className="flex items-center justify-between pt-1">
        <p className="text-xs text-stone-500">
          <span className="font-bold text-amber-700">{matchCount}</span> song{matchCount !== 1 ? 's' : ''} match{matchCount === 1 ? 'es' : ''}
        </p>
        {hasFilters && (
          <button
            onClick={() => onChange({ genre: null, mood: null, weather: null, duration: null, language: null })}
            className="text-xs text-stone-400 hover:text-amber-600 transition"
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
}
