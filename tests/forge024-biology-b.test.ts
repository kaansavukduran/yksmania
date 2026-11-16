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
  forge024BiologyBLessons,
  forge024BiologyBGuides,
  forge024BiologyBTopics,
  auxinResponse024,
  culture024,
  coleoptile024,
  nightResponse024,
  flowerInventory024,
  reproductivePath024,
  pollenTransfer024,
  type AuxinOrgan024,
  type ColeoptileTreatment024,
  type LightSide024,
  type PhotoKind024,
  type NightPulse024,
  type ReproductiveLineage024,
  type PollenOrigin024,
} from "../src/learning/forge024BiologyB";
describe("five plant development headings with explicit dose, pathway, night and reproductive assumptions", () => {
  it("covers exact topics with self-contained original five-option cards and substantive help", () => {
    expect(Object.values(forge024BiologyBTopics)).toEqual([
      "detail-351",
      "detail-352",
      "detail-353",
      "detail-354",
      "detail-355",
    ]);
    expect(forge024BiologyBLessons.map((l) => l.questions.length)).toEqual([
      18, 18, 16, 20, 18,
    ]);
    expect(forge024BiologyBGuides.map((g) => g.sections.length)).toEqual([
      18, 18, 16, 20, 18,
    ]);
    const all = forge024BiologyBLessons.flatMap((l) => l.questions);
    expect(new Set(all.map((q) => q.id)).size).toBe(90);
    for (const l of forge024BiologyBLessons) {
      const counts = [0, 0, 0, 0, 0];
      for (const q of l.questions) {
        counts[q.answer]++;
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(questionContentIssues(q)).toEqual([]);
        const h = questionGuidanceSchema.parse(q.guidance);
        expect(h.steps).toHaveLength(3);
        expect(new Set(h.steps).size).toBe(3);
        expect(
          h.steps.every((s) => s !== h.strategy && !h.knowledge.includes(s)),
        ).toBe(true);
        expect(h.optionReasons).toHaveLength(5);
        expect(h.optionReasons.every((s) => s.length > 20)).toBe(true);
        expect(q.explanation.tr).toContain(h.optionReasons[q.answer]);
        expect(q.explanation.tr).toContain(h.check);
        expect(q.hint.tr).toBe(h.strategy);
      }
      expect(Math.max(...counts) - Math.min(...counts)).toBeLessThanOrEqual(1);
      for (let period = 1; period <= 5; period++)
        expect(
          l.questions.every(
            (q, i) => i < period || q.answer === l.questions[i - period].answer,
          ),
        ).toBe(false);
    }
    for (const g of forge024BiologyBGuides) {
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
  it("reads supplied organ-specific dose measurements and keeps culture class distinct from organ count", () => {
    expect(auxinResponse024("root", 1)).toMatchObject({
      response: 32,
      optimumLevel: 1,
      kind: "promotion",
    });
    expect(auxinResponse024("shoot", 3)).toMatchObject({
      response: 45,
      optimumLevel: 3,
    });
    expect(auxinResponse024("root", 3).kind).toBe("inhibition");
    expect(auxinResponse024("shoot", 3).kind).toBe("promotion");
    expect(auxinResponse024("root", 0).kind).toBe("control");
    expect(culture024(8, 3).outcome).toBe("root");
    expect(culture024(2, 7).outcome).toBe("shoot");
    expect(culture024(5, 4).outcome).toBe("callus");
    expect(culture024(4, 5).outcome).toBe("callus");
    expect(culture024(6, 2).outcome).toBe(culture024(3, 1).outcome);
    expect(culture024(4, 2).outcome).toBe("root");
    expect(culture024(2, 4).outcome).toBe("shoot");
  });
  it("distinguishes tip perception, signal transmission and experimentally asymmetric agar without inventing light", () => {
    const fixtures: [
      LightSide024,
      ColeoptileTreatment024,
      string,
      boolean,
      boolean,
    ][] = [
      ["left", "intact", "left", true, true],
      ["right", "intact", "right", true, true],
      ["left", "opaqueTip", "straight", true, false],
      ["left", "clearTip", "left", true, true],
      ["left", "opaqueBase", "left", true, true],
      ["left", "removed", "straight", false, false],
      ["left", "gelatin", "left", true, true],
      ["left", "mica", "straight", false, true],
      ["dark", "agarCenter", "straight", true, false],
      ["dark", "agarLeft", "right", true, false],
      ["dark", "agarRight", "left", true, false],
    ];
    for (const [l, t, bend, pass, perceives] of fixtures) {
      const a = coleoptile024(l, t, 0),
        b = coleoptile024(l, t, 4);
      expect(a.bend).toBe("straight");
      expect(a.leftGrowth + a.rightGrowth).toBe(0);
      expect(b.bend).toBe(bend);
      expect(b.signalPasses).toBe(pass);
      expect(b.perceives).toBe(perceives);
      expect(b.growth).toBe(pass);
      if (bend === "left") expect(b.rightGrowth).toBeGreaterThan(b.leftGrowth);
      if (bend === "right") expect(b.leftGrowth).toBeGreaterThan(b.rightGrowth);
    }
  });
  it("uses continuous effective dark time, red/far-red order, explicit equality and an independent maturity gate", () => {
    expect(nightResponse024("short", 8, 10, "none", true)).toMatchObject({
      night: 16,
      longestDark: 16,
      induced: true,
    });
    expect(nightResponse024("short", 8, 10, "R", true)).toMatchObject({
      longestDark: 8,
      induced: false,
    });
    expect(nightResponse024("short", 8, 10, "R-FR", true)).toMatchObject({
      longestDark: 16,
      induced: true,
      finalState: "Pr-rich",
    });
    expect(nightResponse024("short", 8, 10, "FR-R", true)).toMatchObject({
      longestDark: 8,
      induced: false,
      finalState: "Pfr-rich",
    });
    expect(nightResponse024("long", 10, 9, "R", true).induced).toBe(true);
    expect(nightResponse024("short", 4, 10, "R", true).induced).toBeNull();
    expect(nightResponse024("short", 8, 10, "none", false).induced).toBe(false);
    expect(nightResponse024("neutral", 8, 10, "none", false).induced).toBe(
      false,
    );
    for (const kind of ["short", "long", "neutral"] as PhotoKind024[])
      for (let day = 4; day <= 20; day++)
        for (let critical = 4; critical <= 16; critical++) {
          const base = nightResponse024(kind, day, critical, "none", true),
            cancel = nightResponse024(kind, day, critical, "R-FR", true),
            red = nightResponse024(kind, day, critical, "R", true),
            lastRed = nightResponse024(kind, day, critical, "FR-R", true);
          expect(cancel.induced).toBe(base.induced);
          expect(lastRed.induced).toBe(red.induced);
          expect(base.night + base.dayHours).toBe(24);
          expect(red.longestDark * 2).toBe(base.night);
          if (kind === "neutral") expect(base.induced).toBe(true);
        }
  });
  it("separates four-whorl completeness from sex and refuses to infer plant-level distribution", () => {
    expect(flowerInventory024(true, true, true, true)).toMatchObject({
      complete: true,
      sex: "bisexual",
      presentCount: 4,
    });
    expect(flowerInventory024(true, false, true, true)).toMatchObject({
      complete: false,
      sex: "bisexual",
      presentCount: 3,
    });
    expect(flowerInventory024(false, false, true, false).sex).toBe("male");
    expect(flowerInventory024(false, false, false, true).sex).toBe("female");
    expect(flowerInventory024(true, true, false, false).sex).toBe("sterile");
    expect(flowerInventory024(true, true, true, true).scope).toContain(
      "Tek çiçekten",
    );
  });
  it("preserves ploidy in mitosis, meiotic four products, female losses and the seven-cell eight-nucleus sac", () => {
    for (let diploid = 2; diploid <= 40; diploid += 2) {
      const male = [
        [1, 1, 1],
        [4, 1, 1],
        [4, 2, 2],
        [4, 3, 3],
      ];
      const female = [
        [1, 1, 1],
        [4, 1, 1],
        [1, 1, 1],
        [1, 1, 2],
        [1, 1, 4],
        [1, 1, 8],
        [1, 7, 8],
      ];
      for (const [lineage, values] of [
        ["male", male],
        ["female", female],
      ] as const)
        for (let stage = 0; stage < values.length; stage++) {
          const m = reproductivePath024(lineage, stage, diploid);
          expect([m.products, m.cellsPerProduct, m.nucleiPerProduct]).toEqual(
            values[stage],
          );
          expect(m.chromosomesPerNucleus).toBe(
            stage === 0 ? diploid : diploid / 2,
          );
          expect(m.ploidy).toBe(stage === 0 ? "2n" : "n");
        }
    }
    expect(reproductivePath024("female", 6, 24).scope).toContain(
      "henüz birleşmemiş",
    );
  });
  it("does not erase arrival when species compatibility, pollen viability or stigma receptivity blocks the next stage", () => {
    for (const origin of [
      "sameFlower",
      "samePlant",
      "otherPlant",
      "otherSpecies",
    ] as PollenOrigin024[])
      for (const deposited of [false, true])
        for (const compatible of [false, true])
          for (const viable of [false, true])
            for (const receptive of [false, true])
              for (let step = 0; step <= 3; step++) {
                const m = pollenTransfer024(
                  origin,
                  deposited,
                  compatible,
                  viable,
                  receptive,
                  step,
                );
                expect(m.arrived).toBe(deposited && step >= 2);
                expect(m.tubeStarted).toBe(
                  step === 3 &&
                    deposited &&
                    compatible &&
                    viable &&
                    receptive &&
                    origin !== "otherSpecies",
                );
                expect(m.reached).toBeLessThanOrEqual(step);
                expect(m.reached).toBeGreaterThanOrEqual(0);
                if (!deposited && step >= 2) expect(m.reached).toBe(1);
              }
    expect(
      pollenTransfer024("samePlant", true, false, true, true, 3),
    ).toMatchObject({
      category: "same-plant-self",
      arrived: true,
      tubeStarted: false,
    });
    expect(
      pollenTransfer024("otherPlant", true, true, true, true, 3).category,
    ).toBe("cross");
  });
  it("rejects prototype/coerced enums, invalid stages, odd chromosome counts and non-boolean gates", () => {
    for (const bad of [
      null,
      undefined,
      {},
      ["root"],
      "constructor",
      "__proto__",
      "",
    ] as unknown[]) {
      expect(() => auxinResponse024(bad as AuxinOrgan024, 0)).toThrow(
        RangeError,
      );
      expect(() => coleoptile024(bad as LightSide024, "intact", 0)).toThrow(
        RangeError,
      );
      expect(() =>
        coleoptile024("left", bad as ColeoptileTreatment024, 0),
      ).toThrow(RangeError);
      expect(() =>
        nightResponse024(bad as PhotoKind024, 8, 10, "none", true),
      ).toThrow(RangeError);
      expect(() =>
        nightResponse024("short", 8, 10, bad as NightPulse024, true),
      ).toThrow(RangeError);
      expect(() =>
        reproductivePath024(bad as ReproductiveLineage024, 0, 20),
      ).toThrow(RangeError);
      expect(() =>
        pollenTransfer024(bad as PollenOrigin024, true, true, true, true, 0),
      ).toThrow(RangeError);
    }
    for (const n of [NaN, Infinity, -1, 5, 0.5])
      expect(() => auxinResponse024("root", n)).toThrow(RangeError);
    expect(() => culture024(0, 3)).toThrow(RangeError);
    expect(() => culture024(3, 10)).toThrow(RangeError);
    expect(() => coleoptile024("left", "intact", 5)).toThrow(RangeError);
    expect(() => nightResponse024("short", 3, 10, "none", true)).toThrow(
      RangeError,
    );
    expect(() => nightResponse024("short", 8, 17, "none", true)).toThrow(
      RangeError,
    );
    expect(() => reproductivePath024("male", 4, 20)).toThrow(RangeError);
    expect(() => reproductivePath024("female", 7, 20)).toThrow(RangeError);
    expect(() => reproductivePath024("female", 2, 21)).toThrow(RangeError);
    expect(() =>
      flowerInventory024(1 as unknown as boolean, true, true, true),
    ).toThrow(RangeError);
    expect(() =>
      pollenTransfer024(
        "sameFlower",
        true,
        true,
        "yes" as unknown as boolean,
        true,
        3,
      ),
    ).toThrow(RangeError);
  });
});

import Forge024BiologyBLab from "../src/learning/Forge024BiologyBLab";
describe("raw restore type feedback gate", () => {
  it("hides stale comparison after an active wrong-type fallback while independent fields remain usable", () => {
    const cases: [string, string, string[], string | null][] = [
      ["bitki-hormonlari", "control", ["organ", "dose"], "auxin"],
      ["bitkilerde-hareket", "straight", ["light", "treatment", "stage"], null],
      [
        "bitki-fotoperiyodizm",
        "yes",
        ["kind", "pulse", "day", "critical", "mature"],
        null,
      ],
      [
        "cicek-yapisi-ureme",
        "complete",
        ["sepal", "petal", "stamen", "pistil"],
        "lineage",
      ],
      [
        "bitki-tozlasma",
        "source",
        ["origin", "step", "deposited", "compatible", "viable", "receptive"],
        null,
      ],
    ];
    for (const [lessonId, prediction, active, secondary] of cases) {
      const id = "forge024:biology-b:" + lessonId;
      const record = { prediction, reason: "ψi>ψo", checked: true };
      const render = () =>
        renderToStaticMarkup(createElement(Forge024BiologyBLab, { lessonId }));
      restore.records = { [id]: record };
      expect(render()).toContain("bio024b-feedback");
      for (const key of active) {
        restore.records = {
          [id]: { ...record, [key]: null } as unknown as typeof record,
        };
        expect(render()).not.toContain("bio024b-feedback");
      }
      if (secondary) {
        restore.records = {
          [id]: { ...record, [secondary]: null } as unknown as typeof record,
        };
        expect(render()).toContain("bio024b-feedback");
      }
    }
    restore.records = {};
  });
});
