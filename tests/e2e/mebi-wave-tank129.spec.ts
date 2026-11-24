import { expect, test, type Locator } from "@playwright/test";
import { waveTankExample, waveTankSetupTitle, waveTankTitle } from "../../src/learning/mebiWaveTank";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const selector = `figure[data-section-figure="${waveTankTitle}"]`;

async function captureFigure(image: Locator, path: string) {
  const unobstructed = await image.evaluate((svg) => {
    svg.scrollIntoView({ block: "center", behavior: "instant" });
    const { left, width, top, bottom } = svg.getBoundingClientRect();
    return svg.contains(document.elementFromPoint(left + width / 2, top + 6))
      && svg.contains(document.elementFromPoint(left + width / 2, bottom - 6));
  });
  expect(unobstructed).toBe(true);
  await image.page().screenshot({ path });
}

test("dalga leğeninin üç görünümü aynı zamanı ve çizgi aralıklarını kullanır", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "su-dalgalari", search: "Su dalgaları" });
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const setup = toc.getByRole("button", { name: waveTankSetupTitle, exact: true });
  if (!(await setup.isVisible())) await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await setup.press("Enter");
  const apparatus = page.locator(`figure[data-section-figure="${waveTankSetupTitle}"]`);
  await expect(apparatus.getByRole("img")).toHaveAccessibleName(/leğenin altındaki kâğıt/i);
  await apparatus.locator(".sf-picks").getByRole("button", { name: "Işık", exact: true }).press("Enter");
  await expect(apparatus).toContainText("Işık su yüzeyinden geçer");
  await apparatus.getByRole("img").getByText("Kâğıt", { exact: true }).click();
  await expect(apparatus).toContainText("kâğıtta paralel şeritler");
  expect((await page.evaluate(svgLayoutAudit, { scope: `figure[data-section-figure="${waveTankSetupTitle}"]`, figuresOnly: true, explore: true })).issues).toEqual([]);
  await captureFigure(apparatus.getByRole("img"), info.outputPath("mebi-wave-tank-setup129.png"));
  const section = toc.getByRole("button", { name: waveTankTitle, exact: true });
  if (!(await section.isVisible())) await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await section.press("Enter");
  const figure = page.locator(selector);
  const image = figure.getByRole("img");
  await expect(image).toHaveAccessibleName(/üstten|leğen yüzeyinde/);
  await expect(figure).toContainText("İki aydınlık şerit 1 cm ve 5 cm konumunda. Araları 4 cm.");
  const slider = figure.getByRole("slider", { name: "Geçen süre", exact: true });
  await slider.press("End");
  await expect(figure).toContainText("İki aydınlık şerit 9 cm ve 13 cm konumunda. Araları 4 cm.");
  await expect(figure).toContainText("Ortadaki karanlık şerit 11 cm konumunda. En yakın aydınlığa 2 cm.");
  await expect(figure).toContainText("İlerleme doğrultusu şeritlere dik.");
  expect((await page.evaluate(svgLayoutAudit, { scope: selector, figuresOnly: true, explore: true })).issues).toEqual([]);
  await captureFigure(image, info.outputPath("mebi-wave-tank129.png"));
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı aynı tür ve farklı tür şeritleri ayrı satırlarda karşılaştırır", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-129");
  const section = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: waveTankTitle, exact: true }) });
  await expect(section.getByRole("row", { name: "Aydınlık → karanlık λ / 2 2 cm", exact: true })).toBeVisible();
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: waveTankExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(selector)).toHaveCount(2);
  await expect(solution).toContainText("Aydınlık ile komşu karanlık şerit arası 2 cm.");
});
