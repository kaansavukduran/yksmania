import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { lessonGuides } from "../src/learning/guides";
import { sectionFigureGuideIds } from "../src/learning/sectionFigures/figureGuideIds";
import { sectionFigures } from "../src/learning/sectionFigures/registry";
import { SectionFigureView } from "../src/learning/sectionFigures/figureKit";

// Section figures are keyed by the exact section title. A renamed section
// must fail here instead of silently losing its drawing in the app.
describe("section figures", () => {
  it("lists exactly the guides that have figures", () => {
    expect([...sectionFigureGuideIds].sort()).toEqual(Object.keys(sectionFigures).sort());
  });

  for (const [guideId, figures] of Object.entries(sectionFigures)) {
    describe(guideId, () => {
      const guide = lessonGuides.get(guideId);
      it("belongs to an existing guide and matches section titles", () => {
        expect(guide).toBeDefined();
        const titles = new Set(guide!.sections.map((s) => s.title));
        for (const title of Object.keys(figures)) expect(titles).toContain(title);
      });

      for (const [title, def] of Object.entries(figures)) {
        it(`draws finite geometry: ${title}`, () => {
          expect(def.caption.length).toBeGreaterThan(20);
          expect(def.alt.length).toBeGreaterThan(20);
          const values = def.param
            ? [def.param.min, def.param.init, def.param.max]
            : [0];
          const steps = def.steps ? def.steps.map((_, i) => i) : [0];
          for (const value of values)
            for (const step of steps) {
              const frame = def.draw(value, step);
              expect(frame.els.length).toBeGreaterThan(0);
              const text = JSON.stringify(frame);
              expect(text).not.toMatch(/NaN|Infinity|null/);
            }
          const html = renderToStaticMarkup(createElement(SectionFigureView, { def, title }));
          expect(html).toContain('role="img"');
          expect(html).not.toMatch(/NaN|Infinity/);
        });
      }
    });
  }
});
