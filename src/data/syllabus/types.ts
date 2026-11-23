export type Status = 'in' | 'out-original' | 'out-2026';
export type Priority = 'yellow' | 'blue';
export type Rating = 'not-started' | 'weak' | 'medium' | 'mastered';

export interface Subtopic {
  id: string;
  title: string;
  status: Status;
  keptExplicitly?: boolean;
  note?: string;
}

export interface Topic {
  id: string;
  title: string;
  subtopics: Subtopic[];
  note?: string;
}

export interface QuestionSlot {
  /** Internal key (matches the problem bank and saved progress). Not necessarily the number printed in the exam. */
  number: number;
  /** The question number in the real exam, when it differs from `number`. */
  examNumber?: number;
  part: string;
  title: string;
  priority: Priority;
  frequency?: 'always' | 'usually' | 'rare';
  topicIds: string[];
  note?: string;
}

export interface Questionnaire {
  /** Internal key, kept from the 2026 structure so saved progress survives. */
  code: string;
  /** The questionnaire number as printed on the exam (e.g. 35571). */
  displayCode: string;
  nickname: string;
  weightPercent: number;
  durationMinutes: number;
  questionsToAnswer: number;
  totalQuestions: number;
  pointsPerQuestion: number;
  maxScore: number;
  chapterRestriction: boolean;
  /** Each group lists slot numbers (internal) of which at least one must be answered. */
  choiceGroups?: number[][];
  /** The choice rule in words. */
  choiceRule?: string;
  partNotes: Record<string, string>;
  slots: QuestionSlot[];
  topics: Topic[];
  warnings: string[];
}
