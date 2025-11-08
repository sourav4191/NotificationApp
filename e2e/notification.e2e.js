describe('Notification Deep Link Flow', () => {
  beforeAll(async () => {
    await device.launchApp({newInstance: true});
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should open NotificationScreen after tapping the test button', async () => {
    await element(by.id('triggerNotificationBtn')).tap();

    await waitFor(element(by.id('notificationOpenedText')))
      .toBeVisible()
      .withTimeout(10000);

    await expect(element(by.text('Notification Payload'))).toBeVisible();
    await expect(element(by.text('Test Push'))).toBeVisible();
  });
});
