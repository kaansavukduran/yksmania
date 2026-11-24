import { expect, test } from "@playwright/test";
import { roomAcousticsExample, roomAcousticsTitle, roomEnergyTitle, roomPathsTitle } from "../../src/learning/mebiRoomAcoustics";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("Selimiye fotoğrafı çevrimdışı açılır ve salon çizimi iki ses yolunu ayrı gösterir", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "ses-deprem-dalgalari", search: "Ses ve deprem" });
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const item = toc.getByRole("button", { name: roomAcousticsTitle, exact: true });
  if (!(await item.isVisible())) await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await item.press("Enter");
  const enlarge = page.getByRole("button", { name: "Edirne Selimiye Camii’nin içi: görseli büyüt", exact: true });
  const image = enlarge.getByRole("img");
  await image.scrollIntoViewIfNeeded();
  await expect.poll(() => image.evaluate(node => {
    const picture = node as HTMLImageElement;
    return picture.currentSrc && new URL(picture.currentSrc).origin === location.origin
      ? [picture.naturalWidth, picture.naturalHeight] : [];
  })).toEqual([960, 835]);
  await enlarge.press("Enter");
  await expect(page.getByRole("dialog").getByRole("img")).toHaveAccessibleName(/kemerler ve kubbeler/);
  await page.keyboard.press("Escape");
  await expect(enlarge).toBeFocused();

  const scope = `figure[data-section-figure="${roomAcousticsTitle}"]`;
  const figure = page.locator(scope);
  const svg = figure.getByRole("img");
  await expect(figure).toContainText("Doğrudan yol 8 m. Yansıyan yol 10 m.");
  await svg.evaluate(node => node.scrollIntoView({ block: "center" }));
  await svg.screenshot({ path: info.outputPath("room-paths154.png") });
  await figure.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  const absorption = figure.getByRole("slider", { name: "Tavanın soğurduğu enerji", exact: true });
  await absorption.press("Home");
  await expect(figure).toContainText("Soğurulan pay %0. Yansıyan pay %100.");
  await absorption.press("End");
  await expect(figure).toContainText("Soğurulan pay %90. Yansıyan pay %10.");
  await expect(figure).toContainText("Yansıyan yol 10 m kalır.");
  await svg.evaluate(node => node.scrollIntoView({ block: "center" }));
  await svg.screenshot({ path: info.outputPath("room-energy154.png") });
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı yol ve enerji için iki ayrı çözüm çizimi açar", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-130");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: roomAcousticsExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(`figure[data-section-figure="${roomPathsTitle}"]`)).toContainText("Yansıyan yol 10 m.");
  await expect(solution.locator(`figure[data-section-figure="${roomEnergyTitle}"]`)).toContainText("Yansıyan pay %40.");
});
