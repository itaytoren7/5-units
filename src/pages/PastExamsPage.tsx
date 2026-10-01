import { useState } from 'react';
import { ExternalLink, History, Plus, Trash2 } from 'lucide-react';
import type { QuestionnaireCode } from '@/data/problems/types';
import { Badge, Button, Card, EmptyState, Field, Notice, PageHeader, SectionTitle } from '../components/ui';
import { formatScore } from '../lib/format';
import { questionnaireByCode, questionnaireList } from '../lib/questionnaires';
import { useStore } from '../state/store';
import type { Moed } from '../state/types';

const OFFICIAL_SOLUTIONS = 'https://students.education.gov.il/matriculation-exams/solutions';
const moedLabels: Record<Moed, string> = { winter: 'חורף', 'summer-a': 'קיץ א', 'summer-b': 'קיץ ב (מועד מיוחד)', other: 'אחר' };

export function PastExamsPage() {
  const { state, actions, notify } = useStore();
  const [adding, setAdding] = useState(false);
  const [questionnaire, setQuestionnaire] = useState<QuestionnaireCode>('35581');
  const [year, setYear] = useState(new Date().getFullYear() - 1);
  const [moed, setMoed] = useState<Moed>('summer-a');
  const [questionNumber, setQuestionNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(22);
  const [notes, setNotes] = useState('');
  const [link, setLink] = useState('');

  const save = () => {
    actions.addPastExam({ questionnaire, year, moed, questionNumber, score, maxScore, notes: notes.trim(), link: link.trim() });
    setAdding(false);
    setNotes('');
    setLink('');
    notify('נשמר');
  };

  const sorted = [...state.pastExams].sort((a, b) => b.year - a.year || a.questionNumber - b.questionNumber);

  return (
    <>
      <PageHeader title="בחינות עבר" description="מעקב אחרי שאלות מבגרויות אמיתיות שפתרתם. נשמרים רק קישורים — לא טקסט הבחינה." actions={<Button variant="primary" icon={<Plus size={16} />} onClick={() => setAdding(true)}>הוספה</Button>} />
      <div className="mb-4">
        <Notice tone="primary" icon={<ExternalLink size={16} />}>
          בחינות ופתרונות רשמיים:{' '}
          <a href={OFFICIAL_SOLUTIONS} target="_blank" rel="noreferrer" className="font-bold underline">
            אתר משרד החינוך — פתרונות לבחינות הבגרות
          </a>
        </Notice>
      </div>

      {adding && (
        <Card className="mb-4">
          <SectionTitle title="שאלה שפתרתי" />
          <form className="grid gap-3 sm:grid-cols-2" onSubmit={(event) => { event.preventDefault(); save(); }}>
            <Field label="שאלון">
              <select
                value={questionnaire}
                onChange={(event) => {
                  const next = event.target.value as QuestionnaireCode;
                  setQuestionnaire(next);
                  setMaxScore(Math.round(questionnaireByCode(next)!.pointsPerQuestion * 100) / 100);
                }}
              >
                {questionnaireList.map((entry) => (
                  <option key={entry.code} value={entry.code}>
                    שאלון {entry.nickname} ({entry.code})
                  </option>
                ))}
              </select>
            </Field>
            <Field label="שנה">
              <input type="number" min={2000} max={2100} value={year} onChange={(event) => setYear(Number(event.target.value))} />
            </Field>
            <Field label="מועד">
              <select value={moed} onChange={(event) => setMoed(event.target.value as Moed)}>
                {(Object.keys(moedLabels) as Moed[]).map((value) => (
                  <option key={value} value={value}>
                    {moedLabels[value]}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="מספר שאלה">
              <input type="number" min={1} max={10} value={questionNumber} onChange={(event) => setQuestionNumber(Number(event.target.value))} />
            </Field>
            <Field label="ניקוד שקיבלתי">
              <input type="number" min={0} step={0.5} value={score} onChange={(event) => setScore(Number(event.target.value))} />
            </Field>
            <Field label="מתוך">
              <input type="number" min={1} step={0.01} value={maxScore} onChange={(event) => setMaxScore(Number(event.target.value))} />
            </Field>
            <Field label="קישור (לבחינה או לפתרון)" className="sm:col-span-2">
              <input type="url" value={link} onChange={(event) => setLink(event.target.value)} placeholder="https://" />
            </Field>
            <Field label="הערות" className="sm:col-span-2">
              <textarea rows={2} value={notes} onChange={(event) => setNotes(event.target.value)} />
            </Field>
            <div className="flex gap-2 sm:col-span-2">
              <Button type="submit" variant="primary">שמירה</Button>
              <Button variant="ghost" onClick={() => setAdding(false)}>ביטול</Button>
            </div>
          </form>
        </Card>
      )}

      {sorted.length === 0 ? (
        <EmptyState icon={<History size={20} />} title="עוד לא נרשמו בחינות עבר" description="אחרי שפותרים שאלה מבגרות אמיתית, רשמו כאן את הציון כדי לעקוב אחרי ההתקדמות." />
      ) : (
        <ul className="flex flex-col gap-2">
          {sorted.map((entry) => {
            const percent = entry.maxScore ? (entry.score / entry.maxScore) * 100 : 0;
            return (
              <Card key={entry.id} as="li" className="flex flex-wrap items-center gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Badge tone="primary">שאלון {questionnaireByCode(entry.questionnaire)?.nickname}</Badge>
                    <b className="text-sm">
                      {entry.year} · {moedLabels[entry.moed]} · שאלה {entry.questionNumber}
                    </b>
                  </div>
                  {entry.notes && <p className="mt-1 text-sm text-muted">{entry.notes}</p>}
                </div>
                <Badge tone={percent >= 85 ? 'green' : percent >= 55 ? 'orange' : 'red'}>
                  {formatScore(entry.score)}/{formatScore(entry.maxScore)}
                </Badge>
                {entry.link && <Button size="sm" href={entry.link} icon={<ExternalLink size={14} />} aria-label="פתיחת קישור" />}
                <Button size="sm" variant="ghost" icon={<Trash2 size={14} />} aria-label="מחיקה" onClick={() => actions.deletePastExam(entry.id)} />
              </Card>
            );
          })}
        </ul>
      )}
    </>
  );
}
