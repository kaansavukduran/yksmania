import { expect, test } from "@playwright/test";
import { mirrorEndpointsExample, mirrorEndpointsTitle, mirrorJoinedTitle, mirrorKTitle, mirrorLTitle } from "../../src/learning/mebiMirrorEndpoints";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("K and L rays and their equal-length virtual segment work offline in three steps", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "duzlem-ayna", search: "Düzlem ayna" });
  const nav = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const jump = nav.getByRole("button", { name: mirrorEndpointsTitle, exact: true });
  if (!(await jump.isVisible())) await nav.getByText("İçindekiler", { exact: true }).press("Enter");
  await jump.press("Enter");
  const scope = `figure[data-section-figure="${mirrorEndpointsTitle}"]`;
  const figure = page.locator(scope);
  const next = figure.getByRole("button", { name: "İleri", exact: true });
  await expect(figure).toContainText("K ve K′ aynadan 3,4 birim");
  await next.press("Enter");
  await expect(figure).toContainText("L ve L′ aynadan 2,1 birim");
  await next.press("Enter");
  await expect(figure).toContainText("KL uzunluğu 3,09 birim. K′L′ de 3,09 birim.");
  await expect(figure.getByRole("button", { name: "Geri", exact: true })).toBeFocused();
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  const drawing = figure.getByRole("img");
  await drawing.evaluate(node => node.scrollIntoView({ block: "center" }));
  await drawing.screenshot({ path: info.outputPath("mirror-endpoints183.png") });
  expect(learning(await storage(page))).toEqual(before);
});

test("the separate Kopya Kağıdı shows an independent K, L and joined drawing", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-133");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: mirrorEndpointsExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await solution.locator("summary").press("Enter");
  for (const title of [mirrorKTitle, mirrorLTitle, mirrorJoinedTitle]) {
    await expect(solution.locator(`figure[data-section-figure="${title}"]`).getByRole("img")).toBeVisible();
  }
});
