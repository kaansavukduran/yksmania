import { expect, test } from "@playwright/test";
import { electroscopeTitle } from "../../src/learning/electroscopeInduction070";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const scope = `figure[data-section-figure="${electroscopeTitle}"]`;

test.use({ viewport: { width: 320, height: 850 }, reducedMotion: "reduce" });

test("elektroskop yaprakları çevrimdışı kapanır ve aynı toplam yükle ters işaretle açılır", async ({ page, context }) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "durgun-elektrik", search: "Durgun elektrik" });
  await page.getByText("İçindekiler", { exact: true }).click();
  await page.getByRole("button", { name: electroscopeTitle, exact: true }).press("Enter");
  const model = page.locator(scope);
  const effect = model.getByRole("slider", { name: /Temassız etki/ });
  await expect(effect).toHaveValue("0");
  await expect(model).toContainText("Yapraklar pozitif işaretle açık.");

  await effect.press("ArrowRight");
  await expect(effect).toHaveValue("1");
  await expect(model).toContainText("Yapraklar kapalı.");
  await expect(model).toContainText("Topuz bölgesi +2. Yaprak bölgesi 0. Elektroskop toplamı +2 model birimi.");

  await effect.press("ArrowRight");
  await expect(effect).toHaveValue("2");
  await expect(model).toContainText("Yapraklar negatif işaretle yeniden açık.");
  await expect(model.getByRole("img").locator("text")).toContainText(["+3", "−1"]);
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  await effect.press("Home");
  await expect(model).toContainText("Topuz bölgesi +1. Yaprak bölgesi +1. Elektroskop toplamı +2 model birimi.");
  expect(learning(await storage(page))).toEqual(before);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});

test("ayrı Kopya Kağıdı yerel yükleri gösterir ve örnek çizimini çözümle açar", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 850 });
  await prepare(page);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-122");
  const section = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: electroscopeTitle, exact: true }) });
  await expect(section.getByRole("rowheader")).toHaveText(["Uzak", "Yaklaşır", "Daha yakın"]);
  await expect(section.getByRole("cell")).toHaveText(["+1", "Açık", "0", "Kapalı", "−1", "Yeniden açık"]);
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: "Kapanan yapraklarla toplam yükü karşılaştır" });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(scope).getByRole("img")).toBeVisible();
  await expect(solution).toContainText("Elektroskobun toplam yükü her iki durumda da +2 model birimi.");
  expect(learning(await storage(page))).toEqual(before);
});
