import { expect, type Locator } from "@playwright/test";
import { forge012MathLessons } from "../../src/learning/forge012Math";
import { forge012Case, setRange } from "./forge012-case-helper";
async function predict(lab: Locator, guess: string, reason: string) {
  await lab
    .getByRole("combobox", { name: "Sonuç tahminin", exact: true })
    .selectOption(guess);
  await lab
    .getByRole("textbox", { name: "Modelden gerekçen", exact: true })
    .fill(reason);
  await lab
    .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
    .tap();
}
const ready = async (lab: Locator) =>
  expect(lab.locator(".f012m-feedback")).toContainText(
    "Tahminin bu koşullarla uyumlu.",
  );
export const math012Cases = [
  forge012Case(
    forge012MathLessons,
    "faiz-problemleri",
    "forge012-math-interest",
    async (_p, l) => {
      await l
        .getByRole("combobox", { name: "Faiz kuralı", exact: true })
        .selectOption("compound");
      await predict(
        l,
        "greater",
        "İlk yılın 500 TL faizi ikinci yılda yeniden faizlenir; son tutar 6050 TL olur.",
      );
    },
    async (_p, l) => {
      await expect(l.locator("[data-model-result]")).toContainText("6.050 TL");
      await expect(l.locator("[data-interest-point]")).toHaveCount(1);
      await expect(l.locator("[data-interest-axes]")).toContainText(
        "Yatay eksen: zaman (ay)",
      );
      await expect(l.locator("[data-interest-axes]")).toContainText(
        "Düşey eksen: son tutar (TL)",
      );
      await expect(l.locator("[data-interest-axes]")).toContainText(
        "24 ay, 6.050 TL",
      );
      await expect(l.locator("[data-interest-time-tick]")).toHaveCount(6);
      await expect(l.locator("[data-interest-money-tick]")).toHaveCount(3);
      await expect(l.locator('[data-curve="compound"]')).toHaveAttribute(
        "d",
        /^M/,
      );
      await ready(l);
    },
  ),
  forge012Case(
    forge012MathLessons,
    "karisim-problemleri",
    "forge012-math-mixture",
    async (_p, l) => {
      await l
        .getByRole("combobox", { name: "Yapılan işlem", exact: true })
        .selectOption("solute");
      await predict(
        l,
        "up",
        "Başlangıçtaki 40 g tuza 50 g tuz eklenir; 90/250 yüzde 36 eder.",
      );
    },
    async (_p, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "Son tuz yüzdesi: %36",
      );
      await expect(
        l.locator('[data-mixture-stage="1"] [data-solute]'),
      ).toHaveAttribute("width", "151.2");
      await expect(l.locator("[data-mixture-key]")).toContainText(
        "Başlangıç · üst çubuk",
      );
      await expect(l.locator("[data-mixture-key]")).toContainText(
        "İşlem sonrası · alt çubuk",
      );
      await expect(l.locator("[data-mixture-key]")).toContainText(
        "250 g: 90 g tuz + 160 g su.",
      );
      await ready(l);
    },
  ),
  forge012Case(
    forge012MathLessons,
    "isci-problemleri",
    "forge012-math-workers",
    async (_p, l) => {
      await l
        .getByRole("combobox", { name: "İkinci evrede çalışan", exact: true })
        .selectOption("both");
      await predict(
        l,
        "more",
        "İlk 2 saatte 5/18 iş yapılır; kalan 13/18 için iki çalışan birlikte devam eder.",
      );
    },
    async (_p, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "Toplam süre: 7,2 saat",
      );
      expect(
        Number(await l.locator("[data-worker-final-b]").getAttribute("width")),
      ).toBeCloseTo(172, 10);
      await expect(l.locator("[data-worker-key]")).toContainText(
        "A çalışanı: koral bölüm",
      );
      await expect(l.locator("[data-worker-key]")).toContainText(
        "B çalışanı: kesikli mint bölüm",
      );
      await expect(l.locator("[data-worker-key]")).toContainText(
        "Tam bitişte: A %60, B %40.",
      );
      await ready(l);
    },
  ),
  forge012Case(
    forge012MathLessons,
    "havuz-problemleri",
    "forge012-math-pool",
    async (_p, l) => {
      await setRange(l, "Geçen süre (dakika)", 40);
      await predict(
        l,
        "fills",
        "Başlangıç 200 litreye 40 dakika boyunca net 15 litre eklenince 800 litreye ulaşılır.",
      );
    },
    async (_p, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "40. dakika: 800 L · %100",
      );
      await expect(l.locator("[data-water-level]")).toHaveAttribute(
        "height",
        "176",
      );
      await ready(l);
    },
  ),
  forge012Case(
    forge012MathLessons,
    "hiz-problemleri",
    "forge012-math-motion",
    async (_p, l) => {
      await l
        .getByRole("combobox", { name: "B’nin yönü", exact: true })
        .selectOption("toward");
      await predict(
        l,
        "meet",
        "İki araç 120 km aralığı 60+40=100 km/sa ile kapatır; 1,2 saatte karşılaşır.",
      );
    },
    async (_p, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "1,2 saat sonra",
      );
      await expect(l.locator("[data-model-result]")).toContainText(
        "B konumu 80 km",
      );
      await expect(l.locator("[data-motion-a]")).toHaveAttribute("cx", "250");
      await expect(l.locator("[data-motion-b]")).toHaveAttribute("x", /^312/);
      await expect(l.locator("[data-motion-axis]")).toContainText(
        "Yatay eksen: konum (km)",
      );
      await expect(l.locator("[data-motion-axis]")).toContainText(
        "0 · 60 · 120",
      );
      await expect(l.locator("[data-motion-axis]")).toContainText(
        "A: koral daire · 60 km",
      );
      await expect(l.locator("[data-motion-axis]")).toContainText(
        "B: mint kare · 80 km",
      );
      await expect(l.locator("[data-motion-tick]")).toHaveCount(3);
      await ready(l);
    },
  ),
];
