const { setWorldConstructor, World ,setDefaultTimeout} = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('@playwright/test');
const playwrightConfig = require('../../playwright.config');
const LoginPage = require('../pages/LoginPage');

class CustomWorld extends World {
  constructor(options) {
    super(options);

    this.browser = null;
    this.context = null;
    this.page = null;
    this.browserType = process.env.BROWSER || 'chromium';

    this.baseURL = playwrightConfig.use.baseURL;
    this.headless = playwrightConfig.use.headless;
    this.viewport = playwrightConfig.use.viewport;
    this.actionTimeout = playwrightConfig.use.actionTimeout;
  }

  async launchBrowser() {
    const browserMap = { chromium, firefox, webkit };

    const browserLauncher = browserMap[this.browserType];

    if (!browserLauncher) {
      throw new Error(`Unsupported browser: ${this.browserType}`);
    }

    this.browser = await browserLauncher.launch({
      headless: false,
    });

    this.context = await this.browser.newContext({
      viewport: this.viewport
    });

    this.page = await this.context.newPage();
    this.page.setDefaultTimeout(this.actionTimeout);
    this.page.setDefaultNavigationTimeout(this.actionTimeout);

    // ✅ SAFE INIT OF PAGE OBJECTS
    this.pages={
        loginPage:new LoginPage(this.page)
    }
    await this.page.goto(this.baseURL,{waitUntil:'domcontentloaded'});
  }

  async closeBrowser() {
    await this.page?.close();
    await this.context?.close();
    await this.browser?.close();
  }
}

setWorldConstructor(CustomWorld);

module.exports = CustomWorld;