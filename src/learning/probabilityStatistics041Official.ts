import { probabilityTopic } from "../data/supplementalProbabilityTopic036";
import type { PastExamReference } from "../domain/pastExams";
import type { ExamTeachingCase } from "./pastExamCases";

export const probabilityReference036: PastExamReference = {
  id: "2025-TYT-MAT-30",
  bookletId: "2025-tyt",
  test: "Temel Matematik",
  question: 30,
  page: 32,
  answerPage: 43,
  answer: "B",
  topicIds: [probabilityTopic.id],
  title: "En az bir kişiyi seçme olasılığı",
  connection:
    "Sırasız ikililerin tümünden, iki belirli kişinin de bulunmadığı ikilileri çıkar.",
  solution: [
    "Altı arkadaştan ikisi seçilir ve tüm C(6,2)=15 ikili eş şanslıdır.",
    "Doğa ve Duru’nun ikisinin de bulunmadığı seçimler diğer dört kişi arasından C(4,2)=6 tanedir.",
    "En az biri bulunan 15−6=9 ikili vardır. Olasılık 9/15=3/5. Fiziksel 32. sayfa ve 43. sayfadaki anahtar B seçeneğini doğrular.",
  ],
};

export const statisticsReference037: PastExamReference = {
  id: "2024-TYT-MAT-16",
  bookletId: "2024-tyt",
  test: "Temel Matematik",
  question: 16,
  page: 29,
  answerPage: 43,
  answer: "A",
  topicIds: ["detail-225"],
  title: "Ortanca ve ortalama koşullarını birlikte kullanma",
  connection:
    "Ortanca orta konumlardan gelir. Ortalama bütün sayıların toplamıyla bulunur.",
  solution: [
    "Veri küçükten büyüğe 9, 10, a, 13, 16, b. a tam sayısı 11 veya 12. Ortanca (a+13)/2 tam sayı olacağından a=11 ve ortanca 12.",
    "Toplam 59+b. Ortalama 11 olursa b=7 olur ve 16’dan sonra gelemez. Ortalama 13 için b=19 geçerlidir.",
    "a+b=30. Fiziksel 29. sayfa ve 43. sayfadaki anahtar A seçeneğini doğrular.",
  ],
};

export const probabilityTeachingCase036: ExamTeachingCase = {
  prompt:
    "Yedi farklı kitap arasından sıra önemsiz olacak biçimde iki kitap eş şansla seçiliyor. İki özel kitaptan en az biri seçilsin. Olasılık nedir?",
  steps: [
    "Bütün kitap çiftleri C(7,2)=21.",
    "İki özel kitabın da seçilmediği çiftler C(5,2)=10.",
    "11 çift en az bir özel kitap içerir. Olasılık 11/21.",
  ],
  answer: "11/21.",
  pitfall:
    "İki özel kitabın ikisinin de seçildiği tek çifti dışarıda bırakmak.",
};

export const statisticsTeachingCase037: ExamTeachingCase = {
  prompt:
    "Farklı tam sayılar 5,6,a,9,11,b olarak küçükten büyüğe dizilmiş. Ortanca ve ortalama ardışık tam sayılar. a+b kaçtır?",
  steps: [
    "6<a<9 olduğu için a=7 ya da 8. (a+9)/2 tam sayı olacağından a=7 ve ortanca 8.",
    "Toplam 38+b. Ortalama 7 olursa b=4 sıralamayı bozar. Ortalama 9 olursa b=16 ve 11<16 sağlanır.",
    "a+b=7+16=23.",
  ],
  answer: "23.",
  pitfall:
    "Ortanca ile ortalamayı aynı değer sanmak veya b’nin son sıradaki sınırını unutmak.",
};
