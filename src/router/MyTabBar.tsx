import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import HomeIcon from '../components/atoms/Icons/HomeIcon';
import HistoryIcon from '../components/atoms/Icons/HistoryIcon';
import MyCourseIcon from '../components/atoms/Icons/MyCourseIcon';
import ProfileIcon from '../components/atoms/Icons/ProfileIcon';

function MyTabBar({state, descriptors, navigation}: BottomTabBarProps) {
  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex-1 items-center">
            {label === 'Home' && <HomeIcon />}
            {label === 'MyCourse' && <MyCourseIcon />}
            {label === 'History' && <HistoryIcon />}
            {label === 'Profile' && <ProfileIcon />}
            <Text
              className={`text-xs ${
                isFocused ? 'text-primary-50' : 'text-black'
              } `}>
              {label === 'MyCourse' ? 'My Course' : (label as string)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default MyTabBar;
