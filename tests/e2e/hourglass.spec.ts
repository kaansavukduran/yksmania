import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { initialState } from "../../src/domain/model";
import { samplePdf } from "./helpers/pdf";
test.use({ locale: "tr-TR", hasTouch: true });
async function nav(page: Page, name: string) {
  const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page
    .locator(".sidebar")
    .getByRole("button", { name, exact: true })
    .click();
}
async function rational(page: Page) {
  await nav(page, "Konu Anlatımı");
  await page.getByRole("button", { name: /Matematik.*31 konu/ }).click();
  await page.getByRole("button", { name: /Rasyonel sayılar.*45/ }).click();
  await expect(page.locator(".study-title h1")).toHaveText("Rasyonel sayılar");
}
async function saved(page: Page) {
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
}
async function stored(page: Page) {
  return page.evaluate(
    () =>
      new Promise<any>((resolve, reject) => {
        const r = indexedDB.open("yksmania");
        r.onsuccess = () => {
          const db = r.result,
            q = db.transaction("state").objectStore("state").get("current");
          q.onsuccess = () => {
            resolve(q.result);
            db.close();
          };
          q.onerror = () => reject(q.error);
        };
        r.onerror = () => reject(r.error);
      }),
  );
}

test("hourglass keeps its real deadline across theory, sheets, questions and offline reload without awarding progress", async ({
  page,
  context,
}) => {
  await page.clock.install({ time: new Date("2026-11-14T12:00:00Z") });
  await page.clock.pauseAt(new Date("2026-11-14T12:00:01Z"));
  await page.goto("/");
  await rational(page);
  await expect(page.locator(".hourglass-time")).toHaveText("05:00");
  await page
    .getByRole("button", {
      name: "Kum saatini ters çevir ve başlat",
      exact: true,
    })
    .tap();
  await expect(page.locator(".hourglass-state")).toHaveText("Kum akıyor");
  await page.clock.fastForward(60000);
  await expect(page.locator(".hourglass-time")).toHaveText("04:00");
  await page.getByRole("button", { name: "Durdur", exact: true }).click();
  await saved(page);
  await page.clock.fastForward(600000);
  await expect(page.locator(".hourglass-time")).toHaveText("04:00");
  await page.goto("/#/cheatsheets");
  await expect(
    page.getByRole("heading", { name: "Kopya Kağıtları", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".hourglass-state")).toHaveText("Duraklatıldı");
  await nav(page, "Sorular");
  await page.getByRole("button", { name: /Matematik.*31 konu/ }).click();
  await page
    .getByRole("button", { name: /Rasyonel sayılar.*5 özgün soru/ })
    .click();
  await expect(page.locator(".question-panel")).toBeVisible();
  await expect(page.locator(".hourglass-time")).toHaveText("04:00");
  await page.getByRole("button", { name: "Devam et", exact: true }).click();
  await page.clock.fastForward(240100);
  await expect(page.locator(".hourglass-time")).toHaveText("00:00");
  await expect(page.locator(".hourglass-state")).toHaveText("Süre tamamlandı");
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await context.setOffline(true);
  await page.reload();
  await expect(page.locator(".hourglass-time")).toHaveText("00:00");
  expect((await stored(page)).sessions).toEqual([]);
  expect((await stored(page)).topicProgress).toEqual({});
  await page
    .getByRole("button", { name: "Kum saati süre ayarları", exact: true })
    .click();
  for (const [duration, value] of [
    [1, "01:00"],
    [5, "05:00"],
    [10, "10:00"],
    [20, "20:00"],
  ] as const) {
    if (
      !(await page
        .getByRole("button", { name: `${duration} dakika`, exact: true })
        .isVisible())
    )
      await page
        .getByRole("button", { name: "Kum saati süre ayarları", exact: true })
        .click();
    await page
      .getByRole("button", { name: `${duration} dakika`, exact: true })
      .click();
    await expect(page.locator(".hourglass-time")).toHaveText(value);
  }
  await page
    .getByRole("button", { name: "Kum saati süre ayarları", exact: true })
    .click();
  await page.getByRole("button", { name: "Özel süre", exact: true }).click();
  await page
    .getByRole("slider", { name: "Özel süre, dakika", exact: true })
    .fill("120");
  await page
    .getByRole("button", { name: "Süreyi uygula", exact: true })
    .click();
  await expect(page.locator(".hourglass-time")).toHaveText("2:00:00");
  await page
    .getByRole("button", { name: "Kum saati süre ayarları", exact: true })
    .click();
  await page
    .getByRole("spinbutton", {
      name: "Özel süreyi dakika olarak yaz",
      exact: true,
    })
    .fill("121");
  await expect(
    page.getByRole("button", { name: "Süreyi uygula", exact: true }),
  ).toBeDisabled();
  await expect(page.locator(".hourglass-time")).toHaveText("2:00:00");
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Kum saati süre ayarları", exact: true }),
  ).toBeFocused();
});

test("hourglass settings remain usable with touch, large text and reduced motion; a failed write retains the previous time", async ({
  page,
}) => {
  await page.goto("/");
  await nav(page, "Ayarlar");
  await page.getByLabel("Tema", { exact: true }).selectOption("light");
  await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
  await page.getByLabel("Yalnızca yazı boyutu %", { exact: true }).fill("150");
  await page.getByRole("switch", { name: /Aion animasyonu/ }).uncheck();
  await page.setViewportSize({ width: 320, height: 844 });
  await rational(page);
  await page
    .getByRole("button", { name: "Kum saati süre ayarları", exact: true })
    .tap();
  await expect(
    page.getByRole("button", { name: "1 dakika", exact: true }),
  ).toBeVisible();
  for (const name of ["1 dakika", "20 dakika"]) {
    const metrics = await page
      .getByRole("button", { name, exact: true })
      .evaluate((element) => {
        const style = getComputedStyle(element),
          canvas = document.createElement("canvas");
        const context = canvas.getContext("2d")!;
        context.font = style.font;
        return {
          available:
            element.clientWidth -
            parseFloat(style.paddingLeft) -
            parseFloat(style.paddingRight),
          word: context.measureText("dakika").width,
        };
      });
    expect(metrics.available).toBeGreaterThanOrEqual(metrics.word);
  }
  await page.evaluate(() => {
    const put = IDBObjectStore.prototype.put;
    IDBObjectStore.prototype.put = function (
      ...args: Parameters<IDBObjectStore["put"]>
    ) {
      if ((window as any).__failTimer && this.name === "state")
        throw new DOMException("Synthetic disk failure", "QuotaExceededError");
      return put.apply(this, args);
    };
    (window as any).__failTimer = true;
  });
  await page.getByRole("button", { name: "1 dakika", exact: true }).tap();
  await expect(page.locator(".timer-error")).toContainText(
    "Önceki süren korunuyor",
  );
  await expect(page.locator(".hourglass-time")).toHaveText("05:00");
  expect((await stored(page)).focusTimer.durationSeconds).toBe(300);
  await page.evaluate(() => {
    (window as any).__failTimer = false;
  });
  await page.getByRole("button", { name: "1 dakika", exact: true }).tap();
  await expect(page.locator(".hourglass-time")).toHaveText("01:00");
  await page
    .getByRole("button", {
      name: "Kum saatini ters çevir ve başlat",
      exact: true,
    })
    .tap();
  expect(
    await page
      .locator(".hourglass-turn")
      .evaluate((e) => getComputedStyle(e).animationName),
  ).toBe("none");
  for (const size of [
    { width: 320, height: 844 },
    { width: 844, height: 390 },
  ]) {
    await page.setViewportSize(size);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
  }
  expect(
    (await new AxeBuilder({ page }).analyze()).violations.filter((v) =>
      ["serious", "critical"].includes(v.impact ?? ""),
    ),
  ).toEqual([]);
});

test("progress reset is cancellable and atomic, preserves imported PDF/notes/settings, and stays reset offline", async ({
  page,
  context,
}) => {
  const seed = initialState();
  seed.notes = { personal: "Korunacak konu notum" };
  seed.topicProgress["detail-139"] = { theory: "2026-11-14" };
  seed.settings.theme = "light";
  seed.settings.blockedWeekdays = [0];
  await page.goto("/");
  await nav(page, "Ayarlar");
  page.once("dialog", (dialog) => dialog.accept());
  await page.locator('input[type="file"]').setInputFiles({
    name: "progress.json",
    mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(seed)),
  });
  await expect(page.locator(".toast")).toContainText("geri yüklendi");
  await rational(page);
  await page
    .getByRole("button", { name: "Kopya Kağıdını Görüntüle", exact: true })
    .click();
  const sheet = page.locator(".topic-cheatsheet");
  await sheet.getByLabel("Bu konunun kopya kağıdı PDF’si").setInputFiles({
    name: "notes.pdf",
    mimeType: "application/pdf",
    buffer: samplePdf(true),
  });
  await expect(sheet.locator("canvas")).toBeVisible();
  await sheet
    .getByRole("button", { name: "Sonraki sayfa", exact: true })
    .click();
  await sheet
    .getByRole("textbox", { name: "Notun", exact: true })
    .fill("PDF notum korunmalı");
  await saved(page);
  await page
    .getByRole("button", { name: "Kopya Kağıdını Görüntüle", exact: true })
    .click();
  await page.locator(".lesson-article > .primary").click();
  for (const index of [1, 2, 0, 1, 1]) {
    await page.locator(".answer").nth(index).click();
    await page.locator(".question-actions .primary").click();
    await page.locator(".question-actions .primary").click();
  }
  await expect(page.locator(".result-stats")).toContainText("5/5");
  const before = await stored(page);
  await nav(page, "Ayarlar");
  await page
    .getByRole("button", { name: "İlerlemeyi sıfırla", exact: true })
    .click();
  const modal = page.getByRole("dialog");
  await expect(
    modal.getByRole("button", { name: "Vazgeç", exact: true }),
  ).toBeFocused();
  expect(
    (await new AxeBuilder({ page }).analyze()).violations.filter((v) =>
      ["serious", "critical"].includes(v.impact ?? ""),
    ),
  ).toEqual([]);
  await modal.getByRole("button", { name: "Vazgeç", exact: true }).click();
  expect((await stored(page)).sessions).toHaveLength(1);
  await page
    .getByRole("button", { name: "İlerlemeyi sıfırla", exact: true })
    .click();
  await page.evaluate(() => {
    const put = IDBObjectStore.prototype.put;
    IDBObjectStore.prototype.put = function (
      ...args: Parameters<IDBObjectStore["put"]>
    ) {
      if ((window as any).__failReset && this.name === "state")
        throw new DOMException("Synthetic disk failure", "QuotaExceededError");
      return put.apply(this, args);
    };
    (window as any).__failReset = true;
  });
  await modal
    .getByRole("button", { name: "Evet, ilerlemeyi sıfırla", exact: true })
    .click();
  await expect(modal.getByRole("alert")).toContainText(
    "Önceki kayıtların korunuyor",
  );
  expect((await stored(page)).sessions).toHaveLength(1);
  await page.evaluate(() => {
    (window as any).__failReset = false;
  });
  await modal
    .getByRole("button", { name: "Evet, ilerlemeyi sıfırla", exact: true })
    .click();
  await expect(modal).not.toBeVisible();
  const after = await stored(page);
  expect(after.sessions).toEqual([]);
  expect(after.reviews).toEqual([]);
  expect(after.topicProgress).toEqual({});
  expect(after.notes).toEqual(before.notes);
  expect(after.settings).toEqual(before.settings);
  expect(after.readingPages).toEqual(before.readingPages);
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await context.setOffline(true);
  await page.reload();
  await nav(page, "Bugün");
  await expect(
    page.getByRole("region", { name: "Konu planı", exact: true }),
  ).toContainText("0/479");
  await expect(page.locator(".stat-number").first()).toHaveText("0");
  await rational(page);
  await page
    .getByRole("button", { name: "Kopya Kağıdını Görüntüle", exact: true })
    .click();
  await expect(sheet.locator("canvas")).toBeVisible();
  await expect(
    sheet.getByRole("spinbutton", { name: "PDF sayfası", exact: true }),
  ).toHaveValue("2");
  await expect(
    sheet.getByRole("textbox", { name: "Notun", exact: true }),
  ).toHaveValue("PDF notum korunmalı");
});
