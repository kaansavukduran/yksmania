import type { SourceMathNode, SourceQuestionFigureSpec } from "./SourceQuestionFigure";

export const pistonQuestionId = "basinc-q5";
const baseArea = 3;
const outputArea = 12;
const inputForce = 45;
const outputForce = inputForce * outputArea / baseArea;

type Geometry = Extract<SourceQuestionFigureSpec, { kind: "geometry" }>;
const stem: Geometry = {
  kind: "geometry",
  title: "Aynı yükseklikte iki piston",
  alt: "Aynı yükseklikteki iki hidrolik piston aynı sıvıya bağlı. Küçük piston 3 santimetrekare ve aşağı doğru 45 newton uygulanıyor. Büyük piston 12 santimetrekare.",
  caption: null,
  viewBox: [0, -36, 440, 340],
  segments: [
    { from: [72, 105], to: [126, 105] }, { from: [258, 105], to: [366, 105] },
    { from: [72, 85], to: [72, 250] }, { from: [366, 85], to: [366, 250] },
    { from: [72, 250], to: [366, 250] },
    { from: [126, 85], to: [126, 206] }, { from: [258, 85], to: [258, 206] },
    { from: [126, 206], to: [258, 206] },
    { from: [99, 47], to: [99, 90], emphasis: true },
    { from: [91, 80], to: [99, 90], emphasis: true }, { from: [107, 80], to: [99, 90], emphasis: true },
    { from: [139, 105], to: [245, 105], dashed: true },
  ],
  labels: [
    { at: [99, 31], text: `${inputForce} N` },
    { at: [99, 289], text: `${baseArea} cm²` },
    { at: [312, 289], text: `${outputArea} cm²` },
  ],
};

const text = (value: string): SourceMathNode => ({ kind: "text", text: value });
const fraction = (above: string, below: string): SourceMathNode => ({ kind: "fraction", numerator: text(above), denominator: text(below) });

export const pistonQuestionFigures = {
  figure: stem,
  hintFigure: { ...stem, title: "Pistonların ortak seviyesini bul", alt: "Kesikli çizgi iki pistonun aynı sıvı seviyesinde olduğunu gösterir. Küçük ve büyük alanları ayrı tut." },
  stepFigures: [
    { kind: "math", title: "Alanların oranı", alt: `${outputArea} bölü ${baseArea}, 4. Santimetrekare birimleri sadeleşir.`, expression: { kind: "row", items: [fraction(`${outputArea} cm²`, `${baseArea} cm²`), text("= 4")] } },
    { kind: "math", title: "İki tarafta kuvvet bölü alan", alt: "45 bölü 3, büyük pistondaki bilinmeyen kuvvet bölü 12'ye eşit.", expression: { kind: "row", items: [fraction(String(inputForce), String(baseArea)), text("="), fraction("F₂", String(outputArea))] } },
    { kind: "math", title: "Büyük pistondaki kuvveti bul", alt: `45 çarpı 12 bölü 3, ${outputForce} newton.`, expression: { kind: "row", items: [text("F₂ ="), fraction(`${inputForce} · ${outputArea}`, String(baseArea)), text(`= ${outputForce} N`)] } },
  ],
} satisfies { figure: Geometry; hintFigure: Geometry; stepFigures: readonly SourceQuestionFigureSpec[] };
