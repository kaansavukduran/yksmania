import type { GuideSection, WorkedExample } from "./guides/types";

/*
 * TYT Kimya periyodik sistem derinleştirmesi (0.209.0). Kabul edilmiş
 * rehberler değişmez; tablo bölümü, iki özgün çözümlü örnek ve bölüm çizimi
 * görüntüleme katmanında eklenir. Katman dağılımı, periyot, grup, değerlik
 * elektronu ve sınıf atom numarasından kuralla üretilir. Ölçülmüş tek iki
 * büyüklük (birinci iyonlaşma enerjisi ve Pauling elektronegatifliği) aşağıda
 * kaynağıyla tek bir sabitte tutulur. Paragraflar, tablolar, çizim okumaları
 * ve Kopya Kâğıdı özetleri aynı verilerden yazılır; metindeki genel
 * yargılar modül yüklenirken denetlenir.
 */

const guard = (ok: boolean, claim: string) => {
  if (!ok) throw new Error(`depth209: veri bu yargıyı artık desteklemiyor: ${claim}`);
};
const comma = (x: number, digits = 0) => x.toFixed(digits).replace(".", ",");
const list = (xs: readonly (string | number)[]) => xs.join(", ");
/** Ondalığı gerekirse virgülle yazar: 317 → "317", 416.2 → "416,2". */
const dec = (x: number) => String(Math.round(x * 10) / 10).replace(".", ",");

/* ---------- Ortak veri: Z = 1–20 ---------- */

export const SYMBOLS209 = ["H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar", "K", "Ca"] as const;
export type Symbol209 = (typeof SYMBOLS209)[number];
export const NAMES209: Record<Symbol209, string> = {
  H: "Hidrojen", He: "Helyum", Li: "Lityum", Be: "Berilyum", B: "Bor", C: "Karbon", N: "Azot", O: "Oksijen", F: "Flor", Ne: "Neon",
  Na: "Sodyum", Mg: "Magnezyum", Al: "Alüminyum", Si: "Silisyum", P: "Fosfor", S: "Kükürt", Cl: "Klor", Ar: "Argon", K: "Potasyum", Ca: "Kalsiyum",
};
export const MAX_Z209 = SYMBOLS209.length;
/** TYT’de ilk 20 nötr atomun temel hâli için katman sınırları (K, L, M, N). */
export const SHELL_CAPS209 = [2, 8, 8, 2] as const;
export const SHELL_NAMES209 = ["K", "L", "M", "N"] as const;
/** Okul periyodik tablosundaki ana grup sütunları (ilk 20 element yalnız bunlarda). */
export const MAIN_GROUPS209 = [1, 2, 13, 14, 15, 16, 17, 18] as const;

export const symbol209 = (z: number) => SYMBOLS209[z - 1];
export const zOf209 = (s: Symbol209) => SYMBOLS209.indexOf(s) + 1;

/** e elektronu (e ≤ 20) 2, 8, 8, 2 sınırlarıyla içten dışa yerleştirir. */
export const shells209 = (e: number): number[] => {
  if (!Number.isInteger(e) || e < 0 || e > MAX_Z209) throw new Error(`depth209: ${e} elektron bu modelin dışında`);
  const out: number[] = [];
  let left = e;
  for (const cap of SHELL_CAPS209) {
    if (left <= 0) break;
    const n = Math.min(cap, left);
    out.push(n);
    left -= n;
  }
  return out;
};
export const shellText209 = (shells: readonly number[]) => shells.join(", ");
/** Grup numarasının A-grubu karşılığı: 1 → 1A, 13 → 3A, 18 → 8A. */
export const groupA209 = (group: number) => `${group <= 2 ? group : group - 10}A`;
export const groupText209 = (group: number) => `${group}. grup (${groupA209(group)})`;

export interface Place209 {
  z: number;
  symbol: Symbol209;
  name: string;
  shells: number[];
  period: number;
  valence: number;
  group: number;
}
/** Nötr atomun temel hâlinden periyot, değerlik elektronu ve grup. */
export const place209 = (z: number): Place209 => {
  const shells = shells209(z);
  const valence = shells[shells.length - 1];
  const full = valence === SHELL_CAPS209[shells.length - 1] && shells.length === 1;
  // He: ilk katman 2 ile dolu, 18. grup. Diğerlerinde 1–2 → 1–2, 3–8 → 13–18.
  const group = full ? 18 : valence <= 2 ? valence : valence + 10;
  const symbol = symbol209(z);
  return { z, symbol, name: NAMES209[symbol], shells, period: shells.length, valence, group };
};
export const places209: Place209[] = SYMBOLS209.map((_, i) => place209(i + 1));
const bySymbol = (s: Symbol209) => places209[zOf209(s) - 1];
const at = (period: number, group: number) => places209.find((p) => p.period === period && p.group === group);
export const periods209 = [...new Set(places209.map(({ period }) => period))];

/* ---------- Ölçülmüş veriler (yalnız Z = 1–20) ---------- */

/**
 * Birinci iyonlaşma enerjisi İE₁, kJ/mol.
 * Kaynak: NIST Atomic Spectra Database, “Ground levels and ionization
 * energies for the neutral atoms” (eV). 1 eV = 96,485 kJ/mol ile çevrilip
 * tam sayıya yuvarlandı; CRC Handbook of Chemistry and Physics tablosuyla
 * aynı değerlerdir (ör. H 13,598 eV → 1312, Be 9,323 eV → 900).
 */
export const IE1_KJ_MOL209: Record<Symbol209, number> = {
  H: 1312, He: 2372, Li: 520, Be: 900, B: 801, C: 1086, N: 1402, O: 1314, F: 1681, Ne: 2081,
  Na: 496, Mg: 738, Al: 578, Si: 787, P: 1012, S: 1000, Cl: 1251, Ar: 1521, K: 419, Ca: 590,
};
export const IE_SOURCE209 = "NIST Atomik Spektrum Veritabanı (CRC Handbook of Chemistry and Physics ile aynı değerler)";
export const EV_TO_KJ_MOL209 = 96.485;
export const IE_SOURCE_SHORT209 = "NIST verisi";

/**
 * Pauling ölçeğinde elektronegatiflik (birimsiz).
 * Kaynak: CRC Handbook of Chemistry and Physics, “Electronegativity” tablosu
 * (Pauling ölçeği, A. L. Allred 1961 güncellemesi). Soy gazlara bu ölçekte
 * değer verilmez; tabloda boş kalır.
 */
export const PAULING_EN209: Partial<Record<Symbol209, number>> = {
  H: 2.2, Li: 0.98, Be: 1.57, B: 2.04, C: 2.55, N: 3.04, O: 3.44, F: 3.98,
  Na: 0.93, Mg: 1.31, Al: 1.61, Si: 1.9, P: 2.19, S: 2.58, Cl: 3.16, K: 0.82, Ca: 1.0,
};
export const EN_SOURCE209 = "CRC Handbook of Chemistry and Physics, Pauling ölçeği (Allred güncellemesi)";
export const EN_SOURCE_SHORT209 = "CRC Handbook";
export const enText209 = (x: number) => comma(x, 2);

/* ---------- Sınıflar ---------- */

export type Class209 = "metal" | "yarı metal" | "ametal" | "soy gaz";
export const CLASSES209: readonly Class209[] = ["metal", "yarı metal", "ametal", "soy gaz"];
const FROM: Record<Class209, string> = { metal: "metalden", "yarı metal": "yarı metalden", ametal: "ametalden", "soy gaz": "soy gazdan" };
const TO: Record<Class209, string> = { metal: "metale", "yarı metal": "yarı metale", ametal: "ametale", "soy gaz": "soy gaza" };
/** İlk 20 elementin sınıfı; yarı metaller dersteki MEBİ listesinin (B, Si, Ge, As, Sb, Te, Po, At) bu aralıktaki üyeleridir. */
export const CLASS_OF209: Record<Symbol209, Class209> = {
  H: "ametal", He: "soy gaz", Li: "metal", Be: "metal", B: "yarı metal", C: "ametal", N: "ametal", O: "ametal", F: "ametal", Ne: "soy gaz",
  Na: "metal", Mg: "metal", Al: "metal", Si: "yarı metal", P: "ametal", S: "ametal", Cl: "ametal", Ar: "soy gaz", K: "metal", Ca: "metal",
};

/* =================================================================
 * 1 · Katman elektron dizilimi: Z’den periyot ve grup
 * ================================================================= */

const shellTable = {
  layout: "table" as const,
  headers: ["Grup · değerlik e⁻", ...periods209.map((p) => `${p}. periyot (${p} katman)`)],
  rows: MAIN_GROUPS209.map((g) => {
    const main = g <= 2 ? g : g - 10;
    const odd = places209.filter((p) => p.group === g && p.valence !== main);
    const valenceText = `${main} e⁻${odd.map((p) => ` (${p.symbol}: ${p.valence} e⁻)`).join("")}`;
    return [`${groupText209(g)} · ${valenceText}`, ...periods209.map((period) => {
      const p = places209.find((x) => x.period === period && x.group === g);
      return p ? `${p.symbol} (${p.z}): ${shellText209(p.shells)}` : "—";
    })];
  }),
};
const al = bySymbol("Al");
const he = bySymbol("He");
const periodMembers = (period: number) => places209.filter((p) => p.period === period).map(({ symbol }) => symbol);
const [p1, p2, p3, p4] = periods209.map(periodMembers);
const zGap = (group: number, from: number) => at(from + 1, group)!.z - at(from, group)!.z;

guard(places209.every(({ shells, z }) => shells.reduce((a, b) => a + b, 0) === z), "her satırda katmanların toplamı Z’dir");
guard(places209.filter(({ symbol }) => symbol !== "He").every(({ valence, group }) => (group <= 2 ? group : group - 10) === valence),
  "He dışında grubun A numarası değerlik elektron sayısıdır");
guard(he.valence === SHELL_CAPS209[0] && he.group === 18, "He’nin iki değerlik elektronu var ve 18. gruptadır");
guard(p2.length === 8 && p3.length === 8, "2. ve 3. periyotlar sekizer elementtir");
guard([1, 2, 13, 14, 15, 16, 17, 18].every((g) => zGap(g, 2) === 8) && [1, 2].every((g) => zGap(g, 3) === 8) && zGap(1, 1) === 2,
  "alt alta iki elementin Z farkı 2.→3. ve 3.→4. periyotta 8, 1.→2. periyotta 2’dir");

export const shellPlaceSection209: GuideSection = {
  title: "Z’den dağılım, periyot ve grup: ilk 20 element tek tabloda",
  paragraphs: [
    `Tablonun satırları grupları, sütunları periyotları gösterir. Her hücrede sembol, parantez içinde Z ve katman dağılımı vardır; hepsi yalnız atom numarasından üretilir. Nötr atomda e = Z elektron, K, L, M ve N katmanlarına içten dışa ${list(SHELL_CAPS209)} sınırlarıyla yerleştirilir. Bu sınırlar yalnız ilk ${MAX_Z209} elementin temel hâli içindir. Elektron içeren katman sayısı periyodu, en dış katmandaki elektron sayısı değerlik elektronunu verir. Örneğin Z = ${al.z} için ${shellText209(al.shells)} yazılır: ${al.period} katman, yani ${al.period}. periyot. ${al.valence} değerlik elektronu, yani ${groupText209(al.group)}.`,
    `Grup numarası değerlik elektronundan okunur. 1 ve 2 değerlik elektronu 1. ve 2. gruba, 3’ten 8’e kadar değerlik elektronu 13.–18. gruplara karşılık gelir: A numarası değerlik elektron sayısıdır. Tek istisna He’dir: ${he.valence} değerlik elektronu vardır ama ilk katmanı ${SHELL_CAPS209[0]} ile dolduğu için ${he.group}. gruptadır (${groupA209(he.group)}).`,
    `1. periyotta yalnız ${list(p1)} vardır. 2. periyot ${p2[0]}–${p2[p2.length - 1]}, 3. periyot ${p3[0]}–${p3[p3.length - 1]} arasında ${p2.length}’er elementtir. 4. periyodun bu tablodaki üyeleri ${list(p4)}’dır. Aynı gruptaki alt alta iki elementin Z farkı 2. ile 3. periyot arasında ${zGap(1, 2)}, 3. ile 4. periyot arasında da ${zGap(1, 3)}’dir. 1. ile 2. periyot arasında ise ${zGap(1, 1)}’dir (${at(1, 1)!.symbol} ile ${at(2, 1)!.symbol}).`,
  ],
  table: shellTable,
};

const x13 = at(3, 13)!;
export const yOffset209 = 5;
const y13 = place209(x13.z + yOffset209);
const quad = [9, 12, 17, 20].map(place209);
const pairsBy = (key: "group" | "period") => {
  const out: [Place209, Place209][] = [];
  quad.forEach((a, i) => quad.slice(i + 1).forEach((b) => { if (a[key] === b[key]) out.push([a, b]); }));
  return out;
};
export const quadGroupPairs209 = pairsBy("group");
export const quadPeriodPairs209 = pairsBy("period");
const pairZ = (pairs: [Place209, Place209][]) => pairs.map(([a, b]) => `${a.z} ile ${b.z}`).join(", ");

export const shellExamples209: WorkedExample[] = [
  {
    title: "Periyot ve gruptan atom numarasına, oradan yeni elemente",
    prompt: `Nötr X atomu ${x13.period}. periyot ve ${x13.group}. gruptadır. Y atomunun proton sayısı X’inkinden ${yOffset209} fazladır. İki atom da temel hâldedir. Y’nin katman dağılımı, periyodu ve grubu nedir?`,
    strategy: "Periyot katman sayısını, grup değerlik elektronunu verir. Önce X’in dağılımını kur, Z’sini topla. Sonra Y için yeniden dağıt.",
    steps: [
      { label: "X’in dağılımı", expression: `${x13.period} katman, ${x13.valence} değerlik e⁻ ⇒ ${shellText209(x13.shells)}`, explanation: `${x13.group}. grup ${groupA209(x13.group)} demektir; en dış katmanda ${x13.valence} elektron vardır. İç katmanlar doludur.` },
      { label: "X’in Z’si", expression: `Z(X) = ${x13.shells.join(" + ")} = ${x13.z}`, explanation: "Nötr atomda elektron sayısı proton sayısına eşittir." },
      { label: "Y’nin Z’si", expression: `Z(Y) = ${x13.z} + ${yOffset209} = ${y13.z}`, explanation: "Proton sayısı atom numarasıdır." },
      { label: "Y’yi dağıt", expression: `${shellText209(y13.shells)} ⇒ ${y13.period}. periyot, ${y13.valence} değerlik e⁻`, explanation: `M katmanı ${SHELL_CAPS209[2]} ile dolar; yeni katman açılmaz.` },
    ],
    answer: `Y: Z = ${y13.z}, dağılım ${shellText209(y13.shells)}; ${y13.period}. periyot, ${groupText209(y13.group)}. Y ${y13.name.toLocaleLowerCase("tr-TR")} (${y13.symbol}) atomudur.`,
    check: `Toplam ${y13.shells.join(" + ")} = ${y13.z}. X ${x13.symbol} (${x13.z}), Y ${y13.symbol} (${y13.z}); ikisi de ${x13.period}. periyotta.`,
    pitfall: "Z büyüdü diye Y’yi bir sonraki periyoda taşımak. Yeni periyot, en dış katman sınırına ulaşıldıktan sonra yeni katman açılınca başlar.",
  },
  {
    title: `${quad.length} atom numarasında aynı grup ve aynı periyot eşleri`,
    prompt: `Atom numaraları ${list(quad.map(({ z }) => z))} olan ${quad.length} nötr atom veriliyor. Hangileri aynı gruptadır, hangileri aynı periyottadır?`,
    strategy: "Her Z için dağılımı yaz. Katman sayısı periyodu, en dış katmandaki elektron sayısı grubu verir. Sonra eşleri ara.",
    steps: [
      ...quad.map((p) => ({ label: `Z = ${p.z}`, expression: `${shellText209(p.shells)} ⇒ ${p.period}. periyot, ${p.group}. grup`, explanation: `${p.period} katman, en dışta ${p.valence} elektron.` })),
      { label: "Eşleri ara", expression: `Aynı grup: ${pairZ(quadGroupPairs209)}. Aynı periyot: ${pairZ(quadPeriodPairs209)}.`, explanation: "Grup eşleri aynı değerlik elektronunu, periyot eşleri aynı katman sayısını taşır." },
    ],
    answer: `Aynı grupta: ${quadGroupPairs209.map(([a, b]) => `${a.z} ile ${b.z} (${a.group}. grup)`).join(", ")}. Aynı periyotta: ${quadPeriodPairs209.map(([a, b]) => `${a.z} ile ${b.z} (${a.period}. periyot)`).join(", ")}.`,
    check: `Grup eşlerinin Z farkı ${quadGroupPairs209.map(([a, b]) => b.z - a.z).join(" ve ")}; bu, alt alta elementler arasındaki farktır.`,
    pitfall: `Aynı periyottaki atomları aynı gruptaymış gibi benzer saymak. Z = ${quadPeriodPairs209[0][0].z} ile Z = ${quadPeriodPairs209[0][1].z} aynı periyottadır ama değerlik elektronları ${quadPeriodPairs209[0][0].valence} ve ${quadPeriodPairs209[0][1].valence}’dir.`,
  },
];
guard(quadGroupPairs209.length === 2 && quadPeriodPairs209.length === 1, "dört atomda iki grup eşi ve bir periyot eşi vardır");
guard(place209(12).valence === 2 && place209(17).valence === 7, "Z = 12 ve Z = 17 değerlik elektronları 2 ve 7’dir");

export const shellPlaceSupplement209 = {
  title: shellPlaceSection209.title,
  figureTitle: shellPlaceSection209.title,
  paragraphs: shellPlaceSection209.paragraphs,
  summary: `e = Z, ${list(SHELL_CAPS209)} sınırlarıyla dağıt. Katman sayısı = periyot; en dış katman = değerlik e⁻ = A numarası (1–2 → 1–2. grup, 3–8 → 13–18. grup). He ${he.valence} e⁻ ama ${he.group}. grup. Z = ${al.z}: ${shellText209(al.shells)} → ${al.period}. periyot, ${al.group}. grup.`,
  appendSection: true as const,
  table: shellTable,
  examples: shellExamples209,
};

/* =================================================================
 * 2 · Elementlerin sınıflandırılması: periyot periyot sınıflar
 * ================================================================= */

export const classRows209 = periods209.map((period) => {
  const members = places209.filter((p) => p.period === period);
  const byClass = Object.fromEntries(CLASSES209.map((c) => [c, members.filter(({ symbol }) => CLASS_OF209[symbol] === c).map(({ symbol }) => symbol)])) as Record<Class209, Symbol209[]>;
  return { period, members, byClass };
});
export const classTotals209 = Object.fromEntries(CLASSES209.map((c) => [c, places209.filter(({ symbol }) => CLASS_OF209[symbol] === c).length])) as Record<Class209, number>;
const cellText = (xs: readonly string[]) => (xs.length ? `${list(xs)} (${xs.length})` : "—");
const classTable = {
  layout: "table" as const,
  headers: ["Periyot", "Metal", "Yarı metal", "Ametal", "Soy gaz"],
  rows: [
    ...classRows209.map(({ period, byClass }) => [`${period}. periyot`, ...CLASSES209.map((c) => cellText(byClass[c]))]),
    ["Toplam", ...CLASSES209.map((c) => String(classTotals209[c]))],
  ],
};
const metalloids = places209.filter(({ symbol }) => CLASS_OF209[symbol] === "yarı metal");
const nobles = places209.filter(({ symbol }) => CLASS_OF209[symbol] === "soy gaz");
const [row2, row3] = [classRows209[1], classRows209[2]];
const rank = (c: Class209) => CLASSES209.indexOf(c);

guard(nobles.every(({ group }) => group === 18) && places209.filter(({ group }) => group === 18).length === nobles.length, "soy gaz sütunu tam olarak 18. gruptur");
guard(CLASS_OF209.H === "ametal" && bySymbol("H").group === 1, "H 1. grupta olduğu hâlde ametaldir");
guard(places209.filter(({ symbol, group }) => group !== 18 && symbol !== "H" && symbol !== "B").filter(({ valence }) => valence <= 3).every(({ symbol }) => CLASS_OF209[symbol] === "metal"),
  "H ve B dışında 1–3 değerlik elektronlu elementler metaldir");
guard(places209.filter(({ group, symbol }) => group !== 18 && symbol !== "Si").filter(({ valence }) => valence >= 4).every(({ symbol }) => CLASS_OF209[symbol] === "ametal"),
  "Si dışında 4–7 değerlik elektronlu elementler ametaldir");
guard(classRows209.slice(1).every(({ members }) => members.every((p, i) => i === 0 || rank(CLASS_OF209[members[i - 1].symbol]) <= rank(CLASS_OF209[p.symbol]))),
  "periyotta soldan sağa sınıf sırası metal → yarı metal → ametal → soy gaz bozulmaz (H’siz periyotlar)");
guard(CLASS_OF209[at(2, 13)!.symbol] === "yarı metal" && CLASS_OF209[at(3, 13)!.symbol] === "metal", "13. grup 2. periyotta yarı metal, 3. periyotta metaldir");
guard(Object.values(classTotals209).reduce((a, b) => a + b, 0) === MAX_Z209, "sınıf toplamı 20’dir");

export const classSection209: GuideSection = {
  title: "İlk 20 elementi periyot periyot dört sınıfa ayır",
  paragraphs: [
    `Tablo ilk ${MAX_Z209} elementi periyot sırasıyla dört sınıfa ayırır; parantezdeki sayı o hücredeki element sayısıdır. Soy gaz sütunu 18. gruptur: ${list(nobles.map(({ symbol }) => symbol))}. Yarı metal sütunu, derste verilen MEBİ yarı metal listesinin bu aralığa düşen üyeleridir: ${list(metalloids.map(({ symbol }) => symbol))}. H 1. grupta olduğu hâlde ametal sütunundadır.`,
    `Kalan elementlerde değerlik elektronu sınıfı TYT düzeyinde doğru tahmin eder. H ve B dışında 1, 2 veya 3 değerlik elektronlu elementler metaldir. Si dışında 4–7 değerlik elektronlu elementler ametaldir. Toplamda ${classTotals209.metal} metal, ${classTotals209["yarı metal"]} yarı metal, ${classTotals209.ametal} ametal ve ${classTotals209["soy gaz"]} soy gaz vardır. Bu kural yalnız bu ${MAX_Z209} element içindir; daha ağır elementlerde liste ve özellikler birlikte kullanılır.`,
    `2. ve 3. periyotta soldan sağa sınıf sırası hiç bozulmaz: metal, sonra yarı metal, sonra ametal, en sonda soy gaz. 2. periyotta ${list(row2.byClass.metal)} metal, ${list(row2.byClass["yarı metal"])} yarı metal, ${list(row2.byClass.ametal)} ametal, ${list(row2.byClass["soy gaz"])} soy gazdır. 3. periyotta metal sayısı ${row3.byClass.metal.length}’e çıkar (${list(row3.byClass.metal)}) ve yarı metal ${list(row3.byClass["yarı metal"])} olur. Sınır sağa kayar: 13. grup 2. periyotta yarı metal (${at(2, 13)!.symbol}), 3. periyotta metaldir (${at(3, 13)!.symbol}).`,
  ],
  table: classTable,
};

export const classMystery209 = [
  { letter: "X", z: 12 },
  { letter: "Y", z: 5 },
  { letter: "T", z: 17 },
  { letter: "Q", z: 18 },
].map(({ letter, z }) => ({ letter, ...place209(z), cls: CLASS_OF209[symbol209(z)] }));
const row3Members = row3.members;
export const classChanges209 = (members: readonly Place209[]) => members.slice(1).flatMap((p, i) => {
  const prev = members[i];
  return CLASS_OF209[prev.symbol] === CLASS_OF209[p.symbol]
    ? []
    : [{ from: prev.group, to: p.group, fromClass: CLASS_OF209[prev.symbol], toClass: CLASS_OF209[p.symbol] }];
});
export const row3ClassChanges209 = classChanges209(row3Members);
const row2First = classChanges209(row2.members)[0];

export const classExamples209: WorkedExample[] = [
  {
    title: "Katman dağılımından sınıfa",
    prompt: `${classMystery209.length} nötr atomun temel hâl katman dağılımları veriliyor: ${classMystery209.map(({ letter, shells }) => `${letter}: ${shellText209(shells)}`).join("; ")}. Her birinin sınıfı nedir? (Yarı metal olarak MEBİ listesini kullan: B, Si, Ge, As, Sb, Te, Po, At.)`,
    strategy: "Dağılımı topla, Z’yi ve elementi bul. Periyot ve grubu oku. Sonra özel durumları (H, He, B, Si) kontrol edip sınıfa karar ver.",
    steps: [
      ...classMystery209.map(({ letter, shells, z, symbol, period, group, cls }) => ({
        label: letter,
        expression: `${shells.join(" + ")} = ${z} ⇒ ${symbol}, ${period}. periyot ${group}. grup`,
        explanation: cls === "yarı metal" ? `${symbol} listedeki yarı metaldir; 3 değerlik elektronu olsa da metal değildir.` : cls === "soy gaz" ? "18. grup: soy gaz." : cls === "metal" ? "Az değerlik elektronlu, solda: metal." : "Çok değerlik elektronlu, sağda: ametal.",
      })),
    ],
    answer: classMystery209.map(({ letter, symbol, cls }) => `${letter} = ${symbol}: ${cls}`).join("; ") + ".",
    check: `${classMystery209[1].letter} ile ${bySymbol("Al").symbol} aynı gruptadır (${bySymbol("Al").group}. grup), ama ${classMystery209[1].symbol} yarı metal, ${bySymbol("Al").symbol} metaldir. Grup tek başına sınıfı belirlemez.`,
    pitfall: `${at(2, 13)!.valence} değerlik elektronu gören her atomu metal saymak. ${at(2, 13)!.symbol}, ${at(2, 13)!.group}. grupta olduğu hâlde yarı metaldir.`,
  },
  {
    title: `${row3.period}. periyotta sınıfları say, sınırları bul`,
    prompt: `${row3.period}. periyottaki ${row3Members.length} elementi sınıflarına göre say. Soldan sağa giderken sınıf hangi gruplar arasında değişir?`,
    strategy: `Periyodu Z = ${row3Members[0].z}’den ${row3Members[row3Members.length - 1].z}’e kadar yaz, her elementin sınıfını işaretle. Sınıfın değiştiği komşu grupları not et.`,
    steps: [
      { label: "Elementler", expression: list(row3Members.map(({ symbol, group }) => `${symbol} (${group})`)), explanation: "Parantezde grup numarası." },
      ...CLASSES209.map((c) => ({ label: c.charAt(0).toLocaleUpperCase("tr-TR") + c.slice(1), expression: `${list(row3.byClass[c])} ⇒ ${row3.byClass[c].length}`, explanation: c === "yarı metal" ? `MEBİ listesindeki tek ${row3.period}. periyot üyesi.` : c === "soy gaz" ? "Periyodun son elementi." : `${row3Members.filter(({ symbol }) => CLASS_OF209[symbol] === c).map(({ group }) => group).join(", ")}. gruplar.` })),
      { label: "Sınırlar", expression: row3ClassChanges209.map(({ from, to }) => `${from} → ${to}`).join(", "), explanation: "Sınıfın değiştiği komşu grup çiftleri." },
    ],
    answer: `${CLASSES209.map((c) => `${row3.byClass[c].length} ${c} (${list(row3.byClass[c])})`).join(", ")}. Sınıf ${row3ClassChanges209.map(({ from, to, fromClass, toClass }) => `${from} → ${to}. grup arasında ${FROM[fromClass]} ${TO[toClass]}`).join(", ")} geçer.`,
    check: `${CLASSES209.map((c) => row3.byClass[c].length).join(" + ")} = ${row3Members.length}. ${row2.period}. periyotta 13. grup (${at(2, 13)!.symbol}) yarı metal olduğu için orada ilk sınır ${row2First.from} → ${row2First.to}. gruptadır.`,
    pitfall: `${row2.period}. periyottaki sınırı ${row3.period}. periyoda taşımak ve ${at(3, 13)!.symbol}’yi yarı metal saymak. ${row3.period}. periyotta yarı metal yalnız ${list(row3.byClass["yarı metal"])}’dir.`,
  },
];
guard(row3ClassChanges209.length === 3, "3. periyotta sınıf üç yerde değişir");

export const classSupplement209 = {
  title: classSection209.title,
  figureTitle: classSection209.title,
  paragraphs: classSection209.paragraphs,
  summary: `İlk ${MAX_Z209} element: ${classTotals209.metal} metal, ${classTotals209["yarı metal"]} yarı metal (${list(metalloids.map(({ symbol }) => symbol))}), ${classTotals209.ametal} ametal (H dahil), ${classTotals209["soy gaz"]} soy gaz (18. grup). H ve B dışında 1–3 değerlik e⁻ → metal; Si dışında 4–7 → ametal. 13. grup: ${at(2, 13)!.symbol} yarı metal, ${at(3, 13)!.symbol} metal.`,
  appendSection: true as const,
  table: classTable,
  examples: classExamples209,
};

/* =================================================================
 * 3 · Atom çapı karşılaştırma: hangi kural karar verir?
 * ================================================================= */

export interface Species209 { z: number; q: number }
const SUPS: Record<string, string> = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴" };
export const speciesText209 = ({ z, q }: Species209) =>
  `${symbol209(z)}${q === 0 ? "" : `${Math.abs(q) > 1 ? SUPS[String(Math.abs(q))] : ""}${q > 0 ? "⁺" : "⁻"}`}`;
export const electrons209 = ({ z, q }: Species209) => z - q;
export const speciesShells209 = (s: Species209) => shells209(electrons209(s));

export type RadiusRule209 = "aynı element" | "eş elektronlu" | "aynı grup" | "aynı periyot" | "kural yok";
export const RULE_TEXT209: Record<RadiusRule209, string> = {
  "aynı element": "Aynı element: elektronu fazla olan büyük",
  "eş elektronlu": "Eş elektronlu: protonu fazla olan küçük",
  "aynı grup": "Aynı grup: katmanı fazla olan büyük",
  "aynı periyot": "Aynı periyot: protonu fazla olan küçük",
  "kural yok": "Farklı grup ve periyot: bu kurallar karar vermez",
};
/** Dersin dört karşılaştırma kuralı; uygulanamazsa bigger = null. */
export const compareRadius209 = (a: Species209, b: Species209): { rule: RadiusRule209; bigger: Species209 | null } => {
  if (a.z === b.z) return { rule: "aynı element", bigger: electrons209(a) > electrons209(b) ? a : b };
  if (electrons209(a) === electrons209(b)) return { rule: "eş elektronlu", bigger: a.z < b.z ? a : b };
  if (a.q === 0 && b.q === 0) {
    const [pa, pb] = [place209(a.z), place209(b.z)];
    if (pa.group === pb.group) return { rule: "aynı grup", bigger: pa.period > pb.period ? a : b };
    if (pa.period === pb.period) return { rule: "aynı periyot", bigger: a.z < b.z ? a : b };
  }
  return { rule: "kural yok", bigger: null };
};
const RULE_COUNT = Object.keys(RULE_TEXT209).length - 1;
export const radiusPairs209: [Species209, Species209][] = [
  [{ z: 4, q: 0 }, { z: 20, q: 0 }],
  [{ z: 15, q: 0 }, { z: 17, q: 0 }],
  [{ z: 16, q: 0 }, { z: 16, q: -2 }],
  [{ z: 20, q: 0 }, { z: 20, q: 2 }],
  [{ z: 17, q: -1 }, { z: 19, q: 1 }],
  [{ z: 3, q: 0 }, { z: 17, q: 0 }],
];
export const radiusRows209 = (pairs: readonly [Species209, Species209][] = radiusPairs209) => pairs.map(([a, b]) => {
  const { rule, bigger } = compareRadius209(a, b);
  return { a, b, rule, bigger, shells: [speciesShells209(a).length, speciesShells209(b).length] as const };
});
const radiusRows = radiusRows209();
const pairText = ({ a, b }: { a: Species209; b: Species209 }) => `${speciesText209(a)} – ${speciesText209(b)}`;
const pe = (s: Species209) => `${s.z} / ${electrons209(s)}`;
const radiusTable = {
  layout: "table" as const,
  headers: ["Çift", "p⁺ / e⁻", "Elektron içeren katman", "Karar veren kural", "Daha büyük"],
  rows: radiusRows.map((row) => [
    pairText(row),
    `${pe(row.a)} · ${pe(row.b)}`,
    `${row.shells[0]} · ${row.shells[1]}`,
    RULE_TEXT209[row.rule],
    row.bigger ? speciesText209(row.bigger) : "Karar yok, veri gerekir",
  ]),
};
const ruleRow = (rule: RadiusRule209) => radiusRows.find((row) => row.rule === rule)!;
const [rowGroup, rowPeriod, rowIso, rowNone] = (["aynı grup", "aynı periyot", "eş elektronlu", "kural yok"] as const).map(ruleRow);
const sameElementRows = radiusRows.filter(({ rule }) => rule === "aynı element");

guard(radiusRows.filter(({ bigger }) => bigger).length === radiusRows.length - 1, "altı çiftten yalnız biri kuralsız kalır");
guard(rowNone.shells[0] < rowNone.shells[1] && place209(rowNone.a.z).group !== place209(rowNone.b.z).group && place209(rowNone.a.z).period !== place209(rowNone.b.z).period,
  "kuralsız çiftte katman sayıları farklıdır ama grup ve periyot ortak değildir");
guard(rowIso.a.q !== 0 && rowIso.b.q !== 0 && electrons209(rowIso.a) === electrons209(rowIso.b) && rowIso.shells[0] === rowIso.shells[1], "eş elektronlu çiftte katman sayısı da aynıdır");
guard(sameElementRows.every(({ a, b, bigger }) => bigger === (electrons209(a) > electrons209(b) ? a : b)), "aynı elementte elektronu fazla olan büyüktür");
guard(rowPeriod.shells[0] === rowPeriod.shells[1], "aynı periyottaki iki nötr atomun katman sayısı eşittir");

export const radiusRuleSection209: GuideSection = {
  title: "Çift karşılaştırmada önce hangi kuralın karar verdiğini seç",
  paragraphs: [
    `Tabloda ${radiusRows.length} çift var. Her satırda önce proton (p⁺ = Z) ve elektron (e⁻ = Z − q) sayıları yazılır; q işaretli yüktür. Sonra elektronlar ${list(SHELL_CAPS209)} sınırlarıyla dağıtılıp elektron içeren katmanlar sayılır. Karar sırası sabittir: aynı element mi, eş elektronlu mu, aynı grup mu, aynı periyot mu? İlk uyan kural karşılaştırmayı bitirir.`,
    `${pairText(rowGroup)} aynı gruptadır; katmanlar ${rowGroup.shells[0]} ve ${rowGroup.shells[1]} olduğundan ${speciesText209(rowGroup.bigger!)} büyüktür. ${pairText(rowPeriod)} aynı periyotta ${rowPeriod.shells[0]}’er katman taşır; protonu az olan ${speciesText209(rowPeriod.bigger!)} büyüktür. ${pairText(rowIso)} çiftinde ikisinin de ${electrons209(rowIso.a)} elektronu ve ${rowIso.shells[0]} katmanı vardır. Protonu az olan ${speciesText209(rowIso.bigger!)} elektronları daha zayıf çeker ve büyüktür. ${sameElementRows.map((row) => `${pairText(row)} çiftinde ${speciesText209(row.bigger!)}`).join(", ")} büyüktür, çünkü aynı çekirdeğin elektronu fazla olan hâlidir.`,
    `${pairText(rowNone)} satırında ${speciesText209(rowNone.a)} ${rowNone.shells[0]}, ${speciesText209(rowNone.b)} ${rowNone.shells[1]} katman taşır. Ama iki atom ne aynı gruptadır ne aynı periyottadır. Tablonun ${RULE_COUNT} kuralından hiçbiri uygulanmaz. Bu çiftte katman sayısına bakıp “katmanı fazla olan büyüktür” deme; soru ölçülmüş yarıçap veriyorsa o veriyi kullan, vermiyorsa kesin sıra kurma.`,
  ],
  table: radiusTable,
};

export const isoSeries209: Species209[] = [{ z: 19, q: 1 }, { z: 16, q: -2 }, { z: 20, q: 2 }, { z: 17, q: -1 }];
const isoSorted = [...isoSeries209].sort((x, y) => (compareRadius209(x, y).bigger === x ? -1 : 1));
export const chain209: Species209[] = [{ z: 12, q: 2 }, { z: 12, q: 0 }, { z: 20, q: 0 }];
const [mg2, mg, ca] = chain209;

guard(isoSeries209.every((s) => electrons209(s) === electrons209(isoSeries209[0])), "dört iyon eş elektronludur");
guard(compareRadius209(mg2, mg).bigger === mg && compareRadius209(mg, ca).bigger === ca, "Mg²⁺ < Mg < Ca zinciri iki kuralla kurulur");
guard(compareRadius209(mg2, ca).rule === "kural yok", "Mg²⁺ ile Ca doğrudan dört kuralla karşılaştırılamaz");

export const radiusExamples209: WorkedExample[] = [
  {
    title: `${electrons209(isoSeries209[0])} elektronlu ${isoSeries209.length} iyonu sırala`,
    prompt: `Atom numaraları K = 19, S = 16, Ca = 20, Cl = 17 olmak üzere ${list(isoSeries209.map(speciesText209))} iyonlarını yarıçapı büyükten küçüğe sırala.`,
    strategy: "Önce her iyonun elektron sayısını e = Z − q ile bul. Hepsi eşitse eş elektronlu kural geçerlidir: protonu fazla olan küçük.",
    steps: [
      { label: "Elektronlar", expression: isoSeries209.map((s) => `${speciesText209(s)}: ${s.z} − (${s.q > 0 ? "+" : "−"}${Math.abs(s.q)}) = ${electrons209(s)}`).join("; "), explanation: "Pozitif iyon elektron vermiş, negatif iyon elektron almıştır." },
      { label: "Katmanlar", expression: `hepsi ${shellText209(speciesShells209(isoSeries209[0]))}`, explanation: "Elektron sayısı ve katman sayısı aynı; fark yalnız çekirdekte." },
      { label: "Protonlar", expression: [...isoSeries209].sort((x, y) => x.z - y.z).map((s) => `${speciesText209(s)} ${s.z}`).join(" < "), explanation: "Proton fazlaysa aynı elektron bulutu daha güçlü çekilir." },
      { label: "Sırala", expression: isoSorted.map(speciesText209).join(" > "), explanation: "Büyükten küçüğe: protonu en az olandan en çok olana." },
    ],
    answer: `${isoSorted.map(speciesText209).join(" > ")}.`,
    check: `Uçlar: ${speciesText209(isoSorted[0])} ${isoSorted[0].z} protonla en zayıf, ${speciesText209(isoSorted[isoSorted.length - 1])} ${isoSorted[isoSorted.length - 1].z} protonla en güçlü çeker. Yükler ${isoSorted.map(({ q }) => (q > 0 ? `+${q}` : `−${-q}`)).join(", ")} sırasındadır.`,
    pitfall: "Yükün büyüklüğüne bakıp S²⁻ ile Ca²⁺’yı aynı boyda saymak. Eş elektronlu seride işaretli yük ve proton sayısı birlikte okunur.",
  },
  {
    title: "Doğrudan kural yoksa iki kuralı zincirle",
    prompt: `Atom numaraları Mg = 12, Ca = 20 olmak üzere ${list(chain209.map(speciesText209))} taneciklerini yarıçapı küçükten büyüğe sırala.`,
    strategy: `${speciesText209(mg2)} ile ${speciesText209(ca)} için tek kural yoktur. Ortadaki ${speciesText209(mg)} her ikisiyle ayrı bir kuralla karşılaştırılabilir; iki sonucu zincirle.`,
    steps: [
      { label: "Aynı element", expression: `${speciesText209(mg2)} < ${speciesText209(mg)}`, explanation: `Proton ${mg.z}’de kalır, elektron ${electrons209(mg)}’den ${electrons209(mg2)}’a iner; dağılım ${shellText209(speciesShells209(mg))} → ${shellText209(speciesShells209(mg2))}.` },
      { label: "Aynı grup", expression: `${speciesText209(mg)} < ${speciesText209(ca)}`, explanation: `İkisi ${place209(mg.z).group}. gruptadır; katmanlar ${speciesShells209(mg).length} ve ${speciesShells209(ca).length}.` },
      { label: "Zincir", expression: `${speciesText209(mg2)} < ${speciesText209(mg)} < ${speciesText209(ca)}`, explanation: "Küçüğün küçüğü de küçüktür." },
    ],
    answer: `${chain209.map(speciesText209).join(" < ")}.`,
    check: `Katmanlar ${chain209.map((s) => speciesShells209(s).length).join(" < ")} ile de uyumlu; ama karar iki ayrı kuralla verildi, katman sayısı tek başına kanıt değildir.`,
    pitfall: `${speciesText209(mg2)} ile ${speciesText209(ca)} için doğrudan bir kural uydurmak. Ortak bir halka (${speciesText209(mg)}) bulup iki güvenli karşılaştırmayı birleştir.`,
  },
];

export const radiusRuleSupplement209 = {
  title: radiusRuleSection209.title,
  figureTitle: radiusRuleSection209.title,
  paragraphs: radiusRuleSection209.paragraphs,
  summary: `Sıra: aynı element (e⁻ fazla → büyük) → eş elektronlu (p⁺ fazla → küçük) → aynı grup (katman fazla → büyük) → aynı periyot (p⁺ fazla → küçük). ${pairText(rowNone)} gibi farklı grup ve periyotta kural yok. Örnek: ${isoSorted.map(speciesText209).join(" > ")}.`,
  appendSection: true as const,
  table: radiusTable,
  examples: radiusExamples209,
};

/* =================================================================
 * 4 · İyonlaşma enerjisi: ölçülmüş İE₁ tablosu
 * ================================================================= */

const cellOf = (period: number, group: number, value: (s: Symbol209) => string) => {
  const p = at(period, group);
  return p ? `${p.symbol} ${value(p.symbol)}` : "—";
};
const ie = (s: Symbol209) => IE1_KJ_MOL209[s];
const ieTable = {
  layout: "table" as const,
  headers: ["Grup", ...periods209.map((p) => `${p}. periyot`)],
  rows: MAIN_GROUPS209.map((g) => [groupText209(g), ...periods209.map((p) => cellOf(p, g, (s) => String(ie(s))))]),
};
export const periodMembers209 = (period: number) => places209.filter((p) => p.period === period);
/** Periyotta soldan sağa İE₁’in düştüğü komşu çiftler. */
export const ieDips209 = (period: number) => {
  const m = periodMembers209(period);
  return m.slice(1).flatMap((p, i) => (ie(p.symbol) < ie(m[i].symbol) ? [[m[i].symbol, p.symbol] as const] : []));
};
const groupMembers = (g: number) => places209.filter(({ group }) => group === g);
const ieMax = places209.reduce((a, b) => (ie(b.symbol) > ie(a.symbol) ? b : a));
const ieMin = places209.reduce((a, b) => (ie(b.symbol) < ie(a.symbol) ? b : a));
const [dips2, dips3] = [ieDips209(2), ieDips209(3)];
const g1 = groupMembers(1);
const g18 = groupMembers(18);
const extremes = (period: number) => {
  const m = periodMembers209(period);
  return { hi: m.reduce((a, b) => (ie(b.symbol) > ie(a.symbol) ? b : a)), lo: m.reduce((a, b) => (ie(b.symbol) < ie(a.symbol) ? b : a)) };
};

guard(MAIN_GROUPS209.every((g) => groupMembers(g).every((p, i, xs) => i === 0 || ie(p.symbol) < ie(xs[i - 1].symbol))), "her grupta aşağı inerken İE₁ azalır");
guard(JSON.stringify(dips2) === JSON.stringify([["Be", "B"], ["N", "O"]]) && JSON.stringify(dips3) === JSON.stringify([["Mg", "Al"], ["P", "S"]]),
  "2. ve 3. periyotta İE₁ yalnız 2A→3A ve 5A→6A geçişlerinde düşer");
guard([1, 2, 3].every((p) => extremes(p).hi.group === 18 && extremes(p).lo.group === 1), "1–3. periyotlarda en yüksek İE₁ soy gazda, en düşük 1. gruptadır");
guard(ieMax.symbol === "He" && ieMin.symbol === "K", "ilk 20 elementte en yüksek He, en düşük K");
guard(ie("Ca") > ie("K"), "4. periyotta Ca > K");

export const ieSection209: GuideSection = {
  title: "Ölçülmüş birinci iyonlaşma enerjileri: Z = 1–20 tablosu",
  paragraphs: [
    `Tablodaki sayılar ölçülmüş birinci iyonlaşma enerjileridir (İE₁, birimi kJ/mol). Kaynak: ${IE_SOURCE209}; eV cinsinden değerler 1 eV = ${comma(EV_TO_KJ_MOL209, 3)} kJ/mol ile çevrilip tam sayıya yuvarlandı. Satırlar grupları, sütunlar periyotları gösterir. Bir satırda sağa gitmek grupta aşağı inmektir; bir sütunda aşağı inmek periyotta soldan sağa ilerlemektir.`,
    `Her satırda soldan sağa (grupta aşağı) değer küçülür. 1. grupta ${g1.map(({ symbol }) => `${symbol} ${ie(symbol)}`).join(" > ")}; 18. grupta ${g18.map(({ symbol }) => `${symbol} ${ie(symbol)}`).join(" > ")}. Grupta aşağı inerken katman sayısı artar ve dış elektron daha kolay kopar. Tablonun en yüksek değeri ${ieMax.symbol}’de (${ie(ieMax.symbol)}), en düşük değeri ${ieMin.symbol}’de (${ie(ieMin.symbol)}).`,
    `Bir sütunda yukarıdan aşağı (periyotta soldan sağa) genel yön artıştır, ama 2. periyotta iki yerde düşer: ${dips2.map(([a, b]) => `${a} ${ie(a)} > ${b} ${ie(b)}`).join(" ve ")}. 3. periyotta aynı gruplarda düşer: ${dips3.map(([a, b]) => `${a} ${ie(a)} > ${b} ${ie(b)}`).join(" ve ")}. Bunlar dersteki dolu s ve yarı dolu p istisnalarıdır. İlk üç periyodun her birinde en yüksek değer soy gazda (${[1, 2, 3].map((p) => extremes(p).hi.symbol).join(", ")}), en düşük değer 1. grup elementindedir (${[1, 2, 3].map((p) => extremes(p).lo.symbol).join(", ")}).`,
  ],
  table: ieTable,
};

export const ieOrderSet209: Symbol209[] = ["O", "B", "N", "C"];
const ieOrdered = [...ieOrderSet209].sort((a, b) => ie(a) - ie(b));
export const ieMoles209 = 0.2;
export const ieMolePair209: [Symbol209, Symbol209] = ["Ne", "Na"];
const [neS, naS] = ieMolePair209;
export const ieMoleEnergies209 = ieMolePair209.map((s) => Math.round(ieMoles209 * ie(s) * 10) / 10);
const [neE, naE] = ieMoleEnergies209;
const ieDiff = Math.round((neE - naE) * 10) / 10;

export const ieExamples209: WorkedExample[] = [
  {
    title: `${place209(zOf209(ieOrderSet209[0])).period}. periyotta ${ieOrderSet209.length} elementi tabloyla sırala`,
    prompt: `Tablodaki ölçülmüş değerleri kullanarak ${list(ieOrderSet209)} atomlarını birinci iyonlaşma enerjisine göre küçükten büyüğe sırala. Genel “sağa artar” yönünden hangi çift sapar?`,
    strategy: `Hepsi ${place209(zOf209(ieOrderSet209[0])).period}. periyottadır. Önce genel yönle tahmin et, sonra tablodaki sayılarla denetle.`,
    steps: [
      { label: "Genel yön", expression: [...ieOrderSet209].sort((a, b) => zOf209(a) - zOf209(b)).join(" < "), explanation: "Periyotta soldan sağa (Z artarken) İE₁ genellikle artar." },
      { label: "Tablo", expression: [...ieOrderSet209].sort((a, b) => zOf209(a) - zOf209(b)).map((s) => `${s} ${ie(s)}`).join(", "), explanation: "Birim kJ/mol." },
      { label: "Sapma", expression: `N ${ie("N")} > O ${ie("O")}`, explanation: "O’da eşleşmiş p elektronları birbirini iter; bir elektron N’dekinden daha kolay kopar." },
      { label: "Sırala", expression: ieOrdered.join(" < "), explanation: "Sayılara göre küçükten büyüğe." },
    ],
    answer: `${ieOrdered.join(" < ")}. Genel yönden sapan çift N–O’dur.`,
    check: `${ieOrdered.map((s) => ie(s)).join(" < ")} kJ/mol.`,
    pitfall: "Z büyüdükçe İE₁ hep artar diye O’yu N’den sonraya koymak. Tablo N > O olduğunu gösterir.",
  },
  {
    title: "Mol sayısıyla gereken enerji ve yeni katmanın etkisi",
    prompt: `Gaz hâlindeki ${comma(ieMoles209, 1)} mol ${neS} atomunun ve ${comma(ieMoles209, 1)} mol ${naS} atomunun her birinden birer elektron koparılıyor. Tablodaki İE₁ değerlerine göre her biri için kaç kJ enerji gerekir? Fark neden bu kadar büyüktür? (Ne: Z = ${zOf209(neS)}, Na: Z = ${zOf209(naS)})`,
    strategy: "İE₁ bir mol gaz atom içindir. Mol sayısıyla çarp. Farkı katman dağılımıyla açıkla.",
    steps: [
      { label: neS, expression: `${comma(ieMoles209, 1)} · ${ie(neS)} = ${dec(neE)} kJ`, explanation: `${neS}: ${shellText209(bySymbol(neS).shells)}; kopan elektron dolu L katmanındadır.` },
      { label: naS, expression: `${comma(ieMoles209, 1)} · ${ie(naS)} = ${dec(naE)} kJ`, explanation: `${naS}: ${shellText209(bySymbol(naS).shells)}; kopan elektron yeni açılan M katmanındaki tek elektrondur.` },
      { label: "Fark", expression: `${dec(neE)} − ${dec(naE)} = ${dec(ieDiff)} kJ`, explanation: `Z yalnız ${zOf209(naS) - zOf209(neS)} arttı ama elektron daha dış katmanda ve iç katmanlarca perdeleniyor.` },
    ],
    answer: `${neS} için ${dec(neE)} kJ, ${naS} için ${dec(naE)} kJ; fark ${dec(ieDiff)} kJ.`,
    check: `Oran ${ie(neS)} / ${ie(naS)} ≈ ${comma(ie(neS) / ie(naS), 1)}; mol sayısı eşit olduğu için kJ değerlerinin oranı da aynıdır.`,
    pitfall: "kJ/mol değerini mol sayısıyla çarpmadan kJ diye yazmak ya da komşu elementlerin İE₁’inin yakın olacağını varsaymak.",
  },
];
guard(ie(neS) / ie(naS) > 4, "Ne→Na düşüşü dört kattan büyüktür");

export const ieSupplement209 = {
  title: ieSection209.title,
  figureTitle: ieSection209.title,
  paragraphs: ieSection209.paragraphs,
  summary: `İE₁ (kJ/mol, ${IE_SOURCE_SHORT209}): grupta aşağı azalır (${g1.map(({ symbol }) => symbol).join(" > ")}). Periyotta sağa genel artış; düşüşler ${[...dips2, ...dips3].map(([a, b]) => `${a} > ${b}`).join(", ")}. En yüksek ${ieMax.symbol} ${ie(ieMax.symbol)}, en düşük ${ieMin.symbol} ${ie(ieMin.symbol)}.`,
  appendSection: true as const,
  table: ieTable,
  examples: ieExamples209,
};

/* =================================================================
 * 5 · Elektronegatiflik: Pauling tablosu ve bağ kutupluluğu
 * ================================================================= */

const en = (s: Symbol209) => {
  const x = PAULING_EN209[s];
  if (x === undefined) throw new Error(`depth209: ${s} için Pauling değeri yok`);
  return x;
};
const enCell = (period: number, group: number) => {
  const p = at(period, group);
  if (!p) return "—";
  const x = PAULING_EN209[p.symbol];
  return x === undefined ? `${p.symbol}: değer yok` : `${p.symbol} ${enText209(x)}`;
};
const enTable = {
  layout: "table" as const,
  headers: ["Grup", ...periods209.map((p) => `${p}. periyot`)],
  rows: MAIN_GROUPS209.map((g) => [groupText209(g), ...periods209.map((p) => enCell(p, g))]),
};
export const deltaEN209 = (a: Symbol209, b: Symbol209) => Math.round(Math.abs(en(a) - en(b)) * 100) / 100;
export const negativeEnd209 = (a: Symbol209, b: Symbol209) => (en(a) > en(b) ? a : b);
const withEN = places209.filter(({ symbol }) => PAULING_EN209[symbol] !== undefined);
const enMax = withEN.reduce((a, b) => (en(b.symbol) > en(a.symbol) ? b : a));
const enMin = withEN.reduce((a, b) => (en(b.symbol) < en(a.symbol) ? b : a));
const enPeriod = (period: number) => withEN.filter((p) => p.period === period);
const [enP2, enP3] = [enPeriod(2), enPeriod(3)];
const g17 = groupMembers(17);
const g2 = groupMembers(2);

guard(places209.every(({ symbol, group }) => (PAULING_EN209[symbol] === undefined) === (group === 18)), "yalnız 18. gruba değer verilmez");
guard([2, 3].every((p) => enPeriod(p).every((x, i, xs) => i === 0 || en(x.symbol) > en(xs[i - 1].symbol))), "2. ve 3. periyotta EN soldan sağa kesintisiz artar");
guard(MAIN_GROUPS209.filter((g) => g !== 18).every((g) => groupMembers(g).every((p, i, xs) => i === 0 || en(p.symbol) < en(xs[i - 1].symbol))), "her grupta aşağı inerken EN azalır");
guard(enMax.symbol === "F" && enMin.symbol === "K", "en yüksek F, en düşük K");
guard(deltaEN209("C", "S") < 0.05, "C ile S’nin EN değerleri çok yakındır");
guard(deltaEN209("H", "F") > deltaEN209("H", "Cl"), "H–F farkı H–Cl farkından büyüktür");

export const enSection209: GuideSection = {
  title: "Pauling elektronegatiflik tablosu ve bağdaki fark",
  paragraphs: [
    `Tablodaki sayılar Pauling ölçeğindeki elektronegatifliklerdir (EN); ölçek göreli olduğu için birimi yoktur. Kaynak: ${EN_SOURCE209}. 18. grup satırında sayı yoktur: ${list(groupMembers(18).map(({ symbol }) => symbol))} için bu ölçekte değer verilmez. Boş hücre sıfır demek değildir.`,
    `Her sütunda yukarıdan aşağı (periyotta soldan sağa) değer kesintisiz artar: 2. periyotta ${enP2[0].symbol} ${enText209(en(enP2[0].symbol))} → ${enP2[enP2.length - 1].symbol} ${enText209(en(enP2[enP2.length - 1].symbol))}, 3. periyotta ${enP3[0].symbol} ${enText209(en(enP3[0].symbol))} → ${enP3[enP3.length - 1].symbol} ${enText209(en(enP3[enP3.length - 1].symbol))}. İyonlaşma enerjisindeki 2A→3A ve 5A→6A düşüşleri burada görülmez. Her satırda soldan sağa (grupta aşağı) değer azalır: ${g17.map(({ symbol }) => `${symbol} ${enText209(en(symbol))}`).join(" > ")}, ${g2.map(({ symbol }) => `${symbol} ${enText209(en(symbol))}`).join(" > ")}. En yüksek değer ${enMax.symbol} (${enText209(en(enMax.symbol))}), en düşük değer ${enMin.symbol} (${enText209(en(enMin.symbol))}).`,
    `İki atomun EN farkı ΔEN, bağdaki ortak elektronların hangi uca ne kadar kaydığını karşılaştırır. Kısmi negatif uç EN’si büyük atomdur; fark büyüdükçe bağ daha kutupludur. H–F için ΔEN = ${enText209(deltaEN209("H", "F"))}, H–Cl için ${enText209(deltaEN209("H", "Cl"))}. Farklı grup ve periyottaki iki atomda oklar çatışabilir: C (${enText209(en("C"))}) ile S (${enText209(en("S"))}) neredeyse eşittir. Böyle durumda tablodaki sayıya bak.`,
  ],
  table: enTable,
};

export const polarBonds209: [Symbol209, Symbol209][] = [["H", "Cl"], ["H", "C"], ["H", "F"], ["H", "O"]];
const polarSorted = [...polarBonds209].sort(([a, b], [c, d]) => deltaEN209(c, d) - deltaEN209(a, b));
const bondText = ([a, b]: readonly [Symbol209, Symbol209]) => `${a}–${b}`;
export const nBonds209: [Symbol209, Symbol209][] = [["N", "Cl"], ["N", "H"]];
const [nCl, nH] = nBonds209;
const morePolarN = deltaEN209(...nCl) > deltaEN209(...nH) ? nCl : nH;

guard(negativeEnd209("N", "Cl") === "Cl" && place209(zOf209("N")).period < place209(zOf209("Cl")).period, "N–Cl’de negatif uç, daha üst periyottaki N değil Cl’dir");
guard(negativeEnd209("H", "C") === "C", "C–H bağında negatif uç C’dir");

export const enExamples209: WorkedExample[] = [
  {
    title: `${polarBonds209.length} H bağını kutupluluğa göre sırala`,
    prompt: `Pauling tablosunu kullanarak ${list(polarBonds209.map(bondText))} bağlarını kutupluluğu büyükten küçüğe sırala. Her bağda kısmi negatif uç hangi atomdadır?`,
    strategy: "Her bağ için ΔEN = |EN(birinci) − EN(ikinci)| hesapla. Fark büyükse bağ daha kutupludur; negatif uç EN’si büyük atomdur.",
    steps: [
      ...polarBonds209.map(([a, b]) => ({ label: bondText([a, b]), expression: `|${enText209(en(a))} − ${enText209(en(b))}| = ${enText209(deltaEN209(a, b))}`, explanation: `Negatif uç ${negativeEnd209(a, b)}.` })),
      { label: "Sırala", expression: polarSorted.map(bondText).join(" > "), explanation: "ΔEN büyükten küçüğe." },
    ],
    answer: `${polarSorted.map(bondText).join(" > ")}. Kısmi negatif uçlar: ${polarSorted.map(([a, b]) => negativeEnd209(a, b)).join(", ")}.`,
    check: `C ${enText209(en("C"))} > H ${enText209(en("H"))} olduğu için en az kutuplu ${bondText(polarSorted[polarSorted.length - 1])} bağında bile negatif uç ${negativeEnd209("H", "C")}’dir.`,
    pitfall: `Cl 17. grupta diye O’dan daha elektronegatif sanmak ve H–Cl’yi H–O’nun önüne koymak. Cl ${enText209(en("Cl"))}, O ${enText209(en("O"))}: farklı periyotta sayıya bak.`,
  },
  {
    title: "Oklar çatışınca sayıya bak: N–Cl ve N–H",
    prompt: `NCl₃ ve NH₃ moleküllerindeki ${list(nBonds209.map(bondText))} bağlarında kısmi negatif uç hangi atomdadır? Hangi bağ daha kutupludur?`,
    strategy: `N ${place209(zOf209("N")).period}. periyot ${place209(zOf209("N")).group}. grupta, Cl ${place209(zOf209("Cl")).period}. periyot ${place209(zOf209("Cl")).group}. gruptadır: grupta yukarı çıkma yönü N’yi, periyotta sağa gitme yönü Cl’yi büyük gösterir. Oklar çatıştığı için tablodaki sayıları kullan.`,
    steps: [
      { label: bondText(nCl), expression: `Cl ${enText209(en("Cl"))} > N ${enText209(en("N"))}, ΔEN = ${enText209(deltaEN209(...nCl))}`, explanation: "Negatif uç Cl; fark küçük, bağ az kutuplu." },
      { label: bondText(nH), expression: `N ${enText209(en("N"))} > H ${enText209(en("H"))}, ΔEN = ${enText209(deltaEN209(...nH))}`, explanation: "Negatif uç N." },
      { label: "Karşılaştır", expression: `${enText209(deltaEN209(...nH))} > ${enText209(deltaEN209(...nCl))}`, explanation: `${bondText(morePolarN)} bağı daha kutupludur.` },
    ],
    answer: `${bondText(nCl)} bağında negatif uç ${negativeEnd209(...nCl)}, ${bondText(nH)} bağında ${negativeEnd209(...nH)}. ${bondText(morePolarN)} bağı daha kutupludur.`,
    check: `Aynı N atomu bir bağda kısmi pozitif, diğerinde kısmi negatif uçtur; uç, karşıdaki atoma göre belirlenir.`,
    pitfall: "N periyodik tabloda yukarıda olduğu için her bağda negatif uç saymak. Cl ile karşılaştırınca N’nin değeri küçüktür.",
  },
];

export const enSupplement209 = {
  title: enSection209.title,
  figureTitle: enSection209.title,
  paragraphs: enSection209.paragraphs,
  summary: `Pauling EN (birimsiz, ${EN_SOURCE_SHORT209}): periyotta sağa kesintisiz artar, grupta aşağı azalır; 18. gruba değer yok. En yüksek ${enMax.symbol} ${enText209(en(enMax.symbol))}, en düşük ${enMin.symbol} ${enText209(en(enMin.symbol))}. ΔEN büyük → bağ daha kutuplu, negatif uç EN’si büyük atom: H–F ${enText209(deltaEN209("H", "F"))}, N–Cl’de uç Cl.`,
  appendSection: true as const,
  table: enTable,
  examples: enExamples209,
};

export const depth209Lessons = {
  "katman-elektron-dizilimi": shellPlaceSupplement209,
  "elementlerin-siniflandirilmasi": classSupplement209,
  "atom-capi-karsilastirma": radiusRuleSupplement209,
  "iyonlasma-enerjisi": ieSupplement209,
  "elektron-ilgisi-elektronegatiflik": enSupplement209,
} as const;

export const depth209Supplements = {
  "katman-elektron-dizilimi": [shellPlaceSupplement209],
  "elementlerin-siniflandirilmasi": [classSupplement209],
  "atom-capi-karsilastirma": [radiusRuleSupplement209],
  "iyonlasma-enerjisi": [ieSupplement209],
  "elektron-ilgisi-elektronegatiflik": [enSupplement209],
};

// Paragraf ve özetlerde kullanılan iç değerler test için dışa açılır.
export const depth209Internals = { at, bySymbol, groupMembers, ieDips: [dips2, dips3], ieOrdered, isoSorted, polarSorted, morePolarN, ieDiff };
