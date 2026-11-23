import { beforeScientificQuestions } from "./helpers/before-scientific-revision";
import { beforeLaterSourceRevisions } from "./helpers/before-source004-revision";
import { createHash } from "node:crypto";
import { expect, it } from "vitest";
import baseline from "./fixtures/source-stage-032-preservation.json";
import { lessons, lessonById } from "../src/domain/content";
import { lessonGuides } from "../src/learning/guides";
import { builtInCheatSheets } from "../src/learning/cheatsheetContent";
import {
  studyTopics,
  lessonTopic,
  completionDates,
  setTopicCompletion,
} from "../src/domain/studyPlan";
import { initialState } from "../src/domain/model";
import { validateState } from "../src/domain/storage";
import { learningReviewPlan } from "../src/domain/learningReviews";
import { xp } from "../src/domain/scheduler";
import { questionContentIssues } from "../src/domain/questionContent";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
import { resolvedGuidance } from "../src/learning/questionHelp";
import { localizedQuestionView } from "../src/domain/questionPresentation";
import { getLessonVideos031 } from "../src/learning/videoCatalog031";
const id = "tyt-mat-faktoriyel-kaynak-033",
  topic = "topic-" + id;
const canonical = (v: unknown): unknown =>
  Array.isArray(v)
    ? v.map(canonical)
    : v && typeof v === "object"
      ? Object.fromEntries(
          Object.entries(v)
            .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
            .map(([k, x]) => [k, canonical(x)]),
        )
      : v;
const hash = (v: unknown) =>
  createHash("sha256")
    .update(JSON.stringify(canonical(v)))
    .digest("hex");
it("preserves every prior6077question/528lesson/494guide/sheet value and the493-topic sequence from actual032exports", () => {
  const maps = {
    lessons: new Map(lessons.map((l) => [l.id, l])),
    questions: new Map(
      lessons.flatMap((l) => l.questions).map((q) => [q.id, q]),
    ),
    guides: lessonGuides,
    sheets: builtInCheatSheets,
  };
  for (const type of ["lessons", "questions", "guides", "sheets"] as const)
    for (const [key, expected] of Object.entries(baseline[type]))
      expect(hash(beforeLaterSourceRevisions(type, key, maps[type].get(key))), `${type}:${key}`).toBe(expected);
  expect(lessons.slice(0, 528).map((l) => l.id)).toEqual(
    Object.keys(baseline.lessons),
  );
  expect(
    beforeScientificQuestions(lessons.flatMap((lesson) => lesson.questions)).slice(0, 6077)
      .map((q) => q.id),
  ).toEqual(Object.keys(baseline.questions));
  expect(studyTopics.slice(0, 493)).toEqual(baseline.studyTopics);
});
it("registers one source unit, separate rich guide/concise summary and43 self-contained fully-guided questions", () => {
  expect(lessons).toHaveLength(540);
  expect(lessons.flatMap((l) => l.questions)).toHaveLength(6533);
  expect(lessonGuides.size).toBe(505);
  expect(builtInCheatSheets.size).toBe(505);
  expect(studyTopics).toHaveLength(505);
  const lesson = lessonById(id)!,
    guide = lessonGuides.get(id)!,
    sheet = builtInCheatSheets.get(topic)!;
  expect(lesson.subjectId).toBe("tyt-matematik");
  expect(lessonTopic[id]).toBe(topic);
  expect(studyTopics[493]).toMatchObject({
    id: topic,
    order: 494,
    subjectId: "tyt-matematik",
  });
  expect(guide.sections).toHaveLength(20);
  expect(guide.examples).toHaveLength(16);
  expect(guide.recall).toHaveLength(12);
  expect(sheet.sections).toHaveLength(8);
  expect(sheet.examples).toHaveLength(2);
  expect(sheet.recall).toHaveLength(3);
  expect(sheet.lessonId).toBe(id);
  expect(sheet.sections.flatMap((s) => s.text).join(" ").length).toBeLessThan(
    guide.sections.flatMap((s) => s.paragraphs).join(" ").length * 0.6,
  );
  expect(guide.sections[1].table?.rows[0]).toEqual([
    "n!",
    "1",
    "1",
    "2",
    "6",
    "24",
    "120",
    "720",
    "5.040",
  ]);
  expect(guide.sections[8].paragraphs.join(" ")).toContain(
    "(a+b)(c+d)=ac+ad+bc+bd",
  );
  expect(lesson.questions).toHaveLength(43);
  expect(
    new Set(lessons.flatMap((l) => l.questions).map((q) => q.id)).size,
  ).toBe(6533);
  for (const q of lesson.questions) {
    expect(questionContentIssues(q), q.id).toEqual([]);
    expect(q.options).toHaveLength(5);
    expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
    expect(questionGuidanceSchema.safeParse(q.guidance).success, q.id).toBe(
      true,
    );
    const v = localizedQuestionView(q);
    expect(
      resolvedGuidance({
        id: v.id,
        prompt: v.prompt.tr,
        passage: v.passage?.tr,
        options: v.options.map((o) => o.tr),
        answer: v.answer,
        hint: v.hint.tr,
        explanation: v.explanation.tr,
        guidance: v.guidance,
      }),
      q.id,
    ).toBeTruthy();
  }
  expect(new Set(lesson.questions.map((q) => q.answer)).size).toBe(5);
  const videos = getLessonVideos031(id),
    older = getLessonVideos031("faktoriyel");
  expect(videos.recommended.length).toBeGreaterThan(0);
  expect(videos.recommended).toEqual(older.recommended);
  expect(videos.alternatives).toEqual(older.alternatives);
  expect(lesson.questions[28].guidance?.commonError).toContain(
    "2×7=14 birleşmesini atlama",
  );
  expect(guide.examples[10].pitfall).toContain("14!/9! fazladan 10 taşır");
});
it("keeps source study evidence independent from oldfactorial, question mastery, time and manual-check XP", () => {
  const before = initialState();
  before.settings.examDate = "2027-05-25";
  before.notes = { "lesson:faktoriyel": "Eski notum." };
  const oldTopic = lessonTopic.faktoriyel;
  const saved = validateState(
    setTopicCompletion(before, topic, "theory", true, "2026-11-17"),
  );
  expect(saved.settings).toEqual(before.settings);
  expect(saved.notes).toEqual(before.notes);
  expect(saved.sessions).toEqual([]);
  expect(xp(saved)).toBe(0);
  expect(completionDates(saved, "questions").size).toBe(0);
  expect([...completionDates(saved, "theory").keys()]).toEqual([topic]);
  expect(completionDates(saved, "theory").has(oldTopic)).toBe(false);
  expect(
    learningReviewPlan(saved, "2026-11-17").map((r) => [r.stage, r.targetDate]),
  ).toEqual([
    [3, "2026-11-19"],
    [7, "2026-11-23"],
    [21, "2026-12-07"],
  ]);
  expect(before.topicProgress).toEqual({});
});
