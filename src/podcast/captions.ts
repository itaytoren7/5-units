/** Synced captions: one cue per sentence, with the time it starts. Produced by tools/podcast/captions.py. */

export interface Cue {
  start: number;
  speaker: string;
  text: string;
  /** Index of the dialogue turn the sentence belongs to. */
  turn: number;
}

export interface CaptionsFile {
  version: number;
  duration: number;
  cues: Cue[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function sanitizeCaptions(raw: unknown): CaptionsFile | null {
  if (!isRecord(raw) || !Array.isArray(raw.cues)) return null;
  const cues: Cue[] = [];
  for (const item of raw.cues) {
    if (!isRecord(item) || typeof item.start !== 'number' || typeof item.text !== 'string') continue;
    cues.push({
      start: Math.max(0, item.start),
      text: item.text,
      speaker: typeof item.speaker === 'string' ? item.speaker : '',
      turn: typeof item.turn === 'number' ? item.turn : cues.length,
    });
  }
  cues.sort((a, b) => a.start - b.start);
  return { version: typeof raw.version === 'number' ? raw.version : 1, duration: typeof raw.duration === 'number' ? raw.duration : 0, cues };
}

/** Index of the cue being spoken at `time`, or -1 before the first one. Cues are sorted by start. */
export function activeCueIndex(cues: Cue[], time: number): number {
  let low = 0;
  let high = cues.length - 1;
  let found = -1;
  // A small lead so a line lights up as the voice reaches it rather than a frame later.
  const t = time + 0.05;
  while (low <= high) {
    const mid = (low + high) >> 1;
    if (cues[mid].start <= t) {
      found = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return found;
}

const cache = new Map<string, Promise<CaptionsFile | null>>();

export function fetchCaptions(url: string): Promise<CaptionsFile | null> {
  let pending = cache.get(url);
  if (!pending) {
    pending = fetch(url, { cache: 'no-cache' })
      .then((response) => (response.ok ? response.json() : null))
      .then((json) => sanitizeCaptions(json))
      .catch(() => null);
    cache.set(url, pending);
    // A failed fetch should be retried next time, not remembered forever.
    pending.then((result) => {
      if (!result) cache.delete(url);
    });
  }
  return pending;
}
