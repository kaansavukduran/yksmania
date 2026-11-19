import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { SectionFigureView } from "../src/learning/sectionFigures/figureKit";

/*
 * Selectable figure items: every drawn label marked pick: i must point at an
 * existing card, every card must be reachable from the drawing, and each card
 * must say something. The HTML buttons give keyboard access to the same cards.
 */
const all = Object.entries(sectionFigures).flatMap(([guide, defs]) => Object.entries(defs).map(([title, def]) => ({ guide, title, def })));

describe("figure picks", () => {
  it("pick indices on drawn labels match the declared cards", () => {
    for (const { guide, title, def } of all) {
      const frame = def.draw(def.param?.init ?? 0, 0, -1);
      const picks = frame.els.flatMap((el) => (el.k === "text" && el.pick !== undefined ? [el.pick] : []));
      const n = def.picks?.length ?? 0;
      for (const i of picks) expect(i, `${guide} / ${title}`).toBeLessThan(n);
      if (n) expect(new Set(picks).size, `${guide} / ${title}`).toBe(n);
    }
  });
  it("each card has a title and detail lines, and every selection draws", () => {
    const withPicks = all.filter((x) => x.def.picks?.length);
    expect(withPicks.length).toBeGreaterThan(0);
    for (const { def } of withPicks) {
      def.picks!.forEach((p, i) => {
        expect(p.title.length).toBeGreaterThan(3);
        expect(p.detail.length).toBeGreaterThan(0);
        expect(() => def.draw(def.param?.init ?? 0, 0, i)).not.toThrow();
      });
    }
  });
  it("the reform grid renders one button per event and a plain year", () => {
    const def = sectionFigures["ataturkculuk-inkilap"]["Kronolojiyi bir karşılaştırma aracı yap"];
    const html = renderToStaticMarkup(createElement(SectionFigureView, { def, title: "Kronoloji" }));
    expect((html.match(/class="secondary sf-pick/g) ?? []).length).toBe(14);
    expect(html).toContain("Tevhid-i Tedrisat");
    expect(html).toContain(">1933<");
    expect(html).not.toContain("1.933");
  });
});
