import { expect, test } from "@playwright/test";
import { thermalTransferTitle } from "../../src/learning/thermalTransfer063";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test.use({ viewport: { width: 320, height: 850 }, reducedMotion: "reduce" });

test("iki cismin ortak sıcaklığını ve ısı akışını çevrimdışı üç adımda gösterir", async ({ page, context }) => {
  test.setTimeout(80_000);
  await prepare(page, true);
  const initial = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "isi-ve-sicaklik", search: "Isı ve sıcaklık" });
  await page.getByText("İçindekiler", { exact: true }).click();
  await page.getByRole("button", { name: thermalTransferTitle, exact: true }).press("Enter");
  const scope = `figure[data-section-figure="${thermalTransferTitle}"]`;
  const figure = page.locator(scope);
  const forward = figure.getByRole("button", { name: "İleri", exact: true });
  await expect(figure).toContainText("60 °C, soğuk başlayan 20 °C");
  await expect(figure).toContainText("Net enerji akışı sıcak taraftan soğuk tarafa.");
  await forward.press("Enter");
  await expect(figure).toContainText("50 °C, soğuk başlayan 30 °C");
  await expect(figure).toContainText("4.000 J aktarıldı.");
  await forward.press("Enter");
  await expect(figure).toContainText("40 °C, soğuk başlayan 40 °C");
  await expect(figure).toContainText("8.000 J aktarıldı.");
  await expect(figure).toContainText("Sıcaklıklar eşit. Net ısı aktarımı durdu.");
  await expect(forward).toBeDisabled();
  await figure.getByRole("slider", { name: /Sıcak cismin ilk sıcaklığı/ }).press("End");
  await expect(figure).toContainText("50 °C, soğuk başlayan 50 °C");
  await expect(figure).toContainText("12.000 J aktarıldı.");

  const layout = await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true });
  expect(layout.issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(initial);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});

test("ayrı Kopya Kağıdı ısıl denge tablosunu ve çözüm çizimini açar", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 850 });
  await prepare(page);
  const initial = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-119");
  const section = page.locator(".cheat-section").filter({
    has: page.getByRole("heading", { name: thermalTransferTitle, exact: true }),
  });
  await expect(section.getByRole("rowheader")).toHaveText(["Başlangıç", "Aktarımın yarısı", "Denge"]);
  await expect(section.getByRole("cell")).toHaveText(["60 °C", "20 °C", "0 J", "50 °C", "30 °C", "4.000 J", "40 °C", "40 °C", "8.000 J"]);
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: "Sıcaklık ve aktarılan enerji" });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.getByRole("img")).toBeVisible();
  await expect(solution).toContainText("40 °C ve soğuk cismin kazancı 8.000 J.");
  expect(learning(await storage(page))).toEqual(initial);
});
