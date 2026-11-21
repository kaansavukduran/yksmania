import { seg, txt, v, type El, type Tone } from "./figureKit";
import { CW, LH, rect, wrap } from "./turkishFigures060Kit";

/*
 * Forge061 TYT Coğrafya çizim yardımcıları: yatay çubuk satırları ve sayı
 * ekseni. Çubuk boyları yalnız bölüm metnindeki sayılardan ya da sürgünün
 * açıkça yazılan örnek değerinden hesaplanır.
 */

/** Etiket sütunu genişliği (çizim birimi); çubuklar bunun sağında başlar. */
export const LABEL_W = 3.0;
/** Çubuk alanının sağ sınırı. */
export const BAR_R = CW - 0.1;
export const BAR_H = 0.42;

export interface Piece {
  len: number;
  tone: Tone;
  dash?: boolean;
}

/**
 * Bir çubuk satırı: solda kaydırılmış ad, sağda ardışık parçalar. `x` sayıyı
 * çizim birimine çevirir. Çubuğun altına isteğe bağlı açıklama yazılır.
 * Satırın kapladığı yüksekliğin sonundaki y değerini döndürür.
 */
export function barRow(els: El[], y: number, label: string, pieces: Piece[], x: (n: number) => number, note?: string, tone: Tone = "ink"): number {
  const lines = wrap(label, LABEL_W - 0.3, true, true);
  lines.forEach((s, k) => els.push(txt(v(0, y - k * LH), s, "e", { small: true, bold: true, tone })));
  let acc = 0;
  for (const p of pieces) {
    if (p.len > 0) els.push(rect(x(acc), y + BAR_H / 2, x(acc + p.len), y - BAR_H / 2, p.tone, !p.dash, p.dash));
    acc += p.len;
  }
  let yy = y - Math.max(lines.length - 1, 0) * LH;
  if (note) {
    yy -= LH;
    for (const s of wrap(note, BAR_R - LABEL_W - 0.2)) {
      els.push(txt(v(LABEL_W, yy), s, "e", { small: true, tone: "muted" }));
      yy -= LH;
    }
    yy += LH;
  }
  return yy - 0.75;
}

/** Yatay sayı ekseni: çizgi, çentikler ve altında değerler. */
export function axis(els: El[], y: number, ticks: number[], x: (n: number) => number, unit?: string): number {
  els.push(seg(v(x(ticks[0]), y), v(x(ticks[ticks.length - 1]), y), { tone: "muted", thin: true }));
  for (const t of ticks) {
    els.push(seg(v(x(t), y + 0.08), v(x(t), y - 0.08), { tone: "muted", thin: true }));
    els.push(txt(v(x(t), y - 0.14), t.toLocaleString("tr-TR"), "s", { small: true, tone: "muted" }));
  }
  if (unit) els.push(txt(v(LABEL_W - 0.2, y - 0.14), unit, "sw", { small: true, tone: "muted" }));
  return y - 0.9;
}

/** Sola yaslı soluk not satırları. */
export function notes(els: El[], y: number, lines: string[]): number {
  for (const s of lines.flatMap((l) => wrap(l, CW - 0.4))) {
    els.push(txt(v(0, y), s, "e", { small: true, tone: "muted" }));
    y -= LH;
  }
  return y;
}
