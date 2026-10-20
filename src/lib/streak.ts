import { addDays, weekdayIndex } from './dates';

export interface StreakStats {
  current: number;
  longest: number;
  total: number;
  thisWeek: number;
  doneToday: boolean;
}

export function streakStats(ids: string[], today: string): StreakStats {
  const days = new Set(ids);
  // The streak stays alive until today ends: with no brief yet today, count back from yesterday.
  let cursor = days.has(today) ? today : addDays(today, -1);
  let current = 0;
  while (days.has(cursor)) {
    current++;
    cursor = addDays(cursor, -1);
  }

  let longest = 0;
  let run = 0;
  let prev = '';
  for (const id of [...days].sort()) {
    run = prev && addDays(prev, 1) === id ? run + 1 : 1;
    longest = Math.max(longest, run);
    prev = id;
  }

  const weekStart = addDays(today, -weekdayIndex(today));
  const thisWeek = [...days].filter((id) => id >= weekStart && id <= today).length;

  return { current, longest, total: days.size, thisWeek, doneToday: days.has(today) };
}

export type DayState = 'done' | 'missed' | 'today' | 'before' | 'future';

export interface HeatDay {
  id: string;
  state: DayState;
}

/** Weeks as columns (Mon→Sun), oldest first, ending with the current week. */
export function heatmap(ids: string[], today: string, weeks = 18): HeatDay[][] {
  const days = new Set(ids);
  const first = [...days].sort()[0] ?? today;
  const start = addDays(today, -weekdayIndex(today) - (weeks - 1) * 7);
  const columns: HeatDay[][] = [];
  for (let w = 0; w < weeks; w++) {
    const col: HeatDay[] = [];
    for (let d = 0; d < 7; d++) {
      const id = addDays(start, w * 7 + d);
      let state: DayState;
      if (days.has(id)) state = 'done';
      else if (id > today) state = 'future';
      else if (id === today) state = 'today';
      else if (id < first) state = 'before';
      else state = 'missed';
      col.push({ id, state });
    }
    columns.push(col);
  }
  return columns;
}
