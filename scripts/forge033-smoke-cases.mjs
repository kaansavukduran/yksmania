import { expect } from "@playwright/test";
import { readForge014SmokeState as readState } from "./forge014-smoke-cases.mjs";

// Literal source examples only; no production model or answer catalogue import.
async function range(lab, name, target) {
  const input = lab.getByRole("slider", { name, exact: true });
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

export const forge033SmokeCases = [
  {
    id: "tyt-mat-faktoriyel-kaynak-033",
    title: "Faktöriyel: çarpımdan koşula ve asal bütçesine",
    storedKey: "f033:factorial",
    persisted: {
      mode: 3,
      productN: 4,
      step: 4,
      ratioN: 6,
      ratioM: 8,
      budgetN: 10,
      base: 12,
      zeroN: 25,
      removed: 22,
      orderN: 4,
      condition: 2,
      sumN: 0,
      sumSign: 1,
    },
    async act(lab) {
      await click(lab, "Çarpımı kur");
      await range(lab, "n değeri", 4);
      // A fresh profile starts at step0, where resetting is correctly disabled.
      const reset = lab.getByRole("button", {
        name: "Çarpımı başa al",
        exact: true,
      });
      if (await reset.isEnabled()) await reset.click();
      for (let step = 1; step <= 4; step++)
        await click(lab, `${step}. çarpanı ekle`);
      await expect(
        lab.locator('.f033-panel[data-mode="product"] .f033-result'),
      ).toHaveText("1 × 2 × 3 × 4 = 24");
      await expect(lab.locator(".f033-chip.active")).toHaveCount(4);

      await click(lab, "Oranı sadeleştir");
      await range(lab, "Paydaki n", 6);
      await range(lab, "Paydadaki m", 8);
      await expect(lab.locator(".f033-result")).toContainText(
        "6! / 8! = 1 / 56 = 1/56",
      );
      await expect(lab.locator(".f033-common")).toHaveText(["6!", "6!"]);

      await click(lab, "Asal bütçesi");
      await range(lab, "n değeri", 10);
      await range(lab, "Bölen tabanı b", 12);
      await expect(lab.locator(".f033-budget-row h3")).toHaveText([
        "Asal 2: 8 kopya",
        "Asal 3: 4 kopya",
      ]);
      await expect(lab.locator(".f033-budget-row svg")).toHaveCount(2);
      await expect(lab.locator(".f033-result")).toContainText(
        "En büyük k = 4. 10! / 12^4 = 175 tam sayı.",
      );

      await click(lab, "2–5 eşleşmeleri");
      await range(lab, "n değeri", 10);
      await range(lab, "Paydada tüketilen 2 sayısı a", 7);
      await expect(lab.locator(".f033-result")).toContainText(
        "min(1, 2) = 1 son sıfır",
      );
      await range(lab, "Paydada tüketilen 2 sayısı a", 8);
      await expect(lab.locator(".f033-result")).toContainText(
        "min(0, 2) = 0 son sıfır",
      );
      await expect(lab.locator(".f033-number")).toContainText("14175");

      await click(lab, "Sıralama koşulu");
      await range(lab, "Farklı nesne sayısı", 4);
      await click(lab, "A ilk yerde yasak");
      await expect(lab.locator(".f033-seats li")).toHaveCount(4);
      await expect(lab.locator(".f033-result")).toHaveText(
        "3 × 3 × 2 × 1 = 18 düzen.",
      );
      await expect(lab).toContainText(
        "bütün 24 düzenden A’nın ilk olduğu 6 düzeni çıkarınca 18",
      );

      await click(lab, "Toplam ve fark");
      await range(lab, "Ortak faktöriyel içi n", 4);
      await click(lab, "Çıkar");
      await expect(lab.locator(".f033-result")).toContainText("4! × 4 = 96");
      await range(lab, "Ortak faktöriyel içi n", 0);
      await expect(lab.locator(".f033-result")).toContainText("0! × 0 = 0");
      await expect(lab).toContainText("1!−0!=1−1=0");

      // End at a source boundary; every other mode's actual choices stay saved.
      await click(lab, "2–5 eşleşmeleri");
      await range(lab, "n değeri", 25);
      await range(lab, "Paydada tüketilen 2 sayısı a", 0);
      await expect(lab.locator(".f033-ten")).toHaveCount(6);
      await expect(lab.locator(".f033-result")).toContainText(
        "min(22, 6) = 6 son sıfır",
      );
      await range(lab, "Paydada tüketilen 2 sayısı a", 22);
    },
    async assertModel(lab) {
      await expect(lab.locator('.f033-panel[data-mode="zeros"]')).toBeVisible();
      await expect(
        lab.getByRole("button", { name: "2–5 eşleşmeleri", exact: true }),
      ).toHaveAttribute("aria-pressed", "true");
      await expect(
        lab.getByRole("slider", { name: "n değeri", exact: true }),
      ).toHaveValue("25");
      await expect(
        lab.getByRole("slider", {
          name: "Paydada tüketilen 2 sayısı a",
          exact: true,
        }),
      ).toHaveValue("22");
      await expect(lab.locator(".f033-result")).toContainText(
        "min(0, 6) = 0 son sıfır",
      );
      await expect(lab.locator(".f033-ten")).toHaveCount(0);
      await expect(lab.locator(".f033-number")).toContainText(
        "3698160658676859375",
      );
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
    has: page.getByRole("heading", { name: "Matematik", exact: true }),
  });
  const entry = subject.locator(`.ready-topic[data-lesson-id="${unit.id}"]`);
  if (!(await entry.isVisible()))
    await subject.locator(".subject-header").click();
  await entry.click();
  const lab = page.locator(".f033-lab");
  await expect(lab).toBeVisible();
  await expect(
    page.locator(".guide-section").first().locator(".f033-lab"),
  ).toBeVisible();
  await expect(lab.locator(".f033-panel")).toHaveCount(1);
  await expect(page.locator('input[type="file"]')).toHaveCount(0);
  return lab;
}
export async function runForge033SmokeCase(page, navigate, unit) {
  // Caller established actual offline Pages/native context before first use.
  const before = learning(await readState(page));
  const lab = await open(page, navigate, unit);
  const initial = await lab.innerHTML();
  await unit.act(lab);
  await unit.assertModel(lab);
  expect(await lab.innerHTML()).not.toBe(initial);
  await expect
    .poll(async () => (await readState(page)).explorations[unit.storedKey])
    .toMatchObject(unit.persisted);
  const saved = (await readState(page)).explorations[unit.storedKey];
  expect(learning(await readState(page))).toEqual(before);
  const note =
    "033 Faktöriyel: bütün ortak çarpanı ayırır, 2–5 bütçelerini birlikte denetlerim. ÇĞİÖŞÜ.";
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
export async function assertForge033ProcessRestart(page, navigate, snapshots) {
  expect(snapshots).toHaveLength(1);
  const before = learning(await readState(page));
  for (const snapshot of snapshots) {
    const unit = forge033SmokeCases.find((x) => x.id === snapshot.id);
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
