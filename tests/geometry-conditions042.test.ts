import { expect, it } from "vitest";
import { lessonById } from "../src/domain/content";
import { pastExamReferences } from "../src/domain/pastExams";
import { questionContentIssues } from "../src/domain/questionContent";
import { geometry031Triangle } from "../src/learning/geometryFoundation031Model";
import {
  angleBisectors042,
  sharedTriangleSide042,
} from "../src/learning/geometryConditions042Model";
import { lessonGuides } from "../src/learning/guides";
import { builtInCheatSheets } from "../src/learning/cheatsheetContent";

it("constructs the three bisector choices with positional and angular evidence from the same points", () => {
  for (let a = 24; a <= 140; a += 4) {
    for (let b = 10; b <= 170 - a; b += 5) {
      for (const [mode, expected] of [
        ["internal", 90 + a / 2],
        ["mixed", a / 2],
        ["external", 90 - a / 2],
      ] as const) {
        const model = angleBisectors042(a, b, mode);
        const triangle = geometry031Triangle(model.A, model.B, model.C);
        expect(triangle.angles?.A).toBeCloseTo(a, 9);
        expect(triangle.angles?.B).toBeCloseTo(b, 9);
        expect(triangle.angles?.C).toBeCloseTo(180 - a - b, 9);
        expect(model.angle).toBeCloseTo(expected, 9);
        const point = model.intersection;
        const vertices = [model.A, model.B, model.C];
        const inside = vertices.every((start, i) => {
          const end = vertices[(i + 1) % 3];
          return (
            (end.x - start.x) * (point.y - start.y) -
              (end.y - start.y) * (point.x - start.x) >
            0
          );
        });
        expect(inside).toBe(mode === "internal");
        if (mode === "external") expect(point.y).toBeLessThan(0);
      }
    }
  }
  expect(() => angleBisectors042(100, 80, "internal")).toThrow(RangeError);
});

it("includes only real triangles and numbers strictly inside both side intervals", () => {
  for (let d = 1; d <= 17; d += 1) {
    for (let e = 1; e <= 17; e += 1) {
      const canBuild = (p: number, q: number, r: number) =>
        p + q > r && p + r > q && q + r > p;
      const common = Array.from({ length: 25 }, (_, i) => i + 1).filter(
        (x) => canBuild(4, 9, x) && canBuild(d, e, x),
      );
      for (const x of [1, 5, 8, 9, 12, 13, 14, 25]) {
        const model = sharedTriangleSide042(4, 9, d, e, x);
        expect(model.integerCount).toBe(common.length);
        expect(model.both).toBe(common.includes(x));
        expect(Boolean(model.upper.shape.triangle)).toBe(canBuild(4, 9, x));
        expect(Boolean(model.lower.shape.triangle)).toBe(canBuild(d, e, x));
        if (common.length > 0) {
          expect(model.firstInteger).toBe(common[0]);
          expect(model.lastInteger).toBe(common.at(-1));
        }
      }
    }
  }
  expect(sharedTriangleSide042(4, 6, 4, 14, 10)).toMatchObject({
    min: 10,
    max: 10,
    both: false,
    integerCount: 0,
    upper: { shape: { kind: "degenerate" } },
    lower: { shape: { kind: "degenerate" } },
  });
  expect(() => sharedTriangleSide042(4, 9, 6, 8, 5.01)).toThrow(RangeError);
});

it("appends distinct course cards, examples and quick paths without changing first cards or topic links", () => {
  const courses = [
    {
      id: "tyt-geo-acilar-kaynak-pekitirme-032",
      old: 18,
      sections: 12,
      examples: 1,
      first: "f032-tyt-geo-acilar-kaynak-pekitirme-032-1",
      official: ["2024-TYT-MAT-31", "D", 34, 43],
      answers: [
        "90°",
        "18°",
        "Aynı kesişimde ters açı 64°.",
        "Dış kollar arası 80°.",
      ],
      sheet: "Açıortaydan dik açıya",
    },
    {
      id: "tyt-geo-ucgende-acilar-031",
      old: 10,
      sections: 10,
      examples: 3,
      first: "f031-tyt-geo-ucgende-acilar-031-1",
      official: ["2024-TYT-MAT-32", "E", 34, 43],
      answers: ["62°", "38°", "66°", "75°, 60°, 45°", "95°"],
      sheet: "Açıortay ve kenarortay",
    },
    {
      id: "tyt-geo-ucgen-esitsizligi-031",
      old: 10,
      sections: 10,
      examples: 1,
      first: "f031-tyt-geo-ucgen-esitsizligi-031-1",
      official: ["2021-TYT-MAT-32", "B", 35, 45],
      answers: ["3", "Hayır.", "10", "12 birim", "BD>BC>AB"],
      sheet: "Açık sınırı koru, sonra ek koşulu uygula",
    },
  ] as const;
  for (const {
    id,
    old,
    sections,
    examples,
    first,
    official,
    answers,
    sheet,
  } of courses) {
    const lesson = lessonById(id)!;
    expect(lesson.questions[0].id).toBe(first);
    expect(lesson.questions).toHaveLength(old + answers.length);
    const added = lesson.questions.slice(old);
    expect(added.map((q) => q.options[q.answer].tr)).toEqual(answers);
    for (const question of added) {
      expect(questionContentIssues(question)).toEqual([]);
      expect(question.guidance?.optionReasons).toHaveLength(5);
    }
    expect(lessonGuides.get(id)?.sections).toHaveLength(sections);
    const topic = `topic-${id}`;
    const summary = builtInCheatSheets.get(topic)!;
    expect(summary.sections.at(-1)?.title).toBe(sheet);
    if (id === "tyt-geo-ucgende-acilar-031") {
      expect(summary.sections.map((section) => section.title)).toContain("Üç açıortay kesişimini ayır");
      expect(lessonGuides.get(id)?.examples.at(-1)?.answer).toBe("100°.");
    }
    expect(summary.examples.length).toBeGreaterThanOrEqual(examples + 2);
    expect(pastExamReferences.find((r) => r.id === official[0])).toMatchObject({
      answer: official[1],
      page: official[2],
      answerPage: official[3],
      topicIds: [topic],
    });
  }
});
