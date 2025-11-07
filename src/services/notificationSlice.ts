import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface NotificationState {
  token: string | null;
  payload: any | null;
}

const initialState: NotificationState = {
  token: null,
  payload: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setPayload(state, action: PayloadAction<any>) {
      state.payload = action.payload;
    },
  },
});

export const {setToken, setPayload} = notificationSlice.actions;
export default notificationSlice.reducer;
