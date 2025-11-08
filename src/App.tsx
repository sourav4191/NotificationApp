import React, {useEffect} from 'react';
import codePush from 'react-native-code-push';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from './theme/ThemeContext';
import AppNavigator from './navigation/AppNavigator';
import PushNotificationService from './services/PushNotificationService';
import {Provider} from 'react-redux';
import {store} from './context/store';
import {lightTheme, darkTheme} from './theme/navigationTheme';
import {useTheme} from './theme/ThemeContext';
import {navigationRef} from './navigation/RootNavigation';

const App = () => {
  useEffect(() => {
    PushNotificationService.init();

    const unsubscribe = navigationRef.addListener('state', () => {
      PushNotificationService.checkPendingNotification();
    });

    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <ThemedNavigation />
      </ThemeProvider>
    </Provider>
  );
};

const ThemedNavigation = () => {
  const {theme} = useTheme();

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={theme === 'dark' ? darkTheme : lightTheme}>
      <AppNavigator />
    </NavigationContainer>
  );
};
// ----- CodePush Integration -----
let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
};

export default codePush(codePushOptions)(App);
