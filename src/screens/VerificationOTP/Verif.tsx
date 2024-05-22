import React, {useCallback, useState, useEffect} from 'react';
import {Pressable, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {ScreenProps} from '../../types';
import {Formik} from 'formik';
import {useHTTP} from '../../hooks/useHTTP';
import {OTPValidation} from './validation';

function Verification({navigation}: ScreenProps<'Verification'>) {
  const {postRequest} = useHTTP();
  const [countdown, setCountdown] = useState(60); // Initial countdown value

  let intervalId: NodeJS.Timeout;
  useEffect(() => {
    if (countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [countdown]);

  const resendEmail = useCallback(async () => {
    try {
      // Add your logic to resend email here
      // For example:
      // await postRequest('/user/resend-email', { email });
      // ToastAndroid.show('Email resent successfully', ToastAndroid.SHORT);
      setCountdown(60); // Reset countdown
    } catch (error) {
      console.error('Error resending email:', error);
    }
  }, []);

  const onSubmit = useCallback(
    async (values: {code_otp: string}) => {
      try {
        // const result = await postRequest('/user/forgot-password', values);
        // if (!result?.data) {
        //   ToastAndroid.show(result?.message as string, ToastAndroid.LONG);
        // }
        navigation.navigate('ChangePassword');
      } catch (error) {
        console.error('Error submitting OTP:', error);
      }
    },
    [navigation],
  );

  return (
    <Formik
      initialValues={{code_otp: ''}}
      validationSchema={OTPValidation}
      onSubmit={(values) => onSubmit(values)}>
      {({errors, handleChange, handleBlur, handleSubmit, values}) => (
        <View className="flex-1 justify-center items-center p-4">
          <View className="flex text-center">
            <Text className="text-2xl text-black font-bold pb-8 text-center">
              You've got mail
            </Text>
            <Text className="text-black">
              We have sent the OTP verification code to your email address,
              Check your email and enter the code below.
            </Text>

            <Text className="text-black text-lg">Code OTP</Text>
            <TextInput
              onChangeText={handleChange('code_otp')}
              onBlur={handleBlur('code_otp')}
              value={values.code_otp}
              placeholderTextColor={'gray'}
              placeholder="12345"
              className="border rounded-lg text-black"
            />
            <Text className="text-black">{errors.code_otp}</Text>
            <Text className="text-black text-center">
              Didn't receive email?
            </Text>
            <Text className="text-black text-center">
              You can resend code in{' '}
              {countdown > 0 ? (
                <>
                  <Text className="text-primary-50">{countdown} s</Text>
                </>
              ) : (
                <TouchableOpacity onPress={resendEmail} className='text-center '>
                  <Text className="text-primary-50 text-center py-2">Resend</Text>
                </TouchableOpacity>
              )}
            </Text>
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

export default Verification;
