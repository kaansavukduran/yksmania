import type { GuideSection, WorkedExample } from "./guides/types";

export const bellJarTitle = "Fanusta ses hangi yoldan ulaşır?";
export const bellJarCases = [
  {
    label: "Hava var",
    inside: "Hava dolu",
    particles: 12,
    outgoingWaves: 3,
    solutionTitle: "Havadan çıkan ses",
    detail: "Saat titreşiyor. İçerideki ve dışarıdaki hava, camın hareketiyle sesin taşınmasına katılıyor.",
  },
  {
    label: "Hava az",
    inside: "Hava azaltıldı",
    particles: 5,
    outgoingWaves: 1,
    solutionTitle: "Hava azaldığında",
    detail: "Saat titreşmeye devam ediyor. Fanus içindeki hava üzerinden dışarı ulaşan ses azalıyor.",
  },
  {
    label: "İdeal boşluk",
    inside: "İdeal boşluk",
    particles: 0,
    outgoingWaves: 0,
    solutionTitle: "Boşlukta hava yolu kesilir",
    detail: "Saat hâlâ titreşiyor. Fanusta hava olmadığında havadan taşınan ses dışarı ulaşmıyor.",
  },
] as const;

export const bellJarSection: GuideSection = {
  title: bellJarTitle,
  figureTitle: bellJarTitle,
  paragraphs: [
    "Çalar saati cam fanusa yerleştir. Saatin titreşimi başlamışken fanustaki havanın bir kısmını tulumbayla dışarı çek. İçerideki hava azaldıkça dışarıdan işitilen ses zayıflar.",
    "İdeal boşlukta titreşimi taşıyacak gaz taneciği yoktur. Saat titreşmeye devam eder. Gerçek bir deneyde saatin ayağından ya da camdan dışarı ulaşan katı titreşimi ayrı bir yol olabilir.",
  ],
};

export const soundSpeedRows = [
  ["Sıcaklık", "Hava, 0 °C", "331"],
  ["Sıcaklık", "Hava, 20 °C", "343"],
  ["Ortam", "Hava, 0 °C", "331"],
  ["Ortam", "Demir, 0 °C", "5000"],
  ["Tuzluluk", "Su, 25 °C", "1493"],
  ["Tuzluluk", "Deniz suyu, 25 °C", "1533"],
];

export const soundMediumTable = {
  layout: "table",
  headers: ["Karşılaştırma", "Ortam ve sıcaklık", "Ses sürati (m/s)"],
  rows: soundSpeedRows,
} satisfies NonNullable<GuideSection["table"]>;

export const soundBellExample: WorkedExample = {
  title: "Saat neden titreştiği hâlde duyulmuyor?",
  prompt: "Saat aynı şekilde çalışıyor. Birinci fanus havayla dolu, ikinci fanusta ideal boşluk var. Hangi fanusta hava sesi taşıyabilir?",
  strategy: "Önce saatin titreşimine, sonra titreşimi taşıyan ortamın varlığına bak.",
  steps: [
    { label: "Hava olan fanusu incele", explanation: "Saat yakındaki havayı titreştirir. Bu etki komşu taneciklere geçebilir.", figureTitle: bellJarCases[0].solutionTitle },
    { label: "Hava azalınca değişeni izle", explanation: "Saat çalışmaya devam eder. Hava üzerinden dışarı gelen ses zayıflar.", figureTitle: bellJarCases[1].solutionTitle },
    { label: "İdeal boşluğu incele", explanation: "Saatin kendisi hareket etse de hava üzerinden aktarım için tanecik kalmaz.", figureTitle: bellJarCases[2].solutionTitle },
  ],
  answer: "Hava dolu fanusta hava sesi taşır. İdeal boşlukta hava üzerinden ses aktarımı olmaz.",
  check: "Her iki çizimde de çalar saatin çalıştığını gösteren titreşim çizgileri var.",
  pitfall: "Dışarıdan ses almadığında saatin de durmuş olduğunu düşünme.",
};

export const soundSpeedExample: WorkedExample = {
  title: "Aynı sıcaklıkta su ile deniz suyunu karşılaştır",
  prompt: "25 °C su için 1493 m/s, aynı sıcaklıktaki deniz suyu için 1533 m/s. Hangi ortamda ses daha hızlı ve aradaki fark kaç m/s?",
  strategy: "Tabloda tuzluluk grubu içindeki, sıcaklığı aynı iki satırı kullan.",
  steps: [
    { label: "Eş koşulu seç", explanation: "Her iki satırda 25 °C yazıyor. Sıcaklık bu karşılaştırmada sabit." },
    { label: "Sürat farkını bul", explanation: "Deniz suyu satırı daha büyük. Küçük değeri büyük değerden çıkar.", expression: "1533 − 1493 = 40 m/s" },
  ],
  answer: "Bu tabloda ses deniz suyunda 40 m/s daha hızlı.",
  check: "1493 m/s + 40 m/s = 1533 m/s.",
  pitfall: "Farkı kaynak frekansına bağlama. İki satır ortamı karşılaştırıyor.",
};
