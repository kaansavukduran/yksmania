import type { GuideSection, WorkedExample } from "./guides/types";
import { pulseAmplitude, pulseProfileAt, springPulseAt } from "./mebiSpringPulse";

export const pulseDampingTitle = "Atmanın genişliği ve genliği nasıl değişir?";
export const pulseDampingTime = { min: 0, max: 2, step: 0.25, initial: 1 };
const initialAmplitudeCm = 4;
const retainedPerSecond = 0.75;
const decimals = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 2 });

export function pulseDampingAt(timeS: number) {
  const { leftM, rightM } = springPulseAt(timeS);
  const dampedAmplitudeCm = initialAmplitudeCm * retainedPerSecond ** timeS;
  const profile = (x: number) => pulseProfileAt(x - leftM) / pulseAmplitude;
  return {
    leftM,
    rightM,
    widthM: rightM - leftM,
    idealAmplitudeCm: initialAmplitudeCm,
    dampedAmplitudeCm,
    idealHeightCm: (x: number) => initialAmplitudeCm * profile(x),
    dampedHeightCm: (x: number) => dampedAmplitudeCm * profile(x),
  };
}

export const pulseDampingSection: GuideSection = {
  title: pulseDampingTitle,
  figureTitle: pulseDampingTitle,
  paragraphs: [
    "Genişlik, yayın doğrultusunda atmanın başladığı ve bittiği noktalar arasındaki uzaklıktır. Genlik, denge çizgisinden tepeye ya da çukura ölçülen en büyük uzaklıktır. Çizimde yatay ve düşey ölçüleri ayrı oku.",
    "Sürtünmenin ihmal edildiği ideal yayda atma ilerlerken hem genişlik hem genlik sabit kalır. Atmanın genişliğini yayılma sürati ile kaynağın hareket süresinin çarpımı verir.",
    "Laboratuvarda sürtünme atmayı sönümleyebilir. Alttaki örnek, aynı başlangıç biçiminin genliğini her saniye önceki değerin dörtte üçüne indiren bir model. Yatay genişlik karşılaştırma için sabit tutuldu.",
  ],
  table: {
    layout: "table",
    headers: ["Süre", "Genişlik", "İdeal genlik", "Sönümlü örnekte genlik"],
    rows: [0, 1, 2].map((time) => {
      const { widthM, idealAmplitudeCm, dampedAmplitudeCm } = pulseDampingAt(time);
      return [`${time} s`, `${decimals.format(widthM)} m`, `${decimals.format(idealAmplitudeCm)} cm`, `${decimals.format(dampedAmplitudeCm)} cm`];
    }),
  },
};

export const pulseDampingExample: WorkedExample = {
  title: "Atmanın genliği iki saniye sonra",
  prompt: "Aynı 4 cm genlikle başlayan iki atmanın ilkinde sürtünme ihmal ediliyor. İkincinin genliği her saniye önceki değerin %75’ine iniyor. İki saniye sonra genlikleri kaç santimetredir?",
  strategy: "İdeal atmanın genliğini sabit tut. Sönümlü örnekte her saniye bir önceki değerin %75’ini al.",
  steps: [
    { label: "İlk saniyeyi hesapla", expression: "4 × 0,75 = 3 cm", explanation: "Her iki atma da 4 cm ile başlar. Sönümlü örnekte ilk saniyenin sonunda 3 cm kalır." },
    { label: "İkinci saniyeyi hesapla", expression: "3 × 0,75 = 2,25 cm", explanation: "İlk saniyenin sonunda kalan değeri kullan. Çizimi 2 s’ye getirip tepe yüksekliklerini karşılaştır.", figureTitle: pulseDampingTitle },
  ],
  answer: "İdeal atmanın genliği 4 cm, sönümlü örneğin genliği 2,25 cm.",
  check: "4 × 0,75² = 2,25 cm. Her iki çizimde yatay genişlik 3 m.",
  pitfall: "İkinci saniyedeki azalmayı başlangıç genliğinden hesaplama. Önceki saniyeden kalan 3 cm’yi kullan.",
};
