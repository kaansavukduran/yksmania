import { describe, expect, it } from "vitest";
import { questionContentIssues } from "../src/domain/questionContent";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
import {
  guardWater023,
  rootPath023,
  surfaceNames023,
  surfaceFacts023,
  rootZoneNames023,
  rootZoneFacts023,
  forge023BiologyTopics,
  forge023BiologyGuides,
  forge023BiologyLessons,
} from "../src/learning/forge023Biology";

describe("cover tissue and root anatomy with explicit compartment and barrier conditions", () => {
  it("teaches two exact new headings with complete independent five-option questions and genuine option-level help", () => {
    expect(Object.values(forge023BiologyTopics)).toEqual([
      "detail-345",
      "detail-346",
    ]);
    expect(forge023BiologyLessons.map((l) => l.questions.length)).toEqual([
      18, 20,
    ]);
    expect(forge023BiologyGuides.map((g) => g.sections.length)).toEqual([
      18, 20,
    ]);
    const cards = forge023BiologyLessons.flatMap((l) => l.questions);
    expect(new Set(cards.map((q) => q.id)).size).toBe(38);
    for (const q of cards) {
      expect(q.options).toHaveLength(5);
      expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
      expect(questionContentIssues(q)).toEqual([]);
      const h = questionGuidanceSchema.parse(q.guidance);
      expect(h.steps).toHaveLength(3);
      expect(h.optionReasons).toHaveLength(5);
      expect(h.optionReasons[q.answer].length).toBeGreaterThan(30);
      expect(h.optionReasons.every((reason) => reason.length > 20)).toBe(true);
      expect(q.explanation.tr).toContain(h.optionReasons[q.answer]);
      expect(q.explanation.tr).toContain(h.check);
      expect(q.hint.tr).toBe(h.strategy);
    }
    expect(new Set(cards.map((q) => q.guidance!.commonError)).size).toBe(38);
    expect(new Set(cards.map((q) => q.guidance!.check)).size).toBe(38);
    for (const g of forge023BiologyGuides) {
      expect(g.examples).toHaveLength(6);
      expect(g.recall).toHaveLength(6);
      for (const s of g.sections) {
        expect(s.paragraphs).toHaveLength(2);
        expect(s.paragraphs.every((p) => p.length > 120)).toBe(true);
      }
      for (const e of g.examples) {
        expect(e.steps).toHaveLength(3);
        expect(e.answer.length).toBeGreaterThan(10);
        expect(e.check.length).toBeGreaterThan(15);
      }
    }
  });
  it("adds pressure exactly on the stated tenth-MPa grid before comparing two total potentials", () => {
    expect(guardWater023(-12, 4, -3)).toMatchObject({
      cell: -0.8,
      outside: -0.3,
      difference: 0.5,
      direction: "in",
    });
    expect(guardWater023(-12, 9, -3)).toMatchObject({
      cell: -0.3,
      difference: 0,
      direction: "equal",
    });
    expect(guardWater023(-12, 9, -15)).toMatchObject({
      cell: -0.3,
      outside: -1.5,
      direction: "out",
    });
    expect(guardWater023(-12, 0, -3).openingFraction).toBe(0);
    expect(guardWater023(-12, 15, -3).openingFraction).toBe(1);
    for (let s = -30; s <= 0; s++)
      for (let p = 0; p <= 15; p++)
        for (let e = -30; e <= 0; e++) {
          const m = guardWater023(s, p, e),
            difference = e - s - p;
          expect(m.cellTenths).toBe(s + p);
          expect(m.differenceTenths).toBe(difference);
          expect(m.direction).toBe(
            difference > 0 ? "in" : difference < 0 ? "out" : "equal",
          );
        }
  });
  it("keeps current turgor and current net water direction separate", () => {
    const a = guardWater023(-12, 9, -3),
      b = guardWater023(-12, 9, -15);
    expect(a.openingFraction).toBe(b.openingFraction);
    expect(a.direction).not.toBe(b.direction);
    expect(guardWater023(-30, 15, 0).direction).toBe("in");
    expect(guardWater023(0, 15, -30).direction).toBe("out");
  });
  it("blocks an impermeant wall tracer at an intact band and isolates the experimental wall breach", () => {
    expect(rootPath023("apoplast", true, "tracer", true, 12, 3)).toMatchObject({
      needsMembrane: true,
      canPass: false,
      blockedAt: "endodermis",
      arrived: 0,
      notArrived: 12,
    });
    expect(
      rootPath023("apoplast", false, "tracer", false, 12, 3),
    ).toMatchObject({
      needsMembrane: false,
      canPass: true,
      blockedAt: null,
      arrived: 12,
      notArrived: 0,
    });
    for (const band of [false, true])
      for (const route of ["symplast", "transmembrane"] as const) {
        expect(rootPath023(route, band, "tracer", true, 12, 3)).toMatchObject({
          needsMembrane: true,
          canPass: false,
          blockedAt: "entry",
          arrived: 0,
        });
      }
  });
  it("does not treat water, a specified ion and an impermeant dye as having the same membrane permeability", () => {
    for (const route of ["apoplast", "symplast", "transmembrane"] as const) {
      expect(rootPath023(route, true, "water", false, 18, 3).arrived).toBe(18);
      expect(rootPath023(route, true, "ion", false, 18, 3).arrived).toBe(0);
      expect(rootPath023(route, true, "ion", true, 18, 3).arrived).toBe(18);
    }
    expect(rootPath023("apoplast", false, "ion", false, 18, 3).arrived).toBe(
      18,
    );
  });
  it("conserves every counted unit at all manually selected stages without manufacturing a physiological rate", () => {
    for (const route of ["apoplast", "symplast", "transmembrane"] as const)
      for (const band of [false, true])
        for (const cargo of ["water", "ion", "tracer"] as const)
          for (const entry of [false, true])
            for (let count = 0; count <= 24; count++)
              for (let stage = 0; stage <= 3; stage++) {
                const m = rootPath023(route, band, cargo, entry, count, stage);
                expect(m.arrived + m.notArrived).toBe(count);
                expect(m.arrived).toBe(stage === 3 && m.canPass ? count : 0);
                expect(m.reachedStage).toBeLessThanOrEqual(stage);
                expect(m.reachedStage).toBeGreaterThanOrEqual(0);
              }
  });
  it("retains surface and growth-region distinctions that matter to the supplied sources", () => {
    expect(Object.keys(surfaceNames023)).toHaveLength(8);
    expect(Object.keys(rootZoneNames023)).toHaveLength(4);
    expect(surfaceFacts023.cuticle.structure).toContain("hücresiz");
    expect(surfaceFacts023.periderm.structure).toContain("canlı");
    expect(surfaceFacts023.lenticel.evidence).toContain("O₂, CO₂");
    expect(surfaceFacts023.rootHair.evidence).toContain("yan kök değildir");
    expect(rootZoneFacts023.division).toContain("yeni hücre");
    expect(rootZoneFacts023.elongation).toContain("Aynı hücre sayısında");
    const cover = forge023BiologyGuides[0].sections[5].paragraphs[0];
    expect(cover).toContain("Matrik ve yerçekimi");
    expect(cover).toContain("basınç potansiyeli");
  });
  it("rejects off-grid, non-finite, out-of-scope, unknown route and malformed boolean inputs", () => {
    for (const n of [NaN, Infinity, -Infinity, -31, 1, -1.2])
      expect(() => guardWater023(n, 4, -3)).toThrow(RangeError);
    for (const n of [NaN, Infinity, -1, 16, 0.1])
      expect(() => guardWater023(-12, n, -3)).toThrow(RangeError);
    for (const n of [NaN, Infinity, -31, 1, 0.1])
      expect(() => guardWater023(-12, 4, n)).toThrow(RangeError);
    for (const n of [NaN, Infinity, -1, 25, 0.5])
      expect(() => rootPath023("apoplast", true, "water", true, n, 3)).toThrow(
        RangeError,
      );
    for (const n of [NaN, Infinity, -1, 4, 0.5])
      expect(() => rootPath023("apoplast", true, "water", true, 12, n)).toThrow(
        RangeError,
      );
    expect(() =>
      rootPath023("bad" as never, true, "water", true, 12, 3),
    ).toThrow(RangeError);
    expect(() =>
      rootPath023("apoplast", true, "bad" as never, true, 12, 3),
    ).toThrow(RangeError);
    expect(() =>
      rootPath023("apoplast", "true" as never, "water", true, 12, 3),
    ).toThrow(RangeError);
    expect(() =>
      rootPath023("apoplast", true, "water", 1 as never, 12, 3),
    ).toThrow(RangeError);
  });
});
