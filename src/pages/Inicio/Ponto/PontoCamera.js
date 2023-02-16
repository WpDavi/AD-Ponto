import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Image, Modal } from 'react-native';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Dialog,
} from 'react-native-alert-notification';

import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';

import Icone from '@expo/vector-icons/FontAwesome5';
import { Camera } from 'expo-camera';
import styled from 'styled-components';

import Api from '~/services/Api';

import { ChangeCan, ImgChangeCan } from './styled';

export default function PontoCamera() {
  const navigation = useNavigation();

  const camRef = useRef(null);

  const [type, setType] = useState(0);

  const [image, setImage] = useState('');
  const [modalimg, setModalimg] = useState(false);
  const [load, setLoad] = useState('');
  const [loadPonto, setLoadPonto] = useState(false);

  const [email, setEmail] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [pis, setPis] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [hour, setHour] = useState('');

  const [internet, setInternet] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setInternet(state.isConnected);
    });
    async function int() {
      const ress = await Api.getEmpresa();
      if (ress) {
        unsubscribe();
      }
    }
    int();
  }, []);

  const handleGetInformacoesPessoais = async () => {
    //pegando hora para o ponto
    const hour = new Date().toLocaleTimeString();
    setHour(hour);

    //pegando a empresa do funcionario
    const ress = await AsyncStorage.getItem('@empresa');
    setEmpresa(ress);

    //pegando infos do funcinario
    const pis = await AsyncStorage.getItem('@pis');
    await setPis(pis);
  };

  function TogleCan() {
    if (type === 0) {
      setType(1);
    } else if (type === 1) {
      setType(0);
    }
  }

  async function takePicture() {
    const data = await camRef.current.takePictureAsync();
    setImage(data.uri);
    setModalimg(true);
  }
  const modalcamera = () => {
    setImage();
    setModalimg(false);
    setLoad(false);
    navigation.navigate('Ponto');
  };
  const modalcameraleft = () => {
    setImage();
    setModalimg(false);
  };

  useEffect(() => {
    handleGetInformacoesPessoais();
    const onStart = async () => {
      //Pegando email do AsyncStorage
      const email = await AsyncStorage.getItem('email');
      const lat = await AsyncStorage.getItem('@lat');
      const long = await AsyncStorage.getItem('@long');
      setEmail(email);
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

  //console.log(email, hour, date, lat, long, image);

  const handlePonto = async () => {
    setLoadPonto(true);
    if (internet === true) {
      //Req -----------------------------------------------------------------------------------------
      var dataaa = new Date();
      var dia = String(dataaa.getDate()).padStart(2, '0');
      var mes = String(dataaa.getMonth() + 1).padStart(2, '0');
      var ano = dataaa.getFullYear();
      var hourr = new Date().toLocaleTimeString();
      const dataa = ano + mes + dia;

      //Req ----------------------------------------------------------------------------------------

      const php = await Api.PointPhp(pis, lat, long, dataa, empresa);
      let json = await Api.pointQr(email, hour, date, lat, long);
      const jsonn = Api.uploudPonto(email, hour, date, lat, long, image);

      if (json) {
        setTimeout(() => {
          navigation.reset({
            routes: [{ name: 'Home' }],
          });
        }, 2000);

        if (json.error) {
          Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: 'Erro',
            textBody: `${json.error}`,
            button: 'ok',
          });
        }
        if (json.message) {
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Sucesso',
            textBody: 'Ponto Inserido com sucesso',
            button: 'ok',
          });
        }
      }
    } else if (internet === false) {
      var dataaa = new Date();
      var dia = String(dataaa.getDate()).padStart(2, '0');
      var mes = String(dataaa.getMonth() + 1).padStart(2, '0');
      var ano = dataaa.getFullYear();
      var hourr = new Date().toLocaleTimeString();
      const dataa = ano + mes + dia;

      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Alerta',
        textBody:
          'Sem conexão a internet, ponto será enviado ao retomar conexão',
        button: 'ok',
      });
      const myArray = [
        {
          email: email,
          hour: hour,
          date: date,
          lat: lat,
          long: long,
          image: image,
          pis: pis,
          data: dataa,
          empresa: empresa,
        },
      ];
      const pontosString = await AsyncStorage.getItem('pontos');
      if (pontosString) {
        const pontos = JSON.parse(pontosString);
        pontos.push({
          email: email,
          hour: hour,
          date: date,
          lat: lat,
          long: long,
          image: image,
          pis: pis,
          data: dataa,
          empresa: empresa,
        });
        await AsyncStorage.setItem('pontos', JSON.stringify(pontos));
        setTimeout(() => {
          navigation.reset({
            routes: [{ name: 'Home' }],
          });
        }, 2000);
      } else {
        await AsyncStorage.setItem('pontos', JSON.stringify(myArray));

        setTimeout(() => {
          navigation.reset({
            routes: [{ name: 'Home' }],
          });
        }, 2000);
      }
    }
  };

  return (
    <AlertNotificationRoot>
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

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalimg}
          onRequestClose={() => {
            setModalimg(!modalimg);
          }}
        >
          <ContainerModal>
            <ContainerButtons>
              <Button onPress={modalcameraleft}>
                <Icone
                  name="angle-double-left"
                  size={35}
                  color="#1CADE2"
                />
              </Button>
              {!loadPonto && lat && (
                <Button onPress={handlePonto}>
                  <Image
                    style={{ width: 25, height: 43 }}
                    source={require('~/assets/bater-ponto.png')}
                  />
                </Button>
              )}
              {loadPonto && (
                <Button>
                  <ActivityIndicator size={'large'} />
                </Button>
              )}
              <Button onPress={modalcamera}>
                <Icone
                  name="window-close"
                  size={35}
                  color="#1CADE2"
                />
              </Button>
            </ContainerButtons>

            <BodyImg source={{ uri: image }} />
          </ContainerModal>
        </Modal>
      </Camera>
    </AlertNotificationRoot>
  );
}
const ButtomCamera = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: #1cade2;
  margin: 20px;
  border-radius: 10px;
  height: 50px;
`;

//MODAL IMAGM ///////////
const ContainerModal = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  margin: 10px;
`;

const ContainerButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Button = styled.TouchableOpacity`
  margin: 10px;
`;

const BodyImg = styled.Image`
  width: 100%;
  height: 80%;
  border-radius: 20px;
`;
