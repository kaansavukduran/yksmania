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

const id = "faiz-problemleri";
const topic = "detail-215";
const officialId = "2013-ALES-ILKBAHAR-SAY1-20";
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
  expect(guide.sections).toHaveLength(14);
  expect(guide.examples).toHaveLength(6);
  expect(guide.recall).toHaveLength(7);
  expect(guide.source).toContain("içerik 1.2");
  expect(sheet.sections).toHaveLength(14);
  expect(
    sheet.sections.flatMap(({ table }) => (table ? [table.rows.length] : [])),
  ).toEqual([3, 2]);
  expect(sheet.sections[8].text[0]).toContain("ay/12");
  expect(sheet.sections[8].text).not.toEqual(guide.sections[8].paragraphs);
  expect(digest(guide.sections.slice(0, 8))).toBe(
    "92fb684e6ece0bad2327045e1b56ed39adeca9dd7379d1847f0d06be008f9fef",
  );
  expect(digest(guide.examples.slice(0, 4))).toBe(
    "0142633fd6e629fcffb1913658c5157d9828e2207a916cf13d2e6e6e58e023a3",
  );
  expect(digest(guide.recall.slice(0, 4))).toBe(
    "08121556026b51b7e5b0e032b14824e304e828d6cb3730d185f997659ebef756",
  );
  expect(digest(lesson.questions.slice(0, 10))).toBe(
    "d33cb9167b86ee9c895e2e2cced421ebc459f8392b20949639a1a7d268334dc0",
  );
  expect(
    digest(lesson.questions.slice(0, 10).map((q) => helpPanels(view(q)))),
  ).toBe("57e41e6b6ac38859cf4bcff02e42c6fe3cc09ae250d418a635b37cf4001dbbe2");
  for (const q of lesson.questions.slice(0, 10)) {
    expect(previousHelpPanelCount(view(q)), q.id).toBe(1);
    expect(resolvedGuidance(view(q))?.optionReasons, q.id).toHaveLength(5);
  }
  expect(guide.examples[4].prompt).toContain("8.960=P(1+…)");
  expect(guide.examples.slice(4).map(({ answer }) => answer)).toEqual([
    "İlk borç 8.000 TL.",
    "Son parça 4 ay kalmalı.",
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
    expect(resolveGuideStep(id, 7, savedCount, 14)).toBe(7);
    expect(resolveGuideStep(id, 8, savedCount, 14)).toBe(14);
    expect(resolveGuideStep(id, 9, savedCount, 14)).toBe(15);
  }
  expect(resolveGuideStep(id, 8, 14, 14)).toBe(8);
});

it("grades the six standalone cards and builds complete staged guidance", () => {
  const questions = lessonById(id)!.questions;
  expect(questions).toHaveLength(16);
  const additions = questions.slice(10);
  expect(additions.map((q) => [q.id, q.options[q.answer].tr])).toEqual([
    ["faiz-problemleri-022-iki-gun-kurali", "36,50 TL ve 36 TL"],
    ["faiz-problemleri-022-farkli-sure-iki-kol", "6.000 TL"],
    [
      "faiz-problemleri-022-esit-katsayi-iki-rapor",
      "İlki için her paylaşım, ikincisi için hiç yok.",
    ],
    ["faiz-problemleri-022-sifir-getiriyi-bolme", "3.000 TL"],
    ["faiz-problemleri-022-degisen-sure-karsilastirma", "3/2"],
    ["faiz-problemleri-022-donem-degisen-yeniden-yatirma", "180 TL"],
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

it("links the actual ALES section and key and an independent original teaching exercise", () => {
  const [ref] = pastExamReferencesForTopic(topic).filter(
    ({ id }) => id === officialId,
  );
  expect(ref).toMatchObject({
    question: 20,
    test: "Sayısal-1",
    page: 7,
    answerPage: 61,
    answer: "A",
  });
  expect(pastExamReferences.filter(({ id }) => id === officialId)).toEqual([
    ref,
  ]);
  const matches = officialBooklets.filter(({ id }) => id === ref.bookletId);
  expect(matches).toHaveLength(1);
  expect(matches[0]).toMatchObject({
    id: "2013-ales-ilkbahar",
    exam: "ALES",
    year: 2013,
    pages: 61,
    sha256: "66c63a1a915dbae8c9555b592bde213f2ac7619350f9b794c40c6cc565756a49",
  });
  expect(ref.solution.at(-1)).toContain("İlk oran %4");
  expect(examTeachingCases[officialId].answer).toBe(
    "Anapara 3.000 TL, düşük yıllık oran %5.",
  );
});
