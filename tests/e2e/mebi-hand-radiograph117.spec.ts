import { expect, test } from "@playwright/test";
import { handRadiographExample, handRadiographPhotoTitle, handRadiographTitle } from "../../src/learning/mebiXAndGamma";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";

test("gerçek el röntgeni derste çevrimdışı açılır ve odağı geri verir", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 375, height: 860 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "dalgalara-giris", search: "Dalgalara giriş" });
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await toc.getByRole("button", { name: handRadiographTitle, exact: true }).press("Enter");
  const figure = page.getByRole("figure", { name: handRadiographPhotoTitle, exact: true });
  const opener = figure.getByRole("button", { name: /görseli büyüt/i });
  const image = opener.getByRole("img");
  await expect(image).toHaveAccessibleName(/daha açık tonda.*kemik etiketleri/);
  expect(await image.evaluate(async (node) => {
    const image = node as HTMLImageElement;
    await image.decode();
    const response = await fetch(image.src);
    const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", await response.arrayBuffer()));
    return [image.naturalWidth, image.naturalHeight, Array.from(digest, (byte) => byte.toString(16).padStart(2, "0")).join("")];
  })).toEqual([354, 599, "0fbc6e17fde38bd90b38ed0201969fde9172207dcc6e2a047a40be3646b92f0c"]);
  await opener.press("Enter");
  const dialog = page.getByRole("dialog", { name: handRadiographPhotoTitle, exact: true });
  await expect(dialog.getByRole("button", { name: "Kapat", exact: true })).toBeFocused();
  const visibleImageHeight = await dialog.getByRole("img").evaluate((node) => {
    const image = node.getBoundingClientRect();
    const scroll = node.parentElement!.getBoundingClientRect();
    return Math.max(0, Math.min(window.innerHeight, image.bottom, scroll.bottom) - Math.max(0, image.top, scroll.top));
  });
  await page.screenshot({ path: info.outputPath("mebi-hand-radiograph117.png") });
  expect(visibleImageHeight).toBeGreaterThan(160);
  await page.keyboard.press("Escape");
  await expect(opener).toBeFocused();
  await expect(page.getByRole("link", { name: "Jochen Lengerke · Wikimedia Commons · CC0 1.0" })).toHaveAttribute("href", /oldid=1099028774$/);
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı ton okuma çözümünde gerçek gözlem görselini açar", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-127");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: handRadiographExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.getByRole("figure", { name: handRadiographPhotoTitle, exact: true }).getByRole("img")).toBeVisible();
  await expect(solution).toContainText("Daha açık görünen kemiğin bulunduğu yoldan algılayıcıya daha az ışın ulaşmıştır.");
});
