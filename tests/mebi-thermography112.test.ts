import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { expect, test } from "vitest";
import { fahrenheitToCelsius } from "../src/learning/mebiThermography";
import { thermographyPhoto } from "../src/learning/sectionFigures/mebiThermographyPhoto";

test.each([[32, 0], [71.6, 22], [212, 100]])("converts %s Fahrenheit to %s Celsius", (reading, expected) => {
  expect(fahrenheitToCelsius(reading)).toBeCloseTo(expected, 10);
});

test("the study photo uses the verified CC0 thumbnail unchanged", () => {
  const bytes = readFileSync(new URL("../src/assets/thermal-camera-gallery-cc0.jpg", import.meta.url));
  expect(bytes.length).toBe(133408);
  expect(createHash("sha256").update(bytes).digest("hex")).toBe(thermographyPhoto.assetSHA256);
  expect(bytes.includes(Buffer.from("Exif\0\0"))).toBe(false);
});
