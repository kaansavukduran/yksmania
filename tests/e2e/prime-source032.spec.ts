import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import type { AppState } from "../../src/domain/model";
import { setThemePreference } from "./helpers/theme";
import { registerOfflineBootDiagnostics } from "./helpers/offlineBootDiagnostics";
import { openGuidePage, openWorkedExamples } from "./helpers/guidePages";
registerOfflineBootDiagnostics();
async function stored(page: Page): Promise<AppState> {
  return page.evaluate(
    () =>
      new Promise((resolve, reject) => {
        const request = indexedDB.open("yksmania", 2);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const db = request.result;
          const read = db
            .transaction("state")
            .objectStore("state")
            .get("current");
          read.onerror = () => {
            db.close();
            reject(read.error);
          };
          read.onsuccess = () => {
            db.close();
            resolve(read.result);
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

test("the revised prime guide and summary let learners try each repair before revealing answers offline", async ({ page, context }) => {
  test.setTimeout(100_000);
  await page.goto("/");
  const navigate = async (name: string) => {
    const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
    if (await menu.isVisible()) await menu.click();
    await page.locator(".sidebar").getByRole("button", { name, exact: true }).click();
  };
  await navigate("Ayarlar");
  await setThemePreference(page, "light");
  await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
  await page.getByLabel("Yalnızca yazı boyutu %", { exact: true }).fill("150");
  await page.setViewportSize({ width: 320, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller) {
      await new Promise<void>((resolve) => {
        navigator.serviceWorker.addEventListener("controllerchange", () => resolve(), { once: true });
      });
    }
  });
  await context.setOffline(true);
  const before = learning(await stored(page));
  await navigate("Konu Anlatımı");
  await page.getByRole("button", { name: "TYT", exact: true }).click();
  await page.getByRole("textbox", { name: "Ders veya konu ara", exact: true }).fill("Asal sayılar");
  await page.locator('[data-lesson-id="tyt-mat-asal-kaynak-032"]').click();
  const sectionTitle = "Destek azalt: eksik adımı ve kaybolan koşulu bul";
  await openGuidePage(page, sectionTitle);
  const section = page.locator(".guide-section").filter({
    has: page.getByRole("heading", { name: sectionTitle, exact: true }),
  });
  await expect(section).toContainText("Eksik adımı tamamla, sonra koşula dön");
  await expect(section).not.toContainText(/n\s*=\s*0|n\s*\+\s*1\s*=\s*1|çözüm(?:ü)? yok/);
  await openWorkedExamples(page);
  const worked = page.locator(".worked-example").filter({
    has: page.locator("summary", { hasText: "Eksik adımı tamamla, sonra koşula dön" }),
  });
  await worked.locator("summary").click();
  await expect(worked.locator(".worked-steps li")).toHaveCount(0);
  await worked.getByRole("button", { name: "İlk adımı göster", exact: true }).click();
  await expect(worked.locator(".worked-steps li")).toHaveCount(1);
  await worked.getByRole("button", { name: "Çözümün tamamını göster", exact: true }).click();
  await expect(worked.locator(".worked-conclusion")).toContainText("Pozitif tam n çözümü yok.");

  await navigate("Kopya Kağıtları");
  await page.getByRole("textbox", { name: "Ders veya konu ara", exact: true }).fill("Asal sayılar: elekten kaynak sorularına");
  await page.getByRole("button", { name: "Asal sayılar: elekten kaynak sorularına", exact: true }).click();
  const sheet = page.locator(".cheat-reader");
  await expect(sheet).toContainText("İki farklı etiket ve üç kart vardır");
  const prompts = sheet.locator(".cheat-section").filter({ hasText: "Önce üç onarım sorusunu çöz" });
  await expect(prompts).toContainText("121’i asal saymadan önce");
  await expect(prompts).toContainText("14 ile 25 aralarında asal mı?");
  await expect(prompts).toContainText(/n²\s*−\s*1 asal/);
  const repair = sheet.locator(".worked-example").filter({ has: page.locator("summary", { hasText: "Onarım çözümleri" }) });
  expect(await prompts.evaluate((node) => Boolean(node.compareDocumentPosition(document.querySelector(".cheat-examples")!) & Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
  await expect(repair).toHaveJSProperty("open", false);
  await repair.locator(":scope > summary").press("Enter");
  const solution = repair.locator(".cheat-solution");
  await expect(solution).toHaveJSProperty("open", false);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator("li")).toHaveCount(3);
  await expect(solution).toContainText(/Son aday 11’dir.*Tek uygun n\s*=\s*2/);
  const note = sheet.getByRole("textbox", { name: "Notun", exact: true });
  await note.fill("Karekök sınırındaki asal çarpanı da dene.");
  await expect(page.locator(".save-status")).toContainText("Bu cihazda kaydedildi");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await page.reload();
  await expect(note).toHaveValue("Karekök sınırındaki asal çarpanı da dene.");
  expect({ ...learning(await stored(page)), notes: before.notes }).toEqual(before);
});

for (const profile of [
  {
    name: "desktop dark",
    width: 1280,
    theme: "dark" as const,
    scale: 100,
    text: 100,
  },
  {
    name: "320px Matrix actualLexend UI200 text150",
    width: 320,
    theme: "matrix" as const,
    scale: 200,
    text: 150,
  },
]) {
  test.describe(profile.name, () => {
    test.use({
      viewport: { width: profile.width, height: 1000 },
      hasTouch: true,
      locale: "tr-TR",
      reducedMotion: "reduce",
    });
    test("ordinary prime lesson proves all15primes, preservesbaseprimes, explainsfactorrectangles and persists offline withoutlearningwrites", async ({
      page,
      context,
    }, info) => {
      test.setTimeout(90_000);
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto("/#/settings");
      await setThemePreference(page, profile.theme);
      if (profile.scale === 200) {
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
      await subject
        .locator('[data-lesson-id="tyt-mat-asal-kaynak-032"]')
        .click();
      const lab = page.locator(".p032-lab");
      await expect(lab).toBeVisible();
      await expect(
        page.locator(".guide-section").first().locator(".p032-lab"),
      ).toBeVisible();
      await expect(page.locator("input[type=file]")).toHaveCount(0);
      const grid = lab.getByRole("group", {
        name: "1 ile 50 arasındaki sayı eleği",
        exact: true,
      });
      await expect(grid.getByRole("button")).toHaveCount(50);
      await expect(grid.locator('[data-eliminated-by="2"]')).toHaveCount(0);
      await expect(grid.locator('[data-number="1"]')).toHaveAccessibleName(
        "1: ne asal ne bileşik",
      );
      await grid.locator('[data-number="49"]').press("Enter");
      await expect(lab.locator(".p032-verdict")).toContainText("49 bileşiktir");
      await expect(lab.locator(".p032-facts")).toContainText("1, 7, 49");
      await expect(grid.locator('[data-number="49"]')).toHaveAttribute(
        "data-prime-proven",
        "false",
      );
      const steps = [
        ["2’nin katlarını ele", 2, 24],
        ["3’ün katlarını ele", 3, 31],
        ["5’in katlarını ele", 5, 33],
        ["7’nin katlarını ele", 7, 34],
      ] as const;
      for (const [name, base, count] of steps) {
        await lab.getByRole("button", { name, exact: true }).click();
        await expect(grid.locator(`[data-number="${base}"]`)).toHaveAttribute(
          "data-eliminated-by",
          "",
        );
        await expect(lab.locator(".p032-progress")).toContainText(
          `${count} bileşik sayı elendi`,
        );
        const marked = await grid
          .locator('[data-eliminated-by]:not([data-eliminated-by=""])')
          .evaluateAll((nodes) =>
            nodes.map((n) => ({
              n: Number(n.getAttribute("data-number")),
              factor: Number(n.getAttribute("data-eliminated-by")),
            })),
          );
        expect(marked).toHaveLength(count);
        for (const c of marked) {
          expect(c.n % c.factor).toBe(0);
          expect(c.n).toBeGreaterThan(c.factor);
        }
      }
      const primes = await grid
        .locator('[data-prime-proven="true"]')
        .evaluateAll((nodes) =>
          nodes.map((n) => Number(n.getAttribute("data-number"))),
        );
      expect(primes).toEqual([
        2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47,
      ]);
      await expect(grid.locator('[data-number="49"]')).toHaveAttribute(
        "data-eliminated-by",
        "7",
      );
      await expect(lab.locator(".p032-steps")).toContainText("15 asal sayı");
      await expect(lab.locator(".p032-insight")).toContainText(
        "2, 3, 5 ve 7 yeterlidir",
      );
      await grid.locator('[data-number="1"]').press("Enter");
      await expect(lab.locator(".p032-verdict")).toContainText(
        "1 ne asaldır ne bileşiktir",
      );
      await grid.locator('[data-number="12"]').tap();
      await lab.getByRole("button", { name: "3 × 4", exact: true }).click();
      await expect(lab.locator("svg rect")).toHaveCount(12);
      const dimensions = await lab.locator("svg").evaluate((svg) => {
        const cells = [...svg.querySelectorAll("rect")];
        return {
          rows: new Set(cells.map((c) => c.getAttribute("y"))).size,
          columns: new Set(cells.map((c) => c.getAttribute("x"))).size,
        };
      });
      expect(dimensions).toEqual({ rows: 3, columns: 4 });
      await lab
        .getByRole("button", { name: "2 × 6", exact: true })
        .press("Enter");
      await expect(lab.locator("svg rect")).toHaveCount(12);
      await expect(lab.locator(".p032-facts")).toContainText("2 × 6 = 12");
      const dimensionsOfControls = await lab
        .getByRole("button")
        .evaluateAll((nodes) =>
          nodes.map((n) => ({
            width: n.getBoundingClientRect().width,
            height: n.getBoundingClientRect().height,
          })),
        );
      for (const control of dimensionsOfControls) {
        expect(control.width).toBeGreaterThanOrEqual(43);
        expect(control.height).toBeGreaterThanOrEqual(43);
      }
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth - innerWidth,
        ),
      ).toBeLessThanOrEqual(1);
      if (profile.scale === 200) {
        await expect(grid.locator("button").first()).toHaveCSS(
          "font-size",
          "45px",
        );
        expect(
          await grid
            .locator("button")
            .first()
            .evaluate((n) => getComputedStyle(n).fontFamily),
        ).toContain("Lexend");
      }
      await expect(lab.locator(".p032-verdict")).toContainText(
        "1 ve 12 dışında da böleni vardır",
      );
      const wordFragments = await lab
        .locator(".p032-verdict")
        .evaluate((node) => {
          const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
          let current: Node | null;
          const result: number[] = [];
          while ((current = walker.nextNode()))
            for (const match of (current.textContent ?? "").matchAll(
              /[\p{L}]{2,}/gu,
            )) {
              const lines = new Map<number, number>(),
                start = match.index ?? 0;
              for (let i = start; i < start + match[0].length; i++) {
                const range = document.createRange();
                range.setStart(current, i);
                range.setEnd(current, i + 1);
                const y = Math.round(range.getBoundingClientRect().y);
                lines.set(y, (lines.get(y) ?? 0) + 1);
              }
              result.push(...lines.values());
            }
          return result;
        });
      expect(Math.min(...wordFragments)).toBeGreaterThanOrEqual(2);
      const skipBounds = async () =>
        page.locator(".skip-link").evaluate((node) => ({
          focused: document.activeElement === node,
          bottom: node.getBoundingClientRect().bottom,
          top: node.getBoundingClientRect().top,
        }));
      const beforeCapture = await skipBounds();
      expect(beforeCapture.focused).toBe(false);
      expect(beforeCapture.bottom).toBeLessThanOrEqual(0);
      const audit = await new AxeBuilder({ page })
        .include(".p032-lab")
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();
      expect(audit.violations).toEqual([]);
      await grid.screenshot({
        path: info.outputPath(`sieve50-${profile.width}.png`),
      });
      await lab
        .locator(".p032-detail")
        .screenshot({ path: info.outputPath(`factor12-${profile.width}.png`) });
      const afterCapture = await skipBounds();
      expect(afterCapture.focused).toBe(false);
      expect(afterCapture.bottom).toBeLessThanOrEqual(0);
      await info.attach("skip-link-bounds-before-after-tall-capture", {
        body: JSON.stringify({ beforeCapture, afterCapture }),
        contentType: "application/json",
      });
      await expect
        .poll(async () => (await stored(page)).explorations["p032:sieve"])
        .toMatchObject({ stage: 4, selected: 12, pair: 1 });
      expect(learning(await stored(page))).toEqual(before);
      const choices = (await stored(page)).explorations["p032:sieve"];
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
      await context.setOffline(true);
      await page.reload();
      await expect(lab.locator(".p032-facts")).toContainText("2 × 6 = 12");
      await expect(grid.locator('[data-prime-proven="true"]')).toHaveCount(15);
      expect((await stored(page)).explorations["p032:sieve"]).toEqual(choices);
      expect(learning(await stored(page))).toEqual(before);
      await page.keyboard.press("Tab");
      await expect(page.locator(".skip-link")).toBeFocused();
      await expect(page.locator(".skip-link")).toBeInViewport();
      await page.keyboard.press("Enter");
      await expect(page.locator("#main-content")).toBeFocused();
      await lab
        .getByRole("button", { name: "Önceki elek adımı", exact: true })
        .click();
      await expect(grid.locator('[data-number="49"]')).toHaveAttribute(
        "data-eliminated-by",
        "",
      );
      await expect(grid.locator('[data-prime-proven="true"]')).toHaveCount(0);
      expect(learning(await stored(page))).toEqual(before);
      expect(errors).toEqual([]);
    });
  });
}

test("Asal source lesson exposes84alternative and saves one actual independent answer offline without completing theory", async ({
  page,
  context,
}, info) => {
  test.setTimeout(90_000);
  await page.setViewportSize({ width: 1280, height: 1000 });
  await page.goto("/#/settings");
  await setThemePreference(page, "dark");
  const before = await stored(page);
  const independentRecords = (s: AppState) => {
    const { draft, ...rest } = learning(s);
    return rest;
  };
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
  await subject.locator('[data-lesson-id="tyt-mat-asal-kaynak-032"]').click();
  await expect(
    page.locator(".guide-section").first().locator(".p032-lab"),
  ).toBeVisible();
  await openWorkedExamples(page);
  const example = page.locator("details.worked-example").filter({
    has: page
      .locator("summary")
      .filter({ hasText: "84’te istenen farklı asal türlerin toplamı" }),
  });
  await example.locator("summary").click();
  await example
    .getByRole("button", { name: "Çözümün tamamını göster", exact: true })
    .click();
  await expect(example.locator(".worked-steps li")).toHaveCount(3);
  await expect(example.locator(".worked-conclusion")).toContainText(
    "Alternatif olarak 84’ün bütün pozitif bölenlerini listeleyip",
  );
  await expect(example.locator(".worked-conclusion")).toContainText("2,3,7");
  await example.screenshot({
    path: info.outputPath("asal84-alternative-visible.png"),
  });
  expect(independentRecords(await stored(page))).toEqual(
    independentRecords(before),
  );
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  await expect(page.locator(".question-meta")).toContainText("1 / 40");
  await expect(page.locator(".question-panel h2")).toHaveText(
    "1 sayısı asal ve bileşik sınıflarında nasıl değerlendirilir?",
  );
  // Independently derive the answer from the definition: the sole positive
  // divisor of1 is1, so it has neither the two distinct divisors required of
  // a prime nor the n>1 condition required of a composite. No key lookup,
  // help click, injected session or direct application handler is used.
  await page
    .locator(".answer-options")
    .getByRole("button", { name: /Ne asal ne bileşiktir\./ })
    .click();
  await page
    .getByRole("button", { name: "Cevabı kontrol et", exact: true })
    .click();
  await expect(page.locator(".feedback.correct")).toBeVisible();
  await expect
    .poll(async () => {
      const s = await stored(page);
      return (
        s.draft && {
          lessonId: s.draft.lessonId,
          index: s.draft.index,
          checked: s.draft.checked,
          hint: s.draft.hint,
          count: s.draft.responses.length,
          response: s.draft.responses[0],
        }
      );
    })
    .toMatchObject({
      lessonId: "tyt-mat-asal-kaynak-032",
      index: 0,
      checked: true,
      hint: false,
      count: 1,
      response: { correct: true, assisted: false },
    });
  const checked = await stored(page);
  expect(independentRecords(checked)).toEqual(independentRecords(before));
  expect(
    checked.topicProgress["topic-tyt-mat-asal-kaynak-032"],
  ).toBeUndefined();
  await page.locator(".question-panel").screenshot({
    path: info.outputPath("asal-first-question-independent-correct-draft.png"),
  });
  await info.attach("actual-asal-independent-draft", {
    body: JSON.stringify({
      lessonId: checked.draft!.lessonId,
      questionId: checked.draft!.responses[0].questionId,
      index: checked.draft!.index,
      selected: checked.draft!.selected,
      checked: checked.draft!.checked,
      responses: checked.draft!.responses,
      unassisted: true,
      completedSession: false,
      theoryAutoCompleted: false,
    }),
    contentType: "application/json",
  });
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
  await context.setOffline(true);
  await page.reload();
  await expect(page.locator(".feedback.correct")).toBeVisible();
  await expect(page.locator(".question-meta")).toContainText("1 / 40");
  const reopened = await stored(page);
  expect(reopened.draft).toEqual(checked.draft);
  expect(independentRecords(reopened)).toEqual(independentRecords(before));
  await page.screenshot({
    path: info.outputPath("asal-independent-answer-after-offline-reload.png"),
  });
});
