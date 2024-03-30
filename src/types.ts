import {NativeStackNavigationProp, NativeStackScreenProps} from '@react-navigation/native-stack';
import {ReactNode} from 'react';

export type RootStackParamList = {
  LandingPage: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  TabBar: undefined;
  Home: undefined;
  Profile: undefined;
  History: undefined;
  Beranda: undefined;
  MyCourse: undefined;
  Certificate: undefined;
  Logout: undefined;
  Help: undefined;
  EditProfile: undefined;
  SearchCourse: undefined;
  CompleteCourse: undefined;
  Lesson: undefined;
  Quiz: undefined;
  FinalTask: undefined;
  CategoryCourse: undefined;
  AllCourse: undefined;
  DetailLesson: undefined;
  DetailCourse: undefined | {id: string};
  BuyCourse: undefined | {id: string; price: number; coupon: string};
  // Define other screens if you have them
};

export type ScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export interface ListType {
  name: string;
  route: keyof RootStackParamList;
  icon: ReactNode;
}

export interface EditType {
  nim: string;
  email: string;
  phone: string;
  confirmPassword: string;
}
export interface IDataCourse {
  data: DataCourse[];
  navigation: NativeStackNavigationProp<RootStackParamList, "Home", undefined>
}
type DataCourse = {
  name: string;
  price: number;
  image: string;
  rating: number;
};
