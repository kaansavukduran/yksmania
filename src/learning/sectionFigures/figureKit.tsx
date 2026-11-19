import { useEffect, useId, useRef, useState } from "react";

/*
 * Section figures: one static or lightly interactive diagram for a single
 * theory section. Every coordinate is computed in a y-up math frame, then the
 * renderer fits the drawing into the SVG. Marks (arcs, right-angle squares,
 * ticks) are sized in pixels so they stay readable at any figure scale.
 * Changing a slider or step never records learning evidence.
 */

export type V = readonly [number, number];
export type Tone = "ink" | "a" | "b" | "c" | "muted" | "warn";

export const v = (x: number, y: number): V => [x, y];
export const add = (p: V, q: V): V => [p[0] + q[0], p[1] + q[1]];
export const sub = (p: V, q: V): V => [p[0] - q[0], p[1] - q[1]];
export const mul = (p: V, k: number): V => [p[0] * k, p[1] * k];
export const lerp = (p: V, q: V, t: number): V => add(p, mul(sub(q, p), t));
export const mid = (p: V, q: V): V => lerp(p, q, 0.5);
export const len = (p: V): number => Math.hypot(p[0], p[1]);
export const dist = (p: V, q: V): number => len(sub(p, q));
export const unit = (p: V): V => {
  const l = len(p) || 1;
  return [p[0] / l, p[1] / l];
};
export const rad = (deg: number) => (deg * Math.PI) / 180;
export const deg = (r: number) => (r * 180) / Math.PI;
/** Point at distance r from origin o in direction `angle` degrees (CCW). */
export const pol = (r: number, angle: number, o: V = [0, 0]): V => [
  o[0] + r * Math.cos(rad(angle)),
  o[1] + r * Math.sin(rad(angle)),
];
export const rot = (p: V, angle: number, o: V = [0, 0]): V => {
  const c = Math.cos(rad(angle));
  const s = Math.sin(rad(angle));
  const d = sub(p, o);
  return [o[0] + d[0] * c - d[1] * s, o[1] + d[0] * s + d[1] * c];
};
export const dot = (p: V, q: V) => p[0] * q[0] + p[1] * q[1];
/** Foot of the perpendicular from p to line ab. */
export const foot = (p: V, a: V, b: V): V => {
  const d = sub(b, a);
  return add(a, mul(d, dot(sub(p, a), d) / dot(d, d)));
};
/** Intersection of lines p1p2 and p3p4 (assumed non-parallel). */
export const meet = (p1: V, p2: V, p3: V, p4: V): V => {
  const d1 = sub(p2, p1);
  const d2 = sub(p4, p3);
  const den = d1[0] * d2[1] - d1[1] * d2[0];
  const t = ((p3[0] - p1[0]) * d2[1] - (p3[1] - p1[1]) * d2[0]) / den;
  return add(p1, mul(d1, t));
};
/** Angle at vertex o between rays o→p and o→q, in degrees (0..180). */
export const angleAt = (o: V, p: V, q: V) => {
  const a = unit(sub(p, o));
  const b = unit(sub(q, o));
  return deg(Math.acos(Math.max(-1, Math.min(1, dot(a, b)))));
};
export const centroid = (...ps: V[]): V =>
  mul(
    ps.reduce((s, p) => add(s, p), [0, 0] as V),
    1 / ps.length,
  );
export const incenter = (a: V, b: V, c: V): V => {
  const la = dist(b, c);
  const lb = dist(a, c);
  const lc = dist(a, b);
  const s = la + lb + lc;
  return [
    (la * a[0] + lb * b[0] + lc * c[0]) / s,
    (la * a[1] + lb * b[1] + lc * c[1]) / s,
  ];
};
export const circumcenter = (a: V, b: V, c: V): V => {
  const m1 = mid(a, b);
  const m2 = mid(b, c);
  const n1 = add(m1, rot(sub(b, a), 90));
  const n2 = add(m2, rot(sub(c, b), 90));
  return meet(m1, n1, m2, n2);
};
export const orthocenter = (a: V, b: V, c: V): V =>
  meet(a, foot(a, b, c), b, foot(b, a, c));
export const regular = (n: number, r: number, start = 90, o: V = [0, 0]) =>
  Array.from({ length: n }, (_, i) => pol(r, start + (360 * i) / n, o));

/** Rounded number for readouts, Turkish decimal comma. */
export const fmt = (x: number, digits = 1) => {
  const r = Number(x.toFixed(digits));
  return (Object.is(r, -0) ? 0 : r).toLocaleString("tr-TR", {
    maximumFractionDigits: digits,
  });
};

type Dir = "n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "nw" | "c";
interface Style {
  tone?: Tone;
  dash?: boolean;
  thin?: boolean;
  bold?: boolean;
}
export type El =
  | ({ k: "seg"; a: V; b: V } & Style)
  | ({ k: "line"; a: V; b: V; ext?: number } & Style)
  | ({ k: "ray"; a: V; b: V; ext?: number } & Style)
  | ({ k: "vec"; a: V; b: V } & Style)
  | ({ k: "poly"; ps: V[]; fill?: Tone; open?: boolean } & Style)
  | ({ k: "circle"; c: V; r: number; fill?: Tone } & Style)
  | { k: "pt"; p: V; label?: string; at?: Dir; tone?: Tone; hollow?: boolean }
  | {
      k: "angle";
      o: V;
      p: V;
      q: V;
      label?: string;
      tone?: Tone;
      r?: number;
      fill?: boolean;
      reflex?: boolean;
      double?: boolean;
    }
  | { k: "right"; o: V; p: V; q: V; tone?: Tone }
  | { k: "ticks"; a: V; b: V; n?: number; tone?: Tone }
  | { k: "par"; a: V; b: V; n?: number; tone?: Tone }
  | { k: "dim"; a: V; b: V; label: string; side?: 1 | -1 | V; tone?: Tone }
  | {
      k: "text";
      p: V;
      s: string;
      at?: Dir;
      tone?: Tone;
      small?: boolean;
      bold?: boolean;
    };

export const seg = (a: V, b: V, s: Style = {}): El => ({ k: "seg", a, b, ...s });
export const line = (a: V, b: V, s: Style & { ext?: number } = {}): El => ({
  k: "line",
  a,
  b,
  ...s,
});
export const ray = (a: V, b: V, s: Style & { ext?: number } = {}): El => ({
  k: "ray",
  a,
  b,
  ...s,
});
export const vec = (a: V, b: V, s: Style = {}): El => ({ k: "vec", a, b, ...s });
export const poly = (
  ps: V[],
  s: Style & { fill?: Tone; open?: boolean } = {},
): El => ({ k: "poly", ps, ...s });
export const circle = (
  c: V,
  r: number,
  s: Style & { fill?: Tone } = {},
): El => ({ k: "circle", c, r, ...s });
export const pt = (
  p: V,
  label?: string,
  at: Dir = "ne",
  tone?: Tone,
  hollow?: boolean,
): El => ({ k: "pt", p, label, at, tone, hollow });
export const ang = (
  o: V,
  p: V,
  q: V,
  label?: string,
  opts: {
    tone?: Tone;
    r?: number;
    fill?: boolean;
    reflex?: boolean;
    double?: boolean;
  } = {},
): El => ({ k: "angle", o, p, q, label, ...opts });
export const right = (o: V, p: V, q: V, tone?: Tone): El => ({
  k: "right",
  o,
  p,
  q,
  tone,
});
export const ticks = (a: V, b: V, n = 1, tone?: Tone): El => ({
  k: "ticks",
  a,
  b,
  n,
  tone,
});
export const par = (a: V, b: V, n = 1, tone?: Tone): El => ({
  k: "par",
  a,
  b,
  n,
  tone,
});
/** Length label beside segment ab; pass a point (e.g. the opposite vertex)
 * to place the label on the far side of it, or ±1 for a fixed side. */
export const dim = (
  a: V,
  b: V,
  label: string,
  side: 1 | -1 | V = 1,
  tone?: Tone,
): El => ({ k: "dim", a, b, label, side, tone });
/** Measured span for physics drawings: a thin line with end ticks plus the
 * dim label, for distances that are not already an edge of the figure. */
export const span = (a: V, b: V, label: string, side: 1 | -1 | V = 1, tone?: Tone): El[] => {
  const n = mul(unit([-(b[1] - a[1]), b[0] - a[0]]), 0.15);
  return [
    { k: "seg", a, b, tone, thin: true },
    { k: "seg", a: sub(a, n), b: add(a, n), tone, thin: true },
    { k: "seg", a: sub(b, n), b: add(b, n), tone, thin: true },
    { k: "dim", a, b, label, side, tone },
  ];
};
export const txt = (
  p: V,
  s: string,
  at: Dir = "c",
  opts: { tone?: Tone; small?: boolean; bold?: boolean } = {},
): El => ({ k: "text", p, s, at, ...opts });

export interface FigureFrame {
  els: El[];
  /** Short result lines shown under the drawing; announced politely. */
  readout?: string[];
  /** Key for lettered tokens, rendered as wrapping HTML under the drawing. */
  legend?: { code: string; label: string; tone: Tone }[];
}
export interface FigureDef {
  /** One-sentence caption: what to look for in the drawing. */
  caption: string;
  /** Text alternative describing the geometry for screen readers. */
  alt: string;
  param?: {
    label: string;
    min: number;
    max: number;
    step: number;
    init: number;
    unit?: string;
    /** Play once from start to end (story timelines) instead of sweeping. */
    once?: boolean;
    /** Playback duration in milliseconds (default 6000). */
    playMs?: number;
  };
  /** Labels for a step-by-step build. draw() receives the step index. */
  steps?: string[];
  draw: (value: number, step: number) => FigureFrame;
}

const W = 640;
const PAD = 34;
const MAX_H = 380;
const DIRS: Record<Dir, [number, number]> = {
  n: [0, -1],
  ne: [0.72, -0.72],
  e: [1, 0],
  se: [0.72, 0.72],
  s: [0, 1],
  sw: [-0.72, 0.72],
  w: [-1, 0],
  nw: [-0.72, -0.72],
  c: [0, 0],
};
const anchorFor = (d: Dir) =>
  d === "e" || d === "ne" || d === "se"
    ? "start"
    : d === "w" || d === "nw" || d === "sw"
      ? "end"
      : "middle";
const baselineShift = (d: Dir) =>
  d === "s" || d === "se" || d === "sw" ? 0.75 : d === "e" || d === "w" || d === "c" ? 0.35 : 0;

function extendPoints(el: El): V[] {
  switch (el.k) {
    case "seg":
    case "vec":
    case "dim":
    case "ticks":
    case "par":
      return [el.a, el.b];
    case "line": {
      const d = mul(unit(sub(el.b, el.a)), el.ext ?? 0.6);
      return [sub(el.a, d), add(el.b, d)];
    }
    case "ray": {
      const d = mul(unit(sub(el.b, el.a)), el.ext ?? 0.6);
      return [el.a, add(el.b, d)];
    }
    case "poly":
      return el.ps;
    case "circle":
      return [
        add(el.c, [el.r, el.r]),
        sub(el.c, [el.r, el.r]),
      ];
    case "pt":
    case "text":
      return [el.p];
    case "angle":
    case "right":
      return [el.o];
  }
}

/** Math-frame position of a dim label for a given scale (pixels per unit). */
function dimLabelPoint(el: Extract<El, { k: "dim" }>, scale: number): V {
  const d = unit(sub(el.b, el.a));
  let n: V = [-d[1], d[0]];
  const m = mid(el.a, el.b);
  const side = el.side ?? 1;
  if (typeof side !== "number") {
    if (dot(n, sub(m, side)) < 0) n = [-n[0], -n[1]];
  } else if (side < 0) n = [-n[0], -n[1]];
  const k = 17 + Math.min(el.label.length, 8) * 2.2;
  return add(m, mul(n, k / scale));
}

/** Fit math coordinates into the SVG; returns mapper and height. */
function layout(els: El[]) {
  const base = els.flatMap(extendPoints).filter((p) => p.every(Number.isFinite));
  const dims = els.filter((el): el is Extract<El, { k: "dim" }> => el.k === "dim");
  // Side labels extend beyond their anchor point; estimate their pixel
  // width (about 0.55em per glyph at 21px) and shrink the scale until both
  // margins can hold them.
  const sideText = els.flatMap((el) => {
    if (el.k !== "pt" && el.k !== "text") return [];
    const label = el.k === "pt" ? el.label : el.s;
    const at = el.at ?? (el.k === "pt" ? "ne" : "c");
    if (!label) return [];
    const px = label.length * 11.6 + 16;
    const anchor = anchorFor(at);
    return [
      {
        x: el.p[0],
        left: anchor === "end" ? px : anchor === "middle" ? px / 2 : 0,
        right: anchor === "start" ? px : anchor === "middle" ? px / 2 : 0,
      },
    ];
  });
  let s = 1;
  let minX = 0;
  let maxX = 0;
  let minY = 0;
  let maxY = 0;
  let offX = PAD;
  // Two passes: dim labels sit a fixed pixel distance from their segment,
  // so their math position depends on the scale chosen in the first pass.
  for (let pass = 0; pass < 2; pass++) {
    const extra = pass
      ? dims.flatMap((el) => {
          const c = dimLabelPoint(el, s);
          const hw = (el.label.length * 11.6) / 2 / s;
          const hh = 13 / s;
          return [add(c, [hw, hh]), sub(c, [hw, hh])];
        })
      : [];
    const ps = [...base, ...extra];
    const xs = ps.map((p) => p[0]);
    const ys = ps.map((p) => p[1]);
    minX = Math.min(...xs);
    maxX = Math.max(...xs);
    minY = Math.min(...ys);
    maxY = Math.max(...ys);
    const w = Math.max(maxX - minX, 1e-6);
    const h = Math.max(maxY - minY, 1e-6);
    s = Math.min((W - 2 * PAD - 40) / w, (MAX_H - 2 * PAD) / h);
    offX = (W - w * s) / 2;
    for (let k = 0; k < 4; k++) {
      const leftNeed = Math.max(PAD, ...sideText.map((t) => t.left + 8 - (t.x - minX) * s));
      const rightNeed = Math.max(PAD, ...sideText.map((t) => t.right + 8 - (maxX - t.x) * s));
      const avail = W - leftNeed - rightNeed;
      if (w * s <= avail + 0.5) {
        offX = leftNeed + (avail - w * s) / 2;
        break;
      }
      s = Math.max(1e-6, avail / w);
      offX = leftNeed;
    }
  }
  const height = Math.round((maxY - minY) * s + 2 * PAD);
  const P = (p: V): [number, number] => [
    offX + (p[0] - minX) * s,
    PAD + (maxY - p[1]) * s,
  ];
  return { P, height, s };
}

const r2 = (n: number) => Math.round(n * 10) / 10;
const pts = (list: [number, number][]) =>
  list.map(([x, y]) => `${r2(x)},${r2(y)}`).join(" ");

function arcPath(
  c: [number, number],
  a1: number,
  sweep: number,
  r: number,
  close: boolean,
) {
  const p1 = [c[0] + r * Math.cos(a1), c[1] - r * Math.sin(a1)];
  const a2 = a1 + sweep;
  const p2 = [c[0] + r * Math.cos(a2), c[1] - r * Math.sin(a2)];
  const large = Math.abs(sweep) > Math.PI ? 1 : 0;
  const flag = sweep > 0 ? 0 : 1;
  const arc = `M ${r2(p1[0])} ${r2(p1[1])} A ${r} ${r} 0 ${large} ${flag} ${r2(p2[0])} ${r2(p2[1])}`;
  return close ? `M ${r2(c[0])} ${r2(c[1])} L ${arc.slice(2)} Z` : arc;
}

function Render({ els, title, desc }: { els: El[]; title: string; desc: string }) {
  const tid = useId();
  const { P, height, s: layoutScale } = layout(els);
  const nodes = els.map((el, i) => {
    const cls = (tone: Tone | undefined, extra = "") =>
      `sf-${tone ?? "ink"}${extra}`;
    switch (el.k) {
      case "seg":
      case "line":
      case "ray":
      case "vec": {
        let [a, b] = [el.a, el.b];
        if (el.k === "line") [a, b] = extendPoints(el) as [V, V];
        if (el.k === "ray") b = extendPoints(el)[1];
        const [x1, y1] = P(a);
        const [x2, y2] = P(b);
        const arrow = el.k === "line" || el.k === "ray" || el.k === "vec";
        const heads: string[] = [];
        if (arrow) {
          const ang = Math.atan2(y2 - y1, x2 - x1);
          const head = (x: number, y: number, t: number) =>
            pts([
              [x - 11 * Math.cos(t - 0.42), y - 11 * Math.sin(t - 0.42)],
              [x, y],
              [x - 11 * Math.cos(t + 0.42), y - 11 * Math.sin(t + 0.42)],
            ]);
          heads.push(head(x2, y2, ang));
          if (el.k === "line") heads.push(head(x1, y1, ang + Math.PI));
        }
        return (
          <g key={i} className={cls(el.tone)}>
            <line
              x1={r2(x1)}
              y1={r2(y1)}
              x2={r2(x2)}
              y2={r2(y2)}
              className={`sf-stroke${el.dash ? " sf-dash" : ""}${el.thin ? " sf-thin" : ""}${el.bold ? " sf-bold" : ""}`}
            />
            {heads.map((h, j) => (
              <polyline key={j} points={h} className="sf-stroke sf-head" />
            ))}
          </g>
        );
      }
      case "poly":
        if (el.open)
          return (
            <polyline
              key={i}
              points={pts(el.ps.map(P))}
              className={`${cls(el.tone)} sf-stroke sf-nofill${el.dash ? " sf-dash" : ""}${el.thin ? " sf-thin" : ""}${el.bold ? " sf-bold" : ""}`}
            />
          );
        return (
          <polygon
            key={i}
            points={pts(el.ps.map(P))}
            className={`${cls(el.tone)} sf-stroke${el.dash ? " sf-dash" : ""}${el.thin ? " sf-thin" : ""}${el.bold ? " sf-bold" : ""} ${el.fill ? `sf-fill-${el.fill}` : "sf-nofill"}${el.open ? " sf-open" : ""}`}
          />
        );
      case "circle": {
        const [cx, cy] = P(el.c);
        const [ex] = P(add(el.c, [el.r, 0]));
        return (
          <circle
            key={i}
            cx={r2(cx)}
            cy={r2(cy)}
            r={r2(Math.abs(ex - cx))}
            className={`${cls(el.tone)} sf-stroke${el.dash ? " sf-dash" : ""}${el.thin ? " sf-thin" : ""} ${el.fill ? `sf-fill-${el.fill}` : "sf-nofill"}`}
          />
        );
      }
      case "pt": {
        const [x, y] = P(el.p);
        const d = DIRS[el.at ?? "ne"];
        return (
          <g key={i} className={cls(el.tone)}>
            <circle
              cx={r2(x)}
              cy={r2(y)}
              r={4.5}
              className={el.hollow ? "sf-dot-hollow" : "sf-dot"}
            />
            {el.label && (
              <text
                x={r2(x + d[0] * 15)}
                y={r2(y + d[1] * 15)}
                textAnchor={anchorFor(el.at ?? "ne")}
                dy={`${baselineShift(el.at ?? "ne")}em`}
                className="sf-label"
              >
                {el.label}
              </text>
            )}
          </g>
        );
      }
      case "angle": {
        const c = P(el.o);
        const pa = P(el.p);
        const pq = P(el.q);
        // Angles in a y-up frame from screen coordinates.
        const a1 = Math.atan2(-(pa[1] - c[1]), pa[0] - c[0]);
        const a2 = Math.atan2(-(pq[1] - c[1]), pq[0] - c[0]);
        let sweep = a2 - a1;
        while (sweep <= -Math.PI) sweep += 2 * Math.PI;
        while (sweep > Math.PI) sweep -= 2 * Math.PI;
        if (el.reflex) sweep = sweep > 0 ? sweep - 2 * Math.PI : sweep + 2 * Math.PI;
        const r = el.r ?? 28;
        const midA = a1 + sweep / 2;
        const lr = r + 15 + (el.label && el.label.length > 4 ? 9 : 0);
        const lx = c[0] + lr * Math.cos(midA);
        const ly = c[1] - lr * Math.sin(midA);
        return (
          <g key={i} className={cls(el.tone ?? "a")}>
            <path
              d={arcPath(c, a1, sweep, r, !!el.fill)}
              className={`sf-arc${el.fill ? " sf-arc-fill" : ""}`}
            />
            {el.double && (
              <path d={arcPath(c, a1, sweep, r + 5, false)} className="sf-arc" />
            )}
            {el.label && (
              <text
                x={r2(lx)}
                y={r2(ly)}
                textAnchor="middle"
                dy="0.35em"
                className="sf-label sf-angle-label"
              >
                {el.label}
              </text>
            )}
          </g>
        );
      }
      case "right": {
        const c = P(el.o);
        const u = unit(sub(P(el.p), c) as V);
        const w = unit(sub(P(el.q), c) as V);
        const s = 13;
        return (
          <polyline
            key={i}
            points={pts([
              [c[0] + u[0] * s, c[1] + u[1] * s],
              [c[0] + (u[0] + w[0]) * s, c[1] + (u[1] + w[1]) * s],
              [c[0] + w[0] * s, c[1] + w[1] * s],
            ])}
            className={`${cls(el.tone)} sf-stroke sf-thin sf-nofill`}
          />
        );
      }
      case "ticks":
      case "par": {
        const a = P(el.a);
        const b = P(el.b);
        const m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
        const d = unit(sub(b as V, a as V));
        const nrm = [-d[1], d[0]];
        const n = el.n ?? 1;
        const out: string[] = [];
        for (let j = 0; j < n; j++) {
          const off = (j - (n - 1) / 2) * 6;
          const cx = m[0] + d[0] * off;
          const cy = m[1] + d[1] * off;
          if (el.k === "ticks")
            out.push(
              pts([
                [cx + nrm[0] * 7, cy + nrm[1] * 7],
                [cx - nrm[0] * 7, cy - nrm[1] * 7],
              ]),
            );
          else
            out.push(
              pts([
                [cx - d[0] * 6 + nrm[0] * 6, cy - d[1] * 6 + nrm[1] * 6],
                [cx, cy],
                [cx - d[0] * 6 - nrm[0] * 6, cy - d[1] * 6 - nrm[1] * 6],
              ]),
            );
        }
        return (
          <g key={i} className={cls(el.tone)}>
            {out.map((p, j) => (
              <polyline key={j} points={p} className="sf-stroke sf-nofill" />
            ))}
          </g>
        );
      }
      case "dim": {
        const [x, y] = P(dimLabelPoint(el, layoutScale));
        return (
          <text
            key={i}
            x={r2(x)}
            y={r2(y)}
            textAnchor="middle"
            dy="0.35em"
            className={`${cls(el.tone)} sf-label sf-dim`}
          >
            {el.label}
          </text>
        );
      }
      case "text": {
        const [x, y] = P(el.p);
        const d = DIRS[el.at ?? "c"];
        return (
          <text
            key={i}
            x={r2(x + d[0] * 12)}
            y={r2(y + d[1] * 12)}
            textAnchor={anchorFor(el.at ?? "c")}
            dy={`${baselineShift(el.at ?? "c")}em`}
            className={`${cls(el.tone)} sf-label${el.small ? " sf-small" : ""}${el.bold ? " sf-strong" : ""}`}
          >
            {el.s}
          </text>
        );
      }
    }
  });
  return (
    <svg
      viewBox={`0 0 ${W} ${height}`}
      className="sf-svg"
      role="img"
      aria-labelledby={`${tid}-t ${tid}-d`}
    >
      <title id={`${tid}-t`}>{title}</title>
      <desc id={`${tid}-d`}>{desc}</desc>
      {nodes}
    </svg>
  );
}

function prefersReducedMotion() {
  return (
    typeof matchMedia === "function" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function SectionFigureView({ def, title }: { def: FigureDef; title: string }) {
  const id = useId();
  const [value, setValue] = useState(def.param?.init ?? 0);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const raf = useRef<number | undefined>(undefined);
  const frame = def.draw(value, step);
  const p = def.param;
  useEffect(() => {
    if (!playing || !p) return;
    const start = performance.now();
    const span = p.max - p.min;
    const dur = p.playMs ?? 6000;
    if (p.once) {
      // Story playback: run forward to the end, restarting if already there.
      const from = value >= p.max ? p.min : value;
      const total = (dur * (p.max - from)) / span;
      const tick = (now: number) => {
        const k = Math.min(1, (now - start) / Math.max(total, 1));
        const raw = from + k * (p.max - from);
        setValue(Math.round(raw / p.step) * p.step);
        if (k < 1) raf.current = requestAnimationFrame(tick);
        else setPlaying(false);
      };
      raf.current = requestAnimationFrame(tick);
      return () => {
        if (raf.current !== undefined) cancelAnimationFrame(raf.current);
      };
    }
    const from = value;
    const tick = (now: number) => {
      // One slow back-and-forth sweep from the current value.
      const t = ((now - start) / dur) % 1;
      const phase = (from - p.min) / span;
      const x = (phase + t * 2) % 2;
      const pos = x <= 1 ? x : 2 - x;
      const raw = p.min + pos * span;
      setValue(Math.round(raw / p.step) * p.step);
      if (now - start < dur) raf.current = requestAnimationFrame(tick);
      else setPlaying(false);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current !== undefined) cancelAnimationFrame(raf.current);
    };
    // value intentionally read once when play starts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, p]);
  return (
    <figure className="section-figure" data-section-figure={title}>
      <Render els={frame.els} title={`${title}: şekil`} desc={def.alt} />
      {(p || def.steps) && (
        <div className="sf-controls">
          {p && (
            <label className="sf-range" htmlFor={`${id}-range`}>
              <span>
                {p.label}
                <output htmlFor={`${id}-range`}>
                  {fmt(value, p.step < 1 ? 1 : 0)}
                  {p.unit ?? ""}
                </output>
              </span>
              <input
                id={`${id}-range`}
                type="range"
                min={p.min}
                max={p.max}
                step={p.step}
                value={value}
                onChange={(e) => {
                  setPlaying(false);
                  setValue(Number(e.target.value));
                }}
              />
            </label>
          )}
          {p && !prefersReducedMotion() && (
            <button
              type="button"
              className="secondary sf-play"
              aria-pressed={playing}
              onClick={() => setPlaying((x) => !x)}
            >
              {playing ? "Durdur" : "Oynat"}
            </button>
          )}
          {def.steps && (
            <div className="sf-steps" role="group" aria-label="Şekil adımları">
              <button
                type="button"
                className="secondary"
                disabled={step === 0}
                onClick={() => setStep((s) => Math.max(0, s - 1))}
              >
                Geri
              </button>
              <button
                type="button"
                className="secondary"
                disabled={step === def.steps.length - 1}
                onClick={() =>
                  setStep((s) => Math.min(def.steps!.length - 1, s + 1))
                }
              >
                İleri
              </button>
              <span className="sf-step-label" aria-live="polite">
                {step + 1}/{def.steps.length} · {def.steps[step]}
              </span>
            </div>
          )}
        </div>
      )}
      {frame.legend && frame.legend.length > 0 && (
        <ul className="sf-legend" aria-label="Şekil anahtarı">
          {frame.legend.map((item) => (
            <li key={item.code + item.label} className={`sf-${item.tone}`}>
              <span className="sf-legend-token" aria-hidden="true">
                {item.code}
              </span>
              {item.label}
            </li>
          ))}
        </ul>
      )}
      {frame.readout && frame.readout.length > 0 && (
        <ul className="sf-readout" aria-live="polite">
          {frame.readout.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      )}
      <figcaption>{def.caption}</figcaption>
    </figure>
  );
}
