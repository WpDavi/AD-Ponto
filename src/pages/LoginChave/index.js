import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
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
import { TextInput as RNPTextInput, useTheme } from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import Api from '~/services/Api';

import { SubContainer } from './styled';

const LoginChave = ({ navigation }) => {
  const navigationn = useNavigation();
  const { colors } = useTheme();

  const [chave, setChave] = useState('');
  const [senha, setSenha] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [disabledEntrar, setDisabledEntrar] = useState(true);
  const [loadingEntrar, setLoadingEntrar] = useState(false);

  useEffect(() => {
    if (chave !== '' && empresa !== '') {
      setDisabledEntrar(false);
    } else {
      setDisabledEntrar(true);
    }
  }, [chave, empresa]);

  const buttonSignIn = async () => {
    setDisabledEntrar(true);
    setLoadingEntrar(true);
    if (chave !== '' && empresa !== '') {
      let json = await Api.signInChave(chave, empresa);
      console.log(json);
      if (json.token) {
        console.log('-------------------------', json);
        await AsyncStorage.setItem('token', json.token);
        await AsyncStorage.setItem('name', json.name);
        await AsyncStorage.setItem('email', json.email);
        const token = json.token;

        await Api.registerForPushNotification(token);

        navigation.reset({
          routes: [{ name: 'Home' }],
        });
      } else {
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: 'Alerta',
          textBody: 'E-mail e/ou Senha e/ou Empresa invalidos!',
          button: 'ok',
        });
      }
    } else {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Alerta',
        textBody: 'Por favor,preencha todos os campos.',
        button: 'ok',
      });
    }
    setDisabledEntrar(false);
    setLoadingEntrar(false);
  };

  return (
    <AlertNotificationRoot>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={'#1CADE2'} />
        <SubContainer showsVerticalScrollIndicator>
          <ImageBackground
            source={require('~/assets/subtract.png')}
            style={{ height: Dimensions.get('window').height / 3.5 }}
          >
            <View style={styles.brandView}>
              <Image
                style={styles.logo}
                source={require('~/assets/logo.png')}
              />
            </View>
          </ImageBackground>

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={-200}
          >
            <Text style={styles.titulo}>ENTRAR NO SISTEMA</Text>

            <ScrollView style={{ width: '100%', marginLeft: 20 }}>
              <RNPTextInput
                style={styles.input}
                placeholder="Empresa"
                label="Empresa"
                mode="outlined"
                theme={{ colors: { background: '#fff' } }}
                value={empresa}
                onChangeText={(t) => setEmpresa(t)}
              />

              <RNPTextInput
                style={styles.input}
                keyboardType="email-address"
                placeholder="Chave"
                label="Chave"
                mode="outlined"
                theme={{ colors: { background: '#fff' } }}
                value={chave}
                onChangeText={(t) => setChave(t)}
              />

              <TouchableOpacity
                activeOpacity={0.9}
                style={disabledEntrar ? styles.entrarDisabled : styles.entrar}
                onPress={buttonSignIn}
                disabled={disabledEntrar}
              >
                {loadingEntrar && (
                  <ActivityIndicator
                    size="small"
                    color="#FFF"
                  />
                )}
                {!loadingEntrar && (
                  <Text style={styles.textoBotao}>ENTRAR</Text>
                )}
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>

          <TouchableOpacity onPress={() => navigationn.navigate('Suporte')}>
            <Text
              style={{ textAlign: 'center', padding: 25, color: '#64748B' }}
            >
              PRECISA DE SUPORTE?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigationn.navigate('PontoLogin')}
            activeOpacity={0.9}
            style={styles.criar}
          >
            <Text style={styles.textoBotao}>BATER PONTO POR CHAVE</Text>
          </TouchableOpacity>
        </SubContainer>
      </SafeAreaView>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  brandView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: '28%',
    resizeMode: 'center',
  },
  titulo: {
    marginTop: 10,
    fontSize: 22,
    textAlign: 'center',
    padding: 15,
    color: '#1CADE2',
    fontWeight: 'bold',
  },
  input: {
    width: '90%',
    justifyContent: 'center',
  },
  entrar: {
    marginTop: 20,
    paddingTop: 15,
    paddingBottom: 15,
    width: '90%',
    backgroundColor: '#00bbff',
    borderRadius: 4,
    paddingHorizontal: 0,
    paddingVertical: 10,
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
  },
  entrarDisabled: {
    marginTop: 20,
    paddingTop: 15,
    paddingBottom: 15,
    width: '90%',
    backgroundColor: '#00bbff',
    borderRadius: 4,
    paddingHorizontal: 0,
    paddingVertical: 10,
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    opacity: 0.5,
  },
  criar: {
    paddingTop: 15,
    paddingBottom: 15,
    width: '90%',
    backgroundColor: '#00bbff',
    borderRadius: 4,
    paddingHorizontal: 0,
    paddingVertical: 10,
    boxSizing: 'border-box',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 20,
    marginBottom: 20,
  },
  textoBotao: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    width: '100%',
  },
});

export default LoginChave;
