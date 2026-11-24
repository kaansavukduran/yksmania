import { expect, test } from "@playwright/test";
import { bellJarCases, bellJarTitle, soundBellExample, soundSpeedExample } from "../../src/learning/mebiSoundMedium";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("ses kaynağı ile tanecik hareketini ve fanustaki ses yolunu ayrı gösterir", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "ses-deprem-dalgalari", search: "Ses ve deprem" });
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const open = async (title: string) => {
    const item = toc.getByRole("button", { name: title, exact: true });
    if (!(await item.isVisible())) await toc.getByText("İçindekiler", { exact: true }).press("Enter");
    await item.press("Enter");
    return page.locator(`figure[data-section-figure="${title}"]`);
  };
  const sound = await open("Ses bir ortam titreşimidir");
  await expect(sound.getByRole("img")).toHaveAccessibleName(/solda ses kaynağı/i);
  await expect(sound.getByText("Yayılma yönü", { exact: true })).toBeVisible();
  await expect(sound.getByText("Tanecik", { exact: true })).toBeVisible();
  await sound.getByRole("slider", { name: "Zaman (periyot)", exact: true }).press("End");
  await expect(sound).toContainText("Sıkışmada basınç yüksek");
  await sound.getByRole("img").screenshot({ path: info.outputPath("sound-medium141.png") });

  const jar = await open(bellJarTitle);
  const jarSvg = jar.getByRole("img");
  await expect(jarSvg).toHaveAccessibleName(/hava tulumbası/i);
  for (const [index, stage] of bellJarCases.entries()) {
    if (index > 0) await jar.getByRole("button", { name: "İleri", exact: true }).press("Enter");
    await expect(jar).toContainText(stage.detail);
    await expect(jarSvg.getByText("Çalar saat", { exact: true })).toBeVisible();
    await jarSvg.screenshot({ path: info.outputPath(`bell-jar-${index}-141.png`) });
  }
  const scope = `figure[data-section-figure="${bellJarTitle}"]`;
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı ses sürati tablolarını ve üç deney çizimini çevrimdışı açar", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-130");
  const section = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: "Sürati kaynaktan ayır", exact: true }) });
  const table = section.getByRole("table");
  await expect(table.getByRole("columnheader", { name: "Ses sürati (m/s)", exact: true })).toBeVisible();
  await expect(table.getByRole("row", { name: "Sıcaklık Hava, 0 °C 331", exact: true })).toBeVisible();
  await expect(table.getByRole("row", { name: "Ortam Demir, 0 °C 5000", exact: true })).toBeVisible();
  await expect(table.getByRole("row", { name: "Tuzluluk Deniz suyu, 25 °C 1533", exact: true })).toBeVisible();

  const openExample = async (title: string) => {
    const example = page.locator(".cheat-examples .worked-example").filter({ hasText: title });
    await example.locator(":scope > summary").press("Enter");
    const solution = example.locator(".cheat-solution");
    await expect(solution.getByRole("img")).toHaveCount(0);
    await solution.locator("summary").press("Enter");
    return solution;
  };
  const bell = await openExample(soundBellExample.title);
  for (const stage of bellJarCases) {
    await expect(bell.locator(`figure[data-section-figure="${stage.solutionTitle}"]`)).toContainText(stage.detail);
  }
  const speed = await openExample(soundSpeedExample.title);
  await expect(speed).toContainText("1533 − 1493 = 40 m/s");
});
