import { expect, test } from "@playwright/test";
import { twoTankDepthTitle, waterDepthExample, waterDepthTitle } from "../../src/learning/mebiWaterDepth";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("iki leğen ve ortak sınırda aynı frekansın aralığı derinlikle değişir", async ({ page, context }, info) => {
  test.setTimeout(60_000);
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "su-dalgalari", search: "Su dalgaları" });
  const open = async (title: string) => {
    const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
    const section = toc.getByRole("button", { name: title, exact: true });
    if (!(await section.isVisible())) await toc.getByText("İçindekiler", { exact: true }).press("Enter");
    await section.press("Enter");
    return page.locator(`figure[data-section-figure="${title}"]`);
  };
  const tanks = await open(twoTankDepthTitle);
  await expect(tanks.getByRole("img")).toHaveAccessibleName(/sığ leğen.*derin leğen/i);
  await tanks.getByRole("slider", { name: "Gözlem süresi", exact: true }).press("End");
  await expect(tanks).toContainText("Frekans ikisinde de 4 Hz. Periyot 0,25 s.");
  expect((await page.evaluate(svgLayoutAudit, { scope: `figure[data-section-figure="${twoTankDepthTitle}"]`, figuresOnly: true, explore: true })).issues).toEqual([]);
  await tanks.getByRole("img").screenshot({ path: info.outputPath("mebi-water-tanks137.png") });
  const boundary = await open(waterDepthTitle);
  await expect(boundary).toContainText("Sığ: 6 cm/s, λ = 1,5 cm.");
  await expect(boundary).toContainText("Derin: 12 cm/s, λ = 3 cm.");
  await boundary.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(boundary).toContainText("Derinden sığa");
  await expect(boundary).toContainText("Frekans 4 Hz. Periyot 0,25 s.");
  expect((await page.evaluate(svgLayoutAudit, { scope: `figure[data-section-figure="${waterDepthTitle}"]`, figuresOnly: true, explore: true })).issues).toEqual([]);
  await boundary.getByRole("img").screenshot({ path: info.outputPath("mebi-water-depth137.png") });
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı düzenekte 4 Hz ve iki dalga boyunu hesaplar", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-129");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: waterDepthExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(`figure[data-section-figure="${waterDepthTitle}"]`)).toHaveCount(2);
  await expect(solution).toContainText("Periyot iki bölgede 0,25 s. Sığda 1,5 cm, derinde 3 cm.");
});
