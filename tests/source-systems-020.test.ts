import { beforeScientificLesson } from "./helpers/before-scientific-revision";
import stageQuestionFingerprints from "./fixtures/source-stage-020-question-fingerprints.json";
import { createHash } from "node:crypto";
import { expect, it } from "vitest";
import beforeQuestions from "./fixtures/source-stage-019-questions.json";
import beforeTeaching from "./fixtures/source-stage-019-lesson-fingerprints.json";
import beforePapers from "./fixtures/source-stage-019-mixed-exams.json";
import beforeDNA from "./fixtures/source-stage-019-extended-guides.json";
import { lessons, lessonById } from "../src/domain/content";
import { studyTopics, topicLessons } from "../src/domain/studyPlan";
import { lessonGuides } from "../src/learning/guides";
import { builtInCheatSheets } from "../src/learning/cheatsheetContent";
import { questionContentIssues } from "../src/domain/questionContent";
import { initialState } from "../src/domain/model";
import { validateState } from "../src/domain/storage";
import { beginExam, changeExam, examCatalogue, scaledExamSeconds, type ExamSpec } from "../src/domain/exams";

const canonical = (x: unknown): unknown => Array.isArray(x) ? x.map(canonical) : x && typeof x === "object" ? Object.fromEntries(Object.entries(x).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0).map(([key, value]) => [key, canonical(value)])) : x;

it("preserves all3040 accepted question payloads and325 teaching records while adding300 independent five-option cards", () => {
  const stageIds=new Set(Object.keys(stageQuestionFingerprints));
  const all = lessons.flatMap((l) => l.questions).filter(q=>stageIds.has(q.id)), byId = new Map(all.map((q) => [q.id, q]));
  expect(beforeQuestions).toHaveLength(3040);
  expect(all).toHaveLength(3340);
  expect(byId.size).toBe(all.length);
  for (const question of beforeQuestions) expect(byId.get(question.id), question.id).toEqual(question);
  expect(Object.keys(beforeTeaching)).toHaveLength(325);
  for (const [id, hash] of Object.entries(beforeTeaching)) {
    const { questions, ...teaching } = beforeScientificLesson(lessonById(id)!);
    expect(createHash("sha256").update(JSON.stringify(canonical(teaching))).digest("hex"), id).toBe(hash);
  }
  const oldIds = new Set(beforeQuestions.map((q) => q.id));
  const fresh = all.filter((q) => !oldIds.has(q.id));
  expect(fresh).toHaveLength(300);
  for (const question of fresh) {
    expect(question.options, question.id).toHaveLength(5);
    expect(new Set(question.options.map((q) => q.tr)).size, question.id).toBe(5);
    expect(questionContentIssues(question), question.id).toEqual([]);
    expect(question.hint.tr.trim(), question.id).not.toBe("");
    expect(question.explanation.tr.trim(), question.id).not.toBe(question.options[question.answer].tr.trim());
  }
});

it("maps all thirty next headings to29 new complete guides or the retained DNA guide and includes every section in built-in sheets", () => {
  expect(lessons.length).toBeGreaterThanOrEqual(355);
  expect(lessons.filter((l) => !l.tags.includes("soru-seti")).length).toBeGreaterThanOrEqual(350);
  expect(lessonGuides.size).toBeGreaterThanOrEqual(322);
  expect(builtInCheatSheets.size).toBeGreaterThanOrEqual(350);
  const fresh = new Set<string>();
  for (const topic of studyTopics.slice(318, 348)) {
    const lesson = topicLessons(topic.id).find((l) => !l.tags.includes("soru-seti"))!;
    expect(lesson, topic.title).toBeDefined();
    if (lesson.id !== "dna-eslenmesi") fresh.add(lesson.id);
    const guide = lessonGuides.get(lesson.id)!, sheet = builtInCheatSheets.get(topic.id)!;
    expect(guide, topic.title).toBeDefined();
    expect(sheet.lessonId, topic.title).toBe(lesson.id);
    const text = sheet.sections.flatMap((s) => s.text).join("\n");
    for (const section of guide.sections) for (const paragraph of section.paragraphs) expect(text, topic.title).toContain(paragraph);
    expect(sheet.examples, topic.title).toHaveLength(guide.examples.length);
  }
  expect(fresh.size).toBe(29);
  for (const topic of studyTopics.slice(0, 348)) expect(topicLessons(topic.id).some((l) => !l.tags.includes("soru-seti") && l.questions.length > 0), topic.title).toBe(true);
});

it("appends DNA content without rewriting its original sections, examples, recall or questions, and keeps its advanced set separate", () => {
  const old = beforeDNA["dna-eslenmesi"], guide = lessonGuides.get("dna-eslenmesi")!;
  expect(old.sections).toHaveLength(7);
  expect(guide.sections).toHaveLength(17);
  expect(guide.sections.slice(0, old.sections.length)).toEqual(old.sections);
  expect(guide.examples.slice(0, old.examples.length)).toEqual(old.examples);
  expect(guide.recall.slice(0, old.recall.length)).toEqual(old.recall);
  expect(guide.objectives).toEqual(old.objectives);
  expect(guide.minutes).toBe(old.minutes);
  expect(guide.source.startsWith(old.source)).toBe(true);
  expect(lessonById("dna-eslenmesi")!.questions).toHaveLength(5);
  const advanced = lessonById("dna-replikasyonu-ileri")!;
  expect(advanced.tags).toContain("soru-seti");
  expect(advanced.body).toEqual([]);
  expect(advanced.questions).toHaveLength(10);
  expect(lessonGuides.has(advanced.id)).toBe(false);
});

it("adds philosophy practice and115-question TYT while preserving entire old110/55-item papers and their timing", () => {
  const catalogue = examCatalogue(), tyt = catalogue.find((e) => e.id === "mixed-tyt")!, ayt = catalogue.find((e) => e.id === "mixed-ayt")!;
  expect(catalogue).toHaveLength(17);
  expect(tyt.items).toHaveLength(120);
  expect(tyt.items.filter((q) => q.subjectId === "tyt-felsefe")).toHaveLength(5);
  expect(tyt.missingSubjects).toEqual([]);
  expect(tyt.fullLength).toBe(true);
  expect(tyt.durationSeconds).toBe(scaledExamSeconds("TYT", tyt.items.length));
  expect(ayt.items.length).toBeGreaterThanOrEqual(55);
  expect(ayt.durationSeconds).toBe(scaledExamSeconds("AYT", ayt.items.length));
  expect(beforePapers.map((p) => p.items.length)).toEqual([110, 55]);
  for (const old of beforePapers as ExamSpec[]) {
    let state = beginExam(initialState(), old, 1000), id = state.examDraft!.id;
    state = changeExam(state, id, { type: "answer", index: 0, value: old.items[0].answer }, 2000);
    state = changeExam(state, id, { type: "flag", index: 0 }, 2100);
    const before = structuredClone(state.examDraft);
    expect(before!.items).toEqual(old.items);
    expect(before!.durationSeconds).toBe(old.durationSeconds);
    expect(validateState(JSON.parse(JSON.stringify(state))).examDraft).toEqual(before);
  }
});
