import { SITE } from '../site';

// Brief ids are calendar days ("2026-10-20"), never instants, so all math here
// runs in UTC on those strings to avoid off-by-one days.

export function todayId(now = new Date()): string {
  // en-CA formats as YYYY-MM-DD.
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: SITE.timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

export function addDays(id: string, n: number): string {
  const d = new Date(`${id}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

/** Monday = 0 … Sunday = 6 */
export function weekdayIndex(id: string): number {
  return (new Date(`${id}T00:00:00Z`).getUTCDay() + 6) % 7;
}

export function formatDay(id: string, style: 'long' | 'short' = 'long'): string {
  const opts: Intl.DateTimeFormatOptions =
    style === 'long'
      ? { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }
      : { month: 'short', day: 'numeric' };
  return new Date(`${id}T00:00:00Z`).toLocaleDateString('en-US', { ...opts, timeZone: 'UTC' });
}

export function formatDate(d: Date, style: 'long' | 'short' = 'short'): string {
  return formatDay(d.toISOString().slice(0, 10), style);
}

export function monthLabel(id: string): string {
  return new Date(`${id}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
