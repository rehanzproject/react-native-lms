import React, {useCallback, useState} from 'react';
import {
  Button,
  Image,
  Pressable,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import {ScreenProps} from '../../types';
import {Formik} from 'formik';
import {RegisterSchema} from './constant';
import HandIcon from '../../components/atoms/Icons/HandIcon';
import Modal from 'react-native-modal';
import {useDispatch} from 'react-redux';
import sessionSlice from '../../redux/SessionSlice/SessionSlice';
import {useHTTP} from '../../hooks/useHTTP';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
function Register({navigation}: ScreenProps<'Register'>) {
  const [handleModal, setHandleModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const {postRequest} = useHTTP();

  const handleClick = useCallback(
    async (values: {
      nim: string;
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    }) => {
      try {
        const result = await postRequest('/user/register', values);
        if (!result?.data) {
          ToastAndroid.show(result?.message as string, ToastAndroid.LONG);
        }
        dispatch(sessionSlice.actions.updateToken(result?.data));
        setHandleModal(!handleModal);
      } catch (error) {
        console.log(error);
      }
    },
    [],
  );

  return (
    <Formik
      initialValues={{
        nim: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={RegisterSchema}
      onSubmit={(values) => handleClick(values)}>
      {({errors, handleChange, handleBlur, handleSubmit, values}) => (
        <View>
          <View className="p-12 justify-center">
            <View className="flex flex-row ">
              <Text className="text-2xl text-black font-bold pr-4 pb-8">
                Sign Up
              </Text>
              <HandIcon />
            </View>

            <Text className="text-black text-lg">Nim</Text>
            <TextInput
              onChangeText={handleChange('nim')}
              onBlur={handleBlur('nim')}
              value={values.nim}
              placeholder="eg: 20232053"
              placeholderTextColor={'gray'}
              className="border rounded-lg text-black"
            />
            <Text className="text-black">{errors.nim}</Text>
            <Text className="text-black text-lg">Name:</Text>
            <TextInput
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              placeholderTextColor={'gray'}
              placeholder="eg: Academade"
              className="border rounded-lg text-black"
            />
            <Text className="text-black">{errors.name}</Text>
            <Text className="text-black text-lg">Email:</Text>
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholderTextColor={'gray'}
              placeholder="contoh@gmail.com"
              className="border rounded-lg text-black"
            />
            <Text className="text-black">{errors.email}</Text>
            <Text className="text-black text-lg">Password :</Text>
            <TextInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder="*********"
              placeholderTextColor={'gray'}
              secureTextEntry
              className="border rounded-lg text-black"
            />
            <Text className="text-black">{errors.password}</Text>
            <Text className="text-black text-lg">Confim Password:</Text>
            <TextInput
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              placeholder="*********"
              placeholderTextColor={'gray'}
              secureTextEntry
              className="border rounded-lg text-black"
            />
            <Text className="text-black">{errors.confirmPassword}</Text>
            <Pressable
              onPress={() => handleSubmit()}
              className="rounded-lg bg-primary-50 my-4 py-2 text-lg">
              <Text className="text-center text-white text-base">Submit</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('Login')}
              className="rounded-lg border my-4 py-2">
              <Text className="text-center text-primary-50 text-base">
                Already have an account ,Sign In
              </Text>
            </Pressable>
          </View>
          <Modal isVisible={handleModal}>
            <View className="flex justify-center items-center bg-white h-2/5">
              <Image source={require('../../assets/centang.png')} />
              <Text className="text-black font-extrabold text-2xl">
                Successful
              </Text>
              <Pressable
                onPress={() => navigation.navigate('Login')}
                style={{
                  paddingVertical: hp(2),
                  paddingHorizontal: wp(10),
                  backgroundColor: '#0D6EFD',
                  borderRadius: 10,
                }}>
                <Text style={{color: 'white'}}>Go to Login</Text>
              </Pressable>
            </View>
          </Modal>
        </View>
      )}
    </Formik>
  );
}

export default Register;
