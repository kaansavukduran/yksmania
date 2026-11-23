import { createHash } from "node:crypto";
import { expect, it } from "vitest";
import { lessonById } from "../src/domain/content";
import { draftSchema, type Question } from "../src/domain/model";
import {
  officialBooklets,
  pastExamReferences,
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

const id = "havuz-problemleri";
const topic = "detail-218";
const officialId = "2013-YGS-MAT-37";
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

it("adds a distinct quick sheet after the original guide and preserves question help", () => {
  const guide = lessonGuides.get(id)!;
  const lesson = lessonById(id)!;
  const sheet = builtInCheatSheets.get(topic)!;
  expect(lessonTopic[id]).toBe(topic);
  expect(sheet.lessonId).toBe(id);
  expect(guide.sections).toHaveLength(15);
  expect(guide.examples).toHaveLength(6);
  expect(guide.recall).toHaveLength(7);
  expect(guide.source).toContain("içerik 1.2");
  expect(sheet.sections).toHaveLength(15);
  expect(
    sheet.sections.flatMap(({ table }) => (table ? [table.rows.length] : [])),
  ).toEqual([3, 3]);
  expect(sheet.sections[8].text[0]).toContain("Nominal çıkışı su varken");
  expect(sheet.sections[8].text).not.toEqual(guide.sections[8].paragraphs);
  expect(digest(guide.sections.slice(0, 8))).toBe(
    "4b484f72aeb870b5303351719b47ebbba6bf31e0843bd5d27499e807bbe8007e",
  );
  expect(digest(guide.examples.slice(0, 4))).toBe(
    "2e432ab54ffb1480f77378370f0725e98ba98d3a80b5413510a1b9449f5eb012",
  );
  expect(digest(guide.recall.slice(0, 4))).toBe(
    "f12f2a604f1b37c0396280f30080bfa9a354c7b72f294639ef290be21bfd849b",
  );
  expect(digest(lesson.questions.slice(0, 10))).toBe(
    "d51cb054508ae13cfe4edc303f3ce7377a011dcdac3872277e8c98ac3efac817",
  );
  expect(
    digest(lesson.questions.slice(0, 10).map((q) => helpPanels(view(q)))),
  ).toBe("d4292a3479e863e4601b12d74e978114acea49f61ee4bc95f7dcbaa248aa7eda");
  for (const q of lesson.questions.slice(0, 10)) {
    expect(previousHelpPanelCount(view(q)), q.id).toBe(1);
    expect(resolvedGuidance(view(q))?.optionReasons, q.id).toHaveLength(5);
  }

  expect(guide.examples.slice(4).map(({ answer }) => answer)).toEqual([
    "Tank 30 dakikada dolar.",
    "Ölçüm sırasında kaçak 10 L/dk.",
  ]);
  expect(JSON.stringify({ guide, lesson, sheet })).not.toMatch(
    /drive\.google\.com|1Gh-Ati/,
  );
});

it("retains the previous practice length and worked and recall positions", () => {
  const saved = draftSchema.parse({
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
  expect(draftQuestionCount(saved, 16)).toBe(10);
  expect(draftQuestionCount({ ...saved, questionCount: 10 }, 16)).toBe(10);
  expect(draftQuestionCount({ ...saved, questionCount: 16 }, 16)).toBe(16);
  for (const savedCount of [0, 8]) {
    expect(resolveGuideStep(id, 7, savedCount, 15)).toBe(7);
    expect(resolveGuideStep(id, 8, savedCount, 15)).toBe(15);
    expect(resolveGuideStep(id, 9, savedCount, 15)).toBe(16);
  }
  expect(resolveGuideStep(id, 8, 15, 15)).toBe(8);
});

it("grades the six standalone cards and builds complete staged guidance", () => {
  const questions = lessonById(id)!.questions;
  expect(questions).toHaveLength(16);
  const additions = questions.slice(10);
  expect(additions.map((q) => [q.id, q.options[q.answer].tr])).toEqual([
    ["havuz-problemleri-025-bosalma-sonrasi-gercek-cikis", "0 L ve 294 L"],
    ["havuz-problemleri-025-yan-kacak-sinirinda-dur", "42 dk ve 180 L"],
    ["havuz-problemleri-025-gecikmeli-giris-eszamanli-kapanis", "26 dk"],
    ["havuz-problemleri-025-iki-kesitli-kapta-yukseklik", "0,7 m"],
    ["havuz-problemleri-025-iki-grafik-ayni-baslangic", "14. dk ve 34. dk"],
    ["havuz-problemleri-025-tasmanin-sonraki-evreye-etkisi", "290 L ve 80 L"],
  ]);
  expect(new Set(additions.map(({ answer }) => answer)).size).toBe(5);
  for (const q of additions) {
    expect(questionContentIssues(q), q.id).toEqual([]);
    expect(new Set(q.options.map(({ tr }) => tr)).size, q.id).toBe(5);
    expect(
      questionGuidanceSchema.parse(q.guidance).optionReasons,
      q.id,
    ).toHaveLength(5);
    expect(resolvedGuidance(view(q)), q.id).toEqual(q.guidance);
    expect(previousHelpPanelCount(view(q)), q.id).toBeUndefined();
  }
});

it("links the exact same-booklet 2013 YGS question and key without changing other exam records", () => {
  const [ref] = pastExamReferencesForTopic(topic).filter(
    ({ id }) => id === officialId,
  );
  expect(ref).toMatchObject({
    bookletId: "2013-ygs",
    test: "Temel Matematik",
    question: 37,
    page: 39,
    answerPage: 56,
    answer: "C",
  });
  expect(ref.answerSource).toBeUndefined();
  expect(pastExamReferences.filter(({ id }) => id === officialId)).toEqual([
    ref,
  ]);
  const matches = officialBooklets.filter(({ id }) => id === ref.bookletId);
  expect(matches).toHaveLength(1);
  expect(matches[0]).toMatchObject({
    id: "2013-ygs",
    exam: "YGS",
    year: 2013,
    pages: 56,
    url: "https://dokuman.osym.gov.tr/pdfdokuman/2013/OSYS/24.03.2013%20YGS.pdf",
    sha256: "0619f79c6b6d35e7e28839c48e2057e39d9335b4134e3d3a299140a07e868b48",
  });
  expect(ref.solution.at(-1)).toContain("t=4 dakikada iki seviye 3,6 m’dir");
  expect(examTeachingCases[officialId].answer).toBe(
    "Dar tankın girişi açıldıktan 5 saat sonra, 3 m’de eşitlenir.",
  );
  expect(
    pastExamReferences.find(({ id }) => id === "2011-YGS-MAT-22")?.answerSource
      ?.url,
  ).toBe("https://dokuman.osym.gov.tr/web/eskidosyalar/210.pdf");
  expect(
    pastExamReferences
      .filter(({ bookletId }) => bookletId === "2013-ales-ilkbahar")
      .map(({ question, answer }) => [question, answer]),
  ).toEqual([
    [20, "A"],
    [18, "B"],
  ]);
});
