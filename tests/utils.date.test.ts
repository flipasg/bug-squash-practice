import { describe, expect, it } from 'vitest';
import { isOverdue, startOfToday } from '../src/utils/date';

describe('date utils', () => {
  it('startOfToday is midnight', () => {
    const d = new Date('2025-10-01T15:30:00Z');
    const s = startOfToday(d);
    expect(s.getHours()).toBe(0);
    expect(s.getMinutes()).toBe(0);
  });

  it('task due today is not overdue', () => {
    const now = new Date('2025-10-01T10:00:00Z');
    const dueToday = new Date('2025-10-01T00:30:00Z').toISOString();
    expect(isOverdue(dueToday, now)).toBe(false);
  });

  it('task due yesterday is overdue', () => {
    const now = new Date('2025-10-01T10:00:00Z');
    const dueYesterday = new Date('2025-09-30T23:59:00Z').toISOString();
    expect(isOverdue(dueYesterday, now)).toBe(true);
  });
});
