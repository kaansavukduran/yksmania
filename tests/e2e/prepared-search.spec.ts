import { test, expect } from "@playwright/test";
test("search never presents a question-only pack as prepared theory or an unprepared narrative as a question set", async ({
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
  await expect(page.locator(".ready-topic")).toHaveCount(0);
  await expect(page.locator(".subject-panel")).toHaveCount(0);
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill("ileri alıştırmalar");
  await expect(page.locator(".ready-topic")).toHaveCount(1);
  await page.locator(".ready-topic").click();
  await expect(page.locator(".question-panel")).toBeVisible();
  await expect(page.locator(".question-meta")).toContainText("10");
});
