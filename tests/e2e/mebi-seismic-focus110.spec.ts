import { expect, test } from "@playwright/test";
import { seismicFocusExample, seismicFocusTitle } from "../../src/learning/mebiSeismicFocus";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const selector = `figure[data-section-figure="${seismicFocusTitle}"]`;

test("çevrimdışı yer kesitinde istasyonu kaydırınca eğik yol ve varışlar değişir", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 375, height: 860 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "ses-deprem-dalgalari", search: "Ses ve deprem", title: "Ses ve deprem dalgaları: titreşimi ölç, kanıtı yorumla" });
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await toc.getByRole("button", { name: seismicFocusTitle, exact: true }).press("Enter");
  const figure = page.locator(selector);
  const svg = figure.getByRole("img");
  await expect(svg).toHaveAccessibleName(/iki kaya parçasını eğik fay ayırıyor/i);
  await expect(figure).toContainText("Yüzeyde 8 km. Odaktan istasyona 10 km.");
  await expect(figure).toContainText("P 1,67 s, S 3,33 s. Fark 1,67 s.");
  await svg.screenshot({ path: info.outputPath("mebi-seismic-focus110.png") });
  const distance = figure.getByRole("slider", { name: "İstasyonun dış merkeze uzaklığı" });
  await distance.press("Home");
  await expect(figure).toContainText("Yüzeyde 0 km. Odaktan istasyona 6 km.");
  await expect(figure).toContainText("P 1 s, S 2 s. Fark 1 s.");
  await distance.press("End");
  await expect(figure).toContainText("Yüzeyde 12 km. Odaktan istasyona 13,42 km.");
  expect((await page.evaluate(svgLayoutAudit, { scope: selector, figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("ayrı Kopya Kağıdı çizimi 6–8–10 hesabının yapıldığı adımda açar", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 860 });
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-130");
  const section = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: seismicFocusTitle, exact: true }) });
  await expect(section.getByRole("row", { name: "8 km 10 km 1,67 s 3,33 s", exact: true })).toBeVisible();
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: seismicFocusExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(selector).getByRole("img")).toBeVisible();
  await expect(solution).toContainText("P önce gelir. Yaklaşık varış farkı 1,67 saniye.");
});
