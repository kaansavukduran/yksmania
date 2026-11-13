import { _electron, expect } from "@playwright/test";
import path from "node:path";
const profile =
  process.env.YKSMANIA_TEST_PROFILE ||
  path.resolve("../work", `desktop-test-${Date.now()}`);
const binary = process.env.YKSMANIA_BINARY
  ? path.resolve(process.env.YKSMANIA_BINARY)
  : undefined;
const launch = () =>
  _electron.launch({
    ...(binary ? { executablePath: binary } : {}),
    args: [
      ...(binary ? [] : ["desktop/main.cjs"]),
      ...(process.platform === "linux"
        ? ["--no-sandbox", "--ozone-platform=headless"]
        : []),
      "--disable-gpu",
      `--user-data-dir=${profile}`,
    ],
    timeout: 20000,
  });
let app;
try {
  app = await launch();
  let page = await app.firstWindow();
  const errors = [];
  page.on("pageerror", (error) => errors.push(String(error)));
  await page.waitForSelector(".hero");
  await page.context().setOffline(true);
  await page.locator(".hero .primary").click();
  await page.locator(".lesson-article > .primary").click();
  for (const index of [1, 2, 0, 1, 1]) {
    await page.locator(".answer").nth(index).click();
    await page.locator(".question-actions .primary").click();
    await page.locator(".question-actions .primary").click();
  }
  await expect(page.locator(".result-stats")).toContainText("5/5");
  await page.screenshot({ path: path.resolve("../work/desktop-result.png") });
  await page.reload();
  await expect(page.locator(".result-stats")).toContainText("5/5");
  await app.close();
  app = await launch();
  page = await app.firstWindow();
  await page.waitForSelector(".hero");
  await expect(page.locator(".stat-number").first()).toHaveText("1");
  expect(errors).toEqual([]);
  console.log(
    JSON.stringify({
      desktop: "PASS",
      profile,
      offlineLesson: "PASS",
      reload: "PASS",
      processRestart: "PASS",
      rendererErrors: errors.length,
    }),
  );
} finally {
  await app?.close();
}
