/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: {
    args: {
      config: 'e2e/jest.config.js',
    },
    jest: true,
  },
  apps: {
    android: {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      build:
        'cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug && cd ..',
    },
  },
  devices: {
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_5_API_34',
      },
    },
  },
  configurations: {
    android: {
      device: 'emulator',
      app: 'android',
    },
  },
};
