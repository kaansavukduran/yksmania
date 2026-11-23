import { expect, test } from "@playwright/test";
import { gasExpansionFigureTitle, rigidGasExample, rigidGasTitle } from "../../src/learning/mebiRigidGasReadings";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const course = { lesson: "basinc", search: "Basınç" };
const diagram = (title: string) => `figure[data-section-figure="${title}"]`;
test.use({ viewport: { width: 320, height: 860 }, reducedMotion: "reduce" });

test("gazın sıcaklığı, hacmi ve miktarı ayrı adımlarda basıncı günceller", async ({ page, context }, info) => {
  test.setTimeout(90_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, course);
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği" });
  await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await toc.getByRole("button", { name: rigidGasTitle, exact: true }).press("Enter");
  const figure = page.locator(diagram(rigidGasTitle));
  const slider = figure.getByRole("slider", { name: /Değişim katsayısı/ });
  const next = figure.getByRole("button", { name: "İleri", exact: true });
  await expect(figure).toContainText("Basınç: 1 → 2 atm.");
  await expect(figure).toContainText("Sıcaklık: 2T · Hacim: 1V · Miktar: 1n.");
  await slider.press("Home");
  await expect(figure).toContainText("Basınç: 1 → 1 atm.");
  await slider.press("End");
  await next.press("Enter");
  await expect(figure).toContainText("Basınç: 2 → 1 atm.");
  await expect(figure).toContainText("Sıcaklık: 1T · Hacim: 2V · Miktar: 1n.");
  await expect(figure.getByRole("img")).toHaveAccessibleName(/gaz kapları/);
  const svg = figure.getByRole("img");
  await svg.evaluate((element) => element.scrollIntoView({ block: "center" }));
  await svg.screenshot({ path: info.outputPath("rigid087-volume.png") });
  await next.press("Enter");
  await expect(figure).toContainText("Basınç: 1 → 2 atm.");
  await expect(figure).toContainText("Sıcaklık: 1T · Hacim: 1V · Miktar: 2n.");
  expect((await page.evaluate(svgLayoutAudit, { scope: diagram(rigidGasTitle), figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("gaz Kopya Kağıdı her deneyi ayrı satırda ve yalnız hacim çözümünde doğru çizimle gösterir", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 860 });
  await prepare(page);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-125");
  const row = page.locator(".cheat-section").filter({
    has: page.getByRole("heading", { name: rigidGasTitle, exact: true }),
  });
  await expect(row.getByRole("columnheader")).toHaveText(["Değişen", "Sabit kalan", "İlk basınç", "Değer iki katına çıkınca"]);
  await expect(row.locator(".guide-table-cell-value")).toHaveText([
    "Sıcaklığı artır", "Hacim ve miktar", "1 atm", "2 atm",
    "Gazı daha büyük kaba aktar", "Sıcaklık ve miktar", "2 atm", "1 atm",
    "Kaba gaz ekle", "Sıcaklık ve hacim", "1 atm", "2 atm",
  ]);
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: rigidGasExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  const figure = solution.locator(diagram(gasExpansionFigureTitle));
  await expect(figure.getByRole("img")).toBeVisible();
  await expect(figure).toContainText("Basınç: 2 → 1 atm.");
  expect(learning(await storage(page))).toEqual(before);
});

test("gaz sorusu 120 kPa sonucunu ancak kalıcı son çözümde açar", async ({ page, context }, info) => {
  test.setTimeout(90_000);
  await prepare(page, true);
  await context.setOffline(true);
  await openCourse(page, course);
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  for (let i = 0; i < 5; i += 1) {
    await page.locator(".answer-options .answer").first().click();
    await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
    await page.getByRole("button", { name: "Sonraki soru", exact: true }).click();
  }
  const given = page.getByRole("figure", { name: "Rijit kabın ilk ve son sıcaklığı", exact: true });
  const hint = page.getByRole("figure", { name: "Sabit kalan kap ve gaz miktarını bul", exact: true });
  const result = page.getByRole("figure", { name: "İlk basıncı oranla çarp", exact: true });
  await expect(given.getByRole("img")).toHaveAccessibleDescription(/300 kelvin.*450 kelvin.*basınç bilinmiyor/);
  await expect(result).toHaveCount(0);
  const before = await storage(page);
  await page.getByRole("button", { name: "İpucu al", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(1);
  await expect(hint.getByRole("img")).toHaveAccessibleDescription(/Kap genişlemiyor/);
  await page.getByRole("button", { name: "Adım adım çözüm", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(2);
  const next = page.getByRole("button", { name: "Sonraki adım", exact: true });
  for (const level of [3, 4, 5]) {
    await expect(result).toHaveCount(0);
    await next.press("Enter");
    await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(level);
  }
  await expect(result.getByRole("math")).toHaveAccessibleName(/120 kilopaskal/);
  const helped = await storage(page);
  expect(learning({ ...helped, draft: before.draft })).toEqual(learning(before));
  await page.reload();
  await expect(result.getByRole("math")).toHaveAccessibleName(/120 kilopaskal/);
  await expect(given.getByRole("img")).toBeVisible();
  expect(await storage(page)).toEqual(helped);
  expect((await page.evaluate(svgLayoutAudit, { scope: "figure.source-question-figure" })).issues).toEqual([]);
  await given.getByRole("img").screenshot({ path: info.outputPath("rigid087-question.png") });
});
