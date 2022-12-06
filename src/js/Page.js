const path = require("path");
const { chromium } = require("playwright-core");
const state = require("../storage/state.json");

module.exports = class Page {
  constructor() {}

  async init() {
    this.browser = await chromium.launch({
      channel: "chrome",
      headless: false,
      viewport: null
    });
    this.context = await this.browser.newContext({
      storageState: state
    });
    this.page = await this.context.newPage();
  }

  async close() {
    console.log(`${new Date().toLocaleString()} Close Browser`);
    await this.context.storageState({
      path: path.resolve(__dirname, "../storage/state.json")
    });
    this.browser.close();
  }
};
