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

import { lessons } from "../src/domain/content";
import { hintFigureFor } from "../src/learning/sectionFigures/hintFigure";

describe("question hint figures", () => {
  const all = lessons.flatMap((l) =>
    l.questions.map((q) => ({
      id: q.id,
      prompt: q.prompt.tr,
      passage: q.passage?.tr,
      options: q.options.map((o) => o.tr),
      answer: q.answer,
      explanation: q.explanation.tr,
      hint: q.hint?.tr,
      guidance: q.guidance,
    })),
  );
  const pick = (re: RegExp) => all.find((q) => re.test(q.prompt));

  it("only points to figures that exist", () => {
    let shown = 0;
    for (const q of all) {
      const m = hintFigureFor(q);
      if (!m) continue;
      shown++;
      expect(sectionFigures[m.guideId], q.id).toBeDefined();
    }
    expect(shown).toBeGreaterThan(50);
  });

  // Each case was a real mismatch during review; none may come back.
  it.each([
    [/Çukur aynada f=10 cm, u=5 cm/, "Tümsek"],
    [/tam iç yansımanın temel koşulları/, "Geçiş ve yansıma"],
    [/orta noktası M\(2; −1\), bir ucu A\(−4; 5\)/, "Eksenlere göre yansıma"],
    [/sekizgen olan bir dik prizmanın toplam ayrıt/, "Diklik, yükseklik"],
    [/P\(−2; 5\)'in y=x doğrusuna göre/, "Eksenler hangi koordinatı"],
  ])("does not show the wrong section for %s", (re, wrong) => {
    const q = pick(re);
    expect(q, String(re)).toBeDefined();
    const m = hintFigureFor(q!);
    expect(m?.title ?? "").not.toContain(wrong);
  });

  it.each([
    [/Dışbükey bir sekizgende aynı yönde seçilmiş yedi dış açı/, "Dış açıda aynı dönüş yönünü koru"],
    [/Kenar uzunluğu 4 cm olan düzgün altıgenin alanı/, "Düzgün altıgeni"],
  ])("shows the matching section for %s", (re, title) => {
    const m = hintFigureFor(pick(re)!);
    expect(m?.title ?? "").toContain(title);
  });
});

import { questionTactics, tacticsFor } from "../src/learning/questionTactics";

describe("question-type tactics", () => {
  const all = lessons.flatMap((l) => l.questions.map((q) => ({ id: q.id, prompt: q.prompt.tr, passage: q.passage?.tr })));
  it("every tactic fires on at least one real question", () => {
    const fired = new Set(all.flatMap((q) => tacticsFor(q).map((t) => t.id)));
    for (const t of questionTactics) expect(fired, t.id).toContain(t.id);
  });
  it("shows at most two tactics and only inside the tactic's topics", () => {
    for (const q of all) expect(tacticsFor(q).length).toBeLessThanOrEqual(2);
    const angle = all.find((q) => /A=48° ve B=67°dir/.test(q.prompt))!;
    expect(tacticsFor(angle).map((t) => t.id)).toContain("aci-hesabi");
  });
});
