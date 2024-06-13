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
  Lesson: undefined | {id: string; course_id: string; score?: number};
  Material: undefined | {id: string};
  Quiz: undefined | {id: string; course_id: string};
  FinalTask: undefined;
  CategoryCourse: undefined;
  AllCourse: undefined | {search: string};
  DetailLesson: undefined | {id: string};
  Search: undefined;
  DetailCourse: undefined | {id: string};
  BuyCourse: undefined | {id: string; price: number; coupon: string};
  ChangePassword: undefined;
  Verification: undefined;
  DownloadCertificate: undefined | {id: string};
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
    nim: string;
    email: string;
    phone: string;
  };
}
export interface ImageType {
  fileName?: string;
  fileSize?: number;
  height: number;
  originalPath: string;
  type: string;
  uri: string;
  width: number;
}

export interface HistoryItem {
  course: {
    course_id: string;
    invoice: string;
    name: string;
    price: number;
    paid: string;
  };
  verify: boolean;
  createdAt: string;
  updatedAt: string;
  payment_method: string;
}

export interface Course {
  coupon: string;
  course_id: string;
  name: string;
  thumbnail: string;
  description: string;
  price: number;
  rating: number;
  rating1?: number;
  rating2?: number;
  rating3?: number;
  rating4?: number;
  rating5?: number;
  modules: Array<{module_id: string; name: string}>;
}
export interface CourseItem extends Course {
  data: Course
}
export interface QuizData {
  module_id: string;
  id: string;
  data: {
    quizzes: Array<{
      question: string;
      choices: Array<{
        text: string;
        valid: boolean;
      }>;
    }>;
  };
}
