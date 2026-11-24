import { expect, test } from "@playwright/test";
import {
  crookesAbsorptionTitle, crookesExample, crookesGasTitle, crookesModelTitle, crookesPhotoSection,
} from "../../src/learning/mebiCrookesRadiometer";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("the licensed Crookes photo and the physical mechanism open separately offline", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 890 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "isik-bilgisi", search: "Işık bilgisi" });
  const nav = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  async function jump(title: string) {
    const item = nav.getByRole("button", { name: title, exact: true });
    if (!(await item.isVisible())) await nav.getByText("İçindekiler", { exact: true }).press("Enter");
    await item.press("Enter");
  }
  await jump(crookesPhotoSection);
  const section = page.locator(".guide-section").filter({ has: page.getByRole("heading", { name: crookesPhotoSection, exact: true }) });
  const opener = section.getByRole("button", { name: "Radyometre fotoğrafı: görseli büyüt", exact: true });
  await expect(opener).toHaveAccessibleDescription(/koyu ve açık yüzlü kanatlar/);
  await expect.poll(() => opener.locator("img").evaluate((el: HTMLImageElement) => [el.naturalWidth, el.naturalHeight]))
    .toEqual([404, 526]);
  await expect(section.getByRole("link", { name: "Timeline", exact: true })).toHaveAttribute("href", /oldid=871293119/);
  await expect(section.getByRole("link", { name: "CC BY-SA 3.0", exact: true })).toHaveAttribute("href", "https://creativecommons.org/licenses/by-sa/3.0/");
  await opener.press("Enter");
  await expect(page.getByRole("dialog").getByRole("img")).toHaveAccessibleName(/cam kürenin içinde/i);
  await page.keyboard.press("Escape");
  await expect(opener).toBeFocused();

  await jump(crookesModelTitle);
  const scope = 'figure[data-section-figure="' + crookesModelTitle + '"]';
  const figure = page.locator(scope);
  await expect(figure).toContainText("koyu yüzde soğurulur");
  await figure.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(figure).toContainText("termal hareket kuvvet oluşturur");
  const image = figure.getByRole("img");
  await image.evaluate(node => node.scrollIntoView({ block: "center" }));
  await image.screenshot({ path: info.outputPath("crookes169.png") });
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("two different study-sheet visuals explain the Crookes observation", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-131");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: crookesExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await solution.locator("summary").press("Enter");
  await expect(solution.locator('figure[data-section-figure="' + crookesAbsorptionTitle + '"]')).toContainText("sıcaklık farkı");
  await expect(solution.locator('figure[data-section-figure="' + crookesGasTitle + '"]')).toContainText("termal hareket");
});
