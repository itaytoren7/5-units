import { describe, expect, it } from 'vitest';
import { defaultState } from '../state/defaults';
import { learnedSlots, learnedSubtopicIds } from './learned';
import { combinedProgress, lessonProgress } from './lessonProgress';

const lesson = { exercises: [{ id: 'a-1' }, { id: 'a-2' }, { id: 'a-3' }, { id: 'a-4' }] } as Parameters<typeof lessonProgress>[0];

describe('lesson progress', () => {
  it('counts correct and wrong exercises', () => {
    const state = defaultState();
    state.practice['a-1'] = { problemId: 'a-1', sectionResults: { 'a-1': 'correct' }, attempts: 1, lastPracticedAt: '2026-09-01T00:00:00Z' };
    state.practice['a-2'] = { problemId: 'a-2', sectionResults: { 'a-2': 'wrong' }, attempts: 2, lastPracticedAt: '2026-09-01T00:00:00Z' };
    expect(lessonProgress(lesson, state)).toEqual({ total: 4, correct: 1, wrong: 1, attempted: 2, percent: 25 });
    expect(combinedProgress([lesson, { exercises: [] } as Parameters<typeof lessonProgress>[0]], state).percent).toBe(25);
  });
});

describe('learned lessons', () => {
  it('maps learned lessons to syllabus subtopics and bagrut questions, ignoring out-of-scope lessons', () => {
    const state = defaultState();
    state.learnedLessons = { 'trig-sine-law': true, 'seq-arithmetic-intro': true };
    expect([...learnedSubtopicIds(state)]).toEqual(['trig-triangle-solutions']);
    expect([...learnedSlots(state)]).toEqual(['35581-5']);
  });
});
