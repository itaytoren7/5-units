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
      <div className="mb-6 grid gap-5 md:grid-cols-2">
        {questionnaireList.map((questionnaire) => {
          const exams = state.exams.filter((exam) => exam.questionnaire === questionnaire.code);
          const best = exams.reduce((max, exam) => Math.max(max, exam.score), 0);
          const active = state.activeExam?.questionnaire === questionnaire.code && state.activeExam.phase !== 'setup';
          return (
            <Link key={questionnaire.code} to={`/simulator/${questionnaire.code}`} className="card card-hover flex flex-col gap-4 p-5 sm:p-6">
              <div className="flex items-center justify-between gap-2">
                <Badge tone={questionnaire.code === '35581' ? 'primary' : 'green'}>שאלון {questionnaire.nickname}</Badge>
                {active && <Badge tone="orange">סימולציה פעילה</Badge>}
              </div>
              <div>
                <h2 className="text-2xl font-bold">שאלון {questionnaire.code}</h2>
                <p className="mt-1 text-sm text-muted">
                  {formatDuration(questionnaire.durationMinutes)} · {questionnaire.questionsToAnswer} מתוך {questionnaire.totalQuestions} · {formatPoints(questionnaire.pointsPerQuestion)} נק׳ לשאלה
                </p>
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-border pt-4 text-sm">
                <span className="text-muted">{exams.length ? `${exams.length} סימולציות · הכי גבוה ${formatScore(best)}` : 'עוד לא נבחנת'}</span>
                <span className="inline-flex items-center gap-1 font-bold text-primary">
                  {active ? 'להמשיך' : 'להתחיל'} <ChevronLeft size={18} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <Card>
        <SectionTitle icon={<TrendingUp size={18} />} title="היסטוריית ציונים" description="הציון של כל סימולציה שסיימת ודירגת" />
        {state.exams.length === 0 ? (
          <EmptyState icon={<Timer size={22} />} title="עוד אין סימולציות" description="אחרי שתסיימו סימולציה ותדרגו את התשובות, הציון יופיע כאן." />
        ) : (
          <div className="flex flex-col gap-8">
            {questionnaireList.map((questionnaire) => {
              const exams = state.exams.filter((exam) => exam.questionnaire === questionnaire.code);
              if (!exams.length) return null;
              const average = exams.reduce((sum, exam) => sum + exam.score, 0) / exams.length;
              const best = Math.max(...exams.map((exam) => exam.score));
              return (
                <div key={questionnaire.code}>
                  <h3 className="mb-3 text-lg font-bold">שאלון {questionnaire.nickname}</h3>
                  <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <Stat label="סימולציות" value={exams.length} />
                    <Stat label="ממוצע" value={formatScore(Math.round(average * 10) / 10)} tone="primary" />
                    <Stat label="הכי גבוה" value={formatScore(best)} tone="green" />
                    <Stat label="אחרון" value={formatScore(exams[0].score)} />
                  </div>
                  {exams.length > 1 && (
                    <div className="mb-4 rounded-2xl border border-border p-3 sm:p-4">
                      <ScoreChart exams={exams} />
                    </div>
                  )}
                  <ul className="flex flex-col gap-2">
                    {exams.map((exam) => (
                      <li key={exam.id} className="flex items-center gap-3 rounded-xl bg-surface-2 px-4 py-3 text-sm">
                        <span className="min-w-0 flex-1">
                          <span className="block font-semibold">{formatDateTime(exam.finishedAt)}</span>
                          <span className="text-muted">שאלות {exam.chosenSlots.join(', ')}{exam.notes ? ` · ${exam.notes}` : ''}</span>
                        </span>
                        <b className="text-xl tabular-nums text-primary">{formatScore(exam.score)}</b>
                        <Button size="sm" variant="ghost" icon={<Trash2 size={15} />} aria-label="מחיקת סימולציה" onClick={() => actions.deleteExam(exam.id)} />
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
