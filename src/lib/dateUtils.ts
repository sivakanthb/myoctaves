// ============================================================
// Date & Week Utilities
// ============================================================

import { WeekRange } from './types';

/** Get the Monday-based week range containing `date` */
export function getWeekRange(date: Date, startDay: 'monday' | 'sunday' = 'monday'): WeekRange {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay(); // 0=Sun, 1=Mon, ...
  const diff = startDay === 'monday'
    ? (day === 0 ? -6 : 1 - day)
    : -day;
  const start = new Date(d);
  start.setDate(d.getDate() + diff);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return {
    start: toISO(start),
    end: toISO(end),
    label: formatRange(start, end),
  };
}

/** Get "this week" range */
export function thisWeek(startDay: 'monday' | 'sunday' = 'monday'): WeekRange {
  return getWeekRange(new Date(), startDay);
}

/** Navigate weeks: offset = -1 (prev), +1 (next) */
export function offsetWeek(range: WeekRange, offset: number): WeekRange {
  const d = new Date(range.start);
  d.setDate(d.getDate() + offset * 7);
  return getWeekRange(d, 'monday');
}

/** YYYY-MM-DD */
export function toISO(d: Date): string {
  return d.toISOString().split('T')[0];
}

/** "Mar 17 – Mar 23, 2026" */
function formatRange(start: Date, end: Date): string {
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  const s = start.toLocaleDateString('en-US', opts);
  const e = end.toLocaleDateString('en-US', { ...opts, year: 'numeric' });
  return `${s} – ${e}`;
}

/** Get all MM-DD strings within a week range (inclusive) */
export function getWeekMMDDs(range: WeekRange): string[] {
  const result: string[] = [];
  const d = new Date(range.start);
  const end = new Date(range.end);
  while (d <= end) {
    result.push(toMMDD(d));
    d.setDate(d.getDate() + 1);
  }
  return result;
}

/** Date → "MM-DD" */
export function toMMDD(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${m}-${day}`;
}

/** "MM-DD" → month number (1-12) */
export function getMonthFromMMDD(mmdd: string): number {
  return parseInt(mmdd.split('-')[0], 10);
}

/** Get the Indian season for a given month */
export function getIndianSeason(month: number): { name: string; tags: string[] } {
  if (month >= 6 && month <= 9) return { name: 'Monsoon', tags: ['rain'] };
  if (month >= 3 && month <= 5) return { name: 'Summer', tags: ['summer', 'upbeat'] };
  if (month >= 10 && month <= 11) return { name: 'Festive', tags: ['festive'] };
  if (month === 12 || month <= 2) return { name: 'Winter', tags: ['peace', 'melody'] };
  return { name: 'Transition', tags: [] };
}

/** How many years ago was `year` from current year */
export function yearsAgo(year: number): number {
  return new Date().getFullYear() - year;
}

/** Is a milestone anniversary (25th, 50th, 75th, 100th, etc.) */
export function isMilestoneYear(year: number): boolean {
  const diff = yearsAgo(year);
  return diff > 0 && (diff % 25 === 0 || diff % 10 === 0);
}
