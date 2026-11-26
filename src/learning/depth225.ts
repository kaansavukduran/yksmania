import type { GuideSection, WorkedExample } from "./guides/types";

/*
 * TYT Kimya derinleştirmesi (0.225): simyadan kimyaya, kimyanın sembolik
 * dili, polimerler–kozmetik–ilaç ve polimer–hazır gıda–ilaç–yağ. Kabul
 * edilmiş rehber içeriği değişmez; tablo bölümü, iki özgün çözümlü örnek ve
 * bölüm çizimi görüntüleme katmanında eklenir. Atom sayıları ve tekrar
 * birimi kütleleri formül ayrıştırıcısıyla hesaplanır; paragraflar, tablo
 * hücreleri, çizim okumaları ve Kopya Kâğıdı özetleri aynı dışa aktarılmış
 * verilerden gelir. Genel yargıları modül yüklenirken korumalar denetler.
 */

const guard = (ok: boolean, message: string) => {
  if (!ok) throw new Error(`depth225: ${message}`);
};

/* ======================================================================
 * Formül ayrıştırıcı ve gösterim
 * ==================================================================== */

/** "Ca(OH)2" → { Ca: 1, O: 2, H: 2 }. Başta katsayı yoktur; parantez iç içe olabilir. */
export function parseFormula225(f: string): Record<string, number> {
  let i = 0;
  const group = (): Record<string, number> => {
    const out: Record<string, number> = {};
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
      for (const [el, c] of Object.entries(part)) out[el] = (out[el] ?? 0) + c * (k ? Number(k[0]) : 1);
    }
    return out;
  };
  const r = group();
  guard(i === f.length, `${f} sonuna kadar okunmalı`);
  return r;
}

/** "3NaHCO3" → { coefficient: 3, formula: "NaHCO3" }. */
export const splitCoefficient225 = (s: string) => {
  const m = /^(\d*)(.+)$/.exec(s)!;
  return { coefficient: m[1] ? Number(m[1]) : 1, formula: m[2] };
};

const SUB: Record<string, string> = { "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄", "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉" };
const FROM_SUB: Record<string, string> = Object.fromEntries(Object.entries(SUB).map(([d, s]) => [s, d]));
/** "Ca(OH)2" → "Ca(OH)₂". */
export const formulaText225 = (f: string) => f.replace(/\d/g, (c) => SUB[c]);
/** Katsayılı gösterim: "3NaHCO3" → "3 NaHCO₃". */
export const notationText225 = (s: string) => {
  const { coefficient, formula } = splitCoefficient225(s);
  return `${coefficient === 1 ? "" : `${coefficient} `}${formulaText225(formula)}`;
};
/**
 * Yapı gösterimini düz formüle indirir: "–CH₂–CH(CH₃)–" → "CH2CH(CH3)".
 * Bağ çizgileri (–, =) atım sayımını değiştirmez; alt indisler rakama döner.
 */
export const structureFormula225 = (s: string) => s.replace(/[–=]/g, "").replace(/[₀-₉]/g, (c) => FROM_SUB[c]);

/** Elementleri formülde ilk göründükleri sırayla verir. */
const elementOrder = (f: string) => [...new Set(f.match(/[A-Z][a-z]?/g) ?? [])];
/** Bir sembolün formülde kaç kez yazıldığı (ör. CH₃COOH içinde C iki kez). */
export const symbolOccurrences225 = (f: string, el: string) => (f.match(new RegExp(`${el}(?![a-z])`, "g")) ?? []).length;
const sumValues = (r: Record<string, number>) => Object.values(r).reduce((a, b) => a + b, 0);
const tr = (n: number) => String(n).replace(".", ",");

/* ======================================================================
 * 1. Simyadan kimyaya: yedi kişi, üç dönem grubu
 * ==================================================================== */

export const eraGroups225 = ["Antik Yunan düşüncesi", "Orta Çağ İslam dünyası", "Modern kimyaya geçiş"] as const;
/** Çizimdeki sütun başlıkları: dönem gruplarının kısa adları. */
export const eraShort225 = ["Antik Yunan", "İslam dünyası", "Modern geçiş"] as const;
export type Era225 = (typeof eraGroups225)[number];
export type Kind225 = "Düşünce modeli" | "Araç ve teknik" | "Uygulama ve sınıflandırma" | "Element kavramı" | "Nicel ölçüm";
export interface Figure225 {
  name: string;
  short: string;
  era: Era225;
  contribution: string;
  kind: Kind225;
  caution: string;
}

/** Kişiler ve katkılar, dersin “Dört element düşüncesi” ve “Bilim insanlarını katkısıyla ilişkilendir” bölümlerindeki anlatımla. */
export const historyRows225: readonly Figure225[] = [
  { name: "Empedokles", short: "Empedokles", era: "Antik Yunan düşüncesi", contribution: "Maddeyi toprak, su, hava ve ateşle açıklayan düşünce", kind: "Düşünce modeli", caution: "Dört unsur modern periyodik tablonun elementleri değildir." },
  { name: "Aristo", short: "Aristo", era: "Antik Yunan düşüncesi", contribution: "Dört unsuru sıcak–soğuk ve kuru–ıslak nitelikleriyle ilişkilendiren model", kind: "Düşünce modeli", caution: "Bugünkü su bir bileşik, hava karışımdır; ateş element değildir." },
  { name: "Demokritos", short: "Demokritos", era: "Antik Yunan düşüncesi", contribution: "Maddenin bölünemeyen küçük birimlerden oluştuğu atom düşüncesi", kind: "Düşünce modeli", caution: "Deneysel veriye dayalı modern atom modelleriyle aynı kanıt düzeyinde değildir." },
  { name: "Câbir bin Hayyan", short: "Câbir", era: "Orta Çağ İslam dünyası", contribution: "Deney araçları, imbik, damıtma ve asitlerle yürütülen çalışmalar", kind: "Araç ve teknik", caution: "Tarihsel öncülük atfı, güncel bir keşfin deneysel ispatı değildir." },
  { name: "Ebû Bekir er-Râzî", short: "er-Râzî", era: "Orta Çağ İslam dünyası", contribution: "Tıbbi uygulamalar, maddelerin sınıflandırılması ve laboratuvar araçları", kind: "Uygulama ve sınıflandırma", caution: "‘Hangi sorun, hangi işlem, hangi kanıt’ sorularıyla öğrenilir; ezber listesi değildir." },
  { name: "Robert Boyle", short: "Boyle", era: "Modern kimyaya geçiş", contribution: "Kuşkucu Kimyager; daha basit maddelere ayrılamayan saf madde düşüncesi", kind: "Element kavramı", caution: "Tarihsel tanım, proton sayısına dayalı modern tanımın aynısı değildir." },
  { name: "Antoine Lavoisier", short: "Lavoisier", era: "Modern kimyaya geçiş", contribution: "Nicel ölçümler ve yanmada oksijenin rolünün açıklanması", kind: "Nicel ölçüm", caution: "Modern kimyaya geçişte önemli bir adımdır; tek başına bütün kimyanın kuruluşu değildir." },
];
const byEra = (era: Era225) => historyRows225.filter((r) => r.era === era);
const ancient = byEra("Antik Yunan düşüncesi");
const medieval = byEra("Orta Çağ İslam dünyası");
const modern = byEra("Modern kimyaya geçiş");
export const quantitative225 = historyRows225.filter((r) => r.kind === "Nicel ölçüm");
{
  guard(historyRows225.length <= 8, "tablo en çok sekiz satır olmalı");
  // Gruplar zaman sırasıyla dizilir: tablo sırası grup sırasını bozmamalı.
  const eraIdx = historyRows225.map((r) => eraGroups225.indexOf(r.era));
  guard(eraIdx.every((e, i) => i === 0 || e >= eraIdx[i - 1]), "satırlar dönem grubu sırasıyla dizilmeli");
  guard(eraGroups225.every((e) => byEra(e).length >= 2), "her dönem grubunda en az iki kişi olmalı");
  // Antik üç görüş düşünce modelidir; hiçbiri ölçüm veya araç katkısı olarak sunulmaz.
  guard(ancient.length === 3 && ancient.every((r) => r.kind === "Düşünce modeli"), "antik görüşler düşünce modeli olmalı");
  guard(historyRows225.filter((r) => r.kind === "Düşünce modeli").every((r) => r.era === "Antik Yunan düşüncesi"), "düşünce modeli yalnız antik grupta olmalı");
  guard(quantitative225.length === 1 && quantitative225[0].era === "Modern kimyaya geçiş", "nicel ölçüm satırı geçiş grubunda tek olmalı");
  guard(modern[0].kind === "Element kavramı", "geçiş grubunun ilk satırı element kavramı olmalı");
  guard(historyRows225.every((r) => r.caution.length > 20 && r.contribution.length > 20), "her satırın katkısı ve dikkati yazılı olmalı");
  guard(new Set(historyRows225.map((r) => r.short)).size === historyRows225.length, "kısa adlar benzersiz olmalı");
}

const historyTable = {
  layout: "table" as const,
  headers: ["Dönem grubu", "Kişi", "Derste anıldığı katkı", "Katkının türü", "Okurken dikkat"],
  rows: historyRows225.map((r) => [r.era, r.name, r.contribution, r.kind, r.caution]),
};
const names = (rows: readonly Figure225[]) => rows.map((r) => r.name).join(", ");

export const historySection225: GuideSection = {
  title: "Yedi ad, üç dönem: katkıyı türüyle eşleştir",
  paragraphs: [
    `Tablo derste anılan ${historyRows225.length} kişiyi ${eraGroups225.length} dönem grubunda toplar: ${eraGroups225.map((e) => `${e} (${byEra(e).length})`).join(", ")}. Gruplar zaman sırasıyla dizilmiştir; grup içindeki sıra dersteki anılış sırasıdır ve kesin bir tarih sıralaması iddia etmez. Bu derste yıl ezberi değil, katkının türü sorulur.`,
    `${names(ancient)} satırları düşünce modelidir: maddeyi açıklamaya çalışan tarihsel görüşlerdir, deneysel ölçümle sınanmış modern tanımlar değildir. ${names(medieval)} satırlarında araç, teknik, uygulama ve sınıflandırma katkıları öne çıkar; imbik ve damıtma bunların örneğidir.`,
    `${names(modern)} satırları modern kimyaya geçişi anlatır. ${modern[0].name} element kavramıyla, ${quantitative225[0].name} nicel ölçümle anılır; tabloda “Nicel ölçüm” türü yalnız ${quantitative225.length} satırda geçer. Bir kişinin hangi araçla çalıştığı değil, açıklamanın ölçümle nasıl sınandığı kimyayı bilim yapar.`,
  ],
  table: historyTable,
  figureTitle: "Yedi ad, üç dönem: katkıyı türüyle eşleştir",
};

/** Öğrencinin değerlendireceği dört ifade; her biri tablodaki bir satıra dayanır. */
export const historyStatements225 = [
  { key: "A", person: "Robert Boyle", text: "Robert Boyle elementi proton sayısıyla tanımlamıştır.", correct: false, reason: "Boyle’un tarihsel tanımı proton sayısına dayanmaz." },
  { key: "B", person: "Antoine Lavoisier", text: "Lavoisier’nin nicel ölçümleri ve yanmada oksijenin rolünü açıklaması modern kimyaya geçişte önemli bir adımdır.", correct: true, reason: "Tablodaki “Nicel ölçüm” satırıdır." },
  { key: "C", person: "Demokritos", text: "Demokritos’un atom düşüncesi deneysel veriye dayalı modern atom modeliyle aynı kanıt düzeyindedir.", correct: false, reason: "Felsefi bir düşünce modelidir; aynı kanıt düzeyinde sunulmaz." },
  { key: "D", person: "Câbir bin Hayyan", text: "Câbir bin Hayyan imbik, damıtma ve asitlerle yürütülen çalışmalarla ilişkilendirilir.", correct: true, reason: "Tablodaki “Araç ve teknik” satırıdır." },
] as const;
const rowOf = (person: string) => historyRows225.find((r) => r.name === person)!;
{
  for (const s of historyStatements225) guard(rowOf(s.person) !== undefined, `${s.person} tabloda olmalı`);
  guard(rowOf("Robert Boyle").caution.includes("proton"), "Boyle satırı proton tanımı uyarısını taşımalı");
  guard(rowOf("Demokritos").kind === "Düşünce modeli", "Demokritos satırı düşünce modeli olmalı");
  guard(rowOf("Antoine Lavoisier").kind === "Nicel ölçüm" && rowOf("Câbir bin Hayyan").kind === "Araç ve teknik", "B ve D satırlarının türü tabloya uymalı");
}
const trueKeys = historyStatements225.filter((s) => s.correct).map((s) => s.key);
const falseKeys = historyStatements225.filter((s) => !s.correct).map((s) => s.key);

/**
 * Lavoisier tarzı açık kroze ölçümü. Atom kütleleri: Mg = 24, O = 16
 * (IUPAC standart atom kütlelerinin ders kitabı yuvarlaması; sembolik dil
 * dersindeki O ≈ 16 ile aynı). Kütleler desigram (0,1 g) biriminde tam sayıdır.
 */
export const atomicMassMgO225 = { Mg: 24, O: 16 } as const;
export const crucible225 = (() => {
  const mgDg = 24; // 2,4 g
  const productDg = 40; // 4,0 g
  const oxygenDg = productDg - mgDg;
  return { mgDg, productDg, oxygenDg };
})();
{
  const { mgDg, oxygenDg, productDg } = crucible225;
  // MgO’da Mg:O kütle oranı 24:16; ölçüm bu oranla uyumlu olmalı.
  guard(mgDg * atomicMassMgO225.O === oxygenDg * atomicMassMgO225.Mg, "ölçülen O kütlesi MgO oranıyla uyuşmalı");
  guard(oxygenDg > 0 && productDg > mgDg, "açık krozede kütle artmalı");
}
const g = (dg: number) => (dg / 10).toFixed(1).replace(".", ",");
const cr = crucible225;

export const historyExamples225: WorkedExample[] = [
  {
    title: "Dört ifadeyi katkı tablosuyla sına",
    prompt: `Aşağıdaki dört ifadeden hangileri dersteki çerçeveye uygundur? ${historyStatements225.map((s) => `${s.key}) ${s.text}`).join(" ")}`,
    strategy: "Her ifadedeki kişiyi bul; katkı türünü ve “okurken dikkat” notunu ifadeyle karşılaştır.",
    steps: historyStatements225.map((s) => ({
      label: s.key,
      expression: `${s.person} → ${rowOf(s.person).kind}`,
      explanation: `${s.correct ? "Uygun" : "Uygun değil"}: ${s.reason}`,
    })),
    answer: `${trueKeys.join(" ve ")} uygundur; ${falseKeys.join(" ve ")} uygun değildir.`,
    check: `Uygun olmayan ${falseKeys.length} ifade, tarihsel bir görüşü modern tanım veya modern kanıt düzeyiyle eşitliyor.`,
    pitfall: "Tarihsel bir kişiye bugünkü tanımı (proton sayısı) veya bugünkü kanıt düzeyini yüklemek.",
  },
  {
    title: "Açık krozede artan kütle",
    prompt: `Ağzı açık bir krozede ${g(cr.mgDg)} g magnezyum ısıtılıyor; tepkime yalnız havadaki oksijenle oluyor ve kaptan dışarı madde çıkmıyor. Soğuyunca krozedeki beyaz katı (yalnız MgO) ${g(cr.productDg)} g geliyor. Kütle yoktan mı oluştu? Havadan kaç gram madde bağlandı? Mg = ${atomicMassMgO225.Mg}, O = ${atomicMassMgO225.O} al.`,
    strategy: "Tartılan sistemin sınırını belirle: açık krozeye havadan oksijen girebilir. Farkı bağlanan oksijene yaz, sonra MgO oranıyla denetle.",
    steps: [
      { label: "Sınır", explanation: "Kroze açıktır; havadaki oksijen sistemin dışından gelip metale bağlanabilir." },
      { label: "Fark", expression: `${g(cr.productDg)} − ${g(cr.mgDg)} = ${g(cr.oxygenDg)} g`, explanation: "Artış, katıya bağlanan oksijenin kütlesidir." },
      { label: "Oran", expression: `${g(cr.mgDg)} : ${g(cr.oxygenDg)} = ${atomicMassMgO225.Mg} : ${atomicMassMgO225.O}`, explanation: "MgO’da bir Mg’ye bir O düşer; kütle oranı 24:16 olmalıdır." },
    ],
    answer: `Hayır; havadan ${g(cr.oxygenDg)} g oksijen bağlanmıştır. Mg ile O’nun toplamı ${g(cr.productDg)} g’dır.`,
    check: `${g(cr.mgDg)} g Mg + ${g(cr.oxygenDg)} g O = ${g(cr.productDg)} g MgO; hesaba katılan bütün maddelerin kütlesi korunur.`,
    pitfall: "Açık kapta artan tartımı yoktan oluşan kütle sanmak; sistem sınırından giren gazı unutmak.",
  },
];

export const historySupplement225 = {
  title: historySection225.title,
  figureTitle: historySection225.title,
  paragraphs: historySection225.paragraphs,
  summary: `${eraGroups225.map((e) => `${e}: ${byEra(e).map((r) => r.short).join(", ")}`).join(" · ")}. Antik görüşler düşünce modelidir; ${medieval.map((r) => r.short).join(" ve ")} araç, teknik ve sınıflandırmayla; ${modern[0].short} element kavramıyla, ${quantitative225[0].short} nicel ölçümle anılır. Yıl değil katkı türü sorulur.`,
  appendSection: true as const,
  table: historyTable,
  examples: historyExamples225,
};

/* ======================================================================
 * 2. Sembolik dil: sekiz gösterim ve Latince kökler
 * ==================================================================== */

/** Gösterim ve dersin “Yaygın adları formülle birlikte hatırla” tablosundaki adı. */
export const notationRows225 = [
  { notation: "NH3", name: "Amonyak" },
  { notation: "2HNO3", name: "Kezzap" },
  { notation: "H2SO4", name: "Zaç yağı" },
  { notation: "3NaHCO3", name: "Yemek sodası" },
  { notation: "CaCO3", name: "Kireç taşı" },
  { notation: "CH3COOH", name: "Sirke asidi / asetik asit" },
  { notation: "2Ca(OH)2", name: "Sönmüş kireç" },
  { notation: "5NaCl", name: "Yemek tuzu" },
] as const;

export interface Counted225 {
  notation: string;
  name: string;
  coefficient: number;
  formula: string;
  elements: readonly string[];
  perUnit: Readonly<Record<string, number>>;
  unitAtoms: number;
  total: Readonly<Record<string, number>>;
  totalAtoms: number;
}
export const countNotation225 = (notation: string, name = ""): Counted225 => {
  const { coefficient, formula } = splitCoefficient225(notation);
  const perUnit = parseFormula225(formula);
  const elements = elementOrder(formula);
  const total = Object.fromEntries(elements.map((el) => [el, perUnit[el] * coefficient]));
  return { notation, name, coefficient, formula, elements, perUnit, unitAtoms: sumValues(perUnit), total, totalAtoms: sumValues(total) };
};
export const countedRows225: readonly Counted225[] = notationRows225.map((r) => countNotation225(r.notation, r.name));
const unitText = (c: Counted225) => `${c.elements.map((el) => `${el} ${c.perUnit[el]}`).join(" · ")} = ${c.unitAtoms}`;
const totalText = (c: Counted225) => (c.coefficient === 1 ? `${c.totalAtoms} (katsayı 1)` : `${c.coefficient} × ${c.unitAtoms} = ${c.totalAtoms}`);
const repeated = countedRows225.filter((c) => c.elements.some((el) => symbolOccurrences225(c.formula, el) > 1));
const withParen = countedRows225.filter((c) => c.formula.includes("("));
const withCoeff = countedRows225.filter((c) => c.coefficient > 1);
const mostAtoms = countedRows225.reduce((m, c) => (c.totalAtoms > m.totalAtoms ? c : m));
{
  guard(countedRows225.length <= 8, "tablo en çok sekiz satır olmalı");
  // Katsayı tür sayısını değiştirmez, atom sayısını katsayıyla çarpar.
  for (const c of countedRows225) {
    guard(Object.keys(c.total).length === c.elements.length && c.elements.length === Object.keys(c.perUnit).length, `${c.notation}: katsayı tür sayısını değiştirmemeli`);
    guard(c.totalAtoms === c.coefficient * c.unitAtoms, `${c.notation}: toplam = katsayı × birim olmalı`);
  }
  // Aynı sembol birden çok yerde yazılsa da bir tür sayılır.
  guard(repeated.length >= 1 && repeated.every((c) => c.elements.length < c.formula.match(/[A-Z][a-z]?/g)!.length), "tekrarlanan sembol tür sayısını artırmamalı");
  // Parantez dışındaki indis içerideki her atoma uygulanır.
  guard(withParen.length >= 1 && withParen.every((c) => c.perUnit.O === 2 && c.perUnit.H === 2), "Ca(OH)₂’de O ve H ikişer olmalı");
  guard(withCoeff.length >= 3 && countedRows225.some((c) => c.coefficient === 1), "hem katsayılı hem katsayısız satır olmalı");
}
const acetic = countedRows225.find((c) => c.formula === "CH3COOH")!;
const lime = withParen[0];

const notationTable = {
  layout: "table" as const,
  headers: ["Gösterim", "Dersteki adı", "Element türleri", "Bir birimdeki atomlar", "Gösterimdeki toplam atom"],
  rows: countedRows225.map((c) => [notationText225(c.notation), c.name, `${c.elements.join(", ")} (${c.elements.length})`, unitText(c), totalText(c)]),
};

export const notationSection225: GuideSection = {
  title: "Sekiz gösterim: türü, birimi ve toplamı ayrı say",
  paragraphs: [
    `Tablodaki ${countedRows225.length} gösterimin adları dersin yaygın adlar tablosundandır. Her satırda üç ayrı soru cevaplanır: kaç element türü var, bir birimde (molekül veya formül birimi) kaç atom var, öndeki katsayıyla bütün gösterimde kaç atom var? ${withCoeff.length} satırda katsayı 1’den büyüktür; bu satırlarda tür sayısı değişmez, yalnız atom sayısı katsayıyla çarpılır.`,
    `${formulaText225(acetic.formula)} satırında C ${symbolOccurrences225(acetic.formula, "C")}, O ${symbolOccurrences225(acetic.formula, "O")} ve H ${symbolOccurrences225(acetic.formula, "H")} kez yazılır; yine de ${acetic.elements.length} element türü vardır ve bir molekülde ${unitText(acetic)} atom bulunur. ${notationText225(lime.notation)} satırında parantezden sonraki 2 hem O’ya hem H’ye uygulanır: bir birimde ${unitText(lime)} atom, katsayıyla ${lime.totalAtoms} atom.`,
    `En çok atom ${notationText225(mostAtoms.notation)} gösterimindedir: ${totalText(mostAtoms)}. Atom sayısını karşılaştırırken birimdeki sayıya değil, katsayıyla çarpılmış toplama bak; tür sayısını karşılaştırırken katsayıyı hiç kullanma.`,
  ],
  table: notationTable,
  figureTitle: "Sekiz gösterim: türü, birimi ve toplamı ayrı say",
};

/**
 * Türkçe adın ilk harfinden tahmin edilemeyen semboller ve Latince kökleri
 * (IUPAC element adları ve sembolleri; Latince adlar ders kitaplarındaki
 * yaygın kökenlerdir). Türkçe adlar dersin kullandığı adlardır.
 */
export const latinRoots225 = [
  { symbol: "Na", name: "sodyum", latin: "natrium" },
  { symbol: "K", name: "potasyum", latin: "kalium" },
  { symbol: "Fe", name: "demir", latin: "ferrum" },
  { symbol: "Cu", name: "bakır", latin: "cuprum" },
  { symbol: "Ag", name: "gümüş", latin: "argentum" },
  { symbol: "Au", name: "altın", latin: "aurum" },
  { symbol: "Hg", name: "cıva", latin: "hydrargyrum" },
  { symbol: "Pb", name: "kurşun", latin: "plumbum" },
  { symbol: "Sn", name: "kalay", latin: "stannum" },
] as const;
const capital = (s: string) => s.charAt(0).toLocaleUpperCase("tr-TR") + s.slice(1);
/** Türkçe addan yapılan yanlış tahmin: ilk harf ve ilk iki harf. */
export const turkishGuesses225 = (name: string) => [capital(name.charAt(0)), capital(name.slice(0, 2))];
/** Sembolün harfleri Latince adda aynı sırayla geçiyor mu? */
export const symbolInLatin225 = (symbol: string, latin: string) => {
  let j = 0;
  for (const ch of latin) if (j < symbol.length && ch === symbol[j].toLowerCase()) j += 1;
  return j === symbol.length && latin[0] === symbol[0].toLowerCase();
};
{
  for (const r of latinRoots225) {
    guard(symbolInLatin225(r.symbol, r.latin), `${r.symbol} harfleri ${r.latin} içinde sırayla geçmeli`);
    guard(!turkishGuesses225(r.name).includes(r.symbol), `${r.symbol} Türkçe addan tahmin edilememeli`);
  }
}
/** Örnek 1: öğrencinin Türkçe addan tahmin ettiği dört sembol. */
export const guessExample225 = ["sodyum", "altın", "kalay", "bakır"].map((name) => {
  const r = latinRoots225.find((x) => x.name === name)!;
  return { ...r, guess: turkishGuesses225(name)[name === "altın" ? 1 : 0] };
});
/** Tahminin gerçekte başka bir elementin sembolü olduğu durumlar (dersin element tablosundan ve yakın semboller bölümünden). */
export const otherElementOf225: Readonly<Record<string, string>> = { S: "kükürt", Al: "alüminyum", K: "potasyum", B: "bor" };
{
  for (const x of guessExample225) guard(x.guess !== x.symbol, `${x.name} tahmini yanlış olmalı`);
  guard(guessExample225.every((x) => otherElementOf225[x.guess] !== undefined), "her yanlış tahmin başka bir elementin sembolü olmalı");
}

/** Örnek 2: tepkime olmayan bir kapta 2 HNO₃ ve 3 NH₃ molekülü. */
export const mixedSample225 = ["2HNO3", "3NH3"].map((n) => countNotation225(n));
export const mixedTotals225 = (() => {
  const total: Record<string, number> = {};
  for (const c of mixedSample225) for (const [el, k] of Object.entries(c.total)) total[el] = (total[el] ?? 0) + k;
  return { total, atoms: sumValues(total), kinds: Object.keys(total).length };
})();
const mixOrder = ["H", "N", "O"];
guard(Object.keys(mixedTotals225.total).sort().join() === mixOrder.join() && mixedTotals225.kinds === 3, "karışımda yalnız H, N, O olmalı");

export const notationExamples225: WorkedExample[] = [
  {
    title: "Türkçe addan sembol tahmin etme",
    prompt: `Bir öğrenci sembolleri Türkçe adın ilk harflerinden yazıyor: ${guessExample225.map((x) => `${x.name} → ${x.guess}`).join(", ")}. Hangileri doğrudur? Doğru sembolleri ve sembolün geldiği Latince adı yaz.`,
    strategy: "Her tahmini sembol tablosuyla karşılaştır; tahmin başka bir elementin sembolüyse bunu da belirt.",
    steps: guessExample225.map((x) => ({
      label: capital(x.name),
      expression: `${x.guess} ✗ → ${x.symbol} (${x.latin})`,
      explanation: `${x.guess} ${otherElementOf225[x.guess]} sembolüdür; ${x.name} ${x.symbol} ile gösterilir.`,
    })),
    answer: `Hiçbiri doğru değil: ${guessExample225.map((x) => `${x.name} ${x.symbol}`).join(", ")}.`,
    check: `Doğru sembollerin harfleri Latince adda aynı sırayla geçer: ${guessExample225.map((x) => `${x.symbol} ← ${x.latin}`).join(", ")}.`,
    pitfall: "Sembolü Türkçe adın ilk harfinden tahmin edip başka bir elementin sembolünü yazmak (altın → Al).",
  },
  {
    title: "İki maddenin atomlarını birlikte say",
    prompt: `Bir kapta ${mixedSample225.map((c) => `${notationText225(c.notation)}`).join(" ve ")} molekülü bulunuyor; aralarında tepkime olmuyor. Kaptaki H, N ve O atomlarının sayısını, toplam atom sayısını ve element türü sayısını bul.`,
    strategy: "Her gösterimi ayrı çözümle, katsayıyı uygula; sonra aynı sembolleri topla.",
    steps: [
      ...mixedSample225.map((c) => ({
        label: notationText225(c.notation),
        expression: c.elements.map((el) => `${el} ${c.coefficient}×${c.perUnit[el]} = ${c.total[el]}`).join(" · "),
        explanation: `Bir molekülde ${c.unitAtoms} atom; ${c.coefficient} molekülde ${c.totalAtoms} atom.`,
      })),
      { label: "Topla", expression: mixOrder.map((el) => `${el} ${mixedTotals225.total[el]}`).join(" · "), explanation: `Toplam ${mixedTotals225.atoms} atom. Farklı semboller {${mixOrder.join(", ")}} olduğundan ${mixedTotals225.kinds} element türü vardır.` },
    ],
    answer: `${mixOrder.map((el) => `${el} = ${mixedTotals225.total[el]}`).join(", ")}; toplam ${mixedTotals225.atoms} atom, ${mixedTotals225.kinds} element türü.`,
    check: `${mixedSample225.map((c) => c.totalAtoms).join(" + ")} = ${mixedTotals225.atoms}; iki maddede de N ve H bulunduğu için tür sayısı ${mixedSample225.map((c) => c.elements.length).join(" + ")} değil, ${mixedTotals225.kinds}’tür.`,
    pitfall: "İki maddenin tür sayılarını toplamak; ortak elementleri iki kez saymak.",
  },
];

export const notationSupplement225 = {
  title: notationSection225.title,
  figureTitle: notationSection225.title,
  paragraphs: notationSection225.paragraphs,
  summary: `Tür sayısı = farklı semboller; katsayı onu değiştirmez. Bir birimdeki atom = indislerin toplamı (parantez dışı indis içindekilerin hepsine). Toplam atom = katsayı × birim: ${withCoeff.map((c) => `${notationText225(c.notation)} → ${c.totalAtoms}`).join(", ")}. Latince kökler: ${latinRoots225.map((r) => `${r.symbol} ${r.latin}`).join(", ")}.`,
  appendSection: true as const,
  table: notationTable,
  examples: notationExamples225,
};

/* ======================================================================
 * Polimerler için atom kütleleri
 * ==================================================================== */

/**
 * Bağıl atom kütleleri, desi-u (0,1 u) biriminde tam sayı. Kaynak: IUPAC
 * standart atom kütleleri (CIAAW), ders kitabı yuvarlaması: C = 12, H = 1,
 * O = 16, F = 19, Cl = 35,5 u. Dersin örneklerindeki C = 12 u, H = 1 u,
 * Cl = 35,5 u değerleriyle aynıdır.
 */
export const atomicMassDu225: Readonly<Record<string, number>> = { H: 10, C: 120, O: 160, F: 190, Cl: 355 };
export const massDu225 = (f: string) =>
  Object.entries(parseFormula225(f)).reduce((m, [el, k]) => {
    guard(atomicMassDu225[el] !== undefined, `${el} için atom kütlesi tanımlı olmalı`);
    return m + atomicMassDu225[el] * k;
  }, 0);
const u = (du: number) => tr(du / 10);
const formulaOf = (f: string) => {
  const c = parseFormula225(f);
  return ["C", "H", "O", "F", "Cl"].filter((el) => c[el]).map((el) => `${el}${c[el] === 1 ? "" : c[el]}`).join("");
};

/* ======================================================================
 * 3. Polimerler, kozmetik ve ilaç: monomerden tekrar birimine
 * ==================================================================== */

export interface Monomer225 {
  monomer: string;
  monomerStructure: string;
  abbr: string;
  polymer: string;
  repeat: string;
  use: string;
}
/** Dersin “PE, PP, PVC ve PS” ve “PET, PTFE” bölümlerindeki katılma polimerleri; kullanım örnekleri ders çizimindeki tipik kullanımlardır. */
export const monomerRows225: readonly Monomer225[] = [
  { monomer: "etilen", monomerStructure: "CH₂=CH₂", abbr: "PE", polymer: "polietilen", repeat: "–CH₂–CH₂–", use: "film, ambalaj" },
  { monomer: "propilen", monomerStructure: "CH₂=CH–CH₃", abbr: "PP", polymer: "polipropilen", repeat: "–CH₂–CH(CH₃)–", use: "kap, lif" },
  { monomer: "vinil klorür", monomerStructure: "CH₂=CHCl", abbr: "PVC", polymer: "polivinil klorür", repeat: "–CH₂–CHCl–", use: "boru, profil" },
  { monomer: "stiren", monomerStructure: "CH₂=CH–C₆H₅", abbr: "PS", polymer: "polistiren", repeat: "–CH₂–CH(C₆H₅)–", use: "köpük, rijit ambalaj" },
  { monomer: "tetrafloroeten", monomerStructure: "CF₂=CF₂", abbr: "PTFE", polymer: "politetrafloroeten (günlük dilde teflon)", repeat: "–CF₂–CF₂–", use: "yapışmayı azaltan kaplama" },
];
export interface MonomerCounted225 extends Monomer225 {
  monomerAtoms: Readonly<Record<string, number>>;
  repeatAtoms: Readonly<Record<string, number>>;
  formula: string;
  massDu: number;
}
export const monomerCounted225: readonly MonomerCounted225[] = monomerRows225.map((r) => {
  const mf = structureFormula225(r.monomerStructure);
  const rf = structureFormula225(r.repeat);
  return { ...r, monomerAtoms: parseFormula225(mf), repeatAtoms: parseFormula225(rf), formula: formulaOf(rf), massDu: massDu225(rf) };
});
const sameAtoms = (a: Readonly<Record<string, number>>, b: Readonly<Record<string, number>>) =>
  Object.keys(a).length === Object.keys(b).length && Object.entries(a).every(([el, k]) => b[el] === k);
{
  guard(monomerCounted225.length <= 8, "tablo en çok sekiz satır olmalı");
  // Katılma polimerleşmesinde yan ürün çıkmaz: tekrar birimi monomerle aynı atomları taşır.
  for (const r of monomerCounted225) {
    guard(sameAtoms(r.monomerAtoms, r.repeatAtoms), `${r.abbr}: tekrar birimi monomerle aynı atomları taşımalı`);
    guard(r.monomerStructure.includes("=") && !r.repeat.includes("="), `${r.abbr}: çift bağ zincirde tekli bağa dönüşmeli`);
    guard(r.monomerAtoms.C === 2 || r.repeat.startsWith("–CH₂–CH"), `${r.abbr}: iki karbonlu çift bağ iskeleti olmalı`);
  }
  // Masses strictly distinct so a mass identifies the polymer in the table.
  guard(new Set(monomerCounted225.map((r) => r.massDu)).size === monomerCounted225.length, "tekrar kütleleri birbirinden farklı olmalı");
}
const onlyCH = monomerCounted225.filter((r) => Object.keys(r.repeatAtoms).every((el) => el === "C" || el === "H"));
const heavy = monomerCounted225.filter((r) => !onlyCH.includes(r));
const ptfe = monomerCounted225.find((r) => r.abbr === "PTFE")!;
const pe = monomerCounted225.find((r) => r.abbr === "PE")!;

const monomerTable = {
  layout: "table" as const,
  headers: ["Monomer", "Polimer", "Tekrar birimi", "Tekrar birimi formülü ve kütlesi", "Örnek kullanım"],
  rows: monomerCounted225.map((r) => [`${r.monomer} ${r.monomerStructure}`, `${r.abbr}: ${r.polymer}`, r.repeat, `${formulaText225(r.formula)} · ${u(r.massDu)} u`, r.use]),
};

export const monomerSection225: GuideSection = {
  title: "Beş monomer: çift bağ açılır, atomlar aynı kalır",
  paragraphs: [
    `Tablodaki ${monomerCounted225.length} polimer katılma polimeridir. Her satırda monomerin çift bağlı iki karbonu zincirde tekli bağla bağlanır; yan ürün çıkmaz. Bu yüzden tekrar biriminin formülü monomerin formülüyle aynıdır: ${monomerCounted225.map((r) => `${r.monomer} ve ${r.abbr} için ${formulaText225(r.formula)}`).join(", ")}.`,
    `Tekrar kütleleri C = 12, H = 1, F = 19 ve Cl = 35,5 u ile hesaplanmıştır (IUPAC standart atom kütlelerinin ders kitabı yuvarlaması): ${monomerCounted225.map((r) => `${r.abbr} ${u(r.massDu)} u`).join(", ")}. Beş değer birbirinden farklıdır; uç grupları ihmal edilen bir zincir parçasının kütlesi ve tekrar sayısı verilirse polimer tablodan bulunabilir.`,
    `${onlyCH.map((r) => r.abbr).join(", ")} tekrar birimlerinde yalnız C ve H vardır; ${heavy.map((r) => `${r.abbr} ${Object.keys(r.repeatAtoms).filter((el) => el !== "C" && el !== "H").join(", ")}`).join(", ")} atomu taşır. ${pe.abbr} ile ${ptfe.abbr} aynı iki karbonlu iskelettedir; ${ptfe.abbr}’de bütün H yerine F bulunur. Örnek kullanım, her üründe aynı malzemenin kullanıldığını kanıtlamaz.`,
  ],
  table: monomerTable,
  figureTitle: "Beş monomer: çift bağ açılır, atomlar aynı kalır",
};

/** Örnek 1: aynı tekrar sayılı iki zincir parçası; kütleden polimeri bul. */
export const chainPair225 = (() => {
  const repeats = 10;
  const pick = (abbr: string) => monomerCounted225.find((r) => r.abbr === abbr)!;
  const X = { label: "X", massDu: pick("PP").massDu * repeats };
  const Y = { label: "Y", massDu: pick("PS").massDu * repeats };
  const identify = (massDu: number) => monomerCounted225.filter((r) => r.massDu * repeats === massDu);
  return { repeats, X, Y, xMatch: identify(X.massDu), yMatch: identify(Y.massDu) };
})();
/** Örnek 2: uçları ihmal edilen 21 000 u’luk PP zinciri. */
export const ppChain225 = (() => {
  const pp = monomerCounted225.find((r) => r.abbr === "PP")!;
  const chainDu = 210000;
  const n = chainDu / pp.massDu;
  return { pp, chainDu, n, C: n * pp.repeatAtoms.C, H: n * pp.repeatAtoms.H };
})();
{
  guard(chainPair225.xMatch.length === 1 && chainPair225.yMatch.length === 1, "her kütle tek bir polimere uymalı");
  guard(Number.isInteger(ppChain225.n), "PP tekrar sayısı tam sayı olmalı");
}
const cp = chainPair225;
const pc = ppChain225;
const ring = (r: MonomerCounted225) => r.repeat.includes("C₆H₅") && r.monomerStructure.includes("C₆H₅");
guard(ring(cp.yMatch[0]) && !ring(cp.xMatch[0]), "halka yalnız Y’de olmalı");
/** "C8H8" → "8·12 + 8·1": atom kütlesi katkıları. */
const massExpr = (f: string) => Object.entries(parseFormula225(f)).map(([el, k]) => `${k === 1 ? "" : `${k}·`}${u(atomicMassDu225[el])}`).join(" + ");

export const monomerExamples225: WorkedExample[] = [
  {
    title: "Kütleden polimeri tanı",
    prompt: `X ve Y, tablodaki katılma polimerlerinden birer zincir parçasıdır; her biri ${cp.repeats} tekrar birimi taşır ve uç gruplar ihmal edilir. X’in kütlesi ${u(cp.X.massDu)} u, Y’ninki ${u(cp.Y.massDu)} u’dur. C = 12, H = 1, F = 19, Cl = 35,5 u. X ve Y hangi polimerlerdir; hangisinin monomerinde C₆H₅ halkası vardır?`,
    strategy: "Parça kütlesini tekrar sayısına bölüp bir tekrar biriminin kütlesini bul; tablodaki beş kütleyle karşılaştır.",
    steps: [
      { label: "X", expression: `${u(cp.X.massDu)} ÷ ${cp.repeats} = ${u(cp.X.massDu / cp.repeats)} u`, explanation: `Bu kütle yalnız ${cp.xMatch[0].abbr} (${formulaText225(cp.xMatch[0].formula)}) tekrarına uyar.` },
      { label: "Y", expression: `${u(cp.Y.massDu)} ÷ ${cp.repeats} = ${u(cp.Y.massDu / cp.repeats)} u`, explanation: `Bu kütle yalnız ${cp.yMatch[0].abbr} (${formulaText225(cp.yMatch[0].formula)}) tekrarına uyar.` },
      { label: "Halka", expression: `${cp.yMatch[0].monomer}: ${cp.yMatch[0].monomerStructure}`, explanation: `Yan gruptaki C₆H₅ ${cp.yMatch[0].abbr} tekrarında da aynen bulunur; ${cp.xMatch[0].abbr} tekrarında halka yoktur.` },
    ],
    answer: `X = ${cp.xMatch[0].abbr} (${cp.xMatch[0].polymer}), Y = ${cp.yMatch[0].abbr} (${cp.yMatch[0].polymer}); C₆H₅ halkası Y’nin monomeri ${cp.yMatch[0].monomer}dedir.`,
    check: `${formulaText225(cp.yMatch[0].formula)}: ${massExpr(cp.yMatch[0].formula)} = ${u(cp.yMatch[0].massDu)} u; ${cp.repeats} tekrarda ${u(cp.Y.massDu)} u.`,
    pitfall: "Parça kütlesini doğrudan tablodaki tekrar kütlesiyle karşılaştırmak; önce tekrar sayısına bölmeyi unutmak.",
  },
  {
    title: "PP zincirinde tekrar ve atom sayısı",
    prompt: `Uç grupları ihmal edilen bir polipropilen zincirinin kütlesi ${u(pc.chainDu)} u’dur. Tekrar birimi ${pc.pp.repeat} (C = 12, H = 1 u). Zincirde kaç tekrar birimi, kaç C ve kaç H atomu vardır?`,
    strategy: "Bir tekrarın kütlesini bul, zincir kütlesini ona böl; atomları tekrar sayısıyla çarp.",
    steps: [
      { label: "Tekrar", expression: `${formulaText225(pc.pp.formula)}: ${massExpr(pc.pp.formula)} = ${u(pc.pp.massDu)} u`, explanation: "Tekrar birimi propilenle aynı atomları taşır." },
      { label: "n", expression: `${u(pc.chainDu)} ÷ ${u(pc.pp.massDu)} = ${pc.n}`, explanation: "n tekrar sayısıdır; mol değildir." },
      { label: "Atomlar", expression: `C = ${pc.n}·${pc.pp.repeatAtoms.C} = ${pc.C} · H = ${pc.n}·${pc.pp.repeatAtoms.H} = ${pc.H}`, explanation: "Her tekrar 3 C ve 6 H getirir." },
    ],
    answer: `${pc.n} tekrar birimi; ${pc.C} C ve ${pc.H} H atomu.`,
    check: `${pc.C}·12 + ${pc.H}·1 = ${u(pc.chainDu)} u.`,
    pitfall: "Tekrar sayısını mol sanmak veya CH₃ yan grubundaki karbonu saymamak.",
  },
];

export const monomerSupplement225 = {
  title: monomerSection225.title,
  figureTitle: monomerSection225.title,
  paragraphs: monomerSection225.paragraphs,
  summary: `Katılma polimerinde tekrar birimi = monomer atomları, çift bağ tekli bağa döner. ${monomerCounted225.map((r) => `${r.monomer} → ${r.abbr} (${u(r.massDu)} u)`).join(", ")}. Zincir kütlesi ÷ tekrar kütlesi = tekrar sayısı n; n mol değildir.`,
  appendSection: true as const,
  table: monomerTable,
  examples: monomerExamples225,
};

/* ======================================================================
 * 4. Polimer–gıda–ilaç–yağ: ambalaj kodları 1–6
 * ==================================================================== */

export interface ResinCode225 {
  code: number;
  abbr: string;
  name: string;
  repeatFormula: string;
  monomerNote: string;
  /** Katılma polimeri mi (yan ürünsüz)? PET yoğunlaşma polimeridir. */
  addition: boolean;
  example: string;
}
/**
 * Plastik malzeme tanıma kodları 1–6 (ASTM D7611 reçine tanıma kodu, ambalaj
 * üçgenindeki sayı). 7 “diğer” grubudur ve tek bir malzeme göstermez; bu
 * nedenle tabloda yoktur. Tekrar birimi formülleri: PET C₁₀H₈O₄, PE C₂H₄,
 * PVC C₂H₃Cl, PP C₃H₆, PS C₈H₈.
 */
export const resinCodes225: readonly ResinCode225[] = [
  { code: 1, abbr: "PET", name: "polietilen tereftalat", repeatFormula: "C10H8O4", monomerNote: "etilen glikol ve tereftalik asit (yoğunlaşma)", addition: false, example: "içecek şişesi" },
  { code: 2, abbr: "HDPE", name: "yüksek yoğunluklu polietilen", repeatFormula: "C2H4", monomerNote: "etilen", addition: true, example: "şişe, bidon" },
  { code: 3, abbr: "PVC", name: "polivinil klorür", repeatFormula: "C2H3Cl", monomerNote: "vinil klorür", addition: true, example: "boru, profil" },
  { code: 4, abbr: "LDPE", name: "düşük yoğunluklu polietilen", repeatFormula: "C2H4", monomerNote: "etilen", addition: true, example: "poşet, film" },
  { code: 5, abbr: "PP", name: "polipropilen", repeatFormula: "C3H6", monomerNote: "propilen", addition: true, example: "kap, kapak" },
  { code: 6, abbr: "PS", name: "polistiren", repeatFormula: "C8H8", monomerNote: "stiren", addition: true, example: "köpük kap, rijit ambalaj" },
];
export const resinElements225 = (r: ResinCode225) => elementOrder(r.repeatFormula);
const sameMonomer = resinCodes225.filter((r) => r.monomerNote === "etilen");
const withO = resinCodes225.filter((r) => resinElements225(r).includes("O"));
const withCl = resinCodes225.filter((r) => resinElements225(r).includes("Cl"));
{
  guard(resinCodes225.length <= 8 && resinCodes225.every((r, i) => r.code === i + 1), "kodlar 1’den 6’ya sırayla olmalı");
  // Kod 2 ve 4 aynı monomerden gelir; fark zincir dallanması ve yoğunluktur.
  guard(sameMonomer.map((r) => r.code).join() === "2,4" && sameMonomer.every((r) => r.repeatFormula === "C2H4"), "2 ve 4 aynı etilen tekrarını taşımalı");
  // Katılma polimeri olan kodlar, monomer tablosundaki formüllerle tutarlı olmalı.
  for (const r of resinCodes225.filter((x) => x.addition)) {
    const m = monomerCounted225.find((x) => x.monomer === r.monomerNote)!;
    guard(m !== undefined && sameAtoms(m.repeatAtoms, parseFormula225(r.repeatFormula)), `${r.abbr} formülü monomer tablosuyla aynı olmalı`);
  }
  guard(withO.length === 1 && withO[0].code === 1 && withCl.length === 1 && withCl[0].code === 3, "O yalnız PET’te, Cl yalnız PVC’de olmalı");
}

const resinTable = {
  layout: "table" as const,
  headers: ["Kod", "Kısaltma ve ad", "Tekrar birimi", "Kaynak monomer", "Örnek ambalaj"],
  rows: resinCodes225.map((r) => [String(r.code), `${r.abbr}: ${r.name}`, `${formulaText225(r.repeatFormula)} (${resinElements225(r).join(", ")})`, r.monomerNote, r.example]),
};

export const resinSection225: GuideSection = {
  title: "Ambalaj kodu 1–6: kabın malzemesini oku, içeriği değil",
  paragraphs: [
    `Ambalajdaki üçgenin içindeki sayı plastik malzeme tanıma kodudur; tabloda ${resinCodes225[0].code}’den ${resinCodes225.at(-1)!.code}’ya kadar ${resinCodes225.length} kod vardır. 7 “diğer” grubudur ve tek bir malzeme göstermez. Kod yalnız kabın polimerini anlatır: PET işaretli bir şişedeki yağın triaçilgliserolleri bu tablonun konusu değildir.`,
    `Kod ${sameMonomer.map((r) => r.code).join(" ve ")} aynı monomerden (${sameMonomer[0].monomerNote}) gelir ve aynı ${formulaText225(sameMonomer[0].repeatFormula)} tekrar birimini taşır; farkları zincir dallanması ve yoğunluktur. Tekrar biriminde O yalnız kod ${withO.map((r) => r.code).join()} (${withO.map((r) => r.abbr).join()}), Cl yalnız kod ${withCl.map((r) => r.code).join()} (${withCl.map((r) => r.abbr).join()}) satırında vardır.`,
    "Kodun bulunması ambalajın toplandığını veya geri dönüştürüldüğünü kanıtlamaz; gıda temasına uygunluk da ürün standardına ve temas koşuluna bağlıdır. Örnek ambalaj sütunu tipik kullanımdır; aynı kod farklı ürünlerde, aynı ürün türü farklı kodlarla bulunabilir.",
  ],
  table: resinTable,
  figureTitle: "Ambalaj kodu 1–6: kabın malzemesini oku, içeriği değil",
};

/** Örnek 1: şişe 1, kapak 5. */
export const bottle225 = { body: resinCodes225[0], cap: resinCodes225[4] };
guard(bottle225.body.code === 1 && bottle225.cap.code === 5, "şişe 1, kapak 5 olmalı");
/** Örnek 2: kodları 2, 3 ve 6 olan üç ambalaj; Cl kütle yüzdesi (tam: 355/625 = 0,568). */
export const threePacks225 = (() => {
  const packs = [2, 3, 6].map((c) => resinCodes225.find((r) => r.code === c)!);
  const ch = packs.filter((r) => resinElements225(r).every((el) => el === "C" || el === "H"));
  const cl = packs.filter((r) => resinElements225(r).includes("Cl"));
  const pvcMass = massDu225(cl[0].repeatFormula);
  const clMass = atomicMassDu225.Cl * parseFormula225(cl[0].repeatFormula).Cl;
  // Yüzde, onda bir hassasiyetle tam: 1000·355/625 = 568 → %56,8.
  const perMille = (1000 * clMass) / pvcMass;
  return { packs, ch, cl, pvcMass, clMass, perMille };
})();
guard(Number.isInteger(threePacks225.perMille), "Cl yüzdesi onda bire tam çıkmalı");
const tp = threePacks225;

export const resinExamples225: WorkedExample[] = [
  {
    title: "Şişe 1, kapak 5: hangi bilgi nerede?",
    prompt: `Bir ayçiçeği yağı şişesinin gövdesinde ${bottle225.body.code}, kapağında ${bottle225.cap.code} kodu var. Gövde ve kapak hangi polimerdendir? Bu kodlar yağın bileşimi ve şişenin geri dönüştürülüp dönüştürülmediği hakkında ne söyler?`,
    strategy: "Kodları tabloyla eşleştir; sonra kodun hangi soruya cevap vermediğini ayır.",
    steps: [
      { label: "Gövde", expression: `${bottle225.body.code} → ${bottle225.body.abbr}`, explanation: `${capital(bottle225.body.name)}; tekrar biriminde ${resinElements225(bottle225.body).join(", ")} vardır.` },
      { label: "Kapak", expression: `${bottle225.cap.code} → ${bottle225.cap.abbr}`, explanation: `${capital(bottle225.cap.name)}; aynı ürünün parçaları farklı polimerden olabilir.` },
      { label: "İçerik", explanation: "Yağın ana bileşenleri triaçilgliserollerdir; bunu kod değil ürün adı ve içindekiler listesi anlatır." },
      { label: "Geri dönüşüm", explanation: "Kod malzemeyi tanıtır; toplama ve işleme yapıldığını kanıtlamaz." },
    ],
    answer: `Gövde ${bottle225.body.abbr}, kapak ${bottle225.cap.abbr}. Kodlar yağın bileşimini ve geri dönüştürülmüş olduğunu söylemez.`,
    check: `Tabloda ${bottle225.body.code} ve ${bottle225.cap.code} farklı satırlardır; ikisi de kabın malzemesi sütunundadır.`,
    pitfall: "Kaptaki PET bilgisini yağın içeriğine taşımak veya kodu geri dönüşüm kanıtı saymak.",
  },
  {
    title: "Hangi ambalajın tekrar biriminde klor var?",
    prompt: `Kodları ${tp.packs.map((r) => r.code).join(", ")} olan üç ambalaj var. Hangilerinin tekrar biriminde yalnız C ve H bulunur? Klor içeren tekrar biriminde klorun kütlece yüzdesi nedir? C = 12, H = 1, Cl = 35,5 u.`,
    strategy: "Kodu kısaltmaya, kısaltmayı tekrar birimi formülüne çevir; sonra klor kütlesini tekrar kütlesine böl.",
    steps: [
      ...tp.packs.map((r) => ({ label: String(r.code), expression: `${r.abbr} · ${formulaText225(r.repeatFormula)}`, explanation: `Elementler: ${resinElements225(r).join(", ")}.` })),
      { label: "%Cl", expression: `${u(tp.clMass)} ÷ ${u(tp.pvcMass)} = ${tr(tp.perMille / 1000)} → %${tr(tp.perMille / 10)}`, explanation: `Tekrar kütlesi ${massExpr(tp.cl[0].repeatFormula)} = ${u(tp.pvcMass)} u hesabından gelir.` },
    ],
    answer: `Yalnız C ve H: kod ${tp.ch.map((r) => `${r.code} (${r.abbr})`).join(" ve ")}. Klor kod ${tp.cl[0].code} (${tp.cl[0].abbr}) tekrarındadır; kütlece %${tr(tp.perMille / 10)}.`,
    check: `${u(tp.pvcMass)} u içinde ${u(tp.clMass)} u Cl ve ${u(tp.pvcMass - tp.clMass)} u C ile H vardır; toplam yine ${u(tp.pvcMass)} u.`,
    pitfall: "Atom sayısı oranını (6 atomda 1 Cl) kütle yüzdesi sanmak.",
  },
];

export const resinSupplement225 = {
  title: resinSection225.title,
  figureTitle: resinSection225.title,
  paragraphs: resinSection225.paragraphs,
  summary: `${resinCodes225.map((r) => `${r.code} ${r.abbr}`).join(", ")}; 7 “diğer”dir. 2 ve 4 aynı etilen tekrarını taşır. O yalnız PET’te, Cl yalnız PVC’de. Kod kabın malzemesidir: içeriği, besin değerini ve geri dönüştürüldüğünü söylemez.`,
  appendSection: true as const,
  table: resinTable,
  examples: resinExamples225,
};

/** Polimer derslerinin daha önce eki yoktur; simya ve sembolik dil için ek mevcut diziye eklenir (theorySupplements). */
export const depth225Supplements = {
  "polimer-kozmetik-ilac": [monomerSupplement225],
  "polimer-gida-ilac-yag": [resinSupplement225],
};
