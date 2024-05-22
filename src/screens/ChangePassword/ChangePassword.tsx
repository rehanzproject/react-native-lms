import React, {useCallback, useState} from 'react';
import {
  Image,
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
import HandIcon from '../../components/atoms/Icons/HandIcon';
import { useDispatch } from 'react-redux';
import sessionSlice from '../../redux/SessionSlice/SessionSlice';
import { ChangePasswordSchema } from './validation';
import Modal from 'react-native-modal';

function ChangePassword({navigation}: ScreenProps<'ChangePassword'>) {
  const {postRequest} = useHTTP();
  const [handleModal, setHandleModal] = useState(false)
  const onSubmit = useCallback(
    async (values: { password: string}) => {
    
    try {
      // const result = await postRequest('/user/login', values);
      // if (!result?.data) {
      //   ToastAndroid.show(result?.message as string, ToastAndroid.LONG);
      // }
      setHandleModal(!handleModal)
    } catch (error) {
      console.log(error);
      
    }
      
    },
    [],
  );
  return (
    <Formik
      initialValues={{password: '', confirmPassword: '',}}
      validationSchema={ChangePasswordSchema}
      onSubmit={(values) => onSubmit(values)}>
      {({errors, handleChange, handleBlur, handleSubmit, values}) => (
        <View className="flex-1 justify-center p-4">
            <View className="">
              <Text className="text-2xl text-black font-bold pb-8 text-center">
               Create new password
              </Text>
              <Text className="text-black">
              We have sent the OTP verification code to your email address,
              Check your email and enter the code below.
            </Text>

            
            <Text className="text-black text-base pt-4">Create a new Password :</Text>
            <TextInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
              placeholder='**********'
              placeholderTextColor={'gray'}
              className="border rounded-lg text-black"
            />
            <Text className="text-black">{errors.password}</Text>
            
            <Text className="text-black text-base">Confirm a new Password :</Text>
            <TextInput
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              secureTextEntry
              placeholder='**********'
              placeholderTextColor={'gray'}
              className="border rounded-lg text-black"
            />
            <Text className="text-black">{errors.confirmPassword}</Text>
          </View>
          <Pressable
              onPress={() => handleSubmit()}
              className="rounded-lg absolute bottom-0 bg-primary-50 w-96 p-2 ml-1 mb-2">
              <Text className="text-center text-white text-lg">Continue</Text>
            </Pressable>
           <Modal isVisible={handleModal}>
          <Pressable
            onPress={() => setHandleModal(!handleModal)}
            className="flex justify-center items-center bg-white h-2/5">
            <View className="flex justify-center items-center gap-3">
              <Image source={require('../../assets/centang.png')} />
              <Text className="text-black font-extrabold text-2xl">
                Successful
              </Text>
              <Text className="text-black text-base text-center">
              You have successfully reset and created a new password.
              </Text>

              <Pressable
                onPress={() => navigation.navigate('TabBar')}
                className="py-2 rounded-md px-20 bg-primary-50">
                <Text className="text-white text-c">Go to Home</Text>
              </Pressable>
            </View>
          </Pressable>
        </Modal>
        </View>
      )}
    </Formik>
  );
}

export default ChangePassword;
