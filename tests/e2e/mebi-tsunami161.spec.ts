import { expect, test } from "@playwright/test";
import {
  tsunamiDepthTitle, tsunamiExample, tsunamiFormationTitle, tsunamiComparisonTitle, tsunamiDisplacementTitle,
} from "../../src/learning/mebiTsunamiFormation";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("the source-mapped tsunami scene reads offline with a common wavelength scale", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "ses-deprem-dalgalari", search: "Ses ve deprem" });
  const nav = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const jump = async (title: string) => {
    const item = nav.getByRole("button", { name: title, exact: true });
    if (!(await item.isVisible())) await nav.getByText("İçindekiler", { exact: true }).press("Enter");
    await item.press("Enter");
    return page.locator(`figure[data-section-figure="${title}"]`);
  };
  const formation = await jump(tsunamiFormationTitle);
  await expect(formation).toContainText("Taban ve su yüzeyi başlangıçta yerinde.");
  const next = formation.getByRole("button", { name: "İleri", exact: true });
  await next.press("Enter");
  await expect(formation).toContainText("Tabanın bir bölümü yükseldi. Üstündeki su da yükseliyor.");
  await next.press("Enter");
  await expect(formation).toContainText("Yüzey dalgaları kaynaktan uzaklaşıyor.");
  const wave = formation.getByRole("img");
  await wave.evaluate(node => node.scrollIntoView({ block: "center" }));
  await wave.screenshot({ path: info.outputPath("tsunami-formation161.png") });

  const depth = await jump(tsunamiDepthTitle);
  const setting = depth.getByRole("slider", { name: "Su derinliği", exact: true });
  await expect(depth).toContainText("Seçilen derinlik 4.000 m. Sürat 198 m/s, dalga boyu 118,8 km.");
  await expect(depth).toContainText("Referans derinlik 100 m. Sürat 31,3 m/s, dalga boyu 18,8 km.");
  const comparison = depth.getByRole("img");
  await comparison.evaluate(node => node.scrollIntoView({ block: "center" }));
  await comparison.screenshot({ path: info.outputPath("tsunami-depth161.png") });
  await setting.press("Home");
  await expect(depth.getByText("Seçilen derinlik 100 m. Sürat 31,3 m/s, dalga boyu 18,8 km.", { exact: true })).toBeVisible();
  await expect(depth.getByText("Referans derinlik 100 m. Sürat 31,3 m/s, dalga boyu 18,8 km.", { exact: true })).toBeVisible();
  const issues = [];
  for (const title of [tsunamiFormationTitle, tsunamiDepthTitle]) {
    const scope = `figure[data-section-figure="${title}"]`;
    issues.push(...(await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues);
  }
  expect(issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı oluşumu ve iki sabit dalga boyunu ayrı açar", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-130");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: tsunamiExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(`figure[data-section-figure="${tsunamiDisplacementTitle}"]`)).toContainText("Üstündeki su da yükseliyor.");
  await expect(solution.locator(`figure[data-section-figure="${tsunamiComparisonTitle}"]`)).toContainText("118,8 km");
  await expect(solution.getByRole("slider")).toHaveCount(0);
});
