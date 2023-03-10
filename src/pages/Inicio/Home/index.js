import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform, RefreshControl } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';

import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

import { Actions } from '~/components/Actions';
import { HeaderHome } from '~/components/HeaderHome';
import { LatestActivities } from '~/components/LatestActivities';
import Api from '~/services/Api';

import { Container, Divider, List, Title } from './styles';

export default function Home() {
  const navigation = useNavigation();

  const sistema = Platform.OS;

  useEffect(() => {
    if (sistema === 'ios') {
      async function req() {
        const { statuss } = await Camera.requestCameraPermissionsAsync();
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        const { statu } = await Location.requestForegroundPermissionsAsync();
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      }
      req();
    }
  }, []);

  useEffect(()=>{
    async function delet(){
      console.log('remove')
      await AsyncStorage.removeItem('@FuncionarioPes');
      await AsyncStorage.removeItem('@DataFinal');
      await AsyncStorage.removeItem('@DataInicial');
    }
    delet()
  },[])

  const [tokenn, setTokenn] = useState();
  const [pis, setPis] = useState();

  const [listaa, setListaa] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [internet, setInternet] = useState();

  useEffect(() => {
    async function getEmpresa() {
      const ress = await Api.getEmpresa();
      await AsyncStorage.setItem('@empresa', ress);
      console.log(ress);
    }
    getEmpresa();
  }, []);

  useEffect(() => {
    const delet = async () => {
      await AsyncStorage.removeItem('rota');
      await AsyncStorage.removeItem('cord');
    };
    delet();
  }, []);

  //pegando localiza????o --------------

  useEffect(() => {
    async function req() {
      const results = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (results === true) {
        const location = await Location.getCurrentPositionAsync({});
        if (location) {
          const { coords } = location;
          const { latitude, longitude } = coords;
          const cord = {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.022,
            longitudeDelta: 0.0421,
          };

          await AsyncStorage.setItem('@lat', String(latitude));
          await AsyncStorage.setItem('@long', String(longitude));
          await AsyncStorage.setItem('@Coords', JSON.stringify(cord));
        }
      }
    }
    req();
  }, []);

  //-------

  //verifica????o de ponto
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setInternet(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    Api.getEmpresa();
    const pontos = async () => {
      const pontosString = await AsyncStorage.getItem('pontos');
      if (internet === true && pontosString !== null) {
        navigation.reset({
          routes: [{ name: 'PontoEmEspera' }],
        });
      }
    };
    pontos();
  }, [internet]);

  // useEffect(() => {
  //   const unsubs = NetInfo.addEventListener((state) => {
  //     setModo(state.type);
  //   });
  //   async function pontoOf() {
  //     const ress = await Api.getEmpresa();
  //     if (ress) {
  //       const unsubscribe = NetInfo.addEventListener((state) => {
  //         setInternet(state.isConnected);
  //       });
  //       unsubscribe();
  //     }
  //   }
  //   unsubs();
  //   pontoOf();
  // }, []);

  useEffect(() => {
    const notification = async () => {
      const info = await Api.getInformacoesPessoais();
      const token = await AsyncStorage.getItem('@notificationToken');
      await AsyncStorage.setItem('sFoto', info.ponto_online_foto);
      await AsyncStorage.setItem('@pis', info.pis);
      await AsyncStorage.setItem('@email', info.email);

      await setTokenn(token);
      await setPis(info.pis);
      if (pis) {
        await Api.pushNotification(pis, tokenn);
      }
    };
    notification();
  }, [pis]);

  const onStart = async () => {
    if (internet === true) {
      await Api.checktoken();
    }

    const json = await Api.getlestactive();
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      navigation.reset({
        routes: [{ name: 'Login' }],
      });
    }
    setListaa(json);
  };

  useEffect(() => {
    onStart();
  }, []);

  const onRefresh = () => {
    onStart();
  };

  const [name, setName] = useState();
  useEffect(() => {
    async function loadEmail() {
      const name = await AsyncStorage.getItem('name');
      setName(name);
    }
    loadEmail();
  }, []);

  return (
    <Container>
      <HeaderHome name={name} />

      <Actions />

      <Title>??ltimas Atividades</Title>

      <List
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        ItemSeparatorComponent={<Divider />}
        data={listaa}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <LatestActivities data={item} />}
      />
    </Container>
  );
}
