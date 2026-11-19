import { ball, circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * Madde döngüleri. A landscape cross-section for the water cycle (sea,
 * mountain, cloud, plants, soil and groundwater) with each pathway lit in
 * turn; a nitrogen map where every arrow names its start and end form; a
 * carbon budget for one forest and one year; and a light slider that shows the
 * plant's net CO₂ as photosynthesis minus respiration. Numbers follow the
 * source's original examples.
 */

/* ---------- 1. Su döngüsü ---------- */
const PATHS: { name: string; from: V; to: V; tone: Tone; note: string }[] = [
  { name: "buharlaşma", from: v(-4.4, 0.3), to: v(-3.4, 3.4), tone: "b", note: "Denizden ve yüzeyden su buharı atmosfere çıkar (sıvı → gaz)." },
  { name: "terleme", from: v(0.9, 1.6), to: v(0.4, 3.5), tone: "c", note: "Bitkiler yapraklarından su buharı verir; buharlaşmadan ayrı bir yoldur." },
  { name: "yoğuşma", from: v(-2.6, 3.9), to: v(-0.8, 4.3), tone: "muted", note: "Yükselen buhar soğuyup damlacıklara dönüşür, bulut oluşur (gaz → sıvı)." },
  { name: "yağış", from: v(2.2, 3.8), to: v(2.6, 2.0), tone: "b", note: "Su yağmur ya da kar olarak yüzeye döner." },
  { name: "yüzey akışı", from: v(3.4, 1.4), to: v(-2.4, 0.35), tone: "b", note: "Yüzeyden akarsularla denize taşınır." },
  { name: "sızma", from: v(2.0, 1.1), to: v(2.0, -0.6), tone: "a", note: "Su toprağa ve kayaç aralarına iner, yer altı suyuna katılır." },
];
const water: FigureDef = {
  caption:
    "İleri ile su döngüsünün yollarını sırayla yak. Su yok olmaz, depo değiştirir: deniz, atmosfer, bulut, toprak, yer altı. Son adımda 100 birim yağışın bütçesi: 40 akış + 35 sızma + 25 buharlaşma.",
  alt: "Kesit manzara: solda deniz, sağda dağ yamacı ve ağaç, üstte bulut; altta toprak ve yer altı suyu katmanı. Adımlarda buharlaşma, terleme, yoğuşma, yağış, yüzey akışı ve sızma okları vurgulanıyor.",
  steps: [...PATHS.map((p) => p.name), "100 birim yağış bütçesi"],
  draw: (_v, step) => {
    const els: El[] = [];
    // Ground layers and groundwater.
    els.push(poly([v(-5, -0.45), v(-2.2, -0.35), v(-2.2, 0), v(-1, 0.4), v(0.5, 0.9), v(1.5, 1.2), v(2.5, 1.6), v(3.4, 2.1), v(4.2, 2.5), v(5, 2.6), v(5, -1.6), v(-5, -1.6)], { tone: "a", fill: "a", thin: true }));
    els.push(poly([v(-5, -0.9), v(5, -0.7), v(5, -1.6), v(-5, -1.6)], { tone: "b", fill: "b", bare: true }), txt(v(4.9, -1.2), "yer altı suyu", "w", { tone: "b", small: true }));
    els.push(poly([v(-5, 0), v(-2.2, 0), v(-2.2, -0.35), v(-5, -0.45)], { tone: "b", fill: "b", thin: true }), txt(v(-4.9, -0.2), "deniz", "e", { tone: "b", small: true, bold: true }));
    // Tree.
    els.push(seg(v(1.1, 1.0), v(1.1, 1.6), { tone: "a", bold: true }), circle(v(1.1, 1.9), 0.45, { tone: "c", fill: "c" }));
    // Cloud.
    for (const [x, y, r] of [
      [0.6, 4.3, 0.45],
      [1.2, 4.5, 0.55],
      [1.9, 4.3, 0.45],
      [-0.1, 4.2, 0.35],
    ] as [number, number, number][])
      els.push(circle(v(x, y), r, { tone: "muted", fill: "muted", thin: true }));
    PATHS.forEach((p, i) => {
      const on = step === i || step === PATHS.length;
      els.push(vec(p.from, p.to, { tone: on ? p.tone : "muted", bold: on, thin: !on, dash: !on }));
      if (on && step < PATHS.length) els.push(txt(v((p.from[0] + p.to[0]) / 2 + 0.15, (p.from[1] + p.to[1]) / 2), p.name, "e", { tone: p.tone, small: true, bold: true }));
    });
    if (step === PATHS.length) {
      els.push(txt(v(-4.9, 5.2), "100 yağış → 40 akış + 35 sızma + ? buharlaşma", "e", { tone: "ink", small: true, bold: true }));
    }
    els.push(txt(v(-5.2, 5.5), " ", "c"), txt(v(5.2, -1.8), " ", "c"));
    const rows =
      step < PATHS.length
        ? [PATHS[step].name[0].toLocaleUpperCase("tr-TR") + PATHS[step].name.slice(1) + ": " + PATHS[step].note, "Hâl değişimi (buharlaşma, yoğuşma) ile güzergâh değişimini (akış, sızma) ayrı oku."]
        : ["Buharlaşma = 100 − 40 − 35 = 25 birim. Sızan 35 birim kaybolmadı: yer altı deposuna geçti.", "Son stok = ilk stok + girişler − sistem dışı çıkışlar; önce sistemin sınırını çiz."];
    return { els, readout: rows };
  },
};

/* ---------- 2. Azot döngüsü ---------- */
const NODES: Record<string, { at: V; label: string; tone: Tone }> = {
  N2: { at: v(0, 3.6), label: "N₂ (atmosfer)", tone: "muted" },
  NH4: { at: v(-3.6, 0.4), label: "NH₃ / NH₄⁺", tone: "warn" },
  NO2: { at: v(-2.0, -2.8), label: "NO₂⁻", tone: "a" },
  NO3: { at: v(2.6, -2.8), label: "NO₃⁻", tone: "b" },
  ORG: { at: v(-0.4, -0.4), label: "organik N (canlı)", tone: "c" },
};
// Hand-placed process labels so they never sit on another arrow.
const PLABEL: [V, "e" | "w" | "n" | "s"][] = [
  [v(-2.2, 2.4), "w"],
  [v(-3.1, -1.3), "w"],
  [v(0.3, -3.2), "s"],
  [v(1.3, -1.4), "e"],
  [v(-1.9, 0.3), "n"],
  [v(1.6, 1.2), "e"],
];
const PROC: { name: string; from: string; to: string; bend?: number; note: string; who: string }[] = [
  { name: "fiksasyon", from: "N2", to: "NH4", note: "N₂ tepkimeye girebilir azota bağlanır.", who: "Bazı bakteriler (ör. baklagil kök nodüllerinde) ve yıldırım." },
  { name: "nitrifikasyon", from: "NH4", to: "NO2", note: "NH₄⁺ önce nitrite yükseltgenir…", who: "Oksijen kullanan nitrifikasyon bakterileri." },
  { name: "nitrifikasyon", from: "NO2", to: "NO3", note: "…sonra nitrata.", who: "Azot atmosfere çıkmaz; yalnız biçim değiştirir." },
  { name: "asimilasyon", from: "NO3", to: "ORG", note: "Kökten alınan nitrat amino asit ve proteinlere katılır.", who: "Bitki; hayvanlar azotu besinlerindeki organik bileşiklerden alır." },
  { name: "amonifikasyon", from: "ORG", to: "NH4", note: "Ölü canlı ve atıklardaki organik azot NH₃ / NH₄⁺'e döner.", who: "Ayrıştırıcı bakteri ve mantarlar." },
  { name: "denitrifikasyon", from: "NO3", to: "N2", note: "Nitrat N₂ gibi gazlara indirgenip atmosfere döner.", who: "Oksijenin kısıtlı olduğu (suya doygun) topraklarda bakteriler." },
];
const nitrogen: FigureDef = {
  caption:
    "İleri ile azot döngüsünün her adımını sırayla yak. Her ok başlangıç ve sonuç biçimini gösterir: süreci adından değil, hangi maddeden hangisine geçildiğinden tanı. NH₄⁺ azalıp NO₃⁻ artıyorsa nitrifikasyondur, N₂ bağlandığını göstermez.",
  alt: "Beş kutu: üstte N₂ (atmosfer), solda NH₃/NH₄⁺, altta NO₂⁻ ve NO₃⁻, sağda organik N. Aralarında fiksasyon, nitrifikasyon, asimilasyon, amonifikasyon ve denitrifikasyon okları; seçili ok vurgulu.",
  steps: PROC.map((p, i) => (i === 2 ? "nitrifikasyon (2)" : p.name)),
  draw: (_v, step) => {
    const els: El[] = [];
    PROC.forEach((p, i) => {
      const a = NODES[p.from].at;
      const b = NODES[p.to].at;
      const on = i === step;
      const d = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      const ux = (b[0] - a[0]) / d;
      const uy = (b[1] - a[1]) / d;
      const off = 0;
      const s = v(a[0] + ux * 0.9 - uy * off, a[1] + uy * 0.9 + ux * off);
      const e = v(b[0] - ux * 0.9 - uy * off, b[1] - uy * 0.9 + ux * off);
      els.push(vec(s, e, { tone: on ? "warn" : "muted", bold: on, thin: !on }));
      if (on) els.push(txt(PLABEL[i][0], p.name, PLABEL[i][1], { tone: "warn", small: true, bold: true }));
    });
    for (const n of Object.values(NODES)) {
      els.push(ball(n.at, 0.42, n.tone));
      els.push(txt(v(n.at[0], n.at[1] - 0.55), n.label, "s", { tone: n.tone, small: true, bold: true }));
    }
    els.push(txt(v(-5, 4.2), " ", "c"), txt(v(5.2, -3.4), " ", "c"));
    const p = PROC[step];
    return { els, readout: [`${p.name[0].toLocaleUpperCase("tr-TR") + p.name.slice(1)}: ${NODES[p.from].label} → ${NODES[p.to].label}. ${p.note}`, p.who] };
  },
};

/* ---------- 3. Karbon bütçesi ---------- */
const carbon: FigureDef = {
  caption:
    "İleri ile bir ormanın bir yıllık karbon bütçesini kur. Fotosentezle 60 kg C girer; solunum ve ayrışmayla 42 kg, yangınla 8 kg C çıkar. Stok değişimi aynı sınır ve aynı süre için: 60 − 42 − 8 = +10 kg C. Yalnız yangına bakmak toplamı vermez.",
  alt: "Ortada orman ve toprak deposunu temsil eden kutu; yukarıdan giren yeşil fotosentez oku, yukarı çıkan mavi solunum/ayrışma oku ve turuncu yangın oku; altta stok değişimi çubuğu.",
  steps: ["Giriş: fotosentez", "Çıkış: solunum + ayrışma", "Çıkış: yangın", "Stok değişimi"],
  draw: (_v, step) => {
    const els: El[] = [];
    els.push(poly([v(-2.2, -1), v(2.2, -1), v(2.2, 1.2), v(-2.2, 1.2)], { tone: "c", fill: "c", thin: true }), txt(v(0, 0.1), "orman + toprak (1 yıl)", "c", { tone: "c", small: true, bold: true }));
    for (const x of [-1.4, -0.4, 0.8, 1.6]) els.push(seg(v(x, 1.2), v(x, 1.6), { tone: "a", bold: true }), circle(v(x, 1.95), 0.38, { tone: "c", fill: "c", thin: true }));
    const arrow = (x: number, up: boolean, len: number, tone: Tone, label: string, on: boolean) => {
      const y0 = up ? 2.4 : 2.4 + len;
      const y1 = up ? 2.4 + len : 2.4;
      els.push(vec(v(x, y0), v(x, y1), { tone: on ? tone : "muted", bold: on, thin: !on }), txt(v(x, 2.55 + len), label, "n", { tone: on ? tone : "muted", small: true, bold: on }));
    };
    arrow(-1.9, false, 3.0, "c", "fotosentez 60", step >= 0);
    if (step >= 1) arrow(0.2, true, 2.1, "b", "solunum + ayrışma 42", true);
    if (step >= 2) arrow(2.1, true, 0.6, "warn", "yangın 8", true);
    if (step === 3) {
      els.push(poly([v(-0.25, -1.3), v(0.25, -1.3), v(0.25, -1.3 - 0.5), v(-0.25, -1.8)], { tone: "c", fill: "c" }), txt(v(0.4, -1.55), "+10 kg C (stok arttı)", "e", { tone: "c", small: true, bold: true }));
    }
    els.push(txt(v(-3, 6), " ", "c"), txt(v(5.6, -2.2), " ", "c"));
    const rows: [string, string][] = [
      ["Fotosentez atmosferdeki CO₂'nin karbonunu organik maddeye katar: +60 kg C.", "Akı (yılda giren) ile depo (o anki miktar) farklı niceliklerdir."],
      ["Solunum ve ayrışma organik karbonu CO₂ olarak geri verir: −42 kg C.", "Bitki fotosentez yaparken solunum da yapar."],
      ["Yangın (yanma) da karbonu CO₂ olarak atmosfere verir: −8 kg C.", "Fosil yakıt yanması uzun süre depoda kalmış karbonu hızla döngüye sokar."],
      ["Net: 60 − 42 − 8 = +10 kg C. Orman bu yıl karbon biriktirdi.", "Farklı sürelerde ölçülmüş akıları doğrudan çıkarma."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 4. Bitki hem alır hem verir ---------- */
const plant: FigureDef = {
  caption:
    "Sürgüyle ışığı değiştir. Fotosentez ışıkla artar (tam ışıkta saatte 12 birim CO₂ alır), solunum ışıktan bağımsız sürer (5 birim verir). Ölçülen değişim ikisinin farkıdır: tam ışıkta net 7 alım, karanlıkta net 5 veriş.",
  alt: "Işık sürgüsüne göre değişen iki yatay çubuk: yeşil fotosentez CO₂ alımı ve mavi solunum CO₂ verişi; altında net değişim çubuğu, sıfırın sağında alım, solunda veriş.",
  param: { label: "Işık", min: 0, max: 100, step: 10, init: 100, unit: "%" },
  draw: (L) => {
    const ph = (12 * L) / 100;
    const resp = 5;
    const net = ph - resp;
    const S = 0.45;
    const els: El[] = [seg(v(0, -2.6), v(0, 1.8), { tone: "ink", thin: true })];
    const bar = (y: number, val: number, tone: Tone, label: string) => {
      if (Math.abs(val) > 1e-9) els.push(poly([v(0, y - 0.3), v(val * S, y - 0.3), v(val * S, y + 0.3), v(0, y + 0.3)], { tone, fill: tone }));
      els.push(txt(v(val >= 0 ? val * S + 0.15 : val * S - 0.15, y), label, val >= 0 ? "e" : "w", { tone, small: true, bold: true }));
    };
    bar(1.2, ph, "c", `fotosentez: ${ph.toLocaleString("tr-TR", { maximumFractionDigits: 1 })} alım`);
    bar(0.2, -resp, "b", "solunum: 5 veriş");
    bar(-1.6, net, net >= 0 ? "c" : "warn", `net: ${net > 0 ? "+" : ""}${net.toLocaleString("tr-TR", { maximumFractionDigits: 1 })}`);
    els.push(txt(v(0, -2.8), "← CO₂ veriş · alım →", "s", { tone: "muted", small: true }));
    els.push(txt(v(-4.6, 2.2), " ", "c"), txt(v(7.4, -3.3), " ", "c"));
    return {
      els,
      readout: [
        `Işık %${L}: fotosentez ${ph.toLocaleString("tr-TR", { maximumFractionDigits: 1 })} − solunum 5 = net ${net.toLocaleString("tr-TR", { maximumFractionDigits: 1 })} birim CO₂ (saatte)`,
        net > 0 ? "Bitki ortamdan net CO₂ alıyor ve net O₂ veriyor." : net < 0 ? "Fotosentez solunumu karşılamıyor: ortama net CO₂ veriliyor. Karanlıkta yalnız solunum sürer." : "Kompanzasyon: alım ve veriş eşit, net değişim sıfır.",
      ],
    };
  },
};

export const biologyFiguresCycles: Record<string, Record<string, FigureDef>> = {
  "madde-donguleri": {
    "Su döngüsünde fiziksel hâl ve güzergâhı ayır": water,
    "Amonifikasyon ve nitrifikasyonda başlangıç maddesini oku": nitrogen,
    "Dönüşüm tablosunu bir korunum hesabına çevir": carbon,
    "Oksijen döngüsü: üretim ve tüketimi birlikte izle": plant,
  },
};
