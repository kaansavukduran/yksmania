import { createHash } from "node:crypto";
import { expect, it } from "vitest";
import beforeQuestionFingerprints from "./fixtures/source-stage-024-question-fingerprints.json";
import beforeTeaching from "./fixtures/source-stage-024-lesson-fingerprints.json";
import beforePapers from "./fixtures/source-stage-024-mixed-exams.json";
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
  selectExamVariant,
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

it("retains5088 accepted questions and475 teaching records while adding234 complete five-option cards", () => {
  const all = lessons.flatMap((l) => l.questions),
    byId = new Map(all.map((q) => [q.id, q]));
  expect(Object.keys(beforeQuestionFingerprints)).toHaveLength(5088);
  expect(all).toHaveLength(5322);
  expect(byId.size).toBe(all.length);
  for (const [id, hash] of Object.entries(beforeQuestionFingerprints)) {
    expect(byId.has(id), id).toBe(true);
    expect(
      createHash("sha256")
        .update(JSON.stringify(canonical(byId.get(id))))
        .digest("hex"),
      id,
    ).toBe(hash);
  }
  expect(Object.keys(beforeTeaching)).toHaveLength(475);
  for (const [id, hash] of Object.entries(beforeTeaching)) {
    const { questions, ...teaching } = lessonById(id)!;
    expect(
      createHash("sha256")
        .update(JSON.stringify(canonical(teaching)))
        .digest("hex"),
      id,
    ).toBe(hash);
  }
  const prior = new Set(Object.keys(beforeQuestionFingerprints)),
    fresh = all.filter((q) => !prior.has(q.id));
  expect(fresh).toHaveLength(234);
  for (const q of fresh) {
    expect(q.options, q.id).toHaveLength(5);
    expect(new Set(q.options.map((o) => o.tr)).size, q.id).toBe(5);
    expect(questionContentIssues(q), q.id).toEqual([]);
    expect(q.hint.tr.trim(), q.id).not.toBe("");
    expect(q.explanation.tr.trim(), q.id).not.toBe(
      q.options[q.answer].tr.trim(),
    );
    expect(q.guidance, q.id).toBeDefined();
    if (q.guidance) {
      const g = q.guidance;
      expect(g.optionReasons, q.id).toHaveLength(5);
      expect(g.steps.length, q.id).toBeGreaterThanOrEqual(2);
      expect(g.commonError.trim(), q.id).not.toBe("");
      expect(g.check.trim(), q.id).not.toBe("");
      const normalize = (text: string) =>
        text
          .normalize("NFKC")
          .toLocaleLowerCase("tr-TR")
          .replace(/\s+/g, " ")
          .trim()
          .replace(/[.;:!?]+$/, "");
      const seen = new Set(
        [...g.knowledge, g.knowledge.join(" "), g.strategy].map(normalize),
      );
      for (const step of g.steps) {
        expect(
          seen.has(normalize(step)),
          q.id + ": a step must advance beyond earlier panels",
        ).toBe(false);
        seen.add(normalize(step));
      }
    }
  }
  expect(fresh.filter((q) => q.guidance)).toHaveLength(234);
});

it("offers all final11 ordered guides and built-in sheets without requiring learner imports", () => {
  expect(lessons).toHaveLength(486);
  expect(lessons.filter((l) => !l.tags.includes("soru-seti"))).toHaveLength(
    480,
  );
  expect(lessonGuides.size).toBe(452);
  expect(builtInCheatSheets.size).toBe(480);
  const ids = new Set<string>();
  for (const topic of studyTopics.slice(468, 479)) {
    const lesson = topicLessons(topic.id).find(
      (l) => !l.tags.includes("soru-seti"),
    )!;
    expect(lesson, topic.title).toBeDefined();
    ids.add(lesson.id);
    const guide = lessonGuides.get(lesson.id)!,
      sheet = builtInCheatSheets.get(topic.id)!;
    expect(guide, topic.title).toBeDefined();
    expect(sheet.lessonId).toBe(lesson.id);
    const text = sheet.sections.flatMap((s) => s.text).join("\n");
    for (const section of guide.sections)
      for (const p of section.paragraphs)
        expect(text, topic.title).toContain(p);
    expect(sheet.examples).toHaveLength(guide.examples.length);
  }
  expect(ids.size).toBe(11);
  for (const topic of studyTopics.slice(0, 479))
    expect(
      topicLessons(topic.id).some(
        (l) => !l.tags.includes("soru-seti") && l.questions.length > 0,
      ),
      topic.title,
    ).toBe(true);
});

it("preserves complete old120/80 question papers, selected answer, flag and deadline rather than upgrading them to the new full mock", () => {
  expect(beforePapers.map((p) => p.items.length)).toEqual([120, 80]);
  for (const old of beforePapers as ExamSpec[]) {
    expect(selectExamVariant(old, "old-saved-paper")).toEqual(old.items);
    let state = beginExam(initialState(), old, 1000),
      id = state.examDraft!.id;
    state = changeExam(
      state,
      id,
      { type: "answer", index: 0, value: old.items[0].answer },
      2000,
    );
    state = changeExam(state, id, { type: "flag", index: 0 }, 2100);
    const snapshot = structuredClone(state.examDraft);
    expect(snapshot!.items).toEqual(old.items);
    expect(snapshot!.durationSeconds).toBe(old.durationSeconds);
    expect(snapshot!.deadline).toBe(1000 + old.durationSeconds * 1000);
    expect(validateState(JSON.parse(JSON.stringify(state))).examDraft).toEqual(
      snapshot,
    );
  }
});

// The Din teaching banks retain the full TYT quota. Old drafts below
// still retain their complete 120-item snapshots.
