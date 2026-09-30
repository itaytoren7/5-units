export type ExamAnswer = {
  slot: number;
  fraction: number;
};

export function getQuestionValue(questionnaireCode: '35581' | '35582'): number {
  return questionnaireCode === '35581' ? 22 : 100 / 3;
}

export function calculateExamScore(questionnaireCode: '35581' | '35582', answers: ExamAnswer[]): number {
  const value = getQuestionValue(questionnaireCode);
  const total = answers.reduce((sum, answer) => {
    const normalized = Number(answer.fraction ?? 0);
    const clamped = Math.min(1, Math.max(0, normalized > 1 ? normalized / 100 : normalized));
    return sum + clamped * value;
  }, 0);

  if (questionnaireCode === '35581') {
    return Math.min(100, total);
  }

  return total;
}
