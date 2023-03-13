import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { TextInputMask } from 'react-native-masked-text';

import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

import { AntDesign, Feather } from '@expo/vector-icons';
import Icone from '@expo/vector-icons/FontAwesome5';
import styled from 'styled-components/native';

import { DialogSuccess } from '~/components/DialogSuccess';
import Api from '~/services/Api';

export default function FechamentoDeFolha() {
  const navigation = useNavigation();

  const [loadd, setLoadd] = useState(false);

  const [lista, setLista] = useState();
  const [pesquisa, setPesquisa] = useState();
  const [pesquisaData, setPesquisaData] = useState();
  const [listaPesquisa, setListaPesquisa] = useState();

  const [modalDataInicial, setModalDataInicial] = useState(false);
  const [modalDataFinal, setModalDataFinal] = useState(false);
  const [date, setDate] = useState(new Date());

  const [funcionarios, setFuncionarios] = useState(funcionario);

  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [funcionario, setFuncionario] = useState('');
  const [load, setLoad] = useState(true);
  const [loadSec, setLoadSec] = useState(false);

  const [modalPeriodo, setModalPeriodo] = useState(false);

  useEffect(() => {
    async function getFuncinarios() {
      const res = await Api.getAllFuncionarios();
      setFuncionarios(res);
    }
    getFuncinarios();
  }, []);

  const onChangeInicio = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setModalDataInicial(Platform.OS === 'ios');
    setDataInicial(currentDate);
    AsyncStorage.setItem('@DataInicial', JSON.stringify(currentDate));
    setModalDataFinal(true);
  };

  const onChangeFinal = (event, selectedDate) => {
    setModalDataFinal(false);
    setLoadSec(true);
    const currentDate = selectedDate || date;
    setModalDataInicial(Platform.OS === 'ios');
    setDataFinal(currentDate);
    AsyncStorage.setItem('@DataFinal', JSON.stringify(currentDate));
  };

  const onStart = async () => {
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
  };

  useEffect(() => {
    onStart();
  }, [funcionario, dataFinal]);

  async function handlePerson(itemValue) {
    if (itemValue == 'Option 1') {
    } else {
      const fun = AsyncStorage.setItem(
        '@FuncionarioPes',
        JSON.stringify(itemValue),
      );
      setLoadSec(true);
      setFuncionario(itemValue);
    }
  }

  async function handleClose() {
    setModalPeriodo(true);
  }
  async function handleGerator() {
    setTimeout(() => {
      DialogSuccess('Fechamento de Periódo enviado');
      setTimeout(() => {
        navigation.navigate('Home');
      }, 2500);
    }, 1000);
  }

  const renderItem = useCallback((atestado) => {
    return (
      <SafeAreaView
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#dadada',
          marginBottom: '5%',
        }}
      >
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
              <Text
                style={styles.titulo}
              >{`${atestado.item.funcionario}`}</Text>
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
      </SafeAreaView>
    );
  }, []);

  return (
    <Container>
      <AlertNotificationRoot>
        <ContainerHeaderTitulo>
          <TxtTituloHeader>Encerrar o período de fechamento</TxtTituloHeader>
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
        {listaPesquisa && (
          <ContainerSelectFuncion>
            <Picker
              selectedValue={pesquisa}
              mode={'dropdown'}
              onValueChange={(itemValue) => handlePerson(itemValue)}
            >
              <Picker.Item
                label={'Funcionario'}
                value="Option 1"
              />
              {funcionarios.map((item, index) => (
                <Picker.Item
                  key={item.id}
                  label={item.funcionario}
                  value={item.funcionario}
                />
              ))}
            </Picker>
          </ContainerSelectFuncion>
        )}
        {loadd === false && (
          <ContainerBody>
            <Image
              resizeMode="contain"
              style={{ width: 200, marginTop: '35%' }}
              source={require('~/icons/historicodeponto.png')}
            />
            <ActivityIndicator
              color={'#1CADE2'}
              size={'large'}
            />
          </ContainerBody>
        )}

        {listaPesquisa && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TextInputMask
              style={styles.txtInput}
              keyboardType="number-pad"
              placeholder="Pesquisar por Data"
              value={pesquisaData}
              onPressIn={() => {
                setModalDataInicial(true);
              }}
              onChangeText={setPesquisaData}
              options={{ mask: '9999-99-99', maskType: 'BRL' }}
              type="custom"
            />
          </View>
        )}
        {modalDataInicial && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeInicio}
          />
        )}
        {modalDataFinal && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeFinal}
          />
        )}

        {!load && funcionario && dataInicial && dataFinal && (
          <FlatList
            data={listaPesquisa}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
          />
        )}

        {funcionario && dataInicial && dataFinal && listaPesquisa && (
          <ButtonFolha onPress={handleClose}>
            <TxtButton>Gerar período{'\n'}de fechamento</TxtButton>
          </ButtonFolha>
        )}
        {listaPesquisa && (
          <ContainerMsg>
            {!funcionario && <TextMsg>Selecione um Funcionario</TextMsg>}
            {!dataInicial && !dataFinal && funcionario && (
              <TextMsg>Selecione a data</TextMsg>
            )}
          </ContainerMsg>
        )}
        {loadSec && (
          <ActivityIndicator
            color={'#1CADE2'}
            size={'large'}
          />
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalPeriodo}
          onRequestClose={() => {
            setModalPeriodo(!setModalPeriodo);
          }}
        >
          <ContainerModal>
            <TitleModal>
              <TitleTxt>Nova Assinatura Eletrônica de Cartão Ponto</TitleTxt>
              <TouchableOpacity
                onPress={() => {
                  setModalPeriodo(false);
                }}
              >
                <AntDesign
                  color={'#555555'}
                  name={'close'}
                  size={20}
                />
              </TouchableOpacity>
            </TitleModal>
            <ModalDescritption>
              <ModalPrimare>
                <TxtPrimare>Descrição</TxtPrimare>
              </ModalPrimare>
              <ModalSegund>
                <TxtSeund>Apuração {funcionario}</TxtSeund>
              </ModalSegund>
            </ModalDescritption>

            <ModalDescritption>
              <ModalPrimare>
                <TxtPrimare>Período</TxtPrimare>
              </ModalPrimare>
              <ModalSegund>
                <TxtSeund>
                  {JSON.stringify(dataInicial).substr(9, 2)}/
                  {JSON.stringify(dataInicial).substr(6, 2)}/
                  {JSON.stringify(dataInicial).substr(1, 4)} -{' '}
                  {JSON.stringify(dataFinal).substr(9, 2)}/
                  {JSON.stringify(dataFinal).substr(6, 2)}/
                  {JSON.stringify(dataFinal).substr(1, 4)}
                </TxtSeund>
              </ModalSegund>
            </ModalDescritption>

            <ModalDescritption>
              <ModalPrimare>
                <TxtPrimare>Funcionário</TxtPrimare>
              </ModalPrimare>
              <ModalSegund>
                <TxtSeund>{funcionario}</TxtSeund>
              </ModalSegund>
            </ModalDescritption>

            <FooterModal>
              <ButtonGerar>
                <ButtonGerarTxt onPress={handleGerator}>Gerar</ButtonGerarTxt>
              </ButtonGerar>
              <ButtonCancel
                onPress={() => {
                  setModalPeriodo(false);
                }}
              >
                <ButtonCancTxt>Cancelar</ButtonCancTxt>
              </ButtonCancel>
            </FooterModal>
          </ContainerModal>
        </Modal>
      </AlertNotificationRoot>
    </Container>
  );
}
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

//header ----------------------

const ContainerSelectFuncion = styled.View`
  border-width: 2px;
  margin-top: 10px;
  border-radius: 10px;
  background-color: white;
  justify-content: center;
  width: 90%;
  margin-left: 6%;
  margin-bottom: 18px;
`;

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

//Body -------------

const ContainerBody = styled.View`
  align-items: center;
  position: absolute;
  width: 100%;
  padding-bottom: 50%;
`;

const ContainerMsg = styled.View`
  align-items: center;
  margin-top: 70px;
`;

const TextMsg = styled.Text`
  font-size: 20px;
`;

const ButtonFolha = styled.TouchableOpacity`
  position: absolute;
  bottom: 40px;
  right: 40px;
  background-color: #1cade2;
  border-radius: 10px;
`;

const TxtButton = styled.Text`
  font-size: 15px;
  color: white;
  padding: 7px;
  padding-left: 10px;
  padding-right: 10px;
  font-weight: bold;
`;

//MODALL ------------

const ContainerModal = styled.View`
  margin-top: 40%;
  align-self: center;
  justify-content: center;
  background-color: white;
  width: 95%;
`;

const TitleModal = styled.View`
  width: 100%;
  background-color: #eeeeee;
  border-bottom-width: 1px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const TitleTxt = styled.Text`
  padding: 10px;
  font-weight: bold;
`;

const ModalDescritption = styled.View`
  flex-direction: row;
`;

const ModalPrimare = styled.View`
  width: 30%;
  align-items: flex-end;
  margin-top: 20px;
`;
const TxtPrimare = styled.Text`
  font-weight: bold;
  font-size: 17px;
`;

const ModalSegund = styled.View`
  border-width: 1px;
  width: 60%;
  margin-top: 20px;
  margin-left: 20px;
  background-color: #dddddd;
`;

const TxtSeund = styled.Text`
  padding: 5px;
`;

const FooterModal = styled.View`
  background-color: #dddddd;
  flex-direction: row;
  border-top-width: 1px;
  margin-top: 40px;
  justify-content: space-between;
`;

const ButtonGerar = styled.TouchableOpacity`
  margin: 15px;
  background-color: #1cade2;
`;

const ButtonGerarTxt = styled.Text`
  padding: 10px;
  font-weight: bold;
  color: white;
  padding-left: 40px;
  padding-right: 40px;
`;

const ButtonCancel = styled.TouchableOpacity`
  margin: 15px;
  background-color: #1cade2;
`;

const ButtonCancTxt = styled.Text`
  padding: 10px;
  font-weight: bold;
  color: white;
  padding-left: 40px;
  padding-right: 40px;
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
