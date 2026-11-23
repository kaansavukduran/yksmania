import { expect, test } from "@playwright/test";
import { examDraftSchema } from "../../src/domain/examModel";
import { forceVelocityQuestion } from "../../src/learning/forceVelocityOptions048";
import { openCourse, prepare, storage } from "./helpers/revisedCourse";

test.use({ viewport: { width: 320, height: 850 }, reducedMotion: "reduce" });

test("görselli şıklar çevrimdışı, klavyeyle seçilebilir ve çözüm kendi sırayla açılır", async ({ page, context }, info) => {
  test.setTimeout(75_000);
  await prepare(page, true);
  await context.setOffline(true);
  await openCourse(page, { lesson: "newton", search: "Kuvvet ve Newton" });
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  for (let i = 0; i < 6; i++) {
    await page.locator(".answer-options .answer").first().click();
    await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
    await page.getByRole("button", { name: "Sonraki soru", exact: true }).click();
  }
  await expect(page.getByRole("heading", { name: /hangi hız–zaman grafiği/i })).toBeVisible();
  const options = page.locator(".answer-row.has-option-figure");
  await expect(options).toHaveCount(4);
  const third = options.nth(2);
  await expect(third.getByRole("button", { name: /Grafik III/ })).toHaveAccessibleDescription(/Başlangıçta 0, 3. saniyede 6/);
  await expect(third.getByRole("figure", { name: "Grafik III", exact: true }).getByRole("img")).toBeVisible();
  await expect(third.locator("svg text")).toHaveText(["v (m/s)", "t (s)", "0", "3", "6"]);
  await expect(page.getByRole("figure", { name: "Sabit net kuvvet", exact: true })).toHaveCount(0);
  await expect(page.getByRole("figure", { name: "Başlangıçtan son hıza", exact: true })).toHaveCount(0);
  const before = await storage(page);
  await third.getByRole("button", { name: /Grafik III/ }).press("3");
  await expect(third.getByRole("button", { name: /Grafik III/ })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "İpucu al", exact: true }).click();
  await expect(page.getByRole("figure", { name: "Sabit net kuvvet", exact: true })).toBeVisible();
  await expect(page.getByRole("figure", { name: "Başlangıçtan son hıza", exact: true })).toHaveCount(0);
  await page.getByRole("button", { name: "Adım adım çözüm", exact: true }).click();
  await page.getByRole("button", { name: "Sonraki adım", exact: true }).click();
  await expect(page.getByRole("figure", { name: "Sabit ivme", exact: true })).toBeVisible();
  await expect(page.getByRole("figure", { name: "Başlangıçtan son hıza", exact: true })).toHaveCount(0);
  await page.getByRole("button", { name: "Sonraki adım", exact: true }).click();
  await expect(page.getByRole("figure", { name: "Başlangıçtan son hıza", exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  const clipped = await options.locator("svg").evaluateAll((nodes) => nodes.flatMap((node) => {
    const { x, y, width, height } = (node as SVGSVGElement).viewBox.baseVal;
    return Array.from(node.querySelectorAll("text")).filter((label) => {
      const b = label.getBBox();
      return b.x < x || b.y < y || b.x + b.width > x + width || b.y + b.height > y + height;
    }).map((label) => label.textContent);
  }));
  expect(clipped).toEqual([]);
  const after = await storage(page);
  expect(after.sessions).toEqual(before.sessions);
  expect(after.reviews).toEqual(before.reviews);
  expect(after.draft?.helpLevel).toBe(4);
  await third.screenshot({ path: info.outputPath("grafikli-sik-320.png") });
  await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
  await expect.poll(async () => (await storage(page)).draft?.responses.at(-1)?.assisted).toBe(true);
});

test("dondurulmuş sınavda ve sonucunda her uygun grafik kendi şıkkında kalır", async ({ page, context }) => {
  await prepare(page);
  const initial = await storage(page);
  const q = forceVelocityQuestion;
  const current = {
    id: q.id, lessonId: "newton", subjectId: "tyt-fizik",
    subjectName: "Fizik", lessonTitle: "Kuvvet ve Newton yasaları",
    prompt: q.prompt.tr, options: q.options.map((option) => option.tr),
    answer: q.answer, explanation: q.explanation.tr, hint: q.hint.tr, guidance: q.guidance,
  };
  const now = new Date("2026-11-23T12:00:00Z").getTime();
  const draft = examDraftSchema.parse({
    id: "exam:visual-options048", title: "Grafik seçenekleri", kind: "branch", exam: "TYT",
    items: [current, { ...current, id: "n1", prompt: "Yedekteki başka soru metni." }],
    answers: [null, null], flagged: [], index: 0, startedAt: now, deadline: now + 600_000,
    durationSeconds: 600, mode: "learning", helpEnabled: true, helpLevels: [0, 0],
  });
  await page.evaluate((state) => new Promise<void>((resolve, reject) => {
    const open = indexedDB.open("yksmania", 2);
    open.onerror = () => reject(open.error);
    open.onsuccess = () => {
      const db = open.result;
      const transaction = db.transaction("state", "readwrite");
      transaction.objectStore("state").put(state, "current");
      transaction.oncomplete = () => { db.close(); resolve(); };
      transaction.onabort = () => { db.close(); reject(transaction.error); };
    };
  }), { ...initial, examDraft: draft });
  await context.setOffline(true);
  await page.goto("/#/exams");
  expect((await page.reload())?.fromServiceWorker()).toBe(true);
  await expect(page.locator(".exam-options .answer-option-figure")).toHaveCount(4);
  await page.getByRole("button", { name: /Grafik IV/ }).click();
  await expect.poll(async () => (await storage(page)).examDraft?.answers[0]).toBe(3);
  await page.getByRole("button", { name: "Denemeyi bitir", exact: true }).click();
  await page.getByRole("dialog").getByRole("button", { name: "Bitir ve sonucu gör", exact: true }).click();
  const results = page.locator(".exam-solution");
  await expect(results).toHaveCount(2);
  await results.first().locator("summary").click();
  await expect(results.first().locator(".answer-option-figure")).toHaveCount(4);
  await expect(results.first().locator("li").filter({ hasText: /Doğru yanıt/ }).getByRole("figure", { name: "Grafik III" })).toBeVisible();
  await expect(results.first().locator("li").filter({ hasText: /Senin yanıtın/ }).getByRole("figure", { name: "Grafik IV" })).toBeVisible();
  await results.last().locator("summary").click();
  await expect(results.last().locator(".answer-option-figure")).toHaveCount(0);
});
