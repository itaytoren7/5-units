import type { QuestionnaireCode } from '../problems/types';

/* ---------- Checks ---------- */

export type Check =
  /** The student types a number (3/4, sqrt(2), pi/6 are fine). `verify` is a mathjs expression that recomputes the answer from the givens. */
  | { kind: 'numeric'; answer: number; /** Absolute tolerance; default is relative 1e-3. */ tol?: number; verify: string }
  | { kind: 'choice'; options: string[]; correct: number }
  /** Proofs, sketches, open answers: reveal the solution, then self-mark. */
  | { kind: 'self' };

export interface Section {
  /** "א", "ב", … */
  label: string;
  /** Markdown + KaTeX */
  prompt: string;
  /** 1–3 hints, from gentle to strong. */
  hints: string[];
  check: Check;
  /** One line: key idea + final answer. */
  short: string;
  /** Numbered steps, shown on "הרחב". */
  full: string[];
}

/* ---------- Diagrams (declarative, rendered by <Diagram>) ---------- */

/** A point in math coordinates (y up). */
export type Pt = [number, number];

export interface GeoSegment {
  from: string;
  to: string;
  dashed?: boolean;
  /** Text placed beside the segment (e.g. its length). */
  label?: string;
  accent?: boolean;
}

export interface GeoAngle {
  /** Vertex point name. */
  at: string;
  /** Point names on the two rays. */
  from: string;
  to: string;
  label?: string;
  /** Draw a right-angle square instead of an arc. */
  right?: boolean;
}

export interface GeoDiagram {
  kind: 'geo';
  /** Named points; names are drawn as labels unless listed in `hideNames`. */
  points: Record<string, Pt>;
  segments?: Array<GeoSegment | [string, string]>;
  /** Closed outlines given as point names. */
  polygons?: string[][];
  circles?: Array<{ center: string | Pt; radius: number; dashed?: boolean }>;
  angles?: GeoAngle[];
  /** Extra text, at a point name or at math coordinates. dx/dy are in pixels. */
  labels?: Array<{ at: string | Pt; text: string; dx?: number; dy?: number }>;
  hideNames?: string[];
  /** Draw points as dots. */
  dots?: string[];
}

export interface PlotDiagram {
  kind: 'plot';
  xRange: [number, number];
  yRange?: [number, number];
  functions: Array<{ expr: string; label?: string; domain?: [number, number]; dashed?: boolean }>;
  /** Shade under one curve (string = expr) or between two curves, on [from, to]. */
  shade?: Array<{ between: string | [string, string]; from: number; to: number }>;
  points?: Array<{ x: number; y: number; label?: string }>;
  asymptotes?: Array<{ x?: number; y?: number }>;
  labels?: Array<{ at: Pt; text: string }>;
}

export interface UnitCircleDiagram {
  kind: 'unitCircle';
  angles: Array<{ deg: number; label?: string; showSin?: boolean; showCos?: boolean }>;
}

export interface TreeNode {
  label: string;
  /** Probability written on the branch leading to this node. */
  p?: string;
  children?: TreeNode[];
  highlight?: boolean;
}

export interface TreeDiagram {
  kind: 'tree';
  root?: string;
  branches: TreeNode[];
}

export interface SolidDiagram {
  kind: 'solid';
  shape: 'box' | 'prism' | 'pyramid';
  /** box: [width, depth, height]; prism/pyramid: [base radius, 0, height]. */
  size: [number, number, number];
  /** Number of base sides for prism / pyramid (default 3 for prism, 4 for pyramid). */
  baseSides?: number;
  /** Vertex names in order: box A..H (bottom A-D, top E-H), prism bottom then top, pyramid base then apex. */
  labels?: string[];
  highlightSegments?: Array<[string, string]>;
  highlightAngles?: Array<{ at: string; from: string; to: string; label?: string }>;
  segmentLabels?: Array<{ from: string; to: string; text: string }>;
}

export interface ComplexDiagram {
  kind: 'complex';
  points: Array<{ re: number; im: number; label?: string; vector?: boolean }>;
  circle?: { r: number; dashed?: boolean };
  range?: number;
}

export interface SeqDiagram {
  kind: 'seq';
  terms: number[];
  style?: 'dots' | 'bars';
  labels?: boolean;
  /** 1-based indices to highlight. */
  highlight?: number[];
}

export interface MotionDiagram {
  kind: 'motion';
  from: string;
  to: string;
  distance?: string;
  movers: Array<{ name: string; at: number; dir: 1 | -1; speed?: string }>;
  marks?: Array<{ at: number; label: string }>;
}

export type DiagramSpec = GeoDiagram | PlotDiagram | UnitCircleDiagram | TreeDiagram | SolidDiagram | ComplexDiagram | SeqDiagram | MotionDiagram;

/* ---------- Exercises and sets ---------- */

export interface Exercise {
  id: string;
  /** 1 basic (one step) · 2 two or three sections · 3 full bagrut question */
  level: 1 | 2 | 3;
  topicId: string;
  subtopicIds: string[];
  /** The givens, Markdown + KaTeX. */
  intro: string;
  /** Must not reveal the answer. */
  diagram: DiagramSpec;
  solutionDiagram?: DiagramSpec;
  sections: Section[];
}

export interface ExerciseSet {
  id: string;
  questionnaire: QuestionnaireCode;
  title: string;
  topicIds: string[];
  exercises: Exercise[];
}
