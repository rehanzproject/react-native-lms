import {View, Text, TextInput, Pressable, Image} from 'react-native';
import React, {useState} from 'react';
import {RadioButton} from 'react-native-paper';
import {ScreenProps} from '../../../types';
import {dummyCheckout} from './constant';
import CustomRoute from '../../../components/atoms/CustomRoute/CustomRoute.atom';
import {makeRupiahValue} from '../../../helper/formatter';
import Modal from 'react-native-modal';

const BuyCourse = ({route, navigation}: ScreenProps<'BuyCourse'>) => {
  const [handleModal, setHandleModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('');
  const [coupon, setCoupon] = useState<string>('');
  const [text, setText] = useState<string>('');

  const applyCoupon = () => {
    if (coupon !== route?.params?.coupon) {
      setText('Kupon salah');
    }
    setText('Kupon Benar');
  };
  return (
    <View className="p-2 flex-1">
      <CustomRoute onPress={() => navigation.goBack()} text="Checkout" />
      <Text className="text-black font-bold">Select Payment</Text>
      {dummyCheckout.map((list) => (
        <View
          key={list.name}
          className="border rounded-lg flex flex-row justify-between my-2 py-2 ">
          <View className="flex-row px-2">
            <Image source={list.icon} className='' />
            <Text className="font-bold text-black px-2">{list.name}</Text>
          </View>
          <RadioButton.Android
            value={list.name}
            status={selected === list.name ? 'checked' : 'unchecked'}
            onPress={() => setSelected(list.name)}
          />
        </View>
      ))}
      <View className="flex justify-between relative pt-1">
        <TextInput
          className="border rounded-lg text-xs text-black"
          placeholder="take your coupon here..."
          placeholderTextColor={'gray'}
          value={coupon}
          onChangeText={setCoupon}
        />
        <Pressable
          className="bg-primary-50 absolute right-0 py-2 px-4 mt-2 mr-2 rounded-lg "
          onPress={applyCoupon}>
          <Text className="text-white">Apply</Text>
        </Pressable>
      </View>
      <View className="flex flex-row items-center p-2 my-2 justify-between border rounded-lg">
        <Text className="text-black font-bold">Total</Text>
        <Text className="text-black font-bold ">
          {makeRupiahValue(route?.params?.price ?? 0)}
        </Text>
      </View>
      <View className="absolute bottom-0 w-full p-4 ">
        <Pressable
          onPress={() => {
            setHandleModal(!handleModal);
          }}
          className=" bg-primary-50 rounded-lg">
          <Text className="text-center p-2 text-white">Confirm</Text>
        </Pressable>
        <Modal isVisible={handleModal}>
          <Pressable
            onPress={() => setHandleModal(!handleModal)}
            className="flex justify-center items-center bg-white h-2/5">
            <View className="flex justify-center items-center gap-3">
              <Image source={require('../../../assets/centang.png')} />
              <Text className="text-black font-extrabold text-2xl">
                Successful
              </Text>
              <Text className="text-black text-base">
                Your payment request has been{' '}
              </Text>
              <Text className="text-black text-base">successful</Text>

              <Pressable
                onPress={() => navigation.navigate('Home')}
                className="py-2 rounded-md px-10 bg-primary-50">
                <Text className="text-white text-c">Go to Home</Text>
              </Pressable>
            </View>
          </Pressable>
        </Modal>
      </View>
    </View>
  );
};

export default BuyCourse;
