import { describe, expect, it } from 'vitest';
import { defaultState } from '../state/defaults';
import { activityDaysFromState, computeStreak, mergeDays } from './streak';

describe('streak', () => {
  it('counts consecutive days ending today', () => {
    const streak = computeStreak(['2026-10-01', '2026-10-02', '2026-10-03'], '2026-10-03');
    expect(streak).toEqual({ current: 3, longest: 3, activeToday: true, atRisk: false });
  });

  it('keeps yesterday-ending streaks alive but marks them at risk', () => {
    const streak = computeStreak(['2026-09-30', '2026-10-01', '2026-10-02'], '2026-10-03');
    expect(streak.current).toBe(3);
    expect(streak.atRisk).toBe(true);
    expect(streak.activeToday).toBe(false);
  });

  it('breaks after a missed day and remembers the longest run', () => {
    const streak = computeStreak(['2026-09-20', '2026-09-21', '2026-09-22', '2026-09-23', '2026-10-02'], '2026-10-04');
    expect(streak.current).toBe(0);
    expect(streak.longest).toBe(4);
  });

  it('ignores duplicates and unsorted input', () => {
    expect(computeStreak(['2026-10-03', '2026-10-02', '2026-10-03'], '2026-10-03').current).toBe(2);
    expect(mergeDays(['b', 'a'], ['a'])).toEqual(['a', 'b']);
  });

  it('derives activity days from existing practice, exam, mistake and review timestamps', () => {
    const state = defaultState();
    state.practice['p'] = { problemId: 'p', sectionResults: {}, attempts: 1, lastPracticedAt: '2026-09-10T10:00:00.000Z' };
    state.exams.push({ id: 'e', questionnaire: '35581', startedAt: '2026-09-12T08:00:00.000Z', finishedAt: '2026-09-12T12:00:00.000Z', elapsedSeconds: 1, chosenSlots: [], problemBySlot: {}, grades: {}, score: 50, notes: '' });
    state.mistakes.push({ id: 'm', createdAt: '2026-09-14T10:00:00.000Z', questionnaire: '35581', topicId: 't', type: 'reading', description: 'x', correctApproach: '' });
    state.reviews.push({ id: 'r', createdAt: '2026-09-14T10:00:00.000Z', sourceType: 'mistake', sourceId: 'm', questionnaire: '35581', stage: 1, dueAt: '2026-09-15', completedAt: '2026-09-16T10:00:00.000Z' });
    state.reviews.push({ id: 'r2', createdAt: '2026-09-14T10:00:00.000Z', sourceType: 'mistake', sourceId: 'm', questionnaire: '35581', stage: 0, dueAt: '2026-09-15' });
    const days = activityDaysFromState(state);
    expect(days).toHaveLength(4);
    expect(days[0] <= days[1] && days[1] <= days[2]).toBe(true);
  });
});
