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

export const forge019SmokeCases = [
  {
    id: "solunum-organlar",
    exam: "AYT",
    title: "Solunum organları: hava yolundan alveol sınırına",
    storedKey: "forge019-bio-solunum-organlar",
    persisted: { gradient: -3, thickness: 2 },
    expected: ["Net akış: -3 model birimi; kandan alveole."],
    async act(lab) {
      await setRange(lab, "Fark: alveol eksi kan", -3);
      await setRange(lab, "Bariyer kalınlığı T", 2);
    },
    async assertModel(lab) {
      await expect(lab.locator('[data-flow="gas"]>path')).toHaveAttribute(
        "d",
        "M280,180L144,180",
      );
      await expect(lab.locator("[data-barrier-thickness]")).toHaveAttribute(
        "width",
        "16",
      );
    },
  },
  {
    id: "ayt-molalite-koligatif",
    exam: "AYT",
    title: "Molalite ve koligatif özellikler",
    storedKey: "forge019:chemistry:ayt-molalite-koligatif",
    persisted: { n: 0.1, i: 2, volume: 0.5 },
    expected: ["Donma düşüşü: 0,372 °C", "Ozmotik basınç: 9,8472 atm"],
    async act(lab) {
      await setRange(lab, "Çözünen (mol)", 0.1);
      await setRange(lab, "Tanecik çarpanı i", 2);
      await setRange(lab, "Son hacim (L)", 0.5);
    },
    async assertModel(lab) {
      expect(
        Number(
          await lab
            .locator("[data-freezing-drop]")
            .getAttribute("data-freezing-drop"),
        ),
      ).toBeCloseTo(0.372, 10);
      expect(
        Number(
          await lab
            .locator("[data-boiling-rise]")
            .getAttribute("data-boiling-rise"),
        ),
      ).toBeCloseTo(0.104, 10);
    },
  },
  {
    id: "elektriksel-potansiyel-enerji",
    exam: "AYT",
    title: "Elektriksel potansiyel enerji: yükleri yerleştirmenin bedeli",
    storedKey: "forge019-physics-elektriksel-potansiyel-enerji",
    persisted: { test: -3 },
    expected: [
      "İlk U = -0,054 J; son U = -0,027 J",
      "ΔU = 0,027 J",
      "Elektrik işi = -0,027 J",
    ],
    async act(lab) {
      await setRange(lab, "Test yükü (μC)", -3);
    },
    async assertModel(lab) {
      expect(
        Number(
          await lab.locator("[data-energy-initial]").getAttribute("data-u"),
        ),
      ).toBeCloseTo(-0.054, 10);
      expect(
        Number(
          await lab.locator("[data-energy-selected]").getAttribute("data-u"),
        ),
      ).toBeCloseTo(-0.027, 10);
    },
  },
  {
    id: "bolge-turleri",
    exam: "TYT",
    title: "Bölge ve bölge türleri: ölçüt, sınır ve ağ",
    storedKey: "forge019-geo-region",
    persisted: { criterion: "wheat", clinic: "B", changed: true, selected: 2 },
    expected: [
      "Beşerî şekilsel",
      "3. hücre; 500 mm; merkez B",
      "3, 4, 7, 8, 11",
      "Var / Var",
    ],
    async act(lab) {
      await lab
        .getByLabel("Şekilsel ölçüt", { exact: true })
        .selectOption("wheat");
      await lab.getByLabel("Hizmet merkezi", { exact: true }).selectOption("B");
      await lab
        .getByLabel("3. hücrenin hizmetini B’ye al", { exact: true })
        .check();
      await lab
        .getByLabel("İncelenen hücre", { exact: true })
        .selectOption("2");
    },
    async assertModel(lab) {
      await expect(
        lab.getByLabel("Hizmet merkezi", { exact: true }),
      ).toHaveValue("B");
    },
  },
  {
    id: "dogrunun-analitigi",
    exam: "AYT",
    title: "Doğrunun analitiği: denklem, yön ve dik uzaklık",
    storedKey: "forge019-math:dogrunun-analitigi",
    persisted: { bx: -2, by: 3 },
    expected: ["Yetersiz veri: A=B"],
    async act(lab) {
      await setRange(lab, "B apsisi x", -2);
      await setRange(lab, "B ordinatı y", 3);
    },
    async assertModel(lab) {
      await expect(lab.locator("[data-math-line]")).toHaveCount(0);
      await expect(lab.locator("[data-build-detail]")).toContainText(
        "Aynı noktadan farklı doğrular geçer.",
      );
    },
  },
  {
    id: "yardimci-dusunce",
    exam: "TYT",
    title: "Yardımcı düşünce: her yargıya kanıt bul",
    storedKey: "forge019-turkish:yardimci-dusunce",
    persisted: { caseId: "kutuphane", choice: 1, show: true },
    expected: ["Her hafta sözü düzenli tekrarı"],
    async act(lab) {
      await lab
        .getByRole("combobox", { name: "İncelenen örnek", exact: true })
        .selectOption("kutuphane");
      await lab
        .getByRole("combobox", { name: "İncelenen iddia", exact: true })
        .selectOption("1");
      await lab
        .getByRole("button", { name: "Kanıtı göster", exact: true })
        .click();
    },
    async assertModel(lab) {
      await expect(lab.locator('svg [data-relation="2-3"]')).toHaveAttribute(
        "data-valid",
        "true",
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
  const lab = page.locator(`[data-forge019="${unit.id}"]`);
  await expect(lab).toBeVisible();
  await expect(lab.locator("svg").first()).toBeVisible();
  return lab;
}
async function assertOutcome(lab, unit) {
  const result = lab.locator("[data-model-result]").first();
  await expect(result).toBeVisible();
  expect(await result.evaluate((e) => e.namespaceURI)).toBe(
    "http://www.w3.org/1999/xhtml",
  );
  for (const text of unit.expected) await expect(result).toContainText(text);
  await unit.assertModel(lab);
}
export async function runForge019SmokeCase(page, navigate, unit) {
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
  await assertOutcome(page.locator(`[data-forge019="${unit.id}"]`), unit);
  const after = await readState(page);
  expect(after.explorations[unit.storedKey]).toEqual(saved);
  expect(learning(after)).toEqual(beforeLearning);
  return { id: unit.id, storedKey: unit.storedKey, saved };
}
export async function assertForge019ProcessRestart(page, navigate, snapshots) {
  await expect.poll(() => page.evaluate(() => navigator.onLine)).toBe(false);
  const beforeLearning = learning(await readState(page));
  expect(snapshots).toHaveLength(6);
  for (const snapshot of snapshots) {
    const unit = forge019SmokeCases.find((entry) => entry.id === snapshot.id);
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
