import { describe, it, expect, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Forge024PhysicsLab from "../src/learning/Forge024PhysicsLab";
const restored024 = vi.hoisted(() => ({
  saved: {} as Record<string, unknown>,
}));
vi.mock("../src/store", () => ({
  useApp: () => {
    const explorations = new Proxy(
      {} as Record<string, Record<string, unknown>>,
      { get: () => restored024.saved },
    );
    return {
      state: { explorations },
      update: async (
        fn: (state: { explorations: typeof explorations }) => {
          explorations: typeof explorations;
        },
      ) => {
        const next = fn({ explorations });
        restored024.saved = Object.values(next.explorations)[0] ?? {};
      },
    };
  },
}));
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
import {
  PHYSICS024,
  cosmicScale024,
  quarkLedger024,
  decayLedger024,
  halfLife024,
  relativity024,
  eventTransform024,
  planck024,
  blackbody024,
  photoelectric024,
  compton024,
  electronWave024,
  attenuation024,
  echoDistance024,
  bandgap024,
  forge024PhysicsLessons,
  forge024PhysicsGuides,
  forge024PhysicsTopics,
} from "../src/learning/forge024Physics";

describe("024 physics: seven source headings and independent learning cards", () => {
  it("requires a restored nonblank reason before showing any comparison feedback", () => {
    for (const lesson of forge024PhysicsLessons) {
      for (const reason of ["", "   "]) {
        restored024.saved = { checked: true, guess: "Artar", reason };
        const html = renderToStaticMarkup(
          createElement(Forge024PhysicsLab, { lessonId: lesson.id }),
        );
        expect(html).not.toContain('role="status"');
      }
      restored024.saved = {
        checked: true,
        guess: "Artar",
        reason:
          "Modelin verilen koşulunu ve hesaplanan verisini karşılaştırdım.",
      };
      expect(
        renderToStaticMarkup(
          createElement(Forge024PhysicsLab, { lessonId: lesson.id }),
        ),
      ).toContain('role="status"');
    }
    restored024.saved = {};
  });
  it("keeps wrong-type raw active inputs from reusing checked feedback through the real hook", () => {
    const fields = [
      "emit",
      "initial",
      "beta",
      "temperature",
      "energy",
      "angle",
      "gap",
    ];
    for (const [i, lesson] of forge024PhysicsLessons.entries()) {
      restored024.saved = {
        [fields[i]]: "wrong type",
        guess: "Artar",
        reason: "Veriyi kıyasladım.",
        checked: true,
      };
      const markup = renderToStaticMarkup(
        createElement(Forge024PhysicsLab, { lessonId: lesson.id }),
      );
      expect(markup).not.toContain('role="status"');
      expect(markup).toMatch(/<button[^>]*disabled[^>]*>Kanıtla kıyasla/);
    }
    restored024.saved = {};
  });
  it("repairs all active raw types on the first explicit reason action", () => {
    type ElementNode = {
      type?: unknown;
      props?: {
        children?: unknown;
        values?: unknown;
        onChange?: (patch: Record<string, unknown>) => void;
      };
    };
    const nodes = (x: unknown): ElementNode[] =>
      Array.isArray(x)
        ? x.flatMap(nodes)
        : x && typeof x === "object" && "props" in x
          ? [x as ElementNode, ...nodes((x as ElementNode).props?.children)]
          : [];
    const fields = [
      "emit",
      "initial",
      "beta",
      "temperature",
      "energy",
      "angle",
      "gap",
    ];
    for (const [i, l] of forge024PhysicsLessons.entries()) {
      restored024.saved = {
        [fields[i]]: "wrong type",
        guess: "Artar",
        reason: "Önceki kayıt",
        checked: true,
      };
      const outer = Forge024PhysicsLab({
        lessonId: l.id,
      }) as unknown as ElementNode;
      const tree = () =>
        (outer.type as (props: unknown) => unknown)(outer.props);
      const comparison = () =>
        nodes(tree()).find((x) => x.props?.values && x.props.onChange)!;
      comparison().props!.onChange!({ reason: "4³=64", checked: false });
      expect(typeof restored024.saved[fields[i]]).toBe("number");
      comparison().props!.onChange!({ checked: true });
      expect(
        renderToStaticMarkup(
          createElement(Forge024PhysicsLab, { lessonId: l.id }),
        ),
      ).toContain('role="status"');
    }
    restored024.saved = {};
  });
  it("covers the exact seven headings with deep positive teaching and separate worked examples", () => {
    expect(Object.values(forge024PhysicsTopics)).toEqual([
      "detail-397",
      "detail-398",
      "detail-399",
      "detail-400",
      "detail-401",
      "detail-402",
      "detail-403",
    ]);
    expect(forge024PhysicsLessons.map((l) => l.questions.length)).toEqual([
      18, 18, 16, 16, 18, 18, 25,
    ]);
    expect(
      forge024PhysicsGuides.reduce((n, g) => n + g.sections.length, 0),
    ).toBe(133);
    for (const g of forge024PhysicsGuides) {
      expect(g.examples).toHaveLength(6);
      expect(g.recall).toHaveLength(6);
      expect(
        g.sections.every(
          (s) =>
            s.paragraphs.length === 2 &&
            s.paragraphs.every((p) => p.length > 120),
        ),
      ).toBe(true);
      for (const e of g.examples) {
        expect(e.steps).toHaveLength(3);
        expect(e.check.length).toBeGreaterThan(20);
        expect(e.pitfall.length).toBeGreaterThan(25);
        expect(
          forge024PhysicsLessons
            .flatMap((l) => l.questions)
            .some((q) => q.prompt.tr === e.prompt),
        ).toBe(false);
      }
    }
  });
  it("binds five reasons to five distinct options with balanced nonperiodic answer positions", () => {
    const seen = new Set<string>(),
      steps = new Set<string>();
    for (const l of forge024PhysicsLessons) {
      const counts = [0, 0, 0, 0, 0],
        a = l.questions.map((q) => q.answer);
      for (const q of l.questions) {
        expect(seen.has(q.id)).toBe(false);
        seen.add(q.id);
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        const h = questionGuidanceSchema.parse(q.guidance);
        expect(h.steps).toHaveLength(3);
        expect(h.optionReasons).toHaveLength(5);
        expect(h.optionReasons[q.answer]).toMatch(/^Doğru:/);
        expect(
          h.optionReasons.filter((r) => r.startsWith("Doğru:")),
        ).toHaveLength(1);
        for (const step of h.steps) {
          expect(steps.has(step)).toBe(false);
          steps.add(step);
        }
        counts[q.answer]++;
      }
      expect(Math.max(...counts) - Math.min(...counts)).toBeLessThanOrEqual(1);
      for (let period = 1; period <= 5; period++)
        expect(a.every((v, i) => i < period || v === a[i - period])).toBe(
          false,
        );
    }
    expect(seen.size).toBe(129);
    expect(steps.size).toBe(387);
  });
});
describe("Cosmological scale and valence charge ledgers", () => {
  it("keeps scale ratios observer-independent while signed distances transform", () => {
    for (let o = 0; o < 5; o++) {
      const m = cosmicScale024(0.5, 2, o);
      expect(m.redshift).toBe(3);
      expect(m.wavelengthRatio).toBe(4);
      for (const g of m.galaxies) expect(g.after).toBe(4 * g.before);
      expect(m.galaxies[o].after).toBe(0);
    }
  });
  it("distinguishes charge, baryon number and neutral antiparticles", () => {
    expect(quarkLedger024(["u", "u", "d"])).toMatchObject({
      charge: 1,
      baryonNumber: 1,
      family: "baryon",
    });
    expect(quarkLedger024(["u", "d", "d"])).toMatchObject({
      charge: 0,
      baryonNumber: 1,
    });
    expect(quarkLedger024(["antiU", "antiD", "antiD"])).toMatchObject({
      charge: 0,
      baryonNumber: -1,
      family: "antibaryon",
    });
    expect(quarkLedger024(["u", "antiD"])).toMatchObject({
      charge: 1,
      baryonNumber: 0,
      family: "meson",
    });
    expect(quarkLedger024(["u", "d"])).toMatchObject({
      family: "yalin-hadron-kurali-saglanmiyor",
    });
  });
});
describe("Nuclear number conservation and statistical decay", () => {
  it("conserves A and electric charge with all five distinct processes", () => {
    for (const mode of [
      "alpha",
      "betaMinus",
      "betaPlus",
      "capture",
      "gamma",
    ] as const) {
      const d = decayLedger024(100, 45, mode);
      expect(d.daughterA + (mode === "alpha" ? 4 : 0)).toBe(100);
      expect(d.daughterZ + d.emittedCharge).toBe(45 + d.absorbedCharge);
      expect(d.daughterZ + d.daughterN).toBe(d.daughterA);
    }
    expect(decayLedger024(14, 6, "betaMinus")).toMatchObject({
      daughterA: 14,
      daughterZ: 7,
      daughterN: 7,
    });
    expect(decayLedger024(99, 43, "gamma")).toMatchObject({
      daughterA: 99,
      daughterZ: 43,
    });
  });
  it("preserves initial amount, geometric halving and activity with stable tiny losses", () => {
    const t = halfLife024(8000, 4, 8);
    expect(t.remaining).toBeCloseTo(2000, 10);
    expect(t.decayed + t.remaining).toBeCloseTo(8000, 10);
    expect(halfLife024(8000, 4, 0).remaining).toBe(8000);
    expect(halfLife024(8000, 8, 8).activity / t.activity).toBeCloseTo(1, 12);
    expect(halfLife024(1, 1e12, 1e-9).decayed).toBeGreaterThan(0);
  });
});
describe("Special relativity: event identities and cancellation-free kinetic energy", () => {
  it("conserves the spacetime interval and inverse event transform", () => {
    for (const b of [-0.9, -0.6, 0, 0.6, 0.9])
      for (const ct of [-12, 0, 5])
        for (const x of [-7, 0, 20]) {
          const e = eventTransform024(b, ct, x),
            back = eventTransform024(-b, e.ctPrime, e.xPrime);
          expect(e.ctPrime ** 2 - e.xPrime ** 2).toBeCloseTo(
            ct ** 2 - x ** 2,
            8,
          );
          expect(back.ctPrime).toBeCloseTo(ct, 9);
          expect(back.xPrime).toBeCloseTo(x, 9);
        }
    expect(eventTransform024(0.6, 0, 10).ctPrime).toBeCloseTo(-7.5, 12);
  });
  it("separates proper values and closes energy-momentum at high and low speeds", () => {
    for (const beta of [0, 1e-12, 0.1, 0.6, 0.8, 0.99]) {
      const m = relativity024(beta, 8, 20, 3);
      expect(m.labTime / 8).toBeCloseTo(m.gamma, 12);
      expect(m.labLength * m.gamma).toBeCloseTo(20, 10);
      expect(m.totalMeV ** 2 - m.momentumMeVC ** 2).toBeCloseTo(9, 8);
      expect(m.totalMeV).toBeCloseTo(m.restEnergyMeV + m.kineticMeV, 11);
    }
    const tiny = relativity024(1e-12, 1, 1, 1);
    expect(tiny.kineticMeV).toBeGreaterThan(0);
    expect(tiny.kineticMeV / 0.5e-24).toBeCloseTo(1, 12);
  });
});
describe("Thermal spectra: correct Planck radiance, Wien peak and integral", () => {
  it("reproduces Wien and Stefan ratios while area leaves radiance unchanged", () => {
    const a = blackbody024(3000, 1),
      b = blackbody024(6000, 1),
      c = blackbody024(3000, 3);
    expect(a.peakNm / b.peakNm).toBeCloseTo(2, 12);
    expect(b.exitance / a.exitance).toBe(16);
    expect(c.power / a.power).toBe(3);
    expect(c.spectrum).toEqual(a.spectrum);
    const peak = a.peakNm;
    expect(planck024(3000, peak)).toBeGreaterThan(planck024(3000, peak * 0.99));
    expect(planck024(3000, peak)).toBeGreaterThan(planck024(3000, peak * 1.01));
    expect(planck024(6000, 500)).toBeGreaterThan(planck024(3000, 500));
  });
  it("integrates spectral radiance independently to the hemispheric Stefan total", () => {
    const T = 5000,
      n = 16000,
      lo = Math.log(50e-9),
      hi = Math.log(50000e-9),
      step = (hi - lo) / n;
    let sum = 0;
    for (let i = 0; i <= n; i++) {
      const l =
          (i === 0 ? 50 : i === n ? 50000 : Math.exp(lo + i * step) * 1e9) *
          1e-9,
        v = planck024(T, l * 1e9) * l;
      sum += (i === 0 || i === n ? 1 : i % 2 ? 4 : 2) * v;
    }
    const exitance = (Math.PI * sum * step) / 3;
    expect(exitance / (PHYSICS024.sigma * T ** 4)).toBeCloseTo(1, 4);
  });
});
describe("Photoemission: thresholds, flux, power and signed collector voltage", () => {
  it("distinguishes no electron, zero-energy threshold and stopping boundary", () => {
    expect(photoelectric024(1, 2, 1e14, 1, 0)).toMatchObject({
      allowed: false,
      maxKineticEV: null,
      stoppingV: null,
      arrivalEV: null,
      saturationUpperA: 0,
    });
    expect(photoelectric024(2, 2, 1e14, 0.5, 0)).toMatchObject({
      allowed: true,
      maxKineticEV: 0,
      canArrive: false,
    });
    expect(photoelectric024(5, 2, 1e14, 0.5, -3)).toMatchObject({
      arrivalEV: 0,
      canArrive: false,
    });
    expect(photoelectric024(5, 2, 1e14, 0.5, 2)).toMatchObject({
      maxKineticEV: 3,
      arrivalEV: 5,
      canArrive: true,
    });
  });
  it("changes photon count independently of single energy and never assumes unit yield", () => {
    const a = photoelectric024(4, 2, 1e14, 0.4, 0),
      b = photoelectric024(4, 2, 3e14, 0.4, 0),
      fixedPower = photoelectric024(8, 2, 0.5e14, 0.4, 0);
    expect(b.saturationUpperA / a.saturationUpperA).toBeCloseTo(3, 12);
    expect(a.stoppingV).toBe(b.stoppingV);
    expect(fixedPower.opticalPowerW).toBe(a.opticalPowerW);
    expect(fixedPower.saturationUpperA / a.saturationUpperA).toBe(0.5);
    expect(fixedPower.stoppingV).toBe(6);
  });
});
describe("Compton and electron waves: complete energy and vector momentum closure", () => {
  it("closes the electron mass shell throughout wavelength and angle ranges", () => {
    const rest = (PHYSICS024.me * PHYSICS024.c ** 2) / PHYSICS024.e / 1000;
    for (const l of [0.01, 0.1, 1, 10, 100, 10000])
      for (const angle of [0, 1e-7, 1, 45, 90, 135, 180]) {
        const m = compton024(l, angle);
        expect(m.shiftPm).toBeGreaterThanOrEqual(0);
        expect(m.scatteredKeV + m.kineticKeV).toBeCloseTo(m.initialKeV, 7);
        expect(m.photonX + m.recoilX).toBeCloseTo(m.initialKeV, 7);
        expect(m.photonY + m.recoilY).toBe(0);
        const p2 = m.recoilX ** 2 + m.recoilY ** 2,
          expected = m.kineticKeV * (m.kineticKeV + 2 * rest);
        expect(p2 === 0 ? expected : (p2 - expected) / p2).toBeCloseTo(0, 7);
      }
    expect(compton024(10, 0).kineticKeV).toBe(0);
    expect(compton024(10, 1e-7).kineticKeV).toBeGreaterThan(0);
    expect(compton024(10, 180).shiftPm).toBeCloseTo(
      2 * compton024(10, 90).shiftPm,
      12,
    );
  });
  it("preserves de Broglie identity and reveals relativistic correction", () => {
    for (const v of [1e-9, 25, 100, 10000, 300000, 1e7]) {
      const e = electronWave024(v);
      expect((e.wavelengthPm * 1e-12 * e.momentum) / PHYSICS024.h).toBeCloseTo(
        1,
        12,
      );
      expect(e.wavelengthPm).toBeLessThanOrEqual(e.nonrelPm);
    }
    expect(
      electronWave024(100).wavelengthPm / electronWave024(25).wavelengthPm,
    ).toBeCloseTo(0.5, 3);
    expect(
      electronWave024(300000).wavelengthPm / electronWave024(300000).nonrelPm,
    ).toBeLessThan(0.9);
  });
});
describe("Technology: actual line integrals, echo distance and band threshold", () => {
  it("distinguishes path geometry, transposition and nonunique single projections", () => {
    const cells = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
      a = attenuation024(cells, 1, 1000),
      transpose = [0.1, 0.4, 0.7, 0.2, 0.5, 0.8, 0.3, 0.6, 0.9],
      b = attenuation024(transpose, 1, 1000);
    expect(a.rows).toEqual(b.columns);
    expect(a.columns).toEqual(b.rows);
    expect(a.rows[0]).toBeCloseTo(1000 * Math.exp(-0.6), 10);
    const x = attenuation024([0.1, 0.9, 0, 0, 0, 0, 0, 0, 0], 1, 1),
      y = attenuation024([0.4, 0.6, 0, 0, 0, 0, 0, 0, 0], 1, 1);
    expect(x.rows[0]).toBe(y.rows[0]);
    expect(x.columns).not.toEqual(y.columns);
  });
  it("uses a round trip, and interprets an optical threshold as a necessary energy condition", () => {
    expect(echoDistance024(1500, 40e-6)).toBeCloseTo(0.03, 14);
    expect(echoDistance024(PHYSICS024.c, 0)).toBe(0);
    expect(bandgap024(2, 500)).toMatchObject({ allowed: true });
    expect(bandgap024(2, 1000)).toMatchObject({
      allowed: false,
      excessEV: null,
    });
    for (let n = 10; n <= 600; n++) {
      const gap = n / 100,
        cutoff = bandgap024(gap, 500).cutoffNm;
      expect(bandgap024(gap, cutoff)).toMatchObject({
        allowed: true,
        photonEV: gap,
        excessEV: 0,
      });
      expect(bandgap024(gap, cutoff * (1 + Number.EPSILON)).allowed).toBe(
        false,
      );
      expect(bandgap024(gap, cutoff * (1 - Number.EPSILON)).allowed).toBe(true);
    }
  });
});
describe("All raw model inputs reject nonfinite values, coercions, sparse arrays and inherited enum keys", () => {
  it("rejects invalid domains at the exported boundary", () => {
    for (const bad of [
      NaN,
      Infinity,
      -Infinity,
      "1",
      null,
      true,
    ] as unknown[]) {
      for (const call of [
        () => cosmicScale024(bad as number, 2, 2),
        () => quarkLedger024([bad as never]),
        () => decayLedger024(bad as number, 2, "gamma"),
        () => halfLife024(bad as number, 2, 2),
        () => relativity024(bad as number, 1, 1, 1),
        () => eventTransform024(bad as number, 1, 1),
        () => planck024(bad as number, 500),
        () => blackbody024(3000, bad as number),
        () => photoelectric024(4, 2, bad as number, 1, 0),
        () => compton024(10, bad as number),
        () => electronWave024(bad as number),
        () => attenuation024([bad as number, ...Array(8).fill(0.1)], 1, 1),
        () => echoDistance024(1500, bad as number),
        () => bandgap024(2, bad as number),
      ])
        expect(call).toThrow(RangeError);
    }
    for (const call of [
      () => quarkLedger024(Array(3)),
      () => quarkLedger024(["toString" as never]),
      () => attenuation024(Array(9), 1, 1),
      () => decayLedger024(1, 1, "betaMinus"),
      () => decayLedger024(4, 2, "alpha"),
      () => decayLedger024(10, 5, "toString" as never),
      () => relativity024(1, 1, 1, 1),
      () => halfLife024(1, 0, 1),
      () => cosmicScale024(2, 1, 2),
      () => compton024(1, 181),
      () => photoelectric024(4, 2, 1, 1.1, 0),
    ])
      expect(call).toThrow(RangeError);
  });
});
