import { describe, expect, it } from 'vitest';
import { questionnaires } from '@/data/syllabus';
import { daysBetween } from './dates';
import { buildPlan, type PlannerInput } from './planner';

const base: PlannerInput = {
  questionnaires,
  examDates: { '35581': '2026-07-05', '35582': '2026-07-19' },
  ratings: {},
  hoursPerWeek: 12,
  studyDays: [0, 1, 2, 3, 4],
  sessionMinutes: 60,
  today: '2026-03-01',
};

describe('study planner', () => {
  it('schedules yellow slots before blue slots for each questionnaire', () => {
    const plan = buildPlan(base);
    const study = plan.weeks.flatMap((week) => week.sessions).filter((session) => session.kind === 'study' && session.questionnaire === '35581');
    const firstBlue = study.findIndex((session) => session.priority === 'blue');
    const lastYellow = study.map((session) => session.priority).lastIndexOf('yellow');
    expect(firstBlue).toBeGreaterThan(-1);
    expect(lastYellow).toBeLessThan(firstBlue);
  });

  it('places full simulations in each of the last three weeks before an exam', () => {
    const plan = buildPlan(base);
    const sims = plan.weeks.flatMap((week) => week.sessions).filter((session) => session.kind === 'simulation' && session.questionnaire === '35581');
    expect(sims).toHaveLength(3);
    for (const sim of sims) {
      const gap = daysBetween(sim.date, '2026-07-05');
      expect(gap).toBeGreaterThan(0);
      expect(gap).toBeLessThanOrEqual(28);
      expect(sim.minutes).toBe(240);
    }
  });

  it('respects the weekly budget for study sessions and uses only the chosen days', () => {
    const plan = buildPlan({ ...base, hoursPerWeek: 5, studyDays: [1, 3] });
    for (const week of plan.weeks) {
      const studyMinutes = week.sessions.filter((session) => session.kind === 'study').reduce((sum, session) => sum + session.minutes, 0);
      expect(studyMinutes).toBeLessThanOrEqual(5 * 60);
      for (const session of week.sessions) expect([1, 3]).toContain(new Date(session.date).getDay());
    }
  });

  it('gives weak subtopics more time than mastered ones', () => {
    const weak = buildPlan({ ...base, ratings: { 'probability-basics': 'weak' } });
    const mastered = buildPlan({ ...base, ratings: { 'probability-basics': 'mastered' } });
    expect(weak.totalStudyMinutes).toBeGreaterThan(mastered.totalStudyMinutes);
  });

  it('reports study time that does not fit before the exam', () => {
    const plan = buildPlan({ ...base, hoursPerWeek: 1, today: '2026-06-20' });
    expect(plan.unscheduledMinutes).toBeGreaterThan(0);
  });

  it('plans eight weeks ahead when no exam date is set', () => {
    const plan = buildPlan({ ...base, examDates: {} });
    expect(daysBetween(base.today, plan.horizonEnd)).toBe(56);
    expect(plan.weeks.flatMap((week) => week.sessions).some((session) => session.kind === 'simulation')).toBe(false);
  });
});

describe('study planner partial weeks', () => {
  it('prorates the current week and never overloads a single day', () => {
    // 2026-09-30 is a Wednesday: only Wed and Thu remain of a Sun–Thu week.
    const plan = buildPlan({ ...base, today: '2026-09-30', hoursPerWeek: 10, examDates: {} });
    const first = plan.weeks[0];
    const perDay = new Map<string, number>();
    for (const session of first.sessions) perDay.set(session.date, (perDay.get(session.date) ?? 0) + session.minutes);
    expect(first.totalMinutes).toBeLessThanOrEqual(Math.round((600 * 2) / 5) + 60);
    for (const minutes of perDay.values()) expect(minutes).toBeLessThanOrEqual(180);
  });
});
