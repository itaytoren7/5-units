import { questionnaire35581 } from './35581';
import { questionnaire35582 } from './35582';

export { questionnaire35581, questionnaire35582 };
export const questionnaires = [questionnaire35581, questionnaire35582] as const;
export type { Questionnaire, QuestionSlot, Rating, Status, Subtopic, Topic } from './types';

/** Exam dates published with the 2027 מיקוד (571.pdf / 572.pdf). Keys are the internal questionnaire codes. */
export const examSessions: Array<{ id: string; label: string; note?: string; dates: Record<string, string> }> = [
  { id: 'winter-2027', label: 'חורף 2027', dates: { '35582': '2027-01-11', '35581': '2027-01-12' } },
  { id: 'summer-2027', label: 'קיץ 2027, מועד א׳', note: 'טיוטה', dates: { '35581': '2027-05-26', '35582': '2027-05-26' } },
  { id: 'summer-b-2027', label: 'קיץ 2027, מועד ב׳', note: 'טיוטה', dates: { '35581': '2027-07-08', '35582': '2027-07-08' } },
];
