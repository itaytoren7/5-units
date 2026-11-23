import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { Captions as CaptionsIcon, CaptionsOff, Check, Headphones, Pause, Play, RotateCcw, RotateCw } from 'lucide-react';
import { Button, Card, EmptyState, Notice, PageHeader, Segmented } from '../components/ui';
import { CaptionsView } from '../podcast/CaptionsView';
import { episodeAssetUrl, episodeNotes, episodesIndexUrl, formatClock, formatMinutes, formatTotal, groupEpisodes, type Episode, type EpisodeGroup } from '../podcast/catalog';
import { SKIP_SECONDS, usePlayer, type Player } from '../podcast/player';
import { PLAYBACK_RATES, setCaptionsEnabled, setPlaybackRate, usePodcastState, type EpisodeProgress, type PlaybackRate } from '../podcast/storage';
import '../podcast/podcast.css';

type Catalog = { status: 'loading' } | { status: 'error' } | { status: 'ready'; groups: EpisodeGroup[] };

function useCatalog(): Catalog {
  const [catalog, setCatalog] = useState<Catalog>({ status: 'loading' });
  useEffect(() => {
    const controller = new AbortController();
    fetch(episodesIndexUrl(), { signal: controller.signal, cache: 'no-cache' })
      .then((response) => {
        if (!response.ok) throw new Error(String(response.status));
        return response.json();
      })
      .then((json) => setCatalog({ status: 'ready', groups: groupEpisodes(json) }))
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === 'AbortError')) setCatalog({ status: 'error' });
      });
    return () => controller.abort();
  }, []);
  return catalog;
}

function progressPercent(progress: EpisodeProgress | undefined, duration: number | undefined): number {
  if (!progress || progress.done || !progress.position) return 0;
  const total = duration ?? progress.duration;
  return total ? Math.min(99, Math.round((progress.position / total) * 100)) : 0;
}

function EpisodeRow({
  episode,
  player,
  progress,
  expanded,
  captionsOn,
  onToggleCaptions,
  rowRef,
}: {
  episode: Episode;
  player: Player;
  progress: EpisodeProgress | undefined;
  expanded: boolean;
  captionsOn: boolean;
  onToggleCaptions: () => void;
  rowRef?: (node: HTMLLIElement | null) => void;
}) {
  const isCurrent = player.episode?.id === episode.id;
  const playing = isCurrent && player.playing;
  const duration = (isCurrent && player.duration) || episode.duration || progress?.duration;
  const percent = isCurrent && duration ? Math.round((player.time / duration) * 100) : progressPercent(progress, duration);
  const remaining = duration && progress && !progress.done && progress.position > 0 ? duration - progress.position : null;
  const max = Math.max(1, Math.floor(duration ?? 0));

  return (
    <li ref={rowRef} id={episode.slug} className="pod-item scroll-mt-24" data-active={expanded ? 'true' : undefined}>
      <div className="pod-row">
        <button type="button" className="pod-play" data-playing={playing ? 'true' : undefined} aria-label={playing ? `השהיה: ${episode.title}` : `ניגון: ${episode.title}`} onClick={() => player.play(episode)}>
          {playing ? <Pause size={20} fill="currentColor" aria-hidden="true" /> : <Play size={20} fill="currentColor" aria-hidden="true" />}
        </button>
        <button type="button" className="pod-title-btn" onClick={() => player.play(episode, { autoplay: !isCurrent })} aria-expanded={expanded}>
          <span className="pod-title">{episode.title}</span>
          <span className="pod-meta">
            {duration ? <span>{formatMinutes(duration)}</span> : null}
            {progress?.done && !isCurrent ? (
              <span className="pod-meta-done">
                <Check size={14} aria-hidden="true" /> הושמע
              </span>
            ) : remaining && !isCurrent ? (
              <span>נשארו {formatMinutes(remaining)}</span>
            ) : null}
            {episodeNotes[episode.label] && <span className="text-orange">{episodeNotes[episode.label]}</span>}
          </span>
        </button>
        <span className="pod-id" aria-label={`תת-פרק ${episode.label}`}>
          {episode.label}
        </span>
        {percent > 0 && percent < 100 && (
          <span className="pod-bar" aria-hidden="true">
            <i style={{ width: `${percent}%` }} />
          </span>
        )}
      </div>

      <div className="pod-expand" data-open={expanded ? 'true' : undefined}>
        <div>
          {expanded && isCurrent && (
            <div className="pod-player">
              <div className="pod-scrub" dir="ltr">
                <span>{formatClock(player.time)}</span>
                <input type="range" min={0} max={max} step={1} value={Math.min(Math.floor(player.time), max)} onChange={(event) => player.seek(Number(event.target.value))} aria-label="מיקום בפרק" />
                <span>{duration ? formatClock(duration) : '–:––'}</span>
              </div>
              <div className="pod-controls">
                <button type="button" className="pod-ctl" onClick={() => player.skip(-SKIP_SECONDS)} aria-label={`אחורה ${SKIP_SECONDS} שניות`}>
                  <RotateCcw size={26} strokeWidth={1.75} aria-hidden="true" />
                  <small aria-hidden="true">{SKIP_SECONDS}</small>
                </button>
                <button type="button" className="pod-ctl pod-ctl-main" data-playing={playing ? 'true' : undefined} data-waiting={isCurrent && player.waiting ? 'true' : undefined} onClick={player.toggle} aria-label={playing ? 'השהיה' : 'ניגון'}>
                  {playing ? <Pause size={24} fill="currentColor" aria-hidden="true" /> : <Play size={24} fill="currentColor" aria-hidden="true" />}
                </button>
                <button type="button" className="pod-ctl" onClick={() => player.skip(SKIP_SECONDS)} aria-label={`קדימה ${SKIP_SECONDS} שניות`}>
                  <RotateCw size={26} strokeWidth={1.75} aria-hidden="true" />
                  <small aria-hidden="true">{SKIP_SECONDS}</small>
                </button>
                <button type="button" className="pod-ctl pod-ctl-right" aria-pressed={captionsOn} onClick={onToggleCaptions} aria-label={captionsOn ? 'הסתרת כתוביות' : 'הצגת כתוביות'} title={captionsOn ? 'הסתרת כתוביות' : 'הצגת כתוביות'}>
                  {captionsOn ? <CaptionsIcon size={22} aria-hidden="true" /> : <CaptionsOff size={22} aria-hidden="true" />}
                </button>
              </div>
              {player.error && <Notice tone="red">{player.error}</Notice>}
              {captionsOn && <CaptionsView url={episode.captions ? episodeAssetUrl(episode.captions) : undefined} time={player.time} onSeek={player.seek} />}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

function Dock({ player, group, visible, onReveal }: { player: Player; group: EpisodeGroup | undefined; visible: boolean; onReveal: () => void }) {
  const episode = player.episode;
  if (!episode) return null;
  const duration = player.duration || episode.duration || 0;
  return (
    <div className="pod-dock no-print" data-visible={visible ? 'true' : undefined} aria-hidden={!visible}>
      <button type="button" className="pod-play" data-playing={player.playing ? 'true' : undefined} onClick={player.toggle} aria-label={player.playing ? 'השהיה' : 'ניגון'} tabIndex={visible ? 0 : -1}>
        {player.playing ? <Pause size={20} fill="currentColor" aria-hidden="true" /> : <Play size={20} fill="currentColor" aria-hidden="true" />}
      </button>
      <div className="pod-dock-text">
        <button type="button" onClick={onReveal} tabIndex={visible ? 0 : -1}>
          <span className="pod-dock-title">{episode.title}</span>
          <span className="pod-dock-sub">
            {group?.title}
            {duration ? ` · ${formatClock(player.time)} / ${formatClock(duration)}` : ''}
          </span>
        </button>
      </div>
      <Button size="sm" variant="ghost" onClick={onReveal} tabIndex={visible ? 0 : -1}>
        לפרק
      </Button>
    </div>
  );
}

export function PodcastPage() {
  const catalog = useCatalog();
  const prefs = usePodcastState();
  const { hash } = useLocation();
  const groups = catalog.status === 'ready' ? catalog.groups : [];
  const groupOf = useCallback((episode: Episode) => groups.find((group) => group.chapter === episode.chapter)?.title ?? '', [groups]);
  const player = usePlayer(prefs.rate, groupOf);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [rowVisible, setRowVisible] = useState(true);
  const activeRow = useRef<HTMLLIElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  // The expanded row follows whatever is loaded in the player.
  useEffect(() => {
    if (player.episode) setExpandedId(player.episode.id);
  }, [player.episode]);

  // #sequences scrolls to a chapter; #ep-1a opens an episode (silently: browsers want a tap before sound).
  const playRef = useRef(player.play);
  playRef.current = player.play;
  useEffect(() => {
    if (catalog.status !== 'ready' || !hash) return;
    const id = decodeURIComponent(hash.slice(1));
    const episode = catalog.groups.flatMap((group) => group.episodes).find((candidate) => candidate.slug === id);
    if (episode) playRef.current(episode, { autoplay: false });
    const timer = window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }), 80);
    return () => window.clearTimeout(timer);
  }, [catalog, hash]);

  const watchRow = useCallback((node: HTMLLIElement | null) => {
    observer.current?.disconnect();
    activeRow.current = node;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setRowVisible(true);
      return;
    }
    observer.current = new IntersectionObserver(([entry]) => setRowVisible(entry.isIntersecting), { threshold: 0.2 });
    observer.current.observe(node);
  }, []);
  useEffect(() => () => observer.current?.disconnect(), []);

  const totals = useMemo(() => {
    const all = groups.flatMap((group) => group.episodes);
    const seconds = all.reduce((sum, episode) => sum + (episode.duration ?? 0), 0);
    const done = all.filter((episode) => prefs.progress[episode.id]?.done).length;
    return { count: all.length, seconds, done };
  }, [groups, prefs.progress]);

  const currentGroup = player.episode ? groups.find((group) => group.chapter === player.episode?.chapter) : undefined;

  return (
    <>
      <PageHeader
        title="פודקאסט"
        description="יעל ועומר עוברים על כל נושאי הבגרות, תת-פרק אחרי תת-פרק. ההאזנה ממשיכה מהמקום שעצרת, והכתוביות רצות עם הדיבור."
        actions={
          <Segmented
            label="מהירות ההאזנה"
            value={String(prefs.rate)}
            onChange={(value) => setPlaybackRate(Number(value) as PlaybackRate)}
            options={PLAYBACK_RATES.map((rate) => ({ value: String(rate), label: <span dir="ltr">×{rate}</span> }))}
          />
        }
      >
        {catalog.status === 'ready' && totals.count > 0 && (
          <p className="mt-2 text-sm text-muted">
            {totals.count} פרקים
            {totals.seconds ? ` · ${formatTotal(totals.seconds)}` : ''}
            {totals.done ? ` · ${totals.done} הושמעו` : ''}
          </p>
        )}
      </PageHeader>

      {catalog.status === 'loading' && (
        <div className="flex flex-col gap-3" aria-busy="true" aria-label="טוען את רשימת הפרקים">
          <div className="pod-skeleton" />
          <div className="pod-skeleton" />
          <div className="pod-skeleton" />
        </div>
      )}

      {catalog.status === 'error' && (
        <Card>
          <EmptyState icon={<Headphones size={24} />} title="רשימת הפרקים לא נטענה" description="בדקו את החיבור לאינטרנט ורעננו את הדף." />
        </Card>
      )}

      {catalog.status === 'ready' && groups.length === 0 && (
        <Card>
          <EmptyState icon={<Headphones size={24} />} title="הפרקים בדרך" description="עדיין אין פרקי שמע. כשפרק חדש ייווצר, הוא יופיע כאן מעצמו." />
        </Card>
      )}

      {catalog.status === 'ready' && groups.length > 0 && (
        <>
          <nav className="no-print mb-6 flex gap-2 overflow-x-auto pb-1" aria-label="נושאי הפודקאסט">
            {groups.map((group) => (
              <a key={group.anchor} href={`#${group.anchor}`} className="badge shrink-0 bg-surface-2 text-muted hover:text-text">
                {group.title}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-8">
            {groups.map((group) => {
              const seconds = group.episodes.reduce((sum, episode) => sum + (episode.duration ?? 0), 0);
              return (
                <section key={group.anchor} id={group.anchor} className="scroll-mt-24" aria-labelledby={`${group.anchor}-title`}>
                  <div className="pod-chapter">
                    <span className="pod-num" aria-hidden="true">
                      {group.chapter || '•'}
                    </span>
                    <div className="min-w-0">
                      <h2 id={`${group.anchor}-title`} className="text-xl font-bold leading-tight">
                        {group.title}
                      </h2>
                      <p className="text-sm text-muted">
                        {group.episodes.length} {group.episodes.length === 1 ? 'פרק' : 'פרקים'}
                        {seconds ? ` · ${formatTotal(seconds)}` : ''}
                      </p>
                    </div>
                  </div>
                  <Card padding="none">
                    <ol className="pod-list stagger">
                      {group.episodes.map((episode) => (
                        <EpisodeRow
                          key={episode.id}
                          episode={episode}
                          player={player}
                          progress={prefs.progress[episode.id]}
                          expanded={expandedId === episode.id}
                          captionsOn={prefs.captions}
                          onToggleCaptions={() => setCaptionsEnabled(!prefs.captions)}
                          rowRef={player.episode?.id === episode.id ? watchRow : undefined}
                        />
                      ))}
                    </ol>
                  </Card>
                </section>
              );
            })}
          </div>

          {/* Room for the dock above the last rows. */}
          {player.episode && <div className="h-20" aria-hidden="true" />}

          {/* Rendered on <body>: the page's entrance animation would otherwise anchor `position: fixed` to the page. */}
          {createPortal(
            <Dock player={player} group={currentGroup} visible={Boolean(player.episode) && !rowVisible} onReveal={() => activeRow.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })} />,
            document.body,
          )}
        </>
      )}
    </>
  );
}
