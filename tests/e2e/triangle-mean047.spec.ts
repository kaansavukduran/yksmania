import { expect, test } from "@playwright/test";
import { learning, prepare, storage } from "./helpers/revisedCourse";

test.use({ viewport: { width: 320, height: 850 }, reducedMotion: "reduce" });

test("üç verilen şekil ve her birinin çözümü kendi adımında çevrimdışı çalışır", async ({ page, context }, info) => {
  await prepare(page, true);
  const initial = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/topic?id=topic-tyt-geo-ucgen-esitsizligi-031&mode=questions");
  const card = page.locator(".past-exam-reference").filter({
    has: page.getByRole("heading", { name: "Kenar ortalaması ve gerçek üçgen koşulu", exact: true }),
  });
  const example = card.locator(".exam-teaching-case");
  await expect(example.getByRole("figure")).toHaveCount(3);
  await expect(example.getByRole("figure", { name: "I. İki uzunluk" }).getByRole("img")).toHaveAccessibleDescription(/2 ve 6 birim/);
  await expect(example.getByRole("figure", { name: "II. İki açı" }).getByRole("img")).toHaveAccessibleDescription(/72 derece.*36 derece/);
  await expect(example.getByRole("figure", { name: "III. Dik açı ve bir kenar" }).getByRole("img")).toHaveAccessibleDescription(/6 birim.*belirtilmemiş/);
  const intervals = example.getByRole("figure", { name: "Kenar uzunluğunun açık aralığı" });
  const angles = example.getByRole("figure", { name: "İki eş açı, iki eş kenar" });
  const right = example.getByRole("figure", { name: "Dik üçgende 6, 8 ve 10" });
  await expect(intervals).toHaveCount(0);
  await expect(angles).toHaveCount(0);
  await expect(right).toHaveCount(0);
  await example.getByRole("button", { name: "Çözümü adım adım aç", exact: true }).press("Enter");
  await expect(intervals.getByRole("img")).toHaveAccessibleDescription(/açık aralık 4’ten 8’e/i);
  await expect(angles).toHaveCount(0);
  const next = example.getByRole("button", { name: "Sonraki çözüm adımı", exact: true });
  await next.press("Enter");
  await expect(angles.getByRole("img")).toHaveAccessibleDescription(/karşısındaki alt ve sağ kenarlar eşit/);
  await expect(right).toHaveCount(0);
  await next.press("Enter");
  await expect(right.getByRole("img")).toHaveAccessibleDescription(/6 ve 8 birim.*10 birim/);
  await expect(example.locator(".worked-conclusion")).toContainText("Yalnız III. 6, 8 ve 10.");
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  const outside = await example.locator("svg.source-figure-drawing").evaluateAll((nodes) =>
    nodes.flatMap((node) => {
      const svg = node as SVGSVGElement;
      const { x, y, width, height } = svg.viewBox.baseVal;
      return Array.from(svg.querySelectorAll("text")).filter((label) => {
        const box = label.getBBox();
        return box.x < x || box.y < y || box.x + box.width > x + width || box.y + box.height > y + height;
      }).map((label) => ({ figure: svg.querySelector("title")?.textContent, label: label.textContent }));
    }),
  );
  expect(outside).toEqual([]);
  await right.screenshot({ path: info.outputPath("ucgen-6-8-10-320.png") });
  await example.getByRole("button", { name: "Yeniden düşün", exact: true }).press("Enter");
  await expect(example.getByRole("figure")).toHaveCount(3);
  expect(learning(await storage(page))).toEqual(initial);
});
