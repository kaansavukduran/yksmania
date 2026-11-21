import { circle, fmt, seg, txt, v, vec, type El, type Tone } from "./figureKit";
import { rect } from "./biologyFigures059Kit";

/*
 * Forge059 TYT Biyoloji figürleri için ortak yardımcılar: Punnett karesi,
 * yatay pay çubukları ve kesir yazımı. Karedeki her kutu eş olasılıklı bir
 * gamet birleşmesidir; çubuk payları kutular sayılarak hesaplanır, elle
 * yazılmaz. Çizim birimi: genişlik yaklaşık 12, yükseklik en çok 7,5.
 */

export type Cell = { s: string; tone: Tone; off?: boolean; on?: boolean };

/** En büyük ortak bölen (kesir sadeleştirme). */
export const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
/** a/b sadeleştirilmiş kesir yazısı; b = 1 ise tam sayı. */
export const frac = (a: number, b: number) => {
  if (a === 0) return "0";
  const g = gcd(a, b);
  return b / g === 1 ? `${a / g}` : `${a / g}/${b / g}`;
};

/**
 * Punnett karesi. Sol üst köşe (x, y); satırlar bir ebeveynin, sütunlar
 * diğerinin gametleri. Gametler yuvarlak pullarla, kutular genotip yazısıyla
 * çizilir. `off` kutular kesik çizgiyle soluk kalır (koşullu örnek uzayının
 * dışı), `on` kutular kalın çerçeve alır.
 */
export function punnett(
  rows: string[],
  cols: string[],
  cell: (r: string, c: string, i: number, j: number) => Cell,
  o: { x?: number; y?: number; size?: number; rowName?: string; colName?: string } = {},
): El[] {
  const x = o.x ?? 0;
  const y = o.y ?? 0;
  const s = o.size ?? 1.6;
  const r = s * 0.3;
  const els: El[] = [];
  cols.forEach((g, j) => {
    const c = v(x + (j + 1.5) * s, y - 0.5 * s);
    els.push(circle(c, r, { tone: "b", fill: "b", thin: true }), txt(c, g, "c", { small: true, bold: true }));
  });
  rows.forEach((g, i) => {
    const c = v(x + 0.5 * s, y - (i + 1.5) * s);
    els.push(circle(c, r, { tone: "c", fill: "c", thin: true }), txt(c, g, "c", { small: true, bold: true }));
  });
  rows.forEach((rg, i) =>
    cols.forEach((cg, j) => {
      const k = cell(rg, cg, i, j);
      const x0 = x + (j + 1) * s;
      const y0 = y - (i + 2) * s;
      els.push(rect(x0, y0, x0 + s, y0 + s, { tone: k.off ? "muted" : k.on ? "a" : "ink", fill: k.off ? undefined : k.tone, thin: !k.on, bold: k.on, dash: k.off }));
      els.push(txt(v(x0 + s / 2, y0 + s / 2), k.s, "c", { small: true, bold: !k.off, tone: k.off ? "muted" : "ink" }));
    }),
  );
  if (o.colName) els.push(txt(v(x + (cols.length / 2 + 1) * s, y - 0.5 * s + r + 0.12), o.colName, "n", { small: true, tone: "muted" }));
  if (o.rowName) els.push(txt(v(x + 0.5 * s, y - (rows.length + 1) * s - 0.12), o.rowName, "s", { small: true, tone: "muted" }));
  return els;
}

/** Karedeki kutuları sayar: anahtar → kutu sayısı (ilk görülme sırasıyla). */
export function tally(rows: string[], cols: string[], key: (r: string, c: string) => string) {
  const m = new Map<string, number>();
  for (const r of rows) for (const c of cols) m.set(key(r, c), (m.get(key(r, c)) ?? 0) + 1);
  return m;
}

/**
 * Yatay pay çubukları: her satırda ad (solda), pay çubuğu ve kesir (sağda).
 * x: çubuk başlangıcı, top: ilk satırın merkezi, w: payı 1 olan çubuğun boyu.
 */
export function bars(
  items: { label: string; n: number; tone: Tone; on?: boolean }[],
  total: number,
  o: { x: number; top: number; w: number; row?: number; name?: (n: number, t: number) => string },
): El[] {
  const row = o.row ?? 0.9;
  const els: El[] = [];
  items.forEach((it, i) => {
    const yy = o.top - i * row;
    const len = (it.n / total) * o.w;
    els.push(txt(v(o.x - 0.15, yy), it.label, "w", { small: true, bold: it.on, tone: it.on ? "a" : "ink" }));
    els.push(seg(v(o.x, yy - 0.28), v(o.x, yy + 0.28), { thin: true, tone: "muted" }));
    if (it.n > 0) els.push(rect(o.x, yy - 0.22, o.x + len, yy + 0.22, { tone: it.on ? "a" : it.tone, fill: it.on ? "a" : it.tone, thin: !it.on, bold: it.on }));
    els.push(txt(v(o.x + len + 0.15, yy), (o.name ?? frac)(it.n, total), "e", { small: true, bold: true, tone: it.on ? "a" : "ink" }));
  });
  return els;
}

/** Ondalık pay → yüzde yazısı (Türkçe virgül). */
export const pct = (p: number, digits = 0) => `%${fmt(p * 100, digits)}`;

/**
 * Basit tablo: başlık satırı ve gövde satırları; ilk sütun satır adlarıdır.
 * colW sütun genişlikleri, rowH satır yüksekliği; sol üst köşe (0, top).
 * `tone(r, c)` hücre dolgusu (yoksa dolgusuz); metinler ortalanır.
 */
export function table(
  head: string[],
  body: string[][],
  colW: number[],
  o: { top: number; rowH?: number; tone?: (r: number, c: number) => Tone | undefined; on?: (r: number, c: number) => boolean },
): El[] {
  const rh = o.rowH ?? 0.9;
  const els: El[] = [];
  const xs = colW.reduce<number[]>((a, w) => [...a, a[a.length - 1] + w], [0]);
  [head, ...body].forEach((row, r) => {
    const y1 = o.top - r * rh;
    row.forEach((s, c) => {
      const fill = r === 0 ? "muted" : o.tone?.(r - 1, c);
      const on = r > 0 && (o.on?.(r - 1, c) ?? false);
      els.push(rect(xs[c], y1 - rh, xs[c + 1], y1, { tone: on ? "a" : "ink", fill: on ? "a" : fill, thin: !on, bold: on }));
      els.push(txt(v((xs[c] + xs[c + 1]) / 2, y1 - rh / 2), s, "c", { small: true, bold: r === 0 || c === 0 || on, tone: on ? "a" : "ink" }));
    });
  });
  return els;
}

/** Yatay kutu zinciri: kutular arasında oklar; i < upto olan kutular etkin. */
export function chain(
  items: string[],
  o: { y: number; w: number; h?: number; gap?: number; x?: number; upto?: number; tone?: Tone; arrowLabels?: string[] },
): El[] {
  const h = o.h ?? 1;
  const gap = o.gap ?? 0.9;
  const x0 = o.x ?? 0;
  const upto = o.upto ?? items.length;
  const els: El[] = [];
  items.forEach((s, i) => {
    const x = x0 + i * (o.w + gap);
    const on = i < upto;
    els.push(rect(x, o.y - h / 2, x + o.w, o.y + h / 2, { tone: on ? (o.tone ?? "c") : "muted", fill: on ? (o.tone ?? "c") : undefined, thin: true, dash: !on }));
    els.push(txt(v(x + o.w / 2, o.y), s, "c", { small: true, bold: on, tone: on ? "ink" : "muted" }));
    if (i < items.length - 1) {
      els.push(vec(v(x + o.w + 0.1, o.y), v(x + o.w + gap - 0.1, o.y), { tone: i + 1 < upto ? "ink" : "muted", thin: true }));
      const lab = o.arrowLabels?.[i];
      if (lab) els.push(txt(v(x + o.w + gap / 2, o.y + h / 2 + 0.1), lab, "n", { small: true, tone: i + 1 < upto ? "a" : "muted" }));
    }
  });
  return els;
}
