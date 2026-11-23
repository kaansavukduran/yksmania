import { expect, test } from "@playwright/test";
import { prepare, storage } from "./helpers/revisedCourse";

test.use({
  locale: "tr-TR",
  viewport: { width: 320, height: 900 },
  reducedMotion: "reduce",
});

test("öteleme çizimi önce verilenleri, son çözüm adımında görüntüyü gösterir", async ({ page, context }, info) => {
  test.setTimeout(90_000);
  await prepare(page, true);
  await context.setOffline(true);
  await page.getByRole("button", { name: "Menüyü aç", exact: true }).click();
  await page.locator(".sidebar").getByRole("button", { name: "Konu Anlatımı", exact: true }).click();
  await page.getByRole("button", { name: "AYT", exact: true }).click();
  await page.getByRole("textbox", { name: "Ders veya konu ara", exact: true }).fill("Öteleme ve Dönme");
  await page.locator('.ready-topic[data-lesson-id="donusum-oteleme-donme"]').click();
  await expect(page.locator(".study-title h1")).toHaveText("Öteleme ve dönme: hareketin sırasını keşfet");
  await page.getByText("İçindekiler", { exact: true }).click();
  await page.getByRole("button", { name: "Öteleme vektörünün iki bileşenini oku", exact: true }).press("Enter");
  await expect(page.locator('[data-section-figure="Öteleme vektörünün iki bileşenini oku"]')).toBeVisible();
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  const stem = page.locator(".question-panel").getByRole("figure", { name: "Ötelemeden önceki konum", exact: true });
  const hint = page.getByRole("figure", { name: "Vektörün bileşenlerini eksenlerle eşleştir", exact: true });
  const x = page.getByRole("figure", { name: "Yatay konumu hesapla", exact: true });
  const y = page.getByRole("figure", { name: "Düşey konumu hesapla", exact: true });
  const final = page.getByRole("figure", { name: "İki koordinatı yeni noktada birleştir", exact: true });
  await expect(stem.getByRole("img")).toHaveAccessibleDescription(/orijinin 3 birim solunda ve 4 birim yukarısında/);
  await expect(stem.locator("svg text").last()).toHaveText("P(−3; 4)");
  await expect(stem.locator("svg circle")).toHaveCount(1);
  await expect(hint).toHaveCount(0);
  await expect(final).toHaveCount(0);
  const before = await storage(page);
  await stem.screenshot({ path: info.outputPath("oteleme-soru-320.png") });
  await page.getByRole("button", { name: "İpucu al", exact: true }).press("Enter");
  await expect(hint.getByRole("cell")).toHaveText(["+5", "Sağa", "−6", "Aşağı"]);
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(1);
  await expect(x).toHaveCount(0);
  await expect(final).toHaveCount(0);
  await page.getByRole("button", { name: "Adım adım çözüm", exact: true }).press("Enter");
  const advance = async (level: number) => {
    const next = page.getByRole("button", { name: "Sonraki adım", exact: true });
    await expect(next).toBeEnabled();
    await next.press("Enter");
    await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(level);
  };
  await advance(3);
  await expect(x.getByRole("math")).toHaveAccessibleName(/−3 \+ 5 = 2/);
  await expect(y).toHaveCount(0);
  await advance(4);
  await expect(y.getByRole("math")).toHaveAccessibleName(/4 \+ \(−6\) = −2/);
  await expect(final).toHaveCount(0);
  await advance(5);
  await expect(final.getByRole("img")).toHaveAccessibleDescription(/P′\(2; −2\)/);
  await expect(final.locator("svg circle")).toHaveCount(2);
  const defects = await final.locator("svg").evaluate((svg: SVGSVGElement) => {
    const { width, height } = svg.viewBox.baseVal;
    const labels = Array.from(svg.querySelectorAll("text"), (label) => [label.textContent, label.getBBox()] as const);
    return labels.flatMap(([name, box], index) => {
      const clipped = box.x < 0 || box.y < 0 || box.x + box.width > width || box.y + box.height > height;
      const overlaps = labels.slice(index + 1).filter(([, other]) =>
        box.x < other.x + other.width && other.x < box.x + box.width &&
        box.y < other.y + other.height && other.y < box.y + box.height);
      return clipped || overlaps.length ? [{ name, clipped, overlaps: overlaps.map(([label]) => label) }] : [];
    });
  });
  expect(defects).toEqual([]);
  await final.screenshot({ path: info.outputPath("oteleme-cozum-320.png") });
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  await page.locator(".answer-options .answer").nth(4).click();
  await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
  await expect.poll(async () => (await storage(page)).draft?.responses[0]).toMatchObject({
    questionId: "f021-donusum-oteleme-donme-1",
    assisted: true,
    correct: true,
    helpLevel: 5,
    visibleFigureRevision: expect.stringMatching(/^[0-9a-f]{14}$/),
    solutionFigureRevision: expect.stringMatching(/^[0-9a-f]{14}$/),
  });
  const checked = await storage(page);
  expect(checked.sessions).toEqual(before.sessions);
  expect(checked.reviews).toEqual(before.reviews);
  expect(checked.topicProgress).toEqual(before.topicProgress);
  expect((await page.reload())?.fromServiceWorker()).toBe(true);
  await expect(stem).toBeVisible();
  expect((await storage(page)).draft).toEqual(checked.draft);

  const next = page.getByRole("button", { name: "Sonraki soru", exact: true });
  await next.click();
  for (let index = 1; index < 10; index++) {
    await page.locator(".answer-options .answer").first().click();
    await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
    await (index === 9 ? page.getByRole("button", { name: "Çalışmayı kaydet", exact: true }) : next).click();
  }
  await expect(page.locator(".result-stats")).toBeVisible();
  const completed = await storage(page);
  const session = completed.sessions.at(-1)!;
  expect(session.lessonId).toBe("donusum-oteleme-donme");
  expect(session.responses).toHaveLength(10);
  expect(session.responses[0]).toEqual(checked.draft?.responses[0]);

  await page.getByRole("button", { name: "Menüyü aç", exact: true }).press("Enter");
  await page.locator(".sidebar").getByRole("button", { name: "Yanlışlarım", exact: true }).press("Enter");
  const reviewed = page.locator(".mistake-card").filter({
    has: page.getByRole("figure", { name: "Ötelemeden önceki konum", exact: true }),
  });
  await expect(reviewed).toHaveCount(1);
  await expect(reviewed.getByRole("figure", { name: "İki koordinatı yeni noktada birleştir", exact: true })).toHaveCount(0);
  await reviewed.locator("details > summary").first().press("Enter");
  await expect(reviewed.getByRole("figure", { name: "İki koordinatı yeni noktada birleştir", exact: true })).toBeVisible();
  expect((await storage(page)).sessions).toEqual(completed.sessions);
});

test("ötelemenin ayrı Kopya Kağıdı iki ekseni ve üçgenin karşılık gelen köşelerini gösterir", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 900 });
  await prepare(page);
  await context.setOffline(true);
  const before = await storage(page);
  const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page.locator(".sidebar").getByRole("button", { name: "Kopya Kağıtları", exact: true }).click();
  await page.getByRole("button", { name: "AYT", exact: true }).click();
  await page.getByRole("textbox", { name: "Ders veya konu ara", exact: true }).fill("Öteleme ve Dönme");
  await page.getByRole("button", { name: "Dönüşümler: Öteleme ve Dönme", exact: true }).click();
  const components = '[data-section-figure="Öteleme vektörünün iki bileşenini oku"]';
  await expect(page.locator(".cheat-section").locator(components)).toBeVisible();
  await expect(page.locator('[data-section-figure="Şekli köşe köşe taşı, bağıntıyı geri denetle"]')).toBeVisible();
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: "Ötele ve başlangıca geri dön" });
  await example.locator(":scope > summary").press("Enter");
  await expect(example.locator(components)).toBeHidden();
  await example.locator(".cheat-solution summary").press("Enter");
  await expect(example.locator(components)).toBeVisible();
  const after = await storage(page);
  expect(after.sessions).toEqual(before.sessions);
  expect(after.reviews).toEqual(before.reviews);
  expect(after.topicProgress).toEqual(before.topicProgress);
});
