import { expect, test } from "vitest";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { studyGuide } from "../src/learning/guides";
import {
  crookesAbsorptionTitle, crookesExample, crookesGasTitle, crookesModelTitle, crookesPhotoSection,
} from "../src/learning/mebiCrookesRadiometer";
import { sectionFigures, sectionImageFigures } from "../src/learning/sectionFigures/registry";

test("the Crookes device and the gas mechanism have separate source roles", () => {
  const guide = studyGuide("isik-bilgisi")!;
  expect(guide.sections.some(section => section.title === crookesPhotoSection)).toBe(true);
  expect(guide.examples).toContainEqual(crookesExample);
  expect(sectionImageFigures.get(guide.id)?.get(crookesPhotoSection)).toMatchObject({
    figure: {
      kind: "image", width: 404, height: 526,
      assetSHA256: "cbb16e7297ca3c661f59aef2d23858e968d2cc2fe6a7f053fa273530717c7bb1",
    },
    licenceLabel: "CC BY-SA 3.0",
    credit: "Timeline",
  });
  const figures = sectionFigures[guide.id];
  for (const [step, title] of [crookesAbsorptionTitle, crookesGasTitle].entries()) {
    expect(figures[crookesModelTitle].draw(0, step)).toEqual(figures[title].draw(0, 0));
  }
  expect(studyCheatSheet("detail-131")?.examples.find(example => example.title === crookesExample.title)?.stepFigures)
    .toEqual([crookesAbsorptionTitle, crookesGasTitle]);
});
