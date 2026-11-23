import type { GuideSection, WorkedExample } from "./guides/types";

export const brickPressureTitle = "Tuğlaları say, zemine değen alanı bul";
export const uprightPrismTitle = "Düşey kesitte yük ve alan birlikte azalır";

// Each layer contains one brick. Constants measure contact area in multiples of S.
export const brickStacks = [
  { label: "I", layers: [1, 1] },
  { label: "II", layers: [2, 2] },
  { label: "III", layers: [2, 2, 2] },
] as const;

export function brickPressure(index: number) {
  const { layers } = brickStacks[index];
  const weight = layers.length;
  const area = layers[0];
  return { weight, area, pressure: weight / area };
}

export const prismBaseAreas = [4, 1, 3] as const;
export const prismHeightMetres = 0.2;
export const prismDensity = 2000;
export const prismGravity = 10;
export function prismPressure(area: number, height = prismHeightMetres) {
  const force = prismDensity * area * height * prismGravity;
  return { area, height, force, pressure: force / area };
}

export function brickPressureRatio(index: number) {
  const { weight, area, pressure } = brickPressure(index);
  if (!Number.isInteger(pressure)) return `${weight}G/(${area}S)`;
  return pressure === 1 ? "G/S" : `${pressure}G/S`;
}
export const brickPressureSection: GuideSection = {
  title: brickPressureTitle,
  figureTitle: brickPressureTitle,
  paragraphs: [
    "Bütün tuğlalar özdeş. Her tuğlanın ağırlığı G. Dar yüzün alanı S, geniş yüzün alanı 2S. Durgun düzeneklerde yatay zemin her sütundaki bütün tuğlaların ağırlığını taşır. Basınç hesabında yalnız en alttaki tuğlanın zemine değen yüzünü kullan.",
    "I ve II'de ağırlık 2G. II'nin temas alanı iki katı olduğu için basıncı I'in yarısı. III aynı geniş tabanda ikinci düzeneğe göre bir tuğla fazla taşıyor. Bu yüzden II'den büyük, I'in 2G/S değerinden küçük basınç yapar.",
  ],
  table: {
    layout: "table",
    headers: ["Düzenek", "Dik kuvvet", "Temas alanı", "Basınç"],
    rows: brickStacks.map(({ label }, index) => {
      const { weight, area } = brickPressure(index);
      return [label, `${weight}G`, area === 1 ? "S" : `${area}S`, brickPressureRatio(index)];
    }),
  },
};

export const uprightPrismSection: GuideSection = {
  title: uprightPrismTitle,
  figureTitle: uprightPrismTitle,
  paragraphs: [
    "Yatay, durgun ve yalnız kendi ağırlığını taşıyan homojen dik prizmanın hacmi A·h'dir. Zemine aktarılan kuvvet ρ·A·h·g olur. A'ya bölünce zemindeki ortalama basınç P = ρgh çıkar. Burada ρ yoğunluk, h zemine dik yükseklik ve g yerçekimi ivmesidir.",
    "Düşey kesilen prizmanın iki parçası da eski tabanı üzerinde duruyor. Alanları ve ağırlıkları farklı olsa da yükseklikleri eşit, ortalama basınçları da eşit. Yatay kesip parçaları ayrı ayrı aynı yönde yerleştirirsen yükseklik düşer ve basınç azalır.",
  ],
};

export const brickPressureExample: WorkedExample = {
  title: "Üç tuğla düzenini basınca göre sırala",
  prompt: "Her tuğla 12 N. Dar taban 0,02 m², geniş taban 0,04 m². I: Dar tabanda iki tuğla. II: Geniş tabanda iki tuğla. III: Geniş tabanda üç tuğla. Çizimdeki düzeneklerin ortalama zemin basınçlarını karşılaştır.",
  strategy: "Her düzenekte önce tuğlaları say, sonra zemine temas eden yüzü seç.",
  steps: brickStacks.map(({ label }, index) => {
    const { weight, area, pressure } = brickPressure(index);
    const loads = weight * 12;
    const base = area === 1 ? "0,02" : "0,04";
    return {
      label: `${label}. düzenek`,
      expression: `P = ${loads} N / ${base} m² = ${pressure * 600} Pa`,
      explanation: area === 1 ? "İki tuğlanın yükünü dar yüz taşıyor." : "Zemine yalnız en alttaki tuğlanın geniş yüzü değiyor.",
      ...(index === 0 ? { figureTitle: brickPressureTitle } : {}),
    };
  }),
  answer: "I 1200 Pa, III 900 Pa, II 600 Pa. Sıralama I > III > II.",
  check: "II'nin tabanında III'e göre bir tuğla daha az var. Aynı tabanda bir tuğla daha eklemek 300 Pa ekliyor.",
  pitfall: "Üstteki tuğlaların taban alanları, zemine değen toplam alanı artırmaz.",
};
