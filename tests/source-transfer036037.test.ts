import { beforeScientificQuestions } from "./helpers/before-scientific-revision";
import { beforeSource010Cases, beforeSource010References } from "./helpers/before-source010-reference";
import { beforeLaterSourceRevisions } from "./helpers/before-source004-revision";
import { createHash } from "node:crypto";
import { expect, it } from "vitest";
import baseline from "./fixtures/source-stage-034035-preservation.json";
import originalCardFlow from "./fixtures/source036037-question-flow.json";
import addedInequalityCards from "./fixtures/source011-current-question-flow.json";
import { lessons, lessonById } from "../src/domain/content";
import { lessonGuides } from "../src/learning/guides";
import { builtInCheatSheets } from "../src/learning/cheatsheetContent";
import { linearEquationsSource036Pack } from "../src/learning/linearEquationsSource036";
import { basicInequalitiesSource037Pack } from "../src/learning/basicInequalitiesSource037";
import { studyTopics, lessonTopic, setTopicCompletion, completionDates } from "../src/domain/studyPlan";
import { pastExamReferences, pastExamReferencesForTopic } from "../src/domain/pastExams";
import { examTeachingCases } from "../src/learning/pastExamCases";
import { draftSchema, initialState } from "../src/domain/model";
import { draftQuestionCount } from "../src/domain/studyDraft";
import { validateState } from "../src/domain/storage";
import { learningReviewPlan } from "../src/domain/learningReviews";
import { xp } from "../src/domain/scheduler";
import { questionContentIssues } from "../src/domain/questionContent";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
import { getLessonVideos031 } from "../src/learning/videoCatalog031";
import { resolveGuideStep } from "../src/learning/guides/position";

const canonical = (value: unknown): unknown =>
  Array.isArray(value) ? value.map(canonical) : value && typeof value === "object"
    ? Object.fromEntries(Object.entries(value).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0).map(([key, item]) => [key, canonical(item)])) : value;
const hash = (value: unknown) => createHash("sha256").update(JSON.stringify(canonical(value))).digest("hex");
const packs = [
  { pack: linearEquationsSource036Pack, base: "birinci-dereceden-denklemler", sections: 40, examples: 37, recall: 26, questions: 52, sheet: 15 },
  { pack: basicInequalitiesSource037Pack, base: "basit-esitsizlikler", sections: 40, examples: 44, recall: 30, questions: 55, sheet: 17 },
] as const;

it("preserves all BBB lesson, question, guide, sheet values and complete study order before appending companions", () => {
  expect(baseline.source).toBe("bbb681d5970c9caa97d32323941a3a3c542d39f8");
  const maps = { lessons: new Map(lessons.map((v) => [v.id, v])), questions: new Map(lessons.flatMap((v) => v.questions).map((v) => [v.id, v])), guides: lessonGuides, sheets: builtInCheatSheets };
  for (const type of ["lessons", "questions", "guides", "sheets"] as const)
    for (const [id, expected] of Object.entries(baseline[type])) {
      expect(maps[type].has(id), `${type}:${id}`).toBe(true);
      expect(hash(beforeLaterSourceRevisions(type, id, maps[type].get(id))), `${type}:${id}`).toBe(expected);
    }
  expect(lessons.slice(0, 531).map((v) => v.id)).toEqual(Object.keys(baseline.lessons));
  expect(beforeScientificQuestions(lessons.flatMap((lesson) => lesson.questions)).slice(0, 6214).map((v) => v.id)).toEqual(Object.keys(baseline.questions));
  expect(studyTopics.slice(0, 496)).toEqual(baseline.studyTopics);
  expect(pastExamReferences.slice(0, 10)).toEqual(baseline.pastExamReferences);
  expect(Object.entries(examTeachingCases).slice(0, 10)).toEqual(Object.entries(baseline.examTeachingCases));
});

it("keeps two independent companions with 107 self-contained fully guided cards", () => {
  expect(lessons).toHaveLength(546);
  expect(lessons.flatMap((v) => v.questions)).toHaveLength(6664);
  expect(new Set(lessons.flatMap((v) => v.questions).map((v) => v.id)).size).toBe(6664);
  expect(lessonGuides.size).toBe(510);
  expect(builtInCheatSheets.size).toBe(510);
  expect(studyTopics).toHaveLength(510);
  expect(studyTopics.slice(496, 500).map((v) => v.order)).toEqual([497, 498, 499, 500]);
  for (const expected of packs) {
    const lesson = lessonById(expected.pack.id)!;
    const guide = lessonGuides.get(expected.pack.id)!;
    const sheet = builtInCheatSheets.get(`topic-${expected.pack.id}`)!;
    expect(guide.sections).toHaveLength(expected.sections);
    expect(guide.examples).toHaveLength(expected.examples);
    expect(guide.recall).toHaveLength(expected.recall);
    expect(sheet.sections).toHaveLength(expected.sheet);
    expect(sheet.lessonId).toBe(expected.pack.id);
    expect(lesson.questions).toHaveLength(expected.questions);
    expect(lessonTopic[expected.pack.id]).toBe(`topic-${expected.pack.id}`);
    expect(lessonById(expected.base)).toBeDefined();
    expect(getLessonVideos031(expected.pack.id)).toEqual(getLessonVideos031(expected.base));
    for (const question of lesson.questions) {
      expect(questionContentIssues(question), question.id).toEqual([]);
      expect(question.options).toHaveLength(5);
      expect(new Set(question.options.map((v) => v.tr)).size).toBe(5);
      expect(questionGuidanceSchema.safeParse(question.guidance).success, question.id).toBe(true);
      expect(question.guidance?.optionReasons).toHaveLength(5);
      expect(question.answer).toBeGreaterThanOrEqual(0);
      expect(question.answer).toBeLessThan(5);
    }
  }
});

for (const { pack, base } of packs)
  it(`${pack.id}: independent manual study preserves old dates/settings/notes and day1→3/7/21 without XP`, () => {
    const old = initialState();
    old.settings.examDate = "2027-05-25";
    old.settings.blockedDates = ["2026-11-20"];
    old.notes[`lesson:${base}`] = "Eski konunun kendi notu korunur.";
    const oldTopic = lessonTopic[base];
    expect(oldTopic).toBeDefined();
    old.topicProgress[oldTopic] = { theory: "2026-10-19" };
    const saved = validateState(setTopicCompletion(old, `topic-${pack.id}`, "theory", true, "2026-11-17"));
    expect(saved.settings).toEqual(old.settings);
    expect(saved.notes).toEqual(old.notes);
    expect(saved.topicProgress[oldTopic]).toEqual(old.topicProgress[oldTopic]);
    expect(saved.sessions).toEqual([]);
    expect(xp(saved)).toBe(0);
    expect(completionDates(saved, "questions").size).toBe(0);
    expect(learningReviewPlan(saved, "2026-11-17").filter((v) => v.topicId === `topic-${pack.id}`).map((v) => [v.stage, v.targetDate])).toEqual([[3, "2026-11-19"], [7, "2026-11-23"], [21, "2026-12-07"]]);
    expect(old.topicProgress[`topic-${pack.id}`]).toBeUndefined();
  });

it("keeps the old linear reading, worked example and recall positions when systems are added", () => {
  const id = linearEquationsSource036Pack.id;
  expect(resolveGuideStep(id, 26, 27, 40)).toBe(26);
  expect(resolveGuideStep(id, 27, 27, 40)).toBe(40);
  expect(resolveGuideStep(id, 28, 27, 40)).toBe(41);
  expect(resolveGuideStep(id, 27, 0, 40)).toBe(40);
  expect(resolveGuideStep(id, 0, 0, 40)).toBe(0);
});

it("keeps verified primary answers, TL units and own unscored examples distinct", () => {
  expect(pastExamReferences).toHaveLength(41);
  expect(Object.keys(examTeachingCases)).toHaveLength(41);
  expect(hash(beforeSource010References(pastExamReferences))).toBe("17916955a5713fcd1c8bb8b9fba14616f4cb10773bc81960cb2a79c031f587ee");
  expect(hash(Object.fromEntries(beforeSource010Cases(examTeachingCases)))).toBe("c7348cbd185104271c16ba6f07a4831f39180b378bf363db45b7314dfc6bf9e6");
  const branching = pastExamReferencesForTopic("detail-206").find(({ id }) => id === "2024-TYT-MAT-3")!;
  const linear = pastExamReferencesForTopic("topic-tyt-mat-dogrusal-denklemler-kaynak-036");
  const inequality = pastExamReferencesForTopic("topic-tyt-mat-basit-esitsizlikler-kaynak-037");
  expect(linear).toHaveLength(1);
  expect(inequality).toHaveLength(1);
  expect(branching).toMatchObject({ id: "2024-TYT-MAT-3", page: 24, answerPage: 43, answer: "A" });
  expect(branching.solution.join(" ")).toContain("3072");
  expect(branching.connection).toContain("241→81");
  expect(2 ** 10 + 2 ** 11).toBe(3072);
  expect(examTeachingCases[branching.id].answer).toBe("96 parça.");
  expect(2 ** 5 + 2 ** 6).toBe(96);
  expect(linear[0]).toMatchObject({ id: "2024-TYT-MAT-17", page: 29, answerPage: 43, answer: "C" });
  expect(hash(linear[0])).toBe("bf4e2d465d1640e5fda09a7387f96c2f19600f5be9f162115b860f3b2c9dda79");
  expect(hash(examTeachingCases[linear[0].id])).toBe("61445b16b3a1cac3767d98efa480b4cb151d7e71424bfd5749b990751e280cd5");
  expect(Array.from({ length: 30 }, (_, day) => 40 + (day < 15 ? day : 28 - day)).reduce((total, minutes) => total + minutes, 0)).toBe(1395);
  expect(examTeachingCases[linear[0].id].answer).toBe("28 dakika.");
  expect(inequality[0]).toMatchObject({ id: "2024-TYT-MAT-8", page: 26, answerPage: 43, answer: "A" });
  expect(inequality[0].solution.join(" ")).toContain("10.000<b<30.000");
  expect(inequality[0].connection).toContain("u=b/1000");
  expect(examTeachingCases[inequality[0].id].answer).toContain("10.000<b<20.000 TL");
  for (const b of [10001, 15000, 19999]) {
    expect(2 * b + 20000).toBeGreaterThan(30000 + b);
    expect(3 * b - 10000).toBeLessThan(30000 + b);
  }
  expect(linearEquationsSource036Pack.source).toContain("C seçeneği 40 dakikadır.");
  expect(basicInequalitiesSource037Pack.source).toContain("u=b/1000");
});


it("keeps old inequality positions and shows the ten mixed-practice stems before worked answers", () => {
  const { id, items } = basicInequalitiesSource037Pack;
  const guide = lessonGuides.get(id)!;
  const readingSize = guide.sections.length;
  expect(resolveGuideStep(id, 29, 30, readingSize)).toBe(29);
  expect(resolveGuideStep(id, 30, 30, readingSize)).toBe(40);
  expect(resolveGuideStep(id, 31, 30, readingSize)).toBe(41);
  expect(resolveGuideStep(id, 30, 0, readingSize)).toBe(40);
  expect(resolveGuideStep(id, 31, 40, readingSize)).toBe(31);
  const codes = ["Q08", "Q09", "Q10", "Q11", "Q12", "Q13", "Q14", "Q19", "Q46", "Q47"];
  const practice = guide.sections.at(-1)!;
  expect(practice.title).toBe("Karışık prova");
  expect(practice.table?.headers).toEqual(["Sıra", "Soru"]);
  expect(practice.table?.rows).toEqual(codes.map((code, index) => [
    String(index + 1), items.find((item) => item.code === code)!.prompt,
  ]));

  const oldCards = originalCardFlow.units.find((unit) => unit.id === id)!.cards;
  expect(oldCards).toHaveLength(45);
  expect(addedInequalityCards).toHaveLength(10);
  expect(items.map(({ prompt, options }) => ({ prompt, options, correct: options[0] })))
    .toEqual([...oldCards, ...addedInequalityCards]);
  const questions = lessonById(id)!.questions;
  expect(questions.map((question) => question.id)).toEqual(
    Array.from({ length: 55 }, (_, index) => `f037-${id}-${index + 1}`),
  );
  expect(questions.map((question) => question.options[question.answer].tr))
    .toEqual([...oldCards, ...addedInequalityCards].map(({ correct }) => correct));
});

it("pins an older inequality practice draft to its 45 original questions", () => {
  const lessonId = basicInequalitiesSource037Pack.id;
  const restored = draftSchema.parse({
    lessonId,
    phase: "practice",
    index: 44,
    responses: [],
    selected: null,
    checked: false,
    hint: false,
    confidence: "medium",
    note: "Kayıtlı 45 soruluk çalışma",
    startedAt: 0,
  });
  expect(draftQuestionCount(restored, 55)).toBe(45);
  expect(draftQuestionCount({ ...restored, questionCount: 45 }, 55)).toBe(45);
  expect(draftQuestionCount({ ...restored, index: 0, questionCount: 55 }, 55)).toBe(55);
  expect(draftQuestionCount({ ...restored, index: 45 }, 55)).toBe(55);
});
