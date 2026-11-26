import type { GuideSection, WorkedExample } from "./guides/types";

/*
 * TYT Matematik temel konular derinleştirmesi (0.208.0). Kabul edilmiş
 * rehber içeriği değişmez; her derse bir tablo bölümü, iki özgün çözümlü
 * örnek ve bir bölüm çizimi görüntüleme katmanında eklenir. Paragraflardaki,
 * tablo satırlarındaki, Kopya Kâğıdı özetlerindeki ve çizimlerdeki sayılar
 * aynı fonksiyonlardan üretilir. Paragrafta genel bir yargı varsa modül
 * yüklenirken veriyle sınanır; veri yargıyı desteklemezse modül hata verir.
 */

const guard = (ok: boolean, claim: string) => {
  if (!ok) throw new Error(`depth208: ${claim}`);
};
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
const lcm = (a: number, b: number) => Math.abs(a * b) / gcd(a, b);

/** Gerçek eksi işaretli tam sayı. */
export const signed208 = (n: number) => (n < 0 ? `−${Math.abs(n)}` : String(n));
/** Türkçe ondalık virgüllü sayı (en çok iki basamak). */
export const decimal208 = (x: number) => {
  const r = Number(x.toFixed(2));
  return signed208(r).replace(".", ",");
};

/* ---------- Kesin rasyonel sayılar ---------- */

export interface Q208 { n: number; d: number }
export const q208 = (n: number, d = 1): Q208 => {
  guard(d !== 0 && Number.isInteger(n) && Number.isInteger(d), "payda sıfır olmayan tam sayı olmalı");
  const g = gcd(n, d) || 1;
  const s = d < 0 ? -1 : 1;
  return { n: (s * n) / g, d: (s * d) / g };
};
export const qAdd208 = (x: Q208, y: Q208) => q208(x.n * y.d + y.n * x.d, x.d * y.d);
export const qSub208 = (x: Q208, y: Q208) => q208(x.n * y.d - y.n * x.d, x.d * y.d);
export const qMul208 = (x: Q208, y: Q208) => q208(x.n * y.n, x.d * y.d);
export const qDiv208 = (x: Q208, y: Q208) => q208(x.n * y.d, x.d * y.n);
export const qEq208 = (x: Q208, y: Q208) => x.n === y.n && x.d === y.d;
export const qText208 = ({ n, d }: Q208) => (d === 1 ? signed208(n) : `${signed208(n)}/${d}`);
const one = q208(1);

/* =====================================================================
 * Temel kavramlar: rakamların yeri değişince toplam ve fark
 * ===================================================================== */

export const placeDigits208 = { a: 7, b: 2, c: 4 } as const;
type Letter = "a" | "b" | "c";
const LETTERS: readonly Letter[] = ["a", "b", "c"];
type DigitTerm = readonly [1 | -1, string];
const digitSpecs: readonly (readonly DigitTerm[])[] = [
  [[1, "ab"]],
  [[1, "ab"], [1, "ba"]],
  [[1, "ab"], [-1, "ba"]],
  [[1, "abc"]],
  [[1, "abc"], [-1, "cba"]],
  [[1, "abc"], [1, "bca"], [1, "cab"]],
];
const wordCoefficients = (word: string) => {
  const out: Record<Letter, number> = { a: 0, b: 0, c: 0 };
  [...word].forEach((letter, i) => { out[letter as Letter] += 10 ** (word.length - 1 - i); });
  return out;
};
const linearText = (coef: Record<Letter, number>) => {
  const parts = LETTERS.filter((l) => coef[l] !== 0).map((l, i) => {
    const k = coef[l];
    const body = `${Math.abs(k) === 1 ? "" : Math.abs(k)}${l}`;
    return i === 0 ? (k < 0 ? `−${body}` : body) : `${k < 0 ? "−" : "+"} ${body}`;
  });
  return parts.length ? parts.join(" ") : "0";
};
/** Tek sayının çözümlemesi rakamların yazıldığı sırayla: ba = 10b + a. */
const wordText = (word: string) => [...word].map((l, i) => {
  const k = 10 ** (word.length - 1 - i);
  return `${k === 1 ? "" : k}${l}`;
}).join(" + ");
const wordValue = (word: string, digits: Record<Letter, number>) => Number([...word].map((l) => digits[l as Letter]).join(""));
const joinSigned = (items: readonly (readonly [1 | -1, string])[]) =>
  items.map(([sign, s], i) => (i === 0 ? s : `${sign < 0 ? "−" : "+"} ${s}`)).join(" ");

export const placeValueRows208 = (digits: Record<Letter, number> = placeDigits208) => digitSpecs.map((terms) => {
  const coef: Record<Letter, number> = { a: 0, b: 0, c: 0 };
  for (const [sign, word] of terms) {
    const w = wordCoefficients(word);
    for (const l of LETTERS) coef[l] += sign * w[l];
  }
  const factor = LETTERS.reduce((g, l) => gcd(g, coef[l]), 0);
  const inner = Object.fromEntries(LETTERS.map((l) => [l, coef[l] / factor])) as Record<Letter, number>;
  const values = terms.map(([sign, word]) => [sign, wordValue(word, digits)] as const);
  const value = values.reduce((s, [sign, x]) => s + sign * x, 0);
  const innerValue = LETTERS.reduce((s, l) => s + inner[l] * digits[l], 0);
  return {
    expression: joinSigned(terms),
    expansion: terms.length === 1 ? wordText(terms[0][1]) : joinSigned(terms.map(([sign, word]) => [sign, `(${wordText(word)})`] as const)),
    coefficients: coef,
    factor,
    inner,
    simplified: factor > 1 ? `${factor}(${linearText(inner)})` : linearText(coef),
    values: values.map(([, x]) => x),
    value,
    innerValue,
    valueText: (terms.length === 1 ? String(value) : `${joinSigned(values.map(([sign, x]) => [sign, String(x)] as const))} = ${signed208(value)}`)
      + (factor > 1 ? ` = ${factor}·${signed208(innerValue)}` : ""),
  };
});
const placeRows = placeValueRows208();
const [rowAb, rowSum, rowDiff, rowAbc, rowDiff3, rowCycle] = placeRows;
// Paragraftaki yargılar her rakam seçimi için geçerli olmalı.
for (let a = 1; a <= 9; a += 1) for (let b = 0; b <= 9; b += 1) for (let c = 0; c <= 9; c += 1) {
  const rows = placeValueRows208({ a, b, c });
  rows.forEach((row) => guard(row.value === row.factor * row.innerValue && row.value === LETTERS.reduce((s, l) => s + row.coefficients[l] * ({ a, b, c })[l], 0), "çözümleme rakamla yazılan değeri vermeli"));
  guard(rows[2].value % rows[2].factor === 0 && rows[4].value % rows[4].factor === 0, "farklar ortak çarpanın katı olmalı");
}
guard(rowDiff3.coefficients.b === 0, "abc − cba farkında b sadeleşmeli");
guard(rowSum.coefficients.a === rowSum.coefficients.b && rowCycle.coefficients.a === rowCycle.coefficients.c, "toplamlarda harf katsayıları eşit olmalı");
const sample = `a = ${placeDigits208.a}, b = ${placeDigits208.b}, c = ${placeDigits208.c}`;
const placeTable = {
  layout: "table" as const,
  headers: ["İfade", "Basamak çözümlemesi", "Sadeleşmiş", `${sample} için`],
  rows: placeRows.map(({ expression, expansion, simplified, valueText }) => [expression, expansion, simplified, valueText]),
};

export const placeValueSection208: GuideSection = {
  title: "Rakamların yeri değişince toplamı ve farkı çözümle",
  figureTitle: "Rakamların yeri değişince toplamı ve farkı çözümle",
  paragraphs: [
    `Bu tabloda a, b ve c birer rakamdır. Bir sayının başındaki rakam 0 olamaz. ab yazımı iki rakamın yan yana durduğunu gösterir ve değeri ${rowAb.simplified} olur. Her satırda önce sayılar basamak değerlerine ayrılır, sonra aynı harfin katsayıları toplanır. Örnek değerler ${sample} seçildi.`,
    `ab + ba toplamında iki harfin katsayısı da ${rowSum.factor} çıkar, bu yüzden toplam ${rowSum.simplified} olur. Farkta katsayılar ters işaretle eşleşir: ab − ba = ${rowDiff.simplified}. ${sample} için ${rowDiff.valueText}. Tablodaki örnek değerler formülün yerine konulmuş hâlidir; kural bütün rakamlar için geçerlidir.`,
    `Üç basamaklı abc − cba farkında b’nin katsayısı ${rowDiff3.coefficients.b} olur. Ortadaki rakam ne seçilirse seçilsin fark değişmez ve her zaman ${rowDiff3.factor} sayısının katıdır. abc, bca ve cab sayılarında her harf her basamakta bir kez durur. Toplamları ${rowCycle.simplified} olur. ${rowAbc.expression} = ${rowAbc.simplified} çözümlemesi bu üç satırın da başlangıcıdır.`,
  ],
  table: placeTable,
};

export const placeValueExamples208: WorkedExample[] = [
  {
    title: "Fark ve toplamdan iki rakamı bul",
    prompt: "ab ve ba iki basamaklı sayılardır. ab − ba = 54 ve a + b = 10 olduğuna göre ab sayısı kaçtır?",
    strategy: "Farkı basamak değerleriyle çözümle. a − b ve a + b bilindiğinde iki rakam doğrudan çıkar.",
    steps: [
      { label: "Çözümle", expression: "(10a + b) − (10b + a) = 9a − 9b = 9(a − b)", explanation: "ab sayısı 10a + b, ba sayısı 10b + a demektir." },
      { label: "Fark", expression: "9(a − b) = 54 ⇒ a − b = 6", explanation: "İki tarafı 9’a böl." },
      { label: "Toplamla birleştir", expression: "a + b = 10, a − b = 6 ⇒ a = 8, b = 2", explanation: "İki denklem toplanınca 2a = 16 olur." },
    ],
    answer: "ab = 82.",
    check: "82 − 28 = 54 ve 8 + 2 = 10. İki sayı da iki basamaklıdır.",
    pitfall: "ab’yi a·b çarpımı sanmak ya da farkı doğrudan a − b = 54 diye yazmak.",
  },
  {
    title: "Ortadaki rakam farka girmez",
    prompt: "a, b ve c birbirinden farklı rakamlardır. abc ve cba üç basamaklı sayılardır ve abc − cba = 396 olur. abc sayısı en çok kaçtır?",
    strategy: "Farkı çözümle. b sadeleşir, bu yüzden önce a ile c’yi belirle, sonra b’yi yalnız farklılık koşuluyla seç.",
    steps: [
      { label: "Çözümle", expression: "(100a + 10b + c) − (100c + 10b + a) = 99(a − c)", explanation: "10b iki sayıda da aynıdır ve sadeleşir." },
      { label: "a − c", expression: "99(a − c) = 396 ⇒ a − c = 4", explanation: "396 = 99·4." },
      { label: "En büyük a", expression: "a = 9 ⇒ c = 5", explanation: "Yüzler basamağı sayıyı en çok etkiler. c = 5 sıfır olmadığı için cba de üç basamaklıdır." },
      { label: "b’yi seç", expression: "b = 8", explanation: "b, 9 ve 5’ten farklı en büyük rakamdır." },
    ],
    answer: "abc en çok 985 olur.",
    check: "985 − 589 = 396. Rakamlar 9, 8 ve 5 birbirinden farklıdır.",
    pitfall: "b’yi farktan bulmaya çalışmak. b farkta sadeleşir, yalnız farklılık ve en büyük olma koşuluyla seçilir.",
  },
];

export const placeValueSupplement208 = {
  title: placeValueSection208.title,
  figureTitle: placeValueSection208.title,
  paragraphs: placeValueSection208.paragraphs,
  summary: `ab = ${rowAb.simplified}. ab + ba = ${rowSum.simplified}, ab − ba = ${rowDiff.simplified}. abc − cba = ${rowDiff3.simplified}, b sadeleşir. abc + bca + cab = ${rowCycle.simplified}.`,
  appendSection: true as const,
  table: placeTable,
  examples: placeValueExamples208,
};

/* =====================================================================
 * Ardışık sayılar: terim sayısı ve toplam tablosu
 * ===================================================================== */

export interface ArithmeticList208 { first: number; last: number; step: number; name: string; rule?: "dogal" | "cift" | "tek" }
export const arithmeticLists208: readonly ArithmeticList208[] = [
  { first: 1, last: 20, step: 1, name: "Ardışık tam sayılar", rule: "dogal" },
  { first: 2, last: 40, step: 2, name: "Ardışık çiftler", rule: "cift" },
  { first: 1, last: 39, step: 2, name: "Ardışık tekler", rule: "tek" },
  { first: -7, last: 11, step: 1, name: "Negatiften başlayan tam sayılar" },
  { first: 3, last: 31, step: 4, name: "Adımı 4 olan liste" },
  { first: 12, last: 96, step: 7, name: "Adımı 7 olan liste" },
];
export const listTerms208 = ({ first, last, step }: ArithmeticList208) => {
  const terms: number[] = [];
  for (let x = first; x <= last; x += step) terms.push(x);
  return terms;
};
export const arithmeticRows208 = () => arithmeticLists208.map((list) => {
  const { first, last, step, rule } = list;
  const n = (last - first) / step + 1;
  guard(Number.isInteger(n) && n > 0, "son terim listenin terimi olmalı");
  const sum = (n * (first + last)) / 2;
  const terms = listTerms208(list);
  guard(terms.length === n && terms.at(-1) === last && terms.reduce((s, x) => s + x, 0) === sum, "formül tek tek toplamla aynı olmalı");
  const ruleValue = rule === "dogal" ? (n * (n + 1)) / 2 : rule === "cift" ? n * (n + 1) : rule === "tek" ? n * n : undefined;
  guard(ruleValue === undefined || ruleValue === sum, "kısa kural genel formülle aynı olmalı");
  const ruleText = rule === "dogal" ? `n(n + 1)/2 = ${n}·${n + 1}/2 = ${ruleValue}`
    : rule === "cift" ? `n(n + 1) = ${n}·${n + 1} = ${ruleValue}`
    : rule === "tek" ? `n² = ${n}² = ${ruleValue}` : "Genel formül";
  const mean = (first + last) / 2;
  return { ...list, n, sum, mean, terms, ruleText, middle: n % 2 === 1 ? terms[(n - 1) / 2] : undefined };
});
const listRows = arithmeticRows208();
const [natRow, evenRow, oddRow, negRow, step4Row, step7Row] = listRows;
/** Ters yazıp toplama çizimi için kısa liste. */
export const reverseSumRow208 = step4Row;
for (const row of listRows) {
  // Tek terim sayısında ortalama ortanca terimdir; çiftte iki terimin arasındadır.
  if (row.n % 2 === 1) guard(row.middle === row.mean, "tek n için ortalama ortanca terim olmalı");
  else guard(!row.terms.includes(row.mean), "çift n için ortalama listede olmamalı");
}
guard(natRow.first === 1 && natRow.step === 1 && evenRow.first === 2 && oddRow.first === 1, "kısa kural satırları 1 veya 2’den başlamalı");
const negCancel = negRow.terms.filter((x) => !negRow.terms.includes(-x));
guard(negRow.terms.filter((x) => negRow.terms.includes(-x)).reduce((s, x) => s + x, 0) === 0
  && negCancel.reduce((s, x) => s + x, 0) === negRow.sum, "karşıt terimler birbirini götürmeli");
const listText = ({ first, step, last }: ArithmeticList208) => `${signed208(first)}, ${signed208(first + step)}, …, ${signed208(last)}`;
const paren = (x: number) => (x < 0 ? `(${signed208(x)})` : String(x));
const listTable = {
  layout: "table" as const,
  headers: ["Liste", "Adım", "n = (son − ilk)/adım + 1", "S = n(ilk + son)/2", "Ortalama", "Kısa kural"],
  rows: listRows.map((row) => [
    `${row.name}: ${listText(row)}`,
    String(row.step),
    `(${row.last} − ${paren(row.first)})/${row.step} + 1 = ${row.n}`,
    `${row.n}·(${signed208(row.first)} + ${row.last})/2 = ${row.sum}`,
    decimal208(row.mean),
    row.ruleText,
  ]),
};

export const arithmeticSection208: GuideSection = {
  title: "Altı listede terim sayısını ve toplamı aynı formülle bul",
  figureTitle: "Altı listede terim sayısını ve toplamı aynı formülle bul",
  paragraphs: [
    `Her satırda üç bilgi yeter: ilk terim, son terim ve adım. Terim sayısı, ilk ile son arasındaki aralık sayısına 1 eklenerek bulunur. Eklenen 1 ilk terimin kendisidir. Toplam ise terim sayısı ile ilk ve son terimin ortalamasının çarpımıdır. ${listRows.length} satırın hepsinde formül, terimleri tek tek toplayan hesapla aynı sonucu verir.`,
    `İlk üç satır kısa kuralların kaynağıdır. 1’den ${natRow.last} sayısına kadar toplam ${natRow.sum}, ilk ${evenRow.n} pozitif çiftin toplamı ${evenRow.sum}, ilk ${oddRow.n} pozitif tekin toplamı ${oddRow.sum} olur. Kısa kural yalnız liste 1 veya 2’den başlıyorsa kullanılır. ${listText(negRow)} listesinde karşıt terimler birbirini götürür ve geriye ${negCancel.join(" + ")} = ${negRow.sum} kalır.`,
    `Terim sayısı tekse ortalama listedeki ortanca terimdir: ${listText(step7Row)} listesinde n = ${step7Row.n} ve ortanca terim ${step7Row.middle} olur. Terim sayısı çiftse ortalama iki terimin arasında kalır. ${listText(natRow)} listesinin ortalaması ${decimal208(natRow.mean)} bir terim değildir, yine de toplam ${natRow.n}·${decimal208(natRow.mean)} = ${natRow.sum} verir.`,
  ],
  table: listTable,
};

export const arithmeticExamples208: WorkedExample[] = [
  {
    title: "Toplamdan ortalamaya, ortalamadan uçlara",
    prompt: "Ardışık 12 tek sayının toplamı 216’dır. Bu sayıların en büyüğü kaçtır?",
    strategy: "Toplamı terim sayısına bölüp ortalamayı bul. Ortalama, ilk ve son terimin ortalamasıdır. Uçlar arasındaki farkı adım ve terim sayısından yaz.",
    steps: [
      { label: "Ortalama", expression: "216/12 = 18", explanation: "Eşit aralıklı listede toplam = n · ortalama." },
      { label: "Uçların toplamı", expression: "ilk + son = 2·18 = 36", explanation: "Ortalama (ilk + son)/2 olduğu için." },
      { label: "Uçların farkı", expression: "son − ilk = 2·(12 − 1) = 22", explanation: "12 terim arasında 11 adım vardır ve her adım 2’dir." },
      { label: "Çöz", expression: "son = (36 + 22)/2 = 29", explanation: "İlk terim 7 olur." },
    ],
    answer: "En büyük sayı 29.",
    check: "7, 9, …, 29 listesinde (29 − 7)/2 + 1 = 12 terim ve 12·(7 + 29)/2 = 216.",
    pitfall: "Ortalama 18’i listede bir terim sanmak. Terim sayısı çift olduğu için ortalama iki tek sayının arasındadır.",
  },
  {
    title: "Açık aralıkta bir sayının katlarını topla",
    prompt: "100 ile 200 arasındaki 7’nin katlarının toplamı kaçtır? 100 ve 200 aralığa dahil değildir.",
    strategy: "Aralıktaki ilk ve son katı bul. Adım 7 olan listede terim sayısını ve toplamı formülle hesapla.",
    steps: [
      { label: "İlk kat", expression: "7·14 = 98 < 100 < 105 = 7·15", explanation: "100’den büyük ilk kat 105’tir." },
      { label: "Son kat", expression: "7·28 = 196 < 200 < 203 = 7·29", explanation: "200’den küçük son kat 196’dır." },
      { label: "Terim sayısı", expression: "(196 − 105)/7 + 1 = 14", explanation: "Aynı sonuç 28 − 15 + 1 = 14 sayımından da çıkar." },
      { label: "Toplam", expression: "14·(105 + 196)/2 = 7·301 = 2107", explanation: "n(ilk + son)/2 formülü." },
    ],
    answer: "Toplam 2107.",
    check: "7·(15 + 16 + … + 28) = 7·301 = 2107.",
    pitfall: "100/7 ≈ 14,3 sonucunu yuvarlayıp ilk terimi 98 almak. 98 aralığın dışındadır.",
  },
];

export const arithmeticSupplement208 = {
  title: arithmeticSection208.title,
  figureTitle: arithmeticSection208.title,
  paragraphs: arithmeticSection208.paragraphs,
  summary: `n = (son − ilk)/adım + 1, S = n(ilk + son)/2. 1’den ${natRow.last} sayısına ${natRow.sum}, ilk ${evenRow.n} çift ${evenRow.sum}, ilk ${oddRow.n} tek ${oddRow.sum}. n tekse ortalama ortanca terimdir.`,
  appendSection: true as const,
  table: listTable,
  examples: arithmeticExamples208,
};

/* =====================================================================
 * Sayı problemleri: sözcük sırası işlem sırasıdır
 * ===================================================================== */

export interface WordOp208 { phrase: string; apply: (x: Q208) => Q208 }
const half: WordOp208 = { phrase: "yarısı", apply: (x) => qMul208(x, q208(1, 2)) };
const plus = (k: number): WordOp208 => ({ phrase: `${k} fazlası`, apply: (x) => qAdd208(x, q208(k)) });
const minus = (k: number): WordOp208 => ({ phrase: `${k} eksiği`, apply: (x) => qSub208(x, q208(k)) });
const times = (m: number): WordOp208 => ({ phrase: `${m} katı`, apply: (x) => qMul208(x, q208(m)) });
const square: WordOp208 = { phrase: "karesi", apply: (x) => qMul208(x, x) };
const inverse: WordOp208 = { phrase: "tersi", apply: (x) => qDiv208(one, x) };
/** Türkçe iyelik zinciri: “sayının yarısının 4 fazlası”. Son sözcük en dıştaki işlemdir. */
const phraseOf = (ops: readonly WordOp208[]) => `Sayının ${ops.map((op, i) => (i === ops.length - 1 ? op.phrase : op.phrase.replace(/ı$/, "ının").replace(/i$/, "inin"))).join(" ")}`;

export const wordShift208 = 4;
export const wordScale208 = 2;
export const wordSquareShift208 = 3;
export const wordInverseScale208 = 3;
export const wordSamples208 = [6, 10] as const;
const wordSpecs: readonly { ops: readonly WordOp208[]; expression: string }[] = [
  { ops: [half, plus(wordShift208)], expression: `x/2 + ${wordShift208}` },
  { ops: [plus(wordShift208), half], expression: `(x + ${wordShift208})/2` },
  { ops: [square, times(wordScale208)], expression: `${wordScale208}x²` },
  { ops: [times(wordScale208), square], expression: `(${wordScale208}x)²` },
  { ops: [minus(wordSquareShift208), square], expression: `(x − ${wordSquareShift208})²` },
  { ops: [square, minus(wordSquareShift208)], expression: `x² − ${wordSquareShift208}` },
  { ops: [inverse, times(wordInverseScale208)], expression: `${wordInverseScale208}/x` },
  { ops: [times(wordInverseScale208), inverse], expression: `1/(${wordInverseScale208}x)` },
];
export const runOps208 = (ops: readonly WordOp208[], x: Q208) => ops.reduce((value, op) => op.apply(value), x);
export const wordRows208 = () => wordSpecs.map(({ ops, expression }) => ({
  phrase: phraseOf(ops),
  expression,
  ops: ops.map(({ phrase }) => phrase),
  run: (x: Q208) => runOps208(ops, x),
  /** Her işlemden sonraki ara değerler (çizim bunları kutulara yazar). */
  stages: (x: Q208) => ops.reduce<Q208[]>((out, op) => [...out, op.apply(out[out.length - 1])], [x]),
  values: wordSamples208.map((x) => runOps208(ops, q208(x))),
}));
const wordRows = wordRows208();
const wordValue6 = (i: number) => wordRows[i].values[0];
// Yargılar: −20…20 aralığındaki (ters için sıfırdan farklı) her tam sayıda.
const wordRange = Array.from({ length: 41 }, (_, i) => i - 20);
for (const x of wordRange.map((k) => q208(k))) {
  guard(qEq208(qSub208(wordRows[0].run(x), wordRows[1].run(x)), q208(wordShift208, 2)), "yarısının k fazlası her x için k/2 büyük olmalı");
  guard(qEq208(wordRows[3].run(x), qMul208(q208(wordScale208), wordRows[2].run(x))), "m katının karesi, karesinin m katının m katı olmalı");
  if (x.n !== 0) guard(qEq208(wordRows[6].run(x), qMul208(q208(wordInverseScale208 ** 2), wordRows[7].run(x))), "tersinin m katı, m katının tersinin m² katı olmalı");
}
export const squareShiftMeet208 = q208(wordSquareShift208 + 1, 2);
guard(qEq208(wordRows[4].run(squareShiftMeet208), wordRows[5].run(squareShiftMeet208))
  && wordRange.filter((k) => qEq208(wordRows[4].run(q208(k)), wordRows[5].run(q208(k)))).length === (Number.isInteger((wordSquareShift208 + 1) / 2) ? 1 : 0),
  "(x − k)² ile x² − k yalnız x = (k + 1)/2 noktasında eşit olmalı");
const wordTable = {
  layout: "table" as const,
  headers: ["Cümle (sayı x)", "İfade", ...wordSamples208.map((x) => `x = ${x}`)],
  rows: wordRows.map(({ phrase, expression, values }) => [phrase, expression, ...values.map(qText208)]),
};

export const wordSection208: GuideSection = {
  title: "Aynı sözcükler farklı sırada farklı ifade kurar",
  figureTitle: "Aynı sözcükler farklı sırada farklı ifade kurar",
  paragraphs: [
    `Tabloda sayı x ile gösterilir. Ters alınan satırlarda x sıfır olamaz. Satırlar ikişer ikişer aynı sözcükleri farklı sırayla kullanır. Cümlede ilk söylenen işlem ilk yapılır, son sözcük en dıştaki işlemdir. “${wordRows[0].phrase.toLowerCase()}” cümlesinde önce yarı alınır, sonra ${wordShift208} eklenir: ${wordRows[0].expression}. “${wordRows[1].phrase.toLowerCase()}” önce ${wordShift208} ekler, sonra bütün toplamı yarıya böler: ${wordRows[1].expression}.`,
    `x = ${wordSamples208[0]} için ilk çiftin değerleri ${qText208(wordValue6(0))} ve ${qText208(wordValue6(1))} olur. Aradaki fark x’e bağlı değildir: ilk ifade her x için ${qText208(q208(wordShift208, 2))} büyüktür. ${wordScale208} katının karesi, karesinin ${wordScale208} katının ${wordScale208} katıdır. x = ${wordSamples208[0]} için ${qText208(wordValue6(3))} ile ${qText208(wordValue6(2))} çıkar. Tersinin ${wordInverseScale208} katı ise ${wordInverseScale208} katının tersinin ${wordInverseScale208 ** 2} katıdır.`,
    `${wordRows[4].expression} ile ${wordRows[5].expression} yalnız x = ${qText208(squareShiftMeet208)} için eşittir. x = ${wordSamples208[0]} için ${qText208(wordValue6(4))} ve ${qText208(wordValue6(5))} çıkar. Bir cümleyi ifadeye çevirdikten sonra küçük bir sayı yerine koy. İki okuma farklı sonuç veriyorsa parantezin yerini cümleye göre yeniden kontrol et.`,
  ],
  table: wordTable,
};

export const wordExamples208: WorkedExample[] = [
  {
    title: "Kare parantezin tamamına uygulanır",
    prompt: "Bir sayının 3 eksiğinin karesi, aynı sayının karesinden 33 eksiktir. Sayı kaçtır?",
    strategy: "İki cümleyi ayrı ifadeye çevir. Sol tarafta önce 3 çıkar, sonra kare alınır. Sağ tarafta önce kare alınır, sonra 33 çıkar.",
    steps: [
      { label: "Sol taraf", expression: "(x − 3)²", explanation: "“3 eksiğinin karesi”: son sözcük kare, en dıştaki işlemdir." },
      { label: "Sağ taraf", expression: "x² − 33", explanation: "“Karesinden 33 eksik”: önce kare, sonra çıkarma." },
      { label: "Aç ve eşitle", expression: "x² − 6x + 9 = x² − 33", explanation: "x² iki tarafta da vardır ve sadeleşir." },
      { label: "Çöz", expression: "−6x = −42 ⇒ x = 7", explanation: "Kalan doğrusal denklemdir." },
    ],
    answer: "Sayı 7.",
    check: "(7 − 3)² = 16 ve 7² − 33 = 49 − 33 = 16.",
    pitfall: "(x − 3)² yerine x² − 9 yazmak. Kare bütün parantezi kapsar ve −6x terimi oluşur.",
  },
  {
    title: "Yarısının fazlası ile fazlasının üçte biri",
    prompt: "Bir sayının yarısının 4 fazlası, aynı sayının 4 fazlasının üçte birine eşittir. Sayı kaçtır?",
    strategy: "Her cümlede hangi işlemin önce yapıldığını yaz. Paydaları 6 ile çarparak kaldır.",
    steps: [
      { label: "Sol taraf", expression: "x/2 + 4", explanation: "Önce yarısı alınır, sonra 4 eklenir." },
      { label: "Sağ taraf", expression: "(x + 4)/3", explanation: "Önce 4 eklenir, sonra bütün toplamın üçte biri alınır." },
      { label: "Paydayı kaldır", expression: "3x + 24 = 2x + 8", explanation: "İki tarafı 6 ile çarp." },
      { label: "Çöz", expression: "x = −16", explanation: "Sayı negatif olabilir, soruda sayının türü sınırlanmamıştır." },
    ],
    answer: "Sayı −16.",
    check: "−16/2 + 4 = −4 ve (−16 + 4)/3 = −12/3 = −4.",
    pitfall: "“4 fazlasının üçte biri”ni x/3 + 4 diye okumak. Bu okuma x = 0 verir ve x = 0 için (0 + 4)/3 ≠ 4 olduğu görülür.",
  },
];

export const wordSupplement208 = {
  title: wordSection208.title,
  figureTitle: wordSection208.title,
  paragraphs: wordSection208.paragraphs,
  summary: `İlk söylenen işlem ilk yapılır. ${wordRows[0].expression} ile ${wordRows[1].expression} farkı hep ${qText208(q208(wordShift208, 2))}. ${wordRows[3].expression} = ${wordScale208}·${wordRows[2].expression}. ${wordRows[4].expression} ≠ ${wordRows[5].expression}, yalnız x = ${qText208(squareShiftMeet208)} eşitler.`,
  appendSection: true as const,
  table: wordTable,
  examples: wordExamples208,
};

/* =====================================================================
 * Kesir problemleri: dört adımlı harcamayı başlangıca çevir
 * ===================================================================== */

export const chainTotal208 = 360;
export const chainFractions208: readonly Q208[] = [q208(1, 3), q208(1, 4), q208(2, 5), q208(1, 6)];
export const chainRows208 = (total = chainTotal208, fractions = chainFractions208) => {
  let share = one;
  return fractions.map((r, i) => {
    const before = share;
    const usedShare = qMul208(r, before);
    share = qMul208(before, qSub208(one, r));
    return {
      step: i + 1,
      fraction: r,
      before,
      usedShare,
      used: (total * usedShare.n) / usedShare.d,
      remainingShare: share,
      remaining: (total * share.n) / share.d,
      base: (total * before.n) / before.d,
    };
  });
};
const chainRows = chainRows208();
const chainLast = chainRows[chainRows.length - 1];
const chainUsedTotal = chainRows.reduce((s, r) => qAdd208(s, r.usedShare), q208(0));
export const chainMinTotal208 = chainRows.reduce((m, r) => lcm(lcm(m, r.usedShare.d), r.remainingShare.d), 1);
guard(qEq208(qAdd208(chainUsedTotal, chainLast.remainingShare), one), "kullanılan paylar ile son kalan pay toplamı 1 olmalı");
guard(qEq208(chainLast.remainingShare, chainFractions208.reduce((p, r) => qMul208(p, qSub208(one, r)), one)), "son kalan pay kalan çarpanlarının çarpımı olmalı");
guard(chainRows.reduce((s, r) => s + r.used, 0) === chainTotal208 - chainLast.remaining, "kullanılan miktarların toplamı tutmalı");
guard(chainRows.every((r) => Number.isInteger(r.used) && Number.isInteger(r.remaining)), "ara miktarlar tam lira olmalı");
guard(chainTotal208 % chainMinTotal208 === 0 && chainRows208(chainMinTotal208).every((r) => Number.isInteger(r.used) && Number.isInteger(r.remaining))
  && Array.from({ length: chainMinTotal208 - 1 }, (_, i) => i + 1).every((t) => !chainRows208(t).every((r) => Number.isInteger(r.used) && Number.isInteger(r.remaining))),
  "en küçük tam başlangıç EKOK olmalı");
const [chainA, chainB, chainC] = chainRows;
const qLess = (x: Q208, y: Q208) => x.n * y.d < y.n * x.d;
guard(qLess(chainA.fraction, chainC.fraction) && chainC.used < chainA.used, "büyük kesir küçülen tabanda daha az miktar vermeli");
const chainTable = {
  layout: "table" as const,
  headers: ["Adım", "Kalanın kesri", "Başlangıca göre", `Kullanılan (${chainTotal208} TL’den)`, "Kalan pay", "Kalan (TL)"],
  rows: [
    ...chainRows.map((r) => [
      `${r.step}. adım`,
      qText208(r.fraction),
      `${qText208(r.fraction)}·${qText208(r.before)} = ${qText208(r.usedShare)}`,
      String(r.used),
      qText208(r.remainingShare),
      String(r.remaining),
    ]),
    ["Toplam", "—", qText208(chainUsedTotal), String(chainTotal208 - chainLast.remaining), qText208(chainLast.remainingShare), String(chainLast.remaining)],
  ],
};

export const chainSection208: GuideSection = {
  title: "Dört adımlı harcamada her kesri başlangıca çevir",
  figureTitle: "Dört adımlı harcamada her kesri başlangıca çevir",
  paragraphs: [
    `Başlangıçta ${chainTotal208} TL var. Her adımdaki kesir o anki kalana uygulanır. Tablonun üçüncü sütunu bu kesri başlangıca çevirir: adımın kesri ile o ana kadar kalan payın çarpımı. ${chainB.step}. adımda kalan pay ${qText208(chainB.before)} ve kesir ${qText208(chainB.fraction)}. Başlangıca göre ${qText208(chainB.usedShare)} kullanılır, yani ${chainB.used} TL.`,
    `Son kalan pay, kalan çarpanlarının çarpımıdır: ${chainFractions208.map((r) => qText208(qSub208(one, r))).join("·")} = ${qText208(chainLast.remainingShare)}. Bu ${chainLast.remaining} TL eder. Başlangıca göre kullanılan dört pay ile son kalan pay toplanınca 1 çıkar. Bu toplam, ara adımlarda kesir hatası yapılmadığını denetler.`,
    `${chainC.step}. adımın kesri ${qText208(chainC.fraction)}, ilk adımın kesri ${qText208(chainA.fraction)} değerinden büyüktür. Yine de ${chainC.step}. adımda ${chainC.used} TL, ilk adımda ${chainA.used} TL kullanılır, çünkü taban ${chainC.base} TL’ye inmiştir. Bütün ara miktarların tam lira çıkması için başlangıç, tablodaki paydaların EKOK’unun katı olmalıdır. Bu zincirde en küçük başlangıç ${chainMinTotal208} TL olur.`,
  ],
  table: chainTable,
};

export const chainExamples208: WorkedExample[] = [
  {
    title: "Kullanılan ile kalanın farkından bütünü bul",
    prompt: "Bir depodaki suyun önce 1/4’ü, sonra kalanın 1/3’ü, sonra yeni kalanın 1/2’si kullanılıyor. Kullanılan toplam su, depoda kalan sudan 60 L fazladır. Depoda başlangıçta kaç L su vardı?",
    strategy: "Başlangıca N de. Kalan çarpanlarını çarpıp son kalanı N cinsinden yaz. Kullanılan, N ile son kalanın farkıdır.",
    steps: [
      { label: "Kalan çarpanları", expression: "N·(3/4)·(2/3)·(1/2) = N/4", explanation: "Her adımda kalanın 1 − kesir kadarı kalır." },
      { label: "Kullanılan", expression: "N − N/4 = 3N/4", explanation: "Üç adımın toplam kullanımı." },
      { label: "Fark", expression: "3N/4 − N/4 = N/2 = 60", explanation: "Kullanılan, kalandan 60 L fazladır." },
      { label: "Çöz", expression: "N = 120", explanation: "Her adımda 30 L kullanılır." },
    ],
    answer: "Başlangıçta 120 L su vardı.",
    check: "120 L’nin 1/4’ü 30 L, kalan 90 L’nin 1/3’ü 30 L, kalan 60 L’nin 1/2’si 30 L. Kullanılan 90 L, kalan 30 L ve fark 60 L.",
    pitfall: "Üç kesri toplayıp 1/4 + 1/3 + 1/2 = 13/12 bulmak. Kesirler farklı tabanlara aittir ve doğrudan toplanmaz.",
  },
  {
    title: "Taban sözcüğü değişince çarpanı yeniden seç",
    prompt: "Bir öğrenci kitabın ilk gün 2/9’unu, ikinci gün kalan sayfaların 3/7’sini, üçüncü gün kitabın tamamının 1/6’sını okuyor. Geriye 40 sayfa kalıyor. Kitap kaç sayfadır?",
    strategy: "Her günün okumasını başlangıca göre pay olarak yaz. Üçüncü günün tabanı ‘kitabın tamamı’dır, kalan değildir.",
    steps: [
      { label: "1. gün", expression: "2/9", explanation: "Kalan pay 7/9 olur." },
      { label: "2. gün", expression: "(3/7)·(7/9) = 1/3", explanation: "Kalanın kesri başlangıca çevrilir." },
      { label: "3. gün", expression: "1/6", explanation: "‘Kitabın tamamının’ ifadesi başlangıcı taban yapar." },
      { label: "Kalan pay", expression: "1 − 2/9 − 1/3 − 1/6 = 5/18", explanation: "Paydalar 18’de eşitlenir: 18 − 4 − 6 − 3 = 5." },
      { label: "Çöz", expression: "(5/18)·N = 40 ⇒ N = 144", explanation: "40·18/5 = 144." },
    ],
    answer: "Kitap 144 sayfadır.",
    check: "144’ün 2/9’u 32, kalan 112’nin 3/7’si 48, 144’ün 1/6’sı 24. 144 − 32 − 48 − 24 = 40.",
    pitfall: "Üçüncü günün 1/6’sını da kalana uygulamak. ‘Tamamının’ sözcüğü tabanı başlangıca geri götürür.",
  },
];

export const chainSupplement208 = {
  title: chainSection208.title,
  figureTitle: chainSection208.title,
  paragraphs: chainSection208.paragraphs,
  summary: `Kalanın kesri × kalan pay = başlangıca göre pay. ${chainTotal208} TL için kullanılanlar ${chainRows.map((r) => r.used).join(", ")} TL, son kalan ${qText208(chainLast.remainingShare)} yani ${chainLast.remaining} TL. Paylar ile son kalanın toplamı 1.`,
  appendSection: true as const,
  table: chainTable,
  examples: chainExamples208,
};

/* =====================================================================
 * Rasyonel sayılar: devirli ondalık ↔ kesir kural tablosu
 * ===================================================================== */

/** tam,devretmeyen(devreden): 2,1(36) = 2,13636… */
export interface Repeating208 { whole: number; fixed: string; period: string }
export const repeatingDecimals208: readonly Repeating208[] = [
  { whole: 0, fixed: "", period: "3" },
  { whole: 0, fixed: "", period: "45" },
  { whole: 0, fixed: "1", period: "2" },
  { whole: 0, fixed: "8", period: "3" },
  { whole: 1, fixed: "", period: "2" },
  { whole: 2, fixed: "1", period: "36" },
  { whole: 0, fixed: "", period: "9" },
];
export const repeatingText208 = ({ whole, fixed, period }: Repeating208) => `${whole},${fixed}(${period})`;
export const repeatingOpen208 = ({ whole, fixed, period }: Repeating208, digits = 6) => {
  let tail = fixed;
  const shown = Math.max(digits, fixed.length + period.length * 2);
  while (tail.length < shown) tail += period;
  return `${whole},${tail.slice(0, shown)}…`;
};
/** p/q’nun ondalık açılımı: tam kısım, devretmeyen ve devreden basamaklar (sonluysa devreden boş). */
export const expand208 = ({ n, d }: Q208): Repeating208 => {
  guard(n >= 0 && d > 0, "açılım pozitif kesir için");
  const whole = Math.floor(n / d);
  let r = n % d;
  const seen = new Map<number, number>();
  let digits = "";
  while (r !== 0 && !seen.has(r)) {
    seen.set(r, digits.length);
    r *= 10;
    digits += String(Math.floor(r / d));
    r %= d;
  }
  if (r === 0) return { whole, fixed: digits, period: "" };
  const start = seen.get(r)!;
  return { whole, fixed: digits.slice(0, start), period: digits.slice(start) };
};
const primeFactors = (n: number) => {
  const out: number[] = [];
  for (let p = 2, m = n; m > 1; p += 1) while (m % p === 0) { if (!out.includes(p)) out.push(p); m /= p; }
  return out;
};
export const repeatingRows208 = () => repeatingDecimals208.map((x) => {
  const all = Number(`${x.whole}${x.fixed}${x.period}`);
  const kept = Number(`${x.whole}${x.fixed}`);
  const denominator = Number("9".repeat(x.period.length) + "0".repeat(x.fixed.length));
  const value = q208(all - kept, denominator);
  return { ...x, all, kept, raw: all - kept, denominator, value, back: expand208(value), primes: primeFactors(value.d) };
});
const repRows = repeatingRows208();
const nines = repRows.filter((r) => /^9+$/.test(r.period));
const proper = repRows.filter((r) => !/^9+$/.test(r.period));
guard(nines.length === 1 && repRows.at(-1) === nines[0] && proper.every((r, i) => repRows[i] === r), "devreden 9 yalnız son satırda olmalı");
// Yargı: kural kesri uzun bölmede aynı devri geri verir; paydada 2 ve 5 dışında asal bulunur.
for (const r of proper) {
  guard(r.back.whole === r.whole && r.back.fixed === r.fixed && r.back.period === r.period, "uzun bölme aynı devri vermeli");
  guard(r.primes.some((p) => p !== 2 && p !== 5), "devirli sayının sade paydasında 2 ve 5 dışında asal olmalı");
}
// Yargı: devreden 9 sonlu bir sayının ikinci yazılışıdır.
for (const r of nines) guard(r.back.period === "" && r.value.d === 1, "0,(9) bir tam sayıya eşit olmalı");
const [rep3, rep45, rep12, rep83, rep2whole, rep136, rep9] = repRows;
/** Kaydırma çizimi için devretmeyen basamaklı satır. */
export const repeatingFigureRow208 = rep83;
const ruleText = (r: (typeof repRows)[number]) => `(${r.all} − ${r.kept})/${r.denominator} = ${r.raw}/${r.denominator}`;
const repTable = {
  layout: "table" as const,
  headers: ["Devirli yazım", "Açık yazım", "Devreden / devretmeyen basamak", "Kural", "Sade kesir"],
  rows: repRows.map((r) => [repeatingText208(r), repeatingOpen208(r), `${r.period.length} / ${r.fixed.length}`, ruleText(r), qText208(r.value)]),
};

export const repeatingSection208: GuideSection = {
  title: "Devirli ondalığı tek kuralla kesre çevir",
  figureTitle: "Devirli ondalığı tek kuralla kesre çevir",
  paragraphs: [
    `Tabloda parantez içindeki basamak grubu sonsuza kadar tekrar eder. Örneğin ${repeatingText208(rep45)} sayısı ${repeatingOpen208(rep45)} biçiminde sürer. Kural şudur: pay, virgülü yok sayıp bütün basamaklarla yazılan sayıdan devretmeyen kısmın çıkarılmasıdır. Paydada devreden basamak sayısı kadar 9, onların arkasında devretmeyen ondalık basamak sayısı kadar 0 bulunur.`,
    `${repeatingText208(rep83)} için pay ${rep83.all} − ${rep83.kept} = ${rep83.raw}, payda ${rep83.denominator}. Sadeleşince ${qText208(rep83.value)} olur. Bu kural x’i ${10 ** rep83.fixed.length} ve ${10 ** (rep83.fixed.length + rep83.period.length)} ile çarpıp iki eşitliği çıkarmanın kısa yazılışıdır. Tam kısım da kurala girer: ${repeatingText208(rep136)} için (${rep136.all} − ${rep136.kept})/${rep136.denominator} = ${qText208(rep136.value)}.`,
    `İlk ${proper.length} satırda sade kesrin payı paydasına bölününce aynı devir geri gelir. Bu satırların sade paydaları ${proper.map((r) => r.value.d).join(", ")} olur. Hepsinde 2 ve 5 dışında bir asal çarpan vardır, bu yüzden açılım sonlu olamaz. Son satır bir istisnadır: ${repeatingText208(rep9)} = ${rep9.raw}/${rep9.denominator} = ${qText208(rep9.value)}. Bu, ${qText208(rep9.value)} sayısının ikinci bir yazılışıdır; ondan küçük bir sayı değildir.`,
  ],
  table: repTable,
};

export const repeatingExamples208: WorkedExample[] = [
  {
    title: "İki devirli sayıyı kesirle topla",
    prompt: "0,(3) + 0,(45) toplamını sade kesir olarak ve devirli ondalık olarak yaz. Parantez içindeki basamaklar sonsuza kadar tekrar eder.",
    strategy: "Her sayıyı kuralla kesre çevir, ortak paydada topla. Sonucu bölerek yeniden ondalığa çevir.",
    steps: [
      { label: "Kesre çevir", expression: "0,(3) = 3/9 = 1/3, 0,(45) = 45/99 = 5/11", explanation: "Devreden basamak sayısı kadar 9." },
      { label: "Topla", expression: "1/3 + 5/11 = 11/33 + 15/33 = 26/33", explanation: "Ortak payda 33." },
      { label: "Ondalığa çevir", expression: "26/33 = 78/99 = 0,(78)", explanation: "Paydayı 99’a genişletince iki basamaklı devir görünür." },
    ],
    answer: "26/33 = 0,(78).",
    check: "0,333333… + 0,454545… = 0,787878… ve 26 ÷ 33 = 0,7878…",
    pitfall: "0,(45) için payda 100 almak. 45/100 = 0,45 sonlu bir sayıdır, devirli değildir.",
  },
  {
    title: "Devretmeyen basamaklı sayıları çıkar",
    prompt: "1,(2) − 0,8(3) farkını sade kesir olarak bul. 1,(2) = 1,222… ve 0,8(3) = 0,8333… sayılarıdır.",
    strategy: "İki sayıyı kuralla kesre çevir. Kırpılmış ondalıklarla çalışma, kesin sonucu kesir verir.",
    steps: [
      { label: "1,(2)", expression: "(12 − 1)/9 = 11/9", explanation: "Bir devreden basamak, devretmeyen ondalık yok." },
      { label: "0,8(3)", expression: "(83 − 8)/90 = 75/90 = 5/6", explanation: "Bir devreden basamak için 9, bir devretmeyen basamak için 0." },
      { label: "Çıkar", expression: "11/9 − 5/6 = 22/18 − 15/18 = 7/18", explanation: "Ortak payda 18." },
    ],
    answer: "7/18 = 0,3(8).",
    check: "1,2222… − 0,8333… = 0,3888… ve 7 ÷ 18 = 0,3888…",
    pitfall: "1,22 − 0,83 = 0,39 yazmak. Kırpılmış ondalıklar yaklaşık sonuç verir, kesin fark 7/18’dir.",
  },
];

export const repeatingSupplement208 = {
  title: repeatingSection208.title,
  figureTitle: repeatingSection208.title,
  paragraphs: repeatingSection208.paragraphs,
  summary: `Pay: bütün basamaklar − devretmeyen kısım. Payda: devreden kadar 9, devretmeyen ondalık kadar 0. ${repeatingText208(rep3)} = ${qText208(rep3.value)}, ${repeatingText208(rep12)} = ${qText208(rep12.value)}, ${repeatingText208(rep2whole)} = ${qText208(rep2whole.value)}, ${repeatingText208(rep9)} = ${qText208(rep9.value)}.`,
  appendSection: true as const,
  table: repTable,
  examples: repeatingExamples208,
};

/** Yeni ek alan dersler. temel-kavramlar, sayi-problemleri ve kesir-problemleri
 * eklerini theorySupplements kendi mevcut dizilerinin sonuna ekler. */
export const depth208Supplements = {
  "ardisik-sayilar": [arithmeticSupplement208],
  "rasyonel-sayilar": [repeatingSupplement208],
};
