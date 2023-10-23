import React from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {ScreenProps} from '../../types';
import {Formik} from 'formik';
import {RegisterSchema} from './constant';

function Register({navigation}: ScreenProps<'Register'>) {
  return (
    <Formik
      initialValues={{nim: '', email: '', password: '', confirmPassword: ''}}
      validationSchema={RegisterSchema}
      onSubmit={(values) => console.log(values)}>
      {({errors, handleChange, handleBlur, handleSubmit, values}) => (
        <View>
          <View className="p-8">
            <Text className="text-2xl text-black font-bold">Sign Up</Text>
            <Text>Nim</Text>
            <TextInput
              onChangeText={handleChange('nim')}
              onBlur={handleBlur('nim')}
              value={values.nim}
              placeholder="eg: 20232053"
              className="border rounded-lg"
            />
            <Text>{errors.nim}</Text>
            <Text>Email:</Text>
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="contoh@gmail.com"
              className="border rounded-lg"
            />
            <Text>{errors.email}</Text>
            <Text>Password :</Text>
            <TextInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder="*********"
              secureTextEntry
              className="border rounded-lg"
            />
            <Text>{errors.password}</Text>
            <Text>Confim Password:</Text>
            <TextInput
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              placeholder="*********"
              secureTextEntry
              className="border rounded-lg"
            />
            <Text>{errors.confirmPassword}</Text>
            <Pressable
              onPress={() => handleSubmit()}
              className="rounded-lg bg-primary-50 my-4 py-2">
              <Text className="text-center text-white">Submit</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('Login')}
              className="rounded-lg border my-4 py-2">
              <Text className="text-center text-primary-50">
                Already have an account ,Sign In
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </Formik>
  );
}

export default Register;
