import { expect, test } from "@playwright/test";
import { bicycleEnergyTitle } from "../../src/learning/bicycleEnergy058";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test.use({ viewport: { width: 320, height: 850 }, reducedMotion: "reduce" });

test("tepenin iki eş seviyesindeki enerji farkını çevrimdışı hesaplar", async ({ page, context }) => {
  test.setTimeout(80_000);
  await prepare(page, true);
  const initial = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "enerji-ve-hareket", search: "Enerji ve hareket" });
  await page.getByText("İçindekiler", { exact: true }).click();
  await page.getByRole("button", { name: bicycleEnergyTitle, exact: true }).press("Enter");

  const scope = `figure[data-section-figure="${bicycleEnergyTitle}"]`;
  const figure = page.locator(scope);
  const next = figure.getByRole("button", { name: "İleri", exact: true });
  await expect(figure).toContainText("A noktasında K = 16 E₀.");
  await next.press("Enter");
  await expect(figure).toContainText("B ve E aynı hız büyüklüğünde.");
  await next.press("Enter");
  await expect(figure).toContainText("C noktasında K = 1 E₀.");
  await expect(figure).toContainText("Tam değer için sayısal yükseklik gerekir.");
  await next.press("Enter");
  await expect(figure).toContainText("D noktasında K = 4 E₀.");
  await next.press("Enter");
  await expect(figure).toContainText("E noktasında K = 9 E₀.");
  await expect(figure).toContainText("Mekanik enerji 7 E₀ azaldı.");

  const layout = await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true });
  expect(layout.issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(initial);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});

test("ayrı enerji Kopya Kağıdı beş kaynak noktasını ve çözümlü karşılaştırmayı gösterir", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 850 });
  await prepare(page);
  const initial = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-118");
  const section = page.locator(".cheat-section").filter({
    has: page.getByRole("heading", { name: bicycleEnergyTitle, exact: true }),
  });
  await expect(section.getByRole("rowheader")).toHaveText(["A", "B", "C", "D", "E"]);
  await expect(section.getByRole("row").filter({ has: page.getByRole("rowheader", { name: "E", exact: true }) }))
    .toContainText("9 E₀");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: "A ve E arasında mekanik enerji ne kadar azalır?" });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.getByRole("img")).toBeVisible();
  await expect(solution).toContainText("mekanik enerjisi 7E₀ azalır");
  expect(learning(await storage(page))).toEqual(initial);
});
