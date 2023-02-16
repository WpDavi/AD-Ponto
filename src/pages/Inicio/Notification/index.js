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
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Dialog,
} from 'react-native-alert-notification';

import { useNavigation } from '@react-navigation/native';

import { Entypo } from '@expo/vector-icons';
import Icone from '@expo/vector-icons/FontAwesome5';
import styled from 'styled-components/native';

import Api from '~/services/Api';

export default function Notification() {
  const navigation = useNavigation();
  const [lista, setLista] = useState([]);
  const [load, setLoad] = useState(true);
  const [id, setId] = useState('');
  const [assunto, setAssunto] = useState();
  const [mensagem, setMensagem] = useState();
  const [button, setButton] = useState(true);
  const [modalimg, setModalimg] = useState(false);

  useEffect(() => {
    getNotification();
  }, []);
  async function getNotification() {
    const notification = await Api.getNotification();
    setLoad(false);
    setLista(notification);
  }
  const apagar = async () => {
    setButton(false);
    await Api.deleteNotification(id);
    const notification = await Api.getNotification();
    setLista(notification);
    setModalimg(false);
    setButton(true);
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Sucesso',
      textBody: 'Notificação apagada',
      button: 'ok',
    });
  };

  const renderItem = useCallback((notification) => {
    const handleClickItem = () => {
      setModalimg(true);
      setId(notification.item.id);
      setAssunto(notification.item.assunto);
      setMensagem(notification.item.mensagem);
    };
    return (
      <SafeAreaView style={{ borderBottomWidth: 1, paddingBottom: 15 }}>
        <View style={{ marginLeft: 20, marginTop: 10 }}>
          <TxtData>
            Data: {notification.item.data.substr(8, 2)}/
            {notification.item.data.substr(5, 2)}/
            {notification.item.data.substr(0, 4)}
          </TxtData>

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <TouchableOpacity
                onPress={handleClickItem}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 15,
                }}
              >
                <Entypo
                  name={'trash'}
                  size={30}
                  color={'#1CADE2'}
                />
              </TouchableOpacity>
              <View>
                <TxtAssunto>{notification.item.assunto}</TxtAssunto>
                <TxtMessage>{notification.item.mensagem}</TxtMessage>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }, []);

  return (
    <Container>
      <AlertNotificationRoot>
        <View style={{ backgroundColor: '#1CADE2', alignItems: 'center' }}>
          <Text style={styles.txtnotification}> Notificação</Text>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginLeft: 10,
            position: 'absolute',
            marginTop: 10,
          }}
          onPress={() => navigation.goBack()}
        >
          <Icone
            size={17}
            name="arrow-left"
            color="white"
          />
        </TouchableOpacity>
        {lista.length !== 0 && (
          <FlatList
            data={lista}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
          />
        )}

        <View style={styles.cotainerinfo}>
          <View style={{ width: '100%', alignItems: 'center' }}>
            {lista.length === 0 && (
              <Image
                resizeMode="stretch"
                style={styles.imgnotification}
                source={require('~/assets/notificacao.png')}
              />
            )}

            {lista.length === 0 && (
              <View style={{ alignItems: 'center' }}>
                {load === false && (
                  <View style={{ alignItems: 'center' }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 23,
                        marginTop: 15,
                        color: '#727376',
                      }}
                    >
                      Não há notificação
                    </Text>

                    <Text
                      style={{
                        color: '#727376',
                        textAlign: 'center',
                        marginTop: 5,
                      }}
                    >
                      Toque no botão de atualizar notificação abaixo e{'\n'}
                      verifique novamente
                    </Text>
                  </View>
                )}
                {load === true && (
                  <View style={{ alignItems: 'center', marginTop: 30 }}>
                    <ActivityIndicator
                      size={'large'}
                      color="#1CADE2"
                    />
                  </View>
                )}
              </View>
            )}
          </View>
        </View>

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
                  Apagar Notificação
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
                  ASSUNTO:{' '}
                </Text>
                <Text>{assunto}</Text>
              </View>

              <View>
                <View style={{ marginTop: 15 }}>
                  <Text style={{ fontWeight: 'bold', marginLeft: 20 }}>
                    MENSAGEM:{' '}
                  </Text>
                  <Text style={{ marginLeft: 20, marginBottom: 20 }}>
                    {mensagem}
                  </Text>
                </View>
              </View>
              <View style={{ alignItems: 'center' }} />

              <View />
              {button === true && (
                <TouchableOpacity
                  onPress={apagar}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#0393c7',
                    flexDirection: 'row',
                    height: 80,
                  }}
                >
                  <Entypo
                    name={'trash'}
                    size={30}
                    color={'white'}
                  />
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: 'bold',
                      marginRight: 25,
                      marginLeft: 10,
                      color: 'white',
                    }}
                  >
                    Apagar
                  </Text>
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
const TxtData = styled.Text`
  font-weight: bold;
  color: #1cade2;
  margin-left: 5px;
`;

const TxtAssunto = styled.Text`
  color: ${(props) => props.theme.color};
  font-weight: bold;
`;
const TxtMessage = styled.Text`
  color: ${(props) => props.theme.color};
`;

export const styles = StyleSheet.create({
  cotainerinfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
  txtnotification: {
    color: 'white',
    padding: 7,
    fontSize: 20,
    fontWeight: 'bold',
  },
  imgnotification: {
    width: '50%',
    height: 250,
  },
  imgbutton: {
    width: '80%',
    height: 80,
  },
});
