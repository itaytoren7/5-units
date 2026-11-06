import { useMemo } from 'react';
import { Pause, Play, Square, Volume2 } from 'lucide-react';
import { Button, Notice, Segmented } from '../components/ui';
import { SPEECH_RATES } from './storage';
import { toSentences, type ReadAloud as ReadAloudState } from './speech';

export function SpeedPicker({ rate, onChange }: { rate: number; onChange: (rate: number) => void }) {
  return <Segmented label="מהירות הקראה" value={String(rate)} onChange={(value) => onChange(Number(value))} options={SPEECH_RATES.map((value) => ({ value: String(value), label: `×${value}` }))} />;
}

export function NoHebrewVoiceNote({ aloud }: { aloud: ReadAloudState }) {
  if (!aloud.supported) return <Notice tone="orange">הדפדפן הזה לא תומך בהקראה (Web Speech API).</Notice>;
  if (aloud.hebrewVoice) return null;
  return <Notice tone="orange">לא נמצא קול בעברית. במק: הגדרות המערכת ← נגישות ← תוכן מדובר ← קולות ← עברית (למשל Carmit). בווינדוס: הגדרות ← זמן ושפה ← דיבור.</Notice>;
}

/** A read-aloud control for one block of Markdown: play/pause/stop, and the current sentence highlighted while it plays. */
export function ReadAloud({ id, label, text, aloud, rate }: { id: string; label: string; text: string; aloud: ReadAloudState; rate: number }) {
  const sentences = useMemo(() => toSentences(text), [text]);
  const active = aloud.activeKey === id;
  if (!aloud.supported || sentences.length === 0) return null;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        {!active || aloud.status === 'idle' ? (
          <Button size="sm" variant="soft" icon={<Volume2 size={15} />} onClick={() => aloud.play(id, sentences, rate)}>
            {label}
          </Button>
        ) : (
          <>
            {aloud.status === 'playing' ? (
              <Button size="sm" variant="soft" icon={<Pause size={15} />} onClick={aloud.pause}>
                השהיה
              </Button>
            ) : (
              <Button size="sm" variant="soft" icon={<Play size={15} />} onClick={aloud.resume}>
                המשך
              </Button>
            )}
            <Button size="sm" variant="ghost" icon={<Square size={15} />} onClick={aloud.stop}>
              עצירה
            </Button>
          </>
        )}
      </div>
      {active && aloud.status !== 'idle' && (
        <p className="rounded-xl bg-surface-2 px-3 py-2 text-sm leading-relaxed" aria-live="off">
          {sentences.map((sentence, index) => (
            <span key={index} className={index === aloud.index ? 'rounded bg-primary-soft px-1 font-semibold text-primary' : 'text-muted'}>
              {sentence}{' '}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}
