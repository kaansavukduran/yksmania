import { expect, type Locator } from "@playwright/test";
import { forge015GeographyLessons } from "../../src/learning/forge015Geography";
import { forge015Case, setRange } from "./forge015-case-helper";
async function predict(lab: Locator, answer: string, reason: string) {
  await lab
    .getByRole("combobox", { name: "Sonuç tahminin", exact: true })
    .selectOption(answer);
  await lab
    .getByRole("textbox", { name: "Gerekçen", exact: true })
    .fill(reason.slice(0, 120).padEnd(120, "."));
  await lab.getByRole("button", { name: "Tahmini dene", exact: true }).click();
  await expect(lab.locator("[data-prediction-feedback]")).toContainText(
    "Seçimin kanıtla uyumlu.",
  );
}
export const geography015Cases = [
  forge015Case(
    forge015GeographyLessons,
    "buyuk-iklim-tipleri",
    "forge015-geo-buyuk-iklim-tipleri",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "İklim örneği", exact: true })
        .selectOption("savanna");
      await lab
        .getByRole("combobox", { name: "Mevsim takvimi", exact: true })
        .selectOption("south");
      await lab
        .getByRole("combobox", { name: "Ayı incele", exact: true })
        .selectOption("0");
      await lab.getByText("Veriyi aç", { exact: true }).click();
      await expect(lab.getByRole("definition")).toHaveCount(12);
      await predict(
        lab,
        "summer",
        "Yağışın üç aylık yaz toplamı kıştan daha büyük.",
      );
    },
    async (_page, lab) => {
      const result = lab.locator("[data-model-result]");
      await expect(result).toContainText("Savan · Ocak");
      await expect(result).toContainText("26 °C · 250 mm");
      await expect(result).toContainText("1.083 mm");
      await expect(result).toContainText("Yaz toplamı: 670 mm");
    },
  ),
  forge015Case(
    forge015GeographyLessons,
    "turkiye-iklimi",
    "forge015-geo-turkiye-iklimi",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "Bölge örneği", exact: true })
        .selectOption("central");
      await lab
        .getByRole("combobox", { name: "Dağ düzeni", exact: true })
        .selectOption("corridor");
      await lab
        .getByRole("combobox", { name: "Yamaç bakısı", exact: true })
        .selectOption("north");
      const height = lab.getByRole("spinbutton", {
        name: "İdeal yükseklik (m), sayıyla",
        exact: true,
      });
      await height.fill("");
      await height.pressSequentially("1800");
      await expect(height).toHaveValue("1800");
      await height.press("Enter");
      await expect(lab.locator("[data-model-result]")).toContainText(
        "20 − 9 = 11 °C",
      );
      await setRange(lab, "İdeal yükseklik (m)", 1400);
      await setRange(lab, "İdeal yükseklik (m)", 1800);
      await lab.getByText("Aylık veriyi aç", { exact: true }).click();
      await expect(lab.getByRole("definition")).toHaveCount(12);
      await predict(
        lab,
        "cooler",
        "Aynı ideal sütunda 1800 metre için dokuz derece azalma var.",
      );
    },
    async (_page, lab) => {
      const result = lab.locator("[data-model-result]");
      await expect(result).toContainText("Temsili iç havza");
      await expect(result).toContainText("368 mm");
      await expect(result).toContainText("20 − 9 = 11 °C");
      await expect(result).toContainText("Kuzey bakı");
      await expect(result).toContainText("Kıyıya açılan koridor");
    },
  ),
  forge015Case(
    forge015GeographyLessons,
    "dunyanin-tektonik-olusumu",
    "forge015-geo-dunyanin-tektonik-olusumu",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "Katmanı incele", exact: true })
        .selectOption("2");
      await lab
        .getByRole("combobox", { name: "Levha hareketi", exact: true })
        .selectOption("transform");
      await expect(lab.locator("[data-model-result]")).toContainText(
        "yeni kabuk üretimi zorunlu değil",
      );
      await lab
        .getByRole("combobox", { name: "Levha hareketi", exact: true })
        .selectOption("collision");
      await expect(lab.locator("[data-model-result]")).toContainText(
        "kabuk kalınlaşması",
      );
      await lab
        .getByRole("combobox", { name: "Levha hareketi", exact: true })
        .selectOption("subduction");
      await setRange(lab, "Sırta uzaklık (km)", 200);
      await setRange(lab, "Yarı hız (cm/yıl)", 4);
      await predict(
        lab,
        "not-required",
        "Yakınlaşma seçili; sırt yaşı deneyi ayrı ve yeni kabuk bu sınırda zorunlu değil.",
      );
    },
    async (_page, lab) => {
      const result = lab.locator("[data-model-result]");
      await expect(result).toContainText("Manto");
      await expect(
        lab.locator('[data-layer-concept="1"] rect'),
      ).toHaveAttribute("x", "245");
      await expect(
        lab.locator('[data-layer-concept="2"] rect'),
      ).toHaveAttribute("x", "25");
      await expect(result).toContainText("Büyük ölçüde katı");
      await expect(result).toContainText("Okyanus / kıta yakınlaşması");
      await expect(result).toContainText("5 milyon yıl");
      await expect(result).toContainText("8 cm/yıl");
      for (let band = 0; band < 4; band++) {
        const pair = lab.locator(`[data-age-band="${band}"] rect`);
        await expect(pair).toHaveCount(2);
        const fills = await pair.evaluateAll((nodes) =>
          nodes.map((n) => ({
            fill: getComputedStyle(n).fill,
            opacity: getComputedStyle(n).fillOpacity,
          })),
        );
        expect(fills[0]).toEqual(fills[1]);
      }
    },
  ),
  forge015Case(
    forge015GeographyLessons,
    "ic-kuvvetler",
    "forge015-geo-ic-kuvvetler",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "Süreci seç", exact: true })
        .selectOption("isostasy");
      await setRange(lab, "Buz kalınlığı (m)", 0);
      await expect(lab.locator("[data-model-result]")).toContainText(
        "0 m aşağı",
      );
      await setRange(lab, "Buz kalınlığı (m)", 1100);
      await expect(lab.locator("[data-model-result]")).toContainText(
        "300 m aşağı",
      );
      await lab
        .getByRole("combobox", { name: "Süreci seç", exact: true })
        .selectOption("volcano");
      await lab
        .getByRole("checkbox", {
          name: "Magma yüzeye çıkmadan sokulsun",
          exact: true,
        })
        .check();
      await expect(lab.locator("[data-model-result]")).toContainText(
        "İç volkanizma",
      );
      await lab
        .getByRole("combobox", { name: "Süreci seç", exact: true })
        .selectOption("block");
      await setRange(lab, "Şekil değişimi (göreli)", 60);
      await expect(lab.locator("[data-model-result]")).toContainText("graben");
      await lab
        .getByRole("combobox", { name: "Süreci seç", exact: true })
        .selectOption("earthquake");
      await setRange(lab, "Odak derinliği (km)", 25);
      await lab
        .getByRole("checkbox", { name: "Deprem deniz altında", exact: true })
        .check();
      await lab
        .getByRole("checkbox", {
          name: "Önemli düşey taban hareketi verilmiş",
          exact: true,
        })
        .check();
      await predict(
        lab,
        "focus",
        "Odak derinde, dış merkez yüzeyde dik izdüşüm; tsunami zorunlu değildir.",
      );
    },
    async (_page, lab) => {
      const result = lab.locator("[data-model-result]");
      await expect(result).toContainText("25 km derindedir");
      await expect(result).toContainText(
        "Deniz tabanında düşey yer değiştirmesi verilmiş",
      );
      await expect(result).toContainText("dalga yüksekliği zorunlu değildir");
    },
  ),
];
