import { expect, test } from "@playwright/test";

test("the home page reuses the same pixel-perfect artwork on a cold offline reload", async ({ page, context }) => {
  test.setTimeout(90_000);
  await page.goto("/#/today");
  await expect(page.locator(".study-landscape")).toHaveCount(1);
  await expect(page.locator(".aion-texture").first()).toBeVisible();
  await page.waitForFunction(() => navigator.serviceWorker.controller?.state === "activated", undefined, { timeout: 30_000 });

  const artwork = await page.evaluate(async () => {
    const styles = [
      getComputedStyle(document.querySelector(".study-landscape")!).backgroundImage,
      getComputedStyle(document.querySelector(".aion-texture")!).backgroundImage,
    ];
    const files = styles.map((style) => new URL(style.replace(/^url\(["']?|["']?\)$/g, ""), location.href).href);
    const names = ["study-world", "aion-pixel"];
    const oldFiles = names.map((name) => new URL(`assets/${name}.png`, document.baseURI).href);
    const stores = await Promise.all((await caches.keys()).map((key) => caches.open(key)));
    const urls = (await Promise.all(stores.map((cache) => cache.keys()))).flat().map((request) => request.url);
    const legacyInCurrentCache = oldFiles.some((old) => urls.some((cached) => new URL(cached).pathname === new URL(old).pathname));

    async function pixels(url: string) {
      const image = new Image();
      image.src = url;
      await image.decode();
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const drawing = canvas.getContext("2d")!;
      drawing.drawImage(image, 0, 0);
      return drawing.getImageData(0, 0, canvas.width, canvas.height);
    }

    const equal = await Promise.all(files.map(async (file, index) => {
      const [current, original] = await Promise.all([pixels(file), pixels(oldFiles[index])]);
      return current.width === original.width && current.height === original.height &&
        current.data.every((byte, offset) => byte === original.data[offset]);
    }));
    return { files, equal, legacyInCurrentCache, cacheContainsExactURL: files.map((file) => urls.includes(file)) };
  });
  expect(artwork.files[0]).toMatch(/\/assets\/study-world-[\w-]{8}\.webp$/);
  expect(artwork.files[1]).toMatch(/\/assets\/aion-pixel-[\w-]{8}\.png$/);
  expect(artwork.equal).toEqual([true, true]);
  expect(artwork.cacheContainsExactURL).toEqual([true, true]);
  expect(artwork.legacyInCurrentCache).toBe(false);

  await context.setOffline(true);
  expect((await page.reload())?.fromServiceWorker()).toBe(true);
  await expect(page.locator(".aion-texture").first()).toBeVisible();
  const dimensions = await page.evaluate((files) => Promise.all(files.map(async (file) => {
    const image = new Image();
    image.src = file;
    await image.decode();
    return [image.naturalWidth, image.naturalHeight];
  })), artwork.files);
  expect(dimensions).toEqual([[1774, 887], [1774, 887]]);
});
