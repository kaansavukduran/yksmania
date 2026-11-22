import { poly, pt, seg, txt, v, vec, type El, type Tone, type V } from "./figureKit";
import { nf, pad } from "./physicsFigures058Kit";

/*
 * Forge060 TYT Matematik figür yardımcıları: hücre, sayı doğrusu, sütun ve
 * daire dilimi. Bütün konumlar çağıranın verdiği sayılardan hesaplanır;
 * sayılar Türkçe ondalık virgül ve gerçek eksi işaretiyle yazılır.
 */

export { nf, pad };

/** Sol alt köşesi (x, y), genişliği w, yüksekliği h olan dikdörtgen. */
export const rect = (x: number, y: number, w: number, h: number, tone: Tone, fill = true): El =>
  poly([v(x, y), v(x + w, y), v(x + w, y + h), v(x, y + h)], fill ? { tone, fill: tone, thin: true } : { tone, thin: true });

/** Ortasına metin yazılmış hücre. */
export function cell(x: number, y: number, w: number, h: number, s: string, tone: Tone, opts: { fill?: boolean; bold?: boolean; small?: boolean; ink?: Tone } = {}): El[] {
  return [rect(x, y, w, h, tone, opts.fill ?? true), txt(v(x + w / 2, y + h / 2), s, "c", { tone: opts.ink ?? "ink", bold: opts.bold ?? true, small: opts.small ?? true })];
}

/** Sayım belirteci: merkezi (x, y), kenarı s olan dolu kare. */
export const token = (x: number, y: number, s: number, tone: Tone): El => rect(x - s / 2, y - s / 2, s, s, tone);

const SUP: Record<string, string> = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹", "-": "⁻" };
/** Üst simge yazımı: sup(-5) = "⁻⁵". */
export const sup = (n: number) => String(n).split("").map((c) => SUP[c] ?? c).join("");

/** Gerçek eksi işaretli tam sayı yazımı. */
export const zs = (n: number) => String(n).replace("-", "−");

/**
 * Yatay sayı doğrusu: x0..x1 aralığı, k ölçeği, y yüksekliği. `labels`
 * verilen tam sayıların altına küçük, gizlenebilir etiket yazar.
 */
export function numberLine(x0: number, x1: number, k: number, y: number, labels: number[], tone: Tone = "ink"): El[] {
  const els: El[] = [vec(v(x0 * k - 0.3, y), v(x1 * k + 0.4, y), { tone, thin: true })];
  for (let i = Math.ceil(x0); i <= Math.floor(x1); i++) els.push(seg(v(i * k, y - 0.08), v(i * k, y + 0.08), { tone: "muted", thin: true }));
  for (const n of labels) els.push(txt(v(n * k, y - 0.16), zs(n), "s", { tone: "muted", small: true, soft: true }));
  return els;
}

/** Sayı doğrusu üzerinde kalın aralık ve uç noktaları (dolu/boş). */
export function interval(a: number, b: number, k: number, y: number, tone: Tone, openA = false, openB = false): El[] {
  return [seg(v(a * k, y), v(b * k, y), { tone, bold: true }), pt(v(a * k, y), undefined, "n", tone, openA), pt(v(b * k, y), undefined, "n", tone, openB)];
}

/** Daire dilimi: merkez c, yarıçap r, açı a0→a1 (derece, saat yönünün tersi). */
export function sector(c: V, r: number, a0: number, a1: number, tone: Tone): El {
  const ps: V[] = [c];
  const n = Math.max(2, Math.ceil(Math.abs(a1 - a0) / 6));
  for (let i = 0; i <= n; i++) {
    const t = ((a0 + ((a1 - a0) * i) / n) * Math.PI) / 180;
    ps.push(v(c[0] + r * Math.cos(t), c[1] + r * Math.sin(t)));
  }
  return poly(ps, { tone, fill: tone, thin: true });
}

/** Tablo: satır satır hücreler; ilk satır başlıktır. */
export function table(x0: number, y0: number, widths: number[], h: number, rows: { s: string; tone?: Tone; ink?: Tone }[][], headTone: Tone = "muted"): El[] {
  const els: El[] = [];
  rows.forEach((row, r) => {
    let x = x0;
    row.forEach((c, i) => {
      const tone = c.tone ?? (r === 0 ? headTone : "muted");
      els.push(...cell(x, y0 - (r + 1) * h, widths[i], h, c.s, tone, { fill: r === 0 || c.tone !== undefined, ink: c.ink }));
      x += widths[i];
    });
  });
  return els;
}
