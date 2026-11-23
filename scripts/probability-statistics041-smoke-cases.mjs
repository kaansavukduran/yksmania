import { expect } from "@playwright/test";

async function reveal(lab) {
  if ((await lab.getAttribute("open")) === null)
    await lab.locator(":scope > summary").press("Enter");
}

export const probabilityStatistics041SmokeCases = [
  {
    id: "tyt-mat-olasilik-kaynak-036",
    title: "Olasılık",
    sectionTitle: "En az biri ve tam biri ayır",
    selector: '[data-model="source036-conditional-dice"]',
    storedKey: "conditional-dice-source-036",
    persisted: { mode: "one-face" },
    note: "Koşul değişince kalan olası çiftleri yeniden saydım. ÇĞİÖŞÜ.",
    async act(lab) {
      await reveal(lab);
      await expect(lab.locator(".f014m-result").first()).toContainText(
        "4/10, sade oran 2/5.",
      );
      await lab
        .getByRole("button", { name: "Belirli zar yüzü", exact: true })
        .click();
    },
    async assertModel(lab) {
      await reveal(lab);
      await expect(lab.locator(".f014m-result").first()).toContainText(
        "Koşul altında 1/11.",
      );
      await expect(lab.getByRole("img").locator("rect")).toHaveCount(36);
      await expect(lab.getByRole("img").locator("circle")).toHaveCount(1);
    },
  },
  {
    id: "veri-analizi",
    title: "Veri analizi",
    sectionTitle: "Frekans, gözlemi kaç kez saydığını söyler",
    selector: '[data-model="source037-statistics"]',
    storedKey: "statistics-source-037",
    persisted: { groups: 4, mode: "histogram", multiplier: 0 },
    note: "Ham veriyi eş genişlikli aralıklara ayırıp on gözlemi korudum. ÇĞİÖŞÜ.",
    async act(lab) {
      await reveal(lab);
      await expect(lab.getByRole("status")).toContainText(
        "Sapma A için 2, B için 1.",
      );
      await lab
        .getByRole("slider", { name: "A için çarpan", exact: true })
        .press("ArrowLeft");
      await lab.getByRole("button", { name: "Histogram", exact: true }).click();
      await lab
        .getByRole("slider", { name: "Sınıf sayısı", exact: true })
        .press("ArrowRight");
    },
    async assertModel(lab) {
      await reveal(lab);
      await expect(lab.getByRole("status")).toContainText(
        "Sınıf genişliği 3. En az 5 olan 7/10 gözlem.",
      );
      const histogram = lab.getByRole("img");
      await expect(histogram.locator("rect")).toHaveCount(4);
      await expect(
        histogram.locator("text").filter({ hasText: "Frekans (adet)" }),
      ).toBeVisible();
    },
  },
];
