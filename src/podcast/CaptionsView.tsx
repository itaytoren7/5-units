import { useEffect, useRef, useState } from 'react';
import { activeCueIndex, fetchCaptions, type CaptionsFile } from './captions';

function reducedMotion(): boolean {
  return document.documentElement.dataset.motion === 'reduced' || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * The transcript as running captions: the sentence being spoken is lit, the rest recede.
 * Clicking a line jumps to it. Scrolling by hand pauses the auto-follow for a few seconds.
 */
export function CaptionsView({ url, time, onSeek }: { url: string | undefined; time: number; onSeek: (seconds: number) => void }) {
  const [data, setData] = useState<CaptionsFile | null | undefined>(undefined);
  const listRef = useRef<HTMLOListElement>(null);
  const [detached, setDetached] = useState(false);
  const detachTimer = useRef(0);

  useEffect(() => {
    let alive = true;
    setData(undefined);
    if (!url) {
      setData(null);
      return;
    }
    fetchCaptions(url).then((result) => {
      if (alive) setData(result);
    });
    return () => {
      alive = false;
    };
  }, [url]);

  const cues = data?.cues ?? [];
  const active = activeCueIndex(cues, time);

  useEffect(() => {
    if (detached || active < 0) return;
    const list = listRef.current;
    const item = list?.children[active] as HTMLElement | undefined;
    if (!list || !item) return;
    const top = item.offsetTop - list.clientHeight / 2 + item.offsetHeight / 2;
    list.scrollTo({ top, behavior: reducedMotion() ? 'auto' : 'smooth' });
  }, [active, detached, data]);

  useEffect(() => () => window.clearTimeout(detachTimer.current), []);

  const detach = () => {
    setDetached(true);
    window.clearTimeout(detachTimer.current);
    detachTimer.current = window.setTimeout(() => setDetached(false), 4000);
  };

  if (data === undefined) return <p className="pod-captions-note">טוען כתוביות…</p>;
  if (!data || cues.length === 0) return <p className="pod-captions-note">אין כתוביות לפרק הזה.</p>;

  return (
    <div className="pod-captions-wrap">
      <ol ref={listRef} className="pod-captions" aria-label="כתוביות" onWheel={detach} onTouchMove={detach}>
        {cues.map((cue, index) => {
          const state = index === active ? 'active' : index < active ? 'past' : 'future';
          const showSpeaker = index === 0 || cues[index - 1].speaker !== cue.speaker;
          return (
            <li key={index} className="pod-cue" data-state={state} aria-current={index === active ? 'true' : undefined}>
              {showSpeaker && cue.speaker && <span className={`pod-speaker ${cue.speaker === 'יעל' ? 'pod-speaker-yael' : ''}`}>{cue.speaker}</span>}
              <button
                type="button"
                onClick={() => {
                  setDetached(false);
                  onSeek(cue.start);
                }}
              >
                {cue.text}
              </button>
            </li>
          );
        })}
      </ol>
      {detached && active >= 0 && (
        <button type="button" className="pod-return" onClick={() => setDetached(false)}>
          חזרה לשורה הנוכחית
        </button>
      )}
    </div>
  );
}
