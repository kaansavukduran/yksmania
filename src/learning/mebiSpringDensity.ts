import type { GuideSection, WorkedExample } from "./guides/types";

export const springDensityTitle = "Eşit gerilimde hangi yay daha hızlı?";
export const springDensityMass = { min: 100, max: 400, step: 50, initial: 400 };
const springLengthM = 10;
const referenceMassG = 100;
const tensionN = 4;
const observationS = 0.25;
const sourceDurationS = 0.08;
const decimals = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 2 });

function springReading(massG: number) {
  const linearDensity = (massG / 1000) / springLengthM;
  const speedMps = Math.sqrt(tensionN / linearDensity);
  return {
    linearDensity,
    speedMps,
    travelledM: speedMps * observationS,
    widthM: speedMps * sourceDurationS,
  };
}

export function springDensityAt(comparisonMassG: number) {
  return {
    reference: springReading(referenceMassG),
    comparison: springReading(comparisonMassG),
    tensionN,
    spanM: springLengthM,
    observationS,
  };
}

export const springDensitySection: GuideSection = {
  title: springDensityTitle,
  figureTitle: springDensityTitle,
  paragraphs: [
    "Bir yayın birim uzunluğunun kütlesine boyca kütle yoğunluğu denir. μ = m / L. Önce kütleyi kg, uzunluğu m cinsinden yaz. μ’nün birimi kg/m olur.",
    "İdeal gergin yay modelinde atmanın sürati v = √(F / μ) ile bulunur. F, yayı geren kuvvetin büyüklüğüdür. Kuvveti artırmak sürati artırır. Aynı kuvvet altında metre başına kütle artınca sürat azalır.",
    "İki yay da 10 m ve aynı 4 N kuvvetle gerili. Üst yay 100 g. Alt yayın kütlesini değiştirip aynı sürede aldıkları yolu karşılaştır. Kütle dört katına çıktığında μ da dört katına çıkar, sürat yarıya iner.",
    "Farklı boydaki yayları yalnız toplam kütleleriyle karşılaştırma. Her yayın m / L değerini ayrı bul. Verilen ideal modelde atmanın yüksekliği, aynı yayın süratini belirlemez.",
  ],
  table: {
    layout: "table",
    headers: ["10 m yayın kütlesi", "μ", "Sürat", "0,25 s’de yol"],
    rows: [100, 400].map((massG) => {
      const { linearDensity, speedMps, travelledM } = springReading(massG);
      return [`${massG} g`, `${decimals.format(linearDensity)} kg/m`, `${decimals.format(speedMps)} m/s`, `${decimals.format(travelledM)} m`];
    }),
  },
};

export const springDensityExample: WorkedExample = {
  title: "Aynı kuvvetle gerilen iki yayın sürati",
  prompt: "Boyları 10 m olan iki yay 4 N ile geriliyor. Kütleleri 100 g ve 400 g. Atmaların süratleri nedir?",
  strategy: "Önce metre başına kütleyi hesapla. Her iki sürat için aynı 4 N’yi kullan.",
  steps: [
    { label: "Boyca kütle yoğunluklarını bul", expression: "0,100 ÷ 10 = 0,01 kg/m ve 0,400 ÷ 10 = 0,04 kg/m", explanation: "Gramı kilograma çevir. İki yay aynı uzunlukta olduğu için boyca kütle yoğunluklarının oranı 4." },
    { label: "Her yayın süratini hesapla", expression: "√(4 / 0,01) = 20 m/s; √(4 / 0,04) = 10 m/s", explanation: "Sürat yoğunluğun kareköküyle ters orantılı. Çizimde aynı sürede üst atma 5 m, alt atma 2,5 m gider.", figureTitle: springDensityTitle },
  ],
  answer: "100 g’lık yayda 20 m/s, 400 g’lık yayda 10 m/s.",
  check: "5 m ÷ 0,25 s = 20 m/s ve 2,5 m ÷ 0,25 s = 10 m/s.",
  pitfall: "Kütle dört kat olduğunda sürati dörde bölme. Önce boyca kütle yoğunluğunu hesapla ve karekökü al.",
};
