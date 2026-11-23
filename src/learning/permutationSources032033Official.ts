import { permutationTopicMap032033 } from "../data/supplementalPermutationTopics032033";
import type { PastExamReference } from "../domain/pastExams";
import type { ExamTeachingCase } from "./pastExamCases";

export const permutationReference032: PastExamReference = {
  id: "2025-TYT-MAT-29",
  bookletId: "2025-tyt",
  test: "Temel Matematik",
  question: 29,
  page: 32,
  answerPage: 43,
  answer: "C",
  topicIds: [permutationTopicMap032033["tyt-mat-permutasyon-kaynak-032"]],
  title: "İç sırası kısıtlı iki grubu iç içe yerleştirme",
  connection: "Birbirine karışabilen iki görev grubu ayrı konum kümelerine yerleştirilir.",
  solution: [
    "Spor ve banyo için beş konumdan ikisi seçilir. Spor önce olduğundan her çift tam bir yerleşim verir.",
    "Kalan üç konumun sonunda film bulunur. Ödev ve ev işi önceki iki konumu iki farklı biçimde doldurur.",
    "C(5,2)·2!=20. Fiziksel 32. sayfa ve 43. sayfadaki anahtar C seçeneğini doğrular.",
  ],
};

export const repeatedPermutationReference033: PastExamReference = {
  id: "2018-TYT-MAT-28",
  bookletId: "2018-tyt",
  test: "Temel Matematik",
  question: 28,
  page: 30,
  answerPage: 42,
  answer: "C",
  topicIds: [permutationTopicMap032033["tyt-mat-tekrarli-permutasyon-kaynak-033"]],
  title: "Her adımda iki seçenekle dört adımın yollarını sayma",
  connection: "Toplam rotalar her adımda iki yöne ayrılır. Aynı mindere ulaşan rotalar da ayrı sonuçtur.",
  solution: [
    "Şekilde ilk üç basamak geçişi ve son minder adımının her birinde iki izinli hareket vardır.",
    "Sağ yön seçimi 0, 1, 2, 3, 4 kez yapılabilir. Aynı sayıda sağ seçim içeren gruplar 1, 4, 6, 4, 1 rota verir.",
    "Toplam 1+4+6+4+1=16=2⁴. Fiziksel 30. sayfa ve 42. sayfadaki anahtar C seçeneğini doğrular.",
  ],
};

export const permutationTeachingCase032: ExamTeachingCase = {
  prompt: "Altı görev K, L, M, R, S, T birer kez yapılacak. K, L, M bu sırada olmalı. R ve S, T’den önce gelmeli. İki grubun görevleri iç içe geçebilir. Kaç sıra vardır?",
  steps: [
    "K, L, M için altı konumdan üçünü C(6,3)=20 biçimde seç. Görevlerin kendi sırası belli.",
    "Kalan üç konumun sonuna T gelir. R ve S önceki iki konumu iki farklı sırada doldurur.",
    "Her konum seçimi için aynı iki tamamlanma vardır. 20·2=40.",
  ],
  answer: "40 sıra.",
  pitfall: "Sırası belirli görevleri yan yana duran bir blok gibi saymak.",
};

export const repeatedPermutationTeachingCase033: ExamTeachingCase = {
  prompt: "Bir robot beş adımın her birinde sağa veya yukarı bir birim gider. İki kez yukarı giden kaç farklı rota vardır?",
  steps: [
    "Beş adımda iki yukarı, üç sağ hareket kullanılır.",
    "Beş konumdan yukarı hareketin iki konumunu seç. Görülen her seçim tam bir rota üretir.",
    "C(5,2)=5!/(2!3!)=10. Tamamı aynı hedefe ulaşır ama adım sıraları farklı olabilir.",
  ],
  answer: "10 farklı rota.",
  pitfall: "Hedef aynı olduğu için farklı adım sıralarının tek yol olduğunu düşünmek.",
};
