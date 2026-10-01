import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Badge, PageHeader, ProgressRing, Switch } from '../components/ui';
import { formatDuration, formatPoints } from '../lib/format';
import { progressOf } from '../lib/progress';
import { questionnaireList } from '../lib/questionnaires';
import { useStore } from '../state/store';

export function SyllabusHub() {
  const { state, actions } = useStore();
  const isFocus = state.focusMode === 'focus-2026';
  return (
    <>
      <PageHeader
        title="מפת הסילבוס"
        description="שני השאלונים, לפי מבנה הבחינה, המיקוד לקיץ 2026 וסדר הלמידה המומלץ: צהוב קודם, כחול בסוף."
        actions={
          <label className="flex items-center gap-2 text-sm">
            <span>{isFocus ? 'מיקוד 2026' : 'הסילבוס המלא'}</span>
            <Switch checked={isFocus} onChange={(next) => actions.setFocusMode(next ? 'focus-2026' : 'full')} label="מצב מיקוד" />
          </label>
        }
      />
      <div className="grid gap-4 md:grid-cols-2">
        {questionnaireList.map((questionnaire) => {
          const progress = progressOf(questionnaire, state.ratings);
          return (
            <Link key={questionnaire.code} to={`/syllabus/${questionnaire.code}`} className="card flex flex-col gap-3 p-5 transition hover:border-primary">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Badge tone={questionnaire.code === '35581' ? 'primary' : 'green'}>שאלון {questionnaire.nickname}</Badge>
                  <h2 className="mt-2 text-xl font-extrabold">שאלון {questionnaire.code}</h2>
                </div>
                <ProgressRing percent={progress.percent} size={60} />
              </div>
              <ul className="grid grid-cols-2 gap-x-3 gap-y-1 text-sm text-muted">
                <li>{formatDuration(questionnaire.durationMinutes)}</li>
                <li>
                  עונים על {questionnaire.questionsToAnswer} מתוך {questionnaire.totalQuestions}
                </li>
                <li>{formatPoints(questionnaire.pointsPerQuestion)} נק׳ לשאלה</li>
                <li>{questionnaire.weightPercent}% מהציון הסופי</li>
              </ul>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">
                  {progress.counts.mastered} שולט · {progress.counts.medium} בינוני · {progress.counts.weak} חלש · {progress.counts['not-started']} לא התחלתי
                </span>
                <ChevronLeft size={18} className="text-muted" />
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
