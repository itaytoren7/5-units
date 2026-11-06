import type { QuestionnaireCode } from '../problems/types';

export interface CatalogEntry {
  id: string;
  title: string;
  questionnaire: QuestionnaireCode;
  topicId: string;
  /** One line: what the set covers. */
  summary: string;
  status: 'planned' | 'done';
}

/** The planned sets, in study order. "סט הבא" = the first `planned` entry. */
export const setsCatalog: CatalogEntry[] = [
  { id: 'trig-right-triangle', title: 'טריגונומטריה במשולש ישר זווית', questionnaire: '35581', topicId: 'trigonometry', summary: 'סינוס, קוסינוס וטנגנס במשולש ישר זווית, מצולעים שמתפרקים למשולשים ישרי זווית, ושאלות עם פרמטר α.', status: 'done' },
];

export function nextPlanned(): CatalogEntry | undefined {
  return setsCatalog.find((entry) => entry.status === 'planned');
}
