import { circle, poly, seg, txt, v, vec, type El, type FigureDef, type FigureFrame, type Tone, type V } from "./figureKit";
import { SMALL_FS, textWidth } from "./labelPlacement";

/*
 * Forge060 AYT Biyoloji figürleri için piksel ölçekli çizim yardımcıları.
 * Her çizim tam PW birim genişliğinde bir çerçeveye oturur; figür kitinin
 * yerleşimi bu genişlikte ölçeği 1'e sabitler. Böylece bir birim, 640
 * genişlikli SVG'de bir kullanıcı birimidir ve kutu genişlikleri etiketin
 * gerçek (telefon puntosu) genişliğinden hesaplanabilir. Koordinatlar ekran
 * düzenindedir: y aşağı doğru artar.
 */

export const PW = 532;
/** Satır aralığı: tek satırlı kutu 44 birim, çok satırlıda satırlar 30 birim arayla. */
const LINE = 30;

/** Ekran koordinatından figür kitinin matematik çerçevesine. */
export const P = (x: number, y: number): V => v(x, -y);

/** Küçük etiketin telefon puntosundaki genişliği. */
export const tw = (s: string, bold = false) => textWidth(s, SMALL_FS, bold ? 700 : 500);
const lines = (s: string) => s.split("\n");
/** Çok satırlı etiketin en geniş satırına göre kutu genişliği. */
export const bw = (s: string, bold = false, padX = 30) => Math.max(...lines(s).map((l) => tw(l, bold))) + padX;
export const bh = (s: string) => (lines(s).length === 1 ? 44 : 16 + LINE * lines(s).length);

type BoxStyle = { tone?: Tone; fill?: Tone; bold?: boolean; dash?: boolean; text?: Tone; w?: number; h?: number; pick?: number };

export const T = (x: number, y: number, s: string, at: Parameters<typeof txt>[2] = "c", o: Parameters<typeof txt>[3] = {}): El =>
  txt(P(x, y), s, at, { small: true, ...o });
export const L = (x1: number, y1: number, x2: number, y2: number, o: { tone?: Tone; dash?: boolean; thin?: boolean; bold?: boolean } = {}): El =>
  seg(P(x1, y1), P(x2, y2), o);
export const A = (x1: number, y1: number, x2: number, y2: number, tone: Tone = "ink", o: { dash?: boolean; thin?: boolean; bold?: boolean } = {}): El =>
  vec(P(x1, y1), P(x2, y2), { tone, ...o });
export const R = (x0: number, y0: number, x1: number, y1: number, o: { tone?: Tone; fill?: Tone; dash?: boolean; thin?: boolean; bold?: boolean } = {}): El =>
  poly([P(x0, y0), P(x1, y0), P(x1, y1), P(x0, y1)], { thin: true, ...o });
export const C = (x: number, y: number, r: number, o: { tone?: Tone; fill?: Tone; dash?: boolean; thin?: boolean; bold?: boolean } = {}): El =>
  circle(P(x, y), r, o);
/** Açık ya da kapalı yumuşak çizgi (organ dış hatları). */
export const S = (pts: [number, number][], o: { tone?: Tone; fill?: Tone; dash?: boolean; thin?: boolean; bold?: boolean; open?: boolean } = {}): El =>
  poly(
    pts.map(([x, y]) => P(x, y)),
    { smooth: true, ...o },
  );
export const PL = (pts: [number, number][], o: { tone?: Tone; fill?: Tone; dash?: boolean; thin?: boolean; bold?: boolean; open?: boolean } = {}): El =>
  poly(
    pts.map(([x, y]) => P(x, y)),
    o,
  );

/** Ortasında (çok satırlı olabilen) etiket bulunan kutu; cx, cy merkez. */
export const B = (cx: number, cy: number, label: string, s: BoxStyle = {}): El[] => {
  const w = s.w ?? bw(label, s.bold);
  const h = s.h ?? bh(label);
  const ls = lines(label);
  const els: El[] = [R(cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2, { tone: s.tone ?? "ink", fill: s.fill, dash: s.dash })];
  ls.forEach((l, i) => els.push(T(cx, cy + (i - (ls.length - 1) / 2) * LINE, l, "c", { bold: s.bold, tone: s.text ?? "ink", pick: i === 0 ? s.pick : undefined })));
  return els;
};

/** Çerçeve: genişliği PW'ye, yüksekliği h'ye sabitleyen görünmez iki nokta. */
export const frame = (h: number): El[] => [txt(P(0, 0), " ", "c"), txt(P(PW, h), " ", "c")];

export interface Fig060 {
  caption: string;
  alt: string;
  /** Çizimin ekran yüksekliği (birim). */
  h: number;
  steps?: string[];
  param?: FigureDef["param"];
  picks?: FigureDef["picks"];
  draw: (value: number, step: number, pick: number) => FigureFrame;
}

/** Çerçeveyi ekleyip ölçeği 1'de tutacak yükseklik sınırını veren sarmalayıcı. */
export const mk = (f: Fig060): FigureDef => ({
  caption: f.caption,
  alt: f.alt,
  steps: f.steps,
  param: f.param,
  picks: f.picks,
  maxHeight: Math.max(480, f.h + 110),
  draw: (value, step, pick) => {
    const fr = f.draw(value, step, pick ?? -1);
    return { ...fr, els: [...fr.els, ...frame(f.h)] };
  },
});

export interface ChainItem {
  label: string;
  note?: string;
  tone?: Tone;
  fill?: Tone;
  bold?: boolean;
  dash?: boolean;
}
/**
 * Düşey akış: kutular cx ekseninde alt alta, aralarında aşağı ok; isteğe bağlı
 * not kutunun sağında. Notlar sağ kenara sığacak kadar kısa tutulmalıdır.
 */
export const chain = (items: ChainItem[], o: { cx?: number; y0?: number; gap?: number; w?: number; arrowTone?: (i: number) => Tone; noteX?: number } = {}) => {
  const gap = o.gap ?? 30;
  const w = o.w ?? Math.max(...items.map((it) => bw(it.label, it.bold)));
  const cx = o.cx ?? w / 2 + 14;
  let y = o.y0 ?? 14;
  const els: El[] = [];
  items.forEach((it, i) => {
    const h = bh(it.label);
    const cy = y + h / 2;
    els.push(...B(cx, cy, it.label, { w, tone: it.tone ?? "ink", fill: it.fill, bold: it.bold, dash: it.dash, text: it.tone === "muted" ? "muted" : "ink" }));
    if (it.note) els.push(T(o.noteX ?? cx + w / 2 + 14, cy, it.note, "e", { tone: it.tone && it.tone !== "ink" ? it.tone : "muted" }));
    if (i < items.length - 1) {
      const t = o.arrowTone ? o.arrowTone(i) : "ink";
      els.push(A(cx, y + h + 3, cx, y + h + gap - 3, t, { dash: items[i + 1].dash }));
    }
    y += h + gap;
  });
  return { els, h: y - gap + 14, w, cx };
};

/** Tablo: hücreler "\n" ile satır kırabilir; sütunlar PW'yi dolduracak kadar genişletilir. */
export const table = (
  headers: string[],
  rows: string[][],
  o: { y0?: number; hi?: number; hiTone?: Tone; colTone?: (c: number) => Tone | undefined; fitW?: number } = {},
) => {
  const all = [headers, ...rows];
  const need = headers.map((_, c) => Math.max(...all.map((r, ri) => bw(r[c] ?? "", ri === 0, 20))));
  const total = need.reduce((a, b) => a + b, 0);
  const avail = (o.fitW ?? PW) - 4;
  const ws = need.map((n) => n + Math.max(0, avail - total) / need.length);
  const xs = ws.reduce<number[]>((acc, w) => [...acc, acc[acc.length - 1] + w], [2]);
  let y = o.y0 ?? 2;
  const els: El[] = [];
  all.forEach((r, ri) => {
    const h = Math.max(...r.map((c) => bh(c)));
    const hiRow = o.hi !== undefined && ri === o.hi + 1;
    r.forEach((cell, c) => {
      const tone = hiRow ? (o.hiTone ?? "a") : ri === 0 ? "ink" : (o.colTone?.(c) ?? "ink");
      const fill: Tone | undefined = hiRow ? (o.hiTone ?? "a") : ri === 0 ? "muted" : undefined;
      els.push(...B(xs[c] + ws[c] / 2, y + h / 2, cell, { w: ws[c], h, bold: ri === 0 || (hiRow && c === 0), fill, tone: hiRow ? tone : "ink", text: tone === "muted" ? "muted" : "ink" }));
    });
    y += h;
  });
  return { els, h: y + 2, total: total + 4 };
};

/**
 * Etiketli kılavuz çizgisi: noktadan (x, y) etikete (lx, ly). Etiket çizginin
 * ucundan dışa doğru yazılır; çerçeveye sığması birim testinde denetlenir.
 */
export const lead = (x: number, y: number, lx: number, ly: number, s: string, tone: Tone = "ink", bold = false, side?: "e" | "w"): El[] => {
  const east = side ? side === "e" : lx >= x;
  return [
    L(x, y, lx, ly, { thin: true, tone: tone === "ink" ? "muted" : tone }),
    C(x, y, 3, { tone, fill: tone }),
    T(lx + (east ? 4 : -4), ly, s, east ? "e" : "w", { tone, bold }),
  ];
};

/** Yalnız tablodan oluşan figür: yükseklik tablodan hesaplanır. */
export const tableFig = (f: { caption: string; alt: string; headers: string[]; rows: string[][]; readout: string[] }): FigureDef => {
  const h = table(f.headers, f.rows).h;
  return mk({ caption: f.caption, alt: f.alt, h, draw: () => ({ els: table(f.headers, f.rows).els, readout: f.readout }) });
};
