import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { todayIso } from '../lib/dates';
import { uid } from '../lib/ids';
import { isReviewFinished, reviewDueDate } from '../lib/spaced';
import { defaultState } from './defaults';
import { clearState, loadState, saveState } from './storage';
import type { ActiveExam, ExamRecord, FocusMode, MistakeEntry, PastExamEntry, PlanOverride, PlannerSettings, SavedState, SectionResult, Theme } from './types';
import type { Rating } from '@/data/syllabus/types';
import type { QuestionnaireCode } from '@/data/problems/types';

type Updater = (current: SavedState) => SavedState;

export interface StoreActions {
  setTheme(theme: Theme): void;
  setFocusMode(mode: FocusMode): void;
  setExamDate(code: string, date: string): void;
  setRating(subtopicId: string, rating: Rating): void;
  setProblemVerified(problemId: string, verified: boolean): void;
  recordSectionResult(problemId: string, sectionId: string, result: SectionResult, questionnaire: QuestionnaireCode): void;
  addMistake(entry: Omit<MistakeEntry, 'id' | 'createdAt'>): string;
  updateMistake(id: string, patch: Partial<Omit<MistakeEntry, 'id' | 'createdAt'>>): void;
  deleteMistake(id: string): void;
  completeReview(id: string): void;
  setActiveExam(exam: ActiveExam | null): void;
  updateActiveExam(patch: Partial<ActiveExam>): void;
  finishExam(record: Omit<ExamRecord, 'id'>): string;
  deleteExam(id: string): void;
  addPastExam(entry: Omit<PastExamEntry, 'id' | 'createdAt'>): void;
  updatePastExam(id: string, patch: Partial<Omit<PastExamEntry, 'id' | 'createdAt'>>): void;
  deletePastExam(id: string): void;
  setPlanner(patch: Partial<PlannerSettings>): void;
  setPlanOverride(sessionId: string, patch: PlanOverride): void;
  clearPlanOverrides(): void;
  importState(state: SavedState): void;
  resetState(): void;
}

interface StoreValue {
  state: SavedState;
  actions: StoreActions;
  resolvedTheme: 'light' | 'dark';
  toast: string | null;
  notify(message: string): void;
}

const StoreContext = createContext<StoreValue | null>(null);

function systemTheme(): 'light' | 'dark' {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SavedState>(loadState);
  const [toast, setToast] = useState<string | null>(null);
  const [system, setSystem] = useState<'light' | 'dark'>(systemTheme);
  const toastTimer = useRef<number | null>(null);

  useEffect(() => saveState(state), [state]);

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (!media) return;
    const listener = (event: MediaQueryListEvent) => setSystem(event.matches ? 'dark' : 'light');
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  const resolvedTheme = state.theme === 'system' ? system : state.theme;

  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (meta) meta.content = resolvedTheme === 'dark' ? '#0F1117' : '#F7F8FA';
  }, [resolvedTheme]);

  const notify = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2800);
  }, []);

  const update = useCallback((updater: Updater) => setState((current) => updater(current)), []);

  const actions = useMemo<StoreActions>(() => {
    const ensureReview = (current: SavedState, sourceType: 'mistake' | 'problem', sourceId: string, questionnaire: QuestionnaireCode): SavedState => {
      const open = current.reviews.some((review) => review.sourceType === sourceType && review.sourceId === sourceId && !review.completedAt);
      if (open) return current;
      const today = todayIso();
      return {
        ...current,
        reviews: [
          ...current.reviews,
          { id: uid('rev'), createdAt: new Date().toISOString(), sourceType, sourceId, questionnaire, stage: 0, dueAt: reviewDueDate(0, today) },
        ],
      };
    };

    return {
      setTheme: (theme) => update((current) => ({ ...current, theme })),
      setFocusMode: (focusMode) => update((current) => ({ ...current, focusMode })),
      setExamDate: (code, date) =>
        update((current) => {
          const examDates = { ...current.examDates };
          if (date) examDates[code] = date;
          else delete examDates[code];
          return { ...current, examDates };
        }),
      setRating: (subtopicId, rating) => update((current) => ({ ...current, ratings: { ...current.ratings, [subtopicId]: rating } })),
      setProblemVerified: (problemId, verified) =>
        update((current) => {
          const verifiedProblems = { ...current.verifiedProblems };
          if (verified) verifiedProblems[problemId] = true;
          else delete verifiedProblems[problemId];
          return { ...current, verifiedProblems };
        }),
      recordSectionResult: (problemId, sectionId, result, questionnaire) =>
        update((current) => {
          const existing = current.practice[problemId];
          const record = {
            problemId,
            sectionResults: { ...(existing?.sectionResults ?? {}), [sectionId]: result },
            attempts: (existing?.attempts ?? 0) + 1,
            lastPracticedAt: new Date().toISOString(),
          };
          const next = { ...current, practice: { ...current.practice, [problemId]: record } };
          return result === 'wrong' ? ensureReview(next, 'problem', problemId, questionnaire) : next;
        }),
      addMistake: (entry) => {
        const id = uid('mis');
        update((current) => {
          const mistake: MistakeEntry = { ...entry, id, createdAt: new Date().toISOString() };
          return ensureReview({ ...current, mistakes: [mistake, ...current.mistakes] }, 'mistake', id, entry.questionnaire);
        });
        return id;
      },
      updateMistake: (id, patch) => update((current) => ({ ...current, mistakes: current.mistakes.map((mistake) => (mistake.id === id ? { ...mistake, ...patch } : mistake)) })),
      deleteMistake: (id) =>
        update((current) => ({
          ...current,
          mistakes: current.mistakes.filter((mistake) => mistake.id !== id),
          reviews: current.reviews.filter((review) => !(review.sourceType === 'mistake' && review.sourceId === id)),
        })),
      completeReview: (id) =>
        update((current) => ({
          ...current,
          reviews: current.reviews.map((review) => {
            if (review.id !== id) return review;
            const stage = review.stage + 1;
            if (isReviewFinished(stage)) return { ...review, stage, completedAt: new Date().toISOString() };
            return { ...review, stage, dueAt: reviewDueDate(stage, todayIso()) };
          }),
        })),
      setActiveExam: (activeExam) => update((current) => ({ ...current, activeExam })),
      updateActiveExam: (patch) => update((current) => (current.activeExam ? { ...current, activeExam: { ...current.activeExam, ...patch } } : current)),
      finishExam: (record) => {
        const id = uid('exam');
        update((current) => ({ ...current, exams: [{ ...record, id }, ...current.exams], activeExam: null }));
        return id;
      },
      deleteExam: (id) => update((current) => ({ ...current, exams: current.exams.filter((exam) => exam.id !== id) })),
      addPastExam: (entry) => update((current) => ({ ...current, pastExams: [{ ...entry, id: uid('past'), createdAt: new Date().toISOString() }, ...current.pastExams] })),
      updatePastExam: (id, patch) => update((current) => ({ ...current, pastExams: current.pastExams.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry)) })),
      deletePastExam: (id) => update((current) => ({ ...current, pastExams: current.pastExams.filter((entry) => entry.id !== id) })),
      setPlanner: (patch) => update((current) => ({ ...current, planner: { ...current.planner, ...patch } })),
      setPlanOverride: (sessionId, patch) => update((current) => ({ ...current, planOverrides: { ...current.planOverrides, [sessionId]: { ...current.planOverrides[sessionId], ...patch } } })),
      clearPlanOverrides: () => update((current) => ({ ...current, planOverrides: {} })),
      importState: (imported) => setState(imported),
      resetState: () => {
        clearState();
        setState(defaultState());
      },
    };
  }, [update]);

  const value = useMemo<StoreValue>(() => ({ state, actions, resolvedTheme, toast, notify }), [state, actions, resolvedTheme, toast, notify]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const value = useContext(StoreContext);
  if (!value) throw new Error('useStore must be used inside <StoreProvider>');
  return value;
}
