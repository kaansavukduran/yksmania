import { expect } from "@playwright/test";
import { readForge014SmokeState as readState } from "./forge014-smoke-cases.mjs";

const lessonId = "tyt-mat-uslu-ifadeler-ogm-kaynak-sorulari-024";
// Literal A–E positions independently checked against the actual OGM source.
// Do not import the production bank or use its answer key as the test oracle.
const expectedAnswers = [4, 3, 4, 0, 1, 2];

/** Extra acceptance for original question assets; not counted as a model flow. */
export async function runSource024OriginalSmoke(page, navigate) {
  await navigate("Sorular");
  await page.getByRole("button", { name: "TYT", exact: true }).click();
  await page.getByRole("textbox", { name: "Ders veya konu ara", exact: true }).fill("MEB OGM kaynak soruları");
  const subject = page.locator(".subject-panel").filter({
    has: page.getByRole("heading", { name: "Matematik", exact: true }),
  });
  const entry = subject.locator(`.ready-topic[data-lesson-id="${lessonId}"]`);
  if (!(await entry.isVisible())) await subject.locator(".subject-header").click();
  await entry.click();
  const replacement = page.getByRole("dialog", { name: "Yarım kalan çalışmayı değiştirelim mi?", exact: true });
  if (await replacement.isVisible()) {
    await replacement.getByRole("button", { name: "Yeni çalışmayı aç", exact: true }).click();
  }
  await expect(page.locator(".question-panel")).toBeVisible();
  const before = await readState(page);
  expect(before.draft.lessonId).toBe(lessonId);
  expect(before.draft.index).toBe(0);
  const imageSizes = [];
  for (const [index, answer] of expectedAnswers.entries()) {
    await expect(page.locator(".question-meta")).toContainText(`Soru ${index + 1} / 6`);
    await expect(page.locator(".question-meta")).toContainText("MEB OGM Materyal");
    await expect(page.locator(".question-panel h2")).not.toBeEmpty();
    await expect(page.locator(".answer-options .answer")).toHaveCount(5);
    const image = page.locator(".question-panel .source-figure-open img");
    await expect(image).toHaveCount(1);
    await expect.poll(() => image.evaluate((node) => node.complete && node.naturalWidth > 100 && node.naturalHeight > 30)).toBe(true);
    imageSizes.push(await image.evaluate((node) => ({ width: node.naturalWidth, height: node.naturalHeight })));
    if (index === 0) {
      const opener = page.locator(".question-panel .source-figure-open");
      const beforeZoom = await readState(page);
      await opener.click();
      const dialog = page.getByRole("dialog", { name: "OGM kaynak soru 1", exact: true });
      await expect(dialog).toBeVisible();
      await dialog.getByRole("button", { name: "Görseli büyüt", exact: true }).click();
      await expect(dialog.getByRole("status", { name: "Görsel yakınlaştırması", exact: true })).toHaveText("%150");
      await page.keyboard.press("Escape");
      await expect(dialog).not.toBeVisible();
      await expect(opener).toBeFocused();
      expect(await readState(page)).toEqual(beforeZoom);
      await page.reload();
      await expect.poll(() => image.evaluate((node) => node.complete && node.naturalWidth > 100)).toBe(true);
      expect(await readState(page)).toEqual(beforeZoom);
    }
    await page.locator(".answer-options .answer").nth(answer).click();
    await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
    await expect(page.locator(".feedback.correct")).toBeVisible();
    await page.getByRole("button", { name: index === 5 ? "Çalışmayı kaydet" : "Sonraki soru", exact: true }).click();
  }
  await expect(page.locator(".result-stats")).toContainText("6/6");
  await expect.poll(async () => (await readState(page)).sessions.length).toBe(before.sessions.length + 1);
  const after = await readState(page);
  const session = after.sessions.at(-1);
  expect(session.lessonId).toBe(lessonId);
  expect(session.responses).toHaveLength(6);
  expect(session.responses.map((response) => response.questionId)).toEqual(expectedAnswers.map((_, index) => `source-ogm-uslu-ifadeler-p01-q0${index + 1}`));
  expect(session.responses.every((response) => response.correct && !response.assisted)).toBe(true);
  expect(after.sessions.slice(0, -1)).toEqual(before.sessions);
  expect(after.reviews.filter((review) => review.lessonId !== lessonId)).toEqual(before.reviews);
  expect(after.settings).toEqual(before.settings);
  expect(after.notes).toEqual(before.notes);
  expect(after.topicProgress).toEqual(before.topicProgress);
  expect(after.theoryReviewCompletions).toEqual(before.theoryReviewCompletions);
  expect(after.explorations).toEqual(before.explorations);
  expect(after.examDraft).toEqual(before.examDraft);
  expect(after.examSessions).toEqual(before.examSessions);
  const ownReviews = after.reviews.filter((review) => review.lessonId === lessonId);
  expect(ownReviews.map((review) => review.stage)).toEqual([3, 7, 21]);
  for (const review of ownReviews) {
    const day = new Date(`${review.anchorDate}T12:00:00Z`);
    day.setUTCDate(day.getUTCDate() + review.stage - 1);
    expect(review.targetDate).toBe(day.toISOString().slice(0, 10));
  }
  await page.reload();
  expect(await readState(page)).toEqual(after);
  return { lessonId, questionIds: session.responses.map((response) => response.questionId), imageSizes, sixUnassistedCorrect: true, zoomAndReloadNoStateWrites: true, savedReviewStages: [3, 7, 21] };
}
