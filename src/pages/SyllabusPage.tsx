import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AlertTriangle, ChevronDown, Info, PencilLine, Timer } from 'lucide-react';
import type { Questionnaire, QuestionSlot } from '@/data/syllabus/types';
import { Badge, Button, Card, Notice, PageHeader, ProgressBar, ProgressRing, Segmented, Switch } from '../components/ui';
import { PriorityBadge } from '../components/StatusBadge';
import { SyllabusTopic } from '../components/SyllabusTopic';
import { formatDuration, formatPoints } from '../lib/format';
import { progressOf, slotProgress, topicsOfSlot } from '../lib/progress';
import { backgroundTopics, partsOf, questionnaireByCode } from '../lib/questionnaires';
import { useStore } from '../state/store';
import { NotFound } from './NotFound';

function SlotCard({ questionnaire, slot, showPartNote }: { questionnaire: Questionnaire; slot: QuestionSlot; showPartNote: boolean }) {
  const { state } = useStore();
  const [open, setOpen] = useState(false);
  const progress = slotProgress(questionnaire, slot, state.ratings);
  const topics = topicsOfSlot(questionnaire, slot);
  return (
    <Card as="article" className="!p-0">
      <button type="button" className="flex w-full items-center gap-3 px-4 py-3.5 text-start sm:px-5" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl text-sm font-extrabold ${slot.priority === 'yellow' ? 'bg-yellow-soft text-yellow' : 'bg-blue-soft text-blue'}`}>{slot.number}</span>
        <span className="min-w-0 flex-1">
          <span className="block text-xs text-muted">
            פרק {slot.part} · שאלה {slot.number}
            {slot.frequency && <> · {slot.frequency === 'always' ? 'תמיד' : slot.frequency === 'usually' ? 'בדרך כלל' : 'לעיתים רחוקות'}</>}
          </span>
          <span className="block font-bold leading-snug">{slot.title}</span>
        </span>
        <span className="hidden sm:block">
          <PriorityBadge priority={slot.priority} />
        </span>
        <span className="w-10 text-end text-xs font-semibold text-muted">{progress.percent}%</span>
        <ChevronDown size={18} className={`shrink-0 text-muted transition ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      <div className="px-4 pb-3 sm:px-5">
        <div className="mb-2 flex flex-wrap items-center gap-1.5 sm:hidden">
          <PriorityBadge priority={slot.priority} />
        </div>
        <ProgressBar percent={progress.percent} tone={slot.priority === 'yellow' ? 'yellow' : 'blue'} label={`התקדמות בשאלה ${slot.number}`} />
        {slot.note && <p className="mt-2 text-xs text-muted">{slot.note}</p>}
        {showPartNote && questionnaire.partNotes[slot.part] && <p className="mt-2 border-s-2 border-primary-soft ps-2 text-xs text-muted">{questionnaire.partNotes[slot.part]}</p>}
      </div>
      {open && (
        <div className="border-t border-border px-4 pb-2 sm:px-5">
          {topics.map((topic) => (
            <SyllabusTopic key={topic.id} questionnaire={questionnaire} topic={topic} />
          ))}
          <div className="flex flex-wrap gap-2 py-3">
            <Button size="sm" to={`/practice?code=${questionnaire.code}&slot=${slot.number}`} icon={<PencilLine size={14} />}>
              תרגילים לשאלה {slot.number}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}

export function SyllabusPage() {
  const { code } = useParams();
  const { state, actions } = useStore();
  const [activePart, setActivePart] = useState('all');
  const questionnaire = questionnaireByCode(code);
  if (!questionnaire) return <NotFound />;

  const parts = partsOf(questionnaire);
  const slots = activePart === 'all' ? questionnaire.slots : questionnaire.slots.filter((slot) => slot.part === activePart);
  const progress = progressOf(questionnaire, state.ratings);
  const isFocus = state.focusMode === 'focus-2026';
  const background = backgroundTopics(questionnaire);
  const yellow = questionnaire.slots.filter((slot) => slot.priority === 'yellow').map((slot) => slot.number);
  const blue = questionnaire.slots.filter((slot) => slot.priority === 'blue').map((slot) => slot.number);
  const seenParts = new Set<string>();

  return (
    <>
      <PageHeader
        eyebrow={`מפת הסילבוס · שאלון ${questionnaire.nickname} (${questionnaire.code})`}
        title="מה לומדים לבגרות?"
        description="כל הנושאים לפי מבנה השאלון. סמנו רמת שליטה בכל תת-נושא — ההתקדמות מחושבת רק על מה שבבגרות."
        actions={
          <div className="flex items-center gap-3">
            <ProgressRing percent={progress.percent} size={64} />
            <div className="text-sm">
              <b className="block text-lg text-primary">{progress.percent}%</b>
              <span className="text-muted">מהחומר שבבגרות</span>
            </div>
          </div>
        }
      />

      <Card className="mb-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm">
        <span>
          <Timer size={14} className="me-1 inline text-primary" />
          {formatDuration(questionnaire.durationMinutes)}
        </span>
        <span>
          עונים על <b>{questionnaire.questionsToAnswer}</b> מתוך {questionnaire.totalQuestions}
        </span>
        <span>
          <b>{formatPoints(questionnaire.pointsPerQuestion)}</b> נק׳ לשאלה · ציון עד {questionnaire.maxScore}
        </span>
        <span>
          <b>{questionnaire.weightPercent}%</b> מהציון
        </span>
        <span>{questionnaire.chapterRestriction ? 'יש הגבלת פרקים' : 'אין הגבלת פרקים'}</span>
      </Card>

      <div className="mb-4 flex flex-col gap-2">
        {questionnaire.warnings.map((warning) => (
          <Notice key={warning} tone="orange" icon={<AlertTriangle size={16} />}>
            {warning}
          </Notice>
        ))}
        {questionnaire.partNotes['כללי'] && (
          <Notice tone="neutral" icon={<Info size={16} />}>
            {questionnaire.partNotes['כללי']}
          </Notice>
        )}
        <Notice tone="primary">
          <b>סדר למידה מומלץ:</b> קודם השאלות הצהובות ({yellow.join(', ')}), ובסוף הכחולות ({blue.join(', ')}).
        </Notice>
      </div>

      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <Segmented
          label="פרק"
          value={activePart}
          onChange={setActivePart}
          options={[{ value: 'all', label: 'הכול' }, ...parts.map((part) => ({ value: part, label: `פרק ${part}` }))]}
        />
        <label className="flex items-center gap-2 text-sm">
          <span>{isFocus ? 'מיקוד 2026' : 'הסילבוס המלא'}</span>
          <Switch checked={isFocus} onChange={(next) => actions.setFocusMode(next ? 'focus-2026' : 'full')} label="מצב מיקוד" />
        </label>
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-1.5 text-xs">
        <Badge tone="green">בבגרות</Badge>
        <Badge tone="red">לא בבגרות</Badge>
        <Badge tone="orange">הורדה 2026</Badge>
        <Badge tone="green">✓ נשאר במפורש</Badge>
        <Badge tone="yellow">ללמוד קודם</Badge>
        <Badge tone="blue">ללמוד בסוף</Badge>
      </div>

      <div className="flex flex-col gap-3">
        {slots.map((slot) => {
          const first = !seenParts.has(slot.part);
          seenParts.add(slot.part);
          return <SlotCard key={slot.number} questionnaire={questionnaire} slot={slot} showPartNote={first} />;
        })}
      </div>

      {background.length > 0 && (
        <Card className="mt-5">
          <h2 className="text-lg font-bold">נושאי בסיס וטכניקה</h2>
          <p className="mb-2 text-sm text-muted">לא שאלה בפני עצמה, אבל נדרשים בכל השאלות.</p>
          {background.map((topic) => (
            <SyllabusTopic key={topic.id} questionnaire={questionnaire} topic={topic} defaultOpen={false} />
          ))}
        </Card>
      )}
    </>
  );
}
