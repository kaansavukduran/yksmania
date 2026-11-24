import { expect, test } from "@playwright/test";
import { animalPitchEqualTitle, animalPitchExample, animalPitchTitle } from "../../src/learning/mebiPitchSamples";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("iki gerçek kaynak fotoğrafı ve eşit süreli grafik çevrimdışı birlikte açılır", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "ses-deprem-dalgalari", search: "Ses ve deprem" });
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const selection = toc.getByRole("button", { name: animalPitchTitle, exact: true });
  if (!(await selection.isVisible())) await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await selection.press("Enter");

  const pair = page.getByRole("group", { name: "Aslan ve kanarya fotoğrafları", exact: true });
  const pictures = pair.locator("button img");
  await expect(pictures).toHaveCount(2);
  for (const picture of await pictures.all()) {
    await picture.scrollIntoViewIfNeeded();
    await expect.poll(() => picture.evaluate(node => {
      if (!(node instanceof HTMLImageElement) || !node.currentSrc) return { width: 0, local: false };
      return { width: node.naturalWidth, local: new URL(node.currentSrc).origin === location.origin };
    })).toEqual({ width: 960, local: true });
  }
  await expect(pair.getByRole("link", { name: "CC BY 2.0", exact: true })).toHaveAttribute("href", "https://creativecommons.org/licenses/by/2.0/");
  await expect(pair.getByRole("link", { name: "CC BY-SA 2.0", exact: true })).toHaveAttribute("href", "https://creativecommons.org/licenses/by-sa/2.0/");
  expect(await pair.evaluate(node => node.scrollWidth - node.clientWidth)).toBeLessThanOrEqual(1);
  const lion = pair.getByRole("button", { name: "Aslan örneği: görseli büyüt", exact: true });
  await expect(lion.getByText("Aslan", { exact: true })).toBeVisible();
  const canaryLabel = pair.getByRole("button", { name: "Kanarya örneği: görseli büyüt", exact: true }).locator(".source-figure-zoom-label");
  expect(await canaryLabel.evaluate(node => {
    const text = [...node.childNodes].find(child => child.nodeType === Node.TEXT_NODE && child.textContent?.trim() === "Kanarya");
    if (!text) throw new Error("Kanarya düğme etiketi yok");
    const range = document.createRange();
    range.selectNodeContents(text);
    return range.getClientRects().length;
  })).toBe(1);
  await lion.press("Enter");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(lion).toBeFocused();
  await pair.screenshot({ path: info.outputPath("sound-source-photos142.png") });

  const scope = `figure[data-section-figure="${animalPitchTitle}"]`;
  const figure = page.locator(scope);
  const svg = figure.getByRole("img");
  await expect(svg).toHaveAccessibleName(/bir, altta üç tam salınım/i);
  await expect(figure).toContainText("Aslan örneği: 10 ms’de 1 tam salınım. 100 Hz.");
  await expect(figure).toContainText("Kanarya örneği: 10 ms’de 3 tam salınım. 300 Hz.");
  await figure.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(figure).toContainText("Genlikler eşit. Salınım sayıları ve frekanslar aynı kaldı.");
  await svg.screenshot({ path: info.outputPath("equal-pitch142.png") });
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı hesap adımlarında eşit genlikli grafiği açar", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-130");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: animalPitchExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  const figures = solution.locator(`figure[data-section-figure="${animalPitchEqualTitle}"]`);
  await expect(figures).toHaveCount(2);
  for (const figure of await figures.all()) {
    await expect(figure).toContainText("Genlikler eşit.");
    await expect(figure.getByRole("slider")).toHaveCount(0);
  }
});
