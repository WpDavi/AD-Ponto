import { Ionicons } from '@expo/vector-icons';
import Icone from '@expo/vector-icons/FontAwesome5';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  AlertNotificationRoot,
  ALERT_TYPE,
  Dialog,
} from 'react-native-alert-notification';

import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import styled from 'styled-components/native';
import Api from '~/services/Api';

export default function PontoFaceId2() {
  const camRef = useRef(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [image, setImage] = useState();
  const [idPessoa, setIdPessoa] = useState();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoad, setModalLoad] = useState(false);

  const [listaPesquisa, setListaPesquisa] = useState();

  const [email, setEmail] = useState();
  const [hour, setHour] = useState();
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [date, setDate] = useState();
  const [pis, setPis] = useState();
  const [empresa, setEmpresa] = useState();
  const [name, setName] = useState();
  const [photo, setPhoto] = useState();

  const [face, setFace] = useState(false);

  const [buttonEnviarLoad, setButtonEnviarLoad] = useState(false);

  const handlePonto = async () => {
    setButtonEnviarLoad(true);
    let json = await Api.point(email, hour, date, lat, long, image);
    const php = await Api.PointPhp(pis, lat, long, date, empresa);
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Sucesso',
      textBody: 'Ponto Enviado com sucesso',
      button: 'ok',
    });
    setTimeout(() => {
      navigation.goBack();
    }, 2000);
  };

  useEffect(() => {
    async function getLocation() {
      //Camera
      await Camera.requestCameraPermissionsAsync();
      const { statu } = await Location.requestForegroundPermissionsAsync();
      //----------------------
      const location = await Location.getCurrentPositionAsync({});
      if (location) {
        const { coords } = location;
        const { latitude, longitude } = coords;
        setLat(Number(latitude));
        setLong(Number(longitude));
      }
    }
    getLocation();
  }, []);

  const updateClock = () => {
    const hour = new Date().toLocaleTimeString();
    setHour(hour);
  };
  setInterval(updateClock, 1000);
  useEffect(() => {
    async function getemprsas() {
      const res = await Api.getEmpresa();
      setEmpresa(res);
    }
    getemprsas();
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    const date = ano + '/' + mes + '/' + dia;
    setDate(date);
  }, []);

  const navigation = useNavigation();
  async function takePicture() {
    setModalLoad(true);
    const options = { quality: 0.5, base64: true };
    const data = await camRef.current.takePictureAsync(options);
    const photo = data.base64;
    setImage(data.uri);
    const res = await Api.comparationFaceID2(photo, idPessoa);
    console.log('res', res.status);
    console.log('res', res.length);

    if (res.status == 'failure') {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Alerta',
        textBody: 'Pessoa nao encontrada no banco de dados',
        button: 'ok',
      });
      setModalLoad(false);
    } else if (res.length == 1) {
      setPis(res[0].name);
      setModalLoad(false);
      setModalVisible(true);
    } else if (res.length == 0) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Alerta',
        textBody: 'Rosto nao encontrado',
        button: 'ok',
      });
      setModalLoad(false);
    }
  }
  useEffect(() => {
    async function getUser() {
      if (pis) {
        const res = await Api.getallpersonalPis(pis);
        console.log('res', res);

        setEmail(res.email);
        setPhoto(res.foto);
        console.log(photo);
        setName(res.funcionario);
      }
    }
    getUser();
  }, [pis]);

  handleFacesDetected = ({ faces }) => {
    //console.log(faces);
    if (faces[0]) {
      setFace(true);
    }
  };

  useEffect(() => {
    const onStart = async () => {
      const jso = await Api.getAllFuncionarios();
      await setListaPesquisa(jso);
    };
    onStart();
  }, []);

  return (
    <Contaier>
      <AlertNotificationRoot>
        <Camera
          ref={camRef}
          onFacesDetected={handleFacesDetected}
          type={type}
          style={{ flex: 1, justifyContent: 'flex-end' }}
        >
          <PikerButton onPress={takePicture}>
            <Icone
              size={23}
              name="camera"
              color="white"
            />
          </PikerButton>
        </Camera>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <ContainerModalLoad>
            <View style={styles.imageUserContainer}>
              {photo != '' ? (
                <Image
                  resizeMode="center"
                  style={styles.img}
                  source={{ uri: photo }}
                />
              ) : (
                <Ionicons
                  name="person"
                  size={54}
                  color={'#1cade2'}
                />
              )}
            </View>
            <TxtModalLoad>{name}</TxtModalLoad>
            <View style={styles.buttonContainerModal}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.buttonModal}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textButtonModal}>Cancelar</Text>
              </TouchableOpacity>

              {buttonEnviarLoad == false ? (
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.buttonModal}
                  onPress={handlePonto}
                >
                  <Text style={styles.textButtonModal}>Enviar Ponto</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.buttonModal}>
                  <ActivityIndicator
                    color={'#1cade2'}
                    size={'large'}
                  />
                </View>
              )}
            </View>
          </ContainerModalLoad>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalLoad}
          onRequestClose={() => {
            setModalLoad(!setModalLoad);
          }}
        >
          <ContainerModalLoad>
            <TxtModalLoad>Obtendo Informações </TxtModalLoad>
            <TxtModalLoad>Aguarde</TxtModalLoad>
            <ActivityIndicator
              size={'large'}
              color={'#1CADE2'}
            />
          </ContainerModalLoad>
        </Modal>
      </AlertNotificationRoot>
    </Contaier>
  );
}

const Contaier = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

const ContainerModalLoad = styled.View`
  width: 90%;
  background-color: white;
  align-self: center;
  margin-top: 70%;
  padding: 10px;
  border-radius: 30px;
  align-items: center;
  padding-top: 30px;
  padding-bottom: 30px;
  border-width: 2px;
  border-color: #1cade2;
`;
const TxtModalLoad = styled.Text`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #1cade2;
`;

const PikerButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0px;
  width: 90%;
  justify-content: center;
  align-items: center;
  background-color: #1cade2;
  margin: 20px;
  border-radius: 10px;
  height: 50px;
`;

const styles = StyleSheet.create({
  imageUserContainer: {
    width: 100,
    height: 100,
    marginTop: -80,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: '#CDCDCD',
  },
  img: {
    height: '100%',
    width: '100%',
    borderRadius: 100,
  },
  buttonContainerModal: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonModal: {
    width: '40%',
    height: '100%',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    borderColor: '#1CADE2',
  },
  textButtonModal: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1CADE2',
    marginVertical: 10,
  },
});
