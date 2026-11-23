import type { GuideSection, WorkedExample } from "./guides/types";

export const manometerReferenceTitle = "Manometrede açık ve kapalı ucu karşılaştır";
const airPressureCmHg = 70;
export const sourceHeightCm = 5;
export const manometerLayouts = [
  { label: "Açık uç, gaz yüzeyi alçak", direction: 1, referencePressure: airPressureCmHg, closed: false },
  { label: "Açık uç, gaz yüzeyi yüksek", direction: -1, referencePressure: airPressureCmHg, closed: false },
  { label: "Kapalı uç, yaklaşık vakum", direction: 1, referencePressure: 0, closed: true },
] as const;

export function manometerReading(heightCm: number, layout: typeof manometerLayouts[number]) {
  const signedHeight = layout.direction * heightCm;
  return {
    // Keep the total volume fixed as the two equal-width columns move.
    gasLevel: 2.65 - signedHeight / 10,
    referenceLevel: 2.65 + signedHeight / 10,
    gasPressure: layout.referencePressure + signedHeight,
  };
}

export const manometerReferenceSection: GuideSection = {
  title: manometerReferenceTitle,
  figureTitle: manometerReferenceTitle,
  paragraphs: [
    "U borusunun gaz kolundaki cıva yüzeyinden yatay bir çizgi geçir. Açık sağ kolda bu çizgi cıvanın içindeyse açık yüzeyden aşağı inmiş olursun. Durgun, bağlı cıvada aynı yatay seviyedeki basınçlar eşittir. Açık koldaki hava basıncına üstte kalan cıva sütununu ekle.",
    "Cıva sütununun 5 cm yüksekliği 5 cmHg basınç farkı verir. Kaynak örneğinde hava basıncı 70 cmHg olduğu için gaz basıncı 75 cmHg olur. Gaz yüzeyi açık yüzeyden yukarıdaysa bu kez gaz kolundan karşı seviyeye in ve 5 cmHg'yi hava basıncından çıkar. Yüzeyler aynı seviyedeyse fark sıfırdır.",
    "Gaz kolunun karşısındaki kapalı ucun üstü yaklaşık vakumsa burada başlama basıncı yaklaşık sıfırdır. 5 cm yüksekliğinde cıva bu durumda yaklaşık 5 cmHg mutlak gaz basıncı verir. Kapalı uçta önemli buhar veya başka gaz basıncı varsa onun katkısını da hesaba kat.",
  ],
  table: {
    layout: "table",
    headers: ["Düzenek", "Referans basıncı", "Gaz basıncı, 5 cm farkla"],
    rows: manometerLayouts.map((layout) => [
      layout.label,
      `${layout.referencePressure} cmHg`,
      `${manometerReading(sourceHeightCm, layout).gasPressure} cmHg`,
    ]),
  },
};

export const manometerReferenceExample: WorkedExample = {
  title: "Cıva farkına hava basıncını ekle",
  prompt: "Açık uçlu cıvalı manometrede gaz kolundaki cıva açık koldakinden 5 cm alçak. Açık hava basıncı 70 cmHg. Gazın mutlak basıncı kaç cmHg?",
  strategy: "Açık yüzeyden gaz yüzeyiyle aynı yatay seviyeye git. Cıvada aşağı inerken basınç artar.",
  steps: [
    { label: "Başlangıç", expression: "P₀ = 70 cmHg", explanation: "Açık yüzeyin üstünde hava var. Oradaki cıva basıncı atmosfer basıncına eşit." },
    { label: "Düşey fark", expression: "ΔP = 5 cmHg", explanation: "Yatay çizgiye kadar 5 cm cıva ekleniyor. Bu ölçümde hem ilk basınç hem ek basınç cmHg cinsinden.", figureTitle: manometerReferenceTitle },
    { label: "Gazı oku", expression: "70 + 5 = 75 cmHg", explanation: "Bağlı cıvada bu seviyedeki basınç iki kolda eşit. Gaz yüzeyi daha alçak olduğu için gaz basıncı açık havadan büyük." },
  ],
  answer: "75 cmHg",
  check: "Gaz basıncından hava basıncını çıkarınca ölçülen 5 cmHg fark geri gelir.",
  pitfall: "5 cmHg yalnız basınç farkı. Açık koldaki 70 cmHg'yi ekleyince mutlak basıncı bulursun.",
};
