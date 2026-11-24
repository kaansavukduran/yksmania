import { expect, test } from "@playwright/test";
import { stroboscopeExample, stroboscopeTitle } from "../../src/learning/mebiStroboscope";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("iki stroboskop kalıcı puan yazmadan aynı tepe görüntüsünü kurar", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "su-dalgalari", search: "Su dalgaları" });
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const section = toc.getByRole("button", { name: stroboscopeTitle, exact: true });
  if (!(await section.isVisible())) await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await section.press("Enter");

  const scope = `figure[data-section-figure="${stroboscopeTitle}"]`;
  const figure = page.locator(scope);
  await expect(figure.getByRole("img")).toHaveAccessibleName(/radyal yarık/i);
  await expect(figure).toContainText("8 × 2 = 16 bakış/s.");
  await expect(figure).toContainText("Tepeler aynı yerlerde görünür.");
  const rate = figure.getByRole("slider", { name: "Diskin tur sayısı", exact: true });
  await rate.press("Home");
  await expect(figure).toContainText("İki bakış arasında 2 periyot geçer.");
  await expect(figure).toContainText("Tepeler aynı yerlerde görünür.");
  await rate.press("End");
  await expect(figure).toContainText("İkinci bakışta tepeler farklı yerlerde görünür.");

  await figure.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await rate.press("End");
  await rate.press("ArrowLeft");
  await rate.press("ArrowLeft");
  await expect(figure).toContainText("4 × 4 = 16 bakış/s.");
  await expect(figure).toContainText("Tepeler aynı yerlerde görünür.");
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  await figure.getByRole("img").screenshot({ path: info.outputPath("stroboscope138.png") });
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı ölçümün iki adımında da doğru şekli gösterir", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-129");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: stroboscopeExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(`figure[data-section-figure="${stroboscopeTitle}"]`)).toHaveCount(2);
  await expect(solution).toContainText("Her iki disk için bakışlar arası 1/16 s.");
});
