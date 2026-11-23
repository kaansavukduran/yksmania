import { expect, test } from "@playwright/test";
import { learning, prepare, storage } from "./helpers/revisedCourse";

test.use({ viewport: { width: 320, height: 850 }, reducedMotion: "reduce" });

test("paralel kenar örneği verilen çizimle başlar ve çözümü çevrimdışı adım adım gösterir", async ({ page, context }, info) => {
  await prepare(page, true);
  const initial = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/topic?id=topic-tyt-geo-ucgende-acilar-031&mode=questions");
  const example = page.locator(".past-exam-reference").filter({
    has: page.getByRole("heading", { name: "Paralellikle taşınan taban açısı", exact: true }),
  });
  const given = example.getByRole("figure", { name: "İki eş ikizkenar üçgen", exact: true });
  const transfer = example.getByRole("figure", { name: "Paralel kenarlar taban açısını taşır", exact: true });
  const split = example.getByRole("figure", { name: "İki taban açısı ve tepe parçaları", exact: true });
  const calculation = example.getByRole("math", { name: /51 derece/ });
  await expect(given.getByRole("img")).toHaveAccessibleDescription(/AC ve DE paralel.*86°.*Sorulan x/);
  await expect(given).not.toContainText("51°");
  await expect(transfer).toHaveCount(0);
  await expect(split).toHaveCount(0);
  await expect(calculation).toHaveCount(0);
  await example.getByRole("button", { name: "Çözümü adım adım aç", exact: true }).press("Enter");
  await expect(transfer.getByRole("img")).toHaveAccessibleDescription(/86 derecelik dış açı/);
  await expect(split).toHaveCount(0);
  await expect(calculation).toHaveCount(0);
  const next = example.getByRole("button", { name: "Sonraki çözüm adımı", exact: true });
  await next.press("Enter");
  await expect(split.getByRole("img")).toHaveAccessibleDescription(/43 derece.*94 derece/);
  await expect(calculation).toHaveCount(0);
  await next.press("Enter");
  await expect(calculation).toBeVisible();
  await expect(example.locator(".worked-conclusion")).toContainText("51°");
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  for (const figure of [given, transfer, split]) {
    const issues = await figure.locator("svg").evaluate((svg: SVGSVGElement) => {
      const { x, y, width, height } = svg.viewBox.baseVal;
      const labels = Array.from(svg.querySelectorAll("text"), (node) => ({
        text: node.textContent ?? "",
        box: node.getBBox(),
      }));
      const clipped = labels.filter(({ box }) => (
        box.x < x || box.y < y || box.x + box.width > x + width || box.y + box.height > y + height
      )).map(({ text }) => text);
      const overlaps = labels.flatMap((one, index) => labels.slice(index + 1).filter((another) => {
        const a = one.box, b = another.box;
        return Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x) > 1
          && Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y) > 1;
      }).map(({ text }) => `${one.text}/${text}`));
      return { clipped, overlaps };
    });
    expect.soft(issues, await figure.getAttribute("aria-label") ?? undefined).toEqual({ clipped: [], overlaps: [] });
  }
  await transfer.screenshot({ path: info.outputPath("paralel-kenar-320.png") });
  await example.getByRole("button", { name: "Yeniden düşün", exact: true }).press("Enter");
  await expect(transfer).toHaveCount(0);
  await expect(given).toBeVisible();
  expect(learning(await storage(page))).toEqual(initial);
});
