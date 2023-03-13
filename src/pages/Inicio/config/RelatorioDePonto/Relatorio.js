import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AlertNotificationRoot } from 'react-native-alert-notification';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';
import Icone from '@expo/vector-icons/FontAwesome5';
import styled from 'styled-components/native';

import Api from '~/services/Api';

export default function FechamentoDeFolha() {
  const navigation = useNavigation();

  const [loadd, setLoadd] = useState(false);

  const [lista, setLista] = useState();
  const [listaPesquisa, setListaPesquisa] = useState();

  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [funcionario, setFuncionario] = useState('');
  const [status, setStatus] = useState();
  const [date, setDate] = useState();
  const [assinatura, setAssinatura] = useState();

  const [load, setLoad] = useState(true);
  const [loadSec, setLoadSec] = useState(false);

  useEffect(() => {
    async function getInfos() {
      const fun = await AsyncStorage.getItem('@Fun');
      const inici = await AsyncStorage.getItem('@inici');
      const fim = await AsyncStorage.getItem('@fim');
      const stat = await AsyncStorage.getItem('@stat');
      const dat = await AsyncStorage.getItem('@dat');
      const assinatura = await AsyncStorage.getItem('@assinat');

      setAssinatura(assinatura);
      setDate(dat);
      setStatus(stat);
      setDataInicial(inici);
      setDataFinal(fim);
      setFuncionario(fun);
    }
    getInfos();
  }, []);

  const onStart = async () => {
    if (funcionario) {
      if ((!dataInicial, !dataFinal)) {
        let dataFinal = new Date();
        let dataInicial = new Date();
        dataInicial.setMonth(dataFinal.getMonth() - 1);
        setLoad(true);
        const jso = await Api.getGestorhourss(
          funcionario,
          dataInicial,
          dataFinal,
        );
        setLoadd(true);
        setLoad(false);
        setLoadSec(false);
        await setLista(jso);
        await setListaPesquisa(jso);
      } else {
        setLoad(true);
        const jso = await Api.getGestorhourss(
          funcionario,
          dataInicial,
          dataFinal,
        );
        setLoad(false);
        setLoadSec(false);
        await setLista(jso);
        await setListaPesquisa(jso);
      }
    }
  };

  useEffect(() => {
    onStart();
  }, [funcionario, dataFinal]);

  const renderItem = useCallback((atestado) => {
    return (
      <ContainerFlet>
        <View style={styles.containeratestado}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.data}>
              Data: {atestado.item.data.substr(8, 9)}/
              {atestado.item.data.substr(5, 2)}/
              {atestado.item.data.substr(0, 4)}
            </Text>
          </View>

          <View style={styles.item}>
            <Feather
              color={'#555555'}
              name={'check-circle'}
              size={40}
            />
            <View style={styles.conteudo}>
              <Text style={styles.titulo}>Ponto Inserido</Text>
              <Text style={styles.descricao}>
                {atestado.item.entrada1} - {atestado.item.saida1} -{' '}
                {atestado.item.entrada2} - {atestado.item.saida2} -{' '}
                {atestado.item.entrada3} - {atestado.item.saida3} -{' '}
                {atestado.item.entrada4} - {atestado.item.saida4}-{' '}
                {atestado.item.entrada5} - {atestado.item.saida5} -{' '}
                {atestado.item.entrada6} - {atestado.item.saida6} -{' '}
                {atestado.item.entrada7} - {atestado.item.saida7} -{' '}
                {atestado.item.entrada8} - {atestado.item.saida8}-{' '}
                {atestado.item.entrada9} - {atestado.item.saida9} -{' '}
                {atestado.item.entrada10} - {atestado.item.saida10}
              </Text>
            </View>
          </View>
        </View>
      </ContainerFlet>
    );
  }, []);

  const Header = () => (
    <View>
      <ContainerTituloHeaderInfos>
        <TxtTitulosInfos>Informações</TxtTitulosInfos>
      </ContainerTituloHeaderInfos>

      <ContainerHeaderInfos>
        <TxtInfos>Funcionário</TxtInfos>
        <TxtInfos>{funcionario}</TxtInfos>
      </ContainerHeaderInfos>
      <ContainerHeaderInfos>
        <TxtInfos>Criando em</TxtInfos>
        <TxtInfos>{date}</TxtInfos>
      </ContainerHeaderInfos>
      <ContainerHeaderInfos>
        <TxtInfos>Assinatura</TxtInfos>
        {assinatura == 'n' && <TxtInfos>Não coletada</TxtInfos>}
        {assinatura !== 'n' && <TxtInfos>Coletada</TxtInfos>}
      </ContainerHeaderInfos>
      <ContainerHeaderInfos>
        <TxtInfos>Status</TxtInfos>
        <TxtInfos>{status}</TxtInfos>
      </ContainerHeaderInfos>
      <ContainerHeaderInfos>
        <Button>
          <TxtButton>Aprovar</TxtButton>
        </Button>
        <Button>
          <TxtButton>Reprovar</TxtButton>
        </Button>
      </ContainerHeaderInfos>
    </View>
  );

  return (
    <Container>
      <AlertNotificationRoot>
        <ContainerHeaderTitulo>
          <TxtTituloHeader>Assinatura digital do relatório</TxtTituloHeader>
        </ContainerHeaderTitulo>
        <View style={{ position: 'absolute', marginTop: 20 }}>
          <ContainerButtonBack onPress={() => navigation.goBack()}>
            <Icone
              size={17}
              name="arrow-left"
              color="white"
            />
          </ContainerButtonBack>
        </View>
        <ContainerTit>
          <TxtTit>
            Apuração de{'\n'}
            {dataInicial} a {dataFinal}{' '}
          </TxtTit>
        </ContainerTit>

        <FlatList
          data={listaPesquisa}
          renderItem={renderItem}
          ListHeaderComponent={Header}
          keyExtractor={(item, index) => index}
        />

        {loadSec && (
          <ActivityIndicator
            color={'#0393c7'}
            size={'large'}
          />
        )}
      </AlertNotificationRoot>
    </Container>
  );
}
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

//header ----------------------

const ContainerHeaderTitulo = styled.View`
  background-color: #1cade2;
  align-items: center;
`;
const TxtTituloHeader = styled.Text`
  color: white;
  padding: 15px;
  font-size: 20px;
  font-weight: bold;
`;

const ContainerButtonBack = styled.TouchableOpacity`
  flex-direction: row;
  position: absolute;
  padding-left: 20px;
`;

//headerinfos

const ContainerTit = styled.View`
  background-color: #1cade2;
  width: 95%;
  align-self: center;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
`;

const TxtTit = styled.Text`
  text-align: center;
  font-size: 17px;
  font-weight: bold;
  color: white;
  margin-bottom: 10px;
`;

const ContainerTituloHeaderInfos = styled.View`
  align-self: center;
  width: 95%;
  border-width: 1px;
  border-color: #6a6d72;
  margin-top: 20px;
`;

const TxtTitulosInfos = styled.Text`
  margin: 15px;
  font-size: 17px;
  font-weight: bold;
  color: #555555;
`;

const ContainerHeaderInfos = styled.View`
  align-self: center;
  justify-content: space-between;
  width: 95%;
  border-width: 1px;
  border-color: #6a6d72;
  flex-direction: row;
`;

const TxtInfos = styled.Text`
  margin: 15px;
  font-weight: bold;
  color: #555555;
`;

const Button = styled.TouchableOpacity`
  margin: 7px;
  width: 40%;
  background-color: #1cade2;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

const TxtButton = styled.Text`
  margin: 8px;
  font-size: 18px;
  font-weight: bold;
  color: white;
`;

//FlaList

const ContainerFlet = styled.SafeAreaView`
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: #dadada;
  margin-bottom: 5%;
`;

const styles = StyleSheet.create({
  containeratestado: {
    flex: 1,
    marginTop: '3%',
    marginLeft: 10,
    marginRight: 10,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  conteudo: {
    marginTop: 2,
    marginBottom: 8,
  },
  data: {
    fontSize: 12,
    color: '#0393c7',
    fontWeight: 'bold',
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#555555',
    maxWidth: '95%',
  },
  descricao: {
    fontSize: 12,
    color: '#555555',
  },

  placeholderInput: {
    marginTop: 10,
    fontStyle: 'Normal',
    fontWeight: '400',
    color: 'black',
    fontSize: 12,
    lineHeight: 16,
    borderWidth: 2,
    borderColor: '#0393c7',
    borderRadius: 5,
    width: '90%',
    padding: 9,
  },

  txtInput: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginLeft: 20,
    marginRight: 10,
    marginBottom: 20,
    width: '90%',
    backgroundColor: 'white',
  },

  txtInputentrada: {
    marginLeft: 10,
  },
});
