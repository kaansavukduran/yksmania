import { supplementalCountingTopics034035 } from "../src/data/supplementalCountingTopics034035";
import { supplementalPermutationTopics032033 } from "../src/data/supplementalPermutationTopics032033";
import { supplementalTopics040 } from "../src/learning/geometryCircle040";
import { supplementalSourceTopics038 } from "../src/data/supplementalSourceTopics038";
import { supplementalSourceTopics039 } from "../src/data/supplementalSourceTopics039";
import { supplementalSourceTopics036037 } from "../src/data/supplementalSourceTopics036037";
import { supplementalSourceTopics034035 } from "../src/data/supplementalSourceTopics034035";
import { supplementalSourceTopics032 } from "../src/data/supplementalSourceTopics032";
import { supplementalSourceTopics033 } from "../src/data/supplementalSourceTopics033";
import { supplementalTopics032 } from "../src/data/supplementalTopics032";
import previous031 from "./fixtures/source-stage-031-preservation.json";
import { describe, expect, it } from "vitest";
import { lessons, lessonById } from "../src/domain/content";
import { initialState } from "../src/domain/model";
import { validateState } from "../src/domain/storage";
import {
  completionDates,
  lessonTopic,
  setTopicCompletion,
  studyPlan,
  studyTopics,
  topicLessons,
  workbookStudyTopics,
} from "../src/domain/studyPlan";
import { learningReviewPlan } from "../src/domain/learningReviews";
import { xp } from "../src/domain/scheduler";
import {
  geometryFoundation031Ids,
  supplementalTopics031,
} from "../src/data/supplementalTopics031";
import { lessonGuides } from "../src/learning/guides";
import { builtInCheatSheets } from "../src/learning/cheatsheetContent";
import { supplementalTopics041 } from "../src/data/supplementalTopics041";
import workbookBaseline from "./fixtures/source-stage-025-topic-associations.json";

describe("031 additive geometry learning path", () => {
  it("keeps the exact479 workbook entries and gives each new foundation independent credit", () => {
    expect(workbookStudyTopics).toEqual(workbookBaseline.studyTopics);
    expect(studyTopics.slice(0, 479)).toEqual(workbookBaseline.studyTopics);
    expect(
      studyTopics.slice(479, 485).map(({ order, ...topic }) => topic),
    ).toEqual(supplementalTopics031);
    expect(new Set(studyTopics.map((topic) => topic.id)).size).toBe(509);
    const state = initialState();
    for (const topic of workbookStudyTopics)
      state.topicProgress[topic.id] = { theory: "2026-11-16" };
    state.notes = { "lesson:rasyonel-sayilar": "Önceki not korunur." };
    const restored = validateState(state);
    const plan = studyPlan(restored, "theory", "2026-11-17");
    expect(plan).toMatchObject({ done: 479, remaining: 30, total: 509 });
    expect(plan.scheduled.map(({ topic }) => topic.id)).toEqual(
      [
        ...supplementalTopics031,
        ...supplementalTopics032,
        ...supplementalSourceTopics032,
        ...supplementalSourceTopics033,
        ...supplementalSourceTopics034035,
        ...supplementalSourceTopics036037,
        ...supplementalSourceTopics038,
        ...supplementalSourceTopics039,
        ...supplementalTopics040,
        ...supplementalTopics041,
        ...supplementalPermutationTopics032033,
        ...supplementalCountingTopics034035,
      ].map((topic) => topic.id),
    );
    expect(restored.topicProgress).toEqual(state.topicProgress);
    expect(restored.notes).toEqual(state.notes);
    for (const id of geometryFoundation031Ids) {
      const topicId = lessonTopic[id];
      expect(topicId).toBe(`topic-${id}`);
      expect(topicLessons(topicId).map((lesson) => lesson.id)).toEqual([id]);
      expect(completionDates(restored, "theory").has(topicId)).toBe(false);
    }
  });

  it("registers a full explanation, separate summary and reasoned question set for every new foundation", () => {
    expect(
      lessons.filter((lesson) => Object.hasOwn(previous031.lessons, lesson.id)),
    ).toHaveLength(520);
    expect(
      lessons
        .flatMap((lesson) => lesson.questions)
        .filter((question) =>
          Object.hasOwn(previous031.questions, question.id),
        ),
    ).toHaveLength(5943);
    expect(
      [...lessonGuides.keys()].filter((id) =>
        Object.hasOwn(previous031.guides, id),
      ),
    ).toHaveLength(486);
    expect(
      [...builtInCheatSheets.keys()].filter((id) =>
        Object.hasOwn(previous031.sheets, id),
      ),
    ).toHaveLength(486);
    const allQuestions = lessons.flatMap((lesson) => lesson.questions);
    expect(new Set(allQuestions.map((question) => question.id)).size).toBe(
      allQuestions.length,
    );
    for (const id of geometryFoundation031Ids) {
      const lesson = lessonById(id)!;
      expect(lesson.subjectId).toBe("tyt-geometri");
      expect(lesson.tags).not.toContain("soru-seti");
      expect(lesson.questions).toHaveLength(10);
      const guide = lessonGuides.get(id)!;
      expect(guide.sections.length).toBeGreaterThanOrEqual(6);
      expect(guide.examples.length).toBeGreaterThanOrEqual(3);
      expect(guide.recall.length).toBeGreaterThanOrEqual(3);
      const sheet = builtInCheatSheets.get(lessonTopic[id])!;
      expect(sheet.lessonId).toBe(id);
      expect(sheet.sections.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("records a manual geometry study without XP and schedules days3,7,21 from day1", () => {
    const id = geometryFoundation031Ids[0];
    const topicId = lessonTopic[id];
    const state = initialState();
    const studied = setTopicCompletion(
      state,
      topicId,
      "theory",
      true,
      "2026-11-17",
    );
    expect(validateState(studied)).toEqual(studied);
    expect(xp(studied)).toBe(0);
    expect(studied.sessions).toEqual([]);
    expect(completionDates(studied, "questions").has(topicId)).toBe(false);
    const reviews = learningReviewPlan(studied, "2026-11-17");
    expect(reviews.map((review) => [review.stage, review.targetDate])).toEqual([
      [3, "2026-11-19"],
      [7, "2026-11-23"],
      [21, "2026-12-07"],
    ]);
    expect(state.topicProgress).toEqual({});
  });

  it("a complete geometry question attempt never silently completes its explanation", () => {
    const lesson = lessonById(geometryFoundation031Ids[1])!;
    const state = initialState();
    state.sessions = [
      {
        id: "geometry031-independent",
        lessonId: lesson.id,
        date: "2026-11-17",
        finishedAt: "2026-11-17T10:00:00Z",
        responses: lesson.questions.map((question) => ({
          questionId: question.id,
          selected: question.answer,
          correct: true,
          assisted: false,
          confidence: "high" as const,
        })),
        kind: "learn",
        includesTheory: false,
        minutes: 12,
        note: "",
      },
    ];
    const saved = validateState(state);
    expect(completionDates(saved, "theory").has(lessonTopic[lesson.id])).toBe(
      false,
    );
    expect(
      completionDates(saved, "questions").get(lessonTopic[lesson.id]),
    ).toBe("2026-11-17");
    for (const old of workbookStudyTopics)
      expect(completionDates(saved, "questions").has(old.id)).toBe(false);
  });
});
