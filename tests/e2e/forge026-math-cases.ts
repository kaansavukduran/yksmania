import { expect, type Locator } from "@playwright/test";
import { forge026Case } from "./forge026-case-helper";
import { mathematicsNarratives } from "../../src/learning/narratives/mathematics";
import { divisionNarratives } from "../../src/learning/narratives/mathDivision";
import { narrativeLesson } from "../../src/learning/narratives/types";
import { foundation013QuestionsByLesson } from "../../src/learning/forge013FoundationQuestions";
const legacy = [...mathematicsNarratives, ...divisionNarratives].map(
  (pack) => ({
    ...narrativeLesson(pack),
    questions: foundation013QuestionsByLesson[pack.id],
  }),
);
const pick = (lab: Locator, label: string, value: string) =>
  lab.getByRole("combobox", { name: label, exact: true }).selectOption(value);
const number = (lab: Locator, label: string, value: number) =>
  lab.getByRole("spinbutton", { name: label, exact: true }).fill(String(value));
async function compare(lab: Locator, guess: string, reason: string) {
  await pick(lab, "Sonuç tahminin", guess);
  await lab
    .getByRole("textbox", { name: "Modelden gerekçen", exact: true })
    .fill(reason);
  await lab
    .getByRole("button", { name: "Kanıtı karşılaştır", exact: true })
    .click();
  await expect(lab.locator(".m026-feedback")).toContainText(
    "Tahminin model sonucuyla uyumlu.",
  );
}
export const math026Cases = [
  forge026Case(
    legacy,
    "sayi-basamaklari",
    "forge026-math:sayi-basamaklari",
    async (_, lab) => {
      await pick(lab, "Basamak etkinliği", "change");
      await number(lab, "Başlangıç sayısı", 9076);
      await pick(lab, "Yazım işlemi", "replace");
      await number(lab, "Sağdan konum (birler 0)", 2);
      await number(lab, "Yeni rakam", 5);
      await expect(
        lab.locator('[data-digit-row="after"][data-position="2"]'),
      ).toHaveAttribute("data-digit", "5");
      await expect(lab.locator(".m026-values")).toContainText("9.576");
      await pick(lab, "Basamak etkinliği", "carry");
      await number(lab, "Birinci toplanan", 278);
      await number(lab, "İkinci toplanan", 487);
      await number(lab, "Üçüncü toplanan", 659);
      await compare(
        lab,
        "2",
        "8+7+9=24;2 tam onluk bir sonraki sütuna taşınır.",
      );
    },
    async (_, lab) => {
      await expect(lab).toHaveAttribute("data-model-mode", "carry");
      await expect(lab.locator('[data-carry-position="0"]')).toHaveAttribute(
        "data-raw",
        "24",
      );
      await expect(lab.locator('[data-carry-position="0"]')).toHaveAttribute(
        "data-carry-out",
        "2",
      );
      await expect(lab.locator('[data-carry-position="1"]')).toHaveAttribute(
        "data-raw",
        "22",
      );
      await expect(lab.locator("[data-carry-position]")).toHaveCount(4);
      await expect(lab.locator(".m026-values")).toContainText("1.424");
      await expect(lab.locator(".m026-feedback")).toContainText("Sonuç: 2");
    },
  ),
  forge026Case(
    legacy,
    "bolme-bolunebilme",
    "forge026-math:bolme-bolunebilme",
    async (_, lab) => {
      await pick(lab, "Bölme etkinliği", "weights");
      await number(lab, "İncelenen doğal sayı", 4025);
      await number(lab, "Kalanın böleni", 11);
      await expect(lab.locator('[data-weight-position="3"]')).toHaveAttribute(
        "data-contribution",
        "-4",
      );
      await expect(lab.locator(".m026-values")).toContainText("Son kalan10");
      await pick(lab, "Bölme etkinliği", "filter");
      await pick(lab, "Rakam yazımı", "7?4");
      await pick(lab, "Birlikte tam bölünme", "3,4");
      await lab
        .getByRole("checkbox", {
          name: "Bütün rakamlar farklı olsun",
          exact: true,
        })
        .check();
      await expect(lab.locator('[data-passes="true"]')).toHaveCount(0);
      await compare(
        lab,
        "no",
        "Tek bölünebilir aday744’tür;iki4 rakamı farklılık şartını bozar.",
      );
      await lab
        .getByRole("checkbox", {
          name: "Bütün rakamlar farklı olsun",
          exact: true,
        })
        .uncheck();
      await expect(lab.locator(".m026-feedback")).toHaveCount(0);
      await compare(
        lab,
        "yes",
        "744=3×248=4×186;tekrar yasağı kalkınca bu aday geçerlidir.",
      );
    },
    async (_, lab) => {
      await expect(lab).toHaveAttribute("data-model-mode", "filter");
      await expect(lab.locator("[data-candidate]")).toHaveCount(10);
      await expect(lab.locator('[data-passes="true"]')).toHaveCount(1);
      await expect(lab.locator('[data-candidate="744"]')).toHaveAttribute(
        "data-passes",
        "true",
      );
      await expect(lab.locator(".m026-values")).toContainText(
        "Uygun sayılar744",
      );
      await expect(lab.locator(".m026-feedback")).toContainText("Sonuç: Var");
    },
  ),
  forge026Case(
    legacy,
    "ebob-ekok",
    "forge026-math:ebob-ekok",
    async (_, lab) => {
      await pick(lab, "Ortaklık etkinliği", "tiles");
      await number(lab, "Birinci kenar (cm)", 30);
      await number(lab, "İkinci kenar (cm)", 54);
      await expect(lab.locator("[data-tile-side]")).toHaveAttribute(
        "data-tile-side",
        "6",
      );
      await expect(lab.locator(".m026-values")).toContainText("Kare adedi45");
      await pick(lab, "Ortaklık etkinliği", "pairs");
      await number(lab, "Verilen EBOB d", 5);
      await number(lab, "Verilen EKOK m", 210);
      await expect(lab.locator('[data-pair-a="30"]')).toHaveAttribute(
        "data-pair-b",
        "35",
      );
      await expect(lab.locator('[data-pair-a="30"]')).toHaveAttribute(
        "data-pair-sum",
        "65",
      );
      await pick(lab, "Ortaklık etkinliği", "events");
      await number(lab, "A periyodu (dk)", 7);
      await number(lab, "B periyodu (dk)", 10);
      await number(lab, "A ilk zamanı (dk)", 2);
      await number(lab, "B ilk zamanı (dk)", 5);
      await number(lab, "Son an (dk)", 150);
      await lab
        .getByRole("checkbox", { name: "0 anını dahil et", exact: true })
        .check();
      await lab
        .getByRole("checkbox", { name: "Son anı dahil et", exact: true })
        .check();
      await compare(
        lab,
        "65",
        "2+7×9=65=5+10×6;ortak ilk an65,sonraki135 olur.",
      );
    },
    async (_, lab) => {
      await expect(lab).toHaveAttribute("data-model-mode", "events");
      await expect(lab.locator("[data-common-time]")).toHaveCount(2);
      await expect(lab.locator('[data-common-time="65"]')).toHaveCount(1);
      await expect(lab.locator('[data-common-time="135"]')).toHaveCount(1);
      await expect(
        lab.locator('[data-event="A"][data-time="65"]'),
      ).toHaveAttribute("cx", "142.66666666666669");
      await expect(lab.locator(".m026-values")).toContainText(
        "Ortak olay adedi2",
      );
      await expect(lab.locator(".m026-feedback")).toContainText("Sonuç: 65");
    },
  ),
];
