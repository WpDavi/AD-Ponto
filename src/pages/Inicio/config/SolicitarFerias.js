import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Modal, Platform, View } from 'react-native';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Dialog,
} from 'react-native-alert-notification';

import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

import Icone from '@expo/vector-icons/FontAwesome5';
import styled from 'styled-components';

import Api from '~/services/Api';

export default function SolicitarFerias() {
  const navigation = useNavigation();

  const [modalDataInicial, setModalDataInicial] = useState(false);
  const [modalDataTermino, setModalDataTermino] = useState(false);

  const [modalSuccess, setModalSuccess] = useState(false);

  const [date, setDate] = useState(new Date());
  const [dataInicial, setDataInicial] = useState('');
  const [dataTermino, setDataTermino] = useState('');
  const [placeIncial, setPlaceIncial] = useState('Data de Início');
  const [placeTermino, setPlaceTermino] = useState('Data de Término');

  const [load, setLoad] = useState(false);

  const [informacoesUsuario, setInformacoesUsuario] = useState();
  const [id, setId] = useState();
  const [token, setToken] = useState();

  const handleGetInformacoesPessoais = async () => {
    const res = await Api.getInformacoesPessoais();
    const ress = await Api.getGestor();

    setToken(ress);
    await setInformacoesUsuario(res);
  };

  useEffect(() => {
    handleGetInformacoesPessoais();
  }, []);

  const onChangeInicio = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setModalDataInicial(Platform.OS === 'ios');
    setDataInicial(currentDate);
    setPlaceIncial(String(currentDate).substring(4, 15));
  };
  const onChangeTermino = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setModalDataTermino(Platform.OS === 'ios');
    setDataTermino(currentDate);
    setPlaceTermino(String(currentDate).substring(4, 15));
  };

  const handleExitModal = () => {
    navigation.navigate('Home');
    setModalSuccess(false);
  };

  async function handleRequest() {
    if (!dataInicial || !dataTermino) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Alert',
        textBody: 'Preencha todos os campos',
        button: 'ok',
      });
      return;
    }
    setLoad(true);
    const assunto = 'Solicitação de Férias';
    const msg = 'Um funcionario solicitou férias';
    for (let i in token) {
      const ress = await Api.RegisterNotification(
        token[i].token_notification,
        assunto,
        msg,
      );
    }
    const res = await Api.solicitar_Ferias(dataInicial, dataTermino);
    if (res) {
      setModalSuccess(true);
    } else {
      Alert.alert('Erro ao enviar');
    }
  }
  return (
    <Container>
      <AlertNotificationRoot>
        <ContainerHeaderTitulo>
          <TxtTituloHeader>Solicitar Período de Férias</TxtTituloHeader>
        </ContainerHeaderTitulo>
        <ContainerButtonBack onPress={() => navigation.goBack()}>
          <Icone
            size={17}
            name="arrow-left"
            color="white"
          />
        </ContainerButtonBack>

        <ContainerInfos>
          <ImgBody
            resizeMode="contain"
            source={require('~/icons/ferias.png')}
          />
          <TxtDataInitial>Data de início</TxtDataInitial>
          <Input
            placeholder={placeIncial}
            onPressIn={() => {
              setModalDataInicial(true);
            }}
            value={dataInicial}
            keyboardType="Number-pad"
          />
          <TxtDataInitial>Data de término</TxtDataInitial>
          <Input
            placeholder={placeTermino}
            onPressIn={() => {
              setModalDataTermino(true);
            }}
            value={dataTermino}
            keyboardType="Number-pad"
          />

          {!load && (
            <ButtonSolicita onPress={handleRequest}>
              <TxtButtonSolicitação>Solicitar</TxtButtonSolicitação>
            </ButtonSolicita>
          )}
          {load && (
            <ButtonSolicita>
              <ActivityIndicator color={'white'} />
            </ButtonSolicita>
          )}
        </ContainerInfos>

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalSuccess}
          onRequestClose={handleExitModal}
        >
          <ContainerModal>
            <ImgModal
              resizeMode="contain"
              source={require('~/icons/ferias2.png')}
            />
            <View>
              <TxtModalSolicitação>Solicitação de Férias</TxtModalSolicitação>
              <TxtModalRess>
                Sua solicitação foi enviada com sucesso
              </TxtModalRess>
            </View>

            <ButtonExitSuccess onPress={handleExitModal}>
              <TxtButtonExit>Voltar para o início</TxtButtonExit>
            </ButtonExitSuccess>
          </ContainerModal>
        </Modal>

        {/*Modais de data ---------------------- */}
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
        {modalDataTermino && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeTermino}
          />
        )}
        {/*Modais de data ---------------------- */}
      </AlertNotificationRoot>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

//header ----------
const ContainerHeaderTitulo = styled.View`
  background-color: #1cade2;
  align-items: center;
`;
const TxtTituloHeader = styled.Text`
  color: white;
  padding: 7px;
  font-size: 20px;
  font-weight: bold;
`;
const ContainerButtonBack = styled.TouchableOpacity`
  flex-direction: row;
  margin-left: 10px;
  position: absolute;
  margin-top: 10px;
`;

//Body =================
const ContainerInfos = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ImgBody = styled.Image`
  height: 25%;
  margin-bottom: 20px;
`;

const TxtDataInitial = styled.Text`
  font-weight: bold;
  color: white;
  background-color: #0393c7;
  padding: 6px;
  margin-bottom: -10px;
  padding-left: 30px;
  padding-right: 30px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  margin-top: 25px;
`;

const Input = styled.TextInput`
  margin-top: 10px;
  font-style: normal;
  font-weight: bold;
  color: black;
  font-size: 12px;
  line-height: 16px;
  border-width: 2px;
  border-color: #0393c7;
  border-radius: 5px;
  width: 90%;
  padding: 9px;
  background-color: white;
`;

const ButtonSolicita = styled.TouchableOpacity`
  padding: 15px;
  padding-bottom: 15px;
  width: 90%;
  background-color: #00bbff;
  border-radius: 4px;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const TxtButtonSolicitação = styled.Text`
  text-align: center;
  color: white;
  font-weight: bold;
  width: 100%;
`;

//Modal success =============

const ContainerModal = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ImgModal = styled.Image`
  width: 60%;
  height: 35%;
`;

const TxtModalSolicitação = styled.Text`
  font-weight: bold;
  font-size: 25px;
  margin-top: 50px;
`;

const TxtModalRess = styled.Text`
  margin-top: 20px;
  color: #858585;
  margin-bottom: 20px;
`;

const ButtonExitSuccess = styled.TouchableOpacity`
  padding: 15px;
  padding-bottom: 15px;
  width: 90%;
  background-color: #00bbff;
  border-radius: 4px;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 20px;
`;

const TxtButtonExit = styled.Text`
  text-align: center;
  color: white;
  font-weight: bold;
  width: 100%;
`;
