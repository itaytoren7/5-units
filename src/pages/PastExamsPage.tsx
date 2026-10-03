import { useState } from 'react';
import { CheckCircle2, ExternalLink, FileText, History, Plus, Trash2 } from 'lucide-react';
import type { QuestionnaireCode } from '@/data/problems/types';
import { isNewFormat, OFFICIAL_SOLUTIONS_URL, officialExams, type OfficialExam } from '@/data/officialExams';
import { Badge, Button, Card, Collapse, EmptyState, Field, Notice, PageHeader, SectionTitle, Stat, Tabs } from '../components/ui';
import { todayIso } from '../lib/dates';
import { formatScore } from '../lib/format';
import { questionnaireByCode, questionnaireList } from '../lib/questionnaires';
import { useStore } from '../state/store';
import type { Moed } from '../state/types';

const OFFICIAL_SOLUTIONS = OFFICIAL_SOLUTIONS_URL;
const moedLabels: Record<Moed, string> = { winter: 'חורף', 'summer-a': 'קיץ א', 'summer-b': 'קיץ ב (מועד מיוחד)', other: 'אחר' };

function OfficialExamRow({ exam }: { exam: OfficialExam }) {
  const { state, actions, notify } = useStore();
  const record = state.officialExams[exam.id];
  const [editing, setEditing] = useState(false);
  const [score, setScore] = useState<string>(record?.score !== undefined ? String(record.score) : '');
  const done = record?.status === 'done';
  const save = () => {
    const value = score.trim() === '' ? undefined : Math.min(100, Math.max(0, Number(score)));
    actions.setOfficialExam(exam.id, { status: 'done', score: Number.isFinite(value) ? value : undefined, date: record?.date ?? todayIso(), notes: record?.notes });
    setEditing(false);
    notify(value !== undefined && value < 55 ? `נשמר. ${value} זה לא עובר. חזרו לשאלות שנפלתם בהן לפני הבחינה הבאה.` : 'נשמר');
  };
  return (
    <li className="flex flex-col gap-3 rounded-2xl bg-surface-2 px-4 py-3">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
          <b className="text-base">{exam.moed}</b>
          {isNewFormat(exam) && (
            <Badge tone="primary" size="sm">
              מבנה 2026
            </Badge>
          )}
        </div>
        {done ? (
          <Badge tone={record?.score === undefined ? 'green' : record.score >= 85 ? 'green' : record.score >= 55 ? 'orange' : 'red'} icon={<CheckCircle2 size={14} />}>
            {record?.score === undefined ? 'פתרתי' : `פתרתי · ${record.score}`}
          </Badge>
        ) : (
          <Badge>לא נפתר</Badge>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" href={exam.url} icon={<FileText size={15} />}>
          הבחינה (PDF)
        </Button>
        <Button size="sm" variant={done ? 'ghost' : 'soft'} onClick={() => setEditing(!editing)}>
          {done ? 'עריכה' : 'סימון כפתורה'}
        </Button>
      </div>
      {editing && (
        <form
          className="flex flex-wrap items-end gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            save();
          }}
        >
          <Field label="ציון (0–100, לא חובה)">
            <input type="number" min={0} max={100} inputMode="numeric" value={score} onChange={(event) => setScore(event.target.value)} className="w-32" />
          </Field>
          <Button type="submit" variant="primary">
            שמירה
          </Button>
          {done && (
            <Button
              variant="ghost"
              onClick={() => {
                actions.setOfficialExam(exam.id, null);
                setEditing(false);
              }}
            >
              ביטול הסימון
            </Button>
          )}
        </form>
      )}
    </li>
  );
}

function OfficialExamsCatalog() {
  const { state } = useStore();
  const [code, setCode] = useState<QuestionnaireCode>('35581');
  const list = officialExams.filter((exam) => exam.questionnaire === code);
  const years = [...new Set(list.map((exam) => exam.year))];
  const solved = list.filter((exam) => state.officialExams[exam.id]?.status === 'done');
  const scored = solved.map((exam) => state.officialExams[exam.id]?.score).filter((value): value is number => value !== undefined);
  const average = scored.length ? Math.round(scored.reduce((sum, value) => sum + value, 0) / scored.length) : null;
  return (
    <Card className="mb-6">
      <SectionTitle
        icon={<FileText size={18} />}
        title="בחינות בגרות רשמיות"
        description="כל הבחינות של השאלון באתר משרד החינוך, מ-2016 עד היום. פתרו בתנאי בחינה, ואז סמנו ציון."
      />
      <Tabs label="שאלון" value={code} onChange={setCode} options={questionnaireList.map((entry) => ({ value: entry.code as QuestionnaireCode, label: `שאלון ${entry.nickname}`, count: officialExams.filter((exam) => exam.questionnaire === entry.code).length }))} className="mb-4" />
      <div className="mb-4 grid grid-cols-3 gap-3">
        <Stat label="בחינות במאגר" value={list.length} />
        <Stat label="פתרתי" value={solved.length} tone="primary" />
        <Stat label="ממוצע" value={average === null ? '—' : average} tone={average === null ? 'neutral' : average >= 85 ? 'green' : average >= 55 ? 'orange' : 'red'} />
      </div>
      <p className="mb-4 text-sm text-muted">
        בחינות לפני קיץ 2026 נכתבו במבנה הישן. למשל, בשאלון 806 היו 3.5 שעות, 20 נקודות לשאלה וחובה לענות על שאלה מכל פרק. חלק מהשאלות בהן עוסקות בנושאים שירדו במיקוד, ואותן אפשר לדלג.
      </p>
      <div className="flex flex-col gap-5">
        {years.map((year) => {
          const exams = list.filter((exam) => exam.year === year);
          return (
            <section key={year}>
              <h3 className="mb-2 text-base font-bold">
                {year} · {exams[0].hebrewYear}
              </h3>
              <ul className="flex flex-col gap-2">
                {exams.map((exam) => (
                  <OfficialExamRow key={exam.id} exam={exam} />
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </Card>
  );
}

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
  const averageFor = (code: string) => {
    const entries = state.pastExams.filter((entry) => entry.questionnaire === code && entry.maxScore > 0);
    if (!entries.length) return null;
    return Math.round((entries.reduce((sum, entry) => sum + entry.score / entry.maxScore, 0) / entries.length) * 100);
  };

  return (
    <>
      <PageHeader
        title="בחינות עבר"
        description="בחינות הבגרות הרשמיות, ומעקב אחרי שאלות שפתרתם. נשמרים רק קישורים, לא טקסט הבחינה."
        actions={
          <Button variant="primary" size="lg" icon={<Plus size={18} />} onClick={() => setAdding(true)}>
            הוספת שאלה
          </Button>
        }
      />
      <div className="mb-5">
        <Notice tone="primary" icon={<ExternalLink size={18} />}>
          בחינות ופתרונות רשמיים:{' '}
          <a href={OFFICIAL_SOLUTIONS} target="_blank" rel="noreferrer" className="font-bold underline">
            אתר משרד החינוך, פתרונות לבחינות הבגרות
          </a>
        </Notice>
      </div>

      <OfficialExamsCatalog />

      <SectionTitle icon={<History size={18} />} title="שאלות שרשמתי" description="ציון לכל שאלה בנפרד, כדי לראות באיזה נושא נופלים." />

      <Collapse open={adding}>
        <Card className="mb-5">
          <SectionTitle title="שאלה שפתרתי" />
          <form
            className="grid gap-4 sm:grid-cols-2"
            onSubmit={(event) => {
              event.preventDefault();
              save();
            }}
          >
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
              <Button type="submit" variant="primary" size="lg">
                שמירה
              </Button>
              <Button variant="ghost" size="lg" onClick={() => setAdding(false)}>
                ביטול
              </Button>
            </div>
          </form>
        </Card>
      </Collapse>

      {state.pastExams.length > 0 && (
        <div className="mb-5 grid grid-cols-3 gap-3">
          <Stat label="שאלות שנרשמו" value={state.pastExams.length} />
          {questionnaireList.map((entry) => {
            const average = averageFor(entry.code);
            return <Stat key={entry.code} label={`ממוצע ${entry.nickname}`} value={average === null ? '—' : `${average}%`} tone={average === null ? 'neutral' : average >= 85 ? 'green' : average >= 55 ? 'orange' : 'red'} />;
          })}
        </div>
      )}

      {sorted.length === 0 ? (
        <Card>
          <EmptyState icon={<History size={22} />} title="עוד לא נרשמו בחינות עבר" description="אחרי שפותרים שאלה מבגרות אמיתית, רשמו כאן את הציון כדי לעקוב אחרי ההתקדמות." />
        </Card>
      ) : (
        <ul className="flex flex-col gap-3">
          {sorted.map((entry) => {
            const percent = entry.maxScore ? (entry.score / entry.maxScore) * 100 : 0;
            return (
              <Card key={entry.id} as="li" className="flex flex-wrap items-center gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Badge tone="primary">שאלון {questionnaireByCode(entry.questionnaire)?.nickname}</Badge>
                    <b className="text-base">
                      {entry.year} · {moedLabels[entry.moed]} · שאלה {entry.questionNumber}
                    </b>
                  </div>
                  {entry.notes && <p className="mt-1 text-sm text-muted">{entry.notes}</p>}
                </div>
                <Badge tone={percent >= 85 ? 'green' : percent >= 55 ? 'orange' : 'red'} className="text-base">
                  {formatScore(entry.score)}/{formatScore(entry.maxScore)}
                </Badge>
                {entry.link && <Button size="sm" href={entry.link} icon={<ExternalLink size={15} />} aria-label="פתיחת קישור" />}
                <Button size="sm" variant="ghost" icon={<Trash2 size={15} />} aria-label="מחיקה" onClick={() => actions.deletePastExam(entry.id)} />
              </Card>
            );
          })}
        </ul>
      )}
    </>
  );
}
