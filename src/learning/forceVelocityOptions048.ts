import { txt, type Question } from "../domain/model";
import type { SourceQuestionFigureSpec } from "./SourceQuestionFigure";

type Figure = Extract<SourceQuestionFigureSpec, { kind: "geometry" }>;
type Point = readonly [number, number];
const mass = 2;
const force = 4;
const seconds = 3;
const acceleration = force / mass;
const finalVelocity = acceleration * seconds;
const optionLabels = ["Grafik I", "Grafik II", "Grafik III", "Grafik IV"] as const;
const readings = [[0, 3], [2, 2], [0, finalVelocity], [2, 2 + finalVelocity]] as const;

export const forceVelocityQuestion = {
  id: "newton-sabit-kuvvet-hiz-zaman-gorselli",
  prompt: txt(`Durgun ${mass} kg cisme ${seconds} saniye boyunca aynı yönde sabit ${force} N net kuvvet etki ediyor. Hangi hız–zaman grafiği bu hareketi gösterir?`),
  options: optionLabels.map(txt),
  answer: 2,
  hint: txt("Sabit net kuvvet, sabit ivme demektir. Hızın başlangıç değerini ve her saniyedeki değişimini ayrı düşün."),
  explanation: txt(`İvme ${force}/${mass} = ${acceleration} m/s². Cisim durgun olduğu için hız sıfırdan başlar ve ${seconds}. saniyede ${finalVelocity} m/s olur. Grafiğin doğrusu orijinden geçer.`),
  skill: "Hız–zaman grafiği seçme",
  guidance: {
    knowledge: ["Net kuvvet bölü kütle ivmeyi verir. İvme sabitse hız, her eşit sürede aynı miktarda değişir."],
    strategy: "İlk hızını ve eğimini bul. Doğrunun başlangıç değeri v₀, eğimi ivme olmalı.",
    steps: [
      `a = ${force} N / ${mass} kg = ${acceleration} m/s². Hız her saniyede ${acceleration} m/s artar.`,
      `Durgun başladığı için v₀ = 0. ${seconds}. saniyede v = ${acceleration} × ${seconds} = ${finalVelocity} m/s. Orijinden geçen ve bu değere ulaşan doğruyu seç.`,
    ],
    optionReasons: [
      "Grafik I sıfırdan başlar ama her saniyede yalnız 1 m/s artış gösterir. Hesaplanan ivme 2 m/s².",
      "Grafik II sabit hız gösterir. Düşeyde okunan 2, hızın değeridir. İvme grafiğin eğiminden okunur ve burada eğim sıfır.",
      "Grafik III doğrudur. Durgun başlangıç ve üç saniyedeki 6 m/s artış birlikte sağlanır.",
      "Grafik IV doğru eğime sahip, fakat 2 m/s başlangıç hızı gösteriyor. Cisim durgun başlıyor.",
    ],
    commonError: "İvmeyi hızın kendisi sanma. Hız–zaman grafiğinde ivme düşey eksen değeri değil, eğimdir.",
    check: `Ölçülen hız artışı ${finalVelocity} m/s. ${seconds} s’ye bölünce ${acceleration} m/s², kütleyle çarpılınca ${force} N elde edilir.`,
  },
} satisfies Question;

const plot = (t: number, value: number): Point => [70 + t * 75, 194 - value * 14];
const origin = plot(0, 0);
const axes = [
  { from: origin, to: [325, 194] as Point },
  { from: [318, 188] as Point, to: [325, 194] as Point },
  { from: [318, 200] as Point, to: [325, 194] as Point },
  { from: origin, to: [70, 61] as Point },
  { from: [64, 68] as Point, to: [70, 61] as Point },
  { from: [76, 68] as Point, to: [70, 61] as Point },
];

function timePlot(title: string, axis: string, label: string, unit: string, [start, end]: readonly [number, number]): Figure {
  const last = plot(seconds, end);
  const values = [...new Set([start, end])].filter((value) => value > 0);
  return {
    kind: "geometry",
    title,
    alt: `Yatay eksen zaman (saniye), düşey eksen ${label} (${unit}). Başlangıçta ${start}, ${seconds}. saniyede ${end}. İki nokta düz çizgiyle birleşir.`,
    caption: null,
    viewBox: [0, -18, 381, 323],
    segments: [
      ...axes,
      { from: plot(seconds, 0), to: last, dashed: true },
      { from: plot(0, end), to: last, dashed: true },
      { from: plot(0, start), to: last, emphasis: true },
    ],
    points: [{ at: last }],
    labels: [
      { at: [70, 42], text: `${axis} (${unit})`, anchor: "start" },
      { at: [325, 285], text: "t (s)", anchor: "end" },
      { at: [42, 230], text: "0" },
      { at: [last[0], 230], text: String(seconds) },
      ...values.map((value) => ({ at: [31, plot(0, value)[1] + 5] as Point, text: String(value) })),
    ],
  };
}

export const forceVelocityFigureData = {
  readings,
  optionFigures: readings.map((reading, i) => timePlot(optionLabels[i], "v", "hız", "m/s", reading)),
  hintFigure: timePlot("Sabit net kuvvet", "F", "net kuvvet", "N", [force, force]),
  stepFigures: [
    timePlot("Sabit ivme", "a", "ivme", "m/s²", [acceleration, acceleration]),
    timePlot("Başlangıçtan son hıza", "v", "hız", "m/s", readings[forceVelocityQuestion.answer]),
  ],
};
