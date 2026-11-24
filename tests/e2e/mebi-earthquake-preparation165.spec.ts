import { expect, test } from "@playwright/test";
import {
  earthquakePreparationExample, earthquakePreparationTitle, emergencyBagTitle, meetingPlanTitle, securedRoomTitle,
} from "../../src/learning/mebiEarthquakePreparation";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("the offline checklist and three preparation diagrams are readable at large text", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 890 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "ses-deprem-dalgalari", search: "Ses ve deprem" });
  const nav = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const button = nav.getByRole("button", { name: earthquakePreparationTitle, exact: true });
  if (!(await button.isVisible())) await nav.getByText("İçindekiler", { exact: true }).press("Enter");
  await button.press("Enter");
  const section = page.locator(".guide-section").filter({ has: page.getByRole("heading", { name: earthquakePreparationTitle, exact: true }) });
  await expect(section.getByRole("columnheader", { name: "Önceden kontrol et", exact: true })).toBeVisible();
  await expect(section.getByRole("row", { name: /Tesisat.*yetkili bakım/ })).toBeVisible();
  const scope = 'figure[data-section-figure="' + earthquakePreparationTitle + '"]';
  const figure = section.locator(scope);
  const next = figure.getByRole("button", { name: "İleri", exact: true });
  await expect(figure).toContainText("Ağır kutu alt rafta.");
  await next.press("Enter");
  await expect(figure).toContainText("Sarsıntı bittikten sonra çıkış ve buluşma yolunu izle.");
  const image = figure.getByRole("img");
  await image.evaluate(node => node.scrollIntoView({ block: "center" }));
  await image.screenshot({ path: info.outputPath("earthquake-plan165.png") });
  await next.press("Enter");
  await expect(figure).toContainText("Çantayı kolay ulaşabileceğin yerde tut.");
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("the study sheet opens each preparation drawing at its own solution step", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-130");
  const checklist = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: earthquakePreparationTitle, exact: true }) });
  await expect(checklist.getByRole("columnheader", { name: "Önceden kontrol et", exact: true })).toBeVisible();
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: earthquakePreparationExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  for (const title of [securedRoomTitle, meetingPlanTitle, emergencyBagTitle]) {
    await expect(solution.locator('figure[data-section-figure="' + title + '"]').getByRole("img")).toBeVisible();
  }
});
