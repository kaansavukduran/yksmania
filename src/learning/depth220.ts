import type { GuideSection, WorkedExample } from "./guides/types";
import {
  CLASS_OF209, EN_SOURCE209, EN_SOURCE_SHORT209, NAMES209, PAULING_EN209, deltaEN209, enText209, negativeEnd209,
  place209, shellText209, shells209, symbol209, zOf209, type Symbol209,
} from "./depth209";

/*
 * TYT Kimya kimyasal bağ ve etkileşim derinleştirmesi (0.220). Kabul edilmiş
 * rehberler değişmez; tablo bölümü, iki özgün çözümlü örnek ve bölüm çizimi
 * görüntüleme katmanında eklenir. Ana grup iyon yükleri gruptan, iyonik
 * formüller yük dengesinden (ebob ile sadeleştirerek), adlar katyon + anyon
 * adından, moleküler adlar atom sayılarından ve Yunanca sayı ön eklerinden,
 * Lewis bağ ve ortaklanmamış çift sayıları değerlik elektronlarından üretilir.
 * Ölçülmüş tek büyüklük Pauling elektronegatifliğidir; depth209’daki CRC
 * sabitinden okunur, burada kopyalanmaz. Paragraflar, tablolar, çizim
 * okumaları ve Kopya Kâğıdı özetleri aynı verilerden yazılır; metindeki genel
 * yargılar modül yüklenirken denetlenir.
 */

const guard = (ok: boolean, claim: string) => {
  if (!ok) throw new Error(`depth220: veri bu yargıyı artık desteklemiyor: ${claim}`);
};
const list = (xs: readonly (string | number)[]) => xs.join(", ");
const joinTr = (xs: readonly string[]) => (xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} ve ${xs.at(-1)}`);
const lowerTr = (s: string) => s.toLocaleLowerCase("tr-TR");
const upperFirst = (s: string) => s.charAt(0).toLocaleUpperCase("tr-TR") + s.slice(1);
const SUB = "₀₁₂₃₄₅₆₇₈₉";
const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
export const sub220 = (n: number) => (n === 1 ? "" : [...String(n)].map((d) => SUB[Number(d)]).join(""));
const supDigits = (n: number) => [...String(n)].map((d) => SUP[Number(d)]).join("");
/** İyon yükü üst simgesi: +1 → ⁺, −2 → ²⁻. */
export const chargeText220 = (q: number) => `${Math.abs(q) === 1 ? "" : supDigits(Math.abs(q))}${q > 0 ? "⁺" : "⁻"}`;
/** İşaretli yük düz yazıda: +2, −3. */
const signed = (q: number) => (q > 0 ? `+${q}` : `−${-q}`);
export const gcd220 = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd220(b, a % b));
const lcm = (a: number, b: number) => (a * b) / gcd220(a, b);
const ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII"];
export const roman220 = (n: number) => {
  const r = ROMAN[n];
  if (!r) throw new Error(`depth220: ${n} için Roma rakamı tanımlı değil`);
  return r;
};

const en = (s: Symbol209) => {
  const x = PAULING_EN209[s];
  if (x === undefined) throw new Error(`depth220: ${s} için Pauling değeri yok`);
  return x;
};
const valence = (s: Symbol209) => place209(zOf209(s)).valence;
/** Ana grup elementinde A numarası (He dışı): değerlik elektronu. */
const groupA = (s: Symbol209) => {
  const { group } = place209(zOf209(s));
  return group <= 2 ? group : group - 10;
};

/* =================================================================
 * Ortak model 1 · Gruptan iyon yükü ve yük dengesinden formül
 * ================================================================= */

/**
 * Z ≤ 20 ana grup elementinin TYT’deki tek atomlu iyon yükü: 1A, 2A, 3A
 * metalleri A numarası kadar elektron verir (+A); 5A, 6A, 7A ametalleri
 * sekize tamamlamak için 8 − A elektron alır (−(8 − A)). Diğerleri için
 * bu kısa kural kullanılmaz.
 */
export const ionCharge220 = (s: Symbol209): number => {
  const a = groupA(s);
  const cls = CLASS_OF209[s];
  if (cls === "metal" && a <= 3) return a;
  if (cls === "ametal" && s !== "H" && a >= 5 && a <= 7) return -(8 - a);
  throw new Error(`depth220: ${s} için gruptan tek atomlu iyon yükü kuralı uygulanmaz`);
};

export interface Ion220 {
  /** Formülde yazılan kısım: Na, NH₄, SO₄. */
  formula: string;
  charge: number;
  name: string;
  /** Tek iyondaki atomlar, formüldeki sırayla. */
  atoms: readonly (readonly [string, number])[];
  polyatomic: boolean;
}
const ANION_ROOT: Partial<Record<Symbol209, string>> = { F: "florür", Cl: "klorür", O: "oksit", S: "sülfür", N: "nitrür", P: "fosfür" };
/** Tek atomlu ana grup iyonu: yük gruptan, ad elementten (katyon) ya da dersteki anyon adından. */
export const monoIon220 = (s: Symbol209): Ion220 => {
  const charge = ionCharge220(s);
  const name = charge > 0 ? lowerTr(NAMES209[s]) : ANION_ROOT[s];
  if (!name) throw new Error(`depth220: ${s} anyon adı derste yok`);
  return { formula: s, charge, name, atoms: [[s, 1]], polyatomic: false };
};
/** Dersteki yaygın çok atomlu iyonlar (yük ve atom sayıları dersten). */
export const POLYATOMIC220 = {
  NH4: { formula: "NH₄", charge: 1, name: "amonyum", atoms: [["N", 1], ["H", 4]], polyatomic: true },
  NO3: { formula: "NO₃", charge: -1, name: "nitrat", atoms: [["N", 1], ["O", 3]], polyatomic: true },
  NO2: { formula: "NO₂", charge: -1, name: "nitrit", atoms: [["N", 1], ["O", 2]], polyatomic: true },
  OH: { formula: "OH", charge: -1, name: "hidroksit", atoms: [["O", 1], ["H", 1]], polyatomic: true },
  SO4: { formula: "SO₄", charge: -2, name: "sülfat", atoms: [["S", 1], ["O", 4]], polyatomic: true },
  SO3: { formula: "SO₃", charge: -2, name: "sülfit", atoms: [["S", 1], ["O", 3]], polyatomic: true },
  CO3: { formula: "CO₃", charge: -2, name: "karbonat", atoms: [["C", 1], ["O", 3]], polyatomic: true },
  PO4: { formula: "PO₄", charge: -3, name: "fosfat", atoms: [["P", 1], ["O", 4]], polyatomic: true },
} as const satisfies Record<string, Ion220>;
/** Dersteki değişken yüklü metal: Fe²⁺ demir(II), Fe³⁺ demir(III). */
export const ironIon220 = (charge: 2 | 3): Ion220 => ({ formula: "Fe", charge, name: `demir(${roman220(charge)})`, atoms: [["Fe", 1]], polyatomic: false });
export const ionText220 = (ion: Ion220) => `${ion.formula}${chargeText220(ion.charge)}`;

export interface Salt220 {
  cation: Ion220;
  anion: Ion220;
  nc: number;
  na: number;
  formula: string;
  name: string;
  /** Formül birimi başına atom sayıları, formüldeki sırayla. */
  atoms: [string, number][];
}
const part = (ion: Ion220, n: number) => (n === 1 ? ion.formula : ion.polyatomic ? `(${ion.formula})${sub220(n)}` : `${ion.formula}${sub220(n)}`);
/** Toplam yükü sıfırlayan en küçük tam sayılar: nc = |qa| / ebob, na = qc / ebob. */
export const salt220 = (cation: Ion220, anion: Ion220): Salt220 => {
  if (cation.charge <= 0 || anion.charge >= 0) throw new Error("depth220: katyon pozitif, anyon negatif olmalı");
  const g = gcd220(cation.charge, -anion.charge);
  const nc = -anion.charge / g;
  const na = cation.charge / g;
  const counts = new Map<string, number>();
  for (const [ion, n] of [[cation, nc], [anion, na]] as const)
    for (const [el, k] of ion.atoms) counts.set(el, (counts.get(el) ?? 0) + k * n);
  return { cation, anion, nc, na, formula: `${part(cation, nc)}${part(anion, na)}`, name: `${cation.name} ${anion.name}`, atoms: [...counts] };
};
export const atomTotal220 = (atoms: readonly (readonly [string, number])[]) => atoms.reduce((a, [, n]) => a + n, 0);
const atomsText = (atoms: readonly (readonly [string, number])[]) => atoms.map(([el, n]) => `${n} ${el}`).join(", ");
/** Formüldeki metal sayısı ve anyon toplam yükünden tek metal iyonunun yükü. */
export const metalChargeFromNeutrality220 = (metalCount: number, anion: Ion220, anionCount: number) => (-anion.charge * anionCount) / metalCount;

/* =================================================================
 * 1 · İyonik bağ: sınıf ve ΔEN ile bağ türü
 * ================================================================= */

export type BondType220 = "iyonik" | "polar kovalent" | "apolar kovalent";
/** TYT sınıflaması: metal–ametal iyonik; ametal–ametal aynı element apolar, farklı element polar kovalent. */
export const bondType220 = (a: Symbol209, b: Symbol209): BondType220 => {
  const [ca, cb] = [CLASS_OF209[a], CLASS_OF209[b]];
  const metals = [ca, cb].filter((c) => c === "metal").length;
  const nonmetals = [ca, cb].filter((c) => c === "ametal").length;
  if (metals === 1 && nonmetals === 1) return "iyonik";
  if (nonmetals === 2) return a === b ? "apolar kovalent" : "polar kovalent";
  throw new Error(`depth220: ${a}–${b} bu sınıflamanın dışında`);
};
/** Kovalent bağ sayısı (değerlik): H için 2 − 1, diğerlerinde 8 − değerlik e⁻. */
export const bondNeed220 = (s: Symbol209) => (s === "H" ? 2 : 8) - valence(s);
/** İki ametalin en basit molekülü: bağ ihtiyaçları ortak katta eşitlenir (H–Cl → HCl, C–H → CH₄, Cl–Cl → Cl₂). */
export const simpleMolecule220 = (a: Symbol209, b: Symbol209) => {
  if (a === b) return `${a}₂`;
  const [na, nb] = [bondNeed220(a), bondNeed220(b)];
  const m = lcm(na, nb);
  return `${a}${sub220(m / na)}${b}${sub220(m / nb)}`;
};
/** Bazı kaynaklarda kullanılan kaba ΔEN ipucu (Pauling’in yaklaşık %50 iyonik karakter sınırı); kesin sınır değildir. */
export const EN_CUE220 = 1.7;
const enCueText = enText209(EN_CUE220).replace(/0$/, "");

export const bondPairs220: [Symbol209, Symbol209][] = [
  ["Na", "Cl"], ["Mg", "O"], ["Ca", "F"], ["Al", "O"], ["H", "F"], ["H", "Cl"], ["C", "H"], ["Cl", "Cl"],
];
const classPair = (a: Symbol209, b: Symbol209) => `${CLASS_OF209[a]}–${CLASS_OF209[b]}`;
export const bondRows220 = bondPairs220.map(([a, b]) => {
  const type = bondType220(a, b);
  const d = a === b ? 0 : deltaEN209(a, b);
  const metal = CLASS_OF209[a] === "metal" ? a : b;
  const nonmetal = metal === a ? b : a;
  const s = type === "iyonik" ? salt220(monoIon220(metal), monoIon220(nonmetal)) : null;
  return { a, b, type, d, salt: s, particle: s ? `${s.formula} (${ionText220(s.cation)} ve ${ionText220(s.anion)} örgüsü)` : `${simpleMolecule220(a, b)} molekülü` };
});
const bondTable = {
  layout: "table" as const,
  headers: ["Çift", "Sınıflar", "ΔEN (Pauling)", "Bağ türü", "Formül ve tanecik"],
  rows: bondRows220.map(({ a, b, type, d, particle }) => [`${a}–${b}`, classPair(a, b), enText209(d), upperFirst(type), particle]),
};
const ionicRows = bondRows220.filter(({ type }) => type === "iyonik");
const covalentRows = bondRows220.filter(({ type }) => type !== "iyonik");
const misfits = bondRows220.filter(({ type, d }) => (type === "iyonik") !== (d >= EN_CUE220));
const rowOf = (a: Symbol209, b: Symbol209) => bondRows220.find((r) => r.a === a && r.b === b)!;
const [alO, hF, cH, clCl] = [rowOf("Al", "O"), rowOf("H", "F"), rowOf("C", "H"), rowOf("Cl", "Cl")];

guard(ionicRows.every(({ a, b }) => [CLASS_OF209[a], CLASS_OF209[b]].sort().join() === "ametal,metal"), "iyonik satırların hepsi metal–ametal çiftidir");
guard(covalentRows.every(({ a, b }) => CLASS_OF209[a] === "ametal" && CLASS_OF209[b] === "ametal"), "kovalent satırların hepsi ametal–ametal çiftidir");
guard(misfits.length === 1 && misfits[0] === hF, "tabloda kaba ΔEN ipucuyla çelişen tek satır H–F’dir");
guard(Math.abs(alO.d - hF.d) < 0.1 && alO.type !== hF.type, "Al–O ile H–F’nin ΔEN’i 0,1’den az farklıdır ama bağ türleri farklıdır");
guard(Math.min(...ionicRows.map(({ d }) => d)) === alO.d, "iyonik satırların en küçük ΔEN’i Al–O’dadır");
guard(clCl.d === 0 && clCl.type === "apolar kovalent" && cH.type === "polar kovalent" && cH.d > 0, "Cl–Cl apolar, C–H küçük farkla polar kovalenttir");
guard(ionicRows.every(({ salt }) => salt!.cation.charge * salt!.nc + salt!.anion.charge * salt!.na === 0), "her iyonik formülde toplam yük sıfırdır");

export const bondTypeSection220: GuideSection = {
  title: "Bağ türünü sınıf ve elektronegatiflik farkıyla birlikte oku",
  paragraphs: [
    `Tablodaki ${bondRows220.length} çiftte önce iki elementin sınıfına bakılır. Metal–ametal çiftinde metal atomu elektron verir, ametal atomu alır; oluşan zıt yüklü iyonlar arasındaki çekim iyonik bağdır. İki ametal elektron çiftlerini ortaklaşa kullanır: aynı elementin iki atomu apolar kovalent, farklı iki ametal polar kovalent bağ yapar. ΔEN sütunu iki atomun Pauling elektronegatiflik farkıdır (birimsiz; kaynak: ${EN_SOURCE209}).`,
    `İyon yükü gruptan okunur: 1A, 2A ve 3A metalleri A numarası kadar elektron verir; 5A, 6A ve 7A ametalleri sekize tamamlamak için 8 − A elektron alır. ${ionicRows.map(({ salt }) => `${ionText220(salt!.cation)} ile ${ionText220(salt!.anion)} → ${salt!.formula}`).join("; ")}. Kovalent satırlarda formül bağ sayısından çıkar (H için 2 − 1, diğerlerinde 8 − değerlik e⁻): ${(['H', 'C', 'Cl'] as Symbol209[]).map((s) => `${s} ${bondNeed220(s)}`).join(", ")} bağ yapar; bu yüzden ${simpleMolecule220("H", "Cl")}, ${simpleMolecule220("C", "H")} ve ${simpleMolecule220("Cl", "Cl")} yazılır.`,
    `Bazı kaynaklar “ΔEN yaklaşık ${enCueText}’den büyükse iyonik” kaba ipucunu verir. Bu tabloda ipucu bir satırda yanılır: H–F’de ΔEN = ${enText209(hF.d)} ama iki atom da ametaldir ve HF bir moleküldür. Al–O’da ΔEN = ${enText209(alO.d)}, farkı H–F’ninkinden yalnız ${enText209(Math.round((alO.d - hF.d) * 100) / 100)} büyüktür; yine de Al metal olduğu için iyonik sınıftadır. Sayısal eşik evrensel bir sınır değildir. C–H’de fark ${enText209(cH.d)} kadar küçüktür ama sıfır değildir; Cl–Cl’de fark sıfırdır.`,
  ],
  table: bondTable,
};

/* Örnek 1: atom numaralarından iyon, formül ve soy gaz benzerliği. */
export const ionPairZ220 = { x: 20, y: 7 } as const;
const xS = symbol209(ionPairZ220.x);
const yS = symbol209(ionPairZ220.y);
const xySalt = salt220(monoIon220(xS), monoIon220(yS));
export const NOBLE220 = (["He", "Ne", "Ar"] as const).map((s) => ({ s, z: zOf209(s) }));
export const nobleLike220 = (electrons: number) => NOBLE220.find(({ z }) => z === electrons)?.s ?? null;
const ionElectrons = (s: Symbol209) => zOf209(s) - ionCharge220(s);
/* Örnek 2: üç bağ ve kaba ipucu. */
export const cuePairs220: [Symbol209, Symbol209][] = [["K", "Cl"], ["H", "F"], ["O", "F"]];
const cueRows = cuePairs220.map(([a, b]) => ({ a, b, d: deltaEN209(a, b), type: bondType220(a, b), cue: deltaEN209(a, b) >= EN_CUE220 ? "iyonik" : "kovalent", neg: negativeEnd209(a, b) }));
const cueFails = cueRows.filter(({ type, cue }) => (type === "iyonik") !== (cue === "iyonik"));

guard(nobleLike220(ionElectrons(xS)) === "Ar" && nobleLike220(ionElectrons(yS)) === "Ne", "Ca²⁺ argon, N³⁻ neon elektron sayısındadır");
guard(cueFails.length === 1 && cueFails[0].a === "H" && cueFails[0].b === "F", "üç bağda kaba ipucu yalnız H–F’de yanılır");

export const bondTypeExamples220: WorkedExample[] = [
  {
    title: "Atom numarasından iyon yükü, formül ve elektron sayısı",
    prompt: `Nötr X atomunun atom numarası ${ionPairZ220.x}, nötr Y atomununki ${ionPairZ220.y}’dir. X ile Y arasında oluşan iyonik bileşikte iyonların yükleri nedir? Bileşiğin en küçük formülü nedir? Her iyonun elektron sayısı hangi soy gazınkine eşittir? (He: 2, Ne: 10, Ar: 18)`,
    strategy: "Katman dağılımından grubu bul. Metal A numarası kadar elektron verir, ametal 8 − A elektron alır. Sonra toplam yükü sıfırlayan en küçük tam sayıları seç.",
    steps: [
      { label: "X", expression: `${shellText209(shells209(ionPairZ220.x))} ⇒ ${groupA(xS)}A, metal ⇒ X${chargeText220(ionCharge220(xS))}`, explanation: `En dıştaki ${valence(xS)} elektronu verir; ${ionPairZ220.x} proton, ${ionElectrons(xS)} elektron kalır.` },
      { label: "Y", expression: `${shellText209(shells209(ionPairZ220.y))} ⇒ ${groupA(yS)}A, ametal ⇒ Y${chargeText220(ionCharge220(yS))}`, explanation: `Sekize tamamlamak için ${8 - groupA(yS)} elektron alır; ${ionPairZ220.y} proton, ${ionElectrons(yS)} elektron olur.` },
      { label: "Yük dengesi", expression: `${xySalt.nc} · (${signed(ionCharge220(xS))}) + ${xySalt.na} · (${signed(ionCharge220(yS))}) = 0`, explanation: `${Math.abs(ionCharge220(xS))} ile ${Math.abs(ionCharge220(yS))}’ün ortak katı ${lcm(Math.abs(ionCharge220(xS)), Math.abs(ionCharge220(yS)))}; ebob ${gcd220(Math.abs(ionCharge220(xS)), Math.abs(ionCharge220(yS)))} olduğundan oran sadeleşmez.` },
      { label: "Elektronlar", expression: `X${chargeText220(ionCharge220(xS))}: ${ionElectrons(xS)} e⁻ = ${nobleLike220(ionElectrons(xS))}; Y${chargeText220(ionCharge220(yS))}: ${ionElectrons(yS)} e⁻ = ${nobleLike220(ionElectrons(yS))}`, explanation: "İki iyon da soy gaz elektron sayısına ulaşır; proton sayıları değişmez." },
    ],
    answer: `X${chargeText220(ionCharge220(xS))} ve Y${chargeText220(ionCharge220(yS))}; formül X${sub220(xySalt.nc)}Y${sub220(xySalt.na)} (${xySalt.formula}, ${xySalt.name}). X${chargeText220(ionCharge220(xS))} ${ionElectrons(xS)} elektronla ${lowerTr(NAMES209[nobleLike220(ionElectrons(xS))!])}, Y${chargeText220(ionCharge220(yS))} ${ionElectrons(yS)} elektronla ${lowerTr(NAMES209[nobleLike220(ionElectrons(yS))!])} gibidir.`,
    check: `Formül biriminde ${xySalt.nc} · ${ionCharge220(xS)} = ${xySalt.nc * ionCharge220(xS)} pozitif ve ${xySalt.na} · ${-ionCharge220(yS)} = ${-xySalt.na * ionCharge220(yS)} negatif yük vardır; toplam sıfır.`,
    pitfall: "Y’nin yükünü değerlik elektronu kadar −5 sanmak. Ametal sekize tamamlamak için 8 − A kadar elektron alır: 5A için −3.",
  },
  {
    title: "Kaba ΔEN ipucu nerede yanılır?",
    prompt: `Pauling elektronegatiflikleri: ${[...new Set(cuePairs220.flat())].map((s) => `${s} ${enText209(en(s))}`).join(", ")}. ${list(cuePairs220.map(([a, b]) => `${a}–${b}`))} bağlarının ΔEN değerlerini hesapla. Bağ türlerini metal–ametal sınıfıyla belirle. “ΔEN ${enCueText}’den büyükse iyonik” kısa yolu hangi bağda yanlış sonuç verir?`,
    strategy: "Önce farkı hesapla, sonra iki atomun sınıfına bak. Sınıf kararını sayısal ipucuyla karşılaştır.",
    steps: [
      ...cueRows.map(({ a, b, d, type, neg }) => ({
        label: `${a}–${b}`,
        expression: `|${enText209(en(a))} − ${enText209(en(b))}| = ${enText209(d)} · ${classPair(a, b)}`,
        explanation: `${upperFirst(type)}; kısmi negatif uç ya da anyon ${neg}.`,
      })),
      { label: "İpucuyla karşılaştır", expression: cueRows.map(({ a, b, cue }) => `${a}–${b}: ipucu ${cue}`).join("; "), explanation: `${cueFails.map(({ a, b }) => `${a}–${b}`).join(", ")} ametal–ametal olduğu hâlde ipucu iyonik der.` },
    ],
    answer: `${cueRows.map(({ a, b, d, type }) => `${a}–${b}: ΔEN ${enText209(d)}, ${type}`).join("; ")}. Kısa yol ${cueFails.map(({ a, b }) => `${a}–${b}`).join(", ")} bağında yanılır.`,
    check: `HF iki ametalden oluşan bir moleküldür; tabloda Al–O (${enText209(alO.d)}) ile H–F (${enText209(hF.d)}) farkları neredeyse eşittir ama türleri ayrıdır.`,
    pitfall: "ΔEN sayısını tek ölçüt sanıp H–F’yi iyonik saymak. TYT düzeyinde önce metal–ametal sınıfına bak; sayı bağın ne kadar kutuplu olduğunu karşılaştırır.",
  },
];

export const bondTypeSupplement220 = {
  title: bondTypeSection220.title,
  figureTitle: bondTypeSection220.title,
  paragraphs: bondTypeSection220.paragraphs,
  summary: `Metal–ametal → iyonik (iyon yükü: 1A–3A +A, 5A–7A −(8 − A)). Ametal–ametal → kovalent: aynı element apolar, farklı element polar. ΔEN (Pauling, ${EN_SOURCE_SHORT209}) kutupluluğu karşılaştırır; “${enCueText} üstü iyonik” kaba ipucudur: ${hF.a}–${hF.b} ${enText209(hF.d)} ama kovalent, ${alO.a}–${alO.b} ${enText209(alO.d)} iyonik.`,
  appendSection: true as const,
  table: bondTable,
  examples: bondTypeExamples220,
};

/* =================================================================
 * 2 · İyonik bileşik adlandırma: katyon × anyon ızgarası
 * ================================================================= */

export const gridCations220: Ion220[] = [monoIon220("Na"), monoIon220("Ca"), monoIon220("Al"), POLYATOMIC220.NH4, ironIon220(2), ironIon220(3)];
export const gridAnions220: Ion220[] = [monoIon220("Cl"), POLYATOMIC220.NO3, POLYATOMIC220.SO4, POLYATOMIC220.PO4];
export const saltGrid220 = gridCations220.map((c) => gridAnions220.map((a) => salt220(c, a)));
const nameTable = {
  layout: "table" as const,
  headers: ["Katyon", ...gridAnions220.map((a) => `${ionText220(a)} ${a.name}`)],
  rows: saltGrid220.map((row, i) => [`${ionText220(gridCations220[i])} ${gridCations220[i].name}`, ...row.map((s) => `${s.formula} · ${s.name}`)]),
};
const cell = (c: number, a: number) => saltGrid220[c][a];
const flat = saltGrid220.flat();
const parens = flat.filter(({ formula }) => formula.includes("("));
const oneToOne = flat.filter(({ nc, na }) => nc === 1 && na === 1);

guard(flat.every((s) => s.cation.charge * s.nc + s.anion.charge * s.na === 0 && gcd220(s.nc, s.na) === 1), "her hücrede toplam yük sıfır ve oran en küçüktür");
guard(oneToOne.every(({ cation, anion }) => cation.charge === -anion.charge) && flat.filter(({ cation, anion }) => cation.charge === -anion.charge).length === oneToOne.length,
  "1:1 oran tam olarak yük büyüklükleri eşit olduğunda çıkar");
guard(parens.every(({ anion, cation, na, nc }) => (anion.polyatomic && na > 1) || (cation.polyatomic && nc > 1)), "parantez yalnız birden çok çok atomlu iyonda yazılır");
guard(flat.filter(({ cation }) => cation.formula === "Fe").every(({ name, cation }) => name.startsWith(`demir(${roman220(cation.charge)})`)), "demir adlarındaki Roma rakamı iyonun yüküdür");
guard(!cell(2, 3).formula.includes("(") && cell(1, 1).formula.includes("(") && cell(3, 2).formula.includes("(") && cell(1, 3).formula.includes("("), "paragraftaki parantezli ve parantezsiz örnekler doğrudur");
guard(gridCations220.slice(0, 3).map(({ charge }) => charge).join() === "1,2,3", "Na, Ca, Al yükleri gruptan +1, +2, +3 çıkar");

export const nameGridSection220: GuideSection = {
  title: "Katyon × anyon ızgarasında formül ve ad",
  paragraphs: [
    `Tablonun satırları ${gridCations220.length} katyonu, sütunları ${gridAnions220.length} anyonu gösterir. Her hücrede yükleri sıfırlayan en küçük oranla yazılmış formül ve ad vardır. ${joinTr(gridCations220.slice(0, 3).map((c) => ionText220(c)))} yükleri gruptan gelir: 1A, 2A ve 3A metalleri A numarası kadar elektron verir. Cl⁻ 7A’dan bir elektron alarak oluşur. ${ionText220(POLYATOMIC220.NH4)}, ${joinTr(gridAnions220.slice(1).map(ionText220))} dersteki çok atomlu iyonlardır; içlerindeki atom sayıları değişmez.`,
    `Oran, yük büyüklüklerinin ebob’uyla sadeleştirilir: katyon sayısı = |anyon yükü| / ebob, anyon sayısı = katyon yükü / ebob. Yük büyüklükleri eşitse oran 1:1’dir: ${joinTr(oneToOne.map(({ formula }) => formula))}. Birden çok çok atomlu iyon gerektiğinde grup paranteze alınır: ${cell(1, 1).formula}, ${cell(3, 2).formula}, ${cell(1, 3).formula}. ${cell(2, 3).formula}’te iki yük de 3 olduğu için parantez gerekmez.`,
    `Ad katyon adı + anyon adıdır; iyonik adlarda mono-, di- gibi ön ek kullanılmaz. Fe iki ayrı yük alabildiği için adda yük Roma rakamıyla yazılır: ${cell(4, 0).formula} ${cell(4, 0).name}, ${cell(5, 0).formula} ${cell(5, 0).name}. Na, Ca ve Al tek yüklüdür, adlarına rakam eklenmez. Rakam tek Fe iyonunun yüküdür, formüldeki Fe sayısı değildir: ${cell(5, 2).formula} formülünde ${cell(5, 2).nc} Fe vardır ama ad “${cell(5, 2).name}” olur.`,
  ],
  table: nameTable,
};

/* Örnek 1: formülden ada (demir sülfatlar). */
export const ironSulfates220 = [{ fe: 1, n: 1 }, { fe: 2, n: 3 }].map(({ fe, n }) => {
  const q = metalChargeFromNeutrality220(fe, POLYATOMIC220.SO4, n);
  return { fe, n, q, salt: salt220(ironIon220(q as 2 | 3), POLYATOMIC220.SO4) };
});
/* Örnek 2: addan formüle. */
export const nameToFormula220 = [salt220(POLYATOMIC220.NH4, POLYATOMIC220.PO4), salt220(monoIon220("Al"), POLYATOMIC220.NO3)];
const oCount = (s: Salt220) => s.atoms.find(([el]) => el === "O")![1];

guard(ironSulfates220.every(({ fe, n, salt }) => salt.nc === fe && salt.na === n), "verilen iki formül en küçük nötr oranlardır");
guard(ironSulfates220.map(({ q }) => q).join() === "2,3", "FeSO₄’te Fe²⁺, Fe₂(SO₄)₃’te Fe³⁺ vardır");

export const nameGridExamples220: WorkedExample[] = [
  {
    title: "İki demir sülfatı nötrlükten adlandır",
    prompt: `${list(ironSulfates220.map(({ salt }) => salt.formula))} bileşiklerinde sülfat iyonu ${ionText220(POLYATOMIC220.SO4)}’tür. Her bileşikte demir iyonunun yükünü bul ve bileşikleri adlandır. Bir formül biriminde kaçar O atomu vardır?`,
    strategy: "Anyonların toplam yükünü bul. Demirlerin toplam yükü bunu sıfırlamalıdır; tek demirin yükünü demir sayısına bölerek bul, Roma rakamıyla yaz.",
    steps: [
      ...ironSulfates220.map(({ fe, n, q, salt }) => ({
        label: salt.formula,
        expression: `${n} · (−2) = ${signed(-2 * n)} ⇒ ${fe} Fe toplam +${2 * n} ⇒ Fe${chargeText220(q)}`,
        explanation: `${fe === 1 ? "Tek Fe yükün tamamını taşır." : `${2 * n} yük ${fe} demire eşit bölünür.`} Ad: ${salt.name}.`,
      })),
      { label: "O sayısı", expression: ironSulfates220.map(({ n, salt }) => `${salt.formula}: ${n} · 4 = ${oCount(salt)}`).join("; "), explanation: "Parantez dışındaki sayı SO₄ grubundaki 4 O’yu da çarpar." },
    ],
    answer: `${ironSulfates220.map(({ salt }) => `${salt.formula} ${salt.name}`).join(", ")}. O sayıları ${ironSulfates220.map(({ salt }) => oCount(salt)).join(" ve ")}.`,
    check: `${ironSulfates220.map(({ q, fe, n }) => `${fe} · (+${q}) + ${n} · (−2) = 0`).join("; ")}.`,
    pitfall: "Fe₂(SO₄)₃’teki 2’yi görüp demir(II) yazmak. Roma rakamı tek demir iyonunun yüküdür; formüldeki demir sayısı değildir.",
  },
  {
    title: "Addan formüle: amonyum fosfat ve alüminyum nitrat",
    prompt: `Amonyum (${ionText220(POLYATOMIC220.NH4)}), fosfat (${ionText220(POLYATOMIC220.PO4)}) ve nitrat (${ionText220(POLYATOMIC220.NO3)}) iyonları veriliyor; Al 13. gruptadır. Amonyum fosfat ve alüminyum nitratın formüllerini yaz. Her birinin bir formül biriminde toplam kaç atom vardır?`,
    strategy: "Addaki iyonları sembol ve yükleriyle yaz. En küçük nötr oranı bul. Çok atomlu iyon birden fazla ise paranteze al, sonra atomları say.",
    steps: [
      ...nameToFormula220.map((s) => ({
        label: s.name,
        expression: `${s.nc} · (${signed(s.cation.charge)}) + ${s.na} · (${signed(s.anion.charge)}) = 0 ⇒ ${s.formula}`,
        explanation: s.cation.formula === "Al" ? "Al 3A’dır: Al³⁺. Üç nitrat gerekir." : "Üç amonyum bir fosfatı dengeler.",
      })),
      { label: "Atomları say", expression: nameToFormula220.map((s) => `${s.formula}: ${atomsText(s.atoms)}`).join("; "), explanation: "Parantez dışındaki sayı grubun bütün atomlarını çarpar." },
    ],
    answer: `${nameToFormula220.map((s) => `${s.formula} (${atomTotal220(s.atoms)} atom)`).join(" ve ")}.`,
    check: `${nameToFormula220.map((s) => `${s.formula}: ${s.atoms.map(([, n]) => n).join(" + ")} = ${atomTotal220(s.atoms)}`).join("; ")}.`,
    pitfall: "NH₄PO₄ ya da AlNO₃ yazmak. Yükler sıfırlanmadan formül tamamlanmaz; çok atomlu iyonun içindeki sayılar ise hiç değişmez.",
  },
];

export const nameGridSupplement220 = {
  title: nameGridSection220.title,
  figureTitle: nameGridSection220.title,
  paragraphs: nameGridSection220.paragraphs,
  summary: `Katyon sayısı = |anyon yükü| / ebob, anyon sayısı = katyon yükü / ebob. Yükler eşitse 1:1 (${oneToOne.slice(0, 3).map(({ formula }) => formula).join(", ")}). Çok atomlu iyon birden fazlaysa parantez: ${cell(1, 3).formula}. Ad = katyon + anyon; Fe’de yük Roma rakamıyla: ${cell(5, 2).formula} ${cell(5, 2).name}.`,
  appendSection: true as const,
  table: nameTable,
  examples: nameGridExamples220,
};

/* =================================================================
 * 3 · Kovalent adlandırma: sayı ön ekleri atom sayısından
 * ================================================================= */

export const PREFIX220 = ["mono", "di", "tri", "tetra", "penta", "hekza", "hepta", "okta", "nona", "deka"] as const;
/** İkinci elementin dersteki son adları. */
const SECOND_ROOT: Partial<Record<Symbol209, string>> = { O: "oksit", F: "florür", Cl: "klorür", S: "sülfür", N: "nitrür" };
/** Ön ek o ile bitip ad o ile başlıyorsa bir o düşer: mono + oksit → monoksit (dersteki “karbon monoksit”). */
export const joinPrefix220 = (prefix: string, root: string) => (prefix.endsWith("o") && root.startsWith("o") ? prefix + root.slice(1) : prefix + root);
export const prefix220 = (n: number) => {
  const p = PREFIX220[n - 1];
  if (!p) throw new Error(`depth220: ${n} için ön ek yok`);
  return p;
};
export interface Molecule220 { first: Symbol209; n1: number; second: Symbol209; n2: number }
export const moleculeFormula220 = ({ first, n1, second, n2 }: Molecule220) => `${first}${sub220(n1)}${second}${sub220(n2)}`;
/** İlk element: tek atomsa mono yazılmaz. İkinci element: ön ek her zaman yazılır. */
export const moleculeName220 = ({ first, n1, second, n2 }: Molecule220) => {
  const root = SECOND_ROOT[second];
  if (!root) throw new Error(`depth220: ${second} ikinci element adı derste yok`);
  return `${n1 === 1 ? "" : prefix220(n1)}${lowerTr(NAMES209[first])} ${joinPrefix220(prefix220(n2), root)}`;
};
export const covalentSet220: Molecule220[] = [
  { first: "C", n1: 1, second: "O", n2: 1 },
  { first: "C", n1: 1, second: "O", n2: 2 },
  { first: "N", n1: 1, second: "O", n2: 1 },
  { first: "N", n1: 2, second: "O", n2: 1 },
  { first: "N", n1: 2, second: "O", n2: 3 },
  { first: "S", n1: 1, second: "O", n2: 3 },
  { first: "P", n1: 1, second: "Cl", n2: 5 },
  { first: "C", n1: 1, second: "Cl", n2: 4 },
];
const firstPart = (m: Molecule220) => (m.n1 === 1 ? `${lowerTr(NAMES209[m.first])} (1, mono yazılmaz)` : `${prefix220(m.n1)} + ${lowerTr(NAMES209[m.first])} (${m.n1})`);
const secondPart = (m: Molecule220) => `${prefix220(m.n2)} + ${SECOND_ROOT[m.second]} (${m.n2})`;
const covalentTable = {
  layout: "table" as const,
  headers: ["Formül", "1. element", "2. element", "Ad", "Toplam atom"],
  rows: covalentSet220.map((m) => [moleculeFormula220(m), firstPart(m), secondPart(m), moleculeName220(m), String(m.n1 + m.n2)]),
};
const covByFormula = (f: string) => covalentSet220.find((m) => moleculeFormula220(m) === f)!;
const [co, co2, no, n2o] = ["CO", "CO₂", "NO", "N₂O"].map(covByFormula);
const monoNames = covalentSet220.filter((m) => m.n2 === 1);

guard(covalentSet220.every((m) => CLASS_OF209[m.first] === "ametal" && CLASS_OF209[m.second] === "ametal"), "tablodaki bütün moleküller iki ametalden oluşur");
guard(covalentSet220.every((m) => !moleculeName220(m).startsWith("mono")), "hiçbir ad mono ile başlamaz");
guard(monoNames.every((m) => moleculeName220(m).endsWith("monoksit")), "ikinci element tek O ise ad monoksit ile biter");
guard(moleculeName220(co) !== moleculeName220(co2) && moleculeName220(no) !== moleculeName220(n2o), "ikinci mono CO–CO₂ ve NO–N₂O adlarını ayırır");
guard(new Set(covalentSet220.map(moleculeName220)).size === covalentSet220.length, "sekiz ad birbirinden farklıdır");

export const covalentNameSection220: GuideSection = {
  title: "Atom sayısından ön eki, ön ekten adı üret",
  paragraphs: [
    `Tablodaki ${covalentSet220.length} molekülün hepsi iki ametalden oluşur. Her satırda alt indisler okunur, sayı ön eke çevrilir: ${PREFIX220.slice(0, 5).map((p, i) => `${i + 1} ${p}`).join(", ")}. İlk elementin adı olduğu gibi söylenir; tek atomsa mono yazılmaz. İkinci elemente her zaman ön ek ve son ad (O oksit, Cl klorür) verilir. Son sütundaki toplam, iki alt indisin toplamıdır.`,
    `İkinci element için mono hiç düşmez, çünkü adı ayırır: ${moleculeFormula220(co)} ${moleculeName220(co)}, ${moleculeFormula220(co2)} ${moleculeName220(co2)}; ${moleculeFormula220(no)} ${moleculeName220(no)}, ${moleculeFormula220(n2o)} ${moleculeName220(n2o)}. Mono ile oksit birleşince iki o yan yana gelir ve biri düşer: mono + oksit → monoksit. Diğer ön eklerde harf düşmez: ${moleculeName220(covByFormula("N₂O₃"))}, ${moleculeName220(covByFormula("PCl₅"))}.`,
    `Ad formüle geri okunarak denetlenir: ön ek yoksa ilk element 1, ikinci ön ekin sayısı ikinci alt indistir. Bu şema yalnız iki elementli moleküler bileşikler içindir. NaCl, MgO gibi iyonik bileşiklerde ön ek kullanılmaz; ad katyon ve anyon adlarından kurulur.`,
  ],
  table: covalentTable,
};

/* Örnek 1: azot oksitleri. */
export const nitrogenOxides220: Molecule220[] = [{ first: "N", n1: 1, second: "O", n2: 1 }, { first: "N", n1: 2, second: "O", n2: 1 }, { first: "N", n1: 1, second: "O", n2: 2 }];
/* Örnek 2: atom sayılarından formül ve ad. */
export const countClues220 = [
  { first: "Si" as Symbol209, n1: 1, second: "F" as Symbol209, total: 5 },
  { first: "Cl" as Symbol209, n1: 2, second: "O" as Symbol209, total: 3 },
].map((c) => ({ ...c, molecule: { first: c.first, n1: c.n1, second: c.second, n2: c.total - c.n1 } as Molecule220 }));

guard(countClues220.every(({ molecule }) => molecule.n2 >= 1 && CLASS_OF209[molecule.first] !== "metal"), "ipuçlarındaki moleküller ametallerden oluşur");
guard(CLASS_OF209.Si === "yarı metal", "Si yarı metaldir; SiF₄ yine moleküler adlandırılır");

export const covalentNameExamples220: WorkedExample[] = [
  {
    title: "Üç azot oksidinde ikinci mono neden kalır?",
    prompt: `${list(nitrogenOxides220.map(moleculeFormula220))} moleküllerini adlandır. Hangi adlarda ikinci elemente mono yazılır, neden düşürülmez?`,
    strategy: "Her formülde iki alt indisi oku. İlk element tek atomsa mono yazma; ikinci elementin sayısını her zaman ön ekle söyle.",
    steps: [
      ...nitrogenOxides220.map((m) => ({
        label: moleculeFormula220(m),
        expression: `${m.n1} N, ${m.n2} O ⇒ ${moleculeName220(m)}`,
        explanation: m.n1 === 1 ? "İlk N tek: ön eksiz azot." : `İlk N ${m.n1}: ${prefix220(m.n1)}azot.`,
      })),
      { label: "Karşılaştır", expression: `${moleculeName220(nitrogenOxides220[0])} ≠ ${moleculeName220(nitrogenOxides220[2])}`, explanation: "İki adın farkı yalnız ikinci ön ektedir. İkinci mono düşseydi NO için yalnız “azot oksit” kalır, O sayısı söylenmemiş olurdu." },
    ],
    answer: `${nitrogenOxides220.map((m) => `${moleculeFormula220(m)} ${moleculeName220(m)}`).join(", ")}. İkinci elemente mono ${joinTr(nitrogenOxides220.filter((m) => m.n2 === 1).map(moleculeFormula220))} adlarında yazılır; O sayısını belirttiği için düşmez.`,
    check: `Adlardan geri okuma: ${nitrogenOxides220.map((m) => `${moleculeName220(m)} → ${m.n1} N + ${m.n2} O = ${moleculeFormula220(m)}`).join("; ")}.`,
    pitfall: "NO için “azot oksit” yazıp O sayısını söylememek ya da ilk elemente de mono ekleyip “monoazot monoksit” demek.",
  },
  {
    title: "Atom sayılarından formülü ve adı kur",
    prompt: `Bir molekül yalnız ${NAMES209.Si.toLocaleLowerCase("tr-TR")} ve flordan oluşuyor; içinde ${countClues220[0].n1} Si atomu ve toplam ${countClues220[0].total} atom var. Başka bir molekül yalnız klor ve oksijenden oluşuyor; Cl ilk yazılıyor, molekülde ${countClues220[1].n1} Cl ve toplam ${countClues220[1].total} atom var. İki molekülün formüllerini ve adlarını yaz.`,
    strategy: "Toplamdan bilinen alt indisi çıkar, ikinci alt indisi bul. Sonra iki sayıyı ön eke çevir.",
    steps: [
      ...countClues220.map(({ molecule, total, n1 }) => ({
        label: moleculeFormula220(molecule),
        expression: `${total} − ${n1} = ${molecule.n2} ⇒ ${moleculeFormula220(molecule)} ⇒ ${moleculeName220(molecule)}`,
        explanation: molecule.n1 === 1 ? "İlk element tek atom: mono yazılmaz." : `İlk element ${molecule.n1} atom: ${prefix220(molecule.n1)}.`,
      })),
      { label: "Ön ekleri denetle", expression: countClues220.map(({ molecule }) => `${prefix220(molecule.n2)} = ${molecule.n2}`).join(", "), explanation: "Mono + oksit birleşince bir o düşer: monoksit." },
    ],
    answer: `${countClues220.map(({ molecule }) => `${moleculeFormula220(molecule)}: ${moleculeName220(molecule)}`).join("; ")}.`,
    check: `${countClues220.map(({ molecule }) => `${molecule.n1} + ${molecule.n2} = ${molecule.n1 + molecule.n2}`).join(" ve ")}; toplamlar verilenle aynı.`,
    pitfall: "Cl₂O’da ikinci elementin tek atomu için ön eki atlayıp “diklor oksit” demek. İkinci elementte mono her zaman yazılır.",
  },
];

export const covalentNameSupplement220 = {
  title: covalentNameSection220.title,
  figureTitle: covalentNameSection220.title,
  paragraphs: covalentNameSection220.paragraphs,
  summary: `Alt indis → ön ek: ${PREFIX220.slice(0, 5).map((p, i) => `${i + 1} ${p}`).join(", ")}. İlk element tek atomsa mono yok; ikinci elementte ön ek hep var. mono + oksit → monoksit. ${moleculeFormula220(co)} ${moleculeName220(co)}, ${moleculeFormula220(n2o)} ${moleculeName220(n2o)}, ${moleculeFormula220(covByFormula("PCl₅"))} ${moleculeName220(covByFormula("PCl₅"))}. İyonik bileşikte ön ek yok.`,
  appendSection: true as const,
  table: covalentTable,
  examples: covalentNameExamples220,
};

/* =================================================================
 * Ortak model 2 · Lewis sayımı (değerlik elektronlarından)
 * ================================================================= */

export interface LewisSkeleton220 { id: string; formula: string; name: string; atoms: Symbol209[]; links: [number, number][] }
export interface Lewis220 extends LewisSkeleton220 {
  orders: number[];
  lonePairs: number[];
  totalValence: number;
  bondPairs: number;
  lonePairTotal: number;
}
/**
 * İskelet (hangi atom hangisine bağlı) verilir; bağ dereceleri değerlik
 * elektronlarından bulunur. Her atomun bağ ihtiyacı H için 1, diğerlerinde
 * 8 − değerlik e⁻’dir. Uçtaki atomun tek bağı onun kalan ihtiyacı kadardır;
 * uçlar budanarak bütün bağlar belirlenir. Ortaklanmamış çift sayısı
 * (değerlik e⁻ − bağ sayısı) / 2’dir.
 */
export const lewis220 = (sk: LewisSkeleton220): Lewis220 => {
  const need = sk.atoms.map(bondNeed220);
  const orders: number[] = sk.links.map(() => 0);
  const open = new Set(sk.links.map((_, i) => i));
  while (open.size) {
    const degree = sk.atoms.map((_, a) => [...open].filter((i) => sk.links[i].includes(a)).length);
    const leafLink = [...open].find((i) => sk.links[i].some((a) => degree[a] === 1));
    if (leafLink === undefined) throw new Error(`depth220: ${sk.formula} iskeleti ağaç değil`);
    const [p, q] = sk.links[leafLink];
    const leaf = degree[p] === 1 ? p : q;
    const order = need[leaf];
    orders[leafLink] = order;
    need[p] -= order;
    need[q] -= order;
    open.delete(leafLink);
  }
  if (need.some((n) => n !== 0) || orders.some((o) => o < 1 || o > 3)) throw new Error(`depth220: ${sk.formula} için sekiz kuralı sağlanmıyor`);
  const bonds = sk.atoms.map((_, a) => sk.links.reduce((sum, link, i) => sum + (link.includes(a) ? orders[i] : 0), 0));
  const lonePairs = sk.atoms.map((s, a) => (valence(s) - bonds[a]) / 2);
  if (lonePairs.some((n) => !Number.isInteger(n) || n < 0)) throw new Error(`depth220: ${sk.formula} çift sayısı tam değil`);
  const totalValence = sk.atoms.reduce((a, s) => a + valence(s), 0);
  const bondPairs = orders.reduce((a, b) => a + b, 0);
  const lonePairTotal = lonePairs.reduce((a, b) => a + b, 0);
  if (2 * (bondPairs + lonePairTotal) !== totalValence) throw new Error(`depth220: ${sk.formula} elektron sayımı tutmuyor`);
  return { ...sk, orders, lonePairs, totalValence, bondPairs, lonePairTotal };
};
const star = (center: Symbol209, ligand: Symbol209, n: number, id: string, formula: string, name: string): LewisSkeleton220 => ({
  id, formula, name, atoms: [center, ...Array<Symbol209>(n).fill(ligand)], links: Array.from({ length: n }, (_, i) => [0, i + 1] as [number, number]),
});
export const LEWIS220 = {
  H2O: lewis220(star("O", "H", 2, "H2O", "H₂O", "su")),
  NH3: lewis220(star("N", "H", 3, "NH3", "NH₃", "amonyak")),
  CH4: lewis220(star("C", "H", 4, "CH4", "CH₄", "metan")),
  CO2: lewis220(star("C", "O", 2, "CO2", "CO₂", "karbon dioksit")),
  HCl: lewis220({ id: "HCl", formula: "HCl", name: "hidrojen klorür", atoms: ["H", "Cl"], links: [[0, 1]] }),
  N2: lewis220({ id: "N2", formula: "N₂", name: "azot", atoms: ["N", "N"], links: [[0, 1]] }),
  O2: lewis220({ id: "O2", formula: "O₂", name: "oksijen", atoms: ["O", "O"], links: [[0, 1]] }),
  HF: lewis220({ id: "HF", formula: "HF", name: "hidrojen florür", atoms: ["H", "F"], links: [[0, 1]] }),
  H2S: lewis220(star("S", "H", 2, "H2S", "H₂S", "hidrojen sülfür")),
  CH3OH: lewis220({ id: "CH3OH", formula: "CH₃OH", name: "metanol", atoms: ["C", "H", "H", "H", "O", "H"], links: [[0, 1], [0, 2], [0, 3], [0, 4], [4, 5]] }),
  CH3OCH3: lewis220({ id: "CH3OCH3", formula: "CH₃OCH₃", name: "dimetil eter", atoms: ["C", "H", "H", "H", "O", "C", "H", "H", "H"], links: [[0, 1], [0, 2], [0, 3], [0, 4], [4, 5], [5, 6], [5, 7], [5, 8]] }),
} as const;
export type LewisId220 = keyof typeof LEWIS220;

/** Tek merkezli (AXn) ya da iki atomlu molekülde merkez atomun indisi; iki atomluda null. */
const centerOf = (m: Lewis220) => {
  if (m.atoms.length === 2) return null;
  const deg = m.atoms.map((_, a) => m.links.filter((l) => l.includes(a)).length);
  const centers = deg.flatMap((d, a) => (d > 1 ? [a] : []));
  if (centers.length !== 1) throw new Error(`depth220: ${m.formula} tek merkezli değil`);
  return centers[0];
};
export const centralLonePairs220 = (m: Lewis220) => {
  const c = centerOf(m);
  return c === null ? null : m.lonePairs[c];
};
/**
 * Kutupluluk: bağlar apolarsa (aynı element) molekül apolardır. Polar
 * bağlı tek merkezli molekülde merkezde ortaklanmamış çift yoksa ve bütün
 * uç atomlar aynıysa dipoller birbirini götürür (CO₂, CH₄); aksi hâlde polar.
 */
export const isPolar220 = (m: Lewis220) => {
  const polarBond = m.links.some(([p, q]) => m.atoms[p] !== m.atoms[q] && deltaEN209(m.atoms[p], m.atoms[q]) > 0);
  if (!polarBond) return false;
  const c = centerOf(m);
  if (c === null) return true;
  const ligands = new Set(m.atoms.filter((_, a) => a !== c));
  return !(m.lonePairs[c] === 0 && ligands.size === 1);
};
const FON = new Set<Symbol209>(["F", "O", "N"]);
/** F, O veya N’ye kovalent bağlı H sayısı (TYT verici kuralı). */
export const donorH220 = (m: Lewis220) => m.links.filter(([p, q]) => (m.atoms[p] === "H" && FON.has(m.atoms[q])) || (m.atoms[q] === "H" && FON.has(m.atoms[p]))).length;
/** F, O, N üzerindeki ortaklanmamış çift sayısı (alıcı). */
export const acceptorPairs220 = (m: Lewis220) => m.atoms.reduce((sum, s, a) => sum + (FON.has(s) ? m.lonePairs[a] : 0), 0);
export const hBondPure220 = (m: Lewis220) => donorH220(m) > 0 && acceptorPairs220(m) > 0;

/* =================================================================
 * 4 · Zayıf etkileşimler: Lewis sayımından çift sınıflaması
 * ================================================================= */

export type Particle220 = { kind: "molecule"; m: Lewis220 } | { kind: "ion"; formula: string; charge: number };
export type Interaction220 = "London" | "dipol–dipol" | "hidrojen bağı" | "dipol–indüklenmiş dipol" | "iyon–dipol" | "iyon–indüklenmiş dipol" | "iyon–iyon";
const particleText = (p: Particle220) => (p.kind === "ion" ? `${p.formula}${chargeText220(p.charge)}` : p.m.formula);
export const pairText220 = (a: Particle220, b: Particle220) => `${particleText(a)}···${particleText(b)}`;
/**
 * Dersteki çift sınıflaması. London iki nötr tanecik arasında her zaman
 * vardır; iki polar molekülde dipol–dipol eklenir; birinin vericisi
 * ötekinin alıcısına uyuyorsa hidrojen bağı eklenir. Alıcı polar molekülde
 * aranır: O₂, CO₂ gibi apolar moleküllerdeki O çiftleri alıcı sayılmaz
 * (dersteki H₂O···O₂ çifti dipol–indüklenmiş dipoldür). İyonlu çiftte
 * karakteristik ad (iyon–dipol, iyon–indüklenmiş dipol) yazılır.
 */
export const interactions220 = (a: Particle220, b: Particle220): Interaction220[] => {
  if (a.kind === "ion" && b.kind === "ion") return ["iyon–iyon"];
  if (a.kind === "ion" || b.kind === "ion") {
    const mol = (a.kind === "molecule" ? a : b) as { kind: "molecule"; m: Lewis220 };
    return [isPolar220(mol.m) ? "iyon–dipol" : "iyon–indüklenmiş dipol"];
  }
  const [pa, pb] = [isPolar220(a.m), isPolar220(b.m)];
  const out: Interaction220[] = ["London"];
  if (pa && pb) out.push("dipol–dipol");
  else if (pa || pb) out.push("dipol–indüklenmiş dipol");
  if ((donorH220(a.m) > 0 && pb && acceptorPairs220(b.m) > 0) || (donorH220(b.m) > 0 && pa && acceptorPairs220(a.m) > 0)) out.push("hidrojen bağı");
  return out;
};
const mol = (id: LewisId220): Particle220 => ({ kind: "molecule", m: LEWIS220[id] });
export const sodiumIon220: Particle220 = { kind: "ion", formula: "Na", charge: ionCharge220("Na") };
export const weakMolecules220: LewisId220[] = ["N2", "O2", "CO2", "CH4", "HCl", "NH3", "H2O"];
export const weakRows220 = [
  ...weakMolecules220.map((id) => ({ a: mol(id), b: mol(id), focus: LEWIS220[id] })),
  { a: sodiumIon220, b: mol("H2O"), focus: LEWIS220.H2O },
].map((row) => ({ ...row, list: interactions220(row.a, row.b) }));
export const lewisCountText220 = (m: Lewis220) => `${m.totalValence} değerlik e⁻ = ${m.bondPairs} bağ çifti + ${m.lonePairTotal} ortaklanmamış çift`;
const centerText = (m: Lewis220) => {
  const lp = centralLonePairs220(m);
  if (lp === null) return m.atoms[0] === m.atoms[1] ? "İki aynı atom" : "İki farklı atom";
  return `Merkez ${m.atoms[centerOf(m)!]}: ${lp} çift`;
};
export const polarText220 = (m: Lewis220) => (isPolar220(m) ? "polar" : "apolar");
const weakTable = {
  layout: "table" as const,
  headers: ["Çift", "Lewis sayımı", "Merkez / uçlar", "Molekül", "Etkileşimler"],
  rows: weakRows220.map(({ a, b, focus, list: l }) => [
    pairText220(a, b),
    a.kind === "ion" ? `${particleText(a)}: iyon; H₂O: ${lewisCountText220(focus)}` : lewisCountText220(focus),
    centerText(focus),
    a.kind === "ion" ? `iyon + ${polarText220(focus)}` : polarText220(focus),
    upperFirst(l.join(", ")),
  ]),
};
const polarIds = weakMolecules220.filter((id) => isPolar220(LEWIS220[id]));
const apolarIds = weakMolecules220.filter((id) => !isPolar220(LEWIS220[id]));
const polarBondApolar = apolarIds.filter((id) => LEWIS220[id].atoms.some((s) => s !== LEWIS220[id].atoms[0]));
const hbIds = weakMolecules220.filter((id) => interactions220(mol(id), mol(id)).includes("hidrojen bağı"));

guard(weakRows220.slice(0, -1).every(({ list: l }) => l[0] === "London"), "her nötr çiftte London vardır");
guard(apolarIds.every((id) => interactions220(mol(id), mol(id)).length === 1), "apolar moleküllerin kendi aralarında yalnız London vardır");
guard(polarBondApolar.join() === "CO2,CH4" && polarBondApolar.every((id) => centralLonePairs220(LEWIS220[id]) === 0), "polar bağlı ama apolar olanlar CO₂ ve CH₄; merkezde çift yok");
guard(polarIds.every((id) => (centralLonePairs220(LEWIS220[id]) ?? 1) > 0), "polar tek merkezli moleküllerde merkezde ortaklanmamış çift vardır");
guard(hbIds.join() === "NH3,H2O", "tablodaki moleküllerden kendi aralarında hidrojen bağı yalnız NH₃ ve H₂O’dadır");
guard(weakRows220.at(-1)!.list.join() === "iyon–dipol", "Na⁺ ile su çiftinin adı iyon–dipoldür");
guard(LEWIS220.HCl.lonePairs[1] === 3 && donorH220(LEWIS220.HCl) === 0, "HCl’de Cl’de üç çift var ama H, F/O/N’ye bağlı değil");

export const weakSection220: GuideSection = {
  title: "Lewis sayımından kutupluluğa, kutupluluktan etkileşime",
  paragraphs: [
    `Tablodaki her molekül için değerlik elektronları toplanır ve bağ çiftleri ile ortaklanmamış çiftlere ayrılır. Bağ sayısı H için 2 − 1, diğer atomlarda sekize tamamlamak için 8 − değerlik e⁻’dir: ${(['H', 'C', 'N', 'O', 'Cl'] as Symbol209[]).map((s) => `${s} ${bondNeed220(s)}`).join(", ")}. Örneğin ${LEWIS220.H2O.formula}: ${lewisCountText220(LEWIS220.H2O)}. ${LEWIS220.CO2.formula}: ${lewisCountText220(LEWIS220.CO2)}; C her O ile ikili bağ yapar. ${LEWIS220.N2.formula}’de üçlü, ${LEWIS220.O2.formula}’de ikili bağ vardır.`,
    `Aynı iki atomdan oluşan ${joinTr(apolarIds.filter((id) => !polarBondApolar.includes(id)).map((id) => LEWIS220[id].formula))} apolardır. ${joinTr(polarBondApolar.map((id) => LEWIS220[id].formula))} polar bağlar taşır, ama merkez atomda ortaklanmamış çift yoktur ve bütün uçlar aynıdır: bağ dipolleri birbirini götürür, molekül apolardır. ${polarIds.filter((id) => centralLonePairs220(LEWIS220[id]) !== null).map((id) => `${LEWIS220[id].formula} (merkezde ${centralLonePairs220(LEWIS220[id])} çift)`).join(", ")} ve iki farklı atomlu ${LEWIS220.HCl.formula} polardır.`,
    `İki nötr molekül arasında London her zaman vardır. İki polar molekül arasında dipol–dipol de eklenir. ${joinTr(hbIds.map((id) => LEWIS220[id].formula))} moleküllerinde H, N ya da O’ya bağlıdır ve aynı atomda ortaklanmamış çift vardır; bu yüzden hidrojen bağı da listelenir. ${LEWIS220.HCl.formula}’de Cl üzerinde ${LEWIS220.HCl.lonePairs[1]} çift olsa da H, F/O/N’ye bağlı değildir. ${LEWIS220.O2.formula} ve ${LEWIS220.CO2.formula}’de O üzerinde çift vardır ama verici yoktur; molekül apolar olduğu için alıcı da sayılmaz. Son satırda bir iyon vardır: tablo iyonlu çiftte karakteristik adı yazar, ${weakRows220.at(-1)!.list[0]}.`,
  ],
  table: weakTable,
};

/* Örnek 1: CO₂ ve H₂O Lewis sayımı. */
export const lewisPair220: LewisId220[] = ["CO2", "H2O"];
/* Örnek 2: dört çift. */
export const examplePairs220: [Particle220, Particle220][] = [
  [mol("N2"), mol("N2")],
  [mol("HF"), mol("HF")],
  [mol("H2O"), mol("CH4")],
  [{ kind: "ion", formula: "K", charge: ionCharge220("K") }, mol("H2O")],
];
guard(interactions220(...examplePairs220[2]).join() === "London,dipol–indüklenmiş dipol", "su ile metan arasında London ve dipol–indüklenmiş dipol vardır");
guard(interactions220(mol("H2O"), mol("O2")).join() === "London,dipol–indüklenmiş dipol", "su ile O₂ arasında hidrojen bağı sayılmaz");

const lewisSteps = (m: Lewis220) => {
  const c = centerOf(m)!;
  return [
    { label: `${m.formula} değerlik e⁻`, expression: `${m.atoms.map((s) => valence(s)).join(" + ")} = ${m.totalValence}`, explanation: `${joinTr([...new Set(m.atoms)].map((s) => `${s} ${valence(s)}`))} değerlik elektronu taşır.` },
    { label: `${m.formula} bağlar`, expression: `${m.orders.map((o) => (o === 1 ? "tekli" : o === 2 ? "ikili" : "üçlü")).join(" + ")} ⇒ ${m.bondPairs} bağ çifti`, explanation: `${m.atoms[c]} ${bondNeed220(m.atoms[c])} bağ yapar; ${m.atoms[c] === "C" ? "her O iki bağ ister, bu yüzden bağlar ikilidir" : "her H bir bağ yapar"}.` },
    { label: `${m.formula} çiftler`, expression: `(${m.totalValence} − 2 · ${m.bondPairs}) / 2 = ${m.lonePairTotal}; merkezde ${m.lonePairs[c]}`, explanation: m.lonePairs[c] === 0 ? "Merkezde çift yok, iki uç aynı: dipoller birbirini götürür." : "Merkezdeki çiftler molekülü açılı yapar; dipoller birbirini götürmez." },
  ];
};
export const weakExamples220: WorkedExample[] = [
  {
    title: "CO₂ ile H₂O: aynı tip bağ, farklı kutupluluk",
    prompt: `C, O ve H atomlarının değerlik elektron sayıları ${valence("C")}, ${valence("O")} ve ${valence("H")}’dir. ${list(lewisPair220.map((id) => LEWIS220[id].formula))} moleküllerinin Lewis yapılarında toplam değerlik elektronu, bağ çifti ve ortaklanmamış çift sayıları nedir? Merkez atomda kaç çift vardır? Hangisi polardır?`,
    strategy: "Değerlik elektronlarını topla. Her atomun bağ ihtiyacından bağları kur. Kalan elektronları ikişer ikişer ortaklanmamış çift yap. Merkezdeki çift sayısı ve uçların aynılığıyla kutupluluğa karar ver.",
    steps: lewisPair220.flatMap((id) => lewisSteps(LEWIS220[id])),
    answer: `${lewisPair220.map((id) => `${LEWIS220[id].formula}: ${lewisCountText220(LEWIS220[id])}, merkezde ${centralLonePairs220(LEWIS220[id])} çift, ${polarText220(LEWIS220[id])}`).join("; ")}.`,
    check: `İki sayım da 2 · (bağ çifti + çift) = toplam verir: ${lewisPair220.map((id) => `2 · (${LEWIS220[id].bondPairs} + ${LEWIS220[id].lonePairTotal}) = ${LEWIS220[id].totalValence}`).join(", ")}.`,
    pitfall: "Polar bağ gören her molekülü polar saymak. CO₂’de iki C=O bağı polardır ama merkezde çift yoktur ve dipoller birbirini götürür.",
  },
  {
    title: "Dört çiftte bütün etkileşimleri listele",
    prompt: `${list(examplePairs220.map(([a, b]) => pairText220(a, b)))} çiftlerinin her birinde hangi etkileşimler bulunur? (H, F’ye bağlıdır; K⁺ bir iyondur.)`,
    strategy: "Her taneciği iyon, polar molekül ya da apolar molekül diye sınıflandır. İki nötr tanecikte önce London’ı yaz, sonra kalıcı dipolleri ve H bağı koşulunu ekle.",
    steps: examplePairs220.map(([a, b]) => ({
      label: pairText220(a, b),
      expression: interactions220(a, b).join(", "),
      explanation: a.kind === "ion"
        ? "İyon ile polar su: iyon–dipol."
        : `${b.kind === "molecule" && b.m === a.m ? `İki ${polarText220(a.m)} ${a.m.formula}` : `${a.m.formula} ${polarText220(a.m)}, ${b.kind === "molecule" ? `${b.m.formula} ${polarText220(b.m)}` : ""}`}${donorH220(a.m) > 0 && b.kind === "molecule" && acceptorPairs220(b.m) > 0 ? "; F–H vericisi ve F’deki çift alıcı" : ""}.`,
    })),
    answer: `${examplePairs220.map(([a, b]) => `${pairText220(a, b)}: ${interactions220(a, b).join(", ")}`).join("; ")}.`,
    check: `Yalnız London’lı tek çift ${pairText220(...examplePairs220[0])}’dir; iki apolar molekülde başka çekim yoktur. H₂O···CH₄’te CH₄’ün F/O/N’si olmadığı için hidrojen bağı yoktur.`,
    pitfall: "HF···HF için yalnız “hidrojen bağı” yazıp London’ı ve dipol–dipolü unutmak. Karakteristik ad diğer katkıların yokluğu demek değildir.",
  },
];

export const weakSupplement220 = {
  title: weakSection220.title,
  figureTitle: weakSection220.title,
  paragraphs: weakSection220.paragraphs,
  summary: `Değerlik e⁻ = 2 · (bağ çifti + ortaklanmamış çift). Merkezde çift yok ve uçlar aynı → apolar (${joinTr(polarBondApolar.map((id) => LEWIS220[id].formula))}); merkezde çift var → polar (${joinTr(polarIds.filter((id) => centralLonePairs220(LEWIS220[id]) !== null).map((id) => LEWIS220[id].formula))}). Nötr çiftte hep London; iki polar → dipol–dipol; N/O/F–H → hidrojen bağı. İyon + polar → iyon–dipol.`,
  appendSection: true as const,
  table: weakTable,
  examples: weakExamples220,
};

/* =================================================================
 * 5 · Hidrojen bağı: verici H ve alıcı çift sayımı
 * ================================================================= */

export const hbondIds220: LewisId220[] = ["H2O", "NH3", "HF", "CH3OH", "CH3OCH3", "CH4", "HCl", "H2S"];
const hAttach = (m: Lewis220) => [...new Set(m.links.flatMap(([p, q]) => (m.atoms[p] === "H" ? [m.atoms[q]] : m.atoms[q] === "H" ? [m.atoms[p]] : [])))];
export const hbondRows220 = hbondIds220.map((id) => {
  const m = LEWIS220[id];
  return { id, m, attach: hAttach(m), donors: donorH220(m), acceptors: acceptorPairs220(m), pure: hBondPure220(m) };
});
const hbondTable = {
  layout: "table" as const,
  headers: ["Molekül", "H’nin bağlı olduğu atom", "Verici H (F/O/N–H)", "F/O/N’de ortaklanmamış çift", "Saf hâlde kendi arasında"],
  rows: hbondRows220.map(({ m, attach, donors, acceptors, pure }) => [
    `${m.formula} (${m.name})`,
    attach.join(", "),
    String(donors),
    String(acceptors),
    pure ? "Hidrojen bağı var" : donors === 0 && acceptors > 0 ? "Yok: alıcı var, verici yok" : "Yok",
  ]),
};
const hRow = (id: LewisId220) => hbondRows220.find((r) => r.id === id)!;
/** İdeal ağ modeli: her temas bir verici H ile bir alıcı çift ister; N molekülde en çok N · min(verici, alıcı) temas. */
export const idealContacts220 = (m: Lewis220, n: number) => n * Math.min(donorH220(m), acceptorPairs220(m));
/**
 * 1 atm’de normal kaynama noktası sırası H₂O > HF > NH₃. Kaynak: CRC Handbook
 * of Chemistry and Physics, inorganik bileşiklerin fiziksel sabitleri
 * tablosu; burada yalnız sıra kullanılır, sayı yazılmaz.
 */
export const BOILING_ORDER220: readonly LewisId220[] = ["H2O", "HF", "NH3"];
export const BOILING_SOURCE220 = "CRC Handbook of Chemistry and Physics";

guard(hbondRows220.filter(({ pure }) => pure).map(({ id }) => id).join() === "H2O,NH3,HF,CH3OH", "saf hâlde hidrojen bağı yapanlar su, amonyak, HF ve metanoldür");
guard(hRow("CH3OCH3").donors === 0 && hRow("CH3OCH3").acceptors === 2, "dimetil eterde verici yok, O’da iki çift var");
guard(hRow("H2S").donors === 0 && hRow("HCl").donors === 0 && hRow("CH4").donors === 0, "H₂S, HCl ve CH₄’te verici H yoktur");
guard(hRow("H2O").donors === 2 && hRow("H2O").acceptors === 2, "suyun iki verici H’si ve iki alıcı çifti vardır");
guard(hRow("CH3OH").donors === 1 && hRow("CH3OH").acceptors === 2, "metanolde bir verici H ve iki alıcı çift vardır");
guard(LEWIS220.H2S.lonePairs[0] === 2 && LEWIS220.H2O.lonePairs[0] === 2, "H₂S ve H₂O’da merkezde ikişer çift vardır; fark S’nin F/O/N olmamasıdır");

export const hbondCountSection220: GuideSection = {
  title: "Verici H ve alıcı çifti Lewis yapısından say",
  paragraphs: [
    `Tablodaki ${hbondRows220.length} molekülün Lewis yapısı değerlik elektronlarından kurulur. Verici sütunu F, O ya da N’ye doğrudan bağlı H sayısıdır. Alıcı sütunu yalnız F, O ve N üzerindeki ortaklanmamış çiftleri sayar; çift sayısı (değerlik e⁻ − bağ sayısı) / 2’dir: O için (6 − 2) / 2 = ${LEWIS220.H2O.lonePairs[0]}, N için (5 − 3) / 2 = ${LEWIS220.NH3.lonePairs[0]}, F için (7 − 1) / 2 = ${LEWIS220.HF.lonePairs[1]}.`,
    `Saf hâlde kendi molekülleri arasında hidrojen bağı için aynı türde hem verici hem alıcı gerekir: ${joinTr(hbondRows220.filter(({ pure }) => pure).map(({ m }) => m.formula))}. ${hRow("CH3OCH3").m.formula}’te O üzerinde ${hRow("CH3OCH3").acceptors} çift vardır ama bütün H’ler C’ye bağlıdır: verici yoktur. ${hRow("H2S").m.formula}’te S üzerinde de ${LEWIS220.H2S.lonePairs[0]} çift vardır; S bu kuralın F/O/N atomlarından değildir. ${hRow("HCl").m.formula} ve ${hRow("CH4").m.formula}’te de verici yoktur.`,
    `İdeal ağ modelinde her temas bir verici H ile bir alıcı çifti eşleştirir. Bu yüzden N molekülde en çok N · min(verici, alıcı) temas kurulabilir. Su iki verici ve iki çiftle N molekülde en çok ${idealContacts220(LEWIS220.H2O, 1)}N temas kurar; her temas iki molekül arasında ortak olduğundan bir molekül ${2 * idealContacts220(LEWIS220.H2O, 1)} temasa katılır. HF ve NH₃’te en çok ${idealContacts220(LEWIS220.HF, 1) === 1 ? "" : idealContacts220(LEWIS220.HF, 1)}N temas vardır: HF’de verici, NH₃’te alıcı azdır. Bu sayım bir üst sınırdır; sıvıda her an bütün temaslar kurulu değildir.`,
  ],
  table: hbondTable,
};

/* Örnek 1: karışımda iki yön. */
export const mixPairs220: [LewisId220, LewisId220][] = [["NH3", "H2O"], ["CH3OH", "CH3OCH3"], ["CH4", "H2O"]];
export const directions220 = (a: Lewis220, b: Lewis220) => [
  ...(donorH220(a) > 0 && acceptorPairs220(b) > 0 ? [`${a.formula} verici → ${b.formula} alıcı`] : []),
  ...(donorH220(b) > 0 && acceptorPairs220(a) > 0 ? [`${b.formula} verici → ${a.formula} alıcı`] : []),
];
const mixRows = mixPairs220.map(([a, b]) => ({ a: LEWIS220[a], b: LEWIS220[b], dirs: directions220(LEWIS220[a], LEWIS220[b]) }));
/* Örnek 2: ideal ağ sayımı. */
export const networkN220 = 10;
export const networkIds220: LewisId220[] = ["H2O", "HF", "NH3"];
const network = networkIds220.map((id) => ({ m: LEWIS220[id], contacts: idealContacts220(LEWIS220[id], networkN220) }));
const waterNet = network.find(({ m }) => m.id === "H2O")!;

guard(mixRows.map(({ dirs }) => dirs.length).join() === "2,1,0", "üç karışım çiftinde yön sayıları 2, 1 ve 0’dır");
guard(network.every(({ contacts }) => contacts <= waterNet.contacts) && network.filter(({ contacts }) => contacts === waterNet.contacts).length === 1, "ideal ağda en çok temas suyundur");
guard(BOILING_ORDER220[0] === "H2O" && idealContacts220(LEWIS220.HF, 1) === idealContacts220(LEWIS220.NH3, 1), "su en yüksek kaynar; HF ile NH₃ sayımda eşittir");

export const hbondCountExamples220: WorkedExample[] = [
  {
    title: "Karışımda iki yönü ayrı dene",
    prompt: `${list(mixPairs220.map(([a, b]) => `${LEWIS220[a].formula}–${LEWIS220[b].formula}`))} karışımlarının her birinde iki farklı molekül arasında hidrojen bağı mümkün müdür? Mümkünse hangi molekül verici, hangisi alıcı olabilir? (Yapılar: NH₃, H₂O, CH₃–O–H, CH₃–O–CH₃, CH₄.)`,
    strategy: "Her çifti iki yönde dene: birinci molekülün F/O/N–H’si ikincinin F/O/N çiftine uyar mı, sonra tersi.",
    steps: mixRows.map(({ a, b, dirs }) => ({
      label: `${a.formula}–${b.formula}`,
      expression: `${a.formula}: ${donorH220(a)} verici, ${acceptorPairs220(a)} çift; ${b.formula}: ${donorH220(b)} verici, ${acceptorPairs220(b)} çift`,
      explanation: dirs.length ? `${dirs.join("; ")}.` : "İki yönde de verici–alıcı eşleşmesi yok.",
    })),
    answer: `${mixRows.map(({ a, b, dirs }) => `${a.formula}–${b.formula}: ${dirs.length ? `${dirs.length === 2 ? "iki yönde de mümkün" : `yalnız ${dirs[0]}`}` : "mümkün değil"}`).join("; ")}.`,
    check: `${LEWIS220.CH3OCH3.formula}’in verici H’si ${donorH220(LEWIS220.CH3OCH3)}, ${LEWIS220.CH4.formula}’ün alıcı çifti ${acceptorPairs220(LEWIS220.CH4)}’dır; bu sıfırlar yön sayısını azaltır.`,
    pitfall: "Bir yön bulunamadı diye çifti hemen “yok” saymak. Ters yönü de dene: eter verici olamaz ama alıcı olabilir.",
  },
  {
    title: "İdeal ağda temas sayısı: H₂O, HF, NH₃",
    prompt: `İdeal bir ağ modelinde her hidrojen bağı teması bir verici H ile bir alıcı çifti kullanır ve her H ya da çift en çok bir temasa katılır. ${networkN220}’ar molekül H₂O, HF ve NH₃ için kendi aralarında en çok kaç temas kurulabilir? Bu sayım 1 atm’deki kaynama sıralamasıyla (${BOILING_ORDER220.map((id) => LEWIS220[id].formula).join(" > ")}; ${BOILING_SOURCE220} verileriyle) nasıl ilişkilidir?`,
    strategy: "Lewis yapısından molekül başına verici H ve alıcı çifti say. Temas sayısını az olan belirler: N · min(verici, alıcı).",
    steps: [
      ...network.map(({ m, contacts }) => ({
        label: m.formula,
        expression: `${networkN220} · min(${donorH220(m)}, ${acceptorPairs220(m)}) = ${contacts}`,
        explanation: `${donorH220(m)} verici H, ${acceptorPairs220(m)} alıcı çift.`,
      })),
      { label: "Kaynama ile karşılaştır", expression: `${waterNet.m.formula} ${waterNet.contacts} > HF ${idealContacts220(LEWIS220.HF, networkN220)} = NH₃ ${idealContacts220(LEWIS220.NH3, networkN220)}`, explanation: "Suyun en yüksek kaynaması en geniş ağla uyumludur. HF ile NH₃ sayımda eşittir; HF’nin daha yüksek kaynamasını bu sayım açıklamaz (F daha elektronegatif olduğu için tek temas daha güçlüdür)." },
    ],
    answer: `${network.map(({ m, contacts }) => `${m.formula} ${contacts}`).join(", ")} temas. Sayım suyun en yüksek kaynamasıyla uyumludur; HF > NH₃ farkı temas sayısından değil, tek temasın gücünden gelir.`,
    check: `Su için ${networkN220} · 2 = ${waterNet.contacts}; her temas iki molekül arasında ortak olduğundan molekül başına katılım ${(2 * waterNet.contacts) / networkN220}’tür.`,
    pitfall: "HF’de F’de üç çift var diye temas sayısını 3 · N almak. Tek verici H olduğu için HF’de temas sayısını verici sınırlar.",
  },
];

export const hbondCountSupplement220 = {
  title: hbondCountSection220.title,
  figureTitle: hbondCountSection220.title,
  paragraphs: hbondCountSection220.paragraphs,
  summary: `Verici: F/O/N’ye bağlı H. Alıcı: F/O/N’deki çift = (değerlik e⁻ − bağ) / 2. Saf hâlde ikisi de gerekir: ${hbondRows220.filter(({ pure }) => pure).map(({ m }) => m.formula).join(", ")} var; ${hbondRows220.filter(({ pure }) => !pure).map(({ m }) => m.formula).join(", ")} yok. İdeal ağ: N · min(verici, alıcı); ${network.map(({ m }) => `${m.formula} ${idealContacts220(m, 1) === 1 ? "" : idealContacts220(m, 1)}N`).join(", ")}. Kaynama (1 atm): ${BOILING_ORDER220.map((id) => LEWIS220[id].formula).join(" > ")}.`,
  appendSection: true as const,
  table: hbondTable,
  examples: hbondCountExamples220,
};

export const depth220Lessons = {
  "iyonik-bag-ve-guclu-etkilesimler": bondTypeSupplement220,
  "iyonik-bilesik-adlandirma": nameGridSupplement220,
  "kovalent-adlandirma-metalik-bag": covalentNameSupplement220,
  "zayif-etkilesimler": weakSupplement220,
  "hidrojen-bagi": hbondCountSupplement220,
} as const;

export const depth220Supplements = {
  "iyonik-bag-ve-guclu-etkilesimler": [bondTypeSupplement220],
  "iyonik-bilesik-adlandirma": [nameGridSupplement220],
  "kovalent-adlandirma-metalik-bag": [covalentNameSupplement220],
  "zayif-etkilesimler": [weakSupplement220],
  "hidrojen-bagi": [hbondCountSupplement220],
};

