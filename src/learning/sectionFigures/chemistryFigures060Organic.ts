import { centroid, circle, poly, seg, txt, v, type El, type FigureDef, type Tone, type V } from "./figureKit";
import { pad } from "./physicsFigures058Kit";
import { at, atom, bond, hexAt, ring, sb, vstack } from "./chemistryFigures060Kit";

/*
 * Forge060 AYT Kimya: organik kimya (sikloalkanlar, alkinler, arenler, karbon
 * kimyasına giriş). Formüller ve sayımlar bölüm metnindeki örneklerden gelir:
 * propan → siklopropan, C₄ için doymamışlık eşdeğeri, CₙH₂ₙ yanması, propin /
 * 2-bütin, etine iki basamaklı Br₂ katılması, kireç taşından asetilen, benzen,
 * Kekulé, orto/meta/para ksilen, naftalin (6 + 6 − 2), CH₄/C₂H₄/C₂H₂ komşu
 * sayısı, elmas, grafit ve C₆₀ (60 · 3 ÷ 2 = 90). Çizimler şematiktir.
 */

const H = (els: El[], c: V, dirs: number[], len = 0.72, tone: Tone = "b") => {
  for (const d of dirs) {
    const p = at(c, d, len);
    els.push(seg(c, p, { tone: "ink" }));
    atom(els, p, "H", tone, 0.2);
  }
};

/* ---------- ayt-sikloalkanlar ---------- */

const ringClose: FigureDef = {
  caption:
    "İleri ile propanın iki uç karbonu arasına yeni bir C–C bağı kurulduğunu düşün. Uçlardaki birer C–H bağına yer kalmaz; aynı karbon sayısında iki H eksilir ve C₃H₈ yerine C₃H₆ (siklopropan) olur. Bu bir yapı karşılaştırmasıdır, kendiliğinden yürüyen bir tepkime değildir. Çizim şematiktir, açılar ölçekli değil.",
  alt: "Solda zikzak üç karbonlu propan, uç karbonlarda üçer, ortada iki H. İkinci adımda üç karbon bir üçgen halka kurar, her karbonda iki H; çıkarılan iki H soluk halka olarak gösterilir.",
  steps: ["Propan C₃H₈", "Siklopropan C₃H₆"],
  draw: (_v, step) => {
    const els: El[] = [];
    if (step === 0) {
      const c: V[] = [v(0, 0), v(1.35, 0.75), v(2.7, 0)];
      bond(els, c[0], c[1]);
      bond(els, c[1], c[2]);
      H(els, c[0], [150, 210, 270]);
      H(els, c[1], [60, 120]);
      H(els, c[2], [30, -30, 270]);
      c.forEach((p) => atom(els, p, "C", "a"));
      els.push(txt(v(1.35, -1.25), "C₃H₈ · 8 H", "s", { tone: "ink", small: true, bold: true }));
    } else {
      const c: V[] = [v(0.45, 0), v(2.25, 0), v(1.35, 1.56)];
      bond(els, c[0], c[1]);
      bond(els, c[1], c[2]);
      bond(els, c[2], c[0]);
      H(els, c[0], [195, 255]);
      H(els, c[1], [-15, 285]);
      H(els, c[2], [60, 120]);
      c.forEach((p) => atom(els, p, "C", "a"));
      els.push(circle(at(c[0], 150, 0.72), 0.2, { tone: "warn", dash: true }), circle(at(c[1], 30, 0.72), 0.2, { tone: "warn", dash: true }));
      els.push(txt(v(1.35, -1.25), "C₃H₆ · 6 H (−2 H)", "s", { tone: "ink", small: true, bold: true }));
    }
    els.push(...pad(-1.4, 2.6, 4.1, -1.9));
    const rows: [string, string][] = [
      ["Açık zincir: uç C'ler CH₃, ortadaki CH₂ → C₃H₈ (CₙH₂ₙ₊₂, n = 3).", "Her C dört bağ: C–C bağları + C–H bağları = 4."],
      ["Yeni C–C bağı uçlardan birer H'nin yerini alır → üç CH₂: C₃H₆ (CₙH₂ₙ).", "En küçük sıradan karbon halkası üç karbonludur."],
    ];
    return { els, readout: rows[step] };
  },
};

const unsat: FigureDef = {
  caption:
    "Sürgüyle dört karbonlu hidrokarbonun H sayısını değiştir. Doymuş açık yapı C₄H₁₀'dur; eksik her iki H bir doymamışlık eşdeğeridir: (2C + 2 − H) ÷ 2. Bir halka ya da bir çift bağ birer, bir üçlü bağ iki eşdeğer sayılır. Sonuç bir diye halka mı çift bağ mı olduğu kesinleşmez.",
  alt: "On küçük daire: bulunan H'ler dolu, eksik H'ler kesikli. Eksik çiftler parantezle gruplanmış; okumada doymamışlık eşdeğeri ve olası yapılar.",
  param: { label: "H sayısı (C₄)", min: 6, max: 10, step: 2, init: 8, unit: "" },
  draw: (h) => {
    const els: El[] = [];
    for (let i = 0; i < 10; i++) {
      const p = v(i * 0.75, 0);
      if (i < h) els.push(circle(p, 0.25, { tone: "b", fill: "b" }));
      else els.push(circle(p, 0.25, { tone: "warn", dash: true }));
    }
    els.push(txt(v(((h - 1) * 0.75) / 2, 0.45), `${h} H var`, "n", { tone: "ink", small: true, bold: true }));
    for (let k = 0; h + 2 * k < 10; k++) {
      const x0 = (h + 2 * k) * 0.75;
      els.push(poly([v(x0 - 0.2, -0.45), v(x0 - 0.2, -0.6), v(x0 + 0.95, -0.6), v(x0 + 0.95, -0.45)], { tone: "warn", open: true, thin: true }));
      els.push(txt(v(x0 + 0.375, -0.65), "1 eşd.", "s", { tone: "warn", small: true }));
    }
    els.push(txt(v(3.4, 1.5), `C₄H${sb(h)}`, "n", { tone: "ink", bold: true }));
    els.push(...pad(-0.7, 2.3, 7.6, -1.5));
    const de = (2 * 4 + 2 - h) / 2;
    const what = de === 0 ? "doymuş açık zincir (bütan)" : de === 1 ? "bir halka ya da bir C=C (siklobütan / büten)" : "iki halka/çift bağ ya da bir üçlü bağ";
    return { els, readout: [`Eşdeğer = (2 · 4 + 2 − ${h}) ÷ 2 = ${de}`, `Olası: ${what}.`] };
  },
};

const chainRing: FigureDef = {
  caption:
    "Siklopropan ile propenin ikisi de C₃H₆'dır. İlki üç C–C tek bağıyla halka kurar; ikincisi açık zincirde bir C=C ve bir C–C taşır. Formül aynı, bağlanma farklı: zincir–halka izomerliği. Her yeni halka ya da π bağı H sayısını yeniden etkiler.",
  alt: "Solda üçgen halka siklopropan, sağda açık zincir propen (bir çift, bir tek C–C bağı). İkisinin altında C₃H₆ yazıyor.",
  draw: () => {
    const els: El[] = [];
    const a: V[] = [v(0, 0), v(1.6, 0), v(0.8, 1.39)];
    bond(els, a[0], a[1]);
    bond(els, a[1], a[2]);
    bond(els, a[2], a[0]);
    H(els, a[0], [195, 255], 0.65);
    H(els, a[1], [-15, 285], 0.65);
    H(els, a[2], [60, 120], 0.65);
    a.forEach((p) => atom(els, p, "C", "a"));
    const b: V[] = [v(3.6, 0.4), v(4.9, 1.1), v(6.2, 0.4)];
    bond(els, b[0], b[1], 2);
    bond(els, b[1], b[2]);
    H(els, b[0], [180, 260], 0.65);
    H(els, b[1], [90], 0.65);
    H(els, b[2], [20, -40, 260], 0.65);
    b.forEach((p) => atom(els, p, "C", "a"));
    els.push(txt(v(0.8, -1.05), "siklopropan", "s", { tone: "ink", small: true, bold: true }), txt(v(4.9, -1.05), "propen", "s", { tone: "ink", small: true, bold: true }));
    els.push(txt(v(0.8, -1.6), "C₃H₆", "s", { tone: "muted", small: true }), txt(v(4.9, -1.6), "C₃H₆", "s", { tone: "muted", small: true }));
    els.push(...pad(-1.0, 2.4, 7.2, -2.3));
    return { els, readout: ["Siklopropan: 3 C–C tek bağ (halka) + 6 C–H.", "Propen: 1 C=C + 1 C–C (açık zincir) + 6 C–H. Aynı formül, farklı bağlanma."] };
  },
};

const burn: FigureDef = {
  caption:
    "Sürgüyle karbon sayısını seç. CₙH₂ₙ'nin tam yanmasında 1 mol bileşikten n mol CO₂ ve n mol H₂O oluşur. Ürünlerde 2n + n = 3n O atomu vardır; bu oksijen O₂'den gelir, o yüzden O₂ katsayısı 3n ÷ 2'dir. Çubuklar O atomlarını sayar: sol O₂, sağ ürünler.",
  alt: "İki düşey çubuk: solda O₂'den gelen O atomları, sağda CO₂ ve H₂O'daki O atomları üst üste. Boyları eşit.",
  param: { label: "Karbon sayısı n", min: 3, max: 8, step: 1, init: 6, unit: "" },
  draw: (n) => {
    const k = 0.17;
    const els: El[] = [];
    els.push(...vstack([{ value: 3 * n, tone: "c", label: `${3 * n} O` }], 0, 0, k, 1.1));
    els.push(...vstack([{ value: 2 * n, tone: "a", label: `CO₂: ${2 * n}` }, { value: n, tone: "b", label: `H₂O: ${n}` }], 3.2, 0, k, 1.6));
    els.push(seg(v(-0.9, 0), v(4.4, 0), { tone: "ink", thin: true }));
    els.push(txt(v(0, 0), "O₂", "s", { tone: "ink", small: true, bold: true }), txt(v(3.2, 0), "ürünler", "s", { tone: "ink", small: true, bold: true }));
    els.push(...pad(-1.3, 24 * k + 0.4, 4.6, -0.8));
    const half = (3 * n) / 2;
    const coef = Number.isInteger(half) ? String(half) : `${3 * n}/2`;
    const dbl = Number.isInteger(half) ? "" : ` · ×2: 2 C${sb(n)}H${sb(2 * n)} + ${3 * n} O₂ → ${2 * n} CO₂ + ${2 * n} H₂O`;
    return { els, readout: [`C${sb(n)}H${sb(2 * n)} + ${coef} O₂ → ${n} CO₂ + ${n} H₂O`, `O: ${2 * n} + ${n} = ${3 * n}${dbl}`] };
  },
};

/* ---------- ayt-alkinler ---------- */

const propyne: FigureDef = {
  caption:
    "Propinde CH₃–C≡CH: üçlü bağdaki iki karbon sp'dir ve komşularıyla doğrusal (≈ 180°) dizilir; C≡C bir σ ve birbirine dik iki π bağıdır. CH₃ karbonu sp³'tür. Sayfadaki rastgele zikzak, sp karbonun gerçek yerel açısı değildir. Şematik.",
  alt: "Yatay bir doğru üzerinde H, C, C, C atomları; ilk iki C arasında üç çizgi. Üçüncü C'ye üç H bağlı. Karbonların altında sp, sp, sp³ etiketleri.",
  draw: () => {
    const els: El[] = [];
    const h = v(-2.5, 0);
    const c1 = v(-1.25, 0);
    const c2 = v(0.15, 0);
    const c3 = v(1.55, 0);
    bond(els, h, c1);
    bond(els, c1, c2, 3);
    bond(els, c2, c3);
    H(els, c3, [65, -65, 0]);
    atom(els, h, "H", "b", 0.2);
    for (const p of [c1, c2, c3]) atom(els, p, "C", "a");
    els.push(txt(v(-1.25, -0.4), "sp", "s", { tone: "warn", small: true, bold: true }), txt(v(0.15, -0.4), "sp", "s", { tone: "warn", small: true, bold: true }), txt(v(1.45, -0.55), "sp³", "s", { tone: "c", small: true, bold: true }));
    els.push(txt(v(-0.55, 0.42), "1 σ + 2 π", "n", { tone: "ink", small: true, bold: true }));
    els.push(txt(v(-1.25, 0.95), "180°", "n", { tone: "muted", small: true }));
    els.push(seg(v(-2.5, 0.8), v(0.15, 0.8), { tone: "muted", dash: true, thin: true }));
    els.push(...pad(-3.0, 1.6, 3.0, -1.2));
    return { els, readout: ["C≡C: 1 σ + 2 π; sp karbonlarda yerel açı ≈ 180°.", "CH₃ karbonu dört tek bağlı: sp³. Bir molekülde farklı hibritleşmeler bulunabilir."] };
  },
};

const terminal: FigureDef = {
  caption:
    "İleri ile propini ve 2-bütini karşılaştır. Üçlü bağ karbonlarından birine doğrudan H bağlıysa uç alkindir. 2-Bütinde üçlü bağın iki karbonu da CH₃'e bağlıdır; CH₃'lerdeki H'ler sp³ karbona bağlı olduğu için onu uç alkin yapmaz.",
  alt: "Zincir: CH₃, C, C ve sonda H (propin) ya da CH₃ (2-bütin). Üçlü bağ karbonuna doğrudan bağlı H vurgulu.",
  steps: ["Propin", "2-Bütin"],
  draw: (_v, step) => {
    const els: El[] = [];
    const xs = [-2.1, -0.7, 0.7, 2.1];
    const p = xs.map((x) => v(x, 0));
    bond(els, p[0], p[1]);
    bond(els, p[1], p[2], 3);
    bond(els, p[2], p[3]);
    atom(els, p[0], "CH₃", "c", 0.42);
    atom(els, p[1], "C", "a");
    atom(els, p[2], "C", "a");
    if (step === 0) {
      atom(els, p[3], "H", "warn", 0.24);
      els.push(txt(v(2.1, -0.4), "uç H", "s", { tone: "warn", small: true, bold: true }));
    } else {
      atom(els, p[3], "CH₃", "c", 0.42);
      els.push(txt(v(2.1, -0.55), "sp³ C", "s", { tone: "muted", small: true }));
    }
    els.push(txt(v(0, 0.55), step === 0 ? "uç alkin" : "iç alkin", "n", { tone: "ink", small: true, bold: true }));
    els.push(...pad(-2.9, 1.3, 2.9, -1.2));
    const rows: [string, string][] = [
      ["Propin CH₃–C≡CH: sp karbona doğrudan bağlı bir H var → uç alkin.", "Etinde (HC≡CH) iki uç karbonun ikisi de H taşır."],
      ["2-Bütin CH₃–C≡C–CH₃: üçlü bağ karbonlarında H yok → iç alkin.", "Uç ayrımı sayfadaki konumla değil, doğrudan bağlantıyla yapılır."],
    ];
    return { els, readout: rows[step] };
  },
};

const bromine: FigureDef = {
  caption:
    "İleri ile etine Br₂'yi iki basamakta kat. Birinci mol Br₂ üçlü bağı çift bağa indirir (C₂H₂Br₂); ikinci mol kalan π bağını da açar (C₂H₂Br₄). Her basamakta birer Br çoklu bağın iki karbonuna yerleşir; başlangıçtaki iki H kaybolmaz. Geometri şematiktir.",
  alt: "İki karbon arasında önce üç, sonra iki, sonra bir çizgi. Karbonlara birer H; her basamakta karbon başına bir Br daha eklenir.",
  steps: ["Etin C₂H₂", "+1 Br₂", "+2 Br₂"],
  draw: (_v, step) => {
    const els: El[] = [];
    const c1 = v(-0.75, 0);
    const c2 = v(0.75, 0);
    bond(els, c1, c2, 3 - step);
    const add = (c: V, dirs: number[], label: string, tone: Tone, r: number) => {
      for (const d of dirs) {
        const q = at(c, d, label === "H" ? 0.8 : 1.0);
        els.push(seg(c, q, { tone: "ink" }));
        atom(els, q, label, tone, r);
      }
    };
    if (step === 0) {
      add(c1, [180], "H", "b", 0.22);
      add(c2, [0], "H", "b", 0.22);
    } else if (step === 1) {
      add(c1, [240], "H", "b", 0.22);
      add(c2, [60], "H", "b", 0.22);
      add(c1, [120], "Br", "warn", 0.3);
      add(c2, [-60], "Br", "warn", 0.3);
    } else {
      add(c1, [180], "H", "b", 0.22);
      add(c2, [0], "H", "b", 0.22);
      add(c1, [95, 265], "Br", "warn", 0.3);
      add(c2, [85, -85], "Br", "warn", 0.3);
    }
    atom(els, c1, "C", "a");
    atom(els, c2, "C", "a");
    els.push(...pad(-2.4, 1.6, 2.4, -1.6));
    const rows: [string, string][] = [
      ["C₂H₂: C≡C = 1 σ + 2 π.", "Bir üçlü bağ en fazla 2 mol Br₂ katar."],
      ["C₂H₂ + Br₂ → C₂H₂Br₂: bir π açıldı, C=C kaldı.", "H sayısı hâlâ 2."],
      ["C₂H₂Br₂ + Br₂ → C₂H₂Br₄: ikinci π de açıldı, C–C tek bağ.", "Toplam 2 mol Br₂ / 1 mol etin; çift bağ ise 1 mol tüketir."],
    ];
    return { els, readout: rows[step] };
  },
};

const LIME: { eq: string; cols: string[]; left: number[]; right: number[]; note: string }[] = [
  { eq: "CaCO₃ → CaO + CO₂", cols: ["Ca", "C", "O"], left: [1, 1, 3], right: [1, 1, 3], note: "Kireç taşından sönmemiş kirece: Ca, C, O iki yanda 1, 1, 3." },
  { eq: "CaO + 3C → CaC₂ + CO", cols: ["Ca", "C", "O"], left: [1, 3, 1], right: [1, 3, 1], note: "Üç C'nin ikisi karbürde (CaC₂), biri CO içinde." },
  { eq: "CaC₂ + 2H₂O → C₂H₂ + Ca(OH)₂", cols: ["Ca", "C", "O", "H"], left: [1, 2, 2, 4], right: [1, 2, 2, 4], note: "Suyun 4 H'sinin ikisi asetilene, ikisi hidroksite; iki O hidroksitte." },
];
const lime: FigureDef = {
  caption:
    "İleri ile kireç taşından asetilene uzanan üç denklemi sırayla aç. Tabloda her element için sol ve sağ taraftaki atom sayısı yan yana: her satır eşit, yani atomlar korunur. Bu kavramsal bir kaynak zinciridir; üretim ya da deney talimatı değildir.",
  alt: "Üstte seçili denklem; altında element sütunları ve sol/sağ satırlarında atom sayıları.",
  steps: ["CaCO₃ → CaO", "CaO → CaC₂", "CaC₂ → C₂H₂"],
  draw: (_v, step) => {
    const s = LIME[step];
    const els: El[] = [txt(v(2.4, 2.4), s.eq, "c", { tone: "ink", bold: true })];
    els.push(txt(v(0, 1.3), "sol", "w", { tone: "muted", small: true }), txt(v(0, 0.5), "sağ", "w", { tone: "muted", small: true }));
    s.cols.forEach((c, i) => {
      const x = 0.8 + i * 1.3;
      els.push(txt(v(x, 1.95), c, "c", { tone: "a", small: true, bold: true }));
      els.push(txt(v(x, 1.3), String(s.left[i]), "c", { tone: "ink", small: true }), txt(v(x, 0.5), String(s.right[i]), "c", { tone: "ink", small: true }));
    });
    els.push(seg(v(0.2, 0.9), v(0.8 + (s.cols.length - 1) * 1.3 + 0.5, 0.9), { tone: "muted", thin: true }));
    els.push(...pad(-1.2, 3.0, 6.0, 0));
    return { els, readout: [s.note, "Her element için sol = sağ: denklem dengeli."] };
  },
};

/* ---------- ayt-arenler ---------- */

const benzene: FigureDef = {
  caption:
    "Benzenin her karbonu iki komşu halka karbonuna ve bir H'ye σ bağıyla bağlıdır: 6 C–C σ ve 6 C–H σ. Her karbonun kalan birer p orbitali halka boyunca ortak π sistemine katılır (iç çember). Bu yüzden formül C₆H₆'dır; türevde yan grup bir H'nin yerini alır.",
  alt: "Altıgen halkanın köşelerinde altı C, her birinden dışarı bir H. Halkanın içinde delokalize π sistemini simgeleyen çember.",
  draw: () => {
    const els: El[] = [];
    const cs = hexAt(v(0, 0), 1.3);
    ring(els, cs);
    els.push(circle(v(0, 0), 0.72, { tone: "c" }));
    cs.forEach((c, i) => {
      const q = at(v(0, 0), 90 + i * 60, 2.2);
      els.push(seg(c, q, { tone: "ink" }));
      atom(els, q, "H", "b", 0.2);
    });
    cs.forEach((c) => atom(els, c, "C", "a", 0.26));
    els.push(txt(v(0, 0), "π", "c", { tone: "c", bold: true }));
    els.push(...pad(-2.8, 2.7, 2.8, -2.7));
    return { els, readout: ["σ: 6 C–C + 6 C–H = 12; her C üç σ komşulu (sp²).", "6 p orbitali → halka boyunca tek π sistemi. C₆H₆."] };
  },
};

const kekule: FigureDef = {
  caption:
    "İleri ile iki Kekulé gösterimini ve kısa gösterimi karşılaştır. A ile B yalnız çift bağ çizgilerinin yeri bakımından farklıdır; atomlar yerinde kalır. Bunlar molekülün sırayla geçtiği iki ayrı molekül değil, aynı yapının katkı yazımlarıdır. Gerçek benzende altı C–C bağı eşdeğerdir; çember bunu hatırlatır.",
  alt: "Altıgen halka; birinci ve ikinci adımda dönüşümlü üç çift bağ farklı kenarlarda, üçüncü adımda çift bağ yerine iç çember.",
  steps: ["Kekulé A", "Kekulé B", "Eşdeğer bağlar"],
  draw: (_v, step) => {
    const els: El[] = [];
    const cs = hexAt(v(0, 0), 1.5);
    ring(els, cs, step === 0 ? [0, 2, 4] : step === 1 ? [1, 3, 5] : []);
    if (step === 2) els.push(circle(v(0, 0), 0.85, { tone: "c" }));
    els.push(txt(v(0, -2.0), step === 2 ? "6 eş bağ" : step === 0 ? "A" : "B", "s", { tone: "ink", small: true, bold: true }));
    els.push(...pad(-2.4, 2.2, 2.4, -2.8));
    const rows: [string, string][] = [
      ["A: 3 tek + 3 çift bağ çizimi.", "Kağıttaki bir katkı yapısı."],
      ["B: çift bağlar öbür kenarlarda; atom konumları aynı.", "A ↔ B bir zaman animasyonu değil, gösterim değişimi."],
      ["Gerçek benzen: altı C–C bağı eşdeğer, π elektronları delokalize.", "Sabit üç kısa + üç uzun bağ resmi kullanılmaz."],
    ];
    return { els, readout: rows[step] };
  },
};

const xylene: FigureDef = {
  caption:
    "İleri ile ikinci CH₃'ün konumunu değiştir. 1,2 orto, 1,3 meta, 1,4 para; iki metilli türevler o-, m-, p-ksilendir. Üçünün de formülü C₈H₁₀'dur; değişen yalnız bağlanma yeridir. Halka düzlemde döndürülünce yeni izomer oluşmaz (1,5 = meta, 1,6 = orto).",
  alt: "Altıgen halka, köşe numaraları 1–6. Birinci köşede CH₃; ikinci CH₃ adıma göre 2, 3 ya da 4 numaralı köşede.",
  steps: ["orto (1,2)", "meta (1,3)", "para (1,4)"],
  draw: (_v, step) => {
    const els: El[] = [];
    const cs = hexAt(v(0, 0), 1.3);
    // numaralama saat yönünde: köşe i, 90 − 60i derece
    const idx = (n: number) => (6 - n) % 6;
    ring(els, cs);
    els.push(circle(v(0, 0), 0.72, { tone: "muted", thin: true }));
    const sub = (n: number) => {
      const c = cs[idx(n)];
      const deg = 90 - 60 * n;
      const q = at(v(0, 0), deg, 2.35);
      els.push(seg(c, at(v(0, 0), deg, 1.95), { tone: "ink" }));
      els.push(txt(q, "CH₃", "c", { tone: "warn", small: true, bold: true }));
    };
    sub(0);
    sub(step + 1);
    for (let n = 0; n < 6; n++) {
      const deg = 90 - 60 * n;
      els.push(txt(at(v(0, 0), deg, 0.98), String(n + 1), "c", { tone: "muted", small: true }));
    }
    els.push(...pad(-3.0, 3.0, 3.0, -3.0));
    const names = ["o-ksilen", "m-ksilen", "p-ksilen"];
    return { els, readout: [`${names[step]}: 1,${step + 2} konumu · C₈H₁₀`, "Formül sabit, metillerin halka konumu farklı: konum izomerleri."] };
  },
};

const naphthalene: FigureDef = {
  caption:
    "Naftalinde iki benzen benzeri halka bir kenarı paylaşır. Ortak kenardaki iki karbonu iki kez sayma: 6 + 6 − 2 = 10 karbon. Ortak karbonlar üç karbona bağlıdır ve H taşımaz; kalan 8 karbonda birer H vardır: C₁₀H₈.",
  alt: "Yan yana kaynaşmış iki altıgen; ortak kenarın iki ucu vurgulu karbon. Dış sekiz karbondan birer H.",
  draw: () => {
    const els: El[] = [];
    const r = 1.2;
    const w = r * Math.cos(Math.PI / 6);
    const A = hexAt(v(-w, 0), r);
    const B = hexAt(v(w, 0), r);
    ring(els, A);
    ring(els, B);
    const shared = [A[5], A[4]];
    const outer: V[] = [...A.slice(0, 4), B[0], B[5], B[4], B[3]];
    const centers: V[] = outer.map((_, i) => v(i < 4 ? -w : w, 0));
    outer.forEach((c, i) => {
      const o = centers[i];
      const d = Math.atan2(c[1] - o[1], c[0] - o[0]) * (180 / Math.PI);
      const q = at(c, d, 0.75);
      els.push(seg(c, q, { tone: "ink" }));
      atom(els, q, "H", "b", 0.18);
    });
    outer.forEach((c) => atom(els, c, "C", "a", 0.24));
    shared.forEach((c) => atom(els, c, "C", "warn", 0.27));
    els.push(txt(v(0, -2.3), "ortak kenar", "s", { tone: "warn", small: true, bold: true }));
    els.push(...pad(-3.4, 2.5, 3.4, -2.9));
    return { els, readout: ["C: 6 + 6 − 2 = 10 (ortak iki C bir kez sayılır).", "H: yalnız 8 dış karbonda → C₁₀H₈."] };
  },
};

/* ---------- karbon-kimyasina-giris ---------- */

const neighbors: FigureDef = {
  caption:
    "Metanda karbonun dört komşusu, etende üç, etinde iki komşusu vardır; üçünde de karbonun bağ mertebeleri toplamı dörttür. Komşu atom sayısı ile ortak elektron çifti sayısı ayrı sayılır. Çizim şematiktir.",
  alt: "Üç molekül yan yana: CH₄ (C'ye dört H), C₂H₄ (C=C ve her C'ye iki H), C₂H₂ (H–C≡C–H). Altlarında komşu sayıları.",
  draw: () => {
    const els: El[] = [];
    const m = v(0, 0);
    H(els, m, [0, 90, 180, 270], 0.8);
    atom(els, m, "C", "a");
    const e1 = v(2.6, 0);
    const e2 = v(3.9, 0);
    bond(els, e1, e2, 2);
    H(els, e1, [125, 235], 0.75);
    H(els, e2, [55, -55], 0.75);
    atom(els, e1, "C", "a");
    atom(els, e2, "C", "a");
    const a1 = v(6.3, 0);
    const a2 = v(7.6, 0);
    bond(els, a1, a2, 3);
    H(els, a1, [180], 0.75);
    H(els, a2, [0], 0.75);
    atom(els, a1, "C", "a");
    atom(els, a2, "C", "a");
    const lab = (x: number, a: string, b: string) => els.push(txt(v(x, -1.25), a, "s", { tone: "ink", small: true, bold: true }), txt(v(x, -1.8), b, "s", { tone: "muted", small: true }));
    lab(0, "CH₄", "4 komşu");
    lab(3.25, "C₂H₄", "3 komşu");
    lab(6.95, "C₂H₂", "2 komşu");
    els.push(...pad(-1.2, 1.3, 8.8, -2.4));
    return { els, readout: ["Bağ mertebesi toplamı her C için 4: 1+1+1+1 · 1+1+2 · 1+3.", "Dört bağ, her zaman dört komşu demek değildir."] };
  },
};

const diamond: FigureDef = {
  caption:
    "İdeal elmasta her iç karbon dört komşu karbona kovalent bağlıdır; yönler düzgün dört yüzlüye yakındır ve ağ üç boyutta sürer. Çizim büyük ağdan alınmış bir merkez + dört komşu kesitidir (kalın bağ öne, kesikli arkaya); elmas tek bir C₅ molekülü değildir.",
  alt: "Ortada bir C, dört C komşusuna bağlı: biri yukarı, ikisi alt yanlara, biri arkaya kesikli. Komşulardan ağın devamını gösteren kısa soluk çizgiler.",
  draw: () => {
    const els: El[] = [];
    const c = v(0, 0);
    const nb: [V, boolean, boolean][] = [
      [v(0, 1.6), false, false],
      [v(-1.5, -0.7), false, false],
      [v(1.0, -1.2), true, false],
      [v(1.45, 0.1), false, true],
    ];
    for (const [p, bold, dash] of nb) {
      els.push(seg(c, p, { tone: "ink", bold, dash }));
      for (const d of [-40, 40]) {
        const ang = Math.atan2(p[1] - c[1], p[0] - c[0]) * (180 / Math.PI) + d;
        els.push(seg(p, at(p, ang, 0.6), { tone: "muted", thin: true, dash: true }));
      }
    }
    for (const [p, , dash] of nb) atom(els, p, "C", dash ? "muted" : "a", dash ? 0.22 : 0.26);
    atom(els, c, "C", "warn", 0.3);
    els.push(...pad(-2.6, 2.5, 2.6, -2.1));
    return { els, readout: ["Her iç C: 4 komşu C, dört yüzlü yönler, 3 boyutlu kovalent ağ.", "Saf elmas elektrik yalıtkanı, ısıyı iyi iletir: iki iletim aynı mekanizma değildir."] };
  },
};

const graphite: FigureDef = {
  caption:
    "Grafitte her iç karbon tabaka içinde üç komşu karbonla bağlanır ve altıgen ağlar oluşur. Tabakalar arasında aynı güçlü kovalent ağ sürmez; daha zayıf etkileşimler (kesikli) vardır. Bu, tabakaların kaymasını ve yumuşak davranışı açıklar; tabaka içindeki delokalize elektronlar iletime katkı verir. Eğik bakış, ölçekli değil.",
  alt: "Üst üste iki eğik altıgen ağ tabakası; tabakalar arası kesikli dikey çizgiler. Bir karbon ve üç komşusu vurgulu.",
  draw: () => {
    const els: El[] = [];
    const layer = (y0: number, dx: number, tone: Tone) => {
      const pts: V[] = [];
      for (let k = 0; k < 3; k++) {
        const hx = hexAt(v(k * 0.92 * Math.sqrt(3) + dx, y0), 0.92).map((p) => v(p[0], y0 + (p[1] - y0) * 0.4));
        for (let i = 0; i < 6; i++) els.push(seg(hx[i], hx[(i + 1) % 6], { tone, bold: tone === "ink" }));
        pts.push(...hx);
      }
      return pts;
    };
    const top = layer(1.6, 0, "ink");
    layer(0, 0.8, "muted");
    for (const x of [0.45, 2.05, 3.65]) els.push(seg(v(x, 1.45), v(x, 0.25), { tone: "c", dash: true, thin: true }));
    const c = top[0];
    atom(els, c, "C", "warn", 0.2);
    els.push(txt(v(4.8, 1.6), "tabaka: 3 komşu", "e", { tone: "ink", small: true, bold: true }), txt(v(5.6, 0), "zayıf etkileşim", "e", { tone: "c", small: true }));
    els.push(...pad(-1.2, 2.4, 9.2, -0.6));
    return { els, readout: ["Tabaka içi: her C 3 komşu C, altıgen kovalent ağ.", "Tabakalar arası zayıf: kayma, yumuşaklık; iletim yöne bağlı olabilir."] };
  },
};

/** Ortak köşe V'den ilk kenar yönü a1 (derece) ile başlayan, iç açısı alfa olan düzgün çokgen. */
function polyAt(V0: V, a1: number, n: number, s: number): V[] {
  const ext = 360 / n;
  const ps: V[] = [V0];
  let d = a1;
  let p = V0;
  for (let i = 1; i < n; i++) {
    p = at(p, d, s);
    ps.push(p);
    d += ext;
  }
  return ps;
}
const c60: FigureDef = {
  caption:
    "İleri ile C₆₀ kafesinin bir köşesinden sayıma geç. İdeal kesik ikosahedronda her karbon üç karbona bağlıdır ve her köşede bir beşgen ile iki altıgen buluşur (108° + 120° + 120° = 348°; düzlemde eksik kalan açı yüzeyin kapanmasını sağlar). Her bağ iki uçtan sayıldığı için 60 · 3 ÷ 2 = 90 bağlantı. Şematik.",
  alt: "Ortak bir köşede birleşen bir beşgen ve iki altıgen; köşedeki karbondan üç bağ çıkıyor. Okumada köşe, bağ ve yüz sayımları.",
  steps: ["Bir köşe", "Bağ sayısı", "Yüz sayısı"],
  draw: (_v, step) => {
    const els: El[] = [];
    const V0 = v(0, 0);
    const s = 1.2;
    const P = polyAt(V0, 90 - 108, 5, s);
    const H1 = polyAt(V0, 90, 6, s);
    const H2 = polyAt(V0, 90 + 120, 6, s);
    const draw = (ps: V[], tone: Tone) => els.push(poly(ps, { tone, fill: tone, thin: true }));
    draw(H1, step === 1 ? "muted" : "b");
    draw(H2, step === 1 ? "muted" : "b");
    draw(P, step === 1 ? "muted" : "warn");
    for (const d of [90 - 108, 90, 210]) els.push(seg(V0, at(V0, d, s), { tone: step === 1 ? "warn" : "ink", bold: true }));
    if (step === 1) els.push(txt(at(V0, 90, s), "3 bağ", "n", { tone: "warn", small: true, bold: true }));
    atom(els, V0, "C", "a", 0.24);
    els.push(txt(centroid(...P), step === 2 ? "12 × 5" : "5", "c", { tone: "ink", small: true, bold: true }), txt(centroid(...H1), step === 2 ? "20 × 6" : "6", "c", { tone: "ink", small: true, bold: true }), txt(centroid(...H2), "6", "c", { tone: "ink", small: true, bold: true }));
    els.push(...pad(-2.6, 2.5, 2.5, -2.4));
    const rows: [string, string][] = [
      ["Her C: 3 komşu C; köşede 1 beşgen + 2 altıgen.", "C₆₀ kapalı bir molekül kafesidir, elmasın sonsuz ağı değil."],
      ["Bağ: 60 · 3 ÷ 2 = 90 (her bağ iki uçtan sayılır).", "Gerçek C₆₀'ta bağ uzunlukları tam eşit değildir."],
      ["Beşgen: 12 · 5 = 60 köşe; altıgen: 20 · 6 = 120 = 2 · 60.", "Her köşe 1 beşgene, 2 altıgene aittir: 12 beşgen, 20 altıgen."],
    ];
    return { els, readout: rows[step] };
  },
};

export const chemistryFigures060Organic: Record<string, Record<string, FigureDef>> = {
  "ayt-sikloalkanlar": {
    "Halka kapatırken ne değişir?": ringClose,
    "Bir çevrim, iki hidrojen eksikliği": unsat,
    "Zincir–halka izomerliğini kanıtla": chainRing,
    "Yanma hesabını atom korunumu ile yap": burn,
  },
  "ayt-alkinler": {
    "Bir sigma, birbirine dik iki pi": propyne,
    "Uç alkin ile iç alkini ayır": terminal,
    "Brom katılmasının iki basamağı": bromine,
    "Kireç taşından asetilene atom muhasebesi": lime,
  },
  "ayt-arenler": {
    "Benzenin formülünü bağlanmadan çıkar": benzene,
    "Kekulé gösterimleri neyi anlatır?": kekule,
    "İki substitüentte konumu kodla": xylene,
    "Naftalinde iki halka bir kenarı paylaşır": naphthalene,
  },
  "karbon-kimyasina-giris": {
    "Dört bağ, her zaman dört komşu demek değil": neighbors,
    "Elmasta dört komşulu üç boyutlu ağ": diamond,
    "Grafitte bağlar ve tabakalar farklı roller taşır": graphite,
    "C₆₀ kafesini komşulukla incele": c60,
  },
};
