import React, { useCallback, useEffect, useState } from 'react';
import { AlertNotificationRoot } from 'react-native-alert-notification';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { AntDesign, Feather } from '@expo/vector-icons';
import Icone from '@expo/vector-icons/FontAwesome5';
import styled from 'styled-components';

import Api from '~/services/Api';

export default function RelatorioDePonto() {
  const navigation = useNavigation();

  const [relatorios, setRelatorios] = useState();

  async function getRelatorio() {
    const res = await Api.getRelatoriodePontos();
    setRelatorios(res);
  }

  useEffect(() => {
    getRelatorio();
  }, []);

  useEffect(() => {
    async function delet() {
      await AsyncStorage.removeItem('@Fun');
      await AsyncStorage.removeItem('@inici');
      await AsyncStorage.removeItem('@fim');
    }
    delet();
  }, []);

  const renderItem = useCallback((relatorio) => {
    async function handleClickItem() {
      await AsyncStorage.setItem('@Fun', relatorio.item.funcionario);
      await AsyncStorage.setItem('@inici', relatorio.item.data_inicial);
      await AsyncStorage.setItem('@fim', relatorio.item.data_final);
      await AsyncStorage.setItem('@stat', relatorio.item.status);
      await AsyncStorage.setItem('@assinat', relatorio.item.assinatura);
      await AsyncStorage.setItem('@dat', relatorio.item.date);

      navigation.navigate('FechamentoFolha');
    }

    return (
      <ContainerFlet onPress={handleClickItem}>
        <ContainerData>
          <TxtData>
            {relatorio.item.data_inicial} / {relatorio.item.data_final}
          </TxtData>
        </ContainerData>
        <ContainerBody>
          {relatorio.item.status == 'Aprovado' && (
            <Feather
              color={'#555555'}
              name={'check-circle'}
              size={40}
            />
          )}
          {relatorio.item.status == 'Pendente' && (
            <AntDesign
              color={'#555555'}
              name={'closecircleo'}
              size={40}
            />
          )}
          <ContainerTxt>
            {relatorio.item.status == 'Pendente' && (
              <Title>Relatório pendente</Title>
            )}
            {relatorio.item.status == 'Aprovado' && (
              <Title>Relatório aprovado</Title>
            )}
            {relatorio.item.status == 'Reprovado' && (
              <Title>Relatório reprovado</Title>
            )}

            {relatorio.item.assinatura == 'n' && (
              <Description>Assinatura não coletado.</Description>
            )}
            {relatorio.item.assinatura !== 'n' && (
              <Description>Assinatura coletado.</Description>
            )}
          </ContainerTxt>
        </ContainerBody>
      </ContainerFlet>
    );
  });

  return (
    <Contaier>
      <AlertNotificationRoot>
        <ContainerHeaderTitulo>
          <TxtTituloHeader>Relatório de Ponto</TxtTituloHeader>
        </ContainerHeaderTitulo>
        <ContainerIcon>
          <ContainerButtonBack onPress={() => navigation.goBack()}>
            <Icone
              size={17}
              name="arrow-left"
              color="white"
            />
          </ContainerButtonBack>
        </ContainerIcon>
        {relatorios && (
          <ListaFlet
            data={relatorios}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
          />
        )}
      </AlertNotificationRoot>
    </Contaier>
  );
}
const Contaier = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;
const ContainerHeaderTitulo = styled.View`
  background-color: #1cade2;
  align-items: center;
`;

const ContainerIcon = styled.View`
  position: absolute;
  margin-top: 20px;
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

//flatList

const ListaFlet = styled.FlatList`
  margin-top: 18px;
`;

const ContainerFlet = styled.TouchableOpacity`
  width: 100%;
  border-bottom-width: 1px;
  padding-bottom: 9px;
  border-color: #adadad;
`;

const ContainerData = styled.View`
  flex-direction: row;
  margin-top: 10px;
  margin-left: 20px;
`;

const TxtData = styled.Text`
  font-size: 12px;
  line-height: 20px;
  color: #0393c7;
  font-weight: bold;
`;

const ContainerBody = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 18px;
`;

const ContainerTxt = styled.View`
  justify-content: space-between;
  margin-left: 10px;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  color: ${(props) => props.theme.color};
`;

const Description = styled.Text`
  font-size: 12px;
  line-height: 16px;
  color: #adadad;
`;
