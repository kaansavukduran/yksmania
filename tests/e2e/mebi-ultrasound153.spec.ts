import { expect, test } from "@playwright/test";
import { ultrasoundDepthTitle, ultrasoundExample, ultrasoundProbeTitle, ultrasoundTitle } from "../../src/learning/mebiUltrasound";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("ultrasonun gerçek fotoğrafı ve iki farklı yankı yolu çevrimdışı açılır", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "ses-deprem-dalgalari", search: "Ses ve deprem" });
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const item = toc.getByRole("button", { name: ultrasoundTitle, exact: true });
  if (!(await item.isVisible())) await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await item.press("Enter");
  const enlarge = page.getByRole("button", { name: "Ultrason fotoğrafı: görseli büyüt", exact: true });
  const photo = enlarge.getByRole("img");
  await photo.scrollIntoViewIfNeeded();
  await expect.poll(() => photo.evaluate(node => {
    const image = node as HTMLImageElement;
    return image.currentSrc && new URL(image.currentSrc).origin === location.origin
      ? [image.naturalWidth, image.naturalHeight] : [];
  })).toEqual([1300, 866]);
  await page.getByRole("link", { name: "Goleisureintl", exact: true }).scrollIntoViewIfNeeded();
  await expect(page.getByRole("link", { name: "Goleisureintl", exact: true })).toHaveAttribute("href", /oldid=1252926961/);
  await enlarge.press("Enter");
  await expect(page.getByRole("dialog").getByRole("img")).toHaveAccessibleName(/ultrason görüntüsü görünüyor/);
  await page.keyboard.press("Escape");
  await expect(enlarge).toBeFocused();

  const scope = `figure[data-section-figure="${ultrasoundTitle}"]`;
  const figure = page.locator(scope);
  const svg = figure.getByRole("img");
  await expect(svg.getByText("Jel", { exact: true })).toBeVisible();
  await expect(svg.getByText("50 µs · 3,85 cm", { exact: true })).toHaveCount(0);
  await figure.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(figure).toContainText("Yakın sınır 3,85 cm derinde.");
  await expect(figure).toContainText("Derin sınır 7,7 cm derinde.");
  const delay = figure.getByRole("slider", { name: "Derin sınırın yankı süresi", exact: true });
  await delay.press("Home");
  await expect(figure).toContainText("Derin sınır 4,62 cm derinde.");
  await delay.press("End");
  await expect(figure).toContainText("Derin sınır 10,78 cm derinde.");
  await expect(figure).toContainText("Yakın sınır 3,85 cm derinde.");
  await svg.evaluate(node => node.scrollIntoView({ block: "center" }));
  await svg.screenshot({ path: info.outputPath("ultrasound-echo153.png") });
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı gönderim ve iki ayrı yankıyı çözümün kendi adımında gösterir", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-130");
  const section = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: ultrasoundTitle, exact: true }) });
  await expect(section.getByRole("row", { name: "50 3,85", exact: true })).toBeVisible();
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: ultrasoundExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  const outgoing = solution.locator(`figure[data-section-figure="${ultrasoundProbeTitle}"]`);
  await expect(outgoing.getByRole("img").getByText("Jel", { exact: true })).toBeVisible();
  await expect(outgoing.getByRole("img").getByText("50 µs · 3,85 cm", { exact: true })).toHaveCount(0);
  const compare = solution.locator(`figure[data-section-figure="${ultrasoundDepthTitle}"]`);
  await expect(compare.getByRole("img").getByText("50 µs · 3,85 cm", { exact: true })).toBeVisible();
  await expect(compare.getByRole("img").getByText("100 µs · 7,7 cm", { exact: true })).toBeVisible();
});
