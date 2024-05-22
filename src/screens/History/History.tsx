import React, {useEffect, useState} from 'react';
import {Text, ToastAndroid, View, ActivityIndicator} from 'react-native';
import CustomRoute from '../../components/atoms/CustomRoute/CustomRoute.atom';
import {HistoryItem, ScreenProps} from '../../types';
import {arrDummyHistory} from './constant';
import {makeRupiahValue} from '../../helper/formatter';
import {useHTTP} from '../../hooks/useHTTP';
import SkeletonLoader from '../../components/organism/SkeletonLoader';
import { useFocusEffect } from '@react-navigation/native';

function History({navigation, route}: ScreenProps<'History'>) {
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const {getRequest} = useHTTP();
  useFocusEffect(
    React.useCallback(() => {
      getHistoryData();
    }, []),
  );
    const getHistoryData = async () => {
      try {
        const result = await getRequest('/user/checkout/history/user');
        if (!result?.data) {
          ToastAndroid.show(result?.message as string, ToastAndroid.LONG);
        }
        setHistoryData(result?.data);
      } catch (error) {
        console.error(error);
      } finally{
        setLoading(false)
      }
    };

  return (
    <View>
      <CustomRoute
        onPress={() => navigation.goBack()}
        text="Transaction History"
      />
      {loading ? (
        <SkeletonLoader />
      ) : (
        <View>
          {historyData.length ? historyData.map((list) => (
            <View key={list.name} className="border rounded-lg gap-1 m-4 py-1">
              <Text className="text-xs text-black">{list.invoice}</Text>
              <View className="flex flex-row justify-between">
                <Text className="text-xs text-black font-bold">
                  {list.name}
                </Text>
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
          )) : 
          (
            <Text className='text-black text-center'>Riwayat Tidak Ditemukan</Text>
          )}
        </View>
      )}
    </View>
  );
}

export default History;
