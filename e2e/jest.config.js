/** @type {import('jest').Config} */
module.exports = {
  testRunner: 'jest-circus/runner',
  testEnvironment: 'detox/runners/jest/testEnvironment',
  setupFilesAfterEnv: ['./init.js'],
  globalTeardown: 'detox/runners/jest/globalTeardown.js',
  testTimeout: 180000,
  reporters: ['detox/runners/jest/reporter'],
  testMatch: ['**/*.e2e.js'],
};
