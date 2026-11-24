import type { GuideSection, WorkedExample } from "./guides/types";

export const waterReflectionTitle = "Düz engelde yansımayı kur";
export const reflectedCrestsTitle = "Düz engelden dönen cepheler";
export const waterReflectionAngles = { min: 0, max: 75, step: 5, initial: 35 };
const crestSpacingCm = 2;
const speedCmS = 4;
type Point = readonly [number, number];

export function waterReflectionAt(angleDegrees: number) {
  const rad = angleDegrees * Math.PI / 180;
  const x = Math.sin(rad);
  const y = Math.cos(rad);
  const fronts = (direction: Point, tangent: Point) => Array.from({ length: 3 }, (_, i) => {
    const distance = (i + 1) * crestSpacingCm;
    const center: Point = [direction[0] * distance, direction[1] * distance];
    const halfWidth = 1.32;
    // Cut each crest where it reaches the solid boundary y = 0.
    const limit = tangent[1] === 0 ? Infinity : -center[1] / tangent[1];
    const from = tangent[1] > 0 ? Math.max(-halfWidth, limit) : -halfWidth;
    const to = tangent[1] < 0 ? Math.min(halfWidth, limit) : halfWidth;
    return {
      center,
      from: [center[0] + from * tangent[0], Math.max(0, center[1] + from * tangent[1])] as Point,
      to: [center[0] + to * tangent[0], Math.max(0, center[1] + to * tangent[1])] as Point,
    };
  });
  return {
    incident: [x, -y] as Point,
    reflected: [x, y] as Point,
    incomingCrests: fronts([-x, y], [y, x]),
    outgoingCrests: fronts([x, y], [y, -x]),
    angleDegrees,
    crestSpacingCm,
    speedCmS,
  };
}

export const waterReflectionTable: GuideSection["table"] = {
  layout: "table",
  headers: ["Bakılan ilişki", "Düz engelde yansıma"],
  rows: [
    ["Hız oku ile dalga cephesi", "Dik"],
    ["Gelme ve yansıma açıları", "Normalden ölçülür, i = r"],
    ["Derinlik ve kaynak aynı", "Sürat, dalga boyu, frekans ve periyot aynı kalır"],
  ],
};

export const waterReflectionExample: WorkedExample = {
  title: "Düz engel, normal ve cephe açısı",
  prompt: "Dalga cephesi düz engelle 35° yapıyor. Leğen aynı derinlikte. Gelme ve yansıma açıları, sonra iki yansıyan tepe arası kaçtır? Gelen tepeler 2 cm aralıklı.",
  strategy: "Cephelere dik hız vektörleri çiz. Engelin de normalini çizip açıyı bu iki dik doğrultudan ölç.",
  steps: [
    { label: "İki dik dönüşü izle", expression: "i = 35°", explanation: "Cephe hız yönüne, engel normaline diktir. İki doğrultuyu da aynı yönde 90° döndürünce aralarındaki açı 35° kalır.", figureTitle: waterReflectionTitle },
    { label: "Yansıyan doğrultuyu ve aralığı bul", expression: "r = i = 35°, λ = 2 cm", explanation: "Yansıma normalin karşı tarafında aynı açıyı verir. Su derinliği ve kaynak aynı kaldığı için tepe aralığı 2 cm kalır.", figureTitle: reflectedCrestsTitle },
  ],
  answer: "Gelme 35°, yansıma 35°. Ardışık iki yansıyan tepe arası 2 cm.",
  check: "Yansıyan hız oku kendi tepe çizgilerini dik keser.",
  pitfall: "Hız oku ile engel arasında ölçtüğün 55°’yi gelme açısı olarak kullanma.",
};
