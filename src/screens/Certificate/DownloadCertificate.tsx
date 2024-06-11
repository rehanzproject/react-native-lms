import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import CustomRoute from '../../components/atoms/CustomRoute/CustomRoute.atom';
import { ScreenProps } from '../../types';
import Modal from 'react-native-modal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const DownloadCertificate = ({ navigation }: ScreenProps<'DownloadCertificate'>) => {
  const [handleModal, setHandleModal] = useState(false);
  const onConfirm = () => {
    setHandleModal(!handleModal)
  };

  return (
    <View style={styles.container}>
      <CustomRoute onPress={() => navigation.goBack()} text="Certificate" />
      <Text style={styles.title}>Basic Microsoft Word Program</Text>
      <Pressable
        onPress={() => {
          onConfirm();
        }}
        style={styles.confirmButton}>
        <Text style={styles.buttonText}>Download</Text>
      </Pressable>
      <Modal isVisible={handleModal}>
        <View style={styles.modalContainer}>
          <Image source={require('../../assets/centang.png')} style={styles.successImage} />
          <Text style={styles.successText}>Successful</Text>
          <Text style={styles.infoText}>Congratulations you have a new skill</Text>
          <Pressable
            onPress={() => navigation.navigate('Home')}
            style={styles.homeButton}>
            <Text style={styles.buttonText}>Go to Home</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: wp(5),
    color: 'black',
    textAlign: 'center',
    marginBottom: hp(2),
  },
  confirmButton: {
    position: 'absolute',
    bottom: hp(1),
    backgroundColor: '#0D6EFD',
    borderRadius: 12,
    paddingVertical: hp(1),
    paddingHorizontal: wp(10),
  },
  buttonText: {
    color: 'white',
    fontSize: wp(4),
    textAlign: 'center',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: hp(50),
    padding: wp(4),
    borderRadius: wp(2),
  },
  successImage: {
    width: wp(20),
    height: wp(20),
    marginBottom: hp(2),
  },
  successText: {
    fontWeight: 'bold',
    fontSize: wp(7),
    color: 'black',
    marginBottom: hp(1),
  },
  infoText: {
    fontSize: wp(4),
    marginBottom: hp(2),
    textAlign: 'center',
    color: 'black'
  },
  homeButton: {
    backgroundColor: '#0D6EFD',
    borderRadius: wp(2),
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
  },
});

export default DownloadCertificate;
