import { createSlice, PayloadAction } from '@reduxjs/toolkit';

 interface InfoState {
  name: string;
  image: string;

}

const initialState: InfoState = {
  name: '',
  image: ''
};

const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    updateInfo: (state, action: PayloadAction<InfoState>) => {
      state.name = action.payload.name;
      state.image = action.payload.image;
    },
    removeInfo: (state) => {
      state.name = '';
      state.image = '';
    },
  },
});

export default infoSlice
