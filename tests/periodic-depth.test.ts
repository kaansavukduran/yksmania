import { expect, it } from "vitest";
import { periodicDepthLessons } from "../src/learning/periodicDepth";
import { lessonGuides } from "../src/learning/guides";
import { examCatalogue } from "../src/domain/exams";
import { topicLessons } from "../src/domain/studyPlan";
it("teaches four consecutive source headings with complete original practice that also reaches branch exams", () => {
  const expected = ["detail-148", "detail-149", "detail-150", "detail-151"];
  const branch = examCatalogue().find((e) => e.id === "branch-tyt-kimya")!;
  periodicDepthLessons.forEach((l, i) => {
    expect(topicLessons(expected[i]).map((l) => l.id)).toContain(l.id);
    const guide = lessonGuides.get(l.id)!;
    expect(guide.sections.length).toBeGreaterThanOrEqual(6);
    expect(guide.examples).toHaveLength(3);
    expect(guide.sections.every((s) => s.paragraphs.length >= 2)).toBe(true);
    expect(l.questions).toHaveLength(5);
    expect(branch.items.some((q) => q.lessonId === l.id)).toBe(true);
  });
});
it("keeps the scientific distinctions in actual keyed answers", () => {
  const answers = periodicDepthLessons.map((l) =>
    l.questions.map((q) => q.options[q.answer].tr),
  );
  expect(answers[0][0]).toBe("Ametaldir");
  expect(answers[0][3]).toBe("1. periyot 18. grup");
  expect(answers[1][2]).toBe("Mg²⁺");
  expect(answers[2][2]).toBe("Na < Al < Mg");
  expect(answers[2][3]).toBe("2");
  expect(answers[3][1]).toBe("350 kJ/mol enerji açığa çıkmıştır");
});
