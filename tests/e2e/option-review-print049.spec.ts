import { expect, test } from "@playwright/test";
import { forceVelocityQuestion } from "../../src/learning/forceVelocityOptions048";
import { openCourse, prepare, storage } from "./helpers/revisedCourse";

test.use({ viewport: { width: 320, height: 850 }, reducedMotion: "reduce" });

test("yanlış incelemesi ve yazdırma yalnız kaydedilen grafik sürümünü kullanır", async ({ page, context }, info) => {
  test.setTimeout(90_000);
  await prepare(page, true);
  await context.setOffline(true);
  await openCourse(page, { lesson: "newton", search: "Kuvvet ve Newton" });
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  for (let step = 0; step < 7; step++) {
    await page.locator(".answer-options .answer").first().click();
    await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
    await page.getByRole("button", { name: step < 6 ? "Sonraki soru" : "Çalışmayı kaydet", exact: true }).click();
  }
  await expect(page.locator(".result-page")).toBeVisible();
  const saved = await storage(page);
  const session = saved.sessions.at(-1)!;
  const response = session.responses.at(-1)!;
  expect(response).toMatchObject({ questionId: forceVelocityQuestion.id, selected: 0, correct: false, assisted: false });
  expect(response.optionFigureRevision).toMatch(/^[a-f0-9]{14}$/);

  await page.getByRole("button", { name: "Menüyü aç", exact: true }).press("Enter");
  await page.locator(".sidebar").getByRole("button", { name: "Yanlışlarım", exact: true }).press("Enter");
  const card = page.locator(".mistake-card").filter({
    has: page.getByRole("heading", { name: /hangi hız–zaman grafiği/i }),
  });
  await expect(card.getByRole("figure", { name: "Grafik I", exact: true })).toBeVisible();
  await card.locator("details > summary").first().click();
  await expect(card.getByRole("figure", { name: "Grafik III", exact: true })).toBeVisible();
  const pocket = page.getByRole("region", { name: "Sınav sabahı cep kitapçığı", exact: true });
  const entry = pocket.getByRole("listitem").filter({ hasText: /hangi hız–zaman grafiği/i });
  await expect(entry.getByRole("figure", { name: "Grafik III", exact: true })).toBeVisible();
  await expect(entry.getByRole("figure", { name: "Grafik I", exact: true })).toHaveCount(0);
  await page.evaluate(() => { window.print = () => {}; });
  await pocket.getByRole("button", { name: "Yazdır", exact: true }).click();
  await page.emulateMedia({ media: "print" });
  await expect(page.locator("body")).toHaveClass(/print-booklet/);
  await expect(entry.getByRole("figure", { name: "Grafik III", exact: true })).toBeVisible();
  await expect(entry.locator("svg .emphasized")).toHaveCSS("stroke", "rgb(17, 17, 17)");
  await expect(card).toBeHidden();
  const printPath = info.outputPath("cep-kitapcigi.pdf");
  const printed = await page.pdf({ format: "A4", path: printPath });
  expect(printed.subarray(0, 4).toString()).toBe("%PDF");
  expect(printed.toString("latin1").match(/\/Type\s*\/Page\b/g)?.length).toBeLessThanOrEqual(2);
  await info.attach("cep-kitapcigi-yazdirma", { path: printPath, contentType: "application/pdf" });
  await page.evaluate(() => window.dispatchEvent(new Event("afterprint")));
  await page.emulateMedia({ media: "screen" });
  expect((await storage(page)).sessions).toEqual(saved.sessions);

  // This backup entry lacks a figure revision. Its selected letter persists,
  // but it cannot borrow the current prompt, answer, or graph.
  const { optionFigureRevision: _revision, ...previous } = response;
  const older = { ...saved, sessions: saved.sessions.map((item) =>
    item.id === session.id ? { ...item, responses: [...item.responses.slice(0, -1), previous] } : item),
  };
  await page.evaluate((copy) => new Promise<void>((resolve, reject) => {
    const request = indexedDB.open("yksmania", 2);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const database = request.result;
      const tx = database.transaction("state", "readwrite");
      tx.objectStore("state").put(copy, "current");
      tx.oncomplete = () => { database.close(); resolve(); };
      tx.onabort = () => { database.close(); reject(tx.error); };
    };
  }), older);
  await page.reload();
  const stale = page.locator(".mistake-card").filter({
    has: page.getByRole("heading", { name: "Kayıtlı grafikli soru", exact: true }),
  });
  await expect(stale).toContainText("Senin cevabın: A");
  await expect(stale).toContainText("Kayda ait çizimler bulunamadı");
  await expect(stale.locator(".answer-option-figure")).toHaveCount(0);
  await expect(stale.locator("details")).toHaveCount(0);
  await expect(pocket.getByRole("figure", { name: "Grafik III", exact: true })).toHaveCount(0);
});
