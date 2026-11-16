import { expect } from "@playwright/test";
import { forge021BiologyBLessons } from "../../src/learning/forge021BiologyB";
import { forge021Case, setRange } from "./forge021-case-helper";

export const biologyB021Cases = [
  forge021Case(
    forge021BiologyBLessons,
    "fotosentez-hiz-faktorleri",
    "forge021-bio-b-photo",
    async (_page, lab) => {
      await setRange(lab, "Işık kapasitesi", 8);
      await lab.getByLabel("Tahminin", { exact: true }).selectOption("in");
      await lab
        .getByLabel("Gerekçen", { exact: true })
        .fill("Brüt8, solunum10; net−2 olduğundan O₂ içeri alınır.");
      await lab
        .getByRole("button", { name: "Kanıtla kıyasla", exact: true })
        .click();
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Brüt hız: 8",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "net O₂: -2",
      );
      await expect(lab.locator('.bio021b-feedback[role="status"]')).toContainText(
        "Seçimin kanıtla uyumlu.",
      );
      expect(
        Number(
          await lab
            .locator('[data-bio021-capacity="light"]')
            .getAttribute("width"),
        ),
      ).toBeCloseTo(14.4);
      await expect(lab.locator("[data-bio021-net]")).toHaveAttribute("x", "114");
      await expect(lab.locator("[data-bio021-net]")).toHaveAttribute(
        "width",
        "6",
      );
      await expect(lab.locator("[data-bio021-net-point]")).toHaveAttribute(
        "cx",
        "114",
      );
    },
  ),
  forge021Case(
    forge021BiologyBLessons,
    "kemosentez-enerji-karbon",
    "forge021-bio-b-nitrification",
    async (_page, lab) => {
      await setRange(lab, "Birinci adım / mol N", 5);
      await setRange(lab, "İkinci adım / mol N", 4);
      await lab.getByLabel("Tahminin", { exact: true }).selectOption("uses");
      await lab
        .getByLabel("Gerekçen", { exact: true })
        .fill("İlk adım7,5 ve ikinci2 mol O₂ tüketir; toplam9,5.");
      await lab
        .getByRole("button", { name: "Kanıtla kıyasla", exact: true })
        .click();
    },
    async (_page, lab) => {
      const result = lab.locator("[data-model-result]");
      await expect(result).toContainText(
        "Amonyum: 0; nitrit: 1; nitrat: 4 mol N",
      );
      await expect(result).toContainText("Toplam azot: 5 mol N");
      await expect(result).toContainText("O₂ gereksinimi: 9,5 mol");
      await expect(
        lab.locator('[data-bio021-n-stock="ammonium"]'),
      ).toHaveAttribute("height", "0");
      await expect(
        lab.locator('[data-bio021-n-stock="nitrite"]'),
      ).toHaveAttribute("height", "4");
      await expect(
        lab.locator('[data-bio021-n-stock="nitrate"]'),
      ).toHaveAttribute("height", "16");
      expect(
        Number(
          await lab.locator("[data-bio021-o2-demand]").getAttribute("width"),
        ),
      ).toBeCloseTo(66.5);
      await expect(lab.locator('.bio021b-feedback[role="status"]')).toContainText(
        "Seçimin kanıtla uyumlu.",
      );
    },
  ),
  forge021Case(
    forge021BiologyBLessons,
    "solunum-oksijenli-bilanco",
    "forge021-bio-b-aerobic",
    async (_page, lab) => {
      await setRange(lab, "Glikoz miktarı / mol", 2);
      await lab.getByLabel("Evre", { exact: true }).selectOption("ets");
      await lab
        .getByLabel("Elektron mekiği", { exact: true })
        .selectOption("glycerol");
      await lab.getByLabel("Tahminin", { exact: true }).selectOption("30");
      await lab
        .getByLabel("Gerekçen", { exact: true })
        .fill("Glikoz başına26 oksidatif+4 substrat=30; iki glikoz60.");
      await lab
        .getByRole("button", { name: "Kanıtla kıyasla", exact: true })
        .click();
    },
    async (_page, lab) => {
      const result = lab.locator("[data-model-result]");
      await expect(result).toContainText(
        "Oksidatif kazanç: 52 mol ATP eşdeğeri",
      );
      await expect(result).toContainText("tam yol: 60 mol ATP eşdeğeri");
      await expect(result).toContainText("12 mol O₂ kullanımı");
      await expect(lab.locator('[data-bio021-ledger="co2"]')).toHaveAttribute(
        "width",
        "36",
      );
      await expect(lab.locator('[data-bio021-ledger="nadh"]')).toHaveAttribute(
        "width",
        "60",
      );
      await expect(
        lab.locator('[data-bio021-ledger="substrate"]'),
      ).toHaveAttribute("width", "24");
      await expect(lab.locator("[data-bio021-proton-return]")).toHaveAttribute(
        "d",
        "M253 74V230 L244 217 M253 230L262 217",
      );
      await expect(lab.locator("[data-bio021-proton-return]")).toHaveClass(
        "bio021b-flow",
      );
      await expect(lab.locator('.bio021b-feedback[role="status"]')).toContainText(
        "Seçimin kanıtla uyumlu.",
      );
    },
  ),
  forge021Case(
    forge021BiologyBLessons,
    "solunum-oksijensiz-alicilar",
    "forge021-bio-b-anaerobic",
    async (_page, lab) => {
      await setRange(lab, "Elektron / mol e⁻", 16);
      await lab
        .getByLabel("Alıcı ve ürün", { exact: true })
        .selectOption("sulfate");
      await lab
        .getByLabel("Tahminin", { exact: true })
        .selectOption("electrons");
      await lab
        .getByLabel("Gerekçen", { exact: true })
        .fill("16/8=2 mol işlenir;3 mol alıcının1 molü kalır.");
      await lab
        .getByRole("button", { name: "Kanıtla kıyasla", exact: true })
        .click();
    },
    async (_page, lab) => {
      const result = lab.locator("[data-model-result]");
      await expect(result).toContainText(
        "İşlenen alıcı: 2 mol. Kalan alıcı: 1 mol",
      );
      await expect(result).toContainText("kalan elektron: 0 mol e⁻");
      await expect(result).toContainText("Ürün: 2 mol H₂S / HS⁻");
      await expect(lab.locator("[data-bio021-product-bar]")).toHaveAttribute(
        "width",
        "46",
      );
      await expect(lab.locator("[data-bio021-electron-route]")).toHaveClass(
        "bio021b-flow",
      );
      await expect(lab.locator('.bio021b-feedback[role="status"]')).toContainText(
        "Seçimin kanıtla uyumlu.",
      );
    },
  ),
];
