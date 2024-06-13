import React, {useCallback, useState} from 'react';
import {Text, ToastAndroid, View, RefreshControl, ScrollView} from 'react-native';
import CustomRoute from '../../components/atoms/CustomRoute/CustomRoute.atom';
import {HistoryItem, ScreenProps} from '../../types';
import {
  makeRupiahValue,
  transformDates,
  transformInvoice,
} from '../../helper/formatter';
import {useHTTP} from '../../hooks/useHTTP';
import SkeletonLoader from '../../components/organism/SkeletonLoader';
import {useFocusEffect} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useToken} from '../../redux/SessionSlice/useSessionSelector';

function History({navigation, route}: ScreenProps<'History'>) {
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const token = useToken();
  const {getRequest} = useHTTP(token);

  useFocusEffect(
    useCallback(() => {
      getHistoryData();
    }, [token])
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
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setHistoryData([])
    setRefreshing(true);
    getHistoryData();
  }, [token]);

  return (
    <View style={{flex: 1}}>
      <CustomRoute
        onPress={() => navigation.goBack()}
        text="Transaction History"
      />
      {loading ? (
        <SkeletonLoader />
      ) : (
        <ScrollView
          style={{flex: 1}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {historyData.length ? (
            historyData.map((list) => (
              <View
                key={list?.course?.name}
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  margin: wp(2),
                  padding: wp(2),
                }}>
                <Text style={{fontSize: wp(3.5), color: 'black'}}>
                  {transformInvoice(list?.updatedAt)}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: wp(3.5),
                      fontWeight: 'bold',
                      color: 'black',
                    }}>
                    {list?.course?.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: wp(3.5),
                      fontWeight: 'bold',
                      color: list?.verify ? 'green' : 'red',
                    }}>
                    {makeRupiahValue(list?.course?.price)}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: wp(3),
                    borderRadius: 10,
                    backgroundColor: list?.verify ? 'green' : 'red',
                    width: wp(40),
                    textAlign: 'center',
                    color: 'white',
                    padding: wp(1),
                  }}>
                  {list?.verify ? 'Payment Successful' : 'Payment Failed'}
                </Text>
                <Text style={{fontSize: wp(3.5), color: 'black'}}>
                  Paid on: {transformDates(list?.updatedAt)}
                </Text>
                <Text style={{fontSize: wp(3.5), color: 'black'}}>
                  Payment Method: {list?.payment_method ?? '-'}
                </Text>
              </View>
            ))
          ) : (
            <Text
              style={{fontSize: wp(3.5), textAlign: 'center', color: 'black'}}>
              Riwayat Tidak Ditemukan
            </Text>
          )}
        </ScrollView>
      )}
    </View>
  );
}

export default History;
