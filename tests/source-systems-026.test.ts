import { beforeScientificLesson, beforeScientificRevision } from "./helpers/before-scientific-revision";
import { createHash } from "node:crypto";
import { expect, it } from "vitest";
import oldQuestions from "./fixtures/source-stage-025-question-fingerprints.json";
import {
  acceptedQuestion031,
  acceptedLesson031,
  acceptedGuide031,
} from "./helpers/accepted-content-031";
import oldTeaching from "./fixtures/source-stage-025-lesson-fingerprints.json";
import oldGuides from "./fixtures/source-stage-025-guide-fingerprints.json";
import oldTopics from "./fixtures/source-stage-025-topic-associations.json";
import oldDrafts from "./fixtures/source-stage-025-saved-exam-drafts.json";
import { lessons, lessonById } from "../src/domain/content";
import { lessonTopic, studyTopics } from "../src/domain/studyPlan";
import { lessonGuides } from "../src/learning/guides";
import { builtInCheatSheets } from "../src/learning/cheatsheetContent";
import {
  legacy026Packs,
  legacy026TheoryIds,
  legacy026QuestionLessons,
  legacy026Topics,
} from "../src/learning/legacy026";
import { questionContentIssues } from "../src/domain/questionContent";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
import { initialState } from "../src/domain/model";
import type { ExamDraft } from "../src/domain/examModel";
import { changeExam } from "../src/domain/exams";
import { validateState } from "../src/domain/storage";

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
const fingerprint = (x: unknown) =>
  createHash("sha256")
    .update(JSON.stringify(canonical(x)))
    .digest("hex");
const norm = (s: string) =>
  s
    .normalize("NFKC")
    .toLocaleLowerCase("tr-TR")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[.;:!?]+$/, "");

it("keeps all5322 accepted cards,486 teaching records,452 full guides and every old workbook association intact", () => {
  const all = lessons.flatMap((l) => l.questions).filter(acceptedQuestion031),
    byId = new Map(all.map((q) => [q.id, q]));
  expect(all).toHaveLength(5883);
  expect(byId.size).toBe(5883);
  expect(Object.keys(oldQuestions)).toHaveLength(5322);
  for (const [id, hash] of Object.entries(oldQuestions))
    expect(fingerprint(byId.get(id)), id).toBe(hash);
  expect(Object.keys(oldTeaching)).toHaveLength(486);
  for (const [id, hash] of Object.entries(oldTeaching)) {
    const { questions, ...meta } = beforeScientificLesson(lessonById(id)!);
    expect(fingerprint(meta), id).toBe(hash);
  }
  expect(Object.keys(oldGuides)).toHaveLength(452);
  for (const [id, hash] of Object.entries(oldGuides))
    expect(fingerprint(beforeScientificRevision("guides", id, lessonGuides.get(id))), id).toBe(hash);
  expect(studyTopics.slice(0, 479)).toEqual(oldTopics.studyTopics);
  for (const [id, topic] of Object.entries(oldTopics.lessonTopic))
    expect(lessonTopic[id], id).toBe(topic);
});

it("deepens the28 existing theory records and exposes the28 additions exclusively as independent advanced question sets", () => {
  expect(lessons.filter(acceptedLesson031)).toHaveLength(514);
  expect(
    lessons
      .filter(acceptedLesson031)
      .filter((l) => !l.tags.includes("soru-seti")),
  ).toHaveLength(480);
  expect([...lessonGuides].filter(acceptedGuide031)).toHaveLength(480);
  expect(
    [...builtInCheatSheets.values()].filter(
      (sheet) => sheet.lessonId && acceptedLesson031({ id: sheet.lessonId }),
    ),
  ).toHaveLength(480);
  expect(legacy026Packs).toHaveLength(8);
  expect(legacy026TheoryIds.size).toBe(28);
  expect(legacy026QuestionLessons).toHaveLength(28);
  expect(Object.keys(legacy026Topics)).toHaveLength(28);
  for (const pack of legacy026Packs)
    for (const guide of pack.guides) {
      expect(Object.hasOwn(oldGuides, guide.id), guide.id).toBe(false);
      const lesson = lessonById(guide.id)!;
      expect(lesson, guide.id).toBeDefined();
      expect(lesson.tags).not.toContain("soru-seti");
      expect(guide.sections.length, guide.id).toBeGreaterThan(
        lesson.body.length,
      );
      expect(
        guide.sections.slice(0, lesson.body.length).map((s) => s.title),
        guide.id,
      ).toEqual(lesson.body.map((s) => s.title.tr));
      expect(guide.examples.length, guide.id).toBeGreaterThanOrEqual(4);
      expect(guide.recall.length, guide.id).toBeGreaterThanOrEqual(4);
      const sheet = builtInCheatSheets.get(lessonTopic[guide.id])!;
      expect(sheet.lessonId).toBe(guide.id);
      const text = sheet.sections.flatMap((s) => s.text).join("\n");
      for (const section of guide.sections)
        for (const p of section.paragraphs) expect(text, guide.id).toContain(p);
      expect(sheet.examples.length, guide.id).toBeGreaterThanOrEqual(
        guide.examples.length,
      );
    }
  for (const set of legacy026QuestionLessons) {
    const actual = lessonById(set.id)!;
    expect(actual.tags).toContain("soru-seti");
    const base = set.id.replace(/-ileri$/, "");
    expect(legacy026TheoryIds.has(base), set.id).toBe(true);
    expect(lessonTopic[set.id], set.id).toBe(lessonTopic[base]);
    expect(actual.questions).toEqual(set.questions);
  }
});

it("gives every one of the561 new cards a self-contained five-choice question and distinct progressive guidance", () => {
  const fresh = lessons
    .flatMap((l) => l.questions)
    .filter(acceptedQuestion031)
    .filter((q) => !Object.hasOwn(oldQuestions, q.id));
  expect(fresh).toHaveLength(561);
  for (const q of fresh) {
    expect(questionContentIssues(q), q.id).toEqual([]);
    expect(q.options, q.id).toHaveLength(5);
    expect(new Set(q.options.map((o) => o.tr)).size, q.id).toBe(5);
    const g = questionGuidanceSchema.parse(q.guidance);
    expect(g.steps.length, q.id).toBeGreaterThanOrEqual(3);
    expect(g.optionReasons, q.id).toHaveLength(5);
    for (const knowledge of g.knowledge)
      expect(norm(g.strategy), q.id).not.toBe(norm(knowledge));
    const seen = new Set(
      [...g.knowledge, g.knowledge.join(" "), g.strategy].map(norm),
    );
    for (const step of g.steps) {
      expect(
        seen.has(norm(step)),
        q.id + ": a step must add a new action",
      ).toBe(false);
      seen.add(norm(step));
    }
    expect(g.commonError.trim(), q.id).not.toBe("");
    expect(g.check.trim(), q.id).not.toBe("");
  }
});

it("restores genuine old025 in-progress120/80 papers with their exact answers, flags and deadlines", () => {
  expect(oldDrafts.map((d) => d.items.length)).toEqual([120, 80]);
  for (const draft of oldDrafts as ExamDraft[]) {
    const state = validateState({
      ...initialState(),
      examDraft: structuredClone(draft),
    });
    expect(state.examDraft).toEqual(draft);
    const resumed = changeExam(
      state,
      draft.id,
      { type: "index", index: 1 },
      3000,
    );
    expect(resumed.examDraft!.items).toEqual(draft.items);
    expect(resumed.examDraft!.answers).toEqual(draft.answers);
    expect(resumed.examDraft!.flagged).toEqual(draft.flagged);
    expect(resumed.examDraft!.deadline).toBe(draft.deadline);
  }
});
