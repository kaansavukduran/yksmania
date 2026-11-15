import { describe, it, expect } from "vitest";
import { questionContentIssues } from "../src/domain/questionContent";
import {
  forge015PhysicsLessons as lessons,
  forge015PhysicsGuides as guides,
  forge015PhysicsTopics as topics,
  vectorModel,
  relativeModel,
  riverChoices,
  riverModel,
  addVectors,
} from "../src/learning/forge015Physics";
const keys = [
  [
    "5",
    "(2,6)",
    "(3,−7)",
    "(4,−10)",
    "Norm 0; yön tanımsız",
    "6 N",
    "4 ve 10",
    "0",
    "(−6,8) N",
    "3",
  ],
  [
    "Doğuya 8 m/s",
    "Batıya 8 m/s",
    "(−8,6) m/s",
    "10",
    "Doğuya 10 m/s",
    "10 s",
    "Hayır; y farkı 40 m kalır",
    "Bağıl hız 0; aralarındaki konum farkı sabit",
    "(4,4) m/s",
    "2√34 m",
  ],
  [
    "24 s",
    "Aşağı 72 m",
    "√34 m/s",
    "30 s",
    "Mümkün değil; tam yatay iptalde karşı bileşen 0 olur",
    "(3,0) m/s",
    "30 s",
    "3,2 m/s",
    "Aşağı 35 m",
    "−25 m",
  ],
];
const zero = { x: 0, y: 0 };
describe("AYT vectors, relative motion and rivers", () => {
  it("retains three exact topic IDs,24 substantive sections,12 worked examples and30 complete cards", () => {
    expect(topics).toEqual({
      vektorler: "detail-358",
      "bagil-hareket": "detail-359",
      "nehir-problemleri": "detail-360",
    });
    expect(guides.reduce((n, g) => n + g.sections.length, 0)).toBe(24);
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
    for (const [l, lesson] of lessons.entries()) {
      expect(lesson.subjectId).toBe("ayt-fizik");
      expect(lesson.questions).toHaveLength(10);
      for (const [i, q] of lesson.questions.entries()) {
        expect(ids.has(q.id)).toBe(false);
        ids.add(q.id);
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(q.options[q.answer].tr, q.id).toBe(keys[l][i]);
        expect(questionContentIssues(q), q.id).toEqual([]);
      }
    }
  });
  it("preserves signed sum,difference,negative scalar and exact balancing components", () => {
    expect(
      vectorModel({ x: 3, y: 4 }, { x: -1, y: 2 }, 1, "sum").result,
    ).toEqual({ x: 2, y: 6 });
    expect(
      vectorModel({ x: 2, y: -3 }, { x: -1, y: 4 }, 1, "difference").result,
    ).toEqual({ x: 3, y: -7 });
    const r = vectorModel({ x: -2, y: 5 }, zero, -2, "scale");
    expect(r.result).toEqual({ x: 4, y: -10 });
    expect(r.magnitude).toBeCloseTo(2 * Math.sqrt(29));
    expect(addVectors(r.result, r.balance)).toEqual(zero);
    const tiny = vectorModel({ x: 1e-13, y: 0 }, zero, 1, "sum");
    expect(tiny.result.x).toBe(1e-13);
    expect(tiny.balance.x).toBe(-1e-13);
  });
  it("does not invent a direction for zero and gets all four quadrants", () => {
    expect(
      vectorModel({ x: 3, y: 4 }, { x: -3, y: -4 }, 1, "sum").angle,
    ).toBeNull();
    expect(vectorModel({ x: 3, y: 4 }, zero, 0, "scale").magnitude).toBe(0);
    for (const [a, b, angle] of [
      [1, 1, 45],
      [-1, 1, 135],
      [-1, -1, 225],
      [1, -1, 315],
    ])
      expect(vectorModel({ x: a, y: b }, zero, 1, "sum").angle).toBeCloseTo(
        angle,
      );
  });
  it("finds two-dimensional collisions only when both coordinates share a future time", () => {
    expect(
      relativeModel({ x: 30, y: 40 }, zero, { x: -3, y: -4 }, zero, 4),
    ).toMatchObject({
      position: { x: 18, y: 24 },
      velocity: { x: -3, y: -4 },
      distance: 30,
      speed: 5,
      radial: -5,
      meetingKind: "future",
      meetingTime: 10,
    });
    expect(
      relativeModel({ x: 30, y: 40 }, zero, { x: -3, y: 0 }, zero, 10)
        .meetingKind,
    ).toBe("never");
    expect(
      relativeModel({ x: 5e-10, y: 0 }, zero, { x: 1, y: 0 }, zero, 0),
    ).toMatchObject({ meetingKind: "past", meetingTime: -5e-10 });
    expect(relativeModel({ x: 5, y: 0 }, zero, zero, zero, 0).meetingKind).toBe(
      "never",
    );
    expect(relativeModel(zero, zero, zero, zero, 0).meetingKind).toBe(
      "coincident",
    );
  });
  it("conserves relative motion under a common velocity and separates radial from total speed", () => {
    for (let t = 0; t <= 12; t++) {
      const a = relativeModel(
          { x: 30, y: 40 },
          zero,
          { x: -3, y: -4 },
          zero,
          t,
        ),
        b = relativeModel(
          { x: 30, y: 40 },
          zero,
          { x: -1, y: -3 },
          { x: 2, y: 1 },
          t,
        );
      expect(b.position).toEqual(a.position);
      expect(b.velocity).toEqual(a.velocity);
      expect(b.distance).toBeCloseTo(a.distance);
    }
    const side = relativeModel({ x: 10, y: 0 }, zero, { x: 0, y: 3 }, zero, 0);
    expect(side.speed).toBe(3);
    expect(side.radial).toBe(0);
    expect(
      relativeModel({ x: 10, y: 0 }, zero, { x: 0, y: 3 }, zero, 2).distance,
    ).toBeCloseTo(2 * Math.sqrt(34));
  });
  it("calculates the shortest-time drifting crossing and stops at the actual bank", () => {
    const r = riverModel(120, 5, 3, 0, 100);
    expect(r.water).toEqual({ x: 0, y: 5 });
    expect(r.bank).toEqual({ x: 3, y: 5 });
    expect(r.crossingTime).toBe(24);
    expect(r.elapsed).toBe(24);
    expect(r.position).toEqual({ x: 72, y: 120 });
    expect(r.drift).toBe(72);
    expect(r.waterPath).toBe(120);
    expect(r.bankPath).toBeCloseTo(24 * Math.sqrt(34));
    expect(r.atBank).toBe(true);
  });
  it("distinguishes direct crossing,critical equality and drifting despite stronger flow", () => {
    const c = riverChoices(120, 5, 3);
    expect(c.quickestTime).toBe(24);
    expect(c.directTime).toBeCloseTo(30);
    expect(c.directAngle).toBeCloseTo(-36.86989764584402);
    const direct = riverModel(120, 5, 3, c.directAngle!, 30);
    expect(direct.drift).toBeCloseTo(0);
    expect(direct.bank.y).toBeCloseTo(4);
    expect(direct.bankPath).toBeCloseTo(120);
    for (const a of [5, 6]) {
      expect(riverChoices(120, 5, a).directPossible).toBe(false);
      expect(riverChoices(120, 5, a).directAngle).toBeNull();
      expect(riverModel(120, 5, a, 0, 24).crossingTime).toBe(24);
    }
    expect(riverModel(120, 5, 5, -90, 10).crossingTime).toBeNull();
    expect(riverModel(120, 5, 3, 120, 1).crossingTime).toBeNull();
  });
  it("maintains actual velocity triangles and coordinate-time paths across flow signs", () => {
    for (const a of [-4, 0, 4])
      for (const theta of [-60, -30, 0, 30, 60]) {
        const r = riverModel(80, 5, a, theta, 2);
        expect(addVectors(r.water, r.flow)).toEqual(r.bank);
        expect(r.position.x).toBeCloseTo(r.bank.x * r.elapsed);
        expect(r.position.y).toBeCloseTo(r.bank.y * r.elapsed);
        expect(r.water.x ** 2 + r.water.y ** 2).toBeCloseTo(25);
        expect(r.drift).toBeCloseTo(r.bank.x * r.crossingTime!);
      }
  });
  it("rejects invalid and overflow inputs rather than returning fabricated physics", () => {
    for (const f of [
      () => vectorModel({ x: NaN, y: 0 }, zero, 1, "sum"),
      () => vectorModel(zero, zero, 1, "bad" as "sum"),
      () => relativeModel(zero, zero, zero, zero, -1),
      () => riverChoices(0, 5, 3),
      () => riverChoices(100, 0, 3),
      () => riverModel(100, 5, 3, 181, 0),
      () => riverModel(100, 5, 3, 0, -1),
      () => riverModel(100, 1.5e308, 1.5e308, 0, 0),
    ])
      expect(f).toThrow(RangeError);
  });
});
