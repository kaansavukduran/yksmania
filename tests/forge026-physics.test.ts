import { createHash } from "node:crypto";
import { describe, it, expect, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Forge026PhysicsLab, {
  physicsDefaults026,
  normalizePhysics026,
} from "../src/learning/Forge026PhysicsLab";
const restored026 = vi.hoisted(() => ({
  records: {} as Record<string, Record<string, unknown>>,
  writes: 0,
  evidence: ["keep"],
}));
vi.mock("../src/store", () => ({
  useApp: () => ({
    state: { explorations: restored026.records },
    update: async (
      fn: (s: {
        explorations: typeof restored026.records;
        evidence: string[];
      }) => { explorations: typeof restored026.records; evidence: string[] },
    ) => {
      const next = fn({
        explorations: restored026.records,
        evidence: restored026.evidence,
      });
      restored026.records = next.explorations;
      restored026.evidence = next.evidence;
      restored026.writes++;
    },
  }),
}));
import {
  measurement026,
  dimensions026,
  dimensionProduct026,
  density026,
  mixture026,
  similarity026,
  capillary026,
  motion026,
  rampEnergy026,
  springEnergy026,
  powerLedger026,
  forge026PhysicsGuides,
  forge026PhysicsLessons,
  forge026PhysicsTopics,
} from "../src/learning/forge026Physics";
import { sourceNarratives } from "../src/learning/narratives";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
import { questionContentIssues } from "../src/domain/questionContent";

const legacyHashes = {
  "fizik-bilimine-giris":
    "a05ee8bf122ec230af309d862f06a540418b6ecd512c91d2d1870845376343bb",
  "madde-ozkutle":
    "8ca752fc81612b0a70eb0ed171b591e9495443392f5756c789da53b89acbe688",
  "dogrusal-hareket":
    "23349fe159019cf2e6116534f7c4d36f51da432e4ae75cd2d4047957abe92a37",
  "enerji-ve-hareket":
    "1e3cb3c12216980669e41dea1150f248949f82aa9d14e60e82abfef790e0b17c",
};
describe("026 physics legacy preservation and authored depth", () => {
  it("preserves complete original four Lessons, including body and all20 original cards", () => {
    for (const [id, expected] of Object.entries(legacyHashes)) {
      const original = sourceNarratives.find((l) => l.id === id)!;
      expect(original.questions).toHaveLength(5);
      expect(
        createHash("sha256").update(JSON.stringify(original)).digest("hex"),
      ).toBe(expected);
      const guide = forge026PhysicsGuides.find((g) => g.id === id)!;
      expect(guide.sections.slice(0, 6).map((s) => s.title)).toEqual(
        original.body.map((s) => s.title.tr),
      );
    }
  });
  it("has4 deep existing-ID guides and96 separate advanced cards with all five semantic reasons", () => {
    expect(forge026PhysicsGuides.map((g) => g.id)).toEqual(
      Object.keys(legacyHashes),
    );
    expect(
      forge026PhysicsGuides.reduce((n, g) => n + g.sections.length, 0),
    ).toBe(94);
    expect(forge026PhysicsLessons.map((l) => l.questions.length)).toEqual([
      24, 24, 24, 24,
    ]);
    expect(Object.values(forge026PhysicsTopics)).toEqual([
      "detail-114",
      "detail-115",
      "detail-116",
      "detail-118",
    ]);
    const ids = new Set<string>();
    for (const [i, lesson] of forge026PhysicsLessons.entries()) {
      expect(lesson.id).toBe(forge026PhysicsGuides[i].id + "-ileri");
      expect(lesson.body).toEqual([]);
      expect(lesson.tags).toContain("soru-seti");
      const counts = [0, 0, 0, 0, 0];
      const answers = lesson.questions.map((q) => q.answer);
      for (const q of lesson.questions) {
        expect(ids.has(q.id)).toBe(false);
        ids.add(q.id);
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(questionContentIssues(q)).toEqual([]);
        const h = questionGuidanceSchema.parse(q.guidance);
        expect(h.steps).toHaveLength(3);
        expect(h.optionReasons).toHaveLength(5);
        expect(h.optionReasons[q.answer]).toMatch(/^Doğru/);
        expect(
          h.steps.every((s) => s !== h.strategy && !h.knowledge.includes(s)),
        ).toBe(true);
        counts[q.answer]++;
      }
      expect(Math.max(...counts) - Math.min(...counts)).toBeLessThanOrEqual(1);
      for (let k = 2; k < answers.length; k++)
        expect(
          answers[k] === answers[k - 1] && answers[k] === answers[k - 2],
        ).toBe(false);
      for (let period = 1; period <= 8; period++)
        expect(answers.every((x, j) => x === answers[j % period])).toBe(false);
    }
    expect(ids.size).toBe(96);
    for (const g of forge026PhysicsGuides) {
      expect(g.examples).toHaveLength(8);
      expect(g.recall).toHaveLength(8);
      for (const s of g.sections) {
        expect(s.paragraphs).toHaveLength(2);
        expect(s.paragraphs.every((p) => p.length > 100)).toBe(true);
      }
      for (const e of g.examples) {
        expect(e.steps).toHaveLength(3);
        expect(e.check.length).toBeGreaterThan(30);
        expect(e.pitfall.length).toBeGreaterThan(20);
        expect(
          forge026PhysicsLessons
            .flatMap((l) => l.questions)
            .some((q) => q.prompt.tr === e.prompt),
        ).toBe(false);
      }
    }
  });
});
describe("026 calibration and dimension boundaries", () => {
  it("removes known offset without claiming repeated precision removes systematic effects", () => {
    const m = measurement026([5.3, 5.5, 5.4], 0.2, 0.1);
    expect(m.indicatedMean).toBeCloseTo(5.4, 12);
    expect(m.mean).toBeCloseTo(5.2, 12);
    expect(m.spread).toBeCloseTo(0.2, 12);
    expect(m.halfStep).toBe(0.05);
    expect(measurement026([10.2, 10.2, 10.2], 0.2, 0.1).mean).toBe(10);
    expect(measurement026([10.2, 10.2, 10.2], 0, 0.1).mean).toBeCloseTo(
      10.2,
      12,
    );
  });
  it("separates necessary SI powers from physical law coefficients and vector meaning", () => {
    expect(
      dimensionProduct026([
        { quantity: "mass", power: 1 },
        { quantity: "velocity", power: 2 },
      ]).powers,
    ).toEqual([1, 2, -2, 0, 0, 0, 0]);
    expect(
      dimensionProduct026([
        { quantity: "force", power: 1 },
        { quantity: "length", power: -2 },
      ]).powers,
    ).toEqual([1, -1, -2, 0, 0, 0, 0]);
    expect(dimensions026.speed.powers).toEqual(dimensions026.velocity.powers);
    expect(dimensions026.speed.vector).toBe(false);
    expect(dimensions026.velocity.vector).toBe(true);
    expect(Object.values(dimensions026).filter((d) => d.base)).toHaveLength(7);
  });
});
describe("026 mass/volume and geometric scope", () => {
  it("uses tare and full volume, but gives only an upper bound for partial immersion", () => {
    expect(density026(78, 18, 40, 64, "full")).toMatchObject({
      mass: 60,
      displaced: 24,
      density: 2.5,
      densitySI: 2500,
      upperBound: null,
    });
    expect(density026(78, 18, 40, 64, "partial")).toMatchObject({
      density: null,
      densitySI: null,
      upperBound: 2.5,
    });
    expect(() => density026(10, 10, 0, 1, "full")).toThrow(RangeError);
    expect(() => density026(20, 10, 5, 5, "full")).toThrow(RangeError);
  });
  it("uses measured final mixture volume and distinguishes relative from absolute support", () => {
    const m = mixture026(1, 1.1, 50, 50, 95);
    expect(m.mass).toBeCloseTo(105, 12);
    expect(m.density).toBeCloseTo(21 / 19, 12);
    expect(m.additiveDensity).toBeCloseTo(1.05, 12);
    expect(m.volumeChange).toBe(-5);
    expect(similarity026(2)).toMatchObject({
      areaFactor: 4,
      volumeFactor: 8,
      massFactor: 8,
      relativeSupportFactor: 0.5,
      absoluteLoadFactor: 4,
    });
    expect(similarity026(0.5).relativeSupportFactor).toBe(2);
  });
  it("keeps90degrees exact and changes capillary sign rather than treating all surfaces as wetting", () => {
    expect(capillary026(1, 0.05, 90, 1000).heightM).toBe(0);
    expect(capillary026(1, 0.05, 120, 1000).heightMm).toBeCloseTo(-5, 12);
    expect(capillary026(1, 0.05, 60, 1000).heightMm).toBeCloseTo(5, 12);
    expect(capillary026(0.5, 0.05, 60, 1000).heightMm).toBeCloseTo(10, 12);
  });
});
describe("026 motion has actual within-phase reversal, frame path and finite endpoints", () => {
  const pieces = [
    { duration: 4, acceleration: -2 },
    { duration: 2, acceleration: 0 },
    { duration: 0, acceleration: 5 },
  ];
  it("integrates signed displacement and absolute distance separately", () => {
    const m = motion026(6, pieces, 3);
    expect(m.totalTime).toBe(6);
    expect(m.displacement).toBe(4);
    expect(m.distance).toBe(14);
    expect(m.averageVelocity).toBeCloseTo(2 / 3, 12);
    expect(m.averageSpeed).toBeCloseTo(7 / 3, 12);
    expect(m.current).toMatchObject({ x: 9, v: 0, a: -2 });
    expect(m.turns).toEqual([3]);
    expect(m.segments[1].start).toMatchObject({ x: 8, v: -2, t: 4 });
    expect(motion026(6, pieces, 6).current.a).toBeNull();
  });
  it("reports isolated reversals at shared positive-time boundaries without counting a touch, wait or zero-time phase", () => {
    const phase = (duration: number, acceleration: number) => ({
      duration,
      acceleration,
    });
    expect(motion026(2, [phase(1, -2), phase(1, -2)], 1).turns).toEqual([1]);
    expect(motion026(-2, [phase(1, 2), phase(1, 2)], 1).turns).toEqual([1]);
    expect(motion026(3, [phase(1, -2), phase(1, -2)], 1, 1).turns).toEqual([1]);
    expect(motion026(2, [phase(1, -2), phase(1, 2)], 1).turns).toEqual([]);
    expect(
      motion026(2, [phase(1, -2), phase(0, 50), phase(1, -2)], 1).turns,
    ).toEqual([1]);
    expect(
      motion026(2, [phase(1, -2), phase(1, 0), phase(1, -2)], 1).turns,
    ).toEqual([]);
    expect(motion026(0, [phase(0, -2), phase(1, 2)], 0).turns).toEqual([]);
    expect(motion026(2, [phase(1, -2)], 1).turns).toEqual([]);
  });
  it("recomputes the new observer's absolute path and carries state across zero-duration phases", () => {
    const m = motion026(6, pieces, 3, 1);
    expect(m.displacement).toBe(-2);
    expect(m.distance).toBe(14.5);
    expect(m.averageVelocity).toBeCloseTo(-1 / 3, 12);
    expect(m.current).toMatchObject({ x: 6, v: -1, a: -2 });
    const zero = motion026(3, [{ duration: 0, acceleration: 2 }], 0, 0, 7);
    expect(zero.current).toMatchObject({ x: 7, v: 3, a: null });
    expect(zero.averageVelocity).toBeNull();
    expect(zero.averageSpeed).toBeNull();
    const boundary = motion026(
      1,
      [
        { duration: 2, acceleration: 1 },
        { duration: 0, acceleration: 4 },
        { duration: 2, acceleration: -2 },
      ],
      2,
    );
    expect(boundary.current).toMatchObject({ x: 4, v: 3, a: -2 });
  });
});
describe("026 energy stops physically and preserves complete sign-aware balances", () => {
  it("includes a zero-speed reachable endpoint, excludes any path beyond it, and does not invent motion from rest", () => {
    const stop = rampEnergy026(2, 3, 4, 7, 0, 5);
    expect(stop).toMatchObject({
      initialK: 9,
      netForce: -3,
      distance: 3,
      reached: false,
      finalK: 0,
      thermalGain: 21,
      driveWork: 12,
      elapsed: 2,
    });
    expect(rampEnergy026(2, 3, 4, 7, 0, 3)).toMatchObject({
      reached: true,
      finalK: 0,
      distance: 3,
    });
    expect(rampEnergy026(2, 3, 4, 7, 0, 3 + Number.EPSILON * 3).reached).toBe(
      false,
    );
    expect(rampEnergy026(2, 0, 0, 0, 0, 5)).toMatchObject({
      distance: 0,
      reached: false,
      finalK: 0,
    });
    expect(rampEnergy026(2, 0, 0, 0, 0, 0).reached).toBe(true);
    expect(rampEnergy026(2, 0, 1, 0, 0, 1)).toMatchObject({
      distance: 1,
      reached: true,
      finalK: 1,
      finalSpeed: 1,
      elapsed: 2,
    });
  });
  it("accounts for descending gravitational release without treating internal energy as destroyed", () => {
    const m = rampEnergy026(1, 0, 0, 1, -0.2, 5);
    expect(m).toMatchObject({
      reached: true,
      finalK: 5,
      thermalGain: 5,
      potentialChange: -10,
    });
    expect(m.initialK + m.driveWork).toBeCloseTo(
      m.finalK + m.potentialChange + m.thermalGain,
      12,
    );
  });
  it("uses initial and final spring deposits and separates net from returned external energy", () => {
    const s = springEnergy026(200, -0.1, 0.2);
    expect(s.initialU).toBeCloseTo(1, 12);
    expect(s.finalU).toBeCloseTo(4, 12);
    expect(s.change).toBeCloseTo(3, 12);
    expect(s.springWork).toBeCloseTo(-3, 12);
    expect(s.externalQuasistaticWork).toBeCloseTo(3, 12);
    expect(s.initialForce).toBe(20);
    expect(s.finalForce).toBe(-40);
    expect(springEnergy026(200, -0.2, 0.2).change).toBe(0);
  });
  it("preserves J/kWh and useful/other energy while leaving0/0efficiency undefined", () => {
    expect(powerLedger026(750, 480, 0.6)).toMatchObject({
      inputEnergy: 360000,
      usefulEnergy: 216000,
      otherEnergy: 144000,
      kWh: 0.1,
      measuredEfficiency: 0.6,
    });
    expect(powerLedger026(0, 10, 0.8)).toMatchObject({
      inputEnergy: 0,
      usefulEnergy: 0,
      measuredEfficiency: null,
    });
    expect(powerLedger026(100, 0, 1).measuredEfficiency).toBeNull();
    expect(powerLedger026(100, 1, 1).otherEnergy).toBe(0);
  });
});
describe("026 exported boundaries never coerce untrusted numbers, sparse records or inherited names", () => {
  it("rejects unsupported primitive values before arithmetic", () => {
    for (const bad of [NaN, Infinity, -Infinity, "1", null, true, {}, []]) {
      const v = bad as number;
      for (const call of [
        () => measurement026([1, v], 0, 0.1),
        () => measurement026([1, 2], v, 0.1),
        () => density026(v, 0, 0, 1, "full"),
        () => mixture026(1, 2, 1, 1, v),
        () => similarity026(v),
        () => capillary026(1, 0.05, v, 1000),
        () => motion026(v, [{ duration: 1, acceleration: 1 }], 0),
        () => motion026(1, [{ duration: 1, acceleration: 1 }], v),
        () => rampEnergy026(1, 1, 1, 1, 0, v),
        () => springEnergy026(100, v, 0),
        () => powerLedger026(1, 1, v),
      ])
        expect(call).toThrow(RangeError);
    }
    for (const call of [
      () => measurement026(Array(3), 0, 0.1),
      () => dimensionProduct026(Array(2)),
      () => dimensionProduct026([{ quantity: "toString" as never, power: 1 }]),
      () => motion026(1, Array(2), 0),
      () => motion026(1, [{ duration: 1, acceleration: 1 }], 2),
      () => density026(2, 0, 0, 1, "toString" as never),
      () => capillary026(0, 0.05, 0, 1000),
      () => powerLedger026(1, 1, 1.01),
    ])
      expect(call).toThrow(RangeError);
  });
});

const labVariants026 = [
  {
    id: "fizik-bilimine-giris",
    view: "measure",
    guess: "Azalır",
    active: ["r1", "r2", "r3", "offset", "resolution"],
    hidden: { mass: "bad", tare: 90 },
  },
  {
    id: "fizik-bilimine-giris",
    view: "dimensions",
    guess: "Uyumlu",
    active: ["dimA", "dimB", "expA", "expB", "target"],
    hidden: { r1: "bad", mass: 1, tare: 50 },
  },
  {
    id: "madde-ozkutle",
    view: "density",
    guess: "Kesin değer",
    active: ["mass", "tare", "vStart", "vEnd", "immersion"],
    hidden: { rho1: "bad", contact: "bad" },
  },
  {
    id: "madde-ozkutle",
    view: "mix",
    guess: "Artar",
    active: ["rho1", "rho2", "vol1", "vol2", "finalVol"],
    hidden: { mass: 1, tare: 50 },
  },
  {
    id: "madde-ozkutle",
    view: "scale",
    guess: "Hacim",
    active: ["scale"],
    hidden: { mass: "bad", vEnd: "bad" },
  },
  {
    id: "madde-ozkutle",
    view: "capillary",
    guess: "Üstte",
    active: ["radius", "tension", "contact", "fluid"],
    hidden: { mass: 1, tare: 50 },
  },
  {
    id: "dogrusal-hareket",
    view: "motion",
    guess: "Yol daha büyük",
    active: [
      "velocity",
      "frame",
      "origin",
      "t1",
      "a1",
      "t2",
      "a2",
      "t3",
      "a3",
      "sample",
    ],
    hidden: { contact: "bad", springEnd: "bad", view: "bad" },
  },
  {
    id: "enerji-ve-hareket",
    view: "ramp",
    guess: "Durur",
    active: ["emass", "speed", "drive", "resist", "slope", "path"],
    hidden: { stiffness: "bad", dimA: "bad" },
  },
  {
    id: "enerji-ve-hareket",
    view: "spring",
    guess: "Artar",
    active: ["stiffness", "springStart", "springEnd"],
    hidden: { drive: "bad", path: "bad" },
  },
  {
    id: "enerji-ve-hareket",
    view: "power",
    guess: "Daha az",
    active: ["inputPower", "seconds", "eta"],
    hidden: { drive: "bad", contact: "bad" },
  },
] as const;
const html026 = (id: string) =>
  renderToStaticMarkup(createElement(Forge026PhysicsLab, { lessonId: id }));
const record026 = (v: (typeof labVariants026)[number]) => ({
  ...physicsDefaults026,
  view: v.view,
  guess: v.guess,
  reason: "Önceki kayıt gerekçesi",
  checked: true,
});
type Element026 = {
  type?: unknown;
  props?: {
    children?: unknown;
    s?: unknown;
    commit?: (patch: Record<string, unknown>) => void;
    values?: { guess: string };
    question?: string;
    valid?: boolean;
  };
};
const nodes026 = (node: unknown): Element026[] =>
  Array.isArray(node)
    ? node.flatMap(nodes026)
    : node && typeof node === "object" && "props" in node
      ? [node as Element026, ...nodes026((node as Element026).props?.children)]
      : [];
function comparison026(id: string) {
  const outer = Forge026PhysicsLab({ lessonId: id }) as unknown as Element026;
  const tree = (outer.type as (props: unknown) => unknown)(outer.props);
  const view = nodes026(tree).find((n) => n.props?.s && n.props.commit)!;
  return nodes026((view.type as (props: unknown) => unknown)(view.props)).find(
    (n) => n.props?.values && n.props.commit && n.props.question,
  )!;
}
describe("026 actual Lab JSX and production-hook restore contracts", () => {
  it("renders each of10 real models with full selected HTML and old/advancedID identity", () => {
    for (const v of labVariants026) {
      const key = "forge026-physics-" + v.id;
      restored026.records = { [key]: record026(v) };
      const html = html026(v.id);
      expect(html).toContain('data-forge026="' + v.id + '"');
      expect(html).toContain("data-model-result");
      expect(html).toContain('role="img"');
      expect(html).toContain('role="status"');
      expect(html).toContain("Seçili:");
      expect(html).not.toMatch(/NaN|Infinity|undefined/);
      restored026.records = { [key + "-ileri"]: record026(v) };
      expect(html026(v.id + "-ileri")).toContain(
        'data-forge026="' + v.id + '-ileri"',
      );
    }
    expect(html026("unknown")).toBe("");
    restored026.records = {};
  });
  it("blocks raw wrong types after the actual hook masks them; first explicit intent repairs every owned value", () => {
    for (const v of labVariants026) {
      const key = "forge026-physics-" + v.id,
        fields = [
          ...v.active,
          ...(v.view === "motion" ? [] : ["view"]),
          "reason",
          "guess",
          "checked",
        ];
      for (const field of fields) {
        const previous = record026(v),
          example = previous[field as keyof typeof previous];
        restored026.records = {
          [key]: {
            ...previous,
            ...v.hidden,
            [field]:
              typeof example === "number"
                ? String(example)
                : typeof example === "boolean"
                  ? "true"
                  : false,
          },
        };
        const before = JSON.stringify(restored026.records),
          writes = restored026.writes,
          html = html026(v.id);
        expect(html, `${v.id}/${v.view}/${field}`).not.toContain(
          'role="status"',
        );
        expect(html).toMatch(/<button[^>]*disabled[^>]*>Kanıtla kıyasla/);
        expect(JSON.stringify(restored026.records)).toBe(before);
        expect(restored026.writes).toBe(writes);
        comparison026(v.id).props!.commit!({ reason: "γ↑", checked: false });
        expect(restored026.records[key].reason).toBe("γ↑");
        expect(restored026.records[key].checked).toBe(false);
        expect(typeof restored026.records[key][field]).toBe(typeof example);
        if (!comparison026(v.id).props!.values!.guess) {
          const guesses: Record<string, string> = {
            measure: "Azalır",
            dimensions: "Uyumlu",
            density: "Kesin değer",
            mix: "Artar",
            scale: "Hacim",
            capillary: "Üstte",
            motion: "Yol daha büyük",
            ramp: "Durur",
            spring: "Artar",
            power: "Daha az",
          };
          const fallback = guesses[String(restored026.records[key].view)];
          comparison026(v.id).props!.commit!({
            guess: fallback,
            checked: false,
          });
        }
        expect(html026(v.id)).not.toMatch(
          /<button[^>]*disabled[^>]*>Kanıtla kıyasla/,
        );
        comparison026(v.id).props!.commit!({ checked: true });
        expect(html026(v.id)).toContain('role="status"');
        comparison026(v.id).props!.commit!({
          reason: "x".repeat(140),
          checked: false,
        });
        expect(restored026.records[key].reason).toBe("x".repeat(128));
        expect(restored026.evidence).toEqual(["keep"]);
      }
    }
    restored026.records = {};
  });
  it("ignores inactive bad state, rejects active enum/range and joint constraints, and preserves blank-reason semantics", () => {
    for (const v of labVariants026) {
      const key = "forge026-physics-" + v.id;
      restored026.records = {
        [key]: { ...record026(v), ...v.hidden, unrelated: false },
      };
      expect(html026(v.id), `${v.id}/${v.view}/hidden`).toContain(
        'role="status"',
      );
      for (const field of v.active) {
        const example =
          physicsDefaults026[field as keyof typeof physicsDefaults026];
        for (const bad of typeof example === "number"
          ? [NaN, Infinity, 1e9, 0.125]
          : ["constructor", ""]) {
          restored026.records = { [key]: { ...record026(v), [field]: bad } };
          expect(html026(v.id), `${v.view}/${field}/${bad}`).not.toContain(
            'role="status"',
          );
        }
      }
      for (const reason of ["", "   "]) {
        restored026.records = { [key]: { ...record026(v), reason } };
        expect(html026(v.id)).not.toContain('role="status"');
        expect(html026(v.id)).toMatch(
          /<button[^>]*disabled[^>]*>Kanıtla kıyasla/,
        );
      }
    }
    const joint = {
      ...physicsDefaults026,
      view: "density",
      mass: 30,
      tare: 80,
    };
    const n = normalizePhysics026("madde-ozkutle", joint, joint);
    expect(n.valid).toBe(false);
    expect(n.values.mass).toBe(90);
    expect(n.values.tare).toBe(15);
    expect(normalizePhysics026("fizik-bilimine-giris", {}).valid).toBe(true);
    const inherited = Object.create({ r1: "bad", view: "bad" });
    expect(
      normalizePhysics026("fizik-bilimine-giris", inherited, inherited).valid,
    ).toBe(true);
    expect(() => normalizePhysics026("toString" as never, {})).toThrow(
      RangeError,
    );
    restored026.records = {};
  });
});
