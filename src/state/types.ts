import type { QuestionnaireCode } from '@/data/problems/types';
import type { Rating } from '@/data/syllabus/types';

export type Theme = 'light' | 'dark' | 'system';
export type FocusMode = 'focus-2026' | 'full';
export type SectionResult = 'correct' | 'partial' | 'wrong';
export type MistakeType = 'calculation' | 'understanding' | 'reading' | 'time';
export type Moed = 'winter' | 'summer-a' | 'summer-b' | 'other';

export interface PracticeRecord {
  problemId: string;
  sectionResults: Record<string, SectionResult>;
  attempts: number;
  lastPracticedAt: string;
}

export interface MistakeEntry {
  id: string;
  createdAt: string;
  questionnaire: QuestionnaireCode;
  topicId: string;
  problemId?: string;
  sectionId?: string;
  type: MistakeType;
  description: string;
  correctApproach: string;
}

export interface ReviewItem {
  id: string;
  createdAt: string;
  sourceType: 'mistake' | 'problem';
  sourceId: string;
  questionnaire: QuestionnaireCode;
  /** Index into the 1 / 3 / 7 / 14 day ladder. */
  stage: number;
  /** YYYY-MM-DD */
  dueAt: string;
  completedAt?: string;
}

export interface ExamRecord {
  id: string;
  questionnaire: QuestionnaireCode;
  startedAt: string;
  finishedAt: string;
  elapsedSeconds: number;
  chosenSlots: number[];
  /** slot → problem id (null when the bank has no problem for that slot) */
  problemBySlot: Record<string, string | null>;
  /** slot → 0..1 */
  grades: Record<string, number>;
  score: number;
  notes: string;
}

export interface ActiveExam {
  questionnaire: QuestionnaireCode;
  phase: 'setup' | 'running' | 'grading';
  chosenSlots: number[];
  problemBySlot: Record<string, string | null>;
  startedAt: string | null;
  /** ISO datetime when the timer hits zero. */
  endsAt: string | null;
  grades: Record<string, number>;
  /** Minutes-left thresholds already announced (30, 10). */
  alertsShown: number[];
}

export interface PastExamEntry {
  id: string;
  createdAt: string;
  year: number;
  moed: Moed;
  questionnaire: QuestionnaireCode;
  questionNumber: number;
  /** Points earned out of maxScore. */
  score: number;
  maxScore: number;
  notes: string;
  link: string;
}

export interface PlannerSettings {
  hoursPerWeek: number;
  /** 0 = Sunday … 6 = Saturday */
  studyDays: number[];
  sessionMinutes: number;
}

export interface PlanOverride {
  done?: boolean;
  minutes?: number;
  removed?: boolean;
}

/** Progress on one official past exam from the ministry archive (see src/data/officialExams.ts). */
export interface OfficialExamRecord {
  status: 'planned' | 'done';
  /** 0–100 */
  score?: number;
  /** YYYY-MM-DD */
  date?: string;
  notes?: string;
}

export interface SavedState {
  version: 1;
  theme: Theme;
  focusMode: FocusMode;
  examDates: Record<string, string>;
  ratings: Record<string, Rating>;
  verifiedProblems: Record<string, boolean>;
  practice: Record<string, PracticeRecord>;
  mistakes: MistakeEntry[];
  reviews: ReviewItem[];
  exams: ExamRecord[];
  pastExams: PastExamEntry[];
  planner: PlannerSettings;
  planOverrides: Record<string, PlanOverride>;
  activeExam: ActiveExam | null;
  /** Study-book lessons the student has already learned in class (lesson id → true). Empty = no filter. */
  learnedLessons: Record<string, true>;
  /** official exam id → progress */
  officialExams: Record<string, OfficialExamRecord>;
}
