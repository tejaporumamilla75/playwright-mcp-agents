 // @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  use: {
    // 🌐 Base URL for navigation
    baseURL: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',

    // 🧭 Run browser in headed mode
    headless: false,

    // 📐 Browser window size
    viewport: { width: 1280, height: 720 },

    // ⏱ Action timeout
    actionTimeout: 10000,

    // ⏱ Navigation timeout (important for page.goto)
    navigationTimeout: 30000,

    // 🔍 Debug tracing (use on failure)
    trace: 'on-first-retry'
  }
});