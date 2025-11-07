import {Alert, PermissionsAndroid, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType, AndroidImportance} from '@notifee/react-native';
import {navigationRef} from '../navigation/RootNavigation';

// ──────────────────────────────────────────────────────────────
// 1. NOTIFEE BACKGROUND HANDLER
// ──────────────────────────────────────────────────────────────
notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;

  if (type === EventType.PRESS && pressAction?.id === 'default') {
    console.log('Notifee background press:', notification?.data);
    if (notification?.data?.screen === 'Notification') {
      pendingNotification = notification?.data;
    }
  }
});

// ──────────────────────────────────────────────────────────────
// 2. FCM BACKGROUND HANDLER
// ──────────────────────────────────────────────────────────────
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('FCM background message:', remoteMessage);
  pendingNotification = remoteMessage;
  await displayLocalNotification(remoteMessage);
});

// ──────────────────────────────────────────────────────────────
// 3. GLOBAL PENDING NOTIFICATION
// ──────────────────────────────────────────────────────────────
let pendingNotification: any = null;

// ──────────────────────────────────────────────────────────────
// 4. PERMISSION
// ──────────────────────────────────────────────────────────────
export const requestUserPermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') return true;
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    return false;
  }
};

// ──────────────────────────────────────────────────────────────
// 5. DISPLAY NOTIFICATION
// ──────────────────────────────────────────────────────────────
const displayLocalNotification = async (message: any) => {
  try {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      title: message.notification?.title ?? 'New Notification',
      body: message.notification?.body ?? 'Tap to open',
      data: message.data,
      android: {
        channelId,
        smallIcon: 'ic_launcher',
        pressAction: {id: 'default'},
        autoCancel: true,
      },
    });
  } catch (error) {
    console.warn('Notifee display error:', error);
  }
};

// ──────────────────────────────────────────────────────────────
// 6. MAIN SERVICE
// ──────────────────────────────────────────────────────────────
class PushNotificationService {
  private static _initialized = false;

  static async getToken(): Promise<string | null> {
    try {
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
      return token;
    } catch (e) {
      return null;
    }
  }

  static async init(): Promise<void> {
    if (this._initialized) return;
    this._initialized = true;

    try {
      await requestUserPermission();
      await this.getToken();

      // Foreground FCM
      messaging().onMessage(async remoteMessage => {
        console.log('Foreground FCM:', remoteMessage);
        await displayLocalNotification(remoteMessage);
      });

      // Foreground Notifee tap
      notifee.onForegroundEvent(({type, detail}) => {
        if (type === EventType.PRESS) {
          console.log('Notifee foreground press:', detail.notification?.data);
          if (detail.notification?.data?.screen === 'Notification') {
            this.handleDeepLink(detail.notification?.data);
          }
        }
      });

      // App opened from quit state
      const initial = await messaging().getInitialNotification();
      if (initial) {
        console.log('FCM quit state:', initial);
        pendingNotification = initial.data;
      }

      // Notifee initial launch
      const initialNotifee = await notifee.getInitialNotification();
      if (initialNotifee?.notification?.data?.screen === 'Notification') {
        pendingNotification = initialNotifee.notification.data;
      }

      console.log('PushNotificationService ready');
    } catch (error) {
      Alert.alert('Error', 'Failed to setup notifications.');
    }
  }

  private static handleDeepLink(data: any) {
    if (data?.screen === 'Notification') {
      if (navigationRef.isReady()) {
        navigationRef.navigate('Notification', {payload: data});
      } else {
        setTimeout(() => {
          if (navigationRef.isReady()) {
            navigationRef.navigate('Notification', {payload: data});
          }
        }, 500);
      }
    }
  }

  static async triggerTestNotification() {
    const payload = {
      notification: {
        title: 'Test Alert',
        body: 'Tap to open Notification Screen',
      },
      data: {screen: 'Notification', title: 'Test Title', id: '999'},
    };
    await displayLocalNotification(payload);
  }

  static checkPendingNotification() {
    if (pendingNotification) {
      this.handleDeepLink(pendingNotification);
      pendingNotification = null;
    }
  }
}

export default PushNotificationService;
