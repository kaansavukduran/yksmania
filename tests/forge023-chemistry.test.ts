import { describe, it, expect, vi } from "vitest";
import { ChoiceSelect } from "../src/components/ChoiceSelect";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { questionContentIssues } from "../src/domain/questionContent";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
import {
  alkene023,
  alkeneChoices023,
  alkeneReactions023,
  alkyne023,
  alkyneChoices023,
  arene023,
  areneChoices023,
  compareIsomers023,
  functional023,
  functionalChoices023,
  isomer023,
  polymer023,
  structure023,
  forge023ChemistryLessons,
  forge023ChemistryGuides,
  forge023ChemistryTopics,
} from "../src/learning/forge023Chemistry";
const fixtures = vi.hoisted(() => ({
  values: {} as Record<string, Record<string, string | number | boolean>>,
  nodes: [] as { type: unknown; props: Record<string, unknown> }[],
  writes: vi.fn(),
}));
vi.mock("../src/store", () => ({
  useApp: () => ({
    state: { explorations: fixtures.values },
    update: (
      fn: (s: { explorations: typeof fixtures.values }) => {
        explorations: typeof fixtures.values;
      },
    ) => {
      const next = fn({ explorations: fixtures.values });
      fixtures.values = next.explorations;
      fixtures.writes(next);
      return Promise.resolve();
    },
  }),
}));
vi.mock("react/jsx-runtime", async (original) => {
  const actual = await original<typeof import("react/jsx-runtime")>();
  const capture =
    (fn: typeof actual.jsx) =>
    (...args: Parameters<typeof actual.jsx>) => {
      const node = fn(...args);
      fixtures.nodes.push(
        node as { type: unknown; props: Record<string, unknown> },
      );
      return node;
    };
  return { ...actual, jsx: capture(actual.jsx), jsxs: capture(actual.jsxs) };
});
vi.mock("react/jsx-dev-runtime", async (original) => {
  const actual = await original<typeof import("react/jsx-dev-runtime")>();
  return {
    ...actual,
    jsxDEV: (...args: Parameters<typeof actual.jsxDEV>) => {
      const node = actual.jsxDEV(...args);
      fixtures.nodes.push(
        node as { type: unknown; props: Record<string, unknown> },
      );
      return node;
    },
  };
});
import Lab from "../src/learning/Forge023ChemistryLab";

describe("five source-backed hydrocarbon and functional-group units", () => {
  it("covers all five exact headings with substantial teaching,worked reasoning and individually guided original questions", () => {
    expect(Object.values(forge023ChemistryTopics)).toEqual([
      "detail-450",
      "detail-451",
      "detail-452",
      "detail-453",
      "detail-454",
    ]);
    expect(
      forge023ChemistryGuides.reduce((n, g) => n + g.sections.length, 0),
    ).toBe(97);
    const all = forge023ChemistryLessons.flatMap((l) => l.questions);
    expect(all).toHaveLength(75);
    expect(new Set(all.map((q) => q.id)).size).toBe(75);
    expect(new Set(all.map((q) => q.guidance!.commonError)).size).toBe(75);
    expect(new Set(all.map((q) => q.guidance!.check)).size).toBe(75);
    for (const lesson of forge023ChemistryLessons) {
      expect(lesson.questions).toHaveLength(15);
      expect(lesson.subjectId).toBe("ayt-kimya");
      expect(lesson.tags).not.toContain("soru-seti");
      expect(lesson.body.length).toBeGreaterThanOrEqual(17);
      for (const q of lesson.questions) {
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(5);
        expect(questionContentIssues(q)).toEqual([]);
        expect(questionGuidanceSchema.safeParse(q.guidance).success).toBe(true);
        expect(q.guidance!.steps).toHaveLength(3);
        expect(q.guidance!.optionReasons).toHaveLength(5);
        expect(q.guidance!.optionReasons[q.answer]).toMatch(/^Doğru\./);
      }
    }
    for (const guide of forge023ChemistryGuides) {
      expect(guide.examples).toHaveLength(5);
      expect(guide.recall).toHaveLength(5);
      for (const s of guide.sections) {
        expect(s.paragraphs).toHaveLength(2);
        expect(s.paragraphs.every((p) => p.length > 100)).toBe(true);
      }
      for (const e of guide.examples) {
        expect(e.steps).toHaveLength(3);
        expect(e.check.length).toBeGreaterThan(35);
        expect(e.pitfall.length).toBeGreaterThan(25);
      }
    }
  });
  it("counts ring and chain formulas and independent sigma/pi totals literally", () => {
    const expected: Record<string, [string, number, number, number]> = {
      cyclopropane: ["C3H6", 9, 0, 1],
      propene: ["C3H6", 8, 1, 0],
      cyclobutane: ["C4H8", 12, 0, 1],
      but1: ["C4H8", 11, 1, 0],
      but2: ["C4H8", 11, 1, 0],
      methylpropene: ["C4H8", 11, 1, 0],
      methylcyclopropane: ["C4H8", 12, 0, 1],
      cyclopentane: ["C5H10", 15, 0, 1],
      pent1: ["C5H10", 14, 1, 0],
      cyclohexane: ["C6H12", 18, 0, 1],
      hex1: ["C6H12", 17, 1, 0],
    };
    for (const [key, [formula, sigma, pi, rings]] of Object.entries(expected))
      expect(isomer023(key)).toMatchObject({ formula, sigma, pi, rings });
    expect(compareIsomers023("cyclobutane", "but1").relationship).toBe(
      "Zincir–halka",
    );
    expect(compareIsomers023("but1", "but2").relationship).toBe("Konum");
    expect(
      compareIsomers023("cyclobutane", "methylcyclopropane").relationship,
    ).toBe("İskelet");
    expect(compareIsomers023("but2", "but2").same).toBe(true);
    expect(compareIsomers023("propene", "pent1").formulaMatches).toBe(false);
  });
  it("conserves each added atom in all four alkene substrates and all complete additions", () => {
    for (const kind of Object.keys(alkeneChoices023))
      for (const rx of Object.keys(alkeneReactions023))
        for (const stage of [0, 1, 2]) {
          const r = alkene023(kind, rx, stage, false),
            added = stage === 2 && rx !== "none";
          expect(r.counts.C).toBe(r.before.counts.C);
          expect(r.pi).toBe(added ? 0 : 1);
          expect((r.counts.H || 0) - (r.before.counts.H || 0)).toBe(
            added
              ? rx === "hydrogen" || rx === "water"
                ? 2
                : rx === "hcl"
                  ? 1
                  : 0
              : 0,
          );
          expect(r.counts.Br || 0).toBe(added && rx === "bromine" ? 2 : 0);
          expect(r.counts.Cl || 0).toBe(added && rx === "hcl" ? 1 : 0);
          expect(r.counts.O || 0).toBe(added && rx === "water" ? 1 : 0);
          for (let i = 0; i < r.atoms.length; i++)
            if (r.atoms[i].element === "C")
              expect(
                r.adjacency[i].reduce((n, b) => n + b.order, 0) +
                  r.hydrogens[i],
              ).toBe(4);
        }
  });
  it("attaches Cl/OH to the explicit ordinary Markovnikov site without inventing carbon rearrangement", () => {
    expect(alkene023("propene", "hcl", 2, false)).toMatchObject({
      formula: "C3H7Cl",
      name: "2-Kloropropan",
    });
    expect(alkene023("propene", "water", 2, false)).toMatchObject({
      formula: "C3H8O",
      name: "2-Propanol",
    });
    const hcl = alkene023("methylpropene", "hcl", 2, false),
      cl = hcl.atoms.findIndex((a) => a.element === "Cl");
    expect(hcl.adjacency[cl][0].atom).toBe(1);
    expect(hcl.formula).toBe("C4H9Cl");
    expect(alkene023("but2", "none", 0, true).configuration).toBe("trans");
    expect(alkene023("but2", "none", 0, false).configuration).toBe("cis");
    expect(alkene023("methylpropene", "none", 0, true).geometric).toBe(false);
  });
  it("preserves the cis/trans connectivity while actually moving only the side orientation", () => {
    const a = alkene023("but2", "none", 0, false),
      b = alkene023("but2", "none", 0, true);
    expect(a.formula).toBe(b.formula);
    expect(a.bonds).toEqual(b.bonds);
    expect(a.atoms[3].y).toBe(60);
    expect(b.atoms[3].y).toBe(250);
    expect(a.atoms.slice(0, 3)).toEqual(b.atoms.slice(0, 3));
  });
  it("counts polymer repeat atoms without falsely closing unspecified ends", () => {
    expect(polymer023("vinyl", 3)).toMatchObject({
      counts: { C: 6, H: 9, Cl: 3, F: 0 },
      newLinks: 2,
      repeat: "–CH2–CHCl–",
    });
    expect(polymer023("ethene", 4).counts).toEqual({
      C: 8,
      H: 16,
      Cl: 0,
      F: 0,
    });
    expect(polymer023("teflon", 2).counts).toEqual({ C: 4, H: 0, Cl: 0, F: 8 });
    expect(polymer023("ethene", 1).newLinks).toBe(0);
  });
  it("keeps one/two alkyne additions distinct and exact in three carbon skeletons", () => {
    for (const kind of Object.keys(alkyneChoices023))
      for (const rx of ["hydrogen", "bromine"])
        for (const step of [0, 1, 2]) {
          const r = alkyne023(kind, rx, step);
          expect(r.pi).toBe(2 - step);
          expect(r.counts.C).toBe(r.before.counts.C);
          expect(r.counts.H - r.before.counts.H).toBe(
            rx === "hydrogen" ? 2 * step : 0,
          );
          expect(r.counts.Br || 0).toBe(rx === "bromine" ? 2 * step : 0);
          expect(r.reagentMol).toBe(step);
        }
    expect(alkyne023("ethyne", "bromine", 2).formula).toBe("C2H2Br4");
    expect(alkyne023("propyne", "hydrogen", 2).formula).toBe("C3H8");
  });
  it("places the initial sp skeleton on one actual straight axis", () => {
    for (const kind of Object.keys(alkyneChoices023)) {
      const r = alkyne023(kind, "hydrogen", 0);
      const c = r.atoms.filter((a) => a.element === "C");
      expect(c.every((a) => a.y === 155)).toBe(true);
      for (let i = 1; i < c.length; i++)
        expect(c[i].x).toBeGreaterThan(c[i - 1].x);
    }
  });
  it("conserves water atoms through the enol/carbonyl rearrangement,including the etin aldehyde exception", () => {
    const expected = {
      ethyne: ["C2H4O", "Etanal"],
      propyne: ["C3H6O", "Propanon"],
      but2: ["C4H8O", "2-Bütanon"],
    };
    for (const [kind, [formula, name]] of Object.entries(expected)) {
      const enol = alkyne023(kind, "water", 1),
        carbonyl = alkyne023(kind, "water", 2);
      expect(enol.formula).toBe(formula);
      expect(carbonyl.formula).toBe(formula);
      expect(carbonyl.name).toBe(name);
      expect(enol.counts).toEqual(carbonyl.counts);
      expect(enol.pi).toBe(1);
      expect(carbonyl.pi).toBe(1);
      expect(carbonyl.reagentMol).toBe(1);
      expect(
        carbonyl.bonds.some(
          (b) => b.order === 2 && carbonyl.atoms[b.b].element === "O",
        ),
      ).toBe(true);
    }
  });
  it("finds terminal H only on the triple-bond carbon", () => {
    expect(alkyne023("ethyne", "hydrogen", 0).replaceableHydrogens).toBe(2);
    expect(alkyne023("propyne", "hydrogen", 0).replaceableHydrogens).toBe(1);
    expect(alkyne023("but2", "hydrogen", 0).replaceableHydrogens).toBe(0);
    expect(alkyne023("but2", "hydrogen", 0).counts.H).toBe(6);
  });
  it("keeps aromatic contribution choices identical in atoms/formula/equal ring-edge lengths", () => {
    for (const kind of Object.keys(areneChoices023))
      for (const pos of [1, 2, 3]) {
        const a = arene023(kind, "a", pos),
          b = arene023(kind, "b", pos),
          h = arene023(kind, "hybrid", pos);
        expect(a.atoms).toEqual(b.atoms);
        expect(a.bonds).toEqual(b.bonds);
        expect(a.formula).toBe(h.formula);
        if (a.aromatic) {
          const lengths = a.bonds
            .slice(0, 6)
            .map((edge) =>
              Math.hypot(
                a.atoms[edge.a].x - a.atoms[edge.b].x,
                a.atoms[edge.a].y - a.atoms[edge.b].y,
              ),
            );
          for (const len of lengths) expect(len).toBeCloseTo(65, 12);
          expect(a.piElectrons).toBe(6);
          expect(a.sigmaRing).toBe(6);
        }
      }
    expect(arene023("benzene", "hybrid", 1)).toMatchObject({
      formula: "C6H6",
      sigma: 12,
      hydrocarbon: true,
      aromatic: true,
    });
    expect(arene023("toluene", "hybrid", 1).formula).toBe("C7H8");
    expect(arene023("phenol", "hybrid", 1)).toMatchObject({
      formula: "C6H6O",
      hydrocarbon: false,
    });
    expect(arene023("aniline", "hybrid", 1).formula).toBe("C6H7N");
    expect(arene023("cyclohexane", "hybrid", 1)).toMatchObject({
      formula: "C6H12",
      piElectrons: 0,
      aromatic: false,
      hydrocarbon: true,
    });
  });
  it("moves a real second methyl connection for ortho/meta/para while preserving xylene formula", () => {
    for (const pos of [1, 2, 3]) {
      const r = arene023("xylene", "hybrid", pos);
      expect(r.formula).toBe("C8H10");
      expect(r.bonds.at(-1)).toMatchObject({ a: pos, b: 7, order: 1 });
    }
    expect(arene023("xylene", "hybrid", 2).label).toBe("m-Ksilen");
  });
  it("classifies OH by its actual local graph rather than counting every oxygen as an alcohol", () => {
    const expectations: Record<string, [string, number, number, string[]]> = {
      methanol: ["CH4O", 1, 1, ["alcohol"]],
      ethanol: ["C2H6O", 1, 1, ["alcohol"]],
      ether: ["C2H6O", 0, 0, ["ether"]],
      propan1: ["C3H8O", 1, 1, ["alcohol"]],
      propan2: ["C3H8O", 1, 1, ["alcohol"]],
      tert: ["C4H10O", 1, 1, ["alcohol"]],
      glycol: ["C2H6O2", 2, 2, ["alcohol", "alcohol"]],
      glycerol: ["C3H8O3", 3, 3, ["alcohol", "alcohol", "alcohol"]],
      phenol: ["C6H6O", 0, 1, ["phenol"]],
      benzyl: ["C7H8O", 1, 1, ["alcohol"]],
      acid: ["C2H4O2", 0, 1, ["acid"]],
      lactic: ["C3H6O3", 1, 2, ["acid", "alcohol"]],
      aldehyde: ["C2H4O", 0, 0, ["aldehyde"]],
      ketone: ["C3H6O", 0, 0, ["ketone"]],
      ester: ["C3H6O2", 0, 0, ["ester"]],
      amine: ["CH5N", 0, 0, ["amine"]],
      nitro: ["CH3NO2", 0, 0, ["nitro"]],
      nitrile: ["C2H3N", 0, 0, ["nitrile"]],
    };
    expect(Object.keys(expectations).sort()).toEqual(
      Object.keys(functionalChoices023).sort(),
    );
    for (const [
      key,
      [formula, alcoholCount, hydroxyCount, groups],
    ] of Object.entries(expectations)) {
      const r = functional023(key);
      expect(r).toMatchObject({ formula, alcoholCount, hydroxyCount });
      expect(r.groups.map((g) => g.kind).sort()).toEqual(groups.sort());
    }
    expect(
      functional023("glycerol")
        .groups.map((g) => g.degree)
        .sort(),
    ).toEqual([1, 1, 2]);
    expect(functional023("tert").groups[0]).toMatchObject({
      degree: 3,
      hydrogens: 0,
    });
    expect(functional023("methanol").groups[0]).toMatchObject({
      degree: 0,
      hydrogens: 3,
    });
  });
  it("keeps a real C≡N group out of the amino fallback", () => {
    const r = functional023("nitrile");
    expect(r).toMatchObject({
      formula: "C2H3N",
      sigma: 5,
      pi: 2,
      alcoholCount: 0,
    });
    expect(r.groups).toEqual([
      { kind: "nitrile", name: "Siyano grubu", atoms: [2, 1] },
    ]);
    expect(r.atoms[2].element).toBe("N");
    expect(r.hydrogens[2]).toBe(0);
    expect(r.bonds[1]).toMatchObject({ a: 1, b: 2, order: 3 });
  });
  it("rejects malformed runtime atom annotations and derived nonfinite/zero drawing lengths", () => {
    const base = {
      atoms: [
        { element: "C" as const, x: 0, y: 0 },
        { element: "C" as const, x: 10, y: 0 },
      ],
      bonds: [{ a: 0, b: 1, order: 1 }],
    };
    for (const bad of [
      { element: "Unobtainium" },
      { charge: NaN },
      { charge: Infinity },
      { charge: -2 },
      { aromatic: "yes" },
    ]) {
      const value = {
        ...base,
        atoms: [{ ...base.atoms[0], ...bad }, base.atoms[1]],
      };
      expect(() =>
        structure023(value as Parameters<typeof structure023>[0]),
      ).toThrow(RangeError);
    }
    for (const [a, b] of [
      [0, 0],
      [-1e308, 1e308],
    ])
      expect(() =>
        structure023({
          ...base,
          atoms: [
            { ...base.atoms[0], x: a },
            { ...base.atoms[1], x: b },
          ],
        }),
      ).toThrow(/GEOMETRY/);
    expect(() =>
      structure023({ ...base, bonds: [{ a: 0, b: 1, order: 1.5 }] }),
    ).toThrow(RangeError);
  });
  it("rejects unknown saved choices and invalid finite-stage boundaries in the pure APIs", () => {
    for (const key of ["toString", "__proto__", "unknown"]) {
      expect(() => isomer023(key)).toThrow(RangeError);
      expect(() => functional023(key)).toThrow(RangeError);
      expect(() => alkene023(key, "none", 0, false)).toThrow(RangeError);
      expect(() => alkyne023(key, "water", 0)).toThrow(RangeError);
      expect(() => arene023(key, "a", 1)).toThrow(RangeError);
    }
    for (const value of [-1, 0.5, 3, NaN, Infinity]) {
      expect(() => alkene023("ethene", "water", value, false)).toThrow(
        RangeError,
      );
      expect(() => alkyne023("ethyne", "water", value)).toThrow(RangeError);
    }
    expect(() => arene023("benzene", "a", 0)).toThrow(RangeError);
    expect(() => arene023("benzene", "a", 4)).toThrow(RangeError);
    expect(() => polymer023("vinyl", 5)).toThrow(RangeError);
    expect(() => polymer023("ethene", 1.1)).toThrow(RangeError);
    expect(() =>
      structure023({
        atoms: [
          { element: "C", x: 0, y: 0 },
          { element: "C", x: 3, y: 0 },
        ],
        bonds: [],
      }),
    ).toThrow(/DISCONNECTED/);
  });
  it("statically renders every actual Lab branch and checked feedback without claiming a browser/offline run", () => {
    const states = [
      [
        "ayt-sikloalkanlar",
        {
          first: "cyclobutane",
          second: "but2",
          prediction: "isomer",
          reason: "Aynı formül;halka ve pi farklı.",
          checked: true,
        },
        "C4H8",
      ],
      [
        "ayt-alkenler",
        {
          kind: "propene",
          reaction: "water",
          stage: 2,
          prediction: "no",
          reason: "C=C tekleşti.",
          checked: true,
        },
        "2-Propanol",
      ],
      [
        "ayt-alkinler",
        {
          kind: "propyne",
          reaction: "water",
          stage: 2,
          prediction: "yes",
          reason: "Başlangıçta uç C H taşır.",
          checked: true,
        },
        "Propanon",
      ],
      [
        "ayt-arenler",
        {
          kind: "xylene",
          position: 2,
          depiction: "b",
          prediction: "yes",
          reason: "Yalnız C ve H.",
          checked: true,
        },
        "m-Ksilen",
      ],
      [
        "ayt-alkoller",
        {
          kind: "lactic",
          group: 0,
          prediction: "yes",
          reason: "Bir sp³ alkol OH’si var.",
          checked: true,
        },
        "Laktik asit",
      ],
    ] as const;
    for (const [id, state, text] of states) {
      fixtures.values = { [`forge023:chemistry:${id}`]: { ...state } };
      const html = renderToStaticMarkup(createElement(Lab, { lessonId: id }));
      expect(html).toContain('data-forge023="' + id + '"');
      expect(html).toContain(text);
      expect(html).toContain('role="status"');
      expect(html).toContain("Kanıtla uyumlu.");
      expect(html).not.toMatch(/\bNaN\b|\bInfinity\b|<input[^>]+type="file"/);
    }
    for (const key of Object.keys(functionalChoices023)) {
      fixtures.values = { "forge023:chemistry:ayt-alkoller": { kind: key } };
      expect(() =>
        renderToStaticMarkup(createElement(Lab, { lessonId: "ayt-alkoller" })),
      ).not.toThrow();
    }
    fixtures.values = {
      "forge023:chemistry:ayt-alkenler": {
        view: "polymer",
        polymer: "teflon",
        units: 4,
      },
    };
    expect(
      renderToStaticMarkup(createElement(Lab, { lessonId: "ayt-alkenler" })),
    ).toContain("PTFE");
    fixtures.values = {};
  });
});

const restoreCases023: [
  string,
  Record<string, string | number | boolean>,
  string,
  string,
][] = [
  [
    "ayt-sikloalkanlar",
    {
      first: "cyclopentane",
      second: "pent1",
      focus: 2,
      prediction: "isomer",
      reason: "C5H10",
      checked: true,
    },
    "focus",
    "2",
  ],
  [
    "ayt-alkenler",
    {
      kind: "propene",
      reaction: "water",
      stage: 2,
      trans: false,
      focus: 3,
      view: "reaction",
      polymer: "ethene",
      units: 3,
      prediction: "no",
      reason: "Pi0",
      checked: true,
    },
    "stage",
    "2",
  ],
  [
    "ayt-alkinler",
    {
      kind: "propyne",
      reaction: "water",
      stage: 2,
      focus: 0,
      prediction: "yes",
      reason: "C≡CH",
      checked: true,
    },
    "stage",
    "2",
  ],
  [
    "ayt-arenler",
    {
      kind: "xylene",
      position: 2,
      depiction: "b",
      focus: 0,
      prediction: "yes",
      reason: "C/H",
      checked: true,
    },
    "position",
    "2",
  ],
  [
    "ayt-alkoller",
    {
      kind: "lactic",
      group: 1,
      focus: 1,
      prediction: "yes",
      reason: "OH",
      checked: true,
    },
    "group",
    "1",
  ],
];
function restoreRender023(id: string) {
  fixtures.nodes = [];
  return renderToStaticMarkup(createElement(Lab, { lessonId: id }));
}
function native023(
  type: string,
  predicate: (p: Record<string, unknown>) => boolean = () => true,
) {
  return fixtures.nodes.find((n) => (n.type === type || (type === "select" && n.type === ChoiceSelect)) && predicate(n.props))!
    .props;
}
function input023(
  type: string,
  predicate: (p: Record<string, unknown>) => boolean,
  value: string,
) {
  const props = native023(type, predicate);
  (props.onChange as (e: { target: { value: string } }) => void)({
    target: { value },
  });
}
function select023(label: string, value: string) {
  const props = native023("label", (p) => p.children === label);
  input023("select", (p) => p.id === props.htmlFor, value);
}
function button023(text: string) {
  return native023("button", (p) => p.children === text);
}

describe("023 chemistry raw saved selection boundary", () => {
  it("closes the five actual typeof-filter stale-feedback counterexamples and repairs on the first reason callback", () => {
    for (const [id, state, field, bad] of restoreCases023) {
      const key = "forge023:chemistry:" + id;
      fixtures.values = { [key]: { ...state, [field]: bad } };
      let html = restoreRender023(id);
      expect(html, id).not.toContain('class="c023-feedback"');
      expect(button023("Kıyasla").disabled, id).toBe(true);
      input023("textarea", () => true, "C");
      expect(typeof fixtures.values[key][field], id).toBe("number");
      expect(fixtures.values[key]).toMatchObject({
        reason: "C",
        checked: false,
      });
      html = restoreRender023(id);
      expect(html).not.toContain('class="c023-feedback"');
      expect(button023("Kıyasla").disabled).toBe(false);
      (button023("Kıyasla").onClick as () => void)();
      expect(restoreRender023(id)).toContain('class="c023-feedback"');
    }
    fixtures.values = {};
    fixtures.writes.mockClear();
  });
  it("rejects active enum,range and boolean corruption but ignores inactive fields and persists a complete canonical record", () => {
    const active: [
      string,
      Record<string, string | number | boolean>,
      Record<string, string | number | boolean>,
    ][] = [
      [
        "ayt-sikloalkanlar",
        restoreCases023[0][1],
        { first: "constructor", second: "__proto__", focus: 99 },
      ],
      [
        "ayt-alkenler",
        { ...restoreCases023[1][1], kind: "but2" },
        {
          kind: "constructor",
          reaction: "constructor",
          stage: 1.5,
          trans: "true",
          focus: 99,
          view: "constructor",
        },
      ],
      [
        "ayt-alkinler",
        restoreCases023[2][1],
        { kind: "constructor", reaction: "__proto__", stage: 99, focus: -1 },
      ],
      [
        "ayt-arenler",
        restoreCases023[3][1],
        {
          kind: "constructor",
          depiction: "constructor",
          position: 99,
          focus: NaN,
        },
      ],
      [
        "ayt-alkoller",
        restoreCases023[4][1],
        { kind: "constructor", group: 99, focus: Infinity },
      ],
    ];
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    for (const [id, state, bads] of active)
      for (const [field, bad] of Object.entries(bads)) {
        const key = "forge023:chemistry:" + id;
        fixtures.values = { [key]: { ...state, [field]: bad } };
        expect(restoreRender023(id), `${id}:${field}`).not.toContain(
          'class="c023-feedback"',
        );
        expect(button023("Kıyasla").disabled).toBe(true);
        input023("textarea", () => true, "0");
        restoreRender023(id);
        expect(button023("Kıyasla").disabled).toBe(false);
        (button023("Kıyasla").onClick as () => void)();
        expect(restoreRender023(id)).toContain('class="c023-feedback"');
      }
    for (const [id, state, hidden] of [
      [
        "ayt-alkenler",
        restoreCases023[1][1],
        { polymer: "constructor", units: 99, trans: "true" },
      ],
      [
        "ayt-arenler",
        { ...restoreCases023[3][1], kind: "benzene" },
        { position: "3" },
      ],
      [
        "ayt-arenler",
        { ...restoreCases023[3][1], kind: "cyclohexane" },
        { position: 99, depiction: "constructor" },
      ],
    ] as const) {
      const key = "forge023:chemistry:" + id;
      fixtures.values = { [key]: { ...state, ...hidden } };
      expect(restoreRender023(id)).toContain('class="c023-feedback"');
      input023("textarea", () => true, "O");
      expect(restoreRender023(id)).not.toContain('class="c023-feedback"');
      expect(button023("Kıyasla").disabled).toBe(false);
      if (id === "ayt-alkenler")
        expect(fixtures.values[key]).toMatchObject({
          polymer: "ethene",
          units: 4,
          trans: false,
        });
      else
        expect(fixtures.values[key].position).toBe(
          typeof hidden.position === "string" ? 1 : 3,
        );
    }
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
    fixtures.values = {};
    fixtures.writes.mockClear();
  });
  it("canonicalizes focus,group,step,view and polymer callbacks without reopening old feedback", () => {
    for (const [id, state, field, bad] of restoreCases023) {
      const key = "forge023:chemistry:" + id;
      fixtures.values = { [key]: { ...state, [field]: bad } };
      restoreRender023(id);
      select023("Atomu seç", "0");
      expect(typeof fixtures.values[key][field]).toBe("number");
      expect(fixtures.values[key].checked).toBe(false);
      expect(restoreRender023(id)).not.toContain('class="c023-feedback"');
    }
    const id = "ayt-alkenler",
      key = "forge023:chemistry:" + id;
    fixtures.values = {
      [key]: {
        ...restoreCases023[1][1],
        stage: "2",
        polymer: "constructor",
        units: 99,
      },
    };
    restoreRender023(id);
    (button023("Zincir kur").onClick as () => void)();
    expect(fixtures.values[key]).toMatchObject({
      stage: 0,
      polymer: "ethene",
      units: 4,
      view: "polymer",
      checked: false,
    });
    restoreRender023(id);
    select023("Monomer", "vinyl");
    restoreRender023(id);
    select023("Tekrar sayısı", "2");
    expect(fixtures.values[key]).toMatchObject({ polymer: "vinyl", units: 2 });
    expect(restoreRender023(id)).toContain("PVC");
    (button023("Katılma").onClick as () => void)();
    restoreRender023(id);
    (button023("Ürün").onClick as () => void)();
    expect(fixtures.values[key].stage).toBe(2);
    const fid = "ayt-alkoller",
      fk = "forge023:chemistry:" + fid;
    fixtures.values = { [fk]: { ...restoreCases023[4][1], group: "1" } };
    restoreRender023(fid);
    const group = fixtures.nodes.find(
      (n) =>
        n.type === "button" &&
        Array.isArray(n.props.children) &&
        (n.props.children as unknown[]).includes("İkincil –OH"),
    )!.props;
    (group.onClick as () => void)();
    expect(fixtures.values[fk]).toMatchObject({ group: 1, checked: false });
    fixtures.values = {};
    fixtures.writes.mockClear();
  });
  it("keeps blank reasons closed and preserves the120-character input contract", () => {
    const [id, state] = restoreCases023[0],
      key = "forge023:chemistry:" + id;
    for (const reason of ["", " ", "\n\t"]) {
      fixtures.values = { [key]: { ...state, reason } };
      expect(restoreRender023(id)).not.toContain('class="c023-feedback"');
      expect(button023("Kıyasla").disabled).toBe(true);
    }
    fixtures.values = { [key]: { ...state, focus: "2" } };
    restoreRender023(id);
    input023("textarea", () => true, "A".repeat(140));
    expect(fixtures.values[key].reason).toHaveLength(120);
    expect(native023AfterRender(id).maxLength).toBe(120);
    fixtures.values = {};
    fixtures.writes.mockClear();
  });
});
function native023AfterRender(id: string) {
  restoreRender023(id);
  return native023("textarea");
}
