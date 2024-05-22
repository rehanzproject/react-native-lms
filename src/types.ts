import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
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
  AllCourse: undefined | {search: string};
  DetailLesson: undefined;
  Search: undefined;
  DetailCourse: undefined | {id: string};
  BuyCourse: undefined | {id: string; price: number; coupon: string};
  ChangePassword: undefined;
  Verification: undefined;

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
}
export interface IDataCourse {
  data?: DataCourse[];
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home', undefined>;
}
type DataCourse = {
  name: string;
  price: number;
  image: string;
  rating: number;
};
export interface SessionType {
  session: {
    token: string;
  };
}
export interface InfoType {
  info: {
    name: string;
    image: string;
  };
}

export interface HistoryItem {
  invoice: string;
  name: string;
  price: number;
  success: boolean;
  paid: string;
  payment_method: string; // Assuming payment_method is a string, you can change it accordingly
}
export interface CourseItem {
  course_id: string;
  name: string;
  thumbnail: string;
  description: string;
  price: number;
  rating1?: number;
  rating2?: number;
  rating3?: number;
  rating4?: number;
  rating5?: number;
  modules: Array<{module_id: string; name: string}>;
}
