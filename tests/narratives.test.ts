import { it, expect } from "vitest";
import { narrativePacks } from "../src/learning/narratives";
import { lessonById } from "../src/domain/content";
import {
  studyTopicById,
  lessonTopic,
  topicResults,
  completionDate,
  studyTopics,
  topicLessons,
} from "../src/domain/studyPlan";
import { initialState } from "../src/domain/model";
it("publishes reviewed interactive theory separately from the question bank and maps each to its exact source heading", () => {
  const ids = new Set<string>();
  const topics = new Set<string>();
  for (const pack of narrativePacks) {
    expect(ids.has(pack.id)).toBe(false);
    ids.add(pack.id);
    expect(topics.has(pack.topicId)).toBe(false);
    topics.add(pack.topicId);
    expect(studyTopicById(pack.topicId)?.subjectId).toBe(pack.subjectId);
    expect(lessonTopic[pack.id]).toBe(pack.topicId);
    expect(lessonById(pack.id)?.questions).toEqual([]);
    expect(pack.source).toMatch(/PDF/);
    expect(pack.body.length).toBeGreaterThanOrEqual(5);
    expect(pack.cases.length).toBeGreaterThanOrEqual(2);
    expect(pack.recall).toHaveLength(2);
    expect(pack.pitfalls.length).toBeGreaterThanOrEqual(3);
    for (const item of pack.cases) {
      expect(item.nodes.length).toBeGreaterThanOrEqual(3);
      expect(item.nodes.length).toBeLessThanOrEqual(6);
      expect(item.conclusion.length).toBeGreaterThan(60);
      if (item.data) {
        expect(item.data.labels.length).toBe(item.data.values.length);
        expect(
          item.data.values.every((v) => Number.isFinite(v) && v >= 0),
        ).toBe(true);
      }
    }
  }
  const s = initialState();
  s.sessions = [
    {
      id: "empty",
      lessonId: narrativePacks[0].id,
      date: "2026-11-14",
      finishedAt: "x",
      responses: [],
      kind: "learn",
      minutes: 0,
      note: "",
    },
  ];
  expect(topicResults(s).size).toBe(0);
  expect(
    completionDate(s, narrativePacks[0].topicId, "questions"),
  ).toBeUndefined();
});
it("keeps an authored lesson at every one of the first 39 verified workbook headings", () => {
  for (const topic of studyTopics.slice(0, 39))
    expect(
      topicLessons(topic.id).length,
      `${topic.order}: ${topic.title}`,
    ).toBeGreaterThan(0);
});
