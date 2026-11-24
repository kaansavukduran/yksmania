import { expect, type Locator } from "@playwright/test";

export async function setRange(lab: Locator, label: string, target: number) {
  const slider = lab.getByRole("slider", { name: label, exact: true });
  const [min, max, step, current] = await slider.evaluate((input: HTMLInputElement) =>
    [Number(input.min), Number(input.max), Number(input.step || 1), input.valueAsNumber],
  );
  const start = [
    { at: current, key: "" },
    { at: min, key: "Home" },
    { at: max, key: "End" },
  ].sort((a, b) => Math.abs(a.at - target) - Math.abs(b.at - target))[0];
  let value = start.at;
  if (start.key) await slider.press(start.key);

  // Use the browser's coarse range key before fine arrow steps. Read the
  // resulting value because browser range increments can differ.
  const coarseStep = Math.round((max - min) / (10 * step)) * step;
  while (coarseStep > step && Math.abs(target - value) > coarseStep / 2) {
    await slider.press(target > value ? "PageUp" : "PageDown");
    const next = Number(await slider.inputValue());
    const closer = Math.abs(target - next) < Math.abs(target - value);
    value = next;
    if (!closer) break;
  }
  const arrow = target > value ? "ArrowRight" : "ArrowLeft";
  const remainingSteps = Math.round(Math.abs(target - value) / step);
  for (let index = 0; index < remainingSteps; index++) {
    await slider.press(arrow);
  }
  await expect(slider).toHaveValue(String(target));
}
