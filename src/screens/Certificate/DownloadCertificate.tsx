import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ToastAndroid,
  Linking,
} from 'react-native';
import CustomRoute from '../../components/atoms/CustomRoute/CustomRoute.atom';
import {ScreenProps} from '../../types';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useFocusEffect} from '@react-navigation/native';
import {useToken} from '../../redux/SessionSlice/useSessionSelector';
import {useHTTP} from '../../hooks/useHTTP';

const DownloadCertificate = ({
  route,
  navigation,
}: ScreenProps<'DownloadCertificate'>) => {
  const [handleModal, setHandleModal] = useState(false);
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const token = useToken();
  const {getRequest} = useHTTP(token);

  const getPDF = async () => {
    try {
      const result = await getRequest(`/user/getPDF?id=${route.params?.id}`);
      if (!result?.data) {
        ToastAndroid.show(result?.message as string, ToastAndroid.LONG);
      }
      setData(result?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getPDF();
    }, [token]),
  );

  const onConfirm = () => {
    setHandleModal(!handleModal);
  };

  const handleDownloadPress = () => {
    if (data?.url) {
      Linking.openURL(data.url);
    } else {
      ToastAndroid.show('No file URL available', ToastAndroid.LONG);
    }
  };

  return (
    <View style={styles.container}>
      <CustomRoute onPress={() => navigation.goBack()} text="Certificate" />
      <Text style={styles.title}>{data?.courseName}</Text>
      <Image 
      source={require('../../assets/certificate.png')}
      />
      <Pressable style={styles.downloadButton} onPress={handleDownloadPress}>
        <Text style={styles.buttonText}>Download PDF</Text>
      </Pressable>
      <Modal isVisible={handleModal}>
        <View style={styles.modalContainer}>
          <Image
            source={require('../../assets/centang.png')}
            style={styles.successImage}
          />
          <Text style={styles.successText}>Successful</Text>
          <Text style={styles.infoText}>
            Congratulations you have a new skill
          </Text>
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
  downloadButton: {
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
  pdf: {
    flex: 1,
    width: wp(90),
    height: hp(60),
    marginBottom: hp(2),
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
    color: 'black',
  },
  homeButton: {
    backgroundColor: '#0D6EFD',
    borderRadius: wp(2),
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
  },
});

export default DownloadCertificate;
