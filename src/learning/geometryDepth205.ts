import type { GuideSection, WorkedExample } from "./guides/types";
import { radical203, radicalText203 } from "./geometryDepth203";

/*
 * TYT Geometri derinleştirmesi (0.205.0). Kabul edilmiş rehberler değişmez;
 * her derse görüntüleme katmanında bir tablo bölümü, iki özgün çözümlü örnek
 * ve bir bölüm çizimi eklenir. Paragraflardaki sayılar, tablo satırları,
 * çizim etiketleri ve Kopya Kâğıdı özetleri aynı fonksiyonlardan üretilir.
 */

const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));

/* ---------- Kesir yardımcıları (tam sayılarla kesin hesap) ---------- */

export interface Frac205 { n: number; d: number }
export const frac205 = (n: number, d = 1): Frac205 => {
  if (d === 0) throw new Error("Payda sıfır olamaz");
  const sign = d < 0 ? -1 : 1;
  const g = gcd(n, d) || 1;
  return { n: (sign * n) / g, d: Math.abs(d) / g };
};
const fAdd = (x: Frac205, y: Frac205) => frac205(x.n * y.d + y.n * x.d, x.d * y.d);
const fSub = (x: Frac205, y: Frac205) => frac205(x.n * y.d - y.n * x.d, x.d * y.d);
const fMul = (x: Frac205, y: Frac205) => frac205(x.n * y.n, x.d * y.d);
const fDiv = (x: Frac205, y: Frac205) => frac205(x.n * y.d, x.d * y.n);
export const fracValue205 = ({ n, d }: Frac205) => n / d;
const minus = (s: string) => s.replace("-", "−");
/** 19/3, 4, −5/2 */
export const fracText205 = ({ n, d }: Frac205) => minus(d === 1 ? String(n) : `${n}/${d}`);
/** Sonlu ondalık açılımı varsa 2,4; yoksa 60/13. */
export const decimalText205 = (x: Frac205) => {
  let d = x.d;
  while (d % 2 === 0) d /= 2;
  while (d % 5 === 0) d /= 5;
  if (d !== 1) return fracText205(x);
  return minus(String(Number((x.n / x.d).toFixed(6))).replace(".", ","));
};
const isqrt = (n: number) => {
  const r = Math.round(Math.sqrt(n));
  if (r * r !== n) throw new Error(`${n} tam kare değil`);
  return r;
};
/** Tam kare kesrin karekökü (ör. 4225/64 → 65/8). */
const fSqrt = (x: Frac205) => frac205(isqrt(x.n), isqrt(x.d));
const pointText = (x: Frac205, y: Frac205) => `(${fracText205(x)}; ${fracText205(y)})`;

/* ---------- Üçgenin dört merkezi: 13–14–15 üçgeninde koordinat ---------- */

export type IntPoint205 = readonly [number, number];
export const centerVertices205 = { A: [5, 12], B: [0, 0], C: [14, 0] } as const satisfies Record<string, IntPoint205>;

export interface CenterPoint205 { x: Frac205; y: Frac205 }
/** Tamsayı köşeli ve tamsayı kenarlı bir üçgenin G, I, H, O merkezleri, kesin kesirlerle. */
export const triangleCenters205 = (A: IntPoint205 = centerVertices205.A, B: IntPoint205 = centerVertices205.B, C: IntPoint205 = centerVertices205.C) => {
  const sq = (P: IntPoint205, Q: IntPoint205) => (P[0] - Q[0]) ** 2 + (P[1] - Q[1]) ** 2;
  const a = isqrt(sq(B, C));
  const b = isqrt(sq(C, A));
  const c = isqrt(sq(A, B));
  const doubleArea = Math.abs((B[0] - A[0]) * (C[1] - A[1]) - (C[0] - A[0]) * (B[1] - A[1]));
  const perimeter = a + b + c;
  const G: CenterPoint205 = { x: frac205(A[0] + B[0] + C[0], 3), y: frac205(A[1] + B[1] + C[1], 3) };
  const I: CenterPoint205 = {
    x: frac205(a * A[0] + b * B[0] + c * C[0], perimeter),
    y: frac205(a * A[1] + b * B[1] + c * C[1], perimeter),
  };
  // Orta dikmeler: 2(B−A)·X = |B|²−|A|², 2(C−A)·X = |C|²−|A|² (Cramer).
  const [p1, q1, r1] = [2 * (B[0] - A[0]), 2 * (B[1] - A[1]), B[0] ** 2 + B[1] ** 2 - A[0] ** 2 - A[1] ** 2];
  const [p2, q2, r2] = [2 * (C[0] - A[0]), 2 * (C[1] - A[1]), C[0] ** 2 + C[1] ** 2 - A[0] ** 2 - A[1] ** 2];
  const det = p1 * q2 - p2 * q1;
  const O: CenterPoint205 = { x: frac205(r1 * q2 - r2 * q1, det), y: frac205(p1 * r2 - p2 * r1, det) };
  const H: CenterPoint205 = {
    x: fSub(frac205(A[0] + B[0] + C[0]), fMul(frac205(2), O.x)),
    y: fSub(frac205(A[1] + B[1] + C[1]), fMul(frac205(2), O.y)),
  };
  const toA = (P: CenterPoint205) => fAdd(fMul(fSub(P.x, frac205(A[0])), fSub(P.x, frac205(A[0]))), fMul(fSub(P.y, frac205(A[1])), fSub(P.y, frac205(A[1]))));
  const M = { x: frac205(B[0] + C[0], 2), y: frac205(B[1] + C[1], 2) };
  const GM2 = fAdd(fMul(fSub(G.x, M.x), fSub(G.x, M.x)), fMul(fSub(G.y, M.y), fSub(G.y, M.y)));
  const OG2 = fAdd(fMul(fSub(G.x, O.x), fSub(G.x, O.x)), fMul(fSub(G.y, O.y), fSub(G.y, O.y)));
  const GH2 = fAdd(fMul(fSub(H.x, G.x), fSub(H.x, G.x)), fMul(fSub(H.y, G.y), fSub(H.y, G.y)));
  return {
    sides: { a, b, c },
    area: frac205(doubleArea, 2),
    semiPerimeter: frac205(perimeter, 2),
    G, I, H, O, M,
    inradius: frac205(doubleArea, perimeter),
    circumradius: fSqrt(toA(O)),
    /** AG : GM */
    medianRatio: fSqrt(fDiv(toA(G), GM2)),
    /** Altı küçük üçgenden birinin alanı */
    sixthArea: frac205(doubleArea, 12),
    /** GH : OG (Euler doğrusu) */
    eulerRatio: fSqrt(fDiv(GH2, OG2)),
  };
};

const centers = triangleCenters205();
const [vA, vB, vC] = [centerVertices205.A, centerVertices205.B, centerVertices205.C].map(([x, y]) => `(${x}; ${y})`);
export const centerRows205 = () => [
  {
    name: "G", center: "Ağırlık merkezi", lines: "Üç kenarortay", point: centers.G,
    equal: `Altı küçük üçgenin alanı: ${fracText205(centers.sixthArea)}; AG : GM = ${fracText205(centers.medianRatio)} : 1`,
    place: "Her üçgende içeride",
  },
  {
    name: "I", center: "İç merkez", lines: "Üç iç açıortay", point: centers.I,
    equal: `Kenarlara dik uzaklık r = ${fracText205(centers.inradius)}`,
    place: "Her üçgende içeride",
  },
  {
    name: "H", center: "Diklik merkezi", lines: "Üç yükseklik", point: centers.H,
    equal: "Eş uzaklık yok; her köşeden karşı kenara 90°",
    place: "Dar: içeride · dik: dik köşede · geniş: dışarıda",
  },
  {
    name: "O", center: "Çevrel merkez", lines: "Üç kenar orta dikmesi", point: centers.O,
    equal: `Köşelere uzaklık R = ${fracText205(centers.circumradius)}`,
    place: "Dar: içeride · dik: hipotenüs ortasında · geniş: dışarıda",
  },
].map((row) => ({ ...row, pointText: `${row.name}${pointText(row.point.x, row.point.y)}` }));
const centerRows = centerRows205();
const centerTable = {
  layout: "table" as const,
  headers: ["Merkez", "Kesişen doğrular", "Eşit olan", "13–14–15 üçgeninde", "Üçgen türüne göre yeri"],
  rows: centerRows.map(({ name, center, lines, equal, pointText: p, place }) => [`${name}: ${center}`, lines, equal, p, place]),
};
const { sides, area: centerArea, semiPerimeter } = centers;
const sideSquares = [sides.a, sides.b, sides.c].map((x) => x * x).sort((x, y) => x - y);
const longestSquare = sideSquares[2];
const otherSquares = sideSquares[0] + sideSquares[1];
if (otherSquares <= longestSquare) throw new Error("Merkez tablosu dar açılı üçgen ister");

export const centerSection205: GuideSection = {
  title: "Dört merkezi aynı üçgende koordinatla karşılaştır",
  paragraphs: [
    `Koordinat düzleminde B${vB}, C${vC} ve A${vA} köşelerini al. Uzaklık formülüyle AB=${sides.c}, AC=${sides.b} ve BC=${sides.a} çıkar; BC tabanı x ekseni üzerindedir ve A’dan BC’ye yükseklik ${centerVertices205.A[1]}’dir. Alan ${fracText205(centerArea)}, yarı çevre ${fracText205(semiPerimeter)} birimdir. En uzun kenarın karesi ${longestSquare}, diğer iki karenin toplamı ${otherSquares} olduğundan üçgen dar açılıdır ve dört merkez de içeride kalır.`,
    `Tablonun her satırı bir merkezin hangi üç doğrunun kesişimi olduğunu ve bu noktada neyin eşit olduğunu verir. İç yarıçap alan/yarı çevre = ${fracText205(centerArea)}/${fracText205(semiPerimeter)} = ${fracText205(centers.inradius)}; bu yüzden I’nın y koordinatı ${fracText205(centers.I.y)}’tür, çünkü BC x ekseni üzerindedir. O’nun köşelere uzaklığı ${fracText205(centers.circumradius)} birimdir. O, G ve H aynı doğru üzerindedir (Euler doğrusu) ve GH, OG’nin ${fracText205(centers.eulerRatio)} katıdır. I genel üçgende bu doğrunun üzerinde değildir.`,
  ],
  table: centerTable,
};

export const centerExamples205: WorkedExample[] = [
  {
    title: "Dik üçgende O, G ve H aynı kenarortayda",
    prompt: "ABC üçgeninde A açısı 90°, AB = 9 cm ve AC = 12 cm’dir. O çevrel merkez (kenar orta dikmelerinin kesişimi), G ağırlık merkezi (kenarortayların kesişimi), H diklik merkezidir (yüksekliklerin kesişimi). |OG| ve |GH| kaç cm’dir?",
    strategy: "Dik üçgende O’nun ve H’nin nerede olduğunu önce tanımlardan bul. Sonra G’nin A’dan BC’ye çizilen kenarortayı 2 : 1 böldüğünü kullan.",
    steps: [
      { label: "Hipotenüs", expression: "BC = √(9² + 12²) = 15", explanation: "Dik açının karşısındaki kenar BC’dir." },
      { label: "O’nun yeri", expression: "O = BC’nin orta noktası, AO = 15/2 = 7,5", explanation: "Dik üçgende hipotenüsün orta noktası üç köşeye eşit uzaklıktadır." },
      { label: "H’nin yeri", expression: "H = A", explanation: "AB ve AC birbirine dik olduğu için ikisi de birer yüksekliktir; kesişimleri A’dır." },
      { label: "G’nin yeri", expression: "AG = 2/3 · 7,5 = 5, GO = 1/3 · 7,5 = 2,5", explanation: "AO, A’dan çizilen kenarortaydır ve G onu köşeden başlayarak 2 : 1 böler." },
      { label: "İstenenler", expression: "|OG| = 2,5 cm, |GH| = |GA| = 5 cm", explanation: "H = A olduğundan GH uzunluğu AG’ye eşittir." },
    ],
    answer: "|OG| = 2,5 cm ve |GH| = 5 cm.",
    check: "Koordinatla A(0; 0), B(9; 0), C(0; 12): O(4,5; 6), G(3; 4), H(0; 0). |OG| = √(1,5² + 2²) = 2,5 ve |GH| = √(3² + 4²) = 5; GH = 2·OG tutar.",
    pitfall: "Diklik merkezini dik üçgenin içinde bir nokta sanmak. Dik üçgende iki dik kenar zaten yüksekliktir, H dik köşenin kendisidir.",
  },
  {
    title: "Diklik ve çevrel merkezden kenarı gören açılar",
    prompt: "Dar açılı ABC üçgeninde ∠A = 50°, ∠B = 60°’dir. H üç yüksekliğin, O üç kenar orta dikmesinin kesişimidir. ∠BHC ve ∠BOC kaç derecedir?",
    strategy: "H için B ve C’den inen yüksekliklerin oluşturduğu dörtgende açı toplamını kullan. O için OB = OC = OA eşitliğinden merkez açıyı çevre açıya bağla.",
    steps: [
      { label: "Yükseklik ayakları", expression: "E ∈ AC, F ∈ AB; BE ⊥ AC, CF ⊥ AB", explanation: "E ve F, B ve C’den inen yüksekliklerin ayaklarıdır; H bu iki doğrunun kesişimidir." },
      { label: "AFHE dörtgeni", expression: "∠FHE = 360° − 90° − 90° − 50° = 130°", explanation: "F ve E’de dik açı, A’da 50° vardır. Dörtgenin iç açıları toplamı 360°’dir." },
      { label: "∠BHC", expression: "∠BHC = ∠FHE = 130°", explanation: "BHE ve CHF doğrularının oluşturduğu ters açılar eşittir. Kısaca ∠BHC = 180° − A." },
      { label: "∠BOC", expression: "∠BOC = 2 · 50° = 100°", explanation: "O çevrel çemberin merkezidir; BC yayını gören merkez açı, aynı yayı gören A çevre açısının iki katıdır." },
    ],
    answer: "∠BHC = 130°, ∠BOC = 100°.",
    check: "İç merkez için de ∠BIC = 90° + 50°/2 = 115° olur. Üç sonuç farklıdır: aynı BC kenarını H, I ve O farklı açılarla görür. Koordinatla kurulan 50°–60°–70° üçgeninde ölçülen açılar da 130° ve 100° çıkar.",
    pitfall: "Üç merkezin açı kurallarını karıştırmak: I için 90° + A/2, H için 180° − A, O için 2A. Önce noktanın hangi doğruların kesişimi olduğunu yaz.",
  },
];

export const centerSupplement205 = {
  title: centerSection205.title,
  figureTitle: centerSection205.title,
  paragraphs: centerSection205.paragraphs,
  summary: `G kenarortaylar (AG : GM = ${fracText205(centers.medianRatio)} : 1), I iç açıortaylar (kenarlara eş uzaklık), H yükseklikler, O kenar orta dikmeleri (köşelere eş uzaklık). 13–14–15 üçgeninde ${centerRows.map(({ pointText: p }) => p).join(", ")}; r = ${fracText205(centers.inradius)}, R = ${fracText205(centers.circumradius)}, GH = ${fracText205(centers.eulerRatio)}·OG.`,
  appendSection: true as const,
  table: centerTable,
  examples: centerExamples205,
};

/* ---------- Benzerlik oranı k: uzunluk, çevre, alan ---------- */

export const similarityBase205 = { legs: [6, 8] as const, hypotenuse: 10 };
export const similarityScales205: readonly Frac205[] = [frac205(1, 2), frac205(1), frac205(3, 2), frac205(2), frac205(5, 2)];
export const similarityRows205 = (scales = similarityScales205) => {
  const [p, q] = similarityBase205.legs;
  const r = similarityBase205.hypotenuse;
  const basePerimeter = p + q + r;
  const baseArea = frac205(p * q, 2);
  const baseHeight = frac205(p * q, r);
  return scales.map((k) => ({
    k,
    sides: [p, q, r].map((s) => fMul(k, frac205(s))),
    height: fMul(k, baseHeight),
    perimeter: fMul(k, frac205(basePerimeter)),
    area: fMul(fMul(k, k), baseArea),
    areaRatio: fMul(k, k),
  }));
};
const similarityRows = similarityRows205();
const simBase = similarityRows.find(({ k }) => k.n === 1 && k.d === 1)!;
const simTable = {
  layout: "table" as const,
  headers: ["k (yeni/eski)", "Kenarlar", "Hipotenüse ait yükseklik", "Çevre (oran k)", "Alan (oran k²)"],
  rows: similarityRows.map(({ k, sides: s, height, perimeter, area, areaRatio }) => [
    fracText205(k),
    s.map(decimalText205).join(" – "),
    decimalText205(height),
    `${decimalText205(perimeter)} (${fracText205(k)})`,
    `${decimalText205(area)} (${fracText205(areaRatio)})`,
  ]),
};
const simHalf = similarityRows[0];
const simDouble = similarityRows.find(({ k }) => k.n === 2 && k.d === 1)!;

export const similaritySection205: GuideSection = {
  title: "Benzerlik oranı k: uzunluklar k ile, alan k² ile değişir",
  paragraphs: [
    `Başlangıç üçgeni dik kenarları ${simBase.sides.slice(0, 2).map(decimalText205).join(" ve ")}, hipotenüsü ${decimalText205(simBase.sides[2])} birim olan dik üçgendir. Çevresi ${decimalText205(simBase.perimeter)}, alanı ${decimalText205(simBase.area)} birim², hipotenüse ait yüksekliği ${decimalText205(simBase.height)} birimdir. Her satırda bütün kenarlar aynı k sayısıyla çarpılır; k = yeni uzunluk / eski uzunluk demektir. k < 1 küçültme, k > 1 büyütmedir.`,
    `Kenarlar, yükseklik ve çevre gibi bütün uzunluklar k ile çarpılır. Alan ise iki uzunluğun çarpımı olduğundan k² ile çarpılır. k = ${fracText205(simHalf.k)} satırında çevre ${decimalText205(simHalf.perimeter)}’ye iner ama alan ${decimalText205(simHalf.area)} olur, yani eski alanın ${fracText205(simHalf.areaRatio)}’ü. k = ${fracText205(simDouble.k)} için çevre ${decimalText205(simDouble.perimeter)}, alan ${decimalText205(simDouble.area)}; alan ${fracText205(simDouble.areaRatio)} katına çıkar. Alan oranından uzunluk oranına dönerken pozitif karekök alınır.`,
  ],
  table: simTable,
};

export const similarityExamples205: WorkedExample[] = [
  {
    title: "Dik üçgenin içine yerleşen kare",
    prompt: "ABC üçgeninde A açısı 90°, AB = 6 cm ve AC = 12 cm’dir. Bir kenarı x olan ADEF karesinin D köşesi AB üzerinde, F köşesi AC üzerinde, E köşesi BC üzerindedir. Karenin kenarı ve alanı nedir?",
    strategy: "Kare, B köşesinde ana üçgene benzer küçük bir dik üçgen bırakır. Karşılıklı kenarları aynı yönde oranla.",
    steps: [
      { label: "Küçük üçgen", expression: "DBE: D’de dik açı, B ortak", explanation: "DE ∥ AC olduğu için DBE ile ABC üçgenleri AA benzerliğiyle benzerdir." },
      { label: "Eşleme", expression: "DE/AC = DB/AB", explanation: "DE, AC’nin; DB, AB’nin karşılığıdır. DE = x ve DB = 6 − x." },
      { label: "Denklem", expression: "x/12 = (6 − x)/6", explanation: "İçler dışlar çarpımı: 6x = 72 − 12x, 18x = 72." },
      { label: "Çöz", expression: "x = 4, alan = 16", explanation: "Karenin kenarı 4 cm, alanı 4² = 16 cm²." },
    ],
    answer: "Kenar 4 cm, alan 16 cm².",
    check: "Koordinatla A(0; 0), B(0; 6), C(12; 0): BC doğrusu x/12 + y/6 = 1. E(4; 4) için 4/12 + 4/6 = 1, yani E gerçekten BC üzerindedir.",
    pitfall: "DE’yi AB ile eşleştirmek. DE, AC’ye paraleldir; benzerlikte paralel kenarlar birbirinin karşılığıdır.",
  },
  {
    title: "Kenarortay oranından alan",
    prompt: "Benzer iki üçgende karşılıklı kenarortayların uzunlukları küçükte 6 cm, büyükte 9 cm’dir. Küçük üçgenin alanı 28 cm² ise büyük üçgenin alanı kaç cm²’dir?",
    strategy: "Kenarortay da bir uzunluktur; benzerlik oranını verir. Alan oranı bu oranın karesidir.",
    steps: [
      { label: "Oran", expression: "k = 9/6 = 3/2", explanation: "Büyük/küçük oranı seçildi; bütün hesapta bu yön korunur." },
      { label: "Alan oranı", expression: "k² = 9/4", explanation: "Alan iki uzunluğun çarpımı olduğu için oran iki kez çarpılır." },
      { label: "Büyük alan", expression: "28 · 9/4 = 63", explanation: "Küçük alan alan oranıyla çarpılır." },
    ],
    answer: "Büyük üçgenin alanı 63 cm².",
    check: "Oranı ters yönde denetle: 28/63 = 4/9 = (6/9)², yani küçük/büyük uzunluk oranının karesi.",
    pitfall: "Alanı 28 · 3/2 = 42 bulmak. Kenarortay oranı alanı değil uzunlukları doğrudan verir; alan için karesi gerekir.",
  },
];

export const similaritySupplement205 = {
  title: similaritySection205.title,
  figureTitle: similaritySection205.title,
  paragraphs: similaritySection205.paragraphs,
  summary: `Uzunluk, yükseklik, çevre → k; alan → k². ${simBase.sides.map(decimalText205).join("–")} üçgeninde (çevre ${decimalText205(simBase.perimeter)}, alan ${decimalText205(simBase.area)}) k = ${fracText205(simHalf.k)} için çevre ${decimalText205(simHalf.perimeter)}, alan ${decimalText205(simHalf.area)}; k = ${fracText205(simDouble.k)} için çevre ${decimalText205(simDouble.perimeter)}, alan ${decimalText205(simDouble.area)}.`,
  appendSection: true as const,
  table: simTable,
  examples: similarityExamples205,
};

/* ---------- Dik üçgen: Öklid bağıntıları beş üçgende ---------- */

export const euclidLegs205: readonly (readonly [number, number])[] = [[3, 4], [6, 8], [5, 12], [8, 15], [15, 20]];
export const euclidRows205 = (legs = euclidLegs205) => legs.map(([ab, ac]) => {
  const bc = isqrt(ab * ab + ac * ac);
  const p = frac205(ab * ab, bc);
  const q = frac205(ac * ac, bc);
  const h = frac205(ab * ac, bc);
  return { ab, ac, bc, p, q, h, h2: fMul(h, h), pq: fMul(p, q), pPlusQ: fAdd(p, q) };
});
const euclidRows = euclidRows205();
const euclidTable = {
  layout: "table" as const,
  headers: ["AB, AC", "BC", "p = BH = AB²/BC", "q = HC = AC²/BC", "h = AH = AB·AC/BC", "h² = p·q"],
  rows: euclidRows.map(({ ab, ac, bc, p, q, h, h2 }) =>
    [`${ab}, ${ac}`, String(bc), fracText205(p), fracText205(q), fracText205(h), fracText205(h2)]),
};
const [eu345, eu68, , , eu1520] = euclidRows;
if (eu68.ab !== 2 * eu345.ab || eu68.ac !== 2 * eu345.ac || ![eu1520.p, eu1520.q, eu1520.h].every(({ d }) => d === 1)) throw new Error("Öklid tablosu paragraf iddialarıyla uyuşmuyor");

export const euclidSection205: GuideSection = {
  title: "Öklid bağıntılarını beş dik üçgende sına",
  paragraphs: [
    `Her satırda ABC üçgeninin A açısı 90°’dir; AB ve AC dik kenarlar, BC hipotenüstür. H, A’dan BC’ye inen dikmenin ayağıdır: BH = p, HC = q ve AH = h. AB²=BC·p ve AC²=BC·q olduğundan p = AB²/BC ve q = AC²/BC yazılır. Alan iki yoldan aynı çıktığı için h = AB·AC/BC olur. Örneğin ${eu345.ab}–${eu345.ac}–${eu345.bc} üçgeninde p = ${fracText205(eu345.p)}, q = ${fracText205(eu345.q)} ve h = ${fracText205(eu345.h)}’tir.`,
    `Son sütun her satırda h² = p·q denetimini yapar. Ayrıca p + q her satırda hipotenüsü verir: ${eu345.bc} = ${fracText205(eu345.p)} + ${fracText205(eu345.q)}. ${eu68.ab}–${eu68.ac}–${eu68.bc} üçgeni ilk üçgenin 2 katı olduğundan p, q ve h de 2 katına çıkar: ${fracText205(eu68.p)}, ${fracText205(eu68.q)}, ${fracText205(eu68.h)}. ${eu1520.ab}–${eu1520.ac}–${eu1520.bc} satırında hipotenüs kareleri tam böldüğü için bütün parçalar tam sayıdır: p = ${fracText205(eu1520.p)}, q = ${fracText205(eu1520.q)}, h = ${fracText205(eu1520.h)}.`,
  ],
  table: euclidTable,
};

export const euclidExamples205: WorkedExample[] = [
  {
    title: "Hipotenüs ve bir izdüşümden üç uzunluk",
    prompt: "ABC üçgeninde A açısı 90°’dir. H noktası BC üzerinde ve AH ⊥ BC’dir. BC = 20 cm ve BH = 5 cm ise AB, AH ve AC kaç cm’dir?",
    strategy: "Önce HC’yi bul. Her kenarı kendi izdüşümüyle hipotenüsün çarpımına, yüksekliği iki parçanın çarpımına bağla.",
    steps: [
      { label: "Diğer parça", expression: "HC = 20 − 5 = 15", explanation: "H, BC üzerinde olduğundan BH + HC = BC." },
      { label: "AB", expression: "AB² = BC · BH = 20 · 5 = 100 ⇒ AB = 10", explanation: "AB’nin hipotenüs üzerindeki izdüşümü BH’dir." },
      { label: "AH", expression: "AH² = BH · HC = 5 · 15 = 75 ⇒ AH = 5√3", explanation: "75 = 25 · 3 olduğundan kök 5√3 olarak sadeleşir." },
      { label: "AC", expression: "AC² = BC · HC = 20 · 15 = 300 ⇒ AC = 10√3", explanation: "AC’nin izdüşümü HC’dir." },
    ],
    answer: "AB = 10 cm, AH = 5√3 cm, AC = 10√3 cm.",
    check: "Pisagor: 10² + (10√3)² = 100 + 300 = 400 = 20². Alan: AB·AC = 100√3 ve BC·AH = 20·5√3 = 100√3.",
    pitfall: "AB² = BH · HC yazmak. İki parçanın çarpımı yüksekliğin karesini verir; dik kenar için hipotenüsün tamamı ile o kenarın izdüşümü çarpılır.",
  },
  {
    title: "Hipotenüse çizilen kenarortay ile yüksekliği ayır",
    prompt: "ABC üçgeninde A açısı 90°, AB = 9 cm ve AC = 12 cm’dir. M, BC’nin orta noktası; H, A’dan BC’ye inen dikmenin ayağıdır. AM, AH ve HM kaç cm’dir?",
    strategy: "Kenarortay hipotenüsün yarısıdır. Yüksekliği alandan, BH’yi Öklid’den bul; M ile H arasındaki uzaklık BM ile BH’nin farkıdır.",
    steps: [
      { label: "Hipotenüs", expression: "BC = √(81 + 144) = 15", explanation: "Dik kenarlar 9 ve 12." },
      { label: "Kenarortay", expression: "AM = 15/2 = 7,5", explanation: "Hipotenüsün orta noktası üç köşeye eşit uzaklıktadır." },
      { label: "Yükseklik", expression: "AH = 9 · 12 / 15 = 7,2", explanation: "Alan AB·AC/2 = BC·AH/2." },
      { label: "BH", expression: "BH = 9² / 15 = 5,4", explanation: "AB² = BC · BH." },
      { label: "HM", expression: "HM = BM − BH = 7,5 − 5,4 = 2,1", explanation: "B, H, M bu sırayla BC üzerindedir, çünkü BH < BM." },
    ],
    answer: "AM = 7,5 cm, AH = 7,2 cm, HM = 2,1 cm.",
    check: "AHM dik üçgeninde 7,2² + 2,1² = 51,84 + 4,41 = 56,25 = 7,5². Üç sonuç birbiriyle tutarlıdır.",
    pitfall: "Kenarortayla yüksekliği aynı parça sanmak. Yalnız AB = AC olduğunda H ile M çakışır; burada aralarında 2,1 cm vardır.",
  },
];

export const euclidSupplement205 = {
  title: euclidSection205.title,
  figureTitle: euclidSection205.title,
  paragraphs: euclidSection205.paragraphs,
  summary: `A = 90°, AH ⊥ BC: p = AB²/BC, q = AC²/BC, h = AB·AC/BC, h² = p·q, p + q = BC. ${eu345.ab}–${eu345.ac}–${eu345.bc}: ${[eu345.p, eu345.q, eu345.h].map(fracText205).join(", ")}; ${eu1520.ab}–${eu1520.ac}–${eu1520.bc}: ${[eu1520.p, eu1520.q, eu1520.h].map(fracText205).join(", ")} (p, q, h).`,
  appendSection: true as const,
  table: euclidTable,
  examples: euclidExamples205,
};

/* ---------- Paralelkenar ailesi: hangi özellik hangi dörtgende? ---------- */

export interface Quad205 { name: string; vertices: readonly [IntPoint205, IntPoint205, IntPoint205, IntPoint205] }
// Her örnek adından daha özel olmayacak biçimde seçildi: paralelkenar dikdörtgen veya
// eşkenar değil, dikdörtgen kare değil, eşkenar dörtgen kare değil.
export const quadExamples205: readonly Quad205[] = [
  { name: "Paralelkenar", vertices: [[0, 0], [6, 0], [8, 3], [2, 3]] },
  { name: "Dikdörtgen", vertices: [[0, 0], [6, 0], [6, 3], [0, 3]] },
  { name: "Eşkenar dörtgen", vertices: [[0, 0], [5, 0], [8, 4], [3, 4]] },
  { name: "Kare", vertices: [[0, 0], [4, 0], [4, 4], [0, 4]] },
];
type Vec = readonly [number, number];
const vsub = (p: IntPoint205, q: IntPoint205): Vec => [p[0] - q[0], p[1] - q[1]];
const vdot = (p: Vec, q: Vec) => p[0] * q[0] + p[1] * q[1];
const vcross = (p: Vec, q: Vec) => p[0] * q[1] - p[1] * q[0];
const vlen2 = (p: Vec) => vdot(p, p);
/** Köşegen, köşedeki açıyı ortalıyor mu? (tam sayılarla, kök almadan) */
const bisects = (side1: Vec, diagonal: Vec, side2: Vec) => {
  const d1 = vdot(diagonal, side1);
  const d2 = vdot(diagonal, side2);
  return Math.sign(d1) === Math.sign(d2) && d1 * d1 * vlen2(side2) === d2 * d2 * vlen2(side1);
};
export const quadPropertyTests205: readonly { label: string; holds: (q: Quad205["vertices"]) => boolean }[] = [
  { label: "Karşı kenarlar paralel", holds: ([A, B, C, D]) => vcross(vsub(B, A), vsub(C, D)) === 0 && vcross(vsub(D, A), vsub(C, B)) === 0 },
  { label: "Karşı kenarlar eş", holds: ([A, B, C, D]) => vlen2(vsub(B, A)) === vlen2(vsub(C, D)) && vlen2(vsub(D, A)) === vlen2(vsub(C, B)) },
  { label: "Köşegenler birbirini ortalar", holds: ([A, B, C, D]) => A[0] + C[0] === B[0] + D[0] && A[1] + C[1] === B[1] + D[1] },
  { label: "Köşegenler eş", holds: ([A, B, C, D]) => vlen2(vsub(C, A)) === vlen2(vsub(D, B)) },
  { label: "Köşegenler dik", holds: ([A, B, C, D]) => vdot(vsub(C, A), vsub(D, B)) === 0 },
  { label: "Köşegenler köşe açılarını ortalar", holds: ([A, B, C, D]) => bisects(vsub(B, A), vsub(C, A), vsub(D, A)) && bisects(vsub(C, B), vsub(D, B), vsub(A, B)) },
  { label: "Bütün açılar 90°", holds: ([A, B, C, D]) => [[D, A, B], [A, B, C], [B, C, D], [C, D, A]].every(([P, Q, R]) => vdot(vsub(P, Q), vsub(R, Q)) === 0) },
  { label: "Bütün kenarlar eş", holds: ([A, B, C, D]) => new Set([vsub(B, A), vsub(C, B), vsub(D, C), vsub(A, D)].map(vlen2)).size === 1 },
];
export const quadRows205 = (shapes = quadExamples205) => shapes.map(({ name, vertices }) => {
  const [A, B, C, D] = vertices;
  const doubleArea = Math.abs(vertices.reduce((s, p, i) => s + vcross(p, vertices[(i + 1) % 4]), 0));
  return {
    name,
    vertices,
    holds: quadPropertyTests205.map(({ holds }) => holds(vertices)),
    diagonals: [radical203(1, vlen2(vsub(C, A))), radical203(1, vlen2(vsub(D, B)))] as const,
    area: frac205(doubleArea, 2),
  };
});
const quadRows = quadRows205();
const yesNo = (x: boolean) => (x ? "Evet" : "Hayır");
const quadTable = {
  layout: "table" as const,
  headers: ["Özellik", ...quadRows.map(({ name }) => name)],
  rows: [
    ...quadPropertyTests205.map(({ label }, i) => [label, ...quadRows.map(({ holds }) => yesNo(holds[i]))]),
    ["Örnekte köşegenler", ...quadRows.map(({ diagonals }) => diagonals.map(radicalText203).join(" ve "))],
    ["Örnekte alan (birim²)", ...quadRows.map(({ area }) => fracText205(area))],
  ],
};
const quadYesCounts = quadRows.map(({ name, holds }) => ({ name, count: holds.filter(Boolean).length }));
const quadCornersText = (q: Quad205["vertices"]) => q.map(([x, y], i) => `${"ABCD"[i]}(${x}; ${y})`).join(", ");
const [qParallelogram, qRectangle, qRhombus, qSquare] = quadRows;

export const quadSection205: GuideSection = {
  title: "Dörtgen ailesinde hangi özellik nerede zorunlu?",
  paragraphs: [
    `Her sütun için adından daha özel olmayan bir örnek koordinatla kuruldu. Paralelkenar ${quadCornersText(qParallelogram.vertices)}; dikdörtgen ${quadCornersText(qRectangle.vertices)}; eşkenar dörtgen ${quadCornersText(qRhombus.vertices)}; kare ${quadCornersText(qSquare.vertices)}. Her hücre o örnekte vektörlerle denetlendi: paralellik için yön, eşlik için uzunluk karesi, diklik için skaler çarpım. “Evet” yazan özellikler önceki sayfalarda o dörtgen için kanıtlanan genel kurallardır. “Hayır” yazan hücre ise o özelliğin zorunlu olmadığını gösteren bir karşı örnektir.`,
    `Paralelkenardan özel dörtgenlere geçildikçe “Evet” sayısı artar: ${quadYesCounts.map(({ name, count }) => `${name.toLocaleLowerCase("tr")} ${count}`).join(", ")}. Dikdörtgen paralelkenara eş köşegeni ve 90° açıları ekler; eşkenar dörtgen dik köşegeni, açıortay köşegeni ve eş kenarları ekler; kare ikisinin bütün özelliklerini taşır. Örnek paralelkenarda köşegenler ${qParallelogram.diagonals.map(radicalText203).join(" ve ")} olduğu için eş değildir. Eşkenar dörtgende ${qRhombus.diagonals.map(radicalText203).join(" ve ")} dik kesişir ve alan köşegenlerin çarpımının yarısı olan ${fracText205(qRhombus.area)} birim²’dir.`,
  ],
  table: quadTable,
};

export const quadExamples205Worked: WorkedExample[] = [
  {
    title: "Paralelkenarda iki açıortayın taban üzerindeki ayakları",
    prompt: "ABCD paralelkenarında AB = 10 cm ve AD = 6 cm’dir. A açısının açıortayı DC kenarını E’de, B açısının açıortayı DC kenarını F’de kesiyor. |DE|, |EC| ve |EF| kaç cm’dir?",
    strategy: "Açıortayın yarım açısını AB ∥ DC paralelliğiyle DC tarafına taşı. Oluşan ikizkenar üçgenlerde eş açıların karşısındaki kenarlar eşittir.",
    steps: [
      { label: "ADE üçgeni", expression: "∠DAE = ∠EAB = ∠DEA", explanation: "AE açıortaydır; AB ∥ DC olduğundan ∠EAB ile ∠DEA iç ters açılardır." },
      { label: "DE", expression: "DE = AD = 6, EC = 10 − 6 = 4", explanation: "ADE ikizkenardır. DC = AB = 10 olduğundan kalan parça 4 cm." },
      { label: "BCF üçgeni", expression: "∠CBF = ∠FBA = ∠CFB ⇒ CF = CB = 6", explanation: "Aynı akıl B köşesinde: BCF ikizkenar ve BC = AD = 6." },
      { label: "Sıra ve EF", expression: "DF = 10 − 6 = 4, EF = DE − DF = 2", explanation: "D’den ölçülünce F 4’te, E 6’dadır; iki ayak üst üste binmeden 2 cm aralıkla dizilir." },
    ],
    answer: "|DE| = 6 cm, |EC| = 4 cm, |EF| = 2 cm.",
    check: "A açısı 60° alınırsa A(0; 0), B(10; 0), D(3; 3√3), C(13; 3√3). A’dan 30° ile çıkan açıortay y = 3√3’ü x = 9’da, B’den 120° ile çıkan açıortay x = 7’de keser: DE = 6, DF = 4, EF = 2. Sonuç açıya bağlı değildir.",
    pitfall: "E’yi DC’nin orta noktası sanmak. Açıortay kenarı değil açıyı ikiye böler; DE, komşu kenar AD’ye eşit çıkar.",
  },
  {
    title: "60° açılı eşkenar dörtgenin köşegenleri ve alanı",
    prompt: "ABCD eşkenar dörtgeninin bir kenarı 8 cm ve ∠A = 60°’dir. Köşegenler BD ve AC ile alan nedir?",
    strategy: "BD köşegeni A’da 60° açılı, iki kenarı 8 olan bir üçgen kurar. Köşegenlerin dik kesiştiğini ve birbirini ortaladığını kullan.",
    steps: [
      { label: "ABD üçgeni", expression: "AB = AD = 8, ∠A = 60° ⇒ eşkenar", explanation: "İkizkenar üçgende tepe açısı 60° ise taban açıları da 60° olur." },
      { label: "Kısa köşegen", expression: "BD = 8, yarısı 4", explanation: "Eşkenar üçgenin üçüncü kenarıdır." },
      { label: "Uzun köşegen", expression: "AC/2 = √(8² − 4²) = 4√3 ⇒ AC = 8√3", explanation: "Köşegenler dik ve birbirini ortalar; yarım köşegenlerle kenar dik üçgen kurar." },
      { label: "Alan", expression: "8 · 8√3 / 2 = 32√3", explanation: "Dik köşegenli dörtgende alan köşegenlerin çarpımının yarısıdır." },
    ],
    answer: "BD = 8 cm, AC = 8√3 cm, alan 32√3 cm² (yaklaşık 55,43 cm²).",
    check: "Kenar ve açıdan: alan = 8 · 8 · sin 60° = 64 · √3/2 = 32√3. İki yol aynı sonucu verir.",
    pitfall: "Eşkenar dörtgenin köşegenlerini eş sanmak. Köşegenler yalnız kare olduğunda eştir; burada 8 ve 8√3’tür.",
  },
];

export const quadSupplement205 = {
  title: quadSection205.title,
  figureTitle: quadSection205.title,
  paragraphs: quadSection205.paragraphs,
  summary: `Paralelkenar: karşı kenarlar paralel ve eş, köşegenler birbirini ortalar. Dikdörtgen: + eş köşegen, 90° açılar. Eşkenar dörtgen: + dik ve açıortay köşegen, eş kenarlar. Kare: hepsi. Tablodaki “Evet” sayıları: ${quadYesCounts.map(({ name, count }) => `${name.toLocaleLowerCase("tr")} ${count}`).join(", ")} / ${quadPropertyTests205.length}.`,
  appendSection: true as const,
  table: quadTable,
  examples: quadExamples205Worked,
};

/* ---------- İkizkenar yamuk: orta taban, alan, yan kenar ---------- */

/** a: alt taban, c: üst taban, h: yükseklik */
export const trapezoidSets205: readonly { a: number; c: number; h: number }[] = [
  { a: 16, c: 10, h: 4 },
  { a: 20, c: 4, h: 6 },
  { a: 16, c: 8, h: 6 },
  { a: 13, c: 5, h: 3 },
  { a: 24, c: 6, h: 12 },
];
export const trapezoidRows205 = (sets = trapezoidSets205) => sets.map(({ a, c, h }) => {
  const median = frac205(a + c, 2);
  const overhang = frac205(a - c, 2);
  const leg2 = fAdd(fMul(overhang, overhang), frac205(h * h));
  return {
    a, c, h,
    median,
    area: fMul(median, frac205(h)),
    overhang,
    leg: radical203(1, leg2.n * leg2.d, leg2.d),
  };
});
const trapezoidRows = trapezoidRows205();
const trapezoidTable = {
  layout: "table" as const,
  headers: ["Tabanlar a ve c", "h", "Orta taban m = (a+c)/2", "Alan m·h", "(a−c)/2", "İkizkenarsa yan kenar"],
  rows: trapezoidRows.map(({ a, c, h, median, area, overhang, leg }) =>
    [`${a} ve ${c}`, String(h), decimalText205(median), decimalText205(area), decimalText205(overhang), radicalText203(leg)]),
};
const [tz1, tz2, tz3] = trapezoidRows;
if (fracValue205(tz2.median) !== fracValue205(tz3.median) || tz2.h !== tz3.h) throw new Error("Yamuk tablosundaki eş alan çifti bozuldu");

export const trapezoidSection205: GuideSection = {
  title: "Orta taban ve alanı beş ikizkenar yamukta karşılaştır",
  paragraphs: [
    `Her satırda ABCD ikizkenar yamuğunda AB ∥ DC, alt taban AB = a, üst taban DC = c, tabanlar arası dik uzaklık h ve yan kenarlar AD = BC’dir. Orta taban m, yan kenarların orta noktalarını birleştirir ve m = (a+c)/2’dir. Alan m·h ile bulunur. İlk satırda m = (${tz1.a}+${tz1.c})/2 = ${decimalText205(tz1.median)} ve alan ${decimalText205(tz1.median)}·${tz1.h} = ${decimalText205(tz1.area)} birim²’dir.`,
    `(a−c)/2 sütunu iki şeyi birden gösterir. İkizkenar yamukta üst köşelerden inen iki dikme alt tabanı üç parçaya böler; uçtaki iki eş parçanın her biri (a−c)/2’dir. Her yamukta ise bu sayı, köşegenlerin orta noktaları arasındaki uzaklıktır. Yan kenar, uçtaki parça ile h’nin kurduğu dik üçgenin hipotenüsüdür. ${tz2.a} ve ${tz2.c} tabanlı yamukla ${tz3.a} ve ${tz3.c} tabanlı yamuğun orta tabanları ${decimalText205(tz2.median)} ve yükseklikleri ${tz2.h} olduğu için alanları da aynı, ${decimalText205(tz2.area)} birim²’dir; yan kenarları ise ${radicalText203(tz2.leg)} ve ${radicalText203(tz3.leg)} olarak farklıdır. Alan tabanların ayrı ayrı değerine değil, toplamına bağlıdır.`,
  ],
  table: trapezoidTable,
};

export const trapezoidExamples205: WorkedExample[] = [
  {
    title: "Orta taban ve alandan eksik taban",
    prompt: "AB ∥ DC olan ABCD yamuğunun orta tabanı 15 cm, alanı 90 cm² ve kısa tabanı DC = 9 cm’dir. Yükseklik, uzun taban AB ve köşegenlerin orta noktaları arasındaki uzaklık kaç cm’dir?",
    strategy: "Alan = orta taban × yükseklik bağıntısından h’yi, orta taban formülünden AB’yi bul. Köşegen orta noktaları arası uzaklık taban farkının yarısıdır.",
    steps: [
      { label: "Yükseklik", expression: "90 = 15 · h ⇒ h = 6", explanation: "Alan m·h olduğundan h = 90/15." },
      { label: "Uzun taban", expression: "(AB + 9)/2 = 15 ⇒ AB = 21", explanation: "Orta taban iki tabanın ortalamasıdır." },
      { label: "Köşegen orta noktaları", expression: "(21 − 9)/2 = 6", explanation: "Orta taban üzerinde köşegenlerin kestiği iki nokta arasındaki parça, taban farkının yarısıdır." },
    ],
    answer: "h = 6 cm, AB = 21 cm, köşegen orta noktaları arası 6 cm.",
    check: "(21 + 9) · 6 / 2 = 90 cm². Orta taban üç parçaya ayrılır: 9/2 + 6 + 9/2 = 15 cm.",
    pitfall: "Alanı tabanların toplamı × yükseklik sanıp h = 3 bulmak. Formülde yarıya bölme vardır; orta taban kullanılınca bu yarı zaten içindedir.",
  },
  {
    title: "Deltoidde simetri köşegeninden öbür köşegen",
    prompt: "Dışbükey ABCD deltoidinde AB = AD = 13 cm, CB = CD = 37 cm ve simetri köşegeni AC = 40 cm’dir. BD köşegeni, alan ve çevre nedir?",
    strategy: "AC, BD’nin orta dikmesidir. Kesişim K olsun: AK = x ise KC = 40 − x. BK’yi iki dik üçgende yazıp eşitle.",
    steps: [
      { label: "İki dik üçgen", expression: "BK² = 13² − x² = 37² − (40 − x)²", explanation: "ABK ve CBK üçgenlerinin K’de dik açısı vardır ve BK ortaktır." },
      { label: "Çöz", expression: "169 = 1369 − 1600 + 80x ⇒ x = 5", explanation: "x² terimleri sadeleşir; AK = 5, KC = 35." },
      { label: "BD", expression: "BK = √(169 − 25) = 12 ⇒ BD = 24", explanation: "AC, BD’yi ortaladığı için BD = 2·BK." },
      { label: "Alan ve çevre", expression: "40 · 24 / 2 = 480; 2 · (13 + 37) = 100", explanation: "Köşegenler dik olduğundan alan çarpımlarının yarısıdır." },
    ],
    answer: "BD = 24 cm, alan 480 cm², çevre 100 cm.",
    check: "CBK üçgeninde 12² + 35² = 144 + 1225 = 1369 = 37². ABC ve ADC üçgenlerinin alanları 40·12/2 = 240’ar cm², toplam 480.",
    pitfall: "K’yi AC’nin orta noktası sanıp AK = 20 almak. Deltoidde yalnız BD ortalanır; AK ile KC farklıdır.",
  },
];

export const trapezoidSupplement205 = {
  title: trapezoidSection205.title,
  figureTitle: trapezoidSection205.title,
  paragraphs: trapezoidSection205.paragraphs,
  summary: `m = (a+c)/2, alan = m·h, köşegen orta noktaları arası (a−c)/2; ikizkenarda yan kenar √(((a−c)/2)² + h²). ${tz2.a} ve ${tz2.c} ile ${tz3.a} ve ${tz3.c} tabanlı yamuklarda m = ${decimalText205(tz2.median)}, h = ${tz2.h} olduğundan alan ikisinde de ${decimalText205(tz2.area)}; yan kenarlar ${radicalText203(tz2.leg)} ve ${radicalText203(tz3.leg)}.`,
  appendSection: true as const,
  table: trapezoidTable,
  examples: trapezoidExamples205,
};

export const geometryDepth205Supplements = {
  "tyt-geo-ucgen-merkezleri-031": [centerSupplement205],
  "tyt-geo-eslik-benzerlik-031": [similaritySupplement205],
  "tyt-geo-dik-ucgen-031": [euclidSupplement205],
};
