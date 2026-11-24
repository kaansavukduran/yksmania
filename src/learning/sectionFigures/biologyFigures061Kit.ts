import { type El, type Tone } from "./figureKit";
import { A, C, L, PL, PW, R, T, tw } from "./biologyFigures060Kit";

/*
 * Forge061 yardımcıları (AYT Biyoloji ve Fizik). Forge060 kitinin piksel
 * ölçekli çerçevesini kullanır: bir birim, 640 genişlikli SVG'de bir kullanıcı
 * birimidir, y aşağı doğru artar. Çubuk boyları ve saat dilimleri yalnız
 * çağıranın verdiği sayılardan hesaplanır.
 */

/** Türkçe sayı: ondalık virgül, gerçek eksi işareti. */
export const tr = (x: number, d = 1) => {
  const r = Math.round(x * 10 ** d) / 10 ** d;
  return String(r).replace(".", ",").replace("-", "−");
};

export interface Bar {
  label: string;
  value: number;
  tone?: Tone;
  /** Çubuğun sağına yazılan değer metni (yoksa sayı). */
  text?: string;
  dash?: boolean;
}
/**
 * Yatay çubuk grafiği: etiketler solda (labelW genişliğinde), çubuklar max
 * değere göre ölçeklenir, değer metni çubuğun sağına yazılır. Değer metni
 * için sağda valueW birim bırakılır.
 */
export const bars = (items: Bar[], o: { y0?: number; max: number; labelW?: number; valueW?: number; rowH?: number; barH?: number }) => {
  const labelW = o.labelW ?? Math.max(...items.map((b) => tw(b.label))) + 20;
  const valueW = o.valueW ?? Math.max(...items.map((b) => tw(b.text ?? tr(b.value)))) + 24;
  const rowH = o.rowH ?? 46;
  const barH = o.barH ?? 22;
  const x0 = labelW + 8;
  const full = PW - x0 - valueW - 8;
  const els: El[] = [L(x0, o.y0 ?? 10, x0, (o.y0 ?? 10) + rowH * items.length, { tone: "muted", thin: true })];
  items.forEach((b, i) => {
    const cy = (o.y0 ?? 10) + rowH * i + rowH / 2;
    const w = (Math.max(0, b.value) / o.max) * full;
    els.push(T(labelW, cy, b.label, "w", { tone: b.tone ?? "ink" }));
    if (w > 0.5) els.push(R(x0, cy - barH / 2, x0 + w, cy + barH / 2, { tone: b.tone ?? "ink", fill: b.tone ?? "ink", dash: b.dash }));
    els.push(T(x0 + w + 2, cy, b.text ?? tr(b.value), "e", { tone: b.tone ?? "ink", bold: true }));
  });
  return { els, h: (o.y0 ?? 10) + rowH * items.length + 10, x0, full };
};

/** 24 saatlik kadran: saat h (0–24) için açı, 0 saat tepede, saat yönünde. */
const ang = (h: number) => (h / 24) * 2 * Math.PI - Math.PI / 2;
export const clockPt = (cx: number, cy: number, r: number, h: number): [number, number] => [cx + r * Math.cos(ang(h)), cy + r * Math.sin(ang(h))];
/**
 * Karanlık penceresi [start, end) (saat, gece yarısını geçebilir) dolgulu dilim
 * olarak çizilen 24 saatlik kadran; 0, 6, 12, 18 işaretli.
 */
export const clock = (cx: number, cy: number, r: number, start: number, end: number, tone: Tone = "b"): El[] => {
  const dur = (((end - start) % 24) + 24) % 24;
  const n = Math.max(2, Math.round(dur * 3));
  const pts: [number, number][] = [[cx, cy]];
  for (let i = 0; i <= n; i++) pts.push(clockPt(cx, cy, r, start + (dur * i) / n));
  const els: El[] = [C(cx, cy, r, { bold: true })];
  if (dur > 0) els.push(PL(pts, { tone, fill: tone, thin: true }));
  for (const h of [0, 6, 12, 18]) {
    const [x1, y1] = clockPt(cx, cy, r, h);
    const [x2, y2] = clockPt(cx, cy, r - 12, h);
    els.push(L(x1, y1, x2, y2, { tone: "muted" }));
    const [lx, ly] = clockPt(cx, cy, r + 24, h);
    els.push(T(lx, ly, h === 0 ? "24.00" : `${String(h).padStart(2, "0")}.00`, "c", { tone: "muted" }));
  }
  return els;
};
/** Saat metni: 22 → "22.00", 25 → "01.00". */
export const hh = (h: number) => `${String(((Math.round(h) % 24) + 24) % 24).padStart(2, "0")}.00`;

/**
 * Piksel çerçevede grafik: sol alt köşe (x0, yb), genişlik w, yükseklik h.
 * X ve Y, [xmin, xmax] ve [ymin, ymax] veri aralığını çizime eşler. Düşey
 * eksen adı okun ucunun soluna (x0 en az ad genişliği + 16 olmalı), yatay
 * eksen adı okun ucunun üstüne ya da (xlBelow) altına yazılır. Eğri
 * noktaları aynı eşlemeden geçer.
 */
export const graph = (o: { x0: number; yb: number; w: number; h: number; xmin?: number; xmax: number; ymin?: number; ymax: number; xl: string; yl: string; xlBelow?: boolean }) => {
  const xmin = o.xmin ?? 0;
  const ymin = o.ymin ?? 0;
  const X = (x: number) => o.x0 + ((x - xmin) / (o.xmax - xmin)) * o.w;
  const Y = (y: number) => o.yb - ((y - ymin) / (o.ymax - ymin)) * o.h;
  const y0 = Y(Math.max(ymin, Math.min(0, o.ymax)));
  const els: El[] = [A(o.x0, y0, o.x0 + o.w + 14, y0, "ink", { thin: true }), A(o.x0, o.yb, o.x0, o.yb - o.h - 14, "ink", { thin: true })];
  els.push(T(o.x0 + o.w + 14, o.xlBelow ? y0 + 26 : y0 - 18, o.xl, "w", { tone: "muted" }), T(o.x0 + 2, o.yb - o.h - 10, o.yl, "w", { tone: "muted" }));
  const plot = (f: (x: number) => number, a = xmin, b = o.xmax, n = 48): [number, number][] =>
    Array.from({ length: n + 1 }, (_, i) => {
      const x = a + ((b - a) * i) / n;
      return [X(x), Y(f(x))];
    });
  return { els, X, Y, plot };
};

