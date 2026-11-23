import type { SourceQuestionFigureSpec } from "./SourceQuestionFigure";

export const translationQuestionId = "f021-donusum-oteleme-donme-1";

type Coordinate = readonly [number, number];
type Geometry = Extract<SourceQuestionFigureSpec, { kind: "geometry" }>;
type Segment = NonNullable<Geometry["segments"]>[number];
const start: Coordinate = [-3, 4];
const vector: Coordinate = [5, -6];
const image: Coordinate = [start[0] + vector[0], start[1] + vector[1]];
const origin: Coordinate = [209, 232];
const unit = 24;
const ticks = [-4, -3, -2, -1, 0, 1, 2, 3, 4];

function numberText(value: number) {
  return value < 0 ? `−${-value}` : String(value);
}

function coordinateText([x, y]: Coordinate) {
  return `(${numberText(x)}; ${numberText(y)})`;
}

function plot([x, y]: Coordinate): Coordinate {
  return [origin[0] + unit * x, origin[1] - unit * y];
}

const axes = [
  { from: plot([-5, 0]), to: plot([5, 0]) },
  { from: plot([0, -5]), to: plot([0, 5]) },
  { from: plot([4.65, 0.2]), to: plot([5, 0]) },
  { from: plot([4.65, -0.2]), to: plot([5, 0]) },
  { from: plot([-0.2, 4.65]), to: plot([0, 5]) },
  { from: plot([0.2, 4.65]), to: plot([0, 5]) },
];
const grid = ticks.filter((value) => value !== 0).flatMap((value) => [
  { from: plot([value, -4.5]), to: plot([value, 4.5]), dashed: true },
  { from: plot([-4.5, value]), to: plot([4.5, value]), dashed: true },
]);
const labels: NonNullable<Geometry["labels"]> = [
  { at: [352, 241], text: "x", anchor: "start" },
  { at: [209, 66], text: "y", anchor: "middle" },
  { at: [186, 276], text: "0", anchor: "end" },
  { at: [111, 110], text: `P${coordinateText(start)}`, anchor: "middle" },
];

const stem: Geometry = {
  kind: "geometry",
  title: "Ötelemeden önceki konum",
  alt: "Eksenlerde bir kare bir birimdir. P, orijinin 3 birim solunda ve 4 birim yukarısında. Verilen vektör 5 birim sağa ve 6 birim aşağı hareketi tanımlar.",
  caption: "Her kare bir birim.",
  viewBox: [0, 0, 400, 384],
  segments: [...grid, ...axes],
  labels,
  points: [{ at: plot(start), emphasis: true }],
};

function operation(axis: "x" | "y", value: number, change: number): SourceQuestionFigureSpec {
  const addend = change < 0 ? `(${numberText(change)})` : numberText(change);
  const result = numberText(value + change);
  const text = `${numberText(value)} + ${addend} = ${result}`;
  return {
    kind: "math",
    title: axis === "x" ? "Yatay konumu hesapla" : "Düşey konumu hesapla",
    alt: `${axis} koordinatı: ${text}.`,
    expression: { kind: "text", text: `${axis}′ = ${text}` },
  };
}

const corner: Coordinate = [image[0], start[1]];
const move: Segment[] = [
  { from: plot(start), to: plot(corner), emphasis: true },
  { from: plot([corner[0] - 0.42, corner[1] + 0.26]), to: plot(corner), emphasis: true },
  { from: plot([corner[0] - 0.42, corner[1] - 0.26]), to: plot(corner), emphasis: true },
  { from: plot(corner), to: plot(image), emphasis: true },
  { from: plot([image[0] - 0.26, image[1] + 0.42]), to: plot(image), emphasis: true },
  { from: plot([image[0] + 0.26, image[1] + 0.42]), to: plot(image), emphasis: true },
];

export const translationQuestionFigures = {
  figure: stem,
  hintFigure: {
    kind: "table",
    title: "Vektörün bileşenlerini eksenlerle eşleştir",
    alt: "İlk bileşen yatay eksende artı 5, ikinci bileşen düşey eksende eksi 6 değişimidir.",
    headers: ["Eksen", "Değişim", "Yön"],
    rows: [["x", `+${vector[0]}`, "Sağa"], ["y", numberText(vector[1]), "Aşağı"]],
  },
  stepFigures: [
    operation("x", start[0], vector[0]),
    operation("y", start[1], vector[1]),
    {
      ...stem,
      title: "İki koordinatı yeni noktada birleştir",
      alt: `P${coordinateText(start)} noktasından 5 birim sağa, 6 birim aşağı gidince P′${coordinateText(image)} noktasına ulaşılır.`,
      segments: [...grid, ...axes, ...move],
      labels: [
        ...labels,
        { at: [257, 110], text: `+${vector[0]}`, anchor: "middle" },
        { at: [271, 197], text: numberText(vector[1]), anchor: "start" },
        { at: [253, 345], text: `P′${coordinateText(image)}`, anchor: "middle" },
      ],
      points: [...stem.points!, { at: plot(image), emphasis: true }],
    },
  ],
} satisfies {
  figure: SourceQuestionFigureSpec;
  hintFigure: SourceQuestionFigureSpec;
  stepFigures: readonly SourceQuestionFigureSpec[];
};
