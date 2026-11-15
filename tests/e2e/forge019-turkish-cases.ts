import { expect, type Locator } from "@playwright/test";
import { forge019TurkishLessons } from "../../src/learning/forge019Turkish";
import { forge019Case } from "./forge019-case-helper";
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
      [".turkish019-compare", "Tahminimi"],
      [".turkish019-compare", "karşılaştır"],
      [".turkish019-feedback strong", "Seçimin"],
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
export const turkish019Cases = [
  forge019Case(
    forge019TurkishLessons,
    "yardimci-dusunce",
    "forge019-turkish:yardimci-dusunce",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "İncelenen örnek", exact: true })
        .selectOption("kutuphane");
      await expect(lab.locator('svg [data-relation="0-3"]')).toHaveAttribute(
        "data-valid",
        "false",
      );
      await lab
        .getByRole("combobox", { name: "İncelenen iddia", exact: true })
        .selectOption("1");
      await compare(
        lab,
        "Destek var",
        "Haftalık sözü düzenli tekrarı ve başladı sözü başlatılmayı verir; ikisi üçüncü cümlede açık.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator(".turkish019-claim")).toContainText(
        "Çocuklar için düzenli bir etkinlik başladı.",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Her hafta sözü düzenli tekrarı",
      );
      await expect(lab.locator('svg [data-relation="2-3"]')).toHaveAttribute(
        "data-valid",
        "true",
      );
      await expect(lab.locator('svg [data-relation="0-3"]')).toHaveCount(0);
      await expect(lab.getByRole("status")).toContainText(
        "Seçimin bu bağlamla uyumlu.",
      );
      await readableWords(lab);
    },
  ),
  forge019Case(
    forge019TurkishLessons,
    "ikiye-bolme",
    "forge019-turkish:ikiye-bolme",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "İncelenen örnek", exact: true })
        .selectOption("arsiv");
      await expect(lab.locator('svg [data-relation="0-1"]')).toHaveAttribute(
        "data-valid",
        "false",
      );
      await lab
        .getByRole("combobox", {
          name: "İkinci paragrafın başlangıcı",
          exact: true,
        })
        .selectOption("3");
      await compare(
        lab,
        "İki odak ayrıldı",
        "İlk üç cümle fiziksel korumayı, son iki cümle erişimi açıklar; yeni paragraf IV ile başlar.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator('[data-paragraph-block="0"]')).toContainText(
        "Düzenli ölçüm fiziksel yıpranmayı erken gösterir.",
      );
      await expect(lab.locator('[data-paragraph-block="0"]')).not.toContainText(
        "Dijital kataloglar",
      );
      await expect(lab.locator('[data-paragraph-block="1"]')).toContainText(
        "Dijital kataloglar belgeye erişimi daha kolay kılar.",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "İkinci paragraf IV. cümleyle başlar",
      );
      await expect(lab.locator('svg [data-relation="0-1"]')).toHaveAttribute(
        "data-valid",
        "true",
      );
      await expect(lab.getByRole("status")).toContainText(
        "Seçimin bu bağlamla uyumlu.",
      );
      await readableWords(lab);
    },
  ),
  forge019Case(
    forge019TurkishLessons,
    "akisi-bozan-cumle",
    "forge019-turkish:akisi-bozan-cumle",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "İncelenen örnek", exact: true })
        .selectOption("yagmur");
      await lab
        .getByRole("combobox", { name: "Çıkarma deneyi", exact: true })
        .selectOption("2");
      await expect(lab.locator('svg [data-relation="1-3"]')).toHaveAttribute(
        "data-valid",
        "false",
      );
      await lab
        .getByRole("combobox", { name: "Çıkarma deneyi", exact: true })
        .selectOption("3");
      await compare(
        lab,
        "Akış düzeldi",
        "Sergi suyu kullanma zincirine katılmaz; III çıkınca kap ile bu kap bağı korunur ve kullanım sürer.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator('[data-node-index="2"]')).toHaveAttribute(
        "data-excluded",
        "true",
      );
      await expect(lab.locator(".turkish019-passage")).toContainText(
        "Okul sergisi cuma günü açılacak.",
      );
      await expect(lab.locator('[data-paragraph-block="0"]')).not.toContainText(
        "sergisi",
      );
      await expect(lab.locator('[data-paragraph-block="0"]')).toContainText(
        "Bu kap haftada bir temizlenir.",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "III. cümle çıkarılınca ilgisiz bilgi ayrılır",
      );
      await expect(lab.locator('svg [data-relation="1-3"]')).toHaveAttribute(
        "data-valid",
        "true",
      );
      await expect(lab.getByRole("status")).toContainText(
        "Seçimin bu bağlamla uyumlu.",
      );
      await readableWords(lab);
    },
  ),
];
