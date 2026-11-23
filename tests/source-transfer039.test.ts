import { beforeSource011QuestionAdditions } from "./helpers/before-source011-teaching";
import { beforeCurrentQuestionAdditions, beforeSource010Cases, beforeSource010References } from "./helpers/before-source010-reference";
import { beforeLaterSourceRevisions } from "./helpers/before-source004-revision";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
import baseline from "./fixtures/source-stage-036037-preservation.json";
import { lessons, lessonById } from "../src/domain/content";
import { lessonGuides } from "../src/learning/guides";
import { builtInCheatSheets } from "../src/learning/cheatsheetContent";
import { powersSource039Pack } from "../src/learning/powersSource039";
import { studyTopics, lessonTopic, setTopicCompletion, completionDates } from "../src/domain/studyPlan";
import { pastExamReferences } from "../src/domain/pastExams";
import { examTeachingCases } from "../src/learning/pastExamCases";
import { initialState } from "../src/domain/model";
import { validateState } from "../src/domain/storage";
import { learningReviewPlan } from "../src/domain/learningReviews";
import { xp } from "../src/domain/scheduler";
import { questionContentIssues } from "../src/domain/questionContent";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
import { getLessonVideos031 } from "../src/learning/videoCatalog031";

const id = "tyt-mat-uslu-sayilar-kaynak-039";
const topic = `topic-${id}`;
const canonical = (value: unknown): unknown => Array.isArray(value) ? value.map(canonical) : value && typeof value === "object" ? Object.fromEntries(Object.entries(value).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0).map(([key, item]) => [key, canonical(item)])) : value;
const hash = (value: unknown) => createHash("sha256").update(JSON.stringify(canonical(value))).digest("hex");

it("keeps every0.23 lesson/card/guide/sheet value and complete earlier order before039", () => {
  expect(baseline.source).toBe("2bbddcf6de7fb1d0dafd03bd6e8f94e88c4579d0");
  const maps = { lessons: new Map(lessons.map((value) => [value.id, value])), questions: new Map(lessons.flatMap((value) => value.questions).map((value) => [value.id, value])), guides: lessonGuides, sheets: builtInCheatSheets };
  for (const surface of ["lessons", "questions", "guides", "sheets"] as const)
    for (const [key, expected] of Object.entries(baseline[surface])) {
      expect(maps[surface].has(key), `${surface}:${key}`).toBe(true);
      expect(hash(beforeLaterSourceRevisions(surface, key, maps[surface].get(key))), `${surface}:${key}`).toBe(expected);
    }
  expect(lessons.slice(0, 533).map((value) => value.id)).toEqual(Object.keys(baseline.lessons));
  expect(beforeSource011QuestionAdditions(beforeCurrentQuestionAdditions(lessons.flatMap((lesson) => lesson.questions))).slice(0, 6301).map((value) => value.id)).toEqual(Object.keys(baseline.questions));
  expect([...lessonGuides.keys()].slice(0, 499)).toEqual(Object.keys(baseline.guides));
  expect([...builtInCheatSheets.keys()].slice(0, 499)).toEqual(Object.keys(baseline.sheets));
  expect(studyTopics.slice(0, 498)).toEqual(baseline.studyTopics);
  expect(studyTopics.slice(0, 479)).toEqual(baseline.studyTopics.slice(0, 479));
  expect(beforeSource010References(pastExamReferences).slice(0, 12)).toEqual(baseline.pastExamReferences);
  expect(beforeSource010Cases(examTeachingCases).slice(0, 12)).toEqual(Object.entries(baseline.examTeachingCases));
});

it("registers the complete separate039 lesson, guide, summary, topic and55 self-contained fully helped questions", () => {
  const lesson = lessonById(id)!;
  const guide = lessonGuides.get(id)!;
  const sheet = builtInCheatSheets.get(topic)!;
  expect(lessons[534].id).toBe(id);
  expect(guide.sections).toHaveLength(34);
  expect(guide.examples).toHaveLength(47);
  expect(guide.recall).toHaveLength(24);
  expect(sheet.sections).toHaveLength(14);
  expect(sheet.lessonId).toBe(id);
  expect(lesson.questions).toHaveLength(55);
  expect(new Set(lessons.flatMap((value) => value.questions).map((value) => value.id)).size).toBe(lessons.flatMap((value) => value.questions).length);
  expect(lessonTopic[id]).toBe(topic);
  expect(studyTopics[499]).toMatchObject({ id: topic, subjectId: "tyt-matematik", order: 500 });
  expect(lessonById("uslu-sayilar")).toBeDefined();
  expect(getLessonVideos031(id)).toEqual(getLessonVideos031("uslu-sayilar"));
  for (const [index, question] of lesson.questions.entries()) {
    const sourceItem = powersSource039Pack.items[index];
    expect(questionContentIssues(question), question.id).toEqual([]);
    expect(question.options).toHaveLength(5);
    expect(new Set(question.options.map((value) => value.tr)).size).toBe(5);
    expect(questionGuidanceSchema.safeParse(question.guidance).success, question.id).toBe(true);
    expect(question.guidance?.optionReasons).toHaveLength(5);
    expect(question.options[question.answer].tr).toBe(sourceItem.options[0]);
    for (const [optionIndex, option] of question.options.entries())
      expect(question.guidance?.optionReasons[optionIndex]).toBe(sourceItem.optionReasons[sourceItem.options.indexOf(option.tr)]);
  }
});

it("manual039 theory completion preserves old data and original day1→3/7/21 policy without questions orXP", () => {
  const old = initialState();
  old.settings.examDate = "2027-05-25";
  old.settings.blockedDates = ["2026-11-20"];
  old.settings.theme = "matrix";
  old.notes["lesson:uslu-sayilar"] = "Önceki konunun ÇĞİÖŞÜ notu değişmez.";
  const previousTopic = lessonTopic["uslu-sayilar"];
  old.topicProgress[previousTopic] = { theory: "2026-10-19" };
  const saved = validateState(setTopicCompletion(old, topic, "theory", true, "2026-11-17"));
  expect(saved.settings).toEqual(old.settings);
  expect(saved.notes).toEqual(old.notes);
  expect(saved.topicProgress[previousTopic]).toEqual(old.topicProgress[previousTopic]);
  expect(saved.sessions).toEqual(old.sessions);
  expect(saved.reviews).toEqual(old.reviews);
  expect(saved.draft).toEqual(old.draft);
  expect(saved.examDraft).toEqual(old.examDraft);
  expect(saved.unlocked).toEqual(old.unlocked);
  expect(xp(saved)).toBe(0);
  expect(completionDates(saved, "questions").size).toBe(0);
  expect(learningReviewPlan(saved, "2026-11-17").filter((value) => value.topicId === topic).map((value) => [value.stage, value.targetDate])).toEqual([[3, "2026-11-19"], [7, "2026-11-23"], [21, "2026-12-07"]]);
  expect(old.topicProgress[topic]).toBeUndefined();
});

it("preserves approved teaching with pinned C10 choice CSS, C7 state and C8 log corrections", () => {
  const stable = {
    "../src/learning/powersSource039.ts": "3498df592bba7e7d5d716bc7991fe6aaccc29a40d90e8e110e9d0574a06f897b",
    "../src/learning/PowersSource039Lab.css": "acc2f37950759ab95e0a40099cbbd91d406f517b59b4f06412aeb361f98b8079",
  };
  for (const [file, expected] of Object.entries(stable))
    expect(createHash("sha256").update(readFileSync(new URL(file, import.meta.url))).digest("hex"), file).toBe(expected);
  const lab = readFileSync(new URL("../src/learning/PowersSource039Lab.tsx", import.meta.url), "utf8");
  expect((lab.match(/usePower039State(?:<[^>]+>)?\(/g) ?? [])).toHaveLength(40);
  expect(lab).not.toMatch(/useState\(/);
  expect(lessons).toHaveLength(540);
  expect(lessons.flatMap((value) => value.questions)).toHaveLength(6492);
  expect(lessonGuides.size).toBe(505);
  expect(builtInCheatSheets.size).toBe(505);
  expect(studyTopics).toHaveLength(505);
});
