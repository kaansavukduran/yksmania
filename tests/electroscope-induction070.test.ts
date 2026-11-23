import { expect, it } from "vitest";
import { electroscopeInduction, electroscopeTitle } from "../src/learning/electroscopeInduction070";
import { lessonGuides, studyGuide } from "../src/learning/guides";
import { builtInCheatSheets, studyCheatSheet } from "../src/learning/cheatsheetContent";
import { physicsFiguresElectrostatics } from "../src/learning/sectionFigures/physicsFiguresElectrostatics";

it("conserves total charge while the same leaves close and reopen with opposite charge", () => {
  expect([0, 1, 2, 3].map(electroscopeInduction)).toEqual([
    { knob: 1, leaves: 1, total: 2 },
    { knob: 2, leaves: 0, total: 2 },
    { knob: 3, leaves: -1, total: 2 },
    { knob: 4, leaves: -2, total: 2 },
  ]);
  const figure = physicsFiguresElectrostatics["durgun-elektrik"][electroscopeTitle];
  expect(figure.draw(1, 0).readout).toContain("Yapraklar kapalı.");
  expect(figure.draw(2, 0).readout).toContain("Yapraklar negatif işaretle yeniden açık.");
  expect(figure.draw(1, 0).readout?.[0]).toMatch(/Yaprak bölgesi 0\. Elektroskop toplamı \+2 /);
});

it("uses the exact sharing model in the lesson, separate sheet and relevant worked step", () => {
  const active = studyGuide("durgun-elektrik")!;
  const sheet = studyCheatSheet("detail-122")!;
  const sections = active.sections.filter((section) => section.title === electroscopeTitle);
  const sheetSections = sheet.sections.filter((section) => section.title === electroscopeTitle);
  const examples = sheet.examples.filter((example) => example.title === "Kapanan yapraklarla toplam yükü karşılaştır");
  expect(sections.map((section) => section.figureTitle)).toEqual([electroscopeTitle]);
  expect(sheetSections).toHaveLength(1);
  expect(sheetSections[0].table?.rows).toEqual([
    ["Uzak", "+1", "Açık"], ["Yaklaşır", "0", "Kapalı"], ["Daha yakın", "−1", "Yeniden açık"],
  ]);
  expect(examples.map((example) => example.stepFigures)).toEqual([[undefined, electroscopeTitle]]);
  expect(lessonGuides.get("durgun-elektrik")?.sections.some((section) => section.title === electroscopeTitle)).toBe(false);
  expect(builtInCheatSheets.get("detail-122")?.sections.some((section) => section.title === electroscopeTitle)).toBe(false);
});
