import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { sectionFigureGuideIds } from "../../src/learning/sectionFigures/figureGuideIds";
import { issueLine, openGuideDrawings, svgLayoutAudit } from "./helpers/svgAudit";

test.use({ locale: "tr-TR", timezoneId: "Europe/Istanbul" });
test.describe.configure({ mode: "parallel" });

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

/*
 * Forge064: the TYT Matematik source lessons (Forge062) and the TYT Geometri
 * cheat-sheet figures (Forge063) in all six themes at 320 and 1280 px. Each
 * theme keeps three distinct colour keys (axolotl and trans had collapsed
 * them into one blue), a selectable label keeps 4.5:1 on its pill, axe finds
 * nothing in the figures, and the keyboard keeps its place: a step button
 * that becomes disabled at either end hands focus to the other step button,
 * and a focused selected item still shows the focus outline.
 */
const pillContrast = () => {
  const rgb = (c: string) => {
    const s = c.match(/color\(srgb ([^)]+)\)/);
    if (s) return s[1].split(/[ /]+/).slice(0, 3).map((x) => +x * 255);
    const m = c.match(/rgba?\(([^)]+)\)/);
    return (m ? m[1] : "0,0,0").split(/[ ,/]+/).slice(0, 3).map(Number);
  };
  const lum = (c: number[]) => {
    const [r, g, b] = c.map((x) => (x / 255 <= 0.03928 ? x / 255 / 12.92 : ((x / 255 + 0.055) / 1.055) ** 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const out: string[] = [];
  for (const t of document.querySelectorAll("figure.section-figure .sf-pick-group text")) {
    const pill = t.parentElement?.querySelector(".sf-pick-pill");
    if (!pill) continue;
    const a = lum(rgb(getComputedStyle(t).fill));
    const b = lum(rgb(getComputedStyle(pill).fill));
    const k = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    if (k < 4.5) out.push(`${t.textContent} ${k.toFixed(2)}:1`);
  }
  return out;
};
for (const width of [320, 1280])
  test(`064 TYT kaynak ve kopya figürleri altı temada ${width}px`, async ({ page }) => {
    test.setTimeout(240_000);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width, height: 900 });
    for (const guide of ["tyt-mat-asal-kaynak-032", "tyt-mat-olasilik-kaynak-036", "tyt-geo-ucgen-merkezleri-031"]) {
      await openGuideDrawings(page, guide);
      await expect(page.locator("figure.section-figure svg").first()).toBeVisible();
      for (const theme of THEMES) {
        await page.evaluate((t) => document.documentElement.setAttribute("data-theme", t), theme);
        const keys = await page.evaluate(() => {
          const fig = document.querySelector("figure.section-figure")!;
          return ["--sf-a", "--sf-b", "--sf-c"].map((v) => {
            const el = document.createElement("span");
            el.style.color = `var(${v})`;
            fig.append(el);
            const c = getComputedStyle(el).color;
            el.remove();
            return c;
          });
        });
        expect(new Set(keys).size, `${guide} · ${theme} renk anahtarları ${keys.join(" ")}`).toBe(3);
        expect(await page.evaluate(pillContrast), `${guide} · ${theme} seçim etiketi`).toEqual([]);
        const r = (await page.evaluate(svgLayoutAudit, { figuresOnly: true })) as { issues: Issue[] };
        expect(r.issues.map((i) => issueLine(guide, i)), `${guide} · ${theme}`).toEqual([]);
        const axe = await new AxeBuilder({ page }).include("figure.section-figure").analyze();
        expect(axe.violations.map((v) => `${v.id}: ${v.nodes.length}`), `${guide} · ${theme} axe`).toEqual([]);
      }
      await page.evaluate(() => document.documentElement.setAttribute("data-theme", "dark"));
      // Keyboard only: walk the first stepped figure to its end and back.
      const fig = page
        .locator("figure.section-figure")
        .filter({ has: page.getByRole("button", { name: "İleri", exact: true }) })
        .first();
      const next = fig.getByRole("button", { name: "İleri", exact: true });
      const back = fig.getByRole("button", { name: "Geri", exact: true });
      await next.focus();
      while (!(await next.isDisabled())) await page.keyboard.press("Enter");
      await expect(back, `${guide} son adımda odak Geri'de`).toBeFocused();
      while (!(await back.isDisabled())) await page.keyboard.press("Enter");
      await expect(next, `${guide} ilk adımda odak İleri'de`).toBeFocused();
      const range = page.locator("figure.section-figure input[type=range]").first();
      if (await range.count()) {
        await range.focus();
        await page.keyboard.press("End");
        expect(await range.inputValue(), `${guide} kaydırıcı End`).toBe(await range.getAttribute("max"));
        await page.keyboard.press("Home");
        expect(await range.inputValue(), `${guide} kaydırıcı Home`).toBe(await range.getAttribute("min"));
      }
      const pick = page.locator("figure.section-figure .sf-pick").first();
      if (await pick.count()) {
        await pick.focus();
        await page.keyboard.press("Space");
        await expect(pick).toHaveAttribute("aria-pressed", "true");
        const ring = await pick.evaluate((e) => [e.matches(":focus-visible"), getComputedStyle(e).outlineStyle]);
        expect(ring, `${guide} seçili öğede odak halkası`).toEqual([true, "solid"]);
        // The selection itself is an inner ring, not the focus outline.
        expect(await pick.evaluate((e) => getComputedStyle(e).boxShadow), `${guide} seçim işareti`).toContain("inset");
        await page.keyboard.press("Space");
      }
    }
  });
