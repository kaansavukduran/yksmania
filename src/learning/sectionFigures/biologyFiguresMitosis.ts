import { circle, poly, pol, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * Mitosis drawn as a real-looking animal cell (smooth, slightly irregular
 * membrane) with 2n = 4: two homolog pairs, long pair in one colour family and
 * short pair in another, maternal/paternal copies told apart by tone. Each
 * chromatid is a rounded rod; sister chromatids are joined at a centromere dot.
 * Every stage shows its own counts (chromosome, chromatid, DNA molecule, C) and
 * says whether the count is for the whole cell or one pole. Schematic, not to
 * scale; the model assumes normal balanced division as in the guide.
 */

/** Rounded rod (chromatid) from a to b, width w. */
function rod(a: V, b: V, w: number, tone: Tone): El {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const l = Math.hypot(dx, dy) || 1;
  const nx = (-dy / l) * (w / 2);
  const ny = (dx / l) * (w / 2);
  const ux = (dx / l) * (w / 2);
  const uy = (dy / l) * (w / 2);
  return poly(
    [
      v(a[0] + nx, a[1] + ny),
      v(b[0] + nx, b[1] + ny),
      v(b[0] + ux * 0.9, b[1] + uy * 0.9),
      v(b[0] - nx, b[1] - ny),
      v(a[0] - nx, a[1] - ny),
      v(a[0] - ux * 0.9, a[1] - uy * 0.9),
    ],
    { tone, fill: tone, smooth: true, thin: true },
  );
}

type Chrom = { len: number; tone: Tone };
// 2n = 4: long pair (anne/baba) and short pair (anne/baba).
const SET: Chrom[] = [
  { len: 1.0, tone: "a" },
  { len: 1.0, tone: "warn" },
  { len: 0.6, tone: "b" },
  { len: 0.6, tone: "c" },
];

/** Unreplicated chromosome: one rod, centred at c, at angle (radians). */
function single(c: V, ch: Chrom, angle: number, loose = false): El[] {
  const h = ch.len / 2;
  const d = v(Math.cos(angle) * h, Math.sin(angle) * h);
  return [rod(v(c[0] - d[0], c[1] - d[1]), v(c[0] + d[0], c[1] + d[1]), loose ? 0.09 : 0.16, ch.tone)];
}

/** Replicated chromosome (two sisters, X shape) centred at c. */
function sisters(c: V, ch: Chrom, angle: number, tight = true): El[] {
  const h = ch.len / 2;
  const spread = tight ? 0.22 : 0.12;
  const els: El[] = [];
  for (const s of [-1, 1]) {
    const a1 = angle + s * spread;
    const d = v(Math.cos(a1) * h, Math.sin(a1) * h);
    els.push(rod(v(c[0] - d[0], c[1] - d[1]), v(c[0] + d[0], c[1] + d[1]), 0.16, ch.tone));
  }
  els.push(circle(c, 0.07, { tone: "ink", fill: "ink" }));
  return els;
}

/** Smooth, slightly irregular membrane around centre c (radius rx, ry). */
function membrane(c: V, rx: number, ry: number, pinch = 0, seed = 0): El {
  const ps: V[] = [];
  const n = 28;
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2;
    const wob = 1 + 0.035 * Math.sin(3 * t + seed) + 0.02 * Math.cos(5 * t + seed * 2);
    // Cleavage furrow: pull top and bottom in towards the middle.
    const furrow = pinch * Math.exp(-Math.pow(Math.cos(t) / 0.32, 2));
    ps.push(v(c[0] + Math.cos(t) * rx * wob, c[1] + Math.sin(t) * ry * wob * (1 - furrow)));
  }
  return poly(ps, { tone: "c", smooth: true, bold: true });
}

function nucleus(c: V, r: number, broken = false): El[] {
  if (broken) return [circle(c, r, { tone: "muted", dash: true, thin: true })];
  return [circle(c, r, { tone: "b", bold: true }), circle(v(c[0] - r * 0.7, c[1] - r * 0.45), r * 0.14, { tone: "muted", fill: "muted" })];
}

function centrosome(c: V): El[] {
  return [seg(v(c[0] - 0.09, c[1]), v(c[0] + 0.09, c[1]), { tone: "ink", bold: true }), seg(v(c[0], c[1] - 0.09), v(c[0], c[1] + 0.09), { tone: "ink", bold: true })];
}

function aster(c: V, toward: number): El[] {
  const els: El[] = [];
  for (let k = -3; k <= 3; k++) {
    const a = toward + Math.PI + k * 0.35;
    els.push(seg(c, pol(0.45, (a * 180) / Math.PI, c), { tone: "muted", thin: true }));
  }
  return els;
}

/** Four short, well separated chromosomes inside a daughter nucleus. */
const DAUGHTER: V[] = [v(-0.38, 0.28), v(0.22, 0.4), v(-0.3, -0.36), v(0.32, -0.2)];
function daughter(c: V, k: number, loose: boolean): El[] {
  return SET.flatMap((ch, i) => single(v(c[0] + DAUGHTER[i][0] * k, c[1] + DAUGHTER[i][1] * k), { ...ch, len: ch.len * 0.5 * k }, ANG[i], loose));
}

const spindle = (pole: V, ends: V[]): El[] => ends.map((e) => seg(pole, e, { tone: "muted", thin: true }));

type Stage = {
  name: string;
  draw: () => El[];
  counts: [string, string, string, string];
  scope: string;
  note: string;
};

const C0 = v(0, 0);
const RX = 3.2;
const RY = 2.3;
const ANG = [Math.PI / 2 + 0.5, Math.PI / 2 - 0.3, Math.PI / 2 + 1.1, Math.PI / 2 - 0.9];
const POS: V[] = [v(-0.55, 0.25), v(0.45, 0.35), v(-0.15, -0.5), v(0.6, -0.45)];
const META_Y = [1.5, 0.45, -0.45, -1.2];
const POLE_L = v(-2.7, 0);
const POLE_R = v(2.7, 0);

const stages: Stage[] = [
  {
    name: "G₁",
    draw: () => [membrane(C0, RX, RY), ...nucleus(C0, 1.25), ...SET.flatMap((ch, i) => single(POS[i], ch, ANG[i], true)), ...centrosome(v(1.7, 1.2))],
    counts: ["4", "—", "4", "2C"],
    scope: "bütün hücre",
    note: "Kromatin gevşektir, kromozomlar ayrı ayrı görünmez (çizimde iz olarak). Hücre büyür, organeller çoğalır.",
  },
  {
    name: "S",
    draw: () => [membrane(C0, RX, RY), ...nucleus(C0, 1.25), ...SET.flatMap((ch, i) => sisters(POS[i], ch, ANG[i], false)), ...centrosome(v(1.7, 1.2))],
    counts: ["4", "8", "8", "4C"],
    scope: "bütün hücre",
    note: "DNA eşlenir: her kromozom iki kardeş kromatitli olur. Kromozom sayısı değişmez (4), DNA molekülü iki katına çıkar (8).",
  },
  {
    name: "G₂",
    draw: () => [membrane(C0, RX * 1.04, RY * 1.04), ...nucleus(C0, 1.3), ...SET.flatMap((ch, i) => sisters(POS[i], ch, ANG[i], false)), ...centrosome(v(1.6, 1.25)), ...centrosome(v(1.9, 1.05))],
    counts: ["4", "8", "8", "4C"],
    scope: "bütün hücre",
    note: "Son hazırlık: protein ve enzim sentezi sürer, sentrozom (hayvan hücresinde) iki tanedir. Sayılar S sonundakiyle aynıdır.",
  },
  {
    name: "Profaz",
    draw: () => [
      membrane(C0, RX, RY),
      ...nucleus(C0, 1.3, true),
      ...SET.flatMap((ch, i) => sisters(POS[i], ch, ANG[i])),
      ...centrosome(v(-2.2, 0.4)),
      ...centrosome(v(2.2, -0.4)),
      ...aster(v(-2.2, 0.4), Math.PI),
      ...aster(v(2.2, -0.4), 0),
    ],
    counts: ["4", "8", "8", "4C"],
    scope: "bütün hücre",
    note: "Kromatin yoğunlaşıp X biçimli kromozomlar belirginleşir; çekirdek zarı ve çekirdekçik dağılır (kesik çizgi), sentrozomlar kutuplara gider ve iğ kurulur.",
  },
  {
    name: "Metafaz",
    draw: () => {
      const els: El[] = [membrane(C0, RX, RY), seg(v(0, -2.05), v(0, 2.05), { tone: "muted", dash: true, thin: true })];
      const cs = META_Y.map((y) => v(0, y));
      els.push(...spindle(POLE_L, cs), ...spindle(POLE_R, cs), ...centrosome(POLE_L), ...centrosome(POLE_R));
      SET.forEach((ch, i) => els.push(...sisters(cs[i], { ...ch, len: ch.len * 0.8 }, Math.PI / 2)));
      els.push(txt(v(0, -2.75), "kesik çizgi: ekvator düzlemi", "c", { tone: "muted", small: true }));
      return els;
    },
    counts: ["4", "8", "8", "4C"],
    scope: "bütün hücre",
    note: "Kromozomlar orta düzleme tek tek dizilir (homologlar eşleşmez, tetrat yok). İğ iplikleri her kardeşin kinetokoruna bağlanır: kromozom sayımı için en uygun evre.",
  },
  {
    name: "Anafaz",
    draw: () => {
      const els: El[] = [membrane(C0, RX * 1.12, RY * 0.95)];
      const left = META_Y.map((y) => v(-1.5, y * 0.8));
      const right = META_Y.map((y) => v(1.5, y * 0.8));
      els.push(...spindle(POLE_L, left), ...spindle(POLE_R, right), ...centrosome(POLE_L), ...centrosome(POLE_R));
      SET.forEach((ch, i) => {
        // V shape: centromere leads, arms trail towards the middle.
        for (const [c, dir] of [
          [left[i], 1],
          [right[i], -1],
        ] as [V, number][]) {
          const h = ch.len * 0.55;
          els.push(rod(c, v(c[0] + dir * h * 0.8, c[1] + h * 0.55), 0.16, ch.tone), rod(c, v(c[0] + dir * h * 0.8, c[1] - h * 0.55), 0.16, ch.tone));
          els.push(circle(c, 0.07, { tone: "ink", fill: "ink" }));
        }
      });
      els.push(vec(v(-0.5, -1.75), v(-1.6, -1.75), { tone: "warn" }), vec(v(0.5, -1.75), v(1.6, -1.75), { tone: "warn" }));
      return els;
    },
    counts: ["8", "0", "8", "4C"],
    scope: "bütün hücre (her kutupta 4 kromozom, 4 DNA)",
    note: "Kardeş kromatitler ayrılır; her biri artık bağımsız kromozomdur. Bütün hücrede anlık 8 kromozom vardır ama yeni DNA üretilmedi: DNA yine 8.",
  },
  {
    name: "Telofaz",
    draw: () => {
      const L = v(-1.7, 0);
      const R = v(1.7, 0);
      return [
        membrane(C0, RX * 1.15, RY * 0.95, 0.25),
        ...nucleus(L, 0.95),
        ...nucleus(R, 0.95),
        ...daughter(L, 1.05, false),
        ...daughter(R, 1.05, false),
      ];
    },
    counts: ["4 + 4", "0", "4 + 4", "2C + 2C"],
    scope: "iki çekirdek, tek sitoplazma",
    note: "Kutuplarda çekirdek zarı ve çekirdekçik yeniden oluşur, kromozomlar gevşer. Bir sitoplazmada iki çekirdek olabilir: sitokinez henüz bitmemiştir.",
  },
  {
    name: "Sitokinez",
    draw: () => {
      const L = v(-1.85, 0);
      const R = v(1.85, 0);
      return [
        membrane(L, 1.7, 1.6, 0, 1),
        membrane(R, 1.7, 1.6, 0, 2.3),
        ...nucleus(L, 0.85),
        ...nucleus(R, 0.85),
        ...daughter(L, 0.95, true),
        ...daughter(R, 0.95, true),
        txt(v(0, -2.2), "boğumlanma ile ayrılan iki yavru hücre", "c", { tone: "muted", small: true }),
      ];
    },
    counts: ["4", "—", "4", "2C"],
    scope: "her yavru hücre",
    note: "Hayvan hücresi dıştan içe boğumlanır (bitkide hücre plağı ortadan dışa büyür). Her yavru 2n = 4 ve G₁ DNA miktarını (2C) alır; iki yavrunun toplamı 4C'dir.",
  },
];

const phases: FigureDef = {
  caption:
    "İleri ile 2n = 4 bir hayvan hücresini G₁'den sitokineze kadar izle. Uzun çift ve kısa çift ayrı renk ailesindedir; aynı uzunluktaki iki renk homolog eşlerdir (anne ve baba kökenli). Her adımda sayılar ve “bütün hücre mi, tek kutup mu?” ayrı yazar.",
  alt: "Yuvarlak, hafif düzensiz zarlı bir hayvan hücresi. Çubuk biçimli dört kromozom önce tek, S'den sonra iki kardeş kromatitli X biçiminde. Metafazda orta düzlemde dizili, iki kutuptan iğ iplikleri; anafazda V biçimli kromozomlar kutuplara çekiliyor; telofazda iki çekirdek; sitokinezde iki yavru hücre.",
  steps: stages.map((s) => s.name),
  draw: (_v, step) => {
    const s = stages[step];
    const els = s.draw();
    els.push(txt(v(-4.2, 2.6), " ", "c"), txt(v(4.2, -2.6), " ", "c"));
    const [kr, km, dna, c] = s.counts;
    return {
      els,
      legend: [
        { code: "", label: "uzun çift (homologlar)", tone: "a" },
        { code: "", label: "uzun çiftin eşi", tone: "warn" },
        { code: "", label: "kısa çift", tone: "b" },
        { code: "", label: "kısa çiftin eşi", tone: "c" },
      ],
      readout: [`${s.name} · ${s.scope}: kromozom ${kr} · kromatit ${km} · DNA molekülü ${dna} · DNA miktarı ${c}`, s.note],
    };
  },
};

/* ---------- Hücre döngüsü çarkı ve G₀ ---------- */
const arc = (r: number, a0: number, a1: number): V[] => {
  const ps: V[] = [];
  const n = Math.max(4, Math.round(Math.abs(a1 - a0) / 6));
  for (let i = 0; i <= n; i++) ps.push(pol(r, a0 + ((a1 - a0) * i) / n));
  return ps;
};
// Degrees clockwise from the top (90°), proportions are illustrative only.
const SEG = [
  { name: "G₁", from: 90, to: -40, tone: "a" as Tone, text: "Büyüme, organel çoğalması, yoğun metabolizma (protein sentezi, hücresel solunum)." },
  { name: "S", from: -40, to: -150, tone: "warn" as Tone, text: "DNA eşlenmesi: DNA miktarı 2C → 4C. Kromozom sayısı aynı kalır. Bu evreden sonra normal koşulda bölünme durdurulamaz." },
  { name: "G₂", from: -150, to: -210, tone: "b" as Tone, text: "Son hazırlık: protein, enzim, RNA sentezi; hayvan hücresinde sentrozom eşlenmesi tamamlanır, DNA hasarı denetlenir." },
  { name: "M", from: -210, to: -270, tone: "c" as Tone, text: "Mitoz (karyokinez) ve sitokinez. İğ ipliklerinin kromozomlara bağlanması burada olur, interfazda olmaz." },
];
const cycle: FigureDef = {
  caption:
    "İleri ile döngüyü dolaş: interfaz (G₁, S, G₂) çemberin büyük kısmıdır. Son adımda G₁'den çıkan G₀ kolu ve bölünmeyen hücre örnekleri görünür. Dilim boyları temsilîdir; gerçek süre hücre tipine bağlıdır.",
  alt: "Saat yönünde dört renkli yaydan oluşan hücre döngüsü çarkı: G₁, S, G₂ ve M. G₁ yayından dışarı çıkan bir okla G₀ kutusu; yanında sinir, çizgili kas ve olgun alyuvar hücresi yazıyor.",
  steps: ["G₁", "S", "G₂", "M", "G₀: döngü dışı"],
  draw: (_v, step) => {
    const els: El[] = [];
    SEG.forEach((sg, i) => {
      const on = i === step || step === 4;
      els.push(poly(arc(2, sg.from, sg.to), { tone: on ? sg.tone : "muted", open: true, bold: on, thin: !on }));
      const midA = (sg.from + sg.to) / 2;
      els.push(txt(pol(2.45, midA), sg.name, "c", { tone: on ? sg.tone : "muted", bold: i === step }));
    });
    const tip = pol(2, -270 + 2);
    els.push(vec(pol(2, -262), tip, { tone: "c" }));
    els.push(poly(arc(1.35, 90, -150), { tone: "ink", open: true, thin: true, dash: true }), txt(v(0.15, -0.1), "interfaz", "c", { tone: "ink", small: true }), txt(v(0.15, -0.55), "G₁ + S + G₂", "c", { tone: "muted", small: true }));
    if (step === 4) {
      const from = pol(2, 40);
      els.push(vec(from, v(3.9, 2.2), { tone: "warn", bold: true }), txt(v(4.0, 2.25), "G₀", "e", { tone: "warn", bold: true }));
      els.push(txt(v(4.0, 1.7), "devam sinyali yok", "e", { tone: "warn", small: true }));
      els.push(txt(v(4.0, 0.9), "sinir hücresi", "e", { tone: "ink", small: true }), txt(v(4.0, 0.45), "çizgili kas hücresi", "e", { tone: "ink", small: true }), txt(v(4.0, 0.0), "olgun alyuvar (çekirdeksiz)", "e", { tone: "ink", small: true }));
    }
    els.push(txt(v(-3, 2.8), " ", "c"), txt(v(7.6, -2.8), " ", "c"));
    const text =
      step === 4
        ? "G₁'de devam sinyali gelmezse hücre G₀'a geçer. Sinir ve çizgili kas hücreleri genellikle bölünmez; olgun memeli alyuvarı çekirdeğini kaybettiği için hiç bölünemez. Karaciğer hücresi uyarıyla yeniden döngüye girebilir, bağırsak epiteli sürekli yenilenir."
        : SEG[step].text;
    return { els, readout: [step === 4 ? "G₀ · döngü dışı" : `${SEG[step].name} evresi`, text] };
  },
};

/* ---------- Hücre başına DNA grafiği ---------- */
const dnaGraph: FigureDef = {
  caption:
    "Sürgüyü sürükle: G₁'de 2C, S boyunca artış, G₂ ve mitozda 4C, sitokinezden sonra yavru başına yeniden 2C. Alttaki satır seçilen anın değerini, anafaz–telofazda tek kutbu da ayrıca yazar.",
  alt: "Yatay eksende zaman (G₁, S, G₂, M, yavru G₁), dikey eksende hücre başına DNA miktarı. Çizgi 2C'de başlar, S'de eğimle 4C'ye çıkar, M sonunda dikey olarak 2C'ye iner. Dikey bir imleç seçilen anı gösterir.",
  param: { label: "Zaman", min: 0, max: 10, step: 0.1, init: 1 },
  draw: (t) => {
    const dnaAt = (x: number) => (x < 2 ? 2 : x < 4 ? 2 + (x - 2) : x < 8 ? 4 : 2);
    const Y = (c: number) => (c - 1) * 1.1;
    const els: El[] = [vec(v(0, 0), v(10.4, 0), { tone: "ink" }), vec(v(0, 0), v(0, Y(4.8)), { tone: "ink" })];
    for (const c of [2, 4]) els.push(seg(v(-0.12, Y(c)), v(0.12, Y(c)), { tone: "ink" }), txt(v(-0.2, Y(c)), `${c}C`, "w", { tone: "ink", small: true }));
    const ps: V[] = [v(0, Y(2)), v(2, Y(2)), v(4, Y(4)), v(8, Y(4)), v(8, Y(2)), v(10, Y(2))];
    els.push(poly(ps, { tone: "a", open: true, bold: true }));
    const marks: [number, number, string][] = [
      [0, 2, "G₁"],
      [2, 4, "S"],
      [4, 6, "G₂"],
      [6, 8, "M"],
      [8, 10, "yavru G₁"],
    ];
    for (const [a, b, n] of marks) {
      els.push(seg(v(a, -0.08), v(a, 0.08), { tone: "muted" }), txt(v((a + b) / 2, -0.25), n, "s", { tone: "muted", small: true }));
    }
    const c = dnaAt(t);
    els.push(seg(v(t, 0), v(t, Y(4.6)), { tone: "warn", dash: true }), circle(v(t, Y(c)), 0.12, { tone: "warn", fill: "warn" }));
    els.push(txt(v(0, Y(5.2)), "hücre başına DNA", "e", { tone: "ink", small: true }), txt(v(10.5, 0), "zaman", "e", { tone: "ink", small: true }));
    const phase = marks.find(([a, b]) => t >= a && (t < b || b === 10))?.[2] ?? "G₁";
    const pole = t >= 7 && t < 8 ? " · anafaz–telofazda bir kutupta 2C" : "";
    const pg = (x: number) => `${(x * 3).toLocaleString("tr-TR")} pg`;
    return {
      els,
      readout: [`${phase}: hücre başına ${c.toLocaleString("tr-TR", { maximumFractionDigits: 1 })}C${pole}`, `Örnek ölçek 2C = 6 pg alınırsa: ${pg(c)}. Sitokinezden sonra iki yavrunun toplamı 4C (12 pg): DNA yok olmadı, paylaştırıldı.`],
    };
  },
};

export const biologyFiguresMitosis: Record<string, Record<string, FigureDef>> = {
  mitoz: {
    "Anafazda ayrılan yapı artık kromozomdur": phases,
    "İnterfaz dinlenme dönemi değildir": cycle,
    "DNA grafiğinde izlenen alanı koru": dnaGraph,
  },
};
