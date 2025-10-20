const { defineConfig } = require("cypress");
const allureWriter = require("allure-cypress/reporter");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://automationexercise.com',
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
  },
});
