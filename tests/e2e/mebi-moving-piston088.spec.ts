import { expect, test } from "@playwright/test";
import { heatedPistonExample, heatedPistonFigureTitle, movingPistonTitle } from "../../src/learning/mebiMovingPiston";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const course = { lesson: "basinc", search: "Basınç" };
const diagram = (title: string) => `figure[data-section-figure="${title}"]`;
test.use({ viewport: { width: 320, height: 860 }, reducedMotion: "reduce" });

test("piston ısıtma ve iki tür dış yükü klavyeyle ayrı modeller", async ({ page, context }, info) => {
  test.setTimeout(90_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, course);
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği" });
  await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await toc.getByRole("button", { name: movingPistonTitle, exact: true }).press("Enter");
  const figure = page.locator(diagram(movingPistonTitle));
  const next = figure.getByRole("button", { name: "İleri", exact: true });
  const slider = figure.getByRole("slider", { name: /Değişim katsayısı/ });
  await expect(figure).toContainText("Son basınç: 1 + 0,2 = 1,2 atm.");
  await expect(figure).toContainText("Son hacim: 1,5 V.");
  const svg = figure.getByRole("img");
  await expect(svg).toHaveAccessibleName(/iki silindirde/);
  await svg.evaluate((element) => element.scrollIntoView({ block: "center" }));
  await svg.screenshot({ path: info.outputPath("piston088-heating.png") });
  await slider.press("End");
  await expect(figure).toContainText("Son hacim: 2 V.");
  await next.press("Enter");
  await expect(figure).toContainText("Son basınç: 1 + 0,2 = 1,2 atm.");
  await expect(figure).toContainText("Son hacim: 2 V.");
  await next.press("Enter");
  await expect(figure).toContainText("Son basınç: 1 + 0,4 = 1,4 atm.");
  await expect(figure).toContainText("Son hacim: 0,86 V.");
  await next.press("Enter");
  await expect(figure).toContainText("Son basınç: 2 + 0,2 = 2,2 atm.");
  await expect(figure).toContainText("Son hacim: 0,55 V.");
  await svg.evaluate((element) => element.scrollIntoView({ block: "center" }));
  await svg.screenshot({ path: info.outputPath("piston088-atmosphere.png") });
  expect((await page.evaluate(svgLayoutAudit, { scope: diagram(movingPistonTitle), figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("piston Kopya Kağıdı ve 450 K örneği çevrimdışı açılır", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 860 });
  await prepare(page);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-125");
  const row = page.locator(".cheat-section").filter({
    has: page.getByRole("heading", { name: movingPistonTitle, exact: true }),
  });
  await expect(row.getByRole("columnheader")).toHaveText(["Artırılan", "Sabit kalan", "Son hacim"]);
  await expect(row.locator(".guide-table-cell-value")).toHaveText([
    "Gazı ısıt", "Son basınç", "Büyür",
    "Gaz ekle", "Son basınç", "Büyür",
    "Pistona yük ekle", "Gaz miktarı ve sıcaklığı", "Küçülür",
    "Dış basıncı artır", "Gaz miktarı ve sıcaklığı", "Küçülür",
  ]);
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: heatedPistonExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  const figure = solution.locator(diagram(heatedPistonFigureTitle));
  await expect(figure.getByRole("img")).toBeVisible();
  await expect(figure).toContainText("Son basınç: 1 + 0,2 = 1,2 atm.");
  await expect(figure).toContainText("Son hacim: 1,5 V.");
  expect(learning(await storage(page))).toEqual(before);
});
