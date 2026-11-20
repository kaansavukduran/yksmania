import { typeset } from "../../src/domain/typeset";
import { test, expect, type Page } from "@playwright/test";
import { setThemePreference } from "./helpers/theme";
import AxeBuilder from "@axe-core/playwright";
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
    cacheDir: info.outputPath("mistakes051-source-cache"),
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


test("051 mistakes: prerequisite bridge opens a Temel İnşa lesson and the boss round drills unrepaired mistakes", async ({ page }) => {
  const qs = lesson.questions.slice(0, 6);
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Bugün", exact: true })).toBeVisible();
  await page.goto("/#/settings");
  await setThemePreference(page, "dark");
  await addSessions(page, [session("session:51:katli-oranlar", "2026-11-12", qs.map((q, i) => response(q, false, i === 3 ? "high" : "medium")))]);
  await page.goto("/#/mistakes");
  await page.reload();
  await expect(page.locator(".mistake-card")).toHaveCount(6);
  const bridge = page.locator(".mistake-card").first().locator(".mistake-bridge");
  await expect(bridge).toContainText("Önkoşul köprüsü: bu dersin Temel İnşa ön dersleri");
  const boss = page.locator(".mistake-boss");
  await expect(boss).toContainText("Hafta sonu hata boss’u");
  await expect(boss).toContainText("en zorlu 6 soru");
  const axe = await new AxeBuilder({ page }).include(".mistake-boss").include(".mistake-bridge").analyze();
  expect(axe.violations).toEqual([]);
  await bridge.getByRole("button", { name: "Madde, element, bileşik ve karışım" }).click();
  await expect(page.getByRole("heading", { level: 1, name: "Madde, element, bileşik ve karışım" })).toBeVisible();
  await page.goto("/#/mistakes");
  await page.getByRole("button", { name: "6 soruluk boss turunu başlat" }).click();
  // The confident wrong answer leads the boss round.
  await expect(page.getByRole("heading", { name: typeset(qs[3].prompt.tr) })).toBeVisible();
  await expect(page.locator(".exam-question-meta")).toContainText("Soru 1 / 6");
});
