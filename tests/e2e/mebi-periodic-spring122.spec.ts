import { expect, test } from "@playwright/test";
import { periodicSpringExample, periodicSpringTitle } from "../../src/learning/mebiPeriodicSpring";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const selector = `figure[data-section-figure="${periodicSpringTitle}"]`;
const course = {
  lesson: "yay-dalgalari",
  search: "Yay dalgaları",
  title: "Yay dalgaları: atmayı üret, yansımayı çöz",
};

test("çevrimdışı iki yay çiziminde ilerleme yönü ve dalga boyu okunur", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, course);
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await toc.getByRole("button", { name: periodicSpringTitle, exact: true }).press("Enter");
  const figure = page.locator(selector);
  const graph = figure.getByRole("img");
  await expect(graph).toHaveAccessibleName(/sol kaynaktan sağa ilerleyen enine.*sağ kaynaktan sola ilerleyen boyuna/i);
  await expect(figure).toContainText("İlk etki kaynaktan 6 m uzakta.");
  await expect(figure).toContainText("Komşu tepeler arası 3 m.");
  expect((await page.evaluate(svgLayoutAudit, { scope: selector, figuresOnly: true, explore: true })).issues).toEqual([]);
  await graph.screenshot({ path: info.outputPath("mebi-periodic-spring122.png") });
  const drawing = await graph.innerHTML();
  await figure.getByRole("slider", { name: "Geçen süre" }).press("Home");
  await expect(figure).toContainText("İlk etki kaynaktan 0 m uzakta.");
  await expect(figure).toContainText("iki tepenin oluşmasına kadar süreyi artır");
  expect(await graph.innerHTML()).not.toBe(drawing);
  await figure.getByRole("slider", { name: "Geçen süre" }).press("End");
  await expect(figure).toContainText("İlk etki kaynaktan 9 m uzakta.");
  await expect(graph.getByText("λ = 3 m", { exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("heading", { name: course.title, exact: true })).toBeVisible();
  await expect(figure).toContainText("İlk etki kaynaktan 6 m uzakta.");
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı karşılaştırma tablosu ve dalga boyu çözümünü açar", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-128");
  const section = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: periodicSpringTitle, exact: true }) });
  await expect(section.getByRole("row", { name: "Enine Düşey Sağa", exact: true })).toBeVisible();
  await expect(section.getByRole("row", { name: "Boyuna Yatay Sola", exact: true })).toBeVisible();
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: periodicSpringExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(selector).getByRole("img")).toBeVisible();
  await expect(solution).toContainText("Ardışık iki tepenin arası 3 m.");
});
