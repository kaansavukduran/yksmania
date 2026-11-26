import type { GuideSection, WorkedExample } from "./guides/types";

/*
 * TYT Biyoloji kalıtım derinleştirmesi (0.215.0). Kabul edilmiş rehber
 * içeriği değişmez; altı derse bir tablo bölümü, iki özgün çözümlü örnek ve
 * bir bölüm çizimi görüntüleme katmanında eklenir. Bütün oranlar gametler ve
 * Punnett kutuları tek tek sayılarak bu modülde üretilir; tablo hücreleri,
 * paragraflar, Kopya Kâğıdı özetleri ve çizimler aynı fonksiyonları kullanır.
 * Paragrafta genel bir yargı varsa modül yüklenirken veriyle sınanır.
 */

const guard = (ok: boolean, claim: string) => {
  if (!ok) throw new Error(`depth215: ${claim}`);
};
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
const lcm = (a: number, b: number) => Math.abs(a * b) / gcd(a, b);

/* ---------- Kesin kesirler ---------- */

export interface Q215 { n: number; d: number }
export const q215 = (n: number, d = 1): Q215 => {
  guard(d !== 0 && Number.isInteger(n) && Number.isInteger(d), "payda sıfır olmayan tam sayı olmalı");
  const g = gcd(n, d) || 1;
  const s = d < 0 ? -1 : 1;
  return { n: (s * n) / g, d: (s * d) / g };
};
const ZERO = q215(0);
const ONE = q215(1);
export const qAdd215 = (x: Q215, y: Q215) => q215(x.n * y.d + y.n * x.d, x.d * y.d);
export const qMul215 = (x: Q215, y: Q215) => q215(x.n * y.n, x.d * y.d);
export const qDiv215 = (x: Q215, y: Q215) => q215(x.n * y.d, x.d * y.n);
export const qEq215 = (x: Q215, y: Q215) => x.n === y.n && x.d === y.d;
export const qSum215 = (xs: readonly Q215[]) => xs.reduce(qAdd215, ZERO);
export const qText215 = ({ n, d }: Q215) => (d === 1 ? String(n) : `${n}/${d}`);
/** Payları en küçük tam sayılı orana çevirir: [1/4, 1/2, 1/4] → [1, 2, 1]. */
export const ratio215 = (ps: readonly Q215[]) => {
  const L = ps.reduce((m, p) => lcm(m, p.d), 1);
  const ints = ps.map((p) => (p.n * L) / p.d);
  const g = ints.reduce((a, b) => gcd(a, b), 0) || 1;
  return ints.map((x) => x / g);
};

/* ---------- Alel, genotip, gamet, çaprazlama ---------- */

/** Bir lokustaki iki alelin yazım sırası: büyük harf önce, A ve B O’dan önce, X’ler Y’den önce. */
const ALLELE_ORDER = ["A", "a", "B", "b", "C", "c", "D", "d", "M", "N", "O", "R", "r", "Xᴬ", "Xᵃ", "Y"];
const rank = (allele: string) => {
  const i = ALLELE_ORDER.indexOf(allele);
  guard(i >= 0, `bilinmeyen alel ${allele}`);
  return i;
};
export type Locus215 = readonly [string, string];
export type Genotype215 = readonly Locus215[];
const sortLocus = ([x, y]: Locus215): Locus215 => (rank(x) <= rank(y) ? [x, y] : [y, x]);
/** "AaBb" → [[A,a],[B,b]]; "BbXᴬY" → [[B,b],[Xᴬ,Y]]. Ardışık iki simge bir lokustur. */
export const parse215 = (text: string): Genotype215 => {
  const tokens = text.match(/Xᴬ|Xᵃ|[A-Za-z]/gu) ?? [];
  guard(tokens.join("") === text && tokens.length % 2 === 0, `genotip okunamadı: ${text}`);
  const loci: Locus215[] = [];
  for (let i = 0; i < tokens.length; i += 2) loci.push(sortLocus([tokens[i], tokens[i + 1]]));
  return loci;
};
export const genotypeText215 = (g: Genotype215) => g.map(([x, y]) => x + y).join("");
const genotypeKey = (g: Genotype215) => g.flatMap(([x, y]) => [rank(x), rank(y)]);
const compareKeys = (a: number[], b: number[]) => {
  for (let i = 0; i < Math.min(a.length, b.length); i += 1) if (a[i] !== b[i]) return a[i] - b[i];
  return a.length - b.length;
};
export const isHetero215 = ([x, y]: Locus215) => x !== y;

export interface Gamete215 { alleles: readonly string[]; text: string; p: Q215 }
/** Bağımsız lokuslarda olağan mayoz: her lokustan bir alel, her seçenek 1/2. */
export const gametes215 = (g: Genotype215): Gamete215[] => {
  let list: { alleles: string[]; p: Q215 }[] = [{ alleles: [], p: ONE }];
  for (const locus of g) list = list.flatMap((x) => locus.map((allele) => ({ alleles: [...x.alleles, allele], p: qMul215(x.p, q215(1, 2)) })));
  const merged = new Map<string, Gamete215>();
  for (const { alleles, p } of list) {
    const text = alleles.join("");
    const old = merged.get(text);
    merged.set(text, old ? { ...old, p: qAdd215(old.p, p) } : { alleles, text, p });
  }
  return [...merged.values()];
};
/** Bağlı iki lokus, parça değişimi yok: yalnız iki homologun ebeveyn tipleri. */
export const linkedGametes215 = (h1: string, h2: string): Gamete215[] =>
  [h1, h2].map((text) => ({ alleles: [...text], text, p: q215(1, 2) }));

export interface Zygote215 { genotype: Genotype215; text: string; p: Q215 }
const fuse = (a: Gamete215, b: Gamete215): Genotype215 => {
  guard(a.alleles.length === b.alleles.length, "gametlerin lokus sayısı eşit olmalı");
  return a.alleles.map((x, i) => sortLocus([x, b.alleles[i]]));
};
/** Punnett karesi: satır bir ebeveynin, sütun diğerinin farklı gametleri. */
export const punnett215 = (first: string, second: string) => {
  const rows = gametes215(parse215(first));
  const cols = gametes215(parse215(second));
  const grid = rows.map((r) => cols.map((c) => {
    const genotype = fuse(r, c);
    return { genotype, text: genotypeText215(genotype), p: qMul215(r.p, c.p) };
  }));
  return { rows, cols, grid };
};
/** Bütün birleşmeler sayılır; aynı genotipin payları toplanır ve sınıflar AA, Aa, aa sırasıyla dizilir. */
export const cross215 = (first: string, second: string): Zygote215[] => {
  const merged = new Map<string, Zygote215>();
  for (const cell of punnett215(first, second).grid.flat()) {
    const old = merged.get(cell.text);
    merged.set(cell.text, old ? { ...old, p: qAdd215(old.p, cell.p) } : cell);
  }
  const out = [...merged.values()].sort((x, y) => compareKeys(genotypeKey(x.genotype), genotypeKey(y.genotype)));
  guard(qEq215(qSum215(out.map(({ p }) => p)), ONE), "çaprazlama payları toplamı 1 olmalı");
  return out;
};
/** Genotip sınıflarını fenotipe çevirir; fenotipler ilk göründükleri genotip sırasıyla. */
export const phenotypes215 = (zygotes: readonly Zygote215[], phenotype: (g: Genotype215) => string) => {
  const merged = new Map<string, Q215>();
  for (const z of zygotes) {
    const label = phenotype(z.genotype);
    merged.set(label, qAdd215(merged.get(label) ?? ZERO, z.p));
  }
  return [...merged.entries()].map(([label, p]) => ({ label, p }));
};
const labelledRatio = (items: readonly { label: string; p: Q215 }[]) => {
  if (items.length === 1) return `hepsi ${items[0].label}`;
  const r = ratio215(items.map(({ p }) => p));
  return items.map(({ label }, i) => `${r[i]} ${label}`).join(" : ");
};
const genotypeRatioText = (zygotes: readonly Zygote215[]) => (zygotes.length <= 4
  ? labelledRatio(zygotes.map(({ text, p }) => ({ label: text, p })))
  : ratio215(zygotes.map(({ p }) => p)).join(":"));
const pOf = (items: readonly { label: string; p: Q215 }[], label: string) => items.find((x) => x.label === label)?.p ?? ZERO;
const isRecessiveAllele = (x: string) => x !== x.toUpperCase();
/** Tam baskınlık, her lokus: büyük harf varsa A_, yoksa aa. */
export const mendelPhenotype215 = (g: Genotype215) => g.map(([x, y]) => (isRecessiveAllele(x) && isRecessiveAllele(y) ? x + y : `${x}_`)).join("");

/* =====================================================================
 * Kalıtıma giriş: heterozigot lokus sayısı gamet çeşidini belirler
 * ===================================================================== */

export interface GameteSpec215 { genotype: string; linked?: readonly [string, string] }
export const gameteSpecs215: readonly GameteSpec215[] = [
  { genotype: "AA" },
  { genotype: "Aa" },
  { genotype: "AaBB" },
  { genotype: "AaBb" },
  { genotype: "AaBb", linked: ["AB", "ab"] },
  { genotype: "AaBbCC" },
  { genotype: "AaBbCc" },
  { genotype: "AaBbCcDd" },
];
export const gameteRows215 = () => gameteSpecs215.map((spec) => {
  const g = parse215(spec.genotype);
  const h = g.filter(isHetero215).length;
  const list = spec.linked ? linkedGametes215(...spec.linked) : gametes215(g);
  guard(qEq215(qSum215(list.map(({ p }) => p)), ONE), "gamet payları toplamı 1 olmalı");
  const share = list[0].p;
  return { ...spec, loci: g.length, h, list, count: list.length, share, equal: list.every(({ p }) => qEq215(p, share)) };
});
const gRows = gameteRows215();
const independentGametes = gRows.filter((r) => !r.linked);
const linkedRow = gRows.find((r) => r.linked)!;
for (const r of independentGametes) guard(r.count === 2 ** r.h && r.equal && qEq215(r.share, q215(1, 2 ** r.h)), "bağımsız lokuslarda çeşit 2ʰ ve her gamet 1/2ʰ olmalı");
guard(linkedRow.count === 2 && linkedRow.h === 2 && linkedRow.count < 2 ** linkedRow.h, "bağlı AB/ab parça değişimsiz yalnız 2 gamet vermeli");
const [, , rowAaBB, rowAaBb, , rowAaBbCC, rowAaBbCc, rowFour] = gRows;
guard(rowAaBB.loci === 2 && rowAaBB.h === 1 && rowAaBbCC.count === rowAaBb.count, "homozigot lokus gamet çeşidini artırmamalı");
const gameteList = (r: (typeof gRows)[number]) => {
  const t = r.list.map(({ text }) => text);
  return t.length <= 4 ? t.join(", ") : `${t[0]}, ${t[1]}, …, ${t[t.length - 1]}`;
};
const gameteTable = {
  layout: "table" as const,
  headers: ["Genotip", "Heterozigot lokus (h)", "Gamet çeşidi", "Gametler", "Bir gametin payı"],
  rows: gRows.map((r) => [
    r.linked ? `${r.genotype} · ${r.linked.join("/")} bağlı, parça değişimi yok` : r.genotype,
    String(r.h),
    r.linked ? `${r.count} (2ʰ = ${2 ** r.h} değil)` : `2${"⁰¹²³⁴"[r.h]} = ${r.count}`,
    gameteList(r),
    qText215(r.share),
  ]),
};

export const gameteSection215: GuideSection = {
  title: "Heterozigot lokusları sayarak gamet çeşidini bul",
  figureTitle: "Heterozigot lokusları sayarak gamet çeşidini bul",
  paragraphs: [
    `Tabloda her harf çifti bir lokustur: A/a, B/b, C/c ve D/d. Bağlı satır dışında lokuslar farklı kromozom çiftlerindedir ve mayoz olağandır. Homozigot bir lokus gamete tek seçenek, heterozigot bir lokus iki seçenek verir. Bu yüzden gamet çeşidi yalnız heterozigot lokus sayısı h ile belirlenir: 2ʰ.`,
    `${rowAaBB.genotype} genotipinde ${rowAaBB.loci} lokus var ama h = ${rowAaBB.h}; gametler ${gameteList(rowAaBB)} olur. ${rowAaBbCC.genotype} ile ${rowAaBb.genotype} aynı sayıda, ${rowAaBb.count} çeşit gamet verir, çünkü CC her gamete yalnız C ekler. ${rowAaBbCc.genotype} için ${rowAaBbCc.count}, ${rowFour.genotype} için ${rowFour.count} çeşit vardır ve bağımsız satırlarda her gametin payı 1/2ʰ olur: ${qText215(rowFour.share)}.`,
    `Aynı ${linkedRow.genotype} genotipi ${linkedRow.linked!.join("/")} bağlı düzeninde ve parça değişimi olmadan yalnız ${gameteList(linkedRow)} gametlerini verir: ${linkedRow.count} çeşit, her biri ${qText215(linkedRow.share)}. 2ʰ kuralı bağımsız dağılım koşuluna aittir. Lokuslar bağlıysa önce kromozom düzenini yaz.`,
  ],
  table: gameteTable,
};

/** Örnekler için hesaplanan değerler. */
export const gameteExample215 = (() => {
  const g = parse215("AaBbccDd");
  const list = gametes215(g);
  const target = list.find(({ text }) => text === "aBcD")!;
  return { h: g.filter(isHetero215).length, count: list.length, share: target.p };
})();
guard(gameteExample215.h === 3 && gameteExample215.count === 8 && qEq215(gameteExample215.share, q215(1, 8)), "AaBbccDd örneği 8 gamet ve 1/8 vermeli");

export const gameteExamples215: WorkedExample[] = [
  {
    title: "Dört lokusta belirli bir gametin payı",
    prompt: "AaBbccDd genotipli bir bireyde dört lokus farklı kromozom çiftlerindedir ve mayoz olağandır. Bu birey kaç çeşit gamet oluşturabilir? aBcD gametinin payı kaçtır?",
    strategy: "Önce heterozigot lokusları say. Belirli bir gametin payını her lokustaki seçimin olasılığını çarparak bul.",
    steps: [
      { label: "Heterozigot lokuslar", expression: `Aa, Bb, Dd ⇒ h = ${gameteExample215.h}`, explanation: "cc homozigottur ve her gamete yalnız c verir." },
      { label: "Çeşit", expression: `2³ = ${gameteExample215.count}`, explanation: "Her heterozigot lokus seçenek sayısını ikiye katlar." },
      { label: "aBcD payı", expression: `1/2 · 1/2 · 1 · 1/2 = ${qText215(gameteExample215.share)}`, explanation: "a, B ve D için 1/2; c için seçim zorunludur, olasılığı 1." },
    ],
    answer: `${gameteExample215.count} çeşit gamet oluşur; aBcD gametinin payı ${qText215(gameteExample215.share)}.`,
    check: `Sekiz gametin hepsi c taşır ve her biri ${qText215(gameteExample215.share)} payındadır: ${gameteExample215.count} · ${qText215(gameteExample215.share)} = 1.`,
    pitfall: "Dört lokus var diye 2⁴ = 16 yazmak. cc homozigot olduğu için gamet çeşidini artırmaz.",
  },
  {
    title: "Gamet çeşidinden homozigot lokusu bul",
    prompt: "Beş lokuslu bir genotipte bütün lokuslar farklı kromozom çiftlerindedir ve mayoz olağandır. Birey 16 çeşit gamet oluşturabiliyor. Bu genotipte kaç lokus homozigottur?",
    strategy: "Gamet çeşidi 2ʰ olduğundan h’yi bul. Kalan lokuslar homozigottur.",
    steps: [
      { label: "h", expression: "2ʰ = 16 ⇒ h = 4", explanation: "Dört lokus heterozigottur." },
      { label: "Homozigot", expression: "5 − 4 = 1", explanation: "Homozigot lokus AA gibi baskın ya da aa gibi çekinik olabilir." },
      { label: "Örnek", expression: "AaBbCcDdEE ⇒ 2·2·2·2·1 = 16", explanation: "EE lokusu çeşit sayısını değiştirmez." },
    ],
    answer: "Bir lokus homozigottur.",
    check: "Heterozigot lokus 3 olsaydı 8, 5 olsaydı 32 çeşit çıkardı; yalnız h = 4 için 16 elde edilir.",
    pitfall: "Homozigot lokusu yalnız büyük harfli AA gibi düşünmek. aa da homozigottur ve gamet çeşidini artırmaz.",
  },
];

export const gameteSupplement215 = {
  title: gameteSection215.title,
  figureTitle: gameteSection215.title,
  paragraphs: gameteSection215.paragraphs,
  summary: `Gamet çeşidi 2ʰ, h bağımsız heterozigot lokus sayısıdır. ${rowAaBB.genotype} → ${rowAaBB.count}, ${rowAaBbCc.genotype} → ${rowAaBbCc.count}, ${rowFour.genotype} → ${rowFour.count}; her gamet eş paylı. ${linkedRow.linked!.join("/")} bağlı ve parça değişimi yoksa yalnız ${linkedRow.count}.`,
  appendSection: true as const,
  table: gameteTable,
  examples: gameteExamples215,
};

/* =====================================================================
 * Mendel genetiği: yedi çaprazlamanın genotip ve fenotip oranları
 * ===================================================================== */

export const mendelCrosses215: readonly (readonly [string, string])[] = [
  ["AA", "aa"],
  ["Aa", "Aa"],
  ["Aa", "aa"],
  ["AA", "Aa"],
  ["AaBb", "AaBb"],
  ["AaBb", "aabb"],
  ["AaBb", "Aabb"],
];
const allRecessive = (text: string) => parse215(text).every(([x, y]) => isRecessiveAllele(x) && isRecessiveAllele(y));
export const mendelRows215 = () => mendelCrosses215.map(([first, second]) => {
  const zygotes = cross215(first, second);
  const phen = phenotypes215(zygotes, mendelPhenotype215);
  const recessiveLabel = mendelPhenotype215(parse215(first).map(([x]) => [x.toLowerCase(), x.toLowerCase()] as const));
  return {
    first, second, zygotes, phen,
    genotypeRatio: ratio215(zygotes.map(({ p }) => p)),
    phenotypeRatio: ratio215(phen.map(({ p }) => p)),
    recessive: pOf(phen, recessiveLabel),
    recessiveLabel,
    testCross: allRecessive(second),
  };
});
const mRows = mendelRows215();
const [mFirst, mSelf, mTest, mHidden, mDi, mDiTest, mDiHalf] = mRows;
// Test çaprazlaması: yavru fenotip oranı test edilen bireyin gamet oranıdır.
for (const r of mRows.filter((x) => x.testCross)) {
  const g = gametes215(parse215(r.first));
  guard(r.phen.length === g.length && ratio215(g.map(({ p }) => p)).join(":") === r.phenotypeRatio.join(":"), "test çaprazlaması gamet oranını yansıtmalı");
}
// İki lokusta her fenotip payı tek lokus paylarının çarpımıdır.
for (const r of mRows.filter((x) => parse215(x.first).length === 2)) {
  const [a1, b1] = parse215(r.first).map(([x, y]) => x + y);
  const [a2, b2] = parse215(r.second).map(([x, y]) => x + y);
  const pa = phenotypes215(cross215(a1, a2), mendelPhenotype215);
  const pb = phenotypes215(cross215(b1, b2), mendelPhenotype215);
  for (const { label, p } of r.phen) guard(qEq215(p, qMul215(pOf(pa, label.slice(0, 2)), pOf(pb, label.slice(2)))), "iki lokusta fenotip payı çarpım olmalı");
}
guard(mRows.filter((r) => r.phenotypeRatio.join(":") === "9:3:3:1").length === 1 && mDi.phenotypeRatio.join(":") === "9:3:3:1", "9:3:3:1 yalnız AaBb × AaBb satırında olmalı");
guard(mHidden.zygotes.length === 2 && mHidden.phen.length === 1, "AA × Aa iki genotip, tek fenotip vermeli");
guard(mFirst.zygotes.length === 1 && mSelf.genotypeRatio.join(":") === "1:2:1" && mSelf.phenotypeRatio.join(":") === "3:1", "Aa × Aa 1:2:1 ve 3:1 vermeli");
const mHalfA = pOf(phenotypes215(cross215("Aa", "Aa"), mendelPhenotype215), "A_");
const mHalfB = pOf(phenotypes215(cross215("Bb", "bb"), mendelPhenotype215), "bb");
const mHalfAbb = pOf(mDiHalf.phen, "A_bb");
guard(qEq215(mHalfAbb, qMul215(mHalfA, mHalfB)), "A_bb payı çarpım olmalı");
export const crossText215 = (first: string, second: string) => `${first} × ${second}`;
const mendelTable = {
  layout: "table" as const,
  headers: ["Çaprazlama", "Genotip çeşidi", "Genotip oranı", "Fenotip oranı", "Tamamen çekinik yavru"],
  rows: mRows.map((r) => [
    crossText215(r.first, r.second),
    String(r.zygotes.length),
    genotypeRatioText(r.zygotes),
    labelledRatio(r.phen),
    `${r.recessiveLabel}: ${qText215(r.recessive)}`,
  ]),
};

export const mendelSection215: GuideSection = {
  title: "Yedi çaprazlamada oranı kutuları sayarak kur",
  figureTitle: "Yedi çaprazlamada oranı kutuları sayarak kur",
  paragraphs: [
    `Her satır ebeveyn gametlerinin bütün eşleşmeleri sayılarak kuruldu. Genler bağımsızdır, her lokusta tam baskınlık vardır ve gametler eş olasılıklıdır. A_ gösterimi AA veya Aa demektir. Dörtten fazla genotip sınıfı olan satırlarda oran AABB, AABb, AAbb, AaBB, … , aabb sırasıyla yazıldı.`,
    `Test çaprazlamasında eş bütün lokuslarda çekinik homozigottur ve yalnız çekinik alel verir. Bu yüzden yavruların fenotip oranı test edilen bireyin gamet oranını aynen gösterir: ${crossText215(mTest.first, mTest.second)} için ${mTest.phenotypeRatio.join(":")}, ${crossText215(mDiTest.first, mDiTest.second)} için ${mDiTest.phenotypeRatio.join(":")}. ${crossText215(mHidden.first, mHidden.second)} satırında ${mHidden.zygotes.length} genotip var ama bütün yavrular A_ görünür; baskın fenotip genotipi tek başına söylemez.`,
    `İki lokuslu satırlarda her fenotip payı tek lokus paylarının çarpımıdır. ${crossText215(mDiHalf.first, mDiHalf.second)} çaprazlamasında A_ payı ${qText215(mHalfA)}, bb payı ${qText215(mHalfB)}, A_bb payı ${qText215(mHalfA)} · ${qText215(mHalfB)} = ${qText215(mHalfAbb)} olur ve oran ${mDiHalf.phenotypeRatio.join(":")} çıkar. ${mDi.phenotypeRatio.join(":")} oranı yalnız iki ebeveynin de iki lokusta heterozigot olduğu satıra aittir.`,
  ],
  table: mendelTable,
};

/** Örnek 1: AaBb × Aabb’de A_bb içinde AAbb payı. */
export const mendelExample215 = (() => {
  const z = cross215("AaBb", "Aabb");
  const target = z.filter((x) => mendelPhenotype215(x.genotype) === "A_bb");
  const pTarget = qSum215(target.map(({ p }) => p));
  const pHomo = z.find((x) => x.text === "AAbb")!.p;
  return { pTarget, pHomo, conditional: qDiv215(pHomo, pTarget) };
})();
/** Örnek 2: A_B_ × aabb yavrularının yarısı A_B_, yarısı A_bb ise test edilen genotip. */
export const testCrossExample215 = (() => {
  const candidates = ["AABB", "AABb", "AaBB", "AaBb"];
  const fits = candidates.filter((c) => {
    const ph = phenotypes215(cross215(c, "aabb"), mendelPhenotype215);
    return ph.length === 2 && qEq215(pOf(ph, "A_B_"), q215(1, 2)) && qEq215(pOf(ph, "A_bb"), q215(1, 2));
  });
  guard(fits.length === 1, "test çaprazlaması tek genotipe işaret etmeli");
  const self = phenotypes215(cross215(fits[0], fits[0]), mendelPhenotype215);
  return { genotype: fits[0], selfAbb: pOf(self, "A_bb"), selfABb: pOf(self, "A_B_") };
})();
guard(qEq215(mendelExample215.conditional, q215(1, 3)) && testCrossExample215.genotype === "AABb" && qEq215(testCrossExample215.selfAbb, q215(1, 4)), "Mendel örnek cevapları");

export const mendelExamples215: WorkedExample[] = [
  {
    title: "Koşullu payda iki lokus",
    prompt: "Bir bitkide A (uzun gövde) a’ya (kısa gövde), B (sarı tohum) b’ye (yeşil tohum) tam baskındır ve iki gen bağımsızdır. AaBb × Aabb çaprazlamasından doğan uzun gövdeli, yeşil tohumlu yavruların kaçta kaçı iki lokusta da homozigottur?",
    strategy: "Önce uzun-yeşil (A_bb) yavruların payını, sonra bunların içindeki AAbb payını bul. Koşul örnek uzayını A_bb ile sınırlar.",
    steps: [
      { label: "A_bb payı", expression: `3/4 · 1/2 = ${qText215(mendelExample215.pTarget)}`, explanation: "Aa × Aa’da A_ 3/4; Bb × bb’de bb 1/2." },
      { label: "AAbb payı", expression: `1/4 · 1/2 = ${qText215(mendelExample215.pHomo)}`, explanation: "Aa × Aa’da AA 1/4." },
      { label: "Koşullu pay", expression: `(${qText215(mendelExample215.pHomo)}) / (${qText215(mendelExample215.pTarget)}) = ${qText215(mendelExample215.conditional)}`, explanation: "Payda yalnız uzun-yeşil yavrulardır." },
    ],
    answer: `Uzun gövdeli, yeşil tohumlu yavruların ${qText215(mendelExample215.conditional)}’ü AAbb’dir.`,
    check: "8 kutuluk karede A_bb kutuları AAbb, Aabb ve Aabb’dir; üçünden biri iki lokusta homozigottur.",
    pitfall: `Koşulu unutup bütün yavrular içindeki AAbb payını (${qText215(mendelExample215.pHomo)}) cevap vermek.`,
  },
  {
    title: "Test çaprazlamasından genotipi oku",
    prompt: "A_B_ fenotipli bir bitki aabb ile çaprazlanıyor. Genler bağımsız ve tam baskındır. 160 yavrunun 80’i A_B_, 80’i A_bb fenotiplidir; gözlenen sayıların beklenen oranlara tam uyduğunu kabul et. Test edilen bitkinin genotipi nedir? Bu bitki kendileştirilirse yavruların kaçta kaçı A_bb olur?",
    strategy: "Test çaprazlamasında yavru fenotipleri test edilen bitkinin gametlerini gösterir. Her lokusu ayrı oku.",
    steps: [
      { label: "A lokusu", expression: "aa yavru yok ⇒ AA", explanation: "Bitki Aa olsaydı yavruların yarısı aa olurdu." },
      { label: "B lokusu", expression: "B_ : bb = 1 : 1 ⇒ Bb", explanation: "Bitki hem B hem b gameti veriyor." },
      { label: "Kendileştirme", expression: `AABb × AABb ⇒ A_ payı 1, bb payı 1/4 ⇒ A_bb = ${qText215(testCrossExample215.selfAbb)}`, explanation: `Kalan ${qText215(testCrossExample215.selfABb)} A_B_ olur.` },
    ],
    answer: `Bitki ${testCrossExample215.genotype}’dir; kendileşince yavruların ${qText215(testCrossExample215.selfAbb)}’ü A_bb olur.`,
    check: "AABb gametleri AB ve Ab, her biri 1/2; aabb’nin ab gametiyle AaBb ve Aabb yavrular 1:1 çıkar.",
    pitfall: "Yarı yarıya dağılımı görüp AaBb demek. AaBb test çaprazlamasında 1:1:1:1 oranıyla dört fenotip verirdi.",
  },
];

export const mendelSupplement215 = {
  title: mendelSection215.title,
  figureTitle: mendelSection215.title,
  paragraphs: mendelSection215.paragraphs,
  summary: `Aa × Aa: genotip ${mSelf.genotypeRatio.join(":")}, fenotip ${mSelf.phenotypeRatio.join(":")}. Test çaprazlaması gamet oranını verir: Aa × aa ${mTest.phenotypeRatio.join(":")}, AaBb × aabb ${mDiTest.phenotypeRatio.join(":")}. AaBb × AaBb ${mDi.phenotypeRatio.join(":")}, AaBb × Aabb ${mDiHalf.phenotypeRatio.join(":")}. Bağımsız lokuslarda paylar çarpılır.`,
  appendSection: true as const,
  table: mendelTable,
  examples: mendelExamples215,
};

/* =====================================================================
 * Mendel’den sapmalar: aynı genotip oranı, farklı fenotip oranı
 * ===================================================================== */

/** Lokus harfine göre ilişki: A ve B tam, R eksik, M/N eş baskın. */
const flowerColour: Record<string, string> = { RR: "kırmızı", Rr: "pembe", rr: "beyaz" };
const mnGroup: Record<string, string> = { MM: "M", MN: "MN", NN: "N" };
export const deviationPhenotype215 = (g: Genotype215) => g.map(([x, y]) => {
  const t = x + y;
  if (t in flowerColour) return flowerColour[t];
  if (t in mnGroup) return mnGroup[t];
  if (x === "B" || x === "b") return x === "B" ? "uzun" : "kısa";
  return isRecessiveAllele(x) && isRecessiveAllele(y) ? t : `${x}_`;
}).join(" ");
export interface DeviationSpec215 { relation: string; first: string; second: string }
export const deviationSpecs215: readonly DeviationSpec215[] = [
  { relation: "Tam baskınlık", first: "Aa", second: "Aa" },
  { relation: "Eksik baskınlık", first: "Rr", second: "Rr" },
  { relation: "Eksik baskınlık", first: "Rr", second: "RR" },
  { relation: "Eksik baskınlık", first: "RR", second: "rr" },
  { relation: "Eş baskınlık", first: "MN", second: "MN" },
  { relation: "Eş baskınlık", first: "MN", second: "MM" },
  { relation: "Eksik (R) ve tam (B) baskınlık", first: "RrBb", second: "RrBb" },
];
export const deviationRows215 = () => deviationSpecs215.map((spec) => {
  const zygotes = cross215(spec.first, spec.second);
  const phen = phenotypes215(zygotes, deviationPhenotype215);
  return { ...spec, zygotes, phen, genotypeRatio: ratio215(zygotes.map(({ p }) => p)), phenotypeRatio: ratio215(phen.map(({ p }) => p)) };
});
const dRows = deviationRows215();
const [dFull, dInc, , , dCo, , dTwo] = dRows;
guard([dFull, dInc, dCo].every((r) => r.genotypeRatio.join(":") === "1:2:1"), "üç ilişkide genotip oranı 1:2:1 olmalı");
guard(dFull.phenotypeRatio.join(":") === "3:1", "tam baskınlık 3:1 vermeli");
for (const r of dRows.filter((x) => x.relation !== "Tam baskınlık" && parse215(x.first).length === 1)) {
  guard(r.phen.length === r.zygotes.length && r.phenotypeRatio.join(":") === r.genotypeRatio.join(":"), "eksik ve eş baskınlıkta fenotip genotipi doğrudan göstermeli");
}
const twoR = phenotypes215(cross215("Rr", "Rr"), deviationPhenotype215);
const twoB = phenotypes215(cross215("Bb", "Bb"), deviationPhenotype215);
guard(dTwo.phen.length === twoR.length * twoB.length, "iki bağımsız lokusta fenotip sınıfı çarpım olmalı");
for (const { label, p } of dTwo.phen) {
  const [colour, height] = label.split(" ");
  guard(qEq215(p, qMul215(pOf(twoR, colour), pOf(twoB, height))), "iki lokuslu fenotip payı çarpım olmalı");
}
const pinkTall = pOf(dTwo.phen, "pembe uzun");
const deviationTable = {
  layout: "table" as const,
  headers: ["İlişki", "Çaprazlama", "Genotip oranı", "Fenotip oranı", "Fenotip sınıfı"],
  rows: dRows.map((r) => [r.relation, crossText215(r.first, r.second), genotypeRatioText(r.zygotes), labelledRatio(r.phen), String(r.phen.length)]),
};

export const deviationSection215: GuideSection = {
  title: "Aynı genotip oranı farklı fenotip oranı verebilir",
  figureTitle: "Aynı genotip oranı farklı fenotip oranı verebilir",
  paragraphs: [
    "Tablodaki bütün satırlar aynı yöntemle çözüldü: gametler eşleştirildi, genotip sınıfları sayıldı, sonra her genotip verilen ilişkiye göre fenotipe çevrildi. Tam baskınlıkta A_ baskın görünür. Eksik baskınlıkta dersin çiçek modeli kullanılır: RR kırmızı, Rr pembe, rr beyaz. Eş baskınlıkta MN sistemi kullanılır: MN bireyde M ve N antijenleri birlikte bulunur.",
    `${crossText215(dFull.first, dFull.second)}, ${crossText215(dInc.first, dInc.second)} ve ${crossText215(dCo.first, dCo.second)} satırlarının genotip oranı aynıdır: ${dFull.genotypeRatio.join(":")}. Fenotipe çevirince tam baskınlıkta ${dFull.phenotypeRatio.join(":")}, diğer iki satırda yine ${dInc.phenotypeRatio.join(":")} çıkar, çünkü heterozigot ayrı bir görünüm verir. Eksik ve eş baskınlıkta her genotipin kendi fenotipi olduğundan fenotipten genotip doğrudan yazılır.`,
    `Son satırda R lokusu eksik baskın, B lokusu tam baskındır (B uzun gövde, b kısa gövde) ve iki lokus bağımsızdır. R lokusu ${twoR.length}, B lokusu ${twoB.length} fenotip verir; ${twoR.length} · ${twoB.length} = ${dTwo.phen.length} fenotip sınıfı oluşur. Genotip oranı RRBB, RRBb, RRbb, RrBB, … , rrbb sırasıyla, fenotip oranı tablodaki sırayla ${dTwo.phenotypeRatio.join(":")} olur. Pembe uzun payı ${qText215(pOf(twoR, "pembe"))} · ${qText215(pOf(twoB, "uzun"))} = ${qText215(pinkTall)}.`,
  ],
  table: deviationTable,
};

/** Örnek 1: yarı pembe, yarı beyaz yavru veren ebeveyn çiftleri. */
export const deviationExample215 = (() => {
  const options = ["RR", "Rr", "rr"];
  const fits: string[] = [];
  options.forEach((x, i) => options.slice(i).forEach((y) => {
    const ph = phenotypes215(cross215(x, y), deviationPhenotype215);
    if (ph.length === 2 && qEq215(pOf(ph, "pembe"), q215(1, 2)) && qEq215(pOf(ph, "beyaz"), q215(1, 2))) fits.push(crossText215(x, y));
  }));
  guard(fits.length === 1, "yarı pembe yarı beyaz tek çifte işaret etmeli");
  const red = pOf(phenotypes215(cross215("Rr", "Rr"), deviationPhenotype215), "kırmızı");
  const two = phenotypes215(cross215("RrBb", "Rrbb"), deviationPhenotype215);
  return { parents: fits[0], red, classes: two.length, pinkShort: pOf(two, "pembe kısa") };
})();
guard(deviationExample215.parents === "Rr × rr" && qEq215(deviationExample215.red, q215(1, 4)) && deviationExample215.classes === 6 && qEq215(deviationExample215.pinkShort, q215(1, 4)), "sapma örnek cevapları");

export const deviationExamples215: WorkedExample[] = [
  {
    title: "Yavru dağılımından ebeveynleri bul",
    prompt: "Eksik baskınlık modelinde RR kırmızı, Rr pembe, rr beyaz çiçek verir. İki bitkinin çaprazlamasından çok sayıda yavru elde ediliyor; yavruların yarısı pembe, yarısı beyazdır ve gözlenen sayılar beklenen oranlara tam uyar. Ebeveynlerin genotipi nedir? Pembe yavrular kendi aralarında çaprazlanırsa yavruların kaçta kaçı kırmızı olur?",
    strategy: "Her fenotipin hangi alelleri gerektirdiğini yaz. Görülmeyen kırmızı da bilgi verir.",
    steps: [
      { label: "Beyaz yavru", expression: "rr ⇒ iki ebeveyn de r verir", explanation: "Beyaz yavru her ebeveynden r almıştır." },
      { label: "Kırmızı yok", expression: "RR yok ⇒ ebeveynlerden biri R veremez ⇒ rr", explanation: "İkisi de R verebilseydi RR yavru da oluşurdu." },
      { label: "Pembe yavru", expression: "Rr ⇒ diğer ebeveyn R verir ⇒ Rr", explanation: "RR olsaydı bütün yavrular pembe olurdu." },
      { label: "Pembe × pembe", expression: `Rr × Rr ⇒ RR = ${qText215(deviationExample215.red)}`, explanation: "Genotip 1:2:1, fenotip 1 kırmızı : 2 pembe : 1 beyaz." },
    ],
    answer: `Ebeveynler ${deviationExample215.parents}; pembe yavruların çaprazlamasında yavruların ${qText215(deviationExample215.red)}’ü kırmızı olur.`,
    check: "Rr × rr: Rr ve rr her biri 1/2, yani yarı pembe yarı beyaz. Diğer altı ebeveyn çifti bu dağılımı vermez.",
    pitfall: "Pembeyi ‘karışmış alel’ sanıp pembe yavrulardan yalnız pembe beklemek. Rr bireyi R ve r gametlerini ayrı verir.",
  },
  {
    title: "Eksik ve tam baskın iki lokus",
    prompt: "R lokusunda eksik baskınlık vardır (RR kırmızı, Rr pembe, rr beyaz); B lokusunda B (uzun gövde) b’ye (kısa gövde) tam baskındır. İki lokus bağımsızdır. RrBb × Rrbb çaprazlamasında kaç fenotip sınıfı oluşur? Pembe çiçekli, kısa gövdeli yavruların payı kaçtır?",
    strategy: "Her lokusu ayrı çöz, sınıf sayılarını ve payları çarp.",
    steps: [
      { label: "R lokusu", expression: "Rr × Rr ⇒ kırmızı 1/4, pembe 1/2, beyaz 1/4", explanation: "Eksik baskınlıkta üç fenotip." },
      { label: "B lokusu", expression: "Bb × bb ⇒ uzun 1/2, kısa 1/2", explanation: "Tam baskınlıkta iki fenotip." },
      { label: "Sınıf sayısı", expression: `3 · 2 = ${deviationExample215.classes}`, explanation: "Her renk her boyla birleşebilir." },
      { label: "Pembe kısa", expression: `1/2 · 1/2 = ${qText215(deviationExample215.pinkShort)}`, explanation: "Bağımsız lokuslarda paylar çarpılır." },
    ],
    answer: `${deviationExample215.classes} fenotip sınıfı oluşur; pembe kısa yavruların payı ${qText215(deviationExample215.pinkShort)}.`,
    check: "8 kutuluk karede Rrbb kutuları 2 tanedir: 2/8 = 1/4.",
    pitfall: "İki lokus var diye 9:3:3:1 kalıbını kullanmak. R lokusu eksik baskın, B lokusunun eşi de bb’dir.",
  },
];

export const deviationSupplement215 = {
  title: deviationSection215.title,
  figureTitle: deviationSection215.title,
  paragraphs: deviationSection215.paragraphs,
  summary: `Aa × Aa, Rr × Rr ve MN × MN: genotip hep ${dFull.genotypeRatio.join(":")}. Fenotip tam baskınlıkta ${dFull.phenotypeRatio.join(":")}, eksik ve eş baskınlıkta ${dInc.phenotypeRatio.join(":")}. RrBb × RrBb (R eksik, B tam): ${dTwo.phen.length} sınıf, ${dTwo.phenotypeRatio.join(":")}.`,
  appendSection: true as const,
  table: deviationTable,
  examples: deviationExamples215,
};

/* =====================================================================
 * Kan grupları: ebeveyn fenotiplerinden olası ve olamayacak çocuklar
 * ===================================================================== */

export const aboGenotypes215: Record<string, readonly string[]> = { A: ["AA", "AO"], B: ["BB", "BO"], AB: ["AB"], O: ["OO"] };
export const rhGenotypes215: Record<string, readonly string[]> = { "Rh+": ["DD", "Dd"], "Rh−": ["dd"] };
export const aboGroup215 = ([x, y]: Locus215) => {
  const has = (k: string) => x === k || y === k;
  return has("A") && has("B") ? "AB" : has("A") ? "A" : has("B") ? "B" : "O";
};
export const rhGroup215 = ([x, y]: Locus215) => (x === "D" || y === "D" ? "Rh+" : "Rh−");
/** Ebeveyn fenotipinin bütün genotipleri denenir; en az bir eşleşmede oluşan çocuk grubu görülebilir. */
export const possibleChildren215 = (first: string, second: string) => {
  const isRh = first in rhGenotypes215;
  const table = isRh ? rhGenotypes215 : aboGenotypes215;
  const group = isRh ? rhGroup215 : aboGroup215;
  const all = Object.keys(table);
  const seen = new Set<string>();
  for (const x of table[first]) for (const y of table[second])
    for (const z of cross215(x, y)) seen.add(group(z.genotype[0]));
  const possible = all.filter((k) => seen.has(k));
  return { first, second, isRh, firstGenotypes: table[first], secondGenotypes: table[second], possible, impossible: all.filter((k) => !seen.has(k)) };
};
export const bloodPairs215: readonly (readonly [string, string])[] = [
  ["O", "O"], ["A", "A"], ["A", "B"], ["AB", "O"], ["AB", "A"], ["AB", "AB"], ["Rh−", "Rh−"], ["Rh+", "Rh+"],
];
export const bloodRows215 = () => bloodPairs215.map(([x, y]) => possibleChildren215(x, y));
const bRows = bloodRows215();
const findB = (x: string, y: string) => bRows.find((r) => r.first === x && r.second === y)!;
const bOO = findB("O", "O");
const bAA = findB("A", "A");
const bAB = findB("A", "B");
const bRhNeg = findB("Rh−", "Rh−");
const bRhPos = findB("Rh+", "Rh+");
for (const partner of Object.keys(aboGenotypes215)) guard(!possibleChildren215("AB", partner).possible.includes("O"), "AB ebeveynin O çocuğu olmamalı");
guard(bOO.possible.join() === "O" && bAB.impossible.length === 0 && bAA.possible.includes("O"), "O × O yalnız O, A × B dört grup, A × A O verebilmeli");
guard(bRhNeg.possible.join() === "Rh−" && bRhPos.possible.length === 2, "Rh− × Rh− yalnız Rh−, Rh+ × Rh+ iki grup vermeli");
guard(cross215("Dd", "Dd").some((z) => rhGroup215(z.genotype[0]) === "Rh−") && !cross215("DD", "Dd").some((z) => rhGroup215(z.genotype[0]) === "Rh−"), "Rh+ × Rh+ için Rh− çocuk yalnız Dd × Dd’de");
const orList = (xs: readonly string[]) => (xs.length > 1 ? `(${xs.join(" veya ")})` : xs[0]);
const bloodTable = {
  layout: "table" as const,
  headers: ["Ebeveyn grupları", "Olası ebeveyn genotipleri", "Görülebilen çocuk grupları", "Görülemeyen gruplar"],
  rows: bRows.map((r) => [
    crossText215(r.first, r.second),
    `${orList(r.firstGenotypes)} × ${orList(r.secondGenotypes)}`,
    r.possible.join(", "),
    r.impossible.length ? r.impossible.join(", ") : "yok",
  ]),
};

export const bloodSection215: GuideSection = {
  title: "Ebeveyn gruplarından olası ve olamayacak çocukları ayır",
  figureTitle: "Ebeveyn gruplarından olası ve olamayacak çocukları ayır",
  paragraphs: [
    "Bu tabloda ebeveynlerin yalnız fenotipi verilir. Her fenotip için okul modelindeki bütün genotipler denenir: A grubu AA veya AO, B grubu BB veya BO olabilir; AB ve O tek genotiplidir. Rh için D/d modeli kullanılır: Rh+ DD veya Dd, Rh− dd. Bir çocuk grubu en az bir genotip eşleşmesinde oluşabiliyorsa görülebilir sayılır.",
    `A × B satırında AO × BO eşleşmesi ${bAB.possible.length} grubun hepsini verir, bu yüzden görülemeyen grup yoktur. A × A ebeveynlerin O çocuğu AO × AO eşleşmesinden olabilir. AB ebeveyn her çocuğuna A veya B aleli verir; eşi hangi grupta olursa olsun AB ebeveynin O çocuğu olamaz. O × O yalnız ${bOO.possible.join(", ")} verir.`,
    `Rh satırlarında aynı yöntem iki fenotiple çalışır. Rh− × Rh− yalnız ${bRhNeg.possible.join(", ")} çocuk verir. Rh+ × Rh+ ebeveynlerin Rh− çocuğu ancak ikisi de Dd ise oluşur. Görülebilir demek bir olasılık payı değildir; payı bulmak için önce ebeveyn genotiplerinin kesin bilinmesi gerekir.`,
  ],
  table: bloodTable,
};

/** Örnek 1: A Rh+ × B Rh+ ebeveynin ilk çocuğu O Rh−; ikinci çocuğun AB Rh+ olma payı. */
export const bloodExample215 = (() => {
  const mothers = aboGenotypes215.A.flatMap((a) => rhGenotypes215["Rh+"].map((d) => a + d));
  const fathers = aboGenotypes215.B.flatMap((b) => rhGenotypes215["Rh+"].map((d) => b + d));
  const fits: [string, string][] = [];
  for (const m of mothers) for (const f of fathers)
    if (cross215(m, f).some((z) => aboGroup215(z.genotype[0]) === "O" && rhGroup215(z.genotype[1]) === "Rh−")) fits.push([m, f]);
  guard(fits.length === 1, "O Rh− çocuk ebeveyn genotiplerini kesinleştirmeli");
  const [mother, father] = fits[0];
  const zygotes = cross215(mother, father);
  const combined = phenotypes215(zygotes, (g) => `${aboGroup215(g[0])} ${rhGroup215(g[1])}`);
  return { mother, father, zygotes, combined, target: pOf(combined, "AB Rh+") };
})();
/** Örnek 2: iki çift ve iki çocuk; O çocuk hangi çifte uyar. */
export const bloodMatchExample215 = (() => {
  const couples = [["AB", "O"], ["A", "B"]] as const;
  const children = ["O", "A"];
  const fit = children.map((child) => couples.map(([x, y], i) => (possibleChildren215(x, y).possible.includes(child) ? i : -1)).filter((i) => i >= 0));
  const assignments = [[0, 1], [1, 0]].filter((perm) => perm.every((coupleIndex, childIndex) => fit[childIndex].includes(coupleIndex)));
  return { couples, children, fit, assignments };
})();
guard(bloodExample215.mother === "AODd" && bloodExample215.father === "BODd" && qEq215(bloodExample215.target, q215(3, 16)), "kan grubu örnek 1");
guard(bloodMatchExample215.fit[0].join() === "1" && bloodMatchExample215.fit[1].join() === "0,1" && bloodMatchExample215.assignments.length === 1, "kan grubu örnek 2");

export const bloodExamples215: WorkedExample[] = [
  {
    title: "İlk çocuk ebeveyn genotiplerini açar",
    prompt: "A grubu, Rh+ bir anne ile B grubu, Rh+ bir babanın ilk çocuğu O grubu, Rh− oluyor. AB0 ve Rh (D/d) lokusları bağımsızdır. Bu çiftin ikinci çocuğunun AB grubu, Rh+ olma olasılığı kaçtır?",
    strategy: "İlk çocuğun genotipinden ebeveynlerin taşıdığı çekinik alelleri bul. Sonra iki sistemi ayrı çözüp payları çarp.",
    steps: [
      { label: "İlk çocuk", expression: "O, Rh− ⇒ OO dd", explanation: "Çocuk her ebeveynden O ve d almıştır." },
      { label: "Ebeveynler", expression: `Anne ${bloodExample215.mother}, baba ${bloodExample215.father}`, explanation: "A fenotipli annede O, B fenotipli babada O; ikisinde de d bulunmalıdır." },
      { label: "AB0", expression: "AO × BO ⇒ AB = 1/4", explanation: "AB, AO, BO, OO her biri 1/4." },
      { label: "Rh", expression: "Dd × Dd ⇒ Rh+ = 3/4", explanation: "DD ve Dd pozitif, dd negatif." },
      { label: "Birlikte", expression: `1/4 · 3/4 = ${qText215(bloodExample215.target)}`, explanation: "Lokuslar bağımsız olduğu için çarpılır." },
    ],
    answer: `İkinci çocuğun AB, Rh+ olma olasılığı ${qText215(bloodExample215.target)}.`,
    check: "16 kutuluk birleşik karede AB Rh+ kutuları 3 tanedir. İlk çocuğun sonucu ikinci doğumun olasılığını değiştirmez.",
    pitfall: "Rh+ ebeveynleri DD, A ve B ebeveynleri AA ve BB sanmak. O Rh− çocuk her iki ebeveynde de O ve d alelini kanıtlar.",
  },
  {
    title: "Görülemeyen grupla çocuğu çifte eşleştir",
    prompt: "Bir model sorusunda 1. çift AB × O, 2. çift A × B gruplarındandır. Her çiftin bir çocuğu vardır; çocuklardan biri O, öteki A grubundadır. Yalnız AB0 okul modeline göre hangi çocuk hangi çifte uyar?",
    strategy: "Her çift için görülebilen çocuk gruplarını yaz. Yalnız bir çifte uyan çocuktan başla.",
    steps: [
      { label: "1. çift", expression: "AB × OO ⇒ AO, BO ⇒ A veya B", explanation: "AB ebeveyn A ya da B aleli verir; O çocuk oluşamaz." },
      { label: "2. çift", expression: "AO × BO ⇒ AB, A, B, O", explanation: "A × B ebeveynler dört grubu da verebilir." },
      { label: "O çocuk", expression: "yalnız 2. çift", explanation: "O grubu 1. çiftin görülemeyen grubudur." },
      { label: "A çocuk", expression: "kalan 1. çift", explanation: "A çocuk iki çifte de uyar; O çocuk 2. çifte yerleşince 1. çifte kalır." },
    ],
    answer: "O grubu çocuk 2. çifte (A × B), A grubu çocuk 1. çifte (AB × O) uyar.",
    check: "Ters eşleştirmede O çocuk AB × O çiftine düşer ve bu model içinde mümkün değildir.",
    pitfall: "A çocuğun iki çifte de uyduğunu görüp karar verememek ya da bu model uyumunu gerçek akrabalık kanıtı saymak.",
  },
];

export const bloodSupplement215 = {
  title: bloodSection215.title,
  figureTitle: bloodSection215.title,
  paragraphs: bloodSection215.paragraphs,
  summary: `AB ebeveynin O çocuğu olamaz. O × O yalnız O, A × B dört grubun hepsini, A × A O’yu da verebilir. Rh− × Rh− yalnız Rh−; Rh+ × Rh+ Dd × Dd ise Rh− verir. AO Dd × BO Dd’de AB Rh+ payı ${qText215(bloodExample215.target)}.`,
  appendSection: true as const,
  table: bloodTable,
  examples: bloodExamples215,
};

/* =====================================================================
 * Soy ağaçları: aile kalıbı hangi modeli eler?
 * ===================================================================== */

export type Model215 = "OR" | "OB" | "XR" | "XB";
export const models215: readonly Model215[] = ["OR", "OB", "XR", "XB"];
export const modelNames215: Record<Model215, string> = {
  OR: "Otozomal çekinik", OB: "Otozomal baskın", XR: "X’e bağlı çekinik", XB: "X’e bağlı baskın",
};
export type Sex215 = "E" | "K";
const isX = (m: Model215) => m === "XR" || m === "XB";
export const modelGenotypes215 = (m: Model215, sex: Sex215): readonly string[] =>
  !isX(m) ? ["AA", "Aa", "aa"] : sex === "K" ? ["XᴬXᴬ", "XᴬXᵃ", "XᵃXᵃ"] : ["XᴬY", "XᵃY"];
/** Tam ifade: çekinik modellerde özellik aleli a/Xᵃ, baskın modellerde A/Xᴬ. */
export const affected215 = (m: Model215, g: string) => {
  const [x, y] = parse215(g)[0];
  const traitAllele = m === "OR" ? "a" : m === "OB" ? "A" : m === "XR" ? "Xᵃ" : "Xᴬ";
  const recessive = m === "OR" || m === "XR";
  const copies = [x, y].filter((a) => a === traitAllele).length;
  const alleles = [x, y].filter((a) => a !== "Y").length;
  return recessive ? copies === alleles : copies > 0;
};
const childSex = (g: string): Sex215 => (g.includes("Y") ? "E" : "K");
export interface Person215 { id: string; sex: Sex215; affected: boolean; parents?: readonly [string, string] }
/** Bütün genotip atamaları denenir; fenotipler ve ebeveynden aktarım birlikte sağlanmalıdır. */
export const pedigree215 = (people: readonly Person215[], m: Model215) => {
  const options = people.map((p) => modelGenotypes215(m, p.sex).filter((g) => affected215(m, g) === p.affected));
  const valid: Record<string, string>[] = [];
  const walk = (i: number, acc: Record<string, string>) => {
    if (i === people.length) {
      const ok = people.every((p) => !p.parents || cross215(acc[p.parents[0]], acc[p.parents[1]]).some((z) => z.text === acc[p.id] && (!isX(m) || childSex(z.text) === p.sex)));
      if (ok) valid.push({ ...acc });
      return;
    }
    for (const g of options[i]) walk(i + 1, { ...acc, [people[i].id]: g });
  };
  walk(0, {});
  const genotypes = Object.fromEntries(people.map((p) => [p.id, [...new Set(valid.map((v) => v[p.id]))]]));
  return { compatible: valid.length > 0, assignments: valid.length, genotypes };
};
export interface Trio215 { father: boolean; mother: boolean; child: Sex215; childAffected: boolean }
export const trios215: readonly Trio215[] = [
  { father: false, mother: false, child: "K", childAffected: true },
  { father: false, mother: false, child: "E", childAffected: true },
  { father: true, mother: true, child: "K", childAffected: false },
  { father: true, mother: false, child: "K", childAffected: false },
  { father: true, mother: false, child: "E", childAffected: true },
  { father: false, mother: true, child: "E", childAffected: false },
  { father: false, mother: true, child: "K", childAffected: true },
  { father: false, mother: true, child: "E", childAffected: true },
];
const state = (x: boolean) => (x ? "etkilenen" : "etkilenmemiş");
export const trioLabel215 = (t: Trio215) => `Baba ${state(t.father)}, anne ${state(t.mother)}, ${t.child === "K" ? "kız" : "oğul"} ${state(t.childAffected)}`;
export const trioPeople215 = (t: Trio215): Person215[] => [
  { id: "baba", sex: "E", affected: t.father },
  { id: "anne", sex: "K", affected: t.mother },
  { id: "çocuk", sex: t.child, affected: t.childAffected, parents: ["anne", "baba"] },
];
export const trioRows215 = () => trios215.map((t) => {
  const verdicts = Object.fromEntries(models215.map((m) => [m, pedigree215(trioPeople215(t), m)])) as Record<Model215, ReturnType<typeof pedigree215>>;
  return { ...t, label: trioLabel215(t), verdicts, compatible: models215.filter((m) => verdicts[m].compatible) };
});
const tRows = trioRows215();
const findT = (pred: (t: Trio215) => boolean) => tRows.filter(pred);
// Yargılar: etkilenmemiş anne-babanın etkilenen çocuğu baskın modelleri eler.
for (const r of findT((t) => !t.father && !t.mother && t.childAffected)) guard(!r.verdicts.OB.compatible && !r.verdicts.XB.compatible && r.verdicts.OR.compatible, "boş ebeveynin dolu çocuğu baskını elemeli");
const tDaughter = findT((t) => !t.father && !t.mother && t.childAffected && t.child === "K")[0];
const tSon = findT((t) => !t.father && !t.mother && t.childAffected && t.child === "E")[0];
guard(!tDaughter.verdicts.XR.compatible && tSon.verdicts.XR.compatible, "etkilenen kız X’e bağlı çekiniği elemeli, oğul elememeli");
const tBothAffected = findT((t) => t.father && t.mother && !t.childAffected && t.child === "K")[0];
guard(tBothAffected.compatible.join() === "OB", "iki etkilenen ebeveynin etkilenmemiş kızı yalnız otozomal baskını bırakmalı");
for (const r of findT((t) => t.father && t.child === "K" && !t.childAffected)) guard(!r.verdicts.XB.compatible, "etkilenen babanın etkilenmemiş kızı X’e bağlı baskını elemeli");
for (const r of findT((t) => t.mother && t.child === "E" && !t.childAffected)) guard(!r.verdicts.XR.compatible, "etkilenen annenin etkilenmemiş oğlu X’e bağlı çekiniği elemeli");
const tFatherSon = findT((t) => t.father && !t.mother && t.child === "E" && t.childAffected)[0];
guard(tFatherSon.verdicts.XR.compatible && tFatherSon.verdicts.OR.compatible && !tFatherSon.verdicts.XB.compatible, "baba-oğul benzerliği X’e bağlı çekiniği kanıtlamamalı");
const tAll = tRows[tRows.length - 1];
guard(tAll.compatible.length === 4 && tRows.filter((r) => r.compatible.length === 4).length === 1, "yalnız son satır dört modelle uyumlu olmalı");
const trioTable = {
  layout: "table" as const,
  headers: ["Aile kalıbı", ...models215.map((m) => modelNames215[m])],
  rows: tRows.map((r) => [r.label, ...models215.map((m) => (r.verdicts[m].compatible ? "uyumlu" : "elenir"))]),
};

export const trioSection215: GuideSection = {
  title: "Sekiz aile kalıbının elediği modeller",
  figureTitle: "Sekiz aile kalıbının elediği modeller",
  paragraphs: [
    "Tablonun her satırı üç kişilik bir ailedir: baba, anne ve bir çocuk. Tek lokus, tam ifade, yeni mutasyon yokluğu ve olağan kromozom ayrılması varsayılır. Her model için kişilere bütün genotipler tek tek verilir. En az bir atama hem fenotipleri hem anne-babadan aktarımı sağlıyorsa model uyumlu, hiçbiri sağlamıyorsa elenir.",
    `Etkilenmemiş anne-babanın etkilenen çocuğu iki baskın modeli de eler. Bu çocuk kızsa X’e bağlı çekinik de elenir, çünkü XᴬY babanın kızı Xᴬ alır; oğulsa X’e bağlı çekinik uyumlu kalır. İki etkilenen ebeveynin etkilenmemiş kızı yalnız ${modelNames215[tBothAffected.compatible[0]].toLowerCase()} modeli bırakır.`,
    `Etkilenen babanın etkilenmemiş kızı X’e bağlı baskını, etkilenen annenin etkilenmemiş oğlu X’e bağlı çekiniği eler. Etkilenen baba ile etkilenen oğul X’e bağlı çekinik için kanıt değildir: ${tFatherSon.compatible.length} model uyumludur ve oğul Xᵃ’yı anneden almış olabilir. Son satırda dört model de uyumludur; uyumlu model sayısı bir olasılık değil, ailenin modelleri ayıramadığını gösterir.`,
  ],
  table: trioTable,
};

/** Örnek 1: üç kuşaklı aile. */
export const pedigreePeople215: readonly Person215[] = [
  { id: "I-1", sex: "E", affected: false },
  { id: "I-2", sex: "K", affected: false },
  { id: "II-1", sex: "E", affected: true, parents: ["I-2", "I-1"] },
  { id: "II-2", sex: "K", affected: false, parents: ["I-2", "I-1"] },
  { id: "II-3", sex: "E", affected: false },
  { id: "III-1", sex: "K", affected: true, parents: ["II-2", "II-3"] },
];
export const pedigreeExample215 = (() => {
  const results = Object.fromEntries(models215.map((m) => [m, pedigree215(pedigreePeople215, m)])) as Record<Model215, ReturnType<typeof pedigree215>>;
  return { results, compatible: models215.filter((m) => results[m].compatible) };
})();
guard(pedigreeExample215.compatible.join() === "OR" && ["I-1", "I-2", "II-2", "II-3"].every((id) => pedigreeExample215.results.OR.genotypes[id].join() === "Aa"), "soy ağacı örnek 1");
/** Örnek 2: Aa × Aa ailesinin etkilenmemiş kızı, aa eşle; çocuğun etkilenme payı. */
export const carrierExample215 = (() => {
  const unaffected = cross215("Aa", "Aa").filter((z) => !affected215("OR", z.text));
  const total = qSum215(unaffected.map(({ p }) => p));
  const weights = unaffected.map((z) => ({ text: z.text, p: qDiv215(z.p, total) }));
  const risk = qSum215(weights.map((w) => qMul215(w.p, qSum215(cross215(w.text, "aa").filter((z) => affected215("OR", z.text)).map(({ p }) => p)))));
  return { weights, risk };
})();
guard(qEq215(carrierExample215.risk, q215(1, 3)), "soy ağacı örnek 2");
const carrierAa = carrierExample215.weights.find((w) => w.text === "Aa")!.p;
const carrierAA = carrierExample215.weights.find((w) => w.text === "AA")!.p;

export const pedigreeExamples215: WorkedExample[] = [
  {
    title: "Üç kuşakta modeli kızdan ele",
    prompt: "Tek lokus, tam ifade ve mutasyon yokluğu varsayılıyor. I. kuşakta etkilenmemiş baba I-1 ile etkilenmemiş anne I-2’nin iki çocuğu var: etkilenen oğul II-1 ve etkilenmemiş kız II-2. II-2, aileye dışarıdan gelen etkilenmemiş erkek II-3 ile evleniyor ve etkilenen kızları III-1 doğuyor. Otozomal çekinik, otozomal baskın, X’e bağlı çekinik ve X’e bağlı baskın modellerinden hangileri uyumludur? Uyumlu modelde II-2 ve II-3’ün genotipi nedir?",
    strategy: "En çok bilgi veren kişiden başla: etkilenmemiş ebeveynlerin etkilenen kızı. Sonra kalan modelde genotipleri yukarı doğru yaz.",
    steps: [
      { label: "III-1", expression: "boş × boş ⇒ dolu kız", explanation: "Etkilenmemiş anne-babanın etkilenen çocuğu iki baskın modeli eler." },
      { label: "X’e bağlı çekinik", expression: "II-3 = XᴬY ⇒ III-1 en az bir Xᴬ alır", explanation: "Etkilenmemiş babanın kızı bu modelde özelliği gösteremez; model elenir." },
      { label: "Otozomal çekinik", expression: "III-1 aa ⇒ II-2 Aa, II-3 Aa", explanation: "İkisi de a vermiştir ve etkilenmedikleri için aa değildir." },
      { label: "I. kuşak", expression: "II-1 aa ⇒ I-1 Aa, I-2 Aa", explanation: "Etkilenen oğul iki ebeveynden de a almıştır." },
    ],
    answer: `Yalnız ${modelNames215[pedigreeExample215.compatible[0]].toLowerCase()} model uyumludur; II-2 ve II-3 Aa’dır (I-1 ve I-2 de Aa).`,
    check: "Aa × Aa her iki kuşakta da aa çocuk verebilir. II-2 veya II-3 AA olsaydı III-1 aa olamazdı.",
    pitfall: "Etkilenen oğul II-1’e bakıp X’e bağlı çekinik modeli seçmek. III-1 kızın etkilenmemiş babası bu modeli eler.",
  },
  {
    title: "Etkilenmemiş kardeşin çocuğu",
    prompt: "Otozomal çekinik modelde Aa × Aa anne-babanın etkilenmemiş bir kızı (II-2) var. II-2, özelliği gösteren aa bir erkekle evleniyor. Bu çiftin ilk çocuğunun özelliği gösterme olasılığı kaçtır?",
    strategy: "II-2’nin etkilenmemiş olduğu bilgisi örnek uzayını daraltır. Her olası genotipin payını çocuğun etkilenme olasılığıyla çarpıp topla.",
    steps: [
      { label: "II-2’nin genotipi", expression: `AA ${qText215(carrierAA)}, Aa ${qText215(carrierAa)}`, explanation: "Aa × Aa’da etkilenmemiş yollar AA, Aa, Aa; aa yolu koşulla dışarıda kalır." },
      { label: "Eşle çaprazlama", expression: "AA × aa ⇒ 0; Aa × aa ⇒ 1/2", explanation: "Etkilenen çocuk için iki ebeveynden de a gerekir." },
      { label: "Topla", expression: `${qText215(carrierAA)} · 0 + ${qText215(carrierAa)} · 1/2 = ${qText215(carrierExample215.risk)}`, explanation: "Birbirini dışlayan iki genotip yolu toplanır." },
    ],
    answer: `İlk çocuğun özelliği gösterme olasılığı ${qText215(carrierExample215.risk)}.`,
    check: "Altı eş yol düşün: II-2’nin üç eş genotip yolundan ikisi Aa’dır ve her biri 1/2 ile aa çocuk verir: (2 · 1/2)/3 = 1/3.",
    pitfall: "II-2’yi kesin Aa alıp 1/2 bulmak ya da koşulu kullanmadan Aa payını 1/2 almak.",
  },
];

export const trioSupplement215 = {
  title: trioSection215.title,
  figureTitle: trioSection215.title,
  paragraphs: trioSection215.paragraphs,
  summary: "Boş anne-babanın dolu çocuğu baskın modelleri, dolu kızı X’e bağlı çekiniği de eler. İki dolu ebeveynin boş kızı yalnız otozomal baskın bırakır. Dolu babanın boş kızı X’e bağlı baskını, dolu annenin boş oğlu X’e bağlı çekiniği eler. Uyumlu model kanıt değildir.",
  appendSection: true as const,
  table: trioTable,
  examples: pedigreeExamples215,
};

/* =====================================================================
 * Eşeyin belirlenmesi: X’e bağlı çekinik özellikte altı eşleşme
 * ===================================================================== */

export const xMatings215: readonly (readonly [string, string])[] = [
  ["XᴬXᴬ", "XᴬY"], ["XᴬXᴬ", "XᵃY"], ["XᴬXᵃ", "XᴬY"], ["XᴬXᵃ", "XᵃY"], ["XᵃXᵃ", "XᴬY"], ["XᵃXᵃ", "XᵃY"],
];
const xAffected = (g: string) => affected215("XR", g);
export const xRows215 = () => xMatings215.map(([mother, father]) => {
  const zygotes = cross215(mother, father);
  const daughters = zygotes.filter((z) => childSex(z.text) === "K");
  const sons = zygotes.filter((z) => childSex(z.text) === "E");
  const share = (list: Zygote215[]) => qSum215(list.map(({ p }) => p));
  const within = (list: Zygote215[]) => list.map((z) => ({ text: z.text, p: qDiv215(z.p, share(list)) }));
  return {
    mother, father, zygotes,
    daughters: within(daughters),
    sons: within(sons),
    affected: share(zygotes.filter((z) => xAffected(z.text))),
    carrierDaughter: share(daughters.filter((z) => z.text === "XᴬXᵃ")),
    affectedDaughters: qSum215(within(daughters).filter((z) => xAffected(z.text)).map(({ p }) => p)),
    affectedSons: qSum215(within(sons).filter((z) => xAffected(z.text)).map(({ p }) => p)),
  };
});
const xRows = xRows215();
const distText = (list: readonly { text: string; p: Q215 }[]) => (list.length === 1 ? `hepsi ${list[0].text}` : list.map(({ text, p }) => `${qText215(p)} ${text}`).join(", "));
// Yargı: oğulların dağılımı yalnız anneye bağlıdır.
for (const r of xRows) for (const s of xRows.filter((x) => x.mother === r.mother)) guard(distText(r.sons) === distText(s.sons), "oğul dağılımı babaya bağlı olmamalı");
for (const r of xRows) {
  const mg = gametes215(parse215(r.mother));
  guard(r.sons.length === mg.length && mg.every((g) => r.sons.some((s) => s.text === `${g.text}Y` && qEq215(s.p, g.p))), "oğul dağılımı annenin gametleri olmalı");
  guard(r.father === "XᴬY" ? qEq215(r.affectedDaughters, ZERO) : r.daughters.every((d) => d.text.includes("Xᵃ")), "kızda özellik yalnız XᵃY babayla; XᵃY babanın kızları Xᵃ taşımalı");
}
const xFind = (m: string, f: string) => xRows.find((r) => r.mother === m && r.father === f)!;
const xCarrierNormal = xFind("XᴬXᴬ", "XᵃY");
const xHalf = xFind("XᴬXᵃ", "XᵃY");
const xAllSons = xFind("XᵃXᵃ", "XᴬY");
guard(xCarrierNormal.daughters.length === 1 && xCarrierNormal.daughters[0].text === "XᴬXᵃ", "XᴬXᴬ × XᵃY kızları taşıyıcı olmalı");
guard(qEq215(xFind("XᴬXᵃ", "XᴬY").affectedSons, q215(1, 2)) && qEq215(xAllSons.affectedSons, ONE), "taşıyıcı anne oğulların yarısında, XᵃXᵃ anne hepsinde");
const xTable = {
  layout: "table" as const,
  headers: ["Anne × baba", "Kızlar", "Oğullar", "Özelliği gösteren (tüm çocuklar)", "Taşıyıcı kız (tüm çocuklar)"],
  rows: xRows.map((r) => [crossText215(r.mother, r.father), distText(r.daughters), distText(r.sons), qText215(r.affected), qText215(r.carrierDaughter)]),
};

export const xSection215: GuideSection = {
  title: "X’e bağlı çekinik özellikte altı eşleşmenin sonucu",
  figureTitle: "X’e bağlı çekinik özellikte altı eşleşmenin sonucu",
  paragraphs: [
    "Tabloda X’e bağlı çekinik basit model kullanılır: Xᴬ normal işlevli, Xᵃ çekinik özellik alelidir; Y bu lokusta alel taşımaz. Anne üç, baba iki genotipte olabildiği için altı eşleşme vardır. Kızlar ve oğullar sütunları yalnız o cinsiyetteki çocukları payda alır; son iki sütun bütün çocukları payda alır.",
    `Oğullar sütunu babaya bağlı değildir: anne genotipi aynı olan iki satırda oğul dağılımı aynıdır, çünkü oğul X’ini anneden, Y’yi babadan alır. XᴬXᵃ anne oğulların ${qText215(xFind("XᴬXᵃ", "XᴬY").affectedSons)}’sinde özelliği gösterir; XᵃXᵃ annenin oğullarının hepsi XᵃY olur.`,
    `Özelliği gösteren kız yalnız baba XᵃY iken görülür. XᵃY babanın bütün kızları en az bir Xᵃ taşır: anne XᴬXᴬ ise kızların hepsi XᴬXᵃ taşıyıcıdır. ${crossText215(xHalf.mother, xHalf.father)} satırında kızların ${qText215(xHalf.affectedDaughters)}’si, oğulların ${qText215(xHalf.affectedSons)}’si özelliği gösterir; tüm çocuklarda bu pay ${qText215(xHalf.affected)} olur.`,
  ],
  table: xTable,
};

/** Örnek 1: babası renk körü olan, renk körü olmayan kadın × renk körü erkek. */
export const colourExample215 = (() => {
  // Kadın renk körü değildir ve XᵃY babasından Xᵃ almıştır; annesinin genotipi bilinmez.
  const fromFather = modelGenotypes215("XR", "K").filter((g) => !xAffected(g) && parse215(g)[0].includes("Xᵃ"));
  guard(fromFather.length === 1, "babası renk körü olan kadın tek genotipli olmalı");
  const row = xRows.find((r) => r.mother === fromFather[0] && r.father === "XᵃY")!;
  const affectedDaughterAll = qSum215(row.zygotes.filter((z) => childSex(z.text) === "K" && xAffected(z.text)).map(({ p }) => p));
  return { woman: fromFather[0], daughters: row.affectedDaughters, all: affectedDaughterAll };
})();
/** Örnek 2: BbXᴬXᵃ × bbXᴬY, hem bb hem özelliği gösteren oğul. */
export const twoLocusXExample215 = (() => {
  const z = cross215("BbXᴬXᵃ", "bbXᴬY");
  const target = z.filter((x) => x.text.startsWith("bb") && x.text.endsWith("XᵃY"));
  const all = qSum215(target.map(({ p }) => p));
  const sons = qSum215(z.filter((x) => x.text.endsWith("Y")).map(({ p }) => p));
  return { all, amongSons: qDiv215(all, sons) };
})();
guard(colourExample215.woman === "XᴬXᵃ" && qEq215(colourExample215.daughters, q215(1, 2)) && qEq215(colourExample215.all, q215(1, 4)), "eşey örnek 1");
guard(qEq215(twoLocusXExample215.all, q215(1, 8)) && qEq215(twoLocusXExample215.amongSons, q215(1, 4)), "eşey örnek 2");

export const xExamples215: WorkedExample[] = [
  {
    title: "Babasından gelen X’i kızlarda izle",
    prompt: "Bu soruda kırmızı-yeşil renk körlüğünün X’e bağlı çekinik kalıtıldığını kabul et: Xᴬ normal görme, Xᵃ renk körlüğü aleli. Renk körü olmayan bir kadının babası renk körüdür. Bu kadın renk körü bir erkekle evleniyor. Kızlarının kaçta kaçı renk körü olur? Bütün çocukların kaçta kaçı renk körü kızdır?",
    strategy: "Kadının genotipini babasından aldığı X ile kur. Sonra kızlar ve bütün çocuklar için iki ayrı payda kullan.",
    steps: [
      { label: "Kadın", expression: `${colourExample215.woman}`, explanation: "Babası XᵃY olduğu için ondan Xᵃ almıştır; renk körü olmadığı için diğer X’i Xᴬ’dır." },
      { label: "Çaprazlama", expression: "XᴬXᵃ × XᵃY ⇒ XᴬXᵃ, XᵃXᵃ, XᴬY, XᵃY", explanation: "Dört eş olasılıklı birleşme." },
      { label: "Kızlar arasında", expression: `XᵃXᵃ: ${qText215(colourExample215.daughters)}`, explanation: "Payda yalnız iki kız yoludur." },
      { label: "Tüm çocuklarda", expression: `renk körü kız: ${qText215(colourExample215.all)}`, explanation: "Payda dört yolun hepsidir." },
    ],
    answer: `Kızların ${qText215(colourExample215.daughters)}’si renk körüdür; bütün çocukların ${qText215(colourExample215.all)}’ü renk körü kızdır.`,
    check: "Her kız babadan Xᵃ alır; anneden Xᵃ alma olasılığı 1/2’dir. Kızlar bütün çocukların yarısı olduğundan 1/2 · 1/2 = 1/4.",
    pitfall: "Kızların renk körü olamayacağını düşünmek. Baba XᵃY ve anne taşıyıcıysa XᵃXᵃ kız oluşabilir.",
  },
  {
    title: "Otozomal ve X’e bağlı lokus birlikte",
    prompt: "Bir otozomal lokusta b aleli çekinik bir özellik verir (B baskın). Ayrıca X’e bağlı çekinik hemofili modeli kullanılır: Xᴬ normal, Xᵃ hemofili aleli. İki lokus bağımsızdır. BbXᴬXᵃ anne ile bbXᴬY babanın bir çocuğunun hem bb hem hemofili olan oğul olma olasılığı kaçtır? Oğullar arasında bu pay kaçtır?",
    strategy: "Lokusları ayrı çöz. ‘Tüm çocuklar’ ve ‘oğullar arasında’ sorularında X lokusunun paydası değişir.",
    steps: [
      { label: "Otozomal", expression: "Bb × bb ⇒ bb = 1/2", explanation: "Bu lokus çocuğun cinsiyetinden bağımsızdır." },
      { label: "X lokusu, tüm çocuklar", expression: "XᴬXᵃ × XᴬY ⇒ XᵃY = 1/4", explanation: "Dört yoldan biri hemofili oğuldur." },
      { label: "Tüm çocuklar", expression: `1/2 · 1/4 = ${qText215(twoLocusXExample215.all)}`, explanation: "Bağımsız lokuslar çarpılır." },
      { label: "Oğullar arasında", expression: `1/2 · 1/2 = ${qText215(twoLocusXExample215.amongSons)}`, explanation: "Oğullarda XᵃY payı 1/2’dir." },
    ],
    answer: `Tüm çocuklarda ${qText215(twoLocusXExample215.all)}; oğullar arasında ${qText215(twoLocusXExample215.amongSons)}.`,
    check: "16 kutuluk karede bbXᵃY kutuları 2 tanedir: 2/16 = 1/8. Oğul kutuları 8 tanedir: 2/8 = 1/4.",
    pitfall: "Oğul koşulunu iki kez kullanmak, örneğin 1/2 · 1/4 · 1/2 yazmak. XᵃY payı zaten oğul olmayı içerir.",
  },
];

export const xSupplement215 = {
  title: xSection215.title,
  figureTitle: xSection215.title,
  paragraphs: xSection215.paragraphs,
  summary: `Oğul X’ini anneden alır: oğul dağılımı babaya bağlı değildir. Özelliği gösteren kız için baba XᵃY olmalıdır. XᴬXᴬ × XᵃY: kızların hepsi taşıyıcı. XᴬXᵃ × XᴬY: oğulların ${qText215(xFind("XᴬXᵃ", "XᴬY").affectedSons)}’si, tüm çocukların ${qText215(xFind("XᴬXᵃ", "XᴬY").affected)}’ü özelliği gösterir.`,
  appendSection: true as const,
  table: xTable,
  examples: xExamples215,
};

/** Bu altı dersin daha önce eki yoktur. */
export const depth215Supplements = {
  "kalitima-giris": [gameteSupplement215],
  "mendel-genetigi": [mendelSupplement215],
  "mendelden-sapmalar": [deviationSupplement215],
  "kan-gruplari": [bloodSupplement215],
  "soy-agaclari": [trioSupplement215],
  "eseyin-belirlenmesi": [xSupplement215],
};
