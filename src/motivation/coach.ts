import { addDays, daysBetween } from '../lib/dates';
import type { ExamRecord, ReviewItem } from '../state/types';

/**
 * "המאמן הקשוח" — negative feedback. Pure functions that decide WHEN to push and WHAT to say.
 * Tone (chosen by the student): direct, no sugar-coating, always ending with one concrete action.
 */
export type CoachKind = 'streak-broken' | 'streak-at-risk' | 'overdue-reviews' | 'low-score' | 'score-drop' | 'fast-peek' | 'repeat-wrong' | 'missed-sessions';

export interface CoachMessage {
  /** Stable per occurrence, so the same message is not queued twice. */
  id: string;
  kind: CoachKind;
  title: string;
  body: string;
  action?: { label: string; to: string };
}

export interface StreakBreak {
  /** Length of the streak that was lost. */
  length: number;
  /** Last day of that streak (YYYY-MM-DD). */
  lastDay: string;
  /** Whole days without study since then, not counting today. */
  daysOff: number;
}

/**
 * A streak is "broken" when neither today nor yesterday has activity, but there was activity before.
 * Once the student studies again today, there is nothing to scold about.
 */
export function findStreakBreak(days: Iterable<string>, today: string): StreakBreak | null {
  const set = new Set(days);
  if (set.has(today) || set.has(addDays(today, -1))) return null;
  const past = [...set].filter((day) => day < today).sort();
  const lastDay = past[past.length - 1];
  if (!lastDay) return null;
  let length = 0;
  let cursor = lastDay;
  while (set.has(cursor)) {
    length += 1;
    cursor = addDays(cursor, -1);
  }
  return { length, lastDay, daysOff: daysBetween(lastDay, today) - 1 };
}

function examLine(daysToExam: number | null): string {
  if (daysToExam === null) return '';
  if (daysToExam <= 0) return ' הבחינה כבר כאן.';
  return ` נשארו ${daysToExam} ימים לבחינה.`;
}

export function streakBrokenMessage(info: StreakBreak, daysToExam: number | null): CoachMessage {
  const lost = info.length === 1 ? 'יום אחד של למידה' : `רצף של ${info.length} ימים`;
  const off = info.daysOff === 1 ? 'יום שלם' : `${info.daysOff} ימים`;
  return {
    id: `streak-broken:${info.lastDay}`,
    kind: 'streak-broken',
    title: 'הרצף נשבר.',
    body: `${lost}, ואחריו ${off} בלי כלום.${examLine(daysToExam)} בגרות לא מחכה לאף אחד. 20 דקות היום, ואתם חוזרים למסלול.`,
    action: { label: 'תרגיל אחד עכשיו', to: '/?daily=1' },
  };
}

/** Evening warning while the streak is still alive only thanks to yesterday. */
export function streakAtRiskMessage(current: number, activeToday: boolean, hour: number, today: string): CoachMessage | null {
  if (activeToday || current < 1 || hour < 18) return null;
  return {
    id: `streak-at-risk:${today}`,
    kind: 'streak-at-risk',
    title: `הרצף של ${current} ${current === 1 ? 'יום' : 'ימים'} מת בחצות.`,
    body: 'היום עוד לא עשיתם כלום. תרגיל אחד, עכשיו, וזה מכוסה. תירוצים לא נכנסים לרצף.',
    action: { label: 'לתרגיל היומי', to: '/?daily=1' },
  };
}

/** Reviews that are at least `graceDays` past their due date. */
export function overdueReviews(reviews: ReviewItem[], today: string, graceDays = 2): ReviewItem[] {
  return reviews.filter((review) => !review.completedAt && daysBetween(review.dueAt, today) >= graceDays);
}

export function overdueMessage(reviews: ReviewItem[], today: string): CoachMessage | null {
  const overdue = overdueReviews(reviews, today);
  if (overdue.length === 0) return null;
  const oldest = Math.max(...overdue.map((review) => daysBetween(review.dueAt, today)));
  return {
    id: `overdue:${today}`,
    kind: 'overdue-reviews',
    title: overdue.length === 1 ? 'חזרה אחת באיחור.' : `${overdue.length} חזרות באיחור.`,
    body: `הוותיקה שבהן מחכה כבר ${oldest} ימים. טעות שלא חוזרים עליה חוזרת בבגרות, ושם היא עולה נקודות. עשר דקות ומסיימים עם זה.`,
    action: { label: 'לחזרות', to: '/mistakes' },
  };
}

export interface ExamFeedbackInput {
  exam: Pick<ExamRecord, 'id' | 'questionnaire' | 'score' | 'grades' | 'chosenSlots'>;
  /** Earlier exams of the same questionnaire, newest first. */
  previous: Array<Pick<ExamRecord, 'score'>>;
}

/** Below 55, or 5+ points under the previous simulation of the same questionnaire. */
export function examFeedbackMessage({ exam, previous }: ExamFeedbackInput): CoachMessage | null {
  const score = Math.round(exam.score);
  const last = previous[0];
  const drop = last ? Math.round(last.score) - score : 0;
  const weak = exam.chosenSlots.filter((slot) => (exam.grades[String(slot)] ?? 0) < 0.5).sort((a, b) => a - b);
  const weakLine = weak.length ? ` השאלות שהפילו אתכם: ${weak.map((slot) => `שאלה ${slot}`).join(', ')}.` : '';
  if (score < 55) {
    return {
      id: `exam:${exam.id}`,
      kind: 'low-score',
      title: `${score}. זה לא עובר.`,
      body: `${drop >= 5 ? `וזו ירידה של ${drop} נקודות מהסימולציה הקודמת. ` : ''}${weakLine} עוד סימולציה עכשיו לא תעזור. קודם חוזרים לשיעורים של השאלות האלה, ורק אחר כך בוחנים שוב.`.trim(),
      action: { label: 'לשיעורים', to: '/learn' },
    };
  }
  if (drop >= 5) {
    return {
      id: `exam:${exam.id}`,
      kind: 'score-drop',
      title: `ירידה של ${drop} נקודות.`,
      body: `מ-${Math.round(last!.score)} ל-${score}.${weakLine} זה לא מקרה. בדקו בדיוק איפה איבדתם נקודות, ורשמו כל טעות ביומן לפני שממשיכים.`,
      action: { label: 'ליומן הטעויות', to: '/mistakes' },
    };
  }
  return null;
}

/** Opening the full solution this fast, without a single hint, is copying — not studying. */
export const FAST_PEEK_SECONDS = 60;

export function isFastPeek(seconds: number, hintsUsed: number): boolean {
  return hintsUsed === 0 && seconds < FAST_PEEK_SECONDS;
}

export function fastPeekMessage(seconds: number, countToday: number, at: string): CoachMessage {
  const repeat = countToday > 1 ? ` זו הפעם ה-${countToday} היום.` : '';
  return {
    id: `peek:${at}`,
    kind: 'fast-peek',
    title: seconds < 1.5 ? 'פתרון אחרי שנייה, בלי אף רמז.' : `פתרון אחרי ${Math.round(seconds)} שניות, בלי אף רמז.`,
    body: `ככה לא לומדים, ככה מעתיקים.${repeat} בבגרות אין כפתור פתרון. בפעם הבאה: שלוש דקות לבד, אחר כך רמז, ורק אז פתרון.`,
  };
}

/** Consecutive wrong results inside one lesson / bagrut question before the coach steps in. */
export const REPEAT_WRONG_LIMIT = 3;

export function repeatWrongMessage(groupTitle: string, to: string, at: string): CoachMessage {
  return {
    id: `repeat-wrong:${at}`,
    kind: 'repeat-wrong',
    title: `${REPEAT_WRONG_LIMIT} טעויות ברצף ב${groupTitle}.`,
    body: 'זה לא מזל, זה חור בחומר. עצרו, קראו שוב את ההסבר ואת נקודות המפתח, ורק אז חזרו לתרגל.',
    action: { label: 'חזרה להסבר', to },
  };
}

export function missedSessionsMessage(missed: number, today: string): CoachMessage | null {
  if (missed < 1) return null;
  return {
    id: `missed:${today}`,
    kind: 'missed-sessions',
    title: missed === 1 ? 'פספסתם מפגש מהתוכנית.' : `פספסתם ${missed} מפגשים מהתוכנית.`,
    body: 'תוכנית שלא מבצעים היא רק רשימה. השלימו את מה שפספסתם או עדכנו את התוכנית, אבל אל תעמידו פנים שזה לא קרה.',
    action: { label: 'למתכנן', to: '/planner' },
  };
}
