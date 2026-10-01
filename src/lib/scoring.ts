import type { QuestionnaireCode } from '@/data/problems/types';

export interface ExamAnswer {
  slot: number;
  /** 0..1 share of the question's points earned. */
  fraction: number;
}

export function getQuestionValue(questionnaire: QuestionnaireCode): number {
  return questionnaire === '35581' ? 22 : 100 / 3;
}

export function clampFraction(value: number): number {
  const normalized = Number.isFinite(value) ? value : 0;
  const asFraction = normalized > 1 ? normalized / 100 : normalized;
  return Math.min(1, Math.max(0, asFraction));
}

/** 35581: min(100, Σ 22·fraction); 35582: Σ 33⅓·fraction. */
export function calculateExamScore(questionnaire: QuestionnaireCode, answers: ExamAnswer[]): number {
  const value = getQuestionValue(questionnaire);
  const total = answers.reduce((sum, answer) => sum + clampFraction(answer.fraction) * value, 0);
  const rounded = Math.round(total * 100) / 100;
  return questionnaire === '35581' ? Math.min(100, rounded) : rounded;
}
