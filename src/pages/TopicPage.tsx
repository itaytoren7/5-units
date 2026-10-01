import { lazy, Suspense, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AlertTriangle, BookOpen, ClipboardCheck, FunctionSquare, Lightbulb, PencilLine, Sigma, Target } from 'lucide-react';
import { problemsFor } from '@/data/problems';
import { summaryFor } from '@/data/summaries';
import { Latex, Markdown } from '../components/Markdown';
import { ProblemCard } from '../components/ProblemCard';
import { PriorityBadge } from '../components/StatusBadge';
import { SyllabusTopic } from '../components/SyllabusTopic';
import { Accordion, Badge, Button, Card, EmptyState, Notice, PageHeader, ProgressRing, SectionTitle } from '../components/ui';
import { useActiveSection } from '../components/useActiveSection';
import { topicProgress } from '../lib/progress';
import { isQuestionnaireCode, questionnaireByCode, slotsForTopic, topicOf } from '../lib/questionnaires';
import { useStore } from '../state/store';
import { NotFound } from './NotFound';

const FunctionExplorer = lazy(() => import('../tools/FunctionExplorer').then((module) => ({ default: module.FunctionExplorer })));
const UnitCircle = lazy(() => import('../tools/UnitCircle').then((module) => ({ default: module.UnitCircle })));

interface Anchor {
  id: string;
  label: string;
}

function Bullets({ items, color }: { items: string[]; color: string }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item, index) => (
        <li key={index} className="flex gap-3">
          <span className="mt-[0.6em] h-2 w-2 shrink-0 rounded-full" style={{ background: color }} aria-hidden="true" />
          <Markdown inline className="min-w-0 text-base leading-relaxed">
            {item}
          </Markdown>
        </li>
      ))}
    </ul>
  );
}

export function TopicPage() {
  const { code, topicId } = useParams();
  const { state } = useStore();
  const questionnaire = questionnaireByCode(code);
  const topic = questionnaire && topicId ? topicOf(questionnaire, topicId) : undefined;
  const summary = questionnaire && topic && isQuestionnaireCode(code) ? summaryFor(code, topic.id) : undefined;
  const practice = questionnaire && topic && isQuestionnaireCode(code) ? problemsFor(code).filter((problem) => problem.topicId === topic.id) : [];
  const tools = summary?.tools ?? [];

  const anchors = useMemo<Anchor[]>(() => {
    const list: Anchor[] = [];
    if (summary) {
      list.push({ id: 'summary', label: 'תקציר' }, { id: 'key-points', label: 'הגדרות ומשפטים' }, { id: 'formulas', label: 'נוסחאות' }, { id: 'patterns', label: 'דפוסי בגרות' }, { id: 'mistakes', label: 'טעויות נפוצות' }, { id: 'examples', label: 'דוגמאות פתורות' });
    }
    if (tools.length > 0) list.push({ id: 'tools', label: 'כלים' });
    list.push({ id: 'mastery', label: 'רמת שליטה' });
    if (practice.length > 0) list.push({ id: 'practice', label: 'תרגול' });
    return list;
  }, [summary, tools.length, practice.length]);
  const anchorIds = useMemo(() => anchors.map((anchor) => anchor.id), [anchors]);
  const active = useActiveSection(anchorIds);

  if (!questionnaire || !isQuestionnaireCode(code) || !topic) return <NotFound />;

  const slots = slotsForTopic(questionnaire, topic.id);
  const progress = topicProgress(topic, state.ratings);
  const inScope = topic.subtopics.filter((subtopic) => subtopic.status === 'in');

  const toc = (
    <nav className="toc" aria-label="תוכן העמוד">
      {anchors.map((anchor) => (
        <a key={anchor.id} href={`#${anchor.id}`} aria-current={active === anchor.id ? 'true' : undefined}>
          {anchor.label}
        </a>
      ))}
    </nav>
  );

  return (
    <>
      <PageHeader
        eyebrow={
          <Link to={`/syllabus/${questionnaire.code}`} className="hover:underline">
            שאלון {questionnaire.nickname} · מפת הסילבוס
          </Link>
        }
        title={topic.title}
        description={
          slots.length > 0 ? (
            <span className="flex flex-wrap items-center gap-1.5">
              מופיע בשאלות:
              {slots.map((slot) => (
                <span key={slot.number} className="inline-flex items-center gap-1">
                  <Badge tone="primary">שאלה {slot.number}</Badge>
                  <PriorityBadge priority={slot.priority} short />
                </span>
              ))}
            </span>
          ) : (
            'נושא בסיס. נדרש בכל השאלות, אבל אינו שאלה בפני עצמה.'
          )
        }
        actions={
          inScope.length > 0 ? (
            <div className="flex items-center gap-3">
              <ProgressRing percent={progress.percent} size={72} stroke={8} label={`רמת שליטה: ${progress.percent}%`} />
              <div className="text-sm">
                <b className="block">רמת שליטה</b>
                <span className="text-muted">
                  {progress.counts.mastered} שולט · {progress.counts.weak} חלש
                </span>
              </div>
            </div>
          ) : undefined
        }
      />

      <nav className="no-print mb-5 flex gap-2 overflow-x-auto pb-1 lg:hidden" aria-label="תוכן העמוד">
        {anchors.map((anchor) => (
          <a key={anchor.id} href={`#${anchor.id}`} className="badge shrink-0 bg-surface-2 text-muted hover:text-text">
            {anchor.label}
          </a>
        ))}
      </nav>

      {inScope.length === 0 && (
        <div className="mb-5">
          <Notice tone="red" icon={<AlertTriangle size={18} />}>
            כל תתי-הנושאים כאן הוצאו מהבחינה לפי המיקוד. אין צורך ללמוד אותם לקיץ 2026.
          </Notice>
        </div>
      )}

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-8">
        <div className="flex min-w-0 flex-col gap-5">
          {summary ? (
            <>
              <Card>
                <div id="summary" className="scroll-mt-24" />
                <SectionTitle icon={<BookOpen size={18} />} title="תקציר הנושא" description="מה חייבים לדעת, בשפה של הבגרות" />
                <Markdown className="prose text-base leading-relaxed">{summary.overview}</Markdown>
              </Card>

              <Card>
                <div id="key-points" className="scroll-mt-24" />
                <SectionTitle title="הגדרות ומשפטים" description="כפי שמצטטים אותם בפתרון" />
                <div className="prose">
                  <Bullets items={summary.keyPoints} color="var(--primary)" />
                </div>
              </Card>

              <Card>
                <div id="formulas" className="scroll-mt-24" />
                <SectionTitle icon={<Sigma size={18} />} title="נוסחאות לזכור" description="נכללות בדף הנוסחאות האישי" actions={<Button size="sm" variant="ghost" to="/formulas">לדף הנוסחאות</Button>} />
                <ul className="grid gap-3 sm:grid-cols-2">
                  {summary.formulas.map((formula) => (
                    <li key={formula.name} className="formula-box">
                      <span className="text-sm font-semibold text-muted">{formula.name}</span>
                      <div className="overflow-x-auto text-center">
                        <Latex latex={formula.latex} display />
                      </div>
                      {formula.note && (
                        <span className="text-sm text-muted">
                          <Markdown inline>{formula.note}</Markdown>
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </Card>

              <Card>
                <div id="patterns" className="scroll-mt-24" />
                <SectionTitle icon={<Target size={18} />} title="איך זה נראה בבגרות" description="ניסוחים טיפוסיים ומה הם באמת מבקשים" />
                <div className="prose">
                  <Bullets items={summary.bagrutPatterns} color="var(--blue)" />
                </div>
              </Card>

              <Card>
                <div id="mistakes" className="scroll-mt-24" />
                <SectionTitle icon={<AlertTriangle size={18} />} title="טעויות נפוצות" />
                <div className="prose">
                  <Bullets items={summary.commonMistakes} color="var(--red)" />
                </div>
              </Card>

              <Card>
                <div id="examples" className="scroll-mt-24" />
                <SectionTitle icon={<Lightbulb size={18} />} title="דוגמאות פתורות" description="נסו לפתור לבד לפני שפותחים את הפתרון" />
                <div className="flex flex-col gap-3">
                  {summary.workedExamples.map((example, exampleIndex) => (
                    <Accordion key={example.title} title={<Markdown inline>{example.title}</Markdown>} summary={`דוגמה ${exampleIndex + 1} מתוך ${summary.workedExamples.length}`}>
                      <div className="prose text-base leading-relaxed">
                        <Markdown className="mb-4">{example.problem}</Markdown>
                        <ol className="steps">
                          {example.steps.map((step, index) => (
                            <li key={index} className="step">
                              <span className="step-num" aria-hidden="true">
                                {index + 1}
                              </span>
                              <div className="step-body">
                                <Markdown inline>{step}</Markdown>
                              </div>
                            </li>
                          ))}
                        </ol>
                        <div className="answer-box mt-4">
                          <b className="text-green">תשובה: </b>
                          <Markdown inline>{example.answer}</Markdown>
                        </div>
                      </div>
                    </Accordion>
                  ))}
                </div>
              </Card>
            </>
          ) : (
            inScope.length > 0 && (
              <Card>
                <EmptyState icon={<BookOpen size={22} />} title="התקציר לנושא הזה עדיין בהכנה" description="בינתיים אפשר לסמן רמת שליטה בתתי-הנושאים ולתרגל מהמאגר." />
              </Card>
            )
          )}

          {tools.length > 0 && (
            <Card>
              <div id="tools" className="scroll-mt-24" />
              <SectionTitle icon={<FunctionSquare size={18} />} title="כלים אינטראקטיביים" description="לשחק עם הפונקציה עד שזה יושב" />
              <Suspense fallback={<div className="py-10 text-center text-base text-muted">טוען כלים…</div>}>
                <div className="flex flex-col gap-6">
                  {tools.includes('unit-circle') && <UnitCircle />}
                  {tools.includes('function-explorer') && <FunctionExplorer />}
                </div>
              </Suspense>
            </Card>
          )}

          <Card>
            <div id="mastery" className="scroll-mt-24" />
            <SectionTitle icon={<ClipboardCheck size={18} />} title="רמת השליטה שלי" description="הסימון מזין את ההתקדמות, את המתכנן ואת ״מה ללמוד עכשיו״" />
            <SyllabusTopic questionnaire={questionnaire} topic={topic} />
          </Card>

          <div>
            <div id="practice" className="scroll-mt-24" />
            <SectionTitle icon={<PencilLine size={18} />} title="תרגול" description={practice.length ? `${practice.length} תרגילים בסגנון בגרות לנושא הזה` : 'אין עדיין תרגילים במאגר לנושא הזה'} actions={<Button size="sm" variant="ghost" to={`/practice?code=${questionnaire.code}`}>לכל התרגילים</Button>} />
            {practice.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                {practice.map((problem) => (
                  <ProblemCard key={problem.id} problem={problem} />
                ))}
              </div>
            )}
          </div>
        </div>

        <aside className="no-print hidden lg:block">{toc}</aside>
      </div>
    </>
  );
}
