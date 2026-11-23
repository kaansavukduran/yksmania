import { expect, type Page } from "@playwright/test";
import type { AppState } from "../../../src/domain/model";
import { setThemePreference } from "./theme";

export function storage(page: Page): Promise<AppState> {
  return page.evaluate(() => new Promise((resolve, reject) => {
    const request = indexedDB.open("yksmania", 2);
    request.onerror = () => reject(request.error);
    request.onupgradeneeded = () => {
      request.transaction!.abort();
      reject(new Error("The app must have already opened the learning database"));
    };
    request.onsuccess = () => {
      const database = request.result;
      const record = database.transaction("state", "readonly").objectStore("state").get("current");
      record.onerror = () => { database.close(); reject(record.error); };
      record.onsuccess = () => { database.close(); resolve(record.result); };
    };
  }));
}

export function learning(state: AppState) {
  return {
    draft: state.draft,
    sessions: state.sessions,
    reviews: state.reviews,
    theoryReviewCompletions: state.theoryReviewCompletions,
    topicProgress: state.topicProgress,
    unlocked: state.unlocked,
  };
}

export async function openCourse(page: Page, entry: { lesson: string; search: string; title?: string }) {
  const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page.locator(".sidebar").getByRole("button", { name: "Konu Anlatımı", exact: true }).click();
  await page.getByRole("textbox", { name: "Ders veya konu ara", exact: true }).fill(entry.search);
  await page.locator(`.ready-topic[data-lesson-id="${entry.lesson}"]`).click();
  const heading = page.locator(".study-title h1");
  if (entry.title) await expect(heading).toHaveText(entry.title);
  else await expect(heading).toContainText(entry.search);
}

export async function prepare(page: Page, largeText = false) {
  await page.clock.setFixedTime(new Date("2026-11-23T12:00:00Z"));
  await page.goto("/#/settings");
  await setThemePreference(page, largeText ? "light" : "dark");
  if (largeText) {
    await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
    await page.getByLabel("Yalnızca yazı boyutu %", { exact: true }).fill("150");
  }
  await expect(page.locator(".save-status")).toContainText("Bu cihazda kaydedildi");
  await page.waitForFunction(() => navigator.serviceWorker.controller?.state === "activated", undefined, { timeout: 30000 });
}
