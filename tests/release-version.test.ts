import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
import pkg from "../package.json";
import lock from "../package-lock.json";
import metadata from "../public/version.json";
import { APP_VERSION } from "../src/version";
const read = (file: string) =>
  readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
const androidVersionCode = 68;

it("keeps update discovery, visible labels, lockfile and native release on the same version", () => {
  expect(metadata.version).toBe(pkg.version);
  expect(APP_VERSION).toBe(pkg.version);
  expect(lock.version).toBe(pkg.version);
  expect(lock.packages[""].version).toBe(pkg.version);
  for (const file of ["src/App.tsx", "src/i18n.ts", "src/pages/Settings.tsx"])
    expect(read(file), file).toContain("APP_VERSION");
  const android = read("android/app/build.gradle");
  expect(android.match(/versionName "([^"]+)"/)?.[1]).toBe(pkg.version);
  expect(Number(android.match(/versionCode (\d+)/)?.[1])).toBe(androidVersionCode);
  expect(read(".github/workflows/release-alpha.yml")).toContain(
    `RELEASE_VERSION: "${pkg.version}"`,
  );
  expect(read(".github/workflows/release-alpha.yml")).toContain(
    `ANDROID_VERSION_CODE: "${androidVersionCode}"`,
  );
  expect(metadata.notes.tr.length).toBeGreaterThan(100);
});
