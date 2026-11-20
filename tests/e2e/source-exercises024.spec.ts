import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import ogm from "../../src/learning/originalOgmExercises024.json" with { type: "json" };
import type { AppState } from "../../src/domain/model";
import { examDraftSchema } from "../../src/domain/examModel";
import { setThemePreference } from "./helpers/theme";

const lessonId = "tyt-mat-uslu-ifadeler-ogm-kaynak-sorulari-024";
const topicId = "topic-tyt-mat-uslu-sayilar-kaynak-039";
async function stored(page: Page): Promise<AppState> {
  return page.evaluate(
    () =>
      new Promise((resolve, reject) => {
        const r = indexedDB.open("yksmania", 2);
        r.onerror = () => reject(r.error);
        r.onupgradeneeded = () => {
          r.transaction!.abort();
          reject(Error("Existing database required"));
        };
        r.onsuccess = () => {
          const db = r.result,
            tx = db.transaction("state"),
            q = tx.objectStore("state").get("current");
          q.onerror = () => {
            db.close();
            reject(q.error);
          };
          q.onsuccess = () => {
            db.close();
            resolve(q.result);
          };
        };
      }),
  );
}
async function rawStores(page: Page) {
  return page.evaluate(
    () =>
      new Promise((resolve, reject) => {
        const r = indexedDB.open("yksmania", 2);
        r.onerror = () => reject(r.error);
        r.onsuccess = () => {
          const db = r.result,
            names = [...db.objectStoreNames],
            tx = db.transaction(names),
            value: Record<string, unknown> = {};
          for (const name of names) {
            const store = tx.objectStore(name),
              keys = store.getAllKeys(),
              values = store.getAll();
            values.onsuccess = () => {
              value[name] = { keys: keys.result, values: values.result };
            };
          }
          tx.oncomplete = () => {
            db.close();
            resolve(value);
          };
          tx.onabort = () => {
            db.close();
            reject(tx.error);
          };
        };
      }),
  );
}
async function nav(page: Page, name: string) {
  const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page
    .locator(".sidebar")
    .getByRole("button", { name, exact: true })
    .click();
}
async function ready(page: Page) {
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await page.waitForFunction(
    () => navigator.serviceWorker.controller?.state === "activated",
  );
}
async function startOriginal(page: Page) {
  await nav(page, "Sorular");
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill("MEB OGM kaynak soruları");
  await page.locator(`.ready-topic[data-lesson-id="${lessonId}"]`).click();
  await expect(page.locator(".question-panel")).toBeVisible();
}
async function openFullHelp(
  page: Page,
  container = page.locator(".question-help"),
) {
  for (
    let i = 0;
    i < 12 && !(await container.locator(".help-full-solution").isVisible());
    i++
  ) {
    const next = container.locator(".help-next");
    const sections = container.locator(".help-content > section");
    const previousCount = await sections.count();
    await next.click();
    // Each help action opens one more panel (the hint, then the steps).
    await expect
      .poll(
        async () =>
          (await container.locator(".help-full-solution").isVisible()) ||
          (await sections.count()) > previousCount,
      )
      .toBe(true);
  }
  await expect(container.locator(".help-full-solution")).toBeVisible();
}

test("46 source-reader activities and 31 visible model choices remain unscored and keep offline selections", async ({
  page,
  context,
}, info) => {
  test.setTimeout(180000);
  await page.setViewportSize({ width: 320, height: 1000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/settings");
  await setThemePreference(page, "matrix");
  await page.getByLabel("Yazı tipi", { exact: true }).selectOption("lexend");
  await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
  await page.getByLabel("Yalnızca yazı boyutu %", { exact: true }).fill("150");
  await ready(page);
  await context.setOffline(true);
  const before = await stored(page),
    observed: unknown[] = [];
  const learning = (s: AppState) => ({
    settings: s.settings,
    notes: s.notes,
    sessions: s.sessions,
    reviews: s.reviews,
    topicProgress: s.topicProgress,
    theoryReviewCompletions: s.theoryReviewCompletions,
    draft: s.draft,
    examDraft: s.examDraft,
    examSessions: s.examSessions,
    unlocked: s.unlocked,
  });
  const enter = async (id: string, title: string) => {
    await nav(page, "Konu Anlatımı");
    await page
      .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
      .fill(title);
    await page.locator(`.ready-topic[data-lesson-id="${id}"]`).click();
  };
  const inspectChoices = async (
    group: ReturnType<Page["getByRole"]>,
    expected: number,
  ) => {
    const buttons = group.getByRole("button");
    await expect(buttons).toHaveCount(expected);
    for (let i = 0; i < expected; i++) {
      await buttons.nth(i).focus();
      await page.keyboard.press(i % 2 ? "Space" : "Enter");
      await expect(buttons.nth(i)).toHaveAttribute("aria-pressed", "true");
      await expect(group.locator('button[aria-pressed="true"]')).toHaveCount(1);
      const metrics = await buttons.nth(i).evaluate((node) => {
        const b = node.getBoundingClientRect();
        return {
          x: b.x,
          right: b.right,
          height: b.height,
          viewport: innerWidth,
        };
      });
      expect(metrics.x).toBeGreaterThanOrEqual(0);
      expect(metrics.right).toBeLessThanOrEqual(metrics.viewport);
      expect(metrics.height).toBeGreaterThanOrEqual(44);
      observed.push({ choice: await buttons.nth(i).textContent(), ...metrics });
    }
  };
  for (const unit of [
    {
      id: "tyt-mat-mutlak-deger-kaynak-038",
      title: "Mutlak değer: uzaklık, koşul ve grafiğin mantığı",
      count: 18,
    },
    {
      id: "tyt-mat-uslu-sayilar-kaynak-039",
      title: "Üslü sayılar: çarpan, koşul ve ölçeğin mantığı",
      count: 28,
    },
  ]) {
    await enter(unit.id, unit.title);
    const reader = page.locator(
      `.original-exercise-reader[data-lesson-id="${unit.id}"]`,
    );
    await expect(reader).toBeVisible();
    const picker = reader.getByRole("group", {
      name: `Alıştırma seç · ${unit.count} kaynak sorusu`,
      exact: true,
    });
    await expect(picker.getByRole("button")).toHaveCount(unit.count);
    for (let i = 0; i < unit.count; i++) {
      await picker.getByRole("button").nth(i).click();
      await expect(reader.locator("article h3")).not.toBeEmpty();
      await expect(
        reader.getByRole("button", {
          name: "Adım adım çözümü gör",
          exact: true,
        }),
      ).toHaveAttribute("aria-expanded", "false");
      await reader
        .getByRole("button", { name: "Adım adım çözümü gör", exact: true })
        .click();
      await expect(reader.locator(".original-source-solution")).toBeVisible();
      await expect(
        reader.locator(".original-source-solution .source-question-figure"),
      ).toBeVisible();
      if (unit.count === 28 && i >= 10 && i < 16) {
        const q = ogm[i - 10];
        await expect(reader.locator("article h3")).toHaveText(q.stem);
        await expect(reader.locator(".source-figure-open img")).toHaveAttribute(
          "alt",
          q.image.alt,
        );
        expect(
          await reader.locator(".original-source-options li").allTextContents(),
        ).toEqual(q.options);
      }
      if (unit.count === 28 && i >= 24) {
        const context = reader.getByRole("region", {
          name: "Kaynak bağlamı",
          exact: true,
        });
        await expect(context).toContainText("İlk bozulan adım:");
        await expect(context).toContainText("Yeni sınama:");
      }
    }
    expect(learning(await stored(page))).toEqual(learning(before));
    if (unit.count === 18) {
      const lab = page.locator("[data-forge038]");
      await lab
        .getByRole("group", { name: "Mutlak değer modeli", exact: true })
        .getByRole("button", { name: "Denklem ve eşitsizlik", exact: true })
        .click();
      await inspectChoices(
        lab.getByRole("group", { name: "İlişki", exact: true }),
        5,
      );
    } else {
      const lab = page.locator(".f039-lab"),
        modes = lab.getByRole("group", { name: "Keşif modeli", exact: true });
      await inspectChoices(modes, 10);
      for (const option of [
        { mode: "Denklem", group: "Ortak taban", count: 4 },
        { mode: "Karşılaştırma", group: "İlk taban", count: 4 },
        { mode: "Bilimsel ölçek", group: "İşlem", count: 3 },
        {
          mode: "Adım ve süreç",
          group: "Her tamamlanan adımın çarpanı",
          count: 5,
        },
      ]) {
        await modes
          .getByRole("button", { name: option.mode, exact: true })
          .click();
        await inspectChoices(
          lab.getByRole("group", { name: option.group, exact: true }),
          option.count,
        );
      }
    }
    await expect(page.locator(".save-status")).toContainText(
      "Bu cihazda kaydedildi",
    );
    const saved = await stored(page);
    await page.reload();
    await expect(reader).toBeVisible();
    await expect(
      reader.getByRole("button", { name: "Çözümü kapat", exact: true }),
    ).toHaveAttribute("aria-expanded", "true");
    expect((await stored(page)).explorations).toEqual(saved.explorations);
    expect(learning(await stored(page))).toEqual(learning(before));
    const metrics = await page.evaluate(() => ({
      width: document.documentElement.scrollWidth,
      viewport: innerWidth,
    }));
    expect(metrics.width).toBeLessThanOrEqual(metrics.viewport);
    const accessibility = await new AxeBuilder({ page })
      .include(".original-exercise-reader")
      .analyze();
    expect(
      accessibility.violations.filter((v) =>
        ["critical", "serious"].includes(v.impact ?? ""),
      ),
    ).toEqual([]);
  }
  expect(observed).toHaveLength(31);
  await info.attach("actual-source-reader-and-choices", {
    body: JSON.stringify({
      sourceActivities: 46,
      visibleChoiceActivations: 31,
      observed,
      noLearningEvidence: true,
      offlineReload: true,
    }),
    contentType: "application/json",
  });
});
test("OGM six original cards preserve images and option order through normal Questions entry, offline draft, score, Today and 3/7/21", async ({
  page,
  context,
}, info) => {
  test.setTimeout(120000);
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.clock.setFixedTime(new Date("2026-11-18T12:00:00Z"));
  await page.goto("/#/settings");
  await setThemePreference(page, "matrix");
  await ready(page);
  await context.setOffline(true);
  await startOriginal(page);
  const before = await stored(page);
  for (const [index, original] of ogm.entries()) {
    await expect(page.locator(".question-meta")).toContainText(
      `${index + 1} / 6`,
    );
    await expect(page.locator(".question-meta")).toContainText(
      "MEB OGM Materyal · kaynak sorusu",
    );
    await expect(page.locator(".question-panel h2")).toHaveText(original.stem);
    const image = page.locator(".question-panel .source-figure-open img");
    await expect(image).toHaveAttribute("alt", original.image.alt);
    // The image may still be decoding right after navigation; poll until it
    // has loaded instead of sampling a single moment.
    await expect
      .poll(() =>
        image.evaluate((node: HTMLImageElement) => [
          node.complete,
          node.naturalWidth,
          node.naturalHeight,
        ]),
      )
      .toEqual([true, original.image.width, original.image.height]);
    const options = page.locator(".answer-options .answer");
    expect(
      await options.locator("span:nth-child(2)").allTextContents(),
    ).toEqual(original.options);
    expect((await stored(page)).sessions).toEqual(before.sessions);
    await options.nth(original.correctIndex).click();
    await page
      .getByRole("button", { name: "Cevabı kontrol et", exact: true })
      .click();
    await expect(page.locator(".feedback.correct")).toBeVisible();
    await expect
      .poll(async () => (await stored(page)).draft?.responses.length)
      .toBe(index + 1);
    if (index === 2) {
      const draft = (await stored(page)).draft;
      await page.reload();
      await expect(page.locator(".feedback.correct")).toBeVisible();
      expect((await stored(page)).draft).toEqual(draft);
    }
    if (index < 5)
      await page
        .getByRole("button", { name: "Sonraki soru", exact: true })
        .click();
  }
  await page
    .getByRole("button", { name: "Çalışmayı kaydet", exact: true })
    .click();
  await expect(page.locator(".result-stats > div strong")).toHaveText([
    "6/6",
    "6/6",
    "0",
  ]);
  const saved = await stored(page),
    session = saved.sessions.at(-1)!;
  expect(session.lessonId).toBe(lessonId);
  expect(session.responses.every((r) => r.correct && !r.assisted)).toBe(true);
  expect(saved.topicProgress[topicId]?.theory).toBeUndefined();
  expect(
    saved.reviews
      .filter((r) => r.originSessionId === session.id)
      .map((r) => [r.stage, r.targetDate]),
  ).toEqual([
    [3, "2026-11-20"],
    [7, "2026-11-24"],
    [21, "2026-12-08"],
  ]);
  expect(saved.settings).toEqual(before.settings);
  expect(saved.notes).toEqual(before.notes);
  await page.reload();
  await expect(page.locator(".result-stats > div strong")).toHaveText([
    "6/6",
    "6/6",
    "0",
  ]);
  await nav(page, "Bugün");
  const row = page
    .getByRole("region", { name: "Soru planı", exact: true })
    .locator(".planned-topic")
    .filter({ hasText: "Üslü sayılar: çarpan, koşul ve ölçeğin mantığı" });
  await expect(row.locator(".topic-score")).toHaveText(
    "Son sonuç: 6 soruda 6 doğru · 0 yanlış",
  );
  expect((await stored(page)).sessions).toEqual(saved.sessions);
  expect((await stored(page)).reviews).toEqual(saved.reviews);
  expect(errors).toEqual([]);
  await info.attach("actual-ogm-six-normal-entry", {
    body: JSON.stringify({
      session,
      reviews: saved.reviews,
      offline: true,
      originalImages: 6,
      originalOptionOrder: true,
      errors,
    }),
    contentType: "application/json",
  });
});

test("source image zoom and retry are read-only, accessible at 320px/45px; actual hints mark assistance and separate full solution", async ({
  page,
  context,
}, info) => {
  test.setTimeout(120000);
  await page.setViewportSize({ width: 320, height: 1000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/settings");
  await setThemePreference(page, "matrix");
  await page.getByLabel("Yazı tipi", { exact: true }).selectOption("lexend");
  await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
  await page.getByLabel("Yalnızca yazı boyutu %", { exact: true }).fill("150");
  await ready(page);
  await context.setOffline(true);
  await startOriginal(page);
  await ready(page);
  const before = await rawStores(page);
  const opener = page.locator(".question-panel .source-figure-open");
  await opener.focus();
  await page.keyboard.press("Enter");
  const modal = page.getByRole("dialog", {
    name: "OGM kaynak soru 1",
    exact: true,
  });
  await expect(modal).toBeVisible();
  await expect(
    modal.getByRole("button", { name: "Kapat", exact: true }),
  ).toBeFocused();
  await modal
    .getByRole("button", { name: "Görseli büyüt", exact: true })
    .click();
  await expect(
    modal.getByRole("status", { name: "Görsel yakınlaştırması", exact: true }),
  ).toHaveText("%150");
  const metrics = await modal.evaluate((node) => ({
    width: node.getBoundingClientRect().width,
    viewport: innerWidth,
    bodyPx: parseFloat(getComputedStyle(document.body).fontSize),
    bad: [...node.querySelectorAll("button")]
      .map((button) => ({
        text: button.textContent,
        height: button.getBoundingClientRect().height,
        width: button.getBoundingClientRect().width,
      }))
      .filter((b) => b.height < 44 || b.width < 44),
  }));
  expect(metrics.bodyPx).toBe(45);
  expect(metrics.width).toBeLessThanOrEqual(metrics.viewport);
  expect(metrics.bad).toEqual([]);
  const axe = await new AxeBuilder({ page })
    .include(".source-figure-dialog")
    .analyze();
  expect(
    axe.violations.filter((v) =>
      ["critical", "serious"].includes(v.impact ?? ""),
    ),
  ).toEqual([]);
  await page.screenshot({
    path: info.outputPath("ogm-original-mobile-zoom.png"),
  });
  await page.keyboard.press("Escape");
  await expect(modal).not.toBeVisible();
  await expect(opener).toBeFocused();
  expect(await rawStores(page)).toEqual(before);
  // A missing local asset produces a real image load error. Retry restores the
  // source URL from the unchanged component props and never writes learning.
  await opener.locator("img").evaluate((node: HTMLImageElement) => {
    node.src = new URL("missing-source-figure024.png", location.href).href;
  });
  await expect(
    page.locator(".question-panel .source-figure-fallback"),
  ).toContainText("Görsel yüklenemedi");
  await page
    .getByRole("button", { name: "Görseli yeniden dene", exact: true })
    .click();
  await expect(opener.locator("img")).toBeVisible();
  expect(
    await opener
      .locator("img")
      .evaluate(
        (node: HTMLImageElement) => node.complete && node.naturalWidth > 0,
      ),
  ).toBe(true);
  expect(await rawStores(page)).toEqual(before);
  await page.getByRole("button", { name: "İpucu al", exact: true }).click();
  await expect(page.locator(".question-help .source-math-layout")).toHaveCount(
    1,
  );
  await expect(page.locator(".help-full-solution")).toHaveCount(0);
  await expect(page.locator(".question-help")).not.toContainText(
    "Doğru yanıt:",
  );
  expect((await stored(page)).draft?.hint).toBe(true);
  await openFullHelp(page);
  await expect(
    page.locator(".help-full-solution .source-math-layout"),
  ).toHaveAttribute("aria-label", "Pay2^5, payda2^3: sonuç2^(5−3)=4.");
  await page.locator(".answer-options .answer").nth(4).click();
  await page
    .getByRole("button", { name: "Cevabı kontrol et", exact: true })
    .click();
  await expect
    .poll(async () => (await stored(page)).draft?.responses[0]?.assisted)
    .toBe(true);
  const saved = await stored(page);
  await page.reload();
  await expect(
    page.locator(".help-full-solution .source-math-layout"),
  ).toBeVisible();
  expect((await stored(page)).draft).toEqual(saved.draft);
  expect((await stored(page)).sessions).toEqual([]);
  expect((await stored(page)).reviews).toEqual([]);
  await info.attach("actual-zoom-hint-scope", {
    body: JSON.stringify({
      metrics,
      axe: axe.violations,
      rawStoresUnchangedByZoomRetry: true,
      assistance: saved.draft?.responses,
      offline: true,
    }),
    contentType: "application/json",
  });
});

test("explicit valid frozen exam fixture retains exact source images in runner/review and rejects altered historical stem, options, passage and answer", async ({
  page,
  context,
}, info) => {
  test.setTimeout(120000);
  await page.goto("/#/settings");
  await setThemePreference(page, "dark");
  await ready(page);
  const now = Date.now();
  const items = ogm.map((q) => ({
    id: q.id,
    lessonId,
    subjectId: "tyt-matematik",
    subjectName: "Matematik",
    lessonTitle: "Üslü ifadeler · MEB OGM kaynak soruları",
    prompt: q.stem,
    options: q.options,
    answer: q.correctIndex,
    explanation: q.teachingSolution.steps.map((s) => s.text).join(" "),
    hint: q.teachingSolution.strategy,
    guidance: {
      knowledge: [q.teachingSolution.knowledge],
      strategy: q.teachingSolution.strategy,
      steps: q.teachingSolution.steps.map((s) => s.text),
      optionReasons: q.teachingSolution.optionReasons.map((s) => s.text),
      commonError: q.teachingSolution.commonError,
      check: q.teachingSolution.check,
    },
  }));
  // Deliberately historical snapshots use matching IDs but different revisions. They must remain textual and unchanged.
  items[1].prompt += " Tarihsel sürüm.";
  items[2].options = [...items[2].options].reverse();
  const withPassage = {
    ...items[3],
    passage: "Tarihsel sürümün farklı verisi",
  };
  items[3] = withPassage;
  items[4].answer = 0;
  items[5].guidance = {
    ...items[5].guidance,
    steps: ["Tarihsel kişisel adım; güncel yardım görseli bağlanmamalı."],
  };
  const fixture = examDraftSchema.parse({
    id: "exam:source024-explicit-fixture",
    title: "Kaynak görseli · açık test fikstürü",
    kind: "branch",
    exam: "TYT",
    items,
    answers: items.map(() => null),
    flagged: [],
    index: 0,
    startedAt: now,
    deadline: now + 600000,
    durationSeconds: 600,
    mode: "learning",
    helpEnabled: true,
    helpLevels: items.map(() => 0),
  });
  await page.evaluate(
    (value) =>
      new Promise<void>((resolve, reject) => {
        const r = indexedDB.open("yksmania", 2);
        r.onerror = () => reject(r.error);
        r.onsuccess = () => {
          const db = r.result,
            tx = db.transaction("state", "readwrite"),
            store = tx.objectStore("state"),
            read = store.get("current");
          read.onsuccess = () =>
            store.put({ ...read.result, examDraft: value }, "current");
          tx.oncomplete = () => {
            db.close();
            resolve();
          };
          tx.onabort = () => {
            db.close();
            reject(tx.error);
          };
        };
      }),
    fixture,
  );
  await page.goto("/#/exams");
  await page.reload();
  await expect(page.locator(".exam-runner")).toBeVisible();
  await context.setOffline(true);
  const before = await stored(page);
  for (let index = 0; index < 6; index++) {
    await page
      .getByRole("button", { name: `Soru ${index + 1}, boş`, exact: true })
      .click();
    await expect(page.locator(".exam-question h2")).toHaveText(
      fixture.items[index].prompt,
    );
    await expect(
      page.locator(".exam-question .source-figure-open"),
    ).toHaveCount(index === 0 || index === 5 ? 1 : 0);
  }
  // Same original stem/image, but the preserved historical guidance is different.
  await page.getByRole("button", { name: "İpucu al", exact: true }).click();
  await expect(page.locator(".exam-question .source-figure-open")).toHaveCount(
    1,
  );
  await expect(
    page.locator(".exam-question .question-help .source-math-layout"),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Soru 1, boş", exact: true }).click();
  await page.getByRole("button", { name: "İpucu al", exact: true }).click();
  await expect(
    page.locator(".exam-question .question-help .source-math-layout"),
  ).toHaveCount(1);
  await page.locator(".exam-answer").nth(4).click();
  const pending = await stored(page);
  expect(pending.examDraft?.items).toEqual(fixture.items);
  await page.reload();
  await expect(
    page.locator(".exam-question .source-figure-open img"),
  ).toBeVisible();
  expect((await stored(page)).examDraft?.items).toEqual(fixture.items);
  await page
    .getByRole("button", { name: "Denemeyi bitir", exact: true })
    .click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Bitir ve sonucu gör", exact: true })
    .click();
  const results = page.locator(".exam-solution");
  await expect(results).toHaveCount(6);
  for (let index = 0; index < 6; index++) {
    const item = results.nth(index);
    await item.locator("summary").click();
    await expect(item.locator("h3").first()).toHaveText(
      fixture.items[index].prompt,
    );
    await expect(item.locator(".source-figure-open")).toHaveCount(
      index === 0 || index === 5 ? 1 : 0,
    );
  }
  await openFullHelp(page, results.first().locator(".question-help"));
  await expect(
    results.first().locator(".help-full-solution .source-math-layout"),
  ).toBeVisible();
  await openFullHelp(page, results.nth(5).locator(".question-help"));
  await expect(
    results.nth(5).locator(".help-full-solution .source-math-layout"),
  ).toHaveCount(0);
  await expect(results.nth(5).locator(".question-help")).toContainText(
    "Tarihsel kişisel adım",
  );
  const saved = await stored(page);
  expect(saved.examSessions.at(-1)?.items).toEqual(fixture.items);
  expect(saved.sessions).toEqual(before.sessions);
  expect(saved.reviews).toEqual(before.reviews);
  expect(saved.topicProgress).toEqual(before.topicProgress);
  expect(saved.settings).toEqual(before.settings);
  expect(saved.notes).toEqual(before.notes);
  await info.attach("explicit-frozen-paper-scope", {
    body: JSON.stringify({
      setup: "VALID_EXPLICIT_FIXTURE_NOT_NORMAL_EXAM_GENERATION",
      exactImages: 2,
      changedRevisionsWithoutWrongOverlay: 4,
      changedGuidancePreservesQuestionImageWithoutCurrentHelpImages: true,
      itemsPreserved: true,
      helpLevels: saved.examSessions.at(-1)?.helpLevels,
      noLearningEvidence: true,
    }),
    contentType: "application/json",
  });
});
