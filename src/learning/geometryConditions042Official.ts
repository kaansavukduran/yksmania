import type { PastExamReference } from "../domain/pastExams";
import type { ExamTeachingCase } from "./pastExamCases";
import { equalTurns, outerLabel, rotationIllustrations, turnAngle } from "./rayRotation045";
import { parallelTriangles046 } from "./parallelTriangles046";
import { triangleMean047 } from "./triangleMean047";

export const lineAnglesReference042: PastExamReference = {
  id: "2024-TYT-MAT-31",
  bookletId: "2024-tyt",
  test: "Temel Matematik",
  question: 31,
  page: 34,
  answerPage: 43,
  answer: "D",
  topicIds: ["topic-tyt-geo-acilar-kaynak-pekitirme-032"],
  title: "Eş dönüş aralıkları ve dik köşe",
  connection:
    "Tam dönüşü aralıklara ayır. İki eş dar parçayı 90°den kalan açıdan bul.",
  solution: [
    "İlk ve altıncı ışın çakışır. Şekilde arada bir tam turu oluşturan beş eş aralık vardır. Her dönüş 360°/5=72°.",
    "Alt yatay ve sol düşey kenarlar diktir. İşaretlenen eş dar kenar açılarının tümleri, 2. ışının düşeye ve 3. ışının yataya olan uzaklığıdır. Bu iki eş parça 90°−72°=18° eder. Her biri 9°, işaretli dar açıların her biri 81°.",
    "3. ışın yatay yönden 9° ayrılır. Sonraki dönüşte istenen dar açı 72°−9°=63°. Fiziksel sayfa 34 ve anahtar 43, D.",
  ],
};

export const triangleAnglesReference042: PastExamReference = {
  id: "2024-TYT-MAT-32",
  bookletId: "2024-tyt",
  test: "Temel Matematik",
  question: 32,
  page: 34,
  answerPage: 43,
  answer: "E",
  topicIds: ["topic-tyt-geo-ucgende-acilar-031"],
  title: "Paralellikle taşınan taban açısı",
  connection:
    "İkizkenar taban açılarını eşle. Küçük üçgenin dış açısıyla ilişkilendir.",
  solution: [
    "AC ile DF’nin kesişimine G de. Eş ikizkenarların taban açıları β. AC ile DE paralel, AF ve EF aynı doğrultuda olduğundan ∠FAG=∠FED=β. FA ve FE aynı yönde, FG ve FD aynı yönde. Bu yüzden ∠AFG=∠EFD=β. G’de verilen 88° AFG’nin dış açısıdır.",
    "β=44° ve büyük üçgende A tepe açısı 180°−44°−44°=92°.",
    "A’daki komşu parçanın ölçüsü β=44°. İstenen 92°−44°=48°. Fiziksel sayfa 34 ve anahtar 43, E.",
  ],
};

export const triangleSidesReference042: PastExamReference = {
  id: "2021-TYT-MAT-32",
  bookletId: "2021-tyt",
  test: "Temel Matematik",
  question: 32,
  page: 35,
  answerPage: 45,
  answer: "B",
  topicIds: ["topic-tyt-geo-ucgen-esitsizligi-031"],
  title: "Kenar ortalaması ve gerçek üçgen koşulu",
  connection: "Pozitif kenarlar ve sıkı üçgen eşitsizliğini birlikte denetle.",
  solution: [
    "I’de 1 ve 3 biliniyor. Üçüncü kenar 2’den büyük, 4’ten küçük olmalı. Hangi kenar ortalama alınırsa alınsın adaylar 2, 5 ve −1. Hiçbiri uygun değil.",
    "II’de üçüncü açı 70°. İki eş kenar var ve üçüncü farklı. Üç terimli aritmetik dizide iki terim eşitse üçü de eşit olmalı.",
    "III için 3–4–5 dik üçgenini ölçekle. Kenarlar 1, 4/3, 5/3 ve 4/3 tam ortalama. Yalnız III, fiziksel sayfa 35 ve anahtar 45, B.",
  ],
};

export const lineAnglesTeachingCase042: ExamTeachingCase = {
  prompt:
    "Bir ışın sekiz eş dönüşle ilk yönüne dönerek bir tam turu bitiriyor. İki ardışık yön bir dik açının içine düşüyor. Dik açının dış kollarıyla iki ışın arasında kalan parçalar eşit. Bu parçalardan biri kaç derece?",
  steps: [
    `Tam tur 360°. ${equalTurns} eş aralığın her biri ${turnAngle}°.`,
    `Dik açıdan aradaki ${turnAngle}°yi çıkar. İki eş dış parça için ${90 - turnAngle}° kalır.`,
    `Her bir parça ${90 - turnAngle}° / 2 = ${outerLabel}.`,
  ],
  answer: `${outerLabel}.`,
  pitfall:
    "Işınlar arasındaki bir aralığı tam turdaki ışın etiketi sayısıyla karıştırmak.",
  illustrations: rotationIllustrations,
};

const { exteriorAngle, baseAngle, apexAngle, unknownAngle } = parallelTriangles046;
export const triangleAnglesTeachingCase042: ExamTeachingCase = {
  prompt: `ABC ve DEF üçgenleri eş ikizkenar üçgenler. Tabanları BC ve EF. A, EF üzerinde ve F, BC üzerinde. AC ile DE paralel. AC ve DF’nin kesiştiği yerde üst açı ${exteriorAngle}°. AB ile AF arasındaki x açısını bul.`,
  steps: [
    `AC ile DF’nin kesişimine G de. Paralel AC ve DE, A’daki küçük açıyı E’deki taban açısına eşit yapar. F’de aynı iki kol DEF’nin diğer taban açısını verir. İkisine β dersek G’deki dış açı 2β = ${exteriorAngle}°, yani β = ${baseAngle}°.`,
    `Eş ABC üçgeninin B ve C taban açıları da ${baseAngle}°. Tepe açısı 180° − 2 × ${baseAngle}° = ${apexAngle}°. AF bu açıyı x ve ${baseAngle}° diye ikiye ayırır.`,
    `${apexAngle}° − ${baseAngle}° = ${unknownAngle}°.`,
  ],
  answer: `${unknownAngle}°.`,
  pitfall: `${exteriorAngle}°yi tepe açısı sanmak. Bu açı iki taban açısının toplamıdır.`,
  illustrations: parallelTriangles046,
};

const {
  sides: [firstKnownSide, secondKnownSide],
  bounds: [lowerBound, upperBound],
  candidates: [firstCandidate, middleCandidate, lastCandidate],
  angles: [firstKnownAngle, secondKnownAngle, remainingAngle],
  rightSides: [rightLeg, otherLeg, hypotenuse],
} = triangleMean047;
export const triangleSidesTeachingCase042: ExamTeachingCase = {
  prompt: "Bir kenarın uzunluğu diğer iki kenarın aritmetik ortalamasıysa ona ortalama üçgen diyelim. I, II ve III çizimlerindeki verilere göre hangilerinde böyle bir üçgen kurabilirsin?",
  steps: [
    `I. Üçgenin üçüncü kenarı için ${lowerBound} < u < ${upperBound}. ${firstKnownSide}, u veya ${secondKnownSide} ortalama olursa sırayla u = −${Math.abs(firstCandidate)}, ${middleCandidate} veya ${lastCandidate} çıkar. Hiçbiri aralıkta değil. Sınırdaki ${middleCandidate}, uçları aynı doğruya getirir.`,
    `II. Eksik açı 180° − ${firstKnownAngle}° − ${secondKnownAngle}° = ${remainingAngle}°. İki açı eşit olduğundan iki kenar eşit. Üç uzunluk aritmetik diziyse iki değerin eşitliği üçünü de eşit yapar. Bu üçgen eşkenar olamadığı için II elenir.`,
    `III. Dik üçgende bir dik kenar ${rightLeg}. Diğer dik kenarı ${otherLeg} seçersek ${rightLeg}² + ${otherLeg}² = ${hypotenuse}². Ortadaki uzunluk ${otherLeg} = (${rightLeg} + ${hypotenuse}) / 2. III mümkündür.`,
  ],
  answer: `Yalnız III. ${rightLeg}, ${otherLeg} ve ${hypotenuse}.`,
  pitfall:
    "Ortalama koşulunun üçgen eşitsizliğini kendiliğinden sağladığını varsaymak.",
  illustrations: triangleMean047,
};
