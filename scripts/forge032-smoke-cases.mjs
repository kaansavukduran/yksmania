import { expect } from "@playwright/test";
import { readForge014SmokeState as readState } from "./forge014-smoke-cases.mjs";

// Literal independent examples. Do not import the production mathematical model
// or answer catalogues: these flows inspect the actual displayed SVG and state.
async function range(lab, name, target, prefix = false) {
  const input = lab.getByRole("slider", {
    name: prefix ? new RegExp(`^${name}`) : name,
    exact: !prefix,
  });
  const min = Number(await input.getAttribute("min"));
  const max = Number(await input.getAttribute("max"));
  const step = Number((await input.getAttribute("step")) || 1);
  const current = Number(await input.inputValue());
  const start = [
    { n: current, key: "" },
    { n: min, key: "Home" },
    { n: max, key: "End" },
  ].sort((a, b) => Math.abs(a.n - target) - Math.abs(b.n - target))[0];
  if (start.key) await input.press(start.key);
  for (let i = 0; i < Math.round(Math.abs(target - start.n) / step); i++)
    await input.press(target > start.n ? "ArrowRight" : "ArrowLeft");
  await expect(input).toHaveValue(String(target));
}
const click = (lab, name) =>
  lab.getByRole("button", { name, exact: true }).click();
const learning = (s) => ({
  sessions: s.sessions,
  reviews: s.reviews,
  theoryReviewCompletions: s.theoryReviewCompletions,
  topicProgress: s.topicProgress,
  unlocked: s.unlocked,
  notes: s.notes,
  settings: s.settings,
  draft: s.draft,
  examDraft: s.examDraft,
  examSessions: s.examSessions,
  focusTimer: s.focusTimer,
});
const standardLab = ".g032-lab";
export const forge032SmokeCases = [
  {
    id: "tyt-geo-cokgenler-032",
    title: "Çokgenler: açı, köşegen ve düzgün şekiller",
    selector: standardLab,
    storedKey: "g032:polygon",
    persisted: { n: 6, mode: "diagonals" },
    async act(lab) {
      await range(lab, "Kenar sayısı", 6);
      await expect(lab.locator("polygon")).toHaveCount(5);
      await expect(lab.locator("dl")).toContainText("4 × 180° = 720°");
      await click(lab, "Bütün köşegenler");
    },
    async assertModel(lab) {
      await expect(lab.locator("dl")).toContainText("6 × (6 − 3) / 2 = 9");
      await expect(lab.locator("dl")).toContainText("360° / 6 = 60°");
      await expect(lab.locator(".g032-helper")).toHaveCount(9);
      const points = await lab.locator("polygon").getAttribute("points");
      expect(points.trim().split(/\s+/)).toHaveLength(6);
      await expect(lab.locator("svg")).toHaveAccessibleName(
        /6 kenarlı.*4 üçgene.*9 köşegeni/,
      );
    },
  },
  {
    id: "tyt-geo-dortgen-hiyerarsi-032",
    title: "Dörtgenler: sınıflar, köşegenler ve yamuk",
    selector: standardLab,
    storedKey: "g032:hierarchy",
    persisted: { kind: "trapezoid" },
    async act(lab) {
      await click(lab, "Kare");
      await expect(lab.locator(".g032-belongs")).toHaveCount(7);
      await click(lab, "Yamuk");
    },
    async assertModel(lab) {
      await expect(lab.locator(".g032-belongs")).toHaveCount(2);
      const family = lab.getByRole("list", {
        name: "Seçilen şeklin aileleri",
        exact: true,
      });
      await expect(
        family.locator("li").filter({ hasText: "Paralelkenar" }),
      ).toContainText("Bu aileye ait değil");
      await expect(lab.locator("svg")).toHaveAccessibleName(/^Yamuk\./);
      const points = await lab.locator("polygon").getAttribute("points");
      expect(points.trim().split(/\s+/)).toHaveLength(4);
    },
  },
  {
    id: "tyt-geo-yamuk-deltoid-032",
    title: "Yamuk ve deltoid: taban, yükseklik ve simetri",
    selector: standardLab,
    storedKey: "g032:trapezoid-kite",
    persisted: { mode: "kite", shift: 8, p: 8, u: 3, l: 6 },
    async act(lab) {
      const initial = await lab.locator("polygon").getAttribute("points");
      await range(lab, "Üst tabanın kayması", 8);
      await expect(lab.locator("dl")).toContainText("40 birim²");
      expect(await lab.locator("polygon").getAttribute("points")).not.toBe(
        initial,
      );
      await click(lab, "Deltoid");
    },
    async assertModel(lab) {
      await expect(lab.locator("dl")).toContainText("8 × 9 / 2 = 36 birim²");
      await expect(lab.locator("dl")).toContainText("3 ve 6 birim");
      await expect(lab).toContainText("Düşey parçalar eşit değil");
      const dot = await lab.locator("svg").evaluate((svg) => {
        const a = svg.querySelector(".g032-accent"),
          b = svg.querySelector(".g032-secondary");
        return (
          (Number(a.getAttribute("x2")) - Number(a.getAttribute("x1"))) *
            (Number(b.getAttribute("x2")) - Number(b.getAttribute("x1"))) +
          (Number(a.getAttribute("y2")) - Number(a.getAttribute("y1"))) *
            (Number(b.getAttribute("y2")) - Number(b.getAttribute("y1")))
        );
      });
      expect(dot).toBeCloseTo(0, 6);
    },
  },
  {
    id: "tyt-geo-paralelkenar-ozel-dortgenler-032",
    title: "Paralelkenar ailesi: yükseklik, köşegen ve alan",
    selector: standardLab,
    storedKey: "g032:parallelogram",
    persisted: { a: 8, h: 8, shear: 0 },
    async act(lab) {
      const initial = await lab.locator("polygon").getAttribute("points");
      await range(lab, "Yatay kayma", 8);
      await expect(lab.locator("dl")).toContainText("60 birim²");
      expect(await lab.locator("polygon").getAttribute("points")).not.toBe(
        initial,
      );
      await click(lab, "Eşkenar dörtgen örneği");
      await expect(lab.locator("dl")).toContainText("80 birim²");
      await click(lab, "Kare örneği");
    },
    async assertModel(lab) {
      await expect(lab.locator("dl")).toContainText("8 × 8 = 64 birim²");
      await expect(lab.locator("dl")).toContainText("Kare");
      await expect(lab.locator("svg")).toHaveAccessibleName(
        /taban 8, dik yükseklik 8, alan 64/,
      );
      const edges = await lab.locator("polygon").evaluate((p) => {
        const v = [...p.points];
        return v.map((a, i) => {
          const b = v[(i + 1) % v.length];
          return Math.hypot(a.x - b.x, a.y - b.y);
        });
      });
      for (const e of edges) expect(e).toBeCloseTo(edges[0], 6);
    },
  },
  {
    id: "tyt-geo-dik-prizmalar-032",
    title: "Dik prizmalar: açınım, yüzey ve hacim",
    selector: standardLab,
    storedKey: "g032:prism",
    persisted: { a: 3, b: 4, h: 12, view: "net" },
    async act(lab) {
      await range(lab, "Prizma eni", 3);
      await range(lab, "Prizma derinliği", 4);
      await range(lab, "Prizma yüksekliği", 12);
      await click(lab, "Açınımı göster");
    },
    async assertModel(lab) {
      await expect(lab.locator("dl")).toContainText("192 birim²");
      await expect(lab.locator("dl")).toContainText("144 birim³");
      await expect(lab.locator("dl")).toContainText("13 birim");
      await expect(lab.locator("svg rect")).toHaveCount(6);
      const ratio = await lab.locator("svg").evaluate((svg) => {
        const areas = [...svg.querySelectorAll("rect")].map(
          (r) =>
            Number(r.getAttribute("width")) * Number(r.getAttribute("height")),
        );
        return areas.reduce((a, b) => a + b, 0) / areas[4];
      });
      expect(ratio).toBeCloseTo(16, 6); // Surface192 / one taban12; actual six SVG faces.
      await expect(lab.locator("svg")).toHaveAccessibleName(
        /altı dikdörtgen yüzünden oluşan açınımı/,
      );
    },
  },
  {
    id: "tyt-geo-piramitler-032",
    title: "Piramitler: yükseklik, alan ve benzer kesit",
    selector: standardLab,
    storedKey: "g032:pyramid",
    persisted: { a: 8, h: 3, k: 0.5, view: "net" },
    async act(lab) {
      await range(lab, "Kare taban kenarı", 8);
      await range(lab, "Piramidin dik yüksekliği", 3);
      await range(lab, "Tepeden benzerlik oranı", 0.5);
      await expect(lab.locator("dl")).toContainText("16 birim²");
      const ratio = await lab.locator("svg").evaluate((svg) => {
        const area = (p) => {
          const v = [...p.points];
          return (
            Math.abs(
              v.reduce((sum, a, i) => {
                const b = v[(i + 1) % v.length];
                return sum + a.x * b.y - b.x * a.y;
              }, 0),
            ) / 2
          );
        };
        return (
          area(svg.querySelector(".g032-section")) /
          area(svg.querySelector(".g032-fill"))
        );
      });
      expect(ratio).toBeCloseTo(0.25, 6);
      await click(lab, "Yüzey açınımı");
    },
    async assertModel(lab) {
      await expect(lab.locator("dl")).toContainText("144 birim²");
      await expect(lab.locator("dl")).toContainText("64 birim³");
      await expect(lab.locator("dl")).toContainText("16 birim²");
      await expect(lab.locator("dl")).toContainText("8 birim³");
      await expect(lab.locator("svg polygon")).toHaveCount(5);
      const ratio = await lab.locator("svg").evaluate((svg) => {
        const area = (p) => {
          const v = [...p.points];
          return (
            Math.abs(
              v.reduce((sum, a, i) => {
                const b = v[(i + 1) % v.length];
                return sum + a.x * b.y - b.x * a.y;
              }, 0),
            ) / 2
          );
        };
        const v = [...svg.querySelectorAll("polygon")].map(area);
        return v.reduce((a, b) => a + b, 0) / v[0];
      });
      expect(ratio).toBeCloseTo(144 / 64, 6);
      await expect(lab.locator("svg")).toHaveAccessibleName(
        /Kare taban ve dört eş ikizkenar üçgen/,
      );
    },
  },
  {
    id: "tyt-geo-acilar-kaynak-pekitirme-032",
    title: "Geometrinin dili: kaynakla pekiştir",
    selector: ".gl032-lab",
    storedKey: "g032:language:tyt-geo-acilar-kaynak-pekitirme-032",
    persisted: {
      mode: "parallels",
      object: "ray",
      pointB: 470,
      angle: 130,
      pair: "sameSide",
    },
    async act(lab) {
      await click(lab, "Işın");
      await range(lab, "B noktasının konumu", 470, true);
      await expect(lab.locator("svg > line")).toHaveAttribute(
        "marker-end",
        /arrow/,
      );
      expect(
        await lab.locator("svg > line").getAttribute("marker-start"),
      ).toBeNull();
      await expect(lab.locator("svg circle").nth(1)).toHaveAttribute(
        "cx",
        "470",
      );
      await click(lab, "Paralel açı çiftleri");
      await range(lab, "1 numaralı açı", 130, true);
      await click(lab, "Aynı yan iç 2–5");
    },
    async assertModel(lab) {
      await expect(lab.locator(".gl032-result")).toContainText(
        "50° + 130° = 180°",
      );
      await expect(lab.locator("svg")).toHaveAccessibleName(
        /2 ve 5 aynı yan iç: 50° \+ 130° = 180°/,
      );
      await expect(lab.locator(".gl032-selected text")).toHaveText(["2", "5"]);
      const line = lab.locator(".gl032-transversal");
      expect(Number(await line.getAttribute("x2"))).toBeGreaterThan(
        Number(await line.getAttribute("x1")),
      );
      const sourceGroups = lab.locator(".gl032-sources");
      await expect(sourceGroups).toHaveCount(2);
      await expect(sourceGroups.nth(0).locator("h3")).toHaveText(
        "Güncel kaynağın MEB/OGM atıfları",
      );
      await expect(sourceGroups.nth(1).locator("h3")).toHaveText(
        "Önceki kaynağın video önerileri",
      );
      const links = lab.locator(".gl032-sources a");
      const sources = [
        [
          "MEB/OGM: Matematik 9 Kazanım Çalışmaları",
          "https://ogmmateryal.eba.gov.tr/panel/upload/etkilesimli/kitap/kazanim_kavrama/pdf/9/matematik.pdf",
        ],
        [
          "MEB/OGM: Defterim Matematik 9 · sayfa245",
          "https://ogmmateryal.eba.gov.tr/panel/upload/etkilesimli/kitap/defterim/9/matematik/files/basic-html/page245.html",
        ],
        [
          "Mert Hoca: Doğruda Açılar 1 · konu anlatımı",
          "https://www.youtube.com/watch?v=gmdLObUrhys",
        ],
        [
          "Mert Hoca: Doğruda Açılar · soru çözümü",
          "https://www.youtube.com/watch?v=yqtFTJChYqw",
        ],
      ];
      await expect(links).toHaveCount(4);
      await expect(links).toHaveText(sources.map(([title]) => title));
      for (let i = 0; i < sources.length; i++) {
        await expect(links.nth(i)).toHaveAttribute("href", sources[i][1]);
        await expect(links.nth(i)).toHaveAttribute("target", "_blank");
        await expect(links.nth(i)).toHaveAttribute(
          "rel",
          "noopener noreferrer",
        );
      }
      await expect(sourceGroups.nth(0)).toContainText(
        "bağlantılar için internet gerekir",
      );
      await expect(sourceGroups.nth(1)).toContainText("İnternet gerektirir");
    },
  },
  {
    id: "tyt-mat-asal-kaynak-032",
    title: "Asal",
    subject: "Matematik",
    selector: ".p032-lab",
    model: ".p032-grid",
    storedKey: "p032:sieve",
    persisted: { stage: 4, selected: 49, pair: 1 },
    async act(lab) {
      const steps = [
        "2’nin katlarını ele",
        "3’ün katlarını ele",
        "5’in katlarını ele",
        "7’nin katlarını ele",
      ];
      for (let i = 0; i < steps.length; i++) {
        await click(lab, steps[i]);
        await expect(lab.locator(".p032-progress")).toContainText(
          `${i + 1}/4 adım`,
        );
        await expect(lab.locator(".p032-progress")).toContainText(
          `${[24, 31, 33, 34][i]} bileşik sayı elendi`,
        );
        await expect(
          lab.locator(`.p032-number[data-number="${[2, 3, 5, 7][i]}"]`),
        ).toHaveAttribute("data-eliminated-by", "");
      }
      await lab.locator('.p032-number[data-number="12"]').click();
      await click(lab, "3 × 4");
      await expect(lab.locator("svg rect")).toHaveCount(12);
      await expect(lab.locator("svg")).toHaveAccessibleName(
        "3 satır ve 4 sütunda toplam 12 eş kare; 3 çarpı 4.",
      );
      await lab.locator('.p032-number[data-number="47"]').click();
      await expect(lab.locator(".p032-verdict")).toContainText(
        "47 asaldır: tam olarak iki pozitif böleni vardır.",
      );
      await expect(lab.locator(".p032-facts dd")).toHaveText([
        "1, 47",
        "2",
        "1 × 47 = 47",
      ]);
      await expect(lab.locator(".p032-detail")).toContainText("√47 ≈6,86");
      // 7²>47; trial division by2,3,5 independently confirms47.
      expect(47 % 2).toBe(1);
      expect(47 % 3).toBe(2);
      expect(47 % 5).toBe(2);
      await lab.locator('.p032-number[data-number="49"]').click();
      await click(lab, "7 × 7");
    },
    async assertModel(lab) {
      await expect(lab.locator(".p032-number")).toHaveCount(50);
      await expect(lab.locator(".p032-progress")).toContainText(
        "4/4 adım · 34 bileşik sayı elendi",
      );
      const primes = await lab
        .locator('.p032-number[data-prime-proven="true"]')
        .evaluateAll((nodes) =>
          nodes.map((n) => Number(n.getAttribute("data-number"))),
        );
      expect(primes).toEqual([
        2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47,
      ]);
      const one = lab.locator('.p032-number[data-number="1"]');
      await expect(one).toHaveAttribute("aria-label", "1: ne asal ne bileşik");
      await expect(one).toHaveAttribute("data-prime-proven", "false");
      const square = lab.locator('.p032-number[data-number="49"]');
      await expect(square).toHaveAttribute("data-eliminated-by", "7");
      await expect(square).toHaveAttribute("data-prime-proven", "false");
      await expect(square).toHaveAttribute("aria-pressed", "true");
      await expect(lab.locator(".p032-verdict")).toContainText("49 bileşiktir");
      await expect(lab.locator(".p032-facts dd")).toHaveText([
        "1, 7, 49",
        "3",
        "7 × 7 = 49",
      ]);
      await expect(lab.locator(".p032-factor-equation")).toHaveText(
        "7 × 7 = 49",
      );
      await expect(
        lab.getByRole("button", { name: "7 × 7", exact: true }),
      ).toHaveAttribute("aria-pressed", "true");
    },
  },
];
async function open(page, navigate, unit) {
  await navigate("Konu Anlatımı");
  await page.getByRole("button", { name: "TYT", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill(unit.title);
  const subject = page.locator(".subject-panel").filter({
    has: page.getByRole("heading", {
      name: unit.subject || "Geometri",
      exact: true,
    }),
  });
  const entry = subject.locator(`.ready-topic[data-lesson-id="${unit.id}"]`);
  if (!(await entry.isVisible()))
    await subject.locator(".subject-header").click();
  await entry.click();
  const lab = page.locator(unit.selector);
  await expect(lab).toBeVisible();
  await expect(lab.locator(unit.model || "svg")).toHaveCount(1);
  await expect(lab.locator(unit.model || "svg")).toBeVisible();
  await expect(page.locator('input[type="file"]')).toHaveCount(0);
  return lab;
}
export async function runForge032SmokeCase(page, navigate, unit) {
  // Caller establishes the real offline Pages/native context before this first use.
  const before = learning(await readState(page));
  const lab = await open(page, navigate, unit);
  const modelBefore = await lab.locator(unit.model || "svg").innerHTML();
  await unit.act(lab);
  await unit.assertModel(lab);
  expect(await lab.locator(unit.model || "svg").innerHTML()).not.toBe(
    modelBefore,
  );
  await expect
    .poll(async () => (await readState(page)).explorations[unit.storedKey])
    .toMatchObject(unit.persisted);
  const saved = (await readState(page)).explorations[unit.storedKey];
  expect(learning(await readState(page))).toEqual(before);
  // A real note is an explicit learner edit; only this note may now change.
  const note = `032 ${unit.id}: Şeklin koşulunu ve birimleri ayırırım. ÇĞİÖŞÜ.`;
  await page.getByRole("textbox", { name: "Notun", exact: true }).fill(note);
  await expect
    .poll(async () => (await readState(page)).notes[`lesson:${unit.id}`])
    .toBe(note);
  const afterNote = {
    ...before,
    notes: { ...before.notes, [`lesson:${unit.id}`]: note },
  };
  expect(learning(await readState(page))).toEqual(afterNote);
  await page.reload();
  await unit.assertModel(await open(page, navigate, unit));
  await expect(
    page.getByRole("textbox", { name: "Notun", exact: true }),
  ).toHaveValue(note);
  expect((await readState(page)).explorations[unit.storedKey]).toEqual(saved);
  expect(learning(await readState(page))).toEqual(afterNote);
  return { id: unit.id, storedKey: unit.storedKey, saved, note };
}
export async function assertForge032ProcessRestart(page, navigate, snapshots) {
  expect(snapshots).toHaveLength(8);
  const before = learning(await readState(page));
  for (const snapshot of snapshots) {
    const unit = forge032SmokeCases.find((x) => x.id === snapshot.id);
    expect(unit).toBeTruthy();
    expect(snapshot.storedKey).toBe(unit.storedKey);
    expect((await readState(page)).explorations[snapshot.storedKey]).toEqual(
      snapshot.saved,
    );
    expect((await readState(page)).notes[`lesson:${unit.id}`]).toBe(
      snapshot.note,
    );
    await unit.assertModel(await open(page, navigate, unit));
    await expect(
      page.getByRole("textbox", { name: "Notun", exact: true }),
    ).toHaveValue(snapshot.note);
    expect((await readState(page)).explorations[snapshot.storedKey]).toEqual(
      snapshot.saved,
    );
  }
  expect(learning(await readState(page))).toEqual(before);
}
