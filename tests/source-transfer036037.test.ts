import { createHash } from "node:crypto";
import { expect, it } from "vitest";
import baseline from "./fixtures/source-stage-034035-preservation.json";
import { lessons, lessonById } from "../src/domain/content";
import { lessonGuides } from "../src/learning/guides";
import { builtInCheatSheets } from "../src/learning/cheatsheetContent";
import { linearEquationsSource036Pack } from "../src/learning/linearEquationsSource036";
import { basicInequalitiesSource037Pack } from "../src/learning/basicInequalitiesSource037";
import { studyTopics, lessonTopic, setTopicCompletion, completionDates } from "../src/domain/studyPlan";
import { pastExamReferences, pastExamReferencesForTopic } from "../src/domain/pastExams";
import { examTeachingCases } from "../src/learning/pastExamCases";
import { initialState } from "../src/domain/model";
import { validateState } from "../src/domain/storage";
import { learningReviewPlan } from "../src/domain/learningReviews";
import { xp } from "../src/domain/scheduler";
import { questionContentIssues } from "../src/domain/questionContent";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
import { getLessonVideos031 } from "../src/learning/videoCatalog031";

const canonical = (value: unknown): unknown =>
  Array.isArray(value) ? value.map(canonical) : value && typeof value === "object"
    ? Object.fromEntries(Object.entries(value).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0).map(([key, item]) => [key, canonical(item)])) : value;
const hash = (value: unknown) => createHash("sha256").update(JSON.stringify(canonical(value))).digest("hex");
const packs = [
  { pack: linearEquationsSource036Pack, base: "birinci-dereceden-denklemler", sections: 27, examples: 26, recall: 18, questions: 42, sheet: 10 },
  { pack: basicInequalitiesSource037Pack, base: "basit-esitsizlikler", sections: 30, examples: 34, recall: 22, questions: 45, sheet: 12 },
] as const;

it("preserves all BBB lesson, question, guide, sheet values and complete study order before appending companions", () => {
  expect(baseline.source).toBe("bbb681d5970c9caa97d32323941a3a3c542d39f8");
  const maps = { lessons: new Map(lessons.map((v) => [v.id, v])), questions: new Map(lessons.flatMap((v) => v.questions).map((v) => [v.id, v])), guides: lessonGuides, sheets: builtInCheatSheets };
  for (const type of ["lessons", "questions", "guides", "sheets"] as const)
    for (const [id, expected] of Object.entries(baseline[type])) {
      expect(maps[type].has(id), `${type}:${id}`).toBe(true);
      expect(hash(maps[type].get(id)), `${type}:${id}`).toBe(expected);
    }
  expect(lessons.slice(0, 531).map((v) => v.id)).toEqual(Object.keys(baseline.lessons));
  expect(lessons.flatMap((v) => v.questions).slice(0, 6214).map((v) => v.id)).toEqual(Object.keys(baseline.questions));
  expect(studyTopics.slice(0, 496)).toEqual(baseline.studyTopics);
  expect(pastExamReferences.slice(0, 10)).toEqual(baseline.pastExamReferences);
  expect(Object.entries(examTeachingCases).slice(0, 10)).toEqual(Object.entries(baseline.examTeachingCases));
});

it("appends only two independent companions with87 self-contained fully guided cards", () => {
  expect(lessons).toHaveLength(539);
  expect(lessons.flatMap((v) => v.questions)).toHaveLength(6453);
  expect(new Set(lessons.flatMap((v) => v.questions).map((v) => v.id)).size).toBe(6453);
  expect(lessonGuides.size).toBe(504);
  expect(builtInCheatSheets.size).toBe(504);
  expect(studyTopics).toHaveLength(503);
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

it("keeps verified primary answers, TL units and own unscored examples distinct", () => {
  expect(pastExamReferences).toHaveLength(12);
  expect(Object.keys(examTeachingCases)).toHaveLength(12);
  const branching = pastExamReferencesForTopic("topic-tyt-mat-dogrusal-denklemler-kaynak-036");
  const inequality = pastExamReferencesForTopic("topic-tyt-mat-basit-esitsizlikler-kaynak-037");
  expect(branching).toHaveLength(1);
  expect(inequality).toHaveLength(1);
  expect(branching[0]).toMatchObject({ id: "2024-TYT-MAT-3", page: 24, answerPage: 43, answer: "A" });
  expect(branching[0].solution.join(" ")).toContain("3072");
  expect(branching[0].connection).toContain("241→81");
  expect(2 ** 10 + 2 ** 11).toBe(3072);
  expect(examTeachingCases[branching[0].id].answer).toBe("96 parça.");
  expect(2 ** 5 + 2 ** 6).toBe(96);
  expect(inequality[0]).toMatchObject({ id: "2024-TYT-MAT-8", page: 26, answerPage: 43, answer: "A" });
  expect(inequality[0].solution.join(" ")).toContain("10.000<b<30.000");
  expect(inequality[0].connection).toContain("u=b/1000");
  expect(examTeachingCases[inequality[0].id].answer).toContain("10.000<b<20.000 TL");
  for (const b of [10001, 15000, 19999]) {
    expect(2 * b + 20000).toBeGreaterThan(30000 + b);
    expect(3 * b - 10000).toBeLessThan(30000 + b);
  }
  expect(linearEquationsSource036Pack.source).toContain("atfı gerçek resmî kitapçıkla uyuşmadığından");
  expect(basicInequalitiesSource037Pack.source).toContain("u=b/1000");
});
