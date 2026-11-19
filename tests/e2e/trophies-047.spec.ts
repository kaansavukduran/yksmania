import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { setThemePreference } from "./helpers/theme";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import type { Lesson } from "../../src/domain/model";

test.use({ locale: "tr-TR", timezoneId: "Europe/Istanbul" });

async function addSessions(page: Page, sessions: unknown[]) {
  await page.evaluate(
    (rows) =>
      new Promise<void>((resolve, reject) => {
        const request = indexedDB.open("yksmania", 2);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const db = request.result;
          const tx = db.transaction("state", "readwrite");
          tx.oncomplete = () => {
            db.close();
            resolve();
          };
          tx.onabort = () => reject(tx.error ?? Error("FIXTURE_ABORTED"));
          const store = tx.objectStore("state");
          const read = store.get("current");
          read.onsuccess = () => store.put({ ...read.result, sessions: [...read.result.sessions, ...rows] }, "current");
        };
      }),
    sessions,
  );
}
let lesson: Lesson;
test.beforeAll(async ({}, info) => {
  const root = fileURLToPath(new URL("../..", import.meta.url));
  const source = await createServer({
    root,
    configFile: false,
    cacheDir: info.outputPath("trophies047-source-cache"),
    logLevel: "silent",
    server: { middlewareMode: true, hmr: false, watch: null },
    appType: "custom",
  });
  try {
    const { lessonById } = await source.ssrLoadModule("/src/domain/content.ts");
    lesson = lessonById("katli-oranlar");
  } finally {
    await source.close();
  }
});
const answers = (n: number, assisted: boolean) =>
  lesson.questions.slice(0, n).map((q) => ({
    questionId: q.id,
    selected: q.answer,
    correct: true,
    assisted,
    confidence: "medium",
    ...(assisted ? { helpLevel: 1 } : {}),
  }));
const session = (id: string, date: string, assisted: boolean) => ({
  id,
  lessonId: "katli-oranlar",
  date,
  finishedAt: `${date}T10:00:00.000Z`,
  responses: answers(10, assisted),
  kind: "learn",
  minutes: 12,
  note: "",
});

for (const width of [1280, 320])
  test(`047 trophies open only from independent answers and the showcase fits ${width}px`, async ({ page }) => {
    expect(lesson.questions.length).toBeGreaterThanOrEqual(10);
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Bugün", exact: true })).toBeVisible();
    // Save a real profile first (choosing the current theme writes the state).
    await page.goto("/#/settings");
    await setThemePreference(page, "dark");
    // Help on every answer: no trophy.
    await addSessions(page, [session("session:1:katli-oranlar", "2026-11-18", true)]);
    await page.goto("/#/world");
    const showcase = page.locator(".trophy-showcase");
    await expect(showcase).toContainText("0 / 34 açıldı");
    await expect(showcase.locator(".trophy-card.is-earned")).toHaveCount(0);
    // The same ten answers without help: the chemistry badge and the perfect run open.
    await addSessions(page, [session("session:2:katli-oranlar", "2026-11-19", false)]);
    await page.reload();
    await expect(showcase.locator(".trophy-card", { hasText: "Mol Simyacısı" }).last()).toContainText("Bronz");
    await expect(showcase.locator(".trophy-card", { hasText: "Kusursuz Seri" }).last()).toContainText("Bronz");
    // Every card has its own emblem; the earned badge shows the bronze metal.
    await expect(showcase.locator(".trophy-card", { hasText: "Mol Simyacısı" }).last().locator("svg.emblem-bronze")).toHaveCount(1);
    // Ten distinct independent answers advance the star trophies by their estimated stars.
    const starCard = showcase.locator(".trophy-card", { hasText: "Yıldız Avcısı" }).last();
    await expect(starCard.locator(".trophy-count")).toHaveText(/^\d+ \/ 10$/);
    await showcase.getByRole("button", { name: "Gizli", exact: true }).click();
    await expect(showcase.locator(".trophy-grid").last().locator(".trophy-card")).toHaveCount(3);
    await expect(showcase.locator(".trophy-grid").last()).toContainText("Gizli kupa");
    const docWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(docWidth).toBeLessThanOrEqual(width + 1);
    const axe = await new AxeBuilder({ page }).include(".trophy-showcase").analyze();
    expect(axe.violations).toEqual([]);
  });
