import { describe, it, expect } from "vitest";
import { questionContentIssues } from "../src/domain/questionContent";
import {
  forge016PhysicsLessons as lessons,
  forge016PhysicsGuides as guides,
  forge016PhysicsTopics as topics,
  inclineModel016,
  fixedPulleyModel016,
  constantMotion016,
  twoStageModel016,
} from "../src/learning/forge016Physics";
const correct = [
  [
    "40 N",
    "Sola 6 N",
    "−4 m/s²",
    "−8 m/s²",
    "2,8 m/s²",
    "14,4 N",
    "10/3 m/s²",
    "1/2",
    "Yukarı 12 N sürtünmeyle durabilir",
    "Sağa 6 N",
  ],
  [
    "16 m",
    "−8 m/s ve 8 m/s",
    "4 s",
    "30 m",
    "3 m/s ve 5 m/s",
    "−8 m/s",
    "60 m",
    "−12 m ve 12 m",
    "0 m ve 18 m",
    "0 < t < 3 s",
  ],
  [
    "2 m/s",
    "0 m ve 8 m",
    "Hız değişimi +6 m/s",
    "16,5 m",
    "7 m",
    "Hızları ve ivmeleri aynıdır",
    "+2 m/s²",
    "Konum ve hız süreklidir; hız grafiğinin eğimi değişir",
    "Mutlak x(5) konumu",
    "A’nın sürati azalır, B’ninki artar",
  ],
];
const incline = {
  mass: 5,
  gravity: 10,
  angle: 0,
  force: 0,
  muStatic: 0.5,
  muKinetic: 0.25,
  motion: "rest" as const,
};
const motion = { x0: 10, v0: 12, acceleration: -3, duration: 6, time: 6 };
const stages = {
  x0: 10,
  v0: -1,
  a1: 2,
  a2: -1,
  switchTime: 2,
  duration: 5,
  time: 5,
  from: 0,
  to: 5,
};
describe("AYT Newton and signed acceleration", () => {
  it("keeps separate AYT topic IDs,28 deep sections,12 examples and30 complete cards", () => {
    expect(topics).toEqual({
      "ayt-newton-hareket-yasalari": "detail-361",
      "bir-boyutta-sabit-ivmeli-hareket": "detail-362",
      "sabit-ivmeli-hareket-grafikleri": "detail-363",
    });
    expect(guides.reduce((n, g) => n + g.sections.length, 0)).toBe(28);
    for (const g of guides) {
      expect(g.examples).toHaveLength(4);
      expect(g.recall).toHaveLength(4);
      for (const s of g.sections) {
        expect(s.paragraphs).toHaveLength(2);
        expect(s.paragraphs.every((p) => p.length > 160)).toBe(true);
      }
      expect(g.examples.every((e) => e.steps.length === 3)).toBe(true);
    }
    const ids = new Set();
    for (const [j, l] of lessons.entries()) {
      expect(l.subjectId).toBe("ayt-fizik");
      expect(l.questions).toHaveLength(10);
      for (const [i, q] of l.questions.entries()) {
        expect(ids.has(q.id)).toBe(false);
        ids.add(q.id);
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(q.options[q.answer].tr, q.id).toBe(correct[j][i]);
        expect(questionContentIssues(q), q.id).toEqual([]);
      }
    }
  });
  it("uses the required static force,including exact equality,then changes friction with sliding direction", () => {
    const rest = inclineModel016({ ...incline, force: 6 });
    expect(rest).toMatchObject({
      normal: 50,
      staticLimit: 25,
      friction: -6,
      net: 0,
      acceleration: 0,
      regime: "static",
    });
    expect(inclineModel016({ ...incline, force: 25 }).regime).toBe("static");
    expect(inclineModel016({ ...incline, force: 25 + 1e-8 }).regime).toBe(
      "kinetic",
    );
    const angle = (Math.atan2(3, 4) * 180) / Math.PI;
    const down = inclineModel016({ ...incline, angle, motion: "down" }),
      up = inclineModel016({ ...incline, angle, motion: "up" });
    expect(down.normal).toBeCloseTo(40);
    expect(down.gravityAlong).toBeCloseTo(-30);
    expect(down.friction).toBeCloseTo(10);
    expect(down.acceleration).toBeCloseTo(-4);
    expect(up.friction).toBeCloseTo(-10);
    expect(up.acceleration).toBeCloseTo(-8);
    expect(inclineModel016({ ...incline, angle }).regime).toBe("kinetic");
    expect(
      inclineModel016({ ...incline, angle: 90, motion: "down" }),
    ).toMatchObject({ normal: 0, friction: 0, acceleration: -10 });
    expect(inclineModel016({ ...incline, force: 1e-13 }).friction).toBe(-1e-13);
  });
  it("finds the ideal fixed-pulley threshold and verifies both individual force balances", () => {
    const p = fixedPulleyModel016(3, 2, 10, 0.3, 0.2);
    expect(p.regime).toBe("kinetic");
    expect(p.friction).toBe(6);
    expect(p.acceleration).toBeCloseTo(2.8);
    expect(p.tension).toBeCloseTo(14.4);
    expect(p.tension - p.friction).toBeCloseTo(3 * p.acceleration);
    expect(20 - p.tension).toBeCloseTo(2 * p.acceleration);
    expect(fixedPulleyModel016(4, 2, 10, 0.5, 0.25)).toMatchObject({
      regime: "static",
      acceleration: 0,
      tension: 20,
      friction: 20,
    });
  });
  it("separates position,displacement,path and signed velocity around the real turn", () => {
    const m = constantMotion016(motion);
    expect(m).toMatchObject({
      position: 28,
      velocity: -6,
      speed: 6,
      displacement: 18,
      distance: 30,
      turningTime: 4,
      minimumPosition: 10,
      maximumPosition: 34,
      averageVelocity: 3,
      averageSpeed: 5,
    });
    expect(constantMotion016({ ...motion, time: 4 })).toMatchObject({
      position: 34,
      velocity: 0,
      distance: 24,
    });
    expect(
      constantMotion016({
        x0: -5,
        v0: 4,
        acceleration: 2,
        duration: 3,
        time: 3,
      }),
    ).toMatchObject({
      position: 16,
      velocity: 10,
      displacement: 21,
      distance: 21,
      averageVelocity: 7,
    });
    expect(
      constantMotion016({
        x0: 0,
        v0: 6,
        acceleration: -2,
        duration: 6,
        time: 6,
      }),
    ).toMatchObject({ displacement: 0, distance: 18 });
  });
  it("handles zero acceleration,zero time,endpoint turns and an unreachable future root without division errors", () => {
    expect(
      constantMotion016({
        x0: 5,
        v0: -3,
        acceleration: 0,
        duration: 4,
        time: 4,
      }),
    ).toMatchObject({
      position: -7,
      velocity: -3,
      displacement: -12,
      distance: 12,
      turningTime: null,
    });
    expect(constantMotion016({ ...motion, time: 0 })).toMatchObject({
      position: 10,
      distance: 0,
      averageVelocity: null,
      averageSpeed: null,
    });
    expect(
      constantMotion016({
        x0: 3,
        v0: 0,
        acceleration: 0,
        duration: 0,
        time: 0,
      }),
    ).toMatchObject({
      position: 3,
      velocity: 0,
      distance: 0,
      turningTime: null,
    });
    expect(
      constantMotion016({ ...motion, duration: 4, time: 4 }).turningTime,
    ).toBe(4);
    expect(
      constantMotion016({
        x0: 0,
        v0: -4,
        acceleration: -2,
        duration: 2,
        time: 2,
      }),
    ).toMatchObject({ position: -12, velocity: -8, turningTime: null });
  });
  it("integrates both stages continuously and splits positive and negative velocity areas", () => {
    const m = twoStageModel016(stages);
    expect(m.boundary).toMatchObject({ position: 12, velocity: 3 });
    expect(m.end).toMatchObject({ position: 16.5, velocity: 0 });
    expect(m.interval).toMatchObject({
      positiveArea: 6.75,
      negativeArea: -0.25,
      displacement: 6.5,
      distance: 7,
      deltaVelocity: 1,
      averageVelocity: 1.3,
      averageSpeed: 1.4,
    });
    expect(m.turningTimes).toEqual([0.5]);
    const boundary = twoStageModel016({ ...stages, time: 2 });
    expect(boundary.current).toMatchObject({
      position: 12,
      velocity: 3,
      acceleration: -1,
    });
    const before = twoStageModel016({ ...stages, time: 2 - 1e-6 }).current,
      after = twoStageModel016({ ...stages, time: 2 + 1e-6 }).current;
    expect(after.position - before.position).toBeCloseTo(6e-6, 8);
    expect(before.velocity).toBeCloseTo(3 - 2e-6);
    expect(after.velocity).toBeCloseTo(3 - 1e-6);
  });
  it("preserves actual interval endpoints,zero areas and no fictitious final stage", () => {
    expect(
      twoStageModel016({ ...stages, from: 2, to: 5 }).interval,
    ).toMatchObject({ displacement: 4.5, distance: 4.5, deltaVelocity: -3 });
    expect(
      twoStageModel016({ ...stages, from: 2, to: 2 }).interval,
    ).toMatchObject({
      displacement: 0,
      distance: 0,
      deltaVelocity: 0,
      averageVelocity: null,
      averageSpeed: null,
    });
    const onlySecond = twoStageModel016({
      ...stages,
      switchTime: 0,
      a1: 100,
      a2: 0,
    });
    expect(onlySecond.end).toMatchObject({ position: 5, velocity: -1 });
    const onlyFirst = twoStageModel016({
      ...stages,
      switchTime: 5,
      a1: 2,
      a2: 100,
    });
    expect(onlyFirst.current.acceleration).toBe(2);
    expect(onlyFirst.end.position).toBe(30);
    expect(onlyFirst.end.velocity).toBe(9);
  });
  it("keeps the three graph quantities consistent under initial position and initial velocity changes", () => {
    const base = twoStageModel016(stages),
      shift = twoStageModel016({ ...stages, x0: 30 });
    expect(shift.current.position - base.current.position).toBe(20);
    expect(shift.current.velocity).toBe(base.current.velocity);
    expect(shift.interval).toEqual(base.interval);
    for (const v0 of [-8, 1]) {
      const m = twoStageModel016({
        ...stages,
        v0,
        a1: 2,
        a2: 2,
        duration: 3,
        switchTime: 1,
        time: 3,
        to: 3,
      });
      expect(m.interval.deltaVelocity).toBe(6);
      expect(m.end.velocity).toBe(v0 + 6);
      expect(m.interval.displacement).toBe(v0 * 3 + 9);
    }
    const signed = twoStageModel016({
      x0: 0,
      v0: 6,
      a1: -2,
      a2: -2,
      switchTime: 3,
      duration: 5,
      time: 5,
      from: 1,
      to: 5,
    });
    expect(signed.interval).toMatchObject({
      positiveArea: 4,
      negativeArea: -4,
      displacement: 0,
      distance: 8,
    });
  });
  it("rejects invalid numerical domains and derived overflow", () => {
    for (const call of [
      () => inclineModel016({ ...incline, mass: 0 }),
      () => inclineModel016({ ...incline, angle: 91 }),
      () => inclineModel016({ ...incline, muKinetic: 0.6 }),
      () => inclineModel016({ ...incline, motion: "bad" as "up" }),
      () => fixedPulleyModel016(0, 1, 10, 0.5, 0.2),
      () => constantMotion016({ ...motion, time: -1 }),
      () => constantMotion016({ ...motion, time: 7 }),
      () => constantMotion016({ ...motion, x0: NaN }),
      () => constantMotion016({ ...motion, acceleration: 1e308 }),
      () => twoStageModel016({ ...stages, from: 4, to: 3 }),
      () => twoStageModel016({ ...stages, switchTime: 6 }),
      () => twoStageModel016({ ...stages, duration: 0, time: 0, to: 0 }),
      () => twoStageModel016({ ...stages, a1: Infinity }),
    ])
      expect(call).toThrow(RangeError);
  });
});
