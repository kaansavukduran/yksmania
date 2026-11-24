import { circle, seg, txt, v, type El, type FigureDef, type FigureFrame, type Tone } from "./figureKit";
import { CW, fitH, frame, LH, wrap } from "./turkishFigures060Kit";

/*
 * Forge062 ortak çizim yardımcıları (TYT Biyoloji, Coğrafya, Din Kültürü).
 * Forge060 panosunun 10 birim genişliğini ve sabit ölçeğini kullanır: y
 * yukarıdan aşağı eksi yönde ilerler, yükseklik içerikten hesaplanır. Zincir
 * noktaları birer yapı birimidir (monomer, amino asit, şeker), atom çizimi
 * değildir; çizimler ölçekli değildir. Hiçbir yardımcı öğrenme kaydı üretmez.
 */

/** Serbest çizimli figür: çerçeve ve yükseklik sınırı otomatik eklenir. */
export function drawFig(o: {
  caption: string;
  alt: string;
  h: number;
  param?: FigureDef["param"];
  steps?: string[];
  picks?: FigureDef["picks"];
  draw: (value: number, step: number, pick: number) => FigureFrame;
}): FigureDef {
  return {
    caption: o.caption,
    alt: o.alt,
    maxHeight: fitH(o.h),
    param: o.param,
    steps: o.steps,
    picks: o.picks,
    draw: (value, step, pick = -1) => {
      const f = o.draw(value, step, pick);
      return { ...f, els: [...f.els, ...frame(o.h)] };
    },
  };
}

/** Yapı birimi noktası (r = 0,17 birim ≈ 9 SVG birimi). */
export const unitDot = (x: number, y: number, tone: Tone, free = false): El =>
  circle(v(x, y), 0.17, free ? { tone, thin: true } : { tone, fill: tone });

/**
 * Zincir parçalarını yatay sıralar halinde çizer. `parts` her parçanın birim
 * sayısıdır. Bağlar komşu birimler arasındaki çizgilerdir. Parçalar arası
 * boşluk 0,6 birim; satır dolunca alt satıra geçilir. Kapladığı son y'yi
 * döndürür.
 */
export function chains(els: El[], y0: number, parts: number[], o: { gap?: number; tone?: (part: number, index: number) => Tone; bondTone?: Tone; x0?: number; x1?: number } = {}): number {
  const gap = o.gap ?? 0.62;
  const x0 = o.x0 ?? 0.4;
  const x1 = o.x1 ?? CW - 0.4;
  let x = x0;
  let y = y0;
  parts.forEach((n, p) => {
    const w = (n - 1) * gap;
    if (x + w > x1 && x > x0) {
      x = x0;
      y -= 0.8;
    }
    for (let i = 0; i < n; i++) {
      const cx = x + i * gap;
      if (i > 0) els.push(seg(v(cx - gap + 0.17, y), v(cx - 0.17, y), { tone: o.bondTone ?? "ink" }));
      els.push(unitDot(cx, y, o.tone ? o.tone(p, i) : n === 1 ? "a" : "b", n === 1));
    }
    x += w + gap * 1.6;
  });
  return y - 0.5;
}

/** Sola yaslı, kaydırılmış not satırları; son y'yi döndürür. */
export function lines(els: El[], y: number, texts: string[], tone: Tone = "muted", x = 0, max = CW - 0.4): number {
  for (const s of texts.flatMap((t) => wrap(t, max - x))) {
    els.push(txt(v(x, y), s, "e", { small: true, tone }));
    y -= LH;
  }
  return y;
}

/** Bir sayıyı Türkçe biçimde yazar (ondalık virgül, gerçek eksi). */
export const nt = (x: number, d = 1) => {
  const r = Math.round(x * 10 ** d) / 10 ** d;
  return r.toLocaleString("tr-TR", { maximumFractionDigits: d }).replace("-", "−");
};
