import { expect, test } from "@playwright/test";
import { circularWaveExample, circularWaveTitle } from "../../src/learning/mebiCircularWave";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const selector = `figure[data-section-figure="${circularWaveTitle}"]`;

test("dairesel halkalar dışarı ilerler ve kaynak çevrimdışı aynı yerde kalır", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const prior = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "su-dalgalari", search: "Su dalgaları" });
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const section = toc.getByRole("button", { name: circularWaveTitle, exact: true });
  if (!(await section.isVisible())) await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await section.press("Enter");
  const figure = page.locator(selector);
  const image = figure.getByRole("img");
  await expect(image).toHaveAccessibleName(/dışarı doğru hız okları/);
  await expect(figure).toContainText("Tepeler merkeze 1,5 cm ve 3,5 cm uzak. Araları 2 cm.");
  const slider = figure.getByRole("slider", { name: "Geçen süre", exact: true });
  await slider.press("End");
  await expect(figure).toContainText("Tepeler merkeze 4,5 cm ve 6,5 cm uzak. Araları 2 cm.");
  await expect(figure).toContainText("Aradaki çukur O’dan 5,5 cm uzakta.");
  expect((await page.evaluate(svgLayoutAudit, { scope: selector, figuresOnly: true, explore: true })).issues).toEqual([]);
  const unobstructed = await image.evaluate((svg) => {
    svg.scrollIntoView({ block: "center", behavior: "instant" });
    const { left, width, top, bottom } = svg.getBoundingClientRect();
    return svg.contains(document.elementFromPoint(left + width / 2, top + 6))
      && svg.contains(document.elementFromPoint(left + width / 2, bottom - 6));
  });
  expect(unobstructed).toBe(true);
  await page.screenshot({ path: info.outputPath("mebi-circular-wave130.png") });
  expect(learning(await storage(page))).toEqual(prior);
});

test("Kopya Kağıdı yarıçap farkını ve dik ilerleme yönünü aynı çizimle kullanır", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-129");
  const section = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: circularWaveTitle, exact: true }) });
  await expect(section.getByRole("row", { name: "Bir tepe → sonraki tepe 2 cm", exact: true })).toBeVisible();
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: circularWaveExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(selector)).toHaveCount(2);
  await expect(solution).toContainText("Dalga boyu 2 cm. Çukur O’dan 2,5 cm uzakta.");
});
