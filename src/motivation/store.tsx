import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { todayIso } from '../lib/dates';
import { useStore } from '../state/store';
import type { SavedState } from '../state/types';
import { badges, evaluateBadges, type BadgeDefinition } from './badges';
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
  badgeStatuses: BadgeStatus[];
  earnedCount: number;
  /** Badge currently shown in the unlock pop, if any. */
  pop: BadgeDefinition | null;
  dismissPop(): void;
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

export function MotivationProvider({ children }: { children: ReactNode }) {
  const { state: saved, notify } = useStore();
  const [state, setState] = useState<MotivationState>(loadMotivation);
  const [popQueue, setPopQueue] = useState<BadgeDefinition[]>([]);
  const previous = useRef<SavedState | null>(null);

  useEffect(() => saveMotivation(state), [state]);

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
  }, [saved]);

  const allDays = useMemo(() => mergeDays(state.activityDays, activityDaysFromState(saved)), [state.activityDays, saved]);
  const streak = useMemo(() => computeStreak(allDays, todayIso()), [allDays]);

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
      badgeStatuses,
      earnedCount: badgeStatuses.filter((status) => status.unlockedAt).length,
      pop,
      dismissPop,
      setReducedMotion: (reducedMotion) => setState((current) => ({ ...current, reducedMotion })),
      importFromBackup: (text) => {
        const imported = motivationFromBackup(text);
        if (imported) setState({ ...imported, seeded: true });
      },
      reset: () => {
        clearMotivation();
        setState({ version: 1, activityDays: [], unlockedBadges: {}, seeded: false, reducedMotion: state.reducedMotion });
        notify('גם הרצף והתגים אופסו');
      },
    };
  }, [state, streak, pop, dismissPop, notify]);

  return <MotivationContext.Provider value={value}>{children}</MotivationContext.Provider>;
}

export function useMotivation(): MotivationValue {
  const value = useContext(MotivationContext);
  if (!value) throw new Error('useMotivation must be used inside <MotivationProvider>');
  return value;
}
