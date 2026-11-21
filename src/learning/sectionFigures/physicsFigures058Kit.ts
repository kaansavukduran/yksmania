import { fmt, poly, seg, txt, v, vec, type El, type Tone, type V } from "./figureKit";

/*
 * Forge058 AYT Fizik figür yardımcıları. Sayılar Türkçe ondalık virgülle ve
 * gerçek eksi işaretiyle yazılır; eksenler ve eğriler aynı ölçek fonksiyonundan
 * çizilir ki etiketteki sayı çizimdeki konumla aynı hesaptan gelsin.
 */

/** Türkçe sayı: ondalık virgül, binlik nokta, gerçek eksi işareti. */
export const nf = (x: number, d = 2) => fmt(x, d).replace("-", "−");

/** Görünmez sınır etiketleri: çizimin kenar payını sabitler. */
export const pad = (x0: number, y0: number, x1: number, y1: number): El[] => [
  txt(v(x0, y0), " ", "c"),
  txt(v(x1, y1), " ", "c"),
];

/** Dolgulu dikdörtgen (köşeler x0,y0 – x1,y1). */
export const box = (x0: number, y0: number, x1: number, y1: number, tone: Tone, fill = true): El =>
  poly([v(x0, y0), v(x1, y0), v(x1, y1), v(x0, y1)], fill ? { fill: tone, tone, thin: true } : { tone, thin: true });

/** Grafik ekseni: yatay ve düşey oklar, eksen adları. */
export function axes(o: V, w: number, h: number, xl: string, yl: string, neg = 0): El[] {
  return [
    vec(v(o[0], o[1]), v(o[0] + w, o[1]), { tone: "ink", thin: true }),
    vec(v(o[0], o[1] - neg), v(o[0], o[1] + h), { tone: "ink", thin: true }),
    txt(v(o[0] + w, o[1]), xl, "se", { tone: "ink", small: true }),
    txt(v(o[0], o[1] + h), yl, "n", { tone: "ink", small: true }),
  ];
}

/** Eksen üzerinde işaret çizgisi ve yumuşak (gizlenebilir) sayı etiketi. */
export function xtick(x: number, y: number, s: string): El[] {
  return [seg(v(x, y - 0.07), v(x, y + 0.07), { tone: "muted", thin: true }), txt(v(x, y - 0.1), s, "s", { tone: "muted", small: true, soft: true })];
}
export function ytick(x: number, y: number, s: string): El[] {
  return [seg(v(x - 0.07, y), v(x + 0.07, y), { tone: "muted", thin: true }), txt(v(x - 0.1, y), s, "w", { tone: "muted", small: true, soft: true })];
}

/** f(t) eğrisini [t0, t1] aralığında n parçayla örnekler; X ve Y çizim ölçeğidir. */
export function curve(f: (t: number) => number, t0: number, t1: number, n: number, X: (t: number) => number, Y: (y: number) => number): V[] {
  const ps: V[] = [];
  for (let i = 0; i <= n; i++) {
    const t = t0 + ((t1 - t0) * i) / n;
    ps.push(v(X(t), Y(f(t))));
  }
  return ps;
}

/** Bir okun ortasının yanına, oka dik yönde kaydırılmış etiket konumu. */
export function beside(a: V, b: V, off: number): V {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const l = Math.hypot(dx, dy) || 1;
  return v((a[0] + b[0]) / 2 - (dy / l) * off, (a[1] + b[1]) / 2 + (dx / l) * off);
}
