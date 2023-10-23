import React, {useCallback, useState} from 'react';
import {
  Pressable,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScreenProps} from '../../types';
import {Formik} from 'formik';
import {useHTTP} from '../../hooks/useHTTP';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginSchema} from './constant';

function Login({navigation}: ScreenProps<'Login'>) {
  const {loginRequest} = useHTTP();
  const onSubmit = useCallback(
    async (values: {email: string; password: string}) => {
      // const result = await loginRequest('/login', values);
      // if (!result?.data) {
      //   ToastAndroid.show(result?.message as string, ToastAndroid.LONG);
      // }
      navigation.navigate('TabBar');
      // AsyncStorage.setItem('accessToken', result?.data.accessToken as string);
    },
    [],
  );
  return (
    <Formik
      initialValues={{email: '', password: ''}}
      validationSchema={LoginSchema}
      onSubmit={(values) => onSubmit(values)}>
      {({errors, handleChange, handleBlur, handleSubmit, values}) => (
        <View>
          <View className="p-8">
            <Text className="text-2xl text-black font-bold pb-8">
              Hello There
            </Text>
            <Text>Email:</Text>
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="email"
              className="border rounded-lg"
            />
            <Text>{errors.email}</Text>
            <Text>Password :</Text>
            <TextInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
              className="border rounded-lg"
            />
            <Text>{errors.password}</Text>
            <TouchableOpacity className="font-bold text-lg">
              <Text>Forgot Password?</Text>
            </TouchableOpacity>
            <Pressable
              onPress={() => handleSubmit()}
              className="rounded-lg bg-primary-50 mt-8 py-2 mb-2">
              <Text className="text-center text-white text-xs">Sign In</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('Register')}
              className="rounded-lg border py-2">
              <Text className="text-center text-xs text-primary-50">
                Didn't have an account , Sign Up
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </Formik>
  );
}

export default Login;
