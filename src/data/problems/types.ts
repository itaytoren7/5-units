export type ProblemSource = 'ai-generated' | 'teacher' | 'self';

export interface ProblemSection {
  id: string;
  label: string;
  statement: string;
  hints: string[];
  solutionSteps: string[];
  finalAnswer: string;
  numericAnswer?: number;
}

export interface Problem {
  id: string;
  questionnaire: '35581' | '35582';
  slot: number;
  topicId: string;
  subtopicIds: string[];
  difficulty: 1 | 2 | 3;
  sections: ProblemSection[];
  verified: boolean;
  source: ProblemSource;
}
