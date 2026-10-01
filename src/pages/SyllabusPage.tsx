import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AlertTriangle, ChevronDown, Info, PencilLine, Timer } from 'lucide-react';
import type { Questionnaire, QuestionSlot } from '@/data/syllabus/types';
import { Badge, Button, Card, Collapse, Notice, PageHeader, ProgressBar, ProgressRing, Switch, Tabs } from '../components/ui';
import { PriorityBadge } from '../components/StatusBadge';
import { SyllabusTopic } from '../components/SyllabusTopic';
import { formatDuration, formatPoints } from '../lib/format';
import { progressOf, slotProgress, topicsOfSlot } from '../lib/progress';
import { backgroundTopics, partsOf, questionnaireByCode } from '../lib/questionnaires';
import { useStore } from '../state/store';
import { NotFound } from './NotFound';

const frequencyLabels = { always: 'תמיד', usually: 'בדרך כלל', rare: 'לעיתים רחוקות' } as const;

function SlotCard({ questionnaire, slot, showPartNote }: { questionnaire: Questionnaire; slot: QuestionSlot; showPartNote: boolean }) {
  const { state } = useStore();
  const [open, setOpen] = useState(false);
  const progress = slotProgress(questionnaire, slot, state.ratings);
  const topics = topicsOfSlot(questionnaire, slot);
  return (
    <Card as="article" padding="none">
      <button type="button" className="flex w-full items-center gap-4 px-5 py-4 text-start sm:px-6" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-lg font-bold ${slot.priority === 'yellow' ? 'bg-yellow-soft text-yellow' : 'bg-blue-soft text-blue'}`}>{slot.number}</span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm text-muted">
            פרק {slot.part} · שאלה {slot.number}
            {slot.frequency && <> · {frequencyLabels[slot.frequency]}</>}
          </span>
          <span className="block text-lg font-bold leading-snug">{slot.title}</span>
        </span>
        <span className="hidden sm:block">
          <PriorityBadge priority={slot.priority} />
        </span>
        <span className="w-12 text-end text-sm font-semibold tabular-nums text-muted">{progress.percent}%</span>
        <ChevronDown size={20} className={`shrink-0 text-muted transition ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      <div className="px-5 pb-4 sm:px-6">
        <div className="mb-2 sm:hidden">
          <PriorityBadge priority={slot.priority} />
        </div>
        <ProgressBar percent={progress.percent} tone={slot.priority === 'yellow' ? 'yellow' : 'blue'} label={`התקדמות בשאלה ${slot.number}`} />
        {slot.note && <p className="mt-3 text-sm text-muted">{slot.note}</p>}
        {showPartNote && questionnaire.partNotes[slot.part] && <p className="mt-2 border-s-2 border-primary-soft ps-3 text-sm text-muted">{questionnaire.partNotes[slot.part]}</p>}
      </div>
      <Collapse open={open}>
        <div className="border-t border-border px-5 pb-3 sm:px-6">
          {topics.map((topic) => (
            <SyllabusTopic key={topic.id} questionnaire={questionnaire} topic={topic} />
          ))}
          <div className="flex flex-wrap gap-2 py-3">
            <Button size="sm" variant="soft" to={`/practice?code=${questionnaire.code}&slot=${slot.number}`} icon={<PencilLine size={15} />}>
              תרגילים לשאלה {slot.number}
            </Button>
          </div>
        </div>
      </Collapse>
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
        description="כל הנושאים לפי מבנה השאלון. סמנו רמת שליטה בכל תת-נושא. ההתקדמות מחושבת רק על מה שבבגרות."
        actions={
          <div className="flex items-center gap-3">
            <ProgressRing percent={progress.percent} size={80} stroke={8} />
            <div className="text-sm">
              <b className="block text-lg text-primary">{progress.percent}%</b>
              <span className="text-muted">מהחומר שבבגרות</span>
            </div>
          </div>
        }
      />

      <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {[
          { label: 'משך', value: formatDuration(questionnaire.durationMinutes), icon: <Timer size={14} /> },
          { label: 'עונים על', value: `${questionnaire.questionsToAnswer} מתוך ${questionnaire.totalQuestions}` },
          { label: 'לשאלה', value: `${formatPoints(questionnaire.pointsPerQuestion)} נק׳` },
          { label: 'מהציון', value: `${questionnaire.weightPercent}%` },
          { label: 'הגבלת פרקים', value: questionnaire.chapterRestriction ? 'יש' : 'אין' },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl bg-surface-2 px-3.5 py-2.5">
            <div className="text-xs font-semibold text-muted">{item.label}</div>
            <div className="flex items-center gap-1 text-base font-bold tabular-nums">
              {item.icon}
              {item.value}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-5 flex flex-col gap-2">
        {questionnaire.warnings.map((warning) => (
          <Notice key={warning} tone="orange" icon={<AlertTriangle size={18} />}>
            {warning}
          </Notice>
        ))}
        {questionnaire.partNotes['כללי'] && (
          <Notice tone="neutral" icon={<Info size={18} />}>
            {questionnaire.partNotes['כללי']}
          </Notice>
        )}
        <Notice tone="primary">
          <b>סדר למידה מומלץ:</b> קודם השאלות הצהובות ({yellow.join(', ')}), ובסוף הכחולות ({blue.join(', ')}).
        </Notice>
      </div>

      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <Tabs label="פרק" value={activePart} onChange={setActivePart} options={[{ value: 'all', label: 'הכול' }, ...parts.map((part) => ({ value: part, label: `פרק ${part}` }))]} className="min-w-0 flex-1" />
        <label className="flex items-center gap-3 text-base">
          <span>{isFocus ? 'מיקוד 2026' : 'הסילבוס המלא'}</span>
          <Switch checked={isFocus} onChange={(next) => actions.setFocusMode(next ? 'focus-2026' : 'full')} label="מצב מיקוד" />
        </label>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-1.5">
        <Badge tone="green">בבגרות</Badge>
        <Badge tone="red">לא בבגרות</Badge>
        <Badge tone="orange">הורדה 2026</Badge>
        <Badge tone="green">✓ נשאר במפורש</Badge>
        <Badge tone="yellow">ללמוד קודם</Badge>
        <Badge tone="blue">ללמוד בסוף</Badge>
      </div>

      <div className="flex flex-col gap-4">
        {slots.map((slot) => {
          const first = !seenParts.has(slot.part);
          seenParts.add(slot.part);
          return <SlotCard key={slot.number} questionnaire={questionnaire} slot={slot} showPartNote={first} />;
        })}
      </div>

      {background.length > 0 && (
        <Card className="mt-6">
          <h2 className="text-xl font-bold">נושאי בסיס וטכניקה</h2>
          <p className="mb-2 text-sm text-muted">לא שאלה בפני עצמה, אבל נדרשים בכל השאלות.</p>
          {background.map((topic) => (
            <SyllabusTopic key={topic.id} questionnaire={questionnaire} topic={topic} defaultOpen={false} />
          ))}
        </Card>
      )}
    </>
  );
}
