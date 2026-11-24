import { expect, test } from "@playwright/test";
import { lowPressureBoilingExample, lowPressureBoilingTitle, pressureMeltingTitle, waterBoilingTitle } from "../../src/learning/mebiPhasePressure";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const course = { lesson: "basinc", search: "Basınç" };
const diagram = (title: string) => `figure[data-section-figure="${title}"]`;
test.use({ viewport: { width: 320, height: 860 }, reducedMotion: "reduce" });

test("kaynama eşiği seçilen basınç ve sıcaklıktan hesaplanır", async ({ page, context }, info) => {
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, course);
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği" });
  await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await toc.getByRole("button", { name: waterBoilingTitle, exact: true }).press("Enter");
  const figure = page.locator(diagram(waterBoilingTitle));
  const next = figure.getByRole("button", { name: "İleri", exact: true });
  const slider = figure.getByRole("slider", { name: /Suyun sıcaklığı/ });
  await expect(figure).toContainText("Kaynama eşiğine ulaşıldı.");
  await expect(figure).toContainText("Doymuş buhar basıncı: 70,18 kPa.");
  await next.press("Enter");
  await expect(figure).toContainText("Kaynama eşiğinin altında.");
  await expect(figure).toContainText("Su yüzeyindeki basınç: 101,42 kPa.");
  await next.press("Enter");
  await expect(figure).toContainText("Su yüzeyindeki basınç: 198,67 kPa.");
  await slider.press("End");
  await expect(figure).toContainText("Doymuş buhar basıncı: 198,67 kPa.");
  await expect(figure).toContainText("Kaynama eşiğine ulaşıldı.");
  const pot = figure.getByRole("img");
  await expect(pot).toHaveAccessibleName(/su.*basınç oku/i);
  await pot.evaluate((element) => element.scrollIntoView({ block: "center" }));
  await pot.screenshot({ path: info.outputPath("phase090-boiling.png") });
  expect((await page.evaluate(svgLayoutAudit, { scope: diagram(waterBoilingTitle), figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("erime grafiği iki maddede ters eğilim gösterir", async ({ page, context }, info) => {
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, course);
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği" });
  await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await toc.getByRole("button", { name: pressureMeltingTitle, exact: true }).press("Enter");
  const figure = page.locator(diagram(pressureMeltingTitle));
  await expect(figure).toContainText("Buz erirken hacim küçülür. Basınç arttıkça erime sıcaklığı düşer.");
  await figure.getByRole("slider", { name: /Basınç düzeyi/ }).press("End");
  await figure.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(figure).toContainText("Bakır erirken hacim büyür. Basınç arttıkça erime sıcaklığı yükselir.");
  const plot = figure.getByRole("img");
  await expect(plot).toHaveAccessibleName(/Yatay eksen basınç, düşey eksen erime sıcaklığı/);
  await plot.evaluate((element) => element.scrollIntoView({ block: "center" }));
  await plot.screenshot({ path: info.outputPath("phase090-melting.png") });
  expect((await page.evaluate(svgLayoutAudit, { scope: diagram(pressureMeltingTitle), figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("ayrı Kopya Kağıdı NIST tablosu ve iki kap çözümünü çevrimdışı gösterir", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 860 });
  await prepare(page);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-125");
  const row = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: waterBoilingTitle, exact: true }) });
  await expect(row.getByRole("columnheader")).toHaveText(["Su sıcaklığı (°C)", "Doymuş buhar basıncı (kPa)"]);
  await expect(row.locator(".guide-table-cell-value")).toHaveText(["90", "70,18", "100", "101,42", "110", "143,38", "120", "198,67"]);
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: lowPressureBoilingExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  const figure = solution.locator(diagram(lowPressureBoilingTitle));
  await expect(figure.getByRole("img")).toBeVisible();
  await expect(figure).toContainText("A kabı eşikte: 70,18 = 70,18 kPa.");
  await expect(figure).toContainText("B kabı eşik altında: 70,18 < 101,42 kPa.");
  expect(learning(await storage(page))).toEqual(before);
});
