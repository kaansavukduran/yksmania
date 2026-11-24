import type { GuideSection, WorkedExample } from "./guides/types";

export const pointSourcePlaneTitle = "Aynı yüzeyde iki noktanın aydınlanması";
export const normalSpotTitle = "Işığın dik ulaştığı B noktası";
export const obliqueSpotTitle = "Işığın eğik ulaştığı A noktası";
export const normalDistanceM = 3;
export const intensityCd = 225;

export function pointSourceIlluminance({ intensityCd, normalM, offsetM }: {
  intensityCd: number;
  normalM: number;
  offsetM: number;
}) {
  const distanceM = Math.hypot(normalM, offsetM);
  const normalCosine = normalM / distanceM;
  const angleDeg = Math.atan2(offsetM, normalM) * 180 / Math.PI;
  return { distanceM, normalCosine, angleDeg, illuminanceLux: intensityCd * normalCosine / distanceM ** 2 };
}

export function lightAtOffset(offsetM: number) {
  return pointSourceIlluminance({ intensityCd, normalM: normalDistanceM, offsetM });
}

export const pointSourcePlaneSection: GuideSection = {
  title: pointSourcePlaneTitle,
  figureTitle: pointSourcePlaneTitle,
  paragraphs: [
    "Bir noktasal ışık kaynağı ile düz bir yüzey düşün. B, kaynağın tam karşısındaki noktadır. A, aynı yüzeyde B’den aşağıdadır. İki noktanın ışığı, aynı kaynaktan ancak iki farklı yol ve açıyla gelir.",
    "B’de ışın normale paralel ve yüzeye dik. B için kaynak uzaklığı 3 m. A aşağı indikçe kaynak ile A arasındaki eğik yol uzar, A’daki ışının normalle açısı büyür.",
    "Noktasal kaynağın küçük yüzeyi aydınlatması E = I cos θ / d² ile bulunur. d ışık kaynağından seçilen noktaya olan yol, θ oradaki normal açısıdır. A’nın hem uzaklığı hem açısı B’den farklı olabilir.",
  ],
  table: {
    layout: "table",
    headers: ["Nicelik", "İşaret", "Birim"],
    rows: [["Kaynağın ışık şiddeti", "I", "cd"], ["Noktaya kadar uzaklık", "d", "m"], ["Yüzeyin aydınlanması", "E", "lx"]],
  },
};

export const pointSourcePlaneExample: WorkedExample = {
  title: "Bir duvarda 3–4–5 ışın üçgeni",
  prompt: "Her yöne 225 cd ışık saçan noktasal kaynak, düz bir duvardaki B noktasının 3 m karşısında. A noktası B’nin 4 m altında. Küçük iki alıcının aydınlanması kaç lükstür?",
  strategy: "Her noktanın ışık yolunu ve normal açısını ayrı hesapla.",
  steps: [
    { label: "B noktası", explanation: "Yol 3 m ve normal açısı 0°. E = 225 / 3² = 25 lx.", figureTitle: normalSpotTitle },
    { label: "A noktası", explanation: "Yol 5 m ve normal açısının kosinüsü 3/5. E = 225 × (3/5) / 5² = 5,4 lx.", figureTitle: obliqueSpotTitle },
  ],
  answer: "B’de 25 lx, A’da 5,4 lx.",
  check: "A’daki ışık yolu daha uzun ve daha eğik. Aydınlanma daha küçük.",
  pitfall: "A için duvara dik 3 m’yi üçgenin bir kenarı olarak kullan. Formüldeki yol A’ya uzanan 5 m’dir.",
};
