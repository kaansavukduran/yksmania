import { expect, test } from "vitest";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { studyGuide } from "../src/learning/guides";
import {
  clearRayTitle, diffuseRayTitle, lightTransmissionExample, lightTransmissionSection, opaqueRayTitle, transmissionTitle,
} from "../src/learning/mebiLightTransmission";
import { sectionFigures, sectionPhotoGroups } from "../src/learning/sectionFigures/registry";

test("the source material rows, photos and worked ray diagrams stay paired", () => {
  const guide = studyGuide("golge-yari-golge")!;
  expect(guide.sections[0]).toEqual(lightTransmissionSection);
  expect(guide.examples[0]).toEqual(lightTransmissionExample);
  expect(sectionPhotoGroups[guide.id]?.[transmissionTitle].photos.map(({ figure, licenceLabel }) => [figure.title, licenceLabel])).toEqual([
    ["Saydam pencere camı", "CC BY-SA 4.0"], ["Buzlu pencere camı", undefined], ["Opak metal levha", "CC BY-SA 3.0"],
  ]);
  const figures = sectionFigures[guide.id];
  const titles = [clearRayTitle, diffuseRayTitle, opaqueRayTitle];
  for (const [step, title] of titles.entries()) {
    expect(figures[transmissionTitle].draw(0, step)).toEqual(figures[title].draw(0, 0));
  }
  expect(studyCheatSheet("detail-132")?.examples[0].stepFigures).toEqual(titles);
});
