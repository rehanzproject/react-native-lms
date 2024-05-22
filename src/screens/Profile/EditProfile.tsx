import React, {useCallback, useState} from 'react';
import {View, Text, TextInput, Pressable, Image, ToastAndroid} from 'react-native';
import {Formik} from 'formik';
import {launchImageLibrary} from 'react-native-image-picker';
import {useHTTP} from '../../hooks/useHTTP';
import {EditType, ScreenProps} from '../../types';
import CustomRoute from '../../components/atoms/CustomRoute/CustomRoute.atom';

const EditProfile = ({route, navigation}: ScreenProps<'EditProfile'>) => {
  const {updateRequest} = useHTTP();
  const [imageUri, setImageUri] = useState<string>();

  const onSubmit = useCallback(async (values: EditType) => {
    try {
      const result = await updateRequest('/user/info/edit', values);
      if (!result?.data) {
        ToastAndroid.show(result?.message as string, ToastAndroid.LONG);
      }
      navigation.navigate('Profile');
    } catch (error) {
      console.log(error);
    }
  }, [updateRequest, navigation]);

  const selectImage = () => {
    launchImageLibrary({mediaType: 'photo'}, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  return (
    <View className="flex-1">
      <Formik
        initialValues={{nim: '', email: '', phone: ''}}
        onSubmit={(values) => onSubmit(values)}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View className="flex-1">
            <CustomRoute
              onPress={() => navigation.goBack()}
              text="Edit Profile"
            />
            <View className="flex justify-center w-3/4 mx-auto">
              <Pressable onPress={selectImage}>
                <Image
                  source={imageUri ? {uri: imageUri} : require('../../assets/photo.png')}
                  className="flex items-center justify-center mx-auto"
                  style={{width: 100, height: 100, borderRadius: 50}}
                />
              </Pressable>
              <View>
                <Text className="text-black text-base">Nim:</Text>
                <TextInput
                  onChangeText={handleChange('nim')}
                  onBlur={handleBlur('nim')}
                  value={values.nim}
                  placeholder="NIM"
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
