import { describe, it, expect, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
const mocked = vi.hoisted(() => ({
  values: {} as Record<string, Record<string, string | number | boolean>>,
}));
vi.mock("../src/learning/useExploration", () => ({
  useExploration: (
    id: string,
    defaults: Record<string, string | number | boolean>,
  ) => [{ ...defaults, ...mocked.values[id] }, () => {}],
}));
import Lab from "../src/learning/Forge019GeographyLab";
import {
  forge019GeographyLessons as lessons,
  forge019GeographyGuides as guides,
  forge019GeographyTopics as topics,
  region019,
  regionCells019,
  transport019,
  waterways019,
  environment019,
  disaster019,
  disasterActions019,
} from "../src/learning/forge019Geography";
describe("Forge019 Coğrafya kaynak kapsamı ve dört farklı model", () => {
  it("covers exactly four ordered headings with deep positive teaching", () => {
    expect(Object.values(topics)).toEqual([
      "detail-70",
      "detail-71",
      "detail-72",
      "detail-73",
    ]);
    expect(guides.reduce((n, g) => n + g.sections.length, 0)).toBe(70);
    for (const g of guides) {
      expect(g.sections.length).toBeGreaterThanOrEqual(10);
      for (const s of g.sections) {
        expect(s.paragraphs).toHaveLength(2);
        expect(s.paragraphs.every((p) => p.length >= 170)).toBe(true);
      }
      expect(g.examples).toHaveLength(4);
      expect(g.recall).toHaveLength(4);
      for (const e of g.examples) {
        expect(e.steps).toHaveLength(3);
        expect(e.prompt.length).toBeGreaterThan(65);
        expect(e.steps.every((x) => x.explanation.length > 25)).toBe(true);
      }
    }
  });
  it("provides forty original complete five-choice cards with unique identities", () => {
    const ids = new Set<string>();
    for (const l of lessons) {
      expect(l.subjectId).toBe("tyt-cografya");
      expect(l.source.tr).toContain("özgün");
      expect(l.questions).toHaveLength(10);
      for (const q of l.questions) {
        expect(ids.has(q.id)).toBe(false);
        ids.add(q.id);
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(5);
        expect(q.hint.tr.length).toBeGreaterThan(20);
        expect(q.explanation.tr.length).toBeGreaterThan(75);
        expect(q.prompt.tr).not.toMatch(/yukarıdaki|görseldeki|önceki sayfa/iu);
      }
    }
    expect(ids.size).toBe(40);
  });
  it("keeps regional membership separate from the center assignment", () => {
    const a = region019("rain", 600, "A", false, 2),
      b = region019("rain", 600, "A", true, 2);
    expect(a.formal).toEqual([4, 5, 6, 7, 8, 9]);
    expect(a.service).toEqual([1, 2, 3, 5, 6, 9]);
    expect(a.overlap).toEqual([5, 6, 9]);
    expect(b.service).toEqual([1, 2, 5, 6, 9]);
    expect(b.formal).toEqual(a.formal);
    expect(a.target.clinic).toBe("A");
    expect(b.target.clinic).toBe("B");
    expect(a.cells.map((c) => c.rain)).toEqual(b.cells.map((c) => c.rain));
    expect(regionCells019[2].clinic).toBe("A");
  });
  it("uses closed thresholds and never adds a formal member by raising a rain threshold", () => {
    for (let t = 200; t <= 1150; t += 50) {
      const a = region019("rain", t, "A", false, 0),
        b = region019("rain", t + 50, "A", false, 0);
      expect(b.formal.every((x) => a.formal.includes(x))).toBe(true);
    }
    expect(region019("rain", 1000, "A", false, 7).formal).toEqual([8]);
    expect(region019("rain", 1200, "A", false, 0).formal).toEqual([]);
    expect(region019("wheat", 1200, "A", false, 0).formal).toEqual([
      2, 3, 4, 7, 8, 11,
    ]);
    expect(region019("flat", 200, "B", true, 0).formal).toEqual([
      1, 2, 5, 6, 9, 10,
    ]);
  });
  it("adds wait to motion and compares a floating-point equality before ordering", () => {
    expect(transport019("suez", 20, 18, true)).toMatchObject({
      around: 50,
      shortcut: 53,
      best: "Dolaşma rotası",
      thresholdWait: 15,
    });
    expect(transport019("suez", 30, 10, true).best).toBe("Süreler eşit");
    for (let speed = 10; speed <= 100; speed++) {
      const equal = transport019("panama", speed, 300 / speed, true);
      expect(equal.best).toBe("Süreler eşit");
      expect(transport019("panama", speed, 0, true).best).toBe("Kanal rotası");
    }
    expect(transport019("kiel", 20, 0, false)).toMatchObject({
      shortcut: null,
      savedDistance: 0,
      best: "Dolaşma rotası",
    });
  });
  it("retains real sea-chain teaching while fictional route lengths stay explicit", () => {
    expect(Object.keys(waterways019)).toHaveLength(12);
    expect(transport019("hormuz", 20, 5, true).seas).toEqual([
      "Basra Körfezi",
      "Umman Körfezi",
    ]);
    expect(transport019("turkish", 20, 5, true).seas).toEqual([
      "Karadeniz",
      "Marmara",
      "Ege–Akdeniz",
    ]);
    for (const key of Object.keys(waterways019))
      expect(transport019(key, 20, 5, true).limit).toContain(
        "gerçek su yolunun mesafesi değildir",
      );
  });
  it("conserves mass through prevention followed by capture of the remaining input", () => {
    const a = environment019(1000, 1000, 20, 40);
    expect(a).toMatchObject({
      avoided: 200,
      entered: 800,
      retained: 320,
      emitted: 480,
      before: 0.8,
      after: 0.48,
      balance: 1000,
    });
    for (const load of [0, 50, 1000, 1800, 5000])
      for (const prevent of [0, 10, 25, 90, 100])
        for (const capture of [0, 10, 40, 75, 100]) {
          const m = environment019(load, 2500, prevent, capture);
          expect(m.avoided + m.retained + m.emitted).toBeCloseTo(load);
          expect(m.emitted).toBeGreaterThanOrEqual(0);
          expect(m.retained).toBeLessThanOrEqual(m.entered);
          expect(m.after * 2500).toBeCloseTo(m.emitted);
        }
  });
  it("changes concentration without silently destroying mass under dilution", () => {
    const a = environment019(1000, 1000, 20, 40),
      b = environment019(1000, 2000, 20, 40);
    expect(a.emitted).toBe(b.emitted);
    expect(a.retained).toBe(b.retained);
    expect(b.after).toBe(a.after / 2);
    expect(environment019(2000, 1000, 25, 60)).toMatchObject({
      avoided: 500,
      retained: 900,
      emitted: 600,
    });
  });
  it("counts equal water height as exposure and changes actual home sites without changing terrain", () => {
    const a = disaster019(6, false, false, "drill"),
      b = disaster019(6, true, false, "drill");
    expect(a.exposed).toBe(6);
    expect(b.exposed).toBe(3);
    expect(a.sites).toEqual(b.sites);
    expect(b.homes.slice(0, 3).map((h) => h.site)).toEqual([10, 11, 12]);
    expect(b.homes.slice(0, 3).map((h) => h.height)).toEqual([12, 13, 14]);
    for (const water of [0, 0.5, 1, 5, 6, 9.5, 10]) {
      const x = disaster019(water, false, false, "rescue"),
        y = disaster019(water, false, true, "rescue");
      expect(x.exposed).toBe(Math.floor(water));
      expect(y.exposed).toBe(x.exposed);
      expect(x.vulnerability).not.toBe(y.vulnerability);
    }
  });
  it("distinguishes time-and-purpose phases without claiming all phases are disjoint", () => {
    expect(disaster019(5, false, false, "strengthen").phase).toBe(
      "Zarar azaltma",
    );
    expect(disaster019(5, false, false, "drill").phase).toBe("Hazırlık");
    expect(disaster019(5, false, false, "shelter").phase).toBe("Müdahale");
    expect(disaster019(5, false, false, "rebuild").phase).toBe("İyileştirme");
    expect(Object.keys(disasterActions019)).toHaveLength(6);
  });
  it("rejects prototype keys, out-of-range numbers and nonboolean interventions", () => {
    const cases = [
      () => region019("__proto__", 600, "A", false, 0),
      () => region019("rain", 600, "C", false, 0),
      () => region019("rain", 600, "A", false, 0.5),
      () => region019("rain", 600, "A", "no" as never, 0),
      () => region019("rain", NaN, "A", false, 0),
      () => transport019("constructor", 20, 5, true),
      () => transport019("suez", 0, 5, true),
      () => transport019("suez", 20, -1, true),
      () => transport019("suez", 20, 5, 1 as never),
      () => environment019(Infinity, 1000, 20, 40),
      () => environment019(1000, 0, 20, 40),
      () => environment019(1000, 1000, 101, 40),
      () => environment019(1000, 1000, 20, -1),
      () => disaster019(11, false, false, "drill"),
      () => disaster019(6, "yes" as never, false, "drill"),
      () => disaster019(6, false, false, "toString"),
    ];
    for (const f of cases) expect(f).toThrow(RangeError);
  });
  it("renders actual complete default HTML and readable scalable diagrams without score or upload actions", () => {
    mocked.values = {};
    const out = process.env.FORGE019_PRIVATE_SSR_DIR;
    if (out) mkdirSync(out, { recursive: true });
    for (const l of lessons) {
      const html = renderToStaticMarkup(createElement(Lab, { lessonId: l.id }));
      expect(html).toContain(`data-forge019="${l.id}"`);
      expect(html.match(/data-model-result/g)).toHaveLength(1);
      expect(html).toContain('viewBox="0 0 300');
      expect(html).toContain('role="img"');
      expect(html).toContain("<desc");
      expect(html).toContain("Tahmini dene");
      expect(html).not.toContain('type="file"');
      expect(html).not.toContain("XP kazandın");
      if (out) writeFileSync(join(out, `${l.id}.html`), html);
    }
  });
  it("renders the moved houses at the exact new terrain coordinates and tolerates unknown stored menu values", () => {
    mocked.values = {
      "forge019-geo-disaster": { moved: true, action: "constructor" },
      "forge019-geo-region": { criterion: "__proto__" },
      "forge019-geo-transport": { waterway: "unknown" },
    };
    const h = renderToStaticMarkup(
      createElement(Lab, { lessonId: "afetler-risk" }),
    );
    expect(h).toContain(
      'data-home="1" data-site="11" data-height="12" data-ground-y="132"',
    );
    expect(h).toContain(
      'data-home="2" data-site="12" data-height="13" data-ground-y="118"',
    );
    expect(h).toContain("3 / 10 ev maruz");
    expect(() =>
      renderToStaticMarkup(createElement(Lab, { lessonId: "bolge-turleri" })),
    ).not.toThrow();
    expect(() =>
      renderToStaticMarkup(createElement(Lab, { lessonId: "ulasim-aglari" })),
    ).not.toThrow();
    mocked.values = {};
    expect(
      renderToStaticMarkup(createElement(Lab, { lessonId: "constructor" })),
    ).toBe("");
  });
});
