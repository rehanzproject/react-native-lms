import {View, Text, Pressable} from 'react-native';
import React from 'react';
import ArrowIcon from '../Icons/ArrowIcon';

export default function CustomRoute({
  text,
  onPress,
}: {
  text?: string;
  onPress: () => void;
}) {
  return (
    <View className="flex flex-row p-4 items-center ">
      <Pressable onPress={onPress}>
        <ArrowIcon />
      </Pressable>
      <Text className="text-2xl font-extrabold text-center mx-auto text-black">{text}</Text>
    </View>
  );
}
