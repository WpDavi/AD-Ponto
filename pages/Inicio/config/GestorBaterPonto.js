import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import Icone from '@expo/vector-icons/FontAwesome5';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

import { useNavigation } from '@react-navigation/native';
import { Feather, Entypo } from '@expo/vector-icons';
import Api from '../../../src/services/Api';
import { ImageBackground } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import styled from 'styled-components/native';
import { Camera } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RelatorioDefuncionario() {
  const camRef = useRef(null);

  const [type, setType] = useState(Camera.Constants.Type.front);

  const [modalimg, setModalimg] = useState(false);
  const [button, setButton] = useState(true);
  const [ponto, setPonto] = useState('');
  const [pis, setPis] = useState('');

  const [modalLoad, setModalLoad] = useState(false);
  const [image, setImage] = useState();
  const [modalcan, setModalcan] = useState(false);

  const [listaPesquisa, setListaPesquisa] = useState();

  async function takePicture() {
    setModalLoad(true);
    const options = { quality: 0.5, base64: true };
    const data = await camRef.current.takePictureAsync(options);
    const photo = data.base64;
    setImage(data.uri);
    const res = await Api.CadastroFaceID2(photo, pis);
    const id = res.uuid;
    const url = res.url;
    await Api.postinfosFaceID(id, url);
    if (res.status == 'failure') {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Alerta',
        textBody: 'Rosto não identificado',
        button: 'ok',
      });
      setModalLoad(false);
    } else if (res.status == 'success') {
      setModalLoad(false);
      setModalcan(true);
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Sucesso',
        textBody: 'Rosto cadastrado com sucesso',
        button: 'ok',
      });
    }
  }

  const localização = async () => {
    setButton(false);
    let foto = 'N';
    await AsyncStorage.removeItem('sFoto');
    await AsyncStorage.setItem('sFoto', 'N');
    const res = await Api.gerenciarBaterPonto(foto, pis);
    const jso = await Api.getAllFuncionarios();
    await setListaPesquisa(jso);
    setModalimg(false);
    setButton(true);
    if (res) {
      await Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Sucesso',
        textBody: 'Atualização feita com sucesso',
        button: 'ok',
      });
    }
  };
  const qrfoto = async () => {
    setButton(false);
    let foto = 'Q';
    await AsyncStorage.removeItem('sFoto');
    await AsyncStorage.setItem('sFoto', 'Q');
    const res = await Api.gerenciarBaterPonto(foto, pis);
    const jso = await Api.getAllFuncionarios();
    await setListaPesquisa(jso);
    setModalimg(false);
    setButton(true);
    if (res) {
      await Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Sucesso',
        textBody: 'Atualização feita com sucesso',
        button: 'ok',
      });
    }
  };
  const fotoloc = async () => {
    setButton(false);
    let foto = 'S';
    await AsyncStorage.removeItem('sFoto');
    await AsyncStorage.setItem('sFoto', 'S');
    const res = await Api.gerenciarBaterPonto(foto, pis);
    const jso = await Api.getAllFuncionarios();
    await setListaPesquisa(jso);
    setModalimg(false);
    setButton(true);
    if (res) {
      await Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Sucesso',
        textBody: 'Atualização feita com sucesso',
        button: 'ok',
      });
    }
  };

  const navigation = useNavigation();

  useEffect(() => {
    const onStart = async () => {
      const jso = await Api.getAllFuncionarios();
      await setListaPesquisa(jso);
    };
    onStart();
  }, []);

  const renderItem = useCallback((funcionario) => {
    const handleFaceId = () => {
      setPis(funcionario.item.pis);
      setModalcan(true);
    };

    const handleClickItem = () => {
      setPonto(funcionario.item.ponto_online_foto);
      setPis(funcionario.item.pis);

      setModalimg(true);
    };

    let formadebaterponto = 'Localização';
    if (funcionario.item.ponto_online_foto == 'S') {
      formadebaterponto = 'Localização + Foto';
    } else if (funcionario.item.ponto_online_foto == 'Q') {
      formadebaterponto = 'QR Code + Foto';
    }

    return (
      <SafeAreaView
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#dadada',
          marginBottom: '5%',
        }}
      >
        <View activeOpacity={0.9} style={styles.containerfuncionario} onPress={handleClickItem}>
          <View style={styles.item}>
            {!funcionario.item.foto && (
              <Image
                style={{ width: 40, height: 40, marginRight: 8, borderRadius: 100 }}
                source={require('../../../src/icons/perfil.png')}
              />
            )}
            {funcionario.item.foto && (
              <Image
                style={{ width: 40, height: 40, marginRight: 8, borderRadius: 100 }}
                source={{ uri: funcionario.item.foto }}
              />
            )}

            <View style={styles.conteudo}>
              <Text style={styles.titulo}>{`${funcionario.item.funcionario}`}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.descricao}>Batendo ponto por:</Text>
                <Text style={{ fontSize: 12, marginLeft: 5 }}>{formadebaterponto}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.descricao}>Email:</Text>
                <Text style={{ fontSize: 12, marginLeft: 5 }}>{funcionario.item.email}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.descricao}>Data de nascimento</Text>
                <Text style={{ fontSize: 12, marginLeft: 5 }}>
                  {`${String(funcionario.item.dt_nascimento).substr(8, 9)}-${String(
                    funcionario.item.dt_nascimento
                  ).substr(5, 2)}-${String(funcionario.item.dt_nascimento).substr(0, 4)}`}
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.descricao}>Pis</Text>
                <Text style={{ fontSize: 12, marginLeft: 5 }}>{funcionario.item.pis}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.descricao}>Data de admissão</Text>
                <Text style={{ fontSize: 12, marginLeft: 5 }}>{`${String(
                  funcionario.item.dt_admissao
                ).substr(8, 9)}-${String(funcionario.item.dt_admissao).substr(5, 2)}-${String(
                  funcionario.item.dt_admissao
                ).substr(0, 4)}`}</Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}
        >
          <TouchableOpacity
            style={{ justifyContent: 'center', marginRight: 20, marginBottom: 30 }}
            onPress={handleClickItem}
          >
            <View>
              <Entypo name="pencil" size={20} color="#666666" />
            </View>
          </TouchableOpacity>
          {/*
        <TouchableOpacity
            style={{ justifyContent: 'center', marginRight: 20, marginBottom: 30 }}
            onPress={handleFaceId}
          >
            <Image
              style={{ width: 30, height: 30 }}
              source={require('../../../src/icons/faceid.png')}
            />
          </TouchableOpacity>
        */}
        </View>
      </SafeAreaView>
    );
  }, []);

  if (!ponto || ponto == 'N') {
    setPonto('Localização');
  } else if (ponto == 'S') {
    setPonto('Foto + Localização');
  } else if (ponto == 'Q') {
    setPonto('QR Code + Foto');
  }

  return (
    <Container>
      <AlertNotificationRoot>
        <KeyboardAvoidingView
          keyboardVerticalOffset={10}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <StatusBar backgroundColor={'#1CADE2'} />
          <View
            style={{
              width: '100%',
              height: '7%',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 15,
              backgroundColor: '#1CADE2',
            }}
          >
            <Text style={{ textAlign: 'center', fontSize: 20, color: 'white', fontWeight: 'bold' }}>
              Gerenciar forma de bater ponto
            </Text>
          </View>
          <View style={{ position: 'absolute', marginTop: 20 }}>
            <TouchableOpacity
              style={{ flexDirection: 'row', marginLeft: 20 }}
              onPress={() =>
                navigation.reset({
                  routes: [{ name: 'Home' }],
                })
              }
            >
              <Icone size={20} name="arrow-left" color="white" />
            </TouchableOpacity>
          </View>
          {listaPesquisa == null && (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Image
                resizeMode="contain"
                style={{ width: 200, marginTop: 500 }}
                source={require('../../../src/icons/historicodeponto.png')}
              />
              <ActivityIndicator color={'#1CADE2'} size={'large'} />
            </View>
          )}
          <FlatList
            data={listaPesquisa}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalLoad}
            onRequestClose={() => {
              setModalLoad(!setModalLoad);
            }}
          >
            <ContainerModalLoad>
              <TxtModalLoad>Cadastrando rosto</TxtModalLoad>
              <TxtModalLoad>Aguarde</TxtModalLoad>
              <ActivityIndicator size={'large'} color={'#1CADE2'} />
            </ContainerModalLoad>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalcan}
            onRequestClose={() => {
              setModalcan(!modalcan);
            }}
          >
            <Camera
              ref={camRef}
              //onFacesDetected={handleFacesDetected}
              type={type}
              style={{ flex: 1, justifyContent: 'flex-end' }}
            >
              <Image
                resizeMethod="resize"
                style={{ width: 200, height: 325, alignSelf: 'center', marginBottom: '70%' }}
                source={require('../../../src/icons/faceCan.png')}
              />
              <PikerButton onPress={takePicture}>
                <Icone size={23} name="camera" color="white" />
              </PikerButton>
            </Camera>
          </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalimg}
            onRequestClose={() => {
              setModalimg(!modalimg);
            }}
          >
            <ImageBackground
              source={require('../../../assets/Backgroundblack.jpg')}
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
                  <Icone size={20} name="arrow-left" color="black" />
                  <Text
                    style={{
                      marginLeft: 30,
                      fontStyle: 'Normal',
                      fontWeight: '700',
                      color: 'black',
                      fontSize: 15,
                    }}
                  >
                    Gerenciar forma de bater ponto
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
                  <Text style={{ fontWeight: 'bold', marginLeft: 20 }}>PONTO POR: </Text>
                  <Text>{ponto}</Text>
                  <TextInputMask
                    style={styles.txtInputentrada}
                    placeholder=""
                    value={ponto}
                    options={{ mask: '9', maskType: 'BRL' }}
                    type="custom"
                  />
                </View>

                <View style={{ alignItems: 'center' }}>
                  <Text style={{ fontWeight: 'bold', margin: 15, fontSize: 25 }}>Alterar para</Text>
                </View>

                <View></View>
                {button == true && (
                  <View
                    style={{
                      alignItems: 'center',
                      backgroundColor: '#0393c7',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      height: 90,
                    }}
                  >
                    <TouchableOpacity onPress={localização}>
                      <Text style={styles.txtButton}>LOCALIZAÇÃO</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={fotoloc}>
                      <Text style={styles.txtButton}>LOCALIZAÇÃO{'\n'}+ FOTO</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={qrfoto}>
                      <Text style={styles.txtButton}>QR CODE{'\n'}+ LOCALIZAÇÃO</Text>
                    </TouchableOpacity>
                  </View>
                )}
                {button == false && (
                  <View
                    style={{
                      alignItems: 'center',
                      backgroundColor: '#0393c7',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      height: 90,
                    }}
                  >
                    <ActivityIndicator size={'large'} color="white" />
                  </View>
                )}
              </KeyboardAvoidingView>
            </ImageBackground>
          </Modal>
        </KeyboardAvoidingView>
      </AlertNotificationRoot>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;
const PikerButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0px;
  width: 90%;
  justify-content: center;
  align-items: center;
  background-color: #1cade2;
  margin: 20px;
  border-radius: 10px;
  height: 50px;
`;
const ContainerModalLoad = styled.View`
  width: 90%;
  background-color: white;
  align-self: center;
  margin-top: 60%;
  border-radius: 30px;
  align-items: center;
  padding-top: 30px;
  padding-bottom: 30px;
`;
const TxtModalLoad = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const styles = StyleSheet.create({
  containerfuncionario: {
    flex: 5,
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

  titulo: {
    fontSize: 16,
    flexWrap: 'wrap',
    fontWeight: 'bold',
    color: '#555555',
  },
  descricao: {
    fontSize: 12,
    color: '#555555',
    fontWeight: 'bold',
  },
  txtButton: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});
