import React, {useState} from 'react';
import {Button, Image, Pressable, Text, TextInput, View} from 'react-native';
import {ScreenProps} from '../../types';
import {Formik} from 'formik';
import {RegisterSchema} from './constant';
import HandIcon from '../../components/atoms/Icons/HandIcon';
import Modal from 'react-native-modal';

function Register({navigation}: ScreenProps<'Register'>) {
  const [handleModal, setHandleModal] = useState<boolean>(false);
  const handleClick = (values: any) => {
    setHandleModal(!handleModal);
    console.log(values);
  };
  return (
    <Formik
      initialValues={{nim: '', email: '', password: '', confirmPassword: ''}}
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
            <Pressable
              onPress={handleClick}
              className="flex justify-center items-center bg-white h-2/5">
              <View className="">
                <Image source={require('../../assets/centang.png')} />
                <Text className="text-black font-extrabold text-2xl">
                  Successful
                </Text>
              </View>
            </Pressable>
          </Modal>
        </View>
      )}
    </Formik>
  );
}

export default Register;
