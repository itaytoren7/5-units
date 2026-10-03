/** Small formatting helpers shared by the generators (keep them pure). */

/** Round to `digits` decimals and drop trailing zeros: 2.50 → '2.5', 3.000 → '3'. */
export function fmt(value: number, digits = 2): string {
  const rounded = Number(value.toFixed(digits));
  return Object.is(rounded, -0) ? '0' : String(rounded);
}

export function round(value: number, digits = 2): number {
  return Number(value.toFixed(digits));
}

export function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) [x, y] = [y, x % y];
  return x || 1;
}

/** KaTeX for the fraction p/q in lowest terms ('\\frac{3}{4}', '-\\frac{1}{2}', '5'). */
export function fracTex(p: number, q: number): string {
  if (q === 0) throw new Error('fracTex: zero denominator');
  const sign = p * q < 0 ? '-' : '';
  const g = gcd(p, q);
  const n = Math.abs(p) / g;
  const d = Math.abs(q) / g;
  return d === 1 ? `${sign}${n}` : `${sign}\\frac{${n}}{${d}}`;
}

/** '+ 3' / '- 3' for writing polynomials: `x^2 ${signed(-3)}x` → 'x^2 - 3x'. Returns '' for 0 when dropZero is set. */
export function signed(value: number, digits = 2, dropZero = false): string {
  if (dropZero && value === 0) return '';
  return value < 0 ? `- ${fmt(-value, digits)}` : `+ ${fmt(value, digits)}`;
}

/** Coefficient for a term: 1 → '', -1 → '-', 2.5 → '2.5'. */
export function coef(value: number, digits = 2): string {
  if (value === 1) return '';
  if (value === -1) return '-';
  return fmt(value, digits);
}

/** Polynomial in x from coefficients, highest power first: [1, -3, 0, 2] → 'x^3 - 3x^2 + 2'. */
export function polyTex(coefficients: number[], variable = 'x'): string {
  const degree = coefficients.length - 1;
  const parts: string[] = [];
  coefficients.forEach((c, index) => {
    if (c === 0) return;
    const power = degree - index;
    const abs = Math.abs(c);
    const body = power === 0 ? fmt(abs) : `${abs === 1 ? '' : fmt(abs)}${variable}${power === 1 ? '' : `^{${power}}`}`;
    if (parts.length === 0) parts.push(c < 0 ? `-${body}` : body);
    else parts.push(c < 0 ? `- ${body}` : `+ ${body}`);
  });
  return parts.length ? parts.join(' ') : '0';
}
