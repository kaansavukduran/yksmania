import type { SourceMathNode, SourceQuestionFigureSpec } from "./SourceQuestionFigure";

export const bottomForceQuestionId = "basinc-q9";
const pressure = 3000;
const area = 0.02;
const force = pressure * area;
type Geometry = Extract<SourceQuestionFigureSpec, { kind: "geometry" }>;
type Segment = NonNullable<Geometry["segments"]>[number];

const stem: Geometry = {
  kind: "geometry",
  title: "Düz tabana yayılan sıvı basıncı",
  alt: "Kap tabanından bir kesit. Yatay tabanın tamamı 0,02 metrekare. Sıvı her noktaya dik ve aşağı doğru aynı 3000 paskal basıncı uygular.",
  caption: null,
  viewBox: [0, -30, 420, 302],
  segments: [
    { from: [67, 178], to: [353, 178] },
    { from: [67, 185], to: [353, 185] },
    { from: [67, 127], to: [67, 178], dashed: true },
    { from: [353, 127], to: [353, 178], dashed: true },
    ...[119, 210, 301].flatMap((x): Segment[] => [
      { from: [x, 95], to: [x, 157], emphasis: true },
      { from: [x - 8, 148], to: [x, 157], emphasis: true },
      { from: [x + 8, 148], to: [x, 157], emphasis: true },
    ]),
  ],
  labels: [{ at: [210, 58], text: `${pressure} Pa` }, { at: [210, 245], text: "0,02 m²" }],
};

const text = (value: string): SourceMathNode => ({ kind: "text", text: value });

export const bottomForceQuestionFigures = {
  figure: stem,
  hintFigure: { ...stem, title: "Aynı basıncı bütün tabanda düşün", alt: "Yatay tabandaki üç ok aynı basıncı gösterir. Toplam kuvveti bulurken tabanın bütün alanını kullan." },
  stepFigures: [
    { kind: "math", title: "Basıncın birimini aç", alt: "Bir paskal, metrekare başına bir newton.", expression: { kind: "row", items: [text("Pa ="), { kind: "fraction", numerator: text("N"), denominator: text("m²") }] } },
    { kind: "math", title: "Basıncı alanla çarp", alt: "Taban kuvveti 3000 paskal çarpı 0,02 metrekare.", expression: text("F = 3000 Pa · 0,02 m²") },
    { kind: "math", title: "Taban kuvvetini newtonla yaz", alt: `Sıvının tabana kuvveti ${force} newton.`, expression: text(`F = ${force} N`) },
  ],
} satisfies { figure: Geometry; hintFigure: Geometry; stepFigures: readonly SourceQuestionFigureSpec[] };
