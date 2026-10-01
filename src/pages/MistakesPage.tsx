import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Check, Pencil, Plus, Repeat, Trash2 } from 'lucide-react';
import { MistakeForm, mistakeTypeLabels } from '../components/MistakeForm';
import { Badge, Button, Card, EmptyState, PageHeader, SectionTitle, Segmented, Stat } from '../components/ui';
import { formatDateTime, formatShortDate, todayIso } from '../lib/dates';
import { questionnaireByCode } from '../lib/questionnaires';
import { dueReviews, reviewTitle, upcomingReviews } from '../lib/selectors';
import { useStore } from '../state/store';
import type { MistakeType } from '../state/types';

export function MistakesPage() {
  const { state, actions, notify } = useStore();
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | MistakeType>('all');
  const today = todayIso();
  const due = dueReviews(state, today);
  const upcoming = upcomingReviews(state, today);
  const mistakes = state.mistakes.filter((mistake) => filter === 'all' || mistake.type === filter);
  const byType = (Object.keys(mistakeTypeLabels) as MistakeType[]).map((type) => ({ type, count: state.mistakes.filter((mistake) => mistake.type === type).length }));

  return (
    <>
      <PageHeader title="יומן טעויות" description="כל טעות נכנסת לתור חזרות מרווחות: אחרי יום, 3 ימים, שבוע ושבועיים." actions={<Button variant="primary" icon={<Plus size={16} />} onClick={() => setAdding(true)}>טעות חדשה</Button>} />

      {adding && (
        <Card className="mb-4">
          <SectionTitle title="טעות חדשה" />
          <MistakeForm
            onSave={(draft) => {
              actions.addMistake(draft);
              setAdding(false);
              notify('נרשם ביומן ונכנס לתור החזרות');
            }}
            onCancel={() => setAdding(false)}
          />
        </Card>
      )}

      <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {byType.map(({ type, count }) => (
          <Stat key={type} label={mistakeTypeLabels[type]} value={count} />
        ))}
      </div>

      <Card className="mb-4">
        <SectionTitle icon={<Repeat size={16} />} title="תור חזרות" description={due.length ? `${due.length} לחזרה היום` : 'אין חזרות להיום'} />
        {due.length === 0 && upcoming.length === 0 ? (
          <p className="text-sm text-muted">תרגילים שסימנתם ״טעיתי״ וטעויות ביומן יופיעו כאן.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {[...due, ...upcoming.slice(0, 5)].map((review) => {
              const isDue = due.includes(review);
              return (
                <li key={review.id} className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm ${isDue ? 'bg-orange-soft' : 'bg-surface-2'}`}>
                  <span className="min-w-0 flex-1">
                    {review.sourceType === 'problem' ? (
                      <Link to={`/practice/${review.sourceId}`} className="font-semibold hover:text-primary">
                        {reviewTitle(review, state)}
                      </Link>
                    ) : (
                      <span className="font-semibold">{reviewTitle(review, state)}</span>
                    )}
                    <span className="block text-xs text-muted">
                      שלב {review.stage + 1} מתוך 4 · {isDue ? 'היום' : formatShortDate(review.dueAt)}
                    </span>
                  </span>
                  {isDue && (
                    <Button size="sm" icon={<Check size={14} />} onClick={() => actions.completeReview(review.id)}>
                      חזרתי
                    </Button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </Card>

      <div className="mb-3">
        <Segmented label="סינון לפי סוג" value={filter} onChange={setFilter} options={[{ value: 'all', label: 'הכול' }, ...(Object.keys(mistakeTypeLabels) as MistakeType[]).map((value) => ({ value, label: mistakeTypeLabels[value] }))]} />
      </div>

      {mistakes.length === 0 ? (
        <EmptyState icon={<AlertTriangle size={20} />} title="היומן ריק" description="טעות שנרשמת היא טעות שלא תחזור. הוסיפו טעויות מהתרגול, מהסימולטור או מבחינות עבר." />
      ) : (
        <ul className="flex flex-col gap-3">
          {mistakes.map((mistake) => {
            const questionnaire = questionnaireByCode(mistake.questionnaire);
            const topic = questionnaire?.topics.find((entry) => entry.id === mistake.topicId);
            return (
              <Card key={mistake.id} as="li">
                {editing === mistake.id ? (
                  <MistakeForm
                    initial={mistake}
                    submitLabel="עדכון"
                    onSave={(draft) => {
                      actions.updateMistake(mistake.id, draft);
                      setEditing(null);
                    }}
                    onCancel={() => setEditing(null)}
                  />
                ) : (
                  <>
                    <div className="mb-2 flex flex-wrap items-center gap-1.5">
                      <Badge tone="red">{mistakeTypeLabels[mistake.type]}</Badge>
                      <Badge tone="primary">שאלון {questionnaire?.nickname}</Badge>
                      {topic && <Badge>{topic.title}</Badge>}
                      <span className="ms-auto text-xs text-muted">{formatDateTime(mistake.createdAt)}</span>
                    </div>
                    <p className="text-sm">
                      <b>מה השתבש: </b>
                      {mistake.description}
                    </p>
                    {mistake.correctApproach && (
                      <p className="mt-1 text-sm text-green">
                        <b>הדרך הנכונה: </b>
                        <span className="text-text">{mistake.correctApproach}</span>
                      </p>
                    )}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {mistake.problemId && (
                        <Button size="sm" to={`/practice/${mistake.problemId}`}>
                          לתרגיל
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" icon={<Pencil size={14} />} onClick={() => setEditing(mistake.id)}>
                        עריכה
                      </Button>
                      <Button size="sm" variant="ghost" icon={<Trash2 size={14} />} onClick={() => actions.deleteMistake(mistake.id)}>
                        מחיקה
                      </Button>
                    </div>
                  </>
                )}
              </Card>
            );
          })}
        </ul>
      )}
    </>
  );
}
