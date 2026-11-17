import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import type { AppState } from "../../src/domain/model";
import { setThemePreference } from "./helpers/theme";
import { registerOfflineBootDiagnostics } from "./helpers/offlineBootDiagnostics";
registerOfflineBootDiagnostics();
const id = "tyt-mat-faktoriyel-kaynak-033";
async function stored(page: Page): Promise<AppState> {
  return page.evaluate(
    () =>
      new Promise((resolve, reject) => {
        const req = indexedDB.open("yksmania", 2);
        req.onerror = () => reject(req.error);
        req.onsuccess = () => {
          const db = req.result;
          const r = db.transaction("state").objectStore("state").get("current");
          r.onerror = () => {
            db.close();
            reject(r.error);
          };
          r.onsuccess = () => {
            db.close();
            resolve(r.result);
          };
        };
      }),
  );
}
const learning = (s: AppState) => ({
  sessions: s.sessions,
  reviews: s.reviews,
  theoryReviewCompletions: s.theoryReviewCompletions,
  topicProgress: s.topicProgress,
  notes: s.notes,
  draft: s.draft,
  unlocked: s.unlocked,
  examSessions: s.examSessions,
});
async function enter(page: Page) {
  const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page
    .locator(".sidebar")
    .getByRole("button", { name: "Konu Anlatımı", exact: true })
    .click();
  const subject = page.locator(".subject-panel").filter({
    has: page.getByRole("heading", { name: "Matematik", exact: true }),
  });
  await subject.locator(".subject-header").click();
  await subject.locator(`[data-lesson-id="${id}"]`).click();
  await expect(
    page.locator(".guide-section").first().locator(".f033-lab"),
  ).toBeVisible();
}
async function offlineReady(page: Page) {
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller)
      await new Promise<void>((resolve) =>
        navigator.serviceWorker.addEventListener(
          "controllerchange",
          () => resolve(),
          { once: true },
        ),
      );
  });
}
for (const profile of [
  { name: "desktopdark", width: 1280, large: false },
  { name: "320MatrixLexendUI200Text150", width: 320, large: true },
]) {
  test.describe(profile.name, () => {
    test.use({
      viewport: { width: profile.width, height: 1000 },
      hasTouch: true,
      locale: "tr-TR",
      reducedMotion: "reduce",
    });
    test("normalcourse entry operates allsixfactorialmodels and offlinechoices withoutlearningcredit", async ({
      page,
      context,
    }, info) => {
      test.setTimeout(90_000);
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto("/#/settings");
      await setThemePreference(page, profile.large ? "matrix" : "dark");
      if (profile.large) {
        await page
          .getByLabel("Yazı tipi", { exact: true })
          .selectOption("lexend");
        await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
        await page
          .getByLabel("Yalnızca yazı boyutu %", { exact: true })
          .fill("150");
        await page.evaluate(async () => {
          await document.fonts.load("400 45px Lexend");
          await document.fonts.load("600 45px Lexend");
        });
      }
      const before = learning(await stored(page));
      await enter(page);
      const lab = page.locator(".f033-lab"),
        modes = lab.getByRole("group", {
          name: "Faktöriyel keşif görünümü",
          exact: true,
        });
      await expect(page.locator("input[type=file]")).toHaveCount(0);
      for (let i = 1; i <= 5; i++)
        await lab
          .getByRole("button", { name: `${i}. çarpanı ekle`, exact: true })
          .click();
      await expect(lab.locator(".f033-result")).toContainText(
        "1 × 2 × 3 × 4 × 5 = 120",
      );
      await lab
        .getByRole("slider", { name: "n değeri", exact: true })
        .fill("0");
      await expect(lab.locator(".f033-chip")).toHaveText("Boş çarpım · 1");
      await expect(lab.locator('[data-mode="product"]')).toContainText(
        "0! = 1",
      );
      await modes
        .getByRole("button", { name: "Oranı sadeleştir", exact: true })
        .click();
      await lab
        .getByRole("slider", { name: "Paydaki n", exact: true })
        .fill("6");
      await lab
        .getByRole("slider", { name: "Paydadaki m", exact: true })
        .fill("8");
      await expect(lab.locator(".f033-result")).toContainText("1/56");
      await expect(lab.locator(".f033-common").first()).toHaveText("6!");
      await modes
        .getByRole("button", { name: "Asal bütçesi", exact: true })
        .click();
      await expect(lab.locator(".f033-budget-row")).toHaveCount(2);
      await expect(lab.locator(".f033-result")).toContainText("En büyük k = 4");
      await expect(lab.locator(".f033-result")).toContainText("175 tam sayı");
      await lab
        .getByRole("slider", { name: "Bölen tabanı b", exact: true })
        .fill("18");
      await expect(lab.locator(".f033-result")).toContainText("En büyük k = 2");
      await expect(lab.locator(".f033-result")).toContainText("11200 tam sayı");
      await expect(
        lab.locator(".f033-budget-row svg").first(),
      ).toHaveAccessibleName(/2 için 8 kopya/);
      await expect(
        lab.locator(".f033-budget-row svg").nth(1),
      ).toHaveAccessibleName(/3 için 4 kopya/);
      await lab.locator('[data-mode="budget"]').screenshot({
        path: info.outputPath(`prime-budget-${profile.width}.png`),
      });
      await modes
        .getByRole("button", { name: "2–5 eşleşmeleri", exact: true })
        .click();
      await expect(lab.locator(".f033-result")).toContainText("= 1 son sıfır");
      await lab
        .getByRole("slider", {
          name: "Paydada tüketilen 2 sayısı a",
          exact: true,
        })
        .fill("8");
      await expect(lab.locator(".f033-result")).toContainText("= 0 son sıfır");
      await expect(lab.locator(".f033-ten")).toHaveCount(0);
      await lab
        .getByRole("slider", {
          name: "Paydada tüketilen 2 sayısı a",
          exact: true,
        })
        .fill("9");
      await expect(
        lab.locator('[data-mode="zeros"] .f033-caution'),
      ).toContainText("Bölüm tam sayı değil");
      await expect(lab.locator(".f033-result")).toHaveCount(0);
      await lab
        .getByRole("slider", { name: "n değeri", exact: true })
        .fill("25");
      await lab
        .getByRole("slider", {
          name: "Paydada tüketilen 2 sayısı a",
          exact: true,
        })
        .fill("0");
      await expect(lab.locator(".f033-ten")).toHaveCount(6);
      await expect(lab.locator(".f033-result")).toContainText("= 6 son sıfır");
      await lab
        .locator('[data-mode="zeros"]')
        .screenshot({ path: info.outputPath(`pairs25-${profile.width}.png`) });
      await modes
        .getByRole("button", { name: "Sıralama koşulu", exact: true })
        .click();
      await expect(lab.locator(".f033-result")).toContainText("24 düzen");
      await lab
        .getByRole("button", { name: "A ilk yerde zorunlu", exact: true })
        .click();
      await expect(lab.locator(".f033-result")).toContainText("6 düzen");
      await lab
        .getByRole("button", { name: "A ilk yerde yasak", exact: true })
        .click();
      await expect(lab.locator(".f033-result")).toContainText("18 düzen");
      await lab
        .getByRole("slider", { name: "Farklı nesne sayısı", exact: true })
        .fill("1");
      await expect(lab.locator(".f033-result")).toContainText("0 düzen");
      await modes
        .getByRole("button", { name: "Toplam ve fark", exact: true })
        .click();
      await expect(lab.locator(".f033-result")).toContainText("144");
      await lab.getByRole("button", { name: "Çıkar", exact: true }).click();
      await expect(lab.locator(".f033-result")).toContainText("96");
      await lab
        .getByRole("slider", { name: "Ortak faktöriyel içi n", exact: true })
        .fill("0");
      await expect(lab.locator(".f033-result")).toContainText("= 0");
      await expect(lab.locator('[data-mode="sum"]')).toContainText(
        "Faktöriyellerin kendileri hâlâ pozitiftir",
      );
      await lab.screenshot({
        path: info.outputPath(`sum0-${profile.width}.png`),
      });
      const sizes = await lab
        .locator("button,input[type=range]")
        .evaluateAll((nodes) =>
          nodes.map((n) => ({
            tag: n.tagName,
            height: n.getBoundingClientRect().height,
          })),
        );
      expect(sizes.every((s) => s.height >= 44)).toBe(true);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth - innerWidth,
        ),
      ).toBeLessThanOrEqual(1);
      const audit = await new AxeBuilder({ page })
        .include(".f033-lab")
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(audit.violations).toEqual([]);
      const actualFont = await lab
        .locator(".f033-panel p")
        .first()
        .evaluate((node) => ({
          fontFamily: getComputedStyle(node).fontFamily,
          fontSize: parseFloat(getComputedStyle(node).fontSize),
          width: node.getBoundingClientRect().width,
        }));
      expect(actualFont.fontSize).toBeGreaterThanOrEqual(14.5);
      if (profile.large) expect(actualFont.fontFamily).toContain("Lexend");
      expect(learning(await stored(page))).toEqual(before);
      await page
        .getByRole("textbox", { name: "Notun", exact: true })
        .fill("2 çarpanı tükenirse 5 kalsa bile son sıfır yok.");
      await expect
        .poll(async () => (await stored(page)).notes[`lesson:${id}`])
        .toBe("2 çarpanı tükenirse 5 kalsa bile son sıfır yok.");
      const saved = await stored(page),
        choice = saved.explorations["f033:factorial"];
      await offlineReady(page);
      await context.setOffline(true);
      await page.reload();
      await expect(lab.locator('[data-mode="sum"]')).toBeVisible();
      await expect(lab.locator(".f033-result")).toContainText("= 0");
      await expect(
        page.getByRole("textbox", { name: "Notun", exact: true }),
      ).toHaveValue("2 çarpanı tükenirse 5 kalsa bile son sıfır yok.");
      expect((await stored(page)).explorations["f033:factorial"]).toEqual(
        choice,
      );
      expect(learning(await stored(page))).toEqual(learning(saved));
      const skip = page.locator(".skip-link"),
        beforeBounds = await skip.evaluate((node) => ({
          focused: document.activeElement === node,
          top: node.getBoundingClientRect().top,
          bottom: node.getBoundingClientRect().bottom,
        }));
      expect(beforeBounds.focused).toBe(false);
      expect(beforeBounds.bottom).toBeLessThanOrEqual(0);
      await page.keyboard.press("Tab");
      await expect(skip).toBeFocused();
      await expect(skip).toBeInViewport();
      await page.keyboard.press("Enter");
      await expect(page.locator("#main-content")).toBeFocused();
      expect(errors).toEqual([]);
      await info.attach("actual-factorial-exploration", {
        body: JSON.stringify({
          version: "0.21.0",
          profile,
          allSixModels: true,
          choices: choice,
          actualFont,
          skipLinkUnfocusedBounds: beforeBounds,
          actualSkipLinkTabEnter: true,
          noLearningCredit: true,
          offlineReload: true,
        }),
        contentType: "application/json",
      });
    });
  });
}
test("factorial source shows ownsolutions and saves two genuinely independent answers offline without automatic theory completion", async ({
  page,
  context,
}, info) => {
  test.setTimeout(90_000);
  await page.setViewportSize({ width: 1280, height: 1000 });
  await page.goto("/#/settings");
  await setThemePreference(page, "dark");
  await enter(page);
  await page.getByRole("button", { name: "Tüm anlatım", exact: true }).click();
  const example = page.locator("details.worked-example").filter({
    has: page
      .locator("summary")
      .filter({ hasText: "İki farklı ortak çarpanı aynı tabana indir" }),
  });
  await example.locator("summary").click();
  await example
    .getByRole("button", { name: "Çözümün tamamını göster", exact: true })
    .click();
  await expect(example.locator(".worked-steps li")).toHaveCount(3);
  await expect(example.locator(".worked-conclusion")).toContainText("48/5");
  const before = await stored(page);
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  await expect(page.locator(".question-meta")).toContainText("1 / 43");
  await expect(page.locator(".question-panel h2")).toContainText("0! kaçtır");
  // Derived from the definition of the empty product, without sourcekey lookup,
  // hint activation, injected learning state or direct application handlers.
  await page
    .locator(".answer-options .answer")
    .filter({ has: page.locator("span").filter({ hasText: /^1$/ }) })
    .click();
  await page
    .getByRole("button", { name: "Cevabı kontrol et", exact: true })
    .click();
  await expect(page.locator(".feedback.correct")).toBeVisible();
  await page.getByRole("button", { name: "Sonraki soru", exact: true }).click();
  await expect(page.locator(".question-panel h2")).toHaveText(
    "0!+1!+2! toplamı kaçtır?",
  );
  // 1+1+2=4 from definitions; this is the second actual independent response.
  await page
    .locator(".answer-options .answer")
    .filter({ has: page.locator("span").filter({ hasText: /^4$/ }) })
    .click();
  await page
    .getByRole("button", { name: "Cevabı kontrol et", exact: true })
    .click();
  await expect(page.locator(".feedback.correct")).toBeVisible();
  await expect
    .poll(async () => (await stored(page)).draft?.responses)
    .toHaveLength(2);
  const checked = await stored(page);
  expect(checked.draft?.responses.every((r) => r.correct && !r.assisted)).toBe(
    true,
  );
  expect(checked.sessions).toEqual(before.sessions);
  expect(checked.topicProgress).toEqual(before.topicProgress);
  expect(checked.reviews).toEqual(before.reviews);
  await page.locator(".question-panel").screenshot({
    path: info.outputPath("actual-second-independent-correct.png"),
  });
  await offlineReady(page);
  await context.setOffline(true);
  await page.reload();
  await expect(page.locator(".feedback.correct")).toBeVisible();
  await expect(page.locator(".question-meta")).toContainText("2 / 43");
  expect((await stored(page)).draft).toEqual(checked.draft);
  expect((await stored(page)).topicProgress).toEqual(before.topicProgress);
  await info.attach("actual-factorial-independent-answers", {
    body: JSON.stringify({
      lessonId: id,
      correct: 2,
      wrong: 0,
      totalInSet: 43,
      assisted: 0,
      completedSession: false,
      draft: checked.draft,
      offlineReload: true,
    }),
    contentType: "application/json",
  });
});

test("all43factorialcards complete through actualUI and expose learner-facingE11/Q29 explanations", async ({
  page,
  context,
}, info) => {
  test.setTimeout(120_000);
  await page.setViewportSize({ width: 1280, height: 1000 });
  await page.goto("/#/settings");
  await setThemePreference(page, "dark");
  await enter(page);
  await page.getByRole("button", { name: "Tüm anlatım", exact: true }).click();
  const example = page.locator("details.worked-example").filter({
    has: page
      .locator("summary")
      .filter({ hasText: "Dağınık çarpımdan dört halkalı zincire" }),
  });
  await example.locator("summary").click();
  await example
    .getByRole("button", { name: "Çözümün tamamını göster", exact: true })
    .click();
  await expect(example.locator(".worked-conclusion")).toContainText(
    "14!/9! fazladan 10 taşır",
  );
  await example.screenshot({
    path: info.outputPath("learner-facing-layered-example.png"),
  });
  const before = await stored(page);
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  // Literal, independently calculated mathematical expectations. No production
  // question catalogue/key/model import, state injection or application handler.
  // This automated regression is key-visible QA, not a blinded learner study.
  const expected = [
    "1",
    "4",
    "{3,4,5,6,7}",
    "{1,2}",
    "56",
    "1/56",
    "6!/2!",
    "36",
    "6",
    "48/5",
    "n·n!",
    "Çözüm yoktur.",
    "5",
    "8",
    "6",
    "4",
    "6",
    "7",
    "4",
    "12",
    "1",
    "0",
    "1",
    "24",
    "18",
    "6",
    "3",
    "5!",
    "14!/10!",
    "7",
    "72",
    "2",
    "3",
    "7",
    "{4,5}",
    "{5,6}",
    "2",
    "0",
    "8",
    "n=0 veya n=1 iken tek; n≥2 iken çifttir.",
    "7",
    "5",
    "6",
  ];
  for (let index = 0; index < expected.length; index++) {
    await expect(page.locator(".question-meta")).toContainText(
      `${index + 1} / 43`,
    );
    await page
      .locator(".answer-options .answer")
      .filter({
        has: page.getByText(expected[index], { exact: true }),
      })
      .click();
    await page
      .getByRole("button", { name: "Cevabı kontrol et", exact: true })
      .click();
    await expect(page.locator(".feedback.correct")).toBeVisible();
    if (index === 28) {
      const next = page.locator(".question-help .help-next");
      for (let stage = 0; stage < 10 && (await next.isVisible()); stage++) {
        const count = await page.locator(".help-content > section").count();
        await next.click();
        await expect(page.locator(".help-content > section")).toHaveCount(
          count + 1,
        );
      }
      await expect(page.locator(".help-full-solution")).toContainText(
        "2×7=14 birleşmesini atlama; başlangıç çarpanı 11 olduğundan paydaya 10! gelir.",
      );
      await page.locator(".question-help").screenshot({
        path: info.outputPath("learner-facing-layered-question-help.png"),
      });
    }
    if (index < 42)
      await page
        .getByRole("button", { name: "Sonraki soru", exact: true })
        .click();
  }
  const checked = await stored(page);
  expect(checked.draft?.responses).toHaveLength(43);
  expect(checked.draft?.responses.every((r) => r.correct && !r.assisted)).toBe(
    true,
  );
  await page
    .getByRole("button", { name: "Çalışmayı kaydet", exact: true })
    .click();
  await expect(page.locator(".result-stats > div strong")).toHaveText([
    "43/43",
    "43/43",
    "0",
  ]);
  const saved = await stored(page);
  expect(saved.sessions).toHaveLength(before.sessions.length + 1);
  const session = saved.sessions.at(-1)!;
  expect(session.lessonId).toBe(id);
  expect(session.responses).toHaveLength(43);
  expect(session.responses.every((r) => r.correct && !r.assisted)).toBe(true);
  expect(saved.topicProgress[`topic-${id}`]?.theory).toBeUndefined();
  await page
    .locator(".result-page")
    .screenshot({ path: info.outputPath("actual43of43result.png") });
  const past = page.getByRole("region", {
    name: "Bu konunun geçmiş ÖSYM soruları",
    exact: true,
  });
  await expect(past).toContainText("1 doğrulanmış konu bağlantısı");
  await past
    .getByRole("combobox", { name: "Sınav", exact: true })
    .selectOption("TYT");
  await past
    .getByRole("combobox", { name: "Yıl", exact: true })
    .selectOption("2022");
  await expect(past.locator(".past-exam-reference")).toHaveCount(0);
  await past
    .getByRole("combobox", { name: "Yıl", exact: true })
    .selectOption("2021");
  await expect(past.locator(".past-exam-reference")).toHaveCount(1);
  const ref = past.locator(".past-exam-reference");
  await ref.locator("summary").click();
  await expect(ref).toContainText(
    "Resmî cevap: C. Soru sayfası 27, cevap kaynağı sayfa 45",
  );
  const link = ref.getByRole("link", {
    name: /Resmî kaynak kaydı \(internet\)/,
  });
  await expect(link).toHaveAttribute(
    "href",
    "https://dokuman.osym.gov.tr/pdfdokuman/2021/YKS/TSK/tyt_yks_2021.pdf#page=27",
  );
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  // Activate the real source anchor with a benign local response. This proves
  // link behavior, not live PDF availability/content; actual official pages
  // were independently inspected in the separate source receipt.
  await context.route(
    "https://dokuman.osym.gov.tr/pdfdokuman/2021/YKS/TSK/tyt_yks_2021.pdf*",
    (route) =>
      route.fulfill({
        status: 200,
        contentType: "text/html",
        body: "<!doctype html><title>Yerel bağlantı denetimi</title>",
      }),
  );
  const popupPromise = page.waitForEvent("popup");
  await link.click();
  const popup = await popupPromise;
  await popup.waitForLoadState("domcontentloaded");
  expect(popup.url()).toContain("tyt_yks_2021.pdf#page=27");
  await popup.close();
  await context.unroute(
    "https://dokuman.osym.gov.tr/pdfdokuman/2021/YKS/TSK/tyt_yks_2021.pdf*",
  );
  await offlineReady(page);
  await context.setOffline(true);
  await page.reload();
  await expect(page.locator(".result-stats > div strong")).toHaveText([
    "43/43",
    "43/43",
    "0",
  ]);
  expect((await stored(page)).sessions).toEqual(saved.sessions);
  await expect(past).toContainText("1 doğrulanmış konu bağlantısı");
  const own = past.locator(".exam-teaching-case");
  await expect(own).toContainText("Resmî sorunun birebir aktarımı değildir");
  for (let step = 0; step < 3; step++) {
    await own
      .getByRole("button", {
        name: step === 0 ? "Çözümü adım adım aç" : "Sonraki çözüm adımı",
        exact: true,
      })
      .click();
    await expect(own.locator("ol li")).toHaveCount(step + 1);
  }
  await expect(own.locator(".worked-conclusion")).toContainText(
    "14!/10! = 24.024 salon",
  );
  await expect(own.locator(".worked-conclusion")).toContainText(
    "kaynak sorunun C anahtarı bu özgün öğretim örneğinin seçenek harfi değildir",
  );
  expect((await stored(page)).sessions).toEqual(saved.sessions);
  expect((await stored(page)).topicProgress).toEqual(saved.topicProgress);
  await past.screenshot({
    path: info.outputPath("verified-past-source-and-offline-own-solution.png"),
  });
  await info.attach("actual-full-factorial-session", {
    body: JSON.stringify({
      version: "0.21.0",
      lessonId: id,
      correct: 43,
      wrong: 0,
      assisted: 0,
      completedSession: true,
      session,
      offlineReload: true,
      officialSourceConnection: {
        year: 2021,
        question: 5,
        sourceAnswer: "C",
        questionPage: 27,
        keyPage: 45,
        filterTested: true,
        anchorActivatedWithLocalIntercept: true,
        offlineOwnSolution: true,
        noExtraLearningCredit: true,
      },
      scope:
        "Automated actual UI regression with mathematical expectations; not blind learning efficacy evidence.",
    }),
    contentType: "application/json",
  });
});
