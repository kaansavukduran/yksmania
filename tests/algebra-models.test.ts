import { it, expect } from "vitest";
import {
  solveEquation,
  solveInequality,
  fractionLabel,
  compare,
  type Relation,
} from "../src/learning/algebraModels";
import { lessonGuides } from "../src/learning/guides";
import { lessonById, lessons } from "../src/domain/content";
import { lessonTopic } from "../src/domain/studyPlan";

it("keeps exact rational solutions and separates zero-coefficient identity from contradiction", () => {
  expect(solveEquation(3, 0, 1)).toEqual({
    kind: "single",
    value: 1 / 3,
    label: "1/3",
  });
  expect(solveEquation(-6, 4, 7)).toEqual({
    kind: "single",
    value: -0.5,
    label: "−1/2",
  });
  expect(solveEquation(0, 3, 3).kind).toBe("all");
  expect(solveEquation(0, 3, 4).kind).toBe("none");
  expect(fractionLabel(0, -3)).toBe("0");
  expect(fractionLabel(-6, -4)).toBe("3/2");
  expect(() => fractionLabel(1, 0)).toThrow();
});
it("matches each original inequality across signs, zero and all four relations", () => {
  for (let a = -3; a <= 3; a++)
    for (let b = -4; b <= 4; b++)
      for (let c = -4; c <= 4; c++)
        for (const op of ["<", "≤", ">", "≥"] as Relation[]) {
          const result = solveInequality(a, b, c, op);
          for (let x = -6; x <= 6; x++) {
            const accepted =
              result.kind === "all" ||
              (result.kind === "interval" &&
                compare(x, result.relation, result.boundary));
            expect(accepted, `${a}x+${b}${op}${c},x=${x}`).toBe(
              compare(a * x + b, op, c),
            );
          }
        }
  expect(solveInequality(-2, 1, 7, "<")).toMatchObject({
    relation: ">",
    boundary: -3,
    closed: false,
    interval: "(−3, ∞)",
  });
  expect(solveInequality(-2, 1, 7, "≤")).toMatchObject({
    relation: "≥",
    closed: true,
    interval: "[−3, ∞)",
  });
});
it("preserves guide durations and topic associations while attaching independent algebra practice", () => {
  for (const guide of lessonGuides.values())
    expect(lessonById(guide.id)?.minutes, guide.id).toBe(guide.minutes);
  expect(lessonTopic["birinci-dereceden-denklemler"]).toBe("detail-203");
  expect(lessonTopic["basit-esitsizlikler"]).toBe("detail-204");
  for (const id of ["birinci-dereceden-denklemler", "basit-esitsizlikler"]) {
    const questions = lessonById(id)!.questions;
    expect(questions).toHaveLength(10);
    expect(new Set(questions.map((question) => question.id)).size).toBe(10);
    expect(
      questions.every((question) =>
        question.id.startsWith(`f013-foundation-${id}-`),
      ),
    ).toBe(true);
  }
  expect(lessons.flatMap((lesson) => lesson.questions).length).toBeGreaterThan(
    115,
  );
});
