import { describe, it, expect, vi } from "vitest";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import {
  Children,
  createElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { sourceNarratives, narrativePacks } from "../src/learning/narratives";
import { foundationQuestionSets } from "../src/learning/forge012FoundationQuestions";
import { questionContentIssues } from "../src/domain/questionContent";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
import {
  proteinGraphC026,
  enzymeRateC026,
  energyProfileC026,
  enzymeConditionsC026,
  vitaminBalanceC026,
  vitaminRoleC026,
  biologyCDefaults026,
  normalizeBiologyC026,
  forge026BiologyCGuides,
  forge026BiologyCLessons,
  forge026BiologyCTopics,
} from "../src/learning/forge026BiologyC";
const fixture = vi.hoisted(() => ({
  records: {} as Record<string, Record<string, string | number | boolean>>,
  writes: 0,
}));
vi.mock("../src/store", () => ({
  useApp: () => ({
    state: { explorations: fixture.records },
    update: async (
      fn: (s: { explorations: typeof fixture.records }) => {
        explorations: typeof fixture.records;
      },
    ) => {
      fixture.records = fn({ explorations: fixture.records }).explorations;
      fixture.writes++;
    },
  }),
}));
import Lab from "../src/learning/Forge026BiologyCLab";
const ids = ["proteinler", "enzimler", "vitaminler"],
  key = (id: string) => "forge026-biology-c:" + id,
  html = (id: string) =>
    renderToStaticMarkup(createElement(Lab, { lessonId: id }));
const stable = (x: unknown): unknown =>
  Array.isArray(x)
    ? x.map(stable)
    : x && typeof x === "object"
      ? Object.fromEntries(
          Object.entries(x)
            .sort(([a], [b]) => a.localeCompare(b, "en"))
            .map(([k, v]) => [k, stable(v)]),
        )
      : x;
function nodes(tree: ReactNode) {
  const out: ReactElement<Record<string, unknown>>[] = [];
  const walk = (t: ReactNode) =>
    Children.forEach(t, (n) => {
      if (isValidElement<Record<string, unknown>>(n)) {
        out.push(n);
        walk(n.props.children as ReactNode);
      }
    });
  walk(tree);
  return out;
}
const render = (id: string) => nodes(Lab({ lessonId: id })),
  reason = (id: string) => render(id).find((n) => n.type === "textarea")!.props,
  button = (id: string) => render(id).find((n) => n.type === "button")!.props;
const change = (id: string, label: string, value: unknown) => {
  const n = render(id).find((n) => n.props.label === label)!;
  (n.props.onChange as (v: unknown) => void)(value);
};
const writeReason = (id: string, value: string) =>
  (reason(id).onChange as (e: unknown) => void)({ currentTarget: { value } });
const compare = (id: string) => (button(id).onClick as () => void)();
describe("026 BiologyC legacy and teaching", () => {
  it("preserves the three complete legacy Lessons,20 cards and first five concept order", () => {
    const legacy = sourceNarratives
      .filter((l) => ids.includes(l.id))
      .map((l) => ({
        ...l,
        questions:
          foundationQuestionSets.find((s) => s.lessonId === l.id)?.questions ??
          l.questions,
      }));
    expect(
      createHash("sha256")
        .update(JSON.stringify(stable(legacy)))
        .digest("hex"),
    ).toBe("064ca1e3388178a2bbfbcee60e3ba92f3d41dc2907837a6611852244036d3f9e");
    expect(legacy.map((l) => l.questions.length)).toEqual([5, 5, 10]);
    for (const [i, id] of ids.entries())
      expect(
        forge026BiologyCGuides[i].sections.slice(0, 5).map((s) => s.title),
      ).toEqual(
        narrativePacks.find((p) => p.id === id)!.body.map((s) => s.title),
      );
    expect(forge026BiologyCLessons.map((l) => l.id)).toEqual(
      ids.map((id) => id + "-ileri"),
    );
    expect(Object.values(forge026BiologyCTopics)).toEqual([
      "detail-7",
      "detail-8",
      "detail-9",
    ]);
  });
  it("has sixty independent cards,rich positive guides and eighteen separate worked examples", () => {
    const qs = forge026BiologyCLessons.flatMap((l) => l.questions),
      prompts = qs.map((q) => q.prompt.tr);
    expect(qs).toHaveLength(60);
    expect(new Set(qs.map((q) => q.id)).size).toBe(60);
    for (const g of forge026BiologyCGuides) {
      expect(g.sections).toHaveLength(20);
      expect(g.examples).toHaveLength(6);
      expect(g.recall).toHaveLength(6);
      for (const s of g.sections) {
        expect(s.paragraphs).toHaveLength(2);
        expect(s.paragraphs.every((p) => p.length > 150)).toBe(true);
      }
      for (const e of g.examples) {
        expect(e.steps).toHaveLength(3);
        expect(prompts).not.toContain(e.prompt);
        expect(e.check.trim()).not.toBe("");
      }
    }
    for (const q of qs) {
      expect(questionContentIssues(q), q.id).toEqual([]);
      expect(questionGuidanceSchema.safeParse(q.guidance).success, q.id).toBe(
        true,
      );
      expect(q.options).toHaveLength(5);
      expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
      expect(q.guidance!.steps).toHaveLength(3);
      expect(new Set(q.guidance!.steps).size).toBe(3);
      expect(q.guidance!.optionReasons).toHaveLength(5);
      q.guidance!.optionReasons.forEach((r, i) =>
        expect(r.startsWith("Doğru."), q.id + "/" + i).toBe(i === q.answer),
      );
    }
    const answers = qs.map((q) => q.answer);
    expect(
      [0, 1, 2, 3, 4].map((a) => answers.filter((x) => x === a).length),
    ).toEqual([12, 12, 12, 12, 12]);
    for (let period = 1; period <= 20; period++)
      expect(
        answers.some((a, i) => i >= period && a !== answers[i - period]),
      ).toBe(true);
  });
  it("binds every shuffled option to its authored specific reason", () => {
    const correct = [
      "14",
      "1; 7",
      "3; 0",
      "4; 3",
      "3 bağ; 3 su",
      "331",
      "656",
      "Yan gruplar farklıdır; glisinin merkez karbonuna iki H bağlıdır.",
      "Peptit yapısı korunabilir; her proteinin S içermesi zorunlu değildir.",
      "2 ve 3",
      "0; 2",
      "Karbonil C ile N arasında peptit bağı",
      "12",
      "Katlanma bozulması vardır;90 birimin serbestleştiği söylenemez.",
      "Bu koşullarda geri kazanılan etkinlik derecesi farklıdır; tam geri dönüş kanıtlanmamıştır.",
      "Taşıma; yapı; savunma",
      "Lizin korunur; her DNA değişimi amino asidi değiştirmek zorunda değildir.",
      "5",
      "6",
      "Besindeki protein ile sentezlenen proteinin dizisinin aynı olması zorunlu değildir.",
    ];
    const qs = forge026BiologyCLessons[0].questions;
    qs.forEach((q, i) =>
      expect(q.options[q.answer].tr.replace(/\s/g, "")).toBe(
        correct[i].replace(/\s/g, ""),
      ),
    );
  });
});
describe("026 BiologyC finite scientific models", () => {
  it("exhausts explicit backbone cuts against independent union-find connectivity and mass conservation", () => {
    for (let length = 3; length <= 9; length++)
      for (const topology of ["line", "ring"]) {
        const e = topology === "ring" ? length : length - 1;
        for (let mask = 0; mask < 2 ** e; mask++)
          for (let pattern = 0; pattern < 3; pattern++) {
            const r = proteinGraphC026(length, topology, mask, pattern, false),
              parent = Array.from({ length }, (_, i) => i),
              degree = Array(length).fill(0),
              find = (i: number): number =>
                parent[i] === i ? i : find(parent[i]);
            let cuts = 0;
            for (let edge = 0; edge < e; edge++) {
              if (mask & (1 << edge)) {
                cuts++;
                continue;
              }
              const a = edge,
                b = (edge + 1) % length;
              parent[find(a)] = find(b);
              degree[a]++;
              degree[b]++;
            }
            expect(r.fragments).toBe(
              new Set(parent.map((_, i) => find(i))).size,
            );
            expect(r.freeUnits).toBe(degree.filter((x) => x === 0).length);
            expect(r.peptideBonds).toBe(e - cuts);
            expect(r.fragmentMass).toBe(r.initialMass + 18 * cuts);
            expect(r.groups.flat().sort((a, b) => a - b)).toEqual(
              Array.from({ length }, (_, i) => i),
            );
            const folded = proteinGraphC026(
              length,
              topology,
              mask,
              pattern,
              true,
            );
            expect({ ...folded, folded: false }).toEqual(r);
          }
      }
  });
  it("distinguishes first ring cut,partial cleavage placement and full hydrolysis", () => {
    expect(proteinGraphC026(8, "ring", 1, 0, true)).toMatchObject({
      fragments: 1,
      peptideBonds: 7,
      freeUnits: 0,
    });
    expect(proteinGraphC026(6, "line", 10, 0, true)).toMatchObject({
      fragments: 3,
      freeUnits: 0,
    });
    expect(proteinGraphC026(6, "line", 3, 0, true)).toMatchObject({
      fragments: 3,
      freeUnits: 2,
    });
    expect(proteinGraphC026(8, "ring", 255, 0, true)).toMatchObject({
      fragments: 8,
      peptideBonds: 0,
      freeUnits: 8,
      hydrolysisWater: 8,
    });
  });
  it("preserves competitive-rate limits and zero controls without inventing substrate", () => {
    for (let e = 0; e <= 4; e++)
      for (let i = 0; i <= 3; i++)
        for (const active of [false, true]) {
          let previous = 0;
          for (let s = 0; s <= 40; s++) {
            const r = enzymeRateC026(s, e, i, active);
            expect(r.rate).toBeGreaterThanOrEqual(previous);
            expect(r.rate).toBeLessThanOrEqual(r.maximum);
            expect(r.maximum).toBe(active ? 2 * e : 0);
            if (s === 0 || e === 0 || !active) expect(r.rate).toBe(0);
            previous = r.rate;
          }
          if (e > 0 && active)
            expect(enzymeRateC026(10, e, i, true).rate).toBeGreaterThan(0);
        }
    expect(enzymeRateC026(4, 3, 2, true).rate).toBe(2.4);
    expect(enzymeRateC026(4, 3, 0, true).maximum).toBe(6);
  });
  it("separates both directional barriers from net energy", () => {
    for (let profile = 0; profile <= 1; profile++)
      for (let lowering = 0; lowering <= 40; lowering++) {
        const r = energyProfileC026(profile, lowering);
        expect(r.withForward).toBeGreaterThanOrEqual(0);
        expect(r.withReverse).toBeGreaterThanOrEqual(0);
        expect(r.withoutForward - r.withForward).toBe(lowering);
        expect(r.withoutReverse - r.withReverse).toBe(lowering);
        expect(r.withForward - r.withReverse).toBe(r.delta);
        expect(r.final - r.initial).toBe(r.delta);
      }
  });
  it("keeps declared discrete condition data within their own scope", () => {
    for (let t = 0; t <= 6; t++)
      for (let p = 0; p <= 4; p++) {
        const r = enzymeConditionsC026(t, p);
        expect(r.temperature).toBe([10, 20, 30, 40, 50, 60, 70][t]);
        expect(r.pH).toBe([2, 4, 6, 8, 10][p]);
        expect(r.winner).toBe(r.x > r.y ? "X" : r.x < r.y ? "Y" : "tie");
        expect(r.x).toBeGreaterThanOrEqual(0);
        expect(r.y).toBeGreaterThanOrEqual(0);
      }
    expect(enzymeConditionsC026(3, 2).x).toBe(10);
    expect(enzymeConditionsC026(5, 3).y).toBe(10);
  });
  it("distinguishes vitamin transfer,chemical loss,unknown water and zero forced by conservation", () => {
    for (let initial = 0; initial <= 120; initial += 10)
      for (let solid = 0; solid <= initial; solid += 10)
        for (let water = 0; water <= initial - solid; water += 10)
          for (const measured of [false, true])
            for (const keep of [false, true]) {
              const r = vitaminBalanceC026(
                initial,
                solid,
                water,
                measured,
                keep,
              );
              if (measured) {
                expect(r.chemicalLoss).toBe(initial - solid - water);
                expect(r.retained).toBe(solid + (keep ? water : 0));
              } else {
                expect(r.chemicalLoss).toBe(initial === solid ? 0 : null);
                expect(r.retained).toBe(
                  keep ? (initial === solid ? initial : null) : solid,
                );
              }
              expect(r.minimumChemicalLoss).toBeGreaterThanOrEqual(0);
              expect(r.maximumChemicalLoss).toBeLessThanOrEqual(initial);
              expect(r.minimumRetained).toBeLessThanOrEqual(r.maximumRetained);
            }
    expect(vitaminBalanceC026(80, 80, 0, false, true)).toMatchObject({
      chemicalLoss: 0,
      water: 0,
      retained: 80,
    });
  });
  it("keeps human vitamin identity distinct from solubility and fuel", () => {
    expect(vitaminRoleC026("B12")).toMatchObject({ solubility: "water" });
    expect(vitaminRoleC026("B12").note).toContain("depolar");
    for (const id of ["A", "D", "E", "K"])
      expect(vitaminRoleC026(id).solubility).toBe("fat");
    for (const id of ["B1", "B9", "B12", "C"])
      expect(vitaminRoleC026(id).solubility).toBe("water");
    expect(() => vitaminRoleC026("constructor")).toThrow(RangeError);
  });
  it("rejects out-of-domain calls and normalizes dependent bounds idempotently", () => {
    for (const f of [
      () => proteinGraphC026(2, "line", 0, 0, true),
      () => proteinGraphC026(6, "constructor", 0, 0, true),
      () => proteinGraphC026(3, "line", 4, 0, true),
      () => enzymeRateC026(41, 1, 0, true),
      () => enzymeRateC026(1, 1, 0, 1 as unknown as boolean),
      () => energyProfileC026(2, 0),
      () => energyProfileC026(0, 41),
      () => enzymeConditionsC026(7, 0),
      () => vitaminBalanceC026(10, 9, 2, true, true),
      () => vitaminBalanceC026(10, 2, 1, 0 as unknown as boolean, true),
      () => normalizeBiologyC026(null as unknown as Record<string, unknown>),
    ])
      expect(f).toThrow(RangeError);
    for (const field of Object.keys(biologyCDefaults026))
      for (const bad of [
        undefined,
        null,
        "constructor",
        NaN,
        Infinity,
        -999,
        99999,
        true,
      ]) {
        const v = normalizeBiologyC026({
          ...biologyCDefaults026,
          [field]: bad,
        });
        expect(normalizeBiologyC026(v)).toEqual(v);
        expect(() =>
          proteinGraphC026(
            v.length,
            v.topology,
            v.cutMask,
            v.pattern,
            v.folded,
          ),
        ).not.toThrow();
        expect(() =>
          vitaminBalanceC026(
            v.initial,
            v.solid,
            v.water,
            v.measured,
            v.keepWater,
          ),
        ).not.toThrow();
      }
    expect(
      normalizeBiologyC026({ initial: 0, solid: undefined, water: "20" }),
    ).toMatchObject({ initial: 0, solid: 0, water: 0 });
  });
});
describe("026 BiologyC actual hook interaction and restoration", () => {
  it("renders six changing models with SVG and full HTML quantities", () => {
    for (const [id, patch, needle] of [
      [
        "proteinler",
        { length: 8, topology: "ring", cutMask: 9 },
        'data-fragment-mass="594"',
      ],
      [
        "enzimler",
        { enzymeMode: "rate", substrate: 4, enzyme: 3, inhibitor: 2 },
        'data-rate="2.4"',
      ],
      [
        "enzimler",
        { enzymeMode: "energy", energyProfile: 1, lowering: 30 },
        'data-energy-final="30"',
      ],
      ["enzimler", { enzymeMode: "conditions" }, 'data-activity="10"'],
      [
        "vitaminler",
        { initial: 100, solid: 60, measured: false },
        'data-amount="unknown"',
      ],
      [
        "vitaminler",
        { vitaminMode: "roles", vitamin: "B12" },
        'data-solubility="water"',
      ],
    ] as [string, Record<string, string | number | boolean>, string][]) {
      fixture.records = { [key(id)]: { ...biologyCDefaults026, ...patch } };
      const h = html(id);
      expect(h).toContain(needle);
      expect(h).toContain('<svg viewBox="0 0 260');
      expect(h).toContain('data-model-result="true"');
      expect(h).not.toContain('role="status"');
    }
    fixture.records = {};
    expect(html("unavailable")).toBe("");
  });
  it("accepts a short reason through real callbacks and clears response after scientific changes", () => {
    for (const [id, patch, guess, label, value] of [
      ["proteinler", {}, "1", "Amino asit adedi", 7],
      ["enzimler", {}, "4", "Substrat S", 7],
      ["vitaminler", {}, "known", "Katıda ölçülen", 41],
    ] as [
      string,
      Record<string, string | number | boolean>,
      string,
      string,
      number,
    ][]) {
      fixture.records = { [key(id)]: { ...biologyCDefaults026, ...patch } };
      change(id, "Sonuç tahminin", guess);
      writeReason(id, "0");
      expect(button(id).disabled).toBe(false);
      compare(id);
      expect(html(id)).toContain("Tahminin modelle uyumlu.");
      change(id, label, value);
      expect(fixture.records[key(id)]).toMatchObject({
        guess: "",
        reason: "",
        checked: false,
      });
      expect(html(id)).not.toContain('role="status"');
    }
    fixture.records = {};
  });
  it("preserves a valid connectivity comparison when only folding the drawing", () => {
    fixture.records = {
      [key("proteinler")]: {
        ...biologyCDefaults026,
        guess: "1",
        reason: "6−5",
        checked: true,
      },
    };
    const before = html("proteinler");
    expect(before).toContain('role="status"');
    change("proteinler", "Katlı çizim", false);
    expect(fixture.records[key("proteinler")]).toMatchObject({
      folded: false,
      guess: "1",
      reason: "6−5",
      checked: true,
    });
    const after = html("proteinler");
    expect(after).toContain("Tahminin modelle uyumlu.");
    expect(after).toContain('data-fragments="1"');
    expect(after.match(/<svg[\s\S]*?<\/svg>/)?.[0]).not.toBe(
      before.match(/<svg[\s\S]*?<\/svg>/)?.[0],
    );
    fixture.records[key("proteinler")].folded = "false";
    expect(html("proteinler")).toContain('role="status"');
    change("proteinler", "Katlı çizim", false);
    expect(fixture.records[key("proteinler")].folded).toBe(false);
    expect(html("proteinler")).toContain('role="status"');
    fixture.records = {};
  });
  it("does not resurrect stale comparison by repairing scientific state through a display toggle", () => {
    for (const patch of [
      { length: "8" },
      { topology: "constructor" },
      { cutMask: 999 },
    ]) {
      fixture.records = {
        [key("proteinler")]: {
          ...biologyCDefaults026,
          ...patch,
          guess: "1",
          reason: "Eski",
          checked: true,
        },
      };
      expect(html("proteinler")).not.toContain('role="status"');
      change("proteinler", "Katlı çizim", false);
      expect(fixture.records[key("proteinler")]).toEqual(
        normalizeBiologyC026(fixture.records[key("proteinler")]),
      );
      expect(fixture.records[key("proteinler")].checked).toBe(false);
      expect(html("proteinler")).not.toContain('role="status"');
      writeReason("proteinler", "0");
      const repaired = normalizeBiologyC026(fixture.records[key("proteinler")]);
      change(
        "proteinler",
        "Sonuç tahminin",
        String(
          proteinGraphC026(
            repaired.length,
            repaired.topology,
            repaired.cutMask,
            repaired.pattern,
            repaired.folded,
          ).fragments,
        ),
      );
      expect(button("proteinler").disabled).toBe(false);
      compare("proteinler");
      expect(html("proteinler")).toContain('role="status"');
    }
    fixture.records = {};
  });
  it("closes stale feedback before wrong-type,enum or range repair and writes all canonical fields on first reason", () => {
    for (const [id, patch, guess, field, bad] of [
      ["proteinler", {}, "1", "length", "8"],
      ["proteinler", {}, "1", "topology", "constructor"],
      ["proteinler", {}, "6", "cutMask", 999],
      ["enzimler", {}, "4", "enzyme", "3"],
      ["enzimler", { enzymeMode: "energy" }, "-20", "lowering", 999],
      ["enzimler", { enzymeMode: "conditions" }, "X", "pHIndex", "2"],
      ["vitaminler", {}, "known", "solid", "40"],
      ["vitaminler", {}, "known", "measured", "false"],
      [
        "vitaminler",
        { vitaminMode: "roles" },
        "water",
        "vitamin",
        "constructor",
      ],
    ] as [
      string,
      Record<string, string | number | boolean>,
      string,
      string,
      string | number,
    ][]) {
      fixture.records = {
        [key(id)]: {
          ...biologyCDefaults026,
          ...patch,
          guess,
          reason: "Eski",
          checked: true,
          [field]: bad,
        },
      };
      expect(html(id)).not.toContain('role="status"');
      expect(button(id).disabled).toBe(true);
      writeReason(id, "C");
      expect(fixture.records[key(id)]).toEqual(
        normalizeBiologyC026(fixture.records[key(id)]),
      );
      expect(fixture.records[key(id)].checked).toBe(false);
      expect(button(id).disabled).toBe(false);
      compare(id);
      expect(html(id)).toContain('role="status"');
    }
    fixture.records = {};
  });
  it("ignores unrelated scientific fields and hidden unmeasured water but rejects blank and invalid guesses", () => {
    for (const [id, patch, guess, field] of [
      ["proteinler", {}, "1", "water"],
      ["enzimler", { enzymeMode: "rate" }, "4", "initial"],
      ["enzimler", { enzymeMode: "energy" }, "-20", "substrate"],
      ["vitaminler", { measured: false }, "unknown", "water"],
      ["vitaminler", { vitaminMode: "roles" }, "water", "solid"],
    ] as [
      string,
      Record<string, string | number | boolean>,
      string,
      string,
    ][]) {
      fixture.records = {
        [key(id)]: {
          ...biologyCDefaults026,
          ...patch,
          guess,
          reason: "O",
          checked: true,
          [field]: 999,
        },
      };
      expect(html(id)).toContain('role="status"');
    }
    for (const reason of ["", " \n\t"]) {
      fixture.records = {
        [key(ids[0])]: {
          ...biologyCDefaults026,
          guess: "1",
          reason,
          checked: true,
        },
      };
      expect(html(ids[0])).not.toContain('role="status"');
      expect(button(ids[0]).disabled).toBe(true);
    }
    fixture.records = {
      [key(ids[0])]: {
        ...biologyCDefaults026,
        guess: "__proto__",
        reason: "C",
        checked: true,
      },
    };
    expect(html(ids[0])).not.toContain('role="status"');
    writeReason(ids[0], "A".repeat(128));
    expect(fixture.records[key(ids[0])].reason).toHaveLength(120);
    fixture.records = {};
  });
});

it("separates all sixty method choices from knowledge and individual help steps", () => {
  const canonical = (text: string) =>
    text
      .normalize("NFKC")
      .toLocaleLowerCase("tr-TR")
      .replace(/[\p{P}\p{S}\s]/gu, "");
  const qs = forge026BiologyCLessons.flatMap((lesson) => lesson.questions);
  expect(new Set(qs.map((q) => canonical(q.guidance!.strategy))).size).toBe(60);
  for (const q of qs) {
    const g = q.guidance!;
    expect(g.steps.map(canonical), q.id).not.toContain(canonical(g.strategy));
    for (const knowledge of g.knowledge) {
      expect(g.steps.map(canonical), q.id + " knowledge/step").not.toContain(
        canonical(knowledge),
      );
      expect(canonical(g.strategy), q.id + " knowledge/method").not.toBe(
        canonical(knowledge),
      );
    }
  }
});
