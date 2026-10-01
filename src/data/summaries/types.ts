import type { QuestionnaireCode } from '../problems/types';

export type ToolId = 'function-explorer' | 'unit-circle';

export interface Formula {
  /** Hebrew name, e.g. 'משפט הקוסינוסים' */
  name: string;
  /** KaTeX source without surrounding $ delimiters. */
  latex: string;
  /** Optional Hebrew note (when it applies, sign conventions, etc.). */
  note?: string;
}

export interface WorkedExample {
  title: string;
  /** Markdown + KaTeX */
  problem: string;
  steps: string[];
  answer: string;
}

/** תקציר of a topic — only covers subtopics whose status is 'in'. */
export interface TopicSummary {
  questionnaire: QuestionnaireCode;
  topicId: string;
  /** 2–4 sentences: what the topic is and how it shows up in the exam. Markdown. */
  overview: string;
  /** Definitions and theorems the student must know. Markdown bullets. */
  keyPoints: string[];
  formulas: Formula[];
  /** Typical bagrut question patterns (how questions are phrased, what they ask for). */
  bagrutPatterns: string[];
  commonMistakes: string[];
  workedExamples: WorkedExample[];
  /** Interactive tools to embed on the topic page. */
  tools?: ToolId[];
}
