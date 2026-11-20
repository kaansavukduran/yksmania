import { ball, poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * TYT Kimya · Mol ve kütle. Atom kütleleri g/mol: H 1, He 4, C 12, N 14,
 * O 16, Al 27, S 32, Ca 40. Nₐ ≈ 6,02 × 10²³ mol⁻¹ (soruda 6 × 10²³ verilirse
 * o değer kullanılır). ÖSYM bağı: 2023 TYT Fen 12 (yapılmış sınav, resmî cevap
 * E); çözüm özgündür. Çubuklar sıfır tabanlıdır.
 */

const rect = (x0: number, x1: number, y0: number, y1: number, tone: Tone): El =>
  poly([v(x0, y1), v(x1, y1), v(x1, y0), v(x0, y0)], { fill: tone, tone, thin: true });
const f = (x: number, d = 2) => x.toFixed(d).replace(".", ",");

// 1 · Eşit mol ≠ eşit kütle.
const PAIRS = [
  {
    label: "Eşit mol",
    rows: [["1 mol H₂O", 18, "1,00 mol · 18 g"], ["1 mol CO₂", 44, "1,00 mol · 44 g"]] as [string, number, string][],
    unit: "g",
    detail: ["İkisi de Nₐ molekül; kütleler 18 g ve 44 g.", "Eşit molekül sayısından eşit kütle çıkmaz: m = n × M ve M farklı."],
  },
  {
    label: "Eşit kütle",
    rows: [["14 g N₂", 0.5, "14 ÷ 28 = 0,50 mol"], ["14 g CO₂", 14 / 44, "14 ÷ 44 ≈ 0,32 mol"]] as [string, number, string][],
    unit: "mol",
    detail: ["Kütle eşit, mol farklı: N₂ 0,50 mol, CO₂ ≈ 0,32 mol.", "M küçük olan daha çok molekül taşır; çubuk mol eksenindedir."],
  },
];
const equalMass: FigureDef = {
  caption:
    "Eşit kütle ile eşit tanecik farklıdır. “Eşit mol”e tıkla: 1 mol H₂O ve 1 mol CO₂ aynı sayıda molekül taşır ama 18 g ve 44 g gelir (çubuk gram ekseninde). “Eşit kütle”ye tıkla: 14 g N₂ ve 14 g CO₂ farklı molde kalır (çubuk mol ekseninde).",
  alt: "İki yatay çubuk; seçime göre gram ya da mol ekseninde iki maddenin karşılaştırması.",
  picks: PAIRS.map((p) => ({ label: p.label, title: p.label, detail: p.detail })),
  draw: (_v, _s, pick = -1) => {
    const p = PAIRS[pick >= 0 ? pick : 0];
    const max = Math.max(...p.rows.map((r) => r[1])), k = 4.5 / max;
    const els: El[] = [];
    p.rows.forEach(([name, val, note], i) => {
      const y = 0.6 - i * 0.9;
      els.push(txt(v(-0.2, y), name, "w", { small: true, bold: true }), rect(0, val * k, y - 0.25, y + 0.25, i ? "c" : "b"), txt(v(val * k + 0.15, y), note, "e", { small: true }));
    });
    els.push(seg(v(0, -0.85), v(4.6, -0.85), { thin: true, tone: "muted" }), txt(v(4.6, -1.15), p.unit === "g" ? "kütle (g)" : "madde miktarı (mol)", "e", { small: true, tone: "muted" }));
    PAIRS.forEach((pp, i) => els.push(txt(v(i * 2.6, -1.75), pp.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-2.0, 1.2), " ", "c"), txt(v(8.4, -2.0), " ", "c"));
    return { els, readout: [p.detail[0], p.detail[1]] };
  },
};

// 2 · n = m/M kaydırıcısı.
const nmM: FigureDef = {
  caption:
    "n = m/M bağıntısının anlamı: M maddeye özgüdür (H₂O için 18 g/mol), kütle değişince yalnız mol değişir. Kütleyi kaydır: mol çubuğu aynı oranda uzar; gram ÷ (g/mol) = mol olduğu için birim sadeleşir. 36 g → 2 mol.",
  alt: "Üstte kütle çubuğu, altta mol çubuğu; ortada sabit M = 18 g/mol bölme işlemi.",
  param: { label: "H₂O kütlesi", min: 0, max: 72, step: 4.5, init: 36, unit: " g" },
  draw: (m) => {
    const n = m / 18, gk = 6 / 72, nk = 6 / 4;
    const els: El[] = [
      txt(v(-0.2, 0.8), "m", "w", { bold: true }), rect(0, Math.max(m * gk, 0.001), 0.6, 1.0, "b"), txt(v(m * gk + 0.15, 0.8), `${f(m, 1)} g`, "e", { small: true }),
      txt(v(-0.2, -0.6), "n", "w", { bold: true }), rect(0, Math.max(n * nk, 0.001), -0.8, -0.4, "a"), txt(v(n * nk + 0.15, -0.6), `${f(n)} mol`, "e", { small: true, bold: true, tone: "a" }),
      vec(v(0.4, 0.45), v(0.4, -0.25), { thin: true, tone: "muted" }), txt(v(0.6, 0.1), "÷ 18 g/mol (M sabit)", "e", { small: true, tone: "muted" }),
      seg(v(0, -1.1), v(6, -1.1), { thin: true, tone: "muted" }),
    ];
    [0, 1, 2, 3, 4].forEach((t) => els.push(txt(v(t * nk, -1.4), String(t), "c", { small: true, tone: "muted" })));
    els.push(txt(v(-0.8, 1.4), " ", "c"), txt(v(7.8, -1.7), " ", "c"));
    return { els, readout: [`n = ${f(m, 1)} g ÷ 18 g/mol = ${f(n)} mol.`, `Molekül: ${f(n)} × 6,02 × 10²³; H atomu molü ${f(2 * n)} (iki katı).`] };
  },
};

// 3 · Formülden mol kütlesi.
type Part = [string, number, number, Tone];
const FORMULAS: { label: string; parts: Part[]; note: string }[] = [
  { label: "H₂O", parts: [["H", 2, 1, "b"], ["O", 1, 16, "warn"]], note: "2 × 1 + 16 = 18 g/mol." },
  { label: "CO₂", parts: [["C", 1, 12, "muted"], ["O", 2, 16, "warn"]], note: "12 + 2 × 16 = 44 g/mol; 44, O atomunun değil molekülün M’sidir." },
  { label: "Ca(OH)₂", parts: [["Ca", 1, 40, "c"], ["O", 2, 16, "warn"], ["H", 2, 1, "b"]], note: "40 + 2 × (16 + 1) = 74 g/mol; dıştaki 2 OH grubunun ikisini de çarpar." },
  { label: "Al₂(SO₄)₃", parts: [["Al", 2, 27, "c"], ["S", 3, 32, "a"], ["O", 12, 16, "warn"]], note: "2 × 27 + 3 × (32 + 4 × 16) = 342 g/mol; O = 3 × 4 = 12." },
];
const formulaMass: FigureDef = {
  caption:
    "Formülden mol kütlesine: her atom türünün adedini (parantez dışındaki indis grubun tamamını çarpar) atom kütlesiyle çarp, sonra topla. Bir formüle tıkla: her satırda adet × g/mol ve katkı çubuğu, en altta toplam M. Çubuklar o formülün toplamına göre ölçeklidir.",
  alt: "Seçilen formülün her elementi için adet × atom kütlesi satırları ve toplam mol kütlesi.",
  picks: FORMULAS.map((F) => ({ label: F.label, title: `${F.label}: ${F.parts.reduce((s, [, n, a]) => s + n * a, 0)} g/mol`, detail: [F.note] })),
  draw: (_v, _s, pick = -1) => {
    const F = FORMULAS[pick >= 0 ? pick : 2], M = F.parts.reduce((s, [, n, a]) => s + n * a, 0), k = 3.6 / M;
    const els: El[] = [];
    F.parts.forEach(([el, n, a, tone], i) => {
      const y = 1.0 - i * 0.6, c = n * a;
      els.push(txt(v(-0.2, y), `${el}: ${n} × ${a}`, "w", { small: true }), rect(0, c * k, y - 0.18, y + 0.18, tone), txt(v(c * k + 0.12, y), String(c), "e", { small: true, bold: true }));
    });
    const yt = 1.0 - F.parts.length * 0.6;
    els.push(seg(v(0, yt + 0.25), v(3.6, yt + 0.25), { thin: true, tone: "muted" }), txt(v(-0.2, yt), "Toplam M", "w", { small: true, bold: true, tone: "a" }), txt(v(0.1, yt), `${M} g/mol`, "e", { small: true, bold: true, tone: "a" }));
    FORMULAS.forEach((FF, i) => els.push(txt(v(-1.6 + i * 1.7, -1.75), FF.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-2.2, 1.5), " ", "c"), txt(v(5.4, -2.0), " ", "c"));
    return { els, readout: [F.note, "Ters soru: 0,05 mol X₂(SO₄)₃ = 17,1 g → M = 342; 2X + 288 = 342 → X = 27 g/mol."] };
  },
};

// 4 · 2023 TYT Fen 12.
const SAMPLES = [
  { k: "A", text: "NK’da 1,12 L H₂", n: 0.05, calc: "1,12 ÷ 22,4 = 0,050 mol (yalnız normal koşulda 22,4 L/mol)." },
  { k: "B", text: "1 g H₂", n: 0.5, calc: "M(H₂) = 2 g/mol: 1 ÷ 2 = 0,500 mol. 1 g, 1 mol değildir." },
  { k: "C", text: "1,5 × 10²² H₂ molekülü", n: 0.025, calc: "Nₐ = 6 × 10²³ (soruda verilen): 1,5 × 10²² ÷ 6 × 10²³ = 0,025 mol." },
];
const fen12: FigureDef = {
  caption:
    "2023 TYT Fen 12 (resmî kitapçık, cevap E): aynı H₂ gazı hacim, kütle ve molekül sayısıyla verilmiş. Bir örneğe tıkla: her biri kendi köprüsüyle mole çevrilir; hacim ancak koşul (normal koşul) yazılıysa köprü olur. Sıralama B > A > C.",
  alt: "Üç yatay çubuk: A 0,050, B 0,500, C 0,025 mol H₂.",
  picks: SAMPLES.map((r) => ({ label: r.k, title: `${r.k}: ${f(r.n, 3)} mol H₂`, detail: [r.calc, "Aynı basamakla yaz: 0,500 > 0,050 > 0,025 → B > A > C (E)."] })),
  draw: (_v, _s, pick = -1) => {
    const k = 8, els: El[] = [];
    SAMPLES.forEach((r, i) => {
      const y = -i * 0.9, sel = pick === i;
      els.push(txt(v(-0.2, y), r.k, "w", { small: true, bold: true, tone: sel ? "a" : "ink", pick: i }), rect(0, r.n * k, y - 0.25, y + 0.25, sel ? "a" : "b"), txt(v(r.n * k + 0.15, y), `${r.text} → ${f(r.n, 3)} mol`, "e", { small: true }));
    });
    els.push(txt(v(-0.8, 0.6), " ", "c"), txt(v(9.8, -2.2), " ", "c"));
    return { els, readout: [pick >= 0 ? SAMPLES[pick].calc : "Bir örneğe tıkla.", "H atomu sorulsaydı hepsi × 2: sıralama değişmez."] };
  },
};

// 5 · Ortalama mol kütlesi.
const average: FigureDef = {
  caption:
    "8 g He (4 g/mol) ile CH₄ (16 g/mol) karışıyor. CH₄ kütlesini kaydır: M̄ = toplam kütle ÷ toplam mol eğrisi çizilir. Eşit kütlede (8 g) M̄ = 16 ÷ 2,5 = 6,4 g/mol; (4 + 16) ÷ 2 = 10 yalnız eşit molde (32 g CH₄) geçerlidir. M̄ her zaman 4 ile 16 arasında kalır.",
  alt: "Yatay eksende CH₄ kütlesi 0–48 g, düşey eksende ortalama mol kütlesi; yükselen eğri ve kesikli 10 g/mol çizgisi.",
  param: { label: "CH₄ kütlesi", min: 0, max: 48, step: 4, init: 8, unit: " g" },
  draw: (m) => {
    const Mb = (x: number) => (8 + x) / (2 + x / 16), sx = 6 / 48, sy = 0.3, Mv = Mb(m);
    const els: El[] = [vec(v(0, 0), v(6.4, 0), { thin: true }), vec(v(0, 0), v(0, 18 * sy), { thin: true }), txt(v(6.4, -0.35), "CH₄ (g)", "c", { small: true }), txt(v(0.15, 18.5 * sy), "M̄ (g/mol)", "e", { small: true })];
    for (const t of [4, 10, 16]) els.push(txt(v(-0.15, t * sy), String(t), "w", { small: true, tone: "muted" }));
    els.push(seg(v(0, 10 * sy), v(6, 10 * sy), { dash: true, thin: true, tone: "warn" }), seg(v(0, 16 * sy), v(6, 16 * sy), { dash: true, thin: true, tone: "muted" }));
    const pts = Array.from({ length: 49 }, (_, i) => v(i * sx, Mb(i) * sy));
    els.push(poly(pts, { open: true, smooth: true, tone: "b", bold: true }));
    els.push(ball(v(m * sx, Mv * sy), 0.1, "a"), txt(v(3.0, 5.6), `M̄ = ${f(Mv)} g/mol`, "e", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(-1.2, 6.0), " ", "c"), txt(v(7.0, -0.6), " ", "c"));
    return { els, readout: [`He 2,00 mol + CH₄ ${f(m / 16)} mol. M̄ = (8 + ${f(m, 0)}) g ÷ (2 + ${f(m / 16)}) mol = ${f(Mv)} g/mol.`, m === 32 ? "Eşit mol (2 + 2): aritmetik ortalama 10 burada geçerli." : "Kesikli 10 çizgisi yalnız eşit mol (32 g CH₄) noktasında kesilir."] };
  },
};

export const chemistryFiguresMolMass: Record<string, Record<string, FigureDef>> = {
  "mol-kutle-iliskisi": {
    "Eşit kütle ile eşit tanecik farklıdır": equalMass,
    "n = m/M bağıntısının anlamı": nmM,
    "Formülden mol kütlesine": formulaMass,
    "Hacim ancak koşullarıyla köprü olur": fen12,
    "Karışımın ortalama mol kütlesini türet": average,
  },
};
