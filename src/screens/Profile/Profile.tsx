import React, {useEffect} from 'react';
import {Text, Image, TouchableOpacity, View} from 'react-native';
import {InfoType, ScreenProps} from '../../types';
import {arrayList} from './constant';
import CustomRoute from '../../components/atoms/CustomRoute/CustomRoute.atom';
import {useDispatch, useSelector} from 'react-redux';
import sessionSlice from '../../redux/SessionSlice/SessionSlice';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function Profile({route, navigation}: ScreenProps<'Profile'>) {
  const dispatch = useDispatch();
  const info = useSelector((state: InfoType) => state.info);
  const handleLogout = () => {
    dispatch(sessionSlice.actions.removeToken());
    navigation.navigate('Login');
  };
  const handleClicks = (list: any) => {
    navigation.navigate(list.route);
  };

  return (
    <View style={{flex: 1}}>
      <CustomRoute onPress={() => navigation.goBack()} text={route.name} />
      <View style={{alignItems: 'center', marginTop: hp(2)}}>
        <Image
          source={
            info.image ? {uri: info.image} : require('../../assets/photo.png')
          }
          defaultSource={require('../../assets/photo.png')}
          style={{
            alignSelf: 'center',
            width: wp(20),
            height: wp(20),
            borderRadius: wp(10),
          }}
        />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: wp(5),
            color: 'black',
            marginTop: hp(2),
          }}>
          {info.name}
        </Text>
        {arrayList.map((list) => (
          <View key={list.name} style={{width: wp(75)}}>
            <TouchableOpacity
              accessibilityRole="link"
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: wp(1),
                borderWidth: 1,
                borderRadius: 10,
                marginVertical: wp(1),
                backgroundColor:
                  list.route === 'Logout' ? 'red' : 'transparent',
              }}
              onPress={() =>
                list.route !== 'Logout' ? handleClicks(list) : handleLogout()
              }>
              <View>{list.icon}</View>
              <Text
                style={{
                  textAlign: 'left',
                  padding: hp(2),
                  color: list.name === 'Logout' ? 'white' : '#0D6EFD',
                }}>
                {list.name}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

export default Profile;
