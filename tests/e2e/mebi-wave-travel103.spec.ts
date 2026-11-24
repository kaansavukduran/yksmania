import { expect, test } from "@playwright/test";
import { waveTravelExample, waveTravelTitle } from "../../src/learning/mebiWaveTravel";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const waveFigure = `figure[data-section-figure="${waveTravelTitle}"]`;

test("telin dalga önü çeyrek ve tam periyotta aynı süratle ilerler", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 375, height: 860 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "dalgalara-giris", search: "Dalgalara giriş" });
  const contents = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  await contents.getByText("İçindekiler", { exact: true }).press("Enter");
  await contents.getByRole("button", { name: waveTravelTitle, exact: true }).press("Enter");
  const figure = page.locator(waveFigure);
  const svg = figure.getByRole("img");
  await expect(svg).toHaveAccessibleName(/bozunumun önüne kadar dalga çizgisi/i);
  await expect(figure).toContainText("Geçen süre: 0,5 s. Dalga önünün uzaklığı: 2 m.");
  const full = await svg.innerHTML();
  await svg.screenshot({ path: info.outputPath("wave-travel103-full-period.png") });
  const time = figure.getByRole("slider", { name: /Geçen süre t/ });
  await time.press("Home");
  await expect(figure).toContainText("Geçen süre: 0 s. Dalga önünün uzaklığı: 0 m.");
  expect(await svg.innerHTML()).not.toBe(full);
  await time.press("ArrowRight");
  await expect(figure).toContainText("Geçen süre: 0,125 s. Dalga önünün uzaklığı: 0,5 m.");
  await time.press("ArrowRight");
  await expect(figure).toContainText("Geçen süre: 0,25 s. Dalga önünün uzaklığı: 1 m.");
  expect((await page.evaluate(svgLayoutAudit, { scope: waveFigure, figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı örneği son çözümde tam periyot çizimini açar", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 860 });
  await prepare(page);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-127");
  const section = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: waveTravelTitle, exact: true }) });
  await expect(section.getByRole("columnheader")).toHaveText(["Geçen süre", "İşlem", "Dalga önünün konumu"]);
  await expect(section.getByRole("row", { name: /0,5 s.*2 m = λ/ })).toBeVisible();
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: waveTravelExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(waveFigure).getByRole("img")).toBeVisible();
  await expect(solution).toContainText("0,25 s’de 1 m ve 0,5 s’de 2 m.");
  expect(learning(await storage(page))).toEqual(before);
});
