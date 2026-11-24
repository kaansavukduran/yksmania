import { expect, test } from "@playwright/test";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const questions = [
  {
    lesson: "mol", search: "Mol kavramı", prompt: "Molar kütlesi 18 g/mol",
    stem: "Su örneğinin verilenleri", hint: "Kütle ve molar kütleyi ilişkilendir",
    solution: "Gramları sadeleştir", solutionKind: "math", answer: /2 mol/,
    given: /18 g\/mol/, checkLevel: 4,
  },
  {
    lesson: "dunya-sekli-hareket", search: "Dünya’nın şekli", prompt: "İdeal yerel öğlede enlem",
    stem: "Öğle kesitinde verilen iki enlem", hint: "Ekvatoru işaret sınırı olarak oku",
    solution: "Ufuktan Güneş’e ölçülen yükseklik", solutionKind: "img", answer: /31,5°/,
    given: /23,5°/, checkLevel: 5,
  },
] as const;

for (const question of questions) {
  test(`${question.lesson} gösterir, yardımın erişim sırasını ve çevrimdışı kaydını korur`, async ({ page, context }, info) => {
    await page.setViewportSize({ width: 320, height: 880 });
    await prepare(page, true);
    await context.setOffline(true);
    await openCourse(page, question);
    await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
    await expect(page.locator(".question-prompt")).toContainText(question.prompt);
    const stem = page.getByRole("figure", { name: question.stem, exact: true });
    const hint = page.getByRole("figure", { name: question.hint, exact: true });
    const solved = page.getByRole("figure", { name: question.solution, exact: true });
    await expect(stem).toContainText(question.given);
    await expect(stem).not.toContainText(question.answer);
    await expect(hint).toHaveCount(0);
    await expect(solved).toHaveCount(0);
    await stem.screenshot({ path: info.outputPath(`${question.lesson}-stem.png`) });
    const before = await storage(page);
    await page.getByRole("button", { name: "İpucu al", exact: true }).press("Enter");
    await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(1);
    await expect(hint).toBeVisible();
    await expect(hint).not.toContainText(question.answer);
    await expect(solved).toHaveCount(0);
    await page.getByRole("button", { name: "Adım adım çözüm", exact: true }).press("Enter");
    await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(2);
    for (let level = 3; level <= question.checkLevel; level++) {
      await page.getByRole("button", { name: "Sonraki adım", exact: true }).press("Enter");
      await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(level);
    }
    await expect(solved.getByRole(question.solutionKind)).toBeVisible();
    await expect(solved).toContainText(question.answer);
    expect(learning({ ...(await storage(page)), draft: before.draft })).toEqual(learning(before));
    await page.reload();
    await expect(solved.getByRole(question.solutionKind)).toBeVisible();
    await solved.screenshot({ path: info.outputPath(`${question.lesson}-solution.png`) });
    if (question.solutionKind === "img") {
      const report = await page.evaluate(svgLayoutAudit, { scope: ".question-panel figure.source-question-figure" });
      expect(report.issues).toEqual([]);
    }
  });
}
