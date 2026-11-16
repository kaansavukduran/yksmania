import { expect, type Locator } from "@playwright/test";
import { forge026Case, setRange } from "./forge026-case-helper";
import { sourceNarratives } from "../../src/learning/narratives";
const legacyChemistryLessons = sourceNarratives.filter((l) =>
  ["atomun-temel-tanecikleri", "izotop-izoton-izobar"].includes(l.id),
);
const pick = async (lab: Locator, label: string, value: string) => {
  await lab
    .getByRole("combobox", { name: label, exact: true })
    .selectOption(value);
};
async function compare(
  lab: Locator,
  label: string,
  value: string,
  reason: string,
) {
  await lab.getByRole("textbox", { name: label, exact: true }).fill(value);
  await lab
    .getByRole("textbox", { name: "Gerekçen", exact: true })
    .fill(reason);
  await lab.getByRole("button", { name: "Kıyasla", exact: true }).click();
  await expect(lab.locator('.c026-feedback[role="status"]')).toContainText(
    "Modelle uyumlu.",
  );
}
export const chemistry026Cases = [
  forge026Case(
    legacyChemistryLessons,
    "atomun-temel-tanecikleri",
    "forge026:chemistry:atomun-temel-tanecikleri",
    async (_, lab) => {
      await setRange(lab, "Proton sayısı Z", 14);
      await setRange(lab, "Nötron sayısı n", 16);
      await setRange(lab, "Başlangıç elektron sayısı", 16);
      await expect(lab.locator('svg [data-particle="proton"]')).toHaveCount(14);
      await expect(lab.locator('svg [data-particle="neutron"]')).toHaveCount(
        16,
      );
      await expect(lab.locator('svg [data-particle="electron"]')).toHaveCount(
        16,
      );
      await compare(lab, "Bütün p+n+e toplamı", "46", "30+16");
      await pick(lab, "Sayım modeli", "transfer");
      await expect(
        lab.getByRole("button", { name: "Kıyasla", exact: true }),
      ).toBeDisabled();
      await setRange(lab, "Alınan elektron sayısı (eksi: verilen)", -3);
      await compare(lab, "Son taneciğin net yükü q", "1", "14−13");
      await expect(lab.locator('svg [data-particle="electron"]')).toHaveCount(
        29,
      );
      await expect(lab.locator("[data-model-result]")).toHaveAttribute(
        "data-conserved",
        "true",
      );
      await pick(lab, "Sayım modeli", "aggregate");
      await pick(lab, "Çok atomlu tanecik", "1");
      await setRange(lab, "Özdeş tanecik adedi", 4);
      await compare(lab, "Bütün örneğin elektron sayısı E", "128", "4×32");
    },
    async (_, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toHaveAttribute("data-mode", "aggregate");
      await expect(r).toHaveAttribute("data-p", "120");
      await expect(r).toHaveAttribute("data-n", "120");
      await expect(r).toHaveAttribute("data-e", "128");
      await expect(r).toHaveAttribute("data-charge", "-8");
      await expect(lab.locator('[data-fill="electrons"]')).toHaveAttribute(
        "width",
        "153.6",
      );
      await expect(r).toContainText("240");
    },
  ),
  forge026Case(
    legacyChemistryLessons,
    "izotop-izoton-izobar",
    "forge026:chemistry:izotop-izoton-izobar",
    async (_, lab) => {
      await pick(lab, "Karşılaştırılan çift", "2");
      await pick(lab, "Çekirdek ilişkisi", "isobar");
      await lab
        .getByRole("textbox", { name: "Gerekçen", exact: true })
        .fill("A");
      await lab.getByRole("button", { name: "Kıyasla", exact: true }).click();
      await expect(lab.locator('.c026-feedback[role="status"]')).toContainText(
        "Modelle uyumlu.",
      );
      await setRange(lab, "V taneciğinin aldığı ek elektron", 1);
      await expect(lab.locator('[data-nuclide="V"]')).toHaveAttribute(
        "data-n",
        "20",
      );
      await expect(lab.locator('[data-fill="right-e"]')).toHaveAttribute(
        "width",
        String((240 * 19) / 36),
      );
      await expect(lab.locator('.c026-feedback[role="status"]')).toHaveCount(0);
      await pick(lab, "Sayım modeli", "mixture");
      await setRange(lab, "Hafif izotopun atom bolluğu (%)", 0);
      await expect(lab.locator('[data-isotope="light"]')).toHaveCount(0);
      await expect(lab.locator("circle[data-mean]")).toHaveAttribute(
        "cx",
        "240",
      );
      await setRange(lab, "Hafif izotopun atom bolluğu (%)", 100);
      await expect(lab.locator('[data-isotope="heavy"]')).toHaveCount(0);
      await expect(lab.locator("circle[data-mean]")).toHaveAttribute(
        "cx",
        "20",
      );
      await setRange(lab, "Hafif izotopun atom bolluğu (%)", 40);
      await compare(
        lab,
        "Ortalama atom kütlesi (u; üç ondalığa yuvarla)",
        "25,184",
        "f",
      );
    },
    async (_, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toHaveAttribute("data-mode", "mixture");
      await expect(r).toHaveAttribute("data-light-pct", "40");
      await expect(r).toHaveAttribute("data-heavy-pct", "60");
      await expect(lab.locator('[data-isotope="light"]')).toHaveCount(40);
      await expect(lab.locator('[data-isotope="heavy"]')).toHaveCount(60);
      expect(Number(await r.getAttribute("data-mean"))).toBeCloseTo(25.1838, 8);
      expect(
        Number(await lab.locator("circle[data-mean]").getAttribute("cx")),
      ).toBeCloseTo(152, 8);
    },
  ),
];
