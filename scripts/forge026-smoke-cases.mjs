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

export const forge026SmokeCases = [
  {
    family: "Math",
    id: "sayi-basamaklari",
    exam: "TYT",
    title: "Sayı basamakları: rakamdan koşullu denkleme",
    storedKey: "forge026-math:sayi-basamaklari",
    composition: {
      legacyLessonId: "sayi-basamaklari",
      legacyQuestionCount: 10,
      firstOptionCount: 5,
      legacyVisual: ".narrative-lab",
      separateQuestionSetId: "sayi-basamaklari-ileri",
    },
    persisted: {
      placeMode: "carry",
      addA: 278,
      addB: 487,
      addC: 659,
      guess: "2",
      checked: true,
    },
    expected: ["Doğrudan toplam", "1.424", "En büyük elde"],
    async act(lab) {
      await select(lab, "Basamak etkinliği", "carry");
      for (const [label, value] of [
        ["Birinci toplanan", 278],
        ["İkinci toplanan", 487],
        ["Üçüncü toplanan", 659],
      ])
        await number(lab, label, value);
      await select(lab, "Sonuç tahminin", "2");
      await explain(
        lab,
        "Modelden gerekçen",
        "Birler 8 + 7 + 9 = 24, elde 2. Onlar 7 + 8 + 5 + 2 = 22; yüzler 2 + 4 + 6 + 2 = 14. Toplam 1424.",
      );
      await click(lab, "Kanıtı karşılaştır");
    },
    async assertModel(lab) {
      await expect(lab).toHaveAttribute("data-model-mode", "carry");
      await expect(lab.locator("[data-carry-position]")).toHaveCount(4);
      for (const [position, raw, carryIn, carryOut] of [
        [0, 24, 0, 2],
        [1, 22, 2, 2],
        [2, 14, 2, 1],
        [3, 1, 1, 0],
      ]) {
        const column = lab.locator(`[data-carry-position="${position}"]`);
        await expect(column).toHaveAttribute("data-raw", String(raw));
        await expect(column).toHaveAttribute("data-carry-in", String(carryIn));
        await expect(column).toHaveAttribute(
          "data-carry-out",
          String(carryOut),
        );
      }
      await expect(
        lab.locator('[data-carry-position="0"] rect'),
      ).toHaveAttribute("x", "260");
      await expect(
        lab.locator('[data-carry-position="0"] rect'),
      ).toHaveAttribute("height", "170");
      await expect(lab.locator('.m026-feedback[role="status"]')).toContainText(
        "Tahminin model sonucuyla uyumlu.",
      );
    },
  },
  {
    family: "Physics",
    id: "dogrusal-hareket",
    exam: "TYT",
    title: "Doğrusal hareket: yol, yön ve grafik",
    storedKey: "forge026-physics-dogrusal-hareket",
    composition: {
      legacyLessonId: "dogrusal-hareket",
      legacyQuestionCount: 5,
      firstOptionCount: 5,
      legacyVisual: ".narrative-lab",
      separateQuestionSetId: "dogrusal-hareket-ileri",
    },
    persisted: {
      velocity: 6,
      frame: 1,
      origin: 0,
      t1: 4,
      a1: -2,
      t2: 2,
      a2: 0,
      t3: 0,
      a3: 0,
      sample: 50,
      guess: "Yol daha büyük",
      checked: true,
    },
    expected: [
      "Toplam yer değiştirme: -2 m. Toplam yol: 14,5 m.",
      "Seçili an: x′ = 6 m; v′ = -1 m/s",
    ],
    async act(lab) {
      for (const [label, value] of [
        ["İlk dünya hızı (m/s)", 6],
        ["Gözlemci hızı u (m/s)", 1],
        ["İlk dünya konumu (m)", 0],
        ["1. evre süresi (s)", 4],
        ["1. evre ivmesi (m/s²)", -2],
        ["2. evre süresi (s)", 2],
        ["2. evre ivmesi (m/s²)", 0],
        ["3. evre süresi (s)", 0],
        ["3. evre ivmesi (m/s²)", 0],
        ["Toplam sürede seçili pay (%)", 50],
      ])
        await number(lab, label + ", sayıyla", value);
      await select(lab, "Tahminin", "Yol daha büyük");
      await explain(
        lab,
        "Gerekçen",
        "Bu referansta v′ = 5 − 2t; yön 2,5 s’de döner. Yol 14,5 m, yer değiştirme −2 m. t=3 için x′=6, v′=−1.",
      );
      await click(lab, "Kanıtla kıyasla");
    },
    async assertModel(lab) {
      const result = lab.locator("[data-model-result]");
      for (const [key, value] of [
        ["data-displacement", "-2"],
        ["data-total-distance", "14.5"],
        ["data-current-x", "6"],
        ["data-current-v", "-1"],
        ["data-current-a", "-2"],
      ])
        await expect(result).toHaveAttribute(key, value);
      expect(
        Number(await result.getAttribute("data-average-speed")),
      ).toBeCloseTo(29 / 12, 12);
      await expect(
        lab.locator('[data-motion-point="position"]'),
      ).toHaveAttribute("data-time", "3");
      await expect(
        lab.locator('[data-motion-point="position"]'),
      ).toHaveAttribute("data-value", "6");
      await expect(
        lab.locator('[data-motion-point="acceleration"]'),
      ).toHaveAttribute("data-value", "-2");
      await expect(lab.locator("svg[data-p026-plot]")).toHaveCount(3);
      await expect(lab.locator('.p026-feedback[role="status"]')).toContainText(
        "Tahminin bu koşulla uyumlu.",
      );
    },
  },
  {
    family: "Chem",
    id: "atomun-temel-tanecikleri",
    exam: "TYT",
    title: "Atomun temel tanecikleri: kimlik, kütle ve yük",
    storedKey: "forge026:chemistry:atomun-temel-tanecikleri",
    composition: {
      legacyLessonId: "atomun-temel-tanecikleri",
      legacyQuestionCount: 5,
      firstOptionCount: 5,
      legacyVisual: ".narrative-lab",
      separateQuestionSetId: "atomun-temel-tanecikleri-ileri",
    },
    persisted: {
      mode: "aggregate",
      compound: 1,
      copies: 4,
      guess: "128",
      checked: true,
    },
    expected: ["4 × ¹²C(¹⁶O)₃²⁻", "Toplam nükleon", "240"],
    async act(lab) {
      await select(lab, "Sayım modeli", "aggregate");
      await select(lab, "Çok atomlu tanecik", "1");
      await range(lab, "Özdeş tanecik adedi", 4);
      await explain(lab, "Bütün örneğin elektron sayısı E", "128");
      await explain(
        lab,
        "Gerekçen",
        "Bir karbonatta 6 + 3 × 8 = 30 proton var. Yük −2 için 32 elektron; dört tanecikte 4 × 32 = 128.",
      );
      await click(lab, "Kıyasla");
    },
    async assertModel(lab) {
      const result = lab.locator("[data-model-result]");
      for (const [key, value] of [
        ["data-mode", "aggregate"],
        ["data-p", "120"],
        ["data-n", "120"],
        ["data-e", "128"],
        ["data-charge", "-8"],
        ["data-copies", "4"],
      ])
        await expect(result).toHaveAttribute(key, value);
      await expect(lab.locator('[data-fill="electrons"]')).toHaveAttribute(
        "width",
        "153.6",
      );
      await expect(lab.locator('.c026-feedback[role="status"]')).toContainText(
        "Modelle uyumlu.",
      );
    },
  },
  {
    family: "BioA",
    id: "mineraller",
    exam: "TYT",
    title: "Mineraller: yapı, iyon dengesi ve kofaktör",
    storedKey: "forge026:biology-a:mineraller",
    composition: {
      legacyLessonId: "mineraller",
      legacyQuestionCount: 5,
      firstOptionCount: 5,
      legacyVisual: ".narrative-lab",
      separateQuestionSetId: "mineraller-ileri",
    },
    persisted: {
      nStock: 24,
      pStock: 12,
      mgStock: 15,
      guess: "N",
      checked: true,
      show: true,
    },
    expected: ["kalan 3 mg", "kapasite 4"],
    async act(lab) {
      for (const [label, value] of [
        ["Alıma uygun N (mg)", 24],
        ["Alıma uygun P (mg)", 12],
        ["Alıma uygun Mg (mg)", 15],
      ])
        await range(lab, label, value);
      await select(lab, "Tahminin", "N");
      await explain(
        lab,
        "Gerekçen",
        "N kapasitesi 24/6 = 4; P için 12/2 = 6, Mg için 15/3 = 5. Sınır 4 birimdir; Mg’den 3 mg kalır.",
      );
      await click(lab, "Kıyasla");
      await click(lab, "Kanıtı aç");
    },
    async assertModel(lab) {
      const result = lab.locator('[data-model-result="minerals"]');
      await expect(result).toHaveAttribute("data-units", "4");
      await expect(result).toHaveAttribute("data-limiting", "N");
      for (const [mineral, height] of [
        ["N", "100"],
        ["P", "150"],
        ["Mg", "125"],
      ])
        await expect(
          lab.locator(`svg [data-mineral="${mineral}"]`),
        ).toHaveAttribute("height", height);
      await expect(lab.locator('.b026-feedback[role="status"]')).toContainText(
        "Modelle uyumlu.",
      );
      await expect(lab.locator(".b026-proof")).toBeVisible();
    },
  },
  {
    family: "BioB",
    id: "karbohidratlar",
    exam: "TYT",
    title: "Karbohidratlar: birim, bağ ve görev",
    storedKey: "forge026:biology-b:karbohidratlar",
    composition: {
      legacyLessonId: "karbohidratlar",
      legacyQuestionCount: 10,
      firstOptionCount: 5,
      legacyVisual: ".narrative-lab",
      separateQuestionSetId: "karbohidratlar-ileri",
    },
    persisted: {
      units: 8,
      pieces: 3,
      joins: 2,
      carbCuts: 3,
      guess: "4",
      checked: true,
      show: true,
    },
    expected: ["Son parça", "Tek başına kalan birim"],
    async act(lab) {
      for (const [label, value] of [
        ["Şeker birimi", 8],
        ["İlk parça sayısı", 3],
        ["Yeni bağ", 2],
        ["Kopan bağ", 3],
      ])
        await range(lab, label, value);
      await select(lab, "Tahminin", "4");
      await explain(
        lab,
        "Gerekçen",
        "Başta 8 − 3 = 5 bağ. İki yeni bağ ve üç kesim sonrası 4 bağ kalır; halkasız ağda 8 − 4 = 4 parça.",
      );
      await click(lab, "Kıyasla");
      await click(lab, "Kanıtı aç");
    },
    async assertModel(lab) {
      const result = lab.locator('[data-model-result="forest"]');
      for (const [key, value] of [
        ["data-pieces", "4"],
        ["data-bonds", "4"],
        ["data-free-units", "2"],
      ])
        await expect(result).toHaveAttribute(key, value);
      await expect(lab.locator("svg [data-sugar-unit]")).toHaveCount(8);
      await expect(lab.locator("svg [data-bond-a]")).toHaveCount(7);
      await expect(lab.locator('svg [data-cut="true"]')).toHaveCount(3);
      await expect(
        lab.locator('[data-bond-a="5"][data-bond-b="6"] path').first(),
      ).toHaveAttribute("d", "M60 401 V433");
      await expect(lab.locator('.bb026-feedback[role="status"]')).toContainText(
        "Modelle uyumlu.",
      );
      await expect(lab.locator(".bb026-proof")).toContainText("8−4=4");
    },
  },
  {
    family: "BioC",
    id: "proteinler",
    exam: "TYT",
    title: "Proteinler: dizilişten üç boyutlu işleve",
    storedKey: "forge026-biology-c:proteinler",
    composition: {
      legacyLessonId: "proteinler",
      legacyQuestionCount: 5,
      firstOptionCount: 5,
      legacyVisual: ".narrative-lab",
      separateQuestionSetId: "proteinler-ileri",
    },
    persisted: {
      length: 8,
      topology: "ring",
      cutMask: 9,
      pattern: 0,
      folded: true,
      guess: "2",
      checked: true,
    },
    expected: ["594 g/mol", "Tüketilen su"],
    async act(lab) {
      await range(lab, "Amino asit adedi", 8);
      await select(lab, "Bağlantı", "ring");
      await select(lab, "Dizi örüntüsü", "0");
      await lab
        .getByRole("checkbox", { name: "Katlı çizim", exact: true })
        .check();
      for (const label of ["1–2 bağı", "4–5 bağı"])
        await lab.getByRole("checkbox", { name: label, exact: true }).check();
      for (const label of [
        "2–3 bağı",
        "3–4 bağı",
        "5–6 bağı",
        "6–7 bağı",
        "7–8 bağı",
        "8–1 bağı",
      ])
        await lab.getByRole("checkbox", { name: label, exact: true }).uncheck();
      await select(lab, "Sonuç tahminin", "2");
      await explain(
        lab,
        "Gerekçen",
        "Halkada ayrı iki bağ kesimi iki parça verir. Sekiz birimde altı bağ kalır; tek başına kalan birim yoktur.",
      );
      await click(lab, "Kıyasla");
    },
    async assertModel(lab) {
      const result = lab.locator("[data-protein-summary]");
      for (const [key, value] of [
        ["data-fragments", "2"],
        ["data-bonds", "6"],
        ["data-free", "0"],
        ["data-fragment-mass", "594"],
      ])
        await expect(result).toHaveAttribute(key, value);
      await expect(lab.locator("svg [data-residue]")).toHaveCount(8);
      await expect(lab.locator("svg [data-peptide-edge]")).toHaveCount(8);
      await expect(lab.locator('svg [data-cut="true"]')).toHaveCount(2);
      await expect(lab.locator('[data-residue="1"] circle')).toHaveAttribute(
        "cy",
        "99",
      );
      await expect(lab.locator('.bc026-feedback[role="status"]')).toContainText(
        "Tahminin modelle uyumlu.",
      );
    },
  },
  {
    family: "HistoryA",
    id: "osmanli-medeniyeti",
    exam: "TYT",
    title: "Osmanlı medeniyeti: kurum, insan, kültür ve şehir",
    storedKey: "forge026:history:osmanli-medeniyeti",
    composition: {
      legacyLessonId: "osmanli-medeniyeti",
      legacyQuestionCount: 5,
      firstOptionCount: 5,
      legacyVisual: ".narrative-lab",
      separateQuestionSetId: "osmanli-medeniyeti-ileri",
    },
    persisted: {
      profile: 0,
      income: 10,
      deed: true,
      guess: "Denge",
      reveal: true,
    },
    expected: ["10 − 10 = 0", "izinli"],
    async act(lab) {
      await select(lab, "Hizmet profili", "0");
      await number(lab, "Gelir birimi", 10);
      await lab
        .getByRole("checkbox", {
          name: "Bu tahsis için vakfiye belgesi",
          exact: true,
        })
        .check();
      await select(lab, "Kanıt tahminin", "Denge");
      await explain(
        lab,
        "Gerekçen",
        "Gider 3 + 5 + 2 = 10; gelir 10, bakiye 0. Vakfiye üç tahsise izin verir; hesabın dengesiyle izin ayrı veridir.",
      );
      await click(lab, "Kanıtla karşılaştır");
    },
    async assertModel(lab) {
      const result = lab.locator("[data-model-result]");
      await expect(result).toHaveAttribute("data-compatible", "true");
      const diagram = lab.locator("svg.history026-diagram");
      await expect(diagram.locator("g")).toHaveCount(3);
      await expect(diagram.locator("path")).toHaveCount(2);
      await expect(diagram.locator("path").first()).toHaveAttribute(
        "d",
        "M135 98 V140",
      );
      await expect(diagram.locator("path").last()).toHaveAttribute(
        "d",
        "M135 222 V264",
      );
    },
  },
  {
    family: "HistoryB",
    id: "islam-medeniyetinin-dogusu",
    exam: "TYT",
    title: "İslam medeniyetinin doğuşu: olay, kurum ve kültür",
    storedKey: "forge026-history-b:islam-medeniyetinin-dogusu",
    composition: {
      legacyLessonId: "islam-medeniyetinin-dogusu",
      legacyQuestionCount: 10,
      firstOptionCount: 5,
      legacyVisual: ".narrative-lab",
      separateQuestionSetId: "islam-medeniyetinin-dogusu-ileri",
    },
    persisted: {
      from: 750,
      to: 1031,
      showIberia: true,
      guess: "4",
      checked: true,
    },
    expected: [
      "Seçili olaylar: 4",
      "750 – 1031",
      "1031: Endülüs Emevi halifeliği biter.",
    ],
    async act(lab) {
      await number(lab, "İlk yıl", 750);
      await number(lab, "Son yıl", 1031);
      await lab
        .getByRole("checkbox", { name: "Endülüs de göster", exact: true })
        .uncheck();
      await expect(lab.locator("svg [data-history-event]")).toHaveCount(1);
      await lab
        .getByRole("checkbox", { name: "Endülüs de göster", exact: true })
        .check();
      await select(lab, "Sonuç tahminin", "4");
      await explain(
        lab,
        "Modelden gerekçen",
        "Listede 750, 756, 929 ve 1031 var. Endülüs ayrı siyasi satırda; yıl farkı 281, olay sayısı 4.",
      );
      await click(lab, "Kanıtı karşılaştır");
    },
    async assertModel(lab) {
      await expect(lab.locator("[data-history-count]")).toHaveAttribute(
        "data-history-count",
        "4",
      );
      await expect(lab.locator("[data-year-difference]")).toHaveAttribute(
        "data-year-difference",
        "281",
      );
      await expect(lab.locator("svg [data-history-event]")).toHaveCount(4);
      await expect(lab.locator("svg [data-history-period]")).toHaveCount(3);
      for (const year of [750, 756, 929, 1031])
        await expect(lab.locator(`[data-history-event="${year}"]`)).toHaveCount(
          1,
        );
      const point = async (year) =>
        Number(
          await lab
            .locator(`[data-history-event="${year}"]`)
            .getAttribute("cx"),
        );
      const left = await point(750),
        right = await point(1031);
      expect(((await point(756)) - left) / (right - left)).toBeCloseTo(
        6 / 281,
        12,
      );
      expect(((await point(929)) - left) / (right - left)).toBeCloseTo(
        179 / 281,
        12,
      );
      const boundary = lab.locator('[data-history-period="sam-emevi"]');
      await expect(boundary).toHaveAttribute("data-from", "750");
      await expect(boundary).toHaveAttribute("data-to", "750");
      await expect(
        boundary.locator('[data-period-endpoint="750"]'),
      ).toHaveCount(1);
      await expect(
        lab.locator('.historyb026-feedback[role="status"]'),
      ).toContainText("Tahminin model sonucuyla uyumlu.");
      await expect(
        lab.locator('.historyb026-feedback[role="status"]'),
      ).toContainText("Sonuç: 4 olay.");
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
  await expect(
    page.locator(unit.composition.legacyVisual).first(),
  ).toBeVisible();
  const lab = page.locator(`[data-forge026="${unit.id}"]`);
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
export async function runForge026SmokeCase(page, navigate, unit) {
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
export async function assertForge026ProcessRestart(page, navigate, snapshots) {
  await expect.poll(() => page.evaluate(() => navigator.onLine)).toBe(false);
  expect(snapshots).toHaveLength(8);
  const before = learning(await readState(page));
  for (const snapshot of snapshots) {
    const unit = forge026SmokeCases.find((u) => u.id === snapshot.id);
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
