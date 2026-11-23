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

const id = "isci-problemleri";
const topic = "detail-217";
const officialId = "2011-YGS-MAT-22";
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
  ).toEqual([4, 3]);
  expect(sheet.sections[8].text[0]).toContain("ortak birim");
  expect(sheet.sections[8].text).not.toEqual(guide.sections[8].paragraphs);
  expect(digest(guide.sections.slice(0, 8))).toBe(
    "51f73f5b5583b4ea661eeb03ebca61865c551c408f4f936689dec74bbd12db30",
  );
  expect(digest(guide.examples.slice(0, 4))).toBe(
    "30c6823cf9feea1f44a800b9032d971002768e138980f6d95eec4477b8a32647",
  );
  expect(digest(guide.recall.slice(0, 4))).toBe(
    "937c3b7822272a8b27ae71f21561083fd4e77714501047957887d377dd1ffd46",
  );
  expect(digest(lesson.questions.slice(0, 10))).toBe(
    "6f098a7405dd1eae30e024bbefe27af97fe5a2c155e4cfa97ab4f2192d7c688c",
  );
  expect(
    digest(lesson.questions.slice(0, 10).map((q) => helpPanels(view(q)))),
  ).toBe("9e4f6d5cc57ac3195dc75ed6d75d096f5fd423cafef1770cb5df5eedf59269b9");
  for (const q of lesson.questions.slice(0, 10)) {
    expect(previousHelpPanelCount(view(q)), q.id).toBe(1);
    expect(resolvedGuidance(view(q))?.optionReasons, q.id).toHaveLength(5);
  }
  expect(guide.examples[4].prompt).toContain("4(1/15+1/30)=2/5");
  expect(guide.examples.slice(4).map(({ answer }) => answer)).toEqual([
    "A’nın ek süresi 9 saat.",
    "İlk kişinin hızı tek değer olarak belirlenemez.",
  ]);
  expect(JSON.stringify({ guide, lesson, sheet })).not.toMatch(
    /drive\.google\.com|1XIqfvG/,
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
    ["isci-problemleri-024-ortak-dosya-birimi", "4 saat"],
    ["isci-problemleri-024-iki-grubu-kisiye-indir", "8"],
    ["isci-problemleri-024-vardiyada-bitis-saati", "3. iş günü, 10.36"],
    ["isci-problemleri-024-birlikte-daha-yavas", "9 saat 36 dakika"],
    ["isci-problemleri-024-bitmis-urun-kapasitesi", "45"],
    ["isci-problemleri-024-ara-verip-ekip-olma", "12 saat ve 6 saat"],
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

it("links the 2011 YGS booklet and its separate exact official answer key", () => {
  const [ref] = pastExamReferencesForTopic(topic).filter(
    ({ id }) => id === officialId,
  );
  expect(ref).toMatchObject({
    question: 22,
    test: "Temel Matematik",
    page: 31,
    answerPage: 1,
    answer: "B",
    answerSource: {
      url: "https://dokuman.osym.gov.tr/web/eskidosyalar/210.pdf",
      pages: 1,
      sha256:
        "aa288f6ad5e2e4f5e4fff7bd26ddec15c791b916c77c48580370854f6e39671b",
    },
  });
  expect(pastExamReferences.filter(({ id }) => id === officialId)).toEqual([
    ref,
  ]);
  const matches = officialBooklets.filter(({ id }) => id === ref.bookletId);
  expect(matches).toHaveLength(1);
  expect(matches[0]).toMatchObject({
    id: "2011-ygs",
    exam: "YGS",
    year: 2011,
    pages: 50,
    url: "https://dokuman.osym.gov.tr/web/eskidosyalar/209.pdf",
    sha256: "cdd4489b4af354a3ed90ff69d4ceec17a86704e24ee35ed1056a23baa79c384e",
  });
  expect(ref.answerSource?.url).not.toBe(matches[0].url);
  expect(ref.solution.at(-1)).toContain("M9991.01001");
  expect(examTeachingCases[officialId].answer).toBe("Paket 18 saatte basılır.");
  expect(
    pastExamReferences
      .filter(({ bookletId }) => bookletId === "2013-ales-ilkbahar")
      .map(({ question, answer }) => [question, answer]),
  ).toEqual([
    [20, "A"],
    [18, "B"],
  ]);
});
