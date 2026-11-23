import type { SourceMathNode, SourceQuestionFigureSpec } from "./SourceQuestionFigure";

export const equalDepthQuestionId = "basinc-q4";
type Geometry = Extract<SourceQuestionFigureSpec, { kind: "geometry" }>;
const depth = 0.4;
const surface = 77;
const mark = surface + depth * 205;

const vessels: Geometry = {
  kind: "geometry",
  title: "K ve L'nin düşey derinliği",
  alt: "İki farklı biçimde açık su kabı. K ve L noktaları kendi su yüzeylerinden 0,4 metre derinde. Kapların üstündeki hava basınçları eşit.",
  caption: null,
  viewBox: [0, -38, 440, 295],
  segments: [
    { from: [34, 50], to: [65, 225] }, { from: [65, 225], to: [151, 225] }, { from: [151, 225], to: [183, 50] },
    { from: [277, 50], to: [245, 225] }, { from: [245, 225], to: [420, 225] }, { from: [420, 225], to: [384, 50] },
    { from: [39, surface], to: [178, surface] }, { from: [272, surface], to: [389, surface] },
    { from: [116, surface], to: [116, mark], dashed: true }, { from: [337, surface], to: [337, mark], dashed: true },
    { from: [223, surface], to: [223, mark] },
    { from: [215, surface], to: [231, surface] }, { from: [215, mark], to: [231, mark] },
  ],
  points: [{ at: [116, mark], emphasis: true }, { at: [337, mark], emphasis: true }],
  labels: [
    { at: [105, 43], text: "P₀" }, { at: [330, 43], text: "P₀" },
    { at: [93, 190], text: "K" }, { at: [312, 190], text: "L" }, { at: [223, 24], text: "0,4 m" },
  ],
};

const mathText = (text: string): SourceMathNode => ({ kind: "text", text });

export const equalDepthQuestionFigures = {
  figure: vessels,
  hintFigure: { ...vessels, title: "Kendi su yüzeyinden ölç", alt: "Kesikli çizgiler her noktanın kendi açık su yüzeyine olan düşey uzaklığını gösterir. Kabın genişliğini ölçme." },
  stepFigures: [
    {
      kind: "table",
      title: "Ortak basınç ve su türü",
      alt: "İki kapta aynı hava basıncı, aynı sıcaklıkta su ve aynı yerçekimi var.",
      headers: ["Verilen", "K kabı", "L kabı"],
      rows: [["Yüzey basıncı", "P₀", "P₀"], ["Sıvı", "Su", "Su"]],
    },
    {
      kind: "math",
      title: "İki noktaya aynı derinliği yaz",
      alt: "Her noktadaki ifade, P sıfır artı yoğunluk çarpı g çarpı 0,4 metre.",
      expression: mathText("P₀ + ρ · g · 0,4"),
    },
    {
      kind: "math",
      title: "Basınç oranını sadeleştir",
      alt: "K'nın basıncı bölü L'nin basıncı birdir.",
      expression: { kind: "row", items: [{ kind: "fraction", numerator: mathText("Pₖ"), denominator: mathText("Pₗ") }, mathText("= 1")] },
    },
  ],
} satisfies { figure: Geometry; hintFigure: Geometry; stepFigures: readonly SourceQuestionFigureSpec[] };
