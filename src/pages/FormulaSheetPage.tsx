import { Link } from 'react-router-dom';
import { Printer, Sigma } from 'lucide-react';
import { summaries } from '@/data/summaries';
import type { QuestionnaireCode } from '@/data/problems/types';
import { Latex, Markdown } from '../components/Markdown';
import { Button, Card, EmptyState, Notice, PageHeader, Segmented } from '../components/ui';
import { questionnaireByCode, questionnaireList } from '../lib/questionnaires';
import { useState } from 'react';

export function FormulaSheetPage() {
  const [code, setCode] = useState<QuestionnaireCode>('35581');
  const questionnaire = questionnaireByCode(code)!;
  const topics = questionnaire.topics
    .map((topic) => ({ topic, summary: summaries.find((entry) => entry.questionnaire === code && entry.topicId === topic.id) }))
    .filter((entry) => entry.summary && entry.summary.formulas.length > 0);

  return (
    <>
      <PageHeader title="דף נוסחאות אישי" description="נאסף מתקצירי הנושאים. מתאים להדפסה." actions={<Button icon={<Printer size={16} />} onClick={() => window.print()}>הדפסה</Button>} />
      <div className="mb-4 flex flex-col gap-3">
        <Notice tone="orange">
          <b>סיכום אישי – לא דף הנוסחאות הרשמי.</b> בבחינה מקבלים דף נוסחאות רשמי מטעם משרד החינוך.
        </Notice>
        <div className="no-print">
          <Segmented label="שאלון" value={code} onChange={setCode} options={questionnaireList.map((entry) => ({ value: entry.code as QuestionnaireCode, label: `שאלון ${entry.nickname}` }))} />
        </div>
      </div>
      <h2 className="print-only mb-3 text-xl font-bold">דף נוסחאות אישי · שאלון {questionnaire.nickname} ({questionnaire.code}) · סיכום אישי – לא דף הנוסחאות הרשמי</h2>
      {topics.length === 0 ? (
        <EmptyState icon={<Sigma size={20} />} title="אין נוסחאות עדיין" />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 print:grid-cols-2">
          {topics.map(({ topic, summary }) => (
            <Card key={topic.id} className="break-inside-avoid">
              <h3 className="mb-2 font-bold">
                <Link to={`/topic/${code}/${topic.id}`} className="hover:text-primary">
                  {topic.title}
                </Link>
              </h3>
              <ul className="flex flex-col gap-2">
                {summary!.formulas.map((formula) => (
                  <li key={formula.name} className="border-t border-border pt-2">
                    <div className="text-xs font-semibold text-muted">{formula.name}</div>
                    <div className="overflow-x-auto py-0.5 text-center">
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
          ))}
        </div>
      )}
    </>
  );
}
