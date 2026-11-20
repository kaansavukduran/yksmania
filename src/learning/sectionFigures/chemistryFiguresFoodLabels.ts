import { poly, seg, txt, v, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * TYT Kimya · Polimer, hazır gıda, ilaç ve yağ. Etiket örnekleri özgündür,
 * gerçek marka verisi değildir. m = ρV (ρ g/mL, V mL → m g). Yağ asidi
 * çizimi şematiktir (18 karbonlu zincir, çift bağ konumları temsilîdir).
 */

const rect = (x0: number, x1: number, y0: number, y1: number, tone: Tone, fill = true): El =>
  poly([v(x0, y1), v(x1, y1), v(x1, y0), v(x0, y0)], { fill: fill ? tone : undefined, tone, thin: true });
const f = (x: number, d = 1) => x.toFixed(d).replace(".", ",");

// 1 · Porsiyon hesabında önce referansı işaretle.
const portion: FigureDef = {
  caption:
    "Etiket: 100 g üründe 18 g yağ. Tüketilen kütleyi kaydır: yağ = kütle × 18/100. 35 g porsiyonda 6,3 g. Etiketteki 18 g, porsiyonun değil 100 g referansının değeridir; önce referansı işaretle, sonra orantıla.",
  alt: "Üstte 100 g referans çubuğu ve 18 g yağ payı; altta seçilen porsiyon çubuğu ve orantılı yağ payı.",
  param: { label: "Porsiyon", min: 0, max: 100, step: 5, init: 35, unit: " g" },
  draw: (m) => {
    const k = 0.06, fat = (m * 18) / 100;
    const els: El[] = [
      txt(v(-0.2, 0.6), "100 g referans", "w", { small: true, bold: true }), rect(0, 100 * k, 0.4, 0.8, "muted"), rect(0, 18 * k, 0.4, 0.8, "warn"), txt(v(100 * k + 0.15, 0.6), "18 g yağ", "e", { small: true }),
      txt(v(-0.2, -0.3), "porsiyon", "w", { small: true, bold: true }), rect(0, Math.max(m * k, 0.001), -0.5, -0.1, "b"), rect(0, Math.max(fat * k, 0.001), -0.5, -0.1, "warn"), txt(v(Math.max(m, 18) * k + 0.15, -0.3), `${f(m, 0)} g → ${f(fat)} g yağ`, "e", { small: true, bold: true, tone: "a" }),
    ];
    els.push(txt(v(-2.6, 1.1), " ", "c"), txt(v(9.0, -0.8), " ", "c"));
    return { els, readout: [`${f(m, 0)} × 18/100 = ${f(fat)} g yağ.`, "Hacim etiketinde de aynı mantık: 120 mL ürün, 30 mL’de 4 g → 4 porsiyon × 4 = 16 g."] };
  },
};

// 2 · 100 mL, 100 g demek değildir.
const MODES = [
  { label: "Etiket rakamı", a: 24, b: 12, unitA: "g / 100 g", unitB: "g / 100 mL", note: "24 ile 12 farklı paydalara aittir; doğrudan karşılaştırılmaz." },
  { label: "Eşit 40 g", a: 9.6, b: 6, unitA: "g yağ", unitB: "g yağ", note: "B: 100 mL = 0,80 × 100 = 80 g → 12/80 = 0,15; 40 g’da A 9,6 g, B 6,0 g." },
];
const density: FigureDef = {
  caption:
    "A ürünü 100 g’da 24 g yağ; B ürünü 100 mL’de 12 g yağ, yoğunluk 0,80 g/mL (özgün etiketler). Bir görünüme tıkla: etiket rakamları farklı paydalarda; m = ρV ile B’yi kütleye çevirip eşit 40 g porsiyonda karşılaştır. Yoğunluk verilmeden mL ile g eşit alınamaz.",
  alt: "İki çubuk: A ve B için seçilen görünümdeki yağ miktarı.",
  picks: MODES.map((m) => ({ label: m.label, title: m.label, detail: [m.note] })),
  draw: (_v, _s, pick = -1) => {
    const m = MODES[pick >= 0 ? pick : 1], k = 0.22;
    const els: El[] = [
      txt(v(-0.2, 0.5), "A", "w", { small: true, bold: true }), rect(0, m.a * k, 0.3, 0.7, "b"), txt(v(m.a * k + 0.15, 0.5), `${f(m.a)} ${m.unitA}`, "e", { small: true }),
      txt(v(-0.2, -0.3), "B", "w", { small: true, bold: true }), rect(0, m.b * k, -0.5, -0.1, "c"), txt(v(m.b * k + 0.15, -0.3), `${f(m.b)} ${m.unitB}`, "e", { small: true }),
    ];
    MODES.forEach((mm, i) => els.push(txt(v(i * 2.8, -1.1), mm.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-0.8, 1.0), " ", "c"), txt(v(8.4, -1.4), " ", "c"));
    return { els, readout: [m.note, "160 mL, ρ = 1,05 → 168 g; 100 g’da 12 g yağ → 20,16 g (19,2 g mL’yi gram saymaktır)."] };
  },
};

// 3 · Doymuşlukta sayılan bağ C=C’dir.
const NAMES = ["doymuş", "tekli doymamış", "çoklu doymamış", "çoklu doymamış"];
const saturation: FigureDef = {
  caption:
    "Yağ asidi zincirindeki C=C sayısını kaydır (şematik 18 karbonlu zincir). 0 → doymuş, 1 → tekli doymamış, 2 ve üzeri → çoklu doymamış. Uçtaki karboksil grubundaki C=O sayılmaz; doymuşlukta yalnız karbon–karbon çift bağı sayılır.",
  alt: "Zikzak karbon zinciri; seçilen sayıda C=C çift çizgiyle vurgulu; uçta COOH grubu.",
  param: { label: "C=C sayısı", min: 0, max: 3, step: 1, init: 2, unit: "" },
  draw: (nv) => {
    const n = Math.round(nv), N = 17, els: El[] = [];
    const px = (i: number) => i * 0.42, py = (i: number) => (i % 2 ? 0.25 : 0);
    const dbl = new Set([8, 11, 14].slice(0, n));
    for (let i = 0; i < N; i++) {
      els.push(seg(v(px(i), py(i)), v(px(i + 1), py(i + 1)), { tone: dbl.has(i) ? "a" : "muted", bold: dbl.has(i) }));
      if (dbl.has(i)) els.push(seg(v(px(i), py(i) - 0.12), v(px(i + 1), py(i + 1) - 0.12), { tone: "a", bold: true }));
    }
    els.push(txt(v(N * 0.42 + 0.15, 0.25), "COOH", "e", { small: true, bold: true }), txt(v(N * 0.42 + 0.3, -0.25), "C=O sayılmaz", "e", { small: true, tone: "muted" }));
    els.push(txt(v(0, -0.7), `${n} C=C → ${NAMES[n]}`, "e", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(-0.4, 0.8), " ", "c"), txt(v(10.4, -1.0), " ", "c"));
    return { els, readout: [`${n} karbon–karbon çift bağ: ${NAMES[n]} yağ asidi.`, "Triaçilgliserolde gliserole üç yağ asidi üç ester bağıyla bağlıdır; yağlar çoğunlukla karışımdır."] };
  },
};

// 4 · Üretim yöntemi ayrı sınıflandırmadır.
const OILS = [
  { label: "Natürel / sızma", kind: "fiziksel elde", cc: "hayır", what: "uygun fiziksel/mekanik elde etme; sızma için ek kalite ölçütleri", not: "yalnız erken hasat ya da tek bir asitlik koşulu değildir" },
  { label: "Rafine", kind: "arıtma", cc: "hayır", what: "serbest asit, renk, koku vb. istenmeyen bileşenleri azaltan arıtma", not: "ana yağ moleküllerini başka yağlara dönüştürmek değildir" },
  { label: "Riviera", kind: "karışım", cc: "hayır", what: "rafine zeytinyağı + uygun natürel zeytinyağı karışımı", not: "adından tek evrensel karışım yüzdesi çıkmaz" },
  { label: "Vinterize", kind: "soğutma + süzme", cc: "hayır", what: "soğukta kristallenen bileşenleri ayırıp bulanıklığı azaltma", not: "hidrojen katma tepkimesi değildir" },
  { label: "Hidrojenasyon", kind: "H₂ katılması", cc: "azalır", what: "C=C bağlarına uygun tepkimede H₂ katılması", not: "vinterizasyon (fiziksel ayırma) ile aynı işlem değildir" },
];
const methods: FigureDef = {
  caption:
    "Üretim yöntemi ayrı bir sınıflandırmadır; aynı yağ hem rafine hem vinterize olabilir. Bir işleme tıkla: işlem türü ve C=C sayısının değişip değişmediği tabloda, ne olduğu ve ne olmadığı kartta açılır. Vinterizasyon fiziksel soğutma–süzme, hidrojenasyon kimyasal katılmadır.",
  alt: "Beş satırlık tablo: işlem adı, işlem türü ve C=C sayısı değişir mi sütunları.",
  picks: OILS.map((o) => ({ label: o.label, title: o.label, detail: [`Nedir: ${o.what}.`, `Ne değildir: ${o.not}.`] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [txt(v(3.5, 0.6), "işlem türü", "c", { small: true, tone: "muted" }), txt(v(6.0, 0.6), "C=C", "c", { small: true, tone: "muted" })];
    OILS.forEach((o, i) => {
      const y = -i * 0.55, sel = pick === i;
      if (sel) els.push(rect(-0.1, 6.6, y - 0.24, y + 0.24, "a", false));
      els.push(txt(v(0, y), o.label, "e", { small: true, bold: true, tone: sel ? "a" : "ink", pick: i }), txt(v(3.5, y), o.kind, "c", { small: true }), txt(v(6.0, y), o.cc, "c", { small: true, bold: o.cc !== "hayır", tone: o.cc !== "hayır" ? "warn" : "muted" }));
    });
    els.push(txt(v(-0.3, 1.0), " ", "c"), txt(v(6.9, -2.6), " ", "c"));
    const o = OILS[pick >= 0 ? pick : 3];
    return { els, readout: [`${o.label}: ${o.what}.`, `Ne değildir: ${o.not}.`] };
  },
};

export const chemistryFiguresFoodLabels: Record<string, Record<string, FigureDef>> = {
  "polimer-gida-ilac-yag": {
    "Porsiyon hesabında önce referansı işaretle": portion,
    "100 mL, 100 g demek değildir": density,
    "Doymuşlukta sayılan bağ C=C’dir": saturation,
    "Üretim yöntemi ayrı sınıflandırmadır": methods,
  },
};
