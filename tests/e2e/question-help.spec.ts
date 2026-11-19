import { setThemePreference } from "./helpers/theme";
import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test.use({ locale: "tr-TR", timezoneId: "Europe/Istanbul", hasTouch: true });
async function nav(page: Page, name: string) {
  await expect(page.locator(".sidebar")).toBeAttached();
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
        const request = indexedDB.open("yksmania");
        request.onsuccess = () => {
          const db = request.result,
            get = db.transaction("state").objectStore("state").get("current");
          get.onsuccess = () => {
            resolve(get.result);
            db.close();
          };
          get.onerror = () => reject(get.error);
        };
        request.onerror = () => reject(request.error);
      }),
  );
}
async function saved(page: Page) {
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
}
async function rational(page: Page) {
  await nav(page, "Sorular");
  await page.getByRole("button", { name: "TYT", exact: true }).click();
  const subject = page.getByRole("button", { name: /Matematik.*31 konu/ });
  if ((await subject.getAttribute("aria-expanded")) !== "true")
    await subject.click();
  await page
    .getByRole("button", { name: /Rasyonel sayılar.*5 özgün soru/ })
    .click();
  await expect(page.locator(".question-panel h2")).toHaveText(
    "Hangisi daha büyüktür?",
  );
}
async function check(page: Page, answer: number, last = false) {
  await page.locator(".answer").nth(answer).click();
  await page
    .getByRole("button", { name: "Cevabı kontrol et", exact: true })
    .click();
  await page
    .getByRole("button", {
      name: last ? "Çalışmayı kaydet" : "Sonraki soru",
      exact: true,
    })
    .click();
}
async function openSteps(page: Page) {
  for (const title of [
    "Çözüm yolu aç",
    "1. adım aç",
    "2. adım aç",
    "Tam çözümü aç",
  ])
    await page.getByRole("button", { name: title, exact: true }).click();
  await expect(
    page.getByRole("region", { name: "Tam çözüm", exact: true }),
  ).toBeVisible();
}
async function paragraphExam(page: Page, learning = false) {
  await nav(page, "Sınavlar");
  // Exams always start as learning attempts with hints available.
  void learning;
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
  const draft = (await stored(page)).examDraft;
  const index = draft.items.findIndex((q: { id: string }) =>
    /^p[1-5]$/.test(q.id),
  );
  expect(index).toBeGreaterThanOrEqual(0);
  await page
    .getByRole("button", { name: `Soru ${index + 1}, boş`, exact: true })
    .click();
  return { index, draft, question: draft.items[index] };
}

test("staged question guidance persists offline, records the actual assistance level and keeps independent answers independent", async ({
  page,
  context,
}) => {
  await page.goto("/");
  await rational(page);
  await check(page, 1);
  await expect(page.locator(".question-panel h2")).toHaveText(
    "1/2 + 1/3 kaçtır?",
  );
  await page
    .getByRole("textbox", { name: "Notun", exact: true })
    .fill("Payda aynı kalır; ÇĞİÖŞÜ.");
  await saved(page);
  const before = await stored(page);
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await context.setOffline(true);
  await page.getByRole("button", { name: "İpucu al", exact: true }).click();
  await expect(page.locator(".help-content")).toContainText(
    "6 ortak paydasını kullan.",
  );
  await expect(
    page.getByRole("region", { name: "Tam çözüm", exact: true }),
  ).toHaveCount(0);
  await page
    .getByRole("button", { name: "Çözüm yolu aç", exact: true })
    .click();
  await page.getByRole("button", { name: "1. adım aç", exact: true }).click();
  await expect(page.locator(".help-content")).toContainText("3/6");
  await expect(page.locator(".help-content h3")).toHaveCount(3);
  await saved(page);
  const helped = await stored(page);
  expect(helped.draft.helpLevel).toBe(3);
  expect(helped.draft.responses).toEqual(before.draft.responses);
  expect(helped.sessions).toEqual(before.sessions);
  expect(helped.reviews).toEqual(before.reviews);
  expect(helped.topicProgress).toEqual(before.topicProgress);
  await page.reload();
  await expect(page.locator(".help-content h3")).toHaveCount(3);
  await expect(
    page.getByRole("textbox", { name: "Notun", exact: true }),
  ).toHaveValue("Payda aynı kalır; ÇĞİÖŞÜ.");
  await page.getByRole("button", { name: "2. adım aç", exact: true }).click();
  await page
    .getByRole("button", { name: "Tam çözümü aç", exact: true })
    .click();
  await expect(page.locator(".help-full-solution")).toContainText(
    "Doğru yanıt: C",
  );
  await expect(page.locator(".help-full-solution")).toContainText(
    "pay ve paydayı ayrı ayrı toplama hatasıdır",
  );
  await check(page, 2);
  await expect(page.locator(".hint-box")).toHaveCount(0);
  for (const [i, answer] of [0, 1, 1].entries())
    await check(page, answer, i === 2);
  const done = await stored(page),
    responses = done.sessions[0].responses;
  expect(responses.map((r: { assisted: boolean }) => r.assisted)).toEqual([
    false,
    true,
    false,
    false,
    false,
  ]);
  expect(responses[1].helpLevel).toBe(5);
  expect(responses.every((r: { correct: boolean }) => r.correct)).toBe(true);
  expect(done.sessions[0].note).toBe("Payda aynı kalır; ÇĞİÖŞÜ.");
});

for (const learning of [true])
  test(`${learning ? "learning" : "simulation"} exam uses the same saved guidance without changing deadlines, answers, flags or net`, async ({
    page,
    context,
  }) => {
    await page.goto("/");
    const { index, question } = await paragraphExam(page, learning);
    await page.locator(".exam-answer").nth(question.answer).click();
    await page
      .getByRole("button", { name: "Sonra bakmak için işaretle", exact: true })
      .click();
    await saved(page);
    const before = (await stored(page)).examDraft;
    if (!learning) {
      await expect(
        page.getByRole("button", { name: "İpucu al", exact: true }),
      ).toHaveCount(0);
      const gate = page.getByRole("checkbox", { name: /Çözüm desteğini aç/ });
      // The controlled checkbox reflects the durable IndexedDB commit.
      // A native check() verifies too early when that write is still pending.
      await gate.click();
      await expect(gate).toBeChecked();
      await expect.poll(async () => (await stored(page)).examDraft.helpEnabled).toBe(true);
      await saved(page);
      expect((await stored(page)).examDraft.helpLevels).toBeUndefined();
    }
    await page.getByRole("button", { name: "İpucu al", exact: true }).click();
    await openSteps(page);
    await saved(page);
    const helped = (await stored(page)).examDraft;
    expect(helped.helpLevels[index]).toBe(5);
    for (const field of [
      "items",
      "answers",
      "flagged",
      "deadline",
      "startedAt",
      "durationSeconds",
      "index",
    ])
      expect(helped[field]).toEqual(before[field]);
    await page.evaluate(async () => {
      await navigator.serviceWorker.ready;
    });
    await context.setOffline(true);
    await page.reload();
    await expect(page.locator(".help-full-solution")).toContainText(
      question.explanation,
    );
    expect((await stored(page)).examDraft).toEqual(helped);
    if (!learning) {
      const gate = page.getByRole("checkbox", { name: /Çözüm desteğini aç/ });
      await gate.click();
      await expect(gate).not.toBeChecked();
      await expect.poll(async () => (await stored(page)).examDraft.helpEnabled).toBe(false);
      await saved(page);
      await expect(page.locator(".help-full-solution")).toHaveCount(0);
      expect((await stored(page)).examDraft.helpLevels[index]).toBe(5);
    }
    await page
      .getByRole("button", { name: "Denemeyi bitir", exact: true })
      .click();
    await page
      .getByRole("dialog")
      .getByRole("button", { name: "Bitir ve sonucu gör", exact: true })
      .click();
    await expect(
      page.getByLabel("Yardım kullanımı", { exact: true }),
    ).toContainText(
      "0 bağımsız doğru · 1 yardımlı doğru · 1 soruda yardım açıldı",
    );
    const done = await stored(page);
    expect(done.examSessions[0].answers).toEqual(before.answers);
    expect(done.examSessions[0].items).toEqual(before.items);
    expect(done.examSessions[0].helpLevels[index]).toBe(5);
    expect(done.sessions).toEqual([]);
    expect(done.reviews).toEqual([]);
    expect(done.topicProgress).toEqual({});
    await expect(page.locator(".exam-score-summary")).toContainText("1");
  });

test("a failed assistance write exposes neither a solution nor a false saved level, and retry preserves the draft", async ({
  page,
}) => {
  await page.goto("/");
  const { question } = await paragraphExam(page, true);
  await page.locator(".exam-answer").nth(question.answer).click();
  await saved(page);
  const before = (await stored(page)).examDraft;
  await page.evaluate(() => {
    const original = IDBObjectStore.prototype.put;
    (window as any).__failHelpWrite = true;
    IDBObjectStore.prototype.put = function (
      ...args: Parameters<IDBObjectStore["put"]>
    ) {
      if ((window as any).__failHelpWrite && this.name === "state")
        throw new DOMException(
          "Synthetic hint disk failure",
          "QuotaExceededError",
        );
      return original.apply(this, args);
    };
  });
  await page.getByRole("button", { name: "İpucu al", exact: true }).click();
  await expect(page.locator(".exam-error")).toContainText(
    "Değişiklik kaydedilemedi",
  );
  await expect(page.locator(".hint-box")).toHaveCount(0);
  expect((await stored(page)).examDraft).toEqual(before);
  await page.evaluate(() => {
    (window as any).__failHelpWrite = false;
  });
  await page.getByRole("button", { name: "İpucu al", exact: true }).click();
  await expect(page.locator(".hint-box")).toBeVisible();
  await saved(page);
  expect((await stored(page)).examDraft.answers).toEqual(before.answers);
});

test("full guidance remains usable at 320px with large type, touch, keyboard, reduced motion and both actual fonts", async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/");
  await nav(page, "Ayarlar");
  await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
  await page.getByLabel("Yalnızca yazı boyutu %", { exact: true }).fill("150");
  await setThemePreference(page, "light");
  await page.getByRole("switch", { name: /Aion animasyonu/ }).uncheck();
  await rational(page);
  await page.getByRole("button", { name: "İpucu al", exact: true }).click();
  await openSteps(page);
  for (const font of ["system", "lexend"]) {
    if (font === "lexend") {
      await nav(page, "Ayarlar");
      await page
        .getByLabel("Yazı tipi", { exact: true })
        .selectOption("lexend");
      expect(
        await page.evaluate(async () => {
          const faces = await Promise.all(
            [400, 600].map((weight) =>
              document.fonts.load(`${weight} 45px Lexend`, "ÇĞİÖŞÜçğıöşü"),
            ),
          );
          await document.fonts.ready;
          return faces.every(
            (row) =>
              row.length > 0 && row.every((face) => face.status === "loaded"),
          );
        }),
      ).toBe(true);
      await nav(page, "Bugün");
      await page
        .getByRole("button", { name: "Kaldığın yerden devam et", exact: true })
        .click();
    }
    await expect(page.locator(".help-full-solution")).toBeVisible();
    await expect(page.locator(".skip-link")).not.toBeFocused();
    expect(await page.locator(".skip-link").evaluate((node) => node.getBoundingClientRect().bottom)).toBeLessThanOrEqual(0);
    const layout = await page.evaluate(() => ({
      width: innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      offenders: [...document.querySelectorAll("main *")]
        .map((node) => {
          const box = node.getBoundingClientRect();
          return {
            tag: node.tagName,
            class: node.className,
            text: node.textContent?.slice(0, 90),
            left: box.left,
            right: box.right,
            width: box.width,
          };
        })
        .filter(
          (node) =>
            node.width > 0 &&
            (node.left < -0.5 || node.right > innerWidth + 0.5),
        )
        .slice(0, 25),
    }));
    await page.screenshot({
      path: testInfo.outputPath(`guidance-before-${font}.png`),
      fullPage: true,
    });
    expect(layout.scrollWidth, JSON.stringify(layout)).toBeLessThanOrEqual(
      layout.width + 1,
    );
    const splitWords = await page.locator(".help-full-solution").evaluate((element) => {
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT), split: string[] = [];
      let node: Node | null;
      while ((node = walker.nextNode())) {
        for (const match of (node.textContent ?? "").matchAll(/\p{L}[\p{L}\p{M}]*/gu)) {
          const range = document.createRange();
          range.setStart(node, match.index!); range.setEnd(node, match.index! + match[0].length);
          if ([...range.getClientRects()].filter((box) => box.width > 0 && box.height > 0).length > 1) split.push(match[0]);
        }
      }
      return split;
    });
    expect(splitWords).toEqual([]);
    for (const button of await page
      .locator(".question-panel button:visible")
      .all()) {
      const box = await button.boundingBox();
      expect(box!.height).toBeGreaterThanOrEqual(43.9);
      expect(box!.x).toBeGreaterThanOrEqual(-0.5);
      expect(box!.x + box!.width).toBeLessThanOrEqual(320.5);
    }
    await page.locator(".help-full-solution").scrollIntoViewIfNeeded();
    await page.screenshot({ path: testInfo.outputPath(`viewport-${font}.png`) });
    await page.locator(".help-full-solution").screenshot({ path: testInfo.outputPath(`solution-${font}.png`) });
    await page.screenshot({
      path: testInfo.outputPath(`guidance-${font}.png`),
      fullPage: true,
    });
    expect(
      (await new AxeBuilder({ page }).include(".question-panel").analyze())
        .violations,
    ).toEqual([]);
  }
  await page
    .getByRole("button", { name: "Cevabı kontrol et", exact: true })
    .scrollIntoViewIfNeeded();
  await page.locator(".answer").nth(1).focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("button", { name: "Cevabı kontrol et", exact: true }),
  ).toBeEnabled();
});
