import { expect, type Locator } from "@playwright/test";
import { forge023Case } from "./forge023-case-helper";
import { forge023ChemistryLessons } from "../../src/learning/forge023Chemistry";
const key = (id: string) => "forge023:chemistry:" + id;
async function compare(
  lab: Locator,
  label: string,
  value: string,
  reason: string,
) {
  await lab
    .getByRole("combobox", { name: label, exact: true })
    .selectOption(value);
  await lab
    .getByRole("textbox", { name: "Gerekçen", exact: true })
    .fill(reason);
  await lab.getByRole("button", { name: "Kıyasla", exact: true }).click();
  await expect(lab.locator('.c023-feedback[role="status"]')).toContainText(
    "Kanıtla uyumlu.",
  );
}
export const chemistry023Cases = [
  forge023Case(
    forge023ChemistryLessons,
    "ayt-sikloalkanlar",
    key("ayt-sikloalkanlar"),
    async (_, lab) => {
      await lab
        .getByRole("combobox", { name: "İlk yapı", exact: true })
        .selectOption("cyclopentane");
      await lab
        .getByRole("combobox", { name: "İkinci yapı", exact: true })
        .selectOption("pent1");
      await lab
        .getByRole("combobox", { name: "Atomu seç", exact: true })
        .selectOption("2");
      await compare(
        lab,
        "Bu iki yapı nasıl ilişkili?",
        "isomer",
        "İkisi C5H10; halka yerine bir pi bağı var.",
      );
    },
    async (_, lab) => {
      const result = lab.locator("[data-model-result]");
      await expect(result).toHaveAttribute("data-first-formula", "C5H10");
      await expect(result).toHaveAttribute("data-second-formula", "C5H10");
      await expect(result).toHaveAttribute("data-relationship", "Zincir–halka");
      await expect(result).toContainText("Sigma: 15; pi: 0; halka: 1");
      await expect(result).toContainText("Sigma: 14; pi: 1; halka: 0");
      await expect(
        lab.locator("svg").first().locator("[data-atom]"),
      ).toHaveCount(5);
      await expect(
        lab.locator("svg").first().locator("[data-bond]"),
      ).toHaveCount(5);
      await expect(lab.locator(".c023-atom-evidence")).toContainText("3. C");
      await expect(lab.locator('.c023-feedback[role="status"]')).toContainText(
        "Kanıtla uyumlu.",
      );
    },
  ),
  forge023Case(
    forge023ChemistryLessons,
    "ayt-alkenler",
    key("ayt-alkenler"),
    async (_, lab) => {
      await lab
        .getByRole("combobox", { name: "Alken", exact: true })
        .selectOption("propene");
      await lab
        .getByRole("combobox", { name: "Reaktif", exact: true })
        .selectOption("water");
      await lab.getByRole("button", { name: "Ürün", exact: true }).click();
      await lab
        .getByRole("combobox", { name: "Atomu seç", exact: true })
        .selectOption("3");
      await compare(
        lab,
        "Son yapıda pi kaldı mı?",
        "no",
        "Su katıldı; C=C tekleşti, O orta C’ye bağlı.",
      );
    },
    async (_, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toHaveAttribute("data-formula", "C3H8O");
      await expect(r).toHaveAttribute("data-pi", "0");
      await expect(r).toContainText("2-Propanol");
      await expect(r).toContainText("Sigma: 11; pi: 0");
      await expect(lab.locator('svg [data-atom="3"]')).toHaveAttribute(
        "data-element",
        "O",
      );
      await expect(lab.locator('svg [data-bond="1-3"]')).toHaveAttribute(
        "data-order",
        "1",
      );
      await expect(lab.locator(".c023-atom-evidence")).toContainText("4. O");
      await expect(lab.locator('.c023-feedback[role="status"]')).toContainText(
        "Kanıtla uyumlu.",
      );
    },
  ),
  forge023Case(
    forge023ChemistryLessons,
    "ayt-alkinler",
    key("ayt-alkinler"),
    async (_, lab) => {
      await lab
        .getByRole("combobox", { name: "Alkin", exact: true })
        .selectOption("propyne");
      await lab
        .getByRole("combobox", { name: "Katılan tür", exact: true })
        .selectOption("water");
      await lab.getByRole("button", { name: "Enol", exact: true }).click();
      await expect(lab.locator("[data-model-result]")).toContainText("Enol");
      await expect(lab.locator("[data-model-result]")).toHaveAttribute(
        "data-formula",
        "C3H6O",
      );
      await lab.getByRole("button", { name: "Karbonil", exact: true }).click();
      await compare(
        lab,
        "İlk tür uç alkin mi?",
        "yes",
        "Başlangıç propinde bir sp C doğrudan H taşır.",
      );
    },
    async (_, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toHaveAttribute("data-formula", "C3H6O");
      await expect(r).toHaveAttribute("data-pi", "1");
      await expect(r).toHaveAttribute("data-terminal", "true");
      await expect(r).toContainText("Propanon");
      await expect(r).toContainText("Toplam sigma: 9; toplam pi: 1");
      await expect(r).toContainText("katılan reaktif: 1 mol");
      await expect(lab.locator('svg [data-bond="1-3"]')).toHaveAttribute(
        "data-order",
        "2",
      );
      await expect(lab.locator('.c023-feedback[role="status"]')).toContainText(
        "Kanıtla uyumlu.",
      );
    },
  ),
  forge023Case(
    forge023ChemistryLessons,
    "ayt-arenler",
    key("ayt-arenler"),
    async (_, lab) => {
      await lab
        .getByRole("combobox", { name: "Bileşik", exact: true })
        .selectOption("xylene");
      await lab
        .getByRole("combobox", { name: "İkinci metil", exact: true })
        .selectOption("2");
      await lab
        .getByRole("combobox", { name: "Gösterim", exact: true })
        .selectOption("b");
      await compare(
        lab,
        "Yalnız C ve H mi?",
        "yes",
        "Ksilen C8H10; yalnız C ve H içeriyor.",
      );
    },
    async (_, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toHaveAttribute("data-formula", "C8H10");
      await expect(r).toHaveAttribute("data-aromatic", "true");
      await expect(r).toHaveAttribute("data-hydrocarbon", "true");
      await expect(r).toContainText("m-Ksilen");
      await expect(r).toContainText("toplam sigma: 18; pi elektronu: 6");
      await expect(r).toContainText("meta (1,3)");
      await expect(lab.locator('svg [data-bond="2-7"]')).toHaveAttribute(
        "data-order",
        "1",
      );
      await expect(lab.locator('.c023-feedback[role="status"]')).toContainText(
        "Kanıtla uyumlu.",
      );
    },
  ),
  forge023Case(
    forge023ChemistryLessons,
    "ayt-alkoller",
    key("ayt-alkoller"),
    async (_, lab) => {
      await lab
        .getByRole("combobox", { name: "Yapı", exact: true })
        .selectOption("lactic");
      await lab
        .getByRole("button", { name: "2. İkincil –OH", exact: true })
        .click();
      await compare(
        lab,
        "Alkol grubu bulunuyor mu?",
        "yes",
        "İki O–H var; yalnız orta sp³ C’nin OH’si alkol.",
      );
    },
    async (_, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toHaveAttribute("data-formula", "C3H6O3");
      await expect(r).toHaveAttribute("data-alcohol-count", "1");
      await expect(r).toContainText("Laktik asit");
      await expect(r).toContainText("Alkol grubu: 1. Toplam O–H: 2");
      await expect(r).toContainText("Alfa C komşusu: 2; alfa H: 1");
      await expect(lab.locator("svg .c023-atom.c023-marked")).toHaveCount(2);
      await expect(lab.locator('.c023-feedback[role="status"]')).toContainText(
        "Kanıtla uyumlu.",
      );
    },
  ),
];
