import axios, {AxiosRequestConfig, AxiosError} from 'axios';
import {useSelector} from 'react-redux';
import {ImageType, SessionType} from '../types';
import {ToastAndroid} from 'react-native';
import { useEffect, useState } from 'react';

export const useHTTP = () => {
  const tokenFromState = useSelector((state: SessionType) => state.session.token);
  const [token, setToken] = useState(tokenFromState);

  useEffect(() => {
    setToken(tokenFromState);
  }, [tokenFromState]);
 
  const API_URL = 'https://89e2-36-71-68-163.ngrok-free.app/api/v1';
  // Handle and process errors
  const processError = (error: any) => {
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error('Server Error:', error.response.data);
      ToastAndroid.show(
        'Server Error: ' + error.response.data.message,
        ToastAndroid.SHORT,
      );
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network Error:', error.request);
      ToastAndroid.show(
        'Network Error: Please check your connection.',
        ToastAndroid.SHORT,
      );
    } else {
      // Something else happened
      console.error('Error:', error.message);
      ToastAndroid.show('Error: ' + error.message, ToastAndroid.SHORT);
    }
  };

  // Request functions...
  const addPicture = async (url: string, value: ImageType) => {
    try {
      const config: AxiosRequestConfig = {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      formData.append('file', {
        uri: value.uri,
        type: value.type,
        name: value.fileName,
      });
      const result = await axios.post(`${API_URL}${url}`, formData, config);
      return result.data;
    } catch (error) {
      processError(error as AxiosError);
      throw error;
    }
  };

  const loginRequest = async (
    url: string,
    value: {email: string; password: string},
  ) => {
    try {
      const result = await axios.post(`${API_URL}${url}`, value);
      return result.data;
    } catch (error) {
      processError(error as AxiosError);
      throw error;
    }
  };

  const getRequest = async (url: string ) => {
    try {
      const config: AxiosRequestConfig = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const result = await axios.get(`${API_URL}${url}`, config);
      return result.data;
    } catch (error) {
      processError(error as AxiosError);
      throw error;
    }
  };

  const postRequest = async (url: string, value?: any)  => {
    try {
      const config: AxiosRequestConfig = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const result = await axios.post(`${API_URL}${url}`, value, config);
      return result.data;
    } catch (error) {
      processError(error as AxiosError);
      throw error;
    }
  };

  const updateRequest = async (url: string, value: any, ) => {
    try {
      const config: AxiosRequestConfig = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const result = await axios.post(`${API_URL}${url}`, value, config);
      return result.data;
    } catch (error) {
      processError(error as AxiosError);
      throw error;
    }
  };

  const deleteRequest = async (url: string, ) => {
    try {
      const config: AxiosRequestConfig = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const result = await axios.delete(`${API_URL}${url}`, config);
      return result.data;
    } catch (error) {
      processError(error as AxiosError);
      throw error;
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
