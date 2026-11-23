import type { GuideSection, WorkedExample } from "./guides/types";

export const atmosphereHeightTitle = "Yükseklik arttıkça hava basıncı azalır";
export const barometerHeightTitle = "Barometrede sütunun düşey yüksekliğine bak";
export const atmosphereReadings = [
  { altitude: 0, pressure: 760 },
  { altitude: 1500, pressure: 650 },
] as const;

export function barometerColumn(pressureMmHg: number, densityRatio: number, tiltDegrees: number) {
  const heightCm = pressureMmHg / (10 * densityRatio);
  return { heightCm, tubeLengthCm: heightCm / Math.cos(tiltDegrees * Math.PI / 180) };
}

export const atmosphereSection: GuideSection = {
  title: atmosphereHeightTitle,
  figureTitle: atmosphereHeightTitle,
  paragraphs: [
    "Atmosfer, ağırlığı olan bir gaz karışımıdır. Deniz seviyesine yakınken başının üzerindeki hava sütunu genellikle daha büyük bir basınç uygular. Yükseldikçe üzerindeki hava azalır ve atmosfer basıncı düşer.",
    "Kaynak çizimindeki karşılaştırmada deniz seviyesinde 760 mmHg, 1.500 m’de 650 mmHg yazıyor. Bunlar iki örnek değer. Hava koşulları değiştikçe aynı yükseklikte de farklı basınçlar ölçülebilir.",
    "Çok esnek kapalı bir balon yükselirse dış basınç azalır. Sıcaklık ve içerideki gaz miktarı yaklaşık sabitken balonun hacmi büyür. Bu gözlem, dış basınç değişimini anlamaya yardım eder.",
  ],
  table: {
    layout: "table",
    headers: ["Yükseklik", "Kaynakta hava basıncı", "Cıva sütunu"],
    rows: [
      ["0 m", "760 mmHg", "76 cm"],
      ["1.500 m", "650 mmHg", "65 cm"],
    ],
  },
};

export const barometerExample: WorkedExample = {
  title: "Eğik tüpte cıva kaç santimetre yükselir?",
  prompt: "Hava basıncı 760 mmHg. Aynı çanaktaki yeterince uzun cıva tüplerinden biri dik, diğeri düşeyle 60° açı yapıyor. İki tüpteki düşey yükseklik ve eğik tüpte sıvının tüp boyunca ölçülen uzunluğu nedir?",
  strategy: "Önce basıncın belirlediği düşey yüksekliği bul. Sonra eğik sütun uzunluğunun düşey bileşenini kullan.",
  steps: [
    { label: "Düşey yükseklik", expression: "760 mmHg → h = 76 cm", explanation: "Basınç aynı, sıvı cıva ve yerçekimi aynı. Bu nedenle iki tüpün dış çanak yüzeyinden ölçülen düşey yüksekliği eşit." },
    { label: "Eğik uzunluk", expression: "L · cos 60° = 76 cm", explanation: "Açıyı düşeyden ölç. Eğik uzunluk L, çizimde düşeydeki 76 cm’nin hipotenüsü.", figureTitle: barometerHeightTitle },
    { label: "Sonuç", expression: "L = 76 / 0,5 = 152 cm", explanation: "Eğik tüpte sıvı daha uzun görünür. Ölçülen basınç aynı kalır." },
  ],
  answer: "Her iki düşey yükseklik 76 cm. Eğik tüpte çanak yüzeyinin üstündeki sütun 152 cm uzunluğunda.",
  check: "Eğik tüpte ölçülen 152 cm'nin düşey bileşeni 152 · 0,5 = 76 cm.",
  pitfall: "Borunun tamamını veya eğik sıvı uzunluğunu h olarak formüle koyma.",
};
