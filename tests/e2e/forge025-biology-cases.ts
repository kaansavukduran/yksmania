import { expect, type Locator } from "@playwright/test";
import { forge025Case } from "./forge025-case-helper";
import { forge025BiologyLessons } from "../../src/learning/forge025Biology";
const key = (id: string) => "forge025-biology-" + id;
const pick = async (lab: Locator, label: string, value: string) =>
  lab.getByRole("combobox", { name: label, exact: true }).selectOption(value);
const number = async (lab: Locator, label: string, value: number) =>
  lab.getByRole("spinbutton", { name: label, exact: true }).fill(String(value));
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
  await expect(lab.locator('.b025-feedback[role="status"]')).toContainText(
    "Kanıtla uyumlu.",
  );
}
export const biology025Cases = [
  forge025Case(
    forge025BiologyLessons,
    "bitkilerde-dollenme-cimlenme",
    key("bitkilerde-dollenme-cimlenme"),
    async (_, lab) => {
      await number(lab, "Haploit kromozom sayısı n", 15);
      await pick(lab, "Yumurta aleli", "a");
      await pick(lab, "Sperm aleli", "A");
      await expect(lab.locator("[data-model-result]")).toHaveAttribute(
        "data-endosperm-genotype",
        "aaA",
      );
      await pick(lab, "İnceleme", "germination");
      await number(lab, "Gözlem günü", 7);
      await lab
        .getByRole("checkbox", { name: "Işık var", exact: true })
        .uncheck();
      await expect(lab.locator("[data-model-result]")).toHaveAttribute(
        "data-conditions",
        "true",
      );
      await number(lab, "Oksijen erişim endeksi", 0);
      await expect(lab.locator("[data-model-result]")).toHaveAttribute(
        "data-conditions",
        "false",
      );
      await number(lab, "Oksijen erişim endeksi", 60);
      await compare(
        lab,
        "Bu sabit koşullarda büyüme birikir mi?",
        "yes",
        "Canlı ve dormansisiz fasulyede su,oksijen ve sıcaklık uygun;ilk büyüme depo besinle olur.",
      );
    },
    async (_, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toHaveAttribute("data-conditions", "true");
      await expect(r).toHaveAttribute("data-progress", "1");
      await expect(lab.locator("[data-root-path]")).toHaveAttribute(
        "data-root-extent",
        "1",
      );
      await expect(r).toContainText("Bu profilde yok");
    },
  ),
  forge025Case(
    forge025BiologyLessons,
    "canlilar-ve-cevre",
    key("canlilar-ve-cevre"),
    async (_, lab) => {
      await number(lab, "Ortam sıcaklığı (°C)", 35);
      await expect(lab.locator("[data-model-result]")).toHaveAttribute(
        "data-a",
        "40",
      );
      await expect(lab.locator("[data-model-result]")).toHaveAttribute(
        "data-b",
        "55",
      );
      await pick(lab, "Çevre modeli", "mutation");
      await pick(lab, "Hücre soyu", "shoot");
      await pick(lab, "Üreme yolu", "vegetative");
      await number(lab, "Temsili etki (0–100)", 50);
      await expect(lab.locator("[data-model-result]")).toHaveAttribute(
        "data-transmission",
        "true",
      );
      await pick(lab, "Çevre modeli", "breeding");
      await pick(lab, "Islah hedefi", "drought");
      await number(lab, "Seçilecek hat sayısı", 2);
      await compare(
        lab,
        "Bu seçim doğrudan yeni alel üretir mi?",
        "no",
        "Kuraklık hedefi K5 ve K4 hattının üreme katkısını seçer;yeni alel oluşturmak zorunda değildir.",
      );
    },
    async (_, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toHaveAttribute("data-selected", "K5,K4");
      await expect(r).toHaveAttribute("data-mean-yield", "3");
      await expect(r).toHaveAttribute("data-mean-drought", "9");
      await expect(
        lab.locator('[data-line][data-selected="true"]'),
      ).toHaveCount(2);
      await expect(lab.locator(".b025-choice").first()).toContainText(
        "Yapay seçilim ve ödünleşim",
      );
    },
  ),
];
