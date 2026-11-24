import { expect, test } from "@playwright/test";
import { forge012PhysicsLessons } from "../../src/learning/forge012Physics";
import { soundLevelQuestion, soundLevelQuestionFigures } from "../../src/learning/soundLevelQuestion148";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";

test("the decibel question keeps its scale, saved help, solution table and wrong review offline", async ({ page, context }, info) => {
  test.setTimeout(90_000);
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  await context.setOffline(true);
  const lessonId = "ses-deprem-dalgalari";
  await openCourse(page, { lesson: lessonId, search: "Ses ve deprem dalgaları" });
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  const inherited = forge012PhysicsLessons.find(({ id }) => id === lessonId)!.questions;
  expect(inherited).toHaveLength(10);
  for (const { answer } of inherited) {
    await page.locator(".answer-options .answer").nth(answer).click();
    await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
    await page.getByRole("button", { name: "Sonraki soru", exact: true }).click();
  }
  await expect(page.locator(".question-meta")).toContainText("Soru 11 / 11");
  await expect(page.locator(".question-meta")).toContainText("Özgün öğretim soruları");
  const { figure, hintFigure, stepFigures } = soundLevelQuestionFigures;
  const given = page.getByRole("figure", { name: figure.title, exact: true });
  const hint = page.getByRole("figure", { name: hintFigure.title, exact: true });
  const [difference, table] = stepFigures.map(({ title }) => page.getByRole("figure", { name: title, exact: true }));
  const saveDrawing = async (drawing: typeof given, name: string) => {
    const svg = drawing.getByRole("img");
    await expect(svg).toBeVisible();
    const layout = await svg.evaluate((element) => {
      const { width, height } = (element as unknown as SVGSVGElement).viewBox.baseVal;
      const texts = [...element.querySelectorAll("text")].map(label => ({ text: label.textContent, box: label.getBBox() }));
      const outside = texts.filter(({ box }) => box.x < 0 || box.y < 0 || box.x + box.width > width || box.y + box.height > height).map(({ text }) => text);
      const overlap = texts.flatMap(({ box: a, text }, i) => texts.slice(i + 1)
        .filter(({ box: b }) => a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y)
        .map(other => [text, other.text]));
      return { outside, overlap };
    });
    expect(layout).toEqual({ outside: [], overlap: [] });
    await svg.evaluate(node => node.scrollIntoView({ block: "center", inline: "nearest" }));
    await svg.screenshot({ path: info.outputPath(name) });
  };
  await expect(given.getByRole("img")).toHaveAccessibleDescription(/X işareti 50 dB, Y işareti 70 dB/);
  await expect(given.getByText("X", { exact: true })).toBeVisible();
  await expect(given.getByText("Y", { exact: true })).toBeVisible();
  await expect(hint).toHaveCount(0);
  await expect(difference).toHaveCount(0);
  await expect(table).toHaveCount(0);
  await saveDrawing(given, "sound-level-question148-stem.png");

  const before = await storage(page);
  await page.getByRole("button", { name: "İpucu al", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(1);
  await expect(hint.getByRole("img")).toHaveAccessibleDescription(/50 ve 60 dB.*10 dB/);
  await saveDrawing(hint, "sound-level-question148-hint.png");
  await page.getByRole("button", { name: "Adım adım çözüm", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(2);
  const next = page.getByRole("button", { name: "Sonraki adım", exact: true });
  await next.press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(3);
  await expect(difference.getByRole("img")).toHaveAccessibleDescription(/20 dB/);
  await saveDrawing(difference, "sound-level-question148-difference.png");
  await expect(table).toHaveCount(0);
  await next.press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(4);
  const ratio = table.getByRole("row", { name: "Toplam 50–70 dB 100", exact: true });
  await expect(ratio).toBeVisible();
  expect(learning({ ...(await storage(page)), draft: before.draft })).toEqual(learning(before));

  await page.reload();
  await expect(ratio).toBeVisible();
  await page.locator(".answer-options .answer").nth(2).click();
  await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
  await page.getByRole("button", { name: "Çalışmayı kaydet", exact: true }).click();
  await expect(page.locator(".result-page")).toBeVisible();
  const saved = await storage(page);
  const response = saved.sessions.at(-1)!.responses.at(-1)!;
  expect(response).toMatchObject({ questionId: soundLevelQuestion.id, selected: 2, correct: false, assisted: true });
  expect(response.visibleFigureRevision).toMatch(/^[a-f0-9]{14}$/);
  expect(response.solutionFigureRevision).toMatch(/^[a-f0-9]{14}$/);

  await page.getByRole("button", { name: "Menüyü aç", exact: true }).press("Enter");
  await page.locator(".sidebar").getByRole("button", { name: "Yanlışlarım", exact: true }).press("Enter");
  const card = page.locator(".mistake-card").filter({ has: given });
  await expect(card.getByRole("img")).toHaveAccessibleDescription(/X işareti 50 dB, Y işareti 70 dB/);
});
