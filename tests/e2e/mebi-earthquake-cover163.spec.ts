import { expect, test } from "@playwright/test";
import { coverTitle, dropTitle, earthquakeCoverExample, earthquakeCoverTitle, holdTitle } from "../../src/learning/mebiEarthquakeCover";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("three indoor protection positions open by keyboard and remain available offline", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "ses-deprem-dalgalari", search: "Ses ve deprem" });
  const nav = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const item = nav.getByRole("button", { name: earthquakeCoverTitle, exact: true });
  if (!(await item.isVisible())) await nav.getByText("İçindekiler", { exact: true }).press("Enter");
  await item.press("Enter");
  const scope = `figure[data-section-figure="${earthquakeCoverTitle}"]`;
  const figure = page.locator(scope);
  await expect(figure).toContainText("Dizlerinin üzerine çök ve yere yakın kal.");
  const advance = figure.getByRole("button", { name: "İleri", exact: true });
  await advance.press("Enter");
  await expect(figure).toContainText("Yakındaki sağlam masanın altında başını ve enseni koru.");
  await advance.press("Enter");
  await expect(figure).toContainText("Bir elle masanın bacağına tutun, diğer kolunla başını ve enseni koru.");
  const svg = figure.getByRole("img");
  await svg.evaluate(node => node.scrollIntoView({ block: "center" }));
  await svg.screenshot({ path: info.outputPath("earthquake-cover163.png") });
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı üç korunma pozunu çözüm adımlarında açar", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-130");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: earthquakeCoverExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  for (const title of [dropTitle, coverTitle, holdTitle]) {
    await expect(solution.locator(`figure[data-section-figure="${title}"]`).getByRole("img")).toBeVisible();
  }
});
