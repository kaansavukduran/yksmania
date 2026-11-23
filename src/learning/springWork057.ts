import type { SourceQuestionFigureSpec } from "./SourceQuestionFigure";

export const springWorkQuestionId = "f026p-enerji-ve-hareket-9";
const stiffness = 100;
const displacement = -0.2;
const restoringForce = -stiffness * displacement;
const energy = stiffness * displacement ** 2 / 2;
const roundedEnergy = Number(energy.toFixed(2));

type Drawing = Extract<SourceQuestionFigureSpec, { kind: "geometry" }>;
type Segment = NonNullable<Drawing["segments"]>[number];
type Point = readonly [number, number];

const wallX = 49;
const currentX = 161;
const naturalX = currentX - displacement * 475;
const lineY = 107;
const coil: Point[] = Array.from({ length: 16 }, (_, index) => [
  wallX + (currentX - wallX) * index / 15,
  index === 0 || index === 15 ? lineY : lineY + (index % 2 ? -12 : 12),
]);

const given: Segment[] = [
  { from: [wallX, 63], to: [wallX, 135] },
  { from: [naturalX, 65], to: [naturalX, 151], dashed: true },
  ...coil.slice(1).map((to, index) => ({ from: coil[index], to })),
  { from: [currentX, 91], to: [currentX + 29, 91] },
  { from: [currentX + 29, 91], to: [currentX + 29, 123] },
  { from: [currentX + 29, 123], to: [currentX, 123] },
  { from: [currentX, 123], to: [currentX, 91] },
];

function springDrawing(title: string, alt: string): Drawing {
  return {
    kind: "geometry",
    title, alt, caption: null,
    viewBox: [0, 0, 470, 330],
    segments: given,
    labels: [
      { at: [143, 48], text: `k = ${stiffness} N/m` },
      { at: [344, 94], text: "Doğal boy" },
      { at: [167, 207], text: "x = −0,20 m" },
      { at: [319, 281], text: "+x sağa" },
    ],
  };
}

const forceDrawing = springDrawing(
  "Kuvvet doğal boya doğru",
  `Sıkışmış yayın ucu doğal boyunun solunda. Yay, 100 newton bölü metre çarpı 0,20 metre, yani ${restoringForce} newton sağa kuvvet uygular.`,
);
const vector: Segment[] = [
  { from: [currentX + 30, 107], to: [naturalX - 12, 107], emphasis: true },
  { from: [naturalX - 23, 97], to: [naturalX - 12, 107], emphasis: true },
  { from: [naturalX - 23, 117], to: [naturalX - 12, 107], emphasis: true },
];

export const springWorkFigures = {
  figure: springDrawing(
    "Doğal boy ve sıkışmış yay",
    "Yay duvara bağlı. Cisim doğal boy işaretinin 0,20 metre solunda. Artı x yönü sağa, yay sabiti 100 newton bölü metre.",
  ),
  hintFigure: {
    ...springDrawing(
      "Sıkışan uç ile doğal boyu karşılaştır",
      "Cismin şimdiki konumu ve doğal boyun kesikli çizgisi ayrı işaretli. Kuvvetin yönünü ve enerjinin işaretini bulmak için bu iki konumu karşılaştır.",
    ),
    segments: [...given,
      { from: [currentX, 127], to: [currentX, 150], dashed: true, emphasis: true },
      { from: [currentX, 150], to: [naturalX, 150], dashed: true, emphasis: true },
    ],
    points: [{ at: [currentX, 150], emphasis: true }, { at: [naturalX, 150], emphasis: true }],
  },
  stepFigures: [
    {
      ...forceDrawing,
      segments: [...given, ...vector],
      labels: [...(forceDrawing.labels ?? []), { at: [334, 168], text: `Fₓ = +${restoringForce} N` }],
    },
    {
      kind: "math",
      title: "Sapmayı karesine yükselt",
      alt: `Eksi 0,20 metrenin karesiyle yüzün yarısını çarp. Depolanan enerji ${roundedEnergy} joule.`,
      expression: { kind: "text", text: `U = ½ × 100 × (−0,20)² = ${roundedEnergy} J` },
    },
    {
      kind: "table",
      title: "Yön ve enerji aynı işareti taşımaz",
      alt: `Sıkışma ve aynı büyüklükte uzama için enerji ${roundedEnergy} joule. Yay kuvvetinin yönü ters döner.`,
      headers: ["Sapma", "Yayın kuvveti", "Depolanan enerji"],
      rows: [
        ["−0,20 m", `+${restoringForce} N`, `${roundedEnergy} J`],
        ["+0,20 m", `−${restoringForce} N`, `${roundedEnergy} J`],
      ],
    },
  ],
} satisfies {
  figure: SourceQuestionFigureSpec;
  hintFigure: SourceQuestionFigureSpec;
  stepFigures: readonly SourceQuestionFigureSpec[];
};
