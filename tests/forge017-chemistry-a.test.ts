import { describe, expect, it } from "vitest";
import { questionContentIssues } from "../src/domain/questionContent";
import {
  carbonate017,
  foodLabel017,
  forge017ChemistryAGuides,
  forge017ChemistryALessons,
  forge017ChemistryATopics,
  metal017,
  polymer017,
  soap017,
} from "../src/learning/forge017ChemistryA";

describe("five source-based chemistry units 189–193", () => {
  it("provides self-contained theory, conditional examples and five-option independent practice", () => {
    expect(Object.values(forge017ChemistryATopics)).toEqual([
      "detail-189",
      "detail-190",
      "detail-191",
      "detail-192",
      "detail-193",
    ]);
    expect(forge017ChemistryALessons).toHaveLength(5);
    const allQuestionIds = forge017ChemistryALessons.flatMap((l) =>
      l.questions.map((q) => q.id),
    );
    expect(new Set(allQuestionIds).size).toBe(50);
    for (const lesson of forge017ChemistryALessons) {
      const guide = forge017ChemistryAGuides.find((g) => g.id === lesson.id)!;
      expect(guide.sections.length).toBeGreaterThanOrEqual(10);
      expect(guide.examples).toHaveLength(4);
      expect(guide.recall).toHaveLength(4);
      expect(lesson.questions).toHaveLength(10);
      for (const section of guide.sections) {
        expect(section.paragraphs).toHaveLength(2);
        expect(section.paragraphs.every((p) => p.trim().length >= 100)).toBe(
          true,
        );
      }
      for (const example of guide.examples) {
        expect(example.steps).toHaveLength(3);
        expect(example.prompt.trim().length).toBeGreaterThan(40);
        expect(example.check.trim()).not.toBe("");
        expect(example.pitfall.trim()).not.toBe("");
      }
      for (const q of lesson.questions) {
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(5);
        expect(questionContentIssues(q)).toEqual([]);
      }
    }
  });
  it("keeps acid identity, metal surplus and electron transfer separate", () => {
    const mg = metal017("mg", 0.2, 0.3);
    expect(mg).toMatchObject({
      gas: 0.15,
      reagentLeft: 0,
      limiter: "reagent",
      electronMol: 0.3,
    });
    expect(mg.metalLeft).toBeCloseTo(0.05);
    expect(metal017("mg", 0.2, 0.6).gas).toBeCloseTo(0.2);
    expect(metal017("cu-hcl", 0.3, 0.8)).toMatchObject({
      gas: 0,
      metalLeft: 0.3,
      reagentLeft: 0.8,
      electronMol: 0,
      limiter: "no-reaction",
    });
    expect(metal017("mg", 0, 0).limiter).toBe("none");
  });
  it("uses the given nitric acid condition to change both gas identity and amount", () => {
    const dilute = metal017("cu-dilute", 0.3, 0.8),
      concentrated = metal017("cu-conc", 0.3, 0.8);
    expect(dilute.chosen.gas).toBe("NO");
    expect(dilute.gas).toBeCloseTo(0.2);
    expect(dilute.metalLeft).toBeCloseTo(0);
    expect(concentrated.chosen.gas).toBe("NO₂");
    expect(concentrated.gas).toBeCloseTo(0.4);
    expect(concentrated.metalLeft).toBeCloseTo(0.1);
    expect(dilute.electronMol).toBeCloseTo(3 * dilute.gas);
    expect(concentrated.electronMol).toBeCloseTo(concentrated.gas);
  });
  it("keeps the aqueous base complex stoichiometry distinct from Al in acid", () => {
    const base = metal017("al-base", 0.12, 0.2),
      acid = metal017("al-acid", 0.12, 0.2);
    expect(base.gas).toBeCloseTo(0.18);
    expect(base.reagentLeft).toBeCloseTo(0.08);
    expect(base.electronMol).toBeCloseTo(0.36);
    expect(acid.gas).toBeCloseTo(0.1);
    expect(acid.metalLeft).toBeCloseTo(0.12 - 0.2 / 3);
    expect(metal017("al-base", Number.NaN, Infinity).gas).toBe(0);
  });
  it("balances a supplied acid budget without inferring it from pH or treating it as erosion speed", () => {
    expect(carbonate017(0.1, 0.1)).toMatchObject({
      gas: 0.05,
      stoneLeft: 0.05,
      acidLeft: 0,
      lostGram: 5,
      leftGram: 5,
    });
    expect(carbonate017(0.1, 0.4)).toMatchObject({
      gas: 0.1,
      stoneLeft: 0,
      acidLeft: 0.2,
      lostGram: 10,
    });
    for (let stone = 0; stone <= 20; stone++)
      for (let acid = 0; acid <= 80; acid++) {
        const m = carbonate017(stone / 100, acid / 100);
        expect(m.stoneLeft + m.calcium).toBeCloseTo(stone / 100);
        expect(m.acidLeft + 2 * m.gas).toBeCloseTo(acid / 100);
        expect(m.calcium).toBeCloseTo(m.gas);
        expect(m.lostGram + m.leftGram).toBeCloseTo(stone);
      }
  });
  it("conserves two soap anions per calcium precipitate, including zero free soap", () => {
    expect(soap017(10, 3)).toMatchObject({
      precipitate: 3,
      soapLeft: 4,
      calciumLeft: 0,
    });
    expect(soap017(10, 8)).toMatchObject({
      precipitate: 5,
      soapLeft: 0,
      calciumLeft: 3,
    });
    expect(soap017(0, 8)).toMatchObject({
      precipitate: 0,
      soapLeft: 0,
      calciumLeft: 8,
    });
    for (let s = 0; s <= 20; s++)
      for (let c = 0; c <= 12; c++) {
        const m = soap017(s, c);
        expect(m.soapLeft + 2 * m.precipitate).toBe(s);
        expect(m.calciumLeft + m.precipitate).toBe(c);
        expect(Math.min(m.soapLeft, m.calciumLeft)).toBe(0);
      }
  });
  it("counts only repeat-unit atoms and mass, not a fictional full chain", () => {
    expect(polymer017("pe", 6)).toMatchObject({
      atoms: { C: 12, H: 24, Cl: 0, F: 0 },
      repeatMass: 28,
      segmentMass: 168,
    });
    expect(polymer017("pvc", 4)).toMatchObject({
      atoms: { C: 8, H: 12, Cl: 4, F: 0 },
      segmentMass: 250,
    });
    expect(polymer017("ptfe", 3)).toMatchObject({
      atoms: { C: 6, H: 0, Cl: 0, F: 12 },
      segmentMass: 300,
    });
    expect(polymer017("pe", Number.NaN).count).toBe(2);
    expect(polymer017("pvc", 100).count).toBe(8);
  });
  it("scales actual label grams and keeps saturated fat inside total fat", () => {
    expect(foodLabel017(35)).toEqual({
      portion: 35,
      fat: 7,
      saturated: 2.8,
      carbohydrate: 10.5,
      protein: 1.75,
    });
    expect(foodLabel017(50)).toEqual({
      portion: 50,
      fat: 10,
      saturated: 4,
      carbohydrate: 15,
      protein: 2.5,
    });
    expect(foodLabel017(0)).toEqual({
      portion: 0,
      fat: 0,
      saturated: 0,
      carbohydrate: 0,
      protein: 0,
    });
    for (let portion = 0; portion <= 100; portion++) {
      const m = foodLabel017(portion);
      expect(m.saturated).toBeLessThanOrEqual(m.fat);
      expect(m.fat + m.carbohydrate + m.protein).toBeLessThanOrEqual(portion);
    }
  });
});
