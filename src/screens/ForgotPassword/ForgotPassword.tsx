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
import {useDispatch} from 'react-redux';
import sessionSlice from '../../redux/SessionSlice/SessionSlice';
import {ForgotPasswordValidation} from './validation';

function ForgotPassword({navigation}: ScreenProps<'ForgotPassword'>) {
  const {postRequest} = useHTTP();
  const dispatch = useDispatch();
  const onSubmit = useCallback(async (values: {email: string}) => {
    try {
      // const result = await postRequest('/user/forgot-password', values);
      // if (!result?.data) {
      //   ToastAndroid.show(result?.message as string, ToastAndroid.LONG);
      // }
      navigation.navigate('Verification');
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <Formik
      initialValues={{email: ''}}
      validationSchema={ForgotPasswordValidation}
      onSubmit={(values) => onSubmit(values)}>
      {({errors, handleChange, handleBlur, handleSubmit, values}) => (
        <View className="flex-1 justify-center items-center">
          <View className="flex text-center">
            <Text className="text-2xl text-black font-bold pb-8 text-center">
              Forgot Password
            </Text>
            <Text className="text-black">
              Enter your email, address to get an OTP code to reset you
              password.
            </Text>

            <Text className="text-black text-lg">Email</Text>
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholderTextColor={'gray'}
              placeholder="Email:"
              className="border rounded-lg text-black"
            />
            <Text className="text-black">{errors.email}</Text>
          </View>
          <View className="absolute bottom-0 w-80">
            <Pressable
              onPress={() => handleSubmit()}
              className="rounded-lg bg-primary-50 py-2 mb-2">
              <Text className="text-center text-white text-lg">Continue</Text>
            </Pressable>
          </View>
        </View>
      )}
    </Formik>
  );
}

export default ForgotPassword;
