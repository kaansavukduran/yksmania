import { expect, it } from "vitest";
import { r035, r035Text } from "../src/learning/rationalSource035Model";
import {
  checkEq036SystemPoint,
  eliminateEq036System,
  graphEq036System,
  priceEq036System,
  solveEq036System,
  substituteEq036System,
  transferEq036System,
  type Eq036SystemPoint,
} from "../src/learning/linearSystemsSource036Model";

const pair = (point: Eq036SystemPoint | null) =>
  point && [r035Text(point.x), r035Text(point.y)];
const frame = { minX: -8, maxX: 8, minY: -8, maxY: 8 };

it("returns the ordered intersection and checks it in both original equations", () => {
  const equations = [[1, 1, 5], [1, -1, 1]] as const;
  const graph = graphEq036System(equations, frame);
  expect(graph.solution.kind).toBe("unique");
  expect(pair(graph.solution.point)).toEqual(["3", "2"]);
  expect(graph.intersection?.visible).toBe(true);
  expect(pair(graph.intersection!.point)).toEqual(["3", "2"]);
  expect(checkEq036SystemPoint(equations, { x: 3, y: 2 }).holds).toBe(true);
  expect(checkEq036SystemPoint(equations, { x: 2, y: 3 }).rows.map(({ holds }) => holds))
    .toEqual([true, false]);
  const fractional = solveEq036System([[r035(1, 2), 0, 1], [0, 3, 2]]);
  expect(pair(fractional.point)).toEqual(["2", "2/3"]);
});

it("distinguishes a shared line, two separate lines and zero-coefficient rows", () => {
  expect(solveEq036System([[1, 1, 4], [2, 2, 8]]).kind).toBe("coincident");
  expect(solveEq036System([[1, 1, 4], [2, 2, 9]]).kind).toBe("parallel");
  expect(solveEq036System([[0, 0, 0], [0, 2, 3]]).kind).toBe("one-line");
  expect(solveEq036System([[0, 0, 0], [0, 0, 0]]).kind).toBe("whole-plane");
  expect(solveEq036System([[0, 0, 1], [1, 2, 3]]).kind).toBe("inconsistent");
});

it("retains the first equation after cancellation and the other equation after substitution", () => {
  const eliminate = eliminateEq036System([[2, 3, 12], [3, -2, 5]], "y");
  expect(eliminate.multipliers).toEqual([2n, 3n]);
  expect(eliminate.combinedRow?.map(r035Text)).toEqual(["13", "0", "39"]);
  expect(eliminate.retainedRowIndex).toBe(0);
  expect(pair(eliminate.point)).toEqual(["3", "2"]);

  const substitute = substituteEq036System([[1, 1, 7], [2, -1, 5]], 0, "y");
  expect(substitute.isolated?.otherCoefficient).toEqual(r035(-1));
  expect(substitute.reduced).toEqual({ variable: "x", coefficient: r035(3), constant: r035(12) });
  expect(pair(substitute.point)).toEqual(["4", "3"]);
  expect(substituteEq036System([[0, 2, 4], [1, 0, 3]], 0, "x").kind).toBe("cannot-isolate");
});

it("explains the two special parameter values before dividing by a coefficient", () => {
  const identical = [[2, 2, 6], [2, 2, 6]] as const;
  const separate = [[-2, 2, 6], [2, -2, 6]] as const;
  expect(eliminateEq036System(identical, "x").reduction?.kind).toBe("identity");
  const impossible = eliminateEq036System(separate, "x").reduction;
  expect(impossible?.kind).toBe("contradiction");
  expect(impossible?.constant).toEqual(r035(12));
  expect(pair(solveEq036System([[1, 2, 6], [2, 1, 6]]).point)).toEqual(["2", "2"]);
});

it("clips corner contacts without classifying them as complete solutions", () => {
  const corner = graphEq036System([[1, 1, 16], [1, -1, 1]], frame);
  expect(corner.rows[0].kind).toBe("point");
  expect(corner.rows[0].points.map(pair)).toEqual([["8", "8"]]);
  expect(corner.intersection?.visible).toBe(false);
  expect(pair(corner.intersection!.point)).toEqual(["17/2", "15/2"]);
  const outside = graphEq036System([[1, 1, 40], [1, -1, 1]], frame);
  expect(outside.rows[0]).toMatchObject({ kind: "offscreen", points: [] });
});

it("checks positive prices and the amount remaining in each tank", () => {
  const prices = priceEq036System([[2, 3, 31], [3, 2, 34]]);
  expect(prices.kind).toBe("valid");
  expect(pair(prices.solution.point)).toEqual(["8", "5"]);
  expect(prices.checks?.holds).toBe(true);
  expect(priceEq036System([[2, 3, 0], [3, 2, 34]]).kind).toBe("impossible");

  const tanks = transferEq036System(18, 3);
  expect(tanks.kind).toBe("valid");
  expect(pair(tanks.initial)).toEqual(["12", "6"]);
  expect(pair(tanks.after)).toEqual(["9", "9"]);
  expect(tanks.totalAfter).toEqual(r035(18));
  expect(transferEq036System(18, 10)).toMatchObject({ kind: "impossible", after: null });
});
