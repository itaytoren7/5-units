import type { QuestionnaireCode, SourceAttribution } from '../problems/types';

/**
 * A lesson is one sub-topic of the study book (תת-נושא), e.g. "משפט הסינוסים".
 * 'partial' = only part of the book section is in the 2026 exam (statusNote says which part).
 * Lessons whose status is 'out-original' / 'out-2026' are listed without exercises (they may return in a later מיקוד).
 */
export type LessonStatus = 'in' | 'partial' | 'out-original' | 'out-2026';

export type ChapterId = 'euclidean-geometry' | 'analytic-geometry' | 'trigonometry' | 'calculus' | 'sequences' | 'probability' | 'word-problems';

export interface Chapter {
  id: ChapterId;
  questionnaire: QuestionnaireCode;
  title: string;
  /** One or two sentences: what the chapter is and which bagrut questions it feeds. */
  description: string;
  /** Syllabus topics the chapter covers (links to /topic/...). */
  topicIds: string[];
  /** Bagrut question numbers (slots) of the questionnaire that rely on the chapter. */
  slots: number[];
}

/** A number the student types in; checked automatically. Label is short Markdown, e.g. '$x$' or 'אורך הצלע $BC$'. */
export interface NumericAnswer {
  label: string;
  value: number;
  /** Absolute tolerance; when omitted the checker accepts max(0.006, 0.5% of |value|). */
  tolerance?: number;
}

/** Attribution for exercises adapted from openly licensed sources. */
export type ExerciseSource = SourceAttribution;

/** A short, focused exercise of a lesson (one skill). All text is Markdown + KaTeX. */
export interface LessonExercise {
  /** `${lessonId}-${n}` for authored exercises, `${lessonId}-os${n}` for open-source ones. */
  id: string;
  /** 1 = warm-up, 2 = bagrut level, 3 = hard bagrut level */
  difficulty: 1 | 2 | 3;
  statement: string;
  /** Optional inline SVG, viewBox="0 0 320 240", no width/height, stroke="currentColor". */
  figureSvg?: string;
  /** 1–3 progressive hints. */
  hints: string[];
  /** 2–8 fully justified steps. */
  solutionSteps: string[];
  finalAnswer: string;
  /** Numeric answers for the automatic check (omit for proofs / expressions / sets). */
  answers?: NumericAnswer[];
  source?: ExerciseSource;
}

export interface LessonMeta {
  /** Stable id, e.g. 'trig-sine-law'. Used in URLs and in saved progress. */
  id: string;
  chapterId: ChapterId;
  /** The questionnaire whose syllabus the subtopicIds come from (almost always the chapter's). */
  questionnaire: QuestionnaireCode;
  /** Main syllabus topic of the lesson. */
  topicId: string;
  title: string;
  status: LessonStatus;
  /** Why a lesson is partial / out, or what part of it the exam needs. */
  statusNote?: string;
  /** Syllabus subtopics practised in the lesson (status 'in' for in/partial lessons). */
  subtopicIds: string[];
  /** Bagrut question numbers the lesson prepares for. */
  slots: number[];
  /** 'review' = a mixed / summary section of the book (תרגילים מסכמים, שאלות חזרה…). */
  kind: 'core' | 'review';
  /** Not a section of the book, added because the exam needs it. */
  extra?: boolean;
}

/** What content authors write for each in-scope lesson. */
export interface LessonContent {
  /** 2–5 sentences: the idea of the lesson and how it shows up in the bagrut. */
  intro: string;
  /** 3–7 bullets: definitions, theorems, formulas, method. */
  keyFacts: string[];
  exercises: LessonExercise[];
}

export interface Lesson extends LessonMeta, LessonContent {
  /** 1-based position inside the chapter. */
  order: number;
}
