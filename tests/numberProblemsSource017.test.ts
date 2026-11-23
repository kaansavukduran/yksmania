import { createHash } from "node:crypto";
import { expect, it } from "vitest";
import { lessonById } from "../src/domain/content";
import { draftSchema, type Question } from "../src/domain/model";
import {
  officialBooklets,
  pastExamReferencesForTopic,
} from "../src/domain/pastExams";
import { questionContentIssues } from "../src/domain/questionContent";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
import { draftQuestionCount } from "../src/domain/studyDraft";
import { lessonTopic } from "../src/domain/studyPlan";
import { builtInCheatSheets } from "../src/learning/cheatsheetContent";
import { lessonGuides } from "../src/learning/guides";
import { resolveGuideStep } from "../src/learning/guides/position";
import { examTeachingCases } from "../src/learning/pastExamCases";
import {
  helpPanels,
  previousHelpPanelCount,
  resolvedGuidance,
} from "../src/learning/questionHelp";
import { sectionFigures } from "../src/learning/sectionFigures/registry";

const id = "sayi-problemleri";
const topic = "detail-210";
const digest = (value: unknown) =>
  createHash("sha256").update(JSON.stringify(value)).digest("hex");
const view = (q: Question) => ({
  id: q.id,
  prompt: q.prompt.tr,
  passage: q.passage?.tr,
  options: q.options.map(({ tr }) => tr),
  answer: q.answer,
  explanation: q.explanation.tr,
  hint: q.hint.tr,
  guidance: q.guidance,
});

it("extends the guide and its sheet without changing the previous students' learning content", () => {
  const guide = lessonGuides.get(id)!;
  const lesson = lessonById(id)!;
  const sheet = builtInCheatSheets.get(topic)!;
  expect(lessonTopic[id]).toBe(topic);
  expect(sheet.lessonId).toBe(id);
  expect(guide.sections).toHaveLength(12);
  expect(guide.examples).toHaveLength(5);
  expect(guide.recall).toHaveLength(6);
  expect(guide.source).toContain("içerik 1.1");
  expect(
    sheet.sections.flatMap(({ table }) => (table ? [table.rows.length] : [])),
  ).toEqual([4, 6]);
  expect(
    sheet.sections.find(({ title }) => title === "Kapasiteyi tek birimle say")
      ?.text[0],
  ).toContain("24+11·3=18+13·3=57");
  expect(digest(guide.sections.slice(0, 8))).toBe(
    "972f3457b40b052cb18b683c9a29274212eea7826d86f188378f78f5605960e2",
  );
  expect(digest(guide.examples.slice(0, 4))).toBe(
    "8a596cf56996aaf20287400eec6776eef1e555511d9471dab4ba5002a6e1992a",
  );
  expect(digest(guide.recall.slice(0, 4))).toBe(
    "04310a8f15722fb610993090e0dcf631bacd7512e82a97a7c501f5192b87714d",
  );
  expect(digest(lesson.questions.slice(0, 10))).toBe(
    "88ac3eb7867919992956558766c2f81bcd47d9f0108e1f697dfd60e61f5b9cce",
  );
  for (const q of lesson.questions.slice(0, 10)) {
    expect(previousHelpPanelCount(view(q)), q.id).toBe(1);
    expect(resolvedGuidance(view(q))?.optionReasons, q.id).toHaveLength(5);
    expect(helpPanels(view(q)).length, q.id).toBeGreaterThan(2);
  }
});

it("preserves earlier drafts and saved activity destinations", () => {
  const oldDraft = draftSchema.parse({
    lessonId: id,
    phase: "practice",
    index: 9,
    responses: [],
    selected: 4,
    checked: false,
    hint: false,
    confidence: "medium",
    note: "Eski çalışma notu",
    startedAt: 1,
  });
  expect(draftQuestionCount(oldDraft, 14)).toBe(10);
  expect(draftQuestionCount({ ...oldDraft, questionCount: 14 }, 14)).toBe(14);
  for (const previous of [0, 8]) {
    expect(resolveGuideStep(id, 7, previous, 12)).toBe(7);
    expect(resolveGuideStep(id, 8, previous, 12)).toBe(12);
    expect(resolveGuideStep(id, 9, previous, 12)).toBe(13);
  }
  expect(resolveGuideStep(id, 8, 12, 12)).toBe(8);
});

it("checks all variants and distinguishes a contradictory count from the partially compatible 18", () => {
  const questions = lessonById(id)!.questions;
  const additions = questions.slice(10);
  expect(questions).toHaveLength(14);
  expect(additions.map((q) => [q.id, q.options[q.answer].tr])).toEqual([
    ["sayi-problemleri-017-kismi-ve-bos-sira", "16 sıra, 67 öğrenci"],
    ["sayi-problemleri-017-kalan-ve-baslangic", "110 ve 120"],
    ["sayi-problemleri-017-iki-sayimla-kullanilmayan", "35"],
    [
      "sayi-problemleri-017-celisen-kullanim-onar",
      "Veriler çelişir. 34 farklı kartın toplam kullanımı 57 olmalıdır.",
    ],
  ]);
  for (const q of additions) {
    expect(questionContentIssues(q), q.id).toEqual([]);
    expect(new Set(q.options.map(({ tr }) => tr)).size, q.id).toBe(5);
    expect(
      questionGuidanceSchema.parse(q.guidance).optionReasons,
      q.id,
    ).toHaveLength(5);
    expect(previousHelpPanelCount(view(q)), q.id).toBeUndefined();
  }
  const repair = lessonGuides.get(id)!.examples.at(-1)!;
  expect(repair.answer).toContain("Veriler çelişiyor");
  expect(repair.check).toContain(
    "50−32=18 yalnız farklı kart bilgisiyle uyumludur",
  );
  const allThirdGroups = Array.from({ length: 21 }, (_, count) => count);
  expect(
    allThirdGroups.some((c) => 10 + 20 + c === 32 && 10 + 40 + 3 * c === 55),
  ).toBe(false);
});

it("shows both exact 57-place arrangements and the verified past-exam reference", () => {
  const figure =
    sectionFigures[id]["Kapasite eşitliği birimlerin oranını buldurur"];
  expect(figure.steps).toEqual([
    "İki düzen",
    "Ortak kısmı çıkar",
    "b = 3a",
    "Otoparkta 57 yer",
  ]);
  expect(figure.draw(0, 3).readout?.[2]).toBe(
    "24+11·3=57 ve 18+13·3=57 otomobil yeri.",
  );
  const refs = pastExamReferencesForTopic(topic);
  const reference = refs.find((ref) => ref.id === "2026-TYT-MAT-18")!;
  expect(reference).toMatchObject({
    question: 18,
    page: 30,
    answerPage: 45,
    answer: "C",
  });
  expect(
    officialBooklets.filter((booklet) => booklet.id === reference.bookletId),
  ).toHaveLength(1);
  const model = { total: 54, once: 18, twice: 6, thrice: 13 };
  expect(model.once + model.twice + model.thrice).toBe(37);
  expect(model.once + 2 * model.twice + 3 * model.thrice).toBe(69);
  expect(model.total - (model.once + model.twice + model.thrice)).toBe(17);
  expect(examTeachingCases[reference.id].answer).toBe("36 kart hiç taranmadı.");
});
