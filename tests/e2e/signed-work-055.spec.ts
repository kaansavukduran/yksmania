import { expect, test } from "@playwright/test";
import { prepare, storage } from "./helpers/revisedCourse";
import { forge026PhysicsLessons } from "../../src/learning/forge026Physics";

const lesson = forge026PhysicsLessons.find((item) => item.id === "enerji-ve-hareket-ileri")!;

test.use({
  locale: "tr-TR",
  timezoneId: "Europe/Istanbul",
  viewport: { width: 320, height: 850 },
});

test("iş sorusu kuvvetleri ve yalnız açılan çözüm adımını çevrimdışı gösterir", async ({ page, context }) => {
  test.setTimeout(90_000);
  await prepare(page, true);
  await context.setOffline(true);
  const before = await storage(page);
  await page.getByRole("button", { name: "Menüyü aç", exact: true }).click();
  await page.locator(".sidebar").getByRole("button", { name: "Sorular", exact: true }).click();
  await page.getByRole("textbox", { name: "Ders veya konu ara", exact: true }).fill("Enerji ve hareket");
  await page.locator(`.ready-topic[data-lesson-id="${lesson.id}"]`).click();

  const given = page.getByRole("figure", { name: "Yer değiştirme ve verilen kuvvetler", exact: true });
  const help = page.locator(".question-help");
  const hint = help.getByRole("figure", { name: "Kuvvet yönünü yer değiştirmeyle karşılaştır", exact: true }).getByRole("table");
  const work = help.getByRole("figure", { name: "Her kuvvetin yaptığı iş", exact: true }).getByRole("table");
  const sum = help.getByRole("figure", { name: "İşaretli işleri topla", exact: true });
  const kinetic = help.getByRole("figure", { name: "Net iş kinetik enerji artışıdır", exact: true });

  await expect(given.locator("svg text")).toHaveText(["İtiş 10 N", "Direnç 4 N", "Normal 20 N", "Yer değiştirme 5 m"]);
  await expect(given.getByRole("img")).toHaveAccessibleDescription(/normal kuvveti yer değiştirmeye dik/i);
  await expect(hint).toHaveCount(0);
  await expect(work).toHaveCount(0);
  await expect(sum).toHaveCount(0);
  await expect(kinetic).toHaveCount(0);

  await page.getByRole("button", { name: "İpucu al", exact: true }).press("Enter");
  await expect(hint.getByRole("cell")).toHaveText(["Aynı yön", "Ters yön", "Dik"]);
  await expect(help).not.toContainText(/(?:50|20|30)\s*J/);
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(1);
  await expect(work).toHaveCount(0);
  await page.getByRole("button", { name: "Adım adım çözüm", exact: true }).press("Enter");

  const openFollowing = async (step: number) => {
    await expect(help.locator(".help-rail button[aria-current='step']")).toHaveAccessibleName(`Adım ${step}`);
    await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(step);
    const next = help.getByRole("button", { name: "Sonraki adım", exact: true });
    await expect(next).toBeEnabled();
    await next.press("Enter");
  };

  await openFollowing(2);
  await expect(work.getByRole("cell")).toHaveText(["+10 N", "+50 J", "−4 N", "−20 J", "0 N", "0 J"]);
  await expect(sum).toHaveCount(0);
  await openFollowing(3);
  await expect(sum.getByRole("math")).toHaveAccessibleName(/artı 30 joule/);
  await expect(kinetic).toHaveCount(0);
  await openFollowing(4);
  await expect(kinetic.getByRole("math")).toHaveAccessibleName(/30 joule artar/);

  await page.locator(".answer-options .answer").nth(2).click();
  await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
  await expect.poll(async () => (await storage(page)).draft?.responses[0]).toMatchObject({
    questionId: "f026p-enerji-ve-hareket-1",
    correct: true,
    assisted: true,
    helpLevel: 5,
    visibleFigureRevision: expect.stringMatching(/^[0-9a-f]{14}$/),
    solutionFigureRevision: expect.stringMatching(/^[0-9a-f]{14}$/),
  });
  const after = await storage(page);
  expect(after.sessions).toEqual(before.sessions);
  expect(after.reviews).toEqual(before.reviews);
  expect(after.topicProgress).toEqual(before.topicProgress);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);

  const next = page.getByRole("button", { name: "Sonraki soru", exact: true });
  await next.click();
  for (const [index, question] of lesson.questions.slice(1).entries()) {
    const incorrect = (question.answer + 1) % question.options.length;
    await page.locator(".answer-options .answer").nth(incorrect).click();
    await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
    const isLast = index === lesson.questions.length - 2;
    await (isLast ? page.getByRole("button", { name: "Çalışmayı kaydet", exact: true }) : next).click();
  }

  await expect(page.locator(".result-stats strong")).toHaveText(["1/24", "0/24", "1"]);
  const completed = await storage(page);
  const result = completed.sessions.at(-1)!;
  expect(result.lessonId).toBe(lesson.id);
  expect(result.responses[0]).toEqual(after.draft?.responses[0]);
  expect(completed.reviews.filter((item) => item.originSessionId === result.id).map(({ stage, targetDate }) => [stage, targetDate])).toEqual([
    [3, "2026-11-25"], [7, "2026-11-29"], [21, "2026-12-13"],
  ]);
  await page.reload();
  await expect(page.locator(".result-stats strong")).toHaveText(["1/24", "0/24", "1"]);
});
