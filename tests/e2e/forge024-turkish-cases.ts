import { expect, type Locator } from "@playwright/test";
import { forge024TurkishLessons } from "../../src/learning/forge024Turkish";
import { forge024Case } from "./forge024-case-helper";
async function compare(lab: Locator, value: string, reason: string) {
  await lab
    .getByRole("combobox", { name: "Karar tahminin", exact: true })
    .selectOption(value);
  await lab.getByRole("textbox", { name: "Kanıtın", exact: true }).fill(reason);
  await lab
    .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
    .tap();
}
async function geometry(lab: Locator) {
  const g = await lab.evaluate((root) => {
    const r = root.getBoundingClientRect(),
      svg = root.querySelector<SVGSVGElement>("svg")!,
      s = svg.getBoundingClientRect(),
      m = svg.getScreenCTM()!;
    return {
      client: root.clientWidth,
      scroll: root.scrollWidth,
      left: r.left,
      right: r.right,
      viewport: innerWidth,
      s: { left: s.left, right: s.right, top: s.top, bottom: s.bottom },
      texts: [...svg.querySelectorAll("text")].map((t) => {
        const b = t.getBoundingClientRect();
        return {
          text: t.textContent,
          left: b.left,
          right: b.right,
          top: b.top,
          bottom: b.bottom,
          px: parseFloat(getComputedStyle(t).fontSize) * Math.hypot(m.a, m.b),
        };
      }),
      controls: [...root.querySelectorAll("button,select,textarea")].map(
        (c) => ({
          w: c.getBoundingClientRect().width,
          h: c.getBoundingClientRect().height,
        }),
      ),
    };
  });
  expect(g.scroll).toBeLessThanOrEqual(g.client + 1);
  expect(g.left).toBeGreaterThanOrEqual(-1);
  expect(g.right).toBeLessThanOrEqual(g.viewport + 1);
  for (const c of g.controls) {
    expect(c.w).toBeGreaterThanOrEqual(44);
    expect(c.h).toBeGreaterThanOrEqual(44);
  }
  for (const t of g.texts) {
    expect(t.px, t.text || "SVG").toBeGreaterThanOrEqual(16);
    expect(t.left).toBeGreaterThanOrEqual(g.s.left - 1);
    expect(t.right).toBeLessThanOrEqual(g.s.right + 1);
    expect(t.top).toBeGreaterThanOrEqual(g.s.top - 1);
    expect(t.bottom).toBeLessThanOrEqual(g.s.bottom + 1);
  }
}
export const turkish024Cases = [
  forge024Case(
    forge024TurkishLessons,
    "paragrafta-coklu-sorular",
    "forge024-turkish:paragrafta-coklu-sorular",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "İncelenen örnek", exact: true })
        .selectOption("greenhouse");
      await lab
        .getByRole("combobox", { name: "İncelenen soru", exact: true })
        .selectOption("0");
      await lab
        .getByRole("button", { name: /^2\. Amaç, sıcak günlerde/ })
        .tap();
      await compare(
        lab,
        "yes",
        "İkinci cümle gölgeliğin kurulma amacını veriyor.",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "ışığı gerekirse azaltmak",
      );
      await lab
        .getByRole("combobox", { name: "İncelenen soru", exact: true })
        .selectOption("2");
      await expect(
        lab.getByRole("combobox", { name: "Karar tahminin", exact: true }),
      ).toHaveValue("");
      await expect(
        lab.getByRole("textbox", { name: "Kanıtın", exact: true }),
      ).toHaveValue("");
      await expect(lab.locator("[data-model-result]")).toHaveCount(0);
      await expect(lab.locator("fieldset li")).toHaveCount(5);
      await lab
        .getByRole("button", { name: /^4\. Fidanların büyüme hızı/ })
        .tap();
      await compare(
        lab,
        "yes",
        "Dördüncü cümle büyümenin ölçülmediğini, son cümle ayrı izlemeyi veriyor.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Bu verilerle kesin bir sonuç yok.",
      );
      await expect(lab.locator('[data-sentence="3"]')).toHaveAttribute(
        "data-support",
        "true",
      );
      await expect(lab.locator('[data-sentence="4"]')).toHaveAttribute(
        "data-support",
        "true",
      );
      await expect(lab.locator('[data-sentence="1"]')).toHaveAttribute(
        "data-support",
        "false",
      );
      await geometry(lab);
    },
    "svg[data-evidence-graph]",
  ),
  forge024Case(
    forge024TurkishLessons,
    "paragrafta-konu",
    "forge024-turkish:paragrafta-konu",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "İncelenen örnek", exact: true })
        .selectOption("diary");
      await lab
        .getByRole("combobox", { name: "Konu adayı", exact: true })
        .selectOption("0");
      await lab
        .getByRole("button", { name: /^3\. Yönetmen bu notlarla/ })
        .tap();
      await compare(
        lab,
        "uygun",
        "Bütün cümleler günlüğün sahne kararını izleme işlevini açıklıyor.",
      );
      await lab
        .getByRole("combobox", { name: "Konu adayı", exact: true })
        .selectOption("1");
      await expect(lab.locator("[data-model-result]")).toHaveCount(0);
      await lab
        .getByRole("button", { name: /^3\. Yönetmen bu notlarla/ })
        .tap();
      await compare(
        lab,
        "geniş",
        "Tiyatro genel alan; bu kısa metin bütün tarihi değil prova günlüğünü anlatıyor.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Çok geniş konu",
      );
      await expect(lab.locator("[data-evidence-text]")).toContainText("4/4");
      await expect(lab.locator('svg [data-support="true"]')).toHaveCount(4);
      await expect(lab.locator("fieldset li")).toHaveCount(4);
      await geometry(lab);
    },
    "svg[data-evidence-graph]",
  ),
  forge024Case(
    forge024TurkishLessons,
    "metin-tablo-gorsel-yorumlama",
    "forge024-turkish:metin-tablo-gorsel-yorumlama",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "İncelenen örnek", exact: true })
        .selectOption("studio");
      await lab
        .getByRole("combobox", { name: "Ölçü", exact: true })
        .selectOption("0");
      await compare(
        lab,
        "single",
        "İlk oturumda katılım sayıları24,48,32; tek lider B.",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Tek lider var",
      );
      await lab
        .getByRole("combobox", { name: "Ölçü", exact: true })
        .selectOption("1");
      await expect(lab.locator("[data-model-result]")).toHaveCount(0);
      await compare(
        lab,
        "tie",
        "Üç katılım da kendi kapasitesinin yarısıdır; doluluklar eşittir.",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Eşit liderler var",
      );
      await lab
        .getByRole("combobox", { name: "İncelenen örnek", exact: true })
        .selectOption("print");
      await lab
        .getByRole("combobox", { name: "Ölçü", exact: true })
        .selectOption("1");
      await lab
        .getByRole("combobox", { name: "Dönem", exact: true })
        .selectOption("2");
      await compare(
        lab,
        "tie",
        "A ve C63/108, B54/108; toplam oranlarda A ve C birlikte en büyük.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Eşit liderler var",
      );
      await expect(lab.locator("[data-records] article")).toHaveCount(3);
      await expect(lab.locator("[data-records] article").first()).toContainText(
        "108 yer",
      );
      await expect(lab.locator("[data-records] article").first()).toContainText(
        "63 kayıt",
      );
      await expect(lab.locator('svg [data-record="A"]')).toHaveAttribute(
        "data-value",
        String((100 * 63) / 108),
      );
      await expect(lab.locator("svg[data-record-chart]")).toHaveAttribute(
        "data-metric",
        "1",
      );
      await geometry(lab);
    },
    "svg[data-record-chart]",
  ),
];
