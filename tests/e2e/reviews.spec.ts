import { test, expect, type Page } from "@playwright/test";
test.use({ locale: "tr-TR", timezoneId: "UTC" });
async function nav(page: Page, name: string) {
  const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page
    .locator(".sidebar")
    .getByRole("button", { name, exact: true })
    .click();
}
async function stored(page: Page) {
  return page.evaluate(
    () =>
      new Promise<any>((resolve, reject) => {
        const r = indexedDB.open("yksmania");
        r.onsuccess = () => {
          const d = r.result,
            q = d.transaction("state").objectStore("state").get("current");
          q.onsuccess = () => {
            resolve(q.result);
            d.close();
          };
          q.onerror = () => reject(q.error);
        };
        r.onerror = () => reject(r.error);
      }),
  );
}
const queue = (page: Page) =>
  page.getByRole("region", { name: "Önce tekrar et", exact: true });
async function mark(page: Page) {
  await page.clock.setFixedTime(new Date("2026-11-14T12:00:00Z"));
  await page.goto("/");
  await page.locator(".hero .primary").click();
  await page
    .getByRole("button", { name: "Konuyu çalıştım", exact: true })
    .click();
  await expect(page.locator(".topic-repeat-targets")).toContainText(
    "İlk tekrar (3. gün): 16/11/2026",
  );
}

test("YKS-014 theory study creates day-3/7/21 recall before new topics, with durable explicit completion and undo", async ({
  page,
  context,
}) => {
  await mark(page);
  expect((await stored(page)).sessions).toEqual([]);
  for (const [day, label, stage] of [
    ["2026-11-16", "İlk tekrar", 3],
    ["2026-11-20", "İkinci tekrar", 7],
    ["2026-12-04", "Son tekrar", 21],
  ] as const) {
    await page.clock.setFixedTime(new Date(day + "T12:00:00Z"));
    await nav(page, "Bugün");
    await page.reload();
    await expect(queue(page)).toContainText(`Simyadan kimyaya (${label})`);
    const a = await queue(page).boundingBox(),
      b = await page
        .getByRole("region", { name: "Bugünün çalışma yolu", exact: true })
        .boundingBox();
    expect(a!.y + a!.height).toBeLessThanOrEqual(b!.y);
    await page
      .getByRole("button", { name: "Tekrara başla", exact: true })
      .click();
    await expect(
      page.getByRole("region", { name: "Konu tekrarı kaydı", exact: true }),
    ).toContainText(`${stage}. gün (${label})`);
    await page
      .getByRole("button", { name: "Tekrarı tamamladım", exact: true })
      .click();
    await expect(
      page.getByRole("button", { name: "Tekrar kaydını geri al", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    await nav(page, "Bugün");
    await expect(queue(page)).toContainText("Tekrar tamamlandı");
  }
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await context.setOffline(true);
  await page.reload();
  await queue(page)
    .getByRole("button", { name: "Tekrarı aç", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Tekrar kaydını geri al", exact: true })
    .click();
  await nav(page, "Bugün");
  await expect(
    queue(page).getByRole("button", { name: "Tekrar et", exact: true }),
  ).toBeVisible();
  const s = await stored(page);
  expect(s.sessions).toEqual([]);
  expect(s.reviews).toEqual([]);
  expect(s.theoryReviewCompletions).toHaveLength(2);
  expect(s.topicProgress["detail-139"].theory).toBe("2026-11-14");
});

test("YKS-014 repeats share closed-day capacity and a failed topic-repeat write never reports success", async ({
  page,
}) => {
  await mark(page);
  await nav(page, "Takvim");
  await page
    .getByRole("textbox", { name: "Tek tarih kapat", exact: true })
    .fill("16/11/2026");
  await page.getByRole("button", { name: "Ekle", exact: true }).click();
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await page.clock.setFixedTime(new Date("2026-11-16T12:00:00Z"));
  await nav(page, "Bugün");
  await page.reload();
  await expect(queue(page)).toContainText("Bugün kapalı");
  await page.clock.setFixedTime(new Date("2026-11-17T12:00:00Z"));
  await page.reload();
  await expect(queue(page)).toContainText(
    "Özgün tarih: 16/11/2026 · Bugüne yerleştirildi",
  );
  await queue(page)
    .getByRole("button", { name: "Tekrar et", exact: true })
    .click();
  await page.evaluate(() => {
    const put = IDBObjectStore.prototype.put;
    IDBObjectStore.prototype.put = function (
      ...args: Parameters<IDBObjectStore["put"]>
    ) {
      if ((window as any).__failRepeat && this.name === "state")
        throw new DOMException("Synthetic full disk", "QuotaExceededError");
      return put.apply(this, args);
    };
    (window as any).__failRepeat = true;
  });
  await page
    .getByRole("button", { name: "Tekrarı tamamladım", exact: true })
    .click();
  await expect(page.locator(".error-banner")).toBeVisible();
  expect((await stored(page)).theoryReviewCompletions).toEqual([]);
  await page.evaluate(() => {
    (window as any).__failRepeat = false;
  });
  await page
    .getByRole("button", { name: "Tekrarı tamamladım", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Tekrar kaydını geri al", exact: true }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Tekrar kaydını geri al", exact: true }),
  ).toBeVisible();
});
