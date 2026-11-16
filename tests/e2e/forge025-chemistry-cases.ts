import { expect, type Locator } from "@playwright/test";
import { forge025Case, setRange } from "./forge025-case-helper";
import { forge025ChemistryLessons } from "../../src/learning/forge025Chemistry";
const key = (id: string) => "forge025:chemistry:" + id;
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
  await expect(lab.locator('.c025-feedback[role="status"]')).toContainText(
    "Kanıtla uyumlu.",
  );
}
export const chemistry025Cases = [
  forge025Case(
    forge025ChemistryLessons,
    "ayt-enerji-kaynaklari-gelismeler",
    key("ayt-enerji-kaynaklari-gelismeler"),
    async (_, lab) => {
      await pick(lab, "Saf yakıt modeli", "hydrogen");
      await expect(lab.locator("[data-model-result]")).toHaveAttribute(
        "data-co2",
        "0",
      );
      await expect(lab.locator('[data-quantity="co2"]')).toHaveAttribute(
        "width",
        "0",
      );
      await pick(lab, "Enerji modeli", "hydrogen");
      await setRange(lab, "Elektroliz verimi (%)", 80);
      await setRange(lab, "Yakıt pili verimi (%)", 50);
      await compare(
        lab,
        "Geri alınan elektrik (MJ)",
        "24",
        "60×0,80×0,50=24 MJ; iki aşamanın verimleri çarpılır.",
      );
    },
    async (_, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toHaveAttribute("data-mode", "hydrogen");
      await expect(r).toHaveAttribute("data-output", "24");
      await expect(r).toHaveAttribute("data-efficiency", "40");
      await expect(r).toHaveAttribute("data-balanced", "true");
      await expect(lab.locator('[data-bar="chemical"]')).toHaveAttribute(
        "data-value",
        "48",
      );
      await expect(lab.locator('[data-bar="output"]')).toHaveAttribute(
        "data-value",
        "24",
      );
      await expect(lab.locator('[data-quantity="output"]')).toHaveAttribute(
        "width",
        "60",
      );
    },
  ),
  forge025Case(
    forge025ChemistryLessons,
    "ayt-surdurulebilirlik-geri-donusum",
    key("ayt-surdurulebilirlik-geri-donusum"),
    async (_, lab) => {
      await setRange(lab, "İlk malzeme talebi (kg)", 400);
      await setRange(lab, "Talep önleme (%)", 10);
      await setRange(lab, "Kalanın yeniden kullanımı (%)", 20);
      await setRange(lab, "Atık toplama (%)", 50);
      await setRange(lab, "Toplananın kabulü (%)", 75);
      await setRange(lab, "Kabulün işleme verimi (%)", 80);
      await setRange(lab, "Atık toplama (%)", 0);
      await expect(lab.locator('[data-stream="recovered"]')).toHaveAttribute(
        "width",
        "0",
      );
      await setRange(lab, "Atık toplama (%)", 50);
      await pick(lab, "Sürdürülebilirlik modeli", "reuse");
      await setRange(lab, "Her kullanım temizliği (birim)", 2);
      await compare(
        lab,
        "Verilen ölçütte daha düşük toplam etki",
        "single",
        "32>20",
      );
      await pick(lab, "Sürdürülebilirlik modeli", "flow");
      await expect(lab.locator('.c025-feedback[role="status"]')).toHaveCount(0);
      await expect(
        lab.getByRole("button", { name: "Kıyasla", exact: true }),
      ).toBeDisabled();
      await compare(
        lab,
        "Nihai geri kazanılan miktar (kg)",
        "86.4",
        "288×0,50×0,75×0,80=86,4 kg; her oran kendi girdisine uygulanır.",
      );
    },
    async (_, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toHaveAttribute("data-mode", "flow");
      await expect(r).toHaveAttribute("data-recovered", "86.4");
      await expect(r).toHaveAttribute("data-initial", "400");
      await expect(r).toHaveAttribute("data-balanced", "true");
      await expect(lab.locator('[data-stream="recovered"]')).toHaveAttribute(
        "data-mass",
        "86.4",
      );
      const width = Number(
        await lab.locator('[data-stream="recovered"]').getAttribute("width"),
      );
      expect(width).toBeCloseTo(21.6, 8);
      await expect(r).toContainText("Ayıklama reddi");
      await expect(r).toContainText("1:1 ikame");
    },
  ),
  forge025Case(
    forge025ChemistryLessons,
    "ayt-nanoteknoloji-gelismeler",
    key("ayt-nanoteknoloji-gelismeler"),
    async (_, lab) => {
      await setRange(lab, "Başlangıç küp kenarı (nm)", 480);
      await setRange(lab, "Her eksendeki bölme sayısı", 4);
      const width = Number(
        await lab.locator("[data-original-edge]").getAttribute("width"),
      );
      expect(width).toBeCloseTo(110.4, 8);
      await pick(lab, "Nano modeli", "lattice");
      await setRange(lab, "Bir kenardaki nokta sayısı", 7);
      await setRange(lab, "Görünen katman", 4);
      await expect(lab.locator("svg [data-point]")).toHaveCount(49);
      await expect(lab.locator('svg [data-surface="true"]')).toHaveCount(24);
      await compare(
        lab,
        "Seçili katmanda sınır noktası sayısı",
        "24",
        "7²−5²=24",
      );
      await pick(lab, "Nano modeli", "cube");
      await expect(
        lab.getByRole("button", { name: "Kıyasla", exact: true }),
      ).toBeDisabled();
      await compare(lab, "Toplam küçük küp sayısı", "64", "4³=64");
    },
    async (_, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toHaveAttribute("data-mode", "cube");
      await expect(r).toHaveAttribute("data-pieces", "64");
      await expect(r).toHaveAttribute("data-small-edge", "120");
      await expect(r).toHaveAttribute("data-area-ratio", "4");
      await expect(r).toHaveAttribute("data-balanced", "true");
      await expect(lab.locator("svg [data-cut]")).toHaveCount(3);
      await expect(lab.locator("[data-small-edge]").last()).toHaveAttribute(
        "data-small-edge",
        "120",
      );
      await expect(r).toContainText("Hacim korunur");
    },
  ),
];
