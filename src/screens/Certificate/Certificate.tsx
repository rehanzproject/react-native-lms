import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import CustomRoute from '../../components/atoms/CustomRoute/CustomRoute.atom';
import { ScreenProps } from '../../types';
import { arrDummyCertificate } from './constant';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Certificate = ({ navigation }: ScreenProps<'Certificate'>) => {
  return (
    <View style={styles.container}>
      <CustomRoute onPress={() => navigation.goBack()} text="My Certificate" />
      {arrDummyCertificate.map((list) => (
        <View key={list.name} style={styles.certificateItem}>
          <Image
            source={require('../../assets/course.png')}
            style={styles.image}
          />
          <View style={styles.details}>
            <View style={styles.detailsHeader}>
              <Text style={styles.courseName}>{list.name}</Text>
              <Text style={styles.status}>Completed</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Pressable style={styles.button}>
                <Text style={styles.buttonText}>See Certificate</Text>
              </Pressable>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
  },
  certificateItem: {
    margin: wp(5),
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(2),
  },
  image: {
    width: wp(20),
    height: wp(20),
    borderRadius: wp(2),
    marginRight: wp(2),
  },
  details: {
    flex: 1,
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(1),
  },
  courseName: {
    fontSize: wp(4),
    fontWeight: 'bold',
    color: 'black',
  },
  status: {
    fontSize: wp(3.5),
    color: 'green',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0D6EFD',
    borderRadius: wp(2),
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
  },
  buttonText: {
    color: 'white',
    fontSize: wp(3.5),
    textAlign: 'center',
  },
});

export default Certificate;
