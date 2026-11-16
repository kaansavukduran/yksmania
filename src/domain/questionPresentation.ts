import { questionIdentity, type HelpQuestion } from "./questionHelpModel";
import type { Question } from "./model";

// Presentation revisions add the missing conditions without rewriting any
// accepted question, saved paper, answer, timestamp or learning record.
// A revision applies only to the complete, known original question identity.
type QuestionPresentationRevision = {
  id: string;
  revision: number;
  before: HelpQuestion;
  prompt?: string;
  options?: string[];
  hint?: string;
  explanation?: string;
};
export const questionPresentationRevisions: QuestionPresentationRevision[] = [
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
  {
    id: "snd-10",
    revision: 1,
    before: {
      id: "snd-10",
      prompt:
        "‘Yarın başlayacak.’ cümlesindeki başlayacak sözcüğü hakkında hangisi doğrudur?",
      options: [
        "Başla kökündeki a, ı’ya daralmıştır.",
        "Başla kökünün a’sı korunur; -yor önündeki daralma bu gelecek zaman biçimine genellenmez.",
        "Kök başlangıçta başlı olduğu için ses olayı yoktur.",
        "Her y harfi ünsüz türemesi olduğu için iki y yazılmalıdır.",
        "Doğru yazım başlıyacak olmalıdır.",
      ],
      answer: 1,
      hint: "Doğru ilk tabanı ve kullanılan eki birbirinden ayır.",
      explanation:
        "Başla- tabanının a’sı başlayacak biçiminde durur. Yardımcı y ek sınırındadır; başlıyor örneğindeki -yor daralması -(y)acak önüne taşınmaz. Yanlış bir başlangıç kökü veya başlıyacak yazımı kurmak kuralı hatalı genişletir.",
    },
    options: [
      "Başla kökündeki a, ı’ya daralmıştır.",
      "Başla- tabanının a’sı korunur; -yor önündeki daralma bu gelecek zaman biçimine genellenmez.",
      "Kök başlangıçta başlı olduğu için ses olayı yoktur.",
      "Her y harfi ünsüz türemesi olduğu için iki y yazılmalıdır.",
      "Doğru yazım başlıyacak olmalıdır.",
    ],
  },
  {
    id: "periodic-4",
    revision: 1,
    before: {
      id: "periodic-4",
      prompt:
        "Nötr Al atomunun temel hâl katman dağılımı 2, 8, 3. Periyodu kaçtır?",
      options: ["13", "3", "5"],
      answer: 1,
      hint: "Dolu katmanları say; toplam elektronu değil.",
      explanation:
        "Üç dolu katman olduğu için 3. periyottadır. 13 ise atom numarasıdır.",
    },
    hint: "Periyot için elektron içeren katmanları say; katmanların tam dolu olması gerekmez.",
    explanation:
      "Al’nin nötr temel hâl dağılımı 2,8,3 olduğundan elektron içeren üç katmanı vardır ve element 3. periyottadır. Periyot için katmanların tam dolu olması gerekmez; son katmanda 3 elektron bulunur. Toplam 13 elektron, nötr Al’nin atom numarasıdır; periyot numarası değildir.",
  },
  {
    id: "eq-2",
    revision: 1,
    before: {
      id: "eq-2",
      prompt: "A ⇌ B dengesi için [A]=1 mol/L ve [B]=2 mol/L. Kc kaçtır?",
      options: ["0,5", "1", "2"],
      answer: 2,
      hint: "Denklem katsayıları 1: Kc=[B]/[A].",
      explanation: "Kc=2/1=2. Bu oran denge derişimleriyle hesaplanır.",
    },
    prompt:
      "Sabit sıcaklıkta, ideal gazların A(g) ⇌ B(g) homojen dengesinde [A]=1 mol/L ve [B]=2 mol/L’dir. Derişimler cinsinden denge sabiti Kc kaçtır?",
  },
  {
    id: "eq-5",
    revision: 1,
    before: {
      id: "eq-5",
      prompt:
        "A ⇌ B için Kc=2 ve toplam denge derişimi [A]+[B]=6 mol/L. Denge karışımı hangisidir?",
      options: ["[A]=3, [B]=3", "[A]=4, [B]=2", "[A]=2, [B]=4"],
      answer: 2,
      hint: "[B]=2[A] eşitliğini toplamla birlikte kullan.",
      explanation:
        "[A]+2[A]=6 olduğundan [A]=2, [B]=4 mol/L. Hem toplam 6 hem [B]/[A]=2 sağlanır.",
    },
    prompt:
      "Sabit sıcaklıkta, ideal gazların A(g) ⇌ B(g) homojen dengesi için Kc=2 ve toplam denge derişimi [A]+[B]=6 mol/L’dir. Denge karışımı hangisidir?",
  },
  {
    id: "iyonik-bilesik-adlandirma-q2",
    revision: 1,
    before: {
      id: "iyonik-bilesik-adlandirma-q2",
      prompt:
        "Fe₂O₃’te oksidin yükü −2’dir. Her Fe aynı yükü taşıdığına göre adı hangisidir?",
      options: [
        "Demir(I) oksit",
        "Demir(II) oksit",
        "Didemir trioksit",
        "Demir(III) oksit",
        "Demir(II) sülfür",
      ],
      answer: 3,
      hint: "Üç oksidin toplam yükünü iki Fe’ye paylaştır.",
      explanation:
        "Toplam −6 anyon yükünü dengeleyen iki Fe toplam +6 taşır. Fe başına +3 olduğundan demir(III) oksit denir.",
    },
    prompt:
      "Fe₂O₃’te oksidin yükü −2’dir ve her Fe aynı yükü taşır. Stock (Roma rakamlı) iyonik adlandırmaya göre bileşiğin adı hangisidir?",
  },
  {
    id: "f013-foundation-katman-elektron-dizilimi-3",
    revision: 1,
    before: {
      id: "f013-foundation-katman-elektron-dizilimi-3",
      prompt:
        "X²⁺ iyonunun temel hâl katman dağılımı 2,8,8 olarak veriliyor. X nötr atomunun temel hâl dağılımı ve elementin periyodu hangisidir?",
      options: [
        "2,8,8; 3. periyot",
        "2,8,6; 3. periyot",
        "2,8,8,2; 4. periyot",
        "2,8,10; 3. periyot",
        "2,8,8,1; 4. periyot",
      ],
      answer: 2,
      hint: "Önce iyonun elektronlarını topla; sonra pozitif yükü ekleyip Z’yi bul.",
      explanation:
        "İyonun elektron sayısı 18, yükü +2 olduğundan Z=e+q=18+2=20 olur. Nötr Ca atomunun temel hâl dağılımı 2,8,8,2 ve periyodu 4’tür. İyonun üç dolu katmanı elementin periyodunu 3’e indirmez.",
    },
    explanation:
      "İyonun elektron sayısı 18, yükü +2 olduğundan Z=e+q=18+2=20 olur. Nötr Ca atomunun temel hâl dağılımı 2,8,8,2 ve periyodu 4’tür. İyonun elektron içeren üç katmanı, elementin periyodunu 3’e indirmez.",
  },
  {
    id: "f013-foundation-katman-elektron-dizilimi-7",
    revision: 1,
    before: {
      id: "f013-foundation-katman-elektron-dizilimi-7",
      prompt:
        "Ne nötr atomu için Z=10, Na⁺ için Z=11, Mg²⁺ için Z=12 veriliyor. Bu üç tanecik için hangi açıklama doğrudur?",
      options: [
        "Üçü aynı elementtir; çünkü elektron sayıları eşittir.",
        "Üçü de 10 elektron taşıyabilir; proton sayıları ve element kimlikleri farklıdır.",
        "Mg²⁺ oluşurken proton sayısı 10’a düşmüştür.",
        "Na⁺ oluşurken çekirdeğe bir proton eklenmiştir.",
        "Ne nötr olduğu için elektron taşımaz.",
      ],
      answer: 1,
      hint: "Her birinde e=Z−q hesapla; elektron eşitliğini proton eşitliği sayma.",
      explanation:
        "Ne için e=10; Na⁺ için e=11−1=10; Mg²⁺ için e=12−2=10 bulunur. Katman dağılımları 2,8 olan bu türler izoelektroniktir. Proton sayıları 10,11,12 olarak farklı kaldığından aynı elemente dönüşmüş sayılmazlar.",
    },
    explanation:
      "Ne için e=10; Na⁺ için e=11−1=10; Mg²⁺ için e=12−2=10 bulunur. Proton sayıları 10,11,12 olarak farklı kaldığından aynı elemente dönüşmüş sayılmazlar. Temel hâlde ele alınırlarsa üçünün de katman dağılımı 2,8 olur; bu koşulda elektron sayıları ve dizilimleri aynı olduğundan izoelektroniktirler. Kökte temel hâl verildiği varsayılmaz.",
  },
];
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
  const view = { ...question };
  if (revision.prompt !== undefined) view.prompt = revision.prompt;
  if (revision.options !== undefined) view.options = [...revision.options];
  if (revision.explanation !== undefined)
    view.explanation = revision.explanation;
  // A personal hint or a historical snapshot without a hint remains intact.
  if (revision.hint !== undefined && question.hint === revision.before.hint)
    view.hint = revision.hint;
  return view;
}
export function localizedQuestionView<T extends Question>(question: T): T {
  const original = {
    id: question.id,
    prompt: question.prompt.tr,
    passage: question.passage?.tr,
    options: question.options.map((o) => o.tr),
    answer: question.answer,
    explanation: question.explanation.tr,
    hint: question.hint.tr,
  };
  const view = clarifiedQuestionView(original);
  if (view === original) return question;
  return {
    ...question,
    ...(view.prompt !== original.prompt
      ? { prompt: { ...question.prompt, tr: view.prompt } }
      : {}),
    ...(view.options.some((s, i) => s !== original.options[i])
      ? {
          options: question.options.map((o, i) =>
            o.tr === view.options[i] ? o : { ...o, tr: view.options[i] },
          ),
        }
      : {}),
    ...(view.explanation !== original.explanation
      ? { explanation: { ...question.explanation, tr: view.explanation } }
      : {}),
    ...(view.hint !== original.hint
      ? { hint: { ...question.hint, tr: view.hint! } }
      : {}),
  };
}
