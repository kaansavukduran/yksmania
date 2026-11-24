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

test("Division conditions are readable as a table in the lesson and cheat sheet", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, {
    lesson: "tek-cift-isaret",
    search: "iki ayrı özellik",
    title: "Tek–çift ve işaret: iki ayrı özellik",
  });
  const panel = page.getByRole("region", { name: /Bölümün paritesinden önce tam sayı oluşunu denetle/ });
  const table = panel.getByRole("table");
  await expect(table.getByRole("columnheader")).toHaveCount(3);
  await expect(table.getByRole("row")).toHaveCount(6);
  await expect(table.getByRole("row").filter({ hasText: "−18 ÷ 6" })).toContainText("Sonuç tek.");
  await expect(table.getByRole("row").filter({ hasText: "14 ÷ 6" })).toContainText("tam sayı değildir");
  await table.getByRole("row").filter({ hasText: "12 ÷ 0" }).scrollIntoViewIfNeeded();
  await expect(table.getByRole("row").filter({ hasText: "12 ÷ 0" })).toContainText("Bölüm tanımsızdır");
  await page.goto("/#/cheatsheets?topic=detail-195");
  await expect(table.getByRole("row")).toHaveCount(6);
  await panel.focus();
  await expect(panel).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  expect(learning(await storage(page))).toEqual(before);
});

test("An angle bisector and a median mark different equalities in the same triangle", async ({ page, context }, info) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-geo-ucgende-acilar-031";
  await openCourse(page, { lesson, search: "Üçgende açılar" });
  const model = figure(page, "Açıortay ve orta nokta");
  await expect(model).toContainText("25° + 25° = 50°");
  await expect(model).toContainText("= 95°");
  const original = await model.getByRole("img").innerHTML();
  await model.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(model).toContainText("AM = MC.");
  expect(await model.getByRole("img").innerHTML()).not.toBe(original);
  await checkFrame(page, model);
  await model.screenshot({ path: info.outputPath("kenarortay.png") });
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  await expect(model).toContainText("25° + 25° = 50°");
  await model.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(model).toContainText("AM = MC.");
  await checkFrame(page, model);
  expect(learning(await storage(page))).toEqual(before);
});

test("A removed-term candidate can fall between two sequence terms", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/lesson?id=ardisik-sayilar");
  const title = "Silinen terim adayını listede doğrula";
  const panel = figure(page, title);
  await expect(panel).toContainText("14 listede yok");
  const beforeImage = await panel.getByRole("img").innerHTML();
  await panel.getByRole("slider", { name: /Kalan toplam/ }).press("ArrowRight");
  await expect(panel).toContainText("13 listede.");
  expect(await panel.getByRole("img").innerHTML()).not.toBe(beforeImage);
  await checkFrame(page, panel);
  await page.goto("/#/cheatsheets?topic=detail-196");
  await expect(panel).toContainText("14 listede yok");
  await panel.getByRole("slider", { name: /Kalan toplam/ }).press("ArrowRight");
  await expect(panel).toContainText("13 listede.");
  expect(learning(await storage(page))).toEqual(before);
});

test("Triangle existence is checked before wide-angle classification", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  const lesson = "tyt-geo-ucgen-esitsizligi-031";
  await page.goto(`/#/lesson?id=${lesson}`);
  const table = page.getByRole("region", { name: /Açı koşulunu yalnız kurulabilen üçgenlerde dene/ }).getByRole("table");
  await expect(table.getByRole("row")).toHaveCount(6);
  await expect(table.getByRole("row").filter({ hasText: "Dar açılı" })).toContainText("64 < 74");
  await expect(table.getByRole("row").filter({ hasText: "Geniş açılı" })).toHaveCount(3);
  await expect(table.getByRole("row").filter({ hasText: "Üçgen kurulmaz" })).toContainText("12");
  await page.goto(`/#/cheatsheets?topic=topic-${lesson}`);
  const sheet = page.getByRole("region", { name: /Önce üçgen, sonra açı sınıfı/ }).getByRole("table");
  await expect(sheet.getByRole("row").filter({ hasText: "Üçgen kurulmaz" })).toContainText("12");
  expect(learning(await storage(page))).toEqual(before);
});
