import { isInScope, lessonCatalog } from '@/data/lessons/catalog';
import type { SavedState } from '../state/types';

/** True when the student marked at least one lesson as learned (otherwise nothing is filtered). */
export function hasLearnedFilter(state: Pick<SavedState, 'learnedLessons'>): boolean {
  return Object.keys(state.learnedLessons).length > 0;
}

/** Syllabus subtopics covered by the lessons marked as learned in class. */
export function learnedSubtopicIds(state: Pick<SavedState, 'learnedLessons'>): Set<string> {
  const ids = new Set<string>();
  for (const meta of lessonCatalog) if (state.learnedLessons[meta.id] && isInScope(meta.status)) meta.subtopicIds.forEach((id) => ids.add(id));
  return ids;
}

/** Bagrut question numbers (per questionnaire) that rely on learned lessons. */
export function learnedSlots(state: Pick<SavedState, 'learnedLessons'>): Set<string> {
  const slots = new Set<string>();
  for (const meta of lessonCatalog) if (state.learnedLessons[meta.id] && isInScope(meta.status)) meta.slots.forEach((slot) => slots.add(`${meta.questionnaire}-${slot}`));
  return slots;
}
