import type { Priority, Questionnaire, Rating, Subtopic } from '@/data/syllabus/types';
import { addDays, daysBetween, startOfWeek, weekdayOf } from './dates';
import { ratingOf, slotSubtopics } from './progress';

export interface PlannerInput {
  questionnaires: readonly Questionnaire[];
  /** questionnaire code → YYYY-MM-DD */
  examDates: Record<string, string>;
  ratings: Record<string, Rating>;
  hoursPerWeek: number;
  /** 0 = Sunday … 6 = Saturday */
  studyDays: number[];
  /** Target length of one study session. */
  sessionMinutes: number;
  /** YYYY-MM-DD */
  today: string;
  /**
   * Subtopics the student already learned in class. When given (non-empty), their sessions come first
   * and everything not learned yet is scheduled after them, marked as such.
   */
  learnedSubtopicIds?: ReadonlySet<string>;
}

export type SessionKind = 'study' | 'simulation' | 'review';

export interface PlanSession {
  /** Stable across re-plans so the student's edits (done / hours) survive. */
  id: string;
  date: string;
  weekIndex: number;
  questionnaire: string;
  kind: SessionKind;
  slot?: number;
  priority?: Priority;
  title: string;
  subtopicIds: string[];
  minutes: number;
}

export interface PlanWeek {
  index: number;
  start: string;
  end: string;
  sessions: PlanSession[];
  totalMinutes: number;
}

export interface StudyPlan {
  weeks: PlanWeek[];
  horizonEnd: string;
  /** Study minutes that did not fit before the horizon — the student needs more hours per week. */
  unscheduledMinutes: number;
  totalStudyMinutes: number;
}

const BASE_MINUTES_PER_SUBTOPIC = 40;
const REVIEW_SESSION_MINUTES = 45;
const SIMULATION_WEEKS = 3;
const DEFAULT_HORIZON_WEEKS = 8;

const ratingMultiplier: Record<Rating, number> = {
  'not-started': 1.25,
  weak: 1.5,
  medium: 0.8,
  mastered: 0.3,
};

interface PendingSession {
  id: string;
  questionnaire: string;
  kind: SessionKind;
  slot?: number;
  priority?: Priority;
  title: string;
  subtopicIds: string[];
  minutes: number;
  /** For simulations/reviews: the week they must land in. */
  pinnedWeek?: number;
  /** Study sessions must happen before this week (the exam week). */
  deadlineWeek?: number;
}

function subtopicMinutes(subtopic: Subtopic, ratings: Record<string, Rating>): number {
  return Math.round(BASE_MINUTES_PER_SUBTOPIC * ratingMultiplier[ratingOf(ratings, subtopic.id)]);
}

function orderedSlots(questionnaire: Questionnaire) {
  const byNumber = (a: { number: number }, b: { number: number }) => a.number - b.number;
  const yellow = questionnaire.slots.filter((slot) => slot.priority === 'yellow').sort(byNumber);
  const blue = questionnaire.slots.filter((slot) => slot.priority === 'blue').sort(byNumber);
  return [...yellow, ...blue];
}

/** Study sessions for one questionnaire: yellow slots first, chunked to the session length (learned-in-class first when known). */
function studySessions(questionnaire: Questionnaire, input: PlannerInput, deadlineWeek?: number): PendingSession[] {
  const seen = new Set<string>();
  const sessions: PendingSession[] = [];
  const learned = input.learnedSubtopicIds && input.learnedSubtopicIds.size > 0 ? input.learnedSubtopicIds : null;
  const bySlot = orderedSlots(questionnaire).map((slot) => {
    const subtopics = slotSubtopics(questionnaire, slot).filter((subtopic) => subtopic.status === 'in' && !seen.has(subtopic.id));
    for (const subtopic of subtopics) seen.add(subtopic.id);
    return { slot, subtopics };
  });
  const passes: Array<{ suffix: string; note: string; pick: (subtopic: Subtopic) => boolean }> = learned
    ? [
        { suffix: '', note: '', pick: (subtopic) => learned.has(subtopic.id) },
        { suffix: 'u', note: ' · עוד לא נלמד בכיתה', pick: (subtopic) => !learned.has(subtopic.id) },
      ]
    : [{ suffix: '', note: '', pick: () => true }];
  for (const pass of passes) {
    for (const { slot, subtopics: all } of bySlot) {
      const subtopics = all.filter(pass.pick);
      let chunk: Subtopic[] = [];
      let chunkMinutes = 0;
      let chunkIndex = 0;
      const flush = () => {
        if (chunk.length === 0) return;
        chunkIndex += 1;
        sessions.push({
          id: `${questionnaire.code}-s${slot.number}-${pass.suffix}${chunkIndex}`,
          questionnaire: questionnaire.code,
          kind: 'study',
          slot: slot.number,
          priority: slot.priority,
          title: `שאלה ${slot.number} · ${slot.title}${pass.note}`,
          subtopicIds: chunk.map((subtopic) => subtopic.id),
          minutes: chunkMinutes,
          deadlineWeek,
        });
        chunk = [];
        chunkMinutes = 0;
      };
      for (const subtopic of subtopics) {
        const minutes = subtopicMinutes(subtopic, input.ratings);
        if (chunk.length > 0 && chunkMinutes + minutes > input.sessionMinutes) flush();
        chunk.push(subtopic);
        chunkMinutes += minutes;
      }
      flush();
      if (chunkIndex > 1) {
        const slotSessions = sessions.slice(-chunkIndex);
        slotSessions.forEach((session, index) => {
          session.title = `${session.title} · חלק ${index + 1}/${chunkIndex}`;
        });
      }
    }
  }
  return sessions;
}

export function buildPlan(input: PlannerInput): StudyPlan {
  const weekStart = startOfWeek(input.today);
  const weekIndexOf = (iso: string) => Math.floor(daysBetween(weekStart, iso) / 7);
  const studyDays = new Set(input.studyDays.length ? input.studyDays : [0, 1, 2, 3, 4]);
  const weeklyBudget = Math.max(60, Math.round(input.hoursPerWeek * 60));

  const dated = input.questionnaires
    .map((questionnaire) => ({ questionnaire, examDate: input.examDates[questionnaire.code] }))
    .filter((entry): entry is { questionnaire: Questionnaire; examDate: string } => Boolean(entry.examDate) && daysBetween(input.today, entry.examDate!) >= 0)
    .sort((a, b) => daysBetween(b.examDate, a.examDate));
  const undated = input.questionnaires.filter((questionnaire) => !dated.some((entry) => entry.questionnaire.code === questionnaire.code));

  const latestExam = dated.length ? dated[dated.length - 1].examDate : undefined;
  const horizonEnd = latestExam && daysBetween(input.today, latestExam) >= 7 ? latestExam : addDays(input.today, DEFAULT_HORIZON_WEEKS * 7);
  const lastWeek = weekIndexOf(horizonEnd);

  const queue: PendingSession[] = [];
  for (const { questionnaire, examDate } of dated) {
    const examWeek = weekIndexOf(examDate);
    queue.push(...studySessions(questionnaire, input, examWeek));
    for (let offset = SIMULATION_WEEKS; offset >= 1; offset -= 1) {
      const week = examWeek - offset;
      if (week < 0) continue;
      queue.push({
        id: `${questionnaire.code}-sim-${week}`,
        questionnaire: questionnaire.code,
        kind: 'simulation',
        title: `סימולציה מלאה · שאלון ${questionnaire.nickname}`,
        subtopicIds: [],
        minutes: questionnaire.durationMinutes,
        pinnedWeek: week,
      });
      queue.push({
        id: `${questionnaire.code}-rev-${week}`,
        questionnaire: questionnaire.code,
        kind: 'review',
        title: `חזרה על טעויות · שאלון ${questionnaire.nickname}`,
        subtopicIds: [],
        minutes: REVIEW_SESSION_MINUTES,
        pinnedWeek: week,
      });
    }
  }
  for (const questionnaire of undated) queue.push(...studySessions(questionnaire, input));

  const weeks: PlanWeek[] = [];
  for (let index = 0; index <= lastWeek; index += 1) {
    const start = addDays(weekStart, index * 7);
    weeks.push({ index, start, end: addDays(start, 6), sessions: [], totalMinutes: 0 });
  }

  const studyDates = (week: PlanWeek) => {
    const dates: string[] = [];
    for (let day = 0; day < 7; day += 1) {
      const date = addDays(week.start, day);
      if (daysBetween(input.today, date) < 0 || daysBetween(date, horizonEnd) < 0) continue;
      if (studyDays.has(weekdayOf(date))) dates.push(date);
    }
    return dates;
  };

  const place = (week: PlanWeek, session: PendingSession, dateIndex: number) => {
    const dates = studyDates(week);
    if (dates.length === 0) return false;
    const date = dates[Math.min(dateIndex, dates.length - 1)];
    week.sessions.push({
      id: session.id,
      date,
      weekIndex: week.index,
      questionnaire: session.questionnaire,
      kind: session.kind,
      slot: session.slot,
      priority: session.priority,
      title: session.title,
      subtopicIds: session.subtopicIds,
      minutes: session.minutes,
    });
    week.totalMinutes += session.minutes;
    return true;
  };

  // 1) Pin simulations and reviews to their weeks (they take precedence over the weekly budget).
  const pinned = queue.filter((session) => session.pinnedWeek !== undefined);
  for (const session of pinned) {
    const week = weeks[session.pinnedWeek!];
    if (!week) continue;
    const slotIndex = session.kind === 'simulation' ? 0 : 1;
    place(week, session, slotIndex);
  }

  // 2) Fill study sessions in queue order, day after day, respecting the weekly budget and each exam's deadline.
  //    Days are filled sequentially (not round-robin) so the chronological order equals the study order.
  const study = queue.filter((session) => session.pinnedWeek === undefined);
  let unscheduledMinutes = 0;
  let cursorWeek = 0;
  let cursorDay = 0;
  let dayMinutes = 0;
  for (const session of study) {
    let placed = false;
    while (cursorWeek < weeks.length) {
      const week = weeks[cursorWeek];
      const dates = studyDates(week);
      const withinDeadline = session.deadlineWeek === undefined || week.index < session.deadlineWeek;
      if (!withinDeadline) break;
      // A partial week (the current one, or the exam week) gets a prorated share of the weekly budget.
      const weekBudget = Math.round((weeklyBudget * dates.length) / studyDays.size);
      if (dates.length > 0 && week.totalMinutes + session.minutes <= Math.max(weekBudget, session.minutes)) {
        const dailyCap = Math.ceil(weekBudget / dates.length);
        while (cursorDay < dates.length - 1 && dayMinutes > 0 && dayMinutes + session.minutes > dailyCap) {
          cursorDay += 1;
          dayMinutes = 0;
        }
        place(week, session, cursorDay);
        dayMinutes += session.minutes;
        placed = true;
        break;
      }
      cursorWeek += 1;
      cursorDay = 0;
      dayMinutes = 0;
    }
    if (!placed) unscheduledMinutes += session.minutes;
  }

  for (const week of weeks) week.sessions.sort((a, b) => daysBetween(b.date, a.date) || kindRank(a.kind) - kindRank(b.kind));

  return {
    weeks: weeks.filter((week) => week.sessions.length > 0 || daysBetween(input.today, week.end) >= 0),
    horizonEnd,
    unscheduledMinutes,
    totalStudyMinutes: study.reduce((sum, session) => sum + session.minutes, 0),
  };
}

function kindRank(kind: SessionKind): number {
  return kind === 'simulation' ? 0 : kind === 'review' ? 1 : 2;
}
