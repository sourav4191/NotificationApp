import {configureStore} from '@reduxjs/toolkit';
import notificationReducer from '../services/notificationSlice';
import apiReducer from '../api/apiSlice';
import weatherReducer from '../services/weatherSlice';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    notifications: notificationReducer,
    api: apiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
