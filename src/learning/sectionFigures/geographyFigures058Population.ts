import { circle, fmt, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * TYT Coğrafya · Nüfusun özellikleri ve dünyada nüfusun dağılışı (Forge058).
 * Sayılar bölüm metnindedir: %23 → 100.000'de 23.000, 200.000'de 46.000;
 * bağımlılık (23 + 13) / 64 × 100 = 56,25; ortanca/ortalama dizisi 5, 10,
 * 15, 20, 80; dört hücre 10.000 kişi / 100 km² (2.500'er ya da 7.000 +
 * 3 × 1.000); 1.000.000 kişi / 10.000 km² = 100 kişi/km²; 2022 için
 * yaklaşık 8 milyar. Uzun dönem nüfus eğrisi nitel şemadır, sayı içermez.
 */

const pad = (a: V, b: V): El[] => [txt(a, " ", "c"), txt(b, " ", "c")];
const th = (n: number) => fmt(n, 0);
const rect = (x0: number, y0: number, x1: number, y1: number, tone: Tone, thin = true): El =>
  poly([v(x0, y0), v(x1, y0), v(x1, y1), v(x0, y1)], { tone, fill: tone, thin });

/* ---------------- Nüfusun önemi ve özellikleri ---------------- */

const TOTALS = [100000, 200000];
const share: FigureDef = {
  caption:
    "Pay ile kişi sayısını ayrı hesapla: 0–14 payı %23 iken toplam 100.000 kişide 23.000, 200.000 kişide 46.000 kişi eder. Yüzde aynı kalsa da mutlak gereksinim ölçeği değişir. Önce toplamı ve grubu yaz, sonra yüzdeyi 100'e bölüp çarp.",
  alt: "İki yatay çubuk: toplam nüfus çubuğu ve onun %23'lük bölümü. İkinci adımda toplam çubuk iki katına uzuyor, %23'lük bölüm de iki katına çıkıyor.",
  steps: TOTALS.map((t) => `Toplam ${th(t)}`),
  draw: (_v, step) => {
    const t = TOTALS[step];
    const K = 0.00004;
    const g = t * 0.23;
    const els: El[] = [rect(0, 1.0, t * K, 1.6, "muted"), rect(0, 1.0, g * K, 1.6, "c")];
    els.push(txt(v(t * K + 0.15, 1.3), `toplam ${th(t)}`, "e", { small: true, bold: true }));
    els.push(txt(v((g * K) / 2, 0.7), `0–14: %23 = ${th(g)} kişi`, "s", { small: true, bold: true, tone: "c" }));
    els.push(...pad(v(-0.3, 2.0), v(11.6, -0.3)));
    return { els, readout: [`${th(t)} × 23 / 100 = ${th(g)} kişi.`, "Kişi sayısı aynı kalıp toplam büyürse pay azalabilir; farklı paydalardan yüzdeler toplanmaz."] };
  },
};

const dependency: FigureDef = {
  caption:
    "Yaşa dayalı bağımlılık oranı = (genç + yaşlı) ÷ çalışma çağındaki yaş grubu × 100. Örnek: genç 23, yaşlı 13, çalışma çağı 64 → 36 / 64 × 100 = %56,25. Bu, 15–64 grubundaki her 100 kişiye karşılık 56,25 kişi demektir; toplamın %56,25'i çocuk ya da yaşlıdır demek değildir. 15–64 grubundaki herkes istihdamda değildir.",
  alt: "Üstte 100'lük şerit: 0–14 %23, 15–64 %64, 65+ %13. Altta iki çubuk karşılaştırması: 15–64 grubu 100 birime ölçeklenince bağımlı gruplar 56,25 birim.",
  draw: () => {
    const K = 0.1;
    const els: El[] = [];
    let x = 0;
    for (const [name, p, tone] of [["0–14 %23", 23, "c"], ["15–64 %64", 64, "b"], ["65+ %13", 13, "warn"]] as [string, number, Tone][]) {
      els.push(rect(x, 2.2, x + p * K, 2.9, tone));
      els.push(txt(v(x + (p * K) / 2, p > 15 ? 2.55 : 3.2), name, p > 15 ? "c" : "n", { small: true, bold: true }));
      x += p * K;
    }
    els.push(rect(0, 0.9, 100 * K, 1.4, "b"), txt(v(100 * K + 0.15, 1.15), "15–64 → 100", "e", { small: true, bold: true, tone: "b" }));
    els.push(rect(0, 0, 56.25 * K, 0.5, "a"), txt(v(56.25 * K + 0.15, 0.25), "bağımlı → 56,25", "e", { small: true, bold: true, tone: "a" }));
    els.push(...pad(v(-0.3, 3.6), v(15.2, -0.3)));
    return { els, readout: ["(23 + 13) / 64 × 100 = 36 / 64 × 100 = %56,25.", "65 üstünde çalışan, 15–64 içinde iş gücüne katılmayan insanlar da olabilir."] };
  },
};

const AGES = [5, 10, 15, 20, 80];
const median: FigureDef = {
  caption:
    "Özgün beş kişilik dizi: 5, 10, 15, 20, 80. Ortanca, yaşlar sıralandığında ortadaki değerdir (15); aritmetik ortalama, toplamın kişi sayısına bölünmesidir (130 / 5 = 26). Uç değer (80) ortalamayı ortancadan çok daha fazla etkiler. Beklenen yaşam süresi bu ikisinden ayrı bir yaşam tablosu ölçüsüdür.",
  alt: "Yaş ekseni üzerinde 5, 10, 15, 20 ve 80 noktaları; 15'te ortanca işareti, 26'da ortalama işareti.",
  draw: () => {
    const X = (a: number) => a / 9;
    const els: El[] = [seg(v(0, 0), v(X(90), 0), { thin: true })];
    for (const a of [0, 20, 40, 60, 80]) els.push(seg(v(X(a), -0.1), v(X(a), 0.1), { thin: true }), txt(v(X(a), -0.35), String(a), "s", { small: true, tone: "muted", soft: true }));
    AGES.forEach((a) => els.push(circle(v(X(a), 0.45), 0.16, { tone: "b", fill: "b", bold: true })));
    els.push(seg(v(X(15), 0.75), v(X(15), 1.5), { tone: "c", bold: true }), txt(v(X(15), 1.65), "ortanca 15", "n", { small: true, bold: true, tone: "c" }));
    els.push(seg(v(X(26), 0.15), v(X(26), 2.3), { tone: "a", bold: true, dash: true }), txt(v(X(26) + 0.15, 2.3), "ortalama 26", "e", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(X(80), 0.85), "uç değer", "n", { small: true, tone: "muted" }));
    els.push(txt(v(X(90), -0.9), "yaş", "w", { small: true, tone: "muted" }));
    els.push(...pad(v(-0.4, 2.8), v(X(92), -1.2)));
    return { els, readout: ["Sıralı dizi: 5, 10, 15, 20, 80 → ortanca 15. Toplam 130, 130 / 5 = 26.", "Bir yılda ölenlerin yaş ortalaması, yaşayanların ortanca yaşı ve doğuşta beklenen ömür farklı verilerdir."] };
  },
};

/* ---------------- Dünyada nüfusun dağılışı ---------------- */

const CELLS = [
  { name: "Eşit dağılım", p: [2500, 2500, 2500, 2500] },
  { name: "Tek hücrede yoğunlaşma", p: [7000, 1000, 1000, 1000] },
];
const cells: FigureDef = {
  caption:
    "Dört eş alanlı hücre (her biri 25 km²), toplam 10.000 kişi ve 100 km². Bölge ortalaması iki adımda da 10.000 / 100 = 100 kişi/km²'dir; çünkü toplam ve toplam alan değişmez. Yerel yoğunluklar ise 100'lerden 280 ve 40'lara ayrışabilir. Sayılar ilişkiyi gösteren özgün örnektir, gerçek bir sayım değildir.",
  alt: "2 × 2 hücreli kare. Birinci adımda dört hücrede 2.500 kişi ve 100 kişi/km². İkinci adımda bir hücrede 7.000 kişi ve 280 kişi/km², ötekilerde 1.000 kişi ve 40 kişi/km².",
  steps: CELLS.map((c) => c.name),
  draw: (_v, step) => {
    const c = CELLS[step];
    const els: El[] = [];
    c.p.forEach((n, i) => {
      const x = (i % 2) * 3.2;
      const y = (1 - Math.floor(i / 2)) * 2.0;
      const d = n / 25;
      const tone: Tone = d > 100 ? "a" : d < 100 ? "muted" : "b";
      els.push(rect(x, y, x + 3.2, y + 2.0, tone));
      els.push(txt(v(x + 1.6, y + 1.3), `${th(n)} kişi`, "c", { small: true, bold: true }), txt(v(x + 1.6, y + 0.65), `${th(d)} kişi/km²`, "c", { small: true, tone: tone === "muted" ? "ink" : tone }));
    });
    els.push(txt(v(3.2, -0.35), "bölge ortalaması 100 kişi/km²", "s", { small: true, bold: true, tone: "b" }));
    els.push(...pad(v(-0.3, 4.3), v(6.7, -1.0)));
    return { els, readout: [step === 0 ? "Her hücre 2.500 / 25 = 100 kişi/km²." : "7.000 / 25 = 280 kişi/km²; 1.000 / 25 = 40 kişi/km². Ortalama yine (7.000 + 3 × 1.000) / 100 = 100.", "Ortalama yoğunluk her noktayı göstermez."] };
  },
};

const density: FigureDef = {
  caption:
    "Aritmetik nüfus yoğunluğu = aynı sınır içindeki nüfus ÷ aynı alanın yüzölçümü (kişi/km²). 1.000.000 kişi ÷ 10.000 km² = 100 kişi/km². Tersi km²/kişi (0,01) aynı gösterge değildir. Kare 1 km²'yi, noktalar ortalama 100 kişiyi temsil eder; gerçek dağılım eşit değildir.",
  alt: "1 km²'lik kare içinde 10 × 10 düzenli 100 nokta; yanında 1.000.000 ÷ 10.000 = 100 kişi/km² yazıyor.",
  draw: () => {
    const els: El[] = [poly([v(0, 0), v(3, 0), v(3, 3), v(0, 3)], { tone: "ink", thin: true })];
    for (let i = 0; i < 10; i++) for (let j = 0; j < 10; j++) els.push(circle(v(0.15 + i * 0.3, 0.15 + j * 0.3), 0.05, { tone: "b", fill: "b" }));
    els.push(txt(v(1.5, -0.3), "1 km²", "s", { small: true, bold: true }));
    els.push(txt(v(3.3, 2.2), "1.000.000 ÷ 10.000", "e", { small: true, bold: true }), txt(v(3.3, 1.5), "= 100 kişi/km²", "e", { small: true, bold: true, tone: "b" }), txt(v(3.3, 0.6), "tersi: 0,01 km²/kişi", "e", { small: true, tone: "muted" }));
    els.push(...pad(v(-0.3, 3.3), v(9.0, -0.9)));
    return { els, readout: ["Pay nüfus, payda alan: birim kişi/km².", "Okyanusların ya da Antarktika'nın alana katılıp katılmadığı değişirse karşılaştırmanın kapsamı da değişir."] };
  },
};

const constraints: FigureDef = {
  caption:
    "Ortak sonuç, farklı neden: Sahra ve Arabistan içi gibi kurak alanlarda su azlığı; Kuzey Kanada, Sibirya ve Antarktika çevresinde çok düşük sıcaklık ve uzun don dönemi nüfusu seyrek tutar. Ortak sonuç iki yerin de sıcak ya da aynı ölçüde susuz olduğunu göstermez. Vahalar ve suya erişen kentler çevrelerinden yoğun olabilir.",
  alt: "Solda iki kutu: 'kuraklık: su azlığı' ve 'soğuk: uzun don dönemi'. İkisinden sağdaki 'seyrek nüfus' kutusuna oklar gidiyor.",
  draw: () => {
    const box = (x: number, y: number, w: number, tone: Tone, a: string, b: string) => {
      els.push(poly([v(x, y), v(x + w, y), v(x + w, y + 1.3), v(x, y + 1.3)], { tone, fill: tone, thin: true }));
      els.push(txt(v(x + w / 2, y + 0.88), a, "c", { small: true, bold: true }), txt(v(x + w / 2, y + 0.38), b, "c", { small: true, tone: "ink" }));
    };
    const els: El[] = [];
    box(0, 1.8, 4.4, "warn", "Kuraklık", "Sahra, Gobi, Atacama");
    box(0, -0.2, 4.4, "b", "Soğuk ve don", "Sibirya, Grönland içi");
    box(6.2, 0.8, 3.6, "muted", "Seyrek nüfus", "ortak sonuç");
    els.push(vec(v(4.5, 2.45), v(6.1, 1.65), { tone: "ink" }), vec(v(4.5, 0.45), v(6.1, 1.25), { tone: "ink" }));
    els.push(...pad(v(-0.3, 3.4), v(10.1, -0.5)));
    return { els, readout: ["Kuraklık sıcaklıkla aynı nicelik değildir: Gobi gibi kışları çok soğuk çöller de vardır.", "Nedeni kanıtla seç, karşı örnekle denetle."] };
  },
};

const STAGES = [
  { name: "Paleolitik", x: 1.6, text: "Alet kullanımıyla beslenme ve korunmanın gelişmesi." },
  { name: "Neolitik", x: 5.0, text: "Tarım, hayvanların evcilleştirilmesi ve yerleşik hayat." },
  { name: "Sanayi Devrimi", x: 8.2, text: "Üretim ve sağlık koşullarındaki değişim; ölümler azalırken nüfus daha hızlı büyüyebildi." },
];
const longRun: FigureDef = {
  caption:
    "Ders kaynağı dünya nüfusundaki belirgin artışları üç büyük dönüşümle ilişkilendirir. Eğri nitel şemadır: zaman ve nüfus eksenleri ölçekli değildir, eski dönem nüfusları tahmindir. Uç noktadaki yaklaşık 8 milyar, kaynağın 2022 için verdiği tarihli örnektir. Bir döneme tıkla.",
  alt: "Soldan sağa yükselen nitel eğri; üç işaretli dönüşüm noktasında eğim artıyor: Paleolitik, Neolitik, Sanayi Devrimi; en sağda 2022 yaklaşık 8 milyar.",
  picks: STAGES.map((s) => ({ label: s.name, title: s.name, detail: [s.text] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [seg(v(0, 0), v(10.4, 0), { thin: true }), seg(v(0, 0), v(0, 3.6), { thin: true })];
    const curve: V[] = [v(0.2, 0.1), v(1.6, 0.18), v(3.4, 0.3), v(5.0, 0.45), v(6.6, 0.8), v(8.2, 1.1), v(9.0, 1.9), v(9.6, 3.2)];
    els.push(poly(curve, { open: true, smooth: true, tone: "a", bold: true }));
    STAGES.forEach((s, i) => {
      const on = pick === i;
      const y = s.x === 1.6 ? 0.18 : s.x === 5.0 ? 0.45 : 1.1;
      els.push(circle(v(s.x, y), 0.12, { tone: on ? "a" : "ink", fill: on ? "a" : "ink" }));
      els.push(seg(v(s.x, y + 0.15), v(s.x, 1.05 + i * 0.6), { thin: true, dash: true, tone: "muted" }));
      els.push(txt(v(s.x, 1.2 + i * 0.6), s.name, "n", { small: true, bold: true, tone: on ? "a" : "ink", pick: i }));
    });
    els.push(txt(v(9.5, 3.35), "2022 ≈ 8 milyar", "w", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(-0.15, 3.5), "nüfus", "w", { small: true, tone: "muted" }), txt(v(10.4, -0.35), "zaman", "sw", { small: true, tone: "muted" }));
    els.push(...pad(v(-1.6, 3.9), v(10.6, -0.9)));
    const sel = pick >= 0 ? `${STAGES[pick].name}: ${STAGES[pick].text}` : "Bir döneme tıkla ya da aşağıdan seç.";
    return { els, readout: [sel, "Salgın, kıtlık ve savaşlar belirli yer ve dönemlerde düşüş yaratabilir; uzun dönem artışı her yıl kesintisiz artış değildir."] };
  },
};

export const geographyFigures058Population: Record<string, Record<string, FigureDef>> = {
  "nufus-onemi-ozellikleri": {
    "Pay ile kişi sayısını ayrı hesapla": share,
    "Yaşa dayalı bağımlılık oranı": dependency,
    "Ortanca, ortalama ve beklenen ömür aynı sayı değildir": median,
  },
  "dunya-nufus-dagilisi": {
    "Yoğunluğun pay ve paydasını kur": density,
    "Su ve sıcaklık birlikte yaşamı etkiler": constraints,
    "Aynı ortalama, farklı mahalleler": cells,
    "Dünya nüfusunun uzun zaman çizgisi": longRun,
  },
};
