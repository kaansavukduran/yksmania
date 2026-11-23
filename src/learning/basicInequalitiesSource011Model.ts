import {
  r035,
  r035Add,
  r035Compare,
  r035Div,
  r035Mul,
  r035Neg,
  r035Sub,
  r035Text,
  type R035,
} from "./rationalSource035Model";

const ZERO = r035(0);
const ONE = r035(1);

export type PlanePoint011 = { x: R035; y: R035 };
export type Plane011 = {
  // This activity varies a bounded family: x ≥ L, y ≥ B, a x + b y ≤ U with a,b > 0.
  xMin: R035;
  yMin: R035;
  xCoefficient: R035;
  yCoefficient: R035;
  cap: R035;
  xClosed: boolean;
  yClosed: boolean;
  capClosed: boolean;
};

export const PLANE_TRIANGLE_011: Plane011 = {
  xMin: ONE,
  yMin: ZERO,
  xCoefficient: ONE,
  yCoefficient: ONE,
  cap: r035(4),
  xClosed: true,
  yClosed: true,
  capClosed: true,
};

export const PLANE_INTEGER_011: Plane011 = {
  ...PLANE_TRIANGLE_011,
  xMin: ZERO,
  xCoefficient: r035(2),
  cap: r035(6),
};

function planeComparisons(input: Plane011, point: PlanePoint011) {
  return [
    {
      boundary: "x",
      left: point.x,
      right: input.xMin,
      direction: "above",
      closed: input.xClosed,
    },
    {
      boundary: "y",
      left: point.y,
      right: input.yMin,
      direction: "above",
      closed: input.yClosed,
    },
    {
      boundary: "cap",
      left: r035Add(
        r035Mul(input.xCoefficient, point.x),
        r035Mul(input.yCoefficient, point.y),
      ),
      right: input.cap,
      direction: "below",
      closed: input.capClosed,
    },
  ] as const;
}

export function testPlanePoint011(input: Plane011, point: PlanePoint011) {
  const checks = planeComparisons(input, point).map((constraint) => {
    const comparison = r035Compare(constraint.left, constraint.right);
    const onBoundary = comparison === 0;
    const satisfies = onBoundary
      ? constraint.closed
      : comparison === (constraint.direction === "above" ? 1 : -1);
    return { ...constraint, comparison, onBoundary, satisfies };
  });
  return { checks, accepted: checks.every(({ satisfies }) => satisfies) };
}

function planeY(input: Plane011, x: R035) {
  return r035Div(
    r035Sub(input.cap, r035Mul(input.xCoefficient, x)),
    input.yCoefficient,
  );
}

export function solvePlane011(input: Plane011) {
  if (
    r035Compare(input.xCoefficient, ZERO) <= 0 ||
    r035Compare(input.yCoefficient, ZERO) <= 0
  ) {
    throw new RangeError("İki katsayı da pozitif olmalı.");
  }
  const base = { x: input.xMin, y: input.yMin };
  const capComparison = testPlanePoint011(input, base).checks[2].comparison;
  const xAtYMin = r035Div(
    r035Sub(input.cap, r035Mul(input.yCoefficient, input.yMin)),
    input.xCoefficient,
  );
  const yAtXMin = planeY(input, input.xMin);
  const onePoint =
    capComparison === 0 && input.xClosed && input.yClosed && input.capClosed;
  const shape = capComparison < 0 ? "triangle" : onePoint ? "point" : "empty";
  const points =
    shape === "triangle"
      ? [base, { x: xAtYMin, y: input.yMin }, { x: input.xMin, y: yAtXMin }]
      : onePoint
        ? [base]
        : [];
  const vertices = points.map((point) => ({
    ...point,
    included: testPlanePoint011(input, point).accepted,
  }));
  const edges =
    shape === "triangle"
      ? ([
          {
            boundary: "y",
            from: vertices[0],
            to: vertices[1],
            included: input.yClosed,
          },
          {
            boundary: "cap",
            from: vertices[1],
            to: vertices[2],
            included: input.capClosed,
          },
          {
            boundary: "x",
            from: vertices[2],
            to: vertices[0],
            included: input.xClosed,
          },
        ] as const)
      : [];
  return { shape, vertices, edges, xAtYMin, yAtXMin };
}

function floor011(q: R035): bigint {
  const { n, d } = r035(q.n, q.d);
  return n / d - (n < 0n && n % d !== 0n ? 1n : 0n);
}

function ceil011(q: R035): bigint {
  return -floor011(r035Neg(q));
}

export function planeIntegerPairs011(input: Plane011) {
  const region = solvePlane011(input);
  const rows: { x: bigint; fromY: bigint; toY: bigint; count: bigint }[] = [];
  const pairs: PlanePoint011[] = [];
  if (region.shape === "empty") return { rows, pairs, count: 0n };
  const fromX = input.xClosed ? ceil011(input.xMin) : floor011(input.xMin) + 1n;
  const toX =
    input.capClosed && input.yClosed
      ? floor011(region.xAtYMin)
      : ceil011(region.xAtYMin) - 1n;
  const fromY = input.yClosed ? ceil011(input.yMin) : floor011(input.yMin) + 1n;
  if (toX - fromX >= 10_000n)
    throw new RangeError(
      "Bu etkinlikte en çok 10.000 tam sayı satırı çizilebilir.",
    );
  let count = 0n;
  for (let x = fromX; x <= toX; x++) {
    const upperY = planeY(input, r035(x));
    const toY = input.capClosed ? floor011(upperY) : ceil011(upperY) - 1n;
    if (fromY > toY) continue;
    const rowCount = toY - fromY + 1n;
    count += rowCount;
    if (count > 10_000n)
      throw new RangeError(
        "Bu etkinlikte en çok 10.000 sıralı ikili çizilebilir.",
      );
    rows.push({ x, fromY, toY, count: rowCount });
    for (let y = fromY; y <= toY; y++) pairs.push({ x: r035(x), y: r035(y) });
  }
  return { rows, pairs, count };
}

type FiniteEndpoint011 = { value: R035; closed: boolean };
type Endpoint011 = { value: R035 | null; closed: boolean };
export type FiniteInterval011 = {
  low: FiniteEndpoint011;
  high: FiniteEndpoint011;
};
export type Interval011 = { low: Endpoint011; high: Endpoint011 };
export type IntervalOperation011 = "add" | "subtract" | "multiply" | "divide";

export function interval011(
  low: R035,
  high: R035,
  lowClosed: boolean,
  highClosed: boolean,
): FiniteInterval011 {
  const order = r035Compare(low, high);
  if (order > 0 || (order === 0 && !(lowClosed && highClosed))) {
    throw new RangeError(
      "Alt uç üst uçtan küçük olmalı. Uçlar eşitse ikisi de dahil olmalı.",
    );
  }
  return {
    low: { value: low, closed: lowClosed },
    high: { value: high, closed: highClosed },
  };
}

export function intervalText011(intervals: readonly Interval011[]) {
  if (intervals.length === 0) return "∅";
  return intervals
    .map(({ low, high }) => {
      if (low.value === null && high.value === null) return "ℝ";
      if (low.value && high.value && r035Compare(low.value, high.value) === 0)
        return `{${r035Text(low.value)}}`;
      return `${low.closed ? "[" : "("}${low.value ? r035Text(low.value) : "−∞"}, ${high.value ? r035Text(high.value) : "∞"}${high.closed ? "]" : ")"}`;
    })
    .join(" ∪ ");
}

function containsZero({ low, high }: Interval011) {
  const below =
    low.value === null ||
    r035Compare(low.value, ZERO) < 0 ||
    (r035Compare(low.value, ZERO) === 0 && low.closed);
  const above =
    high.value === null ||
    r035Compare(high.value, ZERO) > 0 ||
    (r035Compare(high.value, ZERO) === 0 && high.closed);
  return below && above;
}

function endpoint(
  op: (a: R035, b: R035) => R035,
  a: FiniteEndpoint011,
  b: FiniteEndpoint011,
) {
  return { value: op(a.value, b.value), closed: a.closed && b.closed };
}

function extreme(
  candidates: FiniteEndpoint011[],
  direction: -1 | 1,
): FiniteEndpoint011 {
  return candidates.reduce((best, next) => {
    const order = r035Compare(next.value, best.value);
    if (order === 0)
      return { value: best.value, closed: best.closed || next.closed };
    return order === direction ? next : best;
  });
}

const infinity: Endpoint011 = { value: null, closed: false };
const zeroEndpoint: FiniteEndpoint011 = { value: ZERO, closed: true };

export function reciprocalInterval011(input: FiniteInterval011) {
  const { low, high } = interval011(
    input.low.value,
    input.high.value,
    input.low.closed,
    input.high.closed,
  );
  const lowSign = r035Compare(low.value, ZERO);
  const highSign = r035Compare(high.value, ZERO);
  const reciprocal = ({ value, closed }: FiniteEndpoint011) => ({
    value: r035Div(ONE, value),
    closed,
  });
  const intervals: Interval011[] = [];
  if (lowSign < 0)
    intervals.push({
      low: highSign < 0 ? reciprocal(high) : infinity,
      high: reciprocal(low),
    });
  if (highSign > 0)
    intervals.push({
      low: reciprocal(high),
      high: lowSign > 0 ? reciprocal(low) : infinity,
    });
  return {
    intervals,
    excludedZero: containsZero({ low, high }),
    approachesZero: lowSign <= 0 && highSign >= 0,
  };
}

function product011(a: FiniteInterval011, b: Interval011): Interval011 {
  const bounds = [b.low, b.high].filter(
    (bound): bound is FiniteEndpoint011 => bound.value !== null,
  );
  const candidates = [a.low, a.high].flatMap((x) =>
    bounds.map((y) => endpoint(r035Mul, x, y)),
  );
  if (containsZero(a) || containsZero(b)) candidates.push(zeroEndpoint);
  const mayBePositive = r035Compare(a.high.value, ZERO) > 0;
  const mayBeNegative = r035Compare(a.low.value, ZERO) < 0;
  const lowUnbounded =
    (b.low.value === null && mayBePositive) ||
    (b.high.value === null && mayBeNegative);
  const highUnbounded =
    (b.high.value === null && mayBePositive) ||
    (b.low.value === null && mayBeNegative);
  return {
    low: lowUnbounded ? infinity : extreme(candidates, -1),
    high: highUnbounded ? infinity : extreme(candidates, 1),
  };
}

function unionQuotient(intervals: Interval011[]): Interval011[] {
  if (intervals.length < 2) return intervals;
  // Two quotient branches only arise when the denominator spans both signs.
  // If they meet at an attainable 0, or overlap around 0, their union is ℝ or {0}.
  const [a, b] = intervals;
  if (containsZero(a) && containsZero(b)) {
    return [
      a.low.value === null || b.low.value === null
        ? { low: infinity, high: infinity }
        : a,
    ];
  }
  return [...intervals].sort((x, y) =>
    x.low.value === null
      ? -1
      : y.low.value === null
        ? 1
        : r035Compare(x.low.value, y.low.value),
  );
}

export function independentIntervals011(
  operation: IntervalOperation011,
  left: FiniteInterval011,
  right: FiniteInterval011,
) {
  const a = interval011(
    left.low.value,
    left.high.value,
    left.low.closed,
    left.high.closed,
  );
  const b = interval011(
    right.low.value,
    right.high.value,
    right.low.closed,
    right.high.closed,
  );
  const { low: al, high: ah } = a;
  const { low: bl, high: bh } = b;
  if (operation === "divide") {
    const reciprocal = reciprocalInterval011(b);
    return {
      ...reciprocal,
      intervals: unionQuotient(
        reciprocal.intervals.map((interval) => product011(a, interval)),
      ),
    };
  }
  const result =
    operation === "add"
      ? { low: endpoint(r035Add, al, bl), high: endpoint(r035Add, ah, bh) }
      : operation === "subtract"
        ? { low: endpoint(r035Sub, al, bh), high: endpoint(r035Sub, ah, bl) }
        : product011(a, b);
  return { intervals: [result], excludedZero: false, approachesZero: false };
}

export function sameVariableIntervals011(
  operation: IntervalOperation011,
  input: FiniteInterval011,
) {
  const a = interval011(
    input.low.value,
    input.high.value,
    input.low.closed,
    input.high.closed,
  );
  if (operation === "divide") {
    const reciprocal = reciprocalInterval011(a);
    const one = { value: ONE, closed: true };
    return {
      ...reciprocal,
      intervals: reciprocal.intervals.length ? [{ low: one, high: one }] : [],
    };
  }
  const scale = (bound: FiniteEndpoint011) => ({
    ...bound,
    value: r035Add(bound.value, bound.value),
  });
  const square = (bound: FiniteEndpoint011) => ({
    ...bound,
    value: r035Mul(bound.value, bound.value),
  });
  const squared = [square(a.low), square(a.high)];
  const interval =
    operation === "add"
      ? { low: scale(a.low), high: scale(a.high) }
      : operation === "subtract"
        ? { low: zeroEndpoint, high: zeroEndpoint }
        : {
            low: containsZero(a) ? zeroEndpoint : extreme(squared, -1),
            high: extreme(squared, 1),
          };
  return { intervals: [interval], excludedZero: false, approachesZero: false };
}
