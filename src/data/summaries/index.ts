import { summaries35581 } from './35581';
import { summaries35582 } from './35582';
import type { QuestionnaireCode } from '../problems/types';
import type { TopicSummary } from './types';

export const summaries: TopicSummary[] = [...summaries35581, ...summaries35582];

export function summaryFor(questionnaire: QuestionnaireCode, topicId: string): TopicSummary | undefined {
  return summaries.find((summary) => summary.questionnaire === questionnaire && summary.topicId === topicId);
}

export type { Formula, ToolId, TopicSummary, WorkedExample } from './types';
