import {AxiosResponse} from 'axios';
import {ToastAndroid} from 'react-native';
interface IResponse {
  message: string;
  data: any;
  code: number;
}
export const checkStatusCode = (result: AxiosResponse<IResponse>) => {
  switch (result.status) {
    case 200:
      return result.data;
    case 201:
      return result.data;
    case 400:
      ToastAndroid.show(result.data.message, ToastAndroid.LONG);
      break;
    case 401:
      ToastAndroid.show(result.data.message, ToastAndroid.LONG);
      break;
    case 404:
      ToastAndroid.show(result.data.message, ToastAndroid.LONG);
      break;
    case 500:
      ToastAndroid.show(result.data.message, ToastAndroid.LONG);
      break;
    default:
      ToastAndroid.show(result.data.message, ToastAndroid.LONG);
      break;
  }
};
