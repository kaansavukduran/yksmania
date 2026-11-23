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
import { beforeScientificGuide } from "./helpers/before-scientific-revision";
import { examTeachingCases } from "../src/learning/pastExamCases";
import {
  helpPanels,
  previousHelpPanelCount,
  resolvedGuidance,
} from "../src/learning/questionHelp";

const id = "karisim-problemleri";
const topic = "detail-216";
const officialId = "2013-ALES-ILKBAHAR-SAY1-18";
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
  ).toEqual([3, 3, 3]);
  expect(sheet.sections[8].text[0]).toContain("Yalnız su kaybında");
  expect(sheet.sections[8].text).not.toEqual(guide.sections[8].paragraphs);
  expect(digest(beforeScientificGuide(guide).sections)).toBe(
    "699ab2fdc2099f53b182bc0cac793887bd8837e7e83629d5e5c22458dc8ce28e",
  );
  expect(digest(guide.examples.slice(0, 4))).toBe(
    "e4de8abd3ffb7abcee24b30d4555090932f4d8f095733a9f4524182cafdf609c",
  );
  expect(digest(guide.recall.slice(0, 4))).toBe(
    "790296a665c9321c290803894cfc204a95027e52c13bc96f462b59d5f68b7b2b",
  );
  expect(digest(lesson.questions.slice(0, 10))).toBe(
    "2c33284396be3556cf2a0cb458fb625c7cc8972a8168bc75182619895e44c430",
  );
  expect(
    digest(lesson.questions.slice(0, 10).map((q) => helpPanels(view(q)))),
  ).toBe("0f6d52b3de60f7fe5fd699802233cf295a19bd367bc4f8e24e100c61e05f6f31");
  for (const q of lesson.questions.slice(0, 10)) {
    expect(previousHelpPanelCount(view(q)), q.id).toBe(1);
    expect(resolvedGuidance(view(q))?.optionReasons, q.id).toHaveLength(5);
  }
  expect(guide.examples[4].prompt).toContain("İlk şeker = 150·…");
  expect(guide.examples.slice(4).map(({ answer }) => answer)).toEqual([
    "Son şeker yüzdesi %12.",
    "Ortalama bedel 58 TL/kg.",
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
    ["karisim-problemleri-023-hedeften-iki-kutle", "60 g ve 180 g"],
    [
      "karisim-problemleri-023-bilinmeyen-yuzde-sinir",
      "İlkinde %20, ikincisi mümkün değil.",
    ],
    ["karisim-problemleri-023-ayni-miktar-uc-islem", "%31,25, %25 ve %20"],
    ["karisim-problemleri-023-iki-kez-farkli-yerine-koy", "%47,5"],
    ["karisim-problemleri-023-toplam-bedelden-birim-fiyat", "50 TL/kg"],
    ["karisim-problemleri-023-su-hedefinde-saf-tuz", "36 g"],
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
    question: 18,
    test: "Sayısal-1",
    page: 7,
    answerPage: 61,
    answer: "B",
  });
  expect(pastExamReferences.filter(({ id }) => id === officialId)).toEqual([
    ref,
  ]);
  const earlier = pastExamReferencesForTopic("detail-215").find(
    ({ id }) => id === "2013-ALES-ILKBAHAR-SAY1-20",
  );
  expect(earlier).toMatchObject({
    bookletId: ref.bookletId,
    question: 20,
    page: 7,
    answerPage: 61,
    answer: "A",
  });
  const matches = officialBooklets.filter(({ id }) => id === ref.bookletId);
  expect(matches).toHaveLength(1);
  expect(matches[0]).toMatchObject({
    id: "2013-ales-ilkbahar",
    exam: "ALES",
    year: 2013,
    pages: 61,
    sha256: "66c63a1a915dbae8c9555b592bde213f2ac7619350f9b794c40c6cc565756a49",
  });
  expect(ref.solution.at(-1)).toContain("%20");
  expect(examTeachingCases[officialId].answer).toBe(
    "Saf şekerle %32, şeker içermeyen unla %12.",
  );
});
