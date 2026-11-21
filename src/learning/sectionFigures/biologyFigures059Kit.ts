import { poly, seg, txt, v, vec, type El, type Tone, type V } from "./figureKit";

/*
 * Forge059 AYT Biyoloji figürleri için küçük çizim yardımcıları. Hepsi
 * figureKit öğelerini üretir; etiket yerleşimi figür kitinin yerleştiricisine
 * bırakılır.
 */

/** Görünmez kenar etiketleri: çizim kutusunu genişletip kenar payı bırakır. */
export const pad = (a: V, b: V): El[] => [txt(a, " ", "c"), txt(b, " ", "c")];

export const rect = (x0: number, y0: number, x1: number, y1: number, s: { tone?: Tone; fill?: Tone; thin?: boolean; dash?: boolean; bold?: boolean } = {}): El =>
  poly([v(x0, y0), v(x1, y0), v(x1, y1), v(x0, y1)], s);

/** Ortasında etiket olan kutu (cx, cy merkez; w, h tam boyut). */
export const box = (
  cx: number,
  cy: number,
  w: number,
  h: number,
  label: string,
  s: { tone?: Tone; fill?: Tone; small?: boolean; bold?: boolean; pick?: number; dash?: boolean; text?: Tone } = {},
): El[] => [
  rect(cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2, { tone: s.tone ?? "ink", fill: s.fill, thin: true, dash: s.dash }),
  txt(v(cx, cy), label, "c", { small: s.small ?? true, bold: s.bold, tone: s.text ?? "ink", pick: s.pick }),
];

/** Kutudan kutuya yatay/düşey ok; uçlar kutu kenarından biraz geride kalır. */
export const arrow = (a: V, b: V, tone: Tone = "ink", s: { dash?: boolean; thin?: boolean; bold?: boolean } = {}): El => vec(a, b, { tone, ...s });

/** Eksen çifti: orijin (0,0), genişlik w, yükseklik h; eksen adları uçlarda. */
export const axes = (w: number, h: number, xLabel: string, yLabel: string): El[] => [
  vec(v(0, 0), v(w, 0), { thin: true, tone: "muted" }),
  vec(v(0, 0), v(0, h), { thin: true, tone: "muted" }),
  txt(v(w, -0.25), xLabel, "sw", { small: true, tone: "muted" }),
  txt(v(0.15, h), yLabel, "e", { small: true, tone: "muted" }),
];

/** f(x) eğrisi, x0..x1 arasında n parçalı, açık ve yumuşak çizgi. */
export const curve = (f: (x: number) => number, x0: number, x1: number, n: number, s: { tone?: Tone; bold?: boolean; dash?: boolean; thin?: boolean } = {}): El =>
  poly(
    Array.from({ length: n + 1 }, (_, i) => {
      const x = x0 + ((x1 - x0) * i) / n;
      return v(x, f(x));
    }),
    { open: true, smooth: true, ...s },
  );

/** Kesik dikey işaret çizgisi. */
export const vmark = (x: number, y0: number, y1: number, tone: Tone = "muted"): El => seg(v(x, y0), v(x, y1), { thin: true, dash: true, tone });

/** Seçili öğe vurgusu: seçiliyse "a", değilse verilen ton. */
export const hi = (on: boolean, base: Tone = "ink"): Tone => (on ? "a" : base);
