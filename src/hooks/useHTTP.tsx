import axios, {AxiosRequestConfig} from 'axios';
import {checkStatusCode} from '../helper/checkStatusCode';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useHTTP = () => {
  const token = AsyncStorage.getItem('accessToken')
  const API_URL: string = 'https://3539-180-248-25-90.ngrok-free.app/api/v1';
  const config: AxiosRequestConfig = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  
  const addPicture = async (url: string, value: unknown | null) => {
    try {
      const formData = new FormData();
      formData.append('picture', value as Blob);
      const result = await axios.post(`${API_URL}${url}`, formData, config);
      const resultData = checkStatusCode(result)
      return resultData;
    } catch (error) {
      console.error(error);
      throw new Error(`Error occurred during the request, ${error}`);
    }
  };

  const loginRequest = async (url: string, value: {email:string; password:string}) => {
    try {
      const result = await axios.post(`${API_URL}${url}`, value);
      const resultData = checkStatusCode(result);
      return resultData;
    } catch (error) {
      console.error(error);
      throw new Error('Error occurred during the request');
    }
  };

  const getRequest = async (url: string) => {
    try {
      const result = await axios.get(`${API_URL}${url}`, config);
      const resultData = checkStatusCode(result);
      return resultData;
    } catch (error) {
      console.error(error);
      throw new Error('Error occurred during the request');
    }
  };

  const postRequest = async (url: string, value: any) => {
    try {
      const result = await axios.post(`${API_URL}${url}`, value, config);
      const resultData = checkStatusCode(result);
      return resultData;
    } catch (error) {
      console.error(error);
      throw new Error('Error occurred during the request');
    }
  };

  const updateRequest = async (url: string, value: any) => {
    try {
      const result = await axios.post(`${API_URL}${url}`, value, config);
      const resultData = checkStatusCode(result);
      return resultData;
    } catch (error) {
      console.error(error);
      throw new Error('Error occurred during the request');
    }
  };
  
  const deleteRequest = async (url: string) => {
    try {
      const result = await axios.delete(`${API_URL}${url}`, config);
      const resultData = checkStatusCode(result);
      return resultData;
    } catch (error) {
      console.error(error);
      throw new Error('Error occurred during the request');
    }
  };

  return {
    getRequest,
    postRequest,
    updateRequest,
    deleteRequest,
    loginRequest,
    addPicture,
  };
};
