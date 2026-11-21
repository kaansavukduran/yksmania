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
      name: "Başlat: TYT Türkçe branş denemesi",
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
test("absolute exam deadline finishes once while studying another page and the result stays saved after offline reload", async ({
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
  const duration = (await stored(page)).examDraft.durationSeconds;
  await nav(page, "Konu Anlatımı");
  await page.clock.fastForward(duration * 1000 + 1000);
  await expect
    .poll(async () => (await stored(page)).examSessions.length)
    .toBe(1);
  const state = await stored(page);
  expect(state.examDraft).toBeNull();
  expect(state.examSessions[0].timedOut).toBe(true);
  expect(state.examSessions[0].answers.slice(1)).toEqual(
    Array(state.examSessions[0].items.length - 1).fill(null),
  );
  await page.clock.fastForward(60000);
  expect((await stored(page)).examSessions).toHaveLength(1);
  await nav(page, "Sınavlar");
  await page.locator(".exam-history-row").first().click();
  await expect(page.locator(".exam-results")).toContainText("Süre tamamlandı");
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await context.setOffline(true);
  await page.reload();
  await expect(page.locator(".exam-score-summary")).toContainText("1");
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
    .getByRole("button", { name: "Başlat: TYT karma denemesi", exact: true })
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

test("background expiry preserves the draft on storage failure and retries once after normal save recovery", async ({
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
  await expect(page.locator(".error-banner")).toBeVisible();
  expect((await stored(page)).examDraft.id).toBe(draft.id);
  expect((await stored(page)).examSessions).toEqual([]);
  expect(await page.evaluate(() => (window as any).__examFailureCount)).toBe(1);
  await page.clock.fastForward(60000);
  expect(await page.evaluate(() => (window as any).__examFailureCount)).toBe(1);
  await failWrites(page, false);
  await page
    .locator(".error-banner")
    .getByRole("button", { name: "Yeniden dene", exact: true })
    .click();
  await expect
    .poll(async () => (await stored(page)).examSessions.length)
    .toBe(1);
  const after = await stored(page);
  expect(after.examDraft).toBeNull();
  expect(after.examSessions[0].id).toBe(draft.id);
  expect(after.examSessions[0].answers).toEqual(draft.answers);
  expect(after.examSessions[0].finishedAt).toBe(draft.deadline);
  await page.clock.fastForward(60000);
  expect((await stored(page)).examSessions).toHaveLength(1);
  expect((await stored(page)).sessions).toEqual([]);
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
