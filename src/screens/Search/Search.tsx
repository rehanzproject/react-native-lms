import * as React from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {ScreenProps} from '../../types';
import SearchIcon from '../../components/atoms/Icons/SearchIcon';
import CustomRoute from '../../components/atoms/CustomRoute/CustomRoute.atom';
import XIcon from '../../components/atoms/Icons/XIcon';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';

function Search({route, navigation}: ScreenProps<'Search'>) {
  const example = [
    'Ui Design',
    'Wireframe',
    'Prototyping',
    'Design System',
    'Design System',
    'Design System',
    'Design System',
  ];

  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row'}}>
        <CustomRoute onPress={() => navigation.goBack()} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: hp(2),
            width: wp(80),
          }}>
          <View
            style={{
              paddingTop: hp(2),
              paddingLeft: wp(2),
              position: 'absolute',
            }}>
            <SearchIcon />
          </View>
          <TextInput
            placeholder="Search"
            placeholderTextColor={'gray'}
            style={{
              flex: 1,
              borderColor: 'black',
              color: 'black',
              borderWidth: 1,
              borderRadius: 10,
              paddingLeft: hp(5),
            }}
            onEndEditing={(event) => {
              navigation.navigate('AllCourse', {
                search: event.nativeEvent.text,
              });
            }}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: wp(5),
          paddingTop: hp(2),
          borderBottomWidth: 1,
        }}>
        <Text style={{fontWeight: 'bold', fontSize: wp(5), color: 'black'}}>
          Recent:
        </Text>
        <XIcon />
      </View>
      <View>
        {example.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: wp(5),
              paddingTop: hp(2),
            }}>
            <Pressable
              onPress={() => navigation.navigate('AllCourse', {search: item})}>
              <Text style={{fontSize: RFValue(14), color: 'black'}}>
                {item}
              </Text>
            </Pressable>
            <Pressable>
              <XIcon />
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
}

export default Search;
