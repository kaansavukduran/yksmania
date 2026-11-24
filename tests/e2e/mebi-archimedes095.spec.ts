import { expect, test } from "@playwright/test";
import { submergedBlockExample, submergedBlockExampleTitle, submergedBlockTitle } from "../../src/learning/mebiArchimedesPressure";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const course = { lesson: "sivilarin-kaldirma-kuvveti", search: "Kaldırma kuvveti", title: "Sıvılarda kaldırma kuvveti: yer değiştiren hacmi izle" };
const diagram = (title: string) => `figure[data-section-figure="${title}"]`;
test.use({ viewport: { width: 320, height: 860 }, reducedMotion: "reduce" });

test("tam batık blok derine inerken net kaldırma korunur", async ({ page, context }, info) => {
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, course);
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği" });
  await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await toc.getByRole("button", { name: submergedBlockTitle, exact: true }).press("Enter");
  const figure = page.locator(diagram(submergedBlockTitle));
  await expect(figure).toContainText("Üst 10 cm: 800 Pa · 16 N aşağı.");
  await expect(figure).toContainText("Alt 25 cm: 2.000 Pa · 40 N yukarı.");
  await expect(figure).toContainText("21 N ve 21 N. Net kaldırma: 24 N yukarı.");
  await figure.getByRole("slider", { name: /Üst yüz derinliği/ }).press("End");
  await expect(figure).toContainText("Üst 50 cm: 4.000 Pa · 80 N aşağı.");
  await expect(figure).toContainText("Alt 65 cm: 5.200 Pa · 104 N yukarı.");
  await expect(figure).toContainText("69 N ve 69 N. Net kaldırma: 24 N yukarı.");
  const svg = figure.getByRole("img");
  await expect(svg).toHaveAccessibleName(/karşılıklı yan yüzlerinde içeri/);
  await svg.evaluate((element) => element.scrollIntoView({ block: "center" }));
  await svg.screenshot({ path: info.outputPath("archimedes095-depth.png") });
  expect((await page.evaluate(svgLayoutAudit, { scope: diagram(submergedBlockTitle), figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı basınç ve kaldırma hesabını çevrimdışı birlikte gösterir", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 860 });
  await prepare(page);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-126");
  const row = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: submergedBlockTitle, exact: true }) });
  await expect(row.getByRole("columnheader")).toHaveText(["Üst yüz derinliği", "Üstten aşağı", "Alttan yukarı", "Net kaldırma"]);
  await expect(row.locator(".guide-table-cell-value")).toHaveText(["10 cm", "16 N", "40 N", "24 N", "50 cm", "80 N", "104 N", "24 N"]);
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: submergedBlockExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  const figure = solution.locator(diagram(submergedBlockExampleTitle));
  await expect(figure.getByRole("img")).toBeVisible();
  await expect(figure).toContainText("Net kaldırma: 24 N yukarı.");
  expect(learning(await storage(page))).toEqual(before);
});

test("soru çizimi, ipucu ve son işlem ayrı zamanda açılır", async ({ page, context }, info) => {
  await prepare(page, true);
  await context.setOffline(true);
  await openCourse(page, course);
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  const given = page.getByRole("figure", { name: "Tamamen batık 3 L cisim", exact: true });
  const hint = page.getByRole("figure", { name: "Kaldırma için batan hacmi kullan", exact: true });
  const answer = page.getByRole("figure", { name: "Sıvı ağırlığından kaldırmayı bul", exact: true });
  await expect(given.getByRole("img")).toHaveAccessibleDescription(/3 litrelik cismin üstünde/);
  await expect(given).not.toContainText("24 N");
  await expect(hint).toHaveCount(0);
  await expect(answer).toHaveCount(0);
  const before = await storage(page);
  await page.getByRole("button", { name: "İpucu al", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(1);
  await expect(hint.getByRole("math")).toHaveAccessibleName(/batan hacimdir/);
  await page.getByRole("button", { name: "Adım adım çözüm", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(2);
  const next = page.getByRole("button", { name: "Sonraki adım", exact: true });
  for (const level of [3, 4, 5]) {
    await expect(answer).toHaveCount(0);
    await next.press("Enter");
    await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(level);
  }
  await expect(answer.getByRole("math")).toHaveAccessibleName(/yirmi dört newtondur/);
  const state = await storage(page);
  expect(learning({ ...state, draft: before.draft })).toEqual(learning(before));
  await page.reload();
  await expect(answer.getByRole("math")).toBeVisible();
  const drawing = given.getByRole("img");
  const labelsFit = await drawing.evaluate((svg) => {
    const frame = svg.getBoundingClientRect();
    const labels = Array.from(svg.querySelectorAll("text"), (label) => label.getBoundingClientRect());
    return labels.length === 2 && labels[0].bottom < labels[1].top &&
      labels.every((label) => label.left >= frame.left && label.right <= frame.right && label.bottom <= frame.bottom);
  });
  expect(labelsFit).toBe(true);
  await drawing.evaluate((element) => element.scrollIntoView({ block: "center" }));
  await drawing.screenshot({ path: info.outputPath("archimedes095-question.png") });
});
