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

export const forge017SmokeCases = [
  {
    id: "kas-doku",
    exam: "AYT",
    title: "Kas doku: filamentten hareketin denetimine",
    storedKey: "forge017-bio-kas-doku",
    persisted: { length: 2.2, step: "pump", atp: false },
    expected: ["A 1,6 µm; I toplamı 0,6 µm; H 0,2 µm"],
    async act(lab) {
      await setRange(lab, "Sarkomer boyu; µm", 2.2);
      await lab
        .getByLabel("İzlenen adım", { exact: true })
        .selectOption("pump");
      await lab.getByLabel("Yeni serbest ATP var", { exact: true }).uncheck();
    },
    async assertModel(lab) {
      expect(
        Number(await lab.locator('[data-band="H"]').getAttribute("data-value")),
      ).toBeCloseTo(0.2, 10);
      await expect(lab.locator('[data-muscle-step="pump"]')).toHaveAttribute(
        "data-step-enabled",
        "false",
      );
      await expect(lab.locator("[data-model-result]").nth(1)).toContainText(
        "verilen basamak engelli",
      );
    },
  },
  {
    id: "asit-baz-metaller",
    exam: "TYT",
    title: "Asit ve bazların metallerle tepkimeleri",
    storedKey: "forge017:chemistry-a:asit-baz-metaller",
    persisted: { metal: 0.3, reagent: 0.8 },
    expected: ["NO₂: 0,4 mol", "Artan Cu: 0,1 mol"],
    async act(lab) {
      await lab
        .getByRole("button", { name: "Cu ve derişik HNO₃", exact: true })
        .click();
      await setRange(lab, "İlk metal (mol)", 0.3);
      await setRange(lab, "İlk asit veya baz (mol)", 0.8);
    },
    async assertModel(lab) {
      expect(
        Number(
          await lab.locator("[data-gas-mol]").getAttribute("data-gas-mol"),
        ),
      ).toBeCloseTo(0.4, 10);
      expect(
        Number(
          await lab
            .locator("[data-metal-left]")
            .getAttribute("data-metal-left"),
        ),
      ).toBeCloseTo(0.1, 10);
    },
  },
  {
    id: "ayt-modern-atom-elektron-dizilimi",
    exam: "AYT",
    title: "Modern atom: orbitallerden iyon dizilimine",
    storedKey: "forge017-chem-b:ayt-modern-atom-elektron-dizilimi",
    persisted: { z: 29, charge: 2 },
    expected: ["Elektron sayısı: 27"],
    async act(lab) {
      await lab
        .getByLabel("Element ve atom numarası", { exact: true })
        .selectOption("29");
      await lab
        .getByLabel("Pozitif iyon yükü", { exact: true })
        .selectOption("2");
    },
    async assertModel(lab) {
      await expect(lab.locator('[data-subshell="3d"]')).toHaveAttribute(
        "data-count",
        "9",
      );
      await expect(lab.locator('[data-subshell="4s"]')).toHaveAttribute(
        "data-count",
        "0",
      );
      await expect(
        lab.locator('[data-orbital-box="3d"][data-occupancy="2"]'),
      ).toHaveCount(4);
      await expect(
        lab.locator('[data-orbital-box="3d"][data-occupancy="1"]'),
      ).toHaveCount(1);
      await expect(lab.locator("[data-unpaired]")).toContainText(
        "Eşleşmemiş elektron: 1",
      );
    },
  },
  {
    id: "turkiye-sulari",
    exam: "TYT",
    title: "Türkiye’de sular: havzadan kullanıma",
    storedKey: "forge017-geo-turkiye-sulari",
    persisted: { basin: "coruh", regulated: true },
    expected: ["Açık havza", "Karadeniz"],
    async act(lab) {
      await lab
        .getByLabel("Havza örneği", { exact: true })
        .selectOption("coruh");
      await lab.getByLabel("Temsilî depolama", { exact: true }).check();
    },
    async assertModel(lab) {
      await expect(lab.getByLabel("Havza örneği", { exact: true })).toHaveValue(
        "coruh",
      );
      await expect(
        lab.getByText(/en büyük ile en küçük farkı 0 birim/),
      ).toBeVisible();
      const diagram = lab.locator("svg.g017-diagram").first();
      const arrows = diagram.locator("path.g017-flow");
      await expect(arrows).toHaveCount(2);
      await expect(arrows.nth(0)).toHaveAttribute("d", "M110 82H150");
      await expect(arrows.nth(1)).toHaveAttribute("d", "M245 82H285");
      const markerId = await diagram.locator("marker").getAttribute("id");
      for (const arrow of await arrows.all()) {
        const marker = await arrow.evaluate(
          (element) => getComputedStyle(element).markerEnd,
        );
        expect(marker).toContain(`#${markerId}`);
      }
    },
  },
  {
    id: "serbest-dusme-limit-hiz",
    exam: "AYT",
    title: "Serbest düşme ve limit hız: aynı ağırlık, değişen direnç",
    storedKey: "forge017-physics-serbest-dusme-limit-hiz",
    persisted: { area: 0, progress: 100 },
    expected: [
      "t = 4 s: sürat 40 m/s; aşağı ivme 10 m/s².",
      "sonlu limit hız tanımlı değil",
    ],
    async act(lab) {
      await lab
        .getByRole("button", { name: "Direnci kapat", exact: true })
        .click();
      await setRange(lab, "İlerleme (%)", 100);
    },
    async assertModel(lab) {
      const circle = lab.locator('[data-body="drop"]');
      expect(
        Number(await circle.getAttribute("cy")) +
          Number(await circle.getAttribute("r")),
      ).toBeCloseTo(300, 8);
      await expect(lab.locator('[data-vector-zero="drag"]')).toHaveCount(1);
      expect(
        Number(
          await lab.locator('[data-fall-point="speed"]').getAttribute("cy"),
        ),
      ).toBeCloseTo(65, 8);
    },
  },
  {
    id: "anlatim-bozukluklari",
    exam: "TYT",
    title: "Anlatım bozuklukları: amacı koruyarak onar",
    storedKey: "forge017-turkish:anlatim-bozukluklari",
    persisted: { pair: "hal", changed: true, show: true },
    expected: [
      "İki hâl ayrı kuruldu",
      "Komşumu belirtme, ona yönelme ilişkisidir",
    ],
    async act(lab) {
      await lab
        .getByLabel("İncelenen cümle çifti", { exact: true })
        .selectOption("hal");
      await lab
        .getByRole("button", { name: "Cümleyi dönüştür", exact: true })
        .click();
      await lab
        .getByRole("button", { name: "Kanıtı göster", exact: true })
        .click();
    },
    async assertModel(lab) {
      await expect(lab.locator(".turkish017-sentence")).toHaveText(
        "Komşumu gördüm ve ona güvendim.",
      );
      await expect(lab.locator('svg [data-relation="0-3"]')).toHaveCount(0);
      await expect(lab.locator('svg [data-relation="3-4"]')).toHaveAttribute(
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
  const lab = page.locator(`[data-forge017="${unit.id}"]`);
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
export async function runForge017SmokeCase(page, navigate, unit) {
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
  await assertOutcome(page.locator(`[data-forge017="${unit.id}"]`), unit);
  const after = await readState(page);
  expect(after.explorations[unit.storedKey]).toEqual(saved);
  expect(learning(after)).toEqual(beforeLearning);
  return { id: unit.id, storedKey: unit.storedKey, saved };
}
export async function assertForge017ProcessRestart(page, navigate, snapshots) {
  await expect.poll(() => page.evaluate(() => navigator.onLine)).toBe(false);
  const beforeLearning = learning(await readState(page));
  expect(snapshots).toHaveLength(6);
  for (const snapshot of snapshots) {
    const unit = forge017SmokeCases.find((entry) => entry.id === snapshot.id);
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
