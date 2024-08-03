/**
 * @format
 */
import { AppRegistry } from 'react-native';
import App from './App';
import messaging from '@react-native-firebase/messaging';
import { name as appName } from './app.json';

// Initialize Firebase
import { firebase } from '@react-native-firebase/app';

// Set your configuration options here
// Ensure these values match your Firebase project settings
const firebaseConfig = {
    apiKey: 'AIzaSyA0dioHibp2pEudhHfg2JVKw4tPNeO8s30',
    authDomain: 'tugas-akhir-717e9.firebaseapp.com',
    projectId: 'tugas-akhir-717e9',
    storageBucket: 'tugas-akhir-717e9.appspot.com',
    messagingSenderId: '861438828886',
    appId: '1:861438828886:web:2458e223033493b1efb6f7',
  };
  
// Check if Firebase is already initialized to avoid duplicate initialization
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

AppRegistry.registerComponent(appName, () => App);
