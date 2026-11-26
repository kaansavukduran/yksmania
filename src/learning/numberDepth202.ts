import type { GuideSection, WorkedExample } from "./guides/types";

/*
 * TYT Matematik sayı temelleri derinleştirmesi (0.202.0). Kabul edilmiş
 * rehber içeriği değişmez; tablo bölümü ve ek çözümlü örnekler görüntüleme
 * katmanında eklenir. Tablo satırları ve paragraflardaki sayılar aynı
 * fonksiyonlardan üretilir, Kopya Kağıdı aynı tabloyu gösterir.
 */

/* ---------- Tek, çift, pozitif, negatif ---------- */

const parity = (n: number) => (Math.abs(n) % 2 === 0 ? "çift" : "tek");
const signed = (n: number) => (n < 0 ? `−${Math.abs(n)}` : String(n));
export const parityRows202 = () =>
  Array.from({ length: 8 }, (_, i) => i - 3).map((n) => ({
    n,
    parity: parity(n),
    unitPower: n % 2 === 0 ? 1 : -1,
    square: n * n,
    consecutive: n * (n + 1) || 0,
  }));
const parityRows = parityRows202();
const parityTable = {
  layout: "table" as const,
  headers: ["n", "Parite", "(−1)ⁿ", "n²", "n(n+1)"],
  rows: parityRows.map(({ n, parity: p, unitPower, square, consecutive }) =>
    [signed(n), p, signed(unitPower), String(square), signed(consecutive)]),
};

export const paritySection202: GuideSection = {
  title: "Negatif tam sayılarda da parite ve işaret tablosu",
  paragraphs: [
    `Tablo −3’ten 4’e kadar her tam sayı için aynı dört değeri hesaplar. Parite işarete bağlı değildir: −3 tek, −2 çifttir, çünkü −2=2·(−1). (−1)ⁿ ise yalnız n’nin paritesine bakar. Çift n için ${signed(parityRows[1].unitPower)}, tek n için ${signed(parityRows[0].unitPower)} çıkar.`,
    `n² sütunundaki hiçbir değer negatif değildir ve n ile aynı pariteyi taşır. n(n+1) sütununda ${parityRows.map(({ consecutive }) => signed(consecutive)).join(", ")} değerlerinin hepsi çifttir. Ardışık iki tam sayıdan biri mutlaka çift olduğu için bu çarpım her n için çifttir. n=−1 ve n=0’da çarpım 0 olur, 0 da çift bir sayıdır.`,
  ],
  table: parityTable,
};

export const parityExamples202: WorkedExample[] = [
  {
    title: "Her terimin paritesini ayrı yaz, sonra topla",
    prompt: "a tek ve b çift tam sayılardır. a²+ab+b² ifadesi tek mi, çift mi?",
    strategy: "Üç terimin paritesini ayrı bul. Toplamda yalnız tek terimlerin sayısı önemlidir.",
    steps: [
      { label: "a²", expression: "tek·tek=tek", explanation: "Tek sayının karesi tektir." },
      { label: "ab ve b²", expression: "tek·çift=çift, çift·çift=çift", explanation: "İçinde çift çarpan olan çarpım çifttir." },
      { label: "Topla", expression: "tek+çift+çift=tek", explanation: "Toplamda bir tane tek terim var, sonuç tektir." },
    ],
    answer: "Tek.",
    check: "a=1, b=2 için 1+2+4=7. a=−3, b=0 için 9+0+0=9. İkisi de tek.",
    pitfall: "b’nin sıfır olabileceğini unutup b² için yalnız pozitif çift sayılar denemek.",
  },
  {
    title: "İşareti çarpanlara ayırarak belirle",
    prompt: "x<0<y gerçek sayılardır. x³y, x−y ve y²−x ifadelerinin işaretlerini bul.",
    strategy: "Her ifadeyi işareti bilinen parçalara ayır. Kuvvette tek üs işareti korur.",
    steps: [
      { label: "x³y", expression: "(−)·(+)=−", explanation: "x³ negatif, çünkü üs tek. Pozitif y ile çarpılınca negatif." },
      { label: "x−y", expression: "(−)−(+)<0", explanation: "Negatif bir sayıdan pozitif bir sayı çıkarılır." },
      { label: "y²−x", expression: "(+)+|x|>0", explanation: "−x pozitiftir. Pozitif y² ile toplanınca pozitif." },
    ],
    answer: "x³y negatif, x−y negatif, y²−x pozitif.",
    check: "x=−2, y=1 için x³y=−8, x−y=−3, y²−x=3.",
    pitfall: "y²−x ifadesinde eksi işaretini görüp ifadeyi negatif sanmak.",
  },
];

/* ---------- Asal sayılar ---------- */

export const primesUpTo202 = (limit: number) => {
  const composite = new Array<boolean>(limit + 1).fill(false);
  const primes: number[] = [];
  for (let n = 2; n <= limit; n += 1) {
    if (composite[n]) continue;
    primes.push(n);
    for (let m = n * n; m <= limit; m += n) composite[m] = true;
  }
  return primes;
};
const primes50 = primesUpTo202(50);
export const primeDecades202 = () =>
  [0, 1, 2, 3, 4].map((d) => {
    const inRange = primes50.filter((p) => p > d * 10 && p <= d * 10 + 10);
    return { from: d * 10 + 1, to: d * 10 + 10, primes: inRange, trialLimit: Math.floor(Math.sqrt(d * 10 + 10)) };
  });
const decades = primeDecades202();
const primeTable = {
  layout: "table" as const,
  headers: ["Aralık", "Asallar", "Adet", "Deneme sınırı ⌊√(üst uç)⌋"],
  rows: decades.map(({ from, to, primes, trialLimit }) => [`${from}–${to}`, primes.join(", "), String(primes.length), String(trialLimit)]),
};

export const primeSection202: GuideSection = {
  title: "1’den 50’ye asalları onluk gruplarda say",
  paragraphs: [
    `1–50 aralığında ${primes50.length} asal vardır. İlk onlukta ${decades[0].primes.length} asal bulunur ve bunlardan yalnız 2 çifttir. Sonraki onluklarda sayı ${decades.slice(1).map(({ primes }) => primes.length).join(", ")} olarak ilerler. Asallar düzenli aralıklarla gelmez, bu yüzden bir sayının asallığı tek tek sınanır.`,
    `Son sütun, o aralıktaki en büyük sayıyı sınamak için hangi bölene kadar denemen gerektiğini gösterir. 41–50 aralığında ⌊√50⌋=${decades[4].trialLimit} olduğu için 2, 3, 5 ve 7 ile bölünmeyen her sayı asaldır. 49=7·7 bu sınırdaki bölen yüzünden elenir.`,
  ],
  table: primeTable,
};

export const primeExamples202: WorkedExample[] = [
  {
    title: "Rakam koşulunu listele, asallığı tek tek sına",
    prompt: "Rakamları toplamı 10 olan kaç tane iki basamaklı asal sayı vardır?",
    strategy: "Önce rakam toplamı 10 olan bütün iki basamaklı sayıları yaz. Sonra her birini √99’dan küçük asallarla sına.",
    steps: [
      { label: "Adaylar", expression: "19, 28, 37, 46, 55, 64, 73, 82, 91", explanation: "Onlar basamağı 1’den 9’a, birler basamağı 10’dan onlar çıkınca kalan." },
      { label: "Çiftler ve 5", expression: "28, 46, 64, 82, 55 elenir", explanation: "Çift sayılar 2’ye, 55 de 5’e bölünür." },
      { label: "Kalanlar", expression: "91=7·13 elenir. 19, 37, 73 asal", explanation: "19, 37 ve 73 için 2, 3, 5, 7 bölen değildir." },
    ],
    answer: "3 sayı: 19, 37, 73.",
    check: "Rakam toplamı 10 olan her sayı 3’e bölünmez, çünkü 10 üçün katı değil. Bu yüzden 3 ile sınama hiçbir adayı elemez.",
    pitfall: "91’i asal sanmak. 7 bölen denemesi atlanırsa 91=7·13 görülmez.",
  },
  {
    title: "Üç ardışık tek sayıdan biri 3’e bölünür",
    prompt: "p, p+2 ve p+4 sayılarının üçü de asal ise p kaçtır?",
    strategy: "Üç sayının 3’e bölümünden kalanlarını incele. Biri mutlaka 3’ün katıdır.",
    steps: [
      { label: "Kalanlar", expression: "p, p+2, p+4 ≡ p, p+2, p+1 (mod 3)", explanation: "4 sayısı 3’e bölününce 1 kalanını verir. Üç sayı 0, 1 ve 2 kalanlarının hepsini alır." },
      { label: "3’ün katı", expression: "biri 3’e bölünür", explanation: "3’e bölünen bir sayı yalnız kendisi 3 ise asal olabilir." },
      { label: "Tek aday", expression: "p=3 ⇒ 3, 5, 7", explanation: "p+2=3 veya p+4=3 olursa p asal olmaz." },
    ],
    answer: "p=3.",
    check: "p=5 için 5, 7, 9 ve 9=3·3. p=11 için 11, 13, 15 ve 15=3·5.",
    pitfall: "Yalnız birkaç değer deneyip başka çözüm olup olmadığını kanıtlamamak.",
  },
];

/* ---------- Faktöriyel ---------- */

export const factorialBig202 = (n: number) => {
  let product = 1n;
  for (let k = 2n; k <= BigInt(n); k += 1n) product *= k;
  return product;
};
const primePower = (n: number, p: number) => {
  let count = 0;
  for (let q = p; q <= n; q *= p) count += Math.floor(n / q);
  return count;
};
export const factorialZeroRows202 = () =>
  [5, 10, 15, 20, 25, 30].map((n) => ({
    n,
    fives: Math.floor(n / 5),
    twentyFives: Math.floor(n / 25),
    zeros: primePower(n, 5),
    twos: primePower(n, 2),
  }));
const zeroRows = factorialZeroRows202();
const factorialTable = {
  layout: "table" as const,
  headers: ["n", "⌊n/5⌋", "⌊n/25⌋", "Sondaki sıfır", "n! içindeki 2 sayısı"],
  rows: zeroRows.map(({ n, fives, twentyFives, zeros, twos }) => [`${n}!`, String(fives), String(twentyFives), String(zeros), String(twos)]),
};
const row25 = zeroRows[4];

export const factorialSection202: GuideSection = {
  title: "Sondaki sıfırlar ve 2 sayısı tablosu",
  paragraphs: [
    `Her sıfır bir 2·5 çifti ister. Tabloda 2 sayısı her satırda 5 sayısından fazladır, bu yüzden sondaki sıfırları 5’ler belirler. 25! satırında ⌊25/5⌋=${row25.fives} ve ⌊25/25⌋=${row25.twentyFives}. 25 iki tane 5 taşır, toplam ${row25.zeros} sıfır olur.`,
    `20!’den 25!’e geçince sıfır sayısı ${zeroRows[3].zeros}’ten ${row25.zeros}’ya sıçrar, çünkü 21, 22, 23, 24 hiç 5 taşımaz ve 25 iki tane getirir. Tablodaki son sütun aynı yöntemle 2’nin kuvvetlerini sayar: ⌊n/2⌋+⌊n/4⌋+⌊n/8⌋+… Bölünen bir faktöriyelde de payın ve paydanın 5 sayıları çıkarılır.`,
  ],
  table: factorialTable,
};

export const factorialExamples202: WorkedExample[] = [
  {
    title: "Ardışık iki sayının çarpımından n’yi bul",
    prompt: "n doğal sayı ve n!/(n−2)!=56 olduğuna göre n kaçtır?",
    strategy: "Payı (n−2)!’ye kadar aç ve sadeleştir. Kalan ifade ardışık iki sayının çarpımıdır.",
    steps: [
      { label: "Aç", expression: "n!=n(n−1)(n−2)!", explanation: "n ≥ 2 olmalı ki (n−2)! tanımlı olsun." },
      { label: "Sadeleştir", expression: "n(n−1)=56", explanation: "(n−2)! pay ve paydada aynıdır." },
      { label: "Ardışık çarpım", expression: "8·7=56 ⇒ n=8", explanation: "56’yı ardışık iki doğal sayının çarpımı olarak yaz. −7 doğal sayı değildir." },
    ],
    answer: "n=8.",
    check: "8!/6!=40.320/720=56.",
    pitfall: "n²=56 yazıp n’yi karekökle aramak.",
  },
  {
    title: "Birler basamağında 5!’ten sonrası 0’dır",
    prompt: "1!+2!+3!+…+10! toplamının birler basamağı kaçtır?",
    strategy: "5! ve sonraki her faktöriyel 2·5 içerdiği için 0 ile biter. Yalnız ilk dört terimi topla.",
    steps: [
      { label: "Sıfırla bitenler", expression: "5!=120, 6!=720, …", explanation: "n≥5 için n! hem 2 hem 5 çarpanı taşır, 10’a bölünür." },
      { label: "İlk dört terim", expression: "1+2+6+24=33", explanation: "Bu terimler birler basamağını belirler." },
      { label: "Birler basamağı", expression: "33 ⇒ 3", explanation: "Diğer terimler birler basamağına 0 ekler." },
    ],
    answer: "3.",
    check: "Toplam 4.037.913 sayısıdır ve 3 ile biter.",
    pitfall: "5!’ten sonraki terimleri de tek tek hesaplamaya çalışmak. 10’a bölünen terimler birler basamağını değiştirmez.",
  },
];

export const numberDepth202Supplements = {
  "tek-cift-isaret": [{
    title: paritySection202.title,
    paragraphs: paritySection202.paragraphs,
    summary: "Parite işarete bağlı değildir. (−1)ⁿ çift n’de 1, tek n’de −1. n² ≥ 0 ve n ile aynı paritede. n(n+1) her zaman çift.",
    appendSection: true as const,
    table: parityTable,
    examples: parityExamples202,
  }],
  "asal-sayilar": [{
    title: primeSection202.title,
    paragraphs: primeSection202.paragraphs,
    summary: `1–50 arasında ${primes50.length} asal. Bir n sayısını ⌊√n⌋’e kadar asallarla sına; 2 tek çift asaldır.`,
    appendSection: true as const,
    table: primeTable,
    examples: primeExamples202,
  }],
  "faktoriyel": [{
    title: factorialSection202.title,
    paragraphs: factorialSection202.paragraphs,
    summary: `Sondaki sıfır = ⌊n/5⌋+⌊n/25⌋+… . 25! için ${row25.zeros}, 30! için ${zeroRows[5].zeros}. 2’ler her zaman 5’lerden fazladır.`,
    appendSection: true as const,
    table: factorialTable,
    examples: factorialExamples202,
  }],
};
