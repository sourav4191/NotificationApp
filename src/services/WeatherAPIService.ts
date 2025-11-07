import axios, {AxiosResponse} from 'axios';
import {WeatherResponse, Location, AppError} from '../utils/types';
import {
  API_ENDPOINTS,
  WEATHER_API_KEY,
  TEMPERATURE_UNITS,
} from '../utils/constants';

class WeatherAPIService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;

    axios.interceptors.response.use(
      response => response,
      error => {
        console.error('API Error:', error);
        return Promise.reject(this.handleAPIError(error));
      },
    );
  }

  private handleAPIError(error: any): AppError {
    if (error.response) {
      const {status, data} = error.response;
      switch (status) {
        case 401:
          return {message: 'Invalid API key.', code: 'INVALID_API_KEY'};
        case 404:
          return {message: 'Location not found.', code: 'LOCATION_NOT_FOUND'};
        case 429:
          return {message: 'Rate limit exceeded.', code: 'RATE_LIMIT_EXCEEDED'};
        default:
          return {
            message: data.message || 'Service unavailable.',
            code: 'API_ERROR',
          };
      }
    } else if (error.request) {
      return {message: 'No internet connection.', code: 'NETWORK_ERROR'};
    } else {
      return {message: 'Unexpected error.', code: 'UNKNOWN_ERROR'};
    }
  }

  async getCurrentWeather(
    location: Location,
    units: string = TEMPERATURE_UNITS.CELSIUS,
    language: string = 'en',
  ): Promise<WeatherResponse> {
    const response: AxiosResponse<WeatherResponse> = await axios.get(
      API_ENDPOINTS.CURRENT_WEATHER,
      {
        params: {
          lat: location.latitude,
          lon: location.longitude,
          appid: this.apiKey,
          units,
          lang: language,
        },
        timeout: 10000,
      },
    );
    return response.data;
  }

  async getCurrentWeatherByCity(
    cityName: string,
    units: string = TEMPERATURE_UNITS.CELSIUS,
    language: string = 'en',
  ): Promise<WeatherResponse> {
    const response: AxiosResponse<WeatherResponse> = await axios.get(
      API_ENDPOINTS.CURRENT_WEATHER,
      {
        params: {q: cityName, appid: this.apiKey, units, lang: language},
        timeout: 10000,
      },
    );
    return response.data;
  }
}

export const weatherAPI = new WeatherAPIService(WEATHER_API_KEY);
