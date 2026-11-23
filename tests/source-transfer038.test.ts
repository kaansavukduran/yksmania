import { beforeScientificQuestions, beforeScientificRevision } from "./helpers/before-scientific-revision";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
import baseline from "./fixtures/source-stage-036037-preservation.json";
import { lessons, lessonById } from "../src/domain/content";
import { lessonGuides } from "../src/learning/guides";
import { builtInCheatSheets } from "../src/learning/cheatsheetContent";
import { absoluteValueSource038Pack } from "../src/learning/absoluteValueSource038";
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

const id = "tyt-mat-mutlak-deger-kaynak-038";
const topic = `topic-${id}`;
const canonical = (value: unknown): unknown => Array.isArray(value) ? value.map(canonical) : value && typeof value === "object" ? Object.fromEntries(Object.entries(value).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0).map(([key, item]) => [key, canonical(item)])) : value;
const hash = (value: unknown) => createHash("sha256").update(JSON.stringify(canonical(value))).digest("hex");

it("keeps every0.23 lesson/card/guide/sheet value and complete earlier order before038", () => {
  expect(baseline.source).toBe("2bbddcf6de7fb1d0dafd03bd6e8f94e88c4579d0");
  const maps = { lessons: new Map(lessons.map((value) => [value.id, value])), questions: new Map(lessons.flatMap((value) => value.questions).map((value) => [value.id, value])), guides: lessonGuides, sheets: builtInCheatSheets };
  for (const surface of ["lessons", "questions", "guides", "sheets"] as const)
    for (const [key, expected] of Object.entries(baseline[surface])) {
      expect(maps[surface].has(key), `${surface}:${key}`).toBe(true);
      expect(hash(beforeScientificRevision(surface, key, maps[surface].get(key))), `${surface}:${key}`).toBe(expected);
    }
  expect(lessons.slice(0, 533).map((value) => value.id)).toEqual(Object.keys(baseline.lessons));
  expect(beforeScientificQuestions(lessons.flatMap((lesson) => lesson.questions)).slice(0, 6301).map((value) => value.id)).toEqual(Object.keys(baseline.questions));
  expect([...lessonGuides.keys()].slice(0, 499)).toEqual(Object.keys(baseline.guides));
  expect([...builtInCheatSheets.keys()].slice(0, 499)).toEqual(Object.keys(baseline.sheets));
  expect(studyTopics.slice(0, 498)).toEqual(baseline.studyTopics);
  expect(studyTopics.slice(0, 479)).toEqual(baseline.studyTopics.slice(0, 479));
  expect(pastExamReferences.slice(0, 12)).toEqual(baseline.pastExamReferences);
  expect(Object.entries(examTeachingCases).slice(0, 12)).toEqual(Object.entries(baseline.examTeachingCases));
});

it("registers the complete separate038 lesson, guide, summary, topic and55 self-contained fully helped questions", () => {
  const lesson = lessonById(id)!;
  const guide = lessonGuides.get(id)!;
  const sheet = builtInCheatSheets.get(topic)!;
  expect(lessons[533].id).toBe(id);
  expect(guide.sections).toHaveLength(34);
  expect(guide.examples).toHaveLength(38);
  expect(guide.recall).toHaveLength(24);
  expect(sheet.sections).toHaveLength(14);
  expect(sheet.lessonId).toBe(id);
  expect(lesson.questions).toHaveLength(55);
  expect(new Set(lessons.flatMap((value) => value.questions).map((value) => value.id)).size).toBe(lessons.flatMap((value) => value.questions).length);
  expect(lessonTopic[id]).toBe(topic);
  expect(studyTopics[498]).toMatchObject({ id: topic, subjectId: "tyt-matematik", order: 499 });
  expect(lessonById("mutlak-deger")).toBeDefined();
  expect(getLessonVideos031(id)).toEqual(getLessonVideos031("mutlak-deger"));
  for (const [index, question] of lesson.questions.entries()) {
    const sourceItem = absoluteValueSource038Pack.items[index];
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

it("manual038 theory completion preserves old data and original day1→3/7/21 policy without questions orXP", () => {
  const old = initialState();
  old.settings.examDate = "2027-05-25";
  old.settings.blockedDates = ["2026-11-20"];
  old.settings.theme = "matrix";
  old.notes["lesson:mutlak-deger"] = "Önceki konunun ÇĞİÖŞÜ notu değişmez.";
  const previousTopic = lessonTopic["mutlak-deger"];
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

it("keeps approved teaching and model exact; separately pins C10 visible relation control and appended CSS", () => {
  const files = {
    "../src/learning/absoluteValueSource038.ts": "d3830ea8d0660596d8c269f464e162deee237eec601408f11278a523709d66b5",
    "../src/learning/absoluteValueSource038Model.ts": "207566c259247e3fcf5ec08fa874084fae66882e767aaa82b1c28b48d8128bfd",
    "../src/learning/AbsoluteValueSource038Lab.tsx": "3f67b42c126d54f2888c5891ff8d16ff498eeee40682ecf3c1e0e7a8f3537cd1",
    "./absolute-value-source038-model.test.ts": "10a5660f5f2fa7315d531b9241a90256673fb2f47f35fdf5995bf4b0508a20b6",
    "../src/learning/basicInequalitiesSource037Model.ts": "7b672bb1b1a2b5aab87f2d1e4d873a8a47efd1f8c6a9838c2f6a28ab22879cf8",
  };
  for (const [file, expected] of Object.entries(files))
    expect(createHash("sha256").update(readFileSync(new URL(file, import.meta.url))).digest("hex"), file).toBe(expected);
  const css = readFileSync(new URL("../src/learning/absoluteValueSource038.css", import.meta.url));
  expect(createHash("sha256").update(css.subarray(0, 4063)).digest("hex")).toBe("e6bd5c119c75e8bf7e5e5c591ea9a1c028dcba35de63cdfb3e38e381b93e8f2e");
  expect(createHash("sha256").update(css).digest("hex")).toBe("d19cf25192fc9587c260ad73e521f247a300b2bd9433171759be2e849f14a97d");
  expect(css.subarray(4063).toString().startsWith("\n/* Give the native disclosure the same reachable target as the other controls. */\n.f038-lab summary{min-height:44px;padding-block:.6rem;box-sizing:border-box;cursor:pointer}\n.f038-lab summary:focus-visible{outline:3px solid var(--f038-b);outline-offset:4px}\n")).toBe(true);
});
