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
  StatusBar,
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
import { TextInput as RNPTextInput } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';

import { Entypo, Feather } from '@expo/vector-icons';
import Icone from '@expo/vector-icons/FontAwesome5';
import styled from 'styled-components/native';

import Api from '~/services/Api';
import { cleanText } from '~/utils/text';

export default function EnvioDeNoification() {
  const [assunto, setAssunto] = useState();
  const [msg, setMsg] = useState();

  const [modalimg, setModalimg] = useState(false);
  const [button, setButton] = useState(true);
  const [token, setToken] = useState('');
  const [pis, setPis] = useState('');

  const [listaPesquisa, setListaPesquisa] = useState();

  const navigation = useNavigation();

  const Enviar = async () => {
    if (!assunto || !msg) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Alerta',
        textBody: 'Campos obrigatorios',
        button: 'ok',
      });
    } else if (assunto || msg) {
      setButton(false);
      const ress = await Api.notification(pis, assunto, msg);

      const res = await Api.RegisterNotification(token, assunto, msg);
      if (res) {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Sucesso',
          textBody: 'Notificação enviada com sucesso',
          button: 'ok',
        });
        setTimeout(() => {
          navigation.navigate('Home');
        }, 1500);
      }
    }
  };

  useEffect(() => {
    const onStart = async () => {
      const jso = await Api.getAllFuncionarios();
      await setListaPesquisa(jso);
    };
    onStart();
  }, []);

  const renderItem = useCallback((funcionario) => {
    const handleClickItem = () => {
      setToken(funcionario.item.token_notification);
      setPis(funcionario.item.pis);

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
          style={styles.containerfuncionario}
          onPress={handleClickItem}
        >
          <View style={styles.item}>
            {!funcionario.item.foto && (
              <Image
                style={{
                  width: 40,
                  height: 40,
                  marginRight: 8,
                  borderRadius: 100,
                }}
                source={require('~/icons/perfil.png')}
              />
            )}
            {funcionario.item.foto && (
              <Image
                style={{
                  width: 40,
                  height: 40,
                  marginRight: 8,
                  borderRadius: 100,
                }}
                source={{ uri: funcionario.item.foto }}
              />
            )}

            <View style={styles.conteudo}>
              <Text
                style={styles.titulo}
              >{`${funcionario.item.funcionario}`}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.descricao}>Email:</Text>
                <Text style={{ fontSize: 12, marginLeft: 5 }}>
                  {funcionario.item.email}
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.descricao}>Data de nascimento</Text>
                <Text style={{ fontSize: 12, marginLeft: 5 }}>
                  {`${String(funcionario.item.dt_nascimento).substr(
                    8,
                    9,
                  )}-${String(funcionario.item.dt_nascimento).substr(
                    5,
                    2,
                  )}-${String(funcionario.item.dt_nascimento).substr(0, 4)}`}
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.descricao}>Pis</Text>
                <Text style={{ fontSize: 12, marginLeft: 5 }}>
                  {funcionario.item.pis}
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.descricao}>Data de admissão</Text>
                <Text style={{ fontSize: 12, marginLeft: 5 }}>
                  {`${String(funcionario.item.dt_admissao).substr(
                    8,
                    9,
                  )}-${String(funcionario.item.dt_admissao).substr(
                    5,
                    2,
                  )}-${String(funcionario.item.dt_admissao).substr(0, 4)}`}
                </Text>
              </View>
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
    <Contaier>
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
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              Envio de notificação
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
              <Icone
                size={20}
                name="arrow-left"
                color="white"
              />
            </TouchableOpacity>
          </View>
          {listaPesquisa === null && (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                resizeMode="contain"
                style={{ width: 200, marginTop: 500 }}
                source={require('~/icons/envionotification.png')}
              />
              <ActivityIndicator
                color={'#1CADE2'}
                size={'large'}
              />
            </View>
          )}
          {listaPesquisa && (
            <FlatList
              data={listaPesquisa}
              renderItem={renderItem}
              keyExtractor={(item, index) => index}
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
                    Envio de notificação
                  </Text>
                </TouchableOpacity>

                <View
                  style={{
                    flexWrap: 'wrap',
                    marginTop: 15,
                    borderBottomWidth: 2,
                    borderBottomColor: '#dadada',
                    paddingBottom: 10,
                  }}
                >
                  <RNPTextInput
                    style={styles.input}
                    placeholder="Assunto"
                    label="Assunto"
                    mode="outlined"
                    theme={{ colors: { background: '#fff' } }}
                    value={assunto}
                    onChangeText={(t) => setAssunto(t)}
                    onBlur={() => cleanText(assunto, setAssunto)}

                  />

                  <RNPTextInput
                    style={styles.input}
                    placeholder="Menssagem"
                    label="Menssagem"
                    mode="outlined"
                    theme={{ colors: { background: '#fff' } }}
                    value={msg}
                    onChangeText={(t) => setMsg(t)}
                    onBlur={() => cleanText(msg, setMsg)}

                  />
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
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <TouchableOpacity
                        style={{ flexDirection: 'row' }}
                        onPress={Enviar}
                      >
                        <Feather
                          name="send"
                          size={20}
                          color="white"
                        />
                        <Text style={styles.txtButton}>Enviar</Text>
                      </TouchableOpacity>
                    </View>
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
              </KeyboardAvoidingView>
            </ImageBackground>
          </Modal>
        </KeyboardAvoidingView>
      </AlertNotificationRoot>
    </Contaier>
  );
}

const Contaier = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;
const styles = StyleSheet.create({
  containerfuncionario: {
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

  titulo: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#555555',
  },
  descricao: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#555555',
  },
  txtButton: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginLeft: 10,
    fontSize: 17,
  },
  input: {
    width: '90%',
    justifyContent: 'center',
    marginLeft: 15,
  },
});
