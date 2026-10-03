import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Check, Pencil, Plus, Repeat, Trash2 } from 'lucide-react';
import { MistakeForm, mistakeTypeLabels } from '../components/MistakeForm';
import { Badge, Button, Card, Collapse, EmptyState, PageHeader, SectionTitle, Segmented, Stat } from '../components/ui';
import { formatDateTime, formatShortDate, todayIso } from '../lib/dates';
import { questionnaireByCode } from '../lib/questionnaires';
import { dueReviews, reviewLink, reviewTitle, upcomingReviews } from '../lib/selectors';
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
      <PageHeader
        title="יומן טעויות"
        description="כל טעות נכנסת לתור חזרות מרווחות: אחרי יום, 3 ימים, שבוע ושבועיים."
        actions={
          <Button variant="primary" size="lg" icon={<Plus size={18} />} onClick={() => setAdding(true)}>
            טעות חדשה
          </Button>
        }
      />

      <Collapse open={adding}>
        <Card className="mb-5">
          <SectionTitle title="טעות חדשה" />
          {adding && (
            <MistakeForm
              onSave={(draft) => {
                actions.addMistake(draft);
                setAdding(false);
                notify('נרשם ביומן ונכנס לתור החזרות');
              }}
              onCancel={() => setAdding(false)}
            />
          )}
        </Card>
      </Collapse>

      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {byType.map(({ type, count }) => (
          <Stat key={type} label={mistakeTypeLabels[type]} value={count} tone={count ? 'red' : 'neutral'} />
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_1.4fr]">
        <Card>
          <SectionTitle icon={<Repeat size={18} />} title="תור חזרות" description={due.length ? `${due.length} לחזרה היום` : 'אין חזרות להיום'} />
          {due.length === 0 && upcoming.length === 0 ? (
            <p className="text-base text-muted">תרגילים שסימנתם ״טעיתי״ וטעויות ביומן יופיעו כאן.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {[...due, ...upcoming.slice(0, 6)].map((review) => {
                const isDue = due.includes(review);
                return (
                  <li key={review.id} className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm ${isDue ? 'bg-orange-soft' : 'bg-surface-2'}`}>
                    <span className="min-w-0 flex-1">
                      {review.sourceType === 'problem' ? (
                        <Link to={reviewLink(review)} className="block truncate text-base font-semibold hover:text-primary">
                          {reviewTitle(review, state)}
                        </Link>
                      ) : (
                        <span className="block truncate text-base font-semibold">{reviewTitle(review, state)}</span>
                      )}
                      <span className="block text-muted">
                        שלב {review.stage + 1} מתוך 4 · {isDue ? 'היום' : formatShortDate(review.dueAt)}
                      </span>
                    </span>
                    {isDue && (
                      <Button size="sm" icon={<Check size={15} />} onClick={() => actions.completeReview(review.id)}>
                        חזרתי
                      </Button>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        <div className="min-w-0">
          <div className="mb-3">
            <Segmented label="סינון לפי סוג" value={filter} onChange={setFilter} options={[{ value: 'all', label: 'הכול' }, ...(Object.keys(mistakeTypeLabels) as MistakeType[]).map((value) => ({ value, label: mistakeTypeLabels[value] }))]} />
          </div>
          {mistakes.length === 0 ? (
            <Card>
              <EmptyState icon={<AlertTriangle size={22} />} title="היומן ריק" description="טעות שנרשמת היא טעות שלא תחזור. הוסיפו טעויות מהתרגול, מהסימולטור או מבחינות עבר." />
            </Card>
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
                        <div className="mb-3 flex flex-wrap items-center gap-1.5">
                          <Badge tone="red">{mistakeTypeLabels[mistake.type]}</Badge>
                          <Badge tone="primary">שאלון {questionnaire?.nickname}</Badge>
                          {topic && <Badge>{topic.title}</Badge>}
                          <span className="ms-auto text-sm text-muted">{formatDateTime(mistake.createdAt)}</span>
                        </div>
                        <p className="text-base">
                          <b>מה השתבש: </b>
                          {mistake.description}
                        </p>
                        {mistake.correctApproach && (
                          <p className="mt-2 rounded-xl bg-green-soft px-3.5 py-2 text-base">
                            <b className="text-green">הדרך הנכונה: </b>
                            {mistake.correctApproach}
                          </p>
                        )}
                        <div className="mt-4 flex flex-wrap gap-2">
                          {mistake.problemId && (
                            <Button size="sm" variant="soft" to={`/practice/${mistake.problemId}`}>
                              לתרגיל
                            </Button>
                          )}
                          <Button size="sm" variant="ghost" icon={<Pencil size={15} />} onClick={() => setEditing(mistake.id)}>
                            עריכה
                          </Button>
                          <Button size="sm" variant="ghost" icon={<Trash2 size={15} />} onClick={() => actions.deleteMistake(mistake.id)}>
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
        </div>
      </div>
    </>
  );
}
