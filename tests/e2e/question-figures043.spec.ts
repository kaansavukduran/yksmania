import { expect, test, type Locator } from "@playwright/test";
import { openCourse, prepare, storage } from "./helpers/revisedCourse";

test.use({
  locale: "tr-TR",
  timezoneId: "Europe/Istanbul",
  viewport: { width: 320, height: 850 },
});

async function checkFigureBounds(figure: Locator) {
  const outside = await figure.locator("svg").evaluate((node: SVGSVGElement) => {
    const { x, y, width, height } = node.viewBox.baseVal;
    return Array.from(node.querySelectorAll("text")).flatMap((label) => {
      const box = label.getBBox();
      const fits = box.x >= x && box.y >= y && box.x + box.width <= x + width && box.y + box.height <= y + height;
      return fits ? [] : [{ label: label.textContent, x: box.x, y: box.y, width: box.width, height: box.height }];
    });
  });
  expect(outside).toEqual([]);
}

test("kuvvet kartı yönleri, işaretli ipucunu ve iki çözüm çizimini çevrimdışı gösterir", async ({ page, context }, info) => {
  await prepare(page, true);
  await context.setOffline(true);
  await openCourse(page, { lesson: "newton", search: "Kuvvet ve Newton" });
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  const stem = page.getByRole("figure", { name: "Cisme etki eden kuvvetler", exact: true });
  const hint = page.getByRole("figure", { name: "Sağı pozitif seç", exact: true });
  const net = page.getByRole("figure", { name: "Bileşke kuvvet", exact: true });
  const acceleration = page.getByRole("figure", { name: "Bileşkeyi kütleye böl", exact: true });
  await expect(stem.locator("svg text")).toHaveText(["2 kg", "4 N", "10 N"]);
  await checkFigureBounds(stem);
  expect(await stem.locator("svg text").first().evaluate((label: SVGTextElement) => label.getBBox().y)).toBeGreaterThan(85);
  await expect(hint).toHaveCount(0);
  await expect(net).toHaveCount(0);
  await expect(acceleration).toHaveCount(0);
  await stem.screenshot({ path: info.outputPath("kuvvetler-320.png") });
  await page.getByRole("button", { name: "İpucu al", exact: true }).press("Enter");
  await expect(hint.locator("svg text")).toHaveText(["2 kg", "−4 N", "+10 N"]);
  await checkFigureBounds(hint);
  expect((await storage(page)).draft?.helpLevel).toBe(1);
  await expect(net).toHaveCount(0);
  await page.getByRole("button", { name: "Adım adım çözüm", exact: true }).press("Enter");
  await page.getByRole("button", { name: "Sonraki adım", exact: true }).press("Enter");
  await expect(net.locator("svg text")).toHaveText(["2 kg", "+6 N"]);
  await checkFigureBounds(net);
  await expect(acceleration).toHaveCount(0);
  await page.getByRole("button", { name: "Sonraki adım", exact: true }).press("Enter");
  await expect(acceleration.getByRole("math")).toHaveAccessibleName(/saniye karede 3 metre ve sağa doğru/);
  await net.screenshot({ path: info.outputPath("bileske-320.png") });
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});

test("geometri sorusunun verilen, ipucu ve çözüm çizimleri yalnız ilgili adımda açılır", async ({ page, context }, info) => {
  test.setTimeout(105_000);
  await prepare(page, true);
  await context.setOffline(true);
  await openCourse(page, {
    lesson: "tyt-geo-acilar-kaynak-pekitirme-032",
    search: "Geometrinin dili",
  });
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  for (let i = 0; i < 20; i++) {
    await page.locator(".answer-options .answer").first().click();
    await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
    await page.getByRole("button", { name: "Sonraki soru", exact: true }).click();
  }

  const drawing = (name: string) => page.locator(`.source-question-figure[aria-label="${name}"]`);
  const stem = drawing("Verilen kesişim").and(page.locator(".question-panel > figure"));
  const hint = drawing("Ortak kolu bul");
  const first = drawing("Komşu açıyı hesapla");
  const last = drawing("Ters açıyı hesapla");
  await expect(stem.locator("svg text")).toHaveText(["64°"]);
  await expect(stem.getByRole("img", { name: "Verilen kesişim", exact: true })).toHaveAccessibleDescription(/Diğer kesişimin ölçüsü verilmemiş/);
  await expect(stem.locator("svg path")).toHaveCount(1);
  await expect(hint).toHaveCount(0);
  await expect(first).toHaveCount(0);
  await expect(last).toHaveCount(0);
  const before = await storage(page);
  expect(before.draft?.helpLevel ?? 0).toBe(0);
  await stem.screenshot({ path: info.outputPath("verilen-kesisim-320.png") });

  await page.getByRole("button", { name: "İpucu al", exact: true }).click();
  await expect(hint.locator("svg path")).toHaveCount(2);
  expect((await storage(page)).draft?.helpLevel).toBe(1);
  await expect(hint.locator("svg text")).toHaveText(["64°"]);
  await expect(page.getByRole("complementary", { name: "İpucu", exact: true })).not.toContainText(/116°|ters açı eşit/i);
  await expect(first).toHaveCount(0);
  await page.getByRole("button", { name: "Adım adım çözüm", exact: true }).click();
  await page.getByRole("button", { name: "Sonraki adım", exact: true }).click();
  await expect(first.locator("svg text")).toHaveText(["64°", "116°"]);
  await expect(last).toHaveCount(0);
  expect((await storage(page)).draft?.helpLevel).toBe(3);
  await page.getByRole("button", { name: "Sonraki adım", exact: true }).click();
  await page.getByRole("button", { name: "Sonraki adım", exact: true }).click();
  await expect(last.locator("svg text")).toHaveText(["64°", "116°", "64°"]);
  await checkFigureBounds(last);
  await last.screenshot({ path: info.outputPath("ters-acilar-cozum-320.png") });
  await page.getByRole("button", { name: "Önceki adım", exact: true }).click();
  await expect(last).toHaveCount(0);
  expect((await storage(page)).draft?.helpLevel).toBe(5);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  const saved = await storage(page);
  expect(saved.sessions).toEqual(before.sessions);
  expect(saved.reviews).toEqual(before.reviews);
  expect((await page.reload())?.fromServiceWorker()).toBe(true);
  await expect(stem).toBeVisible();
  expect((await storage(page)).draft).toEqual(saved.draft);
  await page.locator(".answer-options .answer").first().click();
  await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
  await expect.poll(async () => (await storage(page)).draft?.responses.at(-1)?.assisted).toBe(true);
});
