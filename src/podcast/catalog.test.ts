import { describe, expect, it } from 'vitest';
import { questionnaireList } from '../lib/questionnaires';
import { activeCueIndex, sanitizeCaptions } from './captions';
import { episodeAssetUrl, episodeLabel, episodeSlug, formatClock, formatTotal, groupEpisodes, parseEpisodeId, podcastAnchorByTopic, chapterInfo } from './catalog';
import { resumePosition, sanitizePodcastState } from './storage';

describe('episode ids', () => {
  it('reads the Hebrew ids the script uses', () => {
    expect(parseEpisodeId('1א')).toMatchObject({ chapter: 1, order: 0, latin: 'a' });
    expect(parseEpisodeId('6ו')).toMatchObject({ chapter: 6, order: 5, latin: 'f' });
    expect(episodeSlug('3ד')).toBe('ep-3d');
    expect(episodeLabel('3ד')).toBe('3ד');
  });

  it('accepts the Latin form too', () => {
    expect(parseEpisodeId('2b')).toMatchObject({ chapter: 2, order: 1 });
    expect(episodeLabel('2b')).toBe('2ב');
    expect(parseEpisodeId('ep-1a')).toBeNull();
  });
});

describe('groupEpisodes', () => {
  const raw = [
    { id: '2א', title: 'יסודות', topic: 'פרק 2: הסתברות', file: 'ep-2a.mp3', duration: 300 },
    { id: '1ב', title: 'הנדסית', topic: 'פרק 1: סדרות ואינדוקציה', file: 'episodes/ep-1b.mp3' },
    { id: '1א', title: 'חשבונית', topic: 'פרק 1: סדרות ואינדוקציה', file: 'ep-1a.mp3', captions: 'ep-1a.captions.json' },
    { id: '9א', title: 'בונוס', topic: 'פרק 9: משהו חדש', file: 'ep-9a.mp3' },
    { id: 'broken' },
    'not an object',
  ];

  it('groups by chapter in script order and skips malformed records', () => {
    const groups = groupEpisodes(raw);
    expect(groups.map((group) => group.chapter)).toEqual([1, 2, 9]);
    expect(groups[0].episodes.map((episode) => episode.id)).toEqual(['1א', '1ב']);
    expect(groups[0].anchor).toBe('sequences');
    expect(groups[0].title).toBe('סדרות ואינדוקציה');
  });

  it('keeps unknown chapters, with a generic anchor and the topic as title', () => {
    const bonus = groupEpisodes(raw)[2];
    expect(bonus.anchor).toBe('chapter-9');
    expect(bonus.title).toBe('משהו חדש');
  });

  it('falls back to the built-in chapter title when the record has no topic', () => {
    const groups = groupEpisodes([{ id: '5א', title: 'x', file: 'ep-5a.mp3' }]);
    expect(groups[0].title).toBe(chapterInfo[5].title);
  });

  it('returns nothing for an empty or invalid file', () => {
    expect(groupEpisodes([])).toEqual([]);
    expect(groupEpisodes({ nope: true })).toEqual([]);
  });
});

describe('asset urls', () => {
  it('serves files from the static episodes folder whatever path the script wrote', () => {
    expect(episodeAssetUrl('ep-1a.mp3')).toMatch(/\/podcast\/episodes\/ep-1a\.mp3$/);
    expect(episodeAssetUrl('episodes/ep-1a.mp3')).toMatch(/\/podcast\/episodes\/ep-1a\.mp3$/);
    expect(episodeAssetUrl('/episodes/ep-1a.mp3')).not.toContain('//');
  });
});

describe('topic links', () => {
  it('only points from topics that exist in the syllabus to chapters that exist', () => {
    const topicIds = new Set(questionnaireList.flatMap((questionnaire) => questionnaire.topics.map((topic) => topic.id)));
    const anchors = new Set(Object.values(chapterInfo).map((chapter) => chapter.anchor));
    for (const [topicId, anchor] of Object.entries(podcastAnchorByTopic)) {
      expect(topicIds.has(topicId), topicId).toBe(true);
      expect(anchors.has(anchor), anchor).toBe(true);
    }
  });
});

describe('formatting', () => {
  it('formats clocks and totals', () => {
    expect(formatClock(65)).toBe('1:05');
    expect(formatClock(0)).toBe('0:00');
    expect(formatTotal(45 * 60)).toBe('45 דק׳');
    expect(formatTotal(105 * 60)).toBe('שעה ו-45 דק׳');
    expect(formatTotal(120 * 60)).toBe('שעתיים');
  });
});

describe('captions', () => {
  const cues = sanitizeCaptions({ version: 1, duration: 10, cues: [{ start: 0, speaker: 'יעל', text: 'א', turn: 0 }, { start: 3.2, speaker: 'עומר', text: 'ב', turn: 1 }, { start: 7, speaker: 'יעל', text: 'ג', turn: 2 }] })!.cues;

  it('finds the sentence being spoken', () => {
    expect(activeCueIndex(cues, -1)).toBe(-1);
    expect(activeCueIndex(cues, 0)).toBe(0);
    expect(activeCueIndex(cues, 3.19)).toBe(1);
    expect(activeCueIndex(cues, 6.9)).toBe(1);
    expect(activeCueIndex(cues, 100)).toBe(2);
  });

  it('rejects files without cues', () => {
    expect(sanitizeCaptions(null)).toBeNull();
    expect(sanitizeCaptions({ cues: 'x' })).toBeNull();
  });
});

describe('storage', () => {
  it('sanitizes stored state', () => {
    const state = sanitizePodcastState({ rate: 1.25, captions: false, progress: { '1א': { position: 40, duration: 300 }, bad: { position: 'x' } } });
    expect(state.rate).toBe(1.25);
    expect(state.captions).toBe(false);
    expect(Object.keys(state.progress)).toEqual(['1א']);
    expect(sanitizePodcastState({ rate: 3 }).rate).toBe(1);
  });

  it('resumes only when meaningfully into an unfinished episode', () => {
    const state = sanitizePodcastState({ progress: { a: { position: 40, duration: 300 }, b: { position: 2 }, c: { position: 299, duration: 300 }, d: { position: 50, done: true } } });
    expect(resumePosition(state, 'a')).toBe(40);
    expect(resumePosition(state, 'b')).toBe(0);
    expect(resumePosition(state, 'c')).toBe(0);
    expect(resumePosition(state, 'd')).toBe(0);
    expect(resumePosition(state, 'missing')).toBe(0);
  });
});
