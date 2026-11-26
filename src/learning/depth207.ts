import type { GuideSection, WorkedExample } from "./guides/types";
import { radical203, radicalText203 } from "./geometryDepth203";

/*
 * TYT Matematik ve Geometri derinleştirmesi (0.207.0). Kabul edilmiş
 * rehberler değişmez; her derse görüntüleme katmanında bir tablo bölümü, iki
 * özgün çözümlü örnek ve bir bölüm çizimi eklenir. Paragraflardaki sayılar,
 * tablo satırları, çizim etiketleri ve Kopya Kâğıdı özetleri aynı veri
 * fonksiyonlarından üretilir; genel iddialar modül yüklenirken denetlenir.
 */

const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
const minus = (s: string) => s.replaceAll("-", "−");
const range = (from: number, to: number) => Array.from({ length: Math.max(0, to - from + 1) }, (_, i) => from + i);
const fail = (message: string): never => { throw new Error(message); };

/* ---------- Kesir yardımcıları (tam sayılarla kesin hesap) ---------- */

export interface Frac207 { n: number; d: number }
export const frac207 = (n: number, d = 1): Frac207 => {
  if (d === 0) fail("Payda sıfır olamaz");
  const sign = d < 0 ? -1 : 1;
  const g = gcd(n, d) || 1;
  return { n: (sign * n) / g, d: Math.abs(d) / g };
};
const fSub = (x: Frac207, y: Frac207) => frac207(x.n * y.d - y.n * x.d, x.d * y.d);
const fDiv = (x: Frac207, y: Frac207) => frac207(x.n * y.d, x.d * y.n);
export const fracValue207 = ({ n, d }: Frac207) => n / d;
/** 7/3, 5, −1/2 */
export const fracText207 = ({ n, d }: Frac207) => minus(d === 1 ? String(n) : `${n}/${d}`);
const numText = (x: number) => minus(String(x));
const listText = (xs: readonly number[]) => xs.map(numText).join(", ");

/* ========== Üçgen eşitsizliği: üçüncü kenarın her tam sayı değeri ========== */

export type AngleKind207 = "dar" | "dik" | "geniş";
/** Üç uzunluk üçgen kurmuyorsa undefined; kuruyorsa en büyük açının türü. */
export const triangleKind207 = (x: number, y: number, z: number): AngleKind207 | undefined => {
  const [p, q, r] = [x, y, z].sort((s, t) => s - t);
  if (p <= 0 || p + q <= r) return undefined;
  const sum = p * p + q * q;
  return r * r < sum ? "dar" : r * r === sum ? "dik" : "geniş";
};
export const thirdSidePairs207: readonly (readonly [number, number])[] = [[3, 4], [3, 5], [4, 7], [5, 5], [5, 12]];
export const thirdSideRows207 = (pairs = thirdSidePairs207) => pairs.map(([a, b]) => {
  const lo = Math.abs(a - b);
  const hi = a + b;
  const values = range(lo + 1, hi - 1);
  const kinds = values.map((c) => ({ c, kind: triangleKind207(a, b, c) ?? fail(`${a}, ${b}, ${c} üçgen değil`) }));
  const of = (kind: AngleKind207) => kinds.filter((k) => k.kind === kind).map(({ c }) => c);
  return { a, b, lo, hi, values, kinds, acute: of("dar"), right: of("dik"), obtuse: of("geniş") };
});
const isSquare = (n: number) => n > 0 && Number.isInteger(Math.sqrt(n));
const thirdRows = thirdSideRows207();
for (const row of thirdRows) {
  // Paragraf: dar değerler tek ardışık blok; geniş değerler bloğun iki yanında; dik değer aradaki sınırda.
  const pattern = row.kinds.map(({ kind }) => (kind === "dar" ? "a" : kind === "dik" ? "r" : "o")).join("");
  if (!/^o*r?a+r?o*$/.test(pattern)) fail(`${row.a}–${row.b} satırında tür sırası beklenen düzende değil`);
  // Paragraf: dik açılı tam sayı c ancak a²+b² veya |a²−b²| tam kareyse çıkar.
  const expectedRight = [row.a * row.a + row.b * row.b, Math.abs(row.a * row.a - row.b * row.b)].filter(isSquare).map(Math.sqrt).filter((c) => c > row.lo && c < row.hi).sort((x, y) => x - y);
  if (JSON.stringify(expectedRight) !== JSON.stringify(row.right)) fail(`${row.a}–${row.b} satırında dik değer kuralı bozuldu`);
  // Paragraf: küçük c’de geniş açı bilinen uzun kenarın, büyük c’de c’nin karşısındadır.
  for (const c of row.obtuse) {
    const longest = Math.max(row.a, row.b, c);
    if (c < row.acute[0] ? longest === c : longest !== c) fail(`${row.a}–${row.b}–${c} geniş açısı beklenen kenarın karşısında değil`);
  }
}
const kindList = (xs: readonly number[]) => (xs.length ? listText(xs) : "Yok");
const thirdTable = {
  layout: "table" as const,
  headers: ["Bilinen kenarlar", "c aralığı", "Tam sayı c (adet)", "Dar açılı", "Dik açılı", "Geniş açılı"],
  rows: thirdRows.map(({ a, b, lo, hi, values, acute, right, obtuse }) => [
    `${a} ve ${b}`, `${lo} < c < ${hi}`, `${values[0]}–${values.at(-1)} (${values.length})`, kindList(acute), kindList(right), kindList(obtuse),
  ]),
};
const [t34, t35, , t55, t512] = thirdRows;
/** Bir satırdaki c değeri için en büyük kenar karşılaştırması: "4² = 16 > 2² + 3² = 13". */
export const kindComparison207 = (a: number, b: number, c: number) => {
  const [p, q, r] = [a, b, c].sort((s, t) => s - t);
  const sum = p * p + q * q;
  const rel = r * r < sum ? "<" : r * r === sum ? "=" : ">";
  return { p, q, r, sum, rel, text: `${r}² = ${r * r} ${rel} ${p}² + ${q}² = ${sum}` };
};
const lowObtuse = t34.obtuse.filter((c) => c < t34.acute[0]);
const highObtuse = t34.obtuse.filter((c) => c > t34.acute.at(-1)!);
if (!lowObtuse.length || !highObtuse.length || t34.right.length !== 1) fail("3–4 satırı iki uçta geniş ve bir dik değer ister");
if (t55.right.length || t55.obtuse.some((c) => c < t55.acute[0])) fail("5–5 satırında alt uçta geniş değer olmamalı");
if (t35.right[0] >= t35.b || t512.right[0] <= t512.b) fail("3–5 dik kenarı, 5–12 hipotenüsü örneklemeli");

export const thirdSideSection207: GuideSection = {
  title: "İki kenar sabitken üçüncü kenarın her tam sayı değerini sınıflandır",
  paragraphs: [
    `İki kenar a ve b, üçüncü kenar c olsun. Her satırda önce |a − b| < c < a + b aralığındaki tam sayılar yazılır, sonra her c için üç uzunluk küçükten büyüğe sıralanır ve en uzun kenarın karesi diğer iki karenin toplamıyla karşılaştırılır. İlk satırda ${t34.a} ve ${t34.b} için ${t34.lo} < c < ${t34.hi} olur; ${t34.values.length} tam sayı vardır. c = ${lowObtuse[0]} iken en uzun kenar c değil ${kindComparison207(t34.a, t34.b, lowObtuse[0]).r} olur: ${kindComparison207(t34.a, t34.b, lowObtuse[0]).text}, yani üçgen geniş açılıdır. c = ${t34.right[0]} dik, c = ${highObtuse[0]} yine geniş açılı üçgen verir.`,
    `Her satırda dar açılı değerler tek bir ardışık blok oluşturur; geniş açılı değerler bu bloğun iki yanında kalır, dik açılı değer varsa blokla geniş değerlerin arasındaki sınırdadır. c küçükken geniş açı bilinen uzun kenarın karşısında, c büyükken c’nin karşısında oluşur. Dik açılı tam sayı c ancak a² + b² ya da büyük karenin küçük kareden farkı tam kare olduğunda çıkar: ${t35.a} ve ${t35.b} satırında c = ${t35.right[0]} bir dik kenardır, ${t512.a} ve ${t512.b} satırında c = ${t512.right[0]} hipotenüstür. ${t55.a} ve ${t55.b} satırında ${t55.a * t55.a + t55.b * t55.b} tam kare olmadığı için dik değer yoktur.`,
  ],
  table: thirdTable,
};

export const thirdSideExamples207: WorkedExample[] = [
  {
    title: "Dar açılı olma koşulu iki yönden sınır koyar",
    prompt: "Bir üçgenin iki kenarı 6 cm ve 10 cm, üçüncü kenarı x cm’dir. Üçgen dar açılıdır (üç açısı da 90°’den küçüktür) ve x bir tam sayıdır. x hangi değerleri alabilir?",
    strategy: "Önce üçgen eşitsizliğiyle x’in aralığını bul. Sonra en uzun kenarın hangisi olduğuna göre iki durumu ayrı ayrı incele: x ≤ 10 ve x ≥ 10.",
    steps: [
      { label: "Üçgen var mı?", expression: "10 − 6 < x < 10 + 6 ⇒ 4 < x < 16", explanation: "Bu aralığın dışında üç uzunluk kapanan bir üçgen kurmaz." },
      { label: "En uzun kenar 10", expression: "x ≤ 10 iken 10² < 6² + x² ⇒ x² > 64 ⇒ x > 8", explanation: "En büyük açı 10 cm’lik kenarın karşısındadır; dar olması için bu eşitsizlik gerekir." },
      { label: "En uzun kenar x", expression: "x ≥ 10 iken x² < 6² + 10² = 136 ⇒ x ≤ 11", explanation: "11² = 121 < 136, 12² = 144 > 136 olduğundan tam sayı olarak en çok 11." },
      { label: "Birleştir", expression: "x ∈ {9, 10, 11}", explanation: "İki durumdan gelen tam sayılar 9, 10 ve 11’dir; hepsi 4 < x < 16 aralığındadır." },
    ],
    answer: "x = 9, 10 veya 11; üç değer.",
    check: "x = 8 için 10² = 6² + 8² olduğundan üçgen diktir; x = 12 için 12² = 144 > 136 olduğundan geniş açılıdır. Sınırın iki yanı da dar açıyı bozar.",
    pitfall: "Yalnız x² < 6² + 10² koşulunu yazıp 5’ten 11’e kadar bütün değerleri almak. x küçükken en uzun kenar 10 olur ve geniş açı onun karşısında oluşabilir.",
  },
  {
    title: "İkizkenar üçgende hangi kenar tekrar eder?",
    prompt: "Bir ikizkenar üçgenin (en az iki kenarı eş üçgen) iki kenar uzunluğu 4 cm ve 9 cm olarak veriliyor. Üçgenin çevresi kaç cm’dir ve üçgen dar, dik ya da geniş açılı mıdır?",
    strategy: "Üçüncü kenar ya 4 ya 9 olabilir. Her aday için en uzun kenarın diğer ikisinin toplamından küçük olup olmadığına bak.",
    steps: [
      { label: "Aday 1", expression: "4, 4, 9: 4 + 4 = 8 < 9", explanation: "İki kısa kenar uzun kenara yetişmez; üçgen kurulmaz." },
      { label: "Aday 2", expression: "4, 9, 9: 4 + 9 = 13 > 9", explanation: "En uzun kenar 9, diğer ikisinin toplamı 13; üçgen kurulur." },
      { label: "Çevre", expression: "4 + 9 + 9 = 22", explanation: "Geçerli tek üçgenin üç kenarı toplanır." },
      { label: "Açı türü", expression: "9² = 81 < 4² + 9² = 97", explanation: "En uzun kenarın karesi diğer iki karenin toplamından küçük; en büyük açı dar, üçgen dar açılıdır." },
    ],
    answer: "Çevre 22 cm; üçgen dar açılıdır.",
    check: "4 cm’lik tabana inen yükseklik √(81 − 4) = √77 ≈ 8,77 cm; alan 4 · √77 / 2 ≈ 17,55 cm². Pozitif yükseklik üçgenin gerçekten kurulduğunu doğrular.",
    pitfall: "İkizkenar denince eş kenarı otomatik olarak verilen ilk sayı (4) sanmak. Her iki adayı üçgen eşitsizliğiyle sınamadan çevre yazılmaz.",
  },
];

export const thirdSideSupplement207 = {
  title: thirdSideSection207.title,
  figureTitle: thirdSideSection207.title,
  paragraphs: thirdSideSection207.paragraphs,
  summary: `|a − b| < c < a + b; her c için en uzun kenarın karesini diğer iki karenin toplamıyla karşılaştır. ${t34.a} ve ${t34.b}: c = ${listText(t34.values)}; dar ${kindList(t34.acute)}, dik ${kindList(t34.right)}, geniş ${kindList(t34.obtuse)}. Geniş açı küçük c’de bilinen uzun kenarın, büyük c’de c’nin karşısındadır.`,
  appendSection: true as const,
  table: thirdTable,
  examples: thirdSideExamples207,
};

/* ========== Dörtgen hiyerarşisi: hangi koşul hangi sınıfı kesinleştirir? ========== */

export type Point207 = readonly [number, number];
export type Quad207 = readonly [Point207, Point207, Point207, Point207];
type Vec = readonly [number, number];
const vsub = (p: Point207, q: Point207): Vec => [p[0] - q[0], p[1] - q[1]];
const vdot = (p: Vec, q: Vec) => p[0] * q[0] + p[1] * q[1];
const vcross = (p: Vec, q: Vec) => p[0] * q[1] - p[1] * q[0];
const vlen2 = (p: Vec) => vdot(p, p);
const parallel = (p: Vec, q: Vec) => vcross(p, q) === 0;

export const quadConditionTests207 = {
  bisect: { label: "birbirini ortalar", holds: ([A, B, C, D]: Quad207) => A[0] + C[0] === B[0] + D[0] && A[1] + C[1] === B[1] + D[1] },
  equalDiagonals: { label: "eş", holds: ([A, B, C, D]: Quad207) => vlen2(vsub(C, A)) === vlen2(vsub(D, B)) },
  perpendicularDiagonals: { label: "dik", holds: ([A, B, C, D]: Quad207) => vdot(vsub(C, A), vsub(D, B)) === 0 },
  parallelAndOtherEqual: { label: "AB ∥ DC ve AD = BC", diagonal: false, holds: ([A, B, C, D]: Quad207) => parallel(vsub(B, A), vsub(C, D)) && vlen2(vsub(D, A)) === vlen2(vsub(C, B)) },
} as const;
export type QuadCondition207 = keyof typeof quadConditionTests207;

const sideLengths = ([A, B, C, D]: Quad207) => [vsub(B, A), vsub(C, B), vsub(D, C), vsub(A, D)].map(vlen2);
const isParallelogram = ([A, B, C, D]: Quad207) => parallel(vsub(B, A), vsub(C, D)) && parallel(vsub(D, A), vsub(C, B));
const allRight = ([A, B, C, D]: Quad207) => [[D, A, B], [A, B, C], [B, C, D], [C, D, A]].every(([P, Q, R]) => vdot(vsub(P, Q), vsub(R, Q)) === 0);
/** Kapsayıcı tanımlar: her kare dikdörtgendir, her paralelkenar yamuktur. */
export const quadClassTests207 = {
  "Yamuk": ([A, B, C, D]: Quad207) => parallel(vsub(B, A), vsub(C, D)) || parallel(vsub(D, A), vsub(C, B)),
  "Paralelkenar": isParallelogram,
  "Dikdörtgen": (q: Quad207) => isParallelogram(q) && allRight(q),
  "Eşkenar dörtgen": (q: Quad207) => new Set(sideLengths(q)).size === 1,
  "Kare": (q: Quad207) => allRight(q) && new Set(sideLengths(q)).size === 1,
  "Deltoid": (q: Quad207) => {
    const [ab, bc, cd, da] = sideLengths(q);
    return (ab === da && bc === cd) || (ab === bc && cd === da);
  },
} as const;
export type QuadClass207 = keyof typeof quadClassTests207;
/** Bir dışbükey dörtgenin en özel adı. */
export const quadName207 = (q: Quad207): string => {
  const is = (name: QuadClass207) => quadClassTests207[name](q);
  if (is("Kare")) return "Kare";
  if (is("Dikdörtgen")) return "Dikdörtgen";
  if (is("Eşkenar dörtgen")) return "Eşkenar dörtgen";
  if (is("Paralelkenar")) return "Paralelkenar";
  if (is("Yamuk")) {
    const [A, B, C, D] = q;
    const legsEqual = parallel(vsub(B, A), vsub(C, D)) ? vlen2(vsub(D, A)) === vlen2(vsub(C, B)) : vlen2(vsub(B, A)) === vlen2(vsub(C, D));
    return legsEqual ? "İkizkenar yamuk" : "Yamuk";
  }
  return is("Deltoid") ? "Deltoid" : "Dörtgen";
};
export const isConvexQuad207 = (q: Quad207) => {
  const turns = q.map((p, i) => vcross(vsub(q[(i + 1) % 4], p), vsub(q[(i + 2) % 4], q[(i + 1) % 4])));
  return turns.every((t) => t > 0) || turns.every((t) => t < 0);
};

export interface SufficiencySpec207 { conditions: readonly QuadCondition207[]; target: QuadClass207; sufficient: boolean; example: Quad207 }
export const sufficiencySpecs207: readonly SufficiencySpec207[] = [
  { conditions: ["bisect"], target: "Paralelkenar", sufficient: true, example: [[0, 0], [6, 0], [8, 3], [2, 3]] },
  { conditions: ["parallelAndOtherEqual"], target: "Paralelkenar", sufficient: false, example: [[0, 0], [6, 0], [4, 2], [2, 2]] },
  { conditions: ["equalDiagonals"], target: "Dikdörtgen", sufficient: false, example: [[0, 0], [8, 0], [5, 3], [3, 3]] },
  { conditions: ["equalDiagonals", "bisect"], target: "Dikdörtgen", sufficient: true, example: [[0, 0], [6, 0], [6, 3], [0, 3]] },
  { conditions: ["perpendicularDiagonals"], target: "Eşkenar dörtgen", sufficient: false, example: [[0, 0], [3, -2], [7, 0], [3, 2]] },
  { conditions: ["perpendicularDiagonals", "bisect"], target: "Eşkenar dörtgen", sufficient: true, example: [[0, 0], [5, 0], [8, 4], [3, 4]] },
  { conditions: ["equalDiagonals", "perpendicularDiagonals"], target: "Kare", sufficient: false, example: [[0, 2], [1, 0], [4, 2], [1, 4]] },
  { conditions: ["equalDiagonals", "perpendicularDiagonals", "bisect"], target: "Kare", sufficient: true, example: [[0, 0], [4, 0], [4, 4], [0, 4]] },
];
/** "a, b ve c" */
const joinTr = (xs: readonly string[]) => (xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} ve ${xs.at(-1)}`);
const capital = (s: string) => s.charAt(0).toLocaleUpperCase("tr") + s.slice(1);
/** Köşegen koşulları tek cümlede: "Köşegenler eş ve birbirini ortalar". */
export const conditionText207 = (keys: readonly QuadCondition207[]) => {
  const diagonal = keys.filter((key) => !("diagonal" in quadConditionTests207[key]));
  const other = keys.filter((key) => "diagonal" in quadConditionTests207[key]).map((key) => quadConditionTests207[key].label);
  const order: QuadCondition207[] = ["equalDiagonals", "perpendicularDiagonals", "bisect"];
  const words = order.filter((key) => diagonal.includes(key)).map((key) => quadConditionTests207[key].label);
  return [...other, ...(words.length ? [`Köşegenler ${joinTr(words)}`] : [])].join("; ");
};
const cornerText = (q: Quad207) => q.map(([x, y], i) => `${"ABCD"[i]}(${numText(x)}; ${numText(y)})`).join(", ");
export const sufficiencyRows207 = (specs = sufficiencySpecs207) => specs.map((spec) => {
  const { conditions, target, sufficient, example } = spec;
  const [A, B, C, D] = example;
  if (!isConvexQuad207(example)) fail(`${cornerText(example)} dışbükey değil`);
  if (!conditions.every((key) => quadConditionTests207[key].holds(example))) fail(`${cornerText(example)} koşulu sağlamıyor`);
  // Yeterli satırda örnek hedef sınıftadır; yetmeyen satırda örnek bir karşı örnektir.
  if (quadClassTests207[target](example) !== sufficient) fail(`${target} satırındaki örnek yeterlilik iddiasıyla uyuşmuyor`);
  return {
    ...spec,
    conditionText: conditionText207(conditions),
    name: quadName207(example),
    corners: cornerText(example),
    diagonals: [radical203(1, vlen2(vsub(C, A))), radical203(1, vlen2(vsub(D, B)))].map(radicalText203),
  };
});
const suffRows = sufficiencyRows207();
const suffTable = {
  layout: "table" as const,
  headers: ["Verilen koşul", "Hedef sınıf", "Yeterli mi?", "Örnek ABCD", "Örneğin en özel adı"],
  rows: suffRows.map(({ conditionText, target, sufficient, corners, name }) => [conditionText, target, sufficient ? "Evet" : "Hayır", corners, name]),
};
// Paragraf: dikdörtgen, eşkenar dörtgen ve kare için yetmeyen koşula "ortalar" eklenince yeterli olur.
const bisectFixes = suffRows.filter(({ target, sufficient }) => !sufficient && target !== "Paralelkenar").map((row) => {
  const fixed = suffRows.find((other) => other.target === row.target && other.sufficient);
  const wanted = [...row.conditions, "bisect"].sort().join();
  if (!fixed || [...fixed.conditions].sort().join() !== wanted) fail(`${row.target} için "ortalar" eklemesi yeterli satırı vermiyor`);
  return row.target;
});
const [sBisect, sParEq, sEqDiag, , sPerp, , sEqPerp] = suffRows;
if (sParEq.name !== "İkizkenar yamuk" || sEqDiag.name !== "İkizkenar yamuk" || sPerp.name !== "Deltoid" || sEqPerp.name !== "Deltoid") fail("Karşı örneklerin adları paragrafla uyuşmuyor");
const lower = (s: string) => s.toLocaleLowerCase("tr");

export const sufficiencySection207: GuideSection = {
  title: "Hangi koşul hangi dörtgeni kesinleştirir?",
  paragraphs: [
    `Bir koşulun bir sınıf için yeterli olması, o koşulu sağlayan her dışbükey dörtgenin o sınıfa girmesi demektir. Yeterli değilse koşulu sağlayıp sınıfa girmeyen tek bir karşı örnek bunu kanıtlar. Tablodaki her örnek koordinatla kuruldu ve vektörlerle denetlendi: orta noktaların aynılığı ortalamayı, uzunluk kareleri eşliği, skaler çarpımın sıfır olması dikliği gösterir. Örneğin ${sBisect.corners} köşelerinde iki köşegenin orta noktası aynıdır ve şekil ${lower(sBisect.name)} olur.`,
    `${sParEq.conditionText} koşulu paralelkenar için yetmez: ${sParEq.corners} bir ${lower(sParEq.name)}tur. Köşegenlerin eş olması da dikdörtgen için yetmez, çünkü ikizkenar yamukta da köşegenler eştir. Yalnız dik köşegenler ya da eş ve dik ama birbirini ortalamayan köşegenler bir deltoidde de bulunur. ${capital(joinTr(bisectFixes.map(lower)))} satırlarında yetmeyen koşula “köşegenler birbirini ortalar” eklenince koşul yeterli hâle gelir: önce paralelkenar elde edilir, eş köşegen onu dikdörtgen, dik köşegen eşkenar dörtgen, ikisi birden kare yapar.`,
  ],
  table: suffTable,
};

export const sufficiencyExamples207: WorkedExample[] = [
  {
    title: "Koordinatlardan dörtgenin en özel adını bul",
    prompt: "Koordinat düzleminde A(1; 1), B(7; 3), C(5; 9) ve D(−1; 7) noktaları sırayla birleştirilerek ABCD dörtgeni çiziliyor. Bu dörtgenin en özel adı nedir ve alanı kaç birim²’dir?",
    strategy: "Köşegenlerle üç soruyu sırayla sor: birbirini ortalıyor mu, eş mi, dik mi? Üçü birden evetse şekil karedir.",
    steps: [
      { label: "Ortalama", expression: "AC’nin orta noktası (3; 5), BD’nin orta noktası (3; 5)", explanation: "Orta noktalar aynı olduğundan köşegenler birbirini ortalar; ABCD bir paralelkenardır." },
      { label: "Eşlik", expression: "AC² = 4² + 8² = 80, BD² = (−8)² + 4² = 80", explanation: "Köşegenler eş; ortalayan eş köşegenler dikdörtgen verir." },
      { label: "Diklik", expression: "(4; 8) · (−8; 4) = −32 + 32 = 0", explanation: "Köşegen vektörlerinin skaler çarpımı sıfır; köşegenler diktir, dikdörtgen kare olur." },
      { label: "Alan", expression: "AC · BD / 2 = √80 · √80 / 2 = 40", explanation: "Dik köşegenli dörtgende alan köşegenlerin çarpımının yarısıdır." },
    ],
    answer: "ABCD bir karedir; alanı 40 birim².",
    check: "Kenar: AB² = 6² + 2² = 40, BC² = (−2)² + 6² = 40, kenar √40 ve alan (√40)² = 40. AB · BC = (6; 2) · (−2; 6) = 0, B açısı 90°.",
    pitfall: "Dört kenarın eş çıktığını görünce şekle hemen kare demek. Eş kenar yalnız eşkenar dörtgeni kesinleştirir; ayrıca bir açının 90° olduğu ya da köşegenlerin eşliği gösterilmelidir.",
  },
  {
    title: "Dik ve eş köşegenler kareyi zorunlu kılmaz",
    prompt: "Dışbükey ABCD dörtgeninde AC ve BD köşegenleri K noktasında dik kesişiyor ve ikisi de 10 cm’dir. AK = 2 cm, BK = KD = 5 cm’dir. Dörtgenin alanı kaç cm²’dir? ABCD kare midir? Kenar uzunluklarını bul.",
    strategy: "Dik köşegenli her dışbükey dörtgende alan köşegenlerin çarpımının yarısıdır. Kare olup olmadığını köşegenlerin birbirini ortalayıp ortalamadığından anla.",
    steps: [
      { label: "Alan", expression: "10 · 10 / 2 = 50", explanation: "Köşegenler dik olduğundan dört dik üçgenin alanları toplamı AC · BD / 2’dir." },
      { label: "Ortalama var mı?", expression: "AK = 2, KC = 10 − 2 = 8", explanation: "AC, K’de ikiye bölünmüyor; köşegenler birbirini ortalamıyor, şekil paralelkenar bile değildir." },
      { label: "Kenarlar", expression: "AB = AD = √(2² + 5²) = √29, CB = CD = √(8² + 5²) = √89", explanation: "Her kenar, K’deki dik açılı küçük üçgenin hipotenüsüdür." },
      { label: "Ad", expression: "AB = AD, CB = CD ⇒ deltoid", explanation: "Komşu iki çift kenar eş; şekil bir deltoiddir, kare değildir." },
    ],
    answer: "Alan 50 cm²; ABCD kare değil, bir deltoiddir. Kenarlar √29, √29, √89 ve √89 cm.",
    check: "Koordinatla K(0; 0), A(−2; 0), C(8; 0), B(0; −5), D(0; 5): ayakkabı bağı formülü 50 verir. Kenarların karelerinde AB² + CD² = 29 + 89 = BC² + DA², dik köşegen kuralı tutar.",
    pitfall: "“Köşegenler eş ve dik” bilgisini karenin tanımı sanmak. Kare için köşegenlerin birbirini ortalaması da gerekir.",
  },
];

export const sufficiencySupplement207 = {
  title: sufficiencySection207.title,
  figureTitle: sufficiencySection207.title,
  paragraphs: sufficiencySection207.paragraphs,
  summary: `Köşegenler birbirini ortalar ⇒ paralelkenar; + eş ⇒ dikdörtgen; + dik ⇒ eşkenar dörtgen; + eş ve dik ⇒ kare. Yetmeyenler: ${[sParEq, sEqDiag, sPerp, sEqPerp].map(({ conditionText, name }) => `${conditionText} (${lower(name)} olabilir)`).join("; ")}.`,
  appendSection: true as const,
  table: suffTable,
  examples: sufficiencyExamples207,
};

/* ========== Birinci dereceden denklem: her adımda kök korunur ========== */

/** px + k biçiminde bir taraf. */
export interface LinearSide207 { x: number; k: number }
export const linearText207 = ({ x, k }: LinearSide207) => {
  const xPart = x === 0 ? "" : x === 1 ? "x" : x === -1 ? "−x" : `${numText(x)}x`;
  if (!xPart) return numText(k);
  return k === 0 ? xPart : `${xPart} ${k < 0 ? "−" : "+"} ${Math.abs(k)}`;
};
/** Başlangıç: p(x − q) + r = s·x + t */
export const equationStart207 = { p: 5, q: 2, r: 3, s: 2, t: 11 };
export const equationSteps207 = (start = equationStart207) => {
  const { p, q, r, s, t } = start;
  const startText = `${p}(x − ${q}) + ${r} = ${linearText207({ x: s, k: t })}`;
  let left: LinearSide207 = { x: p, k: r - p * q };
  let right: LinearSide207 = { x: s, k: t };
  const rows: { operation: string; undo: string; left: LinearSide207; right: LinearSide207; text: string }[] = [
    { operation: "Başlangıç", undo: "—", left, right, text: startText },
    { operation: "Parantezi dağıt", undo: "Ortak çarpana ayır", left, right, text: `${linearText207(left)} = ${linearText207(right)}` },
  ];
  const push = (operation: string, undo: string, next: (side: LinearSide207) => LinearSide207) => {
    left = next(left);
    right = next(right);
    rows.push({ operation, undo, left, right, text: `${linearText207(left)} = ${linearText207(right)}` });
  };
  const xTerm = linearText207({ x: right.x, k: 0 });
  push(`İki taraftan ${xTerm} çıkar`, `+${xTerm}`, (side) => ({ x: side.x - s, k: side.k }));
  const c = left.k;
  push(c < 0 ? `İki tarafa ${-c} ekle` : `İki taraftan ${c} çıkar`, c < 0 ? `−${-c}` : `+${c}`, (side) => ({ x: side.x, k: side.k - c }));
  const a = left.x;
  if (a === 0) fail("Katsayı sıfır: bölme adımı yok");
  push(`İki tarafı ${numText(a)} ile böl`, `·${numText(a)}`, (side) => ({ x: side.x / a, k: side.k / a }));
  const root = rows.at(-1)!.right.k;
  if (!Number.isInteger(root) || rows.at(-1)!.left.x !== 1 || rows.at(-1)!.left.k !== 0) fail("Son satır x = tam sayı olmalı");
  const value = (side: LinearSide207) => side.x * root + side.k;
  const withValues = rows.map((row) => ({ ...row, leftValue: value(row.left), rightValue: value(row.right) }));
  // Paragraf: her satırda kök iki tarafı eşit yapar (geri alınabilir işlemler çözüm kümesini korur).
  if (withValues.some(({ leftValue, rightValue }) => leftValue !== rightValue)) fail("Bir adım kökü kaybetti");
  if (p * (root - q) + r !== s * root + t) fail("Kök başlangıç denklemini sağlamıyor");
  return { root, rows: withValues, startText };
};
const eq = equationSteps207();
const eqTable = {
  layout: "table" as const,
  headers: ["Adım", "İki tarafa yapılan işlem", "Ortaya çıkan denklem", "Geri alan işlem", `x = ${eq.root} iken sol ve sağ`],
  rows: eq.rows.map(({ operation, undo, text, leftValue, rightValue }, i) => [String(i), operation, text, undo, `${numText(leftValue)} = ${numText(rightValue)}`]),
};
const eqValues = eq.rows.map(({ leftValue }) => leftValue);
const eqDistinct = [...new Set(eqValues)];
if (eqDistinct.length < 3) fail("Taraf değerleri adımlarla değişmeli");

export const equationSection207: GuideSection = {
  title: "Her adımda kök aynı kalır: iki tarafa aynı işlemi uygula",
  paragraphs: [
    `${eq.startText} denklemi tabloda satır satır çözülür. Her satırda iki tarafa aynı işlem yapılır ve bir sonraki denklem yazılır. Son satır x = ${eq.root} verir. “Geri alan işlem” sütunu her adımın tersinin de olduğunu gösterir: çıkarılan terim geri eklenir, bölünen sayıyla geri çarpılır. Tersi olan işlemler çözüm kümesini korur; bu yüzden ilk ve son denklemin kökü aynıdır.`,
    `Son sütunda x = ${eq.root} her satıra yazılır. Taraf değerleri adımdan adıma ${eqValues.map(numText).join(", ")} olarak değişir ama her satırda sol ve sağ birbirine eşittir. Değişen şey sayılardır, kök değişmez. Bir adımda yalnız bir tarafa işlem yapılsaydı bu sütunda eşitlik bozulurdu. Parantezi dağıtmak denklemi değiştirmez, aynı ifadeyi başka biçimde yazar.`,
  ],
  table: eqTable,
};

export const equationExamples207: WorkedExample[] = [
  {
    title: "Ondalık katsayıları 10 ile çarparak kaldır",
    prompt: "Gerçek sayılarda 0,3x − 0,5 = 0,1x + 1,3 denklemini çöz.",
    strategy: "Her terimde en çok bir ondalık basamak var. İki tarafın tamamını 10 ile çarpınca bütün katsayılar tam sayı olur; sonra bilinmeyenleri bir tarafa topla.",
    steps: [
      { label: "10 ile çarp", expression: "3x − 5 = x + 13", explanation: "Sol ve sağdaki her terim 10 ile çarpılır; 10 sıfırdan farklı olduğu için kök korunur." },
      { label: "x’i topla", expression: "2x − 5 = 13", explanation: "İki taraftan x çıkarılır." },
      { label: "Sabiti taşı", expression: "2x = 18", explanation: "İki tarafa 5 eklenir." },
      { label: "Böl", expression: "x = 9", explanation: "İki taraf 2 ile bölünür." },
    ],
    answer: "x = 9; çözüm kümesi {9}.",
    check: "Sol: 0,3 · 9 − 0,5 = 2,7 − 0,5 = 2,2. Sağ: 0,1 · 9 + 1,3 = 0,9 + 1,3 = 2,2. İki taraf eşit.",
    pitfall: "Yalnız sol tarafı 10 ile çarpıp 3x − 5 = 0,1x + 1,3 yazmak. Çarpma iki tarafın bütün terimlerine birlikte uygulanmalıdır.",
  },
  {
    title: "Parametreli denklemde kök, çözümsüzlük ve özdeşlik",
    prompt: "m bir gerçek sayı olmak üzere 3x − m = mx + 6 denklemi veriliyor. (1) x = 2 bir kök ise m kaçtır? (2) Hangi m için denklemin çözümü yoktur? (3) Denklem bir m için bütün gerçek x’lerde doğru olabilir mi?",
    strategy: "Denklemi önce (katsayı)·x = sabit biçimine getir. Katsayı sıfır değilse tek kök vardır; sıfırsa sabite bakılır.",
    steps: [
      { label: "Düzenle", expression: "(3 − m)x = m + 6", explanation: "İki taraftan mx çıkarılır, iki tarafa m eklenir." },
      { label: "(1) x = 2", expression: "(3 − m) · 2 = m + 6 ⇒ 6 − 2m = m + 6 ⇒ m = 0", explanation: "Kök denklemi sağlamalıdır; x yerine 2 yazılıp m bulunur." },
      { label: "(2) Çözümsüzlük", expression: "3 − m = 0 ⇒ m = 3, sağ taraf 9 ≠ 0", explanation: "Katsayı sıfır ve sabit sıfırdan farklıysa 0 · x = 9 hiçbir x için doğru değildir." },
      { label: "(3) Özdeşlik", expression: "3 − m = 0 ve m + 6 = 0 aynı anda olmaz", explanation: "Özdeşlik için hem katsayı hem sabit sıfır olmalıdır; m = 3 ile m = −6 birlikte sağlanamaz." },
    ],
    answer: "(1) m = 0. (2) m = 3. (3) Hayır, hiçbir m için özdeşlik olmaz.",
    check: "m = 0: 3x = 6, x = 2. m = 3: 3x − 3 = 3x + 6 ⇒ −3 = 6, çelişki. m = −6: 9x = 0 tek kök x = 0 verir, özdeşlik değildir.",
    pitfall: "Her m için iki tarafı 3 − m ile bölüp x = (m + 6)/(3 − m) yazmak. m = 3’te bu bölme sıfıra bölmedir ve ayrı incelenmelidir.",
  },
];

export const equationSupplement207 = {
  title: equationSection207.title,
  figureTitle: equationSection207.title,
  paragraphs: equationSection207.paragraphs,
  summary: `${eq.startText}: ${eq.rows.slice(1).map(({ text }) => text).join(" → ")}. Her satırda x = ${eq.root} için iki taraf eşit (${eqDistinct.map(numText).join(", ")}). Ekleme, çıkarma ve sıfırdan farklı sayıyla çarpma ya da bölme geri alınabilir; kökü korur.`,
  appendSection: true as const,
  table: eqTable,
  examples: equationExamples207,
};

/* ========== Basit eşitsizlik: aralık, sayı doğrusu, tam sayılar ========== */

export interface Bound207 { v: number; strict: boolean }
/** lo ◇ a·x + b ◇ hi; ifade sabit önce yazılacaksa constantFirst. */
export interface InequalitySpec207 { a: number; b: number; lo?: Bound207; hi?: Bound207; constantFirst?: boolean }
export interface SolvedBound207 { v: Frac207; strict: boolean }
export const inequalitySpecs207: readonly InequalitySpec207[] = [
  { a: 2, b: -3, hi: { v: 7, strict: true } },
  { a: -2, b: 4, hi: { v: 10, strict: false } },
  { a: 3, b: -2, lo: { v: 5, strict: true } },
  { a: 2, b: 1, lo: { v: -3, strict: true }, hi: { v: 9, strict: false } },
  { a: -2, b: 5, lo: { v: -4, strict: false }, hi: { v: 6, strict: true }, constantFirst: true },
];
const exprText = ({ a, b, constantFirst }: InequalitySpec207) => {
  const ax = a === 1 ? "x" : a === -1 ? "−x" : `${numText(a)}x`;
  if (constantFirst) return `${numText(b)} ${a < 0 ? "−" : "+"} ${Math.abs(a) === 1 ? "" : Math.abs(a)}x`;
  return b === 0 ? ax : `${ax} ${b < 0 ? "−" : "+"} ${Math.abs(b)}`;
};
const lt = (strict: boolean) => (strict ? "<" : "≤");
const gt = (strict: boolean) => (strict ? ">" : "≥");
export const inequalityText207 = (spec: InequalitySpec207) => {
  const e = exprText(spec);
  if (spec.lo && spec.hi) return `${numText(spec.lo.v)} ${lt(spec.lo.strict)} ${e} ${lt(spec.hi.strict)} ${numText(spec.hi.v)}`;
  if (spec.hi) return `${e} ${lt(spec.hi.strict)} ${numText(spec.hi.v)}`;
  return `${e} ${gt(spec.lo!.strict)} ${numText(spec.lo!.v)}`;
};
const ceilF = ({ n, d }: Frac207) => Math.ceil(n / d);
const floorF = ({ n, d }: Frac207) => Math.floor(n / d);
const isInt = ({ d }: Frac207) => d === 1;
export const solveInequality207 = (spec: InequalitySpec207) => {
  const { a, b, lo, hi } = spec;
  if (a === 0) fail("Katsayı sıfır olamaz");
  const shift = (bound?: Bound207) => bound && { v: fDiv(fSub(frac207(bound.v), frac207(b)), frac207(a)), strict: bound.strict };
  const [first, second] = [shift(lo), shift(hi)];
  const flipped = a < 0;
  const lower: SolvedBound207 | undefined = flipped ? second : first;
  const upper: SolvedBound207 | undefined = flipped ? first : second;
  const minInt = lower && (isInt(lower.v) && !lower.strict ? fracValue207(lower.v) : floorF(lower.v) + 1);
  const maxInt = upper && (isInt(upper.v) && !upper.strict ? fracValue207(upper.v) : ceilF(upper.v) - 1);
  const integers = minInt !== undefined && maxInt !== undefined ? range(minInt, maxInt) : undefined;
  const solution = lower && upper
    ? `${fracText207(lower.v)} ${lt(lower.strict)} x ${lt(upper.strict)} ${fracText207(upper.v)}`
    : upper ? `x ${lt(upper.strict)} ${fracText207(upper.v)}` : `x ${gt(lower!.strict)} ${fracText207(lower!.v)}`;
  const interval = `${lower ? (lower.strict ? "(" : "[") + fracText207(lower.v) : "(−∞"}, ${upper ? fracText207(upper.v) + (upper.strict ? ")" : "]") : "∞)"}`;
  const subtract = -b;
  return {
    spec, flipped, lower, upper, minInt, maxInt, integers, solution, interval,
    text: inequalityText207(spec),
    operation: `${subtract < 0 ? "−" : "+"}${Math.abs(subtract)}, ÷${a < 0 ? `(${numText(a)})` : a} · ${flipped ? "yön döner" : "yön aynı"}`,
    ends: [
      ...(lower ? [`${fracText207(lower.v)}: ${lower.strict ? "boş" : "dolu"} nokta`] : []),
      ...(upper ? [`${fracText207(upper.v)}: ${upper.strict ? "boş" : "dolu"} nokta`] : []),
      ...(!lower ? ["ok sola"] : !upper ? ["ok sağa"] : []),
    ].join("; "),
    integerText: integers ? `${listText(integers)} (${integers.length} tane)` : maxInt !== undefined ? `En büyük: ${numText(maxInt)}` : `En küçük: ${numText(minInt!)}`,
  };
};
export const inequalityRows207 = (specs = inequalitySpecs207) => specs.map(solveInequality207);
const ineqRows = inequalityRows207();
const ineqTable = {
  layout: "table" as const,
  headers: ["Eşitsizlik", "Her tarafa uygulanan işlem", "Çözüm", "Aralık", "Sayı doğrusunda uçlar", "Tam sayılar"],
  rows: ineqRows.map(({ text, operation, solution, interval, ends, integerText }) => [text, operation, solution, interval, ends, integerText]),
};
const [i1, i2, i3, , i5] = ineqRows;
// Paragraf iddiaları: negatif katsayılı satırlarda yön döner; i5’te soldaki ≤ sağ uca geçer.
if (ineqRows.some(({ spec, flipped }) => flipped !== spec.a < 0)) fail("Yön dönmesi katsayının işaretine bağlı olmalı");
if (!i5.spec.lo || i5.spec.lo.strict || i5.upper?.strict !== false || i5.lower?.strict !== true) fail("Son satırda eşitlik uç değiştirmeli");
if (isInt(i3.lower!.v) || i3.minInt !== ceilF(i3.lower!.v)) fail("Üçüncü satır kesirli uç ister");
if (i1.maxInt !== fracValue207(i1.upper!.v) - 1 || i2.minInt !== fracValue207(i2.lower!.v)) fail("Açık ve kapalı uç tam sayı örneği bozuldu");

export const inequalitySection207: GuideSection = {
  title: "Çözümü aralık, sayı doğrusu ve tam sayılarla üç biçimde yaz",
  paragraphs: [
    `Tablonun her satırında önce sabit terim her taraftan kaldırılır, sonra x’in katsayısına bölünür. Katsayı pozitifse yön aynı kalır, negatifse döner. Aynı çözüm üç biçimde yazılır: eşitsizlik, aralık gösterimi ve sayı doğrusundaki uç noktalar. Kapalı uç ≤ veya ≥ demektir ve dolu noktayla, açık uç < veya > demektir ve boş noktayla çizilir. Örneğin ${i2.text} için her taraftan ${i2.spec.b > 0 ? `${i2.spec.b} çıkarılır` : `${-i2.spec.b} eklenir`}, sonra iki taraf ${numText(i2.spec.a)} ile bölünür ve yön ${i2.flipped ? "döner" : "aynı kalır"}; sonuç ${i2.solution}, yani ${i2.interval} olur.`,
    `Tam sayı sütunu uçların açık ya da kapalı olmasına duyarlıdır. ${i1.text} çözümünde ${fracText207(i1.upper!.v)} dışarıda kaldığı için en büyük tam sayı ${numText(i1.maxInt!)} olur. ${i2.text} çözümünde ise ${fracText207(i2.lower!.v)} dahildir ve kendisi en küçük tam sayıdır. ${i3.text} çözümünde uç ${fracText207(i3.lower!.v)} kesirlidir; en küçük tam sayı yukarı yuvarlanarak ${numText(i3.minInt!)} bulunur. Son satırda negatif katsayıya bölününce zincirin iki ucu yer değiştirir: baştaki ≤ sağ uca geçer ve ${fracText207(i5.upper!.v)} dolu nokta olur.`,
  ],
  table: ineqTable,
};

export const inequalityExamples207: WorkedExample[] = [
  {
    title: "İki tarafta bilinmeyen ve negatif bölen",
    prompt: "Gerçek sayılarda 5 − 3x ≥ x − 7 eşitsizliğini çöz. x pozitif tam sayı ise kaç farklı değer alır?",
    strategy: "Bilinmeyenli terimleri bir tarafta, sabitleri öbür tarafta topla. Negatif katsayıya bölerken yönü çevir.",
    steps: [
      { label: "x’leri topla", expression: "5 − 4x ≥ −7", explanation: "İki taraftan x çıkarılır; yön değişmez." },
      { label: "Sabiti taşı", expression: "−4x ≥ −12", explanation: "İki taraftan 5 çıkarılır; yön değişmez." },
      { label: "Negatife böl", expression: "x ≤ 3", explanation: "İki taraf −4 ile bölünür; ≥ işareti ≤ olur." },
      { label: "Pozitif tam sayılar", expression: "x ∈ {1, 2, 3}", explanation: "Çözüm (−∞, 3] aralığıdır; içindeki pozitif tam sayılar üç tanedir." },
    ],
    answer: "Çözüm kümesi (−∞, 3]; pozitif tam sayı olarak 3 değer (1, 2, 3).",
    check: "x = 3: 5 − 9 = −4 ve 3 − 7 = −4, −4 ≥ −4 doğru. x = 4: 5 − 12 = −7 ve 4 − 7 = −3, −7 ≥ −3 yanlış. Sınır doğru tarafta.",
    pitfall: "−4x ≥ −12’den x ≥ 3 yazmak. Negatif sayıya bölmek sayı doğrusunu 0 etrafında yansıtır; yön mutlaka döner.",
  },
  {
    title: "x’in aralığından bir ifadenin aralığına",
    prompt: "x gerçek sayısı −2 < x ≤ 3 koşulunu sağlıyor. 4 − 2x ifadesi hangi aralıkta değer alır? Bu ifadenin alabileceği tam sayı değerleri kaç tanedir?",
    strategy: "Zincirin üç tarafını önce −2 ile çarp, sonra 4 ekle. Negatif çarpanla iki yön de döner; sonra küçükten büyüğe yeniden yaz.",
    steps: [
      { label: "−2 ile çarp", expression: "4 > −2x ≥ −6", explanation: "Üç taraf −2 ile çarpılır; < işareti >, ≤ işareti ≥ olur." },
      { label: "4 ekle", expression: "8 > 4 − 2x ≥ −2", explanation: "Ekleme yönü değiştirmez." },
      { label: "Sırala", expression: "−2 ≤ 4 − 2x < 8", explanation: "Küçükten büyüğe yazınca kapalı uç −2, açık uç 8 olur." },
      { label: "Tam sayılar", expression: "−2, −1, …, 7", explanation: "−2’den 7’ye kadar 10 tam sayı vardır; 8 dışarıda kalır." },
    ],
    answer: "4 − 2x ∈ [−2, 8); ifade 10 farklı tam sayı değeri alabilir.",
    check: "x = 3 için 4 − 6 = −2 (dahil), x → −2 iken 4 + 4 = 8’e yaklaşır ama x = −2 dışarıda olduğundan 8 alınmaz. x = −1,5 için 7 elde edilir.",
    pitfall: "Uçları ayrı ayrı yerine koyup sonucu (−2, 8] yazmak. Hangi ucun kapalı olduğu x’in aralığındaki kapalı uçtan gelir: x = 3 dahil olduğu için −2 dahildir.",
  },
];

export const inequalitySupplement207 = {
  title: inequalitySection207.title,
  figureTitle: inequalitySection207.title,
  paragraphs: inequalitySection207.paragraphs,
  summary: `Sabiti kaldır, katsayıya böl; negatif bölende yön döner. ≤, ≥ dolu nokta ve köşeli parantez; <, > boş nokta ve normal parantez. ${ineqRows.map(({ text, interval }) => `${text} ⇒ ${interval}`).join("; ")}.`,
  appendSection: true as const,
  table: ineqTable,
  examples: inequalityExamples207,
};

/* ========== Mutlak değer: merkez ve yarıçapla aralık ========== */

export type AbsRelation207 = "<" | "≤" | "=" | ">" | "≥";
/** |m·x + n| ◇ r */
export interface AbsSpec207 { m: number; n: number; rel: AbsRelation207; r: number }
export const absSpecs207: readonly AbsSpec207[] = [
  { m: 1, n: -2, rel: "<", r: 3 },
  { m: 1, n: -2, rel: "≤", r: 3 },
  { m: 1, n: 1, rel: "=", r: 4 },
  { m: 2, n: -6, rel: "≤", r: 4 },
  { m: 3, n: 3, rel: "<", r: 6 },
  { m: 2, n: -1, rel: ">", r: 5 },
];
const innerText = (m: number, n: number) => linearText207({ x: m, k: n });
const centerForm = (center: Frac207) => (center.n === 0 ? "x" : center.n > 0 ? `x − ${fracText207(center)}` : `x + ${fracText207(frac207(-center.n, center.d))}`);
export const absRows207 = (specs = absSpecs207) => specs.map((spec) => {
  const { m, n, rel, r } = spec;
  if (m <= 0 || r <= 0) fail("Tablo pozitif m ve r ister");
  const center = frac207(-n, m);
  const radius = frac207(r, m);
  const left = fSub(center, radius);
  const right = frac207(center.n * radius.d + radius.n * center.d, center.d * radius.d);
  const [L, R] = [fracValue207(left), fracValue207(right)];
  const strict = rel === "<" || rel === ">";
  const inside = rel === "<" || rel === "≤";
  const pts = rel === "=" ? [left, right] : [];
  const lo = strict ? Math.floor(L) + 1 : Math.ceil(L);
  const hi = strict ? Math.ceil(R) - 1 : Math.floor(R);
  const integers = inside ? range(lo, hi) : rel === "=" ? pts.filter(isInt).map(fracValue207) : undefined;
  // Dış bölgede tam sayı sonsuzdur; tümleyendeki (içerideki) tam sayılar sayılır.
  const outsideInts = !inside && rel !== "=" ? range(rel === ">" ? Math.ceil(L) : Math.floor(L) + 1, rel === ">" ? Math.floor(R) : Math.ceil(R) - 1) : undefined;
  const solution = rel === "="
    ? `{${fracText207(left)}, ${fracText207(right)}}`
    : inside
      ? `${strict ? "(" : "["}${fracText207(left)}, ${fracText207(right)}${strict ? ")" : "]"}`
      : `(−∞, ${fracText207(left)}${strict ? ")" : "]"} ∪ ${strict ? "(" : "["}${fracText207(right)}, ∞)`;
  return {
    ...spec, center, radius, left, right, strict, inside, integers, outsideInts, solution,
    text: `|${innerText(m, n)}| ${rel} ${r}`,
    centerText: `${m === 1 ? "" : `${m} ile böl: |${centerForm(center)}| ${rel} ${fracText207(radius)}; `}a = ${fracText207(center)}, r = ${fracText207(radius)}`,
    distanceText: `d(x, ${fracText207(center)}) ${rel} ${fracText207(radius)}`,
    integerText: integers ? `${listText(integers)} (${integers.length} tane)` : `Sonsuz; çözüm dışında kalan: ${listText(outsideInts!)} (${outsideInts!.length} tane)`,
  };
});
const absRows = absRows207();
const absTable = {
  layout: "table" as const,
  headers: ["Koşul", "Merkez a ve yarıçap r", "Uzaklık dili", "Çözüm", "Tam sayı çözümler"],
  rows: absRows.map(({ text, centerText, distanceText, solution, integerText }) => [text, centerText, distanceText, solution, integerText]),
};
// Paragraf: a ve r tam sayıyken < için 2r − 1, ≤ için 2r + 1, = için 2 tam sayı.
for (const row of absRows) {
  if (!isInt(row.center) || !isInt(row.radius)) continue;
  const rr = fracValue207(row.radius);
  const expected = row.rel === "<" ? 2 * rr - 1 : row.rel === "≤" ? 2 * rr + 1 : row.rel === "=" ? 2 : undefined;
  if (expected !== undefined && row.integers?.length !== expected) fail(`${row.text} tam sayı adedi kuralla uyuşmuyor`);
}
const [ab1, ab2, ab3, ab4, ab5, ab6] = absRows;
if (fracValue207(ab1.center) !== fracValue207(ab2.center) || fracValue207(ab1.radius) !== fracValue207(ab2.radius)) fail("İlk iki satır aynı merkez ve yarıçapı ister");
if (isInt(ab6.center) || ab4.m === 1 || ab5.m === 1) fail("Katsayılı satırlar ve kesirli merkez örneği bozuldu");

export const absSection207: GuideSection = {
  title: "Mutlak değeri merkez ve yarıçapla oku, tam sayıları say",
  paragraphs: [
    `d(x, a) yazımı, sayı doğrusunda x noktasının a noktasına uzaklığı demektir ve |x − a|’ya eşittir. Bu yüzden |x − a| < r, merkezi a olan ve iki yana r kadar uzanan açık aralığı verir; ≤ uçları ekler, = yalnız iki ucu bırakır, > ise iki dış bölgeyi seçer. ${ab1.text} için merkez ${fracText207(ab1.center)}, yarıçap ${fracText207(ab1.radius)}; çözüm ${ab1.solution} olur. Aynı merkez ve yarıçapla ${ab2.text} çözümü ${ab2.solution} olur; iki uç eklenince tam sayı adedi ${ab1.integers!.length} iken ${ab2.integers!.length} olur.`,
    `|m·x + n| biçiminde önce içerideki katsayı dışarı alınır: |m·x + n| = m·|x + n/m| (m > 0). İki taraf m ile bölününce merkez −n/m, yarıçap r/m olur. ${ab4.text} satırında merkez ${fracText207(ab4.center)}, yarıçap ${fracText207(ab4.radius)}; ${ab5.text} satırında merkez ${fracText207(ab5.center)}, yarıçap ${fracText207(ab5.radius)}. Merkez ve yarıçap tam sayıyken < için 2r − 1, ≤ için 2r + 1, = için 2 tam sayı çözüm vardır. ${ab6.text} satırında merkez ${fracText207(ab6.center)} kesirlidir; çözüm ${ab6.solution} olur ve tam sayılar sonsuz çoktur. ${ab3.text} ise yalnız iki noktayı verir: ${ab3.solution}.`,
  ],
  table: absTable,
};

export const absExamples207: WorkedExample[] = [
  {
    title: "İki mutlak değer koşulu bir halka oluşturur",
    prompt: "x tam sayısı 1 ≤ |x − 3| < 4 koşulunu sağlıyor. x kaç farklı değer alır ve bu değerlerin toplamı kaçtır?",
    strategy: "Koşulu uzaklık diliyle oku: x’in 3’e uzaklığı en az 1, 4’ten az. İki koşulu ayrı çöz, sonra ‘ve’ ile kesiştir.",
    steps: [
      { label: "Dış sınır", expression: "|x − 3| < 4 ⇒ −1 < x < 7", explanation: "Merkez 3, yarıçap 4 olan açık aralık." },
      { label: "İç boşluk", expression: "|x − 3| ≥ 1 ⇒ x ≤ 2 veya x ≥ 4", explanation: "Merkeze 1’den yakın olan (2, 4) aralığı dışarıda kalır." },
      { label: "Kesişim", expression: "(−1, 2] ∪ [4, 7)", explanation: "İki koşul birlikte istendiği için ortak bölge alınır." },
      { label: "Tam sayılar", expression: "0, 1, 2, 4, 5, 6", explanation: "Altı tam sayı; toplamları 0 + 1 + 2 + 4 + 5 + 6 = 18." },
    ],
    answer: "6 değer; toplamları 18.",
    check: "Simetri denetimi: değerler 3 etrafında çiftler oluşturur (0 ile 6, 1 ile 5, 2 ile 4); her çiftin toplamı 6, üç çift 18 eder. x = 3 (uzaklık 0) ve x = 7 (uzaklık 4) koşulu sağlamaz.",
    pitfall: "|x − 3| ≥ 1 koşulunu unutup −1 < x < 7 aralığındaki yedi tam sayıyı saymak. 3 noktası merkeze uzaklığı 0 olduğu için dışarıda kalır.",
  },
  {
    title: "Verilen aralığı mutlak değerle yaz",
    prompt: "−3 ≤ x ≤ 9 aralığını |x − a| ≤ r biçiminde yaz. Aynı aralığı |2x − b| ≤ c biçiminde de ifade et. Aralıkta kaç tam sayı vardır?",
    strategy: "Merkez, iki ucun orta noktasıdır; yarıçap, merkezden bir uca olan uzaklıktır. Sonra iki tarafı 2 ile çarp.",
    steps: [
      { label: "Merkez", expression: "a = (−3 + 9)/2 = 3", explanation: "Kapalı aralığın orta noktası iki uca eşit uzaklıktadır." },
      { label: "Yarıçap", expression: "r = 9 − 3 = 6", explanation: "Merkezden sağ uca uzaklık; sol uca da 3 − (−3) = 6." },
      { label: "Birinci biçim", expression: "|x − 3| ≤ 6", explanation: "Uçlar dahil olduğu için ≤ kullanılır." },
      { label: "İkinci biçim", expression: "|2x − 6| ≤ 12", explanation: "İki taraf 2 ile çarpılır: 2|x − 3| = |2x − 6|." },
      { label: "Tam sayılar", expression: "2 · 6 + 1 = 13", explanation: "−3’ten 9’a kadar uçlar dahil 13 tam sayı vardır." },
    ],
    answer: "|x − 3| ≤ 6, yani |2x − 6| ≤ 12; aralıkta 13 tam sayı var.",
    check: "x = −3: |−6| = 6 ≤ 6 ve |−12| = 12 ≤ 12. x = 9: |6| = 6 ≤ 6. x = 10: |7| = 7 > 6, dışarıda.",
    pitfall: "Merkezi uçlardan biri sanıp |x + 3| ≤ 12 yazmak. Bu, −15 ≤ x ≤ 9 aralığını verir; merkez her zaman iki ucun ortasıdır.",
  },
];

export const absSupplement207 = {
  title: absSection207.title,
  figureTitle: absSection207.title,
  paragraphs: absSection207.paragraphs,
  summary: `|x − a| = d(x, a). < açık iç aralık, ≤ kapalı iç aralık, = iki nokta, > iki dış bölge. |m·x + n| ◇ r ⇒ merkez −n/m, yarıçap r/m. ${absRows.map(({ text, solution }) => `${text} ⇒ ${solution}`).join("; ")}.`,
  appendSection: true as const,
  table: absTable,
  examples: absExamples207,
};

export const depth207Supplements = {
  "tyt-geo-ucgen-esitsizligi-031": [thirdSideSupplement207],
  "tyt-geo-dortgen-hiyerarsi-032": [sufficiencySupplement207],
  "birinci-dereceden-denklemler": [equationSupplement207],
  "basit-esitsizlikler": [inequalitySupplement207],
  "mutlak-deger": [absSupplement207],
};
