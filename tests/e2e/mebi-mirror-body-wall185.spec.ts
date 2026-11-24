import { expect, test } from "@playwright/test";
import { mirrorBodyTitle, mirrorBodyWallExample, mirrorBodyWallTitle, mirrorWallTitle } from "../../src/learning/mebiMirrorBodyWall";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("the body range stays fixed while the wall view widens offline", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "duzlem-ayna", search: "Düzlem ayna" });
  const contents = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const entry = contents.getByRole("button", { name: mirrorBodyWallTitle, exact: true });
  if (!(await entry.isVisible())) await contents.getByText("İçindekiler", { exact: true }).press("Enter");
  await entry.press("Enter");
  const scope = `figure[data-section-figure="${mirrorBodyWallTitle}"]`;
  const view = page.locator(scope);
  const distance = view.getByRole("slider", { name: "Göz ile ayna arası", exact: true });
  await expect(view).toContainText("Göz ile ayna arası 2 m.");
  await expect(view).toContainText("Bedende 1–1,5 m arası görünür. Görünen bölüm 0,5 m.");
  await distance.press("Home");
  await expect(view).toContainText("Göz ile ayna arası 1 m.");
  await expect(view).toContainText("Bedende 1–1,5 m arası görünür. Görünen bölüm 0,5 m.");
  await view.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(view).toContainText("Duvarda 0,1–1,35 m arası görünür. Görünen bölüm 1,25 m.");
  for (let i = 0; i < 4; i++) await distance.press("ArrowRight");
  await expect(view).toContainText("Duvarda 0,7–1,45 m arası görünür. Görünen bölüm 0,75 m.");
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  await view.getByRole("img").screenshot({ path: info.outputPath("mirror-body-wall185.png") });
  expect(learning(await storage(page))).toEqual(before);
});

test("the Kopya Kağıdı opens both solutions and compares 1 and 2 metres", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-133");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: mirrorBodyWallExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await solution.locator("summary").press("Enter");
  for (const title of [mirrorBodyTitle, mirrorWallTitle]) {
    await expect(solution.locator(`figure[data-section-figure="${title}"]`).getByRole("img")).toBeVisible();
  }
  const wall = solution.locator(`figure[data-section-figure="${mirrorWallTitle}"]`);
  await wall.getByRole("slider", { name: "Göz ile ayna arası", exact: true }).press("Home");
  await expect(wall).toContainText("Görünen bölüm 1,25 m.");
});
