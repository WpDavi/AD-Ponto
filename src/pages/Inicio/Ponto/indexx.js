import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { AlertNotificationRoot } from 'react-native-alert-notification';

import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';

import Icone from '@expo/vector-icons/FontAwesome5';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

import { DialogAlert } from '~/components/DialogAlert';
import { DialogSuccess } from '~/components/DialogSuccess';
import Mapa from '~/components/Mapa';
import Api from '~/services/Api';

import {
  ButtonBack,
  Container,
  ContainerBody,
  ContainerButton,
  ContainerButtonBack,
  ContainerButtons,
  ContainerInfos,
  ContainerModalPermission,
  Header,
  TxtButtonModal,
  TxtHeader,
  TxtInfos,
  Txtbutton,
} from './styled';

export default function Ponto() {
  const navigation = useNavigation();
  const [internet, setInternet] = useState();
  const [permissionCamera, setPermissionCamera] = useState();
  const [hasPermission, setHasPermission] = useState();

  const [email, setEmail] = useState();

  const [sFoto, setSFoto] = useState();
  const [name1, setName1] = useState();

  const [coords, setCoords] = useState();

  const [load, setLoad] = useState(false);

  const [informacoesUsuario, setInformacoesUsuario] = useState();

  const [hour, setHour] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [pis, setPis] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [image, setImage] = useState();

  ///Modal permissoes
  const [modalPermission, setModalPermission] = useState(false);
  const sistema = Platform.OS;

  useEffect(() => {
    NetInfo.fetch().then((state) => {
      setInternet(state.isConnected);
    });
  }, [internet]);

  useEffect(() => {
    if (sistema === 'android') {
      async function req() {
        const results = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (results === false) {
          setModalPermission(true);
        }
      }
      req();
    }
  }, []);

  const logount = async () => {
    navigation.reset({
      routes: [{ name: 'Home' }],
    });
  };
  const aceiteModal = async () => {
    setModalPermission(false);
    const { statuss } = await Camera.requestCameraPermissionsAsync();
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    const { statu } = await Location.requestForegroundPermissionsAsync();
    await ImagePicker.requestMediaLibraryPermissionsAsync();
    navigation.reset({
      routes: [{ name: 'Ponto' }],
    });

    if (statu !== 'granted') {
      return;
    }
    setHasPermission(status === 'granted');
    setPermissionCamera(statuss === 'granted');

    if (permissionCamera === false) {
      return Alert.alert('Acesso a camera negado!');
    }
  };

  const updateClock = () => {
    const hour = new Date().toLocaleTimeString();
    setHour(hour);
  };
  setInterval(updateClock, 1000);

  useEffect(() => {
    const onStart = async () => {
      //Pegando a solicita????o de foto no AsyncStorage
      const sFoto = await AsyncStorage.getItem('sFoto');
      setSFoto(sFoto);

      //Pegando email do AsyncStorage
      const email = await AsyncStorage.getItem('email');
      setEmail(email);

      //pegando o nome no AsyncStorage
      const name = await AsyncStorage.getItem('name');
      setName1(name);

      const location = await Location.getCurrentPositionAsync({});
      if (location) {
        const { coords } = location;
        const { latitude, longitude } = coords;
        setLat(latitude);
        setLong(longitude);
        setCoords({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.022,
          longitudeDelta: 0.0421,
        });
      }
    };
    onStart();
  }, []);

  const baterPonto = async () => {
    setLoad(true);
    if (sFoto === 'S') {
      navigation.navigate('PontoCamera');
      setLoad(false);
    } else if (sFoto === 'Q') {
      navigation.navigate('PontoQrCode');
      setLoad(false);
    } else {
      handlePonto();
    }
  };

  const handleGetInformacoesPessoais = async () => {
    //pegando infos do funcinario
    const res = await Api.getInformacoesPessoais();
    await setInformacoesUsuario(res);

    //pegando a empresa do funcionario
    const ress = await Api.getEmpresa();
    setEmpresa(ress);

    //pegando hora para o ponto
    const hour = new Date().toLocaleTimeString();
    setHour(hour);
  };

  useEffect(() => {
    handleGetInformacoesPessoais();
    if (informacoesUsuario) {
      setPis(informacoesUsuario.pis);
    }
  }, [informacoesUsuario]);

  var data = new Date();
  var dia = String(data.getDate()).padStart(2, '0');
  var mes = String(data.getMonth() + 1).padStart(2, '0');
  var ano = data.getFullYear();
  const date = ano + '/' + mes + '/' + dia;

  const handlePonto = async () => {
    setLoad(true);
    if (internet === true) {
      //Req -----------------------------------------------------------------------------------------
      var dataaa = new Date();
      var dia = String(dataaa.getDate()).padStart(2, '0');
      var mes = String(dataaa.getMonth() + 1).padStart(2, '0');
      var ano = dataaa.getFullYear();
      var hourr = new Date().toLocaleTimeString();
      const dataa = ano + mes + dia;
      const php = await Api.PointPhp(pis, lat, long, dataa, empresa);
      //Req ----------------------------------------------------------------------------------------

      let json = await Api.point(email, hour, date, lat, long, image);
      const jsonn = Api.uploudPonto(email, hour, date, lat, long, image);

      if (json) {
        setTimeout(() => {
          navigation.reset({
            routes: [{ name: 'Home' }],
          });
        }, 2000);

        if (json.error) {
          DialogAlert(`${json.error}`);
        }
        if (json.message) {
          DialogSuccess('Ponto Inserido com sucesso');
        }
      }
    } else if (internet === false) {
      var dataaa = new Date();
      var dia = String(dataaa.getDate()).padStart(2, '0');
      var mes = String(dataaa.getMonth() + 1).padStart(2, '0');
      var ano = dataaa.getFullYear();
      var hourr = new Date().toLocaleTimeString();
      const dataa = ano + mes + dia;
      DialogAlert(
        'Sem conex??o a internet, ponto ser?? enviado ao retomar conex??o',
      );
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
    <Container>
      <AlertNotificationRoot>
        {/**
         <ContainerHeader>
          <TxtTitulo>Bater Ponto</TxtTitulo>
          <TxtName>{name1}</TxtName>
          <TxtHora>{hour}</TxtHora>
        </ContainerHeader>
         */}
        <ContainerButtonBack>
          <ButtonBack
            onPress={() => {
              navigation.navigate('Home');
            }}
          >
            <Icone
              size={20}
              name="arrow-left"
              color="white"
            />
          </ButtonBack>
        </ContainerButtonBack>

        <ContainerBody>
          <Mapa />
          {!load && email && (
            <ContainerButton onPress={baterPonto}>
              <Txtbutton>
                BATER PONTO
                <Icone
                  size={16}
                  name="hand-point-up"
                />
              </Txtbutton>
            </ContainerButton>
          )}
          {load && (
            <ContainerButton>
              <Txtbutton>
                Carregando...
                <ActivityIndicator color={'white'} />
              </Txtbutton>
            </ContainerButton>
          )}
        </ContainerBody>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalPermission}
          onRequestClose={() => {
            setModalPermission(!modalPermission);
          }}
        >
          <ContainerModalPermission>
            <Header>
              <TxtHeader>PERMISS??ES</TxtHeader>
            </Header>
            <ContainerInfos>
              <TxtInfos>
                Vamos solicitar a permiss??o para acesso a c??mera afim de
                registro do ponto eletr??nico, envio de imagens e atestados
                m??dicos.
              </TxtInfos>
            </ContainerInfos>
            <ContainerInfos>
              <TxtInfos>
                Vamos solicitar permiss??o de acesso a localiza????o e a
                localiza????o em segundo plano do seu dispositivo para a
                finalidade de registro do ponto.
              </TxtInfos>
            </ContainerInfos>
            <ContainerButtons>
              <TouchableOpacity onPress={logount}>
                <TxtButtonModal>Sair</TxtButtonModal>
              </TouchableOpacity>
              <TouchableOpacity onPress={aceiteModal}>
                <TxtButtonModal>Avan??ar</TxtButtonModal>
              </TouchableOpacity>
            </ContainerButtons>
          </ContainerModalPermission>
        </Modal>
      </AlertNotificationRoot>
    </Container>
  );
}
