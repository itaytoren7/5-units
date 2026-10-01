import { questionnaires } from '@/data/syllabus';
import type { QuestionSlot, Questionnaire, Topic } from '@/data/syllabus/types';
import type { QuestionnaireCode } from '@/data/problems/types';

export const questionnaireList: readonly Questionnaire[] = questionnaires;

export function isQuestionnaireCode(value: string | undefined): value is QuestionnaireCode {
  return value === '35581' || value === '35582';
}

export function questionnaireByCode(code: string | undefined): Questionnaire | undefined {
  return questionnaires.find((questionnaire) => questionnaire.code === code);
}

export function slotOf(questionnaire: Questionnaire, number: number): QuestionSlot | undefined {
  return questionnaire.slots.find((slot) => slot.number === number);
}

export function topicOf(questionnaire: Questionnaire, topicId: string): Topic | undefined {
  return questionnaire.topics.find((topic) => topic.id === topicId);
}

export function slotsForTopic(questionnaire: Questionnaire, topicId: string): QuestionSlot[] {
  return questionnaire.slots.filter((slot) => slot.topicIds.includes(topicId));
}

/** Topics that no exam question links to directly (technique / background topics). */
export function backgroundTopics(questionnaire: Questionnaire): Topic[] {
  const linked = new Set(questionnaire.slots.flatMap((slot) => slot.topicIds));
  return questionnaire.topics.filter((topic) => !linked.has(topic.id));
}

export function partsOf(questionnaire: Questionnaire): string[] {
  return [...new Set(questionnaire.slots.map((slot) => slot.part))];
}
