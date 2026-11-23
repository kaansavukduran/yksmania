import { expect } from "@playwright/test";

async function reveal(lab) {
  if ((await lab.getAttribute("open")) === null)
    await lab.locator(":scope > summary").press("Enter");
}

export const counting040SmokeCases = [
  {
    id: "tyt-mat-kombinasyon-kaynak-034",
    title: "Kombinasyon",
    sectionTitle: "Boş seçim ve dışarıda kalanlar",
    selector: '[data-model="source034-point-choices"]',
    storedKey: "point-choices-source-034",
    persisted: { mask: 15, view: "line" },
    note: "Üçgenlerde üçlüleri, doğrularda aynı doğruyu veren çiftleri karşılaştırdım. ÇĞİÖŞÜ.",
    async act(lab) {
      await reveal(lab);
      await expect(lab.getByRole("status")).toContainText(
        "56 üçlüden 52 üçgen. 23 ayrı doğru.",
      );
      await lab
        .getByRole("button", { name: "Doğrusal üçlü", exact: true })
        .click();
      for (const point of ["E", "F", "G", "H"]) {
        await lab
          .getByRole("checkbox", {
            name: `${point} noktasını seç`,
            exact: true,
          })
          .uncheck();
      }
    },
    async assertModel(lab) {
      await reveal(lab);
      await expect(lab.getByRole("status")).toContainText(
        "4 üçlüden 0 üçgen. 1 ayrı doğru.",
      );
      await expect(lab.getByRole("img").locator("polyline")).toHaveCount(1);
      await expect(lab.locator("figcaption")).toContainText("alan sıfır");
    },
  },
  {
    id: "tyt-mat-binom-kaynak-035",
    title: "Binom açılımı",
    sectionTitle: "Pascal satırını üstteki iki komşudan kur",
    selector: '[data-model="source035-signed-binomial"]',
    storedKey: "signed-binomial-source-035",
    persisted: { n: 4, r: 2, a: 2, b: -1, p: 1, q: 0 },
    note: "Pascal sayısını katsayıdan ayrı hesapladım. ÇĞİÖŞÜ.",
    async act(lab) {
      await reveal(lab);
      await expect(lab.getByRole("status")).toContainText(
        "Çift dereceli toplam -121.",
      );
      await lab
        .getByRole("slider", { name: "Parantezin üssü", exact: true })
        .press("ArrowLeft");
      const choices = lab.getByRole("slider", {
        name: "İkinci terim kaç kez seçilsin?",
        exact: true,
      });
      await choices.press("ArrowRight");
      await choices.press("ArrowRight");
    },
    async assertModel(lab) {
      await reveal(lab);
      await expect(lab.getByRole("status")).toContainText("Satır toplamı 16.");
      await expect(lab.getByRole("status")).toContainText(
        "r=2 için C(4,2)=6. Değişken üssü 2, katsayı 24.",
      );
      await expect(lab.getByRole("img").locator("rect")).toHaveCount(5);
    },
  },
];
