import { problems35581 } from './35581';
import { problems35582 } from './35582';
import type { Problem, QuestionnaireCode } from './types';

export const problems: Problem[] = [...problems35581, ...problems35582];

export function problemsFor(questionnaire: QuestionnaireCode, slot?: number): Problem[] {
  return problems.filter((problem) => problem.questionnaire === questionnaire && (slot === undefined || problem.slot === slot));
}

export function problemById(id: string): Problem | undefined {
  return problems.find((problem) => problem.id === id);
}

export type { Difficulty, Problem, ProblemSection, ProblemSource, QuestionnaireCode, SourceAttribution } from './types';
