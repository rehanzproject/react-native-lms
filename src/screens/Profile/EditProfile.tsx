import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ToastAndroid,
} from 'react-native';
import {Formik} from 'formik';
import {launchImageLibrary} from 'react-native-image-picker';
import {useHTTP} from '../../hooks/useHTTP';
import {EditType, ImageType, InfoType, ScreenProps} from '../../types';
import CustomRoute from '../../components/atoms/CustomRoute/CustomRoute.atom';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {useToken} from '../../redux/SessionSlice/useSessionSelector';

const EditProfile = ({route, navigation}: ScreenProps<'EditProfile'>) => {
  const token = useToken();
  const {updateRequest, postRequest, addPicture} = useHTTP(token);

  const [imageUri, setImageUri] = useState<string>();
  const info = useSelector((state: InfoType) => state.info);

  const initialValues = {
    name: info?.name || '',
    phone: info?.phone || '',
  };

  const onSubmit = useCallback(
    async (values: {name: string; phone: string}) => {
      try {
        const result = await updateRequest('/user/info/edit', values);
        if (!result?.data) {
          ToastAndroid.show(result?.message as string, ToastAndroid.LONG);
        }
        navigation.navigate('Profile');
      } catch (error) {
        console.log(error);
      }
    },
    [updateRequest, navigation],
  );

  const selectImage = async () => {
    launchImageLibrary({mediaType: 'photo'}, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const image = response.assets[0];

        try {
          const result = await addPicture(
            '/user/upload/picture',
            image as ImageType,
          );
          if (!result?.data) {
            ToastAndroid.show(result?.message as string, ToastAndroid.LONG);
          } else {
            setImageUri(image.uri);
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <View style={{flex: 1}}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => onSubmit(values)}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View style={{flex: 1}}>
            <CustomRoute
              onPress={() => navigation.goBack()}
              text="Edit Profile"
            />
            <View
              style={{
                justifyContent: 'center',
                width: wp(75),
                alignSelf: 'center',
              }}>
              <Pressable onPress={selectImage}>
                <Image
                  source={
                    info?.image
                      ? imageUri
                        ? {uri: imageUri}
                        : {uri: info.image}
                      : require('../../assets/photo.png')
                  }
                  style={{
                    alignSelf: 'center',
                    width: wp(20),
                    height: wp(20),
                    borderRadius: wp(10),
                  }}
                />
              </Pressable>
              <View>
                <Text style={{color: 'black', fontSize: wp(4)}}>Name:</Text>
                <TextInput
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  placeholder={info.name ? String(info.name) : 'name'}
                  placeholderTextColor={'gray'}
                  style={{
                    borderWidth: 1,
                    borderRadius: wp(3),
                    color: 'black',
                    paddingHorizontal: wp(3),
                    marginTop: hp(1),
                  }}
                />
                <Text
                  style={{color: 'black', fontSize: wp(4), marginTop: hp(2)}}>
                  Phone:
                </Text>
                <TextInput
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={String(values.phone)}
                  placeholder={info.phone ? String(info.phone) : 'phone'}
                  placeholderTextColor={'gray'}
                  style={{
                    borderWidth: 1,
                    borderRadius: wp(3),
                    color: 'black',
                    paddingHorizontal: wp(3),
                    marginTop: hp(1),
                  }}
                />
                <Pressable
                  onPress={() => handleSubmit()}
                  style={{
                    marginTop: hp(8),
                    borderRadius: wp(4),
                    backgroundColor: '#0D6EFD',
                    paddingVertical: hp(1.5),
                  }}>
                  <Text style={{textAlign: 'center', color: 'white'}}>
                    Save Changes
                  </Text>
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
