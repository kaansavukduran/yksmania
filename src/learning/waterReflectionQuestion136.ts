import { txt, type Question } from "../domain/model";
import type { SourceQuestionFigureSpec } from "./SourceQuestionFigure";
import { waterReflectionAt } from "./mebiWaterReflection";

const givenAngle = 35;
const model = waterReflectionAt(givenAngle);
const surfaceAngle = 90 - model.angleDegrees;
const interval = model.crestSpacingCm;

export const waterReflectionQuestion = {
  id: "su-dalgalari-duz-engel-cephe-acisi",
  prompt: txt("Su dalgaları sabit derinlikteki leğende şekildeki düz engele yansıyor. Yansıyan ilerleme oku engelle kaç derece yapar? Ardışık iki yansıyan tepenin arası kaçtır?"),
  options: [
    `${givenAngle}° ve ${interval} cm`,
    `${surfaceAngle}° ve ${interval / 2} cm`,
    `${surfaceAngle}° ve ${interval} cm`,
    `${givenAngle}° ve ${2 * interval} cm`,
    `90° ve ${interval} cm`,
  ].map(txt),
  answer: 2,
  hint: txt("Şekilde hangi doğrunun dalga cephesi olduğunu bul. İlerleme oku cephesini dik keser. Dalganın yansıma sonrasında hangi derinlikte kaldığını düşün."),
  explanation: txt(`Dalga cephesi engelle ${givenAngle}° yaptığı için yansıyan hız oku engelle ${surfaceAngle}° yapar. Derinlik ve kaynak aynı kaldığından ${interval} cm tepe aralığı korunur.`),
  guidance: {
    knowledge: [
      "Dalga cephesi aynı evredeki noktaların çizgisidir. İlerleme oku cepheye diktir.",
      "Yansıma açıları engelin normalinden ölçülür. Aynı derinlik ve kaynakta dalga boyu değişmez.",
    ],
    strategy: "Çizimdeki açı önce cephe ile engel arasındadır. Hız okunun açı referansını belirle. Sonra yansıyan tepe aralığını ortam bilgisiyle kontrol et.",
    steps: [
      `Cephe ile engel ${givenAngle}° yapar. İlerleme oku cepheye, yüzey normali engele diktir. İki doğru da 90° dönünce açı değişmez. Gelme açısı normalden ${givenAngle}° olur, yansıma açısı da normalden ${givenAngle}° olur. Yansıyan ilerleme oku engelle 90° − ${givenAngle}° = ${surfaceAngle}° yapar.`,
      `Verilen ${interval} cm ardışık iki tepe arasındaki dik uzaklıktır. Yansıma aynı su derinliğinde gerçekleşir ve kaynak frekansı aynı kalır. v = λf olduğundan yansıyan tepeler arasındaki dalga boyu da ${interval} cm olur.`,
    ],
    optionReasons: [
      `${givenAngle}° yansıyan ilerleme okunun normalle yaptığı açıdır. Soruda engelle yaptığı açı isteniyor.`,
      `${interval / 2} cm, tepe ile onu izleyen çukur aralığı olur. Verilen ve istenen uzaklık tepe ile tepe arasında.`,
      `Normalden ${givenAngle}°, engelden ${surfaceAngle}°. Aynı derinlik ve kaynakla tepe aralığı ${interval} cm kalır.`,
      `Açı engelden ölçülmelidir. Yansıma, sabit koşullarda dalga boyunu iki katına çıkarmaz.`,
      "İlerleme oku tepe cephesine dik. Engel ile ilerleme oku ancak normal doğrultusunda gelişte 90° yapar.",
    ],
    commonError: "Normalden ölçülen yansıma açısını engelden ölçülmüş gibi kullanma.",
    check: `Yansıyan ok ile normal ve engel arasında ölçülen açılar ${givenAngle}° + ${surfaceAngle}° = 90° eder.`,
  },
  skill: "Şekilden yüzey, normal, yansıma açısı ve tepe aralığını ayırt etme",
} satisfies Question;

type Geometry = Extract<SourceQuestionFigureSpec, { kind: "geometry" }>;
type Point = readonly [number, number];
const origin: Point = [280, 173];
const pixelsPerCm = 22;
const display = ([x, y]: Point): Point => [origin[0] + x * pixelsPerCm, origin[1] - y * pixelsPerCm];
const wall = { from: [25, origin[1]], to: [515, origin[1]], emphasis: true } as const;
const normal = { from: origin, to: [origin[0], 20], dashed: true } as const;

function arrow(direction: Point, incoming: boolean) {
  const sign = incoming ? -1 : 1;
  const far = display([4.7 * sign * direction[0], 4.7 * sign * direction[1]]);
  const start = incoming ? far : origin;
  const end = incoming ? origin : far;
  const [dx, dy] = [direction[0], -direction[1]];
  return [
    { from: start, to: end, emphasis: true },
    { from: end, to: [end[0] - 9 * dx + 5 * dy, end[1] - 9 * dy - 5 * dx] as Point, emphasis: true },
    { from: end, to: [end[0] - 9 * dx - 5 * dy, end[1] - 9 * dy + 5 * dx] as Point, emphasis: true },
  ];
}

function reflectionSnapshot(incoming: boolean): Required<Pick<Geometry, "viewBox" | "segments" | "arcs" | "labels">> {
  const fronts = incoming ? model.incomingCrests : model.outgoingCrests;
  const direction = incoming ? model.incident : model.reflected;
  const first = display(fronts[fronts.length - 1].center);
  const second = display(fronts[fronts.length - 2].center);
  const measurementOffset = incoming ? -46 : 64;
  const move = ([x, y]: Point): Point => [x + measurementOffset, y];
  return {
    viewBox: [0, -123, 600, 426],
    arcs: incoming
      ? [{ center: [74, 166], radius: 40, start: 0, degrees: givenAngle }]
      : [
          { center: origin, radius: 58, start: 0, degrees: surfaceAngle },
          { center: origin, radius: 89, start: surfaceAngle, degrees: givenAngle },
        ],
    segments: [
      wall, normal,
      ...fronts.map(({ from, to }) => ({ from: display(from), to: display(to) })),
      ...arrow(direction, incoming),
      { from: first, to: move(first), dashed: true },
      { from: second, to: move(second), dashed: true },
      { from: move(first), to: move(second), emphasis: true },
      ...(incoming ? [
        { from: [74, 166] as Point, to: [170, 166] as Point },
        { from: [74, 166] as Point, to: [74 + 96 * Math.cos(givenAngle * Math.PI / 180), 166 - 96 * Math.sin(givenAngle * Math.PI / 180)] as Point },
      ] : []),
    ],
    labels: [
      { at: [origin[0] + 8, 12], text: "Normal" },
      { at: [465, 253], text: "Düz engel", anchor: "middle" },
      { at: [290, -59], text: incoming ? "Gelen tepeler" : "Yansıyan tepeler", anchor: "middle" },
      { at: [incoming ? 24 : 570, 67], text: `${interval} cm`, anchor: incoming ? "start" : "end" },
      ...(incoming ? [{ at: [24, 126] as Point, text: `${givenAngle}°`, anchor: "start" as const }] : [
        { at: [399, 157] as Point, text: `${surfaceAngle}°` },
        { at: [349, 66] as Point, text: `${givenAngle}°` },
      ]),
    ],
  };
}

export const waterReflectionQuestionFigures = {
  figure: {
    kind: "geometry",
    title: "Gelen dalga cephesi ve düz engel",
    alt: `Yatay engel ve ona dik kesikli normal. Soldan engelle buluşan ilerleme oku ve üç dalga tepesi. Küçük açı gösteriminde dalga cephesi düz engelle ${givenAngle} derece, ardışık gelen tepe aralığı ${interval} santimetre.`,
    ...reflectionSnapshot(true),
  },
  hintFigure: {
    kind: "table",
    title: "Hangi açı hangi doğruya göre ölçülür?",
    alt: "Gelme veya yansıma açısının referansı normaldir. İlerleme doğrultusu dalga cephesine diktir.",
    headers: ["Aranan ilişki", "Bakılacak doğru"],
    rows: [["Gelme veya yansıma açısı", "Engelin normali"], ["İlerleme oku", "Dalga cephesine dik"], ["Dalga boyu", "Ardışık iki tepenin arası"]],
  },
  stepFigures: [
    {
      kind: "geometry",
      title: "Yansıyan ilerleme okunun açısı",
      alt: `Yansıyan ilerleme oku normali ${givenAngle} derece, engeli ${surfaceAngle} dereceyle kesiyor. İki açı dik açıyı tamamlıyor.`,
      caption: `Normalden ${givenAngle}°, engelden ${surfaceAngle}° ölçülür.`,
      ...reflectionSnapshot(false),
    },
    {
      kind: "table",
      title: "Yansıma öncesi ve sonrası tepe aralığı",
      alt: "Kaynak ve derinlik değişmediği için gelen ve yansıyan tepeler ikişer santimetre aralıklıdır.",
      headers: ["Gelen tepeler", "Yansıyan tepeler", "Neden?"],
      rows: [[`${interval} cm`, `${interval} cm`, "Aynı sürat ve kaynak frekansı"]],
    },
  ] as const,
} satisfies { figure: SourceQuestionFigureSpec; hintFigure: SourceQuestionFigureSpec; stepFigures: readonly SourceQuestionFigureSpec[] };
