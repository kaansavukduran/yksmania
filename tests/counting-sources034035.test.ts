import { expect, it } from "vitest";
import {
  binomialId,
  combinationId,
} from "../src/data/supplementalCountingTopics034035";
import { lessonById } from "../src/domain/content";
import { pastExamReferences } from "../src/domain/pastExams";
import { lessonTopic, studyTopics } from "../src/domain/studyPlan";
import { builtInCheatSheets } from "../src/learning/cheatsheetContent";
import { lessonGuides } from "../src/learning/guides";
import { pointChoices034 } from "../src/learning/pointChoicesSource034Model";
import {
  pascalRows035,
  signedBinomial035,
} from "../src/learning/signedBinomialSource035Model";

it("registers two separate sets with independently checked answers, summaries and sources", () => {
  const expected = [
    [
      combinationId,
      "2022-AYT-MAT-14",
      "A",
      ["56", "36", "70", "60", "31", "6", "31 üçgen, 16 doğru", "27"],
    ],
    [
      binomialId,
      "2022-AYT-MAT-13",
      "C",
      ["20", "216", "−80", "1.215", "1 terim, 1", "−62 ve 63", "7", "x⁰"],
    ],
  ] as const;
  expect(studyTopics.slice(-2).map(({ id }) => id)).toEqual(
    expected.map(([id]) => `topic-${id}`),
  );
  for (const [id, referenceId, answer, keys] of expected) {
    const guide = lessonGuides.get(id)!;
    const sheet = builtInCheatSheets.get(lessonTopic[id])!;
    const questions = lessonById(id)!.questions;
    expect(questions.map((q) => q.options[q.answer].tr)).toEqual(keys);
    expect(
      questions.every(
        ({ options, guidance }) =>
          new Set(options.map(({ tr }) => tr)).size === 5 &&
          guidance?.optionReasons.length === 5,
      ),
    ).toBe(true);
    expect(guide.sections).toHaveLength(6);
    expect(guide.examples).toHaveLength(3);
    expect(guide.recall).toHaveLength(4);
    expect(sheet.examples.map(({ answer }) => answer)).toEqual(
      guide.examples.map(({ answer }) => answer),
    );
    expect(
      pastExamReferences.find(({ id }) => id === referenceId),
    ).toMatchObject({
      bookletId: "2022-ayt",
      answer,
      page: 29,
      answerPage: 50,
      topicIds: [lessonTopic[id]],
    });
  }
});

it("counts one geometric line regardless of how many pairs select it", () => {
  const zero = [
    { id: "A", x: 0, y: 0 },
    { id: "B", x: 2, y: 0 },
    { id: "C", x: 4, y: 0 },
    { id: "D", x: 6, y: 0 },
  ];
  const flat = pointChoices034(zero);
  expect(flat.collinear).toHaveLength(4);
  expect(flat.triangles).toEqual([]);
  expect(flat.lines).toEqual([["A", "B", "C", "D"]]);
  const elevated = pointChoices034([...zero, { id: "E", x: 2, y: 3 }]);
  expect(elevated).toMatchObject({ totalTriples: 10 });
  expect(elevated.lines).toHaveLength(5);
  expect(elevated.triangles).toHaveLength(6);
  expect(elevated.triangles[0]).toEqual({ ids: ["A", "B", "E"], areaTwice: 6 });
  expect(pointChoices034([])).toMatchObject({ totalTriples: 0, lines: [] });
  expect(() => pointChoices034([...zero, { ...zero[0], id: "U" }])).toThrow(
    RangeError,
  );
});

it("connects Pascal counts with signed sums while keeping the original domain", () => {
  for (const [n, row] of pascalRows035(10).entries()) {
    expect(row.reduce((sum, coefficient) => sum + coefficient, 0n)).toBe(
      2n ** BigInt(n),
    );
  }
  expect(
    signedBinomial035(
      5,
      { multiplier: 2, exponent: 1 },
      { multiplier: -1, exponent: 0 },
    ),
  ).toMatchObject({
    evenSum: -121n,
    oddSum: 122n,
    coefficientTotal: 1n,
    alternatingTotal: -243n,
    constant: -1n,
  });
  expect(
    signedBinomial035(
      4,
      { multiplier: 3, exponent: 1 },
      { multiplier: -2, exponent: 1 },
    ).coefficients,
  ).toEqual([{ exponent: 4, coefficient: 1n }]);
  const vacant = signedBinomial035(
    0,
    { multiplier: 1, exponent: 1 },
    { multiplier: -1, exponent: -1 },
  );
  expect(vacant).toMatchObject({
    constant: 1n,
    numericValueAtOneDefined: false,
    numericValueAtMinusOneDefined: false,
    negativeExponentExcludesZero: true,
  });
  expect(
    signedBinomial035(
      3,
      { multiplier: 2, exponent: -1 },
      { multiplier: -2, exponent: -1 },
    ),
  ).toMatchObject({ coefficients: [], negativeExponentExcludesZero: true });
});

it("teaches cumulative growth separately from the final balance and bounds evaporation", () => {
  const interest = lessonGuides.get("faiz-problemleri")!;
  expect(
    interest.examples.find(
      ({ title }) => title === "İki yıllık faizle toplam yüzde artışını bul",
    )?.answer,
  ).toBe("Basit artış %16, bileşik artış %16,64.");
  expect(
    builtInCheatSheets
      .get("detail-215")!
      .sections.flatMap(({ text }) => text)
      .join(" "),
  ).toContain("100·(S/P−1)");
  const evaporation = lessonGuides
    .get("karisim-problemleri")!
    .sections.find(
      ({ title }) => title === "Yalnız su buharlaşıyorsa çözünen korunur",
    )!;
  expect(evaporation.paragraphs[0]).toContain("S>0 ve hedef yüzde p>0");
  expect(evaporation.paragraphs[0]).toContain("T−S arasında kalmalı");
});
