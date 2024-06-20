import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  Image,
  Pressable,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {ScreenProps} from '../../types';
import {Formik} from 'formik';
import {useHTTP} from '../../hooks/useHTTP';
import {LoginSchema} from './constant';
import HandIcon from '../../components/atoms/Icons/HandIcon';
import {useDispatch} from 'react-redux';
import sessionSlice from '../../redux/SessionSlice/SessionSlice';

import {
  widthPercentageToDP as wd,
  heightPercentageToDP as hd,
} from 'react-native-responsive-screen';
import {useToken} from '../../redux/SessionSlice/useSessionSelector';
import {useFocusEffect} from '@react-navigation/native';
function Login({navigation}: ScreenProps<'Login'>) {
  const token = useToken();
  const {loginRequest} = useHTTP(token);
  const [handleModal, setHandleModal] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    async (values: {email: string; password: string}) => {
      try {
        const result = await loginRequest('/user/login', values);
        if (!result?.data) {
          ToastAndroid.show(result?.message as string, ToastAndroid.LONG);
        }
        dispatch(sessionSlice.actions.updateToken(result?.data));
        navigation.navigate('TabBar');
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch, loginRequest, navigation],
  );

  return (
    <Formik
      initialValues={{email: '', password: ''}}
      validationSchema={LoginSchema}
      onSubmit={(values) => onSubmit(values)}>
      {({errors, handleChange, handleBlur, handleSubmit, values}) => (
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.title}>Hello There</Text>
              <HandIcon />
            </View>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="email"
              placeholderTextColor="gray"
              style={styles.input}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <Text style={styles.label}>Password :</Text>
            <TextInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder="*******"
              secureTextEntry
              placeholderTextColor="gray"
              style={styles.input}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <View style={styles.footerContainer}>
              <Pressable
                onPress={() => handleSubmit()}
                style={styles.signInButton}>
                <Text style={styles.signInButtonText}>Sign In</Text>
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate('Register')}
                style={styles.signUpButton}>
                <Text style={styles.signUpButtonText}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: wd(1), // 8% of the screen width
  },
  innerContainer: {
    padding: wd(8), // 8% of the screen width
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: hd(4), // 4% of the screen height
  },
  title: {
    fontSize: wd(6), // 6% of the screen width
    color: 'black',
    fontWeight: 'bold',
  },
  label: {
    fontSize: wd(4.5), // 4.5% of the screen width
    color: 'black',
    marginBottom: hd(1), // 1% of the screen height
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
  footerContainer: {
    paddingTop: hd(8), // 8% of the screen height
  },
  forgotPassword: {
    paddingBottom: hd(2), // 2% of the screen height
  },
  forgotPasswordText: {
    fontSize: wd(4.5), // 4.5% of the screen width
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  signInButton: {
    backgroundColor: '#0D6EFD',
    paddingVertical: hd(2), // 2% of the screen height
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hd(2), // 2% of the screen height
  },
  signInButtonText: {
    color: 'white',
    fontSize: wd(4.5), // 4.5% of the screen width
  },
  signUpButton: {
    borderWidth: 1,
    borderColor: '#0D6EFD',
    paddingVertical: hd(2), // 2% of the screen height
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButtonText: {
    fontSize: wd(4), // 4.5% of the screen width
    color: '#0D6EFD',
  },
});

export default Login;
