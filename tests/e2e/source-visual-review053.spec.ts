import { expect, test } from "@playwright/test";
import questions from "../../src/learning/originalOgmExercises024.json" with { type: "json" };
import { prepare, storage } from "./helpers/revisedCourse";

const lessonId = "tyt-mat-uslu-ifadeler-ogm-kaynak-sorulari-024";

test.use({ viewport: { width: 320, height: 850 }, reducedMotion: "reduce" });

test("asıl soru görseli yalnız eşleşen kayıtta incelenir ve gerçek kitapçıkta basılır", async ({ page, context }, info) => {
  test.setTimeout(90_000);
  await prepare(page, true);
  await context.setOffline(true);
  await page.getByRole("button", { name: "Menüyü aç", exact: true }).press("Enter");
  await page.locator(".sidebar").getByRole("button", { name: "Sorular", exact: true }).press("Enter");
  await page.getByRole("textbox", { name: "Ders veya konu ara", exact: true }).fill("MEB OGM kaynak soruları");
  await page.locator(`.ready-topic[data-lesson-id="${lessonId}"]`).click();
  await expect(page.getByRole("figure", { name: "OGM kaynak soru 1", exact: true })).toBeVisible();
  for (const [index, question] of questions.entries()) {
    const selected = index ? question.correctIndex : (question.correctIndex + 1) % question.options.length;
    await page.locator(".answer-options .answer").nth(selected).click();
    await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
    const complete = index === questions.length - 1;
    await page.getByRole("button", { name: complete ? "Çalışmayı kaydet" : "Sonraki soru", exact: true }).click();
  }
  await expect(page.locator(".result-page")).toBeVisible();
  const original = await storage(page);
  const session = original.sessions.at(-1)!;
  const first = session.responses[0];
  expect(first).toMatchObject({ questionId: questions[0].id, correct: false, assisted: false });
  expect(first.visibleFigureRevision).toMatch(/^[a-f0-9]{14}$/);
  expect(first.solutionFigureRevision).toMatch(/^[a-f0-9]{14}$/);

  await page.getByRole("button", { name: "Menüyü aç", exact: true }).press("Enter");
  await page.locator(".sidebar").getByRole("button", { name: "Yanlışlarım", exact: true }).press("Enter");
  const card = page.locator(".mistake-card").filter({ has: page.getByRole("figure", { name: "OGM kaynak soru 1", exact: true }) });
  await expect(card.getByRole("figure", { name: "OGM kaynak soru 1", exact: true })).toBeVisible();
  await expect(card.getByRole("math")).toHaveCount(0);
  await card.locator("details > summary").first().press("Enter");
  await expect(card.getByRole("math")).toBeVisible();

  const pocket = page.getByRole("region", { name: "Sınav sabahı cep kitapçığı", exact: true });
  const printedImage = pocket.getByRole("figure", { name: "OGM kaynak soru 1", exact: true }).getByRole("img");
  await expect(printedImage).toBeVisible();
  await expect.poll(() => printedImage.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBeGreaterThan(0);
  await page.evaluate(() => { window.print = () => {}; });
  await pocket.getByRole("button", { name: "Yazdır", exact: true }).click();
  await page.emulateMedia({ media: "print" });
  await expect(printedImage).toBeVisible();
  await expect(card).toBeHidden();
  const path = info.outputPath("ogm-cep-kitapcigi.pdf");
  const written = await page.pdf({ format: "A4", path });
  expect(written.subarray(0, 4).toString()).toBe("%PDF");
  expect(written.toString("latin1")).toMatch(/\/Subtype\s*\/Image/);
  await info.attach("gerçek-kitapçık", { path, contentType: "application/pdf" });
  await page.evaluate(() => window.dispatchEvent(new Event("afterprint")));
  await page.emulateMedia({ media: "screen" });
  expect((await storage(page)).sessions).toEqual(original.sessions);

  const { visibleFigureRevision: _visible, solutionFigureRevision: _solution, ...historical } = first;
  const backup = {
    ...original,
    sessions: original.sessions.map((item) => item.id === session.id
      ? { ...item, responses: [historical, ...item.responses.slice(1)] }
      : item),
  };
  await page.evaluate((snapshot) => new Promise<void>((resolve, reject) => {
    const request = indexedDB.open("yksmania", 2);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const database = request.result;
      const transaction = database.transaction("state", "readwrite");
      transaction.objectStore("state").put(snapshot, "current");
      transaction.oncomplete = () => { database.close(); resolve(); };
      transaction.onabort = () => { database.close(); reject(transaction.error); };
    };
  }), backup);
  await page.reload();
  const old = page.locator(".mistake-card").filter({ has: page.getByRole("heading", { name: "Kayıtlı grafikli soru", exact: true }) });
  await expect(old).toContainText(`Senin cevabın: ${String.fromCharCode(65 + historical.selected)}`);
  await expect(old.getByRole("figure")).toHaveCount(0);
  await expect(pocket.getByRole("figure", { name: "OGM kaynak soru 1", exact: true })).toHaveCount(0);
});
