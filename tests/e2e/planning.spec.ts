import { setThemePreference } from "./helpers/theme";
import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.use({ locale: "en-US", timezoneId: "UTC" });
test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-11-14T12:00:00Z"));
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Bugün", exact: true }),
  ).toBeVisible();
});
async function nav(page: Page, name: string) {
  await expect(page.locator(".sidebar")).toBeAttached();
  const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page
    .locator(".sidebar")
    .getByRole("button", { name, exact: true })
    .click();
}
async function stored(page: Page) {
  return page.evaluate(
    () =>
      new Promise<any>((resolve, reject) => {
        const r = indexedDB.open("yksmania");
        r.onsuccess = () => {
          const d = r.result,
            q = d.transaction("state").objectStore("state").get("current");
          q.onsuccess = () => {
            resolve(q.result);
            d.close();
          };
          q.onerror = () => reject(q.error);
        };
        r.onerror = () => reject(r.error);
      }),
  );
}
const plan = (page: Page, mode = "Konu planı") =>
  page.getByRole("region", { name: mode, exact: true });
const saveStatus = (page: Page) =>
  expect(page.locator(".save-status")).toContainText("Bu cihazda kaydedildi");
async function openChem(page: Page, name: RegExp) {
  await nav(page, "Konu Anlatımı");
  await page.getByRole("button", { name: "TYT", exact: true }).click();
  await page.getByRole("button", { name: /Kimya.*17 konu/ }).click();
  await page.getByRole("button", { name }).click();
  await expect(page.locator(".chemistry-lab")).toBeVisible();
}
async function finish(page: Page, answers: number[]) {
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  for (const [i, index] of answers.entries()) {
    await page.locator(".answer").nth(index).click();
    await page
      .getByRole("button", { name: "Cevabı kontrol et", exact: true })
      .click();
    await page
      .getByRole("button", {
        name: i === 4 ? "Çalışmayı kaydet" : "Sonraki soru",
        exact: true,
      })
      .click();
  }
  await expect(page.locator(".result-stats")).toContainText("5/5");
  const s = await stored(page);
  expect(s.sessions).toHaveLength(1);
  expect(s.sessions[0].includesTheory).toBe(false);
  expect(s.reviews).toHaveLength(3);
  expect(s.topicProgress).toEqual({});
}
test("YKS-009 two deadlines use eligible days, editable day-first dates and the verified first-study order", async ({
  page,
}) => {
  await expect(plan(page)).toContainText("485 kalan konu ÷ 107 uygun gün");
  await expect(plan(page, "Soru planı")).toContainText(
    "485 kalan konu ÷ 107 uygun gün",
  );
  await expect(plan(page).locator(".planned-topics li")).toHaveCount(5);
  await expect(
    plan(page, "Soru planı").locator(".planned-topics li"),
  ).toHaveCount(5);
  await expect(plan(page).locator(".planned-topics li").first()).toContainText(
    "1. konu · TYT Kimya",
  );
  await expect(plan(page).locator(".planned-topics li").first()).toContainText(
    "Simyadan kimyaya",
  );
  await nav(page, "Ayarlar");
  const date = page.getByRole("textbox", {
    name: "Hedef sınav tarihi",
    exact: true,
  });
  await expect(date).toHaveValue("28/02/2027");
  await setThemePreference(page, "light");
  await saveStatus(page);
  await date.fill("06/18/2027");
  await expect(date).toHaveAttribute("aria-invalid", "true");
  expect((await stored(page)).settings.examDate).toBe("2027-02-28");
  await date.fill("25/05/2027");
  await saveStatus(page);
  await page.reload();
  await expect(date).toHaveValue("25/05/2027");
  await nav(page, "Takvim");
  await page.getByRole("button", { name: "Cmt", exact: true }).click();
  const blocked = page.getByRole("textbox", {
    name: "Tek tarih kapat",
    exact: true,
  });
  await blocked.fill("16/11/2026");
  await page.getByRole("button", { name: "Ekle", exact: true }).click();
  await saveStatus(page);
  await nav(page, "Bugün");
  await expect(plan(page)).toContainText("485 kalan konu ÷ 90 uygun gün");
  await expect(plan(page)).toContainText("Bugün müsait değil");
  await expect(plan(page, "Soru planı")).toContainText("Hedef: 25/05/2027");
  await plan(page)
    .getByText("Tüm çalışma sırası ve tarihler (485)", { exact: true })
    .click();
  await expect(plan(page).locator(".plan-full-order li")).toHaveCount(485);
  const rows = await plan(page)
    .locator(".plan-full-order li")
    .allTextContents();
  expect(rows[0]).toContain("15/11/2026");
  expect(
    rows.every((v) => !v.includes("14/11/2026") && !v.includes("16/11/2026")),
  ).toBe(true);
  expect((await stored(page)).settings.blockedWeekdays).toEqual([6]);
});
test("YKS-009 daily completion is durable, undoable, independent of questions and never reports a failed save as done", async ({
  page,
  context,
}) => {
  await page.locator(".hero .primary").click();
  await expect(
    page.getByRole("heading", {
      name: "Simyadan kimyaya: amaç, yöntem ve kanıt",
      exact: true,
    }),
  ).toBeVisible();
  await page.evaluate(() => {
    const put = IDBObjectStore.prototype.put;
    IDBObjectStore.prototype.put = function (
      ...args: Parameters<IDBObjectStore["put"]>
    ) {
      if ((window as any).__failTopic && this.name === "state")
        throw new DOMException("Synthetic disk full", "QuotaExceededError");
      return put.apply(this, args);
    };
    (window as any).__failTopic = true;
  });
  await page
    .getByRole("button", { name: "Konuyu çalıştım", exact: true })
    .click();
  await expect(page.locator(".error-banner")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Konuyu çalıştım", exact: true }),
  ).toHaveAttribute("aria-pressed", "false");
  expect(await stored(page)).toBeUndefined();
  await page.evaluate(() => {
    (window as any).__failTopic = false;
  });
  await page
    .getByRole("button", { name: "Konuyu çalıştım", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Çalışma kaydını geri al", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await context.setOffline(true);
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Çalışma kaydını geri al", exact: true }),
  ).toBeVisible();
  await nav(page, "Bugün");
  await expect(plan(page)).toContainText("484 kalan konu ÷ 107 uygun gün");
  await expect(plan(page)).toContainText(
    "Bugünün hedefi: 5 konu · 1 tamamlandı",
  );
  // Completed work remains visible; the four pending topics keep their order.
  await expect(plan(page).locator(".planned-topics li")).toHaveCount(5);
  await expect(plan(page).locator(".planned-topic.is-complete")).toContainText(
    "Konu tamamlandı",
  );
  await expect(
    plan(page).locator(".planned-topic:not(.is-complete)"),
  ).toHaveCount(4);
  await expect(
    plan(page).locator(".planned-topic:not(.is-complete)").first(),
  ).toContainText("2. konu");
  await expect(plan(page, "Soru planı")).toContainText("485 kalan konu");
  const s = await stored(page);
  expect(s.sessions).toEqual([]);
  expect(s.reviews).toEqual([]);
  expect(s.topicProgress["detail-139"].theory).toBe("2026-11-14");
  await nav(page, "Dünyam");
  await page
    .getByRole("combobox", { name: "TYT ders seçimi" })
    .selectOption("tyt-kimya");
  await page
    .locator(".skill-topic")
    .filter({ hasText: "Simyadan kimyaya" })
    .click();
  await page
    .getByRole("button", { name: "Çalışma kaydını geri al", exact: true })
    .click();
  await nav(page, "Bugün");
  await expect(plan(page)).toContainText("485 kalan konu");
  await expect(plan(page).locator(".planned-topics li")).toHaveCount(5);
});
test("YKS-010 one subject-colored progress chart and separate TYT/AYT trees link real topic and question branches", async ({
  page,
}) => {
  await expect(
    page
      .locator(".sidebar")
      .getByRole("button", { name: "Kütüphane", exact: true }),
  ).toHaveCount(0);
  await page.locator(".hero .primary").click();
  await page
    .getByRole("button", { name: "Konuyu çalıştım", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Çalışma kaydını geri al", exact: true }),
  ).toBeVisible();
  await nav(page, "Dünyam");
  const chart = page.getByRole("img", {
    name: /Genel konu çalışma ilerlemesi/,
  });
  await expect(chart).toHaveCount(1);
  await expect(chart).toHaveAttribute("aria-label", /1\/485 konu/);
  await expect(page.locator(".subject-progress-table tbody tr")).toHaveCount(
    15,
  );
  const left = page.getByRole("region", {
    name: "TYT konu ağacı",
    exact: true,
  });
  const right = page.getByRole("region", {
    name: "AYT konu ağacı",
    exact: true,
  });
  const a = await left.boundingBox(),
    b = await right.boundingBox();
  expect(a!.x).toBeLessThan(b!.x);
  for (const tree of [left, right]) {
    const diagram = tree.locator(".subject-tree-diagram");
    const root = await diagram.locator(":scope > circle").boundingBox();
    for (const subject of await diagram.getByRole("button").all()) {
      const branchBounds = await subject.boundingBox();
      expect(root!.y + root!.height).toBeLessThan(branchBounds!.y);
    }
  }
  const branch = page.getByRole("button", {
    name: "TYT Kimya konuları",
    exact: true,
  });
  await branch.focus();
  await page.keyboard.press("Enter");
  await expect(left.getByRole("combobox")).toHaveValue("tyt-kimya");
  await expect(left.locator(".skill-topic").first()).toHaveClass(/is-complete/);
  await left.locator(".skill-question").first().click();
  await expect(
    page.getByRole("heading", {
      name: "Uygulamadaki soru setleri",
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", {
      name: "Kaynağımdaki soruları çalıştım",
      exact: true,
    }),
  ).toHaveCount(0);
  await page.locator(".topic-study .ready-topic").first().click();
  for (const [i, selected] of [1, 1, 2, 0, 1].entries()) {
    await page.locator(".answer").nth(selected).click();
    await page
      .getByRole("button", { name: "Cevabı kontrol et", exact: true })
      .click();
    await page
      .getByRole("button", {
        name: i === 4 ? "Çalışmayı kaydet" : "Sonraki soru",
        exact: true,
      })
      .click();
  }
  await expect(page.locator(".result-stats")).toContainText("5/5");
  await nav(page, "Dünyam");
  await expect(
    page.locator(".subject-progress-table tr").filter({ hasText: "TYT Kimya" }),
  ).toContainText("1/55");
  await left.getByRole("combobox").selectOption("tyt-kimya");
  await expect(left.locator(".skill-question").first()).toHaveClass(
    /is-complete/,
  );
  await expect(chart).toHaveAttribute("aria-label", /1\/485 konu/);
  const issues = await new AxeBuilder({ page })
    .include(".main-content")
    .analyze();
  expect(
    issues.violations.filter((v) =>
      ["serious", "critical"].includes(v.impact!),
    ),
  ).toEqual([]);
});
test("YKS-009 an open offline app replans across midnight and refreshes when returning from the background", async ({
  page,
  context,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.clock.install({ time: new Date("2026-11-14T23:59:30Z") });
  await page.reload();
  await expect(plan(page)).toContainText("485 kalan konu ÷ 107 uygun gün");
  await page.locator(".hero .primary").click();
  await page
    .getByRole("button", { name: "Konuyu çalıştım", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Çalışma kaydını geri al", exact: true }),
  ).toBeVisible();
  await nav(page, "Bugün");
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await context.setOffline(true);
  await page.clock.runFor(61000);
  await expect(plan(page)).toContainText("484 kalan konu ÷ 106 uygun gün");
  await expect(plan(page)).toContainText(
    "Bugünün hedefi: 5 konu · 0 tamamlandı",
  );
  await expect(plan(page).locator(".planned-topics li")).toHaveCount(5);
  await page.clock.setSystemTime(new Date("2026-11-16T12:00:00Z"));
  await page.evaluate(() => window.dispatchEvent(new Event("focus")));
  await expect(plan(page)).toContainText("484 kalan konu ÷ 105 uygun gün");
  expect((await stored(page)).topicProgress["detail-139"].theory).toBe(
    "2026-11-14",
  );
});
test("new plan, trees and dates stay usable at 320px and 200% UI / 150% text offline", async ({
  page,
  context,
}) => {
  await page.setViewportSize({ width: 320, height: 900 });
  const actor = await page.locator(".hero .aion-sprite").boundingBox();
  const art = await page.locator(".hero-art").boundingBox();
  expect(actor!.y).toBeGreaterThanOrEqual(art!.y);
  expect(actor!.y + actor!.height).toBeLessThanOrEqual(art!.y + art!.height);
  await nav(page, "Ayarlar");
  await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
  await page.getByLabel("Yalnızca yazı boyutu %", { exact: true }).fill("150");
  await setThemePreference(page, "light");
  await saveStatus(page);
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await context.setOffline(true);
  for (const route of ["Bugün", "Dünyam", "Ayarlar"]) {
    await nav(page, route);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
  }
  await expect(
    page.getByRole("textbox", { name: "Hedef sınav tarihi", exact: true }),
  ).toHaveValue("28/02/2027");
  await nav(page, "Dünyam");
  await page
    .getByRole("combobox", { name: "AYT ders seçimi" })
    .selectOption("ayt-biyoloji");
  await page
    .getByRole("region", { name: "AYT konu ağacı", exact: true })
    .locator(".skill-topic")
    .filter({ hasText: "DNA Replikasyonu" })
    .click();
  await expect(
    page.getByRole("button", { name: "Konuyu çalıştım", exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  ).toBe(true);
});

test("OGM simya compares filtration, evaporation and recovered water before original questions", async ({
  page,
}) => {
  await openChem(page, /Simyadan kimyaya: amaç/);
  for (let i = 0; i < 3; i++)
    await page
      .getByRole("button", { name: "Sonraki aşama", exact: true })
      .click();
  await expect(page.locator(".model-results")).toContainText(
    "Su ayrı kapta toplanır",
  );
  await page
    .getByRole("combobox", { name: "Ayırma yöntemi", exact: true })
    .selectOption("1");
  await expect(page.locator(".model-results")).toContainText(
    "çözünmüş tuzu ayıramaz",
  );
  await finish(page, [1, 1, 2, 0, 1]);
});
test("OGM disciplines change the research question rather than infer the field from one substance", async ({
  page,
}) => {
  await openChem(page, /Kimya disiplinleri:/);
  await page
    .getByRole("combobox", { name: "Kimya disiplini", exact: true })
    .selectOption("1");
  await expect(page.locator(".model-results")).toContainText(
    "Bir enzimin metabolik görevi",
  );
  await page
    .getByRole("combobox", { name: "Kimya disiplini", exact: true })
    .selectOption("6");
  await expect(page.locator(".model-results")).toContainText(
    "maliyeti ve verimi",
  );
  await finish(page, [0, 1, 2, 1, 2]);
});
test("OGM symbolic language multiplies every atom and distinguishes Co from CO", async ({
  page,
}) => {
  await openChem(page, /Kimyanın sembolik dili:/);
  await page
    .getByRole("combobox", { name: "Formül veya sembol", exact: true })
    .selectOption("2");
  await page.getByRole("slider", { name: "Katsayı", exact: true }).fill("3");
  await expect(page.locator(".formula-count")).toContainText(
    "Ca: 3 · O: 6 · H: 6",
  );
  await page
    .getByRole("combobox", { name: "Formül veya sembol", exact: true })
    .selectOption("3");
  await expect(page.locator(".formula-count")).toContainText("Co: 3");
  await page
    .getByRole("combobox", { name: "Formül veya sembol", exact: true })
    .selectOption("4");
  await expect(page.locator(".formula-count")).toContainText("C: 3 · O: 3");
  await finish(page, [0, 2, 1, 0, 1]);
});
test("OGM safety distinguishes oxidizer and flammable pictograms with contextual precautions", async ({
  page,
}) => {
  await openChem(page, /Kimyada güvenlik:/);
  await page
    .getByRole("combobox", { name: "Uyarı işareti", exact: true })
    .selectOption("1");
  await expect(
    page.getByRole("img", { name: "Oksitleyici için şematik uyarı simgesi" }),
  ).toBeVisible();
  await expect(page.locator(".model-results")).toContainText("Alev ve halka");
  await page
    .getByRole("combobox", { name: "Uyarı işareti", exact: true })
    .selectOption("2");
  await expect(page.locator(".model-results")).toContainText(
    "Göz, cilt veya solunum",
  );
  await finish(page, [1, 0, 2, 1, 0]);
});
test("OGM atom models compare energy levels and probability with retained offline exploration", async ({
  page,
  context,
}) => {
  await openChem(page, /Atom modelleri:/);
  await page
    .getByRole("combobox", { name: "Atom modeli", exact: true })
    .selectOption("3");
  await page
    .getByRole("button", { name: "Elektrona enerji ver", exact: true })
    .click();
  await expect(page.locator(".model-results")).toContainText(
    "üst enerji düzeyine çıktı",
  );
  await page
    .getByRole("combobox", { name: "Atom modeli", exact: true })
    .selectOption("4");
  await expect(page.locator(".model-results")).toContainText(
    "aynı anda 70 elektron var demek değildir",
  );
  await saveStatus(page);
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await context.setOffline(true);
  await page.reload();
  await expect(
    page.getByRole("combobox", { name: "Atom modeli", exact: true }),
  ).toHaveValue("4");
  const issues = await new AxeBuilder({ page })
    .include(".main-content")
    .analyze();
  expect(
    issues.violations.filter((v) =>
      ["serious", "critical"].includes(v.impact!),
    ),
  ).toEqual([]);
  await finish(page, [1, 2, 0, 1, 2]);
});
