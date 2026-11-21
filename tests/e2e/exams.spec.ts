import { typeset } from "../../src/domain/typeset";
import { setThemePreference } from "./helpers/theme";
import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test.use({ hasTouch: true, locale: "tr-TR" });
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
async function branch(page: Page) {
  await nav(page, "Sınavlar");
  await page
    .getByRole("button", { name: "Branş denemeleri", exact: true })
    .click();
  await page
    .getByRole("button", {
      name: "Denemeyi başlat: TYT Türkçe branş denemesi",
      exact: true,
    })
    .click();
  await expect(page.locator(".exam-runner")).toBeVisible();
}
async function failWrites(page: Page, fail: boolean) {
  await page.evaluate((f) => {
    if (!(window as any).__examWritePatched) {
      const put = IDBObjectStore.prototype.put;
      IDBObjectStore.prototype.put = function (
        ...args: Parameters<IDBObjectStore["put"]>
      ) {
        if ((window as any).__failExamWrite && this.name === "state") {
          (window as any).__examFailureCount =
            ((window as any).__examFailureCount ?? 0) + 1;
          throw new DOMException(
            "Synthetic exam disk failure",
            "QuotaExceededError",
          );
        }
        return put.apply(this, args);
      };
      (window as any).__examWritePatched = true;
    }
    (window as any).__failExamWrite = f;
  }, fail);
}
test("built-in branch exam keeps full passages, flags and answers offline, then saves actual net and all explanations without learning credit", async ({
  page,
  context,
}) => {
  await page.goto("/");
  await branch(page);
  const initial = await stored(page),
    items = initial.examDraft.items;
  const firstIndex = items.findIndex((q: { passage?: string }) =>
      q.passage?.includes("Bir kitabı bitirmek"),
    ),
    secondIndex = firstIndex === 0 ? 1 : 0;
  expect(firstIndex).toBeGreaterThanOrEqual(0);
  const correctChoice = items[firstIndex].answer,
    wrongChoice =
      (items[secondIndex].answer + 1) % items[secondIndex].options.length;
  await page
    .getByRole("button", { name: `Soru ${firstIndex + 1}, boş`, exact: true })
    .click();
  await expect(page.locator(".exam-question .question-passage")).toHaveText(
    typeset(items[firstIndex].passage),
  );
  await expect(page.locator(".exam-question h2")).toHaveText(
    typeset(items[firstIndex].prompt),
  );
  expect(
    await page.locator(".exam-question").evaluate((element) => {
      const passage = element.querySelector(".question-passage")!,
        stem = element.querySelector("h2")!;
      return !!(
        passage.compareDocumentPosition(stem) & Node.DOCUMENT_POSITION_FOLLOWING
      );
    }),
  ).toBe(true);
  await page.locator(".exam-answer").nth(correctChoice).tap();
  await expect(page.locator(".exam-answer").nth(correctChoice)).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page
    .getByRole("button", { name: `Soru ${secondIndex + 1}, boş`, exact: true })
    .click();
  await expect(page.locator(".exam-question h2")).toBeFocused();
  await page
    .getByRole("button", { name: "Sonra bakmak için işaretle", exact: true })
    .click();
  await page.locator(".exam-answer").nth(wrongChoice).click();
  await expect(
    page.getByRole("button", {
      name: `Soru ${secondIndex + 1}, yanıtlandı, işaretli`,
      exact: true,
    }),
  ).toBeVisible();
  const before = await stored(page);
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await context.setOffline(true);
  await page.reload();
  await expect(page.locator(".exam-answer").nth(wrongChoice)).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  expect((await stored(page)).examDraft).toEqual(before.examDraft);
  expect((await stored(page)).examDraft.deadline).toBe(
    before.examDraft.deadline,
  );
  await page
    .getByRole("button", { name: "Denemeyi bitir", exact: true })
    .click();
  const modal = page.getByRole("dialog");
  await expect(
    modal.getByRole("button", { name: "Denemeye dön", exact: true }),
  ).toBeFocused();
  await modal
    .getByRole("button", { name: "Denemeye dön", exact: true })
    .click();
  await expect(page.locator(".exam-runner")).toBeVisible();
  await page
    .getByRole("button", { name: "Denemeyi bitir", exact: true })
    .click();
  await modal
    .getByRole("button", { name: "Bitir ve sonucu gör", exact: true })
    .click();
  await expect(page.locator(".exam-score-summary")).toContainText("0,75");
  const result = await stored(page);
  expect(result.examSessions).toHaveLength(1);
  expect(
    result.examSessions[0].answers.filter((v: unknown) => v === null),
  ).toHaveLength(items.length - 2);
  expect(result.sessions).toEqual([]);
  expect(result.topicProgress).toEqual({});
  expect(result.examDraft).toBeNull();
  const solution = page.locator(".exam-solution").nth(firstIndex);
  await solution.locator("summary").click();
  await expect(solution.locator(".question-passage")).toContainText(
    "Bir kitabı bitirmek",
  );
  await expect(solution.locator(".exam-explanation p")).toHaveText(
    typeset(items[firstIndex].explanation),
  );
  await page.reload();
  await expect(page.locator(".exam-score-summary")).toContainText("0,75");
});
test("past the absolute deadline the exam stays open while studying another page; answers still change and only the learner finishes it", async ({
  page,
  context,
}) => {
  await page.clock.install({ time: new Date("2026-11-14T12:00:00Z") });
  await page.clock.pauseAt(new Date("2026-11-14T12:00:01Z"));
  await page.goto("/");
  await branch(page);
  await page.locator(".exam-answer").first().click();
  await expect(page.locator(".exam-answer").first()).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  const draft = (await stored(page)).examDraft;
  await nav(page, "Konu Anlatımı");
  await page.clock.fastForward(draft.durationSeconds * 1000 + 3 * 60_000);
  // Süre doldu ama deneme kendiliğinden bitmez.
  let state = await stored(page);
  expect(state.examSessions).toEqual([]);
  expect(state.examDraft.id).toBe(draft.id);
  await nav(page, "Sınavlar");
  await expect(page.locator(".exam-runner")).toBeVisible();
  await expect(page.locator(".exam-time")).toContainText("Ek süre");
  await expect(page.locator(".exam-clock")).toContainText("+");
  await expect(page.locator(".exam-time")).not.toHaveClass(/exam-time-low/);
  await expect(page.locator(".exam-runner")).not.toContainText("Süre tamamlandı");
  await expect(page.locator(".exam-runner")).not.toContainText("değiştirilemez");
  await expect(page.locator(".exam-runner")).toContainText(
    "Süre dolsa da deneme sen bitirene kadar açık kalır.",
  );
  await page
    .getByRole("button", { name: "Sonraki soru", exact: true })
    .click();
  await page.locator(".exam-answer").nth(1).click();
  await expect(page.locator(".exam-answer").nth(1)).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect
    .poll(async () => (await stored(page)).examDraft.answers[1])
    .toBe(1);
  await page.getByRole("button", { name: "Sonra bakmak için işaretle" }).click();
  await expect
    .poll(async () => (await stored(page)).examDraft.flagged)
    .toEqual([1]);
  await page.clock.fastForward(60_000);
  expect((await stored(page)).examSessions).toEqual([]);
  await page.getByRole("button", { name: "Denemeyi bitir", exact: true }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Bitir ve sonucu gör", exact: true })
    .click();
  await expect(page.locator(".exam-results")).toBeVisible();
  state = await stored(page);
  expect(state.examDraft).toBeNull();
  expect(state.examSessions).toHaveLength(1);
  expect(state.examSessions[0].timedOut).toBe(true);
  expect(state.examSessions[0].finishedAt).toBeGreaterThan(draft.deadline);
  expect(state.examSessions[0].answers[1]).toBe(1);
  await expect(page.locator(".exam-results")).toContainText("Denemeyi bitirdin.");
  await expect(page.locator(".exam-results")).toContainText(
    /Resmî süreden \d+ dk fazla çalıştın; öğrenme için sorun değil\./,
  );
  await expect(page.locator(".exam-results")).not.toContainText("Süre tamamlandı");
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await context.setOffline(true);
  await page.reload();
  await expect(page.locator(".exam-score-summary")).toBeVisible();
  expect((await stored(page)).examSessions).toHaveLength(1);
  expect((await stored(page)).sessions).toEqual([]);
});
test("failed exam writes retain the last durable answer and finish draft; touch controls and results fit at 320px with large text", async ({
  page,
}) => {
  await page.goto("/");
  await nav(page, "Ayarlar");
  await setThemePreference(page, "light");
  await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
  await page.getByLabel("Yalnızca yazı boyutu %", { exact: true }).fill("150");
  await page.setViewportSize({ width: 320, height: 844 });
  await nav(page, "Sınavlar");
  await page
    .getByRole("button", { name: "Denemeyi başlat: TYT karma denemesi", exact: true })
    .click();
  await expect(page.locator(".exam-runner")).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  ).toBe(true);
  await failWrites(page, true);
  await page.locator(".exam-answer").first().tap();
  await expect(page.locator(".exam-error")).toContainText(
    "Önceki yanıtın korunuyor",
  );
  expect((await stored(page)).examDraft.answers[0]).toBeNull();
  await expect(page.locator(".exam-answer").first()).toHaveAttribute(
    "aria-pressed",
    "false",
  );
  await failWrites(page, false);
  await page.locator(".exam-answer").first().tap();
  await expect(page.locator(".exam-answer").first()).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.getByRole("button", { name: "Denemeyi bitir", exact: true }).tap();
  await failWrites(page, true);
  const modal = page.getByRole("dialog");
  await expect(modal).toBeVisible();
  const dialogBounds = await modal.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      width: element.getBoundingClientRect().width,
      content:
        element.clientWidth -
        parseFloat(style.paddingLeft) -
        parseFloat(style.paddingRight),
      scroll: element.scrollWidth,
      client: element.clientWidth,
    };
  });
  expect(dialogBounds.width).toBeGreaterThanOrEqual(280);
  expect(dialogBounds.content).toBeGreaterThanOrEqual(240);
  expect(dialogBounds.scroll).toBeLessThanOrEqual(dialogBounds.client + 1);

  await modal
    .getByRole("button", { name: "Bitir ve sonucu gör", exact: true })
    .click();
  await expect(modal.getByRole("alert")).toContainText("Yanıtların korunuyor");
  expect((await stored(page)).examSessions).toEqual([]);
  await failWrites(page, false);
  await modal
    .getByRole("button", { name: "Bitir ve sonucu gör", exact: true })
    .click();
  await expect(page.locator(".exam-results")).toBeVisible();
  const table = page.getByRole("region", {
    name: "Ders sonuçları tablosu",
    exact: true,
  });
  await table.focus();
  await page.keyboard.press("ArrowRight");
  await expect
    .poll(async () => table.evaluate((element) => element.scrollLeft))
    .toBeGreaterThan(0);

  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  ).toBe(true);
  expect(
    (await new AxeBuilder({ page }).analyze()).violations.filter((v) =>
      ["serious", "critical"].includes(v.impact ?? ""),
    ),
  ).toEqual([]);
});

test("after the deadline nothing finishes in the background; a failed finish keeps the draft and a retry saves once", async ({
  page,
}) => {
  await page.clock.install({ time: new Date("2026-11-14T12:00:00Z") });
  await page.clock.pauseAt(new Date("2026-11-14T12:00:01Z"));
  await page.goto("/");
  await branch(page);
  await page.locator(".exam-answer").first().click();
  await expect(page.locator(".exam-answer").first()).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  const before = await stored(page),
    draft = before.examDraft;
  await nav(page, "Konu Anlatımı");
  await failWrites(page, true);
  await page.clock.fastForward(draft.durationSeconds * 1000 + 1000);
  await page.clock.fastForward(60000);
  // Arka planda bitirme denemesi yok: yazma hiç denenmedi.
  expect(await page.evaluate(() => (window as any).__examFailureCount ?? 0)).toBe(0);
  expect((await stored(page)).examDraft.id).toBe(draft.id);
  expect((await stored(page)).examSessions).toEqual([]);
  await nav(page, "Sınavlar");
  await page.getByRole("button", { name: "Denemeyi bitir", exact: true }).click();
  const modal = page.getByRole("dialog");
  await modal
    .getByRole("button", { name: "Bitir ve sonucu gör", exact: true })
    .click();
  await expect(modal.getByRole("alert")).toContainText("Yanıtların korunuyor");
  expect((await stored(page)).examDraft.id).toBe(draft.id);
  expect((await stored(page)).examSessions).toEqual([]);
  await failWrites(page, false);
  await modal
    .getByRole("button", { name: "Bitir ve sonucu gör", exact: true })
    .click();
  await expect(page.locator(".exam-results")).toBeVisible();
  const after = await stored(page);
  expect(after.examDraft).toBeNull();
  expect(after.examSessions[0].id).toBe(draft.id);
  expect(after.examSessions[0].answers).toEqual(draft.answers);
  expect(after.examSessions[0].finishedAt).toBeGreaterThan(draft.deadline);
  expect(after.examSessions[0].timedOut).toBe(true);
  await page.clock.fastForward(60000);
  expect((await stored(page)).examSessions).toHaveLength(1);
  expect((await stored(page)).sessions).toEqual([]);
});

test("timers switched off in settings remove the exam clock, pace, pulse and hourglass while keeping saved timer state", async ({
  page,
}) => {
  await page.goto("/");
  await nav(page, "Ayarlar");
  const toggle = page.getByRole("switch", { name: /Zamanlayıcılar/ });
  await expect(toggle).toBeChecked();
  await toggle.click();
  await expect(toggle).not.toBeChecked();
  await expect
    .poll(async () => (await stored(page)).settings.timers)
    .toBe(false);
  const timerBefore = (await stored(page)).focusTimer;
  await nav(page, "Konu Anlatımı");
  await expect(page.locator(".page-heading, .topbar").first()).toBeVisible();
  await expect(page.locator(".study-timer")).toHaveCount(0);
  await branch(page);
  for (const selector of [".exam-time", ".exam-clock", ".exam-pace", ".exam-pulse", ".exam-pace-note"])
    await expect(page.locator(selector)).toHaveCount(0);
  await expect(page.locator(".exam-runner")).not.toContainText("Kalan süre");
  await expect(page.locator(".exam-runner")).not.toContainText("kalan süre");
  await page.getByRole("button", { name: "Denemeyi bitir", exact: true }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Bitir ve sonucu gör", exact: true })
    .click();
  await expect(page.locator(".exam-results")).toContainText("Denemeyi bitirdin.");
  await expect(page.locator(".exam-slowest")).toHaveCount(0);
  await expect(page.locator(".exam-results")).not.toContainText("kullanılan süre");
  expect((await stored(page)).focusTimer).toEqual(timerBefore);
});

test("a new branch attempt varies available questions while both old results and the resumed new paper stay fixed offline", async ({
  page,
  context,
}) => {
  await page.goto("/");
  await branch(page);
  const first = structuredClone((await stored(page)).examDraft);
  await page
    .getByRole("button", { name: "Denemeyi bitir", exact: true })
    .click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Bitir ve sonucu gör", exact: true })
    .click();
  await expect(page.locator(".exam-results")).toBeVisible();
  const finished = structuredClone((await stored(page)).examSessions[0]);
  await branch(page);
  const second = structuredClone((await stored(page)).examDraft);
  expect(second.items.map((item: { id: string }) => item.id)).not.toEqual(
    first.items.map((item: { id: string }) => item.id),
  );
  expect(second.items).toHaveLength(first.items.length);
  expect(
    new Set(second.items.map((item: { id: string }) => item.id)).size,
  ).toBe(second.items.length);
  expect(second.durationSeconds).toBe(first.durationSeconds);
  expect(second.answers.every((answer: number | null) => answer === null)).toBe(
    true,
  );
  expect((await stored(page)).examSessions[0]).toEqual(finished);
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await context.setOffline(true);
  await page.reload();
  await expect(page.locator(".exam-runner")).toBeVisible();
  const after = await stored(page);
  expect(after.examDraft).toEqual(second);
  expect(after.examSessions[0]).toEqual(finished);
  expect(after.sessions).toEqual([]);
  expect(after.reviews).toEqual([]);
  expect(after.topicProgress).toEqual({});
});

test("block order, time pulse, second round and the official distribution panel work by keyboard without XP", async ({
  page,
}) => {
  await page.clock.install({ time: new Date("2026-11-21T10:00:00+03:00") });
  await page.goto("/#/today");
  await nav(page, "Sınavlar");
  const panel = page.getByRole("region", { name: "Gerçek sınavda dağılım" });
  await expect(panel).toContainText("2018–2026");
  await expect(panel).toContainText("Bu deneme resmî dağılımın birebir kopyası değildir");
  await panel.getByRole("button", { name: "AYT Sayısal", exact: true }).click();
  await expect(panel).toContainText("Fizik");
  // Keyboard reordering keeps focus and is remembered on this device.
  const up = page.getByRole("button", { name: "Sosyal Bilimler bloğunu yukarı taşı" });
  await up.focus();
  await page.keyboard.press("Enter");
  await expect(up).toBeFocused();
  await expect(page.getByText("Sosyal Bilimler 2. sıraya taşındı.")).toBeAttached();
  expect(
    await page.evaluate(() => JSON.parse(localStorage.getItem("yksmania.examBlockOrder.v1")!).TYT),
  ).toEqual(["turkce", "sosyal", "matematik", "fen"]);
  await page.getByRole("button", { name: "Denemeyi başlat: TYT karma denemesi", exact: true }).click();
  await expect(page.locator(".exam-runner")).toBeVisible();
  const draft = (await stored(page)).examDraft;
  expect(draft.items).toHaveLength(120);
  expect(draft.items[40].subjectId).toMatch(/^tyt-(tarih|cografya|felsefe|din)$/);
  // Time pulse: calm warning past 1.5 times the average; no per-second writes.
  await page.clock.fastForward("02:10");
  await expect(page.locator(".exam-pulse-warning")).toHaveText(
    "Bu soruda ortalamanın üstündesin; işaretleyip geçebilirsin.",
  );
  expect((await stored(page)).examDraft.itemMs[0]).toBe(0);
  await page.locator(".exam-answer").first().click();
  await page.getByRole("button", { name: "Sonraki soru", exact: true }).click();
  await expect(page.locator(".exam-question-meta")).toContainText("Soru 2 / 120");
  await expect.poll(async () => (await stored(page)).examDraft.itemMs[0]).toBeGreaterThanOrEqual(130_000);
  // Second round walks only flagged and blank questions.
  await page.getByRole("button", { name: "Sonra bakmak için işaretle" }).click();
  await page.getByRole("button", { name: "Önceki soru", exact: true }).click();
  await page.getByRole("button", { name: "Sonra bakmak için işaretle" }).click();
  await page.getByRole("button", { name: /^2\. tur:/ }).click();
  await expect(page.locator(".exam-round-summary")).toContainText("listede 1/120");
  await expect(page.locator(".exam-round-summary")).toContainText("işaretli 2 · boş 119");
  await page.getByRole("button", { name: "Sonraki (2. tur)" }).click();
  await expect(page.locator(".exam-question-meta")).toContainText("Soru 2 / 120");
  await page.getByRole("button", { name: "Tüm sorulara dön" }).click();
  await expect(page.getByRole("button", { name: "Sonraki soru", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Denemeyi bitir", exact: true }).click();
  await page.getByRole("dialog").getByRole("button", { name: "Bitir ve sonucu gör", exact: true }).click();
  const slowest = page.getByRole("region", { name: "En çok zaman alan 5 soru" });
  await expect(slowest.locator("li").first()).toContainText("1. soru");
  await expect(slowest.locator("li").first()).toContainText(/Doğru|Yanlış/);
  const saved = await stored(page);
  expect(saved.examSessions[0].itemMs).toHaveLength(120);
  expect(saved.examSessions[0].viewedAt).toBeUndefined();
  expect(saved.sessions).toEqual([]);
  expect(saved.topicProgress).toEqual({});
  const axe = await new AxeBuilder({ page }).include(".exam-slowest").analyze();
  expect(axe.violations).toEqual([]);
});
