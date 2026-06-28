const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(60000);

Before(async function () {
  await this.launchBrowser();
});

After(async function () {
  await this.closeBrowser();
});

After(async function (scenario) {
  if (scenario.result.status === 'FAILED') {
    const screenshot = await this.page.screenshot({ path: `src/reports/screenshots/${Date.now()}.png`, fullPage: true });
    this.attach(screenshot, 'image/png');
  }
});