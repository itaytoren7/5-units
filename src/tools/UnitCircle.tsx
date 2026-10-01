import { Circle, Coordinates, Line, Mafs, Point, Polygon, Text, Theme, useMovablePoint, vec } from 'mafs';
import 'mafs/core.css';
import { Latex } from '../components/Markdown';

function fmt(value: number): string {
  if (!Number.isFinite(value) || Math.abs(value) > 1e6) return '\\text{undefined}';
  return (Math.abs(value) < 5e-4 ? 0 : value).toFixed(3);
}

function degrees(angle: number): number {
  const d = (angle * 180) / Math.PI;
  return Math.round(((d % 360) + 360) % 360);
}

export function UnitCircle() {
  const point = useMovablePoint([Math.cos(Math.PI / 6), Math.sin(Math.PI / 6)], {
    constrain: (position) => vec.normalize(position),
    color: Theme.indigo,
  });
  const [x, y] = point.point;
  const angle = Math.atan2(y, x);
  const deg = degrees(angle);
  const rad = (deg * Math.PI) / 180;
  const related = [
    { label: '180^{\\circ}-\\alpha', a: Math.PI - rad, color: Theme.orange },
    { label: '-\\alpha', a: -rad, color: Theme.green },
    { label: '180^{\\circ}+\\alpha', a: Math.PI + rad, color: Theme.pink },
  ];
  const tan = Math.cos(rad) === 0 ? Number.NaN : Math.tan(rad);

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted">גררו את הנקודה על המעגל. הקו הכתום הוא sin (גובה), הירוק cos (רוחב), והזוויות הקשורות מסומנות בצבעים.</p>
      <div className="mafs-wrap">
        <Mafs height={340} viewBox={{ x: [-1.5, 1.5], y: [-1.5, 1.5] }}>
          <Coordinates.Cartesian xAxis={{ lines: 0.5 }} yAxis={{ lines: 0.5 }} subdivisions={false} />
          <Circle center={[0, 0]} radius={1} strokeStyle="solid" color={Theme.foreground} fillOpacity={0} />
          <Polygon points={[[0, 0], [x, 0], [x, y]]} color={Theme.indigo} fillOpacity={0.08} weight={0} />
          <Line.Segment point1={[x, 0]} point2={[x, y]} color={Theme.orange} weight={3} />
          <Line.Segment point1={[0, 0]} point2={[x, 0]} color={Theme.green} weight={3} />
          <Line.Segment point1={[0, 0]} point2={[x, y]} color={Theme.indigo} weight={2} />
          {Number.isFinite(tan) && Math.abs(tan) < 50 && <Line.Segment point1={[1, 0]} point2={[1, tan]} color={Theme.red} weight={2} style="dashed" />}
          {related.map((entry) => (
            <Point key={entry.label} x={Math.cos(entry.a)} y={Math.sin(entry.a)} color={entry.color} opacity={0.8} />
          ))}
          <Text x={x * 1.18} y={y * 1.18} size={14}>{`${deg}°`}</Text>
          {point.element}
        </Mafs>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
        <div className="rounded-xl bg-surface-2 px-3 py-2"><div className="text-xs text-muted">זווית</div><Latex latex={`\\alpha=${deg}^{\\circ}=${fmt(rad)}\\ \\text{rad}`} /></div>
        <div className="rounded-xl bg-surface-2 px-3 py-2"><div className="text-xs" style={{ color: Theme.orange }}>sin</div><Latex latex={fmt(Math.sin(rad))} /></div>
        <div className="rounded-xl bg-surface-2 px-3 py-2"><div className="text-xs" style={{ color: Theme.green }}>cos</div><Latex latex={fmt(Math.cos(rad))} /></div>
        <div className="rounded-xl bg-surface-2 px-3 py-2"><div className="text-xs" style={{ color: Theme.red }}>tan</div><Latex latex={deg % 180 === 90 ? '\\text{undefined}' : fmt(tan)} /></div>
      </div>
      <ul className="grid gap-2 text-sm sm:grid-cols-3">
        {related.map((entry) => (
          <li key={entry.label} className="rounded-xl bg-surface-2 px-3 py-2">
            <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold">
              <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: entry.color }} /> <Latex latex={entry.label} />
            </div>
            <Latex latex={`\\sin=${fmt(Math.sin(entry.a))},\\ \\cos=${fmt(Math.cos(entry.a))}`} />
          </li>
        ))}
      </ul>
    </div>
  );
}
