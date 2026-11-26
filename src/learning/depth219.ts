import type { GuideSection, WorkedExample } from "./guides/types";

/*
 * TYT Kimya mol ve kimyanın temel kanunları derinleştirmesi (0.219.0):
 * mol–kütle, mol–tanecik, ortalama atom kütlesi, gerçek kütle ve kütlenin
 * korunumu–sabit oran. Kabul edilmiş rehberler değişmez; tablo bölümü, iki
 * özgün çözümlü örnek ve bölüm çizimi görüntüleme katmanında eklenir.
 * Bütün hesaplar bigint kesirleriyle tam yapılır; yalnız gösterimde
 * yuvarlanır. Paragraflar, tablo hücreleri, çizim okumaları ve Kopya Kâğıdı
 * özetleri aynı verilerden yazılır; metindeki genel yargılar modül
 * yüklenirken denetlenir.
 */

const guard = (ok: boolean, claim: string) => {
  if (!ok) throw new Error(`depth219: veri bu yargıyı artık desteklemiyor: ${claim}`);
};

/* ======================================================================
 * Tam kesir aritmetiği
 * ==================================================================== */

const gcd = (a: bigint, b: bigint): bigint => {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b) [a, b] = [b, a % b];
  return a;
};
/** Sadeleşmiş kesir n/d (d > 0). */
export interface Q219 { readonly n: bigint; readonly d: bigint }
const make = (n: bigint, d: bigint): Q219 => {
  if (d === 0n) throw new Error("depth219: sıfıra bölme");
  if (d < 0n) [n, d] = [-n, -d];
  const g = gcd(n, d) || 1n;
  return { n: n / g, d: d / g };
};
/** "35.5", "6.02", 12 gibi ondalık yazımı tam kesre çevirir. */
export const q219 = (x: string | number): Q219 => {
  const s = String(x);
  const m = /^(-?)(\d+)(?:\.(\d+))?$/.exec(s);
  if (!m) throw new Error(`depth219: ondalık değil: ${s}`);
  const frac = m[3] ?? "";
  const n = BigInt(m[2] + frac) * (m[1] ? -1n : 1n);
  return make(n, 10n ** BigInt(frac.length));
};
export const add219 = (a: Q219, b: Q219) => make(a.n * b.d + b.n * a.d, a.d * b.d);
export const sub219 = (a: Q219, b: Q219) => make(a.n * b.d - b.n * a.d, a.d * b.d);
export const mul219 = (a: Q219, b: Q219) => make(a.n * b.n, a.d * b.d);
export const div219 = (a: Q219, b: Q219) => make(a.n * b.d, a.d * b.n);
export const cmp219 = (a: Q219, b: Q219) => {
  const x = a.n * b.d - b.n * a.d;
  return x > 0n ? 1 : x < 0n ? -1 : 0;
};
export const eq219 = (a: Q219, b: Q219) => cmp219(a, b) === 0;
export const min219 = (a: Q219, b: Q219) => (cmp219(a, b) <= 0 ? a : b);
export const sum219 = (xs: readonly Q219[]) => xs.reduce(add219, q219(0));
export const num219 = (a: Q219) => Number(a.n) / Number(a.d);
const ZERO = q219(0);
const ONE = q219(1);
const TEN = q219(10);
const abs = (a: Q219) => (a.n < 0n ? make(-a.n, a.d) : a);

/** Yarım yukarı yuvarlar; keep false ise sondaki sıfırlar atılır. Türkçe ondalık virgül. */
export const fx219 = (a: Q219, digits = 2, keep = false) => {
  const scale = 10n ** BigInt(digits);
  const neg = a.n < 0n;
  const n = neg ? -a.n : a.n;
  const r = (n * scale * 2n + a.d) / (2n * a.d);
  let int = (r / scale).toString();
  let frac = (r % scale).toString().padStart(digits, "0");
  if (!keep) frac = frac.replace(/0+$/, "");
  if (digits === 0) frac = "";
  if (neg && r !== 0n) int = `−${int}`;
  return frac ? `${int},${frac}` : int;
};
const SUP: Record<string, string> = { "-": "⁻", "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
export const sup219 = (k: number) => [...String(k)].map((c) => SUP[c]).join("");
/** mantissa × 10^exp değerini 1 ≤ m < 10 olacak biçimde normalleştirir. */
export const norm219 = (mant: Q219, exp: number, digits: number) => {
  let m = abs(mant);
  let e = exp;
  guard(m.n !== 0n, "bilimsel gösterimde sıfır olmamalı");
  while (cmp219(m, TEN) >= 0) { m = div219(m, TEN); e += 1; }
  while (cmp219(m, ONE) < 0) { m = mul219(m, TEN); e -= 1; }
  // Yuvarlama 9,995 → 10,00 yaparsa bir basamak kaydır.
  if (fx219(m, digits, true).startsWith("10")) { m = div219(m, TEN); e += 1; }
  return { m, e };
};
/** "7,31 × 10⁻²³" biçimi. keep true ise anlamlı sıfırlar korunur. */
export const sci219 = (mant: Q219, exp: number, digits = 2, keep = true) => {
  const { m, e } = norm219(mant, exp, digits);
  return `${fx219(m, digits, keep)} × 10${sup219(e)}`;
};

/* ======================================================================
 * Ortak sabitler
 * ==================================================================== */

/*
 * Okul (TYT) hesaplarında kullanılan yuvarlatılmış atom kütleleri; dersler
 * bu değerleri kullanır. Karşılaştırma için IUPAC CIAAW 2021 kısaltılmış
 * standart atom kütleleri (birimsiz Aᵣ) aynı yerde tutulur ve her okul
 * değerinin en çok 0,5 farkla yuvarlandığı denetlenir.
 */
export const ATOMIC_MASS219 = {
  H: "1", He: "4", Li: "7", B: "11", C: "12", N: "14", O: "16", Na: "23", Mg: "24", Al: "27",
  S: "32", Cl: "35.5", Ca: "40", Fe: "56", Cu: "64", Br: "80",
} as const;
export type El219 = keyof typeof ATOMIC_MASS219;
export const IUPAC_AR219: Record<El219, number> = {
  H: 1.008, He: 4.0026, Li: 6.94, B: 10.81, C: 12.011, N: 14.007, O: 15.999, Na: 22.99, Mg: 24.305, Al: 26.982,
  S: 32.06, Cl: 35.45, Ca: 40.078, Fe: 55.845, Cu: 63.546, Br: 79.904,
};
export const ar219 = (el: El219) => q219(ATOMIC_MASS219[el]);
for (const el of Object.keys(ATOMIC_MASS219) as El219[]) guard(Math.abs(num219(ar219(el)) - IUPAC_AR219[el]) <= 0.5, `${el} okul değeri IUPAC değerinin yuvarlanmışı olmalı`);

/*
 * Avogadro sabiti: 2019 SI tanımında Nₐ = 6,02214076 × 10²³ mol⁻¹ (kesin).
 * Dersler yaklaşık hesapta 6,02 × 10²³ mol⁻¹ kullanır.
 * Atomik kütle birimi: CODATA 2018 1 u = 1,66053906660 × 10⁻²⁴ g; ders
 * 1,6605 × 10⁻²⁴ g yazar.
 */
export const NA_EXACT219 = q219("6.02214076");
export const NA219 = q219("6.02");
export const NA_EXP219 = 23;
export const U_CODATA219 = q219("1.66053906660");
export const U219 = q219("1.6605");
export const U_EXP219 = -24;
guard(fx219(NA_EXACT219, 2) === fx219(NA219, 2), "6,02 kesin Nₐ’nın yuvarlanmışı olmalı");
guard(fx219(U_CODATA219, 4) === fx219(U219, 4), "1,6605 CODATA u değerinin yuvarlanmışı olmalı");
export const NA_TEXT219 = `${sci219(NA219, NA_EXP219)} mol⁻¹`;

/* ---------- Formüller ---------- */

export interface Formula219 {
  /** Görünen formül. */
  formula: string;
  /** Element → birimdeki atom sayısı (formüldeki yazım sırasıyla). */
  parts: readonly (readonly [El219, number])[];
  /** Sayılan varlık. */
  unit: "atom" | "molekül" | "formül birimi";
}
export const molar219 = (f: Formula219) => sum219(f.parts.map(([el, k]) => mul219(ar219(el), q219(k))));
export const atomsPerUnit219 = (f: Formula219) => f.parts.reduce((s, [, k]) => s + k, 0);
/** "2 × 1 + 16 = 18 g/mol" açılımı. */
export const molarText219 = (f: Formula219) =>
  `${f.parts.map(([el, k]) => (k === 1 ? fx219(ar219(el)) : `${k} × ${fx219(ar219(el))}`)).join(" + ")} = ${fx219(molar219(f))} g/mol`;
const partsText = (f: Formula219) => f.parts.map(([el, k]) => `${k} ${el}`).join(" + ");
const F = (formula: string, unit: Formula219["unit"], ...parts: [El219, number][]): Formula219 => ({ formula, unit, parts });

const g = (x: Q219) => `${fx219(x, 4)} g`;
const mol = (x: Q219) => `${fx219(x, 4)} mol`;
const naText = (x: Q219) => `${fx219(x, 4)} Nₐ`;
export const countSci219 = (x: Q219) => sci219(mul219(x, NA219), NA_EXP219, 4, false);

/* ======================================================================
 * 1 · mol-kutle-iliskisi: formülden M, kütleden mol ve tanecik
 * ==================================================================== */

export interface MassRow219 { f: Formula219; m: Q219; M: Q219; n: Q219; atoms: Q219 }
const massRow = (f: Formula219, m: string): MassRow219 => {
  const M = molar219(f);
  const n = div219(q219(m), M);
  return { f, m: q219(m), M, n, atoms: mul219(n, q219(atomsPerUnit219(f))) };
};
export const massRows219: readonly MassRow219[] = [
  massRow(F("H₂O", "molekül", ["H", 2], ["O", 1]), "9"),
  massRow(F("CO₂", "molekül", ["C", 1], ["O", 2]), "11"),
  massRow(F("NH₃", "molekül", ["N", 1], ["H", 3]), "8.5"),
  massRow(F("CH₄", "molekül", ["C", 1], ["H", 4]), "8"),
  massRow(F("NaOH", "formül birimi", ["Na", 1], ["O", 1], ["H", 1]), "10"),
  massRow(F("CaCO₃", "formül birimi", ["Ca", 1], ["C", 1], ["O", 3]), "25"),
  massRow(F("Al₂O₃", "formül birimi", ["Al", 2], ["O", 3]), "51"),
  massRow(F("Fe₂O₃", "formül birimi", ["Fe", 2], ["O", 3]), "16"),
];
const byFormula = <T extends { f: Formula219 }>(rows: readonly T[], formula: string) => {
  const row = rows.find(({ f }) => f.formula === formula);
  if (!row) throw new Error(`depth219: ${formula} satırı yok`);
  return row;
};
const heaviest = massRows219.reduce((a, b) => (cmp219(b.m, a.m) > 0 ? b : a));
const lightest = massRows219.reduce((a, b) => (cmp219(b.m, a.m) < 0 ? b : a));
const fewestMol = massRows219.reduce((a, b) => (cmp219(b.n, a.n) < 0 ? b : a));
const ch4 = byFormula(massRows219, "CH₄");
const al2o3 = byFormula(massRows219, "Al₂O₃");
const ionicMass = massRows219.filter(({ f }) => f.unit === "formül birimi");
{
  guard(heaviest === al2o3 && lightest === ch4, "en büyük kütle Al₂O₃, en küçük CH₄ satırında olmalı");
  guard(eq219(heaviest.n, lightest.n), "en ağır ve en hafif örnek aynı mol miktarını içermeli");
  guard(atomsPerUnit219(al2o3.f) === atomsPerUnit219(ch4.f) && eq219(al2o3.atoms, ch4.atoms), "Al₂O₃ ve CH₄ birimleri eşit atom içermeli");
  guard(fewestMol.f.formula === "Fe₂O₃" && cmp219(fewestMol.m, lightest.m) > 0, "en az mol, en hafif örnekte olmamalı");
  guard(ionicMass.every(({ f }) => f.parts.some(([el]) => ["Na", "Ca", "Al", "Fe"].includes(el))), "formül birimi satırları metal içeren iyonik bileşikler olmalı");
}
const massTable = {
  layout: "table" as const,
  headers: ["Madde", "M = Σ (atom sayısı × atom kütlesi)", "Örnek kütlesi", "n = m/M", "Sayılan varlık"],
  rows: massRows219.map(({ f, m, n }) => [f.formula, molarText219(f), g(m), mol(n), `${naText(n)} ${f.unit}`]),
};
export const massSection219: GuideSection = {
  title: "Formülden M’yi aç, kütleyi mole ve taneciğe çevir",
  paragraphs: [
    `Tablodaki her satır aynı üç adımı izler. Önce formüldeki her elementin atom sayısını atom kütlesiyle çarpıp topla: ${massRows219[0].f.formula} için ${molarText219(massRows219[0].f)}. Sonra örnek kütlesini M’ye böl: ${g(massRows219[0].m)} ÷ ${fx219(massRows219[0].M)} g/mol = ${mol(massRows219[0].n)}. Son olarak mol miktarını Nₐ ile çarp ve sayılan varlığı adıyla yaz. Atom kütleleri ${Object.entries(ATOMIC_MASS219).filter(([el]) => massRows219.some(({ f }) => f.parts.some(([e]) => e === el))).map(([el, a]) => `${el} = ${a.replace(".", ",")}`).join(", ")} alınmıştır.`,
    `Kütle sırası mol sırası değildir. Tablonun en ağır örneği ${g(heaviest.m)} ${heaviest.f.formula}, en hafifi ${g(lightest.m)} ${lightest.f.formula}; ikisi de ${mol(heaviest.n)} içerir. Bir birimde ikisinde de ${atomsPerUnit219(al2o3.f)} atom olduğu için toplam atom miktarları da eşittir: ${mol(al2o3.atoms)} atom. En az madde miktarı ise ${g(fewestMol.m)} ${fewestMol.f.formula} örneğindedir (${mol(fewestMol.n)}); bu örnek ${lightest.f.formula}’ten ağır olduğu hâlde daha az formül birimi içerir.`,
    `${ionicMass.map(({ f }) => f.formula).join(", ")} iyonik bileşiklerdir; sayılan varlık molekül değil formül birimidir. M yine aynı toplamayla bulunur. ${byFormula(massRows219, "CaCO₃").f.formula} satırında ${molarText219(byFormula(massRows219, "CaCO₃").f)} olur; parantez ya da alt indis yalnız yazıldığı gruba uygulanır.`,
  ],
  table: massTable,
};

/* Örnek 1: aynı molekül sayısı, farklı atom sayısı. */
const exCO2 = { f: byFormula(massRows219, "CO₂").f, m: q219(22) };
const exNH3 = byFormula(massRows219, "NH₃").f;
export const massExampleA219 = (() => {
  const n = div219(exCO2.m, molar219(exCO2.f));
  const mNH3 = mul219(n, molar219(exNH3));
  const atomsCO2 = mul219(n, q219(atomsPerUnit219(exCO2.f)));
  const atomsNH3 = mul219(n, q219(atomsPerUnit219(exNH3)));
  return { n, mNH3, atomsCO2, atomsNH3, extra: sub219(atomsNH3, atomsCO2) };
})();
guard(cmp219(massExampleA219.atomsNH3, massExampleA219.atomsCO2) > 0, "eşit molde NH₃ daha çok atom içermeli");
/* Örnek 2: X₂O₃’ten X’in atom kütlesi. */
export const massExampleB219 = (() => {
  const n = q219("0.25");
  const m = q219(40);
  const M = div219(m, n);
  const oPart = mul219(q219(3), ar219("O"));
  const x = div219(sub219(M, oPart), q219(2));
  return { n, m, M, oPart, x };
})();
guard(eq219(massExampleB219.x, ar219("Fe")), "X₂O₃ örneğinde X demir kütlesini vermeli");
const eA = massExampleA219;
const eB = massExampleB219;
export const massExamples219: WorkedExample[] = [
  {
    title: "Aynı sayıda molekül, farklı sayıda atom",
    prompt: `H = 1, C = 12, N = 14, O = 16. ${g(exCO2.m)} CO₂ ile aynı sayıda molekül içeren NH₃ örneği kaç gramdır? Bu iki örnekteki toplam atom sayıları eşit midir? Atom sayılarını Nₐ cinsinden yazın.`,
    strategy: "Eşit molekül sayısı eşit mol demektir. Önce CO₂’nin molünü bul, aynı molün NH₃ kütlesini hesapla, sonra birimdeki atom sayılarıyla çarp.",
    steps: [
      { label: "CO₂ miktarı", expression: `n = ${fx219(exCO2.m)} ÷ ${fx219(molar219(exCO2.f))} = ${mol(eA.n)}`, explanation: `M(CO₂) = ${molarText219(exCO2.f)}.` },
      { label: "NH₃ kütlesi", expression: `m = ${fx219(eA.n)} × ${fx219(molar219(exNH3))} = ${g(eA.mNH3)}`, explanation: `M(NH₃) = ${molarText219(exNH3)}. Aynı mol, aynı molekül sayısıdır.` },
      { label: "Atom sayıları", expression: `CO₂: ${atomsPerUnit219(exCO2.f)} × ${fx219(eA.n)} = ${naText(eA.atomsCO2)}; NH₃: ${atomsPerUnit219(exNH3)} × ${fx219(eA.n)} = ${naText(eA.atomsNH3)}`, explanation: "Bir CO₂ molekülünde 3, bir NH₃ molekülünde 4 atom vardır." },
    ],
    answer: `${g(eA.mNH3)} NH₃. Toplam atom sayıları eşit değildir: CO₂ ${naText(eA.atomsCO2)}, NH₃ ${naText(eA.atomsNH3)} atom içerir.`,
    check: `${fx219(eA.mNH3)} ÷ ${fx219(molar219(exNH3))} = ${fx219(eA.n)} mol; fark ${naText(eA.extra)} atom, yani ${fx219(eA.n)} mol × (4 − 3).`,
    pitfall: "Eşit molekül sayısını eşit kütle ya da eşit atom sayısı sanmak. Kütleyi M, atom sayısını birimdeki atom sayısı belirler.",
  },
  {
    title: "Formül ve kütleden bilinmeyen atom kütlesi",
    prompt: `X bir element, O = 16. ${fx219(eB.n)} mol X₂O₃ formül biriminin kütlesi ${g(eB.m)} olarak ölçülüyor. X’in atom kütlesi kaçtır? Fe = 56 verildiğine göre X demir olabilir mi?`,
    strategy: "Önce M = m/n ile bileşiğin mol kütlesini bul. Sonra formüldeki oksijen katkısını çıkar ve kalanı X atomlarının sayısına böl.",
    steps: [
      { label: "Mol kütlesi", expression: `M = ${fx219(eB.m)} ÷ ${fx219(eB.n)} = ${fx219(eB.M)} g/mol`, explanation: "Örnek kütlesini mol miktarına böl." },
      { label: "Oksijen katkısı", expression: `3 × 16 = ${fx219(eB.oPart)}`, explanation: "Bir formül biriminde üç O atomu var." },
      { label: "X", expression: `2X = ${fx219(eB.M)} − ${fx219(eB.oPart)} = ${fx219(mul219(eB.x, q219(2)))} → X = ${fx219(eB.x)}`, explanation: "Bir birimde iki X atomu olduğu için kalan ikiye bölünür." },
    ],
    answer: `X’in atom kütlesi ${fx219(eB.x)}; Fe = 56 ile uyumludur, X demir olabilir.`,
    check: `${fx219(eB.n)} × (2 × ${fx219(eB.x)} + 3 × 16) = ${fx219(eB.n)} × ${fx219(eB.M)} = ${g(eB.m)}.`,
    pitfall: `${g(eB.m)} örnek kütlesini mol kütlesi sanmak ya da oksijeni çıkarmadan ${fx219(eB.M)} değerini ikiye bölmek.`,
  },
];
export const massSupplement219 = {
  title: massSection219.title,
  figureTitle: massSection219.title,
  paragraphs: massSection219.paragraphs,
  summary: `M = Σ (atom sayısı × atom kütlesi); n = m/M; tanecik = n × Nₐ. ${massRows219.slice(0, 2).map(({ f, m, M, n }) => `${g(m)} ${f.formula} ÷ ${fx219(M)} = ${mol(n)}`).join(". ")}. ${g(heaviest.m)} ${heaviest.f.formula} ile ${g(lightest.m)} ${lightest.f.formula} aynı ${mol(heaviest.n)}: kütle sırası mol sırası değildir. İyonik bileşikte formül birimi sayılır.`,
  appendSection: true as const,
  table: massTable,
  examples: massExamples219,
};

/* ======================================================================
 * 2 · mol-tanecik-iliskisi: birimdeki atomdan toplam atom sayısına
 * ==================================================================== */

export interface CountRow219 { f: Formula219; n: Q219; perUnit: number; atoms: Q219; ions?: number }
const countRow = (f: Formula219, n: string, ions?: number): CountRow219 => ({
  f, n: q219(n), perUnit: atomsPerUnit219(f), atoms: mul219(q219(n), q219(atomsPerUnit219(f))), ions,
});
export const countRows219: readonly CountRow219[] = [
  countRow(F("O₃", "molekül", ["O", 3]), "0.2"),
  countRow(F("N₂", "molekül", ["N", 2]), "0.5"),
  countRow(F("H₂O", "molekül", ["H", 2], ["O", 1]), "0.5"),
  countRow(F("NH₃", "molekül", ["N", 1], ["H", 3]), "0.25"),
  countRow(F("CH₄", "molekül", ["C", 1], ["H", 4]), "0.2"),
  countRow(F("C₂H₅OH", "molekül", ["C", 2], ["H", 6], ["O", 1]), "0.1"),
  countRow(F("MgCl₂", "formül birimi", ["Mg", 1], ["Cl", 2]), "0.5", 3),
  countRow(F("Na₂CO₃", "formül birimi", ["Na", 2], ["C", 1], ["O", 3]), "0.25", 3),
];
/** C₂H₅OH’ta H iki yerde yazılır; parts toplanmış bileşimi verir. */
guard(byFormula(countRows219, "C₂H₅OH").f.parts.find(([el]) => el === "H")![1] === 5 + 1, "etanolde 6 H olmalı");
const oneMolAtoms = countRows219.filter(({ atoms }) => eq219(atoms, ONE));
const mgcl2 = byFormula(countRows219, "MgCl₂");
const na2co3 = byFormula(countRows219, "Na₂CO₃");
const ethanol = byFormula(countRows219, "C₂H₅OH");
const mostPerUnit = countRows219.reduce((a, b) => (b.perUnit > a.perUnit ? b : a));
{
  guard(oneMolAtoms.length >= 3 && new Set(oneMolAtoms.map(({ n }) => fx219(n))).size === oneMolAtoms.length, "en az üç satır farklı molle aynı 1 mol atomu vermeli");
  guard(oneMolAtoms.every((r, i, all) => i === 0 || (cmp219(r.n, all[i - 1].n) < 0) === (r.perUnit > all[i - 1].perUnit)), "aynı toplamda az mol, birimde çok atom demek");
  guard(mostPerUnit === ethanol && cmp219(ethanol.n, countRows219.reduce((a, b) => min219(a, b.n), ONE)) === 0, "birimde en çok atom C₂H₅OH’ta, en küçük mol de onda olmalı");
  guard(mgcl2.ions === mgcl2.perUnit && na2co3.ions! < na2co3.perUnit, "MgCl₂’de iyon = atom, Na₂CO₃’te iyon < atom olmalı");
}
const countTable = {
  layout: "table" as const,
  headers: ["Madde (sayılan birim)", "Bir birimdeki atomlar", "Örnek miktarı", "Toplam atom miktarı", `Atom sayısı (Nₐ = ${sci219(NA219, NA_EXP219)})`],
  rows: countRows219.map(({ f, n, perUnit, atoms }) => [`${f.formula} (${f.unit})`, `${partsText(f)} = ${perUnit}`, mol(n), `${perUnit} × ${fx219(n)} = ${mol(atoms)}`, countSci219(atoms)]),
};
export const countSection219: GuideSection = {
  title: "Birimdeki atom sayısıyla toplam atomu hesapla",
  paragraphs: [
    `Tablonun her satırında önce bir molekülü ya da formül birimini aç, sonra örnek miktarıyla çarp. ${ethanol.f.formula} yazımında H iki yerde geçer: ${partsText(ethanol.f)} = ${ethanol.perUnit} atom. ${fx219(ethanol.n)} mol ${ethanol.f.formula}, ${mol(ethanol.atoms)} atom içerir. Tane sayısına geçmek için Nₐ ≈ ${NA_TEXT219} ile çarp: ${countSci219(ethanol.atoms)} atom.`,
    `Farklı mol miktarları aynı atom toplamını verebilir. ${oneMolAtoms.map(({ f, n, perUnit }) => `${mol(n)} ${f.formula} (${perUnit} atomlu)`).join(", ")} örneklerinin her biri 1 mol atom, yani ${countSci219(ONE)} atom içerir. Birimdeki atom sayısı büyüdükçe aynı toplam için gereken mol küçülür.`,
    `${mgcl2.f.formula} ve ${na2co3.f.formula} iyonik katılardır; atomlar bileşimi anlatır, serbest nötr atom bulunduğu anlamına gelmez. Bir ${mgcl2.f.formula} birimi 1 Mg²⁺ ve 2 Cl⁻, toplam ${mgcl2.ions} iyon; bir ${na2co3.f.formula} birimi 2 Na⁺ ve 1 CO₃²⁻, toplam ${na2co3.ions} iyon içerir. CO₃²⁻ dört atomlu tek bir iyon olduğu için ${na2co3.f.formula}’te iyon sayısı (${na2co3.ions}) atom sayısından (${na2co3.perUnit}) küçüktür.`,
  ],
  table: countTable,
};

/* Örnek 1: aynı atom toplamı, farklı H sayısı. */
const fH2O = byFormula(countRows219, "H₂O").f;
const fCH4 = byFormula(countRows219, "CH₄").f;
const hOf = (f: Formula219) => f.parts.find(([el]) => el === "H")![1];
export const countExampleA219 = (() => {
  const nH2O = q219("0.3");
  const atoms = mul219(nH2O, q219(atomsPerUnit219(fH2O)));
  const nCH4 = div219(atoms, q219(atomsPerUnit219(fCH4)));
  return { nH2O, atoms, nCH4, hH2O: mul219(nH2O, q219(hOf(fH2O))), hCH4: mul219(nCH4, q219(hOf(fCH4))) };
})();
guard(!eq219(countExampleA219.hH2O, countExampleA219.hCH4), "eşit atom toplamında H sayıları farklı olmalı");
/* Örnek 2: H atomu sayısından geriye. */
export const countExampleB219 = (() => {
  const hCount = q219("24.08"); // × 10²³
  const hMol = div219(hCount, NA219);
  const nCH4 = div219(hMol, q219(hOf(fCH4)));
  const total = mul219(nCH4, q219(atomsPerUnit219(fCH4)));
  return { hCount, hMol, nCH4, cMol: nCH4, total };
})();
guard(eq219(countExampleB219.nCH4, ONE), "geri sayım örneği tam 1 mol CH₄ vermeli");
const cA = countExampleA219;
const cB = countExampleB219;
export const countExamples219: WorkedExample[] = [
  {
    title: "Eşit atom toplamı, farklı hidrojen sayısı",
    prompt: `${mol(cA.nH2O)} H₂O molekülü ile aynı sayıda toplam atom içeren CH₄ örneği kaç moldür? İki örnekteki H atomu miktarlarını karşılaştırın.`,
    strategy: "Önce H₂O örneğindeki toplam atom miktarını bul. Bunu bir CH₄ molekülündeki atom sayısına bölerek CH₄ molünü hesapla. Son adımda H atomlarını her örnek için kendi alt indisiyle say.",
    steps: [
      { label: "H₂O atomları", expression: `${atomsPerUnit219(fH2O)} × ${fx219(cA.nH2O)} = ${mol(cA.atoms)} atom`, explanation: "Bir H₂O molekülünde 2 H ve 1 O, toplam 3 atom vardır." },
      { label: "CH₄ miktarı", expression: `${fx219(cA.atoms)} ÷ ${atomsPerUnit219(fCH4)} = ${mol(cA.nCH4)} CH₄`, explanation: "Bir CH₄ molekülünde 1 C ve 4 H, toplam 5 atom vardır." },
      { label: "H atomları", expression: `H₂O: ${hOf(fH2O)} × ${fx219(cA.nH2O)} = ${mol(cA.hH2O)}; CH₄: ${hOf(fCH4)} × ${fx219(cA.nCH4)} = ${mol(cA.hCH4)}`, explanation: "Toplam atomlar eşit olsa da hedef atomun payı formüle göre değişir." },
    ],
    answer: `${mol(cA.nCH4)} CH₄. H atomları eşit değildir: H₂O’da ${mol(cA.hH2O)}, CH₄’te ${mol(cA.hCH4)} H atomu vardır.`,
    check: `${fx219(cA.nCH4)} × ${atomsPerUnit219(fCH4)} = ${fx219(cA.atoms)} mol atom; H₂O ile aynı toplam.`,
    pitfall: "Eşit toplam atomdan eşit molekül sayısı ya da eşit H sayısı çıkarmak.",
  },
  {
    title: "Hidrojen atomu sayısından geriye say",
    prompt: `Saf bir CH₄ örneğinde ${sci219(cB.hCount, NA_EXP219, 3, false)} H atomu var. Nₐ = ${NA_TEXT219}. Örnekte kaç mol CH₄ molekülü, kaç C atomu ve toplam kaç atom vardır?`,
    strategy: "Tane sayısını Nₐ’ya bölerek H atomlarının molünü bul. Her CH₄ molekülünde 4 H olduğundan molekül miktarı bunun dörtte biridir.",
    steps: [
      { label: "H atomu miktarı", expression: `${sci219(cB.hCount, NA_EXP219, 3, false)} ÷ ${sci219(NA219, NA_EXP219)} = ${mol(cB.hMol)} H`, explanation: "10²³ çarpanları sadeleşir; kalan bölme mol verir." },
      { label: "CH₄ miktarı", expression: `${fx219(cB.hMol)} ÷ 4 = ${mol(cB.nCH4)} CH₄`, explanation: "Her molekül dört H atomu taşır." },
      { label: "C ve toplam", expression: `C: ${mol(cB.cMol)} = ${countSci219(cB.cMol)} atom; toplam: 5 × ${fx219(cB.nCH4)} = ${mol(cB.total)} = ${countSci219(cB.total)} atom`, explanation: "Her molekülde bir C ve toplam beş atom vardır." },
    ],
    answer: `${mol(cB.nCH4)} CH₄; ${countSci219(cB.cMol)} C atomu; toplam ${countSci219(cB.total)} atom.`,
    check: `${fx219(cB.nCH4)} mol × 4 × ${sci219(NA219, NA_EXP219)} = ${sci219(cB.hCount, NA_EXP219, 3, false)} H atomu.`,
    pitfall: "H atomu sayısını doğrudan CH₄ molekülü sayısı almak; bu, molekül sayısını dört kat büyütür.",
  },
];
export const countSupplement219 = {
  title: countSection219.title,
  figureTitle: countSection219.title,
  paragraphs: countSection219.paragraphs,
  summary: `Toplam atom (mol) = birimdeki atom sayısı × örnek molü; tane = × Nₐ (${sci219(NA219, NA_EXP219)}). ${fx219(ethanol.n)} mol ${ethanol.f.formula}: ${ethanol.perUnit} × ${fx219(ethanol.n)} = ${mol(ethanol.atoms)} atom. ${oneMolAtoms.map(({ f, n }) => `${fx219(n)} mol ${f.formula}`).join(", ")} → her biri 1 mol atom. ${na2co3.f.formula}: ${na2co3.perUnit} atom ama ${na2co3.ions} iyon.`,
  appendSection: true as const,
  table: countTable,
  examples: countExamples219,
};

/* ======================================================================
 * 3 · atom-kutlesi-hesaplari: gerçek izotop verisiyle ortalama
 * ==================================================================== */

/*
 * İzotop kütleleri (u) ve atomca bolluklar (%): NIST, "Atomic Weights and
 * Isotopic Compositions for All Elements" (kütleler AME, bolluklar IUPAC
 * en iyi ölçüm değerleri). Tablo yalnız kararlı, doğal izotopları kullanır.
 */
export const ISOTOPES219 = {
  Li: [{ a: 6, mass: "6.0151228874", pct: "7.59" }, { a: 7, mass: "7.0160034366", pct: "92.41" }],
  B: [{ a: 10, mass: "10.01293695", pct: "19.9" }, { a: 11, mass: "11.00930536", pct: "80.1" }],
  Mg: [{ a: 24, mass: "23.985041697", pct: "78.99" }, { a: 25, mass: "24.985836976", pct: "10.00" }, { a: 26, mass: "25.982592968", pct: "11.01" }],
  Cl: [{ a: 35, mass: "34.968852682", pct: "75.76" }, { a: 37, mass: "36.965902602", pct: "24.24" }],
  Cu: [{ a: 63, mass: "62.929597713", pct: "69.15" }, { a: 65, mass: "64.927789700", pct: "30.85" }],
  Br: [{ a: 79, mass: "78.9183376", pct: "50.69" }, { a: 81, mass: "80.9162897", pct: "49.31" }],
} as const;
export type IsoEl219 = keyof typeof ISOTOPES219;
export const ISO_NAMES219: Record<IsoEl219, string> = { Li: "Lityum", B: "Bor", Mg: "Magnezyum", Cl: "Klor", Cu: "Bakır", Br: "Brom" };
export interface IsoRow219 {
  el: IsoEl219;
  isotopes: readonly { a: number; mass: Q219; frac: Q219; pct: Q219 }[];
  byA: Q219;
  byMass: Q219;
  school: Q219;
}
const HUNDRED = q219(100);
export const isoRows219: readonly IsoRow219[] = (Object.keys(ISOTOPES219) as IsoEl219[]).map((el) => {
  const isotopes = (ISOTOPES219[el] as readonly { a: number; mass: string; pct: string }[]).map(({ a, mass, pct }) => ({ a, mass: q219(mass), pct: q219(pct), frac: div219(q219(pct), HUNDRED) }));
  return {
    el,
    isotopes,
    byA: sum219(isotopes.map(({ a, frac }) => mul219(q219(a), frac))),
    byMass: sum219(isotopes.map(({ mass, frac }) => mul219(mass, frac))),
    school: ar219(el),
  };
});
/** Kütle numarasıyla yapılan hesabın izotop kütleli hesaptan en büyük sapma sınırı (u). */
export const ISO_A_TOL219 = q219("0.1");
const maxDiffA = isoRows219.reduce((m, r) => Math.max(m, Math.abs(num219(sub219(r.byA, r.byMass)))), 0);
{
  for (const r of isoRows219) {
    guard(eq219(sum219(r.isotopes.map(({ pct }) => pct)), HUNDRED), `${r.el} bollukları toplamı %100 olmalı`);
    const masses = r.isotopes.map(({ mass }) => mass);
    guard(cmp219(r.byMass, masses[0]) > 0 && cmp219(r.byMass, masses.at(-1)!) < 0, `${r.el} ortalaması uç kütlelerin arasında olmalı`);
    const most = r.isotopes.reduce((a, b) => (cmp219(b.frac, a.frac) > 0 ? b : a));
    const nearest = r.isotopes.reduce((a, b) => (cmp219(abs(sub219(b.mass, r.byMass)), abs(sub219(a.mass, r.byMass))) < 0 ? b : a));
    guard(most === nearest, `${r.el} ortalaması en bol izotopun kütlesine en yakın olmalı`);
    guard(Math.abs(num219(r.byMass) - IUPAC_AR219[r.el]) < 0.01, `${r.el} izotop ortalaması IUPAC değeriyle uyuşmalı`);
    guard(Math.abs(num219(sub219(r.school, r.byMass))) <= 0.5, `${r.el} okul değeri en çok 0,5 farklı olmalı`);
  }
  guard(maxDiffA < num219(ISO_A_TOL219), "kütle numarasıyla ortalama 0,1 u’dan az sapmalı");
}
const isoName = (el: IsoEl219, a: number) => `${sup219(a)}${el}`;
const isoTable = {
  layout: "table" as const,
  headers: ["Element", "İzotoplar: atomca bolluk", "Σ A × kesir (kütle numarasıyla)", "Σ m × kesir (izotop kütleleriyle)", "Okul hesabı değeri"],
  rows: isoRows219.map(({ el, isotopes, byA, byMass, school }) => [
    `${ISO_NAMES219[el]} (${el})`,
    isotopes.map(({ a, pct }) => `${isoName(el, a)} %${fx219(pct)}`).join(" · "),
    `${fx219(byA, 2, true)} u`,
    `${fx219(byMass, 2, true)} u`,
    fx219(school),
  ]),
};
const cl = isoRows219.find(({ el }) => el === "Cl")!;
const cu = isoRows219.find(({ el }) => el === "Cu")!;
const mg = isoRows219.find(({ el }) => el === "Mg")!;
const biggestA = isoRows219.reduce((a, b) => (Math.abs(num219(sub219(b.byA, b.byMass))) > Math.abs(num219(sub219(a.byA, a.byMass))) ? b : a));
const farthestSchool = isoRows219.reduce((a, b) => (Math.abs(num219(sub219(b.school, b.byMass))) > Math.abs(num219(sub219(a.school, a.byMass))) ? b : a));
const isoTerm = (el: IsoEl219, i: number, field: "a" | "mass") => {
  const iso = isoRows219.find((r) => r.el === el)!.isotopes[i];
  return `${field === "a" ? iso.a : fx219(iso.mass, 3)} × ${fx219(iso.frac, 4)}`;
};
export const isoSection219: GuideSection = {
  title: "Gerçek izotop verisiyle ortalama atom kütlesini hesapla",
  paragraphs: [
    `Tablodaki izotop kütleleri (u) ve atomca bolluklar (%) NIST’in (ABD Ulusal Standartlar ve Teknoloji Enstitüsü) atom kütleleri ve izotop bileşimleri çizelgesinden alınmıştır. Her satırda yüzdeyi kesre çevir, her izotopun kütlesini kesriyle çarp ve topla. Klor için ${isoTerm("Cl", 0, "mass")} + ${isoTerm("Cl", 1, "mass")} ≈ ${fx219(cl.byMass)} u bulunur. Kütle numaralarıyla aynı işlem ${isoTerm("Cl", 0, "a")} + ${isoTerm("Cl", 1, "a")} = ${fx219(cl.byA, 4)} u verir.`,
    `Kütle numarasıyla yapılan hesap yaklaşıktır; altı satırda da fark ${fx219(ISO_A_TOL219)} u’dan küçüktür. En büyük fark ${ISO_NAMES219[biggestA.el].toLocaleLowerCase("tr-TR")} satırındadır: ${fx219(biggestA.byA, 2, true)} ile ${fx219(biggestA.byMass, 2, true)} u. Her ortalama en hafif ve en ağır izotopun arasında kalır ve en bol izotopun kütlesine en yakındır. Magnezyumun üç izotopu olduğu için üç terim toplanır: ${fx219(mg.byMass)} u.`,
    `Son sütun okul hesaplarında kullanılan yuvarlatılmış değerdir. Hepsi izotop ortalamasından en çok 0,5 farklıdır. En büyük fark ${ISO_NAMES219[farthestSchool.el].toLocaleLowerCase("tr-TR")} için ${fx219(farthestSchool.school)} ile ${fx219(farthestSchool.byMass)} arasındadır. Klorun ${fx219(cl.school)} değeri tam sayı değildir; soruda verilen değeri kullan ve yuvarlamayı soruya göre seç.`,
  ],
  table: isoTable,
};

/* Örnek 1: üç izotoplu Mg, kütle numarasıyla (ders bollukları tam sayı %). */
export const isoExampleA219 = (() => {
  const pcts = [79, 10, 11];
  const isotopes = mg.isotopes.map(({ a }, i) => ({ a, frac: div219(q219(pcts[i]), HUNDRED) }));
  const terms = isotopes.map(({ a, frac }) => mul219(q219(a), frac));
  return { isotopes, pcts, terms, avg: sum219(terms) };
})();
guard(isoExampleA219.pcts.reduce((s, x) => s + x, 0) === 100, "Mg örneğinin bollukları %100 olmalı");
guard(isoExampleA219.pcts.every((p, i) => Math.abs(p - num219(mg.isotopes[i].pct)) < 0.5), "Mg örneğinin yüzdeleri NIST değerlerinin yuvarlanmışı olmalı");
/* Örnek 2: Cu’da ortalamadan bolluğa ters git (2 basamağa yuvarlanmış veri). */
export const isoExampleB219 = (() => {
  const round2 = (x: Q219) => q219(fx219(x, 2, true).replace(",", "."));
  const m63 = round2(cu.isotopes[0].mass);
  const m65 = round2(cu.isotopes[1].mass);
  const avg = round2(cu.byMass);
  const x = div219(sub219(avg, m63), sub219(m65, m63));
  return { m63, m65, avg, x, light: sub219(ONE, x) };
})();
guard(Math.abs(num219(isoExampleB219.x) - num219(cu.isotopes[1].frac)) < 0.005, "Cu ters hesabı NIST bolluğuna yakın çıkmalı");
const iA = isoExampleA219;
const iB = isoExampleB219;
export const isoExamples219: WorkedExample[] = [
  {
    title: "Üç izotoplu elementte ağırlıklı ortalama",
    prompt: `Magnezyumun doğal örneğinde ${iA.isotopes.map(({ a }, i) => `${isoName("Mg", a)} %${iA.pcts[i]}`).join(", ")} atomca bollukla bulunsun. Her izotopun kütlesini kütle numarasına eşit kabul ederek ortalama atom kütlesini bulun. Sonuç hangi izotopa en yakındır?`,
    strategy: "Üç yüzdeyi kesre çevir, her kütle numarasını kendi kesriyle çarp ve üç katkıyı topla.",
    steps: [
      ...iA.isotopes.map(({ a, frac }, i) => ({ label: `${isoName("Mg", a)} katkısı`, expression: `${a} × ${fx219(frac)} = ${fx219(iA.terms[i])} u`, explanation: i === 0 ? "En bol izotop en büyük katkıyı verir." : "Az bulunan izotopun katkısı küçüktür." })),
      { label: "Toplam", expression: `${iA.terms.map((t) => fx219(t)).join(" + ")} = ${fx219(iA.avg)} u`, explanation: "Katkıları topla; kesirlerin toplamı 1 olduğu için ayrıca bölme yok." },
    ],
    answer: `${fx219(iA.avg)} u; en bol izotop olan ${isoName("Mg", 24)} kütlesine (24 u) en yakındır.`,
    check: `Sonuç 24 ile 26 arasında. Düz ortalama (24 + 25 + 26)/3 = 25 olurdu; bolluklar eşit olmadığı için ${fx219(iA.avg)} çıkar. Gerçek izotop kütleleriyle değer ${fx219(mg.byMass)} u’dur.`,
    pitfall: "Yüzdeleri kesre çevirmeden çarpıp sonucu 100 ile bölmeyi unutmak ya da üç izotopun düz ortalamasını almak.",
  },
  {
    title: "Ortalamadan ağır izotopun bolluğuna",
    prompt: `Bakırın iki kararlı izotopu ${isoName("Cu", 63)} (${fx219(iB.m63)} u) ve ${isoName("Cu", 65)} (${fx219(iB.m65)} u) olsun. Doğal bakırın ortalama atom kütlesi ${fx219(iB.avg)} u ise ${isoName("Cu", 65)} izotopunun atomca bolluğu yüzde kaçtır?`,
    strategy: `Ağır izotopun kesrini x seç; hafif izotopun kesri 1 − x olur. Ağırlıklı ortalama denklemini kur.`,
    steps: [
      { label: "Denklem", expression: `${fx219(iB.m63)}(1 − x) + ${fx219(iB.m65)}x = ${fx219(iB.avg)}`, explanation: "Kesirlerin toplamı 1’dir." },
      { label: "Sadeleştir", expression: `${fx219(iB.m63)} + ${fx219(sub219(iB.m65, iB.m63))}x = ${fx219(iB.avg)} → ${fx219(sub219(iB.m65, iB.m63))}x = ${fx219(sub219(iB.avg, iB.m63))}`, explanation: "Hafif kütleyi iki yandan çıkar." },
      { label: "Çöz", expression: `x = ${fx219(iB.x)} → %${fx219(mul219(iB.x, HUNDRED))}`, explanation: `${isoName("Cu", 63)} bolluğu %${fx219(mul219(iB.light, HUNDRED))} olur.` },
    ],
    answer: `${isoName("Cu", 65)} %${fx219(mul219(iB.x, HUNDRED))}, ${isoName("Cu", 63)} %${fx219(mul219(iB.light, HUNDRED))}.`,
    check: `${fx219(iB.m63)} × ${fx219(iB.light)} + ${fx219(iB.m65)} × ${fx219(iB.x)} = ${fx219(add219(mul219(iB.m63, iB.light), mul219(iB.m65, iB.x)))} u. Ortalama hafif izotopa yakın olduğu için hafif izotop daha boldur.`,
    pitfall: `Ortalamayı 63 ile 65’in tam ortası (64) ile karşılaştırıp bollukları eşit sanmak ya da x’i hafif izotop için tanımlayıp cevabı karıştırmak.`,
  },
];
export const isoSupplement219 = {
  title: isoSection219.title,
  figureTitle: isoSection219.title,
  paragraphs: isoSection219.paragraphs,
  summary: `Ortalama = Σ (izotop kütlesi × atomca kesir). NIST verisiyle ${isoRows219.map(({ el, byMass }) => `${el} ${fx219(byMass, 2, true)}`).join(", ")} u. Kütle numarasıyla hesap ${fx219(ISO_A_TOL219)} u’dan az sapar (Cl: ${fx219(cl.byA)}). Ortalama uçların arasında ve en bol izotopa en yakın. Okul değerleri en çok 0,5 yuvarlanmıştır (Cu ${fx219(cu.school)}).`,
  appendSection: true as const,
  table: isoTable,
  examples: isoExamples219,
};

/* ======================================================================
 * 4 · gercek-kutle-akb-nk: tek taneciğin gerçek kütlesi ve 1 g’daki sayı
 * ==================================================================== */

export interface RealRow219 { f: Formula219; M: Q219; single: { m: Q219; e: number }; perGram: { m: Q219; e: number }; viaU: { m: Q219; e: number } }
/** M/Nₐ = (M/6,02) × 10⁻²³ g; Nₐ/M = (6,02/M) × 10²³; u yolu = M × 1,6605 × 10⁻²⁴ g. */
const realRow = (f: Formula219): RealRow219 => {
  const M = molar219(f);
  return {
    f,
    M,
    single: norm219(div219(M, NA219), -NA_EXP219, 2),
    perGram: norm219(div219(NA219, M), NA_EXP219, 2),
    viaU: norm219(mul219(M, U219), U_EXP219, 2),
  };
};
export const realRows219: readonly RealRow219[] = [
  realRow(F("H", "atom", ["H", 1])),
  realRow(F("He", "atom", ["He", 1])),
  realRow(F("C", "atom", ["C", 1])),
  realRow(F("O", "atom", ["O", 1])),
  realRow(F("H₂O", "molekül", ["H", 2], ["O", 1])),
  realRow(F("O₂", "molekül", ["O", 2])),
  realRow(F("CO₂", "molekül", ["C", 1], ["O", 2])),
  realRow(F("Fe", "atom", ["Fe", 1])),
];
const sciOf = ({ m, e }: { m: Q219; e: number }) => `${fx219(m, 2, true)} × 10${sup219(e)}`;
const value = ({ m, e }: { m: Q219; e: number }) => num219(m) * 10 ** e;
const uMismatch = realRows219.filter((r) => sciOf(r.single) !== sciOf(r.viaU));
const relDiff = (r: RealRow219) => Math.abs(value(r.single) / value(r.viaU) - 1);
{
  guard(realRows219.every((r, i, all) => i === 0 || cmp219(r.M, all[i - 1].M) > 0), "satırlar M’ye göre artan sırada olmalı");
  guard(realRows219.every((r, i, all) => i === 0 || (value(r.single) > value(all[i - 1].single) && value(r.perGram) < value(all[i - 1].perGram))), "tek tanecik kütlesi M ile artmalı, 1 g’daki sayı azalmalı");
  guard(realRows219.every((r) => relDiff(r) < 0.001), "Nₐ ve u yolları binde birden az farklı olmalı");
  guard(uMismatch.length > 0 && uMismatch.every((r) => Math.abs(num219(r.single.m) - num219(r.viaU.m)) <= 0.0100001), "farklı çıkan satırlar yalnız son basamakta ayrılmalı");
  guard(realRows219.every((r) => r.single.e < 0 && r.perGram.e > 0), "tek tanecik kütlesi negatif, 1 g’daki sayı pozitif üslü olmalı");
}
export const unitWord219 = (f: Formula219) => `${f.formula} ${f.unit === "atom" ? "atomu" : "molekülü"}`;
const realTable = {
  layout: "table" as const,
  headers: ["Tanecik", "Kütlesi (u)", "M (g/mol)", "Bir taneciğin kütlesi M/Nₐ (g)", "1 g’daki tanecik Nₐ/M"],
  rows: realRows219.map(({ f, M, single, perGram }) => [unitWord219(f), fx219(M), fx219(M), sciOf(single), sciOf(perGram)]),
};
const h = realRows219[0];
const fe = realRows219.at(-1)!;
const o2 = realRows219.find(({ f }) => f.formula === "O₂")!;
export const realSection219: GuideSection = {
  title: "Bir taneciğin gramını ve bir gramdaki tanecik sayısını karşılaştır",
  paragraphs: [
    `Tablodaki kütle (u) ile M (g/mol) sayıca aynıdır ama biri tek taneciğe, öteki bir mol taneciğe aittir. Tek taneciğin gram kütlesi M/Nₐ ile bulunur; Nₐ ≈ ${NA_TEXT219} alınmıştır. ${unitWord219(h.f)} ${sciOf(h.single)} g, ${unitWord219(fe.f)} ${sciOf(fe.single)} g gelir. Üssün eksi olması, sonucun gramın çok küçük bir kesri olduğunu gösterir.`,
    `Son sütun ters soruyu yanıtlar: 1 g maddede kaç tanecik var? Bu sayı Nₐ/M’dir ve M büyüdükçe küçülür. 1 g hidrojen atomu ${sciOf(h.perGram)}, 1 g demir ise ${sciOf(fe.perGram)} atom içerir. Aynı satırdaki iki değerin çarpımı her zaman 1 g’dır.`,
    `Aynı kütle u yolundan da bulunur: kütle (u) × 1 u. Ders 1 u = ${sci219(U219, U_EXP219, 4)} g yazar. ${unitWord219(o2.f)} için ${fx219(o2.M)} × ${sci219(U219, U_EXP219, 4)} = ${sciOf(o2.viaU)} g çıkar; Nₐ yolu ${sciOf(o2.single)} g verir. 6,02 yuvarlanmış bir değer olduğundan iki yol en çok binde bir farklıdır; ${uMismatch.map(({ f }) => f.formula).join(", ")} satırında son basamak bir birim ayrılır.`,
  ],
  table: realTable,
};

/* Örnek 1: tek molekül kütlesinden u ve formül. */
const fCO = F("CO", "molekül", ["C", 1], ["O", 1]);
const candidates = [fCO, o2.f, realRows219.find(({ f }) => f.formula === "CO₂")!.f];
export const realExampleA219 = (() => {
  const target = candidates[2];
  const mass = mul219(molar219(target), U219); // × 10⁻²⁴ g
  const u = div219(mass, U219);
  const match = candidates.filter((f) => eq219(molar219(f), u));
  return { mass, u, match };
})();
guard(realExampleA219.match.length === 1, "u değeri tek adaya uymalı");
/* Örnek 2: bir damla su. */
export const realExampleB219 = (() => {
  const f = realRows219.find(({ f }) => f.formula === "H₂O")!.f;
  const m = q219("0.036");
  const n = div219(m, molar219(f));
  const molecules = mul219(n, NA219); // × 10²³
  const atoms = mul219(molecules, q219(atomsPerUnit219(f)));
  const back = mul219(molecules, div219(molar219(f), NA219)); // tek molekül × sayı, 10²³ ve 10⁻²³ sadeleşir
  return { f, m, n, molecules, atoms, back };
})();
guard(eq219(realExampleB219.back, realExampleB219.m), "damla örneği kütleye geri dönmeli");
const rA = realExampleA219;
const rB = realExampleB219;
const sciQ = (x: Q219, exp: number, digits = 4) => sci219(x, exp, digits, false);
export const realExamples219: WorkedExample[] = [
  {
    title: "Tek molekülün gramından formülü seç",
    prompt: `Bir gaz molekülünün kütlesi ${sciQ(rA.mass, U_EXP219)} g ölçülüyor. 1 u = ${sci219(U219, U_EXP219, 4)} g, C = 12, O = 16. Molekülün kütlesi kaç u’dur? Gaz ${candidates.map(({ formula }) => formula).join(", ")} seçeneklerinden hangisi olabilir?`,
    strategy: "Tek taneciğin gram kütlesini 1 u’nun gram değerine bölerek u’ya geç. Sonra adayların formül kütlelerini hesapla ve karşılaştır.",
    steps: [
      { label: "u’ya çevir", expression: `${sciQ(rA.mass, U_EXP219)} ÷ ${sci219(U219, U_EXP219, 4)} = ${fx219(rA.u)} u`, explanation: "10⁻²⁴ çarpanları sadeleşir." },
      { label: "Adaylar", expression: candidates.map((f) => `${f.formula}: ${fx219(molar219(f))} u`).join("; "), explanation: "Her adayın kütlesi formüldeki atom kütlelerinin toplamıdır." },
      { label: "Eşleştir", expression: `${fx219(rA.u)} u = ${rA.match[0].formula}`, explanation: "Yalnız bir aday aynı kütleyi verir." },
    ],
    answer: `${fx219(rA.u)} u; gaz ${rA.match[0].formula} olabilir.`,
    check: `${fx219(rA.u)} × ${sci219(U219, U_EXP219, 4)} = ${sciQ(rA.mass, U_EXP219)} g. Aynı molekülün bir molü ${fx219(rA.u)} g’dır.`,
    pitfall: "Tek molekülün kütlesini Nₐ ile çarpıp u diye yazmak; Nₐ ile çarpmak bir molün gram kütlesine geçer.",
  },
  {
    title: "Bir damla suda molekül ve atom say",
    prompt: `Bir su damlasının kütlesi ${g(rB.m)} olsun ve yalnız saf H₂O içersin. H = 1, O = 16, Nₐ = ${NA_TEXT219}. Damlada kaç H₂O molekülü ve toplam kaç atom vardır? Bir molekülün kütlesi yaklaşık kaç gramdır?`,
    strategy: "Kütleyi M’ye bölüp mol bul, Nₐ ile çarpıp molekül sayısına geç. Atom sayısı için molekül başına üç atomu kullan. Tek molekül kütlesi M/Nₐ’dır.",
    steps: [
      { label: "Mol", expression: `n = ${fx219(rB.m, 4)} ÷ ${fx219(molar219(rB.f))} = ${fx219(rB.n, 4)} mol`, explanation: `M(H₂O) = ${molarText219(rB.f)}.` },
      { label: "Molekül", expression: `${fx219(rB.n, 4)} × ${sci219(NA219, NA_EXP219)} = ${sciQ(rB.molecules, NA_EXP219)}`, explanation: "Mol × Nₐ tanecik sayısını verir." },
      { label: "Atom", expression: `3 × ${sciQ(rB.molecules, NA_EXP219)} = ${sciQ(rB.atoms, NA_EXP219)}`, explanation: "Her molekülde 2 H ve 1 O vardır." },
      { label: "Tek molekül", expression: `${fx219(molar219(rB.f))} ÷ ${sci219(NA219, NA_EXP219)} ≈ ${sciOf(realRows219.find(({ f }) => f.formula === "H₂O")!.single)} g`, explanation: "Tablodaki H₂O satırıyla aynıdır." },
    ],
    answer: `${sciQ(rB.molecules, NA_EXP219)} H₂O molekülü, ${sciQ(rB.atoms, NA_EXP219)} atom; bir molekül yaklaşık ${sciOf(realRows219.find(({ f }) => f.formula === "H₂O")!.single)} g.`,
    check: `${sciQ(rB.molecules, NA_EXP219)} × (${fx219(molar219(rB.f))} ÷ ${sci219(NA219, NA_EXP219)}) g = ${g(rB.back)}; damlanın kütlesine dönülür.`,
    pitfall: "Molekül sayısını atom sayısı yerine yazmak ya da 10²³ ile çarparken üssü eksi almak.",
  },
];
export const realSupplement219 = {
  title: realSection219.title,
  figureTitle: realSection219.title,
  paragraphs: realSection219.paragraphs,
  summary: `Tek tanecik (g) = M/Nₐ; 1 g’daki tanecik = Nₐ/M; Nₐ ≈ ${sci219(NA219, NA_EXP219)}. H atomu ${sciOf(h.single)} g, H₂O ${sciOf(realRows219.find(({ f }) => f.formula === "H₂O")!.single)} g, Fe ${sciOf(fe.single)} g. 1 g H: ${sciOf(h.perGram)} atom. u yolu: kütle (u) × ${sci219(U219, U_EXP219, 4)} g, en çok binde bir fark.`,
  appendSection: true as const,
  table: realTable,
  examples: realExamples219,
};

/* ======================================================================
 * 5 · kutle-korunumu-sabit-oran: MgO’da 3:2 ve artan madde
 * ==================================================================== */

const fMgO = F("MgO", "formül birimi", ["Mg", 1], ["O", 1]);
/** MgO’da kütlece Mg : O = 24 : 16, sadeleşmiş oran. */
export const MGO_RATIO219 = (() => {
  const mg = ar219("Mg");
  const o = ar219("O");
  const r = div219(mg, o);
  return { mg, o, r, a: Number(r.n), b: Number(r.d) };
})();
guard(MGO_RATIO219.a === 3 && MGO_RATIO219.b === 2, "Mg : O = 24 : 16 = 3 : 2 olmalı");
export interface MgORow219 { mg0: Q219; o0: Q219; usedMg: Q219; usedO: Q219; mgo: Q219; leftMg: Q219; leftO: Q219; after: Q219 }
/** Sabit oranla birleşme: sınırlayan bitene kadar 3:2 oranında tüketilir. */
export const combine219 = (mg0: Q219, o0: Q219): MgORow219 => {
  const { r } = MGO_RATIO219;
  const usedMg = min219(mg0, mul219(o0, r));
  const usedO = div219(usedMg, r);
  const mgo = add219(usedMg, usedO);
  const leftMg = sub219(mg0, usedMg);
  const leftO = sub219(o0, usedO);
  return { mg0, o0, usedMg, usedO, mgo, leftMg, leftO, after: add219(mgo, add219(leftMg, leftO)) };
};
export const mgoRows219: readonly MgORow219[] = ([["6", "4"], ["6", "6"], ["12", "4"], ["9", "9"], ["15", "8"], ["4.8", "4"]] as const).map(([a, b]) => combine219(q219(a), q219(b)));
export const leftText219 = (r: MgORow219) =>
  cmp219(r.leftMg, ZERO) > 0 ? `${g(r.leftMg)} Mg` : cmp219(r.leftO, ZERO) > 0 ? `${g(r.leftO)} O` : "Artan yok";
{
  for (const r of mgoRows219) {
    guard(eq219(r.after, add219(r.mg0, r.o0)), "kapalı sistemde son kütle ilk kütleye eşit olmalı");
    guard(eq219(div219(r.usedMg, r.usedO), MGO_RATIO219.r), "tüketilen kütleler 3:2 olmalı");
    guard(eq219(r.leftMg, ZERO) || eq219(r.leftO, ZERO), "en çok bir madde artmalı");
    const start = div219(r.mg0, r.o0);
    const c = cmp219(start, MGO_RATIO219.r);
    guard(c > 0 ? cmp219(r.leftMg, ZERO) > 0 : c < 0 ? cmp219(r.leftO, ZERO) > 0 : eq219(r.leftMg, ZERO) && eq219(r.leftO, ZERO), "başlangıç oranı 3/2’den büyükse Mg, küçükse O artmalı");
  }
  guard(mgoRows219.filter((r) => eq219(r.leftMg, ZERO) && eq219(r.leftO, ZERO)).length === 1 && eq219(mgoRows219[0].leftO, ZERO) && eq219(mgoRows219[0].leftMg, ZERO), "yalnız ilk satırda artan olmamalı");
  guard(eq219(mgoRows219[0].mgo, mgoRows219[1].mgo) && eq219(mgoRows219[1].mgo, mgoRows219[2].mgo), "ilk üç satır aynı MgO kütlesini vermeli");
}
const mgoTable = {
  layout: "table" as const,
  headers: ["Başlangıç Mg", "Başlangıç O", "Oluşan MgO", "Artan madde", "Son toplam = ilk toplam"],
  rows: mgoRows219.map((r) => [g(r.mg0), g(r.o0), `${fx219(r.usedMg)} + ${fx219(r.usedO)} = ${g(r.mgo)}`, leftText219(r), `${fx219(r.mgo)} + ${fx219(add219(r.leftMg, r.leftO))} = ${g(r.after)}`]),
};
const [k0, k1, k2] = mgoRows219;
const k4 = mgoRows219[4];
export const mgoSection219: GuideSection = {
  title: "Sabit oranla oluşan ürünü ve artan maddeyi bul",
  paragraphs: [
    `${fMgO.formula}’da Mg = ${fx219(MGO_RATIO219.mg)}, O = ${fx219(MGO_RATIO219.o)} alındığında kütlece Mg : O = ${fx219(MGO_RATIO219.mg)} : ${fx219(MGO_RATIO219.o)} = ${MGO_RATIO219.a} : ${MGO_RATIO219.b} olur. Tabloda kapalı kapta yalnız Mg ile oksijen birleşip ${fMgO.formula} oluşturur. Her satırda önce bir maddenin tamamının yetip yetmediğine bak: ${g(k4.mg0)} Mg için ${g(mul219(k4.mg0, div219(ONE, MGO_RATIO219.r)))} O gerekir, ancak ${g(k4.o0)} vardır. Oksijen biter, ${g(k4.usedMg)} Mg tükenir ve ${g(k4.leftMg)} Mg artar.`,
    `Başlangıç kütle oranı ${MGO_RATIO219.a}/${MGO_RATIO219.b}’den büyükse Mg, küçükse oksijen artar; tam ${MGO_RATIO219.a} : ${MGO_RATIO219.b} ise hiçbir madde artmaz. İlk üç satırda ${g(k0.mg0)} + ${g(k0.o0)}, ${g(k1.mg0)} + ${g(k1.o0)} ve ${g(k2.mg0)} + ${g(k2.o0)} başlangıçlarının hepsi ${g(k0.mgo)} ${fMgO.formula} verir. Fazla konan madde ürünü büyütmez, artan olarak kalır.`,
    `Son sütun kütlenin korunumunu denetler: oluşan ürün ile artan madde toplamı her satırda başlangıç toplamına eşittir. Sabit oran yalnız tüketilen kütlelerden kurulur; ${g(k1.mg0)} Mg ile ${g(k1.o0)} O başlangıcından 1 : 1 oranı çıkarılamaz, çünkü ${g(k1.leftO)} O tepkimeye girmemiştir.`,
  ],
  table: mgoTable,
};

/* Örnek 1: hangisi artar? */
export const mgoExampleA219 = combine219(q219(18), q219(16));
guard(cmp219(mgoExampleA219.leftO, ZERO) > 0, "18 g Mg + 16 g O örneğinde oksijen artmalı");
/* Örnek 2: artan ve toplamdan başlangıca. */
export const mgoExampleB219 = (() => {
  const total = q219(20);
  const leftO = q219(5);
  const mgo = sub219(total, leftO);
  const mgShare = div219(q219(MGO_RATIO219.a), q219(MGO_RATIO219.a + MGO_RATIO219.b));
  const mg0 = mul219(mgo, mgShare);
  const usedO = sub219(mgo, mg0);
  const o0 = add219(usedO, leftO);
  return { total, leftO, mgo, mg0, usedO, o0, check: combine219(mg0, o0) };
})();
guard(eq219(mgoExampleB219.check.leftO, mgoExampleB219.leftO) && eq219(mgoExampleB219.check.mgo, mgoExampleB219.mgo), "ters örnek ileri hesapla doğrulanmalı");
const mA = mgoExampleA219;
const mB = mgoExampleB219;
const ratio = `${MGO_RATIO219.a} : ${MGO_RATIO219.b}`;
export const mgoExamples219: WorkedExample[] = [
  {
    title: "Hangi madde artar, ne kadar ürün oluşur?",
    prompt: `Mg = 24, O = 16. Kapalı bir kapta ${g(mA.mg0)} magnezyum ile ${g(mA.o0)} oksijen, maddelerden biri bitene kadar tepkimeye girip yalnız MgO oluşturuyor. Kaç gram MgO oluşur, hangi maddeden kaç gram artar ve kaptaki son toplam kütle kaç gramdır?`,
    strategy: `Önce MgO’daki kütle oranını bul: Mg : O = 24 : 16 = ${ratio}. Sonra bir maddenin tamamını kullanmak için diğerinden ne kadar gerektiğini hesapla.`,
    steps: [
      { label: "Gereken O", expression: `${fx219(mA.mg0)} × ${MGO_RATIO219.b}/${MGO_RATIO219.a} = ${g(mA.usedO)} O`, explanation: `${g(mA.mg0)} Mg’nin tamamı için gereken oksijen ${g(mA.o0)}’dan azdır; Mg biter.` },
      { label: "Ürün", expression: `${fx219(mA.usedMg)} + ${fx219(mA.usedO)} = ${g(mA.mgo)} MgO`, explanation: "Ürün kütlesi tüketilen kütlelerin toplamıdır." },
      { label: "Artan ve toplam", expression: `${fx219(mA.o0)} − ${fx219(mA.usedO)} = ${g(mA.leftO)} O; ${fx219(mA.mgo)} + ${fx219(mA.leftO)} = ${g(mA.after)}`, explanation: "Kapalı kapta son kütle ilk kütleye eşittir." },
    ],
    answer: `${g(mA.mgo)} MgO oluşur, ${g(mA.leftO)} oksijen artar; son toplam ${g(mA.after)}.`,
    check: `${fx219(mA.usedMg)} : ${fx219(mA.usedO)} = ${ratio} ve ${fx219(mA.mg0)} + ${fx219(mA.o0)} = ${fx219(mA.after)}.`,
    pitfall: `İki başlangıç kütlesini toplayıp ${g(add219(mA.mg0, mA.o0))} MgO yazmak. Artan oksijen ürüne katılmaz.`,
  },
  {
    title: "Artandan başlangıç kütlelerine geri dön",
    prompt: `Mg = 24, O = 16. Kapalı bir kaba toplam ${g(mB.total)} magnezyum ve oksijen konuyor. Yalnız MgO oluşan tepkime bittiğinde ${g(mB.leftO)} oksijen artıyor. Başlangıçta kaç gram Mg ve kaç gram oksijen vardı?`,
    strategy: "Kapalı kapta son toplam da 20 g’dır; artan çıkarılınca oluşan MgO bulunur. Oksijen arttığına göre Mg tamamen tükenmiştir; MgO’yu 3 : 2 oranında paylaştır.",
    steps: [
      { label: "Ürün", expression: `${fx219(mB.total)} − ${fx219(mB.leftO)} = ${g(mB.mgo)} MgO`, explanation: "Kütlenin korunumu: son toplam = ilk toplam." },
      { label: "Paylar", expression: `Mg = ${fx219(mB.mgo)} × ${MGO_RATIO219.a}/${MGO_RATIO219.a + MGO_RATIO219.b} = ${g(mB.mg0)}; O = ${fx219(mB.mgo)} − ${fx219(mB.mg0)} = ${g(mB.usedO)}`, explanation: `MgO’da kütlece ${MGO_RATIO219.a + MGO_RATIO219.b} payın ${MGO_RATIO219.a}’ü Mg’dir.` },
      { label: "Başlangıç O", expression: `${fx219(mB.usedO)} + ${fx219(mB.leftO)} = ${g(mB.o0)}`, explanation: "Tükenen oksijene artanı ekle." },
    ],
    answer: `Başlangıçta ${g(mB.mg0)} Mg ve ${g(mB.o0)} oksijen vardı.`,
    check: `${fx219(mB.mg0)} + ${fx219(mB.o0)} = ${fx219(mB.total)}; ${fx219(mB.mg0)} g Mg ${fx219(mB.usedO)} g O ile ${g(mB.mgo)} MgO verir, ${g(mB.leftO)} O artar.`,
    pitfall: `Başlangıç toplamını ${ratio} oranında paylaştırmak. Oran yalnız tüketilen kütlelere, yani MgO’ya uygulanır.`,
  },
];
export const mgoSupplement219 = {
  title: mgoSection219.title,
  figureTitle: mgoSection219.title,
  paragraphs: mgoSection219.paragraphs,
  summary: `MgO’da Mg : O = 24 : 16 = ${ratio}. Başlangıç oranı ${MGO_RATIO219.a}/${MGO_RATIO219.b}’den büyükse Mg, küçükse O artar. ${g(k0.mg0)} + ${g(k0.o0)}, ${g(k1.mg0)} + ${g(k1.o0)}, ${g(k2.mg0)} + ${g(k2.o0)} → hep ${g(k0.mgo)} MgO. Son toplam = ürün + artan = ilk toplam.`,
  appendSection: true as const,
  table: mgoTable,
  examples: mgoExamples219,
};

export const depth219Supplements = {
  "mol-kutle-iliskisi": [massSupplement219],
  "mol-tanecik-iliskisi": [countSupplement219],
  "atom-kutlesi-hesaplari": [isoSupplement219],
  "gercek-kutle-akb-nk": [realSupplement219],
  "kutle-korunumu-sabit-oran": [mgoSupplement219],
};
