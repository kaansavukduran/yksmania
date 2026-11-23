import { expect, it } from "vitest";
import { triangleMean047 } from "../src/learning/triangleMean047";
import { triangleSidesReference042, triangleSidesTeachingCase042 } from "../src/learning/geometryConditions042Official";

it("rejects all sides for the first case, rules out the non-equilateral isosceles case and constructs the right triangle", () => {
  const [a, b] = triangleMean047.sides;
  const [minimum, maximum] = triangleMean047.bounds;
  const [equalToA, mean, equalToB] = triangleMean047.candidates;
  expect([minimum, maximum]).toEqual([4, 8]);
  expect((equalToA + b) / 2).toBe(a);
  expect(mean).toBe((a + b) / 2);
  expect((equalToB + a) / 2).toBe(b);
  expect(triangleMean047.candidates.every((n) => n <= minimum || n >= maximum)).toBe(true);
  expect(triangleMean047.steps[0].points?.filter((p) => p.open)).toHaveLength(2);
  const [left, right, top] = triangleMean047.angles;
  expect(left + right + top).toBe(180);
  expect(left).toBe(top);
  expect(left).not.toBe(right);
  const [legA, legB, longest] = triangleMean047.rightSides;
  expect(legA ** 2 + legB ** 2).toBe(longest ** 2);
  expect(legA + legB).toBeGreaterThan(longest);
  expect(legB).toBe((legA + longest) / 2);
});

it("keeps the derived labels in the corresponding solution and preserves the separately recorded booklet answer", () => {
  const [lengths, angles, rightTriangle] = triangleMean047.figures;
  expect(lengths.labels?.map((label) => label.text)).toEqual(["2", "6", "u"]);
  expect(angles.labels?.map((label) => label.text)).toEqual(["72°", "36°"]);
  expect(rightTriangle.labels?.map((label) => label.text)).toEqual(["6"]);
  expect(triangleMean047.steps[2].labels?.map((label) => label.text)).toEqual(["6", "8", "10"]);
  expect(triangleSidesTeachingCase042.answer).toBe("Yalnız III. 6, 8 ve 10.");
  expect(triangleSidesReference042).toMatchObject({ page: 35, answerPage: 45, answer: "B" });
});
