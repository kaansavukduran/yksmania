import type { GuideSection, WorkedExample } from "./guides/types";

export const photometryUnitsTitle = "Lamba etiketi ve ışık ölçümü";
export const lampComparisonTitle = "İki lambada güç ve yönlü ışık";
export const fullSphereFluxTitle = "Bütün kürenin ışık akısı";
export const squareMetreFluxTitle = "Bir metrekarelik parçanın ışık akısı";

export const lampExamples = [
  { label: "25 W lamba", electricalWatts: 25, measuredCandela: 12, rays: 8 },
  { label: "50 W lamba", electricalWatts: 50, measuredCandela: 24, rays: 16 },
] as const;

export function uniformSourceAt(intensityCd: number, radiusM: number, patchM2: number) {
  const sphereAreaM2 = 4 * Math.PI * radiusM ** 2;
  const totalLumens = 4 * Math.PI * intensityCd;
  const illuminanceLux = totalLumens / sphereAreaM2;
  return { sphereAreaM2, totalLumens, illuminanceLux, patchLumens: illuminanceLux * patchM2 };
}

export const photometryUnitsSection: GuideSection = {
  title: photometryUnitsTitle,
  figureTitle: lampComparisonTitle,
  paragraphs: [
    "Watt (W) bir lambanın elektrik gücü olabilir. Candela (cd) ise belirli bir doğrultudaki ışık şiddetini ölçer. Çizimdeki iki lambanın candela değerleri aynı doğrultu için verilmiş örnek ölçümlerdir. Yalnız watt etiketinden ışık şiddetini hesaplayamazsın.",
    "Işık akısı Φ, göz duyarlılığına göre ağırlıklandırılmış ışık gücüyle ilişkilidir. Birimi lümen (lm). Aydınlanma E, alana düşen akının yoğunluğudur. Bir lüks, bir metrekareye düzgün düşen bir lümen demektir.",
    "Bir metre yarıçaplı kürenin merkezinde her yöne eşit ışık veren 1 cd kaynak varsa kürenin her noktasında E = 1 lx olur. Kürenin tamamı 4π m² olduğundan toplam akı 4π lm. Küre üzerindeki 1 m² parçanın aldığı akı 1 lm.",
  ],
  table: {
    layout: "table",
    headers: ["Nicelik", "Birim", "Neyi ölçer?"],
    rows: [
      ["Işık şiddeti I", "cd", "Seçilen doğrultuda birim katı açıya düşen ışık akısı"],
      ["Işık akısı Φ", "lm", "Göz duyarlılığına göre ağırlıklandırılan ışık gücü"],
      ["Aydınlanma E", "lx", "Birim alana düşen ışık akısı"],
    ],
  },
};

export const photometryUnitsExample: WorkedExample = {
  title: "Bir candela, bir küre ve bir parça",
  prompt: "Her yöne 1 cd ışık saçan bir noktasal kaynak, yarıçapı 1 m olan kürenin merkezinde. Kürenin tamamına düşen ışık akısı, yüzey aydınlanması ve 1 m² parçanın aldığı akı nedir?",
  strategy: "Aynı kaynağın bütün küreye ve tek bir parçaya gönderdiği akıyı ayrı düşün.",
  steps: [
    { label: "Tam küre", explanation: "Her yönü kapsayan kürenin katı açısı 4π sr. Her steradyan başına 1 lm olduğu için toplam akı 4π lm.", figureTitle: fullSphereFluxTitle },
    { label: "Yüzey ve parça", explanation: "Kürenin alanı 4π m². E = 4π lm / 4π m² = 1 lx. Bir metrekarelik parçanın aldığı akı 1 lm.", figureTitle: squareMetreFluxTitle },
  ],
  answer: "Tam kürede 4π lm, küre yüzeyinde 1 lx, 1 m² parçada 1 lm.",
  check: "Parçadaki 1 lm toplam 4π lm’den küçük. Küredeki 1 lx birim alandaki pay.",
  pitfall: "Kürenin tamamının akısı ile 1 m² parçanın akısını ayrı yaz.",
};
