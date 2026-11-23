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

const id = "kesir-problemleri";
const topic = "detail-211";
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

it("appends teaching and separately condensed summaries after the unchanged earlier guide", () => {
  const guide = lessonGuides.get(id)!;
  const lesson = lessonById(id)!;
  const sheet = builtInCheatSheets.get(topic)!;
  expect(lessonTopic[id]).toBe(topic);
  expect(sheet.lessonId).toBe(id);
  expect(guide.sections).toHaveLength(14);
  expect(guide.examples).toHaveLength(5);
  expect(guide.recall).toHaveLength(7);
  expect(guide.source).toContain("içerik 1.1");
  expect(sheet.sections).toHaveLength(14);
  expect(
    sheet.sections.flatMap(({ table }) => (table ? [table.rows.length] : [])),
  ).toEqual([4, 4]);
  const openingRule = guide.sections[8];
  expect(sheet.sections[8].title).toBe(openingRule.title);
  expect(sheet.sections[8].text[0]).toContain("r=1, R=0 iken x belirlenemez");
  expect(sheet.sections[8].text).not.toEqual(openingRule.paragraphs);
  expect(guide.examples.at(-1)?.answer).toBe(
    "Kalan çarpanları 5/7 ve 4/5, başlangıç 700 TL.",
  );
  expect(digest(guide.sections.slice(0, 8))).toBe(
    "82fb102ea42b6070c4a9cfc5ddab50ef8617f15446132ae14f779f300961eaae",
  );
  expect(digest(guide.examples.slice(0, 4))).toBe(
    "fc6d53d50e9cc77020240a56f2d0219893bfc1786bc2c838034fc834a1da0207",
  );
  expect(digest(guide.recall.slice(0, 4))).toBe(
    "0e1b1e5a71469e32a346587b7794c20ba4471c93d6879eabb46892aacbd983c4",
  );
  expect(digest(lesson.questions.slice(0, 10))).toBe(
    "d365a25a4654754dd0d85e3006113da90b810431b88180e06166d529e33586c3",
  );
  for (const q of lesson.questions.slice(0, 10)) {
    expect(previousHelpPanelCount(view(q)), q.id).toBe(1);
    expect(resolvedGuidance(view(q))?.optionReasons, q.id).toHaveLength(5);
    expect(helpPanels(view(q)).length, q.id).toBeGreaterThan(2);
  }
});

it("preserves older drafts and saved examples or recall positions", () => {
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
  expect(draftQuestionCount(oldDraft, 15)).toBe(10);
  expect(draftQuestionCount({ ...oldDraft, questionCount: 15 }, 15)).toBe(15);
  for (const previous of [0, 8]) {
    expect(resolveGuideStep(id, 7, previous, 14)).toBe(7);
    expect(resolveGuideStep(id, 8, previous, 14)).toBe(14);
    expect(resolveGuideStep(id, 9, previous, 14)).toBe(15);
  }
  expect(resolveGuideStep(id, 8, 14, 14)).toBe(8);
});

it("checks the five new variants and the sequential integer group boundary", () => {
  const questions = lessonById(id)!.questions;
  const additions = questions.slice(10);
  expect(questions).toHaveLength(15);
  expect(additions.map((q) => [q.id, q.options[q.answer].tr])).toEqual([
    [
      "kesir-problemleri-018-sifir-kalan-siniri",
      "Birincide her N≥0 uyumludur. İkincide veriler çelişir.",
    ],
    ["kesir-problemleri-018-ardisik-ekok-tam-adet", "24"],
    [
      "kesir-problemleri-018-bire-yakin-kesirler",
      "İkinci kutu daha dolu, çünkü 1/35<1/29.",
    ],
    ["kesir-problemleri-018-yeni-butun-sabit-pay", "7"],
    [
      "kesir-problemleri-018-kesirli-sonuc-birim",
      "Su için başlangıç 28/3 L olabilir. Kutu kaydı tam adet koşuluyla çelişir.",
    ],
  ]);
  expect(new Set(additions.map(({ answer }) => answer)).size).toBe(5);
  for (const q of additions) {
    expect(questionContentIssues(q), q.id).toEqual([]);
    expect(new Set(q.options.map(({ tr }) => tr)).size, q.id).toBe(5);
    expect(
      questionGuidanceSchema.parse(q.guidance).optionReasons,
      q.id,
    ).toHaveLength(5);
    expect(previousHelpPanelCount(view(q)), q.id).toBeUndefined();
    expect(resolvedGuidance(view(q)), q.id).toEqual(q.guidance);
  }
  const divisible = Array.from({ length: 24 }, (_, index) => index + 1).filter(
    (start) => start % 6 === 0 && (start - start / 6) % 4 === 0,
  );
  expect(divisible).toEqual([24]);
});

it("binds the corrected 2023 question location and exact answer to one verified booklet", () => {
  const refs = pastExamReferencesForTopic(topic);
  const reference = refs.find((ref) => ref.id === "2023-TYT-MAT-3")!;
  expect(reference).toMatchObject({
    question: 3,
    page: 23,
    answerPage: 42,
    answer: "D",
  });
  expect(
    officialBooklets.filter((booklet) => booklet.id === reference.bookletId),
  ).toHaveLength(1);
  const eightYears =
    (810000n * 11n ** 4n * 12n ** 4n) / (10n ** 4n * 11n ** 4n);
  expect(eightYears).toBe(1679616n);
  expect(eightYears).toBe(6n ** 8n);
  expect(examTeachingCases[reference.id].answer).toBe("324 birim sıvı kalır.");
});
