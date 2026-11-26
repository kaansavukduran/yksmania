import type { GuideSection, WorkedExample } from "./guides/types";
import { radical203, radicalText203 } from "./geometryDepth203";

/*
 * Geometri ve üslü sayılar derinleştirmesi (0.206.0). Kabul edilmiş rehber
 * içeriği değişmez; tablo bölümü, ek çözümlü örnekler ve bölüm çizimi
 * görüntüleme katmanında eklenir. Paragraflardaki sayılar, tablo satırları,
 * çizim okumaları ve Kopya Kâğıdı özetleri aynı fonksiyonlardan üretilir.
 */

const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
const minus = (x: number) => (x < 0 ? `−${Math.abs(x)}` : String(x));

/** Sadeleştirilmiş kesir n/d (d > 0). */
export interface Frac206 { n: number; d: number }
export const frac206 = (n: number, d = 1): Frac206 => {
  const g = gcd(n, d) || 1;
  const s = d < 0 ? -1 : 1;
  return { n: (s * n) / g, d: (s * d) / g };
};
export const fracValue206 = ({ n, d }: Frac206) => n / d;
export const fracText206 = ({ n, d }: Frac206) => (d === 1 ? minus(n) : `${n < 0 ? "−" : ""}${Math.abs(n)}/${d}`);
/** Katsayısı kesir olan π ifadesi: 2π/3, 18π, π/3. */
export const piText206 = ({ n, d }: Frac206) => `${n === 1 ? "" : n}π${d === 1 ? "" : `/${d}`}`;

const SUP: Record<string, string> = { "-": "⁻", "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
export const sup206 = (n: number) => [...String(n)].map((c) => SUP[c]).join("");

/* ---------- Çemberde açı: köşenin yeri formülü seçer ---------- */

export const circleArcs206 = { ab: 110, cd: 40 } as const;
export interface CircleAngleRow206 {
  kind: string;
  vertex: string;
  formula: string;
  value: number;
}
export const circleAngleRows206 = (ab: number = circleArcs206.ab, cd: number = circleArcs206.cd): CircleAngleRow206[] => [
  { kind: "Merkez açı", vertex: "Merkezde (O)", formula: "α = AB", value: ab },
  { kind: "Çevre açı", vertex: "Çemberde, AB yayının dışında", formula: "α = AB / 2", value: ab / 2 },
  { kind: "Teğet–kiriş açısı", vertex: "Teğet noktasında (A)", formula: "α = AB / 2", value: ab / 2 },
  { kind: "İç açı (iki kiriş)", vertex: "Çemberin içinde", formula: "α = (AB + CD) / 2", value: (ab + cd) / 2 },
  { kind: "Dış açı (iki kesen)", vertex: "Çemberin dışında", formula: "α = (AB − CD) / 2", value: (ab - cd) / 2 },
  { kind: "İki teğet arası açı", vertex: "Dışta, A ve B teğetlerinin kesişiminde", formula: "α = 180° − AB", value: 180 - ab },
];
const circleRows = circleAngleRows206();
const [central, inscribed, tangentChord, inner, outer, twoTangents] = circleRows;
const { ab: arcAB, cd: arcCD } = circleArcs206;
const circleTable = {
  layout: "table" as const,
  headers: ["Açı türü", "Köşenin yeri", "Bağıntı", `Değer (AB=${arcAB}°, CD=${arcCD}°)`],
  rows: circleRows.map(({ kind, vertex, formula, value }) => [kind, vertex, formula, `${value}°`]),
};

export const circleAngleSection206: GuideSection = {
  title: "Köşenin yeri formülü seçer: altı açı tek tabloda",
  paragraphs: [
    `Aynı çemberde A, B, C ve D noktaları saat yönünde bu sırayla dizilsin. AB yayı C ile D’yi içermeyen yaydır ve ${arcAB}°’dir. CD yayı A ile B’yi içermeyen yaydır ve ${arcCD}°’dir. Kalan iki yay toplam ${360 - arcAB - arcCD}°’dir. Bir açının ölçüsünü bulmak için önce köşesinin nerede olduğuna bak: merkezde, çemberin üstünde, içinde ya da dışında.`,
    `Köşe merkezdeyse açı yaya eşittir: ${central.value}°. Köşe çemberin üstündeyse açı gördüğü yayın yarısıdır. Çevre açı da teğet–kiriş açısı da ${inscribed.value}° olur. Köşe içerideyse iki kiriş iki yay görür ve açı onların ortalamasıdır: (${arcAB}° + ${arcCD}°) / 2 = ${inner.value}°. Köşe dışarıdaysa iki kesenin arasındaki yaylar çıkarılır: (${arcAB}° − ${arcCD}°) / 2 = ${outer.value}°.`,
    `A ve B noktalarındaki teğetler dışarıda kesişirse açı 180° − ${arcAB}° = ${twoTangents.value}° olur. Bu da dış açı kuralıdır: büyük yay ${360 - arcAB}°, küçük yay ${arcAB}°, farkın yarısı ${(360 - arcAB - arcAB) / 2}°. Aynı AB yayı için köşe merkezden çembere çıkınca açı yarıya iner: ${central.value}° → ${inscribed.value}°. Köşe içeri girince CD/2 = ${arcCD / 2}° eklenir (${inner.value}°), dışarı çıkınca CD/2 çıkarılır (${outer.value}°).`,
  ],
  table: circleTable,
};

export const circleExamples206: WorkedExample[] = [
  {
    title: "Aynı dört noktadan dış açı ve iç açı",
    prompt: "Bir çemberin dışındaki P noktasından iki kesen çiziliyor. Birinci kesen çemberi önce A, sonra B noktasında; ikinci kesen önce C, sonra D noktasında kesiyor. P’ye yakın AC yayı 40°, P’den uzak BD yayı 130°’dir (iki yay da kesenlerin arasında kalır). [AD] ve [BC] kirişleri çemberin içinde E noktasında kesişiyor. ∠APC ve ∠AEC kaç derecedir?",
    strategy: "Önce her açının köşesinin yerini belirle. P dışarıda olduğu için yaylar çıkarılır. E içeride olduğu için açının ve ters açısının gördüğü yaylar toplanır.",
    steps: [
      { label: "P dışarıda", expression: "∠APC = (130° − 40°) / 2", explanation: "Kesenlerin arasında kalan uzak yaydan yakın yay çıkarılır, sonra yarıya bölünür." },
      { label: "Dış açı", expression: "∠APC = 45°", explanation: "90°’nin yarısı." },
      { label: "E içeride", expression: "∠AEC = (40° + 130°) / 2", explanation: "∠AEC, AC yayını görür; ters açısı ∠BED de BD yayını görür." },
      { label: "İç açı", expression: "∠AEC = 85°", explanation: "170°’nin yarısı." },
    ],
    answer: "∠APC = 45°, ∠AEC = 85°.",
    check: "Koordinatla: AC yayı 40°, BD yayı 130°, AB ve CD yayları 95° alınır. P ve E kesişimden hesaplanınca açılar 45° ve 85° çıkar. İki açının farkı 40° = AC yayıdır.",
    pitfall: "Dış açıda yayları toplamak. Köşe çemberin dışındaysa yaylar çıkarılır. Toplama yalnız köşe içerideyken yapılır.",
  },
  {
    title: "İki teğetten çevre açıya",
    prompt: "Çemberin dışındaki P noktasından çizilen iki teğet çembere A ve B noktalarında değiyor. ∠APB = 52°’dir. C noktası, A ile B arasındaki büyük yayın üzerindedir. ∠ACB ve ∠PAB kaç derecedir?",
    strategy: "İki teğet arası açıdan küçük AB yayını bul. Çevre açı ve teğet–kiriş açısı bu yayın yarısıdır.",
    steps: [
      { label: "Küçük yay", expression: "AB = 180° − 52° = 128°", explanation: "OAPB dörtgeninde A ve B’deki açılar 90° olduğundan merkez açı 180° − 52°’dir." },
      { label: "Çevre açı", expression: "∠ACB = 128° / 2 = 64°", explanation: "C büyük yayda olduğundan küçük AB yayını görür." },
      { label: "Teğet–kiriş", expression: "∠PAB = 128° / 2 = 64°", explanation: "PA teğet, AB kiriş. Aradaki yay küçük AB yayıdır." },
    ],
    answer: "∠ACB = 64°, ∠PAB = 64°.",
    check: "PAB üçgeni ikizkenardır (PA = PB): 64° + 64° + 52° = 180°.",
    pitfall: "∠ACB’yi 52°’nin yarısı sanmak. Önce yay bulunur. Teğetler arasındaki açı yay değil, 180° eksi yaydır.",
  },
];

export const circleAngleSupplement206 = {
  title: circleAngleSection206.title,
  figureTitle: circleAngleSection206.title,
  paragraphs: circleAngleSection206.paragraphs,
  summary: `AB=${arcAB}°, CD=${arcCD}°: merkez ${central.value}°, çevre ve teğet–kiriş ${inscribed.value}°, iç (AB+CD)/2 = ${inner.value}°, dış (AB−CD)/2 = ${outer.value}°, iki teğet 180°−AB = ${twoTangents.value}°.`,
  appendSection: true as const,
  table: circleTable,
  examples: circleExamples206,
};

/* ---------- Küreyi saran silindir: koni, küre, silindir ---------- */

export const solidRadii206 = [1, 2, 3, 6] as const;
export const solidRows206 = (radii: readonly number[] = solidRadii206) => radii.map((r) => ({
  r,
  h: 2 * r,
  cone: frac206(2 * r ** 3, 3),
  sphere: frac206(4 * r ** 3, 3),
  cylinder: frac206(2 * r ** 3),
  sphereArea: frac206(4 * r ** 2),
  cylinderLateral: frac206(2 * r * (2 * r)),
  cylinderTotal: frac206(2 * r ** 2 + 2 * r * (2 * r)),
}));
const solidRows = solidRows206();
const solidTable = {
  layout: "table" as const,
  headers: ["r", "h = 2r", "Koni hacmi", "Küre hacmi", "Silindir hacmi", "Küre yüzeyi", "Silindir yanal alanı", "Silindir toplam alanı"],
  rows: solidRows.map(({ r, h, cone, sphere, cylinder, sphereArea, cylinderLateral, cylinderTotal }) =>
    [String(r), String(h), ...[cone, sphere, cylinder, sphereArea, cylinderLateral, cylinderTotal].map(piText206)]),
};
const [solid1, , solid3, solid6] = solidRows;
const ratio = (a: Frac206, b: Frac206) => fracValue206(a) / fracValue206(b);

export const solidSection206: GuideSection = {
  title: "Küreyi saran silindirde hacim ve yüzey oranları",
  paragraphs: [
    `Yarıçapı r olan küre bir silindirin içine tam sığsın: küre iki tabana ve yan yüzeye değer. Bu durumda silindirin yarıçapı r, yüksekliği h = 2r olur. İçine aynı taban ve tepe noktası üst tabanın merkezinde olan bir koni de çizilir. Tablodaki her satır üç cismi aynı r ile hesaplar. r = ${solid1.r} için koni ${piText206(solid1.cone)}, küre ${piText206(solid1.sphere)}, silindir ${piText206(solid1.cylinder)} birim³ olur.`,
    `Her satırda koni : küre : silindir = 1 : ${ratio(solid3.sphere, solid3.cone)} : ${ratio(solid3.cylinder, solid3.cone)}. Örneğin r = ${solid3.r} için ${piText206(solid3.cone)}, ${piText206(solid3.sphere)} ve ${piText206(solid3.cylinder)}. Silindirden küre çıkarılınca kalan hacim ${piText206(frac206(solid3.cylinder.n * solid3.sphere.d - solid3.sphere.n * solid3.cylinder.d, solid3.sphere.d))}, yani koninin hacmi kadardır.`,
    `Yüzeylerde de bir eşitlik var: küre yüzeyi 4πr², silindirin yanal alanı 2πr · 2r = 4πr². İki değer her satırda aynıdır. Silindirin iki tabanıyla toplam alanı 6πr² olur. Küre yüzeyi : silindir toplam alanı = 2 : 3. r ${solid3.r}’ten ${solid6.r}’ya iki katına çıkınca alanlar ${ratio(solid6.sphereArea, solid3.sphereArea)} katına (${piText206(solid3.sphereArea)} → ${piText206(solid6.sphereArea)}), hacimler ${ratio(solid6.sphere, solid3.sphere)} katına (${piText206(solid3.sphere)} → ${piText206(solid6.sphere)}) çıkar.`,
  ],
  table: solidTable,
};

export const solidExamples206: WorkedExample[] = [
  {
    title: "Silindirde kürenin dışında kalan hacim",
    prompt: "Yarıçapı 3 cm olan bir küre, kapalı bir dik silindirin içine tam sığıyor: küre iki tabana ve yan yüzeye değiyor. Silindirin içinde kürenin dışında kalan bölgenin hacmi kaç cm³’tür? Bu hacim, silindirle aynı taban ve yükseklikteki koninin hacmiyle karşılaştırıldığında ne görülür?",
    strategy: "Kürenin tam sığması silindirin yarıçapını r = 3, yüksekliğini 2r = 6 yapar. İki hacmi ayrı hesapla ve çıkar.",
    steps: [
      { label: "Silindir ölçüleri", expression: "r = 3, h = 2 · 3 = 6", explanation: "Küre iki tabana değdiği için yükseklik kürenin çapıdır." },
      { label: "Silindir", expression: "π · 3² · 6 = 54π", explanation: "Taban alanı çarpı yükseklik." },
      { label: "Küre", expression: "4π · 3³ / 3 = 36π", explanation: "Küre hacmi 4πr³/3." },
      { label: "Fark", expression: "54π − 36π = 18π", explanation: "Silindirin içinde kürenin dışında kalan bölge." },
      { label: "Koni", expression: "π · 3² · 6 / 3 = 18π", explanation: "Aynı taban ve yükseklikteki koni silindirin üçte biridir." },
    ],
    answer: "18π cm³. Bu, aynı taban ve yükseklikteki koninin hacmine eşittir.",
    check: "Oran 18π : 36π : 54π = 1 : 2 : 3. Koni ve küre toplamı silindiri verir: 18π + 36π = 54π.",
    pitfall: "Silindirin yüksekliğini kürenin yarıçapı (3) almak. Küre iki tabana değiyorsa yükseklik çaptır, 6 cm.",
  },
  {
    title: "Küreyle aynı hacimdeki koninin yüksekliği",
    prompt: "Bir dik koninin taban yarıçapı 3 cm’dir. Bu koninin hacmi, yarıçapı 3 cm olan kürenin hacmine eşittir. Koninin yüksekliği ve ana doğrusu kaç cm’dir?",
    strategy: "İki hacim formülünü eşitle. Ortak π ve r² çarpanları sadeleşir. Ana doğruyu dik üçgenle bul.",
    steps: [
      { label: "Eşitlik", expression: "π · 3² · h / 3 = 4π · 3³ / 3", explanation: "Sol taraf koni, sağ taraf küre hacmi." },
      { label: "Sadeleştir", expression: "9h = 108 ⇒ h = 12", explanation: "Her iki taraf π/3 ile bölünür. Genel olarak h = 4r çıkar." },
      { label: "Ana doğru", expression: "ℓ = √(3² + 12²) = √153 = 3√17", explanation: "Yarıçap, yükseklik ve ana doğru dik üçgen kurar." },
    ],
    answer: "h = 12 cm, ℓ = 3√17 cm (yaklaşık 12,37 cm).",
    check: "Koni hacmi π · 9 · 12 / 3 = 36π, küre hacmi 4π · 27 / 3 = 36π.",
    pitfall: "Koninin 1/3 çarpanını unutup h = 4 bulmak. Aynı taban ve yükseklikteki silindir hacmi küreninkine eşit olsaydı h = 4 çıkardı.",
  },
];

export const solidSupplement206 = {
  title: solidSection206.title,
  figureTitle: solidSection206.title,
  paragraphs: solidSection206.paragraphs,
  summary: `h = 2r: koni 2πr³/3, küre 4πr³/3, silindir 2πr³ → 1 : 2 : 3. Küre yüzeyi 4πr² = silindir yanal alanı; silindir toplamı 6πr². r = ${solid3.r}: ${piText206(solid3.cone)}, ${piText206(solid3.sphere)}, ${piText206(solid3.cylinder)}.`,
  appendSection: true as const,
  table: solidTable,
  examples: solidExamples206,
};

/* ---------- Üslü sayılar: negatif taban ve negatif üs ---------- */

export const powerExponents206 = [-3, -2, -1, 0, 1, 2, 3, 4] as const;
/** base^n, base ≠ 0 tam sayı, n tam sayı; kesin kesir. */
export const powerFrac206 = (base: number, n: number): Frac206 => {
  const m = Math.abs(base) ** Math.abs(n);
  const sign = base < 0 && Math.abs(n) % 2 === 1 ? -1 : 1;
  return n >= 0 ? frac206(sign * m) : frac206(sign, m);
};
const expansion = (n: number) => {
  if (n === 0) return "tanım gereği 1";
  if (n > 0) return Array.from({ length: n }, () => "(−2)").join("·");
  return `1/(−2)${sup206(-n)}`;
};
export const powerRows206 = (exponents: readonly number[] = powerExponents206) => exponents.map((n) => {
  const positive = powerFrac206(2, n);
  const negativeBase = powerFrac206(-2, n);
  return {
    n,
    parity: Math.abs(n) % 2 === 0 ? "çift" : "tek",
    expansion: expansion(n),
    positive,
    negativeBase,
    outsideMinus: frac206(-positive.n, positive.d),
  };
});
const powerRows = powerRows206();
const powerTable = {
  layout: "table" as const,
  headers: ["n", "Tek / çift", "(−2)ⁿ açılımı", "2ⁿ", "(−2)ⁿ", "−2ⁿ"],
  rows: powerRows.map(({ n, parity, expansion: e, positive, negativeBase, outsideMinus }) =>
    [minus(n), parity, e, fracText206(positive), fracText206(negativeBase), fracText206(outsideMinus)]),
};
const powerRow = (n: number) => powerRows.find((row) => row.n === n)!;
const evenNs = powerRows.filter(({ parity }) => parity === "çift").map(({ n }) => minus(n));
const oddNs = powerRows.filter(({ parity }) => parity === "tek").map(({ n }) => minus(n));
const [pm3, p0, p4] = [powerRow(-3), powerRow(0), powerRow(4)];

export const powerSignSection206: GuideSection = {
  title: "Negatif taban ve negatif üs: işaret tablosu",
  paragraphs: [
    `Tabloda aynı n üssü üç farklı ifadeye uygulanır. 2ⁿ’de taban 2’dir. (−2)ⁿ’de parantez eksiyi tabana katar, taban −2 olur. −2ⁿ’de ise üs yalnız 2’nin üzerindedir; baştaki eksi en son uygulanır. n = ${p4.n} için ${fracText206(p4.positive)}, ${fracText206(p4.negativeBase)} ve ${fracText206(p4.outsideMinus)} çıkar.`,
    `n çift olduğunda (${evenNs.join(", ")}) negatif çarpanlar ikişer eşleşir ve (−2)ⁿ = 2ⁿ olur. n tek olduğunda (${oddNs.join(", ")}) bir negatif çarpan eşsiz kalır ve (−2)ⁿ = −2ⁿ olur. −2ⁿ her satırda negatiftir, çünkü eksi işareti üssün dışındadır. n = 0 satırında 2⁰ = (−2)⁰ = ${fracText206(p0.positive)}, fakat −2⁰ = ${fracText206(p0.outsideMinus)}.`,
    `Negatif üs işareti değiştirmez, sayının tersini alır: 2⁻³ = 1/2³ = ${fracText206(pm3.positive)}. (−2)⁻³ = 1/(−2)³ = ${fracText206(pm3.negativeBase)}; işaret, tabanın negatif ve üssün tek olmasından gelir. Bir satırı okurken sırayla üç soru sor: Taban ne? Üs tek mi, çift mi? Üs negatifse ters çevrildi mi?`,
  ],
  table: powerTable,
};

export const powerExamples206: WorkedExample[] = [
  {
    title: "Ortak negatif tabanla birleştir, işareti sona bırakma",
    prompt: "(−2)³ · (−2)⁻⁵ − (−2⁰) işleminin sonucu kaçtır?",
    strategy: "İlk çarpımda taban aynıdır (−2), üsler toplanır. İkinci terimde parantezin içindeki −2⁰ ifadesinde üs yalnız 2’nin üzerindedir.",
    steps: [
      { label: "Üsleri topla", expression: "(−2)³ · (−2)⁻⁵ = (−2)⁻²", explanation: "Aynı taban: 3 + (−5) = −2." },
      { label: "Negatif üs", expression: "(−2)⁻² = 1/(−2)² = 1/4", explanation: "Üs çift olduğu için işaret pozitif olur." },
      { label: "Parantez içi", expression: "−2⁰ = −1", explanation: "2⁰ = 1, eksi sonra uygulanır." },
      { label: "Çıkar", expression: "1/4 − (−1) = 5/4", explanation: "Negatif bir sayıyı çıkarmak onu eklemektir." },
    ],
    answer: "5/4.",
    check: "Doğrudan: (−2)³ = −8, (−2)⁻⁵ = −1/32. Çarpım 8/32 = 1/4. 1/4 + 1 = 5/4.",
    pitfall: "−2⁰’ı (−2)⁰ gibi 1 almak. Parantez yoksa taban 2’dir ve sonuç −1’dir.",
  },
  {
    title: "İşaret ve büyüklük koşulunu birlikte tara",
    prompt: "n bir tam sayı ve −3 ≤ n ≤ 4 olsun. (−2)ⁿ < 0 ve 2ⁿ < 1 koşullarının ikisini birden sağlayan n değerleri hangileridir?",
    strategy: "İki koşulu ayrı ayrı çöz, sonra ortak değerleri al. İşaret yalnız tek–çift durumuna, büyüklük yalnız üssün işaretine bağlıdır.",
    steps: [
      { label: "İşaret koşulu", expression: "(−2)ⁿ < 0 ⇔ n tek", explanation: "Aralıktaki tek sayılar −3, −1, 1, 3." },
      { label: "Büyüklük koşulu", expression: "2ⁿ < 1 ⇔ n < 0", explanation: "Taban 1’den büyük: 2⁰ = 1 ve üs küçüldükçe değer küçülür. Aralıkta −3, −2, −1." },
      { label: "Ortak değerler", expression: "n ∈ {−3, −1}", explanation: "İki listede de bulunan sayılar." },
    ],
    answer: "n = −3 ve n = −1.",
    check: "(−2)⁻³ = −1/8 ve 2⁻³ = 1/8 < 1; (−2)⁻¹ = −1/2 ve 2⁻¹ = 1/2 < 1. n = 1 için 2¹ = 2 olduğundan ikinci koşul bozulur.",
    pitfall: "Negatif üssün sonucu negatif yaptığını sanmak ve n = −2’yi de almak. (−2)⁻² = 1/4 pozitiftir.",
  },
];

export const powerSignSupplement206 = {
  title: powerSignSection206.title,
  figureTitle: powerSignSection206.title,
  paragraphs: powerSignSection206.paragraphs,
  summary: `n çift: (−2)ⁿ = 2ⁿ. n tek: (−2)ⁿ = −2ⁿ. −2ⁿ hep negatif. Negatif üs ters çevirir, işaret değiştirmez: 2⁻³ = ${fracText206(pm3.positive)}, (−2)⁻³ = ${fracText206(pm3.negativeBase)}. 2⁰ = (−2)⁰ = ${fracText206(p0.positive)}, −2⁰ = ${fracText206(p0.outsideMinus)}.`,
  appendSection: true as const,
  table: powerTable,
  examples: powerExamples206,
};

/* ---------- Çokgenler: kenar sayısından açı ve köşegen ---------- */

const polygonNames: Record<number, string> = { 3: "Üçgen", 4: "Dörtgen", 5: "Beşgen", 6: "Altıgen", 7: "Yedigen", 8: "Sekizgen", 9: "Dokuzgen", 10: "Ongen", 12: "Onikigen" };
export const polygonSides206 = [3, 4, 5, 6, 8, 10, 12] as const;
export const polygonRows206 = (sides: readonly number[] = polygonSides206) => sides.map((n) => ({
  n,
  name: polygonNames[n] ?? `${n}-gen`,
  triangles: n - 2,
  interiorSum: (n - 2) * 180,
  interior: ((n - 2) * 180) / n,
  exterior: 360 / n,
  fromVertex: n - 3,
  diagonals: (n * (n - 3)) / 2,
}));
const polygonRows = polygonRows206();
const polygonTable = {
  layout: "table" as const,
  headers: ["n", "Çokgen", "İç açılar toplamı", "Düzgünse bir iç açı", "Düzgünse bir dış açı", "Bir köşeden köşegen", "Toplam köşegen"],
  rows: polygonRows.map(({ n, name, interiorSum, interior, exterior, fromVertex, diagonals }) =>
    [String(n), name, `${interiorSum}°`, `${interior}°`, `${exterior}°`, String(fromVertex), String(diagonals)]),
};
const polygonRow = (n: number) => polygonRows.find((row) => row.n === n)!;
const [poly5, poly6, poly12] = [polygonRow(5), polygonRow(6), polygonRow(12)];

export const polygonSection206: GuideSection = {
  title: "Kenar sayısından açıları ve köşegenleri tabloyla oku",
  paragraphs: [
    `Tablonun her satırı yalnız n kenar sayısından üretilir. İç açılar toplamı (n−2)·180°, bir köşeden çıkan köşegen n−3, toplam köşegen n(n−3)/2’dir. Bu üç sütun her dışbükey çokgende geçerlidir; kenarların eşit olması gerekmez. Örneğin beşgende toplam ${poly5.interiorSum}°, bir köşeden ${poly5.fromVertex}, toplamda ${poly5.diagonals} köşegen vardır.`,
    `“Düzgünse” yazan iki sütun yalnız bütün kenarları ve açıları eşit çokgenler içindir. Bir dış açı 360°/n, bir iç açı 180° − 360°/n olur. Altıgende ${poly6.exterior}° ve ${poly6.interior}°, onikigende ${poly12.exterior}° ve ${poly12.interior}°. n büyüdükçe dış açı küçülür, iç açı 180°’ye yaklaşır ama hiçbir zaman 180° olmaz.`,
    `Köşegen sayısı kenar sayısından çok daha hızlı büyür: n ${poly6.n}’dan ${poly12.n}’ye iki katına çıkınca köşegen ${poly6.diagonals}’dan ${poly12.diagonals}’e çıkar. Bir köşeden çizilen köşegen sayısı (n−3) ile oluşan üçgen sayısı (n−2) arasında her satırda 1 fark vardır.`,
  ],
  table: polygonTable,
};

export const polygonExamples206: WorkedExample[] = [
  {
    title: "Açı toplamından köşegen sayısına",
    prompt: "Dışbükey bir çokgenin iç açılarının toplamı 1440°’dir. Bu çokgenin kaç köşegeni vardır? Çokgen düzgünse bir iç açısı kaç derecedir?",
    strategy: "İç açılar toplamından n’yi bul. Köşegen formülüne ve düzgün çokgen açısına bu n’yi koy.",
    steps: [
      { label: "Kenar sayısı", expression: "(n − 2) · 180 = 1440 ⇒ n − 2 = 8", explanation: "1440 / 180 = 8, n = 10." },
      { label: "Köşegen", expression: "10 · (10 − 3) / 2 = 35", explanation: "Her köşeden 7 köşegen çıkar; her biri iki kez sayıldığı için 2’ye bölünür." },
      { label: "Düzgünse", expression: "1440° / 10 = 144°", explanation: "Bütün iç açılar eşitse toplam n’ye bölünür." },
    ],
    answer: "35 köşegen. Düzgünse bir iç açı 144°.",
    check: "Bir dış açı 180° − 144° = 36° ve 10 · 36° = 360°.",
    pitfall: "Düzgünlük verilmeden 144°’yi her iç açı sanmak. Köşegen sayısı için düzgünlük gerekmez, tek açı için gerekir.",
  },
  {
    title: "İç açının dış açıya oranından kenar sayısı",
    prompt: "Düzgün bir çokgende bir iç açı, bir dış açının 7 katıdır. Çokgenin kenar sayısı ve köşegen sayısı kaçtır?",
    strategy: "Aynı köşedeki iç ve dış açı bütünlerdir. Dış açıyı x yaz, 8x = 180° denkleminden x’i bul.",
    steps: [
      { label: "Bütünler", expression: "7x + x = 180° ⇒ x = 22,5°", explanation: "Dış açı 22,5°, iç açı 157,5°." },
      { label: "Kenar sayısı", expression: "n = 360° / 22,5° = 16", explanation: "Düzgün çokgende dış açılar eşit ve toplamları 360°." },
      { label: "Köşegen", expression: "16 · 13 / 2 = 104", explanation: "Bir köşeden 13 köşegen çıkar." },
    ],
    answer: "16 kenar, 104 köşegen.",
    check: "İç açı (16 − 2) · 180° / 16 = 157,5° = 7 · 22,5°.",
    pitfall: "Oranı iç açı : iç açılar toplamı gibi yorumlamak ya da iç açıyı 7 · 360°/n yazıp dış açılar toplamıyla karıştırmak.",
  },
];

export const polygonSupplement206 = {
  title: polygonSection206.title,
  figureTitle: polygonSection206.title,
  paragraphs: polygonSection206.paragraphs,
  summary: `Toplam (n−2)·180°, düzgünse dış açı 360°/n, iç açı 180°−360°/n, köşegen n(n−3)/2. n=${poly5.n}: ${poly5.interiorSum}°, ${poly5.interior}°, ${poly5.diagonals}; n=${poly6.n}: ${poly6.interiorSum}°, ${poly6.interior}°, ${poly6.diagonals}; n=${poly12.n}: ${poly12.interiorSum}°, ${poly12.interior}°, ${poly12.diagonals}.`,
  appendSection: true as const,
  table: polygonTable,
  examples: polygonExamples206,
};

/* ---------- Dik prizmalar: ölçülerden beş değer ---------- */

export type PrismBase206 =
  | { kind: "rect"; a: number; b: number }
  | { kind: "right-triangle"; a: number; b: number };
export interface PrismSpec206 { name: string; base: PrismBase206; h: number }
export const prismSpecs206: readonly PrismSpec206[] = [
  { name: "Küp", base: { kind: "rect", a: 4, b: 4 }, h: 4 },
  { name: "Kare dik prizma", base: { kind: "rect", a: 2, b: 2 }, h: 8 },
  { name: "Dikdörtgenler prizması", base: { kind: "rect", a: 3, b: 4 }, h: 5 },
  { name: "Dik üçgen prizma", base: { kind: "right-triangle", a: 6, b: 8 }, h: 5 },
];
export const prismRows206 = (specs: readonly PrismSpec206[] = prismSpecs206) => specs.map(({ name, base, h }) => {
  const hyp = Math.hypot(base.a, base.b);
  const B = base.kind === "rect" ? base.a * base.b : (base.a * base.b) / 2;
  const p = base.kind === "rect" ? 2 * (base.a + base.b) : base.a + base.b + hyp;
  const dims = base.kind === "rect" ? `${base.a} × ${base.b} dikdörtgen` : `dik kenarlar ${base.a} ve ${base.b}, hipotenüs ${hyp}`;
  return { name, base, h, hyp, dims, B, p, lateral: p * h, total: 2 * B + p * h, volume: B * h };
});
const prismRows = prismRows206();
const prismTable = {
  layout: "table" as const,
  headers: ["Cisim", "Taban", "h (cm)", "Taban alanı B (cm²)", "Taban çevresi p (cm)", "Yanal alan p·h (cm²)", "Toplam alan 2B + p·h (cm²)", "Hacim B·h (cm³)"],
  rows: prismRows.map(({ name, dims, h, B, p, lateral, total, volume }) =>
    [name, dims, String(h), String(B), String(p), String(lateral), String(total), String(volume)]),
};
const [cube, squarePrism, box, triPrism] = prismRows;

export const prismSection206: GuideSection = {
  title: "Ölçülerden taban, çevre, yanal alan, toplam alan ve hacim",
  paragraphs: [
    `Her dik prizmada aynı beş adım aynı sırayla yapılır. Önce taban alanı B, sonra taban çevresi p bulunur. Yanal alan p·h, toplam alan 2B + p·h, hacim B·h olur. Tablodaki ${prismRows.length} cisim bu sırayla hesaplandı. Örneğin ${box.base.a} × ${box.base.b} tabanlı, ${box.h} cm yüksekliğindeki prizmada B = ${box.B}, p = ${box.p}, yanal alan ${box.lateral}, toplam alan ${box.total} cm² ve hacim ${box.volume} cm³’tür.`,
    `Yanal alan ile hacim farklı şeyleri ölçer. Ayrıtı ${cube.h} cm olan küp ile ${squarePrism.base.a} × ${squarePrism.base.b} tabanlı, ${squarePrism.h} cm yüksekliğindeki kare prizmanın yanal alanları aynıdır: ${cube.lateral} ve ${squarePrism.lateral} cm². Hacimleri ise ${cube.volume} ve ${squarePrism.volume} cm³’tür. Toplam alanlar da farklıdır: ${cube.total} ve ${squarePrism.total} cm².`,
    `Dik üçgen tabanlı prizmada taban alanı dik kenarlardan bulunur: ${triPrism.base.a} · ${triPrism.base.b} / 2 = ${triPrism.B}. Hipotenüs ${triPrism.hyp} cm yalnız çevreye girer: p = ${triPrism.p}. Bu yüzden yanal alan ${triPrism.lateral}, hacim ${triPrism.volume} çıkar. Birim denetimi: B ve alanlar cm², p ve h cm, hacim cm³.`,
  ],
  table: prismTable,
};

export const prismExamples206: WorkedExample[] = [
  {
    title: "Yanal alandan taban kenarına geri dön",
    prompt: "Kare tabanlı bir dik prizmanın yanal alanı 96 cm², yüksekliği 6 cm’dir. Prizmanın toplam alanı ve hacmi nedir?",
    strategy: "Yanal alan = taban çevresi · yükseklik. Çevreden taban kenarını, kenardan taban alanını bul.",
    steps: [
      { label: "Çevre", expression: "p · 6 = 96 ⇒ p = 16", explanation: "Yanal alan dört dikdörtgenin toplamıdır." },
      { label: "Taban kenarı", expression: "4a = 16 ⇒ a = 4", explanation: "Kare tabanın dört eş kenarı vardır." },
      { label: "Toplam alan", expression: "2 · 16 + 96 = 128", explanation: "İki kare taban (her biri 16 cm²) yanal alana eklenir." },
      { label: "Hacim", expression: "16 · 6 = 96", explanation: "Taban alanı çarpı yükseklik." },
    ],
    answer: "Toplam alan 128 cm², hacim 96 cm³.",
    check: "Açınımda 4 cm × 6 cm boyutlu dört dikdörtgen 96 cm², iki 4 × 4 kare 32 cm² eder.",
    pitfall: "Yanal alanı toplam alan sanıp tabanları eklememek. Ya da 96 cm³ hacmi 96 cm² yanal alanla aynı şey sanmak: sayılar eşit, birimler farklıdır.",
  },
  {
    title: "Üç yüz alanından hacmi bul",
    prompt: "Bir dikdörtgenler prizmasının farklı üç yüzünün alanları 6 cm², 8 cm² ve 12 cm²’dir. Prizmanın ayrıtları, hacmi ve toplam alanı nedir?",
    strategy: "Ayrıtlar a, b, c olsun: ab = 6, ac = 8, bc = 12. Üç eşitliği çarpınca (abc)² çıkar.",
    steps: [
      { label: "Çarp", expression: "(abc)² = 6 · 8 · 12 = 576", explanation: "Her ayrıt iki kez çarpılmış olur." },
      { label: "Hacim", expression: "abc = √576 = 24", explanation: "Uzunluklar pozitif olduğu için pozitif kök alınır." },
      { label: "Ayrıtlar", expression: "c = 24/6 = 4, b = 24/8 = 3, a = 24/12 = 2", explanation: "Hacmi her yüz alanına bölünce o yüzde bulunmayan ayrıt çıkar." },
      { label: "Toplam alan", expression: "2 · (6 + 8 + 12) = 52", explanation: "Karşılıklı yüzler eştir; her yüz alanı iki kez sayılır." },
    ],
    answer: "Ayrıtlar 2, 3, 4 cm; hacim 24 cm³; toplam alan 52 cm².",
    check: "2 · 3 = 6, 2 · 4 = 8, 3 · 4 = 12 ve 2 · 3 · 4 = 24.",
    pitfall: "Üç yüz alanını toplayıp hacim sanmak (26). Hacim yüz alanlarının çarpımının kareköküdür.",
  },
];

export const prismSupplement206 = {
  title: prismSection206.title,
  figureTitle: prismSection206.title,
  paragraphs: prismSection206.paragraphs,
  summary: `Sıra: B → p → yanal p·h → toplam 2B + p·h → hacim B·h. ${box.base.a}×${box.base.b}×${box.h}: ${box.B}, ${box.p}, ${box.lateral}, ${box.total}, ${box.volume}. Küp ${cube.h} ile ${squarePrism.base.a}×${squarePrism.base.b}×${squarePrism.h}: yanal ${cube.lateral} = ${squarePrism.lateral}, hacim ${cube.volume} ≠ ${squarePrism.volume}.`,
  appendSection: true as const,
  table: prismTable,
  examples: prismExamples206,
};

/* ---------- Piramitler: kare taban ve yükseklikten bütün ölçüler ---------- */

export const pyramidSpecs206 = [
  { a: 6, h: 4 },
  { a: 8, h: 3 },
  { a: 10, h: 12 },
  { a: 16, h: 6 },
] as const;
export const pyramidRows206 = (specs: readonly { a: number; h: number }[] = pyramidSpecs206) => specs.map(({ a, h }) => {
  const slantSquared = h ** 2 + (a / 2) ** 2;
  const slant = Math.sqrt(slantSquared);
  const edge = radical203(1, h ** 2 + a ** 2 / 2);
  return {
    a,
    h,
    inradius: a / 2,
    slantSquared,
    slant,
    edge,
    base: a ** 2,
    lateral: 2 * a * slant,
    total: a ** 2 + 2 * a * slant,
    volume: (a ** 2 * h) / 3,
    prismVolume: a ** 2 * h,
  };
});
const pyramidRows = pyramidRows206();
const pyramidTable = {
  layout: "table" as const,
  headers: ["a (cm)", "h (cm)", "a/2", "Yan yüz yüksekliği ℓ", "Yan ayrıt e", "Yanal alan 2aℓ (cm²)", "Toplam alan a² + 2aℓ (cm²)", "Hacim a²h/3 (cm³)", "Prizma a²h (cm³)"],
  rows: pyramidRows.map(({ a, h, inradius, slant, edge, lateral, total, volume, prismVolume }) =>
    [String(a), String(h), String(inradius), String(slant), radicalText203(edge), String(lateral), String(total), String(volume), String(prismVolume)]),
};
const [pyr1, pyr2, pyr3] = pyramidRows;

export const pyramidSection206: GuideSection = {
  title: "Kare piramitte taban kenarı ve yükseklikten bütün ölçüler",
  paragraphs: [
    `Düzgün kare piramitte taban kenarı a, dik yükseklik h olsun. Tepe T, taban merkezi O, bir taban kenarının orta noktası M’dir. TOM dik üçgeninde OM = a/2 olduğundan yan yüz yüksekliği ℓ = √(h² + (a/2)²) olur. Tablodaki satırlar tam sayı ℓ verecek biçimde seçildi. a = ${pyr2.a}, h = ${pyr2.h} için ℓ = √(${pyr2.h ** 2} + ${pyr2.inradius ** 2}) = ${pyr2.slant} cm.`,
    `Yan ayrıt e başka bir dik üçgenden gelir: taban merkezinden köşeye uzaklık a√2/2’dir ve e = √(h² + a²/2). Bu yüzden e her satırda ℓ’den uzundur: ${pyramidRows.map(({ slant, edge }) => `${slant} < ${radicalText203(edge)}`).join(", ")}. Yanal alan dört eş üçgenin toplamıdır: 4 · a · ℓ / 2 = 2aℓ. a = ${pyr3.a}, ℓ = ${pyr3.slant} için yanal alan ${pyr3.lateral}, toplam alan ${pyr3.base} + ${pyr3.lateral} = ${pyr3.total} cm².`,
    `Hacimde ℓ değil h kullanılır: V = a²h/3. Son sütun aynı taban ve yükseklikteki kare prizmanın hacmidir. Her satırda piramit prizmanın üçte biridir: ${pyramidRows.map(({ volume, prismVolume }) => `${volume} · 3 = ${prismVolume}`).join(", ")}. a = ${pyr1.a}, h = ${pyr1.h} ile a = ${pyr2.a}, h = ${pyr2.h} satırlarında yan yüz yüksekliği aynıdır (ℓ = ${pyr1.slant}), fakat hacimler ${pyr1.volume} ve ${pyr2.volume} cm³’tür. ℓ tek başına hacmi belirlemez.`,
  ],
  table: pyramidTable,
};

export const pyramidExamples206: WorkedExample[] = [
  {
    title: "Yan yüz yüksekliğinden hacme",
    prompt: "Düzgün kare piramidin taban kenarı 14 cm, yan yüz yüksekliği 25 cm’dir. Piramidin dik yüksekliği, toplam alanı ve hacmi nedir?",
    strategy: "TOM dik üçgeninde hipotenüs ℓ = 25, bir dik kenar OM = 7’dir. Diğer dik kenar h’dir. Alan için ℓ, hacim için h kullanılır.",
    steps: [
      { label: "Dik yükseklik", expression: "h = √(25² − 7²) = √576 = 24", explanation: "OM, taban kenarının yarısıdır: 14 / 2 = 7." },
      { label: "Yanal alan", expression: "2 · 14 · 25 = 700", explanation: "Dört yan üçgenin her biri 14 · 25 / 2 = 175 cm²." },
      { label: "Toplam alan", expression: "14² + 700 = 896", explanation: "Kare taban 196 cm² eklenir." },
      { label: "Hacim", expression: "196 · 24 / 3 = 1568", explanation: "Taban alanı çarpı dik yükseklik, bölü 3." },
    ],
    answer: "h = 24 cm, toplam alan 896 cm², hacim 1568 cm³.",
    check: "7² + 24² = 49 + 576 = 625 = 25². Aynı taban ve yükseklikteki prizma 196 · 24 = 4704 = 3 · 1568.",
    pitfall: "Hacimde yan yüz yüksekliğini (25) kullanmak. Hacim, tabana dik uzaklığı ister: 24 cm.",
  },
  {
    title: "Prizmadan piramit oyulunca kalan hacim",
    prompt: "Taban kenarı 6 cm, yüksekliği 9 cm olan kare dik prizmanın içinden, tabanı prizmanın alt tabanı ve tepesi üst tabanın merkezi olan bir piramit oyuluyor. Prizmada kalan hacim kaç cm³’tür?",
    strategy: "Piramit ile prizmanın tabanı ve yüksekliği aynıdır. Piramit prizmanın üçte biri, kalan kısım üçte ikisidir.",
    steps: [
      { label: "Prizma", expression: "6² · 9 = 324", explanation: "Taban alanı 36 cm², yükseklik 9 cm." },
      { label: "Piramit", expression: "36 · 9 / 3 = 108", explanation: "Tepe üst tabanın merkezinde olduğu için piramidin dik yüksekliği de 9 cm’dir." },
      { label: "Kalan", expression: "324 − 108 = 216", explanation: "Prizmanın 2/3’ü kalır." },
    ],
    answer: "216 cm³.",
    check: "216 / 324 = 2/3 ve 108 · 3 = 324.",
    pitfall: "Kalan hacmi piramidin hacmi sanmak ya da oranı 1/2 almak. Aynı taban ve yükseklikte piramit 1/3, kalan 2/3’tür.",
  },
];

export const pyramidSupplement206 = {
  title: pyramidSection206.title,
  figureTitle: pyramidSection206.title,
  paragraphs: pyramidSection206.paragraphs,
  summary: `ℓ = √(h² + (a/2)²), e = √(h² + a²/2), yanal 2aℓ, toplam a² + 2aℓ, V = a²h/3 = prizmanın 1/3’ü. a=${pyr2.a}, h=${pyr2.h}: ℓ=${pyr2.slant}, e=${radicalText203(pyr2.edge)}, toplam ${pyr2.total}, V=${pyr2.volume}.`,
  appendSection: true as const,
  table: pyramidTable,
  examples: pyramidExamples206,
};

export const geometryDepth206Supplements = {
  "uslu-sayilar": [powerSignSupplement206],
  "tyt-geo-cokgenler-032": [polygonSupplement206],
};
