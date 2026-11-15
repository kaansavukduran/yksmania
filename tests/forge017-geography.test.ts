import { describe, it, expect } from "vitest";
import {
  forge017GeographyLessons as lessons,
  forge017GeographyGuides as guides,
  forge017GeographyTopics as topics,
  basins017,
  turkeyWater017,
  soilLayers017,
  soilProfiles017,
  worldSoil017,
  turkeySoils017,
  turkeySoil017,
  worldPlants017,
  worldPlant017,
  turkeyPlants017,
  turkeyPlant017,
  settlementPatterns017,
  worldSettlement017,
  turkeySettlements017,
  turkeySettlement017,
  populationProfiles017,
  population017,
} from "../src/learning/forge017Geography";
describe("Forge 017 Geography: source-bounded teaching and pure models", () => {
  it("covers the exact eight ordered detailed topics with deep guides", () => {
    expect(Object.values(topics)).toEqual([
      "detail-57",
      "detail-58",
      "detail-59",
      "detail-60",
      "detail-61",
      "detail-62",
      "detail-63",
      "detail-64",
    ]);
    expect(lessons).toHaveLength(8);
    for (const g of guides) {
      expect(g.sections.length).toBeGreaterThanOrEqual(10);
      for (const s of g.sections) {
        expect(s.paragraphs).toHaveLength(2);
        expect(s.paragraphs.every((p) => p.length >= 170)).toBe(true);
      }
      expect(g.examples).toHaveLength(4);
      for (const e of g.examples) {
        expect(e.prompt.length).toBeGreaterThan(65);
        expect(e.steps).toHaveLength(3);
        expect(e.answer.length).toBeGreaterThan(15);
      }
      expect(g.recall).toHaveLength(4);
    }
  });
  it("provides 80 original self-contained five-choice questions, not official claims", () => {
    const ids = new Set<string>();
    for (const l of lessons) {
      expect(l.subjectId).toBe("tyt-cografya");
      expect(l.questions).toHaveLength(10);
      expect(l.source.tr).toMatch(/özgün/);
      for (const q of l.questions) {
        expect(ids.has(q.id)).toBe(false);
        ids.add(q.id);
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((x) => x.tr)).size).toBe(5);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(5);
        expect(q.prompt.tr.trim()).not.toBe("");
        expect(q.hint.tr.length).toBeGreaterThan(20);
        expect(q.explanation.tr.length).toBeGreaterThan(75);
        expect(q.prompt.tr).not.toMatch(
          /yukarıdaki|aşağıdaki şekle|görseldeki|önceki sayfa/i,
        );
      }
    }
    expect(ids.size).toBe(80);
  });
  it("separates cross-border routes from the final open or closed receiver", () => {
    expect(turkeyWater017("aras", false)).toMatchObject({
      closed: true,
      cross: true,
      end: "Hazar",
    });
    expect(turkeyWater017("coruh", false)).toMatchObject({
      closed: false,
      cross: true,
      end: "Karadeniz",
    });
    expect(turkeyWater017("kizil", false)).toMatchObject({
      closed: false,
      cross: false,
    });
    expect(turkeyWater017("meric", false).route).toMatch(/Sınır ötesinden/);
    for (const k of Object.keys(basins017)) {
      const a = turkeyWater017(k, false),
        b = turkeyWater017(k, true);
      expect(a.season.reduce((x, y) => x + y, 0)).toBe(100);
      expect(b.season).toEqual([25, 25, 25, 25]);
      expect(a.range).toBe(30);
      expect(b.range).toBe(0);
    }
  });
  it("shows optional E and bounded new-deposit profiles rather than mandatory universal horizons", () => {
    for (const p of Object.keys(soilProfiles017))
      for (const l of Object.keys(soilLayers017))
        for (const t of [false, true]) {
          const m = worldSoil017(p, l, t);
          expect(m.present).toBe(m.layers.includes(l));
          expect(m.layers.at(-1)).toBe("R");
          if (t) expect(m.layers).toEqual(["A", "C", "R"]);
        }
    expect(worldSoil017("podzol", "E", false).present).toBe(true);
    expect(worldSoil017("laterit", "E", false).present).toBe(false);
  });
  it("keeps soil identity separate from salt and water risks without a yield formula", () => {
    for (const k of Object.keys(turkeySoils017))
      for (const saline of [false, true])
        for (const drained of [false, true]) {
          const m = turkeySoil017(k, saline, drained);
          expect(m.saltRisk).toBe(saline);
          expect(m.waterRisk).toBe(!drained);
          expect(m.family).toBe(turkeySoil017(k, !saline, !drained).family);
          expect(m).not.toHaveProperty("yield");
        }
    expect(turkeySoil017("alluvium", true, false).verdict).toBe(
      "Tuz ve su sorunu",
    );
  });
  it("compares equal 600 mm totals with different monthly minima without predicting climate from latitude", () => {
    for (const k of Object.keys(worldPlants017)) {
      const a = worldPlant017(k, false),
        b = worldPlant017(k, true);
      expect(a.monthly).toHaveLength(12);
      expect(a.total).toBe(600);
      expect(b.total).toBe(600);
      expect(a.minimum).toBe(50);
      expect(b.minimum).toBe(20);
      expect(a.name).toBe(b.name);
      expect(b.limit).toMatch(/tek başına/);
    }
  });
  it("labels the original altitude stops honestly and keeps disturbance from inventing a successor species", () => {
    for (const k of Object.keys(turkeyPlants017))
      for (const h of [0, 600, 1200, 1800, 2200, 3000]) {
        const a = turkeyPlant017(k, h, false),
          b = turkeyPlant017(k, h, true);
        expect(a.elevation).toBe(h);
        expect(b.cover).toBe("Örtü kaybı senaryosu");
        expect(b.limit).toMatch(/gerçek her dağın bitki sınırı değildir/);
      }
    expect(turkeyPlant017("black", 1800, false).band).toBe("Orta yamaç örneği");
  });
  it("keeps all eight dwellings while geometry and use duration change independently", () => {
    for (const k of Object.keys(settlementPatterns017)) {
      const a = worldSettlement017(k, 6),
        b = worldSettlement017(k, 12);
      expect(a.points).toHaveLength(8);
      expect(new Set(a.points.map((x) => x.join(","))).size).toBe(8);
      expect(a.houses).toBe(8);
      expect(a.points).toEqual(b.points);
      expect(a.duration).toMatch(/mevsimlik/);
      expect(b.duration).toMatch(/Sürekli/);
    }
    expect(
      worldSettlement017("line", 12).points.every(
        ([x, y], i, a) => i === 0 || (y > a[i - 1][1] && x > a[i - 1][0]),
      ),
    ).toBe(true);
  });
  it("shows city multifunctionality and an explicitly separate five-month yayla example", () => {
    for (const k of Object.keys(turkeySettlements017)) {
      const a = turkeySettlement017(k, false),
        b = turkeySettlement017(k, true);
      expect(a.functions).toHaveLength(3);
      expect(a.functions).toEqual(b.functions);
      expect(a.occupied.filter(Boolean)).toHaveLength(12);
      expect(b.occupied).toEqual([
        false,
        false,
        false,
        false,
        true,
        true,
        true,
        true,
        true,
        false,
        false,
        false,
      ]);
      expect(b.limit).toMatch(/ayrı yerleşme/);
    }
  });
  it("keeps pyramid percentages in the total-population denominator and ages separate from employment", () => {
    for (const k of Object.keys(populationProfiles017)) {
      const a = population017(k, 100000, 1000, 1200, 800, 300, 900),
        b = population017(k, 200000, 2000, 1200, 800, 300, 900);
      expect([...a.male, ...a.female].reduce((x, y) => x + y, 0)).toBe(100);
      expect(a.young + a.working + a.old).toBe(100);
      expect(a.density).toBe(100);
      expect(b.density).toBe(100);
      expect(a.young * 1000 * 2).toBe((b.young * b.total) / 100);
      expect(a.limit).toMatch(/gerçek çalışan sayısı değildir/);
    }
    const m = population017("balanced", 100000, 1000, 1200, 800, 300, 900);
    expect(m.dependency).toBe(56.25);
  });
  it("computes natural change, migration, final count and per-thousand rate independently", () => {
    const m = population017("balanced", 100000, 1000, 1200, 800, 300, 900);
    expect(m.natural).toBe(400);
    expect(m.migration).toBe(-600);
    expect(m.change).toBe(-200);
    expect(m.final).toBe(99800);
    expect(m.rate).toBe(-2);
    for (const b of [0, 1000, 5000])
      for (const d of [0, 1000, 5000])
        for (const incoming of [0, 1000, 5000])
          for (const outgoing of [0, 1000, 5000]) {
            const a = population017(
              "young",
              100000,
              500,
              b,
              d,
              incoming,
              outgoing,
            );
            expect(a.change).toBe(b - d + incoming - outgoing);
            expect(a.final).toBe(100000 + b - d + incoming - outgoing);
            expect(a.density).toBe(200);
          }
  });
  it("states the missing total explicitly in the age-pyramid question before asking which count is unknown", () => {
    const question = lessons.find((l) => l.id === "nufus-onemi-ozellikleri")!
      .questions[6];
    expect(question.prompt.tr).toContain(
      "Toplam nüfus 100.000 kişi olarak verilmiştir",
    );
    expect(question.options[question.answer].tr).toBe("Okuryazar kişi sayısı");
    expect(question.explanation.tr).toContain("Eğitim düzeyi");
  });
  it("rejects unknown options and invalid physical or counting bounds", () => {
    for (const f of [
      () => turkeyWater017("bad", false),
      () => worldSoil017("bad", "A", false),
      () => worldSoil017("calc", "bad", false),
      () => turkeySoil017("bad", false, true),
      () => worldPlant017("bad", false),
      () => turkeyPlant017("black", NaN, false),
      () => turkeyPlant017("black", 3001, false),
      () => worldSettlement017("line", 1.5),
      () => worldSettlement017("line", 13),
      () => turkeySettlement017("bad", false),
      () => population017("bad", 100000, 1000, 0, 0, 0, 0),
      () => population017("young", 9999, 1000, 0, 0, 0, 0),
      () => population017("young", 100000, 0, 0, 0, 0, 0),
      () => population017("young", 100000, 1000, Infinity, 0, 0, 0),
    ])
      expect(f).toThrow(RangeError);
  });
});
