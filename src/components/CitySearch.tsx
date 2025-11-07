import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useThemeStyles} from '../theme/ThemeStyles'; // ← ADD THIS

interface City {
  id: string;
  name: string;
  state?: string;
  country: string;
  coord: {lat: number; lon: number};
}

interface Props {
  onCitySelect: (city: {name: string; lat: number; lon: number}) => void;
}

const CitySearch: React.FC<Props> = ({onCitySelect}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const styles = useThemeStyles();

  useEffect(() => {
    const loadLastCity = async () => {
      try {
        const saved = await AsyncStorage.getItem('lastCity');
        if (saved) {
          const city = JSON.parse(saved);
          setQuery(city.name);
          onCitySelect(city);
        }
      } catch (e) {
        console.warn('Failed to load last city', e);
      }
    };
    loadLastCity();
  }, [onCitySelect]);

  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    const timeout = setTimeout(() => {
      if (query.length > 2) {
        searchCities(query);
      } else {
        setSuggestions([]);
      }
    }, 500);

    debounceTimeout.current = timeout;

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [query]);

  const searchCities = async (text: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${text}&limit=5&appid=8b263b6371f464e54e4dfd1e27376da2`,
      );
      const data: any[] = await response.json();

      const cities: City[] = data.map(item => ({
        id: `${item.lat}-${item.lon}`,
        name: item.name,
        state: item.state,
        country: item.country,
        coord: {lat: item.lat, lon: item.lon},
      }));

      setSuggestions(cities);
    } catch (error) {
      Alert.alert('Error', 'Failed to search cities');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = useCallback(
    async (city: City) => {
      const displayName = `${city.name}${
        city.state ? `, ${city.state}` : ''
      }, ${city.country}`;
      setQuery(displayName);
      setSuggestions([]);
      const selected = {
        name: displayName,
        lat: city.coord.lat,
        lon: city.coord.lon,
      };
      onCitySelect(selected);
      await AsyncStorage.setItem('lastCity', JSON.stringify(selected));
    },
    [onCitySelect],
  );

  return (
    <View style={styles.container1}>
      <TextInput
        style={styles.input}
        placeholder="Search city..."
        placeholderTextColor="#888"
        value={query}
        onChangeText={setQuery}
        autoCorrect={false}
        autoCapitalize="none"
      />

      {loading && <ActivityIndicator style={styles.loader} />}

      <FlatList
        data={suggestions}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => handleSelect(item)}>
            <Text style={styles.cityName}>
              {item.name}
              {item.state ? `, ${item.state}` : ''}, {item.country}
            </Text>
          </TouchableOpacity>
        )}
        style={styles.list}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

export default CitySearch;
