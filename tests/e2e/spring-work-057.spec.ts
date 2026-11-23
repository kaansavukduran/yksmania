import { expect, test } from "@playwright/test";
import { forge026PhysicsLessons } from "../../src/learning/forge026Physics";
import { springWorkQuestionId } from "../../src/learning/springWork057";
import { prepare, storage } from "./helpers/revisedCourse";

const lesson = forge026PhysicsLessons.find((item) => item.id === "enerji-ve-hareket-ileri")!;
test.use({ viewport: { width: 320, height: 850 }, reducedMotion: "reduce" });

test("sıkışmış yayın geometrisi, geri çağıran ok ve enerji hesabı çevrimdışı açılır", async ({ page, context }, info) => {
  test.setTimeout(90_000);
  await prepare(page, true);
  const initial = await storage(page);
  await context.setOffline(true);
  await page.getByRole("button", { name: "Menüyü aç", exact: true }).press("Enter");
  await page.locator(".sidebar").getByRole("button", { name: "Sorular", exact: true }).press("Enter");
  await page.getByRole("textbox", { name: "Ders veya konu ara", exact: true }).fill("Enerji ve hareket");
  await page.locator(`.ready-topic[data-lesson-id="${lesson.id}"]`).click();
  const target = lesson.questions.findIndex((question) => question.id === springWorkQuestionId);
  expect(target).toBe(8);
  const answers = page.locator(".answer-options .answer");
  const check = page.getByRole("button", { name: "Cevabı kontrol et", exact: true });
  for (const question of lesson.questions.slice(0, target)) {
    await answers.nth((question.answer + 1) % question.options.length).click();
    await check.click();
    await page.getByRole("button", { name: "Sonraki soru", exact: true }).click();
  }

  const drawing = (name: string) => page.getByRole("figure", { name, exact: true });
  const stem = drawing("Doğal boy ve sıkışmış yay");
  const hint = drawing("Sıkışan uç ile doğal boyu karşılaştır");
  const force = drawing("Kuvvet doğal boya doğru");
  const energy = drawing("Sapmayı karesine yükselt");
  const comparison = drawing("Yön ve enerji aynı işareti taşımaz");
  const help = page.locator(".question-help");
  await expect(stem.getByRole("img")).toHaveAccessibleDescription(/0,20 metre solunda/);
  await expect(stem.locator("svg text")).toHaveText(["k = 100 N/m", "Doğal boy", "x = −0,20 m", "+x sağa"]);
  await expect(hint).toHaveCount(0);
  await expect(force).toHaveCount(0);
  await page.getByRole("button", { name: "İpucu al", exact: true }).press("Enter");
  await expect(hint.getByRole("img")).toBeVisible();
  await expect(help).not.toContainText(/(?:20\s*N|2\s*J)/);
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(1);
  await page.getByRole("button", { name: "Adım adım çözüm", exact: true }).press("Enter");

  const stepAfter = async (current: number) => {
    await expect(help.locator(".help-rail button[aria-current='step']")).toHaveAccessibleName(`Adım ${current}`);
    await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(current);
    const next = help.getByRole("button", { name: "Sonraki adım", exact: true });
    await expect(next).toBeEnabled();
    await next.press("Enter");
  };
  await stepAfter(2);
  await expect(force.getByRole("img")).toHaveAccessibleDescription(/20 newton sağa/);
  await force.screenshot({ path: info.outputPath("sikismis-yay-cozum-320.png") });
  for (const diagram of [stem, force]) {
    const clipped = await diagram.locator("svg").evaluate((node: SVGSVGElement) => {
      const frame = node.viewBox.baseVal;
      return Array.from(node.querySelectorAll("text")).flatMap((label) => {
        const ink = label.getBBox();
        const fits = ink.x >= frame.x && ink.y >= frame.y &&
          ink.x + ink.width <= frame.x + frame.width &&
          ink.y + ink.height <= frame.y + frame.height;
        return fits ? [] : [{ text: label.textContent, x: ink.x, y: ink.y, width: ink.width, height: ink.height }];
      });
    });
    expect(clipped).toEqual([]);
  }
  await expect(energy).toHaveCount(0);
  await stepAfter(3);
  await expect(energy.getByRole("math")).toHaveAccessibleName(/2 joule/);
  await expect(comparison).toHaveCount(0);
  await stepAfter(4);
  await expect(comparison.getByRole("rowheader")).toHaveText(["−0,20 m", "+0,20 m"]);
  await expect(comparison.getByRole("cell")).toHaveText(["+20 N", "2 J", "−20 N", "2 J"]);
  await answers.nth(lesson.questions[target].answer).click();
  await check.click();
  await expect.poll(async () => (await storage(page)).draft?.responses[target]).toMatchObject({
    questionId: springWorkQuestionId,
    correct: true,
    assisted: true,
    visibleFigureRevision: expect.stringMatching(/^[0-9a-f]{14}$/),
    solutionFigureRevision: expect.stringMatching(/^[0-9a-f]{14}$/),
  });

  const after = await storage(page);
  expect(after.sessions).toEqual(initial.sessions);
  expect(after.reviews).toEqual(initial.reviews);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});
