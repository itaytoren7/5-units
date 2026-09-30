import { describe, expect, it } from 'vitest';
import { questionnaires } from './index';
import type { Status } from './types';

const validStatuses: Status[] = ['in', 'out-original', 'out-2026'];

describe('syllabus data integrity', () => {
  it('has unique topic and subtopic ids and valid statuses', () => {
    for (const questionnaire of questionnaires) {
      const topicIds = questionnaire.topics.map((topic) => topic.id);
      const subtopicIds = questionnaire.topics.flatMap((topic) => topic.subtopics.map((subtopic) => subtopic.id));
      expect(new Set(topicIds).size).toBe(topicIds.length);
      expect(new Set(subtopicIds).size).toBe(subtopicIds.length);
      for (const topic of questionnaire.topics) {
        for (const subtopic of topic.subtopics) expect(validStatuses).toContain(subtopic.status);
      }
      for (const slot of questionnaire.slots) {
        for (const id of slot.topicIds) expect(topicIds, `${questionnaire.code} slot ${slot.number}: ${id}`).toContain(id);
      }
    }
  });
});
