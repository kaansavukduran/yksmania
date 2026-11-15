import { expect, type Locator } from "@playwright/test";
import { forge012TurkishLessons } from "../../src/learning/forge012Turkish";
import { forge012Case } from "./forge012-case-helper";

async function assertReadableFeedback(lab: Locator) {
  const measured = await lab.evaluate((element) => {
    const words = [
      ["fieldset > button", "Tahminimi"],
      ["fieldset > button", "karşılaştır"],
      [".grammar012-feedback strong", "Seçimin"],
    ];
    return {
      labFont: getComputedStyle(element).fontSize,
      words: words.map(([selector, word]) => {
        const target = element.querySelector(selector)!;
        const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
        let node: Node | null;
        while ((node = walker.nextNode())) {
          const at = (node.textContent ?? "").indexOf(word);
          if (at < 0) continue;
          const range = document.createRange();
          range.setStart(node, at);
          range.setEnd(node, at + word.length);
          return {
            word,
            font: getComputedStyle(target).fontSize,
            rectangles: [...range.getClientRects()].filter((r) => r.width > 0)
              .length,
          };
        }
        throw new Error("Missing rendered word: " + word);
      }),
    };
  });
  for (const word of measured.words) {
    expect(word.font, word.word + " retains the selected text size").toBe(
      measured.labFont,
    );
    expect(
      word.rectangles,
      word.word + " must fit without a letter-by-letter line break",
    ).toBe(1);
  }
}

export const turkish012Cases = [
  forge012Case(
    forge012TurkishLessons,
    "edat-baglac-unlem",
    "forge012-turkish:edat-baglac-unlem",
    async (_page, lab) => {
      await lab
        .getByRole("button", { name: "Cümleyi dönüştür", exact: true })
        .tap();
      await lab
        .getByRole("button", { name: "Kanıtı göster", exact: true })
        .tap();
      await lab
        .getByRole("combobox", { name: "Görev tahminin", exact: true })
        .selectOption("Edat");
      const reason = lab.getByRole("textbox", {
        name: "Cümleden gerekçen",
        exact: true,
      });
      await expect(reason).toHaveAttribute("maxlength", "120");
      await reason.fill(
        "Pense kesmenin aracıdır; pense ve kablo eş görevli iki özne değildir.",
      );
      await lab
        .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
        .tap();
    },
    async (_page, lab) => {
      await expect(lab.locator(".grammar012-sentence")).toHaveText(
        "Ada pense ile kabloyu kesti.",
      );
      await expect(lab.locator("[data-model-result]")).toContainText("Edat");
      await expect(lab.locator(".grammar012-parts")).toContainText(
        "Araç ilişkisi",
      );
      await expect(lab.locator(".grammar012-evidence")).toContainText(
        "Neyle kesti? Pense ile.",
      );
      await expect(lab.getByRole("status")).toContainText(
        "Seçimin bu bağlamla uyumlu.",
      );
      await assertReadableFeedback(lab);
    },
    ".grammar012-model",
  ),
  forge012Case(
    forge012TurkishLessons,
    "fiiller",
    "forge012-turkish:fiiller",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "İncelenen örnek çifti", exact: true })
        .selectOption("shift");
      await lab
        .getByRole("button", { name: "Cümleyi dönüştür", exact: true })
        .tap();
      await lab
        .getByRole("button", { name: "Kanıtı göster", exact: true })
        .tap();
      await lab
        .getByRole("combobox", { name: "Görev tahminin", exact: true })
        .selectOption("Zaman kayması");
      await lab
        .getByRole("textbox", { name: "Cümleden gerekçen", exact: true })
        .fill(
          "Biniyorum şimdiki zaman biçiminde; yarın sözü gelecekteki planı gösterir.",
        );
      await lab
        .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
        .tap();
    },
    async (_page, lab) => {
      await expect(lab.locator(".grammar012-sentence")).toHaveText(
        "Yarın trene biniyorum.",
      );
      await expect(
        lab.locator(".grammar012-timeline [data-active='true']"),
      ).toHaveAttribute("data-time", "1");
      await expect(lab.locator(".grammar012-parts")).toContainText(
        "bin-iyor-um",
      );
      await expect(lab.locator(".grammar012-evidence")).toContainText(
        "Biçim: şimdiki zaman.",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Zaman kayması",
      );
      await expect(lab.getByRole("status")).toContainText(
        "Seçimin bu bağlamla uyumlu.",
      );
      await assertReadableFeedback(lab);
    },
    ".grammar012-model",
  ),
  forge012Case(
    forge012TurkishLessons,
    "fiilde-cati",
    "forge012-turkish:fiilde-cati",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "İncelenen örnek çifti", exact: true })
        .selectOption("reflexive");
      await lab
        .getByRole("button", { name: "Cümleyi dönüştür", exact: true })
        .tap();
      await lab
        .getByRole("button", { name: "Kanıtı göster", exact: true })
        .tap();
      await lab
        .getByRole("combobox", { name: "Görev tahminin", exact: true })
        .selectOption("Edilgen");
      await lab
        .getByRole("textbox", { name: "Cümleden gerekçen", exact: true })
        .fill(
          "Yıkayan anne, etkilenen çocuk; çocuk sözde özne olduğu için edilgendir.",
        );
      await lab
        .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
        .tap();
    },
    async (_page, lab) => {
      await expect(lab.locator(".grammar012-sentence")).toHaveText(
        "Çocuk annesi tarafından yıkandı.",
      );
      await expect(lab.locator(".grammar012-parts")).toContainText(
        "Sözde özne",
      );
      await expect(lab.locator(".grammar012-evidence")).toContainText(
        "Yapan ≠ etkilenen",
      );
      await expect(lab.locator("[data-model-result]")).toContainText("Edilgen");
      await expect(lab.getByRole("status")).toContainText(
        "Seçimin bu bağlamla uyumlu.",
      );
      await assertReadableFeedback(lab);
    },
    ".grammar012-model",
  ),
];
