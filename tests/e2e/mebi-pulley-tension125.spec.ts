import { expect, test } from "@playwright/test";
import { pulleyTensionExample, pulleyTensionTitle } from "../../src/learning/mebiPulleyTension";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const selector = `figure[data-section-figure="${pulleyTensionTitle}"]`;
const course = {
  lesson: "yay-dalgalari",
  search: "Yay dalgaları",
  title: "Yay dalgaları: atmayı üret, yansımayı çöz",
};

test("çevrimdışı makara çiziminde su kütlesi ve atmanın yolu birlikte değişir", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, course);
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await toc.getByRole("button", { name: pulleyTensionTitle, exact: true }).press("Enter");
  const figure = page.locator(selector);
  const drawing = figure.getByRole("img");
  await expect(drawing).toHaveAccessibleName(/sağdaki makaradan geçen iple su kovasına/);
  await expect(figure).toContainText("Gerilme: 2,5 N.");
  const slider = figure.getByRole("slider", { name: "Kovadaki su kütlesi" });
  await slider.press("Home");
  await expect(figure).toContainText("Atma sürati 10 m/s. 0,15 s’de sola 1,5 m ilerler.");
  const empty = await drawing.innerHTML();
  await slider.press("End");
  await expect(figure).toContainText("Gerilme: 4 N.");
  await expect(figure).toContainText("Atma sürati 20 m/s. 0,15 s’de sola 3 m ilerler.");
  expect(await drawing.innerHTML()).not.toBe(empty);
  expect((await page.evaluate(svgLayoutAudit, { scope: selector, figuresOnly: true, explore: true })).issues).toEqual([]);
  const unobstructed = await drawing.evaluate((svg) => {
    svg.scrollIntoView({ block: "center", behavior: "instant" });
    const bounds = svg.getBoundingClientRect();
    const middle = bounds.left + bounds.width / 2;
    return svg.contains(document.elementFromPoint(middle, bounds.top + 6))
      && svg.contains(document.elementFromPoint(middle, bounds.bottom - 6));
  });
  expect(unobstructed).toBe(true);
  const value = figure.locator("output");
  await expect(value).toHaveText("300 g");
  expect(await value.evaluate((element) => {
    const text = document.createRange();
    text.selectNodeContents(element);
    return [...text.getClientRects()].every((rect) => rect.height <= element.getBoundingClientRect().height)
      && new Set([...text.getClientRects()].map((rect) => rect.top)).size === 1;
  })).toBe(true);
  await page.screenshot({ path: info.outputPath("mebi-pulley-tension125.png") });
  await page.reload();
  await expect(page.getByRole("heading", { name: course.title, exact: true })).toBeVisible();
  await expect(figure).toContainText("Gerilme: 2,5 N.");
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı kovanın ağırlığını ve karekök oranını aynı şekille açıklar", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-128");
  const section = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: pulleyTensionTitle, exact: true }) });
  await expect(section.getByRole("row", { name: "300 g 0,4 kg 4 N 20 m/s", exact: true })).toBeVisible();
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: pulleyTensionExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(selector).getByRole("img")).toBeVisible();
  await expect(solution).toContainText("Gerilme 1 N’den 4 N’ye, atmanın sürati 10 m/s’den 20 m/s’ye çıkar.");
});
