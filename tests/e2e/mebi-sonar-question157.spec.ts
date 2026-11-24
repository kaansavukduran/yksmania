import { expect, test } from "@playwright/test";
import { forge012PhysicsLessons } from "../../src/learning/forge012Physics";
import { sonarDistanceQuestion, sonarDistanceQuestionFigures } from "../../src/learning/sonarQuestion157";
import { soundLevelQuestion } from "../../src/learning/soundLevelQuestion148";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";

test("sonar sorusunun şekli, ipucu ve iki çözüm görseli çevrimdışı kendi sırasında açılır", async ({ page, context }, info) => {
  test.setTimeout(90_000);
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  await context.setOffline(true);
  const lessonId = "ses-deprem-dalgalari";
  await openCourse(page, { lesson: lessonId, search: "Ses ve deprem dalgaları" });
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  const inherited = forge012PhysicsLessons.find(({ id }) => id === lessonId)!.questions;
  expect(inherited).toHaveLength(10);
  for (const { answer } of [...inherited, soundLevelQuestion]) {
    await page.locator(".answer-options .answer").nth(answer).click();
    await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
    await page.getByRole("button", { name: "Sonraki soru", exact: true }).click();
  }
  await expect(page.locator(".question-meta")).toContainText("Soru 12 / 12");
  await expect(page.locator(".question-meta")).toContainText("Özgün öğretim soruları");
  const { figure, hintFigure, stepFigures } = sonarDistanceQuestionFigures;
  const given = page.getByRole("figure", { name: figure.title, exact: true });
  const hint = page.getByRole("figure", { name: hintFigure.title, exact: true });
  const [timeConversion, distanceTable] = stepFigures.map(({ title }) => page.getByRole("figure", { name: title, exact: true }));
  const drawing = given.getByRole("img");
  await expect(drawing).toHaveAccessibleDescription(/120 ms.*1\.500 m\/s/);
  await expect(drawing.getByText("120 ms", { exact: true })).toBeVisible();
  await expect(drawing.getByText("1.500 m/s", { exact: true })).toBeVisible();
  await expect(hint).toHaveCount(0);
  await expect(timeConversion).toHaveCount(0);
  await expect(distanceTable).toHaveCount(0);
  const expandDrawing = async (svg: typeof drawing, file: string) => {
    const layout = await svg.evaluate(element => {
      const { width, height } = (element as unknown as SVGSVGElement).viewBox.baseVal;
      const labels = [...element.querySelectorAll("text")].map(label => ({ text: label.textContent, box: label.getBBox() }));
      const outside = labels.filter(({ box }) => box.x < 0 || box.y < 0 || box.x + box.width > width || box.y + box.height > height).map(({ text }) => text);
      const overlap = labels.flatMap(({ box: a, text }, i) => labels.slice(i + 1)
        .filter(({ box: b }) => a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y)
        .map(other => [text, other.text]));
      return { outside, overlap };
    });
    expect(layout).toEqual({ outside: [], overlap: [] });
    await svg.evaluate(node => node.scrollIntoView({ block: "center" }));
    await svg.screenshot({ path: info.outputPath(file) });
  };
  await expandDrawing(drawing, "sonar-question157-stem.png");

  const before = await storage(page);
  await page.getByRole("button", { name: "İpucu al", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(1);
  await expect(hint.getByRole("row", { name: "Yankı başlığa geri geldi 120 ms", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Adım adım çözüm", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(2);
  const next = page.getByRole("button", { name: "Sonraki adım", exact: true });
  await next.press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(3);
  const converted = timeConversion.getByRole("img");
  await expect(converted.getByText("0,120 s", { exact: true })).toBeVisible();
  await expandDrawing(converted, "sonar-question157-time.png");
  await expect(distanceTable).toHaveCount(0);
  await next.press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(4);
  const distance = distanceTable.getByRole("row", { name: "Başlıktan sürüye 90 m", exact: true });
  await expect(distance).toBeVisible();
  expect(learning({ ...(await storage(page)), draft: before.draft })).toEqual(learning(before));

  await page.reload();
  await expect(distance).toBeVisible();
  await page.locator(".answer-options .answer").nth(2).click();
  await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
  await page.getByRole("button", { name: "Çalışmayı kaydet", exact: true }).click();
  await expect(page.locator(".result-page")).toBeVisible();
  const response = (await storage(page)).sessions.at(-1)!.responses.at(-1)!;
  expect(response).toMatchObject({ questionId: sonarDistanceQuestion.id, selected: 2, correct: false, assisted: true });
  expect(response.visibleFigureRevision).toMatch(/^[a-f0-9]{14}$/);
  expect(response.solutionFigureRevision).toMatch(/^[a-f0-9]{14}$/);

  await page.getByRole("button", { name: "Menüyü aç", exact: true }).press("Enter");
  await page.locator(".sidebar").getByRole("button", { name: "Yanlışlarım", exact: true }).press("Enter");
  await expect(page.locator(".mistake-card").filter({ has: given }).getByRole("img")).toHaveAccessibleDescription(/120 ms.*1\.500 m\/s/);
});
