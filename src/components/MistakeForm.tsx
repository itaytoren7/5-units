import { useState } from 'react';
import { Save, X } from 'lucide-react';
import type { QuestionnaireCode } from '@/data/problems/types';
import { questionnaireByCode, questionnaireList } from '../lib/questionnaires';
import type { MistakeEntry, MistakeType } from '../state/types';
import { Button, Field, Segmented } from './ui';

export const mistakeTypeLabels: Record<MistakeType, string> = {
  calculation: 'חישוב',
  understanding: 'הבנה',
  reading: 'קריאת שאלה',
  time: 'ניהול זמן',
};

export type MistakeDraft = Omit<MistakeEntry, 'id' | 'createdAt'>;

interface MistakeFormProps {
  initial?: Partial<MistakeDraft>;
  lockQuestionnaire?: boolean;
  onSave: (draft: MistakeDraft) => void;
  onCancel?: () => void;
  submitLabel?: string;
}

export function MistakeForm({ initial, lockQuestionnaire = false, onSave, onCancel, submitLabel = 'שמירה ביומן' }: MistakeFormProps) {
  const [questionnaire, setQuestionnaire] = useState<QuestionnaireCode>(initial?.questionnaire ?? '35581');
  const [topicId, setTopicId] = useState(initial?.topicId ?? questionnaireByCode(initial?.questionnaire ?? '35581')?.topics[0]?.id ?? '');
  const [type, setType] = useState<MistakeType>(initial?.type ?? 'understanding');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [correctApproach, setCorrectApproach] = useState(initial?.correctApproach ?? '');
  const topics = questionnaireByCode(questionnaire)?.topics ?? [];

  const submit = () => {
    if (!description.trim()) return;
    onSave({ questionnaire, topicId, type, description: description.trim(), correctApproach: correctApproach.trim(), problemId: initial?.problemId, sectionId: initial?.sectionId });
  };

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {!lockQuestionnaire && (
          <Field label="שאלון">
            <select
              value={questionnaire}
              onChange={(event) => {
                const next = event.target.value as QuestionnaireCode;
                setQuestionnaire(next);
                setTopicId(questionnaireByCode(next)?.topics[0]?.id ?? '');
              }}
            >
              {questionnaireList.map((entry) => (
                <option key={entry.code} value={entry.code}>
                  שאלון {entry.nickname} ({entry.code})
                </option>
              ))}
            </select>
          </Field>
        )}
        <Field label="נושא">
          <select value={topicId} onChange={(event) => setTopicId(event.target.value)}>
            {topics.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.title}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="סוג הטעות">
        <Segmented label="סוג הטעות" value={type} onChange={setType} options={(Object.keys(mistakeTypeLabels) as MistakeType[]).map((value) => ({ value, label: mistakeTypeLabels[value] }))} />
      </Field>
      <Field label="מה השתבש?">
        <textarea rows={2} value={description} onChange={(event) => setDescription(event.target.value)} placeholder="למשל: שכחתי לבדוק את תחום ההגדרה לפני שפתרתי f'(x)=0" required />
      </Field>
      <Field label="הדרך הנכונה">
        <textarea rows={2} value={correctApproach} onChange={(event) => setCorrectApproach(event.target.value)} placeholder="מה צריך לעשות בפעם הבאה" />
      </Field>
      <div className="flex flex-wrap gap-2">
        <Button type="submit" variant="primary" icon={<Save size={16} />} disabled={!description.trim()}>
          {submitLabel}
        </Button>
        {onCancel && (
          <Button type="button" variant="ghost" icon={<X size={16} />} onClick={onCancel}>
            ביטול
          </Button>
        )}
      </div>
    </form>
  );
}
