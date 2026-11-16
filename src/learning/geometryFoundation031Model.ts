/** Coordinate-based models shared by the drawings and their numeric evidence.
 * A side named a is opposite A (BC); b = CA; c = AB. Lengths are in units.
 */
export type Geometry031Point = { x: number; y: number };
export const geometry031Bounds = (value: number, low: number, high: number) =>
  Number.isFinite(value) ? Math.min(high, Math.max(low, value)) : low;
export const geometry031Distance = (a: Geometry031Point, b: Geometry031Point) =>
  Math.hypot(a.x - b.x, a.y - b.y);
export const geometry031Mix = (
  a: Geometry031Point,
  b: Geometry031Point,
  t: number,
) => ({
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
});
const cross = (a: Geometry031Point, b: Geometry031Point, c: Geometry031Point) =>
  (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
function finitePoint(p: Geometry031Point) {
  if (!Number.isFinite(p.x) || !Number.isFinite(p.y))
    throw new RangeError("Nokta koordinatları sonlu olmalı.");
}
export function geometry031Triangle(
  A: Geometry031Point,
  B: Geometry031Point,
  C: Geometry031Point,
) {
  [A, B, C].forEach(finitePoint);
  const a = geometry031Distance(B, C),
    b = geometry031Distance(C, A),
    c = geometry031Distance(A, B);
  const area = Math.abs(cross(A, B, C)) / 2;
  const perimeter = a + b + c;
  if (![a, b, c, area, perimeter].every(Number.isFinite))
    throw new RangeError("Koordinatlar hesaplanabilir büyüklükte olmalı.");
  const valid =
    Math.min(a, b, c) > 0 &&
    area > Number.EPSILON * Math.max(a, b, c) ** 2 * 16;
  const angle = (
    u: Geometry031Point,
    v: Geometry031Point,
    w: Geometry031Point,
  ) => {
    const ux = v.x - u.x,
      uy = v.y - u.y,
      vx = w.x - u.x,
      vy = w.y - u.y;
    return (
      (Math.atan2(Math.abs(ux * vy - uy * vx), ux * vx + uy * vy) * 180) /
      Math.PI
    );
  };
  return {
    A,
    B,
    C,
    a,
    b,
    c,
    area,
    perimeter,
    valid,
    angles: valid
      ? { A: angle(A, B, C), B: angle(B, C, A), C: angle(C, A, B) }
      : null,
  };
}
export function geometry031FromSides(a: number, b: number, c: number) {
  if (![a, b, c].every((n) => Number.isFinite(n) && n > 0))
    return { kind: "invalid" as const, triangle: null };
  const eps = 1e-10 * Math.max(a, b, c);
  const gap = Math.min(a + b - c, b + c - a, c + a - b);
  if (gap < -eps) return { kind: "impossible" as const, triangle: null };
  const x = (b * b + c * c - a * a) / (2 * c);
  if (Math.abs(gap) <= eps)
    return {
      kind: "degenerate" as const,
      triangle: null,
      collinear: { x, y: 0 },
    };
  const y = Math.sqrt(Math.max(0, b * b - x * x));
  const triangle = geometry031Triangle(
    { x: 0, y: 0 },
    { x: c, y: 0 },
    { x, y },
  );
  return { kind: "valid" as const, triangle };
}
export function geometry031Right(ab: number, ac: number) {
  if (![ab, ac].every((n) => Number.isFinite(n) && n > 0))
    throw new RangeError("Dik kenarlar pozitif ve sonlu olmalı.");
  const triangle = geometry031Triangle(
    { x: 0, y: 0 },
    { x: ab, y: 0 },
    { x: 0, y: ac },
  );
  const hypotenuse = Math.hypot(ab, ac);
  if (
    !triangle.valid ||
    !Number.isFinite(ab * ab + ac * ac) ||
    ab * ab + ac * ac === 0
  )
    throw new RangeError("Dik kenarlar hesaplanabilir büyüklükte olmalı.");
  const t = (ab * ab) / (ab * ab + ac * ac);
  const H = geometry031Mix(triangle.B, triangle.C, t);
  const p = (ab * ab) / hypotenuse,
    q = (ac * ac) / hypotenuse;
  return {
    ...triangle,
    H,
    hypotenuse,
    p,
    q,
    height: (ab * ac) / hypotenuse,
    abSquare: ab * ab,
    acSquare: ac * ac,
    hypotenuseSquare: ab * ab + ac * ac,
  };
}
export function geometry031Centers(
  A: Geometry031Point,
  B: Geometry031Point,
  C: Geometry031Point,
) {
  const triangle = geometry031Triangle(A, B, C);
  if (!triangle.valid) return null;
  const { a, b, c, perimeter, area } = triangle;
  const centroid = { x: (A.x + B.x + C.x) / 3, y: (A.y + B.y + C.y) / 3 };
  const incenter = {
    x: (a * A.x + b * B.x + c * C.x) / perimeter,
    y: (a * A.y + b * B.y + c * C.y) / perimeter,
  };
  const midpoint = geometry031Mix(B, C, 0.5);
  const bisectorFoot = {
    x: (b * B.x + c * C.x) / (b + c),
    y: (b * B.y + c * C.y) / (b + c),
  };
  const u = { x: B.x - A.x, y: B.y - A.y },
    v = { x: C.x - A.x, y: C.y - A.y };
  const determinant = 2 * (u.x * v.y - u.y * v.x);
  const square = (p: Geometry031Point) => p.x * p.x + p.y * p.y;
  const circumcenter = {
    x: A.x + (square(u) * v.y - square(v) * u.y) / determinant,
    y: A.y + (u.x * square(v) - v.x * square(u)) / determinant,
  };
  const orthocenter = {
    x: A.x + B.x + C.x - 2 * circumcenter.x,
    y: A.y + B.y + C.y - 2 * circumcenter.y,
  };
  const foot = (
    p: Geometry031Point,
    u: Geometry031Point,
    v: Geometry031Point,
  ) => {
    const t =
      ((p.x - u.x) * (v.x - u.x) + (p.y - u.y) * (v.y - u.y)) /
      ((v.x - u.x) ** 2 + (v.y - u.y) ** 2);
    return geometry031Mix(u, v, t);
  };
  return {
    ...triangle,
    centroid,
    incenter,
    midpoint,
    bisectorFoot,
    inradius: (2 * area) / perimeter,
    medianAG: geometry031Distance(A, centroid),
    medianGM: geometry031Distance(centroid, midpoint),
    bd: geometry031Distance(B, bisectorFoot),
    dc: geometry031Distance(bisectorFoot, C),
    circumcenter,
    circumradius: geometry031Distance(A, circumcenter),
    orthocenter,
    altitudeFootA: foot(A, B, C),
    altitudeFootB: foot(B, C, A),
    altitudeFootC: foot(C, A, B),
  };
}
export function geometry031Similarity(t: number) {
  if (!Number.isFinite(t) || t <= 0 || t > 1)
    throw new RangeError(
      "Benzerlik oranı 0 ile 1 arasında, sıfırdan büyük olmalı.",
    );
  const A = { x: 0, y: 8 },
    B = { x: 0, y: 0 },
    C = { x: 10, y: 0 };
  const D = geometry031Mix(A, B, t),
    E = geometry031Mix(A, C, t);
  return {
    A,
    B,
    C,
    D,
    E,
    t,
    big: geometry031Triangle(A, B, C),
    small: geometry031Triangle(A, D, E),
    areaFactor: t * t,
  };
}
export function geometry031Angles(degrees: number) {
  const theta = geometry031Bounds(degrees, 20, 160);
  return {
    theta,
    vertical: theta,
    adjacent: 180 - theta,
    turn: 360,
    corresponding: theta,
  };
}
