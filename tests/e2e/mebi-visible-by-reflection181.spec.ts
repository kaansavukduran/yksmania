import { expect, test } from "@playwright/test";
import { litObjectTitle, unlitObjectTitle, visibleByReflectionExample, visibleByReflectionTitle } from "../../src/learning/mebiVisibleByReflection";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("a lit ball, a dark lit ball and the switched-off lamp are distinct offline scenes", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "duzlem-ayna", search: "Düzlem ayna" });
  const nav = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const jump = nav.getByRole("button", { name: visibleByReflectionTitle, exact: true });
  if (!(await jump.isVisible())) await nav.getByText("İçindekiler", { exact: true }).press("Enter");
  await jump.press("Enter");
  const scope = `figure[data-section-figure="${visibleByReflectionTitle}"]`;
  const figure = page.locator(scope);
  await expect(figure).toContainText("%80.");
  const next = figure.getByRole("button", { name: "İleri", exact: true });
  await next.press("Enter");
  await expect(figure).toContainText("%8.");
  const drawing = figure.getByRole("img");
  await drawing.evaluate(node => node.scrollIntoView({ block: "center" }));
  await drawing.screenshot({ path: info.outputPath("visible-by-reflection181.png") });
  await next.press("Enter");
  await expect(figure).toContainText("Topa ve top üzerinden göze ışık ulaşmaz.");
  await expect(figure.getByRole("button", { name: "Geri", exact: true })).toBeFocused();
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("the study sheet keeps the lit and unlit diagrams in different steps", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-133");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: visibleByReflectionExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(`figure[data-section-figure="${litObjectTitle}"]`)).toContainText("%80.");
  await expect(solution.locator(`figure[data-section-figure="${unlitObjectTitle}"]`)).toContainText("Lamba kapalı.");
});
