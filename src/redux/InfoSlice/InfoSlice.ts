import { createSlice, PayloadAction } from '@reduxjs/toolkit';

 interface InfoState {
  name: string;
  image: string;
  nim: number
  phone: number
}

const initialState: InfoState = {
  name: '',
  image: '',
  nim: 0,
  phone: 0
};

const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    updateInfo: (state, action: PayloadAction<InfoState>) => {
      state.name = action.payload.name;
      state.image = action.payload.image;
      state.nim = action.payload.nim;
      state.phone = action.payload.phone;
      
    },
    removeInfo: (state) => {
      state.name = '';
      state.image = '';
    },
  },
});

export default infoSlice
