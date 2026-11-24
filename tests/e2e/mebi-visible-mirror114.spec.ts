import { expect, test } from "@playwright/test";
import { visibleMirrorExample, visibleMirrorPhotoTitle, visibleMirrorRayTitle, visibleMirrorTitle } from "../../src/learning/mebiVisibleMirror";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";

test("yan ayna fotoğrafı gerçek öğrenci dersinde klavyeyle ve çevrimdışı açılır", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 375, height: 860 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "dalgalara-giris", search: "Dalgalara giriş" });
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await toc.getByRole("button", { name: visibleMirrorTitle, exact: true }).press("Enter");
  const photo = page.getByRole("figure", { name: visibleMirrorPhotoTitle, exact: true });
  const opener = photo.getByRole("button", { name: /görseli büyüt/i });
  const image = opener.getByRole("img");
  await expect(image).toHaveAccessibleName(/arkadaki yol, bulutlar ve turuncu gün batımı/);
  expect(await image.evaluate(async (element) => {
    const img = element as HTMLImageElement;
    await img.decode();
    const response = await fetch(img.src);
    const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", await response.arrayBuffer()));
    return [img.naturalWidth, img.naturalHeight, Array.from(digest, (byte) => byte.toString(16).padStart(2, "0")).join("")];
  })).toEqual([960, 640, "27a025e92946011645c501a03c9f08539275b58cbb850a2b3aa0d9724a0e6b73"]);
  await opener.press("Enter");
  const dialog = page.getByRole("dialog", { name: visibleMirrorPhotoTitle, exact: true });
  await expect(dialog.getByRole("button", { name: "Kapat", exact: true })).toBeFocused();
  await dialog.screenshot({ path: info.outputPath("mebi-visible-mirror114-zoom.png") });
  await page.keyboard.press("Escape");
  await expect(opener).toBeFocused();
  await expect(page.getByRole("link", { name: "Jake Weirick · Wikimedia Commons · CC0 1.0" })).toHaveAttribute("href", /oldid=914430380$/);
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı ışığın yolunu ve normalden ölçülen iki açıyı gösterir", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 860 });
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-127");
  const section = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: visibleMirrorTitle, exact: true }) });
  await expect(section.getByRole("row", { name: "Arkadaki sahne → ayna Görünür ışık aynaya gelir.", exact: true })).toBeVisible();
  await expect(section.getByRole("figure", { name: visibleMirrorPhotoTitle, exact: true }).getByRole("img")).toBeVisible();
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: visibleMirrorExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  const model = solution.locator(`figure[data-section-figure="${visibleMirrorRayTitle}"]`).first();
  await expect(model.getByRole("img")).toHaveAccessibleName(/kesikli normal/);
  await expect(model).toContainText("i = r = 35° · yüzeyle açı 55°");
  await model.getByRole("slider", { name: /Gelme açısı i/ }).press("ArrowRight");
  await expect(model).toContainText("i = r = 40° · yüzeyle açı 50°");
  await expect(solution).toContainText("Yansıyan ışın normal çizgisiyle 35° açı yapar.");
});
