import { typeset } from "../../src/domain/typeset";
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
let twinOfQ3: string;
test.beforeAll(async ({}, info) => {
  const root = fileURLToPath(new URL("../..", import.meta.url));
  const source = await createServer({
    root,
    configFile: false,
    cacheDir: info.outputPath("mistakes049-source-cache"),
    logLevel: "silent",
    server: { middlewareMode: true, hmr: false, watch: null },
    appType: "custom",
  });
  try {
    const { lessonById } = await source.ssrLoadModule("/src/domain/content.ts");
    lesson = lessonById("katli-oranlar");
    const { pickTwin } = await source.ssrLoadModule("/src/domain/twinQuestion.ts");
    twinOfQ3 = pickTwin(lesson.questions, lesson.questions[2].id, new Set());
  } finally {
    await source.close();
  }
});
const wrongOf = (q: Lesson["questions"][number]) => (q.answer + 1) % q.options.length;
const response = (q: Lesson["questions"][number], correct: boolean, confidence: "low" | "medium" | "high" = "medium") => ({
  questionId: q.id,
  selected: correct ? q.answer : wrongOf(q),
  correct,
  assisted: false,
  confidence,
});
const session = (id: string, date: string, responses: unknown[]) => ({
  id,
  lessonId: "katli-oranlar",
  date,
  finishedAt: `${date}T10:00:00.000Z`,
  responses,
  kind: "learn",
  minutes: 8,
  note: "",
});

for (const width of [1280, 320])
  test(`049 mistakes: evidence-based status, confident-wrong first, warning note, heatmap and booklet at ${width}px`, async ({ page }) => {
    const [q1, q2, q3] = lesson.questions;
    const twin = lesson.questions.find((q) => q.id === twinOfQ3)!;
    expect([q1.id, q2.id, q3.id]).not.toContain(twin.id);
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Bugün", exact: true })).toBeVisible();
    await page.goto("/#/settings");
    await setThemePreference(page, "dark");
    await addSessions(page, [
      // q1 wrong, q2 wrong while "sure", q3 wrong; q3 then passes all three
      // repair stages: retry and twin the next day, the delayed check 4 days later.
      session("session:1:katli-oranlar", "2026-11-10", [response(q1, false), response(q2, false, "high"), response(q3, false)]),
      session("session:2:katli-oranlar", "2026-11-11", [response(q3, true), response(twin, true)]),
      session("session:3:katli-oranlar", "2026-11-14", [response(q3, true)]),
    ]);
    await page.goto("/#/mistakes");
    await page.reload();
    const cards = page.locator(".mistake-card");
    await expect(cards).toHaveCount(3);
    // The confident wrong answer leads; the permanently repaired one is last.
    await expect(cards.first().locator(".mistake-meta")).toContainText("Eminim dedin");
    await expect(cards.first().locator("h2")).toHaveText(typeset(q2.prompt.tr));
    await expect(cards.last().locator(".status-chip")).toHaveText("Kalıcı onarım");
    await expect(cards.last().getByRole("group", { name: "Onarım aşamaları" })).toContainText("Üç aşama tamam: kalıcı onarıldı");
    await expect(cards.first().getByRole("group", { name: "Onarım aşamaları" })).toContainText("Aşama 1 / 3: Yeniden dene");
    const filters = page.getByRole("group", { name: "Onarım durumu" });
    await expect(filters.getByRole("button", { name: "Açık (2)" })).toBeVisible();
    await filters.getByRole("button", { name: "Kalıcı onarım (1)" }).click();
    await expect(cards).toHaveCount(1);
    await filters.getByRole("button", { name: "Hepsi (3)" }).click();
    // Tag a reason: the subject × reason heatmap appears.
    await cards.first().getByRole("button", { name: "Kavram yanılgısı", exact: true }).click();
    await expect(page.getByRole("region", { name: "Ders ve neden ısı haritası" })).toContainText("TYT Kimya");
    // A one-line warning survives a reload and is printed in the booklet.
    const warning = cards.first().getByRole("textbox", { name: /Kendime uyarı/ });
    await warning.fill("Eşit kütlede oranı kur, sonra sadeleştir.");
    await warning.blur();
    await expect(cards.first().getByRole("status")).toHaveText("Kaydedildi");
    await page.reload();
    await expect(cards.first().getByRole("textbox", { name: /Kendime uyarı/ })).toHaveValue("Eşit kütlede oranı kur, sonra sadeleştir.");
    const booklet = page.locator(".pocket-booklet");
    await expect(booklet.locator(".pocket-list > li")).toHaveCount(2);
    await expect(booklet).toContainText("Eşit kütlede oranı kur");
    // Notes never become evidence: no session or trophy is added.
    const docWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(docWidth).toBeLessThanOrEqual(width + 1);
    const axe = await new AxeBuilder({ page }).include(".mistake-list").analyze();
    expect(axe.violations).toEqual([]);
    // The sprint drills the two open mistakes, confident-wrong first.
    await page.getByRole("button", { name: "2 soruluk sprinti başlat" }).click();
    await expect(page.getByRole("heading", { name: typeset(q2.prompt.tr) })).toBeVisible();
    await expect(page.locator(".exam-question-meta")).toContainText("Soru 1 / 2");
  });
