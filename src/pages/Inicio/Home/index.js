import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  StatusBar,
  FlatList,
  RefreshControl,
  Platform,
  PermissionsAndroid,
} from "react-native";
import styled from "styled-components/native";
import * as Location from "expo-location";
import Header from "../../../components/Header";
import Opcoes from "../../../components/Opcoes";

import UltimasMovimentacoes from "../../../components/UltimasAtividades";
import Acoes from "../../../components/Acoes";
import Api from "../../../src/services/Api";
import { useNavigation } from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";

export default function Home() {
  const navigation = useNavigation();

  const sistema = Platform.OS;

  const [tokenn, setTokenn] = useState();
  const [pis, setPis] = useState();

  const [listaa, setListaa] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [internet, setInternet] = useState();

  useEffect(() => {
    async function getEmpresa() {
      const ress = await Api.getEmpresa();
      await AsyncStorage.setItem("@empresa", ress);
      console.log(ress);
    }
    getEmpresa();
  }, []);

  useEffect(() => {
    const delet = async () => {
      await AsyncStorage.removeItem("rota");
      await AsyncStorage.removeItem("cord");
    };
    delet();
  }, []);

  //pegando localização --------------

  useEffect(() => {
    async function req() {
      const results = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (results == true) {
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

          await AsyncStorage.setItem("@lat", String(latitude));
          await AsyncStorage.setItem("@long", String(longitude));
          await AsyncStorage.setItem("@Coords", JSON.stringify(cord));
        }
      }
    }
    req();
  }, []);

  //-------

  //verificação de ponto
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setInternet(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    Api.getEmpresa();
    const pontos = async () => {
      const pontosString = await AsyncStorage.getItem("pontos");
      if (internet == true && pontosString !== null) {
        navigation.reset({
          routes: [{ name: "PontoEmEspera" }],
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
      const token = await AsyncStorage.getItem("@notificationToken");
      await AsyncStorage.setItem("sFoto", info.ponto_online_foto);
      await AsyncStorage.setItem("@pis", info.pis);
      await AsyncStorage.setItem("@email", info.email);

      await setTokenn(token);
      await setPis(info.pis);
      if (pis) {
        await Api.puhNotification(pis, tokenn);
      }
    };
    notification();
  }, [pis]);

  const onStart = async () => {
    if (internet == true) {
      await Api.checktoken();
    }

    const json = await Api.getlestactive();
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      navigation.reset({
        routes: [{ name: "Login" }],
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

  return (
    <Container>
      <StatusBar backgroundColor={"#1CADE2"} />
      <View>
        <Header />

        <Opcoes />

        <Acoes />

        <Titulo>Últimas Atividades</Titulo>

        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={listaa}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <UltimasMovimentacoes data={item} />}
        />
      </View>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;
const Titulo = styled.Text`
  margin-top: -15px;
  font-size: 18px;
  font-weight: bold;
  margin-left: 14px;
  margin-right: 14px;
  padding-bottom: 10px;
  color: ${(props) => props.theme.color};
`;
