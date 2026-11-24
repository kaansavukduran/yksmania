import { expect, test } from "@playwright/test";
import { microwaveOvenExample, microwaveOvenStages, microwaveOvenTitle } from "../../src/learning/mebiMicrowaveOven";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const selector = `figure[data-section-figure="${microwaveOvenTitle}"]`;

test("fırın kesitinde kaynaktan yiyeceğe üç ayrı adım çevrimdışı izlenir", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 375, height: 860 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "dalgalara-giris", search: "Dalgalara giriş" });
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await toc.getByRole("button", { name: microwaveOvenTitle, exact: true }).press("Enter");
  const figure = page.locator(selector);
  const svg = figure.getByRole("img");
  await expect(svg).toHaveAccessibleName(/kaynak.*metal iç duvar.*yiyecek/);
  const steps = figure.getByRole("group", { name: "Şekil adımları", exact: true });
  const next = steps.getByRole("button", { name: "İleri", exact: true });
  const prev = steps.getByRole("button", { name: "Geri", exact: true });
  await expect(prev).toBeDisabled();
  const initial = await svg.innerHTML();
  for (const { label, detail } of microwaveOvenStages.slice(1)) {
    await next.press("Enter");
    await expect(steps).toContainText(label);
    await expect(figure).toContainText(detail);
    expect(await svg.innerHTML()).not.toBe(initial);
    expect((await page.evaluate(svgLayoutAudit, { scope: selector, figuresOnly: true, explore: false })).issues).toEqual([]);
  }
  await expect(next).toBeDisabled();
  await svg.screenshot({ path: info.outputPath("mebi-microwave-oven113.png") });
  await prev.press("Enter");
  await expect(steps).toContainText("Metalden yansıma");
  expect(learning(await storage(page))).toEqual(before);
});

test("ayrı Kopya Kağıdı metal duvar tablosunu ve dalga boyu çözümünü açar", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 860 });
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-127");
  const section = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: microwaveOvenTitle, exact: true }) });
  await expect(section.getByRole("row", { name: "Metal duvar Mikrodalgalar metal iç duvardan yansıyabilir.", exact: true })).toBeVisible();
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: microwaveOvenExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(selector).getByRole("img")).toBeVisible();
  await expect(solution).toContainText("Dalga boyu yaklaşık 12,2 cm.");
});
