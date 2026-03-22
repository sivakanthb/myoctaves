// ============================================================
// MyOctaves — Context Engine: generates cards & suggestions
// ============================================================

import { WeekRange, ContextCard, ThemeSuggestion, TagType } from './types';
import { getWeekMMDDs, getMonthFromMMDD, yearsAgo, isMilestoneYear, getIndianSeason } from './dateUtils';
import { SEED_PEOPLE, SEED_SPECIAL_DAYS, SEASON_CONFIG, SEED_MUSIC_HISTORY } from './seedData';
import { getCuratedPeople } from './storage';

let cardSeq = 0;
function nextId(): string {
  return `ctx_${++cardSeq}_${Date.now()}`;
}

/** Generate all context cards for the given week */
export function generateContextCards(week: WeekRange): ContextCard[] {
  cardSeq = 0;
  const mmDDs = getWeekMMDDs(week);
  const cards: ContextCard[] = [];

  // Merge seed + curated people (dedup by id)
  const seenIds = new Set(SEED_PEOPLE.map(p => p.id));
  const allPeople = [
    ...SEED_PEOPLE,
    ...getCuratedPeople().filter(p => !seenIds.has(p.id)),
  ];

  for (const person of allPeople) {
    // Birthdays
    if (person.birthDate && mmDDs.includes(person.birthDate)) {
      const age = person.birthYear ? yearsAgo(person.birthYear) : undefined;
      const milestone = person.birthYear ? isMilestoneYear(person.birthYear) : false;
      cards.push({
        id: nextId(),
        type: 'birthday',
        title: `${person.name}'s Birthday`,
        subtitle: age ? `Turns ${age} this year${milestone ? ' (milestone!)' : ''}` : undefined,
        description: person.knownFor || person.role.join(', '),
        date: person.birthDate,
        year: person.birthYear,
        person,
        languages: person.languages,
        tags: milestone ? ['classical', 'melody'] as TagType[] : ['melody'] as TagType[],
        importance: milestone ? 9 : 6,
        source: 'curated',
      });
    }

    // Death anniversaries
    if (person.deathDate && mmDDs.includes(person.deathDate)) {
      const years = person.deathYear ? yearsAgo(person.deathYear) : undefined;
      const milestone = person.deathYear ? isMilestoneYear(person.deathYear) : false;
      cards.push({
        id: nextId(),
        type: 'death_anniversary',
        title: `Remembering ${person.name}`,
        subtitle: years ? `${years} years since passing${milestone ? ' (milestone)' : ''}` : undefined,
        description: person.knownFor || '',
        date: person.deathDate,
        year: person.deathYear,
        person,
        languages: person.languages,
        tags: ['melody', 'sad'] as TagType[],
        importance: milestone ? 9 : 5,
        source: 'curated',
      });
    }
  }

  // Special days
  for (const day of SEED_SPECIAL_DAYS) {
    if (mmDDs.includes(day.date)) {
      cards.push({
        id: nextId(),
        type: 'special_day',
        title: day.name,
        description: day.description,
        date: day.date,
        languages: ['Telugu', 'Hindi', 'Tamil', 'Kannada', 'English'],
        tags: day.tags as TagType[],
        importance: 7,
        source: 'curated',
      });
    }
  }

  // This Week in Music History
  for (const event of SEED_MUSIC_HISTORY) {
    if (mmDDs.includes(event.date)) {
      const yrs = yearsAgo(event.year);
      cards.push({
        id: nextId(),
        type: 'historic_event',
        title: event.title,
        subtitle: `${yrs} years ago (${event.year})`,
        description: event.description,
        date: event.date,
        year: event.year,
        languages: ['Telugu', 'Hindi', 'Tamil', 'Kannada', 'English'],
        tags: event.tags as TagType[],
        importance: isMilestoneYear(event.year) ? 8 : 4,
        source: 'curated',
      });
    }
  }

  // Season / mood
  const month = getMonthFromMMDD(mmDDs[0]);
  const season = getIndianSeason(month);
  const seasonConfig = SEASON_CONFIG.find(s => s.months.includes(month));
  if (seasonConfig) {
    cards.push({
      id: nextId(),
      type: 'seasonal',
      title: `${season.name} Season`,
      description: seasonConfig.description,
      languages: ['Telugu', 'Hindi', 'Tamil', 'Kannada', 'English'],
      tags: seasonConfig.tags as TagType[],
      importance: 3,
      source: 'curated',
    });
  }

  cards.sort((a, b) => b.importance - a.importance);
  return cards;
}

/** Generate theme suggestions from context cards */
export function generateSuggestions(cards: ContextCard[]): ThemeSuggestion[] {
  const suggestions: ThemeSuggestion[] = [];

  for (const card of cards) {
    if (card.type === 'birthday' && card.person) {
      suggestions.push({
        id: `sug_bday_${card.person.id}`,
        title: `Birthday Tribute to ${card.person.name}`,
        reason: `${card.person.name} ${card.subtitle || 'was born this week'}. Play one of their iconic songs.`,
        contextCards: [card.id],
        songs: [],
        language: card.languages,
        tags: card.tags,
        score: card.importance,
        status: 'suggested',
      });
    }

    if (card.type === 'death_anniversary' && card.person) {
      suggestions.push({
        id: `sug_mem_${card.person.id}`,
        title: `In Memory of ${card.person.name}`,
        reason: `Remembering ${card.person.name} — ${card.subtitle || 'passed away this week'}. A heartfelt tribute.`,
        contextCards: [card.id],
        songs: [],
        language: card.languages,
        tags: card.tags,
        score: card.importance,
        status: 'suggested',
      });
    }

    if (card.type === 'special_day') {
      suggestions.push({
        id: `sug_day_${card.id}`,
        title: `${card.title} Special`,
        reason: card.description,
        contextCards: [card.id],
        songs: [],
        language: card.languages,
        tags: card.tags,
        score: card.importance,
        status: 'suggested',
      });
    }

    if (card.type === 'seasonal') {
      suggestions.push({
        id: `sug_season_${card.id}`,
        title: `${card.title} Mood`,
        reason: card.description,
        contextCards: [card.id],
        songs: [],
        language: card.languages,
        tags: card.tags,
        score: card.importance,
        status: 'suggested',
      });
    }

    if (card.type === 'historic_event') {
      suggestions.push({
        id: `sug_hist_${card.id}`,
        title: `🎙️ ${card.title}`,
        reason: `${card.subtitle} — ${card.description}`,
        contextCards: [card.id],
        songs: [],
        language: card.languages,
        tags: card.tags,
        score: card.importance,
        status: 'suggested',
      });
    }
  }

  suggestions.sort((a, b) => b.score - a.score);
  return suggestions;
}
