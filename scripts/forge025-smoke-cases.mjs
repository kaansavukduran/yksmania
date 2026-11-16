import { expect } from "@playwright/test";
import { readForge014SmokeState as readState } from "./forge014-smoke-cases.mjs";

// Literal oracles shared by Pages/Electron. Teaching data and model functions
// are deliberately not imported; each expected result is independently stated.
async function range(lab, name, value) {
  const input = lab.getByRole("slider", { name, exact: true });
  const min = Number(await input.getAttribute("min"));
  const max = Number(await input.getAttribute("max"));
  const step = Number((await input.getAttribute("step")) || 1);
  const current = Number(await input.inputValue());
  const start = [
    { at: current, key: "" },
    { at: min, key: "Home" },
    { at: max, key: "End" },
  ].sort((a, b) => Math.abs(a.at - value) - Math.abs(b.at - value))[0];
  if (start.key) await input.press(start.key);
  for (let i = 0; i < Math.round(Math.abs(value - start.at) / step); i++)
    await input.press(value > start.at ? "ArrowRight" : "ArrowLeft");
  await expect(input).toHaveValue(String(value));
}
const select = (lab, name, value) =>
  lab.getByRole("combobox", { name, exact: true }).selectOption(value);
const explain = (lab, name, text) =>
  lab.getByRole("textbox", { name, exact: true }).fill(text);
const click = (lab, name) =>
  lab.getByRole("button", { name, exact: true }).click();
const number = (lab, name, value) =>
  lab.getByRole("spinbutton", { name, exact: true }).fill(String(value));

export const forge025SmokeCases = [
  {
    family: "Math",
    id: "ayt-alan-riemann",
    exam: "AYT",
    title: "Alan ve Riemann: şerit, sınır ve geometrik büyüklük",
    storedKey: "forge025-math:ayt-alan-riemann",
    persisted: {
      fa: 1,
      fb: 0,
      fc: -1,
      ga: 0,
      gb: 0,
      gc: 0,
      areaLower: -2,
      areaUpper: 2,
      count: 8,
      method: "midpoint",
      guess: "greater",
      checked: true,
    },
    expected: [
      "Net integral 1,333333; geometrik alan 4.",
      "8 dikdörtgen, genişlik 0,5. Seçili toplam 1,25; toplam − gerçek integral -0,083333.",
    ],
    async act(lab) {
      for (const [label, value] of [
        ["f: x² katsayısı", 1],
        ["f: x katsayısı", 0],
        ["f: sabit", -1],
        ["g: x² katsayısı", 0],
        ["g: x katsayısı", 0],
        ["g: sabit", 0],
        ["Alan sol sınırı", -2],
        ["Alan sağ sınırı", 2],
        ["Dikdörtgen sayısı", 8],
      ])
        await range(lab, label, value);
      await select(lab, "Örnek seçimi", "midpoint");
      await select(lab, "Sonuç tahminin", "greater");
      await explain(
        lab,
        "Modelden gerekçen",
        "Fark x² − 1, −1 ve 1’de işaret değiştirir. Alan mutlak katkıları toplar; net integralde iptal vardır.",
      );
      await click(lab, "Kanıtı gör");
    },
    async assertModel(lab) {
      await expect(lab.locator("[data-riemann-rectangle]")).toHaveCount(8);
      await expect(
        lab.locator(".math025-negative[data-riemann-rectangle]"),
      ).toHaveCount(4);
      await expect(lab.locator("[data-area-root]")).toHaveCount(2);
      await expect(lab.locator('[data-area-root="-1"]')).toHaveCount(1);
      await expect(lab.locator('[data-area-root="1"]')).toHaveCount(1);
      const first = lab.locator("[data-riemann-rectangle]").first();
      await expect(first).toHaveAttribute("data-height", "2.0625");
      expect(Number(await first.getAttribute("x"))).toBeCloseTo(
        46.111111111111114,
        10,
      );
      expect(Number(await first.getAttribute("width"))).toBeCloseTo(
        22.22222222222222,
        10,
      );
      await expect(
        lab.locator('.math025-feedback[role="status"]'),
      ).toContainText("Tahminin bu koşullarla uyumlu.");
    },
  },
  {
    family: "Chem",
    id: "ayt-enerji-kaynaklari-gelismeler",
    exam: "AYT",
    title: "Enerji Kaynakları ve Bilimsel Gelişmeler",
    storedKey: "forge025:chemistry:ayt-enerji-kaynaklari-gelismeler",
    persisted: {
      energyMode: "hydrogen",
      fuel: "hydrogen",
      electric: 60,
      electrolysis: 80,
      cell: 50,
      guess: "24",
      checked: true,
    },
    expected: ["Taşıyıcı çevrimi", "2 H₂O → 2 H₂ + O₂", "2 H₂ + O₂ → 2 H₂O"],
    async act(lab) {
      await select(lab, "Enerji modeli", "fuel");
      await select(lab, "Saf yakıt modeli", "hydrogen");
      await expect(lab.locator("[data-model-result]")).toHaveAttribute(
        "data-co2",
        "0",
      );
      await expect(lab.locator('[data-quantity="co2"]')).toHaveAttribute(
        "width",
        "0",
      );
      await select(lab, "Enerji modeli", "hydrogen");
      await range(lab, "Başlangıç elektriği (MJ)", 60);
      await range(lab, "Elektroliz verimi (%)", 80);
      await range(lab, "Yakıt pili verimi (%)", 50);
      await select(lab, "Geri alınan elektrik (MJ)", "24");
      await explain(
        lab,
        "Gerekçen",
        "60 × 0,80 × 0,50 = 24 MJ. İki dönüşümde verimler çarpılır; kalan enerji başka türlere aktarılır.",
      );
      await click(lab, "Kıyasla");
    },
    async assertModel(lab) {
      const result = lab.locator("[data-model-result]");
      await expect(result).toHaveAttribute("data-mode", "hydrogen");
      await expect(result).toHaveAttribute("data-output", "24");
      await expect(result).toHaveAttribute("data-efficiency", "40");
      await expect(result).toHaveAttribute("data-balanced", "true");
      for (const [key, value, width] of [
        ["electric", "60", "150"],
        ["chemical", "48", "120"],
        ["output", "24", "60"],
      ]) {
        await expect(lab.locator(`[data-bar="${key}"]`)).toHaveAttribute(
          "data-value",
          value,
        );
        await expect(lab.locator(`[data-quantity="${key}"]`)).toHaveAttribute(
          "width",
          width,
        );
      }
      await expect(lab.locator('.c025-feedback[role="status"]')).toContainText(
        "Kanıtla uyumlu.",
      );
    },
  },
  {
    family: "Biology",
    id: "bitkilerde-dollenme-cimlenme",
    exam: "AYT",
    title: "Bitkilerde Döllenme ve Çimlenme",
    storedKey: "forge025-biology-bitkilerde-dollenme-cimlenme",
    persisted: {
      view: "germination",
      profile: "bean",
      temperature: 25,
      water: 60,
      oxygen: 60,
      light: false,
      dormant: false,
      viable: true,
      day: 7,
      guess: "yes",
      checked: true,
    },
    expected: ["Koşul kapıları açık", "Işık sinyali isteği: Bu profilde yok"],
    async act(lab) {
      await select(lab, "İnceleme", "germination");
      await select(lab, "Tohum profili", "bean");
      for (const [label, value] of [
        ["Sıcaklık (°C)", 25],
        ["Su erişim endeksi", 60],
        ["Oksijen erişim endeksi", 0],
        ["Gözlem günü", 7],
      ])
        await number(lab, label, value);
      await lab
        .getByRole("checkbox", { name: "Işık var", exact: true })
        .uncheck();
      await lab
        .getByRole("checkbox", { name: "Dormansi sürüyor", exact: true })
        .uncheck();
      await lab
        .getByRole("checkbox", { name: "Embriyo canlı", exact: true })
        .check();
      await expect(lab.locator("[data-model-result]")).toHaveAttribute(
        "data-conditions",
        "false",
      );
      await expect(lab.locator("[data-shoot-path]")).toHaveCount(0);
      await number(lab, "Oksijen erişim endeksi", 60);
      await select(lab, "Bu sabit koşullarda büyüme birikir mi?", "yes");
      await explain(
        lab,
        "Gerekçen",
        "Canlı, dormansisiz fasulyede su, oksijen ve sıcaklık uygun. İlk büyüme depo besinle olur; ışık kapısı aranmaz.",
      );
      await click(lab, "Kıyasla");
    },
    async assertModel(lab) {
      const result = lab.locator("[data-model-result]");
      for (const [key, value] of [
        ["data-conditions", "true"],
        ["data-progress", "1"],
        ["data-root", "1"],
        ["data-shoot", "1"],
      ])
        await expect(result).toHaveAttribute(key, value);
      await expect(lab.locator("[data-root-path]")).toHaveAttribute(
        "data-root-extent",
        "1",
      );
      await expect(lab.locator("[data-root-path]")).toHaveAttribute(
        "d",
        "M125 114 Q110 150 125 177",
      );
      await expect(lab.locator("[data-shoot-path]")).toHaveAttribute(
        "data-shoot-extent",
        "1",
      );
      await expect(lab.locator("[data-shoot-path]")).toHaveAttribute(
        "d",
        "M125 90 Q115 60 130 25",
      );
      await expect(lab.locator("[data-leaf-path]")).toHaveCount(1);
      await expect(lab.locator('.b025-feedback[role="status"]')).toContainText(
        "Kanıtla uyumlu.",
      );
    },
  },
  {
    family: "Human",
    id: "islam-dusuncesinde-tasavvufi-yorumlar",
    exam: "TYT",
    title: "İslam düşüncesinde tasavvufi yorumlar",
    storedKey: "forge025-humanities:islam-dusuncesinde-tasavvufi-yorumlar",
    persisted: { record: 0, target: 1, detail: true, reveal: true },
    expected: [
      "Bilgi açık: Dergâh",
      "Aynı olaya ait ek kayıt şu bilgiyi verir: Dergâh",
    ],
    async act(lab) {
      await select(lab, "Olay kaydı", "0");
      await select(lab, "Aranan bilgi türü", "1");
      await lab
        .getByRole("checkbox", {
          name: "Aynı olaya ait ek kayıt var",
          exact: true,
        })
        .check();
      await explain(
        lab,
        "Gerekçen",
        "İlk not mekânı söylemez. Aynı olayın ek kaydı dergâhı açıkça verir; ilk kaydın boşluğunu bu veri tamamlar.",
      );
      await click(lab, "Gerekçemle karşılaştır");
    },
    async assertModel(lab) {
      const graph = lab.locator("svg[data-evidence-diagram]");
      await expect(graph.locator(".humanities025-link")).toHaveCount(2);
      await expect(graph.locator(".humanities025-link.is-missing")).toHaveCount(
        1,
      );
      await expect(
        graph.locator(".humanities025-link").first(),
      ).toHaveAttribute("d", "M250,72 C270,72 270,380 250,380");
      await expect(graph.locator(".humanities025-link").last()).toHaveAttribute(
        "d",
        "M135,278 L135,328",
      );
      await expect(graph.locator("g")).toHaveCount(3);
      await expect(
        lab.getByRole("checkbox", {
          name: "Aynı olaya ait ek kayıt var",
          exact: true,
        }),
      ).toBeChecked();
    },
  },
];

// Reading positions and bookmarks remain outside scored learning evidence.
const learning = (s) => ({
  sessions: s.sessions,
  reviews: s.reviews,
  theoryReviewCompletions: s.theoryReviewCompletions,
  topicProgress: s.topicProgress,
  unlocked: s.unlocked,
  draft: s.draft,
  examDraft: s.examDraft,
  examSessions: s.examSessions,
});
async function open(page, navigate, unit) {
  await navigate("Konu Anlatımı");
  await page.getByRole("button", { name: unit.exam, exact: true }).click();
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill(unit.title);
  await page.locator(`.ready-topic[data-lesson-id="${unit.id}"]`).click();
  const lab = page.locator(`[data-forge025="${unit.id}"]`);
  await expect(lab).toBeVisible();
  await expect(lab.locator("svg").first()).toBeVisible();
  return lab;
}
async function outcome(lab, unit) {
  const result = lab.locator("[data-model-result]").first();
  await expect(result).toBeVisible();
  expect(await result.evaluate((e) => e.namespaceURI)).toBe(
    "http://www.w3.org/1999/xhtml",
  );
  for (const text of unit.expected) await expect(result).toContainText(text);
  await unit.assertModel(lab);
}
export async function runForge025SmokeCase(page, navigate, unit) {
  await expect.poll(() => page.evaluate(() => navigator.onLine)).toBe(false);
  const before = learning(await readState(page));
  const lab = await open(page, navigate, unit);
  const svg = lab.locator("svg").first(),
    old = await svg.innerHTML();
  await unit.act(lab);
  await outcome(lab, unit);
  expect(await svg.innerHTML()).not.toBe(old);
  await expect
    .poll(async () => (await readState(page)).explorations[unit.storedKey])
    .toMatchObject(unit.persisted);
  const saved = (await readState(page)).explorations[unit.storedKey];
  expect(saved.reason.trim().length).toBeGreaterThan(0);
  expect(learning(await readState(page))).toEqual(before);
  await page.reload();
  await outcome(await open(page, navigate, unit), unit);
  expect((await readState(page)).explorations[unit.storedKey]).toEqual(saved);
  expect(learning(await readState(page))).toEqual(before);
  return { id: unit.id, storedKey: unit.storedKey, saved };
}
export async function assertForge025ProcessRestart(page, navigate, snapshots) {
  await expect.poll(() => page.evaluate(() => navigator.onLine)).toBe(false);
  expect(snapshots).toHaveLength(4);
  const before = learning(await readState(page));
  for (const snapshot of snapshots) {
    const unit = forge025SmokeCases.find((u) => u.id === snapshot.id);
    expect(unit).toBeTruthy();
    expect(snapshot.storedKey).toBe(unit.storedKey);
    expect((await readState(page)).explorations[snapshot.storedKey]).toEqual(
      snapshot.saved,
    );
    await outcome(await open(page, navigate, unit), unit);
    expect((await readState(page)).explorations[snapshot.storedKey]).toEqual(
      snapshot.saved,
    );
  }
  expect(learning(await readState(page))).toEqual(before);
}
