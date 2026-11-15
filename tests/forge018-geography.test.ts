import { describe, it, expect, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import Forge018GeographyLab from "../src/learning/Forge018GeographyLab";
vi.mock("../src/learning/useExploration", () => ({
  useExploration: (
    _id: string,
    defaults: Record<string, string | number | boolean>,
  ) => [defaults, () => {}],
}));
import {
  forge018GeographyLessons as lessons,
  forge018GeographyGuides as guides,
  forge018GeographyTopics as topics,
  worldPlaces018,
  worldDistribution018,
  pyramidProfiles018,
  pyramid018,
  turkeyContexts018,
  turkeyPopulation018,
  migrationStories018,
  migration018,
  economicChains018,
  economy018,
} from "../src/learning/forge018Geography";
describe("Forge018 Coğrafya: kaynak kapsamı ve saf modeller", () => {
  it("covers the exact five ordered headings with deep positive teaching and worked steps", () => {
    expect(Object.values(topics)).toEqual([
      "detail-65",
      "detail-66",
      "detail-67",
      "detail-68",
      "detail-69",
    ]);
    expect(lessons).toHaveLength(5);
    expect(guides.reduce((n, g) => n + g.sections.length, 0)).toBe(63);
    for (const g of guides) {
      expect(g.sections.length).toBeGreaterThanOrEqual(10);
      for (const s of g.sections) {
        expect(s.paragraphs).toHaveLength(2);
        expect(s.paragraphs.every((p) => p.length >= 170)).toBe(true);
      }
      expect(g.examples).toHaveLength(4);
      for (const e of g.examples) {
        expect(e.steps).toHaveLength(3);
        expect(e.prompt.length).toBeGreaterThan(65);
        expect(e.steps.every((s) => s.explanation.length > 25)).toBe(true);
      }
      expect(g.recall).toHaveLength(4);
    }
  });
  it("provides fifty original five-choice self-contained cards with distinct identifiers", () => {
    const ids = new Set<string>();
    for (const l of lessons) {
      expect(l.subjectId).toBe("tyt-cografya");
      expect(l.source.tr).toContain("özgün");
      expect(l.questions).toHaveLength(10);
      for (const q of l.questions) {
        expect(ids.has(q.id)).toBe(false);
        ids.add(q.id);
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((v) => v.tr)).size).toBe(5);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(5);
        expect(q.hint.tr.length).toBeGreaterThan(20);
        expect(q.explanation.tr.length).toBeGreaterThan(75);
        expect(q.prompt.tr).not.toMatch(/yukarıdaki|görseldeki|önceki sayfa/i);
      }
    }
    expect(ids.size).toBe(50);
  });
  it("keeps total and area fixed while local densities change", () => {
    for (const place of Object.keys(worldPlaces018))
      for (const total of [1800, 10000, 20000])
        for (const area of [100, 400]) {
          const a = worldDistribution018(place, false, total, area),
            b = worldDistribution018(place, true, total, area);
          expect(a.counts.reduce((x, y) => x + y, 0)).toBe(total);
          expect(b.counts.reduce((x, y) => x + y, 0)).toBe(total);
          expect(a.density).toBe(b.density);
          expect(a.localDensities.every((v) => v === a.density)).toBe(true);
          expect(b.localDensities[0]).toBeCloseTo(2.8 * a.density);
          expect(
            b.localDensities
              .slice(1)
              .every((v) => Math.abs(v - 0.4 * a.density) < 1e-9),
          ).toBe(true);
        }
  });
  it("makes geographic examples conditional without inventing real population measurements", () => {
    const a = worldDistribution018("sahara", true, 10000, 100),
      b = worldDistribution018("arctic", true, 10000, 100);
    expect(a.localDensities).toEqual(b.localDensities);
    expect(a.proof).toContain("Su azlığı");
    expect(b.proof).toContain("soğuk");
    expect(a.limit).toContain("sayımı değildir");
  });
  it("allocates integer counts to all32 age-sex cells without losing the population", () => {
    for (const p of Object.keys(pyramidProfiles018))
      for (const n of [10000, 99999, 100000, 10000000]) {
        const m = pyramid018(p, n, false);
        expect(m.male).toHaveLength(16);
        expect(m.female).toHaveLength(16);
        expect(
          [...m.male, ...m.female].every((v) => Number.isInteger(v) && v >= 0),
        ).toBe(true);
        expect([...m.male, ...m.female].reduce((a, b) => a + b, 0)).toBe(n);
        expect(m.young + m.working + m.old).toBe(n);
        expect(m.shares.reduce((a, b) => a + b, 0)).toBeCloseTo(100);
        expect(m.dependency).toBeCloseTo(((m.young + m.old) / m.working) * 100);
      }
  });
  it("changes only the explicitly selected male cohort when departure occurs", () => {
    for (const p of Object.keys(pyramidProfiles018)) {
      const a = pyramid018(p, 100000, false),
        b = pyramid018(p, 100000, true);
      expect(b.removed).toBe(1000);
      expect(b.total).toBe(99000);
      expect(b.female).toEqual(a.female);
      a.male.forEach((v, i) =>
        expect(b.male[i]).toBe(v - (i === 4 ? 1000 : 0)),
      );
      expect(b.young).toBe(a.young);
      expect(b.old).toBe(a.old);
      expect(b.working).toBe(a.working - 1000);
      expect(b.shares[0]).toBeGreaterThan(a.shares[0]);
    }
  });
  it("keeps residents and densities unchanged when an administrative urban label changes", () => {
    for (const k of Object.keys(turkeyContexts018)) {
      const a = turkeyPopulation018(k, false, 0),
        b = turkeyPopulation018(k, true, 200000);
      expect(a.resident).toBe(1000000);
      expect(b.resident).toBe(a.resident);
      expect(a.urbanShare).toBe(40);
      expect(b.urbanShare).toBe(90);
      expect(a.units.map((u) => u.density)).toEqual([400, 100, 100, 25]);
      expect(b.units.map((u) => u.density)).toEqual(
        a.units.map((u) => u.density),
      );
      expect(b.present).toBe(1200000);
      expect(b.visitors).toBe(200000);
      expect(b.limit).toContain("otomatik eklenmez");
    }
  });
  it("conserves country population under either direction of internal migration", () => {
    for (const k of Object.keys(migrationStories018))
      for (const internal of [0, 2000, 5000]) {
        const a = migration018(k, internal, 1000, 500, false),
          b = migration018(k, internal, 1000, 500, true);
        expect(a.country).toBe(50800);
        expect(b.country).toBe(a.country);
        expect(a.x - b.x).toBeCloseTo(-2 * internal);
        expect(a.y - b.y).toBe(2 * internal);
        expect(a.world).toBe(100300);
        expect(b.world).toBe(100300);
        expect(a.net).toBe(500);
        expect(a.change).toBe(800);
      }
  });
  it("uses external net migration and explicit natural change with the correct signs", () => {
    for (const incoming of [0, 500, 5000])
      for (const outgoing of [0, 1500, 5000]) {
        const m = migration018("flood", 2000, incoming, outgoing, true);
        expect(m.x).toBe(32100 - outgoing);
        expect(m.y).toBe(18200 + incoming);
        expect(m.z).toBe(50000 + outgoing - incoming);
        expect(m.country).toBe(50300 + incoming - outgoing);
        expect(m.world).toBe(100300);
        expect(m.duration).toBe("Verilmedi");
        expect(m.scope).toBe("İç göç");
      }
  });
  it("aggregates the last three activity groups without double counting people", () => {
    for (const chain of Object.keys(economicChains018))
      for (let stage = 0; stage < 5; stage++)
        for (const machine of [false, true]) {
          const a = economy018(chain, stage, true, machine),
            b = economy018(chain, stage, false, machine);
          expect(a.total).toBe(machine ? 650 : 700);
          expect(b.total).toBe(a.total);
          expect(a.groups.reduce((x, y) => x + y, 0)).toBe(a.total);
          expect(b.groups).toEqual([machine ? 50 : 100, 200, 400]);
          expect(b.sector).toBe(Math.min(stage + 1, 3));
          expect(a.sector).toBe(stage + 1);
          expect(a.valueShare).toBeCloseTo((a.value[stage] / 1600) * 100);
          expect(a.shares.reduce((x, y) => x + y, 0)).toBeCloseTo(100);
        }
  });
  it("changes labour shares while the stipulated value remains fixed under the machine scenario", () => {
    const a = economy018("cotton", 0, true, false),
      b = economy018("cotton", 0, true, true);
    expect(a.value).toEqual(b.value);
    expect(a.totalValue).toBe(1600);
    expect(b.valueShare).toBe(6.25);
    expect(a.employment).toBeCloseTo((100 / 700) * 100);
    expect(b.employment).toBeCloseTo((50 / 650) * 100);
    expect(b).not.toHaveProperty("wage");
    expect(b).not.toHaveProperty("unemployed");
  });
  it("makes the precise counts, year and legend explicit before asking which map value is unknown", () => {
    const q = lessons[0].questions[6];
    expect(q.prompt.tr).toContain("kesin toplam nüfusu");
    expect(q.prompt.tr).toContain("haritanın yılı");
    expect(q.options[q.answer].tr).toBe("İllerin aritmetik nüfus yoğunluğu");
  });
  it("renders all five actual default diagrams and complete HTML descriptions without a file-upload or scored action", () => {
    const out = process.env.FORGE018_PRIVATE_SSR_DIR;
    if (out) mkdirSync(out, { recursive: true });
    for (const lesson of lessons) {
      const html = renderToStaticMarkup(
        createElement(Forge018GeographyLab, { lessonId: lesson.id }),
      );
      expect(html).toContain(`data-forge018="${lesson.id}"`);
      expect(html.match(/data-model-result/g)).toHaveLength(1);
      expect(html).toContain('role="img"');
      expect(html).toContain("<desc");
      expect(html).toContain("Tahmini dene");
      expect(html).not.toContain('type="file"');
      expect(html).not.toContain("XP kazandın");
      if (out) writeFileSync(join(out, `${lesson.id}.html`), html);
    }
  });
  it("rejects invalid counting states, unknown options and nonboolean interventions", () => {
    for (const f of [
      () => worldDistribution018("missing", false, 1000, 100),
      () => worldDistribution018("asia", false, 99, 100),
      () => worldDistribution018("asia", false, 1000, 0),
      () => worldDistribution018("asia", "no" as never, 1000, 100),
      () => pyramid018("bad", 100000, false),
      () => pyramid018("hive", 10000.5, false),
      () => pyramid018("hive", NaN, false),
      () => pyramid018("hive", 100000, "yes" as never),
      () => turkeyPopulation018("bad", false, 0),
      () => turkeyPopulation018("marmara", false, -1),
      () => turkeyPopulation018("marmara", false, 1.5),
      () => migration018("bad", 0, 0, 0, false),
      () => migration018("work", Infinity, 0, 0, false),
      () => migration018("work", 1.5, 0, 0, false),
      () => migration018("work", 0, 0, 0, 0 as never),
      () => economy018("bad", 0, true, false),
      () => economy018("milk", 5, true, false),
      () => economy018("milk", 0.5, true, false),
      () => economy018("milk", 0, 0 as never, false),
    ])
      expect(f).toThrow(RangeError);
  });
});
