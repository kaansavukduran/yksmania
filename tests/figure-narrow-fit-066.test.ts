import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  EDGE_PX,
  FLOOR_PX,
  TARGET_PX,
  narrowFit,
  sameFit,
  unionRect,
} from "../src/learning/sectionFigures/narrowFit";
import { SectionFigureView, txt, seg, v } from "../src/learning/sectionFigures/figureKit";

// Forge066: dar ekranda figür yazısı. Kırpma yazıyı hedef boyuta getirir,
// daha fazla yakınlaştırmaz; geniş çizimde yalnız eşik altındaki yazı tabana
// çıkar; masaüstünde viewBox aynı kalır.
const screenPx = (units: number, px: number, w: number) => (units * px) / w;

describe("narrowFit", () => {
  it("masaüstü genişliğinde hiçbir şeyi değiştirmez", () => {
    expect(narrowFit({ px: 700, bbox: { x: 40, y: 20, width: 560, height: 300 }, minFont: 17, width: 640, height: 340 })).toBeNull();
  });

  it("320 px telefonda içerik kutusuna kırpar ve en küçük yazıyı hedefe getirir", () => {
    const fit = narrowFit({ px: 294, bbox: { x: 70, y: 30, width: 500, height: 300 }, minFont: 21, width: 640, height: 360 })!;
    expect(fit.minFs).toBeUndefined();
    // En küçük yazı hedefte; daha fazla büyütme yok.
    expect(screenPx(21, 294, fit.viewBox.width)).toBeCloseTo(TARGET_PX, 1);
    // İçerik yatayda ortalanır ve kenarda en az EDGE_PX kalır.
    const k = 294 / fit.viewBox.width;
    expect((70 - fit.viewBox.x) * k).toBeGreaterThanOrEqual(EDGE_PX - 0.1);
    expect((fit.viewBox.x + fit.viewBox.width - 570) * k).toBeGreaterThanOrEqual(EDGE_PX - 0.1);
    expect((30 - fit.viewBox.y) * k).toBeCloseTo(EDGE_PX, 0);
  });

  it("dar bir çizimi hedeften öteye yakınlaştırmaz", () => {
    const fit = narrowFit({ px: 294, bbox: { x: 250, y: 30, width: 140, height: 300 }, minFont: 21, width: 640, height: 360 })!;
    expect(screenPx(21, 294, fit.viewBox.width)).toBeCloseTo(TARGET_PX, 1);
  });

  it("tüm tuvali kaplayan çizimde yalnız eşik altı yazı tabana çıkar", () => {
    const fit = narrowFit({ px: 294, bbox: { x: 12, y: 20, width: 616, height: 300 }, minFont: 21, width: 640, height: 340 })!;
    expect(fit.minFs).toBeDefined();
    expect(screenPx(fit.minFs!, 294, fit.viewBox.width)).toBeGreaterThanOrEqual(FLOOR_PX);
    // Taban kapalıysa yalnız kırpma kalır.
    const crop = narrowFit({ px: 294, bbox: { x: 12, y: 20, width: 616, height: 300 }, minFont: 21, width: 640, height: 340, floor: false })!;
    expect(crop.minFs).toBeUndefined();
    expect(crop.viewBox.width).toBe(fit.viewBox.width);
  });

  it("geçersiz ölçümde (jsdom, gizli figür) hiçbir şey yapmaz", () => {
    expect(narrowFit({ px: 0, bbox: { x: 0, y: 0, width: 100, height: 100 }, minFont: 21, width: 640, height: 300 })).toBeNull();
    expect(narrowFit({ px: 294, bbox: { x: 0, y: 0, width: 0, height: 0 }, minFont: 21, width: 640, height: 300 })).toBeNull();
  });

  it("birleşim ve karşılaştırma", () => {
    expect(unionRect(undefined, { x: 1, y: 2, width: 3, height: 4 })).toEqual({ x: 1, y: 2, width: 3, height: 4 });
    expect(unionRect({ x: 0, y: 0, width: 10, height: 10 }, { x: 5, y: -5, width: 10, height: 5 })).toEqual({ x: 0, y: -5, width: 15, height: 15 });
    const a = { viewBox: { x: 0, y: 0, width: 500, height: 300 } };
    expect(sameFit(a, { viewBox: { x: 0.2, y: 0, width: 500.3, height: 300 } })).toBe(true);
    expect(sameFit(a, { viewBox: { x: 0, y: 0, width: 500, height: 300 }, minFs: 23 })).toBe(false);
    expect(sameFit(null, null)).toBe(true);
    expect(sameFit(a, null)).toBe(false);
  });
});

describe("figür kiti sunucu çıktısı", () => {
  it("ölçüm yokken özgün 640 birimlik viewBox ve taban yok", () => {
    const html = renderToStaticMarkup(
      createElement(SectionFigureView, {
        title: "Deneme",
        def: { caption: "c", alt: "a", draw: () => ({ els: [seg(v(0, 0), v(4, 0)), txt(v(2, 1), "AB", "n", { small: true })] }) },
      }),
    );
    expect(html).toMatch(/viewBox="0 0 640 \d+"/);
    expect(html).not.toContain("--sf-min-fs");
    expect(html).not.toContain("data-fit");
  });
});
