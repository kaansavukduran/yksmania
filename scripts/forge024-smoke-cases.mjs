import { expect } from "@playwright/test";
import { readForge014SmokeState as readState } from "./forge014-smoke-cases.mjs";

// Shared Pages/Electron contract. All expected values are independent literals;
// no production teaching data or numerical model is imported by this module.
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
  lab
    .getByRole("spinbutton", { name: name + ", sayıyla", exact: true })
    .fill(String(value));

export const forge024SmokeCases = [
  {
    family: "Math",
    id: "turev-teget",
    exam: "AYT",
    title: "Türev: kirişten teğete",
    storedKey: "forge024-math:turev-teget",
    composition: {
      legacyLessonId: "turev-teget",
      legacyQuestionCount: 5,
      separateQuestionSetId: "turev-teget-ileri",
    },
    persisted: {
      ca: 1,
      cb: 0,
      cc: 0,
      cd: 0,
      at: 1,
      stepIndex: 6,
      guess: "negative",
      checked: true,
    },
    expected: [
      "Temas T=(1; 1), teğet eğimi 3.",
      "Doğrusal tahmin 2,5; gerçek değer 3,375; gerçek − tahmin 0,875.",
      "Diğer kesişim: (-2; -8).",
    ],
    async act(lab) {
      for (const [label, value] of [
        ["A: x³ katsayısı", 1],
        ["B: x² katsayısı", 0],
        ["C: x katsayısı", 0],
        ["D: sabit", 0],
        ["Temas apsisi a", 1],
      ])
        await range(lab, label, value);
      await select(lab, "Kiriş adımı h", "6");
      await select(lab, "Sonuç tahminin", "negative");
      await explain(
        lab,
        "Modelden gerekçen",
        "Temas eğimi 3; dik normalin eğimi −1/3. İki doğru (1; 1) noktasından geçer.",
      );
      await click(lab, "Kanıtı gör");
    },
    async assertModel(lab) {
      await expect(lab.locator("[data-contact-result]")).toHaveText(
        "Temas T=(1; 1), teğet eğimi 3.",
      );
      await expect(lab.locator("[data-tangent-graph]")).toHaveAttribute(
        "data-unit-scale",
        "48",
      );
      const vector = async (selector) => {
        const d = await lab.locator(selector).getAttribute("d");
        const values = d.match(/-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/g).map(Number);
        return [values[2] - values[0], values[3] - values[1]];
      };
      const normal = await vector(".math024-normal"),
        tangent = await vector(".math024-tangent-line");
      expect(normal[0] * tangent[0] + normal[1] * tangent[1]).toBeCloseTo(0, 8);
      await expect(
        lab.locator('.math024-feedback[role="status"]'),
      ).toContainText("Tahminin bu koşullarla uyumlu.");
    },
  },
  {
    family: "Physics",
    id: "fotoelektrik-olay",
    exam: "AYT",
    title: "Fotoelektrik olay",
    storedKey: "forge024-physics-fotoelektrik-olay",
    persisted: {
      energy: 50,
      work: 20,
      flux: 10,
      yield: 50,
      bias: -30,
      guess: "Artar",
      checked: true,
    },
    expected: [
      "Üst enerji anotta 0 sınırında",
      "ideal doyma üst sınırı: 8,011 μA",
    ],
    async act(lab) {
      for (const [label, value] of [
        ["Foton enerjisi ×10 (eV)", 50],
        ["İş fonksiyonu ×10 (eV)", 20],
        ["Foton akısı ×10¹³ (s⁻¹)", 10],
        ["Kuantum verimi (%)", 50],
        ["Anot gerilimi ×10 (V)", -30],
      ])
        await number(lab, label, value);
      await lab.getByRole("radio", { name: "Artar", exact: true }).check();
      await explain(
        lab,
        "Modelden gerekçen",
        "Frekans ve η aynıyken I = eηΦ. Foton akısı iki kat olursa ideal doyma üst sınırı iki kat olur.",
      );
      await click(lab, "Kanıtla kıyasla");
    },
    async assertModel(lab) {
      const result = lab.locator("[data-model-result]");
      await expect(result).toHaveAttribute("data-emission", "true");
      await expect(result).toHaveAttribute("data-max-ev", "3");
      await expect(result).toHaveAttribute("data-stopping-v", "3");
      expect(Number(await result.getAttribute("data-current-a"))).toBeCloseTo(
        8.01088317e-6,
        14,
      );
      const graph = lab.locator(
          'svg[data-physics024-plot="photoelectric-energy"]',
        ),
        point = graph.locator(".physics024-probe-dot");
      await expect(point).toHaveCount(1);
      const width = Number(
        (await graph.getAttribute("viewBox")).split(/\s+/)[2],
      );
      expect(
        (Number(await point.getAttribute("cx")) - 40) / (width - 65),
      ).toBeCloseTo(0.5, 10);
      expect(Number(await point.getAttribute("cy"))).toBeCloseTo(188, 10);
      await expect(
        lab.locator('.physics024-feedback[role="status"]'),
      ).toContainText("Tahminin koşullarla uyumlu.");
    },
  },
  {
    family: "BioA",
    id: "ayt-govde-yapisi",
    exam: "AYT",
    title: "Bitki gövdesi: düğümden iletim halkasına",
    storedKey: "forge024:biology-a:ayt-govde-yapisi",
    persisted: {
      kind: "dicot",
      seasons: 4,
      tissue: "cambium",
      node: 3,
      prediction: "secondary",
      checked: true,
    },
    expected: ["Çizilen büyüme halkası: 4"],
    async act(lab) {
      await select(lab, "Tipik gövde düzeni", "dicot");
      await select(lab, "Kesitte vurgulanan doku", "cambium");
      await range(lab, "Verilen büyüme mevsimi", 4);
      await range(lab, "Sürgünde seçili düğüm", 3);
      await select(lab, "Sonuç tahminin", "secondary");
      await explain(
        lab,
        "Gerekçen (en çok 120 karakter)",
        "Verilen dikot modelinde kambiyum içe ksilem ekler; dört mevsim dört halkadır.",
      );
      await click(lab, "Kanıtı karşılaştır");
    },
    async assertModel(lab) {
      await expect(lab.locator("[data-model-result]")).toHaveAttribute(
        "data-ring-count",
        "4",
      );
      await expect(lab.locator("svg [data-growth-ring]")).toHaveCount(4);
      await expect(lab.locator("svg[data-stem-tissue]")).toHaveAttribute(
        "data-stem-tissue",
        "cambium",
      );
      await expect(lab.locator('[data-shoot-node="3"]')).toHaveAttribute(
        "data-selected",
        "true",
      );
      await expect(
        lab.locator('.bio024a-feedback[role="status"]'),
      ).toContainText("Tahminin sonuçla uyumlu.");
    },
  },
  {
    family: "BioB",
    id: "bitki-hormonlari",
    exam: "AYT",
    title: "Bitkisel hormonlar: doz, hedef doku ve ortak yanıt",
    storedKey: "forge024:biology-b:bitki-hormonlari",
    persisted: {
      organ: "root",
      dose: 4,
      auxin: 2,
      cytokinin: 7,
      prediction: "inhibition",
      checked: true,
    },
    expected: ["Seçili yanıt: -45 kontrol göreli birim."],
    async act(lab) {
      await select(lab, "Oksin uygulanan doku", "root");
      await range(lab, "Oksin doz basamağı", 4);
      await range(lab, "Kültürde oksin birimi", 2);
      await range(lab, "Kültürde sitokinin birimi", 7);
      await select(lab, "Sonuç tahminin", "inhibition");
      await explain(
        lab,
        "Gerekçen (en çok 120 karakter)",
        "Kökün D4 yanıtı −45; bu, sıfır uzama değil kendi kontrolünün altında uzama demektir.",
      );
      await click(lab, "Kanıtı karşılaştır");
    },
    async assertModel(lab) {
      await expect(lab.locator("[data-model-result]")).toHaveAttribute(
        "data-auxin-value",
        "-45",
      );
      await expect(lab.locator("[data-culture-outcome]")).toHaveAttribute(
        "data-culture-outcome",
        "shoot",
      );
      await expect(lab.locator("[data-culture-shoot]")).toHaveCount(1);
      await expect(lab).toContainText("Oksin / sitokinin oranı 0,3");
      await expect(
        lab.locator('.bio024b-feedback[role="status"]'),
      ).toContainText("Tahminin sonuçla uyumlu.");
    },
  },
  {
    family: "Chem",
    id: "ayt-eterler",
    exam: "AYT",
    title: "Eterler",
    storedKey: "forge024:chemistry:ayt-eterler",
    persisted: {
      left: 3,
      right: 3,
      atom: "ether-o",
      guess: "symmetric",
      checked: true,
    },
    expected: ["C₆H₁₄O", "O–H vericisi yok"],
    async act(lab) {
      await select(lab, "Sol düz alkil C sayısı", "3");
      await select(lab, "Sağ düz alkil C sayısı", "3");
      await select(lab, "Atomu seç", "ether-o");
      await select(lab, "Eter simetrisi", "symmetric");
      await explain(
        lab,
        "Gerekçen",
        "İki tarafta aynı düz propil grubu var; C6H14O eterinde O üzerinde H yok.",
      );
      await click(lab, "Kıyasla");
    },
    async assertModel(lab) {
      const result = lab.locator("[data-model-result]"),
        molecule = lab.locator("svg").first();
      await expect(result).toHaveAttribute("data-formula", "C6H14O");
      await expect(result).toHaveAttribute("data-comparison-formula", "C6H14O");
      await expect(result).toHaveAttribute("data-symmetric", "true");
      await expect(molecule.locator("[data-atom]")).toHaveCount(7);
      await expect(molecule.locator("[data-bond]")).toHaveCount(6);
      await expect(molecule.locator('[data-atom="ether-o"]')).toHaveClass(
        /c024-selected/,
      );
      await expect(lab.locator(".c024-atom-evidence")).toContainText(
        "gizli H 0",
      );
      await expect(lab.locator('.c024-feedback[role="status"]')).toContainText(
        "Kanıtla uyumlu.",
      );
    },
  },
  {
    family: "Human",
    id: "dunya-ve-ahiret",
    exam: "TYT",
    title: "Dünya ve ahiret: anlam, evreler ve uğurlama",
    storedKey: "forge024-humanities:dunya-ve-ahiret",
    persisted: {
      worldStory: 0,
      worldFocus: 1,
      worldDetail: true,
      reveal: true,
    },
    expected: ["Mahşer adı açık"],
    async act(lab) {
      await select(lab, "İncelenen anlatım", "0");
      await select(lab, "Sorulan boyut", "1");
      await lab
        .getByRole("checkbox", {
          name: "Ek ayrıntı metne eklendi",
          exact: true,
        })
        .check();
      await explain(
        lab,
        "Gerekçen",
        "Toplanma eylemi aynı kaldı; ek cümlede toplanılan yerin mahşer adı açıkça verildi.",
      );
      await click(lab, "Gerekçemle karşılaştır");
    },
    async assertModel(lab) {
      const diagram = lab.locator("svg[data-evidence-diagram]");
      await expect(diagram).toContainText("Mahşer adı açık");
      await expect(diagram.locator(".humanities024-link")).toHaveCount(2);
      await expect(diagram.locator(".is-missing")).toHaveCount(0);
      await expect(
        lab.getByRole("checkbox", {
          name: "Ek ayrıntı metne eklendi",
          exact: true,
        }),
      ).toBeChecked();
    },
  },
  {
    family: "TR",
    id: "paragrafta-coklu-sorular",
    exam: "TYT",
    title: "Aynı parçaya bağlı çoklu sorular: her köke ayrı kanıt",
    storedKey: "forge024-turkish:paragrafta-coklu-sorular",
    persisted: {
      caseId: "greenhouse",
      question: 2,
      selected: 3,
      guess: "yes",
      show: true,
    },
    expected: ["Bu verilerle kesin bir sonuç yok."],
    async act(lab) {
      await select(lab, "İncelenen örnek", "greenhouse");
      await select(lab, "İncelenen soru", "2");
      await lab
        .getByRole("button", { name: /^4\. Fidanların büyüme hızı/ })
        .click();
      await select(lab, "Karar tahminin", "yes");
      await explain(
        lab,
        "Kanıtın",
        "Dördüncü cümle büyümenin ölçülmediğini, son cümle ayrı izlemeyi veriyor.",
      );
      await click(lab, "Tahminimi karşılaştır");
    },
    async assertModel(lab) {
      const graph = lab.locator("svg[data-evidence-graph]");
      await expect(graph).toHaveAttribute("data-selected", "3");
      await expect(graph).toHaveAttribute("data-revealed", "true");
      await expect(graph.locator("[data-sentence]")).toHaveCount(5);
      await expect(graph.locator('[data-support="true"]')).toHaveCount(2);
      for (const index of [3, 4])
        await expect(
          graph.locator(`[data-sentence="${index}"]`),
        ).toHaveAttribute("data-support", "true");
      await expect(graph.locator('[data-sentence="1"]')).toHaveAttribute(
        "data-support",
        "false",
      );
      await expect(graph.locator('[data-sentence="3"] > path')).toHaveAttribute(
        "d",
        "M87 256 L179 184",
      );
      await expect(
        lab.locator('[data-model-result] [role="status"]'),
      ).toContainText("Tahminin modelin kararıyla aynı yönde.");
    },
  },
];

// Reading positions and bookmarks are deliberately outside scored evidence.
// Opening theory, changing a field and explaining a model must not create a score.
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
  const lab = page.locator(`[data-forge024="${unit.id}"]`);
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
export async function runForge024SmokeCase(page, navigate, unit) {
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
export async function assertForge024ProcessRestart(page, navigate, snapshots) {
  await expect.poll(() => page.evaluate(() => navigator.onLine)).toBe(false);
  expect(snapshots).toHaveLength(7);
  const before = learning(await readState(page));
  for (const snapshot of snapshots) {
    const unit = forge024SmokeCases.find((u) => u.id === snapshot.id);
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
