import { describe, it, expect, vi } from "vitest";
import {
  createElement,
  Children,
  isValidElement,
  type ReactNode,
  type ReactElement,
} from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createHash } from "node:crypto";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
import { questionContentIssues } from "../src/domain/questionContent";
import { sourceNarratives } from "../src/learning/narratives";
import { chemistryNarratives } from "../src/learning/narratives/chemistry";
import {
  atom026,
  ion026,
  aggregate026,
  relations026,
  mixture026,
  abundance026,
  compounds026,
  pairs026,
  isotopeSamples026,
  defaultsChemistry026,
  normalizeChemistry026,
  forge026ChemistryGuides,
  forge026ChemistryLessons,
  forge026ChemistryTopics,
} from "../src/learning/forge026Chemistry";
const fixture = vi.hoisted(() => ({
  values: {} as Record<string, Record<string, string | number | boolean>>,
  writes: vi.fn(),
}));
vi.mock("../src/store", () => ({
  useApp: () => ({ state: { explorations: fixture.values } }),
}));
vi.mock("../src/learning/useExploration", () => ({
  useExploration: (
    key: string,
    defaults: Record<string, string | number | boolean>,
  ) => [
    Object.fromEntries(
      Object.entries(defaults).map(([k, v]) => [
        k,
        typeof fixture.values[key]?.[k] === typeof v
          ? fixture.values[key][k]
          : v,
      ]),
    ),
    (patch: Record<string, string | number | boolean>) => {
      fixture.writes(patch);
      fixture.values[key] = { ...defaults, ...fixture.values[key], ...patch };
    },
  ],
}));
import Lab from "../src/learning/Forge026ChemistryLab";
type Props = {
  children?: ReactNode;
  label?: string;
  value?: unknown;
  disabled?: boolean;
  onChange?: (x: unknown) => void;
  onClick?: () => void;
  "data-prediction"?: boolean;
  "data-reason"?: boolean;
  options?: Record<string, string>;
};
function nodes(tree: ReactNode) {
  const out: ReactElement<Props>[] = [];
  const visit = (tree: ReactNode) =>
    Children.forEach(tree, (n) => {
      if (isValidElement<Props>(n)) {
        out.push(n);
        visit(n.props.children);
      }
    });
  visit(tree);
  return out;
}
const legacyIds = ["atomun-temel-tanecikleri", "izotop-izoton-izobar"],
  key = (id: string) => "forge026:chemistry:" + id,
  html = (id = legacyIds[0]) =>
    renderToStaticMarkup(createElement(Lab, { lessonId: id })),
  compact = (x: string) => x.replace(/\s/g, "");
const correct = [
  [
    "14,16,16",
    "22",
    "13",
    "15;+1",
    "0,+2,−2",
    "19;−1",
    "p+n toplamı",
    "Z=7,q=+8",
    "10",
    "−2;anyon",
    "Kütle numarası26kalır.",
    "8;10",
    "32",
    "32;40",
    "A bir artar;q değişmez.",
    "p=2,n=1,e=2;p>n olabilir.",
    "Yalnız A,24olmalı.",
    "−2",
    "12;+2",
    "27",
    "Proton/elektron oranı",
    "n doğru,e10olmalı.",
    "3",
    "−2",
    "Elektron kütlesi küçük katkıdır;tam sıfır olduğu söylenmez.",
  ],
  [
    "İzotop;15ve12",
    "İzoton",
    "20ve19;izobar",
    "Aynı çekirdek türünün farklı yük hâlleridir.",
    "İzoelektroniklik",
    "İzotop aynı Z,izobar farklı Z ister.",
    "−3",
    "−4",
    "AV−AU=3",
    "16;24",
    "P–S izoton;R–S izobar",
    "Elektronları eşit,nötronları farklıdır.",
    "Elektron sayıları eşittir;dizilim eşitliği ayrıca gerekir.",
    "Çekirdekleri aynı,verilmiş dizilimleri farklıdır.",
    "6,25",
    "%60",
    "21,1",
    "11,2u",
    "Üç bolluk tek tek belirlenemez.",
    "Elektronik yapıları aynı;TYT’de kimyasal davranışları benzer kabul edilir.",
    "Net yükleri farklıdır.",
    "560",
    "+1,00",
    "İzoton ve izoelektronik",
    "Z₁=Z₂;aynı çekirdek türüdürler.",
  ],
];
describe("026 chemistry legacy depth and new advanced sets", () => {
  it("preserves the complete two legacy lessons and all ten old questions", () => {
    const hashes = [
      "797ddb54b30a0ffa3efa563b4d0f30c358d28d251db53b3b863e92fa8b5d0c6f",
      "c630b77c5c06b9c447aea4c752110a8f6106814539627738e248251c7f08f02d",
    ];
    for (const [i, id] of legacyIds.entries()) {
      const old = sourceNarratives.find((l) => l.id === id)!;
      expect(old.questions).toHaveLength(5);
      expect(
        createHash("sha256").update(JSON.stringify(old)).digest("hex"),
      ).toBe(hashes[i]);
      expect(
        forge026ChemistryGuides[i].sections.slice(0, 6).map((s) => s.title),
      ).toEqual(chemistryNarratives[i].body.map((b) => b.title));
    }
    expect(forge026ChemistryLessons.map((l) => l.id)).toEqual(
      legacyIds.map((id) => id + "-ileri"),
    );
    expect(forge026ChemistryGuides.map((g) => g.sections.length)).toEqual([
      20, 20,
    ]);
    expect(forge026ChemistryGuides.map((g) => g.examples.length)).toEqual([
      6, 6,
    ]);
    expect(Object.values(forge026ChemistryTopics)).toEqual([
      "detail-144",
      "detail-144",
      "detail-145",
      "detail-145",
    ]);
  });
  it("has fifty standalone cards with bound option reasons, real steps and nonperiodic balanced keys", () => {
    const ids = new Set(),
      steps: string[] = [],
      answers: number[] = [];
    for (const [group, l] of forge026ChemistryLessons.entries()) {
      expect(l.questions).toHaveLength(25);
      expect(l.tags).toContain("Özgün öğretim soruları");
      for (const [i, q] of l.questions.entries()) {
        expect(ids.has(q.id)).toBe(false);
        ids.add(q.id);
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((x) => x.tr)).size).toBe(5);
        expect(compact(q.options[q.answer].tr), q.id).toBe(
          compact(correct[group][i]),
        );
        expect(questionContentIssues(q), q.id).toEqual([]);
        expect(questionGuidanceSchema.safeParse(q.guidance).success, q.id).toBe(
          true,
        );
        expect(q.guidance!.steps).toHaveLength(3);
        expect(q.guidance!.optionReasons).toHaveLength(5);
        steps.push(...q.guidance!.steps);
        answers.push(q.answer);
      }
      const a = l.questions.map((q) => q.answer);
      expect(
        [0, 1, 2, 3, 4].map((x) => a.filter((y) => x === y).length),
      ).toEqual([5, 5, 5, 5, 5]);
      for (let p = 1; p <= 20; p++)
        expect(a.slice(p).every((v, i) => v === a[i])).toBe(false);
    }
    expect(new Set(steps).size).toBe(150);
    expect(
      [0, 1, 2, 3, 4].map((x) => answers.filter((y) => x === y).length),
    ).toEqual([10, 10, 10, 10, 10]);
    const prompts = forge026ChemistryLessons.flatMap((l) =>
      l.questions.map((q) => q.prompt.tr),
    );
    for (const g of forge026ChemistryGuides) {
      expect(g.recall).toHaveLength(6);
      for (const ex of g.examples) {
        expect(prompts).not.toContain(ex.prompt);
        expect(ex.steps).toHaveLength(3);
      }
    }
  });
  it("counts light hydrogen and helium without imposing neutron neutrality or zero electron mass", () => {
    expect(atom026(1, 0, 1)).toMatchObject({
      p: 1,
      n: 0,
      e: 1,
      a: 1,
      q: 0,
      total: 2,
      charged: 2,
    });
    expect(atom026(2, 1, 2)).toMatchObject({
      p: 2,
      n: 1,
      e: 2,
      a: 3,
      q: 0,
      total: 5,
    });
    expect(atom026(14, 16, 16)).toMatchObject({
      a: 30,
      q: -2,
      total: 46,
      charged: 30,
    });
    expect(atom026(30, 50, 36)).toMatchObject({
      a: 80,
      q: -6,
      total: 116,
      charged: 66,
    });
  });
  it("conserves charge of the particle and electron reservoir in both transfer directions", () => {
    const loss = ion026(16, 20, 18, -3);
    expect(loss.before.q).toBe(-2);
    expect(loss.after).toMatchObject({ e: 15, q: 1, a: 36 });
    expect(loss.externalCharge).toBe(-3);
    expect(loss.systemCharge).toBe(-2);
    const gain = ion026(20, 22, 18, 2);
    expect(gain.after).toMatchObject({ e: 20, q: 0, p: 20, n: 22, a: 42 });
    expect(gain.systemCharge).toBe(2);
    for (let e = 0; e <= 36; e += 3)
      for (let d = -6; d <= 6; d++)
        if (e + d >= 0 && e + d <= 36) {
          const r = ion026(12, 13, e, d);
          expect(r.conserved).toBe(true);
          expect(r.after.q - r.before.q).toBe(-d || 0);
          expect(r.before.a).toBe(r.after.a);
        }
  });
  it("counts whole-ion charge once and retains isotope-specific neutrons", () => {
    expect(aggregate026(compounds026[0].parts, -1)).toMatchObject({
      p: 9,
      n: 8,
      e: 10,
      q: -1,
      nucleons: 17,
      total: 27,
    });
    expect(aggregate026(compounds026[1].parts, -2)).toMatchObject({
      p: 30,
      n: 30,
      e: 32,
      q: -2,
      nucleons: 60,
      total: 92,
    });
    expect(aggregate026(compounds026[2].parts, 1)).toMatchObject({
      p: 11,
      n: 7,
      e: 10,
      q: 1,
      total: 28,
    });
    expect(aggregate026(compounds026[3].parts, 0)).toMatchObject({
      p: 10,
      n: 10,
      e: 10,
      nucleons: 20,
      total: 30,
    });
  });
  it("distinguishes same nuclide from the three different-nucleus relations", () => {
    const outcomes = [
      "isotope",
      "isotone",
      "isobar",
      "same",
      "isotone",
      "isotope",
      "none",
      "same",
    ];
    pairs026.forEach((p, i) =>
      expect(relations026(p.left, p.right, p.sameConfiguration).nuclear).toBe(
        outcomes[i],
      ),
    );
    const x = relations026(
      { z: 12, n: 12, e: 12 },
      { z: 12, n: 12, e: 10 },
      false,
    );
    expect(x.sameNuclide).toBe(true);
    expect(x.isotope).toBe(false);
    expect(x.isotone).toBe(false);
    expect(x.isobar).toBe(false);
  });
  it("does not infer configuration from electron equality or nucleus identity", () => {
    const p = pairs026[7];
    const r = relations026(p.left, p.right, false);
    expect(r.sameElectrons).toBe(true);
    expect(r.isoelectronic).toBe(false);
    expect(r.sameNuclide).toBe(true);
    expect(relations026(p.left, p.right).isoelectronic).toBe(null);
    const q = pairs026[2];
    expect(relations026(q.left, q.right, true)).toMatchObject({
      isobar: true,
      sameElectrons: true,
      isoelectronic: true,
    });
    expect(relations026(q.left, { ...q.right, e: 19 }, null)).toMatchObject({
      isobar: true,
      sameElectrons: false,
      isoelectronic: false,
    });
  });
  it("derives isotope means and inverse abundances with atom weights", () => {
    expect(mixture026(6, 7, 75).mean).toBe(6.25);
    expect(abundance026(35, 37, 35.8).lightPct).toBeCloseTo(60, 10);
    const r = mixture026(23.985, 25.983, 40);
    expect(r.mean).toBeCloseTo(25.1838, 10);
    expect(abundance026(r.light, r.heavy, r.mean).lightPct).toBeCloseTo(40, 10);
    for (const s of isotopeSamples026)
      for (let pct = 0; pct <= 100; pct++) {
        const r = mixture026(s.light, s.heavy, pct);
        expect(r.mean).toBeGreaterThanOrEqual(s.light);
        expect(r.mean).toBeLessThanOrEqual(s.heavy);
        expect(r.lightPct + r.heavyPct).toBe(100);
        expect(abundance026(s.light, s.heavy, r.mean).lightPct).toBeCloseTo(
          pct,
          9,
        );
      }
  });
  it("rejects impossible counts, unsafe inputs, inherited records and false configuration claims", () => {
    const calls = [
      () => atom026(0, 1, 1),
      () => atom026(1, -1, 1),
      () => atom026(1, 1, 37),
      () => atom026(1.5, 1, 1),
      () => atom026(Infinity, 1, 1),
      () => ion026(1, 0, 0, -1),
      () => ion026(1, 0, 36, 1),
      () => aggregate026([], 0),
      () => aggregate026([{ z: 8, a: 7, count: 1 }], 0),
      () => aggregate026([{ z: 1, a: 1, count: 1 }], 2),
      () => aggregate026([Object.create({ z: 1, a: 1, count: 1 })], 0),
      () =>
        relations026(Object.create({ z: 1, n: 0, e: 1 }), { z: 1, n: 1, e: 1 }),
      () => relations026({ z: 1, n: 0, e: 1 }, { z: 2, n: 2, e: 2 }, true),
      () => mixture026(2, 1, 50),
      () => mixture026(1, 2, 101),
      () => abundance026(1, 2, 3),
    ];
    for (const call of calls) expect(call).toThrow(RangeError);
  });
  it("normalizes dependent electron bounds and clears stale feedback for every repaired science field", () => {
    const d = { ...defaultsChemistry026 };
    expect(normalizeChemistry026(d)).toEqual(d);
    const r = normalizeChemistry026({
      ...d,
      mode: "transfer",
      e: 0,
      received: -6,
      guess: "2",
      reason: "p",
      checked: true,
      show: true,
    });
    expect(r).toMatchObject({
      e: 0,
      received: 0,
      guess: "2",
      reason: "",
      checked: false,
      show: false,
    });
    for (const received of [undefined, "2", NaN, true]) {
      const repaired = normalizeChemistry026({
        ...d,
        mode: "transfer",
        e: 36,
        received,
      });
      expect(repaired.received).toBe(0);
      expect(() =>
        ion026(repaired.z, repaired.n, repaired.e, repaired.received),
      ).not.toThrow();
    }
    for (const bad of [null, undefined, [], 0, "bad"])
      expect(normalizeChemistry026(bad)).toMatchObject({
        checked: false,
        show: false,
        guess: "",
      });
    expect(
      normalizeChemistry026({
        ...d,
        mode: "constructor",
        guess: "1",
        reason: "p",
        checked: true,
      }),
    ).toMatchObject({ mode: "count", guess: "1", checked: false });
    expect(
      normalizeChemistry026({
        ...d,
        guess: " ",
        reason: "p",
        checked: true,
        show: true,
      }),
    ).toMatchObject({ checked: false, show: true });
  });
  it("renders real particle counts, whole-ion bars and all relation pairs without React warnings", () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    let cases = 0;
    for (const id of legacyIds) {
      for (const [mode, variants] of Object.entries({
        count: [
          { z: 1, n: 0, e: 0 },
          { z: 2, n: 1, e: 2 },
          { z: 30, n: 50, e: 36 },
        ],
        transfer: [
          { e: 0, received: 0 },
          { e: 12, received: -6 },
          { e: 36, received: 0 },
        ],
        aggregate: compounds026.flatMap((_, compound) =>
          [1, 4].map((copies) => ({ compound, copies })),
        ),
        pair: pairs026.flatMap((_, pair) =>
          [-2, 0, 2].map((secondReceived) => ({ pair, secondReceived })),
        ),
        mixture: isotopeSamples026.flatMap((_, sample) =>
          [0, 40, 75, 100].map((lightPct) => ({ sample, lightPct })),
        ),
      }))
        for (const variant of variants) {
          fixture.values[key(id)] = {
            ...defaultsChemistry026,
            ...variant,
            mode,
          };
          const s = html(id);
          expect(s).toContain(`data-mode="${mode}"`);
          expect(s).not.toContain("NaN");
          expect(s).not.toContain("Infinity");
          expect(s).not.toContain('role="status"');
          cases++;
        }
    }
    expect(cases).toBe(100);
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
    fixture.values = {};
    fixture.writes.mockClear();
  });
  it("ties zero and full isotope counts to SVG endpoints and e counts to actual circles", () => {
    const id = legacyIds[0],
      k = key(id);
    fixture.values[k] = { ...defaultsChemistry026, z: 2, n: 1, e: 2 };
    let s = html(id);
    expect((s.match(/data-particle="proton"/g) || []).length).toBe(2);
    expect((s.match(/data-particle="neutron"/g) || []).length).toBe(1);
    expect((s.match(/data-particle="electron"/g) || []).length).toBe(2);
    for (const lightPct of [0, 100]) {
      fixture.values[k] = {
        ...defaultsChemistry026,
        mode: "mixture",
        lightPct,
      };
      s = html(id);
      expect((s.match(/data-isotope="light"/g) || []).length).toBe(lightPct);
      expect((s.match(/data-isotope="heavy"/g) || []).length).toBe(
        100 - lightPct,
      );
      expect(s).toContain(`cx="${lightPct === 0 ? 240 : 20}" cy="300"`);
    }
    fixture.values[k] = {
      ...defaultsChemistry026,
      mode: "aggregate",
      compound: 1,
      copies: 4,
    };
    s = html(id);
    expect(s).toContain('data-e="128"');
    expect(s).toContain('width="153.6" height="20"');
    fixture.values = {};
  });
  it("actually clicks each model with a one-character reason and clears after a scientific change", () => {
    const id = legacyIds[0],
      k = key(id);
    const scenarios: [string, string, string, unknown][] = [
      ["count", "37", "Proton sayısı Z", 13],
      ["transfer", "-2", "Alınan elektron sayısı (eksi: verilen)", 1],
      ["aggregate", "10", "Özdeş tanecik adedi", 2],
      ["pair", "isotope", "V taneciğinin aldığı ek elektron", 1],
      ["mixture", "24.485", "Hafif izotopun atom bolluğu (%)", 40],
    ];
    for (const [mode, answer, field, value] of scenarios) {
      fixture.values[k] = { ...defaultsChemistry026, mode };
      const render = () => nodes(Lab({ lessonId: id }));
      const p =
        mode === "pair"
          ? render().find((n) => n.props.label === "Çekirdek ilişkisi")!
          : render().find((n) => n.props["data-prediction"])!;
      p.props.onChange!(
        mode === "pair" ? answer : { target: { value: answer } },
      );
      render().find((n) => n.props["data-reason"])!.props.onChange!({
        target: { value: "A" },
      });
      const button = render().find(
        (n) => n.type === "button" && n.props.children === "Kıyasla",
      )!;
      expect(button.props.disabled).toBe(false);
      button.props.onClick!();
      expect(html(id)).toContain("Modelle uyumlu.");
      render().find((n) => n.props.label === field)!.props.onChange!(value);
      expect(fixture.values[k]).toMatchObject({
        guess: "",
        reason: "",
        checked: false,
        show: false,
      });
    }
    fixture.values = {};
    fixture.writes.mockClear();
  });
  it("rejects blank reasons and repairs wrong-type or out-of-range saved controls on the first actual response", () => {
    const id = legacyIds[0],
      k = key(id);
    const groups: [string, string[]][] = [
      ["count", ["mode", "z", "n", "e"]],
      ["transfer", ["z", "n", "e", "received"]],
      ["aggregate", ["compound", "copies"]],
      ["pair", ["pair", "secondReceived"]],
      ["mixture", ["sample", "lightPct"]],
    ];
    for (const [mode, fields] of groups)
      for (const field of fields) {
        for (const badType of [true, false]) {
          const defaults = defaultsChemistry026 as Record<
            string,
            string | number | boolean
          >;
          fixture.values[k] = {
            ...defaultsChemistry026,
            mode,
            guess: mode === "pair" ? "isotope" : "37",
            reason: "Eski",
            checked: true,
            show: true,
            [field]: badType
              ? typeof defaults[field] === "number"
                ? "bad"
                : 42
              : typeof defaults[field] === "number"
                ? 999
                : "constructor",
          };
          expect(html(id)).not.toContain('role="status"');
          const render = () => nodes(Lab({ lessonId: id }));
          const prediction = render().find(
            (n) =>
              n.props["data-prediction"] ||
              n.props.label === "Çekirdek ilişkisi",
          )!;
          expect(prediction.props.value).toBe(
            mode === "pair" ? "isotope" : "37",
          );
          render().find((n) => n.props["data-reason"])!.props.onChange!({
            target: { value: "p" },
          });
          expect(typeof fixture.values[k][field]).toBe(typeof defaults[field]);
          const button = render().find(
            (n) => n.type === "button" && n.props.children === "Kıyasla",
          )!;
          expect(button.props.disabled).toBe(false);
          button.props.onClick!();
          expect(html(id)).toContain('role="status"');
        }
      }
    for (const reason of ["", " ", "\n\t"]) {
      fixture.values[k] = {
        ...defaultsChemistry026,
        guess: "37",
        reason,
        checked: true,
      };
      expect(html(id)).not.toContain('role="status"');
      expect(
        nodes(Lab({ lessonId: id })).find(
          (n) => n.type === "button" && n.props.children === "Kıyasla",
        )!.props.disabled,
      ).toBe(true);
    }
    fixture.values = {};
    fixture.writes.mockClear();
  });
  it("shares only local exploratory state between the legacy and advanced lesson view", () => {
    fixture.values[key(legacyIds[0])] = {
      ...defaultsChemistry026,
      z: 14,
      n: 16,
      e: 16,
    };
    expect(html(legacyIds[0] + "-ileri")).toContain('data-total="46"');
    expect(html("unavailable")).toBe("");
    expect(fixture.writes).not.toHaveBeenCalled();
    fixture.values = {};
  });
});

describe("026 chemistry independent-peer restore and proof regressions", () => {
  it("keeps valid active responses when only an inactive scientific field needs repair and canonicalizes it on the first action", () => {
    const id = legacyIds[0],
      k = key(id);
    for (const [mode, guess, field] of [
      ["count", "37", "pair"],
      ["transfer", "-2", "pair"],
      ["aggregate", "10", "pair"],
      ["pair", "isotope", "z"],
      ["mixture", "24.485", "z"],
    ]) {
      fixture.values[k] = {
        ...defaultsChemistry026,
        mode,
        guess,
        reason: "C",
        checked: true,
        show: true,
        [field]: 99,
      };
      expect(html(id), mode).toContain("Modelle uyumlu.");
      expect(html(id)).toContain('class="c026-proof"');
      nodes(Lab({ lessonId: id })).find((n) => n.props["data-reason"])!.props
        .onChange!({ target: { value: "O" } });
      expect(fixture.values[k][field]).toBe(field === "pair" ? 7 : 30);
      expect(fixture.values[k]).toMatchObject({
        guess,
        reason: "O",
        checked: false,
      });
      const button = nodes(Lab({ lessonId: id })).find(
        (n) => n.type === "button" && n.props.children === "Kıyasla",
      )!;
      expect(button.props.disabled).toBe(false);
      button.props.onClick!();
      expect(html(id)).toContain("Modelle uyumlu.");
    }
    fixture.values = {};
    fixture.writes.mockClear();
  });
  it("compares the exact decimal half-way isotope mean with the same rounding shown in the diagram", () => {
    const id = legacyIds[1],
      k = key(id);
    fixture.values[k] = {
      ...defaultsChemistry026,
      mode: "mixture",
      sample: 0,
      lightPct: 25,
      guess: "25,484",
      reason: "m",
      checked: false,
    };
    const compare = () =>
      nodes(Lab({ lessonId: id })).find(
        (n) => n.type === "button" && n.props.children === "Kıyasla",
      )!;
    expect(compare().props.disabled).toBe(false);
    compare().props.onClick!();
    expect(html(id)).toContain("Modelle uyumlu.");
    expect(html(id)).toContain("25,484");
    nodes(Lab({ lessonId: id })).find(
      (n) => n.type === "button" && n.props.children === "Kanıtı göster",
    )!.props.onClick!();
    expect(html(id)).toContain("Üç ondalığa yuvarlanmış sonuç 25,484 u");
    nodes(Lab({ lessonId: id })).find((n) => n.props["data-prediction"])!.props
      .onChange!({ target: { value: "25,483" } });
    compare().props.onClick!();
    expect(html(id)).not.toContain("Modelle uyumlu.");
    fixture.values = {};
    fixture.writes.mockClear();
  });
  it("opens and closes manual proof before a response while blank restored feedback remains closed", () => {
    const id = legacyIds[0],
      k = key(id);
    fixture.values = {};
    const render = () => nodes(Lab({ lessonId: id }));
    expect(html(id)).not.toContain('class="c026-proof"');
    render().find(
      (n) => n.type === "button" && n.props.children === "Kanıtı göster",
    )!.props.onClick!();
    expect(html(id)).toContain('class="c026-proof"');
    expect(html(id)).not.toContain('role="status"');
    expect(
      render().find(
        (n) => n.type === "button" && n.props.children === "Kıyasla",
      )!.props.disabled,
    ).toBe(true);
    render().find(
      (n) => n.type === "button" && n.props.children === "Kanıtı kapat",
    )!.props.onClick!();
    expect(html(id)).not.toContain('class="c026-proof"');
    fixture.values[k] = {
      ...defaultsChemistry026,
      guess: "37",
      reason: " ",
      checked: true,
      show: true,
    };
    expect(html(id)).not.toContain('role="status"');
    expect(html(id)).toContain('class="c026-proof"');
    expect(render().find((n) => n.props["data-reason"])!.props).toMatchObject({
      maxLength: 120,
    });
    expect(
      normalizeChemistry026({
        ...defaultsChemistry026,
        reason: "A".repeat(128),
      }).reason,
    ).toHaveLength(120);
    fixture.values = {};
    fixture.writes.mockClear();
  });
});

// A strategy chooses a method; it is not an already displayed fact or step.
it("keeps every authored strategy distinct from knowledge, hints and progressive steps", () => {
  const canonical = (text: string) =>
    text
      .normalize("NFKC")
      .toLocaleLowerCase("tr-TR")
      .replace(/[\p{P}\p{S}\s]/gu, "");
  const questions = forge026ChemistryLessons.flatMap(
    (lesson) => lesson.questions,
  );
  expect(questions).toHaveLength(50);
  expect(
    new Set(questions.map((q) => canonical(q.guidance!.strategy))).size,
  ).toBe(50);
  for (const q of questions) {
    const g = q.guidance!;
    const stepText = g.steps.map(canonical);
    expect(
      stepText,
      q.id + " strategy is a separate method choice",
    ).not.toContain(canonical(g.strategy));
    expect(canonical(g.strategy), q.id + " hint duplication").not.toBe(
      canonical(q.hint.tr),
    );
    for (const knowledge of g.knowledge) {
      expect(stepText, q.id + " knowledge/step duplication").not.toContain(
        canonical(knowledge),
      );
      expect(
        canonical(g.strategy),
        q.id + " knowledge/strategy duplication",
      ).not.toBe(canonical(knowledge));
    }
  }
});
