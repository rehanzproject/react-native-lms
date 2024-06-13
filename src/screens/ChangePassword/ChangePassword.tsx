import React, { useCallback, useState } from 'react';
import {
  Image,
  Pressable,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { ScreenProps } from '../../types';
import { Formik } from 'formik';
import { useHTTP } from '../../hooks/useHTTP';
import { useDispatch } from 'react-redux';
import sessionSlice from '../../redux/SessionSlice/SessionSlice';
import { ChangePasswordSchema } from './validation';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wd,
  heightPercentageToDP as hd,
} from 'react-native-responsive-screen';
import { useToken } from '../../redux/SessionSlice/useSessionSelector';

function ChangePassword({ navigation }: ScreenProps<'ChangePassword'>) {
  const token = useToken()
  const { postRequest } = useHTTP(token);
  const [handleModal, setHandleModal] = useState(false);
  const onSubmit = useCallback(
    async (values: { password: string }) => {
      try {
        // const result = await postRequest('/user/login', values);
        // if (!result?.data) {
        //   ToastAndroid.show(result?.message as string, ToastAndroid.LONG);
        // }
        setHandleModal(!handleModal);
      } catch (error) {
        console.log(error);
      }
    },
    []
  );
  return (
    <Formik
      initialValues={{ password: '', confirmPassword: '' }}
      validationSchema={ChangePasswordSchema}
      onSubmit={(values) => onSubmit(values)}
    >
      {({ errors, handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>Create new password</Text>
            <Text style={styles.instructionText}>
              We have sent the OTP verification code to your email address,
              Check your email and enter the code below.
            </Text>
            <Text style={styles.labelText}>Create a new Password:</Text>
            <TextInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
              placeholder="**********"
              placeholderTextColor={'gray'}
              style={styles.input}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <Text style={styles.labelText}>Confirm a new Password:</Text>
            <TextInput
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              secureTextEntry
              placeholder="**********"
              placeholderTextColor={'gray'}
              style={styles.input}
            />
            {errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}
          </View>
          <Pressable
            onPress={() => handleSubmit()}
            style={styles.continueButton}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </Pressable>
          <Modal isVisible={handleModal}>
            <Pressable
              onPress={() => setHandleModal(!handleModal)}
              style={styles.modalContainer}
            >
              <View style={styles.modalContent}>
                <Image source={require('../../assets/centang.png')} />
                <Text style={styles.modalTitle}>Successful</Text>
                <Text style={styles.modalText}>
                  You have successfully reset and created a new password.
                </Text>
                <Pressable
                  onPress={() => navigation.navigate('TabBar')}
                  style={styles.modalButton}
                >
                  <Text style={styles.modalButtonText}>Go to Home</Text>
                </Pressable>
              </View>
            </Pressable>
          </Modal>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: wd(4), // 4% of the screen width
  },
  innerContainer: {
    width: '100%',
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
  labelText: {
    fontSize: wd(4), // 4% of the screen width
    color: 'black',
    paddingVertical: hd(1), // 1% of the screen height
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
  continueButton: {
    backgroundColor: '#0D6EFD',
    paddingVertical: hd(2), // 2% of the screen height
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: hd(4), // 4% of the screen height
    width: wd(96), // 96% of the screen width
    marginLeft: wd(2), // 2% of the screen width
  },
  continueButtonText: {
    color: 'white',
    fontSize: wd(4.5), // 4.5% of the screen width
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: hd(40), // 40% of the screen height
  },
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: hd(3), // 3% of the screen height
  },
  modalTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: wd(6), // 6% of the screen width
  },
  modalText: {
    color: 'black',
    fontSize: wd(4), // 4% of the screen width
    textAlign: 'center',
  },
  modalButton: {
    paddingVertical: hd(2), // 2% of the screen height
    paddingHorizontal: wd(20), // 20% of the screen width
    backgroundColor: '#0D6EFD',
    borderRadius: 8,
  },
  modalButtonText: {
    color: 'white',
    fontSize: wd(4), // 4% of the screen width
  },
});

export default ChangePassword;
