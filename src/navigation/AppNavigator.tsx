import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';

export type RootStackParamList = {
  Home: undefined;
  Notification: {payload: any};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Home'}}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{title: 'Notification'}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
