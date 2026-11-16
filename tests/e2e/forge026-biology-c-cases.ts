import { expect, type Locator } from "@playwright/test";
import { forge026Case, setRange } from "./forge026-case-helper";
import { sourceNarratives } from "../../src/learning/narratives";
import { foundationQuestionSets } from "../../src/learning/forge012FoundationQuestions";
const legacy = sourceNarratives
  .filter((l) => ["proteinler", "enzimler", "vitaminler"].includes(l.id))
  .map((l) => ({
    ...l,
    questions:
      foundationQuestionSets.find((s) => s.lessonId === l.id)?.questions ??
      l.questions,
  }));
const pick = (lab: Locator, label: string, value: string) =>
  lab.getByRole("combobox", { name: label, exact: true }).selectOption(value);
async function compare(lab: Locator, guess: string, reason: string) {
  await pick(lab, "Sonuç tahminin", guess);
  await lab
    .getByRole("textbox", { name: "Gerekçen", exact: true })
    .fill(reason);
  await lab.getByRole("button", { name: "Kıyasla", exact: true }).click();
  await expect(lab.locator(".bc026-feedback")).toContainText(
    "Tahminin modelle uyumlu.",
  );
}
export const biologyC026Cases = [
  forge026Case(
    legacy,
    "proteinler",
    "forge026-biology-c:proteinler",
    async (_, lab) => {
      await setRange(lab, "Amino asit adedi", 8);
      await pick(lab, "Bağlantı", "ring");
      await lab
        .getByRole("checkbox", { name: "1–2 bağı", exact: true })
        .check();
      await lab
        .getByRole("checkbox", { name: "4–5 bağı", exact: true })
        .check();
      await compare(lab, "2", "İki halka bağı kesilince iki parça kalır.");
    },
    async (_, lab) => {
      await expect(lab.locator("[data-residue]")).toHaveCount(8);
      await expect(lab.locator('[data-cut="true"]')).toHaveCount(2);
      await expect(lab.locator("[data-protein-summary]")).toHaveAttribute(
        "data-bonds",
        "6",
      );
      await expect(lab.locator("[data-protein-summary]")).toHaveAttribute(
        "data-fragments",
        "2",
      );
      await expect(lab.locator("[data-protein-summary]")).toHaveAttribute(
        "data-free",
        "0",
      );
      await expect(lab.locator("[data-protein-summary]")).toHaveAttribute(
        "data-fragment-mass",
        "594",
      );
      await expect(lab.locator(".bc026-feedback")).toContainText("Sonuç: 2");
    },
  ),
  forge026Case(
    legacy,
    "enzimler",
    "forge026-biology-c:enzimler",
    async (_, lab) => {
      await pick(lab, "Enzim modeli", "rate");
      await setRange(lab, "Enzim E", 3);
      await setRange(lab, "Substrat S", 4);
      await setRange(lab, "Engelleyici I", 2);
      await expect(lab.locator("circle[data-rate]")).toHaveAttribute(
        "data-rate",
        "2.4",
      );
      await pick(lab, "Enzim modeli", "energy");
      await pick(lab, "Ürün düzeyi", "1");
      await setRange(lab, "Engel azalması (kJ/mol)", 30);
      await compare(lab, "20", "Ürün30−giren10=20;engel ayrı.");
    },
    async (_, lab) => {
      await expect(lab).toHaveAttribute("data-bioc026-mode", "energy");
      await expect(lab.locator("[data-energy-initial]")).toHaveAttribute(
        "data-energy-initial",
        "10",
      );
      await expect(lab.locator("[data-energy-final]")).toHaveAttribute(
        "data-energy-final",
        "30",
      );
      await expect(lab.locator(".bc026-values")).toContainText(
        "Enzimli tepe50 kJ/mol",
      );
      await expect(lab.locator(".bc026-feedback")).toContainText("Sonuç: 20");
    },
  ),
  forge026Case(
    legacy,
    "vitaminler",
    "forge026-biology-c:vitaminler",
    async (_, lab) => {
      await pick(lab, "Vitamin modeli", "balance");
      await setRange(lab, "Başlangıç miktarı", 100);
      await setRange(lab, "Katıda ölçülen", 60);
      await lab
        .getByRole("checkbox", { name: "Su ayrıca ölçüldü", exact: true })
        .uncheck();
      await lab
        .getByRole("checkbox", { name: "Su yemekte tutuluyor", exact: true })
        .check();
      await compare(lab, "unknown", "Su+kayıp40;paylaşım bilinmiyor.");
    },
    async (_, lab) => {
      await expect(
        lab.locator('[data-vitamin-compartment="Su"]'),
      ).toHaveAttribute("data-amount", "unknown");
      await expect(
        lab.locator('[data-vitamin-compartment="Kayıp"]'),
      ).toHaveAttribute("data-amount", "unknown");
      await expect(lab.locator(".bc026-values")).toContainText(
        "Yenebilir bölüm60–100 arası",
      );
      await expect(lab.locator(".bc026-feedback")).toContainText(
        "Sonuç: Hayır",
      );
    },
  ),
];
