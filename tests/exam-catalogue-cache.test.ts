import { describe, expect, it } from "vitest";
import { beginExam, examCatalogue, selectExamVariant } from "../src/domain/exams";
import { initialState } from "../src/domain/model";

describe("exam catalogue cache", () => {
  it("returns the same papers on every visit without sharing the list", () => {
    const first = examCatalogue();
    const second = examCatalogue();
    expect(second).not.toBe(first);
    expect(second).toEqual(first);
    first.pop();
    expect(examCatalogue()).toHaveLength(second.length);
  });

  it("never hands shared catalogue items to a saved exam", () => {
    const [spec] = examCatalogue();
    const variant = selectExamVariant(spec, "seed", []);
    const cached = new Set(examCatalogue().flatMap(({ items }) => items));
    expect(variant.some((item) => cached.has(item))).toBe(false);
    const state = beginExam(initialState(), spec, 1_700_000_000_000);
    state.examDraft!.items[0].prompt = "değişti";
    expect(examCatalogue()[0].items.some(({ prompt }) => prompt === "değişti")).toBe(false);
  });

  it("selects a different variant only through the seed", () => {
    const spec = examCatalogue().find(({ kind }) => kind === "branch")!;
    expect(selectExamVariant(spec, "a", []).map(({ id }) => id)).toEqual(selectExamVariant(spec, "a", []).map(({ id }) => id));
  });
});
