const config = require("./config.js");
const Page = require("./Page.js");

(async () => {
  "use strict";

  try {
    const {} = config;
    const page = new Page();

    await page.init();

    await page.close();
  } catch (error) {
    console.error(error);
  }
})();
