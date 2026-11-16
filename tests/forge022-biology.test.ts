import { describe, expect, it } from "vitest";
import { questionContentIssues } from "../src/domain/questionContent";
import {
  forge022BiologyLessons,
  forge022BiologyGuides,
  forge022BiologyTopics,
  fermentation022,
  photoRespiration022,
  meristem022,
  groundTissue022,
  phloem022,
} from "../src/learning/forge022Biology";

describe("five biology pathways, tissue models and independent learning cards", () => {
  it("preserves five exact topic identities, complete contexts and rotated option-level help", () => {
    expect(Object.values(forge022BiologyTopics)).toEqual([
      "detail-340",
      "detail-341",
      "detail-342",
      "detail-343",
      "detail-344",
    ]);
    expect(forge022BiologyLessons).toHaveLength(5);
    expect(forge022BiologyGuides).toHaveLength(5);
    const questions = forge022BiologyLessons.flatMap((l) => l.questions);
    expect(questions).toHaveLength(60);
    expect(new Set(questions.map((q) => q.id)).size).toBe(60);
    for (const q of questions) {
      expect(q.options).toHaveLength(5);
      expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
      expect(questionContentIssues(q)).toEqual([]);
      const guidance = (
        q as typeof q & {
          guidance: {
            knowledge: string[];
            strategy: string;
            steps: string[];
            optionReasons: string[];
            commonError: string;
            check: string;
          };
        }
      ).guidance;
      expect(guidance.steps).toHaveLength(3);
      expect(guidance.optionReasons).toHaveLength(5);
      expect(guidance.optionReasons[q.answer]).toBe(guidance.steps.join(" "));
      expect(guidance.optionReasons.every((r) => r.trim().length > 20)).toBe(
        true,
      );
      expect(q.hint.tr).toBe(guidance.strategy);
      expect(q.explanation.tr).toContain(guidance.check);
    }
    for (const guide of forge022BiologyGuides) {
      expect(guide.sections.length).toBeGreaterThanOrEqual(10);
      expect(guide.sections.every((s) => s.paragraphs.length === 2)).toBe(true);
      expect(guide.examples).toHaveLength(4);
      expect(
        guide.examples.every(
          (e) =>
            e.steps.length === 3 && e.check.length > 0 && e.pitfall.length > 0,
        ),
      ).toBe(true);
      expect(guide.recall).toHaveLength(4);
    }
  });

  it("conserves canonical fermentation carbon and recycles NAD without extra terminal ATP", () => {
    const alcohol = fermentation022(5, 2, "alcohol"),
      lactate = fermentation022(5, 2, "lactate");
    expect(alcohol).toMatchObject({
      glucoseLeft: 3,
      product: 4,
      co2: 4,
      spentATP: 4,
      grossATP: 8,
      netATP: 4,
      carbonRemaining: 18,
      carbonProduct: 8,
      carbonGas: 4,
      carbonInitial: 30,
    });
    expect(lactate).toMatchObject({
      product: 4,
      co2: 0,
      carbonProduct: 12,
      nadRegenerated: 4,
      netATP: 4,
    });
    for (let stock = 0; stock <= 10; stock++)
      for (let processed = 0; processed <= stock; processed++)
        for (const route of ["alcohol", "lactate"] as const) {
          const m = fermentation022(stock, processed, route);
          expect(m.carbonRemaining + m.carbonProduct + m.carbonGas).toBe(
            m.carbonInitial,
          );
          expect(m.grossATP - m.spentATP).toBe(m.netATP);
          expect(m.nadHFormed).toBe(m.nadHUsed);
          expect(m.nadHUsed).toBe(m.nadRegenerated);
          expect(m.oxygenUsed).toBe(0);
        }
    expect(fermentation022(5, 0, "alcohol").co2).toBe(0);
  });

  it("distinguishes instantaneous compensation from daily loss and counts all 24 respiratory hours", () => {
    expect(photoRespiration022(8, 3, 12)).toMatchObject({
      fixed: 96,
      released: 72,
      net: 24,
      lightRespiration: 36,
      darkRespiration: 36,
      dailyDirection: "gain",
    });
    expect(photoRespiration022(4, 4, 10)).toMatchObject({
      compensation: true,
      litNet: 0,
      net: -56,
      dailyDirection: "loss",
    });
    expect(photoRespiration022(12, 4, 8)).toMatchObject({
      net: 0,
      dailyDirection: "equal",
    });
    expect(photoRespiration022(12, 4, 0)).toMatchObject({ fixed: 0, net: -96 });
    for (const p of [0, 1, 7, 30])
      for (const r of [0, 1, 4, 10])
        for (const light of [0, 4, 12, 24]) {
          const m = photoRespiration022(p, r, light);
          expect(m.lightRespiration + m.darkRespiration).toBe(r * 24);
          expect(m.net).toBe((p - r) * light - r * (24 - light));
          expect(m.netOxygen).toBe(m.net);
        }
  });

  it("separates cell production, division events, elongation and daughter chromosome count", () => {
    expect(meristem022(3, 3, 2)).toMatchObject({
      finalCells: 24,
      newCells: 21,
      divisions: 21,
      volumeBeforeElongation: 24,
      finalVolume: 48,
      daughterChromosomes: 8,
    });
    for (let founders = 1; founders <= 8; founders++)
      for (let rounds = 0; rounds <= 4; rounds++) {
        const m = meristem022(founders, rounds, 3);
        expect(m.finalCells).toBe(founders * 2 ** rounds);
        expect(m.divisions).toBe(
          founders *
            Array.from({ length: rounds }, (_, k) => 2 ** k).reduce(
              (a, b) => a + b,
              0,
            ),
        );
        expect(m.finalVolume).toBe(m.finalCells * 3);
        expect(meristem022(founders, rounds, 1).finalCells).toBe(m.finalCells);
      }
  });

  it("uses the stated denominator for mesophyll areas and closes all three area stocks", () => {
    expect(groundTissue022(1000, 20, 75)).toMatchObject({
      air: 200,
      cells: 800,
      palisade: 600,
      spongyCells: 200,
      palisadePercentOfTotal: 60,
    });
    expect(groundTissue022(1200, 25, 40)).toMatchObject({
      air: 300,
      palisade: 360,
      spongyCells: 540,
    });
    const tiny = groundTissue022(2000, Number.MIN_VALUE, Number.MIN_VALUE);
    expect(tiny.air).toBe(20 * Number.MIN_VALUE);
    expect(tiny.palisade).toBe(20 * Number.MIN_VALUE);
    for (const total of [100, 800, 2000])
      for (const air of [0, 20, 50])
        for (const p of [0, 50, 100]) {
          const m = groundTissue022(total, air, p);
          expect(m.air + m.palisade + m.spongyCells).toBeCloseTo(total, 10);
          expect(m.palisade + m.spongyCells).toBe(m.cells);
          expect(m.palisade).toBeLessThanOrEqual(m.cells);
        }
  });

  it("caps transfer at finite stock, preserves solution volume and separates zero/exact/excess capacity", () => {
    expect(phloem022(40, 2, 8, 2, 3, 4, "leaf")).toMatchObject({
      difference: 6,
      rate: 2,
      capacity: 16,
      transferred: 16,
      remaining: 24,
      volume: 8,
      activeHours: 4,
      direction: "down",
    });
    expect(phloem022(10, 2, 8, 2, 3, 4, "tuber")).toMatchObject({
      transferred: 10,
      remaining: 0,
      volume: 5,
      activeHours: 2.5,
      stockLimited: true,
      direction: "up",
    });
    expect(phloem022(16, 2, 8, 2, 3, 4, "leaf")).toMatchObject({
      capacity: 16,
      remaining: 0,
      activeHours: 4,
      stockLimited: false,
    });
    expect(phloem022(40, 2, 1, 2, 3, 4, "leaf")).toMatchObject({
      rate: 0,
      transferred: 0,
      activeHours: 0,
      direction: "none",
    });
    for (const stock of [0, 5, 40, 100])
      for (const concentration of [1, 2, 5])
        for (const p of [0, 2, 10])
          for (const hours of [0, 1, 10]) {
            const m = phloem022(stock, concentration, p, 2, 3, hours, "leaf");
            expect(m.transferred + m.remaining).toBeCloseTo(stock, 12);
            expect(m.volume + m.donorFinalVolume).toBeCloseTo(
              m.donorInitialVolume,
              12,
            );
            expect(m.transferred).toBeLessThanOrEqual(stock);
            expect(m.transferred).toBeGreaterThanOrEqual(0);
            expect(m.activeHours).toBeLessThanOrEqual(hours);
          }
  });

  it("rejects invalid pathways, stocks, geometry and unsupported domain values", () => {
    for (const invalid of [
      () => fermentation022(1, 2, "lactate"),
      () => fermentation022(2, 1, "other" as never),
      () => photoRespiration022(1, 1, 25),
      () => photoRespiration022(NaN, 1, 12),
      () => meristem022(1, 1.5, 1),
      () => meristem022(0, 2, 1),
      () => groundTissue022(1000, 80, 50),
      () => groundTissue022(1000, 20, Infinity),
      () => phloem022(10, 0, 8, 2, 3, 1, "leaf"),
      () => phloem022(10, 2, 8, 2, 0, 1, "leaf"),
      () => phloem022(10, 2, 8, 2, 3, -1, "leaf"),
      () => phloem022(1, 5, Number.MIN_VALUE, 0, 10, 10, "leaf"),
    ])
      expect(invalid).toThrow(RangeError);
  });
});
