import { expect, type Locator } from "@playwright/test";
import { forge014GeographyLessons } from "../../src/learning/forge014Geography";
import { forge014Case, setRange } from "./forge014-case-helper";
async function predict(lab: Locator, answer: string) {
  await lab
    .getByRole("combobox", { name: "Sonuç tahminin", exact: true })
    .selectOption(answer);
  await lab
    .getByRole("textbox", { name: "Gerekçen", exact: true })
    .fill(
      "Verilen koşul ile sonucu ve korunan miktarı birlikte karşılaştırıyorum.",
    );
  await lab.getByRole("button", { name: "Tahmini dene", exact: true }).tap();
  await expect(lab.locator("[data-prediction-feedback]")).toContainText(
    "Seçimin kanıtla uyumlu.",
  );
}
async function periodContrast(lab: Locator) {
  const ratios = await lab.locator(".g014-number").evaluateAll((nodes) => {
    const rgb = (color: string) => {
      const m = color.match(/[\d.]+/g);
      if (!m || m.length < 3) throw new Error("Missing computed color");
      return m.slice(0, 3).map(Number);
    };
    const luminance = (color: string) =>
      rgb(color)
        .map((c) => {
          const n = c / 255;
          return n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4;
        })
        .reduce((sum, n, i) => sum + n * [0.2126, 0.7152, 0.0722][i], 0);
    return nodes.map((node) => {
      const circle = node.parentElement!.querySelector("circle")!,
        a = luminance(getComputedStyle(node).fill),
        b = luminance(getComputedStyle(circle).fill);
      return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    });
  });
  expect(ratios).toHaveLength(4);
  for (const ratio of ratios) expect(ratio).toBeGreaterThanOrEqual(4.5);
}
const entry = (
  id: string,
  interact: Parameters<typeof forge014Case>[3],
  outcome: Parameters<typeof forge014Case>[4],
) =>
  forge014Case(
    forge014GeographyLessons,
    id,
    `forge014-geo-${id}`,
    interact,
    outcome,
  );
export const geography014Cases = [
  entry(
    "doga-insan-cografya",
    async (_p, lab) => {
      await lab
        .getByRole("combobox", { name: "Araştırma odağı", exact: true })
        .selectOption("1");
      await lab
        .getByRole("checkbox", { name: "İnsan katmanını göster", exact: true })
        .uncheck();
      await expect(lab.locator("[data-human-layer]")).toHaveCount(0);
      await lab
        .getByRole("checkbox", { name: "İnsan katmanını göster", exact: true })
        .check();
      await predict(lab, "1");
    },
    async (_p, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Nüfus coğrafyası",
      );
      await expect(lab.locator("[data-focus-link]")).toHaveAttribute(
        "data-focus-link",
        "village",
      );
      await expect(lab.locator("[data-human-layer]")).toHaveCount(1);
    },
  ),
  entry(
    "cografyanin-tarihi-gelisimi",
    async (_p, lab) => {
      await lab
        .getByRole("combobox", { name: "Dönem", exact: true })
        .selectOption("2");
      await periodContrast(lab);
      await lab.getByRole("button", { name: "Kanıtı aç", exact: true }).tap();
      await predict(lab, "2");
      await lab.locator("summary").filter({ hasText: "Katkıları aç" }).tap();
      await lab
        .getByRole("combobox", { name: "Kişi kartı", exact: true })
        .selectOption("1");
    },
    async (_p, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Pirî Reis",
      );
      await expect(lab.locator("[data-history-evidence]")).toContainText(
        "seyir haritasına",
      );
      await expect(lab.locator('[data-geo-period="2"]')).toHaveAttribute(
        "r",
        "23",
      );
      await expect(lab.locator("[data-contribution-result]")).toContainText(
        "Cihannümâ",
      );
      await expect(lab.locator("[data-contribution-mark]")).toHaveAttribute(
        "data-contribution-mark",
        "compile",
      );
    },
  ),
  entry(
    "yerel-saat",
    async (_p, lab) => {
      await setRange(lab, "Hedef boylamı (°)", -30);
      await setRange(lab, "Başlangıç saat", 0);
      await setRange(lab, "Başlangıç dakika", 20);
      await predict(lab, "behind");
      await lab
        .getByRole("combobox", { name: "Saat hesabı", exact: true })
        .selectOption("civil");
      await lab
        .getByRole("spinbutton", {
          name: "Başlangıç saat, sayıyla",
          exact: true,
        })
        .fill("22");
      await lab
        .getByRole("spinbutton", {
          name: "Başlangıç dakika, sayıyla",
          exact: true,
        })
        .fill("30");
      await lab
        .getByRole("spinbutton", {
          name: "Kaynak UTC farkı (dk), sayıyla",
          exact: true,
        })
        .fill("240");
      await lab
        .getByRole("spinbutton", {
          name: "Hedef UTC farkı (dk), sayıyla",
          exact: true,
        })
        .fill("-300");
      await lab
        .getByRole("spinbutton", {
          name: "Geçen süre (dk), sayıyla",
          exact: true,
        })
        .fill("480");
      await predict(lab, "same");
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Aynı gün 21.30",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "480 dakika gerçek süre",
      );
      await expect(lab.locator("[data-utc-ledger]")).toHaveCount(1);
      await lab
        .getByRole("combobox", { name: "Saat hesabı", exact: true })
        .selectOption("solar");
      await setRange(lab, "Başlangıç saat", 0);
      await setRange(lab, "Başlangıç dakika", 20);
      await predict(lab, "behind");
    },
    async (_p, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Önceki gün 20.20",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "-240 dakika",
      );
      await expect(lab.locator("[data-target-longitude]")).toHaveAttribute(
        "cx",
        "170",
      );
    },
  ),
  entry(
    "atmosfer-katmanlari",
    async (_p, lab) => {
      await setRange(lab, "Su buharı (hacim %)", 2);
      await predict(lab, "1");
    },
    async (_p, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Stratosfer",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "azot %76,44",
      );
      await expect(lab.locator('[data-atmosphere-layer="1"]')).toHaveClass(
        "g014-layer-selected",
      );
      await expect(lab.locator("[data-temperature-axis]")).toContainText(
        "T (°C)",
      );
    },
  ),
  entry(
    "cografya-sicaklik",
    async (_p, lab) => {
      const elevation = lab.getByRole("spinbutton", {
        name: "İstasyon yüksekliği (m), sayıyla",
        exact: true,
      });
      await elevation.fill("");
      await elevation.pressSequentially("1800");
      await expect(elevation).toHaveValue("1800");
      await elevation.press("Enter");
      await expect(
        lab.getByRole("slider", {
          name: "İstasyon yüksekliği (m)",
          exact: true,
        }),
      ).toHaveValue("1800");
      await setRange(lab, "İstasyon yüksekliği (m)", 1000);
      await setRange(lab, "Ölçülen sıcaklık (°C)", 15);
      await predict(lab, "higher");
      await lab
        .getByRole("checkbox", { name: "Normal yaklaşım geçerli", exact: true })
        .uncheck();
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Ek profil gerekli",
      );
      await expect(lab.locator("[data-prediction-feedback]")).toHaveCount(0);
      await lab
        .getByRole("checkbox", { name: "Normal yaklaşım geçerli", exact: true })
        .check();
      await predict(lab, "higher");
    },
    async (_p, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "İndirgenmiş: 20°C",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Gerçek ölçüm: 15°C",
      );
      await expect(lab.locator("[data-temperature-station]")).toHaveAttribute(
        "cy",
        "185",
      );
    },
  ),
  entry(
    "basinc-ruzgarlar",
    async (_p, lab) => {
      await setRange(lab, "Uzaklık (km)", 200);
      await lab
        .getByRole("combobox", { name: "Yarımküre", exact: true })
        .selectOption("south");
      await predict(lab, "a-b");
    },
    async (_p, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Gradyan: 0,1 hPa/km",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Güneyde hareketin soluna",
      );
      await expect(lab.locator("[data-wind-arrow]")).toHaveAttribute(
        "data-direction",
        "right",
      );
      await expect(
        lab.locator("[data-wind-arrow] path").first(),
      ).toHaveAttribute("d", "M92 150Q200 85 308 150");
    },
  ),
  entry(
    "nem-yagis",
    async (_p, lab) => {
      await setRange(lab, "Doyma miktarı (g/m³)", 8);
      await lab
        .getByRole("combobox", { name: "Yükselme nedeni", exact: true })
        .selectOption("2");
      await predict(lab, "condensed");
    },
    async (_p, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Bağıl nem: %100",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Buhar: 8 g/m³; yoğuşmuş su: 2 g/m³",
      );
      await expect(lab.locator("[data-condensed-water]")).toHaveAttribute(
        "height",
        "24",
      );
      await expect(lab.locator("[data-rain-rise]")).toHaveAttribute(
        "data-rain-rise",
        "2",
      );
    },
  ),
];
