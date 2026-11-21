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
let osymLine: string | null = null;
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
    const { lessonTopic } = await source.ssrLoadModule("/src/domain/studyPlan.ts");
    const { osymRows } = await source.ssrLoadModule("/src/learning/osym/index.ts");
    const { osymTopicCount } = await source.ssrLoadModule("/src/domain/trapDeck.ts");
    const count = osymTopicCount(osymRows, lessonTopic["katli-oranlar"], "tyt-kimya");
    if (count)
      osymLine = count.questions
        ? `ÖSYM bu başlıktan ${count.years} yılda ${count.questions} soru sordu.`
        : `ÖSYM bu başlıktan ${count.years} yılda doğrudan soru sormadı.`;
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

// Answers the single question of a one-question round correctly and finishes it.
async function solveRound(page: Page, expectedId: string) {
  await expect(page.locator(".exam-question-meta")).toContainText("Soru 1 / 1");
  const draft = (await stored(page)).examDraft;
  expect(draft.items.map((i: { id: string }) => i.id)).toEqual([expectedId]);
  await page.locator(".exam-answer").nth(draft.items[0].answer).click();
  await page.getByRole("button", { name: "Denemeyi bitir", exact: true }).click();
  await page.getByRole("dialog").getByRole("button", { name: "Bitir ve sonucu gör", exact: true }).click();
  await expect(page.locator(".exam-score-summary")).toBeVisible();
  await page.goto("/#/mistakes");
}

test("053 mistakes: three-stage repair through recorded one-question rounds and the ÖSYM trap deck", async ({ page }) => {
  test.setTimeout(120_000);
  const q1 = lesson.questions[0];
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Bugün", exact: true })).toBeVisible();
  await page.goto("/#/settings");
  await setThemePreference(page, "light");
  await addSessions(page, [session("session:53:katli-oranlar", "2026-11-10", [response(q1, false)])]);
  await page.goto("/#/mistakes");
  await page.reload();
  const card = page.locator(".mistake-card").first();
  const stages = card.getByRole("group", { name: "Onarım aşamaları" });
  if (osymLine) await expect(card.locator(".mistake-osym")).toHaveText(osymLine);
  else await expect(card.locator(".mistake-osym")).toHaveCount(0);
  await expect(stages).toContainText("Aşama 1 / 3: Yeniden dene");
  const before = await stored(page);

  await stages.getByRole("button", { name: "Aynı soruyu yeniden çöz" }).click();
  await solveRound(page, q1.id);
  await expect(stages).toContainText("Aşama 2 / 3: İkiz soru");
  await expect(card.locator(".status-chip")).toHaveText("Onarıldı");

  await stages.getByRole("button", { name: "İkiz soruyu çöz" }).click();
  await expect(page.locator(".exam-question-meta")).toContainText("Soru 1 / 1");
  const twinId = (await stored(page)).examDraft.items[0].id;
  expect(twinId).not.toBe(q1.id);
  expect(lesson.questions.some((q) => q.id === twinId)).toBe(true);
  await solveRound(page, twinId);
  await expect(stages).toContainText("Aşama 3 / 3: Gecikmeli kontrol");
  await expect(stages.locator(".repair-step.is-done")).toHaveCount(2);

  // The mistake is more than three days old, so the delayed check is open now.
  await stages.getByRole("button", { name: "Gecikmeli kontrolü başlat" }).click();
  await solveRound(page, q1.id);
  await expect(stages).toContainText("Üç aşama tamam: kalıcı onarıldı");
  await expect(card.locator(".status-chip")).toHaveText("Kalıcı onarım");
  // Repair rounds are normal exam records: no study session, review or progress is invented.
  const after = await stored(page);
  expect(after.sessions).toEqual(before.sessions);
  expect(after.reviews).toEqual(before.reviews);
  expect(after.topicProgress).toEqual(before.topicProgress);
  expect(after.examSessions).toHaveLength(before.examSessions.length + 3);

  // Trap deck: the learner's mistake subject leads; marks are visit-only counters.
  await page.getByRole("button", { name: "ÖSYM tuzak destesi", exact: true }).click();
  const deck = page.locator(".trap-deck");
  await expect(deck.getByRole("combobox", { name: "Ders" }).locator("option").first()).toHaveText("TYT Kimya (1 yanlışın)");
  await expect(deck).toContainText("Soru metinleri ÖSYM’ye aittir ve burada yer almaz.");
  const face = deck.locator(".trap-card");
  await expect(face).toContainText("Bu soru biçiminde hangi tuzağa düşülür?");
  await expect(deck.locator(".trap-count")).toContainText("Kart 1 /");
  await face.focus();
  await page.keyboard.press("Enter");
  await expect(face).toHaveAttribute("aria-pressed", "true");
  await expect(face).toContainText("Ölçülen beceri");
  await expect(face.locator(".trap-place").first()).toHaveText(/^20\d\d (TYT|AYT) · .+ · \d+\. soru$/);
  await deck.getByRole("button", { name: "Biliyordum" }).click();
  await expect(deck.getByRole("status")).toContainText("1 biliyordum · 0 yeni öğrendim");
  await expect(deck.locator(".trap-count")).toContainText("Kart 2 /");
  await face.focus();
  await page.keyboard.press("ArrowLeft");
  await expect(deck.locator(".trap-count")).toContainText("Kart 1 /");
  const axe = await new AxeBuilder({ page }).include(".trap-deck").analyze();
  expect(axe.violations).toEqual([]);
  const marksSaved = await stored(page);
  expect(marksSaved.sessions).toEqual(before.sessions);
  expect(JSON.stringify(marksSaved.explorations)).toBe(JSON.stringify(after.explorations));
  for (const width of [320, 375]) {
    await page.setViewportSize({ width, height: 800 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  }
});
