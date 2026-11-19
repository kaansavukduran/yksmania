import { describe, expect, it } from "vitest";
import { lessons, subjects } from "../src/domain/content";
import { buildStarIndex, difficultyScore, starDistribution, STAR_LEVELS } from "../src/domain/difficulty";
import { starPracticeSpec } from "../src/domain/exams";
import { txt } from "../src/domain/model";

describe("difficulty stars", () => {
  const index = buildStarIndex(lessons);
  it("gives every built-in question a star between 1 and 10", () => {
    for (const l of lessons) for (const q of l.questions) {
      const s = index.get(q.id);
      expect(s, q.id).toBeGreaterThanOrEqual(1);
      expect(s, q.id).toBeLessThanOrEqual(STAR_LEVELS);
    }
  });
  it("splits each subject into ten equal bands (±1)", () => {
    for (const subject of subjects) {
      const ids = lessons.filter((l) => l.subjectId === subject.id).flatMap((l) => l.questions.map((q) => q.id));
      if (ids.length < STAR_LEVELS) continue;
      const d = starDistribution(index, ids);
      expect(Math.max(...d) - Math.min(...d), subject.id).toBeLessThanOrEqual(1);
    }
  });
  it("scores longer, premise-based, negative stems higher", () => {
    const easy = { prompt: txt("2 + 3 kaçtır?"), options: ["4", "5", "6", "7", "8"].map(txt), explanation: txt("2 + 3 = 5.") };
    const hard = {
      passage: txt("Bir deneyde 3 kap, 250 mL, 0,2 M ve 1,5 atm değerleri ölçülüyor; sıcaklık 27 °C sabit tutuluyor ve kaplar sırayla bağlanıyor."),
      prompt: txt("Buna göre I. P₁ > P₂ II. n₁ = n₂ III. V₃ = 2V₁ yargılarından hangileri kesinlikle söylenemez?"),
      options: ["Yalnız I", "Yalnız II", "I ve II", "II ve III", "I, II ve III"].map(txt),
      explanation: txt("Önce mol sayıları n = c·V ile bulunur; sonra P·V = n·R·T ile basınçlar karşılaştırılır. ".repeat(4)),
    };
    expect(difficultyScore(hard)).toBeGreaterThan(difficultyScore(easy));
  });
  it("builds a short star practice that is never a full exam", () => {
    const subject = subjects.find((s) => lessons.some((l) => l.subjectId === s.id && l.questions.length >= 5))!;
    const spec = starPracticeSpec(subject.id, 9, 10)!;
    expect(spec.fullLength).toBe(false);
    expect(spec.items.length).toBeGreaterThan(0);
    expect(spec.items.length).toBeLessThanOrEqual(20);
    expect(spec.items.every((i) => i.subjectId === subject.id)).toBe(true);
  });
});
