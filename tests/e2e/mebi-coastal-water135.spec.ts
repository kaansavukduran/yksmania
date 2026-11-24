import { expect, test } from "@playwright/test";
import { coastalWaterExample, coastalWaterLicence, coastalWaterPhotoTitle, coastalWaterSource, coastalWaterTitle } from "../../src/learning/mebiCoastalWater";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";

test("gerçek dalgakıran fotoğrafı çevrimdışı büyür ve geri dönünce odak korunur", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 375, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "su-dalgalari", search: "Su dalgaları" });
  const nav = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const section = nav.getByRole("button", { name: coastalWaterTitle, exact: true });
  if (!(await section.isVisible())) await nav.getByText("İçindekiler", { exact: true }).press("Enter");
  await section.press("Enter");
  const article = page.locator(".guide-section").filter({ has: page.getByRole("heading", { name: coastalWaterTitle, exact: true }) });
  const open = article.getByRole("button", { name: `${coastalWaterPhotoTitle}: görseli büyüt`, exact: true });
  const image = open.getByRole("img", { name: /Valletta liman girişinde/ });
  await expect(image).toBeVisible();
  const asset = await image.evaluate(async (node: HTMLImageElement) => {
    const response = await fetch(node.currentSrc);
    const digest = await crypto.subtle.digest("SHA-256", await response.arrayBuffer());
    return {
      width: node.naturalWidth,
      height: node.naturalHeight,
      digest: [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, "0")).join(""),
    };
  });
  expect(asset).toEqual({ width: 960, height: 601, digest: "63acc1fa710562dc1df6385514142c2dfbfb785dce486ae6f0f7b7fdf089b23f" });
  await expect(article.getByRole("link", { name: /RenataAp/ })).toHaveAttribute("href", coastalWaterSource);
  await expect(article.getByRole("link", { name: "CC BY-SA 4.0" })).toHaveAttribute("href", coastalWaterLicence);
  const position = page.locator('.guide-progress[role="progressbar"]');
  const openPage = await position.getAttribute("aria-valuenow");
  expect(openPage).toMatch(/^\d+$/);
  await open.press("Enter");
  const dialog = page.getByRole("dialog", { name: coastalWaterPhotoTitle, exact: true });
  await expect(dialog.getByRole("button", { name: "Kapat", exact: true })).toBeFocused();
  await dialog.getByRole("button", { name: "Görseli büyüt", exact: true }).press("Enter");
  await expect(dialog.getByLabel("Görsel yakınlaştırması", { exact: true })).toHaveText("%150");
  const enlarged = dialog.getByLabel("Büyütülmüş görsel. Yön tuşlarıyla kaydırabilirsin.", { exact: true });
  await enlarged.press("ArrowRight");
  await expect.poll(() => enlarged.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
  await expect(position).toHaveAttribute("aria-valuenow", openPage!);
  await page.screenshot({ path: info.outputPath("mebi-coastal-water135-375.png") });
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(open).toBeFocused();
  await expect(position).toHaveAttribute("aria-valuenow", openPage!);
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı fotoğraf gözlemini gerçek görüntüsüyle açar", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-129");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: coastalWaterExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(example.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  const open = solution.getByRole("button", { name: `${coastalWaterPhotoTitle}: görseli büyüt`, exact: true });
  await expect(open.getByRole("img")).toBeVisible();
  await expect(solution).toContainText("Yansıyan enerji miktarı ayrıca ölçülmelidir.");
});
