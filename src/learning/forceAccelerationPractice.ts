import { txt, type Question } from "../domain/model";
import type { SourceQuestionFigureSpec } from "./SourceQuestionFigure";

// Özgün sayılar. MEBİ TYT Fizik Konu Özetleri, fiziksel s. 42
// (basılı s. 40), düşey Fnet ve yatay a ekseninin ilişkisini açıklar.
const readings = [
  { acceleration: 0, force: 0 },
  { acceleration: 2, force: 6 },
  { acceleration: 4, force: 12 },
] as const;
const [, p, q] = readings;
const forceDifference = q.force - p.force;
const accelerationDifference = q.acceleration - p.acceleration;
const mass = forceDifference / accelerationDifference;
const deltaForce = `${q.force} − ${p.force} = ${forceDifference} N`;
const deltaAcceleration = `${q.acceleration} − ${p.acceleration} = ${accelerationDifference} m/s²`;

export const forceAccelerationQuestion = {
  id: "newton-kuvvet-ivme-grafik",
  prompt: txt(
    "Grafik, sabit kütleli bir cismin aynı doğrultudaki net kuvvet ve ivme değerlerini gösteriyor. Cismin kütlesi kaç kilogramdır?",
  ),
  options: ["2 kg", "3 kg", "6 kg", "12 kg"].map(txt),
  answer: 1,
  hint: txt(
    "P ve Q noktaları arasında düşey ve yatay eksendeki değişimleri ayrı bul.",
  ),
  explanation: txt(
    `Düşey eksendeki net kuvvet farkı ${deltaForce}, yatay eksendeki ivme farkı ${deltaAcceleration}. Kütle, bu iki farkın oranıdır. ${forceDifference}/${accelerationDifference} = ${mass} kg.`,
  ),
  skill: "Kuvvet–ivme grafiğinden kütle",
  guidance: {
    knowledge: [
      "Net kuvvet, aynı cisme etki eden kuvvetlerin yönleriyle toplamıdır ve N ile ölçülür. İvme, hızın zamana göre değişimidir. Birimi m/s²’dir. Sabit pozitif kütlede net kuvvet kütle ile ivmenin çarpımıdır.",
    ],
    strategy:
      "Düşeyde net kuvveti, yatayda ivmeyi oku. İki nokta seçip düşey farkı yatay farka böl. Eğim bu eksen düzeninde kütleyi verir.",
    steps: [
      `P’den Q’ya düşeyde ${deltaForce} artış var. Yatayda ${deltaAcceleration} artış var.`,
      `m = ΔF / Δa = ${forceDifference} N / (${accelerationDifference} m/s²) = ${mass} kg. Bir newton, bir kilogram çarpı metre bölü saniye karedir. Bölünce kilogram kalır.`,
    ],
    optionReasons: [
      "2, yatay eksendeki ivme farkıdır. Birimi m/s² olduğundan tek başına kütle olamaz.",
      "3 kg doğrudur. Düşey farkı yatay farka böldüğünde bu değeri elde edersin.",
      "6, net kuvvet farkıdır ve N ile ölçülür. Kütle için bunu ivme farkına bölmelisin.",
      "12, Q noktasındaki net kuvvettir. Tek eksenden okunan N değerinden kütle bulunmaz.",
    ],
    commonError:
      "Çizginin kâğıttaki açısını ölçme. Eksenlerin ölçekleri farklı olabilir. Eğim için eksenlerden okuduğun farkları kullan.",
    check: `Q noktasında ${mass} kg × ${q.acceleration} m/s² = ${q.force} N. Grafikte de Q için ${q.force} N okunur.`,
  },
} satisfies Question;

type Graph = Extract<SourceQuestionFigureSpec, { kind: "geometry" }>;
const plot = (a: number, f: number) => [75 + a * 55, 204 - f * 10] as const;
const origin = plot(0, 0);
const atP = plot(p.acceleration, p.force);
const atQ = plot(q.acceleration, q.force);
const corner = plot(q.acceleration, p.force);
const axes: NonNullable<Graph["segments"]> = [
  { from: origin, to: [332, origin[1]] },
  { from: [325, origin[1] - 4], to: [332, origin[1]] },
  { from: [325, origin[1] + 4], to: [332, origin[1]] },
  { from: origin, to: [origin[0], 62] },
  { from: [origin[0] - 4, 69], to: [origin[0], 62] },
  { from: [origin[0] + 4, 69], to: [origin[0], 62] },
];

function forceGraph(showChanges: boolean): Graph {
  return {
    kind: "geometry",
    viewBox: [0, 0, 390, 265],
    title: showChanges
      ? "Kuvvet ve ivme farklarını oku"
      : "Net kuvvet–ivme grafiği",
    alt: showChanges
      ? `P’den Q’ya yatay fark ${accelerationDifference} m/s², düşey fark ${forceDifference} N. Yardımcı çizgiler bu iki farkı gösteriyor.`
      : `Yatay eksen ivme (m/s²), düşey eksen net kuvvet (N). Doğru orijinden geçiyor. P noktasında ${p.acceleration} m/s² ve ${p.force} N, Q noktasında ${q.acceleration} m/s² ve ${q.force} N okunuyor.`,
    caption: showChanges ? undefined : "İvme a (m/s²) · Net kuvvet F (N)",
    segments: [
      ...axes,
      ...readings.slice(1).flatMap(({ acceleration, force }) => {
        const [x, y] = plot(acceleration, force);
        return [
          {
            from: [x, origin[1] - 4] as const,
            to: [x, origin[1] + 4] as const,
          },
          {
            from: [origin[0] - 4, y] as const,
            to: [origin[0] + 4, y] as const,
          },
          { from: [origin[0], y] as const, to: [x, y] as const, dashed: true },
          { from: [x, origin[1]] as const, to: [x, y] as const, dashed: true },
        ];
      }),
      { from: origin, to: atQ, emphasis: true },
      ...(showChanges
        ? [
            { from: atP, to: corner },
            { from: corner, to: atQ },
          ]
        : []),
    ],
    points: [{ at: atP }, { at: atQ }],
    labels: [
      { at: [origin[0], 50], text: "F" },
      { at: [341, 247], text: "a" },
      { at: [60, 244], text: "0", anchor: "end" },
      ...readings.slice(1).flatMap(({ acceleration, force }) => {
        const [x, y] = plot(acceleration, force);
        return [
          {
            at: [x, 249] as const,
            text: String(acceleration),
            anchor: "middle" as const,
          },
          {
            at: [62, y + 10] as const,
            text: String(force),
            anchor: "end" as const,
          },
        ];
      }),
      { at: [atP[0] - 12, atP[1] - 7], text: "P", anchor: "end" },
      { at: [atQ[0] - 12, atQ[1] - 7], text: "Q", anchor: "end" },
      ...(showChanges
        ? [
            {
              at: [(atP[0] + corner[0]) / 2, atP[1] + 45] as const,
              text: "Δa",
              anchor: "middle" as const,
            },
            {
              at: [corner[0] + 11, (corner[1] + atQ[1]) / 2 + 20] as const,
              text: "ΔF",
              anchor: "start" as const,
            },
          ]
        : []),
    ],
  };
}

export const forceAccelerationFigures = {
  figure: forceGraph(false),
  hintFigure: {
    kind: "table",
    title: "P ve Q noktalarının eksen değerleri",
    alt: "Soru grafiğinde işaretli iki noktanın ivmesi ve net kuvveti.",
    headers: ["Nokta", "İvme (m/s²)", "Net kuvvet (N)"],
    rows: [
      ["P", String(p.acceleration), String(p.force)],
      ["Q", String(q.acceleration), String(q.force)],
    ],
  },
  stepFigures: [
    forceGraph(true),
    {
      kind: "math",
      title: "Grafiğin eğimi kütleyi verir",
      alt: `${forceDifference} newtonu saniye karede ${accelerationDifference} metreye böl. Sonuç ${mass} kilogram.`,
      expression: {
        kind: "row",
        items: [
          { kind: "text", text: "m =" },
          {
            kind: "fraction",
            numerator: { kind: "text", text: `${forceDifference} N` },
            denominator: {
              kind: "text",
              text: `${accelerationDifference} m/s²`,
            },
          },
          { kind: "text", text: `= ${mass} kg` },
        ],
      },
    },
  ],
} satisfies {
  figure: SourceQuestionFigureSpec;
  hintFigure: SourceQuestionFigureSpec;
  stepFigures: readonly SourceQuestionFigureSpec[];
};
