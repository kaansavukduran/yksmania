/** Euclidean teaching models. All distances use the same input units. */
export interface Geometry032Point {
  x: number;
  y: number;
}
const bounded = (n: number, lo: number, hi: number, fallback: number) =>
  Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : fallback;
export function polygon032(count: number, side = 5) {
  const n = Math.round(bounded(count, 3, 12, 5));
  const length = bounded(side, 1, 30, 5);
  const radius = length / (2 * Math.sin(Math.PI / n));
  const vertices = Array.from({ length: n }, (_, i) => ({
    x: radius * Math.cos(-Math.PI / 2 + (i * 2 * Math.PI) / n),
    y: radius * Math.sin(-Math.PI / 2 + (i * 2 * Math.PI) / n),
  }));
  return {
    n,
    side: length,
    vertices,
    radius,
    interiorSum: (n - 2) * 180,
    interiorAngle: ((n - 2) * 180) / n,
    exteriorAngle: 360 / n,
    diagonals: (n * (n - 3)) / 2,
    fanTriangles: n - 2,
    perimeter: n * length,
  };
}
export function trapezoid032(
  bottom: number,
  top: number,
  height: number,
  offset: number,
) {
  const a = bounded(bottom, 3, 14, 10),
    b = bounded(top, 2, 12, 6),
    h = bounded(height, 2, 10, 5),
    s = bounded(offset, -6, 8, 2);
  return {
    a,
    b,
    h,
    offset: s,
    points: [
      { x: 0, y: 0 },
      { x: a, y: 0 },
      { x: s + b, y: h },
      { x: s, y: h },
    ],
    area: ((a + b) * h) / 2,
    midline: (a + b) / 2,
    leftSide: Math.hypot(s, h),
    rightSide: Math.hypot(s + b - a, h),
  };
}
export function kite032(horizontal: number, upper: number, lower: number) {
  const p = bounded(horizontal, 2, 12, 8),
    u = bounded(upper, 2, 10, 3),
    l = bounded(lower, 2, 10, 6);
  return {
    p,
    upper: u,
    lower: l,
    vertical: u + l,
    points: [
      { x: -p / 2, y: 0 },
      { x: 0, y: u },
      { x: p / 2, y: 0 },
      { x: 0, y: -l },
    ],
    area: (p * (u + l)) / 2,
    upperSide: Math.hypot(p / 2, u),
    lowerSide: Math.hypot(p / 2, l),
    bothBisect: Math.abs(u - l) < 1e-9,
  };
}
export function parallelogram032(base: number, height: number, shear: number) {
  const a = bounded(base, 3, 14, 10),
    h = bounded(height, 2, 10, 6),
    s = bounded(shear, -8, 8, 4),
    b = Math.hypot(h, s);
  const rectangle = Math.abs(s) < 1e-9,
    rhombus = Math.abs(a - b) < 1e-9;
  return {
    a,
    h,
    shear: s,
    side: b,
    points: [
      { x: 0, y: 0 },
      { x: a, y: 0 },
      { x: a + s, y: h },
      { x: s, y: h },
    ],
    area: a * h,
    perimeter: 2 * (a + b),
    diagonal1: Math.hypot(a + s, h),
    diagonal2: Math.hypot(a - s, h),
    rectangle,
    rhombus,
    square: rectangle && rhombus,
  };
}
export function prism032(width: number, depth: number, height: number) {
  const a = bounded(width, 3, 12, 8),
    b = bounded(depth, 2, 10, 5),
    h = bounded(height, 3, 12, 6);
  return {
    a,
    b,
    h,
    baseArea: a * b,
    lateralArea: 2 * (a + b) * h,
    surface: 2 * a * b + 2 * (a + b) * h,
    volume: a * b * h,
    baseDiagonal: Math.hypot(a, b),
    spaceDiagonal: Math.hypot(a, b, h),
  };
}
export function pyramid032(base: number, height: number, fraction: number) {
  const a = bounded(base, 4, 12, 8),
    h = bounded(height, 3, 12, 6),
    k = bounded(fraction, 0.2, 0.8, 0.5),
    apothem = Math.hypot(h, a / 2),
    edge = Math.hypot(h, a / Math.SQRT2),
    volume = (a * a * h) / 3;
  return {
    a,
    h,
    k,
    apothem,
    edge,
    baseArea: a * a,
    lateralArea: 2 * a * apothem,
    surface: a * a + 2 * a * apothem,
    volume,
    sectionSide: k * a,
    sectionArea: k * k * a * a,
    smallHeight: k * h,
    smallVolume: k * k * k * volume,
  };
}
export type Quad032Kind =
  "trapezoid" | "parallelogram" | "rectangle" | "rhombus" | "square" | "kite";
export const quad032Kinds: Quad032Kind[] = [
  "trapezoid",
  "parallelogram",
  "rectangle",
  "rhombus",
  "square",
  "kite",
];
export function quadrilateral032(kind: string) {
  const selected: Quad032Kind = quad032Kinds.includes(kind as Quad032Kind)
    ? (kind as Quad032Kind)
    : "square";
  const base =
    selected === "kite"
      ? kite032(8, 3, 6).points
      : selected === "trapezoid"
        ? trapezoid032(10, 6, 5, 2).points
        : selected === "rhombus"
          ? parallelogram032(10, 8, 6).points
          : parallelogram032(
              selected === "square" ? 8 : 10,
              selected === "square" ? 8 : 6,
              selected === "parallelogram" ? 3 : 0,
            ).points;
  const rectangle = selected === "rectangle" || selected === "square",
    rhombus = selected === "rhombus" || selected === "square",
    parallel = rectangle || rhombus || selected === "parallelogram";
  return {
    kind: selected,
    points: base,
    quadrilateral: true,
    trapezoid: parallel || selected === "trapezoid",
    parallelogram: parallel,
    rectangle,
    rhombus,
    square: selected === "square",
    kite: rhombus || selected === "kite",
  };
}
