import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { RatingDot } from '../components/RatingControl';
import { Badge, PageHeader, ProgressRing, Switch } from '../components/ui';
import { formatDuration, formatPoints } from '../lib/format';
import { progressOf, ratingLabels, ratingOrder } from '../lib/progress';
import { questionnaireList } from '../lib/questionnaires';
import { useStore } from '../state/store';

export function SyllabusHub() {
  const { state, actions } = useStore();
  const isFocus = state.focusMode === 'focus-2026';
  return (
    <>
      <PageHeader
        title="מפת הסילבוס"
        description="שני השאלונים לפי מבנה הבחינה והמיקוד לקיץ 2026. סדר הלמידה המומלץ: צהוב קודם, כחול בסוף."
        actions={
          <label className="flex items-center gap-3 text-base">
            <span>{isFocus ? 'מיקוד 2026' : 'הסילבוס המלא'}</span>
            <Switch checked={isFocus} onChange={(next) => actions.setFocusMode(next ? 'focus-2026' : 'full')} label="מצב מיקוד" />
          </label>
        }
      />
      <div className="grid gap-5 md:grid-cols-2">
        {questionnaireList.map((questionnaire) => {
          const progress = progressOf(questionnaire, state.ratings);
          return (
            <Link key={questionnaire.code} to={`/syllabus/${questionnaire.code}`} className="card card-hover flex flex-col gap-5 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Badge tone={questionnaire.code === '35581' ? 'primary' : 'green'}>שאלון {questionnaire.nickname}</Badge>
                  <h2 className="mt-2 text-2xl font-bold">שאלון {questionnaire.code}</h2>
                  <p className="mt-1 text-sm text-muted">
                    {formatDuration(questionnaire.durationMinutes)} · {questionnaire.questionsToAnswer} מתוך {questionnaire.totalQuestions} · {formatPoints(questionnaire.pointsPerQuestion)} נק׳ לשאלה · {questionnaire.weightPercent}% מהציון
                  </p>
                </div>
                <ProgressRing percent={progress.percent} size={96} stroke={10} label={`התקדמות: ${progress.percent}%`} />
              </div>
              <ul className="grid grid-cols-2 gap-2 text-sm">
                {ratingOrder.map((rating) => (
                  <li key={rating} className="flex items-center gap-2 rounded-xl bg-surface-2 px-3 py-2">
                    <RatingDot rating={rating} />
                    <span className="text-muted">{ratingLabels[rating]}</span>
                    <b className="ms-auto tabular-nums">{progress.counts[rating]}</b>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between text-sm font-semibold text-primary">
                <span>
                  {progress.total} תתי-נושאים בבגרות
                </span>
                <span className="inline-flex items-center gap-1">
                  למפה <ChevronLeft size={18} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
