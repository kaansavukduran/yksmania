import { expect } from "@playwright/test";

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

export const forge014SmokeCases = [
  {
    id: "grafik-problemleri",
    title: "Grafik problemleri: veriyi oku, temsili sorgula",
    storedKey: "forge014-math-graphs",
    persisted: { mode: "pie", a: 40, b: 30, c: 50 },
    expected: ["Toplam: 120 kişi", "açı 150°"],
    async act(lab) {
      await lab
        .getByRole("combobox", { name: "Grafik türü", exact: true })
        .selectOption("pie");
      await setRange(lab, "A kişi sayısı", 40);
      await setRange(lab, "B kişi sayısı", 30);
      await setRange(lab, "C kişi sayısı", 50);
    },
    async assertModel(lab) {
      await expect(lab.locator("[data-chart-sector]")).toHaveCount(3);
      await expect(lab.locator('[data-chart-sector="2"]')).toHaveAttribute(
        "d",
        /^M300 155 L245/,
      );
    },
  },
  {
    id: "kuresel-aynalar",
    title: "Küresel aynalar: odaktan görüntüye ışın kur",
    storedKey: "forge014-physics-kuresel-aynalar",
    persisted: { kind: "concave", focal: 10, u: 5 },
    expected: ["v: -10 cm · m: 2", "aynanın arkasında"],
    async act(lab) {
      await lab
        .getByLabel("Ayna türü", { exact: true })
        .selectOption("concave");
      await lab
        .getByRole("spinbutton", {
          name: "Odak uzaklığının büyüklüğü (cm), sayıyla",
          exact: true,
        })
        .fill("10");
      await lab.getByRole("button", { name: "Odağa koy", exact: true }).click();
      await expect(lab.locator("svg")).toHaveAttribute(
        "data-image-kind",
        "infinity",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Sonlu görüntü yok",
      );
      await expect(lab.locator("[data-image-tip]")).toHaveCount(0);
      await lab.getByRole("button", { name: "İçeri al", exact: true }).click();
    },
    async assertModel(lab) {
      await expect(lab.locator("svg")).toHaveAttribute(
        "data-image-kind",
        "virtual",
      );
      await expect(lab.locator("[data-image-tip]")).toHaveAttribute(
        "data-world-x",
        "10",
      );
      await expect(lab.locator("[data-image-tip]")).toHaveAttribute(
        "data-world-y",
        "2",
      );
      await expect(lab.locator("[data-virtual-extension]")).toHaveCount(2);
    },
  },
  {
    id: "su-hayat-cevre",
    title: "Su ve hayat: bütçe, kalite ve kullanım amacı",
    storedKey: "forge014:chemistry:su-hayat-cevre",
    persisted: { flow: 8, minutes: 4, repeats: 1, leak: 10 },
    expected: ["70 L/gün", "42 L/gün", "28 L/gün", "%40"],
    async act(lab) {
      await setRange(lab, "Yeni debi (L/dk)", 8);
      await setRange(lab, "Yeni kullanım süresi (dk)", 4);
      await setRange(lab, "Günlük tekrar sayısı", 1);
      await setRange(lab, "Değişmeyen günlük kaçak (L)", 10);
    },
    async assertModel(lab) {
      await expect(lab.locator('svg [data-water="new"]')).toHaveAttribute(
        "height",
        "96",
      );
      await expect(lab.locator("svg")).toContainText("Yeni: 42 L");
    },
  },
  {
    id: "ekoloji-giris",
    title: "Ekolojiye giriş: canlıyı ilişkileriyle tanı",
    storedKey: "forge014-bio-ekoloji-giris",
    persisted: { count: 20, otherSpecies: true, abiotic: true },
    expected: [
      "İncelenen kapsam: Ekosistem kesiti",
      "Seçilen aynı tür bireyleri: 20",
    ],
    async act(lab) {
      await setRange(lab, "Aynı türden kurbağa sayısı", 20);
      await lab
        .getByRole("checkbox", {
          name: "Alg ve bakteri popülasyonlarını ekle",
          exact: true,
        })
        .check();
      await lab
        .getByRole("checkbox", {
          name: "Su, ışık ve pH etkileşimlerini ekle",
          exact: true,
        })
        .check();
    },
    async assertModel(lab) {
      await expect(lab.locator("[data-pond-frog]")).toHaveCount(20);
      await expect(lab.locator("[data-abiotic-layer]")).toHaveCount(1);
      await expect(lab.locator("[data-other-populations]")).toHaveCount(1);
    },
  },
  {
    id: "yerel-saat",
    title: "Yerel saat: boylamdan dakikaya, dakikadan güne",
    storedKey: "forge014-geo-yerel-saat",
    persisted: {
      mode: "civil",
      hour: 22,
      minute: 30,
      offsetA: 180,
      offsetB: 120,
      travel: 180,
    },
    expected: [
      "Ertesi gün 00.30",
      "Kalkış UTC: Aynı gün 19.30",
      "180 dakika gerçek süre sonrası UTC: Aynı gün 22.30",
      "Hedef UTC+02:00: Ertesi gün 00.30",
    ],
    async act(lab) {
      await lab
        .getByRole("combobox", { name: "Saat hesabı", exact: true })
        .selectOption("civil");
      for (const [label, value] of [
        ["Başlangıç saat, sayıyla", "22"],
        ["Başlangıç dakika, sayıyla", "30"],
        ["Kaynak UTC farkı (dk), sayıyla", "180"],
        ["Hedef UTC farkı (dk), sayıyla", "120"],
        ["Geçen süre (dk), sayıyla", "180"],
      ]) {
        const input = lab.getByRole("spinbutton", { name: label, exact: true });
        await input.fill(value);
        await input.press("Tab");
      }
    },
    async assertModel(lab) {
      await expect(lab.locator("[data-utc-ledger]")).toHaveCount(1);
      await expect(lab.locator("[data-clock-hour]")).toHaveAttribute(
        "d",
        /^M200 135L/,
      );
      await expect(lab.locator("[data-clock-minute]")).toHaveAttribute(
        "d",
        /^M200 135L/,
      );
      await expect(lab.locator("[data-source-longitude]")).toHaveCount(0);
    },
  },
  {
    id: "ek-fiil",
    title: "Ek fiil: tabandan yargıya, kipten birleşik çekime",
    storedKey: "forge014-turkish:ek-fiil",
    persisted: {
      mode: "verbal",
      form: "past",
      person: "ben",
      negative: true,
      show: true,
      compared: true,
      prediction: "Birleşik çekimli fiil",
    },
    expected: [
      "Şimdiki zamanın hikâyesi",
      "gelmiyordum",
      "Birleşik çekimli fiil",
    ],
    async act(lab) {
      await lab
        .getByRole("combobox", { name: "Hedef sözün tabanı", exact: true })
        .selectOption("verbal");
      await lab
        .getByRole("combobox", { name: "Çekim katmanı", exact: true })
        .selectOption("past");
      await lab
        .getByRole("combobox", { name: "Kişi", exact: true })
        .selectOption("ben");
      await lab
        .getByRole("checkbox", { name: "Olumsuz yargı kur", exact: true })
        .check();
      await lab
        .getByRole("combobox", { name: "Yapı tahminin", exact: true })
        .selectOption("Birleşik çekimli fiil");
      await lab
        .getByRole("textbox", { name: "Cümleden gerekçen", exact: true })
        .fill(
          "Gel- fiildir; -yor ilk kip, -du idi ek fiili, -m birinci kişidir. Olumsuzluk -mi- ile kurulur.",
        );
      await lab
        .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
        .click();
    },
    async assertModel(lab) {
      await expect(lab.locator(".grammar014-sentence")).toContainText(
        "Dün bu saatte ben gelmiyordum.",
      );
      await expect(lab.locator("[data-model-part='negative']")).toContainText(
        "-mi-",
      );
      await expect(lab.locator("[data-copula-layer='copula']")).toHaveAttribute(
        "data-form",
        "-du",
      );
      await expect(lab.locator("[data-copula-layer='first']")).toHaveAttribute(
        "data-form",
        "-yor",
      );
      await expect(lab.locator("[data-feedback]")).toContainText(
        "Seçimin bu cümleyle uyumlu.",
      );
    },
  },
];

export const readForge014SmokeState = (page) =>
  page.evaluate(
    () =>
      new Promise((resolve, reject) => {
        const request = indexedDB.open("yksmania");
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const db = request.result;
          const read = db
            .transaction("state")
            .objectStore("state")
            .get("current");
          read.onsuccess = () => {
            const value = read.result;
            db.close();
            resolve(value);
          };
          read.onerror = () => {
            const error = read.error;
            db.close();
            reject(error);
          };
        };
      }),
  );
const learning = (state) => ({
  sessions: state.sessions,
  reviews: state.reviews,
  theoryReviewCompletions: state.theoryReviewCompletions,
  topicProgress: state.topicProgress,
  unlocked: state.unlocked,
});
async function open(page, navigate, unit) {
  await navigate("Konu Anlatımı");
  await page.getByRole("button", { name: "TYT", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill(unit.title);
  await page.locator(`.ready-topic[data-lesson-id="${unit.id}"]`).click();
  const lab = page.locator(`[data-forge014="${unit.id}"]`);
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
export async function runForge014SmokeCase(page, navigate, unit) {
  await expect.poll(() => page.evaluate(() => navigator.onLine)).toBe(false);
  const beforeLearning = learning(await readForge014SmokeState(page));
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
    .poll(
      async () =>
        (await readForge014SmokeState(page)).explorations[unit.storedKey],
    )
    .toMatchObject(unit.persisted);
  const saved = (await readForge014SmokeState(page)).explorations[
    unit.storedKey
  ];
  expect(learning(await readForge014SmokeState(page))).toEqual(beforeLearning);
  await page.reload();
  await assertOutcome(page.locator(`[data-forge014="${unit.id}"]`), unit);
  const after = await readForge014SmokeState(page);
  expect(after.explorations[unit.storedKey]).toEqual(saved);
  expect(learning(after)).toEqual(beforeLearning);
  return { id: unit.id, storedKey: unit.storedKey, saved };
}
export async function assertForge014ProcessRestart(page, navigate, snapshots) {
  await expect.poll(() => page.evaluate(() => navigator.onLine)).toBe(false);
  const beforeLearning = learning(await readForge014SmokeState(page));
  expect(snapshots).toHaveLength(6);
  for (const snapshot of snapshots) {
    const unit = forge014SmokeCases.find((entry) => entry.id === snapshot.id);
    expect(
      (await readForge014SmokeState(page)).explorations[snapshot.storedKey],
    ).toEqual(snapshot.saved);
    const lab = await open(page, navigate, unit);
    await assertOutcome(lab, unit);
    expect(
      (await readForge014SmokeState(page)).explorations[snapshot.storedKey],
    ).toEqual(snapshot.saved);
  }
  expect(learning(await readForge014SmokeState(page))).toEqual(beforeLearning);
}
