import type { SavedState } from './types';

export const STORAGE_KEY = 'bagrut:v1';

export function defaultState(): SavedState {
  return {
    version: 1,
    theme: 'light',
    focusMode: 'focus-2026',
    examDates: {},
    ratings: {},
    verifiedProblems: {},
    practice: {},
    mistakes: [],
    reviews: [],
    exams: [],
    pastExams: [],
    planner: { hoursPerWeek: 10, studyDays: [0, 1, 2, 3, 4], sessionMinutes: 60 },
    planOverrides: {},
    activeExam: null,
  };
}
