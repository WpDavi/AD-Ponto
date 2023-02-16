import asyncstorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  AlertNotificationRoot,
  ALERT_TYPE,
  Dialog,
} from 'react-native-alert-notification';
import Api from '~/services/Api';

import { useTheme } from 'react-native-paper';

const Login = ({ navigation }) => {
  const { colors } = useTheme();
  const [token, setToken] = useState();
  const [modal, setModal] = useState(false);
  const [internet, setInternet] = useState();

  useEffect(() => {
    NetInfo.fetch().then((state) => {
      setInternet(state.isConnected);
    });
  }, [internet]);

  const enviarPontosOffline = async (pontos) => {
    let sucesso = false;
    for (let i = 0; i < pontos.length; i++) {
      const ponto = pontos[i];
      let php = await Api.PointPhp(
        ponto.pis,
        ponto.lat,
        ponto.long,
        ponto.dataa,
        ponto.empresa,
      );

      let jsonn = await Api.uploudPonto(
        ponto.email,
        ponto.hour,
        ponto.date,
        ponto.lat,
        ponto.long,
        ponto.image,
      );
      let json = await Api.point(
        ponto.email,
        ponto.hour,
        ponto.date,
        ponto.lat,
        ponto.long,
        ponto.token,
      );

      if (json.error) {
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: 'Error',
          textBody: `${json.error}`,
          button: 'ok',
        });
      }
      sucesso = json.message ? true : false;
    }
    if (sucesso) {
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Sucesso',
        textBody: 'Ponto em espera enviado',
        button: 'ok',
      });
      setTimeout(() => {
        navigation.reset({
          routes: [{ name: 'Home' }],
        });
      }, 2000);
    }
  };

  useEffect(() => {
    if (internet == true) {
      const checkToken1 = async () => {
        const pontosString = await asyncstorage.getItem('pontos');
        if (pontosString) {
          const pontos = JSON.parse(pontosString);
          console.log(pontosString);
          enviarPontosOffline(pontos);
          asyncstorage.removeItem('pontos');
        }
      };
      checkToken1();
    }
  }, [internet]);

  return (
    <AlertNotificationRoot>
      <SafeAreaView
        style={{ alignContent: 'center', justifyContent: 'center' }}
        showsVerticalScrollIndicator
      >
        <ImageBackground
          source={require('~/assets/subtract.png')}
          style={{ height: Dimensions.get('window').height / 2.5 }}
        >
          <View style={styles.brandView}>
            <Image
              style={styles.logo}
              source={require('~/assets/logo.png')}
            />
          </View>
        </ImageBackground>

        <View style={{ alignItems: 'center' }}>
          <ActivityIndicator
            size={'large'}
            color="#1CADE2"
            style={{ marginTop: 80 }}
          />
          <Text style={{ marginTop: 10, color: '#002' }}>
            Pontos em espera encontrado
          </Text>
          <Text style={{ marginTop: 10, color: '#002' }}>Aguarde</Text>
        </View>
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
    height: 100,
    resizeMode: 'center',
  },
});

export default Login;
