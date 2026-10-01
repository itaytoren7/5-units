import { useMemo, useState } from 'react';
import { Coordinates, Line, Mafs, Plot, Point, Theme } from 'mafs';
import 'mafs/core.css';
import { analyze, compileFunction } from './analysis';
import { Latex } from '../components/Markdown';

const presets = ['x^3-6x^2+9x+2', 'x^2/(x^2-4)', 'x*sqrt(4-x)', 'sin(x)+cos(2x)', '(x-1)*e^x', 'ln(x)/x'];

export function FunctionExplorer({ initial = 'x^3-6x^2+9x+2' }: { initial?: string }) {
  const [input, setInput] = useState(initial);
  const [showD1, setShowD1] = useState(false);
  const [showD2, setShowD2] = useState(false);
  const [showKey, setShowKey] = useState(true);
  const [range, setRange] = useState(6);

  const compiled = useMemo(() => {
    try {
      const fn = compileFunction(input);
      if (!Number.isFinite(fn.f(0.5)) && !Number.isFinite(fn.f(1.5)) && !Number.isFinite(fn.f(-1.5))) throw new Error('undefined');
      return { fn, error: null as string | null };
    } catch {
      return { fn: null, error: 'לא הצלחתי לקרוא את הביטוי. דוגמה תקינה: x^2*e^(-x)' };
    }
  }, [input]);

  const analysis = useMemo(() => (compiled.fn ? analyze(compiled.fn, -range, range) : null), [compiled.fn, range]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-semibold">f(x) =</span>
          <input type="text" dir="ltr" value={input} onChange={(event) => setInput(event.target.value)} className="font-mono" spellCheck={false} autoCapitalize="off" autoCorrect="off" />
        </label>
        <div className="flex flex-wrap gap-1.5" dir="ltr">
          {presets.map((preset) => (
            <button key={preset} type="button" className="badge bg-surface-2 font-mono text-muted hover:text-text" onClick={() => setInput(preset)}>
              {preset}
            </button>
          ))}
        </div>
        {compiled.error && <p className="text-sm text-red">{compiled.error}</p>}
      </div>
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <label className="flex items-center gap-1.5"><input type="checkbox" checked={showD1} onChange={(event) => setShowD1(event.target.checked)} /> <span style={{ color: Theme.orange }}>f′</span></label>
        <label className="flex items-center gap-1.5"><input type="checkbox" checked={showD2} onChange={(event) => setShowD2(event.target.checked)} /> <span style={{ color: Theme.green }}>f″</span></label>
        <label className="flex items-center gap-1.5"><input type="checkbox" checked={showKey} onChange={(event) => setShowKey(event.target.checked)} /> נקודות מיוחדות ואסימפטוטות</label>
        <label className="flex items-center gap-1.5">טווח ±{range}<input type="range" min={2} max={20} value={range} onChange={(event) => setRange(Number(event.target.value))} /></label>
      </div>
      <div className="mafs-wrap">
        {compiled.fn && (
          <Mafs height={340} viewBox={{ x: [-range, range], y: [-range, range] }} preserveAspectRatio={false} zoom={{ min: 0.2, max: 5 }}>
            <Coordinates.Cartesian subdivisions={false} />
            {showKey && analysis?.vertical.map((x) => <Line.ThroughPoints key={`v${x}`} point1={[x, 0]} point2={[x, 1]} style="dashed" color={Theme.red} opacity={0.6} />)}
            {showKey && analysis?.horizontal.map((y) => <Line.ThroughPoints key={`h${y}`} point1={[0, y]} point2={[1, y]} style="dashed" color={Theme.red} opacity={0.6} />)}
            {showD2 && <Plot.OfX y={compiled.fn.ddf} color={Theme.green} weight={2} opacity={0.8} />}
            {showD1 && <Plot.OfX y={compiled.fn.df} color={Theme.orange} weight={2} opacity={0.85} />}
            <Plot.OfX y={compiled.fn.f} color={Theme.indigo} weight={3} />
            {showKey && analysis?.points.filter((point) => point.kind !== 'root').map((point) => <Point key={`${point.kind}${point.x}`} x={point.x} y={point.y} color={point.kind === 'inflection' ? Theme.green : point.kind === 'max' ? Theme.red : Theme.blue} />)}
          </Mafs>
        )}
      </div>
      {compiled.fn && analysis && (
        <div className="grid gap-2 text-sm sm:grid-cols-2">
          <div className="rounded-xl bg-surface-2 px-3 py-2">
            <div className="text-xs font-semibold text-muted">נגזרת</div>
            <div className="overflow-x-auto" dir="ltr">f′(x) = <span className="font-mono text-xs">{compiled.fn.derivativeText}</span></div>
          </div>
          <div className="rounded-xl bg-surface-2 px-3 py-2">
            <div className="text-xs font-semibold text-muted">בתחום המוצג</div>
            <ul className="flex flex-col gap-0.5">
              {analysis.points.filter((point) => point.kind !== 'root').map((point) => (
                <li key={`${point.kind}${point.x}`}>
                  {point.kind === 'max' ? 'מקסימום' : point.kind === 'min' ? 'מינימום' : 'פיתול'}: <Latex latex={`(${point.x.toFixed(3)},\\ ${point.y.toFixed(3)})`} />
                </li>
              ))}
              {analysis.vertical.map((x) => <li key={`v${x}`}>אסימפטוטה אנכית: <Latex latex={`x=${x.toFixed(2)}`} /></li>)}
              {analysis.horizontal.map((y) => <li key={`h${y}`}>אסימפטוטה אופקית: <Latex latex={`y=${y}`} /></li>)}
              {analysis.points.length === 0 && analysis.vertical.length === 0 && analysis.horizontal.length === 0 && <li className="text-muted">לא נמצאו נקודות מיוחדות</li>}
            </ul>
          </div>
          <p className="text-xs text-muted sm:col-span-2">הערכים מחושבים נומרית ומעוגלים — בבגרות צריך למצוא אותם אלגברית. אסימפטוטה אנכית מסומנת רק בתוך הטווח המוצג.</p>
        </div>
      )}
    </div>
  );
}
