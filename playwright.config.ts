import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  // https://playwright.dev/docs/test-reporters
  reporter: [process.env.CI ? ["github"] : ["html"], ["line"]],
  // https://playwright.dev/docs/test-configuration
  timeout: 50000,
  use: {
    headless: false,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "on-first-retry"
  },
};

export default config;
