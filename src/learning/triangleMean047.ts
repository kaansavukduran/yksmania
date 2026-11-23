import type { SourceQuestionFigureSpec } from "./SourceQuestionFigure";

type Geometry = Extract<SourceQuestionFigureSpec, { kind: "geometry" }>;
type Point = readonly [number, number];
const radians = (value: number) => value * Math.PI / 180;
const firstSide = 2;
const secondSide = 6;
const lowerBound = secondSide - firstSide;
const upperBound = firstSide + secondSide;
const candidates = [2 * firstSide - secondSide, (firstSide + secondSide) / 2, 2 * secondSide - firstSide];
const firstAngle = 72;
const secondAngle = 36;
const thirdAngle = 180 - firstAngle - secondAngle;
const rightLeg = 6;
const otherLeg = rightLeg * 4 / 3;
const hypotenuse = Math.hypot(rightLeg, otherLeg);

const outline = (left: Point, right: Point, top: Point) => [
  { from: left, to: right },
  { from: right, to: top },
  { from: top, to: left },
];

const lengthGiven: Geometry = {
  kind: "geometry", viewBox: [23, 9, 349, 212], title: "I. İki uzunluk",
  caption: "I. İki uzunluk",
  alt: "Şematik çizimde iki kenarın uzunluğu 2 ve 6 birim. Üçüncü kenarın uzunluğu u.",
  segments: outline([86, 164], [309, 164], [136, 48]),
  labels: [
    { at: [66, 117], text: String(firstSide) },
    { at: [197, 206], text: String(secondSide) },
    { at: [244, 84], text: "u" },
  ],
};

const baseLeft: Point = [69, 232];
const baseRight: Point = [329, 232];
const rise = (baseRight[0] - baseLeft[0]) /
  (1 / Math.tan(radians(firstAngle)) + 1 / Math.tan(radians(secondAngle)));
const tip: Point = [baseLeft[0] + rise / Math.tan(radians(firstAngle)), baseLeft[1] - rise];
const angleGiven: Geometry = {
  kind: "geometry", viewBox: [29, 24, 342, 249], title: "II. İki açı",
  caption: "II. İki açı",
  alt: "Üçgenin sol taban açısı 72 derece, sağ taban açısı 36 derece.",
  segments: outline(baseLeft, baseRight, tip),
  arcs: [
    { center: baseLeft, radius: 35, start: 0, degrees: firstAngle },
    { center: baseRight, radius: 43, start: 180 - secondAngle, degrees: secondAngle },
  ],
  labels: [
    { at: [129, 201], text: `${firstAngle}°` },
    { at: [231, 221], text: `${secondAngle}°` },
  ],
};

function rightTriangle(solved: boolean): Geometry {
  const origin: Point = [97, 208];
  const scale = 24;
  const top: Point = [origin[0], origin[1] - rightLeg * scale];
  const right: Point = [origin[0] + otherLeg * scale, origin[1]];
  return {
    kind: "geometry", viewBox: [26, 18, 318, 258],
    title: solved ? "Dik üçgende 6, 8 ve 10" : "III. Dik açı ve bir kenar",
    caption: solved ? null : "III. Dik açı ve bir kenar",
    alt: solved
      ? "Dik kenarlar 6 ve 8 birim, en uzun kenar 10 birim. Sekiz, altı ve onun ortalamasıdır."
      : "Şematik çizimde iki kenar dik kesişiyor. Düşey dik kenar 6 birim. Diğer kenarlar belirtilmemiş.",
    segments: [
      ...outline(origin, right, top),
      { from: [97, 187], to: [118, 187] },
      { from: [118, 187], to: [118, 208] },
    ],
    labels: [
      { at: [63, 151], text: String(rightLeg) },
      ...(solved ? [
        { at: [197, 251] as Point, text: String(otherLeg) },
        { at: [236, 104] as Point, text: String(hypotenuse) },
      ] : []),
    ],
  };
}

const numberLinePosition = (value: number): Point => [73 + (value + 3) * 21, 93];
const registeredNumbers = [...new Set([...candidates, lowerBound, upperBound])].sort((a, b) => a - b);
const boundLine: Geometry = {
  kind: "geometry", viewBox: [33, 17, 369, 164], title: "Kenar uzunluğunun açık aralığı",
  alt: "Açık aralık 4’ten 8’e. Dört ve sekiz uçları dahil değil. Eksi iki, dört ve on adaylarının hiçbiri aralığa girmez.",
  caption: null,
  segments: [
    { from: numberLinePosition(-3), to: numberLinePosition(11) },
    { from: numberLinePosition(lowerBound), to: numberLinePosition(upperBound), emphasis: true },
  ],
  points: registeredNumbers.map((n) => ({ at: numberLinePosition(n), open: n === lowerBound || n === upperBound })),
  labels: registeredNumbers.map((n) => ({ at: [numberLinePosition(n)[0], n === 10 ? 154 : 67], text: String(n).replace("-", "−") })),
};

const equalAngles: Geometry = {
  ...angleGiven, title: "İki eş açı, iki eş kenar",
  alt: "Sol taban ve tepe açılarının her biri 72 derece. Bu iki açının karşısındaki alt ve sağ kenarlar eşit. Sağ taban açısı 36 derece.",
  caption: null,
  segments: [
    { from: baseLeft, to: baseRight, emphasis: true },
    { from: baseRight, to: tip, emphasis: true },
    { from: tip, to: baseLeft },
  ],
  labels: [...(angleGiven.labels ?? []), { at: [tip[0] + 51, tip[1] - 8], text: `${thirdAngle}°` }],
};

export const triangleMean047 = {
  sides: [firstSide, secondSide], bounds: [lowerBound, upperBound], candidates,
  angles: [firstAngle, secondAngle, thirdAngle], rightSides: [rightLeg, otherLeg, hypotenuse],
  figures: [lengthGiven, angleGiven, rightTriangle(false)] as const,
  steps: [boundLine, equalAngles, rightTriangle(true)] as const,
};
