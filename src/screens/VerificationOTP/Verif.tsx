import React, { useCallback, useState, useEffect } from 'react';
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { ScreenProps } from '../../types';
import { Formik } from 'formik';
import { useHTTP } from '../../hooks/useHTTP';
import { OTPValidation } from './validation';
import {
  widthPercentageToDP as wd,
  heightPercentageToDP as hd,
} from 'react-native-responsive-screen';
import { useToken } from '../../redux/SessionSlice/useSessionSelector';

function Verification({ navigation }: ScreenProps<'Verification'>) {
  const token = useToken()
  const { postRequest } = useHTTP(token);
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
    async (values: { code_otp: string }) => {
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
    [navigation]
  );

  return (
    <Formik
      initialValues={{ code_otp: '' }}
      validationSchema={OTPValidation}
      onSubmit={(values) => onSubmit(values)}
    >
      {({ errors, handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>You've got mail</Text>
            <Text style={styles.instructionText}>
              We have sent the OTP verification code to your email address,
              Check your email and enter the code below.
            </Text>
            <Text style={styles.label}>Code OTP</Text>
            <TextInput
              onChangeText={handleChange('code_otp')}
              onBlur={handleBlur('code_otp')}
              value={values.code_otp}
              placeholderTextColor={'gray'}
              placeholder="12345"
              style={styles.input}
            />
            {errors.code_otp && (
              <Text style={styles.errorText}>{errors.code_otp}</Text>
            )}
            <Text style={styles.resendText}>
              Didn't receive email?
            </Text>
            <Text style={styles.resendText}>
              You can resend code in{' '}
              {countdown > 0 ? (
                <Text style={styles.countdownText}>{countdown} s</Text>
              ) : (
                <TouchableOpacity onPress={resendEmail}>
                  <Text style={styles.resendButton}>Resend</Text>
                </TouchableOpacity>
              )}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable onPress={()=>handleSubmit()} style={styles.continueButton}>
              <Text style={styles.continueButtonText}>Continue</Text>
            </Pressable>
          </View>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wd(4), // 4% of the screen width
  },
  innerContainer: {
    width: '100%',
    padding: wd(4), // 4% of the screen width
  },
  title: {
    fontSize: wd(6), // 6% of the screen width
    color: 'black',
    fontWeight: 'bold',
    paddingBottom: hd(2), // 2% of the screen height
    textAlign: 'center',
  },
  instructionText: {
    fontSize: wd(4), // 4% of the screen width
    color: 'black',
    textAlign: 'center',
    marginBottom: hd(2), // 2% of the screen height
  },
  label: {
    fontSize: wd(4.5), // 4.5% of the screen width
    color: 'black',
    marginBottom: hd(1), // 1% of the screen height
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    padding: wd(4), // 4% of the screen width
    fontSize: wd(4), // 4% of the screen width
    color: 'black',
    marginBottom: hd(2), // 2% of the screen height
  },
  errorText: {
    color: 'red',
    fontSize: wd(3.5), // 3.5% of the screen width
    marginBottom: hd(1), // 1% of the screen height
  },
  resendText: {
    fontSize: wd(4), // 4% of the screen width
    color: 'black',
    textAlign: 'center',
  },
  countdownText: {
    color: '#0D6EFD',
    fontSize: wd(4), // 4% of the screen width
  },
  resendButton: {
    color: '#0D6EFD',
    fontSize: wd(4), // 4% of the screen width
    textAlign: 'center',
    paddingVertical: hd(1), // 1% of the screen height
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: wd(8), // 8% of the screen width
    position: 'absolute',
    bottom: hd(4), // 4% of the screen height
  },
  continueButton: {
    backgroundColor: '#0D6EFD',
    paddingVertical: hd(2), // 2% of the screen height
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: wd(4.5), // 4.5% of the screen width
  },
});

export default Verification;
