import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {RadioButton} from 'react-native-paper';
import {ScreenProps} from '../../../types';
import {dummyCheckout} from './constant';
import CustomRoute from '../../../components/atoms/CustomRoute/CustomRoute.atom';
import {makeRupiahValue} from '../../../helper/formatter';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useFocusEffect} from '@react-navigation/native';
import {useHTTP} from '../../../hooks/useHTTP';
import {useToken} from '../../../redux/SessionSlice/useSessionSelector';

const BuyCourse = ({route, navigation}: ScreenProps<'BuyCourse'>) => {
  const [handleModal, setHandleModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('');
  const [coupon, setCoupon] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [data, setData] = useState();
  const [loading, setLoading] = useState<boolean>();
  const [totalPrice, setTotalPrice] = useState<number>(
    route?.params?.price ?? 0,
  );
  const token = useToken();
  const {getRequest, postRequest} = useHTTP(token);
  const onConfirm = async () => {
    try {
      const result = await postRequest(
        `/user/checkout/verify?id=${route.params?.id}&payment_method=${
          selected ? selected : text ? 'Coupon' : ''
        }`,
      );
      if (!result?.data) {
        ToastAndroid.show(result?.message as string, ToastAndroid.LONG);
      }
      setHandleModal(!handleModal);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const applyCoupon = () => {
    if (coupon === route?.params?.coupon) {
      setText('Kupon Benar');
      setTotalPrice(0);
    } else {
      setText('Kupon salah');
    }
  };

  return (
    <View style={{flex: 1, padding: wp(2)}}>
      <CustomRoute onPress={() => navigation.goBack()} text="Checkout" />
      <Text style={{color: 'black', fontWeight: 'bold'}}>Select Payment</Text>
      {dummyCheckout.map((list) => (
        <View
          key={list.name}
          style={{
            borderWidth: 1,
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: hp(2),
            padding: wp(2),
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={list.icon} style={{width: wp(10), height: wp(10)}} />
            <Text
              style={{
                fontWeight: 'bold',
                color: 'black',
                paddingHorizontal: wp(2),
              }}>
              {list.name}
            </Text>
          </View>
          <RadioButton.Android
            value={list.name}
            status={selected === list.name ? 'checked' : 'unchecked'}
            onPress={() => setSelected(list.name)}
          />
        </View>
      ))}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          position: 'relative',
          paddingTop: hp(1),
        }}>
        <TextInput
          style={{
            borderWidth: 1,
            borderRadius: 10,
            color: 'black',
            width: wp(70),
            fontSize: wp(3),
          }}
          placeholder="take your coupon here..."
          placeholderTextColor={'gray'}
          value={coupon}
          onChangeText={setCoupon}
        />
        <Pressable
          style={{
            backgroundColor: '#0D6EFD',
            position: 'absolute',
            right: wp(0),
            top: hp(1),
            paddingVertical: hp(2),
            paddingHorizontal: wp(4),
            borderRadius: 10,
          }}
          onPress={applyCoupon}>
          <Text style={{color: 'white'}}>Apply</Text>
        </Pressable>
      </View>
      <Text style={{color: 'black'}}>{text}</Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: wp(2),
          marginVertical: hp(2),
          justifyContent: 'space-between',
          borderWidth: 1,
          borderRadius: 10,
        }}>
        <Text style={{fontWeight: 'bold', color: 'black'}}>Total</Text>
        <Text style={{fontWeight: 'bold', color: 'black'}}>
          {makeRupiahValue(totalPrice)}
        </Text>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          padding: wp(4),
        }}>
        <Pressable
          onPress={() => {
            onConfirm();
          }}
          style={{backgroundColor: '#0D6EFD', borderRadius: 10}}>
          <Text style={{color: 'white', textAlign: 'center', padding: wp(2)}}>
            Confirm
          </Text>
        </Pressable>
        <Modal isVisible={handleModal}>
          <Pressable
            onPress={() => setHandleModal(!handleModal)}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              height: hp(50),
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}>
              <Image source={require('../../../assets/centang.png')} />
              <Text style={{fontWeight: 'bold', fontSize: wp(7)}}>
                Successful
              </Text>
              <Text style={{fontSize: wp(4), color: 'black'}}>
                Your payment request has been{' '}
              </Text>
              <Text style={{fontSize: wp(4), color: 'black'}}>successful</Text>
              <Pressable
                onPress={() => navigation.navigate('Home')}
                style={{
                  paddingVertical: hp(2),
                  paddingHorizontal: wp(10),
                  backgroundColor: '#0D6EFD',
                  borderRadius: 10,
                }}>
                <Text style={{color: 'white'}}>Go to Home</Text>
              </Pressable>
            </View>
          </Pressable>
        </Modal>
      </View>
    </View>
  );
};

export default BuyCourse;
