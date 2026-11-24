import type { GuideSection, WorkedExample } from "./guides/types";

type Point = readonly [number, number];
export const virtualWaterTitle = "Düz engelde noktasal kaynak";
export const virtualWaterReflectionTitle = "Düz engelde sanal kaynak O′";
export const sourceDistanceCm = { min: 2, max: 5, step: 0.5, initial: 3 };
export const virtualWaterWavelengthCm = 0.8;

function arc(radius: number, centerX: number, start: number, end: number): Point[] {
  return Array.from({ length: 41 }, (_, index) => {
    const angle = start + index * (end - start) / 40;
    return [centerX + radius * Math.cos(angle), radius * Math.sin(angle)];
  });
}

export function virtualWaterAt(distance: number) {
  const cone = Math.PI / 4;
  const reflectedRadii = [0.7, 1.5, 2.3].map((offset) => distance + offset);
  return {
    real: [-distance, 0] as Point,
    virtual: [distance, 0] as Point,
    wavelength: virtualWaterWavelengthCm,
    incoming: [1.9, 1.1, 0.3].map((offset) => arc(distance - offset, -distance, -cone, cone)),
    outgoing: reflectedRadii.map((radius) => {
      const halfAngle = Math.min(cone, Math.acos(distance / radius));
      return arc(radius, distance, Math.PI - halfAngle, Math.PI + halfAngle);
    }),
    // Trace each ray on both sides of the boundary for the image construction.
    rays: [-Math.PI / 6, 0, Math.PI / 6].map((angle) => {
      const y = distance * Math.tan(angle);
      const hit = [0, y] as Point;
      const reflected = [-Math.cos(angle), Math.sin(angle)] as Point;
      return { hit, reflected, end: [2 * reflected[0], y + 2 * reflected[1]] as Point };
    }),
  };
}

export const virtualWaterSection: GuideSection = {
  title: virtualWaterTitle,
  figureTitle: virtualWaterTitle,
  paragraphs: [
    "O’dan çıkan tepe halkalarının düz engele bakan bölümünü izle. Engelin karşı tarafındaki O′, O’nun simetriğidir. İki noktanın engele dik uzaklığı aynı büyüklüktedir.",
    "Yansıyan parçalar suyun kendi tarafında ilerler. Yansıyan hız oklarını geriye uzatınca O′’de kesişirler. O′ yerinde bir dalga kaynağı veya görülen tepe bulunmaz.",
    "Yansıyan cephe parçalarının yarıçapı O′’den ölçülür. Ardışık iki tepe arasındaki 0,8 cm, bu örnekte gelen ve yansıyan tarafta aynıdır.",
  ],
  table: {
    layout: "table",
    headers: ["Nokta veya ölçü", "Düz engeldeki karşılığı"],
    rows: [
      ["O", "Suyun bulunduğu taraftaki gerçek kaynak"],
      ["O′", "Engelin arkasındaki sanal kaynak"],
      ["|O–engel| ve |O′–engel|", "Eşit"],
    ],
  },
};

export const virtualWaterExample: WorkedExample = {
  title: "O′ yerini yansıyan cepheden bul",
  prompt: "O kaynak noktası düz engelden 3 cm uzakta. Gelen tepe aralığı 0,8 cm. Yansıyan parçaların görünür merkezi nerede, iki tepe arasındaki uzaklık kaçtır?",
  strategy: "Engelden O’ya en kısa yolu çiz. Aynı doğru üzerinde, karşı tarafta aynı uzaklığı işaretle.",
  steps: [
    { label: "Gerçek kaynağı yerleştir", expression: "|O–engel| = 3 cm", explanation: "O’dan çıkan hız okları engele doğru ilerler. Engel ile O arasındaki doğru engele diktir.", figureTitle: virtualWaterTitle },
    { label: "Yansıyan hızları geriye uzat", expression: "|O′–engel| = 3 cm, λ = 0,8 cm", explanation: "Kesikli uzantılar O′’de kesişir. Yansıyan gerçek cepheler su tarafında ilerler. Aynı ortamda dalga boyu korunur.", figureTitle: virtualWaterReflectionTitle },
  ],
  answer: "O′ engelin arkasında 3 cm uzakta. Yansıyan tepeler arası 0,8 cm.",
  check: "O ile O′ arasındaki 6 cm’nin ortasında engel bulunur.",
  pitfall: "Engelin arkasındaki kesikli uzantıları gerçek dalga cepheleri gibi okuma.",
};
