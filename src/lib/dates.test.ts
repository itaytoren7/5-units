import { describe, expect, it } from 'vitest';
import { addDays, daysBetween, formatClock, isIsoDate, startOfWeek, weekdayOf } from './dates';

describe('dates', () => {
  it('adds days across month boundaries', () => {
    expect(addDays('2026-01-30', 3)).toBe('2026-02-02');
    expect(addDays('2026-03-01', -1)).toBe('2026-02-28');
  });
  it('counts whole days', () => {
    expect(daysBetween('2026-03-27', '2026-03-29')).toBe(2); // DST switch in Israel, still 2 days
    expect(daysBetween('2026-06-10', '2026-06-01')).toBe(-9);
  });
  it('finds the Sunday starting a week', () => {
    expect(weekdayOf('2026-09-30')).toBe(3);
    expect(startOfWeek('2026-09-30')).toBe('2026-09-27');
  });
  it('validates iso dates', () => {
    expect(isIsoDate('2026-07-01')).toBe(true);
    expect(isIsoDate('07/01/2026')).toBe(false);
    expect(isIsoDate(42)).toBe(false);
  });
  it('formats clocks', () => {
    expect(formatClock(3661)).toBe('1:01:01');
    expect(formatClock(59)).toBe('0:59');
    expect(formatClock(-5)).toBe('0:00');
  });
});
