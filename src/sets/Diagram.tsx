import { useMemo, type ReactNode } from 'react';
import { compile } from 'mathjs';
import type { ComplexDiagram, DiagramSpec, GeoDiagram, MotionDiagram, PlotDiagram, Pt, SeqDiagram, SolidDiagram, TreeDiagram, TreeNode, UnitCircleDiagram } from '@/data/sets/types';

/** Every diagram is drawn into the same 320×240 box; the figure styles make it responsive and theme-aware. */
const W = 320;
const H = 240;
const ACCENT = 'var(--primary)';
const MUTED = 'var(--muted)';
const FONT = 13;

type Mapper = (p: Pt) => Pt;

/** Uniform scale that fits math-space points into the box with `pad` pixels of margin. */
function fitter(points: Pt[], pad = 30): Mapper {
  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const spanX = Math.max(maxX - minX, 1e-9);
  const spanY = Math.max(maxY - minY, 1e-9);
  const scale = Math.min((W - 2 * pad) / spanX, (H - 2 * pad) / spanY);
  const offsetX = (W - spanX * scale) / 2 - minX * scale;
  const offsetY = (H - spanY * scale) / 2 + maxY * scale;
  return ([x, y]) => [x * scale + offsetX, offsetY - y * scale];
}

function Text({ x, y, children, anchor = 'middle', size = FONT, color, bold, baseline = 'middle' }: { x: number; y: number; children: ReactNode; anchor?: 'start' | 'middle' | 'end'; size?: number; color?: string; bold?: boolean; baseline?: 'middle' | 'hanging' | 'auto' }) {
  const hebrew = /[\u0590-\u05FF]/.test(String(children));
  return (
    <text x={x} y={y} fontSize={size} textAnchor={anchor} dominantBaseline={baseline} fill={color ?? 'currentColor'} stroke="none" fontWeight={bold ? 700 : 500} direction={hebrew ? 'rtl' : undefined}>
      {children}
    </text>
  );
}

function norm(dx: number, dy: number): Pt {
  const len = Math.hypot(dx, dy) || 1;
  return [dx / len, dy / len];
}

function ArrowDefs() {
  return (
    <defs>
      <marker id="dg-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
      </marker>
      <marker id="dg-arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill={ACCENT} />
      </marker>
    </defs>
  );
}

/* ---------- geo ---------- */

function angleMark(vertex: Pt, from: Pt, to: Pt, right: boolean | undefined, label: string | undefined, key: string) {
  const [ux, uy] = norm(from[0] - vertex[0], from[1] - vertex[1]);
  const [vx, vy] = norm(to[0] - vertex[0], to[1] - vertex[1]);
  if (right) {
    const s = 10;
    const p1: Pt = [vertex[0] + ux * s, vertex[1] + uy * s];
    const p2: Pt = [vertex[0] + (ux + vx) * s, vertex[1] + (uy + vy) * s];
    const p3: Pt = [vertex[0] + vx * s, vertex[1] + vy * s];
    return <polyline key={key} points={`${p1} ${p2} ${p3}`} fill="none" strokeWidth={1.5} />;
  }
  let a1 = Math.atan2(uy, ux);
  let a2 = Math.atan2(vy, vx);
  let sweep = a2 - a1;
  while (sweep <= -Math.PI) sweep += 2 * Math.PI;
  while (sweep > Math.PI) sweep -= 2 * Math.PI;
  if (sweep < 0) {
    [a1, a2] = [a2, a1];
    sweep = -sweep;
  }
  const r = sweep < 0.6 ? 22 : 17;
  const start: Pt = [vertex[0] + r * Math.cos(a1), vertex[1] + r * Math.sin(a1)];
  const end: Pt = [vertex[0] + r * Math.cos(a2), vertex[1] + r * Math.sin(a2)];
  const mid = a1 + sweep / 2;
  const labelR = r + 13;
  return (
    <g key={key}>
      <path d={`M ${start[0]} ${start[1]} A ${r} ${r} 0 0 1 ${end[0]} ${end[1]}`} fill="none" strokeWidth={1.5} />
      {label && (
        <Text x={vertex[0] + labelR * Math.cos(mid)} y={vertex[1] + labelR * Math.sin(mid)} size={12}>
          {label}
        </Text>
      )}
    </g>
  );
}

function GeoView({ spec }: { spec: GeoDiagram }) {
  const names = Object.keys(spec.points);
  const extent: Pt[] = names.map((name) => spec.points[name]);
  for (const circle of spec.circles ?? []) {
    const c = typeof circle.center === 'string' ? spec.points[circle.center] : circle.center;
    extent.push([c[0] - circle.radius, c[1] - circle.radius], [c[0] + circle.radius, c[1] + circle.radius]);
  }
  const map = fitter(extent);
  const screen: Record<string, Pt> = Object.fromEntries(names.map((name) => [name, map(spec.points[name])]));
  const cx = names.reduce((sum, name) => sum + screen[name][0], 0) / names.length;
  const cy = names.reduce((sum, name) => sum + screen[name][1], 0) / names.length;
  const resolve = (ref: string | Pt): Pt => (typeof ref === 'string' ? screen[ref] : map(ref));
  const hide = new Set(spec.hideNames ?? []);
  const segments = (spec.segments ?? []).map((segment) => (Array.isArray(segment) ? { from: segment[0], to: segment[1] } : segment));
  return (
    <>
      {(spec.circles ?? []).map((circle, index) => {
        const c = resolve(circle.center);
        const edge = map([(typeof circle.center === 'string' ? spec.points[circle.center] : circle.center)[0] + circle.radius, (typeof circle.center === 'string' ? spec.points[circle.center] : circle.center)[1]]);
        return <circle key={`c${index}`} cx={c[0]} cy={c[1]} r={Math.abs(edge[0] - c[0])} fill="none" strokeWidth={2} strokeDasharray={circle.dashed ? '5 4' : undefined} />;
      })}
      {(spec.polygons ?? []).map((polygon, index) => (
        <polygon key={`p${index}`} points={polygon.map((name) => screen[name].join(',')).join(' ')} fill="none" strokeWidth={2} strokeLinejoin="round" />
      ))}
      {segments.map((segment, index) => {
        const a = screen[segment.from];
        const b = screen[segment.to];
        const [nx, ny] = norm(b[1] - a[1], -(b[0] - a[0]));
        const mx = (a[0] + b[0]) / 2;
        const my = (a[1] + b[1]) / 2;
        const away = (mx - cx) * nx + (my - cy) * ny >= 0 ? 1 : -1;
        return (
          <g key={`s${index}`}>
            <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} strokeWidth={segment.accent ? 2.5 : 2} stroke={segment.accent ? ACCENT : undefined} strokeDasharray={segment.dashed ? '5 4' : undefined} />
            {segment.label && (
              <Text x={mx + nx * 12 * away} y={my + ny * 12 * away} size={12}>
                {segment.label}
              </Text>
            )}
          </g>
        );
      })}
      {(spec.angles ?? []).map((angle, index) => angleMark(screen[angle.at], screen[angle.from], screen[angle.to], angle.right, angle.label, `a${index}`))}
      {(spec.dots ?? []).map((name) => (
        <circle key={`d${name}`} cx={screen[name][0]} cy={screen[name][1]} r={3} fill="currentColor" stroke="none" />
      ))}
      {names
        .filter((name) => !hide.has(name))
        .map((name) => {
          const [x, y] = screen[name];
          let [dx, dy] = norm(x - cx, y - cy);
          if (Math.hypot(x - cx, y - cy) < 2) [dx, dy] = [0.6, 0.8];
          return (
            <Text key={`n${name}`} x={x + dx * 14} y={y + dy * 14} bold>
              {name}
            </Text>
          );
        })}
      {(spec.labels ?? []).map((label, index) => {
        const [x, y] = resolve(label.at);
        return (
          <Text key={`l${index}`} x={x + (label.dx ?? 0)} y={y + (label.dy ?? 0)} size={12}>
            {label.text}
          </Text>
        );
      })}
    </>
  );
}

/* ---------- plot ---------- */

function compileSafe(expr: string): (x: number) => number {
  try {
    const code = compile(expr);
    return (x) => {
      try {
        const value = code.evaluate({ x });
        return typeof value === 'number' ? value : Number.NaN;
      } catch {
        return Number.NaN;
      }
    };
  } catch {
    return () => Number.NaN;
  }
}

function niceStep(span: number): number {
  const raw = span / 6;
  const power = 10 ** Math.floor(Math.log10(raw));
  const candidates = [1, 2, 2.5, 5, 10].map((m) => m * power);
  return candidates.find((c) => c >= raw) ?? candidates[candidates.length - 1];
}

function PlotView({ spec }: { spec: PlotDiagram }) {
  const fns = useMemo(() => spec.functions.map((f) => ({ ...f, fn: compileSafe(f.expr) })), [spec.functions]);
  const [x0, x1] = spec.xRange;
  let yRange = spec.yRange;
  if (!yRange) {
    const samples: number[] = [0];
    for (const f of fns) {
      const [d0, d1] = f.domain ?? spec.xRange;
      for (let i = 0; i <= 120; i += 1) {
        const y = f.fn(d0 + ((d1 - d0) * i) / 120);
        if (Number.isFinite(y) && Math.abs(y) <= 60) samples.push(y);
      }
    }
    for (const p of spec.points ?? []) samples.push(p.y);
    const lo = Math.min(...samples);
    const hi = Math.max(...samples);
    const padY = Math.max((hi - lo) * 0.12, 0.5);
    yRange = [lo - padY, hi + padY];
  }
  const [y0, y1] = yRange;
  const padL = 22;
  const padR = 14;
  const padT = 12;
  const padB = 22;
  const sx = (x: number) => padL + ((x - x0) / (x1 - x0)) * (W - padL - padR);
  const sy = (y: number) => H - padB - ((y - y0) / (y1 - y0)) * (H - padT - padB);
  const axisY = y0 <= 0 && y1 >= 0 ? sy(0) : H - padB;
  const axisX = x0 <= 0 && x1 >= 0 ? sx(0) : padL;
  const stepX = niceStep(x1 - x0);
  const stepY = niceStep(y1 - y0);
  const ticksX: number[] = [];
  for (let v = Math.ceil(x0 / stepX) * stepX; v <= x1 + 1e-9; v += stepX) if (Math.abs(v) > 1e-9) ticksX.push(Number(v.toFixed(6)));
  const ticksY: number[] = [];
  for (let v = Math.ceil(y0 / stepY) * stepY; v <= y1 + 1e-9; v += stepY) if (Math.abs(v) > 1e-9) ticksY.push(Number(v.toFixed(6)));
  const curve = (fn: (x: number) => number, from: number, to: number): string => {
    const parts: string[] = [];
    let open = false;
    let prevY = Number.NaN;
    const n = 240;
    for (let i = 0; i <= n; i += 1) {
      const x = from + ((to - from) * i) / n;
      const y = fn(x);
      const inside = Number.isFinite(y) && y >= y0 - (y1 - y0) && y <= y1 + (y1 - y0);
      const jump = Number.isFinite(prevY) && Number.isFinite(y) && Math.abs(y - prevY) > (y1 - y0) * 0.8;
      if (!inside || jump) {
        open = false;
      } else {
        parts.push(`${open ? 'L' : 'M'} ${sx(x).toFixed(2)} ${Math.max(-50, Math.min(H + 50, sy(y))).toFixed(2)}`);
        open = true;
      }
      prevY = inside ? y : Number.NaN;
    }
    return parts.join(' ');
  };
  const fnOf = (expr: string) => fns.find((f) => f.expr === expr)?.fn ?? compileSafe(expr);
  return (
    <>
      <line x1={padL - 6} y1={axisY} x2={W - 4} y2={axisY} strokeWidth={1.2} stroke={MUTED} markerEnd="url(#dg-arrow)" />
      <line x1={axisX} y1={H - padB + 6} x2={axisX} y2={4} strokeWidth={1.2} stroke={MUTED} markerEnd="url(#dg-arrow)" />
      <Text x={W - 8} y={axisY - 9} size={12} color={MUTED}>
        x
      </Text>
      <Text x={axisX + 10} y={10} size={12} color={MUTED}>
        y
      </Text>
      {ticksX.map((v) => (
        <g key={`tx${v}`}>
          <line x1={sx(v)} y1={axisY - 3} x2={sx(v)} y2={axisY + 3} stroke={MUTED} strokeWidth={1} />
          <Text x={sx(v)} y={axisY + 11} size={10} color={MUTED}>
            {v}
          </Text>
        </g>
      ))}
      {ticksY.map((v) => (
        <g key={`ty${v}`}>
          <line x1={axisX - 3} y1={sy(v)} x2={axisX + 3} y2={sy(v)} stroke={MUTED} strokeWidth={1} />
          <Text x={axisX - 7} y={sy(v)} size={10} color={MUTED} anchor="end">
            {v}
          </Text>
        </g>
      ))}
      {(spec.shade ?? []).map((area, index) => {
        const [top, bottom] = Array.isArray(area.between) ? [fnOf(area.between[0]), fnOf(area.between[1])] : [fnOf(area.between), () => 0];
        const n = 80;
        const upper: string[] = [];
        const lower: string[] = [];
        for (let i = 0; i <= n; i += 1) {
          const x = area.from + ((area.to - area.from) * i) / n;
          const yt = top(x);
          const yb = bottom(x);
          if (!Number.isFinite(yt) || !Number.isFinite(yb)) continue;
          upper.push(`${sx(x).toFixed(2)},${sy(yt).toFixed(2)}`);
          lower.push(`${sx(x).toFixed(2)},${sy(yb).toFixed(2)}`);
        }
        return <polygon key={`sh${index}`} points={[...upper, ...lower.reverse()].join(' ')} fill={ACCENT} opacity={0.18} stroke="none" />;
      })}
      {(spec.asymptotes ?? []).map((asymptote, index) =>
        asymptote.x !== undefined ? (
          <line key={`as${index}`} x1={sx(asymptote.x)} y1={padT} x2={sx(asymptote.x)} y2={H - padB} strokeDasharray="4 4" strokeWidth={1.2} stroke={MUTED} />
        ) : (
          <line key={`as${index}`} x1={padL} y1={sy(asymptote.y ?? 0)} x2={W - padR} y2={sy(asymptote.y ?? 0)} strokeDasharray="4 4" strokeWidth={1.2} stroke={MUTED} />
        ),
      )}
      {fns.map((f, index) => {
        const [d0, d1] = f.domain ?? spec.xRange;
        const path = curve(f.fn, Math.max(d0, x0), Math.min(d1, x1));
        const lx = Math.min(d1, x1) - (x1 - x0) * 0.06;
        const ly = f.fn(lx);
        return (
          <g key={`f${index}`}>
            <path d={path} fill="none" strokeWidth={2.2} stroke={index === 0 ? ACCENT : 'currentColor'} strokeDasharray={f.dashed ? '6 4' : undefined} strokeLinejoin="round" />
            {f.label && Number.isFinite(ly) && (
              <Text x={sx(lx)} y={sy(ly) - 10} size={12} color={index === 0 ? ACCENT : undefined} bold>
                {f.label}
              </Text>
            )}
          </g>
        );
      })}
      {(spec.points ?? []).map((p, index) => (
        <g key={`pt${index}`}>
          <circle cx={sx(p.x)} cy={sy(p.y)} r={3.5} fill="currentColor" stroke="none" />
          {p.label && (
            <Text x={sx(p.x) + 8} y={sy(p.y) - 9} size={12} anchor="start">
              {p.label}
            </Text>
          )}
        </g>
      ))}
      {(spec.labels ?? []).map((label, index) => (
        <Text key={`lb${index}`} x={sx(label.at[0])} y={sy(label.at[1])} size={12}>
          {label.text}
        </Text>
      ))}
    </>
  );
}

/* ---------- unit circle ---------- */

function UnitCircleView({ spec }: { spec: UnitCircleDiagram }) {
  const cx = 160;
  const cy = 122;
  const r = 92;
  return (
    <>
      <line x1={cx - r - 16} y1={cy} x2={cx + r + 16} y2={cy} stroke={MUTED} strokeWidth={1.2} markerEnd="url(#dg-arrow)" />
      <line x1={cx} y1={cy + r + 14} x2={cx} y2={cy - r - 14} stroke={MUTED} strokeWidth={1.2} markerEnd="url(#dg-arrow)" />
      <circle cx={cx} cy={cy} r={r} fill="none" strokeWidth={2} />
      <Text x={cx + r} y={cy + 11} size={10} color={MUTED}>
        1
      </Text>
      <Text x={cx - r} y={cy + 11} size={10} color={MUTED}>
        −1
      </Text>
      <Text x={cx - 9} y={cy - r} size={10} color={MUTED} anchor="end">
        1
      </Text>
      {spec.angles.map((angle, index) => {
        const t = (angle.deg * Math.PI) / 180;
        const px = cx + r * Math.cos(t);
        const py = cy - r * Math.sin(t);
        const arcR = 24 + index * 8;
        const large = angle.deg > 180 ? 1 : 0;
        const ax = cx + arcR * Math.cos(t);
        const ay = cy - arcR * Math.sin(t);
        const mid = t / 2;
        return (
          <g key={index}>
            <line x1={cx} y1={cy} x2={px} y2={py} strokeWidth={2} stroke={ACCENT} />
            <path d={`M ${cx + arcR} ${cy} A ${arcR} ${arcR} 0 ${large} 0 ${ax} ${ay}`} fill="none" strokeWidth={1.3} />
            <Text x={cx + (arcR + 13) * Math.cos(mid)} y={cy - (arcR + 13) * Math.sin(mid)} size={11}>
              {angle.label ?? `${angle.deg}°`}
            </Text>
            <circle cx={px} cy={py} r={3.5} fill={ACCENT} stroke="none" />
            {angle.showSin && (
              <g>
                <line x1={px} y1={py} x2={px} y2={cy} strokeDasharray="4 3" strokeWidth={1.3} />
                <Text x={px + (Math.cos(t) >= 0 ? 8 : -8)} y={(py + cy) / 2} size={11} anchor={Math.cos(t) >= 0 ? 'start' : 'end'}>
                  sin
                </Text>
              </g>
            )}
            {angle.showCos && (
              <g>
                <line x1={px} y1={py} x2={cx} y2={py} strokeDasharray="4 3" strokeWidth={1.3} />
                <Text x={(px + cx) / 2} y={py + (Math.sin(t) >= 0 ? -9 : 10)} size={11}>
                  cos
                </Text>
              </g>
            )}
          </g>
        );
      })}
    </>
  );
}

/* ---------- probability tree ---------- */

interface LaidOut {
  node: TreeNode;
  x: number;
  y: number;
  children: LaidOut[];
}

function layoutTree(spec: TreeDiagram): LaidOut {
  const root: TreeNode = { label: spec.root ?? '', children: spec.branches };
  const depthOf = (node: TreeNode): number => 1 + Math.max(0, ...(node.children ?? []).map(depthOf));
  const depth = depthOf(root) - 1;
  const leaves = (node: TreeNode): number => (node.children?.length ? node.children.reduce((sum, child) => sum + leaves(child), 0) : 1);
  const total = leaves(root);
  let next = 0;
  const top = 22;
  const bottom = H - 18;
  const stepX = depth > 0 ? (W - 60) / depth : 0;
  const place = (node: TreeNode, level: number): LaidOut => {
    const x = W - 30 - level * stepX;
    if (!node.children?.length) {
      const y = total === 1 ? H / 2 : top + ((bottom - top) * next) / (total - 1);
      next += 1;
      return { node, x, y, children: [] };
    }
    const children = node.children.map((child) => place(child, level + 1));
    const y = children.reduce((sum, child) => sum + child.y, 0) / children.length;
    return { node, x, y, children };
  };
  return place(root, 0);
}

function TreeView({ spec }: { spec: TreeDiagram }) {
  const tree = useMemo(() => layoutTree(spec), [spec]);
  const nodes: ReactNode[] = [];
  const walk = (node: LaidOut, isRoot: boolean) => {
    for (const child of node.children) {
      const mx = (node.x + child.x) / 2;
      const my = (node.y + child.y) / 2;
      const [nx, ny] = norm(child.y - node.y, -(child.x - node.x));
      nodes.push(<line key={`e${child.x}-${child.y}`} x1={node.x} y1={node.y} x2={child.x} y2={child.y} strokeWidth={child.node.highlight ? 2.5 : 1.5} stroke={child.node.highlight ? ACCENT : undefined} />);
      if (child.node.p) {
        nodes.push(
          <Text key={`p${child.x}-${child.y}`} x={mx + nx * 10} y={my + ny * 10} size={11} color={MUTED}>
            {child.node.p}
          </Text>,
        );
      }
      walk(child, false);
    }
    const leaf = node.children.length === 0;
    nodes.push(<circle key={`c${node.x}-${node.y}`} cx={node.x} cy={node.y} r={isRoot ? 4 : 3} fill={node.node.highlight ? ACCENT : 'currentColor'} stroke="none" />);
    if (node.node.label) {
      nodes.push(
        <Text key={`t${node.x}-${node.y}`} x={leaf ? node.x - 8 : node.x} y={leaf ? node.y : node.y - 11} size={12} anchor={leaf ? 'end' : 'middle'} bold={node.node.highlight}>
          {node.node.label}
        </Text>,
      );
    }
  };
  walk(tree, true);
  return <>{nodes}</>;
}

/* ---------- solids ---------- */

type P3 = [number, number, number];

function SolidView({ spec }: { spec: SolidDiagram }) {
  const [a, b, h] = spec.size;
  const vertices: P3[] = [];
  const edges: Array<[number, number, boolean]> = [];
  let defaultNames: string[] = [];
  if (spec.shape === 'box') {
    vertices.push([0, 0, 0], [a, 0, 0], [a, b, 0], [0, b, 0], [0, 0, h], [a, 0, h], [a, b, h], [0, b, h]);
    const hidden = new Set(['0-3', '3-2', '3-7']);
    const pairs: Array<[number, number]> = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
    for (const [i, j] of pairs) edges.push([i, j, hidden.has(`${i}-${j}`)]);
    defaultNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  } else {
    const n = spec.baseSides ?? (spec.shape === 'prism' ? 3 : 4);
    const base: P3[] = [];
    for (let i = 0; i < n; i += 1) {
      const t = -Math.PI / 2 + (2 * Math.PI * i) / n + (n % 2 === 0 ? Math.PI / n : 0);
      base.push([a * Math.cos(t), a * Math.sin(t), 0]);
    }
    const back = (v: P3) => v[1] > a * 0.25;
    vertices.push(...base);
    for (let i = 0; i < n; i += 1) {
      const j = (i + 1) % n;
      edges.push([i, j, back(base[i]) && back(base[j])]);
    }
    if (spec.shape === 'prism') {
      vertices.push(...base.map((v): P3 => [v[0], v[1], h]));
      for (let i = 0; i < n; i += 1) {
        const j = (i + 1) % n;
        edges.push([n + i, n + j, false]);
        edges.push([i, n + i, back(base[i])]);
      }
      defaultNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'].slice(0, 2 * n);
    } else {
      vertices.push([0, 0, h]);
      for (let i = 0; i < n; i += 1) edges.push([i, n, back(base[i])]);
      defaultNames = [...['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].slice(0, n), 'S'];
    }
  }
  const names = spec.labels ?? defaultNames;
  const project = (v: P3): Pt => [v[0] + 0.45 * v[1], v[2] + 0.3 * v[1]];
  const projected = vertices.map(project);
  const map = fitter(projected, 34);
  const screen = projected.map(map);
  const cx = screen.reduce((sum, p) => sum + p[0], 0) / screen.length;
  const cy = screen.reduce((sum, p) => sum + p[1], 0) / screen.length;
  const indexOf = (name: string) => names.indexOf(name);
  return (
    <>
      {edges.map(([i, j, hidden], index) => (
        <line key={index} x1={screen[i][0]} y1={screen[i][1]} x2={screen[j][0]} y2={screen[j][1]} strokeWidth={1.8} strokeDasharray={hidden ? '5 4' : undefined} />
      ))}
      {(spec.highlightSegments ?? []).map(([p, q], index) => {
        const i = indexOf(p);
        const j = indexOf(q);
        if (i < 0 || j < 0) return null;
        return <line key={`h${index}`} x1={screen[i][0]} y1={screen[i][1]} x2={screen[j][0]} y2={screen[j][1]} strokeWidth={2.8} stroke={ACCENT} />;
      })}
      {(spec.segmentLabels ?? []).map((label, index) => {
        const i = indexOf(label.from);
        const j = indexOf(label.to);
        if (i < 0 || j < 0) return null;
        const mx = (screen[i][0] + screen[j][0]) / 2;
        const my = (screen[i][1] + screen[j][1]) / 2;
        const [dx, dy] = norm(mx - cx, my - cy);
        return (
          <Text key={`sl${index}`} x={mx + dx * 11} y={my + dy * 11} size={12}>
            {label.text}
          </Text>
        );
      })}
      {(spec.highlightAngles ?? []).map((angle, index) => {
        const v = indexOf(angle.at);
        const f = indexOf(angle.from);
        const t = indexOf(angle.to);
        if (v < 0 || f < 0 || t < 0) return null;
        return <g key={`ha${index}`} stroke={ACCENT}>{angleMark(screen[v], screen[f], screen[t], false, angle.label, `ha${index}`)}</g>;
      })}
      {names.slice(0, screen.length).map((name, index) => {
        const [x, y] = screen[index];
        const [dx, dy] = norm(x - cx, y - cy);
        return (
          <Text key={`n${name}`} x={x + dx * 13} y={y + dy * 13} bold>
            {name}
          </Text>
        );
      })}
    </>
  );
}

/* ---------- complex plane ---------- */

function ComplexView({ spec }: { spec: ComplexDiagram }) {
  const range = spec.range ?? Math.max(1, ...spec.points.map((p) => Math.max(Math.abs(p.re), Math.abs(p.im))), spec.circle?.r ?? 0) * 1.25;
  const cx = 160;
  const cy = 122;
  const scale = 100 / range;
  const sx = (re: number) => cx + re * scale;
  const sy = (im: number) => cy - im * scale;
  const step = niceStep(2 * range);
  const ticks: number[] = [];
  for (let v = step; v <= range; v += step) ticks.push(Number(v.toFixed(6)));
  return (
    <>
      <line x1={sx(-range) - 10} y1={cy} x2={sx(range) + 10} y2={cy} stroke={MUTED} strokeWidth={1.2} markerEnd="url(#dg-arrow)" />
      <line x1={cx} y1={sy(-range) + 10} x2={cx} y2={sy(range) - 10} stroke={MUTED} strokeWidth={1.2} markerEnd="url(#dg-arrow)" />
      <Text x={sx(range) + 4} y={cy - 10} size={11} color={MUTED}>
        Re
      </Text>
      <Text x={cx + 12} y={sy(range) - 4} size={11} color={MUTED}>
        Im
      </Text>
      {ticks.flatMap((v) => [
        <Text key={`r${v}`} x={sx(v)} y={cy + 11} size={10} color={MUTED}>
          {v}
        </Text>,
        <Text key={`r-${v}`} x={sx(-v)} y={cy + 11} size={10} color={MUTED}>
          −{v}
        </Text>,
        <Text key={`i${v}`} x={cx - 7} y={sy(v)} size={10} color={MUTED} anchor="end">
          {v}i
        </Text>,
      ])}
      {spec.circle && <circle cx={cx} cy={cy} r={spec.circle.r * scale} fill="none" strokeWidth={1.5} strokeDasharray={spec.circle.dashed ? '5 4' : undefined} />}
      {spec.points.map((p, index) => (
        <g key={index}>
          {p.vector && <line x1={cx} y1={cy} x2={sx(p.re)} y2={sy(p.im)} strokeWidth={2} stroke={ACCENT} markerEnd="url(#dg-arrow-accent)" />}
          <circle cx={sx(p.re)} cy={sy(p.im)} r={3.5} fill={p.vector ? ACCENT : 'currentColor'} stroke="none" />
          {p.label && (
            <Text x={sx(p.re) + (p.re >= 0 ? 8 : -8)} y={sy(p.im) - 9} size={12} anchor={p.re >= 0 ? 'start' : 'end'} bold>
              {p.label}
            </Text>
          )}
        </g>
      ))}
    </>
  );
}

/* ---------- sequences ---------- */

function SeqView({ spec }: { spec: SeqDiagram }) {
  const n = spec.terms.length;
  const lo = Math.min(0, ...spec.terms);
  const hi = Math.max(0, ...spec.terms);
  const padL = 30;
  const top = 26;
  const bottom = lo < 0 ? H - 44 : H - 30;
  const sx = (i: number) => padL + ((W - padL - 16) * (i + 0.5)) / n;
  const sy = (v: number) => bottom - ((v - lo) / Math.max(hi - lo, 1e-9)) * (bottom - top);
  const highlight = new Set(spec.highlight ?? []);
  const barW = Math.min(26, ((W - padL - 16) / n) * 0.6);
  return (
    <>
      <line x1={padL - 8} y1={sy(0)} x2={W - 8} y2={sy(0)} stroke={MUTED} strokeWidth={1.2} />
      {spec.terms.map((v, i) => {
        const accent = highlight.has(i + 1);
        return (
          <g key={i}>
            {spec.style === 'bars' ? (
              <rect x={sx(i) - barW / 2} y={Math.min(sy(v), sy(0))} width={barW} height={Math.abs(sy(v) - sy(0))} fill={accent ? ACCENT : 'currentColor'} opacity={accent ? 0.9 : 0.55} stroke="none" rx={3} />
            ) : (
              <>
                {i > 0 && <line x1={sx(i - 1)} y1={sy(spec.terms[i - 1])} x2={sx(i)} y2={sy(v)} stroke={MUTED} strokeWidth={1} strokeDasharray="3 3" />}
                <circle cx={sx(i)} cy={sy(v)} r={accent ? 5 : 4} fill={accent ? ACCENT : 'currentColor'} stroke="none" />
              </>
            )}
            {spec.labels !== false && (
              <Text x={sx(i)} y={sy(v) + (v >= 0 ? -12 : 12)} size={11}>
                {Number(v.toFixed(3))}
              </Text>
            )}
            <Text x={sx(i)} y={H - 12} size={11} color={MUTED}>
              {i + 1}
            </Text>
          </g>
        );
      })}
      <Text x={W - 10} y={H - 12} size={11} color={MUTED} anchor="end">
        n
      </Text>
    </>
  );
}

/* ---------- motion ---------- */

function MotionView({ spec }: { spec: MotionDiagram }) {
  const x0 = 36;
  const x1 = W - 36;
  const y = 150;
  const sx = (t: number) => x0 + (x1 - x0) * Math.min(1, Math.max(0, t));
  return (
    <>
      <line x1={x0} y1={y} x2={x1} y2={y} strokeWidth={2.5} strokeLinecap="round" />
      <line x1={x0} y1={y - 8} x2={x0} y2={y + 8} strokeWidth={2} />
      <line x1={x1} y1={y - 8} x2={x1} y2={y + 8} strokeWidth={2} />
      <Text x={x0} y={y + 24} bold>
        {spec.from}
      </Text>
      <Text x={x1} y={y + 24} bold>
        {spec.to}
      </Text>
      {spec.distance && (
        <Text x={(x0 + x1) / 2} y={y + 44} size={12} color={MUTED}>
          {spec.distance}
        </Text>
      )}
      {(spec.marks ?? []).map((mark, index) => (
        <g key={`m${index}`}>
          <line x1={sx(mark.at)} y1={y - 6} x2={sx(mark.at)} y2={y + 6} strokeWidth={1.5} stroke={MUTED} />
          <Text x={sx(mark.at)} y={y + 22} size={11} color={MUTED}>
            {mark.label}
          </Text>
        </g>
      ))}
      {spec.movers.map((mover, index) => {
        const x = sx(mover.at);
        const yy = y - 30 - index * 40;
        const color = index === 0 ? ACCENT : 'currentColor';
        return (
          <g key={`v${index}`}>
            <circle cx={x} cy={yy} r={7} fill={color} stroke="none" />
            <line x1={x + mover.dir * 10} y1={yy} x2={x + mover.dir * 32} y2={yy} strokeWidth={2} stroke={color} markerEnd={index === 0 ? 'url(#dg-arrow-accent)' : 'url(#dg-arrow)'} />
            <text x={x} y={yy - 12} fontSize={12} textAnchor="middle" fill="currentColor" stroke="none" fontWeight={700} direction="rtl">
              {mover.name}
            </text>
            {mover.speed && (
              <text x={x} y={yy - 26} fontSize={11} textAnchor="middle" fill={MUTED} stroke="none" direction="rtl">
                {mover.speed}
              </text>
            )}
          </g>
        );
      })}
    </>
  );
}

/* ---------- dispatcher ---------- */

function Body({ spec }: { spec: DiagramSpec }) {
  switch (spec.kind) {
    case 'geo':
      return <GeoView spec={spec} />;
    case 'plot':
      return <PlotView spec={spec} />;
    case 'unitCircle':
      return <UnitCircleView spec={spec} />;
    case 'tree':
      return <TreeView spec={spec} />;
    case 'solid':
      return <SolidView spec={spec} />;
    case 'complex':
      return <ComplexView spec={spec} />;
    case 'seq':
      return <SeqView spec={spec} />;
    case 'motion':
      return <MotionView spec={spec} />;
    default:
      return null;
  }
}

/** Renders a declarative DiagramSpec as an SVG figure, in the site's existing figure style. */
export function Diagram({ spec, caption = 'שרטוט' }: { spec: DiagramSpec; caption?: string }) {
  return (
    <figure className="figure my-3 rounded-xl bg-surface-2 p-3">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={caption} stroke="currentColor" fill="none" strokeWidth={2} fontFamily="sans-serif">
        <ArrowDefs />
        <Body spec={spec} />
      </svg>
      {caption && <figcaption className="mt-2 text-center text-xs text-muted">{caption}</figcaption>}
    </figure>
  );
}
