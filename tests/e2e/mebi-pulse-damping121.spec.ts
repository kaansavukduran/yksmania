import { expect, test } from "@playwright/test";
import { pulseDampingExample, pulseDampingTitle } from "../../src/learning/mebiPulseDamping";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const selector = `figure[data-section-figure="${pulseDampingTitle}"]`;
const course = {
  lesson: "yay-dalgalari",
  search: "Yay dalgaları",
  title: "Yay dalgaları: atmayı üret, yansımayı çöz",
};

test("çevrimdışı derste genişlik ve iki genlik aynı anda okunur", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 880 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, course);
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await toc.getByRole("button", { name: pulseDampingTitle, exact: true }).press("Enter");
  const figure = page.locator(selector);
  const graph = figure.getByRole("img");
  await expect(graph).toHaveAccessibleName(/İki paralel yay kesiti/);
  const start = await graph.innerHTML();
  await figure.getByRole("slider", { name: "Geçen süre" }).press("End");
  await expect(figure).toContainText("İdeal yay: genlik 4 cm.");
  await expect(figure).toContainText("Sönümlü örnek: genlik 2,25 cm.");
  await expect(figure).toContainText("Her iki çizimde genişlik 3 m.");
  expect(await graph.innerHTML()).not.toBe(start);
  expect((await page.evaluate(svgLayoutAudit, { scope: selector, figuresOnly: true, explore: true })).issues).toEqual([]);
  await graph.screenshot({ path: info.outputPath("mebi-pulse-damping121.png") });
  await page.reload();
  await expect(page.getByRole("heading", { name: course.title, exact: true })).toBeVisible();
  await expect(graph).toBeVisible();
  await expect(figure).toContainText("Sönümlü örnek: genlik 3 cm.");
  expect(learning(await storage(page))).toEqual(before);
});

test("ayrı Kopya Kağıdı sönümlü genliği kendi çözüm adımında gösterir", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-128");
  const section = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: pulseDampingTitle, exact: true }) });
  await expect(section.getByRole("row", { name: "2 s 3 m 4 cm 2,25 cm", exact: true })).toBeVisible();
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: pulseDampingExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(selector).getByRole("img")).toBeVisible();
  await expect(solution).toContainText("İdeal atmanın genliği 4 cm, sönümlü örneğin genliği 2,25 cm.");
});
