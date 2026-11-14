import { describe, expect, it } from "vitest";
import {
  chemicalSpeciesExamples,
  chemicalSpeciesGuide,
  chemicalSpeciesLesson,
  speciesBudget,
  speciesBudgetFeedback,
  speciesCounts,
} from "../src/learning/chemicalSpecies";

function example(id: string) {
  const result = chemicalSpeciesExamples.find((e) => e.id === id);
  if (!result) throw new Error(`Missing model ${id}`);
  return result;
}

describe("chemical species electron accounting", () => {
  it("preserves the fixed electron budget through every placement stage", () => {
    for (const e of chemicalSpeciesExamples) {
      e.stages.forEach((stage, i) => {
        const c = speciesCounts(e, i);
        expect(stage.orders).toHaveLength(e.links.length);
        expect(stage.nonbonding).toHaveLength(e.atoms.length);
        expect(
          stage.orders.every((n) => Number.isInteger(n) && n >= 0 && n <= 3),
        ).toBe(true);
        expect(
          stage.nonbonding.every(
            (n) => Number.isInteger(n) && n >= 0 && n <= 8,
          ),
        ).toBe(true);
        expect(c.allocated).toBeLessThanOrEqual(speciesBudget(e));
        expect(c.allocated + c.remaining).toBe(speciesBudget(e));
        // Local counts include each shared pair at both bonded atoms.
        expect(c.local.reduce((sum, n) => sum + n, 0)).toBe(
          c.nonshared + c.shared * 2,
        );
      });
      expect(speciesCounts(e, e.stages.length - 1).remaining).toBe(0);
    }
  });
  it("changes CO₂ bonding without adding electrons and distinguishes total from local counts", () => {
    const co2 = example("co2");
    const before = speciesCounts(co2, 2);
    const after = speciesCounts(co2, 3);
    expect(speciesBudget(co2)).toBe(16);
    expect(before).toMatchObject({
      allocated: 16,
      shared: 4,
      nonshared: 12,
      local: [4, 8, 8],
    });
    expect(after).toMatchObject({
      allocated: 16,
      shared: 8,
      nonshared: 8,
      local: [8, 8, 8],
    });
  });
  it("distinguishes charge, valence dots and all electrons in single-atom species", () => {
    const sodium = example("na");
    const cation = example("na-plus");
    const chloride = example("cl-minus");
    expect([speciesBudget(sodium), sodium.actualElectrons]).toEqual([1, 11]);
    expect([speciesBudget(cation), cation.actualElectrons]).toEqual([0, 10]);
    expect([speciesBudget(chloride), chloride.actualElectrons]).toEqual([
      8, 18,
    ]);
    expect(speciesCounts(cation, 1).local).toEqual([0]);
    expect(speciesBudget(example("he"))).toBe(2);
  });
  it("never describes a dotless cation as having no outer-shell electrons", () => {
    const feedback = speciesBudgetFeedback(example("na-plus"), 0);
    expect(feedback).toContain("0 nokta");
    expect(feedback).toContain("toplam 10 elektron");
    expect(feedback).not.toContain("0 değerlik elektronu");
    expect(speciesBudgetFeedback(example("co2"), 16)).toBe(
      "Doğru: CO₂ için toplam 16 değerlik elektronu vardır.",
    );
  });
  it("reconciles the equal NH₃/NH₄⁺ budgets with different bond and lone pair counts", () => {
    const ammonia = example("nh3");
    const ammonium = example("nh4");
    expect(speciesBudget(ammonia)).toBe(8);
    expect(speciesBudget(ammonium)).toBe(8);
    expect(speciesCounts(ammonia, 2)).toMatchObject({
      shared: 6,
      nonshared: 2,
      local: [8, 2, 2, 2],
    });
    expect(speciesCounts(ammonium, 1)).toMatchObject({
      shared: 8,
      nonshared: 0,
      local: [8, 2, 2, 2, 2],
    });
    expect(ammonium.charge).toBe(1);
  });
  it("accounts for triple bonds and the odd-electron radical without forced octets", () => {
    expect(speciesCounts(example("n2"), 2)).toMatchObject({
      shared: 6,
      nonshared: 4,
      local: [8, 8],
      remaining: 0,
    });
    const radical = example("no");
    expect(radical).toMatchObject({ radical: true, charge: 0 });
    expect(speciesBudget(radical)).toBe(11);
    expect(speciesCounts(radical, 2)).toMatchObject({
      shared: 4,
      nonshared: 7,
      local: [7, 8],
      remaining: 0,
    });
  });
  it("clamps stale or invalid saved placement steps without losing the example", () => {
    const co2 = example("co2");
    expect(speciesCounts(co2, 900).index).toBe(3);
    expect(speciesCounts(co2, -1).index).toBe(0);
    expect(speciesCounts(co2, Number.NaN).index).toBe(0);
  });
});

it("ships a substantial standalone native lesson with independently answerable original questions", () => {
  expect(chemicalSpeciesLesson.id).toBe(chemicalSpeciesGuide.id);
  expect(chemicalSpeciesLesson.tags).toContain("detail-152");
  expect(chemicalSpeciesGuide.sections.length).toBeGreaterThanOrEqual(8);
  expect(
    chemicalSpeciesGuide.sections.every((s) => s.paragraphs.length >= 2),
  ).toBe(true);
  expect(chemicalSpeciesGuide.examples.length).toBeGreaterThanOrEqual(4);
  expect(chemicalSpeciesGuide.examples.every((e) => e.steps.length >= 4)).toBe(
    true,
  );
  expect(chemicalSpeciesGuide.recall.length).toBeGreaterThanOrEqual(4);
  const questions = chemicalSpeciesLesson.questions;
  expect(questions).toHaveLength(10);
  expect(new Set(questions.map((q) => q.id)).size).toBe(10);
  for (const q of questions) {
    expect(q.options).toHaveLength(5);
    expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
    expect(q.answer).toBeGreaterThanOrEqual(0);
    expect(q.answer).toBeLessThan(5);
    expect(q.prompt.tr).not.toMatch(
      /yukarıdaki|aşağıdaki şekil|atölyede seçtiğin|önceki soruda/i,
    );
    expect(q.explanation.tr.length).toBeGreaterThan(100);
  }
  expect(questions.map((q) => q.options[q.answer].tr)).toEqual([
    "Tek atomlu anyon; element molekülü; çok atomlu anyon",
    "10 ve 0",
    "8 nokta, köşeli ayraç dışında − yükü",
    "2 ve 2",
    "Her O'dan bir yalnız çifti bağa dönüştürerek O=C=O kurmak",
    "8 ve 0",
    "6 ve 4",
    "Türün toplam 11 değerlik elektronu vardır ve eşleşmemiş elektron radikal niteliği gösterir",
    "İyonların 1:1 oranını ifade eden formül birimidir; kristalin geometrik birim hücresiyle aynı terim değildir",
    "He bir çiftle; O iki çift ve iki tek noktayla gösterilebilir, kâğıtta döndürmek türü değiştirmez",
  ]);
});
