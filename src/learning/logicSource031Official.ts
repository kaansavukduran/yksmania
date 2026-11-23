import type { PastExamReference } from "../domain/pastExams";
import type { ExamTeachingCase } from "./pastExamCases";

export const source031Reference: PastExamReference = {
  id: "2025-TYT-MAT-11",
  bookletId: "2025-tyt",
  test: "Temel Matematik",
  question: 11,
  page: 27,
  answerPage: 43,
  answer: "A",
  topicIds: ["detail-224"],
  title: "Bir koşulun yanlışlığından üç doğruluk değeri çıkarma",
  connection:
    "Dış koşulun yanlış olduğu bilgisi önce iki iç koşulun değerini belirler. Bu değerlerden üç basit önermenin doğruluğuna geçilir.",
  solution: [
    "Dış koşul yanlış olduğundan sol p→q doğru, sağ r→q yanlış.",
    "Sağdan r=1 ve q=0 elde edilir. Solda p→0 doğru olduğundan p=0.",
    "Doğum günü 1 değildir, doğum ayı eylül değildir ve yıl 2000’dir. Asıl kitapçık fiziksel 27. sayfa, anahtar 43. sayfa. Resmî yanıt A.",
  ],
};

export const source031TeachingCase: ExamTeachingCase = {
  prompt:
    "Bir prova için p, ‘sahne ışığı açık’, q, ‘mikrofon açık’, r, ‘piyano hazır’ demek. (p→r)→(q→r) ifadesi yanlış. Işığın, mikrofonun ve piyanonun durumu nedir?",
  steps: [
    "Dış koşul yanlışsa p→r doğru ve q→r yanlış.",
    "Sağ koşuldan q=1, r=0. Sol koşul p→0 hâline gelir.",
    "p→0 ancak p=0 iken doğrudur. Işık kapalı, mikrofon açık, piyano hazır değil. Geri koyunca sol 0→0 doğru ve sağ 1→0 yanlış olur.",
  ],
  answer: "Işık kapalı, mikrofon açık, piyano hazır değil.",
  pitfall: "Sol koşulun doğru olmasını p’nin doğru olmasıyla bir tutmak.",
};
