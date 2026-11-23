import { expect, test } from "@playwright/test";
import { pascalAddedPressureTitle, sharedLevelExample, sharedLevelTitle } from "../../src/learning/mebiPascalLayers";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const course = { lesson: "basinc", search: "Basınç" };
const figure = (title: string) => `figure[data-section-figure="${title}"]`;
test.use({ viewport: { width: 320, height: 860 }, reducedMotion: "reduce" });

test("Pascal artışı ve U borusu iki okumayı çevrimdışı birlikte gösterir", async ({ page, context }, info) => {
  test.setTimeout(90_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, course);
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği" });
  await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await toc.getByRole("button", { name: pascalAddedPressureTitle, exact: true }).press("Enter");
  const piston = page.locator(figure(pascalAddedPressureTitle));
  await expect(piston).toContainText("1 m: 12 kPa. 2 m: 22 kPa. Fark 10 kPa.");
  const force = piston.getByRole("slider", { name: "Pistona ek kuvvet (N)" });
  await force.press("Home");
  await expect(piston).toContainText("1 m: 10 kPa. 2 m: 20 kPa. Fark 10 kPa.");
  await force.press("End");
  await expect(piston).toContainText("1 m: 14 kPa. 2 m: 24 kPa. Fark 10 kPa.");
  expect((await page.evaluate(svgLayoutAudit, { scope: figure(pascalAddedPressureTitle), figuresOnly: true, explore: true })).issues).toEqual([]);
  await toc.getByRole("button", { name: sharedLevelTitle, exact: true }).press("Enter");
  const layers = page.locator(figure(sharedLevelTitle));
  await expect(layers).toContainText("T: 3,2 kPa. N: 2 + 1,2 = 3,2 kPa.");
  const height = layers.getByRole("slider", { name: "Katman birimi h (m)" });
  await height.press("Home");
  await expect(layers).toContainText("T: 1,6 kPa. N: 1 + 0,6 = 1,6 kPa.");
  await height.press("End");
  await expect(layers).toContainText("T: 4,8 kPa. N: 3 + 1,8 = 4,8 kPa.");
  const diagram = layers.getByRole("img");
  await diagram.evaluate((element) => element.scrollIntoView({ block: "center" }));
  await diagram.screenshot({ path: info.outputPath("pascal081-layers.png") });
  expect((await page.evaluate(svgLayoutAudit, { scope: figure(sharedLevelTitle), figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı K katmanını 2h verir ve çizimi çözümde açar", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 860 });
  await prepare(page);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-125");
  const table = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: sharedLevelTitle, exact: true }) });
  await expect(table.getByRole("columnheader")).toHaveText(["Seviye", "Yukarıdaki katmanlar", "Hava hariç basınç"]);
  await expect(table.locator(".guide-table-cell-value")).toHaveText(["T", "L: 4h", "4h · ρL · g", "N", "K: 2h, M: h", "2h · ρK · g + h · ρM · g"]);
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: sharedLevelExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(figure(sharedLevelTitle)).getByRole("img")).toBeVisible();
  expect(learning(await storage(page))).toEqual(before);
});

test("hidrolik soru 180 N'u kalıcı son çözüm adımında açar", async ({ page, context }, info) => {
  test.setTimeout(90_000);
  await prepare(page, true);
  await context.setOffline(true);
  await openCourse(page, course);
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  for (let i = 0; i < 4; i++) {
    await page.locator(".answer-options .answer").first().click();
    await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
    await page.getByRole("button", { name: "Sonraki soru", exact: true }).click();
  }
  const stem = page.getByRole("figure", { name: "Aynı yükseklikte iki piston", exact: true });
  const final = page.getByRole("figure", { name: "Büyük pistondaki kuvveti bul", exact: true });
  await expect(stem.getByRole("img")).toHaveAccessibleDescription(/45 newton/);
  await page.getByRole("button", { name: "İpucu al", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(1);
  await expect(page.getByRole("figure", { name: "Pistonların ortak seviyesini bul" })).toBeVisible();
  await page.getByRole("button", { name: "Adım adım çözüm", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(2);
  const next = page.getByRole("button", { name: "Sonraki adım", exact: true });
  for (const level of [3, 4, 5]) {
    await expect(final).toHaveCount(0);
    await expect(next).toBeEnabled();
    await next.press("Enter");
    await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(level);
  }
  await expect(final.getByRole("math")).toHaveAccessibleName(/180 newton/);
  await stem.getByRole("img").screenshot({ path: info.outputPath("pascal081-question.png") });
  expect((await page.evaluate(svgLayoutAudit, { scope: "figure.source-question-figure" })).issues).toEqual([]);
});
