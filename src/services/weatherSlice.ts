import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {WeatherResponse, AppError} from '../utils/types';

interface WeatherState {
  data: WeatherResponse | null;
  loading: boolean;
  error: AppError | null;
}

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    fetchStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess(state, action: PayloadAction<WeatherResponse>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchFailure(state, action: PayloadAction<AppError>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {fetchStart, fetchSuccess, fetchFailure} = weatherSlice.actions;
export default weatherSlice.reducer;
