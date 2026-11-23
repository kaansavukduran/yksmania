import { expect, it } from "vitest";
import { groundingTransfer } from "../src/learning/groundingTransfer074";
import { examItemsByIds } from "../src/domain/exams";
import { groundingQuestionId } from "../src/learning/groundingQuestion074";
import { sourceQuestionPresentation } from "../src/learning/sourceExercises024";

it("conserves charge and derives the electron direction from either initial sign", () => {
  for (const initial of [-3, 3] as const) {
    expect(groundingTransfer(initial, false)).toEqual({ conductor: initial, earthChange: 0, direction: null });
    const connected = groundingTransfer(initial, true);
    expect(connected.conductor).toBe(0);
    expect(connected.earthChange).toBe(initial);
    expect(connected.conductor + connected.earthChange).toBe(initial);
    expect(connected.direction).toBe(initial < 0 ? "to-earth" : "to-conductor");
  }
});

it("binds the existing question and help to exact revisions without changing its answer", () => {
  const [question] = examItemsByIds([groundingQuestionId]);
  expect(question.options[question.answer]).toBe("Elektronlar küreden Dünya’ya gider");
  const current = sourceQuestionPresentation(question);
  expect(current?.figure?.title).toBe("Negatif küre ve toprak bağlantısı");
  expect(current?.stepFigures?.[2]?.title).toBe("Elektronların küreden Dünya’ya aktarılması");
  const oldHelp = sourceQuestionPresentation({ ...question, hint: "Eski ipucu" });
  expect(oldHelp?.figure).toBe(current?.figure);
  expect(oldHelp?.stepFigures).toBeUndefined();
  expect(sourceQuestionPresentation({ ...question, answer: 1 })).toBeUndefined();
});
