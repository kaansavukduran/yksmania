import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

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
  test(`044 tactic library opens worked examples at ${width}px without learning evidence`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Bugün", exact: true })).toBeVisible();
    const before = await stored(page);
    await nav(page, "Kopya Kağıtları");
    const library = page.locator(".tactic-library");
    await library.getByRole("button", { name: /Soru çözme taktikleri/ }).click();
    await expect(library.locator(".tactic-card")).toHaveCount(9);
    const card = library.locator(".tactic-card").filter({ has: page.locator(".tactic-title", { hasText: "Etkileşimden kuvvete" }) });
    await card.locator("summary").click();
    await expect(card).toContainText("Tuzak:");
    await expect(card.locator(".tactic-solution")).toHaveCount(0);
    const reveal = card.getByRole("button", { name: "Önce kendin dene, sonra çözümü göster" }).first();
    expect((await reveal.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    await reveal.click();
    await expect(card.locator(".tactic-answer").first()).toHaveText("Cevap: 6 m/s² sağa");
    const docWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(docWidth).toBeLessThanOrEqual(width + 1);
    const axe = await new AxeBuilder({ page }).include(".tactic-library").analyze();
    expect(axe.violations).toEqual([]);
    const after = await stored(page);
    expect(after?.sessions ?? []).toEqual(before?.sessions ?? []);
    expect(after?.topicProgress ?? {}).toEqual(before?.topicProgress ?? {});
    expect(after?.reviews ?? []).toEqual(before?.reviews ?? []);
  });
