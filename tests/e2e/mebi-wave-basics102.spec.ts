import { expect, test } from "@playwright/test";
import { wavelengthTitle, wavePeriodExample, wavePeriodTitle, waveRopeTitle } from "../../src/learning/mebiWaveBasics";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const course = { lesson: "dalgalara-giris", search: "Dalgalara giriş" };
const figure = (title: string) => `figure[data-section-figure="${title}"]`;

test("tepeden tepeye ve çukurdan çukura ölçüler aynı dalga boyuyla değişir", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 375, height: 860 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, course);
  const contents = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  await contents.getByText("İçindekiler", { exact: true }).press("Enter");
  await contents.getByRole("button", { name: wavelengthTitle, exact: true }).press("Enter");
  const model = page.locator(figure(wavelengthTitle));
  const svg = model.getByRole("img");
  await expect(svg).toHaveAccessibleName(/Komşu tepe ve çukur çiftlerinin her birinde λ uzunluğu/);
  await expect(model).toContainText("Tepe aralığı: 2,5 m. Çukur aralığı: 2,5 m.");
  const first = await svg.innerHTML();
  await model.getByRole("slider", { name: /Dalga boyu λ/ }).press("ArrowRight");
  await expect(model).toContainText("Tepe aralığı: 2,75 m. Çukur aralığı: 2,75 m.");
  await expect(model).toContainText("En yakın tepe–çukur: 1,375 m. Dört tepe boyunca: 8,25 m.");
  expect(await svg.innerHTML()).not.toBe(first);
  await svg.screenshot({ path: info.outputPath("wavelength102-crest-trough.png") });
  expect((await page.evaluate(svgLayoutAudit, { scope: figure(wavelengthTitle), figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("ayrı Kopya Kağıdı telin sabit ucunu ve periyot çözümünü çevrimdışı açar", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 430, height: 860 });
  await prepare(page);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-127");
  const rope = page.locator(figure(waveRopeTitle));
  await expect(rope.getByRole("img")).toHaveAccessibleName(/Sağ uç sabit duvara bağlı/);
  const section = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: waveRopeTitle, exact: true }) });
  await expect(section.getByRole("columnheader")).toHaveText(["Hangi gözlem?", "Bir tam tekrar", "Birim"]);
  await expect(section.getByRole("row", { name: "Aynı noktayı zamanla izle Periyot T s", exact: true })).toBeVisible();
  await rope.getByRole("img").screenshot({ path: info.outputPath("wavelength102-rope.png") });
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: wavePeriodExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(figure(wavePeriodTitle)).getByRole("img")).toBeVisible();
  await expect(solution).toContainText("T = 2 s / 4 = 0,5 s");
  await expect(solution).toContainText("f = 1 / 0,5 = 2 Hz; f·T = 1");
  expect(learning(await storage(page))).toEqual(before);
});
