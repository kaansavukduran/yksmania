import type { PastExamReference } from "../domain/pastExams";
import type { ExamTeachingCase } from "./pastExamCases";

export const source028Reference: PastExamReference = {
  id: "2018-TYT-MAT-11",
  bookletId: "2018-tyt",
  test: "Temel Matematik",
  question: 11,
  page: 24,
  answerPage: 42,
  answer: "B",
  topicIds: ["detail-221"],
  title: "Bir karede karşı köşe alanlarını eşleştirme",
  connection:
    "Bir kenarı iki uzunluğa bölündüğünde her bölgenin alanını kendi kenarlarından hesapla. İki karşı köşe alanının toplamını açarak verilen ifadeyle eşleştir.",
  solution: [
    "Büyük karenin kenarı a, sol üstteki I karesinin kenarı b olduğundan I alanı b². Şekilde iki bölme çizgisinin karşı tarafında kalan uzunluklar a−b.",
    "Karşı köşedeki IV alanı (a−b)². Diğer iki bölgenin alanı ayrı ayrı b(a−b).",
    "a²−2ab+2b²=(a−b)²+b², yani I ve IV. Asıl kitapçık fiziksel 24. sayfa, cevap anahtarı 42. sayfa. Resmî yanıt B.",
  ],
};

export const source028TeachingCase: ExamTeachingCase = {
  prompt:
    "Bir kenarı 10 dm olan kare levhanın sağ üst köşesinden hem yatay hem dikey doğrultuda 3 dm işaretleniyor. İşaretlerden kenarlara paralel iki çizgi geçirilip levha dört parçaya ayrılıyor. İşaretlemenin yapıldığı köşedeki parça ile köşegenin öbür ucundaki parçanın alanları toplamı kaç dm²’dir?",
  steps: [
    "İşaretli köşedeki bölge 3 dm × 3 dm, alanı 9 dm².",
    "Karşı köşedeki bölgenin iki yönde kenarı 10−3=7 dm, alanı 49 dm².",
    "İki karşı köşe bölgesinin toplam alanı 9+49=58 dm². Sağlama 58+2·(3·7)=100 dm² ile levhanın tamamı geri gelir.",
  ],
  answer: "58 dm².",
  pitfall:
    "Yan yana duran parçaları toplamak. Sorulan parçalar bir köşegenin uçlarında.",
};
