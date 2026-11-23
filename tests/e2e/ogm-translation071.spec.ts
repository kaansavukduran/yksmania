import { expect, test } from "@playwright/test";
import { prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test.use({ viewport: { width: 320, height: 850 }, reducedMotion: "reduce" });

test("beş OGM örneğinde kaynak şekli, ipucu, çözüm ve kayda bağlı çizim çevrimdışı açılır", async ({ page, context }, info) => {
  test.setTimeout(90_000);
  await prepare(page, true);
  await context.setOffline(true);
  await page.getByRole("button", { name: "Menüyü aç", exact: true }).press("Enter");
  await page.locator(".sidebar").getByRole("button", { name: "Sorular", exact: true }).press("Enter");
  await page.getByRole("button", { name: "AYT", exact: true }).click();
  await page.getByRole("textbox", { name: "Ders veya konu ara", exact: true }).fill("OGM kaynak alıştırmaları");
  await page.locator('.ready-topic[data-lesson-id="ayt-geo-ogm-oteleme-071"]').click();

  const drawing = (name: string) => page.getByRole("figure", { name, exact: true });
  const inverse = drawing("Ötelemeden sonra verilen nokta");
  const inverseSolution = drawing("Grafikten başlangıca dönüş");
  const triangle = drawing("Öteleme öncesi ABC üçgeni");
  const triangleSolution = drawing("Öteleme sonrası A′B′C′ üçgeni");
  const nextStep = page.getByRole("button", { name: "Sonraki adım", exact: true });
  const audit = async (label: string) => {
    await page.evaluate(() => document.fonts.ready.then(() => undefined));
    expect((await page.evaluate(svgLayoutAudit, { scope: "figure.source-question-figure" })).issues, label).toEqual([]);
  };
  const runHelp = async (hint: string, solution: typeof inverseSolution) => {
    await expect(solution).toHaveCount(0);
    await page.getByRole("button", { name: "İpucu al", exact: true }).press("Enter");
    await expect(drawing(hint).getByRole("table")).toBeVisible();
    await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(1);
    await expect(solution).toHaveCount(0);
    await page.getByRole("button", { name: "Adım adım çözüm", exact: true }).press("Enter");
    for (const level of [3, 4, 5]) {
      await expect(nextStep).toBeEnabled();
      await nextStep.press("Enter");
      await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(level);
      if (level < 5) await expect(solution).toHaveCount(0);
    }
    await expect(solution.getByRole("img")).toBeVisible();
  };
  await expect(inverse.getByRole("img")).toHaveAccessibleDescription(/eksi 2, y ekseninde 4/);
  await expect(inverse.locator("figcaption")).toHaveCount(0);
  await expect(inverse.locator("svg circle")).toHaveCount(1);
  await inverse.screenshot({ path: info.outputPath("ogm-071-ters-soru.png") });
  await runHelp("Geri dönmek için yönleri tersine çevir", inverseSolution);
  await expect(inverseSolution.getByRole("img")).toHaveAccessibleDescription(/A\(4; 1\)/);
  await expect(inverseSolution.locator("svg circle")).toHaveCount(2);
  await audit("Ters öteleme");
  await page.locator(".answer-options .answer").nth(1).click();
  await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
  await page.getByRole("button", { name: "Sonraki soru", exact: true }).click();

  await expect(triangle.locator("svg circle")).toHaveCount(3);
  await runHelp("Her köşe için aynı iki değişim", triangleSolution);
  await expect(triangleSolution.locator("svg circle")).toHaveCount(6);
  await expect(triangleSolution.getByRole("img")).toHaveAccessibleDescription(/A′\(−1; 1\), B′\(−2; −3\), C′\(2; −1\)/);
  await expect(triangleSolution.locator("figcaption")).toHaveCount(0);
  await audit("Üç köşenin aynı vektörle taşınması");
  await triangleSolution.screenshot({ path: info.outputPath("ogm-071-ucgen-cozum.png") });
  await page.locator(".answer-options .answer").nth(2).click();
  await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
  await page.getByRole("button", { name: "Sonraki soru", exact: true }).click();

  for (const [name, corners, answer, description] of [
    ["ABCD dörtgeni", 4, 3, /A′\(−5; −6\).*D′\(−4; −1\)/],
    ["ABC üçgeni", 3, 0, /A′\(5; 2\).*C′\(7; 0\)/],
    ["ABCDE beşgeni", 5, 2, /A′\(1; 1\).*E′\(2; −2\)/],
  ] as const) {
    const stem = drawing(`${name} · kaynakta verilen konum`);
    const solution = drawing(`${name} · ötelemeden sonraki konum`);
    await expect(stem.locator("svg circle")).toHaveCount(corners);
    await expect(stem.getByRole("img")).not.toHaveAccessibleDescription(/Ötelenen köşeler/);
    if (corners === 5) await stem.screenshot({ path: info.outputPath("ogm-073-5-koseli-soru.png") });
    await runHelp(`${name} · yönleri eksenlere yerleştir`, solution);
    await expect(solution.getByRole("img")).toHaveAccessibleDescription(description);
    await expect(solution.locator("svg circle")).toHaveCount(corners);
    await expect(stem.locator("svg")).toHaveAttribute("viewBox", (await solution.locator("svg").getAttribute("viewBox"))!);
    await solution.screenshot({ path: info.outputPath(`ogm-073-${corners}-koseli-cozum.png`) });
    await audit(name);
    await page.locator(".answer-options .answer").nth(answer).click();
    await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
    if (corners !== 5) await page.getByRole("button", { name: "Sonraki soru", exact: true }).click();
  }
  await page.getByRole("button", { name: "Çalışmayı kaydet", exact: true }).click();
  await expect(page.locator(".result-stats strong")).toHaveText(["5/5", "0/5", "5"]);
  const session = (await storage(page)).sessions.at(-1)!;
  expect(session.responses).toHaveLength(5);
  for (const response of session.responses) {
    expect(response).toMatchObject({
      assisted: true,
      correct: true,
      visibleFigureRevision: expect.stringMatching(/^[0-9a-f]{14}$/),
      solutionFigureRevision: expect.stringMatching(/^[0-9a-f]{14}$/),
    });
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  expect((await page.reload())?.fromServiceWorker()).toBe(true);
  await expect(page.locator(".result-stats strong")).toHaveText(["5/5", "0/5", "5"]);
});
