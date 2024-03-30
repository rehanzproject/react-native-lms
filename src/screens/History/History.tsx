import React from 'react';
import {Text, View} from 'react-native';
import CustomRoute from '../../components/atoms/CustomRoute/CustomRoute.atom';
import {ScreenProps} from '../../types';
import {arrDummyHistory} from './constant';
import {makeRupiahValue} from '../../helper/formatter';

function History({navigation, route}: ScreenProps<'History'>) {
  return (
    <View>
      <CustomRoute
        onPress={() => navigation.goBack()}
        text="Transaction History"
      />
      <View>
        {arrDummyHistory.map((list) => (
          <View key={list.name} className="border rounded-lg gap-1 m-4 py-1">
            <Text className="text-xs text-black">{list.invoice}</Text>
            <View className="flex flex-row justify-between">
              <Text className="text-xs text-black font-bold">{list.name}</Text>
              <Text className="text-xs font-bold text-success-50 ">
                {makeRupiahValue(list.price)}
              </Text>
            </View>
            <Text
              className={`rounded-lg text-white w-32 px-2 text-xs ${
                list.success ? 'bg-success-50' : 'bg-danger-50'
              } `}>
              {list.success ? 'Payment Successful' : 'Payment Failed'}
            </Text>
            <Text className="text-black text-xs">Paid on : {list.paid}</Text>
            <Text className="text-black text-xs">
              Payment Method : {list.payment_method}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default History;
