import { expect } from "@playwright/test";
import { readForge014SmokeState as readState } from "./forge014-smoke-cases.mjs";

// Public desktop/Pages checks use literal, independently calculated examples.
// Neither the teaching data nor the production geometry model is imported.
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
const click = (lab, name) =>
  lab.getByRole("button", { name, exact: true }).click();
const field = (lab, name) =>
  lab
    .locator(".g031-evidence dt")
    .filter({
      hasText: new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`),
    })
    .locator("..");

export const forge031SmokeCases = [
  {
    id: "tyt-geo-temel-acilar-031",
    title: "Geometrinin dili: temel açılar ve paralellik",
    storedKey: "g031:angles",
    persisted: { theta: 120, parallel: true },
    async act(lab) {
      await range(lab, "Turuncu açı", 120);
      await lab
        .getByRole("checkbox", {
          name: "Paralel doğruları göster",
          exact: true,
        })
        .check();
    },
    async assertModel(lab) {
      await expect(lab.locator("dl")).toContainText("120° + 60° = 180°");
      await expect(field(lab, "Yöndeş açı")).toContainText("120°");
      await expect(lab.locator("svg")).toHaveAccessibleName(
        /turuncu açı 120 derece, komşu açı 60 derece.*Yöndeş açı aynı ölçüde/,
      );
    },
  },
  {
    id: "tyt-geo-ucgende-acilar-031",
    title: "Üçgende açılar: iç açıdan yardımcı çizgiye",
    storedKey: "g031:triangle-angles",
    persisted: { x: 0, y: 6, step: 2 },
    async act(lab) {
      await range(lab, "C köşesinin yatay konumu", 0);
      await range(lab, "C köşesinin yüksekliği", 6);
      for (let i = 0; i < 2; i++) await click(lab, "Sonraki adım");
    },
    async assertModel(lab) {
      await expect(field(lab, "A açısı")).toContainText("90°");
      await expect(field(lab, "B açısı")).toContainText("31°");
      await expect(field(lab, "C açısı")).toContainText("59°");
      await expect(field(lab, "İç açılar toplamı")).toContainText("180°");
      await expect(lab.locator("svg .g031-sector")).toHaveCount(6);
      await expect(lab.locator("svg")).toHaveAccessibleName(
        /toplam 180 derece/,
      );
    },
  },
  {
    id: "tyt-geo-ucgen-esitsizligi-031",
    title: "Üçgen eşitsizliği ve açı–kenar ilişkileri",
    storedKey: "g031:inequality",
    persisted: { a: 3, b: 4, c: 5 },
    async act(lab) {
      await click(lab, "3–4–8: çizilmez");
      await expect(lab.locator("svg polygon")).toHaveCount(0);
      await expect(lab.locator("dl")).toContainText("Üçgen yok");
      await click(lab, "3–4–7: sınır");
      await expect(lab.locator("svg polygon")).toHaveCount(0);
      await expect(lab.locator("svg")).toHaveAccessibleName(
        /Noktalar doğrusal/,
      );
      await click(lab, "3–4–5: çizilir");
    },
    async assertModel(lab) {
      await expect(lab.locator("svg polygon")).toHaveCount(1);
      await expect(field(lab, "Alan")).toContainText("6 birim²");
      await expect(lab.locator("svg")).toHaveAccessibleName(
        /a 3, b 4, c 5 birim.*Üçgen çizilebilir/,
      );
    },
  },
  {
    id: "tyt-geo-dik-ucgen-031",
    title: "Dik üçgen: Pisagor, özel açılar ve Öklid bağıntıları",
    storedKey: "g031:right",
    persisted: { ab: 3, ac: 4, step: 3 },
    async act(lab) {
      await range(lab, "AB dik kenarı", 3);
      await range(lab, "AC dik kenarı", 4);
      for (let i = 0; i < 3; i++) await click(lab, "Sonraki adım");
    },
    async assertModel(lab) {
      await expect(field(lab, "BH = p")).toContainText("1,8 birim");
      await expect(field(lab, "HC = q")).toContainText("3,2 birim");
      await expect(field(lab, "AH² = p · q")).toContainText("5,76 birim²");
      await expect(field(lab, "AB² = p · BC")).toContainText("9 = 9");
      await expect(field(lab, "AC² = q · BC")).toContainText("16 = 16");
      await expect(lab.locator("svg")).toHaveAccessibleName(
        /AB 3, AC 4, BC 5 birim.*AH yüksekliği 2,4, BH 1,8, HC 3,2/,
      );
    },
  },
  {
    id: "tyt-geo-eslik-benzerlik-031",
    title: "Üçgenlerde eşlik ve benzerlik: eşleme, ölçek ve paralellik",
    storedKey: "g031:similarity",
    persisted: { percent: 50 },
    async act(lab) {
      await range(lab, "Küçük / büyük uzunluk oranı", 50);
    },
    async assertModel(lab) {
      await expect(field(lab, "DE / BC")).toContainText("5 / 10 = 0,5");
      await expect(field(lab, "Küçük / büyük alan")).toContainText(
        "10 / 40 = 0,25",
      );
      await expect(field(lab, "Alan oranı")).toContainText("0,5² = 0,25");
      await expect(lab.locator("svg")).toHaveAccessibleName(
        /kenar oranı 0,5, alan oranı 0,25/,
      );
    },
  },
  {
    id: "tyt-geo-ucgen-merkezleri-031",
    title: "Üçgende yardımcı elemanlar: açıortay, kenarortay ve merkezler",
    storedKey: "g031:centers",
    persisted: { x: 5, height: 3, mode: "circumcircle" },
    async act(lab) {
      await click(lab, "Diklik merkezi");
      await click(lab, "Geniş açılı örnek");
      await expect(field(lab, "H koordinatı")).toContainText("(5; 8,333)");
      await expect(lab.locator(".g031-insight")).toContainText(
        "geniş açılı üçgende dışarıdadır",
      );
      await click(lab, "Çevrel merkez");
    },
    async assertModel(lab) {
      await expect(field(lab, "O koordinatı")).toContainText("(5; -2,667)");
      await expect(field(lab, "OA = OB = OC")).toContainText("5,667 birim");
      await expect(lab.locator(".g031-circumcircle")).toHaveCount(1);
      await expect(lab.locator("svg")).toHaveAccessibleName(/Geniş açılı/);
      // A(5,3), B(0,0), C(10,0) has O=(5,-8/3), below BC. Read the
      // displayed circle and the actual base coordinates, not a clipped proxy.
      const coordinates = await lab.locator("svg").evaluate((svg) => {
        const circle = svg.querySelector(".g031-circumcircle");
        const triangle = svg.querySelector(".g031-triangle").points;
        return {
          centerY: Number(circle.getAttribute("cy")),
          baseY: triangle.getItem(1).y,
          otherBaseY: triangle.getItem(2).y,
          radius: Number(circle.getAttribute("r")),
        };
      });
      expect(coordinates.baseY).toBeCloseTo(coordinates.otherBaseY, 8);
      expect(coordinates.centerY).toBeGreaterThan(coordinates.baseY);
      expect(coordinates.radius).toBeGreaterThan(0);
    },
  },
];

const learning = (state) => ({
  sessions: state.sessions,
  reviews: state.reviews,
  theoryReviewCompletions: state.theoryReviewCompletions,
  topicProgress: state.topicProgress,
  unlocked: state.unlocked,
  notes: state.notes,
  settings: state.settings,
  draft: state.draft,
  examDraft: state.examDraft,
  examSessions: state.examSessions,
  focusTimer: state.focusTimer,
});

async function open(page, navigate, unit) {
  await navigate("Konu Anlatımı");
  await page.getByRole("button", { name: "TYT", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill(unit.title);
  await page.locator(`.ready-topic[data-lesson-id="${unit.id}"]`).click();
  const lab = page.locator(".g031-lab");
  await expect(lab).toBeVisible();
  await expect(lab.locator("svg")).toHaveCount(1);
  await expect(lab.locator("svg")).toBeVisible();
  return lab;
}
async function outcome(lab, unit) {
  await expect(lab.locator(".g031-evidence")).toBeVisible();
  expect(
    await lab
      .locator(".g031-evidence")
      .evaluate((element) => element.namespaceURI),
  ).toBe("http://www.w3.org/1999/xhtml");
  await unit.assertModel(lab);
}

export async function runForge031SmokeCase(page, navigate, unit) {
  // The caller has already established its real offline browser/native context.
  const before = learning(await readState(page));
  const lab = await open(page, navigate, unit);
  const svgBefore = await lab.locator("svg").innerHTML();
  await unit.act(lab);
  await outcome(lab, unit);
  expect(await lab.locator("svg").innerHTML()).not.toBe(svgBefore);
  await expect
    .poll(async () => (await readState(page)).explorations[unit.storedKey])
    .toMatchObject(unit.persisted);
  const saved = (await readState(page)).explorations[unit.storedKey];
  expect(learning(await readState(page))).toEqual(before);
  await page.reload();
  await outcome(await open(page, navigate, unit), unit);
  expect((await readState(page)).explorations[unit.storedKey]).toEqual(saved);
  expect(learning(await readState(page))).toEqual(before);
  return { id: unit.id, storedKey: unit.storedKey, saved };
}

export async function assertForge031ProcessRestart(page, navigate, snapshots) {
  expect(snapshots).toHaveLength(6);
  const before = learning(await readState(page));
  for (const snapshot of snapshots) {
    const unit = forge031SmokeCases.find((item) => item.id === snapshot.id);
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
