import { questionIdentity, type HelpQuestion } from "./questionHelpModel";
import type { Question } from "./model";

// Presentation revisions add the missing conditions without rewriting any
// accepted question, saved paper, answer, timestamp or learning record.
// A revision applies only to the complete, known original question identity.
export const questionPresentationRevisions = [
  {
    id: "ns-motion-4",
    revision: 2,
    before: {
      id: "ns-motion-4",
      prompt:
        "Bir cismin hız–zaman ilişkisinin ilk bölümündeki işaretli alan +12 m, ikinci bölümündeki işaretli alan −5 m. Başka bölüm yoktur. Toplam yer değiştirme ve alınan yol nedir?",
      options: [
        "17 m ve 7 m",
        "+7 m ve 17 m",
        "−7 m ve −17 m",
        "+12 m ve 5 m",
        "+7 m ve 7 m",
      ],
      answer: 1,
      hint: "Yer değiştirmede işaretleri koru; yol için alan büyüklüklerini topla.",
      explanation:
        "İşaretli alanların toplamı +12−5=+7 m yer değiştirmedir. Yol 12+5=17 m’dir; eksi alan negatif yol değil eksi yönde hareket katkısıdır. Sayısal alanlar soruda verildiği için ayrı bir grafik gerekmez.",
    },
    prompt:
      "Doğrusal hareket yapan bir cismin hız–zaman ilişkisinin ilk bölümü boyunca hızı sıfır veya pozitif, ikinci bölümü boyunca sıfır veya negatiftir. İlk bölümdeki işaretli alan +12 m, ikinci bölümdeki işaretli alan −5 m’dir. Başka bölüm yoktur. Toplam yer değiştirme ve alınan yol nedir?",
  },
  {
    id: "ns-energy-4",
    revision: 2,
    before: {
      id: "ns-energy-4",
      prompt:
        "Bir sistemin başlangıç enerjisi 200 J. Son durumda 60 J yerçekimi potansiyel enerjisi var ve 40 J iç enerjiye aktarılmış. Başka enerji aktarımı yoksa son kinetik enerji nedir?",
      options: ["200 J", "140 J", "100 J", "60 J", "40 J"],
      answer: 2,
      hint: "Başlangıç enerjisini son potansiyel, kinetik ve iç enerji katkılarına paylaştır.",
      explanation:
        "200=60+K+40 olduğundan K=100 J’dir. Mekanik enerjinin bir bölümünün iç enerjiye aktarılması, enerjinin yok olması demek değildir; doğru sistem sınırında bütün katkılar toplanır.",
    },
    prompt:
      "Başlangıçta mekanik enerjisi 200 J olan bir sistemde mekanik enerji yalnız kinetik enerji ile yerçekimi potansiyel enerjisinin toplamıdır. Mekanik enerjinin 40 J kadarı iç enerjiye aktarılır; mekanik enerjiyi değiştiren başka bir aktarım yoktur. Son yerçekimi potansiyel enerjisi 60 J ise son kinetik enerji nedir?",
  },
] satisfies {
  id: string;
  revision: number;
  before: HelpQuestion;
  prompt: string;
}[];
const revisions = new Map(
  questionPresentationRevisions.map((r) => [
    r.id,
    { ...r, identity: questionIdentity(r.before) },
  ]),
);
export function clarifiedQuestionView<T extends HelpQuestion>(question: T): T {
  const revision = revisions.get(question.id);
  if (!revision || questionIdentity(question) !== revision.identity)
    return question;
  return { ...question, prompt: revision.prompt };
}
export function localizedQuestionView<T extends Question>(question: T): T {
  const view = clarifiedQuestionView({
    id: question.id,
    prompt: question.prompt.tr,
    passage: question.passage?.tr,
    options: question.options.map((o) => o.tr),
    answer: question.answer,
    explanation: question.explanation.tr,
    hint: question.hint.tr,
  });
  return view.prompt === question.prompt.tr
    ? question
    : { ...question, prompt: { ...question.prompt, tr: view.prompt } };
}
