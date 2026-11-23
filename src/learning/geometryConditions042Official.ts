import type { PastExamReference } from "../domain/pastExams";
import type { ExamTeachingCase } from "./pastExamCases";

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
    "Tam tur 360°. Sekiz aralığın her biri 45°.",
    "Dik bölgeden aradaki 45°yi çıkar. İki eş dış parça için 45° kalır.",
    "Her bir parça 45°/2=22,5°.",
  ],
  answer: "22,5°.",
  pitfall:
    "Işınlar arasındaki bir aralığı tam turdaki ışın etiketi sayısıyla karıştırmak.",
};

export const triangleAnglesTeachingCase042: ExamTeachingCase = {
  prompt:
    "Bir ikizkenar üçgenin taban açısı β. Yardımcı bir üçgende 86° dış açının uzak iki iç açısı da β. İlk üçgenin tepe açısı β ve x olarak ikiye ayrılıyor. x kaç derecedir?",
  steps: [
    "Yardımcı üçgende 2β=86°, yani β=43°.",
    "İkizkenarın iki taban açısı 43°. Tepe açısı 180°−86°=94°.",
    "Tepe açısında 94°−43°=51° kalır.",
  ],
  answer: "51°.",
  pitfall: "86°yi tepe açısı sanmak. Bu, iki taban açısının toplamı.",
};

export const triangleSidesTeachingCase042: ExamTeachingCase = {
  prompt:
    "2,3,4 ve 2,4,6 ve 1,3,5 uzunluk üçlüleri veriliyor. Ortadaki uzunluğu diğer ikisinin ortalaması olan gerçek üçgen hangisinden çizilebilir?",
  steps: [
    "Her üçlüde ortadaki sayı iki ucun ortalamasıdır.",
    "2+3>4 olduğundan ilk üçlü bir üçgen yapar. İkinci 2+4=6 olduğundan doğrusal kalır.",
    "Son üçlüde 1+3<5, uçlar kapanmaz. Yalnız ilk üçlü uygundur.",
  ],
  answer: "Yalnız 2, 3 ve 4.",
  pitfall:
    "Ortalama koşulunun üçgen eşitsizliğini kendiliğinden sağladığını varsaymak.",
};
