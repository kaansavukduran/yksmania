import { expect, type Locator } from "@playwright/test";
import { forge016TurkishLessons } from "../../src/learning/forge016Turkish";
import { forge016Case } from "./forge016-case-helper";
async function compare(lab: Locator, guess: string, reason: string) {
  await lab
    .getByRole("combobox", { name: "Karar tahminin", exact: true })
    .selectOption(guess);
  const input = lab.getByRole("textbox", {
    name: "Cümleden gerekçen",
    exact: true,
  });
  await expect(input).toHaveAttribute("maxlength", "120");
  await input.fill(reason);
  await lab
    .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
    .tap();
}
async function readableWords(lab: Locator) {
  const evidence = await lab.evaluate((root) => {
    const targets = [
      [".turkish016-compare", "Tahminimi"],
      [".turkish016-compare", "karşılaştır"],
      [".turkish016-feedback strong", "Seçimin"],
    ];
    return {
      font: getComputedStyle(root).fontSize,
      words: targets.map(([selector, word]) => {
        const element = root.querySelector(selector)!;
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
        let node: Node | null;
        while ((node = walker.nextNode())) {
          const start = (node.textContent || "").indexOf(word);
          if (start < 0) continue;
          const range = document.createRange();
          range.setStart(node, start);
          range.setEnd(node, start + word.length);
          return {
            word,
            font: getComputedStyle(element).fontSize,
            rects: [...range.getClientRects()].filter((rect) => rect.width > 0)
              .length,
          };
        }
        throw Error("Sözcük bulunamadı: " + word);
      }),
      controls: [...root.querySelectorAll("button, select, textarea")].map(
        (element) => ({
          name: element.getAttribute("aria-label") || element.textContent,
          height: element.getBoundingClientRect().height,
        }),
      ),
    };
  });
  for (const word of evidence.words) {
    expect(word.font).toBe(evidence.font);
    expect(word.rects, word.word).toBe(1);
  }
  for (const control of evidence.controls)
    expect(control.height, control.name || "control").toBeGreaterThanOrEqual(
      44,
    );
}
export const turkish016Cases = [
  forge016Case(
    forge016TurkishLessons,
    "yazim-kurallari",
    "forge016-turkish:yazim-kurallari",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "İncelenen cümle çifti", exact: true })
        .selectOption("de");
      await expect(lab.locator('[data-word-group="0"]')).toHaveAttribute(
        "data-members",
        "0,1",
      );
      await lab
        .getByRole("button", { name: "Cümleyi dönüştür", exact: true })
        .tap();
      await compare(
        lab,
        "Ekleme bağlacı ayrı",
        "Duvar boyanan varlık; da ekleme yapıyor ve ayrı sözcük olarak yazılıyor.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator(".turkish016-sentence")).toHaveText(
        "Duvar da boyandı.",
      );
      await expect(lab.locator('[data-word-group="0"]')).toHaveAttribute(
        "data-members",
        "0",
      );
      await expect(
        lab.locator('[data-word-group="1"] .turkish016-phrase'),
      ).toHaveText("da");
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Ekleme bağlacı ayrı",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "boyanan varlıklar arasına ekler",
      );
      await expect(lab.locator('svg [data-relation="0-2"]')).toHaveCount(1);
      await expect(lab.locator('svg [data-svg-token="1"]')).toHaveAttribute(
        "data-selected",
        "true",
      );
      await expect(lab.locator(".turkish016-links")).toContainText(
        "da → Duvar (Ekleme)",
      );
      await expect(lab.getByRole("status")).toContainText(
        "Seçimin bu bağlamla uyumlu.",
      );
      await readableWords(lab);
    },
  ),
  forge016Case(
    forge016TurkishLessons,
    "noktalama-isaretleri",
    "forge016-turkish:noktalama-isaretleri",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "İncelenen cümle çifti", exact: true })
        .selectOption("takim");
      await expect(lab.locator('[data-word-group="0"]')).toHaveAttribute(
        "data-members",
        "0,1",
      );
      await lab
        .getByRole("button", { name: "Cümleyi dönüştür", exact: true })
        .tap();
      await compare(
        lab,
        "Can ikinci takımda",
        "Noktalı virgül Can adından önceye geldi; Can, Ada ve Deniz aynı takımda.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator(".turkish016-sentence")).toHaveText(
        "Takımlar şöyle: Ece; Can, Ada, Deniz.",
      );
      await expect(lab.locator('[data-word-group="1"]')).toHaveAttribute(
        "data-members",
        "1,2,3",
      );
      await expect(
        lab.locator('[data-word-group="1"] .turkish016-phrase'),
      ).toHaveText("Can Ada Deniz");
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Can ikinci takımda",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Takımı değişen tek kişi Can’dır",
      );
      await expect(lab.locator('svg [data-svg-group="1"]')).toHaveAttribute(
        "data-members",
        "1,2,3",
      );
      await expect(lab.locator('svg [data-relation="0-1"]')).toHaveCount(0);
      await expect(lab.locator('svg [data-relation="1-2"]')).toHaveCount(1);
      await expect(lab.getByRole("status")).toContainText(
        "Seçimin bu bağlamla uyumlu.",
      );
      await readableWords(lab);
    },
  ),
];
