import type { SourceMathNode, SourceQuestionFigureSpec } from "./SourceQuestionFigure";

export const solidPressureQuestionId = "basinc-q2";
type Geometry = Extract<SourceQuestionFigureSpec, { kind: "geometry" }>;
type Segment = NonNullable<Geometry["segments"]>[number];
const mass = 10;
const gravity = 10;
const tension = 40;
const contactArea = 0.03;
const weight = mass * gravity;
const normal = weight - tension;
const pressure = normal / contactArea;

function arrow(x: number, from: number, to: number): Segment[] {
  const tail = to - 9 * Math.sign(to - from);
  return [
    { from: [x, from], to: [x, to], emphasis: true },
    { from: [x - 8, tail], to: [x, to], emphasis: true },
    { from: [x + 8, tail], to: [x, to], emphasis: true },
  ];
}

function diagram(
  title: string,
  alt: string,
  forces: "given" | "unknown" | "weight" | "balance",
): Geometry {
  const segments: Segment[] = [
    { from: [30, 222], to: [330, 222] },
    { from: [112, 121], to: [248, 121] },
    { from: [112, 121], to: [112, 222] },
    { from: [248, 121], to: [248, 222] },
    ...arrow(180, 121, 84),
  ];
  const labels: NonNullable<Geometry["labels"]>[number][] = [
    { at: [180, 68], text: `${tension} N` },
    { at: [180, 179], text: `${mass} kg` },
    { at: [180, 267], text: "0,03 m²" },
  ];
  if (forces !== "given") {
    segments.push(...arrow(56, 210, 160), ...arrow(307, 135, 200));
    labels.push({ at: [56, 139], text: forces === "balance" ? `${normal} N` : "N" });
    labels.push({ at: [307, 111], text: forces === "unknown" ? "G" : `${weight} N` });
  }
  return { kind: "geometry", title, alt, caption: null, viewBox: [-22, 0, 408, 305], segments, labels };
}

const mathText = (text: string): SourceMathNode => ({ kind: "text", text });

export const solidPressureQuestionFigures = {
  figure: diagram("İple desteklenen blok", "Yatay zeminde duran 10 kilogramlık bloğun temas alanı 0,03 metrekare. İp bloğu 40 newtonla yukarı çekiyor.", "given"),
  hintFigure: diagram("Kuvvetlerin yönünü belirle", "İp ve zemin tepkisi yukarı, ağırlık aşağı. Oklar yönleri gösterir, büyüklük ölçeği değildir.", "unknown"),
  stepFigures: [
    diagram("Ağırlığı kuvvet okuna yaz", "Bloğun ağırlığı aşağı 100 newton. İp yukarı 40 newton. Zemin tepkisi yukarı, henüz bilinmiyor.", "weight"),
    diagram("Zemin tepkisini dengeden bul", "Aşağı ağırlık 100 newton. Yukarı ipte 40 newton ve zeminde 60 newton. İki yukarı kuvvetin toplamı ağırlığa denk.", "balance"),
    {
      kind: "math",
      title: "Zemin kuvvetini alana böl",
      alt: `Basınç, ${normal} newton bölü 0,03 metrekare, ${pressure} paskal.`,
      expression: {
        kind: "row",
        items: [mathText("P ="), { kind: "fraction", numerator: mathText(`${normal} N`), denominator: mathText("0,03 m²") }, mathText(`= ${pressure} Pa`)],
      },
    },
  ],
} satisfies { figure: Geometry; hintFigure: Geometry; stepFigures: readonly SourceQuestionFigureSpec[] };
