import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import Icone from '@expo/vector-icons/FontAwesome5';
import styled from 'styled-components';

import Api from '~/services/Api';

export default function HistoricoSolicitaçãoDeVisitas() {
  const [cliente, setCliente] = useState();
  const [horarioVista, setHorarioVisita] = useState();
  const [dataVisita, setDataVisita] = useState();
  const [id, setId] = useState();
  const [cords, setCords] = useState();
  const [rota, setRota] = useState();

  const [visitas, setVisitas] = useState([]);
  const [button, setButton] = useState(true);
  const [inicioLead, setInicioLead] = useState(true);

  const [modalVisita, setModalVisita] = useState(false);

  const getVisitas = async () => {
    const res = await Api.getGestorSolicitaçãoVisita();
    setInicioLead(false);
    setVisitas(res);
  };
  useEffect(() => {
    getVisitas();
  }, []);

  async function check() {
    const res = await AsyncStorage.setItem('rota', JSON.stringify(rota));
    const ress = await AsyncStorage.setItem('cord', JSON.stringify(cords));
    navigation.reset({
      routes: [{ name: 'Mapa' }],
    });
  }

  const renderItem = useCallback((visitas) => {
    const handlePonto = () => {
      setRota({
        cords: JSON.parse(visitas.item.cords),
        id: visitas.item.id,
        cliente: visitas.item.cliente,
        datavisita: visitas.item.data,
        horariovisita: visitas.item.horario_da_visita,
        endereço: visitas.item.endereço,
      });
      setCords(JSON.parse(visitas.item.cords));
      setId(visitas.item.id);
      setCliente(visitas.item.cliente);
      setDataVisita(visitas.item.data);
      setHorarioVisita(visitas.item.horario_da_visita);
      setModalVisita(true);
    };
    return (
      <Containerflet>
        <ContainerInfo>
          <View style={{ maxWidth: '95%' }}>
            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#999999',
                borderBottomWidth: 1,
              }}
            >
              <TxtTituloFletList>CLIENTE: </TxtTituloFletList>
              <Text style={{ color: '#1CADE2' }}>{visitas.item.cliente}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TxtTituloFletList>FUNCIONARIO: </TxtTituloFletList>
              <Text style={{ color: '#1CADE2' }}>
                {visitas.item.nome_funcinario}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TxtTituloFletList>DATA: </TxtTituloFletList>
              <Text style={{ color: '#1CADE2' }}>{visitas.item.data}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TxtTituloFletList>Horário: </TxtTituloFletList>
              <Text style={{ color: '#1CADE2' }}>
                {visitas.item.horario_da_visita}
              </Text>
            </View>
          </View>
        </ContainerInfo>
      </Containerflet>
    );
  });

  const navigation = useNavigation();
  return (
    <Container>
      <Header>
        <HeaderTitulo>Histórico de Solicitação de visitas</HeaderTitulo>
      </Header>
      <HeaderConteinerButoon>
        <HeaderButton onPress={() => navigation.goBack()}>
          <Icone
            size={20}
            name="arrow-left"
            color="white"
          />
        </HeaderButton>
      </HeaderConteinerButoon>

      {visitas.length === 0 && (
        <View style={{ alignItems: 'center' }}>
          <Image
            style={{
              width: 250,
              height: 165,
              marginBottom: 23,
              marginTop: 120,
            }}
            source={require('~/icons/visitas.png')}
          />
          {inicioLead === false && (
            <Text
              style={{ fontWeight: 'bold', fontSize: 18, color: '#999999' }}
            >
              Sem solicitações no momento
            </Text>
          )}
          {inicioLead === true && (
            <ActivityIndicator
              size={'large'}
              color={'#0393c7'}
            />
          )}
        </View>
      )}

      <FlatList
        data={visitas}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisita}
        onRequestClose={() => {
          setModalVisita(!modalVisita);
        }}
      >
        <ImageBackground
          source={require('~/assets/Backgroundblack.jpg')}
          style={{ height: '110%', alignItems: 'center' }}
        >
          <View
            style={{
              backgroundColor: 'white',
              marginTop: 20,
              width: '95%',
              borderTopEndRadius: 20,
              borderTopStartRadius: 20,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                marginLeft: 10,
                marginRight: 10,
                marginTop: 20,
                borderBottomWidth: 2,
                borderBottomColor: '#dadada',
              }}
              onPress={() => {
                setModalVisita(false);
              }}
            >
              <Icone
                size={20}
                name="arrow-left"
                color="black"
              />
              <Text
                style={{
                  marginLeft: 30,
                  fontStyle: 'Normal',
                  fontWeight: '700',
                  color: 'black',
                  fontSize: 15,
                }}
              >
                Iniciar rota
              </Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                borderBottomWidth: 2,
                borderBottomColor: '#dadada',
                paddingRight: 70,
                paddingBottom: 10,
                marginTop: 10,
              }}
            >
              <Text style={{ fontWeight: 'bold', marginLeft: 20 }}>
                Cliente:{' '}
              </Text>
              <Text>{cliente}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginTop: 15,
                borderBottomColor: '#dadada',
                paddingRight: 70,
                paddingBottom: 10,
              }}
            >
              <Text style={{ fontWeight: 'bold', marginLeft: 20 }}>Data: </Text>
              <Text>{dataVisita}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                borderBottomWidth: 2,
                borderBottomColor: '#dadada',
                paddingRight: 70,
                paddingBottom: 10,
              }}
            >
              <Text style={{ fontWeight: 'bold', marginLeft: 20 }}>
                Horário:{' '}
              </Text>
              <Text>{horarioVista}</Text>
            </View>

            <View />
            {button === true && (
              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: '#0393c7',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  height: 90,
                }}
              >
                <TouchableOpacity onPress={check}>
                  <Image
                    resizeMode="contain"
                    style={{ height: 20 }}
                    source={require('~/icons/gerarrota.png')}
                  />
                </TouchableOpacity>
              </View>
            )}
            {button === false && (
              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: '#0393c7',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  height: 90,
                }}
              >
                <ActivityIndicator
                  size={'large'}
                  color="white"
                />
              </View>
            )}
          </View>
        </ImageBackground>
      </Modal>
    </Container>
  );
}

export const styles = StyleSheet.create({
  txtButton: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

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

//fletList

const Containerflet = styled.View`
  align-items: center;
`;
const ContainerInfo = styled.View`
  width: 90%;
  border-width: 1px;
  border-color: #1cade2;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TxtTituloFletList = styled.Text`
  color: ${(props) => props.theme.color};
  font-weight: bold;
`;
