import { it, expect } from "vitest";
import {
  soundQuestions,
  structureQuestions,
} from "../src/learning/turkishLanguageQuestions";
import { questionContentIssues } from "../src/domain/questionContent";
import {
  soundGuide,
  structureGuide,
} from "../src/learning/guides/turkishLanguage";
import {
  wordCases,
  joinWord,
  soundCases,
} from "../src/learning/TurkishLanguageExplorer";

it("keeps sound and morphology questions self-contained and distinguishes the actual tested evidence", () => {
  const all = [...soundQuestions, ...structureQuestions];
  expect(all).toHaveLength(20);
  expect(new Set(all.map((q) => q.id)).size).toBe(20);
  for (const question of all) {
    expect(questionContentIssues(question)).toEqual([]);
    expect(question.options).toHaveLength(5);
    expect(question.answer).toBeGreaterThanOrEqual(0);
    expect(question.answer).toBeLessThan(5);
    expect(question.explanation.tr.length).toBeGreaterThan(120);
  }
  expect(soundQuestions[0].options[soundQuestions[0].answer].tr).toBe(
    "Ünlü düşmesi; omuz",
  );
  expect(soundQuestions[3].options[soundQuestions[3].answer].tr).toBe(
    "süt → sütü",
  );
  expect(structureQuestions[5].prompt.tr).toContain("Onun kitabını okudum.");
  expect(structureQuestions[5].explanation.tr).toContain("son ı belirtme");
});
it("joins exact words without counting helper consonants or sound changes as derivation", () => {
  for (const item of wordCases) expect(joinWord(item.pieces)).toBe(item.word);
  const book = wordCases.find((c) => c.word === "kitabını")!;
  expect(book.pieces.filter((p) => p.kind === "derive")).toHaveLength(0);
  expect(book.pieces.filter((p) => p.kind === "inflect")).toHaveLength(2);
  expect(book.pieces.filter((p) => p.kind === "bridge")).toHaveLength(1);
  expect(
    wordCases
      .find((c) => c.word === "gözlükçülerimizden")!
      .pieces.filter((p) => p.kind === "derive"),
  ).toHaveLength(2);
  const future = soundCases.find((c) => c.result === "başlayacak")!;
  expect(future.event).toBe("Yardımcı ünsüz");
  expect(future.evidence).toContain("a’sı korunur");
});
it("keeps enough explained stages, independent worked examples and recall for both source-led guides", () => {
  for (const guide of [soundGuide, structureGuide]) {
    expect(guide.sections.length).toBeGreaterThanOrEqual(10);
    expect(guide.examples.length).toBeGreaterThanOrEqual(12);
    expect(guide.recall.length).toBeGreaterThanOrEqual(4);
    for (const example of guide.examples) {
      expect(example.steps.length).toBeGreaterThanOrEqual(2);
      expect(example.prompt.length).toBeGreaterThan(25);
      expect(example.pitfall.length).toBeGreaterThan(25);
    }
  }
});
