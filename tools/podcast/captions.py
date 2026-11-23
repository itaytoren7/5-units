"""
כתוביות מסונכרנות לפרקי הפודקאסט ("כמו lyrics").

אנחנו יודעים בדיוק מה נאמר בכל פרק (התסריט), אבל לא מתי. לכן:
1. מחלקים כל תור דיבור למשפטים. כל משפט הוא שורה בכתוביות.
2. מוצאים באודיו את רגעי השקט: ההפסקות בין משפטים ובין דוברים.
3. משבצים את גבולות המשפטים ברגעי השקט, כך שמשך כל משפט יתאים בערך לאורך שלו.
   השיבוץ נעשה בתכנון דינמי: מכל הצירופים האפשריים בוחרים את זה שהכי עקבי.

אין כאן תלות בספריות חיצוניות. מספיק Python 3.9 ומעלה.
"""

import array
import bisect
import json
import re
import shutil
import subprocess
import tempfile
import warnings
import wave
from pathlib import Path

SAMPLE_RATE = 24000
FRAME = 0.01        # אורך מסגרת לניתוח עוצמה, בשניות
MIN_GAP = 0.12      # שקט קצר מזה הוא לא הפסקה (סתם עיצור)
MIN_CUE = 0.35      # משך מינימלי לשורה
LEAD = 0.12         # השורה הבאה נדלקת רגע לפני שהדיבור מתחיל
GAP_BONUS = 2.0     # כמה עדיף לשבץ גבול בהפסקה ארוכה
FREE_PENALTY = 1.5  # מחיר של גבול שלא נמצאה לו הפסקה מתאימה

try:  # מהיר, קיים עד Python 3.12
    with warnings.catch_warnings():
        warnings.simplefilter("ignore", DeprecationWarning)
        import audioop  # type: ignore
except ImportError:  # Python 3.13 ומעלה
    audioop = None


# ---------------------------------------------------------------------------
# טקסט -> שורות
# ---------------------------------------------------------------------------

def split_sentences(text):
    """מחלק תור דיבור למשפטים. משפט קצר מאוד ("כן.") מצטרף לשכן שלו."""
    parts = [p.strip() for p in re.split(r"(?<=[.!?…])\s+", text) if p.strip()]
    merged = []
    for part in parts:
        if merged and len(merged[-1]) < 12:
            merged[-1] = merged[-1] + " " + part
        else:
            merged.append(part)
    if len(merged) > 1 and len(merged[-1]) < 12:
        last = merged.pop()
        merged[-1] = merged[-1] + " " + last
    return merged


def make_cues(turns, speaker_names):
    """turns: רשימת (דובר, טקסט). מחזיר שורות עם הדובר ומספר התור."""
    cues = []
    for turn_index, (speaker, text) in enumerate(turns):
        for sentence in split_sentences(text):
            cues.append({"speaker": speaker_names.get(speaker, speaker), "text": sentence, "turn": turn_index})
    return cues


def weight(text):
    """הערכה גסה לזמן ההקראה: ספרות מוקראות כמילים שלמות, ולכן הן "כבדות" יותר."""
    digits = sum(ch.isdigit() for ch in text)
    return len(text) + 2.5 * digits + 4


# ---------------------------------------------------------------------------
# אודיו -> רגעי שקט
# ---------------------------------------------------------------------------

def frame_levels(pcm):
    """עוצמה (RMS) של כל מסגרת של 10 מילישניות."""
    step = int(SAMPLE_RATE * FRAME) * 2  # 16 ביט = 2 בתים לדגימה
    if audioop is not None:
        return [audioop.rms(pcm[i:i + step], 2) for i in range(0, len(pcm) - step + 1, step)]
    samples = array.array("h")
    samples.frombytes(pcm[: len(pcm) // 2 * 2])
    n = step // 2
    levels = []
    for i in range(0, len(samples) - n + 1, n):
        chunk = samples[i:i + n]
        levels.append(int((sum(s * s for s in chunk) / n) ** 0.5))
    return levels


def find_silences(levels):
    """מחזיר את הסף ואת רשימת קטעי השקט (התחלה, סוף) בשניות."""
    if not levels:
        return 0, []
    ordered = sorted(levels)
    floor = ordered[int(len(ordered) * 0.05)]
    loud = ordered[int(len(ordered) * 0.95)]
    threshold = floor + 0.06 * (loud - floor)
    silences, start = [], None
    for i, level in enumerate(levels + [threshold + 1]):
        quiet = level <= threshold and i < len(levels)
        if quiet and start is None:
            start = i
        elif not quiet and start is not None:
            silences.append((start * FRAME, i * FRAME))
            start = None
    return threshold, silences


# ---------------------------------------------------------------------------
# שיבוץ
# ---------------------------------------------------------------------------

def _speech_bounds(silences, seg_start, seg_end):
    """תחילת הדיבור וסופו בתוך קטע, אחרי שמדלגים על שקט בקצוות."""
    s0, e0 = seg_start, seg_end
    for a, b in silences:
        if a <= s0 + FRAME and b > s0:
            s0 = b
        if a < e0 and b >= e0 - FRAME:
            e0 = a
    if e0 - s0 < 0.5:
        return seg_start, seg_end
    return s0, e0


def align_segment(cues, silences, seg_start, seg_end):
    """מחזיר זמן התחלה לכל שורה בקטע אודיו אחד."""
    n = len(cues)
    if n == 0:
        return []
    s0, e0 = _speech_bounds(silences, seg_start, seg_end)
    if n == 1:
        return [max(seg_start, s0 - LEAD)]

    weights = [weight(c["text"]) for c in cues]
    rate = (e0 - s0) / sum(weights)
    gaps = [(a, b) for a, b in silences if b - a >= MIN_GAP and a > s0 and b < e0]
    centers = [(a + b) / 2 for a, b in gaps]

    # מועמדים לכל גבול: ההפסקות שקרובות למיקום המשוער, ועוד "גבול חופשי" במיקום המשוער עצמו.
    candidates = []
    cum = 0.0
    for k in range(n - 1):
        cum += weights[k]
        expected = s0 + rate * cum
        window = 4 + 0.06 * (expected - s0)
        lo = bisect.bisect_left(centers, expected - window)
        hi = bisect.bisect_right(centers, expected + window)
        options = [(centers[j], -GAP_BONUS * min(gaps[j][1] - gaps[j][0], 0.8), j) for j in range(lo, hi)]
        options.append((expected, FREE_PENALTY, None))
        options.sort()
        candidates.append(options)

    def duration_cost(duration, k):
        exp = rate * weights[k]
        return (duration - exp) ** 2 / (exp + 0.5)

    # cost[k][i]: המחיר הכי נמוך כשהגבול ה-k יושב במועמד ה-i.
    inf = float("inf")
    prev_cost = [duration_cost(t - s0, 0) + extra if t - s0 >= MIN_CUE else inf for t, extra, _ in candidates[0]]
    back = [[None] * len(candidates[0])]
    for k in range(1, n - 1):
        row, row_back = [], []
        prev = candidates[k - 1]
        for t, extra, gap in candidates[k]:
            best, best_i = inf, None
            for i, (pt, _, pgap) in enumerate(prev):
                if prev_cost[i] == inf or t - pt < MIN_CUE or (gap is not None and gap == pgap):
                    continue
                c = prev_cost[i] + duration_cost(t - pt, k)
                if c < best:
                    best, best_i = c, i
            row.append(best + extra if best_i is not None else inf)
            row_back.append(best_i)
        prev_cost = row
        back.append(row_back)

    last = candidates[-1]
    final = [prev_cost[i] + duration_cost(e0 - t, n - 1) if prev_cost[i] < inf else inf for i, (t, _, _) in enumerate(last)]
    i = min(range(len(final)), key=final.__getitem__)
    if final[i] == inf:  # לא אמור לקרות; נופלים חזרה לחלוקה יחסית
        cum, starts = 0.0, [max(seg_start, s0 - LEAD)]
        for k in range(n - 1):
            cum += weights[k]
            starts.append(s0 + rate * cum)
        return starts

    chosen = []
    for k in range(n - 2, -1, -1):
        chosen.append(candidates[k][i])
        i = back[k][i] if k > 0 else None
    chosen.reverse()

    starts = [max(seg_start, s0 - LEAD)]
    for t, _, gap in chosen:
        if gap is None:
            starts.append(t)
        else:
            a, b = gaps[gap]
            starts.append(max(t, b - LEAD))
    return starts


def build_captions(cues, pcm, segments=None):
    """
    cues: השורות של כל הפרק. pcm: האודיו המלא (24kHz, מונו, 16 ביט).
    segments: אופציונלי, רשימת (התחלה, סוף, מספר שורות) לכל קטע שהוקרא בנפרד.
    כשהקטעים ידועים, כל קטע משובץ לחוד, וזה מדויק יותר.
    """
    duration = len(pcm) / 2 / SAMPLE_RATE
    _, silences = find_silences(frame_levels(pcm))
    if not segments:
        segments = [(0.0, duration, len(cues))]
    starts, index = [], 0
    for seg_start, seg_end, count in segments:
        starts += align_segment(cues[index:index + count], silences, seg_start, seg_end)
        index += count
    out = []
    for cue, start in zip(cues, starts):
        out.append({"start": round(start, 2), "speaker": cue["speaker"], "turn": cue["turn"], "text": cue["text"]})
    return {"version": 1, "duration": round(duration, 2), "cues": out}


def write_captions(path, captions):
    Path(path).write_text(json.dumps(captions, ensure_ascii=False, indent=1), encoding="utf-8")


# ---------------------------------------------------------------------------
# פענוח קובץ אודיו קיים (בשביל פרקים שנוצרו לפני שהיו כתוביות)
# ---------------------------------------------------------------------------

def read_wav_pcm(path):
    with wave.open(str(path)) as w:
        if w.getnchannels() == 1 and w.getsampwidth() == 2 and w.getframerate() == SAMPLE_RATE:
            return w.readframes(w.getnframes())
    return None


def decode_to_pcm(path):
    """מחזיר PCM של 24kHz מונו מכל קובץ אודיו, בעזרת ffmpeg או afconvert (Mac). None אם אין כלי."""
    path = Path(path)
    if path.suffix.lower() == ".wav":
        pcm = read_wav_pcm(path)
        if pcm is not None:
            return pcm
    ffmpeg = shutil.which("ffmpeg")
    if ffmpeg:
        result = subprocess.run(
            [ffmpeg, "-v", "error", "-i", str(path), "-f", "s16le", "-ac", "1", "-ar", str(SAMPLE_RATE), "-"],
            capture_output=True,
        )
        if result.returncode == 0:
            return result.stdout
    afconvert = shutil.which("afconvert")
    if afconvert:
        with tempfile.TemporaryDirectory() as tmp:
            out = Path(tmp) / "decoded.wav"
            result = subprocess.run(
                [afconvert, "-f", "WAVE", "-d", f"LEI16@{SAMPLE_RATE}", "-c", "1", str(path), str(out)],
                capture_output=True,
            )
            if result.returncode == 0:
                return read_wav_pcm(out)
    return None
