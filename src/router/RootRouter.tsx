import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import Login from '../screens/Login/Login';
import Register from '../screens/Register/Register';
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword';
import LandingPage from '../screens/LandingPage/LandingPage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile/Profile';
import History from '../screens/History/History';
import MyCourse from '../screens/MyCourse/MyCourse';
import MyTabBar from './MyTabBar';
import EditProfile from '../screens/Profile/EditProfile';
import DetailCourse from '../screens/Course/DetailCourse/DetailCourse';
import BuyCourse from '../screens/Course/BuyCourse/BuyCourse';
import CompleteCourse from '../screens/MyCourse/CompleteCourse';
import Lesson from '../screens/Lesson/Lesson';
import Quiz from '../screens/Lesson/Quiz';
import FinalTask from '../screens/Lesson/FinalTask';
import Home from '../screens/Home/Home';
import Certificate from '../screens/Certificate/Certificate';
import AllCourse from '../screens/Course/AllCourse/AllCourse';
import DetailLesson from '../screens/Course/DetailCourse/DetailLesson';
import Help from '../screens/Help/Help';
import Search from '../screens/Search/Search';
import ChangePassword from '../screens/ChangePassword/ChangePassword';
import Verification from '../screens/VerificationOTP/Verif';
import Material from '../screens/Material/Material';
import DownloadCertificate from '../screens/Certificate/DownloadCertificate';
function TabBar() {
  const Tab = createBottomTabNavigator<RootStackParamList>();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="MyCourse" component={MyCourse} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
function RootRouter() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="LandingPage"
      >
        <Stack.Screen name="TabBar" component={TabBar} />
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Help" component={Help} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="Verification" component={Verification} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="DetailCourse" component={DetailCourse} />
        <Stack.Screen name="DetailLesson" component={DetailLesson} />
        <Stack.Screen name="AllCourse" component={AllCourse} />
        <Stack.Screen name="BuyCourse" component={BuyCourse} />
        <Stack.Screen name="CompleteCourse" component={CompleteCourse} />
        <Stack.Screen name="Certificate" component={Certificate} />
        <Stack.Screen name="Lesson" component={Lesson} />
        <Stack.Screen name="Quiz" component={Quiz} />
        <Stack.Screen name="FinalTask" component={FinalTask} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Material" component={Material} />
        <Stack.Screen name="DownloadCertificate" component={DownloadCertificate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default RootRouter;
