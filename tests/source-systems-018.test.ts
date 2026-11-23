import { beforeScientificLesson } from "./helpers/before-scientific-revision";
import { publishedQuestion } from "./helpers/publishedQuestion";
import stageQuestions from "./fixtures/source-stage-018-questions.json";
import { createHash } from "node:crypto";
import { expect, it } from "vitest";
import oldQuestions from "./fixtures/source-stage-017-questions.json";
import oldTeaching from "./fixtures/source-stage-017-lesson-fingerprints.json";
import oldExams from "./fixtures/source-stage-017-mixed-exams.json";
import { lessons, lessonById } from "../src/domain/content";
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

const canonical = (x: unknown): unknown =>
  Array.isArray(x)
    ? x.map(canonical)
    : x && typeof x === "object"
      ? Object.fromEntries(
          Object.entries(x)
            .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
            .map(([key, value]) => [key, canonical(value)]),
        )
      : x;

it("retains every previously verified source question and teaching field while adding 300 further distinct self-contained items", () => {
  const stageIds = new Set(stageQuestions.map((q) => q.id));
  const all = lessons
      .flatMap((l) => l.questions)
      .filter((q) => stageIds.has(q.id)),
    byId = new Map(all.map((q) => [q.id, q]));
  expect(oldQuestions).toHaveLength(2440);
  expect(all).toHaveLength(2740);
  expect(byId.size).toBe(all.length);
  for (const question of oldQuestions)
    expect(byId.get(question.id), question.id).toEqual(publishedQuestion(question));
  expect(Object.keys(oldTeaching)).toHaveLength(265);
  for (const [id, hash] of Object.entries(oldTeaching)) {
    const lesson = lessonById(id)!;
    expect(lesson, id).toBeDefined();
    const { questions: _questions, ...teaching } = beforeScientificLesson(lesson);
    expect(
      createHash("sha256")
        .update(JSON.stringify(canonical(teaching)))
        .digest("hex"),
      id,
    ).toBe(hash);
  }
  const oldIds = new Set(oldQuestions.map((q) => q.id));
  const added = all.filter((q) => !oldIds.has(q.id));
  expect(added).toHaveLength(300);
  for (const question of added) {
    expect(question.options, question.id).toHaveLength(5);
    expect(new Set(question.options.map((o) => o.tr)).size, question.id).toBe(
      5,
    );
    expect(questionContentIssues(question), question.id).toEqual([]);
    expect(question.hint.tr.trim(), question.id).not.toBe("");
    expect(question.explanation.tr.trim(), question.id).not.toBe("");
    expect(question.explanation.tr.trim(), question.id).not.toBe(
      question.options[question.answer].tr.trim(),
    );
  }
});

it("teaches all thirty next headings in verified order with deep guides, complete sheets and independent practice", () => {
  expect(lessons.length).toBeGreaterThanOrEqual(295);
  expect(
    lessons.filter((l) => !l.tags.includes("soru-seti")).length,
  ).toBeGreaterThanOrEqual(294);
  expect(lessonGuides.size).toBeGreaterThanOrEqual(266);
  expect(builtInCheatSheets.size).toBeGreaterThanOrEqual(294);
  const next = studyTopics.slice(258, 288),
    ids: string[] = [];
  expect(next).toHaveLength(30);
  for (const topic of next) {
    const theory = topicLessons(topic.id).filter(
      (l) => !l.tags.includes("soru-seti"),
    );
    expect(theory, topic.title).toHaveLength(1);
    const lesson = theory[0],
      guide = lessonGuides.get(lesson.id)!;
    expect(lesson.subjectId, topic.title).toBe(topic.subjectId);
    expect(Object.hasOwn(oldTeaching, lesson.id), topic.title).toBe(false);
    ids.push(lesson.id);
    expect(guide, topic.title).toBeDefined();
    expect(guide.sections.length, topic.title).toBeGreaterThanOrEqual(10);
    for (const section of guide.sections)
      expect(section.paragraphs.length, section.title).toBeGreaterThanOrEqual(
        2,
      );
    expect(guide.examples.length, topic.title).toBeGreaterThanOrEqual(4);
    for (const example of guide.examples)
      expect(example.steps.length, example.title).toBeGreaterThanOrEqual(3);
    expect(guide.recall.length, topic.title).toBeGreaterThanOrEqual(4);
    expect(lesson.questions, topic.title).toHaveLength(10);
    const sheet = builtInCheatSheets.get(topic.id)!;
    expect(sheet.lessonId).toBe(lesson.id);
    const fullSheet = sheet.sections.flatMap((s) => s.text).join("\n");
    for (const section of guide.sections)
      for (const paragraph of section.paragraphs)
        expect(fullSheet, topic.title).toContain(paragraph);
    expect(sheet.examples).toHaveLength(guide.examples.length);
  }
  expect(new Set(ids).size).toBe(30);
  for (const topic of studyTopics.slice(0, 288))
    expect(
      topicLessons(topic.id).some(
        (l) => !l.tags.includes("soru-seti") && l.questions.length > 0,
      ),
      topic.title,
    ).toBe(true);
});

it("retains full 45-item AYT and 110-item TYT snapshots while adding analytic geometry to branch practice", () => {
  const catalogue = examCatalogue(),
    ayt = catalogue.find((e) => e.id === "mixed-ayt")!,
    tyt = catalogue.find((e) => e.id === "mixed-tyt")!;
  expect(catalogue.length).toBeGreaterThanOrEqual(14);
  expect(tyt.items.length).toBeGreaterThanOrEqual(110);
  expect(ayt.items.length).toBeGreaterThanOrEqual(45);
  expect(ayt.items.filter((q) => q.subjectId === "ayt-fizik")).toHaveLength(14);
  expect(ayt.items.filter((q) => q.subjectId === "ayt-biyoloji")).toHaveLength(
    13,
  );
  if (ayt.items.length < 80) {
    expect(ayt.fullLength).toBe(false);
    expect(ayt.missingSubjects).toContain("Matematik / Geometri");
  }
  expect(ayt.durationSeconds).toBe(scaledExamSeconds("AYT", ayt.items.length));
  expect(ayt.durationSeconds).toBeGreaterThanOrEqual(6075);
  expect(tyt.durationSeconds).toBe(scaledExamSeconds("TYT", tyt.items.length));
  expect(oldExams.map((e) => e.items.length)).toEqual([110, 45]);
  for (const old of oldExams as ExamSpec[]) {
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
  }
});
