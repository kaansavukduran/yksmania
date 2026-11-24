import type { GuideSection, WorkedExample } from "./guides/types";

export const waterDepthTitle = "Derinlik değişince kaynak değişmez";
export const twoTankDepthTitle = "Sığ ve derin dalga leğenlerini karşılaştır";
export const joinCm = 12;
export const tankLengthCm = 24;
export const waterDepthTimes = { min: 0, max: 0.75, step: 0.125, initial: 0 };
export const sourceFrequencyHz = 4;
const material = {
  shallow: { label: "Sığ", speed: 6 },
  deep: { label: "Derin", speed: 12 },
} as const;
const directions = ["sığdan derine", "derinden sığa"] as const;

export function waterDepthAt(time: number, from: keyof typeof material, to: keyof typeof material) {
  const first = material[from];
  const second = material[to];
  const period = 1 / sourceFrequencyHz;
  const joinTime = joinCm / first.speed;
  const totalTravel = joinTime + (tankLengthCm - joinCm) / second.speed;
  const xAtTravel = (age: number) => age <= joinTime
    ? age * first.speed
    : joinCm + (age - joinTime) * second.speed;
  const height = (x: number) => {
    const travel = x <= joinCm ? x / first.speed : joinTime + (x - joinCm) / second.speed;
    return Math.cos(2 * Math.PI * sourceFrequencyHz * (time - travel));
  };
  const positions = (phaseTime: number) => {
    const first = Math.ceil((phaseTime - totalTravel) / period - 1e-9);
    const last = Math.floor(phaseTime / period + 1e-9);
    return Array.from({ length: last - first + 1 }, (_, index) =>
      xAtTravel(Math.min(totalTravel, Math.max(0, phaseTime - (first + index) * period)))
    ).sort((left, right) => left - right);
  };
  return {
    crests: positions(time), troughs: positions(time - period / 2), height, period, first, second,
    firstWavelength: first.speed * period, secondWavelength: second.speed * period,
  };
}

export const waterDepthExample: WorkedExample = {
  title: "Tek kaynakla sığdan derine geçiş",
  prompt: "Kaynak 4 Hz. Tepeler sığ bölümde 6 cm/s, derin bölümde 12 cm/s ilerliyor. Her bölgede dalga boyu ve periyot nedir?",
  strategy: "Her iki bölgede aynı kaynak frekansını kullan. Şekildeki her sürati frekansa böl.",
  steps: [
    { label: "Periyodu bul", explanation: "Her 0,25 saniyede yeni tepe oluşur. Aradaki sınır yeni tepe üreten bir kaynak değildir.", expression: "T = 1/4 = 0,25 s", figureTitle: waterDepthTitle },
    { label: "Aralıkları karşılaştır", explanation: "Derin yolda aynı periyotta iki kat yol alınır. Üstten görünüşte ikinci bölgenin tepeleri iki kat aralıklıdır.", expression: "Sığ λ = 6/4 = 1,5 cm. Derin λ = 12/4 = 3 cm.", figureTitle: waterDepthTitle },
  ],
  answer: "Periyot iki bölgede 0,25 s. Sığda 1,5 cm, derinde 3 cm.",
  check: "Her bölgedeki tepe aralığını 0,25 s’ye bölünce kendi sürati çıkar.",
  pitfall: "Tepe aralıkları değiştiği için frekansın da değiştiğini düşünme.",
};

export const twoTankDepthSection: GuideSection = {
  title: twoTankDepthTitle,
  figureTitle: twoTankDepthTitle,
  paragraphs: [
    "İki ayrı düz çubuk aynı 4 Hz frekansta titreşiyor. Derin leğende bir periyot içinde tepe daha çok yol alıyor. İzdüşümde aynı tür şeritler daha uzakta görünüyor.",
    "Derin ve sığ leğenlerin çizimleri aynı yatay ölçekle verilir. Dalga boyunu yan kesitte tepeden tepeye veya kâğıtta aynı tür çizgiden bir sonraki aynı tür çizgiye ölç."
  ],
  table: {
    layout: "table",
    headers: ["Leğen", "Yayılma sürati", "Sürat ÷ frekans"],
    rows: [["Sığ", "6 cm/s", "1,5 cm"], ["Derin", "12 cm/s", "3 cm"]],
  },
};

export function interfaceDepth(time: number, direction: (typeof directions)[number]) {
  return direction === "sığdan derine" ? waterDepthAt(time, "shallow", "deep") : waterDepthAt(time, "deep", "shallow");
}
