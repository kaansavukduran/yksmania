import { expect, test } from "vitest";
import { lessons } from "../src/domain/content";
import { forge012PhysicsLessons } from "../src/learning/forge012Physics";
import { practiceQuestionView } from "../src/learning/practiceQuestionView";
import { sonarDistanceQuestion } from "../src/learning/sonarQuestion157";
import { soundLevelQuestion, soundLevelQuestionFigures } from "../src/learning/soundLevelQuestion148";
import { sourceQuestionPresentation } from "../src/learning/sourceExercises024";
import { requiredSourceVisuals } from "../src/learning/sourceVisualRequirements";
import { missingRequiredSourceVisuals } from "../src/learning/sourceVisualRevisions";

test("the added question preserves old snapshots and uses the scale as its only source of values", () => {
  const previous = forge012PhysicsLessons.find(({ id }) => id === "ses-deprem-dalgalari")!;
  const lesson = lessons.find(({ id }) => id === previous.id)!;
  expect(lesson.questions).toEqual([...previous.questions, soundLevelQuestion, sonarDistanceQuestion]);
  const { id, prompt, options, answer, hint, explanation, guidance } = lesson.questions[10]!;
  const question = practiceQuestionView({
    id, prompt: prompt.tr, options: options.map(({ tr }) => tr), answer,
    hint: hint.tr, explanation: explanation.tr, guidance,
  });
  const presentation = sourceQuestionPresentation(question);
  expect(presentation?.figure).toEqual(soundLevelQuestionFigures.figure);
  expect(missingRequiredSourceVisuals(requiredSourceVisuals.get(id), presentation)).toEqual([]);
  const { figure, hintFigure, stepFigures } = soundLevelQuestionFigures;
  const ticks = figure.labels.filter(({ text }) => /^\d+$/.test(text));
  expect(ticks.map(({ text }) => Number(text))).toEqual([30, 40, 50, 60, 70, 80, 90]);
  const gaps = ticks.slice(1).map(({ at }, i) => at[0] - ticks[i].at[0]);
  expect(gaps[0]).toBeGreaterThan(0);
  expect(new Set(gaps).size).toBe(1);
  const [x, y] = ["X", "Y"].map((name) => figure.labels.find(({ text }) => text === name)!.at[0]);
  expect(x).toBe(ticks[2].at[0]);
  expect(y).toBe(ticks[4].at[0]);
  const ratio = 10 ** ((Number(ticks[4].text) - Number(ticks[2].text)) / 10);
  expect(question.options[answer]).toBe(String(ratio));
  expect(figure.alt).not.toContain(String(ratio));
  expect(hintFigure.alt).not.toMatch(/20 dB|100/);
  expect(stepFigures[1]).toMatchObject({ headers: ["Adım", "Düzey aralığı", "Şiddet çarpanı"], rows: expect.arrayContaining([["Toplam", "50–70 dB", String(ratio)]]) });
  expect(sourceQuestionPresentation({ ...question, answer: 0 })).toBeUndefined();
  expect(sourceQuestionPresentation({ ...question, hint: "Yeni yardım." })?.stepFigures).toBeUndefined();
});
