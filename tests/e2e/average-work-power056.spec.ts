import { expect, test } from "@playwright/test";
import { averageWorkPowerComparisonTitle, averageWorkPowerTitle } from "../../src/learning/averageWorkPower";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test.use({ viewport: { width: 320, height: 850 }, reducedMotion: "reduce" });

test("aynı işin bir ve iki saniyelik güç değerleri çevrimdışı çizilir", async ({ page, context }) => {
  test.setTimeout(90_000);
  await prepare(page, true);
  const initial = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "enerji-ve-hareket", search: "Enerji ve hareket" });
  await page.getByText("İçindekiler", { exact: true }).click();
  await page.getByRole("button", { name: averageWorkPowerTitle, exact: true }).press("Enter");

  const scope = `figure[data-section-figure="${averageWorkPowerTitle}"]`;
  const figure = page.locator(scope);
  const next = figure.getByRole("button", { name: "İleri", exact: true });
  const seconds = figure.getByRole("slider", { name: /Geçen süre/ });
  await expect(figure).toContainText("İlk hızı 1 m/s, son hızı 5 m/s.");
  await next.press("Enter");
  await expect(figure).toContainText("çekme işi +72 j, sürtünme işi −24 j.", { ignoreCase: true });
  await next.press("Enter");
  await expect(figure).toContainText("72 / 2 = 36 W.");
  await seconds.press("Home");
  await expect(figure).toContainText("72 / 1 = 72 W.");
  await expect(figure).toContainText("48 / 1 = 48 W.");

  const layout = await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true });
  expect(layout.issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(initial);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});

test("ayrı enerji Kopya Kağıdı aynı iş ve farklı güç tablosuyla örneği açar", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 850 });
  await prepare(page);
  const initial = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-118");
  const section = page.locator(".cheat-section").filter({
    has: page.getByRole("heading", { name: averageWorkPowerTitle, exact: true }),
  });
  await expect(section.getByRole("rowheader")).toHaveText(["1 s", "2 s"]);
  await expect(section.getByRole("cell")).toHaveText(["72 J", "−24 J", "48 J", "72 W", "72 J", "−24 J", "48 J", "36 W"]);
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: "Bir ve iki saniyede aynı yolu al" });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.getByRole("img")).toHaveCount(2);
  await expect(solution).toContainText("72 W ve 36 W");
  const comparison = solution.locator(`figure[data-section-figure="${averageWorkPowerComparisonTitle}"]`);
  await expect(comparison).toContainText("72 / 2 = 36 W.");
  await comparison.getByRole("slider", { name: /Geçen süre/ }).press("Home");
  await expect(comparison).toContainText("72 / 1 = 72 W.");
  expect(learning(await storage(page))).toEqual(initial);
});
