import { it, expect } from "vitest";
import { pastExamReferences } from "../src/domain/pastExams";
import { examTeachingCases } from "../src/learning/pastExamCases";
it("gives every verified exam association a complete native original teaching task without requiring a booklet", () => {
  expect(Object.keys(examTeachingCases).sort()).toEqual(
    pastExamReferences.map((r) => r.id).sort(),
  );
  for (const r of pastExamReferences) {
    const c = examTeachingCases[r.id];
    expect(c.prompt.length).toBeGreaterThan(85);
    expect(c.steps).toHaveLength(3);
    expect(c.answer.length).toBeGreaterThan(1);
    expect(c.pitfall.length).toBeGreaterThan(30);
  }
  expect(examTeachingCases["2026-DGS-SAY-1"].answer).toBe("5.");
  expect((0.5 + 5) / (0.5 + 0.6)).toBe(5);
  expect(examTeachingCases["2021-TYT-MAT-1"].prompt).toContain("280");
  expect((355 - 280) / (400 - 280)).toBe(5 / 8);
});
