import { expect, it } from "vitest";
import { examItemsByIds } from "../src/domain/exams";
import { sourceQuestionPresentation } from "../src/learning/sourceExercises024";
import { translationQuestionId } from "../src/learning/translationQuestion069";
import { lessonGuides, studyGuide } from "../src/learning/guides";
import { builtInCheatSheets, studyCheatSheet } from "../src/learning/cheatsheetContent";

it("binds the translated point only to the exact question and help revisions", () => {
  const [question] = examItemsByIds([translationQuestionId]);
  expect(question.options).toEqual(["(−8; 10)", "(2; 10)", "(−8; −2)", "(5; −6)", "(2; −2)"]);
  expect(question.answer).toBe(4);
  const result = sourceQuestionPresentation(question);
  const stem = result?.figure;
  const solution = result?.stepFigures?.[2];
  if (stem?.kind !== "geometry" || solution?.kind !== "geometry") throw new Error("Expected two coordinate drawings");
  expect(stem.points).toHaveLength(1);
  expect(solution.points).toHaveLength(2);
  const [[startX, startY], [imageX, imageY]] = solution.points!.map(({ at }) => at);
  expect(imageX - startX).toBe(5 * 24);
  expect(imageY - startY).toBe(6 * 24);
  expect(JSON.stringify([stem, result?.hintFigure, result?.stepFigures?.slice(0, 2)])).not.toContain("P′(2; −2)");
  expect(result?.hintFigure).toMatchObject({ kind: "table", rows: [["x", "+5", "Sağa"], ["y", "−6", "Aşağı"]] });
  expect(solution.labels?.at(-1)?.text).toBe("P′(2; −2)");
  expect(sourceQuestionPresentation({ ...question, answer: 0 })).toBeUndefined();
  expect(sourceQuestionPresentation({ ...question, options: [...question.options].reverse() })).toBeUndefined();
  const legacy = sourceQuestionPresentation({ ...question, hint: "Önce yatay ekseni düşün." });
  expect(legacy?.figure).toBe(stem);
  expect(legacy?.hintFigure).toBeUndefined();
  expect(legacy?.stepFigures).toBeUndefined();
});

it("adds coordinate teaching figures to the reader while preserving the archived guide and sheet", () => {
  const lessonId = "donusum-oteleme-donme";
  const topicId = "detail-405";
  const components = "Öteleme vektörünün iki bileşenini oku";
  const triangle = "Şekli köşe köşe taşı, bağıntıyı geri denetle";
  const old = builtInCheatSheets.get(topicId)!;
  const current = studyCheatSheet(topicId)!;
  const before = lessonGuides.get(lessonId)!;
  const guide = studyGuide(lessonId)!;
  for (const title of [components, triangle]) {
    expect(current.sections.find((section) => section.title === title)?.figureTitle).toBe(title);
    expect(old.sections.find((section) => section.title === title)?.figureTitle).toBeUndefined();
  }
  expect(before.examples[0].steps[0].figureTitle).toBeUndefined();
  expect(guide.examples[0].steps[0].figureTitle).toBe(components);
  expect(current.examples[0].stepFigures).toEqual([components, undefined, undefined]);
  expect(current.examples[0].answer).toBe(old.examples[0].answer);
});
