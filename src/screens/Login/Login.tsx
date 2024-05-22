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
import {LoginSchema} from './constant';
import HandIcon from '../../components/atoms/Icons/HandIcon';
import { useDispatch } from 'react-redux';
import sessionSlice from '../../redux/SessionSlice/SessionSlice';

function Login({navigation}: ScreenProps<'Login'>) {
  const {loginRequest} = useHTTP();
  const dispatch = useDispatch()
  const onSubmit = useCallback(
    async (values: {email: string; password: string}) => {
    
    try {
      const result = await loginRequest('/user/login', values);
      if (!result?.data) {
        ToastAndroid.show(result?.message as string, ToastAndroid.LONG);
      }
      dispatch(sessionSlice.actions.updateToken(result?.data))
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
      
    }
      
    },
    [],
  );
  return (
    <Formik
      initialValues={{email: '', password: ''}}
      validationSchema={LoginSchema}
      onSubmit={(values) => onSubmit(values)}>
      {({errors, handleChange, handleBlur, handleSubmit, values}) => (
        <View className="flex-1 justify-center">
          <View className="p-8">
            <View className="flex flex-row">
              <Text className="text-2xl text-black font-bold pb-8">
                Hello There
              </Text>
              <HandIcon />
            </View>

            <Text className="text-black text-xl">Email:</Text>
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="email"
              placeholderTextColor={'gray'}
              className="border rounded-lg text-black"
            />
            <Text className="text-black">{errors.email}</Text>
            <Text className="text-black text-xl">Password :</Text>
            <TextInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder='*******'
              secureTextEntry
              placeholderTextColor={'gray'}
             
              className="border rounded-lg text-black"
            />
            <Text className="text-black">{errors.password}</Text>
         <View className='pt-16'>
         <TouchableOpacity className="pb-5" onPress={()=>navigation.navigate('ForgotPassword')}>
              <Text className='text-black mx-auto text-xl font-bold'>Forgot Password?</Text>
            </TouchableOpacity>
            <Pressable
              onPress={() => handleSubmit()}
              className="rounded-lg bg-primary-50 mt-8 py-2 mb-2">
              <Text className="text-center text-white text-lg">Sign In</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('Register')}
              className="rounded-lg border border-primary-50 py-2">
              <Text className="text-center text-lg text-primary-50">
                Didn't have an account , Sign Up
              </Text>
            </Pressable>
         </View>
          
          </View>
        </View>
      )}
    </Formik>
  );
}

export default Login;
