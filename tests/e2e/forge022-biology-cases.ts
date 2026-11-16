import { expect, type Locator } from "@playwright/test";
import { forge022Case, setRange } from "./forge022-case-helper";
import { forge022BiologyLessons } from "../../src/learning/forge022Biology";
const key022 = (id: string) => `forge022:biology:${id}`;
async function compare022(lab: Locator, answer: string, reason: string) {
  await lab.getByRole("button", { name: answer, exact: true }).click();
  await lab
    .getByLabel("Gerekçen (en çok 120 karakter)", { exact: true })
    .fill(reason);
  await lab.getByRole("button", { name: "Tahmini sına", exact: true }).click();
  await expect(lab.locator('.b022-feedback[role="status"]')).toContainText(
    "Seçimin modelle uyumlu.",
  );
}
export const biology022Cases = [
  forge022Case(
    forge022BiologyLessons,
    "ayt-fermantasyon",
    key022("ayt-fermantasyon"),
    async (_, lab) => {
      await setRange(lab, "İşlenen (mol)", 2);
      await lab.getByRole("button", { name: "Etanol", exact: true }).click();
      await compare022(
        lab,
        "CO₂ oluşur",
        "2 glikoz, 4 etanol ve 4 CO₂ verir; 8 ürün ve 4 gaz karbonu toplam 12 mol C'dir.",
      );
    },
    async (_, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "brüt 8 mol; net 4 mol",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Kalan glikoz: 3 mol",
      );
      await expect(lab.locator("[data-net-atp]")).toHaveAttribute(
        "data-net-atp",
        "4",
      );
      await expect(lab.locator("[data-co2]")).toHaveAttribute("data-co2", "4");
      await expect(lab.locator("[data-product-carbon]")).toHaveAttribute(
        "data-product-carbon",
        "8",
      );
    },
  ),
  forge022Case(
    forge022BiologyLessons,
    "ayt-fotosentez-solunum",
    key022("ayt-fotosentez-solunum"),
    async (_, lab) => {
      await setRange(lab, "Brüt alım (µmol/saat)", 10);
      await setRange(lab, "Işık (saat)", 8);
      await compare022(
        lab,
        "Günlük kazanç",
        "Brüt 10 × 8 = 80; solunum 3 × 24 = 72. Günlük net 8 µmol CO₂ alımıdır.",
      );
    },
    async (_, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Günlük net: 8 µmol CO₂; net alım",
      );
      await expect(lab.locator("[data-daily-fixed]")).toHaveAttribute(
        "data-daily-fixed",
        "80",
      );
      await expect(lab.locator("[data-daily-released]")).toHaveAttribute(
        "data-daily-released",
        "72",
      );
      await expect(lab.locator("[data-daily-net]")).toHaveAttribute(
        "data-daily-net",
        "8",
      );
    },
  ),
  forge022Case(
    forge022BiologyLessons,
    "ayt-meristem-doku",
    key022("ayt-meristem-doku"),
    async (_, lab) => {
      await setRange(lab, "İlk hücre", 3);
      await setRange(lab, "Bölünme turu", 3);
      await setRange(lab, "Uzama katı", 2);
      await compare022(
        lab,
        "Hacim artar",
        "3 × 2³ = 24 hücre; 21 olay. Son uzamada sayı aynı kalır, hacim 48 olur.",
      );
    },
    async (_, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Son hücre: 24; yeni hücre ve mitoz olayı: ayrı ayrı 21",
      );
      await expect(lab.locator("[data-final-cells]")).toHaveAttribute(
        "data-final-cells",
        "24",
      );
      await expect(lab.locator("[data-final-volume]")).toHaveAttribute(
        "data-final-volume",
        "48",
      );
      await expect(lab.locator("[data-daughter-chromosomes]")).toHaveAttribute(
        "data-daughter-chromosomes",
        "8",
      );
    },
  ),
  forge022Case(
    forge022BiologyLessons,
    "ayt-temel-doku",
    key022("ayt-temel-doku"),
    async (_, lab) => {
      await setRange(lab, "Toplam alan (µm²)", 1200);
      await setRange(lab, "Hava payı (%)", 25);
      await setRange(lab, "Palizat payı (%)", 40);
      await compare022(
        lab,
        "Sünger daha çok",
        "1200 − 300 = 900 hücre alanı; palizat 360, sünger 540 µm². Payda toplam değil kalan hücre alanıdır.",
      );
    },
    async (_, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Palizat: 360 µm²; sünger hücreleri: 540 µm²",
      );
      await expect(lab.locator(".b022-feedback")).toContainText("Bunun %40'i palizat: 360 µm²");
      await expect(lab.locator(".b022-feedback")).not.toContainText("fmt022");
      await expect(lab.locator("[data-air-area]")).toHaveAttribute(
        "data-air-area",
        "300",
      );
      await expect(lab.locator("[data-palisade-area]")).toHaveAttribute(
        "data-palisade-area",
        "360",
      );
      await expect(lab.locator("[data-spongy-area]")).toHaveAttribute(
        "data-spongy-area",
        "540",
      );
    },
  ),
  forge022Case(
    forge022BiologyLessons,
    "ayt-iletim-doku",
    key022("ayt-iletim-doku"),
    async (_, lab) => {
      await lab.getByRole("button", { name: "Yumru", exact: true }).click();
      await setRange(lab, "İlk şeker (mg)", 10);
      await compare022(
        lab,
        "Stok sınırlar",
        "Q = 2 mL/saat, şeker akısı 4 mg/saat. 16 mg kapasiteye karşı 10 mg stok 2,5 saatte biter; yön yukarıdır.",
      );
    },
    async (_, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Aktarılan: 10 mg; kalan: 0 mg",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Etkin akış 2,5 saat",
      );
      await expect(lab.locator("[data-transferred-sugar]")).toHaveAttribute(
        "data-transferred-sugar",
        "10",
      );
      await expect(lab.locator("[data-transfer-direction]")).toHaveAttribute(
        "data-transfer-direction",
        "up",
      );
      await expect(lab.locator("[data-donor-remaining]")).toHaveAttribute(
        "data-donor-remaining",
        "0",
      );
    },
  ),
].map((entry) => ({ ...entry, questionCount: 12 }));
