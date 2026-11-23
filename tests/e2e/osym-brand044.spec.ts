import { expect, test } from "@playwright/test";
import { openCourse, storage } from "./helpers/revisedCourse";
import { setThemePreference } from "./helpers/theme";

test("ÖSYM Mania markası altı temada, büyük yazıda ve çevrimdışı okunur", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 850 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./#/settings");
  await expect(page).toHaveTitle(/ÖSYM Mania/);
  await expect(page.getByText("ÖSYM Mania bir Fragaria Interactive projesidir.", { exact: true })).toBeVisible();
  await openCourse(page, { lesson: "newton", search: "Kuvvet ve Newton" });
  const note = "Net kuvveti iki eksende ayrı kontrol et.";
  await page.getByRole("textbox", { name: "Notun", exact: true }).fill(note);
  await expect.poll(async () => Object.values((await storage(page))?.notes ?? {})).toContain(note);
  const initial = await storage(page);
  await page.goto("./#/settings");
  await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
  await page.getByLabel("Yalnızca yazı boyutu %", { exact: true }).fill("150");
  const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
  const brand = page.getByRole("link", { name: "ÖSYM Mania", exact: true });
  for (const theme of ["dark", "light", "contrast", "matrix", "axolotl", "trans"] as const) {
    if (theme === "axolotl" || theme === "trans") {
      await page.getByRole("group", { name: "Tema", exact: true }).getByRole("button", {
        name: theme === "axolotl" ? "Axolotl pembesi" : "Trans bayrağı",
        exact: true,
      }).click();
      await expect(page.locator(".save-status")).toContainText("Bu cihazda kaydedildi");
    } else {
      await setThemePreference(page, theme);
    }
    await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
    await menu.click();
    await expect(brand).toBeVisible();
    await expect(brand).toHaveAccessibleName("ÖSYM Mania");
    await expect(brand.locator("img")).toHaveAttribute("alt", "");
    expect(await brand.evaluate((link) => {
      const mark = link.querySelector("img")!;
      const iconBox = mark.getBoundingClientRect();
      const words = link.lastElementChild!;
      const textBox = words.getBoundingClientRect();
      const linkBox = link.getBoundingClientRect();
      const firstWord = document.createRange();
      firstWord.setStart(words.firstChild!, 0);
      firstWord.setEnd(words.firstChild!, 4);
      return mark.complete && mark.naturalWidth > 0 &&
        (iconBox.right <= textBox.left || iconBox.bottom <= textBox.top) &&
        textBox.right <= linkBox.right && textBox.top >= linkBox.top &&
        textBox.bottom <= linkBox.bottom && linkBox.height >= 44 &&
        firstWord.getClientRects().length === 1;
    })).toBe(true);
    if (theme === "dark") await brand.screenshot({ path: info.outputPath("osym-mania-320.png") });
    await page.keyboard.press("Escape");
    await expect(menu).toBeVisible();
  }
  for (const width of [375, 430, 1280]) {
    await page.setViewportSize({ width, height: 850 });
    if (await menu.isVisible()) await menu.click();
    await expect(brand).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    await page.keyboard.press("Escape");
  }
  await expect(page.locator(".save-status")).toContainText("Bu cihazda kaydedildi");
  await page.waitForFunction(() => navigator.serviceWorker.controller?.state === "activated");
  await context.setOffline(true);
  expect((await page.reload())?.fromServiceWorker()).toBe(true);
  await expect(brand).toBeVisible();
  await expect.poll(() => brand.locator("img").evaluate((mark: HTMLImageElement) => mark.naturalWidth)).toBeGreaterThan(0);
  await expect(page.getByText("ÖSYM Mania bir Fragaria Interactive projesidir.", { exact: true })).toBeVisible();
  const saved = await storage(page);
  expect(saved.sessions).toEqual(initial.sessions);
  expect(saved.reviews).toEqual(initial.reviews);
  expect(saved.notes).toEqual(initial.notes);
  expect(saved.settings.theme).toBe("trans");
});

test("favicon ve kurulum simgeleri uygulama yoluna göre yüklenir", async ({ page, context }) => {
  await page.goto("./");
  await page.waitForFunction(() => navigator.serviceWorker.controller?.state === "activated");
  await context.setOffline(true);
  const offline = await page.evaluate(async () => {
    const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]')!.href;
    const manifestURL = document.querySelector<HTMLLinkElement>('link[rel="manifest"]')!.href;
    const manifest = await (await fetch(manifestURL)).json();
    const pngIcons = (manifest.icons as { src: string; purpose: string; type: string }[])
      .filter((icon) => icon.type === "image/png");
    const icons = await Promise.all(pngIcons.map(async (icon) => {
      const url = new URL(icon.src, manifestURL);
      const image = await createImageBitmap(await (await fetch(url)).blob());
      return { purpose: icon.purpose, width: image.width, height: image.height, path: url.pathname };
    }));
    return {
      name: manifest.name,
      favicon: await (await fetch(favicon)).text(),
      scope: new URL(manifest.scope, manifestURL).pathname,
      start: new URL(manifest.start_url, manifestURL).pathname,
      icons,
    };
  });
  expect(offline.name).toBe("ÖSYM Mania");
  expect(offline.start).toBe(offline.scope);
  expect(offline.favicon).toContain("#ffabc0");
  expect(offline.icons).toEqual(expect.arrayContaining([
    { purpose: "any", width: 192, height: 192, path: offline.scope + "icon-192.png" },
    { purpose: "any", width: 512, height: 512, path: offline.scope + "icon.png" },
    { purpose: "maskable", width: 512, height: 512, path: offline.scope + "icon-maskable.png" },
  ]));
});
