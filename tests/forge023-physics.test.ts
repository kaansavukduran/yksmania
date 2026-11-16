import { describe, it, expect, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Forge023PhysicsLab from "../src/learning/Forge023PhysicsLab";
const restored023 = vi.hoisted(() => ({
  saved: {} as Record<string, unknown>,
}));
vi.mock("../src/store", () => ({
  useApp: () => {
    const explorations = new Proxy(
      {} as Record<string, Record<string, unknown>>,
      { get: () => restored023.saved },
    );
    return {
      state: { explorations },
      update: async (
        fn: (state: { explorations: typeof explorations }) => {
          explorations: typeof explorations;
        },
      ) => {
        const next = fn({ explorations });
        restored023.saved = Object.values(next.explorations)[0] ?? {};
      },
    };
  },
}));
import {
  optics023,
  soundDoppler023,
  lightDoppler023,
  electromagnetic023,
  bohr023,
  atomTransition023,
  excitation023,
  forge023PhysicsLessons,
  forge023PhysicsGuides,
  forge023PhysicsTopics,
} from "../src/learning/forge023Physics";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";

describe("023 physics: positive teaching, actual question contexts and full guidance", () => {
  it("contains four distinct source headings and57 five-option teaching cards", () => {
    expect(Object.values(forge023PhysicsTopics)).toEqual([
      "detail-393",
      "detail-394",
      "detail-395",
      "detail-396",
    ]);
    expect(forge023PhysicsLessons.map((l) => l.questions.length)).toEqual([
      15, 12, 12, 18,
    ]);
    expect(
      forge023PhysicsGuides.reduce((n, g) => n + g.sections.length, 0),
    ).toBe(71);
    for (const g of forge023PhysicsGuides) {
      expect(g.examples).toHaveLength(6);
      expect(g.recall).toHaveLength(6);
      expect(
        g.sections.every(
          (s) =>
            s.paragraphs.length === 2 &&
            s.paragraphs.every((p) => p.length > 100),
        ),
      ).toBe(true);
      for (const e of g.examples) {
        expect(e.steps).toHaveLength(3);
        expect(e.check.length).toBeGreaterThan(20);
        expect(e.pitfall.length).toBeGreaterThan(20);
      }
    }
    const ids = new Set<string>();
    for (const l of forge023PhysicsLessons)
      for (const q of l.questions) {
        expect(ids.has(q.id)).toBe(false);
        ids.add(q.id);
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(5);
        expect(q.prompt.tr.length).toBeGreaterThan(50);
        const h = questionGuidanceSchema.parse(q.guidance);
        expect(h.steps).toHaveLength(3);
        expect(h.optionReasons).toHaveLength(5);
        expect(h.optionReasons[q.answer]).toContain("Doğru");
        expect(h.commonError.length).toBeGreaterThan(20);
        expect(h.check.length).toBeGreaterThan(20);
      }
    expect(ids.size).toBe(57);
  });
});
describe("Optics: nm/mm conversion, phase identity and genuinely different apertures", () => {
  it("calculates both equivalent wavelength conventions and the tracked zeroth-fringe shift", () => {
    const m = optics023("double", 600, 1.5, 2, 0.4, 600, 2);
    expect(m.lambdaMediumNm).toBe(400);
    expect(m.spacingMm).toBe(2);
    expect(m.centerMm).toBe(2);
    expect(m.probe.intensity).toBe(1);
    expect(optics023("double", 400, 1, 2, 0.4, 0, 0).spacingMm).toBe(
      m.spacingMm,
    );
    expect(optics023("double", 600, 1.5, 2, 0.4, 300, 0).probe.intensity).toBe(
      0,
    );
  });
  it("keeps minima symmetric, a real sinc side lobe, and the central factor two", () => {
    const m = optics023("single", 500, 1, 1.2, 0.2, 0, 3);
    expect(m.spacingMm).toBeCloseTo(3, 12);
    expect(m.centralWidthMm).toBeCloseTo(6, 12);
    expect(m.probe.intensity).toBeCloseTo(0, 24);
    const center = optics023("single", 500, 1, 1.2, 0.2, 0, 0),
      side = optics023("single", 500, 1, 1.2, 0.2, 0, 4.5);
    expect(center.probe.intensity).toBe(1);
    expect(side.probe.intensity).toBeCloseTo(4 / (9 * Math.PI ** 2), 12);
    expect(side.probe.intensity).toBeCloseTo(
      optics023("single", 500, 1, 1.2, 0.2, 0, -4.5).probe.intensity,
      14,
    );
    expect(side.profile).toHaveLength(1201);
    expect(
      side.profile.every((p) => p.intensity >= 0 && p.intensity <= 1),
    ).toBe(true);
  });
  it("rejects impossible/unsupported parameter combinations rather than silently accepting phase on the whole single aperture", () => {
    for (const call of [
      () => optics023("single", 600, 1, 1, 0.3, 1, 0),
      () => optics023("double", 600, 0, 1, 0.3, 0, 0),
      () => optics023("double", NaN, 1, 1, 0.3, 0, 0),
      () => optics023("double", 600, 1, 0, 0.3, 0, 0),
    ])
      expect(call).toThrow(RangeError);
  });
});
describe("Doppler: medium frame and radial vacuum model remain separate", () => {
  it("distinguishes equal closing speeds, equal common velocities and both moving", () => {
    const movingSource = soundDoppler023(500, 340, 34, 0),
      movingReceiver = soundDoppler023(500, 340, 0, -34),
      common = soundDoppler023(500, 340, 34, 34);
    expect(movingSource.receivedFrequency).toBeCloseTo(5000 / 9, 12);
    expect(movingReceiver.receivedFrequency).toBe(550);
    expect(common.receivedFrequency).toBe(500);
    expect(common.forwardWavelength).toBe(0.612);
    expect(common.relativeCrestSpeed).toBe(306);
    expect(soundDoppler023(450, 340, 34, -34).receivedFrequency).toBe(550);
    expect(soundDoppler023(600, 340, -68, 0).receivedFrequency).toBe(500);
  });
  it("generates fronts from actual past source locations without changing the medium speed", () => {
    const m = soundDoppler023(400, 340, 68, 0);
    expect(m.forwardWavelength).toBe(0.68);
    expect(m.backwardWavelength).toBe(1.02);
    for (const f of m.fronts) {
      expect(f.centerX).toBeCloseTo(0.2 * f.emittedCycle, 14);
      expect(f.radius).toBe(7 - f.emittedCycle);
    }
    for (const vs of [-0.8, 0, 0.8])
      for (const vg of [-0.8, 0, 0.8]) {
        const t = soundDoppler023(200, 340, 340 * vs, 340 * vg);
        expect(t.receiverPosition).toBeGreaterThan(t.sourcePosition);
        expect(t.receivedFrequency).toBeGreaterThan(0);
        expect(t.soundSpeed).toBe(340);
      }
  });
  it("rejects nonnumeric raw velocities before division can coerce them", () => {
    for (const value of ["34", null, false, [], {}, NaN, Infinity]) {
      const invalid = value as unknown as number;
      expect(() => soundDoppler023(500, 340, invalid, 0)).toThrow(RangeError);
      expect(() => soundDoppler023(500, 340, 0, invalid)).toThrow(RangeError);
    }
    expect(soundDoppler023(500, 340, 34, 0).backwardWavelength).toBe(0.748);
    expect(soundDoppler023(500, 340, 0, 0).receivedFrequency).toBe(500);
  });
  it("gives reciprocal radial red/blue factors with the same invariant c", () => {
    const red = lightDoppler023(500, 0.6),
      blue = lightDoppler023(600, -0.6);
    expect(red.observedWavelengthNm).toBe(1000);
    expect(blue.observedWavelengthNm).toBe(300);
    expect(red.frequencyRatio).toBe(0.5);
    expect(blue.frequencyRatio).toBe(2);
    expect(red.wavelengthRatio * red.frequencyRatio).toBe(1);
    expect(red.vacuumSpeed).toBe(blue.vacuumSpeed);
    expect(lightDoppler023(500, 0).shift).toBe("none");
    expect(() => lightDoppler023(500, 1)).toThrow(RangeError);
    expect(() => soundDoppler023(500, 340, 340, 0)).toThrow(RangeError);
  });
});
describe("Vacuum wave: orthogonality, phase and directional flux", () => {
  it("uses exact SI c and h and correct E/B units", () => {
    const m = electromagnetic023(600, 120, 0, 0, 1);
    expect(m.frequency).toBeCloseTo(299792458 / 600e-9, 0);
    expect(m.magneticAmplitude).toBeCloseTo(120 / 299792458, 18);
    expect(m.photonEnergyEV).toBeCloseTo(2.06640330722, 10);
    expect(m.electricVector).toEqual({ x: 0, y: 120, z: 0 });
    expect(m.magneticVector.y).toBe(0);
    expect(m.magneticVector.z).toBe(m.magneticAmplitude);
  });
  it("preserves tiny positive and near-full-turn polarization components", () => {
    for (const angle of [1e-14, 360 - 1e-12]) {
      const m = electromagnetic023(500, 1, 0, angle, 1);
      const expectedZ = Math.sin((angle * Math.PI) / 180);
      expect(m.electricVector.z).not.toBe(0);
      expect(m.electricVector.z / expectedZ).toBeCloseTo(1, 14);
      expect(m.magneticVector.y / (-expectedZ / 299792458)).toBeCloseTo(1, 14);
    }
    expect(electromagnetic023(500, 1, 0, 360, 1).electricVector).toEqual({
      x: 0,
      y: 1,
      z: 0,
    });
  });
  it("keeps E dot B zero and E cross B directional while both fields reverse", () => {
    for (const angle of [0, 30, 45, 90, 120, 180])
      for (const phase of [0, 45, 90, 180, 270, 360])
        for (const direction of [1, -1] as const) {
          const m = electromagnetic023(100, 100, phase, angle, direction),
            e = m.electricVector,
            b = m.magneticVector;
          expect(e.y * b.y + e.z * b.z).toBeCloseTo(0, 15);
          expect(
            (e.y * b.z - e.z * b.y) /
              (m.electricAmplitude * m.magneticAmplitude),
          ).toBeCloseTo(m.normalizedEnergyFlowX, 12);
          if (phase === 90 || phase === 270) {
            expect(e.y).toBe(0);
            expect(e.z).toBe(0);
            expect(b.y).toBe(0);
            expect(b.z).toBe(0);
          }
        }
  });
});
describe("Bohr: one electron, selected-state energy and independent collision channels", () => {
  it("uses different Z scaling for radius and energy with positive kinetic energy", () => {
    const he = bohr023(2, 2);
    expect(he.energyEV).toBe(-13.6);
    expect(he.radiusNm).toBe(0.1058);
    expect(he.kineticEV + he.potentialEV).toBe(he.energyEV);
    expect(bohr023(3, 3).energyEV).toBe(-13.6);
    expect(bohr023(3, 3).radiusNm).toBe(0.1587);
    expect(bohr023(1, 4).radiusNm / bohr023(1, 2).radiusNm).toBe(4);
  });
  it("makes signed transition energy and positive photons distinct", () => {
    const down = atomTransition023(1, 4, 2),
      up = atomTransition023(1, 2, 4),
      none = atomTransition023(1, 3, 3);
    expect(down.differenceEV).toBeCloseTo(-2.55, 12);
    expect(down.kind).toBe("emission");
    expect(down.photonEnergyEV).toBeCloseTo(2.55, 12);
    expect(down.wavelengthNm).toBeCloseTo(486.212542875, 8);
    expect(up.differenceEV).toBe(-down.differenceEV);
    expect(up.kind).toBe("absorption");
    expect(none.wavelengthNm).toBeNull();
    expect(none.kind).toBe("none");
    expect(atomTransition023(1, 4, 1).possibleLinesThroughLevel).toBe(6);
    expect(atomTransition023(1, 4, 1).maximumCascadePhotons).toBe(3);
  });
  it("separates nonresonant11eV photons from inelastic electrons and ionization", () => {
    const photon = excitation023(1, 1, "photon", 11),
      electron = excitation023(1, 1, "electron", 11);
    expect(photon.channels).toHaveLength(0);
    expect(photon.ionizationPossible).toBe(false);
    expect(electron.channels.map((c) => c.n)).toEqual([2]);
    expect(electron.channels[0].remainingEV).toBeCloseTo(0.8, 12);
    expect(
      excitation023(1, 1, "photon", 10.2).channels.map((c) => c.n),
    ).toEqual([2]);
    expect(excitation023(1, 1, "photon", 10.2001).channels).toHaveLength(0);
    expect(excitation023(1, 1, "photon", 15).ionizationExcessEV).toBeCloseTo(
      1.4,
      12,
    );
    expect(excitation023(1, 2, "photon", 3.4).ionizationPossible).toBe(true);
  });
  it("accepts an exact excited-state electron threshold without accepting less energy", () => {
    const exact = excitation023(1, 5, "electron", 0.16622222222222222);
    const below = excitation023(1, 5, "electron", 0.1662222222222222);
    const channel = exact.channels.find((x) => x.n === 6);
    expect(channel?.gapEV).toBe(0.16622222222222222);
    expect(channel?.remainingEV).toBe(0);
    expect(below.channels.some((x) => x.n === 6)).toBe(false);
  });
  it("rejects noninteger quantum labels and nonfinite/negative incident energy", () => {
    for (const call of [
      () => bohr023(1, 0),
      () => bohr023(1, 1.5),
      () => bohr023(4, 1),
      () => excitation023(1, 1, "photon", NaN),
      () => excitation023(1, 1, "electron", -1),
    ])
      expect(call).toThrow(RangeError);
  });
});

// The production useExploration primitive-type filter is intentionally not mocked.
const restoredVariants023 = [
  {
    id: "isik-teorileri",
    state: { mode: "double" },
    active: {
      mode: "single",
      lambda: 500,
      index: 150,
      distance: 25,
      aperture: 400,
      delay: 600,
      probe: 20,
    },
    hidden: {},
  },
  {
    id: "isik-teorileri",
    state: { mode: "single" },
    active: {
      mode: "double",
      lambda: 500,
      index: 150,
      distance: 25,
      aperture: 400,
      probe: 20,
    },
    hidden: { delay: "bad" },
  },
  {
    id: "doppler-etkisi",
    state: { kind: "sound" },
    active: { kind: "light", frequency: 450, source: 34, receiver: -34 },
    hidden: { beta: "bad", wavelength: "bad" },
  },
  {
    id: "doppler-etkisi",
    state: { kind: "light" },
    active: { kind: "sound", beta: 60, wavelength: 500 },
    hidden: { frequency: "bad", source: "bad", receiver: "bad" },
  },
  {
    id: "elektromanyetik-dalgalar",
    state: {},
    active: {
      band: "uv",
      amplitude: 180,
      phase: 90,
      angle: 45,
      direction: "-1",
    },
    hidden: {},
  },
  {
    id: "atom-modelleri-fizik",
    state: { tab: "levels" },
    active: { tab: "excite", z: 2, initial: 4, final: 1 },
    hidden: { particle: "bad", incident: "bad", model: "bad" },
  },
  {
    id: "atom-modelleri-fizik",
    state: { tab: "excite" },
    active: { tab: "levels", z: 3, particle: "electron", incident: 102 },
    hidden: { initial: "bad", final: "bad", model: "bad" },
  },
  {
    id: "atom-modelleri-fizik",
    state: { tab: "history" },
    active: { tab: "levels", model: "modern" },
    hidden: {
      z: "bad",
      initial: "bad",
      final: "bad",
      particle: "bad",
      incident: "bad",
    },
  },
] as const;
const restoredHtml023 = (id: string) =>
  renderToStaticMarkup(createElement(Forge023PhysicsLab, { lessonId: id }));
const previousChecked023 = {
  guess: "Artar",
  reason: "Önceki kayıt: ölçüm ve koşul birlikte.",
  checked: true,
};
describe("023 restored exploration: actual hook type filtering plus independent raw record", () => {
  it("blocks all active wrong primitive types while retaining the original saved reason and no automatic writes", () => {
    for (const v of restoredVariants023) {
      for (const [field, example] of Object.entries({
        ...v.active,
        ...previousChecked023,
      })) {
        const invalid =
          typeof example === "number"
            ? String(example)
            : typeof example === "boolean"
              ? "true"
              : false;
        restored023.saved = {
          ...v.state,
          ...previousChecked023,
          [field]: invalid,
        };
        const before = JSON.stringify(restored023.saved),
          html = restoredHtml023(v.id);
        expect(html, `${v.id}/${field}`).not.toContain('role="status"');
        expect(html).toMatch(/<button[^>]*disabled[^>]*>Kanıtla kıyasla/);
        expect(JSON.stringify(restored023.saved)).toBe(before);
        if (field !== "reason")
          expect(html).toContain(previousChecked023.reason);
      }
    }
    restored023.saved = {};
  });
  it("rejects active enum/range corruption but allows every irrelevant hidden record to coexist", () => {
    for (const v of restoredVariants023) {
      for (const [field, example] of Object.entries(v.active)) {
        for (const invalid of typeof example === "number"
          ? [1e9, -1e9, NaN, Infinity, 0.125]
          : ["constructor", ""]) {
          restored023.saved = {
            ...v.state,
            ...previousChecked023,
            [field]: invalid,
          };
          expect(
            restoredHtml023(v.id),
            `${v.id}/${field}/${invalid}`,
          ).not.toContain('role="status"');
        }
      }
      restored023.saved = {
        ...v.state,
        ...v.hidden,
        ...previousChecked023,
        unrelated: false,
      };
      const html = restoredHtml023(v.id);
      expect(html, v.id).toContain('role="status"');
      expect(html).not.toMatch(/<button[^>]*disabled[^>]*>Kanıtla kıyasla/);
    }
    restored023.saved = {};
  });
  it("uses the first explicit comparison callback to persist a full canonical record and clears old checked state", () => {
    type Node = {
      type?: unknown;
      props?: {
        children?: unknown;
        values?: unknown;
        onChange?: (patch: Record<string, unknown>) => void;
      };
    };
    const nodes = (x: unknown): Node[] =>
      Array.isArray(x)
        ? x.flatMap(nodes)
        : x && typeof x === "object" && "props" in x
          ? [x as Node, ...nodes((x as Node).props?.children)]
          : [];
    const comparison = (id: string) => {
      const outer = Forge023PhysicsLab({ lessonId: id }) as unknown as Node;
      return nodes(
        (outer.type as (props: unknown) => unknown)(outer.props),
      ).find((n) => n.props?.values && n.props.onChange)!;
    };
    for (const v of restoredVariants023) {
      for (const [field, example] of Object.entries(v.active)) {
        restored023.saved = {
          ...v.state,
          ...v.hidden,
          ...previousChecked023,
          [field]: typeof example === "number" ? "2" : "constructor",
        };
        expect(restoredHtml023(v.id)).not.toContain('role="status"');
        comparison(v.id).props!.onChange!({ reason: "4³=64", checked: false });
        expect(typeof restored023.saved[field]).toBe(typeof example);
        expect(restored023.saved[field]).not.toBe("constructor");
        expect(restored023.saved.checked).toBe(false);
        expect(restored023.saved.reason).toBe("4³=64");
        expect(restoredHtml023(v.id)).not.toMatch(
          /<button[^>]*disabled[^>]*>Kanıtla kıyasla/,
        );
        comparison(v.id).props!.onChange!({ checked: true });
        expect(restoredHtml023(v.id)).toContain('role="status"');
        for (const key of Object.keys(v.hidden)) {
          expect(typeof restored023.saved[key]).not.toBe("undefined");
          expect(restored023.saved[key]).not.toBe("bad");
        }
        comparison(v.id).props!.onChange!({
          reason: "x".repeat(130),
          checked: false,
        });
        expect(restored023.saved.reason).toBe("x".repeat(120));
      }
    }
    restored023.saved = {};
  });
  it("keeps missing records, 120character reasons and empty reason checks consistent", () => {
    for (const id of new Set(restoredVariants023.map((v) => v.id))) {
      restored023.saved = {};
      expect(restoredHtml023(id)).not.toContain('role="status"');
      for (const reason of ["", "   "]) {
        restored023.saved = { ...previousChecked023, reason };
        expect(restoredHtml023(id)).not.toContain('role="status"');
        expect(restoredHtml023(id)).toMatch(
          /<button[^>]*disabled[^>]*>Kanıtla kıyasla/,
        );
      }
      restored023.saved = { ...previousChecked023, reason: "γ↑" };
      expect(restoredHtml023(id)).toContain('role="status"');
      restored023.saved = { ...previousChecked023, reason: "x".repeat(130) };
      expect(restoredHtml023(id)).toContain("x".repeat(120));
      expect(restoredHtml023(id)).not.toContain("x".repeat(121));
    }
    restored023.saved = {};
  });
});
