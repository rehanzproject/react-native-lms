import React, {useCallback, useState} from 'react';
import {
  Button,
  Image,
  Pressable,
  ScrollView,
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
import {useToken} from '../../redux/SessionSlice/useSessionSelector';
import {Picker} from '@react-native-picker/picker';

function Register({navigation}: ScreenProps<'Register'>) {
  const [handleModal, setHandleModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const token = useToken();
  const {postRequest} = useHTTP(token);

  const handleClick = useCallback(
    async (values: {
      nim: string;
      name: string;
      prodi: string;
      email: string;
      password: string;
      confirmPassword: string;
    }) => {
      ToastAndroid.show('tunggu', ToastAndroid.SHORT);
      try {
        const result = await postRequest('/user/register', values);
        if (!result?.data) {
          ToastAndroid.show(result?.message as string, ToastAndroid.LONG);
        }
        setHandleModal(!handleModal);
      } catch (error) {
        console.log(error);
      }
    },
    [postRequest, dispatch, navigation],
  );

  return (
    <Formik
      initialValues={{
        nim: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        prodi: '',
      }}
      validationSchema={RegisterSchema}
      onSubmit={(values) => handleClick(values)}>
      {({
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        setFieldValue,
      }) => (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={{padding: wp(10), justifyContent: 'center'}}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: wp(6),
                  color: 'black',
                  fontWeight: 'bold',
                  paddingRight: wp(2),
                  paddingBottom: hp(2),
                }}>
                Sign Up
              </Text>
              <HandIcon />
            </View>

            <Text style={{fontSize: wp(4), color: 'black'}}>NIM:</Text>
            <TextInput
              onChangeText={handleChange('nim')}
              onBlur={handleBlur('nim')}
              value={values.nim}
              placeholder="eg: 20232053"
              placeholderTextColor={'gray'}
              style={{
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: wp(2),
                color: 'black',
                paddingHorizontal: wp(4),
                marginBottom: hp(1),
              }}
            />
            <Text style={{color: 'black'}}>{errors.nim}</Text>

            <Text style={{fontSize: wp(4), color: 'black'}}>Name:</Text>
            <TextInput
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              placeholderTextColor={'gray'}
              placeholder="eg: Academade"
              style={{
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: wp(2),
                color: 'black',
                paddingHorizontal: wp(4),
                marginBottom: hp(1),
              }}
            />
            <Text style={{color: 'black'}}>{errors.name}</Text>
            <Text style={{fontSize: wp(4), color: 'black'}}>
              Program Studi:
            </Text>
            <View
              style={{
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: wp(2),
                marginBottom: hp(1),
              }}>
              <Picker
                selectedValue={values.prodi}
                style={{color: 'black'}}
                onValueChange={(itemValue) =>
                  setFieldValue('prodi', itemValue)
                }>
                <Picker.Item label="Select Program Studi" value="" />
                <Picker.Item
                  label="Teknik Informatika"
                  value="Teknik Informatika"
                />
                <Picker.Item
                  label="Desain Komunikasi Visual"
                  value="Desain Komunikasi Visual"
                />
                <Picker.Item label="Sistem Komputer" value="Sistem Komputer" />
              </Picker>
            </View>
            <Text style={{color: 'black'}}>{errors.prodi}</Text>

            <Text style={{fontSize: wp(4), color: 'black'}}>Email:</Text>
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholderTextColor={'gray'}
              placeholder="contoh@gmail.com"
              style={{
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: wp(2),
                color: 'black',
                paddingHorizontal: wp(4),
                marginBottom: hp(1),
              }}
            />
            <Text style={{color: 'black'}}>{errors.email}</Text>

            <Text style={{fontSize: wp(4), color: 'black'}}>Password:</Text>
            <TextInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder="*********"
              placeholderTextColor={'gray'}
              secureTextEntry
              style={{
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: wp(2),
                color: 'black',
                paddingHorizontal: wp(4),
                marginBottom: hp(1),
              }}
            />
            <Text style={{color: 'black'}}>{errors.password}</Text>

            <Text style={{fontSize: wp(4), color: 'black'}}>
              Confirm Password:
            </Text>
            <TextInput
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              placeholder="*********"
              placeholderTextColor={'gray'}
              secureTextEntry
              style={{
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: wp(2),
                color: 'black',
                paddingHorizontal: wp(4),
                marginBottom: hp(1),
              }}
            />
            <Text style={{color: 'black'}}>{errors.confirmPassword}</Text>

            <Pressable
              onPress={() => handleSubmit()}
              style={{
                borderRadius: wp(2),
                backgroundColor: '#0D6EFD',
                marginVertical: hp(2),
                paddingVertical: hp(1.5),
              }}>
              <Text
                style={{textAlign: 'center', color: 'white', fontSize: wp(4)}}>
                Submit
              </Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('Login')}
              style={{
                borderRadius: wp(2),
                borderColor: '#0D6EFD',
                borderWidth: 1,
                marginVertical: hp(2),
                paddingVertical: hp(1.5),
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#0D6EFD',
                  fontSize: wp(4),
                }}>
                Already have an account, Sign In
              </Text>
            </Pressable>
          </View>
          <Modal isVisible={handleModal}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                height: '40%',
              }}>
              <Image source={require('../../assets/centang.png')} />
              <Text
                style={{color: 'black', fontWeight: 'bold', fontSize: wp(6)}}>
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
        </ScrollView>
      )}
    </Formik>
  );
}

export default Register;
