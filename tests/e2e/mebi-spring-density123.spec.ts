import { expect, test } from "@playwright/test";
import { springDensityExample, springDensityTitle } from "../../src/learning/mebiSpringDensity";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const selector = `figure[data-section-figure="${springDensityTitle}"]`;
const course = {
  lesson: "yay-dalgalari",
  search: "Yay dalgaları",
  title: "Yay dalgaları: atmayı üret, yansımayı çöz",
};

test("öğrenci eşit gerilimli yayların arasındaki sürat farkını çevrimdışı ölçer", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 880 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, course);
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await toc.getByRole("button", { name: springDensityTitle, exact: true }).press("Enter");
  const figure = page.locator(selector);
  const drawing = figure.getByRole("img");
  await expect(drawing).toHaveAccessibleName(/Eşit uzunlukta, aynı kuvvetle gerilmiş iki yay/);
  await expect(figure).toContainText("Üst yay: 20 m/s. Alt yay: 10 m/s.");
  await expect(drawing.getByText("2,5 m", { exact: true })).toBeVisible();
  expect((await page.evaluate(svgLayoutAudit, { scope: selector, figuresOnly: true, explore: true })).issues).toEqual([]);
  await drawing.screenshot({ path: info.outputPath("mebi-spring-density123.png") });
  await figure.getByRole("slider", { name: "Alt yayın kütlesi" }).press("Home");
  await expect(figure).toContainText("Üst yay: 20 m/s. Alt yay: 20 m/s.");
  await expect(drawing.getByText("5 m", { exact: true })).toHaveCount(2);
  await expect(figure).toContainText("İki yay da 4 N ile gerili.");
  await page.reload();
  await expect(page.getByRole("heading", { name: course.title, exact: true })).toBeVisible();
  await expect(figure).toContainText("Üst yay: 20 m/s. Alt yay: 10 m/s.");
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı kütle, yoğunluk, sürat ve yolu aynı örnekte gösterir", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-128");
  const section = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: springDensityTitle, exact: true }) });
  await expect(section.getByRole("row", { name: "400 g 0,04 kg/m 10 m/s 2,5 m", exact: true })).toBeVisible();
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: springDensityExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(selector).getByRole("img")).toBeVisible();
  await expect(solution).toContainText("100 g’lık yayda 20 m/s, 400 g’lık yayda 10 m/s.");
});
