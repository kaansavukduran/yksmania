import type { CheatSection } from "./cheatsheetContent";
import type { GuideSection, WorkedExample } from "./guides/types";

/*
 * Sayma ve olasılık derinleştirmesi (0.201.0): her ders için bir tablo
 * bölümü ve iki ek çözümlü örnek. Tablo satırları ve paragraflardaki sayılar
 * aynı fonksiyonlardan üretilir; Kopya Kağıdı aynı tabloyu kullanır.
 */

export const factorial = (n: number): number => {
  if (!Number.isInteger(n) || n < 0) throw new RangeError("n doğal sayı olmalı");
  let product = 1;
  for (let k = 2; k <= n; k += 1) product *= k;
  return product;
};
export const arrangements = (n: number, r: number): number =>
  r < 0 || r > n ? 0 : factorial(n) / factorial(n - r);
export const choose = (n: number, r: number): number =>
  r < 0 || r > n ? 0 : arrangements(n, r) / factorial(r);
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
export const fraction = (numerator: number, denominator: number): string => {
  const g = gcd(numerator, denominator) || 1;
  const [p, q] = [numerator / g, denominator / g];
  return q === 1 ? String(p) : `${p}/${q}`;
};
const thousands = (value: number) => value.toLocaleString("tr-TR");

/* ---------- 032 · Permütasyon ---------- */

export const permutationRows200 = (n = 6) =>
  Array.from({ length: n + 1 }, (_, r) => ({ r, ordered: arrangements(n, r), inner: factorial(r), chosen: choose(n, r) }));

const permutationTable = (() => {
  const rows = permutationRows200();
  return {
    layout: "table" as const,
    headers: ["r", "P(6,r) sıralı", "r! iç sıra", "C(6,r) = P(6,r)/r!"],
    rows: rows.map(({ r, ordered, inner, chosen }) => [String(r), thousands(ordered), String(inner), String(chosen)]),
  };
})();
const permutationThree = permutationRows200()[3];

export const permutationSection200: GuideSection = {
  title: "Altı kişiyle sıralı ve sırasız sayıyı yan yana oku",
  paragraphs: [
    `Tablonun her satırı aynı altı farklı kişiyle kurulur. r=3 satırında üç yuva 6·5·4 biçiminde dolar ve P(6,3)=${permutationThree.ordered} olur. Seçilen üç kişi kendi aralarında 3!=${permutationThree.inner} farklı sırada okunur. Sıra önemsizse her ekip ${permutationThree.inner} kez sayılmıştır, bu yüzden C(6,3)=${permutationThree.ordered}/${permutationThree.inner}=${permutationThree.chosen}.`,
    "r=0 satırında boş liste tek sonuçtur, r=6 satırında bütün kişiler kullanılır ve sıralı sayı 6!=720 olur. Sırasız sütun ortadaki satırdan iki yana simetriktir, sıralı sütun ise r büyüdükçe hiç azalmaz. Bir soruda rol, sıra veya liste geçiyorsa soldaki sütun, yalnız grup üyeliği geçiyorsa sağdaki sütun kullanılır.",
  ],
  table: permutationTable,
};

export const permutationExamples200: WorkedExample[] = [
  {
    title: "Son basamağa göre iki durum aç",
    prompt: "0, 1, 2, 3, 4, 5 rakamları kullanılarak rakamları farklı ve 5 ile tam bölünebilen kaç üç basamaklı sayı yazılır?",
    strategy: "5 ile bölünen sayının son rakamı 0 veya 5’tir. İki durumda ilk basamağın seçenek sayısı farklı olduğu için ayrı say.",
    steps: [
      { label: "Son 0", expression: "5·4=20", explanation: "Yüzler basamağına kalan beş sıfır dışı rakam, onlar basamağına kalan dört rakam gelir." },
      { label: "Son 5", expression: "4·4=16", explanation: "Yüzler basamağına 0 ve 5 dışındaki dört rakam gelir. Onlar basamağına kalan dört rakamdan biri, artık 0 da dahil." },
      { label: "Topla", expression: "20+16=36", explanation: "Bir sayının son rakamı aynı anda 0 ve 5 olamaz, durumlar ayrıktır." },
    ],
    answer: "36 sayı.",
    check: "Son 5 durumunda 0 onlar basamağına girebilir: 105, 205, 305, 405 bu dört sayının örnekleridir.",
    pitfall: "İki durumda da yüzler basamağına aynı sayıda seçenek vermek.",
  },
  {
    title: "Blok kuralından sonra başta olma yasağını çıkar",
    prompt: "A, B, C, D, E, F altı farklı kişi bir sıraya dizilecek. A ile B yan yana olacak ve C en başta olmayacak. Kaç sıra vardır?",
    strategy: "Önce A ile B bitişik bütün sıraları say. Sonra bunların içinden C’nin en başta olduklarını çıkar.",
    steps: [
      { label: "Blok", expression: "2·5!=240", explanation: "AB bloğu ve dört kişi beş nesne olarak dizilir. Blok içinde AB veya BA." },
      { label: "C başta", expression: "2·4!=48", explanation: "C ilk yere sabitlenince blok ve üç kişi dört nesne olarak kalan yerlere dizilir." },
      { label: "Fark", expression: "240−48=192", explanation: "Bitişik sıraların her biri ya C ile başlar ya başlamaz." },
    ],
    answer: "192 sıra.",
    check: "C’nin başta olduğu 48 sıra, bitişik 240 sıranın tam beşte biridir. Beş nesneden her biri eşit sayıda başa gelir, bloğun başta olduğu sıralar da 2·4!=48.",
    pitfall: "C başta olunca bloğun iki iç sırasını unutmak.",
  },
];

export const permutationSheet200: CheatSection = {
  title: "Sıralı ve sırasız tablo",
  text: [`Aynı satırda P(6,r)=C(6,r)·r!. Örnek: ${permutationThree.ordered}=${permutationThree.chosen}·${permutationThree.inner}.`],
  table: permutationTable,
};

/* ---------- 033 · Tekrarlı permütasyon ---------- */

export const multisetCases200 = [
  { label: "A, A, B", counts: [2, 1] },
  { label: "A, A, B, B", counts: [2, 2] },
  { label: "A, A, A, B, C", counts: [3, 1, 1] },
  { label: "ANKARA", counts: [3, 1, 1, 1] },
  { label: "A, A, B, B, C, C", counts: [2, 2, 2] },
] as const;
export const multisetCount200 = (counts: readonly number[]) =>
  factorial(counts.reduce((sum, count) => sum + count, 0)) / counts.reduce((product, count) => product * factorial(count), 1);

const multisetTable = {
  layout: "table" as const,
  headers: ["Kartlar", "n", "Tekrar bölenleri", "n!", "Görünür dizi"],
  rows: multisetCases200.map(({ label, counts }) => {
    const n = counts.reduce((sum, count) => sum + count, 0);
    const repeated = counts.filter((count) => count > 1).map((count) => `${count}!`).join("·");
    return [label, String(n), repeated, thousands(factorial(n)), String(multisetCount200(counts))];
  }),
};
const ankara = multisetCount200(multisetCases200[3].counts);

export const repeatedSection200: GuideSection = {
  title: "Tekrar arttıkça görünür dizi sayısı nasıl küçülür",
  paragraphs: [
    `Tablodaki her satırda önce kartlara geçici etiket verilir ve n! hesaplanır. Sonra her türün kendi iç sırası bölünür. ANKARA kelimesinde altı harf ve üç A vardır. 6!=720 etiketli dizinin her görünüşü 3!=6 kez sayılmıştır, 720/6=${ankara}.`,
    "Kart sayısı aynı kalsa da tekrarlar büyüdükçe bölen büyür. A, A, B, B, C, C altı kartında üç tür ikişer kez tekrar eder ve 720 sayısı 2!·2!·2!=8’e bölünerek 90 olur. Tek kez geçen bir harf için 1!=1 olduğu için bölen yazılmaz.",
  ],
  table: multisetTable,
};

export const repeatedExamples200: WorkedExample[] = [
  {
    title: "Özdeş harfleri tek blok yap",
    prompt: "ANKARA kelimesinin harfleriyle kaç farklı altı harfli dizi yazılır? Bunların kaçında üç A yan yana bulunur?",
    strategy: "Önce tekrarlı permütasyonla bütün dizileri say. Sonra üç A’yı tek kart sayıp kalan farklı harflerle diz.",
    steps: [
      { label: "Bütün", expression: "6!/3!=120", explanation: "Altı harf var, A üç kez tekrar eder." },
      { label: "AAA bloğu", expression: "4!=24", explanation: "AAA, N, K, R dört farklı nesnedir. Blok içi sıra tek görünüştür, çünkü A’lar özdeştir." },
    ],
    answer: "120 dizi, bunların 24’ünde A’lar yan yana.",
    check: "Bloğun başlangıç yeri 4 seçenektir ve kalan üç farklı harf 3!=6 sıradadır. 4·6=24.",
    pitfall: "Blok içinde 3! iç sıra ile çarpmak.",
  },
  {
    title: "Tek sayıda son basamağa göre tür adetlerini güncelle",
    prompt: "1, 1, 2, 2, 3 rakamlarının hepsi kullanılarak kaç beş basamaklı tek sayı yazılır?",
    strategy: "Son basamak 1 veya 3 olmalı. Her durumda kalan dört rakamın tekrarları farklı olduğu için ayrı hesapla.",
    steps: [
      { label: "Son 1", expression: "4!/2!=12", explanation: "Kalan 1, 2, 2, 3 rakamlarında yalnız 2 tekrar eder." },
      { label: "Son 3", expression: "4!/(2!·2!)=6", explanation: "Kalan 1, 1, 2, 2 rakamlarında iki tür ikişer tekrar eder." },
      { label: "Topla", expression: "12+6=18", explanation: "Son rakam iki durumdan yalnız birine uyar." },
    ],
    answer: "18 sayı.",
    check: "Bütün diziler 5!/(2!·2!)=30. Son rakamı 2 olanlar 4!/2!=12. 30−12=18 tek sayı.",
    pitfall: "Son 1 durumunda 1’in de iki kez kaldığını sanmak.",
  },
];

export const repeatedSheet200: CheatSection = {
  title: "Tekrar tablosu",
  text: [`Görünür dizi = n! / (tekrar adetlerinin faktöriyelleri). ANKARA: 720/3! = ${ankara}.`],
  table: multisetTable,
};

/* ---------- 034 · Kombinasyon ---------- */

export const combinationRows200 = (n = 7) =>
  Array.from({ length: n + 1 }, (_, r) => ({
    r,
    chosen: choose(n, r),
    outside: choose(n, n - r),
    atLeast: Array.from({ length: n - r + 1 }, (_, k) => choose(n, r + k)).reduce((a, b) => a + b, 0),
  }));
const combinationTable = {
  layout: "table" as const,
  headers: ["r", "C(7,r)", "C(7,7−r)", "En az r üyeli grup"],
  rows: combinationRows200().map(({ r, chosen, outside, atLeast }) => [String(r), String(chosen), String(outside), String(atLeast)]),
};
const combinationRows = combinationRows200();

export const combinationSection200: GuideSection = {
  title: "Yedi kişilik listeden bütün grup boyutlarını tabloya dök",
  paragraphs: [
    `Satırlar yedi farklı kişiden r kişilik grupların sayısıdır. C(7,3)=${combinationRows[3].chosen} ve C(7,4)=${combinationRows[4].chosen} eşittir, çünkü üç kişi seçmek dört kişiyi dışarıda bırakmakla aynı karardır. İkinci ve üçüncü sütun bu yüzden her satırda aynıdır.`,
    `Son sütun r ve daha büyük bütün satırların toplamıdır. r=0 satırında boş grup dahil bütün alt kümeler sayılır ve ${combinationRows[0].atLeast}=2⁷ çıkar. “En az bir kişi” için ${combinationRows[0].atLeast}−1=${combinationRows[1].atLeast}, “en az iki kişi” için ${combinationRows[1].atLeast}−7=${combinationRows[2].atLeast}. Tümleyen yöntemi bu sütunu satır satır toplamaktan daha kısa yoldur.`,
  ],
  table: combinationTable,
};

export const combinationExamples200: WorkedExample[] = [
  {
    title: "En az koşulunu ayrık durumlarla ve tümleyenle iki kez doğrula",
    prompt: "Altı kız ve dört erkek öğrenci arasından dört kişilik ekip seçilecek. Ekipte en az iki kız bulunacak. Kaç ekip vardır?",
    strategy: "Kız sayısı 2, 3 veya 4 olabilir. Her durumda kız ve erkek seçimlerini çarp, durumları topla. Sonucu tümleyenle denetle.",
    steps: [
      { label: "2 kız", expression: "C(6,2)·C(4,2)=15·6=90", explanation: "İki kız ve iki erkek ayrı listelerden seçilir." },
      { label: "3 kız", expression: "C(6,3)·C(4,1)=20·4=80", explanation: "Üç kız ve bir erkek." },
      { label: "4 kız", expression: "C(6,4)=15", explanation: "Bütün yerler kızlarla dolar." },
      { label: "Topla", expression: "90+80+15=185", explanation: "Bir ekipteki kız sayısı tektir, durumlar ayrıktır." },
    ],
    answer: "185 ekip.",
    check: "Bütün ekipler C(10,4)=210. Hiç kız yok: 1, bir kız: 6·C(4,3)=24. 210−25=185.",
    pitfall: "Önce iki kız seçip kalan iki yeri sekiz kişiden doldurmak. Bu yol aynı ekibi birden çok kez sayar.",
  },
  {
    title: "Çember üzerindeki noktalarla kiriş, üçgen ve dörtgen",
    prompt: "Bir çember üzerinde farklı 8 nokta var. Bu noktalar köşe olacak biçimde kaç kiriş, kaç üçgen ve kaç dörtgen çizilir?",
    strategy: "Çember üzerinde hiçbir üç nokta doğrusal değildir. Her şekil yalnız köşe kümesiyle belirlenir.",
    steps: [
      { label: "Kiriş", expression: "C(8,2)=28", explanation: "Her nokta çifti bir kiriş verir." },
      { label: "Üçgen", expression: "C(8,3)=56", explanation: "Her üçlü bir üçgen verir, doğrusal üçlü yok." },
      { label: "Dörtgen", expression: "C(8,4)=70", explanation: "Çember üzerindeki dört nokta tek bir dışbükey dörtgen belirler." },
    ],
    answer: "28 kiriş, 56 üçgen, 70 dörtgen.",
    check: "C(8,3)=C(8,5)=56. Her üçgen dışarıda kalan beş noktayla eşlenir.",
    pitfall: "Dört noktadan köşe sırası değişen birden çok dörtgen saymak. Çember üzerindeki noktalarda kesişmeyen tek sıra vardır.",
  },
];

export const combinationSheet200: CheatSection = {
  title: "Grup boyutu tablosu",
  text: [`C(7,r)=C(7,7−r). Bütün alt kümeler 2⁷=${combinationRows[0].atLeast}, en az bir üye ${combinationRows[1].atLeast}.`],
  table: combinationTable,
};

/* ---------- 035 · Binom ---------- */

export const pascalRows200 = (last = 6) =>
  Array.from({ length: last + 1 }, (_, n) => {
    const row = Array.from({ length: n + 1 }, (_, r) => choose(n, r));
    return { n, row, sum: row.reduce((a, b) => a + b, 0), alternating: row.reduce((a, b, r) => a + (r % 2 ? -b : b), 0) };
  });
const pascalTable = {
  layout: "table" as const,
  headers: ["n", "Katsayılar C(n,0) … C(n,n)", "Toplam (a=b=1)", "İşaretli toplam (a=1, b=−1)"],
  rows: pascalRows200().map(({ n, row, sum, alternating }) => [String(n), row.join("  "), String(sum), String(alternating)]),
};
const pascalFive = pascalRows200()[5];

export const binomialSection200: GuideSection = {
  title: "Pascal satırlarından toplamları doğrudan oku",
  paragraphs: [
    `n=5 satırı ${pascalFive.row.join(", ")} sayılarıdır. (a+b)⁵ açılımında bu sayılar sırayla a⁵, a⁴b, … , b⁵ terimlerinin katsayısıdır. a=b=1 yazınca bütün terimler 1 olur ve katsayılar toplamı 2⁵=${pascalFive.sum} çıkar.`,
    "b=−1 yazınca tek sayıda b seçilen terimler eksi olur. n≥1 olan her satırda artı ve eksi toplamlar eşittir, bu yüzden işaretli toplam 0 olur. n=0 satırında tek terim 1 olduğu için işaretli toplam 1’dir. Tabloyu okurken her satırın komşu iki üst sayının toplamı olduğunu da denetle.",
  ],
  table: pascalTable,
};

export const binomialExamples200: WorkedExample[] = [
  {
    title: "İkinci terimin kuvvetini katsayıya kat",
    prompt: "(x+2)⁵ açılımında x³ teriminin katsayısı kaçtır?",
    strategy: "Genel terim C(5,r)x^(5−r)2^r. x³ için 5−r=3 olmalı.",
    steps: [
      { label: "r", expression: "5−r=3 ⇒ r=2", explanation: "İkinci terim olan 2, iki parantezden seçilir." },
      { label: "Katsayı", expression: "C(5,2)·2²=10·4=40", explanation: "Seçim sayısı ile 2’nin karesi çarpılır." },
    ],
    answer: "40.",
    check: "Bütün katsayıların toplamı (1+2)⁵=243. 1, 10, 40, 80, 80, 32 katsayılarının toplamı da 243.",
    pitfall: "Yalnız C(5,2)=10 yazıp 2²’yi unutmak.",
  },
  {
    title: "Terim sayısından üssü bul",
    prompt: "(x+1)ⁿ açılımında 9 terim vardır. Bu açılımda x⁵ teriminin katsayısı kaçtır?",
    strategy: "(a+b)ⁿ açılımında n+1 terim vardır. Önce n’yi bul, sonra Pascal satırından katsayıyı al.",
    steps: [
      { label: "Üs", expression: "n+1=9 ⇒ n=8", explanation: "r=0’dan r=n’ye kadar n+1 terim vardır." },
      { label: "Katsayı", expression: "C(8,5)=C(8,3)=56", explanation: "İkinci terim 1 olduğu için katsayı yalnız seçim sayısıdır." },
    ],
    answer: "56.",
    check: "n=8 satırı 1, 8, 28, 56, 70, 56, 28, 8, 1 ve toplamı 2⁸=256.",
    pitfall: "Terim sayısını üs sanıp n=9 almak.",
  },
];

export const binomialSheet200: CheatSection = {
  title: "Pascal satır tablosu",
  text: [`(a+b)ⁿ açılımında n+1 terim, katsayılar toplamı 2ⁿ. n=5: ${pascalFive.row.join(", ")}.`],
  table: pascalTable,
};

/* ---------- 036 · Olasılık ---------- */

export const diceSumRows200 = () =>
  Array.from({ length: 11 }, (_, index) => {
    const sum = index + 2;
    const ways = 6 - Math.abs(sum - 7);
    const atMost = Array.from({ length: index + 1 }, (_, k) => 6 - Math.abs(k + 2 - 7)).reduce((a, b) => a + b, 0);
    return { sum, ways, probability: fraction(ways, 36), atMost: fraction(atMost, 36) };
  });
const diceTable = {
  layout: "table" as const,
  headers: ["Toplam", "Sıralı çift sayısı", "P(toplam)", "P(toplam ≤ bu değer)"],
  rows: diceSumRows200().map(({ sum, ways, probability, atMost }) => [String(sum), String(ways), probability, atMost]),
};
const diceRows = diceSumRows200();

export const probabilitySection200: GuideSection = {
  title: "İki zarın toplam tablosunda eş olası sonuçları say",
  paragraphs: [
    `İki ayırt edilebilir adil zarın 36 sıralı sonucu eş olasıdır. Toplam ise eş olası değildir. Toplam 7 için ${diceRows[5].ways} sıralı çift vardır ve olasılık ${diceRows[5].probability} olur. Toplam 2 için yalnız (1,1) vardır ve olasılık ${diceRows[0].probability} olur.`,
    `Son sütun birikimli olasılıktır. Toplamın en çok 4 olma olasılığı ${diceRows[2].atMost}, en az 5 olma olasılığı bunun tümleyeni olan 1−${diceRows[2].atMost}=${fraction(36 - 6, 36)}. Toplam sütununu olasılık sanmak, 11 farklı toplamı eş olası kabul etme hatasıdır.`,
  ],
  table: diceTable,
};

export const probabilityExamples200: WorkedExample[] = [
  {
    title: "Geri koymadan iki farklı renk çekme",
    prompt: "Bir torbada 4 kırmızı ve 3 mavi bilye var. Geri koymadan art arda iki bilye çekiliyor. İki bilyenin farklı renkte olma olasılığı kaçtır?",
    strategy: "Sıralı yolda KM ve MK dallarını topla. Sonucu sırasız kombinasyon sayımıyla denetle.",
    steps: [
      { label: "Önce kırmızı", expression: "4/7·3/6=12/42", explanation: "İlk çekimde 4 kırmızı, ikinci çekimde kalan 6 bilyeden 3 mavi." },
      { label: "Önce mavi", expression: "3/7·4/6=12/42", explanation: "İlk çekimde 3 mavi, sonra kalan 6 bilyeden 4 kırmızı." },
      { label: "Topla", expression: "24/42=4/7", explanation: "İki dal aynı anda gerçekleşmez." },
    ],
    answer: "4/7.",
    check: "Sırasız: C(4,1)·C(3,1)/C(7,2)=12/21=4/7.",
    pitfall: "Yalnız KM dalını hesaplayıp 2/7 bulmak.",
  },
  {
    title: "En az bir erkek için hiç erkek olmayanı çıkar",
    prompt: "12 kız ve 8 erkek öğrencinin bulunduğu bir sınıftan rastgele 3 öğrenci seçiliyor. Seçilenler arasında en az bir erkek bulunma olasılığı kaçtır?",
    strategy: "Bütün üçlüleri say. Yalnız kızlardan oluşan üçlülerin olasılığını 1’den çıkar.",
    steps: [
      { label: "Bütün", expression: "C(20,3)=1.140", explanation: "Yirmi öğrenciden sırasız üç kişi." },
      { label: "Hiç erkek yok", expression: "C(12,3)=220", explanation: "Üç kişinin hepsi kızlardan seçilir." },
      { label: "Tümleyen", expression: "1−220/1.140=920/1.140=46/57", explanation: "En az bir erkek ile hiç erkek olmaması birbirinin tümleyenidir." },
    ],
    answer: "46/57.",
    check: "Bir, iki ve üç erkek durumları: 8·66+28·12+56=528+336+56=920.",
    pitfall: "Bir erkeği önce seçip kalan iki kişiyi 19 kişiden seçmek. Bu yol iki veya üç erkekli grupları fazla sayar.",
  },
];

export const probabilitySheet200: CheatSection = {
  title: "İki zar toplam tablosu",
  text: [`36 sıralı sonuç eş olası, 11 toplam değil. P(7)=${diceRows[5].probability}, P(toplam ≤ 4)=${diceRows[2].atMost}.`],
  table: diceTable,
};
