import { expect, test } from "@playwright/test";
import answers from "../fixtures/source039-permutation-flow.json" with { type: "json" };
import { typeset } from "../../src/domain/typeset";
import { registerOfflineBootDiagnostics } from "./helpers/offlineBootDiagnostics";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";

registerOfflineBootDiagnostics();
test.use({ locale: "tr-TR", timezoneId: "Europe/Istanbul" });

const courses = [
  {
    lesson: "tyt-mat-permutasyon-kaynak-032", search: "Permütasyon",
    model: "source032-separated-permutations", exploration: "separated-permutations-source-032",
    sheet: "Blok ve önce gelme", reference: "2025 TYT · Temel Matematik · Soru 29",
    questionUrl: "https://dokuman.osym.gov.tr/pdfdokuman/2025/YKS/TSK/yks_tyt_2025_kitapcik_d250.pdf#page=32",
    keyUrl: "https://dokuman.osym.gov.tr/pdfdokuman/2025/YKS/TSK/yks_tyt_2025_kitapcik_d250.pdf#page=43",
    example: "40 sıra.",
  },
  {
    lesson: "tyt-mat-tekrarli-permutasyon-kaynak-033", search: "Tekrarlı permütasyon",
    model: "source033-waypoint-paths", exploration: "waypoint-paths-source-033",
    sheet: "Zorunlu durak", reference: "2018 TYT · Temel Matematik · Soru 28",
    questionUrl: "https://dokuman.osym.gov.tr/pdfdokuman/2018/YKS/TYT_01072018.pdf#page=30",
    keyUrl: "https://dokuman.osym.gov.tr/pdfdokuman/2018/YKS/TYT_01072018.pdf#page=42",
    example: "10 farklı rota.",
  },
] as const;

for (const course of courses) {
  test(`${course.search}: model, not ve Kopya Kağıdı 320 pikselde çevrimdışı çalışır`, async ({ page, context }, info) => {
    await prepare(page, true);
    await page.setViewportSize({ width: 320, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const before = learning(await storage(page));
    await context.setOffline(true);
    await openCourse(page, course);
    const model = page.locator(`[data-model="${course.model}"]`);
    const disclosure = model.locator(":scope > summary");
    await disclosure.focus();
    await page.keyboard.press("Enter");
    const drawing = model.getByRole("img");
    const result = model.getByRole("status");
    await expect(drawing).toBeVisible();
    const initial = await drawing.innerHTML();
    if (course.model === "source032-separated-permutations") {
      await expect(result).toContainText("1.440 uygun düzen");
      await model.getByRole("button", { name: "Etiketsiz çember", exact: true }).click();
      await expect(result).toContainText("144 uygun düzen");
      expect(await drawing.innerHTML()).not.toBe(initial);
      await model.getByRole("button", { name: "Numaralı çember", exact: true }).click();
      await expect(result).toContainText("1.008 uygun düzen");
      await model.getByRole("slider", { name: /Özel kişi sayısı/ }).press("End");
      await expect(result).toContainText("0 uygun düzen");
      await expect(drawing).toHaveCount(0);
      await model.getByRole("slider", { name: /^Kişi sayısı/ }).press("Home");
      await expect(result).toContainText("Tek kişi komşu olamaz.");
      await expect(drawing).toBeVisible();
    } else {
      await expect(result).toContainText("35 yol");
      await expect(result).toContainText("geçen 18, uğramayan 17");
      await model.getByRole("button", { name: "Durağa uğrama", exact: true }).click();
      expect(await drawing.innerHTML()).not.toBe(initial);
      await model.getByRole("slider", { name: /Durağın yatay koordinatı/ }).press("Home");
      await expect(result).toContainText("geçen 15, uğramayan 20");
      await model.getByRole("slider", { name: /Durağın düşey koordinatı/ }).press("Home");
      await expect(result).toContainText("geçen 35, uğramayan 0");
      await expect(model.getByText("Bu durak bütün yolların üzerindedir.", { exact: false })).toBeVisible();
      await model.getByRole("button", { name: "Duraktan geç", exact: true }).click();
      await model.getByRole("slider", { name: /Durağın yatay koordinatı/ }).press("ArrowRight");
      await expect(result).toContainText("geçen 20, uğramayan 15");
    }

    const notes = page.locator(".study-notes").getByRole("textbox", { name: "Notun", exact: true });
    await notes.fill("Ayrı durumları saymadan toplamı yazmadım.");
    await expect.poll(async () => (await storage(page)).notes[`lesson:${course.lesson}`]).toBe("Ayrı durumları saymadan toplamı yazmadım.");
    const saved = await storage(page);
    expect(saved.explorations[course.exploration]).toBeDefined();
    expect(learning(saved)).toEqual(before);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(321);
    await page.reload();
    if (await model.getAttribute("open") === null) await disclosure.click();
    await expect(drawing).toBeVisible();
    await expect(notes).toHaveValue("Ayrı durumları saymadan toplamı yazmadım.");
    expect((await storage(page)).explorations[course.exploration]).toEqual(saved.explorations[course.exploration]);
    await model.screenshot({ path: info.outputPath("model.png") });
    await page.goto(`/#/cheatsheets?topic=topic-${course.lesson}`);
    await expect(page.getByRole("heading", { name: course.sheet, exact: true })).toBeVisible();
    expect(learning(await storage(page))).toEqual(before);
  });

  test(`${course.search}: sekiz özgün kart, kayıt, tekrar ve resmî kaynak`, async ({ page, context }) => {
    test.setTimeout(85_000);
    await prepare(page);
    const before = await storage(page);
    await context.setOffline(true);
    await openCourse(page, course);
    await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
    const cards = answers[course.lesson];
    expect(cards).toHaveLength(8);
    for (const [index, card] of cards.entries()) {
      await expect(page.locator(".question-meta > span").first()).toHaveText(`Soru ${index + 1} / 8`);
      await expect(page.locator(".question-panel h2")).toHaveText(typeset(card.prompt));
      const options = page.locator(".answer-options .answer");
      await expect(options).toHaveCount(5);
      await options.filter({ has: page.getByText(typeset(card.correct), { exact: true }) }).click();
      await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
      await expect(page.locator(".feedback.correct")).toBeVisible();
      if (index === 3) {
        await expect.poll(async () => (await storage(page)).draft?.responses.length).toBe(4);
        await page.reload();
        await expect(page.locator(".feedback.correct")).toBeVisible();
        expect((await storage(page)).sessions).toEqual(before.sessions);
      }
      if (index < cards.length - 1) await page.getByRole("button", { name: "Sonraki soru", exact: true }).click();
    }
    await page.getByRole("button", { name: "Çalışmayı kaydet", exact: true }).click();
    await expect(page.locator(".result-stats > div strong")).toHaveText(["8/8", "8/8", "0"]);
    const saved = await storage(page);
    const session = saved.sessions.at(-1)!;
    expect(saved.sessions).toHaveLength(before.sessions.length + 1);
    expect(session.lessonId).toBe(course.lesson);
    expect(session.responses.map(({ questionId }) => questionId)).toEqual(cards.map(({ id }) => id));
    expect(session.responses.every(({ correct, assisted }) => correct && !assisted)).toBe(true);
    expect(saved.reviews.filter((review) => review.originSessionId === session.id).map(({ stage, targetDate }) => [stage, targetDate])).toEqual([
      [3, "2026-11-25"], [7, "2026-11-29"], [21, "2026-12-13"],
    ]);
    await page.reload();
    const source = page.locator(".past-exam-reference").filter({ hasText: course.reference });
    await source.getByRole("button", { name: "Çözümü adım adım aç", exact: true }).click();
    for (let i = 0; i < 2; i += 1) await source.getByRole("button", { name: "Sonraki çözüm adımı", exact: true }).click();
    await expect(source.locator(".worked-conclusion")).toContainText(course.example);
    await source.locator("summary").click();
    await expect(source).toContainText("Resmî cevap: C");
    await expect(source.getByRole("link", { name: /Resmî kaynak kaydı/ })).toHaveAttribute("href", course.questionUrl);
    await expect(source.getByRole("link", { name: "Resmî cevap anahtarı (internet)" })).toHaveAttribute("href", course.keyUrl);
    expect(learning(await storage(page))).toEqual(learning(saved));
  });
}
