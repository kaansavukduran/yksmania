import {
  binomialId,
  combinationId,
  supplementalCountingTopics034035,
} from "../data/supplementalCountingTopics034035";
import { txt, type Lesson } from "../domain/model";
import { binomialSource035Sections } from "./binomialSource035Teaching";
import type { CheatSheet } from "./cheatsheetContent";
import { combinationSource034Sections } from "./combinationSource034Teaching";
import {
  binomialPractice035,
  combinationPractice034,
} from "./countingPractice034035";
import type { LessonGuide, WorkedExample } from "./guides/types";

const combinationExamples: WorkedExample[] = [
  {
    title: "Birlikte olamayan iki kişiyi tümleyenle say",
    prompt:
      "On farklı adaydan dört kişilik kurul seçilecek. Seda ve Kerem aynı kurulda olamaz. Roller yok. Kaç kurul kurulabilir?",
    strategy:
      "Önce bütün kurulları say. İkisinin birden bulunduğu kurulları çıkar.",
    steps: [
      {
        label: "Bütün",
        expression: "C(10,4)=210",
        explanation: "Dört isim seçilir, adların sırası önem taşımaz.",
      },
      {
        label: "Yasak",
        expression: "C(8,2)=28",
        explanation:
          "İki sabit kişi iki yeri doldurur, öteki sekiz kişiden ikisi kalır.",
      },
      {
        label: "Geçerli",
        expression: "210−28=182",
        explanation: "En az biri kurul dışında kalan seçimler geçerlidir.",
      },
    ],
    answer: "182 kurul.",
    check:
      "İkisi de dışarıda C(8,4)=70. Birinin olduğu iki durumda 2·C(8,3)=112. Toplam 182.",
    pitfall:
      "Yalnız ikisinin birlikte olduğu kurulları çıkarmak yerine, birinin bulunduğu her kurulu çıkarmak.",
  },
  {
    title: "En çok bir kişiyi iki durumda seç",
    prompt:
      "Üç satranç, dört robotik üyesi birbirinden farklı. Her üye yalnız bir grupta. Üç kişilik ekipte en çok bir satranç üyesi bulunacak. Kaç ekip vardır?",
    strategy: "Sıfır ve bir satranç üyesi olan ekipleri ayrı hesapla.",
    steps: [
      {
        label: "Sıfır satranç",
        expression: "C(4,3)=4",
        explanation: "Ekibin üçü de robotik üyesi.",
      },
      {
        label: "Bir satranç",
        expression: "C(3,1)·C(4,2)=18",
        explanation: "Bir satranç üyesi iki robotik üyesiyle birleşir.",
      },
      {
        label: "Birleştir",
        expression: "4+18=22",
        explanation: "Bir ekip bu iki duruma aynı anda giremez.",
      },
    ],
    answer: "22 ekip.",
    check:
      "C(7,3)=35 içinden iki satrançlı 12 ve üç satrançlı 1 çıkar. 35−13=22.",
    pitfall: "En çok bir koşulunda satranç üyesi olmayan grupları unutmak.",
  },
  {
    title: "Doğrusal üçlü ve tekrarlanan doğruyu ayır",
    prompt:
      "Altı farklı noktada yalnız P, Q, R doğrusal. Başka doğrusal üçlü yok. Bu noktalarla kaç üçgen ve kaç farklı doğru belirlenir?",
    strategy:
      "Üçgen için üçlüleri, doğru için çiftleri say. İki hesabın fazla kayıtları farklı.",
    steps: [
      {
        label: "Üçgen",
        expression: "C(6,3)−1=19",
        explanation: "Tek uygunsuz üçlü P, Q, R’dir.",
      },
      {
        label: "Doğru adayları",
        expression: "C(6,2)=15",
        explanation: "Her çift bir doğru belirler.",
      },
      {
        label: "Ortak doğru",
        expression: "15−3+1=13",
        explanation:
          "PQ, PR ve QR aynı doğruyu gösterir ve yalnız bir kez kalır.",
      },
    ],
    answer: "19 üçgen ve 13 doğru.",
    check:
      "Doğru sayısında üç kaydı bir kayda indirmek toplamı iki azaltır. Üçgende bir üçlü çıkar.",
    pitfall: "Üç çift bulunduğu için üç üçgenin geçersiz olduğunu sanmak.",
  },
];

const binomialExamples: WorkedExample[] = [
  {
    title: "İkinci terim seçimini ve eksi işaretini izle",
    prompt: "(2x−3)⁵ açılımında x²’nin katsayısını bul.",
    strategy: "x veren terim iki defa seçilir. Kalan üç seçim −3 olur.",
    steps: [
      {
        label: "Seçim yeri",
        expression: "C(5,3)=10",
        explanation: "Beş parantezden üçünde −3 seçilecek.",
      },
      {
        label: "Bir çarpım",
        expression: "(2x)²(−3)³=−108x²",
        explanation: "Üç negatif çarpan tek sayıda olduğu için işaret eksi.",
      },
      {
        label: "Katsayı",
        expression: "10·(−108)=−1080",
        explanation: "On aynı terimin toplamı.",
      },
    ],
    answer: "−1080.",
    check: "İki 2x konumunu seçmek C(5,2)=10 ile aynı sayıyı verir.",
    pitfall:
      "Negatif çarpanın üssü yerine x’in üssüne bakıp işaret belirlemek.",
  },
  {
    title: "Sabit terimi özgün tanım alanıyla birlikte bul",
    prompt: "x≠0 için (2x²−1/x)⁶ açılımının sabit terim katsayısı kaçtır?",
    strategy:
      "Her seçimde x üssünün nasıl değiştiğini yaz. Sıfır yapan seçim adedini bul.",
    steps: [
      {
        label: "Üs",
        expression: "2(6−r)−r=12−3r",
        explanation: "İkinci terim seçildiğinde −1 üs eklenir.",
      },
      {
        label: "Seçim",
        expression: "12−3r=0 ⇒ r=4",
        explanation: "İki 2x² ve dört −1/x seçilir.",
      },
      {
        label: "Katsayı",
        expression: "C(6,4)·2²·(−1)⁴=60",
        explanation: "Uygun her terim pozitif 4 katsayısını verir.",
      },
    ],
    answer: "Sabit katsayı 60.",
    check:
      "x⁴ ile dört 1/x çarpanının birleşiminden x⁰ çıkar. Özgün ifade hâlâ x=0’da tanımsızdır.",
    pitfall: "Sabit terimi bulmak için doğrudan x=0 yazmak.",
  },
  {
    title: "İki sayısal değerden tek ve çift toplamları çıkar",
    prompt:
      "P(x)=(x−2)⁴ içinde çift dereceli ve tek dereceli katsayıların toplamı kaçtır?",
    strategy: "x=1 toplamı, x=−1 çift eksi tek farkını verir.",
    steps: [
      {
        label: "Toplam",
        expression: "P(1)=(−1)⁴=1",
        explanation: "Her değişken kuvveti 1 olur.",
      },
      {
        label: "Fark",
        expression: "P(−1)=(−3)⁴=81",
        explanation: "Tek üsler işaretini değiştirir, çiftler değişmez.",
      },
      {
        label: "Ayır",
        expression: "Ç=(1+81)/2=41, T=(1−81)/2=−40",
        explanation: "İki doğrusal eşitliği topla ve çıkar.",
      },
    ],
    answer: "Çift dereceler 41, tek dereceler −40.",
    check: "Açılım x⁴−8x³+24x²−32x+16 verir. 1+24+16=41 ve −8−32=−40.",
    pitfall: "P(−1) değerini tek katsayıların toplamı olarak okumak.",
  },
];

export const countingGuides034035: LessonGuide[] = [
  {
    id: combinationId,
    minutes: 45,
    objectives: [
      "Aynı grubu farklı sırada tekrar saymadan seç.",
      "Zorunlu, yasak, tam ve en az koşullarını ayrık hesaplara çevir.",
      "Üçgen, doğru ve köşegen sayılarında fazla kayıtları belirle.",
    ],
    sections: combinationSource034Sections,
    examples: combinationExamples,
    recall: [
      {
        prompt: "C(6,6) ile C(6,0) niçin aynı?",
        answer: "Tümünü almak ve hiçbirini almamak ayrı ayrı tek küme verir.",
      },
      {
        prompt: "A ve B birlikte olmasın neyi dışarıda bırakır?",
        answer:
          "Yalnız ikisinin birden seçildiği kümeleri. Birinin seçilmesi geçerlidir.",
      },
      {
        prompt: "En az bir kırmızı seçmenin tümleyeni?",
        answer:
          "Hiç kırmızı seçmemek. En az bir, iki veya daha fazla kırmızı içerebilir.",
      },
      {
        prompt:
          "Dört doğrusal nokta kaç yanlış üçlü ve kaç aynı doğru çifti verir?",
        answer: "C(4,3)=4 doğrusal üçlü. C(4,2)=6 çift aynı tek doğruyu verir.",
      },
    ],
    source:
      "Aurelia Kombinasyon, içerik 5.1, fiziksel s. 1–12. OGM 10. sınıf matematik web s. 20. 2022 AYT Matematik 14 ve anahtar Geçmiş Sınavlar’da.",
  },
  {
    id: binomialId,
    minutes: 50,
    objectives: [
      "Binom terimini parantezlerden yapılan seçimle kur.",
      "Pascal katsayısını, işareti, değişken üssünü ve sıra numarasını ayır.",
      "Sabit terimi ve tek-çift katsayı toplamlarını tanım koşuluyla bul.",
    ],
    sections: binomialSource035Sections,
    examples: binomialExamples,
    recall: [
      {
        prompt: "Binom genel teriminde r neyi gösterir?",
        answer:
          "İkinci terimin kaç parantezden seçildiğini. Soldan sıra numarası r+1, x üssü ise ayrı hesaplanır.",
      },
      {
        prompt: "Pascal’ın iç sayıları nasıl oluşur?",
        answer: "Üst satırda sol üst ve sağ üst sayılarını topla. Kenarlar 1.",
      },
      {
        prompt: "x=−1 yazınca hangi katsayıların işareti değişir?",
        answer:
          "Tek derecelilerin. Çift dereceliler, sabit dahil, işaretini korur.",
      },
      {
        prompt: "n+1 seçim satırı her zaman n+1 terim mi verir?",
        answer:
          "Aynı x üssü tekrar ederse katsayıları birleştir. Toplamı sıfır olan dereceyi çıkar.",
      },
    ],
    source:
      "Aurelia Binom Açılımı, içerik 5.2, fiziksel s. 1–12. OGM 10. sınıf matematik web s. 38. 2022 AYT Matematik 13 ve anahtar Geçmiş Sınavlar’da.",
  },
];

export const countingLessons034035: Lesson[] = countingGuides034035.map(
  (guide, index) => ({
    id: guide.id,
    subjectId: "tyt-matematik",
    title: txt(supplementalCountingTopics034035[index].title),
    minutes: guide.minutes,
    objectives: guide.objectives.map(txt),
    body: guide.sections.map(({ title, paragraphs }) => ({
      title: txt(title),
      text: txt(paragraphs.join("\n\n")),
    })),
    questions: index === 0 ? combinationPractice034 : binomialPractice035,
    source: txt(guide.source),
    tags: ["Özgün öğretim soruları"],
  }),
);

const summarySections = [
  [
    {
      title: "Sırasız seçim",
      text: [
        "0≤r≤n için C(n,r)=P(n,r)/r!=n!/[r!(n−r)!]. Sıfır üye, tek boş grup. r>n olursa seçim yok.",
      ],
    },
    {
      title: "Dışarıda kalanlar",
      text: [
        "C(n,r)=C(n,n−r). Dışarıdaki n−r öğe içeridekileri tek biçimde belirler.",
      ],
    },
    {
      title: "Zorunlu ve yasak",
      text: [
        "Zorunlu üyeyi seç ve boş yer sayısını azalt. Yasak üyeyi yalnız aday listesinden çıkar. Birlikte olmasın koşulu ikisinin birlikte olduğu grubu çıkarır.",
      ],
    },
    {
      title: "Ayrık durum ve tümleyen",
      text: [
        "Bir grubun ayrı türden seçimleri çarpılır. Aynı grubu iki kez vermeyen koşul durumları toplanır. En az bir = tümü − hiçbiri.",
      ],
    },
    {
      title: "Üçgen, doğru ve köşegen",
      text: [
        "C(n,3) üçlüden doğrusal üçlüleri çıkar. C(n,2) çift içindeki her ortak doğruyu bir kez bırak. Dışbükey n-genin köşegenleri C(n,2)−n.",
      ],
    },
  ],
  [
    {
      title: "Genel terim",
      text: [
        "n≥0 tam sayı ve r=0,…,n. Genel terim C(n,r)a^(n−r)b^r. İkinci terim r kez seçilir, soldan r+1. satır.",
      ],
    },
    {
      title: "Pascal ve işaret",
      text: [
        "C(0,0)=1. İçte C(n,r)=C(n−1,r−1)+C(n−1,r). a=b=1 seçilince Pascal satır toplamı 2ⁿ. Negatif terim tek sayıda seçildiğinde işaret eksi.",
      ],
    },
    {
      title: "Hedef üs",
      text: [
        "(a·xᵖ+b·xᵠ)ⁿ için üs p(n−r)+qr, katsayı C(n,r)a^(n−r)b^r. Hedef üssü bul, r’yi tam sayı aralığında denetle.",
      ],
    },
    {
      title: "Birleşen terimler ve tanım",
      text: [
        "Aynı derecenin katsayılarını topla. Sabit terimin üssü 0’dır. Özgün ifadede x paydadaysa x=0 kullanılamaz. Biçimsel boş çarpım 1; 0⁰ sayısal değerini kullanma.",
      ],
    },
    {
      title: "Tek ve çift toplamları",
      text: [
        "Uygun P için bütün katsayıların toplamı P(1), çift=[P(1)+P(−1)]/2, tek=[P(1)−P(−1)]/2. Bir polinomda P(0) sabit katsayıdır.",
      ],
    },
  ],
];

export const countingSheets034035: CheatSheet[] = countingGuides034035.map(
  (guide, index) => ({
    topicId: supplementalCountingTopics034035[index].id,
    lessonId: guide.id,
    title: supplementalCountingTopics034035[index].title,
    subjectId: "tyt-matematik",
    sections: summarySections[index],
    cautions: guide.examples.map(({ pitfall }) => pitfall),
    examples: guide.examples.map(({ title, prompt, steps, answer }) => ({
      title,
      prompt,
      steps: steps.map(({ label, expression, explanation }) =>
        [label, expression, explanation].filter(Boolean).join(" · "),
      ),
      answer,
    })),
    recall: guide.recall,
    source: guide.source,
  }),
);
