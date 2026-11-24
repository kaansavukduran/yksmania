import { expect, test } from "@playwright/test";
import { concaveExample, concaveStepFigureTitles, concaveWaterTitle } from "../../src/learning/mebiConcaveWater";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const selector = `figure[data-section-figure="${concaveWaterTitle}"]`;

test("F ve M kaynağı aynı duvarda farklı cepheler üretir", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const prior = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "su-dalgalari", search: "Su dalgaları" });
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const section = toc.getByRole("button", { name: concaveWaterTitle, exact: true });
  if (!(await section.isVisible())) await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await section.press("Enter");
  const figure = page.locator(selector);
  const drawing = figure.getByRole("img");
  await expect(drawing).toHaveAccessibleName(/M merkezi ve F odağı/);
  for (const [step, message] of [
    "Düz cephelerden dönen oklar F çevresine yönelir.",
    "F’deki kaynaktan gelen oklar yaklaşık paralel döner.",
    "M’deki kaynaktan gelen oklar aynı doğrultu üzerinden merkeze döner.",
  ].entries()) {
    if (step > 0) await figure.getByRole("button", { name: "İleri", exact: true }).press("Enter");
    await expect(figure).toContainText(message);
    expect((await page.evaluate(svgLayoutAudit, { scope: selector, figuresOnly: true, explore: false })).issues).toEqual([]);
    await drawing.evaluate((svg) => svg.scrollIntoView({ block: "center", behavior: "instant" }));
    await page.screenshot({ path: info.outputPath(`mebi-concave-water132-${step}.png`) });
  }
  expect(learning(await storage(page))).toEqual(prior);
});

test("Kopya Kağıdı her çukur engel durumunu kendi çözüm çiziminde açar", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-129");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: concaveExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  const messages = ["F çevresine yönelir.", "yaklaşık paralel döner.", "aynı doğrultu üzerinden merkeze döner."];
  for (const [index, title] of concaveStepFigureTitles.entries()) {
    const drawing = solution.locator(`figure[data-section-figure="${title}"]`);
    await expect(drawing.getByRole("img")).toBeVisible();
    await expect(drawing).toContainText(messages[index]);
  }
});
