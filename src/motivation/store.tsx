import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { lessonIdOfExercise, lessonMetaById, lessonPath } from '@/data/lessons/catalog';
import { problemById } from '@/data/problems';
import { todayIso } from '../lib/dates';
import { nextExam } from '../lib/selectors';
import { useStore } from '../state/store';
import type { SavedState, SectionResult } from '../state/types';
import { badges, evaluateBadges, type BadgeDefinition } from './badges';
import { examFeedbackMessage, fastPeekMessage, findStreakBreak, isFastPeek, REPEAT_WRONG_LIMIT, repeatWrongMessage, streakBrokenMessage, type CoachMessage } from './coach';
import { clearCoach, coachFromBackup, loadCoach, saveCoach, type CoachState } from './coachStorage';
import { celebrate, setConfettiReducedMotion } from './confetti';
import { clearMotivation, loadMotivation, motivationFromBackup, saveMotivation } from './storage';
import { activityDaysFromState, computeStreak, mergeDays, type Streak } from './streak';
import type { MotivationState } from './types';

export interface BadgeStatus {
  badge: BadgeDefinition;
  unlockedAt: string | null;
}

interface MotivationValue {
  state: MotivationState;
  streak: Streak;
  /** Every day with study activity (this layer's log merged with what the saved data shows). */
  activeDays: string[];
  badgeStatuses: BadgeStatus[];
  earnedCount: number;
  /** Badge currently shown in the unlock pop, if any. */
  pop: BadgeDefinition | null;
  dismissPop(): void;
  /** Tough-coach message currently shown, if any. */
  coachMessage: CoachMessage | null;
  dismissCoach(): void;
  coach: CoachState;
  /** Call when a full solution is opened; the coach decides whether it was a fast peek. */
  reportSolutionOpened(secondsOnTask: number, hintsUsed: number): void;
  /** Hide a dashboard coach banner (ids include the date, so it comes back tomorrow if still relevant). */
  dismissBanner(id: string): void;
  setReducedMotion(value: boolean): void;
  importFromBackup(text: string): void;
  reset(): void;
}

const MotivationContext = createContext<MotivationValue | null>(null);

/** A single rating change, practice attempt or finished exam is study activity; a bulk change (import / reset) is not. */
function detectActivity(before: SavedState, after: SavedState) {
  let ratingChanges = 0;
  let mastered = false;
  for (const [id, rating] of Object.entries(after.ratings)) {
    if (before.ratings[id] !== rating) {
      ratingChanges += 1;
      if (rating === 'mastered') mastered = true;
    }
  }
  let practiceChanges = 0;
  for (const [id, record] of Object.entries(after.practice)) {
    const previous = before.practice[id];
    if (!previous || previous.attempts !== record.attempts || previous.lastPracticedAt !== record.lastPracticedAt) practiceChanges += 1;
  }
  const examsAdded = after.exams.length - before.exams.length;
  const bulk = ratingChanges > 1 || practiceChanges > 1 || examsAdded > 1 || examsAdded < 0;
  if (bulk) return { activity: false, mastered: false, exam: null };
  let exam: SavedState['exams'][number] | null = null;
  if (examsAdded === 1) {
    const newest = after.exams[0];
    const earlier = before.exams.filter((entry) => entry.questionnaire === newest.questionnaire);
    const best = earlier.reduce((max, entry) => Math.max(max, entry.score), 0);
    if (newest.score >= 85 || (earlier.length > 0 && newest.score > best)) exam = newest;
  }
  return { activity: ratingChanges > 0 || practiceChanges > 0 || examsAdded === 1, mastered, exam };
}

/** The single section result recorded between two states (null for bulk changes or when it can't be told apart). */
function changedResult(before: SavedState, after: SavedState): { problemId: string; sectionId: string; result: SectionResult } | null {
  const changed = Object.entries(after.practice).filter(([id, record]) => before.practice[id]?.attempts !== record.attempts);
  if (changed.length !== 1) return null;
  const [problemId, record] = changed[0];
  const previous = before.practice[problemId];
  const keys = Object.keys(record.sectionResults);
  const differing = keys.filter((key) => previous?.sectionResults[key] !== record.sectionResults[key]);
  const sectionId = differing.length === 1 ? differing[0] : differing.length === 0 && keys.length === 1 ? keys[0] : null;
  return sectionId ? { problemId, sectionId, result: record.sectionResults[sectionId] } : null;
}

/** Where consecutive mistakes are counted: the lesson of an exercise, or the bagrut question of a problem. */
function wrongGroup(problemId: string): { key: string; title: string; to: string } | null {
  const lessonId = lessonIdOfExercise(problemId);
  const lesson = lessonMetaById(lessonId);
  if (lesson) return { key: lesson.id, title: `שיעור "${lesson.title}"`, to: lessonPath(lesson) };
  const problem = problemById(problemId);
  if (problem) return { key: `slot:${problem.questionnaire}-${problem.slot}`, title: `שאלה ${problem.slot}`, to: `/practice?code=${problem.questionnaire}&slot=${problem.slot}` };
  return null;
}

export function MotivationProvider({ children }: { children: ReactNode }) {
  const { state: saved, notify } = useStore();
  const [state, setState] = useState<MotivationState>(loadMotivation);
  const [popQueue, setPopQueue] = useState<BadgeDefinition[]>([]);
  const [coach, setCoach] = useState<CoachState>(loadCoach);
  const [coachQueue, setCoachQueue] = useState<CoachMessage[]>([]);
  const previous = useRef<SavedState | null>(null);

  useEffect(() => saveMotivation(state), [state]);
  useEffect(() => saveCoach(coach), [coach]);

  const coachRef = useRef(coach);
  coachRef.current = coach;
  const updateCoach = useCallback((next: CoachState) => {
    coachRef.current = next;
    setCoach(next);
  }, []);

  const enqueueCoach = useCallback((message: CoachMessage) => {
    setCoachQueue((queue) => (queue.some((entry) => entry.id === message.id) ? queue : [...queue, message]));
  }, []);

  useEffect(() => {
    setConfettiReducedMotion(state.reducedMotion);
    if (state.reducedMotion) document.documentElement.dataset.motion = 'reduced';
    else delete document.documentElement.dataset.motion;
  }, [state.reducedMotion]);

  // Observe the app state: record activity days and celebrate successes. Reads only; never writes bagrut:v1.
  useEffect(() => {
    const before = previous.current;
    previous.current = saved;
    if (!before) return;
    const { activity, mastered, exam } = detectActivity(before, saved);
    if (activity) {
      const today = todayIso();
      setState((current) => (current.activityDays.includes(today) ? current : { ...current, activityDays: mergeDays(current.activityDays, [today]) }));
    }
    if (mastered) void celebrate('mastered');
    if (exam) void celebrate('exam');

    // Tough coach: a simulation that went badly
    if (saved.exams.length === before.exams.length + 1) {
      const newest = saved.exams[0];
      const earlier = before.exams.filter((entry) => entry.questionnaire === newest.questionnaire);
      const message = examFeedbackMessage({ exam: newest, previous: earlier });
      if (message) enqueueCoach(message);
    }

    // Tough coach: the same lesson / question keeps going wrong
    const change = activity ? changedResult(before, saved) : null;
    const group = change ? wrongGroup(change.problemId) : null;
    if (change && group) {
      const run = change.result === 'wrong' ? (coachRef.current.wrongRuns[group.key] ?? 0) + 1 : 0;
      const wrongRuns = { ...coachRef.current.wrongRuns };
      if (run >= REPEAT_WRONG_LIMIT) {
        enqueueCoach(repeatWrongMessage(group.title, group.to, new Date().toISOString()));
        delete wrongRuns[group.key];
      } else if (run === 0) delete wrongRuns[group.key];
      else wrongRuns[group.key] = run;
      updateCoach({ ...coachRef.current, wrongRuns });
    }
  }, [saved, enqueueCoach, updateCoach]);

  const allDays = useMemo(() => mergeDays(state.activityDays, activityDaysFromState(saved)), [state.activityDays, saved]);
  const streak = useMemo(() => computeStreak(allDays, todayIso()), [allDays]);

  // Tough coach: a broken streak is called out once, the first time the app opens after it broke.
  const examDays = nextExam(saved)?.days ?? null;
  useEffect(() => {
    const broken = findStreakBreak(allDays, todayIso());
    if (!broken || coach.streakBreakAck === broken.lastDay) return;
    enqueueCoach(streakBrokenMessage(broken, examDays));
    updateCoach({ ...coachRef.current, streakBreakAck: broken.lastDay });
  }, [allDays, coach.streakBreakAck, examDays, enqueueCoach, updateCoach]);

  // Evaluate badges whenever the inputs change; new unlocks pop (except the very first, silent seeding).
  useEffect(() => {
    const unlocked = evaluateBadges({ saved, streak });
    const fresh = unlocked.filter((id) => !state.unlockedBadges[id]);
    if (fresh.length === 0) {
      if (!state.seeded) setState((current) => ({ ...current, seeded: true }));
      return;
    }
    const now = new Date().toISOString();
    setState((current) => ({ ...current, seeded: true, unlockedBadges: { ...current.unlockedBadges, ...Object.fromEntries(fresh.map((id) => [id, now])) } }));
    if (state.seeded) {
      const definitions = fresh.map((id) => badges.find((badge) => badge.id === id)).filter((badge): badge is BadgeDefinition => Boolean(badge));
      setPopQueue((queue) => [...queue, ...definitions]);
      void celebrate('badge');
    }
  }, [saved, streak, state.unlockedBadges, state.seeded]);

  const coachMessage = coachQueue[0] ?? null;
  const dismissCoach = useCallback(() => setCoachQueue((queue) => queue.slice(1)), []);
  const reportSolutionOpened = useCallback(
    (secondsOnTask: number, hintsUsed: number) => {
      if (!isFastPeek(secondsOnTask, hintsUsed)) return;
      const today = todayIso();
      const count = (coachRef.current.peeks[today] ?? 0) + 1;
      updateCoach({ ...coachRef.current, peeks: { ...coachRef.current.peeks, [today]: count } });
      enqueueCoach(fastPeekMessage(secondsOnTask, count, new Date().toISOString()));
    },
    [enqueueCoach, updateCoach],
  );
  const dismissBanner = useCallback((id: string) => updateCoach({ ...coachRef.current, dismissed: { ...coachRef.current.dismissed, [id]: true } }), [updateCoach]);

  const pop = popQueue[0] ?? null;
  const dismissPop = useCallback(() => setPopQueue((queue) => queue.slice(1)), []);
  useEffect(() => {
    if (!pop) return;
    const timer = window.setTimeout(dismissPop, 4200);
    return () => window.clearTimeout(timer);
  }, [pop, dismissPop]);

  const value = useMemo<MotivationValue>(() => {
    const badgeStatuses = badges.map((badge) => ({ badge, unlockedAt: state.unlockedBadges[badge.id] ?? null }));
    return {
      state,
      streak,
      activeDays: allDays,
      badgeStatuses,
      earnedCount: badgeStatuses.filter((status) => status.unlockedAt).length,
      pop,
      dismissPop,
      coachMessage,
      dismissCoach,
      coach,
      reportSolutionOpened,
      dismissBanner,
      setReducedMotion: (reducedMotion) => setState((current) => ({ ...current, reducedMotion })),
      importFromBackup: (text) => {
        const imported = motivationFromBackup(text);
        if (imported) setState({ ...imported, seeded: true });
        const importedCoach = coachFromBackup(text);
        if (importedCoach) updateCoach(importedCoach);
      },
      reset: () => {
        clearMotivation();
        clearCoach();
        updateCoach({ version: 1, streakBreakAck: null, peeks: {}, wrongRuns: {}, dismissed: {} });
        setCoachQueue([]);
        setState({ version: 1, activityDays: [], unlockedBadges: {}, seeded: false, reducedMotion: state.reducedMotion });
        notify('גם הרצף והתגים אופסו');
      },
    };
  }, [state, streak, allDays, pop, dismissPop, coachMessage, dismissCoach, coach, reportSolutionOpened, dismissBanner, updateCoach, notify]);

  return <MotivationContext.Provider value={value}>{children}</MotivationContext.Provider>;
}

export function useMotivation(): MotivationValue {
  const value = useContext(MotivationContext);
  if (!value) throw new Error('useMotivation must be used inside <MotivationProvider>');
  return value;
}
