import { beforeScientificRevision } from "./helpers/before-scientific-revision";
import { sourceMath032Ids } from "../src/data/supplementalSourceTopics032";
import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import baseline from "./fixtures/source-stage-031-preservation.json";
import { lessons, lessonById } from "../src/domain/content";
import { initialState } from "../src/domain/model";
import { validateState } from "../src/domain/storage";
import { lessonGuides } from "../src/learning/guides";
import { builtInCheatSheets } from "../src/learning/cheatsheetContent";
import { geometryExpansion032Ids } from "../src/data/supplementalTopics032";
import {
  lessonTopic,
  studyTopics,
  setTopicCompletion,
  completionDates,
} from "../src/domain/studyPlan";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
import { questionContentIssues } from "../src/domain/questionContent";
import { learningReviewPlan } from "../src/domain/learningReviews";
import { xp } from "../src/domain/scheduler";
import { getLessonVideos031 } from "../src/learning/videoCatalog031";

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
const fingerprint = (v: unknown) =>
  createHash("sha256")
    .update(JSON.stringify(canonical(v)))
    .digest("hex");

describe("032 source transfer retains old learning while adding usable geometry", () => {
  it("keeps all5943 questions,520 records,486 guides/sheets and485 study positions byte-equivalent in canonical data", () => {
    const maps = {
      lessons: new Map(lessons.map((l) => [l.id, l])),
      questions: new Map(
        lessons.flatMap((l) => l.questions).map((q) => [q.id, q]),
      ),
      guides: lessonGuides,
      sheets: builtInCheatSheets,
    };
    for (const type of ["lessons", "questions", "guides", "sheets"] as const)
      for (const [id, expected] of Object.entries(baseline[type]))
        expect(fingerprint(beforeScientificRevision(type, id, maps[type].get(id))), `${type}:${id}`).toBe(expected);
    expect(studyTopics.slice(0, 485)).toEqual(baseline.studyTopics);
  });

  it("provides eight full lessons, distinct concise summaries and134 fully explained independent questions", () => {
    expect(lessons).toHaveLength(540);
    expect(lessons.flatMap((l) => l.questions)).toHaveLength(6598);
    expect(lessonGuides.size).toBe(505);
    expect(builtInCheatSheets.size).toBe(505);
    expect(studyTopics).toHaveLength(505);
    const all = lessons.flatMap((l) => l.questions);
    expect(new Set(all.map((q) => q.id)).size).toBe(all.length);
    let questions = 0;
    for (const id of [...geometryExpansion032Ids, ...sourceMath032Ids]) {
      const l = lessonById(id)!;
      const g = lessonGuides.get(id)!;
      const s = builtInCheatSheets.get(lessonTopic[id])!;
      expect(l.subjectId).toBe(
        id.startsWith("tyt-mat-") ? "tyt-matematik" : "tyt-geometri",
      );
      expect(l.tags).not.toContain("soru-seti");
      expect(g.sections.length).toBeGreaterThanOrEqual(8);
      expect(g.examples.length).toBeGreaterThanOrEqual(4);
      expect(g.recall.length).toBeGreaterThanOrEqual(4);
      expect(s.lessonId).toBe(id);
      const hasPrimeRepair = id === "tyt-mat-asal-kaynak-032";
      expect(s.sections).toHaveLength(hasPrimeRepair ? 6 : 5);
      expect(s.examples).toHaveLength(hasPrimeRepair ? 3 : 2);
      expect(s.recall).toHaveLength(3);
      const lecture = g.sections
        .flatMap((section) => section.paragraphs)
        .join(" ").length;
      const summary = s.sections
        .flatMap((section) => section.text)
        .join(" ").length;
      expect(
        summary,
        id + ": a summary must remain shorter than the explanation",
      ).toBeLessThan(lecture * 0.6);
      expect(getLessonVideos031(id).recommended.length).toBeGreaterThan(0);
      for (const q of l.questions) {
        questions++;
        expect(questionContentIssues(q), q.id).toEqual([]);
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(5);
        expect(questionGuidanceSchema.safeParse(q.guidance).success, q.id).toBe(
          true,
        );
        expect(q.guidance!.steps.length).toBeGreaterThanOrEqual(3);
        expect(q.guidance!.optionReasons).toHaveLength(5);
      }
    }
    expect(questions).toBe(134);
  });

  it("adds independent records and authentic day3/7/21 reviews without old-topic credit or manual-study XP", () => {
    const state = initialState();
    state.settings.examDate = "2027-05-25";
    state.notes = { "lesson:rasyonel-sayilar": "Önceki notum." };
    const id = geometryExpansion032Ids[0],
      topic = lessonTopic[id];
    const saved = validateState(
      setTopicCompletion(state, topic, "theory", true, "2026-11-17"),
    );
    expect(saved.settings).toEqual(state.settings);
    expect(saved.notes).toEqual(state.notes);
    expect(saved.sessions).toEqual([]);
    expect(xp(saved)).toBe(0);
    expect([...completionDates(saved, "theory").keys()]).toEqual([topic]);
    expect(completionDates(saved, "questions").size).toBe(0);
    expect(
      learningReviewPlan(saved, "2026-11-17").map((r) => [
        r.stage,
        r.targetDate,
      ]),
    ).toEqual([
      [3, "2026-11-19"],
      [7, "2026-11-23"],
      [21, "2026-12-07"],
    ]);
    expect(state.topicProgress).toEqual({});
  });
});
