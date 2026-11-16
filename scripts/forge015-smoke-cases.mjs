import { expect } from "@playwright/test";
import { readForge014SmokeState as readState } from "./forge014-smoke-cases.mjs";

// Plain JavaScript acceptance cases shared by Pages and the real Electron app.
// Expected values below are authored literals, independent of the app's models.
async function setRange(lab, label, value) {
  const input = lab.getByRole("slider", { name: label, exact: true });
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

export const forge015SmokeCases = [
  {
    id: "veri-analizi",
    exam: "TYT",
    title: "Veri analizi: gözlemden ölçüye, ölçüden yoruma",
    storedKey: "forge015-math-statistics",
    persisted: { dataset: "1;3;3;13" },
    expected: [
      "Gözlem sayısı: 4 · Toplam: 20",
      "Ortalama: 5 · Ortanca: 3 · Açıklık: 12",
    ],
    async act(lab) {
      await lab
        .getByRole("textbox", { name: "Ham gözlemler", exact: true })
        .fill("1;3;3;13");
    },
    async assertModel(lab) {
      await expect(lab.locator("[data-stat-point]")).toHaveCount(4);
      await expect(lab.locator("[data-stat-mean]")).toHaveAttribute(
        "data-value",
        "5",
      );
      await expect(lab.locator("[data-stat-median]")).toHaveAttribute(
        "data-value",
        "3",
      );
    },
  },
  {
    id: "vektorler",
    exam: "AYT",
    title: "Vektörler: yönü koru, bileşenlerle düşün",
    storedKey: "forge015-physics-vektorler",
    persisted: { operation: "scale", scalar: -1 },
    expected: ["Sonuç: (-3; -4) N", "Norm: 5 N"],
    async act(lab) {
      await lab.getByRole("button", { name: "Dengele", exact: true }).click();
      await expect(lab.locator('[data-vector-zero="result"]')).toHaveCount(1);
      await lab
        .getByRole("button", { name: "Tersini al", exact: true })
        .click();
    },
    async assertModel(lab) {
      await expect(lab.locator('[data-vector="result"]')).toHaveAttribute(
        "d",
        "M350 200L256.25 325",
      );
    },
  },
  {
    id: "gercek-kutle-akb-nk",
    exam: "TYT",
    title: "Gerçek kütle, atomik kütle birimi ve koşullu gaz hacmi",
    storedKey: "forge015:chemistry:gercek-kutle-akb-nk",
    persisted: { pressure: 2 },
    expected: ["11,2 L", "32 g"],
    async act(lab) {
      await setRange(lab, "Basınç (atm)", 2);
    },
    async assertModel(lab) {
      expect(
        Number(
          await lab
            .locator("[data-current-volume]")
            .getAttribute("data-current-volume"),
        ),
      ).toBeCloseTo(11.2, 8);
    },
  },
  {
    id: "genetik-cesitlilik",
    exam: "AYT",
    title: "Genetik çeşitlilik: yeni alel mi, yeni birleşim mi?",
    storedKey: "forge015-bio-genetik-cesitlilik",
    persisted: { event: "mutation", line: "germline", selectedGamete: true },
    expected: ["seçili zigot varyantı taşır."],
    async act(lab) {
      await lab
        .getByRole("combobox", { name: "Genetik olay kartı", exact: true })
        .selectOption("mutation");
      await lab
        .getByRole("combobox", {
          name: "Değişimin izlendiği hücre soyu",
          exact: true,
        })
        .selectOption("germline");
      await lab
        .getByRole("checkbox", {
          name: "Varyantı taşıyan gamet bu seçili döllenmede kullanılıyor",
          exact: true,
        })
        .check();
    },
    async assertModel(lab) {
      await expect(lab.locator("[data-after-dna]")).toHaveText("ATAC");
      await expect(lab.locator("[data-selected-zygote]")).toHaveAttribute(
        "data-selected-zygote",
        "true",
      );
    },
  },
  {
    id: "turkiye-iklimi",
    exam: "TYT",
    title: "Türkiye iklimi: kıyıdan dağın ardına değişen koşullar",
    storedKey: "forge015-geo-turkiye-iklimi",
    persisted: {
      elevation: 1800,
      station: "central",
      corridor: "corridor",
      aspect: "north",
    },
    expected: ["20 − 9 = 11 °C"],
    async act(lab) {
      await lab
        .getByRole("combobox", { name: "Bölge örneği", exact: true })
        .selectOption("central");
      await lab
        .getByRole("combobox", { name: "Dağ düzeni", exact: true })
        .selectOption("corridor");
      await lab
        .getByRole("combobox", { name: "Yamaç bakısı", exact: true })
        .selectOption("north");
      const n = lab.getByRole("spinbutton", {
        name: "İdeal yükseklik (m), sayıyla",
        exact: true,
      });
      await n.fill("");
      await n.pressSequentially("1800");
      await n.press("Enter");
    },
    async assertModel(lab) {
      await expect(
        lab.getByRole("slider", { name: "İdeal yükseklik (m)", exact: true }),
      ).toHaveValue("1800");
      await expect(
        lab.locator('svg circle.g015-dot[cx="345"]'),
      ).toHaveAttribute("cy", "120");
    },
  },
  {
    id: "fiilimsiler",
    exam: "TYT",
    title: "Fiilimsiler: eki, kökü ve görevi birlikte oku",
    storedKey: "forge015-turkish:fiilimsiler",
    persisted: {
      pair: "adlasma",
      changed: true,
      guess: "Adlaşmış sıfat-fiil",
      compared: true,
    },
    expected: ["Adlaşmış sıfat-fiil", "gel-en-ler"],
    async act(lab) {
      await lab
        .getByRole("combobox", { name: "İncelenen cümle çifti", exact: true })
        .selectOption("adlasma");
      await lab
        .getByRole("button", { name: "Cümleyi dönüştür", exact: true })
        .click();
      await lab
        .getByRole("combobox", { name: "Görev tahminin", exact: true })
        .selectOption("Adlaşmış sıfat-fiil");
      await lab
        .getByRole("textbox", { name: "Cümleden gerekçen", exact: true })
        .fill(
          "Gelen kişilerdeki kişiler adı düşmüş; gelen eyleminden gelen niteleme sürüyor.",
        );
      await lab
        .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
        .click();
    },
    async assertModel(lab) {
      await expect(lab.locator(".turkish015-sentence")).toHaveText(
        "Gelenler bekledi.",
      );
      await expect(lab.locator('svg [data-relation="0-1"]')).toHaveCount(1);
      await expect(lab.getByRole("status")).toContainText(
        "Seçimin bu bağlamla uyumlu.",
      );
    },
  },
];
const learning = (state) => ({
  sessions: state.sessions,
  reviews: state.reviews,
  theoryReviewCompletions: state.theoryReviewCompletions,
  topicProgress: state.topicProgress,
  unlocked: state.unlocked,
});
async function open(page, navigate, unit) {
  await navigate("Konu Anlatımı");
  await page.getByRole("button", { name: unit.exam, exact: true }).click();
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill(unit.title);
  await page.locator(`.ready-topic[data-lesson-id="${unit.id}"]`).click();
  const lab = page.locator(`[data-forge015="${unit.id}"]`);
  await expect(lab).toBeVisible();
  await expect(lab.locator("svg").first()).toBeVisible();
  return lab;
}
async function assertOutcome(lab, unit) {
  const result = lab.locator("[data-model-result]");
  await expect(result).toBeVisible();
  expect(await result.evaluate((e) => e.namespaceURI)).toBe(
    "http://www.w3.org/1999/xhtml",
  );
  for (const text of unit.expected) await expect(result).toContainText(text);
  await unit.assertModel(lab);
}
export async function runForge015SmokeCase(page, navigate, unit) {
  await expect.poll(() => page.evaluate(() => navigator.onLine)).toBe(false);
  const beforeLearning = learning(await readState(page));
  const lab = await open(page, navigate, unit);
  const model = lab.locator("svg").first();
  const before = await model.innerHTML();
  await unit.act(lab);
  await assertOutcome(lab, unit);
  expect(await model.innerHTML()).not.toBe(before);
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await expect
    .poll(async () => (await readState(page)).explorations[unit.storedKey])
    .toMatchObject(unit.persisted);
  const saved = (await readState(page)).explorations[unit.storedKey];
  expect(learning(await readState(page))).toEqual(beforeLearning);
  await page.reload();
  await assertOutcome(page.locator(`[data-forge015="${unit.id}"]`), unit);
  const after = await readState(page);
  expect(after.explorations[unit.storedKey]).toEqual(saved);
  expect(learning(after)).toEqual(beforeLearning);
  return { id: unit.id, storedKey: unit.storedKey, saved };
}
export async function assertForge015ProcessRestart(page, navigate, snapshots) {
  await expect.poll(() => page.evaluate(() => navigator.onLine)).toBe(false);
  const beforeLearning = learning(await readState(page));
  expect(snapshots).toHaveLength(6);
  for (const snapshot of snapshots) {
    const unit = forge015SmokeCases.find((entry) => entry.id === snapshot.id);
    expect((await readState(page)).explorations[snapshot.storedKey]).toEqual(
      snapshot.saved,
    );
    const lab = await open(page, navigate, unit);
    await assertOutcome(lab, unit);
    expect((await readState(page)).explorations[snapshot.storedKey]).toEqual(
      snapshot.saved,
    );
  }
  expect(learning(await readState(page))).toEqual(beforeLearning);
}
