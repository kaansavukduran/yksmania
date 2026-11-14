import { describe, expect, it } from "vitest";
import { questionContentIssues } from "../src/domain/questionContent";
import {
  dnaSequenceStats,
  nucleotideIdentity,
  nucleicAcidsGuide,
  nucleicAcidsLesson,
} from "../src/learning/nucleicAcids";

describe("nükleik asitlerin koşullu molekül modeli", () => {
  it("counts pairs once and changes both the counterpart and actual hydrogen count after a base edit", () => {
    expect(dnaSequenceStats("AGTCCA")).toEqual({
      complement: "TCAGGT",
      pairs: 6,
      totalNucleotides: 12,
      AT: 3,
      GC: 3,
      hydrogenBonds: 15,
      linearPhosphodiesterBonds: 10,
      wholeBases: { A: 3, T: 3, G: 3, C: 3 },
    });
    const edited = dnaSequenceStats("GGTCCA");
    expect(edited.complement).toBe("CCAGGT");
    expect(edited.hydrogenBonds).toBe(16);
    expect(edited.wholeBases).toEqual({ A: 2, T: 2, G: 4, C: 4 });
    expect(edited.linearPhosphodiesterBonds).toBe(10);
  });

  it("respects whole dsDNA equalities and two-to-three bonds per pair across all 4-base sequences", () => {
    const alphabet = ["A", "T", "G", "C"];
    for (let code = 0; code < 256; code++) {
      let remainder = code;
      let sequence = "";
      for (let n = 0; n < 4; n++) {
        sequence += alphabet[remainder % 4];
        remainder = Math.floor(remainder / 4);
      }
      const result = dnaSequenceStats(sequence);
      expect(result.hydrogenBonds).toBeGreaterThanOrEqual(8);
      expect(result.hydrogenBonds).toBeLessThanOrEqual(12);
      expect(
        result.wholeBases.A +
          result.wholeBases.T +
          result.wholeBases.G +
          result.wholeBases.C,
      ).toBe(8);
      expect(result.wholeBases.A).toBe(result.wholeBases.T);
      expect(result.wholeBases.G).toBe(result.wholeBases.C);
      expect(dnaSequenceStats(result.complement).complement).toBe(sequence);
    }
    expect(dnaSequenceStats("A").linearPhosphodiesterBonds).toBe(0);
    expect(dnaSequenceStats("ATTAAT").hydrogenBonds).toBe(12);
    expect(dnaSequenceStats("GGCCGG").hydrogenBonds).toBe(18);
  });

  it("does not silently impose DNA rules on RNA or an unspecified sequence", () => {
    for (const sequence of ["", "AUGCCA", "agtcca", "ACT?", "A".repeat(1001)])
      expect(() => dnaSequenceStats(sequence)).toThrow("DNA_SEQUENCE_SCOPE");
    expect(() => nucleotideIdentity("DNA", "U", true)).toThrow(
      "NONSTANDARD_CELLULAR_BASE",
    );
    expect(() => nucleotideIdentity("RNA", "T", true)).toThrow(
      "NONSTANDARD_CELLULAR_BASE",
    );
    const dna = nucleotideIdentity("DNA", "A", true);
    const rna = nucleotideIdentity("RNA", "A", true);
    expect(dna.sugar).toBe("Deoksiriboz");
    expect(rna.sugar).toBe("Riboz");
    expect(dna.identity).not.toBe(rna.identity);
    expect(nucleotideIdentity("RNA", "A", false).unit).toBe("Nükleozit");
    expect(nucleotideIdentity("RNA", "G", true).group).toBe(
      "Pürin · iki halka",
    );
    expect(nucleotideIdentity("RNA", "U", true).group).toBe(
      "Pirimidin · bir halka",
    );
  });
});

it("keeps the established lesson id and self-contained five-option questions with independent keyed calculations", () => {
  expect(nucleicAcidsLesson.id).toBe("nukleik-asitler");
  expect(nucleicAcidsLesson.subjectId).toBe("tyt-biyoloji");
  const questions = nucleicAcidsLesson.questions;
  expect(questions).toHaveLength(10);
  expect(new Set(questions.map((q) => q.id)).size).toBe(10);
  for (const question of questions) {
    expect(questionContentIssues(question)).toEqual([]);
    expect(question.options).toHaveLength(5);
    expect(question.answer).toBeGreaterThanOrEqual(0);
    expect(question.answer).toBeLessThan(5);
  }
  expect(questions.find((q) => q.id === "nuc-4")!.options[1].tr).toBe("1040");
  // 800 total nucleotides and T=160 give 160 AT + 240 GC pairs.
  expect(2 * 160 + 3 * ((800 - 2 * 160) / 2)).toBe(1040);
  expect(questions.find((q) => q.id === "nuc-8")!.options[2].tr).toBe("198");
  expect(questions.find((q) => q.id === "nuc-5")!.answer).toBe(3);
  expect(nucleicAcidsGuide.sections.length).toBeGreaterThanOrEqual(8);
  expect(
    nucleicAcidsGuide.sections.every(
      (section) => section.paragraphs.length >= 2,
    ),
  ).toBe(true);
  expect(nucleicAcidsGuide.examples.length).toBeGreaterThanOrEqual(4);
  expect(
    nucleicAcidsGuide.examples.every((example) => example.steps.length >= 3),
  ).toBe(true);
  expect(nucleicAcidsGuide.recall.length).toBeGreaterThanOrEqual(4);
});
