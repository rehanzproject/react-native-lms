import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import ArrowIcon from '../Icons/ArrowIcon';
import { widthPercentageToDP as wd } from 'react-native-responsive-screen';

export default function CustomRoute({
  text,
  onPress,
}: {
  text?: string;
  onPress: () => void;
}) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <ArrowIcon />
      </Pressable>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  text: {
    flex: 1,
    fontSize: wd(5),
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
});
