import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { allFoundationPracticeSets } from "../../src/learning/forge013FoundationQuestions";
import type { Question } from "../../src/domain/model";
const titles = Object.fromEntries(
  allFoundationPracticeSets.map((pack) => [pack.lessonId, pack.lessonTitle]),
);
import type { AppState } from "../../src/domain/model";
test.use({ locale: "tr-TR", timezoneId: "Europe/Istanbul", hasTouch: true });
async function nav(page: Page, name: string) {
  const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page
    .locator(".sidebar")
    .getByRole("button", { name, exact: true })
    .click();
}
async function stored(page: Page): Promise<AppState> {
  return page.evaluate(
    () =>
      new Promise((resolve, reject) => {
        const request = indexedDB.open("yksmania");
        request.onsuccess = () => {
          const db = request.result,
            record = db
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
async function offlineReady(page: Page) {
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
async function open(
  page: Page,
  lessonId: string,
  mode: "Sorular" | "Konu Anlatımı",
) {
  const title = titles[lessonId];
  await nav(page, mode);
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill(title);
  const entry = page.locator(".ready-topic").filter({ hasText: title });
  await expect(entry).toHaveCount(1);
  await entry.click();
  if (mode === "Konu Anlatımı") {
    await expect(page.locator(".lesson-article")).toBeVisible();
    await page
      .getByRole("button", { name: "Sorulara geç", exact: true })
      .click();
  }
  await expect(page.locator(".question-panel")).toBeVisible();
}
async function assertPassageBeforeStem(page: Page, question: Question) {
  const passage = page.locator(".question-panel .question-passage");
  if (!question.passage?.tr) {
    await expect(passage).toHaveCount(0);
    return;
  }
  await expect(passage).toHaveText(question.passage.tr);
  expect(
    await page.locator(".question-panel").evaluate((panel) => {
      const context = panel.querySelector(".question-passage")!,
        stem = panel.querySelector("h2")!;
      return !!(
        context.compareDocumentPosition(stem) & Node.DOCUMENT_POSITION_FOLLOWING
      );
    }),
  ).toBe(true);
}

for (const pack of allFoundationPracticeSets) {
  test(`${pack.lessonId}: Questions opens offline and saves a real nine-of-ten result with day 3/7/21 reviews`, async ({
    page,
    context,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(String(error)));
    await page.goto("/");
    await offlineReady(page);
    await context.setOffline(true);
    await open(page, pack.lessonId, "Sorular");
    const questions = pack.questions;
    for (const [i, question] of questions.entries()) {
      await expect(page.locator(".question-meta")).toContainText(
        `Soru ${i + 1} / 10`,
      );
      await expect(page.locator(".question-panel h2")).toHaveText(
        question.prompt.tr,
      );
      await assertPassageBeforeStem(page, question);
      await expect(page.locator(".answer")).toHaveCount(5);
      for (const [j, option] of question.options.entries())
        await expect(page.locator(".answer").nth(j)).toContainText(option.tr);
      await page
        .locator(".answer")
        .nth(i === 0 ? (question.answer + 1) % 5 : question.answer)
        .tap();
      await page
        .getByRole("button", { name: "Cevabı kontrol et", exact: true })
        .tap();
      await expect(page.locator(".feedback p")).toHaveText(
        question.explanation.tr,
      );
      await expect(page.locator(".save-status")).toContainText(
        "Bu cihazda kaydedildi",
      );
      if (i === 0) {
        await expect
          .poll(async () => (await stored(page)).draft?.checked)
          .toBe(true);
        await page.reload();
        await expect(page.locator(".feedback p")).toHaveText(
          question.explanation.tr,
        );
        expect((await stored(page)).sessions).toHaveLength(0);
        expect((await stored(page)).reviews).toHaveLength(0);
      }
      await page
        .getByRole("button", {
          name: i === 9 ? "Çalışmayı kaydet" : "Sonraki soru",
          exact: true,
        })
        .tap();
    }
    await expect(page.locator(".result-page h1")).toBeVisible();
    await expect.poll(async () => (await stored(page)).sessions.length).toBe(1);
    const state = await stored(page),
      session = state.sessions[0];
    expect(session.lessonId).toBe(pack.lessonId);
    expect(session.responses).toHaveLength(10);
    expect(
      session.responses.filter((response) => response.correct),
    ).toHaveLength(9);
    expect(
      session.responses.filter((response) => !response.correct),
    ).toHaveLength(1);
    expect(
      state.reviews.map(
        (review) =>
          (Date.parse(review.targetDate + "T00:00:00Z") -
            Date.parse(session.date + "T00:00:00Z")) /
          86400000,
      ),
    ).toEqual([2, 6, 20]);
    await page.reload();
    expect((await stored(page)).sessions).toEqual(state.sessions);
    expect((await stored(page)).reviews).toEqual(state.reviews);
    expect(errors).toEqual([]);
  });
  test(`${pack.lessonId}: theory reaches the same complete question on a 320px enlarged touch screen`, async ({
    page,
  }) => {
    await page.goto("/");
    await nav(page, "Ayarlar");
    await page.getByLabel("Tema", { exact: true }).selectOption("light");
    await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
    await page
      .getByLabel("Yalnızca yazı boyutu %", { exact: true })
      .fill("150");
    await page.setViewportSize({ width: 320, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await open(page, pack.lessonId, "Konu Anlatımı");
    const q = pack.questions[0];
    await expect(page.locator(".question-panel h2")).toHaveText(q.prompt.tr);
    await assertPassageBeforeStem(page, q);
    await expect(page.locator(".answer")).toHaveCount(5);
    await page.locator(".answer").nth(q.answer).tap();
    await page
      .getByRole("button", { name: "Cevabı kontrol et", exact: true })
      .tap();
    await expect(page.locator(".feedback p")).toHaveText(q.explanation.tr);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(321);
    const scan = await new AxeBuilder({ page }).include("main").analyze();
    expect(
      scan.violations.filter((violation) =>
        ["serious", "critical"].includes(violation.impact ?? ""),
      ),
    ).toEqual([]);
    expect((await stored(page)).sessions).toHaveLength(0);
  });
}
