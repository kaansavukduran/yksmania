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

export const forge021SmokeCases = [
  {
    id: "donusum-oteleme-donme",
    exam: "AYT",
    title: "Öteleme ve dönme: hareketin sırasını keşfet",
    storedKey: "forge021-geometry:donusum-oteleme-donme",
    persisted: {
      px: 4,
      py: 3,
      dx: 0,
      dy: 0,
      cx: 1,
      cy: -1,
      angle: 90,
      shape: "point",
      prediction: "same",
      checked: true,
    },
    expected: ["İki sıra bu verilerde aynı"],
    async act(lab) {
      for (const [label, value] of [
        ["A yatay", 4],
        ["A düşey", 3],
        ["Öteleme x", 0],
        ["Öteleme y", 0],
        ["Merkez x", 1],
        ["Merkez y", -1],
        ["Dönme açısı", 90],
      ])
        await setRange(lab, label, value);
      await lab
        .getByRole("combobox", { name: "Şekil", exact: true })
        .selectOption("point");
      await lab.getByLabel("Tahminin", { exact: true }).selectOption("same");
      await lab
        .getByLabel("Gerekçen", { exact: true })
        .fill(
          "Öteleme sıfır; merkezden (3;4), 90° ile (-4;3) olur; merkez eklenince (-3;2).",
        );
      await lab
        .getByRole("button", { name: "Kanıtla dene", exact: true })
        .click();
    },
    async assertModel(lab) {
      await expect(lab.locator("[data-transform-result]")).toHaveText(
        "(-3; 2)",
      );
      await expect(lab.locator(".g021-feedback")).toContainText(
        "Tahminin model kanıtıyla uyumlu.",
      );
      const p = lab.locator('[data-named-point*="A′"] circle');
      await expect(p).toHaveCount(1);
      const g = await lab.locator("[data-named-point]").evaluateAll((nodes) => {
        const read = (name) => {
          const el = nodes.find((n) =>
            n.getAttribute("data-named-point").split("/").includes(name),
          );
          const c = el.querySelector("circle");
          return {
            x: Number(c.getAttribute("cx")),
            y: Number(c.getAttribute("cy")),
          };
        };
        return { a: read("A"), c: read("C"), image: read("A′") };
      });
      const sx = (g.a.x - g.c.x) / 3,
        sy = -(g.a.y - g.c.y) / 4;
      expect(sx).toBeGreaterThan(0);
      expect(sx).toBeCloseTo(sy, 8);
      expect(g.image.x).toBeCloseTo(g.c.x - 4 * sx, 7);
      expect(g.image.y).toBeCloseTo(g.c.y - 3 * sy, 7);
    },
  },
  {
    id: "donerek-oteleme-hareketi",
    exam: "AYT",
    title: "Dönerek öteleme hareketi",
    storedKey: "forge021-physics-donerek-oteleme-hareketi",
    svg: 'svg[data-physics021-plot="rolling-velocity"]',
    persisted: {
      mass: 2,
      radius: 40,
      velocity: 2,
      mode: "free",
      body: "disk",
      omega: -3,
      time: 0,
      initial: 90,
      guess: "Sağa",
      checked: true,
    },
    expected: [
      "Yere göre hız: (3,2; 0) m/s",
      "v + ωR = 0,8 m/s",
      "toplam K = 4,72 J",
    ],
    async act(lab) {
      await lab
        .getByLabel("Temas modeli", { exact: true })
        .selectOption("free");
      await setRange(lab, "ω (rad/s)", -3);
      await setRange(lab, "Zaman (0,1 s)", 0);
      await setRange(lab, "İlk açı (°)", 90);
      await lab.getByRole("radio", { name: "Sağa", exact: true }).check();
      await lab
        .getByLabel("Modelden gerekçen", { exact: true })
        .fill("Alt temas: 2−3×0,4=0,8 m/s sağa; üst nokta: 2+1,2=3,2 m/s.");
      await lab
        .getByRole("button", {
          name: "Tahminimi kanıtla karşılaştır",
          exact: true,
        })
        .click();
    },
    async assertModel(lab) {
      for (const [name, x, y] of [
        ["translation", 2, 0],
        ["spin", 1.2, 0],
        ["ground", 3.2, 0],
      ]) {
        const p = lab.locator(`[data-vector="${name}"]`);
        expect(Number(await p.getAttribute("data-x"))).toBeCloseTo(x, 8);
        expect(Number(await p.getAttribute("data-y"))).toBeCloseTo(y, 8);
        const g = await p.evaluate((el) => {
          const n = el
            .getAttribute("d")
            .match(/[-+]?(?:\d*\.)?\d+(?:e[-+]?\d+)?/gi)
            .map(Number);
          return {
            dx: n[2] - n[0],
            dy: n[3] - n[1],
            scale: Number(el.getAttribute("data-scale")),
          };
        });
        expect(g.dx).toBeCloseTo(x * g.scale, 7);
        expect(g.dy).toBeCloseTo(-y * g.scale, 7);
      }
      await expect(lab.locator(".physics021-feedback")).toContainText(
        "Tahminin verilen koşullarla uyumlu.",
      );
    },
  },
  {
    id: "ayt-kodon-antikodon",
    exam: "AYT",
    title: "Kodon ve antikodon: bilgiyi yönüyle oku",
    storedKey: "forge021:biology-a:ayt-kodon-antikodon",
    persisted: {
      first: "U",
      second: "G",
      third: "G",
      prediction: "amino",
      checked: true,
    },
    expected: ["Triptofan (Trp)", "3′ ACC 5′", "5′ CCA 3′"],
    async act(lab) {
      for (const [label, base] of [
        ["İlk baz", "U"],
        ["İkinci baz", "G"],
        ["Üçüncü baz", "G"],
      ])
        await lab
          .locator("fieldset")
          .filter({ hasText: label })
          .getByRole("button", { name: base, exact: true })
          .click();
      await lab
        .getByRole("button", { name: "Amino asit", exact: true })
        .click();
      await lab
        .getByLabel("Gerekçen (en çok 120 karakter)", { exact: true })
        .fill(
          "UGG triptofan kodonu; karşılıklı antikodon 3′ACC5′, diğer yazımı 5′CCA3′.",
        );
      await lab
        .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
        .click();
    },
    async assertModel(lab) {
      await expect(lab.locator("[data-codon]")).toHaveAttribute(
        "data-codon",
        "UGG",
      );
      await expect(lab.locator("[data-anticodon]")).toHaveAttribute(
        "data-anticodon",
        "ACC",
      );
      await expect(lab.locator('.ba021-feedback[role="status"]')).toContainText(
        "Seçimin modelle uyumlu.",
      );
    },
  },
  {
    id: "fotosentez-hiz-faktorleri",
    exam: "AYT",
    title: "Fotosentezin hızını belirleyen çevre ve genetik faktörler",
    storedKey: "forge021-bio-b-photo",
    persisted: { light: 8, carbon: 80, condition: "suitable", respiration: 10 },
    extraPersisted: [
      {
        storedKey: "forge021-bio-b-predict-photo",
        persisted: {
          prediction: "in",
          checked: true,
          context: "8|80|suitable|10",
        },
      },
    ],
    expected: ["Brüt hız: 8", "net O₂: -2"],
    async act(lab) {
      await setRange(lab, "Işık kapasitesi", 8);
      await lab.getByLabel("Tahminin", { exact: true }).selectOption("in");
      await lab
        .getByLabel("Gerekçen", { exact: true })
        .fill("Brüt8, solunum10; net−2 olduğundan O₂ içeri alınır.");
      await lab
        .getByRole("button", { name: "Kanıtla kıyasla", exact: true })
        .click();
    },
    async assertModel(lab) {
      expect(
        Number(
          await lab
            .locator('[data-bio021-capacity="light"]')
            .getAttribute("width"),
        ),
      ).toBeCloseTo(14.4, 8);
      await expect(lab.locator("[data-bio021-net]")).toHaveAttribute(
        "x",
        "114",
      );
      await expect(lab.locator("[data-bio021-net]")).toHaveAttribute(
        "width",
        "6",
      );
      await expect(lab.locator("[data-bio021-net-point]")).toHaveAttribute(
        "cx",
        "114",
      );
      await expect(
        lab.locator('.bio021b-feedback[role="status"]'),
      ).toContainText("Seçimin kanıtla uyumlu.");
    },
  },
  {
    id: "cozunurluk-faktorleri",
    exam: "AYT",
    title: "Çözünürlük dengesi: sıcaklık ve ortak iyon",
    storedKey: "forge021-chemistry-cozunurluk-faktorleri",
    persisted: {
      thermal: "endo",
      temperature: 25,
      common: 0.03,
      amount: 0.04,
      volume: 1,
      prediction: "solid",
      checked: true,
    },
    expected: ["Katı kalır"],
    async act(lab) {
      await lab
        .getByLabel("Çözünme ısısı", { exact: true })
        .selectOption("endo");
      await lab.getByLabel("Sıcaklık", { exact: true }).selectOption("25");
      await setRange(lab, "Ortak M⁺ (mol/L)", 0.03);
      const input = lab.getByRole("textbox", {
        name: "Tuz stoku (mol), sayıyla",
        exact: true,
      });
      await input.fill("0,04");
      await input.press("Enter");
      await lab.getByLabel("Tahminin", { exact: true }).selectOption("solid");
      await lab
        .getByLabel("Gerekçen", { exact: true })
        .fill(
          "(0,03+s)s=0,0004; s=0,01 mol/L, bir litre ve stok0,04 mol ile katı0,03 mol.",
        );
      await lab
        .getByRole("button", { name: "Tahmini kıyasla", exact: true })
        .click();
    },
    async assertModel(lab) {
      const r = lab.locator("[data-model-result]");
      for (const [key, value] of [
        ["saturation", 0.01],
        ["solid", 0.03],
        ["dissolved", 0.01],
        ["quotient", 0.0004],
      ])
        expect(Number(await r.getAttribute(`data-${key}`))).toBeCloseTo(
          value,
          12,
        );
      expect(
        Number(await lab.locator(".c021-solid").getAttribute("height")),
      ).toBeCloseTo(15, 8);
      await expect(
        lab.locator('.c021-evidence > p[role="status"]'),
      ).toContainText("Tahminin modelle uyumlu.");
    },
  },
  {
    id: "din-felsefesi",
    exam: "TYT",
    title: "Din felsefesi: kavram, inanç ve gerekçe",
    storedKey: "forge021-humanities:din-felsefesi",
    persisted: {
      argument: "cause",
      claim: "rich",
      bridge: true,
      guess: "Geçiş açık",
      compared: true,
    },
    expected: ["Başlangıç türü: Kozmolojik."],
    async act(lab) {
      await lab
        .getByRole("combobox", { name: "Argümanın başlangıcı", exact: true })
        .selectOption("cause");
      await lab
        .getByRole("combobox", { name: "Sonucun kapsamı", exact: true })
        .selectOption("rich");
      await lab
        .getByRole("checkbox", {
          name: "Ek nitelik için öncül var",
          exact: true,
        })
        .check();
      await lab
        .getByLabel("Tahminin", { exact: true })
        .selectOption("Geçiş açık");
      await lab
        .getByLabel("Gerekçen", { exact: true })
        .fill(
          "Kişisel ve mutlak iyi nitelikleri için ek öncül açık; öncül doğruluğu ayrıca tartışılır.",
        );
      await lab
        .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
        .click();
    },
    async assertModel(lab) {
      await expect(lab.locator('svg [data-relation="3-4"]')).toHaveAttribute(
        "data-active",
        "true",
      );
      await expect(lab.locator('[data-node="3"]')).toContainText(
        "kişisel ve mutlak iyi",
      );
      await expect(lab.locator(".humanities021-feedback")).toContainText(
        "Seçimin bu bağlamla uyumlu.",
      );
    },
  },
  {
    id: "paragrafta-siralama",
    exam: "TYT",
    title: "Paragrafta sıralama: cümlelerden düşünce yoluna",
    storedKey: "forge021-turkish:paragrafta-siralama",
    persisted: {
      case: "arsiv",
      order: "ABCDE",
      selected: 3,
      guess: "Bağlar tam",
      compared: true,
    },
    expected: ["Kurulan bağ: 4 / 4."],
    async act(lab) {
      await lab
        .getByRole("combobox", { name: "Örnek", exact: true })
        .selectOption("arsiv");
      for (const [target, id] of [..."ABCDE"].entries()) {
        const row = lab.locator(`[data-sentence="${id}"]`);
        let position = Number(await row.getAttribute("data-position"));
        while (position > target) {
          await lab
            .getByRole("button", {
              name: `Cümle ${id} yukarı taşınsın`,
              exact: true,
            })
            .click();
          await expect(row).toHaveAttribute(
            "data-position",
            String(position - 1),
          );
          position--;
        }
      }
      await lab
        .getByRole("button", {
          name: "Cümle D şemada vurgulansın",
          exact: true,
        })
        .click();
      await lab
        .getByLabel("Tahminin", { exact: true })
        .selectOption("Bağlar tam");
      await lab
        .getByLabel("Gerekçen", { exact: true })
        .fill(
          "Plan, yıl grubu, klasör ve liste kendi göndermelerinden önce gelir; dört bağ da kurulur.",
        );
      await lab
        .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
        .click();
    },
    async assertModel(lab) {
      await expect(lab).toHaveAttribute("data-current-order", "ABCDE");
      await expect(lab.locator('svg [data-svg-node="D"]')).toHaveAttribute(
        "data-selected",
        "true",
      );
      await expect(lab.locator('svg [data-relation="B-C"]')).toHaveAttribute(
        "data-source",
        "1",
      );
      await expect(lab.locator('svg [data-relation="B-C"]')).toHaveAttribute(
        "data-target",
        "2",
      );
      await expect(lab.locator('svg [data-relation="B-C"]')).toHaveAttribute(
        "data-valid",
        "true",
      );
      await expect(lab.locator(".turkish021-feedback")).toContainText(
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
  draft: state.draft,
  examDraft: state.examDraft,
  examSessions: state.examSessions,
});
async function open(page, navigate, unit) {
  await navigate("Konu Anlatımı");
  await page.getByRole("button", { name: unit.exam, exact: true }).click();
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill(unit.title);
  await page.locator(`.ready-topic[data-lesson-id="${unit.id}"]`).click();
  const lab = page.locator(`[data-forge021="${unit.id}"]`);
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
export async function runForge021SmokeCase(page, navigate, unit) {
  await expect.poll(() => page.evaluate(() => navigator.onLine)).toBe(false);
  const beforeLearning = learning(await readState(page));
  const lab = await open(page, navigate, unit);
  const model = lab.locator(unit.svg || "svg").first();
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
  const extras = [];
  for (const extra of unit.extraPersisted || []) {
    await expect
      .poll(async () => (await readState(page)).explorations[extra.storedKey])
      .toMatchObject(extra.persisted);
    extras.push({
      storedKey: extra.storedKey,
      saved: (await readState(page)).explorations[extra.storedKey],
    });
  }
  expect(learning(await readState(page))).toEqual(beforeLearning);
  await page.reload();
  await assertOutcome(page.locator(`[data-forge021="${unit.id}"]`), unit);
  const after = await readState(page);
  expect(after.explorations[unit.storedKey]).toEqual(saved);
  for (const extra of extras)
    expect(after.explorations[extra.storedKey]).toEqual(extra.saved);
  expect(learning(after)).toEqual(beforeLearning);
  return { id: unit.id, storedKey: unit.storedKey, saved, extras };
}
export async function assertForge021ProcessRestart(page, navigate, snapshots) {
  await expect.poll(() => page.evaluate(() => navigator.onLine)).toBe(false);
  const beforeLearning = learning(await readState(page));
  expect(snapshots).toHaveLength(7);
  for (const snapshot of snapshots) {
    const unit = forge021SmokeCases.find((entry) => entry.id === snapshot.id);
    expect((await readState(page)).explorations[snapshot.storedKey]).toEqual(
      snapshot.saved,
    );
    for (const extra of snapshot.extras || [])
      expect((await readState(page)).explorations[extra.storedKey]).toEqual(
        extra.saved,
      );
    const lab = await open(page, navigate, unit);
    await assertOutcome(lab, unit);
    for (const extra of snapshot.extras || [])
      expect((await readState(page)).explorations[extra.storedKey]).toEqual(
        extra.saved,
      );
    expect((await readState(page)).explorations[snapshot.storedKey]).toEqual(
      snapshot.saved,
    );
  }
  expect(learning(await readState(page))).toEqual(beforeLearning);
}
