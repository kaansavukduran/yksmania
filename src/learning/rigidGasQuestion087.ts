import { rigidGasExperiments, rigidGasState } from "./mebiRigidGasReadings";
import type { SourceMathNode, SourceQuestionFigureSpec } from "./SourceQuestionFigure";

export const rigidGasQuestionId = "basinc-q6";
type Geometry = Extract<SourceQuestionFigureSpec, { kind: "geometry" }>;
type Segment = NonNullable<Geometry["segments"]>[number];
const firstTemperature = 300;
const finalTemperature = 450;
const firstPressure = 80;
const ratio = rigidGasState(rigidGasExperiments[0], finalTemperature / firstTemperature).pressureAtm;
const finalPressure = firstPressure * ratio;

const tanks = [104, 395].flatMap((center): Segment[] => [
  { from: [center - 65, 88], to: [center + 65, 88] },
  { from: [center + 65, 88], to: [center + 65, 204] },
  { from: [center + 65, 204], to: [center - 65, 204] },
  { from: [center - 65, 204], to: [center - 65, 88] },
]);
const dots = [104, 395].flatMap((center) =>
  [[-29, 122], [21, 129], [-13, 157], [31, 173], [-26, 181]].map(([dx, y]) => ({
    at: [center + dx, y] as const,
  })));

const temperatureChange: Geometry = {
  kind: "geometry",
  title: "Rijit kabın ilk ve son sıcaklığı",
  alt: "Rijit kap ve gaz miktarı aynı. İlk sıcaklık 300 kelvin, ilk basınç 80 kilopaskal. Son sıcaklık 450 kelvin, son basınç bilinmiyor.",
  caption: null,
  viewBox: [0, -34, 500, 348],
  segments: tanks,
  points: dots,
  labels: [
    { at: [104, 40], text: `${firstTemperature} K` },
    { at: [395, 40], text: `${finalTemperature} K` },
    { at: [250, 172], text: "V sabit" },
    { at: [104, 270], text: `${firstPressure} kPa` },
    { at: [395, 270], text: "P₂ = ?" },
  ],
};

const text = (value: string): SourceMathNode => ({ kind: "text", text: value });
const fraction = (numerator: string, denominator: string): SourceMathNode =>
  ({ kind: "fraction", numerator: text(numerator), denominator: text(denominator) });

export const rigidGasQuestionFigures = {
  figure: temperatureChange,
  hintFigure: {
    ...temperatureChange,
    title: "Sabit kalan kap ve gaz miktarını bul",
    alt: "Kap genişlemiyor ve gaz eklenmiyor. Sıcaklıkların ikisi de kelvin cinsinden.",
  },
  stepFigures: [
    {
      kind: "math",
      title: "Kelvin ve basınç oranlarını eşitle",
      alt: "İkinci basıncın ilk basınca oranı, ikinci kelvin sıcaklığının ilk kelvin sıcaklığına oranı.",
      expression: { kind: "row", items: [fraction("P₂", "P₁"), text("="), fraction("T₂", "T₁")] },
    },
    {
      kind: "math",
      title: "Sıcaklık oranını hesapla",
      alt: "450 kelvin bölü 300 kelvin, 1,5.",
      expression: { kind: "row", items: [fraction("450 K", "300 K"), text("= 1,5")] },
    },
    {
      kind: "math",
      title: "İlk basıncı oranla çarp",
      alt: `80 kilopaskal çarpı 1,5, ${finalPressure} kilopaskal.`,
      expression: text(`P₂ = 80 · 1,5 = ${finalPressure} kPa`),
    },
  ],
} satisfies { figure: Geometry; hintFigure: Geometry; stepFigures: readonly SourceQuestionFigureSpec[] };
