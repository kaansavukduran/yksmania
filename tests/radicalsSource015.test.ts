import { createHash } from "node:crypto";
import { expect, it } from "vitest";
import { lessonById } from "../src/domain/content";
import { draftSchema } from "../src/domain/model";
import { officialBooklets, pastExamReferencesForTopic } from "../src/domain/pastExams";
import { questionContentIssues } from "../src/domain/questionContent";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
import { draftQuestionCount } from "../src/domain/studyDraft";
import { lessonTopic } from "../src/domain/studyPlan";
import { builtInCheatSheets } from "../src/learning/cheatsheetContent";
import { lessonGuides } from "../src/learning/guides";
import { resolveGuideStep } from "../src/learning/guides/position";
import { examTeachingCases } from "../src/learning/pastExamCases";
import { sectionFigures } from "../src/learning/sectionFigures/registry";

const id = "koklu-sayilar";
const topic = "detail-208";
const fingerprint = (data: unknown) => createHash("sha256").update(JSON.stringify(data)).digest("hex");

it("appends the revised teaching and two method tables without modifying the earlier material", () => {
  const guide = lessonGuides.get(id)!;
  const lesson = lessonById(id)!;
  const sheet = builtInCheatSheets.get(topic)!;
  expect(lessonTopic[id]).toBe(topic);
  expect(sheet.lessonId).toBe(id);
  expect(guide.sections).toHaveLength(16);
  expect(guide.examples).toHaveLength(7);
  expect(guide.recall).toHaveLength(8);
  expect(guide.source).toContain("içerik 1.1");
  expect(fingerprint(guide.sections.slice(0, 10))).toBe("a723b11c0f4366de0d114653cff21f2d74c574dbb2fbc90723ea87d45d6d6278");
  expect(fingerprint(guide.examples.slice(0, 5))).toBe("e00438e997197295484bbb10620b9e21554456b11d07c9d43e228065ae149577");
  expect(fingerprint(guide.recall.slice(0, 5))).toBe("72be3b2bd3bde02c9d935f4903553ed7fbc0b4a2dd501328b2f983c0b6eb94f9");
  expect(fingerprint(lesson.questions.slice(0, 10))).toBe("122c416bab0c10fe9371a815a43da99ca22d19b4c0298cb7912cfa8fa7d2511e");
  expect(sheet.sections.flatMap(({ table }) => table ? [table.rows.length] : [])).toEqual([4, 4]);
});

it("keeps the earlier practice length and saved guide destinations", () => {
  const raw = {
    lessonId: id, phase: "practice", index: 9,
    responses: [], selected: null, checked: false, hint: false,
    confidence: "medium", note: "Kaydedilmiş not", startedAt: 1,
  };
  expect(draftQuestionCount(draftSchema.parse(raw), 19)).toBe(10);
  expect(draftQuestionCount(draftSchema.parse({ ...raw, questionCount: 19 }), 19)).toBe(19);
  for (const storedSections of [0, 10]) {
    expect(resolveGuideStep(id, 9, storedSections, 16)).toBe(9);
    expect(resolveGuideStep(id, 10, storedSections, 16)).toBe(16);
    expect(resolveGuideStep(id, 11, storedSections, 16)).toBe(17);
  }
  expect(resolveGuideStep(id, 10, 16, 16)).toBe(10);
});

it("checks each original variant and binds the separate official result to its physical pages", () => {
  const variants = lessonById(id)!.questions.slice(10);
  const expected = [
    ["benzer-kok", "2√3"],
    ["tek-koklu-payda", "(5√6)/6"],
    ["pozitif-siralama", "a>b"],
    ["koklu-denklem", "{5}"],
    ["alan-cevre", "48√2"],
    ["kenarin-gosterimi", "8 ve 17"],
    ["isareti-degisen-denklem", "x≥−1, {(−1+√41)/2}"],
    ["sahte-adayi-onar", "Yalnız 7 kalır. −4 için sağ taraf negatiftir."],
    ["sifir-eslenigi-onar", "Değeri 3/10’dur, çünkü kök 5 ve asıl payda 10’dur."],
  ];
  expect(variants.map((question) => [question.id, question.options[question.answer].tr]))
    .toEqual(expected.map(([key, value]) => [`${id}-015-${key}`, value]));
  for (const question of variants) {
    expect(questionContentIssues(question), question.id).toEqual([]);
    expect(new Set(question.options.map(({ tr }) => tr)).size).toBe(5);
    expect(questionGuidanceSchema.parse(question.guidance).optionReasons).toHaveLength(5);
  }
  const refs = pastExamReferencesForTopic(topic);
  expect(refs.map(({ id: referenceId }) => referenceId)).toEqual(["2026-KPSS-GY-33", "2023-TYT-MAT-4"]);
  const reference = refs.at(-1)!;
  expect(reference).toMatchObject({ question: 4, page: 24, answerPage: 42, answer: "D" });
  expect(officialBooklets.find((booklet) => booklet.id === reference.bookletId)).toMatchObject({
    pages: 42,
    sha256: "0dc9541d881211c8fa0b27524a061b37e61838c13d3f7bf4feceee549e45d1ff",
  });
  expect(examTeachingCases[reference.id].answer).toBe("Olası kodlar 18, 32, 78 ve 676’dır.");
});

it("draws all square divisor representations with exact readouts", () => {
  const figure = sectionFigures[id]["Sıralama, eşlenik, denklem ve alan"];
  for (const [step, area] of [252, 432, 720].entries()) {
    const expected = Array.from({ length: area }, (_, index) => index + 1)
      .map((b) => ({ a: Math.sqrt(area / b), b }))
      .filter(({ a, b }) => Number.isInteger(a) && a ** 2 * b === area)
      .sort((one, two) => one.a - two.a);
    expect(figure.draw(0, step).readout?.slice(1))
      .toEqual(expected.map(({ a, b }) => `A = ${a}, B = ${b} → ${a}² × ${b} = ${area}`));
  }
});
