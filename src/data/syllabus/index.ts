import { questionnaire35581 } from './35581';
import { questionnaire35582 } from './35582';

export { questionnaire35581, questionnaire35582 };
export const questionnaires = [questionnaire35581, questionnaire35582] as const;
export type { Questionnaire, QuestionSlot, Rating, Status, Subtopic, Topic } from './types';
