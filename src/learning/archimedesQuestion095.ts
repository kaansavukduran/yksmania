import type { SourceMathNode, SourceQuestionFigureSpec } from "./SourceQuestionFigure";

export const archimedesQuestionId = "sivilarin-kaldirma-kuvveti-q1";

const submerged: Extract<SourceQuestionFigureSpec, { kind: "geometry" }> = {
  kind: "geometry",
  title: "Tamamen batık 3 L cisim",
  alt: "800 kilogram bölü metreküp yoğunlukta sıvının yüzeyi, 3 litrelik cismin üstünde. Cisim tamamen sıvının içinde tutuluyor.",
  caption: null,
  viewBox: [0, -3, 318, 194],
  segments: [
    { from: [28, 30], to: [28, 175] }, { from: [28, 175], to: [290, 175] }, { from: [290, 175], to: [290, 30] },
    { from: [28, 53], to: [290, 53], emphasis: true },
    { from: [111, 92], to: [207, 92] }, { from: [207, 92], to: [207, 147] },
    { from: [207, 147], to: [111, 147] }, { from: [111, 147], to: [111, 92] },
  ],
  labels: [{ at: [159, 33], text: "Sıvı yüzeyi" }, { at: [159, 127], text: "3 L" }],
};

const text = (value: string): SourceMathNode => ({ kind: "text", text: value });

export const archimedesQuestionFigures = {
  figure: submerged,
  hintFigure: {
    kind: "math",
    title: "Kaldırma için batan hacmi kullan",
    alt: "Kaldırma kuvveti, sıvının yoğunluğu çarpı yerçekimi ivmesi çarpı batan hacimdir. Hacmi metreküp olarak kullan.",
    expression: { kind: "row", items: [text("Fₖ ="), text("ρₛ · g · Vᵦ")] },
  },
  stepFigures: [
    {
      kind: "math",
      title: "Yer değiştiren hacmi dönüştür",
      alt: "Tam batık cisim üç litre sıvının yerini alır. Üç litre, sıfır virgül sıfır sıfır üç metreküptür.",
      expression: text("3 L = 3 × 10⁻³ m³ = 0,003 m³"),
    },
    {
      kind: "math",
      title: "Yer değiştiren sıvının kütlesi",
      alt: "Sekiz yüz kilogram bölü metreküp, sıfır virgül sıfır sıfır üç metreküple çarpılır. Sıvının kütlesi iki virgül dört kilogramdır.",
      expression: text("800 kg/m³ × 0,003 m³ = 2,4 kg"),
    },
    {
      kind: "math",
      title: "Sıvı ağırlığından kaldırmayı bul",
      alt: "İki virgül dört kilogram çarpı saniye karede on metre, yirmi dört newtondur. Kaldırma kuvveti yukarı yönlüdür.",
      expression: text("2,4 kg × 10 m/s² = 24 N"),
    },
  ],
} satisfies { figure: SourceQuestionFigureSpec; hintFigure: SourceQuestionFigureSpec; stepFigures: readonly SourceQuestionFigureSpec[] };
