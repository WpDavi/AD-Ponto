import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { TextInputMask } from 'react-native-masked-text';

import { useNavigation } from '@react-navigation/native';

import { Entypo, Feather } from '@expo/vector-icons';
import Icone from '@expo/vector-icons/FontAwesome5';
import styled from 'styled-components/native';

import { DialogSuccess } from '~/components/DialogSuccess';
import Api from '~/services/Api';
import { cleanText } from '~/utils/text';

export default function RelatorioDeAtestado() {
  const [infos, setInfos] = useState(['1', '2', '3', '4', '5']);
  const [modalimg, setModalimg] = useState(false);
  const [button, setButton] = useState(true);

  const [informacao, setInformacao] = useState();
  const [lista, setLista] = useState();
  const [pesquisa, setPesquisa] = useState();
  const [pesquisaData, setPesquisaData] = useState();
  const [listaPesquisa, setListaPesquisa] = useState();

  const [txtInput, setTxtInput] = useState(true);

  const [token, setToken] = useState('');

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

  const [entrada11, setEntrada11] = useState(null);
  const [saida11, setSaida11] = useState(null);
  const [entrada22, setEntrada22] = useState(null);
  const [saida22, setSaida22] = useState(null);
  const [entrada33, setEntrada33] = useState(null);
  const [saida33, setSaida33] = useState(null);
  const [entrada44, setEntrada44] = useState(null);
  const [saida44, setSaida44] = useState(null);
  const [entrada55, setEntrada55] = useState(null);
  const [saida55, setSaida55] = useState(null);
  const [entrada66, setEntrada66] = useState(null);
  const [saida66, setSaida66] = useState(null);
  const [entrada77, setEntrada77] = useState(null);
  const [saida77, setSaida77] = useState(null);
  const [entrada88, setEntrada88] = useState(null);
  const [saida88, setSaida88] = useState(null);
  const [entrada99, setEntrada99] = useState(null);
  const [saida99, setSaida99] = useState(null);
  const [entrada100, setEntrada100] = useState(null);
  const [saida100, setSaida100] = useState(null);

  const [obsentrada1, setObsentrada1] = useState(false);
  const [obsSaisa1, setObsSaisa1] = useState(false);
  const [obsentrada2, setObsentrada2] = useState(false);
  const [obsSaisa2, setObsSaisa2] = useState(false);
  const [obsentrada3, setObsentrada3] = useState(false);
  const [obsSaisa3, setObsSaisa3] = useState(false);
  const [obsentrada4, setObsentrada4] = useState(false);
  const [obsSaisa4, setObsSaisa4] = useState(false);
  const [obsentrada5, setObsentrada5] = useState(false);
  const [obsSaisa5, setObsSaisa5] = useState(false);
  const [obsentrada6, setObsentrada6] = useState(false);
  const [obsSaisa6, setObsSaisa6] = useState(false);
  const [obsentrada7, setObsentrada7] = useState(false);
  const [obsSaisa7, setObsSaisa7] = useState(false);
  const [obsentrada8, setObsentrada8] = useState(false);
  const [obsSaisa8, setObsSaisa8] = useState(false);
  const [obsentrada9, setObsentrada9] = useState(false);
  const [obsSaisa9, setObsSaisa9] = useState(false);
  const [obsentrada10, setObsentrada10] = useState(false);
  const [obsSaisa10, setObsSaisa10] = useState(false);

  const edicao = async () => {
    setButton(false);
    const assunto = 'Solicitação de edição de ponto';
    const msg = 'Um funcionario solicitou edição de ponto';
    for (let i in token) {
      const ress = await Api.createPushNotification(
        token[i].token_notification,
        assunto,
        msg,
      );
    }
    const res = Api.SolicitarEditPonto(
      entrada11,
      saida11,
      entrada22,
      saida22,
      entrada33,
      saida33,
      entrada44,
      saida44,
      entrada55,
      saida55,
      entrada66,
      saida66,
      entrada77,
      saida77,
      entrada88,
      saida88,
      entrada99,
      saida99,
      entrada100,
      saida100,
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
      obsentrada1,
      obsSaisa1,
      obsentrada2,
      obsSaisa2,
      obsentrada3,
      obsSaisa3,
      obsentrada4,
      obsSaisa4,
      obsentrada5,
      obsSaisa5,
      obsentrada6,
      obsSaisa6,
      obsentrada7,
      obsSaisa7,
      obsentrada8,
      obsSaisa8,
      obsentrada9,
      obsSaisa9,
      obsentrada10,
      obsSaisa10,
    );
    if (res) {
      setModalimg(false);
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
      DialogSuccess('Solicitação enviada com Sucesso');
    }
  };

  useEffect(() => {
    if (lista) {
      if (pesquisa === '') {
        setListaPesquisa(lista);
      } else {
        setListaPesquisa(
          lista.filter((item) => {
            if (item.pis.indexOf(pesquisa) > -1) {
              return true;
            } else {
              return false;
            }
          }),
        );
      }
    }
  }, [pesquisa]);

  useEffect(() => {
    if (lista) {
      if (pesquisaData === '') {
        setListaPesquisa(lista);
      } else {
        setListaPesquisa(
          lista.filter((item) => {
            if (item.data.indexOf(pesquisaData) > -1) {
              return true;
            } else {
              return false;
            }
          }),
        );
      }
    }
  }, [pesquisaData]);

  const navigation = useNavigation();

  useEffect(() => {
    const onStart = async () => {
      const ress = await Api.getGestor();
      const jso = await Api.getOnePont();
      const json = await Api.getInformacoesPessoais();
      await setInformacao(json);
      await setLista(jso);
      await setListaPesquisa(jso);
      setToken(ress);
    };
    onStart();
  }, []);

  const togle = () => {
    setTxtInput(!txtInput);
  };
  const closeModal = () => {
    setModalimg(!modalimg);
    setObsentrada1(false);
    setObsSaisa1(false);
    setObsentrada2(false);
    setObsSaisa2(false);
    setObsentrada3(false);
    setObsSaisa3(false);
    setObsentrada4(false);
    setObsSaisa4(false);
    setObsentrada5(false);
    setObsSaisa5(false);
    setObsentrada6(false);
    setObsSaisa6(false);
    setObsentrada7(false);
    setObsSaisa7(false);
    setObsentrada8(false);
    setObsSaisa8(false);
    setObsentrada9(false);
    setObsSaisa9(false);
    setObsentrada10(false);
    setObsSaisa7(false);
  };

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

      setEntrada11(atestado.item.entrada1);
      setSaida11(atestado.item.saida1);
      setEntrada22(atestado.item.entrada2);
      setSaida22(atestado.item.saida2);
      setEntrada33(atestado.item.entrada3);
      setSaida33(atestado.item.saida3);
      setEntrada44(atestado.item.entrada4);
      setSaida44(atestado.item.saida4);
      setEntrada55(atestado.item.entrada5);
      setSaida55(atestado.item.saida5);
      setEntrada66(atestado.item.entrada6);
      setSaida66(atestado.item.saida6);
      setEntrada77(atestado.item.entrada7);
      setSaida77(atestado.item.saida7);
      setEntrada88(atestado.item.entrada8);
      setSaida88(atestado.item.saida8);
      setEntrada99(atestado.item.entrada9);
      setSaida99(atestado.item.saida9);
      setEntrada100(atestado.item.entrada10);
      setSaida100(atestado.item.saida10);

      setObsentrada1(atestado.item.obs_entrada1);
      setObsSaisa1(atestado.item.obs_saida1);
      setObsentrada2(atestado.item.obs_entrada2);
      setObsSaisa2(atestado.item.obs_saida2);
      setObsentrada3(atestado.item.obs_entrada3);
      setObsSaisa3(atestado.item.obs_saida3);
      setObsentrada4(atestado.item.obs_entrada4);
      setObsSaisa4(atestado.item.obs_saida4);
      setObsentrada5(atestado.item.obs_entrada5);
      setObsSaisa5(atestado.item.obs_saida5);
      setObsentrada6(atestado.item.obs_entrada6);
      setObsSaisa6(atestado.item.obs_saida6);
      setObsentrada7(atestado.item.obs_entrada7);
      setObsSaisa7(atestado.item.obs_saida7);
      setObsentrada8(atestado.item.obs_entrada8);
      setObsSaisa8(atestado.item.obs_saida8);
      setObsentrada9(atestado.item.obs_entrada9);
      setObsSaisa9(atestado.item.obs_saida9);
      setObsentrada10(atestado.item.obs_entrada10);
      setObsSaisa10(atestado.item.obs_saida10);

      setPis(atestado.item.pis);
      setData(atestado.item.data);

      setInfos([atestado.item.data, atestado.item.dia]);

      setModalimg(true);
    };
    return (
      <View
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
              name={'check-circle'}
              size={40}
              color={'#555555'}
            />
            <View style={styles.conteudo}>
              <Text style={styles.titulo}>{'Ponto Inserido'}</Text>
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
      </View>
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
        {lista === null && (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              resizeMode="contain"
              style={{ width: 200, marginTop: '50%' }}
              source={require('~/icons/historicodeponto.png')}
            />
            <ActivityIndicator
              color={'#1CADE2'}
              size={'large'}
            />
          </View>
        )}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {listaPesquisa && (
            <TextInputMask
              style={styles.txtInput}
              placeholder="Pesquisar por Data"
              placeholderTextColor={'black'}
              value={pesquisaData}
              onChangeText={setPesquisaData}
              options={{ mask: '9999-99-99', maskType: 'BRL' }}
              type="custom"
            />
          )}
        </View>

        <FlatList
          data={listaPesquisa}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        />

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalimg}
          onRequestClose={closeModal}
        >
          <ConatinerModal>
            <ContainerModalSub>
              <ButtonBack onPress={closeModal}>
                <Icone
                  size={20}
                  name="arrow-left"
                  color="black"
                  style={{ marginLeft: 10 }}
                />
                <TxtButtonBack>
                  {infos[1]} - {infos[0].substr(8, 9)}/{infos[0].substr(5, 2)}/
                  {infos[0].substr(0, 4)}
                </TxtButtonBack>
              </ButtonBack>

              <ContainerTitulo>
                <Title>SOLICITAR EDIÇÃO PONTO DE: </Title>
              </ContainerTitulo>

              <ContainerInfo>
                <TxtEntrada>Entrada 1</TxtEntrada>
                <TextInputMask
                  style={styles.txtInputentrada}
                  keyboardType="numeric"
                  placeholder="Entrada 1"
                  onPressIn={() => {
                    setObsentrada1(true);
                  }}
                  value={entrada11}
                  onChangeText={setEntrada11}
                  options={{ mask: '99:99', maskType: 'BRL' }}
                  type="custom"
                />
              </ContainerInfo>
              {obsentrada1 && (
                <ContainerInfo>
                  <TextInput
                    style={{ padding: 10 }}
                    placeholder="Observações entrada 1"
                    value={obsentrada1}
                    onChangeText={(a) => setObsentrada1(a)}
                    onBlur={() => cleanText(obsentrada1, setObsentrada1)}
                  />
                </ContainerInfo>
              )}

              <ContainerInfo>
                <TxtEntrada>Saída 1</TxtEntrada>
                <TextInputMask
                  style={styles.txtInputentrada}
                  keyboardType="numeric"
                  placeholder="Saída 1"
                  onPressIn={() => {
                    setObsSaisa1(true);
                  }}
                  value={saida11}
                  onChangeText={setSaida11}
                  options={{ mask: '99:99', maskType: 'BRL' }}
                  type="custom"
                />
              </ContainerInfo>
              {obsSaisa1 && (
                <ContainerInfo>
                  <TextInput
                    style={{ padding: 10 }}
                    placeholder="Observações saida 1"
                    value={obsSaisa1}
                    onChangeText={(a) => setObsSaisa1(a)}
                    onBlur={() => cleanText(obsSaisa1, setObsSaisa1)}
                  />
                </ContainerInfo>
              )}

              <ContainerInfo>
                <TxtEntrada>Entrada 2</TxtEntrada>
                <TextInputMask
                  style={styles.txtInputentrada}
                  keyboardType="numeric"
                  placeholder="Entrada 2"
                  onPressIn={() => {
                    setObsentrada2(true);
                  }}
                  value={entrada22}
                  onChangeText={setEntrada22}
                  options={{ mask: '99:99', maskType: 'BRL' }}
                  type="custom"
                />
              </ContainerInfo>
              {obsentrada2 && (
                <ContainerInfo>
                  <TextInput
                    style={{ padding: 10 }}
                    placeholder="Observações entrada 2"
                    value={obsentrada2}
                    onChangeText={(a) => setObsentrada2(a)}
                    onBlur={() => cleanText(obsentrada2, setEntrada2)}
                  />
                </ContainerInfo>
              )}

              <ContainerInfo>
                <TxtEntrada>Saída 2</TxtEntrada>
                <TextInputMask
                  style={styles.txtInputentrada}
                  onPressIn={() => {
                    setObsSaisa2(true);
                  }}
                  keyboardType="numeric"
                  placeholder="Saída 2"
                  value={saida22}
                  onChangeText={setSaida22}
                  options={{ mask: '99:99', maskType: 'BRL' }}
                  type="custom"
                />
              </ContainerInfo>
              {obsSaisa2 && (
                <ContainerInfo>
                  <TextInput
                    style={{ padding: 10 }}
                    placeholder="Observações saida 2"
                    value={obsSaisa2}
                    onChangeText={(a) => setObsSaisa2(a)}
                    onBlur={() => cleanText(obsSaisa2, setObsSaisa2)}
                  />
                </ContainerInfo>
              )}

              {saida22 && (
                <ContainerInfos>
                  <ContainerInfo>
                    <TxtEntrada>Entrada 3</TxtEntrada>
                    <TextInputMask
                      style={styles.txtInputentrada}
                      onPressIn={() => {
                        setObsentrada3(true);
                      }}
                      keyboardType="numeric"
                      placeholder="Entrada 3"
                      value={entrada33}
                      onChangeText={setEntrada33}
                      options={{ mask: '99:99', maskType: 'BRL' }}
                      type="custom"
                    />
                  </ContainerInfo>
                  {obsentrada3 && (
                    <ContainerInfo>
                      <TextInput
                        style={{ padding: 10 }}
                        placeholder="Observações entrada 3"
                        value={obsentrada3}
                        onChangeText={(a) => setObsentrada3(a)}
                        onBlur={() => cleanText(obsentrada3, setObsentrada3)}
                      />
                    </ContainerInfo>
                  )}
                </ContainerInfos>
              )}

              {entrada33 && (
                <ContainerInfos>
                  <ContainerInfo>
                    <TxtEntrada>Saída 3</TxtEntrada>
                    <TextInputMask
                      style={styles.txtInputentrada}
                      onPressIn={() => {
                        setObsSaisa3(true);
                      }}
                      keyboardType="numeric"
                      placeholder="Saída 3"
                      value={saida33}
                      onChangeText={setSaida33}
                      options={{ mask: '99:99', maskType: 'BRL' }}
                      type="custom"
                    />
                  </ContainerInfo>
                  {obsSaisa3 && (
                    <ContainerInfo>
                      <TextInput
                        style={{ padding: 10 }}
                        placeholder="Observações saida 3"
                        value={obsSaisa3}
                        onChangeText={(a) => setObsSaisa3(a)}
                        onBlur={() => cleanText(obsSaisa3, setObsSaisa3)}
                      />
                    </ContainerInfo>
                  )}
                </ContainerInfos>
              )}

              {saida33 && (
                <ContainerInfos>
                  <ContainerInfo>
                    <TxtEntrada>Entrada 4</TxtEntrada>
                    <TextInputMask
                      style={styles.txtInputentrada}
                      onPressIn={() => {
                        setObsentrada4(true);
                      }}
                      keyboardType="numeric"
                      placeholder="Entrada 4"
                      value={entrada44}
                      onChangeText={setEntrada44}
                      options={{ mask: '99:99', maskType: 'BRL' }}
                      type="custom"
                    />
                  </ContainerInfo>
                  {obsentrada4 && (
                    <ContainerInfo>
                      <TextInput
                        style={{ padding: 10 }}
                        placeholder="Observações entrada 4"
                        value={obsentrada4}
                        onChangeText={(a) => setObsentrada4(a)}
                      />
                    </ContainerInfo>
                  )}
                </ContainerInfos>
              )}

              {entrada44 && (
                <ContainerInfos>
                  <ContainerInfo>
                    <TxtEntrada>Saída 4</TxtEntrada>
                    <TextInputMask
                      style={styles.txtInputentrada}
                      onPressIn={() => {
                        setObsSaisa4(true);
                      }}
                      keyboardType="numeric"
                      placeholder="Saída 4"
                      value={saida44}
                      onChangeText={setSaida44}
                      options={{ mask: '99:99', maskType: 'BRL' }}
                      type="custom"
                    />
                  </ContainerInfo>
                  {obsSaisa4 && (
                    <ContainerInfo>
                      <TextInput
                        style={{ padding: 10 }}
                        placeholder="Observações saida 4"
                        value={obsSaisa4}
                        onChangeText={(a) => setObsSaisa4(a)}
                        onBlur={() => cleanText(obsSaisa4, setObsSaisa4)}
                      />
                    </ContainerInfo>
                  )}
                </ContainerInfos>
              )}

              {saida44 && (
                <ContainerInfos>
                  <ContainerInfo>
                    <TxtEntrada>Entrada 5</TxtEntrada>
                    <TextInputMask
                      style={styles.txtInputentrada}
                      onPressIn={() => {
                        setObsentrada5(true);
                      }}
                      keyboardType="numeric"
                      placeholder="Entrada 5"
                      value={entrada55}
                      onChangeText={setEntrada55}
                      options={{ mask: '99:99', maskType: 'BRL' }}
                      type="custom"
                    />
                  </ContainerInfo>
                  {obsentrada5 && (
                    <ContainerInfo>
                      <TextInput
                        style={{ padding: 10 }}
                        placeholder="Observações entrada 5"
                        value={obsentrada5}
                        onChangeText={(a) => setObsentrada5(a)}
                        onBlur={() => cleanText(obsentrada5, setObsentrada5)}
                      />
                    </ContainerInfo>
                  )}
                </ContainerInfos>
              )}

              {entrada55 && (
                <ContainerInfos>
                  <ContainerInfo>
                    <TxtEntrada>Saída 5</TxtEntrada>
                    <TextInputMask
                      style={styles.txtInputentrada}
                      onPressIn={() => {
                        setObsSaisa5(true);
                      }}
                      keyboardType="numeric"
                      placeholder="Saída 5"
                      value={saida55}
                      onChangeText={setSaida55}
                      options={{ mask: '99:99', maskType: 'BRL' }}
                      type="custom"
                    />
                  </ContainerInfo>
                  {obsSaisa5 && (
                    <ContainerInfo>
                      <TextInput
                        style={{ padding: 10 }}
                        placeholder="Observações saida 5"
                        value={obsSaisa5}
                        onChangeText={(a) => setObsSaisa5(a)}
                        onBlur={() => cleanText(obsSaisa5, setObsSaisa5)}
                      />
                    </ContainerInfo>
                  )}
                </ContainerInfos>
              )}

              {saida55 && (
                <ContainerInfos>
                  <ContainerInfo>
                    <TxtEntrada>Entrada 6</TxtEntrada>
                    <TextInputMask
                      style={styles.txtInputentrada}
                      onPressIn={() => {
                        setObsentrada6(true);
                      }}
                      keyboardType="numeric"
                      placeholder="Entrada 6"
                      value={entrada66}
                      onChangeText={setEntrada66}
                      options={{ mask: '99-99', maskType: 'BRL' }}
                      type="custom"
                    />
                  </ContainerInfo>
                  {obsentrada6 && (
                    <ContainerInfo>
                      <TextInput
                        style={{ padding: 10 }}
                        placeholder="Observações entrada 6"
                        value={obsentrada6}
                        onChangeText={(a) => setObsentrada6(a)}
                        onBlur={() => cleanText(obsentrada6, setObsentrada6)}
                      />
                    </ContainerInfo>
                  )}
                </ContainerInfos>
              )}

              {entrada66 && (
                <ContainerInfos>
                  <ContainerInfo>
                    <TxtEntrada>Saída 6</TxtEntrada>
                    <TextInputMask
                      style={styles.txtInputentrada}
                      onPressIn={() => {
                        setObsSaisa6(true);
                      }}
                      keyboardType="numeric"
                      placeholder="Saída 6"
                      value={saida66}
                      onChangeText={setSaida66}
                      options={{ mask: '99-99', maskType: 'BRL' }}
                      type="custom"
                    />
                  </ContainerInfo>
                  {obsSaisa6 && (
                    <ContainerInfo>
                      <TextInput
                        style={{ padding: 10 }}
                        placeholder="Observações saida 6"
                        value={obsSaisa6}
                        onChangeText={(a) => setObsSaisa6(a)}
                        onBlur={() => cleanText(obsSaisa6, setObsSaisa6)}
                      />
                    </ContainerInfo>
                  )}
                </ContainerInfos>
              )}

              {saida66 && (
                <ContainerInfos>
                  <ContainerInfo>
                    <TxtEntrada>Entrada 7</TxtEntrada>
                    <TextInputMask
                      style={styles.txtInputentrada}
                      onPressIn={() => {
                        setObsentrada7(true);
                      }}
                      keyboardType="numeric"
                      placeholder="Entrada 7"
                      value={entrada77}
                      onChangeText={setEntrada77}
                      options={{ mask: '99-99', maskType: 'BRL' }}
                      type="custom"
                    />
                  </ContainerInfo>
                  {obsentrada7 && (
                    <ContainerInfo>
                      <TextInput
                        style={{ padding: 10 }}
                        placeholder="Observações entrada 7"
                        value={obsentrada7}
                        onChangeText={(a) => setObsentrada7(a)}
                        onBlur={() => cleanText(obsentrada7, setObsentrada7)}
                      />
                    </ContainerInfo>
                  )}
                </ContainerInfos>
              )}

              {entrada77 && (
                <ContainerInfos>
                  <ContainerInfo>
                    <TxtEntrada>Saída 7</TxtEntrada>
                    <TextInputMask
                      style={styles.txtInputentrada}
                      onPressIn={() => {
                        setObsSaisa7(true);
                      }}
                      keyboardType="numeric"
                      placeholder="Saída 7"
                      value={saida77}
                      onChangeText={setSaida77}
                      options={{ mask: '99-99', maskType: 'BRL' }}
                      type="custom"
                    />
                  </ContainerInfo>
                  {obsSaisa7 && (
                    <ContainerInfo>
                      <TextInput
                        style={{ padding: 10 }}
                        placeholder="Observações saida 7"
                        value={obsSaisa7}
                        onChangeText={(a) => setObsSaisa7(a)}
                        onBlur={() => cleanText(obsSaisa7, setObsSaisa7)}
                      />
                    </ContainerInfo>
                  )}
                </ContainerInfos>
              )}

              {saida77 && (
                <ContainerInfos>
                  <ContainerInfo>
                    <TxtEntrada>Entrada 8</TxtEntrada>
                    <TextInputMask
                      style={styles.txtInputentrada}
                      onPressIn={() => {
                        setObsentrada8(true);
                      }}
                      keyboardType="numeric"
                      placeholder="Entrada 8"
                      value={entrada88}
                      onChangeText={setEntrada88}
                      options={{ mask: '99-99', maskType: 'BRL' }}
                      type="custom"
                    />
                  </ContainerInfo>
                  {obsentrada8 && (
                    <ContainerInfo>
                      <TextInput
                        style={{ padding: 10 }}
                        placeholder="Observações entrada 8"
                        value={obsentrada8}
                        onChangeText={(a) => setObsentrada8(a)}
                        onBlur={() => cleanText(obsentrada8, setObsentrada8)}
                      />
                    </ContainerInfo>
                  )}
                </ContainerInfos>
              )}

              {entrada88 && (
                <ContainerInfos>
                  <ContainerInfo>
                    <TxtEntrada>Saída 8</TxtEntrada>
                    <TextInputMask
                      style={styles.txtInputentrada}
                      onPressIn={() => {
                        setObsSaisa8(true);
                      }}
                      keyboardType="numeric"
                      placeholder="Saída 8"
                      value={saida88}
                      onChangeText={setSaida88}
                      options={{ mask: '99-99', maskType: 'BRL' }}
                      type="custom"
                    />
                  </ContainerInfo>
                  {obsSaisa8 && (
                    <ContainerInfo>
                      <TextInput
                        style={{ padding: 10 }}
                        placeholder="Observações saida 8"
                        value={obsSaisa8}
                        onChangeText={(a) => setObsSaisa8(a)}
                        onBlur={() => cleanText(obsSaisa8, setObsSaisa8)}
                      />
                    </ContainerInfo>
                  )}
                </ContainerInfos>
              )}

              {saida88 && (
                <ContainerInfos>
                  <ContainerInfo>
                    <TxtEntrada>Entrada 9</TxtEntrada>
                    <TextInputMask
                      style={styles.txtInputentrada}
                      onPressIn={() => {
                        setObsentrada9(true);
                      }}
                      keyboardType="numeric"
                      placeholder="Entrada 9"
                      value={entrada99}
                      onChangeText={setEntrada99}
                      options={{ mask: '99-99', maskType: 'BRL' }}
                      type="custom"
                    />
                  </ContainerInfo>
                  {obsentrada9 && (
                    <ContainerInfo>
                      <TextInput
                        style={{ padding: 10 }}
                        placeholder="Observações entrada 9"
                        value={obsentrada9}
                        onChangeText={(a) => setObsentrada9(a)}
                        onBlur={() => cleanText(obsentrada9, setObsentrada9)}
                      />
                    </ContainerInfo>
                  )}
                </ContainerInfos>
              )}

              {entrada99 && (
                <ContainerInfos>
                  <ContainerInfo>
                    <TxtEntrada>Saída 9</TxtEntrada>
                    <TextInputMask
                      style={styles.txtInputentrada}
                      onPressIn={() => {
                        setObsSaisa9(true);
                      }}
                      keyboardType="numeric"
                      placeholder="Saída 9"
                      value={saida99}
                      onChangeText={setSaida99}
                      options={{ mask: '99-99', maskType: 'BRL' }}
                      type="custom"
                    />
                  </ContainerInfo>
                  {obsSaisa9 && (
                    <ContainerInfo>
                      <TextInput
                        style={{ padding: 10 }}
                        placeholder="Observações saida 9"
                        value={obsSaisa9}
                        onChangeText={(a) => setObsSaisa9(a)}
                        onBlur={() => cleanText(obsSaisa9, setObsSaisa9)}
                      />
                    </ContainerInfo>
                  )}
                </ContainerInfos>
              )}

              {saida99 && (
                <ContainerInfos>
                  <ContainerInfo>
                    <TxtEntrada>Entrada 10</TxtEntrada>
                    <TextInputMask
                      style={styles.txtInputentrada}
                      onPressIn={() => {
                        setObsentrada10(true);
                      }}
                      keyboardType="numeric"
                      placeholder="Entrada 10"
                      value={entrada100}
                      onChangeText={setEntrada100}
                      options={{ mask: '99-99', maskType: 'BRL' }}
                      type="custom"
                    />
                  </ContainerInfo>
                  {obsentrada10 && (
                    <ContainerInfo>
                      <TextInput
                        style={{ padding: 10 }}
                        placeholder="Observações entrada 10"
                        value={obsentrada10}
                        onChangeText={(a) => setObsentrada10(a)}
                        onBlur={() => cleanText(obsentrada10, setObsentrada10)}
                      />
                    </ContainerInfo>
                  )}
                </ContainerInfos>
              )}

              {entrada100 && (
                <ContainerInfos>
                  <ContainerInfo>
                    <TxtEntrada>Saída 10</TxtEntrada>
                    <TextInputMask
                      style={styles.txtInputentrada}
                      onPressIn={() => {
                        setObsSaisa10(true);
                      }}
                      keyboardType="numeric"
                      placeholder="Saída 10"
                      value={saida100}
                      onChangeText={setSaida100}
                      options={{ mask: '99-99', maskType: 'BRL' }}
                      type="custom"
                    />
                  </ContainerInfo>
                  {obsSaisa10 && (
                    <ContainerInfo>
                      <TextInput
                        style={{ padding: 10 }}
                        placeholder="Observações saida 10"
                        value={obsSaisa10}
                        onChangeText={(a) => setObsSaisa10(a)}
                        onBlur={() => cleanText(obsSaisa10, setObsSaisa10)}
                      />
                    </ContainerInfo>
                  )}
                </ContainerInfos>
              )}

              {button === true && (
                <ConatinerButton onPress={edicao}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      padding: 30,
                      fontSize: 20,
                      color: 'white',
                    }}
                  >
                    Solicitar
                  </Text>
                </ConatinerButton>
              )}

              {button === false && (
                <ConatinerButton>
                  <ActivityIndicator
                    size={'large'}
                    color="white"
                  />
                </ConatinerButton>
              )}
            </ContainerModalSub>
          </ConatinerModal>
        </Modal>
      </AlertNotificationRoot>
    </Container>
  );
}
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

//header -------------

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

//Modal -------

const ConatinerModal = styled.ScrollView`
  flex: 1;
`;
const ContainerModalSub = styled.View`
  flex: 1;
  align-items: center;
`;

const ButtonBack = styled.TouchableOpacity`
  flex-direction: row;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 20px;
  border-bottom-width: 2px;
  border-bottom: #dadada;
  margin-bottom: 10px;
  width: 100%;
`;

const TxtButtonBack = styled.Text`
  margin-left: 30px;
  font-style: normal;
  font-weight: bold;
  color: black;
  font-size: 15px;
`;

const Title = styled.Text`
  font-weight: bold;
  margin-left: 20px;
  margin: 15px;
`;

const ContainerTitulo = styled.View`
  border-width: 1px;
  width: 95%;
  border-color: #d6d6d6;
  justify-content: center;
  margin-bottom: 10px;
`;

const ContainerInfo = styled.View`
  border-width: 1px;
  width: 95%;
  border-color: #d6d6d6;
  justify-content: space-between;
  flex-direction: row;
`;

const ContainerInfos = styled.View`
  align-items: center;
  width: 100%;
`;

const TxtEntrada = styled.Text`
  margin: 10px;
`;

const ConatinerButton = styled.TouchableOpacity`
  align-items: center;
  background-color: #0393c7;
  width: 100%;
  justify-content: center;
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
    marginBottom: 10,
    width: '90%',
    backgroundColor: 'white',
    marginTop: 20,
  },

  txtInputentrada: {
    padding: 10,
  },
});
