import { expect, test } from "@playwright/test";
import { afterMainTitle, earthquakeSequenceExample, earthquakeSequenceTitle, firstRecordTitle } from "../../src/learning/mebiEarthquakeSequence";
import { seismicWavefrontTitle } from "../../src/learning/mebiSeismicWavefront";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("seismic rings and observed event labels change in sequence, offline", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "ses-deprem-dalgalari", search: "Ses ve deprem" });
  const nav = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const jump = async (title: string) => {
    const item = nav.getByRole("button", { name: title, exact: true });
    if (!(await item.isVisible())) await nav.getByText("İçindekiler", { exact: true }).press("Enter");
    await item.press("Enter");
    return page.locator(`figure[data-section-figure="${title}"]`);
  };

  const ring = await jump(seismicWavefrontTitle);
  const time = ring.getByRole("slider", { name: "Başlangıçtan sonra geçen süre", exact: true });
  await expect(ring).toContainText("Cephe dış merkeze erişti.");
  await time.press("ArrowLeft");
  await expect(ring).toContainText("0,75 s sonra cephe yarıçapı 4,5 km.");
  await expect(ring).toContainText("Cephe dış merkeze henüz erişmedi.");
  await time.press("End");
  await expect(ring).toContainText("1,5 s sonra cephe yarıçapı 9 km.");
  const image = ring.getByRole("img");
  await image.evaluate(node => node.scrollIntoView({ block: "center" }));
  await image.screenshot({ path: info.outputPath("seismic-wavefront160.png") });

  const events = await jump(earthquakeSequenceTitle);
  await expect(events).toContainText("İlk kayıt. Saat 0, M 4,3.");
  await expect(events).not.toContainText("Öncü. Saat 0");
  await expect(events).not.toContainText("M 5,8.");
  const next = events.getByRole("button", { name: "İleri", exact: true });
  await next.press("Enter");
  await expect(events).toContainText("Öncü. Saat 0, M 4,3.");
  await expect(events).toContainText("Ana deprem. Saat 2, M 5,8.");
  await expect(events).not.toContainText("Artçı. Saat 8");
  await next.press("Enter");
  await expect(events).toContainText("Artçı. Saat 8, M 4,4.");
  const graph = events.getByRole("img");
  await graph.evaluate(node => node.scrollIntoView({ block: "center" }));
  await graph.screenshot({ path: info.outputPath("earthquake-sequence160.png") });

  const layoutIssues = [];
  for (const title of [seismicWavefrontTitle, earthquakeSequenceTitle]) {
    const scope = `figure[data-section-figure="${title}"]`;
    const audit = await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true });
    layoutIssues.push(...audit.issues);
  }
  expect(layoutIssues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı ilk kaydı ve olaylar görüldükten sonraki diziyi ayrı gösterir", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-130");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: earthquakeSequenceExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  const first = solution.locator(`figure[data-section-figure="${firstRecordTitle}"]`);
  const final = solution.locator(`figure[data-section-figure="${afterMainTitle}"]`);
  await expect(first).toContainText("İlk kayıt. Saat 0, M 4,3.");
  await expect(first).not.toContainText("Öncü. Saat 0");
  await expect(final).toContainText("Öncü. Saat 0, M 4,3.");
  await expect(final).toContainText("Artçı. Saat 8, M 4,4.");
});
