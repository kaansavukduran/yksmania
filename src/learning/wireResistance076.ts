import type { GuideSection, WorkedExample } from "./guides/types";

export const wireResistanceTitle = "Telin boyu ve kesit alanı farklı etki yapar";
export const wireDiameterSolutionTitle = "Çapı iki kat olan iki bakır teli karşılaştır";
export const wireMaterialsAt20 = [
  { name: "Gümüş", symbol: "Ag", coefficient: 1.59 },
  { name: "Bakır", symbol: "Cu", coefficient: 1.7 },
  { name: "Alüminyum", symbol: "Al", coefficient: 2.82 },
] as const;
export const wireComparisons = [
  { label: "Başlangıç", length: 1, area: 1 },
  { label: "Boy iki kat", length: 2, area: 1 },
  { label: "Alan iki kat", length: 1, area: 2 },
  { label: "Çap iki kat", length: 1, area: 4 },
] as const;
const display = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 6 });
export const resistanceText = (value: number) => display.format(value);
export function wireComparison(materialIndex: number, caseIndex: number) {
  const material = wireMaterialsAt20[materialIndex];
  const shape = wireComparisons[caseIndex];
  const resistivity = material.coefficient * 1e-8;
  return {
    ...shape,
    material,
    resistivity,
    resistance: resistivity * shape.length / (shape.area * 1e-6),
    diameterInMillimeters: Math.sqrt(4 * shape.area / Math.PI),
    ratioToStart: shape.length / shape.area,
  };
}

export const wireMaterialSection: GuideSection = {
  title: "Aynı ölçüde farklı tel malzemeleri",
  paragraphs: [
    "Bir telin direnci R = ρL/A. L metre, A metrekare, öz direnç ρ ohm·metre birimindedir. Başka bir malzeme seçmeden ve sıcaklığı değiştirmeden boyu uzatırsan direnç artar.",
    "Kesit alanı telin ucundaki dairenin alanıdır. Dairesel telde A = πd²/4. Alanı iki katına çıkarmak direnci yarıya indirir. Çapı iki katına çıkarmak alanı dört katına çıkarır ve direnci dörtte bire indirir.",
    "Üç malzemeyi aynı sıcaklıkta, 20 °C’de karşılaştır. Telin boyu ve kesiti eşitse öz direnci küçük olanın direnci daha küçüktür.",
  ],
  table: {
    layout: "table",
    headers: ["Madde", "Öz direnç (Ω·m)"],
    rows: wireMaterialsAt20.map(({ name, coefficient }) => [name, `${resistanceText(coefficient)} × 10⁻⁸`]),
  },
};

const base = wireComparison(1, 0);
const doubleArea = wireComparison(1, 2);
const doubleDiameter = wireComparison(1, 3);
export const wireResistanceExample: WorkedExample = {
  title: "Bakır telde alanı ve çapı ayrı değiştir",
  prompt: "20 °C’de 1 m bakır telin kesiti 1 mm². Önce alanı, sonra ilk telden başlayarak çapı iki katına çıkar. Üç direnci karşılaştır.",
  strategy: "Önce mm²’yi m²’ye dönüştür ve her denemede aynı malzeme ile uzunluğu kullan.",
  steps: [
    { label: "Başlangıç", expression: `1 mm² = 10⁻⁶ m², R = ${resistanceText(base.resistance)} Ω`, explanation: "Milimetre uzunluğunu metreye çevirirken 10⁻³ kullanılır. Alan için bu çarpan karesine alınır." },
    { label: "Alanı iki kat yap", expression: `R/2 = ${resistanceText(doubleArea.resistance)} Ω`, explanation: "Yeni kesit 2 mm². Pay aynı, payda iki kat." },
    { label: "Çapı iki kat yap", expression: `R/4 = ${resistanceText(doubleDiameter.resistance)} Ω`, explanation: "Yeni kesit 4 mm². Başlangıç telinin çapı iki katına çıktı.", figureTitle: wireDiameterSolutionTitle },
  ],
  answer: `Sırayla ${resistanceText(base.resistance)} Ω, ${resistanceText(doubleArea.resistance)} Ω ve ${resistanceText(doubleDiameter.resistance)} Ω.`,
  check: "Üç dirençte de R·A = ρL aynı kalır çünkü malzeme, sıcaklık ve uzunluk değişmedi.",
  pitfall: "Çapı kesit alanına eşitleme. Direnç formülünde A kullanılır.",
};
