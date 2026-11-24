import { expect, test } from "@playwright/test";
import { overflowExample, overflowExampleTitle, overflowTitle } from "../../src/learning/mebiArchimedesOverflow";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const course = { lesson: "sivilarin-kaldirma-kuvveti", search: "Kaldırma kuvveti", title: "Sıvılarda kaldırma kuvveti: yer değiştiren hacmi izle" };
const diagram = (title: string) => `figure[data-section-figure="${title}"]`;
test.use({ viewport: { width: 320, height: 860 }, reducedMotion: "reduce" });

test("taşırma kabında üç dengede su ve kuvvetler eşleşir", async ({ page, context }, info) => {
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, course);
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği" });
  await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await toc.getByRole("button", { name: overflowTitle, exact: true }).press("Enter");
  const figure = page.locator(diagram(overflowTitle));
  await expect(figure).toContainText("Yüzer. Cisim yoğunluğu: 600 kg/m³. Taşan su: 1,2 L.");
  await expect(figure).toContainText("Kaldırma 12 N yukarı · ağırlık 12 N aşağı · destek 0 N.");
  const next = figure.getByRole("button", { name: "İleri", exact: true });
  await next.press("Enter");
  await expect(figure).toContainText("Askıda kalır. Cisim yoğunluğu: 1.000 kg/m³. Taşan su: 2 L.");
  await expect(figure).toContainText("Kaldırma 20 N yukarı · ağırlık 20 N aşağı · destek 0 N.");
  await next.press("Enter");
  await expect(figure).toContainText("Tabana iner. Cisim yoğunluğu: 1.250 kg/m³. Taşan su: 2 L.");
  await expect(figure).toContainText("Kaldırma 20 N yukarı · ağırlık 25 N aşağı · destek 5 N.");
  const svg = figure.getByRole("img");
  await expect(svg).toHaveAccessibleName(/yanında küçük ölçü kabı/);
  await svg.evaluate((element) => element.scrollIntoView({ block: "center" }));
  await svg.screenshot({ path: info.outputPath("archimedes096-overflow.png") });
  expect((await page.evaluate(svgLayoutAudit, { scope: diagram(overflowTitle), figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("ayrı Kopya Kağıdı taşan suyu ve destek hesabını çevrimdışı gösterir", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 860 });
  await prepare(page);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-126");
  const row = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: overflowTitle, exact: true }) });
  await expect(row.getByRole("columnheader")).toHaveText(["Denge", "Taşan su", "Kaldırma", "Cisim ağırlığı", "Destek"]);
  await expect(row.locator(".guide-table-cell-value")).toHaveText(["Yüzer", "1,2 L", "12 N", "12 N", "0 N", "Askıda kalır", "2 L", "20 N", "20 N", "0 N", "Tabana iner", "2 L", "20 N", "25 N", "5 N"]);
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: overflowExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  const figure = solution.locator(diagram(overflowExampleTitle));
  await expect(figure.getByRole("img")).toBeVisible();
  await expect(figure).toContainText("Kaldırma 20 N yukarı · ağırlık 25 N aşağı · destek 5 N.");
  expect(learning(await storage(page))).toEqual(before);
});
