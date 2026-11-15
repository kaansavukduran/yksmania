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

export const forge018SmokeCases = [
  {
    id: "sindirim-bagirsaklar",
    exam: "AYT",
    title: "Bağırsaklar: yüzeyden kana ve lenfe",
    storedKey: "forge018-bio-sindirim-bagirsaklar",
    persisted: { sodium: false },
    expected: ["İlk çıkış: Bu yol engelli"],
    async act(lab) {
      await lab.getByLabel("Na gradyanı var", { exact: true }).uncheck();
    },
    async assertModel(lab) {
      await expect(lab.locator('[data-flow="apical"]')).toHaveAttribute(
        "data-active",
        "false",
      );
      await expect(
        lab.locator('[data-intestinal-exit="blood"]'),
      ).toHaveAttribute("data-active", "false");
      await expect(lab.locator('[data-flow="apical"]>path')).toHaveAttribute(
        "d",
        "M95,48L95,143",
      );
    },
  },
  {
    id: "ayt-kinetik-yogunluk",
    exam: "AYT",
    title: "Kinetik teori: hız, enerji ve gaz yoğunluğu",
    storedKey: "forge018:chemistry:ayt-kinetik-yogunluk",
    persisted: { temperature: 600, mass: 8 },
    expected: ["1.367,7 m/s", "0,163 g/L"],
    async act(lab) {
      await setRange(lab, "T (K)", 600);
      await setRange(lab, "Mol kütlesi (g/mol)", 8);
    },
    async assertModel(lab) {
      expect(
        Number(await lab.locator("[data-rms]").getAttribute("data-rms")),
      ).toBeCloseTo(1367.717076006584, 8);
      expect(
        Number(
          await lab.locator("[data-density]").getAttribute("data-density"),
        ),
      ).toBeCloseTo(0.16260162601626016, 12);
    },
  },
  {
    id: "itme-momentum",
    exam: "AYT",
    title: "İtme ve momentum: kuvvetin zaman içindeki izi",
    storedKey: "forge018-physics-itme-momentum",
    persisted: { forceB: -8, progress: 100 },
    expected: [
      "Net itme: 0 N·s",
      "seçili momentum 6 kg·m/s",
      "Hız: 3 m/s",
      "yer değiştirme: 15 m",
    ],
    async act(lab) {
      await setRange(lab, "İkinci net kuvvet (N)", -8);
      await setRange(lab, "Zaman (%)", 100);
    },
    async assertModel(lab) {
      await expect(lab.locator('[data-area="force-1"]')).toHaveAttribute(
        "data-impulse",
        "8",
      );
      await expect(lab.locator('[data-area="force-2"]')).toHaveAttribute(
        "data-impulse",
        "-8",
      );
      await expect(lab.locator("[data-momentum-line]")).toHaveAttribute(
        "d",
        /M.+L.+L/,
      );
    },
  },
  {
    id: "dunya-nufus-dagilisi",
    exam: "TYT",
    title: "Dünya’da nüfusun dağılışı: haritadan nedene",
    storedKey: "forge018-geo-dunya-nufus-dagilisi",
    persisted: { place: "sahara", clustered: true, total: 1800 },
    expected: ["Sahra", "1.800 kişi", "18 kişi/km²"],
    async act(lab) {
      await lab
        .getByLabel("Dünya örneği", { exact: true })
        .selectOption("sahara");
      await lab.getByLabel("Bir hücrede küme", { exact: true }).check();
      const input = lab.getByRole("spinbutton", {
        name: "Toplam kişi, sayıyla",
        exact: true,
      });
      await input.fill("1800");
      await input.press("Enter");
    },
    async assertModel(lab) {
      await expect(
        lab.getByRole("slider", { name: "Toplam kişi", exact: true }),
      ).toHaveValue("1800");
    },
  },
  {
    id: "noktanin-analitigi",
    exam: "TYT",
    title: "Noktanın analitiği: konumdan geometrik ilişkiye",
    storedKey: "forge018-math:noktanin-analitigi",
    persisted: { ax: -3, ay: 4, bx: 5, by: -2 },
    expected: ["|AB|=10 birim; köşeli yol=14 birim"],
    async act(lab) {
      await setRange(lab, "A apsisi x", -3);
      await setRange(lab, "A ordinatı y", 4);
      await setRange(lab, "B apsisi x", 5);
      await setRange(lab, "B ordinatı y", -2);
    },
    async assertModel(lab) {
      await expect(lab.locator('[data-geometry-point="A"]')).toHaveAttribute(
        "data-y",
        "4",
      );
      await expect(lab.locator('[data-geometry-point="B"]')).toHaveAttribute(
        "data-y",
        "-2",
      );
      const line = lab.locator('[data-geometry-line="distance"]');
      expect(
        Number(await line.getAttribute("x2")) -
          Number(await line.getAttribute("x1")),
      ).toBeCloseTo((8 * 260) / 7, 8);
    },
  },
  {
    id: "deyimler-ve-atasozleri",
    exam: "TYT",
    title: "Deyimler ve atasözleri: sözü olaya bağla",
    storedKey: "forge018-turkish:deyimler-ve-atasozleri",
    persisted: { pair: "goz", changed: true, show: true },
    expected: ["Fark edilmeme"],
    async act(lab) {
      await lab
        .getByRole("combobox", { name: "İncelenen örnek", exact: true })
        .selectOption("goz");
      await lab
        .getByRole("button", { name: "Bağlamı değiştir", exact: true })
        .click();
      await lab
        .getByRole("button", { name: "Kanıtı göster", exact: true })
        .click();
    },
    async assertModel(lab) {
      await expect(lab.locator(".turkish018-sentence")).toHaveText(
        "Raporda son satırdaki tarih yanlışı gözden kaçtı.",
      );
      await expect(lab.locator('svg [data-relation="1-2"]')).toHaveAttribute(
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
  await page.locator(".ready-topic").filter({ hasText: unit.title }).click();
  const lab = page.locator(`[data-forge018="${unit.id}"]`);
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
export async function runForge018SmokeCase(page, navigate, unit) {
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
  await assertOutcome(page.locator(`[data-forge018="${unit.id}"]`), unit);
  const after = await readState(page);
  expect(after.explorations[unit.storedKey]).toEqual(saved);
  expect(learning(after)).toEqual(beforeLearning);
  return { id: unit.id, storedKey: unit.storedKey, saved };
}
export async function assertForge018ProcessRestart(page, navigate, snapshots) {
  await expect.poll(() => page.evaluate(() => navigator.onLine)).toBe(false);
  const beforeLearning = learning(await readState(page));
  expect(snapshots).toHaveLength(6);
  for (const snapshot of snapshots) {
    const unit = forge018SmokeCases.find((entry) => entry.id === snapshot.id);
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
