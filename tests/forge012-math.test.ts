import { describe, expect, it } from "vitest";
import {
  forge012MathGuides,
  forge012MathLessons,
  forge012MathTopics,
  interestModel,
  mixtureModel,
  workerStages,
  poolFlow,
  relativeMotion,
  tripAverage,
} from "../src/learning/forge012Math";
it("connects all five reviewed headings and preserves meaningful independent questions", () => {
  expect(forge012MathTopics).toEqual({
    "faiz-problemleri": "detail-215",
    "karisim-problemleri": "detail-216",
    "isci-problemleri": "detail-217",
    "havuz-problemleri": "detail-218",
    "hiz-problemleri": "detail-219",
  });
  const revisedSections = new Map([
    ["faiz-problemleri", 14],
    ["karisim-problemleri", 14],
    ["isci-problemleri", 15],
    ["havuz-problemleri", 15],
    ["hiz-problemleri", 15],
  ]);
  for (const l of forge012MathLessons) {
    const g = forge012MathGuides.find((x) => x.id === l.id)!;
    const newSectionCount = revisedSections.get(l.id);
    expect(g.sections).toHaveLength(newSectionCount ?? 8);
    expect(g.examples.length).toBeGreaterThanOrEqual(4);
    expect(g.recall.length).toBeGreaterThanOrEqual(4);
    expect(l.questions).toHaveLength(newSectionCount === undefined ? 10 : 16);
    for (const q of l.questions) {
      expect(q.options).toHaveLength(5);
      expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
      expect(q.prompt.tr).not.toMatch(
        /yukarıdaki|aşağıdaki|önceki model|atölyedeki|seçtiğin/i,
      );
      expect(q.explanation.tr.length).toBeGreaterThan(100);
      expect(q.hint.tr.length).toBeGreaterThan(15);
    }
    expect(
      g.examples.every(
        (e) => e.steps.length >= 3 && e.answer && e.check && e.pitfall,
      ),
    ).toBe(true);
  }
});
it("independently verifies the original fifty authored answer keys", () => {
  const keys = [
    ["300", "4500", "18", "40", "7000", "7200", "4000", "Eşittir.", "0", "6"],
    ["25", "15", "25", "50", "24", "80", "40", "55", "50", "42"],
    ["3/8", "6", "14/3", "8", "12/5", "10", "60", "5", "6", "12"],
    ["14", "6", "18", "80", "Tank dolmaz.", "100", "34/5", "7", "4", "6"],
    [
      "2,5",
      "20",
      "40",
      "2",
      "11.00",
      "100",
      "20",
      "5",
      "200",
      "Yaya yetişemez.",
    ],
  ];
  forge012MathLessons.forEach((l, j) =>
    expect(
      l.questions.slice(0, keys[j].length).map((q) => q.options[q.answer].tr),
    ).toEqual(keys[j]),
  );
  expect((6000 * 0.12 * 5) / 12).toBe(300);
  expect(900 / (0.1 * 2)).toBe(4500);
  expect((360 / (4000 * 0.5)) * 100).toBe(18);
  expect(5000 * 1.2 ** 2).toBe(7200);
  expect(((5 + 45) / 200) * 100).toBe(25);
  expect(((50 + 50) / (200 + 50)) * 100).toBe(40);
  expect(((30 - 6) / 100) * 100).toBe(24);
  expect(1 / (1 / 10 + 1 / 15)).toBeCloseTo(6, 10);
  expect((1 - 2 * (1 / 8 + 1 / 12)) * 8).toBeCloseTo(14 / 3);
  expect(1 / (1 / 30 + 1 / 20) / 5).toBeCloseTo(12 / 5);
  expect(0.7 * 20).toBe(14);
  expect(1 / (1 / 8 + 1 / 12 - 1 / 24)).toBeCloseTo(6);
  expect(1 / (1 / 6 - 1 / 9)).toBeCloseTo(18);
  expect(120 / (60 / 30 + 60 / 60)).toBe(40);
  expect(210 / (50 + 55)).toBe(2);
  expect(400 / (6 - 4)).toBe(200);
});
describe("interest respects actual time units and explicit compounding periods", () => {
  it("calculates no gain at zero time/rate and simple proportionality", () => {
    expect(interestModel(5000, 10, 24, false)).toMatchObject({
      total: 6000,
      interest: 1000,
    });
    expect(interestModel(5000, 10, 0, false).interest).toBe(0);
    expect(interestModel(5000, 0, 24, true).interest).toBe(0);
    expect(interestModel(4800, 15, 8, false).interest).toBeCloseTo(480);
  });
  it("compounds only completed years with a defined partial-year rule", () => {
    expect(interestModel(5000, 10, 24, true).total).toBeCloseTo(6050);
    expect(interestModel(5000, 10, 6, true).total).toBe(5250);
    expect(interestModel(5000, 10, 18, true).total).toBe(5775);
    expect(() => interestModel(0, 10, 12, false)).toThrow();
    expect(() => interestModel(5000, 10, 1.5, true)).toThrow();
  });
});
describe("mixture conserves separately tracked solute and total mass", () => {
  it("distinguishes four similar operations", () => {
    expect(mixtureModel(200, 20, 50, "water")).toMatchObject({
      solute: 40,
      mass: 250,
      percent: 16,
    });
    expect(mixtureModel(200, 20, 50, "solute")).toMatchObject({
      solute: 90,
      mass: 250,
      percent: 36,
    });
    expect(mixtureModel(200, 20, 50, "evaporate").percent).toBeCloseTo(80 / 3);
    expect(mixtureModel(200, 20, 50, "replace")).toMatchObject({
      solute: 30,
      mass: 200,
      percent: 15,
    });
  });
  it("rejects evaporating more water than exists or withdrawing excess mixture", () => {
    expect(() => mixtureModel(200, 80, 50, "evaporate")).toThrow();
    expect(() => mixtureModel(200, 20, 201, "replace")).toThrow();
    expect(() => mixtureModel(0, 20, 1, "water")).toThrow();
    expect(mixtureModel(200, 20, 200, "replace")).toMatchObject({
      mass: 200,
      solute: 0,
      percent: 0,
    });
  });
});
describe("two-stage work ends before fictional extra production", () => {
  it("counts only the continuing worker and keeps total work one", () => {
    const a = workerStages(12, 18, 2, "a"),
      b = workerStages(12, 18, 2, "b");
    expect(a.firstA + a.firstB + a.remaining).toBeCloseTo(1);
    expect(a.total).toBeCloseTo(32 / 3);
    expect(b.total).toBeCloseTo(15);
    expect(b.extra).toBeCloseTo(13, 10);
  });
  it("does not continue a second stage after the first stage already completes", () => {
    const m = workerStages(6, 6, 6, "b");
    expect(m.actualFirst).toBe(3);
    expect(m.remaining).toBe(0);
    expect(m.extra).toBe(0);
    expect(m.total).toBe(3);
    expect(m.finishedBeforeChange).toBe(true);
    expect(() => workerStages(0, 12, 2, "a")).toThrow();
  });
});
describe("bounded tank flow has no negative physical water", () => {
  it("uses remaining volume and distinguishes elapsed time from completion time", () => {
    expect(poolFlow(800, 200, 20, 5, 20)).toMatchObject({
      net: 15,
      volume: 500,
      fillTime: 40,
      fraction: 0.625,
    });
    expect(poolFlow(800, 200, 20, 5, 60)).toMatchObject({
      volume: 800,
      overflow: 300,
    });
  });
  it("returns no finite fill time for zero or negative net flow", () => {
    expect(poolFlow(800, 200, 5, 5, 100)).toMatchObject({
      volume: 200,
      fillTime: null,
    });
    expect(poolFlow(800, 200, 5, 10, 60)).toMatchObject({
      volume: 0,
      emptyTime: 40,
      unmetOutflow: 100,
      fillTime: null,
    });
    expect(poolFlow(800, 800, 0, 0, 0).fillTime).toBe(0);
    expect(() => poolFlow(800, 900, 1, 1, 0)).toThrow();
  });
});
describe("relative motion and average keep direction and time separate", () => {
  it("requires actual closing motion", () => {
    expect(relativeMotion(120, 40, 60, 1, false)).toMatchObject({
      closing: 20,
      meeting: 6,
      first: 60,
      second: 160,
      gap: 100,
    });
    expect(relativeMotion(120, 40, 60, 1, true)).toMatchObject({
      closing: 100,
      meeting: 1.2,
      first: 60,
      second: 80,
      gap: 20,
    });
    expect(relativeMotion(18, 12, 4, 1, false).meeting).toBeNull();
    expect(relativeMotion(120, 40, 40, 0, false).meeting).toBeNull();
  });
  it("weighs speeds by actual time and includes explicit pauses", () => {
    expect(tripAverage([60, 60], [30, 60]).average).toBe(40);
    expect(tripAverage([90, 60], [60, 30], 0.5)).toMatchObject({
      distance: 150,
      moving: 3.5,
      total: 4,
      average: 37.5,
    });
    expect(tripAverage([0], [60], 0).average).toBeNull();
    expect(() => tripAverage([10], [0])).toThrow();
  });
});
