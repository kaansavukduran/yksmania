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

export const forge016SmokeCases = [
  {
    id: "endokrin-hipotalamus",
    exam: "AYT",
    title: "Hipotalamus: sinirden hormona uzanan düzenleme",
    storedKey: "forge016-bioa-endokrin-hipotalamus",
    persisted: { hormone: "trh", block: "portal" },
    expected: [
      "TRH: Portal kan → Ön hipofiz",
      "Yeni haberin ulaşması: engelli",
    ],
    async act(lab) {
      await lab
        .getByLabel("İzlenen haber", { exact: true })
        .selectOption("trh");
      await lab
        .getByLabel("Seçici kesinti", { exact: true })
        .selectOption("portal");
    },
    async assertModel(lab) {
      await expect(lab.locator('[data-flow="arrival"]')).toHaveAttribute(
        "data-active",
        "false",
      );
      await expect(lab.locator("[data-destination]")).toHaveAttribute(
        "data-destination",
        "anterior",
      );
    },
  },
  {
    id: "duyu-organlari-goz",
    exam: "AYT",
    title: "Göz: ışığın odağından görme alanına",
    storedKey: "forge016-b:duyu-organlari-goz",
    persisted: {
      distance: "near",
      light: "dim",
      defect: "myopia",
      corrected: true,
    },
    expected: ["Odak: retina düzleminde.", "Görüntü uzaklığı 27 mm"],
    async act(lab) {
      await lab
        .getByLabel("Bakılan nesnenin uzaklığı", { exact: true })
        .selectOption("near");
      await lab
        .getByLabel("Ortamın ışığı", { exact: true })
        .selectOption("dim");
      await lab
        .getByLabel("Eksen uzunluğu modeli", { exact: true })
        .selectOption("myopia");
      await lab
        .getByLabel("Ek optik düzeltme", { exact: true })
        .selectOption("on");
    },
    async assertModel(lab) {
      expect(
        Number(
          await lab.locator("[data-eye-focus]").getAttribute("data-distance"),
        ),
      ).toBeCloseTo(27, 10);
      const d = await lab.locator('[data-eye-ray="upper"]').getAttribute("d");
      const parts = d.match(/^M35 ([^ ]+)L200 ([^ ]+)L/);
      expect(parts).not.toBeNull();
      expect((Number(parts[2]) - Number(parts[1])) / 165).toBeCloseTo(
        -12.6 / (8 * 250),
        12,
      );
    },
  },
  {
    id: "asit-baz-tepkimeleri",
    exam: "TYT",
    title: "Asit baz tepkimeleri",
    storedKey: "forge016:chemistry:asit-baz-tepkimeleri",
    persisted: { baseMl: 50 },
    expected: ["Nötr", "pH 7", "75 mL"],
    async act(lab) {
      await setRange(lab, "NaOH hacmi (mL)", 50);
    },
    async assertModel(lab) {
      expect(
        Number(
          await lab
            .locator("[data-neutral-ph]")
            .getAttribute("data-neutral-ph"),
        ),
      ).toBe(7);
      expect(
        Number(
          await lab.locator("[data-base-ml]").getAttribute("data-base-ml"),
        ),
      ).toBe(50);
    },
  },
  {
    id: "cografya-kayaclar",
    exam: "TYT",
    title: "Kayaçlar: bir taşın geçmişini süreçlerden kur",
    storedKey: "forge016-geo-cografya-kayaclar",
    persisted: { action: "marble" },
    expected: ["Kalker → Mermer", "Katı hâlde değişim"],
    async act(lab) {
      await lab
        .getByLabel("Kayaç yolu", { exact: true })
        .selectOption("marble");
    },
    async assertModel(lab) {
      await expect(lab.getByLabel("Kayaç yolu", { exact: true })).toHaveValue(
        "marble",
      );
    },
  },
  {
    id: "ayt-newton-hareket-yasalari",
    exam: "AYT",
    title: "Newton yasaları: eğik düzlemden bağlı sistemlere",
    storedKey: "forge016-physics-ayt-newton-hareket-yasalari",
    persisted: { mass: 4, angle: 0, force: 12, motion: "up" },
    expected: ["İvme: 0,5 m/s²", "Kinetik sürtünme"],
    async act(lab) {
      await lab
        .getByRole("button", { name: "Durgun dengeyi kur", exact: true })
        .click();
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Statik denge",
      );
      await lab
        .getByLabel("Anlık kayma durumu", { exact: true })
        .selectOption("up");
    },
    async assertModel(lab) {
      await expect(lab.locator('[data-force="friction"]')).toHaveAttribute(
        "data-x",
        "-10",
      );
      await expect(lab.locator('[data-force="normal"]')).toHaveAttribute(
        "data-y",
        "40",
      );
    },
  },
  {
    id: "yazim-kurallari",
    exam: "TYT",
    title: "Yazım kuralları: anlamdan doğru biçime",
    storedKey: "forge016-turkish:yazim-kurallari",
    persisted: { pair: "de", changed: true },
    expected: ["boyanan varlıklar arasına ekler"],
    async act(lab) {
      await lab
        .getByLabel("İncelenen cümle çifti", { exact: true })
        .selectOption("de");
      await lab
        .getByRole("button", { name: "Cümleyi dönüştür", exact: true })
        .click();
    },
    async assertModel(lab) {
      await expect(lab.locator(".turkish016-sentence")).toHaveText(
        "Duvar da boyandı.",
      );
      await expect(lab.locator('svg [data-relation="0-2"]')).toHaveCount(1);
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
  await page.locator(".ready-topic").filter({ hasText: unit.title }).click();
  const lab = page.locator(`[data-forge016="${unit.id}"]`);
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
export async function runForge016SmokeCase(page, navigate, unit) {
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
  await assertOutcome(page.locator(`[data-forge016="${unit.id}"]`), unit);
  const after = await readState(page);
  expect(after.explorations[unit.storedKey]).toEqual(saved);
  expect(learning(after)).toEqual(beforeLearning);
  return { id: unit.id, storedKey: unit.storedKey, saved };
}
export async function assertForge016ProcessRestart(page, navigate, snapshots) {
  await expect.poll(() => page.evaluate(() => navigator.onLine)).toBe(false);
  const beforeLearning = learning(await readState(page));
  expect(snapshots).toHaveLength(6);
  for (const snapshot of snapshots) {
    const unit = forge016SmokeCases.find((entry) => entry.id === snapshot.id);
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
