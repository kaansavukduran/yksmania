import { expect, type Locator } from "@playwright/test";
import { sourceNarratives } from "../../src/learning/narratives";
import { foundationQuestionSets } from "../../src/learning/forge012FoundationQuestions";
import { forge026Case, setRange } from "./forge026-case-helper";
const lessons = sourceNarratives
  .filter((lesson) => ["karbohidratlar", "lipitler"].includes(lesson.id))
  .map((lesson) => ({
    ...lesson,
    questions:
      foundationQuestionSets.find((set) => set.lessonId === lesson.id)
        ?.questions ?? lesson.questions,
  }));
async function compare(lab: Locator, guess: string, reason: string) {
  await lab
    .getByRole("combobox", { name: "Tahminin", exact: true })
    .selectOption(guess);
  await lab
    .getByRole("textbox", { name: "Gerekçen", exact: true })
    .fill(reason);
  await lab.getByRole("button", { name: "Kıyasla", exact: true }).click();
  await expect(lab.locator('.bb026-feedback[role="status"]')).toContainText(
    "Modelle uyumlu.",
  );
}
export const biologyB026Cases = [
  forge026Case(
    lessons,
    "karbohidratlar",
    "forge026:biology-b:karbohidratlar",
    async (_, lab) => {
      await setRange(lab, "Şeker birimi", 8);
      await setRange(lab, "İlk parça sayısı", 3);
      await setRange(lab, "Yeni bağ", 2);
      await setRange(lab, "Kopan bağ", 3);
      await compare(lab, "4", "8−4=4 ayrı parça.");
      await lab.getByRole("button", { name: "Kanıtı aç", exact: true }).click();
    },
    async (_, lab) => {
      await expect(lab.locator('[data-model-result="forest"]')).toHaveAttribute(
        "data-pieces",
        "4",
      );
      await expect(lab.locator('[data-model-result="forest"]')).toHaveAttribute(
        "data-bonds",
        "4",
      );
      await expect(lab.locator("svg [data-sugar-unit]")).toHaveCount(8);
      await expect(lab.locator('svg [data-cut="true"]')).toHaveCount(3);
      await expect(lab.locator(".bb026-proof")).toContainText("8−4=4");
    },
  ),
  forge026Case(
    lessons,
    "lipitler",
    "forge026:biology-b:lipitler",
    async (_, lab) => {
      await setRange(lab, "Serbest gliserol", 3);
      await setRange(lab, "Serbest yağ asidi", 10);
      await setRange(lab, "Kurulan ürün", 3);
      await setRange(lab, "Kopan ester bağı", 4);
      await compare(lab, "1", "Üç bağın tümü yalnız ilk üründe koptu.");
      await lab.getByRole("button", { name: "Kanıtı aç", exact: true }).click();
    },
    async (_, lab) => {
      await expect(lab.locator('[data-model-result="esters"]')).toHaveAttribute(
        "data-free-glycerol",
        "1",
      );
      await expect(lab.locator('[data-model-result="esters"]')).toHaveAttribute(
        "data-free-acids",
        "5",
      );
      await expect(lab.locator("svg [data-ester-slot]")).toHaveCount(9);
      await expect(
        lab.locator('svg [data-ester-slot][data-cut="true"]'),
      ).toHaveCount(4);
      await expect(lab.locator(".bb026-proof")).toContainText(
        "1 serbest gliserol",
      );
    },
  ),
];
