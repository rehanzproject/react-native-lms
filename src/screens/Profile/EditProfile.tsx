import {View, Text, TextInput, Pressable, Image} from 'react-native';
import React, {useCallback} from 'react';
import {Formik} from 'formik';
import {useHTTP} from '../../hooks/useHTTP';
import {EditType, ScreenProps} from '../../types';
import CustomRoute from '../../components/atoms/CustomRoute/CustomRoute.atom';

const EditProfile = ({route, navigation}: ScreenProps<'EditProfile'>) => {
  const {postRequest} = useHTTP();
  const onSubmit = useCallback(async (values: EditType) => {
   try {
    
    // const result = await postRequest('/login', values);
    // if (!result?.data) {
    //   ToastAndroid.show(result?.message as string, ToastAndroid.LONG);
    // }
    navigation.navigate('Profile');
   } catch (error) {
    console.log(error);
    
   }
   
  }, []);
  return (
    <Formik
      initialValues={{nim: '', email: '', phone: '', confirmPassword: ''}}
      onSubmit={(values) => onSubmit(values)}>
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <View className="">
          <CustomRoute onPress={() => navigation.goBack()} text='Edit Profile' />
          <View className="flex justify-center w-3/4 mx-auto">
            <Image
              source={require('../../assets/photo.png')}
              className="flex items-center justify-center mx-auto"
            />
            <View>
            <Text>Nim:</Text>
            <TextInput
              onChangeText={handleChange('nim')}
              onBlur={handleBlur('nim')}
              value={values.nim}
              placeholder="nim"
              className="border rounded-lg"
            />
            <Text>Email:</Text>
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="email"
              className="border rounded-lg"
            />
            <Text>Phone :</Text>
            <TextInput
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
              secureTextEntry
              className="border rounded-lg"
            />
            <Text>Confirm Password:</Text>
            <TextInput
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              secureTextEntry
              className="border rounded-lg"
            />
            <Pressable
              onPress={() => handleSubmit()}
              className="fixed bottom-0 rounded-lg bg-primary-50 my-2 py-2">
              <Text className="text-center text-white">Save Changes</Text>
            </Pressable>
            </View>
           
          </View>
        </View>
      )}
    </Formik>
  );
};

export default EditProfile;
