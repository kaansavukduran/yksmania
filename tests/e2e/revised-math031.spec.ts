import { expect, test } from "@playwright/test";
import flow from "../fixtures/source031-math-question-flow.json" with { type: "json" };
import { typeset } from "../../src/domain/typeset";
import { registerOfflineBootDiagnostics } from "./helpers/offlineBootDiagnostics";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";

registerOfflineBootDiagnostics();

const cases = [
  {
    lesson: "koklu-sayilar",
    topic: "detail-208",
    search: "Köklü sayılar",
    panel: "source015-nth-root",
    exploration: "radicals-nth-root-source-015",
    sheet: "Kök işareti ile kuvvet denklemini ayrı oku",
    questionCount: 19,
    official: { year: 2023, question: 4, page: 24, answer: "D", example: "18, 32, 78 ve 676" },
  },
  {
    lesson: "oran-oranti",
    topic: "detail-209",
    search: "Oran orantı",
    panel: "source016-golden-ratio",
    exploration: "golden-ratio-source-016",
    sheet: "Altın oranı iki karşılaştırmayla tanı",
    questionCount: 15,
    official: { year: 2026, question: 2, page: 25, answer: "B", example: "80 izleyici" },
  },
  {
    lesson: "sayi-problemleri",
    topic: "detail-210",
    search: "Sayı problemleri",
    panel: "source017-weighted-use",
    exploration: "weighted-use-source-017",
    sheet: "Farklı nesne sayısı ile toplam kullanımı ayrı say",
    questionCount: 14,
    official: { year: 2026, question: 18, page: 30, answer: "C", example: "36 kart" },
  },
] as const;

for (const entry of cases) {
  test(`${entry.lesson}: revised exploration and notes survive offline at 320px without learning writes`, async ({ page, context }, info) => {
    await prepare(page, true);
    await page.setViewportSize({ width: 320, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const before = learning(await storage(page));
    await context.setOffline(true);
    await openCourse(page, entry);
    const panel = page.locator(`[data-model="${entry.panel}"]`);
    const disclosure = panel.locator(":scope > summary");
    await disclosure.focus();
    await page.keyboard.press("Enter");
    await expect(panel).toHaveAttribute("open", "");
    const graph = panel.getByRole("img");
    await expect(graph).toBeVisible();
    const previousShape = await graph.innerHTML();
    if (entry.lesson === "koklu-sayilar") {
      await expect(panel.locator("[data-nth-root-result]")).toContainText("{−2, 2}");
      await panel.getByRole("button", { name: "∛(−27)", exact: true }).click();
      await expect(panel.locator("[data-nth-root-result]")).toContainText("{−3}");
      const degree = panel.getByRole("slider", { name: "Kök derecesi n", exact: true });
      await degree.press("ArrowRight");
      await expect(panel.locator("[data-nth-root-result]")).toContainText("∅");
    } else if (entry.lesson === "oran-oranti") {
      await panel.getByRole("button", { name: "Altın orana yakın bölme", exact: true }).click();
      await expect(panel.locator("[data-golden-split-result]")).toContainText("1,618 olarak yuvarlanır");
      await expect(panel.locator("[data-golden-split-result]")).toContainText("a/b < (a + b)/a");
      await panel.getByRole("checkbox", { name: "Tam altın bölme referansını göster", exact: true }).check();
      await expect(panel.locator("[data-golden-split-reference]")).toContainText("= φ");
    } else {
      await panel.getByRole("button", { name: "55 kullanım kaydını dene", exact: true }).click();
      const result = panel.locator("[data-weighted-use-result]");
      await expect(result).toContainText("Veriler çelişiyor");
      await expect(result).toContainText("hesaplanan toplam 56, kayıtta 55");
      await panel.getByRole("slider", { name: "Kayıttaki toplam kullanım", exact: true }).press("ArrowRight");
      await expect(result).toContainText("Hiç kullanılmayan 18 öğe var");
    }
    expect(await graph.innerHTML()).not.toBe(previousShape);
    const note = "Şekildeki değişimi kendi hesabımla karşılaştırdım.";
    const notes = page.locator(".study-notes").getByRole("textbox", { name: "Notun", exact: true });
    await notes.fill(note);
    await expect.poll(async () => (await storage(page)).notes[`lesson:${entry.lesson}`]).toBe(note);
    const saved = await storage(page);
    expect(saved.explorations[entry.exploration]).toBeDefined();
    expect(learning(saved)).toEqual(before);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(321);
    await page.reload();
    if (await panel.getAttribute("open") === null) await disclosure.click();
    await expect(graph).toBeVisible();
    await expect(notes).toHaveValue(note);
    const reopened = await storage(page);
    expect(reopened.explorations[entry.exploration]).toEqual(saved.explorations[entry.exploration]);
    expect(reopened.settings).toEqual(saved.settings);
    expect(learning(reopened)).toEqual(before);
    await graph.screenshot({ path: info.outputPath("320px-model.png") });
    await page.goto(`/#/cheatsheets?topic=${entry.topic}`);
    await expect(page.getByRole("heading", { name: entry.sheet, exact: true })).toBeVisible();
    expect(learning(await storage(page))).toEqual(before);
  });

  test(`${entry.lesson}: current independent practice writes one result and keeps the original review days offline`, async ({ page, context }) => {
    test.setTimeout(120000);
    const cards = flow[entry.lesson];
    expect(cards).toHaveLength(entry.questionCount);
    await prepare(page);
    await context.setOffline(true);
    await openCourse(page, entry);
    const before = await storage(page);
    await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
    for (const [index, card] of cards.entries()) {
      await expect(page.locator(".question-meta > span").first()).toHaveText(`Soru ${index + 1} / ${entry.questionCount}`);
      await expect(page.locator(".question-panel h2")).toHaveText(typeset(card.prompt));
      const options = page.locator(".answer-options .answer");
      await expect(options).toHaveCount(5);
      await options.filter({ has: page.getByText(typeset(card.correct), { exact: true }) }).click();
      await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
      await expect(page.locator(".feedback.correct")).toBeVisible();
      if (index === 9) {
        await expect.poll(async () => (await storage(page)).draft?.responses.length).toBe(10);
        await page.reload();
        await expect(page.locator(".feedback.correct")).toBeVisible();
        expect((await storage(page)).sessions).toEqual(before.sessions);
      }
      if (index + 1 < entry.questionCount)
        await page.getByRole("button", { name: "Sonraki soru", exact: true }).click();
    }
    await page.getByRole("button", { name: "Çalışmayı kaydet", exact: true }).click();
    await expect(page.locator(".result-stats > div strong")).toHaveText([
      `${entry.questionCount}/${entry.questionCount}`, `${entry.questionCount}/${entry.questionCount}`, "0",
    ]);
    const saved = await storage(page);
    const result = saved.sessions.at(-1)!;
    expect(saved.sessions).toHaveLength(before.sessions.length + 1);
    expect(result.lessonId).toBe(entry.lesson);
    expect(result.responses.map(({ questionId }) => questionId)).toEqual(cards.map(({ id }) => id));
    expect(result.responses.every(({ correct, assisted }) => correct && !assisted)).toBe(true);
    expect(saved.reviews.filter((review) => review.originSessionId === result.id).map(({ stage, targetDate }) => [stage, targetDate])).toEqual([
      [3, "2026-11-25"], [7, "2026-11-29"], [21, "2026-12-13"],
    ]);
    await page.reload();
    expect((await storage(page)).sessions).toEqual(saved.sessions);
    expect((await storage(page)).reviews).toEqual(saved.reviews);
    const source = page.locator(".past-exam-reference").filter({
      hasText: `${entry.official.year} TYT · Temel Matematik · Soru ${entry.official.question} ·`,
    });
    await source.getByRole("button", { name: "Çözümü adım adım aç", exact: true }).click();
    for (let step = 0; step < 2; step += 1)
      await source.getByRole("button", { name: "Sonraki çözüm adımı", exact: true }).click();
    await expect(source.locator(".worked-conclusion")).toContainText(entry.official.example);
    await source.locator("summary").click();
    await expect(source).toContainText(`Resmî cevap: ${entry.official.answer}`);
    await expect(source.getByRole("link", { name: /Resmî kaynak kaydı/ }))
      .toHaveAttribute("href", new RegExp(`^https://dokuman\\.osym\\.gov\\.tr/.+\\.pdf#page=${entry.official.page}$`));
    expect(learning(await storage(page))).toEqual(learning(saved));
  });

  test(`${entry.lesson}: a previous ten-question draft finishes at its original last card offline`, async ({ page, context }) => {
    const cards = flow[entry.lesson].slice(0, 10);
    await prepare(page);
    const before = await storage(page);
    const draft = {
      lessonId: entry.lesson,
      phase: "practice" as const,
      index: 9,
      responses: cards.slice(0, 9).map((card) => ({
        questionId: card.id, selected: card.selected, correct: true,
        assisted: false, confidence: "medium" as const,
      })),
      selected: null,
      checked: false,
      hint: false,
      confidence: "medium" as const,
      note: "Önceki sürümde kaydedilen çalışma notu",
      startedAt: Date.now() - 60_000,
    };
    await context.setOffline(true);
    await page.locator('input[type="file"]').setInputFiles({
      name: "previous-progress.json", mimeType: "application/json",
      buffer: Buffer.from(JSON.stringify({ ...before, draft })),
    });
    await page.getByRole("dialog").getByRole("button", { name: "Yedeği geri yükle", exact: true }).click();
    await expect(page.locator(".toast")).toHaveText("Yedek geri yüklendi.");
    await openCourse(page, entry);
    await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
    await expect(page.locator(".question-meta")).toContainText("10 / 10");
    await expect(page.locator(".question-panel h2")).toHaveText(typeset(cards[9].prompt));
    expect((await storage(page)).draft).toEqual(draft);
    await page.locator(".answer-options .answer").filter({ has: page.getByText(typeset(cards[9].correct), { exact: true }) }).click();
    await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
    await expect(page.locator(".feedback.correct")).toBeVisible();
    await expect(page.getByRole("button", { name: "Sonraki soru", exact: true })).toHaveCount(0);
    await page.getByRole("button", { name: "Çalışmayı kaydet", exact: true }).click();
    await expect(page.locator(".result-stats > div strong")).toHaveText(["10/10", "10/10", "0"]);
    const finished = (await storage(page)).sessions.at(-1)!;
    expect(finished.note).toBe(draft.note);
    expect(finished.responses.slice(0, 9)).toEqual(draft.responses);
    expect(finished.responses.at(-1)?.questionId).toBe(cards[9].id);
  });
}
