import { expect, test } from "@playwright/test";
import { concaveBoundaryExample, concaveBoundarySteps, concaveBoundaryTitle } from "../../src/learning/mebiConcaveFocusBoundary";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("the same concave mirror works across the focus without changing learning records", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const initial = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "kuresel-aynalar", search: "Küresel aynalar" });
  const contents = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const entry = contents.getByRole("button", { name: concaveBoundaryTitle, exact: true });
  if (!(await entry.isVisible())) await contents.getByText("İçindekiler", { exact: true }).press("Enter");
  await entry.press("Enter");
  const scope = `figure[data-section-figure="${concaveBoundaryTitle}"]`;
  const figure = page.locator(scope);
  await expect(figure).toContainText("v = 6, m = -2");
  const next = figure.getByRole("button", { name: "İleri", exact: true });
  await next.press("Enter");
  await expect(figure).toContainText("çıkan ışınlar paralel, sonlu görüntü yok");
  await next.press("Enter");
  await expect(figure).toContainText("v = -2, m = 2");
  await expect(figure).toContainText("Görüntü sanal, düz, büyük");
  const section = page.locator(".guide-section").filter({ has: page.getByRole("heading", { name: concaveBoundaryTitle, exact: true }) });
  await expect(section.getByRole("row", { name: "2 cm, F’de Sonlu kesişim yok Kollar paralel" })).toBeVisible();
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  await figure.getByRole("img").screenshot({ path: info.outputPath("focus-boundary192.png") });
  expect(learning(await storage(page))).toEqual(initial);
});

test("the Kopya Kağıdı shows all three mirror boundary images at their solution stages", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-134");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: concaveBoundaryExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await solution.locator("summary").press("Enter");
  for (const title of concaveBoundarySteps) {
    await expect(solution.locator(`figure[data-section-figure="${title}"]`).getByRole("img")).toBeVisible();
  }
});
