import { expect, test } from "@playwright/test";
import { atomizerExample, atomizerExampleTitle, atomizerTitle } from "../../src/learning/mebiAtomizer";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const course = { lesson: "basinc", search: "Basınç" };
const diagram = (title: string) => `figure[data-section-figure="${title}"]`;
test.use({ viewport: { width: 320, height: 860 }, reducedMotion: "reduce" });

test("sprey damlacıkları yalnız yükselme eşiği aşılınca çizilir", async ({ page, context }, info) => {
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, course);
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği" });
  await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await toc.getByRole("button", { name: atomizerTitle, exact: true }).press("Enter");
  const figure = page.locator(diagram(atomizerTitle));
  const svg = figure.getByRole("img");
  await expect(svg).toHaveAccessibleName(/yatay hava borusu üstte/i);
  await expect(figure).toContainText("Fark: 2 kPa · Yükselme eşiği: 1,5 kPa.");
  await expect(figure).toContainText("Su uca ulaşır. Hava damlacık oluşturabilir.");
  await expect(svg.locator("circle")).toHaveCount(5);
  await svg.evaluate((element) => element.scrollIntoView({ block: "center" }));
  await svg.screenshot({ path: info.outputPath("atomizer100-spray.png") });
  const slider = figure.getByRole("slider", { name: /Yüzey − uç basınç farkı/ });
  await slider.press("ArrowLeft");
  await expect(figure).toContainText("Su seviyesi uçta dengede. Sürekli püskürtme yok.");
  await expect(svg.locator("circle")).toHaveCount(1);
  await slider.press("ArrowLeft");
  await expect(figure).toContainText("Su 10 cm yükselir. Uca ulaşmaz.");
  await slider.press("Home");
  await expect(figure).toContainText("Su 0 cm yükselir. Uca ulaşmaz.");
  expect((await page.evaluate(svgLayoutAudit, { scope: diagram(atomizerTitle), figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı su sütunu ve 2 kPa örneğini çevrimdışı açar", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 860 });
  await prepare(page);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-125");
  const row = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: atomizerTitle, exact: true }) });
  await expect(row.getByRole("columnheader")).toHaveText(["Yüzey − ağız basınç farkı", "Düşey boru", "Sprey ucu"]);
  await expect(row.getByRole("table").getByRole("row", { name: /1,5 kPa.*Sürekli püskürtme yok/ })).toBeVisible();
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: atomizerExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  const figure = solution.locator(diagram(atomizerExampleTitle));
  await expect(figure.getByRole("img")).toBeVisible();
  await expect(figure).toContainText("Su uca ulaşır. Hava damlacık oluşturabilir.");
  expect(learning(await storage(page))).toEqual(before);
});
