import type { Problem } from '@/data/problems/types';
import { problemById } from '@/data/problems';
import { lessonIdOfExercise, lessonMetaById, lessonPath } from '@/data/lessons/catalog';
import { daysBetween, todayIso } from './dates';
import type { ReviewItem, SavedState } from '../state/types';

export type ProblemStatus = 'new' | 'in-progress' | 'needs-review' | 'done';

export const problemStatusLabels: Record<ProblemStatus, string> = {
  new: 'לא תורגל',
  'in-progress': 'בתהליך',
  'needs-review': 'לחזור',
  done: 'הושלם',
};

export function problemStatus(problem: Problem, state: SavedState): ProblemStatus {
  const record = state.practice[problem.id];
  if (!record) return 'new';
  const results = problem.sections.map((section) => record.sectionResults[section.id]);
  if (results.some((result) => result === 'wrong')) return 'needs-review';
  if (results.every((result) => result === 'correct')) return 'done';
  return 'in-progress';
}

export function openReviews(state: SavedState): ReviewItem[] {
  return state.reviews.filter((review) => !review.completedAt);
}

export function dueReviews(state: SavedState, today = todayIso()): ReviewItem[] {
  return openReviews(state)
    .filter((review) => daysBetween(today, review.dueAt) <= 0)
    .sort((a, b) => a.dueAt.localeCompare(b.dueAt));
}

export function upcomingReviews(state: SavedState, today = todayIso()): ReviewItem[] {
  return openReviews(state)
    .filter((review) => daysBetween(today, review.dueAt) > 0)
    .sort((a, b) => a.dueAt.localeCompare(b.dueAt));
}

/** Exercise number inside its lesson ('trig-sine-law-3' → '3', '…-os2' → 'מקור פתוח 2'). */
function exerciseLabel(exerciseId: string, lessonId: string): string {
  const rest = exerciseId.slice(lessonId.length + 1);
  return rest.startsWith('os') ? `תרגיל ממקור פתוח ${rest.slice(2)}` : `תרגיל ${rest}`;
}

export function reviewTitle(review: ReviewItem, state: SavedState): string {
  if (review.sourceType === 'problem') {
    const problem = problemById(review.sourceId);
    if (problem) return problem.title;
    const lesson = lessonMetaById(lessonIdOfExercise(review.sourceId));
    if (lesson) return `${lesson.title}: ${exerciseLabel(review.sourceId, lesson.id)}`;
    return 'תרגיל שנמחק';
  }
  const mistake = state.mistakes.find((entry) => entry.id === review.sourceId);
  return mistake ? mistake.description || 'טעות ללא תיאור' : 'טעות שנמחקה';
}

export function nextExam(state: SavedState, today = todayIso()): { code: string; date: string; days: number } | null {
  const dated = Object.entries(state.examDates)
    .map(([code, date]) => ({ code, date, days: daysBetween(today, date) }))
    .filter((entry) => entry.days >= 0)
    .sort((a, b) => a.days - b.days);
  return dated[0] ?? null;
}

/** Where a review item takes the student: the bagrut problem, the lesson exercise, or the mistakes log. */
export function reviewLink(review: ReviewItem): string {
  if (review.sourceType !== 'problem') return '/mistakes';
  if (problemById(review.sourceId)) return `/practice/${review.sourceId}`;
  const lesson = lessonMetaById(lessonIdOfExercise(review.sourceId));
  return lesson ? `${lessonPath(lesson)}#ex-${review.sourceId}` : '/mistakes';
}
