import type { GuideSection, WorkedExample } from "./guides/types";

/*
 * TYT Kimya derinleştirmesi (0.221): denkleştirme, tepkime türleri,
 * denklemli miktar geçişi, sınırlayıcı ve artan madde, sınırlayıcı bileşen.
 * Kabul edilmiş rehber içeriği değişmez; tablo bölümü, iki özgün çözümlü
 * örnek ve bölüm çizimi görüntüleme katmanında eklenir. Katsayılar tam
 * kesirli doğrusal cebirle bulunur ve element element denetlenir; mol,
 * kütle, hacim ve tanecik değerleri tam kesirlerle hesaplanır. Paragraflar,
 * tablo hücreleri, çizim okumaları ve Kopya Kâğıdı özetleri aynı dışa
 * aktarılmış verilerden gelir; genel yargıları modül yüklenirken korumalar
 * denetler.
 */

const guard = (ok: boolean, message: string) => {
  if (!ok) throw new Error(`depth221: ${message}`);
};

/* ======================================================================
 * Tam kesir aritmetiği
 * ==================================================================== */

export interface Q221 { n: number; d: number }
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
const lcm = (a: number, b: number) => Math.abs(a * b) / gcd(a, b);
export const q221 = (n: number, d = 1): Q221 => {
  guard(Number.isInteger(n) && Number.isInteger(d) && d !== 0, `kesir tam sayılardan kurulmalı (${n}/${d})`);
  const g = gcd(n, d) || 1;
  const s = d < 0 ? -1 : 1;
  return { n: (s * n) / g + 0, d: (s * d) / g };
};
/** "4.4" → 22/5; ondalık yazımdan tam kesir. */
export const qDec221 = (s: string): Q221 => {
  const [i, f = ""] = s.split(".");
  return q221(Number(i + f), 10 ** f.length);
};
export const qAdd = (a: Q221, b: Q221) => q221(a.n * b.d + b.n * a.d, a.d * b.d);
export const qSub = (a: Q221, b: Q221) => q221(a.n * b.d - b.n * a.d, a.d * b.d);
export const qMul = (a: Q221, b: Q221) => q221(a.n * b.n, a.d * b.d);
export const qDiv = (a: Q221, b: Q221) => q221(a.n * b.d, a.d * b.n);
export const qCmp = (a: Q221, b: Q221) => Math.sign(a.n * b.d - b.n * a.d);
export const qEq = (a: Q221, b: Q221) => qCmp(a, b) === 0;
export const qVal = (a: Q221) => a.n / a.d;
const qMin = (xs: readonly Q221[]) => xs.reduce((m, x) => (qCmp(x, m) < 0 ? x : m));
const terminating = (d: number) => {
  let x = d;
  for (const p of [2, 5]) while (x % p === 0) x /= p;
  return x === 1;
};
/** Sonlu ondalıksa tam ondalık (Türkçe virgül), değilse a/b kesri. */
export const qText221 = (a: Q221) => {
  if (!terminating(a.d)) return `${a.n < 0 ? "−" : ""}${Math.abs(a.n)}/${a.d}`;
  let k = 0;
  while ((a.n * 10 ** k) % a.d !== 0) k += 1;
  const s = (Math.abs(a.n) / a.d).toFixed(k).replace(".", ",");
  return `${a.n < 0 ? "−" : ""}${s}`;
};
const t = qText221;
/** Kesri bayağı kesir olarak yazar: 13/2, 3/4, 5. */
export const qFrac221 = (a: Q221) => (a.d === 1 ? `${a.n < 0 ? "−" : ""}${Math.abs(a.n)}` : `${a.n < 0 ? "−" : ""}${Math.abs(a.n)}/${a.d}`);
const fr = qFrac221;

/* ======================================================================
 * Formül, mol kütlesi ve denkleştirme
 * ==================================================================== */

/**
 * Yuvarlatılmış atom kütleleri (g/mol). Kaynak: IUPAC standart atom
 * kütleleri (CIAAW), MEB ders kitaplarında ve bu derslerde kullanılan
 * TYT yuvarlamasıyla. Rehberlerdeki M(H₂) = 2, M(O₂) = 32, M(H₂O) = 18,
 * M(NH₃) = 17 g/mol değerleriyle tutarlıdır.
 */
export const atomicMass221: Readonly<Record<string, Q221>> = {
  H: q221(1), C: q221(12), N: q221(14), O: q221(16), Mg: q221(24), Al: q221(27), S: q221(32), Cl: q221(71, 2),
};
/** Avogadro sayısının bu derslerdeki yuvarlatılmış değeri, 10²³ biriminde: Nₐ = 6,02 × 10²³ /mol. */
export const avogadro221 = q221(602, 100);
/** NK (0 °C, 1 atm) ideal gaz molar hacmi, bu derslerin değeri: Vₘ = 22,4 L/mol. */
export const molarVolume221 = qDec221("22.4");

export type Phase221 = "k" | "s" | "g" | "suda";
export interface Species221 { f: string; phase?: Phase221; charge?: number }

/** "Ca(OH)2" → { Ca: 1, O: 2, H: 2 }. */
export function parseFormula221(f: string): Record<string, number> {
  let i = 0;
  const group = (): Record<string, number> => {
    const out: Record<string, number> = {};
    const addTo = (el: string, k: number) => { out[el] = (out[el] ?? 0) + k; };
    while (i < f.length && f[i] !== ")") {
      let part: Record<string, number>;
      if (f[i] === "(") {
        i += 1;
        part = group();
        guard(f[i] === ")", `${f} parantezi kapanmalı`);
        i += 1;
      } else {
        const m = /^[A-Z][a-z]?/.exec(f.slice(i));
        guard(m !== null, `${f} çözümlenemedi`);
        i += m![0].length;
        part = { [m![0]]: 1 };
      }
      const k = /^\d+/.exec(f.slice(i));
      if (k) i += k[0].length;
      for (const [el, c] of Object.entries(part)) addTo(el, c * (k ? Number(k[0]) : 1));
    }
    return out;
  };
  const r = group();
  guard(i === f.length, `${f} sonuna kadar okunmalı`);
  return r;
}
const SUB: Record<string, string> = { "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄", "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉" };
const SUP: Record<string, string> = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹", "+": "⁺", "-": "⁻" };
export const formulaText221 = (s: Species221) => {
  const body = s.f.replace(/\d/g, (c) => SUB[c]);
  const ch = s.charge ? `${Math.abs(s.charge) === 1 ? "" : Math.abs(s.charge)}${s.charge > 0 ? "+" : "-"}`.replace(/./g, (c) => SUP[c]) : "";
  return body + ch;
};
export const speciesText221 = (s: Species221) => `${formulaText221(s)}${s.phase ? `(${s.phase})` : ""}`;
export const molarMass221 = (f: string) =>
  Object.entries(parseFormula221(f)).reduce((m, [el, k]) => {
    guard(atomicMass221[el] !== undefined, `${el} için atom kütlesi tanımlı olmalı`);
    return qAdd(m, qMul(atomicMass221[el], q221(k)));
  }, q221(0));

export interface Balanced221 {
  reactants: readonly Species221[];
  products: readonly Species221[];
  /** En küçük tam sayı katsayıları (girenler, sonra ürünler). */
  coeffs: readonly number[];
  /** Birinci formülün katsayısı 1 alınınca çıkan (kesirli olabilen) katsayılar. */
  unitFirst: readonly Q221[];
  /** Kesirleri temizleyen çarpan: paydaların EKOK’u. */
  multiplier: number;
  /** Her element için giren ve ürün atom sayısı (en küçük tam sayılarla). */
  inventory: readonly { el: string; left: number; right: number }[];
}

/** Atom (ve yük) korunumundan katsayıları tam kesirli Gauss yoketmesiyle bulur. */
export function balance221(reactants: readonly Species221[], products: readonly Species221[]): Balanced221 {
  const all = [...reactants, ...products];
  const sign = all.map((_, j) => (j < reactants.length ? 1 : -1));
  const counts = all.map((s) => parseFormula221(s.f));
  const els = [...new Set(counts.flatMap((c) => Object.keys(c)))];
  const rows: Q221[][] = els.map((el) => all.map((_, j) => q221(sign[j] * (counts[j][el] ?? 0))));
  if (all.some((s) => s.charge)) rows.push(all.map((s, j) => q221(sign[j] * (s.charge ?? 0))));
  const m = all.length;
  // RREF
  const pivots: number[] = [];
  let r = 0;
  for (let c = 0; c < m && r < rows.length; c++) {
    const p = rows.findIndex((row, i) => i >= r && row[c].n !== 0);
    if (p < 0) continue;
    [rows[r], rows[p]] = [rows[p], rows[r]];
    const inv = rows[r][c];
    rows[r] = rows[r].map((x) => qDiv(x, inv));
    for (let i = 0; i < rows.length; i++)
      if (i !== r && rows[i][c].n !== 0) {
        const k = rows[i][c];
        rows[i] = rows[i].map((x, j) => qSub(x, qMul(k, rows[r][j])));
      }
    pivots.push(c);
    r += 1;
  }
  const free = [...Array(m).keys()].filter((c) => !pivots.includes(c));
  guard(free.length === 1, `${all.map((s) => s.f).join(", ")} tek bir oran ailesi vermeli`);
  const x: Q221[] = Array.from({ length: m }, () => q221(0));
  x[free[0]] = q221(1);
  pivots.forEach((c, i) => { x[c] = q221(-rows[i][free[0]].n, rows[i][free[0]].d); });
  const unitFirst = x.map((xi) => qDiv(xi, x[0]));
  guard(unitFirst.every((u) => u.n > 0), "bütün katsayılar pozitif olmalı");
  const multiplier = unitFirst.reduce((L, u) => lcm(L, u.d), 1);
  const ints = unitFirst.map((u) => (u.n * multiplier) / u.d);
  const g = ints.reduce(gcd);
  const coeffs = ints.map((k) => k / g);
  const inventory = els.map((el) => ({
    el,
    left: reactants.reduce((s, _, j) => s + coeffs[j] * (counts[j][el] ?? 0), 0),
    right: products.reduce((s, _, j) => s + coeffs[reactants.length + j] * (counts[reactants.length + j][el] ?? 0), 0),
  }));
  // Element element ve yük denetimi.
  for (const { el, left, right } of inventory) guard(left === right, `${el} atomları korunmalı`);
  const charge = (list: readonly Species221[], off: number) => list.reduce((s, sp, j) => s + coeffs[off + j] * (sp.charge ?? 0), 0);
  guard(charge(reactants, 0) === charge(products, reactants.length), "net yük korunmalı");
  guard(coeffs.reduce(gcd) === 1, "katsayılar en küçük tam sayı olmalı");
  return { reactants, products, coeffs, unitFirst, multiplier, inventory };
}
const sp = (f: string, phase?: Phase221, charge?: number): Species221 => ({ f, phase, charge });
const side = (list: readonly Species221[], k: readonly (number | string)[], phases = false) =>
  list.map((s, i) => `${k[i] === 1 || k[i] === "1" ? "" : `${k[i]} `}${phases ? speciesText221(s) : formulaText221(s)}`).join(" + ");
export const equationText221 = (b: Balanced221, phases = false) =>
  `${side(b.reactants, b.coeffs, phases)} → ${side(b.products, b.coeffs.slice(b.reactants.length), phases)}`;
export const skeletonText221 = (b: Balanced221) => `${side(b.reactants, b.reactants.map(() => 1))} → ${side(b.products, b.products.map(() => 1))}`;
const inventoryText = (b: Balanced221) => b.inventory.map(({ el, left }) => `${el} ${left}`).join(" · ");
const coeffList = (b: Balanced221) => b.coeffs.join(", ");
const unitFirstText = (b: Balanced221) => b.unitFirst.map(fr).join(", ");
const lhs = (b: Balanced221) => b.reactants.map(formulaText221).join(" + ");

/* ======================================================================
 * 1. Kimyasal tepkimeler ve denkleştirme: yedi denklem
 * ==================================================================== */

export const balanceRows221: readonly Balanced221[] = [
  balance221([sp("CH4"), sp("O2")], [sp("CO2"), sp("H2O")]),
  balance221([sp("C3H8"), sp("O2")], [sp("CO2"), sp("H2O")]),
  balance221([sp("C4H10"), sp("O2")], [sp("CO2"), sp("H2O")]),
  balance221([sp("Al"), sp("O2")], [sp("Al2O3")]),
  balance221([sp("Al"), sp("HCl")], [sp("AlCl3"), sp("H2")]),
  balance221([sp("Ca(OH)2"), sp("HCl")], [sp("CaCl2"), sp("H2O")]),
  balance221([sp("Fe2O3"), sp("CO")], [sp("Fe"), sp("CO2")]),
];
const fractionRows = balanceRows221.filter((b) => b.multiplier > 1);
const integerRows = balanceRows221.filter((b) => b.multiplier === 1);
/** CₓHᵧ tam yanması: 1 CₓHᵧ için O₂ = x + y/4. */
export const hydrocarbonO2_221 = (f: string) => {
  const c = parseFormula221(f);
  return qAdd(q221(c.C), q221(c.H, 4));
};
const hydrocarbonRows = balanceRows221.filter((b) => b.reactants[1]?.f === "O2" && b.products.map((p) => p.f).join() === "CO2,H2O");
{
  guard(hydrocarbonRows.length === 3, "üç hidrokarbon yanma satırı olmalı");
  for (const b of hydrocarbonRows) {
    guard(qEq(b.unitFirst[1], hydrocarbonO2_221(b.reactants[0].f)), `${b.reactants[0].f} için O₂ = x + y/4 olmalı`);
    const y = parseFormula221(b.reactants[0].f).H;
    guard(y % 2 === 0 && b.multiplier === (y % 4 === 0 ? 1 : 2), "y/4 yarımlıysa çarpan 2, tamsa 1 olmalı");
  }
  for (const b of balanceRows221) {
    // Çarpan, birinci-formül-1 katsayılarının paydalarının EKOK’udur ve sonuç zaten sadedir.
    guard(b.unitFirst.every((u, i) => (u.n * b.multiplier) / u.d === b.coeffs[i]), "çarpanla çarpılmış ara katsayılar en küçük tam sayılara eşit olmalı");
  }
  guard(fractionRows.length > 0 && integerRows.length > 0, "hem kesirli hem tam ara adımlı satır olmalı");
}
const [, , , , , lime, ironOx] = balanceRows221;

const balanceTable = {
  layout: "table" as const,
  headers: ["İskelet denklem", "Birinci formül 1 alınınca", "En küçük tam sayılarla", "Atom envanteri (her iki tarafta)"],
  rows: balanceRows221.map((b) => [
    skeletonText221(b),
    b.multiplier === 1 ? `${unitFirstText(b)} (kesir yok)` : `${unitFirstText(b)} → ×${b.multiplier}`,
    equationText221(b),
    inventoryText(b),
  ]),
};

export const balanceSection221: GuideSection = {
  title: "Yedi denklem: birinci formülü 1 al, kesri en sonda temizle",
  paragraphs: [
    `Tablodaki ${balanceRows221.length} denklemde aynı sıra izlendi: birinci formülün katsayısı 1 alındı, yalnız bir formülde geçen elementler önce eşitlendi, en son tek başına duran element (çoğu kez O₂ veya H₂) ayarlandı. ${fractionRows.length} satırda bu ara adım kesir verdi: ${fractionRows.map((b) => `${lhs(b)} satırında ×${b.multiplier}`).join(", ")}. Çarpan, kesirlerin paydalarının EKOK’udur; bütün katsayılar aynı sayıyla çarpılır.`,
    `${integerRows.length} satırda ara adım doğrudan tam sayı verdi (${integerRows.map((b) => formulaText221(b.reactants[0])).join(", ")}). ${formulaText221(lime.reactants[0])} satırında parantez dışındaki 2 hem O’yu hem H’yi ikiyle çarpar: bir birimde 2 O ve 2 H vardır. ${formulaText221(ironOx.reactants[0])} satırında oksitteki ${ironOx.unitFirst[1].n} O atomunun her biri bir CO’yu CO₂’ye çevirir; bu yüzden CO ve CO₂ katsayıları ${ironOx.coeffs[1]} olur.`,
    `İlk üç satır CₓHᵧ biçiminde hidrokarbon yanmasıdır. 1 CₓHᵧ için x CO₂ ve y/2 H₂O oluşur; ürünlerdeki O sayısı 2x + y/2 olduğundan O₂ katsayısı x + y/4 çıkar: ${hydrocarbonRows.map((b) => `${formulaText221(b.reactants[0])} için ${fr(b.unitFirst[1])}`).join(", ")}. y çift olduğundan y/4 ya tam sayıdır ya da yarımlı çıkar; yarımlıysa bütün katsayılar ikiyle çarpılır.`,
    "Son sütun, en küçük tam sayılı denklemde her elementin bir taraftaki toplam atom sayısıdır; aynı sayı öbür tarafta da bulunur. Denetimi toplam atom sayısıyla değil, her element için ayrı yap.",
  ],
  table: balanceTable,
  figureTitle: "Yedi denklem: birinci formülü 1 al, kesri en sonda temizle",
};

export const pentane221 = balance221([sp("C5H12"), sp("O2")], [sp("CO2"), sp("H2O")]);
export const ammoniaOx221 = balance221([sp("NH3"), sp("O2")], [sp("NO"), sp("H2O")]);
/** Öğrencinin yazdığı hatalı katsayılar: 2 NH₃ + 3 O₂ → 2 NO + 3 H₂O. */
export const ammoniaAttempt221 = [2, 3, 2, 3] as const;
const attemptInventory = (b: Balanced221, k: readonly number[]) =>
  b.inventory.map(({ el }) => ({
    el,
    left: b.reactants.reduce((s, r, j) => s + k[j] * (parseFormula221(r.f)[el] ?? 0), 0),
    right: b.products.reduce((s, p, j) => s + k[b.reactants.length + j] * (parseFormula221(p.f)[el] ?? 0), 0),
  }));
export const ammoniaAttemptInventory221 = attemptInventory(ammoniaOx221, ammoniaAttempt221);
const attemptWrong = ammoniaAttemptInventory221.filter(({ left, right }) => left !== right);
guard(attemptWrong.map(({ el }) => el).join() === "O", "hatalı denemede yalnız O dengesiz olmalı");
const pentaneSum = pentane221.coeffs.reduce((a, b) => a + b, 0);
const ammoniaUnit = (i: number) => fr(ammoniaOx221.unitFirst[i]);
export const balanceExamples221: WorkedExample[] = [
  {
    title: "Pentanın yanması ve katsayılar toplamı",
    prompt: `Pentan (${formulaText221(pentane221.reactants[0])}) yeterli oksijenle tamamen yanarak yalnız CO₂ ve H₂O oluşturuyor: ${skeletonText221(pentane221)}. Denklemi en küçük tam sayılarla denkleştir ve katsayıların toplamını bul.`,
    strategy: "Pentanın katsayısını 1 al. Önce C, sonra H, en son tek başına duran O₂ katsayısını eşitle.",
    steps: [
      { label: "C", expression: `1 C₅H₁₂ → ${pentane221.unitFirst[2].n} CO₂`, explanation: "Beş karbon beş CO₂ molekülüne gider." },
      { label: "H", expression: `12 H → ${fr(pentane221.unitFirst[3])} H₂O`, explanation: "Her su iki H taşır: 12/2 = 6." },
      { label: "O", expression: `${pentane221.unitFirst[2].n} · 2 + ${t(pentane221.unitFirst[3])} · 1 = ${t(qMul(pentane221.unitFirst[1], q221(2)))} O → ${t(pentane221.unitFirst[1])} O₂`, explanation: `Ürünlerdeki O sayısının yarısı O₂ katsayısıdır; x + y/4 = 5 + 3 = ${t(hydrocarbonO2_221("C5H12"))} ile de aynı çıkar.` },
      { label: "Toplam", expression: `${pentane221.coeffs.join(" + ")} = ${pentaneSum}`, explanation: "Katsayılar zaten tam sayı ve ortak bölenleri 1’dir." },
    ],
    answer: `${equationText221(pentane221)}; katsayılar toplamı ${pentaneSum}.`,
    check: `Her iki tarafta ${inventoryText(pentane221)} atomu vardır.`,
    pitfall: "Katsayı toplamına yalnız girenleri katmak veya CO₂ ile H₂O’daki O atomlarından birini unutmak.",
  },
  {
    title: "Amonyağın yükseltgenmesinde hatalı denemeyi düzelt",
    prompt: `Bir öğrenci ${skeletonText221(ammoniaOx221)} denklemini ${side(ammoniaOx221.reactants, ammoniaAttempt221)} → ${side(ammoniaOx221.products, ammoniaAttempt221.slice(2))} biçiminde yazdı. Denklem denk midir? Değilse en küçük tam sayılarla doğru biçimi nedir?`,
    strategy: "Önce denemenin atom envanterini element element say; sonra NH₃ katsayısını 1 alıp yeniden denkleştir.",
    steps: [
      { label: "Deneme", expression: ammoniaAttemptInventory221.map(({ el, left, right }) => `${el}: ${left} / ${right}`).join(" · "), explanation: `Yalnız ${attemptWrong.map(({ el }) => el).join()} eşit değil; deneme denk değildir.` },
      { label: "NH₃ = 1", expression: `1 NH₃ → ${ammoniaUnit(2)} NO + ${ammoniaUnit(3)} H₂O`, explanation: "N için bir NO, üç H için 3/2 H₂O gerekir." },
      { label: "O", expression: `1 + ${ammoniaUnit(3)} = ${fr(qMul(ammoniaOx221.unitFirst[1], q221(2)))} O → ${ammoniaUnit(1)} O₂`, explanation: "Ürünlerdeki O sayısının yarısı O₂ katsayısıdır." },
      { label: `×${ammoniaOx221.multiplier}`, expression: coeffList(ammoniaOx221), explanation: `Paydaların EKOK’u ${ammoniaOx221.multiplier}; bütün katsayılar ${ammoniaOx221.multiplier} ile çarpılır.` },
    ],
    answer: `Denk değildir (O solda ${attemptWrong[0].left}, sağda ${attemptWrong[0].right}). Doğrusu ${equationText221(ammoniaOx221)}.`,
    check: `Her iki tarafta ${inventoryText(ammoniaOx221)} atomu vardır.`,
    pitfall: "Yalnız O₂ katsayısını değiştirip N ve H dengesinin bozulduğunu fark etmemek.",
  },
];

export const balanceSupplement221 = {
  title: balanceSection221.title,
  figureTitle: balanceSection221.title,
  paragraphs: balanceSection221.paragraphs,
  summary: `Birinci formülü 1 al, tek formülde geçen elementleri önce, tek başına duran elementi en son eşitle. Kesir çıkarsa paydaların EKOK’uyla hepsini çarp (${fractionRows.map((b) => `${lhs(b)}: ×${b.multiplier}`).join("; ")}). CₓHᵧ tam yanmasında O₂ = x + y/4. Denetim her element için ayrıdır.`,
  appendSection: true as const,
  table: balanceTable,
  examples: balanceExamples221,
};

/* ======================================================================
 * 2. Tepkime türleri: sekiz tepkime, dört ölçüt
 * ==================================================================== */

/** Bu sekiz tepkime için asit ve baz rolündeki türler (proton veren / alan). */
const ACIDS = new Set(["HCl", "H2SO4"]);
const BASES = new Set(["NaOH", "KOH", "Mg(OH)2", "NH3"]);
const GROUP1 = new Set(["Li", "Na", "K"]);
const GROUP2 = new Set(["Mg", "Ca", "Ba"]);

/**
 * Yükseltgenme basamakları: element 0, tek atomlu iyon yükü; bileşikte
 * 1A +1, 2A +2, H +1 (bu satırlarda metal hidrür yok), O −2 (peroksit
 * yok), O içermeyen bileşikte Cl ve I −1; kalan tek element toplam
 * yükten bulunur.
 */
export function oxidationStates221(s: Species221): Record<string, number> {
  const c = parseFormula221(s.f);
  const els = Object.keys(c);
  const charge = s.charge ?? 0;
  if (els.length === 1) return { [els[0]]: charge / c[els[0]] };
  const known: Record<string, number> = {};
  for (const el of els) {
    if (GROUP1.has(el)) known[el] = 1;
    else if (GROUP2.has(el)) known[el] = 2;
    else if (el === "H") known[el] = 1;
    else if (el === "O") known[el] = -2;
    else if ((el === "Cl" || el === "I") && !els.includes("O")) known[el] = -1;
  }
  const unknown = els.filter((el) => known[el] === undefined);
  guard(unknown.length <= 1, `${s.f} için en çok bir bilinmeyen basamak olmalı`);
  const sum = els.filter((el) => known[el] !== undefined).reduce((acc, el) => acc + known[el] * c[el], 0);
  if (unknown.length === 1) known[unknown[0]] = (charge - sum) / c[unknown[0]];
  else guard(sum === charge, `${s.f} basamak toplamı yüke eşit olmalı`);
  for (const el of els) guard(Number.isInteger(known[el]), `${s.f} içinde ${el} tam sayı basamak almalı`);
  return known;
}

export interface Classified221 {
  eq: Balanced221;
  yanma: boolean;
  /** O₂ ürün tarafındaysa true (yanma değil, ayrışma ürünü). */
  o2Product: boolean;
  sentez: boolean;
  ayrisma: boolean;
  asitBaz: boolean;
  cokelme: boolean;
  redoks: boolean;
  changes: readonly { el: string; from: number; to: number }[];
}
export function classify221(eq: Balanced221): Classified221 {
  const { reactants, products } = eq;
  const compound = (s: Species221) => Object.keys(parseFormula221(s.f)).length > 1;
  const yanma = reactants.some((s) => s.f === "O2");
  const o2Product = products.some((s) => s.f === "O2");
  const sentez = reactants.length >= 2 && products.length === 1 && compound(products[0]);
  const ayrisma = reactants.length === 1 && compound(reactants[0]) && products.length >= 2;
  const asitBaz = reactants.some((s) => ACIDS.has(s.f)) && reactants.some((s) => BASES.has(s.f));
  const cokelme = reactants.every((s) => s.phase === "suda") && products.some((s) => s.phase === "k");
  const states = (list: readonly Species221[]) => {
    const m: Record<string, Set<number>> = {};
    for (const s of list) for (const [el, ox] of Object.entries(oxidationStates221(s))) (m[el] ??= new Set()).add(ox);
    return m;
  };
  const L = states(reactants);
  const R = states(products);
  const changes = Object.keys(L).flatMap((el) => {
    const a = [...L[el]];
    const b = [...R[el]];
    guard(a.length === 1 && b.length === 1, `${el} her tarafta tek basamakta olmalı`);
    return a[0] === b[0] ? [] : [{ el, from: a[0], to: b[0] }];
  });
  return { eq, yanma, o2Product, sentez, ayrisma, asitBaz, cokelme, redoks: changes.length > 0, changes };
}
const sgn = (n: number) => (n > 0 ? `+${n}` : n < 0 ? `−${-n}` : "0");
export const changeText221 = (c: Classified221) => c.changes.map(({ el, from, to }) => `${el} ${sgn(from)} → ${sgn(to)}`).join("; ");

export const typeRows221: readonly Classified221[] = [
  balance221([sp("CH4", "g"), sp("O2", "g")], [sp("CO2", "g"), sp("H2O", "s")]),
  balance221([sp("H2", "g"), sp("O2", "g")], [sp("H2O", "s")]),
  balance221([sp("HgO", "k")], [sp("Hg", "s"), sp("O2", "g")]),
  balance221([sp("CaO", "k"), sp("CO2", "g")], [sp("CaCO3", "k")]),
  balance221([sp("H2SO4", "suda"), sp("KOH", "suda")], [sp("K2SO4", "suda"), sp("H2O", "s")]),
  balance221([sp("CaCl2", "suda"), sp("Na2CO3", "suda")], [sp("CaCO3", "k"), sp("NaCl", "suda")]),
  balance221([sp("Na", "k"), sp("Cl2", "g")], [sp("NaCl", "k")]),
  balance221([sp("Zn", "k"), sp("HCl", "suda")], [sp("ZnCl2", "suda"), sp("H2", "g")]),
].map(classify221);
export const typeLabels221 = ["Yanma", "Sentez", "Ayrışma", "Asit-baz", "Çökelme", "Redoks"] as const;
export const typeFlags221 = (c: Classified221) => [c.yanma, c.sentez, c.ayrisma, c.asitBaz, c.cokelme, c.redoks] as const;
export const typeNames221 = (c: Classified221) => typeLabels221.filter((_, i) => typeFlags221(c)[i]);
{
  // Lesson framing: yanma = O₂ girendir; O₂ ürünse yanma değildir.
  for (const c of typeRows221) {
    guard(!(c.yanma && c.o2Product), "O₂ aynı tepkimede hem giren hem ürün olmamalı");
    // O₂ girdiyse O 0’dan bileşikte −2’ye geçer: bu sekiz satırda her yanma redokstur.
    if (c.yanma) guard(c.changes.some(({ el, from, to }) => el === "O" && from === 0 && to === -2), "yanmada O 0 → −2 olmalı");
    if (c.asitBaz || c.cokelme) guard(!c.redoks, "asit-baz ve çökelme satırlarında basamak değişmemeli");
    guard(!(c.sentez && c.ayrisma), "bir satır hem sentez hem ayrışma olamaz");
    guard(typeNames221(c).length >= 1, "her satır en az bir etiket almalı");
  }
  guard(typeRows221.some((c) => c.o2Product && !c.yanma), "O₂ ürün olan bir satır bulunmalı");
  guard(typeRows221.some((c) => !c.sentez && !c.ayrisma), "ne sentez ne ayrışma olan satır bulunmalı");
  guard(typeRows221.some((c) => c.redoks && !c.yanma), "yanma olmayan redoks satırı bulunmalı");
}
const typeCell = {
  yanma: (c: Classified221) => (c.yanma ? "Evet, O₂ girendir" : c.o2Product ? "Hayır, O₂ üründür" : "Hayır, O₂ yok"),
  count: (c: Classified221) => `${c.eq.reactants.length} → ${c.eq.products.length}: ${c.sentez ? "sentez" : c.ayrisma ? "ayrışma" : "ikisi de değil"}`,
  proton: (c: Classified221) => (c.asitBaz ? "Asit-baz (nötrleşme)" : c.cokelme ? "Çökelme, yeni katı" : "Hiçbiri"),
  redox: (c: Classified221) => (c.redoks ? `Redoks: ${changeText221(c)}` : "Değişmez, redoks değil"),
};
const typeTable = {
  layout: "table" as const,
  headers: ["Denklem", "Yanma (O₂ giren mi?)", "Tür sayısı (giren → ürün)", "Asit-baz / çökelme", "Yükseltgenme basamağı"],
  rows: typeRows221.map((c) => [equationText221(c.eq, true), typeCell.yanma(c), typeCell.count(c), typeCell.proton(c), typeCell.redox(c)]),
};
const count = (f: (c: Classified221) => boolean) => typeRows221.filter(f).length;
const firstRow = (f: (c: Classified221) => boolean) => typeRows221.find(f)!;
const lead = (c: Classified221) => formulaText221(c.eq.reactants[0]);
const multiLabel = typeRows221.filter((c) => typeNames221(c).length >= 3);
guard(multiLabel.length >= 1, "üç etiketli satır olmalı");
const neither = firstRow((c) => !c.sentez && !c.ayrisma && c.yanma);
const salt = firstRow((c) => c.cokelme);
const metalAcid = firstRow((c) => c.redoks && !c.yanma && c.eq.reactants.some((s) => ACIDS.has(s.f)));

export const typeSection221: GuideSection = {
  title: "Sekiz tepkime, dört ölçüt: her eksene ayrı karar",
  paragraphs: [
    `Tablodaki ${typeRows221.length} tepkimenin her biri dört ayrı soruyla okundu: O₂ giren mi? Kaç tür girip kaç tür çıkıyor? Proton aktarımı veya yeni katı var mı? Yükseltgenme basamağı değişiyor mu? ${count((c) => c.yanma)} satır yanma, ${count((c) => c.sentez)} satır sentez, ${count((c) => c.ayrisma)} satır ayrışma, ${count((c) => c.redoks)} satır redokstur. ${multiLabel.length} satır üç etiketi birlikte taşır: ${multiLabel.map((c) => `${lead(c)} (${typeNames221(c).join(", ").toLocaleLowerCase("tr-TR")})`).join(" ve ")}.`,
    `Tür sayısı ekseni yanma ekseninden bağımsızdır. ${lead(neither)} yanmasında ${neither.eq.reactants.length} tür girer, ${neither.eq.products.length} tür çıkar; bu yüzden yanmadır ama ne sentez ne ayrışmadır. ${lead(firstRow((c) => c.o2Product))} satırında O₂ üründür; tablo onu ayrışma sayar, yanma saymaz.`,
    `Yükseltgenme basamaklarında element 0, bileşikte H +1, O −2, 1A metali +1, 2A metali +2, oksijensiz bileşikte Cl −1 alınır; kalan element toplam yükü sıfıra tamamlar. Bu kurala göre O₂ giren her satırda O 0’dan −2’ye geçer, yani buradaki her yanma redokstur. Asit-baz ve çökelme satırlarında hiçbir elementin basamağı değişmez: ${lead(salt)} satırında Ca, C ve O aynı basamakla katıya geçer.`,
    `${lead(metalAcid)} ile HCl satırı bir tuz ve H₂ verir ama asit-baz sayılmadı: proton bir baza aktarılmıyor, ${changeText221(metalAcid)} değişiyor. Tuz görmek tek başına tür etiketi vermez; her ekseni kendi sorusuyla yanıtla.`,
  ],
  table: typeTable,
  figureTitle: "Sekiz tepkime, dört ölçüt: her eksene ayrı karar",
};

export const alCl221 = classify221(balance221([sp("Al", "k"), sp("Cl2", "g")], [sp("AlCl3", "k")]));
export const mgPair221 = [
  classify221(balance221([sp("Mg", "k"), sp("HCl", "suda")], [sp("MgCl2", "suda"), sp("H2", "g")])),
  classify221(balance221([sp("Mg(OH)2", "k"), sp("HCl", "suda")], [sp("MgCl2", "suda"), sp("H2O", "s")])),
] as const;
guard(alCl221.sentez && !alCl221.yanma && alCl221.redoks, "Al + Cl₂ sentez ve redoks olmalı, yanma olmamalı");
guard(mgPair221[0].redoks && !mgPair221[0].asitBaz && mgPair221[1].asitBaz && !mgPair221[1].redoks, "Mg çiftinde biri redoks, öbürü asit-baz olmalı");
const yesNo = (b: boolean) => (b ? "evet" : "hayır");
export const typeExamples221: WorkedExample[] = [
  {
    title: "Alüminyum ile klor: üç eksen, üç karar",
    prompt: `${equationText221(alCl221.eq, true)} tepkimesi için üç soruyu ayrı ayrı yanıtla: (1) Bu ünitenin tanımıyla yanma mıdır? (2) Tür sayısına göre sentez mi, ayrışma mı? (3) Redoks mudur; hangi elementlerin basamağı değişir?`,
    strategy: "Her soruda yalnız o eksenin ölçütüne bak: O₂ giren mi, giren ve ürün türü kaç tane, basamak değişiyor mu.",
    steps: [
      { label: "Yanma", expression: `O₂ giren mi? ${yesNo(alCl221.yanma)}`, explanation: "Girenler Al ve Cl₂’dir; bu ünitede yanma O₂’nin giren olduğu tepkimedir." },
      { label: "Tür sayısı", expression: `${alCl221.eq.reactants.length} → ${alCl221.eq.products.length}`, explanation: "İki giren türden tek bir bileşik türü oluşur: sentez." },
      { label: "Basamak", expression: changeText221(alCl221), explanation: "Al bileşikte +3, Cl −1 olur; elementlerde ikisi de 0’dır." },
    ],
    answer: `Yanma değildir; sentezdir; redokstur (${changeText221(alCl221)}).`,
    check: `Denklem ${inventoryText(alCl221.eq)} atomuyla iki tarafta denktir; AlCl₃’te +3 + 3·(−1) = 0.`,
    pitfall: "Alevle ve ısıyla gerçekleştiği için her parlak tepkimeyi yanma saymak. Bu ünitede yanma ölçütü O₂’nin giren olmasıdır.",
  },
  {
    title: "Aynı tuz, iki farklı tepkime türü",
    prompt: `İki tepkimede de MgCl₂ oluşuyor. I: ${equationText221(mgPair221[0].eq, true)}. II: ${equationText221(mgPair221[1].eq, true)}. Hangisi redoks, hangisi asit-baz tepkimesidir?`,
    strategy: "Ürünlere değil, girenlerin rolüne ve basamak değişimine bak. Proton bir baza mı aktarılıyor, yoksa bir metal elektron mu veriyor?",
    steps: [
      { label: "I", expression: changeText221(mgPair221[0]), explanation: "Element hâlindeki Mg (0) bileşikte +2 olur; H +1’den H₂’de 0’a iner. Basamak değişir: redoks." },
      { label: "II", expression: "Mg +2 → +2; O −2 → −2; H +1 → +1; Cl −1 → −1", explanation: "HCl protonunu Mg(OH)₂’deki OH⁻’ye verir ve su oluşur; hiçbir basamak değişmez." },
      { label: "Karşılaştır", expression: `I: redoks ${yesNo(mgPair221[0].redoks)}, asit-baz ${yesNo(mgPair221[0].asitBaz)} · II: redoks ${yesNo(mgPair221[1].redoks)}, asit-baz ${yesNo(mgPair221[1].asitBaz)}`, explanation: "Aynı tuz iki farklı yoldan oluşabilir." },
    ],
    answer: "I redokstur (asit-baz değil); II asit-baz (nötrleşme) tepkimesidir (redoks değil).",
    check: `I’de ${inventoryText(mgPair221[0].eq)}, II’de ${inventoryText(mgPair221[1].eq)} atomu iki tarafta eşittir.`,
    pitfall: "Ürünlerde tuz görüp iki tepkimeyi de nötrleşme saymak. Metal ile asit tepkimesinde H₂ çıkar ve elektron aktarılır.",
  },
];

export const typeSupplement221 = {
  title: typeSection221.title,
  figureTitle: typeSection221.title,
  paragraphs: typeSection221.paragraphs,
  summary: `Dört eksen ayrı sorudur: O₂ giren mi (yanma), tür sayısı 2 → 1 mi 1 → 2 mi (sentez/ayrışma), proton aktarımı veya yeni katı var mı (asit-baz/çökelme), basamak değişiyor mu (redoks). ${typeRows221.length} satırın ${count((c) => c.redoks)} tanesi redokstur; O₂ giren her satır redokstur, asit-baz ve çökelme satırları değildir. O₂ ürünse yanma sayılmaz (HgO satırı ayrışmadır).`,
  appendSection: true as const,
  table: typeTable,
  examples: typeExamples221,
};

/* ======================================================================
 * 3. Denklemli miktar geçişi: propanın yanması, altı giriş kapısı
 * ==================================================================== */

export const propaneEq221 = balance221([sp("C3H8", "g"), sp("O2", "g")], [sp("CO2", "g"), sp("H2O", "s")]);
export type Door221 = "g" | "L" | "tane";
export interface StoichInput221 { species: number; door: Door221; amount: Q221; text: string }
export interface StoichRow221 {
  input: StoichInput221;
  /** Verilen türün molü. */
  given: Q221;
  /** Tepkime ilerlemesi: katsayısı 1 olan propan için harcanan mol. */
  xi: Q221;
  mol: readonly Q221[];
  mass: readonly Q221[];
}
export const propaneMasses221 = propaneEq221.reactants.concat(propaneEq221.products).map((s) => molarMass221(s.f));
const tane = (x: Q221) => `${t(x)} × 10²³`;
export function stoich221(input: StoichInput221): StoichRow221 {
  const s = input.species;
  const given = input.door === "g" ? qDiv(input.amount, propaneMasses221[s]) : input.door === "L" ? qDiv(input.amount, molarVolume221) : qDiv(input.amount, avogadro221);
  if (input.door === "L") guard(propaneEq221.reactants.concat(propaneEq221.products)[s].phase === "g", "hacim kapısı yalnız gaz için");
  const xi = qDiv(given, q221(propaneEq221.coeffs[s]));
  const mol = propaneEq221.coeffs.map((k) => qMul(xi, q221(k)));
  return { input, given, xi, mol, mass: mol.map((n, i) => qMul(n, propaneMasses221[i])) };
}
/** amount: gram, litre veya 10²³ biriminde tanecik sayısı. */
const door = (species: number, d: Door221, amount: string, text: string): StoichInput221 => ({ species, door: d, amount: qDec221(amount), text });
export const stoichRows221: readonly StoichRow221[] = [
  door(0, "g", "4.4", "4,4 g C₃H₈"),
  door(1, "g", "8", "8 g O₂"),
  door(2, "L", "13.44", "NK’de 13,44 L CO₂"),
  door(3, "g", "10.8", "10,8 g H₂O"),
  door(0, "tane", "1.806", "1,806 × 10²³ C₃H₈ molekülü"),
  door(1, "L", "4.48", "NK’de 4,48 L O₂"),
].map(stoich221);
const gasL = (n: Q221) => qMul(n, molarVolume221);
{
  guard(new Set(stoichRows221.map(({ input }) => `${input.species}${input.door}`)).size === stoichRows221.length, "her satır farklı bir tür ve kapıdan girmeli");
  for (const r of stoichRows221) {
    // Kütle korunumu: harcanan girenlerin kütlesi oluşan ürünlerin kütlesine eşittir.
    guard(qEq(qAdd(r.mass[0], r.mass[1]), qAdd(r.mass[2], r.mass[3])), "her satırda kütle korunmalı");
    guard(qEq(qMul(r.mol[1], q221(3)), qMul(r.mol[2], q221(5))), "O₂ : CO₂ = 5 : 3 olmalı");
    guard(terminating(r.xi.d), "tablo değerleri sonlu ondalık olmalı");
  }
  guard(stoichRows221.map(({ input }) => input.door).includes("tane") && stoichRows221.some(({ input }) => input.door === "L"), "üç kapı da kullanılmalı");
}
const [sA] = stoichRows221;
const stoichTable = {
  layout: "table" as const,
  headers: ["Verilen (giriş kapısı)", "Harcanan C₃H₈", "Harcanan O₂", "Oluşan CO₂", "Oluşan H₂O"],
  rows: stoichRows221.map((r) => [
    r.input.text,
    `${t(r.mol[0])} mol · ${t(r.mass[0])} g`,
    `${t(r.mol[1])} mol · ${t(r.mass[1])} g`,
    `${t(r.mol[2])} mol · NK’de ${t(gasL(r.mol[2]))} L`,
    `${t(r.mol[3])} mol · ${t(r.mass[3])} g`,
  ]),
};
const [mC3H8, mO2, mCO2, mH2O] = propaneMasses221;
export const stoichSection221: GuideSection = {
  title: "Propanın yanması: altı giriş kapısı, tek mol köprüsü",
  paragraphs: [
    `Tablonun bütün satırları aynı denkleme dayanır: ${equationText221(propaneEq221, true)}. Atom kütleleri H 1, C 12, O 16 g/mol alındı; bu yüzden M(C₃H₈) = ${t(mC3H8)}, M(O₂) = ${t(mO2)}, M(CO₂) = ${t(mCO2)}, M(H₂O) = ${t(mH2O)} g/mol olur. Gaz hacmi NK’de (0 °C, 1 atm) ideal gaz için Vₘ = ${t(molarVolume221)} L/mol, tanecik sayısı Nₐ = ${t(avogadro221)} × 10²³ ile çevrildi. Her satırda yeterli öteki giren ve tam dönüşüm varsayılır.`,
    `${stoichRows221.length} satır ${new Set(stoichRows221.map(({ input }) => input.species)).size} farklı türden ve üç farklı kapıdan (gram, NK litresi, tanecik) girer. Yol hep aynıdır: verileni kendi türünün molüne çevir, katsayı oranıyla öteki türlerin molünü bul, sonra istenen birime çık. Örneğin ilk satırda ${t(sA.mass[0])} g ÷ ${t(mC3H8)} g/mol = ${t(sA.mol[0])} mol C₃H₈ olur; O₂ için ×5, CO₂ için ×3, H₂O için ×4 uygulanır.`,
    "H₂O sıvı yazıldığı için litre sütunu yalnız CO₂ için verildi; sıvı suya 22,4 L/mol uygulanmaz. Tanecik satırında verilen sayı molekül sayısıdır; C₃H₈’deki atom sayısı bunun 11 katı olurdu.",
    "Her satırda harcanan C₃H₈ ve O₂ kütlelerinin toplamı oluşan CO₂ ve H₂O kütlelerinin toplamına eşittir. Bu korunum denetimi, katsayıyı gram oranı sanma hatasını hemen yakalar.",
  ],
  table: stoichTable,
  figureTitle: "Propanın yanması: altı giriş kapısı, tek mol köprüsü",
};
guard(parseFormula221("C3H8").C + parseFormula221("C3H8").H === 11, "C₃H₈ 11 atom içermeli");

export const mgAcid221 = balance221([sp("Mg", "k"), sp("HCl", "suda")], [sp("MgCl2", "suda"), sp("H2", "g")]);
const mgMass = molarMass221("Mg");
const mgMol = qDiv(qDec221("4.8"), mgMass);
const hclMol = qMul(mgMol, q221(mgAcid221.coeffs[1], mgAcid221.coeffs[0]));
const h2Mol = qMul(mgMol, q221(mgAcid221.coeffs[3], mgAcid221.coeffs[0]));
export const mgAcidResult221 = {
  mgMol, h2Mol, hclMol,
  h2L: gasL(h2Mol),
  h2Particles: qMul(h2Mol, avogadro221),
  hclMass: qMul(hclMol, molarMass221("HCl")),
};
const o2Given = qDiv(qDec221("9.6"), mO2);
const h2oFromO2 = qMul(o2Given, q221(propaneEq221.coeffs[3], propaneEq221.coeffs[1]));
export const propaneWater221 = {
  o2Mol: o2Given,
  h2oMol: h2oFromO2,
  h2oMass: qMul(h2oFromO2, mH2O),
  hAtomMol: qMul(h2oFromO2, q221(2)),
  hAtoms: qMul(qMul(h2oFromO2, q221(2)), avogadro221),
};
export const stoichExamples221: WorkedExample[] = [
  {
    title: "Magnezyumdan hidrojen gazına üç birim",
    prompt: `${equationText221(mgAcid221, true)}. 4,8 g Mg yeterli HCl ile tamamen tepkimeye giriyor. Mg = 24, H = 1, Cl = 35,5 g/mol; gaz NK’de idealdir (Vₘ = ${t(molarVolume221)} L/mol), Nₐ = ${t(avogadro221)} × 10²³. Oluşan H₂ kaç litredir ve kaç molekül içerir? Kaç gram HCl harcanır?`,
    strategy: "Mg’yi mole çevir; katsayı oranıyla H₂ ve HCl molünü bul; sonra litreye, molekül sayısına ve grama çık.",
    steps: [
      { label: "Mg", expression: `4,8 ÷ ${t(mgMass)} = ${t(mgMol)} mol`, explanation: "Giriş kapısı gramdır." },
      { label: "Oran", expression: `H₂ = ${t(h2Mol)} mol (1 : 1); HCl = ${t(hclMol)} mol (1 : 2)`, explanation: "Katsayılar 1, 2, 1, 1; çarpan hedef katsayısı ÷ Mg katsayısıdır." },
      { label: "H₂", expression: `${t(h2Mol)} × ${t(molarVolume221)} = ${t(mgAcidResult221.h2L)} L; ${t(h2Mol)} × ${t(avogadro221)} × 10²³ = ${tane(mgAcidResult221.h2Particles)}`, explanation: "Litre ve molekül sayısı aynı molden ayrı ayrı çıkar." },
      { label: "HCl", expression: `${t(hclMol)} × ${t(molarMass221("HCl"))} = ${t(mgAcidResult221.hclMass)} g`, explanation: "M(HCl) = 1 + 35,5 = 36,5 g/mol." },
    ],
    answer: `NK’de ${t(mgAcidResult221.h2L)} L H₂, ${tane(mgAcidResult221.h2Particles)} molekül; ${t(mgAcidResult221.hclMass)} g HCl harcanır.`,
    check: `Kütle: 4,8 + ${t(mgAcidResult221.hclMass)} = ${t(qAdd(qDec221("4.8"), mgAcidResult221.hclMass))} g; ürünler ${t(qMul(mgMol, molarMass221("MgCl2")))} g MgCl₂ + ${t(qMul(h2Mol, molarMass221("H2")))} g H₂ = ${t(qAdd(qMul(mgMol, molarMass221("MgCl2")), qMul(h2Mol, molarMass221("H2"))))} g.`,
    pitfall: "HCl katsayısı 2 olduğu hâlde HCl molünü Mg molüne eşit almak.",
  },
  {
    title: "Harcanan oksijenden su ve hidrojen atomu",
    prompt: `${equationText221(propaneEq221, true)}. Yeterli propanla tam yanmada 9,6 g O₂ harcanıyor. H = 1, O = 16 g/mol, Nₐ = ${t(avogadro221)} × 10²³. Kaç gram H₂O oluşur ve bu su kaç H atomu içerir?`,
    strategy: "O₂’yi mole çevir, 4/5 oranıyla suya geç; atom sayısı için su molünü formüldeki H indisiyle çarp.",
    steps: [
      { label: "O₂", expression: `9,6 ÷ ${t(mO2)} = ${t(o2Given)} mol`, explanation: "Giriş kapısı O₂ kütlesidir." },
      { label: "H₂O", expression: `${t(o2Given)} × 4/5 = ${t(h2oFromO2)} mol → ${t(propaneWater221.h2oMass)} g`, explanation: "Çarpan su katsayısı ÷ O₂ katsayısı = 4/5; M(H₂O) = 18 g/mol." },
      { label: "H atomu", expression: `${t(h2oFromO2)} × 2 = ${t(propaneWater221.hAtomMol)} mol → ${tane(propaneWater221.hAtoms)}`, explanation: "Her H₂O molekülünde 2 H atomu vardır; molekül sayısıyla atom sayısı ayrıdır." },
    ],
    answer: `${t(propaneWater221.h2oMass)} g H₂O; ${tane(propaneWater221.hAtoms)} H atomu.`,
    check: `Bu H atomlarının hepsi propandan gelir: ${t(qMul(o2Given, q221(1, 5)))} mol C₃H₈ × 8 = ${t(qMul(qMul(o2Given, q221(1, 5)), q221(8)))} mol H.`,
    pitfall: "Molekül sayısını H atomu sayısı diye vermek veya 9,6 g’ı 4/5 ile çarpıp doğrudan su kütlesi saymak.",
  },
];
guard(qEq(propaneWater221.hAtomMol, qMul(qMul(o2Given, q221(1, 5)), q221(8))), "su H atomları propan H atomlarına eşit olmalı");

export const stoichSupplement221 = {
  title: stoichSection221.title,
  figureTitle: stoichSection221.title,
  paragraphs: stoichSection221.paragraphs,
  summary: `${equationText221(propaneEq221)}: verileni kendi molüne çevir (n = m/M, NK’de n = V/${t(molarVolume221)}, n = N/Nₐ), katsayı oranıyla öteki türe geç, sonra hedef birime çık. M: C₃H₈ ${t(mC3H8)}, O₂ ${t(mO2)}, CO₂ ${t(mCO2)}, H₂O ${t(mH2O)} g/mol. Sıvı suya litre uygulanmaz; molekül ile atom sayısını ayır.`,
  appendSection: true as const,
  table: stoichTable,
  examples: stoichExamples221,
};

/* ======================================================================
 * 4. Sınırlayıcı ve artan madde: alüminyum sülfür, beş karışım
 * ==================================================================== */

export const alS221 = balance221([sp("Al"), sp("S")], [sp("Al2S3")]);
const alMass = molarMass221("Al");
const sMass = molarMass221("S");
const al2s3Mass = molarMass221("Al2S3");
/** Kütle tarifi: 2·27 g Al + 3·32 g S → 150 g Al₂S₃. */
export const alSRecipe221 = { al: qMul(alMass, q221(alS221.coeffs[0])), s: qMul(sMass, q221(alS221.coeffs[1])), product: qMul(al2s3Mass, q221(alS221.coeffs[2])) };
guard(qEq(qAdd(alSRecipe221.al, alSRecipe221.s), alSRecipe221.product), "tarif kütleleri korunmalı");
export interface LimitRow221 {
  al: Q221; s: Q221;
  alCap: Q221; sCap: Q221; xi: Q221;
  limiting: "Al" | "S" | "ikisi";
  product: Q221; alLeft: Q221; sLeft: Q221; alUsed: Q221; sUsed: Q221;
}
export function limitAlS221(al: Q221, s: Q221): LimitRow221 {
  const alCap = qDiv(qDiv(al, alMass), q221(alS221.coeffs[0]));
  const sCap = qDiv(qDiv(s, sMass), q221(alS221.coeffs[1]));
  const xi = qMin([alCap, sCap]);
  const alUsed = qMul(qMul(xi, q221(alS221.coeffs[0])), alMass);
  const sUsed = qMul(qMul(xi, q221(alS221.coeffs[1])), sMass);
  const c = qCmp(alCap, sCap);
  return { al, s, alCap, sCap, xi, limiting: c === 0 ? "ikisi" : c < 0 ? "Al" : "S", product: qMul(xi, al2s3Mass), alUsed, sUsed, alLeft: qSub(al, alUsed), sLeft: qSub(s, sUsed) };
}
export const limitRows221: readonly LimitRow221[] = ([["5.4", "9.6"], ["10.8", "9.6"], ["2.7", "9.6"], ["12", "12"], ["10.8", "16"]] as const).map(([a, b]) => limitAlS221(qDec221(a), qDec221(b)));
{
  for (const r of limitRows221) {
    guard(qEq(qAdd(r.al, r.s), qAdd(r.product, qAdd(r.alLeft, r.sLeft))), "son karışım başlangıç kütlesine eşit olmalı");
    guard(qEq(r.product, qAdd(r.alUsed, r.sUsed)), "ürün tüketilen girenlerin toplamına eşit olmalı");
    guard(qEq(qMul(r.alUsed, alSRecipe221.s), qMul(r.sUsed, alSRecipe221.al)), "tüketilen Al/S oranı tarife eşit olmalı");
    guard(r.alLeft.n >= 0 && r.sLeft.n >= 0 && (r.alLeft.n === 0 || r.sLeft.n === 0), "en az bir giren tükenmeli, hiçbiri eksiye düşmemeli");
  }
  guard(limitRows221.some((r) => r.limiting === "S" && qCmp(r.s, r.al) > 0), "gramca büyük olanın sınırlayıcı olduğu satır olmalı");
  guard(limitRows221.some((r) => r.limiting === "ikisi"), "tam oranlı satır olmalı");
  guard(limitRows221.some((r) => qEq(r.al, r.s) && r.limiting !== "ikisi"), "eşit gramın tam oran olmadığı satır olmalı");
}
const g = (x: Q221) => `${t(x)} g`;
const limitName = (r: LimitRow221) => (r.limiting === "ikisi" ? "İkisi birlikte biter" : r.limiting);
const leftText = (r: LimitRow221) => (r.limiting === "ikisi" ? "Artan yok" : r.limiting === "Al" ? `${g(r.sLeft)} S` : `${g(r.alLeft)} Al`);
const limitTable = {
  layout: "table" as const,
  headers: ["Başlangıç (Al; S)", "n/katsayı (Al; S)", "Sınırlayıcı", "Oluşan Al₂S₃", "Artan"],
  rows: limitRows221.map((r) => [`${g(r.al)}; ${g(r.s)}`, `${t(r.alCap)}; ${t(r.sCap)}`, limitName(r), g(r.product), leftText(r)]),
};
const recipeRatio = qDiv(alSRecipe221.al, alSRecipe221.s);
const bigLimit = limitRows221.find((r) => r.limiting === "S" && qCmp(r.s, r.al) > 0)!;
const equalGram = limitRows221.find((r) => qEq(r.al, r.s))!;
const exact = limitRows221.find((r) => r.limiting === "ikisi")!;
export const limitSection221: GuideSection = {
  title: "Alüminyum sülfür: beş karışım, beş kapasite karşılaştırması",
  paragraphs: [
    `${equationText221(alS221)} denkleminde katsayılar mol oranıdır. Al = ${t(alMass)}, S = ${t(sMass)} g/mol ile kütle tarifi ${g(alSRecipe221.al)} Al + ${g(alSRecipe221.s)} S → ${g(alSRecipe221.product)} Al₂S₃ olur; tüketilen Al ve S kütleleri her zaman ${recipeRatio.n} : ${recipeRatio.d} oranındadır. Her satırda girenin molü kendi katsayısına bölündü; küçük değer sınırlayıcıdır ve ürün o değerin ${t(al2s3Mass)} g/mol ile çarpımıdır.`,
    `${g(bigLimit.al)} Al ve ${g(bigLimit.s)} S satırında kükürt gramca büyük olduğu hâlde sınırlayıcıdır: ${t(bigLimit.sCap)} < ${t(bigLimit.alCap)}. ${g(equalGram.al)} Al ve ${g(equalGram.s)} S eşit gramdır ama tam oranlı değildir; ${g(equalGram.sUsed)} S’nin tamamı tükenir, Al’den ${g(equalGram.alUsed)} harcanır ve ${g(equalGram.alLeft)} artar.`,
    `Yalnız ${g(exact.al)} Al ve ${g(exact.s)} S satırında iki kapasite eşittir (${t(exact.xi)}); artan yoktur ve iki giren birlikte biter. Öteki satırlarda artan, başlangıç eksi tüketilen kütledir.`,
    "Her satırda iki denetim birlikte sağlanır: ürün kütlesi tüketilen Al ve S kütlelerinin toplamıdır; ürün ile artan toplamı başlangıç kütlesine eşittir. Bu hesap yan tepkimenin olmadığı, tepkimenin tamamlandığı modele aittir.",
  ],
  table: limitTable,
  figureTitle: "Alüminyum sülfür: beş karışım, beş kapasite karşılaştırması",
};

/** Ters soru: 15 g Al₂S₃ oluştu ve 2,7 g Al arttı. */
export const limitReverse221 = (() => {
  const product = q221(15);
  const alLeft = qDec221("2.7");
  const xi = qDiv(product, al2s3Mass);
  const alUsed = qMul(qMul(xi, q221(alS221.coeffs[0])), alMass);
  const sUsed = qMul(qMul(xi, q221(alS221.coeffs[1])), sMass);
  return { product, alLeft, xi, alUsed, sUsed, alStart: qAdd(alUsed, alLeft), sStart: sUsed };
})();
{
  const back = limitAlS221(limitReverse221.alStart, limitReverse221.sStart);
  guard(back.limiting === "S" && qEq(back.product, limitReverse221.product) && qEq(back.alLeft, limitReverse221.alLeft), "ters soru ileri hesapla doğrulanmalı");
}
export const methaneEq221 = balance221([sp("CH4"), sp("O2")], [sp("CO2"), sp("H2O")]);
export const methaneLimit221 = (() => {
  const ch4 = q221(8);
  const o2 = q221(40);
  const M = methaneEq221.reactants.concat(methaneEq221.products).map((s) => molarMass221(s.f));
  const caps = [qDiv(qDiv(ch4, M[0]), q221(methaneEq221.coeffs[0])), qDiv(qDiv(o2, M[1]), q221(methaneEq221.coeffs[1]))];
  const xi = qMin(caps);
  const used = methaneEq221.coeffs.map((k, i) => qMul(qMul(xi, q221(k)), M[i]));
  return { ch4, o2, M, caps, xi, used, o2Left: qSub(o2, used[1]), ch4Left: qSub(ch4, used[0]) };
})();
guard(methaneLimit221.ch4Left.n === 0 && methaneLimit221.o2Left.n > 0, "metan örneğinde CH₄ sınırlayıcı olmalı");
guard(qEq(qAdd(methaneLimit221.ch4, methaneLimit221.o2), qAdd(qAdd(methaneLimit221.used[2], methaneLimit221.used[3]), methaneLimit221.o2Left)), "metan örneğinde kütle korunmalı");
const ml = methaneLimit221;
export const limitExamples221: WorkedExample[] = [
  {
    title: "Ürün ve artandan başlangıç karışımına",
    prompt: `${equationText221(alS221)} tepkimesi tamamlandığında ${g(limitReverse221.product)} Al₂S₃ oluşuyor ve ${g(limitReverse221.alLeft)} Al artıyor. Al = 27, S = 32 g/mol; yan tepkime yoktur. Başlangıçta kaç gram Al ve kaç gram S vardı?`,
    strategy: "Artan Al olduğuna göre S tükenmiştir. Üründen ilerlemeyi bul, tüketimleri geri hesapla, artanı ekle.",
    steps: [
      { label: "İlerleme", expression: `${t(limitReverse221.product)} ÷ ${t(al2s3Mass)} = ${t(limitReverse221.xi)} mol Al₂S₃`, explanation: "M(Al₂S₃) = 2·27 + 3·32 = 150 g/mol." },
      { label: "Tüketim", expression: `Al: ${t(limitReverse221.xi)} × 2 × 27 = ${g(limitReverse221.alUsed)}; S: ${t(limitReverse221.xi)} × 3 × 32 = ${g(limitReverse221.sUsed)}`, explanation: "Katsayılar 2 ve 3, mol oranıdır." },
      { label: "Başlangıç", expression: `Al = ${t(limitReverse221.alUsed)} + ${t(limitReverse221.alLeft)} = ${g(limitReverse221.alStart)}; S = ${g(limitReverse221.sStart)}`, explanation: "S tükendiği için başlangıç S tüketilen S’ye eşittir." },
    ],
    answer: `${g(limitReverse221.alStart)} Al ve ${g(limitReverse221.sStart)} S.`,
    check: `${t(limitReverse221.alStart)} + ${t(limitReverse221.sStart)} = ${t(qAdd(limitReverse221.alStart, limitReverse221.sStart))} g = ${t(limitReverse221.product)} g ürün + ${t(limitReverse221.alLeft)} g artan.`,
    pitfall: "Artan Al’yi ürünün içinde saymak veya S’nin de arttığını varsaymak.",
  },
  {
    title: "Metanın yanmasında son karışım",
    prompt: `${equationText221(methaneEq221)} tepkimesinde ${g(ml.ch4)} CH₄ ile ${g(ml.o2)} O₂ tam tepkimeye sokuluyor. H = 1, C = 12, O = 16 g/mol. Hangi giren sınırlayıcıdır? Kaç gram CO₂ ve H₂O oluşur, kaç gram hangi madde artar?`,
    strategy: "Gramları mole çevir, her girenin molünü katsayısına böl; küçük kapasiteyle tüketimleri ve ürünleri hesapla.",
    steps: [
      { label: "Kapasite", expression: `CH₄: ${t(qDiv(ml.ch4, ml.M[0]))} ÷ 1 = ${t(ml.caps[0])}; O₂: ${t(qDiv(ml.o2, ml.M[1]))} ÷ 2 = ${t(ml.caps[1])}`, explanation: `M(CH₄) = ${t(ml.M[0])}, M(O₂) = ${t(ml.M[1])} g/mol.` },
      { label: "Sınırlayıcı", expression: `ξ = ${t(ml.xi)} mol → CH₄ tükenir`, explanation: `O₂’den ${t(qMul(ml.xi, q221(2)))} mol = ${g(ml.used[1])} harcanır.` },
      { label: "Ürünler", expression: `CO₂ ${t(ml.xi)} × ${t(ml.M[2])} = ${g(ml.used[2])}; H₂O ${t(qMul(ml.xi, q221(2)))} × ${t(ml.M[3])} = ${g(ml.used[3])}`, explanation: "Ürün katsayıları 1 ve 2’dir." },
      { label: "Artan", expression: `O₂: ${t(ml.o2)} − ${t(ml.used[1])} = ${g(ml.o2Left)}`, explanation: "Artan madde ürün değildir; son karışımda kalır." },
    ],
    answer: `CH₄ sınırlayıcıdır; ${g(ml.used[2])} CO₂ ve ${g(ml.used[3])} H₂O oluşur, ${g(ml.o2Left)} O₂ artar.`,
    check: `${t(ml.used[2])} + ${t(ml.used[3])} + ${t(ml.o2Left)} = ${t(qAdd(ml.ch4, ml.o2))} g = ${t(ml.ch4)} + ${t(ml.o2)} g.`,
    pitfall: `O₂’nin gramı (${t(ml.o2)}) büyük diye ya da molü (${t(qDiv(ml.o2, ml.M[1]))}) CH₄’ünkinden (${t(qDiv(ml.ch4, ml.M[0]))}) büyük diye katsayıya bölmeden karar vermek. O₂’nin katsayısı 2 olduğu için karşılaştırılan değerler ${t(ml.caps[1])} ve ${t(ml.caps[0])} olur.`,
  },
];

export const limitSupplement221 = {
  title: limitSection221.title,
  figureTitle: limitSection221.title,
  paragraphs: limitSection221.paragraphs,
  summary: `${equationText221(alS221)}: tarif ${g(alSRecipe221.al)} Al + ${g(alSRecipe221.s)} S → ${g(alSRecipe221.product)}. Her girenin molünü katsayısına böl; küçük olan sınırlayıcıdır. Gramca büyük olan da sınırlayabilir; eşit gram tam oran demek değildir. Artan = başlangıç − tüketilen; ürün = tüketilenlerin toplamı.`,
  appendSection: true as const,
  table: limitTable,
  examples: limitExamples221,
};

/* ======================================================================
 * 5. Sınırlayıcı bileşen: SO₂ + O₂, altı başlangıç ve ξ
 * ==================================================================== */

export const so3Eq221 = balance221([sp("SO2", "g"), sp("O2", "g")], [sp("SO3", "g")]);
export interface IceRow221 {
  start: readonly Q221[];
  caps: readonly (Q221 | null)[];
  xi: Q221;
  limiting: string;
  end: readonly Q221[];
  newSO3: Q221;
  totalStart: Q221;
  totalEnd: Q221;
}
const nu = so3Eq221.coeffs;
export function ice221(so2: Q221, o2: Q221, so3: Q221): IceRow221 {
  const start = [so2, o2, so3];
  const caps = [qDiv(so2, q221(nu[0])), qDiv(o2, q221(nu[1]))];
  const xi = qMin(caps);
  const end = [qSub(so2, qMul(xi, q221(nu[0]))), qSub(o2, qMul(xi, q221(nu[1]))), qAdd(so3, qMul(xi, q221(nu[2])))];
  const names = ["SO₂", "O₂"];
  const atMin = caps.filter((c) => qEq(c, xi)).length;
  const limiting = xi.n === 0
    ? so2.n === 0 && o2.n === 0 ? "Madde yok" : `${names[caps.findIndex((c) => c.n === 0)]} yok`
    : atMin === 2 ? "Birlikte biter" : names[caps.findIndex((c) => qEq(c, xi))];
  const sum = (xs: readonly Q221[]) => xs.reduce(qAdd, q221(0));
  return { start, caps, xi, limiting, end, newSO3: qMul(xi, q221(nu[2])), totalStart: sum(start), totalEnd: sum(end) };
}
export const iceRows221: readonly IceRow221[] = ([["4", "1", "0"], ["3", "2", "0"], ["3", "1.5", "0"], ["2", "2", "1"], ["0", "2", "1"], ["1", "0.25", "0"]] as const)
  .map(([a, b, c]) => ice221(qDec221(a), qDec221(b), qDec221(c)));
const gasDelta = nu[2] - nu[0] - nu[1];
{
  guard(gasDelta === -1, "3 mol gaz 2 mol gaza dönüşmeli");
  for (const r of iceRows221) {
    guard(r.end.every((x) => x.n >= 0), "son miktar eksi olamaz");
    // Toplam gaz molü tam ξ kadar azalır (Δν = −1).
    guard(qEq(r.totalEnd, qSub(r.totalStart, r.xi)), "son toplam = başlangıç toplamı − ξ olmalı");
    // S ve O atomları korunur.
    const atoms = (n: readonly Q221[]) => [qAdd(n[0], n[2]), qAdd(qAdd(qMul(n[0], q221(2)), qMul(n[1], q221(2))), qMul(n[2], q221(3)))];
    const [a0, a1] = atoms(r.start);
    const [b0, b1] = atoms(r.end);
    guard(qEq(a0, b0) && qEq(a1, b1), "S ve O atomları korunmalı");
  }
  guard(iceRows221.some((r) => r.limiting === "SO₂" && qCmp(r.start[0], r.start[1]) > 0), "molce büyük olanın sınırlayıcı olduğu satır olmalı");
  guard(iceRows221.some((r) => r.limiting === "Birlikte biter"), "birlikte biten satır olmalı");
  guard(iceRows221.some((r) => r.start[2].n > 0 && r.xi.n > 0), "başlangıç ürünlü satır olmalı");
  guard(iceRows221.some((r) => r.xi.n === 0 && r.end[2].n > 0), "ξ = 0 olup son ürünün sıfır olmadığı satır olmalı");
}
const triple = (xs: readonly Q221[]) => xs.map(t).join("; ");
const iceTable = {
  layout: "table" as const,
  headers: ["Başlangıç mol (SO₂; O₂; SO₃)", "n/ν (SO₂; O₂)", "ξ ve sınırlayıcı", "Son mol (SO₂; O₂; SO₃)", "Toplam gaz molü"],
  rows: iceRows221.map((r) => [triple(r.start), `${t(r.caps[0]!)}; ${t(r.caps[1]!)}`, `ξ = ${t(r.xi)} · ${r.limiting}`, triple(r.end), `${t(r.totalStart)} → ${t(r.totalEnd)}`]),
};
const bigSO2 = iceRows221.find((r) => r.limiting === "SO₂" && qCmp(r.start[0], r.start[1]) > 0)!;
const preProduct = iceRows221.find((r) => r.start[2].n > 0 && r.xi.n > 0)!;
const zeroRow = iceRows221.find((r) => r.xi.n === 0)!;
const together = iceRows221.find((r) => r.limiting === "Birlikte biter")!;
export const iceSection221: GuideSection = {
  title: "SO₂ ve O₂: altı başlangıç, ξ ve son gaz molü",
  paragraphs: [
    `Tablo ${equationText221(so3Eq221, true)} için altı başlangıç karışımını aynı sırayla çözer: n/ν değerleri (SO₂ için ν = ${nu[0]}, O₂ için ν = ${nu[1]}), en küçük değer ξ, sonra son satır SO₂ − ${nu[0]}ξ, O₂ − ξ, SO₃ + ${nu[2]}ξ. Model tek yönlü ve ideal tam ilerlemelidir; gerçek üretimdeki denge sınırlaması bu tablonun dışındadır.`,
    `${t(bigSO2.start[0])} mol SO₂ ve ${t(bigSO2.start[1])} mol O₂ satırında SO₂ molce fazladır ama sınırlayıcıdır: ${t(bigSO2.caps[0]!)} < ${t(bigSO2.caps[1]!)}. ${t(together.start[0])} ve ${t(together.start[1])} mol satırında iki oran eşittir; iki giren birlikte biter, tek bir sınırlayıcı adı zorlanmaz.`,
    `Başta ${t(preProduct.start[2])} mol SO₃ bulunan satırda yeni oluşan SO₃ ${t(preProduct.newSO3)} moldür; son ${t(preProduct.end[2])} mol bunların toplamıdır. Başta SO₂ olmayan satırda ξ = ${t(zeroRow.xi)} olur; yine de son SO₃ ${t(zeroRow.end[2])} moldür, çünkü başlangıç ürünü yerinde kalır.`,
    `Üç tür de aynı sıcaklık ve basınçta ideal gaz kabul edildi. Her ilerleme biriminde 3 mol gaz 2 mol gaza dönüştüğünden toplam gaz molü her satırda tam ξ kadar azalır. Atomlar korunur; toplam mol korunmaz.`,
  ],
  table: iceTable,
  figureTitle: "SO₂ ve O₂: altı başlangıç, ξ ve son gaz molü",
};

/** Hacim örneği: aynı T ve P’de 10 L SO₂, 8 L O₂. */
export const iceVolume221 = ice221(q221(10), q221(8), q221(0));
/** Ters örnek: son 1,3 mol SO₃ ve 0,2 mol O₂, SO₂ tükendi; başta 0,5 mol SO₃ vardı. */
export const iceReverse221 = (() => {
  const so3Start = qDec221("0.5");
  const so3End = qDec221("1.3");
  const o2End = qDec221("0.2");
  const xi = qDiv(qSub(so3End, so3Start), q221(nu[2]));
  const so2Start = qMul(xi, q221(nu[0]));
  const o2Start = qAdd(o2End, qMul(xi, q221(nu[1])));
  const masses = [molarMass221("SO2"), molarMass221("O2"), molarMass221("SO3")];
  const massStart = qAdd(qAdd(qMul(so2Start, masses[0]), qMul(o2Start, masses[1])), qMul(so3Start, masses[2]));
  const massEnd = qAdd(qMul(so3End, masses[2]), qMul(o2End, masses[1]));
  return { so3Start, so3End, o2End, xi, so2Start, o2Start, masses, massStart, massEnd };
})();
{
  const forward = ice221(iceReverse221.so2Start, iceReverse221.o2Start, iceReverse221.so3Start);
  guard(forward.limiting === "SO₂" && qEq(forward.end[2], iceReverse221.so3End) && qEq(forward.end[1], iceReverse221.o2End), "ters örnek ileri hesapla doğrulanmalı");
  guard(qEq(iceReverse221.massStart, iceReverse221.massEnd), "ters örnekte kütle korunmalı");
  guard(iceVolume221.limiting === "SO₂", "hacim örneğinde SO₂ sınırlayıcı olmalı");
}
const rv = iceReverse221;
const vv = iceVolume221;
export const iceExamples221: WorkedExample[] = [
  {
    title: "Litrelerle sınırlayıcı ve son hacim",
    prompt: `${equationText221(so3Eq221, true)}. Aynı sıcaklık ve basınçta ${t(vv.start[0])} L SO₂ ile ${t(vv.start[1])} L O₂ ideal tam tepkimeye giriyor; bütün türler gazdır ve aynı koşulda ölçülür. Sınırlayıcı hangisidir? Son karışımın bileşimi ve toplam hacmi nedir?`,
    strategy: "Aynı T ve P’de ideal gaz hacimleri mol gibi kullanılabilir. Hacimleri katsayılara böl, küçük değerle son satırı yaz.",
    steps: [
      { label: "n/ν", expression: `SO₂: ${t(vv.start[0])}/2 = ${t(vv.caps[0]!)}; O₂: ${t(vv.start[1])}/1 = ${t(vv.caps[1]!)}`, explanation: "Hacim oranı mol oranına eşittir." },
      { label: "ξ", expression: `ξ = ${t(vv.xi)} L birimi → ${vv.limiting} tükenir`, explanation: `O₂’den ${t(vv.xi)} L harcanır, SO₃ ${t(vv.newSO3)} L oluşur.` },
      { label: "Son", expression: `SO₂ ${t(vv.end[0])} L · O₂ ${t(vv.end[1])} L · SO₃ ${t(vv.end[2])} L`, explanation: `Toplam ${t(vv.totalStart)} L’den ${t(vv.totalEnd)} L’ye iner; azalma ξ kadardır.` },
    ],
    answer: `SO₂ sınırlayıcıdır; son karışım ${t(vv.end[1])} L O₂ ve ${t(vv.end[2])} L SO₃, toplam ${t(vv.totalEnd)} L.`,
    check: `Toplam hacim ${t(vv.totalStart)} − ξ = ${t(vv.totalStart)} − ${t(vv.xi)} = ${t(vv.totalEnd)} L.`,
    pitfall: "O₂ hacmi küçük diye onu sınırlayıcı seçmek veya başlangıç toplam hacminin korunduğunu sanmak.",
  },
  {
    title: "Son karışımdan başlangıcı geri bul",
    prompt: `${equationText221(so3Eq221, true)}. Kapta başlangıçta SO₂, O₂ ve ${t(rv.so3Start)} mol SO₃ vardı. İdeal tam tepkimeden sonra SO₂ tükendi; kapta ${t(rv.so3End)} mol SO₃ ve ${t(rv.o2End)} mol O₂ kaldı. Başlangıçta kaç mol SO₂ ve kaç mol O₂ vardı? S = 32, O = 16 g/mol ile kütle korunumunu denetle.`,
    strategy: "Yeni SO₃’ü başlangıç SO₃’ünden ayır; ondan ξ’yi bul, tüketimleri geri ekle.",
    steps: [
      { label: "Yeni SO₃", expression: `${t(rv.so3End)} − ${t(rv.so3Start)} = ${t(qSub(rv.so3End, rv.so3Start))} mol = 2ξ`, explanation: `ξ = ${t(rv.xi)} mol.` },
      { label: "SO₂", expression: `2ξ = ${t(rv.so2Start)} mol`, explanation: "SO₂ tükendiği için başlangıcı tüketimine eşittir." },
      { label: "O₂", expression: `${t(rv.o2End)} + ξ = ${t(rv.o2Start)} mol`, explanation: "Son miktar ile tüketilen miktarın toplamı başlangıçtır." },
      { label: "Kütle", expression: `${t(rv.so2Start)}·64 + ${t(rv.o2Start)}·32 + ${t(rv.so3Start)}·80 = ${t(rv.massStart)} g`, explanation: `Son: ${t(rv.so3End)}·80 + ${t(rv.o2End)}·32 = ${t(rv.massEnd)} g.` },
    ],
    answer: `${t(rv.so2Start)} mol SO₂ ve ${t(rv.o2Start)} mol O₂.`,
    check: `İleri hesap: n/ν değerleri ${t(qDiv(rv.so2Start, q221(2)))} ve ${t(rv.o2Start)}; SO₂ sınırlar, ξ = ${t(rv.xi)} ve son SO₃ ${t(rv.so3End)} mol çıkar.`,
    pitfall: `Son ${t(rv.so3End)} mol SO₃’ün tamamını bu tepkimede oluşmuş sayıp ξ’yi ${t(qDiv(rv.so3End, q221(2)))} almak.`,
  },
];

export const iceSupplement221 = {
  title: iceSection221.title,
  figureTitle: iceSection221.title,
  paragraphs: iceSection221.paragraphs,
  summary: `${equationText221(so3Eq221)}: n/ν değerlerinin en küçüğü ξ’dir; son = başlangıç − νξ (girenler), başlangıç + νξ (ürün). Molce fazla olan da sınırlayabilir; oranlar eşitse ikisi birlikte biter. Başlangıç SO₃ yerinde kalır. Gaz toplamı her satırda ξ kadar azalır; atomlar korunur.`,
  appendSection: true as const,
  table: iceTable,
  examples: iceExamples221,
};

/** Bu beş dersin daha önce eki yoktur. */
export const depth221Supplements = {
  "tepkimeler-denklemler": [balanceSupplement221],
  "tepkime-turleri": [typeSupplement221],
  "denklemli-miktar-gecisi": [stoichSupplement221],
  "sinirlayici-artan-madde": [limitSupplement221],
  "sinirlayici-bilesen": [iceSupplement221],
};
