import { expect, test, type Locator } from "@playwright/test";
import { fixedReflectionTitle, freeReflectionTitle, pulseReflectionExample } from "../../src/learning/mebiPulseReflection";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const figureFor = (title: string) => `figure[data-section-figure="${title}"]`;
const course = {
  lesson: "yay-dalgalari",
  search: "Yay dalgaları",
  title: "Yay dalgaları: atmayı üret, yansımayı çöz",
};

async function captureUnobstructedFigure(figure: Locator, path: string) {
  const unobstructed = await figure.getByRole("img").evaluate((svg) => {
    svg.scrollIntoView({ block: "center", behavior: "instant" });
    const { left, width, top, bottom } = svg.getBoundingClientRect();
    return svg.contains(document.elementFromPoint(left + width / 2, top + 6))
      && svg.contains(document.elementFromPoint(left + width / 2, bottom - 6));
  });
  expect(unobstructed).toBe(true);
  await figure.page().screenshot({ path });
}

test("sabit ve serbest uç modelden hesaplanan sınır davranışını çevrimdışı gösterir", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, course);
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const openSection = async (title: string) => {
    const button = toc.getByRole("button", { name: title, exact: true });
    if (!(await button.isVisible())) await toc.getByText("İçindekiler", { exact: true }).press("Enter");
    await button.press("Enter");
    return page.locator(figureFor(title));
  };
  const fixed = await openSection(fixedReflectionTitle);
  const freeChoice = page.locator(figureFor(freeReflectionTitle));
  await expect(fixed).toContainText("Gelen tepe sağa 2 m/s ile ilerler.");
  await fixed.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(fixed).toContainText("Sabit uç denge çizgisinde kalır.");
  await expect(fixed).toContainText("Uç uzanımı 0 m.");
  await captureUnobstructedFigure(fixed, info.outputPath("mebi-fixed-reflection126.png"));
  await fixed.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(fixed).toContainText("Yansıyan çukur sola 2 m/s ile ilerler.");
  expect((await page.evaluate(svgLayoutAudit, { scope: figureFor(fixedReflectionTitle), figuresOnly: true, explore: true })).issues).toEqual([]);
  await openSection(freeReflectionTitle);
  await freeChoice.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(freeChoice).toContainText("Uç uzanımı 2,5 m.");
  await captureUnobstructedFigure(freeChoice, info.outputPath("mebi-free-reflection126.png"));
  await freeChoice.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(freeChoice).toContainText("Yansıyan tepe sola 2 m/s ile ilerler.");
  expect((await page.evaluate(svgLayoutAudit, { scope: figureFor(freeReflectionTitle), figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı sabit uçtaki toplamı ve serbest uçtaki toplamı farklı adımlarda gösterir", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-128");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: pulseReflectionExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(figureFor(fixedReflectionTitle)).getByRole("img")).toBeVisible();
  await expect(solution.locator(figureFor(freeReflectionTitle)).getByRole("img")).toBeVisible();
  await expect(solution).toContainText("Sabit uç 0 m, serbest uç 2,50 m.");
});
