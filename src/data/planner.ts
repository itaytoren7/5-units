import type { Rating } from './syllabus/types';
import { questionnaires } from './syllabus';

export type PlannerSettings = {
  availableDays: number;
  weeklyHours: number;
  ratings?: Record<string, Rating>;
};

export type PlannerEntry = {
  slot: number;
  priority: 'yellow' | 'blue';
  title: string;
  hours: number;
  day: number;
  score: number;
};

function getWeaknessScore(questionnaireCode: string, slotNumber: number, ratings: Record<string, Rating> = {}): number {
  const questionnaire = questionnaires.find((item) => item.code === questionnaireCode) ?? questionnaires[0];
  const match = questionnaire.slots.find((slot) => slot.number === slotNumber);
  if (!match) return 0;

  return questionnaire.topics
    .filter((topic) => match.topicIds.includes(topic.id))
    .flatMap((topic) => topic.subtopics)
    .filter((subtopic) => subtopic.status === 'in')
    .reduce((sum, subtopic) => {
      const rating = ratings[subtopic.id];
      if (rating === 'weak') return sum + 2;
      if (rating === 'medium') return sum + 1;
      return sum;
    }, 0);
}

export function buildStudyPlan(questionnaireCode: string, settings: PlannerSettings): PlannerEntry[] {
  const questionnaire = questionnaires.find((item) => item.code === questionnaireCode) ?? questionnaires[0];
  const availableDays = Math.max(1, Math.min(7, settings.availableDays || 5));
  const weeklyHours = Math.max(1, settings.weeklyHours || 6);
  const ratings = settings.ratings ?? {};

  const candidates = questionnaire.slots
    .map((slot) => ({
      slot: slot.number,
      priority: slot.priority,
      title: slot.title,
      score: getWeaknessScore(questionnaire.code, slot.number, ratings) + (slot.priority === 'yellow' ? 3 : 1),
    }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (a.priority !== b.priority) return a.priority === 'yellow' ? -1 : 1;
      return a.slot - b.slot;
    });

  const limit = Math.max(1, Math.min(candidates.length, Math.ceil(weeklyHours / 2)));
  const selected = candidates.slice(0, limit);
  const hoursPerSlot = Number((weeklyHours / selected.length).toFixed(1));

  return selected.map((entry, index) => ({
    slot: entry.slot,
    priority: entry.priority,
    title: entry.title,
    hours: hoursPerSlot,
    day: (index % availableDays) + 1,
    score: entry.score,
  }));
}
