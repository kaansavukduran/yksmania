import { expect, test } from "@playwright/test";
import { lengthComparisonTitle, lengthExampleFigure, tensionComparisonTitle, tensionExampleFigure, tensionLengthExample } from "../../src/learning/mebiWireTensionLength";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("gerilimi dört katına çıkar veya boyu yarıya indir ve aynı frekans oranını gör", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "ses-deprem-dalgalari", search: "Ses ve deprem" });
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const open = async (title: string) => {
    const item = toc.getByRole("button", { name: title, exact: true });
    if (!(await item.isVisible())) await toc.getByText("İçindekiler", { exact: true }).press("Enter");
    await item.press("Enter");
    return page.locator(`figure[data-section-figure="${title}"]`);
  };
  const tension = await open(tensionComparisonTitle);
  await expect(tension.getByRole("img")).toHaveAccessibleName(/K telinin makarasına bir G/i);
  await expect(tension.getByRole("img").getByText("2G", { exact: true })).toBeVisible();
  await expect(tension).toContainText("İkinci telin frekansı ilkinin 1,41 katı.");
  const force = tension.getByRole("slider", { name: "M telindeki ağırlık", exact: true });
  await force.press("End");
  await expect(tension.getByRole("img").getByText("4G", { exact: true })).toBeVisible();
  await expect(tension).toContainText("İkinci telin frekansı ilkinin 2 katı.");
  await tension.getByRole("img").evaluate(node => node.scrollIntoView({ block: "center" }));
  await tension.getByRole("img").screenshot({ path: info.outputPath("tension-weights145.png") });
  expect((await page.evaluate(svgLayoutAudit, { scope: `figure[data-section-figure="${tensionComparisonTitle}"]`, figuresOnly: true, explore: true })).issues).toEqual([]);

  const length = await open(lengthComparisonTitle);
  await expect(length.getByRole("img").getByText("G", { exact: true })).toHaveCount(2);
  await expect(length).toContainText("İkinci telin frekansı ilkinin 2 katı.");
  const stretch = length.getByRole("slider", { name: "Kısa bölümün boyu", exact: true });
  await stretch.press("End");
  await expect(length).toContainText("İkinci telin frekansı ilkinin 1 katı.");
  await stretch.press("Home");
  await length.getByRole("img").evaluate(node => node.scrollIntoView({ block: "center" }));
  await length.getByRole("img").screenshot({ path: info.outputPath("wire-length145.png") });
  expect((await page.evaluate(svgLayoutAudit, { scope: `figure[data-section-figure="${lengthComparisonTitle}"]`, figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı aynı frekans sonucuna götüren iki yolu ayrı grafikte gösterir", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-130");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: tensionLengthExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  for (const title of [tensionExampleFigure, lengthExampleFigure]) {
    const figure = solution.locator(`figure[data-section-figure="${title}"]`);
    await expect(figure).toContainText("İkinci telin frekansı ilkinin 2 katı.");
    await expect(figure.getByRole("slider")).toHaveCount(0);
  }
});
