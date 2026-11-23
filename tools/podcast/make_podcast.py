"""
יוצר פרקי פודקאסט (MP3) מתוך התסריט, עם קול אישה ליעל וקול גבר לעומר,
ולכל פרק גם קובץ כתוביות מסונכרנות לאתר.

שימוש (מהטרמינל של VS Code, מתוך התיקייה tools/podcast):
    python3 make_podcast.py --list          # רשימת תתי-הפרקים בתסריט
    python3 make_podcast.py --only 1א       # פרק אחד לבדיקה
    python3 make_podcast.py                 # כל הפרקים
    python3 make_podcast.py --captions      # רק כתוביות, לפרקים שכבר קיימים (בלי מפתח API)

הקבצים נשמרים ישר לתיקייה שהאתר מגיש: public/podcast/episodes.
שם נוצרים ep-1a.mp3, ep-1a.captions.json ו-episodes.json (רשימת הפרקים שהאתר קורא).

צריך:
    pip3 install google-genai
    מפתח API של Gemini במשתנה הסביבה GEMINI_API_KEY (ראו הוראות.md)
    ffmpeg (לא חובה): אם הוא מותקן הקבצים יישמרו כ-MP3, אחרת כ-WAV.
"""

import argparse
import base64
import io
import json
import os
import re
import shutil
import subprocess
import sys
import time
import wave
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from captions import build_captions, decode_to_pcm, make_cues, write_captions  # noqa: E402

# ---------------------------------------------------------------------------
# הגדרות שאפשר לשנות
# ---------------------------------------------------------------------------

SCRIPT_FILE = "podcast-script-5-units.md"   # קובץ התסריט, באותה תיקייה

# לכאן נשמרים קובצי האודיו והכתוביות: התיקייה הסטטית של האתר (הנתיב יחסי לקובץ הזה).
OUT_DIR = HERE.parents[1] / "public" / "podcast" / "episodes"

# קטעי ביניים בזמן היצירה. לא עולים ל-git ולא לאתר.
PARTS_DIR = HERE / ".parts"

# מודלים של Gemini להקראה. אם הראשון לא זמין, הסקריפט מנסה את הבא.
# את שמות המודלים העדכניים אפשר לראות ב-Google AI Studio.
MODELS = [
    "gemini-3.1-flash-tts-preview",
    "gemini-2.5-flash-preview-tts",
]

# קולות מוכנים של Gemini. Sulafat הוא קול נשי, Puck קול גברי.
# קולות נשיים נוספים: Kore, Zephyr, Vindemiatrix, Aoede. גבריים: Charon, Umbriel, Zubenelgenubi.
VOICE_YAEL = "Sulafat"
VOICE_OMER = "Puck"

# הנחיית סגנון שנשלחת לפני כל קטע
STYLE = (
    "TTS the following Hebrew conversation between Yael and Omer. "
    "Read every word exactly as written, in Hebrew, in a warm, clear and friendly "
    "educational podcast style, at a calm pace that suits high-school students. "
    "Yael is a woman and Omer is a man."
)

# קטעים קצרים שומרים על איכות ההקראה. כל קטע הוא כ-2 דקות שמע.
CHUNK_CHARS = 1500
PAUSE_BETWEEN_CHUNKS = 0.4    # שניות שקט בין קטעים
SAMPLE_RATE = 24000           # Gemini מחזיר 24kHz, מונו, 16 ביט

# אותיות התת-פרק -> שמות קבצים באנגלית (נוח יותר לאתר)
LETTERS = {"א": "a", "ב": "b", "ג": "c", "ד": "d", "ה": "e", "ו": "f", "ז": "g", "ח": "h"}
SPEAKERS = {"יעל": "Yael", "עומר": "Omer"}
SPEAKER_HEBREW = {english: hebrew for hebrew, english in SPEAKERS.items()}

# ---------------------------------------------------------------------------

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")


def clean(text: str) -> str:
    """מסיר סימוני Markdown מהטקסט."""
    text = re.sub(r"\\([\\`*_{}\[\]()#+\-.!|>~])", r"\1", text)
    text = text.replace("**", "").replace("__", "")
    return re.sub(r"\s+", " ", text).strip()


def parse_script(path: Path):
    """מחזיר רשימת תתי-פרקים: מזהה, כותרת, נושא ושורות דיאלוג."""
    episodes = []
    topic = ""
    current = None
    for line in path.read_text(encoding="utf-8").splitlines():
        m_topic = re.match(r"^##\s+(פרק\s+\d+:.*)$", line)
        m_ep = re.match(r"^###\s+תת-פרק\s+(\d+)(\S)\s*:\s*(.+)$", line)
        m_turn = re.match(r"^\*\*(יעל|עומר):\*\*\s*(.+)$", line)
        if m_topic:
            topic = clean(m_topic.group(1))
            current = None
        elif m_ep:
            num, letter, title = m_ep.groups()
            current = {
                "id": f"{num}{letter}",
                "slug": f"ep-{num}{LETTERS.get(letter, letter)}",
                "title": clean(title),
                "topic": topic,
                "turns": [],
            }
            episodes.append(current)
        elif line.startswith("#### דף נוסחאות"):
            current = None  # דף הנוסחאות לא מוקרא
        elif m_turn and current is not None:
            current["turns"].append((SPEAKERS[m_turn.group(1)], clean(m_turn.group(2))))
    return [e for e in episodes if e["turns"]]


def chunk_turns(turns, limit=CHUNK_CHARS):
    """מחלק את השיחה לקטעים בלי לחתוך משפט של דובר באמצע."""
    chunks, current, size = [], [], 0
    for speaker, text in turns:
        if current and size + len(text) > limit:
            chunks.append(current)
            current, size = [], 0
        current.append((speaker, text))
        size += len(text)
    if current:
        chunks.append(current)
    return chunks


def make_client():
    key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    if not key:
        sys.exit("לא נמצא מפתח API. הגדירו את המשתנה GEMINI_API_KEY (ראו הוראות.md).")
    try:
        from google import genai
    except ImportError:
        sys.exit("חסרה הספרייה google-genai. הריצו: pip3 install google-genai")
    return genai.Client(api_key=key)


def speech_config():
    from google.genai import types

    def speaker(name, voice):
        return types.SpeakerVoiceConfig(
            speaker=name,
            voice_config=types.VoiceConfig(
                prebuilt_voice_config=types.PrebuiltVoiceConfig(voice_name=voice)
            ),
        )

    return types.GenerateContentConfig(
        response_modalities=["AUDIO"],
        speech_config=types.SpeechConfig(
            multi_speaker_voice_config=types.MultiSpeakerVoiceConfig(
                speaker_voice_configs=[speaker("Yael", VOICE_YAEL), speaker("Omer", VOICE_OMER)]
            )
        ),
    )


def to_pcm(data, mime_type: str = "") -> bytes:
    """ממיר את התשובה של Gemini ל-PCM גולמי של 24kHz."""
    if isinstance(data, str):
        data = base64.b64decode(data)
    if data[:4] == b"RIFF":
        with wave.open(io.BytesIO(data)) as w:
            return w.readframes(w.getnframes())
    m = re.search(r"rate=(\d+)", mime_type or "")
    if m and int(m.group(1)) != SAMPLE_RATE:
        print(f"  שימו לב: קצב הדגימה שהתקבל הוא {m.group(1)} ולא {SAMPLE_RATE}.")
    return data


def synthesize(client, model_state, text: str) -> bytes:
    """שולח קטע אחד להקראה, עם ניסיונות חוזרים ומעבר למודל הבא במקרה הצורך."""
    config = speech_config()
    attempt = 0
    while True:
        model = MODELS[model_state["index"]]
        try:
            response = client.models.generate_content(model=model, contents=text, config=config)
            part = response.candidates[0].content.parts[0]
            return to_pcm(part.inline_data.data, part.inline_data.mime_type)
        except Exception as err:  # noqa: BLE001
            message = str(err)
            not_found = "404" in message or "NOT_FOUND" in message or "not found" in message.lower()
            if not_found and model_state["index"] + 1 < len(MODELS):
                model_state["index"] += 1
                print(f"  המודל {model} לא זמין, עוברים ל-{MODELS[model_state['index']]}")
                continue
            attempt += 1
            if attempt > 5:
                raise
            wait = min(60, 5 * 2 ** (attempt - 1))
            print(f"  שגיאה ({message[:120]}). מנסים שוב בעוד {wait} שניות...")
            time.sleep(wait)


def write_wav(path: Path, pcm: bytes):
    with wave.open(str(path), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SAMPLE_RATE)
        w.writeframes(pcm)


def finalize_audio(wav_path: Path) -> Path:
    """ממיר ל-MP3 אם ffmpeg מותקן. אחרת משאיר WAV."""
    ffmpeg = shutil.which("ffmpeg")
    if not ffmpeg:
        return wav_path
    mp3_path = wav_path.with_suffix(".mp3")
    result = subprocess.run(
        [ffmpeg, "-y", "-loglevel", "error", "-i", str(wav_path), "-codec:a", "libmp3lame", "-b:a", "96k", str(mp3_path)],
        capture_output=True,
    )
    if result.returncode == 0:
        wav_path.unlink()
        return mp3_path
    print("  ההמרה ל-MP3 נכשלה, נשמר WAV.")
    return wav_path


def seconds_of(pcm: bytes) -> float:
    return len(pcm) / 2 / SAMPLE_RATE


def captions_from_audio(episode, audio_path: Path, captions_path: Path):
    """בונה כתוביות לפרק שהאודיו שלו כבר קיים (בלי קטעים ידועים, לפי השקטים בלבד)."""
    pcm = decode_to_pcm(audio_path)
    if pcm is None:
        print(f"{episode['id']}: אין כלי לפענוח האודיו (ffmpeg או afconvert), הכתוביות לא נוצרו.")
        return None
    cues = make_cues(episode["turns"], SPEAKER_HEBREW)
    captions = build_captions(cues, pcm)
    write_captions(captions_path, captions)
    print(f"{episode['id']}: נוצרו כתוביות ({len(cues)} שורות) -> {captions_path.name}")
    return captions


def build_episode(client, model_state, episode, out_dir: Path, previous=None, force=False, captions_only=False) -> dict:
    """יוצר (או משלים) פרק אחד ומחזיר את הרשומה שלו לרשימת הפרקים."""
    slug = episode["slug"]
    captions_path = out_dir / f"{slug}.captions.json"
    existing = [p for p in (out_dir / f"{slug}.mp3", out_dir / f"{slug}.wav") if p.exists()]
    duration = (previous or {}).get("duration")

    if existing and not (force and not captions_only):
        audio_path = existing[0]
        if captions_only or force or not captions_path.exists():
            captions = captions_from_audio(episode, audio_path, captions_path)
            if captions:
                duration = captions["duration"]
        else:
            print(f"{episode['id']}: כבר קיים ({audio_path.name}), מדלגים.")
    elif captions_only:
        print(f"{episode['id']}: אין עדיין אודיו, מדלגים.")
        return None
    else:
        parts_dir = PARTS_DIR / slug
        parts_dir.mkdir(parents=True, exist_ok=True)
        chunks = chunk_turns(episode["turns"])
        pcm_all = b""
        silence = b"\x00\x00" * int(SAMPLE_RATE * PAUSE_BETWEEN_CHUNKS)
        cues, segments = [], []
        for i, chunk in enumerate(chunks, 1):
            part_file = parts_dir / f"{i:02d}.pcm"
            if part_file.exists() and not force:
                pcm = part_file.read_bytes()
            else:
                print(f"{episode['id']}: מקריא קטע {i} מתוך {len(chunks)}...")
                text = STYLE + "\n\n" + "\n".join(f"{s}: {t}" for s, t in chunk)
                pcm = synthesize(client, model_state, text)
                part_file.write_bytes(pcm)
            chunk_cues = make_cues(chunk, SPEAKER_HEBREW)
            segments.append((seconds_of(pcm_all), seconds_of(pcm_all + pcm), len(chunk_cues)))
            cues += chunk_cues
            pcm_all += pcm + (silence if i < len(chunks) else b"")
        wav_path = out_dir / f"{slug}.wav"
        write_wav(wav_path, pcm_all)
        audio_path = finalize_audio(wav_path)
        # הקטעים ידועים במדויק, אז הכתוביות משובצות קטע-קטע.
        write_captions(captions_path, build_captions(cues, pcm_all, segments))
        duration = seconds_of(pcm_all)
        shutil.rmtree(parts_dir, ignore_errors=True)
        print(f"{episode['id']}: נשמר {audio_path.name} + כתוביות ({len(cues)} שורות)")

    entry = {
        "id": episode["id"],
        "title": episode["title"],
        "topic": episode["topic"],
        "file": audio_path.name,
    }
    if captions_path.exists():
        entry["captions"] = captions_path.name
    if duration:
        entry["duration"] = round(duration, 1)
    return entry


def sort_key(entry):
    m = re.match(r"(\d+)(.*)", entry["id"])
    return (int(m.group(1)), m.group(2)) if m else (999, entry["id"])


def write_index(out_dir: Path, entries):
    """שומר את רשימת הפרקים שהאתר קורא (episodes.json)."""
    entries = sorted((e for e in entries if e), key=sort_key)
    data = json.dumps(entries, ensure_ascii=False, indent=2)
    (out_dir / "episodes.json").write_text(data + "\n", encoding="utf-8")


def load_index(out_dir: Path):
    path = out_dir / "episodes.json"
    if path.exists():
        try:
            return {e["id"]: e for e in json.loads(path.read_text(encoding="utf-8"))}
        except (ValueError, KeyError, TypeError):
            pass
    return {}


def main():
    parser = argparse.ArgumentParser(description="יצירת פרקי פודקאסט מהתסריט")
    parser.add_argument("--only", nargs="*", help="מזהי תתי-פרקים, למשל 1א 2ב (או 1a 2b)")
    parser.add_argument("--list", action="store_true", help="הצגת תתי-הפרקים בלבד")
    parser.add_argument("--force", action="store_true", help="ליצור מחדש גם פרקים שכבר קיימים")
    parser.add_argument("--captions", action="store_true", help="ליצור רק כתוביות לפרקים שהאודיו שלהם כבר קיים (בלי הקראה ובלי מפתח)")
    parser.add_argument("--script", default=SCRIPT_FILE, help="נתיב לקובץ התסריט")
    args = parser.parse_args()

    script_path = Path(args.script)
    if not script_path.is_absolute():
        script_path = HERE / script_path
    if not script_path.exists():
        sys.exit(f"לא נמצא קובץ התסריט: {script_path}")

    episodes = parse_script(script_path)
    if args.list:
        for e in episodes:
            chars = sum(len(t) for _, t in e["turns"])
            print(f"{e['id']:>3}  {e['slug']:<7} ~{chars / 14 / 60:.0f} דק'  {e['title']}")
        return

    if args.only:
        wanted = set()
        for item in args.only:
            m = re.match(r"^(\d+)(\S)$", item.strip())
            if m:
                num, letter = m.groups()
                heb = {v: k for k, v in LETTERS.items()}.get(letter.lower(), letter)
                wanted.add(f"{num}{heb}")
        episodes = [e for e in episodes if e["id"] in wanted]
        if not episodes:
            sys.exit("לא נמצאו תתי-פרקים מתאימים. הריצו עם --list כדי לראות את המזהים.")

    out_dir = OUT_DIR
    out_dir.mkdir(parents=True, exist_ok=True)
    client = None if args.captions else make_client()
    model_state = {"index": 0}
    index = load_index(out_dir)

    for episode in episodes:
        entry = build_episode(
            client, model_state, episode, out_dir,
            previous=index.get(episode["id"]), force=args.force, captions_only=args.captions,
        )
        if entry:
            index[entry["id"]] = entry
            write_index(out_dir, index.values())

    print(f"\nסיום. הקבצים נמצאים בתיקייה {out_dir}")
    print("כדי שהפרקים יעלו לאתר: git add public/podcast/episodes && git commit && git push")


if __name__ == "__main__":
    main()
