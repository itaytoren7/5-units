export type QuestionnaireCode = '35581' | '35582';
export type ProblemSource = 'ai-generated' | 'teacher' | 'self';
export type Difficulty = 1 | 2 | 3;

/** One סעיף of a multi-section bagrut-style problem. All text fields are Markdown with KaTeX ($...$ / $$...$$). */
export interface ProblemSection {
  /** `${problemId}-${label index}`, e.g. '35581-3-1-a' */
  id: string;
  /** Hebrew section letter: 'א' | 'ב' | 'ג' | 'ד' */
  label: string;
  statement: string;
  /** Progressive hints, revealed one at a time (2–3). */
  hints: string[];
  /** Full step-by-step solution (3–8 steps). */
  solutionSteps: string[];
  finalAnswer: string;
  /** Decimal value of the final answer when it is a single number — enables independent numeric verification. */
  numericAnswer?: number;
}

export interface Problem {
  /** `${questionnaire}-${slot}-${n}`, e.g. '35581-3-1' */
  id: string;
  questionnaire: QuestionnaireCode;
  slot: number;
  /** Short Hebrew title shown in lists, e.g. 'הסתברות מותנית בבית חולים' */
  title: string;
  topicId: string;
  /** Only subtopics whose status is 'in'. */
  subtopicIds: string[];
  difficulty: Difficulty;
  estimatedMinutes: number;
  sections: ProblemSection[];
  /** Seeded problems are always false until the student ticks "בדקתי". */
  verified: boolean;
  source: ProblemSource;
  /** Optional inline SVG (viewBox-based, no fixed width/height) describing the figure for geometry problems. */
  figureSvg?: string;
}
