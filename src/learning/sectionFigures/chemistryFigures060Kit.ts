import { ball, poly, regular, seg, txt, v, type El, type Tone, type V } from "./figureKit";
import { box, nf } from "./physicsFigures058Kit";

/*
 * Forge060 Kimya figür yardımcıları: atom topu, bağ mertebesi çizgileri,
 * altıgen halka, yatay ve yığılmış çubuklar, kap. Ölçek fonksiyonu çubuk
 * boyunu ve yanındaki sayıyı aynı değerden üretir.
 */

/** Alt simge rakamları: 12 → ₁₂ (1 yazılmaz). */
export const sb = (n: number | string) =>
  n === 1 || n === "1" ? "" : String(n).split("").map((c) => "₀₁₂₃₄₅₆₇₈₉"[+c] ?? c).join("");

/** Atom: gölgeli top ve ortasında simge. */
export function atom(els: El[], p: V, label: string, tone: Tone, r = 0.28) {
  els.push(ball(p, r, tone), txt(p, label, "c", { tone: "ink", small: true, bold: true }));
}

/** a–b arasında 1, 2 ya da 3 çizgili bağ (paralel kaydırmalı). */
export function bond(els: El[], a: V, b: V, order = 1, tone: Tone = "ink", gap = 0.11) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const l = Math.hypot(dx, dy) || 1;
  const nx = (-dy / l) * gap;
  const ny = (dx / l) * gap;
  const offs = order === 1 ? [0] : order === 2 ? [-0.5, 0.5] : [-1, 0, 1];
  for (const k of offs) els.push(seg(v(a[0] + nx * k, a[1] + ny * k), v(b[0] + nx * k, b[1] + ny * k), { tone, bold: order === 1 }));
}

/** c noktasından açı (derece) yönünde uzaklık r. */
export const at = (c: V, deg: number, r: number): V => v(c[0] + r * Math.cos((deg * Math.PI) / 180), c[1] + r * Math.sin((deg * Math.PI) / 180));

/** c merkezli, r yarıçaplı, sivri ucu yukarıda altıgenin köşeleri (saat yönünün tersine). */
export const hexAt = (c: V, r: number, start = 90): V[] => regular(6, r, start, c);

/** Kalın kenarlı altıgen halka; double: çift bağ çizilecek kenar indeksleri (iç tarafa kısa çizgi). */
export function ring(els: El[], ps: V[], double: number[] = [], tone: Tone = "ink") {
  const n = ps.length;
  const cx = ps.reduce((s, p) => s + p[0], 0) / n;
  const cy = ps.reduce((s, p) => s + p[1], 0) / n;
  for (let i = 0; i < n; i++) {
    const a = ps[i];
    const b = ps[(i + 1) % n];
    els.push(seg(a, b, { tone, bold: true }));
    if (double.includes(i)) {
      const k = 0.78;
      const ia = v(cx + (a[0] - cx) * k, cy + (a[1] - cy) * k);
      const ib = v(cx + (b[0] - cx) * k, cy + (b[1] - cy) * k);
      els.push(seg(v(ia[0] + (ib[0] - ia[0]) * 0.12, ia[1] + (ib[1] - ia[1]) * 0.12), v(ib[0] - (ib[0] - ia[0]) * 0.12, ib[1] - (ib[1] - ia[1]) * 0.12), { tone }));
    }
  }
}

export interface BarRow {
  label: string;
  value: number;
  tone: Tone;
  /** Çubuk sonundaki yazı; verilmezse değer yazılır. */
  text?: string;
  hollow?: boolean;
}

/** Yatay çubuklar: etiket solda, değer sağda; uzunluk = w · değer / max. */
export function hbars(rows: BarRow[], o: { x0?: number; y0?: number; w: number; max: number; gap?: number; h?: number; digits?: number }): El[] {
  const { x0 = 0, y0 = 0, w, max, gap = 0.85, h = 0.46, digits = 2 } = o;
  const els: El[] = [];
  rows.forEach((r, i) => {
    const y = y0 - i * gap;
    const L = Math.max(0, (w * r.value) / max);
    if (L > 0) els.push(box(x0, y - h / 2, x0 + L, y + h / 2, r.tone, !r.hollow));
    els.push(txt(v(x0 - 0.12, y), r.label, "w", { tone: "ink", small: true, bold: true }));
    els.push(txt(v(x0 + L + 0.12, y), r.text ?? nf(r.value, digits), "e", { tone: "ink", small: true }));
  });
  els.push(seg(v(x0, y0 + h), v(x0, y0 - (rows.length - 1) * gap - h), { tone: "muted", thin: true }));
  return els;
}

export interface StackPart {
  value: number;
  tone: Tone;
  label?: string;
}

/** Düşey yığılmış çubuk: x merkez, taban y0, k birim/değer; parça etiketleri içte ya da sağda. */
export function vstack(parts: StackPart[], x: number, y0: number, k: number, w = 0.9, side: "in" | "e" = "in"): El[] {
  const els: El[] = [];
  let y = y0;
  for (const p of parts) {
    const h = p.value * k;
    if (h > 0) els.push(box(x - w / 2, y, x + w / 2, y + h, p.tone));
    if (p.label && h > 0) els.push(side === "in" ? txt(v(x, y + h / 2), p.label, "c", { tone: "ink", small: true, bold: true }) : txt(v(x + w / 2 + 0.12, y + h / 2), p.label, "e", { tone: "ink", small: true }));
    y += h;
  }
  return els;
}

/** Açık ağızlı kap; frac doluluk (0–1). */
export function beaker(x: number, y: number, w: number, h: number, frac: number, tone: Tone): El[] {
  const els: El[] = [];
  if (frac > 0) els.push(box(x + 0.06, y + 0.06, x + w - 0.06, y + 0.06 + (h - 0.12) * Math.min(1, frac), tone));
  els.push(poly([v(x, y + h), v(x, y), v(x + w, y), v(x + w, y + h)], { tone: "ink", open: true }));
  return els;
}

export interface GridRow {
  label: string;
  cells: string[];
  /** Hücre tonu; eşitsizlik gibi dikkat gereken hücreler "warn". */
  tones?: Tone[];
}

/** Küçük sayım tablosu: üstte sütun adları, solda satır adları, hücreler ortada. */
export function grid(x0: number, y0: number, cols: string[], rows: GridRow[], dx = 1.3, dy = 0.72): El[] {
  const els: El[] = [];
  cols.forEach((c, j) => els.push(txt(v(x0 + 0.8 + j * dx, y0), c, "c", { tone: "a", small: true, bold: true })));
  els.push(seg(v(x0 + 0.2, y0 - dy / 2), v(x0 + 0.8 + (cols.length - 1) * dx + 0.55, y0 - dy / 2), { tone: "muted", thin: true }));
  rows.forEach((r, i) => {
    const y = y0 - (i + 1) * dy;
    els.push(txt(v(x0, y), r.label, "w", { tone: "muted", small: true }));
    r.cells.forEach((c, j) => els.push(txt(v(x0 + 0.8 + j * dx, y), c, "c", { tone: r.tones?.[j] ?? "ink", small: true, bold: r.tones?.[j] === "warn" })));
  });
  return els;
}

/** Bilimsel gösterim: 7,45×10⁻⁶ (Türkçe virgül, gerçek eksi). */
export function sci(x: number, d = 2) {
  if (x === 0) return "0";
  const e = Math.floor(Math.log10(Math.abs(x)));
  const m = x / 10 ** e;
  const sup = String(e).split("").map((c) => (c === "-" ? "⁻" : "⁰¹²³⁴⁵⁶⁷⁸⁹"[+c])).join("");
  return `${nf(m, d)}×10${sup}`;
}
