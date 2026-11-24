import { expect, test } from "vitest";
import { bellJarCases, soundMediumTable, soundSpeedRows } from "../src/learning/mebiSoundMedium";

test("all measured medium and temperature comparisons are present with their source values", () => {
  expect(soundMediumTable.headers).toEqual(["Karşılaştırma", "Ortam ve sıcaklık", "Ses sürati (m/s)"]);
  expect(soundSpeedRows).toEqual([
    ["Sıcaklık", "Hava, 0 °C", "331"],
    ["Sıcaklık", "Hava, 20 °C", "343"],
    ["Ortam", "Hava, 0 °C", "331"],
    ["Ortam", "Demir, 0 °C", "5000"],
    ["Tuzluluk", "Su, 25 °C", "1493"],
    ["Tuzluluk", "Deniz suyu, 25 °C", "1533"],
  ]);
  expect(bellJarCases.map(({ outgoingWaves }) => outgoingWaves)).toEqual([3, 1, 0]);
  expect(bellJarCases[2].detail).toContain("Saat hâlâ titreşiyor.");
});
