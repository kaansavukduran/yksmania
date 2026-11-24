import type { GuideSection, WorkedExample } from "./guides/types";

export const wirePairTitle = "Aynı gerilimde ince ve kalın tel";
export const wireDrawingTitle = "İki ağırlık aynı gerilimi kurar";
export const wireFrequencyTitle = "Kalın tel daha az salınım yapar";
export const wireDiameter = { min: 0.8, max: 2.4, step: 0.4, initial: 1.6 };
export const wireStages = ["Tel ve ağırlık düzeneği", "Aynı süredeki salınımlar"] as const;
export const wireLengthM = 0.75;
export const wireTensionN = 20;
const steelDensityKgM3 = 7850;

export function wireAt(diameterMm: number) {
  const radiusM = diameterMm / 2000;
  const areaM2 = Math.PI * radiusM ** 2;
  const linearDensityKgM = steelDensityKgM3 * areaM2;
  const speedMps = Math.sqrt(wireTensionN / linearDensityKgM);
  return { diameterMm, linearDensityKgM, frequencyHz: speedMps / (2 * wireLengthM) };
}

export const wirePairSection: GuideSection = {
  title: wirePairTitle,
  figureTitle: wirePairTitle,
  paragraphs: [
    "K ve L telleri aynı maddeden, aynı uzunlukta. Uçlarına makaralar üzerinden eşit ağırlıklar asılıyor. Böylece iki telin gerilimi eşit. L telinin çapını büyüt ve birim uzunluğunun kütlesine ne olduğunu izle.",
    "Dairesel telin kesit alanı çapın karesiyle artar. Çap iki katına çıkınca her metredeki kütle dört katına çıkar. Eşit gerilimde tel dalgasının sürati yarıya iner. Aynı uzunluktaki daha kalın tel bu yüzden daha az titreşim yapar.",
    "Gerilim T, uzunluk L, birim uzunluk başına kütle μ. Temel frekans f = √(T/μ)/(2L). Çizimin sağında iki ses için aynı zaman aralığı kullanılır.",
  ],
};

export const wirePairExample: WorkedExample = {
  title: "Çapı iki kat olan telin frekansını bul",
  prompt: "İki tel aynı maddeden, aynı uzunlukta ve eşit gerilimde. K telinin çapı 0,8 mm, L telinin çapı 1,6 mm. L’nin temel frekansı K’nın kaç katı?",
  strategy: "Çap farkını önce kesit alanı ve birim uzunluğun kütlesine aktar.",
  steps: [
    { label: "Düzenekte eşit kalanları bul", explanation: "Eşit ağırlıklar aynı gerilimi kurar. Uzunluk ve madde de aynıdır.", figureTitle: wireDrawingTitle },
    { label: "Çap oranından frekans oranına geç", explanation: "Alan ve μ dört kat olur. Frekans, μ’nün kareköküyle ters orantılıdır.", expression: "fL/fK = 1/√4 = 1/2", figureTitle: wireFrequencyTitle },
  ],
  answer: "L telinin temel frekansı K telinin yarısıdır.",
  check: "Aynı sürede K’da iki tam salınım, L’de bir tam salınım görülür.",
  pitfall: "Çap iki katına çıkınca kesit alanını yalnız iki kat sayma.",
};
