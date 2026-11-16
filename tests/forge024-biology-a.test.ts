import { describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
const restore = vi.hoisted(() => ({
  records: {} as Record<string, Record<string, string | number | boolean>>,
}));
vi.mock("../src/store", () => ({
  useApp: () => ({ state: { explorations: restore.records } }),
}));
vi.mock("../src/learning/useExploration", () => ({
  useExploration: (
    id: string,
    defaults: Record<string, string | number | boolean>,
  ) => [
    Object.fromEntries(
      Object.entries(defaults).map(([k, value]) => [
        k,
        typeof restore.records[id]?.[k] === typeof value
          ? restore.records[id][k]
          : value,
      ]),
    ),
    (patch: Record<string, string | number | boolean>) => {
      restore.records[id] = { ...defaults, ...restore.records[id], ...patch };
    },
  ],
}));
import { questionContentIssues } from "../src/domain/questionContent";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
import {
  forge024BiologyALessons,
  forge024BiologyAGuides,
  forge024BiologyATopics,
  stemSection024,
  leafJourney024,
  plantFlow024,
  guardCycle024,
  symbiosis024,
  type StemKind024,
  type LeafRoute024,
  type FlowMode024,
  type GuardSignal024,
  type RootPartner024,
  type Exchange024,
} from "../src/learning/forge024BiologyA";
describe("four plant headings with separate anatomy, pathway, pressure and partnership models", () => {
  it("covers exact headings with independent original cards and semantically attached five-option help", () => {
    expect(Object.values(forge024BiologyATopics)).toEqual([
      "detail-347",
      "detail-348",
      "detail-349",
      "detail-350",
    ]);
    expect(forge024BiologyALessons.map((l) => l.questions.length)).toEqual([
      18, 18, 22, 20,
    ]);
    expect(forge024BiologyAGuides.map((g) => g.sections.length)).toEqual([
      18, 19, 22, 18,
    ]);
    const all = forge024BiologyALessons.flatMap((l) => l.questions);
    expect(new Set(all.map((q) => q.id)).size).toBe(78);
    for (const lesson of forge024BiologyALessons) {
      const counts = [0, 0, 0, 0, 0];
      for (const q of lesson.questions) {
        counts[q.answer]++;
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(questionContentIssues(q)).toEqual([]);
        const h = questionGuidanceSchema.parse(q.guidance);
        expect(h.steps.length).toBeGreaterThanOrEqual(2);
        expect(h.steps.length).toBeLessThanOrEqual(4);
        expect(h.optionReasons).toHaveLength(5);
        expect(new Set(h.steps).size).toBe(h.steps.length);
        expect(
          h.steps.every((s) => !h.knowledge.includes(s) && s !== h.strategy),
        ).toBe(true);
        expect(h.optionReasons.every((s) => s.length > 20)).toBe(true);
        expect(q.explanation.tr).toContain(h.optionReasons[q.answer]);
        expect(q.explanation.tr).toContain(h.check);
        expect(q.hint.tr).toBe(h.strategy);
      }
      expect(Math.max(...counts) - Math.min(...counts)).toBeLessThanOrEqual(1);
      const a = lesson.questions.map((q) => q.answer);
      for (let period = 1; period <= 5; period++)
        expect(a.every((x, i) => i < period || x === a[i - period])).toBe(
          false,
        );
    }
    for (const g of forge024BiologyAGuides) {
      expect(g.examples).toHaveLength(6);
      expect(g.recall).toHaveLength(6);
      for (const s of g.sections) {
        expect(s.paragraphs).toHaveLength(2);
        expect(s.paragraphs.every((p) => p.length > 100)).toBe(true);
      }
      for (const e of g.examples) {
        expect(e.steps).toHaveLength(3);
        expect(e.check.length).toBeGreaterThan(15);
        expect(all.some((q) => q.prompt.tr === e.prompt)).toBe(false);
      }
    }
  });
  it("keeps typical monocot bundles scattered and secondary increments inside cambium in the stipulated dicot", () => {
    for (let season = 0; season <= 5; season++) {
      const a = stemSection024("monocot", season),
        b = stemSection024("dicot", season);
      expect(a.bundles.length).toBe(16);
      expect(a.cambiumRadius).toBeNull();
      expect(a.secondaryRings).toHaveLength(0);
      expect(b.secondaryRings).toHaveLength(season);
      expect(b.secondaryRings.every((r) => r.radius < b.cambiumRadius!)).toBe(
        true,
      );
      expect(b.phloemRadius!).toBeGreaterThan(b.cambiumRadius!);
      expect(b.outerRadius).toBeGreaterThan(b.phloemRadius!);
      expect(b.bundles).toHaveLength(season === 0 ? 10 : 0);
    }
  });
  it("gates only the represented stomatal CO2 or water route without blocking sugar export", () => {
    for (const route of ["carbon", "water", "sugar"] as LeafRoute024[])
      for (let step = 0; step <= 4; step++)
        for (const open of [false, true]) {
          const m = leafJourney024(route, step, open),
            gate = route === "carbon" ? 1 : route === "water" ? 3 : null;
          const blocked = !open && gate !== null && step >= gate;
          expect(m.blocked).toBe(blocked);
          expect(m.reached).toBe(blocked ? gate! - 1 : step);
          expect(m.activeNodes).toHaveLength(m.reached + 1);
          expect(m.links.filter((x) => x.active)).toHaveLength(m.reached);
          expect(m.links.filter((x) => x.blocked)).toHaveLength(
            blocked ? 1 : 0,
          );
          if (route === "water")
            expect(m.phase).toBe(m.reached >= 2 ? "vapor" : "liquid");
        }
    expect(leafJourney024("water", 4, false).statement).toContain(
      "Kütikuladan",
    );
    expect(leafJourney024("sugar", 4, false).activeNodes.at(-1)).toBe("sink");
  });
  it("retains a signed exact tenth-grid difference and separates intact equality from interruption", () => {
    for (const mode of ["xylem", "phloem"] as FlowMode024[])
      for (let a = mode === "xylem" ? -50 : 0; a <= 50; a += 5)
        for (let b = mode === "xylem" ? -50 : 0; b <= 50; b += 5)
          for (const g of [1, 3, 10])
            for (const intact of [false, true]) {
              const m = plantFlow024(mode, a, b, g, intact),
                raw = intact ? g * (a - b) : 0;
              expect(m.differenceTenths).toBe(a - b);
              expect(m.flowTenths).toBe(raw);
              expect(m.direction).toBe(
                raw > 0 ? "A-to-B" : raw < 0 ? "B-to-A" : "none",
              );
              expect(m.cause).toBe(
                !intact ? "interrupted" : a === b ? "equal" : "gradient",
              );
            }
    expect(plantFlow024("xylem", -4, -12, 3, true).flow).toBe(2.4);
    expect(plantFlow024("phloem", 7, 13, 4, true).flow).toBe(-2.4);
    expect(plantFlow024("phloem", 11, 5, 5, false).flow).toBe(0);
  });
  it("does not draw the mechanical pore response before ion and water stages", () => {
    for (const signal of [
      "light",
      "ABA",
      "dark",
      "CAM-night",
    ] as GuardSignal024[])
      for (let step = 0; step <= 4; step++) {
        const m = guardCycle024(signal, step),
          opening = signal === "light" || signal === "CAM-night";
        expect(m.opening).toBe(opening);
        expect(m.activeEvents).toHaveLength(step + 1);
        expect(m.ionDirection).toBe(
          step < 2 ? "pending" : opening ? "in" : "out",
        );
        expect(m.waterDirection).toBe(
          step < 3 ? "pending" : opening ? "in" : "out",
        );
        expect(m.apertureStage).toBe(
          (opening ? [0, 0, 0, 1, 2] : [2, 2, 2, 1, 0])[step],
        );
      }
    expect(guardCycle024("ABA", 4).scope).toContain("iyon kanalları");
  });
  it("assigns N2 fixation to the bacterial partner and phosphate/water acquisition to the fungal model", () => {
    for (const p of ["bacterium", "fungus"] as RootPartner024[])
      for (const x of [
        "nitrogen",
        "phosphate",
        "water",
        "carbon",
      ] as Exchange024[])
        for (let step = 0; step <= 3; step++) {
          const m = symbiosis024(p, x, step),
            valid =
              x === "carbon" ||
              (p === "bacterium" ? x === "nitrogen" : x !== "nitrogen");
          expect(m.represented).toBe(valid);
          expect(m.path).toHaveLength(valid ? 4 : 0);
          expect(m.activeNodes).toHaveLength(valid ? step + 1 : 0);
          if (x === "carbon")
            expect(m.path).toEqual(["leaf", "phloem", "root", p]);
        }
    expect(symbiosis024("bacterium", "nitrogen", 3).path).toEqual([
      "air-N2",
      "nodule-bacterium",
      "fixed-N",
      "plant",
    ]);
    expect(symbiosis024("fungus", "nitrogen", 3).represented).toBe(false);
  });
  it("rejects invalid enums, fractional grid entries, corrupt booleans and prototype property names", () => {
    for (const value of [
      "constructor",
      "__proto__",
      "",
      null,
      undefined,
      {},
      ["dicot"],
      1,
    ] as unknown[]) {
      expect(() => stemSection024(value as StemKind024, 0)).toThrow(RangeError);
      expect(() => leafJourney024(value as LeafRoute024, 0, true)).toThrow(
        RangeError,
      );
      expect(() => plantFlow024(value as FlowMode024, 0, 0, 1, true)).toThrow(
        RangeError,
      );
      expect(() => guardCycle024(value as GuardSignal024, 0)).toThrow(
        RangeError,
      );
      expect(() => symbiosis024(value as RootPartner024, "carbon", 0)).toThrow(
        RangeError,
      );
    }
    for (const value of [NaN, Infinity, -1, 6, 0.5])
      expect(() => stemSection024("dicot", value)).toThrow(RangeError);
    for (const value of [NaN, Infinity, -1, 5, 0.5]) {
      expect(() => leafJourney024("water", value, true)).toThrow(RangeError);
      expect(() => guardCycle024("light", value)).toThrow(RangeError);
    }
    for (const value of [NaN, Infinity, -1, 4, 0.5])
      expect(() => symbiosis024("fungus", "carbon", value)).toThrow(RangeError);
    expect(() => plantFlow024("phloem", -1, 2, 1, true)).toThrow(RangeError);
    expect(() => plantFlow024("xylem", 0, 0, 0, true)).toThrow(RangeError);
    expect(() =>
      plantFlow024("xylem", 0, 0, 1, "true" as unknown as boolean),
    ).toThrow(RangeError);
    expect(() => leafJourney024("water", 0, 1 as unknown as boolean)).toThrow(
      RangeError,
    );
  });
});

import Forge024BiologyALab from "../src/learning/Forge024BiologyALab";
describe("raw restore type feedback gate", () => {
  it("hides stale comparison after an active wrong-type fallback while independent fields remain usable", () => {
    const cases: [string, string, string[], string | null][] = [
      ["ayt-govde-yapisi", "secondary", ["kind", "seasons"], "tissue"],
      ["ayt-yaprak-yapisi", "passes", ["route", "step", "open"], null],
      [
        "bitki-madde-tasinmasi",
        "A-to-B",
        ["mode", "a", "b", "g", "intact"],
        "stage",
      ],
      ["stoma-nodul-mikoriza", "yes", ["partner", "exchange"], "signal"],
    ];
    for (const [lessonId, prediction, active, secondary] of cases) {
      const id = "forge024:biology-a:" + lessonId;
      const record = { prediction, reason: "ψi>ψo", checked: true };
      const render = () =>
        renderToStaticMarkup(createElement(Forge024BiologyALab, { lessonId }));
      restore.records = { [id]: record };
      expect(render()).toContain("bio024a-feedback");
      for (const key of active) {
        restore.records = {
          [id]: { ...record, [key]: null } as unknown as typeof record,
        };
        expect(render()).not.toContain("bio024a-feedback");
      }
      if (secondary) {
        restore.records = {
          [id]: { ...record, [secondary]: null } as unknown as typeof record,
        };
        expect(render()).toContain("bio024a-feedback");
      }
    }
    restore.records = {};
  });
});
