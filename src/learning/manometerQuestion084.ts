import { waterPressureKPa } from "./mebiHydrostaticFilling";
import type { SourceMathNode, SourceQuestionFigureSpec } from "./SourceQuestionFigure";

export const manometerQuestionId = "basinc-q7";
type Geometry = Extract<SourceQuestionFigureSpec, { kind: "geometry" }>;
const differenceM = 0.2;
const atmosphericPa = 100000;
const headPa = waterPressureKPa(differenceM) * 1000;
const openSurface = 113;
const gasSurface = openSurface + differenceM * 260;

const tube = {
  kind: "geometry",
  title: "Açık uçlu su manometresi",
  alt: "Gaz kabı soldaki U borusuna bağlı. Gaz kolundaki su yüzeyi açık sağ koldan 0,2 metre alçak. Açık yüzeydeki hava basıncı 100000 paskal.",
  caption: null,
  viewBox: [0, -30, 500, 375],
  segments: [
    { from: [25, 75], to: [110, 75] }, { from: [25, 75], to: [25, 143] },
    { from: [25, 143], to: [110, 143] }, { from: [110, 75], to: [110, 94] },
    { from: [110, 143], to: [110, 115] }, { from: [110, 94], to: [188, 94] },
    { from: [110, 115], to: [163, 115] }, { from: [163, 115], to: [163, 237] },
    { from: [188, 94], to: [188, 212] }, { from: [188, 212], to: [278, 212] },
    { from: [163, 237], to: [303, 237] }, { from: [278, 212], to: [278, 78] },
    { from: [303, 237], to: [303, 78] },
    { from: [163, gasSurface], to: [188, gasSurface], emphasis: true },
    { from: [278, openSurface], to: [303, openSurface], emphasis: true },
    { from: [188, gasSurface], to: [329, gasSurface], dashed: true },
    { from: [303, openSurface], to: [329, openSurface], dashed: true },
    { from: [329, openSurface], to: [329, gasSurface] },
  ],
  labels: [
    { at: [66, 119], text: "Gaz" },
    { at: [245, 42], text: "P₀ = 100.000 Pa" },
    { at: [422, 153], text: "0,2 m" },
    { at: [236, 307], text: "Su" },
  ],
} satisfies Geometry;

const text = (value: string): SourceMathNode => ({ kind: "text", text: value });
const sameLevel: Geometry = {
  ...tube,
  title: "Açık yüzeyden aynı seviyeye in",
  alt: "Açık uçtaki su yüzeyinden başlayıp 0,2 metre aşağı in. Kesikli çizgi, gaz kolundaki su yüzeyiyle aynı seviyede.",
  segments: [
    ...tube.segments,
    { from: [290, openSurface], to: [290, gasSurface], emphasis: true },
    { from: [282, gasSurface - 12], to: [290, gasSurface], emphasis: true },
    { from: [298, gasSurface - 12], to: [290, gasSurface], emphasis: true },
  ],
};

export const manometerQuestionFigures = {
  figure: tube,
  hintFigure: sameLevel,
  stepFigures: [
    { ...sameLevel, title: "Suyun içinde düşey farkı bul" },
    {
      kind: "math",
      title: "Sütunun basınç farkını hesapla",
      alt: `Yoğunluk çarpı yerçekimi ivmesi çarpı 0,2 metre, ${headPa} paskal.`,
      expression: text(`ΔP = 1.000 · 10 · 0,2 = ${headPa} Pa`),
    },
    {
      kind: "math",
      title: "Açık hava ile sütun farkını topla",
      alt: `Gaz basıncı, ${atmosphericPa} artı ${headPa}, ${atmosphericPa + headPa} paskal.`,
      expression: text(`P(gaz) = ${atmosphericPa} + ${headPa} = ${atmosphericPa + headPa} Pa`),
    },
  ],
} satisfies { figure: Geometry; hintFigure: Geometry; stepFigures: readonly SourceQuestionFigureSpec[] };
