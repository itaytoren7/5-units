import { problems } from '@/data/problems';
import { questionnaireList } from '../lib/questionnaires';
import { progressOf, ratingOf, slotSubtopics } from '../lib/progress';
import type { SavedState } from '../state/types';
import type { Streak } from './streak';

export type BadgeIcon = 'timer' | 'layers' | 'star' | 'target' | 'flag' | 'trophy' | 'flame' | 'zap' | 'award' | 'pencil';

export interface BadgeDefinition {
  id: string;
  title: string;
  description: string;
  icon: BadgeIcon;
  earned: (context: BadgeContext) => boolean;
}

export interface BadgeContext {
  saved: SavedState;
  streak: Streak;
}

/** A problem counts as solved once every section has a self-mark. */
export function solvedProblemCount(saved: SavedState): number {
  let count = 0;
  for (const problem of problems) {
    const record = saved.practice[problem.id];
    if (record && problem.sections.every((section) => record.sectionResults[section.id] !== undefined)) count += 1;
  }
  return count;
}

export function masteredSlotExists(saved: SavedState): boolean {
  return questionnaireList.some((questionnaire) =>
    questionnaire.slots.some((slot) => {
      const inScope = slotSubtopics(questionnaire, slot).filter((subtopic) => subtopic.status === 'in');
      return inScope.length > 0 && inScope.every((subtopic) => ratingOf(saved.ratings, subtopic.id) === 'mastered');
    }),
  );
}

export const badges: BadgeDefinition[] = [
  { id: 'first-simulation', title: 'סימולציה ראשונה', description: 'סיימתם ודירגתם בחינת דמה ראשונה', icon: 'timer', earned: ({ saved }) => saved.exams.length >= 1 },
  { id: 'five-simulations', title: 'חמש סימולציות', description: 'חמש בחינות דמה מאחוריכם', icon: 'layers', earned: ({ saved }) => saved.exams.length >= 5 },
  { id: 'high-score', title: 'ציון 85+', description: 'ציון 85 ומעלה בסימולציה', icon: 'star', earned: ({ saved }) => saved.exams.some((exam) => exam.score >= 85) },
  { id: 'slot-mastered', title: 'שאלה שלמה ב״שולט״', description: 'כל תתי-הנושאים של שאלה אחת בבחינה מסומנים ״שולט״', icon: 'target', earned: ({ saved }) => masteredSlotExists(saved) },
  { id: 'half-way', title: 'חצי הדרך', description: '50% התקדמות באחד השאלונים', icon: 'flag', earned: ({ saved }) => questionnaireList.some((questionnaire) => progressOf(questionnaire, saved.ratings).percent >= 50) },
  { id: 'full-questionnaire', title: 'שאלון שלם ב״שולט״', description: '100% התקדמות בשאלון', icon: 'trophy', earned: ({ saved }) => questionnaireList.some((questionnaire) => progressOf(questionnaire, saved.ratings).percent >= 100) },
  { id: 'streak-3', title: 'רצף 3 ימים', description: 'שלושה ימי לימוד ברצף', icon: 'flame', earned: ({ streak }) => streak.longest >= 3 },
  { id: 'streak-7', title: 'רצף שבוע', description: 'שבעה ימי לימוד ברצף', icon: 'flame', earned: ({ streak }) => streak.longest >= 7 },
  { id: 'streak-30', title: 'רצף חודש', description: 'שלושים ימי לימוד ברצף', icon: 'zap', earned: ({ streak }) => streak.longest >= 30 },
  { id: 'ten-problems', title: '10 תרגילים', description: 'עשרה תרגילים עם הערכה עצמית בכל הסעיפים', icon: 'pencil', earned: ({ saved }) => solvedProblemCount(saved) >= 10 },
];

export function evaluateBadges(context: BadgeContext): string[] {
  return badges.filter((badge) => badge.earned(context)).map((badge) => badge.id);
}
