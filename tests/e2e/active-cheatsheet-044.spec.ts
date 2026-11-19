import { test, expect, type Page } from "@playwright/test";

test.use({ locale: "tr-TR", timezoneId: "Europe/Istanbul" });

async function nav(page: Page, name: string) {
  const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page.locator(".sidebar").getByRole("button", { name, exact: true }).click();
}
async function stored(page: Page) {
  return page.evaluate(
    () =>
      new Promise<any>((resolve, reject) => {
        const request = indexedDB.open("yksmania", 2);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const db = request.result;
          const read = db.transaction("state").objectStore("state").get("current");
          read.onsuccess = () => {
            resolve(read.result);
            db.close();
          };
        };
      }),
  );
}

for (const width of [1280, 320])
  test(`044 cheat sheet self-test hides formula results until revealed at ${width}px without saving`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Bugün", exact: true })).toBeVisible();
    const before = await stored(page);
    await nav(page, "Kopya Kağıtları");
    await page.getByRole("textbox", { name: "Ders veya konu ara", exact: true }).fill("Silindir, koni ve küre");
    await page.locator(".cheatsheet-topic").filter({ hasText: "Silindir, koni ve küre" }).first().click();
    const reader = page.locator(".cheat-reader");
    await expect(reader).toBeVisible();
    await expect(reader).toContainText("V = πr²h");
    await reader.getByRole("button", { name: "Kendini sına: formülleri gizle", exact: true }).click();
    const gaps = reader.locator(".cloze-gap");
    expect(await gaps.count()).toBeGreaterThanOrEqual(5);
    await expect(reader.locator(".cheat-sections")).not.toContainText("πr²h;");
    const first = gaps.first();
    const box = (await first.boundingBox())!;
    expect(box.width).toBeGreaterThanOrEqual(44);
    await first.click();
    await expect(reader.locator(".cloze-open").first()).toBeVisible();
    const docWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(docWidth).toBeLessThanOrEqual(width + 1);
    await reader.getByRole("button", { name: "Kendini sına: kapat", exact: true }).click();
    await expect(reader).toContainText("V = πr²h");
    const after = await stored(page);
    expect(after?.sessions ?? []).toEqual(before?.sessions ?? []);
    expect(after?.topicProgress ?? {}).toEqual(before?.topicProgress ?? {});
    expect(after?.reviews ?? []).toEqual(before?.reviews ?? []);
  });
