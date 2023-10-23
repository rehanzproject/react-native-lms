import {View, Text, TextInput, Pressable} from 'react-native';
import React, {useState} from 'react';
import {RadioButton} from 'react-native-paper';
import {ScreenProps} from '../../../types';
import { dummyCheckout } from './constant';
import CustomRoute from '../../../components/atoms/CustomRoute/CustomRoute.atom';
import { makeRupiahValue } from '../../../helper/formatter';
const BuyCourse = ({route, navigation}: ScreenProps<'BuyCourse'>) => {
  const [selected, setSelected] = useState<string>('');
  const [coupon, setCoupon] = useState<string>('');
  const [text, setText] = useState<string>('');

  const applyCoupon = () => {
    if (coupon !== route.params.coupon) {
      setText('Kupon salah');
    }
    setText('Kupon Benar');
  };  
  return (
    <View className='p-2'>
       <CustomRoute onPress={() => navigation.goBack()} text="Checkout" />
      <Text className='text-black font-bold'>Select Payment</Text>
      {dummyCheckout.map((list) => (
        <View key={list.name} className="border rounded-lg flex flex-row justify-between my-2 py-2 ">
         <Text className="font-bold text-black px-2">{list.name}</Text>
          <RadioButton.Android
            value={list.name}
            status={selected === list.name ? 'checked' : 'unchecked'}
            onPress={() => setSelected(list.name)}
          />
          
        </View>
      ))}
      <View className="flex justify-between relative pt-1">
        <TextInput
          className="border rounded-lg text-xs"
          placeholder="take your coupon here..."
          value={coupon}
          onChangeText={setCoupon}
        />
        <Pressable className="bg-primary-50 absolute right-0 py-2 px-4 mt-2 mr-2 rounded-lg " onPress={applyCoupon}>
          <Text className="text-white">Apply</Text>
        </Pressable>
      </View>
      <View className="flex flex-row items-center p-2 my-2 justify-between border rounded-lg">
        <Text className="text-black font-bold">Total</Text>
        <Text className="text-black font-bold ">{makeRupiahValue(route.params.price)}</Text>
      </View>
    </View>
  );
};

export default BuyCourse;
