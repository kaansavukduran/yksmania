import { expect, test } from "@playwright/test";
import { tacomaDeckTitle, tacomaExample, tacomaTitle } from "../../src/learning/mebiTacoma";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("Tacoma arşiv kareleri ve tabliye hareketi dar ekranda çevrimdışı açılır", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "ses-deprem-dalgalari", search: "Ses ve deprem" });
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const item = toc.getByRole("button", { name: tacomaTitle, exact: true });
  if (!(await item.isVisible())) await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await item.press("Enter");
  const photographs = page.getByRole("group", { name: "Tacoma Narrows arşiv kareleri", exact: true });
  const images = photographs.locator("button img");
  await expect(images).toHaveCount(2);
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate(node => {
      const picture = node as HTMLImageElement;
      return picture.currentSrc && new URL(picture.currentSrc).origin === location.origin
        ? [picture.naturalWidth, picture.naturalHeight] : [];
    })).toEqual([640, 480]);
  }
  await expect(photographs.getByRole("link", { name: "Kamu malı", exact: true })).toHaveCount(2);
  const imageButton = photographs.getByRole("button", { name: "Tacoma, tabliye bükülürken: görseli büyüt", exact: true });
  await imageButton.press("Enter");
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("img")).toHaveAccessibleName(/tabliyesi belirgin biçimde bükülüyor/);
  await page.keyboard.press("Escape");
  await expect(imageButton).toBeFocused();
  expect(await photographs.evaluate(node => node.scrollWidth - node.clientWidth)).toBeLessThanOrEqual(1);

  const scope = `figure[data-section-figure="${tacomaTitle}"]`;
  const figure = page.locator(scope);
  const svg = figure.getByRole("img");
  await expect(figure).toContainText("İki kenar da yukarı gider.");
  await figure.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(figure).toContainText("Sol kenar yükselir. Sağ kenar alçalır.");
  await expect(svg.getByText("Dönme ekseni", { exact: true })).toBeVisible();
  await svg.evaluate(node => node.scrollIntoView({ block: "center" }));
  await svg.screenshot({ path: info.outputPath("tacoma-twist150.png") });
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı gözlem ile burulmanın açıklamasını ayrı görsellerde verir", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-130");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: tacomaExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  const deck = solution.locator(`figure[data-section-figure="${tacomaDeckTitle}"]`);
  await expect(deck).toContainText("Sol kenar yükselir. Sağ kenar alçalır.");
  const images = solution.getByRole("group", { name: "Tacoma Narrows arşiv kareleri", exact: true }).locator("button img");
  await expect(images).toHaveCount(2);
  await images.last().scrollIntoViewIfNeeded();
  await expect.poll(() => images.last().evaluate(node => (node as HTMLImageElement).naturalWidth)).toBe(640);
});
