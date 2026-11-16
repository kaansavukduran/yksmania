import { expect, type Locator } from "@playwright/test";
import { forge026Case, setRange } from "./forge026-case-helper";
import { sourceNarratives } from "../../src/learning/narratives";
const lessons = sourceNarratives.filter((lesson) =>
  [
    "canli-ozellikleri",
    "bilimsel-yontem",
    "mineraller",
    "su-asit-baz-tuz",
  ].includes(lesson.id),
);
const pick = (lab: Locator, label: string, value: string) =>
  lab.getByRole("combobox", { name: label, exact: true }).selectOption(value);
async function compare(lab: Locator, guess: string, reason: string) {
  await pick(lab, "Tahminin", guess);
  await lab
    .getByRole("textbox", { name: "Gerekçen", exact: true })
    .fill(reason);
  await lab.getByRole("button", { name: "Kıyasla", exact: true }).click();
  await expect(lab.locator('.b026-feedback[role="status"]')).toContainText(
    "Modelle uyumlu.",
  );
}
export const biologyA026Cases = [
  forge026Case(
    lessons,
    "canli-ozellikleri",
    "forge026:biology-a:canli-ozellikleri",
    async (_, lab) => {
      await pick(lab, "Canlılık modeli", "cell");
      await pick(lab, "İncelenen örnek", "redCell");
      await expect(lab.locator('[data-model-result="cell"]')).toHaveAttribute(
        "data-ribosome",
        "false",
      );
      await expect(lab.locator("svg [data-nucleus]")).toHaveCount(0);
      await compare(lab, "cell", "Özelleşmiş hücre");
      await pick(lab, "İncelenen örnek", "virus");
      await expect(lab.locator("svg [data-capsid]")).toHaveCount(1);
      await expect(lab.locator("svg [data-cell-membrane]")).toHaveCount(0);
      await compare(lab, "acellular", "Hücre planı yok");
      await pick(lab, "Canlılık modeli", "budget");
      await setRange(lab, "Başlangıç ATP birimi", 3);
      await setRange(lab, "Adım başına üretim", 2);
      await setRange(lab, "Adım başına bakım talebi", 4);
      await setRange(lab, "Adım başına sentez talebi", 5);
      await setRange(lab, "Adım sayısı", 3);
      await compare(lab, "no", "Bakım açığı 4 birim.");
      await lab.getByRole("button", { name: "Kanıtı aç", exact: true }).click();
    },
    async (_, lab) => {
      await expect(lab.locator('[data-model-result="budget"]')).toHaveAttribute(
        "data-stock",
        "0",
      );
      await expect(lab.locator('[data-model-result="budget"]')).toHaveAttribute(
        "data-unmet",
        "4",
      );
      await expect(lab.locator('svg [data-atp-step="0"]')).toHaveAttribute(
        "height",
        "150",
      );
      await expect(lab.locator('svg [data-atp-step="3"]')).toHaveAttribute(
        "height",
        "0",
      );
      await expect(lab.locator(".b026-proof")).toContainText("9");
    },
  ),
  forge026Case(
    lessons,
    "bilimsel-yontem",
    "forge026:biology-a:bilimsel-yontem",
    async (_, lab) => {
      await pick(lab, "İlk grup", "0");
      await pick(lab, "İkinci grup", "3");
      await pick(lab, "Hedef etken", "light");
      await compare(lab, "invalid", "Su da değişiyor.");
      await expect(lab.locator('[data-model-result="pair"]')).toContainText(
        "Işık 8 saat; su 40 mL; tuz 1 g/L",
      );
      await pick(lab, "İkinci grup", "1");
      await compare(lab, "valid", "Yalnız ışık farklı.");
      await expect(lab.locator('svg [data-group-mean="B"]')).toHaveAttribute(
        "height",
        "84",
      );
      await pick(lab, "Deney modeli", "measurement");
      await setRange(lab, "Gerçek referans (mm)", 40);
      await setRange(lab, "Ölçek çarpanı (%)", 120);
      await setRange(lab, "Sabit kayma (mm)", 3);
      await setRange(lab, "Okuma sayısı", 3);
      await compare(lab, "above", "51>40");
    },
    async (_, lab) => {
      await expect(
        lab.locator('[data-model-result="measurement"]'),
      ).toHaveAttribute("data-mean", "51");
      await expect(
        lab.locator('[data-model-result="measurement"]'),
      ).toHaveAttribute("data-error", "11");
      await expect(lab.locator("svg [data-reading]")).toHaveCount(3);
      await expect(lab.locator('svg [data-reading="49"]')).toHaveCount(1);
      await expect(
        lab.locator('[data-model-result="measurement"]'),
      ).toContainText("51; 49; 53");
    },
  ),
  forge026Case(
    lessons,
    "mineraller",
    "forge026:biology-a:mineraller",
    async (_, lab) => {
      await setRange(lab, "Alıma uygun N (mg)", 24);
      await setRange(lab, "Alıma uygun P (mg)", 8);
      await setRange(lab, "Alıma uygun Mg (mg)", 12);
      await compare(lab, "tie", "24/6=8/2=12/3");
      await setRange(lab, "Alıma uygun P (mg)", 12);
      await setRange(lab, "Alıma uygun Mg (mg)", 15);
      await expect(lab.locator(".b026-feedback")).toHaveCount(0);
      await compare(lab, "N", "4<6 ve 4<5");
      await lab.getByRole("button", { name: "Kanıtı aç", exact: true }).click();
    },
    async (_, lab) => {
      await expect(
        lab.locator('[data-model-result="minerals"]'),
      ).toHaveAttribute("data-units", "4");
      await expect(
        lab.locator('[data-model-result="minerals"]'),
      ).toHaveAttribute("data-limiting", "N");
      await expect(lab.locator('svg [data-mineral="N"]')).toHaveAttribute(
        "height",
        "100",
      );
      await expect(lab.locator('svg [data-mineral="P"]')).toHaveAttribute(
        "height",
        "150",
      );
      await expect(lab.locator('[data-model-result="minerals"]')).toContainText(
        "kalan 3 mg",
      );
    },
  ),
  forge026Case(
    lessons,
    "su-asit-baz-tuz",
    "forge026:biology-a:su-asit-baz-tuz",
    async (_, lab) => {
      await pick(lab, "Su ve iyon modeli", "mixture");
      await compare(lab, "acid", "200>100");
      await expect(
        lab.locator('[data-model-result="mixture"]'),
      ).toHaveAttribute("data-excess", "100");
      await setRange(lab, "NaOH hacmi (mL)", 20);
      await compare(lab, "neutral", "200=200");
      await expect(
        lab.locator('[data-model-result="mixture"]'),
      ).toHaveAttribute("data-ph", "7");
      await pick(lab, "Su ve iyon modeli", "relation");
      await compare(lab, "A", "10 kat derişim");
      await expect(
        lab.locator('[data-model-result="relation"]'),
      ).toHaveAttribute("data-amount-ratio", "1");
      await setRange(lab, "A hacmi (mL)", 1000);
      await compare(lab, "A", "Derişim hacimden ayrı.");
      await expect(
        lab.locator('[data-model-result="relation"]'),
      ).toHaveAttribute("data-amount-ratio", "100");
      await pick(lab, "Su ve iyon modeli", "thermal");
      await compare(lab, "no", "Faz değişimi yok.");
      await expect(
        lab.locator('[data-model-result="thermal"]'),
      ).toHaveAttribute("data-temperature", "22");
      await pick(lab, "Enerji yolu", "evaporating");
      await setRange(lab, "Başlangıç suyu (g)", 10);
      await setRange(lab, "Toplam enerji (J)", 12000);
      await compare(lab, "yes", "12000/2400=5 g");
    },
    async (_, lab) => {
      await expect(
        lab.locator('[data-model-result="thermal"]'),
      ).toHaveAttribute("data-temperature", "20");
      await expect(
        lab.locator('[data-model-result="thermal"]'),
      ).toHaveAttribute("data-remaining", "5");
      await expect(lab.locator("svg [data-liquid-fraction]")).toHaveAttribute(
        "height",
        "65",
      );
      await expect(lab.locator("svg [data-vapor-mass]")).toHaveAttribute(
        "data-vapor-mass",
        "5",
      );
      await expect(lab.locator("svg [data-water-molecule]")).toHaveCount(3);
    },
  ),
];
