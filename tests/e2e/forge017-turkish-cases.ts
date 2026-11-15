import { expect, type Locator } from "@playwright/test";
import { forge017TurkishLessons } from "../../src/learning/forge017Turkish";
import { forge017Case } from "./forge017-case-helper";
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
      [".turkish017-compare", "Tahminimi"],
      [".turkish017-compare", "karşılaştır"],
      [".turkish017-feedback strong", "Seçimin"],
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
  const geometry = await lab.locator("svg").evaluate((element) => {
    const svg = element as SVGSVGElement;
    const viewport = svg.getBoundingClientRect();
    const scale = viewport.width / svg.viewBox.baseVal.width;
    const words = [...svg.querySelectorAll("[data-svg-token]")].map((group) => {
      const text = group.querySelector("text")!;
      const rect = group.querySelector("rect")!.getBoundingClientRect();
      const box = text.getBoundingClientRect();
      return {
        value: text.textContent,
        paddingDifference: Math.abs(
          box.top - rect.top - (rect.bottom - box.bottom),
        ),
        px: Number.parseFloat(getComputedStyle(text).fontSize) * scale,
        box: {
          left: box.left,
          right: box.right,
          top: box.top,
          bottom: box.bottom,
        },
        inside:
          box.left >= rect.left - 0.1 &&
          box.right <= rect.right + 0.1 &&
          box.top >= rect.top - 0.1 &&
          box.bottom <= rect.bottom + 0.1,
        inViewBox:
          box.left >= viewport.left - 0.1 &&
          box.right <= viewport.right + 0.1 &&
          box.top >= viewport.top - 0.1 &&
          box.bottom <= viewport.bottom + 0.1,
      };
    });
    let overlaps = 0;
    for (let i = 0; i < words.length; i++)
      for (let j = i + 1; j < words.length; j++) {
        const a = words[i].box,
          b = words[j].box;
        if (
          a.left < b.right &&
          b.left < a.right &&
          a.top < b.bottom &&
          b.top < a.bottom
        )
          overlaps++;
      }
    return { words, overlaps };
  });
  expect(geometry.overlaps).toBe(0);
  for (const word of geometry.words) {
    expect(word.px, word.value || "SVG text").toBeGreaterThanOrEqual(16);
    expect(word.inside, word.value || "SVG text").toBe(true);
    expect(word.inViewBox, word.value || "SVG text").toBe(true);
    expect(
      word.paddingDifference,
      word.value || "SVG text",
    ).toBeLessThanOrEqual(1);
  }
}
export const turkish017Cases = [
  forge017Case(
    forge017TurkishLessons,
    "anlatim-bozukluklari",
    "forge017-turkish:anlatim-bozukluklari",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "İncelenen cümle çifti", exact: true })
        .selectOption("hal");
      await expect(lab.locator('svg [data-relation="0-3"]')).toHaveAttribute(
        "data-valid",
        "false",
      );
      await lab
        .getByRole("button", { name: "Cümleyi dönüştür", exact: true })
        .tap();
      await compare(
        lab,
        "İki hâl ayrı kuruldu",
        "Görmek kimi, güvenmek kime ister; komşumu ve ona aynı kişiyi iki ayrı hâlle verir.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator(".turkish017-sentence")).toHaveText(
        "Komşumu gördüm ve ona güvendim.",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "İki hâl ayrı kuruldu",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Komşumu belirtme, ona yönelme ilişkisidir",
      );
      await expect(
        lab.locator('[data-word-group="3"] .turkish017-phrase'),
      ).toHaveText("ona");
      await expect(lab.locator('svg [data-relation="0-3"]')).toHaveCount(0);
      await expect(lab.locator('svg [data-relation="3-4"]')).toHaveAttribute(
        "data-valid",
        "true",
      );
      await expect(lab.locator('svg [data-svg-token="3"]')).toHaveAttribute(
        "data-selected",
        "true",
      );
      await expect(lab.getByRole("status")).toContainText(
        "Seçimin bu bağlamla uyumlu.",
      );
      await readableWords(lab);
    },
  ),
  forge017Case(
    forge017TurkishLessons,
    "sozcukte-anlam",
    "forge017-turkish:sozcukte-anlam",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "İncelenen cümle çifti", exact: true })
        .selectOption("yon");
      await lab
        .getByRole("button", { name: "Cümleyi dönüştür", exact: true })
        .tap();
      await compare(
        lab,
        "İnsandan doğaya aktarım",
        "Gülümsemek insan davranışı; ağaç bu davranışın yeni hedefi. Ok insandan doğaya gider.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator(".turkish017-sentence")).toHaveText(
        "Ağaç sabah ışığında gülümsedi.",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "İnsandan doğaya aktarım",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Kaynak özellik: insan davranışı",
      );
      await expect(lab.locator('svg [data-relation="2-0"]')).toHaveAttribute(
        "data-valid",
        "true",
      );
      await expect(lab.locator('svg [data-svg-token="2"]')).toHaveAttribute(
        "data-selected",
        "true",
      );
      await expect(lab.locator(".turkish017-links")).toContainText(
        "gülümsedi. → Ağaç (İnsan → doğa)",
      );
      await expect(lab.getByRole("status")).toContainText(
        "Seçimin bu bağlamla uyumlu.",
      );
      await readableWords(lab);
    },
  ),
];
