import { expect, test } from "vitest";
import { lessons } from "../src/domain/content";
import { pulseOverlapAt, pulseOverlapTable } from "../src/learning/mebiPulseOverlap";
import { practiceQuestionView } from "../src/learning/practiceQuestionView";
import { sourceQuestionPresentation } from "../src/learning/sourceExercises024";
import { requiredSourceVisuals } from "../src/learning/sourceVisualRequirements";
import { springOverlapQuestion } from "../src/learning/springOverlapQuestion128";

test("all three source patterns add signed displacements and keep the two forms after crossing", () => {
  expect([0, 1, 2].map((example) => pulseOverlapAt(1.5, example).joinDisplacementCm)).toEqual([7, -3, 0]);
  expect(pulseOverlapTable.rows).toEqual([
    ["İki tepe", "+4 cm", "+3 cm", "+7 cm"],
    ["Tepe ve büyük çukur", "+4 cm", "−7 cm", "−3 cm"],
    ["Eşit tepe ve çukur", "+4 cm", "−4 cm", "0 cm"],
  ]);
  const simultaneous = pulseOverlapAt(1.5, 2);
  for (let x = 0; x <= 12; x += 0.25) expect(simultaneous.total(x)).toBe(0);
  const later = pulseOverlapAt(3, 2);
  expect([later.kCenter, later.lCenter, later.total(9), later.total(3), later.widthM]).toEqual([9, 3, 4, -4, 3]);
});

test("the thirteenth question binds required roles to the same revision and preserves old question IDs", () => {
  const { questions } = lessons.find(({ id }) => id === "yay-dalgalari")!;
  expect(questions.map(({ id }) => id)).toEqual([
    ...Array.from({ length: 10 }, (_, i) => `yay-dalgalari-q${i + 1}`),
    "yay-dalgalari-atma-uretme-suresi",
    "yay-dalgalari-esit-kutle-yogunluk-cizimi",
    springOverlapQuestion.id,
  ]);
  const q = questions[12];
  const view = practiceQuestionView({
    id: q.id, prompt: q.prompt.tr, options: q.options.map(({ tr }) => tr),
    answer: q.answer, hint: q.hint.tr, explanation: q.explanation.tr, guidance: q.guidance,
  });
  const result = sourceQuestionPresentation(view);
  expect(requiredSourceVisuals.get(q.id)).toEqual({ stem: true, hint: true, stepIndexes: [0, 1] });
  expect(result?.figure?.alt).toContain("sağa ilerliyor");
  expect(result?.hintFigure?.alt).not.toContain("0 santimetre");
  expect(result?.stepFigures?.map(({ kind }) => kind)).toEqual(["table", "geometry"]);
  expect(sourceQuestionPresentation({ ...view, answer: 0 })).toBeUndefined();
  expect(sourceQuestionPresentation({ ...view, hint: "Önceki ipucu" })?.hintFigure).toBeUndefined();
});
