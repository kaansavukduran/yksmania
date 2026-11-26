import type { GuideSection, WorkedExample } from "./guides/types";

/*
 * TYT Kimya asit, baz ve tuz derinleştirmesi (0.216.0). Kabul edilmiş rehber
 * içeriği değişmez; her derse görüntüleme katmanında bir tablo bölümü, iki
 * özgün çözümlü örnek ve bir bölüm çizimi eklenir. Formüller iyon
 * yüklerinden, mol sayıları katsayılardan ve M·V çarpımından kodda hesaplanır.
 * Mol miktarları tam sayı milimol olarak tutulur; ondalık yazım kesin uzun
 * bölmeyle üretilir. Paragraftaki genel yargılar modül yüklenirken veriyle
 * sınanır; veri yargıyı desteklemezse modül hata verir.
 */

const guard = (ok: boolean, claim: string) => {
  if (!ok) throw new Error(`depth216: ${claim}`);
};
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));

/** Kesin ondalık yazım: n/d, Türkçe virgülle; en az minDigits basamak. Sonsuz açılım hata verir. */
export const dec216 = (n: number, d = 1, minDigits = 0) => {
  guard(Number.isInteger(n) && Number.isInteger(d) && d > 0, "ondalık yazım tam sayı oranı ister");
  const sign = n < 0 ? "−" : "";
  let r = Math.abs(n);
  const whole = Math.floor(r / d);
  r %= d;
  let digits = "";
  for (let i = 0; i < 8 && r !== 0; i += 1) { r *= 10; digits += String(Math.floor(r / d)); r %= d; }
  guard(r === 0, `${n}/${d} sonlu ondalık olmalı`);
  digits = digits.padEnd(minDigits, "0");
  return `${sign}${whole}${digits ? `,${digits}` : ""}`;
};
/** Milimolü mol olarak yazar: mol216(150) = "0,15". */
export const mol216 = (mmol: number, minDigits = 2) => (mmol === 0 ? "0" : dec216(mmol, 1000, minDigits));

const SUB: Record<string, string> = { 0: "₀", 1: "₁", 2: "₂", 3: "₃", 4: "₄", 5: "₅", 6: "₆", 7: "₇", 8: "₈", 9: "₉" };
const SUP: Record<string, string> = { 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹" };
export const sub216 = (n: number) => (n === 1 ? "" : [...String(n)].map((c) => SUB[c]).join(""));
/** İyon yükü üst simgesi: +1 → ⁺, −2 → ²⁻. */
export const charge216 = (z: number) => `${Math.abs(z) === 1 ? "" : [...String(Math.abs(z))].map((c) => SUP[c]).join("")}${z > 0 ? "⁺" : "⁻"}`;
const signedCharge = (z: number) => (z > 0 ? `+${z}` : `−${Math.abs(z)}`);
const coef = (n: number) => (n === 1 ? "" : String(n));

/*
 * Ders kitabı yuvarlak atom kütleleri (g/mol). Kaynak: IUPAC standart atom
 * ağırlıkları (H 1,008; C 12,011; O 15,999; Na 22,990; Mg 24,305; Al 26,982;
 * S 32,06; Cl 35,45; K 39,098; Ca 40,078; Zn 65,38), MEB TYT soru
 * kitaplarındaki yuvarlak değerlere çevrilmiştir.
 */
export const atomicMass216 = { H: 1, C: 12, O: 16, Na: 23, Mg: 24, Al: 27, S: 32, Cl: 35.5, K: 39, Ca: 40, Zn: 65 } as const;
export type Element216 = keyof typeof atomicMass216;
export const molarMass216 = (composition: Partial<Record<Element216, number>>) =>
  Object.entries(composition).reduce((s, [el, n]) => s + atomicMass216[el as Element216] * (n ?? 0), 0);

/** NŞA’da (0 °C, 1 atm) ideal gazın molar hacmi, ders kitabı değeri: 22,4 L/mol (ondalıkta 224/10). */
export const molarVolumeTenthsL216 = 224;
/** Milimol gazın NŞA hacmi (L) yazımı. */
export const gasLitres216 = (mmol: number) => dec216(mmol * molarVolumeTenthsL216, 10_000);

/* =====================================================================
 * İyonlar ve yük dengesiyle tuz formülü (iki dersin ortak verisi)
 * ===================================================================== */

export interface Ion216 { symbol: string; z: number; name: string; poly: boolean; metal: boolean }
const ion = (symbol: string, z: number, name: string, poly = false, metal = !poly): Ion216 => ({ symbol, z, name, poly, metal });
export const ions216 = {
  Na: ion("Na", 1, "sodyum"),
  K: ion("K", 1, "potasyum"),
  Mg: ion("Mg", 2, "magnezyum"),
  Ca: ion("Ca", 2, "kalsiyum"),
  Al: ion("Al", 3, "alüminyum"),
  Fe3: ion("Fe", 3, "demir(III)"),
  NH4: ion("NH₄", 1, "amonyum", true, false),
  Cl: ion("Cl", -1, "klorür", false, false),
  NO3: ion("NO₃", -1, "nitrat", true),
  SO4: ion("SO₄", -2, "sülfat", true),
  CO3: ion("CO₃", -2, "karbonat", true),
} as const;
export const ionText216 = (i: Ion216) => `${i.symbol}${charge216(i.z)}`;
const part = (i: Ion216, n: number) => (i.poly && n > 1 ? `(${i.symbol})${sub216(n)}` : `${i.symbol}${sub216(n)}`);

export const salt216 = (cation: Ion216, anion: Ion216) => {
  guard(cation.z > 0 && anion.z < 0, "katyon pozitif, anyon negatif yüklü olmalı");
  const g = gcd(cation.z, anion.z);
  const nCat = Math.abs(anion.z) / g;
  const nAn = cation.z / g;
  return {
    cation, anion, nCat, nAn,
    formula: `${part(cation, nCat)}${part(anion, nAn)}`,
    name: `${cation.name} ${anion.name}`,
    balance: `${nCat}·(${signedCharge(cation.z)}) + ${nAn}·(${signedCharge(anion.z)}) = 0`,
    chargeSum: nCat * cation.z + nAn * anion.z,
  };
};

/* =====================================================================
 * 1 · Asit, baz ve tuz özellikleri: yük dengesi tablosu
 * ===================================================================== */

/** Tabloya alınan tuzların hepsi suda çözünen tuzlardır (ders kitabı çözünürlük bilgisi). */
export const saltPairs216 = [
  { cation: ions216.Na, anion: ions216.Cl, soluble: true },
  { cation: ions216.Ca, anion: ions216.Cl, soluble: true },
  { cation: ions216.K, anion: ions216.SO4, soluble: true },
  { cation: ions216.Mg, anion: ions216.SO4, soluble: true },
  { cation: ions216.Ca, anion: ions216.NO3, soluble: true },
  { cation: ions216.Al, anion: ions216.SO4, soluble: true },
  { cation: ions216.NH4, anion: ions216.Cl, soluble: true },
  { cation: ions216.Na, anion: ions216.CO3, soluble: true },
] as const;
/** Tablodaki iyon hesabının çözünen mol miktarı: 0,10 mol = 100 mmol. */
export const saltSampleMmol216 = 100;

export const saltRows216 = (sample = saltSampleMmol216) => saltPairs216.map(({ cation, anion, soluble }) => {
  const s = salt216(cation, anion);
  const catMmol = s.nCat * sample;
  const anMmol = s.nAn * sample;
  return { ...s, soluble, catMmol, anMmol, totalMmol: catMmol + anMmol };
});
const saltRows = saltRows216();
const findSalt = (formula: string) => {
  const row = saltRows.find((r) => r.formula === formula);
  guard(Boolean(row), `${formula} tabloda olmalı`);
  return row!;
};
const rowAl2 = findSalt("Al₂(SO₄)₃");
const rowMg = findSalt("MgSO₄");
const rowNaCl = findSalt("NaCl");
const rowCaNit = findSalt("Ca(NO₃)₂");
const rowNH4 = findSalt("NH₄Cl");
saltRows.forEach((r) => {
  guard(r.chargeSum === 0, `${r.formula} yükleri dengelemeli`);
  guard(gcd(r.nCat, r.nAn) === 1, `${r.formula} en sade oranda olmalı`);
  guard(r.nCat === Math.abs(r.anion.z) / gcd(r.cation.z, r.anion.z), "katyon sayısı anyon yükünden gelmeli");
  guard(r.soluble, "tablodaki tuzlar suda çözünen örnekler olmalı");
});
guard(rowMg.cation.z === -rowMg.anion.z && rowMg.nCat === 1 && rowMg.nAn === 1, "eşit büyüklükte yükler 1 : 1 oran vermeli");
guard(!rowNH4.cation.metal, "NH₄⁺ metal içermeyen katyon olmalı");
guard(rowAl2.totalMmol !== rowNaCl.totalMmol, "eşit mol tuzlar farklı iyon molü verebilmeli");
guard(saltRows.some((r) => r.anion.poly && r.nAn > 1) && rowCaNit.formula.includes("("), "çok atomlu iyon birden fazlaysa parantez almalı");

const ionMolText = (r: (typeof saltRows)[number]) =>
  `${mol216(r.catMmol)} mol ${ionText216(r.cation)} + ${mol216(r.anMmol)} mol ${ionText216(r.anion)} = ${mol216(r.totalMmol)} mol iyon`;
const saltTable = {
  layout: "table" as const,
  headers: ["İyonlar", "Yük dengesi", "Formül", "Ad", `${mol216(saltSampleMmol216)} mol tuz tamamen çözünürse`],
  rows: saltRows.map((r) => [`${ionText216(r.cation)} ve ${ionText216(r.anion)}`, r.balance, r.formula, r.name, ionMolText(r)]),
};
const saltTitle = "Yük dengesi tuzun formülünü ve iyon sayısını verir";

export const saltSection216: GuideSection = {
  title: saltTitle,
  figureTitle: saltTitle,
  paragraphs: [
    `Tuz, katyon ve anyonların toplam yükü sıfır olacak en sade oranda birleşmesiyle gösterilir. Katyon sayısı anyon yükünün, anyon sayısı katyon yükünün büyüklüğünden gelir; ortak çarpan varsa sadeleştirilir. ${ionText216(rowAl2.cation)} ve ${ionText216(rowAl2.anion)} için ${rowAl2.balance} olduğundan formül ${rowAl2.formula} olur. ${ionText216(rowMg.cation)} ve ${ionText216(rowMg.anion)} yükleri eşit büyüklükte olduğundan oran 1 : 1, formül ${rowMg.formula} olur; ${rowMg.cation.symbol}${sub216(2)}(${rowMg.anion.symbol})${sub216(2)} yazılmaz.`,
    `Adlandırmada önce katyonun, sonra anyonun adı söylenir: ${rowCaNit.formula} ${rowCaNit.name}, ${rowNH4.formula} ${rowNH4.name}. Çok atomlu bir iyon birden fazla kez gerekiyorsa parantez içine alınır. ${ionText216(rowNH4.cation)} metal içermediği hâlde katyon olarak tuz oluşturur.`,
    `Formül birimi iyon sayılarının oranını verdiğinden, suda tamamen çözünen tuzun iyon molleri formülden okunur. ${mol216(saltSampleMmol216)} mol ${rowAl2.formula}, ${mol216(rowAl2.catMmol)} mol ${ionText216(rowAl2.cation)} ve ${mol216(rowAl2.anMmol)} mol ${ionText216(rowAl2.anion)} yani ${mol216(rowAl2.totalMmol)} mol iyon verir. Eşit mol tuzlar eşit iyon molü vermez: aynı miktarda ${rowNaCl.formula} ${mol216(rowNaCl.totalMmol)} mol iyon verir. Tablodaki tuzlar suda çözünen örneklerdir; CaCO₃ gibi az çözünen bir tuzda bu hesap ayrıca çözünürlük bilgisi ister.`,
  ],
  table: saltTable,
};

/* Örnek 1: Fe³⁺ ve SO₄²⁻. */
export const ironSulfate216 = salt216(ions216.Fe3, ions216.SO4);
export const ironSampleMmol216 = 50;
const feCat = ironSulfate216.nCat * ironSampleMmol216;
const feAn = ironSulfate216.nAn * ironSampleMmol216;
const feLcm = (ions216.Fe3.z * Math.abs(ions216.SO4.z)) / gcd(ions216.Fe3.z, ions216.SO4.z);
guard(feCat * ions216.Fe3.z + feAn * ions216.SO4.z === 0, "örnekteki iyon molleri yükü dengelemeli");

/* Örnek 2: NaOH çözeltisinin pH’ı. 25 °C, Kw = 10⁻¹⁴ (dersin kabulü). */
export const kwExponent216 = -14;
export const naohMass216 = { centigrams: 40, litres: 10 } as const;
export const naohMolarMass216 = molarMass216({ Na: 1, O: 1, H: 1 });
const naohMmol = (naohMass216.centigrams * 10) / naohMolarMass216; // cg → mg, mg / (g/mol) = mmol
guard(Number.isInteger(naohMmol), "NaOH molü tam milimol olmalı");
const ohMicroMolar = (naohMmol * 1000) / naohMass216.litres; // µmol/L
const ohExponent = Math.log10(ohMicroMolar) - 6;
guard(Number.isInteger(ohExponent), "[OH⁻] onun kuvveti olmalı");
const hExponent = kwExponent216 - ohExponent;
export const naohPh216 = -hExponent;
guard(naohPh216 > 7, "pH 7’den büyükse 25 °C’de bazik denir");
const pow10 = (e: number) => `10${e < 0 ? "⁻" : ""}${[...String(Math.abs(e))].map((c) => SUP[c]).join("")}`;

export const saltExamples216: WorkedExample[] = [
  {
    title: "Üç artı ve iki eksi yükten formül kur",
    prompt: `Demir(III) iyonu ${ionText216(ions216.Fe3)}, sülfat iyonu ${ionText216(ions216.SO4)} olarak verilmiştir. Bu iki iyondan oluşan tuzun formülünü ve adını yaz. ${mol216(ironSampleMmol216)} mol bu tuz suda tamamen çözünüp iyonlarına ayrılırsa kaç mol ${ionText216(ions216.Fe3)}, kaç mol ${ionText216(ions216.SO4)} ve toplam kaç mol iyon oluşur?`,
    strategy: "Pozitif ve negatif yükü aynı ortak sayıya tamamla, sonra formül birimindeki iyon sayılarını tuz molüyle çarp.",
    steps: [
      { label: "Ortak yük", expression: `EKOK(${ions216.Fe3.z}, ${Math.abs(ions216.SO4.z)}) = ${feLcm}`, explanation: `${ironSulfate216.nCat} tane ${ionText216(ions216.Fe3)} toplam +${feLcm}, ${ironSulfate216.nAn} tane ${ionText216(ions216.SO4)} toplam −${feLcm} yük taşır.` },
      { label: "Formül", expression: `${ironSulfate216.balance} ⇒ ${ironSulfate216.formula}`, explanation: `Sülfat çok atomlu iyon olduğu için parantez alır. Adı ${ironSulfate216.name}.` },
      { label: "İyon molleri", expression: `${mol216(ironSampleMmol216)}·${ironSulfate216.nCat} = ${mol216(feCat)}; ${mol216(ironSampleMmol216)}·${ironSulfate216.nAn} = ${mol216(feAn)}`, explanation: `Her formül biriminde ${ironSulfate216.nCat} katyon ve ${ironSulfate216.nAn} anyon vardır.` },
      { label: "Toplam", expression: `${mol216(feCat)} + ${mol216(feAn)} = ${mol216(feCat + feAn)} mol iyon`, explanation: "Çözünen tuz molü ile iyon molü aynı sayı değildir." },
    ],
    answer: `${ironSulfate216.formula} (${ironSulfate216.name}); ${mol216(feCat)} mol ${ionText216(ions216.Fe3)}, ${mol216(feAn)} mol ${ionText216(ions216.SO4)}, toplam ${mol216(feCat + feAn)} mol iyon.`,
    check: `${mol216(feCat)}·(+${ions216.Fe3.z}) + ${mol216(feAn)}·(−${Math.abs(ions216.SO4.z)}) = 0; çözeltide yük dengesi korunur.`,
    pitfall: "Yükleri dengelemeden FeSO₄ yazmak. FeSO₄, Fe²⁺ içeren demir(II) sülfattır.",
  },
  {
    title: "OH⁻ derişiminden pH’a git",
    prompt: `25 °C’de ${dec216(naohMass216.centigrams, 100, 2)} g NaOH suda çözülüp çözelti ${naohMass216.litres} L’ye tamamlanıyor. NaOH tamamen iyonlaşıyor, suyun kendi iyonlaşmasının katkısı ihmal ediliyor ve [H₃O⁺]·[OH⁻] = ${pow10(kwExponent216)} kabul ediliyor. Atom kütleleri: Na = ${atomicMass216.Na}, O = ${atomicMass216.O}, H = ${atomicMass216.H} g/mol. [OH⁻], [H₃O⁺], pH ve çözeltinin sınıfı nedir?`,
    strategy: "Önce mol, sonra derişim. pH, OH⁻ derişiminden değil H₃O⁺ derişiminden hesaplanır.",
    steps: [
      { label: "Mol", expression: `n = ${dec216(naohMass216.centigrams, 100, 2)}/${naohMolarMass216} = ${mol216(naohMmol)} mol NaOH`, explanation: `M(NaOH) = ${atomicMass216.Na} + ${atomicMass216.O} + ${atomicMass216.H} = ${naohMolarMass216} g/mol. Her NaOH bir OH⁻ verir.` },
      { label: "[OH⁻]", expression: `${mol216(naohMmol)}/${naohMass216.litres} = ${pow10(ohExponent)} mol/L`, explanation: "Çözünen mol, son hacme bölünür." },
      { label: "[H₃O⁺]", expression: `${pow10(kwExponent216)}/${pow10(ohExponent)} = ${pow10(hExponent)} mol/L`, explanation: "İki derişimin çarpımı 25 °C’de sabit kabul edilir." },
      { label: "pH", expression: `pH = −log ${pow10(hExponent)} = ${naohPh216}`, explanation: `${naohPh216} > 7 olduğundan 25 °C’de çözelti baziktir.` },
    ],
    answer: `[OH⁻] = ${pow10(ohExponent)} mol/L, [H₃O⁺] = ${pow10(hExponent)} mol/L, pH = ${naohPh216}; bazik.`,
    check: `${pow10(hExponent)}·${pow10(ohExponent)} = ${pow10(kwExponent216)}. Bazik çözeltide de az miktarda H₃O⁺ bulunur.`,
    pitfall: `−log[OH⁻] = ${-ohExponent} sonucunu pH sanıp çözeltiyi asidik saymak.`,
  },
];

export const saltSupplement216 = {
  title: saltTitle,
  figureTitle: saltTitle,
  paragraphs: saltSection216.paragraphs,
  summary: `Katyon sayısı = anyon yükü, anyon sayısı = katyon yükü; sonra sadeleştir. ${rowAl2.formula}: ${rowAl2.balance}. ${rowMg.formula}: eşit yükler 1 : 1. ${mol216(saltSampleMmol216)} mol ${rowAl2.formula} → ${mol216(rowAl2.totalMmol)} mol iyon, aynı mol ${rowNaCl.formula} → ${mol216(rowNaCl.totalMmol)} mol iyon.`,
  appendSection: true as const,
  table: saltTable,
  examples: saltExamples216,
};

/* =====================================================================
 * 2 · Asit-baz tepkimeleri: M·V ile H⁺ ve OH⁻ karşılaştırması
 * ===================================================================== */

export interface Reagent216 { formula: string; n: number; ion: Ion216; strong: true }
export const acids216 = {
  HCl: { formula: "HCl", n: 1, ion: ions216.Cl, strong: true },
  HNO3: { formula: "HNO₃", n: 1, ion: ions216.NO3, strong: true },
  H2SO4: { formula: "H₂SO₄", n: 2, ion: ions216.SO4, strong: true },
} as const satisfies Record<string, Reagent216>;
export const bases216 = {
  NaOH: { formula: "NaOH", n: 1, ion: ions216.Na, strong: true },
  KOH: { formula: "KOH", n: 1, ion: ions216.K, strong: true },
  CaOH2: { formula: "Ca(OH)₂", n: 2, ion: ions216.Ca, strong: true },
} as const satisfies Record<string, Reagent216>;
guard(Object.values(acids216).every((a) => a.n === -a.ion.z) && Object.values(bases216).every((b) => b.n === b.ion.z), "formül başına H⁺/OH⁻ sayısı karşı iyonun yükünü dengelemeli");

/** Derişim milimol/L (0,10 mol/L = 100), hacim mL. */
export interface Solution216 { reagent: Reagent216; cmM: number; mL: number }
export interface Mixture216 { acid: Solution216; base: Solution216 }
const sol = (reagent: Reagent216, cmM: number, mL: number): Solution216 => ({ reagent, cmM, mL });
export const mixtures216: readonly Mixture216[] = [
  { acid: sol(acids216.HCl, 100, 100), base: sol(bases216.NaOH, 100, 100) },
  { acid: sol(acids216.H2SO4, 100, 100), base: sol(bases216.NaOH, 100, 100) },
  { acid: sol(acids216.H2SO4, 200, 50), base: sol(bases216.NaOH, 200, 100) },
  { acid: sol(acids216.HNO3, 20, 100), base: sol(bases216.CaOH2, 10, 100) },
  { acid: sol(acids216.HCl, 200, 150), base: sol(bases216.KOH, 400, 100) },
  { acid: sol(acids216.HCl, 100, 200), base: sol(bases216.CaOH2, 20, 200) },
];
/** Formül birimi molü (mmol) = c·V. */
export const solutionMmol216 = ({ cmM, mL }: Solution216) => {
  const mmol = (cmM * mL) / 1000;
  guard(Number.isInteger(mmol), "c·V tam milimol olmalı");
  return mmol;
};
export const mixtureRow216 = (m: Mixture216) => {
  const acidMmol = solutionMmol216(m.acid);
  const baseMmol = solutionMmol216(m.base);
  const h = m.acid.reagent.n * acidMmol;
  const oh = m.base.reagent.n * baseMmol;
  const reacted = Math.min(h, oh);
  const totalMl = m.acid.mL + m.base.mL;
  const excess = Math.abs(h - oh);
  const kind = h > oh ? "asidik" as const : h < oh ? "bazik" as const : "esdeger" as const;
  return { ...m, acidMmol, baseMmol, h, oh, reacted, excess, totalMl, kind, salt: salt216(m.base.reagent.ion, m.acid.reagent.ion) };
};
export const mixtureRows216 = () => mixtures216.map(mixtureRow216);
const mixRows = mixtureRows216();
const molar = (cmM: number) => dec216(cmM, 1000, 2);
const litres = (mL: number) => dec216(mL, 1000, 3);
const molM = (mmol: number) => mol216(mmol, 3);
export const solutionText216 = (s: Solution216) => `${s.mL} mL ${molar(s.cmM)} mol/L ${s.reagent.formula}`;
export const ionMolText216 = (s: Solution216) => {
  const mmol = solutionMmol216(s);
  return `${s.reagent.n > 1 ? `${s.reagent.n}·` : ""}${molar(s.cmM)}·${litres(s.mL)} = ${molM(s.reagent.n * mmol)} mol`;
};
export const mixtureResult216 = (r: ReturnType<typeof mixtureRow216>) => r.kind === "esdeger"
  ? `Artan yok: eşdeğerlik, ${r.salt.formula} oluşur; güçlü çift, yaklaşık nötr`
  : `${molM(r.excess)} mol ${r.kind === "asidik" ? "H⁺" : "OH⁻"} artar; ${molM(r.excess)}/${litres(r.totalMl)} = ${dec216(r.excess, r.totalMl, 2)} mol/L; ${r.kind}`;
const mixTable = {
  layout: "table" as const,
  headers: ["Asit", "Baz", "n(H⁺)", "n(OH⁻)", "Son durum"],
  rows: mixRows.map((r) => [solutionText216(r.acid), solutionText216(r.base), ionMolText216(r.acid), ionMolText216(r.base), mixtureResult216(r)]),
};
mixRows.forEach((r) => {
  guard(r.reacted + (r.kind === "asidik" ? r.excess : 0) === r.h && r.reacted + (r.kind === "bazik" ? r.excess : 0) === r.oh, "başlangıç = tepkimeye giren + artan");
  guard(r.salt.chargeSum === 0, "eşdeğerlik tuzu yükü dengelemeli");
  guard(r.acid.reagent.strong && r.base.reagent.strong, "tablodaki çiftler güçlü asit ve güçlü baz olmalı");
});
const mixBasic = mixRows[4];
const mixEqualMol = mixRows[1];
guard(mixBasic.kind === "bazik" && mixEqualMol.acidMmol === mixEqualMol.baseMmol && mixEqualMol.h === 2 * mixEqualMol.oh, "örnek satırlar paragrafla uyuşmalı");
const eqSalts = mixRows.filter((r) => r.kind === "esdeger").map((r) => r.salt.formula);
guard(eqSalts.includes("Na₂SO₄") && eqSalts.includes("Ca(NO₃)₂"), "eşdeğerlik tuzları tabloda olmalı");
guard(new Set(mixRows.map((r) => r.kind)).size === 3, "tablo asidik, bazik ve eşdeğer sonuç içermeli");
const allReagents = [...Object.values(acids216), ...Object.values(bases216)] as Reagent216[];
const reagentsWith = (n: number) => {
  const list = allReagents.filter((r) => r.n === n).map((r) => r.formula);
  return `${list.slice(0, -1).join(", ")} ve ${list.at(-1)}`;
};
const mixTitle = "Karışımda H⁺ ve OH⁻ mollerini karşılaştır";

export const mixSection216: GuideSection = {
  title: mixTitle,
  figureTitle: mixTitle,
  paragraphs: [
    `Güçlü asit ile güçlü baz karıştırıldığında net tepkime H⁺ + OH⁻ → H₂O olur. Her çözeltinin verebileceği iyon molü, formül başına H⁺ ya da OH⁻ sayısı × derişim × hacim ile bulunur; hacim litre olmalıdır. Formül başına sayı ${reagentsWith(2)} için 2, ${reagentsWith(1)} için 1 alınır.`,
    `Küçük olan iyon molü tamamen tükenir, büyük olandan fark kadarı artar. Artan iyon toplam hacme bölünür; tabloda hacimlerin toplandığı kabul edilir. Örneğin ${solutionText216(mixBasic.acid)} ile ${solutionText216(mixBasic.base)} karışınca ${molM(mixBasic.h)} mol H⁺ ve ${molM(mixBasic.oh)} mol OH⁻ vardır. ${molM(mixBasic.excess)} mol OH⁻ artar ve ${litres(mixBasic.totalMl)} L’de [OH⁻] = ${dec216(mixBasic.excess, mixBasic.totalMl, 2)} mol/L olur.`,
    `Eşit mol asit ve baz her zaman eşdeğerlik değildir: ${solutionText216(mixEqualMol.acid)} ile ${solutionText216(mixEqualMol.base)} karışımında H⁺ molü OH⁻ molünün 2 katıdır. Eşdeğerlikte oluşan tuz, bazın katyonu ile asidin anyonundan yük dengesiyle yazılır: ${eqSalts.join(", ")}. Tablodaki çiftler güçlü asit ve güçlü baz olduğundan 25 °C’de eşdeğerlik çözeltisi yaklaşık nötrdür.`,
  ],
  table: mixTable,
};

/* Örnek 1: H₂SO₄’ü tam nötrleyen NaOH hacmi. */
export const sulfuricTitration216 = { acid: sol(acids216.H2SO4, 150, 200), baseCmM: 300 } as const;
const stAcid = solutionMmol216(sulfuricTitration216.acid);
const stBase = acids216.H2SO4.n * stAcid;
const stMl = (stBase * 1000) / sulfuricTitration216.baseCmM;
guard(Number.isInteger(stMl), "gereken hacim tam mL olmalı");
const stSalt = salt216(ions216.Na, ions216.SO4);
/* Örnek 2: İki asidin karışımı ve NaOH. */
export const twoAcid216 = { a: sol(acids216.HCl, 200, 100), b: sol(acids216.H2SO4, 100, 100), baseCmM: 500, addedMl: 100 } as const;
const taH1 = solutionMmol216(twoAcid216.a) * twoAcid216.a.reagent.n;
const taH2 = solutionMmol216(twoAcid216.b) * twoAcid216.b.reagent.n;
const taH = taH1 + taH2;
const taEqMl = (taH * 1000) / twoAcid216.baseCmM;
const taOh = (twoAcid216.baseCmM * twoAcid216.addedMl) / 1000;
guard(Number.isInteger(taEqMl) && taOh > taH, "ikinci örnekte baz fazla olmalı");
guard(taH1 === taH2 && solutionMmol216(twoAcid216.b) < solutionMmol216(twoAcid216.a), "H₂SO₄’ün asit molü küçük, H⁺ katkısı eşit olmalı");

export const mixExamples216: WorkedExample[] = [
  {
    title: "İki protonlu asidi tam nötrleyen hacim",
    prompt: `${solutionText216(sulfuricTitration216.acid)} çözeltisi, ${molar(sulfuricTitration216.baseCmM)} mol/L NaOH ile H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O denklemine göre tam nötrleştiriliyor. Kaç mL NaOH çözeltisi gerekir ve kaç mol tuz oluşur?`,
    strategy: "Asit molünü bul, denklem katsayısıyla baz molüne geç, sonra V = n/c ile hacmi hesapla.",
    steps: [
      { label: "Asit molü", expression: `${molar(sulfuricTitration216.acid.cmM)}·${litres(sulfuricTitration216.acid.mL)} = ${molM(stAcid)} mol H₂SO₄`, explanation: "Hacim litreye çevrilir." },
      { label: "Baz molü", expression: `2·${molM(stAcid)} = ${molM(stBase)} mol NaOH`, explanation: "1 mol H₂SO₄ için 2 mol NaOH gerekir." },
      { label: "Hacim", expression: `V = ${molM(stBase)}/${molar(sulfuricTitration216.baseCmM)} = ${litres(stMl)} L = ${stMl} mL`, explanation: "Derişim mol/L olduğundan sonuç litredir." },
      { label: "Tuz", expression: `${molM(stAcid)} mol ${stSalt.formula}`, explanation: `Na⁺ ve SO₄²⁻ yük dengesi ${stSalt.balance} verir; tuz molü H₂SO₄ molüne eşittir.` },
    ],
    answer: `${stMl} mL NaOH; ${molM(stAcid)} mol ${stSalt.formula} oluşur.`,
    check: `${molar(sulfuricTitration216.baseCmM)}·${litres(stMl)} = ${molM(stBase)} mol OH⁻ = 2·${molM(stAcid)} mol H₂SO₄.`,
    pitfall: `1 : 1 oranı kullanıp ${stMl / 2} mL bulmak. H₂SO₄ formül başına 2 H⁺ verir.`,
  },
  {
    title: "İki asidin H⁺ molleri toplanır",
    prompt: `${solutionText216(twoAcid216.a)} ile ${solutionText216(twoAcid216.b)} aynı kapta karıştırılıyor. Karışım ${molar(twoAcid216.baseCmM)} mol/L NaOH ile nötrleştirilecek. İki asit de güçlü ve H₂SO₄ tamamen 2 H⁺ veriyor kabul edilsin. Eşdeğerlik için kaç mL NaOH gerekir? ${twoAcid216.addedMl} mL NaOH eklenirse hangi iyon kaç mol artar?`,
    strategy: "Her asidin H⁺ molünü ayrı hesapla ve topla; sonra OH⁻ ile karşılaştır.",
    steps: [
      { label: "HCl", expression: ionMolText216(twoAcid216.a), explanation: "HCl formül başına 1 H⁺ verir." },
      { label: "H₂SO₄", expression: ionMolText216(twoAcid216.b), explanation: "H₂SO₄ formül başına 2 H⁺ verir; asit molü küçük olsa da H⁺ katkısı eşit çıkar." },
      { label: "Eşdeğerlik", expression: `${molM(taH1)} + ${molM(taH2)} = ${molM(taH)} mol H⁺ ⇒ V = ${molM(taH)}/${molar(twoAcid216.baseCmM)} = ${taEqMl} mL`, explanation: "NaOH formül başına 1 OH⁻ verir." },
      { label: "Fazla baz", expression: `${molar(twoAcid216.baseCmM)}·${litres(twoAcid216.addedMl)} = ${molM(taOh)} mol OH⁻; ${molM(taOh)} − ${molM(taH)} = ${molM(taOh - taH)} mol`, explanation: "Eşdeğerlikten sonra eklenen baz tepkimeye girmez, artar." },
    ],
    answer: `${taEqMl} mL NaOH; ${twoAcid216.addedMl} mL eklenince ${molM(taOh - taH)} mol OH⁻ artar ve ortam bazik olur.`,
    check: `${molar(twoAcid216.baseCmM)}·${litres(taEqMl)} = ${molM(taH)} mol OH⁻, toplam H⁺ ile eşit.`,
    pitfall: `Asit molleri ${molM(solutionMmol216(twoAcid216.a))} + ${molM(solutionMmol216(twoAcid216.b))} = ${molM(solutionMmol216(twoAcid216.a) + solutionMmol216(twoAcid216.b))} diye toplanıp H₂SO₄’ün iki protonu unutulursa eşdeğerlik hacmi ${((solutionMmol216(twoAcid216.a) + solutionMmol216(twoAcid216.b)) * 1000) / twoAcid216.baseCmM} mL gibi yanlış çıkar.`,
  },
];

export const mixSupplement216 = {
  title: mixTitle,
  figureTitle: mixTitle,
  paragraphs: mixSection216.paragraphs,
  summary: `n(H⁺) = (asit formülündeki H⁺ sayısı)·c·V, n(OH⁻) = (baz formülündeki OH⁻ sayısı)·c·V; V litre. Küçük olan tükenir, fark artar ve toplam hacme bölünür. ${solutionText216(mixEqualMol.acid)} + ${solutionText216(mixEqualMol.base)}: eşit mol ama H⁺ 2 kat. Eşdeğerlik tuzu yük dengesiyle: ${eqSalts.join(", ")}.`,
  appendSection: true as const,
  table: mixTable,
  examples: mixExamples216,
};

/* =====================================================================
 * 3 · Asit, baz ve metaller: seyreltik HCl ve sulu güçlü baz tablosu
 * ===================================================================== */

export type MetalClass216 = "aktif metal" | "amfoter metal" | "yarı soy metal" | "soy metal";
export interface Metal216 { symbol: string; ion: Ion216 | null; acid: boolean; base: boolean; cls: MetalClass216; name: string }
const fe2 = ion("Fe", 2, "demir(II)");
const zn = ion("Zn", 2, "çinko");
/** Ders kitabı aktiflik bilgisi: seyreltik HCl (yükseltgen olmayan asit) ve sulu güçlü bazdaki davranış. */
export const metals216: readonly Metal216[] = [
  { symbol: "Mg", ion: ions216.Mg, acid: true, base: false, cls: "aktif metal", name: "magnezyum" },
  { symbol: "Fe", ion: fe2, acid: true, base: false, cls: "aktif metal", name: "demir" },
  { symbol: "Zn", ion: zn, acid: true, base: true, cls: "amfoter metal", name: "çinko" },
  { symbol: "Al", ion: ions216.Al, acid: true, base: true, cls: "amfoter metal", name: "alüminyum" },
  { symbol: "Cu", ion: null, acid: false, base: false, cls: "yarı soy metal", name: "bakır" },
  { symbol: "Ag", ion: null, acid: false, base: false, cls: "yarı soy metal", name: "gümüş" },
  { symbol: "Au", ion: null, acid: false, base: false, cls: "soy metal", name: "altın" },
];
/** 1 mol metalin verdiği H₂ molü, milimol başına: z elektron, H₂ başına 2 elektron. */
export const h2PerMetal216 = (m: Metal216, medium: "acid" | "base") => (m[medium] && m.ion ? m.ion.z / 2 : 0);
export const acidEquation216 = (m: Metal216) => {
  if (!m.acid || !m.ion) return null;
  const k = m.ion.z % 2 === 0 ? 1 : 2;
  const s = salt216(m.ion, ions216.Cl);
  return { k, hcl: k * m.ion.z, salt: s, h2: (k * m.ion.z) / 2, text: `${coef(k)}${m.symbol} + ${k * m.ion.z}HCl → ${coef(k)}${s.formula} + ${coef((k * m.ion.z) / 2)}H₂` };
};
export const baseEquation216 = (m: Metal216) => {
  if (!m.base || !m.ion) return null;
  const z = m.ion.z;
  const k = z % 2 === 0 ? 1 : 2;
  const complexCharge = z - 4;
  const oh = k * (4 - z);
  const water = k * z;
  const h2 = (k * z) / 2;
  // Atom ve yük denkliği: O, H ve yük iki tarafta eşit olmalı.
  guard(oh + water === 4 * k && oh + 2 * water === 4 * k + 2 * h2 && -oh === k * complexCharge, `${m.symbol} baz denklemi denk olmalı`);
  return { k, oh, water, h2, complexCharge, text: `${coef(k)}${m.symbol} + ${coef(oh)}OH⁻ + ${water}H₂O → ${coef(k)}[${m.symbol}(OH)₄]${charge216(complexCharge)} + ${coef(h2)}H₂` };
};
const h2Text = (x: number) => dec216(x * 10, 10);
export const metalRows216 = () => metals216.map((m) => ({
  ...m,
  acidEq: acidEquation216(m),
  baseEq: baseEquation216(m),
  h2Acid: h2PerMetal216(m, "acid"),
  h2Base: h2PerMetal216(m, "base"),
}));
const metalRows = metalRows216();
metalRows.forEach((m) => {
  guard((m.cls === "aktif metal" || m.cls === "amfoter metal") === m.acid, "aktif ve amfoter metaller seyreltik HCl ile H₂ vermeli");
  guard((m.cls === "amfoter metal") === m.base, "yalnız amfoter metaller sulu bazla H₂ vermeli");
  guard(!m.acidEq || m.acidEq.h2 / m.acidEq.k === m.h2Acid, "H₂ katsayısı z/2 olmalı");
  if (m.base) guard(m.h2Base === m.h2Acid, "amfoter metal iki ortamda aynı H₂ molünü vermeli");
});
const metal = (s: string) => metalRows.find((m) => m.symbol === s)!;
const [mMg, mZn, mAl] = ["Mg", "Zn", "Al"].map(metal);
const nonReacting = metalRows.filter((m) => !m.acid).map((m) => m.symbol);
guard(nonReacting.join(",") === "Cu,Ag,Au", "H₂ vermeyen metaller Cu, Ag ve Au olmalı");
const amphoteric = metalRows.filter((m) => m.base).map((m) => m.symbol);
guard(amphoteric.join(",") === "Zn,Al", "amfoter metaller Zn ve Al olmalı");
const mgSulfate = salt216(ions216.Mg, ions216.SO4);
guard(metal("Fe").h2Acid === mMg.h2Acid && mZn.h2Acid === mMg.h2Acid, "Mg, Zn ve Fe aynı H₂ molünü vermeli");

const metalTable = {
  layout: "table" as const,
  headers: ["Metal", "Seyreltik HCl ile", "Sulu güçlü baz (OH⁻) ile", "Sınıf", "1 mol metalden H₂"],
  rows: metalRows.map((m) => [
    m.ion ? `${m.symbol} → ${ionText216(m.ion)}` : m.symbol,
    m.acidEq ? m.acidEq.text : "H₂ çıkmaz",
    m.baseEq ? m.baseEq.text : "H₂ çıkmaz",
    m.cls,
    m.h2Acid || m.h2Base ? `asitte ${h2Text(m.h2Acid)} mol, bazda ${h2Text(m.h2Base)} mol` : "0",
  ]),
};
const metalTitle = "Metali asitte ve bazda elektron sayısıyla karşılaştır";

export const metalSection216: GuideSection = {
  title: metalTitle,
  figureTitle: metalTitle,
  paragraphs: [
    `Seyreltik HCl ve seyreltik H₂SO₄ gibi yükseltgen olmayan asitlerden H₂ çıkaran metaller aktif metal olarak sınıflanır: ${mMg.acidEq!.text}, Mg + H₂SO₄ → ${mgSulfate.formula} + H₂. Metal z elektron verip yükü z olan iyona dönüşür. Her H₂ için 2 elektron gerektiğinden 1 mol metal z/2 mol H₂ verir: ${mMg.symbol} ve ${mZn.symbol} için ${h2Text(mMg.h2Acid)}, ${mAl.symbol} için ${h2Text(mAl.h2Acid)} mol.`,
    `${nonReacting.join(", ")} bu asitlerle H₂ vermez. Cu ve Ag yarı soy metaldir; HNO₃ gibi yükseltgen asitlerle tepkime verebilirler, ama o zaman çıkan gaz H₂ değildir. Au soy metaldir ve olağan tek bir asitle tepkime vermez. Tablodaki sınıflar seyreltik ve oda koşulundaki okul modelini anlatır.`,
    `${amphoteric.join(" ve ")} hem asitle hem güçlü bazla H₂ verir; bazda çözünür hidroksokompleks oluşur ve su da denkleme girer. İki ortamda metal aynı sayıda elektron verdiğinden 1 mol metalden çıkan H₂ miktarı aynıdır. Bu yüzden Mg–Al karışımında bazda çıkan gaz yalnız Al’yi, asitte çıkan gaz iki metali birlikte ölçer.`,
  ],
  table: metalTable,
};

/* Örnek 1: Mg–Al karışımı. */
export const mgAl216 = { baseH2Mmol: 150, acidH2Mmol: 350 } as const;
const alMmol = mgAl216.baseH2Mmol / mAl.h2Base;
const mgMmol = (mgAl216.acidH2Mmol - alMmol * mAl.h2Acid) / mMg.h2Acid;
guard(Number.isInteger(alMmol) && Number.isInteger(mgMmol) && mgMmol > 0, "karışım molleri tam milimol olmalı");
const mgGrams = (mgMmol * atomicMass216.Mg) / 1000;
const alGrams = (alMmol * atomicMass216.Al) / 1000;
const gramText = (x: number) => dec216(Math.round(x * 100), 100);
export const mgAlAnswer216 = { mgMmol, alMmol, mgGrams, alGrams };
/* Örnek 2: Eşit mol dört metal, NŞA hacmi. */
export const equalMetals216 = { mmol: 100, symbols: ["Mg", "Zn", "Al", "Cu"] } as const;
const eqMetals = equalMetals216.symbols.map(metal);
const eqAcidH2 = eqMetals.reduce((s, m) => s + m.h2Acid * equalMetals216.mmol, 0);
const eqBaseH2 = eqMetals.reduce((s, m) => s + m.h2Base * equalMetals216.mmol, 0);
guard(Number.isInteger(eqAcidH2) && Number.isInteger(eqBaseH2) && eqAcidH2 > eqBaseH2, "asitteki H₂ bazdakinden çok olmalı");
export const equalMetalsAnswer216 = { acidMmol: eqAcidH2, baseMmol: eqBaseH2 };

export const metalExamples216: WorkedExample[] = [
  {
    title: "Bazdaki gaz yalnız amfoter metali sayar",
    prompt: `Mg ve Al’den oluşan bir karışımdan iki eşit örnek alınıyor. Birinci örnek yeterli sulu NaOH ile ${mol216(mgAl216.baseH2Mmol)} mol H₂, ikinci örnek yeterli seyreltik HCl ile ${mol216(mgAl216.acidH2Mmol)} mol H₂ veriyor. Tepkimeler tamamlanıyor ve başka gaz oluşmuyor. M(Mg) = ${atomicMass216.Mg}, M(Al) = ${atomicMass216.Al} g/mol. Bir örnekte kaç gram Mg ve kaç gram Al vardır?`,
    strategy: "Bazda yalnız Al tepkime verir; önce Al molünü bazdaki gazdan, sonra Mg molünü asitteki gazdan çıkar.",
    steps: [
      { label: "Bazda", expression: `${baseEquation216(mAl)!.text} ⇒ n(Al) = ${mol216(mgAl216.baseH2Mmol)}/${h2Text(mAl.h2Base)} = ${mol216(alMmol)} mol`, explanation: "Mg sulu bazla H₂ vermez; 2 mol Al 3 mol H₂ verir." },
      { label: "Asitte Al", expression: `${mol216(alMmol)}·${h2Text(mAl.h2Acid)} = ${mol216(alMmol * mAl.h2Acid)} mol H₂`, explanation: "Al asitte de aynı sayıda elektron verir." },
      { label: "Asitte Mg", expression: `${mol216(mgAl216.acidH2Mmol)} − ${mol216(alMmol * mAl.h2Acid)} = ${mol216(mgMmol)} mol H₂ ⇒ n(Mg) = ${mol216(mgMmol)} mol`, explanation: `${mMg.acidEq!.text}: Mg ile H₂ molü eşittir.` },
      { label: "Kütleler", expression: `Mg: ${mol216(mgMmol)}·${atomicMass216.Mg} = ${gramText(mgGrams)} g; Al: ${mol216(alMmol)}·${atomicMass216.Al} = ${gramText(alGrams)} g`, explanation: "Mol, mol kütlesiyle çarpılır." },
    ],
    answer: `${gramText(mgGrams)} g Mg ve ${gramText(alGrams)} g Al; örnek ${gramText(mgGrams + alGrams)} g.`,
    check: `Asitte ${mol216(mgMmol)} + ${mol216(alMmol)}·${h2Text(mAl.h2Acid)} = ${mol216(mgAl216.acidH2Mmol)} mol H₂; bazda yalnız ${mol216(alMmol)}·${h2Text(mAl.h2Base)} = ${mol216(mgAl216.baseH2Mmol)} mol.`,
    pitfall: "Bazdaki gazı da iki metale paylaştırmak. Mg amfoter değildir, sulu bazda H₂ vermez.",
  },
  {
    title: "Eşit mol metal, farklı gaz hacmi",
    prompt: `Dört ayrı kapta ${mol216(equalMetals216.mmol)}’ar mol ${equalMetals216.symbols.join(", ")} vardır. A deneyinde her kaba yeterli seyreltik HCl, B deneyinde aynı metallerin yeni örneklerine yeterli sulu NaOH ekleniyor. Tepkimeler tamamlanıyor, metaller saf ve yüzeyleri temiz. Gazlar NŞA’da (0 °C, 1 atm) ölçülüyor ve 1 mol gaz ${dec216(molarVolumeTenthsL216, 10)} L kabul ediliyor. Her deneyde toplam kaç litre H₂ oluşur?`,
    strategy: "Her metal için 1 mol başına H₂ molünü z/2 ile bul; tepkime vermeyen metali sıfır say; sonra molar hacimle çarp.",
    steps: [
      { label: "A: HCl", expression: eqMetals.map((m) => `${m.symbol}: ${mol216(m.h2Acid * equalMetals216.mmol)}`).join(", "), explanation: `${eqMetals.filter((m) => m.ion && m.acid).map((m) => `${m.symbol} ${m.ion!.z}`).join(", ")} elektron verir; ${eqMetals.filter((m) => !m.acid).map((m) => m.symbol).join(", ")} seyreltik HCl ile H₂ vermez.` },
      { label: "A toplam", expression: `${mol216(eqAcidH2)} mol·${dec216(molarVolumeTenthsL216, 10)} L/mol = ${gasLitres216(eqAcidH2)} L`, explanation: "Hacim yalnız verilen NŞA koşulunda bu sayıyla bulunur." },
      { label: "B: NaOH", expression: eqMetals.map((m) => `${m.symbol}: ${mol216(m.h2Base * equalMetals216.mmol)}`).join(", "), explanation: `Yalnız amfoter ${eqMetals.filter((m) => m.base).map((m) => m.symbol).join(" ve ")} bazla H₂ verir.` },
      { label: "B toplam", expression: `${mol216(eqBaseH2)} mol·${dec216(molarVolumeTenthsL216, 10)} L/mol = ${gasLitres216(eqBaseH2)} L`, explanation: "Zn ve Al’nin katkısı asitteki katkılarıyla aynıdır." },
    ],
    answer: `A: ${gasLitres216(eqAcidH2)} L H₂; B: ${gasLitres216(eqBaseH2)} L H₂.`,
    check: `Fark ${mol216(eqAcidH2 - eqBaseH2)} mol, yalnız Mg’nin asitteki katkısıdır.`,
    pitfall: `Eşit mol metalin her zaman eşit H₂ vereceğini düşünmek; Al’nin 1 molü ${h2Text(mAl.h2Acid)} mol H₂ verir, Cu hiç vermez.`,
  },
];

export const metalSupplement216 = {
  title: metalTitle,
  figureTitle: metalTitle,
  paragraphs: metalSection216.paragraphs,
  summary: `Aktif metal + seyreltik HCl/H₂SO₄ → tuz + H₂. 1 mol metal z/2 mol H₂ verir: Mg, Zn, Fe ${h2Text(mMg.h2Acid)}; Al ${h2Text(mAl.h2Acid)}. ${nonReacting.join(", ")} bu asitlerle H₂ vermez. Amfoter ${amphoteric.join(", ")} bazda da aynı miktarda H₂ verir.`,
  appendSection: true as const,
  table: metalTable,
  examples: metalExamples216,
};

/* =====================================================================
 * 4 · Hayatımızda asit ve baz: formül başına eşdeğer
 * ===================================================================== */

export interface Daily216 {
  daily: string; component: string; formula: string; kind: "asit" | "baz" | "tuz";
  /** Formül başına verilen (asit) ya da tüketilen (baz/tuz) H⁺ sayısı. */
  eq: number; hAtoms: number; carbonate: number;
}
/** Ders kitabı bilgisi: asetik asidin 1, sitrik asidin 3 asidik hidrojeni vardır. */
export const dailyItems216: readonly Daily216[] = [
  { daily: "Sirke", component: "asetik asit", formula: "CH₃COOH", kind: "asit", eq: 1, hAtoms: 4, carbonate: 0 },
  { daily: "Limon suyu", component: "sitrik asit", formula: "C₆H₈O₇", kind: "asit", eq: 3, hAtoms: 8, carbonate: 0 },
  { daily: "Mide özsuyu", component: "hidroklorik asit", formula: "HCl", kind: "asit", eq: 1, hAtoms: 1, carbonate: 0 },
  { daily: "Yemek sodası", component: "sodyum hidrojen karbonat", formula: "NaHCO₃", kind: "tuz", eq: 1, hAtoms: 1, carbonate: 1 },
  { daily: "Çamaşır sodası", component: "sodyum karbonat", formula: "Na₂CO₃", kind: "tuz", eq: 2, hAtoms: 0, carbonate: 1 },
  { daily: "Sud kostik", component: "sodyum hidroksit", formula: "NaOH", kind: "baz", eq: 1, hAtoms: 1, carbonate: 0 },
  { daily: "Sönmüş kireç", component: "kalsiyum hidroksit", formula: "Ca(OH)₂", kind: "baz", eq: 2, hAtoms: 2, carbonate: 0 },
];
/** CaCO₃ + 2H⁺ → Ca²⁺ + CO₂ + H₂O: bir CaCO₃ için gereken H⁺. */
export const carbonateProtons216 = 2;
export const dailySampleMmol216 = 100;
export const dailyRow216 = (d: Daily216, sample = dailySampleMmol216) => {
  const eqMmol = d.eq * sample;
  const caco3Mmol = d.kind === "asit" ? eqMmol / carbonateProtons216 : 0;
  const co2Mmol = d.kind === "asit" ? caco3Mmol : d.carbonate * sample;
  return { ...d, eqMmol, caco3Mmol, co2Mmol };
};
const dailyRows = dailyItems216.map((d) => dailyRow216(d));
const daily = (f: string) => dailyRows.find((d) => d.formula === f)!;
const [dAcetic, dCitric, dHcl, dBicarb, dSoda, dNaoh, dLime] = ["CH₃COOH", "C₆H₈O₇", "HCl", "NaHCO₃", "Na₂CO₃", "NaOH", "Ca(OH)₂"].map(daily);
guard(dAcetic.eq < dAcetic.hAtoms && dCitric.eq < dCitric.hAtoms, "organik asitlerde verilebilen H⁺, H atomu sayısından az olmalı");
guard(dBicarb.kind === "tuz" && dSoda.kind === "tuz" && dBicarb.carbonate === 1 && dSoda.carbonate === 1, "iki soda da formül başına bir karbonat taşıyan tuz olmalı");
guard(dailyRows.every((d) => Number.isInteger(d.caco3Mmol) && Number.isInteger(d.co2Mmol)), "tablo miktarları tam milimol olmalı");
guard(dCitric.caco3Mmol === 3 * dAcetic.caco3Mmol, "eşit mol sitrik asit asetik asidin 3 katı kireç çözmeli");
const perFormula = (d: (typeof dailyRows)[number]) => d.kind === "asit"
  ? `${d.eq} H⁺ verir${d.hAtoms !== d.eq ? ` (${d.hAtoms} H atomundan)` : ""}`
  : d.kind === "baz" ? `${d.eq} OH⁻ verir, ${d.eq} H⁺ tüketir` : `${d.eq} H⁺ tüketir`;
const sampleResult = (d: (typeof dailyRows)[number]) => d.kind === "asit"
  ? `${mol216(d.eqMmol)} mol H⁺ → ${mol216(d.caco3Mmol)} mol CaCO₃ çözer`
  : `${mol216(d.eqMmol)} mol HCl ${d.kind === "baz" ? "nötrler" : "tüketir"}${d.co2Mmol ? `, ${mol216(d.co2Mmol)} mol CO₂ çıkar` : ""}`;
const dailyTable = {
  layout: "table" as const,
  headers: ["Günlük ad", "Etkin bileşen", "Sınıf", "Formül başına", `${mol216(dailySampleMmol216)} mol bileşen tam tepkimede`],
  rows: dailyRows.map((d) => [d.daily, `${d.component} ${d.formula}`, d.kind === "tuz" ? "tuz, çözeltisi bazik" : d.kind, perFormula(d), sampleResult(d)]),
};
const dailyTitle = "Günlük asit ve bazlarda eşdeğeri formülden say";

export const dailySection216: GuideSection = {
  title: dailyTitle,
  figureTitle: dailyTitle,
  paragraphs: [
    `Sirke, limon suyu ve mide özsuyu birer karışımdır; tablodaki bileşen bunların içindeki asitlik veren türdür. Asetik asit ${dAcetic.formula} formülünde ${dAcetic.hAtoms} H bulunur, ama yalnız karboksil grubundaki ${dAcetic.eq} H, H⁺ olarak verilebilir. Sitrik asit ${dCitric.formula} formülünde ${dCitric.hAtoms} H vardır; asidik olanlar ${dCitric.eq} tanedir. ${dHcl.formula} formül başına ${dHcl.eq} H⁺ verir.`,
    `Yemek sodası ${dBicarb.formula} ve çamaşır sodası ${dSoda.formula} tuzdur, sulu çözeltileri bazik davranır. HCO₃⁻ ${dBicarb.eq}, CO₃²⁻ ${dSoda.eq} H⁺ tüketir ve iki tepkimede de formül başına 1 CO₂ çıkar. Sud kostik ${dNaoh.formula} formül başına ${dNaoh.eq}, sönmüş kireç ${dLime.formula} ${dLime.eq} OH⁻ verir.`,
    `Kireç taşı CaCO₃ + 2H⁺ → Ca²⁺ + CO₂ + H₂O denklemine göre ${carbonateProtons216} H⁺ ile çözünür. Bu yüzden ${mol216(dailySampleMmol216)} mol asetik asit ${mol216(dAcetic.caco3Mmol)} mol, aynı miktarda sitrik asit ${mol216(dCitric.caco3Mmol)} mol CaCO₃ çözebilir. Tablo verilen tam tepkimeleri kullanır. Ürünün derişimi ve pH’sı bu sayılardan çıkmaz; etiket ve ölçüm ayrıca gerekir.`,
  ],
  table: dailyTable,
};

/* Örnek 1: Sirke ve kireç, NŞA hacmi. */
export const vinegar216 = { aceticMmol: 300, caco3Mmol: 200 } as const;
const vExtentAcid = vinegar216.aceticMmol / (carbonateProtons216 / dAcetic.eq);
const vExtent = Math.min(vExtentAcid, vinegar216.caco3Mmol);
guard(vExtent === vExtentAcid && Number.isInteger(vExtent), "sirke örneğinde asit sınırlayıcı olmalı");
export const vinegarAnswer216 = { dissolved: vExtent, left: vinegar216.caco3Mmol - vExtent, co2: vExtent };
/* Örnek 2: Eşit mol sitrik ve asetik asit. M(CaCO₃) atom kütlelerinden. */
export const citricAcetic216 = { mmol: 60 } as const;
export const caco3Molar216 = molarMass216({ Ca: 1, C: 1, O: 3 });
const caCitric = (citricAcetic216.mmol * dCitric.eq) / carbonateProtons216;
const caAcetic = (citricAcetic216.mmol * dAcetic.eq) / carbonateProtons216;
guard(Number.isInteger(caCitric) && Number.isInteger(caAcetic), "çözünen kireç tam milimol olmalı");
const gCitric = (caCitric * caco3Molar216) / 1000;
const gAcetic = (caAcetic * caco3Molar216) / 1000;
export const citricAceticAnswer216 = { caCitric, caAcetic, gCitric, gAcetic };

export const dailyExamples216: WorkedExample[] = [
  {
    title: "Sirke biterse kireç kalır",
    prompt: `Kireçlenmiş bir yüzeyde ${mol216(vinegar216.caco3Mmol)} mol CaCO₃ var. Üzerine ${mol216(vinegar216.aceticMmol)} mol CH₃COOH içeren sirke dökülüyor. Yalnız 2CH₃COOH + CaCO₃ → Ca(CH₃COO)₂ + CO₂ + H₂O tepkimesi sınırlayıcı madde bitene kadar yürüyor. Kaç mol CaCO₃ çözünür, kaç mol kalır? Çıkan CO₂ NŞA’da (0 °C, 1 atm, 1 mol gaz ${dec216(molarVolumeTenthsL216, 10)} L) kaç litre olur?`,
    strategy: "Her girenin molünü katsayısına böl; küçük bölüm tepkime ilerlemesidir.",
    steps: [
      { label: "İlerleme", expression: `asit: ${mol216(vinegar216.aceticMmol)}/2 = ${mol216(vExtentAcid)}; CaCO₃: ${mol216(vinegar216.caco3Mmol)}/1 = ${mol216(vinegar216.caco3Mmol)}`, explanation: "Asetik asit formül başına 1 H⁺ verdiğinden bir CaCO₃ için 2 molekül gerekir." },
      { label: "Sınırlayıcı", expression: `min = ${mol216(vExtent)} ⇒ ${mol216(vExtent)} mol CaCO₃ çözünür`, explanation: "Asit biter; kireç fazladır." },
      { label: "Kalan", expression: `${mol216(vinegar216.caco3Mmol)} − ${mol216(vExtent)} = ${mol216(vinegarAnswer216.left)} mol CaCO₃`, explanation: "Fazla katı yüzeyde kalır." },
      { label: "Gaz", expression: `${mol216(vExtent)} mol CO₂ · ${dec216(molarVolumeTenthsL216, 10)} = ${gasLitres216(vExtent)} L`, explanation: "CaCO₃ ile CO₂ katsayısı 1 : 1; hacim verilen NŞA koşuluyla hesaplanır." },
    ],
    answer: `${mol216(vExtent)} mol CaCO₃ çözünür, ${mol216(vinegarAnswer216.left)} mol kalır; ${gasLitres216(vExtent)} L CO₂ çıkar.`,
    check: `Tüketilen asit 2·${mol216(vExtent)} = ${mol216(vinegar216.aceticMmol)} mol; başlangıçtaki asidin tamamı.`,
    pitfall: "CH₃COOH formülündeki 4 hidrojeni sayıp asidin 4 H⁺ verdiğini düşünmek ya da gazı H₂ sanmak.",
  },
  {
    title: "Eşit mol asit, farklı kireç çözme",
    prompt: `İki kapta yeterince CaCO₃ var. Birinci kaba ${mol216(citricAcetic216.mmol)} mol sitrik asit (C₆H₈O₇, formül başına ${dCitric.eq} H⁺ verir), ikinci kaba ${mol216(citricAcetic216.mmol)} mol asetik asit (CH₃COOH, formül başına ${dAcetic.eq} H⁺ verir) ekleniyor. Yalnız CaCO₃ + 2H⁺ → Ca²⁺ + CO₂ + H₂O tepkimesi asit bitene kadar yürüyor. Atom kütleleri: Ca = ${atomicMass216.Ca}, C = ${atomicMass216.C}, O = ${atomicMass216.O} g/mol. Her kapta kaç gram CaCO₃ çözünür?`,
    strategy: "Asit molünü verilebilen H⁺ sayısıyla çarp, sonra 2 H⁺ başına bir CaCO₃ say.",
    steps: [
      { label: "H⁺", expression: `sitrik: ${mol216(citricAcetic216.mmol)}·${dCitric.eq} = ${mol216(citricAcetic216.mmol * dCitric.eq)}; asetik: ${mol216(citricAcetic216.mmol)}·${dAcetic.eq} = ${mol216(citricAcetic216.mmol * dAcetic.eq)} mol`, explanation: "Formüldeki bütün H atomları sayılmaz, yalnız verilen asidik H sayısı kullanılır." },
      { label: "CaCO₃ molü", expression: `${mol216(citricAcetic216.mmol * dCitric.eq)}/2 = ${mol216(caCitric)}; ${mol216(citricAcetic216.mmol * dAcetic.eq)}/2 = ${mol216(caAcetic)} mol`, explanation: "Bir CaCO₃ için 2 H⁺ gerekir." },
      { label: "Mol kütlesi", expression: `M(CaCO₃) = ${atomicMass216.Ca} + ${atomicMass216.C} + 3·${atomicMass216.O} = ${caco3Molar216} g/mol`, explanation: "Formüldeki atomlar toplanır." },
      { label: "Kütle", expression: `${mol216(caCitric)}·${caco3Molar216} = ${gramText(gCitric)} g; ${mol216(caAcetic)}·${caco3Molar216} = ${gramText(gAcetic)} g`, explanation: "Eşit mol asitler eşit kireç çözmez." },
    ],
    answer: `Sitrik asitli kapta ${gramText(gCitric)} g, asetik asitli kapta ${gramText(gAcetic)} g CaCO₃ çözünür.`,
    check: `Oran ${gramText(gCitric)}/${gramText(gAcetic)} = ${dCitric.eq / dAcetic.eq}, verilebilen H⁺ sayılarının oranıdır.`,
    pitfall: `H atomu sayılarını (${dCitric.hAtoms} ve ${dAcetic.hAtoms}) kullanıp oranı ${dCitric.hAtoms / dAcetic.hAtoms} bulmak.`,
  },
];

export const dailySupplement216 = {
  title: dailyTitle,
  figureTitle: dailyTitle,
  paragraphs: dailySection216.paragraphs,
  summary: `Sirke–asetik asit (${dAcetic.eq} H⁺), limon–sitrik asit (${dCitric.eq} H⁺), mide özsuyu–HCl (${dHcl.eq} H⁺). Yemek sodası ${dBicarb.formula} ${dBicarb.eq}, çamaşır sodası ${dSoda.formula} ${dSoda.eq} H⁺ tüketir ve CO₂ verir. CaCO₃ + 2H⁺: ${mol216(dailySampleMmol216)} mol sitrik asit ${mol216(dCitric.caco3Mmol)}, asetik asit ${mol216(dAcetic.caco3Mmol)} mol kireç çözer.`,
  appendSection: true as const,
  table: dailyTable,
  examples: dailyExamples216,
};

/* =====================================================================
 * 5 · Sabun ve deterjan: sabunlaşma bilançosu
 * ===================================================================== */

/** Aynı R gruplu yağ + 3 baz → gliserol + 3 sabun. */
export const saponBase216 = 3;
export interface Sapon216 { fatMmol: number; baseMmol: number; base: "NaOH" | "KOH" }
export const saponRows216In: readonly Sapon216[] = [
  { fatMmol: 100, baseMmol: 300, base: "NaOH" },
  { fatMmol: 100, baseMmol: 240, base: "NaOH" },
  { fatMmol: 100, baseMmol: 450, base: "NaOH" },
  { fatMmol: 50, baseMmol: 150, base: "KOH" },
  { fatMmol: 200, baseMmol: 540, base: "KOH" },
];
export const saponify216 = ({ fatMmol, baseMmol, base }: Sapon216) => {
  const byBase = baseMmol / saponBase216;
  const extent = Math.min(fatMmol, byBase);
  const soap = saponBase216 * extent;
  const glycerol = extent;
  const fatLeft = fatMmol - extent;
  const baseLeft = baseMmol - soap;
  const limiting = fatLeft === 0 && baseLeft === 0 ? "ikisi birlikte" as const : fatLeft === 0 ? "yağ" as const : base;
  return { fatMmol, baseMmol, base, extent, soap, glycerol, fatLeft, baseLeft, limiting, soapFormula: base === "NaOH" ? "RCOONa" : "RCOOK" };
};
const saponRows = saponRows216In.map(saponify216);
saponRows.forEach((r) => {
  guard([r.extent, r.soap, r.glycerol, r.fatLeft, r.baseLeft].every((x) => Number.isInteger(x) && x >= 0), "sabunlaşma miktarları tam ve negatif olmayan milimol olmalı");
  guard(r.soap === 3 * r.glycerol, "sabun gliserolün 3 katı olmalı");
  guard(r.soap <= 3 * r.fatMmol, "fazla baz sabunu yağın 3 katının üstüne çıkaramaz");
});
const [sEq, sBaseLimited, sFatLimited] = saponRows;
guard(sBaseLimited.limiting === "NaOH" && sFatLimited.limiting === "yağ" && sEq.limiting === "ikisi birlikte", "örnek satırlar sınırlayıcıyı göstermeli");
/** 2RCOO⁻ + Ca²⁺ → Ca(RCOO)₂(k): bir Ca²⁺ iki sabun anyonu bağlar. */
export const soapPerCalcium216 = 2;
const calciumCapacity = sEq.soap / soapPerCalcium216;
const saponTable = {
  layout: "table" as const,
  headers: ["Başlangıç", "Sınırlayıcı", "Sabun", "Gliserol", "Artan"],
  rows: saponRows.map((r) => [
    `${mol216(r.fatMmol)} mol yağ + ${mol216(r.baseMmol)} mol ${r.base}`,
    r.limiting === "ikisi birlikte" ? "ikisi birlikte biter" : `${r.limiting}: ${r.limiting === "yağ" ? `${mol216(r.fatMmol)}/1` : `${mol216(r.baseMmol)}/3`} = ${mol216(r.extent)}`,
    `${mol216(r.soap)} mol ${r.soapFormula}`,
    `${mol216(r.glycerol)} mol`,
    r.fatLeft ? `${mol216(r.fatLeft)} mol yağ` : r.baseLeft ? `${mol216(r.baseLeft)} mol ${r.base}` : "yok",
  ]),
};
const saponTitle = "Sabunlaşmada yağ ve bazı 1 : 3 oranıyla karşılaştır";

export const saponSection216: GuideSection = {
  title: saponTitle,
  figureTitle: saponTitle,
  paragraphs: [
    `Aynı R gruplarıyla temsil edilen bir yağ molekülünde üç ester bağı vardır: yağ + ${saponBase216}NaOH → gliserol + ${saponBase216}RCOONa. Her girenin molü katsayısına bölünür; küçük bölüm tepkime ilerlemesini verir. Oluşan sabun ilerlemenin ${saponBase216} katı, gliserol ise ilerlemenin kendisi kadardır.`,
    `${mol216(sBaseLimited.fatMmol)} mol yağ ile ${mol216(sBaseLimited.baseMmol)} mol NaOH için bölümler ${mol216(sBaseLimited.fatMmol)} ve ${mol216(sBaseLimited.baseMmol / 3)} olur. NaOH sınırlıdır; ${mol216(sBaseLimited.soap)} mol sabun ve ${mol216(sBaseLimited.glycerol)} mol gliserol oluşur, ${mol216(sBaseLimited.fatLeft)} mol yağ artar. Baz fazla olduğunda sabun, yağ molünün ${saponBase216} katında kalır; ${mol216(sFatLimited.baseMmol)} mol NaOH ile de ${mol216(sFatLimited.soap)} mol sabun oluşur ve fazla baz artar.`,
    `KOH ile aynı oran geçerlidir ve RCOOK oluşur; potasyum tuzları genellikle daha yumuşak sabunların yapımında kullanılır. Oluşan sabun anyonları sert suda 2RCOO⁻ + Ca²⁺ → Ca(RCOO)₂(k) ile bağlanır: ${mol216(sEq.soap)} mol sabun anyonu en çok ${mol216(calciumCapacity)} mol Ca²⁺ bağlar.`,
  ],
  table: saponTable,
};

/* Örnek 1: Sabunlaşma ardından sert su. */
export const soapHardWater216 = { fatMmol: 20, naohMmol: 60, calciumMmol: 25 } as const;
const shw = saponify216({ fatMmol: soapHardWater216.fatMmol, baseMmol: soapHardWater216.naohMmol, base: "NaOH" });
const shwPrecip = Math.min(soapHardWater216.calciumMmol, shw.soap / soapPerCalcium216);
const shwSoapLeft = shw.soap - soapPerCalcium216 * shwPrecip;
guard(shw.baseLeft === 0 && shw.fatLeft === 0 && shwPrecip === soapHardWater216.calciumMmol && shwSoapLeft > 0, "sert su örneğinde Ca²⁺ sınırlı olmalı");
export const soapHardWaterAnswer216 = { soap: shw.soap, precipitate: shwPrecip, soapLeft: shwSoapLeft };
/* Örnek 2: Tristearin kütle bilançosu. */
export const tristearin216 = { C: 57, H: 110, O: 6 } as const;
export const sodiumStearate216 = { C: 18, H: 35, O: 2, Na: 1 } as const;
export const glycerol216 = { C: 3, H: 8, O: 3 } as const;
export const saponMasses216 = {
  fat: molarMass216(tristearin216),
  naoh: molarMass216({ Na: 1, O: 1, H: 1 }),
  soap: molarMass216(sodiumStearate216),
  glycerol: molarMass216(glycerol216),
};
// Atom korunumu: tristearin + 3NaOH = gliserol + 3 sodyum stearat.
(["C", "H", "O", "Na"] as const).forEach((el) => {
  const left = ((tristearin216 as Partial<Record<Element216, number>>)[el] ?? 0) + 3 * (el === "Na" || el === "O" || el === "H" ? 1 : 0);
  const right = ((glycerol216 as Partial<Record<Element216, number>>)[el] ?? 0) + 3 * ((sodiumStearate216 as Partial<Record<Element216, number>>)[el] ?? 0);
  guard(left === right, `sabunlaşmada ${el} atomları korunmalı`);
});
guard(saponMasses216.fat + 3 * saponMasses216.naoh === saponMasses216.glycerol + 3 * saponMasses216.soap, "kütle korunmalı");
export const stearinGrams216 = 89;
const stMolMmol = (stearinGrams216 * 1000) / saponMasses216.fat;
guard(Number.isInteger(stMolMmol), "tristearin molü tam milimol olmalı");
const stNaoh = (3 * stMolMmol * saponMasses216.naoh) / 1000;
const stSoap = (3 * stMolMmol * saponMasses216.soap) / 1000;
const stGly = (stMolMmol * saponMasses216.glycerol) / 1000;
export const stearinAnswer216 = { mmol: stMolMmol, naoh: stNaoh, soap: stSoap, glycerol: stGly };

export const saponExamples216: WorkedExample[] = [
  {
    title: "Sabunu yap, sonra sert suda say",
    prompt: `Aynı R gruplu ${mol216(soapHardWater216.fatMmol)} mol yağ, ${mol216(soapHardWater216.naohMmol)} mol NaOH ile yağ + 3NaOH → gliserol + 3RCOONa tepkimesine göre tamamen sabunlaşıyor. Oluşan sabun, ${mol216(soapHardWater216.calciumMmol)} mol Ca²⁺ içeren sert suya ekleniyor ve yalnız 2RCOO⁻ + Ca²⁺ → Ca(RCOO)₂(k) tepkimesi tamamlanıyor. Kaç mol çökelek oluşur, kaç mol sabun anyonu serbest kalır?`,
    strategy: "Önce sabunlaşma katsayısıyla sabun molünü bul, sonra 2 : 1 oranıyla Ca²⁺ ile karşılaştır.",
    steps: [
      { label: "Sabun", expression: `${mol216(soapHardWater216.fatMmol)}·3 = ${mol216(shw.soap)} mol RCOONa`, explanation: `${mol216(soapHardWater216.naohMmol)} mol NaOH tam yetecek kadardır; artan baz yok.` },
      { label: "Ca²⁺ ihtiyacı", expression: `${mol216(soapHardWater216.calciumMmol)} mol Ca²⁺ · 2 = ${mol216(2 * soapHardWater216.calciumMmol)} mol RCOO⁻`, explanation: `${mol216(shw.soap)} mol sabun yeterlidir; Ca²⁺ sınırlıdır.` },
      { label: "Çökelek", expression: `${mol216(shwPrecip)} mol Ca(RCOO)₂`, explanation: "Her Ca²⁺ bir çökelek birimi oluşturur." },
      { label: "Serbest sabun", expression: `${mol216(shw.soap)} − ${mol216(2 * shwPrecip)} = ${mol216(shwSoapLeft)} mol RCOO⁻`, explanation: "Temizlik için bu kalan anyonlar kullanılabilir." },
    ],
    answer: `${mol216(shwPrecip)} mol çökelek; ${mol216(shwSoapLeft)} mol sabun anyonu serbest kalır.`,
    check: `Çökelekteki ${mol216(2 * shwPrecip)} + serbest ${mol216(shwSoapLeft)} = ${mol216(shw.soap)} mol sabun anyonu.`,
    pitfall: `Sabun molünü yağ molüne eşit (${mol216(soapHardWater216.fatMmol)}) alıp sert suyun bütün sabunu bağladığını sanmak.`,
  },
  {
    title: "Tristearinde kütle korunur",
    prompt: `Tristearin (C₅₇H₁₁₀O₆) NaOH ile C₅₇H₁₁₀O₆ + 3NaOH → C₃H₈O₃ (gliserol) + 3C₁₇H₃₅COONa (sodyum stearat) denklemine göre tamamen sabunlaşıyor. Atom kütleleri: H = ${atomicMass216.H}, C = ${atomicMass216.C}, O = ${atomicMass216.O}, Na = ${atomicMass216.Na} g/mol. ${stearinGrams216} g tristearin için kaç gram NaOH gerekir; kaç gram sabun ve kaç gram gliserol oluşur?`,
    strategy: "Mol kütlelerini formülden hesapla, tristearin molünü bul, katsayılarla diğer maddelere geç.",
    steps: [
      { label: "Mol kütleleri", expression: `tristearin ${saponMasses216.fat}, NaOH ${saponMasses216.naoh}, sodyum stearat ${saponMasses216.soap}, gliserol ${saponMasses216.glycerol} g/mol`, explanation: `Örneğin tristearin: 57·${atomicMass216.C} + 110·${atomicMass216.H} + 6·${atomicMass216.O} = ${saponMasses216.fat}.` },
      { label: "Yağ molü", expression: `${stearinGrams216}/${saponMasses216.fat} = ${mol216(stMolMmol)} mol`, explanation: "Verilen kütle mol kütlesine bölünür." },
      { label: "NaOH", expression: `3·${mol216(stMolMmol)}·${saponMasses216.naoh} = ${gramText(stNaoh)} g`, explanation: "Üç ester bağı üç baz eşdeğeri ister." },
      { label: "Ürünler", expression: `sabun 3·${mol216(stMolMmol)}·${saponMasses216.soap} = ${gramText(stSoap)} g; gliserol ${mol216(stMolMmol)}·${saponMasses216.glycerol} = ${gramText(stGly)} g`, explanation: "Sabun gliserolün 3 katı moldür." },
    ],
    answer: `${gramText(stNaoh)} g NaOH gerekir; ${gramText(stSoap)} g sodyum stearat ve ${gramText(stGly)} g gliserol oluşur.`,
    check: `${stearinGrams216} + ${gramText(stNaoh)} = ${gramText(stearinGrams216 + stNaoh)} g = ${gramText(stSoap)} + ${gramText(stGly)} g; kütle korunur.`,
    pitfall: `Yağ ile bazı 1 : 1 alıp ${gramText((stMolMmol * saponMasses216.naoh) / 1000)} g NaOH bulmak; üç ester bağının her biri bir NaOH tüketir.`,
  },
];

export const saponSupplement216 = {
  title: saponTitle,
  figureTitle: saponTitle,
  paragraphs: saponSection216.paragraphs,
  summary: `Yağ + 3NaOH → gliserol + 3RCOONa. İlerleme = min(yağ/1, baz/3); sabun = 3·ilerleme, gliserol = ilerleme. ${mol216(sBaseLimited.fatMmol)} mol yağ + ${mol216(sBaseLimited.baseMmol)} mol NaOH → ${mol216(sBaseLimited.soap)} mol sabun, ${mol216(sBaseLimited.fatLeft)} mol yağ artar. KOH → RCOOK. Sert suda 2 sabun anyonu 1 Ca²⁺ bağlar.`,
  appendSection: true as const,
  table: saponTable,
  examples: saponExamples216,
};

export const depth216Supplements = {
  "asit-baz-tuz-ozellikleri": [saltSupplement216],
  "asit-baz-tepkimeleri": [mixSupplement216],
  "asit-baz-metaller": [metalSupplement216],
  "hayatimizda-asit-baz": [dailySupplement216],
  "sabun-deterjan-temizlik": [saponSupplement216],
};
