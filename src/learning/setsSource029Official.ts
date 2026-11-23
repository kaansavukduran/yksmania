import type { PastExamReference } from "../domain/pastExams";
import type { ExamTeachingCase } from "./pastExamCases";

export const source029Reference: PastExamReference = {
  id: "2018-TYT-MAT-13",
  bookletId: "2018-tyt",
  test: "Temel Matematik",
  question: 13,
  page: 25,
  answerPage: 42,
  answer: "C",
  topicIds: ["detail-222"],
  title: "Boyalı iki bölgeyi ad koşullarıyla sayma",
  connection:
    "Kesişim boyasız olduğunda baş veya son harf koşullarından yalnız biri geçerlidir. Ad uzunluğu da ayrı bir eleme koşuludur.",
  solution: [
    "Beş harfli adlar AHMET, AYSUN, BEREN ve KENAN. Uzunluk koşulu dışındaki adları çıkar.",
    "AHMET yalnız A ile başlama, BEREN ve KENAN yalnız N ile bitme koşulunu sağlar. AYSUN ikisini birden sağlar ve boyasız ortak bölgededir.",
    "Boyalı bölgelerde 1+2=3 ad bulunur. Asıl kitapçık fiziksel 25. sayfa, cevap anahtarı 42. sayfa. Resmî yanıt C.",
  ],
};

export const source029TeachingCase: ExamTeachingCase = {
  prompt:
    "Bir oyunda kart numaraları 1’den 12’ye kadar bütün tam sayılardır. 2’ye veya 3’e bölünebilme koşullarından yalnız birini sağlayan kartları seç. Seçilen kartlardan kaçının numarası 5’ten büyüktür?",
  steps: [
    "5’ten büyük numaralar 6, 7, 8, 9, 10, 11 ve 12. Bu koşulu ilk adımda da uygulayabilirsin.",
    "6 ve 12 iki sayıya birden bölünür. 7 ile 11 hiçbirine bölünmez. Bu dört kart elenir.",
    "8 ve 10 yalnız 2’ye, 9 yalnız 3’e bölünür. Toplam 3 kart kalır.",
  ],
  answer: "3 kart.",
  pitfall: "“Yalnız birini” sözüne rağmen 6 ile 12’yi de seçmek.",
};
