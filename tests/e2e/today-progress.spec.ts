import { setThemePreference } from "./helpers/theme";
import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { initialState } from "../../src/domain/model";

test.use({ locale: "tr-TR", timezoneId: "UTC" });
test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-11-14T12:00:00Z"));
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Bugün", exact: true }),
  ).toBeVisible();
});
async function nav(page: Page, name: string) {
  await expect(page.locator(".sidebar")).toBeAttached();
  const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page
    .locator(".sidebar")
    .getByRole("button", { name, exact: true })
    .click();
}
const card = (page: Page, mode = "Konu planı") =>
  page.getByRole("region", { name: mode, exact: true });
const row = (page: Page, mode = "Konu planı") =>
  card(page, mode)
    .getByRole("list", { name: "Bugünün konuları", exact: true })
    .locator("li")
    .filter({ hasText: "Simyadan kimyaya" });
async function solve(page: Page, answers: number[], hint = false) {
  await expect(page.locator(".question-panel")).toBeVisible();
  for (const [i, answer] of answers.entries()) {
    if (hint && i === 0)
      await page.getByRole("button", { name: "İpucu al", exact: true }).click();
    await page.locator(".answer").nth(answer).click();
    await page
      .getByRole("button", { name: "Cevabı kontrol et", exact: true })
      .click();
    await page
      .getByRole("button", {
        name: i === 4 ? "Çalışmayı kaydet" : "Sonraki soru",
        exact: true,
      })
      .click();
  }
  await expect(page.locator(".result-stats")).toBeVisible();
}
async function openSimya(page: Page) {
  await card(page)
    .locator(".planned-topics")
    .getByRole("button", { name: /Simyadan kimyaya/ })
    .first()
    .click();
  await expect(
    page.getByRole("heading", {
      name: "Simyadan kimyaya: amaç, yöntem ve kanıt",
      exact: true,
    }),
  ).toBeVisible();
}

test("YKS-013 completed daily topics retain the actual four-of-five score offline and link to its saved result", async ({
  page,
  context,
}) => {
  await openSimya(page);
  await page
    .getByRole("button", { name: "Konuyu çalıştım", exact: true })
    .click();
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  await solve(page, [1, 1, 2, 0, 0]);
  await page.getByRole("button", { name: "Bugüne dön", exact: true }).click();
  await expect(row(page)).toContainText("Konu tamamlandı");
  await expect(row(page)).toContainText("5 soruda 4 doğru · 1 yanlış");
  await expect(row(page, "Soru planı")).toContainText("Sorular tamamlandı");
  await expect(row(page, "Soru planı")).toContainText(
    "5 soruda 4 doğru · 1 yanlış",
  );
  await expect(card(page)).toContainText(
    "Bugünün hedefi: 5 konu · 1 tamamlandı",
  );
  await expect(
    card(page)
      .getByRole("list", { name: "Bugünün konuları", exact: true })
      .locator("li"),
  ).toHaveCount(5);
  await page.setViewportSize({ width: 390, height: 844 });
  await card(page).screenshot({
    path: test.info().outputPath("today-progress-dark-mobile.png"),
  });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.locator(".daily-study-plans").screenshot({
    path: test.info().outputPath("today-progress-dark-desktop.png"),
  });
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await context.setOffline(true);
  await page.reload();
  await expect(row(page)).toContainText("5 soruda 4 doğru · 1 yanlış");
  await row(page)
    .getByRole("button", { name: "Sonucu gör", exact: true })
    .click();
  await expect(page.locator(".result-stats")).toContainText("4/5");
  await page.getByRole("button", { name: "Bugüne dön", exact: true }).click();
  await card(page)
    .getByText("Tüm çalışma sırası ve tarihler (507)", { exact: true })
    .click();
  const full = card(page)
    .locator(".plan-full-order li")
    .filter({ hasText: "Simyadan kimyaya" });
  await expect(full).toContainText("Konu tamamlandı");
  await expect(full).toContainText("5 soruda 4 doğru · 1 yanlış");
});

test("YKS-013 existing question-only records show their score and allow explicit durable theory completion on a small screen", async ({
  page,
  context,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openSimya(page);
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  await solve(page, [1, 1, 2, 0, 0], true);
  await page.getByRole("button", { name: "Bugüne dön", exact: true }).click();
  await expect(row(page)).toContainText("Konu henüz işaretlenmedi");
  await expect(row(page)).toContainText("5 soruda 4 doğru · 1 yanlış");
  await expect(row(page)).toContainText(
    "3 bağımsız doğru · 1 soruda ipucu kullanıldı",
  );
  await expect(card(page)).toContainText("507 kalan konu");
  await page.evaluate(() => {
    const put = IDBObjectStore.prototype.put;
    IDBObjectStore.prototype.put = function (
      ...args: Parameters<IDBObjectStore["put"]>
    ) {
      if ((window as any).__failTopic && this.name === "state")
        throw new DOMException("Synthetic disk full", "QuotaExceededError");
      return put.apply(this, args);
    };
    (window as any).__failTopic = true;
  });
  await row(page)
    .getByRole("button", { name: "Konuyu çalıştım", exact: true })
    .click();
  await expect(page.locator(".error-banner")).toBeVisible();
  await expect(row(page)).not.toContainText("Konu tamamlandı");
  await page.evaluate(() => {
    (window as any).__failTopic = false;
  });
  await row(page)
    .getByRole("button", { name: "Konuyu çalıştım", exact: true })
    .click();
  await expect(row(page)).toContainText("Konu tamamlandı");
  await expect(card(page)).toContainText("506 kalan konu");
  await expect(card(page, "Soru planı")).toContainText("506 kalan konu");
  await nav(page, "Ayarlar");
  await setThemePreference(page, "light");
  await page
    .getByRole("slider", { name: "Arayüz ölçeği", exact: true })
    .fill("200");
  await page
    .getByRole("slider", { name: "Yalnızca yazı boyutu", exact: true })
    .fill("150");
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await nav(page, "Bugün");
  await page.setViewportSize({ width: 320, height: 844 });
  await expect(row(page)).toContainText("5 soruda 4 doğru · 1 yanlış");
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(321);
  const skip = page.locator(".skip-link");
  await expect(skip).not.toBeFocused();
  expect(
    await skip.evaluate((element) => element.getBoundingClientRect().bottom),
  ).toBeLessThanOrEqual(0);

  expect(
    (
      await new AxeBuilder({ page }).include(".daily-study-plans").analyze()
    ).violations.filter((v) =>
      ["critical", "serious"].includes(v.impact ?? ""),
    ),
  ).toEqual([]);
  const undo = row(page).getByRole("button", {
    name: "Çalışma kaydını geri al",
    exact: true,
  });
  await undo.click();
  await expect(row(page)).toContainText("Konu henüz işaretlenmedi");
  await expect(row(page)).toContainText("5 soruda 4 doğru · 1 yanlış");
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await context.setOffline(true);
  await page.reload();
  await expect(row(page)).toContainText("Konu henüz işaretlenmedi");
  await page.keyboard.press("Tab");
  await expect(skip).toBeFocused();
  const bounds = await skip.boundingBox();
  expect(bounds!.x).toBeGreaterThanOrEqual(0);
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(321);
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
  expect(
    await skip.evaluate((element) => element.getBoundingClientRect().bottom),
  ).toBeLessThanOrEqual(0);
  await row(page)
    .getByRole("button", { name: "Sonucu gör", exact: true })
    .click();
  await expect(page.locator(".result-stats")).toContainText("4/5");
});

test("YKS-013 latest attempts show zero correctly and undo restores the earlier score without summing attempts", async ({
  page,
}) => {
  await openSimya(page);
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  await solve(page, [1, 1, 2, 0, 0]);
  await page.clock.setFixedTime(new Date("2026-11-14T12:05:00Z"));
  await page
    .getByRole("button", { name: "Yeniden çalış", exact: true })
    .click();
  await solve(page, [0, 0, 0, 1, 0]);
  await page.getByRole("button", { name: "Bugüne dön", exact: true }).click();
  await expect(row(page)).toContainText("5 soruda 0 doğru · 5 yanlış");
  await expect(row(page)).not.toContainText("5 soruda 4 doğru");
  await nav(page, "Yanlışlarım");
  await page
    .getByRole("button", { name: "Çalışma geçmişi", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Bu oturumu geri al", exact: true })
    .first()
    .click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Oturumu geri al", exact: true })
    .click();
  await nav(page, "Bugün");
  await expect(row(page)).toContainText("5 soruda 4 doğru · 1 yanlış");
  await expect(row(page, "Soru planı")).toContainText("Sorular tamamlandı");
});

test("YKS-013 external question work has no invented score and stays visible on a closed day", async ({
  page,
}) => {
  // Historical source-study records remain legible, but the removed external
  // study workflow must not be recreated just to make this legacy record.
  await page.evaluate(
    (initial) =>
      new Promise<void>((resolve, reject) => {
        const req = indexedDB.open("yksmania");
        req.onsuccess = () => {
          const db = req.result,
            tx = db.transaction("state", "readwrite"),
            store = tx.objectStore("state"),
            read = store.get("current");
          read.onsuccess = () => {
            const current = read.result ?? initial;
            store.put(
              {
                ...current,
                topicProgress: {
                  ...current.topicProgress,
                  "detail-139": { questions: "2026-11-14" },
                },
              },
              "current",
            );
          };
          tx.oncomplete = () => {
            db.close();
            resolve();
          };
          tx.onerror = () => reject(tx.error);
        };
        req.onerror = () => reject(req.error);
      }),
    initialState(),
  );
  await page.reload();
  await nav(page, "Takvim");
  await page.getByRole("button", { name: "Cmt", exact: true }).click();
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await nav(page, "Bugün");
  await expect(card(page, "Soru planı")).toContainText("Bugün müsait değil");
  await expect(row(page, "Soru planı")).toContainText("Sorular tamamlandı");
  await expect(row(page, "Soru planı")).toContainText(
    "soru sonucu kaydedilmedi",
  );
  await expect(row(page, "Soru planı")).not.toContainText("Son sonuç");
  await expect(card(page)).toContainText("507 kalan konu");
});
