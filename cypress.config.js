const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',

    setupNodeEvents(on, config) {
      return config;
    },
  },

  // ✅ ADD THIS PART
  reporter: 'mochawesome',

  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true,
  },

  // ✅ OPTIONAL (GOOD PRACTICE)
  video: true,
  screenshotOnRunFailure: true,
});