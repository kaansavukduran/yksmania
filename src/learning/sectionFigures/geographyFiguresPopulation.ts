import { fmt, poly, seg, txt, v, type El, type FigureDef } from "./figureKit";

/*
 * The five pyramid types of the MEB typology as normalized teaching models
 * (not real country data): 14 five-year bands, 0–4 … 60–64 and 65+, each bar
 * split equally between the two sides; all bars together make 100 %. The
 * readout derives the 0–14, 15–64 and 65+ shares and the age dependency ratio.
 */

const TYPES: { name: string; w: number[]; note: string }[] = [
  {
    name: "İçe çökük",
    w: Array.from({ length: 14 }, (_, i) => Math.exp(-0.2 * i)),
    note: "Geniş taban, yaşla hızlı daralma, az ileri yaş. Kesin doğum ya da ölüm hızı ayrıca veri ister.",
  },
  {
    name: "Düzgün üçgen",
    w: Array.from({ length: 14 }, (_, i) => 14 - i * 0.9),
    note: "Yüksek çocuk payı, düzenli daralma.",
  },
  {
    name: "Asimetrik",
    w: [0.78, 0.92, 1.0, 1.02, 1.0, 0.98, 0.95, 0.9, 0.85, 0.78, 0.7, 0.6, 0.5, 0.95],
    note: "Taban, üstündeki genç kuşaktan dar: son doğumlar azalmış. Ad iki tarafın eşitsizliği demek değildir.",
  },
  {
    name: "Arı kovanı",
    w: [0.82, 0.85, 0.88, 0.9, 0.92, 0.93, 0.93, 0.92, 0.9, 0.88, 0.85, 0.8, 0.75, 1.6],
    note: "Orta kuşaklar birbirine yakın, ileri yaş belirgin; taban göreli dar.",
  },
  {
    name: "Çan",
    w: [1.0, 0.92, 0.84, 0.86, 0.9, 0.92, 0.92, 0.9, 0.88, 0.85, 0.8, 0.74, 0.66, 1.3],
    note: "Daha önce daralan taban yeniden genişliyor.",
  },
];
const AGES = ["0–4", "5–9", "10–14", "15–19", "20–24", "25–29", "30–34", "35–39", "40–44", "45–49", "50–54", "55–59", "60–64", "65+"];

const pyramid: FigureDef = {
  caption:
    "İleri ile beş öğretim modelini karşılaştır (gerçek ülke verisi değil). Her çubuk bir yaş grubunun toplam nüfus içindeki payıdır; sol ve sağ taraf aynı toplama göre olduğundan aynı yaşta toplanır. En üstteki 65+ açık uçlu bir gruptur (beş yıldan uzun), bu yüzden geniş görünebilir. Okumada 0–14, 15–64 ve 65+ payları ile yaş bağımlılık oranı (çocuk + yaşlı) ÷ 15–64 hesaplanır.",
  alt: "Ortada dikey eksen, iki yana uzanan yatay çubuklar: aşağıda 0–4 yaş, yukarıda 65+. Her adımda piramidin biçimi değişir: içe çökük, düzgün üçgen, asimetrik, arı kovanı, çan.",
  steps: TYPES.map((t) => t.name),
  draw: (_v, step) => {
    const t = TYPES[step];
    const total = t.w.reduce((a, b) => a + b, 0);
    const pct = t.w.map((x) => (100 * x) / total);
    const els: El[] = [];
    const scale = 0.32; // units per percent, each side gets half the band
    const h = 0.42;
    pct.forEach((p, i) => {
      const y = i * (h + 0.06);
      const half = (p / 2) * scale;
      const tone = i < 3 ? "c" : i === 13 ? "warn" : "b";
      els.push(poly([v(-half, y), v(0, y), v(0, y + h), v(-half, y + h)], { tone, fill: tone, thin: true }));
      els.push(poly([v(0, y), v(half, y), v(half, y + h), v(0, y + h)], { tone, fill: tone, thin: true }));
      if ((i % 3 === 0 && i < 12) || i === 13) els.push(txt(v(-4.6, y + h / 2), AGES[i], "e", { tone: "muted", small: true }));
    });
    els.push(seg(v(0, -0.1), v(0, 14 * (h + 0.06)), { tone: "ink", thin: true }));
    els.push(txt(v(-2.2, -0.1), "erkek", "s", { tone: "muted", small: true }), txt(v(2.2, -0.1), "kadın", "s", { tone: "muted", small: true }));
    els.push(txt(v(-4.8, 7.4), " ", "c"), txt(v(4.8, -0.9), " ", "c"));
    const child = pct.slice(0, 3).reduce((a, b) => a + b, 0);
    const old = pct[13];
    const work = 100 - child - old;
    return {
      els,
      readout: [
        `${t.name}: 0–14 %${fmt(child, 1)} · 15–64 %${fmt(work, 1)} · 65+ %${fmt(old, 1)} · yaş bağımlılık oranı (${fmt(child, 1)} + ${fmt(old, 1)}) ÷ ${fmt(work, 1)} × 100 = ${fmt(((child + old) / work) * 100, 1)}`,
        `${t.note} 15–64 payı çalışanların oranı değildir; kişi sayısı için toplam nüfusla çarp.`,
      ],
    };
  },
};

export const geographyFiguresPopulation: Record<string, Record<string, FigureDef>> = {
  "nufus-piramitleri": { "İçe çökük ve düzgün üçgen tipleri": pyramid },
};
