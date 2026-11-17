import { expect } from "@playwright/test";
import { readForge014SmokeState as readState } from "./forge014-smoke-cases.mjs";

// Independently calculated literals; never import production models or answer keys.
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

export const forge034035SmokeCases = [
  {
    id: "tyt-mat-ebob-ekok-kaynak-034",
    title: "EBOB ve EKOK: ortak birimden ortak ana",
    selector: ".f034-lab",
    storedKey: "f034:ebob-ekok",
    persisted: {
      mode: 6,
      a: 72,
      b: 120,
      euclidA: 252,
      euclidB: 198,
      step: 4,
      width: 36,
      height: 24,
      side: 12,
      p: 12,
      q: 18,
      offset: 6,
      horizon: 72,
      start: 0,
      end: 0,
      remainderMode: 1,
      divisorA: 8,
      divisorB: 12,
      r: 8,
      upper: 150,
      n: 85,
      m: 133,
      r1: 1,
      r2: 1,
      pairMode: 1,
      d: 4,
      lcm: 48,
      thirdA: 18,
      thirdB: 12,
      thirdD: 6,
      thirdM: 360,
      cubeA: 12,
      cubeB: 18,
    },
    note: "034: ortak boy böler, ortak an kat olur; kaymış başlangıcı ve kalan sınırını ayrıca denetlerim. ÇĞİÖŞÜ.",
    async act(lab) {
      await click(lab, "Asal tablosu");
      await range(lab, "İlk sayı a", 72);
      await range(lab, "İkinci sayı b", 120);
      await expect(lab).toContainText("EBOB 24; EKOK 360.");
      await expect(lab.locator(".f034-bar-a").first()).toHaveAttribute(
        "height",
        "17",
      );
      await expect(lab.locator(".f034-bar-a")).toHaveCount(3);
      await expect(lab.locator(".f034-bar-a").nth(0)).toHaveAttribute(
        "width",
        "84",
      );
      await expect(lab.locator(".f034-bar-a").nth(1)).toHaveAttribute(
        "width",
        "56",
      );
      await expect(lab.locator(".f034-bar-b").nth(2)).toHaveAttribute(
        "width",
        "28",
      );
      await click(lab, "Öklid adımları");
      await range(lab, "İlk sayı", 252);
      await range(lab, "İkinci sayı", 198);
      const reset = lab.getByRole("button", {
        name: "Adımları başa al",
        exact: true,
      });
      if (await reset.isEnabled()) await reset.click();
      for (let step = 0; step < 4; step++) await click(lab, "Sonraki bölme");
      await expect(lab.locator(".f034-equations li")).toHaveText([
        "252=198×1+54. Yeni çift 198 ve 54.",
        "198=54×3+36. Yeni çift 54 ve 36.",
        "54=36×1+18. Yeni çift 36 ve 18.",
        "36=18×2+0. Kalan 0: işlem bitti; bölen son sıfır olmayan değerdir.",
      ]);
      await expect(lab).toContainText("EBOB 18; EKOK 2772.");
      await click(lab, "Parça ve işaret");
      await range(lab, "İlk kenar / ip (cm)", 36);
      await range(lab, "İkinci kenar / ip (cm)", 24);
      await range(lab, "Seçilen kare / parça boyu (cm)", 10);
      await expect(lab.locator(".f034-panel p[role=status]")).toContainText(
        "Geçersiz yerleşim",
      );
      await expect(lab.locator(".f034-panel strong")).toHaveCount(0);
      await click(lab, "En büyük ortak boyu seç: 12cm");
      await expect(lab).toContainText("3 sütun × 2 satır = 6 kare.");
      await expect(lab).toContainText("5 parça; üst üste kesmeden 3 kesim.");
      await expect(lab).toContainText("120cm → 10 işaret");
      await expect(lab.locator(".f034-grid path")).toHaveCount(7);
      await click(lab, "Zaman çizelgesi");
      await range(lab, "A periyodu (dk)", 12);
      await range(lab, "B periyodu (dk)", 18);
      await range(lab, "B ilk çalışma anı (dk)", 0);
      await range(lab, "Görülen son an (dk)", 72);
      await lab
        .getByRole("checkbox", {
          name: "0 başlangıcı sayıma dahil",
          exact: true,
        })
        .check();
      await lab
        .getByRole("checkbox", { name: "Son an sayıma dahil", exact: true })
        .check();
      await expect(lab).toContainText("[0,72] içinde 3 ortak olay.");
      await expect(lab.locator(".f034-common")).toHaveCount(3);
      await lab
        .getByRole("checkbox", {
          name: "0 başlangıcı sayıma dahil",
          exact: true,
        })
        .uncheck();
      await lab
        .getByRole("checkbox", { name: "Son an sayıma dahil", exact: true })
        .uncheck();
      await expect(lab).toContainText("(0,72) içinde 1 ortak olay.");
      // SVG intentionally keeps visible endpoint events; included count excludes them.
      await expect(lab.locator(".f034-common")).toHaveCount(3);
      await range(lab, "B ilk çalışma anı (dk)", 5);
      await expect(lab).toContainText(
        "başlangıç kayması iki döngünün ortak bölenine uymuyor",
      );
      await expect(lab.locator(".f034-common")).toHaveCount(0);
      await range(lab, "B ilk çalışma anı (dk)", 6);
      await expect(lab).toContainText("Dahil edilen anlar: 24, 60.");
      await expect(lab).toContainText("İlk pozitif ortak an: 24. dakika.");
      await expect(lab.locator(".f034-common")).toHaveCount(2);
      await click(lab, "Kalan koşulu");
      await click(lab, "Sayıyı bul: aynı kalan");
      await range(lab, "İlk bölen", 8);
      await range(lab, "İkinci bölen", 12);
      await range(lab, "Ortak kalan r", 5);
      await range(lab, "Hariç üst sınır", 150);
      await expect(
        lab.locator(".f034-panel p").filter({ hasText: "Adaylar:" }),
      ).toHaveText("Adaylar: 5, 29, 53, 77, 101, 125, 149");
      await range(lab, "Ortak kalan r", 8);
      await expect(lab.locator(".f034-panel p[role=status]")).toHaveText(
        "Kalan, her iki bölenden de küçük olmalı.",
      );
      await click(lab, "Bilinmeyen böleni bul");
      await range(lab, "İlk sayı N", 85);
      await range(lab, "İkinci sayı M", 133);
      await range(lab, "N için kalan", 1);
      await range(lab, "M için kalan", 1);
      await expect(lab).toContainText("En büyük bölen 12.");
      await expect(lab).toContainText("Uygun bölenler 2, 3, 4, 6, 12.");
      await click(lab, "EBOB ve EKOK’tan sayılar");
      await click(lab, "İki sayıyı kur");
      await range(lab, "Verilen EBOB d", 4);
      await range(lab, "Verilen EKOK m", 48);
      await expect(lab).toContainText("En küçük toplam 28; en büyük 52.");
      await expect(lab).toContainText("x=2,y=6: Elendi");
      await range(lab, "Verilen EKOK m", 50);
      await expect(lab.locator(".f034-panel p[role=status]")).toContainText(
        "uygun iki pozitif tam sayı yoktur",
      );
      await range(lab, "Verilen EKOK m", 48);
      await click(lab, "Üçüncü sayıyı bul");
      await range(lab, "İlk sayı a", 18);
      await range(lab, "İkinci sayı b", 12);
      await range(lab, "Hedef üçlü EBOB", 8);
      await range(lab, "Hedef üçlü EKOK", 360);
      await expect(lab.locator(".f034-panel p[role=status]")).toContainText(
        "İki koşulu birlikte sağlayan pozitif x yok",
      );
      await range(lab, "Hedef üçlü EBOB", 6);
      await expect(lab).toContainText("En küçük x=120.");
      await expect(lab).toContainText("Bütün uygun adaylar: 120, 360.");
      await click(lab, "Küp sayımı");
      await range(lab, "İlk küçük küp kenarı (cm)", 12);
      await range(lab, "İkinci küçük küp kenarı (cm)", 18);
    },
    async assertModel(lab) {
      await expect(lab.locator('.f034-panel[data-mode="cubes"]')).toBeVisible();
      await expect(lab).toContainText("En küçük ortak kenar 36cm.");
      await expect(lab).toContainText("3×3×3=27küp. İkinci boy: 2×2×2=8küp.");
      await expect(lab).toContainText("27×1728=46656cm³; 8×5832=46656cm³");
      await expect(lab.locator(".f034-grid").nth(0).locator("g")).toHaveCount(
        4,
      );
      await expect(lab.locator(".f034-grid").nth(1).locator("g")).toHaveCount(
        3,
      );
      await expect(lab.getByRole("img")).toHaveAccessibleName(/adetler27ve8/);
    },
  },
  {
    id: "tyt-mat-rasyonel-kaynak-035",
    title: "Rasyonel sayılar: aynı bütün, doğru işlem ve görsel kanıt",
    selector: ".r035-lab",
    storedKey: "r035:rational",
    persisted: {
      mode: 6,
      partN: 3,
      partD: 4,
      scale: 3,
      lineAN: -2,
      lineAD: 3,
      lineBN: -3,
      lineBD: 5,
      showMiddle: true,
      showDistance: true,
      cmpAN: 7,
      cmpAD: 8,
      cmpBN: 11,
      cmpBD: 12,
      opAN: 1,
      opAD: 2,
      opBN: 1,
      opBD: 3,
      operation: 3,
      whole: "1",
      prefix: "2",
      period: "3",
      negative: false,
      total: 80,
      firstN: 1,
      firstD: 4,
      secondN: 1,
      secondD: 3,
      secondBase: 0,
      finalAmount: 40,
      measureMode: 2,
      emptyMass: 120,
      fullMass: 360,
      partialMass: 270,
      compositionN: 2,
      compositionD: 5,
      removeN: 1,
      removeD: 3,
      finalA: 700,
      ropeN: 3,
      ropeD: 4,
      pieceN: 1,
      pieceD: 8,
    },
    note: "035: ikinci kesrin bütününü, eksi yönünü ve birimini korurum; devir bloğu ile ön eki ayırırım. ÇĞİÖŞÜ.",
    async act(lab) {
      await click(lab, "Denk parçalar");
      await range(lab, "Pay a", 3);
      await range(lab, "Payda b", 0);
      await expect(lab.locator(".r035-caution")).toContainText(
        "Payda sıfır olamaz",
      );
      await expect(lab.locator("svg")).toHaveCount(0);
      await range(lab, "Payda b", 4);
      await range(lab, "Genişletme çarpanı k", 3);
      await expect(lab.locator(".r035-result")).toHaveText("3/4 = 9/12 = 3/4");
      await expect(lab.locator(".r035-figure")).toHaveCount(2);
      await expect(lab.locator(".r035-fill").first()).toHaveAttribute(
        "width",
        "390",
      );
      await click(lab, "Sayı doğrusu");
      await click(lab, "−2/3 ve −3/5");
      const distance = lab.getByRole("button", {
        name: "Sıfıra uzaklıkları göster",
        exact: true,
      });
      if ((await distance.getAttribute("aria-pressed")) !== "true")
        await distance.click();
      await expect(lab).toContainText("-2/3 < -3/5");
      await expect(lab).toContainText("Ortalama (A+B)/2 = -19/30");
      const point = async (selector) =>
        Number(await lab.locator(selector).getAttribute("cx"));
      expect(await point(".r035-point-a")).toBeCloseTo(108.6666666667, 6);
      expect(await point(".r035-point-b")).toBeCloseTo(124.8, 6);
      expect(await point(".r035-point-mid")).toBeCloseTo(116.7333333333, 6);
      await click(lab, "Üç karşılaştırma");
      await click(lab, "7/8 ve 11/12");
      await expect(lab.locator(".r035-result")).toHaveText("7/8 < 11/12");
      await expect(lab).toContainText("21/24 < 22/24");
      await expect(lab).toContainText("1−A = 1/8, 1−B = 1/12");
      await click(lab, "Dört işlem");
      await range(lab, "İlk kesrin payı", 1);
      await range(lab, "İlk kesrin paydası", 2);
      await range(lab, "İkinci kesrin payı", 1);
      await range(lab, "İkinci kesrin paydası", 3);
      await click(lab, "Topla");
      await expect(lab.locator(".r035-result")).toHaveText(
        "(1/2) + (1/3) = 5/6",
      );
      await click(lab, "Böl");
      await expect(lab.locator(".r035-result")).toHaveText(
        "(1/2) ÷ (1/3) = 3/2",
      );
      await range(lab, "İkinci kesrin payı", 0);
      await expect(lab.locator(".r035-caution")).toContainText(
        "Bölen kesir sıfır olamaz",
      );
      await expect(lab.locator("svg")).toHaveCount(0);
      await range(lab, "İkinci kesrin payı", 1);
      await click(lab, "Ondalık ve devir");
      await click(lab, "1,(24)");
      await expect(lab.locator(".r035-result")).toHaveText("Tam kesir: 41/33");
      await click(lab, "1,2(3)");
      await expect(lab.locator(".r035-result")).toHaveText("Tam kesir: 37/30");
      await expect(lab).toContainText("Uzun bölme denetimi: 1,2(3)");
      await lab
        .getByRole("checkbox", { name: "Negatif göster", exact: true })
        .check();
      await expect(lab.locator(".r035-result")).toHaveText("Tam kesir: -37/30");
      await lab
        .getByRole("checkbox", { name: "Negatif göster", exact: true })
        .uncheck();
      await click(lab, "Değişen bütün");
      await click(lab, "80 → 60 → 40");
      await expect(lab.locator(".r035-result")).toHaveText(
        "Başlangıca göre kalan kesir: 1/2",
      );
      await expect(lab.getByRole("img")).toHaveAccessibleName(
        "Başlangıç 80 birim. İlk kullanım 20, ilk kalan 60, ikinci kullanım 20, son kalan 40. İkinci bütün ilk kalan.",
      );
      await click(lab, "Başlangıcın kesri");
      await expect(lab.locator(".r035-result")).toHaveText(
        "Başlangıca göre kalan kesir: 5/12",
      );
      await expect(lab).toContainText("Bu son kalana göre başlangıç: 96 birim");
      await click(lab, "Kalanın kesri");
      await click(lab, "Miktar ve birim");
      await click(lab, "Kabın darasını çıkar");
      await range(lab, "Boş kap; g", 120);
      await range(lab, "Tam dolu kap; g", 360);
      await range(lab, "Kısmen dolu kap; g", 270);
      await expect(lab.locator(".r035-result")).toHaveText(
        "Sıvı oranı = (270−120)/(360−120) = 5/8",
      );
      await click(lab, "Bileşeni değiştir");
      await range(lab, "Başlangıç A payı", 2);
      await range(lab, "Başlangıç A paydası", 5);
      await range(lab, "B’den çıkarılan pay", 1);
      await range(lab, "B’den çıkarılan payda", 3);
      await range(lab, "Son A hacmi; mL", 700);
      await expect(lab.locator(".r035-result")).toHaveText(
        "Son A=700 mL ise toplam V=3500/3 mL.",
      );
      await click(lab, "İpi parçalara ayır");
      await range(lab, "İp uzunluğu payı; m", 3);
      await range(lab, "İp uzunluğu paydası", 4);
      await range(lab, "Parça uzunluğu payı; m", 1);
      await range(lab, "Parça uzunluğu paydası", 8);
    },
    async assertModel(lab) {
      await expect(
        lab.getByRole("button", { name: "Miktar ve birim", exact: true }),
      ).toHaveAttribute("aria-pressed", "true");
      await expect(
        lab.getByRole("button", { name: "İpi parçalara ayır", exact: true }),
      ).toHaveAttribute("aria-pressed", "true");
      await expect(lab.locator(".r035-result")).toHaveText(
        "(3/4 m)/(1/8 m) = 6 birim parça",
      );
      await expect(lab).toContainText(
        "6 tam parça; iki ucu açık tek ipte ayrı kesimlerle 5 kesim gerekir.",
      );
      await expect(lab.locator("svg .r035-fill")).toHaveCount(6);
      await expect(lab.getByRole("img")).toHaveAccessibleName(
        /6 eş ip parçasının sayma tablosu; her hücre 1\/8 m/,
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
  const subject = page
    .locator(".subject-panel")
    .filter({
      has: page.getByRole("heading", { name: "Matematik", exact: true }),
    });
  const entry = subject.locator(`.ready-topic[data-lesson-id="${unit.id}"]`);
  if (!(await entry.isVisible()))
    await subject.locator(".subject-header").click();
  await entry.click();
  const lab = page.locator(unit.selector);
  await expect(lab).toBeVisible();
  await expect(
    page.locator(".guide-section").first().locator(unit.selector),
  ).toBeVisible();
  await expect(page.locator('input[type="file"]')).toHaveCount(0);
  return lab;
}
export async function runForge034035SmokeCase(page, navigate, unit) {
  const before = learning(await readState(page));
  const lab = await open(page, navigate, unit),
    initial = await lab.innerHTML();
  await unit.act(lab);
  await unit.assertModel(lab);
  expect(await lab.innerHTML()).not.toBe(initial);
  await expect
    .poll(async () => (await readState(page)).explorations[unit.storedKey])
    .toMatchObject(unit.persisted);
  const saved = (await readState(page)).explorations[unit.storedKey];
  expect(learning(await readState(page))).toEqual(before);
  await page
    .getByRole("textbox", { name: "Notun", exact: true })
    .fill(unit.note);
  await expect
    .poll(async () => (await readState(page)).notes[`lesson:${unit.id}`])
    .toBe(unit.note);
  const afterNote = {
    ...before,
    notes: { ...before.notes, [`lesson:${unit.id}`]: unit.note },
  };
  expect(learning(await readState(page))).toEqual(afterNote);
  await page.reload();
  await unit.assertModel(await open(page, navigate, unit));
  await expect(
    page.getByRole("textbox", { name: "Notun", exact: true }),
  ).toHaveValue(unit.note);
  expect((await readState(page)).explorations[unit.storedKey]).toEqual(saved);
  expect(learning(await readState(page))).toEqual(afterNote);
  return { id: unit.id, storedKey: unit.storedKey, saved, note: unit.note };
}
export async function assertForge034035ProcessRestart(
  page,
  navigate,
  snapshots,
) {
  expect(snapshots).toHaveLength(2);
  const before = learning(await readState(page));
  for (const snapshot of snapshots) {
    const unit = forge034035SmokeCases.find((x) => x.id === snapshot.id);
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
