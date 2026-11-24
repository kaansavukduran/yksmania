import type { GuideSection, WorkedExample } from "./guides/types";

export const circularWaveTitle = "Dairesel su dalgasında halkalar ve radyal yön";
export const circularWaveTime = { min: 0, max: 1.5, step: 0.5, initial: 0 };
export const circularWavelengthCm = 2;
export const circularMaxRadiusCm = 7.4;
const waveSpeedCmS = 2;
const startRadiusCm = 1.5;

export function circularWaveAt(timeS: number) {
  const firstMarkedCrest = startRadiusCm + waveSpeedCmS * timeS;
  const lambda = circularWavelengthCm;
  const allRadii = (offset: number) => {
    const starting = firstMarkedCrest + offset;
    const min = Math.ceil((0.25 - starting) / lambda);
    const max = Math.floor((circularMaxRadiusCm - starting) / lambda);
    return Array.from({ length: max - min + 1 }, (_, i) => starting + lambda * (min + i));
  };
  return {
    crests: allRadii(0),
    troughs: allRadii(lambda / 2),
    markedRadii: [firstMarkedCrest, firstMarkedCrest + lambda / 2, firstMarkedCrest + lambda] as const,
    speedCmS: waveSpeedCmS,
    radialDirections: Array.from({ length: 8 }, (_, index) => {
      const angle = index * Math.PI / 4;
      return [Math.cos(angle), Math.sin(angle)] as const;
    }),
  };
}

export const circularWaveSection: GuideSection = {
  title: circularWaveTitle,
  figureTitle: circularWaveTitle,
  paragraphs: [
    "Leğenin ortasına eşit zaman aralıklarıyla damla düşür. Tepe çizgileri aynı merkezli halkalar oluşturur. Halkalar büyürken merkez yerinde kalır.",
    "İlerleme oku, damlanın düştüğü noktadan dışarı doğru uzanır. Her noktada halka çizgisine diktir.",
    "Kâğıt üzerindeki kesintisiz çizgiler tepeleri, kesikli çizgiler aradaki çukurları gösteriyor. Aynı doğrultuda iki komşu tepenin ya da iki komşu çukurun uzaklığı bir dalga boyudur.",
  ],
  table: {
    layout: "table",
    headers: ["Yarıçap boyunca ölçülen", "Uzaklık"],
    rows: [["Bir tepe → sonraki tepe", "2 cm"], ["Bir çukur → sonraki çukur", "2 cm"], ["Bir tepe → komşu çukur", "1 cm"]],
  },
};

export const circularWaveExample: WorkedExample = {
  title: "Dairesel cephede iki halka arası",
  prompt: "Su yüzeyinde O merkezinden doğuya doğru 1,5 cm ve 3,5 cm’de iki ardışık tepe var. Dalga boyunu, aradaki çukuru ve bu doğrultudaki ilerlemeyi göster.",
  strategy: "Aynı merkezden ölçülen iki yarıçapın farkını al.",
  steps: [
    { label: "İki tepenin aralığını bul", expression: "3,5 − 1,5 = 2 cm", explanation: "Aynı doğrultuda iki tepenin yarıçapları arasındaki fark dalga boyu.", figureTitle: circularWaveTitle },
    { label: "Çukuru ve ilerleme yönünü bul", expression: "1,5 + (2 / 2) = 2,5 cm", explanation: "Orta halka çukur. Bu kesitte dalga O’dan doğuya, halkanın teğetine dik ilerliyor.", figureTitle: circularWaveTitle },
  ],
  answer: "Dalga boyu 2 cm. Çukur O’dan 2,5 cm uzakta. Bu doğrultuda ilerleme doğuya.",
  check: "Yayılan çemberin farklı bir yönünde de aynı iki halka arası 2 cm ölçülür.",
  pitfall: "Bir halkanın çapını dalga boyu olarak kullanma. Ardışık iki halkanın yarıçap farkını al.",
};
