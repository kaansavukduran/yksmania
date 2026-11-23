import { describe, expect, it } from "vitest";
import { lessons } from "../src/domain/content";
import { lessonTopic, studyTopics, topicLessons } from "../src/domain/studyPlan";

// One source: every built-in theory lesson belongs to exactly one plan topic,
// so “N hazır konu anlatımı” and “x / N konu çalışıldı” can never diverge.
describe("041 lesson and plan topic counts", () => {
  const theory = lessons.filter((l) => !l.tags.includes("soru-seti"));
  it("maps every theory lesson to an existing plan topic", () => {
    const ids = new Set(studyTopics.map((t) => t.id));
    const orphan = theory.filter((l) => !ids.has(lessonTopic[l.id] ?? ""));
    expect(orphan.map((l) => l.id)).toEqual([]);
  });
  it("gives every plan topic at least one lesson and equal totals", () => {
    expect(studyTopics.filter((t) => topicLessons(t.id).length === 0)).toEqual([]);
    expect(theory.length).toBe(studyTopics.length);
    expect(studyTopics).toHaveLength(510);
  });
  it("keeps the 479 workbook ids first and in order", () => {
    expect(studyTopics.slice(0, 479).every((t, i) => t.order === i + 1 && t.id.startsWith("detail-"))).toBe(true);
    expect(studyTopics[504]?.id).toBe("lesson:alan-donusumleri");
    expect(studyTopics.slice(505).map(({ id }) => id)).toEqual([
      "topic-tyt-mat-permutasyon-kaynak-032",
      "topic-tyt-mat-tekrarli-permutasyon-kaynak-033",
      "topic-tyt-mat-kombinasyon-kaynak-034",
      "topic-tyt-mat-binom-kaynak-035",
      "topic-tyt-mat-olasilik-kaynak-036",
    ]);
  });
});
