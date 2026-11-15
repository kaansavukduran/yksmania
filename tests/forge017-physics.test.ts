import { describe, it, expect } from "vitest";
import { questionContentIssues } from "../src/domain/questionContent";
import {
  forge017PhysicsLessons as lessons,
  forge017PhysicsGuides as guides,
  forge017PhysicsTopics as topics,
  fallModel017,
  verticalModel017,
  horizontalModel017,
  obliqueModel017,
  energyModel017,
} from "../src/learning/forge017Physics";
const answers = [
  [
    "4",
    "20",
    "35",
    "√2",
    "20",
    "7,5",
    "√2",
    "√2",
    "Tam vt’ye sonlu zamanda ulaşılmaz",
    "40",
  ],
  [
    "3",
    "45",
    "Hız sıfır, ivme aşağı g",
    "1 s ve 5 s",
    "−25",
    "2",
    "0 m ve 40 m",
    "42,5",
    "Başlangıç ve varış aynı seviyede, g sabit ve hava yoksa",
    "1 s",
  ],
  [
    "3",
    "60",
    "10√13",
    "Uçuş süreleri eşit, ikinci menzil iki kat",
    "(20, −20)",
    "15",
    "2",
    "(0, −g)",
    "Hayır; önce x = 20 m’de yere değmiştir",
    "1825",
  ],
  [
    "20",
    "60",
    "11,25",
    "Menziller eşit, uçuş süreleri farklı",
    "Başlangıç hedef zeminden 20 m yukarıdaysa",
    "2 + √8 s",
    "5√57",
    "45",
    "Yatay hız bileşeni",
    "Toplam mekanik enerji sabittir",
  ],
  [
    "16",
    "30",
    "20",
    "100",
    "2",
    "4",
    "Ulaşamaz; ilk duruş x = 4 m’dedir",
    "2",
    "2√5",
    "50",
  ],
];
const falling = {
  mass: 2,
  gravity: 10,
  height: 80,
  density: 1,
  dragCoefficient: 1,
  area: 0.4,
  time: 0,
};
const energy = {
  mass: 2,
  initialSpeed: 10,
  gravity: 10,
  mu: 0.2,
  stiffness: 100,
  contact: 4,
  progress: 1,
};
describe("Atışlar ve enerji: gerçek olay ve fizik sınırı", () => {
  it("keeps5 independent detail headings,55 deep sections,20 full examples and50 standalone5-option questions", () => {
    expect(topics).toEqual({
      "serbest-dusme-limit-hiz": "detail-364",
      "dusey-atis": "detail-365",
      "yatay-atis": "detail-366",
      "egik-atis": "detail-367",
      "ayt-enerji-hareket": "detail-368",
    });
    expect(guides.reduce((s, g) => s + g.sections.length, 0)).toBe(55);
    for (const g of guides) {
      expect(g.sections.length).toBeGreaterThanOrEqual(10);
      expect(g.examples).toHaveLength(4);
      expect(g.recall).toHaveLength(4);
      for (const s of g.sections) {
        expect(s.paragraphs).toHaveLength(2);
        expect(s.paragraphs.every((t) => t.length > 160)).toBe(true);
      }
      expect(g.examples.every((e) => e.steps.length === 3)).toBe(true);
    }
    const ids = new Set();
    for (const [j, l] of lessons.entries()) {
      expect(l.questions).toHaveLength(10);
      expect(l.subjectId).toBe("ayt-fizik");
      for (const [i, q] of l.questions.entries()) {
        expect(ids.has(q.id)).toBe(false);
        ids.add(q.id);
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(q.options[q.answer].tr, q.id).toBe(answers[j][i]);
        expect(questionContentIssues(q), q.id).toEqual([]);
      }
    }
  });
  it("recovers exact vacuum drop and first ground with no invented finite terminal speed", () => {
    const p = { ...falling, area: 0 },
      start = fallModel017(p);
    expect(start).toMatchObject({
      duration: 4,
      speed: 0,
      distance: 0,
      acceleration: 10,
      terminalSpeed: null,
      nearLimitTime: null,
    });
    expect(fallModel017({ ...p, time: 3 })).toMatchObject({
      distance: 45,
      speed: 30,
      height: 35,
      heat: 0,
    });
    expect(fallModel017({ ...p, time: 4 })).toMatchObject({
      distance: 80,
      speed: 40,
      height: 0,
      kinetic: 1600,
      heat: 0,
    });
    expect(fallModel017({ ...falling, density: 0 }).terminalSpeed).toBeNull();
  });
  it("uses actual quadratic drag solution,relative-fluid coefficient and an asymptotic99percent threshold", () => {
    const t = Math.log(3),
      m = fallModel017({ ...falling, time: t });
    expect(m.coefficient).toBeCloseTo(0.2);
    expect(m.terminalSpeed).toBeCloseTo(10);
    expect(m.speed).toBeCloseTo(8);
    expect(m.acceleration).toBeCloseTo(3.6);
    expect(m.distance).toBeCloseTo(10 * Math.log(5 / 3));
    expect(m.drag).toBeCloseTo(12.8);
    expect(m.weight - m.drag).toBeCloseTo(2 * m.acceleration);
    expect(m.kinetic + m.heat).toBeCloseTo(m.lostPotential);
    expect(m.nearLimitTime).toBeCloseTo(Math.log(199) / 2);
    const end = fallModel017(falling);
    expect(end.duration).toBeCloseTo(8.69314715);
    expect(fallModel017({ ...falling, time: end.duration }).height).toBe(0);
    expect(fallModel017({ ...falling, time: end.duration }).speed).toBeLessThan(
      10,
    );
    const short = fallModel017({ ...falling, height: 1 });
    expect(short.nearLimitBeforeGround).toBe(false);
    expect(fallModel017({ ...falling, mass: 4 }).terminalSpeed).toBeCloseTo(
      10 * Math.SQRT2,
    );
  });
  it("has a stable small-drag limit and height-zero event,without extending below ground", () => {
    const m = fallModel017({ ...falling, area: 1e-18, time: 2 });
    expect(m.distance).toBeCloseTo(20, 9);
    expect(m.speed).toBeCloseTo(20, 9);
    expect(m.heat).toBeGreaterThanOrEqual(0);
    expect(fallModel017({ ...falling, height: 0 })).toMatchObject({
      duration: 0,
      height: 0,
      speed: 0,
    });
    const end = fallModel017(falling);
    expect(() =>
      fallModel017({ ...falling, time: end.duration + 1e-6 }),
    ).toThrow();
  });
  it("separates two height visits,apex acceleration and unequal-height flight path", () => {
    const p = { height: 0, initialVelocity: 30, gravity: 10 };
    expect(verticalModel017({ ...p, time: 1 })).toMatchObject({
      height: 25,
      velocity: 20,
    });
    expect(verticalModel017({ ...p, time: 5 })).toMatchObject({
      height: 25,
      velocity: -20,
    });
    expect(verticalModel017({ ...p, time: 3 })).toMatchObject({
      height: 45,
      velocity: 0,
      acceleration: -10,
      duration: 6,
    });
    const b = verticalModel017({
      height: 20,
      initialVelocity: 15,
      gravity: 10,
      time: 4,
    });
    expect(b).toMatchObject({
      height: 0,
      velocity: -25,
      duration: 4,
      apexTime: 1.5,
      maxHeight: 31.25,
      path: 42.5,
      displacement: -20,
      averageVelocity: -5,
      averageSpeed: 10.625,
    });
    expect(
      verticalModel017({
        height: 40,
        initialVelocity: -10,
        gravity: 10,
        time: 2,
      }),
    ).toMatchObject({ duration: 2, velocity: -30, path: 40, apexTime: null });
    expect(verticalModel017({ ...p, time: 0 }).averageSpeed).toBeNull();
  });
  it("handles first contact at launch and downward initial conditions consistently", () => {
    expect(
      verticalModel017({
        height: 0,
        initialVelocity: -5,
        gravity: 10,
        time: 0,
      }),
    ).toMatchObject({ duration: 0, height: 0, apexTime: null });
    expect(() =>
      verticalModel017({
        height: 0,
        initialVelocity: -5,
        gravity: 10,
        time: 0.01,
      }),
    ).toThrow();
    const m = verticalModel017({
      height: 20,
      initialVelocity: 20,
      gravity: 10,
      time: 0,
    });
    expect(m.duration).toBeCloseTo(2 + Math.sqrt(8));
    expect(m.duration - 2).not.toBeCloseTo(2);
  });
  it("keeps horizontal motion independent of the vertical event and preserves signed components", () => {
    const p = { height: 45, gravity: 10, time: 3 },
      a = horizontalModel017({ ...p, horizontalVelocity: 20 }),
      b = horizontalModel017({ ...p, horizontalVelocity: 40 });
    expect(a).toMatchObject({
      duration: 3,
      x: 60,
      y: 0,
      vx: 20,
      vy: -30,
      range: 60,
      ay: -10,
      ax: 0,
    });
    expect(a.speed).toBeCloseTo(10 * Math.sqrt(13));
    expect(b.duration).toBe(a.duration);
    expect(b.range).toBe(2 * a.range);
    const left = horizontalModel017({ ...p, horizontalVelocity: -20 });
    expect(left.x).toBe(-60);
    expect(left.minX).toBe(-60);
    expect(left.speed).toBe(a.speed);
    expect(horizontalModel017({ ...p, horizontalVelocity: 0 })).toMatchObject({
      x: 0,
      vx: 0,
      speed: 30,
    });
  });
  it("uses general projectile ground root and reserves45degree/complement rules for equal levels", () => {
    const angle = (Math.atan2(3, 4) * 180) / Math.PI,
      p = { height: 0, speed: 25, angle, gravity: 10, time: 0 },
      end = obliqueModel017(p);
    expect(end.duration).toBeCloseTo(3);
    expect(end.range).toBeCloseTo(60);
    expect(end.maxHeight).toBeCloseTo(11.25);
    const apex = obliqueModel017({ ...p, time: 1.5 });
    expect(apex.vy).toBeCloseTo(0);
    expect(apex.speed).toBeCloseTo(20);
    expect(obliqueModel017({ ...p, angle: 30 }).range).toBeCloseTo(
      obliqueModel017({ ...p, angle: 60 }).range,
    );
    expect(obliqueModel017({ ...p, height: 20 }).sameLevelFormulaApplies).toBe(
      false,
    );
    const down = { height: 40, speed: 25, angle: -angle, gravity: 10, time: 0 },
      d = obliqueModel017(down);
    expect(d.duration).toBeCloseTo((Math.sqrt(1025) - 15) / 10);
    expect(d.impactSpeed).toBeCloseTo(Math.sqrt(1425));
    expect(d.apexTime).toBeNull();
    expect(obliqueModel017({ ...p, angle: 90 }).vx).toBe(0);
    expect(obliqueModel017({ ...p, angle: 90 }).sameLevelFormulaApplies).toBe(
      true,
    );
    expect(obliqueModel017({ ...p, angle: -90 })).toMatchObject({
      duration: 0,
      range: 0,
      vx: 0,
    });
  });
  it("makes actual trajectory derivatives match returned velocity and fixes full-flight geometry", () => {
    const p = { height: 20, speed: 30, angle: 35, gravity: 10 },
      t = 1,
      h = 1e-4,
      a = obliqueModel017({ ...p, time: t - h }),
      b = obliqueModel017({ ...p, time: t + h }),
      m = obliqueModel017({ ...p, time: t });
    expect((b.x - a.x) / (2 * h)).toBeCloseTo(m.vx, 7);
    expect((b.y - a.y) / (2 * h)).toBeCloseTo(m.vy, 7);
    expect(a.range).toBe(m.range);
    expect(b.maxHeight).toBe(m.maxHeight);
    expect(m.speed * m.speed).toBeCloseTo(30 ** 2 + 2 * 10 * (20 - m.y));
  });
  it("finds the first spring compression and preserves work/energy balance over the entire forward branch", () => {
    const end = energyModel017(energy),
      z = (Math.sqrt(16816) - 4) / 100;
    expect(end.maximumCompression).toBeCloseTo(z);
    expect(end.stop).toBeCloseTo(4 + z);
    expect(end.kinetic).toBe(0);
    expect(end.speed).toBe(0);
    expect(end.heat + end.spring).toBeCloseTo(100);
    expect(end.power).toBeCloseTo(0);
    for (const progress of [0, 0.1, 0.5, 0.9, 1]) {
      const m = energyModel017({ ...energy, progress });
      expect(m.kinetic + m.spring + m.heat).toBeCloseTo(100);
      expect(m.netWork).toBeCloseTo(m.kinetic - 100);
      expect(m.netForce).toBeCloseTo(-4 - 100 * m.compression);
      expect(m.kinetic).toBeGreaterThanOrEqual(0);
      expect(m.x).toBeLessThanOrEqual(end.stop);
    }
    const frictionless = energyModel017({ ...energy, mu: 0 });
    expect(frictionless.maximumCompression).toBeCloseTo(Math.SQRT2);
    expect(frictionless.heat).toBe(0);
    expect(frictionless.mechanical).toBeCloseTo(100);
  });
  it("distinguishes failure to reach spring,equality at natural contact and initial rest", () => {
    const p = { ...energy, initialSpeed: 4 };
    expect(energyModel017({ ...p, contact: 10 })).toMatchObject({
      stop: 4,
      maximumCompression: 0,
      reachesSpring: false,
      reachesContact: false,
    });
    expect(energyModel017({ ...p, contact: 4 })).toMatchObject({
      stop: 4,
      maximumCompression: 0,
      reachesSpring: false,
      reachesContact: true,
    });
    expect(
      energyModel017({ ...energy, initialSpeed: 0, progress: 0.5 }),
    ).toMatchObject({
      stop: 0,
      x: 0,
      kinetic: 0,
      spring: 0,
      heat: 0,
      netForce: 0,
    });
  });
  it("rejects nonfinite,negative,invalid time/angle/progress and overflow rather than drawing false states", () => {
    for (const f of [
      () => fallModel017({ ...falling, mass: 0 }),
      () => fallModel017({ ...falling, density: -1 }),
      () => fallModel017({ ...falling, area: NaN }),
      () => fallModel017({ ...falling, time: -1 }),
      () =>
        verticalModel017({
          height: -1,
          initialVelocity: 0,
          gravity: 10,
          time: 0,
        }),
      () =>
        verticalModel017({
          height: 1,
          initialVelocity: 0,
          gravity: 0,
          time: 0,
        }),
      () =>
        horizontalModel017({
          height: 1,
          horizontalVelocity: Infinity,
          gravity: 10,
          time: 0,
        }),
      () =>
        obliqueModel017({
          height: 1,
          speed: -1,
          angle: 30,
          gravity: 10,
          time: 0,
        }),
      () =>
        obliqueModel017({
          height: 1,
          speed: 2,
          angle: 91,
          gravity: 10,
          time: 0,
        }),
      () => energyModel017({ ...energy, stiffness: 0 }),
      () => energyModel017({ ...energy, mu: -1 }),
      () => energyModel017({ ...energy, progress: 1.01 }),
      () => energyModel017({ ...energy, initialSpeed: 1e308 }),
    ])
      expect(f).toThrow(RangeError);
  });
});
