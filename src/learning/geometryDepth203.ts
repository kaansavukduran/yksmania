import type { GuideSection, WorkedExample } from "./guides/types";

/*
 * TYT Geometri derinleştirmesi (0.203.0). Kabul edilmiş rehber içeriği
 * değişmez; tablo bölümü ve ek çözümlü örnekler görüntüleme katmanında
 * eklenir. Tablo satırları, paragraflardaki sayılar ve Kopya Kâğıdı
 * özetleri aynı fonksiyonlardan üretilir.
 */

const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));

/* ---------- Paralel iki doğru ve kesen: sekiz açı ---------- */

export interface ParallelAngle203 {
  label: number;
  line: "d₁" | "d₂";
  place: string;
  /** true: ölçü α, false: ölçü 180°−α */
  equal: boolean;
  reason: string;
}

// 1–4 üst kesişimde (d₁), 5–8 alt kesişimde (d₂); sol/sağ kesene göre, üst/alt doğruya göre.
export const parallelAngleLayout203: readonly ParallelAngle203[] = [
  { label: 1, line: "d₁", place: "sol üst (dış)", equal: true, reason: "Verilen açı" },
  { label: 2, line: "d₁", place: "sağ üst (dış)", equal: false, reason: "1 ile doğrusal çift" },
  { label: 3, line: "d₁", place: "sol alt (iç)", equal: false, reason: "1 ile doğrusal çift" },
  { label: 4, line: "d₁", place: "sağ alt (iç)", equal: true, reason: "1 ile ters açı" },
  { label: 5, line: "d₂", place: "sol üst (iç)", equal: true, reason: "1 ile yöndeş, 4 ile iç ters" },
  { label: 6, line: "d₂", place: "sağ üst (iç)", equal: false, reason: "2 ile yöndeş, 3 ile iç ters" },
  { label: 7, line: "d₂", place: "sol alt (dış)", equal: false, reason: "3 ile yöndeş, 2 ile dış ters" },
  { label: 8, line: "d₂", place: "sağ alt (dış)", equal: true, reason: "4 ile yöndeş, 1 ile dış ters" },
];
export const parallelAlpha203 = 58;
export const parallelAngleRows203 = (alpha = parallelAlpha203) =>
  parallelAngleLayout203.map((angle) => ({ ...angle, measure: angle.equal ? alpha : 180 - alpha }));
const parallelRows = parallelAngleRows203();
const parallelTable = {
  layout: "table" as const,
  headers: ["Açı", "Kesişim", "Konum", "Gerekçe", `Ölçü (α=${parallelAlpha203}°)`],
  rows: parallelRows.map(({ label, line, place, reason, equal, measure }) =>
    [String(label), line, place, reason, `${equal ? "α" : "180°−α"} = ${measure}°`]),
};
const equalLabels = parallelRows.filter(({ equal }) => equal).map(({ label }) => label);
const otherLabels = parallelRows.filter(({ equal }) => !equal).map(({ label }) => label);
const sameSideInterior = parallelRows[2].measure + parallelRows[4].measure;

export const parallelSection203: GuideSection = {
  title: "Paralel iki doğrudaki sekiz açıyı tek ölçüden üret",
  paragraphs: [
    `d₁∥d₂ ve bir kesen iki doğruyu keser. Üst kesişimdeki dört açıya 1–4, alt kesişimdekilere 5–8 adı verilir. Sol üstteki 1. açı α=${parallelAlpha203}° ise tablo diğer yedi açıyı yalnız iki bağıntıyla bulur: doğrusal çift toplamı 180°, paralellikten gelen eşitlik. ${equalLabels.join(", ")} numaralı açılar ${parallelRows[0].measure}°, ${otherLabels.join(", ")} numaralı açılar ${parallelRows[1].measure}° olur.`,
    `Sekiz açıda yalnız iki farklı ölçü vardır ve bu iki ölçü bütünlerdir. Aynı yandaki iç açılar 3 ve 5’in toplamı ${parallelRows[2].measure}°+${parallelRows[4].measure}°=${sameSideInterior}° çıkar. Paralellik verilmeseydi 1–4 arası ilişkiler yine geçerli olurdu, çünkü onlar tek kesişimden gelir. 5–8’i 1–4’e bağlayan her satır d₁∥d₂ koşuluna dayanır.`,
  ],
  table: parallelTable,
};

export const parallelExamples203: WorkedExample[] = [
  {
    title: "Kırık çizgide kırılma noktasından paralel çiz",
    prompt: "d₁∥d₂. A noktası d₁, C noktası d₂ üzerinde; B ise iki paralelin arasında, A ve C’nin sağındadır. [AB], d₁ ile B tarafında 38° açı; [CB], d₂ ile B tarafında 47° açı yapıyor. ∠ABC kaç derecedir?",
    strategy: "B’den d₁ ve d₂’ye paralel yardımcı bir doğru çiz. ∠ABC iki parçaya ayrılır ve her parça iç ters açıdır.",
    steps: [
      { label: "Yardımcı doğru", expression: "B’den d ∥ d₁ ∥ d₂", explanation: "Paralel seçildiği için her iki parça da paralellik bağıntısıyla taşınabilir." },
      { label: "Üst parça", expression: "∠(BA, d) = 38°", explanation: "d₁ ile d arasında AB keseni: iç ters açılar eşittir." },
      { label: "Alt parça", expression: "∠(BC, d) = 47°", explanation: "d ile d₂ arasında CB keseni: iç ters açılar eşittir." },
      { label: "Topla", expression: "38° + 47° = 85°", explanation: "İki parça ∠ABC’yi boşluk bırakmadan oluşturur." },
    ],
    answer: "∠ABC = 85°.",
    check: "Koordinatla: d₁: y=4, d₂: y=0, A(0; 4). BA yönü 142°, BC yönü 227° doğrultusunda; fark 85°.",
    pitfall: "Kırılma noktasındaki açıyı iki verilen açının farkı sanmak. B paralellerin arasındaysa ve iki açı da B tarafında ölçülmüşse açılar toplanır.",
  },
  {
    title: "Doğrusal çiftin açıortayları",
    prompt: "A, O ve C doğrusal; B noktası bu doğrunun dışında. ∠AOB = 4x+12°, ∠BOC = 2x+6°. [OE, ∠AOB’nin; [OF, ∠BOC’nin açıortayıdır. ∠EOF ve ∠AOF kaç derecedir?",
    strategy: "Önce doğrusal çiftten x’i bul. Açıortaylar her açıyı ikiye böler; istenen açıyı parçaların toplamı olarak yaz.",
    steps: [
      { label: "Doğrusal çift", expression: "(4x+12) + (2x+6) = 180", explanation: "6x = 162, x = 27. ∠AOB = 120°, ∠BOC = 60°." },
      { label: "Yarılar", expression: "∠EOB = 60°, ∠BOF = 30°", explanation: "Açıortay her açıyı iki eş parçaya ayırır." },
      { label: "∠EOF", expression: "60° + 30° = 90°", explanation: "Bütünler komşu iki açının açıortayları her zaman diktir." },
      { label: "∠AOF", expression: "120° + 30° = 150°", explanation: "A’dan B’ye 120°, B’den F’ye 30° daha dönülür." },
    ],
    answer: "∠EOF = 90°, ∠AOF = 150°.",
    check: "∠FOC = 30° ve ∠AOF + ∠FOC = 150° + 30° = 180° tutar.",
    pitfall: "x = 27’yi açının ölçüsü sanmak. Sorulan açılar x’e değil açıortay parçalarına bağlıdır.",
  },
];

export const parallelSupplement203 = {
  title: parallelSection203.title,
  paragraphs: parallelSection203.paragraphs,
  summary: `Sekiz açıda iki ölçü: α ve 180°−α. α=${parallelAlpha203}° için ${equalLabels.join(", ")} → ${parallelRows[0].measure}°; ${otherLabels.join(", ")} → ${parallelRows[1].measure}°. 5–8’i 1–4’e bağlamak için paralellik şart.`,
  appendSection: true as const,
  table: parallelTable,
  examples: parallelExamples203,
};

/* ---------- Özel açılarda trigonometrik oranlar ---------- */

/** a·√b / c, sadeleştirilmiş */
export interface Radical203 { a: number; b: number; c: number }
const simplifyRoot = (n: number) => {
  let outside = 1;
  let inside = n;
  for (let k = Math.floor(Math.sqrt(n)); k > 1; k -= 1) {
    if (inside % (k * k) === 0) { outside *= k; inside /= k * k; }
  }
  return { outside, inside };
};
export const radical203 = (a: number, b: number, c = 1): Radical203 => {
  const { outside, inside } = simplifyRoot(b);
  const top = a * outside;
  const g = gcd(top, c);
  return { a: top / g, b: inside, c: c / g };
};
/** (p√q)/(r√s) = p√(qs)/(rs) */
export const divideRadical203 = (x: Radical203, y: Radical203): Radical203 =>
  radical203(x.a * y.c, x.b * y.b, x.c * y.a * y.b);
export const radicalValue203 = ({ a, b, c }: Radical203) => (a * Math.sqrt(b)) / c;
export const radicalText203 = ({ a, b, c }: Radical203) => {
  const top = b === 1 ? String(a) : `${a === 1 ? "" : a}√${b}`;
  return c === 1 ? top : `${top}/${c}`;
};

const specialTriangles = [
  { angle: 30, opposite: radical203(1, 1), adjacent: radical203(1, 3), hypotenuse: radical203(2, 1) },
  { angle: 45, opposite: radical203(1, 1), adjacent: radical203(1, 1), hypotenuse: radical203(1, 2) },
  { angle: 60, opposite: radical203(1, 3), adjacent: radical203(1, 1), hypotenuse: radical203(2, 1) },
];
export const specialAngleRows203 = () => specialTriangles.map(({ angle, opposite, adjacent, hypotenuse }) => {
  const sin = divideRadical203(opposite, hypotenuse);
  const cos = divideRadical203(adjacent, hypotenuse);
  const tan = divideRadical203(opposite, adjacent);
  return { angle, opposite, adjacent, hypotenuse, sin, cos, tan, squareSum: radicalValue203(sin) ** 2 + radicalValue203(cos) ** 2 };
});
const specialRows = specialAngleRows203();
const decimal = (value: number) => value.toFixed(3).replace(".", ",");
const specialTable = {
  layout: "table" as const,
  headers: ["Açı", "karşı : komşu : hipotenüs", "sin", "cos", "tan", "sin (ondalık)"],
  rows: specialRows.map(({ angle, opposite, adjacent, hypotenuse, sin, cos, tan }) => [
    `${angle}°`,
    [opposite, adjacent, hypotenuse].map(radicalText203).join(" : "),
    radicalText203(sin), radicalText203(cos), radicalText203(tan),
    decimal(radicalValue203(sin)),
  ]),
};
const [row30, row45, row60] = specialRows;

export const specialAngleSection203: GuideSection = {
  title: "Özel açı oranlarını iki üçgenden türet",
  paragraphs: [
    `Kenarı 2 olan eşkenar üçgeni yükseklikle ikiye böl: 30°–60°–90° üçgeninin kenarları ${[row30.opposite, row30.adjacent, row30.hypotenuse].map(radicalText203).join(" : ")} olur. Dik kenarları 1 olan ikizkenar dik üçgende hipotenüs ${radicalText203(row45.hypotenuse)}’dir. Tablodaki her oran bu kenarların bölümüdür: sin 30° = ${radicalText203(row30.opposite)}/${radicalText203(row30.hypotenuse)} = ${radicalText203(row30.sin)}, tan 30° = ${radicalText203(row30.opposite)}/${radicalText203(row30.adjacent)} = ${radicalText203(row30.tan)}.`,
    `30° ve 60° satırlarında sin ile cos yer değiştirir: sin 30° = cos 60° = ${radicalText203(row30.sin)}, sin 60° = cos 30° = ${radicalText203(row60.sin)}. Bu, tümler açı kuralının özel hâlidir. Her satırda sin²+cos² = 1 ve sin değerleri ${specialRows.map(({ sin }) => decimal(radicalValue203(sin))).join(" < ")} sırasıyla artar. Dar açı büyüdükçe sin artar, cos azalır.`,
  ],
  table: specialTable,
};

export const trigExamples203: WorkedExample[] = [
  {
    title: "Orandan kenarları k ile kur, sonra ölçeği bul",
    prompt: "ABC dik üçgeninde B açısı 90°, tan A = 5/12 ve hipotenüs AC = 39 cm’dir. Üçgenin çevresi kaç cm’dir?",
    strategy: "tan A = karşı/komşu oranından kenarları 5k ve 12k yaz. Pisagordan hipotenüs 13k olur, verilen hipotenüsle k bulunur.",
    steps: [
      { label: "Kenarlar", expression: "BC = 5k, AB = 12k", explanation: "A’nın karşısı BC, komşusu AB’dir." },
      { label: "Hipotenüs", expression: "√(25k² + 144k²) = 13k", explanation: "169k² = (13k)²." },
      { label: "Ölçek", expression: "13k = 39 ⇒ k = 3", explanation: "Kenarlar 15, 36 ve 39 cm." },
      { label: "Çevre", expression: "15 + 36 + 39 = 90", explanation: "Üç kenarın toplamı." },
    ],
    answer: "Çevre 90 cm.",
    check: "15² + 36² = 225 + 1296 = 1521 = 39² ve 15/36 = 5/12.",
    pitfall: "tan A = 5/12 görünce kenarları doğrudan 5 ve 12 alıp ölçeği hiç bulmamak.",
  },
  {
    title: "İki bakış açısıyla yüksekliği bul",
    prompt: "Bir kulenin tabanıyla aynı doğrultudaki iki noktadan kulenin tepesine 30° ve 60° açılarla bakılıyor. İki nokta arası 40 m’dir. Kulenin yüksekliği kaç m’dir? (Göz yüksekliği ihmal.)",
    strategy: "Yüksekliği h yaz. İki uzaklığı h cinsinden tan ile ifade et; farkları 40 m’dir.",
    steps: [
      { label: "Yakın nokta", expression: "uzaklık = h / tan 60° = h/√3", explanation: "60° ile bakan nokta kuleye daha yakındır." },
      { label: "Uzak nokta", expression: "uzaklık = h / tan 30° = h√3", explanation: "tan 30° = √3/3 olduğundan bölüm h√3 olur." },
      { label: "Fark", expression: "h√3 − h/√3 = 2h/√3 = 40", explanation: "Ortak paydada 3h/√3 − h/√3 = 2h/√3." },
      { label: "Çöz", expression: "h = 20√3", explanation: "Yaklaşık 34,64 m." },
    ],
    answer: "h = 20√3 m (yaklaşık 34,64 m).",
    check: "Uzaklıklar 20 m ve 60 m; 60 − 20 = 40 m. tan 60° = 20√3/20 = √3 tutar.",
    pitfall: "Yakın ve uzak noktayı karıştırıp büyük açıyı uzak noktaya vermek. Kuleye yaklaştıkça bakış açısı büyür.",
  },
];

export const trigSupplement203 = {
  title: specialAngleSection203.title,
  paragraphs: specialAngleSection203.paragraphs,
  summary: `30°: ${[row30.sin, row30.cos, row30.tan].map(radicalText203).join(", ")}. 45°: ${[row45.sin, row45.cos, row45.tan].map(radicalText203).join(", ")}. 60°: ${[row60.sin, row60.cos, row60.tan].map(radicalText203).join(", ")} (sin, cos, tan). Kenarlar 1 : √3 : 2 ve 1 : 1 : √2.`,
  appendSection: true as const,
  table: specialTable,
  examples: trigExamples203,
};

/* ---------- Daire dilimi: aynı yarıçapta açıya göre ---------- */

export const sectorRadius203 = 6;
const piText = (k: number) => (k === 1 ? "π" : `${Number.isInteger(k) ? k : String(k).replace(".", ",")}π`);
export const sectorRows203 = (r = sectorRadius203) => [30, 60, 90, 120, 180, 270].map((angle) => {
  const g = gcd(angle, 360);
  return {
    angle,
    fraction: `${angle / g}/${360 / g}`,
    arcPi: (2 * r * angle) / 360,
    areaPi: (r * r * angle) / 360,
    straight: 2 * r,
  };
});
const sectorRows = sectorRows203();
const sectorTable = {
  layout: "table" as const,
  headers: ["Merkez açı", "Dairenin kesri", "Yay (cm)", "Dilim alanı (cm²)", "Dilim çevresi (cm)"],
  rows: sectorRows.map(({ angle, fraction, arcPi, areaPi, straight }) =>
    [`${angle}°`, fraction, piText(arcPi), piText(areaPi), `${straight} + ${piText(arcPi)}`]),
};
const sector90 = sectorRows[2];
const sector180 = sectorRows[4];

export const sectorSection203: GuideSection = {
  title: "Merkez açı değişince yay, alan ve çevre birlikte değişir",
  paragraphs: [
    `Yarıçap ${sectorRadius203} cm sabit tutulur, yalnız merkez açı değişir. Tam çember çevresi ${piText(2 * sectorRadius203)} cm, daire alanı ${piText(sectorRadius203 ** 2)} cm²’dir. Her satırda önce açının 360°’ye oranı yazılır, yay ve dilim alanı bu kesirle çarpılır. Örneğin 90° için kesir ${sector90.fraction}, yay ${piText(sector90.arcPi)} cm, alan ${piText(sector90.areaPi)} cm²’dir.`,
    `Açı iki katına çıkınca yay da alan da iki katına çıkar: 90°’den 180°’ye yay ${piText(sector90.arcPi)}’den ${piText(sector180.arcPi)}’ye, alan ${piText(sector90.areaPi)}’den ${piText(sector180.areaPi)}’ye gider. Dilim çevresi ise iki kat olmaz, çünkü iki yarıçap toplamı ${2 * sectorRadius203} cm her satırda sabittir. Her satırda dilim alanı = yay · r / 2 de tutar.`,
  ],
  table: sectorTable,
};

export const sectorExamples203: WorkedExample[] = [
  {
    title: "Alan ve yaydan yarıçapı ve açıyı geri bul",
    prompt: "Bir daire diliminin alanı 15π cm², yay uzunluğu 5π cm’dir. Dairenin yarıçapı ve dilimin merkez açısı nedir?",
    strategy: "Dilim alanı = yay · r / 2 bağıntısı açıyı kullanmadan r’yi verir. Sonra yay formülünden açıyı bul.",
    steps: [
      { label: "Yarıçap", expression: "15π = 5π · r / 2", explanation: "Her iki taraf π içerir; 30 = 5r, r = 6 cm." },
      { label: "Açı", expression: "5π = 2π · 6 · α/360", explanation: "5 = 12α/360, α = 150°." },
      { label: "Denetim", expression: "π · 36 · 150/360 = 15π", explanation: "Bulunan r ve α alanı da verir." },
    ],
    answer: "r = 6 cm, merkez açı 150°.",
    check: "Yay 2π·6·150/360 = 5π cm ve alan 5π·6/2 = 15π cm² tutar.",
    pitfall: "Önce açıyı tahmin edip iki bilinmeyenli denklem kurmak. Alan = yay·r/2 bağıntısı bir adımda r’yi verir.",
  },
  {
    title: "İki çeyrek dairenin ortak bölgesi",
    prompt: "ABCD karesinin kenarı 4 cm’dir. Merkezi A olan ve merkezi C olan, yarıçapları 4 cm olan iki çeyrek daire karenin içinde çiziliyor. İki çeyrek dairenin ortak bölgesinin alanı kaç cm²’dir?",
    strategy: "İki çeyrek daire birlikte karenin tamamını örter. Toplam alanları kareyi ortak bölge kadar fazla sayar.",
    steps: [
      { label: "Bir çeyrek daire", expression: "π · 4² / 4 = 4π", explanation: "Merkez açı 90°, kesir 1/4." },
      { label: "Örtüşme", expression: "4π + 4π − ortak = 16", explanation: "Karenin her noktası en az bir çeyrek dairenin içindedir; ortak bölge iki kez sayılmıştır." },
      { label: "Çöz", expression: "ortak = 8π − 16", explanation: "Yaklaşık 25,13 − 16 = 9,13 cm²." },
    ],
    answer: "8π − 16 cm² (yaklaşık 9,13 cm²).",
    check: "Ortak bölge, BD köşegeniyle iki eş daire parçasına ayrılır: her biri 4π − 8 cm² ve iki katı 8π − 16 cm².",
    pitfall: "Ortak bölgeyi kare alanından bir çeyrek daireyi çıkararak bulmaya çalışmak. 16 − 4π dışarıda kalan köşe bölgesidir.",
  },
];

export const sectorSupplement203 = {
  title: sectorSection203.title,
  paragraphs: sectorSection203.paragraphs,
  summary: `r=${sectorRadius203}: yay = ${piText(2 * sectorRadius203)}·α/360, alan = ${piText(sectorRadius203 ** 2)}·α/360, çevre = ${2 * sectorRadius203} + yay. Açı iki katına çıkınca yay ve alan iki kat olur, çevre olmaz.`,
  appendSection: true as const,
  table: sectorTable,
  examples: sectorExamples203,
};

export const geometryDepth203Supplements = {
  "tyt-geo-temel-acilar-031": [parallelSupplement203],
  "tyt-geo-trigonometrik-oranlar-040": [trigSupplement203],
};
