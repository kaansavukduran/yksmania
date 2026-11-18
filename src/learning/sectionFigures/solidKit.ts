import { seg, poly, type El, type Tone, type V } from "./figureKit";

/** 3D point: x right, y up, z away from the viewer. */
export type P3 = readonly [number, number, number];

// Cabinet-style oblique projection: depth recedes up and to the right.
const K = 0.5;
const C = Math.cos(Math.PI / 6) * K;
const S = Math.sin(Math.PI / 6) * K;
export const proj = (p: P3): V => [p[0] + C * p[2], p[1] + S * p[2]];
// Direction that projects to a single point; faces whose outward normal
// points against it are the visible ones.
const D: P3 = [-C, -S, 1];

const sub3 = (a: P3, b: P3): P3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const cross = (a: P3, b: P3): P3 => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
const dot3 = (a: P3, b: P3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

export interface SolidStyle {
  tone?: Tone;
  /** Face index → fill tone, for highlighting a base or a face. */
  fills?: Record<number, Tone>;
}

/**
 * Draw a convex polyhedron. Faces list vertex indices in any order around
 * the face; outward orientation is derived from the solid's centroid.
 * Hidden edges (no adjacent visible face) are dashed.
 */
export function solid(vs: P3[], faces: number[][], style: SolidStyle = {}): El[] {
  const cen: P3 = [0, 1, 2].map(
    (k) => vs.reduce((s, p) => s + p[k], 0) / vs.length,
  ) as unknown as P3;
  const visible = faces.map((f) => {
    const n = cross(sub3(vs[f[1]], vs[f[0]]), sub3(vs[f[2]], vs[f[0]]));
    const out = dot3(n, sub3(vs[f[0]], cen)) > 0 ? n : ([-n[0], -n[1], -n[2]] as P3);
    return dot3(out, D) < -1e-9;
  });
  const edges = new Map<string, { a: number; b: number; vis: boolean }>();
  faces.forEach((f, fi) => {
    f.forEach((a, i) => {
      const b = f[(i + 1) % f.length];
      const key = a < b ? `${a}-${b}` : `${b}-${a}`;
      const e = edges.get(key) ?? { a, b, vis: false };
      e.vis = e.vis || visible[fi];
      edges.set(key, e);
    });
  });
  const els: El[] = [];
  faces.forEach((f, fi) => {
    const fill = style.fills?.[fi];
    if (fill) els.push(poly(f.map((i) => proj(vs[i])), { fill, thin: true, tone: fill }));
  });
  const list = [...edges.values()];
  // Hidden edges first so visible strokes paint over them.
  for (const e of list.filter((x) => !x.vis))
    els.push(seg(proj(vs[e.a]), proj(vs[e.b]), { dash: true, thin: true, tone: "muted" }));
  for (const e of list.filter((x) => x.vis))
    els.push(seg(proj(vs[e.a]), proj(vs[e.b]), { tone: style.tone }));
  return els;
}

/** Right prism over a base polygon lying in the horizontal plane y = 0. */
export function prism(base: [number, number][], h: number, style: SolidStyle = {}) {
  const n = base.length;
  const vs: P3[] = [
    ...base.map(([x, z]) => [x, 0, z] as P3),
    ...base.map(([x, z]) => [x, h, z] as P3),
  ];
  const faces = [
    base.map((_, i) => i),
    base.map((_, i) => n + i),
    ...base.map((_, i) => [i, (i + 1) % n, n + ((i + 1) % n), n + i]),
  ];
  return { vs, els: solid(vs, faces, style) };
}

/** Pyramid over a base polygon in y = 0 with the given apex. */
export function pyramid(base: [number, number][], apex: P3, style: SolidStyle = {}) {
  const n = base.length;
  const vs: P3[] = [...base.map(([x, z]) => [x, 0, z] as P3), apex];
  const faces = [base.map((_, i) => i), ...base.map((_, i) => [i, (i + 1) % n, n])];
  return { vs, els: solid(vs, faces, style) };
}

export const regularBase = (n: number, r: number, start = -90): [number, number][] =>
  Array.from({ length: n }, (_, i) => {
    const t = ((start + (360 * i) / n) * Math.PI) / 180;
    return [r * Math.cos(t), r * Math.sin(t)];
  });
