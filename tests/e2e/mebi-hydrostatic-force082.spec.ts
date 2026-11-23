import { expect, test } from "@playwright/test";
import { baseForceTitle, surfaceForceExample, surfaceForceTitle } from "../../src/learning/mebiHydrostaticForces";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const course = { lesson: "basinc", search: "Basınç" };
const figure = (title: string) => `figure[data-section-figure="${title}"]`;
test.use({ viewport: { width: 320, height: 860 }, reducedMotion: "reduce" });

test("durgun suyun yüzey kuvvetleri ve eş hacimli taban yükü çevrimdışı incelenir", async ({ page, context }, info) => {
  test.setTimeout(90_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, course);
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği" });
  await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await toc.getByRole("button", { name: surfaceForceTitle, exact: true }).press("Enter");
  const surfaces = page.locator(figure(surfaceForceTitle));
  await expect(surfaces).toContainText("Dik duvar: merkez derinliği 0,5 m, alan 0,04 m².");
  await expect(surfaces).toContainText("Kuvvet 200 N.");
  await surfaces.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(surfaces).toContainText("Yatay taban: merkez derinliği 1 m, alan 0,02 m².");
  await expect(surfaces).toContainText("Kuvvet 200 N.");
  await surfaces.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(surfaces).toContainText("Kuvvet 300 N.");
  await surfaces.getByRole("slider", { name: "Derinlik birimi h (m)" }).press("End");
  await expect(surfaces).toContainText("Kuvvet 450 N.");
  const diagram = surfaces.getByRole("img");
  await diagram.evaluate((node) => node.scrollIntoView({ block: "center" }));
  await diagram.screenshot({ path: info.outputPath("force082-surfaces.png") });
  expect((await page.evaluate(svgLayoutAudit, { scope: figure(surfaceForceTitle), figuresOnly: true, explore: true })).issues).toEqual([]);
  await toc.getByRole("button", { name: baseForceTitle, exact: true }).press("Enter");
  const base = page.locator(figure(baseForceTitle));
  for (const forces of ["60", "51,66", "80"]) {
    await expect(base).toContainText("Su 6 m³, ağırlığı 60 kN.");
    await expect(base).toContainText(`Taban kuvveti ${forces} kN.`);
    const next = base.getByRole("button", { name: "İleri", exact: true });
    if (await next.isEnabled()) await next.press("Enter");
  }
  expect((await page.evaluate(svgLayoutAudit, { scope: figure(baseForceTitle), figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı yüzey tablosunu ve çözüm çizimini taşır", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 860 });
  await prepare(page);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-125");
  const table = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: surfaceForceTitle, exact: true }) });
  await expect(table.getByRole("columnheader")).toHaveText(["Yüzey", "Merkez derinliği", "Alan", "Kuvvet"]);
  await expect(table.locator(".guide-table-cell-value")).toHaveText([
    "Dik duvar", "h", "2S", "2 · ρghS", "Yatay taban", "2h", "S", "2 · ρghS", "Eğik duvar", "h", "3S", "3 · ρghS",
  ]);
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: surfaceForceExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(figure(surfaceForceTitle)).getByRole("img")).toBeVisible();
  expect(learning(await storage(page))).toEqual(before);
});

test("taban sorusu 60 N sonucunu yalnız son kalıcı çözümde gösterir", async ({ page, context }, info) => {
  test.setTimeout(90_000);
  await prepare(page, true);
  await context.setOffline(true);
  await openCourse(page, course);
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  for (let i = 0; i < 8; i++) {
    await page.locator(".answer-options .answer").first().click();
    await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
    await page.getByRole("button", { name: "Sonraki soru", exact: true }).click();
  }
  const stem = page.getByRole("figure", { name: "Düz tabana yayılan sıvı basıncı", exact: true });
  const final = page.getByRole("figure", { name: "Taban kuvvetini newtonla yaz", exact: true });
  await expect(stem.getByRole("img")).toHaveAccessibleDescription(/3000 paskal/);
  await page.getByRole("button", { name: "İpucu al", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(1);
  await expect(page.getByRole("figure", { name: "Aynı basıncı bütün tabanda düşün" })).toBeVisible();
  await page.getByRole("button", { name: "Adım adım çözüm", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(2);
  const next = page.getByRole("button", { name: "Sonraki adım", exact: true });
  for (const level of [3, 4, 5]) {
    await expect(final).toHaveCount(0);
    await expect(next).toBeEnabled();
    await next.press("Enter");
    await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(level);
  }
  await expect(final.getByRole("math")).toHaveAccessibleName(/60 newton/);
  await stem.getByRole("img").screenshot({ path: info.outputPath("force082-question.png") });
  expect((await page.evaluate(svgLayoutAudit, { scope: "figure.source-question-figure" })).issues).toEqual([]);
});
