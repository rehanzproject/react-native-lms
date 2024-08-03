import React from 'react';
import RootRouter from './src/router/RootRouter';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import messaging from '@react-native-firebase/messaging';

export default function App() {
  // Request user permission for notifications (iOS)
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      getFcmToken(); // Get the FCM token
    }
  }

  // Get the device token
  async function getFcmToken() {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('Your Firebase Token is:', fcmToken);
      // Save the token to your server or database
    } else {
      console.log('Failed to get the Firebase Token');
    }
  }

  // Call this function in your app's initialization
  requestUserPermission();

  return (
    <Provider store={store}>
      <RootRouter />
    </Provider>
  );
}
