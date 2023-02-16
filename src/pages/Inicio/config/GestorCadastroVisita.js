import Icone from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  AlertNotificationRoot,
  ALERT_TYPE,
  Dialog,
} from 'react-native-alert-notification';
import styled from 'styled-components';
import Api from '~/services/Api';

import config from '@config';
import * as Location from 'expo-location';
import {
  ActivityIndicator,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { TextInputMask } from 'react-native-masked-text';

export default function GestorCadastroVisita() {
  const navigation = useNavigation();
  const mapEl = useRef(null);
  const [loadbutton, setLoadbutton] = useState(false);

  const [funcionarios, setFuncionarios] = useState();
  const [regionAp, setRegionAp] = useState();

  const [destination, setDestination] = useState();
  const [nameDestination, setNameDestination] = useState();
  const [cliente, setCliente] = useState();
  const [data, setData] = useState();
  const [horario, setHorario] = useState();

  const [modalMapa, setModalMapa] = useState(false);
  const [pis, setPis] = useState();
  const [nameFuncionario, setNameFuncionario] = useState('');

  useEffect(() => {
    getLocation();
  }, [regionAp]);

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
    }
  }

  useEffect(() => {
    async function getFuncionario() {
      const res = await Api.getAllFuncionarios();
      setFuncionarios(res);
    }
    getFuncionario();
  }, []);

  const cadastrarVisita = async () => {
    setLoadbutton(true);
    const res = await Api.solicitarVisita(
      pis,
      data,
      horario,
      cliente,
      nameDestination,
      JSON.stringify(destination),
    );
    setTimeout(() => {
      navigation.navigate('HistoricoSolicitaçãoDeVisitas');
    }, 2000);

    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Sucesso',
      textBody: 'Solicitação de visita enviada',
      button: 'ok',
    });
  };

  //TELA////////////////////
  const renderItem = useCallback((funcionarios) => {
    const handleFuncionario = () => {
      setPis(funcionarios.item.pis);
      setNameFuncionario(funcionarios.item.funcionario);
      setModalMapa(true);
    };
    return (
      <ContainerF>
        <ContainerTouch onPress={handleFuncionario}>
          <ContainerImg>
            {!funcionarios.item.foto && (
              <Imgpefil source={require('~/icons/perfil.png')} />
            )}
            {funcionarios.item.foto && (
              <Imgpefil source={{ uri: funcionarios.item.foto }} />
            )}
          </ContainerImg>
          <ContainerInfos>
            <Nomefuncionario>{funcionarios.item.funcionario}</Nomefuncionario>
            <Txtemail>Email: {funcionarios.item.email}</Txtemail>
            <Txtpis>Pis: {funcionarios.item.pis}</Txtpis>
          </ContainerInfos>
        </ContainerTouch>
      </ContainerF>
    );
  });

  return (
    <Container>
      <AlertNotificationRoot>
        <Header>
          <HeaderTitulo>Cadastro de Visita</HeaderTitulo>
        </Header>
        <HeaderConteinerButoon>
          <HeaderButton
            onPress={() => navigation.reset({ routes: [{ name: 'Home' }] })}
          >
            <Icone
              size={20}
              name="arrow-left"
              color="white"
            />
          </HeaderButton>
        </HeaderConteinerButoon>
        <ContainerHistorico>
          <HistoricoDeSolicitacao
            onPress={() => navigation.navigate('HistoricoSolicitaçãoDeVisitas')}
          >
            <TxtSolicitacao>
              Histórico de solicitações de visitas
            </TxtSolicitacao>
          </HistoricoDeSolicitacao>
          <HistoricodeRota
            onPress={() => navigation.navigate('HistoricoDeVisitas')}
          >
            <TxtRotaCadastrada>Histórico de visitas</TxtRotaCadastrada>
          </HistoricodeRota>
        </ContainerHistorico>

        <FletlistS
          data={funcionarios}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        />

        <ModalS
          animationType="slide"
          transparent={false}
          visible={modalMapa}
          onRequestClose={() => {
            setModalMapa(!modalMapa);
          }}
        >
          <ContainerModal>
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
              zoomEnabled={false}
              showsUserLocation={true}
              loadingEnabled={true}
              ref={mapEl}
            ></MapView>

            {!destination && (
              <View style={styles.containerImput}>
                <GooglePlacesAutocomplete
                  style={styles.input}
                  placeholder="Para onde vamos?"
                  onPress={(data, details = null) => {
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

            {destination && (
              <View style={styles.containerImput}>
                <TextInput
                  style={styles.inputCliente}
                  placeholder="Cliente"
                  value={cliente}
                  onChangeText={(a) => setCliente(a)}
                />
                <TextInputMask
                  placeholder="Data da visita"
                  style={styles.inputCliente}
                  value={data}
                  keyboardType="number-pad"
                  onChangeText={setData}
                  options={{
                    mask: '99/99/9999',
                    maskType: 'BRL',
                  }}
                  type="custom"
                />
                <TextInputMask
                  placeholder="Horário da visita"
                  style={styles.inputCliente}
                  value={horario}
                  keyboardType="number-pad"
                  onChangeText={setHorario}
                  options={{
                    mask: '99:99',
                    maskType: 'BRL',
                  }}
                  type="custom"
                />
              </View>
            )}
            <MapViewDirections
              origin={regionAp}
              destination={destination}
              apikey={config.googleApi}
              strokeWidth={3}
              onReady={(result) => {
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

            <ModalNameFuncionario>{nameFuncionario}</ModalNameFuncionario>
            {nameDestination && (
              <EndereçoSelect>{nameDestination}</EndereçoSelect>
            )}
            {cliente && horario && data && loadbutton == false && (
              <TouchableOpacity
                onPress={cadastrarVisita}
                activeOpacity={0.9}
                style={styles.criar}
              >
                <Text style={styles.textoBotao}>CADASTRAR VISITA</Text>
              </TouchableOpacity>
            )}
            {cliente && horario && data && loadbutton == true && (
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.criar}
              >
                <ActivityIndicator
                  size={'large'}
                  color="white"
                />
              </TouchableOpacity>
            )}
          </ContainerModal>
        </ModalS>
      </AlertNotificationRoot>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

const Header = styled.View`
  width: 100%;
  height: 7%;
  align-items: center;
  justify-content: center;
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

const ContainerHistorico = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const HistoricoDeSolicitacao = styled.TouchableOpacity`
  width: 46%;
  height: 61px;
  background-color: #1cade2;
  border-bottom-right-radius: 30px;
  align-items: center;
  justify-content: center;
`;

const TxtSolicitacao = styled.Text`
  color: white;
  font-weight: bold;
  padding: 10px;
  text-align: center;
`;

const HistoricodeRota = styled.TouchableOpacity`
  width: 46%;
  height: 61px;
  background-color: #1cade2;
  border-bottom-left-radius: 30px;
  align-items: center;
  justify-content: center;
`;

const TxtRotaCadastrada = styled.Text`
  color: white;
  font-weight: bold;
  padding: 10px;
`;

//fletList
const FletlistS = styled.FlatList``;

const ContainerF = styled.SafeAreaView`
  border-bottom-width: 1px;
  border-color: #bdbdbd;
  padding: 10px;
`;

const ContainerTouch = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const ContainerImg = styled.View``;

const Imgpefil = styled.Image`
  width: 40px;
  height: 40px;
  margin-right: 8px;
  border-radius: 100px;
`;

const ContainerInfos = styled.View``;

const Nomefuncionario = styled.Text`
  color: ${(props) => props.theme.color};
  font-weight: bold;
`;

const Txtemail = styled.Text`
  color: ${(props) => props.theme.color};
`;

const Txtpis = styled.Text`
  color: ${(props) => props.theme.color};
`;

//Modal
const ModalS = styled.Modal``;

const ContainerModal = styled.View`
  align-items: center;
`;
const ModalNameFuncionario = styled.Text`
  position: absolute;
  font-weight: bold;
  font-size: 16px;
  top: 20px;
  background-color: white;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-width: 1px;
  border-color: #888;
  border-radius: 10px;
`;
const EndereçoSelect = styled.Text`
  position: absolute;
  font-weight: bold;
  font-size: 16px;
  top: 60px;
  background-color: white;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-width: 1px;
  border-color: #888;
  border-radius: 10px;
  padding: 10px;
  margin: 5px;
`;

///css
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
    top: 140,
  },
  input: {
    borderColor: '#888',
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
    bottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotao: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    width: '100%',
  },
});
