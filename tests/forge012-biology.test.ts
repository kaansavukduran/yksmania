import { describe, it, expect } from "vitest";
import {
  sexualSnapshot,
  independentGametes,
  monoCross,
  linkedGametes,
  aboCross,
  aboPhenotype,
  xLinkedCross,
  pedigreeCandidates,
  forge012BiologyGuides,
  forge012BiologyLessons,
  forge012BiologyTopics,
} from "../src/learning/forge012Biology";
describe("Forge012biology: biological models", () => {
  it("separates chromosome/cell counts across fertilisation and growth", () => {
    expect(sexualSnapshot(12, 1)).toMatchObject({
      haploid: 6,
      chromosomes: 6,
      cells: 2,
    });
    expect(sexualSnapshot(12, 2)).toMatchObject({ chromosomes: 12, cells: 1 });
    expect(sexualSnapshot(12, 3, 3)).toMatchObject({
      chromosomes: 12,
      cells: 8,
    });
    expect(() => sexualSnapshot(7, 1)).toThrow();
  });
  it("enumerates independent gametes using each locus once", () => {
    expect(independentGametes("AaBBcc")).toEqual(["ABc", "aBc"]);
    expect(independentGametes("AABbCc")).toEqual(["ABC", "ABc", "AbC", "Abc"]);
    expect(() => independentGametes("Ab")).toThrow();
  });
  it("preserves probabilities over every Mendelian parental pair", () => {
    for (const a of ["AA", "Aa", "aa"])
      for (const b of ["AA", "Aa", "aa"]) {
        const m = monoCross(a, b);
        expect(m.cells).toHaveLength(4);
        expect(Object.values(m.counts).reduce((s, x) => s + x, 0)).toBe(4);
        expect(m.dominant + m.recessive).toBe(1);
      }
    expect(monoCross("Aa", "Aa")).toMatchObject({
      counts: { AA: 1, Aa: 2, aa: 1 },
      heterozygote: 0.5,
      recessive: 0.25,
    });
    expect(monoCross("Aa", "aa").recessive).toBe(0.5);
  });
  it("distinguishes cis/trans parental gametes and recombination totals", () => {
    expect(linkedGametes(20)).toEqual({ AB: 0.4, Ab: 0.1, aB: 0.1, ab: 0.4 });
    expect(linkedGametes(10, "trans")).toEqual({
      AB: 0.05,
      Ab: 0.45,
      aB: 0.45,
      ab: 0.05,
    });
    expect(linkedGametes(50)).toEqual({
      AB: 0.25,
      Ab: 0.25,
      aB: 0.25,
      ab: 0.25,
    });
    expect(() => linkedGametes(51)).toThrow();
  });
  it("calculates ABO inheritance without treating phenotype as exact genotype", () => {
    expect(aboCross("AO", "BO").probabilities).toEqual({
      A: 0.25,
      B: 0.25,
      AB: 0.25,
      O: 0.25,
    });
    expect(aboCross("AB", "OO").probabilities).toEqual({
      A: 0.5,
      B: 0.5,
      AB: 0,
      O: 0,
    });
    for (const a of ["AA", "AO", "BB", "BO", "AB", "OO"])
      for (const b of ["AA", "AO", "BB", "BO", "AB", "OO"])
        expect(
          Object.values(aboCross(a, b).probabilities).reduce(
            (s, x) => s + x,
            0,
          ),
        ).toBe(1);
    expect(aboPhenotype("BA")).toBe("AB");
    expect(() => aboCross("ABO", "OO")).toThrow();
  });
  it("separates affected sons from all affected births", () => {
    for (const mother of ["AA", "Aa", "aa"])
      for (const father of ["AY", "aY"])
        expect(xLinkedCross(mother, father).cells).toHaveLength(4);
    const m = xLinkedCross("Aa", "AY");
    expect(m.affected).toBe(0.25);
    expect(m.sonsAffected).toBe(0.5);
    expect(m.daughtersAffected).toBe(0);
    expect(m.cells.map((c) => c.genotype)).toEqual([
      "XAXA",
      "XAY",
      "XAXa",
      "XaY",
    ]);
    const father = xLinkedCross("AA", "aY");
    expect(father.affected).toBe(0);
    expect(
      father.cells.filter((c) => c.sex === "XX").every((c) => c.carrier),
    ).toBe(true);
    expect(xLinkedCross("aa", "aY").affected).toBe(1);
  });
  it("eliminates models using every family member rather than pattern slogans", () => {
    expect(
      pedigreeCandidates({
        father: false,
        mother: false,
        child: true,
        daughter: true,
      }).map((m) => m.id),
    ).toEqual(["AR"]);
    expect(
      pedigreeCandidates({
        father: false,
        mother: false,
        child: true,
        daughter: false,
      }).map((m) => m.id),
    ).toEqual(["AR", "XR"]);
    expect(
      pedigreeCandidates({
        father: true,
        mother: false,
        child: false,
        daughter: false,
      }).some((m) => m.id === "Y"),
    ).toBe(false);
    expect(
      pedigreeCandidates({
        father: false,
        mother: true,
        child: true,
        daughter: true,
      }).some((m) => m.id === "Y"),
    ).toBe(false);
  });
});
describe("seven source-grounded biology units", () => {
  it("contains7guides56sections28examples28recall70originalquestions", () => {
    expect(forge012BiologyLessons).toHaveLength(7);
    expect(
      forge012BiologyGuides.reduce((n, g) => n + g.sections.length, 0),
    ).toBe(56);
    expect(
      forge012BiologyGuides.reduce((n, g) => n + g.examples.length, 0),
    ).toBe(28);
    expect(forge012BiologyGuides.reduce((n, g) => n + g.recall.length, 0)).toBe(
      28,
    );
    expect(
      forge012BiologyLessons.reduce((n, g) => n + g.questions.length, 0),
    ).toBe(70);
  });
  it("maps reviewed lessonids to exact detailed topics24–30", () => {
    expect(Object.values(forge012BiologyTopics)).toEqual(
      Array.from({ length: 7 }, (_, i) => `detail-${24 + i}`),
    );
  });
  it("keeps each question self-contained with unique5options and rationale", () => {
    const ids = new Set<string>();
    for (const lesson of forge012BiologyLessons)
      for (const q of lesson.questions) {
        expect(ids.has(q.id)).toBe(false);
        ids.add(q.id);
        expect(q.prompt.tr.trim()).not.toBe("");
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(5);
        expect(q.explanation.tr.length).toBeGreaterThan(70);
        expect(q.hint.tr).not.toBe("");
        expect(q.prompt.tr).not.toMatch(/yukarıdaki|önceki metin|bu şekilde/i);
      }
  });
  it("keeps core numerical keys consistent with independently calculated cases", () => {
    const answer = (id: string, i: number) => {
      const q = forge012BiologyLessons.find((l) => l.id === id)!.questions[
        i - 1
      ];
      return q.options[q.answer].tr;
    };
    expect(answer("mendel-genetigi", 9)).toBe("37/64");
    expect(answer("mendelden-sapmalar", 7)).toBe("%40");
    expect(answer("mendelden-sapmalar", 8)).toBe("%5");
    expect(answer("kan-gruplari", 8)).toBe("1/8");
    expect(answer("eseyin-belirlenmesi", 5)).toBe("1/2");
    expect(answer("soy-agaclari", 5)).toBe("Otozomal çekinik");
  });
});
