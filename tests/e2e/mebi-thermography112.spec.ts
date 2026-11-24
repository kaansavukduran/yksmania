import { expect, test } from "@playwright/test";
import { thermographyExample, thermographyPhotoTitle, thermographySourceURL, thermographyTitle } from "../../src/learning/mebiThermography";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";

test("gerçek termal görsel çevrimdışı açılır, büyür ve klavye odağına döner", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 375, height: 860 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "dalgalara-giris", search: "Dalgalara giriş" });
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await toc.getByRole("button", { name: thermographyTitle, exact: true }).press("Enter");
  const figure = page.getByRole("figure", { name: thermographyPhotoTitle, exact: true });
  const opener = figure.getByRole("button", { name: /görseli büyüt/i });
  const image = opener.getByRole("img");
  await expect(image).toHaveAccessibleName(/altta 69, üstte 101.*71,6 Fahrenheit/);
  expect(await image.evaluate(async (element) => {
    const response = await fetch((element as HTMLImageElement).src);
    const bytes = await response.arrayBuffer();
    const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", bytes));
    return { bytes: bytes.byteLength, hash: Array.from(digest, (byte) => byte.toString(16).padStart(2, "0")).join("") };
  })).toEqual({ bytes: 133408, hash: "7824f12972c00897658e3012466de6ac4bb51163bba51b4cecbb8e54fbac662a" });
  await opener.press("Enter");
  const dialog = page.getByRole("dialog", { name: thermographyPhotoTitle, exact: true });
  await expect(dialog.getByRole("button", { name: "Kapat", exact: true })).toBeFocused();
  await dialog.getByRole("button", { name: "Görseli büyüt", exact: true }).press("Enter");
  await expect(dialog.getByLabel("Görsel yakınlaştırması")).toHaveText("%150");
  await dialog.screenshot({ path: info.outputPath("mebi-thermography112-zoom.png") });
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(opener).toBeFocused();
  await expect(page.getByRole("link", { name: "MartinThoma · Wikimedia Commons · CC0 1.0" })).toHaveAttribute("href", thermographySourceURL);
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı gözlem tablosunu ve çözümde aynı kaynak görüntüsünü açar", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 860 });
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-127");
  const section = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: thermographyTitle, exact: true }) });
  await expect(section.getByRole("row", { name: "Sağdaki renk çubuğu Bu görüntüdeki renk aralığı 69–101 °F", exact: true })).toBeVisible();
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: thermographyExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("figure", { name: thermographyPhotoTitle, exact: true })).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.getByRole("figure", { name: thermographyPhotoTitle, exact: true })).toBeVisible();
  await expect(solution).toContainText("Ekrandaki merkez okuması Celsius cinsinden 22 °C’dir.");
});
