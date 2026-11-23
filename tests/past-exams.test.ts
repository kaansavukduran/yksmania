import { expect, it } from "vitest";
import { officialBooklets, pastExamReferences } from "../src/domain/pastExams";
import { studyTopicById } from "../src/domain/studyPlan";
it("keeps unique actual exam identities, valid official pages and precise topic associations", () => {
  expect(new Set(pastExamReferences.map((ref) => ref.id)).size).toBe(
    pastExamReferences.length,
  );
  for (const ref of pastExamReferences) {
    const file = officialBooklets.find((file) => file.id === ref.bookletId)!;
    expect(file).toBeDefined();
    expect(new URL(file.url).hostname).toBe("dokuman.osym.gov.tr");
    expect(file.sha256).toMatch(/^[a-f0-9]{64}$/);
    expect(ref.page).toBeGreaterThan(0);
    expect(ref.page).toBeLessThanOrEqual(file.pages);
    expect(ref.answerPage).toBeGreaterThan(0);
    expect(ref.answerPage).toBeLessThanOrEqual(ref.answerSource?.pages ?? file.pages);
    if (ref.answerSource) {
      expect(new URL(ref.answerSource.url).hostname).toBe("dokuman.osym.gov.tr");
      expect(ref.answerSource.sha256).toMatch(/^[a-f0-9]{64}$/);
    }
    expect(ref.answer).toMatch(/^[A-E]$/);
    for (const topic of ref.topicIds)
      expect(studyTopicById(topic)).toBeDefined();
  }
});
it("includes YKS and other exam families without treating partial booklets as a complete bank", () => {
  expect(new Set(officialBooklets.map((file) => file.exam))).toEqual(
    new Set(["TYT", "AYT", "ALES", "DGS", "KPSS", "YGS"]),
  );
  expect(officialBooklets.find((file) => file.id === "2026-ales2")?.year).toBe(
    2026,
  );
  expect(Object.fromEntries(officialBooklets.filter((file) => file.year === 2026)
    .map(({ id, coverage }) => [id, coverage]))).toEqual({
    "2026-ales2": "%10",
    "2026-dgs": "%10",
    "2026-kpss": "%10",
    "2026-tyt": "seçili sorular doğrulandı",
  });
});
