// ============================================================
// MyOctaves â€” Core Type Definitions
// ============================================================

export type Language = 'Telugu' | 'Hindi' | 'Tamil' | 'Kannada' | 'English';
export type Instrument = 'flute' | 'guitar' | 'voice';
export type CategoryType = 'birthday' | 'death_anniversary' | 'movie_release' | 'special_day' | 'historic_event' | 'seasonal' | 'mood';

export type MoodType = 'sunny' | 'gloomy' | 'peaceful' | 'patriotic' | 'romantic' | 'devotional' | 'festive' | 'rainy';

export type TagType =
  | 'patriotic' | 'devotional' | 'romantic' | 'rain' | 'summer'
  | 'retro' | 'peace' | 'festive' | 'sad' | 'upbeat'
  | 'classical' | 'folk' | 'bhajan' | 'melody' | 'duet';

export interface WeekRange {
  start: string; // ISO date YYYY-MM-DD
  end: string;
  label: string; // e.g. "Mar 17 â€“ Mar 23, 2026"
}

// ---------- People ----------
export interface Person {
  id: string;
  name: string;
  role: ('singer' | 'composer' | 'music_director' | 'lyricist' | 'film_director' | 'filmmaker' | 'actor' | 'instrumentalist')[];
  birthDate?: string; // MM-DD
  birthYear?: number;
  deathDate?: string; // MM-DD
  deathYear?: number;
  languages: Language[];
  knownFor?: string; // brief note
  wikidataId?: string;
  imageUrl?: string;
  isCurated: boolean; // user-added override
}

// ---------- Context Cards ----------
export interface ContextCard {
  id: string;
  type: CategoryType;
  title: string;
  subtitle?: string;
  description: string;
  date?: string; // the specific date within the week
  year?: number; // original year of the event
  person?: Person;
  languages: Language[];
  tags: TagType[];
  importance: number; // 1-10, drives ranking
  source: 'wikidata' | 'wikipedia' | 'curated' | 'tmdb' | 'musicbrainz';
}

// ---------- Song / Theme ----------
export interface SongCandidate {
  id: string;
  title: string;
  film?: string;
  artist?: string;
  composer?: string;
  year?: number;
  language: Language;
  tags: TagType[];
  instrument: Instrument;
  spotifyUrl?: string;
  youtubeUrl?: string;
  notes?: string;
  isCurated: boolean;
}

export interface ThemeSuggestion {
  id: string;
  title: string; // e.g. "Tribute to SPB born this week"
  reason: string; // why suggested
  contextCards: string[]; // references to ContextCard ids
  songs: SongCandidate[];
  language: Language[];
  tags: TagType[];
  score: number; // computed ranking score
  status: 'suggested' | 'planned' | 'posted' | 'skipped';
  notes?: string;
}

// ---------- Post History ----------
export interface PostHistory {
  id: string;
  date: string; // ISO date
  instrument: Instrument;
  languages: Language[];
  theme: string;
  songTitle: string;
  film?: string;
  artist?: string;
  composer?: string;
  tags: TagType[];
  instagramUrl?: string;
  youtubeUrl?: string;
  notes?: string;
}

// ---------- Special Day ----------
export interface SpecialDay {
  id: string;
  name: string;
  date: string; // MM-DD (fixed) or dynamic description
  month: number;
  day: number;
  description: string;
  scope: 'international' | 'india' | 'regional';
  tags: TagType[];
  suggestedThemes?: string[];
}

// ---------- Historic Event ----------
export interface HistoricEvent {
  id: string;
  title: string;
  date: string; // MM-DD
  year: number;
  description: string;
  scope: 'world' | 'india';
  tags: TagType[];
}

// ---------- Season / Mood Config ----------
export interface SeasonConfig {
  months: number[]; // 1-12
  name: string;
  tags: TagType[];
  description: string;
  priority: number; // boost factor
}

// ---------- Filters ----------
export interface Filters {
  languages: Language[];
  categories: CategoryType[];
  mood?: MoodType;
  instrument: Instrument;
  eraStart: number; // e.g. 1985
  eraEnd: number; // e.g. 2025
  indianFocus: boolean;
  avoidRepeatsWeeks: number; // N weeks lookback
}

// ---------- Cache ----------
export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  key: string;
}

// ---------- App State ----------
export interface AppSettings {
  defaultInstrument: Instrument;
  defaultLanguages: Language[];
  weekStartDay: 'monday' | 'sunday';
  avoidRepeatsWeeks: number;
  eraStart: number;
  eraEnd: number;
  indianFocus: boolean;
  tmdbApiKey?: string;
}

export const DEFAULT_SETTINGS: AppSettings = {
  defaultInstrument: 'flute',
  defaultLanguages: ['Telugu', 'Hindi'],
  weekStartDay: 'monday',
  avoidRepeatsWeeks: 4,
  eraStart: 1985,
  eraEnd: new Date().getFullYear(),
  indianFocus: true,
};

export const ALL_LANGUAGES: Language[] = ['Telugu', 'Hindi', 'Tamil', 'Kannada', 'English'];
export const ALL_INSTRUMENTS: Instrument[] = ['flute', 'guitar', 'voice'];
export const ALL_CATEGORIES: CategoryType[] = [
  'birthday', 'death_anniversary', 'movie_release',
  'special_day', 'historic_event', 'seasonal', 'mood',
];

// ---------- Song Discovery Filters ----------
export type Genre = 'Bollywood' | 'Tollywood' | 'Carnatic' | 'Hindustani' | 'Ghazal' | 'Folk' | 'Devotional' | 'Western' | 'Patriotic' | 'Indie';
export type SongMood = 'Happy' | 'Melancholic' | 'Romantic' | 'Peaceful' | 'Energetic' | 'Devotional' | 'Patriotic' | 'Nostalgic';
export type Weather = 'Rainy' | 'Sunny' | 'Winter' | 'Any';
export type Duration = 'Reel' | 'Short' | 'Full';

export const ALL_GENRES: Genre[] = ['Bollywood', 'Tollywood', 'Carnatic', 'Hindustani', 'Ghazal', 'Folk', 'Devotional', 'Western', 'Patriotic', 'Indie'];
export const ALL_MOODS: SongMood[] = ['Happy', 'Melancholic', 'Romantic', 'Peaceful', 'Energetic', 'Devotional', 'Patriotic', 'Nostalgic'];
export const ALL_WEATHERS: Weather[] = ['Rainy', 'Sunny', 'Winter', 'Any'];
export const ALL_DURATIONS: Duration[] = ['Reel', 'Short', 'Full'];

export interface DiscoverySong {
  id: string;
  title: string;
  film?: string;
  artist: string;    // singer or composer
  composer?: string;
  year: number;
  language: Language;
  genre: Genre;
  mood: SongMood;
  weather: Weather[];
  duration: Duration;
  personId?: string;  // links to SEED_PEOPLE for context-aware boosting
  reelFriendly: boolean;
  caption?: string;   // optional pre-built caption override
}

export interface DiscoveryFilters {
  genre: Genre | null;
  mood: SongMood | null;
  weather: Weather | null;
  duration: Duration | null;
  language: Language | null;
}

