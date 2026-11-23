import type { GuideSection, WorkedExample } from "./guides/types";

export const specificHeatTitle = "Öz ısı tablosunu iki birimde oku";
export const equalHeatTitle = "Aynı ısı, farklı sıcaklık artışı";

export const heatMaterials = [
  { name: "Alüminyum", specific: 900 },
  { name: "Bakır", specific: 387 },
  { name: "Altın", specific: 129 },
  { name: "Demir", specific: 448 },
  { name: "Gümüş", specific: 234 },
  { name: "Su", specific: 4186 },
  { name: "Cıva", specific: 140 },
] as const;

export function heatPerGramCal(specific: number) {
  return specific / 4184;
}

export function temperatureRise(joules: number, kg: number, specific: number) {
  return joules / (kg * specific);
}

const numberTR = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 3 });
export const heatMaterialRows = heatMaterials.map((material) => [
  material.name, numberTR.format(material.specific),
  numberTR.format(heatPerGramCal(material.specific)),
]);

export const specificHeatSection: GuideSection = {
  title: specificHeatTitle,
  figureTitle: specificHeatTitle,
  paragraphs: [
    "Öz ısı c, bir kilogram maddenin sıcaklığını bir kelvin değiştirmek için gereken enerji miktarıdır. Hâl değişimi yok ve bu sıcaklık aralığında c’yi sabit alıyoruz. Örnek değerler 1 atmosfer ve oda sıcaklığına yakındır.",
    "1 kalori = 4,184 joule ve 1 kg = 1.000 g. Bu yüzden J/(kg·K) sayısını 4.184’e böldüğünde cal/(g·°C) karşılığını bulursun. Demir için 448 / 4.184 ≈ 0,107. Aynı madde iki birimde farklı sayı taşır.",
    "Bir cismin tamamının ısı sığası C = m × c, birimi J/K. Aynı maddeden daha fazla kütle aynı derece artış için daha çok enerji ister. Öz ısı aynı kalır, ısı sığası büyür.",
  ],
  table: {
    headers: ["Madde", "c (J/(kg·K))", "c (cal/(g·°C))"],
    rows: heatMaterialRows,
  },
};

export const equalHeatSection: GuideSection = {
  title: equalHeatTitle,
  figureTitle: equalHeatTitle,
  paragraphs: [
    "Eşit kütlede su ve demire aynı enerji verildiğinde, öz ısısı daha küçük olan demirin sıcaklığı daha fazla artar. Q = m × c × ΔT. Eşit Q ve m için ΔT, c ile ters orantılıdır.",
    "1 kg su ve 1 kg demirin her birine 4.186 J ver. Suda yaklaşık 1 °C, demirde yaklaşık 9,34 °C artış olur. Çizimin sıcaklık ekseni derece farkını gösterir. Öz ısı değerleri kendi birimiyle tabloda durur.",
  ],
};

export const equalHeatExample: WorkedExample = {
  title: "Suda 1 °C, demirde kaç °C?",
  prompt: "1 kg suya ve 1 kg demire ayrı ayrı 4.186 J veriliyor. Hâl değişimi yok. Suyun c’si 4.186 J/(kg·K), demirin 448 J/(kg·K). Sıcaklık artışlarını bul.",
  strategy: "Her madde için Q’yu ısı sığasına böl.",
  steps: [
    { label: "Su", expression: "4.186 / (1 × 4.186) = 1 °C", explanation: "Suyun ısı sığası 4.186 J/K." },
    { label: "Demir", expression: "4.186 / (1 × 448) ≈ 9,34 °C", explanation: "Demirin ısı sığası küçük. Aynı enerji, daha büyük sıcaklık farkı oluşturur.", figureTitle: equalHeatTitle },
  ],
  answer: "Su yaklaşık 1 °C, demir yaklaşık 9,34 °C ısınır.",
  check: "Demirde 448 × 9,34 yaklaşık 4.186 J. Suda 4.186 × 1 = 4.186 J.",
  pitfall: "Eşit enerji verilince iki sıcaklık artışını eşit sayma.",
};
