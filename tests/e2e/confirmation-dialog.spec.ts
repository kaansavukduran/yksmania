import { typeset } from "../../src/domain/typeset";
import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { foundation013QuestionSets } from "../../src/learning/forge013FoundationQuestions";
import type { AppState } from "../../src/domain/model";

const math = foundation013QuestionSets.find(
  (p) => p.lessonId === "sayi-basamaklari",
)!;
const history = foundation013QuestionSets.find(
  (p) => p.lessonId === "tarih-zaman",
)!;
const draftTitle = "Yarım kalan çalışmayı değiştirelim mi?";
test.use({ locale: "tr-TR", timezoneId: "Europe/Istanbul" });
async function nav(page: Page, name: string) {
  const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page
    .locator(".sidebar")
    .getByRole("button", { name, exact: true })
    .click();
}
async function saved(page: Page) {
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
}
async function stored(page: Page): Promise<AppState> {
  return page.evaluate(
    () =>
      new Promise((resolve, reject) => {
        const request = indexedDB.open("yksmania");
        request.onsuccess = () => {
          const db = request.result;
          const record = db
            .transaction("state")
            .objectStore("state")
            .get("current");
          record.onsuccess = () => {
            db.close();
            resolve(record.result);
          };
          record.onerror = () => {
            db.close();
            reject(record.error);
          };
        };
        request.onerror = () => reject(request.error);
      }),
  );
}
async function ready(page: Page) {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Bugün", exact: true }),
  ).toBeVisible();
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller)
      await new Promise<void>((resolve) =>
        navigator.serviceWorker.addEventListener(
          "controllerchange",
          () => resolve(),
          { once: true },
        ),
      );
  });
}
async function entry(page: Page, title: string) {
  await nav(page, "Sorular");
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill(title);
  const lesson = [math, history].find((pack) => pack.lessonTitle === title);
  if (!lesson) throw new Error(`Unknown confirmation fixture title: ${title}`);
  return page.locator(`.ready-topic[data-lesson-id="${lesson.lessonId}"]`);
}
async function checkedMath(page: Page) {
  await (await entry(page, math.lessonTitle)).click();
  await expect(page.locator(".question-panel")).toBeVisible();
  await page
    .getByRole("textbox", { name: "Notun", exact: true })
    .fill("Korunacak kontrol edilmiş yanlış cevabım.");
  await page
    .locator(".answer")
    .nth((math.questions[0].answer + 1) % 5)
    .click();
  await page
    .getByRole("button", { name: "Cevabı kontrol et", exact: true })
    .click();
  await saved(page);
  await expect.poll(async () => (await stored(page)).draft?.checked).toBe(true);
}
function rejectNativeDialogs(page: Page) {
  page.on("dialog", () => {
    throw Error("A native JavaScript dialog must never be opened.");
  });
}

test("YKS-067 draft replacement cancels exactly, restores focus, and confirms one durable new card offline at 320px with large text", async ({
  page,
  context,
}) => {
  rejectNativeDialogs(page);
  await ready(page);
  await nav(page, "Ayarlar");
  await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
  await page.getByLabel("Yalnızca yazı boyutu %", { exact: true }).fill("150");
  await saved(page);
  await page.setViewportSize({ width: 320, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await context.setOffline(true);
  await checkedMath(page);
  const before = await stored(page);
  const button = await entry(page, history.lessonTitle);
  await button.click();
  const modal = page.getByRole("dialog", { name: draftTitle, exact: true });
  await expect(modal).toBeVisible();
  await expect(
    modal.getByRole("button", { name: "Vazgeç", exact: true }),
  ).toBeFocused();
  const geometry = await modal.evaluate((element) => ({
    width: element.getBoundingClientRect().width,
    scroll: element.scrollWidth,
    client: element.clientWidth,
  }));
  expect(geometry.width).toBeLessThanOrEqual(320);
  expect(geometry.scroll).toBeLessThanOrEqual(geometry.client + 1);
  for (const action of ["Vazgeç", "Yeni çalışmayı aç"]) {
    const control = modal.getByRole("button", { name: action, exact: true });
    await expect(control).toBeVisible();
    expect(
      await control.evaluate((el) => parseFloat(getComputedStyle(el).fontSize)),
    ).toBeGreaterThanOrEqual(40);
  }
  expect(
    (
      await new AxeBuilder({ page })
        .include(".confirmation-dialog[open]")
        .analyze()
    ).violations.filter((v) =>
      ["critical", "serious"].includes(v.impact ?? ""),
    ),
  ).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(modal).not.toBeVisible();
  await expect(button).toBeFocused();
  expect(await stored(page)).toEqual(before);
  await button.click();
  await modal.getByRole("button", { name: "Vazgeç", exact: true }).click();
  await expect(button).toBeFocused();
  expect(await stored(page)).toEqual(before);
  await button.click();
  await modal
    .getByRole("button", { name: "Yeni çalışmayı aç", exact: true })
    .click({ clickCount: 2 });
  await expect(page.locator(".question-panel h2")).toHaveText(typeset(history.questions[0].prompt.tr));
  await saved(page);
  const after = await stored(page);
  expect(after).toEqual({
    ...before,
    draft: {
      lessonId: history.lessonId,
      phase: "practice",
      index: 0,
      responses: [],
      selected: null,
      checked: false,
      hint: false,
      confidence: "medium",
      note: before.notes["lesson:" + history.lessonId] ?? "",
      startedAt: after.draft!.startedAt,
    },
  });
  await page.reload();
  await expect(page.locator(".question-panel h2")).toHaveText(typeset(history.questions[0].prompt.tr));
  expect(await stored(page)).toEqual(after);
});

test("YKS-067 failed replacement retains the checked draft and retry still requires explicit HTML confirmation", async ({
  page,
}) => {
  rejectNativeDialogs(page);
  await ready(page);
  await checkedMath(page);
  const before = await stored(page);
  const button = await entry(page, history.lessonTitle);
  await page.evaluate(() => {
    const original = IDBObjectStore.prototype.put;
    IDBObjectStore.prototype.put = function (
      ...args: Parameters<IDBObjectStore["put"]>
    ) {
      if (this.name === "state" && (window as any).__failConfirmWrite)
        throw new DOMException("Synthetic disk full", "QuotaExceededError");
      return original.apply(this, args);
    };
    (window as any).__failConfirmWrite = true;
  });
  await button.click();
  const modal = page.getByRole("dialog", { name: draftTitle, exact: true });
  await modal
    .getByRole("button", { name: "Yeni çalışmayı aç", exact: true })
    .click();
  await expect(page.locator(".error-banner")).toBeVisible();
  expect(await stored(page)).toEqual(before);
  await page.evaluate(() => {
    (window as any).__failConfirmWrite = false;
  });
  await button.click();
  await expect(modal).toBeVisible();
  expect(await stored(page)).toEqual(before);
  await modal
    .getByRole("button", { name: "Yeni çalışmayı aç", exact: true })
    .click();
  await expect(page.locator(".question-panel h2")).toHaveText(typeset(history.questions[0].prompt.tr));
  await saved(page);
  expect((await stored(page)).draft?.lessonId).toBe(history.lessonId);
});

test("YKS-067 backup restore is cancellable without writes and replaces state only after accessible confirmation offline", async ({
  page,
  context,
}) => {
  rejectNativeDialogs(page);
  await ready(page);
  await checkedMath(page);
  await nav(page, "Ayarlar");
  const before = await stored(page);
  const backup = {
    ...before,
    draft: null,
    notes: { restored: "Yalnızca açık onayla geri yüklenen kişisel not." },
    settings: { ...before.settings, theme: "light" as const },
  };
  const input = page.locator('input[type="file"]');
  const file = {
    name: "progress.json",
    mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(backup)),
  };
  await context.setOffline(true);
  await input.setInputFiles(file);
  const modal = page.getByRole("dialog", {
    name: "İlerleme yedeğini geri yükleyelim mi?",
    exact: true,
  });
  await expect(
    modal.getByRole("button", { name: "Vazgeç", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(modal).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Yedekten geri yükle", exact: true }),
  ).toBeFocused();
  expect(await stored(page)).toEqual(before);
  await expect(input).toHaveValue("");
  await input.setInputFiles(file);
  await modal.getByRole("button", { name: "Vazgeç", exact: true }).click();
  await expect(modal).not.toBeVisible();
  expect(await stored(page)).toEqual(before);
  await input.setInputFiles(file);
  await modal
    .getByRole("button", { name: "Yedeği geri yükle", exact: true })
    .click({ clickCount: 2 });
  await expect(page.locator(".toast")).toHaveText("Yedek geri yüklendi.");
  await saved(page);
  expect(await stored(page)).toEqual(backup);
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Ayarlar", exact: true }),
  ).toBeVisible();
  expect(await stored(page)).toEqual(backup);
});

test("YKS-067 session undo cancels exactly and one confirmed undo removes only its session and linked reviews offline", async ({
  page,
  context,
}) => {
  rejectNativeDialogs(page);
  await ready(page);
  await context.setOffline(true);
  await (await entry(page, math.lessonTitle)).click();
  for (const [i, question] of math.questions.entries()) {
    await page.locator(".answer").nth(question.answer).click();
    await page
      .getByRole("button", { name: "Cevabı kontrol et", exact: true })
      .click();
    await page
      .getByRole("button", {
        name:
          i === math.questions.length - 1 ? "Çalışmayı kaydet" : "Sonraki soru",
        exact: true,
      })
      .click();
  }
  await expect(page.locator(".result-stats")).toContainText("10/10");
  await saved(page);
  await nav(page, "Yanlışlarım");
  await page
    .getByRole("button", { name: "Çalışma geçmişi", exact: true })
    .click();
  const before = await stored(page);
  expect(before.sessions).toHaveLength(1);
  expect(before.reviews).toHaveLength(3);
  const undo = page.getByRole("button", {
    name: "Bu oturumu geri al",
    exact: true,
  });
  await undo.click();
  const modal = page.getByRole("dialog", {
    name: "Bu çalışma oturumunu geri alalım mı?",
    exact: true,
  });
  await expect(
    modal.getByRole("button", { name: "Vazgeç", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(undo).toBeFocused();
  expect(await stored(page)).toEqual(before);
  await undo.click();
  await modal.getByRole("button", { name: "Vazgeç", exact: true }).click();
  await expect(undo).toBeFocused();
  expect(await stored(page)).toEqual(before);
  await undo.click();
  await modal
    .getByRole("button", { name: "Oturumu geri al", exact: true })
    .click({ clickCount: 2 });
  await expect(page.locator(".history-row")).toHaveCount(0);
  await saved(page);
  const after = await stored(page);
  expect(after).toEqual({ ...before, sessions: [], reviews: [] });
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Yanlışlarım", exact: true }),
  ).toBeVisible();
  expect(await stored(page)).toEqual(after);
});
