import { expect, type Locator } from "@playwright/test";
import { forge023TurkishLessons } from "../../src/learning/forge023Turkish";
import { forge023Case } from "./forge023-case-helper";
async function compare(lab: Locator, decision: string, reason: string) {
  await lab
    .getByRole("combobox", { name: "Karar tahminin", exact: true })
    .selectOption(decision);
  const field = lab.getByRole("textbox", {
    name: "Metinden gerekçen",
    exact: true,
  });
  await expect(field).toHaveAttribute("maxlength", "120");
  await field.fill(reason);
  await lab
    .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
    .tap();
}
async function geometry(lab: Locator) {
  const g = await lab.evaluate((root) => {
    const r = root.getBoundingClientRect(),
      svg = root.querySelector("svg")!,
      s = svg.getBoundingClientRect(),
      m = svg.getScreenCTM()!;
    const texts = [...svg.querySelectorAll("text")].map((t) => {
      const b = t.getBoundingClientRect();
      return {
        text: t.textContent,
        left: b.left,
        right: b.right,
        top: b.top,
        bottom: b.bottom,
        px: parseFloat(getComputedStyle(t).fontSize) * Math.hypot(m.a, m.b),
      };
    });
    const controls = [...root.querySelectorAll("button,select,textarea")].map(
      (c) => ({
        width: c.getBoundingClientRect().width,
        height: c.getBoundingClientRect().height,
      }),
    );
    const words: { word: string; lines: number }[] = [];
    for (const e of root.querySelectorAll("p,button,label,legend,h3,strong")) {
      const w = document.createTreeWalker(e, NodeFilter.SHOW_TEXT);
      let n: Node | null;
      while ((n = w.nextNode()))
        for (const match of (n.textContent || "").matchAll(/\S+/g)) {
          const range = document.createRange();
          range.setStart(n, match.index!);
          range.setEnd(n, match.index! + match[0].length);
          words.push({
            word: match[0],
            lines: [...range.getClientRects()].filter((v) => v.width > 0)
              .length,
          });
        }
    }
    return {
      client: root.clientWidth,
      scroll: root.scrollWidth,
      left: r.left,
      right: r.right,
      viewport: innerWidth,
      s: { left: s.left, right: s.right, top: s.top, bottom: s.bottom },
      texts,
      controls,
      words,
    };
  });
  expect(g.scroll).toBeLessThanOrEqual(g.client + 1);
  expect(g.left).toBeGreaterThanOrEqual(-1);
  expect(g.right).toBeLessThanOrEqual(g.viewport + 1);
  for (const c of g.controls) {
    expect(c.width).toBeGreaterThanOrEqual(44);
    expect(c.height).toBeGreaterThanOrEqual(44);
  }
  for (const t of g.texts) {
    expect(t.px, t.text || "SVG").toBeGreaterThanOrEqual(16);
    expect(t.left).toBeGreaterThanOrEqual(g.s.left - 1);
    expect(t.right).toBeLessThanOrEqual(g.s.right + 1);
    expect(t.top).toBeGreaterThanOrEqual(g.s.top - 1);
    expect(t.bottom).toBeLessThanOrEqual(g.s.bottom + 1);
  }
  for (const word of g.words) expect(word.lines, word.word).toBe(1);
}
export const turkish023Cases = [
  forge023Case(
    forge023TurkishLessons,
    "paragrafta-soru-cevap",
    "forge023-turkish:paragrafta-soru-cevap",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "İncelenen metin", exact: true })
        .selectOption("exhibit");
      await lab
        .getByRole("combobox", { name: "İncelenen soru", exact: true })
        .selectOption("1");
      await lab
        .getByRole("button", {
          name: "2. cümle Açılış ertelendi; salonun denetimi bitmemişti.",
          exact: true,
        })
        .tap();
      await compare(
        lab,
        "Yanıt var",
        "Soru ertelemenin nedenini istiyor; ikinci cümle denetimin bitmemesini gerekçe olarak veriyor.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("svg[data-answer-graph]")).toHaveAttribute(
        "data-question",
        "1",
      );
      await expect(lab.locator("svg[data-answer-graph]")).toHaveAttribute(
        "data-evidence",
        "1",
      );
      await expect(lab.locator('[data-sentence="1"]')).toHaveAttribute(
        "data-support",
        "true",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Salonun denetimi bitmediği için.",
      );
      await expect(
        lab.locator('.turkish023-feedback[role="status"]'),
      ).toContainText("Tahminin kanıtla aynı yönde.");
      await expect(
        lab.getByRole("button", {
          name: "2. cümle Açılış ertelendi; salonun denetimi bitmemişti.",
          exact: true,
        }),
      ).toHaveAttribute("aria-pressed", "true");
      await geometry(lab);
    },
    "svg[data-answer-graph]",
  ),
  forge023Case(
    forge023TurkishLessons,
    "paragrafta-roportaj",
    "forge023-turkish:paragrafta-roportaj",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "Takip sorusu", exact: true })
        .selectOption("2");
      await lab
        .getByRole("button", { name: "Yanıtı dinle", exact: true })
        .tap();
      await lab
        .getByRole("button", { name: "Ayrıntıyı aç", exact: true })
        .tap();
      await expect(lab.locator('svg [data-relation="0"]')).toHaveAttribute(
        "data-valid",
        "false",
      );
      await expect(lab.locator('svg [data-relation="1"]')).toHaveAttribute(
        "data-valid",
        "true",
      );
      await lab
        .getByRole("button", { name: "Kanıtı göster", exact: true })
        .tap();
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Kayıt, mevcut izi not eder; boya ise yüzeye etki eder.",
      );
      await lab
        .getByRole("combobox", { name: "İncelenen görüşme", exact: true })
        .selectOption("research");
      await lab
        .getByRole("combobox", { name: "Takip sorusu", exact: true })
        .selectOption("1");
      await lab
        .getByRole("button", { name: "Yanıtı dinle", exact: true })
        .tap();
      await lab
        .getByRole("button", { name: "Ayrıntıyı aç", exact: true })
        .tap();
      await compare(
        lab,
        "Yeni gerekçe",
        "Ölçüt ilk yanıtta vardı; şimdi yanlış kişi veya tarih atamayı azaltma amacı açıklandı.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-dialogue-model]")).toHaveAttribute(
        "data-turn",
        "2",
      );
      await expect(lab.locator("[data-dialogue-model]")).toHaveAttribute(
        "data-branch",
        "1",
      );
      await expect(lab.locator("[data-dialogue-model] > div")).toHaveCount(6);
      await expect(lab.locator("[data-dialogue-model]")).toContainText(
        "ortak hataya",
      );
      await expect(lab.locator('svg [data-relation="1"]')).toHaveAttribute(
        "data-active",
        "true",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Yeni gerekçe",
      );
      await expect(
        lab.locator('.turkish023-feedback[role="status"]'),
      ).toContainText("Tahminin kanıtla aynı yönde.");
      await geometry(lab);
    },
    "[data-dialogue-model]",
  ),
];
