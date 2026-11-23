import {
  binomialId,
  combinationId,
  countingTopicMap034035,
} from "../data/supplementalCountingTopics034035";
import type { PastExamReference } from "../domain/pastExams";
import type { ExamTeachingCase } from "./pastExamCases";

export const combinationReference034: PastExamReference = {
  id: "2022-AYT-MAT-14",
  bookletId: "2022-ayt",
  test: "Matematik",
  question: 14,
  page: 29,
  answerPage: 50,
  answer: "A",
  topicIds: [countingTopicMap034035[combinationId]],
  title: "Yer açan ikilileri tümleyenle sayma",
  connection:
    "Silinen iki uygulamanın sırası önemsizdir. Yeterli alan açmayan çiftler boyutlarına göre ayrılır.",
  solution: [
    "On iki uygulamadan silinecek ikisini seç. C(12,2)=66 aday çift vardır.",
    "Beş adet 1 GB uygulamadan iki seçim C(5,2)=10. Bir 1 GB ve bir 2 GB seçimi 5·4=20. Bu çiftler gereken en az 4 GB alanı açmaz.",
    "Geçerli çift sayısı 66−10−20=36. Fiziksel 29. sayfa ve 50. sayfadaki anahtar A seçeneğini doğrular.",
  ],
};

export const binomialReference035: PastExamReference = {
  id: "2022-AYT-MAT-13",
  bookletId: "2022-ayt",
  test: "Matematik",
  question: 13,
  page: 29,
  answerPage: 50,
  answer: "C",
  topicIds: [countingTopicMap034035[binomialId]],
  title: "Simetrik derecelerde binom katsayısı oranı",
  connection:
    "Genel terimde x’in üssü, ikinci terimin kaç defa seçildiğini belirler.",
  solution: [
    "(x+a/x)¹⁰ için x≠0. İkinci terim r kez seçilirse x’in üssü 10−2r olur.",
    "x⁻² için r=6, x² için r=4. C(10,6)=C(10,4) olduğundan katsayıların oranında bu çarpan sadeleşir.",
    "a⁶/a⁴=a²=16. a pozitif olduğundan a=4. Fiziksel 29. sayfa ve 50. sayfadaki anahtar C seçeneğini doğrular.",
  ],
};

export const combinationTeachingCase034: ExamTeachingCase = {
  prompt:
    "Üç 1 GB, iki 2 GB ve bir 4 GB dosya arasından iki farklı dosya silinecek. En az 4 GB kazanılan kaç dosya çifti vardır?",
  steps: [
    "Her dosya ayrı. Altı dosyadan sıra olmadan C(6,2)=15 çift seçilir.",
    "Alanı yetersiz iki durum var. 1 ve 1 GB için C(3,2)=3, 1 ve 2 GB için 3·2=6.",
    "Bu gruplar ayrık. 15−3−6=6 geçerli çift kalır.",
  ],
  answer: "6 çift.",
  pitfall: "Tam 4 GB olan iki 2 GB dosyayı eşik dışında bırakmak.",
};

export const binomialTeachingCase035: ExamTeachingCase = {
  prompt:
    "a>0 ve x≠0. (x+a/x)⁶ açılımında x⁻²’nin katsayısı x²’nin katsayısının 25 katıysa a’yı bul.",
  steps: [
    "Genel üs 6−2r. x⁻² için r=4, x² için r=2.",
    "C(6,4)=C(6,2)=15. Katsayıların oranı 15a⁴/(15a²)=a².",
    "a²=25 olup a>0 olduğundan a=5.",
  ],
  answer: "a=5.",
  pitfall: "Katsayı oranındaki a kuvvetlerinin sırasını ters çevirmek.",
};
