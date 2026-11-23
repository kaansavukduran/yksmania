import { expect, test } from "@playwright/test";
import { groundingTransferTitle } from "../../src/learning/groundingTransfer074";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const scope = `figure[data-section-figure="${groundingTransferTitle}"]`;
test.use({ viewport: { width: 320, height: 850 }, reducedMotion: "reduce" });

test("topraklama çizimi bilimsel yönü ve iki yükün korunumunu çevrimdışı gösterir", async ({ page, context }, info) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "durgun-elektrik", search: "Durgun elektrik" });
  await page.getByText("İçindekiler", { exact: true }).click();
  await page.getByRole("button", { name: groundingTransferTitle, exact: true }).press("Enter");
  const model = page.locator(scope);
  const forward = model.getByRole("button", { name: "İleri", exact: true });
  await expect(model).toContainText("Anahtar açık. Küre −3.");
  await expect(model).toContainText("Elektron geçişi yok.");
  await expect(model.getByRole("img").locator("text")).not.toContainText(["e⁻"]);
  await forward.press("Enter");
  await expect(model).toContainText("Elektron: küreden Dünya’ya.");
  await expect(model).toContainText("Küre 0. Dünya’nın yük değişimi −3.");
  await expect(model.getByRole("img").locator("text").filter({ hasText: "e⁻" })).toBeVisible();
  await forward.press("Enter");
  await expect(model).toContainText("Anahtar açık. Küre +3.");
  await forward.press("Enter");
  await expect(model).toContainText("Elektron: Dünya’dan küreye.");
  await expect(model).toContainText("Küre 0. Dünya’nın yük değişimi +3.");
  await expect(forward).toBeDisabled();
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  await model.screenshot({ path: info.outputPath("topraklama074-ders.png") });
  expect(learning(await storage(page))).toEqual(before);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});

test("ayrı Kopya Kağıdı iki topraklama yönünü ve çözümlü şekli açar", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 850 });
  await prepare(page);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-122");
  const section = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: groundingTransferTitle, exact: true }) });
  await expect(section.getByRole("columnheader")).toHaveText(["İlk küre yükü", "Elektron yönü", "Son küre yükü", "Dünya’nın yük değişimi"]);
  await expect(section.locator(".guide-table-cell-value")).toHaveText(["−3", "Küreden Dünya’ya", "0", "−3", "+3", "Dünya’dan küreye", "0", "+3"]);
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: "İki küreyi ayrı ayrı toprakla" });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(scope).getByRole("img")).toBeVisible();
  await expect(solution).toContainText("Dünya’nın yük değişimleri sırasıyla −3 ve +3 model birimi.");
  expect(learning(await storage(page))).toEqual(before);
});

test("mevcut topraklama sorusunda elektron oku yalnız son adımda ve kaydedilen sürümde görülür", async ({ page, context }, info) => {
  test.setTimeout(90_000);
  await prepare(page, true);
  await context.setOffline(true);
  await openCourse(page, { lesson: "durgun-elektrik", search: "Durgun elektrik" });
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  for (let index = 0; index < 9; index++) {
    await page.locator(".answer-options .answer").first().click();
    await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
    await page.getByRole("button", { name: "Sonraki soru", exact: true }).click();
  }
  const given = page.getByRole("figure", { name: "Negatif küre ve toprak bağlantısı", exact: true });
  const result = page.getByRole("figure", { name: "Elektronların küreden Dünya’ya aktarılması", exact: true });
  await expect(given.getByRole("img")).toHaveAccessibleDescription(/Aktarım yönü gösterilmemiş/);
  await expect(result).toHaveCount(0);
  await page.getByRole("button", { name: "İpucu al", exact: true }).press("Enter");
  await expect(page.getByRole("figure", { name: "Negatif yükün ne anlattığını hatırla" }).getByRole("table")).toBeVisible();
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(1);
  await page.getByRole("button", { name: "Adım adım çözüm", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(2);
  const nextStep = page.getByRole("button", { name: "Sonraki adım", exact: true });
  for (const level of [3, 4, 5]) {
    await expect(result).toHaveCount(0);
    await expect(nextStep).toBeEnabled();
    await nextStep.press("Enter");
    await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(level);
  }
  await expect(result.getByRole("img")).toHaveAccessibleDescription(/küreden iletken tel boyunca Dünya’ya yöneliyor/);
  expect((await page.evaluate(svgLayoutAudit, { scope: "figure.source-question-figure" })).issues).toEqual([]);
  await result.screenshot({ path: info.outputPath("topraklama074-soru-cozum.png") });
  await page.locator(".answer-options .answer").filter({ hasText: "Elektronlar küreden Dünya’ya gider" }).click();
  await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
  await page.getByRole("button", { name: "Çalışmayı kaydet", exact: true }).click();
  const response = (await storage(page)).sessions.at(-1)?.responses.at(-1);
  expect(response).toMatchObject({
    questionId: "durgun-elektrik-q10", assisted: true, correct: true,
    visibleFigureRevision: expect.stringMatching(/^[0-9a-f]{14}$/),
    solutionFigureRevision: expect.stringMatching(/^[0-9a-f]{14}$/),
  });
  expect((await page.reload())?.fromServiceWorker()).toBe(true);
  expect((await storage(page)).sessions.at(-1)?.responses.at(-1)).toEqual(response);
});
