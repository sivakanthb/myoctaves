// ============================================================
// MyOctaves — Discovery Engine: filter, boost, rank songs
// ============================================================

import { DiscoverySong, DiscoveryFilters, ContextCard, yearToEra } from './types';
import { SONG_CATALOGUE } from './songCatalogue';

export interface DiscoveryResult {
  song: DiscoverySong;
  boost: string | null;    // why this is contextually relevant (null = no boost)
  caption: string;         // ready-to-post caption
  hashtags: string[];
}

/** Filter the catalogue based on user selections */
function filterSongs(filters: DiscoveryFilters): DiscoverySong[] {
  return SONG_CATALOGUE.filter(song => {
    if (filters.genre && song.genre !== filters.genre) return false;
    if (filters.mood && song.mood !== filters.mood) return false;
    if (filters.weather && song.weather.indexOf(filters.weather) === -1 && song.weather.indexOf('Any') === -1) return false;
    if (filters.era && yearToEra(song.year) !== filters.era) return false;
    if (filters.language && song.language !== filters.language) return false;
    if (filters.festival && (!song.festivals || song.festivals.indexOf(filters.festival) === -1)) return false;
    return true;
  });
}

/** Check if a song's artist has a context card this week */
function getBoost(song: DiscoverySong, cards: ContextCard[]): string | null {
  if (!song.personId) return null;
  for (const card of cards) {
    if (card.person?.id === song.personId) {
      if (card.type === 'birthday') return `🎂 ${card.person.name}'s birthday this week!`;
      if (card.type === 'death_anniversary') return `🕯️ Remembering ${card.person.name} this week`;
    }
  }
  return null;
}

/** Build caption for a song */
function buildCaption(song: DiscoverySong, boost: string | null): string {
  const filmPart = song.film ? ` from "${song.film}"` : '';
  const yearPart = song.year ? ` (${song.year})` : '';
  const boostLine = boost ? `\n\n${boost}` : '';
  const hashtags = buildHashtags(song, boost !== null);

  return `🎵 "${song.title}"${filmPart}${yearPart}\n🎤 ${song.artist}${boostLine}\n\n${hashtags.map(h => `#${h}`).join(' ')}`;
}

/** Build hashtags */
function buildHashtags(song: DiscoverySong, hasBost: boolean): string[] {
  const h: string[] = ['MyOctaves'];
  h.push(song.genre);
  h.push(song.mood);
  h.push(song.language);
  if (song.film) h.push(song.film.replace(/[\s\-']+/g, ''));
  h.push(song.artist.split(' ')[0]);  // first name
  if (hasBost) h.push('Tribute');
  h.push('MusicOfTheWeek');
  return [...new Set(h)];
}

/** Shuffle array (Fisher-Yates) */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Main discovery function — filter, boost, rank, return */
export function discoverSongs(
  filters: DiscoveryFilters,
  contextCards: ContextCard[],
): DiscoveryResult[] {
  const filtered = filterSongs(filters);

  // Score each song: boosted songs float to top, then shuffle to keep it fresh
  const results: (DiscoveryResult & { score: number })[] = filtered.map(song => {
    const boost = getBoost(song, contextCards);
    return {
      song,
      boost,
      caption: buildCaption(song, boost),
      hashtags: buildHashtags(song, boost !== null),
      score: (boost ? 100 : 0) + (song.reelFriendly ? 5 : 0) + Math.random() * 10,
    };
  });

  results.sort((a, b) => b.score - a.score);
  return results;
}

/** Count matching songs (for filter bar) */
export function countMatches(filters: DiscoveryFilters): number {
  return filterSongs(filters).length;
}
