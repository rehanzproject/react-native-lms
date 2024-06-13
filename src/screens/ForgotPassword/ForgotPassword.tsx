import React, {useCallback} from 'react';
import {
  Pressable,
  Text,
  TextInput,
  ToastAndroid,
  View,
  StyleSheet,
} from 'react-native';
import {ScreenProps} from '../../types';
import {Formik} from 'formik';
import {useHTTP} from '../../hooks/useHTTP';
import {ForgotPasswordValidation} from './validation';
import {
  widthPercentageToDP as wd,
  heightPercentageToDP as hd,
} from 'react-native-responsive-screen';
import { useToken } from '../../redux/SessionSlice/useSessionSelector';

function ForgotPassword({navigation}: ScreenProps<'ForgotPassword'>) {
  const token = useToken();
  const {postRequest} = useHTTP(token);

  const onSubmit = useCallback(async (values: {email: string}) => {
    try {
      console.log('Submitting form with values:', values);
      const result = await postRequest('/user/forgot-password', values);
      console.log('Result from API:', result);

      if (!result?.data) {
        ToastAndroid.show(result?.message as string, ToastAndroid.LONG);
        return;
      }
    } catch (error) {
      console.error('Error in onSubmit:', error);
      ToastAndroid.show('An unexpected error occurred. Please try again.', ToastAndroid.LONG);
    }
  }, [token, navigation, postRequest]);

  return (
    <Formik
      initialValues={{email: ''}}
      validationSchema={ForgotPasswordValidation}
      onSubmit={(values) => onSubmit(values)}>
      {({errors, handleChange, handleBlur, handleSubmit, values}) => (
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.instructionText}>
              Enter your email address to get an OTP code to reset your
              password.
            </Text>

            <Text style={styles.labelText}>Email</Text>
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholderTextColor={'gray'}
              placeholder="Email:"
              style={styles.input}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>
          <View style={styles.buttonContainer}>
            <Pressable onPress={() => handleSubmit()} style={styles.button}>
              <Text style={styles.buttonText}>Continue</Text>
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
    maxWidth: wd(90), // 90% of the screen width
    alignItems: 'center',
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
    marginBottom: hd(3), // 3% of the screen height
  },
  labelText: {
    fontSize: wd(4.5), // 4.5% of the screen width
    color: 'black',
    marginBottom: hd(1), // 1% of the screen height
    textAlign: 'left',
  },
  input: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    padding: wd(3), // 3% of the screen width
    fontSize: wd(4), // 4% of the screen width
    color: 'black',
    marginBottom: hd(1), // 1% of the screen height
  },
  errorText: {
    color: 'red',
    fontSize: wd(3.5), // 3.5% of the screen width
    marginBottom: hd(1), // 1% of the screen height
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: wd(4), // 4% of the screen width
    position: 'absolute',
    bottom: hd(2), // 2% of the screen height
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: hd(1.5), // 1.5% of the screen height
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: wd(4.5), // 4.5% of the screen width
  },
});

export default ForgotPassword;
