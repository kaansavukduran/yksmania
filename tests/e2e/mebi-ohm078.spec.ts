import { expect, test } from "@playwright/test";
import { meterConnectionsTitle, ohmMeasurementsTitle, ohmSlopeExample } from "../../src/learning/mebiOhmReadings";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const entry = { lesson: "elektrik-akimi", search: "Elektrik akımı" };
const scope = (title: string) => `figure[data-section-figure="${title}"]`;
test.use({ viewport: { width: 320, height: 860 }, reducedMotion: "reduce" });

test("seri ve paralel ölçüm yolları ile V–I eğimi çevrimdışı incelenir", async ({ page, context }, info) => {
  test.setTimeout(100_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, entry);
  const go = async (name: string) => {
    const contents = page.getByRole("navigation", { name: "Anlatım içeriği" });
    const link = contents.getByRole("button", { name, exact: true });
    if (!(await link.isVisible())) await contents.getByText("İçindekiler", { exact: true }).click();
    await link.press("Enter");
    return page.locator(scope(name));
  };
  const meter = await go(meterConnectionsTitle);
  const next = meter.getByRole("button", { name: "İleri", exact: true });
  for (const note of [
    "Ampermetre 2 A, voltmetre 8 V ölçer.",
    "İdeal ölçü kolunda akım yok.",
    "Kapalı akım yolu kalmaz. Akım sıfır.",
    "Direnç ve ampermetre aynı kolda. Akım 2 A.",
    "Gerçek akımı kaynak ve bağlantı dirençleri sınırlar.",
  ]) {
    await expect(meter).toContainText(note);
    if (await next.isEnabled()) await next.press("Enter");
  }
  expect((await page.evaluate(svgLayoutAudit, { scope: scope(meterConnectionsTitle), figuresOnly: true, explore: true })).issues).toEqual([]);
  const plot = await go(ohmMeasurementsTitle);
  await expect(plot).toContainText("ΔI = 1 A. ΔV = 4 V.");
  await plot.getByRole("img").screenshot({ path: info.outputPath("ohm078-grafik.png") });
  await plot.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(plot).toContainText("ΔI = 0,5 A. ΔV = 2 V.");
  await plot.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(plot).toContainText("ΔI = 1,5 A. ΔV = 6 V.");
  await expect(plot).toContainText("Eğim: ΔV / ΔI = 4 Ω.");
  expect((await page.evaluate(svgLayoutAudit, { scope: scope(ohmMeasurementsTitle), figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("ayrı Kopya Kağıdı dört gerçek ölçümü ve çizimli çözümü taşır", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 860 });
  await prepare(page);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-123");
  const table = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: ohmMeasurementsTitle, exact: true }) });
  await expect(table.getByRole("columnheader")).toHaveText(["Gerilim (V)", "Akım (A)", "Direnç (Ω)"]);
  await expect(table.locator(".guide-table-cell-value")).toHaveText(["2", "0,5", "4", "4", "1", "4", "6", "1,5", "4", "8", "2", "4"]);
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: ohmSlopeExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(scope(ohmMeasurementsTitle)).getByRole("img")).toBeVisible();
  expect(learning(await storage(page))).toEqual(before);
});

test("özgün V–I sorusu 5 ohmu yalnız kaydedilmiş son adımda gösterir", async ({ page, context }, info) => {
  test.setTimeout(90_000);
  await prepare(page, true);
  await context.setOffline(true);
  await openCourse(page, entry);
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  for (let index = 0; index < 3; index++) {
    await page.locator(".answer-options .answer").first().click();
    await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
    await page.getByRole("button", { name: "Sonraki soru", exact: true }).click();
  }
  const given = page.getByRole("figure", { name: "Akım–gerilim ölçüm noktası", exact: true });
  const final = page.getByRole("figure", { name: "Direnci eğimden hesapla", exact: true });
  await expect(given.getByRole("img")).toHaveAccessibleDescription(/2 amper, 10 volt/);
  await expect(final).toHaveCount(0);
  await page.getByRole("button", { name: "İpucu al", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(1);
  await expect(page.getByRole("figure", { name: "Eğim için eksenleri eşleştir" }).getByRole("table")).toBeVisible();
  await page.getByRole("button", { name: "Adım adım çözüm", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(2);
  const next = page.getByRole("button", { name: "Sonraki adım", exact: true });
  for (const level of [3, 4, 5]) {
    await expect(final).toHaveCount(0);
    await expect(next).toBeEnabled();
    await next.press("Enter");
    await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(level);
  }
  await expect(final).toBeVisible();
  await given.getByRole("img").screenshot({ path: info.outputPath("ohm078-soru.png") });
  expect((await page.evaluate(svgLayoutAudit, { scope: "figure.source-question-figure" })).issues).toEqual([]);
});
