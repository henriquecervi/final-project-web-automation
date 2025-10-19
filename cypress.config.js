const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://automationexercise.com',
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    reporter: ['mochawesome', 'junit'],
    reporterOptions: {
      mochawesome: {
        reportDir: 'cypress/reports',
        overwrite: false,
        html: true,
        json: true,
        timestamp: 'mmddyyyy_HHMMss'
      },
      junit: {
        outputDir: 'cypress/reports',
        outputFileFormat: 'junit-[hash].xml'
      }
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
