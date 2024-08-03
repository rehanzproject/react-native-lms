import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface InfoState {
  name: string;
  image: string;
  phone: string;
}

const initialState: InfoState = {
  name: '',
  image: '',
  phone: '',
};

const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    updateInfo: (state, action: PayloadAction<InfoState>) => {
      state.name = action.payload.name;
      state.image = action.payload.image;
      state.phone = action.payload.phone;
    },
    removeInfo: (state) => {
      state.name = '';
      state.image = '';
      state.phone = '';
    },
  },
});

export default infoSlice;
