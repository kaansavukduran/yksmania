import { ball, poly, seg, txt, v, type El, type FigureDef } from "./figureKit";

/*
 * Early Republic reforms on one year strip. A reference-year slider splits the
 * events into "gerçekleşmiş" (on or before) and "henüz değil" (after): the
 * reasoning of 2025 AYT Sosyal Bilimler-2 Tarih-2 soru 10, where a 1933 speech
 * cannot list the 1934 parliamentary right. Women's political rights are kept
 * as three separate levels (1930 belediye, 1933 köy, 1934 milletvekili) and
 * the 1926 Medeni Kanun is a different kind of right.
 */

type Ev = { y: number; s: string; kadin?: boolean };
const EVENTS: Ev[] = [
  { y: 1922, s: "Saltanat kalktı" },
  { y: 1923, s: "Cumhuriyet" },
  { y: 1924, s: "Hilafet kalktı" },
  { y: 1924, s: "Tevhid-i Tedrisat" },
  { y: 1926, s: "Medeni Kanun" },
  { y: 1928, s: "Yeni harfler" },
  { y: 1929, s: "Millet Mektepleri" },
  { y: 1930, s: "Kadın: belediye", kadin: true },
  { y: 1931, s: "Türk Tarih Kurumu" },
  { y: 1932, s: "Türk Dil Kurumu" },
  { y: 1933, s: "Kadın: köy", kadin: true },
  { y: 1934, s: "Soyadı Kanunu" },
  { y: 1934, s: "Kadın: milletvekili", kadin: true },
  { y: 1937, s: "İlkeler anayasada" },
];
const X0 = 1922;
const K = 0.7; // strip units per year
const ROW = 0.62;

const reformStrip: FigureDef = {
  caption:
    "Referans yılını kaydır: o yıl ve öncesi renkli (gerçekleşmiş), sonrası gri (henüz değil). 1933 seçilince yalnız 1934 ve 1937 olayları gride kalır; bu yüzden 1933'teki bir konuşma kadınların milletvekili hakkını anamaz (2025 AYT Sosyal Bilimler-2 Tarih-2 soru 10 mantığı). Kadın hakları (vurgulu) üç ayrı düzeydir: 1930 belediye, 1933 köy, 1934 milletvekili; 1926 Medeni Kanun aile ve miras hakkıdır.",
  alt: "Yatay eksende 1922–1937 yılları, her satırda bir olay: olayın yılında nokta ve sağında adı. Referans yılını gösteren dikey çizginin solundaki olaylar renkli, sağındakiler gri.",
  param: { label: "Referans yılı", min: 1922, max: 1937, step: 1, init: 1933, unit: "" },
  draw: (ref) => {
    const r = Math.round(ref);
    const W = (1937 - X0) * K;
    const top = (EVENTS.length - 1) * ROW;
    const els: El[] = [];
    const rx = (r - X0 + 0.5) * K;
    els.push(poly([v(-0.2, -0.5), v(rx, -0.5), v(rx, top + 0.35), v(-0.2, top + 0.35)], { tone: "c", fill: "c", thin: true }));
    els.push(seg(v(-0.2, -0.5), v(W + 0.2, -0.5), { tone: "muted" }));
    for (const y of [1922, 1926, 1930, 1934, 1937]) {
      els.push(seg(v((y - X0) * K, -0.6), v((y - X0) * K, -0.4), { tone: "muted" }));
      els.push(txt(v((y - X0) * K, -0.6), String(y), "s", { tone: "muted", small: true }));
    }
    const later: string[] = [];
    EVENTS.forEach((e, i) => {
      const x = (e.y - X0) * K;
      const y = top - i * ROW;
      const done = e.y <= r;
      if (!done) later.push(`${e.s} (${e.y})`);
      const tone = done ? (e.kadin ? "warn" : "c") : "muted";
      els.push(ball(v(x, y), 0.1, tone));
      els.push(seg(v(-0.2, y), v(x - 0.15, y), { tone: "muted", thin: true, dash: true }));
      els.push(txt(v(-0.4, y), e.s, "w", { tone, small: true, bold: done && !!e.kadin }));
    });
    els.push(seg(v(rx, -0.5), v(rx, top + 0.35), { tone: "ink", bold: true }));
    els.push(txt(v(-0.6, top + 0.6), " ", "c"), txt(v(W + 0.6, -1.4), " ", "c"));
    return {
      els,
      readout: [
        `${r} itibarıyla gerçekleşmemiş: ${later.length ? later.join(", ") : "hiçbiri"}.`,
        "Kabul ile yürürlük ayrı olabilir: Medeni Kanun 17 Şubat 1926'da kabul, 4 Ekim 1926'da yürürlük.",
      ],
    };
  },
};

export const historyFiguresRepublic: Record<string, Record<string, FigureDef>> = {
  "ataturkculuk-inkilap": { "Kronolojiyi bir karşılaştırma aracı yap": reformStrip },
};
