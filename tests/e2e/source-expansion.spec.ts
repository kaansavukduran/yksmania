import { test, expect, type Page } from "@playwright/test";
import { expectGuideSections, guideSectionCount, turnToGuideContent } from "./helpers/guidePages";
async function nav(page: Page, name: string) {
  await expect(page.locator(".sidebar")).toBeAttached();
  const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page
    .locator(".sidebar")
    .getByRole("button", { name, exact: true })
    .click();
}
async function open(page: Page, id: string, title: string) {
  await nav(page, "Konu Anlatımı");
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill(title);
  await page.locator(`.ready-topic[data-lesson-id="${id}"]`).click();
  await expect(page.locator(".study-title h1")).toContainText(title);
}
test("reviewed Seljuk, shell distribution and paragraph lessons explain evidence with independent interactive models and worked steps", async ({
  page,
  context,
}) => {
  await page.goto("/");
  await open(page, "selcuklu-yerlesme-devletlesme", "Selçuklu Türkiyesi");
  await turnToGuideContent(page, page.locator(".lesson-article .guide-section, .lesson-article .guide-examples, .lesson-article .guide-recall", { hasText: "1071 Malazgirt" }));
  await turnToGuideContent(page, page.locator(".lesson-article .guide-section, .lesson-article .guide-examples, .lesson-article .guide-recall", { hasText: "1243 Kösedağ" }));
  await page
    .getByRole("button", { name: "1243 ile 1308’i ayır", exact: true })
    .click();
  await expect(page.locator(".narrative-lab")).toContainText("1243");
  await open(page, "katman-elektron-dizilimi", "Katman elektron dizilimi");
  await page
    .locator(".shell-lab")
    .getByRole("button", { name: "Ca", exact: true })
    .click();
  await expect(page.locator(".shell-result")).toContainText("20 elektron");
  await page
    .locator(".shell-lab")
    .getByRole("button", { name: "Ca2+ iyonu", exact: true })
    .click();
  await expect(page.locator(".shell-result")).toContainText("18 elektron");
  await expect(page.locator(".shell-result")).toContainText("4. periyot");
  await expect(page.locator(".shell-lab svg[role=img]")).toHaveAttribute(
    "aria-label",
    /20 proton, 18 elektron; katmanlar 2, 8, 8/,
  );
  const example = page.locator(".worked-example").filter({
    has: page.locator("summary", { hasText: "İyondan elemente geri dön" }),
  });
  await example.locator("summary").click();
  await example
    .getByRole("button", { name: "Çözümün tamamını göster", exact: true })
    .click();
  await expect(example).toContainText("4. periyot");
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await context.setOffline(true);
  await page.reload();
  await expect(page.locator(".shell-result")).toContainText("18 elektron");
  await open(page, "paragraf", "Paragrafta ana düşünce");
  expect(await guideSectionCount(page)).toBeGreaterThanOrEqual(
    7,
  );
  const passage = page.locator(".worked-example").filter({
    has: page.locator("summary", { hasText: "Bazen sözcüğünü koru" }),
  });
  await passage.locator("summary").click();
  await expect(passage).toContainText("Bir kitabı bitirmek");
  await nav(page, "Dünyam");
  for (const exam of ["TYT", "AYT"]) {
    const tree = page.getByRole("region", {
      name: `${exam} konu ağacı`,
      exact: true,
    });
    const geometry = await tree
      .locator(".subject-tree-diagram")
      .evaluate((svg) => {
        const root = svg
          .querySelector(":scope > circle")!
          .getBoundingClientRect();
        return {
          bottom: root.bottom,
          tops: [...svg.querySelectorAll('[role="button"]')].map(
            (leaf) => leaf.getBoundingClientRect().top,
          ),
        };
      });
    for (const top of geometry.tops) expect(geometry.bottom).toBeLessThan(top);
    for (const leaf of await tree
      .locator('.subject-tree-diagram [role="button"]')
      .all())
      await expect(leaf.locator("svg.lucide")).toHaveCount(1);
  }
  await page.goto("/#/topic?id=detail-450&mode=theory");
  await expect(page.locator(".study-title h1")).toHaveText(
    "Sikloalkanlar ve izomerlik: bağı say, yapıyı karşılaştır",
  );
  await expect(page.locator(".lesson-article")).toBeVisible();
  await expect(
    page.locator('[data-forge023="ayt-sikloalkanlar"]'),
  ).toBeVisible();
  expect(await guideSectionCount(page)).toBeGreaterThan(0);
  await expect(
    page.getByRole("button", { name: /PDF.*ekle|Kaynak dosyalarını yönet/ }),
  ).toHaveCount(0);
  const padding = await page.locator(".lesson-article").evaluate((panel) => {
    const box = panel.getBoundingClientRect(),
      heading = panel.querySelector("h2")!.getBoundingClientRect();
    return { x: heading.x - box.x, y: heading.y - box.y };
  });
  expect(padding.x).toBeGreaterThanOrEqual(18);
  expect(padding.y).toBeGreaterThanOrEqual(18);
  await expect(page.locator(".hourglass-time")).toHaveText("05:00");
});
