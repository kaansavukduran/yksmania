import type { SourceMathNode, SourceQuestionFigureSpec } from "./SourceQuestionFigure";
import { wireComparisons } from "./wireResistance076";

export const wireDiameterQuestionId = "elektrik-akimi-q5";
type Geometry = Extract<SourceQuestionFigureSpec, { kind: "geometry" }>;
type Segment = NonNullable<Geometry["segments"]>[number];
const doubled = wireComparisons[3];
const diameterRatio = Math.sqrt(doubled.area);
const text = (value: string): SourceMathNode => ({ kind: "text", text: value });
const row = (...items: SourceMathNode[]): SourceMathNode => ({ kind: "row", items });
const fraction = (numerator: SourceMathNode, denominator: SourceMathNode): SourceMathNode => ({
  kind: "fraction", numerator, denominator,
});
const math = (title: string, alt: string, expression: SourceMathNode): SourceQuestionFigureSpec => ({
  kind: "math", title, alt, expression,
});
const rods = [
  { name: "X", center: 57, radius: 14, diameter: "d" },
  { name: "Y", center: 167, radius: 14 * diameterRatio, diameter: `${diameterRatio}d` },
];
const stem: Geometry = {
  kind: "geometry",
  title: "Eşit boylu X ve Y telleri",
  alt: "X ile Y aynı boyda, aynı malzemeden ve aynı sıcaklıkta iki teldir. Dairesel ön yüzlerde X’in çapı d, Y’nin çapı 2d olarak gösterilir.",
  caption: null,
  viewBox: [0, 0, 300, 258],
  circles: rods.map(({ center, radius }) => ({ center: [86, center], radius })),
  segments: rods.flatMap(({ center, radius }): Segment[] => [
    { from: [86, center - radius], to: [238, center - radius] },
    { from: [86, center + radius], to: [238, center + radius] },
    { from: [238, center - radius], to: [238, center + radius] },
    { from: [86 - radius, center], to: [86 + radius, center], dashed: true },
  ]),
  labels: rods.flatMap(({ center, radius, name, diameter }) => [
    { at: [28, center + 4], text: name, anchor: "middle" as const },
    { at: [86, center + radius + 36], text: diameter, anchor: "middle" as const },
    { at: [168, center + radius + 36], text: "L", anchor: "middle" as const },
  ]),
};

export const wireDiameterQuestionFigures = {
  figure: stem,
  hintFigure: math(
    "Çaptan kesit alanına geç",
    "Dairesel kesitin alanı, pi çarpı çapın karesinin dörtte biridir.",
    row(text("A ="), fraction(row(text("π"), { kind: "power", base: text("d"), exponent: text("2") }), text("4"))),
  ),
  stepFigures: [
    math("İki dairesel alanı oranla", "Y’nin alanı X’in alanının dört katıdır.", row(fraction(text("Aᵧ"), text("Aₓ")), text(`= ${diameterRatio}² = ${doubled.area}`))),
    math("Ortak çarpanları sadeleştir", "Öz direnç ve uzunluk iki telde aynı. Direnç oranı, X’in alanı bölü Y’nin alanıdır.", row(fraction(text("Rᵧ"), text("Rₓ")), text("="), fraction(text("Aₓ"), text("Aᵧ")))),
    math("Direnç oranını bul", "Y’nin direnci X’in direncinin dörtte biridir.", row(fraction(text("Rᵧ"), text("Rₓ")), text("="), fraction(text("1"), text(String(doubled.area))))),
  ],
};
