import { expect, type Locator } from "@playwright/test";
import { forge018TurkishLessons } from "../../src/learning/forge018Turkish";
import { forge018Case } from "./forge018-case-helper";
async function compare(lab: Locator, guess: string, reason: string) {
  await lab
    .getByRole("combobox", { name: "Karar tahminin", exact: true })
    .selectOption(guess);
  const input = lab.getByRole("textbox", {
    name: "Bağlamdan gerekçen",
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
      [".turkish018-compare", "Tahminimi"],
      [".turkish018-compare", "karşılaştır"],
      [".turkish018-feedback strong", "Seçimin"],
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
      allWords: [...root.querySelectorAll("button, p, label, legend, li, h3")].flatMap((element) => {
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
        const words: { value: string; rects: number }[] = [];
        let node: Node | null;
        while ((node = walker.nextNode())) {
          for (const match of (node.textContent || "").matchAll(/\S+/g)) {
            const range = document.createRange();
            range.setStart(node, match.index!);
            range.setEnd(node, match.index! + match[0].length);
            words.push({ value: match[0], rects: [...range.getClientRects()].filter((rect) => rect.width > 0).length });
          }
        }
        return words;
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
  for (const word of evidence.allWords)
    expect(word.rects, word.value).toBe(1);
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
export const turkish018Cases = [
  forge018Case(
    forge018TurkishLessons,
    "deyimler-ve-atasozleri",
    "forge018-turkish:deyimler-ve-atasozleri",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "İncelenen örnek", exact: true })
        .selectOption("goz");
      await expect(lab.locator(".turkish018-links")).toContainText(
        "İtibar kaybı",
      );
      await lab
        .getByRole("button", { name: "Bağlamı değiştir", exact: true })
        .tap();
      await compare(
        lab,
        "Fark edilmeme",
        "Gözden kaçan tarih yanlışı fark edilmedi; bu kişinin değer yitirmesiyle aynı sonuç değildir.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator(".turkish018-sentence")).toHaveText(
        "Raporda son satırdaki tarih yanlışı gözden kaçtı.",
      );
      await expect(lab.locator('[data-node-index="2"]')).toContainText(
        "Okuyanlar yanlışı fark etmedi.",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Fark edilmeme",
      );
      await expect(lab.locator(".turkish018-links")).toContainText(
        "Fark edilmeme",
      );
      await expect(lab.locator('svg [data-relation="1-2"]')).toHaveAttribute(
        "data-valid",
        "true",
      );
      await expect(lab.locator('svg [data-svg-node="1"]')).toHaveAttribute(
        "data-selected",
        "true",
      );
      await expect(lab.getByRole("status")).toContainText(
        "Seçimin bu bağlamla uyumlu.",
      );
      await readableWords(lab);
    },
  ),
  forge018Case(
    forge018TurkishLessons,
    "cumlede-anlam",
    "forge018-turkish:cumlede-anlam",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "İncelenen örnek", exact: true })
        .selectOption("icin");
      await expect(lab.locator(".turkish018-links")).toContainText(
        "Neden → sonuç",
      );
      await compare(lab, "Neden-sonuç", "Bulduğu kayıt, dosyayı açma nedenidir.");
      await expect(lab.getByRole("combobox", { name: "Karar tahminin", exact: true })).toHaveValue("Neden-sonuç");
      await expect(lab.locator("[data-model-result] > p > strong")).toHaveText("Neden ve sonuç");
      await readableWords(lab);
      await lab
        .getByRole("button", { name: "Bağlamı değiştir", exact: true })
        .tap();
      await compare(
        lab,
        "Amaç",
        "Kaydı görmek hedef, dosyayı açmak eylemdir; bu cümle hedefin kesin sonucunu vermez.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator(".turkish018-sentence")).toHaveText(
        "Kaydı görmek için dosyayı açtı.",
      );
      await expect(lab.locator('[data-node-index="1"]')).toContainText(
        "Kaydı görmek istiyor.",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Başarı veya başarısız sonuç",
      );
      await expect(lab.locator(".turkish018-links")).toContainText(
        "Eylem → hedef",
      );
      await expect(lab.locator('svg [data-svg-node="0"]')).toHaveAttribute(
        "data-selected",
        "true",
      );
      await expect(lab.getByRole("status")).toContainText(
        "Seçimin bu bağlamla uyumlu.",
      );
      await readableWords(lab);
    },
  ),
  forge018Case(
    forge018TurkishLessons,
    "paragrafa-giris",
    "forge018-turkish:paragrafa-giris",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "İncelenen örnek", exact: true })
        .selectOption("etiket");
      await expect(lab.locator('svg [data-relation="1-0"]')).toHaveAttribute(
        "data-valid",
        "false",
      );
      await lab
        .getByRole("button", { name: "Sırayı değiştir", exact: true })
        .tap();
      await compare(
        lab,
        "Öncül önce geliyor",
        "B etiketleri tanıtır, A bu etiketlere gider, C hızlı aramanın sonucunu verir; sıra B A C olur.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator('[data-node-index="0"]')).toContainText(
        "Arşiv görevlisi her deftere yıl etiketi ekledi.",
      );
      await expect(lab.locator('[data-node-index="1"]')).toContainText(
        "Bu etiketler aramayı daha hızlı kıldı.",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Sıra: B → A → C.",
      );
      await expect(lab.locator('svg [data-relation="1-0"]')).toHaveCount(0);
      await expect(lab.locator('svg [data-relation="0-1"]')).toHaveAttribute(
        "data-valid",
        "true",
      );
      await expect(lab.locator('svg [data-svg-node="0"]')).toHaveAttribute(
        "data-selected",
        "true",
      );
      await expect(lab.getByRole("status")).toContainText(
        "Seçimin bu bağlamla uyumlu.",
      );
      await readableWords(lab);
    },
  ),
];
