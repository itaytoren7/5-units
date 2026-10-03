import type { Lesson } from '@/data/lessons/types';
import type { SavedState, SectionResult } from '../state/types';

export function exerciseResult(state: Pick<SavedState, 'practice'>, exerciseId: string): SectionResult | undefined {
  return state.practice[exerciseId]?.sectionResults[exerciseId];
}

export interface LessonProgress {
  total: number;
  correct: number;
  wrong: number;
  attempted: number;
  percent: number;
}

export function lessonProgress(lesson: Pick<Lesson, 'exercises'>, state: Pick<SavedState, 'practice'>): LessonProgress {
  let correct = 0;
  let wrong = 0;
  let attempted = 0;
  for (const exercise of lesson.exercises) {
    const result = exerciseResult(state, exercise.id);
    if (!result) continue;
    attempted += 1;
    if (result === 'correct') correct += 1;
    if (result === 'wrong') wrong += 1;
  }
  const total = lesson.exercises.length;
  return { total, correct, wrong, attempted, percent: total ? Math.round((correct / total) * 100) : 0 };
}

export function combinedProgress(lessons: Array<Pick<Lesson, 'exercises'>>, state: Pick<SavedState, 'practice'>): LessonProgress {
  const parts = lessons.map((lesson) => lessonProgress(lesson, state));
  const total = parts.reduce((sum, part) => sum + part.total, 0);
  const correct = parts.reduce((sum, part) => sum + part.correct, 0);
  return {
    total,
    correct,
    wrong: parts.reduce((sum, part) => sum + part.wrong, 0),
    attempted: parts.reduce((sum, part) => sum + part.attempted, 0),
    percent: total ? Math.round((correct / total) * 100) : 0,
  };
}
