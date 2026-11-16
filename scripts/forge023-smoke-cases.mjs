import { expect } from "@playwright/test";
import { readForge014SmokeState as readState } from "./forge014-smoke-cases.mjs";

// Shared by Pages and the packaged application. Expected outcomes are literal
// independent calculations or passage readings; no application model is imported.
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

export const forge023SmokeCases = [
  {
    family: "Math",
    id: "ayt-logaritma",
    exam: "AYT",
    title: "Logaritma: üssü ara, koşulu koru",
    storedKey: "forge023-math:ayt-logaritma",
    persisted: {
      base: "0.5",
      x: 4,
      horizontal: 0,
      vertical: 0,
      guess: "defined",
      checked: true,
    },
    expected: ["f(4)≈-2. Ters kontrol h+a^(y−v)≈4.", "azalan"],
    async act(lab) {
      await select(lab, "Taban", "0.5");
      await range(lab, "Seçili x", 4);
      await range(lab, "Yatay kayma h", 0);
      await range(lab, "Düşey kayma v", 0);
      await select(lab, "Sonuç tahminin", "defined");
      await explain(
        lab,
        "Modelden gerekçen",
        "(1/2) üzeri -2 eşittir 4; iç pozitif, ters hesap aynı 4 değerini verir.",
      );
      await click(lab, "Kanıtı gör");
    },
    async assertModel(lab) {
      // (1/2)^(-2)=4. Equal axis ranges [-7,7] map this to
      // x=64+11/14*264, y=312-5/14*264 in the actual SVG contract.
      const point = lab.locator("[data-log-point]");
      await expect(point).toHaveCount(1);
      expect(Number(await point.getAttribute("cx"))).toBeCloseTo(
        271.42857142857144,
        9,
      );
      expect(Number(await point.getAttribute("cy"))).toBeCloseTo(
        217.71428571428572,
        9,
      );
      await expect(
        lab.locator('.math023-feedback[role="status"]'),
      ).toContainText("Tahminin bu koşullarla uyumlu.");
    },
  },
  {
    family: "Physics",
    id: "doppler-etkisi",
    exam: "AYT",
    title: "Doppler etkisi: dalga cephelerinden gözlenen frekansa",
    storedKey: "forge023-physics-doppler-etkisi",
    persisted: {
      kind: "sound",
      frequency: 450,
      source: 34,
      receiver: -34,
      guess: "Artar",
      checked: true,
    },
    expected: [
      "Alınan frekans: 550 Hz",
      "Ön dalga boyu: 0,68 m",
      "Alıcının tepe alma hızı: 374 m/s",
    ],
    async act(lab) {
      await select(lab, "Dalga", "sound");
      for (const [label, value] of [
        ["Kaynak frekansı (Hz)", "450"],
        ["Kaynak hızı (m/s)", "34"],
        ["Alıcı hızı (m/s)", "-34"],
      ]) {
        await lab
          .getByRole("spinbutton", { name: label + ", sayıyla", exact: true })
          .fill(value);
      }
      await lab.getByRole("radio", { name: "Artar", exact: true }).check();
      await explain(
        lab,
        "Modelden gerekçen",
        "Hava 340 m/s; ön aralık (340-34)/450=0,68 m, alıcı 374 m/s ile tepe alır: 550 Hz.",
      );
      await click(lab, "Kanıtla kıyasla");
    },
    async assertModel(lab) {
      const result = lab.locator("[data-model-result]");
      expect(
        Number(await result.getAttribute("data-frequency-hz")),
      ).toBeCloseTo(550, 10);
      expect(Number(await result.getAttribute("data-forward-m"))).toBeCloseTo(
        0.68,
        12,
      );
      expect(Number(await result.getAttribute("data-backward-m"))).toBeCloseTo(
        0.8311111111111111,
        12,
      );
      const fronts = lab.locator("svg [data-front-cycle]");
      await expect(fronts).toHaveCount(7);
      const values = await fronts.evaluateAll((es) =>
        es.map((e) => ({
          cx: Number(e.getAttribute("cx")),
          r: Number(e.getAttribute("r")),
        })),
      );
      for (let i = 1; i < values.length; i++) {
        // Adjacent emission centres move v_source/c=0.1 of the radius
        // gained by a wave during one source period, on the same SVG scale.
        expect(
          Math.abs(
            (values[i].cx - values[i - 1].cx) / (values[i].r - values[i - 1].r),
          ),
        ).toBeCloseTo(0.1, 10);
      }
      await expect(
        lab.locator('.physics023-feedback[role="status"]'),
      ).toContainText("Tahminin koşullarla uyumlu.");
    },
  },
  {
    family: "Biology",
    id: "bitki-ortu-doku",
    exam: "AYT",
    title: "Bitkisel örtü doku: koruyan yüzey, denetlenen geçit",
    storedKey: "forge023:biology:bitki-ortu-doku",
    persisted: {
      surface: "hydathode",
      solute: -12,
      pressure: 9,
      outside: -15,
      prediction: "out",
      checked: true,
    },
    expected: [
      "Net su: dışarı",
      "Hücre Ψ=-1,2+0,9=-0,3 MPa; dış Ψ=-1,5 MPa",
      "Turgor: 0,9 MPa",
    ],
    async act(lab) {
      await select(lab, "Yüzey yapısı", "hydathode");
      await range(lab, "Çözünen potansiyeli", -12);
      await range(lab, "Turgor basıncı", 9);
      await range(lab, "Dış su potansiyeli", -15);
      await select(lab, "Sonuç tahminin", "out");
      await explain(
        lab,
        "Gerekçen (en çok 120 karakter)",
        "Hücre -1,2+0,9=-0,3 MPa; dış -1,5 MPa. Su yüksek iç potansiyelden düşük dış potansiyele gider.",
      );
      await click(lab, "Kanıtı karşılaştır");
    },
    async assertModel(lab) {
      const result = lab.locator("[data-model-result]");
      expect(Number(await result.getAttribute("data-water-cell"))).toBeCloseTo(
        -0.3,
        12,
      );
      expect(
        Number(await result.getAttribute("data-water-difference")),
      ).toBeCloseTo(-1.2, 12);
      const arrow = lab.locator("svg [data-water-direction]");
      await expect(arrow).toHaveAttribute("data-water-direction", "out");
      await expect(arrow).toHaveAttribute("d", "M112 110 H35");
      await expect(
        lab.getByRole("combobox", { name: "Yüzey yapısı", exact: true }),
      ).toHaveValue("hydathode");
      await expect(
        lab.locator('.bio023-feedback[role="status"]'),
      ).toContainText("Tahminin sonuçla uyumlu.");
    },
  },
  {
    family: "Chemistry",
    id: "ayt-sikloalkanlar",
    exam: "AYT",
    title: "Sikloalkanlar ve izomerlik: bağı say, yapıyı karşılaştır",
    storedKey: "forge023:chemistry:ayt-sikloalkanlar",
    persisted: {
      first: "cyclopentane",
      second: "pent1",
      focus: 2,
      prediction: "isomer",
      checked: true,
    },
    expected: [
      "İlk formül: C5H10. Sigma: 15; pi: 0; halka: 1",
      "İkinci formül: C5H10. Sigma: 14; pi: 1; halka: 0",
      "Zincir / halka",
    ],
    async act(lab) {
      await select(lab, "İlk yapı", "cyclopentane");
      await select(lab, "İkinci yapı", "pent1");
      await select(lab, "Atomu seç", "2");
      await select(lab, "Bu iki yapı nasıl ilişkili?", "isomer");
      await explain(
        lab,
        "Gerekçen",
        "İki yapı C5H10. Halkada beş C-C sigma bağı; açık zincirde dört C-C sigma ve bir pi bağı var.",
      );
      await click(lab, "Kıyasla");
    },
    async assertModel(lab) {
      const result = lab.locator("[data-model-result]");
      await expect(result).toHaveAttribute("data-first-formula", "C5H10");
      await expect(result).toHaveAttribute("data-second-formula", "C5H10");
      await expect(result).toHaveAttribute("data-relationship", "Zincir–halka");
      const ring = lab.locator("svg").first();
      await expect(ring.locator("[data-atom]")).toHaveCount(5);
      await expect(ring.locator("[data-bond]")).toHaveCount(5);
      expect(
        await ring
          .locator("[data-atom]")
          .evaluateAll((es) =>
            es.map((e) => Number(e.getAttribute("data-hydrogens"))),
          ),
      ).toEqual([2, 2, 2, 2, 2]);
      await expect(ring.locator('[data-atom="2"]')).toHaveClass(/c023-focus/);
      await expect(lab.locator('.c023-feedback[role="status"]')).toContainText(
        "Kanıtla uyumlu.",
      );
    },
  },
  {
    family: "HumanitiesA",
    id: "ahlaki-tutum-ve-davranislar",
    exam: "TYT",
    title: "Ahlak ve değerler: ilkeden somut davranışa",
    storedKey: "forge023-humanities-a:ahlaki-tutum-ve-davranislar",
    persisted: {
      needA: 3,
      needB: 9,
      resource: 8,
      method: "need",
      guess: "Açık ihtiyaç kalır",
      compared: true,
    },
    expected: [
      "A: 2 saat, B: 6 saat",
      "Kalan ihtiyaç: 1 ve 3 saat",
      "Açık ihtiyaç kalır",
    ],
    async act(lab) {
      await range(lab, "A’nın ihtiyacı", 3);
      await range(lab, "B’nin ihtiyacı", 9);
      await range(lab, "Ayrılan kaynak", 8);
      await select(lab, "Dağıtım yöntemi", "need");
      await select(lab, "Tahminin", "Açık ihtiyaç kalır");
      await explain(
        lab,
        "Gerekçen",
        "Toplam ihtiyaç 12 saat; 8 saati 3:9 oranında bölünce A 2, B 6 alır. Açıklar 1 ve 3 saattir.",
      );
      await click(lab, "Tahminimi karşılaştır");
    },
    async assertModel(lab) {
      await expect(lab.locator("svg[data-allocation-method]")).toHaveAttribute(
        "data-allocation-method",
        "need",
      );
      const shares = lab.locator("svg [data-share-hours]");
      await expect(shares).toHaveCount(2);
      const widths = await shares.evaluateAll((es) =>
        es.map((e) => Number(e.getAttribute("width"))),
      );
      expect(widths[0]).toBeCloseTo(53.333333333333336, 10);
      expect(widths[1]).toBeCloseTo(160, 10);
      await expect(
        lab.locator('.humanities023a-feedback[role="status"]'),
      ).toContainText("Seçimin bu veriyle uyumlu.");
    },
  },
  {
    family: "HumanitiesB",
    id: "islam-dusuncesinde-mezhepler",
    exam: "TYT",
    title: "İslam düşüncesinde mezhepler: neden, alan ve yöntem",
    storedKey: "forge023-humanities-b:islam-dusuncesinde-mezhepler",
    persisted: { school: 4, field: 1, show: true },
    expected: [
      "Alan uyuşmuyor: Hanefilik, fıkhi yorumdur.",
      "Filtre İtikadi; Hanefilik ise fıkhi alandadır.",
    ],
    async act(lab) {
      await select(lab, "İncelenen ekol", "4");
      await select(lab, "Alan filtresi", "1");
      await explain(
        lab,
        "İlişkiyi kendi cümlenle açıkla",
        "Hanefilik fıkhi alandadır; itikadi filtre seçilen alanı dışlar. Üst çerçeve ve öncü bağı ayrıca korunur.",
      );
      await click(lab, "Kanıtla karşılaştır");
    },
    async assertModel(lab) {
      const svg = lab.locator('svg[data-model-kind="2"]');
      await expect(svg).toHaveCount(1);
      await expect(svg).toContainText("Ehlisünnet");
      await expect(svg).toContainText("Fıkhi");
      await expect(svg).toContainText("Hanefilik");
      await expect(svg).toContainText("Ebû Hanife");
      await expect(svg.locator(".humanitiesB023-link")).toHaveCount(3);
      await expect(svg.locator(".is-unmatched")).toHaveCount(1);
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Kanıt eksik veya uyuşmuyor",
      );
    },
  },
  {
    family: "Turkish",
    id: "paragrafta-soru-cevap",
    exam: "TYT",
    title: "Paragrafta soru–cevap: yanıtın odağından doğru soruya",
    storedKey: "forge023-turkish:paragrafta-soru-cevap",
    persisted: {
      caseId: "exhibit",
      choice: 1,
      selected: 1,
      guess: "Yanıt var",
      compared: true,
    },
    expected: [
      "Salonun denetimi bitmediği için.",
      "Seçili 2. cümle: Bu soruya kanıt olur.",
    ],
    async act(lab) {
      await select(lab, "İncelenen metin", "exhibit");
      await select(lab, "İncelenen soru", "1");
      await click(
        lab,
        "2. cümle Açılış ertelendi; salonun denetimi bitmemişti.",
      );
      await select(lab, "Karar tahminin", "Yanıt var");
      await explain(
        lab,
        "Metinden gerekçen",
        "Ertelemenin nedeni soruluyor; ikinci cümlede salonun denetiminin bitmemesi doğrudan gerekçe olarak veriliyor.",
      );
      await click(lab, "Tahminimi karşılaştır");
    },
    async assertModel(lab) {
      const svg = lab.locator("svg[data-answer-graph]");
      await expect(svg).toHaveAttribute("data-question", "1");
      await expect(svg).toHaveAttribute("data-evidence", "1");
      await expect(svg.locator("[data-sentence]")).toHaveCount(5);
      await expect(svg.locator('[data-support="true"]')).toHaveCount(1);
      await expect(svg.locator('[data-sentence="1"]')).toHaveAttribute(
        "data-support",
        "true",
      );
      await expect(svg.locator('[data-sentence="1"] > path')).toHaveAttribute(
        "d",
        "M96 70 L160 165",
      );
      await expect(
        lab.locator('.turkish023-feedback[role="status"]'),
      ).toContainText("Tahminin kanıtla aynı yönde.");
    },
  },
];

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
  await page.locator(".ready-topic").filter({ hasText: unit.title }).click();
  const lab = page.locator(`[data-forge023="${unit.id}"]`);
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

export async function runForge023SmokeCase(page, navigate, unit) {
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
  expect(saved.reason.trim().length).toBeGreaterThan(8);
  expect(learning(await readState(page))).toEqual(before);
  await page.reload();
  await outcome(await open(page, navigate, unit), unit);
  expect((await readState(page)).explorations[unit.storedKey]).toEqual(saved);
  expect(learning(await readState(page))).toEqual(before);
  return { id: unit.id, storedKey: unit.storedKey, saved };
}

export async function assertForge023ProcessRestart(page, navigate, snapshots) {
  await expect.poll(() => page.evaluate(() => navigator.onLine)).toBe(false);
  expect(snapshots).toHaveLength(7);
  const before = learning(await readState(page));
  for (const snapshot of snapshots) {
    const unit = forge023SmokeCases.find((u) => u.id === snapshot.id);
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
