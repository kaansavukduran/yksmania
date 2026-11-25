import {
  probabilityId,
  probabilityTopic,
} from "../data/supplementalProbabilityTopic036";
import { txt, type Lesson } from "../domain/model";
import type { CheatSheet } from "./cheatsheetContent";
import type { LessonGuide } from "./guides/types";
import { probabilityExamples200, probabilitySection200, probabilitySheet200 } from "./countingDepth200";
import { probabilityPractice036 } from "./probabilityStatisticsPractice041";
import { probabilitySource036Sections } from "./probabilitySource036Teaching";

export const probabilityGuide036: LessonGuide = {
  id: probabilityId,
  minutes: 50,
  objectives: [
    "Örnek uzayı ve eş şans koşulunu belirle.",
    "Birleşim, tam biri ve tümleyeni farklı olaylar olarak yaz.",
    "Koşul geldiğinde paydayı güncelle ve bağımsızlığı denetle.",
  ],
  sections: [...probabilitySource036Sections, probabilitySection200],
  examples: [
    {
      title: "Toplam sınırı geldiğinde üç ayrı olasılığı karşılaştır",
      prompt:
        "İki bağımsız adil zar atılıyor. A ilk zarın 6 olması, B toplamın en az 9 olması. P(A), P(A∩B) ve P(A|B) değerlerini bul.",
      strategy:
        "Önce hangi ifadenin bütün örnek uzayı, hangisinin koşullu uzayı kullandığını belirle.",
      steps: [
        {
          label: "A tek başına",
          expression: "P(A)=6/36=1/6",
          explanation: "İlk zar 6 iken ikinci zar herhangi bir yüz olabilir.",
        },
        {
          label: "Ortak olay",
          expression: "P(A∩B)=4/36=1/9",
          explanation:
            "İlk zar 6 iken toplam sınırı için ikinci zar 3, 4, 5 veya 6.",
        },
        {
          label: "B bilgisi",
          expression: "P(A|B)=4/10=2/5",
          explanation: "Toplam 9,10,11,12 için 4+3+2+1 koşullu çift kalır.",
        },
      ],
      answer: "Sırasıyla 1/6, 1/9 ve 2/5.",
      check: "P(A∩B)/P(B)=(4/36)/(10/36)=4/10.",
      pitfall: "Koşullu olasılığı ortak olayın eski 36 paydasıyla yazmak.",
    },
    {
      title: "En az bir zarın bilindiği durumda ortak çifti bir kez say",
      prompt:
        "İki bağımsız adil zarın en az biri 6. İki zarın da 6 olma olasılığı nedir?",
      strategy: "Hangi zarın 6 olduğu verilmediği için iki olayı birleştir.",
      steps: [
        {
          label: "İlk 6",
          expression: "6 çift",
          explanation: "İkinci zar için altı yüz var.",
        },
        {
          label: "İkinci 6",
          expression: "6+6−1=11",
          explanation: "İki liste (6,6) çiftinde birleşir.",
        },
        {
          label: "Hedef",
          expression: "1/11",
          explanation: "İkisinin de 6 olduğu yalnız (6,6) çifti var.",
        },
      ],
      answer: "1/11.",
      check: "Hiç 6 olmayan 25 çifti çıkarınca 36−25=11.",
      pitfall: "İlk zarın kesin 6 olduğunu varsayıp 1/6 almak.",
    },
    {
      title: "Geri koyma ikinci paydayı değiştirir",
      prompt:
        "Beş kırmızı ve üç mavi farklı toptan eş şansla iki kez çekiliyor. Renklerin farklı olma olasılığını ilk top geri konduğunda ve konmadığında karşılaştır.",
      strategy: "Kırmızı→mavi ve mavi→kırmızı yollarını ayrı say.",
      steps: [
        {
          label: "Geri koymadan",
          expression: "5/8·3/7+3/8·5/7=15/28",
          explanation: "Kalan toplam yedi, öteki rengin adedi değişmez.",
        },
        {
          label: "Geri koyarak",
          expression: "5/8·3/8+3/8·5/8=15/32",
          explanation: "İkinci çekişte yeniden sekiz top vardır.",
        },
        {
          label: "Nedeni",
          explanation:
            "Geri koyma aynı fiziksel topun ikinci kez seçilmesini mümkün kılar; farklı renk için uygun pay artmaz.",
        },
      ],
      answer: "Geri koyarak 15/32. Geri koymadan 15/28.",
      check:
        "Geri koymadan sırasız uygun ikili 5·3=15, bütün ikililer C(8,2)=28.",
      pitfall: "Geri koyma bilgisi değişince ikinci çekişi yeniden kurmamak.",
    },
    ...probabilityExamples200,
  ],
  recall: [
    {
      prompt: "Sonuç adedi oranı hangi koşulla kullanılır?",
      answer: "Saydığın temel sonuçlar eş olasılıklıysa.",
    },
    {
      prompt: "P(A|B) için pay ve payda neyi sayar?",
      answer:
        "Pay hem A hem B’yi, payda B’yi. Olasılık biçiminde P(B)>0 gerekir.",
    },
    {
      prompt: "Ayrık ve pozitif olasılıklı iki olay bağımsız olabilir mi?",
      answer:
        "Ortak olasılık 0, iki pozitif olasılığın çarpımı pozitiftir. Eşitlik sağlanmaz.",
    },
    {
      prompt: "30/50 gözlenen oran, sonraki denemeyi belirler mi?",
      answer:
        "0,6 geçmiş gözlemin oranıdır. Sonraki deneme ve kesin teorik olasılık ayrıca modele bağlıdır.",
    },
  ],
  source:
    "Aurelia Olasılık, içerik 5.1, fiziksel s. 1–12. OGM Matematik 11 koşullu olasılık, basılı s. 261. 2025 TYT Temel Matematik 30 ve anahtar Geçmiş Sınavlar’da.",
};

export const probabilityLesson036: Lesson = {
  id: probabilityId,
  subjectId: probabilityTopic.subjectId,
  title: txt(probabilityTopic.title),
  minutes: probabilityGuide036.minutes,
  objectives: probabilityGuide036.objectives.map(txt),
  body: probabilityGuide036.sections.map(({ title, paragraphs }) => ({
    title: txt(title),
    text: txt(paragraphs.join("\n\n")),
  })),
  questions: probabilityPractice036,
  source: txt(probabilityGuide036.source),
  tags: ["Özgün öğretim soruları"],
};

export const probabilitySheet036: CheatSheet = {
  topicId: probabilityTopic.id,
  lessonId: probabilityId,
  title: probabilityTopic.title,
  subjectId: probabilityTopic.subjectId,
  sections: [
    {
      title: "Örnek uzay ve olay",
      text: [
        "Eş şanslı temel sonuçlarda P(A)=uygun/tüm. Ağırlıklı sonuçlarda uygun sonuçların gerçek olasılıklarını topla. İki bağımsız adil zar için 36 sıralı çift var. Toplamlar eş şanslı değildir.",
      ],
    },
    {
      title: "Tümleyen ve birleşim",
      text: [
        "En az biri 1−P(hiçbiri). P(A∪B)=P(A)+P(B)−P(A∩B). Tam biri için birleşimden ortak kısmı bir kez daha çıkar.",
      ],
    },
    {
      title: "Koşul",
      text: [
        "P(B)>0 ise P(A|B)=P(A∩B)/P(B). Koşula göre yeni paydayı kur. P(A|B) ile P(B|A) için paydalar genellikle farklıdır.",
      ],
    },
    {
      title: "Ardışık seçim",
      text: [
        "P(A)>0 iken P(A∩B)=P(A)·P(B|A). Geri koymadan çekişte kalan toplamı ve ilgili adedi güncelle. Sırasız sayımda pay ve payda aynı türde olmalı.",
      ],
    },
    {
      title: "Bağımsızlık ve gözlem",
      text: [
        "Bağımsızlıkta P(A∩B)=P(A)P(B). İkisi de pozitifse ayrık olaylar bağımsız değildir. Deneysel oran gerçekleşme/deneme sayısıdır, tek başına teorik olasılık vermez.",
      ],
    },
    probabilitySheet200,
  ],
  cautions: probabilityGuide036.examples.map(({ pitfall }) => pitfall),
  examples: probabilityGuide036.examples.map(
    ({ title, prompt, steps, answer }) => ({
      title,
      prompt,
      steps: steps.map(({ label, expression, explanation }) =>
        [label, expression, explanation].filter(Boolean).join(" · "),
      ),
      answer,
    }),
  ),
  recall: probabilityGuide036.recall,
  source: probabilityGuide036.source,
};
