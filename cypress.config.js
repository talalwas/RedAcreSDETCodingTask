const { defineConfig } = require("cypress");

module.exports = defineConfig({
  "experimentalSessionAndOrigin":true,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
