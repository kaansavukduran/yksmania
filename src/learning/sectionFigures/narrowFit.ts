/*
 * Readable figure text on narrow screens (Forge066).
 *
 * Every section figure is drawn on a 640-unit canvas and scaled to the width
 * of the reading column. On a 320 px phone that column is under 300 px, so a
 * 21-unit label lands below 10 CSS px. Two general steps fix it without
 * touching any single figure:
 *
 *  1. crop: the viewBox shrinks to the drawing's real content box (strokes,
 *     shapes and text, measured with getBBox) plus a margin of EDGE_PX screen
 *     pixels, but never further than the width at which the smallest text
 *     reaches TARGET_PX. The layout itself is unchanged, so no label moves
 *     and nothing new can collide; the drawing only gets more pixels;
 *  2. floor: when even the cropped drawing is too wide (content that spans
 *     the whole canvas), the text that is still below FLOOR_PX is raised to
 *     FLOOR_PX through the --sf-min-fs custom property. The other text keeps
 *     its size.
 *
 * Desktop widths never need either step and keep the original viewBox.
 */

/** Width-limited text reaches this size after the crop (CSS px). */
export const TARGET_PX = 11.5;
/** No visible figure text is smaller than this (CSS px). */
export const FLOOR_PX = 11.25;
/** Space kept between the content box and the drawing's edge (CSS px). */
export const EDGE_PX = 6;

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}
export interface FitInput {
  /** Rendered width of the svg element in CSS px. */
  px: number;
  /** Union of the drawing's content boxes, in user units. */
  bbox: Rect;
  /** Smallest base font size of its visible text, in user units. */
  minFont: number;
  /** Canvas width of the layout (user units). */
  width: number;
  /** Canvas height of the layout (user units). */
  height: number;
  /** Allow the font floor (default true); without it only the crop applies. */
  floor?: boolean;
}
export interface Fit {
  viewBox: Rect;
  /** Font floor in user units, set only when some text would stay below FLOOR_PX. */
  minFs?: number;
}

const r1 = (n: number) => Math.round(n * 10) / 10;

export function narrowFit({ px, bbox, minFont, width, height, floor: allowFloor = true }: FitInput): Fit | null {
  if (!(px > 0) || !(bbox.width > 0) || !(bbox.height > 0) || !(minFont > 0)) return null;
  // The full canvas already shows the smallest text at the target size.
  if ((minFont * px) / width >= TARGET_PX) return null;
  // Margin is fixed in screen pixels, so it depends on the final width W:
  // W = content + 2 · EDGE_PX · W / px.
  const share = 1 - (2 * EDGE_PX) / px;
  if (share <= 0.2) return null;
  const fitW = bbox.width / share;
  // Never zoom past the target: narrow drawings keep their proportion.
  const capW = (px * minFont) / TARGET_PX;
  const w = Math.max(fitW, capW);
  const k = w / px;
  const mY = EDGE_PX * k;
  const x = bbox.x + bbox.width / 2 - w / 2;
  const y = bbox.y - mY;
  const h = bbox.height + 2 * mY;
  const fit: Fit = { viewBox: { x: r1(x), y: r1(y), width: r1(w), height: r1(h) } };
  const floor = floorFor(w, px);
  if (allowFloor && floor > minFont + 0.1) fit.minFs = floor;
  // A crop that changes almost nothing is not worth a different viewBox.
  if (!fit.minFs && w >= width - 1 && Math.abs(h - height) < 1 && Math.abs(x) < 1 && Math.abs(y) < 1) return null;
  return fit;
}

/** Font floor (user units) that shows FLOOR_PX on a drawing `w` units wide at `px` CSS px. */
export const floorFor = (w: number, px: number) => r1((FLOOR_PX * w) / px + 0.05);

/** Union of two rectangles (either may be missing). */
export function unionRect(a: Rect | undefined, b: Rect): Rect {
  if (!a) return b;
  const x0 = Math.min(a.x, b.x);
  const y0 = Math.min(a.y, b.y);
  const x1 = Math.max(a.x + a.width, b.x + b.width);
  const y1 = Math.max(a.y + a.height, b.y + b.height);
  return { x: x0, y: y0, width: x1 - x0, height: y1 - y0 };
}

/** Two fits are the same when no edge or the floor moves by half a unit. */
export function sameFit(a: Fit | null, b: Fit | null) {
  if (!a || !b) return a === b;
  const d = (p: number, q: number) => Math.abs(p - q) < 0.5;
  return (
    d(a.viewBox.x, b.viewBox.x) &&
    d(a.viewBox.y, b.viewBox.y) &&
    d(a.viewBox.width, b.viewBox.width) &&
    d(a.viewBox.height, b.viewBox.height) &&
    d(a.minFs ?? 0, b.minFs ?? 0)
  );
}
