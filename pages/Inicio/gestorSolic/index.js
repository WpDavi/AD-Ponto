import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Icone from "@expo/vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { TextInput as RNPTextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "../../../src/services/Api";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";

export default function Suporte() {
  const navigation = useNavigation();
  const [mensagem, setMensagem] = useState();
  const [name, setName] = useState();
  const [nome_usuario, setNome_usuario] = useState();
  const [idFuncionario, setIdFuncionario] = useState();
  const [email, setEmail] = useState();

  const [load, setLoad] = useState(false);

  useEffect(() => {
    async function get() {
      const nome = await AsyncStorage.getItem("name");
      if (nome) {
        setName(nome);
      }
    }
    get();
  }, []);

  useEffect(() => {
    async function getName() {
      const info = await Api.getInformacoesPessoais();
      setNome_usuario(info.funcionario);
      setEmail(info.email);
      setIdFuncionario(info.id);
    }
    getName();
  }, []);

  const Enviar = async () => {
    if (!mensagem) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "Alert",
        textBody: "Campo de Mensagem obrigatorio",
        button: "ok",
      });
    } else if (mensagem) {
      setLoad(true);
      const res = await Api.suporte(nome_usuario, mensagem, idFuncionario);
      Api.sandEmail(email, mensagem);
      if (res) {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Sucesso",
          textBody: "Mensagem para o suporte enviado",
          button: "ok",
        });
        setTimeout(() => {
          navigation.goBack();
        }, 2000);
      }
    }
  };

  return (
    <Container>
      <AlertNotificationRoot>
        <View style={{ backgroundColor: "#1CADE2", alignItems: "center" }}>
          <Text style={styles.txtnotification}> Suporte</Text>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            marginLeft: 10,
            position: "absolute",
            marginTop: 10,
          }}
          onPress={() => navigation.goBack()}
        >
          <Icone size={17} name="arrow-left" color="white" />
        </TouchableOpacity>
        <View style={styles.cotainerinfo}>
          <Image
            resizeMode="stretch"
            style={styles.img}
            source={require("../../../src/icons/suporte.png")}
          />

          <Text style={{ marginTop: 10, fontWeight: "bold", marginBottom: 10 }}>
            {name}, o que precisa de Suporte?
          </Text>

          <RNPTextInput
            style={styles.input}
            placeholder="Mensagem"
            label="Mensagem"
            mode="outlined"
            theme={{ colors: { background: "#fff" } }}
            value={mensagem}
            onChangeText={(t) => setMensagem(t)}
          />
        </View>
        {load == false && (
          <TouchableOpacity
            onPress={Enviar}
            activeOpacity={0.9}
            style={styles.criar}
          >
            <Text style={styles.textoBotao}>ENVIAR</Text>
          </TouchableOpacity>
        )}
        {load == true && (
          <TouchableOpacity activeOpacity={0.9} style={styles.criar}>
            <ActivityIndicator size={"large"} color="white" />
          </TouchableOpacity>
        )}
      </AlertNotificationRoot>
    </Container>
  );
}
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

export const styles = StyleSheet.create({
  cotainerinfo: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
  },
  txtnotification: {
    color: "white",
    padding: 7,
    fontSize: 20,
    fontWeight: "bold",
  },
  img: {
    width: "50%",
    height: 200,
    marginTop: "15%",
  },
  imgbutton: {
    width: "80%",
    height: 80,
  },
  input: {
    width: "90%",
    height: 100,
    justifyContent: "center",
  },
  criar: {
    paddingTop: 15,
    paddingBottom: 15,
    width: "90%",
    backgroundColor: "#00bbff",
    borderRadius: 4,
    paddingHorizontal: 0,
    paddingVertical: 10,
    boxSizing: "border-box",
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: 20,
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  textoBotao: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    width: "100%",
  },
});
