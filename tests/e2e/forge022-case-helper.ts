import { expect, type Locator } from "@playwright/test";
import type { Lesson } from "../../src/domain/model";
import type { LessonCase } from "./thirty-units.spec";
export type SourceLessonCase = LessonCase & {
  firstExplanation: string;
  questionCount: number;
  exam: "TYT" | "AYT";
};
export function forge022Case(
  lessons: Lesson[],
  id: string,
  exploration: string,
  interact: LessonCase["interact"],
  assertOutcome: LessonCase["assertOutcome"],
  model = "svg",
): SourceLessonCase {
  const lesson = lessons.find((l) => l.id === id)!;
  if (!lesson) throw Error("Missing case lesson " + id);
  return {
    id,
    exam: lesson.subjectId.startsWith("ayt-") ? "AYT" : "TYT",
    title: lesson.title.tr,
    questionCount: lesson.questions.length,
    firstQuestion: lesson.questions[0].prompt.tr,
    firstExplanation: lesson.questions[0].explanation.tr,
    exploration,
    lab: `[data-forge022="${id}"]`,
    result: "[data-model-result]",
    model,
    interact,
    assertOutcome,
  };
}
export async function setRange(lab: Locator, label: string, value: number) {
  const slider = lab.getByRole("slider", { name: label, exact: true });
  const min = Number(await slider.getAttribute("min")),
    max = Number(await slider.getAttribute("max")),
    step = Number((await slider.getAttribute("step")) || 1),
    current = Number(await slider.inputValue());
  const start = [
    { at: current, key: "" },
    { at: min, key: "Home" },
    { at: max, key: "End" },
  ].sort((a, b) => Math.abs(a.at - value) - Math.abs(b.at - value))[0];
  if (start.key) await slider.press(start.key);
  for (let i = 0; i < Math.round(Math.abs(value - start.at) / step); i++)
    await slider.press(value > start.at ? "ArrowRight" : "ArrowLeft");
  await expect(slider).toHaveValue(String(value));
}
