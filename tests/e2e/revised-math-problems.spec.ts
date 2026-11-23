import { expect, test } from "@playwright/test";
import fractionAndAgeFlow from "../fixtures/source032-math-question-flow.json" with { type: "json" };
import percentAndProfitFlow from "../fixtures/source033-math-question-flow.json" with { type: "json" };
import { typeset } from "../../src/domain/typeset";
import { registerOfflineBootDiagnostics } from "./helpers/offlineBootDiagnostics";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";

registerOfflineBootDiagnostics();
test.use({ locale: "tr-TR", timezoneId: "Europe/Istanbul" });

const flow = { ...fractionAndAgeFlow, ...percentAndProfitFlow };
const courses = [
  {
    lesson: "kesir-problemleri",
    search: "Kesir problemleri",
    topic: "detail-211",
    model: "source018-inverse-remainder",
    exploration: "inverse-remainder-source-018",
    sheet: "Kalan sıfırsa önce kalan oranına bak",
    count: 15,
    official: [{ year: 2023, question: 3, page: 23, answer: "D", example: "324 birim sıvı kalır." }],
  },
  {
    lesson: "yas-problemleri",
    search: "Yaş problemleri",
    topic: "detail-212",
    model: "source019-calendar-age",
    exploration: "calendar-age-source-019",
    sheet: "Takvimde girilen yaş ile tamamlanan yaşı ayır",
    count: 16,
    official: [
      { year: 2023, question: 26, page: 30, answer: "E", example: "Yaş toplamı 69." },
      { year: 2026, question: 21, page: 30, answer: "E", example: "2027’de yaş toplamı 73." },
    ],
  },
  {
    lesson: "yuzde-problemleri",
    search: "Yüzde problemleri",
    topic: "detail-213",
    model: "source020-equal-remainders",
    exploration: "equal-remainders-source-020",
    sheet: "Kalan miktarları eşitlerken kapasiteleri yaz",
    count: 16,
    official: [{ year: 2026, question: 19, page: 30, answer: "E", example: "İkinci akvaryum başlangıçta %80 doluydu." }],
  },
  {
    lesson: "kar-zarar-problemleri",
    search: "Kâr zarar problemleri",
    topic: "detail-214",
    model: "source021-fire-profit",
    exploration: "fire-profit-source-021",
    sheet: "İndirim sınırını korunacak kâra göre hesapla",
    count: 16,
    official: [{ year: 2024, question: 8, page: 26, answer: "A", example: "10.000<b<20.000 TL" }],
  },
] as const;

for (const course of courses) {
  test(`${course.lesson}: exact models and notes persist offline at 320px without learning credit`, async ({ page, context }, info) => {
    await prepare(page, true);
    await page.setViewportSize({ width: 320, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const before = learning(await storage(page));
    await context.setOffline(true);
    await openCourse(page, course);
    const panel = page.locator(`[data-model="${course.model}"]`);
    const disclosure = panel.locator(":scope > summary");
    await disclosure.focus();
    await page.keyboard.press("Enter");
    const graph = panel.getByRole("img");
    await expect(graph).toBeVisible();
    const original = await graph.innerHTML();
    const result = panel.getByRole("status");
    if (course.lesson === "kesir-problemleri") {
      await expect(result).toContainText("Başlangıç 700");
      await panel.getByRole("button", { name: "2 kalan, 3/4 pay", exact: true }).click();
      await expect(result).toContainText("Başlangıç 8/3");
      expect(await graph.innerHTML()).not.toBe(original);
      const count = panel.getByRole("checkbox", { name: "Öğe adedi olarak say", exact: true });
      await count.check();
      await expect(result).toContainText("Tam sayı çözümü yok");
      await expect(graph).toHaveCount(0);
      await count.uncheck();
      await panel.getByRole("button", { name: "Sıfır kalan payı", exact: true }).click();
      await expect(result).toContainText("Başlangıç tek olarak belirlenemez");
      await panel.getByRole("slider", { name: "Son kalan miktar", exact: true }).press("ArrowRight");
      await expect(result).toContainText("Çözüm yok");
      await panel.getByRole("button", { name: "2 kalan, 3/4 pay", exact: true }).click();
    } else if (course.lesson === "yas-problemleri") {
      await expect(result).toContainText("Tamamlanan yaş 13");
      await panel.getByRole("button", { name: "20 Aralık 2025 örneği", exact: true }).click();
      await expect(result).toContainText("Tamamlanan yaş 14");
      expect(await graph.innerHTML()).not.toBe(original);
      const observed = panel.getByRole("group", { name: "Bakılan tarih", exact: true });
      const day = observed.getByRole("textbox", { name: "Gün", exact: true });
      const year = observed.getByRole("textbox", { name: "Yıl", exact: true });
      await year.press("Control+a");
      await year.pressSequentially("2010");
      await expect(result).toContainText("Bakılan tarih doğumdan önce");
      await year.fill("");
      await expect(result).toContainText("geçerli bir tarih gir");
      await expect(graph).toHaveCount(0);
      await year.fill("2025");
      await day.fill("19");
      await expect(result).toContainText("Tamamlanan yaş 13");
      const datesFit = await panel.locator(".f011m-date input").evaluateAll((inputs) => {
        const measurement = document.createElement("canvas").getContext("2d")!;
        return inputs.every((element) => {
          const input = element as HTMLInputElement;
          const style = getComputedStyle(input);
          measurement.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
          const padding = Number.parseFloat(style.paddingLeft) + Number.parseFloat(style.paddingRight);
          return measurement.measureText(input.value).width <= input.clientWidth - padding;
        });
      });
      expect(datesFit).toBe(true);
    } else if (course.lesson === "yuzde-problemleri") {
      await expect(result).toContainText("%56,25");
      await panel.getByRole("button", { name: "Küçük B kabı", exact: true }).click();
      await expect(result).toContainText("%112,5");
      await expect(result).toContainText("Bu doluluk %100’ü aşıyor.");
      expect(await graph.innerHTML()).not.toBe(original);
      await panel.getByRole("slider", { name: "B kabının içeriğinden tüketilen", exact: true }).press("End");
      await expect(result).toContainText("Eşit kalan mümkün değil.");
      await panel.getByRole("slider", { name: "A kabının içeriğinden tüketilen", exact: true }).press("End");
      await expect(result).toContainText("başlangıç doluluğu tek olarak belirlenemez.");
      await panel.getByRole("button", { name: "Küçük B kabı", exact: true }).click();
    } else {
      await expect(result).toContainText("Kâr 45 TL.");
      await panel.getByRole("button", { name: "Zarar etmeme fiyatını dene", exact: true }).click();
      await expect(result).toContainText("Başa baş. Gelir maliyete eşit.");
      expect(await graph.innerHTML()).not.toBe(original);
      const units = panel.getByRole("slider", { name: "Satılabilir adet", exact: true });
      await units.press("ArrowLeft");
      await expect(result).toContainText("Zarar 24 TL.");
      await expect(result).toContainText("Ödenen toplam alış maliyeti 360 TL.");
      await expect(result).toContainText("Bu adet için tam başa baş fiyatı kuruşla yazılamaz.");
      await panel.getByRole("button", { name: "Zarar etmeme fiyatını dene", exact: true }).click();
      await expect(result).toContainText("Kâr 0,08 TL.");
      await units.press("Home");
      await expect(result).toContainText("Zarar 360 TL.");
      await expect(result).toContainText("Satılabilir ürün başına maliyet ve başa baş fiyatı bulunamaz.");
      await panel.getByRole("textbox", { name: "Birim satış fiyatı (TL)", exact: true }).fill("0,001");
      await expect(result).toContainText("Geçerli bir satış fiyatı gir.");
      await expect(graph).toHaveCount(0);
      await panel.getByRole("button", { name: "Örneğe dön", exact: true }).click();
      await units.press("ArrowLeft");
    }
    const note = "Şekildeki sonucu başlangıç koşuluyla denetledim.";
    const notes = page.locator(".study-notes").getByRole("textbox", { name: "Notun", exact: true });
    await notes.fill(note);
    await expect.poll(async () => (await storage(page)).notes[`lesson:${course.lesson}`]).toBe(note);
    const saved = await storage(page);
    expect(saved.explorations[course.exploration]).toBeDefined();
    expect(learning(saved)).toEqual(before);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(321);
    await page.reload();
    if (await panel.getAttribute("open") === null) await disclosure.click();
    await expect(graph).toBeVisible();
    await expect(notes).toHaveValue(note);
    const reopened = await storage(page);
    expect(reopened.explorations[course.exploration]).toEqual(saved.explorations[course.exploration]);
    expect(reopened.settings).toEqual(saved.settings);
    expect(learning(reopened)).toEqual(before);
    await panel.screenshot({ path: info.outputPath("320px-model.png") });
    await page.goto(`/#/cheatsheets?topic=${course.topic}`);
    await expect(page.getByRole("heading", { name: course.sheet, exact: true })).toBeVisible();
    expect(learning(await storage(page))).toEqual(before);
  });

  test(`${course.lesson}: all current cards, offline reload, review stages and official shelf`, async ({ page, context }) => {
    test.setTimeout(120000);
    const cards = flow[course.lesson];
    expect(cards).toHaveLength(course.count);
    await prepare(page);
    const before = await storage(page);
    await context.setOffline(true);
    await openCourse(page, course);
    await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
    for (const [index, card] of cards.entries()) {
      await expect(page.locator(".question-meta > span").first()).toHaveText(`Soru ${index + 1} / ${course.count}`);
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
      if (index + 1 < course.count)
        await page.getByRole("button", { name: "Sonraki soru", exact: true }).click();
    }
    await page.getByRole("button", { name: "Çalışmayı kaydet", exact: true }).click();
    await expect(page.locator(".result-stats > div strong")).toHaveText([
      `${course.count}/${course.count}`, `${course.count}/${course.count}`, "0",
    ]);
    const saved = await storage(page);
    const written = saved.sessions.at(-1)!;
    expect(saved.sessions).toHaveLength(before.sessions.length + 1);
    expect(written.lessonId).toBe(course.lesson);
    expect(written.responses.map(({ questionId }) => questionId)).toEqual(cards.map(({ id }) => id));
    expect(written.responses.every(({ correct, assisted }) => correct && !assisted)).toBe(true);
    expect(saved.reviews.filter((item) => item.originSessionId === written.id).map(({ stage, targetDate }) => [stage, targetDate])).toEqual([
      [3, "2026-11-25"], [7, "2026-11-29"], [21, "2026-12-13"],
    ]);
    await page.reload();
    expect(learning(await storage(page))).toEqual(learning(saved));
    for (const official of course.official) {
      const source = page.locator(".past-exam-reference").filter({
        hasText: `${official.year} TYT · Temel Matematik · Soru ${official.question} ·`,
      });
      await source.getByRole("button", { name: "Çözümü adım adım aç", exact: true }).click();
      for (let step = 0; step < 2; step += 1)
        await source.getByRole("button", { name: "Sonraki çözüm adımı", exact: true }).click();
      await expect(source.locator(".worked-conclusion")).toContainText(typeset(official.example));
      await source.locator("summary").click();
      await expect(source).toContainText(`Resmî cevap: ${official.answer}`);
      await expect(source.getByRole("link", { name: /Resmî kaynak kaydı/ }))
        .toHaveAttribute("href", new RegExp(`^https://dokuman\\.osym\\.gov\\.tr/.+\\.pdf#page=${official.page}$`));
    }
    expect(learning(await storage(page))).toEqual(learning(saved));
  });

  test(`${course.lesson}: restoration keeps the old tenth card, note and prior responses`, async ({ page, context }) => {
    const oldCards = flow[course.lesson].slice(0, 10);
    await prepare(page);
    const before = await storage(page);
    const draft = {
      lessonId: course.lesson,
      phase: "practice",
      index: 9,
      responses: oldCards.slice(0, 9).map((card) => ({
        questionId: card.id, selected: card.selected, correct: true,
        assisted: false, confidence: "medium",
      })),
      selected: null,
      checked: false,
      hint: false,
      confidence: "medium",
      note: "Önceki sürümdeki kesintisiz çalışma notum.",
      startedAt: Date.now() - 60_000,
    };
    await context.setOffline(true);
    await page.locator('input[type="file"]').setInputFiles({
      name: "previous-progress.json", mimeType: "application/json",
      buffer: Buffer.from(JSON.stringify({ ...before, draft })),
    });
    await page.getByRole("dialog").getByRole("button", { name: "Yedeği geri yükle", exact: true }).click();
    await expect(page.locator(".toast")).toHaveText("Yedek geri yüklendi.");
    await openCourse(page, course);
    await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
    await expect(page.locator(".question-meta")).toContainText("10 / 10");
    const last = oldCards[9];
    await expect(page.locator(".question-panel h2")).toHaveText(typeset(last.prompt));
    expect((await storage(page)).draft).toEqual(draft);
    await page.locator(".answer-options .answer").filter({ has: page.getByText(typeset(last.correct), { exact: true }) }).click();
    await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
    await expect(page.locator(".feedback.correct")).toBeVisible();
    await expect(page.getByRole("button", { name: "Sonraki soru", exact: true })).toHaveCount(0);
    await page.getByRole("button", { name: "Çalışmayı kaydet", exact: true }).click();
    await expect(page.locator(".result-stats > div strong")).toHaveText(["10/10", "10/10", "0"]);
    const finished = (await storage(page)).sessions.at(-1)!;
    expect(finished.note).toBe(draft.note);
    expect(finished.responses.slice(0, 9)).toEqual(draft.responses);
    expect(finished.responses.at(-1)?.questionId).toBe(last.id);
  });
}
