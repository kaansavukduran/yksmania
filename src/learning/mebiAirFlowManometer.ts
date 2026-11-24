import type { GuideSection, WorkedExample } from "./guides/types";

export const airFlowManometerTitle = "Basınç farkını U borusundaki suyla ölç";
export const airFlowManometerExampleTitle = "M ve L kolundaki su seviyelerini karşılaştır";

const airDensity = 1.2;
const waterDensity = 1000;
const gravity = 10;
const areaRatio = 2;

export function airFlowManometerState(wideSpeed: number) {
  const narrowSpeed = wideSpeed * areaRatio;
  const widePressureAboveNarrow = airDensity * (narrowSpeed ** 2 - wideSpeed ** 2) / 2;
  const waterHeightDifferenceCm = 100 * widePressureAboveNarrow / (waterDensity * gravity);
  return { wideSpeed, narrowSpeed, widePressureAboveNarrow, waterHeightDifferenceCm };
}

export const airFlowManometerSection: GuideSection = {
  title: airFlowManometerTitle,
  figureTitle: airFlowManometerTitle,
  paragraphs: [
    "M kolu geniş, L kolu dar hava kesitine bağlanıyor. Alttaki U borusunda su var. Akış yokken iki hava basıncı eşit ve su iki kolda aynı seviyede durur.",
    "Modelde hava dar L kesitinde daha hızlı akar. Aynı yükseklikte ideal akış kabulüyle L’nin statik basıncı M’ninkinden düşüktür. M’deki büyük basınç suyu aşağı iter. L’deki su yükselir. Hız artarken alttaki su seviyesinin nasıl değiştiğini izle.",
    "Üst boruda hava akıyor, U borusundaki su ise son durumda durgun. Bu nedenle üstte alan–sürat ve Bernoulli ilişkisi, altta ρgh kullanılır. Havanın bağlantı borularındaki ağırlığını ve akış kayıplarını ihmal ediyoruz.",
  ],
  table: {
    layout: "table",
    headers: ["K borusundaki hava", "Statik basınçlar", "U borusundaki su"],
    rows: [
      ["Durgun", "P(M) = P(L)", "Aynı seviyede"],
      ["Akıyor", "P(M) > P(L)", "L kolunda daha yüksek"],
    ],
  },
};

export const airFlowManometerExample: WorkedExample = {
  title: "U borusunun seviyeleri kaç santimetre ayrılır?",
  prompt: "M’nin bağlandığı hava kesiti, L’nin bağlandığı kesitin iki katı. Hava M’de 10 m/s, yoğunluğu 1,2 kg/m³. Kesitlerin aynı seviyede olduğu, ideal ve kararlı akışta iki kolun su seviyesi farkı nedir? Su yoğunluğu 1000 kg/m³, g = 10 m/s².",
  strategy: "Debiden dar kesitin hızını bul. Hava basıncı farkını hesapla. Bu farkı U borusundaki suyun düşey seviye farkına dönüştür.",
  steps: [
    { label: "Hız", expression: "v(L) = 2 × 10 = 20 m/s", explanation: "Alan yarıya inince sabit debide hız ikiye çıkar." },
    { label: "Basınç farkı", expression: "P(M) − P(L) = 1,2 × (400 − 100) / 2 = 180 Pa", explanation: "Aynı yükseklikte daha büyük hız terimi, daha küçük statik basınçla dengelenir." },
    { label: "Su seviyesi", expression: "h = 180 / (1000 × 10) = 0,018 m = 1,8 cm", explanation: "Geniş kesitin basıncı daha yüksek olduğundan su M kolunda alçak, L kolunda yüksek.", figureTitle: airFlowManometerExampleTitle },
  ],
  answer: "L kolundaki su, M’den 1,8 cm daha yüksek.",
  check: "180 Pa, suyun 1,8 cm’lik sütununda oluşan hidrostatik basınç farkına eşit.",
  pitfall: "1,8 cm iki seviye arasındaki farktır. Aynı kesitli iki kolda her bir yüzey orta seviyeden bunun yarısı kadar uzaklaşır.",
};
