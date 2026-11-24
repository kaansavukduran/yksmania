import { expect, test } from "@playwright/test";
import {
  compressedBalloonExample,
  compressedBalloonTitle,
  elasticBalloonTitle,
  gasMembraneTitle,
  heatedMembraneExample,
  heatedMembraneTitle,
} from "../../src/learning/mebiElasticGas";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const course = { lesson: "basinc", search: "Basınç" };
const fig = (title: string) => `figure[data-section-figure="${title}"]`;

test.use({ viewport: { width: 320, height: 860 }, reducedMotion: "reduce" });

test("esnek zar aynı basıncı ve toplam hacmi koruyarak klavyeyle yer değiştirir", async ({ page, context }, info) => {
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, course);
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği" });
  await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await toc.getByRole("button", { name: gasMembraneTitle, exact: true }).press("Enter");
  const figure = page.locator(fig(gasMembraneTitle));
  const slider = figure.getByRole("slider", { name: /X gazının sıcaklığı/ });
  const svg = figure.getByRole("img");
  await expect(svg).toHaveAccessibleName(/X gazı solda ve Y gazı sağda/);
  await expect(figure).toContainText("X: 6 L · Y: 4 L · Toplam: 10 L.");
  await expect(figure).toContainText("İki gazın son basıncı: 125 kPa.");
  await slider.press("Home");
  await expect(figure).toContainText("X: 5 L · Y: 5 L · Toplam: 10 L.");
  await expect(figure).toContainText("İki gazın son basıncı: 100 kPa.");
  await slider.press("End");
  await expect(figure).toContainText("X: 6,67 L · Y: 3,33 L · Toplam: 10 L.");
  await expect(figure).toContainText("İki gazın son basıncı: 150 kPa.");
  await svg.evaluate((element) => element.scrollIntoView({ block: "center" }));
  await svg.screenshot({ path: info.outputPath("elastic089-membrane.png") });
  expect((await page.evaluate(svgLayoutAudit, { scope: fig(gasMembraneTitle), figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("balonun sıcaklık, gaz miktarı ve dış basınç deneyleri ayrı sonuç verir", async ({ page, context }, info) => {
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, course);
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği" });
  await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await toc.getByRole("button", { name: elasticBalloonTitle, exact: true }).press("Enter");
  const figure = page.locator(fig(elasticBalloonTitle));
  const next = figure.getByRole("button", { name: "İleri", exact: true });
  await expect(figure).toContainText("İç ve dış basınç: 100 → 100 kPa.");
  await expect(figure).toContainText("Balonun hacmi: 3 → 4,5 L.");
  await next.press("Enter");
  await expect(figure).toContainText("Gaz ekle");
  await expect(figure).toContainText("İç ve dış basınç: 100 → 100 kPa.");
  await expect(figure).toContainText("Balonun hacmi: 3 → 4,5 L.");
  await next.press("Enter");
  await expect(figure).toContainText("İç ve dış basınç: 100 → 150 kPa.");
  await expect(figure).toContainText("Balonun hacmi: 3 → 2 L.");
  const svg = figure.getByRole("img");
  await expect(svg).toHaveAccessibleName(/İlk ve son dengedeki balonların kesitleri/);
  await svg.evaluate((element) => element.scrollIntoView({ block: "center" }));
  await svg.screenshot({ path: info.outputPath("elastic089-balloon.png") });
  expect((await page.evaluate(svgLayoutAudit, { scope: fig(elasticBalloonTitle), figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("ayrı Kopya Kağıdı ve iki doğru çözüm çizimi çevrimdışı açılır", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 860 });
  await prepare(page);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-125");
  const row = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: elasticBalloonTitle, exact: true }) });
  await expect(row.getByRole("columnheader")).toHaveText(["Değişiklik", "Son basınç", "Son hacim"]);
  await expect(row.locator(".guide-table-cell-value")).toHaveText([
    "Gazı ısıt", "Aynı", "Büyür", "Gaz ekle", "Aynı", "Büyür", "Dış basıncı artır", "Büyür", "Küçülür",
  ]);
  for (const [title, imageTitle, answer] of [
    [heatedMembraneExample.title, heatedMembraneTitle, "X: 6 L · Y: 4 L · Toplam: 10 L."],
    [compressedBalloonExample.title, compressedBalloonTitle, "Balonun hacmi: 3 → 2 L."],
  ]) {
    const example = page.locator(".cheat-examples .worked-example").filter({ hasText: title });
    await example.locator(":scope > summary").press("Enter");
    const solution = example.locator(".cheat-solution");
    await expect(solution.getByRole("img")).toHaveCount(0);
    await solution.locator("summary").press("Enter");
    const figure = solution.locator(fig(imageTitle));
    await expect(figure.getByRole("img")).toBeVisible();
    await expect(figure).toContainText(answer);
  }
  expect(learning(await storage(page))).toEqual(before);
});
