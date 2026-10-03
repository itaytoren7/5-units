import { describe, expect, it } from 'vitest';
import { moedBySession, officialExams } from './officialExams';

describe('official exams catalog', () => {
  it('has unique ids, both questionnaires for every session, and ministry URLs', () => {
    const ids = officialExams.map((exam) => exam.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(officialExams.length).toBe(74);
    for (const exam of officialExams) {
      expect(exam.url).toBe(`https://meyda.education.gov.il/sheeloney_bagrut/${exam.year}/${exam.session}/HEB/${exam.questionnaire}.pdf`);
      expect(moedBySession[exam.session]).toBe(exam.moed);
      expect(exam.hebrewYear).toMatch(/^תש/);
      expect(officialExams.some((other) => other.year === exam.year && other.session === exam.session && other.questionnaire !== exam.questionnaire)).toBe(true);
    }
    expect(officialExams[0].year).toBe(2026);
  });
});
