import type { SourceMathNode, SourceQuestionFigureSpec } from "./SourceQuestionFigure";

export const ohmGraphQuestionId = "elektrik-akimi-q4";
const current = 2;
const voltage = 10;
const resistance = voltage / current;
type Geometry = Extract<SourceQuestionFigureSpec, { kind: "geometry" }>;
const origin = [86, 234] as const;
const plotted = [origin[0] + 72 * current, origin[1] - 13 * voltage] as const;
const corner = [plotted[0], origin[1]] as const;
const stem: Geometry = {
  kind: "geometry",
  title: "Akım–gerilim ölçüm noktası",
  alt: "Yatay eksen I, birimi amper. Düşey eksen V, birimi volt. Doğru orijinden ve 2 amper, 10 volt ölçümünden geçiyor.",
  caption: null,
  viewBox: [0, -24, 360, 326],
  segments: [
    { from: origin, to: [306, origin[1]] },
    { from: [295, 225], to: [306, origin[1]] },
    { from: [295, 243], to: [306, origin[1]] },
    { from: origin, to: [origin[0], 53] },
    { from: [77, 64], to: [origin[0], 53] },
    { from: [95, 64], to: [origin[0], 53] },
    { from: origin, to: [origin[0] + (plotted[0] - origin[0]) * 1.2, origin[1] + (plotted[1] - origin[1]) * 1.2], emphasis: true },
    { from: plotted, to: [origin[0], plotted[1]], dashed: true },
    { from: plotted, to: corner, dashed: true },
  ],
  points: [{ at: plotted, emphasis: true }],
  labels: [
    { at: [origin[0], 33], text: "V (V)", anchor: "middle" },
    { at: [306, 200], text: "I (A)", anchor: "middle" },
    { at: [65, 276], text: "0", anchor: "middle" },
    { at: [49, plotted[1] + 8], text: String(voltage), anchor: "middle" },
    { at: [plotted[0], 276], text: String(current), anchor: "middle" },
  ],
};

const text = (value: string): SourceMathNode => ({ kind: "text", text: value });
const slope: SourceMathNode = { kind: "fraction", numerator: text(String(voltage)), denominator: text(String(current)) };

export const ohmGraphQuestionFigures = {
  figure: stem,
  hintFigure: {
    kind: "table",
    title: "Eğim için eksenleri eşleştir",
    alt: "Düşeydeki gerilim değişimini, yataydaki akım değişimine böl.",
    headers: ["Eksen", "Fark"],
    rows: [["Düşey, gerilim", "ΔV"], ["Yatay, akım", "ΔI"]],
  },
  stepFigures: [
    { ...stem, title: "Orijin ile ölçümün izdüşümlerini oku" },
    { kind: "math", title: "Eğimin birimini belirle", alt: "Volt bölü amper ohm birimidir.", expression: {
      kind: "row", items: [{ kind: "fraction", numerator: text("V"), denominator: text("A") }, text("= Ω")],
    } },
    { kind: "math", title: "Direnci eğimden hesapla", alt: "10 volt bölü 2 amper, 5 ohm.", expression: {
      kind: "row", items: [text("R ="), slope, text(`= ${resistance} Ω`)],
    } },
  ],
} satisfies { figure: Geometry; hintFigure: SourceQuestionFigureSpec; stepFigures: readonly SourceQuestionFigureSpec[] };
