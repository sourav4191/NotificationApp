import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {fetchStart, fetchSuccess, fetchFailure} from '../services/weatherSlice';
import {weatherAPI} from '../services/WeatherAPIService';
import {useThemeStyles} from '../theme/ThemeStyles';

interface Props {
  city: {name: string; lat: number; lon: number} | null;
}

const WeatherCard: React.FC<Props> = ({city}) => {
  const dispatch = useAppDispatch();
  const {data, loading, error} = useAppSelector(state => state.weather);
  const styles = useThemeStyles();

  useEffect(() => {
    if (!city) return;

    const loadWeather = async () => {
      dispatch(fetchStart());
      try {
        const weather = await weatherAPI.getCurrentWeather(
          {latitude: city.lat, longitude: city.lon},
          'metric',
        );
        dispatch(fetchSuccess(weather));
      } catch (err: any) {
        dispatch(fetchFailure(err));
      }
    };
    loadWeather();
  }, [city, dispatch]);

  if (!city) {
    return (
      <View style={styles.card}>
        <Text style={styles.hint}>Search for a city to see weather</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.card}>
        <ActivityIndicator size="small" />
        <Text style={styles.label}>Loading weather...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.card}>
        <Text style={styles.error}>{error.message}</Text>
      </View>
    );
  }

  if (!data) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{data.name}</Text>
      <Text style={styles.temp}>{Math.round(data.main.temp)}°C</Text>
      <Text style={styles.desc}>{data.weather[0].description}</Text>
      <Text style={styles.detail}>
        Feels like: {Math.round(data.main.feels_like)}°C
      </Text>
      <Text style={styles.detail}>Humidity: {data.main.humidity}%</Text>
      <Text style={styles.detail}>Wind: {data.wind.speed} m/s</Text>
    </View>
  );
};

export default WeatherCard;
