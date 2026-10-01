import { lazy, Suspense } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AlertTriangle, BookOpen, ChevronDown, ClipboardCheck, FunctionSquare, Lightbulb, PencilLine, Sigma, Target } from 'lucide-react';
import { problemsFor } from '@/data/problems';
import { summaryFor } from '@/data/summaries';
import { Latex, Markdown } from '../components/Markdown';
import { ProblemCard } from '../components/ProblemCard';
import { PriorityBadge } from '../components/StatusBadge';
import { SyllabusTopic } from '../components/SyllabusTopic';
import { Badge, Card, EmptyState, Notice, PageHeader, ProgressRing, SectionTitle } from '../components/ui';
import { topicProgress } from '../lib/progress';
import { isQuestionnaireCode, questionnaireByCode, slotsForTopic, topicOf } from '../lib/questionnaires';
import { useStore } from '../state/store';
import { NotFound } from './NotFound';

const FunctionExplorer = lazy(() => import('../tools/FunctionExplorer').then((module) => ({ default: module.FunctionExplorer })));
const UnitCircle = lazy(() => import('../tools/UnitCircle').then((module) => ({ default: module.UnitCircle })));

const anchors = [
  { id: 'summary', label: 'תקציר' },
  { id: 'formulas', label: 'נוסחאות' },
  { id: 'examples', label: 'דוגמאות' },
  { id: 'tools', label: 'כלים' },
  { id: 'mastery', label: 'שליטה' },
  { id: 'practice', label: 'תרגול' },
];

export function TopicPage() {
  const { code, topicId } = useParams();
  const { state } = useStore();
  const questionnaire = questionnaireByCode(code);
  if (!questionnaire || !isQuestionnaireCode(code)) return <NotFound />;
  const topic = topicOf(questionnaire, topicId ?? '');
  if (!topic) return <NotFound />;

  const summary = summaryFor(code, topic.id);
  const slots = slotsForTopic(questionnaire, topic.id);
  const practice = problemsFor(code).filter((problem) => problem.topicId === topic.id);
  const progress = topicProgress(topic, state.ratings);
  const inScope = topic.subtopics.filter((subtopic) => subtopic.status === 'in');
  const tools = summary?.tools ?? [];
  const visibleAnchors = anchors.filter((anchor) => {
    if (anchor.id === 'summary' || anchor.id === 'formulas' || anchor.id === 'examples') return Boolean(summary);
    if (anchor.id === 'tools') return tools.length > 0;
    if (anchor.id === 'practice') return practice.length > 0;
    return true;
  });

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
            'נושא בסיס — נדרש בכל השאלות אך אינו שאלה בפני עצמה.'
          )
        }
        actions={inScope.length > 0 ? <ProgressRing percent={progress.percent} size={60} /> : undefined}
      />

      <nav className="no-print mb-4 flex flex-wrap gap-1.5" aria-label="ניווט בעמוד">
        {visibleAnchors.map((anchor) => (
          <a key={anchor.id} href={`#${anchor.id}`} className="badge bg-surface-2 text-muted hover:text-text">
            {anchor.label}
          </a>
        ))}
      </nav>

      {inScope.length === 0 && (
        <div className="mb-4">
          <Notice tone="red" icon={<AlertTriangle size={16} />}>
            כל תתי-הנושאים כאן הוצאו מהבחינה לפי המיקוד. אין צורך ללמוד אותם לקיץ 2026.
          </Notice>
        </div>
      )}

      {summary ? (
        <div className="flex flex-col gap-4">
          <Card>
            <div id="summary" className="scroll-mt-20" />
            <SectionTitle icon={<BookOpen size={16} />} title="תקציר הנושא" description="מה חייבים לדעת, בשפה של הבגרות" />
            <Markdown className="text-sm leading-relaxed">{summary.overview}</Markdown>
            <h3 className="mb-2 mt-4 text-sm font-bold">הגדרות ומשפטים</h3>
            <ul className="flex flex-col gap-1.5 ps-1 text-sm leading-relaxed">
              {summary.keyPoints.map((point, index) => (
                <li key={index} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  <Markdown inline className="min-w-0">
                    {point}
                  </Markdown>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <div id="formulas" className="scroll-mt-20" />
            <SectionTitle icon={<Sigma size={16} />} title="נוסחאות לזכור" description="נכללות בדף הנוסחאות האישי" actions={<Link to="/formulas" className="text-sm font-semibold text-primary">לדף הנוסחאות</Link>} />
            <ul className="grid gap-2 sm:grid-cols-2">
              {summary.formulas.map((formula) => (
                <li key={formula.name} className="rounded-xl bg-surface-2 px-3 py-2.5">
                  <div className="text-xs font-semibold text-muted">{formula.name}</div>
                  <div className="overflow-x-auto py-1 text-center">
                    <Latex latex={formula.latex} display />
                  </div>
                  {formula.note && (
                    <div className="text-xs text-muted">
                      <Markdown inline>{formula.note}</Markdown>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <SectionTitle icon={<Target size={16} />} title="איך זה נראה בבגרות" />
              <ul className="flex flex-col gap-1.5 text-sm leading-relaxed">
                {summary.bagrutPatterns.map((pattern, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue" aria-hidden="true" />
                    <Markdown inline className="min-w-0">
                      {pattern}
                    </Markdown>
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <SectionTitle icon={<AlertTriangle size={16} />} title="טעויות נפוצות" />
              <ul className="flex flex-col gap-1.5 text-sm leading-relaxed">
                {summary.commonMistakes.map((mistake, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red" aria-hidden="true" />
                    <Markdown inline className="min-w-0">
                      {mistake}
                    </Markdown>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <Card>
            <div id="examples" className="scroll-mt-20" />
            <SectionTitle icon={<Lightbulb size={16} />} title="דוגמאות פתורות" description="נסו לפתור לבד לפני שפותחים את הפתרון" />
            <div className="flex flex-col gap-2">
              {summary.workedExamples.map((example) => (
                <details key={example.title} className="rounded-xl border border-border bg-surface-2/50">
                  <summary className="flex items-center gap-2 px-3.5 py-3 font-semibold">
                    <ChevronDown size={16} className="shrink-0 text-muted" aria-hidden="true" />
                    <Markdown inline>{example.title}</Markdown>
                  </summary>
                  <div className="border-t border-border px-3.5 py-3 text-sm leading-relaxed">
                    <Markdown className="mb-3">{example.problem}</Markdown>
                    <ol className="flex list-decimal flex-col gap-1.5 ps-5">
                      {example.steps.map((step, index) => (
                        <li key={index}>
                          <Markdown inline>{step}</Markdown>
                        </li>
                      ))}
                    </ol>
                    <div className="mt-3 rounded-lg bg-green-soft px-3 py-2 text-green">
                      <b>תשובה: </b>
                      <Markdown inline>{example.answer}</Markdown>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </Card>
        </div>
      ) : (
        inScope.length > 0 && (
          <Card className="mb-4">
            <EmptyState icon={<BookOpen size={20} />} title="התקציר לנושא הזה עדיין בהכנה" description="בינתיים אפשר לסמן רמת שליטה בתתי-הנושאים ולתרגל מהמאגר." />
          </Card>
        )
      )}

      {tools.length > 0 && (
        <Card className="mt-4">
          <div id="tools" className="scroll-mt-20" />
          <SectionTitle icon={<FunctionSquare size={16} />} title="כלים אינטראקטיביים" description="לשחק עם הפונקציה עד שזה יושב" />
          <Suspense fallback={<div className="py-8 text-center text-sm text-muted">טוען כלים…</div>}>
            <div className="flex flex-col gap-4">
              {tools.includes('unit-circle') && <UnitCircle />}
              {tools.includes('function-explorer') && <FunctionExplorer />}
            </div>
          </Suspense>
        </Card>
      )}

      <Card className="mt-4">
        <div id="mastery" className="scroll-mt-20" />
        <SectionTitle icon={<ClipboardCheck size={16} />} title="רמת השליטה שלי" description="הסימון כאן מזין את ההתקדמות, את המתכנן ואת רשימת הנושאים החלשים" />
        <SyllabusTopic questionnaire={questionnaire} topic={topic} />
      </Card>

      <div className="mt-4">
        <div id="practice" className="scroll-mt-20" />
        <SectionTitle icon={<PencilLine size={16} />} title="תרגול" description={practice.length ? `${practice.length} תרגילים בסגנון בגרות לנושא הזה` : 'אין עדיין תרגילים במאגר לנושא הזה'} actions={<Link to={`/practice?code=${questionnaire.code}`} className="text-sm font-semibold text-primary">לכל התרגילים</Link>} />
        {practice.length > 0 && (
          <div className="grid gap-3 sm:grid-cols-2">
            {practice.map((problem) => (
              <ProblemCard key={problem.id} problem={problem} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
