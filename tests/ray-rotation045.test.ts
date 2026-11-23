import { describe, expect, it } from "vitest";
import { lineAnglesReference042, lineAnglesTeachingCase042 } from "../src/learning/geometryConditions042Official";
import { rotationIllustrations } from "../src/learning/rayRotation045";

describe("açı örneğinde verilen şekil ve çözüm çizimleri", () => {
  it("çizgilerden ölçülen dış açılar eşit, ışınlar arası açı 45° ve dış köşe diktir", () => {
    const [given] = rotationIllustrations.figures;
    const rays = given.segments.slice(0, 4);
    const directions = rays.map(({ from, to }) =>
      Math.atan2(from[1] - to[1], to[0] - from[0]) * 180 / Math.PI,
    );
    expect(directions[0]).toBeCloseTo(0);
    expect(directions[3] - directions[0]).toBeCloseTo(90);
    expect(directions[1] - directions[0]).toBeCloseTo(22.5);
    expect(directions[2] - directions[1]).toBeCloseTo(45);
    expect(directions[3] - directions[2]).toBeCloseTo(22.5);
    expect(given.labels?.map(({ text }) => text)).toEqual(["x", "x"]);
    expect(given.alt).not.toMatch(/22[,.]5|45/);
  });

  it("tam turdaki sekiz yönü, sonuç işlemini ve resmî kaydın özgün örnekten ayrı kaldığını doğrular", () => {
    const [turn, corner, calculation] = rotationIllustrations.steps;
    expect(turn.segments).toHaveLength(8);
    const angles = turn.segments.map(({ from, to }) =>
      (Math.atan2(from[1] - to[1], to[0] - from[0]) * 180 / Math.PI + 360) % 360,
    );
    angles.forEach((angle, index) => expect(angle).toBeCloseTo(index * 45));
    expect(corner.labels?.map(({ text }) => text)).toEqual(["x", "x", "45°"]);
    expect(calculation.alt).toContain("22,5°");
    expect(lineAnglesTeachingCase042.answer).toBe("22,5°.");
    expect(lineAnglesReference042).toMatchObject({ answer: "D", page: 34, answerPage: 43 });
  });
});
