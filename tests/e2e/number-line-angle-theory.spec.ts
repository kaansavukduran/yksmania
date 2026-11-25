import { expect, test, type Locator, type Page } from "@playwright/test";
import { registerOfflineBootDiagnostics } from "./helpers/offlineBootDiagnostics";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";

registerOfflineBootDiagnostics();
test.use({ viewport: { width: 320, height: 844 }, reducedMotion: "reduce" });

const numberTitle = "Sayı doğrusunda sırayı ve uzaklığı ayır";
const intervalTitle = "Açık ve kapalı sınırdan tam sayıları bul";
const angleTitle = "Doğrusal çiftte açıortaylar";
const exampleTitle = "Bütünler açıların iki açıortayını birleştir";

function figure(parent: Page | Locator, title: string) {
  return parent.locator(`figure[data-section-figure="${title}"]`);
}

async function checkFrame(page: Page, panel: Locator) {
  const image = panel.getByRole("img");
  await expect(image).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  expect(await image.evaluate((svg) => {
    const frame = svg.getBoundingClientRect();
    return [...svg.querySelectorAll("text")].every((text) => {
      const label = text.getBoundingClientRect();
      return label.left >= frame.left - 1 && label.right <= frame.right + 1
        && label.top >= frame.top - 1 && label.bottom <= frame.bottom + 1;
    });
  })).toBe(true);
}

test("Number-line reading, worked interval and cheat sheet stay usable offline", async ({ page, context }, info) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "temel-kavramlar", search: "Temel Kavramlar", title: "Temel kavramlar: sayı, değer ve tanım koşulu" });
  const compare = figure(page, numberTitle);
  const slider = compare.getByRole("slider", { name: /B’nin değeri/ });
  await expect(compare).toContainText("−3 < 2");
  const original = await compare.getByRole("img").innerHTML();
  await slider.press("Home");
  await expect(compare).toContainText("−3 > −6");
  expect(await compare.getByRole("img").innerHTML()).not.toBe(original);
  await slider.fill("-3");
  await expect(compare).toContainText("−3 = −3");
  await checkFrame(page, compare);
  const example = page.locator(".worked-example").filter({ hasText: intervalTitle });
  await example.locator("summary").press("Enter");
  await expect(figure(example, intervalTitle)).toHaveCount(0);
  await example.getByRole("button", { name: "Çözümün tamamını göster" }).press("Enter");
  const bounds = figure(example, intervalTitle);
  await expect(bounds).toContainText("→ 6 tam sayı.");
  await checkFrame(page, bounds);
  await bounds.screenshot({ path: info.outputPath("tam-sayi-sinirlari.png") });
  await page.goto("/#/cheatsheets?topic=detail-194");
  await expect(figure(page, numberTitle)).toBeVisible();
  await checkFrame(page, figure(page, numberTitle));
  expect(learning(await storage(page))).toEqual(before);
});

test("Linear pair and bisector step use the same model in theory and cheat sheet", async ({ page, context }, info) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-geo-acilar-kaynak-pekitirme-032";
  await openCourse(page, { lesson, search: "Geometrinin dili" });
  const model = figure(page, angleTitle);
  await expect(model).toContainText("39° + 51° = 90°");
  const original = await model.getByRole("img").innerHTML();
  await model.getByRole("slider", { name: /Sağ koldan ölçülen açı/ }).press("End");
  await expect(model).toContainText("150° + 30° = 180°");
  await expect(model).toContainText("75° + 15° = 90°");
  expect(await model.getByRole("img").innerHTML()).not.toBe(original);
  await checkFrame(page, model);
  await model.screenshot({ path: info.outputPath("aciortay.png") });
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await expect(figure(page.locator(".cheat-section"), angleTitle)).toBeVisible();
  const example = page.locator(".worked-example").filter({ hasText: exampleTitle });
  await example.locator(":scope > summary").press("Enter");
  await example.locator(".cheat-solution > summary").press("Enter");
  const explanation = figure(example, angleTitle);
  await expect(explanation).toContainText("39° + 51° = 90°");
  await checkFrame(page, explanation);
  expect(learning(await storage(page))).toEqual(before);
});
