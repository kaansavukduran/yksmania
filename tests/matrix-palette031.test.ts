import { readFileSync } from "node:fs";
import { expect, it } from "vitest";

const css = readFileSync(new URL("../src/style.css", import.meta.url), "utf8");
const matrix = css.match(/:root\[data-theme="matrix"\]\s*\{([^}]+)\}/)![1];
const colors = Object.fromEntries(
  [...matrix.matchAll(/(--[\w-]+):\s*(#[\da-f]+);/g)].map((match) => [
    match[1],
    match[2],
  ]),
);

function channels(hex: string) {
  return [1, 3, 5].map((offset) => parseInt(hex.slice(offset, offset + 2), 16));
}
function luminance(hex: string) {
  const values = channels(hex).map((channel) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722;
}
function contrast(a: string, b: string) {
  const values = [luminance(a), luminance(b)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

it("keeps Matrix text, controls and feedback readable on each actual reading surface", () => {
  for (const surface of ["--bg", "--surface", "--surface-2", "--hover-bg"]) {
    for (const text of [
      "--text",
      "--muted",
      "--accent",
      "--mint",
      "--danger",
      "--guidance",
    ])
      expect(
        contrast(colors[text], colors[surface]),
        `${text} on ${surface}`,
      ).toBeGreaterThanOrEqual(4.5);
    expect(
      contrast(colors["--border"], colors[surface]),
      `control border on ${surface}`,
    ).toBeGreaterThanOrEqual(3);
  }
  expect(
    contrast(colors["--accent-text"], colors["--accent"]),
  ).toBeGreaterThanOrEqual(4.5);
});

it("separates green actions from red correction and amber guidance without recoloring scientific illustrations", () => {
  const [actionRed, actionGreen, actionBlue] = channels(colors["--accent"]);
  expect(actionGreen).toBeGreaterThan(actionRed);
  expect(actionGreen).toBeGreaterThan(actionBlue);
  const [repairRed, repairGreen] = channels(colors["--repair"]);
  expect(repairRed - repairGreen).toBeGreaterThan(40);
  const [guideRed, guideGreen, guideBlue] = channels(colors["--guidance"]);
  expect(guideRed).toBeGreaterThan(guideGreen);
  expect(guideGreen).toBeGreaterThan(guideBlue);
  // Matrix changes common interface tokens; subject/particle palettes retain
  // their own scientifically meaningful color distinctions.
  expect(matrix).not.toMatch(/--(?:plot|subject|particle|diagram)-/);
});
