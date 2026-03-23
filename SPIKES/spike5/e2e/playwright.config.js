const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: '../e2e',       // Folder where test files (.spec.js) live
  use: {
    baseURL: 'http://localhost:3000', // All page.goto('/') calls use this base
  },
});
