import { describe, expect, it } from "vitest";
import { questionContentIssues } from "../src/domain/questionContent";
import {
  forge021BiologyALessons,
  forge021BiologyAGuides,
  forge021BiologyATopics,
  codeA021,
  codonA021,
  translationA021,
  pcrA021,
  photosynthesisA021,
  calvinA021,
} from "../src/learning/forge021BiologyA";
describe("five source-based genetics and photosynthesis foundations", () => {
  it("exports one canonical five-unit block with complete independent cards and worked methods", () => {
    expect(Object.values(forge021BiologyATopics)).toEqual([
      "detail-331",
      "detail-332",
      "detail-333",
      "detail-334",
      "detail-335",
    ]);
    expect(forge021BiologyALessons).toHaveLength(5);
    expect(forge021BiologyAGuides).toHaveLength(5);
    expect(
      new Set(
        forge021BiologyALessons.flatMap((l) => l.questions.map((q) => q.id)),
      ).size,
    ).toBe(50);
    for (const l of forge021BiologyALessons) {
      const g = forge021BiologyAGuides.find((g) => g.id === l.id)!;
      expect(g.sections.length).toBeGreaterThanOrEqual(10);
      expect(g.examples).toHaveLength(4);
      expect(g.recall).toHaveLength(4);
      expect(l.questions).toHaveLength(10);
      for (const s of g.sections) {
        expect(s.paragraphs).toHaveLength(2);
        expect(s.paragraphs.every((p) => p.length >= 100)).toBe(true);
      }
      for (const e of g.examples) {
        expect(e.steps).toHaveLength(3);
        expect(e.check).not.toBe("");
        expect(e.pitfall).not.toBe("");
      }
      for (const q of l.questions) {
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(q.options[q.answer]).toBeDefined();
        expect(questionContentIssues(q)).toEqual([]);
      }
    }
  });
  it("enumerates the standard code and pairs strict RNA anticodons antiparallel, with no stop tRNA", () => {
    const all = [..."UCAG"].flatMap((a) =>
      [..."UCAG"].flatMap((b) => [..."UCAG"].map((c) => a + b + c)),
    );
    expect(all).toHaveLength(64);
    expect(new Set(Object.keys(codeA021)).size).toBe(64);
    expect(Object.values(codeA021).filter((v) => v === null)).toHaveLength(3);
    expect(
      new Set(Object.values(codeA021).filter((v) => v !== null)).size,
    ).toBe(20);
    const listed = forge021BiologyAGuides[0].sections[4].table!.rows.flatMap(
      (row) => row[1].split(" "),
    );
    expect(listed).toHaveLength(64);
    expect(new Set(listed).size).toBe(64);
    expect(listed).toContain("GGA");
    expect(listed).toContain("GGG");
    const aug = codonA021("AUG");
    expect(aug.amino).toBe("Met");
    expect(aug.anticodonAligned).toBe("UAC");
    expect(aug.anticodon5).toBe("CAU");
    expect(aug.codingDNA).toBe("ATG");
    expect(aug.templateDNA).toBe("TAC");
    expect(aug.pairBonds).toBe(7);
    expect(codonA021("UGG").anticodon5).toBe("CCA");
    expect(codonA021("UGG").pairBonds).toBe(8);
    for (const stop of ["UAA", "UAG", "UGA"]) {
      expect(codonA021(stop).stop).toBe(true);
      expect(codonA021(stop).anticodonAligned).toBeNull();
      expect(codonA021(stop).pairBonds).toBeNull();
    }
    expect(codonA021("UUU").amino).toBe(codonA021("UUC").amino);
  });
  it("stops one product at the first in-frame stop and separates delivery events from varieties", () => {
    const first = translationA021("original", 6),
      same = translationA021("synonymous", 6),
      early = translationA021("early", 6),
      long = translationA021("longer", 6);
    expect(first.residues).toEqual(["Met", "Phe", "Gly"]);
    expect(first.peptideBonds).toBe(2);
    expect(first.deliveryEvents).toBe(3);
    expect(first.terminated).toBe(true);
    expect(first.codingNucleotides).toBe(12);
    expect(same.residues).toEqual(first.residues);
    expect(early.residues).toEqual(["Met"]);
    expect(early.codingNucleotides).toBe(6);
    expect(early.codons).toHaveLength(4);
    expect(early.peptideBonds).toBe(0);
    expect(long.residues).toEqual(["Met", "Pro", "Pro", "Glu"]);
    expect(long.aminoCount).toBe(4);
    expect(long.distinctAmino).toBe(3);
    expect(long.peptideBonds).toBe(3);
    expect(translationA021("original", 0).residues).toEqual([]);
    expect(translationA021("original", 3).terminated).toBe(false);
    expect(translationA021("original", 4).terminated).toBe(true);
  });
  it("uses explicit ideal PCR doubling and preserves existing target without successful amplification", () => {
    const m = pcrA021(2, 4, true, true, 0);
    expect(m.targetFinal).toBe(32);
    expect(m.newCopies).toBe(30);
    expect(pcrA021(0, 3, true, true, 1).targetFinal).toBe(8);
    expect(pcrA021(0, 3, true, true, 1).controlContaminated).toBe(true);
    expect(pcrA021(0, 8, true, true, 0).targetFinal).toBe(0);
    expect(pcrA021(2, 8, false, true, 0).targetFinal).toBe(2);
    expect(pcrA021(2, 8, true, false, 0).newCopies).toBe(0);
    for (let k = 0; k <= 8; k++) {
      const a = pcrA021(3, k, true, true, 0);
      expect(a.targetFinal).toBe(3 * 2 ** k);
      expect(a.newCopies + a.targetInitial).toBe(a.targetFinal);
    }
  });
  it("conserves gross photoautotrophic atoms and distinguishes water oxygen from CO2 carbon labeling", () => {
    const m = photosynthesisA021(2, "waterO");
    expect(m.co2).toBe(12);
    expect(m.waterIn).toBe(24);
    expect(m.waterOut).toBe(12);
    expect(m.waterNet).toBe(12);
    expect(m.oxygen).toBe(12);
    expect(m.labeledGasOAtoms).toBe(24);
    expect(m.labeledOrganicC).toBe(0);
    const c = photosynthesisA021(2, "carbonC");
    expect(c.labeledGasOAtoms).toBe(0);
    expect(c.labeledOrganicC).toBe(12);
    for (let n = 0; n <= 4; n++) {
      const m = photosynthesisA021(n, "none");
      expect(m.carbonIn).toBe(m.carbonOut);
      expect(m.hydrogenIn).toBe(m.hydrogenOut);
      expect(m.oxygenAtomsIn).toBe(m.oxygenAtomsOut);
      expect(m.waterIn - m.waterOut).toBe(m.waterNet);
    }
    expect(photosynthesisA021(0, "waterO").labeledGasOAtoms).toBe(0);
  });
  it("counts complete Calvin packets, carbon regeneration and unused RuBP without inventing partial products", () => {
    const m = calvinA021(3, 20, 18);
    expect(m.completed).toBe(2);
    expect(m.netTriose).toBe(2);
    expect(m.co2Left).toBe(3);
    expect(m.atpLeft).toBe(2);
    expect(m.nadphLeft).toBe(6);
    expect(m.trioseRegenerated).toBe(10);
    expect(m.rubpInitial).toBe(9);
    expect(m.rubpFinal).toBe(9);
    expect(m.carbonIn).toBe(51);
    expect(m.carbonOut).toBe(51);
    const none = calvinA021(2, 8, 12);
    expect(none.completed).toBe(0);
    expect(none.rubpFinal).toBe(6);
    expect(none.atpLeft).toBe(8);
    expect(none.co2Left).toBe(6);
    for (let c = 0; c <= 4; c++)
      for (let a = 0; a <= 36; a += 3)
        for (let n = 0; n <= 24; n += 2) {
          const m = calvinA021(c, a, n);
          expect(m.atpUsed + m.atpLeft).toBe(a);
          expect(m.nadphUsed + m.nadphLeft).toBe(n);
          expect(m.carbonIn).toBe(m.carbonOut);
          expect(m.trioseGross - m.trioseRegenerated).toBe(m.netTriose);
          expect(m.netTriose * 3).toBe(m.co2Used);
          expect(m.atpLeft).toBeGreaterThanOrEqual(0);
          expect(m.nadphLeft).toBeGreaterThanOrEqual(0);
        }
  });
  it("rejects unsupported bases, unavailable sequence choices and invalid packet stocks", () => {
    for (const f of [
      () => codonA021("ATG"),
      () => codonA021("AUGG"),
      () => translationA021("unknown" as never, 1),
      () => translationA021("original", 0.5),
      () => pcrA021(1, 9, true, true, 0),
      () => pcrA021(-1, 0, true, true, 0),
      () => photosynthesisA021(1.5, "none"),
      () => calvinA021(1, NaN, 6),
      () => calvinA021(5, 9, 6),
    ])
      expect(f).toThrow(RangeError);
  });
});
