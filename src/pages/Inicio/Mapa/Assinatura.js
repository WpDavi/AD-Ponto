import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import React, { useEffect, useRef, useState } from 'react';
import { Modal } from 'react-native';
import {
  AlertNotificationRoot,
  ALERT_TYPE,
  Dialog,
} from 'react-native-alert-notification';
import SignatureScreen from 'react-native-signature-canvas';
import styled from 'styled-components';
import Api from '~/services/Api';

export default function Assinatura(onOK) {
  const navigation = useNavigation();
  const ref = useRef();

  const [image, setImage] = useState();
  const [id, setId] = useState();
  const [modalConfirm, setModalConfirm] = useState(false);

  const [bottonLoad, setBottonLoad] = useState(false);

  useEffect(() => {
    async function getID() {
      const idAsync = await AsyncStorage.getItem('@id');
      await setId(idAsync);
    }
    getID();
  }, []);

  const handleOK = (signature) => {
    //console.log(signature);

    const path = FileSystem.cacheDirectory + 'sign.png';
    FileSystem.writeAsStringAsync(
      path,
      signature.replace('data:image/png;base64,', ''),
      {
        encoding: FileSystem.EncodingType.Base64,
      },
    )
      .then(() => FileSystem.getInfoAsync(path))
      .then(console.log)
      .catch(console.error);
    setModalConfirm(true);
    setImage(path);
  };

  const handleToSend = async () => {
    setBottonLoad(true);
    const ress = await Api.uploudAssinatura(image);
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Sucesso',
      textBody: 'Assinatura enviada',
      button: 'ok',
    });
    const res = await Api.uploudAssinatura2(id);
    navigation.navigate('Mapa');
  };

  const handleClear = () => {
    ref.current.clearSignature();
  };

  const handleConfirm = () => {
    const res = ref.current.readSignature();
  };

  const styleSignature = `.m-signature-pad {
    position: absolute;
    font-size: 10px;
    width: 800px;
    height: 1200px;
    top: 10%;
    left: 50%;
    margin-left: -350px;
    margin-top: -200px;
  }`;
  function test() {
    const res = ref.current.readSignature();
    console.log('ressssssssss', res);
  }

  return (
    <AlertNotificationRoot>
      <Container>
        <SignatureScreen
          ref={ref}
          onOK={handleOK}
          imageType="image/png"
          readSignature={test}
          webStyle={styleSignature}
        />
        <ButtonLimpar onPress={handleClear}>
          <TxtButtonLimpar>Limpar</TxtButtonLimpar>
        </ButtonLimpar>
        <ButtonConfirmar onPress={handleConfirm}>
          <TxtButtonConfirmar>Confirmar</TxtButtonConfirmar>
        </ButtonConfirmar>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalConfirm}
          onRequestClose={() => {
            setModalConfirm(!modalConfirm);
          }}
        >
          <ContainerModal>
            <TxtTitulo>Assinatura selecionada</TxtTitulo>
            {!bottonLoad && (
              <TouchConfirm onPress={handleToSend}>
                <TxtButton>Enviar</TxtButton>
              </TouchConfirm>
            )}
            {bottonLoad && (
              <TouchConfirm>
                <LoadIndicator />
              </TouchConfirm>
            )}

            <TouchLimpar
              onPress={() => {
                setModalConfirm(false);
              }}
            >
              <TxtButton>Corrigir</TxtButton>
            </TouchLimpar>
          </ContainerModal>
        </Modal>
      </Container>
    </AlertNotificationRoot>
  );
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const ButtonLimpar = styled.TouchableOpacity`
  position: absolute;
  bottom: 30px;
  left: 30px;
`;
const TxtButtonLimpar = styled.Text`
  font-weight: bold;
  color: white;
  border-radius: 10px;
  background-color: #1cade2;
  padding: 10px;
  padding-left: 40px;
  padding-right: 40px;
`;
const ButtonConfirmar = styled.TouchableOpacity`
  position: absolute;
  bottom: 30px;
  right: 30px;
`;
const TxtButtonConfirmar = styled.Text`
  font-weight: bold;
  color: white;
  border-radius: 10px;
  background-color: #1cade2;
  padding: 10px;
  padding-left: 40px;
  padding-right: 40px;
`;

//Modal///////////////////////////////////
const ModalConfirm = styled.Modal``;

const ContainerModal = styled.View`
  position: absolute;
  bottom: 0;
  align-self: center;
  border-radius: 20px;
  background-color: #1cade2;
  width: 101%;
  height: 200px;
  border-color: #e2e2e2;
  border: 1px;
  align-items: center;
`;

const TxtTitulo = styled.Text`
  margin-top: 10px;
  font-weight: bold;
  color: white;
  font-size: 18px;
`;

const TouchConfirm = styled.TouchableOpacity`
  position: absolute;
  bottom: 30px;
  right: 40px;
`;

const TouchLimpar = styled.TouchableOpacity`
  position: absolute;
  bottom: 30px;
  left: 40px;
`;

const TxtButton = styled.Text`
  font-weight: bold;
  color: white;
  border-radius: 10px;
  background-color: white;
  padding: 10px;
  padding-left: 40px;
  padding-right: 40px;
  color: #1cade2;
`;

const LoadIndicator = styled.ActivityIndicator`
  font-weight: bold;
  color: white;
  border-radius: 10px;
  background-color: white;
  padding: 10px;
  padding-left: 50px;
  padding-right: 50px;
  color: #1cade2;
`;
