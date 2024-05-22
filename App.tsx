import React from 'react';
import RootRouter from './src/router/RootRouter';
import {Provider} from 'react-redux';
import store from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <RootRouter />
    </Provider>
  );
}
