import config from '@config';
import Icone from '@expo/vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  AlertNotificationRoot,
  ALERT_TYPE,
  Dialog,
} from 'react-native-alert-notification';
import { View } from 'react-native-animatable';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import styled from 'styled-components';
import Api from '~/services/Api';

export default function Mapa() {
  const mapEl = useRef(null);

  const navigation = useNavigation();

  const [regionAp, setRegionAp] = useState();
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [destination, setDestination] = useState();
  const [nameDestination, setNameDestination] = useState();
  const [offButton, setOffButton] = useState(false);
  const [loadButton, setLoadButton] = useState(false);

  const [placeClient, setPlaceClient] = useState(true);

  const [distance, setDistance] = useState();
  const [prince, setPrince] = useState();
  const [cliente, setCliente] = useState();
  const [timeRota, setTimeRota] = useState();
  const [id, setId] = useState();

  console.log(placeClient);

  useEffect(() => {
    const getRota = async () => {
      const res = await AsyncStorage.getItem('rota');
      const ress = await AsyncStorage.getItem('cord');
      console.log(res);
      const jsonres = JSON.parse(res);
      const coredenadas = JSON.parse(ress);
      if (jsonres) {
        const cli = await jsonres.cliente;
        setCliente(cli);
        setId(jsonres.id);
        setNameDestination(jsonres.endereço);
      }
      setDestination(coredenadas);
      if (id) {
        setPlaceClient(false);
      }
    };
    getRota();
  }, []);

  async function getLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }
    const location = await Location.getCurrentPositionAsync({});

    if (location) {
      const { coords } = location;
      const { latitude, longitude } = coords;
      setRegionAp({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.022,
        longitudeDelta: 0.0421,
      });
      setLat(Number(latitude));
      setLong(Number(longitude));
    }
  }

  useEffect(() => {
    getLocation();
  }, []);

  var dataa = new Date();
  var dia = String(dataa.getDate()).padStart(2, '0');
  var mes = String(dataa.getMonth() + 1).padStart(2, '0');
  var ano = dataa.getFullYear();
  const data = dia + '/' + mes + '/' + ano;

  const cadastrarRota = async () => {
    setLoadButton(true);
    const res = await Api.funcionarioVisita(
      data,
      cliente,
      nameDestination,
      JSON.stringify(destination),
      distance,
      timeRota,
      prince,
    );
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Sucesso',
      textBody: 'Visita cadastrada',
      button: 'ok',
    });
    setPlaceClient(false);
    if (id) {
      await Api.deleteVisita(id);
    }
    setOffButton(true);
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Sucesso',
      textBody: 'Rota cadastrada',
      button: 'ok',
    });
  };

  const shareCordinates = async () => {
    const scheme = Platform.select({
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${destination.latitude},${destination.longitude}`;
    const label = `${nameDestination}`;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        ToastyMessage('Serviço indisponivel');
      }
    });
  };

  return (
    <AlertNotificationRoot>
      <Header>
        <HeaderTitulo>Visitas</HeaderTitulo>
      </Header>
      <HeaderConteinerButoon>
        <HeaderButton onPress={() => navigation.navigate('Home')}>
          <Icone
            size={20}
            name="arrow-left"
            color="white"
          />
        </HeaderButton>
      </HeaderConteinerButoon>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {lat && (
          <MapView
            style={{ height: '100%', width: '100%' }}
            onMapReady={() => {
              Platform.OS === 'android'
                ? PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                  ).then(() => {
                    console.log('usuario aceitou');
                  })
                : '';
            }}
            region={regionAp}
            zoomEnabled={true}
            showsUserLocation={true}
            loadingEnabled={true}
            ref={mapEl}
          >
            {destination && (
              <MapViewDirections
                origin={regionAp}
                destination={destination}
                apikey={config.googleApi}
                strokeWidth={3}
                onReady={(result) => {
                  setTimeRota(result.duration);
                  setDistance(result.distance);
                  setPrince(result.distance * 0.5);
                  mapEl.current.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      top: 10,
                      bottom: 10,
                      left: 10,
                      right: 10,
                    },
                  });
                }}
              />
            )}
          </MapView>
        )}

        {destination && !id && placeClient && (
          <View style={styles.containerCliente}>
            <TextInput
              style={styles.inputCliente}
              placeholder="Cliente"
              value={cliente}
              onChangeText={(a) => setCliente(a)}
            />
          </View>
        )}

        {cliente && loadButton == false && offButton == false && (
          <TouchableOpacity
            onPress={cadastrarRota}
            activeOpacity={0.9}
            style={styles.criar}
          >
            <Text style={styles.textoBotao}>
              CADASTRAR VISITA PARA REEMBOLSO
            </Text>
          </TouchableOpacity>
        )}
        {cliente && loadButton == true && offButton == false && (
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.criar}
          >
            <ActivityIndicator
              size={'small'}
              color="white"
            />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => navigation.navigate('VisiitasEmAndamento')}
          style={styles.containerTxtConcluido}
        >
          <Text style={styles.txtConcluido}>
            Visitas em andamento{'\n'}ou concluidas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('SolicitaçãoDeVisitas')}
          style={styles.containerTxt}
        >
          <Text style={styles.txtProximas}>Solicitação de visitas</Text>
        </TouchableOpacity>

        {!destination && (
          <View style={styles.containerImput}>
            <GooglePlacesAutocomplete
              style={styles.input}
              placeholder="Para onde vamos?"
              onPress={(data, details = null) => {
                console.log(details.geometry);
                setNameDestination(data.description);
                setDestination({
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                  latitudeDelta: 0.000922,
                  longitudeDelta: 0.000421,
                });
              }}
              query={{
                key: config.googleApi,
                language: 'pt-br',
              }}
              enablePoweredByContainer={false}
              fetchDetails={true}
              styles={{ listView: { height: 100 } }}
            />
          </View>
        )}

        {cliente && (
          <View style={{ position: 'absolute', top: 30 }}>
            <Text
              style={{
                backgroundColor: 'white',
                padding: 10,
                paddingHorizontal: 30,
                borderRadius: 10,
                fontWeight: 'bold',
              }}
            >
              Cliente: {cliente}
            </Text>
          </View>
        )}
        {destination && cliente && (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={shareCordinates}
            style={styles.buttonShareContainer}
          >
            <Icone
              name="share-alt"
              size={32}
              color={'white'}
            />
          </TouchableOpacity>
        )}
      </View>
    </AlertNotificationRoot>
  );
}

const Header = styled.View`
  width: 100%;
  height: 7%;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  background-color: #1cade2;
`;
const HeaderTitulo = styled.Text`
  text-align: center;
  font-size: 20px;
  color: white;
  font-weight: bold;
`;
const HeaderConteinerButoon = styled.View`
  position: absolute;
  margin-top: 20px;
`;

const HeaderButton = styled.TouchableOpacity`
  flex-direction: row;
  margin-left: 20px;
`;

export const styles = StyleSheet.create({
  containerImput: {
    position: 'absolute',
    width: '90%',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
    padding: 5,
    borderRadius: 8,
    top: 55,
  },
  input: {
    borderColor: '#888',
  },
  containerCliente: {
    position: 'absolute',
    width: '90%',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
    padding: 5,
    borderRadius: 8,
    top: 55,
  },
  inputCliente: {
    padding: 10,
  },
  criar: {
    paddingTop: 15,
    paddingBottom: 15,
    width: '90%',
    backgroundColor: '#00bbff',
    borderRadius: 4,
    paddingHorizontal: 0,
    paddingVertical: 10,
    boxSizing: 'border-box',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 20,
    marginBottom: 20,
    position: 'absolute',
    bottom: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotao: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    width: '100%',
  },
  containerTxtConcluido: {
    position: 'absolute',
    backgroundColor: '#00bbff',
    top: 130,
    right: -0,
    borderTopLeftRadius: 20,
    width: '45%',
  },
  txtConcluido: {
    padding: 5,
    paddingLeft: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  containerTxt: {
    position: 'absolute',
    backgroundColor: '#00bbff',
    top: 130,
    left: -0,
    borderTopRightRadius: 20,
    width: '45%',
  },
  txtProximas: {
    padding: 13,
    fontWeight: 'bold',
    color: 'white',
  },

  buttonShareContainer: {
    position: 'absolute',
    right: 20,
    bottom: 156,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: '#00bbff',
  },
});
