import { describe, expect, it } from "vitest";
import {
  asexualScenario,
  crossoverProducts,
  divisionSnapshot,
  filterInvertebrates,
  forge011BiologyBGuides,
  forge011BiologyBLessons,
  forge011BiologyBTopics,
  independentProducts,
  synchronousGrowth,
  vertebrateSample,
} from "../src/learning/forge011BiologyB";

describe("biyolojik kanıtın kapsamı", () => {
  it("tek geniş ortaklık on iki adayı korurken iki sistem kanıtı ahtapotu ayırır", () => {
    expect(filterInvertebrates("all")).toHaveLength(12);
    expect(filterInvertebrates("closed").map((s) => s.id)).toEqual([
      "earthworm",
      "octopus",
    ]);
    expect(filterInvertebrates("closed", "mantle").map((s) => s.id)).toEqual([
      "octopus",
    ]);
  });
  it("trake tek başına böceği kesinleştirmez; üç çift bacak alt grubu ayırır", () => {
    expect(filterInvertebrates("trachea").map((s) => s.id)).toEqual([
      "insect",
      "spider",
      "centipede",
    ]);
    expect(filterInvertebrates("trachea", "sixlegs").map((s) => s.id)).toEqual([
      "insect",
    ]);
    expect(filterInvertebrates("pores", "sixlegs")).toHaveLength(0);
    expect(() => filterInvertebrates("unreviewed")).toThrow(RangeError);
  });
  it("dört odacık ve yumurtlama tek başına kuş/memeli tanısı değildir", () => {
    expect(vertebrateSample("crocodile")).toMatchObject({
      group: "Sürüngenler",
      heart: 4,
      thermal: "Ektoterm",
    });
    expect(vertebrateSample("platypus").reproduction).toContain("yumurtlama");
    expect(vertebrateSample("platypus").group).toBe("Memeliler");
    expect(vertebrateSample("dolphin").respiration).toBe("Akciğer");
    expect(vertebrateSample("penguin").group).toBe("Kuşlar");
    expect(() => vertebrateSample("invented")).toThrow(RangeError);
  });
});

describe("mitoz ve mayozda sayım alanları", () => {
  it("eşlenme kromozom/takımı değil DNA molekülünü artırır", () => {
    for (const count of [2, 4, 6, 8]) {
      for (const kind of ["mitosis", "meiosis"] as const) {
        expect(divisionSnapshot(kind, 0, count)).toMatchObject({
          cells: 1,
          chromosomes: count,
          dnaMolecules: count,
          dnaC: 2,
        });
        expect(divisionSnapshot(kind, 1, count)).toMatchObject({
          cells: 1,
          chromosomes: count,
          dnaMolecules: count * 2,
          dnaC: 4,
        });
      }
    }
  });
  it("mitotik anafazda tüm hücre ve tek kutbu ayırır; son iki yavru DNA toplamını korur", () => {
    const ana = divisionSnapshot("mitosis", 4, 6);
    expect(ana).toMatchObject({
      cells: 1,
      chromosomes: 12,
      dnaMolecules: 12,
      dnaC: 4,
      poleChromosomes: 6,
      poleDnaMolecules: 6,
    });
    expect(divisionSnapshot("mitosis", 5, 6).cells).toBe(1);
    const end = divisionSnapshot("mitosis", 6, 6);
    expect(end).toMatchObject({
      cells: 2,
      chromosomes: 6,
      dnaMolecules: 6,
      dnaC: 2,
      totalDnaMolecules: 12,
    });
    expect(end.cells * end.dnaMolecules).toBe(ana.totalDnaMolecules);
  });
  it("ilk mayoz ürünü haploit ve iki kardeşlidir; II öncesinde yeni S üretmez", () => {
    expect(divisionSnapshot("meiosis", 4, 8)).toMatchObject({
      chromosomes: 8,
      dnaMolecules: 16,
      poleChromosomes: 4,
      poleDnaMolecules: 8,
    });
    for (const stage of [5, 6])
      expect(divisionSnapshot("meiosis", stage, 8)).toMatchObject({
        cells: 2,
        chromosomes: 4,
        dnaMolecules: 8,
        dnaC: 2,
      });
  });
  it("anafazII tüm hücre sayımı son yavru ploidisi değildir", () => {
    expect(divisionSnapshot("meiosis", 7, 6)).toMatchObject({
      cells: 2,
      chromosomes: 6,
      dnaMolecules: 6,
      dnaC: 2,
      poleChromosomes: 3,
      poleDnaMolecules: 3,
    });
    expect(divisionSnapshot("meiosis", 8, 6)).toMatchObject({
      cells: 4,
      chromosomes: 3,
      dnaMolecules: 3,
      dnaC: 1,
      totalDnaMolecules: 12,
    });
  });
  it("eşlenme sonrası her evrede tüm hücrelerin DNA toplamı korunur", () => {
    for (const count of [2, 4, 6, 8])
      for (const kind of ["mitosis", "meiosis"] as const)
        for (let stage = 1; stage <= (kind === "mitosis" ? 6 : 8); stage++) {
          const state = divisionSnapshot(kind, stage, count);
          expect(state.cells * state.dnaMolecules).toBe(count * 2);
          expect(state.totalDnaMolecules).toBe(count * 2);
          expect(state.cells * state.dnaC).toBe(4);
        }
  });
  it("kapsam dışı evre, kesirli sayı ve izin verilmeyen başlangıcı reddeder", () => {
    for (const [stage, count] of [
      [-1, 4],
      [0.5, 4],
      [9, 4],
      [1, 3],
      [1, 10],
      [NaN, 4],
    ])
      expect(() => divisionSnapshot("meiosis", stage, count)).toThrow(
        RangeError,
      );
    expect(() => divisionSnapshot("mitosis", 7, 4)).toThrow(RangeError);
  });
});

describe("çeşitlilik ve yeni birey modelleri", () => {
  it("bağımsız dağılım tek olayda iki bileşimi ikişer verir", () => {
    expect(independentProducts(false)).toEqual(["AB", "AB", "ab", "ab"]);
    expect(independentProducts(true)).toEqual(["Ab", "Ab", "aB", "aB"]);
    expect(
      new Set([...independentProducts(false), ...independentProducts(true)])
        .size,
    ).toBe(4);
    expect(new Set(independentProducts(true)).size).toBe(2);
  });
  it("tek karşılıklı değişim katılmayan iki kromatidi korur", () => {
    expect(crossoverProducts(false)).toEqual(["AB", "AB", "ab", "ab"]);
    expect(crossoverProducts(true)).toEqual(["AB", "Ab", "aB", "ab"]);
    expect(crossoverProducts(true).filter((x) => x[0] === "A")).toHaveLength(2);
    expect(crossoverProducts(true).filter((x) => x[1] === "B")).toHaveLength(2);
  });
  it("endospor ve kuyruk onarımı üreme artışı değildir; tohum karşı örneği döllenme geçmişini korur", () => {
    for (const id of ["repair", "endospore"])
      expect(asexualScenario(id)).toMatchObject({
        newIndividual: false,
        fertilization: false,
        finalCount: 1,
      });
    for (const id of ["bud", "fragment", "cutting"])
      expect(asexualScenario(id)).toMatchObject({
        newIndividual: true,
        fertilization: false,
        finalCount: 2,
      });
    expect(asexualScenario("seed")).toMatchObject({
      newIndividual: true,
      fertilization: true,
    });
    expect(() => asexualScenario("all-spores")).toThrow(RangeError);
  });
  it("tam tur ile seçili bölünmeyi ayırır ve popülasyondan fazla seçim/kayıp kabul etmez", () => {
    expect(synchronousGrowth(3, 2, 5, 0)).toEqual({
      afterRounds: 12,
      result: 17,
    });
    expect(synchronousGrowth(4, 1, 3, 1).result).toBe(10);
    expect(synchronousGrowth(1, 0, 0, 1).result).toBe(0);
    expect(() => synchronousGrowth(1, 0, 2, 0)).toThrow(RangeError);
    expect(() => synchronousGrowth(1, 0, 0, 2)).toThrow(RangeError);
    expect(() => synchronousGrowth(1.5, 2, 0, 0)).toThrow(RangeError);
  });
});

it("beş ayrı başlığın kapsamlı rehberi, çözümlü vakaları ve elli bağımsız sorusu vardır", () => {
  expect(forge011BiologyBLessons.map((l) => l.id)).toEqual([
    "omurgasizlar",
    "omurgalilar",
    "mitoz",
    "eseysiz-ureme",
    "mayoz",
  ]);
  expect(Object.values(forge011BiologyBTopics)).toEqual([
    "detail-19",
    "detail-20",
    "detail-21",
    "detail-22",
    "detail-23",
  ]);
  const questionIds = new Set<string>();
  for (const guide of forge011BiologyBGuides) {
    expect(guide.sections).toHaveLength(10);
    expect(
      guide.sections.every(
        (s) =>
          s.paragraphs.length >= 2 &&
          s.paragraphs.every((p) => p.trim().length > 120),
      ),
    ).toBe(true);
    expect(guide.examples).toHaveLength(4);
    expect(
      guide.examples.every(
        (e) =>
          e.steps.length >= 3 && e.strategy && e.answer && e.check && e.pitfall,
      ),
    ).toBe(true);
    expect(guide.recall).toHaveLength(5);
  }
  for (const lesson of forge011BiologyBLessons) {
    expect(lesson.questions).toHaveLength(10);
    expect(lesson.questions.map((q) => q.answer)).toEqual([
      0, 1, 2, 3, 4, 0, 1, 2, 3, 4,
    ]);
    for (const q of lesson.questions) {
      expect(questionIds.has(q.id)).toBe(false);
      questionIds.add(q.id);
      expect(q.options).toHaveLength(5);
      expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
      expect(q.prompt.tr.trim()).not.toBe("");
      expect(q.explanation.tr.trim().length).toBeGreaterThan(150);
      expect(q.options[q.answer].tr).not.toBe("");
      expect(q.prompt.tr).not.toMatch(
        /bu şekle göre|yukarıdaki metne göre|önceki deney/i,
      );
    }
  }
  expect(questionIds.size).toBe(50);
});
