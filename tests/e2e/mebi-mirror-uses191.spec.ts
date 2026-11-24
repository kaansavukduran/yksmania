import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { mirrorUsesExample, mirrorUsesSteps, mirrorUsesTitle } from "../../src/learning/mebiMirrorUses";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("three licensed mirror contexts and their different ray models open offline and by keyboard", async ({ page, context }) => {
  test.setTimeout(80_000);
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "kuresel-aynalar", search: "Küresel aynalar" });
  const contents = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const entry = contents.getByRole("button", { name: mirrorUsesTitle, exact: true });
  if (!(await entry.isVisible())) await contents.getByText("İçindekiler", { exact: true }).press("Enter");
  await entry.press("Enter");
  const photos = page.getByRole("group", { name: "El aynası, diş aynası ve dış yan ayna fotoğrafları" });
  await expect(photos.getByRole("button")).toHaveCount(3);
  for (const [title, dimensions, credit] of [
    ["Yüze yakın el aynası", [427, 640], /Shixart1985/],
    ["Küçük diş aynasında diş görüntüsü", [640, 396], /Partha Sarathi Sahana/],
    ["Aracın dış yan aynasında arka yol", [640, 479], /J RAWLS/],
  ] as const) {
    const item = photos.locator(":scope > div").filter({ has: page.getByRole("figure", { name: title, exact: true }) });
    const opener = item.getByRole("button", { name: title + ": görseli büyüt" });
    await expect(opener).toHaveAccessibleDescription(/.+/);
    await expect.poll(() => opener.getByRole("img").evaluate((img: HTMLImageElement) => [img.naturalWidth, img.naturalHeight])).toEqual(dimensions);
    await opener.press("Enter");
    await expect(page.getByRole("dialog").getByRole("img")).toHaveAccessibleName(/.+/);
    await page.keyboard.press("Escape");
    await expect(opener).toBeFocused();
    await expect(item.getByRole("link", { name: credit })).toHaveAttribute("href", /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
    await expect(item.getByRole("link", { name: "CC BY 2.0" })).toHaveAttribute("href", "https://creativecommons.org/licenses/by/2.0/");
  }
  const scope = `figure[data-section-figure="${mirrorUsesTitle}"]`;
  const figure = page.locator(scope);
  await expect(figure).toContainText("Görüntü sanal, düz, büyük");
  const next = figure.getByRole("button", { name: "İleri", exact: true });
  await next.press("Enter");
  await expect(figure).toContainText("i = r = 35°");
  await next.press("Enter");
  await expect(figure).toContainText("Görüntü sanal, düz, küçük");
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  expect((await new AxeBuilder({ page }).include(".section-reference-photos").analyze()).violations).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("the separate sheet explains each selected mirror use with its own figure", async ({ page, context }, info) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-134");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: mirrorUsesExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await solution.locator("summary").press("Enter");
  for (const title of mirrorUsesSteps) {
    const drawing = solution.locator(`figure[data-section-figure="${title}"]`).getByRole("img");
    await expect(drawing).toBeVisible();
  }
  await solution.locator(`figure[data-section-figure="${mirrorUsesSteps[2]}"]`).getByRole("img").screenshot({ path: info.outputPath("mirror-uses191.png") });
});
