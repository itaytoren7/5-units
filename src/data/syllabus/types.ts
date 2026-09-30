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
  number: number;
  part: string;
  title: string;
  priority: Priority;
  frequency?: 'always' | 'usually' | 'rare';
  topicIds: string[];
  note?: string;
}

export interface Questionnaire {
  code: string;
  nickname: string;
  weightPercent: number;
  durationMinutes: number;
  questionsToAnswer: number;
  totalQuestions: number;
  pointsPerQuestion: number;
  maxScore: number;
  chapterRestriction: boolean;
  partNotes: Record<string, string>;
  slots: QuestionSlot[];
  topics: Topic[];
  warnings: string[];
}
