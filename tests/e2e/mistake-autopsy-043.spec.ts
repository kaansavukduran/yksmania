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

test("043 mistakes take a reason tag and a closed-book retry that persist offline without changing learning records", async ({ page, context }) => {
  test.setTimeout(120_000);
  await page.goto("/");
  await nav(page, "Konu Anlatımı");
  await page.getByRole("button", { name: "TYT", exact: true }).click();
  const subject = page.getByRole("button", { name: /Matematik.*31/ });
  if ((await subject.getAttribute("aria-expanded")) !== "true") await subject.click();
  await page.getByRole("button", { name: /Rasyonel sayılar.*45/ }).click();
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  await expect(page.locator(".question-panel")).toBeVisible();
  // Answer every question; pick a wrong option on the first one.
  const total = Number((await page.locator(".question-meta").innerText()).match(/\/\s*(\d+)/)![1]);
  for (let q = 0; q < total; q++) {
    const options = page.locator(".answer");
    // Choose option index 0 on first question, last option elsewhere: at least one is wrong.
    await options.nth(q === 0 ? 0 : (await options.count()) - 1).click();
    await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
    const last = q === total - 1;
    await page.getByRole("button", { name: last ? "Çalışmayı kaydet" : "Sonraki soru", exact: true }).click();
  }
  await expect(page.getByRole("heading", { name: "Bir adım daha ilerledin." })).toBeVisible();
  const before = await stored(page);
  await nav(page, "Yanlışlarım");
  const card = page.locator(".mistake-card").first();
  await expect(card).toBeVisible();
  await expect(page.getByRole("region", { name: "Hata haritası" })).toBeVisible();
  await card.getByRole("button", { name: "İşlem hatası", exact: true }).click();
  await expect(card.getByRole("button", { name: "İşlem hatası", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(card.locator(".reason-advice")).toContainText("ters işlemle");
  await expect(page.locator(".mistake-map li").filter({ hasText: "İşlem hatası" }).locator("strong")).toHaveText("1");

  await card.getByRole("button", { name: "Kapatıp yeniden çöz", exact: true }).click();
  const retry = card.getByRole("group", { name: "Yeniden çöz" });
  await expect(retry.locator(".retry-option").first()).toBeVisible();
  // Try every option until the right one; feedback appears each time.
  const n = await retry.locator(".retry-option").count();
  for (let i = 0; i < n; i++) {
    await retry.locator(".retry-option").nth(i).click();
    if (await retry.locator(".retry-msg.ok").count()) break;
    await expect(retry.locator(".retry-msg")).toContainText("Henüz değil");
  }
  await expect(retry.locator(".retry-msg.ok")).toContainText("benzer bir soru");

  await expect.poll(async () => Object.keys((await stored(page)).explorations).filter((k) => k.startsWith("mistake:")).length).toBe(1);
  const after = await stored(page);
  expect(after.sessions).toEqual(before.sessions);
  expect(after.reviews).toEqual(before.reviews);
  expect(after.topicProgress).toEqual(before.topicProgress);

  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await context.setOffline(true);
  await page.reload();
  await nav(page, "Yanlışlarım");
  await expect(page.locator(".mistake-card").first().getByRole("button", { name: "İşlem hatası", exact: true })).toHaveAttribute("aria-pressed", "true");
});
