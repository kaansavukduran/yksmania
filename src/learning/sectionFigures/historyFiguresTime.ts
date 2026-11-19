import { ball, fmt, poly, seg, txt, v, type El, type FigureDef } from "./figureKit";

/*
 * Century, half and quarter on the chronological strip. Traditional historical
 * numbering has no year 0 (MÖ 1 is followed by MS 1). A century is a block of
 * 100 years (MS 1901–2000 = XX.); in MÖ the block runs from the larger number
 * to the smaller one, so the first half of MÖ III. yüzyıl is 300–251.
 */

const YEARS = [-500, -300, -250, -220, -201, -101, -100, -3, -1, 1, 2, 100, 101, 476, 1071, 1299, 1453, 1789, 1800, 1900, 1901, 2000, 2001, 2026];
const ROMAN: [number, string][] = [[10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
const roman = (n: number) => {
  let out = "";
  for (const [k, s] of ROMAN) while (n >= k) {
    out += s;
    n -= k;
  }
  return out;
};
const label = (y: number) => (y < 0 ? `MÖ ${-y}` : `MS ${y}`);

const centuryStrip: FigureDef = {
  caption:
    "Sürgüyle bir yıl seç. Yıl 100 yıllık yüzyıl bloğuna yerleşir, blok kronolojik sırayla yarılara ve çeyreklere bölünür. MS'de 1901–2000 XX. yüzyıldır (1900 XIX.'un son yılı). MÖ'de blok büyük sayıdan küçüğe akar: MÖ III. yüzyıl 300'den 201'e, ilk yarısı 300–251. Yıl 0 yoktur.",
  alt: "Yatay bir yüzyıl şeridi: soldan sağa zamanın akışı, iki yarıya ve dört çeyreğe bölünmüş; uçlarda yüzyılın ilk ve son yılı, seçilen yıl şerit üzerinde nokta olarak gösterilir.",
  param: { label: "Örnek yıl (sıra)", min: 0, max: YEARS.length - 1, step: 1, init: 16, unit: "" },
  draw: (idx) => {
    const y = YEARS[Math.round(idx)];
    const a = Math.abs(y);
    const c = Math.floor((a - 1) / 100) + 1;
    const first = y > 0 ? 100 * (c - 1) + 1 : 100 * c; // earliest year label
    const last = y > 0 ? 100 * c : 100 * (c - 1) + 1;
    const pos = y > 0 ? y - first : first - a; // 0..99 in time order
    const t = (pos + 0.5) / 100;
    const W = 10;
    const els: El[] = [];
    for (let q = 0; q < 4; q++) {
      const on = Math.floor(t * 4) === q;
      els.push(poly([v((q * W) / 4, 0), v(((q + 1) * W) / 4, 0), v(((q + 1) * W) / 4, 0.8), v((q * W) / 4, 0.8)], { tone: on ? "c" : "muted", fill: on ? "c" : undefined, thin: !on }));
      els.push(txt(v(((q + 0.5) * W) / 4, 0), `${q + 1}. çeyrek`, "s", { tone: on ? "c" : "muted", small: true, bold: on }));
    }
    els.push(seg(v(W / 2, -0.1), v(W / 2, 1.0), { tone: "ink", bold: true }));
    els.push(txt(v(W / 4, 0.8), "1. yarı", "n", { tone: t < 0.5 ? "ink" : "muted", small: true, bold: t < 0.5 }), txt(v((3 * W) / 4, 0.8), "2. yarı", "n", { tone: t >= 0.5 ? "ink" : "muted", small: true, bold: t >= 0.5 }));
    const sign = y > 0 ? "MS" : "MÖ";
    els.push(txt(v(0, 0.4), `${sign} ${first}`, "w", { tone: "ink", small: true }), txt(v(W, 0.4), `${sign} ${last}`, "e", { tone: "ink", small: true }));
    els.push(ball(v(t * W, 0.4), 0.15, "warn"), txt(v(t * W, 1.75), label(y), "n", { tone: "warn", small: true, bold: true }));
    els.push(txt(v(-2.2, 2.7), " ", "c"), txt(v(W + 2.2, -0.9), " ", "c"));
    const half = t < 0.5 ? "ilk yarısı" : "ikinci yarısı";
    const quarter = Math.floor(t * 4) + 1;
    const formula = y > 0 ? `⌊(${a} − 1)/100⌋ + 1 = ${c}` : `⌊(${a} − 1)/100⌋ + 1 = ${c} (MÖ)`;
    const edge =
      y === 1900 || y === 2000 || y === 1800 || y === 100
        ? `Tam yüzlü yıl bloğun SON yılıdır: ${label(y)} → ${roman(c)}. yüzyıl, ${label(y + 1)} yeni yüzyılı başlatır.`
        : y === -1 || y === 1
          ? "MÖ 1'den sonra doğrudan MS 1 gelir; yıl 0 yoktur. MÖ a ile MS b arasında (aynı gün) a + b − 1 yıl geçer."
          : "MÖ'de büyük sayı daha eskidir: MÖ 300 → MÖ 201 → MS 1 → MS 1453 sırası.";
    return {
      els,
      readout: [`${label(y)}: ${sign} ${roman(c)}. yüzyıl (${sign} ${first}–${last}), ${half}, ${quarter}. çeyrek. Yüzyıl = ${formula}. Konum ${fmt(t * 100, 1)}/100.`, edge],
    };
  },
};

export const historyFiguresTime: Record<string, Record<string, FigureDef>> = {
  "tarih-zaman": { "Yarı ve çeyrek için kronolojik konumu kullan": centuryStrip },
};
