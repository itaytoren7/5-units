import { Link } from 'react-router-dom';
import { ChevronLeft, Timer, Trash2, TrendingUp } from 'lucide-react';
import { ScoreChart } from '../components/ScoreChart';
import { Badge, Button, Card, EmptyState, PageHeader, SectionTitle, Stat } from '../components/ui';
import { formatDateTime } from '../lib/dates';
import { formatDuration, formatPoints, formatScore } from '../lib/format';
import { questionnaireList } from '../lib/questionnaires';
import { useStore } from '../state/store';

export function SimulatorHub() {
  const { state, actions } = useStore();
  return (
    <>
      <PageHeader title="סימולטור בחינה" description="בחינת דמה בתנאים אמיתיים: כל השאלות מוצגות, בוחרים כמה לענות, שעון עם התראות ב-30 וב-10 דקות, ובסוף ציון לפי כללי הבחינה." />
      <div className="mb-6 grid gap-4 md:grid-cols-2">
        {questionnaireList.map((questionnaire) => {
          const exams = state.exams.filter((exam) => exam.questionnaire === questionnaire.code);
          const best = exams.reduce((max, exam) => Math.max(max, exam.score), 0);
          const active = state.activeExam?.questionnaire === questionnaire.code && state.activeExam.phase !== 'setup';
          return (
            <Link key={questionnaire.code} to={`/simulator/${questionnaire.code}`} className="card flex flex-col gap-3 p-5 transition hover:border-primary">
              <div className="flex items-center justify-between">
                <Badge tone={questionnaire.code === '35581' ? 'primary' : 'green'}>שאלון {questionnaire.nickname}</Badge>
                {active && <Badge tone="orange">סימולציה פעילה</Badge>}
              </div>
              <h2 className="text-xl font-extrabold">שאלון {questionnaire.code}</h2>
              <p className="text-sm text-muted">
                {formatDuration(questionnaire.durationMinutes)} · {questionnaire.questionsToAnswer} מתוך {questionnaire.totalQuestions} · {formatPoints(questionnaire.pointsPerQuestion)} נק׳ לשאלה
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">{exams.length ? `${exams.length} סימולציות · הכי גבוה: ${formatScore(best)}` : 'עוד לא נבחנת'}</span>
                <span className="inline-flex items-center gap-1 font-bold text-primary">
                  {active ? 'להמשיך' : 'להתחיל'} <ChevronLeft size={16} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <Card>
        <SectionTitle icon={<TrendingUp size={16} />} title="היסטוריית ציונים" />
        {state.exams.length === 0 ? (
          <EmptyState icon={<Timer size={20} />} title="עוד אין סימולציות" description="אחרי שתסיימו סימולציה ותדרגו את התשובות, הציון יופיע כאן." />
        ) : (
          <div className="flex flex-col gap-5">
            {questionnaireList.map((questionnaire) => {
              const exams = state.exams.filter((exam) => exam.questionnaire === questionnaire.code);
              if (!exams.length) return null;
              const average = exams.reduce((sum, exam) => sum + exam.score, 0) / exams.length;
              return (
                <div key={questionnaire.code}>
                  <h3 className="mb-2 font-bold">שאלון {questionnaire.nickname}</h3>
                  <div className="mb-3 grid grid-cols-3 gap-2">
                    <Stat label="סימולציות" value={exams.length} />
                    <Stat label="ממוצע" value={formatScore(Math.round(average * 10) / 10)} tone="primary" />
                    <Stat label="אחרון" value={formatScore(exams[0].score)} />
                  </div>
                  {exams.length > 1 && <ScoreChart exams={exams} />}
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {exams.map((exam) => (
                      <li key={exam.id} className="flex items-center gap-2 rounded-xl bg-surface-2 px-3 py-2 text-sm">
                        <span className="min-w-0 flex-1">
                          {formatDateTime(exam.finishedAt)} · שאלות {exam.chosenSlots.join(', ')}
                        </span>
                        <b className="text-primary">{formatScore(exam.score)}</b>
                        <Button size="sm" variant="ghost" icon={<Trash2 size={14} />} aria-label="מחיקת סימולציה" onClick={() => actions.deleteExam(exam.id)} />
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </>
  );
}
