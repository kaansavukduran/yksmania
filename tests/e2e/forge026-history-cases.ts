import { expect, type Locator } from "@playwright/test";
import { sourceNarratives } from "../../src/learning/narratives";
import { foundation013QuestionsByLesson } from "../../src/learning/forge013FoundationQuestions";
import { forge026Case } from "./forge026-case-helper";
const lessons = sourceNarratives
  .filter((lesson) =>
    [
      "osmanli-kurulus-siyaseti",
      "osmanli-askeri-teskilat",
      "osmanli-medeniyeti",
      "tarih-zaman",
      "insanligin-ilk-donemleri",
    ].includes(lesson.id),
  )
  .map((lesson) => ({
    ...lesson,
    questions: foundation013QuestionsByLesson[lesson.id] ?? lesson.questions,
  }));
const pick = async (lab: Locator, label: string, value: string) => {
  await lab
    .getByRole("combobox", { name: label, exact: true })
    .selectOption(value);
};
async function compare(
  lab: Locator,
  guess: string,
  reason: string,
  chronological = false,
) {
  if (chronological)
    await lab
      .getByRole("textbox", { name: "Aralık tahminin", exact: true })
      .fill(guess);
  else await pick(lab, "Kanıt tahminin", guess);
  await lab
    .getByRole("textbox", { name: "Gerekçen", exact: true })
    .fill(reason);
  await lab
    .getByRole("button", { name: "Kanıtla karşılaştır", exact: true })
    .click();
  await expect(lab.locator("[data-model-result]")).toHaveAttribute(
    "data-compatible",
    "true",
  );
}
const make = (
  id: string,
  interact: Parameters<typeof forge026Case>[3],
  outcome: Parameters<typeof forge026Case>[4],
) => forge026Case(lessons, id, `forge026:history:${id}`, interact, outcome);
export const history026Cases = [
  make(
    "osmanli-kurulus-siyaseti",
    async (page, lab) => {
      await expect(page.locator(".narrative-lab")).toBeVisible();
      await pick(lab, "Sınanan iddia", "1");
      await compare(
        lab,
        "kararsız",
        "Sıra var, ikmalin bu yoldan geçtiği kaydı yok.",
      );
      await pick(lab, "Kanıt dosyası", "1");
      await expect(lab.locator("[data-model-result]")).toHaveCount(0);
      await expect(
        lab.getByRole("button", { name: "Kanıtla karşılaştır" }),
      ).toBeDisabled();
      await compare(
        lab,
        "destekli",
        "Sevk kaydı, yolun B öncesi ikmalde kullanıldığını bildiriyor.",
      );
      await pick(lab, "Sınanan iddia", "2");
      await lab
        .getByRole("checkbox", {
          name: "C'nin katkısı için ek belge",
          exact: true,
        })
        .check();
      await compare(
        lab,
        "çelişkili",
        "C'nin katkısı da belgeli; tek neden iddiası aşırı.",
      );
    },
    async (_, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "C'nin de B'ye katkısını",
      );
    },
  ),
  make(
    "osmanli-askeri-teskilat",
    async (page, lab) => {
      await expect(page.locator(".narrative-lab")).toBeVisible();
      await pick(lab, "İş ipucu", "1");
      await compare(
        lab,
        "Birden çok aday",
        "Çarpışma tek başına üç aday arasında seçim yaptırmıyor.",
      );
      await pick(lab, "Gelir ipucu", "1");
      await pick(lab, "Birlik türü", "2");
      await compare(
        lab,
        "Tek aday",
        "Ulufe ve süvari koşulları Kapıkulu sipahisiyle birlikte uyuşuyor.",
      );
      await pick(lab, "Gelir ipucu", "2");
      await pick(lab, "Birlik türü", "1");
      await compare(
        lab,
        "Aday yok",
        "Bu sınırlı tabloda dirlik ve piyade birlikte bulunmuyor.",
      );
    },
    async (_, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Bu tabloda uyan aday yok",
      );
    },
  ),
  make(
    "osmanli-medeniyeti",
    async (page, lab) => {
      await expect(page.locator(".narrative-lab")).toBeVisible();
      await lab
        .getByRole("spinbutton", { name: "Gelir birimi", exact: true })
        .fill("10");
      await compare(
        lab,
        "Denge",
        "3+5+2=10; gelir de 10. Yetki için ayrı belge gerekir.",
      );
      await lab
        .getByRole("checkbox", {
          name: "Bu tahsis için vakfiye belgesi",
          exact: true,
        })
        .check();
      await expect(lab.locator("[data-model-result]")).toHaveCount(0);
      await compare(
        lab,
        "Denge",
        "Hesap aynı; bu kez üç tahsisin izni de belgede açık.",
      );
    },
    async (_, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText("izinli");
      await expect(lab.locator("[data-model-result]")).toContainText(
        "10 − 10 = 0",
      );
    },
  ),
  make(
    "tarih-zaman",
    async (page, lab) => {
      await expect(page.locator(".narrative-lab")).toBeVisible();
      await lab
        .getByRole("spinbutton", { name: "İlk yıl", exact: true })
        .fill("2");
      await lab
        .getByRole("spinbutton", { name: "İkinci yıl", exact: true })
        .fill("3");
      await compare(
        lab,
        "4",
        "MÖ 2 → MÖ 1 → MS 1 → MS 2 → MS 3: dört aralık.",
        true,
      );
    },
    async (_, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Aralık sayısı: 4",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "etiket sayısı: 5",
      );
    },
  ),
  make(
    "insanligin-ilk-donemleri",
    async (page, lab) => {
      await expect(page.locator(".narrative-lab")).toBeVisible();
      await compare(
        lab,
        "destekli",
        "Bozulmamış B birikimi alttaki A'dan sonra.",
      );
      await lab
        .getByRole("checkbox", {
          name: "Seçili nesnenin bağlamı bozulmuş",
          exact: true,
        })
        .check();
      await expect(lab.locator("[data-model-result]")).toHaveCount(0);
      await compare(
        lab,
        "kararsız",
        "Çukur bağlamı nesnenin ilk yerini güvenle vermiyor.",
      );
    },
    async (_, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "çukura ait olabilir",
      );
    },
  ),
];
