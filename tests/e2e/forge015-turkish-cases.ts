import { expect, type Locator } from "@playwright/test";
import { forge015TurkishLessons } from "../../src/learning/forge015Turkish";
import { forge015Case } from "./forge015-case-helper";

async function compare(lab: Locator, guess: string, reason: string) {
  await lab
    .getByRole("combobox", { name: "Görev tahminin", exact: true })
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
    const words = [
      [".turkish015-compare", "Tahminimi"],
      [".turkish015-compare", "karşılaştır"],
      [".turkish015-feedback strong", "Seçimin"],
    ];
    return {
      font: getComputedStyle(root).fontSize,
      words: words.map(([selector, word]) => {
        const el = root.querySelector(selector)!;
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        let node: Node | null;
        while ((node = walker.nextNode())) {
          const start = (node.textContent || "").indexOf(word);
          if (start < 0) continue;
          const range = document.createRange();
          range.setStart(node, start);
          range.setEnd(node, start + word.length);
          return {
            word,
            font: getComputedStyle(el).fontSize,
            rects: [...range.getClientRects()].filter((r) => r.width > 0)
              .length,
          };
        }
        throw Error("Kelime bulunamadı: " + word);
      }),
      controls: [...root.querySelectorAll("button, select, textarea")].map(
        (el) => ({
          name: el.getAttribute("aria-label") || el.textContent,
          height: el.getBoundingClientRect().height,
        }),
      ),
    };
  });
  for (const word of evidence.words) {
    expect(word.font, word.word).toBe(evidence.font);
    expect(word.rects, word.word + " tek kelime olarak sığmalı").toBe(1);
  }
  for (const control of evidence.controls)
    expect(control.height, control.name || "control").toBeGreaterThanOrEqual(
      44,
    );
}
export const turkish015Cases = [
  forge015Case(
    forge015TurkishLessons,
    "fiilimsiler",
    "forge015-turkish:fiilimsiler",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "İncelenen cümle çifti", exact: true })
        .selectOption("adlasma");
      await lab
        .getByRole("button", { name: "Cümleyi dönüştür", exact: true })
        .tap();
      await compare(
        lab,
        "Adlaşmış sıfat-fiil",
        "Gelen kişilerdeki kişiler adı düşmüş; gelen eyleminden gelen niteleme sürüyor.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator(".turkish015-sentence")).toHaveText(
        "Gelenler bekledi.",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Adlaşmış sıfat-fiil",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "gel-en-ler",
      );
      await expect(lab.locator('svg [data-svg-token="0"]')).toHaveAttribute(
        "data-selected",
        "true",
      );
      await expect(lab.locator('svg [data-relation="0-1"]')).toHaveCount(1);
      await expect(lab.locator(".turkish015-links")).toContainText(
        "Gelenler → bekledi. (Özne)",
      );
      await expect(lab.getByRole("status")).toContainText(
        "Seçimin bu bağlamla uyumlu.",
      );
      await readableWords(lab);
    },
  ),
  forge015Case(
    forge015TurkishLessons,
    "cumlenin-ogeleri",
    "forge015-turkish:cumlenin-ogeleri",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "İncelenen cümle çifti", exact: true })
        .selectOption("edilgen");
      await lab
        .getByRole("button", { name: "Cümleyi dönüştür", exact: true })
        .tap();
      await compare(
        lab,
        "Sözde özne",
        "Etken cümledeki köprü nesnesi edilgende etkilenen sözde özneye dönüştü.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator(".turkish015-sentence")).toHaveText(
        "Eski köprü ustalar tarafından onarıldı.",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Sözde özne",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "etken cümledeki nesneyle aynı varlığı",
      );
      await expect(lab.locator('svg [data-relation="0-2"]')).toHaveCount(1);
      await expect(lab.locator('svg [data-svg-token="0"]')).toHaveAttribute(
        "data-selected",
        "true",
      );
      await expect(lab.getByRole("status")).toContainText(
        "Seçimin bu bağlamla uyumlu.",
      );
      await readableWords(lab);
    },
  ),
  forge015Case(
    forge015TurkishLessons,
    "cumle-turleri",
    "forge015-turkish:cumle-turleri",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "İncelenen cümle çifti", exact: true })
        .selectOption("ve");
      await lab
        .getByRole("button", { name: "Cümleyi dönüştür", exact: true })
        .tap();
      await lab
        .getByRole("combobox", { name: "İnceleme ölçütü", exact: true })
        .selectOption("structure");
      await compare(
        lab,
        "Bağlı",
        "Ve burada iki özneyi değil, okudu ve aldı temel yargılarını bağlıyor.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator(".turkish015-sentence")).toHaveText(
        "Ece kitap okudu ve Can not aldı.",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Cümlenin yapısı: Bağlı.",
      );
      await expect(lab.locator(".turkish015-axes")).toContainText(
        "Fiil cümlesi",
      );
      await expect(lab.locator(".turkish015-axes")).toContainText("Kurallı");
      await expect(lab.locator('svg [data-relation="0-1"]')).toHaveCount(1);
      await expect(lab.locator('svg [data-relation="1-2"]')).toHaveCount(1);
      await expect(
        lab
          .locator(".turkish015-selected-label")
          .filter({ hasText: "Seçili ölçüt:" }),
      ).toContainText("Cümlenin yapısı");
      await expect(lab.getByRole("status")).toContainText(
        "Seçimin bu bağlamla uyumlu.",
      );
      await readableWords(lab);
    },
  ),
];
