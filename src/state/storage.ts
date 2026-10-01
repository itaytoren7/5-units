import { isIsoDate } from '../lib/dates';
import { defaultState, STORAGE_KEY } from './defaults';
import type { ActiveExam, ExamRecord, MistakeEntry, PastExamEntry, PlanOverride, PlannerSettings, PracticeRecord, ReviewItem, SavedState } from './types';

const RATINGS = new Set(['not-started', 'weak', 'medium', 'mastered']);
const THEMES = new Set(['light', 'dark', 'system']);
const FOCUS_MODES = new Set(['focus-2026', 'full']);
const QUESTIONNAIRES = new Set(['35581', '35582']);
const MISTAKE_TYPES = new Set(['calculation', 'understanding', 'reading', 'time']);
const SECTION_RESULTS = new Set(['correct', 'partial', 'wrong']);
const MOEDS = new Set(['winter', 'summer-a', 'summer-b', 'other']);

type Unknown = Record<string, unknown>;

function isRecord(value: unknown): value is Unknown {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function str(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

function num(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function stringMap<T>(value: unknown, keep: (entry: unknown) => entry is T): Record<string, T> {
  if (!isRecord(value)) return {};
  const result: Record<string, T> = {};
  for (const [key, entry] of Object.entries(value)) if (keep(entry)) result[key] = entry;
  return result;
}

function list<T>(value: unknown, parse: (entry: unknown) => T | null): T[] {
  if (!Array.isArray(value)) return [];
  return value.map(parse).filter((entry): entry is T => entry !== null);
}

const isRating = (value: unknown): value is SavedState['ratings'][string] => typeof value === 'string' && RATINGS.has(value);
const isQuestionnaire = (value: unknown): value is ExamRecord['questionnaire'] => typeof value === 'string' && QUESTIONNAIRES.has(value);
const isTrue = (value: unknown): value is true => value === true;
const isDateString = (value: unknown): value is string => isIsoDate(value);

function parsePractice(value: unknown): PracticeRecord | null {
  if (!isRecord(value) || typeof value.problemId !== 'string') return null;
  const sectionResults: PracticeRecord['sectionResults'] = {};
  if (isRecord(value.sectionResults)) {
    for (const [key, result] of Object.entries(value.sectionResults)) if (typeof result === 'string' && SECTION_RESULTS.has(result)) sectionResults[key] = result as PracticeRecord['sectionResults'][string];
  }
  return { problemId: value.problemId, sectionResults, attempts: num(value.attempts, 1), lastPracticedAt: str(value.lastPracticedAt, new Date().toISOString()) };
}

function parseMistake(value: unknown): MistakeEntry | null {
  if (!isRecord(value) || typeof value.id !== 'string' || !isQuestionnaire(value.questionnaire)) return null;
  const type = typeof value.type === 'string' && MISTAKE_TYPES.has(value.type) ? (value.type as MistakeEntry['type']) : 'understanding';
  return {
    id: value.id,
    createdAt: str(value.createdAt, new Date().toISOString()),
    questionnaire: value.questionnaire,
    topicId: str(value.topicId),
    problemId: typeof value.problemId === 'string' ? value.problemId : undefined,
    sectionId: typeof value.sectionId === 'string' ? value.sectionId : undefined,
    type,
    description: str(value.description),
    correctApproach: str(value.correctApproach),
  };
}

function parseReview(value: unknown): ReviewItem | null {
  if (!isRecord(value) || typeof value.id !== 'string' || !isQuestionnaire(value.questionnaire) || !isIsoDate(value.dueAt)) return null;
  return {
    id: value.id,
    createdAt: str(value.createdAt, new Date().toISOString()),
    sourceType: value.sourceType === 'problem' ? 'problem' : 'mistake',
    sourceId: str(value.sourceId),
    questionnaire: value.questionnaire,
    stage: Math.max(0, Math.floor(num(value.stage, 0))),
    dueAt: value.dueAt,
    completedAt: typeof value.completedAt === 'string' ? value.completedAt : undefined,
  };
}

function parseNumberMap(value: unknown): Record<string, number> {
  return stringMap(value, (entry): entry is number => typeof entry === 'number' && Number.isFinite(entry));
}

function parseProblemMap(value: unknown): Record<string, string | null> {
  return stringMap(value, (entry): entry is string | null => entry === null || typeof entry === 'string');
}

function parseExam(value: unknown): ExamRecord | null {
  if (!isRecord(value) || typeof value.id !== 'string' || !isQuestionnaire(value.questionnaire)) return null;
  return {
    id: value.id,
    questionnaire: value.questionnaire,
    startedAt: str(value.startedAt, new Date().toISOString()),
    finishedAt: str(value.finishedAt, new Date().toISOString()),
    elapsedSeconds: num(value.elapsedSeconds, 0),
    chosenSlots: Array.isArray(value.chosenSlots) ? value.chosenSlots.filter((slot): slot is number => typeof slot === 'number') : [],
    problemBySlot: parseProblemMap(value.problemBySlot),
    grades: parseNumberMap(value.grades),
    score: num(value.score, 0),
    notes: str(value.notes),
  };
}

function parseActiveExam(value: unknown): ActiveExam | null {
  if (!isRecord(value) || !isQuestionnaire(value.questionnaire)) return null;
  const phase = value.phase === 'running' || value.phase === 'grading' ? value.phase : 'setup';
  return {
    questionnaire: value.questionnaire,
    phase,
    chosenSlots: Array.isArray(value.chosenSlots) ? value.chosenSlots.filter((slot): slot is number => typeof slot === 'number') : [],
    problemBySlot: parseProblemMap(value.problemBySlot),
    startedAt: typeof value.startedAt === 'string' ? value.startedAt : null,
    endsAt: typeof value.endsAt === 'string' ? value.endsAt : null,
    grades: parseNumberMap(value.grades),
    alertsShown: Array.isArray(value.alertsShown) ? value.alertsShown.filter((entry): entry is number => typeof entry === 'number') : [],
  };
}

function parsePastExam(value: unknown): PastExamEntry | null {
  if (!isRecord(value) || typeof value.id !== 'string' || !isQuestionnaire(value.questionnaire)) return null;
  return {
    id: value.id,
    createdAt: str(value.createdAt, new Date().toISOString()),
    year: num(value.year, new Date().getFullYear()),
    moed: typeof value.moed === 'string' && MOEDS.has(value.moed) ? (value.moed as PastExamEntry['moed']) : 'other',
    questionnaire: value.questionnaire,
    questionNumber: num(value.questionNumber, 1),
    score: num(value.score, 0),
    maxScore: num(value.maxScore, 100),
    notes: str(value.notes),
    link: str(value.link),
  };
}

function parsePlanner(value: unknown): PlannerSettings {
  const fallback = defaultState().planner;
  if (!isRecord(value)) return fallback;
  const studyDays = Array.isArray(value.studyDays) ? value.studyDays.filter((day): day is number => typeof day === 'number' && day >= 0 && day <= 6) : fallback.studyDays;
  return {
    hoursPerWeek: Math.min(60, Math.max(1, num(value.hoursPerWeek, fallback.hoursPerWeek))),
    studyDays: studyDays.length ? [...new Set(studyDays)].sort() : fallback.studyDays,
    sessionMinutes: Math.min(180, Math.max(30, num(value.sessionMinutes, fallback.sessionMinutes))),
  };
}

function parseOverrides(value: unknown): Record<string, PlanOverride> {
  return stringMap(value, (entry): entry is PlanOverride => isRecord(entry));
}

/** Turns any JSON value into a valid SavedState, dropping whatever does not fit the schema. */
export function sanitizeState(raw: unknown): SavedState {
  const base = defaultState();
  if (!isRecord(raw)) return base;
  return {
    version: 1,
    theme: typeof raw.theme === 'string' && THEMES.has(raw.theme) ? (raw.theme as SavedState['theme']) : base.theme,
    focusMode: typeof raw.focusMode === 'string' && FOCUS_MODES.has(raw.focusMode) ? (raw.focusMode as SavedState['focusMode']) : base.focusMode,
    examDates: stringMap(raw.examDates, isDateString),
    ratings: stringMap(raw.ratings, isRating),
    verifiedProblems: stringMap(raw.verifiedProblems, isTrue),
    practice: stringMap(raw.practice, (entry): entry is PracticeRecord => parsePractice(entry) !== null),
    mistakes: list(raw.mistakes, parseMistake),
    reviews: list(raw.reviews, parseReview),
    exams: list(raw.exams, parseExam),
    pastExams: list(raw.pastExams, parsePastExam),
    planner: parsePlanner(raw.planner),
    planOverrides: parseOverrides(raw.planOverrides),
    activeExam: parseActiveExam(raw.activeExam),
  };
}

export function loadState(): SavedState {
  try {
    const text = localStorage.getItem(STORAGE_KEY);
    if (!text) return defaultState();
    return sanitizeState(JSON.parse(text));
  } catch {
    return defaultState();
  }
}

export function saveState(state: SavedState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* Storage can be full or blocked (private mode); the app keeps working in memory. */
  }
}

export function clearState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

/** `extra` lets additive layers (e.g. motivation) ride along in the backup as optional fields; old backups without them import fine. */
export function exportState(state: SavedState, extra: Record<string, unknown> = {}): string {
  return JSON.stringify({ ...state, ...extra, exportedAt: new Date().toISOString() }, null, 2);
}

export function parseImportedState(text: string): SavedState {
  const parsed: unknown = JSON.parse(text);
  if (!isRecord(parsed) || parsed.version !== 1) throw new Error('הקובץ אינו גיבוי של האפליקציה (חסר version: 1).');
  return sanitizeState(parsed);
}
