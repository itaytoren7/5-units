import type { Questionnaire, QuestionSlot, Rating, Subtopic, Topic } from '@/data/syllabus/types';

export const ratingOrder: Rating[] = ['not-started', 'weak', 'medium', 'mastered'];

export const ratingLabels: Record<Rating, string> = {
  'not-started': 'לא התחלתי',
  weak: 'חלש',
  medium: 'בינוני',
  mastered: 'שולט',
};

/** How much of a subtopic counts as "done" for progress bars. */
export const ratingScore: Record<Rating, number> = {
  'not-started': 0,
  weak: 0.25,
  medium: 0.6,
  mastered: 1,
};

export interface Progress {
  percent: number;
  total: number;
  counts: Record<Rating, number>;
}

export function ratingOf(ratings: Record<string, Rating>, subtopicId: string): Rating {
  return ratings[subtopicId] ?? 'not-started';
}

export function progressOfSubtopics(subtopics: Subtopic[], ratings: Record<string, Rating>): Progress {
  const inScope = subtopics.filter((subtopic) => subtopic.status === 'in');
  const counts: Record<Rating, number> = { 'not-started': 0, weak: 0, medium: 0, mastered: 0 };
  let score = 0;
  for (const subtopic of inScope) {
    const rating = ratingOf(ratings, subtopic.id);
    counts[rating] += 1;
    score += ratingScore[rating];
  }
  return { percent: inScope.length ? Math.round((score / inScope.length) * 100) : 0, total: inScope.length, counts };
}

export function inScopeSubtopics(questionnaire: Questionnaire): Subtopic[] {
  return questionnaire.topics.flatMap((topic) => topic.subtopics).filter((subtopic) => subtopic.status === 'in');
}

export function progressOf(questionnaire: Questionnaire, ratings: Record<string, Rating>): Progress {
  return progressOfSubtopics(questionnaire.topics.flatMap((topic) => topic.subtopics), ratings);
}

export function topicsOfSlot(questionnaire: Questionnaire, slot: QuestionSlot): Topic[] {
  return slot.topicIds
    .map((id) => questionnaire.topics.find((topic) => topic.id === id))
    .filter((topic): topic is Topic => Boolean(topic));
}

export function slotSubtopics(questionnaire: Questionnaire, slot: QuestionSlot): Subtopic[] {
  return topicsOfSlot(questionnaire, slot).flatMap((topic) => topic.subtopics);
}

export function slotProgress(questionnaire: Questionnaire, slot: QuestionSlot, ratings: Record<string, Rating>): Progress {
  return progressOfSubtopics(slotSubtopics(questionnaire, slot), ratings);
}

export function topicProgress(topic: Topic, ratings: Record<string, Rating>): Progress {
  return progressOfSubtopics(topic.subtopics, ratings);
}

/** Subtopics rated weak (or never started), used by the planner and dashboard. */
export function weakSubtopics(questionnaire: Questionnaire, ratings: Record<string, Rating>): Subtopic[] {
  return inScopeSubtopics(questionnaire).filter((subtopic) => {
    const rating = ratingOf(ratings, subtopic.id);
    return rating === 'weak' || rating === 'not-started';
  });
}
