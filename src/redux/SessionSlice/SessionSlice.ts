import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SessionState {
  token: string;
}

const initialState: SessionState = {
  token: '',
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = '';
    },
  },
});

export default sessionSlice
