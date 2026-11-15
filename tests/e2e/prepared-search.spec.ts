import { test, expect } from "@playwright/test";
test("search separates question-only packs from theory and exposes the newly prepared algebra bank", async ({
  page,
}) => {
  await page.goto("/");
  const nav = async (name: string) => {
    await page
      .locator(".sidebar")
      .getByRole("button", { name, exact: true })
      .click();
  };
  await nav("Konu Anlatımı");
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill("ileri alıştırmalar");
  await expect(page.locator(".ready-topic")).toHaveCount(0);
  await expect(page.locator(".subject-panel")).toHaveCount(0);
  await expect(
    page.getByText("Bu aramada konu bulunamadı.", { exact: true }),
  ).toBeVisible();
  await nav("Sorular");
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill("Birinci dereceden denklemler:");
  await expect(page.locator(".ready-topic")).toHaveCount(1);
  await expect(page.locator(".ready-topic")).toContainText("10 özgün soru");
  await expect(page.locator(".subject-panel")).toHaveCount(1);
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill("ileri alıştırmalar");
  await expect(page.locator(".ready-topic")).toHaveCount(1);
  await page.locator(".ready-topic").click();
  await expect(page.locator(".question-panel")).toBeVisible();
  await expect(page.locator(".question-meta")).toContainText("10");
});
