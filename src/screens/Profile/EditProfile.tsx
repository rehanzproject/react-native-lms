import {View, Text, TextInput, Pressable, Image} from 'react-native';
import React, {useCallback} from 'react';
import {Formik} from 'formik';
import {useHTTP} from '../../hooks/useHTTP';
import {EditType, ScreenProps} from '../../types';
import CustomRoute from '../../components/atoms/CustomRoute/CustomRoute.atom';

const EditProfile = ({route, navigation}: ScreenProps<'EditProfile'>) => {
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
    <View className="flex-1">
      <Formik
        initialValues={{nim: '', email: '', phone: '', confirmPassword: ''}}
        onSubmit={(values) => onSubmit(values)}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View className="flex-1">
            <CustomRoute
              onPress={() => navigation.goBack()}
              text="Edit Profile"
            />
            <View className="flex justify-center w-3/4 mx-auto">
              <Image
                source={require('../../assets/photo.png')}
                className="flex items-center justify-center mx-auto"
              />
              <View>
                <Text className="text-black text-base">Nim:</Text>
                <TextInput
                  onChangeText={handleChange('nim')}
                  onBlur={handleBlur('nim')}
                  value={values.nim}
                  placeholder="NiM"
                  placeholderTextColor={'gray'}
                  className="border rounded-lg text-black "
                />
                <Text className="text-black text-base pt-4">Email:</Text>
                <TextInput
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  placeholder="Email"
                  placeholderTextColor={'gray'}
                  className="border rounded-lg text-black"
                />
                <Text className="text-black text-base pt-4">Phone :</Text>
                <TextInput
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  placeholder="Confirm Phone"
                  placeholderTextColor={'gray'}
                  className="border rounded-lg text-black"
                />
                <Text className="text-black text-base pt-4">
                  Confirm Password:
                </Text>
                <TextInput
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  secureTextEntry
                  placeholderTextColor={'gray'}
                  className="border rounded-lg text-black"
                />

                <Pressable
                  onPress={() => handleSubmit()}
                  className="mt-48 rounded-md p-2 bg-primary-50 w-full">
                  <Text className="text-center text-white">Save Changes</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default EditProfile;
