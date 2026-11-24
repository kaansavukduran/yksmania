import type { GuideSection, WorkedExample } from "./guides/types";

export const parallelFluxTitle = "Yüzey dönünce gelen ışığın payı";
export const tiltedFluxTitle = "60 derecede demete dik izdüşüm";
export const grazingFluxTitle = "Teğet ışının izdüşümü";
export const parallelFluxAngles = [0, 60, 90] as const;
export const patchAreaM2 = 4;
export const perpendicularIlluminanceLx = 12;

export function parallelFluxAt(angle: (typeof parallelFluxAngles)[number]) {
  const projection = angle === 90 ? 0 : Math.cos(angle * Math.PI / 180);
  const projectedAreaM2 = patchAreaM2 * projection;
  return { projection, projectedAreaM2, lumens: perpendicularIlluminanceLx * projectedAreaM2 };
}

export const parallelFluxSection: GuideSection = {
  title: parallelFluxTitle,
  figureTitle: parallelFluxTitle,
  paragraphs: [
    "Paralel ışınlardan oluşan düzgün bir demete sabit alanlı bir yüzey koy. Yüzeyin demete dik görünüşü, alabileceği ışık akısını belirler.",
    "Yüzey ışına dikse normal ile ışın arasındaki dar açı 0° ve izdüşüm alanı yüzeyin kendi alanıdır. Yüzeyi eğdiğinde ışığa görünen alan A cos θ olur. Işın yüzeye paralel olduğunda bu izdüşüm sıfıra iner.",
    "Çizimde yüzey 4 m². Işına dik birim alana 12 lx geliyor. Akı, demete dik görünen alan ile 12 lx’in çarpımıdır. Bu modelde kaynak ve yüzey alanı sabittir.",
  ],
  table: {
    layout: "table",
    headers: ["Normal açısı", "Demete dik izdüşüm", "Yüzeye düşen akı"],
    rows: parallelFluxAngles.map(angle => {
      const { projectedAreaM2, lumens } = parallelFluxAt(angle);
      return [
        angle + "°",
        projectedAreaM2.toLocaleString("tr-TR", { maximumFractionDigits: 2 }) + " m²",
        lumens.toLocaleString("tr-TR", { maximumFractionDigits: 2 }) + " lm",
      ];
    }),
  },
};

export const parallelFluxExample: WorkedExample = {
  title: "Eğilen yüzeye ulaşan ışık",
  prompt: "Düzgün paralel ışınların dik yüzeyde oluşturduğu aydınlanma 12 lx. Alanı 4 m² olan yüzey döndürülüyor. Normal açısı 60° ve 90° olduğunda gelen akı nedir?",
  strategy: "Sabit yüzey alanını her açı için demete dik izdüşüme dönüştür.",
  steps: [
    { label: "60° normal açısı", explanation: "A cos 60° = 4 × 0,5 = 2 m². Akı 12 lx × 2 m² = 24 lm.", figureTitle: tiltedFluxTitle },
    { label: "90° normal açısı", explanation: "Yüzey ışına paralel. Demete dik izdüşüm 0 m², akı 0 lm.", figureTitle: grazingFluxTitle },
  ],
  answer: "60° konumunda 24 lm, 90° konumunda 0 lm.",
  check: "İki akı da ışına dik konumdaki 48 lm değerinden küçük.",
  pitfall: "Açının iki kolunu ışın ve normal olarak işaretle. Kosinüsü bu açıdan al.",
};
