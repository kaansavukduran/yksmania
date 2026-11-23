import { identityHash, type HelpQuestion } from "../domain/questionHelpModel";
import type { SourceQuestionFigureSpec } from "./SourceQuestionFigure";
import { forceAccelerationFigures, forceAccelerationQuestion } from "./forceAccelerationPractice";
import { forceVelocityFigureData, forceVelocityQuestion } from "./forceVelocityOptions048";

const crossingQuestionId = "tyt-geo-acilar-kaynak-pekitirme-032-source-001-no-parallel";
const givenAngle = 64;
const adjacentAngle = 180 - givenAngle;
const center = [120, 86] as const;
type MarkedAngle = {
  start: number;
  degrees: number;
  label?: string;
  anchor?: "start" | "middle" | "end";
  labelLower?: number;
};

function point(degrees: number, radius: number): readonly [number, number] {
  const radians = (degrees * Math.PI) / 180;
  return [center[0] + radius * Math.cos(radians), center[1] - radius * Math.sin(radians)];
}

function crossing(
  title: string,
  alt: string,
  marked: readonly MarkedAngle[],
): SourceQuestionFigureSpec {
  return {
    kind: "geometry",
    title,
    alt,
    caption: null,
    viewBox: [0, 0, 240, 172],
    segments: [
      { from: point(0, 100), to: point(180, 100) },
      { from: point(givenAngle, 80), to: point(180 + givenAngle, 80) },
    ],
    arcs: marked.map(({ start, degrees }) => ({ center, radius: 29, start, degrees })),
    labels: marked.flatMap(({ start, degrees, label, anchor, labelLower }) => {
      if (!label) return [];
      const [x, y] = point(start + degrees / 2, 57);
      return [{ at: [x, y + (labelLower ?? 0)], text: label, anchor }];
    }),
  };
}

const given: MarkedAngle = { start: 0, degrees: givenAngle, label: `${givenAngle}°`, anchor: "start" };
const adjacent: MarkedAngle = { start: givenAngle, degrees: adjacentAngle, anchor: "middle" };
const opposite: MarkedAngle = { start: 180, degrees: givenAngle, anchor: "end", labelLower: 12 };
const solvedAdjacent = { ...adjacent, label: `${adjacentAngle}°` };
const solvedOpposite = { ...opposite, label: `${180 - adjacentAngle}°` };

const crossingFigures = {
  figure: crossing(
    "Verilen kesişim",
    "İki doğru kesişiyor. Sağ yatay kol ile sağ üstteki eğik kol arasındaki açı 64°. Diğer kesişimin ölçüsü verilmemiş.",
    [given],
  ),
  hintFigure: crossing(
    "Ortak kolu bul",
    "64° bölgesi ile sol üstteki komşu bölge sağ üst eğik kolu paylaşır. Dış kollar aynı yatay doğru üzerindedir.",
    [given, adjacent],
  ),
  stepFigures: [
    crossing("Komşu açıyı hesapla", "Üstteki doğrusal çift 64° ve 116°.", [given, solvedAdjacent]),
    crossing("Sonraki doğrusal çifti bul", "116° bölgesi ile sol alttaki bölge sol yatay kolu paylaşır. Dış kollar eğik doğru üzerindedir.", [solvedAdjacent, opposite]),
    crossing("Ters açıyı hesapla", "Sağ üst ve sol alt ters bölgeler 64°. Sol üst komşu bölge 116°.", [given, solvedAdjacent, solvedOpposite]),
  ],
};

type Geometry = Extract<SourceQuestionFigureSpec, { kind: "geometry" }>;
type Segment = NonNullable<Geometry["segments"]>[number];

function horizontalArrow(start: number, end: number, y: number, emphasis = false): Segment[] {
  const head = end - Math.sign(end - start) * 7;
  return [
    { from: [start, y], to: [end, y], emphasis },
    { from: [head, y - 5], to: [end, y], emphasis },
    { from: [head, y + 5], to: [end, y], emphasis },
  ];
}

const mass = 2;
const rightForce = 10;
const leftForce = 4;
const net = rightForce - leftForce;
const acceleration = net / mass;
const appliedForces = [
  ...horizontalArrow(88, 88 - 8 * leftForce, 60),
  ...horizontalArrow(152, 152 + 8 * rightForce, 60),
];
const forceLabels: Geometry["labels"] = [
  { at: [53, 37], text: `${leftForce} N`, anchor: "middle" },
  { at: [190, 37], text: `${rightForce} N`, anchor: "middle" },
];

function forceDiagram(
  title: string,
  alt: string,
  arrows: readonly Segment[],
  labels: Geometry["labels"] = [],
): Geometry {
  return {
    kind: "geometry",
    title,
    alt,
    caption: null,
    viewBox: [0, -12, 258, 165],
    segments: [
      { from: [88, 41], to: [152, 41] },
      { from: [152, 41], to: [152, 82] },
      { from: [152, 82], to: [88, 82] },
      { from: [88, 82], to: [88, 41] },
      ...arrows,
    ],
    labels: [{ at: [120, 136], text: `${mass} kg`, anchor: "middle" }, ...labels],
  };
}

const forceFigures = {
  figure: forceDiagram("Cisme etki eden kuvvetler", `Kütle ${mass} kg. Aynı yatay doğrultuda ${leftForce} N sola, ${rightForce} N sağa uygulanıyor.`, appliedForces, forceLabels),
  hintFigure: forceDiagram("Sağı pozitif seç", `Sol kuvvet −${leftForce} N. Sağ kuvvet +${rightForce} N. İki kuvveti işaretleriyle topla.`, appliedForces, [
    { at: [53, 37], text: `−${leftForce} N`, anchor: "middle" },
    { at: [194, 37], text: `+${rightForce} N`, anchor: "middle" },
  ]),
  stepFigures: [
    forceDiagram("Bileşke kuvvet", `+${rightForce}−${leftForce}=+${net} N. Tek ok, bileşke kuvvetin sağa doğru olduğunu gösterir.`, horizontalArrow(152, 152 + 8 * net, 60, true), [
      { at: [192, 37], text: `+${net} N`, anchor: "middle" },
    ]),
    {
      kind: "math",
      title: "Bileşkeyi kütleye böl",
      alt: `Artı ${net} newtonu ${mass} kilograma böl. İvme saniye karede ${acceleration} metre ve sağa doğru.`,
      expression: { kind: "row", items: [
        { kind: "text", text: "a =" },
        { kind: "fraction", numerator: { kind: "text", text: `+${net} N` }, denominator: { kind: "text", text: `${mass} kg` } },
        { kind: "text", text: `= +${acceleration} m/s²` },
      ] },
    } satisfies SourceQuestionFigureSpec,
  ],
};

type FigureBinding = {
  stemRevision: string;
  helpRevision: string;
  title: string;
  pageLabel: string;
  itemLabel: string;
  figures: {
    figure?: SourceQuestionFigureSpec;
    optionFigures?: readonly SourceQuestionFigureSpec[];
    hintFigure: SourceQuestionFigureSpec;
    stepFigures: readonly SourceQuestionFigureSpec[];
  };
};

type QuestionForFigures = Omit<HelpQuestion, "options" | "explanation"> & {
  options: readonly string[];
  explanation?: string;
};

function stemRevision(question: QuestionForFigures) {
  return identityHash(JSON.stringify([
    question.id,
    question.passage ?? null,
    question.prompt,
    question.options,
    question.answer,
  ]));
}

function helpRevision(question: QuestionForFigures, g: NonNullable<QuestionForFigures["guidance"]>) {
  return identityHash(JSON.stringify([
    question.hint,
    question.explanation,
    g.knowledge,
    g.strategy,
    g.steps,
    g.optionReasons,
    g.commonError,
    g.check,
  ]));
}

const graphQuestion = {
  id: forceAccelerationQuestion.id,
  prompt: forceAccelerationQuestion.prompt.tr,
  options: forceAccelerationQuestion.options.map((option) => option.tr),
  answer: forceAccelerationQuestion.answer,
  hint: forceAccelerationQuestion.hint.tr,
  explanation: forceAccelerationQuestion.explanation.tr,
  guidance: forceAccelerationQuestion.guidance,
};
const velocityQuestion = {
  id: forceVelocityQuestion.id,
  prompt: forceVelocityQuestion.prompt.tr,
  options: forceVelocityQuestion.options.map((option) => option.tr),
  answer: forceVelocityQuestion.answer,
  hint: forceVelocityQuestion.hint.tr,
  explanation: forceVelocityQuestion.explanation.tr,
  guidance: forceVelocityQuestion.guidance,
};

const bindings = new Map<string, FigureBinding>([
  [crossingQuestionId, {
    stemRevision: "1da6511ade8341",
    helpRevision: "1ad2a3f75fda5a",
    title: "Geometrinin Dili ve Doğruda Açılar",
    pageLabel: "İçerik 5.1 · fiziksel 2 ve 4. sayfalar",
    itemLabel: "Ters ve komşu açı ilişkilerinin özgün uygulaması",
    figures: crossingFigures,
  }],
  ["n1", {
    stemRevision: "1091ad1048de51",
    helpRevision: "03d41b51841a37",
    title: "MEBİ TYT Fizik Konu Özetleri",
    pageLabel: "Fiziksel 39, 41 ve 42. sayfalar",
    itemLabel: "Bileşke kuvvet ve ikinci yasanın özgün uygulaması",
    figures: forceFigures,
  }],
  [graphQuestion.id, {
    stemRevision: stemRevision(graphQuestion),
    helpRevision: helpRevision(graphQuestion, graphQuestion.guidance),
    title: "MEBİ TYT Fizik Konu Özetleri",
    pageLabel: "Fiziksel 42. sayfa, basılı 40. sayfa",
    itemLabel: "Net kuvvet–ivme grafiğinden kütle okuma, özgün veriler",
    figures: forceAccelerationFigures,
  }],
  [velocityQuestion.id, {
    stemRevision: stemRevision(velocityQuestion),
    helpRevision: helpRevision(velocityQuestion, velocityQuestion.guidance),
    title: "MEBİ TYT Fizik Konu Özetleri",
    pageLabel: "Fiziksel 42. sayfa, basılı 40. sayfa",
    itemLabel: "Sabit kuvvet, ivme ve hız–zaman grafiklerinin özgün uygulaması",
    figures: forceVelocityFigureData,
  }],
]);

export function questionFigures043(question: QuestionForFigures) {
  const binding = bindings.get(question.id);
  if (!binding || stemRevision(question) !== binding.stemRevision) return undefined;
  const helpMatches = question.guidance && helpRevision(question, question.guidance) === binding.helpRevision;

  return {
    source: {
      shortLabel: "Özgün öğretim soruları",
      title: binding.title,
      pageLabel: binding.pageLabel,
      itemLabel: binding.itemLabel,
    },
    originalExerciseId: question.id,
    figure: binding.figures.figure,
    optionFigures: binding.figures.optionFigures,
    optionFigureRevision: binding.figures.optionFigures
      ? identityHash(JSON.stringify([binding.stemRevision, binding.figures.optionFigures]))
      : undefined,
    hintFigure: helpMatches ? binding.figures.hintFigure : undefined,
    stepFigures: helpMatches ? binding.figures.stepFigures : undefined,
  };
}
