import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
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

import { Entypo, Feather } from '@expo/vector-icons';
import Icone from '@expo/vector-icons/FontAwesome5';
import styled from 'styled-components/native';

import { DialogSuccess } from '~/components/DialogSuccess';
import Api from '~/services/Api';

export default function RelatorioDeAtestado() {
  const [infos, setInfos] = useState(['1', '2', '3', '4', '5']);
  const [modalimg, setModalimg] = useState(false);
  const [button, setButton] = useState(true);

  const [loadd, setLoadd] = useState(false);

  const [lista, setLista] = useState();
  const [pesquisa, setPesquisa] = useState();
  const [pesquisaData, setPesquisaData] = useState();
  const [listaPesquisa, setListaPesquisa] = useState();

  const [pis, setPis] = useState();
  const [data, setData] = useState();
  const [entrada1, setEntrada1] = useState(null);
  const [saida1, setSaida1] = useState(null);
  const [entrada2, setEntrada2] = useState(null);
  const [saida2, setSaida2] = useState(null);
  const [entrada3, setEntrada3] = useState(null);
  const [saida3, setSaida3] = useState(null);
  const [entrada4, setEntrada4] = useState(null);
  const [saida4, setSaida4] = useState(null);
  const [entrada5, setEntrada5] = useState(null);
  const [saida5, setSaida5] = useState(null);
  const [entrada6, setEntrada6] = useState(null);
  const [saida6, setSaida6] = useState(null);
  const [entrada7, setEntrada7] = useState(null);
  const [saida7, setSaida7] = useState(null);
  const [entrada8, setEntrada8] = useState(null);
  const [saida8, setSaida8] = useState(null);
  const [entrada9, setEntrada9] = useState(null);
  const [saida9, setSaida9] = useState(null);
  const [entrada10, setEntrada10] = useState(null);
  const [saida10, setSaida10] = useState(null);

  const [modalDataInicial, setModalDataInicial] = useState(false);
  const [modalDataFinal, setModalDataFinal] = useState(false);
  const [date, setDate] = useState(new Date());

  const [funcionarios, setFuncionarios] = useState('Funcionarios');

  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [funcionario, setFuncionario] = useState('');
  const [load, setLoad] = useState(true);
  const [loadSec, setLoadSec] = useState(false);

  useEffect(() => {
    async function getFuncinarios() {
      const res = await Api.getAllFuncionarios();
      setFuncionarios(res);
    }
    getFuncinarios();
  }, []);

  const edicao = async () => {
    const res = Api.editPonto(
      entrada1,
      saida1,
      entrada2,
      saida2,
      entrada3,
      saida3,
      entrada4,
      saida4,
      entrada5,
      saida5,
      entrada6,
      saida6,
      entrada7,
      saida7,
      entrada8,
      saida8,
      entrada9,
      saida9,
      entrada10,
      saida10,
      pis,
      data,
    );
    if (res) {
      setModalimg(false);
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
      DialogSuccess('Ponto Alterado com sucesso');
    }
  };
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

  const navigation = useNavigation();

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
      console.log('nao faz nd');
    } else {
      console.log(itemValue);
      AsyncStorage.setItem('@FuncionarioPes', JSON.stringify(itemValue));
      setLoadSec(true);
      setFuncionario(itemValue);
    }
  }

  const renderItem = useCallback((atestado) => {
    const handleClickItem = () => {
      setEntrada1(atestado.item.entrada1);
      setSaida1(atestado.item.saida1);
      setEntrada2(atestado.item.entrada2);
      setSaida2(atestado.item.saida2);
      setEntrada3(atestado.item.entrada3);
      setSaida3(atestado.item.saida3);
      setEntrada4(atestado.item.entrada4);
      setSaida4(atestado.item.saida4);
      setEntrada5(atestado.item.entrada5);
      setSaida5(atestado.item.saida5);
      setEntrada6(atestado.item.entrada6);
      setSaida6(atestado.item.saida6);
      setEntrada7(atestado.item.entrada7);
      setSaida7(atestado.item.saida7);
      setEntrada8(atestado.item.entrada8);
      setSaida8(atestado.item.saida8);
      setEntrada9(atestado.item.entrada9);
      setSaida9(atestado.item.saida9);
      setEntrada10(atestado.item.entrada10);
      setSaida10(atestado.item.saida10);

      setPis(atestado.item.pis);
      setData(atestado.item.data);

      setInfos([atestado.item.data, atestado.item.dia]);

      setModalimg(true);
    };
    return (
      <SafeAreaView
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#dadada',
          marginBottom: '5%',
        }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.containeratestado}
          onPress={handleClickItem}
        >
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
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            marginRight: 20,
            marginBottom: 30,
          }}
          onPress={handleClickItem}
        >
          <View>
            <Entypo
              name="pencil"
              size={20}
              color="#666666"
            />
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }, []);

  return (
    <Container>
      <AlertNotificationRoot>
        <ContainerHeaderTitulo>
          <TxtTituloHeader>Gerencia de Pontos</TxtTituloHeader>
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

        {!load && (
          <FlatList
            data={listaPesquisa}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
          />
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
          visible={modalimg}
          onRequestClose={() => {
            setModalimg(!modalimg);
          }}
        >
          <ImageBackground
            source={require('~/assets/Backgroundblack.jpg')}
            style={{ height: '110%', alignItems: 'center' }}
          >
            <KeyboardAvoidingView
              keyboardVerticalOffset={20}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
                  setModalimg(false);
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
                  Edi????o do ponto
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  marginTop: 15,
                  borderBottomWidth: 2,
                  borderBottomColor: '#dadada',
                  paddingRight: 70,
                  paddingBottom: 10,
                }}
              >
                <Text style={{ fontWeight: 'bold', marginLeft: 20 }}>
                  PONTOS:{' '}
                </Text>

                <TextInputMask
                  style={styles.txtInputentrada}
                  placeholder=""
                  value={entrada1}
                  onChangeText={setEntrada1}
                  options={{ mask: '99:99', maskType: 'BRL' }}
                  type="custom"
                />

                <TextInputMask
                  style={styles.txtInputentrada}
                  placeholder=""
                  value={saida1}
                  onChangeText={setSaida1}
                  options={{ mask: '99:99', maskType: 'BRL' }}
                  type="custom"
                />

                <TextInputMask
                  style={styles.txtInputentrada}
                  placeholder=""
                  value={entrada2}
                  onChangeText={setEntrada2}
                  options={{ mask: '99:99', maskType: 'BRL' }}
                  type="custom"
                />

                <TextInputMask
                  style={styles.txtInputentrada}
                  placeholder=""
                  value={saida2}
                  onChangeText={setSaida2}
                  options={{ mask: '99:99', maskType: 'BRL' }}
                  type="custom"
                />

                <TextInputMask
                  style={styles.txtInputentrada}
                  placeholder=""
                  value={entrada3}
                  onChangeText={setEntrada3}
                  options={{ mask: '99:99', maskType: 'BRL' }}
                  type="custom"
                />

                <TextInputMask
                  style={styles.txtInputentrada}
                  placeholder=""
                  value={saida3}
                  onChangeText={setSaida3}
                  options={{ mask: '99:99', maskType: 'BRL' }}
                  type="custom"
                />

                <TextInputMask
                  style={styles.txtInputentrada}
                  placeholder=""
                  value={entrada4}
                  onChangeText={setEntrada4}
                  options={{ mask: '99:99', maskType: 'BRL' }}
                  type="custom"
                />

                <TextInputMask
                  style={styles.txtInputentrada}
                  placeholder=""
                  value={saida4}
                  onChangeText={setSaida4}
                  options={{ mask: '99:99', maskType: 'BRL' }}
                  type="custom"
                />

                <TextInputMask
                  style={styles.txtInputentrada}
                  placeholder=""
                  value={entrada5}
                  onChangeText={setEntrada5}
                  options={{ mask: '99:99', maskType: 'BRL' }}
                  type="custom"
                />

                <TextInputMask
                  style={styles.txtInputentrada}
                  placeholder=""
                  value={saida5}
                  onChangeText={setSaida5}
                  options={{ mask: '99:99', maskType: 'BRL' }}
                  type="custom"
                />

                <TextInputMask
                  style={styles.txtInputentrada}
                  placeholder=""
                  value={entrada6}
                  onChangeText={setEntrada6}
                  options={{ mask: '99-99', maskType: 'BRL' }}
                  type="custom"
                />

                <TextInputMask
                  style={styles.txtInputentrada}
                  placeholder=""
                  value={saida6}
                  onChangeText={setSaida6}
                  options={{ mask: '99-99', maskType: 'BRL' }}
                  type="custom"
                />

                <TextInputMask
                  style={styles.txtInputentrada}
                  placeholder=""
                  value={entrada7}
                  onChangeText={setEntrada7}
                  options={{ mask: '99-99', maskType: 'BRL' }}
                  type="custom"
                />

                <TextInputMask
                  style={styles.txtInputentrada}
                  placeholder=""
                  value={saida7}
                  onChangeText={setSaida7}
                  options={{ mask: '99-99', maskType: 'BRL' }}
                  type="custom"
                />

                <TextInputMask
                  style={styles.txtInputentrada}
                  placeholder=""
                  value={entrada8}
                  onChangeText={setEntrada8}
                  options={{ mask: '99-99', maskType: 'BRL' }}
                  type="custom"
                />

                <TextInputMask
                  style={styles.txtInputentrada}
                  placeholder=""
                  value={saida8}
                  onChangeText={setSaida8}
                  options={{ mask: '99-99', maskType: 'BRL' }}
                  type="custom"
                />

                <TextInputMask
                  style={styles.txtInputentrada}
                  placeholder=""
                  value={entrada9}
                  onChangeText={setEntrada9}
                  options={{ mask: '99-99', maskType: 'BRL' }}
                  type="custom"
                />

                <TextInputMask
                  style={styles.txtInputentrada}
                  placeholder=""
                  value={saida9}
                  onChangeText={setSaida9}
                  options={{ mask: '99-99', maskType: 'BRL' }}
                  type="custom"
                />

                <TextInputMask
                  style={styles.txtInputentrada}
                  placeholder=""
                  value={entrada10}
                  onChangeText={setEntrada10}
                  options={{ mask: '99-99', maskType: 'BRL' }}
                  type="custom"
                />

                <TextInputMask
                  style={styles.txtInputentrada}
                  placeholder=""
                  value={saida10}
                  onChangeText={setSaida10}
                  options={{ mask: '99-99', maskType: 'BRL' }}
                  type="custom"
                />
              </View>

              <View>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                  <Text style={{ fontWeight: 'bold', marginLeft: 20 }}>
                    DATA:{' '}
                  </Text>
                  <Text>
                    {infos[0].substr(8, 9)}/{infos[0].substr(5, 2)}/
                    {infos[0].substr(0, 4)}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    borderBottomWidth: 2,
                    borderBottomColor: '#dadada',
                    paddingBottom: 10,
                  }}
                >
                  <Text style={{ fontWeight: 'bold', marginLeft: 20 }}>
                    DIA:{' '}
                  </Text>
                  <Text>{infos[1]}</Text>
                </View>
              </View>
              <View style={{ alignItems: 'center' }} />

              <View />
              {button === true && (
                <TouchableOpacity
                  onPress={edicao}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#0393c7',
                    flexDirection: 'row',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      marginRight: 25,
                    }}
                  >
                    Alterar
                  </Text>
                  <Image
                    style={{
                      width: 25,
                      height: 45,
                      justifyContent: 'center',
                      marginTop: 20,
                      marginBottom: 20,
                    }}
                    source={require('~/assets/bater-ponto.png')}
                  />
                </TouchableOpacity>
              )}

              {button === false && (
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    backgroundColor: '#0393c7',
                    width: '100%',
                    height: 80,
                    justifyContent: 'center',
                  }}
                >
                  <ActivityIndicator
                    size={'large'}
                    color="white"
                  />
                </TouchableOpacity>
              )}
            </KeyboardAvoidingView>
          </ImageBackground>
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
