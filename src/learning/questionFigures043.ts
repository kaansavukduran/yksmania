import { identityHash, type HelpQuestion } from "../domain/questionHelpModel";
import type { Question } from "../domain/model";
import type { SourceQuestionFigureSpec } from "./SourceQuestionFigure";
import { forceAccelerationFigures, forceAccelerationQuestion } from "./forceAccelerationPractice";
import { forceVelocityFigureData, forceVelocityQuestion } from "./forceVelocityOptions048";
import { signedWorkFigures, signedWorkQuestionId } from "./signedWork055";
import { springWorkFigures, springWorkQuestionId } from "./springWork057";
import { translationQuestionFigures, translationQuestionId } from "./translationQuestion069";
import { groundingQuestionFigures, groundingQuestionId } from "./groundingQuestion074";
import { wireDiameterQuestionFigures, wireDiameterQuestionId } from "./wireResistance076Question";
import { ohmGraphQuestionFigures, ohmGraphQuestionId } from "./ohmGraphQuestion078";
import { solidPressureQuestionFigures, solidPressureQuestionId } from "./solidPressureQuestion079";
import { equalDepthQuestionFigures, equalDepthQuestionId } from "./hydrostaticQuestion080";
import { pistonQuestionFigures, pistonQuestionId } from "./pascalQuestion081";
import { bottomForceQuestionFigures, bottomForceQuestionId } from "./bottomForceQuestion082";
import { manometerQuestionFigures, manometerQuestionId } from "./manometerQuestion084";
import { barometerQuestionFigures, barometerQuestionId } from "./barometerQuestion086";
import {
  inverseTranslationFigures,
  inverseTranslationQuestion,
  ogmGridTranslationExamples,
  triangleTranslationFigures,
  triangleTranslationQuestion,
} from "./ogmTranslationPractice071";

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
  shortLabel?: string;
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

function ogmTranslationBinding(
  source: Question,
  page: number,
  itemLabel: string,
  figures: FigureBinding["figures"],
): readonly [string, FigureBinding] {
  const question = {
    id: source.id,
    prompt: source.prompt.tr,
    options: source.options.map((option) => option.tr),
    answer: source.answer,
    hint: source.hint.tr,
    explanation: source.explanation.tr,
    guidance: source.guidance,
  };
  if (!question.guidance) throw new Error(`Missing OGM solution for ${source.id}`);
  return [source.id, {
    stemRevision: stemRevision(question),
    helpRevision: helpRevision(question, question.guidance),
    shortLabel: "OGM Materyal · uyarlanmış örnek",
    title: "Öteleme Dönüşümü",
    pageLabel: `Fiziksel ${page}. sayfa`,
    itemLabel,
    figures,
  }];
}

const bindings = new Map<string, FigureBinding>([
  ogmTranslationBinding(inverseTranslationQuestion, 12, "Görüntünün grafiğinden başlangıç noktası", inverseTranslationFigures),
  ogmTranslationBinding(triangleTranslationQuestion, 13, "ABC üçgeninin üç köşesinin ötelenmesi", triangleTranslationFigures),
  ...ogmGridTranslationExamples.map(({ question, page, name, figures }) => ogmTranslationBinding(question, page, name, figures)),
  [bottomForceQuestionId, {
    stemRevision: "0516fd028cbe28",
    helpRevision: "0e743b10c35c90",
    title: "MEBİ TYT Fizik Konu Özetleri",
    pageLabel: "Fiziksel 138. sayfa, basılı 136",
    itemLabel: "Tabana dik kuvvet, özgün soru",
    figures: bottomForceQuestionFigures,
  }],
  [manometerQuestionId, {
    stemRevision: "019bb5131ffcd8",
    helpRevision: "02fed4f47140b9",
    title: "MEBİ TYT Fizik Konu Özetleri",
    pageLabel: "Fiziksel 142. sayfa, basılı 140",
    itemLabel: "Açık uçlu su manometresi, özgün soru",
    figures: manometerQuestionFigures,
  }],
  [barometerQuestionId, {
    stemRevision: "0c5601cee6731c",
    helpRevision: "10cdb4b4196308",
    title: "MEBİ TYT Fizik Konu Özetleri",
    pageLabel: "Fiziksel 139. sayfa, basılı 137",
    itemLabel: "Barometrede düşey yükseklik, özgün soru",
    figures: barometerQuestionFigures,
  }],
  [pistonQuestionId, {
    stemRevision: "122891ad73ac0c",
    helpRevision: "026adabb208057",
    title: "MEBİ TYT Fizik Konu Özetleri",
    pageLabel: "Fiziksel 136–137. sayfalar, basılı 134–135",
    itemLabel: "Su cenderesi, özgün soru",
    figures: pistonQuestionFigures,
  }],
  [equalDepthQuestionId, {
    stemRevision: "0115896f31ade7",
    helpRevision: "02990ecc0bf23c",
    title: "MEBİ TYT Fizik Konu Özetleri",
    pageLabel: "Fiziksel 135–136. sayfalar, basılı 133–134",
    itemLabel: "Aynı düşey derinlik, özgün soru",
    figures: equalDepthQuestionFigures,
  }],
  [solidPressureQuestionId, {
    stemRevision: "0e3fe1b74c953d",
    helpRevision: "11c406f4895ecb",
    title: "MEBİ TYT Fizik Konu Özetleri",
    pageLabel: "Fiziksel 132–134. sayfalar, basılı 130–132",
    itemLabel: "Dik yük ve temas alanı, özgün soru",
    figures: solidPressureQuestionFigures,
  }],
  [ohmGraphQuestionId, {
    stemRevision: "03e62ec70f5b19",
    helpRevision: "1852f6e609d14f",
    title: "MEBİ TYT Fizik Konu Özetleri",
    pageLabel: "Fiziksel 112. sayfa, basılı 110",
    itemLabel: "V–I eğimi, özgün ölçüm değerleri",
    figures: ohmGraphQuestionFigures,
  }],
  [wireDiameterQuestionId, {
    stemRevision: "0647144f869d04",
    helpRevision: "1d04a3863e2cfd",
    title: "MEBİ TYT Fizik Konu Özetleri",
    pageLabel: "Fiziksel 109. sayfa, basılı 107",
    itemLabel: "Telin kesit alanı ve çapı, özgün soru",
    figures: wireDiameterQuestionFigures,
  }],
  [groundingQuestionId, {
    stemRevision: "04f0132ea048cb",
    helpRevision: "095446dea4a790",
    title: "MEBİ TYT Fizik Konu Özetleri",
    pageLabel: "Fiziksel 99. sayfa, basılı 97",
    itemLabel: "Negatif iletken kürenin topraklanması, özgün soru",
    figures: groundingQuestionFigures,
  }],
  [translationQuestionId, {
    stemRevision: "1616a8a36ab750",
    helpRevision: "0742676b2f632f",
    title: "OGM Materyal ve Dönüşümler Kopya Kâğıdı",
    pageLabel: "OGM fiziksel 3 ve 6–10, Kopya Kâğıdı fiziksel 2 ve 4",
    itemLabel: "Öteleme yönü ve iki eksende yer değiştirme, özgün veriler",
    figures: translationQuestionFigures,
  }],
  [springWorkQuestionId, {
    stemRevision: "0769df545d6ceb",
    helpRevision: "1f4a779297adca",
    title: "MEBİ TYT Fizik Konu Özetleri",
    pageLabel: "Fiziksel 51. sayfa, basılı 49. sayfa",
    itemLabel: "Geri çağırıcı kuvvet ve yayda depolanan enerji, özgün veriler",
    figures: springWorkFigures,
  }],
  [signedWorkQuestionId, {
    stemRevision: "1db6e0681c8d4c",
    helpRevision: "103046e3ea5ea8",
    title: "MEBİ TYT Fizik Konu Özetleri",
    pageLabel: "Fiziksel 47. sayfa, basılı 45. sayfa",
    itemLabel: "Aynı, zıt ve dik yönlerde kuvvet işi, özgün veriler",
    figures: signedWorkFigures,
  }],
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
      shortLabel: binding.shortLabel ?? "Özgün öğretim soruları",
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
