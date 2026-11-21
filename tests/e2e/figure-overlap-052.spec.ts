import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { sectionFigureGuideIds } from "../../src/learning/sectionFigures/figureGuideIds";
import { issueLine, openGuideDrawings, svgLayoutAudit } from "./helpers/svgAudit";

test.use({ locale: "tr-TR", timezoneId: "Europe/Istanbul" });

/*
 * Layout gate for section figures (Forge052). Every figure on every guide
 * that has figures is audited in screen pixels at 320, 375 and 1280 px, in
 * its default state and through its controls (each slider at min, quarter,
 * middle, three quarters and max; each step and pick button). The clearance
 * standard lives in helpers/svgAudit.ts and is shared with the lab gate:
 * 2 px between labels, no stroke through a plain label's glyph core (text
 * box less 4 % per side horizontally and 15 % top/bottom), 4 px from the
 * drawing's edge, no label over a marker dot. The page never scrolls
 * sideways. The guides are split into groups so each test stays short.
 */
type Issue = { name: string; kind: string; s: string; px: number; state: string };
const GUIDES = [...sectionFigureGuideIds];
const GROUPS = 2;

for (const width of [320, 375, 1280])
  for (let group = 0; group < GROUPS; group++)
    test(`052 figure labels keep clear at ${width}px (grup ${group + 1}/${GROUPS})`, async ({ page }) => {
      test.setTimeout(480_000);
      await page.setViewportSize({ width, height: 900 });
      const issues: string[] = [];
      for (const guide of GUIDES.filter((_, i) => i % GROUPS === group)) {
        await openGuideDrawings(page, guide);
        await expect(page.locator("figure.section-figure svg").first()).toBeVisible();
        const r = (await page.evaluate(svgLayoutAudit, { figuresOnly: true, explore: true })) as {
          issues: Issue[];
        };
        for (const i of r.issues) issues.push(issueLine(guide, i));
        if (!(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)))
          issues.push(`${guide} · yatay kaydırma`);
      }
      expect(issues, issues.join("\n")).toEqual([]);
    });

test("052 crowded figures pass axe at 320px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  for (const guide of ["kuresel-aynalar", "ortacag-dunya", "ses-bilgisi"]) {
    await openGuideDrawings(page, guide);
    await expect(page.locator("figure.section-figure svg").first()).toBeVisible();
    const axe = await new AxeBuilder({ page }).include("figure.section-figure").analyze();
    expect(axe.violations, guide).toEqual([]);
  }
});

const THEMES = ["dark", "light", "contrast", "matrix", "axolotl", "trans"] as const;
for (const width of [320, 375, 1280]) {
  test(`052 figures and labs stay readable in all six themes at ${width}px`, async ({ page }) => {
    test.setTimeout(240_000);
    await page.setViewportSize({ width, height: 900 });
    for (const guide of ["kuresel-aynalar", "ortacag-dunya", "hucre-organelleri"]) {
      await openGuideDrawings(page, guide);
      await expect(page.locator("main svg").first()).toBeVisible();
      for (const theme of THEMES) {
        // The theme attribute alone drives colours; layout must not change.
        await page.evaluate((t) => document.documentElement.setAttribute("data-theme", t), theme);
        const r = (await page.evaluate(svgLayoutAudit, {})) as { issues: Issue[] };
        expect(r.issues.map((i) => issueLine(guide, i)), `${guide} · ${theme}`).toEqual([]);
        expect(
          await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth),
          `${guide} · ${theme} yatay kaydırma`,
        ).toBe(true);
        // A guide page may show its section figures on later pages only.
        if (await page.locator("figure.section-figure").count()) {
          const axe = await new AxeBuilder({ page }).include("figure.section-figure").analyze();
          expect(axe.violations.map((v) => `${v.id}: ${v.nodes.length}`), `${guide} · ${theme}`).toEqual([]);
        }
      }
    }
  });
}
