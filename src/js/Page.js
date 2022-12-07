const { chromium } = require("playwright-core");

module.exports = class Page {
  constructor(subdomain) {
    this.subdomain = subdomain;
  }

  async init() {
    this.browser = await chromium.launch({
      channel: "chrome",
      headless: false,
      viewport: null
    });
    this.context = await this.browser.newContext({});
    this.page = await this.context.newPage();
  }

  async login() {
    await this.page.goto(`https://${this.subdomain}.cybozu.com/k/`);
    console.log(`${new Date().toLocaleString()} Waiting Login`);
    await this.page.waitForURL(`https://${this.subdomain}.cybozu.com/k/`, {
      timeout: 1000 * 60 * 5,
      waitUntil: "domcontentloaded"
    });
  }

  async deleteApps(startId, endId) {
    for (let appId = startId; appId <= endId; appId++) {
      await this.page.goto(
        `https://${this.subdomain}.cybozu.com/k/admin/app/flow?app=${appId}#section=settings`,
        { waitUntil: "domcontentloaded" }
      );
      if (await this.page.$(".error-container-cybozu")) continue;
      await this.page.click(
        ".gaia-argoui-admin-app-flow-settings-item-deleteappitem-button"
      );
      await this.page.click(".gaia-ui-dialog-button-danger", { strict: true });
      await this.page.click(".gaia-ui-dialog-button-danger", { strict: true });
      console.log(`${new Date().toLocaleString()} Deleted App ${appId}`);
      await this.page.waitForTimeout(1000);
    }
  }

  async close() {
    console.log(`${new Date().toLocaleString()} Close Browser`);
    this.browser.close();
  }
};
