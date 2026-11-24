import { expect, test } from "@playwright/test";
import { geometryFoundation031Lessons } from "../../src/learning/geometryFoundation031";
import { rightTriangleQuestionFigures } from "../../src/learning/rightTriangleQuestionFigures";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("the ten existing right triangle cards render their own figures and still save offline", async ({ page, context }, info) => {
  test.setTimeout(120_000);
  await page.setViewportSize({ width: 320, height: 880 });
  await prepare(page, true);
  await context.setOffline(true);
  const lesson = geometryFoundation031Lessons.find(({ id }) => id === "tyt-geo-dik-ucgen-031")!;
  await openCourse(page, { lesson: lesson.id, search: "Dik üçgen" });
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  const issues = [];
  for (const [index, question] of lesson.questions.entries()) {
    const visuals = rightTriangleQuestionFigures[index];
    const figure = page.getByRole("figure", { name: visuals.figure.title, exact: true });
    const image = figure.getByRole("img");
    await expect(image).toHaveAccessibleDescription(visuals.figure.alt);
    await expect(image).toBeVisible();
    const report = await page.evaluate(svgLayoutAudit, { scope: `figure[aria-label="${visuals.figure.title}"]` });
    issues.push(...report.issues.map((issue) => ({ ...issue, card: index + 1 })));
    if (index === 0) {
      await image.screenshot({ path: info.outputPath("right-triangle-question.png") });
      await expect(image).toHaveText(/7 cm.*24 cm.*BC = \?/);
      await expect(figure).not.toContainText("25 cm");
      const before = await storage(page);
      await page.getByRole("button", { name: "İpucu al", exact: true }).press("Enter");
      await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(1);
      await expect(page.getByRole("figure", { name: visuals.hintFigure.title, exact: true })).not.toContainText("25 cm");
      await page.getByRole("button", { name: "Adım adım çözüm", exact: true }).press("Enter");
      await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(2);
      const next = page.getByRole("button", { name: "Sonraki adım", exact: true });
      for (const level of [3, 4, 5]) {
        await next.press("Enter");
        await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(level);
      }
      const solved = page.getByRole("figure", { name: "Sonucu şekle yerleştir", exact: true });
      await expect(solved.getByRole("img")).toHaveAccessibleDescription("BC = 25 cm");
      expect(learning({ ...(await storage(page)), draft: before.draft })).toEqual(learning(before));
      await page.reload();
      await expect(solved.getByRole("img")).toBeVisible();
    }
    if (index === 2) {
      const choices = page.locator(".answer-option-figure");
      await expect(choices).toHaveCount(5);
      await expect(choices.nth(2).getByRole("img")).toHaveAccessibleDescription(/8, 15 ve 17 santimetre/);
    }
    const chosen = index === 0 ? 0 : question.answer;
    await page.locator(".answer-options .answer").nth(chosen).click();
    await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
    if (index < 9) await page.getByRole("button", { name: "Sonraki soru", exact: true }).click();
  }
  await page.getByRole("button", { name: "Çalışmayı kaydet", exact: true }).click();
  await expect(page.locator(".result-page")).toBeVisible();
  const answers = (await storage(page)).sessions.at(-1)!.responses;
  expect(answers).toHaveLength(10);
  expect(answers[0]).toMatchObject({ questionId: lesson.questions[0].id, correct: false, assisted: true });
  for (const answer of answers) expect(answer.visibleFigureRevision).toMatch(/^[a-f0-9]{14}$/);
  expect(issues).toEqual([]);
});

test("the 7–24 card displays the diagram immediately in the default dark theme", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 1280, height: 960 });
  await prepare(page);
  await context.setOffline(true);
  await openCourse(page, { lesson: "tyt-geo-dik-ucgen-031", search: "Dik üçgen" });
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  const panel = page.locator(".question-panel");
  await expect(panel.locator(".question-prompt")).toContainText("AB=7 cm ve AC=24 cm");
  const image = panel.getByRole("img", { name: "7 ve 24 cm’lik dik kenarlar" });
  await expect(image).toBeVisible();
  await expect(image).toHaveAccessibleDescription(/AB 7 cm, AC 24 cm/);
  await panel.screenshot({ path: info.outputPath("right-triangle-question-desktop.png") });
});
