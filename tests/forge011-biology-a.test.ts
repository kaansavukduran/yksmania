import { describe, expect, it } from "vitest";
import {
  forge011BiologyAGuides,
  forge011BiologyALessons,
  forge011BiologyATopics,
  fungalNutrition,
  plantEvidence,
  prokaryoteExperiment,
  protistExperiment,
  viralExperiment,
} from "../src/learning/forge011BiologyA";

describe("viral production requires distinct gates and stages", () => {
  it("does not create assembled virions during mere attachment, entry or synthesis", () => {
    for (const stage of [0, 1, 2])
      expect(viralExperiment(stage, true, true, true).productive).toBe(false);
    expect(viralExperiment(3, true, true, true)).toMatchObject({
      reached: 3,
      productive: true,
      released: false,
    });
    expect(viralExperiment(4, true, true, true)).toMatchObject({
      productive: true,
      released: true,
    });
  });
  it("does not bypass a missing receptor, live host or intracellular compatibility by choosing the last stage", () => {
    expect(viralExperiment(4, true, false, true)).toMatchObject({
      reached: -1,
      productive: false,
      released: false,
    });
    expect(viralExperiment(4, false, true, true)).toMatchObject({
      reached: 0,
      productive: false,
    });
    expect(viralExperiment(4, true, true, false)).toMatchObject({
      reached: 1,
      productive: false,
    });
  });
  it("rejects invalid stage values instead of claiming false success", () => {
    for (const stage of [-1, 5, NaN, 1.2])
      expect(() => viralExperiment(stage, true, true, true)).toThrow(
        RangeError,
      );
  });
});
describe("prokaryotic division, transfer and survival are different outcomes", () => {
  it("counts one actual division generation", () => {
    expect(prokaryoteExperiment(4, "division")).toMatchObject({
      individuals: 8,
      active: 8,
      spores: 0,
      dnaTransfer: false,
    });
  });
  it("keeps individuals unchanged during DNA transfer and endospore survival", () => {
    expect(prokaryoteExperiment(4, "transfer")).toMatchObject({
      individuals: 4,
      active: 4,
      dnaTransfer: true,
    });
    expect(prokaryoteExperiment(4, "endospore")).toMatchObject({
      individuals: 4,
      active: 0,
      spores: 4,
    });
  });
  it("enforces the visible model count scope", () => {
    for (const n of [1, 9, 2.5, Infinity])
      expect(() => prokaryoteExperiment(n, "division")).toThrow(RangeError);
  });
});
describe("protist conditions do not invent universal features", () => {
  it("requires both a photosynthetic selected example and light", () => {
    expect(protistExperiment("euglena", true, true, true).photosynthesis).toBe(
      true,
    );
    expect(protistExperiment("euglena", false, true, true).photosynthesis).toBe(
      false,
    );
    expect(protistExperiment("amoeba", true, true, true).photosynthesis).toBe(
      false,
    );
    expect(
      protistExperiment("paramecium", true, true, true).photosynthesis,
    ).toBe(false);
  });
  it("does not promise continuous growth without light or usable organic food", () => {
    expect(
      protistExperiment("euglena", false, false, true).nutrition,
    ).toContain("sürekli büyüme çıkarılamaz");
    expect(protistExperiment("euglena", false, true, true).nutrition).toContain(
      "hazır organik",
    );
  });
  it("keeps selected freshwater regulation separate from the entire group", () => {
    expect(protistExperiment("paramecium", true, true, true).waterLoad).toBe(
      true,
    );
    expect(protistExperiment("paramecium", true, true, false).waterLoad).toBe(
      false,
    );
    expect(protistExperiment("plasmodium", true, true, true).waterLoad).toBe(
      false,
    );
    expect(() => protistExperiment("invented", true, true, true)).toThrow(
      RangeError,
    );
  });
});
describe("plant evidence retains uncertainty rather than filling missing data", () => {
  it("uses vascular and seed evidence independently", () => {
    expect(plantEvidence("yes", "unknown", "unknown").map((p) => p.id)).toEqual(
      ["fern", "pine", "apple"],
    );
    expect(plantEvidence("yes", "no", "unknown").map((p) => p.id)).toEqual([
      "fern",
    ]);
    expect(plantEvidence("yes", "yes", "no").map((p) => p.id)).toEqual([
      "pine",
    ]);
  });
  it("does not confuse unknown and absent; reports conflicting evidence honestly", () => {
    expect(plantEvidence("unknown", "unknown", "unknown")).toHaveLength(4);
    expect(plantEvidence("unknown", "unknown", "no")).toHaveLength(3);
    expect(plantEvidence("no", "yes", "yes")).toHaveLength(0);
    expect(plantEvidence("unknown", "unknown", "yes").map((p) => p.id)).toEqual(
      ["apple"],
    );
  });
});
describe("fungal extracellular digestion precedes uptake and conserves units", () => {
  it("preserves all six monomer units through every model state", () => {
    for (const enzyme of [true, false])
      for (const stage of [0, 1, 2]) {
        const r = fungalNutrition(stage, enzyme);
        expect(r.polymers * 3 + r.outsideMonomers + r.insideMonomers).toBe(6);
        expect(r.totalMonomerUnits).toBe(6);
      }
  });
  it("does not absorb intact large polymers when the extracellular enzyme is blocked", () => {
    expect(fungalNutrition(2, false)).toMatchObject({
      polymers: 2,
      outsideMonomers: 0,
      insideMonomers: 0,
    });
    expect(fungalNutrition(1, true)).toMatchObject({
      polymers: 0,
      outsideMonomers: 6,
      insideMonomers: 0,
    });
    expect(fungalNutrition(2, true)).toMatchObject({
      polymers: 0,
      outsideMonomers: 2,
      insideMonomers: 4,
    });
  });
});
it("contains fifty independently rechecked standalone original five-choice items", () => {
  const keys = [
    [
      "Hücresel olmayan",
      "Bağlanma tek başına",
      "Tam yeni virionların",
      "Bu koşulda yeni üretim",
      "peptidoglikan hücre duvarı",
      "Bağlanma → genomun",
      "Enzim taşıması",
      "Her mutasyon",
      "Lipit zarf bütün",
      "Genom kopyalanması",
    ],
    [
      "Prokaryot düzenle",
      "X bakteriyi destekler",
      "8",
      "Hücre sayısı iki",
      "Dayanıklılık durumu",
      "Prokaryotta oksijenli",
      "Bütün arkeler yalnız",
      "Kemoototrofluk",
      "20",
      "Ribozom",
    ],
    [
      "Ökaryot hücre",
      "Yalancı ayak",
      "Fazla suyu",
      "Miksotrof",
      "Kalıtsal değişim olabilir",
      "X’in Protista",
      "Ortak isim yeterli",
      "Sürekli net su",
      "Fotosentez yapması",
      "Bütün protistler",
    ],
    [
      "Eğrelti",
      "Açık tohumlu",
      "P–meyve, Q–tohum",
      "İlk üç aday",
      "Sporlu bitki döngüsünde",
      "Her bitki hücresinin",
      "Kara yosunu ile eğrelti",
      "Gaz alışverişi",
      "Tek çenekli",
      "Fotosentezde kullanılan CO₂",
    ],
    [
      "Mantarlar",
      "Dışarı enzim",
      "2",
      "Miselyum",
      "Mikoriza",
      "Birliğin fotosentezi",
      "Küçük şekerli",
      "Bakteriyel endospor",
      "Saprotrof–parazit",
      "Fermantasyon yapan her canlı",
    ],
  ];
  expect(forge011BiologyALessons).toHaveLength(5);
  const ids = new Set<string>();
  forge011BiologyALessons.forEach((lesson, i) => {
    expect(forge011BiologyATopics[lesson.id]).toBe(`detail-${14 + i}`);
    expect(lesson.questions).toHaveLength(10);
    lesson.questions.forEach((q, j) => {
      ids.add(q.id);
      expect(q.options).toHaveLength(5);
      expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
      expect(q.options[q.answer].tr).toContain(keys[i][j]);
      expect(q.explanation.tr.length).toBeGreaterThan(100);
      expect(q.hint.tr.length).toBeGreaterThan(20);
      expect(q.prompt.tr).not.toMatch(
        /aşağıdaki (şekle|metne)|yukarıdaki (şekle|metne)/i,
      );
    });
  });
  expect(ids.size).toBe(50);
});
it("teaches each unit through full explanations, worked reasoning and recall", () => {
  for (const guide of forge011BiologyAGuides) {
    expect(guide.sections).toHaveLength(8);
    expect(
      guide.sections.every(
        (s) =>
          s.paragraphs.length === 2 &&
          s.paragraphs.every((p) => p.length > 180),
      ),
    ).toBe(true);
    expect(guide.examples).toHaveLength(4);
    expect(
      guide.examples.every(
        (e) => e.steps.length >= 3 && e.strategy && e.check && e.pitfall,
      ),
    ).toBe(true);
    expect(guide.recall).toHaveLength(5);
  }
});
