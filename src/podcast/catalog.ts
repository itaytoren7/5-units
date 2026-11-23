/**
 * The podcast catalogue: the records in `public/podcast/episodes/episodes.json`, grouped into the
 * chapters of the script. The file is written by `tools/podcast/make_podcast.py`; new episodes show
 * up here without touching code.
 */

export interface EpisodeRecord {
  /** Script id, e.g. `1א` (the Latin form `1a` is accepted too). */
  id: string;
  title: string;
  /** Chapter heading from the script, e.g. `פרק 1: סדרות ואינדוקציה`. */
  topic?: string;
  /** Audio file name inside the episodes folder. */
  file: string;
  /** Captions file name inside the episodes folder, when the script produced one. */
  captions?: string;
  /** Seconds. */
  duration?: number;
}

export interface Episode extends EpisodeRecord {
  chapter: number;
  /** Position inside the chapter (א = 0). */
  order: number;
  /** Stable Latin id for anchors: `ep-1a`. */
  slug: string;
  /** Hebrew label as printed in the script: `1א`. */
  label: string;
}

export interface EpisodeGroup {
  chapter: number;
  anchor: string;
  title: string;
  episodes: Episode[];
}

const HEBREW_LETTERS = 'אבגדהוזחטי';
const LATIN_LETTERS = 'abcdefghij';

/** The six chapters of the script. Anchors are stable so topic pages can link to them. */
export const chapterInfo: Record<number, { anchor: string; title: string }> = {
  1: { anchor: 'sequences', title: 'סדרות ואינדוקציה' },
  2: { anchor: 'probability', title: 'הסתברות' },
  3: { anchor: 'geometry', title: 'גאומטריה' },
  4: { anchor: 'solid-trigonometry', title: 'טריגונומטריה במרחב' },
  5: { anchor: 'complex-numbers', title: 'מספרים מרוכבים' },
  6: { anchor: 'calculus', title: 'חשבון דיפרנציאלי ואינטגרלי' },
};

/** Syllabus topic id → podcast chapter anchor. Topics without episodes are simply absent. */
export const podcastAnchorByTopic: Record<string, string> = {
  sequences: 'sequences',
  probability: 'probability',
  'euclidean-geometry': 'geometry',
  trigonometry: 'geometry',
  'solid-trigonometry': 'solid-trigonometry',
  'complex-numbers': 'complex-numbers',
  'differential-calculus': 'calculus',
  'integral-calculus': 'calculus',
  'differential-integral': 'calculus',
  'exponential-logarithms': 'calculus',
};

export function podcastAnchorForTopic(topicId: string): string | undefined {
  return podcastAnchorByTopic[topicId];
}

export function parseEpisodeId(id: string): { chapter: number; order: number; latin: string; hebrew: string } | null {
  const match = /^(\d+)\s*([א-ת]|[a-zA-Z])$/.exec(id.trim());
  if (!match) return null;
  const raw = match[2];
  const order = /[א-ת]/.test(raw) ? HEBREW_LETTERS.indexOf(raw) : LATIN_LETTERS.indexOf(raw.toLowerCase());
  if (order < 0) return null;
  return { chapter: Number(match[1]), order, latin: LATIN_LETTERS[order], hebrew: HEBREW_LETTERS[order] };
}

export function episodeSlug(id: string): string {
  const parsed = parseEpisodeId(id);
  return parsed ? `ep-${parsed.chapter}${parsed.latin}` : `ep-${id.trim().replace(/[^\w-]+/g, '-')}`;
}

export function episodeLabel(id: string): string {
  const parsed = parseEpisodeId(id);
  return parsed ? `${parsed.chapter}${parsed.hebrew}` : id;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function chapterTitle(chapter: number, topic: string | undefined): string {
  const fromTopic = topic?.replace(/^פרק\s*\d+\s*[:\-–]\s*/, '').trim();
  return fromTopic || chapterInfo[chapter]?.title || `פרק ${chapter}`;
}

/** Validates the raw JSON and groups it by chapter, in script order. Malformed records are skipped. */
export function groupEpisodes(raw: unknown): EpisodeGroup[] {
  if (!Array.isArray(raw)) return [];
  const episodes: Episode[] = [];
  for (const item of raw) {
    if (!isRecord(item) || typeof item.id !== 'string' || typeof item.title !== 'string' || typeof item.file !== 'string') continue;
    const parsed = parseEpisodeId(item.id);
    episodes.push({
      id: item.id,
      title: item.title,
      file: item.file,
      topic: typeof item.topic === 'string' ? item.topic : undefined,
      captions: typeof item.captions === 'string' ? item.captions : undefined,
      duration: typeof item.duration === 'number' && Number.isFinite(item.duration) && item.duration > 0 ? item.duration : undefined,
      chapter: parsed?.chapter ?? 0,
      order: parsed?.order ?? episodes.length,
      slug: episodeSlug(item.id),
      label: episodeLabel(item.id),
    });
  }
  episodes.sort((a, b) => a.chapter - b.chapter || a.order - b.order);

  const groups = new Map<number, EpisodeGroup>();
  for (const episode of episodes) {
    const group = groups.get(episode.chapter);
    if (group) {
      group.episodes.push(episode);
      continue;
    }
    groups.set(episode.chapter, {
      chapter: episode.chapter,
      anchor: chapterInfo[episode.chapter]?.anchor ?? `chapter-${episode.chapter}`,
      title: chapterTitle(episode.chapter, episode.topic),
      episodes: [episode],
    });
  }
  return [...groups.values()];
}

function base(): string {
  const url = import.meta.env.BASE_URL || '/';
  return url.endsWith('/') ? url : `${url}/`;
}

export const EPISODES_FOLDER = 'podcast/episodes/';

export function episodesIndexUrl(): string {
  return `${base()}${EPISODES_FOLDER}episodes.json`;
}

/** Audio and caption files live next to episodes.json; only the file name matters. */
export function episodeAssetUrl(file: string): string {
  const name = file.split('/').filter(Boolean).pop() ?? file;
  return `${base()}${EPISODES_FOLDER}${name}`;
}

export function formatClock(seconds: number): string {
  const total = Math.max(0, Math.round(seconds));
  const minutes = Math.floor(total / 60);
  const rest = total % 60;
  return `${minutes}:${rest.toString().padStart(2, '0')}`;
}

/** Rounded, for lists: `5 דק׳`. */
export function formatMinutes(seconds: number): string {
  if (seconds < 60) return 'פחות מדקה';
  return `${Math.round(seconds / 60)} דק׳`;
}

/** For totals: `שעה ו-45 דק׳`. */
export function formatTotal(seconds: number): string {
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} דק׳`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  const hoursText = hours === 1 ? 'שעה' : hours === 2 ? 'שעתיים' : `${hours} שעות`;
  return rest ? `${hoursText} ו-${rest} דק׳` : hoursText;
}
