import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { angledReflectionTitle, directReflectionTitle, lightWaterReflectionExample, lightWaterReflectionTitle } from "../../src/learning/mebiLightWaterReflection";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("three credited photos and both reflection directions work offline with large text", async ({ page, context }, info) => {
  test.setTimeout(80_000);
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "duzlem-ayna", search: "Düzlem ayna" });
  const nav = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const jump = nav.getByRole("button", { name: lightWaterReflectionTitle, exact: true });
  if (!(await jump.isVisible())) await nav.getByText("İçindekiler", { exact: true }).press("Enter");
  await jump.press("Enter");
  const scope = `figure[data-section-figure="${lightWaterReflectionTitle}"]`;
  const model = page.locator(scope);
  const photos = page.getByRole("group", { name: "Kıyı ve su yüzeyi fotoğrafları", exact: true });
  const references = [
    { title: "Valletta’da dalgakırana çarpan dalga", height: 601, credit: /RenataAp/, revision: /oldid=1180557315/, licence: "CC BY-SA 4.0" },
    { title: "Dalgalı deniz yüzeyinde ışık", height: 640, credit: /Florence Lilly/, revision: /oldid=1304759656/ },
    { title: "Dalgalı yüzeye suyun altından bakış", height: 720, credit: /Bryan\.calloway/, revision: /oldid=1121102760/, licence: "CC BY-SA 3.0" },
  ];
  await expect(photos.getByRole("button")).toHaveCount(references.length);
  for (const reference of references) {
    const opener = photos.getByRole("button", { name: reference.title + ": görseli büyüt", exact: true });
    await expect.poll(() => opener.locator("img").evaluate((img: HTMLImageElement) => [img.naturalWidth, img.naturalHeight])).toEqual([960, reference.height]);
    await opener.press("Enter");
    await expect(page.getByRole("dialog").getByRole("img")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(opener).toBeFocused();
    await expect(photos.getByRole("link", { name: reference.credit })).toHaveAttribute("href", reference.revision);
    if (reference.licence) await expect(photos.getByRole("link", { name: reference.licence, exact: true })).toHaveAttribute("href", /creativecommons.org/);
  }
  await expect(model).toContainText("Normalden geliş açısı 0°.");
  const next = model.getByRole("button", { name: "İleri", exact: true });
  const previous = model.getByRole("button", { name: "Geri", exact: true });
  await next.press("Enter");
  await expect(previous).toBeFocused();
  await expect(model).toContainText("Normalden dönüş açısı 0°.");
  const angle = model.getByRole("slider", { name: "Normalden gelme açısı", exact: true });
  await angle.fill("35");
  await expect(model).toContainText("Normalden dönüş açısı 35°.");
  await expect(model).toContainText("Sınırla açı 55°.");
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  expect((await new AxeBuilder({ page }).include(".section-reference-photos").analyze()).violations).toEqual([]);
  const drawing = model.getByRole("img");
  await drawing.evaluate(node => node.scrollIntoView({ block: "center" }));
  await drawing.screenshot({ path: info.outputPath("light-water-reflection180.png") });
  expect(learning(await storage(page))).toEqual(before);
});

test("the separate study sheet shows 0 degrees and 35 degrees as two solution drawings", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-133");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: lightWaterReflectionExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(`figure[data-section-figure="${directReflectionTitle}"]`)).toContainText("0°");
  await expect(solution.locator(`figure[data-section-figure="${angledReflectionTitle}"]`)).toContainText("35°");
});
