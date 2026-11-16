import { expect, type Locator } from "@playwright/test";
import { forge024Case } from "./forge024-case-helper";
import { forge024ChemistryLessons } from "../../src/learning/forge024Chemistry";
const key = (id: string) => "forge024:chemistry:" + id;
async function pick(lab: Locator, label: string, value: string) {
  await lab
    .getByRole("combobox", { name: label, exact: true })
    .selectOption(value);
}
async function compare(
  lab: Locator,
  label: string,
  value: string,
  reason: string,
) {
  await pick(lab, label, value);
  await lab
    .getByRole("textbox", { name: "Gerekçen", exact: true })
    .fill(reason);
  await lab.getByRole("button", { name: "Kıyasla", exact: true }).click();
  await expect(lab.locator('.c024-feedback[role="status"]')).toContainText(
    "Kanıtla uyumlu.",
  );
}
export const chemistry024Cases = [
  forge024Case(
    forge024ChemistryLessons,
    "ayt-alkol-eldesi-tepkimeleri",
    key("ayt-alkol-eldesi-tepkimeleri"),
    async (_, lab) => {
      await pick(lab, "Üretim veya tepkime yolu", "further");
      await pick(lab, "Denklem katı", "2");
      await lab.getByRole("button", { name: "Ürün", exact: true }).click();
      await pick(lab, "Atomu seç", "acid-oh");
      await compare(
        lab,
        "Organik ürünün formülü",
        "C₃H₆O₂",
        "Primer alkol ileri yükseltgendi; üç C korunup COOH oluştu.",
      );
    },
    async (_, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toHaveAttribute("data-product-formula", "C3H6O2");
      await expect(r).toHaveAttribute("data-formula", "C3H6O2");
      await expect(r).toHaveAttribute("data-balanced", "true");
      await expect(r).toContainText("2 H₂O");
      await expect(lab.locator('svg [data-atom="acid-oh"]')).toHaveCount(1);
      await expect(lab.locator(".c024-atom-evidence")).toContainText(
        "gizli H 1",
      );
    },
  ),
  forge024Case(
    forge024ChemistryLessons,
    "ayt-eterler",
    key("ayt-eterler"),
    async (_, lab) => {
      await pick(lab, "Sol düz alkil C sayısı", "3");
      await pick(lab, "Sağ düz alkil C sayısı", "3");
      await pick(lab, "Atomu seç", "ether-o");
      await compare(
        lab,
        "Eter simetrisi",
        "symmetric",
        "İki tarafta aynı düz propil grubu var; O üzerinde H yok.",
      );
    },
    async (_, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toHaveAttribute("data-formula", "C6H14O");
      await expect(r).toHaveAttribute("data-comparison-formula", "C6H14O");
      await expect(r).toHaveAttribute("data-symmetric", "true");
      await expect(lab.locator("svg")).toHaveCount(2);
      await expect(
        lab.locator("svg").first().locator("[data-atom]"),
      ).toHaveCount(7);
      await expect(lab.locator(".c024-atom-evidence")).toContainText(
        "gizli H 0",
      );
    },
  ),
  forge024Case(
    forge024ChemistryLessons,
    "ayt-aldehit-keton",
    key("ayt-aldehit-keton"),
    async (_, lab) => {
      await pick(lab, "Karbonil bileşiği", "benzaldehyde");
      await pick(lab, "Ayıraç veya işlem", "fehling");
      await expect(lab.locator("[data-model-result]")).toContainText(
        "pozitif sonuç yok",
      );
      await pick(lab, "Ayıraç veya işlem", "tollens");
      await pick(lab, "Başlangıç miktarı (mol)", "3");
      await pick(lab, "Atomu seç", "new-acid-o");
      await compare(
        lab,
        "Başlangıç karbonilinin sınıfı",
        "aldehyde",
        "Karbonil C, H taşıyor; Tollens ile bazik karboksilat ve gümüş oluştu.",
      );
    },
    async (_, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toHaveAttribute("data-formula", "C7H5O2");
      await expect(r).toHaveAttribute("data-charge", "-1");
      await expect(r).toHaveAttribute("data-metal", "6");
      await expect(r).toHaveAttribute("data-balanced", "true");
      await expect(r).toContainText("Ag: 6 mol");
      await expect(lab.locator('svg [data-atom="new-acid-o"]')).toHaveAttribute(
        "data-charge",
        "-1",
      );
    },
  ),
  forge024Case(
    forge024ChemistryLessons,
    "ayt-karboksilik-asitler",
    key("ayt-karboksilik-asitler"),
    async (_, lab) => {
      await pick(lab, "Karboksilik asit", "citric");
      await pick(lab, "Asit miktarı (mol)", "2");
      await pick(lab, "Molekül başına nötrleşen COOH", "2");
      await pick(lab, "Baz", "K");
      await compare(
        lab,
        "Molekül başına COOH sayısı",
        "3",
        "Üç karboksil var; iki tanesi nötrleştiğinde molekül yükü eksi iki olur.",
      );
    },
    async (_, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toHaveAttribute("data-acid-groups", "3");
      await expect(r).toHaveAttribute("data-equivalents", "4");
      await expect(r).toHaveAttribute("data-charge", "-2");
      await expect(r).toHaveAttribute("data-formula", "C6H6O7");
      await expect(r).toHaveAttribute("data-balanced", "true");
      await expect(r).toContainText("ek alkol OH: 1");
      await expect(r).toContainText("4 mol K⁺");
    },
  ),
  forge024Case(
    forge024ChemistryLessons,
    "ayt-esterler",
    key("ayt-esterler"),
    async (_, lab) => {
      await pick(lab, "Asit tarafı C sayısı", "3");
      await pick(lab, "Alkol tarafı C sayısı", "2");
      await pick(lab, "Ester işlemi", "base");
      await pick(lab, "Birinci reaktan (mol)", "4");
      await pick(lab, "İkinci reaktan (mol)", "2");
      await pick(lab, "Tepkime ilerlemesi (mol)", "2");
      await pick(lab, "Ester modeli", "fat");
      await pick(lab, "Yağ asidi kuyruğu", "oleic");
      await pick(lab, "Başlangıç yağ (mol)", "2");
      await pick(lab, "Tam hidroliz edilen yağ (mol)", "2");
      await expect(lab.locator("[data-model-result]")).toHaveAttribute(
        "data-soap",
        "6",
      );
      await expect(
        lab.locator("[data-triglyceride] [data-ester-link]"),
      ).toHaveCount(3);
      await pick(lab, "Ester modeli", "simple");
      await compare(
        lab,
        "Hidrolizde karboksilik ürün",
        "salt",
        "Bazik ortamda propanoat tuzu oluşur; etil tarafı etanol olur.",
      );
    },
    async (_, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toHaveAttribute("data-formula", "C5H10O2");
      await expect(r).toHaveAttribute("data-extent", "2");
      await expect(r).toHaveAttribute("data-maximum", "2");
      await expect(r).toHaveAttribute("data-balanced", "true");
      await expect(r).toContainText("RCOO⁻ ve alkol oluşur");
      await expect(lab.locator("svg")).toHaveCount(2);
      await expect(
        lab.locator("svg").first().locator('[data-charge="-1"]'),
      ).toHaveCount(1);
    },
  ),
];
