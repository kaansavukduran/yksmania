import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL: process.env.BASE_URL || "http://127.0.0.1:4173",
    headless: true,
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || undefined,
    },
  },
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: "npm run preview -- --port 4173 --strictPort",
        url: "http://127.0.0.1:4173",
        // An unrelated old preview must never count as this build's QA.
        // Use BASE_URL explicitly when testing an already running server.
        reuseExistingServer: false,
      },
  reporter: [["list"], ["html", { open: "never" }]],
});
