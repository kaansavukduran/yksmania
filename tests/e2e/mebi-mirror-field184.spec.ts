import { expect, test } from "@playwright/test";
import { mirrorFieldExample, mirrorFieldMethods, mirrorFieldTitle, mirrorWritingTitle } from "../../src/learning/mebiMirrorField";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("keyboard methods construct the same mirror field offline without awarding credit", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "duzlem-ayna", search: "Düzlem ayna" });
  const contents = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const entry = contents.getByRole("button", { name: mirrorFieldTitle, exact: true });
  if (!(await entry.isVisible())) await contents.getByText("İçindekiler", { exact: true }).press("Enter");
  await entry.press("Enter");
  const scope = `figure[data-section-figure="${mirrorFieldTitle}"]`;
  const field = page.locator(scope);
  await expect(field).toContainText("-3");
  await expect(field).toContainText("5 birim.");
  const next = field.getByRole("button", { name: "İleri", exact: true });
  await next.press("Enter");
  await expect(field).toContainText(mirrorFieldMethods[1]);
  await expect(field).toContainText("5 birim.");
  await next.press("Enter");
  await expect(field).toContainText("Sol normalin iki yanında 1, sağ normalin iki yanında 3 birim.");
  await field.getByRole("slider", { name: "Gözün yatay konumu", exact: true }).press("End");
  await expect(field).toContainText("Göz hizasında sınırlar -5,5 ve 2,5 birim.");
  await expect(field).toContainText("Sol normalin iki yanında 3,5, sağ normalin iki yanında 0,5 birim.");
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  await field.getByRole("img").screenshot({ path: info.outputPath("mirror-field184.png") });
  expect(learning(await storage(page))).toEqual(before);
});

test("the two photo views share one credited offline asset and the mirrored zoom stays mirrored", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 375, height: 840 });
  await prepare(page);
  await context.setOffline(true);
  await openCourse(page, { lesson: "duzlem-ayna", search: "Düzlem ayna" });
  const contents = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const entry = contents.getByRole("button", { name: mirrorWritingTitle, exact: true });
  if (!(await entry.isVisible())) await contents.getByText("İçindekiler", { exact: true }).press("Enter");
  await entry.press("Enter");
  const photos = page.getByRole("group", { name: "Kaputtaki yazı ve yatay ayna görüntüsü" });
  const direct = photos.getByRole("img").first();
  const reflected = photos.getByRole("img").nth(1);
  await expect(direct).toBeVisible();
  await expect(reflected).toBeVisible();
  expect(await direct.getAttribute("src")).toBe(await reflected.getAttribute("src"));
  expect(await direct.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBe(850);
  await expect(direct).toHaveCSS("scale", "none");
  await expect(reflected).toHaveCSS("scale", "-1 1");
  await expect(photos.getByRole("link", { name: "CC BY-SA 3.0", exact: true })).toHaveCount(2);
  await photos.screenshot({ path: info.outputPath("mirror-writing184.png") });
  await photos.getByRole("button", { name: "Ayna görünümü: görseli büyüt", exact: true }).press("Enter");
  const modal = page.getByRole("dialog");
  await expect(modal.getByRole("img")).toHaveCSS("scale", "-1 1");
  await modal.getByRole("button", { name: "Kapat", exact: true }).press("Enter");
  await expect(photos.getByRole("button", { name: "Ayna görünümü: görseli büyüt", exact: true })).toBeFocused();
});

test("a separate Kopya Kağıdı gives one drawing for every solution method", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-133");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: mirrorFieldExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await solution.locator("summary").press("Enter");
  for (const title of mirrorFieldMethods) {
    await expect(solution.locator(`figure[data-section-figure="${title}"]`).getByRole("img")).toBeVisible();
  }
});
