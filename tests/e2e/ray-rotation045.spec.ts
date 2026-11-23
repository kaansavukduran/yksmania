import { expect, test } from "@playwright/test";
import { learning, prepare, storage } from "./helpers/revisedCourse";

test.use({ viewport: { width: 320, height: 850 }, reducedMotion: "reduce" });

test("geçmiş sınavla ilişkili açı örneğinde çizimler sırasıyla ve çevrimdışı açılır", async ({ page, context }, info) => {
  await prepare(page, true);
  const initial = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/topic?id=topic-tyt-geo-acilar-kaynak-pekitirme-032&mode=questions");
  const example = page.locator(".past-exam-reference").filter({
    has: page.getByRole("heading", { name: "Eş dönüş aralıkları ve dik köşe", exact: true }),
  });
  const given = example.getByRole("figure", { name: "Bir dik açı, iki eş dış parça", exact: true });
  const turn = example.getByRole("figure", { name: "Bir tam tur, sekiz eş aralık", exact: true });
  const corner = example.getByRole("figure", { name: "Dik açıdan dönüşü ayır", exact: true });
  const calculation = example.getByRole("math", { name: /22,5°/ });
  await expect(given.getByRole("img")).toHaveAccessibleDescription(/İki x birbirine eşit/);
  await expect(example).not.toContainText("22,5°");
  await expect(turn).toHaveCount(0);
  await expect(corner).toHaveCount(0);
  await expect(calculation).toHaveCount(0);
  await example.getByRole("button", { name: "Çözümü adım adım aç", exact: true }).press("Enter");
  await expect(turn.getByRole("img")).toHaveAccessibleDescription(/Sekiz yarıçap.*45°/);
  await expect(corner).toHaveCount(0);
  await expect(calculation).toHaveCount(0);
  const next = example.getByRole("button", { name: "Sonraki çözüm adımı", exact: true });
  await next.press("Enter");
  await expect(corner.getByRole("img")).toHaveAccessibleDescription(/Ortada 45°.*toplamları 45°/);
  await expect(calculation).toHaveCount(0);
  await next.press("Enter");
  await expect(calculation).toBeVisible();
  await expect(example.locator(".worked-conclusion")).toContainText("22,5°");
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  for (const figure of [given, turn, corner]) {
    await expect(figure.locator("figcaption")).toHaveCount(0);
    const clipped = await figure.locator("svg").evaluate((svg: SVGSVGElement) => {
      const { x, y, width, height } = svg.viewBox.baseVal;
      return Array.from(svg.querySelectorAll("text")).filter((label) => {
        const box = label.getBBox();
        return box.x < x || box.y < y || box.x + box.width > x + width || box.y + box.height > y + height;
      }).map((label) => label.textContent);
    });
    expect(clipped, await figure.getAttribute("aria-label") ?? undefined).toEqual([]);
  }
  await corner.screenshot({ path: info.outputPath("dik-acidan-donusu-ayir-320.png") });
  await example.getByRole("button", { name: "Yeniden düşün", exact: true }).press("Enter");
  await expect(turn).toHaveCount(0);
  await expect(calculation).toHaveCount(0);
  await expect(given).toBeVisible();
  expect(learning(await storage(page))).toEqual(initial);
});
