import asyncstorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import Api from '../../src/services/Api';
import NetInfo from '@react-native-community/netinfo';
import {
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Platform,
  Modal,
  SafeAreaView,
} from 'react-native';

import { TextInput as RNPTextInput, useTheme } from 'react-native-paper';

import * as LocalAuthentication from 'expo-local-authentication';

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

  useEffect(() => {
    if (internet == true) {
      const checkToken1 = async () => {
        const token = await asyncstorage.getItem('token');

        if (token) {
          await Api.checktoken();
          authenticate();
        } else {
          navigation.reset({
            routes: [{ name: 'Login' }],
          });
        }
      };
      checkToken1();
    } else if (internet == false) {
      const checkToken = async () => {
        const token = await asyncstorage.getItem('token');
        console.log('veio no 2');
        await setToken(token);
        if (token) {
          authenticate();
        } else {
          navigation.reset({
            routes: [{ name: 'Login' }],
          });
        }
      };
      checkToken();
    }
  }, [internet]);

  async function authenticate() {
    const hasPassword = await LocalAuthentication.isEnrolledAsync();

    if (!hasPassword)
      navigation.reset({
        routes: [{ name: 'Login' }],
      });

    const { success, error } = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Realizar Login',
    });

    if (success) {
      navigation.reset({
        routes: [{ name: 'Home' }],
      });
    } else {
      navigation.reset({
        routes: [{ name: 'Login' }],
      });
    }
  }

  Platform.OS === 'ios' && authenticate();

  return (
    <SafeAreaView
      style={{ alignContent: 'center', justifyContent: 'center' }}
      showsVerticalScrollIndicator
    >
      <ImageBackground
        source={require('../../assets/subtract.png')}
        style={{ height: Dimensions.get('window').height / 2.5 }}
      >
        <View style={styles.brandView}>
          <Image style={styles.logo} source={require('../../assets/logo.png')} />
        </View>
      </ImageBackground>

      <View style={{ alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color="#1CADE2" style={{ marginTop: 80 }} />
        <Text style={{ marginTop: 10, color: '#002' }}>Carregando...</Text>
      </View>

      {token && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          onShow={authenticate}
        ></Modal>
      )}
    </SafeAreaView>
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
