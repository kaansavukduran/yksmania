import { expect, it } from "vitest";
import acceptedQuestions from "./fixtures/0.13.0-questions.json";
import acceptedTyt from "./fixtures/0.13.0-tyt-exam.json";
import oldTeaching from "./fixtures/0.12.0-lesson-fingerprints.json";
import { lessons } from "../src/domain/content";
import { studyTopics, topicLessons } from "../src/domain/studyPlan";
import { lessonGuides } from "../src/learning/guides";
import { builtInCheatSheets } from "../src/learning/cheatsheetContent";
import { questionContentIssues } from "../src/domain/questionContent";
import { initialState } from "../src/domain/model";
import { validateState } from "../src/domain/storage";
import {
  beginExam,
  changeExam,
  examCatalogue,
  scaledExamSeconds,
  type ExamSpec,
} from "../src/domain/exams";

it("retains all 1260 published question payloads while adding 280 distinct source-led questions", () => {
  const all = lessons.flatMap((l) => l.questions);
  const byId = new Map(all.map((q) => [q.id, q]));
  expect(acceptedQuestions).toHaveLength(1260);
  expect(all).toHaveLength(1540);
  expect(byId.size).toBe(1540);
  for (const q of acceptedQuestions) expect(byId.get(q.id), q.id).toEqual(q);
  const oldIds = new Set(acceptedQuestions.map((q) => q.id));
  const added = all.filter((q) => !oldIds.has(q.id));
  expect(added).toHaveLength(280);
  for (const q of added) {
    expect(q.options, q.id).toHaveLength(5);
    expect(new Set(q.options.map((o) => o.tr)).size, q.id).toBe(5);
    expect(questionContentIssues(q), q.id).toEqual([]);
    expect(q.hint.tr.trim(), q.id).not.toBe("");
    expect(q.explanation.tr.trim(), q.id).not.toBe("");
    expect(q.explanation.tr.trim(), q.id).not.toBe(
      q.options[q.answer].tr.trim(),
    );
  }
});

it("teaches the next thirty headings with twenty-eight new deep lessons and two preserved lessons", () => {
  expect(lessons).toHaveLength(175);
  expect(lessons.filter((l) => !l.tags.includes("soru-seti"))).toHaveLength(
    174,
  );
  expect(lessonGuides.size).toBe(146);
  expect(builtInCheatSheets.size).toBe(174);
  const topics = studyTopics.slice(138, 168);
  expect(topics).toHaveLength(30);
  const added: string[] = [],
    retained: string[] = [];
  for (const topic of topics) {
    const theory = topicLessons(topic.id).filter(
      (l) => !l.tags.includes("soru-seti"),
    );
    expect(theory, topic.title).toHaveLength(1);
    const lesson = theory[0],
      guide = lessonGuides.get(lesson.id)!;
    expect(lesson.subjectId).toBe(topic.subjectId);
    expect(guide, topic.title).toBeDefined();
    const isOld = Object.hasOwn(oldTeaching, lesson.id);
    (isOld ? retained : added).push(lesson.id);
    if (!isOld) {
      expect(guide.sections.length, topic.title).toBeGreaterThanOrEqual(8);
      for (const section of guide.sections)
        expect(section.paragraphs.length, section.title).toBeGreaterThanOrEqual(
          2,
        );
      expect(guide.examples.length, topic.title).toBeGreaterThanOrEqual(4);
      for (const example of guide.examples)
        expect(example.steps.length, example.title).toBeGreaterThanOrEqual(3);
      expect(guide.recall.length, topic.title).toBeGreaterThanOrEqual(4);
      expect(lesson.questions, topic.title).toHaveLength(10);
    }
    const sheet = builtInCheatSheets.get(topic.id)!;
    expect(sheet.lessonId).toBe(lesson.id);
    const fullSheet = sheet.sections.flatMap((s) => s.text).join("\n");
    for (const section of guide.sections)
      for (const paragraph of section.paragraphs)
        expect(fullSheet, topic.title).toContain(paragraph);
    expect(sheet.examples).toHaveLength(guide.examples.length);
  }
  expect(added).toHaveLength(28);
  expect(new Set(added).size).toBe(28);
  expect(retained.sort()).toEqual(["carpanlara-ayirma", "mol"]);
  for (const topic of studyTopics.slice(0, 168))
    expect(
      topicLessons(topic.id).some(
        (l) => !l.tags.includes("soru-seti") && l.questions.length > 0,
      ),
      topic.title,
    ).toBe(true);
});

it("adds real geography practice while preserving a complete earlier 105-item exam snapshot", () => {
  const catalogue = examCatalogue(),
    tyt = catalogue.find((e) => e.id === "mixed-tyt")!;
  expect(catalogue).toHaveLength(14);
  expect(tyt.items).toHaveLength(110);
  expect(tyt.fullLength).toBe(false);
  expect(tyt.missingSubjects).toEqual(["Felsefe", "Din Kültürü"]);
  expect(tyt.items.filter((q) => q.subjectId === "tyt-cografya")).toHaveLength(
    5,
  );
  expect(tyt.durationSeconds).toBe(scaledExamSeconds("TYT", 110));
  expect(
    catalogue.find((e) => e.id === "branch-tyt-cografya")!.items,
  ).toHaveLength(40);
  expect(catalogue.find((e) => e.id === "mixed-ayt")!.items).toHaveLength(25);
  const old = acceptedTyt as ExamSpec;
  expect(old.items).toHaveLength(105);
  let state = beginExam(initialState(), old, 1000);
  const id = state.examDraft!.id;
  state = changeExam(
    state,
    id,
    { type: "answer", index: 0, value: old.items[0].answer },
    2000,
  );
  const before = structuredClone(state.examDraft);
  expect(before!.items).toEqual(old.items);
  expect(before!.durationSeconds).toBe(old.durationSeconds);
  expect(validateState(JSON.parse(JSON.stringify(state))).examDraft).toEqual(
    before,
  );
});
