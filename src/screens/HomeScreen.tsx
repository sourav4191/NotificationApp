import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Button, ActivityIndicator, Alert} from 'react-native';
import PushNotificationService from '../services/PushNotificationService';
import BatteryNativeModule from '../native/BatteryNativeModule';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import WeatherCard from '../components/WeatherCard';
import CitySearch from '../components/CitySearch';
import {useTheme} from '../theme/ThemeContext';
import {useThemeStyles} from '../theme/ThemeStyles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
  const [city, setCity] = useState<{
    name: string;
    lat: number;
    lon: number;
  } | null>(null);
  const [battery, setBattery] = useState<number | null>(null);
  const [storage, setStorage] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProp>();

  // Theme hook
  const {theme, toggleTheme} = useTheme();
  const styles = useThemeStyles();

  const handleCitySelect = useCallback(
    (selectedCity: {name: string; lat: number; lon: number}) => {
      setCity(selectedCity);
    },
    [],
  );

  useEffect(() => {
    initApp();
  }, []);

  const initApp = async () => {
    try {
      await PushNotificationService.getToken();
      PushNotificationService.init();

      const [bat, sto] = await Promise.all([
        BatteryNativeModule.getBatteryLevel(),
        BatteryNativeModule.getFreeStorage(),
      ]);

      setBattery(bat);
      setStorage(Math.round(sto));
    } catch (error) {
      Alert.alert('Error', 'Failed to initialize app');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
          color={theme === 'dark' ? '#fff' : '#000'}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Notification App</Text>

      <CitySearch onCitySelect={handleCitySelect} />

      <WeatherCard city={city} />

      <View style={styles.infoCard}>
        <Text style={styles.text}>Battery Level: {battery}%</Text>
        <Text style={styles.text}>Free Storage: {storage} MB</Text>
      </View>

      <View style={styles.buttonRow}>
        <Button
          title="Trigger Test Notification"
          onPress={() => PushNotificationService.triggerTestNotification()}
        />
      </View>

      <View style={styles.buttonRow}>
        <Button
          title="Go to Notification Screen"
          onPress={() =>
            navigation.navigate('Notification', {
              payload: {title: 'Manual Deep Link', id: '123'},
            })
          }
        />
      </View>

      {/* Theme Toggle Button */}
      <View style={styles.buttonRow}>
        <Button
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          onPress={toggleTheme}
          color={theme === 'dark' ? '#0A84FF' : '#007AFF'}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
