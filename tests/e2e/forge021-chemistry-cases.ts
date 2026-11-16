import { expect, type Locator } from "@playwright/test";
import { forge021ChemistryLessons as lessons } from "../../src/learning/forge021Chemistry";
import { forge021Case, setRange } from "./forge021-case-helper";
async function compare(lab: Locator, prediction: string, reason: string) {
  await lab.getByLabel("Tahminin", { exact: true }).selectOption(prediction);
  await lab
    .getByLabel("Gerekçen", { exact: true })
    .fill(reason.padEnd(120, "."));
  await lab
    .getByRole("button", { name: "Tahmini kıyasla", exact: true })
    .click();
  await expect(lab.locator(".c021-evidence > p[role=status]")).toContainText(
    "Tahminin modelle uyumlu.",
  );
}
export const chemistry021Cases = [
  forge021Case(
    lessons,
    "cozunurluk-faktorleri",
    "forge021-chemistry-cozunurluk-faktorleri",
    async (_, lab) => {
      await lab.getByLabel("Sıcaklık", { exact: true }).selectOption("40");
      await lab
        .getByLabel("Çözünme ısısı", { exact: true })
        .selectOption("exo");
      await expect(lab.locator("[data-model-result]")).toContainText("0,0001");
      await lab
        .getByLabel("Çözünme ısısı", { exact: true })
        .selectOption("endo");
      await lab.getByLabel("Sıcaklık", { exact: true }).selectOption("25");
      await setRange(lab, "Ortak M⁺ (mol/L)", 0.03);
      const input = lab.getByRole("textbox", {
        name: "Tuz stoku (mol), sayıyla",
        exact: true,
      });
      await input.focus();
      await input.press("ControlOrMeta+A");
      await input.press("Backspace");
      await input.pressSequentially("0,04");
      await expect(input).toHaveValue("0,04");
      await input.press("Enter");
      await compare(
        lab,
        "solid",
        "Ortak M⁺ ile s=0,01 mol/L; stok0,04 mol olduğundan0,03 mol katı kalır.",
      );
    },
    async (_, lab) => {
      const result = lab.locator("[data-model-result]");
      expect(Number(await result.getAttribute("data-saturation"))).toBeCloseTo(
        0.01,
        12,
      );
      expect(Number(await result.getAttribute("data-solid"))).toBeCloseTo(
        0.03,
        12,
      );
      expect(Number(await result.getAttribute("data-dissolved"))).toBeCloseTo(
        0.01,
        12,
      );
      expect(Number(await result.getAttribute("data-quotient"))).toBeCloseTo(
        0.0004,
        12,
      );
      await expect(result).toContainText("Katı kalır");
      await expect(
        lab.getByRole("textbox", {
          name: "Tuz stoku (mol), sayıyla",
          exact: true,
        }),
      ).toHaveValue("0,04");
    },
  ),
  forge021Case(
    lessons,
    "redoks-denklestirme",
    "forge021-chemistry-redoks-denklestirme",
    async (_, lab) => {
      await lab
        .getByLabel("Yarı tepkime çifti", { exact: true })
        .selectOption("mnBase");
      await setRange(lab, "Elektron alan yarının çarpanı", 2);
      await setRange(lab, "Elektron veren yarının çarpanı", 3);
      await lab.locator("summary").click();
      await expect(lab).toContainText("MnO₄⁻");
      await compare(
        lab,
        "minimum",
        "İki Mn yarısı6 elektron alır; üç sülfit yarısı6 elektron verir, su ve OH⁻ sadeleşir.",
      );
    },
    async (_, lab) => {
      const result = lab.locator("[data-model-result]");
      await expect(result).toHaveAttribute("data-received", "6");
      await expect(result).toHaveAttribute("data-given", "6");
      await expect(result).toHaveAttribute("data-minimal", "true");
      await expect(result).toContainText("en küçük oran bulundu");
      await expect(result).toContainText("18 / 18");
      await expect(result).toContainText("2 OH⁻");
    },
  ),
  forge021Case(
    lessons,
    "metalik-aktiflik",
    "forge021-chemistry-metalik-aktiflik",
    async (_, lab) => {
      await lab
        .getByLabel("Elektron veren metal", { exact: true })
        .selectOption("Ag");
      await lab
        .getByLabel("Elektron alan iyon", { exact: true })
        .selectOption("Zn");
      await expect(lab.locator("[data-model-result]")).toHaveAttribute(
        "data-potential-mv",
        "-1562",
      );
      await lab
        .getByLabel("Elektron veren metal", { exact: true })
        .selectOption("Cr");
      await lab
        .getByLabel("Elektron alan iyon", { exact: true })
        .selectOption("Pb");
      await compare(
        lab,
        "forward",
        "Pb²⁺ indirgenmesi ile Cr yükseltgenmesi eşleşir;6 elektron ve+0,618 V standart fark bulunur.",
      );
    },
    async (_, lab) => {
      const result = lab.locator("[data-model-result]");
      await expect(result).toHaveAttribute("data-potential-mv", "618");
      await expect(result).toHaveAttribute("data-electrons", "6");
      await expect(result).toContainText("0,618 V");
      await expect(result).toContainText("2 Cr");
      await expect(result).toContainText("3 Pb²⁺");
    },
  ),
];
