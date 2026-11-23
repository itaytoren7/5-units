import { Link } from 'react-router-dom';
import { ChevronLeft, ListChecks } from 'lucide-react';
import { sets, setsCatalog } from '@/data/sets';
import { Badge, Card, Notice, PageHeader, ProgressBar, SectionTitle } from '../components/ui';
import { questionnaireByCode, questionnaireList, topicOf } from '../lib/questionnaires';
import { useSetsState } from '../sets/storage';

export function SetsHub() {
  const state = useSetsState();
  return (
    <>
      <PageHeader title="סטים לתרגול" description="12 תרגילים בכל סט, מהקל ועד רמת בגרות. בדיקה אחרי כל סעיף, רמזים בהדרגה, הסבר קצר עם אפשרות להרחיב, שרטוט לכל תרגיל והקראה בעברית." />
      <div className="mb-5">
        <Notice tone="primary" icon={<ListChecks size={18} />}>
          תשובה שגויה נרשמת ביומן הטעויות ונכנסת לתור החזרות. בסוף הסט אפשר לתרגל שוב רק את מה שטעיתם בו.
        </Notice>
      </div>
      <div className="flex flex-col gap-8">
        {questionnaireList.map((questionnaire) => {
          const ofQuestionnaire = sets.filter((set) => set.questionnaire === questionnaire.code);
          const planned = setsCatalog.filter((entry) => entry.questionnaire === questionnaire.code && entry.status === 'planned');
          if (ofQuestionnaire.length === 0 && planned.length === 0) return null;
          const topicIds = [...new Set([...ofQuestionnaire.map((set) => set.topicIds[0]), ...planned.map((entry) => entry.topicId)])];
          return (
            <section key={questionnaire.code}>
              <SectionTitle title={`שאלון ${questionnaire.nickname}`} description={`שאלון ${questionnaire.displayCode}`} />
              <div className="flex flex-col gap-5">
                {topicIds.map((topicId) => {
                  const topic = topicOf(questionnaireByCode(questionnaire.code)!, topicId);
                  const topicSets = ofQuestionnaire.filter((set) => set.topicIds[0] === topicId);
                  const topicPlanned = planned.filter((entry) => entry.topicId === topicId);
                  return (
                    <div key={topicId}>
                      <h3 className="mb-2 text-base font-bold">{topic?.title ?? topicId}</h3>
                      <ul className="grid gap-3 sm:grid-cols-2">
                        {topicSets.map((set) => {
                          const total = set.exercises.reduce((sum, exercise) => sum + exercise.sections.length, 0);
                          const results = state.progress[set.id]?.results ?? {};
                          const correct = Object.values(results).filter((outcome) => outcome === 'correct').length;
                          const wrong = Object.values(results).filter((outcome) => outcome === 'wrong').length;
                          const percent = total ? Math.round((correct / total) * 100) : 0;
                          const completed = Boolean(state.progress[set.id]?.completedAt);
                          return (
                            <li key={set.id}>
                              <Link to={`/sets/${set.id}`} className="card card-hover flex flex-col gap-3 p-5">
                                <div className="flex items-start justify-between gap-3">
                                  <b className="text-lg leading-snug">{set.title}</b>
                                  <ChevronLeft size={18} className="shrink-0 text-primary" aria-hidden="true" />
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                  <Badge size="sm">{set.exercises.length} תרגילים</Badge>
                                  <Badge size="sm">{total} סעיפים</Badge>
                                  {completed && <Badge size="sm" tone="green">הושלם</Badge>}
                                  {wrong > 0 && (
                                    <Badge size="sm" tone="red">
                                      {wrong} טעויות
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-muted">
                                  <ProgressBar percent={percent} size="sm" className="flex-1" label={`${correct} מתוך ${total} סעיפים נכונים`} />
                                  <span className="tabular-nums">{percent}%</span>
                                </div>
                              </Link>
                            </li>
                          );
                        })}
                        {topicPlanned.map((entry) => (
                          <li key={entry.id}>
                            <Card className="flex h-full flex-col gap-2 bg-surface-2 shadow-none">
                              <div className="flex items-start justify-between gap-3">
                                <b className="text-base leading-snug text-muted">{entry.title}</b>
                                <Badge size="sm">בקרוב</Badge>
                              </div>
                              <p className="text-sm text-muted">{entry.summary}</p>
                            </Card>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
