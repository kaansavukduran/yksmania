import { expect, test, type Locator } from "@playwright/test";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";
import {
  newtonDisplacementTitle, newtonTimeExampleTitle, newtonTimeTitle, newtonVelocityTitle,
} from "../../src/learning/newtonTimeComparison";

test.use({ viewport: { width: 320, height: 850 }, reducedMotion: "reduce" });

async function compareTimeGraphs(model: Locator) {
  const next = model.getByRole("button", { name: "İleri", exact: true });
  const time = model.getByRole("slider", { name: /Zaman/ });
  await expect(model.getByRole("button", { name: "Oynat", exact: true })).toHaveCount(0);
  await time.press("End");
  await expect(model).toContainText("t = 3 s · 4 N denemesi: 4 N · 8 N denemesi: 8 N");
  await expect(model.locator("svg text").filter({ hasText: /^F \(N\)$/ })).toBeVisible();
  await next.press("Enter");
  await expect(model).toContainText("t = 3 s · 4 N denemesi: 2 m/s² · 8 N denemesi: 4 m/s²");
  await expect(model.locator("svg text").filter({ hasText: /^a \(m\/s²\)$/ })).toBeVisible();
  await next.press("Enter");
  await expect(model).toContainText("t = 3 s · 4 N denemesi: 6 m/s · 8 N denemesi: 12 m/s");
  await expect(model.locator("svg text").filter({ hasText: /^v \(m\/s\)$/ })).toBeVisible();
  await time.press("Home");
  await expect(model).toContainText("t = 0 s · 4 N denemesi: 0 m/s · 8 N denemesi: 0 m/s");
  const geometry = await model.locator("svg").evaluate((node: SVGSVGElement) => {
    const bounds = node.viewBox.baseVal;
    return Array.from(node.querySelectorAll("text")).filter((label) => {
      const box = label.getBBox();
      return box.x < bounds.x || box.y < bounds.y ||
        box.x + box.width > bounds.x + bounds.width || box.y + box.height > bounds.y + bounds.height;
    }).map((label) => label.textContent);
  });
  expect(geometry).toEqual([]);
}

test("Newton anlatımında üç ekseni, tabloyu ve çözümlü örneğin ikinci adımını çevrimdışı okur", async ({ page, context }, info) => {
  test.setTimeout(60_000);
  await prepare(page, true);
  await context.setOffline(true);
  const initial = learning(await storage(page));
  await openCourse(page, { lesson: "newton", search: "Kuvvet ve Newton" });
  await page.getByText("İçindekiler", { exact: true }).click();
  await page.getByRole("button", { name: newtonTimeTitle, exact: true }).click();
  const model = page.locator(".section-figure").filter({ has: page.getByRole("img", { name: `${newtonTimeTitle}: şekil` }) });
  await compareTimeGraphs(model);
  await model.getByRole("slider").press("End");
  await model.locator("svg").evaluate((svg) => svg.scrollIntoView({ block: "center" }));
  await model.locator("svg").screenshot({ path: info.outputPath("newton-zaman-320.png") });
  await model.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(model).toContainText("t = 3 s · 4 N denemesi: 9 m · 8 N denemesi: 18 m");
  await model.getByRole("slider").press("ArrowLeft");
  await expect(model).toContainText("t = 2,5 s · 4 N denemesi: 6,25 m · 8 N denemesi: 12,5 m");
  const table = page.getByRole("region", { name: `${newtonTimeTitle} tablosu` }).getByRole("table");
  await expect(table.getByRole("columnheader")).toHaveText(["Net kuvvet (N)", "İvme (m/s²)", "3. saniyede hız (m/s)", "3 saniyede yer değiştirme (m)"]);
  await expect(table.locator(".guide-table-cell-value")).toHaveText(["4", "2", "6", "9", "8", "4", "12", "18"]);
  const layout = await page.evaluate(svgLayoutAudit, {
    scope: `figure[data-section-figure="${newtonTimeTitle}"]`, figuresOnly: true, explore: true,
  });
  expect(layout.issues).toEqual([]);

  const contents = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  if (await contents.locator("details").getAttribute("open") === null) {
    await contents.getByText("İçindekiler", { exact: true }).click();
  }
  await contents.getByRole("button", { name: "Çözümlü örnekler", exact: true }).press("Enter");
  const example = page.locator(".worked-example").filter({ hasText: newtonTimeExampleTitle });
  await example.locator("summary").press("Enter");
  await example.getByRole("button", { name: "İlk adımı göster", exact: true }).press("Enter");
  await expect(example.locator(".section-figure")).toHaveCount(0);
  await example.getByRole("button", { name: "Sonraki adım", exact: true }).press("Enter");
  await expect(example.locator(".section-figure").getByRole("slider")).toBeVisible();
  await expect(example.getByRole("img", { name: `${newtonVelocityTitle}: şekil` })).toBeVisible();
  await expect(example.getByRole("img", { name: `${newtonDisplacementTitle}: şekil` })).toHaveCount(0);
  await example.getByRole("button", { name: "Sonraki adım", exact: true }).press("Enter");
  await expect(example.getByRole("img", { name: `${newtonDisplacementTitle}: şekil` })).toBeVisible();
  await expect(example).toContainText(/yer değiştirmeler 9 ve 18 m/);
  expect(learning(await storage(page))).toEqual(initial);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});

test("Newton Kopya Kağıdı grafik ve tabloyu gösterir, örneğin çözüm çizimini ayrı açar", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  const initial = learning(await storage(page));
  await page.getByRole("button", { name: "Menüyü aç", exact: true }).press("Enter");
  await page.locator(".sidebar").getByRole("button", { name: "Kopya Kağıtları", exact: true }).press("Enter");
  await page.getByRole("textbox", { name: "Ders veya konu ara", exact: true }).fill("Newton hareket");
  await page.getByRole("button", { name: "Newton hareket yasaları", exact: true }).press("Enter");
  const section = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: newtonTimeTitle, exact: true }) });
  await compareTimeGraphs(section.locator(".section-figure"));
  const table = section.getByRole("table");
  await expect(table.getByRole("columnheader")).toHaveText(["Net kuvvet (N)", "İvme (m/s²)", "3. saniyede hız (m/s)", "3 saniyede yer değiştirme (m)"]);
  await expect(table.getByRole("rowheader")).toHaveText(["4", "8"]);
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: newtonTimeExampleTitle });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.getByRole("img", { name: `${newtonVelocityTitle}: şekil` })).toBeVisible();
  await expect(solution.getByRole("img", { name: `${newtonDisplacementTitle}: şekil` })).toBeVisible();
  await expect(solution).toContainText(/yer değiştirmeler 9 ve 18 m/);
  expect(learning(await storage(page))).toEqual(initial);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});
