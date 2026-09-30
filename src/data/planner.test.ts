import { describe, expect, it } from 'vitest';
import { buildStudyPlan } from './planner';

describe('study planner', () => {
  it('prioritizes yellow slots before blue ones and keeps the weekly load balanced', () => {
    const plan = buildStudyPlan('35581', {
      availableDays: 5,
      weeklyHours: 10,
      ratings: {
        'algebra-1': 'weak',
        'probability-1': 'weak',
      },
    });

    expect(plan[0].priority).toBe('yellow');
    expect(plan.every((entry) => entry.hours > 0)).toBe(true);
    expect(plan[0].hours).toBeGreaterThanOrEqual(plan[1].hours ?? 0);
  });

  it('keeps the weekly schedule within the given day and hour budget', () => {
    const plan = buildStudyPlan('35581', {
      availableDays: 3,
      weeklyHours: 6,
      ratings: {},
    });

    expect(plan.reduce((sum, entry) => sum + entry.hours, 0)).toBeLessThanOrEqual(6);
    expect(plan.every((entry) => entry.day >= 1 && entry.day <= 3)).toBe(true);
  });
});
