import { expect, test } from "@playwright/test";
import { balanceTheoryTitle, weightedBalanceTitle } from "../../src/learning/weightedThermalBalance067";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test.use({ viewport: { width: 320, height: 850 }, reducedMotion: "reduce" });

test("farklı ısı sığası örneğinde denge çizimini yalnız ilgili çözüm adımında çevrimdışı açar", async ({ page, context }) => {
  test.setTimeout(85_000);
  await prepare(page, true);
  const initial = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "isi-ve-sicaklik", search: "Isı ve sıcaklık" });
  const contents = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  await contents.getByText("İçindekiler", { exact: true }).click();
  await contents.getByRole("button", { name: "Çözümlü örnekler", exact: true }).press("Enter");
  const example = page.locator(".worked-example").filter({ hasText: "Eşit enerjiler, farklı sıcaklık değişimleri" });
  await example.locator("summary").press("Enter");
  const scope = `figure[data-section-figure="${weightedBalanceTitle}"]`;
  const figure = example.locator(scope);
  await expect(figure).toHaveCount(0);
  await example.getByRole("button", { name: "İlk adımı göster", exact: true }).press("Enter");
  await expect(figure).toHaveCount(0);
  await expect(example).not.toContainText("Denge sıcaklığı 60 °C");
  await example.getByRole("button", { name: "Sonraki adım", exact: true }).press("Enter");
  await expect(figure).toContainText("Orta nokta 47,5 °C. Denge 60 °C.");
  await expect(example).not.toContainText("12.000 J");
  await figure.getByRole("slider", { name: /X’in ilk sıcaklığı/ }).press("End");
  await expect(figure).toContainText("Orta nokta 52,5 °C. Denge 67,27 °C.");
  await example.getByRole("button", { name: "Sonraki adım", exact: true }).press("Enter");
  await expect(example).toContainText("Y’nin kazancı 12.000 J.");
  const layout = await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true });
  expect(layout.issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(initial);
});

test("ayrı Kopya Kağıdı iki sığayı tablodan ve denge noktasından karşılaştırır", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 850 });
  await prepare(page);
  const initial = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-119");
  const section = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: balanceTheoryTitle, exact: true }) });
  await expect(section.getByRole("rowheader")).toHaveText(["X", "Y"]);
  await expect(section.getByRole("cell")).toHaveText(["2m × 4c = 8mc", "75 °C", "−15 °C", "3m × c = 3mc", "20 °C", "+40 °C"]);
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: "Eşit enerjiler, farklı sıcaklık değişimleri" });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.getByRole("img")).toBeVisible();
  await expect(solution).toContainText("Denge sıcaklığı 60 °C, Y’nin kazancı 12.000 J.");
  expect(learning(await storage(page))).toEqual(initial);
});
