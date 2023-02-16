import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Dialog,
} from 'react-native-alert-notification';
import 'react-native-gesture-handler';
import MapView from 'react-native-maps';
import { TextInput as RNPTextInput } from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import Icone from '@expo/vector-icons/FontAwesome5';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';

import Api from '~/services/Api';
import { cleanText } from '~/utils/text';

export default function PontoLogin() {
  const camRef = useRef(null);
  const navigation = useNavigation();

  const [type, setType] = useState(Camera.Constants.Type.back);
  const [email, setEmail] = useState('');
  const [sFoto, setSFoto] = useState(null);
  const [lat, setLat] = useState(Number());
  const [long, setLong] = useState(Number());
  const [token, setToken] = useState('');
  const [name1, setName1] = useState('');
  const [hour, setHour] = useState('');

  const [pis, setPis] = useState();

  const [load, setLoad] = useState(false);

  const [image, setImage] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalQr, setModalQr] = useState(false);
  const [modalimg, setModalimg] = useState(false);
  const [permissionCamera, setPermissionCamera] = useState();
  const [cidade, setCidade] = useState();
  const [internet, setInternet] = useState();

  const [chave, setChave] = useState();
  const [empresa, setEmpresa] = useState();

  //QR CODE //
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrEmail, setQrEmail] = useState();
  const [loadqr, setLoadqr] = useState(true);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setQrEmail(data);
    setScanned(true);
    if (qrEmail) {
      QRCODE();
    }
  };
  async function QRCODE() {
    setLoadqr(false);
    let json = await Api.pointQr(qrEmail, hour, date, lat, long, image);

    if (json) {
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Sucesso',
        textBody: `Ponto de ${qrEmail} inserido com sucesso`,
        button: 'ok',
      });
      setTimeout(() => {
        navigation.reset({
          routes: [{ name: 'Home' }],
        });
      }, 2000);
    }
  }

  const getcit = async () => {
    const cit = await Api.getCidade();
    setCidade(cit.city);
  };

  // Camera
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setPermissionCamera(status === 'granted');
    })();
  }, []);

  if (permissionCamera === false) {
    return Alert.alert('Acesso a camera negado!');
  }

  const camera = async () => {
    setModalVisible(true);
  };

  async function takePicture() {
    if (camRef) {
      const data = await camRef.current.takePictureAsync();
      setImage(data.uri);
      setModalVisible(false);
      setModalimg(true);
    }
  }
  const modalcamera = () => {
    setImage();
    setModalimg(false);
  };
  const modalcameraleft = () => {
    setImage();
    setModalimg(false);
    setModalVisible(true);
  };
  //camera

  const onStart = async () => {
    //Pegando localização
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }
    const location = await Location.getCurrentPositionAsync({});

    if (location) {
      const { coords } = location;
      const { latitude, longitude } = coords;
      setLat(Number(latitude));
      setLong(Number(longitude));
    }
  };

  useEffect(() => {
    getcit();
    onStart();
  }, []);

  var data = new Date();
  var dia = String(data.getDate()).padStart(2, '0');
  var mes = String(data.getMonth() + 1).padStart(2, '0');
  var ano = data.getFullYear();
  const date = ano + '/' + mes + '/' + dia;

  const updateClock = () => {
    const hour = new Date().toLocaleTimeString();
    setHour(hour);
  };
  setInterval(updateClock, 1000);

  const baterPonto = async () => {
    if (!empresa || !chave) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Alerta',
        textBody: 'Campos obrigatorios',
        button: 'ok',
      });
      return;
    }
    setLoad(true);
    const res = await Api.getInfoChave(chave, empresa.toLowerCase());
    if (res.error) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Alerta',
        textBody: 'Empresa ou Chave incorreto',
        button: 'ok',
      });
      setLoad(false);
    }
    var foto = res[0].ponto_online_foto;

    if (foto) {
      const can = async () => {
        setModalVisible(true);
      };
      if (foto === 'S') {
        can();
      } else if (foto === 'Q') {
        setModalQr(true);
      } else {
        handlePonto();
      }
    }
  };

  const handlePonto = async () => {
    setModalimg(false);

    const jsonn = await Api.uploudPontoChave(
      empresa.toLowerCase(),
      chave,
      lat,
      long,
      image,
    );

    let json = await Api.pointChave(
      date,
      hour,
      chave,
      lat,
      long,
      image,
      empresa.toLowerCase(),
    );

    //Req -----------------------------------------------------------------------------------------
    var dataaa = new Date();
    var dia = String(dataaa.getDate()).padStart(2, '0');
    var mes = String(dataaa.getMonth() + 1).padStart(2, '0');
    var ano = dataaa.getFullYear();
    var hourr = new Date().toLocaleTimeString();
    const dataa = ano + mes + dia;
    const php = await Api.PointPhp(pis, lat, long, dataa, empresa);

    //Req ----------------------------------------------------------------------------------------

    navigation.reset({
      routes: [{ name: 'Login' }],
    });

    if (json.error) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Alerta',
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
        navigation.reset({
          routes: [{ name: 'Home' }],
        });
      } else {
        await AsyncStorage.setItem('pontos', JSON.stringify(myArray));
        navigation.reset({
          routes: [{ name: 'Home' }],
        });
      }
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <AlertNotificationRoot>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={'#1CADE2'} />
        <View style={styles.header2}>
          <Text style={styles.txtponto}>Bater Ponto</Text>
          <Text style={styles.txthora}>{hour}</Text>
          <Text style={styles.txtlocalização}>
            <Icone
              size={16}
              name="location-arrow"
            />{' '}
            {cidade}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <RNPTextInput
              style={styles.input}
              placeholder="Empresa"
              label="Empresa"
              mode="outlined"
              theme={{ colors: { background: '#fff' } }}
              value={empresa}
              onChangeText={(t) => setEmpresa(t)}
              onBlur={() => cleanText(empresa, setEmpresa)}
            />
            <RNPTextInput
              style={styles.input}
              placeholder="Chave"
              label="Chave"
              mode="outlined"
              theme={{ colors: { background: '#fff' } }}
              value={chave}
              onChangeText={(t) => setChave(t)}
              onBlur={() => cleanText(chave, setChave)}
            />
          </View>
        </View>
        <View style={{ position: 'absolute', marginTop: 20, marginLeft: 20 }}>
          <TouchableOpacity
            style={{ flexDirection: 'row' }}
            onPress={() =>
              navigation.reset({
                routes: [{ name: 'Home' }],
              })
            }
          >
            <Icone
              size={20}
              name="arrow-left"
              color="white"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <MapView
            style={{ height: '100%', width: '100%', position: 'absolute' }}
            onMapReady={() => {
              Platform.OS === 'android'
                ? PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                  ).then(() => {
                    console.log('usuario aceitou');
                  })
                : '';
            }}
            region={{
              latitude: lat,
              longitude: long,
              latitudeDelta: 0.022,
              longitudeDelta: 0.0421,
            }}
            zoomEnabled={true}
            minZoomLevel={17}
            showsUserLocation={true}
            loadingEnabled={true}
          />
          {!load && (
            <TouchableOpacity
              style={styles.button}
              onPress={baterPonto}
            >
              <Text style={styles.txtbutton}>
                BATER PONTO
                <Icone
                  size={16}
                  name="hand-point-up"
                />
              </Text>
            </TouchableOpacity>
          )}
          {load && (
            <TouchableOpacity style={styles.button}>
              <Text style={styles.txtbutton}>
                Carregando...
                <ActivityIndicator color={'white'} />
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Camera
            ref={camRef}
            type={type}
            style={{ flex: 1, justifyContent: 'flex-end' }}
          >
            <TouchableOpacity
              style={styles.buttoncamera}
              onPress={takePicture}
            >
              <Icone
                size={23}
                name="camera"
                color="white"
              />
            </TouchableOpacity>
          </Camera>
        </Modal>

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalQr}
          onRequestClose={() => {
            setModalQr(!modalQr);
          }}
        >
          <View style={{ flex: 1, alignItems: 'center' }}>
            {!scanned && (
              <Text style={{ marginTop: 40, fontSize: 20, fontWeight: 'bold' }}>
                Coloque o CODE QR dentro do quadrado
              </Text>
            )}

            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
            {scanned && (
              <View style={{ marginTop: 40 }}>
                {loadqr === true && (
                  <TouchableOpacity onPress={QRCODE}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}
                    >
                      Enviar ponto de {'\n'} {qrEmail}
                    </Text>
                  </TouchableOpacity>
                )}
                {loadqr === false && (
                  <ActivityIndicator
                    size={'large'}
                    color="#1CADE2"
                  />
                )}
              </View>
            )}
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalimg}
          onRequestClose={() => {
            setModalimg(!modalimg);
          }}
        >
          <View style={{ flex: 1, justifyContent: 'center', margin: 20 }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <TouchableOpacity
                style={{ margin: 10 }}
                onPress={modalcameraleft}
              >
                <Icone
                  name="angle-double-left"
                  size={35}
                  color="#1CADE2"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ margin: 10 }}
                onPress={handlePonto}
              >
                <Image
                  style={{ width: 25, height: 43 }}
                  source={require('~/assets/bater-ponto.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ margin: 10, justifyContent: 'flex-end' }}
                onPress={modalcamera}
              >
                <Icone
                  name="window-close"
                  size={35}
                  color="#1CADE2"
                />
              </TouchableOpacity>
            </View>

            <Image
              style={{ width: '100%', height: '80%', borderRadius: 20 }}
              source={{ uri: image }}
            />
          </View>
        </Modal>
      </SafeAreaView>
    </AlertNotificationRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconVoltar: {
    width: 24,
    height: 24,
  },
  voltar: {
    marginLeft: 20,
    fontStyle: 'Normal',
    fontWeight: '700',
    color: 'white',
  },
  header2: {
    backgroundColor: '#1CADE2',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtponto: {
    fontWeight: 'bold',
    marginTop: 25,
    fontSize: 25,
    color: 'white',
  },
  txtname: {
    fontSize: 22,
    color: 'white',
  },
  txthora: {
    fontSize: 39,
    fontWeight: 'bold',
    color: 'white',
  },
  txtlocalização: {
    color: 'white',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 20,
    padding: 5,
    paddingLeft: 30,
    paddingRight: 30,
  },
  caixa: {
    backgroundColor: '#1CADE2',
    height: 90,
    borderRadius: 10,
    marginTop: 15,
    width: '30%',
  },
  caixacentro: {
    backgroundColor: '#1CADE2',
    height: 90,
    borderRadius: 10,
    marginTop: 15,
    width: '30%',
    marginLeft: 10,
    marginRight: 10,
  },
  titulo: {
    margin: 7,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  baixo: {
    marginLeft: 7,
    marginTop: -15,
    color: '#fff',
    fontSize: 34,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#1CADE2',
    width: 300,
    borderRadius: 30,
    marginBottom: 20,
    marginTop: '100%',
  },
  txtbutton: {
    color: 'white',
    padding: 15,
    fontWeight: 'bold',
    fontSize: 17,
  },
  buttoncamera: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1CADE2',
    margin: 20,
    borderRadius: 10,
    height: 50,
  },
  input: {
    width: '40%',
    justifyContent: 'center',
    margin: 10,
  },
});
