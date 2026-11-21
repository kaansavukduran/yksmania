import { typeset } from "../../src/domain/typeset";
import { setThemePreference } from "./helpers/theme";
import { test, expect, type Page } from "@playwright/test";
import type { AppState } from "../../src/domain/model";
import oldGuides from "../fixtures/source-stage-019-extended-guides.json" with { type: "json" };
import { forge020BiologyGuideExtensions, forge020BiologyLessons } from "../../src/learning/forge020Biology";
import { expectGuideSections, guideSectionCount } from "./helpers/guidePages";

test.describe.configure({ mode: "parallel" });
test.use({ locale: "tr-TR", hasTouch: true });
async function nav(page: Page, name: string) {
  await expect(page.locator(".sidebar")).toBeAttached();
  const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page
    .locator(".sidebar")
    .getByRole("button", { name, exact: true })
    .click();
}
async function state(page: Page) {
  return page.evaluate(
    () =>
      new Promise<AppState | undefined>((resolve, reject) => {
        const r = indexedDB.open("yksmania");
        r.onerror = () => reject(r.error);
        r.onsuccess = () => {
          const db = r.result,
            q = db.transaction("state").objectStore("state").get("current");
          q.onsuccess = () => {
            db.close();
            resolve(q.result);
          };
          q.onerror = () => {
            db.close();
            reject(q.error);
          };
        };
      }),
  );
}
function learning(s: AppState | undefined) {
  return {
    sessions: s?.sessions ?? [],
    reviews: s?.reviews ?? [],
    topicProgress: s?.topicProgress ?? {},
    theoryReviewCompletions: s?.theoryReviewCompletions ?? [],
    unlocked: s?.unlocked ?? [],
  };
}
const extensions = forge020BiologyGuideExtensions;
const advancedIds: Record<string, string> = { "dna-eslenmesi": "dna-replikasyonu-ileri" };
const original: Record<string, {title:{tr:string};subjectId:string;topicTitle:string}> = { "dna-eslenmesi": {title:{tr:"DNA eşlenmesi: eski ve yeni zincirler"},subjectId:"ayt-biyoloji",topicTitle:"DNA Replikasyonu"} };
const newLessons=forge020BiologyLessons;
for (const extension of extensions)
  for (const phone of [false, true]) {
    test(`${extension.id}: existing teaching, additional worked examples, full sheet and advanced questions remain usable offline${phone ? " at 320px and large text" : ""}`, async ({
      page,
      context,
    }) => {
      const lesson = original[extension.id],
        advanced = newLessons.find((l) => l.id === advancedIds[extension.id])!,
        topic = { title: lesson.topicTitle },
        old = oldGuides[extension.id as keyof typeof oldGuides];
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(String(e)));
      await page.goto("/");
      await expect(
        page.getByRole("heading", { name: "Bugün", exact: true }),
      ).toBeVisible();
      if (phone) {
        await nav(page, "Ayarlar");
        await setThemePreference(page, "light");
        await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
        await page
          .getByLabel("Yalnızca yazı boyutu %", { exact: true })
          .fill("150");
        await page.setViewportSize({ width: 320, height: 844 });
        await page.emulateMedia({ reducedMotion: "reduce" });
      }
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
      const before = learning(await state(page));
      await nav(page, "Konu Anlatımı");
      const exam = lesson.subjectId.startsWith("ayt-") ? "AYT" : "TYT";
      await page.getByRole("button", { name: exam, exact: true }).click();
      await page
        .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
        .fill(lesson.title.tr);
      await page
        .locator(".ready-topic")
        .filter({ hasText: lesson.title.tr })
        .click();
      await expect(page.locator(".study-title h1")).toHaveText(lesson.title.tr);
      await expectGuideSections(page, old.sections.length + extension.sections.length);
      await expect(page.locator(".guide-section").first()).toContainText(
        old.sections[0].paragraphs[0],
      );
      const added = page.locator(".guide-section").nth(old.sections.length);
      for (const paragraph of extension.sections[0].paragraphs)
        await expect(added).toContainText(paragraph);
      const example = page.locator(".worked-example").nth(old.examples.length),
        authored = extension.examples[0];
      await example.locator("summary").click();
      await expect(example.locator(".worked-steps li")).toHaveCount(0);
      await example
        .getByRole("button", { name: "İlk adımı göster", exact: true })
        .click();
      await expect(example.locator(".worked-steps li")).toHaveCount(1);
      await expect(example.locator(".worked-steps li")).toContainText(
        authored.steps[0].explanation,
      );
      await example
        .getByRole("button", { name: "Çözümün tamamını göster", exact: true })
        .click();
      await expect(example.locator(".worked-steps li")).toHaveCount(
        authored.steps.length,
      );
      await expect(example.locator(".worked-conclusion")).toContainText(
        authored.answer,
      );
      await expect(example.locator(".worked-conclusion")).toContainText(
        authored.pitfall,
      );
      expect(learning(await state(page))).toEqual(before);
      await nav(page, "Kopya Kağıtları");
      await page.getByRole("button", { name: exam, exact: true }).click();
      await page
        .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
        .fill(topic.title);
      await page
        .locator(".cheatsheet-topic")
        .filter({ hasText: topic.title })
        .click();
      await expect(page.locator(".cheat-section")).toHaveCount(
        old.sections.length + extension.sections.length,
      );
      const sheetAdded = page
        .locator(".cheat-section")
        .nth(old.sections.length);
      for (const paragraph of extension.sections[0].paragraphs)
        await expect(sheetAdded).toContainText(paragraph);
      await expect(page.locator('input[type="file"]')).toHaveCount(0);
      await nav(page, "Sorular");
      await page.getByRole("button", { name: exam, exact: true }).click();
      await page
        .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
        .fill(advanced.title.tr);
      await page
        .locator(".ready-topic")
        .filter({ hasText: advanced.title.tr })
        .click();
      await expect(page.locator(".question-meta")).toContainText("Soru 1 / 10");
      const q = advanced.questions[0];
      await expect(page.locator(".question-panel h2")).toHaveText(typeset(q.prompt.tr));
      if (q.passage)
        await expect(page.locator(".question-passage")).toHaveText(
          typeset(q.passage.tr),
        );
      await page.locator(".answer").nth(q.answer).click();
      await page
        .getByRole("button", { name: "Cevabı kontrol et", exact: true })
        .click();
      await expect(page.locator(".feedback p")).toHaveText(typeset(q.explanation.tr));
      await expect
        .poll(async () => (await state(page))?.draft?.checked)
        .toBe(true);
      const saved = (await state(page))?.draft;
      expect(saved?.lessonId).toBe(advanced.id);
      await page.reload();
      await expect(page.locator(".feedback p")).toHaveText(typeset(q.explanation.tr));
      expect((await state(page))?.draft).toEqual(saved);
      expect(learning(await state(page))).toEqual(before);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      expect(errors).toEqual([]);
    });
  }
