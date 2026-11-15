import { describe, expect, it } from "vitest";
import {
  cycleProcesses,
  cycleTransfer,
  foodWebSnapshot,
  forge014BiologyGuides,
  forge014BiologyLessons,
  forge014BiologyTopics,
  lakeSnapshot,
  pondSelection,
  pyramidSnapshot,
  resourceBudget,
} from "../src/learning/forge014Biology";

describe("Ecology models with explicit quantities and limits", () => {
  it("distinguishes individuals, populations, communities and an abiotic-inclusive cut", () => {
    expect(pondSelection(1, false, false).level).toBe("Organizma");
    expect(pondSelection(20, false, false).level).toBe("Popülasyon");
    expect(pondSelection(20, true, false)).toMatchObject({
      level: "Komünite",
      species: 3,
    });
    expect(pondSelection(20, true, true)).toMatchObject({
      level: "Ekosistem kesiti",
      biological: "Komünite",
    });
    expect(() => pondSelection(0, false, false)).toThrow();
  });
  it("changes energy transfer twice without confusing standing biomass or number", () => {
    expect(pyramidSnapshot("energy", 10)).toMatchObject({
      values: [10000, 1000, 100],
      unit: "J/m²/yıl",
      inverted: false,
    });
    expect(pyramidSnapshot("energy", 20).values).toEqual([10000, 2000, 400]);
    expect(pyramidSnapshot("number", 10)).toMatchObject({
      values: [1, 100, 10],
      inverted: true,
    });
    expect(pyramidSnapshot("biomass", 20)).toMatchObject({
      values: [4, 20, 5],
      inverted: true,
    });
    expect(() => pyramidSnapshot("energy", 101)).toThrow();
  });
  it("finds every producer path and removes only the frog's direct edges", () => {
    expect(foodWebSnapshot("hawk", false)).toMatchObject({
      levels: [3, 4],
      food: ["frog", "mouse"],
    });
    expect(foodWebSnapshot("frog", false)).toMatchObject({
      levels: [3],
      food: ["grasshopper"],
      predators: ["hawk"],
    });
    const removed = foodWebSnapshot("hawk", true);
    expect(removed.levels).toEqual([3]);
    expect(removed.food).toEqual(["mouse"]);
    expect(removed.edges).toHaveLength(3);
    expect(foodWebSnapshot("frog", true)).toMatchObject({
      removed: true,
      levels: [],
      food: [],
      predators: [],
    });
  });
  it("conserves element amounts in every offered transfer and never overdraws source", () => {
    for (const cycle of ["water", "carbon", "nitrogen"] as const)
      for (const process of cycleProcesses[cycle])
        for (const amount of [0, 10, 20]) {
          const m = cycleTransfer(cycle, process.id, amount);
          expect(m.total).toBe(100);
          expect(Object.values(m.after).every((n) => n >= 0)).toBe(true);
          expect(m.before[process.from] - m.after[process.from]).toBe(m.moved);
          expect(m.after[process.to] - m.before[process.to]).toBe(m.moved);
        }
    expect(cycleTransfer("nitrogen", "nitrify1", 10).after).toEqual({
      n2: 50,
      nh4: 10,
      no2: 20,
      no3: 10,
      organic: 10,
    });
    expect(cycleTransfer("nitrogen", "fixNitrogen", 10).after).toEqual({
      n2: 40,
      nh4: 30,
      no2: 10,
      no3: 10,
      organic: 10,
    });
    expect(cycleTransfer("nitrogen", "denitrify", 20)).toMatchObject({
      moved: 10,
      limited: true,
      after: { n2: 60, no3: 0 },
    });
    expect(() => cycleTransfer("water", "nitrify1", 10)).toThrow();
  });
  it("keeps legacy organic loading after source control and distinguishes litter from nutrients", () => {
    expect(lakeSnapshot(3, "litter")).toMatchObject({
      incoming: true,
      legacy: true,
      oxygenIndex: 2,
    });
    expect(lakeSnapshot(3, "nutrient")).toMatchObject({
      incoming: false,
      legacy: true,
      oxygenIndex: 2,
    });
    expect(lakeSnapshot(0, "none")).toMatchObject({ algae: 0, legacy: false });
    expect(() => lakeSnapshot(5, "none")).toThrow();
  });
  it("tracks resource drawdown, balance, capacity and unmet requests", () => {
    expect(resourceBudget(20, 30, 5)).toMatchObject({
      stocks: [100, 90, 80, 70, 60, 50],
      final: 50,
      net: -10,
      unmet: 0,
    });
    expect(resourceBudget(20, 20, 5).final).toBe(100);
    expect(resourceBudget(40, 0, 5).stocks.every((n) => n === 100)).toBe(true);
    expect(resourceBudget(0, 60, 3)).toMatchObject({
      stocks: [100, 40, 0, 0],
      unmet: 80,
    });
    expect(() => resourceBudget(20, 30, 0)).toThrow();
  });
});

describe("Six source-grounded ecology units", () => {
  it("keeps52deep sections,24workedexamples,24recall and60selfcontained original cards", () => {
    expect(forge014BiologyLessons).toHaveLength(6);
    expect(Object.values(forge014BiologyTopics)).toEqual([
      "detail-31",
      "detail-32",
      "detail-33",
      "detail-34",
      "detail-35",
      "detail-36",
    ]);
    expect(
      forge014BiologyGuides.reduce((n, g) => n + g.sections.length, 0),
    ).toBe(52);
    for (const guide of forge014BiologyGuides) {
      expect(
        guide.sections.every(
          (s) =>
            s.paragraphs.length === 2 &&
            s.paragraphs.every((p) => p.length > 200),
        ),
      ).toBe(true);
      expect(guide.examples).toHaveLength(4);
      expect(
        guide.examples.every(
          (e) => e.steps.length === 3 && e.check && e.pitfall,
        ),
      ).toBe(true);
      expect(guide.recall).toHaveLength(4);
    }
    const ids = new Set<string>();
    for (const lesson of forge014BiologyLessons) {
      expect(lesson.questions).toHaveLength(10);
      for (const q of lesson.questions) {
        expect(ids.has(q.id)).toBe(false);
        ids.add(q.id);
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(5);
        expect(q.prompt.tr).not.toMatch(
          /yukarıdaki şekil|önceki sayfa|bu metne göre/i,
        );
        expect(q.explanation.tr.length).toBeGreaterThan(80);
      }
    }
  });
  it("retains independently calculated numerical answers and scoped non-deterministic claims", () => {
    const answer = (id: string, n: number) => {
      const q = forge014BiologyLessons.find((l) => l.id === id)!.questions[
        n - 1
      ];
      return q.options[q.answer].tr;
    };
    expect(answer("ekoloji-giris", 8)).toBe(
      "A’da yoğunluk 4, B’de 2 birey/m²; birey sayıları eşittir",
    );
    expect(answer("besin-piramidi", 1)).toBe("100");
    expect(answer("besin-piramidi", 2)).toBe("400");
    expect(answer("besin-zinciri-agi", 5)).toBe("10");
    expect(answer("madde-donguleri", 7)).toBe("10 birim azalma");
    expect(answer("dogal-kaynaklar-surdurulebilirlik", 1)).toBe("50");
    expect(answer("dogal-kaynaklar-surdurulebilirlik", 7)).toBe("12");
  });
});
