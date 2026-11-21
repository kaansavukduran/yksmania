/*
 * Label placement for section figures, in SVG user units (the 640-wide
 * viewBox). Labels are measured with Inter's real advance widths (weight 600,
 * em units) instead of a per-glyph guess, and with the larger phone font so a
 * label that fits on a phone also fits on a desktop. The placer keeps every
 * label clear of the other labels, of drawn strokes, of point dots and of the
 * drawing's edge; a label that cannot move is put on a background plate.
 * The numbers below are the clearance standard of the figure layout gate
 * (tests/e2e/helpers/svgAudit.ts) plus a small safety margin, converted at
 * the narrowest drawing (about 270 px wide for 640 units on a 320 px phone).
 */

const WIDTHS: [number, string][] = [
  [0.25, " ₜ"], [0.26, "ijlıî′"], [0.28, "IİÎ"], [0.32, "!,.:·¹"], [0.33, "';"], [0.35, "`t"],
  [0.36, "|"], [0.37, "()[]ₓ"], [0.38, "/\\ₐ"], [0.39, "f"], [0.4, "r₇"], [0.41, "₁⁷"],
  [0.42, "1"], [0.43, "₊₋⁺⁻"], [0.44, "₂ₙ"], [0.45, "{}₀₆₉²"], [0.46, "°₃₅⁰³⁶"],
  [0.47, "-_₈⁵⁸⁹ε"], [0.48, "^₄"], [0.49, "⁴"], [0.5, "–"], [0.51, "″"], [0.52, '"'],
  [0.54, "*?θ"], [0.55, "sş≤≥≈≠√"], [0.56, "γλ"], [0.57, "Lakxzâáà"], [0.58, "7Jcç"],
  [0.59, "Fevyéè"], [0.6, "□Σ"], [0.61, "5Ehnouöüûαβδμ"], [0.62, "2bdpqρ"], [0.63, "gğ"],
  [0.64, "3689#"], [0.65, "$PRSZŞ"], [0.66, "0&BT"], [0.67, "4+<=>~−×÷±"], [0.68, "σ"],
  [0.7, "K"], [0.71, "Y∞"], [0.72, "DXφΔ"], [0.73, "AVÂ"], [0.74, "CUÇÜÛ"], [0.75, "GHĞ"],
  [0.76, "N"], [0.77, "OQÖπ"], [0.8, "Ω"], [0.84, "wω⇌⇄"], [0.88, "↑↓"], [0.9, "m∠"],
  [0.92, "M"], [0.96, "…"], [1, "%@—→←"], [1.01, "△"], [1.02, "W"],
];
const EM = new Map<string, number>();
for (const [w, chars] of WIDTHS) for (const ch of chars) EM.set(ch, w);

/** Advance width of a label in user units (weight 500/600/700). */
export function textWidth(s: string, fs: number, weight = 600) {
  let em = 0;
  for (const ch of s) em += EM.get(ch) ?? 0.66;
  // 4 % safety for kerning-free sums and fallback-font sub/superscripts.
  const k = (weight >= 700 ? 1.015 : weight <= 500 ? 0.975 : 1) * 1.04;
  return em * fs * k;
}

/** Phone font sizes (see the 520px media query): the larger of the two. */
export const LABEL_FS = 25;
export const SMALL_FS = 21;
/** Gap between two label boxes, user units (≈ 4 px on a 320 px phone: twice the gate). */
export const LABEL_GAP = 10;
/** Distance of a label's ink from the drawing edge (≈ 4.6 px at 320 px). */
export const EDGE = 11;
/** Extra clearance between a stroke and a plain label's glyph core (≈ 2 px at 320 px). */
const LINE_PAD = 5;

export type Anchor = "start" | "middle" | "end";
export interface Box {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}
export interface Spot {
  x: number;
  y: number;
  anchor: Anchor;
  /** Baseline shift in em, as the renderer's dy. */
  dy: number;
}

/** Ink box (font box less its empty top and the descender tail). */
export function inkBox(sp: Spot, w: number, fs: number): Box {
  const x0 = sp.anchor === "end" ? sp.x - w : sp.anchor === "middle" ? sp.x - w / 2 : sp.x;
  const base = sp.y + sp.dy * fs;
  return { x0, x1: x0 + w, y0: base - 0.79 * fs, y1: base + 0.06 * fs };
}
/** Background plate drawn by PickLabel around a label. */
export function plateBox(sp: Spot, w: number, fs: number): Box {
  const x0 = sp.anchor === "end" ? sp.x - w : sp.anchor === "middle" ? sp.x - w / 2 : sp.x;
  const base = sp.y + sp.dy * fs;
  return { x0: x0 - 7, x1: x0 + w + 7, y0: base - 0.97 * fs - 2, y1: base + 0.24 * fs + 2 };
}
const grow = (b: Box, dx: number, dy = dx): Box => ({ x0: b.x0 - dx, x1: b.x1 + dx, y0: b.y0 - dy, y1: b.y1 + dy });
const meets = (a: Box, b: Box) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;

export type Seg = [number, number, number, number];
function segHits(s: Seg, r: Box) {
  const [ax, ay, bx, by] = s;
  let t0 = 0;
  let t1 = 1;
  const dx = bx - ax;
  const dy = by - ay;
  const P = [-dx, dx, -dy, dy];
  const Q = [ax - r.x0, r.x1 - ax, ay - r.y0, r.y1 - ay];
  for (let k = 0; k < 4; k++) {
    if (P[k] === 0) {
      if (Q[k] < 0) return false;
    } else {
      const t = Q[k] / P[k];
      if (P[k] < 0) {
        if (t > t1) return false;
        if (t > t0) t0 = t;
      } else {
        if (t < t0) return false;
        if (t < t1) t1 = t;
      }
    }
  }
  return true;
}

export interface LabelReq {
  key: number;
  text: string;
  fs: number;
  weight: number;
  /** Candidate spots, most wanted first. */
  spots: Spot[];
  /** Always on a plate (angle labels) or a pill (pickable labels). */
  plate?: boolean;
  /** Fixed: registered as it is (pickable capsules). */
  fixed?: boolean;
  /** Secondary label: hidden instead of moved when it collides. */
  soft?: boolean;
  /** Placement order: lower first (point names before free text). */
  rank?: number;
}
export interface Placed {
  spot: Spot;
  plate: boolean;
  hidden: boolean;
}

export function placeLabels(reqs: LabelReq[], segs: Seg[], dots: Box[], width: number, height: number) {
  const out = new Map<number, Placed>();
  const taken: Box[] = [];
  const inside = (b: Box) => b.x0 >= EDGE && b.x1 <= width - EDGE && b.y0 >= EDGE && b.y1 <= height - EDGE;
  const crossed = (ink: Box) => {
    const w = ink.x1 - ink.x0;
    const core = grow({ x0: ink.x0 + 0.04 * w, x1: ink.x1 - 0.04 * w, y0: ink.y0, y1: ink.y1 }, LINE_PAD);
    return segs.some((s) => segHits(s, core));
  };
  const onDot = (ink: Box) => dots.some((d) => meets(grow(ink, 1.5), d));
  const clash = (b: Box) => taken.some((t) => meets(grow(b, LABEL_GAP / 2), grow(t, LABEL_GAP / 2)));
  // Pickable capsules are placed by the author and never move; capsules in
  // one row that would touch are spread apart around the row's centre.
  spreadRows(reqs.filter((r) => r.fixed), width);
  const order = [...reqs].sort(
    (a, b) =>
      Number(!!b.fixed) - Number(!!a.fixed) ||
      Number(!!a.soft) - Number(!!b.soft) ||
      (a.rank ?? 0) - (b.rank ?? 0),
  );
  for (const r of order) {
    const w = textWidth(r.text, r.fs, r.weight);
    const boxOf = (sp: Spot, plate: boolean) => (plate ? plateBox(sp, w, r.fs) : inkBox(sp, w, r.fs));
    if (r.fixed) {
      out.set(r.key, { spot: r.spots[0], plate: !!r.plate, hidden: false });
      taken.push(plateBox(r.spots[0], w, r.fs));
      continue;
    }
    let pick: Placed | undefined;
    // 1) a plain spot clear of labels, strokes, dots and the edge;
    if (!r.plate)
      for (const sp of r.spots) {
        const ink = inkBox(sp, w, r.fs);
        if (inside(ink) && !clash(ink) && !crossed(ink) && !onDot(ink)) {
          pick = { spot: sp, plate: false, hidden: false };
          break;
        }
      }
    // 2) a plated spot clear of labels and dots;
    if (!pick)
      for (const sp of r.spots) {
        const box = plateBox(sp, w, r.fs);
        if (inside(inkBox(sp, w, r.fs)) && !clash(box) && !onDot(box)) {
          pick = { spot: sp, plate: true, hidden: false };
          break;
        }
      }
    // 3) secondary labels give way; others keep their first spot on a plate.
    if (!pick) {
      if (r.soft) {
        out.set(r.key, { spot: r.spots[0], plate: false, hidden: true });
        continue;
      }
      const sp = r.spots[0];
      pick = { spot: sp, plate: !!r.plate || crossed(inkBox(sp, w, r.fs)), hidden: false };
    }
    out.set(r.key, pick);
    taken.push(boxOf(pick.spot, pick.plate));
  }
  return out;
}

/** Spread touching capsules of one row (same baseline) horizontally. */
function spreadRows(fixed: LabelReq[], width: number) {
  const rows = new Map<number, LabelReq[]>();
  for (const r of fixed) {
    const key = Math.round(r.spots[0].y + r.spots[0].dy * r.fs);
    const row = [...rows.keys()].find((k) => Math.abs(k - key) < 3);
    rows.set(row ?? key, [...(rows.get(row ?? key) ?? []), r]);
  }
  for (const row of rows.values()) {
    if (row.length < 2) continue;
    const items = row
      .map((r) => {
        const w = textWidth(r.text, r.fs, r.weight);
        const b = plateBox(r.spots[0], w, r.fs);
        return { r, x0: b.x0, x1: b.x1 };
      })
      .sort((a, b) => a.x0 - b.x0);
    let moved = 0;
    const shift = items.map(() => 0);
    for (let i = 1; i < items.length; i++) {
      const prev = items[i - 1].x1 + shift[i - 1];
      const need = prev + LABEL_GAP - (items[i].x0 + moved);
      if (need > 0) moved += need;
      shift[i] = moved;
    }
    if (!moved) continue;
    // Keep the row centred and inside the drawing.
    let back = moved / 2;
    const left = items[0].x0 - back;
    const right = items[items.length - 1].x1 + moved - back;
    if (left < EDGE) back -= EDGE - left;
    else if (right > width - EDGE) back += right - (width - EDGE);
    items.forEach((it, i) => {
      const sp = it.r.spots[0];
      it.r.spots[0] = { ...sp, x: sp.x + shift[i] - back };
    });
  }
}
