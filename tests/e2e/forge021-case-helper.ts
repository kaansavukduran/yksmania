// The page shows typeset text (display repairs and spacing); expectations use the same view.
import { typeset } from "../../src/domain/typeset";
import type { Lesson } from "../../src/domain/model";
import type { LessonCase } from "./thirty-units.spec";
export { setRange } from "./helpers/keyboardRange";
export type SourceLessonCase = LessonCase & {
  firstExplanation: string;
  questionCount: number;
  exam: "TYT" | "AYT";
};
export function forge021Case(
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
    firstQuestion: typeset(lesson.questions[0].prompt.tr),
    firstExplanation: typeset(lesson.questions[0].explanation.tr),
    exploration,
    lab: `[data-forge021="${id}"]`,
    result: "[data-model-result]",
    model,
    interact,
    assertOutcome,
  };
}
