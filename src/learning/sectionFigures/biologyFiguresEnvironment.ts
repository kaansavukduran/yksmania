import { ball, circle, fmt, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * Güncel çevre sorunları. A lake cross-section that walks eutrophication one
 * link at a time with a dissolved-oxygen gauge, an atmosphere cut-away that
 * keeps the greenhouse effect (infrared held in the troposphere), stratospheric
 * ozone (UV absorbed high up) and acid deposition (SO₂/NOₓ → lower rain pH)
 * as three separate mechanisms, and a survey where individuals rise while
 * species fall. Oxygen and survey numbers are the guide's teaching values,
 * not measurements; drawings are schematic.
 */

const wave = (x0: number, x1: number, y: number, amp = 0.06, n = 24): V[] =>
  Array.from({ length: n + 1 }, (_, i) => v(x0 + ((x1 - x0) * i) / n, y + amp * Math.sin(i * 1.4)));

/* ---------- 1. Ötrofikasyon basamakları ---------- */
const O2 = [8, 9, 5, 2.5];
const eutro: FigureDef = {
  caption:
    "İleri ile ötrofikasyonu halka halka izle. Gübredeki azot (N) ve fosfor (P) göle taşınır, algler çoğalır. Gündüz fotosentez oksijeni artırabilir; algler ölüp dibe çökünce ayrıştırıcıların oksijenli solunumu çözünmüş oksijeni düşürür, balıklar zarar görür. Sağdaki gösterge çözünmüş O₂'dir (mg/L; öğretim değerleri).",
  alt: "Göl kesiti: solda tarla ve göle akan gübre okları, yüzeyde yeşil alg tabakası, dipte çöken ölü algler ve ayrıştırıcı noktaları, balıklar. Sağda dikey çözünmüş oksijen göstergesi her adımda değişir.",
  steps: ["Besin tuzu girişi", "Alg patlaması", "Ölüm ve ayrışma", "Oksijen düşer"],
  draw: (_v, step) => {
    const els: El[] = [];
    // Field and lake basin.
    els.push(poly([v(-4.6, 0.4), v(-2.4, 0.4), v(-2.0, 0), v(-4.6, 0)], { tone: "a", fill: "a" }));
    els.push(poly([v(-2.0, 0), v(-1.2, -1.6), v(2.8, -1.8), v(3.6, 0)], { tone: "b", fill: "b" }));
    els.push(poly(wave(-1.9, 3.5, 0, 0.04), { tone: "b", open: true, thin: true }));
    if (step >= 0) for (const x of [-3.9, -3.2]) els.push(vec(v(x, 0.6), v(x + 1.3, 0.05), { tone: "warn", thin: step > 0 }));
    els.push(txt(v(-3.6, 0.4), "N, P", "n", { tone: "warn", small: true, bold: step === 0 }));
    // Algae layer.
    if (step >= 1) els.push(poly([...wave(-1.6, 3.3, -0.05, 0.05), v(3.2, -0.3), v(-1.5, -0.3)], { tone: "c", fill: "c" }));
    // Dead algae and decomposers.
    if (step >= 2) {
      for (const x of [-0.6, 0.2, 0.9, 1.7, 2.3]) els.push(seg(v(x, -1.55), v(x + 0.25, -1.62), { tone: "c", bold: true }));
      for (const p of [v(-0.3, -1.35), v(0.6, -1.4), v(1.4, -1.38), v(2.0, -1.45)]) els.push(circle(p, 0.05, { tone: "ink", fill: "ink" }));
    }
    // Fish: healthy until oxygen falls.
    const fish = (c: V, dead: boolean) => {
      els.push(poly([v(c[0] - 0.25, c[1]), v(c[0], c[1] + 0.12), v(c[0] + 0.25, c[1]), v(c[0], c[1] - 0.12)], { tone: dead ? "muted" : "a", fill: dead ? undefined : "a" }), poly([v(c[0] + 0.25, c[1]), v(c[0] + 0.4, c[1] + 0.1), v(c[0] + 0.4, c[1] - 0.1)], { tone: dead ? "muted" : "a", fill: dead ? undefined : "a" }));
    };
    fish(v(0.4, -0.8), step === 3);
    fish(v(1.8, -1.0), step === 3);
    // Oxygen gauge.
    const gx = 4.6;
    const k = 0.2;
    els.push(poly([v(gx, -1.8), v(gx + 0.4, -1.8), v(gx + 0.4, -1.8 + 10 * k), v(gx, -1.8 + 10 * k)], { tone: "ink", thin: true }));
    const o = O2[step];
    els.push(poly([v(gx, -1.8), v(gx + 0.4, -1.8), v(gx + 0.4, -1.8 + o * k), v(gx, -1.8 + o * k)], { tone: o < 4 ? "warn" : "c", fill: o < 4 ? "warn" : "c" }));
    els.push(txt(v(gx + 0.5, -1.8 + o * k), `${fmt(o, 1)} mg/L`, "e", { tone: o < 4 ? "warn" : "ink", small: true, bold: true }), txt(v(gx + 0.2, 0.25), "çözünmüş O₂", "n", { tone: "muted", small: true }));
    els.push(txt(v(-4.8, 1.4), " ", "c"), txt(v(7.0, -2.2), " ", "c"));
    const rows: [string, string][] = [
      ["Gübredeki N ve P yağmurla göle taşınır: besin tuzu yükü artar.", "Kaynak: tarım, atık su. Önleme bu halkaya yönelir (tampon şerit, arıtma)."],
      ["Algler hızla çoğalır; gündüz fotosentez O₂'yi geçici artırabilir.", "Alg artışını kalıcı oksijen artışı sanma: gece solunumu ve ayrışma gelir."],
      ["Ölen algler dibe çöker; ayrıştırıcılar onları oksijenli solunumla parçalar.", "Oksijeni tüketen halka ayrışmadır, alglerin kendisi değil."],
      ["Çözünmüş O₂ düşer, balıklar zarar görür.", "Tek bir düşük ölçüm kesin nedeni göstermez: sıcaklık ve su dolaşımı da etkiler."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 2. Üç ayrı atmosfer olayı ---------- */
const layers: FigureDef = {
  caption:
    "İleri ile üç olayı ayrı mekanizmalarla incele. Sera etkisi: yüzeyin yaydığı kızılötesi ışınımın bir kısmını troposferdeki sera gazları soğurur ve tutar. Ozon: stratosferdeki ozon tabakası Güneş'in zararlı UV ışınımının bir bölümünü soğurur; ozon incelten maddeler bu korumayı azaltır. Asit birikimi: SO₂ ve azot oksitleri yağışın pH'ını düşürür. CO₂ artışına \"ozon deliği\" denmez.",
  alt: "Atmosfer kesiti: altta yer yüzeyi ve fabrika bacası, troposfer, üstte stratosferde ozon tabakası şeridi, sağ üstte Güneş. Adımlara göre kırmızı dalgalı kızılötesi okları, mor UV okları ya da bacadan çıkan SO₂ ve asitli yağmur damlaları vurgulanır.",
  steps: ["Sera etkisi", "Stratosferik ozon", "Asit birikimi"],
  draw: (_v, step) => {
    const els: El[] = [];
    els.push(poly([v(-4, 0), v(4, 0), v(4, -0.4), v(-4, -0.4)], { tone: "a", fill: "a" }));
    els.push(poly([v(-4, 3.0), v(4, 3.0), v(4, 3.5), v(-4, 3.5)], { tone: step === 1 ? "b" : "muted", fill: step === 1 ? "b" : undefined, thin: step !== 1 }));
    els.push(txt(v(-3.9, 3.5), "stratosfer · ozon tabakası", "ne", { tone: step === 1 ? "b" : "muted", small: true, bold: step === 1 }), txt(v(-3.9, 2.75), "troposfer", "se", { tone: step === 0 ? "warn" : "muted", small: true, bold: step === 0 }));
    els.push(circle(v(3.4, 4.6), 0.45, { tone: "a", fill: "a" }));
    if (step === 0) {
      for (const x of [-2.4, -0.6, 1.2]) {
        const up: V[] = Array.from({ length: 13 }, (_, i) => v(x + 0.12 * Math.sin(i * 1.6), 0.1 + i * 0.16));
        els.push(poly(up, { tone: "warn", open: true, smooth: true, bold: true }));
        const back: V[] = Array.from({ length: 9 }, (_, i) => v(x + 0.5 + 0.12 * Math.sin(i * 1.6), 2.0 - i * 0.2));
        els.push(poly(back, { tone: "warn", open: true, smooth: true, thin: true }), vec(back[7], back[8], { tone: "warn", thin: true }));
      }
      for (const p of [v(-1.6, 1.6), v(0.3, 1.9), v(2.2, 1.7), v(-2.9, 2.0)]) els.push(ball(p, 0.12, "warn"));
      els.push(txt(v(2.6, 1.0), "kızılötesi tutulur", "e", { tone: "warn", small: true, bold: true }));
    }
    if (step === 1) {
      for (const x of [0.6, 1.6, 2.6]) els.push(vec(v(x + 0.4, 4.4), v(x, 3.55), { tone: "b", bold: true }));
      els.push(vec(v(2.0, 3.0), v(1.6, 0.4), { tone: "b", thin: true, dash: true }));
      els.push(txt(v(2.0, 1.5), "inceldikçe yere ulaşan UV artar", "e", { tone: "b", small: true }));
    }
    if (step === 2) {
      els.push(poly([v(-3.0, 0), v(-3.0, 1.0), v(-2.6, 1.0), v(-2.6, 0)], { tone: "ink", fill: "muted" }));
      const smoke: V[] = Array.from({ length: 10 }, (_, i) => v(-2.8 + i * 0.35, 1.1 + i * 0.12 + 0.08 * Math.sin(i)));
      els.push(poly(smoke, { tone: "muted", open: true, smooth: true, bold: true }), txt(v(-3.05, 0.9), "SO₂, NOₓ", "w", { tone: "ink", small: true, bold: true }));
      for (const p of [v(-0.4, 1.4), v(0.4, 1.0), v(1.2, 1.5), v(2.0, 1.1), v(0.8, 0.5)]) els.push(poly([v(p[0], p[1] + 0.15), v(p[0] + 0.08, p[1]), v(p[0], p[1] - 0.05), v(p[0] - 0.08, p[1])], { tone: "c", fill: "c" }));
      els.push(txt(v(2.4, 0.7), "yağış pH'ı düşer", "e", { tone: "c", small: true, bold: true }));
    }
    els.push(txt(v(-4.6, 5.2), " ", "c"), txt(v(6.4, -0.6), " ", "c"));
    const rows: [string, string][] = [
      ["Sera gazları (CO₂, CH₄, su buharı…) yüzeyin yaydığı kızılötesi ışınımı soğurur; güçlenen sera etkisi uzun dönem ısınma eğilimi doğurur.", "Ölçüm: uzun dönem sıcaklık, ışınım. Bir haftalık soğuk hava iklim eğilimini çürütmez."],
      ["Stratosferik ozon zararlı UV'nin bir bölümünü soğurur; ozon incelten maddeler bu korumayı azaltır.", "Ölçüm: ozon sütunu ve yüzey UV. Yerdeki ozon ise kirleticidir: aynı ad, farklı yer."],
      ["SO₂ ve azot oksitleri suyla asit oluşturur; yağış ve göllerin pH'ı düşer.", "Ölçüm: yağış pH'ı, sülfat. \"Ozon deliği\" asit yağmurunun nedeni değildir."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 3. Birey ve tür ayrı göstergedir ---------- */
const BEFORE = [12, 10, 9, 9, 8, 8, 8, 8, 7, 7, 7, 7]; // 12 türde 100 birey
const AFTER = [40, 30, 25, 10, 6, 4, 3, 2]; // 8 türde 120 birey
const SPECIES_TONES: Tone[] = ["c", "b", "warn", "a", "ink", "muted"];
const indicators: FigureDef = {
  caption:
    "İleri ile kıyıdaki kuş sayımını iki ayrı göstergeyle oku. Birey sayısı 100'den 120'ye çıkarken tür sayısı (tür zenginliği) 12'den 8'e düştü: birkaç yaygın tür çoğaldı, dört tür kayboldu. Toplam birey artışı biyolojik çeşitliliğin arttığını göstermez; karşılaştırma için alan ve gözlem süresi de eşit olmalıdır.",
  alt: "Her biri bir türü gösteren dikey çubuklar: önce 12 tür ve toplam 100 birey, sonra 8 tür ve toplam 120 birey; ilk üç türün çubukları uzamış, son dört tür yok olmuş.",
  steps: ["Önce", "Sonra", "İki gösterge"],
  draw: (_v, step) => {
    const els: El[] = [seg(v(-0.3, 0), v(10.3, 0), { tone: "ink" })];
    const data = step === 0 ? BEFORE : AFTER;
    const k = 0.07;
    data.forEach((n, i) => {
      const x = i * 0.85;
      els.push(poly([v(x, 0), v(x + 0.6, 0), v(x + 0.6, n * k), v(x, n * k)], { tone: SPECIES_TONES[i % SPECIES_TONES.length], fill: SPECIES_TONES[i % SPECIES_TONES.length] }));
    });
    if (step >= 1) for (let i = AFTER.length; i < BEFORE.length; i++) els.push(poly([v(i * 0.85, 0), v(i * 0.85 + 0.6, 0), v(i * 0.85 + 0.6, BEFORE[i] * k), v(i * 0.85, BEFORE[i] * k)], { tone: "muted", dash: true, thin: true }));
    const total = data.reduce((a, b) => a + b, 0);
    els.push(txt(v(5, 3.4), `${data.length} tür · ${total} birey`, "n", { tone: "ink", small: true, bold: true }), txt(v(5, 0), "her çubuk bir tür, boyu birey sayısı", "s", { tone: "muted", small: true }));
    if (step === 2) els.push(txt(v(10.4, 2.6), "birey: 100 → 120 (+20)", "e", { tone: "c", small: true, bold: true }), txt(v(10.4, 1.6), "tür: 12 → 8 (−4)", "e", { tone: "warn", small: true, bold: true }));
    els.push(txt(v(-0.5, 4.0), " ", "c"), txt(v(14.4, -0.9), " ", "c"));
    const rows: [string, string][] = [
      ["Önce: 12 tür, toplam 100 birey; bireyler türlere oldukça dengeli dağılmış.", "Tür zenginliği = farklı tür sayısı."],
      ["Sonra: 8 tür, toplam 120 birey; üç tür çok çoğaldı, dört tür (kesik çubuklar) yok.", "Habitat kaybı, kirlilik ya da istilacı tür böyle bir tablo doğurabilir; tek sayımla kesin neden söylenmez."],
      ["Birey sayısı arttı, tür zenginliği azaldı: iki gösterge ters yönde.", "Biyoçeşitlilik soruluyorsa birey sütunu değil tür (ve genetik, ekosistem) çeşitliliği okunur. 2025 TYT Fen 20: sulak alanı kurutmak türleri korumaz."],
    ];
    return { els, readout: rows[step] };
  },
};

export const biologyFiguresEnvironment: Record<string, Record<string, FigureDef>> = {
  "guncel-cevre-sorunlari": {
    "Ötrofikasyonu tek sıçramayla değil basamak basamak açıkla": eutro,
    "Sera etkisi ile ozon incelmesi farklı mekanizmalardır": layers,
    "Doğru göstergeyi seç: birey, tür ve derişim ayrı sütunlar": indicators,
  },
};
