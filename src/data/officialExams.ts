import type { QuestionnaireCode } from './problems/types';

/**
 * Official bagrut exams on the Ministry of Education site (meyda.education.gov.il).
 * Only links are stored — the PDFs stay on the ministry site. Checked to exist on 2026-10-03.
 * URL pattern: https://meyda.education.gov.il/sheeloney_bagrut/<year>/<session>/HEB/<questionnaire>.pdf
 */
export interface OfficialExam {
  /** `${questionnaire}-${year}-${session}` */
  id: string;
  questionnaire: QuestionnaireCode;
  year: number;
  /** Ministry session code: 1 winter, 2 winter (נבצרים), 3 late winter, 6 summer A, 8 summer B, 9 special. */
  session: number;
  moed: string;
  /** e.g. 'תשפ״ה' */
  hebrewYear: string;
  url: string;
}

export const moedBySession: Record<number, string> = {
  1: 'חורף',
  2: 'חורף (נבצרים)',
  3: 'חורף מאוחר',
  6: 'קיץ, מועד א׳',
  8: 'קיץ, מועד ב׳',
  9: 'מועד מיוחד (קיץ)',
};

const hebrewYears: Record<number, string> = {
  2016: 'תשע״ו',
  2017: 'תשע״ז',
  2018: 'תשע״ח',
  2019: 'תשע״ט',
  2020: 'תש״ף',
  2021: 'תשפ״א',
  2022: 'תשפ״ב',
  2023: 'תשפ״ג',
  2024: 'תשפ״ד',
  2025: 'תשפ״ה',
  2026: 'תשפ״ו',
};

const sessionsByYear: Record<number, number[]> = {
  2016: [1, 6, 8],
  2017: [1, 6, 8],
  2018: [1, 6, 8],
  2019: [1, 6, 8],
  2020: [1, 6, 8],
  2021: [1, 2, 3, 6, 8, 9],
  2022: [1, 2, 6, 8],
  2023: [1, 6, 8],
  2024: [1, 6, 8],
  2025: [1, 6, 8],
  2026: [1, 6, 8],
};

export const OFFICIAL_SOLUTIONS_URL = 'https://students.education.gov.il/matriculation-exams/solutions';

export const officialExams: OfficialExam[] = Object.entries(sessionsByYear)
  .flatMap(([yearText, sessions]) => {
    const year = Number(yearText);
    return (['35581', '35582'] as QuestionnaireCode[]).flatMap((questionnaire) =>
      sessions.map((session) => ({
        id: `${questionnaire}-${year}-${session}`,
        questionnaire,
        year,
        session,
        moed: moedBySession[session],
        hebrewYear: hebrewYears[year],
        url: `https://meyda.education.gov.il/sheeloney_bagrut/${year}/${session}/HEB/${questionnaire}.pdf`,
      })),
    );
  })
  .sort((a, b) => b.year - a.year || b.session - a.session || a.questionnaire.localeCompare(b.questionnaire));

/** From summer 2026 the format changed (35581: 4 hours, 5 of 8 with no chapter restriction, 22 points each). */
export function isNewFormat(exam: Pick<OfficialExam, 'year' | 'session'>): boolean {
  return exam.year > 2026 || (exam.year === 2026 && exam.session >= 6);
}
