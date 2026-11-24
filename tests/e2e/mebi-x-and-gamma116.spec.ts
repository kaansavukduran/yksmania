import { expect, test, type Page } from "@playwright/test";
import { gammaPhotonExample, gammaPhotonTitle, xRayDetectorExample, xRayDetectorTitle } from "../../src/learning/mebiXAndGamma";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const selector = (title: string) => `figure[data-section-figure="${title}"]`;

async function openSection(page: Page, title: string) {
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const section = toc.getByRole("button", { name: title, exact: true });
  if (!(await section.isVisible())) await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await section.press("Enter");
  return page.locator(selector(title));
}

test("doku kalınlığı ve gama geçişi gerçek derste çevrimdışı değişir", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 375, height: 860 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "dalgalara-giris", search: "Dalgalara giriş" });
  const xRay = await openSection(page, xRayDetectorTitle);
  const xImage = xRay.getByRole("img");
  await expect(xImage).toHaveAccessibleName(/iki eşit demet/);
  await expect(xRay).toContainText("Yumuşak doku yolu %70, kemikli yol %43.");
  await xRay.getByRole("slider", { name: "Model kalınlığı" }).press("End");
  await expect(xRay).toContainText("Yumuşak doku yolu %35, kemikli yol %8.");
  expect((await page.evaluate(svgLayoutAudit, { scope: selector(xRayDetectorTitle), figuresOnly: true, explore: true })).issues).toEqual([]);
  await xImage.screenshot({ path: info.outputPath("mebi-x-ray116.png") });
  const gamma = await openSection(page, gammaPhotonTitle);
  const gammaImage = gamma.getByRole("img");
  await expect(gammaImage).toHaveAccessibleName(/üst ve alt enerji düzeyi/);
  await expect(gamma).toContainText("Çekirdek üst enerji düzeyinde.");
  await gamma.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(gamma).toContainText("Çekirdek alt enerji düzeyinde.");
  await expect(gammaImage.getByText("Gama fotonu", { exact: true })).toBeVisible();
  expect((await page.evaluate(svgLayoutAudit, { scope: selector(gammaPhotonTitle), figuresOnly: true, explore: false })).issues).toEqual([]);
  await gammaImage.screenshot({ path: info.outputPath("mebi-gamma116.png") });
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı iki ayrı çözüm çizimini ve algılayıcı tablosunu açar", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-127");
  const section = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: xRayDetectorTitle, exact: true }) });
  await expect(section.getByRole("row", { name: "2 birim %50 %18", exact: true })).toBeVisible();
  for (const [title, figureTitle] of [[xRayDetectorExample.title, xRayDetectorTitle], [gammaPhotonExample.title, gammaPhotonTitle]]) {
    const example = page.locator(".cheat-examples .worked-example").filter({ hasText: title });
    await example.locator(":scope > summary").press("Enter");
    const solution = example.locator(".cheat-solution");
    await expect(solution.getByRole("img")).toHaveCount(0);
    await solution.locator("summary").press("Enter");
    await expect(solution.locator(selector(figureTitle)).getByRole("img")).toBeVisible();
  }
});
