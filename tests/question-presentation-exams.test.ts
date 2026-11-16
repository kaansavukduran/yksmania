import { expect, it, vi } from "vitest";
// A small real-data subject bank exercises the production snapshot factory;
// no question, grading, snapshot or presentation function is mocked.
vi.mock("../src/domain/content", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../src/domain/content")>();
  return {
    ...actual,
    lessons: actual.lessons.filter(
      (l) =>
        l.subjectId !== "tyt-fizik" ||
        ["dogrusal-hareket", "enerji-ve-hareket"].includes(l.id),
    ),
  };
});
import { examCatalogue, beginExam } from "../src/domain/exams";
import { initialState } from "../src/domain/model";
import { lessonById } from "../src/domain/content";
import { clarifiedQuestionView } from "../src/domain/questionPresentation";

it("creates clarified fresh exam snapshots while reading an original saved paper through a nonmutating view", () => {
  const spec = examCatalogue().find((s) => s.id === "branch-tyt-fizik")!;
  const fresh = beginExam(initialState(), spec, 1000);
  for (const [id, fragment] of [
    ["ns-motion-4", "ilk bölümü boyunca hızı sıfır veya pozitif"],
    ["ns-energy-4", "Başlangıçta mekanik enerjisi 200 J"],
  ]) {
    const item = fresh.examDraft!.items.find((q) => q.id === id)!;
    expect(item.prompt).toContain(fragment);
    const original = lessonById(
      id === "ns-motion-4" ? "dogrusal-hareket" : "enerji-ve-hareket",
    )!.questions.find((q) => q.id === id)!;
    expect(original.prompt.tr).not.toContain(fragment);
    const saved = { ...item, prompt: original.prompt.tr },
      snapshot = structuredClone(saved);
    expect(clarifiedQuestionView(saved).prompt).toBe(item.prompt);
    expect(saved).toEqual(snapshot);
  }
});
