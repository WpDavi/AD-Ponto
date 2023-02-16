import Icone from '@expo/vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  AlertNotificationRoot,
  ALERT_TYPE,
  Dialog,
} from 'react-native-alert-notification';
import styled from 'styled-components';
import Api from '~/services/Api';

export default function PontoQrCode() {
  const navigation = useNavigation();

  const camRef = useRef(null);

  const [type, setType] = useState(0);

  const [scanned, setScanned] = useState();
  const [loadqr, setLoadqr] = useState(true);
  const [email, setEmail] = useState();

  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [hour, setHour] = useState('');
  const [pis, setPis] = useState('');
  const [image, setImage] = useState('');
  const [modalimg, setModalimg] = useState(false);

  const [foto, setFoto] = useState('');

  const handleBarCodeScanned = async ({ type, data }) => {
    const res = await Api.getFotoEmail(data);
    setFoto(res.ponto_online_foto2);
    setPis(res.pis);
    setEmail(data);
    setScanned(true);
    setModalimg(true);
    //if (email) {
    //  QRCODE();
    //}
  };

  useEffect(() => {
    const onStart = async () => {
      //pegando hora para o ponto
      const hour = new Date().toLocaleTimeString();
      setHour(hour);

      const ress = await AsyncStorage.getItem('@empresa');
      setEmpresa(ress);

      const lat = await AsyncStorage.getItem('@lat');
      const long = await AsyncStorage.getItem('@long');
      setLat(Number(lat));
      setLong(Number(long));
    };
    onStart();
  }, []);

  var data = new Date();
  var dia = String(data.getDate()).padStart(2, '0');
  var mes = String(data.getMonth() + 1).padStart(2, '0');
  var ano = data.getFullYear();
  const date = ano + '/' + mes + '/' + dia;

  async function QRCODE() {
    setLoadqr(false);

    var dataaa = new Date();
    var dia = String(dataaa.getDate()).padStart(2, '0');
    var mes = String(dataaa.getMonth() + 1).padStart(2, '0');
    var ano = dataaa.getFullYear();
    var hourr = new Date().toLocaleTimeString();
    const dataa = ano + mes + dia;

    const php = await Api.PointPhp(pis, lat, long, dataa, empresa);
    let json = await Api.pointQr(email, hour, date, lat, long);
    const jsonn = Api.uploudPonto(email, hour, date, lat, long, image);
    if (json) {
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Sucesso',
        textBody: `Ponto de ${email} inserido com sucesso`,
        button: 'ok',
      });
      setTimeout(() => {
        navigation.reset({
          routes: [{ name: 'Home' }],
        });
      }, 2000);
    }
  }

  function TogleCan() {
    if (type == 0) {
      setType(1);
    } else if (type == 1) {
      setType(0);
    }
  }

  const takePicture = async () => {
    const data = await camRef.current.takePictureAsync();
    setImage(data.uri);
    setModalimg(false);
  };

  return (
    <AlertNotificationRoot>
      <Container>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {!scanned && (
          <TxtNotQrcode>Coloque o CODE QR dentro do quadrado</TxtNotQrcode>
        )}
        {scanned && (
          <ContainerQRcode>
            {loadqr && (
              <TouchableOpacity onPress={QRCODE}>
                <ContainerImg>
                  <ImgButton source={require('~/assets/bater-ponto.png')} />
                </ContainerImg>
                <ButtonQrCode>
                  Enviar ponto de {'\n'} {email}
                </ButtonQrCode>
              </TouchableOpacity>
            )}
            {loadqr == false && (
              <ActivityIndicator
                size={'large'}
                color="#1CADE2"
              />
            )}
          </ContainerQRcode>
        )}

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalimg}
          onRequestClose={() => {
            setModalimg(!modalimg);
          }}
        >
          <Camera
            ref={camRef}
            type={type}
            style={{ flex: 1, justifyContent: 'flex-end' }}
          >
            <ButtomCamera onPress={takePicture}>
              <Icone
                size={23}
                name="camera"
                color="white"
              />
            </ButtomCamera>
            <ChangeCan onPress={TogleCan}>
              <ImgChangeCan source={require('~/icons/can.png')} />
            </ChangeCan>
          </Camera>
        </Modal>
      </Container>
    </AlertNotificationRoot>
  );
}

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const TxtNotQrcode = styled.Text`
  background-color: #1cade2;
  font-size: 20px;
  padding: 10px;
  border-radius: 10px;
  font-weight: bold;
  position: absolute;
  top: 7%;
  color: white;
`;

const ContainerQRcode = styled.View`
  margin-top: 40px;
  position: absolute;
  bottom: 10%;
`;

const ContainerImg = styled.View`
  background-color: #1cade2;
  margin-bottom: -15px;
  width: 85px;
  height: 85px;
  border-radius: 100px;
  align-self: center;
  justify-content: center;
  align-items: center;
`;

const ButtonQrCode = styled.Text`
  background-color: #1cade2;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  padding: 10px;
  border-radius: 10px;
`;

const ImgButton = styled.Image`
  width: 35px;
  height: 62px;
`;

//modal cam
const ButtomCamera = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: #1cade2;
  margin: 20px;
  border-radius: 10px;
  height: 50px;
`;

export const ChangeCan = styled.TouchableOpacity`
  position: absolute;
  top: 35px;
  right: 35px;
`;

export const ImgChangeCan = styled.Image`
  width: 50px;
  height: 50px;
`;
