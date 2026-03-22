// ============================================================
// localStorage wrapper with type safety
// ============================================================

import {
  AppSettings, DEFAULT_SETTINGS,
  PostHistory, Person, SongCandidate, ThemeSuggestion,
} from './types';

const KEYS = {
  settings: 'myoctaves_settings',
  posts: 'myoctaves_posts',
  people: 'myoctaves_people',
  songs: 'myoctaves_songs',
  suggestions: 'myoctaves_suggestions',
  cache: 'myoctaves_cache',
} as const;

function get<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function set<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
}

// ---------- Settings ----------
export function getSettings(): AppSettings {
  return { ...DEFAULT_SETTINGS, ...get(KEYS.settings, {}) };
}
export function saveSettings(s: Partial<AppSettings>): void {
  set(KEYS.settings, { ...getSettings(), ...s });
}

// ---------- Post History ----------
export function getPosts(): PostHistory[] {
  return get<PostHistory[]>(KEYS.posts, []);
}
export function addPost(post: PostHistory): void {
  const posts = getPosts();
  posts.unshift(post);
  set(KEYS.posts, posts);
}
export function updatePost(id: string, updates: Partial<PostHistory>): void {
  const posts = getPosts().map(p => p.id === id ? { ...p, ...updates } : p);
  set(KEYS.posts, posts);
}
export function deletePost(id: string): void {
  set(KEYS.posts, getPosts().filter(p => p.id !== id));
}

// ---------- Curated People ----------
export function getCuratedPeople(): Person[] {
  return get<Person[]>(KEYS.people, []);
}
export function saveCuratedPeople(people: Person[]): void {
  set(KEYS.people, people);
}
export function addCuratedPerson(person: Person): void {
  const people = getCuratedPeople();
  const idx = people.findIndex(p => p.id === person.id);
  if (idx >= 0) people[idx] = person;
  else people.push(person);
  saveCuratedPeople(people);
}
export function deleteCuratedPerson(id: string): void {
  saveCuratedPeople(getCuratedPeople().filter(p => p.id !== id));
}

// ---------- Curated Songs ----------
export function getCuratedSongs(): SongCandidate[] {
  return get<SongCandidate[]>(KEYS.songs, []);
}
export function saveCuratedSongs(songs: SongCandidate[]): void {
  set(KEYS.songs, songs);
}
export function addCuratedSong(song: SongCandidate): void {
  const songs = getCuratedSongs();
  const idx = songs.findIndex(s => s.id === song.id);
  if (idx >= 0) songs[idx] = song;
  else songs.push(song);
  saveCuratedSongs(songs);
}

// ---------- Saved Suggestions ----------
export function getSavedSuggestions(): ThemeSuggestion[] {
  return get<ThemeSuggestion[]>(KEYS.suggestions, []);
}
export function saveSuggestion(suggestion: ThemeSuggestion): void {
  const all = getSavedSuggestions();
  const idx = all.findIndex(s => s.id === suggestion.id);
  if (idx >= 0) all[idx] = suggestion;
  else all.push(suggestion);
  set(KEYS.suggestions, all);
}

// ---------- Cache ----------
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

export function getCached<T>(key: string): T | null {
  const cache = get<Record<string, { data: T; ts: number }>>(KEYS.cache, {});
  const entry = cache[key];
  if (!entry) return null;
  if (Date.now() - entry.ts > CACHE_TTL) return null;
  return entry.data;
}

export function setCache<T>(key: string, data: T): void {
  const cache = get<Record<string, { data: T; ts: number }>>(KEYS.cache, {});
  cache[key] = { data, ts: Date.now() };
  set(KEYS.cache, cache);
}

// ---------- Import/Export ----------
export function exportAllData(): string {
  return JSON.stringify({
    settings: getSettings(),
    posts: getPosts(),
    people: getCuratedPeople(),
    songs: getCuratedSongs(),
    suggestions: getSavedSuggestions(),
    exportedAt: new Date().toISOString(),
  }, null, 2);
}

export function importAllData(json: string): { success: boolean; error?: string } {
  try {
    const data = JSON.parse(json);
    if (data.settings) set(KEYS.settings, data.settings);
    if (data.posts) set(KEYS.posts, data.posts);
    if (data.people) set(KEYS.people, data.people);
    if (data.songs) set(KEYS.songs, data.songs);
    if (data.suggestions) set(KEYS.suggestions, data.suggestions);
    return { success: true };
  } catch {
    return { success: false, error: 'Invalid JSON format' };
  }
}
