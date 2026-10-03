import { describe, expect, it } from 'vitest';
import { examFeedbackMessage, fastPeekMessage, findStreakBreak, isFastPeek, missedSessionsMessage, overdueMessage, overdueReviews, streakAtRiskMessage, streakBrokenMessage } from './coach';
import type { ReviewItem } from '../state/types';

describe('findStreakBreak', () => {
  it('reports the lost streak only when today and yesterday are both empty', () => {
    const days = ['2026-09-20', '2026-09-21', '2026-09-22', '2026-09-23'];
    expect(findStreakBreak(days, '2026-09-24')).toBeNull();
    expect(findStreakBreak(days, '2026-09-23')).toBeNull();
    expect(findStreakBreak(days, '2026-09-26')).toEqual({ length: 4, lastDay: '2026-09-23', daysOff: 2 });
    expect(findStreakBreak([...days, '2026-09-26'], '2026-09-26')).toBeNull();
    expect(findStreakBreak([], '2026-09-26')).toBeNull();
  });

  it('counts only the last streak', () => {
    expect(findStreakBreak(['2026-09-01', '2026-09-02', '2026-09-10'], '2026-09-13')).toEqual({ length: 1, lastDay: '2026-09-10', daysOff: 2 });
  });

  it('builds a message with the exam countdown and one action', () => {
    const message = streakBrokenMessage({ length: 6, lastDay: '2026-09-23', daysOff: 3 }, 40);
    expect(message.title).toBe('הרצף נשבר.');
    expect(message.body).toContain('רצף של 6 ימים');
    expect(message.body).toContain('3 ימים בלי כלום');
    expect(message.body).toContain('נשארו 40 ימים לבחינה');
    expect(message.action?.to).toBeTruthy();
    expect(message.id).toBe('streak-broken:2026-09-23');
  });
});

describe('streakAtRiskMessage', () => {
  it('warns only in the evening of a day without study while a streak is alive', () => {
    expect(streakAtRiskMessage(5, false, 19, '2026-09-26')?.title).toContain('5 ימים');
    expect(streakAtRiskMessage(5, false, 12, '2026-09-26')).toBeNull();
    expect(streakAtRiskMessage(5, true, 21, '2026-09-26')).toBeNull();
    expect(streakAtRiskMessage(0, false, 21, '2026-09-26')).toBeNull();
  });
});

describe('overdue reviews', () => {
  const review = (id: string, dueAt: string, completedAt?: string): ReviewItem => ({ id, createdAt: '2026-09-01T00:00:00Z', sourceType: 'mistake', sourceId: id, questionnaire: '35581', stage: 0, dueAt, completedAt });
  it('counts reviews two or more days late, ignoring completed ones', () => {
    const reviews = [review('a', '2026-09-20'), review('b', '2026-09-25'), review('c', '2026-09-10', '2026-09-11T00:00:00Z'), review('d', '2026-09-24')];
    expect(overdueReviews(reviews, '2026-09-26').map((entry) => entry.id)).toEqual(['a', 'd']);
    const message = overdueMessage(reviews, '2026-09-26');
    expect(message?.title).toBe('2 חזרות באיחור.');
    expect(message?.body).toContain('6 ימים');
    expect(overdueMessage([review('b', '2026-09-25')], '2026-09-26')).toBeNull();
  });
});

describe('examFeedbackMessage', () => {
  const exam = (score: number, grades: Record<string, number> = {}) => ({ id: 'e1', questionnaire: '35581' as const, score, grades, chosenSlots: [3, 4, 5, 6, 7] });
  it('pushes hard below 55 and names the weak questions', () => {
    const message = examFeedbackMessage({ exam: exam(48, { 3: 1, 4: 0.2, 5: 0.4, 6: 0.9, 7: 0.7 }), previous: [{ score: 60 }] });
    expect(message?.kind).toBe('low-score');
    expect(message?.body).toContain('ירידה של 12');
    expect(message?.body).toContain('שאלה 4, שאלה 5');
  });
  it('flags a drop of 5+ points, and stays quiet otherwise', () => {
    expect(examFeedbackMessage({ exam: exam(70), previous: [{ score: 78 }] })?.kind).toBe('score-drop');
    expect(examFeedbackMessage({ exam: exam(75), previous: [{ score: 78 }] })).toBeNull();
    expect(examFeedbackMessage({ exam: exam(90), previous: [] })).toBeNull();
  });
});

describe('fast peek and missed sessions', () => {
  it('treats a solution opened under a minute without hints as a fast peek', () => {
    expect(isFastPeek(20, 0)).toBe(true);
    expect(isFastPeek(20, 1)).toBe(false);
    expect(isFastPeek(75, 0)).toBe(false);
    expect(fastPeekMessage(12.4, 3, 'x').body).toContain('הפעם ה-3 היום');
  });
  it('mentions missed planner sessions only when there are some', () => {
    expect(missedSessionsMessage(0, '2026-09-26')).toBeNull();
    expect(missedSessionsMessage(2, '2026-09-26')?.title).toContain('2 מפגשים');
  });
});
