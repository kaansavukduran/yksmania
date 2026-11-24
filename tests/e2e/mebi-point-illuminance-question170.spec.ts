import { expect, test } from "@playwright/test";
import { forge012PhysicsLessons } from "../../src/learning/forge012Physics";
import { pointIlluminanceQuestion, pointIlluminanceQuestionFigures } from "../../src/learning/pointIlluminanceQuestion170";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("the two receivers, hint and worked visuals survive offline reload and wrong-answer review", async ({ page, context }, info) => {
  test.setTimeout(90_000);
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  await context.setOffline(true);
  const lessonId = "isik-bilgisi";
  await openCourse(page, { lesson: lessonId, search: "Işık bilgisi" });
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  const earlier = forge012PhysicsLessons.find(({ id }) => id === lessonId)!.questions;
  for (const { answer } of earlier) {
    await page.locator(".answer-options .answer").nth(answer).click();
    await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
    await page.getByRole("button", { name: "Sonraki soru", exact: true }).click();
  }
  await expect(page.locator(".question-meta")).toContainText(`Soru ${earlier.length + 1} / ${earlier.length + 1}`);
  await expect(page.locator(".question-meta")).toContainText("Özgün öğretim soruları");
  const { figure, hintFigure, stepFigures } = pointIlluminanceQuestionFigures;
  const findFigure = (title: string) => page.getByRole("figure", { name: title, exact: true });
  const stem = findFigure(figure.title);
  const hint = findFigure(hintFigure.title);
  const [geometry, table] = stepFigures.map(({ title }) => findFigure(title));
  await expect(stem.getByRole("img")).toHaveAccessibleDescription(/80 cd.*4 m.*3 m/);
  await expect(stem.getByRole("img")).toHaveText(/80 cd/);
  await expect(hint).toHaveCount(0);
  await expect(geometry).toHaveCount(0);
  await expect(table).toHaveCount(0);

  const audit = async (title: string, screenshot: string) => {
    const drawing = findFigure(title).getByRole("img");
    await drawing.evaluate(node => node.scrollIntoView({ block: "center" }));
    const report = await page.evaluate(svgLayoutAudit, { scope: `figure[aria-label="${title}"]` });
    expect(report.issues).toEqual([]);
    await drawing.screenshot({ path: info.outputPath(screenshot) });
  };
  await audit(figure.title, "point-illuminance170-stem.png");
  const before = await storage(page);
  await page.getByRole("button", { name: "İpucu al", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(1);
  await expect(hint.getByRole("img")).toHaveAccessibleDescription(/duvara diktir/);
  await expect(hint).not.toContainText(/64\/125|2,56|5 lx/);
  await audit(hintFigure.title, "point-illuminance170-hint.png");

  await page.getByRole("button", { name: "Adım adım çözüm", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(2);
  const next = page.getByRole("button", { name: "Sonraki adım", exact: true });
  await next.press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(3);
  await expect(geometry.getByRole("img")).toHaveAccessibleDescription(/5 m hipotenüsü/);
  await audit(stepFigures[0].title, "point-illuminance170-distance.png");
  await expect(table).toHaveCount(0);
  await next.press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(4);
  await expect(table.getByRole("row", { name: "A 5 m 4/5 2,56 lx", exact: true })).toBeVisible();
  expect(learning({ ...(await storage(page)), draft: before.draft })).toEqual(learning(before));

  await page.reload();
  await expect(table.getByRole("row", { name: "B 4 m 1 5 lx", exact: true })).toBeVisible();
  await page.locator(".answer-options .answer").nth(1).click();
  await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
  await page.getByRole("button", { name: "Çalışmayı kaydet", exact: true }).click();
  await expect(page.locator(".result-page")).toBeVisible();
  const result = (await storage(page)).sessions.at(-1)!.responses.at(-1)!;
  expect(result).toMatchObject({ questionId: pointIlluminanceQuestion.id, selected: 1, correct: false, assisted: true });
  expect(result.visibleFigureRevision).toMatch(/^[a-f0-9]{14}$/);
  expect(result.solutionFigureRevision).toMatch(/^[a-f0-9]{14}$/);
  await page.getByRole("button", { name: "Menüyü aç", exact: true }).press("Enter");
  await page.locator(".sidebar").getByRole("button", { name: "Yanlışlarım", exact: true }).press("Enter");
  await expect(page.locator(".mistake-card").filter({ has: stem }).getByRole("img")).toHaveAccessibleDescription(/80 cd.*4 m.*3 m/);
});
