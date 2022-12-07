const config = require("./config.js");
const Page = require("./Page.js");

(async () => {
  "use strict";

  try {
    const { subdomain, startId, endId } = config;
    const page = new Page(subdomain);

    await page.init();

    await page.login();
    await page.deleteApps(startId, endId);

    await page.close();
  } catch (error) {
    console.error(error);
  }
})();
