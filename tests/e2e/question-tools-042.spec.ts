import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.use({ locale: "tr-TR", timezoneId: "Europe/Istanbul" });

async function nav(page: Page, name: string) {
  const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page.locator(".sidebar").getByRole("button", { name, exact: true }).click();
}
async function startPractice(page: Page) {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Bugün", exact: true })).toBeVisible();
  await nav(page, "Konu Anlatımı");
  await page.getByRole("button", { name: "TYT", exact: true }).click();
  const subject = page.getByRole("button", { name: /Matematik.*31/ });
  if ((await subject.getAttribute("aria-expanded")) !== "true") await subject.click();
  await page.getByRole("button", { name: /Rasyonel sayılar.*45/ }).click();
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  await expect(page.locator(".question-panel")).toBeVisible();
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
  test(`042 strike-through, keyboard answering and scratch paper work at ${width}px without saving marks or awarding credit`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await startPractice(page);
    const before = await stored(page);
    const answers = page.locator(".answer");
    expect(await answers.count()).toBeGreaterThanOrEqual(3);

    // Strike out B, then choosing it lifts the strike.
    const strikeB = page.getByRole("button", { name: "B şıkkını ele", exact: true });
    await strikeB.click();
    await expect(answers.nth(1)).toHaveClass(/answer-struck/);
    await expect(page.getByRole("button", { name: "B şıkkını geri al", exact: true })).toHaveAttribute("aria-pressed", "true");
    const strikeBox = await page.getByRole("button", { name: "B şıkkını geri al", exact: true }).boundingBox();
    expect(strikeBox!.width).toBeGreaterThanOrEqual(44);
    expect(strikeBox!.height).toBeGreaterThanOrEqual(44);
    // Strikes are not saved anywhere.
    expect(JSON.stringify((await stored(page)).draft ?? {})).not.toContain("struck");

    // Keyboard: "3" selects C, "1" selects A.
    await page.locator("body").press("3");
    await expect(answers.nth(2)).toHaveAttribute("aria-pressed", "true");
    await page.locator("body").press("1");
    await expect(answers.nth(0)).toHaveAttribute("aria-pressed", "true");
    await expect.poll(async () => (await stored(page)).draft.selected).toBe(0);

    // H opens the first hint step.
    await page.locator("body").press("h");
    await expect.poll(async () => (await stored(page)).draft.helpLevel ?? 0).toBeGreaterThanOrEqual(1);

    // Enter checks the answer.
    await page.locator("body").press("Enter");
    await expect(page.locator(".feedback")).toBeVisible();
    await expect(page.getByRole("button", { name: /şıkkını ele$/ })).toHaveCount(0);

    // Scratch paper draws and clears without saving.
    await page.getByRole("button", { name: "Karalama kâğıdı", exact: true }).click();
    const canvas = page.getByRole("img", { name: /Karalama kâğıdı/ });
    await expect(canvas).toBeVisible();
    const box = (await canvas.boundingBox())!;
    await page.mouse.move(box.x + 20, box.y + 20);
    await page.mouse.down();
    await page.mouse.move(box.x + 120, box.y + 80, { steps: 8 });
    await page.mouse.up();
    const inked = await canvas.evaluate((c) => {
      const el = c as HTMLCanvasElement;
      const data = el.getContext("2d")!.getImageData(0, 0, el.width, el.height).data;
      for (let i = 3; i < data.length; i += 4) if (data[i] > 0) return true;
      return false;
    });
    expect(inked).toBe(true);
    await page.getByRole("button", { name: "Temizle", exact: true }).click();

    const results = await new AxeBuilder({ page }).include(".question-panel").analyze();
    expect(results.violations.filter((v) => v.impact === "serious" || v.impact === "critical")).toEqual([]);

    // No mastery or XP from strikes, shortcuts or scratch paper beyond the real attempt.
    const after = await stored(page);
    expect(after.sessions).toEqual(before.sessions);
    expect(after.topicProgress).toEqual(before.topicProgress);
  });
