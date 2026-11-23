import { expect, test } from "@playwright/test";
import { heatingCurveTitle } from "../../src/learning/heatingCurve066";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test.use({ viewport: { width: 320, height: 850 }, reducedMotion: "reduce" });

test("ısıtma eğrisinin beş aşamasını ve kütleye bağlı birikimli ısıyı çevrimdışı gösterir", async ({ page, context }) => {
  test.setTimeout(85_000);
  await prepare(page, true);
  const initial = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "hal-degisimi", search: "Hâl değişimi" });
  await page.getByText("İçindekiler", { exact: true }).click();
  await page.getByRole("button", { name: heatingCurveTitle, exact: true }).press("Enter");
  const scope = `figure[data-section-figure="${heatingCurveTitle}"]`;
  const figure = page.locator(scope);
  const next = figure.getByRole("button", { name: "İleri", exact: true });
  await expect(figure).toContainText(/Buz [−-]20 °C’den 0 °C’ye çıkar/);
  await expect(figure).toContainText("Yalnız bu aralığın ısısı 4,2 kJ.");
  await next.press("Enter");
  await expect(figure).toContainText("Buz ve su 0 °C’de birlikte bulunur.");
  await expect(figure).toContainText("Yalnız bu aralığın ısısı 33,4 kJ.");
  await figure.getByRole("slider", { name: /Su numunesinin kütlesi/ }).press("End");
  await expect(figure).toContainText("Yalnız bu aralığın ısısı 66,8 kJ.");
  await next.press("Enter");
  await next.press("Enter");
  await expect(figure).toContainText("Su ve buhar 100 °C’de birlikte bulunur.");
  await next.press("Enter");
  await expect(figure).toContainText("Buhar 100 °C’den 120 °C’ye çıkar.");
  await expect(next).toBeDisabled();

  const layout = await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true });
  expect(layout.issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(initial);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});

test("ayrı Kopya Kağıdı birikimli ısıyla erime aralığını ayırır", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 850 });
  await prepare(page);
  const initial = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-121");
  const section = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: heatingCurveTitle, exact: true }) });
  await expect(section.getByRole("rowheader")).toHaveText(["Buz ısınıyor", "Buz eriyor", "Su ısınıyor", "Su kaynıyor", "Buhar ısınıyor"]);
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: "Erime sırasında grafiğin yatay aralığı" });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.getByRole("img")).toBeVisible();
  await expect(solution).toContainText("Yalnız erimeye giden enerji 33,40 kJ.");
  expect(learning(await storage(page))).toEqual(initial);
});
