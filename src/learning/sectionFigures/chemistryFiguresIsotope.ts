import { ball, poly, seg, txt, v, type El, type FigureDef } from "./figureKit";

/*
 * Atom kütlesi: the average atomic mass as a balance point. The two isotope
 * masses sit on a ruler; stacks of atoms (each ball = 5 % abundance) sit on
 * them; the fulcrum is at the weighted mean, so it always lies between the
 * two masses and closer to the more abundant isotope. A second figure shows
 * that equal masses of two isotopes are not equal numbers of atoms.
 */

const fmt = (x: number, d = 2) => x.toLocaleString("tr-TR", { maximumFractionDigits: d });

/* ---------- 1. Ağırlıklı ortalama: denge noktası ---------- */
const balance: FigureDef = {
  caption:
    "Sürgüyle ağır izotopun (Cl-37) atomca yüzdesini değiştir. Her top %5 bolluktur. Ortalama atom kütlesi, cetvelin dengede kaldığı noktadır: 35 × (1 − x) + 37 × x. Doğadaki klorda %25 Cl-37 için 35,5 u. Ortalama her zaman iki kütlenin arasında ve bol olana yakındır.",
  alt: "35 ile 37 arasında işaretli yatay bir cetvel; 35 noktasının üstünde mavi, 37 noktasının üstünde turuncu top yığınları; cetvelin altındaki üçgen destek ağırlıklı ortalamada.",
  param: { label: "Cl-37 atomca yüzdesi", min: 0, max: 100, step: 5, init: 25, unit: "%" },
  draw: (p) => {
    const x = p / 100;
    const X = (m: number) => (m - 35) * 3;
    const avg = 35 * (1 - x) + 37 * x;
    const els: El[] = [seg(v(X(34.6), 0), v(X(37.4), 0), { tone: "ink", bold: true })];
    for (const m of [35, 36, 37]) els.push(seg(v(X(m), -0.1), v(X(m), 0.1), { tone: "ink" }), txt(v(X(m), -0.85), `${m} u`, "s", { tone: "ink", small: true }));
    els.push(poly([v(X(avg), -0.05), v(X(avg) - 0.3, -0.6), v(X(avg) + 0.3, -0.6)], { tone: "c", fill: "c" }));
    const nL = Math.round((1 - x) * 20);
    const nH = Math.round(x * 20);
    const stack = (m: number, n: number, tone: "b" | "warn") => {
      for (let i = 0; i < n; i++) els.push(ball(v(X(m) + ((i % 4) - 1.5) * 0.26, 0.2 + Math.floor(i / 4) * 0.26), 0.12, tone));
    };
    stack(35, nL, "b");
    stack(37, nH, "warn");
    els.push(txt(v(X(35), 1.75), `Cl-35: %${100 - p}`, "n", { tone: "b", small: true, bold: true }), txt(v(X(37), 1.75), `Cl-37: %${p}`, "n", { tone: "warn", small: true, bold: true }));
    els.push(txt(v(X(avg), -1.4), `ortalama ${fmt(avg)} u`, "s", { tone: "c", small: true, bold: true }));
    els.push(txt(v(-1.4, 2.5), " ", "c"), txt(v(7.4, -2), " ", "c"));
    return {
      els,
      readout: [`35 × ${fmt(1 - x)} + 37 × ${fmt(x)} = ${fmt(avg, 3)} u`, "Ters soru: ortalama verilirse 35(1 − x) + 37x = ortalama → x = (ortalama − 35) ÷ 2. Ortalama 35–37 dışında çıkarsa veri ya da hesap hatalıdır."],
    };
  },
};

/* ---------- 2. Eşit kütle, farklı atom sayısı ---------- */
const equalMass: FigureDef = {
  caption:
    "İleri ile eşit kütlede iki izotop örneğini karşılaştır: 20 akb'lik örnekte 10 akb'lik izotoptan 2 atom, 20 akb'lik izotoptan 1 atom vardır. Ortalamada ağırlık atom sayısıdır, kütle değil: (2 × 10 + 1 × 20) ÷ 3 = 40/3 ≈ 13,33 akb, düz ortalama 15 değil.",
  alt: "İki terazi kefesi: solda iki küçük top (10 akb), sağda bir büyük top (20 akb); kefeler dengede. Altta atom sayısı oranı 2 : 1 ve ağırlıklı ortalama.",
  steps: ["Eşit kütle", "Atom sayısı", "Ortalama"],
  draw: (_v, step) => {
    const els: El[] = [seg(v(-3, 1.6), v(3, 1.6), { tone: "ink", bold: true }), poly([v(0, 1.6), v(-0.3, 0.8), v(0.3, 0.8)], { tone: "muted", fill: "muted" })];
    for (const x of [-2.4, 2.4]) els.push(seg(v(x, 1.6), v(x, 2.0), { tone: "ink", thin: true }), seg(v(x - 1, 2.0), v(x + 1, 2.0), { tone: "ink", bold: true }));
    els.push(ball(v(-2.75, 2.35), 0.3, "b", "10"), ball(v(-2.05, 2.35), 0.3, "b", "10"), ball(v(2.4, 2.5), 0.45, "warn", "20"));
    els.push(txt(v(-2.4, 0.5), "20 akb", "s", { tone: "b", small: true, bold: true }), txt(v(2.4, 0.5), "20 akb", "s", { tone: "warn", small: true, bold: true }));
    if (step >= 1) els.push(txt(v(-2.4, 3.3), "2 atom", "n", { tone: "b", small: true, bold: true }), txt(v(2.4, 3.3), "1 atom", "n", { tone: "warn", small: true, bold: true }));
    if (step >= 2) els.push(txt(v(0, -0.3), "(2·10 + 1·20) ÷ 3 = 13,33 akb", "s", { tone: "c", bold: true }));
    els.push(txt(v(-4, 4), " ", "c"), txt(v(4, -1), " ", "c"));
    const rows: [string, string][] = [
      ["İki örneğin kütlesi eşit: 20'şer akb.", "Kütle yüzdesi ile atom yüzdesi farklı şeylerdir."],
      ["Atom sayısı = kütle ÷ atom kütlesi: 20 ÷ 10 = 2, 20 ÷ 20 = 1 → oran 2 : 1.", "Hafif izotoptan aynı kütlede daha çok atom vardır."],
      ["Ortalama atom kütlesi atom sayısıyla ağırlıklandırılır: 40/3 ≈ 13,33 akb.", "(10 + 20) ÷ 2 = 15 yalnız atomca eşit bollukta doğrudur."],
    ];
    return { els, readout: rows[step] };
  },
};

export const chemistryFiguresIsotope: Record<string, Record<string, FigureDef>> = {
  "atom-kutlesi-hesaplari": {
    "Atom bolluğu ağırlığı belirler": balance,
    "Kütle yüzdesi atom yüzdesi değildir": equalMass,
  },
};

