import { questionIdentity, type HelpQuestion } from "../domain/questionHelpModel";
import type { SourceQuestionFigureSpec } from "./SourceQuestionFigure";

export const signedWorkQuestionId = "f026p-enerji-ve-hareket-1";
const signedWorkHintCopy = "Yer değiştirme sağa. Her kuvvet oku için yer değiştirme doğrultusuna düşen bileşeni bul. Önce yönü belirle, sonra bu bileşeni 5 m ile çarp.";

const originalWorkQuestion: HelpQuestion = {
  id: signedWorkQuestionId,
  prompt: "Cisim 5 m boyunca+x yönünde gidiyor. Seçili itiş kuvveti+10 N, direnç−4 N ve yer değiştirmeye dik normal 20 N; sabitler. Başka iş yapan kuvvet yok. İtişin işi, net iş ve kinetik enerji değişimi sırasıyla nedir?",
  options: ["+50 J;+70 J;+70 J", "+50 J;+30 J;−30 J", "+50 J;+30 J;+30 J", "+30 J;+30 J;+30 J", "+50 J;+130 J;+130 J"],
  answer: 2,
  hint: "İtiş işi 10·5=+50 J; direnç işi−4·5=−20 J; normal işi 0.",
  explanation: "İtiş işi 10·5=+50 J; direnç işi−4·5=−20 J; normal işi 0. Net iş 50−20=+30 J. Kinetik enerji değişimiΔK=+30 J’dir; tek itiş işi 50 J ile karıştırılmaz.",
};
const originalWorkIdentity = questionIdentity(originalWorkQuestion);

/** Live Study and newly built papers get the directional hint. Frozen papers keep their help. */
export function signedWorkPracticeView<T extends HelpQuestion>(question: T): T {
  if (
    question.id !== signedWorkQuestionId ||
    question.hint !== originalWorkQuestion.hint ||
    questionIdentity(question) !== originalWorkIdentity
  ) return question;
  return { ...question, hint: signedWorkHintCopy };
}

const displacement = 5;
const push = 10;
const resistance = 4;
const normal = 20;
const pushWork = push * displacement;
const resistanceWork = -resistance * displacement;
const net = pushWork + resistanceWork;
type Point = readonly [number, number];
const block: Point = [163, 197];
const arrowScale = 5;
const right: Point = [block[0] + arrowScale * push, block[1]];
const left: Point = [block[0] - arrowScale * resistance, block[1]];
const up: Point = [block[0], block[1] - arrowScale * normal];

const stem: SourceQuestionFigureSpec = {
  kind: "geometry",
  title: "Yer değiştirme ve verilen kuvvetler",
  alt: "Cisim sağa 5 m gidiyor. İtiş 10 N sağa, direnç 4 N sola, normal kuvveti 20 N yukarı. Normal kuvveti yer değiştirmeye dik.",
  caption: null,
  viewBox: [0, 0, 435, 339],
  segments: [
    { from: [75, 224], to: [354, 224] },
    { from: block, to: right, emphasis: true },
    { from: [right[0] - 9, right[1] - 8], to: right, emphasis: true },
    { from: [right[0] - 9, right[1] + 8], to: right, emphasis: true },
    { from: block, to: left, emphasis: true },
    { from: [left[0] + 8, left[1] - 7], to: left, emphasis: true },
    { from: [left[0] + 8, left[1] + 7], to: left, emphasis: true },
    { from: block, to: up, emphasis: true },
    { from: [up[0] - 8, up[1] + 9], to: up, emphasis: true },
    { from: [up[0] + 8, up[1] + 9], to: up, emphasis: true },
    { from: [105, 258], to: [329, 258], emphasis: true },
    { from: [319, 249], to: [329, 258], emphasis: true },
    { from: [319, 267], to: [329, 258], emphasis: true },
    { from: [175, 197], to: [175, 185] },
    { from: [175, 185], to: [163, 185] },
  ],
  points: [{ at: block, emphasis: true }],
  labels: [
    { at: [235, 181], text: "İtiş 10 N", anchor: "start" },
    { at: [128, 181], text: "Direnç 4 N", anchor: "end" },
    { at: [163, 69], text: "Normal 20 N" },
    { at: [217, 307], text: "Yer değiştirme 5 m" },
  ],
};

export const signedWorkFigures = {
  figure: stem,
  hintFigure: {
    kind: "table",
    title: "Kuvvet yönünü yer değiştirmeyle karşılaştır",
    alt: "Sağa yer değiştirmeye göre itiş aynı yönde, direnç ters yönde, normal dik yönde.",
    headers: ["Kuvvet", "Yer değiştirmeye göre yön"],
    rows: [["İtiş", "Aynı yön"], ["Direnç", "Ters yön"], ["Normal", "Dik"]],
  },
  stepFigures: [
    {
      kind: "table",
      title: "Her kuvvetin yaptığı iş",
      alt: `İtiş artı ${pushWork} joule, direnç eksi ${-resistanceWork} joule, dik normal sıfır joule.`,
      headers: ["Kuvvet", "Yatay bileşen", "5 m boyunca iş"],
      rows: [["İtiş", `+${push} N`, `+${pushWork} J`], ["Direnç", `−${resistance} N`, `−${-resistanceWork} J`], ["Normal", "0 N", "0 J"]],
    },
    {
      kind: "math",
      title: "İşaretli işleri topla",
      alt: `Net iş, artı ${pushWork} ile eksi ${-resistanceWork} ve sıfırın toplamı, artı ${net} joule.`,
      expression: { kind: "text", text: `Wₙₑₜ = (+${pushWork}) + (−${-resistanceWork}) + 0 = +${net} J` },
    },
    {
      kind: "math",
      title: "Net iş kinetik enerji artışıdır",
      alt: `Net iş artı ${net} joule olduğu için kinetik enerji ${net} joule artar.`,
      expression: { kind: "text", text: `ΔK = Wₙₑₜ = +${net} J` },
    },
  ],
} satisfies {
  figure: SourceQuestionFigureSpec;
  hintFigure: SourceQuestionFigureSpec;
  stepFigures: readonly SourceQuestionFigureSpec[];
};
