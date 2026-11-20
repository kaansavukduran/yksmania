import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { sectionFigureGuideIds } from "../../src/learning/sectionFigures/figureGuideIds";

test.use({ locale: "tr-TR", timezoneId: "Europe/Istanbul" });

/*
 * Faz 0 layout gate for section figures. Every figure on every guide that has
 * figures is read in its default state: no label may overlap another label, no
 * plain label may be crossed by a drawn line through its glyph core (crossed
 * labels must sit on a plate or pill), and nothing may leave the SVG. The page
 * itself must not scroll sideways.
 */
const GUIDES = [...sectionFigureGuideIds];

type Issue = { figure: string; kind: string; text: string };

async function auditFigures(page: Page): Promise<Issue[]> {
  return page.evaluate(() => {
    const out: { figure: string; kind: string; text: string }[] = [];
    type P = [number, number];
    const segsOf = (el: SVGGeometryElement): [P, P][] => {
      const tag = el.tagName.toLowerCase();
      if (tag === "line") {
        const g = (n: string) => Number(el.getAttribute(n));
        return [[[g("x1"), g("y1")], [g("x2"), g("y2")]]];
      }
      if (tag === "polyline" || tag === "polygon") {
        const raw = (el.getAttribute("points") ?? "").trim().split(/[\s,]+/).map(Number);
        const q: P[] = [];
        for (let i = 0; i + 1 < raw.length; i += 2) q.push([raw[i], raw[i + 1]]);
        if (tag === "polygon" && q.length > 2) q.push(q[0]);
        return q.slice(1).map((b, i) => [q[i], b] as [P, P]);
      }
      const L = el.getTotalLength();
      if (!L) return [];
      const n = Math.min(80, Math.max(4, Math.ceil(L / 8)));
      const res: [P, P][] = [];
      let prev = el.getPointAtLength(0);
      for (let i = 1; i <= n; i++) {
        const c = el.getPointAtLength((L * i) / n);
        res.push([[prev.x, prev.y], [c.x, c.y]]);
        prev = c;
      }
      return res;
    };
    // Liang–Barsky: does the segment touch the rectangle?
    const hits = (a: P, b: P, r: { x0: number; y0: number; x1: number; y1: number }) => {
      let t0 = 0;
      let t1 = 1;
      const dx = b[0] - a[0];
      const dy = b[1] - a[1];
      const p = [-dx, dx, -dy, dy];
      const q = [a[0] - r.x0, r.x1 - a[0], a[1] - r.y0, r.y1 - a[1]];
      for (let i = 0; i < 4; i++) {
        if (p[i] === 0) {
          if (q[i] < 0) return false;
        } else {
          const t = q[i] / p[i];
          if (p[i] < 0) {
            if (t > t1) return false;
            if (t > t0) t0 = t;
          } else {
            if (t < t0) return false;
            if (t < t1) t1 = t;
          }
        }
      }
      return true;
    };
    for (const f of document.querySelectorAll("figure.section-figure")) {
      const figure = f.getAttribute("data-section-figure") ?? "?";
      const svg = f.querySelector("svg");
      if (!svg) continue;
      const vb = svg.viewBox.baseVal;
      const texts = [...svg.querySelectorAll("text")]
        .filter((t) => t.textContent?.trim() && !t.classList.contains("sf-ball-label"))
        .map((t) => {
          const bb = t.getBBox();
          return { t, s: t.textContent!.trim(), r: { x0: bb.x, y0: bb.y, x1: bb.x + bb.width, y1: bb.y + bb.height } };
        })
        .filter((o) => o.r.x1 > o.r.x0);
      texts.forEach((a, i) => {
        const r = a.r;
        if (r.x0 < vb.x - 1 || r.y0 < vb.y - 1 || r.x1 > vb.x + vb.width + 1 || r.y1 > vb.y + vb.height + 1)
          out.push({ figure, kind: "taşma", text: a.s });
        for (const c of texts.slice(i + 1)) {
          const ox = Math.min(r.x1, c.r.x1) - Math.max(r.x0, c.r.x0);
          const oy = Math.min(r.y1, c.r.y1) - Math.max(r.y0, c.r.y0);
          if (ox > 2 && oy > 4) out.push({ figure, kind: "yazı-yazı", text: `${a.s} × ${c.s}` });
        }
      });
      const segs = [...svg.querySelectorAll<SVGGeometryElement>("line,polyline,polygon,path")]
        .filter((el) => {
          if (el.closest("defs") || el.classList.contains("sf-pick-pill")) return false;
          const cs = getComputedStyle(el);
          if (cs.visibility === "hidden" || cs.display === "none") return false;
          return el.tagName.toLowerCase() === "line" || (cs.stroke !== "none" && Number.parseFloat(cs.strokeWidth) > 0);
        })
        .flatMap(segsOf);
      for (const tx of texts) {
        if (tx.t.closest(".sf-plate-group, .sf-pick-group")) continue;
        const w = tx.r.x1 - tx.r.x0;
        const h = tx.r.y1 - tx.r.y0;
        const core = { x0: tx.r.x0 + w * 0.12, x1: tx.r.x1 - w * 0.12, y0: tx.r.y0 + h * 0.3, y1: tx.r.y1 - h * 0.3 };
        if (segs.some(([a, b]) => hits(a, b, core))) out.push({ figure, kind: "yazı-çizgi", text: tx.s });
      }
    }
    return out;
  });
}

for (const width of [320, 1280]) {
  test(`052 figure labels never overlap at ${width}px`, async ({ page }) => {
    test.setTimeout(600_000);
    await page.setViewportSize({ width, height: 900 });
    const issues: (Issue & { guide: string })[] = [];
    for (const guide of GUIDES) {
      await page.goto(`/#/lesson?id=${guide}`);
      await expect(page.locator("figure.section-figure svg").first()).toBeVisible();
      // Labels are measured after fonts load; wait for them.
      await page.evaluate(() => document.fonts.ready.then(() => undefined));
      for (const issue of await auditFigures(page)) issues.push({ guide, ...issue });
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth),
        `${guide} yatay kaydırma`,
      ).toBe(true);
    }
    expect(issues).toEqual([]);
  });
}

test("052 crowded figures pass axe at 320px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  for (const guide of ["kuresel-aynalar", "ortacag-dunya", "ses-bilgisi"]) {
    await page.goto(`/#/lesson?id=${guide}`);
    await expect(page.locator("figure.section-figure svg").first()).toBeVisible();
    const axe = await new AxeBuilder({ page }).include("figure.section-figure").analyze();
    expect(axe.violations, guide).toEqual([]);
  }
});

const THEMES = ["dark", "light", "contrast", "matrix", "axolotl", "trans"] as const;
for (const width of [320, 1280]) {
  test(`052 figures and a lab stay readable in all six themes at ${width}px`, async ({ page }) => {
    test.setTimeout(240_000);
    await page.setViewportSize({ width, height: 900 });
    for (const guide of ["kuresel-aynalar", "ortacag-dunya", "hucre-organelleri"]) {
      await page.goto(`/#/lesson?id=${guide}`);
      await expect(page.locator("figure.section-figure svg").first()).toBeVisible();
      for (const theme of THEMES) {
        // The theme attribute alone drives colours; layout must not change.
        await page.evaluate((t) => document.documentElement.setAttribute("data-theme", t), theme);
        expect(await auditFigures(page), `${guide} · ${theme}`).toEqual([]);
        expect(
          await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth),
          `${guide} · ${theme} yatay kaydırma`,
        ).toBe(true);
        const axe = await new AxeBuilder({ page }).include("figure.section-figure").analyze();
        expect(axe.violations.map((v) => `${v.id}: ${v.nodes.length}`), `${guide} · ${theme}`).toEqual([]);
      }
    }
  });
}
