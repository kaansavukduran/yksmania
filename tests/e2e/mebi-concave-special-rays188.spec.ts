import { expect, test } from "@playwright/test";
import { concaveSpecialExample, concaveSpecialSteps, concaveSpecialTitle } from "../../src/learning/mebiConcaveSpecialRays";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("six concave reflection paths remain distinct and usable offline", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "kuresel-aynalar", search: "Küresel aynalar" });
  const contents = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const entry = contents.getByRole("button", { name: concaveSpecialTitle, exact: true });
  if (!(await entry.isVisible())) await contents.getByText("İçindekiler", { exact: true }).press("Enter");
  await entry.press("Enter");
  const scope = `figure[data-section-figure="${concaveSpecialTitle}"]`;
  const figure = page.locator(scope);
  const cases = [
    "Gerçek kesişim tepeden 1,79 birim uzakta.",
    "Yansıma asal eksene paralel.",
    "Gelme ve yansıma 0°.",
    "Gelme ve yansıma 30°.",
    "Gerçek kesişim tepeden 5,36 birim uzakta.",
    "Sanal kesişim tepeden 1,82 birim uzakta.",
  ];
  for (const [step, text] of cases.entries()) {
    await expect(figure).toContainText(text);
    if (step < cases.length - 1) await figure.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  }
  const drawing = figure.getByRole("img");
  await expect(drawing.getByText("K", { exact: true })).toBeVisible();
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  await drawing.screenshot({ path: info.outputPath("concave-special188.png") });
  expect(learning(await storage(page))).toEqual(before);
});

test("all six source roles have their own Kopya Kağıdı drawings", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-134");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: concaveSpecialExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await solution.locator("summary").press("Enter");
  for (const title of concaveSpecialSteps) {
    await expect(solution.locator(`figure[data-section-figure="${title}"]`).getByRole("img")).toBeVisible();
  }
});
