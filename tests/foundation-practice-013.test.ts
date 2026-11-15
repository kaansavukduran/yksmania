import { expect, it } from "vitest";
import acceptedQuestions from "./fixtures/0.12.0-questions.json";
import { lessons, lessonById } from "../src/domain/content";
import { studyTopics, topicLessons } from "../src/domain/studyPlan";
import { createHash } from "node:crypto";
import oldLessonFingerprints from "./fixtures/0.12.0-lesson-fingerprints.json";
import { questionContentIssues } from "../src/domain/questionContent";
import {
  allFoundationPracticeSets,
  foundation013QuestionSets,
} from "../src/learning/forge013FoundationQuestions";
import { selectExamVariant, examCatalogue } from "../src/domain/exams";

it("preserves every field of all 1130 accepted questions while adding exactly 130 original practice items", () => {
  const all = lessons.flatMap((l) => l.questions),
    byId = new Map(all.map((q) => [q.id, q]));
  expect(acceptedQuestions).toHaveLength(1130);
  expect(all).toHaveLength(1260);
  expect(byId.size).toBe(1260);
  for (const old of acceptedQuestions)
    expect(byId.get(old.id), old.id).toEqual(old);
  const newQuestions = foundation013QuestionSets.flatMap((p) => p.questions);
  expect(newQuestions).toHaveLength(130);
  expect(new Set(newQuestions.map((q) => q.id)).size).toBe(130);
  for (const question of all)
    expect(questionContentIssues(question), question.id).toEqual([]);
  for (const question of newQuestions) {
    expect(question.id).toMatch(/^f013-foundation-/);
    expect(question.options).toHaveLength(5);
    expect(new Set(question.options.map((o) => o.tr)).size).toBe(5);
    expect(question.options[question.answer]?.tr).toBeTruthy();
    expect(question.explanation.tr).not.toBe(
      question.options[question.answer].tr,
    );
    expect(
      Object.keys(question).filter(
        (k) =>
          ![
            "id",
            "prompt",
            "passage",
            "options",
            "answer",
            "hint",
            "explanation",
            "skill",
          ].includes(k),
      ),
    ).toEqual([]);
  }
});

it("repairs thirteen existing practice gaps without replacing their lesson identity, title, teaching or topic mapping", () => {
  expect(foundation013QuestionSets.map((p) => p.topicId)).toEqual([
    "detail-199",
    "detail-200",
    "detail-201",
    "detail-226",
    "detail-227",
    "detail-228",
    "detail-229",
    "detail-230",
    "detail-231",
    "detail-232",
    "detail-203",
    "detail-204",
    "detail-147",
  ]);
  expect(allFoundationPracticeSets).toHaveLength(16);
  for (const pack of foundation013QuestionSets) {
    const lesson = lessonById(pack.lessonId)!;
    expect(lesson).toBeDefined();
    expect(lessons.filter((l) => l.id === pack.lessonId)).toHaveLength(1);
    expect(lesson.title.tr).toBe(pack.lessonTitle);
    expect(lesson.subjectId).toBe(pack.subjectId);
    expect(topicLessons(pack.topicId)).toContain(lesson);
    expect(lesson.questions).toEqual(pack.questions);
    expect(lesson.questions).toHaveLength(10);
  }
  expect(
    foundation013QuestionSets
      .filter((p) => p.subjectId === "tyt-tarih")
      .flatMap((p) => p.questions)
      .every((q) => !!q.passage?.tr),
  ).toBe(true);
});

it("makes every prepared theory and the first 138 ordered topics independently practicable", () => {
  const theory = lessons.filter((l) => !l.tags.includes("soru-seti"));
  expect(theory).toHaveLength(146);
  for (const lesson of theory)
    expect(lesson.questions.length, lesson.id).toBeGreaterThan(0);
  for (const topic of studyTopics.slice(0, 138)) {
    expect(
      topicLessons(topic.id).filter((l) => !l.tags.includes("soru-seti"))
        .length,
      topic.title,
    ).toBeGreaterThan(0);
    expect(
      topicLessons(topic.id).some((l) => l.questions.length > 0),
      topic.title,
    ).toBe(true);
  }
  // Every added topic reaches the existing bank; no full-length or extra exam is invented.
  const catalogue = examCatalogue();
  expect(catalogue).toHaveLength(13);
  expect(catalogue.find((e) => e.id === "mixed-tyt")!.items).toHaveLength(105);
  expect(catalogue.find((e) => e.id === "mixed-ayt")!.items).toHaveLength(25);
  for (const pack of foundation013QuestionSets) {
    const spec = catalogue.find((s) => s.id === `branch-${pack.subjectId}`)!;
    const selected = selectExamVariant(spec, "foundation-coverage");
    expect(
      selected.some((q) => q.lessonId === pack.lessonId),
      pack.lessonId,
    ).toBe(true);
  }
});

it("retains all pre-existing lesson identities and every non-question teaching field", () => {
  const canonical = (value: unknown): unknown => {
    if (Array.isArray(value)) return value.map(canonical);
    if (value && typeof value === "object")
      return Object.fromEntries(
        Object.entries(value)
          .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
          .map(([key, child]) => [key, canonical(child)]),
      );
    return value;
  };
  expect(lessons).toHaveLength(Object.keys(oldLessonFingerprints).length);
  for (const lesson of lessons) {
    const { questions: _questions, ...teaching } = lesson;
    const hash = createHash("sha256")
      .update(JSON.stringify(canonical(teaching)))
      .digest("hex");
    expect(hash, lesson.id).toBe(
      oldLessonFingerprints[lesson.id as keyof typeof oldLessonFingerprints],
    );
  }
});
