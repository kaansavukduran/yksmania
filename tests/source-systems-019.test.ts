import stageQuestions from "./fixtures/source-stage-019-questions.json";
import { publishedQuestion } from "./helpers/publishedQuestion";
import { createHash } from "node:crypto";
import { expect, it } from "vitest";
import oldQuestions from "./fixtures/source-stage-018-questions.json";
import oldTeaching from "./fixtures/source-stage-018-lesson-fingerprints.json";
import oldExams from "./fixtures/source-stage-018-mixed-exams.json";
import oldGuides from "./fixtures/source-stage-018-extended-guides.json";
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
            .map(([k, v]) => [k, canonical(v)]),
        )
      : x;

it("preserves all 2740 prior question fields and adds 300 self-contained distinct questions", () => {
  const stageIds=new Set(stageQuestions.map(q=>q.id));
  const questions = lessons.flatMap((l) => l.questions).filter(q=>stageIds.has(q.id)),
    byId = new Map(questions.map((q) => [q.id, q]));
  expect(oldQuestions).toHaveLength(2740);
  expect(questions).toHaveLength(3040);
  expect(byId.size).toBe(3040);
  for (const q of oldQuestions) expect(byId.get(q.id), q.id).toEqual(publishedQuestion(q));
  expect(Object.keys(oldTeaching)).toHaveLength(295);
  for (const [id, hash] of Object.entries(oldTeaching)) {
    const lesson = lessonById(id)!;
    expect(lesson, id).toBeDefined();
    const { questions: _questions, ...teaching } = lesson;
    expect(
      createHash("sha256")
        .update(JSON.stringify(canonical(teaching)))
        .digest("hex"),
      id,
    ).toBe(hash);
  }
  const oldIds = new Set(oldQuestions.map((q) => q.id)),
    added = questions.filter((q) => !oldIds.has(q.id));
  expect(added).toHaveLength(300);
  for (const q of added) {
    expect(questionContentIssues(q), q.id).toEqual([]);
    expect(q.options, q.id).toHaveLength(5);
    expect(new Set(q.options.map((o) => o.tr)).size, q.id).toBe(5);
    expect(q.hint.tr.trim(), q.id).not.toBe("");
    expect(q.explanation.tr.trim(), q.id).not.toBe("");
    expect(q.explanation.tr.trim(), q.id).not.toBe(
      q.options[q.answer].tr.trim(),
    );
  }
});

it("teaches the next thirty ordered headings with 27 new full guides and three complete extensions", () => {
  expect(lessons.length).toBeGreaterThanOrEqual(325);
  expect(lessons.filter((l) => !l.tags.includes("soru-seti")).length).toBeGreaterThanOrEqual(321);
  expect(lessonGuides.size).toBeGreaterThanOrEqual(293);
  expect(builtInCheatSheets.size).toBeGreaterThanOrEqual(321);
  const next = studyTopics.slice(288, 318);
  expect(next).toHaveLength(30);
  const fresh: string[] = [];
  for (const topic of next) {
    const theory = topicLessons(topic.id).filter(
      (l) => !l.tags.includes("soru-seti"),
    );
    expect(theory, topic.title).toHaveLength(1);
    const lesson = theory[0],
      guide = lessonGuides.get(lesson.id)!;
    expect(lesson.subjectId, topic.title).toBe(topic.subjectId);
    expect(guide, topic.title).toBeDefined();
    const old = oldGuides[lesson.id as keyof typeof oldGuides];
    const sections = old
      ? guide.sections.slice(old.sections.length)
      : guide.sections;
    expect(sections.length, topic.title).toBeGreaterThanOrEqual(old ? 8 : 10);
    for (const section of sections)
      expect(section.paragraphs.length, section.title).toBeGreaterThanOrEqual(
        2,
      );
    expect(
      guide.examples.length - (old?.examples.length ?? 0),
      topic.title,
    ).toBeGreaterThanOrEqual(4);
    for (const example of guide.examples.slice(old?.examples.length ?? 0))
      expect(example.steps.length, example.title).toBeGreaterThanOrEqual(3);
    expect(
      guide.recall.length - (old?.recall.length ?? 0),
      topic.title,
    ).toBeGreaterThanOrEqual(4);
    if (!old) {
      fresh.push(lesson.id);
      expect(Object.hasOwn(oldTeaching, lesson.id), lesson.id).toBe(false);
      expect(lesson.questions, topic.title).toHaveLength(10);
    } else expect(lesson.questions, topic.title).toHaveLength(5);
    const sheet = builtInCheatSheets.get(topic.id)!;
    expect(sheet.lessonId, topic.title).toBe(lesson.id);
    const text = sheet.sections.flatMap((s) => s.text).join("\n");
    for (const section of guide.sections)
      for (const paragraph of section.paragraphs)
        expect(text, topic.title).toContain(paragraph);
    expect(sheet.examples, topic.title).toHaveLength(guide.examples.length);
  }
  expect(new Set(fresh).size).toBe(27);
  for (const topic of studyTopics.slice(0, 318))
    expect(
      topicLessons(topic.id).some(
        (l) => !l.tags.includes("soru-seti") && l.questions.length > 0,
      ),
      topic.title,
    ).toBe(true);
});

it("keeps every original guide section and example, while exposing advanced questions only as question sets", () => {
  const ids = ["paragraf", "elektrik-alan", "kimyasal-denge"] as const;
  const advanced = [
    "paragraf-ana-dusunce-ileri",
    "elektrik-alan-ileri",
    "kimyasal-denge-ileri",
  ];
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i],
      old = oldGuides[id],
      guide = lessonGuides.get(id)!;
    expect(guide.sections.slice(0, old.sections.length), id).toEqual(
      old.sections,
    );
    expect(guide.examples.slice(0, old.examples.length), id).toEqual(
      old.examples,
    );
    expect(guide.recall.slice(0, old.recall.length), id).toEqual(old.recall);
    expect(guide.objectives, id).toEqual(old.objectives);
    expect(guide.minutes, id).toBe(old.minutes);
    expect(guide.source.startsWith(old.source), id).toBe(true);
    const set = lessonById(advanced[i])!;
    expect(set.tags, set.id).toContain("soru-seti");
    expect(set.questions, set.id).toHaveLength(10);
    expect(lessonGuides.has(set.id), set.id).toBe(false);
  }
});

it("extends numerical AYT practice without rewriting a saved 45-item paper or its timing", () => {
  const catalogue = examCatalogue(),
    ayt = catalogue.find((e) => e.id === "mixed-ayt")!,
    tyt = catalogue.find((e) => e.id === "mixed-tyt")!;
  expect(catalogue.length).toBeGreaterThanOrEqual(15);
  expect(tyt.items.length).toBeGreaterThanOrEqual(110);
  expect(ayt.items).toHaveLength(55);
  expect(
    ayt.items.filter((q) =>
      ["ayt-matematik", "ayt-geometri"].includes(q.subjectId),
    ),
  ).toHaveLength(15);
  expect(ayt.items.filter((q) => q.subjectId === "ayt-fizik")).toHaveLength(14);
  expect(ayt.items.filter((q) => q.subjectId === "ayt-kimya")).toHaveLength(13);
  expect(ayt.items.filter((q) => q.subjectId === "ayt-biyoloji")).toHaveLength(
    13,
  );
  expect(ayt.fullLength).toBe(false);
  expect(ayt.missingSubjects).toEqual(["Matematik / Geometri"]);
  expect(ayt.durationSeconds).toBe(scaledExamSeconds("AYT", 55));
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
    state = changeExam(state, id, { type: "flag", index: 0 }, 2500);
    const before = structuredClone(state.examDraft);
    expect(before!.items).toEqual(old.items);
    expect(before!.durationSeconds).toBe(old.durationSeconds);
    expect(validateState(JSON.parse(JSON.stringify(state))).examDraft).toEqual(
      before,
    );
  }
});
