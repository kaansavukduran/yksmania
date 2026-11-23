import { expect, test } from "@playwright/test";
import { lampEfficiencyTitle } from "../../src/learning/lampEfficiency061";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test.use({ viewport: { width: 320, height: 850 }, reducedMotion: "reduce" });

test("aynı 6 W ışık için elektrik girişini ve diğer çıkışı çevrimdışı karşılaştırır", async ({ page, context }) => {
  test.setTimeout(80_000);
  await prepare(page, true);
  const initial = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "enerji-ve-hareket", search: "Enerji ve hareket" });
  await page.getByText("İçindekiler", { exact: true }).click();
  await page.getByRole("button", { name: lampEfficiencyTitle, exact: true }).press("Enter");

  const scope = `figure[data-section-figure="${lampEfficiencyTitle}"]`;
  const figure = page.locator(scope);
  await expect(figure).toContainText("60 W giriş = 6 W ışık + 54 W diğer çıkış");
  await expect(figure).toContainText("24 W giriş = 6 W ışık + 18 W diğer çıkış");
  const control = figure.getByRole("slider", { name: /LED örnek verimi/ });
  await control.press("End");
  await expect(figure).toContainText("12 W giriş = 6 W ışık + 6 W diğer çıkış");
  await control.press("Home");
  await expect(figure).toContainText("40 W giriş = 6 W ışık + 34 W diğer çıkış");

  const layout = await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true });
  expect(layout.issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(initial);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});

test("ayrı Kopya Kağıdı 6 W sabit çıkışı ve iki lambalı çözümlü örneği taşır", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 850 });
  await prepare(page);
  const initial = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-118");
  const section = page.locator(".cheat-section").filter({
    has: page.getByRole("heading", { name: lampEfficiencyTitle, exact: true }),
  });
  await expect(section.getByRole("rowheader")).toHaveText(["Flamanlı", "LED"]);
  await expect(section.getByRole("cell")).toHaveText(["60 W", "54 W", "%10", "24 W", "18 W", "%25"]);
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: "Aynı görünür ışık, daha az elektrik girişi" });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.getByRole("img")).toBeVisible();
  await expect(solution).toContainText("24 W elektrik girişi ve 18 W diğer enerji çıkışı.");
  expect(learning(await storage(page))).toEqual(initial);
});
