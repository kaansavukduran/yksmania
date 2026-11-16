import { describe, it, expect, vi } from "vitest";
import { createElement } from "react";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { questionContentIssues } from "../src/domain/questionContent";
const mocked = vi.hoisted(() => ({
  values: {} as Record<string, Record<string, string | number | boolean>>,
}));
vi.mock("../src/learning/useExploration", () => ({
  useExploration: (
    key: string,
    defaults: Record<string, string | number | boolean>,
  ) => [{ ...defaults, ...mocked.values[key] }, () => {}],
}));
import Lab from "../src/learning/Forge021ChemistryLab";
import {
  forge021ChemistryLessons as lessons,
  forge021ChemistryGuides as guides,
  forge021ChemistryTopics as topics,
  solubilityFactors021,
  redoxLedger021,
  redoxFamilies021,
  activity021,
  activityCouples021,
  type Metal021,
} from "../src/learning/forge021Chemistry";
describe("Three source-based chemistry021 models and standalone teaching", () => {
  it("provides the three exact topics with46 two-paragraph sections and12 full examples", () => {
    expect(Object.values(topics)).toEqual([
      "detail-437",
      "detail-438",
      "detail-439",
    ]);
    expect(guides.reduce((n, g) => n + g.sections.length, 0)).toBe(46);
    expect(
      guides.reduce(
        (n, g) => n + g.sections.reduce((m, s) => m + s.paragraphs.length, 0),
        0,
      ),
    ).toBe(92);
    for (const g of guides) {
      expect(g.sections.length).toBeGreaterThanOrEqual(10);
      expect(g.examples).toHaveLength(4);
      expect(g.recall.length).toBeGreaterThanOrEqual(4);
      for (const s of g.sections) {
        expect(s.paragraphs).toHaveLength(2);
        expect(s.paragraphs.every((p) => p.length > 100)).toBe(true);
      }
      for (const e of g.examples) {
        expect(e.steps).toHaveLength(3);
        expect(e.steps.every((s) => s.explanation.length > 40)).toBe(true);
        expect(e.check.length).toBeGreaterThan(25);
        expect(e.pitfall.length).toBeGreaterThan(25);
      }
    }
  });
  it("keeps30 five-choice cards self-contained without missing media", () => {
    const ids = new Set<string>();
    for (const l of lessons) {
      expect(l.subjectId).toBe("ayt-kimya");
      expect(l.questions).toHaveLength(10);
      for (const q of l.questions) {
        expect(ids.has(q.id)).toBe(false);
        ids.add(q.id);
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((x) => x.tr)).size).toBe(5);
        expect(questionContentIssues(q), q.id).toEqual([]);
        expect(q.hint.tr.length).toBeGreaterThan(15);
        expect(q.explanation.tr.length).toBeGreaterThan(70);
      }
    }
    expect(ids.size).toBe(30);
  });
  it("uses exact common-ion contribution rather than always neglecting the salt", () => {
    const pure = solubilityFactors021("endo", 25, 0, 0.1, 1),
      common = solubilityFactors021("endo", 25, 0.03, 0.1, 1);
    expect(pure.saturation).toBeCloseTo(0.02, 14);
    expect(common.saturation).toBeCloseTo(0.01, 14);
    expect(common.mIon).toBeCloseTo(0.04, 14);
    expect(common.xIon).toBeCloseTo(0.01, 14);
    expect(common.k).toBe(pure.k);
    expect(common.mIon).toBeGreaterThan(pure.mIon);
    expect(common.dissolved + common.solid).toBeCloseTo(0.1, 14);
  });
  it("distinguishes actual undersaturation after all solid dissolves", () => {
    const a = solubilityFactors021("endo", 25, 0, 0.012, 1),
      b = solubilityFactors021("endo", 25, 0, 0.012, 2);
    expect(a.phase).toBe("unsaturated");
    expect(a.solid).toBe(0);
    expect(a.actual).toBe(0.012);
    expect(a.quotient).toBeCloseTo(0.000144, 14);
    expect(b.actual).toBe(0.006);
    expect(b.quotient).toBeCloseTo(0.000036, 14);
    expect(b.saturation).toBe(a.saturation);
    expect(b.dissolved).toBe(a.dissolved);
  });
  it("keeps supplied temperature directions distinct from a fictional universal K law", () => {
    for (const common of [0, 0.01, 0.1]) {
      const cold = solubilityFactors021("endo", 10, common, 0.1, 1),
        hot = solubilityFactors021("endo", 40, common, 0.1, 1);
      expect(hot.k).toBeGreaterThan(cold.k);
      expect(hot.saturation).toBeGreaterThan(cold.saturation);
      expect(solubilityFactors021("exo", 10, common, 0.1, 1).k).toBe(hot.k);
      expect(solubilityFactors021("exo", 40, common, 0.1, 1).k).toBe(cold.k);
    }
  });
  it("preserves both ionic stocks and phase budgets over bounded solution states", () => {
    for (const thermal of ["endo", "exo"] as const)
      for (const temperature of [10, 25, 40])
        for (const common of [0, 0.005, 0.03, 0.1])
          for (const amount of [0, 0.005, 0.025, 0.12])
            for (const volume of [0.25, 1, 2]) {
              const m = solubilityFactors021(
                thermal,
                temperature,
                common,
                amount,
                volume,
              );
              expect(m.dissolved + m.solid).toBeCloseTo(amount, 13);
              expect(m.mInventory).toBeCloseTo(common * volume + amount, 13);
              expect(m.xInventory).toBeCloseTo(amount, 13);
              expect(m.chargeResidual).toBeCloseTo(0, 13);
              expect(m.quotient).toBeLessThanOrEqual(m.k + 1e-15);
              expect(m.solid).toBeGreaterThanOrEqual(0);
              expect(Number.isFinite(m.saturation)).toBe(true);
              if (m.solid > 0) expect(m.quotient).toBeCloseTo(m.k, 13);
            }
  });
  it("balances acid permanganate with five Fe units and+17 charge", () => {
    const m = redoxLedger021("mnAcid", 1, 5);
    expect(m.complete).toBe(true);
    expect(m.minimal).toBe(true);
    expect(m.received).toBe(5);
    expect(m.given).toBe(5);
    expect(m.chargeLeft).toBe(17);
    expect(m.chargeRight).toBe(17);
    expect(m.left).toEqual([
      { id: "perm", coefficient: 1 },
      { id: "proton", coefficient: 8 },
      { id: "ferrous", coefficient: 5 },
    ]);
    expect(m.right).toEqual([
      { id: "mn", coefficient: 1 },
      { id: "water", coefficient: 4 },
      { id: "ferric", coefficient: 5 },
    ]);
  });
  it("counts both Cr atoms in the six-electron acid half", () => {
    const m = redoxLedger021("crAcid", 1, 6);
    expect(m.received).toBe(6);
    expect(m.chargeLeft).toBe(24);
    expect(m.chargeRight).toBe(24);
    expect(m.atoms.find((x) => x.symbol === "Cr")).toEqual({
      symbol: "Cr",
      left: 2,
      right: 2,
    });
    expect(m.atoms.find((x) => x.symbol === "H")).toEqual({
      symbol: "H",
      left: 14,
      right: 14,
    });
    expect(m.complete && m.minimal).toBe(true);
  });
  it("cancels basic water and hydroxide without losing the one remaining water", () => {
    const m = redoxLedger021("mnBase", 2, 3);
    expect(m.complete && m.minimal).toBe(true);
    expect(m.received).toBe(6);
    expect(m.chargeLeft).toBe(-8);
    expect(m.chargeRight).toBe(-8);
    expect(m.left.find((x) => x.id === "water")?.coefficient).toBe(1);
    expect(m.right.find((x) => x.id === "hydroxide")?.coefficient).toBe(2);
    expect(m.left.some((x) => x.id === "hydroxide")).toBe(false);
    expect(m.right.some((x) => x.id === "water")).toBe(false);
    expect(m.atoms.find((x) => x.symbol === "O")).toEqual({
      symbol: "O",
      left: 18,
      right: 18,
    });
  });
  it("separates open electron budgets, balanced multiples and empty operations", () => {
    const open = redoxLedger021("mnAcid", 1, 1);
    expect(open.complete).toBe(false);
    expect(open.received - open.given).toBe(4);
    expect(open.chargeLeft - open.chargeRight).toBe(4);
    const large = redoxLedger021("mnAcid", 2, 10);
    expect(large.complete).toBe(true);
    expect(large.minimal).toBe(false);
    expect(redoxLedger021("mnBase", 0, 0).complete).toBe(false);
  });
  it("keeps atoms and chemical charge tied to the electron ledger in every multiplier pair", () => {
    for (const family of Object.keys(
      redoxFamilies021,
    ) as (keyof typeof redoxFamilies021)[])
      for (let red = 0; red <= 12; red++)
        for (let ox = 0; ox <= 12; ox++) {
          const m = redoxLedger021(family, red, ox);
          expect(m.atoms.every((a) => a.left === a.right)).toBe(true);
          expect(m.chargeLeft - m.chargeRight).toBe(m.received - m.given);
          expect(m.complete).toBe(red > 0 && ox > 0 && m.received === m.given);
          if (m.minimal) {
            expect(m.reduction).toBe(m.minimumReduction);
            expect(m.oxidation).toBe(m.minimumOxidation);
          }
        }
  });
  it("uses the literal source potentials and does not multiply E by stoichiometry", () => {
    expect(activity021("Cu", "Ag")).toMatchObject({
      deltaMillivolts: 462,
      donorCount: 1,
      acceptorIonCount: 2,
      productCount: 2,
      electrons: 2,
      direction: "forward",
    });
    expect(activity021("Cr", "Pb")).toMatchObject({
      deltaMillivolts: 618,
      donorCount: 2,
      acceptorIonCount: 3,
      productCount: 3,
      electrons: 6,
    });
    expect(activity021("Ag", "Zn")).toMatchObject({
      deltaMillivolts: -1562,
      direction: "reverse",
    });
    expect(activity021("Zn", "Zn").direction).toBe("same");
    expect(activity021("Cr", "H")).toMatchObject({
      donorCount: 2,
      acceptorIonCount: 6,
      productCount: 3,
      electrons: 6,
      deltaMillivolts: 744,
    });
  });
  it("conserves ionic charge for every permitted donor and acceptor", () => {
    for (const donor of ["Zn", "Cr", "Pb", "Cu", "Ag"] as Metal021[])
      for (const acceptor of Object.keys(
        activityCouples021,
      ) as (keyof typeof activityCouples021)[]) {
        const m = activity021(donor, acceptor);
        expect(m.donorCount * m.a.charge).toBe(m.electrons);
        expect(m.chargeLeft).toBe(m.chargeRight);
        expect(m.acceptorIonCount * (acceptor === "H" ? 1 : m.b.charge)).toBe(
          m.electrons,
        );
        expect(m.volts).toBe(m.deltaMillivolts / 1000);
        expect(m.direction).toBe(
          m.deltaMillivolts > 0
            ? "forward"
            : m.deltaMillivolts < 0
              ? "reverse"
              : "same",
        );
      }
  });
  it("rejects foreign/prototype selectors and numerical states outside the stated model", () => {
    for (const bad of ["__proto__", "constructor", "toString", "missing"]) {
      expect(() => solubilityFactors021(bad as never, 25, 0, 0.02, 1)).toThrow(
        RangeError,
      );
      expect(() => redoxLedger021(bad as never, 1, 1)).toThrow(RangeError);
      expect(() => activity021(bad as never, "Cu")).toThrow(RangeError);
      expect(() => activity021("Cu", bad as never)).toThrow(RangeError);
    }
    expect(() => activity021("H" as never, "Cu")).toThrow(RangeError);
    for (const bad of [NaN, Infinity, -Infinity, -1, 0.13])
      expect(() => solubilityFactors021("endo", 25, 0, bad, 1)).toThrow(
        RangeError,
      );
    expect(() => solubilityFactors021("endo", 20, 0, 0.02, 1)).toThrow(
      RangeError,
    );
    expect(() => solubilityFactors021("endo", 25, 0, 0.02, 0)).toThrow(
      RangeError,
    );
    for (const bad of [-1, 1.5, 13, NaN, Infinity])
      expect(() => redoxLedger021("mnAcid", bad, 1)).toThrow(RangeError);
  });
  it("renders all three actual default labs with SVG and full textual evidence", () => {
    mocked.values = {};
    for (const l of lessons) {
      const html = renderToStaticMarkup(createElement(Lab, { lessonId: l.id }));
      expect(html).toContain(`data-forge021="${l.id}"`);
      expect(html).toContain("data-model-result");
      expect(html).toContain("<svg");
      expect(html).toContain("Gerekçen");
      expect(html).toContain('maxLength="120"');
      expect(html).not.toMatch(/NaN|Infinity|undefined/);
    }
  });
  it("renders all teaching result variants for bounded text/source inspection", () => {
    const scenarios: [string, Record<string, string | number | boolean>][] = [
      ["cozunurluk-faktorleri", {}],
      ["cozunurluk-faktorleri", { temperature: 40, amount: 0.025 }],
      ["cozunurluk-faktorleri", { amount: 0.02 }],
      ["cozunurluk-faktorleri", { common: 0.03, amount: 0.04 }],
      ["redoks-denklestirme", {}],
      ["redoks-denklestirme", { family: "mnBase", reduction: 2, oxidation: 3 }],
      ["redoks-denklestirme", { family: "crAcid", reduction: 1, oxidation: 6 }],
      ["redoks-denklestirme", { reduction: 2, oxidation: 10 }],
      ["redoks-denklestirme", { reduction: 0, oxidation: 0 }],
      ["metalik-aktiflik", {}],
      ["metalik-aktiflik", { donor: "Ag", acceptor: "Zn" }],
      ["metalik-aktiflik", { donor: "Zn", acceptor: "Zn" }],
      ["metalik-aktiflik", { donor: "Cr", acceptor: "H" }],
    ];
    for (const [index, [lessonId, values]] of scenarios.entries()) {
      mocked.values = { [`forge021-chemistry-${lessonId}`]: values };
      const html = renderToStaticMarkup(createElement(Lab, { lessonId }));
      expect(html).not.toMatch(/NaN|Infinity|undefined/);
      expect(html).toContain("data-model-result");
      if (process.env.FORGE021_CHEM_SSR) {
        mkdirSync(process.env.FORGE021_CHEM_SSR, { recursive: true });
        writeFileSync(
          join(process.env.FORGE021_CHEM_SSR, `${index}-${lessonId}.html`),
          html,
        );
      }
    }
    mocked.values = {};
  });
  it("uses safe defaults after foreign saved selectors andcaps a restored long reason", () => {
    for (const id of [
      "cozunurluk-faktorleri",
      "redoks-denklestirme",
      "metalik-aktiflik",
    ]) {
      mocked.values[`forge021-chemistry-${id}`] = {
        thermal: "constructor",
        family: "__proto__",
        donor: "H",
        acceptor: "toString",
        reason: "R".repeat(128),
      };
      const html = renderToStaticMarkup(createElement(Lab, { lessonId: id }));
      expect(html).toContain("R".repeat(120));
      expect(html).not.toContain("R".repeat(121));
      expect(html).not.toMatch(/NaN|Infinity|undefined/);
    }
    mocked.values = {};
  });
});
