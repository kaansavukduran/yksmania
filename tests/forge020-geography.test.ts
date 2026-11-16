import { describe, it, expect, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { mkdirSync, writeFileSync } from "node:fs";
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
import Lab from "../src/learning/Forge020GeographyLab";
import {
  forge020GeographyLessons as lessons,
  forge020GeographyGuides as guides,
  forge020GeographyTopics as topics,
  earth020,
  seasons020,
  position020,
  positionContexts020,
  map020,
  mapZooms020,
  contourIntervals020,
} from "../src/learning/forge020Geography";
describe("Forge020 Coğrafya: gerçek kapsam ve üç farklı geometri modeli", () => {
  it("covers the three exact headings with substantial positive teaching and full worked steps", () => {
    expect(Object.values(topics)).toEqual([
      "detail-74",
      "detail-75",
      "detail-76",
    ]);
    expect(guides.reduce((n, g) => n + g.sections.length, 0)).toBe(54);
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
        expect(e.steps.every((s) => s.explanation.length > 25)).toBe(true);
      }
    }
  });
  it("makes thirty original five-option cards answerable from their own text", () => {
    const ids = new Set<string>();
    for (const l of lessons) {
      expect(l.questions).toHaveLength(10);
      expect(l.subjectId).toBe("tyt-cografya");
      expect(l.source.tr).toContain("özgün");
      for (const q of l.questions) {
        expect(ids.has(q.id)).toBe(false);
        ids.add(q.id);
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((v) => v.tr)).size).toBe(5);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(5);
        expect(q.prompt.tr).not.toMatch(/yukarıdaki|görseldeki|önceki sayfa/iu);
        expect(q.hint.tr.length).toBeGreaterThan(20);
        expect(q.explanation.tr.length).toBeGreaterThan(75);
      }
    }
    expect(ids.size).toBe(30);
  });
  it("uses signed latitude-declination difference and handles tropical noon direction", () => {
    expect(earth020(35, "december", true, 2)).toMatchObject({
      declination: -23.5,
      altitude: 31.5,
      sunDirection: "Güney",
    });
    expect(earth020(10, "june", true, 2)).toMatchObject({
      altitude: 76.5,
      sunDirection: "Kuzey",
    });
    expect(earth020(23.5, "june", true, 2)).toMatchObject({
      altitude: 90,
      shadow: 0,
      sunDirection: "Başucu",
    });
    expect(earth020(-40, "march", true, 2).altitude).toBe(50);
  });
  it("keeps both exact polar-circle solstice boundaries at physical0/24 without clamping real nearby days", () => {
    for (const latitude of [66.5, -66.5]) {
      for (const season of ["june", "december"]) {
        const expected = (latitude > 0) === (season === "june") ? 24 : 0;
        const result = earth020(latitude, season, true, 2);
        expect(result.daylight).toBe(expected);
        expect(result.night).toBe(24 - expected);
      }
    }
    expect(earth020(66.49, "december", true, 2).daylight).toBeGreaterThan(0);
    expect(earth020(66.49, "june", true, 2).daylight).toBeLessThan(24);
  });
  it("keeps polar day and night physical instead of returning negative or over24-hour duration", () => {
    expect(earth020(70, "june", true, 2).daylight).toBe(24);
    expect(earth020(70, "december", true, 2)).toMatchObject({
      daylight: 0,
      night: 24,
      altitude: -3.5,
      shadow: null,
    });
    for (let latitude = -80; latitude <= 80; latitude += 0.5)
      for (const season of Object.keys(seasons020)) {
        const m = earth020(latitude, season, true, 2);
        expect(m.daylight).toBeGreaterThanOrEqual(0);
        expect(m.daylight).toBeLessThanOrEqual(24);
        expect(m.daylight + m.night).toBeCloseTo(24);
        expect(
          m.daylight + earth020(-latitude, season, true, 2).daylight,
        ).toBeCloseTo(24);
        if (m.altitude <= 0) expect(m.shadow).toBe(null);
      }
  });
  it("removes only tilt-induced annual differences under the zero-tilt experiment", () => {
    for (const latitude of [-80, -40, 0, 10, 40, 80])
      for (const season of Object.keys(seasons020)) {
        const m = earth020(latitude, season, false, 2);
        expect(m.declination).toBe(0);
        expect(m.daylight).toBe(12);
        expect(m.altitude).toBe(90 - Math.abs(latitude));
      }
    expect(earth020(0, "june", true, 2).daylight).toBe(12);
  });
  it("scales a vertical rod shadow without changing the day length or solar angle", () => {
    const a = earth020(45, "march", true, 1),
      b = earth020(45, "march", true, 2);
    expect(a.shadow).toBeCloseTo(1);
    expect(b.shadow).toBeCloseTo(2);
    expect(a.altitude).toBe(b.altitude);
    expect(a.daylight).toBe(b.daylight);
  });
  it("distinguishes mathematical boundaries and zenith passages from climate predictions", () => {
    expect(position020(0, 0, "coast")).toMatchObject({
      zone: "Tropikal kuşak",
      zenithPasses: 2,
      antimeridian: 180,
    });
    expect(position020(23.5, 30, "coast")).toMatchObject({
      zone: "Dönence",
      zenithPasses: 1,
      antimeridian: -150,
    });
    expect(position020(-23.5, -70, "coast")).toMatchObject({
      zone: "Dönence",
      zenithPasses: 1,
      antimeridian: 110,
    });
    expect(position020(66.5, 180, "coast")).toMatchObject({
      zone: "Kutup dairesi",
      zenithPasses: 0,
      antimeridian: 0,
    });
    expect(position020(80, -180, "plateau")).toMatchObject({
      zone: "Kutup kuşağı",
      zenithPasses: 0,
      antimeridian: 0,
    });
  });
  it("keeps absolute geometry fixed when the explicitly hypothetical surrounding scene changes", () => {
    const a = position020(60, -70, "coast"),
      b = position020(60, -70, "barrier"),
      c = position020(60, -70, "plateau");
    for (const m of [b, c]) {
      expect(m.latitude).toBe(a.latitude);
      expect(m.longitude).toBe(a.longitude);
      expect(m.zone).toBe(a.zone);
      expect(m.parallelKmPerDegree).toBeCloseTo(55.5);
      expect(m.rotationSpeed).toBeCloseTo(835);
      expect(m.meridianKm).toBe(6660);
      expect(m).not.toHaveProperty("temperature");
    }
    expect(a.barrier).toBe(false);
    expect(b.barrier).toBe(true);
    expect(c.height).toBe(1800);
    expect(Object.keys(positionContexts020)).toHaveLength(3);
  });
  it("rescales paper lengths and area while ground geometry and contours stay identical", () => {
    const a = map020(100000, 1, 4, 120, 20),
      b = map020(100000, 0.5, 4, 120, 20),
      c = map020(100000, 2, 4, 120, 20);
    expect(a).toMatchObject({
      groundKm: 4,
      groundMetres: 4000,
      groundArea: 16,
      shownArea: 16,
      slopePercent: 3,
      slopePerMille: 30,
      base: 100,
      top: 220,
    });
    expect(b).toMatchObject({
      effectiveDenominator: 200000,
      shownCm: 2,
      shownArea: 4,
      groundKm: 4,
      groundArea: 16,
    });
    expect(c).toMatchObject({
      effectiveDenominator: 50000,
      shownCm: 8,
      shownArea: 64,
      groundKm: 4,
      groundArea: 16,
    });
    expect(b.contours).toEqual(a.contours);
    expect(c.contours).toEqual(a.contours);
    expect(a.contours.map((v) => v.height)).toEqual([
      100, 120, 140, 160, 180, 200, 220,
    ]);
  });
  it("places each contour at the same metric position on plan and linear profile", () => {
    for (const denominator of [25000, 100000, 500000])
      for (const zoom of mapZooms020)
        for (const rise of [20, 120, 400])
          for (const interval of contourIntervals020) {
            const m = map020(denominator, zoom, 4, rise, interval);
            for (const c of m.contours) {
              expect(c.fraction).toBeGreaterThanOrEqual(0);
              expect(c.fraction).toBeLessThanOrEqual(1);
              expect(m.base + rise * c.fraction).toBeCloseTo(c.height);
              expect(c.xMetres).toBeCloseTo(c.fraction * m.groundMetres);
            }
            expect(m.slopePerMille).toBeCloseTo(10 * m.slopePercent);
            expect(
              m.shownArea * (m.effectiveDenominator / 100000) ** 2,
            ).toBeCloseTo(m.groundArea);
            expect(m.verticalRatio).toBeCloseTo(m.groundMetres / 550);
          }
  });
  it("does not let contour interval selection physically change the slope", () => {
    const a = map020(250000, 0.5, 2.4, 120, 20),
      b = map020(250000, 0.5, 2.4, 120, 100);
    expect(a.groundKm).toBe(6);
    expect(a.shownCm).toBe(1.2);
    expect(a.groundArea).toBe(36);
    expect(a.slopePercent).toBe(2);
    expect(b.slopePercent).toBe(a.slopePercent);
    expect(a.contours.length).toBeGreaterThan(b.contours.length);
  });
  it("rejects unknown prototype keys, impossible angles, unsupported scale factors and nonfinite dimensions", () => {
    for (const f of [
      () => earth020(81, "june", true, 2),
      () => earth020(40, "__proto__", true, 2),
      () => earth020(40, "june", 1 as never, 2),
      () => earth020(40, "june", true, 0),
      () => earth020(NaN, "june", true, 2),
      () => position020(40, 181, "coast"),
      () => position020(40, 30, "constructor"),
      () => position020(Infinity, 30, "coast"),
      () => map020(0, 1, 4, 120, 20),
      () => map020(25000.5, 1, 4, 120, 20),
      () => map020(100000, 0, 4, 120, 20),
      () => map020(100000, 1, 0, 120, 20),
      () => map020(100000, 1, 4, 0, 20),
      () => map020(100000, 1, 4, 120, 30),
    ])
      expect(f).toThrow(RangeError);
  });
  it("renders the three actual default model components with two real SVGs and complete HTML each", () => {
    mocked.values = {};
    const out = process.env.FORGE020_PRIVATE_SSR_DIR;
    if (out) mkdirSync(out, { recursive: true });
    for (const lesson of lessons) {
      const h = renderToStaticMarkup(
        createElement(Lab, { lessonId: lesson.id }),
      );
      expect(h).toContain(`data-forge020="${lesson.id}"`);
      expect(h.match(/data-model-result/g)).toHaveLength(1);
      expect(h.match(/<svg/g)).toHaveLength(2);
      expect(h).toContain('viewBox="0 0 300');
      expect(h).toContain("<desc");
      expect(h).toContain("Tahmini dene");
      expect(h).not.toContain('type="file"');
      expect(h).not.toContain("XP kazandın");
      if (out) writeFileSync(join(out, `${lesson.id}.html`), h);
    }
  });
  it("uses safe stored choice fallbacks and renders polar night without a fake negative shadow", () => {
    mocked.values = {
      "forge020-geo-earth": { latitude: 70, season: "december" },
      "forge020-geo-position": { context: "constructor" },
      "forge020-geo-map": { zoom: 0, interval: 77, denominator: 125000 },
    };
    const h = renderToStaticMarkup(
      createElement(Lab, { lessonId: "dunya-sekli-hareket" }),
    );
    expect(h).toContain("Güneş ufuk altında");
    expect(h).toContain("Gündüz 0 saat");
    expect(h).toContain("Ufuk üstü Güneş yok");
    expect(() =>
      renderToStaticMarkup(createElement(Lab, { lessonId: "cografi-konum" })),
    ).not.toThrow();
    const m = renderToStaticMarkup(
      createElement(Lab, { lessonId: "harita-bilgisi" }),
    );
    expect(m).toContain("Yeni ölçek 1 : 100.000");
    mocked.values = {};
    expect(
      renderToStaticMarkup(createElement(Lab, { lessonId: "__proto__" })),
    ).toBe("");
  });
});
