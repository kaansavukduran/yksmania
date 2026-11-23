import type { PastExamReference } from "../domain/pastExams";
import type { ExamTeachingCase } from "./pastExamCases";

export const source030Reference: PastExamReference = {
  id: "2022-AYT-MAT-12",
  bookletId: "2022-ayt",
  test: "Matematik",
  question: 12,
  page: 28,
  answerPage: 50,
  answer: "C",
  topicIds: ["detail-223"],
  title: "Noktaların iki eksendeki farklı değerlerini sayma",
  connection:
    "Tam çarpım grafiğinden ilk küme yatay değerlerle, ikinci küme düşey değerlerle okunur. Birleşim sayısından kesişim bulunabilir.",
  solution: [
    "Grafik (A∪B)×C’nin tamamını gösteriyor. Dört farklı yatay ve dört farklı düşey değer var.",
    "A ve B’nin üçer elemanı var. s(A∩B)=3+3−4=2.",
    "İstenen C×(A∩B) için 4·2=8. Asıl kitapçık fiziksel 28. sayfa, cevap anahtarı 50. sayfa. Resmî yanıt C.",
  ],
};

export const source030TeachingCase: ExamTeachingCase = {
  prompt:
    "Tam ve boş olmayan bir (J∪K)×L grafiğinde yatay değerler {1,3,4,7,8}, düşey değerler {0,2,9}. J’nin 4, K’nin 4 elemanı varsa L×(J∩K) kaç sıralı ikili içerir?",
  steps: [
    "Yatayda beş farklı değer var, dolayısıyla s(J∪K)=5. Düşeyde s(L)=3.",
    "Ortakları ayrı bul. s(J∩K)=4+4−5=3.",
    "L’deki her eleman üç ortak elemanla eşleşir. 3·3=9 ikili.",
  ],
  answer: "9 sıralı ikili.",
  pitfall:
    "Grafikteki 15 noktanın sayısını doğrudan istenen ürünün cevabı olarak vermek.",
};
