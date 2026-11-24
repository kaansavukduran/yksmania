import { expect, test } from "@playwright/test";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";

test("soru çizimi verilenleri, iki çözüm tablosu kalıcı kayıttan sonraki adımları gösterir", async ({ page, context }, info) => {
  test.setTimeout(90_000);
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  await context.setOffline(true);
  await openCourse(page, { lesson: "yay-dalgalari", search: "Yay dalgaları" });
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  for (let index = 0; index < 11; index++) {
    await page.locator(".answer-options .answer").first().click();
    await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
    await page.getByRole("button", { name: "Sonraki soru", exact: true }).click();
  }
  await expect(page.locator(".question-meta")).toContainText("Soru 12 / 12");
  const given = page.getByRole("figure", { name: "A ve B yaylarında uzunluk, kütle ve gerilim", exact: true });
  const hint = page.getByRole("figure", { name: "Her yay için önce metre başına kütle", exact: true });
  const density = page.getByRole("figure", { name: "Boyca kütle yoğunlukları", exact: true });
  const speed = page.getByRole("figure", { name: "Süratleri aynı kuvvetle hesapla", exact: true });
  const drawing = given.getByRole("img");
  await expect(drawing).toHaveAccessibleDescription(/A yayı 6 metre ve 120 gram.*B yayı 1,5 metre ve 120 gram/);
  await expect(given).not.toContainText(/10 m\/s|0,08 kg\/m/);
  expect(await drawing.evaluate((element) => {
    const svg = element as unknown as SVGSVGElement;
    const view = svg.viewBox.baseVal;
    const labels = [...svg.querySelectorAll("text")].map((label) => ({
      text: label.textContent,
      box: label.getBBox(),
    }));
    const outside = labels.filter(({ box }) =>
      box.x < view.x || box.y < view.y || box.x + box.width > view.x + view.width || box.y + box.height > view.y + view.height,
    ).map(({ text }) => text);
    const overlaps = labels.flatMap(({ box: a, text }, index) =>
      labels.slice(index + 1).filter(({ box: b }) =>
        a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y,
      ).map((other) => [text, other.text]),
    );
    return { outside, overlaps };
  })).toEqual({ outside: [], overlaps: [] });
  await drawing.screenshot({ path: info.outputPath("mebi-spring-density-question124.png") });
  await expect(hint).toHaveCount(0);
  await expect(density).toHaveCount(0);
  await expect(speed).toHaveCount(0);
  const before = await storage(page);
  await page.getByRole("button", { name: "İpucu al", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(1);
  await expect(hint.getByRole("row", { name: "Kütle ÷ uzunluk kg/m", exact: true })).toBeVisible();
  await expect(density).toHaveCount(0);
  await page.getByRole("button", { name: "Adım adım çözüm", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(2);
  const nextStep = page.getByRole("button", { name: "Sonraki adım", exact: true });
  await expect(nextStep).toBeEnabled();
  await nextStep.press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(3);
  await expect(density.getByRole("row", { name: "B 0,12 kg 1,5 m 0,08 kg/m", exact: true })).toBeVisible();
  await expect(speed).toHaveCount(0);
  await expect(nextStep).toBeEnabled();
  await nextStep.press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(4);
  await expect(speed.getByRole("row", { name: "A 2 N 10 m/s", exact: true })).toBeVisible();
  expect(learning({ ...(await storage(page)), draft: before.draft })).toEqual(learning(before));
  await page.reload();
  await expect(speed.getByRole("row", { name: "B 2 N 5 m/s", exact: true })).toBeVisible();
  await page.locator(".answer-options .answer").nth(3).click();
  await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
  await expect(page.locator(".feedback.correct")).toBeVisible();
  await expect.poll(async () => (await storage(page)).draft?.responses[11]).toMatchObject({
    questionId: "yay-dalgalari-esit-kutle-yogunluk-cizimi", selected: 3, correct: true, assisted: true,
  });
});
