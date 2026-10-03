import { useMemo, useState } from 'react';
import { RefreshCw, Shuffle } from 'lucide-react';
import { createRng, generatorsForLesson, randomSeed } from '@/data/generators';
import type { QuestionnaireCode } from '@/data/problems/types';
import { useStore } from '../state/store';
import type { SectionResult } from '../state/types';
import { DifficultyBadge } from './ProblemCard';
import { ExerciseCard } from './ExerciseCard';
import { Button, Segmented } from './ui';

/** "תרגול אינסופי": a fresh exercise with new numbers every time, checked automatically. */
export function GeneratorPractice({ lessonId, questionnaire, topicId }: { lessonId: string; questionnaire: QuestionnaireCode; topicId: string }) {
  const { actions } = useStore();
  const list = useMemo(() => generatorsForLesson(lessonId), [lessonId]);
  const [generatorId, setGeneratorId] = useState(list[0]?.id ?? '');
  const [seed, setSeed] = useState(randomSeed);
  const [result, setResult] = useState<SectionResult | undefined>();
  const [solvedHere, setSolvedHere] = useState(0);
  const generator = list.find((entry) => entry.id === generatorId) ?? list[0];
  const exercise = useMemo(() => (generator ? generator.generate(createRng(seed)) : null), [generator, seed]);
  if (!generator || !exercise) return null;

  const next = () => {
    setSeed(randomSeed());
    setResult(undefined);
  };

  return (
    <div className="flex flex-col gap-3">
      {list.length > 1 && (
        <Segmented
          label="סוג תרגיל"
          value={generator.id}
          onChange={(value) => {
            setGeneratorId(value);
            next();
          }}
          options={list.map((entry) => ({ value: entry.id, label: entry.title }))}
          className="max-w-full overflow-x-auto"
        />
      )}
      <ExerciseCard
        id={`${generator.id}-${seed}`}
        heading={
          <span className="inline-flex items-center gap-2">
            <Shuffle size={18} className="text-primary" aria-hidden="true" />
            {generator.title}
          </span>
        }
        badges={
          <>
            <DifficultyBadge difficulty={generator.difficulty} />
            {solvedHere > 0 && <span className="text-sm text-muted">פתרתם {solvedHere} נכון ברצף הזה</span>}
          </>
        }
        statement={exercise.statement}
        figureSvg={exercise.figureSvg}
        hints={exercise.hints}
        solutionSteps={exercise.solutionSteps}
        finalAnswer={exercise.finalAnswer}
        answers={exercise.answers}
        questionnaire={questionnaire}
        topicId={topicId}
        result={result}
        allowMistakeLog={false}
        onResult={(value) => {
          setResult(value);
          setSolvedHere((count) => (value === 'correct' ? count + 1 : 0));
          actions.recordSectionResult(generator.id, generator.id, value, questionnaire, { review: false });
        }}
        actions={
          <Button variant={result === 'correct' ? 'primary' : 'ghost'} icon={<RefreshCw size={16} />} onClick={next}>
            תרגיל חדש
          </Button>
        }
      />
    </div>
  );
}
