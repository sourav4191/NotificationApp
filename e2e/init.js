const {detox} = require('detox');

beforeAll(async () => {
  await detox.init(undefined, {launchApp: true, deviceLaunchTimeout: 120000});
}, 180000); // give enough time for emulator

afterAll(async () => {
  try {
    await detox.cleanup();
  } catch (err) {
    console.warn('Detox cleanup warning:', err.message);
  }
});
