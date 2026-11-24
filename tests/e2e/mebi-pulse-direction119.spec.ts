import { expect, test } from "@playwright/test";
import { pulseDirectionExample, pulseDirectionTitle } from "../../src/learning/mebiPulseDirection";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const selector = `figure[data-section-figure="${pulseDirectionTitle}"]`;

test("tepe ve çukur yönleri çevrimdışı çalışır ve öğrenme puanı vermez", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 375, height: 860 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "yay-dalgalari", search: "Yay dalgaları" });
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await toc.getByRole("button", { name: pulseDirectionTitle, exact: true }).press("Enter");
  const figure = page.locator(selector);
  const drawing = figure.getByRole("img");
  await expect(drawing).toHaveAccessibleName(/P ilerleme tarafını, K arka tarafı gösteriyor/);
  await expect(figure).toContainText("P yukarı · K aşağı");
  const initial = await drawing.innerHTML();
  await figure.getByRole("button", { name: "Çukur sola", exact: true }).press("Enter");
  await expect(figure).toContainText("P aşağı · K yukarı");
  expect(await drawing.innerHTML()).not.toBe(initial);
  expect((await page.evaluate(svgLayoutAudit, { scope: selector, figuresOnly: true, explore: true })).issues).toEqual([]);
  await drawing.screenshot({ path: info.outputPath("mebi-pulse-direction119.png") });
  await figure.getByRole("button", { name: "Tepe sola", exact: true }).press("Enter");
  await expect(figure).toContainText("P yukarı · K aşağı");
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı sola giden çukur örneğini ve iki düşey hareketi açar", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 860 });
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-128");
  const section = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: pulseDirectionTitle, exact: true }) });
  await expect(section.getByRole("row", { name: "Çukur sola aşağı yukarı", exact: true })).toBeVisible();
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: pulseDirectionExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(selector).getByRole("img")).toBeVisible();
  await expect(solution).toContainText("Öndeki P aşağı, arkadaki K yukarı hareket eder.");
});
