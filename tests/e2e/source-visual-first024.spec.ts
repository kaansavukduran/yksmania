import { test, expect, type Page } from "@playwright/test";

async function stored(page: Page) {
  return page.evaluate(() => new Promise<Record<string, unknown>>((resolve, reject) => {
    const request = indexedDB.open("yksmania");
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const read = db.transaction("state").objectStore("state").get("current");
      read.onsuccess = () => { db.close(); resolve(read.result); };
      read.onerror = () => { db.close(); reject(read.error); };
    };
  }));
}

const units = [
  { id: "tyt-mat-mutlak-deger-kaynak-038", query: "Mutlak değer: uzaklık", selector: "[data-forge038]", slider: "Deneme x payı" },
  { id: "tyt-mat-uslu-sayilar-kaynak-039", query: "Üslü sayılar: çarpan", selector: ".f039-lab", slider: "Tam sayı üs" },
];

for (const unit of units) {
  test(`${unit.id}: the first ordinary and guided section contains a working offline model`, async ({ page, context }) => {
    await page.goto("/");
    await page.waitForFunction(() => navigator.serviceWorker.controller?.state === "activated");
    await context.setOffline(true);
    await page.locator(".sidebar").getByRole("button", { name: "Konu Anlatımı", exact: true }).click();
    await page.getByRole("button", { name: "TYT", exact: true }).click();
    await page.getByRole("textbox", { name: "Ders veya konu ara", exact: true }).fill(unit.query);
    await page.locator(`.ready-topic[data-lesson-id="${unit.id}"]`).click();
    const lab = page.locator(".guide-section").first().locator(unit.selector);
    await expect(lab).toBeVisible();
    const note = "İlk bölümdeki şekille çalışırken bu not korunur.";
    await page.getByRole("textbox", { name: "Notun", exact: true }).fill(note);
    await expect.poll(async () => (await stored(page))?.notes).toMatchObject({
      [`lesson:${unit.id}`]: note,
    });
    const before = await stored(page);
    // One numbered-page reader; the model stays on the first page.
    await expect(page.locator(".guide-section").first().locator(".page-label")).toContainText("Sayfa 1 /");
    await expect(lab).toBeVisible();
    const guidedChoices = JSON.stringify((await stored(page)).explorations);
    const svg = lab.locator("svg").first();
    const drawing = await svg.innerHTML();
    // In the powers model the exponent determines the number of factor dots;
    // changing a negative base alone deliberately keeps that count unchanged.
    const slider = lab.getByRole("slider", { name: unit.slider, exact: true });
    const initial = await slider.inputValue();
    await slider.focus();
    await slider.press("ArrowRight");
    await expect(slider).not.toHaveValue(initial);
    await expect.poll(() => svg.innerHTML()).not.toBe(drawing);
    if (unit.id === "tyt-mat-uslu-sayilar-kaynak-039")
      await expect(svg.locator("circle")).toHaveCount(5);
    await expect.poll(async () => JSON.stringify((await stored(page)).explorations)).not.toBe(guidedChoices);
    const { explorations: oldExplorations, ...oldRecords } = before;
    await expect.poll(async () => {
      const { explorations, ...records } = await stored(page);
      return records;
    }).toEqual(oldRecords);
    const value = await slider.inputValue();
    await page.reload();
    await expect(lab).toBeVisible();
    await expect(slider).toHaveValue(value);
    expect((await stored(page)).sessions).toEqual(oldRecords.sessions);
  });
}
