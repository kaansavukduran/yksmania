import { expect, test } from "@playwright/test";
import { cylinderPotentialTitle } from "../../src/learning/cylinderPotentialEnergy";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test.use({ viewport: { width: 320, height: 850 }, reducedMotion: "reduce" });

test("silindir merkezi ve yerçekimi enerjisi seçili sıfırla çevrimdışı hesaplanır", async ({ page, context }) => {
  test.setTimeout(60_000);
  await prepare(page, true);
  const initial = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "enerji-ve-hareket", search: "Enerji ve hareket" });
  await page.getByText("İçindekiler", { exact: true }).click();
  await page.getByRole("button", { name: cylinderPotentialTitle, exact: true }).press("Enter");
  const figure = page.locator(`figure[data-section-figure="${cylinderPotentialTitle}"]`);
  const height = figure.getByRole("slider", { name: /Silindir yüksekliği/ });
  const next = figure.getByRole("button", { name: "İleri", exact: true });
  await expect(figure).toContainText("U = 4 × 10 × 1 = 40 J.");
  await height.press("Home");
  await expect(figure).toContainText("U = 4 × 10 × 0,25 = 10 J.");
  await next.press("Enter");
  await expect(figure).toContainText("U = 4 × 10 × 1,25 = 50 J.");
  await next.press("Enter");
  await expect(figure).toContainText("U = 4 × 10 × 0,25 = 10 J.");
  await expect(figure).toContainText("Aynı sıfır düzeyiyle yerde -30 J, platformda 10 J. Artış 40 J.");
  const layout = await page.evaluate(svgLayoutAudit, {
    scope: `figure[data-section-figure="${cylinderPotentialTitle}"]`, figuresOnly: true, explore: true,
  });
  expect(layout.issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(initial);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});

test("ayrı enerji Kopya Kağıdı iki sıfırı ve çözümlü örneğin çizimini korur", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 850 });
  await prepare(page);
  await context.setOffline(true);
  const initial = learning(await storage(page));
  await page.goto("/#/cheatsheets?topic=detail-118");
  const section = page.locator(".cheat-section").filter({
    has: page.getByRole("heading", { name: cylinderPotentialTitle, exact: true }),
  });
  const table = section.getByRole("table");
  await expect(table.getByRole("rowheader")).toHaveText(["Yer", "Platform"]);
  await expect(table.getByRole("cell")).toHaveText(["40", "80", "40", "0", "40", "40"]);
  await expect(section.getByRole("img")).toBeVisible();
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: "Yüksekliğin tamamı mı, yarısı mı?" });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.getByRole("img")).toBeVisible();
  await expect(solution).toContainText("potansiyel enerji artışı 40 J");
  expect(learning(await storage(page))).toEqual(initial);
});
