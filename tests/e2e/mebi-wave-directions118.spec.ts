import { expect, test } from "@playwright/test";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";

test("kök okları, ipucu ve çözüm tabloları doğru adımda ve kayıt sonrası açılır", async ({ page, context }, info) => {
  test.setTimeout(90_000);
  await page.setViewportSize({ width: 320, height: 860 });
  await prepare(page, true);
  await context.setOffline(true);
  await openCourse(page, { lesson: "dalgalara-giris", search: "Dalgalara giriş" });
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  for (let index = 0; index < 10; index += 1) {
    await page.locator(".answer-options .answer").first().click();
    await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
    await page.getByRole("button", { name: "Sonraki soru", exact: true }).click();
  }
  await expect(page.locator(".question-meta")).toContainText("Soru 11 / 11");
  const given = page.getByRole("figure", { name: "A ve B’de ilerleme ve titreşim okları", exact: true });
  const hint = page.getByRole("figure", { name: "İki doğrultuyu karşılaştır", exact: true });
  const firstStep = page.getByRole("figure", { name: "A düzeneğinde doğrultular", exact: true });
  const secondStep = page.getByRole("figure", { name: "B düzeneğinde doğrultular", exact: true });
  await expect(given.getByRole("img")).toHaveAccessibleDescription(/A’da.*yukarı-aşağı.*B’de.*sola-sağa/);
  await expect(given).not.toContainText(/Enine|Boyuna/i);
  expect(await given.getByRole("img").evaluate((element) => {
    const svg = element as unknown as SVGSVGElement;
    const bounds = svg.viewBox.baseVal;
    return [...svg.querySelectorAll("text")].filter((label) => {
      const box = label.getBBox();
      return box.x < bounds.x || box.y < bounds.y || box.x + box.width > bounds.x + bounds.width || box.y + box.height > bounds.y + bounds.height;
    }).map((label) => label.textContent);
  })).toEqual([]);
  await expect(hint).toHaveCount(0);
  await expect(firstStep).toHaveCount(0);
  await expect(secondStep).toHaveCount(0);
  const before = await storage(page);
  await page.getByRole("button", { name: "İpucu al", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(1);
  await expect(hint.getByRole("img")).toBeVisible();
  await expect(firstStep).toHaveCount(0);
  await expect(secondStep).toHaveCount(0);
  await page.getByRole("button", { name: "Adım adım çözüm", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(2);
  const nextStep = page.getByRole("button", { name: "Sonraki adım", exact: true });
  await expect(firstStep).toHaveCount(0);
  await expect(secondStep).toHaveCount(0);
  await expect(nextStep).toBeEnabled();
  await nextStep.press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(3);
  await expect(firstStep.getByRole("row", { name: "Yatay Düşey Dik", exact: true })).toBeVisible();
  await expect(secondStep).toHaveCount(0);
  await expect(nextStep).toBeEnabled();
  await nextStep.press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(4);
  await expect(secondStep.getByRole("row", { name: "Yatay Yatay Paralel", exact: true })).toBeVisible();
  await given.getByRole("img").screenshot({ path: info.outputPath("mebi-wave-directions118-question.png") });
  expect(learning({ ...(await storage(page)), draft: before.draft })).toEqual(learning(before));
  await page.reload();
  await expect(secondStep.getByRole("row", { name: "Yatay Yatay Paralel", exact: true })).toBeVisible();
});
