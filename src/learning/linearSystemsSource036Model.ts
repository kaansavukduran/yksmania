import {
  r035,
  r035Add,
  r035Compare,
  r035Div,
  r035Mul,
  r035Neg,
  r035Sub,
  type R035,
} from "./rationalSource035Model.ts";

export type Eq036SystemScalar = number | bigint | Readonly<R035>;
export type Eq036SystemInputRow = readonly [Eq036SystemScalar, Eq036SystemScalar, Eq036SystemScalar];
export type Eq036SystemInput = readonly [Eq036SystemInputRow, Eq036SystemInputRow];
export type Eq036SystemRow = readonly [R035, R035, R035];
export type Eq036SystemRows = readonly [Eq036SystemRow, Eq036SystemRow];
export type Eq036SystemPoint = { x: R035; y: R035 };
type Variable = "x" | "y";
type RowIndex = 0 | 1;
type NonUnique = "coincident" | "parallel" | "one-line" | "whole-plane" | "inconsistent";

export type Eq036SystemSolution = {
  rows: Eq036SystemRows;
  determinant: R035;
} & ({ kind: "unique"; point: Eq036SystemPoint } | { kind: NonUnique; point: null });

function exact(value: Eq036SystemScalar): R035 {
  if (typeof value === "object" && value !== null) {
    if (typeof value.n !== "bigint" || typeof value.d !== "bigint")
      throw new TypeError("Kesir bigint pay ve payda taşımalı.");
    return r035(value.n, value.d);
  }
  return r035(value);
}

function row(input: Eq036SystemInputRow): Eq036SystemRow {
  if (input.length !== 3) throw new RangeError("Denklemde iki katsayı ve bir sağ değer olmalı.");
  const [a, b, c] = input;
  return [exact(a), exact(b), exact(c)];
}

function rows(input: Eq036SystemInput): Eq036SystemRows {
  if (input.length !== 2) throw new RangeError("Sistem iki denklem taşımalı.");
  return [row(input[0]), row(input[1])];
}

function cross(a: R035, b: R035, c: R035, d: R035): R035 {
  return r035Sub(r035Mul(a, d), r035Mul(b, c));
}

function rowKind([a, b, c]: Eq036SystemRow) {
  if (a.n !== 0n || b.n !== 0n) return "line";
  return c.n === 0n ? "identity" : "contradiction";
}

export function solveEq036System(input: Eq036SystemInput): Eq036SystemSolution {
  const equations = rows(input);
  const [[a, b, c], [d, e, f]] = equations;
  const determinant = cross(a, b, d, e);
  const base = { rows: equations, determinant };
  if (determinant.n !== 0n) {
    const x = r035Div(cross(c, b, f, e), determinant);
    const y = r035Div(cross(a, c, d, f), determinant);
    return { ...base, kind: "unique", point: { x, y } };
  }

  const first = rowKind(equations[0]);
  const second = rowKind(equations[1]);
  if (first === "contradiction" || second === "contradiction")
    return { ...base, kind: "inconsistent", point: null };
  if (first === "identity" && second === "identity")
    return { ...base, kind: "whole-plane", point: null };
  if (first === "identity" || second === "identity")
    return { ...base, kind: "one-line", point: null };
  const same = cross(a, c, d, f).n === 0n && cross(b, c, e, f).n === 0n;
  return { ...base, kind: same ? "coincident" : "parallel", point: null };
}

function evaluateRow([a, b, right]: Eq036SystemRow, { x, y }: Eq036SystemPoint) {
  const left = r035Add(r035Mul(a, x), r035Mul(b, y));
  const difference = r035Sub(left, right);
  return { left, right, difference, holds: difference.n === 0n };
}

/** Confirm coordinates in their original order, in both original equations. */
export function checkEq036SystemPoint(
  input: Eq036SystemInput,
  trial: { x: Eq036SystemScalar; y: Eq036SystemScalar },
) {
  const point = { x: exact(trial.x), y: exact(trial.y) };
  const [first, second] = rows(input);
  const checks = [evaluateRow(first, point), evaluateRow(second, point)] as const;
  return { rows: checks, holds: checks[0].holds && checks[1].holds };
}

type OneVariable = { variable: Variable; coefficient: R035; constant: R035 };
export type Eq036SystemReduction = OneVariable & (
  { kind: "fixed"; value: R035 } | { kind: "identity" | "contradiction"; value: null }
);

function index(variable: Variable): RowIndex {
  if (variable === "x") return 0;
  if (variable === "y") return 1;
  throw new RangeError("Bilinmeyen x veya y olmalı.");
}

function other(index: RowIndex): RowIndex {
  return index === 0 ? 1 : 0;
}

function variableName(index: RowIndex): Variable {
  return index === 0 ? "x" : "y";
}

function reduce(equation: OneVariable): Eq036SystemReduction {
  const { coefficient, constant } = equation;
  if (coefficient.n === 0n)
    return { ...equation, kind: constant.n === 0n ? "identity" : "contradiction", value: null };
  return { ...equation, kind: "fixed", value: r035Div(constant, coefficient) };
}

function scaleRow([a, b, c]: Eq036SystemRow, factor: bigint): Eq036SystemRow {
  const multiplier = r035(factor);
  return [r035Mul(a, multiplier), r035Mul(b, multiplier), r035Mul(c, multiplier)];
}

function addRows([a, b, c]: Eq036SystemRow, [d, e, f]: Eq036SystemRow): Eq036SystemRow {
  return [r035Add(a, d), r035Add(b, e), r035Add(c, f)];
}

/** Keep the displayed retained equation alongside the reduced equation. */
export function eliminateEq036System(input: Eq036SystemInput, eliminated: Variable) {
  const equations = rows(input);
  const target = index(eliminated);
  const remaining = other(target);
  const first = equations[0][target];
  const second = equations[1][target];
  const alreadyIsolated = first.n === 0n || second.n === 0n;
  const base = { eliminated };
  if (first.n === 0n && second.n === 0n) {
    return {
      ...base,
      kind: "absent" as const,
      combinedRow: null,
      retainedRowIndex: null,
      multipliers: null,
      scaledRows: null,
      reduction: null,
      point: null,
    };
  }

  // a/b = n/d implies d·a − n·b = 0. Both factors are nonzero here.
  const ratio = alreadyIsolated ? null : r035Div(first, second);
  const multipliers = ratio ? [ratio.d, -ratio.n] as const : null;
  const scaledRows = multipliers
    ? [scaleRow(equations[0], multipliers[0]), scaleRow(equations[1], multipliers[1])] as const
    : null;
  const retainedRowIndex = first.n === 0n ? 1 : 0;
  const combinedRow = scaledRows
    ? addRows(...scaledRows)
    : equations[other(retainedRowIndex)];
  const reduction = reduce({
    variable: variableName(remaining),
    coefficient: combinedRow[remaining],
    constant: combinedRow[2],
  });
  let point: Eq036SystemPoint | null = null;
  if (reduction.kind === "fixed") {
    const retained = equations[retainedRowIndex];
    const known = reduction.value;
    const back = r035Div(r035Sub(retained[2], r035Mul(retained[remaining], known)), retained[target]);
    point = target === 0 ? { x: back, y: known } : { x: known, y: back };
  }
  return {
    ...base,
    kind: alreadyIsolated ? "already-isolated" as const : "combined" as const,
    combinedRow,
    retainedRowIndex,
    multipliers,
    scaledRows,
    reduction,
    point,
  };
}

/** Insert the isolated expression into the other equation, never itself. */
export function substituteEq036System(input: Eq036SystemInput, sourceRowIndex: RowIndex, variable: Variable) {
  if (sourceRowIndex !== 0 && sourceRowIndex !== 1) throw new RangeError("Denklem sırası 0 veya 1 olmalı.");
  const equations = rows(input);
  const source = equations[sourceRowIndex];
  const target = index(variable);
  const remaining = other(target);
  if (source[target].n === 0n) {
    return {
      kind: "cannot-isolate" as const,
      sourceRowIndex,
      isolated: null,
      reduced: null,
      reduction: null,
      point: null,
    };
  }
  const isolated = {
    variable,
    constant: r035Div(source[2], source[target]),
    otherCoefficient: r035Div(r035Neg(source[remaining]), source[target]),
  };
  const destination = equations[other(sourceRowIndex)];
  const reduced = {
    variable: variableName(remaining),
    coefficient: r035Add(
      destination[remaining], r035Mul(destination[target], isolated.otherCoefficient),
    ),
    constant: r035Sub(destination[2], r035Mul(destination[target], isolated.constant)),
  };
  const reduction = reduce(reduced);
  let point: Eq036SystemPoint | null = null;
  if (reduction.kind === "fixed") {
    const known = reduction.value;
    const back = r035Add(isolated.constant, r035Mul(isolated.otherCoefficient, known));
    point = target === 0 ? { x: back, y: known } : { x: known, y: back };
  }
  return { kind: "substituted" as const, sourceRowIndex, isolated, reduced, reduction, point };
}

export type Eq036SystemGraphBounds = {
  minX: Eq036SystemScalar;
  maxX: Eq036SystemScalar;
  minY: Eq036SystemScalar;
  maxY: Eq036SystemScalar;
};
type ExactBounds = { [Key in keyof Eq036SystemGraphBounds]: R035 };

function inRange(value: R035, min: R035, max: R035): boolean {
  return r035Compare(value, min) >= 0 && r035Compare(value, max) <= 0;
}

function inside(point: Eq036SystemPoint, bounds: ExactBounds): boolean {
  return inRange(point.x, bounds.minX, bounds.maxX)
    && inRange(point.y, bounds.minY, bounds.maxY);
}

function samePoint(a: Eq036SystemPoint, b: Eq036SystemPoint): boolean {
  return r035Compare(a.x, b.x) === 0 && r035Compare(a.y, b.y) === 0;
}

type GraphRow = {
  kind: "segment" | "point" | "offscreen" | "identity" | "contradiction";
  points: readonly Eq036SystemPoint[];
  /** A null means the axis has no single intercept. */
  axisIntercepts: { x: Eq036SystemPoint | null; y: Eq036SystemPoint | null };
};

function graphRow(equation: Eq036SystemRow, bounds: ExactBounds): GraphRow {
  const [a, b, c] = equation;
  const kind = rowKind(equation);
  const points: Eq036SystemPoint[] = [];
  const axisIntercepts = {
    x: a.n === 0n ? null : { x: r035Div(c, a), y: r035(0) },
    y: b.n === 0n ? null : { x: r035(0), y: r035Div(c, b) },
  };
  if (kind !== "line") return { kind, points, axisIntercepts };
  function add(point: Eq036SystemPoint) {
    if (inside(point, bounds) && !points.some((prior) => samePoint(prior, point))) points.push(point);
  }
  if (b.n !== 0n) {
    for (const x of [bounds.minX, bounds.maxX])
      add({ x, y: r035Div(r035Sub(c, r035Mul(a, x)), b) });
  }
  if (a.n !== 0n) {
    for (const y of [bounds.minY, bounds.maxY])
      add({ x: r035Div(r035Sub(c, r035Mul(b, y)), a), y });
  }
  const clippedKind = points.length === 2 ? "segment" : points.length === 1 ? "point" : "offscreen";
  return { kind: clippedKind, points, axisIntercepts };
}

/** Exact mathematical positions. The renderer can project only the clipped, visible points. */
export function graphEq036System(input: Eq036SystemInput, viewport: Eq036SystemGraphBounds) {
  const bounds = {
    minX: exact(viewport.minX),
    maxX: exact(viewport.maxX),
    minY: exact(viewport.minY),
    maxY: exact(viewport.maxY),
  };
  if (r035Compare(bounds.minX, bounds.maxX) >= 0 || r035Compare(bounds.minY, bounds.maxY) >= 0)
    throw new RangeError("Grafikte alt sınırlar üst sınırlardan küçük olmalı.");
  const solution = solveEq036System(input);
  const drawn = [graphRow(solution.rows[0], bounds), graphRow(solution.rows[1], bounds)] as const;
  const intersection = solution.point
    ? { point: solution.point, visible: inside(solution.point, bounds) }
    : null;
  return { solution, rows: drawn, intersection };
}

/** Receipts have nonnegative integer counts and nonnegative totals; unit prices must be positive. */
export function priceEq036System(receipts: Eq036SystemInput) {
  const equations = rows(receipts);
  for (const [first, second, total] of equations) {
    if (first.n < 0n || first.d !== 1n || second.n < 0n || second.d !== 1n || total.n < 0n)
      throw new RangeError("Adetler negatif olmayan tam sayı, toplam ücret negatif olmayan sayı olmalı.");
  }
  const solution = solveEq036System(equations);
  const checks = solution.point ? checkEq036SystemPoint(equations, solution.point) : null;
  if (solution.point) {
    const kind = solution.point.x.n > 0n && solution.point.y.n > 0n ? "valid" : "impossible";
    return { kind, solution, checks } as const;
  }
  const zeroPaid = equations.some(([a, b, c]) => (a.n !== 0n || b.n !== 0n) && c.n === 0n);
  const contradictory = solution.kind === "parallel" || solution.kind === "inconsistent";
  return { kind: zeroPaid || contradictory ? "impossible" : "not-determined", solution, checks } as const;
}

/** A → B transfer under nonnegative litre amounts and equal post-transfer amounts. */
export function transferEq036System(total: Eq036SystemScalar, amount: Eq036SystemScalar) {
  const combined = exact(total);
  const moved = exact(amount);
  if (combined.n < 0n || moved.n < 0n) throw new RangeError("Miktar ve aktarım negatif olamaz.");
  const equations = [[1, 1, combined], [1, -1, r035Mul(r035(2), moved)]] as const;
  const solution = solveEq036System(equations);
  if (solution.kind !== "unique") throw new Error("Aktarım modeli tek bir başlangıç çifti gerektirir.");
  const initial = solution.point;
  const possible = initial.y.n >= 0n && r035Compare(initial.x, moved) >= 0;
  const after = possible ? { x: r035Sub(initial.x, moved), y: r035Add(initial.y, moved) } : null;
  return {
    kind: possible ? "valid" as const : "impossible" as const,
    solution,
    initial,
    after,
    totalAfter: after ? r035Add(after.x, after.y) : null,
    checks: checkEq036SystemPoint(equations, initial),
  };
}
