import { expect } from "@playwright/test";
import { forge015MathLessons } from "../../src/learning/forge015Math";
import { forge015Case, setRange } from "./forge015-case-helper";

export const math015Cases = [
  forge015Case(
    forge015MathLessons,
    "veri-analizi",
    "forge015-math-statistics",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "Çalışma modeli", exact: true })
        .selectOption("groups");
      await setRange(lab, "A grubu kişi sayısı", 4);
      await setRange(lab, "A grubu ortalaması (puan)", 50);
      await setRange(lab, "B grubu kişi sayısı", 8);
      await setRange(lab, "B grubu ortalaması (puan)", 80);
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Ağırlıklı ortalama: 70 puan",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Düz ortalama: 65 puan",
      );
      await expect(lab.locator("[data-group-weighted]")).toHaveAttribute(
        "cx",
        "392",
      );
      await lab
        .getByRole("combobox", { name: "Çalışma modeli", exact: true })
        .selectOption("histogram");
      await expect(lab.locator('[data-stat-bin="0"]')).toHaveAttribute(
        "data-density",
        "0.4",
      );
      expect(
        Number(await lab.locator('[data-stat-bin="1"]').getAttribute("width")),
      ).toBeCloseTo(460 / 3);
      await lab
        .getByRole("combobox", { name: "Yüksekliğin anlamı", exact: true })
        .selectOption("frequency");
      await expect(lab.locator('[data-stat-bin="1"]')).toHaveAttribute(
        "height",
        "200",
      );
      await lab
        .getByRole("combobox", { name: "Yüksekliğin anlamı", exact: true })
        .selectOption("density");
      await lab
        .getByRole("combobox", { name: "Çalışma modeli", exact: true })
        .selectOption("data");
      await lab
        .getByRole("button", { name: "Veriyi temizle", exact: true })
        .click();
      await expect(lab.locator("[data-stat-point]")).toHaveCount(0);
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Ortalama: tanımsız",
      );
      await lab
        .getByRole("textbox", { name: "Ham gözlemler", exact: true })
        .fill("1;1,01");
      const dots = await lab.locator("[data-stat-point]").evaluateAll((nodes) =>
        nodes.map((n) => ({
          x: Number(n.getAttribute("cx")),
          y: Number(n.getAttribute("cy")),
        })),
      );
      expect(
        Math.hypot(dots[0].x - dots[1].x, dots[0].y - dots[1].y),
      ).toBeGreaterThanOrEqual(14);
      await lab
        .getByRole("textbox", { name: "Ham gözlemler", exact: true })
        .fill("1;3;3;13");
      await lab
        .getByRole("combobox", { name: "Sonuç tahminin", exact: true })
        .selectOption("less");
      const reason = lab.getByRole("textbox", {
        name: "Modelden gerekçen",
        exact: true,
      });
      await expect(reason).toHaveAttribute("maxlength", "120");
      await reason.fill(
        "Toplam 20 ve adet 4 olduğundan ortalama 5; sıralı iki orta 3 olduğu için ortanca 3 kalır.",
      );
      await lab
        .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
        .click();
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Gözlem sayısı: 4 · Toplam: 20",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Ortalama: 5 · Ortanca: 3 · Açıklık: 12",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Mod (OGM okul tanımı): 3",
      );
      await expect(lab.locator("[data-stat-sorted]")).toContainText(
        "1; 3; 3; 13",
      );
      await expect(lab.locator("[data-stat-point]")).toHaveCount(4);
      await expect(lab.locator("[data-stat-mean]")).toHaveAttribute(
        "data-value",
        "5",
      );
      await expect(lab.locator("[data-stat-median]")).toHaveAttribute(
        "data-value",
        "3",
      );
      const meanPath = await lab.locator("[data-stat-mean]").getAttribute("d");
      expect(Number(meanPath!.match(/^M([^ ]+)/)![1])).toBeCloseTo(
        70 + (460 * 5) / 14,
      );
      await expect(lab.locator(".stat015-feedback")).toContainText(
        "Tahminin bu koşullarla uyumlu.",
      );
    },
  ),
];
